# VR-032 — Navigation and actual mailbox context

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-061`, `B1-41`, `RCA-014`
- **Українське дзеркало:** [VR-032](../../../../uk/verification-reports/reports/VR-032/README.md)

## Atomic claims

| Claim | Category | Status | Origin |
|---|---|---|---|
| Single/shared header context and full email mappings derive from the existing account state and stable connection IDs | Identity | `VERIFIED` | `apps-script/MailApp.html`; dynamic-context contracts |
| The context banner is an accessible click/keyboard action that returns to Inbox in the current mailbox context | UX/accessibility | `VERIFIED` | source contract and focused test |
| User list/thread transitions write a canonical hash route through the History API; `hashchange` and `popstate` use one deduplicated scheduler | Navigation | `VERIFIED` | `apps-script/MailApp.html`; E-03 contract |
| An unsafe or empty user-label route cannot silently turn into an Inbox route | State safety | `VERIFIED` | behavioral route-serializer assertion |
| The reader account chip is hidden in ordinary single-account context and shown for unified mode or an actual thread/account mismatch | UX/isolation | `VERIFIED` | behavioral `readerNeedsAccountIdentity_` matrix |
| The Rules setup hint is not added to every reader view | UX | `VERIFIED` | focused source contract |
| Native Telegram Desktop/WebView Back/Forward and `A → B → A` restore list/thread/scroll/focus on the live deployment | Runtime | `UNVERIFIED` | staging and native acceptance were not started |
| This contour is active in production | Release | `UNVERIFIED` | production remains v65, staging `0`; immutable history is unchanged |

## Checks

- Focused navigation/context contracts: `5/5`.
- Full Apps Script suite: `617/617`.
- Tests performed no Gmail mutation, OAuth, Telegram send, staging, or production release.
- Bilingual, knowledge-hub, verification-report, release-state, privacy, and diff checks are publication gates.

## Boundaries

- Source behavior is verified, but the overall status remains `PARTIAL` until native browser-history acceptance provides authenticated readback.
- A route stores only bounded view/folder/filter/thread/connection identifiers, not an email address, message content, token, or Telegram `initData`.
- Existing account-scoped cache, draft, and stale-response guards were not replaced by a parallel state model.
