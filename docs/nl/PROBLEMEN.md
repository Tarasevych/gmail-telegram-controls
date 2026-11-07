# Known problem register

Updated: **2026-07-23**. Statuses: `Open`, `In progress`, `Blocked`, `Resolved locally`, `Staging verified`, `Deployed to production`, `Production verified`.

| ID | Status | Since Versie | Problem | Resolution / next evidence |
|---|---|---:|---|---|
| GT-001 | Resolved and production verified on v57 | 1 | One mail message reaches Telegram twice | A clean external `INBOX` marker created exactly one card and durable Gmail message-ID/card reservations prevented replay; the separate current `SENT+INBOX` non-delivery is tracked as GT-039 |
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
| GT-024 | PARTIAL; shared quota blocker recurred 2026-07-23 | 1 | The same generic mailbox error can affect an owner-only candidate and the accepted production baseline during daily `URLFETCH` quota exhaustion | The historical v57 recovery remains verified. During the v70 gate, staging opened once but secondary switching failed; a fresh v65 production launch then returned the same error. Apps Script completed `doPost`, redeem, and RPC while the timer failed in `legacy_recovery` with `errorCode=urlfetch_quota`. No candidate-specific regression is established; repeat one bounded A/B only after quota recovery |
| GT-025 | Integrated into immutable v58; live unverified | 1 | Parallel thread metadata always used the Apps Script owner token, including an external multi-account context | `mailboxMultiGmailAccessToken_` is selected for the active `connectionId`, while `ScriptApp.getOAuthToken()` remains limited to the legacy/owner lane; the cumulative v58 suite passed, but mailbox acceptance is blocked by GT-028 |
| GT-026 | Integrated into immutable v58; flag off; live unverified | 1 | Allowlisted owner Gmail reads always consume Apps Script `URLFETCH` quota even though the official Advanced Gmail Service is enabled | The allowlisted owner-read adapter is included in cumulative v58, but the protected flag was not enabled; external OAuth connections retain their own token paths. Live quota reduction is unverified because of GT-028. Source requests: `REQ-0024`, `REQ-0027`, `REQ-0028` |
| GT-027 | PARTIAL; live UI verified on v59, production rolled back | 1 | Sidebar and profile manager used different label state/render paths, lacked unified create/manage controls, and broke long names | v59 staging showed `+ Create`, an accessible management action for USER labels, bounded scrolling, and long nested names without overlap; mutating operations were not run. Production returned to v57 because of GT-030 |
| GT-028 | PARTIAL; fix live-verified on v59, production rolled back | 1 | The launcher retained a one-shot thread route in Telegram WebView history, while a failed automatic open left the reader in an error state instead of returning to the already loaded list | v59 staging and two production launches recovered a stale automatic route to the list without a network/Drive error; a Telegram-persisted route can still produce a content-free recovery notice. Production returned to v57 because of separate GT-030 |
| GT-029 | Resolved and synchronized | 1 | The root README called v37 current production although verified runtime was on v57, creating conflicting guidance for people and recovery agents | `docs/release-state.json`, paired CURRENT_STATE pages, and Release state CI synchronize canonical mutable state; runtime source audit found no bot read of GitHub Markdown, so this was not a runtime root cause. Source request: `REQ-0031` |
| GT-030 | VERIFIED in production; dedicated History-substage trace remains UNVERIFIED | 1 | The former 150-second admission TTL could expire before a legal Apps Script execution completed | The tokenized seven-minute crash lease prevents simultaneous Gmail work, retains the 150-second soft stage deadline, and passed sequential production worker evidence; the separate 15-minute History substage still has automated-contract evidence only |
| GT-031 | Production verified on v64 and retained in v65 | 1 | Active account identity clipped on a narrow header | A stable-ID context view, full email disclosure, shared mapping, wrapping, and compact narrow-screen details passed native staging and two fresh production launches |
| GT-032 | PARTIAL | 1 | Typography differed from the Gmail reading context | Gmail-compatible local-first type scales are deployed; same-scale production visual comparison remains UNVERIFIED |
| GT-033 | PARTIAL | 1 | Internal navigation repeatedly cleared and reloaded already available views | Warm list/thread restore, request dedupe, generation guards, keyed rows and saved view state are deployed; measured production `A -> B -> A` evidence remains UNVERIFIED |
| GT-034 | PARTIAL | 1 | The client lacked bounded account-isolated cache and background revalidation | Memory LRU, bounded IndexedDB records, expiry, stale-while-revalidate and account purge are deployed; browser quota/eviction acceptance remains UNVERIFIED |
| GT-035 | PARTIAL | 1 | Draft text had no immediate persistent recovery checkpoint | Account-scoped IndexedDB text recovery complements stable Gmail Draft autosave; offline/restart/cross-session acceptance remains UNVERIFIED |
| GT-036 | PARTIAL; source deployed in v65 | 1 | A new production client could remain stale in an open Mini App | Canonical release parsing and marker v65 are deployed with one-reload guards; a future v65-to-newer transition must prove exactly one reload and no loop |
| GT-037 | Production verified on v64 and retained in v65 | 1 | Promotion could report failure after a successful deployment update | One mutation plus bounded read-after-write reconciliation passed live promotion, cleanup and final preflight |
| GT-038 | PARTIAL | 1 | Telegram Web K/A shows a blank signed Mini App while native Desktop succeeds | Native Desktop staging/production passed; web-only root cause remains UNVERIFIED and signature/session controls must not be weakened |
| GT-039 | PARTIAL; source fix merged | 1 | A message labeled both `SENT` and `INBOX` is silently excluded from Telegram | Remove the `SENT` exclusion only after the required `INBOX` gate; preserve spam/trash/important boundaries and dedupe by stable Gmail message ID; v66 staging/production acceptance remains |

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

  - **Status:** CONFLICTING — current source and synthetic contracts preserve controls for USER labels, but the current owner report of missing pencils has no independent native readback yet.
- **Date:** 2026-07-22
- **Request:** [REQ-0026](https://github.com/Tarasevych/gmail-telegram-controls/blob/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8/requests/2026-07-22/REQ-0026-unified-gmail-label-management.md)
- **Root cause:** VERIFIED — the profile list reserved label width for several permanently visible actions, the sidebar had no create/manage controls, and the two surfaces depended on different state slices. Acceptance also exposed click bubbling into the global close handler and implicit CSS grid rows shrinking to 44 px.
- **Fix:** VERIFIED locally in [commit 4ac0b90](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91): shared state/render path, a `+` beside the heading, one accessible pencil action for every USER label, progressive disclosure, bounded scrolling, nested full-path normalization, SYSTEM-label protection, permission/retry states, and synchronous refresh of both surfaces.
- **Verification:** VERIFIED locally — final UI contract `84/84`; cumulative v58 suite `460/460`; 390×760 and 1280×820 with 48 synthetic labels had no horizontal or vertical overlap.
- **Live verification:** VERIFIED on v59 staging — the profile panel exposed `+ Create`, an accessible management action for every USER label, separate SYSTEM labels, bounded scrolling, and long nested names without overlap. Create/rename/delete were intentionally not run to avoid mutating arbitrary Gmail labels.
  - **Release boundary:** current production is v65 and staging is `0`; E-04 creates no candidate and changes no immutable history.
  - **E-04 follow-up 2026-07-23:** the authoritative `label.type` regression matrix covers USER labels named `INBOX/...`, `[Imap]/...`, localized/system-like names, `labelHide`, multiple account-scoped metadata paths, and SYSTEM protection without a Gmail mutation.
  - **Current evidence:** focused `7/7`, full Apps Script `619/619`; no source defect is confirmed. Native current-production pencils/two-surface acceptance remains `UNVERIFIED` because of the shared URL Fetch quota blocker, so the conflict remains open.
  - **Reports:** historical [VR-005](verification-reports/reports/VR-005/README.md), current regression [VR-033](verification-reports/reports/VR-033/README.md)
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md)

## GT-028 — Stale automatic thread route in the Telegram Mini App

- **Status:** PARTIAL — root cause and recovery behavior VERIFIED on v59; current production is v57 again after GT-030.
- **Date:** 2026-07-22.
- **Factual correction:** a separately targeted production v57 window successfully loaded the avatar, Inbox, and a real message list; Telegram also contained a fresh delivered notification. The earlier “before server handler” localization was therefore not supported.
- **Root cause:** VERIFIED — the GitHub Pages launcher forwarded the hash route in the POST but retained the same route in Telegram WebView history. `openThread()` caught an automatic deep-link failure, rendered a reader error, and did not clear selection/route, so a fresh menu launch replayed the stale thread.
- **Source fix:** REQ-0029 makes the hash one-shot, while failed automatic initial/hash/resume opens clear the reader and expose the already loaded list. Manual message selection retains the error and `Retry`.
- **Local evidence:** targeted bridge/route suite `238/238`; all non-release tests `440/440`; bilingual, knowledge-hub, and verification validators passed. The full release suite fails closed only at two expected immutable hash guards because changed source intentionally does not match historical v57/v58 pins.
- **Live evidence:** v59 staging opened the mailbox, avatar, and three account roots; a stale automatic route returned to the already loaded list with a content-free notice instead of a reader/network failure. Two v59 production launches also loaded the mailbox.
- **Release boundary:** v59 promotion and cleanup were executed under REQ-0030/P-009, but the post-cleanup GT-030 runtime gate caused an exact rollback to v63. Immutable v59 is preserved and staging is `0`.
- **Report:** [VR-006](verification-reports/reports/VR-006/README.md). Source request: `REQ-0029`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md)

