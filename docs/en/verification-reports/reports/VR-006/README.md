# VR-006 — Factual verification of the cumulative v58 staging A/B

[Українське дзеркало](../../../../uk/verification-reports/reports/VR-006/README.md)

- **Date:** 2026-07-22
- **Verification framework:** REQ-0004
- **Product:** Versie 1
- **Request:** `REQ-0028` ([governance commit](https://github.com/Tarasevych/gmail-telegram-controls/commit/b56812c22ab78fbb2749c798ea9ad92e14e25fc2))
- **Authority:** `P-008` ([authority commit](https://github.com/Tarasevych/gmail-telegram-controls/commit/1ec34cff91d8a4b6f188e0c8eb860816f6609bbb))
- **Issues:** [GT-027, GT-028](../../../ISSUES.md)
- **Roadmap:** B1-21, B1-22
- **Overall status:** BLOCKED

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
| V58-A07 | Failure stage | current | VERIFIED | correct owner Apps Script dashboard | a cached client shell remains possible | sanitized | The execution dashboard filtered by `Web app` contained no execution in any staging/production test window; a direct owner-browser staging probe also did not enter a handler |
| V58-A08 | Root cause | current | UNVERIFIED | external transport/deployment access | the official status dashboard cannot exclude a partial incident | sanitized | Evidence localizes the failure to the pre-handler layer but does not distinguish Telegram WebView transport, Google multi-login/access routing, and a partial Apps Script incident |
| V58-A09 | Candidate regression | current | UNVERIFIED | A06, A07 | shared failure on v57 | sanitized | The same failure on stable and candidate does not establish a v58-specific regression |
| V58-A10 | Promotion | current | BLOCKED | successful staging acceptance | none | sanitized | Acceptance did not pass; Promote and CleanupStaging were not run |
| V58-A11 | Safety | current | VERIFIED | production v57 | none | sanitized | The Telegram menu was restored to production; v58 staging is preserved; OAuth, scopes, Gmail data, and random mail were unchanged |
| V58-A12 | Label management | current | UNVERIFIED | GT-028 | local/visual tests only | public | GT-027 exists in immutable v58, but the live label UI was not accepted and production was not changed |

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

1. Do not toggle releases while the shared pre-handler failure reproduces on v57 and v58.
2. After endpoint transport recovers, run two fresh v57 launches; only after they pass, repeat a signed v58 staging launch.
3. Promotion is allowed only after mailbox, avatar, three roots, and account-switch acceptance without OAuth.
4. If v57 passes and v58 fails, do not mutate immutable v58; separately authorize the next cumulative candidate with exact rollback.

## Sources

- [Versie 1 release article](../../../releases/VERSIE-001-2026-07-19.md)
- [Issues](../../../ISSUES.md)
- [Roadmap](../../../ROADMAP.md)
- [Official Apps Script executions dashboard guide](https://developers.google.com/apps-script/guides/dashboard)
- [Google Workspace Status Dashboard](https://www.google.com/appsstatus/dashboard/)
