# Known problem register

Updated: **2026-07-22**. Statuses: `Open`, `In progress`, `Blocked`, `Resolved locally`, `Staging verified`, `Deployed to production`, `Production verified`.

| ID | Status | Since Versie | Problem | Resolution / next evidence |
|---|---|---:|---|---|
| GT-001 | Resolved and production verified on v57 | 1 | One mail message reaches Telegram twice | `INBOX+SENT` self/alias copies are skipped entirely and persisted as seen. A clean external `INBOX` marker automatically created exactly one card; after two `/check` runs Telegram contained one marker list item |
| GT-002 | In progress | 1 | Google callback opens a Drive error page instead of the service | Direct Apps Script callback was rejected because Google multi-login is officially unsupported; neutral GitHub callback plus credentialless POST is being implemented; live acceptance remains |
| GT-003 | Production verified | 1 | Header shows an initial instead of the Google profile photo | Header uses the real Google profile photo with a fallback; the photo was read back on staging and production v55 |
| GT-004 | Resolved locally | 1 | `Add Gmail account` requires an extra `Continue with Google` click | Open the authorization URL immediately; show fallback only when browser navigation is blocked |
| GT-005 | Staging verified | 1 | Account panel counts stale/inactive connection IDs | Preferences are filtered against active visible IDs; staging v55 showed three isolated active connections and restored the original context correctly |
| GT-006 | Open | 1 | OAuth client has more than one enabled secret | Determine the active secret from protected runtime evidence; do not delete or rotate in Versie 1 without a safe plan |
| GT-007 | Open, low risk | 1 | GitHub Pages warns about forced Node 24 for older Actions | Update action pins in a later Versie after production stabilization |
| GT-008 | Partially production verified | 1 | Full real-time acceptance of the new Gmail flow is missing | E5 passed for an already connected owner account; fresh account choice/consent/callback and second-account fan-out remain unverified |
| GT-009 | Resolved locally | 1 | Accessibility label uses plural for one account | `1 Gmail account`, plural for other values |
| GT-010 | Deployed to production; concurrency verified locally | 1 | The OAuth token-refresh path had no function-local coordination; parallel calls could update one token record concurrently | Stable v55 contains short ScriptLock claim/commit/release sections, a secret-free per-connection lease, provider I/O outside the lock, and generation/reconnect rechecks; no forced live refresh was performed |
| GT-011 | Staging verified | 1 | Telegram settings lacked native one-click Gmail account switching | Staging v55 showed three isolated Gmail connections; one-click switching to another connection and back to the original context passed without OAuth |
| GT-012 | Staging verified for existing sessions | 1 | A signed-in Google session rewrites the Apps Script web-app URL to `/macros/u/N/` and returns Drive “file not found” | The neutral GitHub Pages bridge opened staging without a Drive error; a fresh OAuth callback remains unverified |

| GT-013 | Verified in production | 1 | The owner /settings command fell through to the fallback and did not show Gmail accounts | Production v42 routes /settings and the Gmail accounts button to native Telegram controls |
| GT-014 | Verified in production | 1 | The Telegram menu web_app opened Apps Script in a signed-in Google session and repeated the Drive error | The temporary command menu was replaced by `📬 Mail · Versie 1`; Web App opens a neutral GitHub Pages bridge rather than a direct Apps Script URL |
| GT-015 | Open, no data mutation | 1 | Two connection records for the same owner Gmail appear as separate buttons | Do not delete or merge records automatically; add account-zone display dedupe after factual identity verification |
| GT-016 | Platform constraint | 1 | Telegram Web shows its standard Open Link warning before external Google OAuth | The product-owned extra Continue with Google step is gone; do not bypass Telegram security UI |
| GT-017 | Open | 1 | Legacy “Open thread in Mini App” mail buttons can still reach the Apps Script Drive error in multi-login Chrome | Account/OAuth is now chat-native; the full Mini App requires a neutral response-capable backend or replacement of legacy deep links |

