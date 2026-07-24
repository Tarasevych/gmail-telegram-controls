# Незалежні factual verification reports

[Індекс](INDEX.md) | [Схема](REPORT_SCHEMA.md) | [Політика доказів](EVIDENCE_POLICY.md) | [English](../../en/verification-reports/README.md)

Джерело запиту: `REQ-0004`.

Ця зона є окремим доказовим шаром між report-derived knowledge hub і поточними PROJECT/ROADMAP/ISSUES. Вона не повторює summary як істину: кожне атомарне твердження отримує власний scope, статус, рівень доказу, походження, залежності, конфлікти, чутливість та обмеження.

## Поточний звіт

- [VR-001](reports/VR-001/README.md): незалежна перевірка 245/245 KH claims.
- [Atomic claim ledger](reports/VR-001/CLAIMS.md): один результат для кожного canonical ID.
- [Machine index](../../verification-reports/index.json) і [machine claims](../../verification-reports/VR-001/claims.json).

## Порядок читання

1. Почати з INDEX і вибрати потрібний report ID.
2. Прочитати README звіту та його limitations.
3. Відкрити лише потрібний claim у CLAIMS.
4. Перейти за immutable Git evidence link до реального файла або commit.
5. Для runtime або production вимагати E4/E5, а не E1/E2.

Permission claim перевіряється лише проти канонічного owner-granted запису. Recommendation не є повноваженням. Нова Versie, deployment або runtime change цим контуром не створюється.

## Найновіший звіт

[VR-048](reports/VR-048/README.md) фіксує P0-G source verification conflict-safe Gmail Drafts update. Focused contracts пройшли `258/258`, а повний Apps Script suite — `707/707` за `23.349s`; opaque version propagation, два pre-`PUT` checks і explicit conflict choice мають source evidence. Gmail API не документує atomic revision/ETag precondition, а native multi-session acceptance, staging і production лишаються `UNVERIFIED` або `BLOCKED`.
