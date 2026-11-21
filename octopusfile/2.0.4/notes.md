**Fourth fix version of 2.0 LTS: the last findings of the 2.0.3 audit that were left as documented behaviour.**
The API is exactly that of 2.0.0 (`ApiSignatureTest`); `Fixes204Test` (4 tests, 175 in all).

- **Copying a folder onto an existing folder no longer replaces files without being asked.** Before, the files
  of the source silently replaced the files with the same name in the target (an edited `notes.txt` was lost).
  Now the folders are still merged, but if any file would be replaced — or a file stands where the source has a
  folder — `FileAlreadyExistsException` (`COPY_ERROR` in the facade) is thrown **before anything is copied**, as a
  single-file copy already did. This applies to `OctopusFile.copy(…).to(…)` and `FileCopier.copyDirectory`.
- **`GlobalConfiguration.setIsOverwriteByDefault(true)` now works:** the facade's `copy(…).to(…)` (files and
  folders) and `move(…).to(…)` replace what exists when it is set. The value is read at the moment of each
  operation. Before, the setting was stored but never read.
- `getBackupDirectory` is still not used: using it needs a new method, which only a 2.1 can add (Javadoc says so).

Behaviour a caller can notice: code that copied a folder over an existing one and expected same-named files to be
replaced now gets an error; set `setIsOverwriteByDefault(true)`, or use `TreeUtils.copyTree(…, REPLACE_EXISTING)`.
