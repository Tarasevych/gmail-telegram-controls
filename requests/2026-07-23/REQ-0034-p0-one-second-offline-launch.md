# REQ-0034 — P0 one-second offline-first launch / P0 offline-first запуск за одну секунду

- ID: REQ-0034
- Date: 2026-07-23
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=update
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Після recovery-аудиту завершити лише вже відкритий release-контур до безпечного terminal state, а потім виконувати цей P0 раніше за некритичні задачі.
- Зафіксований стартовий boundary: production і HEAD Apps Script залишено на v65; immutable v66 збережено як історичний rejected staging; staging видалено; Telegram-меню повернуто на production. v66 не promoted через непрохідний return-to-primary account-switch gate.
- Розширити активний `REQ-0033` окремим stricter contract: warm Mini App launch, відкриття кешованого листа та повернення `A -> B -> A` мають показувати реальний інтерактивний локальний стан не пізніше 1000 ms без network blocking.
- Встановити доказову першопричину подвійного повноекранного launch-повідомлення і реалізувати один ідемпотентний single-flight pipeline для Telegram bootstrap, session validation, auth і sync.
- Після першого безпечного linking показувати app shell і дозволений device-bound cached state негайно; інтерактивний connection screen дозволений лише для фактичного first link, нового account link, revoked permission або неможливого safe session recovery.
- Реалізувати versioned IndexedDB/persistent storage з normalized Gmail message/thread entities, bounded LRU/quota handling, schema migration, per-Telegram-user/per-Gmail-account namespaces та lock/unlock boundary без browser-stored access/refresh tokens, Telegram signatures або інших secrets.
- Реалізувати cache-first/stale-while-revalidate, incremental Gmail synchronization, in-flight request deduplication, stale-response protection і bounded prefetch, який не позначає mail прочитаним і не завантажує tracking content.
- Зберігати local recovery draft одразу та синхронізувати account-scoped Gmail Draft у фоні зі stable draft ID, bounded retry, out-of-order protection і явною conflict strategy.
- Додати exact release ID/content hash, versioned client-cache activation, рівно один controlled reload для нового production build і захист від reload loop.
- Спочатку перевірити офіційні Telegram Mini Apps, Gmail API, Google Apps Script та browser-platform contracts. Не припускати Service Worker, Background Sync або execution після закриття WebView без доказу.
- Створити фактичні наступні GT/VR лише з актуальних реєстрів для performance, launch/auth dedupe, offline cache, prefetch, cache locking, drafts, client update та multi-account isolation.

### Критерії завершення

- Baseline і after-trace містять usable-UI time, warm launch p95 на визначеному пристрої, cached-message open, `A -> B -> A`, request count, full reload count, bootstrap/auth duplicate count і cache-hit ratio без вигаданих значень.
- Повторний звичайний запуск після linking не показує connection overlay; десять послідовних warm launches не мають duplicate bootstrap/auth, full navigation reload або cross-account data leakage.
- Offline launch і відкриття раніше синхронізованого листа використовують лише безпечно розблокований локальний namespace; logout блокує cache, а explicit device removal очищує лише відповідний namespace.
- Automated, visual, slow-network, offline, quota, migration, draft, account-switch, shared-mode і one-reload/no-loop tests проходять; випадкові Gmail records не змінюються.
- Окремий normal PR, green required checks, privacy scan і один cumulative immutable Versie 1 candidate передують owner-only staging. Production promotion дозволено лише для exact candidate після повного `VERIFIED` acceptance і rollback readiness за `P-009`.
- Після promotion або blocked rollback оновлено парні UK/EN evidence, current state, issues/roadmap, request status, release journal і private checkpoint; temporary staging/processes прибрано.
- Stop gates: CAPTCHA, OTP/2FA, passkey/biometric/hardware key, новий user-specific Google consent, unresolved Gmail/Telegram zone identity або materially unsafe irreversible choice.

### Походження і межа

