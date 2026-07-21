# VR-004 Appendix: сумісність Advanced Gmail service

[English](../../../../en/verification-reports/reports/VR-004/ADVANCED_GMAIL_COMPATIBILITY.md) | [VR-004](README.md) | [Індекс](../../INDEX.md)

- **Дата:** 2026-07-21
- **Джерела запиту:** `REQ-0004`, `REQ-0021`
- **Метод:** офіційні Google sources плюс статичний аналіз exact `origin/main`
- **Target:** `535a77d1461a2b87e9039485da489ff8a418e878`
- **Code/manifest/runtime mutation:** ні

## Рішення

Повна заміна direct Gmail `UrlFetch` на Advanced Gmail service несумісна з чинною multi-account моделлю. Advanced service автоматично використовує authorization Apps Script execution user. Зовнішні Gmail connections натомість мають окремі bearer tokens, вибрані за `Telegram user -> zone -> connection`. Передати такий token в Advanced service не можна.

Безпечний напрям — лише явний hybrid adapter:

- `apps_script_owner` read lane може бути кандидатом на Advanced Gmail service;
- external Gmail connection lanes лишаються на direct HTTP із connection-scoped bearer token;
- OAuth token/revoke endpoints, Telegram API та інші зовнішні providers лишаються direct `UrlFetch`;
- owner-lane mutation не переводиться до Advanced service, доки не доведено error/idempotency parity;
- fallback Advanced service -> direct HTTP під час помилки заборонений, бо він приховає quota pressure і може повторити неоднозначну mutation.

## Атомарні твердження

| ID | Статус | Рівень | Твердження |
|---|---|---|---|
| VR4-G01 | verified | E1 | Advanced Gmail service є thin wrapper Gmail API, потребує enablement і автоматично обробляє authorization. |
| VR4-G02 | verified | E1 | Gmail API `userId=me` означає автентифікованого користувача; це не механізм impersonation іншого consumer mailbox. |
| VR4-G03 | verified | E2 | Поточний manifest уже містить Gmail v1 advanced service і `gmail.modify`; нове service declaration для дослідження не потрібне. |
| VR4-G04 | verified | E2 | `mailboxMultiGmailAccessToken_` повертає Apps Script owner token лише для `apps_script_owner`; зовнішній connection використовує власний protected OAuth record. |
| VR4-G05 | verified | E2 | `gmailApiRequest_` вручну додає selected bearer token до direct Gmail HTTP request, зберігаючи connection identity. |
| VR4-G06 | recommendation | E0 | Дозволити майбутній Advanced-service adapter лише після явної перевірки owner lane й fail-closed заборони в external context. |
| VR4-G07 | unverified | E0 | Скорочення Apps Script `URLFetch` usage після owner-lane hybrid не вимірювалося й не вважається доведеним. |
| VR4-G08 | blocked | E0 | Runtime implementation/acceptance заблоковані чинною daily quota та release gate; OAuth або service enablement не запускалися. |

## Офіційні джерела

- [Advanced Gmail Service](https://developers.google.com/apps-script/advanced/gmail)
- [Advanced Google services: authorization та порівняння з direct HTTP](https://developers.google.com/apps-script/guides/services/advanced)
- [Authorization for Google Services](https://developers.google.com/apps-script/guides/services/authorization)
- [Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas)
- [Gmail users.messages.list](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list)

## Майбутній implementation gate

1. Додати окремий identity predicate, який дозволяє Advanced service лише для exact `apps_script_owner`.
2. Почати з read-only owner `messages.list/get` і `history.list`; external context має fail closed до direct connection-token adapter без fallback.
3. Нормалізувати помилки Advanced service до чинних content-free runtime codes.
4. Додати negative tests: external connection ніколи не викликає `Gmail.Users.*`; owner call не змінює selected connection.
5. Порівняти call counts і поведінку на synthetic fixtures, потім у staging лише після quota recovery та окремого release gate.

