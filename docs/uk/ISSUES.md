# Реєстр знайдених проблем

Оновлено: **2026-07-20**. Статуси: `Відкрита`, `В роботі`, `Заблокована`, `Вирішена локально`, `Перевірена production`.

| ID | Статус | З Versie | Проблема | Рішення / наступний доказ |
|---|---|---:|---|---|
| GT-001 | Вирішена локально | 1 | Один лист надходить у Telegram двічі | Не сканувати owner mailbox повторно через OAuth і дедуплікувати same-user/same-email; потрібен real-time acceptance |
| GT-002 | В роботі | 1 | Google callback відкриває сторінку Диска замість сервісу | Direct Apps Script callback відхилено через офіційно непідтримуваний Google multi-login; впроваджується neutral GitHub callback + credentialless POST; потрібен live acceptance |
| GT-003 | Вирішена локально | 1 | У header показується літера замість Google profile photo | Header використовує реальне фото з fallback на initial; потрібен staging readback |
| GT-004 | Вирішена локально | 1 | `Додати Gmail-акаунт` вимагає зайвий клік `Продовжити в Google` | Відкривати authorization URL одразу; показувати fallback лише якщо браузер блокує перехід |
| GT-005 | Вирішена локально | 1 | Account panel рахує stale/inactive connection IDs | Фільтрувати preferences за active visible IDs; потрібен staging readback |
| GT-006 | Відкрита | 1 | OAuth client має більше одного enabled secret | Окремо визначити active secret за protected runtime evidence; не видаляти й не ротувати в Versie 1 без безпечного плану |
| GT-007 | Відкрита, низький ризик | 1 | GitHub Pages попереджає про forced Node 24 для старих Actions | Оновити action pins у наступній Versie після production стабілізації |
| GT-008 | Заблокована ручним gate | 1 | Немає повного real-time acceptance нового Gmail flow | Після OAuth Save власник проходить account choice/consent; далі журнал усіх функцій |
| GT-009 | Вирішена локально | 1 | Accessibility label використовує множину для одного акаунта | `1 Gmail-акаунт`, множина для інших значень |
| GT-010 | Відкрита | 1 | OAuth token refresh path не має function-local lock; конкурентна поведінка не доведена | Додати lock або довести зовнішню серіалізацію; виконати контрольований concurrency test до production |
| GT-011 | Вирішена локально | 1 | Telegram settings не мали нативного one-click перемикання між Gmail-акаунтами | Додано user/zone-bound callback-кнопки, короткий OAuth launcher та автоматичне оновлення меню після callback; потрібен staging/readback |
| GT-012 | Вирішена локально | 1 | Підписана Google-сесія переписує Apps Script web-app URL у `/macros/u/N/` і повертає Drive “файл не знайдено” | Browser callback більше не навігується на Apps Script: relay стирає query та надсилає одноразові дані через `fetch(mode:no-cors, credentials:omit)` |

| GT-013 | Перевірена production | 1 | Owner-команда /settings потрапляла у fallback і не показувала Gmail-акаунти | Production v42 маршрутизує /settings і кнопку Gmail-акаунтів у нативне Telegram-меню |
| GT-014 | Перевірена production | 1 | Telegram menu web_app відкривав Apps Script у підписаній Google-сесії та повторював Drive error | Menu переведено на commands; production setup завершився, account flow більше не входить в Apps Script Mini App |
| GT-015 | Відкрита, без мутації даних | 1 | Два connection records тієї самої owner Gmail показуються окремими кнопками | Не видаляти й не зливати записи автоматично; додати account-zone display dedupe після factual identity check |
| GT-016 | Обмеження платформи | 1 | Telegram Web показує стандартний Open Link перед зовнішнім Google OAuth | Власний зайвий Continue with Google усунуто; системне попередження Telegram не обходити |
| GT-017 | Відкрита | 1 | Старі кнопки листів «Відкрити гілку в Mini App» ще можуть відкрити Apps Script Drive error у multi-login Chrome | Account/OAuth flow вже chat-native; повний Mini App потребує нейтрального response-capable backend або заміни legacy deep links |

| GT-018 | Виправлена локально, потрібен E5 | 1 | Нові Gmail-листи не доходять, доки frozen scan відпрацьовує старий backlog | Додано bounded realtime-смугу перед maintenance; frozen scan лишається backfill; потрібен immutable v43 і контрольний лист |
| GT-019 | Виправлена локально, потрібен E5 | 1 | Ручна `/check` перевіряла лише legacy mailbox | Manual check тепер об’єднує realtime і frozen fan-out для всіх notification connections |
| GT-020 | Відкрита операційна | 1 | У protected credential store лишився застарілий alias Telegram bot token, який повертає 401 | Runtime використовує окреме підтверджене protected посилання; не ротувати чинний token без окремого безпечного плану |

## Production-доказ 2026-07-20

- Apps Script stable: v42; staging: 0; immutable v41 збережено як rollback.
- Локальні тести: 418/418.
- setupTelegramControls завершився в Apps Script editor; Telegram menu став command-menu.
- Production /settings показав ізольовані Gmail-акаунти, one-click callbacks і прямий GitHub OAuth launcher.
- Реальний OAuth дійшов до нового Google consent gate; consent не підтверджено, callback success ще не доведено.
- REQ-0009: контрольний новий лист не з'явився після minute trigger і manual /check; webhook був healthy, тому збій локалізовано до frozen Gmail scan та порядку worker-ів.

## Як оновлювати

1. Нову проблему додати один раз із наступним `GT-*` ID.
2. Не видаляти вирішені записи; змінювати статус і додавати release evidence.
3. Не позначати `Перевірена production` лише за unit test або staging.
4. Не додавати email content, OAuth codes, tokens, cookies або secret properties.

## Дослідницький реєстр проблем

Повний report-derived список ризиків і невирішених конфліктів міститься в [Problems](knowledge-hub/PROBLEMS.md). Лише перевірені поточні дефекти отримують `GT-*` у таблиці вище.

## Незалежна перевірка

[VR-001](verification-reports/reports/VR-001/README.md) зберігає всі спростовані, часткові, неперевірені й заблоковані `KH-*` твердження. Вони не стають `GT-*` автоматично: `GT-010` додано окремо через статично підтверджену прогалину в поточному коді. Source request: `REQ-0004`.
