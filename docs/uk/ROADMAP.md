# Дорожня карта

Оновлено: **2026-07-19**. Єдина активна версія: **Versie 1**.

| ID | Статус | Крок | Доказ завершення |
|---|---|---|---|
| B1-01 | Виконано | Відновити v45 source-of-truth і перевірити Git/production | remote правильний; production v37 підтверджено |
| B1-02 | Виконано | Виявити причину подвійних Telegram-карток | знайдено legacy + OAuth подвійне сканування; один trigger підтверджено |
| B1-03 | Виконано локально | Дедуплікація owner mailbox, avatar, прямий OAuth старт, stale account count | локальні контракти пройшли |
| B1-04 | Виконано локально | OAuth callback relay без `authuser/prompt/scope` | relay live; контракт пройшов |
| B1-05 | Виконано | Зберегти новий redirect URI в Google OAuth client | `OAuth client saved`; точний URI прочитано назад |
| B1-06 | Заплановано | Створити immutable Apps Script v39 і Versie 1 staging; прибрати точний v38 staging | один v39 staging, production все ще v37 |
| B1-07 | Ручний gate | Додати контрольний Gmail-акаунт через новий flow | власник проходить account choice/consent; callback success |
| B1-08 | Заплановано | Повний real-time acceptance у `@TarasevychGmailNotifierBot` | функціональний журнал без дублювання й zone mix |
| B1-09 | Заплановано | Promote Versie 1, cleanup, production menu | stable v39, staging 0, menu `📬 Пошта · Versie 1` |
| B1-10 | Заплановано | Оновити UK/EN docs, commit, tag, release branch | `versie-001-2026-07-19` і `release/versie-001-2026-07-19` |

## Правило руху

Поки B1-05–B1-10 не завершені, Versie 2 не відкривається. Нові знайдені проблеми отримують `GT-*` у [ISSUES.md](ISSUES.md); виправлення додається до Versie 1, доки Versie 1 не released. Після release будь-яке нове виправлення належить тільки Versie 2.

## Кумулятивна дослідницька roadmap

Довгострокові report-derived етапи, залежності й evidence gates містяться в [Master Roadmap](knowledge-hub/MASTER_ROADMAP.md). Поточні `B1-*` release gates вище мають пріоритет для Versie 1.
