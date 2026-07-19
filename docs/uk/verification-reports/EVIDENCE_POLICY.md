# Політика доказів

[Головна](README.md) | [Схема](REPORT_SCHEMA.md) | [English](../../en/verification-reports/EVIDENCE_POLICY.md)

Source request: `REQ-0004`.

| Рівень | Кількість | Доказ |
|---|---:|---|
| `E0` | 24 | Лише попередній звіт або твердження |
| `E1` | 60 | Git history або наявність файла |
| `E2` | 145 | Статична перевірка реалізації |
| `E3` | 16 | Локальний автоматизований тест |
| `E4` | 0 | Read-only staging/runtime |
| `E5` | 0 | Production acceptance |

## Правила підвищення статусу

- Повтор у звіті або summary залишається E0.
- Наявність файла E1 та статичний код E2 не доводять роботу функції.
- Test claim потребує E3; runtime claim E4; production acceptance E5.
- Evidence link містить повний immutable commit і перевірений Git path; доказ відсутності посилається на audited commit tree.
- Permission стає verified лише через канонічне Повноваження та traceable owner request.
- OTP, CAPTCHA, новий user consent і небезпечні mutations не обходяться заради вищого evidence grade.
- Чутливе значення не публікується; у звіті залишається лише redacted reference.
