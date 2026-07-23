# VR-014 — production client release detection correction

[Українською](../../../../uk/verification-reports/reports/VR-014/README.md)

- **Date:** 2026-07-22
- **Overall status:** PARTIAL
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`

## Atomic findings

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-014-01 | The canonical current manifest publishes production through `production.appsScriptImmutable = 64`. | VERIFIED | tracked `docs/release-state.json` |
| VR-014-02 | The production-v64 client extractor omitted `appsScriptImmutable`, so the canonical manifest resolved to target version zero. | VERIFIED | source inspection and regression function test |
| VR-014-03 | The production-v64 HTML still declared `P0_CLIENT_RELEASE_VERSION = 60` and `Versie-1-v60-p0`. | VERIFIED | source inspection |
| VR-014-04 | The source correction reads the canonical field first and identifies the next cumulative source as `Versie-1-v65-p0`. | VERIFIED | focused real-manifest contract |
| VR-014-05 | The draft-safe guard still contains one automatic reload site and returns no action after the loaded version reaches the target. | VERIFIED | release-decision regression contract |
| VR-014-06 | Frozen v64 helper hashes remain pinned without requiring mutable source to equal immutable v64 forever. | VERIFIED | historical release-boundary contract |
| VR-014-07 | An already-open v64 client reloads exactly once into v65 and does not loop in native production. | UNVERIFIED | requires bounded v65 staging and production acceptance |

## Conclusion

The causal GT-036 source defect is confirmed and corrected locally. Production remains exact immutable v64 with staging zero and exact v63 rollback. GT-036 remains `PARTIAL` until a separately gated cumulative v65 release proves one reload, no reload loop, and draft-safe state restoration.
