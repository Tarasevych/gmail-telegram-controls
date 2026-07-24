# VR-044 - P0-C metadata-only entity reconciliation for a simple Inbox

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-24
- **Request:** `REQ-0037`
- **Implementation baseline:** `7bd8270b2e14525dc8e99bd95387a1ef977dde1a`
- **Related records:** `GT-069`, `B1-49`, `RCA-025`
- **Українське дзеркало:** [VR-044](../../../../uk/verification-reports/reports/VR-044/README.md)

## Boundary

This report verifies the P0-C source contour only. No real Gmail record, OAuth, Telegram runtime, Apps Script deployment, staging, or production state was changed. Source tests do not prove native timing or live request reduction.

## Confirmed root cause

P0-B removed the full list RPC for a no-change cycle, but every History change used one `loadThreads()` fallback. The delta did not classify message/label events and the client lacked a bounded metadata-only read for exact changed IDs. A label-only change therefore could not be distinguished from body invalidation.

## Implemented source contour

- The History change set has per-thread `messageChanged`, `messageAdded`, `messageDeleted`, `labelAdded`, and `labelRemoved` flags.
- Viewer-only `threadSummaries` accepts 1–20 unique exact thread IDs, uses Gmail metadata batch only, and returns explicit missing IDs.
- Entity merge is allowed only for a single-account `INBOX` with no query, filter, custom label, or full-sync boundary.
- An existing row is updated by stable ID, preserving cached body and other local fields.
- A new recent row is inserted by stable timestamp; a missing or no-longer-Inbox row is removed; loaded-page capacity is retained.
- Foreign-account rows are unchanged.
- The selected thread body is reread only after a message event. A label-only event updates metadata without a body RPC.
- An oversized, incomplete, shared, or semantically ambiguous delta uses the existing bounded full-list fallback.

## Source evidence

| Claim | Result | Status |
|---|---:|---|
| Focused P0-C/P0-B/client/adapter contracts | `35/35` | `VERIFIED` in source scope |
| Complete Apps Script suite | `678/678` in `25.414s` | `VERIFIED` in source scope |
| Exact implementation baseline | `7bd8270b2e14525dc8e99bd95387a1ef977dde1a` | recorded |
| Gmail/OAuth/Telegram/runtime mutation | none | not performed |

Focused contracts cover the metadata-only batch, exact missing IDs, limit/uniqueness/viewer/read-only gates, cached-body preservation, insert/remove/order/capacity, foreign-account isolation, rejection of complex views, and absence of body refresh for a label-only event.

## Honest limitations

- Gmail History does not establish membership in an arbitrary Gmail query or shared aggregate, so those views are not moved to entity merge without separate evidence.
- Live History response, actual API request count, cache-hit ratio, user-visible insertion timing, native multi-account/shared mode, staging, and production remain `UNVERIFIED`.
- Shared Apps Script URL Fetch quota and `T-03` keep the release gate `BLOCKED`.
- No production or staging acceptance is claimed.

## Primary references

- [Gmail History list](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list)
- [Gmail Threads get](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads/get)
- [Advanced Gmail Service](https://developers.google.com/apps-script/advanced/gmail)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/)