## GT-030 — Worker admission lease could expire before the Apps Script execution

- **Status:** VERIFIED — immutable v63 is production and seven successive one-minute worker executions completed without overlap.
- **Root cause:** the former 150-second property was an admission TTL, not a full execution lock. A legal Apps Script execution could outlive it, allowing a later minute trigger to enter while the first worker was still alive.
- **Fix:** v63 uses a tokenized seven-minute crash lease, retains 150 seconds as a soft stage deadline, permits only token-matched release in `finally`, and emits content-free telemetry.
- **Evidence:** focused contracts `17/17`, cumulative suite `501/501`, two production launches, seven sequential completed runtime rows, and final stable/HEAD v63 preflight. See [VR-011](verification-reports/reports/VR-011/README.md).
- **Boundary:** the separate 15-minute History substage has automated-contract evidence; a dedicated runtime substage trace remains UNVERIFIED.

## GT-031 — Active account identity can clip on a narrow header

- **Status:** VERIFIED — the correction passed native staging and two fresh production launches on immutable v64.
- **Observed residual in v63:** a controlled alternate-account header clipped the final part of a long email on a narrow view.
- **Root cause:** desktop wrapping existed, but the fixed narrow topbar reduced the subtitle to a cropped line and exposed no tappable single-account full-address disclosure. A desktop `title` hint was not a sufficient touch-device recovery path.
- **Fix:** wider views retain wrapping; narrow views use a compact native `<details>` disclosure backed by the existing stable-ID context model and full account map. Hidden-state precedence, focus visibility, keyboard behavior and shared mode remain intact.
- **Acceptance:** native v64 staging showed the full address disclosure, avatar/fallback behavior, three isolated roots, shared mapping and controlled switching without OAuth; two fresh production launches repeated the responsive account context.
- **Tests:** focused mail-app contract `88/88`; final cumulative suite `505/505`.
- **Evidence:** [VR-013](verification-reports/reports/VR-013/README.md). Source request: `REQ-0033`.
## GT-032 — Typography differs from the Gmail reading context

- **Status:** PARTIAL — live Gmail CSS, the main source scale, native v63 staging/production presentation, and the F-03 local computed-style regression pass are VERIFIED; a same-scale current-production comparison and populated real-thread visual pass remain UNVERIFIED. Release evidence: [VR-011](verification-reports/reports/VR-011/README.md).
- **Date:** 2026-07-22; F-03 clarification 2026-07-23. Source requests: `REQ-0033`, `REQ-0035`.
- **Root cause:** the client originally mixed undersized 11–13 px interface text, heavy headings, and a 1.65 message line height without one typography scale. The first correction did not cover legacy 10 px compose account/save status, 11 px settings metadata/account controls, or nowrap account-card labels.
- **Source fix:** a local-first Gmail-compatible UI stack, a separate reading stack, 14 px/20 px list rhythm, 14 px/1.5 reading and compose rhythm, responsive sizing, no remote font request, 12 px secondary metadata/control floors, and wrap-safe account identity labels.
- **Evidence:** authenticated read-only Gmail inspection at the same browser scale returned the current UI stack and 14 px/20 px mail-list cells; no mail was opened or changed. F-03 used a synthetic local preview and content-free computed-style readback only. See [VR-009](verification-reports/reports/VR-009/README.md) and [VR-037](verification-reports/reports/VR-037/README.md).
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-033 — Repeated loading and blocked internal navigation

- **Status:** PARTIAL — root cause, source implementation, local performance contracts, and v63 native list/account acceptance are VERIFIED; a measured production `A -> B -> A` trace remains UNVERIFIED. Release evidence: [VR-011](verification-reports/reports/VR-011/README.md).
- **Root cause:** list routes cleared all rows before every RPC; every thread open discarded the current detail; `threadLoading` dropped a second click; accepted responses rebuilt the whole list DOM.
- **Baseline:** local preview cold usable list `898 ms`; B open `431 ms`; already visited A reopen `409 ms`; static trace shows three `getThread` plus three `attentionState` RPCs for `A -> B -> A`.
- **Source fix:** warm list/thread restore, concurrent generation guards, request dedupe, keyed row reuse, saved scroll/view state, and no document reload for ordinary navigation.
- **Evidence:** [VR-009](verification-reports/reports/VR-009/README.md). Source request: `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-034 — Missing bounded cache and background revalidation

- **Status:** PARTIAL — bounded architecture and v63 live account/list isolation are VERIFIED; browser quota and eviction acceptance remain UNVERIFIED. Release evidence: [VR-011](verification-reports/reports/VR-011/README.md).
- **Root cause:** the client had no memory cache, IndexedDB, Cache Storage, Service Worker, or persistent view state; all freshness checks blocked the visible UI.
- **Source fix:** normalized account-scoped records, 60-entry memory LRU, 120-record/4 MiB persistent budget, seven-day hard expiry, per-record cap, stale-while-revalidate, 45-second visible-tab refresh, stable IDs, stale-response rejection and account purge.
- **Boundary:** no token, session, credential or staging value is stored. Service Worker/Background Sync is not claimed; the Apps Script staging boundary must be tested before changing that status.
- **Evidence:** [VR-009](verification-reports/reports/VR-009/README.md). Source request: `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-035 — Draft text lacks an immediate persistent recovery checkpoint

- **Status:** PARTIAL — existing Gmail autosave and the local checkpoint are present in production v63; offline/restart/cross-session acceptance remains UNVERIFIED. Release evidence: [VR-011](verification-reports/reports/VR-011/README.md).
- **Root cause:** Gmail autosave already used a stable operation ID and stale-response guards, but unsaved edits lived only in memory until the debounced server request completed.
- **Source fix:** immediate bounded IndexedDB text checkpoint per connection, continued debounced Gmail Draft save, lifecycle flushes, attachment-byte exclusion, canonical acknowledgement cleanup, and explicit local-versus-Gmail conflict choice.
- **Boundary:** another device can resume only a Gmail-confirmed draft. Browser-local recovery is never represented as server-confirmed.
- **Evidence:** [VR-009](verification-reports/reports/VR-009/README.md). Source request: `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-036 — A new production client can remain stale in an open Mini App

- **Status:** PARTIAL — the manifest/marker correction is deployed in production v65 and two fresh launches passed; automatic one-reload/no-loop transition remains UNVERIFIED.
- **Root cause:** ordinary mail state and client-code version originally had no separate lifecycle. The first implementation then omitted the canonical `production.appsScriptImmutable` manifest field and retained a stale v60 marker in production v64, so it could not prove that a newly loaded client matched production.
- **Source correction:** read the canonical immutable field first, identify immutable v65 as `Versie-1-v65-p0`, retain draft-safe one-reload/session guard behavior, and regression-test the real `docs/release-state.json` contract.
- **Boundary:** the immutable Apps Script HTML remains the app shell. No unsupported Service Worker is simulated, and routine mail synchronization never reloads the document.
- **Release boundary:** production/HEAD are exact immutable v65, staging is `0`, journal is `cleaned`, and exact v64 remains rollback. The defective v64 parser prevents direct proof of the v64-to-v65 automatic transition.
- **Evidence:** [VR-014](verification-reports/reports/VR-014/README.md). Source request: `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).
## GT-037 — Promotion helper can report a false negative after a successful deployment update

- **Status:** VERIFIED — bounded helper hardening and live v63-to-v64 promotion acceptance passed.
- **Observed behavior in v63:** `Promote` advanced stable v57 to v63, then an immediate stale read raised `Stable deployment did not advance to the candidate.`
- **Root cause:** the old helper had no bounded read-after-write reconciliation window. The propagation mechanism is inferred from authoritative readback rather than claimed as a platform guarantee.
- **Fix:** promotion and rollback perform one deployment PUT followed by at most five read-only checks, accept only the exact prior version during convergence, and fail closed on any contradictory version.
- **Live acceptance:** v64 promotion advanced exact v63 to v64 with one mutation and bounded reconciliation, without a duplicate mutation or false negative. Cleanup and final preflight confirmed stable/HEAD v64, staging `0` and journal `cleaned`.
- **Tests:** focused release contracts `2/2`; final cumulative suite `505/505`.
- **Evidence:** [VR-013](verification-reports/reports/VR-013/README.md).
## GT-038 — Telegram Web K/A shows a blank signed Mini App while native Desktop succeeds

