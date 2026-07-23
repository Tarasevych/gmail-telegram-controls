# VR-042 - P0-A launch single-flight and canonical launch-proof ledger

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-24
- **Request:** `REQ-0037`
- **Implementation baseline:** `1d5fb8352ea62f7b25d6980312f277060ce4d0ae`
- **Related records:** existing `GT-040-GT-047`, `GT-051`, `GT-053`, `GT-054`; new `GT-067`, `B1-47`, `RCA-023`
- **Українське дзеркало:** [VR-042](../../../../uk/verification-reports/reports/VR-042/README.md)

## Boundary

This report verifies the P0-A source contour and a synthetic local MailApp preview only. No Apps Script deployment, staging or production change, native Telegram target-device acceptance, Gmail action, or mailbox mutation was performed. Source and local E2 evidence do not prove the native Telegram SLO or production behavior.

## Confirmed root cause

Historical launch-proof issuance and redemption used split state paths instead of one canonical locked claim ledger. Cross-document launch ownership also lacked one deterministic single-flight contract, so concurrent launch documents could compete or repeat bootstrap work.

## Implemented source contour

- Cross-document launch single-flight uses `navigator.locks` first and an expiring content-free IndexedDB lease as fallback.
- An ordinary validated launch remains overlay-free.
- Release reload waits for mutation quiescence and uses the exact content-free `sessionStorage` key `p0-release-reload`.
- Server launch issuance and redemption use one `ScriptLock`-backed ledger with one canonical claim transaction.
- Ledger claims are HMAC-scoped to owner and route, use a deterministic 60-second nonce lifetime and 11-minute tombstones, and are bounded to 100 records.
- The ledger stores no secrets or identifiers.

## Source evidence

| Claim | Result | Status |
|---|---:|---|
| Focused P0-A contracts | `37/37` | `VERIFIED` in source scope |
| Complete Apps Script suite | `668/668` in `24.229s` | `VERIFIED` in source scope |
| Exact implementation baseline | `1d5fb8352ea62f7b25d6980312f277060ce4d0ae` | recorded |
| Runtime deployment or mailbox mutation | none | not performed |

## Synthetic local E2 acceptance

A raw MailApp preview was exercised over local HTTP. This is synthetic local evidence only, not native Telegram target-device acceptance.

- Cache-busted first `DOMContentLoaded` / app-shell observation: `515 ms`.
- Ten sequential warm reloads reached a visible shell with the boot overlay hidden in `[133, 108, 107, 128, 125, 136, 133, 142, 153, 143] ms`.
- Observed maximum and p95-by-10: `153 ms`.
- Desktop `1440x900`: `appVisible=true`, `bootHidden=true`, `horizontalOverflow=false`.
- Mobile `390x844`: `appVisible=true`, `bootHidden=true`, `horizontalOverflow=false`.
- Evidence scope: DOM, accessibility, and layout observations only.
- Screenshot capture was unavailable; no screenshot evidence is claimed.

## Synthetic offline document boundary

After the ten warm loads, CDP set `offline=true` and reloaded the current direct HTML document. The app shell was not served and the browser reached `ERR_INTERNET_DISCONNECTED`. After network restoration, the local preview reopened normally.

This is synthetic proof only that the current direct HTML document cannot guarantee a fresh offline launch without a supported app-shell or Service Worker hosting path. It does not verify or invalidate IndexedDB data-cache behavior, which remains a separate contour. Offline-first document launch remains `BLOCKED` / `UNVERIFIED`.

## Unverified and blocked gates

The overall status remains `PARTIAL`. The following are not elevated by source tests or synthetic local E2 evidence:

- native Telegram target-device warm-launch p95 `<=1000 ms`;
- ten real native launch acceptance runs;
- offline private device-bound unlock;
- POST-Redirect-GET behavior;
- MailApp incremental Gmail History;
- Service Worker and Background Sync behavior under the Apps Script HTML boundary;
- staging and production acceptance.

These gates remain `UNVERIFIED` or `BLOCKED` by the shared Apps Script URL Fetch quota and `T-03`. No production or staging acceptance is claimed.

## Primary references

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Gmail History](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list)
- [Gmail Drafts](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts)
- [Gmail Messages](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API)
- [Background Sync](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)
