# Політика журналу запитів / Request ledger policy

<!-- lang:uk -->
## Українською

## Що записується

- Кожне повідомлення власника, яке містить проєктний запит, зміну вимог, виправлення, дозвіл, заборону, рішення або критерій приймання.
- Окремий файл на окрему логічну тему. Одне повідомлення може містити кілька частин у таблиці маршрутизації.
- Дата, ID, статус, поточна Versie, нормалізована інтерпретація, маршрути, критерії завершення та докази.
- Канонічний запис зберігається тільки в `Запити`. Похідні гілки посилаються на ID, а не дублюють історію.

## Коли записується

- `recorded` публікується до зміни product files, runtime, deployment, плану, інструкції або повноваження.
- Після виконання запис отримує `completed`, `blocked` або `superseded` та точні докази.
- Старий запис не видаляється, коли новий запит змінює рішення.

## Захист даних

- Зберігати очищену інтерпретацію, а не дослівний приватний текст.
- Не записувати passwords, tokens, cookies, OAuth codes, OTP, recovery codes, private keys, приватні email-адреси, листи або вкладення.
- Захищені деталі замінювати private checkpoint reference.

## Повноваження і Versie

- Повноваження змінюється лише якщо власник прямо його дає, змінює, обмежує або відкликає.
- Звичайне доручення виконати задачу не перетворюється на загальне повноваження.
- `Next Versie authorization` за замовчуванням `no`. `yes, Versie N` дозволене лише за прямим наказом створити або випустити саме цю Versie.

<!-- lang:en -->
## English

## What is recorded

- Every owner message containing a project request, requirement change, correction, permission, prohibition, decision, or acceptance criterion.
- One file per logical subject. One message may contain several parts in its routing table.
- Date, ID, status, active Versie, normalized interpretation, routes, completion criteria, and evidence.
- The canonical record exists only on `Запити`. Derived branches link to the ID instead of duplicating history.

## When it is recorded

- `recorded` is published before changing product files, runtime, deployment, plans, instructions, or permissions.
- After execution, the record receives `completed`, `blocked`, or `superseded` plus exact evidence.
- An older record is not deleted when a new request changes the decision.

## Data protection

- Preserve a sanitized interpretation rather than verbatim private text.
- Never record passwords, tokens, cookies, OAuth codes, OTP values, recovery codes, private keys, private email addresses, mail, or attachments.
- Replace protected details with a private checkpoint reference.

## Permissions and Versie

- Authority changes only when the owner explicitly grants, changes, narrows, or revokes it.
- A normal instruction to perform a task does not become broad standing authority.
- `Next Versie authorization` defaults to `no`. `yes, Versie N` is valid only after a direct order to create or release that exact Versie.