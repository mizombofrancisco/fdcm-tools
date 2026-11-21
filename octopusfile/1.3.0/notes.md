**Security review, and the documentation in English and Portuguese.** See `docs/en/security.md`.

- **Sharing nearby, protocol 2:** the sender commits to its key (hash) before the key exchange, so a computer in the
  middle can no longer search for keys that give the same 6-digit code on both sides. Computers with protocol 1
  (FileExp 3.8 and older) are still listed, and sending to them fails with a clear message. 15 s handshake timeout, at most 4 incoming connections,
  sockets always closed, received files written to new hidden `.part` files, free-space check, Windows device names
  (`CON`, `NUL`…) and trailing dots cleaned.
- **Vault:** changing the password is crash-safe (one commit point; `unlock` finishes or undoes an interrupted
  change) and no longer writes decrypted copies to the disk; absurd iteration counts are refused; `extract` never
  touches an existing `name.part`.
- **EncryptionEngine, format 2:** 1 MiB authenticated blocks (memory stays small, cut files detected); a wrong
  password leaves no partial target and does not touch an existing one. Format 1 files still decrypt.
- **CredentialVault:** a damaged key file is an error and is never replaced; new key files are private from the
  first byte.
- **SMB:** on macOS the password no longer appears in the arguments of `osascript` (visible in `ps`); command output
  is read while the command runs and the password is removed from messages.
- 14 new tests in `SecurityTest` (57 in total), including a check that the commitment test fails when the
  protection is removed.
- **Documentation in two languages:** `docs/en/` and `docs/pt/` (same file names), new Security page, and a website
  with a language switch (`site/en`, `site/pt`, language chosen from the browser on the first visit). The build fails
  if a page is missing in one of the languages.
