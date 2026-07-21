# Дозволи та privacy references

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [English](../../en/knowledge-hub/README.md)

> Чернетка knowledge hub. Усі твердження походять лише із санітизованих екстракцій звітів, не перевірені незалежно й не доводять live deployment або поточний стан.

> Ця сторінка є лише candidate/reference index. Вона не створює authority, grants або consent. Кожен запис вимагає reconciliation з canonical permission branch.

## Explicit-owner-quote evidence

| Report | Evidence | Disposition |
|---|---|---|
| R1 | none detected | canonical reconciliation required |
| R2 | none detected | canonical reconciliation required |
| R3 | none detected | canonical reconciliation required |

## Permission candidates

| Canonical ID | Нормалізоване твердження | Source IDs | Lifecycle | Implementation | Конфлікти | Gate |
|---|---|---|---|---|---|---|
| KH-PERM-001 | Високоризикові дії допускаються лише після explicit user confirmation; це запропонований permission gate, а не наданий дозвіл. | [R1-034](sources/REPORT-1.md#source-items) | proposed | planned | none | Потрібні canonical branch reconciliation, явна owner quote, scope, строк і revocation path. |
| KH-PERM-002 | Майбутній Telegram surface має дозволяти лише явно обрані дії: priority view, summary, quick reply, task confirmation, snooze і triage; це product-scope candidate, не дозвіл власника. | [R2-032](sources/REPORT-2.md#source-items) | proposed | planned | none | Потрібні canonical branch reconciliation, явна owner quote, scope, строк і revocation path. |
| KH-PERM-003 | Browser/CDP/runtime tools можна розглядати лише після перевірки capability та permissions; це не наданий owner permission. | [R3-030](sources/REPORT-3.md#source-items) | proposed | unknown | none | Потрібні canonical branch reconciliation, явна owner quote, scope, строк і revocation path. |

## Privacy constraints as references

Ці записи є recommendations/constraints, не дозволами.

| Canonical ID | Нормалізоване твердження | Source IDs | Lifecycle | Implementation | Конфлікти | Gate |
|---|---|---|---|---|---|---|
| KH-PRV-001 | Звіт описує AI-обробку поштового контенту, але не специфікує retention, data minimization, encryption, provider boundaries або видалення даних. | [R1-065](sources/REPORT-1.md#source-items) | unverified | unknown | none | Виконати privacy/security review, data-flow map, lawful-basis і retention gates. |
| KH-PRV-002 | GDPR/ePrivacy controls мають включати encryption, access control, audit logs, minimization, contracts, retention, export/delete, breach response і residency. | [R2-039](sources/REPORT-2.md#source-items) | proposed | planned | none | Виконати privacy/security review, data-flow map, lawful-basis і retention gates. |
| KH-PRV-003 | Open tracking не вмикати за замовчуванням для EU-sensitive use cases; додати legal gating, preference center, granular opt-in і розділення delivery/marketing telemetry. | [R2-041](sources/REPORT-2.md#source-items) | proposed | planned | none | Виконати privacy/security review, data-flow map, lawful-basis і retention gates. |
| KH-PRV-004 | Least privilege, чіткі межі даних, мінімальне вилучення body та раннє планування verification boundary є архітектурними вимогами. | [R3-042](sources/REPORT-3.md#source-items), [R3-102](sources/REPORT-3.md#source-items) | proposed | planned | none | Виконати privacy/security review, data-flow map, lawful-basis і retention gates. |
| KH-PRV-005 | Credentials не зберігати в коді; secrets тримати у properties або external vault; logs редагувати щодо addresses, headers і token fragments. | [R3-047](sources/REPORT-3.md#source-items) | proposed | planned | none | Виконати privacy/security review, data-flow map, lawful-basis і retention gates. |

## Reconciliation gate

1. Зіставити source candidate з canonical permission branch.
2. Отримати явну owner quote для конкретної дії та scope.
3. Зафіксувати строк, revocation, confirmation boundary і audit evidence.
4. До завершення gate вважати authority відсутньою.

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.

## Канонічний статус

Ця сторінка не надає дозволів. Єдиним джерелом чинних дозволів є гілка [Повноваження](https://github.com/Tarasevych/gmail-telegram-controls/tree/%D0%9F%D0%BE%D0%B2%D0%BD%D0%BE%D0%B2%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F); report-derived candidates потребують окремого прямого рішення власника.
