**Fifth fix version of 2.0 LTS.** The API is exactly that of 2.0.0 (`ApiSignatureTest`).

- **Two snapshot backups made in the same millisecond could be listed in the wrong order.** Snapshots are sorted
  by time and, for the same time, by their id, whose end is random: on a fast computer the newer snapshot could come
  first, so `prune(n)` kept an older one, and "the last snapshot" of `list()` was not the last backup. A new
  snapshot is now always at least 1 ms later than the newest one already in the repository (read from the file
  names, nothing is decrypted), which also covers a clock set back. Repositories written before keep working.
