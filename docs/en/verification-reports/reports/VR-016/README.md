# VR-016 — P0 ONE-SECOND launch and offline-first boundary

[Українською](../../../../uk/verification-reports/reports/VR-016/README.md)

- **Date:** 2026-07-23
- **Overall status:** PARTIAL
- **Source request:** `REQ-0034`
- **Verification framework:** `REQ-0004`
- **Production boundary:** immutable v65, staging `0`; v66 is preserved as historical immutable; source candidate marker v67 is not deployed

## Verified root causes

1. The GitHub bridge displayed a full-screen mailbox handoff with connection copy.
2. Apps Script `MailApp.html` contained a visible static `bootState` with the same message.
3. `boot()` immediately called `setBootLoading()` and rebuilt the same screen again.
4. Private persistent cache hydration occurs only after server bootstrap because bootstrap establishes the Telegram/Gmail connection-ID allowlist. This is correct security ordering, but it prevents private offline mail from being displayed before network validation.
5. Launch crosses two origins/documents: the GitHub bridge performs a credentialless POST and Apps Script then serves MailApp. A hard production p95 of `≤1000 ms` cannot be claimed without a native trace.

## Atomic findings

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-016-01 | The v66 release cycle ended fail-closed: promotion did not run after return-to-primary failed; exact staging was removed, the menu was restored to production, and stable/HEAD remained v65. | VERIFIED | authenticated release/menu readback and recovery journal |
| VR-016-02 | The duplicate launch presentation came from the bridge handoff, static MailApp boot overlay, and a repeated `setBootLoading()` call in `boot()`. | VERIFIED | source inspection |
| VR-016-03 | The bridge mailbox POST is now single-flight and its duplicate connection copy is not shown during normal handoff. | VERIFIED | `mail_launch_p0.test.js` `5/5` |
| VR-016-04 | `boot()` now shares one in-flight Promise and an ordinary validated launch does not recreate the connection overlay. | VERIFIED | `mail_launch_p0.test.js` `5/5` |
| VR-016-05 | IndexedDB opens in parallel, but no private record is read before `initializeFromBootstrap`; the account allowlist remains the security gate. | VERIFIED | source-order contract and `mail_client_p0.test.js` `14/14` |
| VR-016-06 | Existing cache bounds, namespace isolation, LRU, warm list/thread paths, draft recovery and one-reload guard did not regress. | VERIFIED | `mail_client_p0.test.js` `14/14` |
| VR-016-07 | The main MailApp UI/API contract did not regress. | VERIFIED | `mail_app_contract.test.js` `88/88` |
| VR-016-08 | Prior local measurements were cold `898 ms`, B `431 ms`, cached A `409 ms`; these are not production p95 or a Telegram button-to-interactive trace. | PARTIAL | prior content-free local trace GT-033 |
| VR-016-09 | Warm-launch `≤1000 ms` p95, ten native launches, offline private Inbox and cached-thread acceptance have not run. | UNVERIFIED | no v67 staging exists |
| VR-016-10 | Background Sync is not a baseline browser capability and depends on a Service Worker; current source intentionally does not claim unverified support. | VERIFIED | platform docs and negative source contract |
| VR-016-11 | Returning from the secondary to the primary account in v66 staging conflicts with the local switch contract. | CONFLICTING | native v66 observation versus deterministic tests |

| VR-016-12 | The full cumulative suite and all three documentation gates pass with the new source delta. | VERIFIED | `node --test` `518/518`; bilingual `71` pairs; knowledge hub `17` pairs/`295` source IDs; verification checker pass |

## Platform boundary

- Telegram `initData` continues to be validated server-side; `initDataUnsafe` is not a trust source.
- Apps Script HtmlService runs in a sandboxed iframe; this change does not weaken sandbox or OAuth/session validation.
- IndexedDB is origin-scoped best-effort storage and can be cleared by the user, browser, quota eviction or an incompatible schema.
- Background Sync requires a Service Worker and is not supported uniformly across browser/WebView environments.
- A private cache-first UI before server bootstrap requires a separately designed device-bound unlock/session contract. It cannot be replaced by a plaintext token in browser storage.

## Official sources

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Apps Script HTML restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Apps Script HTML best practices](https://developers.google.com/apps-script/guides/html/best-practices)
- [Gmail synchronization](https://developers.google.com/workspace/gmail/api/guides/sync)
- [Gmail drafts](https://developers.google.com/workspace/gmail/api/guides/drafts)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology)
- [Background Synchronization](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)
- [Service Workers specification](https://www.w3.org/TR/service-workers/)

## Release decision

Source marker v67 is the next cumulative immutable candidate after preserved v66. Staging may be created only after the complete local/CI gate. Promotion is forbidden until native acceptance verifies account switching in both directions, ten launch traces, zero duplicate overlay/bootstrap and a defined cache/security scenario. Production remains v65.

## Staging acceptance addendum: immutable v67

- Date: 2026-07-23
- Status: PARTIAL
- Production boundary: v65 remained unchanged.

### Verified evidence

- The cumulative v67 source, release helper, and staging bridge passed the local release suite (522/522) and required GitHub checks.
- Correct native Telegram Desktop launches opened the previously cached working view without the GitHub handoff card, the repeated connection screen, or a new OAuth interaction.
- The launch implementation uses one in-flight bootstrap promise and keeps private cached records locked until the server bootstrap returns the allowed account set.
- The Telegram menu was restored to the production bridge after acceptance stopped.
- The exact v67 staging deployment was deleted fail-closed, the immutable v67 version was preserved, and production was not promoted.

### Evidence not accepted as verification

- A ten-run coordinate-driven Telegram Desktop sequence also opened native profile and file overlays. Its timing samples are invalid product-performance evidence and are not used for the one-second SLO.
- Native p95 time-to-interactive, offline private-mail launch, bidirectional account switching, draft recovery, and multi-account cache isolation remain unverified.
- The current two-origin GitHub bridge to Apps Script flow has no verified device-bound unlock that would permit private cached mail to be displayed before server bootstrap.

### Release decision

No production promotion was performed. A future cumulative candidate requires a reproducible in-app time-to-interactive trace and a reviewed device-bound unlock or single-origin architecture decision before the offline-private and one-second requirements can become VERIFIED.
