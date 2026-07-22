# VR-013 — v64 helper and GT-037 bounded reconciliation

[Українською](../../../../uk/verification-reports/reports/VR-013/README.md)

- **Date:** 2026-07-22
- **Overall status:** PARTIAL
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`
- **Detailed report:** [v64 helper source candidate](../../../reports/VERSIE_001_V64_RELEASE_CANDIDATE_2026-07-22.md)

## Atomic findings

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-013-01 | The helper pins exact v63 rollback, frozen v63 history and candidate version v64. | VERIFIED | focused release contract |
| VR-013-02 | All five candidate hashes equal source commit `da8b2768323db8fd8c1ba886b556bbfd2148d6de`. | VERIFIED | normalized hash contract |
| VR-013-03 | Promotion and rollback each issue one PUT and use at most five read-only reconciliation checks. | VERIFIED | focused contract and parser |
| VR-013-04 | Contradictory deployment versions fail closed instead of triggering another mutation. | VERIFIED | helper source contract |
| VR-013-05 | Cumulative local tests pass. | VERIFIED | `503/503` |
| VR-013-06 | v64 immutable and staging exist. | UNVERIFIED | StageOnly has not run |
| VR-013-07 | GT-037 live promotion reconciliation passes. | UNVERIFIED | promotion has not run |

## Conclusion

The v64 helper source is locally verified. Overall status remains PARTIAL until normal merge, read-only preflight, exact staging, owner acceptance and promotion evidence.
