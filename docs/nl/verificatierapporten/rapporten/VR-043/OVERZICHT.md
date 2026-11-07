# VR-043 - P0-B account-scoped Gmail History revalidation

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-24
- **Request:** `REQ-0037`
- **Implementation baseline:** `28b438e68e1b327308761c246e074558b7ccd53d`
- **Related records:** `GT-068`, `B1-48`, `RCA-024`
- **Українське дзеркало:** [VR-043](../../../../uk/verification-reports/reports/VR-043/README.md)

## Boundary

This report verifies the P0-B source contour only. No Apps Script deployment, staging, production, native Telegram target-device acceptance, OAuth, Gmail action, mailbox mutation, or private-message read was performed. Source tests do not prove live request reduction or production behavior.

## Confirmed root cause

Every 45 seconds and after visibility/online events, `p0RevalidateVisible()` unconditionally started a full `loadThreads()` and background refresh of the selected thread. The bootstrap server already returned Gmail `historyId`, but `normalizeAccounts()` discarded it. The Telegram-card History scanner has separate runtime state and cannot be shared as a Mini App cursor without violating owner/connection isolation.

## Implemented source contour

- Added a viewer-only `historyDelta` operation for one exact Gmail connection.
- Gmail History ID is validated and transferred as an opaque decimal string without conversion to JavaScript Number.
- The server requests `messageAdded`, `messageDeleted`, `labelAdded`, and `labelRemoved`, deduplicates message/thread IDs, and bounds one cycle to three History pages.
- A missing cursor, Gmail 404, or incomplete bounded pagination returns a content-free reason and current baseline and requires full reconciliation.
- The client cursor is stored only in the existing Telegram-owner + Gmail-connection IndexedDB namespace.
- Timer, visibility, and online events share one reconciliation promise; parallel History RPC also uses the existing RPC single-flight.
- When nothing changed, no full list/thread RPC starts. When a change exists, a complex query/shared view receives one bounded full-list refresh; the selected thread is reread only when its exact connection/thread ID appears in the delta.
- OAuth tokens, Telegram signatures, and other secrets are absent from the cursor/cache record.

## Source evidence

| Claim | Result | Status |
|---|---:|---|
| Focused History/P0/Advanced Gmail contracts | `30/30` | `VERIFIED` in source scope |
| Complete Apps Script suite | `673/673` in `25.763s` | `VERIFIED` in source scope |
| Exact implementation baseline | `28b438e68e1b327308761c246e074558b7ccd53d` | recorded |
| Gmail/OAuth/Telegram/runtime mutation | none | not performed |

Focused contracts cover opaque decimal cursor handling, repeated `historyTypes`, deduplication, missing/stale 404 baseline, the three-page fail-closed bound, account-scoped client routing, reconciliation single-flight, and rejection of a foreign connection outside the active account set.

## Honest limitations

- Gmail History describes changes but does not itself establish membership in an arbitrary current Gmail query, filter, or shared aggregate.
- The source optimization therefore removes no-change full polling completely, but still performs bounded full-list reconciliation after a real change.
- Entity-level insert/remove for compatible simple views, live cache-hit ratio, measured API-request reduction, quota behavior, native multi-account/shared acceptance, staging, and production remain unverified.
- Shared Apps Script URL Fetch daily quota and owner-policy conflict `T-03` keep the release gate `BLOCKED`.
- No production or staging acceptance is claimed.

## Primary references

- [Gmail History list](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list)
- [Advanced Gmail Service](https://developers.google.com/apps-script/advanced/gmail)
- [Apps Script advanced services](https://developers.google.com/apps-script/guides/services/advanced)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/)
- [Storage Standard](https://storage.spec.whatwg.org/)