- **Status:** PARTIAL — native Telegram Desktop staging and production are VERIFIED; the web-only failure and its root cause remain UNVERIFIED.
- **Observed behavior:** Telegram Web K and A opened the exact v63 signed bridge iframe but rendered a blank/broken embedded page.
- **Boundary:** do not weaken signed bootstrap, session validation or account isolation to make the web client render.
- **Next evidence:** capture content-free browser/runtime diagnostics for the same release and compare supported Telegram Web embedding constraints with native Desktop.
- **Evidence:** [VR-011](verification-reports/reports/VR-011/README.md).

## GT-039 — `SENT+INBOX` mail is excluded instead of delivered once

- **Status:** BLOCKED — evidence classification `CONFLICTING`; `blocker_type=owner_decision`.
- **Production v65:** `INBOX+SENT` is skipped and durably marked seen; this matches the explicit self/alias acceptance in `REQ-0019`.
- **Current source:** `gmailNotificationLabelsEligible_` allows `INBOX+SENT`; the focused `161/161` suite proves one delivery and dedupe on the second scan.
- **Conflict:** `REQ-0009` and `REQ-0019` require self/alias copies not to duplicate and explicitly record their exclusion. The later `GT-039` under `REQ-0033` changed source to exactly-once, but owner request `REQ-0033` contains no separate policy decision for self/alias mail.
- **Release boundary:** source commit `a6ba4d07feaeb7e9369b5e64860e1c3acd57048b` remains preserved as a verified artifact, but its notification-policy delta cannot enter a new cumulative candidate before a direct owner decision.
- **Required decision:** choose one invariant: `(A)` skip self/alias `INBOX+SENT` and deliver external `INBOX` once; or `(B)` deliver every `INBOX`, including self/alias `INBOX+SENT`, once.
- **Evidence:** historical source evidence [VR-015](verification-reports/reports/VR-015/README.md); conflict reconciliation [VR-025](verification-reports/reports/VR-025/README.md). Source request: `REQ-0035`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-040 — ONE-SECOND warm-launch performance

- **Status:** PARTIAL
- **Source request:** `REQ-0034`
- **Local source v70:** VERIFIED — the bridge supplies a validated content-free launch start time and MailApp measures cross-document time to usable UI; focused tests `113/113`, full suite `567/567`, added-production-line secret-value scan `0`, and clean `git diff --check`.
- **Measurement boundary:** the new trace begins in the bridge document, not at the Telegram button press; it improves evidence but is not yet a native button-to-interactive p95.
- **Remaining boundary:** warm-launch `≤1000 ms` p95, ten native launches, and offline private-mail opening remain `UNVERIFIED`; production v65 is unchanged, one owner-only v70 staging is active, and promotion is forbidden pending acceptance.
- **Evidence:** [VR-016](verification-reports/reports/VR-016/README.md)

## GT-041 — Duplicate launch/auth pipeline

- **Status:** PARTIAL
- **Root cause:** the bridge handoff, static MailApp overlay, and repeated `setBootLoading()` displayed the same connection screen; a hard reload of the POST document is additionally outside the inner iframe's control.
- **Source correction:** hidden credentialless handoff, single-flight form submission, a shared in-flight `boot()` Promise, and no boot overlay during an ordinary validated launch. Source v70 preserves that idempotency and adds a content-free launch trace.
- **Local evidence:** launch/client/app contracts `113/113`; complete Apps Script suite `567/567`.
- **Remaining boundary:** zero repeated screens and zero duplicate auth/bootstrap requests across ten native launches remain `UNVERIFIED`; a browser-level form-resubmission prompt cannot be removed by code in the already loaded MailApp document.

## GT-042 — Offline persistent cache

- **Status:** PARTIAL
- The bounded/versioned IndexedDB cache, LRU, normalized entities, and account/owner namespaces are locally `VERIFIED`.
- Source v70 does not weaken the allowlist: private records are read only after Telegram/Gmail connection IDs are confirmed.
- A true offline private Inbox before server bootstrap remains `BLOCKED` without a supported device-bound unlock or first-party single-origin app shell.
- Service Worker/Background Sync support is not claimed for the current two-origin Apps Script IFRAME contour without factual evidence.

## GT-043 — Background prefetch and incremental sync

- **Status:** PARTIAL
- Warm list/thread stale-while-revalidate and the Gmail History boundary already exist in cumulative source.
- Closed-app Background Sync is not claimed: it depends on a Service Worker and lacks universal WebView support. Native arrival/prefetch evidence remains `UNVERIFIED`.

## GT-044 — Session/cache locking

- **Status:** PARTIAL
- Cache namespaces fail closed by Telegram/Gmail connection IDs; storage warmup reads no private records.
- Source v70 classifies only content-free Telegram `SecureStorage` states (`UNSUPPORTED`, `TIMEOUT`, `ERROR`, `MISSING`, `FOUND`, and other allowed codes) and never writes a credential value to telemetry.
- When a one-time launch proof is replayed and no supported secure recovery credential exists, the client enters an explicit locked state instead of a recursive restart loop; replay protection is not weakened.
- Automatic device-bound unlock on the tested Telegram Desktop remains `BLOCKED`/`UNVERIFIED` pending native acceptance or a separate architecture decision.

## GT-045 — Drafts

- **Status:** PARTIAL
- Local recovery, serialized autosave, stable draft operation IDs, and Gmail canonical readback contracts pass locally.
- **C-01 source correction:** normal UX no longer asks the user to “Check saving.” A derived state machine distinguishes `Changed`, `Saving…`, `Saved ✓ <time>`, `Offline — queued`, `Conflict`, and terminal `Not saved — retry`.
- `Saved` is assigned only after canonical Gmail draft readback; pending and terminal retries are bounded, while a manual retry preserves the exact operation ID. A local/server conflict never silently overwrites either version.
- Cross-session/device continuation, a real offline conflict, and native restart acceptance remain `UNVERIFIED`.
- **Evidence:** [VR-040](verification-reports/reports/VR-040/README.md), `RCA-021`. Source request: `REQ-0035`.

## GT-046 — Version-aware client update

- **Status:** PARTIAL
- The one-reload/no-loop source guard is verified; the new source marker is v67 after preserved immutable v66.
- A real production transition is not tested before staging pass and is not grounds for automatic promotion.

## GT-047 — Multi-account cache isolation and switching

- **Status:** CONFLICTING
- Local namespace/switch contracts pass, but v66 staging did not return the UI marker from the secondary to the primary account.
- Promotion is forbidden until native bidirectional switching passes without OAuth or zone mixing.

## 2026-07-23 v67 staging disposition

- GT-040 one-second performance: PARTIAL. Correct cached-view launches were observed, but no valid native p95 trace exists.
- GT-041 launch/auth deduplication: PARTIAL. Source and automated tests pass and correct launches show no duplicate connection screen; native single-flight telemetry is still required.
- GT-042 offline cache: PARTIAL. Persistent storage exists, but private records remain intentionally locked until server account validation.
- GT-043 background prefetch: PARTIAL. Automated contracts pass; closed-WebView execution is not claimed.
- GT-044 session/cache locking: PARTIAL. The allowlist gate is preserved; device-bound offline unlock is not implemented.
- GT-045 drafts: UNVERIFIED in native staging acceptance.
- GT-046 version-aware update: PARTIAL. Source contracts pass; one controlled production reload was not exercised because v67 was not promoted.
- GT-047 multi-account isolation: UNVERIFIED in native staging acceptance.
- Disposition: immutable v67 preserved, temporary staging removed, production v65 unchanged, no promotion.

### GT-040/GT-041 acceptance tooling note

- Status: UNVERIFIED
- Chrome Telegram Web authentication and the owner bot chat are working, but the Mini App child surface could not be retained for DOM or network inspection.
- Do not use this result to assign a regression to production v65 or immutable v67.
- Do not repeat staging until content-free launch telemetry or a supported child-target trace can produce a correlated time-to-interactive result.

## REQ-0035 update for GT-040 through GT-047

- **Date:** 2026-07-23
- **Source request:** `REQ-0035`
- **Evidence:** [VR-017](verification-reports/reports/VR-017/README.md)
- No parallel GT records were created: `GT-040–GT-047` are already the canonical issues for the eight P0 directions.

### GT-040 — ONE-SECOND warm-launch performance

- **Status:** PARTIAL.
- Immutable v68 adds content-free `warmLaunchUsableMs`, cache-hit, and request counters. Owner-only staging showed the app shell near the first `1.2 s` control point but not a usable cached Inbox; native p95 `≤1000 ms` and ten controlled launches remain `UNVERIFIED`.
- Prior `898/431/409 ms` values remain a local baseline only and are not production button-to-interactive evidence.

### GT-041 — Duplicate launch/auth pipeline

- **Status:** PARTIAL.
- Verified source root causes are duplicate static/runtime connection copy, the invalid `p0OpenDatabase` call instead of `p0OpenDb`, and the ability to boot again after the first Promise settled.
- The source fix uses one empty hidden boot host, a settled single-flight guard, the correct storage warmup helper, and an account-scoped onboarding decision after `attentionState`.
- Local contracts pass; two observed native launches showed no repeated connection overlay and no new OAuth. The complete ten-launch gate remains `UNVERIFIED`.

