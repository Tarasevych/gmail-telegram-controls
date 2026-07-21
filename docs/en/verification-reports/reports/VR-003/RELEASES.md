# VR-003 release lineage

**Verification framework:** REQ-0004

All rows belong to the single product line **Versie 1**. Internal vNN markers are historical engineering checkpoints, not parallel current product releases.

| Marker | Verified contribution | VR-003 status |
|---|---|---|
| v42-v46 | Historical lineage exists, but exact per-version contributions are not fully established by primary evidence in VR-003 | partial |
| v47 | Card-index compaction before capacity guard and reservation | verified by Git and tests |
| v48 | Realtime lock isolation with short script lock and per-lane lease | verified by Git and tests |
| v50 | Bounded retention and definitive `delete_too_old` detach behavior | verified by Git and tests; current live state not reverified |
| v54 | Historical immutable/staging and staging-only mutation surface | report-backed; current live state not reverified |
| v55 | Shared SENT eligibility, durable realtime seen state, mutation-surface removal, 432/432 tests, passing `PreflightOnly` | verified candidate; not deployed by VR-003 |

The current helper pins rollback v50, legacy staging v54, and candidate v55 with exact hashes (`VR3-020`, `VR3-023`). Creating immutable v55, staging it, promoting it, or declaring production acceptance requires a separate owner-authorized release action (`VR3-018`, `VR3-026`).