| GT-018 | Production verified on v57 | 1 | New Gmail mail is not delivered while the frozen scan drains an old backlog | The bounded realtime lane automatically delivered a clean external `INBOX` marker; frozen scan remains the backfill |
| GT-019 | Production verified on v57 | 1 | Manual `/check` inspected only the legacy mailbox | Two consecutive `/check` runs after automatic delivery returned “no new mail” and created no duplicate; the marker remained one Telegram list item |
| GT-020 | Open operational | 1 | Protected credential storage still contains an obsolete Telegram bot-token alias that returns 401 | Runtime uses a separately verified protected reference; do not rotate the current token without a separate safe plan |
| GT-021 | Open in production | 1 | The first production Web App open can remain on the skeleton for more than 15 seconds | One refresh loaded the mailbox; add content-free bridge/backend bootstrap timing and inspect cold-start timeout without Gmail mutations |
| GT-022 | Platform constraint | 1 | `clasp logs` is unavailable because production uses an Apps Script-managed default GCP project without a standard project ID | Do not migrate only for logs: that would permanently revoke current authorizations. Use the Apps Script Executions UI or a separate content-free telemetry reader |
| GT-023 | Resolved and production verified on v57 | 1 | The single minute `checkNewMail_` ran longer than a minute, so full worker passes overlapped and exhausted the daily `URLFETCH` quota | Immutable v57 uses an atomic 150-second timer slot, keeps realtime first, and limits full Gmail History backfill with a 15-minute slot. `444/444` tests passed; production showed completed full/skip cadence with no failed worker in the acceptance window |
| GT-024 | Resolved and production verified on v57 | 1 | The same mailbox network error reproduced on production v55 and owner-only staging v57 during the quota incident | After quota recovery, two v55 launches and the v57 staging A/B passed; v57 was promoted, accepted twice in production, and staging was cleaned. A valid external `INBOX` automatically created one card with no duplicate after two `/check` runs |
| GT-025 | Integrated into immutable v58; live unverified | 1 | Parallel thread metadata always used the Apps Script owner token, including an external multi-account context | `mailboxMultiGmailAccessToken_` is selected for the active `connectionId`, while `ScriptApp.getOAuthToken()` remains limited to the legacy/owner lane; the cumulative v58 suite passed, but mailbox acceptance is blocked by GT-028 |
| GT-026 | Integrated into immutable v58; flag off; live unverified | 1 | Allowlisted owner Gmail reads always consume Apps Script `URLFETCH` quota even though the official Advanced Gmail Service is enabled | The allowlisted owner-read adapter is included in cumulative v58, but the protected flag was not enabled; external OAuth connections retain their own token paths. Live quota reduction is unverified because of GT-028. Source requests: `REQ-0024`, `REQ-0027`, `REQ-0028` |
| GT-027 | PARTIAL; live UI verified on v59, production rolled back | 1 | Sidebar and profile manager used different label state/render paths, lacked unified create/manage controls, and broke long names | v59 staging showed `+ Create`, an accessible management action for USER labels, bounded scrolling, and long nested names without overlap; mutating operations were not run. Production returned to v57 because of GT-030 |
| GT-028 | PARTIAL; fix live-verified on v59, production rolled back | 1 | The launcher retained a one-shot thread route in Telegram WebView history, while a failed automatic open left the reader in an error state instead of returning to the already loaded list | v59 staging and two production launches recovered a stale automatic route to the list without a network/Drive error; a Telegram-persisted route can still produce a content-free recovery notice. Production returned to v57 because of separate GT-030 |
| GT-029 | Resolved and synchronized | 1 | The root README called v37 current production although verified runtime was on v57, creating conflicting guidance for people and recovery agents | `docs/release-state.json`, paired CURRENT_STATE pages, and Release state CI synchronize canonical mutable state; runtime source audit found no bot read of GitHub Markdown, so this was not a runtime root cause. Source request: `REQ-0031` |
| GT-030 | BLOCKED; exact rollback to v57 completed after v59 and v62 attempts | 1 | A post-cleanup v59 execution exceeded the 150-second worker-slot target and overlapped the next execution window; simultaneous Gmail work is not proven | v62 retained the same worker code and lacked the required execution trace, so exact v62 -> v57 rollback restored stable/HEAD v57, staging 0 and journal `rolled_back`; two fresh v57 mailbox launches passed. Root cause and a safe cumulative fix remain `UNVERIFIED` |
| GT-031 | PARTIAL; source candidate | 1 | The main heading and profile fallbacks were hard-wired to one name and did not expose the actual active or shared mail context | REQ-0032 adds a view derived from current opaque connection IDs, full email, an accessible shared mapping, and synchronous render hooks; production remains v57 pending separate acceptance |

