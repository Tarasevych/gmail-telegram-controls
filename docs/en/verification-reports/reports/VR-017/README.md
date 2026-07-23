# VR-017 — V3 cache-first launch hardening

[Українською](../../../../uk/verification-reports/reports/VR-017/README.md)

- **Date:** 2026-07-23
- **Overall status:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-27`
- **Issues:** `GT-040–GT-047`
- **Release boundary:** production/HEAD v65, staging `0`; immutable v67 is preserved; source marker v68 is not yet an immutable release

## Recovery boundary

- The atomic v67 acceptance operation ended before this work: the production menu was restored, exact staging was removed, immutable v67 was preserved, and no promotion ran.
- V3 product work runs in a separate worktree/branch and does not change Gmail OAuth, Telegram zones, mail, or protected properties.
- `REQ-0035` was registered before the product change; relevant instructions and the authority index were corrected through separate normal PRs.

## Verified root causes

1. `MailApp.html` contained static boot copy and runtime copy of the same connection message.
2. Storage warmup called the nonexistent `p0OpenDatabase`; the actual function is named `p0OpenDb`. The prior test incorrectly pinned the invalid symbol.
3. `boot()` deduplicated only an active Promise and allowed the complete pipeline to run again after settlement.
4. Persistent namespaces were account-scoped but had no separate opaque Telegram-owner scope.
5. The account attention/onboarding path could delay or incorrectly change the normal launch decision.
6. Background prefetch of thread bodies before a user click was absent.

## Implementation in source candidate v68

- the hidden boot host no longer contains duplicate full-screen copy;
- launch has in-flight and settled single-flight guards, while explicit preview restart uses `force`;
- warmup calls `p0OpenDb` and reads no private record before server bootstrap;
- the server issues a 43-character opaque HMAC cache scope without a raw Telegram ID;
- cache keys contain `owner scope + Gmail connection ID`; cross-owner/cross-account records are not read;
- schema v2 is bounded to `480 records`, `16 MiB`, `45 days`, and `1.5 MiB` per record with LRU eviction;
- the persistent-storage request is advisory and does not block the app shell;
- lists/threads render cache-first and network revalidation runs in the background;
- the account attention/onboarding decision runs after the authoritative response without blocking an already usable UI;
- unread-first prefetch is limited to three thread bodies and performs no `markRead` or mail mutation;
- the historical v67 release helper remains immutable and does not bind later source to v67.

## Atomic claims

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-017-01 | Recovery state before V3 work was safe: production v65, staging `0`, immutable v67 historical. | VERIFIED | private recovery ledger and authenticated release readback |
| VR-017-02 | Duplicate launch copy and the invalid IndexedDB helper existed in cumulative source. | VERIFIED | source inspection and regression tests |
| VR-017-03 | v68 source has one ordinary boot presentation and settled single-flight. | VERIFIED | `mail_launch_p0.test.js` |
| VR-017-04 | Cache namespace is isolated by an opaque Telegram-owner scope and stable Gmail connection ID. | VERIFIED | `MailClient.gs`, namespace VM contracts |
| VR-017-05 | The cache is bounded/versioned and the new delta stores no token/signature. | VERIFIED | source contracts and added-lines scan with `0` high-risk signatures |
| VR-017-06 | Prefetch does not change read state. | VERIFIED | source contract: no `markRead`/mutation in prefetch |
| VR-017-07 | Existing draft, label, navigation, multi-account, and version-update contracts did not regress locally. | VERIFIED | cumulative suite `526/526` |
| VR-017-08 | Targeted P0/release tests pass. | VERIFIED | `25/25` |
| VR-017-09 | The MailApp contract passes. | VERIFIED | `88/88` |
| VR-017-10 | Bilingual, knowledge-hub, verification-report, and release-state validators pass. | VERIFIED | local validator output |
| VR-017-11 | Native warm-launch p95 `≤1000 ms` and ten consecutive launches are proven. | UNVERIFIED | no v68 staging exists |
| VR-017-12 | A private offline Inbox is available before server bootstrap without a device-bound secret. | BLOCKED | current security/origin boundary |
| VR-017-13 | Native prefetch, drafts, bidirectional switching, and shared-mode isolation are proven. | UNVERIFIED | owner-only staging acceptance is pending |
| VR-017-14 | A production one-reload/no-loop v67/v68 transition is proven. | UNVERIFIED | v68 was not promoted |
| VR-017-15 | Immutable v67 remains unchanged; the new cumulative source uses marker v68. | VERIFIED | v67 helper/history is unchanged |

## Platform boundary

- Telegram `initData` is validated server-side; client `initDataUnsafe` is not a trust source.
- Apps Script HtmlService runs in a sandboxed iframe and does not guarantee a Service Worker/offline app-shell contract.
- IndexedDB and storage persistence are origin-scoped best effort; eviction and user-cleared site data remain possible.
- Background Sync depends on a Service Worker and is not claimed for a closed Telegram WebView.
- The current bridge-to-Apps-Script route cannot prove button-to-private-Inbox `≤1000 ms` without a native trace and a separate device-bound unlock or single-origin decision.

## Official sources

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Apps Script HTML restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Apps Script web apps](https://developers.google.com/apps-script/guides/web)
- [Gmail synchronization](https://developers.google.com/workspace/gmail/api/guides/sync)
- [Gmail drafts](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.drafts)
- [IndexedDB](https://w3c.github.io/IndexedDB/)
- [Storage](https://storage.spec.whatwg.org/)
- [Service Workers](https://w3c.github.io/ServiceWorker/)
- [Background Sync](https://wicg.github.io/background-sync/spec/)

## Release decision

The local source/test gate passed, but native acceptance is absent. After merge, create a separate exact hash-pinned immutable v68 helper, pass `PreflightOnly`, and create one owner-only staging deployment. Production promotion is forbidden until the critical native gates are VERIFIED; v65 remains rollback-safe production.
