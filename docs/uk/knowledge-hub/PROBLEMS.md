# Проблеми та ризики

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [English](../../en/knowledge-hub/README.md)

> Чернетка knowledge hub. Усі твердження походять лише із санітизованих екстракцій звітів, не перевірені незалежно й не доводять live deployment або поточний стан.

Підтверджені product problems і unverified audit risks не змішуються.

| Canonical ID | Нормалізоване твердження | Source IDs | Lifecycle | Implementation | Конфлікти | Gate |
|---|---|---|---|---|---|---|
| KH-ISS-001 | Пошта створює потік мікрорішень, перемикань, часових оцінок і соціального тиску; РДУГ та депресія можуть перетворити це на параліч запуску. | [R1-001](sources/REPORT-1.md#source-items) | current | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-002 | Пуші, бейджі, банери й інші переривання можуть погіршувати фокус і самі бути частиною проблеми. | [R1-013](sources/REPORT-1.md#source-items) | current | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-003 | Червоні лічильники, агресивні нагадування, публічні streaks і осудлива мова можуть посилювати уникання та шкодити adoption і retention. | [R1-020](sources/REPORT-1.md#source-items) | current | unknown | CF-005 | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-004 | AI-summary може бути неточним або зазнавати prompt injection через поштовий контент. | [R1-032](sources/REPORT-1.md#source-items) | current | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-005 | Перегейміфікація може стимулювати імпульсивне використання без довгострокової користі. | [R1-059](sources/REPORT-1.md#source-items) | proposed | unknown | CF-005 | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-006 | `AI overreach`: summary без цитат, непрозора логіка й автоматичні дії без підтвердження. | [R1-060](sources/REPORT-1.md#source-items) | proposed | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-007 | Low-energy mode провалиться, якщо не деградує до справді простого режиму. | [R1-061](sources/REPORT-1.md#source-items) | proposed | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-008 | Складна автентифікація, довгий onboarding і повторне введення даних створюють приховані бар'єри. | [R1-062](sources/REPORT-1.md#source-items) | proposed | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-009 | Basic auth не слід вважати надійним шляхом для Google/Microsoft; modern auth треба врахувати в onboarding, account linking і support. | [R2-011](sources/REPORT-2.md#source-items) | current | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-010 | Єдиного офіційного Telegram × Gmail API немає; bridge треба компонувати з незалежних Telegram і Google interfaces. | [R2-029](sources/REPORT-2.md#source-items) | current | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-011 | Postfix/Dovecot FTS часто потребує окремого Solr або Flatcurve/Xapian design; Stalwart моделює search як окремий native store. | [R2-055](sources/REPORT-2.md#source-items) | current | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-012 | Dovecot CE + `dsync` не дорівнює готовому cluster control plane; HA/multi-region roadmap може схилити вибір до Stalwart/unified stack. | [R2-057](sources/REPORT-2.md#source-items) | current | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-013 | Паралельний token refresh може спричинити race condition без lock. | [R3-046](sources/REPORT-3.md#source-items) | current | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-014 | Overbroad Gmail scope створює risk verification failure і збільшує blast radius; фактичний defect не підтверджено. | [R3-057](sources/REPORT-3.md#source-items) | unverified | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-015 | Необроблене logging зовнішніх responses може розкрити token або private mail content; фактичний випадок не підтверджено. | [R3-059](sources/REPORT-3.md#source-items) | unverified | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-016 | Очікуваний risk: external URL без whitelist/validation. | [R3-063](sources/REPORT-3.md#source-items) | unverified | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-017 | Очікуваний risk: unescaped HTML або user-generated strings. | [R3-064](sources/REPORT-3.md#source-items) | unverified | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-018 | Очікуваний risk: весь task state в одному large JSON blob у `PropertiesService`. | [R3-065](sources/REPORT-3.md#source-items) | unverified | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-019 | Очікуваний risk: inbox labels як єдине source of truth. | [R3-066](sources/REPORT-3.md#source-items) | unverified | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-020 | Очікуваний risk: secrets у `Logger.log()` або `console.log()`. | [R3-067](sources/REPORT-3.md#source-items) | unverified | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-021 | Очікуваний risk: one-shot polling loop, який мовчки завершується через execution limit. | [R3-068](sources/REPORT-3.md#source-items) | unverified | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-022 | Очікуваний risk: overly broad OAuth consent surface. | [R3-069](sources/REPORT-3.md#source-items) | unverified | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |
| KH-ISS-023 | Очікуваний risk: webhook без replay protection. | [R3-070](sources/REPORT-3.md#source-items) | unverified | unknown | none | Відтворити або підтвердити доказами; гіпотетичний ризик не називати дефектом. |

## Confirmed versus hypothetical

Жодного repository defect звіт не підтверджує. Наступні audit risks є expected/unverified: KH-ISS-014, KH-ISS-015, KH-ISS-016, KH-ISS-017, KH-ISS-018, KH-ISS-019, KH-ISS-020, KH-ISS-021, KH-ISS-022, KH-ISS-023.

Blocked repository audit: KH-PLAN-036.

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