## Production evidence 2026-07-20

- Apps Script stable: v42; staging: 0; immutable v41 remains the rollback.
- Local tests: 418/418.
- setupTelegramControls completed in the Apps Script editor; Telegram now exposes a command menu.
- Production /settings showed isolated Gmail accounts, one-click callbacks, and the direct GitHub OAuth launcher.
- The real OAuth flow reached the new Google consent gate; consent was not accepted, so callback success remains unproven.
- REQ-0009: a controlled new message did not appear after the minute trigger or manual /check; the webhook was healthy, isolating the failure to the frozen Gmail scan and worker order.

## Production evidence 2026-07-21

- Bridge-only PR #2 merged as `a7df53c`; product PR #1 merged as `ee9286e` after a normal merge conflict. The `delete/modify` conflict kept the already verified bridge from `main` without rolling back Versie 1 code.
- Immutable Apps Script v55 first passed E4 on staging, then the stable deployment advanced from v50 to v55. The temporary staging deployment was removed after E5.
- Final `PreflightOnly`: stable v55, `headState=candidate_v55`, immutable ready, staging 0, legacy staging 0, journal `cleaned`.
- Staging E4: Web App opened the mailbox without a Drive error, displayed the profile photo, showed three isolated Gmail connections, and passed one-click switching with restoration of the original context.
- Production E5: a controlled owner self-message carrying `SENT+INBOX` automatically produced one card; two `/check` runs returned no new mail, and exact-marker search showed one result both times.
- Production menu: `📬 Mail · Versie 1` opens the static GitHub Pages bridge. No arbitrary mail, OAuth records, or Gmail zones were changed.
- The first production open required one refresh after a skeleton; `clasp logs` could not start without a verified GCP project ID. Both observations remain open as GT-021/GT-022.
- Apps Script Executions confirmed the new delivery-outage cause: one minute trigger produced overlapping 80–106-second invocations, while the per-minute Gmail History fan-out ended with `Service invoked too many times for one day: urlfetch`. The trigger list contained exactly one `checkNewMail_`; its configuration was not changed.
- GT-022 is now classified as a platform constraint: production uses an Apps Script-managed default GCP project. Moving to a standard GCP project only for `clasp logs` would permanently revoke current authorizations, so it was not performed; the Apps Script Executions UI remains the safe evidence source.

## Recovery evidence 2026-07-21 — REQ-0019

- PR #4 merged normally as `23927148cfa616dbd1504e81768d013b01a9ed37`; the full suite passed `440/440`, the additional release tests passed `5/5`, and GitHub checks succeeded.
- Immutable v56 is preserved. Owner-only staging v56 opened the mailbox without a Drive error and showed the profile photo plus three account roots; the automated switch attempt produced no verifiable state change, so switching remains `unverified`.
- After promotion, production v56 showed a network error. The exact rollback restored stable v55 while preserving staging v56; two production v55 bootstrap launches showed the same error, so no candidate-specific regression is proven.
- Apps Script Executions for v56 and v55 showed successful `doPost`, `mailboxRedeemLaunch`/`mailboxRenewSession`, and `mailboxRpc` calls. In the same time windows, `checkNewMail_` ended with `Service invoked too many times for one day: urlfetch` in `gmailApiRequest_`; this separates callback/session replay from the confirmed Gmail API quota blocker.
- Current safe state: stable and HEAD v55, one preserved v56 staging deployment, journal `rolled_back`, and the Telegram menu on production. The default GCP project was not migrated, and secret properties were neither read nor published.
- Source request: `REQ-0019`.

## Stage 1 continuation evidence 2026-07-21

- Git boundary: `origin/main` `535a77d...`; 16 clean worktrees, no stashes or unfinished Git operations, no open PR, and the latest main checks green.
- Release boundary: GET-only `PreflightOnly` passed with production v55, one preserved v57 staging deployment, journal `staging_verified`, and 0 legacy staging deployments. Immutable v56 remained historical.
- Runtime: exactly one `checkNewMail_` trigger; recent 45-149-second executions overlapped, and a failed run ended with the daily `urlfetch` quota exception in `gmailApiRequest_`.
- The Telegram control plane remained healthy: production menu, 0 pending updates, no webhook last error, max connections 1, and `message`/`callback_query` allowed updates.
- The clean local baseline passed 444/444 tests and all documentation/report gates. Fresh account switching, delivery, dedupe, and Mini App acceptance remain `unverified` until quota recovery.
- Full sanitized evidence: [VR-004 Stage 1 appendix](verification-reports/reports/VR-004/STAGE_1_CONTINUATION_AUDIT.md). Source requests: `REQ-0019`, `REQ-0020`.
- Advanced Gmail research: a wholesale direct-HTTP replacement is incompatible with external connection tokens; only an owner-lane hybrid is a safe candidate, and quota reduction remains `unverified`. [Compatibility evidence](verification-reports/reports/VR-004/ADVANCED_GMAIL_COMPATIBILITY.md). Source request: `REQ-0021`.

