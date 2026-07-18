# Work log

## 2026-07-18 — v31 durable send-later backend candidate

- Branched `codex/neuroinclusive-v31-send-later` from the exact verified production-v29 evidence commit; the undeployed v30 reply UI was not mixed into this backend phase.
- Added account-bound schedule, list, reschedule, and cancel RPCs with optimistic revision checks and explicit `viewer`/`responder` role boundaries.
- Added a bounded Script Properties journal containing only Telegram user ID, Gmail connection ID, draft ID, stable Message-ID, due time, timezone, state, revision, lease/retry metadata, and final Gmail IDs. No mail content or attachment metadata is persisted.
- Added the send-later worker to the existing one-minute trigger; no second trigger or migration was created. Each run processes at most three rows.
- Reused the existing draft-send operation journal for at-most-once Gmail delivery. After an uncertain POST, retries use Sent readback even when Gmail has already removed the draft, and never issue a second POST.
- Added two-minute lease fencing, bounded exponential retry, eight-attempt `needs_review`, exact-account access revalidation, draft Message-ID change detection, global/per-account caps, terminal retention, and fail-closed storage verification.
- Independent read-only review found and resolved overdue idempotency, terminal-quota starvation, corrupt-row tenant isolation, and real-timezone validation edges.
- Send-later targeted regression: 7/7 passed. Full ordinary functional regression: 342/342 passed. `git diff --check` passed.
- Production remains immutable Apps Script v29. No deployment, OAuth, migration, trigger mutation, real Gmail draft/message, Telegram card, attachment, provider object, browser account, or phone state was changed.

## 2026-07-18 — v28 start

- Verified production v27 release state and frozen source hashes read-only.
- Ran the current functional suite: 337/337 passed.
- Verified Telegram webhook health without exposing the bot token.
- Confirmed no active Gmail deploy, browser QA, or security scan process.
- Located the authoritative v27 source and distinguished it from the older notifier copy.
- Verified target Git branch and remote state; created `codex/neuroinclusive-v28`.
- Imported sanitized v27 source, tests, design reference, and v27 release helper.
- Excluded clasp sessions, OAuth material, rollback blobs, caches, screenshots, test attachments, and secret bridges.
- Corrected `.claspignore` to include `MultiAccount.gs`.
- Recorded audit, product roadmap, recovery checkpoint, and crash-report policy.
- Adapted the imported test harness to the repository layout (the Pages bridge is at repository root) and restored the immutable v26 helper required by its release-contract test.

## 2026-07-18 — v28 P0 Focus View

- Implemented an account-isolated attention registry keyed by Telegram user and Gmail connection.
- Added four explicit triage states: `Дія`, `Чекаю`, `Інфо`, and `Пізніше`.
- Added a bounded editable next action, reading progress, and Resume Rail without storing message bodies.
- Added a bounded Focus folder view and honest AI trust surface with a confidence label and original-message evidence.
- Limited the sticky quick-action bar to exactly `Зробити`, `Відповісти`, and `Відкласти`; secondary actions remain in the toolbar.
- Fixed a rendered race between triage and next-action saves with queued idempotent updates and input/blur autosave.
- Fixed preview RPC failure handling so a test exception rejects instead of leaving focus controls permanently disabled.
- Verified navigation persistence: triage and next action survive opening another thread and returning.
- Verified responsive rendering at desktop and 390×844 mobile sizes, including full reader scrolling and reachable original content.
- Browser console contained no application errors; only expected Telegram WebApp compatibility warnings in plain preview mode.
- Ordinary regression: 333/333 passed. Focus/MailClient targeted regression: 200/200 passed.
- Production version 27 was not changed. No real Gmail message, Telegram card, OAuth grant, attachment, or provider data was mutated.

## 2026-07-18 — v28 release freeze

- Added a separate `deploy_apps_script_v28.ps1`; immutable v27 rollback hashes and exact v28 candidate hashes are pinned independently from the older helpers.
- v28 release-contract tests pass 2/2 and confirm fail-closed future-version, mutex, parse, and no-embedded-secret guards.
- Read-only `-PreflightOnly` passed with stable version 27, release state `fresh`, and the expected deployment ID.
- No Apps Script POST or PUT was permitted during preflight; production remains v27 until the guarded release step.
- The first guarded v28 deployment received Google Apps Script HTTP 500 before immutable v28 verification. The helper completed HEAD rollback; immediate read-only preflight confirmed stable v27 and release state `fresh`. No automatic retry was made.
- While release was postponed, froze the independent P1 contract for low-energy/time presets, three low-pressure reply styles, durable send-later, soft/digest/urgent reminders, compassionate copy, privacy-preserving preferences, and three-screen onboarding. No frozen v28 source hash changed.

