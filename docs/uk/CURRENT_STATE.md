# Актуальний стан Gmail Telegram Controls

Оновлено: **2026-07-22**. Source requests: `REQ-0030`, `REQ-0031`.

<!-- release-state: production=v57; candidate=v59; staging=0; status=UNVERIFIED; as-of=2026-07-22 -->

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
