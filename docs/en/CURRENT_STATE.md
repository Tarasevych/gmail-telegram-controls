# Current state of Gmail Telegram Controls

Updated: **2026-07-22**. Source request: `REQ-0031`.

<!-- release-state: production=v57; candidate=v58; staging=1; status=BLOCKED; as-of=2026-07-22 -->

| Area | Factual state |
|---|---|
| Product line | **Versie 1** |
| Production | Apps Script immutable **v57**, `VERIFIED` |
| Candidate | Apps Script immutable **v58**, `BLOCKED` for promotion |
| Active staging | **1** owner-only deployment |

Production v57 has verified acceptance. Immutable v58 and one staging deployment are preserved as historical candidate state; they cannot be promoted without complete new acceptance. The current stale-thread-route fix is published in a separate candidate PR and is not production yet.

Machine-readable source: [`docs/release-state.json`](../release-state.json).

Details and provenance:

- [Cumulative Versie 1 article](releases/VERSIE-001-2026-07-19.md)
- [Production acceptance for v57](reports/VERSIE_001_V57_PRODUCTION_ACCEPTANCE_2026-07-22.md)
- [Українське дзеркало](../uk/CURRENT_STATE.md)

Dated release, postmortem, and verification-report pages preserve the state at the time of their evidence and are not rewritten as current status. After promotion or rollback, update this page, the manifest, root README, and Ukrainian mirror before closing the release cycle.
