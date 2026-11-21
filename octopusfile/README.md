# OctopusFile

File toolkit for Java 17+ with no external libraries: transfers, trash, search index, batch rename, duplicates, disk analysis, snapshot backups, encrypted vault, WebDAV/SMB, LAN sharing.

*library · Biblioteca de ficheiros para Java 17+ sem bibliotecas externas: transferências, Lixo, índice de pesquisa, mudar o nome em lote, duplicados, análise do disco, cópias por instantâneos, cofre cifrado, WebDAV/SMB, partilha local.*

## Latest version · Última versão: 2.0.2

**Documentation online · Documentação online:** https://mizombofrancisco.github.io/fdcm-tools/octopusfile/docs/

- [OctopusFile-2.0.2-docs.zip](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.2/OctopusFile-2.0.2-docs.zip)
- [OctopusFile-2.0.2-javadoc.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.2/OctopusFile-2.0.2-javadoc.jar)
- [OctopusFile-2.0.2.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.2/OctopusFile-2.0.2.jar)
- [OctopusFile-2.0.2.pom](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.2/OctopusFile-2.0.2.pom)

## Use it · Como usar

Java 17 or newer, no other library needed · Java 17 ou mais recente, sem outras bibliotecas.

**Command line · Linha de comandos**

```
javac -cp OctopusFile-2.0.2.jar App.java
java -cp "OctopusFile-2.0.2.jar;." App
```

On Linux and macOS use `:` instead of `;` · No Linux e no macOS use `:` em vez de `;`.

**Maven** (install the downloaded JAR once · instalar o JAR descarregado uma vez)

```
mvn install:install-file -Dfile=OctopusFile-2.0.2.jar -DpomFile=OctopusFile-2.0.2.pom
```

```xml
<dependency>
  <groupId>io.github.mizombofrancisco</groupId>
  <artifactId>octopusfile</artifactId>
  <version>2.0.2</version>
</dependency>
```

**Gradle**

```groovy
dependencies { implementation files('libs/OctopusFile-2.0.2.jar') }
```

**Java module · Módulo Java**: `requires com.octopusfile;`

## All versions · Todas as versões

| Version | Files | Notes |
|---|---|---|
| 2.0.2 | [OctopusFile-2.0.2-docs.zip](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.2/OctopusFile-2.0.2-docs.zip), [OctopusFile-2.0.2-javadoc.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.2/OctopusFile-2.0.2-javadoc.jar), [OctopusFile-2.0.2.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.2/OctopusFile-2.0.2.jar), [OctopusFile-2.0.2.pom](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.2/OctopusFile-2.0.2.pom) | [release notes](https://github.com/mizombofrancisco/fdcm-tools/releases/tag/octopusfile-v2.0.2) |
| 2.0.1 | [OctopusFile-2.0.1-docs.zip](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.1/OctopusFile-2.0.1-docs.zip), [OctopusFile-2.0.1-javadoc.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.1/OctopusFile-2.0.1-javadoc.jar), [OctopusFile-2.0.1.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.1/OctopusFile-2.0.1.jar), [OctopusFile-2.0.1.pom](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.1/OctopusFile-2.0.1.pom) | [release notes](https://github.com/mizombofrancisco/fdcm-tools/releases/tag/octopusfile-v2.0.1) |
| 2.0.0 | [OctopusFile-2.0.0-docs.zip](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.0/OctopusFile-2.0.0-docs.zip), [OctopusFile-2.0.0-javadoc.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.0/OctopusFile-2.0.0-javadoc.jar), [OctopusFile-2.0.0.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.0/OctopusFile-2.0.0.jar), [OctopusFile-2.0.0.pom](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v2.0.0/OctopusFile-2.0.0.pom) | [release notes](https://github.com/mizombofrancisco/fdcm-tools/releases/tag/octopusfile-v2.0.0) |
| 1.4.1 | [OctopusFile-1.4.1-docs.zip](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.4.1/OctopusFile-1.4.1-docs.zip), [OctopusFile-1.4.1-javadoc.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.4.1/OctopusFile-1.4.1-javadoc.jar), [OctopusFile-1.4.1.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.4.1/OctopusFile-1.4.1.jar), [OctopusFile-1.4.1.pom](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.4.1/OctopusFile-1.4.1.pom) | [release notes](https://github.com/mizombofrancisco/fdcm-tools/releases/tag/octopusfile-v1.4.1) |
| 1.4.0 | [OctopusFile-1.4.0-docs.zip](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.4.0/OctopusFile-1.4.0-docs.zip), [OctopusFile-1.4.0-javadoc.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.4.0/OctopusFile-1.4.0-javadoc.jar), [OctopusFile-1.4.0.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.4.0/OctopusFile-1.4.0.jar), [OctopusFile-1.4.0.pom](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.4.0/OctopusFile-1.4.0.pom) | [release notes](https://github.com/mizombofrancisco/fdcm-tools/releases/tag/octopusfile-v1.4.0) |
| 1.3.0 | [OctopusFile-1.3.0-docs.zip](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.3.0/OctopusFile-1.3.0-docs.zip), [OctopusFile-1.3.0-javadoc.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.3.0/OctopusFile-1.3.0-javadoc.jar), [OctopusFile-1.3.0.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.3.0/OctopusFile-1.3.0.jar), [OctopusFile-1.3.0.pom](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.3.0/OctopusFile-1.3.0.pom) | [release notes](https://github.com/mizombofrancisco/fdcm-tools/releases/tag/octopusfile-v1.3.0) |
| 1.2.0 | [OctopusFile-1.2.0-docs.zip](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.2.0/OctopusFile-1.2.0-docs.zip), [OctopusFile-1.2.0-javadoc.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.2.0/OctopusFile-1.2.0-javadoc.jar), [OctopusFile-1.2.0.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.2.0/OctopusFile-1.2.0.jar), [OctopusFile-1.2.0.pom](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.2.0/OctopusFile-1.2.0.pom) | [release notes](https://github.com/mizombofrancisco/fdcm-tools/releases/tag/octopusfile-v1.2.0) |
| 1.1.0 | [OctopusFile-1.1.0-docs.zip](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.1.0/OctopusFile-1.1.0-docs.zip), [OctopusFile-1.1.0.jar](https://github.com/mizombofrancisco/fdcm-tools/releases/download/octopusfile-v1.1.0/OctopusFile-1.1.0.jar) | [release notes](https://github.com/mizombofrancisco/fdcm-tools/releases/tag/octopusfile-v1.1.0) |

License · Licença: MIT. Source code is private · O código-fonte é privado.
