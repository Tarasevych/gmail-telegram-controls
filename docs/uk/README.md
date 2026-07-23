# Gmail Telegram Controls: путівник проєкту

Поточна продуктова версія в роботі: **Versie 1 · 2026-07-19**.

Цей каталог є коротким входом у проєкт. Остання стаття випуску є кумулятивною: вона пояснює весь шлях, поточний стан, відомі проблеми та перевірені рішення, тому для відновлення роботи не потрібно перечитувати всі старі матеріали.

## Постійні файли

- [Актуальний runtime/release стан](CURRENT_STATE.md): єдине mutable джерело поточного production, candidate і staging status.
- [Версіонування](VERSIONING.md): послідовні номери Versie, незмінні релізи, гілки й теги.
- [Проєкт та очікування](PROJECT.md): мета, межі, критерії якості й захист даних.
- [Дорожня карта](ROADMAP.md): виконано, виконується, заблоковано, далі.
- [Реєстр проблем](ISSUES.md): короткі `GT-*` записи зі статусами та цільовими Versie.
- [Реєстр помилок і першопричин](ERROR_RCA_REGISTRY.md): активний причинний індекс, актуальність і правила запобігання.
- [Запобігання помилкам агента](AGENT_FAILURE_PREVENTION.md): recovery, leases, evidence, CI та immutable-release gates без розширення повноважень.
- [Первинні джерела Gmail](GMAIL_PRIMARY_SOURCES.md): обов'язковий source gate і межі GitHub, Apps Script та Google Developer Profile.
- [Двомовна документація](BILINGUAL_DOCUMENTATION.md): обов'язкові українська й англійська пари та CI-перевірка.
- [Postmortem доставки v42-v55](POSTMORTEM.md): архітектура, підтверджені root causes, межі доказів і стійкі інваріанти.
- [Звіт автономної нічної роботи 2026-07-21](reports/AUTONOMOUS_NIGHT_2026-07-21.md): докази завершення, runtime/release blockers, crash reports і точна recovery action.
- [Versie 1 · 2026-07-19](releases/VERSIE-001-2026-07-19.md): повна кумулятивна історія та release gates.

English mirror: [docs/en/README.md](../en/README.md).

## Джерела доказів

- Код і локальні контракти: `apps-script/`.
- Історичні аудити: `docs/audit/`.
- Історичні продуктові рішення: `docs/product/`.
- Операційні записи: `docs/operations/`.
- Активний журнал дослідження: `deep-research-report3.md`.

Секрети, OAuth-коди, токени, cookies, приватні листи, refresh tokens і deployment-local конфігурація не належать до Git.

Кожна сторінка в `docs/uk/` має парну сторінку з тим самим шляхом у `docs/en/`. Створення або зміна лише однієї мови блокується автоматичною перевіркою.

## Структурований knowledge hub

- [Почати з індексу](knowledge-hub/README.md)
- [Кумулятивна master roadmap](knowledge-hub/MASTER_ROADMAP.md)
- [Traceability 295 source items](knowledge-hub/TRACEABILITY.md)

Для routine-продовження не перечитуйте три великі deep-research reports. Відкривайте індекс і лише потрібний тематичний реєстр.
