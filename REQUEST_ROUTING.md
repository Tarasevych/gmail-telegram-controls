# Маршрутизація запитів / Request routing

<!-- lang:uk -->
## Українською

## Розподіл відповідальності

| Контур | Що зберігає | Коли оновлюється |
|---|---|---|
| `Запити` | очищена історія кожного проєктного звернення, його частини, маршрути, статус і докази | завжди, до виконання і після нього |
| `Інструкції` | постійні правила процесу, порядку роботи та контролю | лише коли запит установлює або змінює правило |
| `Повноваження` | лише прямо надані, змінені, обмежені або відкликані дозволи | лише за явним формулюванням власника |
| Активна Versie | план, проблеми, документація та код продукту | лише коли відповідна частина запиту стосується продукту |
| `main` / release | підтверджений публічний стан | лише після належного acceptance і прямого release-рішення |

## Алгоритм

1. До виконання створити `REQ-ID` у `Запити`.
2. Розбити повідомлення на окремі логічні директиви.
3. Для кожної директиви визначити класифікацію, destination і дію.
4. Якщо текст не дає повноваження прямо, маршрут `permissions` має бути `no-change` або `reference`.
5. Опублікувати запис зі статусом `recorded`.
6. Змінити тільки зазначені контури, додаючи `Source request: REQ-NNNN`.
7. Повернутися до `Запити` та додати status і evidence.
8. Старі записи не переписувати заднім числом: замінені рішення позначати `superseded` і зв'язувати з новим ID.

## Machine contract для Routes

| Key | Дозволені values |
|---|---|
| `requests` | `record` |
| `instructions` | `update`, `reference`, `no-change` |
| `permissions` | `update`, `reference`, `no-change` |
| `plan` | `update`, `reference`, `no-change` |
| `product` | `update`, `reference`, `no-change` |
| `release` | `update`, `reference`, `no-change` |

Parser трактує поле як множину `key=value`, а не як один крихкий regex-рядок. Unknown, missing, duplicate keys і invalid values мають окрему diagnostic; невідома семантика не приймається автоматично.

Запит на виправлення, тест, продовження або публікацію змін сам по собі не дозволяє нову Versie. Для цього потрібен прямий наказ і `Next Versie authorization: yes, Versie N`.

<!-- lang:en -->
## English

## Separation of responsibility

| Area | What it stores | When it changes |
|---|---|---|
| `Запити` | sanitized history of every project request, its parts, routes, status, and evidence | always, before and after execution |
| `Інструкції` | standing process, workflow, and control rules | only when a request establishes or changes a rule |
| `Повноваження` | only explicitly granted, changed, narrowed, or revoked authority | only from explicit owner wording |
| Active Versie | product plan, issues, documentation, and code | only when the applicable request part concerns the product |
| `main` / release | verified public state | only after proper acceptance and an explicit release decision |

## Algorithm

1. Create a `REQ-ID` on `Запити` before execution.
2. Split the message into separate logical directives.
3. Assign each directive a classification, destination, and action.
4. If the text does not explicitly grant authority, the `permissions` route is `no-change` or `reference`.
5. Publish the record with `recorded` status.
6. Change only the declared areas and add `Source request: REQ-NNNN`.
7. Return to `Запити` and add status and evidence.
8. Never rewrite old records retroactively: mark replaced decisions `superseded` and link the new ID.

## Routes machine contract

| Key | Allowed values |
|---|---|
| `requests` | `record` |
| `instructions` | `update`, `reference`, `no-change` |
| `permissions` | `update`, `reference`, `no-change` |
| `plan` | `update`, `reference`, `no-change` |
| `product` | `update`, `reference`, `no-change` |
| `release` | `update`, `reference`, `no-change` |

The parser treats the field as a `key=value` set rather than one brittle regex string. Unknown, missing, and duplicate keys and invalid values receive separate diagnostics; unknown semantics never pass automatically.

A request to fix, test, continue, or publish changes does not by itself authorize a new Versie. That requires a direct order and `Next Versie authorization: yes, Versie N`.
