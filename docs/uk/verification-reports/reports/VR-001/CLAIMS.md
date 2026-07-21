# Атомарний реєстр тверджень VR-001

[Звіт](README.md) | [Схема](../../REPORT_SCHEMA.md) | [Політика доказів](../../EVIDENCE_POLICY.md) | [English](../../../../en/verification-reports/reports/VR-001/CLAIMS.md)

Source request: `REQ-0004`. Кожен запис посилається на VR-001, поточний проєкт, точне report-derived походження та первинні Git-докази.

## KH-DEC-001

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Оптимізувати поріг старту та малу наступну дію, а не обсяг обробленої пошти.
- Стан реалізації: implemented_in_tracked_focus_candidate_static_only
- Залежності: Owner-defined outcome criteria; Read-only usability or outcome evidence
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-002](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-062](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Доказ 2: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/docs/design/focus-view-v28-spec.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit introduced Focus View across UI, backend, tests, and specification artifacts.
- Доказ 3: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added energy-aware Focus sessions across implementation, tests, and the product contract.
- Обмеження: Static artifacts verify design and implementation intent, not reduced start friction in use or current runtime behavior.

## KH-DEC-002

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E1`
- Твердження: Мета - функціональний інбокс із низькою виконавчою вартістю, а не Inbox Zero.
- Стан реалізації: implementation_artifacts_present_static_only
- Залежності: Resolution of CF-008; Owner adoption record; Outcome validation
- Конфлікти: CF-008
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-004](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-010](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/product/functional-relief-metrics-v41.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/385f1dc5b2a04091d2bc9c471e52595570c6ee3c/docs/product/functional-relief-metrics-v41.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added functional-relief metric artifacts and changed the Apps Script implementation and static test contracts.
- Обмеження: The immutable commit verifies occurrence of a functional-relief metrics phase, not user benefit, lifecycle supersession, or runtime state.

## KH-DEC-003

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Цифровий сервіс слід позиціонувати як допоміжний інструмент, а не заміну лікуванню або клінічну систему.
- Стан реалізації: no_explicit_clinical_positioning_policy_found
- Залежності: Owner-approved product positioning; Legal or clinical review if health claims are introduced
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-025](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Обмеження: The inspected release and implementation artifacts define a mail client but do not establish an explicit clinical disclaimer; absence in Git does not prove external positioning.

## KH-DEC-004

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: AI має оркеструвати тертя, енергію, час, сором і незавершений контекст, а не бути лише summarizer.
- Стан реалізації: partially_aligned_without_ai_orchestration
- Залежності: Explicit AI architecture decision; Privacy and safety review; User outcome validation
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-029](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Доказ 2: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added energy-aware Focus sessions across implementation, tests, and the product contract.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; The backend contains bounded attention and mail workflows, but no general AI orchestration layer was identified.
- Обмеження: The tracked summary is documented as local heuristic processing rather than a generative model; no runtime or user-outcome proof was permitted.

## KH-DEC-005

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E1`
- Твердження: Функціональне полегшення важливіше за vanity KPI на кшталт кількості прочитаних листів.
- Стан реалізації: functional_relief_metric_artifacts_present
- Залежності: Owner-approved metric definitions; Privacy-preserving outcome validation
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-058](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/product/functional-relief-metrics-v41.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/385f1dc5b2a04091d2bc9c471e52595570c6ee3c/docs/product/functional-relief-metrics-v41.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added functional-relief metric artifacts and changed the Apps Script implementation and static test contracts.
- Обмеження: Commit evidence verifies that metrics artifacts were added, not metric validity, collection, or production use.

## KH-DEC-006

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: Будувати продукт на відкритих стандартах і готовому open-source mail core; диференціюватися власними UI, AI та integration API.
- Стан реалізації: not_implemented_in_current_gmail_apps_script_scope
- Залежності: Resolution of CF-006; Owner architecture decision; Mail-core selection and migration plan
- Конфлікти: CF-006
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; The primary backend is Gmail/Apps Script/Telegram. Static inspection found no Mailcow, Stalwart, Postfix, or Dovecot implementation symbols in the inspected source bundle.
- Обмеження: Repository scope can establish the tracked architecture but not the absence of an external untracked service at runtime.

## KH-DEC-007

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: Обирати Stalwart + власний web/mobile UX для modern-first B2C/B2B, Mailcow + custom frontend/BFF для швидкого MVP; orchestration layer лишати власним.
- Стан реалізації: not_implemented_in_current_gmail_apps_script_scope
- Залежності: Resolution of CF-006; Owner platform selection; Operations capability assessment
- Конфлікти: CF-006
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-006](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No Stalwart, Mailcow, or custom BFF implementation was identified in the inspected tracked backend.
- Обмеження: This verifies only the repository implementation scope, not external infrastructure.

## KH-DEC-008

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: Не замінювати всі протоколи одним; застосувати fan-in/fan-out з одночасною підтримкою legacy і modern interfaces.
- Стан реалізації: partially_implemented_at_interface_compatibility_level
- Залежності: Defined protocol scope; Architecture decision record
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-008](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; The tracked backend supports native Telegram callbacks, a Mini App, and legacy-card compatibility, but no general mail-protocol fan-in/fan-out layer was identified.
- Обмеження: Interface compatibility is not equivalent to protocol-level fan-in/fan-out, and runtime compatibility was not tested.

## KH-DEC-009

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: low
- Scope і рівень: `repository` / `E2`
- Твердження: Для найкращого MVP time-to-value обрати Mailcow.
- Стан реалізації: not_implemented
- Залежності: Comparative platform evaluation; Owner platform decision
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-020](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No Mailcow implementation reference was found in the inspected tracked implementation; the active line is Gmail/Apps Script.
- Обмеження: The comparative time-to-value assertion requires a primary benchmark; repository inspection cannot verify it.

## KH-DEC-010

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: low
- Scope і рівень: `repository` / `E2`
- Твердження: Для modern-first продукту обрати Stalwart через native JMAP/DAV та API-first configuration/control plane.
- Стан реалізації: not_implemented
- Залежності: Upstream capability verification; Owner platform decision
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-021](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No Stalwart or JMAP/DAV implementation reference was found in the inspected tracked implementation.
- Обмеження: No external upstream verification was performed; the recommendation is outside the current Gmail-centric implementation.

## KH-DEC-011

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: low
- Scope і рівень: `repository` / `E2`
- Твердження: Для довгого корпоративного маршруту з максимальною контрольованістю розглядати Postfix + Dovecot, якщо є сильна ops-команда.
- Стан реалізації: not_implemented
- Залежності: Enterprise scope decision; Operations staffing assessment
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-022](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No Postfix or Dovecot implementation reference was found in the inspected tracked implementation.
- Обмеження: The operational tradeoff is not testable from this repository and no external benchmark was inspected.

## KH-DEC-012

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Apps Script використовувати як адаптер і control plane, а не повний data plane; важкі операції виносити назовні.
- Стан реалізації: contradicted_by_tracked_architecture
- Залежності: Owner architecture decision; External worker and data-plane design
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-028](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-026](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-114](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Apps Script owns polling, Telegram webhook setup, notification state, Telegram delivery, and Gmail operations.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; MailClient.gs is explicitly the authenticated Gmail RPC backend and owns sessions, provider connections, drafts, mailbox actions, and attachment workflows.
- Доказ 3: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Static audit-record inspection only; runtime assertions in the audit were not accepted without independent proof.; The audit labels the control/data split partial and says no active durable worker layer exists.
- Обмеження: Static code establishes the tracked architecture only; no runtime deployment was inspected.

## KH-DEC-013

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Базовий bridge будувати як Telegram Bot API + Mini App + власний backend + Gmail API; TDLib/user-account flow використовувати лише свідомо.
- Стан реалізації: partially_implemented_with_apps_script_backend
- Залежності: Resolution of CF-002; Authentication architecture decision
- Конфлікти: CF-002
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-030](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Static code implements Telegram Bot API webhook/menu operations and Gmail operations in Apps Script.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; Static code implements the authenticated Telegram Mini App mailbox backend; no TDLib flow was identified.
- Доказ 3: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Обмеження: The repository supports the Bot API and Mini App portions but does not evidence a separate external proprietary backend or runtime authentication state.

## KH-DEC-014

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: low
- Scope і рівень: `repository` / `E2`
- Твердження: Для нових систем ставити Rspamd primary filter; SpamAssassin лишати для compatibility/legacy випадків.
- Стан реалізації: not_applicable_to_current_gmail_managed_filtering_scope
- Залежності: Self-hosted mail-core decision; Spam-filter evaluation
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-036](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No Rspamd or SpamAssassin implementation reference was found in the inspected tracked backend.
- Обмеження: Gmail-managed spam behavior and any external filtering service were not inspected at runtime.

## KH-DEC-015

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: MIME/PGP/S/MIME та E2E тримати окремим замінним capability layer і не включати до MVP без потреби.
- Стан реалізації: partially_aligned_by_exclusion_without_capability_layer
- Залежності: Encryption scope decision; Threat model and interoperability requirements
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-038](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-048](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; The tracked client contains MIME attachment handling, but no separate PGP, S/MIME, or E2E capability layer was identified.
- Обмеження: Static absence supports only that these capabilities are not tracked in the inspected implementation; it does not verify external or runtime capabilities.

## KH-DEC-016

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: low
- Scope і рівень: `repository` / `E2`
- Твердження: DAV strategy: integrated DAV/JMAP у Stalwart/Cyrus або окремий Radicale/Baïkal/SabreDAV; у Mailcow роль виконує SOGo.
- Стан реалізації: not_implemented
- Залежності: Calendar/contact scope; Platform selection
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-042](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No DAV, JMAP, Radicale, Baikal, SabreDAV, or SOGo implementation reference was found in the inspected tracked backend.
- Обмеження: No upstream product verification or external infrastructure inspection was performed.

## KH-DEC-017

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: Побудувати єдиний integration facade над Gmail API, Microsoft Graph, Google People/Calendar та Telegram APIs замість provider logic у frontend.
- Стан реалізації: partially_implemented_as_backend_specific_integrations
- Залежності: Provider scope decision; Facade contract
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-044](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Gmail and Telegram operations are server-side in Apps Script.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; The backend contains Gmail and Box-specific provider logic; no Microsoft Graph or Google People facade was identified.
- Доказ 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Test source was inspected but not run; this is E2, not E3.; The static test contract explicitly checks that Calendar handoff remains calendar-scope free.
- Обмеження: No runtime provider behavior was inspected; static tests were not executed.

## KH-DEC-018

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Undo send реалізувати як grace window до фактичного надсилання, а не як відкликання після доставки.
- Стан реалізації: send_later_present_but_undo_send_contract_not_found
- Залежності: Explicit undo-send state machine; Cancellation and idempotency acceptance criteria
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-049](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-034](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/f4764dfb89de41374ae97bdeb1a65d5a8764bd7a/docs/product/p1-gentle-action-contract.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added durable account-scoped send-later implementation and test changes.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; Static inspection identifies send-later support and draft-first sending but no explicit undo-send grace-window contract.
- Обмеження: Send-later is not equivalent to undo send; no behavior test or runtime acceptance was run.

## KH-DEC-019

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: Integration bus будувати як REST for commands і webhooks/SSE/pub-sub for events.
- Стан реалізації: partially_implemented_with_webhook_commands_only
- Залежності: Event-delivery architecture; External worker or pub-sub service
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-050](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Apps Script implements Telegram webhook ingress and command handling; no durable SSE or pub-sub event bus was identified.
- Доказ 2: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Static audit-record inspection only; runtime assertions in the audit were not accepted without independent proof.; The audit records the durable event worker layer as missing.
- Обмеження: Static inspection cannot establish deployed webhook behavior or external untracked event infrastructure.

## KH-DEC-020

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: ADHD-friendly UI означає послідовність, менше cognitive load, ясні кроки, predictable navigation і distraction control, а не декоративну яскравість.
- Стан реалізації: implemented_in_tracked_focus_and_ui_contracts_static_only
- Залежності: Accessibility and usability acceptance; Owner-approved design criteria
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-060](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Доказ 2: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/docs/design/focus-view-v28-spec.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit introduced Focus View across UI, backend, tests, and specification artifacts.
- Доказ 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Test source was inspected but not run; this is E2, not E3.; Static contracts cover bounded Focus actions, keyboard navigation, focus management, reduced overload, and explicit labels.
- Обмеження: Repository evidence verifies design and code contracts, not accessibility outcomes with users or runtime rendering.

## KH-DEC-021

- Статус: `partial`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `governance` / `E2`
- Твердження: Попередні два звіти залишаються фоном, а report3 є новим головним технічним фундаментом.
- Стан реалізації: architecture_aligned_but_not_adopted_as_standing_governance
- Залежності: Resolution of CF-006; Explicit owner or architecture adoption record
- Конфлікти: CF-006
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-005](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Static inspection on the canonical Requests branch head.; REQ-0003 records report ingestion without runtime, Gmail, Telegram, Apps Script, or production changes and says report-derived claims did not become authority.
- Доказ 2: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Static inspection on the canonical Instructions branch head.; Standing governance requires reconciliation before live claims and states that report-derived claims do not become live-verified without new evidence.
- Доказ 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Обмеження: The active Gmail/Apps Script/Telegram architecture aligns with report 3's scope, but canonical governance says report-derived claims were routed, not adopted as authority.

## KH-DEC-022

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Цільова архітектура має бути гібридною: Gmail add-on, web app і зовнішній event/worker layer.
- Стан реалізації: partially_implemented_web_app_without_add_on_or_external_worker
- Залежності: Resolution of CF-006; Gmail add-on decision; External worker design
- Конфлікти: CF-006
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-006](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Static manifest inspection.; The Apps Script manifest declares a web app.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Apps Script contains the active backend and polling path; no Gmail add-on or external worker implementation was identified.
- Доказ 3: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Static audit-record inspection only; runtime assertions in the audit were not accepted without independent proof.; The audit calls the hybrid split partial and the durable worker layer missing.
- Обмеження: Static repository evidence does not rule out untracked external services, and no runtime deployment was inspected.

## KH-DEC-023

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Не використовувати постійний Apps Script polling; застосувати `watch()` і `history.list` із checkpoint.
- Стан реалізації: contradicted_by_time_based_polling_implementation
- Залежності: Gmail push-notification infrastructure; Durable history checkpoint and deduplication
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-112](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; replaceMailCheckTrigger_ creates a time-based checkNewMail_ trigger with everyMinutes(CONFIG.POLL_MINUTES); no active watch/history worker path was established.
- Доказ 2: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Static audit-record inspection only; runtime assertions in the audit were not accepted without independent proof.; The repository audit records Gmail watch plus checkpoints as missing.
- Обмеження: This is a static contradiction in tracked source, not proof of the currently deployed trigger state.

## KH-DEC-024

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Не переносити весь inbox у Telegram; Mini Apps використовувати як dashboard/control, а не заміну Gmail UX.
- Стан реалізації: contradicted_by_full_mail_client_scope
- Залежності: Owner product-scope decision; Defined boundary between control surface and mail client
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-041](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; MailClient.gs identifies itself as the authenticated Gmail RPC backend for the Telegram Mini App and implements full mailbox folders, threads, drafts, actions, attachments, and provider connections.
- Доказ 3: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Обмеження: The client still links to Gmail and bounds Telegram card output, but the tracked Mini App is explicitly a mail client rather than only a dashboard.

## KH-DEC-025

- Статус: `recommendation`
- Категорія: `KH-DEC`; тип: `decision`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Hardening має розділити secret management, state machine, ingress, Gmail operations і notifications.
- Стан реалізації: partially_separated_but_major_responsibilities_remain_co_located
- Залежності: Threat model; Module-boundary decision; Security acceptance criteria
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-071](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Code.gs co-locates webhook ingress, notification state, polling, Telegram transport, and Gmail operations.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; MailClient.gs separates the authenticated mailbox RPC surface but also owns sessions, provider state, mailbox operations, drafts, and attachments.
- Доказ 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Static architecture inspection.; The repository has documented isolation and module boundaries, but not the complete five-way separation asserted by the recommendation.
- Обмеження: Static module boundaries do not prove deployed secret handling or runtime isolation.

## KH-DEP-001

- Статус: `blocked`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: high
- Scope і рівень: `mixed` / `E2`
- Твердження: WCAG 2.2 є базовим рівнем; для когнітивної доступності потрібні також W3C COGA-настанови.
- Стан реалізації: partially_implemented
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-003](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus-visible styles, dialog focus traps, isolation helpers, accessible controls, and reduced-density UI structure.; Static accessibility primitives exist, but conformance and cognitive-accessibility outcomes require an audit and acceptance evidence.
- Обмеження: Safe missing proof: current primary WCAG 2.2 and W3C COGA references plus an accessibility and cognitive-usability audit tied to the pinned commit.

## KH-DEP-002

- Статус: `recommendation`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: medium
- Scope і рівень: `mixed` / `E1`
- Твердження: Протокольний контракт має охоплювати SMTP, IMAP, POP3 та сучасні JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhooks і push.
- Стан реалізації: not_implemented
- Залежності: SMTP; IMAP; POP3; JMAP; CalDAV; CardDAV; WebDAV; OAuth 2.0
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-002](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-DEP-003

- Статус: `unverified`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: medium
- Scope і рівень: `external` / `E1`
- Твердження: Врахувати різні provider paths: Google/Apple DAV, Microsoft Graph для Microsoft 365 та комбіновану JMAP/IMAP/POP/DAV модель Fastmail.
- Стан реалізації: not_implemented
- Залежності: Google DAV; Apple DAV; Microsoft Graph; Fastmail
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-009](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-DEP-004

- Статус: `partial`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: Підтримувати password-over-TLS для self-hosted/legacy і OAuth 2.0/XOAUTH2 для сучасних зовнішніх акаунтів.
- Стан реалізації: partially_implemented
- Залежності: OAuth 2.0; TLS
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-010](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected repository-owned Google/Drive/Box OAuth state and callback handlers.; External-provider OAuth state, token exchange, refresh, and locking are implemented in project source rather than through a declared apps-script-oauth2 library.
- Доказ 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected dependency declarations.; No apps-script-oauth2 library dependency is declared.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Обмеження: OAuth-based Google/Drive/Box account flows exist; no password-over-TLS self-hosted/legacy account path was found.

## KH-DEP-005

- Статус: `recommendation`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: low
- Scope і рівень: `repository` / `E1`
- Твердження: GitOps для Mailcow має охоплювати `mailcow.conf`, `docker-compose.yml`, protected secrets/volumes, ingress, logs, SSO, observability, backups та integration service.
- Стан реалізації: not_implemented
- Залежності: Mailcow; Docker Compose
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-024](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-DEP-006

- Статус: `recommendation`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: low
- Scope і рівень: `mixed` / `E1`
- Твердження: Базова domain authentication: SPF, DKIM, DMARC; ARC для forwarding/listserv; використовувати готові OpenDKIM/OpenDMARC/OpenARC/Rspamd implementations.
- Стан реалізації: not_implemented
- Залежності: SPF; DKIM; DMARC; ARC
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-034](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-DEP-007

- Статус: `unverified`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: low
- Scope і рівень: `external` / `E1`
- Твердження: OpenPGP і S/MIME потребують окремих operational models; доступні OpenPGP.js, Mailvelope, OpenSSL CMS, Bouncy Castle і PKI.js.
- Стан реалізації: not_implemented
- Залежності: OpenPGP; S/MIME
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-037](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-DEP-008

- Статус: `recommendation`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: low
- Scope і рівень: `repository` / `E1`
- Твердження: Для Node mail work використовувати ImapFlow, Nodemailer і PostalMime замість власного IMAP/SMTP/MIME implementation.
- Стан реалізації: not_applicable
- Залежності: ImapFlow; Nodemailer; PostalMime
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-046](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The repository is Apps Script rather than a Node mail implementation and declares none of these packages; the technology choice remains a recommendation.

## KH-DEP-009

- Статус: `recommendation`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: medium
- Scope і рівень: `repository` / `E1`
- Твердження: Redis використовувати для cache, coordination і short-lived jobs: delayed send, snooze, classification, OCR, retries, AI summaries та push fan-out.
- Стан реалізації: not_implemented
- Залежності: Redis
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-056](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Доказ 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Обмеження: The repository uses Apps Script Properties/Cache/Lock and triggers instead of Redis; Redis suitability and current limits were not externally verified.

## KH-DEP-010

- Статус: `recommendation`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: high
- Scope і рівень: `repository` / `E1`
- Твердження: Важкі та довготривалі операції мають виконуватися поза Apps Script.
- Стан реалізації: not_implemented
- Залежності: external worker
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-021](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Доказ 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Inspected immutable-version retrieval, normalized SHA-256 checks, five-file candidate allowlist, stage/promote/rollback gates, and journal transitions.; The release script hash-verifies immutable five-file candidates and separates staging, promotion, cleanup, and rollback; script presence does not prove execution.
- Обмеження: The pinned deployable set is Apps Script only and has no external worker declaration. Whether specific operations exceed Apps Script limits requires runtime profiling and current quota evidence.

## KH-DEP-011

- Статус: `partial`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Передбачені Gmail add-on, web app, installable triggers, `PropertiesService`, `CacheService`, `LockService`, `UrlFetchApp` і advanced Google services.
- Стан реалізації: partially_implemented
- Залежності: Apps Script; Gmail API
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-025](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Доказ 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Обмеження: Web app, triggers, Properties/Cache/Lock, UrlFetchApp, and Gmail advanced service are present; the manifest has no Gmail add-on declaration.

## KH-DEP-012

- Статус: `recommendation`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: medium
- Scope і рівень: `governance` / `E1`
- Твердження: Для сторонніх або open-source components слід вказувати точний repository, library або documentation source.
- Стан реалізації: partially_implemented
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-084](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Доказ 2: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The manifest precisely names Gmail API v1, but the repository declares no third-party package set to audit; this remains a governance recommendation.

## KH-DEP-013

- Статус: `verified`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Gmail API потрібен для history, drafts/delayed send і attachments.
- Стан реалізації: implemented
- Залежності: Gmail API v1
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-094](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Доказ 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Доказ 6: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-DEP-014

- Статус: `recommendation`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: medium
- Scope і рівень: `repository` / `E1`
- Твердження: Pub/Sub і Cloud Run потрібні для `watch`, webhook ingress, heavy jobs, retries та idempotency.
- Стан реалізації: not_implemented
- Залежності: Pub/Sub; Cloud Run
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-095](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Обмеження: No Pub/Sub or Cloud Run declaration exists. The current source implements polling/history continuation, retries, and idempotency in Apps Script, while `watch` and webhook ingress remain absent.

## KH-DEP-015

- Статус: `verified`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: `PropertiesService`, `CacheService`, `LockService` потрібні для state, cache, refresh locking і continuation.
- Стан реалізації: implemented
- Залежності: Apps Script
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-096](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Доказ 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-DEP-016

- Статус: `partial`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: high
- Scope і рівень: `mixed` / `E2`
- Твердження: Sensitive або restricted Gmail scopes можуть вимагати standard Cloud project, verification і додаткових safeguards.
- Стан реалізації: partially_implemented
- Залежності: Google OAuth policy
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-043](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-103](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected HTML/style/label/attachment sanitizers and source-fragment bounds.; The backend contains explicit sanitization, bounded evidence fragments, and owner/session authorization checks.
- Доказ 3: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inspected CSP, referrer policy, state/code validation, and query removal.; The callback relay minimizes retained OAuth response data and rejects malformed input.
- Обмеження: The manifest proves Gmail/Drive scopes and source safeguards, but current scope classification, Cloud-project status, verification requirements, and policy compliance require primary Google policy and read-only project evidence.

## KH-DEP-017

- Статус: `contradicted`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Для зовнішніх OAuth providers використовувати apps-script-oauth2 з Properties, Cache і Lock practices.
- Стан реалізації: implemented_differently
- Залежності: apps-script-oauth2
- Конфлікти: CF-002
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-045](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-106](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected repository-owned Google/Drive/Box OAuth state and callback handlers.; External-provider OAuth state, token exchange, refresh, and locking are implemented in project source rather than through a declared apps-script-oauth2 library.
- Доказ 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected dependency declarations.; No apps-script-oauth2 library dependency is declared.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Доказ 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Обмеження: The pinned implementation uses repository-owned OAuth handlers and Apps Script properties/locks, while the manifest declares no apps-script-oauth2 library. Static source does not assess whether this alternative is preferable.

## KH-DEP-018

- Статус: `partial`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Event continuation залежить від `startHistoryId`, checkpoint state, `PropertiesService` і triggers.
- Стан реалізації: implemented
- Залежності: Gmail API v1; Apps Script
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-115](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Доказ 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Обмеження: History IDs, persisted checkpoints/state, PropertiesService, and triggers are present; the exact `startHistoryId` naming and near-real-time event source were not established.

## KH-DEP-019

- Статус: `verified`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Для Google-to-Google flow передбачено manifest scopes і `ScriptApp.getOAuthToken()`.
- Стан реалізації: implemented
- Залежності: Apps Script; Google OAuth
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-044](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Доказ 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-DEP-020

- Статус: `recommendation`
- Категорія: `KH-DEP`; тип: `dependency`
- Актуальність: low
- Scope і рівень: `mixed` / `E1`
- Твердження: Запропоновані `postal-mime`, `OpenPGP.js`, `Mailvelope`, `PKI.js` і RFC 8551.
- Стан реалізації: not_implemented
- Залежності: postal-mime; OpenPGP.js; Mailvelope; PKI.js; RFC 8551
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-049](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-EVD-001

- Статус: `unverified`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Defines the product differentiation premise.
- Scope і рівень: `external` / `E0`
- Твердження: [verified-in-report only] Gmail і Outlook мають окремі AI-функції, але не дають описаної цілісної нейроінклюзивної моделі.
- Стан реалізації: unknown
- Залежності: Current official Gmail and Outlook capability evidence; A reproducible comparison against a defined neuroinclusive model
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-007](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ: первинний доказ відсутній
- Обмеження: The repository contains no primary evidence for current Gmail or Outlook capabilities or for the asserted absence.

## KH-EVD-002

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Supports Focus View decomposition and bounded choices.
- Scope і рівень: `mixed` / `E3`
- Твердження: Звіти пов'язують ADHD із труднощами виконавчих функцій і використовують це як підставу для декомпозиції та обмеження вибору.
- Стан реалізації: implemented_mechanics_only
- Залежності: Primary clinical evidence for the ADHD association; User-outcome evidence for the design rationale
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-008](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-058](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-E03](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E08](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single full-file concept scan at the immutable commit.; Focus/triage controls and adaptive-density UI are present; the source exposes a bounded set of primary actions.
- Доказ 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed the Focus View test for bounded triage, Resume Rail, and exactly three primary actions, plus adaptive-density behavior.
- Обмеження: E3 verifies local mechanics, not the clinical association or therapeutic/user outcome.

## KH-EVD-003

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Supports explicit scheduling, reminders, and time-bounded sessions.
- Scope і рівень: `mixed` / `E3`
- Твердження: Звіти описують неоднорідні труднощі сприйняття часу як підставу для часово-орієнтованого UI.
- Стан реалізації: implemented_mechanics_only
- Залежності: Primary evidence for heterogeneous time-perception difficulties; Runtime usability evidence for the time-oriented UI
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-010](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-E07](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single full-file concept scan at the immutable commit.; The UI contains explicit send-later controls and bounded 10/25-minute co-processing sessions.
- Доказ 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed explicit, account-scoped, recoverable send-later and bounded co-processing UI contract tests.
- Обмеження: The scientific rationale and user impact were not independently verified.

## KH-EVD-004

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Relates to gentle milestone feedback.
- Scope і рівень: `mixed` / `E3`
- Твердження: [verified-in-report only] Мотиваційно-винагородні моделі пояснюють перевагу близької негайної винагороди над відкладеною рутинною користю.
- Стан реалізації: implemented_mechanics_only
- Залежності: Primary motivation/reward research; Outcome evidence that milestone feedback has the asserted effect
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-012](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single full-file concept scan at the immutable commit.; Gentle milestone state and bounded progress acknowledgements are implemented.
- Доказ 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed the test that gentle milestones acknowledge bounded session progress without gamification or durable tracking.
- Обмеження: Implementation presence does not verify the motivation/reward model or effectiveness.

## KH-EVD-005

- Статус: `unverified`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Motivates low-pressure inbox language and interactions.
- Scope і рівень: `external` / `E0`
- Твердження: [verified-in-report only] Депресивні симптоми можуть перетворювати інбокс на нагадування про невиконані зобов'язання.
- Стан реалізації: unknown
- Залежності: Primary clinical or qualitative evidence
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-018](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ: первинний доказ відсутній
- Обмеження: No primary scientific evidence or runtime user study exists in the inspected Git evidence.

## KH-EVD-006

- Статус: `unverified`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Underpins the combined neuroinclusive design rationale.
- Scope і рівень: `external` / `E0`
- Твердження: Звіти пов'язують коморбідність ADHD і депресії з посиленим виконавчим, мотиваційним та емоційним навантаженням.
- Стан реалізації: unknown
- Залежності: Primary clinical evidence for the comorbidity claim
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-019](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-059](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-E05](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ: первинний доказ відсутній
- Обмеження: Repository implementation and tests cannot establish a clinical association.

## KH-EVD-007

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Supports functional-relief metrics and bounded backlog rescue.
- Scope і рівень: `mixed` / `E3`
- Твердження: [verified-in-report only] Нейровідмінні автори й користувачі описують `Inbox Functional` як практичнішу модель, ніж порожній інбокс.
- Стан реалізації: implemented_mechanics_only
- Залежності: Primary author/user evidence; Resolution of conflict CF-008; Runtime outcome evidence
- Конфлікти: CF-008
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-066](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed content-free functional-relief metrics, stable recovery percentage, and bounded backlog-rescue tests.
- Доказ 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed UI tests for opt-in functional metrics and bounded, restorable backlog rescue.
- Обмеження: Tests verify the implemented model, not user preference or comparative practicality; CF-008 remains unresolved by repository evidence.

## KH-EVD-008

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Supports digest mode, quiet hours, and bounded workers.
- Scope і рівень: `mixed` / `E3`
- Твердження: Звіти описують batching і обмежені вікна перевірки як спосіб зменшити постійне реагування та стрес.
- Стан реалізації: implemented_mechanics_only
- Залежності: Primary behavioral evidence; Runtime evidence that stress or continuous reacting is reduced
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-067](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-E06](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E10](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; Bounded batches, digest delay state, quiet-hour behavior, and minute-worker limits are present.
- Доказ 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed digest grouping, quiet-hour deferral, bounded reminder worker, and bounded metadata batch tests.
- Обмеження: No local test can verify reduced stress or reduced reacting in users.

## KH-EVD-009

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Supports the durable send-later feature.
- Scope і рівень: `mixed` / `E3`
- Твердження: [verified-in-report only] `Send later` та редагований проміжок перед надсиланням описані як засоби зниження тривоги й perfectionism-driven avoidance.
- Стан реалізації: implemented
- Залежності: Primary evidence for anxiety/avoidance reduction; Production acceptance of scheduled delivery
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-070](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single full-file concept scan at the immutable commit.; Schedule, reschedule, cancel, state, lease, and worker operations are implemented for account-bound drafts.
- Доказ 2: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed seven send-later durability, isolation, uncertainty, quota, timezone, and at-most-once worker tests.
- Доказ 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed the explicit, recoverable, account-scoped send-later UI contract.
- Обмеження: E3 does not prove production delivery or the claimed mental-health effect.

## KH-EVD-010

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Supports private co-processing sessions.
- Scope і рівень: `mixed` / `E3`
- Твердження: [verified-in-report only] Body doubling, virtual co-working і легка присутність описані як практичний спосіб подолання бар'єра старту; email-specific evidence у звіті названо слабшим.
- Стан реалізації: implemented
- Залежності: Primary body-doubling/co-working evidence; Email-specific user-outcome evidence
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-071](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single full-file concept scan at the immutable commit.; Private account-scoped co-processing sessions with bounded 10/25-minute durations are implemented.
- Доказ 2: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed explicit, content-free, idempotent, account-scoped co-processing session tests.
- Доказ 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed the private, restorable co-processing presence UI test and confirmed it does not mutate mail.
- Обмеження: Repository evidence verifies mechanics only; it does not prove start-barrier reduction or email-specific effectiveness.

## KH-EVD-011

- Статус: `unverified`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Defines the Gmail comparison baseline.
- Scope і рівень: `external` / `E0`
- Твердження: [verified-in-report only] Gmail має `AI Overview` і нагадування про дедлайни.
- Стан реалізації: not_applicable
- Залежності: Current official Gmail documentation or safe live readback
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-030](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ: первинний доказ відсутній
- Обмеження: The assigned local Git evidence cannot verify a current external Gmail product capability.

## KH-EVD-012

- Статус: `unverified`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Defines the Outlook/Copilot comparison baseline.
- Scope і рівень: `external` / `E0`
- Твердження: [verified-in-report only] Outlook/Copilot має summary з цитатами, аналіз вкладень, пріоритизацію, створення правил та automatic replies.
- Стан реалізації: not_applicable
- Залежності: Current official Microsoft documentation or safe live readback
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-031](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ: первинний доказ відсутній
- Обмеження: The assigned local Git evidence cannot verify current Outlook/Copilot capabilities.

## KH-EVD-013

- Статус: `unverified`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Provides protocol architecture context.
- Scope і рівень: `external` / `E0`
- Твердження: Звіт пов’язує SMTP, IMAP, POP3, JMAP і JMAP over WebSocket з RFC 5321, 3501, 1939, 8620, 8621 і 8887.
- Стан реалізації: not_applicable
- Залежності: Primary RFC texts and an exact protocol-to-RFC comparison
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-007](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ: первинний доказ відсутній
- Обмеження: No primary RFC content was present in or consulted from the assigned repository evidence.

## KH-EVD-014

- Статус: `unverified`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Affects privacy treatment of tracking pixels.
- Scope і рівень: `external` / `E0`
- Твердження: Звіт стверджує, що матеріали CNIL/Garante 2026 року встановлюють consent concerns для email tracking pixels.
- Стан реалізації: not_applicable
- Залежності: Primary 2026 CNIL and Garante materials; Jurisdiction-specific legal interpretation
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-040](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ: первинний доказ відсутній
- Обмеження: No primary regulator material was present in or consulted from the assigned Git evidence.

## KH-EVD-015

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Determines which implementation and release lineage should be treated as current.
- Scope і рівень: `mixed` / `E3`
- Твердження: Existing project core and v45 are the current working base.
- Стан реалізації: historical_base_modified
- Залежності: A precise definition of current working base; Read-only production deployment/version hash readback for any live-state interpretation
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E01](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/tools/release_apps_script_v37_product_v45.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/fa15f11987c1435ca8975594780c8a1d1c91508d/apps-script/tools/release_apps_script_v37_product_v45.ps1); git merge-base --is-ancestor fa15f11987c1435ca8975594780c8a1d1c91508d 2b3b9e2f678f9fa0c787247f92d7827f81e95c9a; Exit code 0: the v45 release commit is an ancestor of the assigned active commit.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); git diff --name-status and git rev-parse blob comparison from v45 to the assigned commit.; Code.gs, MailApp.html, MultiAccount.gs, and related tests changed after v45; MailClient.gs and appsscript.json retained their v45 blobs.
- Доказ 3: [apps-script/tests/release_v37_product_v45.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/release_v37_product_v45.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed both tests for the historical immutable v45 candidate and its fail-closed, at-most-once, rollback-capable gate.
- Доказ 4: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Single immutable release-artifact inspection.; The artifact states Versie 1 is not promoted, tagged, or represented by a release branch and still requires staging/manual acceptance gates.
- Обмеження: v45 is verified as lineage, not as an unchanged current tree.; Exact safe missing production proof: read-only Apps Script deployment/version readback tied to immutable source hashes plus production acceptance; prohibited in this stream.

## KH-EVD-016

- Статус: `contradicted`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Determines the actual Gmail integration surface.
- Scope і рівень: `repository` / `E2`
- Твердження: Gmail add-ons use card UI; contextual triggers run for opened messages and are unconditional in the manifest.
- Стан реалізації: not_implemented_as_claimed
- Залежності: Official Gmail add-on documentation is still needed for the generic first clause
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E02](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Full immutable manifest inspection.; The manifest configures an anonymous Apps Script web app and Advanced Gmail service; it has no addOns, gmail.contextualTriggers, or unconditional contextual-trigger declaration.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; No CardService implementation was found; the only contextual matches concern OTP/code parsing, not Gmail add-on triggers.
- Обмеження: The repository directly contradicts the project-specific manifest assertion; the generic statement about Gmail add-ons was not externally reverified.

## KH-EVD-017

- Статус: `unverified`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Constrains how the product should explain ADHD.
- Scope і рівень: `external` / `E0`
- Твердження: Dopaminergic systems are relevant, but a simple dopamine-deficit model is described as reductive.
- Стан реалізації: unknown
- Залежності: Primary neuroscience evidence and review literature
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E04](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ: первинний доказ відсутній
- Обмеження: Repository source and tests cannot verify a neuroscience model.

## KH-EVD-018

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Supports reduced-content Focus View and adaptive density.
- Scope і рівень: `mixed` / `E3`
- Твердження: Звіт посилається на W3C та дослідження як підставу для меншої кількості переривань, фокусу й скороченого контенту.
- Стан реалізації: implemented_mechanics_only
- Залежності: Primary W3C and research sources; Runtime accessibility and interruption outcomes
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E09](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E25](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed Focus View with exactly three primary actions and adaptive density that keeps minimal mode to three primary actions.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single full-file concept scan at the immutable commit.; Focus, triage, adaptive-density, and bounded-content UI controls are present.
- Обмеження: The cited W3C/research basis and real user outcomes remain unverified.

## KH-EVD-019

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Covers core compose, send, attachment, and MIME operations.
- Scope і рівень: `mixed` / `E3`
- Твердження: Звіт стверджує, що Gmail API підтримує drafts, send, attachment retrieval і raw message operations.
- Стан реалізації: implemented
- Залежності: Current official Gmail API reference or safe read-only runtime proof
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E11](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E15](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Full immutable manifest inspection.; Advanced Gmail v1 is enabled with gmail.modify scope.
- Доказ 2: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed mocked/local tests for rich raw MIME drafts, base64url encoding, attachment retrieval, draft create/update, send-by-draft-ID, and at-most-once send reconciliation.
- Обмеження: E3 verifies repository logic against mocks, not the current external API contract or live Gmail behavior.

## KH-EVD-020

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Supports Telegram command/control architecture.
- Scope і рівень: `mixed` / `E3`
- Твердження: Telegram Bot API is HTTP-based and suitable for short-command control.
- Стан реалізації: implemented
- Залежності: Current official Telegram Bot API reference; Runtime usability evidence for suitability; Resolution of conflict CF-002
- Конфлікти: CF-002
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E12](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; Telegram methods are sent through UrlFetchApp.fetch to the HTTPS Bot API endpoint.
- Доказ 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed bounded chat-native command, callback, retry, deduplication, and short control-flow tests.
- Обмеження: The implementation proves an HTTP transport and bounded commands locally, not external API availability or qualitative suitability; CF-002 remains unresolved.

## KH-EVD-021

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Affects OAuth scope selection and release governance.
- Scope і рівень: `mixed` / `E3`
- Твердження: Звіт стверджує, що Gmail add-ons і restricted scopes мають мінімізаційні та verification requirements.
- Стан реалізації: partial
- Залежності: Current official Google restricted-scope and add-on verification policies; Server-side OAuth verification state
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E13](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E24](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Full immutable manifest inspection.; The project requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; it does not request full-mail or gmail.send.
- Доказ 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed the manifest test asserting gmail.modify without full-mail or send scope.
- Обмеження: Scope contents are verified, but Google's current minimization/verification requirements and this project's verification status are not.

## KH-EVD-022

- Статус: `unverified`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Guides OAuth state storage and refresh concurrency.
- Scope і рівень: `external` / `E0`
- Твердження: `apps-script-oauth2` recommends Properties/Cache/Lock and warns about refresh races.
- Стан реалізації: unknown
- Залежності: Immutable primary apps-script-oauth2 documentation/source revision
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E14](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ: первинний доказ відсутній
- Обмеження: The repository uses PropertiesService and locks in custom OAuth code but does not establish what apps-script-oauth2 recommends or whether that library is used.

## KH-EVD-023

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Defines expected source deployment and repository security controls.
- Scope і рівень: `governance` / `E2`
- Твердження: `clasp`, CodeQL, secret scanning and Dependabot are described as release/security controls.
- Стан реалізації: partial
- Залежності: Read-only GitHub repository security-settings proof for server-side secret scanning; Primary tool documentation for the generic capability claim
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E16](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Full immutable configuration inspection.; A clasp ignore file allowlists the five Apps Script source/manifest files.
- Доказ 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); git ls-tree plus full inspection of both tracked workflows.; Only bilingual-docs and knowledge-hub validation workflows are tracked; no CodeQL workflow or Dependabot configuration is present at this commit.
- Обмеження: Local Git cannot prove server-side GitHub secret-scanning settings.; The repository shows partial clasp packaging but not all four asserted controls.

