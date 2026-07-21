# VR-003: Двокорпусна factual verification історії Versie 1

**Дата:** 2026-07-21  
**Запит:** REQ-0012  
**Методика:** REQ-0004  
**Продуктова лінія:** Versie 1  
**Зміна випуску:** ні

VR-003 перетворює два приватні експорти сесій на очищені атомарні твердження та звіряє їх з immutable Git-об'єктами й локальними тестовими доказами. Звіт не публікує транскрипти, вміст пошти, облікові дані, приватні URL або локальні шляхи.

## Покриття

| Джерело | Логічні рядки | Приватні фрагменти | Покриття |
|---|---:|---:|---|
| SESSION-CURRENT | 32 569 | 49 | повне |
| SESSION-PREVIOUS | 134 607 | 182 | повне |
| **Разом** | **167 176** | **231** | **повне, без розривів** |

Криптографічні метадані джерел і перевірка меж наддовгого рядка містяться у [source-manifest.json](../../../../verification-reports/VR-003/source-manifest.json). Сирий і нормалізований корпуси залишаються приватними.

## Результат

| Статус | Кількість |
|---|---:|
| verified | 19 |
| partial | 3 |
| unverified | 3 |
| blocked | 2 |
| recommendation | 5 |

Повний machine-readable реєстр міститься у [claims.json](../../../../verification-reports/VR-003/claims.json). Кожне твердження має scope, evidence grade, залежності, конфлікти, обмеження, точні діапазони джерел та immutable evidence links, якщо існує первинний доказ.

## Перевірена межа

- Поточний кандидат v55 пройшов усі 19 локальних test files, 432/432 (`VR3-016`).
- `PreflightOnly` пройдено з точними hashes кандидата і без mutation (`VR3-017`).
- v47 card-index compaction, v48 realtime lock isolation, v50 retention handling та v55 shared SENT eligibility підтверджені Git і тестами (`VR3-007` до `VR3-015`).
- Стан multi-account delivery відокремлений від активного UI-акаунта (`VR3-005`, `VR3-006`).
- У межах цього звіту не виконувалися immutable deployment v55, staging deployment, production promotion, зміни Gmail, Telegram production acceptance або OAuth acceptance (`VR3-018`, `VR3-025`, `VR3-026`).

## Навігація

- [Архітектура](ARCHITECTURE.md)
- [Кореневі причини](ROOT_CAUSES.md)
- [Засвоєні уроки](LESSONS.md)
- [Історія випусків](RELEASES.md)
- [Відкриті gates](OPEN_GATES.md)
- [Machine-readable manifest](../../../../verification-reports/VR-003/manifest.json)

