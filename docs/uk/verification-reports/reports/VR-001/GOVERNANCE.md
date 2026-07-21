# VR-001: governance і owner-granted permissions

[Звіт](README.md) | [Усі claims](CLAIMS.md) | [English](../../../../en/verification-reports/reports/VR-001/GOVERNANCE.md)

Source request: `REQ-0004`. Claims: 30. `verified` 0, `contradicted` 0, `partial` 2, `unverified` 1, `blocked` 0, `recommendation` 27.

Жодна report-derived рекомендація не стала standing instruction або owner authority через сам факт повторення. Canonical permission потребує одночасно запису в Повноваження та traceable owner request. P-001-P-004 не мають достатнього REQ-ID provenance; тому вони не отримали verified permission status.

| Claim | Статус | Рівень | Твердження |
|---|---|---|---|
| [KH-INS-001](CLAIMS.md#kh-ins-001) | `recommendation` | `E2` | Інтерфейс повинен мати одну домінантну дію, стабільний контекст, низьку щільність, явний прогрес, зрозумілі пріоритети й точне повернення після переривання. |
| [KH-INS-002](CLAIMS.md#kh-ins-002) | `recommendation` | `E2` | Для кожного листа визначати одну візуально головну наступну дію. |
| [KH-INS-003](CLAIMS.md#kh-ins-003) | `recommendation` | `E2` | Використовувати нейтральну, підтримувальну й неосудливу мову. |
| [KH-INS-004](CLAIMS.md#kh-ins-004) | `recommendation` | `E2` | У фокус-режимі має бути не більше 3-4 первинних дій. |
| [KH-INS-005](CLAIMS.md#kh-ins-005) | `recommendation` | `E2` | WCAG 2.2 слід трактувати як мінімум, а COGA як стандарт якості для структури, фокусу, пам'яті, summaries, персоналізації, human help і контролю переривань. |
| [KH-INS-006](CLAIMS.md#kh-ins-006) | `recommendation` | `E2` | Focus mode має бути окремою інформаційною архітектурою з однією екранною задачею, а не косметичною темою. |
| [KH-INS-007](CLAIMS.md#kh-ins-007) | `recommendation` | `E2` | Система має мінімізувати втрату контексту та зберігати позицію, чернетку, тимчасову класифікацію, останню розмову й проміжні рішення. |
| [KH-INS-008](CLAIMS.md#kh-ins-008) | `recommendation` | `E2` | Персоналізація повинна бути адаптивною, сценарною та поступовою, з простими пресетами замість довгого налаштування. |
| [KH-INS-009](CLAIMS.md#kh-ins-009) | `recommendation` | `E2` | AI-summary має містити джерельні посилання, confidence indication і швидкий перехід до оригіналу. |
| [KH-INS-010](CLAIMS.md#kh-ins-010) | `recommendation` | `E2` | Візуальний режим має використовувати мало кольорів, один акцент, великі targets, видимий focus state і регульовану щільність. |
| [KH-INS-011](CLAIMS.md#kh-ins-011) | `recommendation` | `E2` | Не писати MTA, MDA або groupware з нуля; збирати продукт із готових серверних компонентів. |
| [KH-INS-012](CLAIMS.md#kh-ins-012) | `recommendation` | `E2` | Розділяти transport security, domain authenticity, content protection та abuse/phishing defense; застосувати TLS, MTA-STS, TLS-RPT і за DNSSEC також DANE. |
| [KH-INS-013](CLAIMS.md#kh-ins-013) | `recommendation` | `E2` | Не створювати власний mail server; інвестувати в UX, interoperability, privacy, AI triage та керовані ecosystem integrations. |
| [KH-INS-014](CLAIMS.md#kh-ins-014) | `recommendation` | `E1` | Використовувати logs, checkpoints, audit notes, test trails і lessons learned; не повторювати пройдені стадії без огляду. |
| [KH-INS-015](CLAIMS.md#kh-ins-015) | `recommendation` | `E1` | Послідовність роботи: product core, master prompt, implementation recipe, audit, operational cycle; capabilities перевіряти фактично. |
| [KH-INS-016](CLAIMS.md#kh-ins-016) | `recommendation` | `E1` | Агент має діяти як product architect, Workspace engineer, accessibility researcher, security reviewer і release engineer та створювати technical delivery program. |
| [KH-INS-017](CLAIMS.md#kh-ins-017) | `recommendation` | `E1` | Агент повинен видати секції A-R: architecture, UX, modules, scopes, OAuth, integrations, audit, build/debug/release plans, tests, backlog, patches і fallback paths. |
| [KH-INS-018](CLAIMS.md#kh-ins-018) | `recommendation` | `E1` | Для рекомендацій пояснювати problem, rationale і pitfalls; platform limits називати прямо та давати workaround. |
| [KH-INS-019](CLAIMS.md#kh-ins-019) | `recommendation` | `E2` | Якщо потрібна hybrid architecture з Apps Script, Cloud Run, Pub/Sub і Storage, її слід спроєктувати явно. |
| [KH-INS-020](CLAIMS.md#kh-ins-020) | `recommendation` | `E1` | Не приховувати tradeoffs, уникати vague advice і писати як delivery document для implementation team. |
| [KH-INS-021](CLAIMS.md#kh-ins-021) | `recommendation` | `E1` | Codex має бути керованим technical reviewer і executor verification protocol; browser/CDP/runtime capability підтверджувати перед use. |
| [KH-INS-022](CLAIMS.md#kh-ins-022) | `recommendation` | `E1` | Operational loop має бути mandatory і охоплювати actual UI, runtime та network behavior, а не лише code reading. |
| [KH-PERM-001](CLAIMS.md#kh-perm-001) | `partial` | `E1` | Високоризикові дії допускаються лише після explicit user confirmation; це запропонований permission gate, а не наданий дозвіл. |
| [KH-PERM-002](CLAIMS.md#kh-perm-002) | `recommendation` | `E2` | Майбутній Telegram surface має дозволяти лише явно обрані дії: priority view, summary, quick reply, task confirmation, snooze і triage; це product-scope candidate, не дозвіл власника. |
| [KH-PERM-003](CLAIMS.md#kh-perm-003) | `partial` | `E1` | Browser/CDP/runtime tools можна розглядати лише після перевірки capability та permissions; це не наданий owner permission. |
| [KH-PRV-001](CLAIMS.md#kh-prv-001) | `unverified` | `E0` | Звіт описує AI-обробку поштового контенту, але не специфікує retention, data minimization, encryption, provider boundaries або видалення даних. |
| [KH-PRV-002](CLAIMS.md#kh-prv-002) | `recommendation` | `E2` | GDPR/ePrivacy controls мають включати encryption, access control, audit logs, minimization, contracts, retention, export/delete, breach response і residency. |
| [KH-PRV-003](CLAIMS.md#kh-prv-003) | `recommendation` | `E2` | Open tracking не вмикати за замовчуванням для EU-sensitive use cases; додати legal gating, preference center, granular opt-in і розділення delivery/marketing telemetry. |
| [KH-PRV-004](CLAIMS.md#kh-prv-004) | `recommendation` | `E2` | Least privilege, чіткі межі даних, мінімальне вилучення body та раннє планування verification boundary є архітектурними вимогами. |
| [KH-PRV-005](CLAIMS.md#kh-prv-005) | `recommendation` | `E2` | Credentials не зберігати в коді; secrets тримати у properties або external vault; logs редагувати щодо addresses, headers і token fragments. |
