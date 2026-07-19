# VR-001: незалежна перевірка deep-research baseline

[Усі claims](CLAIMS.md) | [Governance](GOVERNANCE.md) | [Реалізація](IMPLEMENTATION.md) | [Релізи](RELEASES.md) | [Конфлікти](CONFLICTS.md) | [Рекомендації](RECOMMENDATIONS.md) | [English](../../../../en/verification-reports/reports/VR-001/README.md)

Source request: `REQ-0004`. Ціль: [Versie 1 `2b3b9e2f678f`](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a).

## Результат

П’ять неперетинних read-only потоків перевірили рівно 245/245 canonical KH IDs. Результат є claim-level factual classification, а не загальним підтвердженням production.

| Статус | Кількість | Значення |
|---|---:|---|
| `verified` | 17 | Підтверджено первинним доказом у вказаному scope |
| `contradicted` | 13 | Первинний доказ прямо суперечить твердженню |
| `partial` | 82 | Підтверджено лише частину або нижчий scope |
| `unverified` | 35 | Достатнього первинного доказу немає |
| `blocked` | 7 | Потрібний доказ недоступний у безпечному scope |
| `recommendation` | 91 | Нормативна пропозиція, не факт реалізації |

| Рівень | Кількість | Доказ |
|---|---:|---|
| `E0` | 24 | Лише попередній звіт або твердження |
| `E1` | 60 | Git history або наявність файла |
| `E2` | 145 | Статична перевірка реалізації |
| `E3` | 16 | Локальний автоматизований тест |
| `E4` | 0 | Read-only staging/runtime |
| `E5` | 0 | Production acceptance |

## Ключові висновки

- Безпечний локальний suite пройшов 399/399; він не включав OAuth, network, staging або production.
- Tracked реалізація використовує Apps Script mailbox backend і time-based polling; запропоновані Gmail add-on, Mailcow/Stalwart та Pub/Sub/Cloud Run контури не є поточною реалізацією.
- Custom OAuth code суперечить report-derived dependency на apps-script-oauth2.
- Report-derived permissions не підвищено: P-001-P-004 не мають достатнього traceable REQ-ID provenance.
- Versie 1 залишається непідвищеною до production, без tag і release branch; runtime/production acceptance не виконувалася.
- Поточний token-refresh path не має function-local lock; ризик перенесено до GT-010.

## Доказова навігація

- [Atomic claim ledger](CLAIMS.md)
- [Machine claims](../../../../verification-reports/VR-001/claims.json)
- [Machine manifest](../../../../verification-reports/VR-001/manifest.json)
- [Поточний проєкт](../../../PROJECT.md)
- [Поточна roadmap](../../../ROADMAP.md)
- [Поточні проблеми](../../../ISSUES.md)

## Обмеження

- Жодної зміни runtime, Gmail, Telegram, Apps Script, deployment або секретів.
- E4/E5 не отримано; blocked runtime claims збережено відкритими.
- Absence findings обмежені tracked tree і названими governance commits.
- Versie 2 не створена й не авторизована.
