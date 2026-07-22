# VR-007 — Factual verification of the v59 release attempt and exact rollback

[Українське дзеркало](../../../../uk/verification-reports/reports/VR-007/README.md)

- **Date:** 2026-07-22
- **Verification framework:** REQ-0004
- **Product:** Versie 1
- **Requests:** `REQ-0030`, `REQ-0031`
- **Authority:** `P-009`
- **Issues:** [GT-027, GT-028, GT-029, GT-030](../../../ISSUES.md)
- **Roadmap:** B1-20, B1-21, B1-22, B1-23
- **Overall status:** PARTIAL

## Boundary and method

This report contains sanitized content-free evidence only. Gmail addresses, deployment identifiers, mail, OAuth tokens, cookies, `initData`, and secret properties are not published. Immutable v59 was not rewritten. No fresh OAuth, consent, OTP, CAPTCHA, or passkey occurred. Arbitrary messages and Gmail labels were not mutated.

## Atomic claims

| ID | Category | Currency | Status | Dependencies | Conflicts | Sensitivity | Exact provenance |
|---|---|---|---|---|---|---|---|
| V59-A01 | Governance | current | VERIFIED | REQ-0030, P-009 | Versie 2 is not authorized | public | Standing authority limits one immutable per causal delta, one staging deployment, exact-candidate promotion, and fail-closed rollback |
| V59-A02 | Integration | current | VERIFIED | clean main | none | public | PR #16 `a9f3e29`, PR #11 `1e07e9a`, PR #20 `3b4c58b`, PR #21 `8611af8`, and PR #22 `3a114ff` merged normally |
| V59-A03 | Tests | current | VERIFIED | cumulative v59 source | none | public | Release `12/12`, full Apps Script `464/464`, tooling `6/6`, documentation validators, and required checks passed |
| V59-A04 | Staging | historical | VERIFIED | exact v57 rollback | none | sanitized | v59 was staged once; the exact v59 deployment was verified; historical v58 staging was removed only after replacement; journal `staging_verified` |
| V59-A05 | Multi-account UI | historical | VERIFIED | signed owner Telegram session | none | sanitized | The mailbox and Google avatar loaded; three isolated roots were visible; controlled second-account switching and return passed without OAuth |
| V59-A06 | Labels | historical | PARTIAL | GT-027 | mutating operations omitted | sanitized | The live panel exposed create/manage controls, USER/SYSTEM separation, bounded scrolling, and long nested names without overlap; create/rename/delete were not run |
| V59-A07 | Route recovery | historical | VERIFIED | GT-028 | Telegram session retained a stale route | sanitized | An automatic stale route returned to the loaded list with a content-free notice instead of reader/network failure; manual retry semantics were not tested |
| V59-A08 | Promotion | historical | VERIFIED | A03-A07 | none | sanitized | The stable alias was promoted v57 -> v59; two fresh production mailbox launches passed |
| V59-A09 | Cleanup | historical | VERIFIED | A08 | none | sanitized | Staging was removed; post-cleanup preflight temporarily showed stable/HEAD v59, staging `0`, and journal `cleaned` |
| V59-A10 | Runtime gate | current | BLOCKED | 150-second slot contract | simultaneous Gmail work unproven | sanitized | One execution completed in `214.96 s`; the next execution window started earlier. Both completed, but the no-overlap gate failed |
| V59-A11 | Rollback | current | VERIFIED | exact v57 hashes | none | sanitized | Exact v59 -> v57 rollback; stable/HEAD v57, staging `0`, journal `rolled_back`; a fresh rollback mailbox launch passed |
| V59-A12 | Current state | current | VERIFIED | A11 | none | public | Production v57 VERIFIED; immutable v59 is a historical candidate; active staging `0`; v60 was not created |
| V59-A13 | Documentation | current | VERIFIED | REQ-0031 | stale dated pages | public | Runtime audit found no bot read of GitHub Markdown; manifest/CURRENT_STATE/README form the canonical mutable current-state layer |

## Conclusion

v59 is not an accepted production release. UI, account isolation, label presentation, and stale-route recovery produced strong live evidence, but post-cleanup runtime acceptance failed closed because of the worker-slot overrun and execution-window overlap. GT-030 root cause is unknown. Exact rollback restored verified v57 without a new immutable or repeated staging loop.

## Safe current state

- Production and HEAD: immutable v57.
- Candidate history: immutable v59 preserved.
- Active staging: `0`.
- Journal: `rolled_back`.
- Telegram menu: production.
- Next Versie: not authorized.
- Next immutable: do not create without a new causal code delta and a complete acceptance plan.

## Sources

- [Current state](../../../CURRENT_STATE.md)
- [Versie 1 release article](../../../releases/VERSIE-001-2026-07-19.md)
- [Issues](../../../ISSUES.md)
- [Roadmap](../../../ROADMAP.md)
- [PR #20](https://github.com/Tarasevych/gmail-telegram-controls/pull/20)
- [PR #21](https://github.com/Tarasevych/gmail-telegram-controls/pull/21)
- [PR #22](https://github.com/Tarasevych/gmail-telegram-controls/pull/22)
