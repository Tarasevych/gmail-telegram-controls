# Актуальний стан Gmail Telegram Controls

Оновлено: **2026-07-22**. Source requests: `REQ-0030`, `REQ-0031`.

<!-- release-state: production=v57; candidate=v62; staging=0; status=BLOCKED; as-of=2026-07-22 -->

## Канонічний стан після контрольованої release-спроби v62

- **Production:** Apps Script immutable v57, `VERIFIED` точним post-rollback preflight і двома свіжими mailbox launches без network error.
- **Candidate:** immutable v62, `BLOCKED` для production. Його cumulative client fixes, локальні gates, CI, owner-only staging acceptance і два production UI readbacks пройшли, але обов'язковий post-release execution/overlap trace був недоступний.
- **Staging:** `0`; staging deployment v62 видалено cleanup до runtime gate і не створено повторно.
- **Release journal:** `rolled_back`; stable і HEAD є exact v57. Immutable v62 лишається історичним і не переписується.
- **Причина:** GT-030 лишається відкритим. Worker-код v62 ідентичний candidate-line, де раніше зафіксовано execution тривалістю 214.96 секунди, а content-free execution trace не довів 150-second/no-overlap gate після v62. Це не доводить candidate-specific regression v62.
- **Delivery control:** один дозволений owner self-copy не створив картку, як очікується через SENT exclusion; два `/check` не створили дубль. External automatic INBOX delivery після v62 лишається `UNVERIFIED`.
- **Без auth churn:** OAuth consent, міграція GCP project, читання secret properties, Gmail mutation або зміна account zone не виконувалися.

Докази: [release attempt і rollback v62](reports/VERSIE_001_V62_RELEASE_ATTEMPT_AND_ROLLBACK_2026-07-22.md), [VR-010](verification-reports/reports/VR-010/README.md), [acceptance чинного production v57](reports/VERSIE_001_V57_PRODUCTION_ACCEPTANCE_2026-07-22.md) і cumulative [Versie 1 release article](releases/VERSIE-001-2026-07-19.md).

English mirror: [docs/en/CURRENT_STATE.md](../en/CURRENT_STATE.md).

| Контур | Фактичний стан |
|---|---|
| Продуктова лінія | **Versie 1** |
| Production | Apps Script immutable **v57**, `VERIFIED` після exact rollback |
| Candidate | Apps Script immutable **v59**, історичний candidate, production acceptance `UNVERIFIED` |
| Active staging | **0** |

Immutable v59 пройшов owner-only UI acceptance: mailbox, Google avatar, три ізольовані Gmail roots, one-click switch на контрольований другий акаунт і назад без OAuth, live label UI та recovery застарілого automatic route. Після promotion два production-запуски завантажили mailbox, а cleanup підтвердив stable v59 і staging `0`.

Post-cleanup runtime gate не пройдено: один `checkNewMail_` тривав `214.96 с` проти цільового 150-секундного worker slot, а execution windows перекрилися. Обидва executions завершилися успішно, тому simultaneous Gmail work і root cause лишаються `UNVERIFIED`; однак release gate вимагав відсутності overlap. Виконано exact rollback v59 -> v57. Після rollback `PreflightOnly` підтвердив stable і HEAD v57, staging `0`, journal `rolled_back`; свіжий production v57 launch завантажив mailbox. Immutable v59 збережено, v60 не створено.

Machine-readable source: [`docs/release-state.json`](../release-state.json).

Деталі й походження:

- [Кумулятивна стаття Versie 1](releases/VERSIE-001-2026-07-19.md)
- [Production acceptance v57](reports/VERSIE_001_V57_PRODUCTION_ACCEPTANCE_2026-07-22.md)
- [VR-007: v59 release attempt і rollback](verification-reports/reports/VR-007/README.md)
- [English mirror](../en/CURRENT_STATE.md)

Датовані release, postmortem і verification-report сторінки зберігають стан на момент доказу. Для поточного runtime/release рішення завжди використовувати цей файл і manifest, а не старий датований status.
