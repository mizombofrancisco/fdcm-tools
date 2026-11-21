"""
Adds one version of a project to fdcm-tools and rebuilds the catalog (README.md).

    python tools/publish.py --project octopusfile --version 1.4.1 \
        --files ../octopusfile/OctopusFile/dist/OctopusFile-1.4.1.jar ... \
        --changelog ../octopusfile/CHANGELOG.md

    python tools/publish.py --catalog          (only rebuild README.md and the project pages)

The files go to <project>/<version>/ with notes.md (the section of that version in the CHANGELOG).
On push, .github/workflows/releases.yml turns every new <project>/<version>/ folder into the GitHub
Release "<project>-v<version>". A version that is already here is never replaced (use a new version).
Only the Python standard library is used.
"""
import argparse
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = 'mizombofrancisco/fdcm-tools'
SKIP = {'tools', '.github', '.git'}


def version_key(v):
    return [int(x) if x.isdigit() else x for x in re.split(r'[.-]', v)]


def read_props(path):
    props = {}
    if os.path.exists(path):
        for line in open(path, encoding='utf-8'):
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                props[k.strip()] = v.strip()
    return props


def projects():
    out = []
    for name in sorted(os.listdir(ROOT)):
        p = os.path.join(ROOT, name)
        if name in SKIP or not os.path.isdir(p) or not os.path.exists(os.path.join(p, 'project.properties')):
            continue
        props = read_props(os.path.join(p, 'project.properties'))
        versions = sorted((d for d in os.listdir(p) if os.path.isdir(os.path.join(p, d)) and re.match(r'^\d', d)),
                          key=version_key, reverse=True)
        out.append((name, props, versions))
    return out


def notes_from_changelog(changelog, version):
    text = open(changelog, encoding='utf-8').read().replace('\r\n', '\n')
    m = re.search(r'^## ' + re.escape(version) + r'\b.*?$\n(.*?)(?=^## |\Z)', text, re.S | re.M)
    return m.group(1).strip() if m else ''


def download(project, version, file):
    return 'https://github.com/%s/releases/download/%s-v%s/%s' % (REPO, project, version, file)


def release_page(project, version):
    return 'https://github.com/%s/releases/tag/%s-v%s' % (REPO, project, version)


def files_of(project, version):
    d = os.path.join(ROOT, project, version)
    return sorted(f for f in os.listdir(d) if f != 'notes.md')


def project_page(name, props, versions):
    title = props.get('name', name)
    lines = ['# %s' % title, '', props.get('description', ''), '',
             '*%s · %s*' % (props.get('kind', 'tool'), props.get('description_pt', '')), '']
    if versions:
        latest = versions[0]
        main_jar = next((f for f in files_of(name, latest) if f.endswith('.jar') and '-javadoc' not in f), None)
        lines += ['## Latest version · Última versão: %s' % latest, '']
        for f in files_of(name, latest):
            lines.append('- [%s](%s)' % (f, download(name, latest, f)))
        lines.append('')
        if props.get('maven') and main_jar:
            group, artifact = props['maven'].split(':')
            lines += ['## Use it · Como usar', '',
                      'Java %s or newer, no other library needed · Java %s ou mais recente, sem outras bibliotecas.'
                      % (props.get('java', '17'), props.get('java', '17')), '',
                      '**Command line · Linha de comandos**', '', '```',
                      'javac -cp %s App.java' % main_jar,
                      'java -cp "%s;." App' % main_jar,
                      '```', '',
                      'On Linux and macOS use `:` instead of `;` · No Linux e no macOS use `:` em vez de `;`.', '',
                      '**Maven** (install the downloaded JAR once · instalar o JAR descarregado uma vez)', '', '```',
                      'mvn install:install-file -Dfile=%s -DpomFile=%s' % (main_jar, main_jar[:-4] + '.pom'),
                      '```', '', '```xml',
                      '<dependency>',
                      '  <groupId>%s</groupId>' % group,
                      '  <artifactId>%s</artifactId>' % artifact,
                      '  <version>%s</version>' % latest,
                      '</dependency>', '```', '',
                      '**Gradle**', '', '```groovy',
                      "dependencies { implementation files('libs/%s') }" % main_jar, '```', '']
            if props.get('module'):
                lines += ['**Java module · Módulo Java**: `requires %s;`' % props['module'], '']
    lines += ['## All versions · Todas as versões', '', '| Version | Files | Notes |', '|---|---|---|']
    for v in versions:
        files = ', '.join('[%s](%s)' % (f, download(name, v, f)) for f in files_of(name, v))
        lines.append('| %s | %s | [release notes](%s) |' % (v, files, release_page(name, v)))
    lines += ['', 'License · Licença: %s. Source code is private · O código-fonte é privado.' % props.get('license', '—'), '']
    return '\n'.join(lines)


