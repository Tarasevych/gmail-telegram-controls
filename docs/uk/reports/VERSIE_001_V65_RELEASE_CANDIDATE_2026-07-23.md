# Звіт про випуск і acceptance v65 у Versie 1

[English](../../en/reports/VERSIE_001_V65_RELEASE_CANDIDATE_2026-07-23.md)

- **Дата:** 2026-07-23
- **Статус:** PARTIAL
- **Source request:** `REQ-0033`
- **Атомарна verification:** [VR-014](../verification-reports/reports/VR-014/README.md)

## Межі

Immutable v65 є production і HEAD, staging `0`, journal `cleaned`, а exact immutable v64 лишається rollback.

## Exact boundaries

- merged candidate source: `3373ca4aa403a28f3252ad72fbe65310b318c53c`;
- rollback і historical staging version: exact immutable v64;
- candidate version: v65;
- зміна: canonical production-release discovery та exact client marker `Versie-1-v65-p0`;
- OAuth, Gmail mutation, Telegram-zone change або deployment mutation не входять до цього source artifact.

## Candidate hashes

| Файл | Normalized SHA-256 |
|---|---|
| `Code.gs` | `b9d38bba7bc13de401ab016f8cccde869a9bc933803fc98afb5a427bb2a6ec51` |
| `MultiAccount.gs` | `8d07e8b9f0f524ed5cedccbb8bfecbb547c93a34eda8ef876e40776d6b470f10` |
| `MailClient.gs` | `a04b56d4955ba72d46a7fedb7e48b837cd0737da87a6c720281472aa724c5a06` |
| `MailApp.html` | `ff2c04e1fd4fa88a5da90e22b012c078e8fad7a31aa8ae447e57a6a8f5555565` |
| `appsscript.json` | `354ad159bcd81637d9abf7711cfc675b192ac373317744cf90376f7b14f4edc9` |

## Випуск і live acceptance

- Source contracts пройшли `14/14`, cumulative source suite пройшов `505/505`.
- Helper contracts пройшли `2/2`, cumulative release suite `507/507`; bridge contracts пройшли `4/4` і `509/509`.
- Один bounded `StageOnly` створив immutable v65 та один staging deployment. Propagation recovery прийняв exact deployment без повторного create.
- Native Telegram Desktop staging завантажив mailbox, avatar і рівно три roots, після чого перемкнувся на secondary Gmail connection і назад без OAuth.
- Один promotion просунув v64 до v65; два fresh production launches пройшли; cleanup видалив staging; final preflight підтвердив stable/HEAD v65 і journal `cleaned`.

## Follow-up: затримка видимості deployment

- **Статус:** `VERIFIED`
- Перший `StageOnly` створив immutable v65 і рівно один staging, але негайне читання Apps Script Deployments API ще не побачило щойно створений deployment.
- Production і HEAD залишилися на exact v64; journal зупинився на `staging_create_reserved`, тому повторне створення було заборонене.
- Helper доповнено обмеженим polling: не більше п'яти read-back спроб з паузою одну секунду. Він не повторює `deployments.create` і приймає лише рівно один deployment з exact version та description.
- Bounded recovery успішно застосовано без створення другої immutable version або deployment.

## Staging bridge

- **Статус:** `VERIFIED`
- Immutable v65 і рівно один staging deployment підтверджені helper read-back.
- Окремий noindex bridge передає лише підписаний Telegram `initData` через form POST до exact v65 staging deployment; URL не містить токенів або приватних ключів.
- Поточний owner-menu updater розділяє v65 staging та незмінний production URL; історичний v64 bridge не переписано.
- Native staging acceptance пройшов, а owner menu повернуто на production до promotion.

## Post-release blocker доставки

- **Статус:** `PARTIAL`
- Послідовні production worker traces завершилися з `errorCode=none`; overlapping process shell було відхилено кодом `gmail_timer_worker_skip: lease_active`.
- Один контрольований owner self-message мав Gmail labels `UNREAD+SENT+INBOX`, але automatic processing і два manual `/check` не створили Telegram card.
- Першопричина: eligibility guard у production v65 відхиляє кожне `SENT` повідомлення, навіть якщо той самий Gmail message також має `INBOX`.
- Source correction зберігає межі `INBOX`, `SPAM`, `TRASH` та important-mode і використовує durable dedupe за Gmail message ID. Focused tests пройшли `161/161`; deployment потребує окремо pinned cumulative candidate v66.
- Доказ: [VR-015](../verification-reports/reports/VR-015/README.md).
