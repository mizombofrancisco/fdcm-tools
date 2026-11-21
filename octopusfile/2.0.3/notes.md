**Third fix version of 2.0 LTS: a full audit before 2.0 goes into the FileExp file manager.** Every class was read
again and every suspected bug had to be shown by a small program before it counted: 68 findings, 65 fixed (the other
3 are documented behaviour). The API is exactly that of 2.0.0 (checked by `ApiSignatureTest`); 70 new tests
(`Fixes203*Test`), 171 in all.

**A new rule — never through a link.** A walk never goes into a symbolic link or an NTFS junction (`mklink /J`, made
without admin rights; Java reports a junction as a plain folder). Before, deleting a folder that held a junction
deleted the files of the folder it pointed to (`FileDeleter`, `TreeUtils.deleteRecursively`, the trash, a mirror sync,
a cross-volume move), and copies, backups and ZIPs copied the outside content or looped. Now deleting removes the link
only, and copies, backups, ZIPs, the trash, sync, the index, the analysis, duplicates, content search and watching skip
links (internal helper `infrastructure.filesystem.Links`). A folder you name yourself is used even if it is a junction.

Data loss fixed:
- copy with "replace" that is cancelled or fails kept nothing: the copy now goes to a temporary file, the old target
  is replaced only at the end; copying a file onto itself emptied it;
- `TreeUtils.move` onto an existing folder failed on Windows and, across volumes, deleted the target first: the old
  target is set aside and put back on failure;
- mirror sync deleted target items whose name changed only in letter case, the copy of source folders it could not
  read, and the source when it was inside the target (now refused); a file/folder clash or a read-only file no longer
  aborts the sync (recorded in `getFailed()`);
- the trash: moving a folder that contains the trash deleted the trash (refused); one damaged line of `index.tsv`
  hid and then lost the following entries (damaged lines are kept); two `TrashManager`s on one folder lost each
  other's entries; a failed compression left an orphan archive; paths with tabs/line breaks are escaped;
- `TransferManager`: two copies/moves of the same name into one folder at once overwrote each other (a move lost a
  file) and two downloads of the same name shared one `.part`; names are now reserved and files created with
  `CREATE_NEW`; an `Error` in a job left it RUNNING; unsafe WebDAV names are skipped;
- `BackupService` with the backup folder inside the source filled the disk (refused); it writes `.zip.part` first;
- vault: a file added while the password changed could never be decrypted (a lock now serialises them); a failed
  `extract` left the decrypted `.part` on disk; a name with a drive letter (`C:/…`) extracted outside the destination
  (`: * ? " < > |` become `_`); damaged settings give `IOException`;
- snapshots: `push` to a cloud folder holding another repository deleted it, `pull` mixed two (refused when the
  repository ids differ); a backup during a `delete`/`prune` of the same repository could reference deleted content
  (operations now run one at a time on one repository); restore goes on past a name the system cannot hold and lists
  what it could not restore; an encrypted repository edited to `encryption=none` is refused; cancel and progress work
  inside one big file; a cancelled `verify` no longer looks healthy;
- ZIP: an archive written inside the folder being compressed grew until the disk was full; a failed compression
  destroyed the existing archive (temporary file, moved at the end); names in the DOS code page (Windows Explorer) are
  read.

Other fixes: case-only rename works on Windows/macOS (`FileRenamer`, `FileMover`, `OctopusFile.move`); `BatchRenamer.plan`
reports a bad replacement (`$`) instead of throwing, and `renameAll` reports undo failures; `CsvReader` drops the UTF-8
BOM and keeps a last `""` row; `WatchOperation` can be stopped and started again; `FileWatcher.stop()` before `watch()`
is not lost (a stopped watcher stays stopped); one failing folder no longer stops every watcher of `WatchService`;
`FileIndex` searches do not wait during a rebuild and a cancelled rebuild keeps the index; `DiskAnalyzer.emptyFolders`
lists only folders with nothing in them; small duplicate groups carry the real SHA-256; `setIsLoggingActive(false)`
silences the operation log; `BinaryWriter.writeFrom(in, 0)` fails at once; `FileOrganizer` goes on past a file named
like a category; lower-casing uses `Locale.ROOT`; a non-UTF-8 file gives a clear error; LanShare: two items with the
same name both arrive, a drive root can be sent, long receiver errors reach the sender; the sandbox
(`PathValidator`/`SecureFileHandler`) cannot be left through a junction and allows new files; `evil.exe.` and
`name:stream` no longer pass the extension denylist; a protected folder cannot be removed through its parent;
`ContentCache` returns copies; `NetworkShares.parse` refuses `..` segments and ports; `ExternalDevices` and
`NetworkShareStorage` refuse paths outside their root; Dropbox folders with JSON escapes are found; the snapshot time
returned by `backup` equals the listed one.

Behaviour a caller can notice: links are skipped or deleted as links (see the rule above); vault names never contain
`: * ? " < > |`; `SnapshotRepository` runs one operation at a time (a progress callback must not wait for another thread
using the same repository); `restore` and `verify` cancelled or partial throw `IOException`; `push`/`pull` refuse a
foreign repository; `NetworkShares.parse` returns `null` for a host with a port; `FileWatcher.stop()` is final (make a
new watcher to watch again).