### GT-042 — Offline persistent cache

- **Status:** PARTIAL.
- Schema v2 has bounded budgets of `480 records / 16 MiB / 45 days`, a per-record cap, LRU, and an advisory persistent-storage request.
- A private offline Inbox before server validation remains `BLOCKED`: plaintext tokens or Telegram signatures are not allowed in browser storage.

### GT-043 — Background prefetch and incremental sync

- **Status:** PARTIAL.
- A bounded unread-first prefetch of three thread bodies runs after the UI becomes usable; it does not call `markRead` or any mail mutation.
- Closed-WebView Background Sync is not claimed; a native arrival/prefetch trace remains `UNVERIFIED`.

### GT-044 — Session/cache locking

- **Status:** PARTIAL.
- Cache namespaces now include a server-issued opaque HMAC scope for the Telegram owner and the stable Gmail connection ID. Another owner/account cannot pass the allowlist.
- Records for another owner or a temporarily disconnected account remain locked instead of being exposed or unconditionally deleted.
- A device-bound unlock before server bootstrap is not implemented.

### GT-045 — Drafts

- **Status:** PARTIAL.
- Existing local recovery, serialized Gmail autosave, stable operation/draft IDs, and conflict contracts did not regress in the final `531/531` suite.
- Native restart, offline/online recovery, and verified cross-device Gmail Draft continuation remain `UNVERIFIED`.

### GT-046 — Version-aware client update

- **Status:** PARTIAL.
- Immutable v68, schema migration, and one-reload/no-loop guards exist; historical immutable v67 was not rewritten.
- v68 was not promoted: the exact staging deployment was removed, the journal is `abandoned`, and production remains v65. Production-transition evidence is absent.

### GT-047 — Multi-account cache isolation and switching

- **Status:** PARTIAL.
- Owner/account namespaces, poisoned-record rejection, and deterministic switch contracts pass locally.
- Native primary-secondary-primary switching and shared mode across three roots are `VERIFIED` without a new OAuth flow. Offline cross-owner cache lock/readback and eviction recovery remain `UNVERIFIED`.

## GT-048 — Telegram attachment callback used a mutable ordinal

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Product task:** `B1-28` / V3 `B-01`
- **Root cause:** the Telegram card encoded an attachment position in the MIME list. When Gmail was read again, reordered parts, duplicate names, or a changed MIME shape could direct the callback to a different attachment.
- **Source fix:** new cards use a short opaque identity token derived from stable MIME/Gmail attributes. The server reads the message again, requires exactly one identity match, and fails closed when no match or an ambiguous match exists. A raw Gmail attachment ID is not exposed in callback data.
- **Compatibility:** historical `mail.att:` and `a2.` callbacks remain available only through the legacy ordinal path; every new card uses exact identity.
- **Evidence gap:** the exact connection context previously had no direct behavioral matrix for all five roles, mail zones, the invite lifecycle, revoked membership/connections, and exact selection. This was a test-evidence deficit, not a confirmed source defect.
- **Local evidence:** reorder, duplicate-name, Unicode inline-data, zero-byte, ambiguous-match rejection, and legacy-parser cases pass; the focused access-matrix test is `7/7` and separately covers `25` role thresholds, owner/shared access, zone mismatch, cross-user denial, pending/expired/revoked/replayed invites, revoked/hidden connections, the reauth boundary, and exact connection selection. `MultiAccount.gs` is unchanged.
- **Release boundary:** source commit `f2c00d3`; Apps Script production/HEAD remains v65, staging is `0`, and immutable v68 was not rewritten. Native Telegram download and staging acceptance are `UNVERIFIED`.
- **Evidence:** [VR-018](verification-reports/reports/VR-018/README.md)

## GT-049 — Standalone active RCA registry and prevention playbook were missing

- **Status:** VERIFIED
- **Source request:** `REQ-0035`
- **Product task:** `B1-29` / V3 `T-04`
- **Problem:** confirmed root causes were distributed across postmortems, issues, and verification reports, allowing a new contour to repeat a known failure or treat a historical status as current.
- **Correction:** paired [ERROR_RCA_REGISTRY](ERROR_RCA_REGISTRY.md) and [AGENT_FAILURE_PREVENTION](AGENT_FAILURE_PREVENTION.md) pages now define causal evidence, applicability boundaries, resource leases, identity/dedupe, locks, schemas, bilingual parity, release, and cleanup gates.
- **Boundary:** the playbook is not an authority source and changes no permission, runtime, Apps Script, Gmail, Telegram, or release state.
- **Evidence:** [VR-019](verification-reports/reports/VR-019/README.md)

## GT-050 — Reader rendering and ambiguous progress could lose the exact reading context

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Product task:** `B1-30` / V3 `A-03`, `F-05`
- **Root cause:** `renderThread()` originally rebuilt the reader root, while the later progress layer still treated non-scrollable short content as `100%`, described scroll position as content being read, showed an empty `0%` resume control, always used smooth motion, and allowed a delayed save from a previous thread to target the newly active thread.
- **Source fix:** identical reader state skips root replacement; necessary renders preserve stable content anchors, viewport offset, bottom pin, and memory-only focus. Progress now comes only from measurable reader geometry, is explicitly labelled as scroll position, is omitted when neither a draft nor a meaningful position exists, honours reduced motion, and binds every delayed save to the exact Gmail connection and thread. `ResizeObserver` and image-load handling retain the anchor without saving progress or starting an auto-scroll loop.
- **Local evidence:** focused reader contracts `12/12`, complete Apps Script suite `646/646`, clean `git diff --check`, and paired documentation validators.
- **Release boundary:** source-only cumulative Versie 1 contour; no Apps Script staging, production promotion, OAuth, Gmail, or Telegram mutation was performed. Native desktop/mobile, real long/short/quoted messages, and production acceptance remain `UNVERIFIED`.
- **Evidence:** [VR-020](verification-reports/reports/VR-020/README.md), [VR-039](verification-reports/reports/VR-039/README.md)

## GT-051 — Transfer progress used fragmented stores and inconsistent truth boundaries

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Product task:** `B1-31` / V3 `B-03`
- **Root cause:** local device files had a compose-only `FileReader` job map and byte progress, while incoming attachment and provider previews used independent blocking copy, spinners, and snackbars. Local reads were started without a shared concurrency gate, and Apps Script RPC lanes cannot expose trustworthy transport-byte callbacks or real abort.
- **Source fix:** one underlying transfer store now carries compose and global task domains through a canonical lifecycle, a bounded scheduler of three runners, capability-aware cancel/retry/pause/resume controls, honest aggregate status, and a movable accessible global chip. Actual `FileReader` callbacks drive bytes, percent, smoothed speed, and ETA; Apps Script RPC remains explicitly indeterminate. Compose local reads, incoming attachment fetch, and Drive/Box/public provider preview use this shared foundation.
- **Local evidence:** transfer-manager and MailApp contracts `99/99`, complete Apps Script suite `551/551`, clean `git diff --check`, and `0` secret-signature matches in changed files.
- **Remaining boundary:** true byte-resumable upload, real RPC abort, and native slow-network/minimize/restart acceptance are `UNVERIFIED`. Thread detail, draft persistence, URL import, and scoped draft-outcome reconciliation are integrated. No synthetic percentage or closed-WebView execution is claimed.
- **Release boundary:** source commit `58933f0`; no immutable, staging, production, OAuth, Gmail, Telegram, Drive, or Box mutation was performed.
- **Evidence:** [VR-021](verification-reports/reports/VR-021/README.md)

## GT-052 — Attachment preview lacked fail-closed boundaries for active SVG and untrusted ZIP metadata

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Product task:** `B1-32` / V3 `B-02`
- **Root cause:** SVG was classified as an ordinary image, the PDF iframe had no explicit sandbox, and the ZIP metadata parser only truncated long lists. It did not block traversal or absolute paths, encryption, Unix symlinks, multi-disk archives, ZIP64 sentinels, excessive sizes, aggregate expansion, dangerous compression ratios, or inconsistent central directories.
- **Source fix:** SVG now opens only as escaped text, and the PDF iframe has a maximum-restriction sandbox. ZIP preview reads no more than `8 MiB`, never extracts content, validates the central directory fail closed, and blocks dangerous paths, flags, link types, sizes, ratios, entry counts, and unsupported archive structures. A rejected preview retains the explicit download fallback.
- **Local evidence:** focused preview/MailApp contracts `97/97`, complete Apps Script suite `560/560`, and a clean `git diff --check`.
- **Remaining boundary:** native Telegram Desktop/mobile/WebView acceptance for PDF, media, Unicode ZIP, malformed real-world archives, and fallback/download remains `UNVERIFIED`; the source claims neither extraction nor universal preview.
- **Release boundary:** source commit `d4beb1e`; no immutable, staging, production, OAuth, Gmail, Telegram, Drive, or Box mutation was performed.
- **Evidence:** [VR-022](verification-reports/reports/VR-022/README.md)