def catalog():
    rows = []
    for name, props, versions in projects():
        open(os.path.join(ROOT, name, 'README.md'), 'w', encoding='utf-8', newline='\n').write(
            project_page(name, props, versions))
        latest = versions[0] if versions else '—'
        rows.append('| [%s](%s/README.md) | %s | %s | %s | %s |' % (
            props.get('name', name), name, props.get('kind', 'tool'), props.get('description', ''),
            props.get('description_pt', ''),
            '[%s](%s)' % (latest, release_page(name, latest)) if versions else '—'))
    readme = '\n'.join([
        '# FDCM Tools',
        '',
        'The tools, applications and libraries of **Francisco D. C. Mizombo**, ready to download.',
        '',
        'As ferramentas, aplicações e bibliotecas de **Francisco D. C. Mizombo**, prontas a descarregar.',
        '',
        '| Tool · Ferramenta | Kind · Tipo | Description | Descrição | Latest · Última |',
        '|---|---|---|---|---|',
    ] + rows + [
        '',
        'Every version is a [Release](https://github.com/%s/releases) named `<tool>-v<version>`.' % REPO,
        'Cada versão é um [Release](https://github.com/%s/releases) chamado `<ferramenta>-v<versão>`.' % REPO,
        '',
        '*Generated by `tools/publish.py` · Gerado por `tools/publish.py`.*',
        '',
    ])
    open(os.path.join(ROOT, 'README.md'), 'w', encoding='utf-8', newline='\n').write(readme)
    print('catalog:', len(rows), 'tool(s)')


def publish(args):
    target = os.path.join(ROOT, args.project, args.version)
    if os.path.exists(target):
        sys.exit('%s %s is already published (versions are never replaced)' % (args.project, args.version))
    if not os.path.exists(os.path.join(ROOT, args.project, 'project.properties')):
        sys.exit('Create %s/project.properties first (name, kind, description, ...)' % args.project)
    os.makedirs(target)
    for f in args.files:
        if not os.path.isfile(f):
            shutil.rmtree(target)
            sys.exit('Missing file: ' + f)
        if f.endswith('-sources.jar'):
            shutil.rmtree(target)
            sys.exit('Source code is never published here: ' + f)
        shutil.copy2(f, target)
    notes = notes_from_changelog(args.changelog, args.version) if args.changelog else ''
    open(os.path.join(target, 'notes.md'), 'w', encoding='utf-8', newline='\n').write(
        (notes or 'Version %s.' % args.version) + '\n')
    print('published', args.project, args.version, '->', os.path.relpath(target, ROOT))
    catalog()


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--project')
    ap.add_argument('--version')
    ap.add_argument('--files', nargs='*', default=[])
    ap.add_argument('--changelog')
    ap.add_argument('--catalog', action='store_true')
    a = ap.parse_args()
    if a.catalog:
        catalog()
    elif a.project and a.version and a.files:
        publish(a)
    else:
        ap.print_help()
