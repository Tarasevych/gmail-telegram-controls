# Інструкції власника / Owner instructions

<!-- lang:uk -->
## Українською

Гілка `Інструкції` містить лише постійні нормативні правила проєкту. Вона не є журналом звернень і не зберігає записи запитів. Канонічна історія міститься в [гілці Запити](https://github.com/Tarasevych/gmail-telegram-controls/tree/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8).

## Обов'язковий порядок

1. Оновити remote references для `main`, `Запити`, `Інструкції`, `Повноваження` та активної Versie.
2. У `origin/Запити` прочитати `REQUESTS.md`, `REQUEST_ROUTING.md`, `requests/REQUEST_POLICY.md` і поточний `REQ-ID`.
3. До виконання опублікувати очищений двомовний запис запиту зі статусом `recorded` та маршрутами.
4. Прочитати актуальні `PROJECT`, `ROADMAP`, `ISSUES`, `VERSIONING` і release-статтю активної Versie.
5. У `Повноваження` прочитати індекс і лише релевантний запис. Якщо явного дозволу немає, не створювати його з припущення.
6. Виконати тільки класифіковані частини й змінити лише вказані контури.
7. Після виконання оновити канонічний запис у `Запити` статусом і доказами.

Детальний порядок: [EXECUTION_ORDER.md](instructions/EXECUTION_ORDER.md). Source request: `REQ-0002`.

Для routine-продовження використовуйте [порядок підтримки knowledge hub](instructions/KNOWLEDGE_HUB_MAINTENANCE.md) і читайте лише релевантний тематичний реєстр активної Versie. Source request: `REQ-0003`.

## Заборона несанкціонованої наступної Versie

Поточна робоча версія: **Versie 1**. Наступна Versie, її branch, article, tag, immutable deployment або production release дозволені лише за прямим наказом власника та полем `Next Versie authorization: yes, Versie N` у новому записі `Запити`.

## Повний pre-version аудит

Перед дозволеною наступною Versie прочитати всі tracked Markdown-сторінки актуальних `main`, `Запити`, `Інструкції`, `Повноваження` й активної Versie; звірити Git, deployments, checkpoint, heartbeat і runtime; записати результат до request record до створення release-артефактів.

<!-- lang:en -->
## English

The `Інструкції` branch contains only standing project rules. It is not a request ledger and does not store request records. Canonical history is on the [Запити branch](https://github.com/Tarasevych/gmail-telegram-controls/tree/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8).

## Mandatory order

1. Refresh remote references for `main`, `Запити`, `Інструкції`, `Повноваження`, and the active Versie.
2. On `origin/Запити`, read `REQUESTS.md`, `REQUEST_ROUTING.md`, `requests/REQUEST_POLICY.md`, and the current `REQ-ID`.
3. Before execution, publish a sanitized bilingual request record with `recorded` status and routes.
4. Read the active Versie's current `PROJECT`, `ROADMAP`, `ISSUES`, `VERSIONING`, and release article.
5. On `Повноваження`, read the index and only the relevant record. If authority is not explicit, do not infer it.
6. Execute only the classified parts and change only the declared areas.
7. After execution, update the canonical `Запити` record with status and evidence.

Detailed order: [EXECUTION_ORDER.md](instructions/EXECUTION_ORDER.md). Source request: `REQ-0002`.

For routine continuation, use the [knowledge-hub maintenance order](instructions/KNOWLEDGE_HUB_MAINTENANCE.md) and read only the relevant thematic register on the active Versie. Source request: `REQ-0003`.

## No unauthorized next Versie

The current working release is **Versie 1**. A next Versie, its branch, article, tag, immutable deployment, or production release is allowed only after a direct owner order and `Next Versie authorization: yes, Versie N` in a new `Запити` record.

## Full pre-version audit

Before an authorized next Versie, read every tracked Markdown page from the current `main`, `Запити`, `Інструкції`, `Повноваження`, and active Versie; reconcile Git, deployments, checkpoint, heartbeat, and runtime; record the result before creating release artifacts.