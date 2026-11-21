**Last 1.x feature release before 2.0 LTS.** See `docs/en/lts.md`.

- **Snapshot backups** (`modules.backup.SnapshotRepository`): incremental (unchanged files are not read again),
  deduplicated (identical content stored once), compressed, optionally encrypted (AES-256-GCM in authenticated blocks,
  PBKDF2, objects named by HMAC, encrypted snapshot files); partial restore that never overwrites, `prune`, `delete`,
  `verify`, a lock against two writers, cancel without recording anything.
- **Saved search index**: `FileIndex.save(file)` / `FileIndex.load(file)` (GZIP, atomic write, damaged files refused,
  `savedAt()`), so an application can search as soon as it starts and rebuild in the background.
- **Search inside office documents**: `ContentSearcher` now reads `docx`, `xlsx`, `pptx`, `odt`, `ods`, `odp`;
  `DocumentText.lines(file)` gives their text. JDK only; no DTDs or external entities (XXE), 200 MB XML limit per
  document (ZIP bomb).
- **Deprecated for removal in 2.0:** `FileManager`, `DirectoryManager`, `BatchOperations`, `AsyncOperations` and the
  facade getters that return them.
- 11 new tests (69 in total), including a check that the XXE test fails when the protection is removed; the new
  documentation examples are run by `DocExamplesTest`.
- Documentation (EN and PT): saved index and office documents in Search, snapshots in Backup and sync, new page
  "Road to 2.0 (LTS)".
