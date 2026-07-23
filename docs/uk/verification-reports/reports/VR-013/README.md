# VR-013 — production acceptance v64 і закриття GT-031/GT-037

[English](../../../../en/verification-reports/reports/VR-013/README.md)

- **Дата:** 2026-07-22
- **Загальний статус:** VERIFIED
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`
- **Детальний звіт:** [production acceptance v64](../../../reports/VERSIE_001_V64_RELEASE_AND_GT031_GT037_CLOSURE_2026-07-22.md)

## Атомарні висновки

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-013-01 | Helper pins exact v63 rollback, frozen v63 history і candidate version v64. | VERIFIED | focused release contract |
| VR-013-02 | Усі п'ять candidate hashes дорівнюють source commit `da8b2768323db8fd8c1ba886b556bbfd2148d6de`. | VERIFIED | normalized hash contract |
| VR-013-03 | Promotion і rollback виконують по одному PUT і не більше п'яти read-only reconciliation checks. | VERIFIED | focused contract і parser |
| VR-013-04 | Contradictory deployment versions fail closed замість наступної mutation. | VERIFIED | helper source contract |
| VR-013-05 | Фінальний cumulative local suite проходить. | VERIFIED | `505/505` |
| VR-013-06 | Immutable v64 і рівно один staging deployment створено після preflight. | VERIFIED | post-stage preflight: `staging_verified` |
| VR-013-07 | Live promotion reconciliation GT-037 просуває v63 до v64 однією mutation. | VERIFIED | promotion result і stable readback |
| VR-013-08 | Native staging підтверджує disclosure повної адреси, три roots, shared mode і switching без OAuth. | VERIFIED | owner-only Telegram Desktop acceptance |
| VR-013-09 | Два fresh production launches проходять; cleanup лишає stable/HEAD v64, staging `0` і journal `cleaned`. | VERIFIED | native production acceptance і final preflight |
| VR-013-10 | Шість post-cleanup executions завершуються; точна внутрішня диспозиція одного короткого overlapping shell відома. | UNVERIFIED | UI durations перевірені; причина lease rejection є inference |

## Висновок

Release scope v64 має статус `VERIFIED`: immutable v64 є production і HEAD, exact v63 є rollback, staging дорівнює нулю, а GT-031/GT-037 пройшли live acceptance. Пояснення runtime shell overlap, external automatic INBOX delivery після v64 та решта P0 scenarios явно лишаються поза цим closure.