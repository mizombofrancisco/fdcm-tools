**Security fix of 2.1, the same as 2.0.6** (CVE-2026-114938, "Java4Shell"): every Base64 decode of the library goes
through `SafeBase64`, which never uses the JVM's faulty decode intrinsic, so OctopusFile is safe even on an
unpatched JDK 17.0.6–17.0.21.0.3. Same results, same formats; built and tested with OpenJDK 17.0.21.1. API
unchanged. Update the JVM anyway.
