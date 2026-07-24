# VR-044 - P0-C metadata-only entity reconciliation простого Inbox

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-24
- **Запит:** `REQ-0037`
- **Implementation baseline:** `7bd8270b2e14525dc8e99bd95387a1ef977dde1a`
- **Пов’язані записи:** `GT-069`, `B1-49`, `RCA-025`
- **English mirror:** [VR-044](../../../../en/verification-reports/reports/VR-044/README.md)

## Межа

Звіт перевіряє лише P0-C source contour. Реальні Gmail records, OAuth, Telegram runtime, Apps Script deployment, staging і production не змінювалися. Source tests не доводять native timing або live request reduction.

## Підтверджена першопричина

P0-B усунув full list RPC для no-change cycle, але будь-який History change використовував один `loadThreads()` fallback. Delta не класифікував message/label event, а client не мав bounded metadata-only read для exact changed IDs. Через це label-only change не відрізнявся від body invalidation.

## Реалізований source contour

- History change set має per-thread flags `messageChanged`, `messageAdded`, `messageDeleted`, `labelAdded`, `labelRemoved`.
- Viewer-only `threadSummaries` приймає від 1 до 20 unique exact thread IDs, використовує лише Gmail metadata batch і повертає explicit missing IDs.
- Entity merge дозволений лише для single-account `INBOX` без query, filter або custom label і без full-sync boundary.
- Existing row оновлюється через stable ID, тому cached body та інші локальні поля зберігаються.
- New recent row вставляється за stable timestamp; missing або no-longer-Inbox row прибирається; loaded-page capacity зберігається.
- Foreign account rows не змінюються.
- Selected thread body повторно читається лише після message event. Label-only event оновлює metadata без body RPC.
- Oversized, incomplete, shared або semantic-ambiguous delta використовує чинний bounded full-list fallback.

## Source evidence

| Claim | Результат | Статус |
|---|---:|---|
| Focused P0-C/P0-B/client/adapter contracts | `35/35` | `VERIFIED` у source scope |
| Повний Apps Script suite | `678/678` за `25.414s` | `VERIFIED` у source scope |
| Exact implementation baseline | `7bd8270b2e14525dc8e99bd95387a1ef977dde1a` | зафіксовано |
| Gmail/OAuth/Telegram/runtime mutation | немає | не виконувалося |

Focused contracts перевіряють metadata-only batch, exact missing IDs, limit/uniqueness/viewer/read-only gates, cached-body preservation, insert/remove/order/capacity, foreign-account isolation, rejection complex views і відсутність body refresh для label-only event.

## Чесні обмеження

- Gmail History не визначає membership довільного Gmail query або shared aggregate, тому ці views не переводяться на entity merge без окремого доказу.
- Live History response, actual API request count, cache-hit ratio, user-visible insertion timing, native multi-account/shared mode, staging і production лишаються `UNVERIFIED`.
- Shared Apps Script URL Fetch quota та `T-03` лишають release gate `BLOCKED`.
- Production або staging acceptance не заявляється.

## Первинні джерела

- [Gmail History list](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.history/list)
- [Gmail Threads get](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.threads/get)
- [Advanced Gmail Service](https://developers.google.com/apps-script/advanced/gmail)
- [Apps Script HTML service restrictions](https://developers.google.com/apps-script/guides/html/restrictions)
- [Indexed Database API 3.0](https://w3c.github.io/IndexedDB/)
