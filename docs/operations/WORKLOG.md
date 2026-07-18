# Work log

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
