# Індекс verification reports

[Головна](README.md) | [Схема](REPORT_SCHEMA.md) | [Політика доказів](EVIDENCE_POLICY.md) | [English](../../en/verification-reports/INDEX.md)

Source request: `REQ-0004`.

| Report | Дата | Ціль | Покриття | Результат |
|---|---|---|---:|---|
| [VR-001](reports/VR-001/README.md) | 2026-07-19 | `2b3b9e2f678f` | 245/245 | `verified` 17, `contradicted` 13, `partial` 82, `unverified` 35, `blocked` 7, `recommendation` 91 |
| [VR-002](reports/VR-002/README.md) | 2026-07-20 | `f96d8f0` + production v42 | 8/8 | `verified` 5, `partial` 2, `blocked` 1 |

[Machine-readable index](../../verification-reports/index.json).

Історичний report не переписується після публікації для приховування помилки. Нове незалежне спростування або сильніший доказ додається новим report ID чи явно трасованою correction-зміною.

## VR-003 (2026-07-21)

[VR-003](reports/VR-003/README.md) є двокорпусною factual verification для Versie 1. Вона публікує 32 очищені атомарні твердження, метадані повного покриття джерел, підтверджені root causes і явні runtime/release gates. Machine-readable артефакти: [manifest](../../verification-reports/VR-003/manifest.json), [claims](../../verification-reports/VR-003/claims.json) і [source manifest](../../verification-reports/VR-003/source-manifest.json).

## VR-004 (2026-07-21)

[VR-004](reports/VR-004/README.md) є stabilization/root-cause audit після rollback v56 та staging v57. Він відділяє production-accepted v55 від candidate line, фіксує shared URLFetch quota blocker і fail-closed A/B план. Додатки містять [повний аудит 26 CI failures](reports/VR-004/CI_FAILURE_AUDIT.md), [runtime evidence v55/v57](reports/VR-004/RUNTIME_QUOTA_EVIDENCE.md), [Stage 1 continuation audit](reports/VR-004/STAGE_1_CONTINUATION_AUDIT.md) і [Advanced Gmail compatibility analysis](reports/VR-004/ADVANCED_GMAIL_COMPATIBILITY.md). Чинний machine index VR-003 не змінено без окремої зміни validator-контракту.

## VR-005 — Керування Gmail-мітками

- **Статус:** PARTIAL
- **Дата:** 2026-07-22
- **Покриття:** офіційні Gmail API constraints, production baseline без мутацій, root cause, реалізація, автоматичні й responsive visual checks, release boundary.
- **Звіт:** [reports/VR-005/README.md](reports/VR-005/README.md)
- **Примітка:** shared machine index залишається на VR-003; VR-005 не змінює machine-report contract.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-007 — v59 release attempt і exact rollback

- **Статус:** PARTIAL
- **Дата:** 2026-07-22
- **Покриття:** bounded authority, PR #16/#11 integration, immutable v59, local/CI gates, owner-only UI acceptance, promotion, production launches, cleanup, post-cleanup execution overlap і exact rollback.
- **Звіт:** [reports/VR-007/README.md](reports/VR-007/README.md)
- **Висновок:** UI/stale-route acceptance пройдено, але runtime gate не пройдено; safe production відновлено на v57, staging `0`, v60 не створено.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-006 — Cumulative v58 staging A/B

- **Статус:** BLOCKED
- **Дата:** 2026-07-22
- **Покриття:** PR #16/#11 integration, immutable v58, local/CI gates, owner-only staging, controlled v57/v58 A/B, Apps Script execution localization і safe-state boundary.
- **Звіт:** [reports/VR-006/README.md](reports/VR-006/README.md)
- **Висновок:** candidate-specific regression не доведена; shared pre-handler transport/deployment-access cause лишається UNVERIFIED, тому promotion заблокований.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-008 — Динамічний активний поштовий контекст

- **Статус:** PARTIAL
- **Дата:** 2026-07-22
- **Покриття:** чинне multi-account state source, статичні fallback root causes, похідний active/shared view-model, доступність, responsive contract і release boundary.
- **Звіт:** [reports/VR-008/README.md](reports/VR-008/README.md)
- **Висновок:** source candidate усуває статичну identity-модель без зміни Gmail/OAuth contract; production verification відсутній, v60 не створено.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-010 — Cumulative release attempt v62 і exact rollback

- **Статус:** BLOCKED
- **Дата:** 2026-07-22
- **Покриття:** merged P0 source, immutable v62, локальні/CI gates, staging і production UI readbacks, delivery dedupe boundary, недоступний Apps Script execution evidence та exact rollback до v57.
- **Звіт:** [reports/VR-010/README.md](reports/VR-010/README.md)
- **Висновок:** client acceptance пройдено, але inherited GT-030 worker risk не закрито execution trace; production відновлено на exact v57, staging `0`, immutable v62 збережено.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)
