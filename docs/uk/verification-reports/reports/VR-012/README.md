# VR-012 — Source correction вузького active-account header GT-031

[English](../../../../en/verification-reports/reports/VR-012/README.md)

- **Дата:** 2026-07-22
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`
- **Детальний звіт:** [Source correction GT-031](../../../reports/VERSIE_001_GT031_ACCOUNT_HEADER_SOURCE_2026-07-22.md)

## Атомарні висновки

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-012-01 | Native v63 показав narrow-header email clipping residual на контрольованому alternate account. | VERIFIED | owner-only v63 acceptance observation |
| VR-012-02 | Single-account narrow mode не мав visible touch disclosure для complete email. | VERIFIED | source inspection |
| VR-012-03 | Correction повторно використовує stable-ID context model і чинну account map без parallel state. | VERIFIED | source contract |
| VR-012-04 | Wider views виконують wrapping; narrow views показують compact native full-address disclosure з keyboard і ARIA support. | VERIFIED | focused `88/88` |
| VR-012-05 | Усі Apps Script contracts проходять після freezing v63 як historical evidence. | VERIFIED | full `501/501` |
| VR-012-06 | Immutable v63 helper, hashes, deployment і exact v57 rollback не змінено. | VERIFIED | scoped diff і release contracts |
| VR-012-07 | Corrected interface пройшов native staging і production visual acceptance. | UNVERIFIED | v64 candidate ще не існує |

## Висновок

Source correction локально VERIFIED, але GT-031 лишається PARTIAL до проходження окремо gated cumulative candidate через native staging і production visual acceptance. Production лишається immutable v63.