## GT-053 — Hard reload lost the app session and reused an already-consumed launch proof

- **Status:** PARTIAL
- **Source request:** `REQ-0036`; related P0 contour `REQ-0034`
- **Product task:** `B1-33` / P0 session continuity
- **Verified root cause:** the bearer session and rotating app-refresh family exist on the server, but a hard reload can resubmit the POST document with an already-consumed Telegram launch proof. The server correctly returns `UNTRUSTED_NONCE_REPLAY`. On the tested Windows Telegram Desktop, `SecureStorage` supplied no usable recovery credential, while the v69 wrapper discarded the exact platform result.
- **Historical v69 boundary:** immutable v69 was tested and retained historically; staging was removed, the journal is `abandoned`, the owner menu was restored to production, active staging is `0`, and production v65 was unchanged.
- **Source correction v70:** the SecureStorage wrapper retains only a content-free status/error class; a bridge timestamp provides a cross-document launch trace; replay plus a missing secure credential opens a fail-closed locked state without a restart loop. Access/refresh tokens, Telegram `initData`, the session bearer, and mail content are not written to browser telemetry/storage.
- **Local evidence:** focused P0 contracts `113/113`, full Apps Script suite `567/567`, production added-line privacy scan `0`, and clean `git diff --check`.
- **Native v70 result:** the staging mailbox opened without OAuth or a repeated connection screen, restored a cached thread, and exposed an avatar plus three isolated Gmail roots. Switching to a secondary root returned the generic mail-operation error.
- **Controlled A/B:** a fresh production v65 launch returned the same generic error before mailbox load. Apps Script showed completed `doPost`, `mailboxRedeemLaunch`, and `mailboxRpc`; the adjacent timer execution failed in `legacy_recovery` with `errorCode=urlfetch_quota` and the daily `urlfetch` quota exception. This confirms a shared blocker and does not prove a v70-specific regression.
- **Terminal release state:** v70 was not promoted. The owner menu is production, the exact staging deployment was removed by the journal-bound helper, active staging is `0`, the v70 journal is `abandoned`, and immutable v70 remains historical.
- **Remaining boundary:** native Windows SecureStorage status, hard reload, ten launches, mobile/WebView reopen, concurrent launch, one-second p95, and bidirectional account switching remain `UNVERIFIED`/`BLOCKED`. Browser-level POST resubmission occurs before inner MailApp JavaScript executes, so the patch does not claim to remove it.
- **Evidence:** [VR-023](verification-reports/reports/VR-023/README.md), [VR-016](verification-reports/reports/VR-016/README.md)

## 2026-07-23: GT-051 thread-detail continuation

Status: PARTIAL

The shared transfer manager now also owns the thread/message-detail fetch lane. Cache hits remain immediately usable while revalidation is queued in the background. Apps Script RPC reports indeterminate phase progress only, exposes no false cancel action, reuses one task for retry, and retains the existing generation guard against stale responses. Focused contract tests pass 104/104 and the full Apps Script suite passes 577/577. Draft persistence, URL import, server-resumable restart, real RPC abort, and native slow-network/minimize acceptance remain open under GT-051.

## 2026-07-23: GT-051 draft-persistence continuation

Status: PARTIAL

Gmail draft persistence now uses the bounded shared transfer manager while retaining the existing serialized autosave, stable client operation ID, canonical Gmail readback, revision merge, local recovery, and conflict behavior. Apps Script RPC remains honest indeterminate progress with no unsupported cancel action. Retry reuses the exact draft operation/task identity and fails closed when the compose, snapshot, or account context changes. Focused contracts pass 102/102 and the full Apps Script suite passes 580/580. URL import, server-resumable restart, real transport abort, and native slow-network/minimize acceptance remain open under GT-051.

## 2026-07-23: GT-051 public-HTTPS import continuation

Status: PARTIAL

Public HTTPS attachment import now runs as one bounded shared transfer task for the complete submit operation. Parallel submits share one metadata RPC and add one attachment; the task label and ID never contain the URL. Apps Script RPC reports indeterminate progress, exposes no unsupported cancel action, and retries only while the same compose session and Gmail connection remain active. Existing server-side public-HTTPS normalization, DNS/IP, redirect, MIME, and byte bounds are unchanged. Focused contracts pass 111/111 and the full Apps Script suite passes 584/584. Server-resumable restart, real transport abort, and native slow-network/minimize acceptance remain open under GT-051.

## 2026-07-23: GT-051 restart-reconciliation continuation

Status: PARTIAL

The client now persists only an account-scoped, content-free draft operation descriptor before Gmail dispatch. After a WebView restart it queries `draftOperationStatus` with the same operation ID: a committed operation is recovered through canonical Gmail readback; a never-dispatched reservation is terminalized without a Gmail mutation; pending reconciliation is automatically bounded to three checks and then becomes manual retry. MIME bytes, source URLs, OAuth material, and resumable session URIs are never persisted or resent by this contract. Lost local attachment bytes produce a truthful `blocked` state and require reselection. Six restart-specific contracts and the complete `590/590` Apps Script suite pass locally. True Gmail byte-resumable upload remains `UNVERIFIED`; `resumableUpload` and `backgroundUpload` stay `false`.

## 2026-07-23: GT-051 real-abort capability gate

Status: PARTIAL

The transfer manager now exposes and accepts running cancellation only after the active transport registers a concrete abort callback. A queued local read remains cancellable before its runner starts, but the brief `preparing` phase cannot claim cancellation until `FileReader.abort` is available. Apps Script RPC lanes remain non-cancellable because the official `google.script.run` contract exposes asynchronous success/failure handlers and no abort handle. The new race-regression contract and focused transfer suites pass `170/170`; the full Apps Script suite passes `591/591`. Real local-reader abort is `VERIFIED`; real RPC abort is unsupported in the current transport rather than simulated. Native slow-network/minimize acceptance remains open.

## 2026-07-23: GT-051 native-acceptance blocker readback

Status: BLOCKED

An authenticated, read-only Apps Script Executions inspection confirmed that the shared daily URL Fetch quota was still exhausted during the proposed native acceptance window. A failed `checkNewMail_` execution reached `legacy_recovery` and terminated with `errorCode=urlfetch_quota`; adjacent content-free logs showed the same quota boundary affecting Telegram maintenance, Google OAuth token refresh, and Gmail API transport. This does not establish a transfer-manager regression. Production remains v65, active staging remains `0`, and no menu, Gmail, OAuth, deployment, or release-journal mutation was performed. Native slow-network/minimize acceptance must wait for a clean quota window.

## GT-054 — Timer worker continued quota-dependent stages after URL Fetch exhaustion

- **Status:** PARTIAL
- **Source request:** `REQ-0034`
- **Product task:** `B1-34`
- **Root cause:** timer-stage catches logged quota failures but continued later Telegram maintenance, reminder, OAuth-refresh, legacy-recovery, and multi-account paths. A per-user daily quota exception could therefore consume most of the 150-second slot and create another failed probe every minute.
- **Source correction:** a content-free Script Properties circuit opens on the first classified URL Fetch daily-quota exception. Gmail, Telegram, and Google refresh transports propagate the signal; the worker stops the current pipeline, releases its lease with `quota_blocked` telemetry, skips subsequent minute runs, and permits one bounded probe every 15 minutes.
- **Safety boundary:** the circuit stores only schema version and expiry. It contains no account, message, token, URL, Telegram, or Gmail identifier; it does not change OAuth grants, mail, menu, deployment, production, or immutable v70.
- **Verification:** focused runtime-budget contracts `9/9`; complete Apps Script suite `593/593`; bilingual, knowledge-hub, verification-report, release-state, diff, and added-line sensitive-pattern gates pass.
- **Remaining:** Apps Script documents per-user reset 24 hours after the first request but exposes no exact reset timestamp. Live quota recovery, a clean native A/B window, staging, and production acceptance remain `UNVERIFIED`.
- **Evidence:** [VR-024](verification-reports/reports/VR-024/README.md)

## GT-055 — Layout did not react to Telegram Mini App viewport events

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Product task:** `B1-35`
- **Root cause:** the client called `Telegram.WebApp.expand()` but did not subscribe to `viewportChanged` or safe-area events; the app shell relied only on `100dvh`.
- **Source correction:** one idempotent bridge coalesces events through an animation frame, separates live height from stable height, and feeds the stable height to the app shell through a CSS custom property.
- **Safety boundary:** the bridge does not start another bootstrap, render, RPC, reload, OAuth, or Gmail mutation.
- **Verification:** the automated VM contract and complete Apps Script suite must pass before publication; native Telegram Desktop/mobile acceptance remains `UNVERIFIED`.
- **Evidence:** [VR-026](verification-reports/reports/VR-026/README.md)

