# Актуальний стан Gmail Telegram Controls

Оновлено: **2026-07-22**. Source request: `REQ-0031`.

<!-- release-state: production=v57; candidate=v59; staging=1; status=UNVERIFIED; as-of=2026-07-22 -->

| Контур | Фактичний стан |
|---|---|
| Продуктова лінія | **Versie 1** |
| Production | Apps Script immutable **v57**, `VERIFIED` |
| Candidate | Apps Script immutable **v59**, `UNVERIFIED` до acceptance |
| Active staging | **1** owner-only deployment |

Production v57 має перевірений acceptance. Immutable v59 та один owner-only staging створені для перевірки stale-thread-route recovery; їх не можна просувати без повного нового acceptance. Immutable v58 збережено як historical evidence і він більше не має active staging deployment.

Machine-readable source: [`docs/release-state.json`](../release-state.json).

Деталі й походження:

- [Кумулятивна стаття Versie 1](releases/VERSIE-001-2026-07-19.md)
- [Production acceptance v57](reports/VERSIE_001_V57_PRODUCTION_ACCEPTANCE_2026-07-22.md)
- [English mirror](../en/CURRENT_STATE.md)

Датовані release, postmortem і verification-report сторінки зберігають стан на момент доказу та не переписуються як поточний status. Після promotion або rollback цей файл, manifest, root README і English mirror оновлюються до закриття release cycle.
