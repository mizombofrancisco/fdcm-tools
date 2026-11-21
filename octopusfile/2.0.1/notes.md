**First fix version of 2.0 LTS.** Only fixes, found while reading every public class to document it; the API is
exactly that of 2.0.0 (checked by `ApiSignatureTest`) and every 1.x and 2.0 file still opens.

- **Security — SMB on Windows:** `NetworkShares.connect` passed the password to `net use` as an argument, visible
  to other programs in the process list. It now calls the Windows API (`WNetAddConnection2`) from a script read on
  the standard input, like macOS; values travel in Base64, so any character works. With no user, the current
  session is used (1.x and 2.0.0 refused to try); the Windows error message is shown in full.
- **Trash — no data loss:** if a folder could be deleted only in part, the trash removed its copy and the deleted
  part was lost. The item is now recorded before anything is deleted; a folder deleted in part stays in the trash
  (fully restorable) and the exception says so. A single file that cannot be deleted is left as it was, with
  nothing in the trash.
- **Vault:** `delete` deleted the data before saving the index, so a failure (for example, a locked vault) left an
  entry without data; it now saves the index first. `delete` and `rename` refuse a locked vault and change nothing
  if the index cannot be saved.
- **`FileWatcher`:** a watcher made with `FileWatcher(path)` failed with `NullPointerException` in `watch(dir, …)`,
  `watchedDirectoryCount()` and `close()`; it now starts an engine when needed. `stop()` ends the blocking
  `watch()` within about 200 ms, without waiting for another event (and its OS watch service is closed). A
  failing listener no longer ends the loop (it is logged). Closing one watcher no longer closes an engine that
  other open watchers share; `close()` twice has no effect. Listener failures in `WatchService` are logged
  instead of hidden.
- **`CsvReader.readCsv(path, delimiter)`:** split lines with a regular expression, so quoted fields broke and
  empty fields at the end were dropped; a one-character delimiter (`","`, `";"`, `"\\|"`, `"\\t"`) is now parsed
  like `readRows` (quotes, line breaks inside quotes), and the file is validated. Real regular expressions still
  work.
- **`ContentSearcher`:** the excerpt of a match could be cut at the wrong place (or fail) after characters that
  grow in lower case, such as "İ".
- **`BatchRenamer`:** a template expanded placeholders found inside the old name (a file named `a{n}` became
  `a1`); the template is now expanded in one pass.
- **`OctopusFile` facade:** trash operations kept the trash folder and compression level of the moment the
  facade was created; changes in `GlobalConfiguration` now apply to the next operation.
- **`FileDeleter.deleteFile`:** a folder was reported as `FILE_NOT_FOUND`; it is now `NOT_A_FILE`.
- **`CredentialVault.seal`:** no longer makes a `String` copy of the secret (it stayed in memory).
- **`DuplicateFinder.find(dir, progress, null)`** and **`DiskAnalyzer.skipNames(null)`** no longer fail with
  `NullPointerException`; **`FileCategorizer.categorizeExtension`** accepts `".JPG"` as well as `"jpg"`.
- **`GlobalConfiguration.setCompressionLevel`:** the error message now says that -1 (default) is accepted.
- `Fixes201Test` (14 tests, 98 in all).