## 2026-07-18 — v28 production deployment

- Re-audited clean local/remote Git state, checkpoint, and process list; no duplicate v28 deployment was active.
- Fresh read-only preflight again confirmed stable v27, release state `fresh`, and exact five-file v28 hashes.
- The one permitted guarded retry succeeded: immutable Apps Script version 28 was created and the existing stable deployment was updated from v27 to v28.
- Immediate post-deploy preflight returned `preflight_already_deployed`, `idempotent: true`, and the same immutable hashes.
- Telegram webhook remained healthy: correct bot identity, `script.google.com` host, zero pending updates, no last error, and only `message`/`callback_query` updates.
- Post-deploy regression passed 335/335, including the two v28 release-helper contracts.
- A direct unauthenticated web-app GET returned HTTP 200. It intentionally exposed only the launch bridge, not mailbox or preview content; no account session or message was accessed.

## 2026-07-18 — v29 P1 energy-aware Focus sessions

- Created `codex/neuroinclusive-v29` from the verified production-v28 evidence commit; production was not changed.
- Added bounded `Мало сил`, `5 хвилин`, `3 листи`, and `Без таймера` presets plus `М’яко`, `Дайджест`, and `Лише термінове` reminder preferences.
- Persisted preferences in the existing attention registry, isolated by exact Telegram user ID and Gmail connection ID, with optimistic revision checks and idempotent updates.
- Reloaded the exact new Gmail account preferences during account switching instead of retaining the previous account's UI state.
- Extended Gmail disconnect cleanup to remove the disconnected account's private Focus and attention preference records.
- Limited the visible Focus queue to the selected preset budget; `Мало сил` renders exactly one working thread and compassionate copy.
- Targeted Focus/MailClient contracts passed 202/202. Full ordinary regression passed 335/335.
- Chrome preview QA passed at desktop and 390×844. The mobile body width remained exactly 390 px with no horizontal overflow; the one-thread queue and `Дайджест` selection rendered correctly.
- Browser logs contained no application errors. Two Telegram SDK compatibility warnings are expected because localhost preview is outside a current Telegram WebView.
- Private QA captures remain outside Git under the thread visualization directory. No real Gmail message, Telegram card, OAuth grant, attachment, provider object, browser account, or phone state was mutated.

## 2026-07-18 — v29 release freeze and preflight

- Added a separate `deploy_apps_script_v29.ps1` with immutable v28 rollback hashes and the exact five-file v29 candidate hashes.
- The v29 release-helper contract passed 2/2, including PowerShell parsing, single mutation points, future-version refusal, mutex, and embedded-secret guards.
- Read-only `-PreflightOnly` returned `ok: true`, stable production version 28, release state `fresh`, and the expected deployment ID and v29 hashes.
- Preflight permitted only Google Apps Script GET operations. No immutable version, deployment update, Gmail mutation, OAuth consent, migration, or Telegram change occurred.

## 2026-07-18 — v29 production deployment

- Ran the guarded helper once after confirming a clean synchronized remote branch, stable v28, release state `fresh`, and exact candidate hashes.
- Created immutable Apps Script version 29 and updated the existing deployment from v28 to v29 at `2026-07-18T03:18:37.431Z`.
- Immediate post-deploy preflight returned `preflight_already_deployed`, `idempotent: true`, the same deployment ID, and the exact immutable v29 hashes.
- Post-deploy regression passed 337/337, including all ordinary functional tests and both v29 release-helper contracts.
- Telegram webhook health remained exact: `@TarasevychGmailNotifierBot`, `script.google.com`, query keys `key`/`rev`, zero pending updates, no last error, one connection, and only `message`/`callback_query` updates.
- The protected bot token was read only inside the local keyring process and was never printed, copied, or committed.
- An unauthenticated web-app GET returned HTTP 200 and the expected launch bridge, with no mailbox address or mail content exposed.
- No OAuth/migration was repeated and no Gmail message, Telegram card, attachment, Drive/Box object, provider grant, browser account, or phone state was mutated during post-deploy verification.
