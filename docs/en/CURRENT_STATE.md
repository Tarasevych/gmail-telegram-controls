# Current state of Gmail Telegram Controls

Updated: **2026-07-22**. Source requests: `REQ-0030`, `REQ-0031`.

<!-- release-state: production=v57; candidate=v62; staging=0; status=BLOCKED; as-of=2026-07-22 -->

## Canonical state after the v62 controlled release attempt

- **Production:** Apps Script immutable v57, `VERIFIED` by exact post-rollback preflight and two fresh mailbox launches without a network error.
- **Candidate:** immutable v62, `BLOCKED` for production use. Its cumulative client fixes, local gates, CI, owner-only staging acceptance, and two production UI readbacks passed, but the required post-release execution/overlap trace was unavailable.
- **Staging:** `0`; the v62 staging deployment was removed by cleanup before the runtime gate and was not recreated.
- **Release journal:** `rolled_back`; stable and HEAD are exact v57. Immutable v62 remains historical and is not rewritten.
- **Reason:** GT-030 remains open. The v62 worker code is identical to the candidate line that previously produced a 214.96-second worker execution, and no content-free execution trace proved the 150-second/no-overlap gate after v62. This does not prove a v62-specific regression.
- **Delivery control:** one authorized owner self-copy produced no card, as expected from the SENT exclusion, and two `/check` runs produced no duplicate. External automatic INBOX delivery after v62 remains `UNVERIFIED`.
- **No auth churn:** no OAuth consent, GCP-project migration, secret-property read, Gmail mutation, or account-zone change was performed.

Evidence: [v62 release attempt and rollback](reports/VERSIE_001_V62_RELEASE_ATTEMPT_AND_ROLLBACK_2026-07-22.md), [VR-010](verification-reports/reports/VR-010/README.md), [current production v57 acceptance](reports/VERSIE_001_V57_PRODUCTION_ACCEPTANCE_2026-07-22.md), and the cumulative [Versie 1 release article](releases/VERSIE-001-2026-07-19.md).

Ukrainian mirror: [docs/uk/CURRENT_STATE.md](../uk/CURRENT_STATE.md).

| Area | Factual state |
|---|---|
| Product line | **Versie 1** |
| Production | Apps Script immutable **v57**, `VERIFIED` after exact rollback |
| Candidate | Apps Script immutable **v59**, historical candidate, production acceptance `UNVERIFIED` |
| Active staging | **0** |

Immutable v59 passed owner-only UI acceptance: mailbox, Google avatar, three isolated Gmail roots, one-click switching to the controlled second account and back without OAuth, the live label UI, and stale automatic-route recovery. After promotion, two production launches loaded the mailbox, and cleanup confirmed stable v59 with staging `0`.

The post-cleanup runtime gate failed: one `checkNewMail_` execution lasted `214.96 s` against the 150-second worker-slot target, and execution windows overlapped. Both executions completed successfully, so simultaneous Gmail work and the root cause remain `UNVERIFIED`; however, the release gate required no overlap. An exact v59 -> v57 rollback was performed. After rollback, `PreflightOnly` confirmed stable and HEAD v57, staging `0`, and journal `rolled_back`; a fresh production v57 launch loaded the mailbox. Immutable v59 is preserved and v60 was not created.

Machine-readable source: [`docs/release-state.json`](../release-state.json).

Details and provenance:

- [Cumulative Versie 1 article](releases/VERSIE-001-2026-07-19.md)
- [Production acceptance for v57](reports/VERSIE_001_V57_PRODUCTION_ACCEPTANCE_2026-07-22.md)
- [VR-007: v59 release attempt and rollback](verification-reports/reports/VR-007/README.md)
- [Українське дзеркало](../uk/CURRENT_STATE.md)

Dated release, postmortem, and verification-report pages preserve the state at the time of their evidence. Always use this page and the manifest for current runtime/release decisions instead of an older dated status.
