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
