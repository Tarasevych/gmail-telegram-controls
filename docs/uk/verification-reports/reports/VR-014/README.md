# VR-014 — виправлення визначення production client release

[English](../../../../en/verification-reports/reports/VR-014/README.md)

- **Дата:** 2026-07-22
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`

## Атомарні висновки

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-014-01 | Канонічний current manifest публікує production через `production.appsScriptImmutable = 64`. | VERIFIED | tracked `docs/release-state.json` |
| VR-014-02 | Client extractor у production v64 пропускав `appsScriptImmutable`, тому canonical manifest давав target version zero. | VERIFIED | source inspection і regression function test |
| VR-014-03 | HTML у production v64 досі оголошував `P0_CLIENT_RELEASE_VERSION = 60` і `Versie-1-v60-p0`. | VERIFIED | source inspection |
| VR-014-04 | Source correction спочатку читає canonical field та ідентифікує наступний cumulative source як `Versie-1-v65-p0`. | VERIFIED | focused real-manifest contract |
| VR-014-05 | Draft-safe guard зберігає один automatic reload site і повертає no action після досягнення loaded version target-версії. | VERIFIED | release-decision regression contract |
| VR-014-06 | Frozen helper hashes v64 лишаються pinned без вимоги назавжди прирівнювати mutable source до immutable v64. | VERIFIED | historical release-boundary contract |
| VR-014-07 | Уже відкритий client v64 reload-иться рівно один раз у v65 і не входить у loop у native production. | UNVERIFIED | потрібен bounded staging і production acceptance v65 |

## Висновок

Causal source defect GT-036 підтверджено й локально виправлено. Production лишається exact immutable v64 зі staging zero та exact rollback v63. GT-036 лишається `PARTIAL`, доки окремо gated cumulative release v65 не доведе one reload, відсутність reload loop і draft-safe state restoration.
