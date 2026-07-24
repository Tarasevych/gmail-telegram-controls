# VR-047 - P0-F encrypted offline bootstrap and read-only unlock

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-24
- **Request:** `REQ-0037`
- **Implementation baseline:** `2bd7eb52d2f3297929c24c12d8ccbb4611699b84`
- **Related records:** `GT-072`, `B1-52`, `RCA-028`
- **Українське дзеркало:** [VR-047](../../../../uk/verification-reports/reports/VR-047/README.md)

## Boundary

This report verifies the P0-F source contour only. No real Gmail record, OAuth, Telegram runtime, Apps Script deployment, staging, or production state was changed. Source evidence restores private cache in an already-loaded document; it is not proof of fresh offline navigation or native target-device acceptance.

## Confirmed root cause

P0-E encrypted persistent records, but unlocking them still required a live `state.session`. Exact owner scope, the connected-account allowlist, active account, folders, and labels came only from server bootstrap. During a transient outage the client could not reconstruct that context with evidence and showed a blocking launch error.

## Implemented source contour

- A separate encrypted `bootstrap` record with a 35-day expiry is written after verified online bootstrap.
- The snapshot contains only required mailbox context; no session token, refresh or access token, Telegram `initData`, or signed launch data is stored.
- Record key, kind, owner/bootstrap namespace, schema, and expiry are included in AES-GCM AAD.
- Offline restore starts only after `TRANSIENT_NETWORK_FAILURE` and obtains the content key only from the exact Telegram SecureStorage envelope.
- The snapshot passes schema, owner-scope, issue/expiry, unique-account-set, and active-account validation before unlock.
- Offline cache is read-only: `rpc()` fails closed with `OFFLINE_CACHE_ONLY`; prefetch and ordinary revalidation do not run.
- Online and visibility retries rerun the verified boot pipeline; successful online bootstrap disables offline mode and refreshes the encrypted snapshot.
- `RESTORABLE`, malformed envelopes, decrypt failure, expired snapshots, revoked auth, and account mismatch are not bypassed.

## Source evidence

| Claim | Result | Status |
|---|---:|---|
| Focused offline/cache/security contracts | `33/33` | `VERIFIED` in source scope |
| Complete Apps Script suite | `701/701` in `25.944s` | `VERIFIED` in source scope |
| Exact owner/bootstrap record + AAD gate | present | `VERIFIED` in source scope |
| Offline RPC/mutation blocking | present | `VERIFIED` in source scope |
| Exact implementation baseline | `2bd7eb52d2f3297929c24c12d8ccbb4611699b84` | recorded |
| Gmail/OAuth/Telegram/runtime mutation | none | not performed |

## Honest limitations

- The Apps Script HTML document must already be loaded; a fresh offline navigation of the current deployment has no confirmed Service Worker or same-origin offline shell.
- Native Telegram SecureStorage/WebCrypto and target-device ten-launch performance have not yet been verified.
- Snapshot expiry is 35 days; browser eviction, manual site-data clearing, or an incompatible schema correctly requires a cold start.
- Shared Apps Script URL Fetch quota and `T-03` keep the release gate `BLOCKED`.
- No production or staging acceptance is claimed.

## Primary references

- [Telegram Mini Apps SecureStorage](https://core.telegram.org/bots/webapps#securestorage)
- [Web Cryptography API: AES-GCM](https://www.w3.org/TR/WebCryptoAPI/#aes-gcm)
- [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
