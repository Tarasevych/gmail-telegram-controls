# VR-012 — GT-031 narrow active-account header source correction

[Українською](../../../../uk/verification-reports/reports/VR-012/README.md)

- **Date:** 2026-07-22
- **Overall status:** PARTIAL
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`
- **Detailed report:** [GT-031 source correction](../../../reports/VERSIE_001_GT031_ACCOUNT_HEADER_SOURCE_2026-07-22.md)

## Atomic findings

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-012-01 | Native v63 showed a narrow-header email clipping residual on a controlled alternate account. | VERIFIED | owner-only v63 acceptance observation |
| VR-012-02 | Single-account narrow mode had no visible touch disclosure for the complete email. | VERIFIED | source inspection |
| VR-012-03 | The correction reuses the stable-ID context model and existing account map without parallel state. | VERIFIED | source contract |
| VR-012-04 | Wider views wrap; narrow views expose a compact native full-address disclosure with keyboard and ARIA support. | VERIFIED | focused `88/88` |
| VR-012-05 | All Apps Script contracts pass after freezing v63 as historical evidence. | VERIFIED | full `501/501` |
| VR-012-06 | Immutable v63 helper, hashes, deployment and exact v57 rollback were not changed. | VERIFIED | scoped diff and release contracts |
| VR-012-07 | The corrected interface has passed native staging and production visual acceptance. | UNVERIFIED | no v64 candidate exists yet |

## Conclusion

The source correction is locally VERIFIED, but GT-031 remains PARTIAL until a separately gated cumulative candidate passes native staging and production visual acceptance. Production remains immutable v63.
