# Дорожня карта

Оновлено: **2026-07-20**. Єдина активна версія: **Versie 1**.

| ID | Статус | Крок | Доказ завершення |
|---|---|---|---|
| B1-01 | Виконано | Відновити v45 source-of-truth і перевірити Git/production | remote правильний; production v37 підтверджено |
| B1-02 | Виконано | Виявити причину подвійних Telegram-карток | знайдено legacy + OAuth подвійне сканування; один trigger підтверджено |
| B1-03 | Виконано локально | Дедуплікація owner mailbox, avatar, прямий OAuth старт, stale account count | локальні контракти пройшли |
| B1-04 | Виконано локально | Neutral GitHub OAuth callback із credentialless POST до Apps Script | query очищається до передачі; one-use user/chat/zone state; Google multi-login cookies не надсилаються |
| B1-05 | Виконано | Зберегти новий redirect URI в Google OAuth client | `OAuth client saved`; точний URI прочитано назад |
| B1-06 | Виконано | Credentialless OAuth relay та послідовні immutable v41/v42 | stable v42, staging 0, точний v41 rollback |
| B1-07 | Ручний gate активний | Додати контрольний Gmail-акаунт через новий flow | production дійшов до Google «додаток не перевірено»; власник підтверджує consent для правильного акаунта |
| B1-08 | В роботі | Повний real-time acceptance у @TarasevychGmailNotifierBot | v55 Sent-copy guard пройшов 432/432 і PreflightOnly; staging та контрольний live acceptance однієї картки ще не доведені |
| B1-09 | Виконано | Promote, cleanup, production command menu | stable v42, staging 0, setup execution completed |
| B1-10 | Виконано | Оновити UK/EN docs, commit і push | postmortem та lessons опубліковано у c98e69e; три documentation Actions пройшли; release tag лишається gated B1-07/B1-08 |

| B1-11 | Виконано локально | Відокремити realtime delivery від frozen backlog і запускати її перед maintenance | bounded recent-window lane, per-connection watermark/retry, shared seen ledger; E3/E5 ще потрібні |
| B1-12 | Виконано локально | Агрегувати всі notification accounts в один фізичний Telegram-потік з account identity та account-scoped діями | main chat є «Усі повідомлення»; account roots перемикають context без дублювання картки; E5 з другим акаунтом заблоковано consent |

## Правило руху

Поки B1-05–B1-10 не завершені, Versie 2 не відкривається. Нові знайдені проблеми отримують `GT-*` у [ISSUES.md](ISSUES.md); виправлення додається до Versie 1, доки Versie 1 не released. Після release будь-яке нове виправлення належить тільки Versie 2.

## Кумулятивна дослідницька roadmap

Довгострокові report-derived етапи, залежності й evidence gates містяться в [Master Roadmap](knowledge-hub/MASTER_ROADMAP.md). Поточні `B1-*` release gates вище мають пріоритет для Versie 1.

## Verification gate

`VR-001` завершив repository/test-класифікацію 245/245 `KH-*` claims: [звіт](verification-reports/reports/VR-001/README.md). Він не закриває B1-07–B1-09: staging OAuth callback, real-time Telegram acceptance і production promotion залишаються окремими E4/E5 доказами. Поточне продовження: `REQ-0009`.

### B1-13 — Ізоляція конкурентного Gmail OAuth refresh

- **Статус:** виконано локально; E4/E5 ще не пройдені.
- **Результат:** для кожного Gmail-з’єднання застосовано короткий ScriptLock лише на claim/commit/release та lease у protected Script Properties; HTTP refresh виконується поза lock.
- **Інваріанти:** активний lease не допускає другого provider fetch; перед commit повторно перевіряються connection ID, email, token generation і поточний token record; помилка звільняє власний lease без зміни захищеного токена.
- **Доказ:** детерміновані локальні тести та candidate hash pin для поточної Versie 1.
- **Source request:** REQ-0015.
- **Не виконано:** immutable deployment, staging/production rollout і реальний OAuth цикл.