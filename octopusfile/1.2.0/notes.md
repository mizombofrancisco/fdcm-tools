**A real Java module and the files a Maven repository needs.**

- The JAR is now the module `com.octopusfile` (`src/module-info.java`). Only the public packages are exported;
  `support.*`, `infrastructure.concurrency`, `.filesystem` and `.resources` are not. On the classpath nothing changes.
- `ant release` writes `OctopusFile-<version>.jar`, `-sources.jar`, `-javadoc.jar` and `.pom` in `dist/`;
  `ant install-local` installs them in `~/.m2` as `io.github.mizombofrancisco:octopusfile`.
- `ant bench`: small benchmarks of the index, search, duplicate finder, SHA-256, copy and ZIP
  (with `Files.copy` as a baseline).
- 13 new tests of error paths (43 in total): zip slip, ZIP round trip, sync refusing a target inside the source,
  copy-changes vs mirror, trash refusing itself and never overwriting on restore, folder restore and purge,
  vault password change and tamper detection, duplicates of same size but different content, index filters and refresh.
- Javadoc builds without errors (two HTML mistakes fixed); missing-comment warnings are silenced.
- CI builds the release files and runs the benchmarks on Linux; a tag also attaches the sources, javadoc and POM.
- `jitpack.yml` for JitPack builds of the tags.
