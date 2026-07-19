# REQ-0002: Відокремлений журнал і контекстна маршрутизація / Separate ledger and contextual routing

- ID: REQ-0002
- Received: 2026-07-19
- Status: recorded
- Active Versie: Versie 1
- Next Versie authorization: no
- Sensitive data persisted: no
- Routes: requests=record; instructions=update; permissions=update; plan=no-change; product=no-change; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

## Інтерпретація запиту власника

- Відокремити історію запитів від нормативних гілок `Інструкції` та `Повноваження`.
- Створити канонічну гілку `Запити`, де кожне проєктне повідомлення отримує очищений запис до виконання.
- Розділяти повідомлення на логічні частини й маршрутизувати кожну частину до належного контуру.
- Оновлювати `Інструкції` лише для постійних правил виконання.
- Оновлювати `Повноваження` лише за явно наданим, зміненим, обмеженим або відкликаним власником дозволом; не виводити дозволи з припущень.
- План, проблеми, продукт і release змінювати лише тоді, коли відповідна частина запиту справді їх стосується.
- Пов'язувати кожну похідну зміну з її `REQ-ID`.
- Не створювати Versie 2 і не змінювати Gmail, Telegram, Apps Script або production у межах цього структурного запиту.

## Критерії завершення

- Окрема remote-гілка `Запити` містить індекс, політику, маршрутизатор, історичні записи та CI.
- `Інструкції` більше не містить канонічного журналу запитів.
- `Повноваження` містить лише вузький явно наданий дозвіл на контекстну маршрутизацію.
- Bootstrap-правило в робочих гілках указує на `Запити` як джерело історії.
- REQ-0002 містить докази всіх виконаних змін.

<!-- lang:en -->
## English

## Interpreted owner request

- Separate request history from the normative `Інструкції` and `Повноваження` branches.
- Create a canonical `Запити` branch where each project message receives a sanitized record before execution.
- Split a message into logical parts and route each part to the proper governance area.
- Update `Інструкції` only for standing execution rules.
- Update `Повноваження` only when the owner explicitly grants, changes, narrows, or revokes authority; never infer authority.
- Change plans, issues, product, and release state only when the corresponding request part actually applies.
- Cross-link every derived change to its `REQ-ID`.
- Do not create Versie 2 or modify Gmail, Telegram, Apps Script, or production as part of this structural request.

## Completion criteria

- A separate remote `Запити` branch contains the index, policy, router, historical records, and CI.
- `Інструкції` no longer contains the canonical request ledger.
- `Повноваження` contains only the narrow, explicitly granted contextual-routing authority.
- Bootstrap rules on working branches point to `Запити` as the history source.
- REQ-0002 contains evidence for every completed change.

## Initial pre-change evidence / Первинний доказ до змін

- `bfd74ab`: REQ-0002 was committed and pushed on the then-canonical `Інструкції` branch before the structural split.