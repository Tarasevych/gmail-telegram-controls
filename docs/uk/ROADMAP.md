# Дорожня карта

Оновлено: **2026-07-20**. Єдина активна версія: **Versie 1**.

| ID | Статус | Крок | Доказ завершення |
|---|---|---|---|
| B1-01 | Виконано | Відновити v45 source-of-truth і перевірити Git/production | remote правильний; production v37 підтверджено |
| B1-02 | Виконано | Виявити причину подвійних Telegram-карток | знайдено legacy + OAuth подвійне сканування; один trigger підтверджено |
| B1-03 | Виконано локально | Дедуплікація owner mailbox, avatar, прямий OAuth старт, stale account count | локальні контракти пройшли |
| B1-04 | Виконано локально | Neutral GitHub OAuth callback із credentialless POST до Apps Script | query очищається до передачі; one-use user/chat/zone state; Google multi-login cookies не надсилаються |
| B1-05 | Виконано | Зберегти новий redirect URI в Google OAuth client | `OAuth client saved`; точний URI прочитано назад |
| B1-06 | В роботі | Створити Apps Script immutable v41 із credentialless relay receiver; замінити лише точний v40 staging | один точний v41 staging, stable v37 не змінено до acceptance |
| B1-07 | Ручний gate | Додати контрольний Gmail-акаунт через новий flow | власник проходить account choice/consent; callback success |
| B1-08 | Заплановано | Повний real-time acceptance у `@TarasevychGmailNotifierBot` | функціональний журнал без дублювання й zone mix |
| B1-09 | Заплановано | Promote Versie 1, cleanup, production menu | stable v39, staging 0, menu `📬 Пошта · Versie 1` |
| B1-10 | Заплановано | Оновити UK/EN docs, commit, tag, release branch | `versie-001-2026-07-19` і `release/versie-001-2026-07-19` |

## Правило руху

Поки B1-05–B1-10 не завершені, Versie 2 не відкривається. Нові знайдені проблеми отримують `GT-*` у [ISSUES.md](ISSUES.md); виправлення додається до Versie 1, доки Versie 1 не released. Після release будь-яке нове виправлення належить тільки Versie 2.

## Кумулятивна дослідницька roadmap

Довгострокові report-derived етапи, залежності й evidence gates містяться в [Master Roadmap](knowledge-hub/MASTER_ROADMAP.md). Поточні `B1-*` release gates вище мають пріоритет для Versie 1.

## Verification gate

`VR-001` завершив repository/test-класифікацію 245/245 `KH-*` claims: [звіт](verification-reports/reports/VR-001/README.md). Він не закриває B1-07–B1-09: staging OAuth callback, real-time Telegram acceptance і production promotion залишаються окремими E4/E5 доказами. Поточне продовження: `REQ-0008`.