- Попередній контекст: `REQ-0033`; цей запис не переписує його історію й додає окремий measurable launch contract та duplicate-launch defect.
- Повноваження: active `P-006` для автономної реалізації та active `P-009` для bounded Versie 1 release automation.
- Versie лишається `Versie 1`; historical immutable v66 не змінюється і не може бути promoted цим новим cycle.

<!-- lang:en -->
## English

### Normalized request

- After the recovery audit, finish only the already-open release operation to a safe terminal state, then execute this P0 ahead of noncritical work.
- Recorded starting boundary: production and Apps Script HEAD remain v65; immutable v66 is preserved as historical rejected staging; staging was removed; the Telegram menu was restored to production. v66 was not promoted because the return-to-primary account-switch gate failed.
- Extend active `REQ-0033` with a separate stricter contract: warm Mini App launch, cached-message open, and `A -> B -> A` must expose real interactive local state within 1000 ms without network blocking.
- Establish the evidence-backed root cause of the duplicated full-screen launch message and implement one idempotent single-flight pipeline for Telegram bootstrap, session validation, authentication, and synchronization.
- After the first safe link, show the app shell and permitted device-bound cached state immediately; an interactive connection screen is allowed only for an actual first link, a new account link, revoked permission, or impossible safe session recovery.
- Implement versioned IndexedDB/persistent storage with normalized Gmail message/thread entities, bounded LRU/quota handling, schema migration, per-Telegram-user/per-Gmail-account namespaces, and a lock/unlock boundary without browser-stored access/refresh tokens, Telegram signatures, or other secrets.
- Implement cache-first/stale-while-revalidate, incremental Gmail synchronization, in-flight request deduplication, stale-response protection, and bounded prefetch that neither marks mail read nor loads tracking content.
- Persist an immediate local recovery draft and synchronize an account-scoped Gmail Draft in the background with a stable draft ID, bounded retry, out-of-order protection, and an explicit conflict strategy.
- Add an exact release ID/content hash, versioned client-cache activation, exactly one controlled reload for a new production build, and reload-loop protection.
- First verify official Telegram Mini Apps, Gmail API, Google Apps Script, and browser-platform contracts. Do not assume Service Worker, Background Sync, or execution after WebView close without evidence.
- Create the actual next GT/VR identifiers only from current registries for performance, launch/auth deduplication, offline cache, prefetch, cache locking, drafts, client update, and multi-account isolation.

### Completion criteria

- Baseline and after traces include usable-UI time, warm-launch p95 on a defined device, cached-message open, `A -> B -> A`, request count, full reload count, duplicate bootstrap/auth count, and cache-hit ratio without invented values.
- A normal repeat launch after linking shows no connection overlay; ten consecutive warm launches have no duplicate bootstrap/auth, full navigation reload, or cross-account data leakage.
- Offline launch and opening a previously synchronized message use only a safely unlocked local namespace; logout locks the cache, while explicit device removal clears only the applicable namespace.
- Automated, visual, slow-network, offline, quota, migration, draft, account-switch, shared-mode, and one-reload/no-loop tests pass; arbitrary Gmail records are not mutated.
- A separate normal PR, green required checks, privacy scan, and one cumulative immutable Versie 1 candidate precede owner-only staging. Production promotion is allowed only for the exact candidate after complete `VERIFIED` acceptance and rollback readiness under `P-009`.
- After promotion or a blocked rollback, paired UK/EN evidence, current state, issues/roadmap, request status, release journal, and private checkpoint are updated; temporary staging/processes are removed.
- Stop gates: CAPTCHA, OTP/2FA, passkey/biometric/hardware key, new user-specific Google consent, unresolved Gmail/Telegram zone identity, or a materially unsafe irreversible choice.

### Provenance and boundary

- Prior context: `REQ-0033`; this record does not rewrite its history and adds a separate measurable launch contract and duplicate-launch defect.
- Authority: active `P-006` for autonomous implementation and active `P-009` for bounded Versie 1 release automation.
- The product remains `Versie 1`; historical immutable v66 is not changed and cannot be promoted by this new cycle.