## KH-EVD-024

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Explains bounded workers, cursors, leases, and resumable state.
- Scope і рівень: `mixed` / `E3`
- Твердження: Звіт описує Apps Script execution limits і потребу в continuation state або зовнішньому worker для довгих операцій.
- Стан реалізації: implemented_continuation_state
- Залежності: Current official Apps Script quota/limit documentation; Runtime duration and continuation acceptance
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E17](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E27](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; The implementation contains durable cursors, page tokens, leases, bounded batches, and minute-worker continuation paths.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single full-file concept scan at the immutable commit.; Mailbox operations use bounded cursors, leases, journals, and scheduled workers.
- Доказ 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed durable pagination over more than 500 messages, cursor restart, retry, lease, bounded-worker, and continuation tests.
- Обмеження: Official execution-limit values and production behavior were not verified; no external worker deployment was evidenced.

## KH-EVD-025

- Статус: `unverified`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Supports the proposed development workflow.
- Scope і рівень: `external` / `E0`
- Твердження: Codex documentation is cited in support of context/tool/environment-aware workflows.
- Стан реалізації: not_applicable
- Залежності: Current official Codex documentation and exact cited passages
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E18](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ: первинний доказ відсутній
- Обмеження: The assigned evidence scope did not consult external Codex documentation; repository workflow instructions are not proof of the cited documentation.

## KH-EVD-026

- Статус: `blocked`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Affects discoverability and public-evidence claims.
- Scope і рівень: `external` / `E0`
- Твердження: Public indexing of `github.com/[PRIVATE]/gmail-telegram-controls` could not be confirmed.
- Стан реалізації: blocked
- Залежності: Anonymous current GitHub visibility check; Independent current search-index query
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E19](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ: первинний доказ відсутній
- Обмеження: Local immutable Git history cannot prove public indexing.; Exact safe missing proof: an anonymous read-only GitHub visibility response plus current independent search-index results for the canonical public URL; external/network checks were outside this stream.

## KH-EVD-027

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Maps the actual web, Gmail, synchronization, OAuth, and scope surfaces.
- Scope і рівень: `mixed` / `E3`
- Твердження: Gmail cards, `doGet`/`doPost`, Gmail API resources, `watch`, OAuth storage/locks and scope verification are cited as platform constraints.
- Стан реалізації: partial
- Залежності: Current official platform documentation; Runtime verification for OAuth/scopes and Gmail synchronization
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E20](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; doPost and doGet are implemented; Gmail History uses startHistoryId; PropertiesService and locks are used; no Gmail CardService or watch call was found.
- Доказ 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Full immutable manifest inspection.; Advanced Gmail v1 and explicit scopes are configured, but no Gmail add-on card/trigger manifest exists.
- Доказ 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed Gmail History baseline/change/cursor tests and scope-minimization checks.
- Обмеження: Cards and watch are not implemented in the checked tree; current platform constraints and OAuth verification state remain externally/runtime unverified.

## KH-EVD-028

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Defines intended responsibility boundaries across platform components.
- Scope і рівень: `mixed` / `E3`
- Твердження: The report attributes contextual UI to add-ons, richer UX to web apps, automation to Gmail API, event reliability to Pub/Sub/Cloud Run and state control to Properties/Cache/Lock.
- Стан реалізації: partial
- Залежності: Primary platform documentation; Deployed architecture evidence for Pub/Sub/Cloud Run and add-ons
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E21](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Full immutable manifest inspection.; The project is an Apps Script web app with Advanced Gmail; no add-on, Pub/Sub, or Cloud Run configuration is present.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single full-file concept scan at the immutable commit.; The richer web UI backend uses Gmail REST operations plus PropertiesService and locks with durable cursors/leases.
- Доказ 3: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed mocked web-app, Gmail automation, state isolation, cursor, lock, and worker contracts.
- Обмеження: Web-app/Gmail/state portions are evidenced; add-on and Pub/Sub/Cloud Run portions are absent, and platform-level reliability is unverified.

## KH-EVD-029

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Affects local source layout and Apps Script release tooling.
- Scope і рівень: `mixed` / `E2`
- Твердження: Звіт описує clasp як open-source route для локальної directory-based розробки, versioning і deployment.
- Стан реалізації: partial
- Залежності: Primary clasp documentation/source; A tracked or safely referenced clasp project configuration for full local deployment use
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E22](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E23](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Full immutable configuration inspection.; The repository contains clasp source-packaging rules for a five-file Apps Script bundle.
- Доказ 2: [apps-script/tools/release_apps_script_v37_product_v45.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_v37_product_v45.ps1); Single immutable release-helper inspection.; The v45 helper performs guarded Apps Script REST release operations directly; no clasp invocation was found.
- Обмеження: A .claspignore file proves partial local layout usage only; the generic open-source/versioning/deployment capabilities and an active clasp deployment configuration were not independently verified.

## KH-EVD-030

- Статус: `partial`
- Категорія: `KH-EVD`; тип: `evidence`
- Актуальність: Defines the expected Gmail change-synchronization architecture.
- Scope і рівень: `mixed` / `E3`
- Твердження: Gmail `watch()` uses Pub/Sub and `history.list`/`startHistoryId` for change synchronization.
- Стан реалізації: partial_history_only
- Залежності: Current official Gmail API watch/history documentation; Read-only deployed Pub/Sub/watch configuration proof
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-E26](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; The repository implements a Gmail History request with startHistoryId and cursor advancement; no watch call or Pub/Sub configuration was found.
- Доказ 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed Gmail History baseline, targeted-change, scoped-update, retry, snapshot-resume, and stale-cursor reset tests.
- Обмеження: Only history synchronization is verified locally; watch/Pub/Sub behavior and the current external API contract remain unverified.

## KH-HIS-001

- Статус: `unverified`
- Категорія: `KH-HIS`; тип: `history`
- Актуальність: medium
- Scope і рівень: `repository` / `E1`
- Твердження: Вбудовані маркери виду `turn...view/search` є технічними provenance-посиланнями, які потрібно окремо розв'язати під час міграції.
- Стан реалізації: no_concrete_marker_occurrence_found_in_active_tree
- Залежності: Immutable original artifact containing concrete markers; Marker-resolution mapping
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-064](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Commit-wide Git search for concrete turn-number plus view/search markers, excluding the six assigned claim pages.; Zero matching tracked occurrences were found at the pinned commit.
- Обмеження: A zero-match active-tree search does not disprove occurrence in an unavailable earlier private artifact. Safe missing proof: an immutable original source artifact containing the concrete marker and its resolution target.

## KH-HIS-002

- Статус: `unverified`
- Категорія: `KH-HIS`; тип: `history`
- Актуальність: low
- Scope і рівень: `external` / `E0`
- Твердження: Не класифікувати EmailEngine як FOSS: звіт описує його як колишній open-source, нині source-available/commercial unified email layer.
- Стан реалізації: not_used_in_inspected_repository
- Залежності: Immutable upstream license history; Dated upstream release or licensing record
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-045](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ: первинний доказ відсутній
- Обмеження: Project reports are not corroboration and no upstream primary artifact was inspected. Safe missing proof: an immutable EmailEngine upstream commit or release artifact showing the licensing transition.

## KH-HIS-003

- Статус: `unverified`
- Категорія: `KH-HIS`; тип: `history`
- Актуальність: low
- Scope і рівень: `external` / `E0`
- Твердження: Mailparser позначено maintenance mode/legacy choice; для нових проєктів рекомендовано PostalMime.
- Стан реалізації: neither_dependency_found_in_inspected_repository
- Залежності: Immutable upstream maintenance statement; Dated upstream recommendation or migration record
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-047](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ: первинний доказ відсутній
- Обмеження: Project reports are not corroboration and no upstream primary artifact was inspected. Safe missing proof: immutable upstream maintainer documentation or release records for both packages.

## KH-HIS-004

- Статус: `partial`
- Категорія: `KH-HIS`; тип: `history`
- Актуальність: high
- Scope і рівень: `mixed` / `E1`
- Твердження: Робота продовжується з наявного ядра в `[PRIVATE]`, а не з порожнього стану.
- Стан реалізації: non_empty_core_lineage_verified_private_origin_not_inspected
- Залежності: Authorized evidence for the redacted origin, if the location itself must be verified
- Конфлікти: none
- Чутливість: `secret-redacted`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/b73327e2927cd812e032167e5662b2a3c4bcd100/apps-script/Code.gs); Commit metadata, ancestry, and changed-path inspection.; The immutable ancestor preserved a non-empty Apps Script v27 baseline with backend, Mini App, architecture, tests, tools, and audit artifacts.
- Доказ 2: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Обмеження: Immutable Git ancestry verifies continuation from a substantial existing Apps Script core. The redacted private origin was intentionally not accessed, so that location remains unverified.

