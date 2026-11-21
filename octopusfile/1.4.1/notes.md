**Fix: sync copied every file again on Linux and macOS.**

- `DirectorySynchronizer` compared dates to the nanosecond, but on Linux and macOS a copy keeps its date in
  microseconds, so every file looked newer than its copy and was copied again on each sync (also in "copy the
  changes" and mirror modes). Dates are now compared to the millisecond, and a copy on a FAT32 drive (dates in steps
  of 2 seconds) is recognised as the same file. Found by the CI on Linux and macOS.
- New test `syncIgnoresDatesThatOnlyLostPrecision` (70 tests), which reproduces the problem on Windows too.
- Releases are published by `.github/workflows/release.yml` (JAR, sources, javadoc, POM for every tag).
