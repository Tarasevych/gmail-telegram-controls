# VR-003: Two-corpus factual verification of Versie 1

- **Date:** 2026-07-21
- **Request:** REQ-0012
- **Framework:** REQ-0004
- **Product line:** Versie 1
- **Release change:** no

VR-003 converts two private session exports into sanitized atomic claims and checks those claims against immutable Git objects and local test evidence. It does not publish either transcript, mailbox content, credentials, private URLs, or local paths.

## Coverage

| Source | Logical lines | Private chunks | Coverage |
|---|---:|---:|---|
| SESSION-CURRENT | 32,569 | 49 | complete |
| SESSION-PREVIOUS | 134,607 | 182 | complete |
| **Total** | **167,176** | **231** | **complete, zero gaps** |

Cryptographic source metadata and the overlong-line boundary check are recorded in [source-manifest.json](../../../../verification-reports/VR-003/source-manifest.json). The raw and normalized corpora remain private.

## Result

| Status | Count |
|---|---:|
| verified | 19 |
| partial | 3 |
| unverified | 3 |
| blocked | 2 |
| recommendation | 5 |

The complete machine-readable ledger is [claims.json](../../../../verification-reports/VR-003/claims.json). Every claim contains scope, evidence grade, dependencies, conflicts, limitations, exact source spans, and immutable evidence links where primary evidence exists.

## Verified boundary

- The current v55 candidate passed all 19 local test files, 432/432 (`VR3-016`).
- `PreflightOnly` passed with exact candidate hashes and no mutation (`VR3-017`).
- v47 card-index compaction, v48 realtime lock isolation, v50 retention handling, and v55 shared SENT eligibility are supported by Git and test evidence (`VR3-007` to `VR3-015`).
- Multi-account delivery state is distinct from the active UI account (`VR3-005`, `VR3-006`).
- No v55 immutable deployment, staging deployment, production promotion, Gmail mutation, Telegram production acceptance, or OAuth acceptance was performed by this report (`VR3-018`, `VR3-025`, `VR3-026`).

## Navigation

- [Architecture](ARCHITECTURE.md)
- [Root causes](ROOT_CAUSES.md)
- [Lessons learned](LESSONS.md)
- [Release lineage](RELEASES.md)
- [Open gates](OPEN_GATES.md)
- [Machine-readable manifest](../../../../verification-reports/VR-003/manifest.json)
