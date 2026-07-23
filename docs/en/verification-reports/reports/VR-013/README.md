# VR-013 — v64 production acceptance and GT-031/GT-037 closure

[Українською](../../../../uk/verification-reports/reports/VR-013/README.md)

- **Date:** 2026-07-22
- **Overall status:** VERIFIED
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`
- **Detailed report:** [v64 production acceptance](../../../reports/VERSIE_001_V64_RELEASE_AND_GT031_GT037_CLOSURE_2026-07-22.md)

## Atomic findings

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-013-01 | The helper pins exact v63 rollback, frozen v63 history and candidate version v64. | VERIFIED | focused release contract |
| VR-013-02 | All five candidate hashes equal source commit `da8b2768323db8fd8c1ba886b556bbfd2148d6de`. | VERIFIED | normalized hash contract |
| VR-013-03 | Promotion and rollback each issue one PUT and use at most five read-only reconciliation checks. | VERIFIED | focused contract and parser |
| VR-013-04 | Contradictory deployment versions fail closed instead of triggering another mutation. | VERIFIED | helper source contract |
| VR-013-05 | The final cumulative local suite passes. | VERIFIED | `505/505` |
| VR-013-06 | Immutable v64 and exactly one staging deployment were created after preflight. | VERIFIED | post-stage preflight: `staging_verified` |
| VR-013-07 | GT-037 live promotion reconciliation advances v63 to v64 with one mutation. | VERIFIED | promotion result and stable readback |
| VR-013-08 | Native staging verifies the full-address disclosure, three roots, shared mode and switching without OAuth. | VERIFIED | owner-only Telegram Desktop acceptance |
| VR-013-09 | Two fresh production launches pass; cleanup leaves stable/HEAD v64, staging `0` and journal `cleaned`. | VERIFIED | native production acceptance and final preflight |
| VR-013-10 | Six post-cleanup executions complete; the exact internal disposition of one short overlapping shell is known. | UNVERIFIED | UI durations are verified; lease-rejection reason is inference |

## Conclusion

The v64 release scope is `VERIFIED`: immutable v64 is production and HEAD, exact v63 is rollback, staging is zero, and GT-031/GT-037 passed live acceptance. The runtime shell-overlap explanation, external automatic INBOX delivery after v64, and the remaining P0 scenarios stay explicitly outside this closure.