**Fix version of 2.1**, with the fix of 2.0.5: two snapshot backups made in the same millisecond could be listed
in the wrong order, so `prune(n)` kept an older one and `versions(label, path)` could show an older content as the
newest. A new snapshot is now always later than the newest one in the repository. API unchanged.
