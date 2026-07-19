# Історія

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [English](../../en/knowledge-hub/README.md)

> Чернетка knowledge hub. Усі твердження походять лише із санітизованих екстракцій звітів, не перевірені незалежно й не доводять live deployment або поточний стан.

Хронологія описує лише послідовність report artifacts.

| Sequence | Scope | Status interpretation |
|---:|---|---|
| 1 | R1: neuroinclusive email product research | report-derived research baseline |
| 2 | R2: open mail core, standards, integrations, security, and scale | retained background and alternative platform scope |
| 3 | R3: Gmail/Apps Script/Telegram hybrid delivery program | explicitly named primary technical foundation; live state remains unverified |

## Historical artifacts

| Canonical ID | Нормалізоване твердження | Source IDs | Lifecycle | Implementation | Конфлікти | Gate |
|---|---|---|---|---|---|---|
| KH-HIS-001 | Вбудовані маркери виду `turn...view/search` є технічними provenance-посиланнями, які потрібно окремо розв'язати під час міграції. | [R1-064](sources/REPORT-1.md#source-items) | historical | unknown | none | Підтвердити артефакт, commit/deployment/checkpoint і поточну релевантність. |
| KH-HIS-002 | Не класифікувати EmailEngine як FOSS: звіт описує його як колишній open-source, нині source-available/commercial unified email layer. | [R2-045](sources/REPORT-2.md#source-items) | superseded | unknown | none | Підтвердити артефакт, commit/deployment/checkpoint і поточну релевантність. |
| KH-HIS-003 | Mailparser позначено maintenance mode/legacy choice; для нових проєктів рекомендовано PostalMime. | [R2-047](sources/REPORT-2.md#source-items) | superseded | unknown | none | Підтвердити артефакт, commit/deployment/checkpoint і поточну релевантність. |
| KH-HIS-004 | Робота продовжується з наявного ядра в `[PRIVATE]`, а не з порожнього стану. | [R3-001](sources/REPORT-3.md#source-items) | current | implemented | none | Підтвердити артефакт, commit/deployment/checkpoint і поточну релевантність. |
| KH-HIS-005 | `gmail-telegram-v45-gentle-milestones` визначено поточним базовим артефактом. | [R3-002](sources/REPORT-3.md#source-items) | current | implemented | none | Підтвердити артефакт, commit/deployment/checkpoint і поточну релевантність. |
| KH-HIS-006 | `gmail-telegram-v44-co-processing`, `gmail-telegram-notifier` та інші release lines збережено як попередній досвід. | [R3-003](sources/REPORT-3.md#source-items) | historical | implemented | none | Підтвердити артефакт, commit/deployment/checkpoint і поточну релевантність. |

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
