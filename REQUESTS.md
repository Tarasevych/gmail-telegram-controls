# Журнал запитів / Request ledger

<!-- lang:uk -->
## Українською

Гілка `Запити` є єдиним канонічним журналом проєктних звернень власника. Кожне звернення фіксується до виконання як очищена інтерпретація, ділиться на логічні частини та отримує явні маршрути. `Інструкції` і `Повноваження` не зберігають копії журналу: вони містять лише похідні нормативні записи з посиланням на `REQ-ID`.

| ID | Дата | Статус | Коротка тема | Запис |
|---|---|---|---|---|
<!-- request-index -->
| REQ-0001 | 2026-07-19 | superseded | Початковий спільний журнал та gate Versie | [record](requests/2026-07-19/REQ-0001-instruction-ledger-and-version-gate.md) |
| REQ-0002 | 2026-07-19 | completed | Відокремлений журнал і контекстна маршрутизація | [record](requests/2026-07-19/REQ-0002-separated-ledger-and-context-routing.md) |
| REQ-0003 | 2026-07-19 | completed | Маршрутизація трьох deep-research reports у knowledge hub | [record](requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md) |
| REQ-0004 | 2026-07-19 | completed | Незалежні двомовні factual verification reports | [record](requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md) |
| REQ-0005 | 2026-07-19 | completed | Приватний Onderzoeksarchief двох історій task | [record](requests/2026-07-19/REQ-0005-private-chat-research-archive.md) |
| REQ-0006 | 2026-07-19 | completed | Межі повного confidential transcript archive | [record](requests/2026-07-19/REQ-0006-confidential-transcript-boundaries.md) |
| REQ-0007 | 2026-07-19 | completed | Owner-only доступ і межа внутрішніх Codex-даних | [record](requests/2026-07-19/REQ-0007-owner-only-archive-access.md) |
| REQ-0008 | 2026-07-20 | in_progress | Versie 1 multi-account OAuth return і one-click switch | [record](requests/2026-07-20/REQ-0008-versie-1-multi-account-oauth-return.md) |
| REQ-0009 | 2026-07-20 | recorded | Versie 1 multi-account Gmail delivery і account-scoped feeds | [record](requests/2026-07-20/REQ-0009-versie-1-multi-account-mail-delivery.md) |
| REQ-0010 | 2026-07-21 | recorded | Versie 1 postmortem, lessons learned і GitHub publication diagnosis | [record](requests/2026-07-21/REQ-0010-versie-1-postmortem-lessons.md) |

<!-- lang:en -->
## English

The `Запити` branch is the single canonical ledger of owner project requests. Each request is recorded before execution as a sanitized interpretation, split into logical parts, and assigned explicit routes. `Інструкції` and `Повноваження` do not keep ledger copies; they contain only derived normative records linked to the originating `REQ-ID`.

The table above is the canonical machine-checked index. Every record is internally bilingual.

## REQ-0011 | 2026-07-21

- Українською: автономне продовження, журналювання та recovery-повноваження в межах безпеки.
- English: autonomous continuation, logging, and recovery authority within safety boundaries.
- Record: [REQ-0011](requests/2026-07-21/REQ-0011-autonomous-continuation-permissions.md)
- Status: `recorded`
