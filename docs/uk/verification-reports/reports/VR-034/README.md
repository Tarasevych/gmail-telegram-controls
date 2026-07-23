# VR-034 — E-05 Семантика списку, мультивибір і deterministic activation

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-062`, `B1-42`, `RCA-015`
- **English mirror:** [VR-034](../../../../en/verification-reports/reports/VR-034/README.md)

## Атомарні твердження

| Твердження | Категорія | Статус | Походження |
|---|---|---|---|
| Непрочитаний рядок має не лише колір/вагу, а й текст `Непрочитаний лист` у accessible name | Доступність | `VERIFIED` | `apps-script/MailApp.html`; E-05 contract |
| Checkbox і `Space` перемикають selection без route/open/`markRead`; `Enter` та single click відкривають лист | Interaction | `VERIFIED` | behavioral keyboard contract |
| Однаковий click/double-click під час чинного open promise або в межах 650 мс запускає лише один route/open | Дедуплікація | `VERIFIED` | synthetic single-flight assertion |
| Selection key містить exact `accountId:threadId`, а namespace походить із current account/shared context і mailbox view | Ізоляція | `VERIFIED` | executable selection model |
| Background keyed reconciliation оновлює checkbox state та відновлює row/checkbox focus anchor без повного list remount | Стабільність UI | `VERIFIED` | source contract |
| Bulk action виконується послідовно, передає exact thread `connectionId`, не використовує `Promise.all` і fail-closed понад 50 листів | Безпека мутацій | `VERIFIED` | E-05 bulk contract |
| Mouse/touch/keyboard і 0/1/50/500-row поведінка пройшла native Telegram Desktop/WebView acceptance | Runtime | `UNVERIFIED` | Shared Apps Script URL Fetch quota; staging `0` |

## Перевірки

- Focused E-05 contracts: `4/4`.
- Повний Apps Script suite: `623/623`.
- Тести використовують лише synthetic account/thread IDs; реальні листи, Gmail labels, tokens, OAuth, staging і production не змінювалися.

## Висновок і межі

- Source defect підтверджено й виправлено в cumulative Versie 1 source без створення нового immutable release.
- Status `PARTIAL`: source/tests доказові, але native acceptance та performance для 500 rows лишаються `UNVERIFIED` до відновлення shared quota.
- Production лишається v65, staging `0`; immutable v70 не переписано.
