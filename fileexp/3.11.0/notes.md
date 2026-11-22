Os dados da 3.10 continuam a ser lidos. Quem já usava o FileExp não vê o assistente: só a página das licenças,
uma vez.

- **Assistente de configuração** (`desktop/SetupWizard`) no primeiro arranque, em vez da pergunta do nome: 10
  passos — idioma, licenças e privacidade, sobre si, aspeto, ficheiros, privacidade e histórico, rede, o FileExp e o
  sistema, importar uma cópia das definições, resumo. Todo com o teclado (Tab, setas, Enter; Esc não fecha);
  "Configurar mais tarde" mantém os valores por omissão. Definições › Acerca › **Executar o assistente outra vez**.
  Novas definições `setupDone`, `legalAccepted`, `legalAcceptedAt` (de cada computador: não vão na cópia `.fexp`).
- **Licenças** (`data/Legal`, textos em `src/ao/fileexp/legal/`, copiados sem alterações): FileExp (Apache 2.0),
  OpenJDK e OpenJFX (GPL 2 com a Classpath Exception), componentes do JavaFX Media (GStreamer, GLib, libffi,
  DirectShow). Aceitação obrigatória com versão e data; "Não aceito" fecha o FileExp. Termos próprios do editor podem
  ser acrescentados em `legal/terms-<idioma>.txt` (uma alteração pede nova aceitação). Definições › Acerca ›
  **Licenças e avisos legais**.
- **Formatos `.fexc` e `.fexr`** (`data/SharedItems`, `desktop/SharedItemsUi`): exportar uma coleção inteligente
  (botão direito no mosaico › Exportar coleção...) ou uma regra (Definições › Automações › Exportar...); abrir o
  ficheiro mostra o conteúdo, as pastas que faltam e acrescenta com Anular. Caminhos da pasta pessoal adaptados, nomes
  repetidos com "(2)", ficheiros de um FileExp mais recente recusados. Regras que vão para o Lixo chegam desligadas.
- **Ícones dos formatos** `.fexp`, `.fexc`, `.fexr` com o selo do FileExp (`tools/icons/make_format_icons.py`,
  `package/formats/`), também em Meus Ficheiros e no painel de detalhes.
- **Definições › Sistema** (`control/SystemIntegration`): associações dos três formatos, "Abrir no FileExp" nas
  pastas (Windows), comando `fileexp` no PATH do utilizador, abrir ao iniciar sessão. Só para o utilizador (HKCU no
  Windows, `~/.local` no Linux), sem administrador; desligar apaga só o que aponta para o FileExp. O instalador
  associa os três formatos para todos (`--file-associations`, `package/associations/`).
- **Um só FileExp** (`control/SingleInstance`, 127.0.0.1 com testemunho aleatório): abrir outra vez, um duplo
  clique num ficheiro do FileExp ou `fileexp <pasta>` entregam o pedido ao FileExp aberto (`desktop/OpenFiles`).
- Acessibilidade: o Tab passa a percorrer também o que está dentro de uma área com scroll nos diálogos
  (`Keyboard.focusables`).
- `tools/scale/scale_check.py` começa pelo assistente, percorrido só com o teclado (`SetupWalk.java`), sem
  aplicar as escolhas do sistema.
- Traduções nos 9 idiomas (`i18n/translations-11.txt`, `-12.txt`, `-13.txt`).
- Testes: 128 (22 novos: `Release311SetupTest`, `SharedItemsTest`, `SystemIntegrationTest`, `SingleInstanceTest`).
- Documentação (PT e EN): Instalação e primeira execução, Definições (Sistema, Acerca), Etiquetas e automações
  (partilhar coleções e regras), Dados e privacidade, Histórico, Roteiro.
