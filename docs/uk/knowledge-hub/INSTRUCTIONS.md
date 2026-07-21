# Інструкції-кандидати

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [English](../../en/knowledge-hub/README.md)

> Чернетка knowledge hub. Усі твердження походять лише із санітизованих екстракцій звітів, не перевірені незалежно й не доводять live deployment або поточний стан.

Standing-rule candidates із provenance. Це не authority; потрібне canonical branch reconciliation.

| Canonical ID | Нормалізоване твердження | Source IDs | Lifecycle | Implementation | Конфлікти | Gate |
|---|---|---|---|---|---|---|
| KH-INS-001 | Інтерфейс повинен мати одну домінантну дію, стабільний контекст, низьку щільність, явний прогрес, зрозумілі пріоритети й точне повернення після переривання. | [R1-005](sources/REPORT-1.md#source-items) | proposed | planned | CF-001 | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-002 | Для кожного листа визначати одну візуально головну наступну дію. | [R1-014](sources/REPORT-1.md#source-items), [R3-012](sources/REPORT-3.md#source-items) | proposed | planned | CF-001, CF-003 | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-003 | Використовувати нейтральну, підтримувальну й неосудливу мову. | [R1-022](sources/REPORT-1.md#source-items), [R1-027](sources/REPORT-1.md#source-items) | proposed | planned | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-004 | У фокус-режимі має бути не більше 3-4 первинних дій. | [R1-024](sources/REPORT-1.md#source-items) | proposed | planned | CF-001 | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-007 | Система має мінімізувати втрату контексту та зберігати позицію, чернетку, тимчасову класифікацію, останню розмову й проміжні рішення. | [R1-026](sources/REPORT-1.md#source-items) | proposed | planned | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-008 | Персоналізація повинна бути адаптивною, сценарною та поступовою, з простими пресетами замість довгого налаштування. | [R1-028](sources/REPORT-1.md#source-items) | proposed | planned | CF-004 | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-009 | AI-summary має містити джерельні посилання, confidence indication і швидкий перехід до оригіналу. | [R1-033](sources/REPORT-1.md#source-items) | proposed | planned | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-010 | Візуальний режим має використовувати мало кольорів, один акцент, великі targets, видимий focus state і регульовану щільність. | [R1-048](sources/REPORT-1.md#source-items) | proposed | planned | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-005 | WCAG 2.2 слід трактувати як мінімум, а COGA як стандарт якості для структури, фокусу, пам'яті, summaries, персоналізації, human help і контролю переривань. | [R1-073](sources/REPORT-1.md#source-items) | proposed | planned | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-006 | Focus mode має бути окремою інформаційною архітектурою з однією екранною задачею, а не косметичною темою. | [R1-074](sources/REPORT-1.md#source-items) | proposed | planned | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-011 | Не писати MTA, MDA або groupware з нуля; збирати продукт із готових серверних компонентів. | [R2-013](sources/REPORT-2.md#source-items) | proposed | planned | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-012 | Розділяти transport security, domain authenticity, content protection та abuse/phishing defense; застосувати TLS, MTA-STS, TLS-RPT і за DNSSEC також DANE. | [R2-033](sources/REPORT-2.md#source-items) | proposed | planned | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-013 | Не створювати власний mail server; інвестувати в UX, interoperability, privacy, AI triage та керовані ecosystem integrations. | [R2-079](sources/REPORT-2.md#source-items) | proposed | planned | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-014 | Використовувати logs, checkpoints, audit notes, test trails і lessons learned; не повторювати пройдені стадії без огляду. | [R3-004](sources/REPORT-3.md#source-items) | current | unknown | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-015 | Послідовність роботи: product core, master prompt, implementation recipe, audit, operational cycle; capabilities перевіряти фактично. | [R3-009](sources/REPORT-3.md#source-items) | current | unknown | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-016 | Агент має діяти як product architect, Workspace engineer, accessibility researcher, security reviewer і release engineer та створювати technical delivery program. | [R3-022](sources/REPORT-3.md#source-items) | current | unknown | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-017 | Агент повинен видати секції A-R: architecture, UX, modules, scopes, OAuth, integrations, audit, build/debug/release plans, tests, backlog, patches і fallback paths. | [R3-031](sources/REPORT-3.md#source-items) | current | unknown | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-018 | Для рекомендацій пояснювати problem, rationale і pitfalls; platform limits називати прямо та давати workaround. | [R3-032](sources/REPORT-3.md#source-items) | current | unknown | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-021 | Codex має бути керованим technical reviewer і executor verification protocol; browser/CDP/runtime capability підтверджувати перед use. | [R3-072](sources/REPORT-3.md#source-items) | current | unknown | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-022 | Operational loop має бути mandatory і охоплювати actual UI, runtime та network behavior, а не лише code reading. | [R3-080](sources/REPORT-3.md#source-items) | current | unknown | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-019 | Якщо потрібна hybrid architecture з Apps Script, Cloud Run, Pub/Sub і Storage, її слід спроєктувати явно. | [R3-083](sources/REPORT-3.md#source-items) | current | unknown | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |
| KH-INS-020 | Не приховувати tradeoffs, уникати vague advice і писати як delivery document для implementation team. | [R3-085](sources/REPORT-3.md#source-items) | current | unknown | none | Зіставити з canonical instruction/permission branch і отримати явне прийняття власника. |

## Reconciliation

Кандидати набувають сили лише після явного owner adoption у canonical instruction/permission branch.

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.

## Канонічний статус

Ця сторінка маршрутизує report-derived instruction candidates. Чинними правилами вони стають лише після reconciliation у гілці [Інструкції](https://github.com/Tarasevych/gmail-telegram-controls/tree/%D0%86%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D1%96%D1%97).
