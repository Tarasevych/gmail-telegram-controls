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

[VR-042](reports/VR-042/README.md) фіксує P0-A source verification і synthetic local E2 evidence для cross-document launch single-flight та canonical launch-proof ledger. Focused contracts пройшли `37/37`, повний Apps Script suite пройшов `668/668` за `24.229s`, а десять local warm reloads показали maximum/p95-by-10 `153 ms`; native target-device, offline, POST-Redirect-GET, incremental Gmail History, Service Worker/Background Sync, staging і production gates лишаються `UNVERIFIED` або `BLOCKED`. Screenshot evidence не заявляється.