## GT-056 — Desktop panes had no resize/collapse/persistence

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Product task:** `B1-36`
- **Root cause:** the grid used fixed `--rail-w` and `--list-w` values without accessible resize controls, collapse-to-icons behavior, or scoped restoration.
- **Source correction:** desktop-only ARIA separators support bounded pointer and keyboard resizing; the sidebar can collapse to icons and restore; layout persists through the existing account-scoped P0 IndexedDB namespace with a memory-only fallback.
- **Safety boundary:** no `localStorage`/`sessionStorage`, new account state, RPC, reload, OAuth, or Gmail mutation; the mobile drawer is unchanged.
- **Verification:** focused Mail App suite `90/90`; the complete suite and documentation/release/privacy gates are publication gates. Native Telegram Desktop/WebView acceptance remains `UNVERIFIED`.
- **Evidence:** [VR-027](verification-reports/reports/VR-027/README.md)

## GT-057 — Drive OAuth callback did not reject state from another source provider

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Product task:** `B1-37`
- **Confirmed root cause:** shared source OAuth state stored `provider`, but the Drive callback did not verify `stateRecord.provider === "drive"` after one-use consumption. Separately, the Drive envelope lacked bounded provider-error and description validation even though the Box contour already had a provider-error allowlist.
- **Source correction:** the callback now fails closed on state from another provider before token exchange, accepts only a bounded provider error and control-free description, and rejects a description without a provider error.
- **Behavioral evidence:** the synthetic matrix covers owner binding, exact callback URI/route, hash-only ten-minute one-use state with limit 24, expiry/replay, sanitized denial, strict envelope, wrong provider/user/session, token-free DTOs, fail-closed refresh/generation handling, and exact selected-account revocation.
- **Safety boundary:** only `.invalid` identities and in-memory provider responses are used. No real Google OAuth, consent, account selection, secret, Gmail, Telegram, staging, production, or release-helper action was started or changed.
- **Remaining:** native Google provider redirect, deployed callback, real refresh/revocation, and user-visible Mini App acceptance remain `UNVERIFIED`; the overall status is therefore `PARTIAL`.
- **Evidence:** [VR-028](verification-reports/reports/VR-028/README.md)

## GT-058 — The read-only Spam list lacked a direct regression contract separate from proactive policy

- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Product task:** `B1-38` / V3 `G-01`
- **Verified state:** product source already accepts explicit `/mail folder:spam`, compiles the exact `SPAM` system label, sets `includeSpamTrash=true`, and paginates through a bounded Gmail page token. The proactive notification scan is a separate time-slice path and applies a current-`INBOX` gate after metadata read.
- **Evidence gap:** existing tests did not pin this policy boundary directly, so a future change could incorrectly forbid owner read-only Spam or begin creating proactive Spam cards.
- **Correction:** a synthetic contract now covers the parser, exact `SPAM` label, two pages, read-only endpoint boundary, and separate current-`INBOX` proactive gate. `Code.gs` is unchanged because no source defect was confirmed.
- **Local evidence:** focused contract `2/2`; complete Apps Script suite `612/612`.
- **Safety boundary:** fixtures are synthetic; live Gmail, Telegram, OAuth, staging, production, and release state were unchanged.
- **Remaining:** owner-native `/mail folder:spam` and pagination acceptance remain `UNVERIFIED`; quota-blocked runtime is not used as evidence.
- **Evidence:** [VR-029](verification-reports/reports/VR-029/README.md)

## GT-059 — Box OAuth: least privilege and stable account identity

- **Status:** `PARTIAL`
- **Request:** `REQ-0035`
- **Problem:** the authorize URL did not explicitly constrain scope; reconnect used mutable login/email, while the provider-specific callback did not fully validate `errorDescription`.
- **Correction:** `scope=root_readonly`, a strict callback envelope, stable Box account ID, and a compatible lookup of historical protected token records.
- **Evidence:** [VR-030](verification-reports/reports/VR-030/README.md).
- **Residual:** authenticated Box acceptance, callback, refresh, revoke, and picker remain `UNVERIFIED`; no new OAuth was started.

## GT-060 — Smart, safe URL resolver

- **Status:** `PARTIAL`
- **Request:** `REQ-0035`
- **Root cause:** the secure fetch perimeter existed, but intent classification was implicit: a Google search/ambiguous wrapper reached server fetch, redirect loops had only a count bound, and origin/resolution kind plus the licensing warning were not an explicit DTO/UI contract.
- **Correction:** deterministic explicit-wrapper resolution, no-fetch Google-search routing to link mode, an identity loop guard, provenance/classification metadata, and a persistent licensing reminder.
- **Evidence:** [VR-031](verification-reports/reports/VR-031/README.md).
- **Residual:** DNS-rebinding TOCTOU and native deployment transfer acceptance remain `UNVERIFIED`; staging/production are unchanged.

## GT-061 — Navigation and mailbox-context identity lacked one history contract

- **Status:** `PARTIAL`
- **Request:** `REQ-0035`
- **Product task:** `B1-41` / V3 `E-03`
- **Root cause:** dynamic account context was already derived from stable connection IDs, but list/thread transitions did not write canonical browser history, the banner did not return to Inbox, and the reader unconditionally repeated an account chip even in ordinary single-account mode.
- **Correction:** canonical list/thread hash routes, `pushState` for user transitions, one scheduler for `hashchange`/`popstate`, an accessible Inbox action on the context banner, and a contextual account chip only for shared mode or a real account mismatch.
- **Local evidence:** focused contract `5/5`; full Apps Script suite `617/617`.
- **Boundary:** native Telegram Desktop/WebView acceptance for Back/Forward and `A → B → A` remains `UNVERIFIED`; production v65, staging `0`, and immutable release history are unchanged.
- **Evidence:** [VR-032](verification-reports/reports/VR-032/README.md).

## GT-062 — The mail list lacked safe multi-selection and deterministic activation

- **Status:** `PARTIAL`
- **Request:** `REQ-0035`
- **Product task:** `B1-42` / V3 `E-05`
- **Root cause:** the list contract supported only one `selectedThreadId`; `Enter` and `Space` both called `row.click()`, every click directly started route/open, and there was no account/filter-scoped selection model or bulk toolbar.
- **Correction:** checkbox-based selection keyed by stable `accountId:threadId`, a namespace derived from the current mailbox view, `Enter=open`, `Space=select`, 650 ms single-flight activation, compact bounded sequential bulk actions, and focus-anchor restoration after keyed reconciliation.
- **Local evidence:** focused E-05 contract `4/4`; full Apps Script suite `623/623`.
- **Boundary:** native mouse/touch/keyboard acceptance for 0/1/50/500 rows and deployed multi-account bulk actions remains `UNVERIFIED`; production v65, staging `0`, and immutable history are unchanged.
- **Evidence:** [VR-034](verification-reports/reports/VR-034/README.md).

## GT-063 — The reader lost RTL semantics and had an overly broad remote-image fallback

- **Status:** `PARTIAL`
- **Request:** `REQ-0035`
- **Product task:** `B1-43` / V3 `F-01`
- **Root cause:** the server sanitizer discarded valid `dir/lang`, while the defense-in-depth sandbox allowed `https:`/`data:` image sources even though the normal server path already removed remote images.
- **Correction:** the sanitizer preserves only bounded `ltr|rtl|auto` and BCP47-like `lang`; the reader uses content-derived direction, logical quote borders, and permits images only through an exact authenticated attachment token that becomes a short-lived `blob:` after a MIME check.
- **Local evidence:** focused F-01 corpus `6/6`; full Apps Script suite `629/629`.
- **Boundary:** native Telegram Desktop/mobile fidelity with real newsletter/invoice/RTL/CID fixtures remains `UNVERIFIED`; production v65, staging `0`, and immutable history are unchanged.
- **Evidence:** [VR-035](verification-reports/reports/VR-035/README.md).

## GT-064 — Message actions were duplicated and Gmail handoff could open the wrong browser account

- **Status:** `PARTIAL`
- **Request:** `REQ-0035`
- **Product task:** `B1-44` / V3 `F-02`
- **Root cause:** the desktop toolbar, conversation footer, and mobile action bar independently created Reply/Forward; the mobile bar was visible on desktop. Four handoff sites opened a server-provided `gmailUrl` directly, which could contain positional `/u/0`, while the metadata panel did not distinguish Mini App/API capabilities from native Gmail-only settings.
- **Correction:** one primary action surface per viewport; a compact desktop toolbar and progressive `More`; an exact connection-first resolver builds `authuser=<email>` or fails closed; a settings capability hub classifies supported actions, account-correct Gmail handoff, and honestly unsupported operations.
- **Local evidence:** focused message-capability contract `6/6`; focused Mail App group `98/98`; full Apps Script suite `635/635`.
- **Boundary:** no RPC, OAuth scope, raw MIME transfer, or Gmail mutation was added. Browser settings fragments and native popup/deep-link behavior remain `UNVERIFIED`; production v65, staging `0`, and immutable history are unchanged.
- **Evidence:** [VR-036](verification-reports/reports/VR-036/README.md).

## GT-065 — Automated analysis was overexposed and could present unsupported or trivial claims

