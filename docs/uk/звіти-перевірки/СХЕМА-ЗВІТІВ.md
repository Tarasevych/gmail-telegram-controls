# Єдина схема factual verification

[Головна](README.md) | [Політика доказів](EVIDENCE_POLICY.md) | [English](../../en/verification-reports/REPORT_SCHEMA.md)

Source request: `REQ-0004`. [Machine schema](../../verification-reports/schema.json).

## Атомарний запис

- `claim_id`: стабільний canonical ID.
- `source_ids`: точні source-report IDs.
- `category`, `claim_type`, `relevance`: класифікація та актуальність.
- `statement_uk`, `statement_en`: еквівалентні мовні формулювання.
- `verification_status`, `verification_scope`, `evidence_grade`: результат без змішування scope.
- `implementation_status`: що саме існує або не існує.
- `dependencies`, `conflicts`, `sensitivity`: явні зв’язки, суперечності та handling.
- `provenance`: REQ, canonical page, source IDs та source spans.
- `evidence`: метод, результат, full commit, path і GitHub URL.
- `limitations`: чого звіт не доводить.
- `report_id`, `analysis_stream`, `verified_at`: звіт, незалежний потік і дата.

## Стани

| Статус | Кількість | Значення |
|---|---:|---|
| `verified` | 17 | Підтверджено первинним доказом у вказаному scope |
| `contradicted` | 13 | Первинний доказ прямо суперечить твердженню |
| `partial` | 82 | Підтверджено лише частину або нижчий scope |
| `unverified` | 35 | Достатнього первинного доказу немає |
| `blocked` | 7 | Потрібний доказ недоступний у безпечному scope |
| `recommendation` | 91 | Нормативна пропозиція, не факт реалізації |
