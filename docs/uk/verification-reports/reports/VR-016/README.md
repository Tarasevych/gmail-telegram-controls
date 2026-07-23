# VR-016 — P0 ONE-SECOND launch та offline-first межа

[English](../../../../en/verification-reports/reports/VR-016/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0034`
- **Verification framework:** `REQ-0004`
- **Production boundary:** immutable v65, staging `0`; v66 збережений як історичний immutable; source candidate marker v67 ще не deployed

## Перевірені першопричини

1. GitHub bridge показував повноекранний mailbox handoff з текстом підключення.
2. Apps Script `MailApp.html` містив статичний видимий `bootState` з тим самим повідомленням.
3. `boot()` одразу повторно викликав `setBootLoading()`, очищав і створював той самий екран ще раз.
4. Приватний persistent cache гідратується лише після server bootstrap, оскільки саме bootstrap встановлює allowlist Telegram/Gmail connection IDs. Це правильна security ordering, але вона не дає показати приватну офлайн-пошту до мережевої перевірки.
5. Запуск проходить через два origins/documents: GitHub bridge виконує credentialless POST, після чого Apps Script віддає MailApp. Тому жорсткий production p95 `≤1000 ms` не може бути оголошений без native trace.

## Атомарні висновки

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-016-01 | v66 release cycle завершено fail-closed: promotion не виконано після невдалого повернення до primary account; exact staging видалено, menu повернуто на production, stable/HEAD лишилися v65. | VERIFIED | authenticated release/menu readback і recovery journal |
| VR-016-02 | Подвійний launch screen походив із bridge handoff, статичного MailApp boot overlay та повторного `setBootLoading()` у `boot()`. | VERIFIED | source inspection |
| VR-016-03 | Bridge mailbox POST тепер single-flight, а його duplicate connection copy не показується під час нормального handoff. | VERIFIED | `mail_launch_p0.test.js` `5/5` |
| VR-016-04 | `boot()` тепер ділить одну in-flight Promise; звичайний validated launch не відтворює connection overlay. | VERIFIED | `mail_launch_p0.test.js` `5/5` |
| VR-016-05 | IndexedDB відкривається паралельно, але жодний приватний record не читається до `initializeFromBootstrap`; account allowlist лишається security gate. | VERIFIED | source-order contract і `mail_client_p0.test.js` `14/14` |
| VR-016-06 | Чинні cache bounds, namespace isolation, LRU, warm list/thread, draft recovery та one-reload guard не регресували. | VERIFIED | `mail_client_p0.test.js` `14/14` |
| VR-016-07 | Основний MailApp UI/API contract не регресував. | VERIFIED | `mail_app_contract.test.js` `88/88` |
| VR-016-08 | Попередні локальні measurements: cold `898 ms`, B `431 ms`, cached A `409 ms`; це не production p95 і не Telegram button-to-interactive trace. | PARTIAL | попередній content-free local trace GT-033 |
| VR-016-09 | Warm launch `≤1000 ms` p95, 10 native launches, offline private Inbox та cached thread acceptance ще не виконані. | UNVERIFIED | staging v67 не створений |
| VR-016-10 | Background Sync не є baseline browser capability і залежить від Service Worker; чинний source навмисно не заявляє непідтверджену підтримку. | VERIFIED | platform docs і negative source contract |
| VR-016-11 | Повернення з secondary до primary account у v66 staging конфліктує з локальним switch contract. | CONFLICTING | native v66 observation проти deterministic tests |

| VR-016-12 | Повний cumulative suite і три documentation gates проходять із новим source delta. | VERIFIED | `node --test` `518/518`; bilingual `71` pairs; knowledge hub `17` pairs/`295` source IDs; verification checker pass |

## Платформна межа

- Telegram `initData` продовжує перевірятися server-side; `initDataUnsafe` не є джерелом довіри.
- Apps Script HtmlService працює в sandboxed iframe; внутрішній код не послаблює sandbox або OAuth/session перевірку.
- IndexedDB є origin-scoped best-effort storage і може бути очищений користувачем, браузером, quota eviction або через несумісну schema.
- Background Sync потребує Service Worker та не підтримується однаково всіма browser/WebView середовищами.
- Для приватного cache-first UI до server bootstrap потрібен окремо спроєктований device-bound unlock/session contract. Його не можна замінити plaintext token у browser storage.

## Офіційні джерела

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Apps Script HTML restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Apps Script HTML best practices](https://developers.google.com/apps-script/guides/html/best-practices)
- [Gmail synchronization](https://developers.google.com/workspace/gmail/api/guides/sync)
- [Gmail drafts](https://developers.google.com/workspace/gmail/api/guides/drafts)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology)
- [Background Synchronization](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)
- [Service Workers specification](https://www.w3.org/TR/service-workers/)

## Release decision

Source marker v67 є наступним cumulative immutable candidate після збереженого v66. Створення staging дозволене лише після повного local/CI gate. Promotion заборонений, доки native acceptance не підтвердить account switch туди/назад, 10 launch traces, відсутність duplicate overlay/bootstrap і визначений cache/security сценарій. Production лишається v65.

## Додаток до staging acceptance: immutable v67

- Дата: 2026-07-23
- Статус: PARTIAL
- Межа production: v65 залишився незмінним.

### Перевірені докази

- Сукупний код v67, release-helper і staging bridge пройшли локальний release suite (522/522) та обов'язкові GitHub checks.
- Коректні нативні запуски в Telegram Desktop відкривали попередньо кешоване робоче представлення без GitHub handoff-картки, повторного екрана підключення або нової OAuth-взаємодії.
- Реалізація запуску використовує одну спільну bootstrap promise та залишає приватні кешовані записи заблокованими, доки серверний bootstrap не поверне дозволений набір акаунтів.
- Після зупинки acceptance меню Telegram повернено до production bridge.
- Точний staging deployment v67 видалено fail-closed, immutable v67 збережено, promotion у production не виконувався.

### Докази, не прийняті як верифікація

- Під час координатної серії з десяти запусків Telegram Desktop також відкривав нативні вікна профілю та файлів. Її часові вибірки не є валідним доказом продуктивності продукту та не використовуються для SLO однієї секунди.
- Нативний p95 time-to-interactive, offline-запуск приватної пошти, двостороннє перемикання акаунтів, відновлення чернеток та ізоляція багатоакаунтного кешу залишаються unverified.
- Чинний двоoriginний маршрут GitHub bridge до Apps Script не має перевіреного device-bound unlock, який дозволив би показати приватну кешовану пошту до серверного bootstrap.

### Рішення щодо випуску

Promotion у production не виконувався. Майбутній cumulative candidate потребує відтворюваного внутрішнього trace time-to-interactive та переглянутого рішення device-bound unlock або single-origin architecture, перш ніж offline-private вимоги й правило однієї секунди можуть отримати статус VERIFIED.

## Додаток щодо acceptance у Telegram Web

- Статус: UNVERIFIED tooling/platform gate
- Уже авторизована Chrome-сесія Telegram Web відкрила чат owner-бота без QR, OTP або OAuth.
- Production control запуску Mini App визначено як один точний DOM target.
- Активація цього target створювала коротку порожню child surface і повертала до чату. Для readback не залишалося persistent iframe, parent-tab network event або console error.
- Readback Apps Script Executions завершився timeout керування браузером до отримання доказу. Тому невідомо, чи запуск досяг Apps Script.
- Це спостереження не класифікується як regression v65 або v67. Staging deployment не відтворювався, production state не змінювався.
- Умова повтору: підтримуваний child-target/iframe trace або власна content-free launch telemetry продукту з кореляцією точного запуску до authenticated Apps Script execution evidence.

## Source-корекція v70 до релізу

- **Дата:** 2026-07-23
- **Статус:** PARTIAL
- **Production boundary:** immutable v65, staging `0`; immutable v69 збережено як історичний `abandoned`; v70 є лише локальним source candidate.

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-016-13 | Bridge передає `launch_started_ms`, сервер приймає лише обмежене часове вікно, а клієнт обчислює content-free cross-document time-to-usable. | VERIFIED | source contract і `mail_launch_p0.test.js` |
| VR-016-14 | SecureStorage wrapper зберігає дозволений status/error class без credential value; `UNSUPPORTED`, timeout і terminal failure більше не губляться безслідно. | VERIFIED | source contract і P0 tests |
| VR-016-15 | Повторений one-time proof без придатного secure credential переходить у fail-closed locked state без рекурсивного `restartMailboxApp`; nonce replay guard не послаблено. | VERIFIED | source contract і P0 tests |
| VR-016-16 | Фокусні P0-контракти проходять `113/113`, повний Apps Script suite `567/567`, added-production-line privacy scan `0`, `git diff --check` чистий. | VERIFIED | локальний deterministic gate |
| VR-016-17 | Native button-to-interactive p95, десять запусків, точний Windows SecureStorage result, hard reload і offline private Inbox ще не перевірені на v70. | UNVERIFIED | staging v70 не створено |
| VR-016-18 | Browser-level повторне надсилання POST відбувається до внутрішнього MailApp JavaScript; поточний source patch не може оголошувати prompt усуненим. | VERIFIED | v69 native trace та document boundary |

### Поточне рішення

v70 не переписує immutable v69 і не змінює production. Після merge/CI дозволено створити лише один cumulative immutable staging candidate. Promotion заборонено, доки всі native acceptance gates не стануть `VERIFIED`. Якщо SecureStorage знову не дасть підтримуваного device-bound recovery, результат лишається `PARTIAL`/`BLOCKED`, а потрібним наступним кроком є окремий architecture decision для першостороннього single-origin app shell або іншого підтвердженого secure unlock primitive.

## Staging creation addendum: immutable v70

- **Дата:** 2026-07-23
- **Статус:** PARTIAL
- Source v70 merged normal PR на SHA `0666165b614f430103530728aa45349083db5e78` і синхронізований у GitLab main тим самим SHA.
- `PreflightOnly` підтвердив stable v65, HEAD `stable_v65`, future immutable відсутній, staging `0`, journal порожній і `readyToStage=true`.
- Guarded `StageOnly` створив immutable v70 та рівно один owner-only staging deployment; точний deployment reference зберігається лише у protected recovery journal.
- Release helper `3/3`, bridge contracts `4/4`, cumulative suite `572/572`, Python menu syntax і whitespace gate пройшли.
- Owner menu ще не перемкнено зі production; production v65 не змінено.
- Native acceptance, one-second p95, SecureStorage result, hard reload і cached-thread test ще не виконані, тому promotion заборонено.
