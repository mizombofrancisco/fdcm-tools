**Second fix version of 2.0 LTS**, from reading the code again to illustrate every page of the documentation.
The API is exactly that of 2.0.0 (checked by `ApiSignatureTest`).

- **Data — `write(path).bytes(data)`:** the file was opened without `TRUNCATE_EXISTING`, so writing fewer bytes
  over a longer file left the old end of it after the new bytes. The file is now replaced as a whole, like
  `text(…)`.
- **`watch(…).filterExtension(…)`:** the filter also hid the OVERFLOW event (its path is the folder, not a file),
  so `onOverflow` never fired when a filter was set. OVERFLOW now always passes the filter.
- **`watch(…).start()`:** a folder that does not exist (or a file instead of a folder) was an exception of the
  background thread, which nobody could catch. `start()` now checks the folder and throws `OctopusFileException`
  (`WATCH_DIRECTORY_NOT_FOUND` or `NOT_A_DIRECTORY`); a later failure on the thread is logged and stops the
  watching (`isRunning()` becomes `false`) instead of being lost.
- **Javadoc of `NetworkShares`:** described Windows with `net use`; since 2.0.1 it is the Windows API
  (`WNetAddConnection2`) from a script on standard input, with no password on a command line.
- **Documentation (EN and PT):** an illustration (FigJam style, SVG) on every page and every chapter — 61
  drawings made by `docs/diagrams.py` from one source for both languages; 14 sentences that disagreed with the
  code were corrected (the facade gives the code of the operation and the module's exception as the cause; the
  "no silent overwrite" rule and its exceptions; the partial hash of duplicates; and others).
- `Fixes202Test` (3 tests, 101 in all).
