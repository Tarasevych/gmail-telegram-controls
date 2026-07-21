# Known problem register

Updated: **2026-07-21**. Statuses: `Open`, `In progress`, `Blocked`, `Resolved locally`, `Staging verified`, `Deployed to production`, `Production verified`.

| ID | Status | Since Versie | Problem | Resolution / next evidence |
|---|---|---:|---|---|
| GT-001 | Production verified | 1 | One mail message reaches Telegram twice | Stable v55 excludes a Sent copy even when Gmail also labels it Inbox; a controlled `SENT+INBOX` message produced exactly one card after automatic delivery and two `/check` runs |
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

| GT-018 | Production verified | 1 | New Gmail mail is not delivered while the frozen scan drains an old backlog | The bounded realtime lane in stable v55 delivered a controlled new message automatically; frozen scan remains the backfill |
| GT-019 | Production verified | 1 | Manual `/check` inspected only the legacy mailbox | Two consecutive `/check` runs after automatic delivery created no duplicate; exact-marker search remained at one result |
| GT-020 | Open operational | 1 | Protected credential storage still contains an obsolete Telegram bot-token alias that returns 401 | Runtime uses a separately verified protected reference; do not rotate the current token without a separate safe plan |
| GT-021 | Open in production | 1 | The first production Web App open can remain on the skeleton for more than 15 seconds | One refresh loaded the mailbox; add content-free bridge/backend bootstrap timing and inspect cold-start timeout without Gmail mutations |
| GT-022 | Platform constraint | 1 | `clasp logs` is unavailable because production uses an Apps Script-managed default GCP project without a standard project ID | Do not migrate only for logs: that would permanently revoke current authorizations. Use the Apps Script Executions UI or a separate content-free telemetry reader |
| GT-023 | In progress; root cause production verified | 1 | The single minute `checkNewMail_` takes 80–106 seconds, so invocations overlap and exhaust the daily `URLFETCH` quota | There is no second trigger. The candidate adds an atomic 150-second timer slot with a short ScriptLock, keeps realtime first, and limits the full Gmail History backfill to once per 15 minutes; local tests, staging, and production evidence after the external quota resets remain required |
| GT-024 | Blocked by external quota; candidate regression not confirmed | 1 | After v56 promotion the Web App showed a network error; after the exact rollback the same error reproduced on v55 | Apps Script Executions confirmed completed `doPost`/session/`mailboxRpc` calls for both versions and a concurrent `URLFETCH` daily-quota failure in the Gmail API worker. Preserve stable v55 and immutable staging v56; repeat the controlled A/B only after quota recovery |

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

## Update procedure

1. Add a new problem once using the next `GT-*` ID.
2. Never delete resolved records; change status and add release evidence.
3. Do not mark `Verified in production` from a unit test or staging alone.
4. Do not add email content, OAuth codes, tokens, cookies, or secret properties.

## Research problem register

The complete report-derived risk and unresolved-conflict list is in [Problems](knowledge-hub/PROBLEMS.md). Only verified current defects receive a `GT-*` entry in the table above.

## Independent verification

[VR-001](verification-reports/reports/VR-001/README.md) preserves every contradicted, partial, unverified, and blocked `KH-*` claim. They do not become `GT-*` automatically; `GT-010` was added separately because the current code has a statically confirmed gap. Source request: `REQ-0004`.
