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