## KH-HIS-005

- Статус: `contradicted`
- Категорія: `KH-HIS`; тип: `history`
- Актуальність: high
- Scope і рівень: `governance` / `E2`
- Твердження: `gmail-telegram-v45-gentle-milestones` визначено поточним базовим артефактом.
- Стан реалізації: superseded_by_versie_1_governance
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-002](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Доказ 2: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Static release-artifact inspection at the pinned commit.; The active release artifact is Versie 1, while the prior Apps Script v37 production baseline remains separately described.
- Доказ 3: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Static inspection on the canonical Instructions branch head.; Standing governance requires reconciliation before live claims and states that report-derived claims do not become live-verified without new evidence.
- Обмеження: The directory name and v45 artifacts remain historical lineage, but the pinned repository and standing governance designate Versie 1 as the active working line. This does not assert current runtime deployment.

## KH-HIS-006

- Статус: `partial`
- Категорія: `KH-HIS`; тип: `history`
- Актуальність: medium
- Scope і рівень: `repository` / `E1`
- Твердження: `gmail-telegram-v44-co-processing`, `gmail-telegram-notifier` та інші release lines збережено як попередній досвід.
- Стан реалізації: v44_v45_and_prior_commit_lineage_retained_notifier_artifact_not_identified
- Залежності: Immutable artifact identifying the named gmail-telegram-notifier line
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-003](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/operations/v44-co-processing-presence.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/7413454aa03581dbedaf75eab0e1c38b12e8bf8b/docs/operations/v44-co-processing-presence.md); Commit metadata, ancestry, and changed-path inspection.; The immutable ancestor added the v44 co-processing line and retained its implementation and documentation artifacts.
- Доказ 2: [docs/product/gentle-milestones-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/fa15f11987c1435ca8975594780c8a1d1c91508d/docs/product/gentle-milestones-v45.md); Commit metadata, ancestry, and tracked-tree inspection.; The immutable ancestor consolidated product v45 on Apps Script v37; v45-named release, audit, product, and menu artifacts remain tracked.
- Доказ 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Обмеження: Git refs, ancestor commits, and tracked v44/v45 artifacts verify retained prior release lines. No separately named gmail-telegram-notifier repository artifact was identified in the active tree evidence pass.

