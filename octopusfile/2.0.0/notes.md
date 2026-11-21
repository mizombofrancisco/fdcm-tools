**OctopusFile 2.0, the long-term support version: supported until 21 November 2028** (bug and security fixes in
2.0.x, on the `lts/2.0` branch), Java 17 and newer, no dependencies, no breaking change in the whole 2.x line.
Same code as 2.0.0-rc.1, which passed the CI on Windows, Linux and macOS.

What 2.0 brings, against 1.4.1 (details in the CHANGELOG entries of 2.0.0-alpha.1, -beta.1 and -rc.1; migrating:
`docs/en/lts.md`, the "2.0 LTS" page of the documentation):

- a smaller, frozen public API (`api/octopusfile-api.txt`, checked by the tests); the old managers are gone and the
  readers and writers no longer share names with `java.io`;
- one rule for errors: the `OctopusFile` facade throws `OctopusFileException`, the modules `IOException`;
- progress and cancel for every long operation through `TransferManager`;
- snapshot repositories that can be pushed to and pulled from a WebDAV cloud;
- every file format of 1.x proven readable by tests with files written by the 1.2.0 and 1.4.1 JARs;
- complete Javadoc, and documentation in English and Portuguese.
