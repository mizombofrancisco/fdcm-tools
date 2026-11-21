**Housekeeping.**

- Semantic version set in one place (`version.properties`) and in `OctopusFile.VERSION`, checked by a test.
- JAR named `OctopusFile-<version>.jar`, with `Implementation-Version` in the manifest, compressed (808 → 375 KB).
- Optional timestamped copy in `~/Documents/OctopusFileVersion` (`-Doctopus.archive=false` turns it off).
- `dist/` and `nbproject/private/` no longer in git; JARs go to GitHub Releases.
- GitHub Actions: tests on Windows, Linux and macOS; a `vX.Y.Z` tag publishes a Release.
- Root README rewritten; the transfers example shows `...` for an unknown total; `BackupScheduler` logs through
  `java.util.logging`.
