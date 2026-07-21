# Первинні джерела Gmail і поверхні публікації

Джерело запиту: `REQ-0021`. Дата перевірки джерел: 2026-07-21.

## Обов'язковий source gate

Перед змінами інтеграції Gmail, Apps Script, авторизації, scopes, callback, quota або release-процесу потрібно перевірити актуальні офіційні сторінки Google:

1. [Advanced Gmail Service](https://developers.google.com/apps-script/advanced/gmail?hl=en) - канонічна сторінка. Наданий власником account-qualified URL: `https://developers.google.com/apps-script/advanced/gmail?authuser=0`.
2. [Advanced Google services](https://developers.google.com/apps-script/guides/services/advanced) - правила ввімкнення, авторизації та вибору між advanced service і прямими HTTP-викликами.

У записі зміни потрібно зазначити дату доступу, релевантний контракт і рішення. Відсутній або суперечливий доказ означає `unverified`, а не припущення.

## Правило реалізації

- Advanced Gmail Service використовувати лише після перевірки сумісності з connection-scoped multi-account identity, scopes, callback і rollback-контрактом Versie 1.
- Не замінювати чинний OAuth/`UrlFetch` шлях автоматично лише тому, що advanced service рекомендований Google.
- Не змішувати owner Gmail sessions, Telegram zones або token records під час порівняння реалізацій.
- Не публікувати OAuth tokens, `initData`, identifiers, cookies, secret properties або вміст листів.

## Перевірка сумісності Versie 1

| Смуга | Фактичний auth-контракт | Advanced Gmail Service | Рішення |
|---|---|---|---|
| `apps_script_owner` | `ScriptApp.getOAuthToken()` і authenticated Apps Script principal | Частково сумісний; runtime acceptance ще `unverified` | Можливий окремий adapter після enablement, scope і rollback test |
| `google_oauth` multi-account | Окремий access/refresh token на `connectionId`, generation і Gmail zone | Несумісний як повна заміна: advanced service автоматично використовує Apps Script authorization, а `users/me` означає саме authenticated user | Зберегти direct Gmail API transport із connection-scoped bearer token |
| Metadata fan-out | `threads.list` через connection token, потім parallel `threads.get` | Advanced service не зберігає зовнішню identity | Негайно вирівняти batch token із current connection; окремо дослідити Gmail HTTP batch |

Локальна перевірка коду виявила, що `gmailApiRequest_` уже правильно вибирає `mailboxMultiGmailAccessToken_`, але `mailboxFetchThreadMetadataBatch_` використовував лише `ScriptApp.getOAuthToken()`. Це могло змішати owner/legacy mailbox із вибраним зовнішнім Gmail connection. Candidate виправляє token selection без зміни OAuth records або листів.

Офіційний [Gmail batch contract](https://developers.google.com/workspace/gmail/api/guides/batch) дозволяє до 100 внутрішніх Gmail API calls в одному `multipart/mixed` HTTP request і переносить outer `Authorization` на всі частини. Це сумісний напрям для зменшення `UrlFetch` calls у multi-account lane, але кожна внутрішня операція все одно рахується окремим Gmail API request. До впровадження потрібні fail-closed multipart parser, `Content-ID` alignment tests, 401/403/404/429/5xx tests і quota telemetry.

## Поверхні публікації

| Поверхня | Роль | Канонічність |
|---|---|---|
| GitHub `Tarasevych/gmail-telegram-controls` | Код, документація, issue/plan/request history, commits і rollback | Канонічне сховище |
| Google Apps Script | Виконуваний immutable deployment і staging | Runtime-поверхня, не дзеркало Git |
| Google Developer Profile | Профіль, badges, saved pages/collections і посилання на GitHub | Discovery-індекс, не репозиторій |

Google Developer Profile не має контракту для зберігання Git-об'єктів, гілок, commits або повної файлової історії. Тому вимога подвійної публікації реалізується як: повна публікація перевіреного коду/документації в GitHub, відповідний Apps Script deployment для runtime-змін і підтримуване посилання/індексація в Developer Profile. Це не можна називати повним repository mirror.

## Release gate

Зміна зовнішнього Gmail-контракту потребує окремих доказів: локальні тести, staging, rollback target, owner-only acceptance і production verification. Нова Versie не створюється без прямої команди власника.
