# VR-011 — Immutable v63 and GT-030 runtime closure

[Українською](../../../../uk/verification-reports/reports/VR-011/README.md)

- **Date:** 2026-07-22
- **Overall status:** VERIFIED
- **Scope:** immutable v63 publication, owner-only staging, production activation, GT-030 causal correction, no-overlap runtime gate, cleanup and residual boundaries
- **Request:** `REQ-0033`
- **Verification framework:** `REQ-0004`
- **Detailed report:** [Versie 1 v63 release and GT-030 closure](../../../reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)

## Atomic findings

| ID | Atomic claim | Status | Evidence |
|---|---|---|---|
| VR-011-01 | The prior 150-second property was only an admission TTL and could expire before a legal Apps Script worker completed. | VERIFIED | deterministic focused contract and source review |
| VR-011-02 | v63 uses a tokenized seven-minute crash lease, a 150-second soft stage deadline and token-matched release. | VERIFIED | source commit `cd4c32c5af2a61161c0fc6e1b25cffa04e22f724`; `17/17` focused tests |
| VR-011-03 | The cumulative source/release/bridge suites passed `497/497`, `499/499` and `501/501`. | VERIFIED | local test traces |
| VR-011-04 | PR #32, #33 and #34 passed required checks and were merged normally. | VERIFIED | GitHub checks and merge commits |
| VR-011-05 | GitHub and the private GitLab mirror reached the same `main` commit `ce46143b7270ca7776a91b01783490e1d08aa1ca`. | VERIFIED | remote readback |
| VR-011-06 | Immutable v63 was staged once; native Telegram Desktop loaded the mailbox, dynamic identity and three isolated roots, then switched away and back without OAuth. | VERIFIED | authenticated owner-only staging readback |
| VR-011-07 | Two fresh native Telegram Desktop production launches loaded the v63 mailbox. | VERIFIED | authenticated production readback |
| VR-011-08 | Seven successive one-minute `checkNewMail_` executions completed without overlap. | VERIFIED | authenticated Apps Script Executions readback |
| VR-011-09 | The 15-minute History slot is covered by an automated contract; a separate runtime substage trace was not captured. | PARTIAL | contract trace; runtime substage absent |
| VR-011-10 | Stable and HEAD are exact v63, staging is `0`, and the journal is `cleaned`. | VERIFIED | final read-only preflight |
| VR-011-11 | The promotion helper reported a false negative after the deployment had advanced; state was reconciled without duplicate mutation. | PARTIAL | immediate error plus later stable-v63 preflight; tracked as GT-037 |
| VR-011-12 | Telegram Web K/A showed a blank exact signed embed while native Telegram Desktop passed. | PARTIAL | controlled UI readback; root cause UNVERIFIED; tracked as GT-038 |
| VR-011-13 | External automatic INBOX delivery after v63 was not exercised. | UNVERIFIED | no additional real message was sent |
| VR-011-14 | No OAuth, GCP migration, secret read, account-zone change or random mail mutation was used. | VERIFIED | operation trace |

## Conclusion

The v63 release and the GT-030 no-overlap gate are VERIFIED. This does not upgrade the scenario-specific P0 items GT-031 through GT-036 beyond their evidence. The mutable canonical state is [CURRENT_STATE](../../../CURRENT_STATE.md); historical VR-010 remains an immutable rollback snapshot.
