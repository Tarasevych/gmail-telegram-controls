# VR-006 — Factual verification of the cumulative v58 staging A/B

[Українське дзеркало](../../../../uk/verification-reports/reports/VR-006/README.md)

- **Date:** 2026-07-22
- **Verification framework:** REQ-0004
- **Product:** Versie 1
- **Requests:** `REQ-0028` ([release governance](https://github.com/Tarasevych/gmail-telegram-controls/commit/b56812c22ab78fbb2749c798ea9ad92e14e25fc2)); `REQ-0029` ([factual correction](https://github.com/Tarasevych/gmail-telegram-controls/commit/1b2295d))
- **Authority:** `P-008` ([authority commit](https://github.com/Tarasevych/gmail-telegram-controls/commit/1ec34cff91d8a4b6f188e0c8eb860816f6609bbb))
- **Issues:** [GT-027, GT-028](../../../ISSUES.md)
- **Roadmap:** B1-21, B1-22
- **Overall status:** PARTIAL

## Boundary and method

This report contains sanitized content-free evidence only. Gmail addresses, deployment identifiers, mail content, OAuth tokens, cookies, `initData`, and secret properties are not published. Historical immutable v56/v57/v58 artifacts were not rewritten. Production promotion was authorized only after staging acceptance and therefore was not performed.

## Atomic claims

| ID | Category | Currency | Status | Dependencies | Conflicts | Sensitivity | Exact provenance |
|---|---|---|---|---|---|---|---|
| V58-A01 | Governance | current | VERIFIED | REQ-0028, P-008 | Versie 2 is not authorized | public | The owner authorized normal merges of PR #16/#11, cumulative immutable staging, and conditional promotion after acceptance |
| V58-A02 | Integration | current | VERIFIED | clean main | semantic documentation ID collision | public | PR #16 merged as `a9f3e29`; PR #11 merged as `1e07e9a`; the v58 bundle/launcher merged through PR #17/#18 |
| V58-A03 | Tests | current | VERIFIED | merged cumulative source | none | public | Release/bridge suite `11/11`; full product suite `460/460`; bilingual, knowledge-hub, verification, and main CI gates passed |
| V58-A04 | Release | current | VERIFIED | exact v57 rollback | journal wording | sanitized | Read-only preflight: stable v57, immutable v58 ready, staging `1`, legacy staging `0`, journal `staging_verified` |
| V58-A05 | Staging UI | current | PARTIAL | existing signed Telegram session | mailbox bootstrap failure | sanitized | Two fresh v58 launches showed the Apps Script shell and profile photo; the chat-native account list confirmed three roots, but the mailbox operation did not open |
| V58-A06 | Controlled A/B | current | VERIFIED | production menu restoration | none | sanitized | Two fresh production v57 launches reproduced the same content-free mailbox-operation error as v58 |
| V58-A07 | Failure stage | current | CONFLICTING | correct Mini App window targeting | earlier dashboard-only interpretation | sanitized | Absence of an execution row was initially read as a pre-handler failure; later direct production inspection showed successful mailbox list/bootstrap and a reader-level error |
| V58-A08 | Root cause | current | VERIFIED | launcher history, `openThread` contract | candidate-specific runtime remains unverified | sanitized | The launcher retained the route in WebView history; failed automatic `openThread` rendered an error without clearing route/selection and replayed the stale thread on a fresh launch |
| V58-A09 | Candidate regression | current | UNVERIFIED | A06, A07 | shared failure on v57 | sanitized | The same failure on stable and candidate does not establish a v58-specific regression |
| V58-A10 | Promotion | current | BLOCKED | successful staging acceptance | none | sanitized | Acceptance did not pass; Promote and CleanupStaging were not run |
| V58-A11 | Safety | current | VERIFIED | production v57 | none | sanitized | The Telegram menu was restored to production; v58 staging is preserved; OAuth, scopes, Gmail data, and random mail were unchanged |
| V58-A12 | Label management | current | UNVERIFIED | GT-028 | local/visual tests only | public | GT-027 exists in immutable v58, but the live label UI was not accepted and production was not changed |
| V58-A13 | Source remediation | current | PARTIAL | REQ-0029, required checks | no v59 release authority | public | The source candidate consumes the launcher hash once and adds list recovery only for automatic initial/hash/resume opens; manual retry is preserved; targeted `238/238`, non-release `440/440`, and docs validators passed; two immutable hash guards fail closed as expected |

## Factual localization correction

The earlier “failure before handler” conclusion was stronger than its evidence. After targeting the separate Mini App window, production v57 successfully loaded the avatar, Inbox, and a real message list; navigating to Inbox cleared the reader error. This verifies a client route/reader defect. The historical A/B is retained, but claim V58-A07 is now `CONFLICTING` and V58-A08 records the verified root cause. Source request: `REQ-0029`.

## Corrected registry collision

After two independent branches were merged, the owner Advanced Gmail adapter and label management used duplicate IDs `GT-026/B1-20`. This follow-up keeps the adapter at `GT-026/B1-20`, routes label management to `GT-027/B1-21`, and assigns the shared bootstrap blocker `GT-028/B1-22`. Git history and merge commits are not rewritten.

## Safe current state

- Stable production: immutable v57.
- Candidate: immutable v58 with one owner-only staging deployment preserved.
- Telegram menu: production.
- Promotion: BLOCKED.
- CleanupStaging: not run.
- Fresh OAuth/consent, OTP, CAPTCHA, or passkey: not encountered.

## Next evidence step

1. Verify the REQ-0029 source candidate with targeted/full/docs suites and required GitHub checks.
2. Do not mutate immutable v58; separately authorize the next cumulative immutable for any code-level release.
3. New staging must pass two fresh launches without a stale reader, then mailbox, avatar, three roots, and account-switch acceptance without OAuth.
4. Production promotion remains forbidden until complete VERIFIED acceptance and exact-v57 rollback readiness.

## Sources

- [Versie 1 release article](../../../releases/VERSIE-001-2026-07-19.md)
- [Issues](../../../ISSUES.md)
- [Roadmap](../../../ROADMAP.md)
- [Official Apps Script executions dashboard guide](https://developers.google.com/apps-script/guides/dashboard)
- [Google Workspace Status Dashboard](https://www.google.com/appsstatus/dashboard/)
