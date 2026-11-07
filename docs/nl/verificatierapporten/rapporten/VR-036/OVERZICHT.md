# VR-036 — F-02 Consistent message actions and account-correct Gmail handoff

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-064`, `B1-44`, `RCA-017`
- **Українське дзеркало:** [VR-036](../../../../uk/verification-reports/reports/VR-036/README.md)

## Root cause

The desktop toolbar, conversation footer, and mobile action bar independently created primary Reply/Forward actions, while `.reader-actionbar` was visible outside the mobile breakpoint. External transitions opened `state.thread.gmailUrl` directly, so positional Gmail `/u/0` was not reliably bound to the actually selected connection. The Gmail metadata panel listed data but did not explain what the Mini App/API supports, what requires native Gmail, and what has no safe API contract.

## Atomic claims

| Claim | Category | Status | Origin |
|---|---|---|---|
| Desktop exposes a compact Reply/Forward/More toolbar while mobile exposes one lower primary action surface | UX | `VERIFIED` | focused executable source contract |
| The legacy conversation footer does not participate in layout or the accessibility tree | Accessibility | `VERIFIED` | CSS/source contract |
| Gmail handoff resolves the exact stable connection before constructing `authuser=<email>` | Multi-account isolation | `VERIFIED` | VM behavior test |
| An ambiguous account context stops handoff instead of opening an arbitrary Gmail account | Safety | `VERIFIED` | VM fail-closed test |
| The More menu does not claim print, translate, raw MIME, or phishing report as a Gmail API mutation | API honesty | `VERIFIED` | focused source contract |
| The settings hub covers all eleven requested sections and classifies Mini App/API versus Gmail handoff | Capability UX | `VERIFIED` | focused source contract |
| Gmail browser settings fragments consistently open the correct native sections in Telegram Desktop/mobile | Runtime | `UNVERIFIED` | browser UI contract may change; staging `0` |

## Primary API boundaries

- [Gmail users.settings](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.settings) documents supported settings resources, not the complete Gmail web UI.
- [Gmail users.messages.get](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/get) documents `raw` format; this contour deliberately adds no raw MIME transfer or new scope.
- [Gmail users.threads.modify](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads/modify) covers label mutations but not native phishing/legal-report, translation, or print UI.
- Gmail settings fragments are used only as an account-correct best-effort handoff and are not claimed as a stable API.

## Checks

- Focused message-capability contract: `6/6`.
- Focused Mail App group: `98/98`.
- Full Apps Script suite: `635/635`.
- Production v65, staging `0`, immutable v70, Gmail, OAuth, and Telegram runtime state were unchanged.

## Conclusion and boundaries

Source-level action ownership, exact-account handoff, and capability honesty are evidenced. Overall status is `PARTIAL` because native Telegram WebView popup/deep-link acceptance, account-switch readback, and settings-fragment behavior did not run while the shared Apps Script URL Fetch quota blocker remains. This source contour did not create a new immutable candidate.