- **Status:** `PARTIAL`
- **Source request:** `REQ-0035`
- **Product task:** `B1-45` / V3 `F-04`
- **Confirmed root cause:** the analysis card was expanded by default with no independent off switch; a length-only boilerplate rule discarded some short meaningful replies but retained common mobile signatures; dates, amounts, actions, and urgency could survive normalization without an exact supporting source fragment; and an automated next-action proposal was inserted into the same field as a persisted user decision.
- **Correction:** account-scoped `collapsed|expanded|hidden` analysis preference, default-collapsed disclosure, multilingual signature filtering without a blanket short-text rejection, claim-level evidence gating, explicit proposal acceptance, and an accessible persisted triage undo.
- **Safety boundary:** analysis remains local heuristic plus the existing Apps Script Language service. No external AI endpoint, raw mail transfer, Gmail mutation, OAuth, staging, production, or release-state change is introduced.
- **Remaining:** native populated-thread acceptance, real multilingual/attachment corpus acceptance, and current-production evidence remain `UNVERIFIED`; overall status is therefore `PARTIAL`.
- **Evidence:** [VR-038](verification-reports/reports/VR-038/README.md).

## GT-066 — Closing the composer cancelled attachment transfer and minimized draft lost interaction context

- **Status:** `PARTIAL`
- **Source request:** `REQ-0035`
- **Product task:** `B1-46` / V3 `C-02`
- **Confirmed root cause:** header `X` used the shared close guard, which blocked a pending operation, while `finishCloseCompose()` unconditionally called `cancelAllComposeAttachmentJobs()`. Minimize hid the editor but erased the saved Range; the compose chip was not movable and overlapped the global transfer chip.
- **Correction:** header `X` creates one close intent, immediately returns to the mail view, persists the local recovery record and the `compose session ↔ stable transfer operation` association, then clears compose state only after local jobs finish and Gmail returns canonical draft readback. Explicit discard is the only close path that cancels local jobs. Restore returns the same draft/session without restarting upload, including focus/selection and a movable accessible chip; the global transfer manager has an explicit action to reopen that draft.
- **Truth boundary:** local `FileReader` work and the in-memory association continue only while the Mini App remains alive. After the WebView fully closes, an unfinished device file is not represented as resumable: the recovery record requires file reselection. Server-side draft-operation reconciliation is unchanged.
- **Local evidence:** focused C-02 contracts `5/5`; complete Apps Script suite `656/656`; synthetic browser acceptance covers close/minimize/restore and no overlap without a real Gmail mutation, while the executable pointer contract separately covers drag bounds.
- **Release boundary:** source/docs contour; production v65, staging `0`, immutable history, Gmail, OAuth, Telegram menu, and release journal remain unchanged. Native slow-network, app-restart, and current-production acceptance remain `UNVERIFIED`.
- **Evidence:** [VR-041](verification-reports/reports/VR-041/README.md).

## GT-067 - P0-A launch ownership and proof state were not canonical across documents

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`; continues `GT-040-GT-047`, `GT-051`, `GT-053`, and `GT-054` without replacing or duplicating them.
- **Product task:** `B1-47` / P0-A cross-document launch serialization and canonical launch-proof ledger.
- **Confirmed root cause:** launch ownership was not single-flight across documents, while historical server issuance and redemption used split state paths instead of one canonical claim ledger.
- **Source correction:** launch first uses `navigator.locks`, then an expiring content-free IndexedDB lease as fallback. An ordinary validated launch remains overlay-free. Release reload waits for mutation quiescence and uses the exact content-free `sessionStorage` key `p0-release-reload`.
- **Server correction:** issuance and redemption now share one `ScriptLock`-backed ledger with a canonical claim, HMAC-scoped owner and route bindings, a deterministic 60-second nonce lifetime, 11-minute tombstones, and a maximum of 100 records. The ledger stores no secrets or identifiers.
- **Source evidence:** focused P0-A contracts `37/37`; complete Apps Script suite `668/668` in `24.229s`; implementation baseline `1d5fb8352ea62f7b25d6980312f277060ce4d0ae`.
- **Release boundary:** no runtime deployment or mailbox mutation was performed. Native Telegram target-device p95 `<=1000 ms`, ten real launches, offline private device-bound unlock, POST-Redirect-GET behavior, incremental MailApp Gmail History, Service Worker/Background Sync, staging, and production remain `UNVERIFIED` or `BLOCKED` by the shared Apps Script URL Fetch quota and `T-03`.
- **Evidence:** [VR-042](verification-reports/reports/VR-042/README.md).

## GT-068 - Background MailApp revalidation always reloaded the complete list

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`; continues the incremental-sync portion of P0 without rewriting `GT-067`.
- **Product task:** `B1-48` / P0-B account-scoped Gmail History revalidation.
- **Confirmed root cause:** every 45-second `p0RevalidateVisible()` unconditionally started a full `loadThreads()` and reopened the selected thread. Bootstrap already returned Gmail `historyId`, but client account normalization discarded it. The separate Telegram-card History scanner could not be reused as a Mini App cursor because it belongs to a different runtime lane and connection/owner state must remain isolated.
- **Source correction:** a read-only viewer operation `historyDelta` was added; the decimal History ID remains an opaque string. The server reads at most three bounded History pages, deduplicates message/thread IDs, and fails closed to a full-sync baseline when the cursor is absent/expired or the page bound is reached. The client stores the cursor only in the existing Telegram-owner + Gmail-connection IndexedDB namespace, serializes reconciliation through one promise, and skips a full list RPC when no change exists.
- **Source evidence:** focused History/P0/adapter contracts `30/30`; complete Apps Script suite `673/673` in `25.763s`; exact implementation baseline `28b438e68e1b327308761c246e074558b7ccd53d`.
- **Boundary:** this is a source-level stale-while-revalidate optimization. On a real change or lost boundary, a complex query/shared view safely receives bounded full-list reconciliation; entity-level membership updates, live request reduction, native Telegram, staging, and production remain `UNVERIFIED` or `BLOCKED`. OAuth scopes, Gmail mutations, messages, Telegram runtime, and deployment were unchanged.
- **Evidence:** [VR-043](verification-reports/reports/VR-043/README.md).

## GT-069 - A real change in a simple Inbox still triggered a full list refresh

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`; continues `GT-068` without changing its no-change History contract.
- **Product task:** `B1-49` / P0-C metadata-only simple-Inbox entity reconciliation.
- **Confirmed root cause:** P0-B correctly suppressed a no-change poll, but any `changed=true` immediately fell through to `loadThreads()`. The History delta did not expose event type, while the client had no bounded metadata-only way to distinguish a new/body change from a label-only change or an exact missing thread.
- **Source correction:** History delta now classifies message/label events per thread; viewer-only `threadSummaries` reads metadata for at most 20 exact IDs and returns explicit missing IDs. For a single-account Inbox with no query/filter/custom label, the client inserts, updates, or removes only changed rows while preserving cached body, account namespace, stable order, and page capacity. The selected body is reread only for a message change, never for a label-only event.
- **Source evidence:** focused P0-C/P0-B/client/adapter contracts `35/35`; complete Apps Script suite `678/678` in `25.414s`; exact implementation baseline `7bd8270b2e14525dc8e99bd95387a1ef977dde1a`.
- **Boundary:** shared mode, search, filters, custom labels, a full-sync boundary, more than 20 changed IDs, or incomplete metadata retain the bounded full-list fallback. Live insert/remove timing, request counts, native Telegram, staging, and production remain `UNVERIFIED` or `BLOCKED`. Gmail mutations, OAuth, Telegram runtime, and cached-body storage were unchanged.
- **Evidence:** [VR-044](verification-reports/reports/VR-044/README.md).

## GT-070 - Persistent mail cache lacked an explicit session-bound lock lifecycle

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`; continues the cache-locking portion of P0 without changing the release boundary.
- **Product task:** `B1-50` / P0-D verified-session private-cache lock.
- **Confirmed root cause:** `p0HydratePersistentState()` self-populated `cacheScope` and account IDs from mutable client state, while low-level IndexedDB reads and writes required no separate unlocked state. Account-changing bootstrap paths and confirmed sign-out had no single mandatory lock/rebind contract.
- **Source correction:** explicit fail-closed `p0LockPrivateCache`, exact-scope/account `p0UnlockPrivateCacheFromVerifiedBootstrap`, and a central access gate now protect low-level reads and writes. All five bootstrap paths rebind the allowlist; switch, disconnect, and sign-out clear private memory and mail DOM without deleting persistent records.
- **Source evidence:** focused cache/launch/history contracts `48/48`; complete Apps Script suite `685/685` in `26.020s`; exact implementation baseline `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb`.
- **Boundary:** this is a verified-session source lock, not cryptographic IndexedDB encryption or offline device-bound unlock. Native Telegram SecureStorage, offline unlock, staging, and production remain `UNVERIFIED` or `BLOCKED`; no OAuth, Gmail/Telegram mutation, or deployment was performed.
- **Evidence:** [VR-045](verification-reports/reports/VR-045/README.md).

