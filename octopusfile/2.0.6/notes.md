**Security: CVE-2026-114938 ("Java4Shell").** On x86-64 processors with AVX-512 VBMI, the JVM's optimised Base64
decoder (`Base64.getDecoder().decode`, the HotSpot intrinsic) can write out of bounds on crafted input, on OpenJDK
17.0.6 to 17.0.21.0.3 (fixed in 17.0.21.1, 21.0.13.1, 25.0.5.1, 27.0.1.1). OctopusFile decodes Base64 that comes
from outside: the Share nearby announcement (UDP, from any computer on the network, before any key exchange), the
names of an offer before the person accepts, and the vault, saved-password and snapshot settings files (which may
come from a cloud with `pull`).

- Every Base64 decode of the library now goes through the internal `support.security.SafeBase64`, which uses the
  JDK streaming decoder (`Base64.getDecoder().wrap(...)`) — it never reaches the faulty code, so the library is
  safe even on a JVM that was not updated. Same bytes and same refusals as before (`IllegalArgumentException`);
  formats on disk and on the network unchanged.
- `Java4ShellTest`: 40 000+ valid, invalid and crafted inputs give exactly the JDK decoder's result; a check that
  no source file calls the JDK decoder directly.
- Built and tested with OpenJDK 17.0.21.1. **Update the JVM anyway**: the fix of the flaw itself is in Java, and
  applications that bundle a runtime (jlink, jpackage) must be rebuilt on a fixed JDK.
- The API is exactly that of 2.0.0 (`ApiSignatureTest`).