## KH-INS-001

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `mixed` / `E2`
- Твердження: Інтерфейс повинен мати одну домінантну дію, стабільний контекст, низьку щільність, явний прогрес, зрозумілі пріоритети й точне повернення після переривання.
- Стан реалізації: partially_implemented_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: CF-001
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-005](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-001 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Primary-action (30), density (18), and progress (25) markers plus focus/session identifiers exist; one dominant action and exact resumption were not proven.
- Обмеження: Rendered-state and interruption acceptance are missing.

## KH-INS-002

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `mixed` / `E2`
- Твердження: Для кожного листа визначати одну візуально головну наступну дію.
- Стан реалізації: partially_implemented_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: CF-001; CF-003
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-014](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-012](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-002 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Primary-action markers exist in MailApp.html (30) and MailClient.gs (12), but exactly one primary action per message state was not established.
- Обмеження: A rendered per-message action inventory is missing.

## KH-INS-003

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `mixed` / `E2`
- Твердження: Використовувати нейтральну, підтримувальну й неосудливу мову.
- Стан реалізації: not_established_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-022](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-027](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-003 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; No explicit neutral/supportive/non-judgmental policy marker was found; token absence cannot assess wording quality.
- Обмеження: A complete bilingual UX-copy audit and owner acceptance are missing.

## KH-INS-004

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `mixed` / `E2`
- Твердження: У фокус-режимі має бути не більше 3-4 первинних дій.
- Стан реалізації: partially_implemented_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: CF-001
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-024](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-004 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Focus-mode (11) and primary-action (30) markers exist, but rendered primary-action cardinality was not enumerated.
- Обмеження: The 3-4 cap needs a deterministic UI contract or rendered inspection.

## KH-INS-005

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `mixed` / `E2`
- Твердження: WCAG 2.2 слід трактувати як мінімум, а COGA як стандарт якості для структури, фокусу, пам'яті, summaries, персоналізації, human help і контролю переривань.
- Стан реалізації: not_established_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-073](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-005 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; No WCAG or COGA marker was found; focus-related code does not establish conformance.
- Обмеження: No criterion mapping, accessibility audit, or assistive-technology evidence was reviewed.

## KH-INS-006

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `mixed` / `E2`
- Твердження: Focus mode має бути окремою інформаційною архітектурою з однією екранною задачею, а не косметичною темою.
- Стан реалізації: partially_implemented_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-074](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-006 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Dedicated focus render/load/toggle functions exist; one-task information architecture was not established.
- Обмеження: Static function presence does not prove rendered information architecture.

## KH-INS-007

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `mixed` / `E2`
- Твердження: Система має мінімізувати втрату контексту та зберігати позицію, чернетку, тимчасову класифікацію, останню розмову й проміжні рішення.
- Стан реалізації: partially_implemented_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-026](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-007 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Draft, classification, session, recovery, and focus-state identifiers exist, but preservation of every listed element was not proven.
- Обмеження: State-transition tests or read-only runtime acceptance are missing.

## KH-INS-008

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `mixed` / `E2`
- Твердження: Персоналізація повинна бути адаптивною, сценарною та поступовою, з простими пресетами замість довгого налаштування.
- Стан реалізації: partially_implemented_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: CF-004
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-028](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-008 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Density markers (18) and focus configuration/preset functions exist; gradual scenario-based adaptation was not established.
- Обмеження: No behavioral evidence shows adaptive progression or reduced setup burden.

## KH-INS-009

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `mixed` / `E2`
- Твердження: AI-summary має містити джерельні посилання, confidence indication і швидкий перехід до оригіналу.
- Стан реалізації: partially_implemented_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-033](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-009 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Summary (55), confidence (13), and source/original-link (9) markers exist, with more server-side summary/confidence markers.
- Обмеження: No test verifies citation accuracy, confidence meaning, or original navigation.

## KH-INS-010

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `mixed` / `E2`
- Твердження: Візуальний режим має використовувати мало кольорів, один акцент, великі targets, видимий focus state і регульовану щільність.
- Стан реалізації: partially_implemented_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-048](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-010 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Focus-state and density code exists; palette count, accent uniqueness, and target dimensions were not measured.
- Обмеження: A CSS/rendered accessibility audit is missing.

## KH-INS-011

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: architecture
- Scope і рівень: `mixed` / `E2`
- Твердження: Не писати MTA, MDA або groupware з нуля; збирати продукт із готових серверних компонентів.
- Стан реалізації: consistent_with_current_architecture_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-013](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-011 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; The tracked product is an Apps Script/Gmail API client with managed Google/Box endpoints; no dedicated custom mail-server component path was found.
- Обмеження: Repository architecture does not prove all external infrastructure.

## KH-INS-012

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: architecture
- Scope і рівень: `mixed` / `E2`
- Твердження: Розділяти transport security, domain authenticity, content protection та abuse/phishing defense; застосувати TLS, MTA-STS, TLS-RPT і за DNSSEC також DANE.
- Стан реалізації: not_implemented_in_tracked_client
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-033](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-012 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; No MTA-STS, TLS-RPT, DANE, or DNSSEC marker was found; this repository is a Gmail client, not domain mail infrastructure.
- Обмеження: External DNS and mail-domain configuration were not inspected.

## KH-INS-013

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: architecture
- Scope і рівень: `mixed` / `E2`
- Твердження: Не створювати власний mail server; інвестувати в UX, interoperability, privacy, AI triage та керовані ecosystem integrations.
- Стан реалізації: partially_implemented_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-079](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-013 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Managed Gmail/Telegram/Box integration and substantial UX/triage code exist; no custom mail-server component path was found.
- Обмеження: Investment priority is not objectively verifiable; privacy completeness is open.

## KH-INS-014

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `governance` / `E1`
- Твердження: Використовувати logs, checkpoints, audit notes, test trails і lessons learned; не повторювати пройдені стадії без огляду.
- Стан реалізації: partially_reflected_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-004](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-014 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [AGENTS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/AGENTS.md); Read once at the assigned commit.; Governs request routing, evidence, secret handling, and release gates; adopts no KH-INS ID.
- Обмеження: No canonical KH-INS-014 adoption exists.

## KH-INS-015

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `governance` / `E1`
- Твердження: Послідовність роботи: product core, master prompt, implementation recipe, audit, operational cycle; capabilities перевіряти фактично.
- Стан реалізації: partially_reflected_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-009](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-015 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Обмеження: Canonical order is request/release oriented, not this sequence; runtime capability verification was prohibited.

## KH-INS-016

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `governance` / `E1`
- Твердження: Агент має діяти як product architect, Workspace engineer, accessibility researcher, security reviewer і release engineer та створювати technical delivery program.
- Стан реалізації: not_applicable_to_product_runtime_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-022](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-016 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Обмеження: This role recommendation has no explicit owner adoption.

## KH-INS-017

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `governance` / `E1`
- Твердження: Агент повинен видати секції A-R: architecture, UX, modules, scopes, OAuth, integrations, audit, build/debug/release plans, tests, backlog, patches і fallback paths.
- Стан реалізації: not_applicable_to_product_runtime_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-031](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-017 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Обмеження: No canonical A-R template or owner adoption exists.

## KH-INS-018

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `governance` / `E1`
- Твердження: Для рекомендацій пояснювати problem, rationale і pitfalls; platform limits називати прямо та давати workaround.
- Стан реалізації: not_applicable_to_product_runtime_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-032](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-018 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Обмеження: Document quality is not proven by presence; owner adoption is absent.

## KH-INS-019

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: architecture
- Scope і рівень: `mixed` / `E2`
- Твердження: Якщо потрібна hybrid architecture з Apps Script, Cloud Run, Pub/Sub і Storage, її слід спроєктувати явно.
- Стан реалізації: not_implemented_in_tracked_repository
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-083](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-019 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; No Cloud Run, Pub/Sub, or Cloud Storage architecture marker was found.
- Обмеження: This conditional recommendation may be irrelevant until such architecture is required.

## KH-INS-020

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `governance` / `E1`
- Твердження: Не приховувати tradeoffs, уникати vague advice і писати як delivery document для implementation team.
- Стан реалізації: not_applicable_to_product_runtime_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-085](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-020 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Обмеження: This qualitative recommendation lacks explicit owner adoption.

## KH-INS-021

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `governance` / `E1`
- Твердження: Codex має бути керованим technical reviewer і executor verification protocol; browser/CDP/runtime capability підтверджувати перед use.
- Стан реалізації: partially_reflected_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-072](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-021 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [AGENTS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/AGENTS.md); Read once at the assigned commit.; Governs request routing, evidence, secret handling, and release gates; adopts no KH-INS ID.
- Обмеження: No runtime capability check was permitted or performed.

## KH-INS-022

- Статус: `recommendation`
- Категорія: `KH-INS`; тип: `instruction`
- Актуальність: current
- Scope і рівень: `governance` / `E1`
- Твердження: Operational loop має бути mandatory і охоплювати actual UI, runtime та network behavior, а не лише code reading.
- Стан реалізації: partially_reflected_not_canonically_adopted
- Залежності: REQ-0003; explicit owner adoption on canonical Інструкції
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-080](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-022 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Доказ 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Read once at the assigned commit.; Versie 1 is in progress and not promoted; real-time controlled-mail acceptance and staging visual/readback remain unproven.
- Обмеження: This stream excluded UI, runtime, network, and tests.

## KH-ISS-001

- Статус: `unverified`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: product rationale
- Scope і рівень: `external` / `E0`
- Твердження: Пошта створює потік мікрорішень, перемикань, часових оцінок і соціального тиску; РДУГ та депресія можуть перетворити це на параліч запуску.
- Стан реалізації: not_established_by_repository
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-ISS-002

- Статус: `unverified`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: notification design
- Scope і рівень: `external` / `E0`
- Твердження: Пуші, бейджі, банери й інші переривання можуть погіршувати фокус і самі бути частиною проблеми.
- Стан реалізації: mitigations_present_but_causal_claim_unproven
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-013](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-ISS-003

- Статус: `unverified`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: neuroinclusive UX
- Scope і рівень: `external` / `E0`
- Твердження: Червоні лічильники, агресивні нагадування, публічні streaks і осудлива мова можуть посилювати уникання та шкодити adoption і retention.
- Стан реалізації: gentle_private_alternatives_implemented_causal_claim_unproven
- Залежності: none
- Конфлікти: CF-005
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-020](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No user study, rendered acceptance, or behavioral outcome measurement was performed.; No tests were run; inspected test definitions do not prove that any test passed.

## KH-ISS-004

- Статус: `unverified`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: summary feature
- Scope і рівень: `external` / `E0`
- Твердження: AI-summary може бути неточним або зазнавати prompt injection через поштовий контент.
- Стан реалізації: evidence_contract_and_sanitization_present_no_prompt_injection_reproduction
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-032](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 4: [apps-script/tests/mail_sanitizer.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_sanitizer.test.js); Exact static test-definition inspection only; tests were not executed.; Definitions reject active/obfuscated HTML and unsafe attributes while preserving bounded safe layout and links.
- Доказ 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/5e7c1f70b01814d0cd14a45abcbe6dfa8d2f3efb/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds the trustworthy summary evidence contract.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-005

- Статус: `unverified`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: milestone design
- Scope і рівень: `external` / `E0`
- Твердження: Перегейміфікація може стимулювати імпульсивне використання без довгострокової користі.
- Стан реалізації: bounded_private_milestones_avoid_durable_tracking
- Залежності: none
- Конфлікти: CF-005
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-059](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No user study, rendered acceptance, or behavioral outcome measurement was performed.; No tests were run; inspected test definitions do not prove that any test passed.

## KH-ISS-006

- Статус: `partial`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current summary and action design
- Scope і рівень: `repository` / `E2`
- Твердження: `AI overreach`: summary без цитат, непрозора логіка й автоматичні дії без підтвердження.
- Стан реалізації: evidence_and_explicit_action_controls_mitigate_risk_statically
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-060](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Доказ 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/5e7c1f70b01814d0cd14a45abcbe6dfa8d2f3efb/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds the trustworthy summary evidence contract.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-007

- Статус: `partial`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current energy and density modes
- Scope і рівень: `repository` / `E2`
- Твердження: Low-energy mode провалиться, якщо не деградує до справді простого режиму.
- Стан реалізації: minimal_mode_with_three_primary_actions_implemented_statically
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-061](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Доказ 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds energy-aware Focus sessions.
- Доказ 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/359b8cba5cdcaee9ec022ccd659538a4dd108455/apps-script/MailApp.html); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds adaptive information density.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-ISS-008

- Статус: `partial`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current OAuth onboarding
- Scope і рівень: `mixed` / `E2`
- Твердження: Складна автентифікація, довгий onboarding і повторне введення даних створюють приховані бар'єри.
- Стан реалізації: direct_oauth_and_callback_fixes_present_staging_acceptance_missing
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-062](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/ISSUES.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ISSUES.md); Immutable bilingual issue-register inspection.; Current defects are tracked as GT-001 through GT-009; locally resolved items still require staging or real-time acceptance where stated.
- Доказ 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 5: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Exact immutable callback-relay inspection; environment-specific endpoint value omitted.; The relay clears the query from browser history, validates bounded state and code, forwards only action/state/code, and fails closed on malformed input.
- Доказ 6: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/f67af598369a710c93af91772ee25d5364095a1e/apps-script/Code.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit consolidates duplicate-delivery and OAuth repair implementation.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-ISS-009