## Update procedure

1. Add a new problem once using the next `GT-*` ID.
2. Never delete resolved records; change status and add release evidence.
3. Do not mark `Verified in production` from a unit test or staging alone.
4. Do not add email content, OAuth codes, tokens, cookies, or secret properties.

## Research problem register

The complete report-derived risk and unresolved-conflict list is in [Problems](knowledge-hub/PROBLEMS.md). Only verified current defects receive a `GT-*` entry in the table above.

## Independent verification

[VR-001](verification-reports/reports/VR-001/README.md) preserves every contradicted, partial, unverified, and blocked `KH-*` claim. They do not become `GT-*` automatically; `GT-010` was added separately because the current code has a statically confirmed gap. Source request: `REQ-0004`.

## 2026-07-22 addendum: all Gmail roots accepted

- The earlier note that inbound fan-out for secondary roots was unverified is superseded by new production evidence.
- Root-2: a clean Inbox arrival produced exactly one card with the correct account marker; two repeated /check operations produced no duplicate.
- Root-3: a clean Inbox arrival produced exactly one card with the correct account marker; two repeated /check operations produced no duplicate.
- The initial root-2 probe landing in Spam was an external Gmail classification, not a delivery defect: production deliberately excludes Spam.
- The visible Telegram viewport is not sufficient evidence that a card is absent. Final counts use the accessibility index and a unique sanitized marker.
- GT-018, GT-019, GT-023, and GT-024 have no open secondary-root acceptance blocker for production v57.

## GT-027 — Unified Gmail label management

- **Status:** PARTIAL — integrated into immutable v58/v59; the live UI was accepted on v59, but production returned to v57 because of GT-030.
- **Date:** 2026-07-22
- **Request:** [REQ-0026](https://github.com/Tarasevych/gmail-telegram-controls/blob/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8/requests/2026-07-22/REQ-0026-unified-gmail-label-management.md)
- **Root cause:** VERIFIED — the profile list reserved label width for several permanently visible actions, the sidebar had no create/manage controls, and the two surfaces depended on different state slices. Acceptance also exposed click bubbling into the global close handler and implicit CSS grid rows shrinking to 44 px.
- **Fix:** VERIFIED locally in [commit 4ac0b90](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91): shared state/render path, a `+` beside the heading, one accessible pencil action for every USER label, progressive disclosure, bounded scrolling, nested full-path normalization, SYSTEM-label protection, permission/retry states, and synchronous refresh of both surfaces.
- **Verification:** VERIFIED locally — final UI contract `84/84`; cumulative v58 suite `460/460`; 390×760 and 1280×820 with 48 synthetic labels had no horizontal or vertical overlap.
- **Live verification:** VERIFIED on v59 staging — the profile panel exposed `+ Create`, an accessible management action for every USER label, separate SYSTEM labels, bounded scrolling, and long nested names without overlap. Create/rename/delete were intentionally not run to avoid mutating arbitrary Gmail labels.
- **Release boundary:** PARTIAL — v59 was promoted after UI acceptance, but an exact rollback returned production to v57 because of the separate GT-030 runtime blocker.
- **Production:** UNVERIFIED — the label changes are not part of current production v57.
- **Report:** [VR-005](verification-reports/reports/VR-005/README.md)
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md)

## GT-028 — Stale automatic thread route in the Telegram Mini App

