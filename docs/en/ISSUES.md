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
| GT-024 | Resolved and production verified on v57 | 1 | The same mailbox network error reproduced on production v55 and owner-only staging v57 during the quota incident | After quota recovery, two v55 launches and the v57 staging A/B passed; v57 was promoted, accepted twice in production, and staging was cleaned. A valid external `INBOX` automatically created one card with no duplicate after two `/check` runs |
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

- **Status:** PARTIAL — integrated into immutable v58/v59; the live UI was accepted on v59, but production returned to v57 because of GT-030.
- **Date:** 2026-07-22
- **Request:** [REQ-0026](https://github.com/Tarasevych/gmail-telegram-controls/blob/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8/requests/2026-07-22/REQ-0026-unified-gmail-label-management.md)
- **Root cause:** VERIFIED — the profile list reserved label width for several permanently visible actions, the sidebar had no create/manage controls, and the two surfaces depended on different state slices. Acceptance also exposed click bubbling into the global close handler and implicit CSS grid rows shrinking to 44 px.
- **Fix:** VERIFIED locally in [commit 4ac0b90](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91): shared state/render path, a `+` beside the heading, one accessible pencil action for every USER label, progressive disclosure, bounded scrolling, nested full-path normalization, SYSTEM-label protection, permission/retry states, and synchronous refresh of both surfaces.
- **Verification:** VERIFIED locally — final UI contract `84/84`; cumulative v58 suite `460/460`; 390×760 and 1280×820 with 48 synthetic labels had no horizontal or vertical overlap.
- **Live verification:** VERIFIED on v59 staging — the profile panel exposed `+ Create`, an accessible management action for every USER label, separate SYSTEM labels, bounded scrolling, and long nested names without overlap. Create/rename/delete were intentionally not run to avoid mutating arbitrary Gmail labels.
- **Release boundary:** PARTIAL — v59 was promoted after UI acceptance, but an exact rollback returned production to v63 because of the separate GT-030 runtime blocker.
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

- **Status:** PARTIAL — live Gmail CSS, the source fix, and native v63 staging/production presentation are VERIFIED; a same-scale production typography comparison remains UNVERIFIED. Release evidence: [VR-011](verification-reports/reports/VR-011/README.md).
- **Date:** 2026-07-22. Source request: `REQ-0033`.
- **Root cause:** the client mixed undersized 11–13 px interface text, heavy headings, and a 1.65 message line height without one typography scale.
- **Source fix:** a local-first Gmail-compatible UI stack, a separate reading stack, 14 px/20 px list rhythm, 14 px/1.5 reading and compose rhythm, responsive sizing, and no remote font dependency or layout-blocking font request.
- **Evidence:** authenticated read-only Gmail inspection at the same browser scale returned the current UI stack and 14 px/20 px mail-list cells; no mail was opened or changed. See [VR-009](verification-reports/reports/VR-009/README.md).
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

- **Status:** PARTIAL — root cause and source correction are VERIFIED; production acceptance is pending cumulative v66.
- **Observed behavior:** one controlled owner self-message existed as `UNREAD+SENT+INBOX`; the automatic worker and two `/check` runs reported no new mail, and exact-marker chat search returned zero cards.
- **Root cause:** `gmailNotificationLabelsEligible_` required `INBOX` but also rejected every `SENT` label, then persisted the message as seen. Runtime stages completed with `errorCode=none`, so the exclusion was silent and deterministic.
- **Source correction:** retain required `INBOX`, reject `SPAM` and `TRASH`, preserve important-only mode, and let the existing stable Gmail message-ID/card reservation dedupe enforce exactly-once delivery.
- **Verification:** focused source suite `161/161`; first scan delivers once, second scan does not refetch or resend; `SENT` without `INBOX` remains ineligible.
- **Release boundary:** fix merge `a6ba4d07feaeb7e9369b5e64860e1c3acd57048b`; production remains v65 until hash-pinned v66 staging passes.
- **Evidence:** [VR-015](verification-reports/reports/VR-015/README.md). Source request: `REQ-0033`.
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md).

## GT-040 — ONE-SECOND warm-launch performance

- **Status:** PARTIAL
- **Source request:** `REQ-0034`
- **Evidence:** [VR-016](verification-reports/reports/VR-016/README.md)
- Prior local trace: cold `898 ms`, B `431 ms`, cached A `409 ms`.
- Production p95 from Telegram button to a real interactive cached Inbox remains `UNVERIFIED`; ten native staging launches are required.

## GT-041 — Duplicate launch/auth pipeline

- **Status:** PARTIAL
- **Root cause:** the bridge handoff, static MailApp overlay and repeated `setBootLoading()` displayed the same connection screen.
- **Source fix:** hidden credentialless handoff, single-flight form submission, a shared in-flight `boot()` Promise and no boot overlay during an ordinary validated launch.
- **Evidence:** launch contract `5/5`; native staging acceptance remains `UNVERIFIED`.

## GT-042 — Offline persistent cache

- **Status:** PARTIAL
- The existing bounded/versioned IndexedDB cache, LRU and account namespaces are locally verified.
- Private reads remain behind server bootstrap/allowlist. A true offline private Inbox before bootstrap is `BLOCKED` without a separate device-bound unlock contract.

## GT-043 — Background prefetch and incremental sync

- **Status:** PARTIAL
- Warm list/thread stale-while-revalidate and the Gmail History boundary already exist in cumulative source.
- Closed-app Background Sync is not claimed: it depends on a Service Worker and lacks universal WebView support. Native arrival/prefetch evidence remains `UNVERIFIED`.

## GT-044 — Session/cache locking

- **Status:** PARTIAL
- Cache namespaces fail closed by Telegram/Gmail connection IDs; storage warmup reads no private records.
- Device-bound unlock for private cache display before server bootstrap is not implemented and requires a separate security decision.

## GT-045 — Drafts

- **Status:** PARTIAL
- Local recovery, serialized autosave, stable draft operation IDs and Gmail readback contracts pass locally.
- Cross-session/device continuation, offline conflicts and native restart acceptance remain `UNVERIFIED`.

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
- **Local evidence:** reorder, duplicate-name, Unicode inline-data, zero-byte, ambiguous-match rejection, and legacy-parser cases pass; the complete Apps Script suite is `532/532` and the added-lines secret scan found `0`.
- **Release boundary:** source commit `f2c00d3`; Apps Script production/HEAD remains v65, staging is `0`, and immutable v68 was not rewritten. Native Telegram download and staging acceptance are `UNVERIFIED`.
- **Evidence:** [VR-018](verification-reports/reports/VR-018/README.md)
