**First minor version of the 2.x line: four new features, nothing removed or changed.** Built on `main`; 2.0.x
fixes stay on `lts/2.0`. `ApiSignatureTest` shows only added lines (43); everything 2.0 wrote stays readable.
42 new tests (`NewIn21*Test`, `DocExamplesTest`), 217 in all.

- **Versions of one file.** `SnapshotRepository.versions(label, path)` lists the different contents a file had in
  the snapshots of a series, newest first (`record Version(snapshot, entry)` with `size()` and `modified()`);
  `restoreVersion(version, target, progress, cancel)` and `restoreVersion(snapshot, path, target, …)` bring one
  back to a new file without restoring the whole snapshot. Never replaces (`FileAlreadyExistsException`); the
  content is checked against its hash. `TransferManager.restoreVersion(repo, version, target)` runs it in the queue.
- **Pause and resume of transfers.** `Transfer.pause()`, `resume()`, `isPauseRequested()`, `isPaused()`,
  `getPausedMillis()`, `TransferManager.pauseAll()` / `resumeAll()` and the new state `Transfer.State.PAUSED`. A
  queued transfer pauses at once and keeps its place; a running one pauses at its next safe point and goes on from
  there (a copy from the same byte). Limits: `pushSnapshots` pauses only while queued and `upload` only between
  files (an HTTP request never waits half way); downloads hold the connection open; a paused snapshot or restore
  keeps its repository busy.
- **Default backup folder.** `backup(path).toDefault()` saves in `GlobalConfiguration.getBackupDirectory()` (by
  default `~/.octopusfile/backup`), read at the moment of the call; `INVALID_ARGUMENT` when it is `null`. This
  closes the last finding of the 2.0.3 audit.
- **Folder sync on the local network.** `LanShare.sync(peer, myName, folder, mirror, code, progress, cancelled)`
  sends only the files that are new or changed on the other computer (same name, size and time within 2 s are
  skipped); the receiver starts `new LanShare(name, handler, bindAddress, true)` and answers with
  `Incoming.acceptSync(folder, …)`. Same encryption, 6-digit code and consent as ordinary sends. A changed file
  (another size or time) is replaced; with `mirror`, what the sender does not have is **deleted permanently**.
  `SyncReport` lists added, updated, unchanged, deleted and skipped. Capability `+sync` after the id in the
  announcement (still 4 fields): FileExp 3.9 and older still list the computer and refuse a sync at once.

Compatibility notes: a `switch` over `Transfer.State` without `default` should get a `PAUSED` case. Ordinary
`LanShare` sends are unchanged in both directions; a computer started without sync refuses sync offers without
asking the person.
