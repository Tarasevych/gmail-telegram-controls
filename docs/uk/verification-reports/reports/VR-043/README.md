# VR-043 - P0-B account-scoped Gmail History revalidation

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-24
- **Запит:** `REQ-0037`
- **Implementation baseline:** `28b438e68e1b327308761c246e074558b7ccd53d`
- **Пов’язані записи:** `GT-068`, `B1-48`, `RCA-024`
- **English mirror:** [VR-043](../../../../en/verification-reports/reports/VR-043/README.md)

## Межа

Цей звіт перевіряє лише P0-B source contour. Apps Script deployment, staging, production, native Telegram target-device acceptance, OAuth, Gmail action, mailbox mutation або читання приватних листів не виконувалися. Source tests не доводять live request reduction або production behavior.

## Підтверджена першопричина

`p0RevalidateVisible()` кожні 45 секунд і після visibility/online event безумовно запускав повний `loadThreads()` та background refresh вибраного thread. Bootstrap server уже повертав Gmail `historyId`, але `normalizeAccounts()` не зберігав його. Telegram-card History scanner має окремий runtime state і не може бути спільним cursor для Mini App без порушення owner/connection isolation.

## Реалізований source contour

- Додано viewer-only operation `historyDelta` для exact Gmail connection.
- Gmail History ID перевіряється і передається як decimal opaque string без перетворення на JavaScript Number.
- Server запитує `messageAdded`, `messageDeleted`, `labelAdded` і `labelRemoved`, дедуплікує message/thread IDs і обмежує один цикл трьома History pages.
- Відсутній cursor, Gmail 404 і незавершена bounded pagination повертають content-free reason та current baseline і вимагають повної reconciliation.
- Client cursor зберігається тільки в чинному Telegram-owner + Gmail-connection IndexedDB namespace.
- Timer, visibility і online events використовують один reconciliation promise; parallel History RPC також підпадає під чинний RPC single-flight.
- Якщо змін немає, повний list/thread RPC не запускається. Якщо є зміни, складний query/shared view отримує один bounded full-list refresh; вибраний thread повторно читається лише коли його exact connection/thread ID входить до delta.
- OAuth tokens, Telegram signatures та інші secrets у cursor/cache record не зберігаються.

## Source evidence

| Claim | Результат | Статус |
|---|---:|---|
| Focused History/P0/Advanced Gmail contracts | `30/30` | `VERIFIED` у source scope |
| Повний Apps Script suite | `673/673` за `25.763s` | `VERIFIED` у source scope |
| Exact implementation baseline | `28b438e68e1b327308761c246e074558b7ccd53d` | зафіксовано |
| Gmail/OAuth/Telegram/runtime mutation | немає | не виконувалося |

Focused contracts перевіряють opaque decimal cursor, повторювані `historyTypes`, deduplication, missing/stale 404 baseline, тристорінковий fail-closed bound, account-scoped client routing, reconciliation single-flight та недоступність foreign connection поза active account set.

## Чесні обмеження

- Gmail History описує зміни, але сам по собі не визначає membership довільного поточного Gmail query, filter або shared aggregate.
- Тому source optimization повністю прибирає no-change full poll, але після реальної зміни поки виконує bounded full-list reconciliation.
- Entity-level insert/remove для сумісних простих views, live cache-hit ratio, фактичне скорочення API requests, quota behavior, native multi-account/shared acceptance, staging і production не перевірені.
- Shared Apps Script URL Fetch daily quota та owner-policy conflict `T-03` лишають release gate `BLOCKED`.
- Production або staging acceptance не заявляється.

## Первинні джерела

- [Gmail History list](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list)
- [Advanced Gmail Service](https://developers.google.com/apps-script/advanced/gmail)
- [Apps Script advanced services](https://developers.google.com/apps-script/guides/services/advanced)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/)
- [Storage Standard](https://storage.spec.whatwg.org/)
