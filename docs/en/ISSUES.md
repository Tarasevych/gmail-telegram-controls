# Known problem register

Updated: **2026-07-21**. Statuses: `Open`, `In progress`, `Blocked`, `Resolved locally`, `Staging verified`, `Deployed to production`, `Production verified`.

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
| GT-025 | Fixed in source candidate; live unverified | 1 | Parallel thread metadata always used the Apps Script owner token, including an external multi-account context | Select `mailboxMultiGmailAccessToken_` for the active `connectionId`, retaining `ScriptApp.getOAuthToken()` only for the legacy/owner lane; a regression test forbids the hardcoded owner token |
| GT-026 | Isolated source candidate; release hash gate blocked | 1 | Allowlisted owner Gmail reads always consume Apps Script `URLFETCH` quota even though the official Advanced Gmail Service is enabled | A protected feature flag can route only owner `messages.list`, `messages.get`, and `history.list` calls through Advanced Gmail; its tests pass 8/8, but the full suite correctly fails the immutable v57 hash gate at 451/452. Do not merge, enable, or deploy without a separately authorized next immutable. Source request: `REQ-0024` |

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

## GT-026 — Unified Gmail label management

- **Status:** PARTIAL
- **Date:** 2026-07-22
- **Request:** [REQ-0026](https://github.com/Tarasevych/gmail-telegram-controls/blob/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8/requests/2026-07-22/REQ-0026-unified-gmail-label-management.md)
- **Root cause:** VERIFIED — the profile list reserved label width for several permanently visible actions, the sidebar had no create/manage controls, and the two surfaces depended on different state slices. Acceptance also exposed click bubbling into the global close handler and implicit CSS grid rows shrinking to 44 px.
- **Fix:** VERIFIED locally in [commit 4ac0b90](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91): shared state/render path, a `+` beside the heading, one accessible pencil action for every USER label, progressive disclosure, bounded scrolling, nested full-path normalization, SYSTEM-label protection, permission/retry states, and synchronous refresh of both surfaces.
- **Verification:** VERIFIED — final UI contract `84/84`; full suite `447/448`; 390×760 and 1280×820 with 48 synthetic labels had no horizontal or vertical overlap.
- **Release boundary:** BLOCKED — the only full-suite failure is the intentional exact-hash gate for immutable v57. REQ-0026 does not authorize a new immutable candidate or production promotion.
- **Production:** UNVERIFIED — the changes are not deployed.
- **Report:** [VR-005](verification-reports/reports/VR-005/README.md)
- **Українське дзеркало:** [docs/uk/ISSUES.md](../uk/ISSUES.md)