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

[VR-004](reports/VR-004/README.md) є stabilization/root-cause audit після rollback v56 та staging v57. Він відділяє production-accepted v55 від candidate line, фіксує shared URLFetch quota blocker і fail-closed A/B план. Додатки містять [повний аудит 26 CI failures](reports/VR-004/CI_FAILURE_AUDIT.md) і [runtime evidence v55/v57](reports/VR-004/RUNTIME_QUOTA_EVIDENCE.md). Чинний machine index VR-003 не змінено без окремої зміни validator-контракту.
