# VR-013 — v64 helper і bounded reconciliation GT-037

[English](../../../../en/verification-reports/reports/VR-013/README.md)

- **Дата:** 2026-07-22
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`
- **Детальний звіт:** [v64 helper source candidate](../../../reports/VERSIE_001_V64_RELEASE_CANDIDATE_2026-07-22.md)

## Атомарні висновки

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-013-01 | Helper pins exact v63 rollback, frozen v63 history і candidate version v64. | VERIFIED | focused release contract |
| VR-013-02 | Усі п'ять candidate hashes дорівнюють source commit `da8b2768323db8fd8c1ba886b556bbfd2148d6de`. | VERIFIED | normalized hash contract |
| VR-013-03 | Promotion і rollback виконують по одному PUT і не більше п'яти read-only reconciliation checks. | VERIFIED | focused contract і parser |
| VR-013-04 | Contradictory deployment versions fail closed замість наступної mutation. | VERIFIED | helper source contract |
| VR-013-05 | Cumulative local tests проходять. | VERIFIED | `503/503` |
| VR-013-06 | v64 immutable і staging існують. | UNVERIFIED | StageOnly ще не запускався |
| VR-013-07 | Live promotion reconciliation GT-037 проходить. | UNVERIFIED | promotion ще не запускався |

## Висновок

Source v64 helper локально verified. Overall status лишається PARTIAL до normal merge, read-only preflight, exact staging, owner acceptance і promotion evidence.
