# Current state of Gmail Telegram Controls

Updated: **2026-07-22**. Source requests: `REQ-0030`, `REQ-0031`.

<!-- release-state: production=v57; candidate=v59; staging=0; status=UNVERIFIED; as-of=2026-07-22 -->

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
