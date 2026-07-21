# VR-002: factual verification доставки Gmail у Telegram

[Індекс](../../INDEX.md) | [Схема](../../REPORT_SCHEMA.md) | [English](../../../../en/verification-reports/reports/VR-002/README.md)

Маркер схеми перевірки: `REQ-0004`. Джерело звіту: `REQ-0009`. Baseline: [Versie 1 `f96d8f0`](https://github.com/Tarasevych/gmail-telegram-controls/tree/f96d8f0) та production Apps Script immutable v42.

## Межі

Перевірка використовувала один контрольний self-test лист, owner-команди `/status` і `/check`, read-only deployment/webhook inspection та статичний аналіз поточного source. Випадкові листи не змінювалися. OAuth consent для іншого користувача не проходився.

## Атомарні твердження

| Claim | Категорія | Статус | Scope / grade | Твердження і доказ | Залежності / обмеження |
|---|---|---|---|---|---|
| VR2-001 | transport | verified | production E5 | Telegram webhook v42 відповідав на owner-команди; pending updates 0, last error відсутня | Не доводить Gmail delivery |
| VR2-002 | delivery | verified | production E5 negative | Один контрольний новий лист не створив Telegram-картку після minute interval і manual `/check` | Тест доводить збій, не його виправлення |
| VR2-003 | scheduler | verified | source E2 | `checkNewMail_` виконував maintenance перед mail delivery | Виправлення потребує E3/E5 |
| VR2-004 | scanner | verified | source E2 | Frozen scan з незмінним `upperBoundMs` не може побачити лист, створений після початку backlog pass | Frozen scan збережений як recovery/backfill |
| VR2-005 | multi-account | verified | source E2 | Notification fan-out використовує `notificationConnectionIds`, а не лише active UI account, та ізолює connection context | Другий реальний account не прийняв consent |
| VR2-006 | identity | partial | source E2 | Multi-account картка містить email account і callbacks із connection ID; legacy label потребує runtime readback | Не публікувати email/connection IDs |
| VR2-007 | remediation | partial | local source | Versie 1 додає bounded realtime lane, per-connection watermark/retry, shared seen dedupe та delivery-first entry | Local tests і immutable v43 acceptance ще не зафіксовані |
| VR2-008 | OAuth | blocked | production gate | Окремий Gmail account зупинений на новій Google consent конкретного користувача | Не обходити й не змішувати з delivery fix |

## Архітектурний результат

- Один Telegram main chat є canonical «Усі повідомлення».
- Кожна картка створюється фізично один раз; account identity визначає адресу та connection-scoped actions.
- Account roots є фільтрованими context views і не створюють копію тієї самої картки.
- Realtime lane обробляє найновіше bounded-вікно; frozen scan відновлює backlog.
- Active account впливає на UI, але не обмежує notification fan-out.

## Чутливість і обмеження

Токени, IDs, email-вміст, OAuth codes і credential values не внесені. Immutable v43, повний local suite та one-card production acceptance мають бути окремо підтверджені. OAuth іншого Gmail account лишається незалежним manual gate.