- Статус: `recommendation`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current Google integration
- Scope і рівень: `repository` / `E2`
- Твердження: Basic auth не слід вважати надійним шляхом для Google/Microsoft; modern auth треба врахувати в onboarding, account linking і support.
- Стан реалізації: google_oauth_implemented_microsoft_out_of_scope
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-011](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Доказ 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Доказ 4: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-010

- Статус: `partial`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current bridge architecture
- Scope і рівень: `mixed` / `E2`
- Твердження: Єдиного офіційного Telegram × Gmail API немає; bridge треба компонувати з незалежних Telegram і Google interfaces.
- Стан реалізації: independent_telegram_and_google_interfaces_combined_statically
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-029](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Доказ 4: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-011

- Статус: `unverified`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: outside current scope
- Scope і рівень: `external` / `E0`
- Твердження: Postfix/Dovecot FTS часто потребує окремого Solr або Flatcurve/Xapian design; Stalwart моделює search як окремий native store.
- Стан реалізації: not_applicable_to_current_repository
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-055](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; Presence or absence is established only for the assigned immutable commit.

## KH-ISS-012

- Статус: `unverified`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: outside current scope
- Scope і рівень: `external` / `E0`
- Твердження: Dovecot CE + `dsync` не дорівнює готовому cluster control plane; HA/multi-region roadmap може схилити вибір до Stalwart/unified stack.
- Стан реалізації: not_applicable_to_current_repository
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-057](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; Presence or absence is established only for the assigned immutable commit.

## KH-ISS-013

- Статус: `partial`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current OAuth implementation
- Scope і рівень: `repository` / `E2`
- Твердження: Паралельний token refresh може спричинити race condition без lock.
- Стан реалізації: mixed_lock_coverage_gmail_refresh_has_no_local_lock
- Залежності: none
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-046](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 4: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover replay-resistant sessions, token/state locks, account isolation, Focus, triage, energy/reminders, co-processing, backlog rescue, content-free metrics, URL safety, idempotent send, and scheduled send.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No concurrent execution or race reproduction was performed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-014

- Статус: `partial`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current manifest
- Scope і рівень: `repository` / `E2`
- Твердження: Overbroad Gmail scope створює risk verification failure і збільшує blast radius; фактичний defect не підтверджено.
- Стан реалізації: gmail_modify_is_narrower_than_full_mail_but_consent_surface_has_additional_required_scopes
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-057](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-015

- Статус: `partial`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current logging
- Scope і рівень: `repository` / `E2`
- Твердження: Необроблене logging зовнішніх responses може розкрити token або private mail content; фактичний випадок не підтверджено.
- Стан реалізації: no_direct_token_or_mail_response_log_found_error_logging_requires_dataflow_review
- Залежності: none
- Конфлікти: none
- Чутливість: `secret-redacted`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-059](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No value-level secret scan of protected stores or full historical blobs was performed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-016

- Статус: `contradicted`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current external URL handling
- Scope і рівень: `repository` / `E2`
- Твердження: Очікуваний risk: external URL без whitelist/validation.
- Стан реалізації: allowlisting_scheme_validation_and_public_dns_checks_present
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-063](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-017

- Статус: `contradicted`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current mail and UI rendering
- Scope і рівень: `repository` / `E2`
- Твердження: Очікуваний risk: unescaped HTML або user-generated strings.
- Стан реалізації: server_and_client_sanitization_and_text_dom_paths_present
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-064](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 4: [apps-script/tests/mail_sanitizer.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_sanitizer.test.js); Exact static test-definition inspection only; tests were not executed.; Definitions reject active/obfuscated HTML and unsafe attributes while preserving bounded safe layout and links.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-018

- Статус: `contradicted`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current state model
- Scope і рівень: `repository` / `E2`
- Твердження: Очікуваний risk: весь task state в одному large JSON blob у `PropertiesService`.
- Стан реалізації: state_is_partitioned_across_scoped_registries_ledgers_and_keys
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-065](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-019

- Статус: `contradicted`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current state model
- Scope і рівень: `repository` / `E2`
- Твердження: Очікуваний risk: inbox labels як єдине source of truth.
- Стан реалізації: properties_sessions_history_and_operation_ledgers_complement_gmail_labels
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-066](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-020

- Статус: `partial`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current logging
- Scope і рівень: `repository` / `E2`
- Твердження: Очікуваний risk: secrets у `Logger.log()` або `console.log()`.
- Стан реалізації: no_direct_secret_logging_found_but_error_logging_not_exhaustively_dataflow_proven
- Залежності: none
- Конфлікти: none
- Чутливість: `secret-redacted`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-067](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No value-level secret scan of protected stores or full historical blobs was performed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-021

- Статус: `contradicted`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current polling implementation
- Scope і рівень: `repository` / `E2`
- Твердження: Очікуваний risk: one-shot polling loop, який мовчки завершується через execution limit.
- Стан реалізації: bounded_scans_continuation_state_retry_ledgers_and_minute_trigger_present
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-068](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-022

- Статус: `partial`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current OAuth consent
- Scope і рівень: `mixed` / `E2`
- Твердження: Очікуваний risk: overly broad OAuth consent surface.
- Стан реалізації: scopes_are_functional_and_bounded_but_external_verification_surface_not_assessed
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-069](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; GitHub server-side security settings were not read.

## KH-ISS-023

- Статус: `contradicted`
- Категорія: `KH-ISS`; тип: `issue`
- Актуальність: current webhook and session ingress
- Scope і рівень: `repository` / `E2`
- Твердження: Очікуваний risk: webhook без replay protection.
- Стан реалізації: constant_time_webhook_key_update_dedupe_one_use_states_and_session_replay_controls_present
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-070](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 4: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Доказ 5: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover replay-resistant sessions, token/state locks, account isolation, Focus, triage, energy/reminders, co-processing, backlog rescue, content-free metrics, URL safety, idempotent send, and scheduled send.
- Доказ 6: [apps-script/tests/oauth_callback_bridge.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/oauth_callback_bridge.test.js); Exact static test-definition inspection only; tests were not executed.; The contract permits only one-use state/code forwarding and excludes authuser, prompt, scope, iss, browser storage, and console logging.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-LES-001

- Статус: `unverified`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: high
- Scope і рівень: `external` / `E0`
- Твердження: Основна проблема часто полягає не в читанні листа, а в утриманні плану його подальшої обробки.
- Стан реалізації: product_features_address_the_hypothesis_but_do_not_verify_it
- Залежності: Primary user-research protocol and data; Applicability study for the target population
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-009](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ: первинний доказ відсутній
- Обмеження: Repository features and report repetition cannot verify this behavioral generalization. Safe missing proof: a primary, reviewable user-study dataset or published study supporting the stated population and context.

## KH-LES-002

- Статус: `recommendation`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: `Action-only inbox` має залишати в inbox/unread лише те, що потребує дії; папки повинні бути широкими, а фільтри прибирати навіть невеликий регулярний шум.
- Стан реалізації: not_implemented_as_action_only_inbox
- Залежності: Owner inbox policy; Safe rule suggestion and confirmation flow
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-068](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; The tracked client exposes Inbox, Unread, All Mail, categories, labels, and server-wide Gmail filters rather than enforcing an action-only inbox.
- Обмеження: Static scope does not establish how an individual mailbox is configured at runtime.

## KH-LES-003

- Статус: `recommendation`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Plain UI з текстом листа та трьома базовими діями корисніший за додаткові affordances і складні меню.
- Стан реалізації: partially_implemented_in_focus_view_only
- Залежності: Comparative usability evidence
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-069](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Доказ 2: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Доказ 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Test source was inspected but not run; this is E2, not E3.; Static contracts assert bounded Focus actions but also cover a feature-rich mail client with folders, compose, attachments, labels, and settings.
- Обмеження: The comparative usefulness claim requires usability evidence; repository inspection only verifies the two UI scopes.

## KH-LES-004

- Статус: `recommendation`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Техніки мікростарту мають зменшувати невизначеність і вимагати лише одного мінімального руху.
- Стан реалізації: partially_implemented_in_focus_and_gentle_action_flows
- Залежності: Usability validation; Outcome definition for reduced uncertainty
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-072](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Доказ 2: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added energy-aware Focus sessions across implementation, tests, and the product contract.
- Доказ 3: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/product/p1-gentle-action-contract.md); Static contract inspection and immutable commit correlation.; The tracked gentle-action contract defines bounded, energy-aware interactions and related product behavior.
- Обмеження: Static flows cannot verify reduced uncertainty or one-movement completion in real use.

## KH-LES-005

- Статус: `recommendation`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: Не складати metadata, blobs, search і queues в одну БД; data plane має бути багатошаровим.
- Стан реалізації: not_applicable_to_current_apps_script_storage_model
- Залежності: External data-plane decision; Storage and retention architecture
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-052](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; The tracked implementation uses Gmail plus Apps Script properties and service APIs; no unified application database or layered external data plane was identified.
- Обмеження: No external infrastructure or runtime storage configuration was inspected.

## KH-LES-006

- Статус: `unverified`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: medium
- Scope і рівень: `external` / `E0`
- Твердження: Описані user patterns: timed triage, archive/delete stale mail, fixed check windows, one quick email, calendar/snooze linkage.
- Стан реалізації: some_related_features_present_but_user_pattern_unverified
- Залежності: Primary user-research records; Sampling and methodology details
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-061](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ: первинний доказ відсутній
- Обмеження: Implementation of timers, mail actions, snooze, or handoff does not verify that users exhibit these patterns. Safe missing proof: primary study notes or a reviewable dataset with methodology.

## KH-LES-007

- Статус: `recommendation`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: medium
- Scope і рівень: `repository` / `E0`
- Твердження: Frontend до стабільного mail core створює інтеграційну нестабільність; порядок робіт не слід інвертувати.
- Стан реалізації: not_applicable_to_current_gmail_managed_core
- Залежності: Defined self-hosted mail-core program; Comparative delivery evidence
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-073](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ: первинний доказ відсутній
- Обмеження: Git chronology can show work order but cannot establish the claimed causal instability; the current product relies on Gmail rather than a newly built mail core.

## KH-LES-008

- Статус: `recommendation`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Time blindness, мотивацію та дофамін слід використовувати як design models, а не як єдине пояснення ADHD.
- Стан реалізації: partially_reflected_in_energy_and_attention_design
- Залежності: Clinical-safe language review; User research
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-007](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added energy-aware Focus sessions across implementation, tests, and the product contract.
- Доказ 2: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/product/p1-gentle-action-contract.md); Static contract inspection and immutable commit correlation.; The tracked gentle-action contract defines bounded, energy-aware interactions and related product behavior.
- Доказ 3: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Обмеження: Repository design artifacts address energy and attention but do not verify the scientific framing or prove that ADHD is not reduced to one model in external messaging.

## KH-LES-009

- Статус: `partial`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: medium
- Scope і рівень: `mixed` / `E2`
- Твердження: Repository tree є architectural recommendation, а не Google canonical structure; її мета - відокремити UI, business logic, integrations, background jobs і security.
- Стан реалізації: repository_separation_present_but_not_complete
- Залежності: Official Google structure comparison for the canonicality clause
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-101](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Static architecture inspection.; The repository documents a project-specific module arrangement.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Backend ingress, notifications, polling, Telegram transport, and Gmail operations remain substantially co-located.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; The authenticated mailbox backend is separated from the UI file, but it still combines several provider and state responsibilities.
- Обмеження: The separation objective is partly visible. The statement that this is not a Google canonical structure was not checked against official external documentation.

## KH-LES-010

- Статус: `recommendation`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Apps Script web app має бути thin ingress; heavy synchronous work треба дробити або виносити назовні.
- Стан реалізації: contradicted_by_full_apps_script_backend
- Залежності: External worker architecture; Latency and quota acceptance criteria
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-062](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Apps Script handles ingress, polling, notification scans, Telegram transport, and Gmail actions.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; Apps Script hosts the authenticated mailbox RPC backend, sessions, drafts, provider integrations, and attachment workflows.
- Обмеження: Static source shows a non-thin tracked backend but does not measure synchronous latency or deployed quota behavior.

## KH-LES-011

- Статус: `partial`
- Категорія: `KH-LES`; тип: `lesson`
- Актуальність: high
- Scope і рівень: `governance` / `E2`
- Твердження: Принцип роботи: minimum theory, maximum controlled verification, clear next actions і controlled progress.
- Стан реалізації: controlled_evidence_governance_present
- Залежності: Explicit standing adoption of the complete wording
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-082](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Static inspection on the canonical Instructions branch head.; Standing governance requires reconciliation before live claims and states that report-derived claims do not become live-verified without new evidence.
- Доказ 2: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Static inspection on the canonical Requests branch head.; REQ-0003 records report ingestion without runtime, Gmail, Telegram, Apps Script, or production changes and says report-derived claims did not become authority.
- Обмеження: Canonical governance requires evidence, reconciliation, bounded routing, and status updates, but it does not adopt the complete phrase as a standing rule.

## KH-PERM-001

- Статус: `partial`
- Категорія: `KH-PERM`; тип: `permission`
- Актуальність: permission_governance
- Scope і рівень: `governance` / `E1`
- Твердження: Високоризикові дії допускаються лише після explicit user confirmation; це запропонований permission gate, а не наданий дозвіл.
- Стан реалізації: canonical_overlap_but_owner_request_trace_missing
- Залежності: canonical Повноваження entry; traceable corresponding owner request
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-034](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [permissions/P-004-owner-intervention-boundaries.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/37ef923a0629da4cfd83b9f218561ead73386223/permissions/P-004-owner-intervention-boundaries.md); Compared once with the canonical active record.; P-004 has narrower stop conditions and no traceable REQ-ID.
- Доказ 3: [PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c32075367a0f8b5f0705f46835f28d74c3e0ff41/PERMISSIONS.md); Inspected immutable permission-branch ancestry and commit metadata.; P-001 through P-004 entered history at c320753 without a traceable REQ-ID; P-005 was added later from REQ-0002.
- Доказ 4: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Read once at the immutable REQ-0004 ledger tip.; REQ-0003 records permissions=reference and Permission basis: none; report candidates did not become authority.
- Доказ 5: [requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md); Read once at immutable commit c0ee799.; Requires primary evidence and canonical Повноваження plus a corresponding owner request for permission verification.
- Обмеження: Exact safe missing proof: a canonical request record containing the owner's explicit high-risk confirmation rule and scope, linked from P-004 or a successor.

## KH-PERM-002

- Статус: `recommendation`
- Категорія: `KH-PERM`; тип: `permission`
- Актуальність: future_product_scope
- Scope і рівень: `mixed` / `E2`
- Твердження: Майбутній Telegram surface має дозволяти лише явно обрані дії: priority view, summary, quick reply, task confirmation, snooze і triage; це product-scope candidate, не дозвіл власника.
- Стан реалізації: partially_implemented_nonexclusive_action_set
- Залежності: explicit product-scope decision; action-level UX contract
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-032](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Priority, summary, snooze, and triage markers exist; quick-reply/task-confirmation markers were not found, while archive/trash/spam actions exist.
- Доказ 3: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Read once at the immutable REQ-0004 ledger tip.; REQ-0003 records permissions=reference and Permission basis: none; report candidates did not become authority.
- Обмеження: Future scope is not authority; no rendered UI or runtime action inventory was executed.

## KH-PERM-003

- Статус: `partial`
- Категорія: `KH-PERM`; тип: `permission`
- Актуальність: permission_governance
- Scope і рівень: `governance` / `E1`
- Твердження: Browser/CDP/runtime tools можна розглядати лише після перевірки capability та permissions; це не наданий owner permission.
- Стан реалізації: canonical_browser_grant_asserted_but_owner_request_trace_missing
- Залежності: canonical Повноваження entry; traceable corresponding owner request; capability evidence
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-030](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [permissions/P-001-browser-pc-control.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/37ef923a0629da4cfd83b9f218561ead73386223/permissions/P-001-browser-pc-control.md); Compared once with the canonical active record.; P-001 asserts browser/PC authority but has no REQ-ID and no CDP/runtime capability-check requirement.
- Доказ 3: [PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c32075367a0f8b5f0705f46835f28d74c3e0ff41/PERMISSIONS.md); Inspected immutable permission-branch ancestry and commit metadata.; P-001 through P-004 entered history at c320753 without a traceable REQ-ID; P-005 was added later from REQ-0002.
- Доказ 4: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Read once at the immutable REQ-0004 ledger tip.; REQ-0003 records permissions=reference and Permission basis: none; report candidates did not become authority.
- Доказ 5: [requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md); Read once at immutable commit c0ee799.; Requires primary evidence and canonical Повноваження plus a corresponding owner request for permission verification.
- Обмеження: Exact safe missing proof: the canonical owner request that granted P-001 plus explicit CDP/runtime scope and capability gate.

## KH-PLAN-001

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current delivery method
- Scope і рівень: `repository` / `E1`
- Твердження: Впровадження має бути еволюційним, а не `big bang`.
- Стан реалізації: adopted_incrementally
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-053](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/apps-script/MailApp.html); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds neuroinclusive Focus View across client, server, tests, and design artifacts.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/fa15f11987c1435ca8975594780c8a1d1c91508d/apps-script/Code.gs); Git commit metadata and changed-path inspection.; The commit consolidates product v45 on an immutable Apps Script release lineage.
- Доказ 4: [docs/en/ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ROADMAP.md); Immutable bilingual roadmap inspection.; Versie 1 is the only active version; local fixes, manual OAuth acceptance, immutable staging, promotion, cleanup, tag, and release branch are distinct gates.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-002

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: implemented feature set
- Scope і рівень: `repository` / `E2`
- Твердження: Реліз 1: Focus View, чотирикласовий triage, batching, soft reminders, compassionate copy, cited summary, low-pressure reply.
- Стан реалізації: implemented_statically_with_unverified_runtime
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-054](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 5: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Доказ 6: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Доказ 7: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/apps-script/MailApp.html); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds neuroinclusive Focus View across client, server, tests, and design artifacts.
- Доказ 8: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/5e7c1f70b01814d0cd14a45abcbe6dfa8d2f3efb/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds the trustworthy summary evidence contract.
- Доказ 9: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/d6d105c3140d74888f89d77572f155d1eec941c0/apps-script/Code.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds compassionate account-scoped reminders; a later immutable commit continues them through digest windows.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-003

