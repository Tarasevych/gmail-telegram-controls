# Політика журналу запитів / Request ledger policy

<!-- lang:uk -->
## Українською

## Що записується

- Кожне повідомлення власника, яке містить проєктний запит, зміну вимог, виправлення, дозвіл, заборону, рішення або критерій приймання.
- Окремий файл на окрему логічну тему. Непов'язані вимоги не об'єднуються.
- Дата, ID, статус, поточна Versie, нормалізована інтерпретація, критерії завершення та посилання на докази.

## Коли записується

- Статус `recorded` фіксується й публікується до зміни product files, runtime, deployment або release state.
- Після початку робіт статус може стати `in_progress`.
- Після перевіреного виконання запис отримує `completed` і commit/deployment/test evidence.
- Якщо нова вказівка замінює попередню, старий запис не переписується: він отримує `superseded` і посилання на новий ID.

## Захист даних

- Не зберігати запит дослівно, якщо він містить приватні або конфіденційні дані.
- Замінювати конкретні акаунти, листи й секрети приватним checkpoint reference.
- Не записувати passwords, tokens, cookies, OAuth codes, OTP, recovery codes, private keys або приватний вміст листів.
- Публічний запис має бути достатнім для трактування задачі, але не для відновлення секретного доступу.

## Наступна Versie

Поле `Next Versie authorization` за замовчуванням має значення `no`. Значення `yes, Versie N` дозволене лише за прямим наказом власника створити або випустити саме цю Versie.

<!-- lang:en -->
## English

## What is recorded

- Every owner message containing a project request, requirement change, correction, permission, prohibition, decision, or acceptance criterion.
- One file per logical subject. Unrelated requirements are not combined.
- Date, ID, status, active Versie, normalized interpretation, completion criteria, and evidence links.

## When it is recorded

- A `recorded` entry is published before product files, runtime, deployment, or release state changes.
- Status may become `in_progress` after work starts.
- Verified completion adds `completed` plus commit, deployment, and test evidence.
- A superseding instruction does not rewrite history: the earlier entry becomes `superseded` and links to the new ID.

## Data protection

- Do not preserve a request verbatim when it contains private or confidential data.
- Replace specific accounts, mail, and secrets with a private checkpoint reference.
- Never record passwords, tokens, cookies, OAuth codes, OTP values, recovery codes, private keys, or private mail content.
- A public record is sufficient to interpret the task but never to reconstruct protected access.

## Next Versie

`Next Versie authorization` defaults to `no`. `yes, Versie N` is valid only after a direct owner order to create or release that exact Versie.