- **Status:** PARTIAL — root cause and recovery behavior VERIFIED on v59; current production is v57 again after GT-030.
- **Date:** 2026-07-22.
- **Factual correction:** a separately targeted production v57 window successfully loaded the avatar, Inbox, and a real message list; Telegram also contained a fresh delivered notification. The earlier “before server handler” localization was therefore not supported.
- **Root cause:** VERIFIED — the GitHub Pages launcher forwarded the hash route in the POST but retained the same route in Telegram WebView history. `openThread()` caught an automatic deep-link failure, rendered a reader error, and did not clear selection/route, so a fresh menu launch replayed the stale thread.
- **Source fix:** REQ-0029 makes the hash one-shot, while failed automatic initial/hash/resume opens clear the reader and expose the already loaded list. Manual message selection retains the error and `Retry`.
- **Local evidence:** targeted bridge/route suite `238/238`; all non-release tests `440/440`; bilingual, knowledge-hub, and verification validators passed. The full release suite fails closed only at two expected immutable hash guards because changed source intentionally does not match historical v57/v58 pins.
- **Live evidence:** v59 staging opened the mailbox, avatar, and three account roots; a stale automatic route returned to the already loaded list with a content-free notice instead of a reader/network failure. Two v59 production launches also loaded the mailbox.
- **Release boundary:** v59 promotion and cleanup were executed under REQ-0030/P-009, but the post-cleanup GT-030 runtime gate caused an exact rollback to v57. Immutable v59 is preserved and staging is `0`.
- **Report:** [VR-006](verification-reports/reports/VR-006/README.md). Source request: `REQ-0029`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md)

## GT-030 — Post-cleanup worker-slot overrun after v59

- **Status:** BLOCKED; exact rollback VERIFIED, root cause `UNVERIFIED`.
- **Date:** 2026-07-22.
- **Symptom:** after v59 cleanup, one `checkNewMail_` execution completed in `214.96 s` although the worker slot target is 150 seconds. The next execution started before the previous one completed; both completed successfully.
- **Evidence boundary:** execution-window overlap is VERIFIED, but it does not prove simultaneous Gmail fan-out work inside both invocations. Do not claim a lock, quota, or Gmail API root cause without a separate trace.
- **Protective action:** exact v59 -> v57 rollback; post-rollback preflight showed stable and HEAD v57, staging `0`, and journal `rolled_back`; a fresh v57 mailbox launch passed.
- **Next step:** investigate content-free slot telemetry and execution phases on the current Versie 1 source line. Do not create v60 merely to repeat the same acceptance.
- **v62 continuation:** cumulative client candidate v62 passed local tests, CI, owner-only staging, and two production UI launches. The Apps Script process endpoint returned 403 and `clasp logs` had no configured GCP project ID; the default project was not migrated. Because the worker code remained unchanged and the runtime gate could not be proven, exact v62 -> v57 rollback was completed; preflight and two fresh v57 launches passed. See [VR-010](verification-reports/reports/VR-010/README.md).
- **Report:** [VR-007](verification-reports/reports/VR-007/README.md). Source request: `REQ-0030`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md)

## GT-031 — Static active-mail heading