- Статус: `verified`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: implemented feature set
- Scope і рівень: `repository` / `E2`
- Твердження: Реліз 2: energy modes, backlog rescue, calendar/task extraction, co-processing.
- Стан реалізації: implemented_statically
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-055](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 4: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover replay-resistant sessions, token/state locks, account isolation, Focus, triage, energy/reminders, co-processing, backlog rescue, content-free metrics, URL safety, idempotent send, and scheduled send.
- Доказ 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds energy-aware Focus sessions.
- Доказ 6: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/a41242cc608d1c94edb336eeb4f4c8b00ac1ec67/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds bounded backlog rescue sessions.
- Доказ 7: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/eadcd818f8ce008823aabfd6992efef53ff87572/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds evidence-grounded task and Calendar handoff.
- Доказ 8: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/7413454aa03581dbedaf75eab0e1c38b12e8bf8b/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds private co-processing presence.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-004

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: future personalization
- Scope і рівень: `repository` / `E2`
- Твердження: Реліз 3: персоналізоване навчання за часом доби, униканням, reminder style, triage speed та інформаційною щільністю.
- Стан реалізації: adaptive_density_and_preferences_implemented_without_learning_model
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-056](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Доказ 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/359b8cba5cdcaee9ec022ccd659538a4dd108455/apps-script/MailApp.html); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds adaptive information density.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-005

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current metrics design
- Scope і рівень: `repository` / `E2`
- Твердження: Метрики мають охоплювати time-to-first-action, завершення без повторного відкриття, backlog recovery, resume time, reminder dismissals, overwhelm, guilt, adoption і retention.
- Стан реалізації: content_free_metrics_implemented_for_subset
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-057](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Доказ 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/385f1dc5b2a04091d2bc9c471e52595570c6ee3c/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds private functional-relief metrics.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-PLAN-006

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: outside current scope
- Scope і рівень: `repository` / `E1`
- Твердження: Mailcow deployment: clone, `generate_config.sh`, редагування `mailcow.conf`, `docker compose pull/up`; production-хост має уникати MTU, port і host-service конфліктів.
- Стан реалізації: not_implemented
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-023](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-007

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: outside current scope
- Scope і рівень: `repository` / `E1`
- Твердження: Для Stalwart виділити persistent store, обрати backend, пройти bootstrap і налаштувати domains, TLS, rate limits, spam policy та management API.
- Стан реалізації: not_implemented
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-026](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-008

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current Telegram architecture
- Scope і рівень: `mixed` / `E2`
- Твердження: Telegram flow: BotFather, Main Mini App, Allowed URLs, frontend, backend authentication та linkage між Telegram identity і internal account record.
- Стан реалізації: frontend_backend_identity_linkage_implemented_runtime_configuration_unverified
- Залежності: none
- Конфлікти: CF-002
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-031](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Доказ 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 5: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover replay-resistant sessions, token/state locks, account isolation, Focus, triage, energy/reminders, co-processing, backlog rescue, content-free metrics, URL safety, idempotent send, and scheduled send.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-009

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: outside current scope
- Scope і рівень: `repository` / `E1`
- Твердження: Single-node/MVP: Stalwart + RocksDB або default Mailcow, file/S3 blobs, Redis ephemeral state і базовий search стека.
- Стан реалізації: not_implemented
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-053](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-010

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: future scaling outside current scope
- Scope і рівень: `repository` / `E1`
- Твердження: Mid-scale/multi-tenant: PostgreSQL metadata, S3/MinIO blobs, Redis locks/queues/rate/session/cache та окремий search backend за потреби.
- Стан реалізації: not_implemented
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-054](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-011

- Статус: `contradicted`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: superseded by current Gmail-centric mission
- Scope і рівень: `mixed` / `E2`
- Твердження: Цільова layered architecture: Stalwart/Mailcow core, власний integration facade, AI/task workers та smart web/mobile clients.
- Стан реалізації: not_current_architecture
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: CF-006
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-071](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Доказ 5: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-012

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: outside current Gmail-centric scope
- Scope і рівень: `repository` / `E1`
- Твердження: Етап 1: зафіксувати protocol contract, обрати core, підняти reference deployment з SPF/DKIM/DMARC/MTA-STS/TLS-RPT, backups, logs і monitoring, потім API/BFF і clients.
- Стан реалізації: not_implemented
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-072](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-013

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: partly current
- Scope і рівень: `repository` / `E2`
- Твердження: Етап 2: Gmail API, Microsoft Graph, Telegram Bot/Mini App, storage adapters і consent/privacy module; Apps Script/add-on опційно.
- Стан реалізації: gmail_telegram_storage_implemented_graph_and_standalone_consent_module_absent
- Залежності: phase 4 Gmail contextual MVP
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-074](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 5: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 6: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; Presence or absence is established only for the assigned immutable commit.

## KH-PLAN-014

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: partly current
- Scope і рівень: `repository` / `E2`
- Твердження: Етап 3: ADHD-first smart surface з quick actions, deadline risk, waiting, later, filtered і energy-required queues.
- Стан реалізації: focus_quick_actions_and_triage_implemented_full_queue_set_not_proven
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-075](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-015

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: outside current scope
- Scope і рівень: `repository` / `E1`
- Твердження: Quick MVP stack: Mailcow core, Roundcube/custom web shell, bundled Rspamd, integration service, Redis jobs, ADHD shell та AI triage.
- Стан реалізації: not_implemented
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-076](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-016

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: outside current scope
- Scope і рівень: `repository` / `E1`
- Твердження: Long modern stack: Stalwart core, Bulwark як reference/temporary client, own orchestration, PostgreSQL/scale backend, S3/MinIO, Redis, custom clients.
- Стан реалізації: not_implemented
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-077](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-017

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: outside current scope
- Scope і рівень: `repository` / `E1`
- Твердження: Predictability stack: Postfix + Dovecot + Rspamd + OpenDKIM/OpenDMARC/OpenARC + Roundcube + optional DAV server; найбільше integration work.
- Стан реалізації: not_implemented
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-078](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-018

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current audit
- Scope і рівень: `repository` / `E2`
- Твердження: Підготувати й виконати repository audit щодо security, OAuth, state, locking, webhooks, MIME, logging і secrets, завершивши patch plan.
- Стан реалізації: multiple_static_audits_and_fixes_exist_complete_patch_plan_not_proven
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-028](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-088](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Immutable tree and history inspection only; audit prose was not accepted as proof by repetition.; Multiple audit artifacts exist, disproving repository unavailability but not proving a complete runtime audit.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 5: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No value-level secret scan of protected stores or full historical blobs was performed.

## KH-PLAN-019

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current release engineering
- Scope і рівень: `repository` / `E2`
- Твердження: Побудувати release flow із `clasp`, Git branching, GitHub Actions, versioning, deployment, rollback, smoke tests і security scanning.
- Стан реалізації: local_release_and_rollback_implemented_ci_smoke_security_lanes_absent
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-029](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Доказ 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Local git show-ref, tag, branch, merge-base, and divergence inspection at the assigned commit.; The active local and origin Versie branch matched the assigned commit; no tag or release/versie-001 ref existed, and main was on a divergent publication lineage.
- Доказ 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Доказ 5: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; GitHub server-side security settings were not read.

## KH-PLAN-020

- Статус: `verified`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current architecture
- Scope і рівень: `repository` / `E2`
- Твердження: Підготувати architecture v1.
- Стан реалізації: architecture_contract_present_and_reflected_in_code
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-086](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Доказ 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Доказ 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-021

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: future scaling
- Scope і рівень: `repository` / `E1`
- Твердження: Підготувати architecture v2 expansion path.
- Стан реалізації: future_partitioned_storage_path_documented_without_separate_v2_artifact
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-087](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-022

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current security
- Scope і рівень: `repository` / `E2`
- Твердження: Підготувати security hardening plan.
- Стан реалізації: controls_and_audit_artifacts_exist_no_single_complete_plan_proven
- Залежності: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-089](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 6: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Immutable tree and history inspection only; audit prose was not accepted as proof by repetition.; Multiple audit artifacts exist, disproving repository unavailability but not proving a complete runtime audit.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No value-level secret scan of protected stores or full historical blobs was performed.

## KH-PLAN-023

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current release gates
- Scope і рівень: `repository` / `E1`
- Твердження: Підготувати конкретний checklist запуску MVP за 7-14 днів.
- Стан реалізації: concrete_versie1_gates_exist_without_7_14_day_commitment
- Залежності: phase 2 neuroinclusive contract; phase 3 reference platform path
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-090](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ROADMAP.md); Immutable bilingual roadmap inspection.; Versie 1 is the only active version; local fixes, manual OAuth acceptance, immutable staging, promotion, cleanup, tag, and release branch are distinct gates.
- Доказ 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Immutable release-article inspection; prose was treated as a claim unless corroborated by code or Git metadata.; Versie 1 is explicitly in progress and not promoted, tagged, or represented by a release branch; production acceptance remains incomplete.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-024

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current release gates
- Scope і рівень: `repository` / `E2`
- Твердження: Підготувати concrete production-hardening checklist.
- Стан реалізації: guarded_release_steps_exist_without_complete_production_hardening_checklist
- Залежності: phase 4 Gmail contextual MVP; phase 5 automation and Telegram; phase 6 security and release hardening
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-091](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Доказ 3: [apps-script/tests/release_versie_001_20260719.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/release_versie_001_20260719.test.js); Exact static test-definition inspection only; tests were not executed.; Definitions pin rollback/staging/candidate versions and assert current bundle hashes against the release helper.
- Доказ 4: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Immutable release-article inspection; prose was treated as a claim unless corroborated by code or Git metadata.; Versie 1 is explicitly in progress and not promoted, tagged, or represented by a release branch; production acceptance remains incomplete.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-025

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current tooling
- Scope і рівень: `repository` / `E1`
- Твердження: Local setup: створити окремий Cloud project, увімкнути Apps Script API, виконати `clasp login`, потім `clasp create` або `clasp clone`, після чого вести код у Git.
- Стан реалізації: git_and_clasp_release_artifacts_present_cloud_setup_not_proven
- Залежності: phase 2 neuroinclusive contract; phase 3 reference platform path
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-098](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Exact deployment-filter inspection.; Only the manifest and four Apps Script implementation files are included in the clasp source bundle.
- Доказ 3: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Доказ 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-026

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current CI gap
- Scope і рівень: `repository` / `E1`
- Твердження: CI/CD має використовувати protected `CLASPRC_JSON` і `.clasp.json` у GitHub Actions без включення credential value в repository.
- Стан реалізації: not_implemented_in_workflows
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-099](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Доказ 3: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Доказ 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; GitHub server-side security settings were not read.

## KH-PLAN-027

- Статус: `contradicted`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current repository layout
- Scope і рівень: `repository` / `E1`
- Твердження: Proposed tree розділяє `appsscript.json`, `src/addon`, `src/core`, `src/integrations`, `src/web`, `src/jobs`, `src/security`, `tests` і `.github/workflows/deploy.yml`.
- Стан реалізації: repository_uses_flat_apps_script_bundle_and_no_deploy_workflow
- Залежності: phase 2 neuroinclusive contract; phase 3 reference platform path
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-100](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Доказ 3: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Exact deployment-filter inspection.; Only the manifest and four Apps Script implementation files are included in the clasp source bundle.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.

## KH-PLAN-028

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current private pilot and future public release
- Scope і рівень: `mixed` / `E2`
- Твердження: Розділити scope strategy на internal/private/workspace-only MVP і public production з мінімізованими scopes та verification package.
- Стан реалізації: private_owner_scope_established_public_verification_package_not_proven
- Залежності: explicit owner scope decision; canonical permission and instruction reconciliation
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-104](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; GitHub server-side security settings were not read.

## KH-PLAN-029

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current manifest
- Scope і рівень: `repository` / `E2`
- Твердження: Починати з вузьких context/label/draft/send scopes; для `UrlFetchApp` додати explicit external-request scope лише коли він потрібен.
- Стан реалізації: gmail_modify_without_full_mail_and_required_external_request_present
- Залежності: phase 2 neuroinclusive contract; phase 3 reference platform path
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-105](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Доказ 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-030

- Статус: `contradicted`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current event architecture
- Scope і рівень: `repository` / `E2`
- Твердження: Event flow: mailbox change -> `watch` -> Pub/Sub -> Cloud Run consumer -> normalize/dedupe -> enqueue/call Apps Script -> update labels, digest, task state і Telegram output.
- Стан реалізації: apps_script_polling_webhook_and_gmail_history_used_instead
- Залежності: phase 4 Gmail contextual MVP
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-113](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; Presence or absence is established only for the assigned immutable commit.

## KH-PLAN-031

- Статус: `verified`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current release tooling
- Scope і рівень: `repository` / `E2`
- Твердження: Використовувати `clasp` та immutable versions/deployments для release і rollback.
- Стан реалізації: implemented_statically
- Залежності: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-050](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Доказ 3: [apps-script/tests/release_versie_001_20260719.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/release_versie_001_20260719.test.js); Exact static test-definition inspection only; tests were not executed.; Definitions pin rollback/staging/candidate versions and assert current bundle hashes against the release helper.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-032

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current CI gap
- Scope і рівень: `repository` / `E1`
- Твердження: Додати GitHub CodeQL.
- Стан реалізації: not_implemented_at_commit
- Залежності: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-051](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Доказ 3: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; GitHub server-side security settings were not read.

## KH-PLAN-033

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current external setting gap
- Scope і рівень: `mixed` / `E1`
- Твердження: Увімкнути secret scanning із першого дня.
- Стан реалізації: not_proven
- Залежності: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-052](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Доказ 3: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; GitHub server-side security settings were not read.; No value-level secret scan of protected stores or full historical blobs was performed.; The exact safe missing proof is a read-only GitHub security-settings readback showing secret scanning enabled for this repository.

## KH-PLAN-034

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current CI gap
- Scope і рівень: `repository` / `E1`
- Твердження: Додати Dependabot для dependency alerts та updates.
- Стан реалізації: no_dependabot_configuration_at_commit
- Залежності: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-053](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Доказ 3: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; GitHub server-side security settings were not read.

## KH-PLAN-035

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current CI gap
- Scope і рівень: `repository` / `E1`
- Твердження: CI має включати lint, manifest validation, dry-run push, staging smoke test і separate security lane.
- Стан реалізації: not_implemented_in_current_workflows
- Залежності: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-054](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Доказ 3: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Доказ 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-036

- Статус: `contradicted`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: outdated current-state claim
- Scope і рівень: `mixed` / `E2`
- Твердження: Фактичний audit репозиторію не виконано через непідтверджену доступність/індексацію; наведено лише audit plan.
- Стан реалізації: repository_available_and_static_audit_evidence_present
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-055](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [KNOWLEDGE_HUB.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/4bd94b5a589182ece0c25e086486decec6d5e5da/KNOWLEDGE_HUB.md); Immutable canonical main-branch governance inspection.; The hub is explicitly report-derived baseline, not production-state evidence; Requests, Instructions, Permissions, and the active Versie are separate canonical areas.
- Доказ 3: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Immutable canonical Instructions-branch inspection.; Report-derived claims require new evidence and must be reconciled with current PROJECT, ROADMAP, or ISSUES before live assertions.
- Доказ 4: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Immutable tree and history inspection only; audit prose was not accepted as proof by repetition.; Multiple audit artifacts exist, disproving repository unavailability but not proving a complete runtime audit.
- Доказ 5: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Current evidence cannot prove what the earlier report author could access at the report date.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-037

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current audit method
- Scope і рівень: `repository` / `E2`
- Твердження: Першим перевірити `appsscript.json`: Gmail scopes, `script.external_request`, triggers, capability boundaries і separation add-on/web app.
- Стан реалізації: manifest_inspected_in_this_stream
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-056](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-038

- Статус: `recommendation`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current security audit
- Scope і рівень: `repository` / `E2`
- Твердження: Перевірити code і Git history на hardcoded secret classes, direct webhook URLs, private identifiers у fixtures і full request/response logging.
- Стан реалізації: current_files_inspected_full_value_level_history_scan_not_performed
- Залежності: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-058](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 5: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Доказ 6: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Static inspection with all values redacted.; The public helper contains environment-specific project/deployment identifiers and a machine-local recovery-path literal; no value is reproduced in this report.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No value-level secret scan of protected stores or full historical blobs was performed.; Presence or absence is established only for the assigned immutable commit.

## KH-PLAN-039

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current concurrency audit
- Scope і рівень: `repository` / `E2`
- Твердження: Перевірити lock discipline для state, queues, checkpoints, send operations, Telegram calls і token refresh.
- Стан реалізації: many_lock_paths_present_gmail_refresh_local_lock_gap_remains
- Залежності: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-060](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Доказ 5: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover replay-resistant sessions, token/state locks, account isolation, Focus, triage, energy/reminders, co-processing, backlog rescue, content-free metrics, URL safety, idempotent send, and scheduled send.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No concurrent execution or race reproduction was performed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-040

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current webhook security
- Scope і рівень: `repository` / `E2`
- Твердження: Для webhook ingress перевірити signature/token validation, allowed methods, idempotency, dedupe і відсутність production debug output.
- Стан реалізації: token_validation_and_dedupe_present_debug_output_absence_not_runtime_proven
- Залежності: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-061](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-041

- Статус: `verified`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current repository audit
- Scope і рівень: `repository` / `E2`
- Твердження: `Repo discovery`: manifest, scopes, deployment config, workflows, README, release notes, secrets usage.
- Стан реалізації: completed_for_assigned_commit
- Залежності: phase 0 authority reconciliation
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-073](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Доказ 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Доказ 5: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Immutable release-article inspection; prose was treated as a claim unless corroborated by code or Git metadata.; Versie 1 is explicitly in progress and not promoted, tagged, or represented by a release branch; production acceptance remains incomplete.
- Доказ 6: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No value-level secret scan of protected stores or full historical blobs was performed.; Presence or absence is established only for the assigned immutable commit.

## KH-PLAN-042

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current OAuth audit
- Scope і рівень: `mixed` / `E2`
- Твердження: `OAuth trace`: redirect URI, consent screen, scopes, token errors і races.
- Стан реалізації: static_redirect_scope_state_and_refresh_trace_completed_runtime_trace_missing
- Залежності: phase 0 authority reconciliation
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-074](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Доказ 3: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Exact immutable callback-relay inspection; environment-specific endpoint value omitted.; The relay clears the query from browser history, validates bounded state and code, forwards only action/state/code, and fails closed on malformed input.
- Доказ 4: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 5: [apps-script/tests/oauth_callback_bridge.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/oauth_callback_bridge.test.js); Exact static test-definition inspection only; tests were not executed.; The contract permits only one-use state/code forwarding and excludes authuser, prompt, scope, iss, browser storage, and console logging.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No concurrent execution or race reproduction was performed.

## KH-PLAN-043

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current UI audit
- Scope і рівень: `repository` / `E2`
- Твердження: `Gmail UI trace`: homepage, context cards, compose, empty states і error cards.
- Стан реалізації: static_ui_trace_completed_rendered_behavior_unverified
- Залежності: phase 0 authority reconciliation
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-075](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Доказ 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-PLAN-044

- Статус: `blocked`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current runtime evidence gap
- Scope і рівень: `runtime` / `E2`
- Твердження: `Network trace`: external calls, response codes, retries, duplicates і latency.
- Стан реалізації: static_call_paths_only
- Залежності: phase 0 authority reconciliation
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-076](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; The exact safe missing proof is a read-only staging network trace tied to this commit showing redacted endpoint class, response code, retry and deduplication outcome, and latency.

## KH-PLAN-045

- Статус: `blocked`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current runtime evidence gap
- Scope і рівень: `runtime` / `E2`
- Твердження: `Runtime trace`: execution logs, disabled triggers, retry loops, continuation state і `historyId`.
- Стан реалізації: static_continuation_and_history_paths_only
- Залежності: phase 0 authority reconciliation
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-077](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 3: [docs/en/ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ROADMAP.md); Immutable bilingual roadmap inspection.; Versie 1 is the only active version; local fixes, manual OAuth acceptance, immutable staging, promotion, cleanup, tag, and release branch are distinct gates.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; The exact safe missing proof is a read-only Apps Script execution-log and trigger snapshot tied to the immutable deployment and commit, including retry, continuation, and historyId state with private values redacted.

## KH-PLAN-046

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current release evidence gap
- Scope і рівень: `mixed` / `E2`
- Твердження: `Release trace`: staging/prod separation, rollback, log privacy, CodeQL і secret scanning.
- Стан реалізації: release_and_rollback_static_paths_present_security_services_and_runtime_separation_unproven
- Залежності: phase 4 Gmail contextual MVP; phase 5 automation and Telegram; phase 6 security and release hardening
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-078](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Доказ 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Local git show-ref, tag, branch, merge-base, and divergence inspection at the assigned commit.; The active local and origin Versie branch matched the assigned commit; no tag or release/versie-001 ref existed, and main was on a divergent publication lineage.
- Доказ 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Доказ 5: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Доказ 6: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Immutable release-article inspection; prose was treated as a claim unless corroborated by code or Git metadata.; Versie 1 is explicitly in progress and not promoted, tagged, or represented by a release branch; production acceptance remains incomplete.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; GitHub server-side security settings were not read.; No value-level secret scan of protected stores or full historical blobs was performed.

## KH-PLAN-047

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current neuroinclusive UX
- Scope і рівень: `repository` / `E2`
- Твердження: `UX trace`: primary CTA count, digest tone, quiet mode і non-shaming backlog.
- Стан реалізації: static_contracts_present_behavioral_acceptance_missing
- Залежності: phase 0 authority reconciliation; phase 1 evidence and foundation audit; phase 6 security and release hardening
- Конфлікти: CF-001
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-079](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Доказ 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-PLAN-048

- Статус: `partial`
- Категорія: `KH-PLAN`; тип: `plan`
- Актуальність: current acceptance gap
- Scope і рівень: `mixed` / `E2`
- Твердження: Acceptance artifacts: scopes, endpoint map, state diagram, concurrency hotspots, privacy-exposure locations, OAuth reproduction, UI evidence і before/after patch plan.
- Стан реалізації: several_artifacts_present_complete_package_not_proven
- Залежності: phase 4 Gmail contextual MVP; phase 5 automation and Telegram; phase 6 security and release hardening
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-081](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Доказ 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Доказ 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Доказ 5: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Exact immutable callback-relay inspection; environment-specific endpoint value omitted.; The relay clears the query from browser history, validates bounded state and code, forwards only action/state/code, and fails closed on malformed input.
- Доказ 6: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Доказ 7: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Immutable tree and history inspection only; audit prose was not accepted as proof by repetition.; Multiple audit artifacts exist, disproving repository unavailability but not proving a complete runtime audit.
- Обмеження: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No value-level secret scan of protected stores or full historical blobs was performed.

## KH-PROD-001

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: AI має перетворювати лист на наступний крок, чернетку, нагадування, задачу або відкладену дію.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-006](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Доказ 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Доказ 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Доказ 6: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Обмеження: Static code supports summaries, next actions, drafts, reminders, tasks, and deferral, but it does not prove model quality or successful end-to-end behavior.

## KH-PROD-002

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Надати енерго- й контекстно-залежні часові режими, оцінку зусиль і ризик дедлайну.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-011; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-011](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-016](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-037](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-064](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-011](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Обмеження: Energy/focus state and heuristic deadline/risk extraction are present; calibrated effort estimates and context-aware timing are not fully established by static inspection.

## KH-PROD-003

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Групувати пошту в керовані сесії та залишати окремий канал для справді термінових сигналів.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-011; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-015](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-069](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-015](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Обмеження: Managed focus sessions and an urgent-only preference exist, but a distinct emergency channel and its runtime routing were not proven.

## KH-PROD-004

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `mixed` / `E2`
- Твердження: Винагороджувати конкретні малі завершення без азартних механік, об'ємних цілей або штрафів за streak.
- Стан реалізації: implemented
- Залежності: KH-DEP-011
- Конфлікти: CF-005
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-017](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-044](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-067](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-017](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected resetGentleMilestones, recordGentleMilestone, and renderGentleMilestoneCard.; A dismissible gentle-milestone UI records small completion events; no streak or gambling mechanism was identified in the selected source.
- Обмеження: The gentle-milestone code supports small completion acknowledgements and no streak mechanism was identified, but absence of manipulative effects requires UX review.

## KH-PROD-005

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `mixed` / `E2`
- Твердження: У режимі старту або низької енергії показувати лише кілька найменших досяжних дій без сорому.
- Стан реалізації: implemented
- Залежності: KH-DEP-011; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-021](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-063](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-008](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Обмеження: Low-energy focus and bounded action surfaces are present; the no-shame outcome and action suitability need accessibility/usability acceptance evidence.

## KH-PROD-006

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Для нерішучості потрібні готові рішення: `Reply later`, `Convert to task`, `Ask AI for draft`, `Archive with reminder`.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-023](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected evidence-grounded task title and Calendar suggestion construction.; Task and Calendar handoff suggestions are derived from message evidence; the backend explicitly avoids inventing dates or creating Calendar objects.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected task/calendar evidence rendering and calendar handoff URL construction.; The UI exposes task and Calendar handoff actions.
- Доказ 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Доказ 6: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Обмеження: Reply/defer, task handoff, archive/snooze, and draft flows exist; the exact four-option contract, especially `Ask AI for draft`, was not established.

## KH-PROD-007

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Фокус-поверхня має бути низькощільною, одно-колонковою або картковою й не імітувати повний поштовий клієнт.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-011
- Конфлікти: CF-001
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-035](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-066](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-107](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected folders, threads, compose, attachments, labels, focus, and adaptive-density UI.; The repository implements a broad mail web app with an optional focused/adaptive surface, not only a minimal card surface.
- Обмеження: Adaptive low-density focus UI exists, but it is embedded in a broad full mail client; whether the focus surface feels distinct requires rendered UX evidence.

## KH-PROD-008

- Статус: `verified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: `Resume Rail`: остання розмова, точка зупинки та автозбереження position/state/partial triage.
- Стан реалізації: implemented
- Залежності: KH-DEP-015; KH-DEP-018
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-036](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected normalizeResumeRail, buildResumeRail, lifecycle autosave, and session-bar functions.; Resume Rail and best-effort autosave code preserve selected UI/session state.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected attention resume state and persisted session-family functions.; Backend state supports resumption and session continuity.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-009

- Статус: `unverified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: medium
- Scope і рівень: `repository` / `E1`
- Твердження: `Start Button`: почати з одного речення, summary, рішення або перенесення дати.
- Стан реалізації: unknown
- Залежності: KH-DEP-011
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-038](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The selected implementation inventory did not establish a dedicated `Start Button` contract; adjacent summary and next-action controls are not equivalent proof.

## KH-PROD-010

- Статус: `verified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Використовувати тихі, безосудні нагадування та digest із невеликою кількістю найважливіших листів.
- Стан реалізації: implemented
- Залежності: KH-DEP-011; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-039](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-045](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-065](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-013](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-016](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-011

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Маршрутизувати листи у кілька широких станів дії, очікування, довідки та пізніше.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-040](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-014](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Обмеження: Archive/inbox, snooze/later, labels, and action state exist; the exact action/waiting/reference/later taxonomy is not fully represented.

## KH-PROD-012

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: `Cited Summary`: summary, три ключові джерельні речення та блок `who/what/when/next-action`.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-041](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Обмеження: Evidence fragments and action/deadline/amount/risk metadata exist, but exactly three sentences and the complete `who/what/when/next-action` schema were not established.

## KH-PROD-013

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: `Trust Layer`: AI-label, confidence band, показ джерел і підтвердження high-risk claims.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-042](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Обмеження: An automated-AI label, evidence source, and risk heuristics exist; a calibrated confidence band and explicit high-risk confirmation gate were not fully established.

## KH-PROD-014

- Статус: `verified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Надавати короткі, енерго-залежні шаблони відповіді та кероване відкладене надсилання без копіювання приватного вмісту.
- Стан реалізації: implemented
- Залежності: KH-DEP-013; KH-DEP-015
- Конфлікти: CF-004
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-043](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-068](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-035](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Доказ 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected HTML/style/label/attachment sanitizers and source-fragment bounds.; The backend contains explicit sanitization, bounded evidence fragments, and owner/session authorization checks.
- Доказ 6: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inspected CSP, referrer policy, state/code validation, and query removal.; The callback relay minimizes retained OAuth response data and rejects malformed input.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-015

- Статус: `verified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Надати короткий co-processing/body-doubling режим, орієнтований на одну дію без дублювання приватного вмісту.
- Стан реалізації: implemented
- Залежності: KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-046](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-040](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected mailboxCoProcessingSession_ and presence normalization/DTO functions.; Private 10- or 25-minute co-processing sessions are implemented as account-scoped presence state.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected co-processing card, clock, disclosure, and session controls.; A dedicated one-action co-processing surface is present.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected HTML/style/label/attachment sanitizers and source-fragment bounds.; The backend contains explicit sanitization, bounded evidence fragments, and owner/session authorization checks.
- Доказ 4: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inspected CSP, referrer policy, state/code validation, and query removal.; The callback relay minimizes retained OAuth response data and rejects malformed input.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-016

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: `Neuroinclusive onboarding`: три кроки, прогрес, sticky summary, magic link/passkeys і стабільне розташування help.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-011; KH-DEP-019
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-047](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding preference, rendering, focus isolation, choice, and completion functions.; A multi-step neuroinclusive onboarding flow with progress/preferences and reachable help UI is present; no passkey or magic-link implementation was established.
- Доказ 2: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inspected the sanitized OAuth callback relay page.; The connection flow is OAuth callback based, not a magic-link or passkey flow.
- Обмеження: Multi-step onboarding and stable help are present; no magic-link or passkey implementation was found, and sticky-summary behavior was not fully established.

## KH-PROD-017

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: Візуальні якорі: timeline треду, статус-стікери, прогрес сесії та pinned next step.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-011
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-049](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Доказ 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Обмеження: Session progress, thread-state labels, and next-action controls exist; a complete thread timeline and pinned-next-step contract were not established.

## KH-PROD-018

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Поєднати детерміновані правила, статистичне оцінювання та AI для відсікання шуму, summary й action extraction.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-050](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-048](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Доказ 3: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: Deterministic rules and heuristic scores are implemented, but no statistical-model or external AI dependency/declaration was found; the `automated-ai-analysis` label alone is not proof of AI.

## KH-PROD-019

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Календарні й task-based листи мають пропонувати подію, нагадування або чекліст.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-051](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected evidence-grounded task title and Calendar suggestion construction.; Task and Calendar handoff suggestions are derived from message evidence; the backend explicitly avoids inventing dates or creating Calendar objects.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected task/calendar evidence rendering and calendar handoff URL construction.; The UI exposes task and Calendar handoff actions.
- Обмеження: Evidence-grounded task and Calendar handoff are present; reminder/checklist coverage and end-to-end creation are not proven.

## KH-PROD-020

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `mixed` / `E2`
- Твердження: AI-асистент має адаптувати summary, action scaffolding і автоматизацію до енергії без окремого шумного чат-інтерфейсу.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-052](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-070](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Доказ 5: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: Energy-aware scaffolding and non-chat UI are present; actual AI adaptation and outcome quality are not established by static source.

## KH-PROD-021

- Статус: `blocked`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `mixed` / `E2`
- Твердження: Цільова концепція: пошта бере на себе частину виконавчої функції, зменшує шум, пояснює пріоритет, зберігає контекст і декомпонує роботу.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-011; KH-DEP-013; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-063](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Доказ 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected normalizeResumeRail, buildResumeRail, lifecycle autosave, and session-bar functions.; Resume Rail and best-effort autosave code preserve selected UI/session state.
- Доказ 6: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected attention resume state and persisted session-family functions.; Backend state supports resumption and session continuity.
- Обмеження: Safe missing proof: a read-only acceptance or usability result tied to the pinned commit demonstrating reduced noise, understandable priority, preserved context, and successful work decomposition.

## KH-PROD-022

- Статус: `recommendation`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `mixed` / `E1`
- Твердження: Модульна траєкторія: Postfix + Dovecot + окремі antispam, DKIM/DMARC/ARC, webmail і DAV-компоненти.
- Стан реалізації: not_implemented
- Залежності: Postfix; Dovecot; antispam; DAV
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-003](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-023

- Статус: `recommendation`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `mixed` / `E1`
- Твердження: Інтегрована container-траєкторія: Mailcow або Docker Mailserver для швидкого запуску з меншим glue-code.
- Стан реалізації: not_implemented
- Залежності: Mailcow; Docker Mailserver
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-004](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-024

- Статус: `recommendation`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `mixed` / `E1`
- Твердження: All-in-one траєкторія: Stalwart, а в окремих сценаріях Maddy або Apache James; Stalwart є modern-first кандидатом.
- Стан реалізації: not_implemented
- Залежності: Stalwart; Maddy; Apache James
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-005](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-025

- Статус: `recommendation`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `mixed` / `E1`
- Твердження: Додати Thunderbird autoconfig XML і стежити за IETF auto-configuration для зменшення onboarding friction.
- Стан реалізації: not_implemented
- Залежності: Thunderbird autoconfig; IETF auto-configuration
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-012](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-026

- Статус: `unverified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `external` / `E1`
- Твердження: Postfix + Dovecot дають зрілий SMTP/IMAP/POP3 стек; caveat: Dovecot CE описано як single-server edition.
- Стан реалізації: not_applicable
- Залежності: Postfix; Dovecot
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-014](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-027

- Статус: `unverified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `external` / `E1`
- Твердження: Mailcow інтегрує Postfix, Dovecot, Rspamd, Redis, MariaDB, SOGo, Nginx і ACME; caveat: важкий багатоконтейнерний bundle.
- Стан реалізації: not_applicable
- Залежності: Mailcow
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-015](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-028

- Статус: `unverified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `external` / `E1`
- Твердження: Stalwart об’єднує JMAP, IMAP, POP3, SMTP, CalDAV, CardDAV і WebDAV; caveat: великий control surface.
- Стан реалізації: not_applicable
- Залежності: Stalwart
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-016](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-029

- Статус: `unverified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `external` / `E1`
- Твердження: Docker Mailserver є простішим container-first mail server без SQL, але має менше integrated groupware можливостей.
- Стан реалізації: not_applicable
- Залежності: Docker Mailserver
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-017](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-030

- Статус: `unverified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `external` / `E1`
- Твердження: Maddy є легким all-in-one SMTP+IMAP сервером із меншим glue-code, але меншою екосистемою інтеграцій.
- Стан реалізації: not_applicable
- Залежності: Maddy
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-018](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-031

- Статус: `unverified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `external` / `E1`
- Твердження: Cyrus IMAP і Apache James придатні для enterprise/JMAP/scale сценаріїв, але потребують більшої операційної дисципліни.
- Стан реалізації: not_applicable
- Залежності: Cyrus IMAP; Apache James
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-019](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-032

- Статус: `unverified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `external` / `E1`
- Твердження: Stalwart використовує мінімальний `config.json`, data-store configuration, WebUI/CLI, bootstrap і recovery modes; модель підтримує wizard/declarative/multi-tenant control.
- Стан реалізації: not_applicable
- Залежності: Stalwart
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-025](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-033

- Статус: `verified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Apps Script/GmailApp/Gmail API дають low-code шлях для Google Workspace automation і прототипування.
- Стан реалізації: implemented
- Залежності: Gmail API v1; Apps Script
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-027](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Доказ 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-034

- Статус: `recommendation`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `external` / `E1`
- Твердження: Postfix `postscreen` є рекомендованим first perimeter layer до content filtering.
- Стан реалізації: not_implemented
- Залежності: Postfix
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-035](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-035

- Статус: `recommendation`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: low
- Scope і рівень: `external` / `E1`
- Твердження: Webmail candidates: Roundcube для classic/plugin IMAP, SnappyMail для lightweight UI, Nextcloud Mail для suite integration, Bulwark для JMAP/Stalwart.
- Стан реалізації: not_implemented
- Залежності: Roundcube; SnappyMail; Nextcloud Mail; Bulwark
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-043](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-036

- Статус: `recommendation`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: medium
- Scope і рівень: `mixed` / `E1`
- Твердження: Delivery clients: web/PWA + service workers/VAPID, React Native або Flutter + APNs/FCM, Tauri або Electron для desktop.
- Стан реалізації: partially_implemented
- Залежності: PWA; VAPID; React Native; Flutter; Tauri; Electron
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-051](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: A web app exists, but the listed PWA push, native-mobile, and desktop-framework dependencies are not declared. The broader technology choice remains a recommendation.

## KH-PROD-037

- Статус: `unverified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: medium
- Scope і рівень: `repository` / `E2`
- Твердження: Gmail add-on є контекстною картковою поверхнею для швидкого triage.
- Стан реалізації: not_implemented
- Залежності: KH-DEP-011
- Конфлікти: CF-001
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-018](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-092](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Обмеження: The active manifest declares only a web app and no Gmail add-on configuration; external Gmail add-on capability was not independently verified.

## KH-PROD-038

- Статус: `verified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Web app є Flow Layer для dashboard, backlog, rules, focus та energy modes.
- Стан реалізації: implemented
- Залежності: KH-DEP-011; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-019](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-093](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected folders, threads, compose, attachments, labels, focus, and adaptive-density UI.; The repository implements a broad mail web app with an optional focused/adaptive surface, not only a minimal card surface.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-039

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: `Automation Layer`: `watch`, `history.list`, queue/worker та Apps Script orchestration.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013; KH-DEP-015; KH-DEP-018
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-020](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Доказ 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Доказ 4: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: Apps Script history synchronization, property-backed work ledgers, retries, and triggers exist; Gmail `watch`, Pub/Sub ingress, and an external worker are not declared.

## KH-PROD-040

- Статус: `unverified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: medium
- Scope і рівень: `governance` / `E1`
- Твердження: Цільова аудиторія включає користувачів з ADHD, executive dysfunction і частою коморбідною депресією.
- Стан реалізації: unknown
- Залежності: none
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-023](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Обмеження: Production code can embody neuroinclusive patterns but cannot establish audience demographics, diagnoses, or comorbidity claims; no independent primary evidence was accessed.

## KH-PROD-041

- Статус: `blocked`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `mixed` / `E2`
- Твердження: Мінімізувати cognitive load, decision fatigue, notification overwhelm і task paralysis.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-001; KH-DEP-011
- Конфлікти: CF-003
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-024](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Доказ 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus-visible styles, dialog focus traps, isolation helpers, accessible controls, and reduced-density UI structure.; Static accessibility primitives exist, but conformance and cognitive-accessibility outcomes require an audit and acceptance evidence.
- Обмеження: Safe missing proof: an accessibility/usability acceptance artifact tied to the pinned commit measuring cognitive load, decision fatigue, notification overwhelm, and task-paralysis outcomes.

## KH-PROD-042

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Gmail integration повинна підтримувати UI triage, near-real-time `watch/history` і подальше Telegram/dashboard expansion.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013; KH-DEP-015; KH-DEP-018
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-027](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram update validation/routing, callback handling, Bot API requests, digest/cards, browsing, and menu functions.; The repository contains an owner-scoped Telegram Bot API control plane with short actions and message cards.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected folders, threads, compose, attachments, labels, focus, and adaptive-density UI.; The repository implements a broad mail web app with an optional focused/adaptive surface, not only a minimal card surface.
- Обмеження: UI triage, Gmail history synchronization, Telegram, and dashboard-like web UI exist; `watch`/Pub/Sub near-real-time delivery is not declared or proven.

## KH-PROD-043

- Статус: `verified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Telegram Bot API є зовнішнім short-command і digest control surface.
- Стан реалізації: implemented
- Залежності: Telegram Bot API
- Конфлікти: CF-002
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-097](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram update validation/routing, callback handling, Bot API requests, digest/cards, browsing, and menu functions.; The repository contains an owner-scoped Telegram Bot API control plane with short actions and message cards.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-044

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Перший card level: one-line AI summary, type icon і estimated effort.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-013
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-108](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Обмеження: Card summaries and visual metadata exist; an actual AI model and calibrated estimated effort were not established.

## KH-PROD-045

- Статус: `verified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Другий card level: три actions - quick reply, defer, convert to task.
- Стан реалізації: implemented
- Залежності: KH-DEP-013; KH-DEP-015
- Конфлікти: CF-001
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-109](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected evidence-grounded task title and Calendar suggestion construction.; Task and Calendar handoff suggestions are derived from message evidence; the backend explicitly avoids inventing dates or creating Calendar objects.
- Доказ 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected task/calendar evidence rendering and calendar handoff URL construction.; The UI exposes task and Calendar handoff actions.
- Доказ 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Доказ 6: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-046

- Статус: `verified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Третій card level: collapsed metadata, thread details, attachments і labels.
- Стан реалізації: implemented
- Залежності: KH-DEP-013
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-110](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected folders, threads, compose, attachments, labels, focus, and adaptive-density UI.; The repository implements a broad mail web app with an optional focused/adaptive surface, not only a minimal card surface.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-047

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Gmail homepage має показувати невеликий prioritized set: priority mail, quick win, short work block і waiting follow-up.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-011; KH-DEP-015
- Конфлікти: CF-003
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-111](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Обмеження: Priority/focus, quick-win, and bounded backlog/session concepts are implemented; the exact four-part homepage set, especially waiting follow-up, was not fully established.

## KH-PROD-048

- Статус: `verified`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: MVP delayed send: створити draft, зберегти `draftId`, `sendAt`, `messageIntent`, а trigger або worker викликає send.
- Стан реалізації: implemented
- Залежності: KH-DEP-013; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-033](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Доказ 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Обмеження: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-049

- Статус: `blocked`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `mixed` / `E2`
- Твердження: Telegram має бути low-friction control plane, а не копією Gmail.
- Стан реалізації: implemented
- Залежності: Telegram Bot API
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-036](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram update validation/routing, callback handling, Bot API requests, digest/cards, browsing, and menu functions.; The repository contains an owner-scoped Telegram Bot API control plane with short actions and message cards.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected folders, threads, compose, attachments, labels, focus, and adaptive-density UI.; The repository implements a broad mail web app with an optional focused/adaptive surface, not only a minimal card surface.
- Обмеження: Safe missing proof: a read-only rendered UX or user-acceptance result tied to the pinned commit showing that Telegram interactions are low-friction and remain meaningfully narrower than the mail web app.

## KH-PROD-050

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Telegram digest має показувати невелику кількість листів із найбільшим впливом.
- Стан реалізації: implemented
- Залежності: KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-037](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Доказ 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram update validation/routing, callback handling, Bot API requests, digest/cards, browsing, and menu functions.; The repository contains an owner-scoped Telegram Bot API control plane with short actions and message cards.
- Обмеження: Bounded digest delivery and priority inputs exist; static inspection does not prove that ranking consistently selects the highest-impact messages.

## KH-PROD-051

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Telegram control має підтримувати `done`, `later`, `nudge tomorrow`, `show summary`.
- Стан реалізації: partially_implemented
- Залежності: Telegram Bot API; KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-038](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram update validation/routing, callback handling, Bot API requests, digest/cards, browsing, and menu functions.; The repository contains an owner-scoped Telegram Bot API control plane with short actions and message cards.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Доказ 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Доказ 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Доказ 5: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Обмеження: Done/archive, later/snooze, reminder callbacks, and summary/card views exist, but the exact four literal command contract was not established.

## KH-PROD-052

- Статус: `partial`
- Категорія: `KH-PROD`; тип: `product`
- Актуальність: high
- Scope і рівень: `repository` / `E2`
- Твердження: Передбачено emergency relay лише для справді термінових листів.
- Стан реалізації: partially_implemented
- Залежності: KH-DEP-015
- Конфлікти: none
- Чутливість: `public`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-039](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Доказ 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Обмеження: An urgent-only reminder preference and priority gating exist; a distinct emergency relay and production routing proof are missing.

## KH-PRV-001

- Статус: `unverified`
- Категорія: `KH-PRV`; тип: `privacy`
- Актуальність: privacy
- Scope і рівень: `repository` / `E0`
- Твердження: Звіт описує AI-обробку поштового контенту, але не специфікує retention, data minimization, encryption, provider boundaries або видалення даних.
- Стан реалізації: report_omission_not_independently_proven
- Залежності: approved primary source or independent privacy specification
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R1-065](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Доказ 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [docs/en/knowledge-hub/sources/REPORT-1.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/sources/REPORT-1.md); Located by targeted KH-PRV search.; Repeats the assertion but is not primary proof.
- Обмеження: Exact safe missing proof: an approved sanitized primary-source excerpt for the cited report sections, or an independent privacy specification proving what was and was not specified.

## KH-PRV-002

- Статус: `recommendation`
- Категорія: `KH-PRV`; тип: `privacy`
- Актуальність: privacy
- Scope і рівень: `mixed` / `E2`
- Твердження: GDPR/ePrivacy controls мають включати encryption, access control, audit logs, minimization, contracts, retention, export/delete, breach response і residency.
- Стан реалізації: partially_implemented_static_evidence_only
- Залежності: privacy impact assessment; data-flow map; retention schedule; processor contracts
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-039](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Read once at the assigned commit.; Scopes are gmail.modify, drive.readonly, script.external_request, and script.scriptapp; no retention, residency, breach-response, or telemetry-preference policy is declared.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Properties, sanitization/redaction, expiry, and audit/logging markers exist; contracts, residency, export/delete rights, and breach response were not established.
- Обмеження: Legal compliance is not proven by code; no protected configuration, runtime data, contracts, or external policy was accessed.

## KH-PRV-003

- Статус: `recommendation`
- Категорія: `KH-PRV`; тип: `privacy`
- Актуальність: privacy
- Scope і рівень: `mixed` / `E2`
- Твердження: Open tracking не вмикати за замовчуванням для EU-sensitive use cases; додати legal gating, preference center, granular opt-in і розділення delivery/marketing telemetry.
- Стан реалізації: not_established_one_static_match_unresolved
- Залежності: contextual review of the static match; telemetry inventory; default-setting contract
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R2-041](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Доказ 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; One tracking-pattern lexical match appeared in MailClient.gs and zero in the other five inspected implementation files; context was not retained, so presence or absence is not established.
- Обмеження: Exact safe missing proof: contextual review of the one match plus a telemetry/default-settings inventory and read-only network trace.

## KH-PRV-004

- Статус: `recommendation`
- Категорія: `KH-PRV`; тип: `privacy`
- Актуальність: privacy
- Scope і рівень: `mixed` / `E2`
- Твердження: Least privilege, чіткі межі даних, мінімальне вилучення body та раннє планування verification boundary є архітектурними вимогами.
- Стан реалізації: partially_implemented_static_evidence_only
- Залежності: scope justification matrix; data-flow map; body-minimization test
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-042](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-102](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Read once at the assigned commit.; Scopes are gmail.modify, drive.readonly, script.external_request, and script.scriptapp; no retention, residency, breach-response, or telemetry-preference policy is declared.
- Доказ 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Account/session scope and guarded token/session identifiers indicate boundaries; minimal body extraction and least-privilege sufficiency were not established.
- Обмеження: gmail.modify and scriptapp may be necessary, but least privilege requires a scope-to-feature audit; runtime isolation was not tested.

## KH-PRV-005

- Статус: `recommendation`
- Категорія: `KH-PRV`; тип: `privacy`
- Актуальність: privacy
- Scope і рівень: `mixed` / `E2`
- Твердження: Credentials не зберігати в коді; secrets тримати у properties або external vault; logs редагувати щодо addresses, headers і token fragments.
- Стан реалізації: partially_implemented_static_evidence_only
- Залежності: credential-safe secret scan; logging data-flow review; synthetic redaction tests
- Конфлікти: none
- Чутливість: `internal`
- Звіт і проєкт: [VR-001](README.md); [Проєкт](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Точне походження: [R3-047](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Доказ 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Доказ 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; PropertiesService use (138 markers), sanitization/redaction identifiers, and 84 logging calls exist; this does not prove every log is redacted or that no credential literal exists.
- Доказ 3: [AGENTS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/AGENTS.md); Read once at the assigned commit.; Governs request routing, evidence, secret handling, and release gates; adopts no KH-INS ID.
- Обмеження: No protected store or secret value was accessed. Exact safe missing proof: a credential-safe repository scan and contextual review of every logging sink.
