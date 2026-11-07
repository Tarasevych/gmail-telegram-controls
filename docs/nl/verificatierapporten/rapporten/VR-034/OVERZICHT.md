# VR-034 — E-05 list semantics, multi-selection, and deterministic activation

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-062`, `B1-42`, `RCA-015`
- **Українське дзеркало:** [VR-034](../../../../uk/verification-reports/reports/VR-034/README.md)

## Atomic claims

| Claim | Category | Status | Origin |
|---|---|---|---|
| An unread row exposes `Unread message` semantics in its accessible name instead of relying only on color/weight | Accessibility | `VERIFIED` | `apps-script/MailApp.html`; E-05 contract |
| Checkbox and `Space` toggle selection without route/open/`markRead`; `Enter` and single click open the thread | Interaction | `VERIFIED` | behavioral keyboard contract |
| The same click/double-click starts only one route/open while its promise is active or within 650 ms | Deduplication | `VERIFIED` | synthetic single-flight assertion |
| A selection key contains exact `accountId:threadId`, while its namespace derives from the current account/shared context and mailbox view | Isolation | `VERIFIED` | executable selection model |
| Background keyed reconciliation updates checkbox state and restores the row/checkbox focus anchor without a full list remount | UI stability | `VERIFIED` | source contract |
| A bulk action runs sequentially, carries the exact thread `connectionId`, never uses `Promise.all`, and fails closed above 50 threads | Mutation safety | `VERIFIED` | E-05 bulk contract |
| Mouse/touch/keyboard and 0/1/50/500-row behavior passed native Telegram Desktop/WebView acceptance | Runtime | `UNVERIFIED` | Shared Apps Script URL Fetch quota; staging `0` |

## Checks

- Focused E-05 contracts: `4/4`.
- Full Apps Script suite: `623/623`.
- Tests use only synthetic account/thread IDs; no real messages, Gmail labels, tokens, OAuth, staging, or production state was changed.

## Conclusion and boundaries

- A source defect is confirmed and corrected in cumulative Versie 1 source without creating a new immutable release.
- Status is `PARTIAL`: source/tests are evidenced, while native acceptance and 500-row performance remain `UNVERIFIED` until the shared quota recovers.
- Production remains v65, staging is `0`, and immutable v70 was not rewritten.
