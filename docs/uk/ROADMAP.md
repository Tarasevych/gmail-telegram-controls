# Дорожня карта

Оновлено: **2026-07-21**. Єдина активна версія: **Versie 1**.

| ID | Статус | Крок | Доказ завершення |
|---|---|---|---|
| B1-01 | Виконано | Відновити v45 source-of-truth і перевірити Git/production | remote правильний; production v37 підтверджено |
| B1-02 | Виконано | Виявити причину подвійних Telegram-карток | знайдено legacy + OAuth подвійне сканування; один trigger підтверджено |
| B1-03 | Виконано локально | Дедуплікація owner mailbox, avatar, прямий OAuth старт, stale account count | локальні контракти пройшли |
| B1-04 | Виконано локально | Neutral GitHub OAuth callback із credentialless POST до Apps Script | query очищається до передачі; one-use user/chat/zone state; Google multi-login cookies не надсилаються |
| B1-05 | Виконано | Зберегти новий redirect URI в Google OAuth client | `OAuth client saved`; точний URI прочитано назад |
| B1-06 | Виконано | Credentialless OAuth relay та послідовні immutable v41/v42 | stable v42, staging 0, точний v41 rollback |
| B1-07 | Не перевірено | Додати новий контрольний Gmail-акаунт через fresh OAuth flow | наявні підключення працюють; новий account choice/consent/callback не виконувався під час E4/E5 |
| B1-08 | Виконано production для owner lane | Повний real-time acceptance у @TarasevychGmailNotifierBot | stable v55 автоматично доставив одну картку; два `/check` не створили дубль; exact-marker count лишився 1 |
| B1-09 | Виконано | Promote, cleanup, production Web App menu | stable v55, staging 0, legacy staging 0, journal `cleaned`; menu відкриває neutral GitHub Pages bridge |
| B1-10 | Виконано | Оновити UK/EN docs, commit і push | postmortem та lessons опубліковано у c98e69e; три documentation Actions пройшли; release tag лишається gated B1-07/B1-08 |

| B1-11 | Виконано production | Відокремити realtime delivery від frozen backlog і запускати її перед maintenance | bounded recent-window lane stable v55 доставила контрольний лист перед backlog maintenance |
| B1-12 | Частково перевірено staging | Агрегувати всі notification accounts в один фізичний Telegram-потік з account identity та account-scoped діями | три ізольовані account roots і one-click switch перевірені; незалежний live fan-out із другого акаунта ще не доведено |

## Правило руху

Versie 2 не відкривається без точного owner-наказу `Next Versie authorization: yes, Versie 2`. До такого наказу всі дозволені зміни лишаються в активній лінії Versie 1, але жоден уже створений immutable Apps Script artifact не переписується. Нові проблеми отримують `GT-*` у [ISSUES.md](ISSUES.md).

## Кумулятивна дослідницька roadmap

Довгострокові report-derived етапи, залежності й evidence gates містяться в [Master Roadmap](knowledge-hub/MASTER_ROADMAP.md). Поточні `B1-*` release gates вище мають пріоритет для Versie 1.

## Verification gate

`VR-001` завершив repository/test-класифікацію 245/245 `KH-*` claims: [звіт](verification-reports/reports/VR-001/README.md). E4/E5 для наявного owner connection і promotion v55 тепер доведені; B1-07 fresh OAuth та B1-12 second-account fan-out не закриваються цими доказами. Поточне продовження: `REQ-0018`.

### B1-13 — Ізоляція конкурентного Gmail OAuth refresh

- **Статус:** розгорнуто у stable v55; concurrency перевірено детермінованими локальними тестами.
- **Результат:** для кожного Gmail-з’єднання застосовано короткий ScriptLock лише на claim/commit/release та lease у protected Script Properties; HTTP refresh виконується поза lock.
- **Інваріанти:** активний lease не допускає другого provider fetch; перед commit повторно перевіряються connection ID, email, token generation і поточний token record; помилка звільняє власний lease без зміни захищеного токена.
- **Доказ:** детерміновані локальні тести та candidate hash pin для поточної Versie 1.
- **Source request:** REQ-0015.
- **Production evidence:** immutable v55, E4/E5 та cleanup пройдено; примусовий live token refresh і fresh OAuth цикл не виконувалися.

### B1-14 — Безконфліктне поєднання bridge і продукту

- **Статус:** виконано.
- **Результат:** bridge-only PR #2 (`a7df53c`) і product PR #1 (`ee9286e`) злиті normal merge; `delete/modify` конфлікт вирішено збереженням перевіреного bridge з `main`.
- **Без втрат:** product fixes, immutable history і rollback v50 збережені; obsolete bridge deletion не переносилася.

### B1-15 — Cold-start і production observability

- **Статус:** в роботі.
- **GT-021:** перше відкриття Web App інколи потребує refresh після тривалого skeleton.
- **GT-022:** `clasp logs` потребує точного підтвердженого GCP project ID; ідентичність не вгадувати.

### B1-16 — Timer runtime budget і URLFetch quota isolation

- **Статус:** candidate Versie 1; production root cause перевірено, release gates очікуються.
- **GT-023:** один хвилинний trigger запускав новий worker до завершення попереднього 80–106-секундного виконання; щохвилинний all-account Gmail History fan-out вичерпав денну квоту `URLFETCH`.
- **Зміна:** content-free timer slots у Script Properties, атомарні лише під коротким ScriptLock; worker cadence 150 секунд, realtime лишається першим, повний History backfill не частіше одного разу на 15 хвилин.
- **Без зміни:** trigger лишається єдиним і хвилинним; Gmail records, OAuth tokens, Telegram zones і листи не мутуються.
- **Gates:** regression/full tests, hash-pinned PreflightOnly, staging E4 і production E5 після відновлення зовнішньої квоти.
- **Source request:** REQ-0018.

### B1-17 — Google primary-source gate і publication surfaces

- Перед змінами Gmail/Apps Script читати канонічні Advanced Gmail Service та Advanced Google services сторінки й фіксувати дату/рішення.
- GitHub лишається канонічним code/history repository; Apps Script — runtime; Developer Profile — discovery-індекс, а не Git mirror.
- CI має тестувати LF/CRLF-стабільний evidence hash до перевірки factual verification reports.
- **Статус:** tooling/docs candidate; Gmail runtime і Versie не змінено.
- **Джерело:** `REQ-0021`.

### B1-18 — Connection-scoped metadata transport

- **GT-025:** усунути hardcoded Apps Script owner token у parallel `threads.get` metadata.
- Зберегти direct Gmail API для зовнішніх OAuth connections; Advanced Gmail Service оцінювати лише як окремий owner-lane adapter.
- Наступний quota-reduction spike: один Gmail HTTP batch із fail-closed multipart/Content-ID parser та без змішування connection tokens.
- **Статус:** source candidate; live staging/production `unverified`.
- **Джерело:** `REQ-0021`.