## GT-071 - Persistent IndexedDB stored private record values without encryption

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`; continues the P0-D lock lifecycle through a separate encryption-at-rest contour.
- **Product task:** `B1-51` / P0-E AES-GCM persistent-cache envelope.
- **Confirmed root cause:** schema 2 wrote cloned `record.value` directly to IndexedDB. Namespace and session lock controlled application-level rendering but did not cryptographically protect persistent mail after WebView close.
- **Source correction:** schema 3 clears incompatible plaintext records during upgrade; new values use AES-256-GCM with a random 96-bit IV and AAD bound to key/kind/namespace/expiry. The 256-bit content key exists only as a compact owner-scoped envelope in Telegram `SecureStorage`; a missing key is created, while `RESTORABLE`, mismatch, unsupported, or corrupt state fails closed without a consent prompt or plaintext fallback.
- **Source evidence:** focused crypto/cache/launch contracts `55/55`; complete Apps Script suite `692/692` in `23.540s`; exact implementation baseline `6f8a357e1a650639c3a16f9d6c7601d89817e3fe`.
- **Boundary:** WebCrypto roundtrip and tamper rejection are source/Node verified, but native Telegram SecureStorage persistence and Apps Script WebView crypto support lack target-device evidence. Offline launch/bootstrap, staging, and production remain `UNVERIFIED` or `BLOCKED`; no runtime mutation was performed.
- **Evidence:** [VR-046](verification-reports/reports/VR-046/README.md).

## GT-072 - Encrypted cache could not safely restore mailbox context during a transient outage

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`; continues P0-E through a separate device-bound offline-unlock contour.
- **Product task:** `B1-52` / P0-F encrypted offline bootstrap.
- **Confirmed root cause:** private-cache access required a live `state.session`, while the owner/account allowlist existed only in server bootstrap. Valid AES-GCM records and a SecureStorage key therefore could not reconstruct the exact mailbox context during a transient network failure.
- **Source correction:** a separate 35-day encrypted bootstrap record without session or OAuth secrets is written after verified online bootstrap. Only the exact Telegram SecureStorage envelope can decrypt the owner/bootstrap AAD-bound record; the snapshot validates schema, owner scope, age, the unique account set, and the active account. Offline mode is read-only, blocks all RPC until a verified online session returns, and is entered only for `TRANSIENT_NETWORK_FAILURE`.
- **Source evidence:** focused offline/cache/security contracts `33/33`; complete Apps Script suite `701/701` in `25.944s`; exact implementation baseline `2bd7eb52d2f3297929c24c12d8ccbb4611699b84`.
- **Boundary:** recovery works only when the Apps Script document/app shell is already loaded. A fresh offline navigation of the current HTML deployment still has no Service Worker or same-origin offline shell; native Telegram SecureStorage/WebView, staging, and production remain `UNVERIFIED` or `BLOCKED`.
- **Evidence:** [VR-047](verification-reports/reports/VR-047/README.md).

## GT-073 - A Gmail draft could silently overwrite a newer cross-session version

- **Status:** `PARTIAL`
- **Source request:** `REQ-0037`; continues the P0 drafts contour without changing the release boundary.
- **Product task:** `B1-53` / P0-G conflict-safe Gmail Drafts update.
- **Confirmed root cause:** local recovery, a stable operation ID, and the operation journal prevented loss and duplicate `PUT`, but an existing Gmail-draft update was not bound to an expected server version. A change in another session between canonical readback and the next save could be overwritten silently.
- **Source correction:** the canonical draft DTO returns a 43-character opaque `serverVersion`; encrypted recovery and the save payload retain it without putting message content in operation metadata. The server requires the exact version for update, checks it after the first read, and checks it again immediately before `PUT`. A mismatch closes the reservation as failed without a Gmail mutation and returns the canonical conflict DTO. The client stops retrying and offers an explicit local-versus-Gmail choice.
- **Source evidence:** focused contracts `258/258`; complete Apps Script suite `707/707` in `23.349s`; exact implementation baseline `9b00a335c0016c439a463233b67a16e1499b7222`.
- **Honest boundary:** official Gmail `users.drafts.update` documentation exposes no atomic revision/ETag precondition. The second read narrows but cannot eliminate the small TOCTOU interval between the final `GET` and `PUT`. Native multi-session acceptance, staging, and production remain `UNVERIFIED` or `BLOCKED` by shared URL Fetch quota and `T-03`.
- **Evidence:** [VR-048](verification-reports/reports/VR-048/README.md).

## GT-074 - Folder selection could silently truncate or partially start an oversized attachment batch

- **Status:** `PARTIAL`
- **Source request:** `REQ-0035`; a separate V3 C-03 source contour without changing the release boundary.
- **Product task:** `B1-54` / C-03 scalable folder upload.
- **Confirmed root cause:** native folder recursion stopped at the current attachment limit, while the `webkitdirectory` fallback passed every file into per-item admission. Without one batch plan, the user received no complete summary of paths, aggregate size, duplicates, or the reason a `100/1000`-file selection could not begin uploading.
- **Source correction:** one bounded planner scans at most `1000` entries, retains a normalized relative path, rejects traversal, hidden/service, empty, and exact-duplicate entries, distinguishes equal basenames in different folders, and checks count/aggregate bytes before reading files. A progressive batch card exposes totals/status, up to `40` rows per step, per-file retry/cancel, cancel-all, and a Drive fallback; accepted jobs continue through the existing transfer manager.
- **Source evidence:** focused folder contracts `9/9`; Mail App contract `93/93`; complete Apps Script suite `716/716` in `25.980s`; exact implementation baseline `a33242df9689f6d483825940632df3030663d1a6`.
- **Honest boundary:** the current attachment policy still limits actual attachment; a `100/1000`-file selection fails fast and offers Drive rather than pretending to upload. Native folder-picker, mobile/desktop visual acceptance, staging, and production remain unverified; shared URL Fetch quota and `T-03` release blockers are unchanged.
- **Evidence:** [VR-049](verification-reports/reports/VR-049/README.md).

## GT-075 - Recipient layout and rich editing used three incompatible interaction models

- **Status:** `PARTIAL`
- **Source request:** `REQ-0035`; a separate V3 C-04 source contour without changing the release boundary.
- **Product task:** `B1-55` / C-04 rich compose editing and recipient layout.
- **Confirmed root cause:** `To/CC/BCC` remained plain text inputs without token identity or keyboard removal; paste always forced rich clipboard content to plain text; every formatting control occupied one horizontal strip at the same time. The existing table engine supported row/column mutations but lacked whole-table deletion, regenerated ARIA coordinates, and keyboard cell traversal.
- **Source correction:** one UI adapter tokenizes and validates recipients, renders bounded accessible chips, and synchronizes them back into the existing canonical draft strings. Rich paste passes through the existing allowlist sanitizer and never inserts raw clipboard HTML. The primary toolbar keeps frequent actions visible while a secondary group opens explicitly; the table engine now has labels, row/column counts, Tab/Shift+Tab navigation, and whole-table deletion. Internal composer/recipient scrolling is bounded.
- **Source evidence:** focused C-04 contracts `5/5`; affected compose matrix `116/116`; MailClient `153/153`; complete Apps Script suite `721/721` in `25.457s`; exact implementation baseline `f790897e8dec4a83e8ab8c7114618109b99b436a`.
- **Honest boundary:** the local browser automation contract was unavailable, so visual mobile/desktop/keyboard-open and native Telegram WebView acceptance are not claimed. Real Gmail draft, staging, and production were not verified; shared URL Fetch quota and `T-03` release blockers are unchanged.
- **Evidence:** [VR-050](verification-reports/reports/VR-050/README.md).

## GT-076 - Five V3 task codes had no explicit route in the active registries

- **Status:** `VERIFIED`
- **Source requests:** `REQ-0035`, `REQ-0037`; reconciliation creates no new Versie or release authority.
- **Product task:** `B1-56` / V3 coverage reconciliation.
- **Confirmed root cause:** active `ROADMAP`, `CURRENT_STATE`, `ISSUES`, RCA, and VR records tracked implementations through `B1/GT/VR` but did not repeat plan IDs `A-04`, `A-05`, `D-02`, `E-01`, and `E-02`. An automated exact-ID audit therefore found only `26/31` task codes and could misread five missing aliases as missing source.
- **Correction:** `B1-56` and `VR-051` add an unambiguous task-code → existing `B1/GT/VR` matrix while preserving the factual status of every contour. The repeated exact-ID gate must find `31/31` without elevating source evidence to native/runtime acceptance.
- **Source evidence:** cache lock/AES-GCM/offline unlock, version marker/reload guard, Box OAuth callback, Telegram viewport events, and pane controls already exist in source/tests at baseline `689c401397be8419df60239063ebe831477e96ba`.
- **Boundary:** `A-04`, `A-05`, `D-02`, `E-01`, and `E-02` remain `PARTIAL`, `UNVERIFIED`, or `BLOCKED` wherever native/live evidence is missing. A documentation alias is not staging or production proof.
- **Evidence:** [VR-051](verification-reports/reports/VR-051/README.md).
