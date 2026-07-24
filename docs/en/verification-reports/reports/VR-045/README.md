# VR-045 - P0-D verified-session private-cache lock

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-24
- **Request:** `REQ-0037`
- **Implementation baseline:** `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb`
- **Related records:** `GT-070`, `B1-50`, `RCA-026`
- **Українське дзеркало:** [VR-045](../../../../uk/verification-reports/reports/VR-045/README.md)

## Boundary

This report verifies the P0-D source contour only. No real Gmail record, OAuth, Telegram runtime, Apps Script deployment, staging, or production state was changed. Source tests do not prove native Telegram SecureStorage behavior, encrypted-at-rest IndexedDB, or offline unlock.

## Confirmed root cause

Namespace isolation already required an opaque owner scope and exact Gmail connection, but hydration populated its own allowlist from mutable client state. Low-level IndexedDB reads and writes had no separate unlocked bit, while account-changing bootstrap, disconnect, and sign-out did not share one mandatory lock/rebind lifecycle.

## Implemented source contour

- Cache starts fail closed and unlocks only with a current app session, exact 43-character owner `cacheScope`, and nonempty exact connected-account set.
- `p0HydratePersistentState()` can no longer self-authorize; denied hydration relocks the cache.
- Low-level `get`, `getAll`, `put`, memory peek, record read, and record write check one central unlock gate.
- All five actual bootstrap paths rebind the exact allowlist.
- Account switch, disconnect, and confirmed sign-out clear private memory, drafts, restored views, scroll maps, and mail DOM.
- Lock does not delete persistent IndexedDB records, allowing a future safe same-account unlock to reuse them.
- No browser `localStorage`, `DeviceStorage`, OAuth token, or Telegram `initData` unlock state was added.

## Source evidence

| Claim | Result | Status |
|---|---:|---|
| Focused cache/launch/history contracts | `48/48` | `VERIFIED` in source scope |
| Complete Apps Script suite | `685/685` in `26.020s` | `VERIFIED` in source scope |
| Exact implementation baseline | `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb` | recorded |
| Gmail/OAuth/Telegram/runtime mutation | none | not performed |

## Honest limitations

- Persistent mail records are not yet encrypted at rest; this contour prevents application-level reads before unlock but makes no cryptographic storage-protection claim.
- Current offline launch has no server-verified bootstrap, so device-bound offline unlock remains `UNVERIFIED`.
- Telegram documents `SecureStorage` as Keychain/Keystore-backed user-specific storage with up to 10 items, but this app's native behavior has not yet been verified on the target device.
- Shared Apps Script URL Fetch quota and `T-03` keep the release gate `BLOCKED`.
- No production or staging acceptance is claimed.

## Primary references

- [Telegram Mini Apps SecureStorage](https://core.telegram.org/bots/webapps#securestorage)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/)