- **Status:** PARTIAL — root cause, source implementation, local automated checks, and responsive visual checks are VERIFIED; live/production acceptance is UNVERIFIED.
- **Local verification:** VERIFIED — targeted contract `88/88`, full non-release suite `443/443`; desktop and mobile `390x760` were checked without horizontal overflow, and the shared mapping opens with Enter and remains within the viewport.
- **Date:** 2026-07-22.
- **Request:** [REQ-0032](https://github.com/Tarasevych/gmail-telegram-controls/blob/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8/requests/2026-07-22/REQ-0032-dynamic-active-mail-context-header.md).
- **Root cause:** VERIFIED — `<title>`, the visible `<h1>`, initial `state.account`, and two normalization fallback paths contained a static name; the UI lacked a derived representation of the actual active/shared context.
- **Source fix:** one view model reads current `state.accounts`, `state.account.id`, `unifiedConnectionIds`, and `unifiedMode`; identity is selected by opaque connection ID. A single account exposes the localized inflected owner name and full email, while two or more participants expose `Спільна пошта` and an accessible expandable name-to-address mapping.
- **Fallback/accessibility:** email becomes the primary identifier when the name is missing; the avatar remains supplementary; loading/empty/error states, wrapping, bounded scrolling, native keyboard disclosure, a live region, and visible focus require no reload.
- **Boundary:** OAuth, Gmail permissions, account membership, and mail-flow composition are unchanged. The source is not production v57; immutable v60 was not created because GT-030 remains open.
- **Report:** [VR-008](verification-reports/reports/VR-008/README.md).
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-032 — Typography differs from the Gmail reading context

- **Status:** PARTIAL — live Gmail CSS, source fix, and integrated v62 staging presentation are VERIFIED; a same-scale production typography comparison remains UNVERIFIED, and v62 was rolled back because of GT-030.
- **Date:** 2026-07-22. Source request: `REQ-0033`.
- **Root cause:** the client mixed undersized 11–13 px interface text, heavy headings, and a 1.65 message line height without one typography scale.
- **Source fix:** a local-first Gmail-compatible UI stack, a separate reading stack, 14 px/20 px list rhythm, 14 px/1.5 reading and compose rhythm, responsive sizing, and no remote font dependency or layout-blocking font request.
- **Evidence:** authenticated read-only Gmail inspection at the same browser scale returned the current UI stack and 14 px/20 px mail-list cells; no mail was opened or changed. See [VR-009](verification-reports/reports/VR-009/README.md).
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-033 — Repeated loading and blocked internal navigation

- **Status:** PARTIAL — root cause, source implementation, local performance contracts, and v62 list/account UI acceptance are VERIFIED; live `A -> B -> A` performance trace and production acceptance remain UNVERIFIED after rollback.
- **Root cause:** list routes cleared all rows before every RPC; every thread open discarded the current detail; `threadLoading` dropped a second click; accepted responses rebuilt the whole list DOM.
- **Baseline:** local preview cold usable list `898 ms`; B open `431 ms`; already visited A reopen `409 ms`; static trace shows three `getThread` plus three `attentionState` RPCs for `A -> B -> A`.
- **Source fix:** warm list/thread restore, concurrent generation guards, request dedupe, keyed row reuse, saved scroll/view state, and no document reload for ordinary navigation.
- **Evidence:** [VR-009](verification-reports/reports/VR-009/README.md). Source request: `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-034 — Missing bounded cache and background revalidation

- **Status:** PARTIAL — bounded architecture and v62 live account/list isolation are VERIFIED; browser quota and eviction acceptance remain UNVERIFIED, and v62 is not production.
- **Root cause:** the client had no memory cache, IndexedDB, Cache Storage, Service Worker, or persistent view state; all freshness checks blocked the visible UI.
- **Source fix:** normalized account-scoped records, 60-entry memory LRU, 120-record/4 MiB persistent budget, seven-day hard expiry, per-record cap, stale-while-revalidate, 45-second visible-tab refresh, stable IDs, stale-response rejection and account purge.
- **Boundary:** no token, session, credential or staging value is stored. Service Worker/Background Sync is not claimed; the Apps Script staging boundary must be tested before changing that status.
- **Evidence:** [VR-009](verification-reports/reports/VR-009/README.md). Source request: `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-035 — Draft text lacks an immediate persistent recovery checkpoint

- **Status:** PARTIAL — existing Gmail autosave and the new local checkpoint are source-verified; offline/restart/cross-session acceptance remains UNVERIFIED.
- **Root cause:** Gmail autosave already used a stable operation ID and stale-response guards, but unsaved edits lived only in memory until the debounced server request completed.
- **Source fix:** immediate bounded IndexedDB text checkpoint per connection, continued debounced Gmail Draft save, lifecycle flushes, attachment-byte exclusion, canonical acknowledgement cleanup, and explicit local-versus-Gmail conflict choice.
- **Boundary:** another device can resume only a Gmail-confirmed draft. Browser-local recovery is never represented as server-confirmed.
- **Evidence:** [VR-009](verification-reports/reports/VR-009/README.md). Source request: `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-036 — A new production client can remain stale in an open Mini App

- **Status:** PARTIAL — source mechanism and v62 deployment transitions are recorded; the targeted stale-client one-reload/no-loop acceptance remains UNVERIFIED, and production returned to v57.
- **Root cause:** ordinary mail state and client-code version had no separate lifecycle; an already open document had no production release signal.
- **Source fix:** exact client release ID, versioned cache schema, public content-free production manifest check, draft-safe single reload guard, and a manual reopen state after one failed activation attempt.
- **Boundary:** the immutable Apps Script HTML remains the app shell. No unsupported Service Worker is simulated, and routine mail synchronization never reloads the document.
- **Evidence:** [VR-009](verification-reports/reports/VR-009/README.md). Source request: `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).
