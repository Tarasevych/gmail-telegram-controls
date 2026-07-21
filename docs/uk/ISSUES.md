# Реєстр знайдених проблем

Оновлено: **2026-07-21**. Статуси: `Відкрита`, `В роботі`, `Заблокована`, `Вирішена локально`, `Перевірена staging`, `Розгорнута production`, `Перевірена production`.

| ID | Статус | З Versie | Проблема | Рішення / наступний доказ |
|---|---|---:|---|---|
| GT-001 | Перевірена production | 1 | Один лист надходить у Telegram двічі | Stable v55 виключає Sent-копію, навіть коли Gmail також додає Inbox; контрольний `SENT+INBOX` лист дав рівно одну картку після автоматичної доставки та двох `/check` |
| GT-002 | В роботі | 1 | Google callback відкриває сторінку Диска замість сервісу | Direct Apps Script callback відхилено через офіційно непідтримуваний Google multi-login; впроваджується neutral GitHub callback + credentialless POST; потрібен live acceptance |
| GT-003 | Перевірена production | 1 | У header показується літера замість Google profile photo | Header використовує реальне Google profile photo з fallback; фото прочитано у staging та production v55 |
| GT-004 | Вирішена локально | 1 | `Додати Gmail-акаунт` вимагає зайвий клік `Продовжити в Google` | Відкривати authorization URL одразу; показувати fallback лише якщо браузер блокує перехід |
| GT-005 | Перевірена staging | 1 | Account panel рахує stale/inactive connection IDs | Preferences фільтруються за active visible IDs; staging v55 показав три ізольовані активні підключення та коректне відновлення початкового контексту |
| GT-006 | Відкрита | 1 | OAuth client має більше одного enabled secret | Окремо визначити active secret за protected runtime evidence; не видаляти й не ротувати в Versie 1 без безпечного плану |
| GT-007 | Відкрита, низький ризик | 1 | GitHub Pages попереджає про forced Node 24 для старих Actions | Оновити action pins у наступній Versie після production стабілізації |
| GT-008 | Частково перевірена production | 1 | Немає повного real-time acceptance нового Gmail flow | E5 для вже підключеного owner-акаунта пройдено; fresh account choice/consent/callback нового Gmail-акаунта та second-account fan-out залишаються неперевіреними |
| GT-009 | Вирішена локально | 1 | Accessibility label використовує множину для одного акаунта | `1 Gmail-акаунт`, множина для інших значень |
| GT-010 | Розгорнута production; concurrency перевірена локально | 1 | OAuth token refresh path не мав function-local coordination; паралельні виклики могли одночасно оновлювати один token record | Stable v55 містить короткі ScriptLock-секції claim/commit/release, per-connection lease без секретів, provider I/O поза lock і generation/reconnect recheck; примусовий live refresh не виконувався |
| GT-011 | Перевірена staging | 1 | Telegram settings не мали нативного one-click перемикання між Gmail-акаунтами | Staging v55 показав три ізольовані Gmail-підключення; one-click switch до іншого підключення та повернення до початкового контексту пройшли без OAuth |
| GT-012 | Перевірена staging для наявних сесій | 1 | Підписана Google-сесія переписує Apps Script web-app URL у `/macros/u/N/` і повертає Drive “файл не знайдено” | Neutral GitHub Pages bridge відкрив staging без Drive error; fresh OAuth callback ще не перевірено |

| GT-013 | Перевірена production | 1 | Owner-команда /settings потрапляла у fallback і не показувала Gmail-акаунти | Production v42 маршрутизує /settings і кнопку Gmail-акаунтів у нативне Telegram-меню |
| GT-014 | Перевірена production | 1 | Telegram menu web_app відкривав Apps Script у підписаній Google-сесії та повторював Drive error | Тимчасовий command-menu замінено на `📬 Пошта · Versie 1`; Web App відкриває нейтральний GitHub Pages bridge, а не прямий Apps Script URL |
| GT-015 | Відкрита, без мутації даних | 1 | Два connection records тієї самої owner Gmail показуються окремими кнопками | Не видаляти й не зливати записи автоматично; додати account-zone display dedupe після factual identity check |
| GT-016 | Обмеження платформи | 1 | Telegram Web показує стандартний Open Link перед зовнішнім Google OAuth | Власний зайвий Continue with Google усунуто; системне попередження Telegram не обходити |
| GT-017 | Відкрита | 1 | Старі кнопки листів «Відкрити гілку в Mini App» ще можуть відкрити Apps Script Drive error у multi-login Chrome | Account/OAuth flow вже chat-native; повний Mini App потребує нейтрального response-capable backend або заміни legacy deep links |

| GT-018 | Перевірена production | 1 | Нові Gmail-листи не доходять, доки frozen scan відпрацьовує старий backlog | Bounded realtime-смуга stable v55 доставила контрольний новий лист автоматично; frozen scan лишається backfill |
| GT-019 | Перевірена production | 1 | Ручна `/check` перевіряла лише legacy mailbox | Два послідовні `/check` після автоматичної доставки не створили повторної картки; exact-marker search залишився на одному результаті |
| GT-020 | Відкрита операційна | 1 | У protected credential store лишився застарілий alias Telegram bot token, який повертає 401 | Runtime використовує окреме підтверджене protected посилання; не ротувати чинний token без окремого безпечного плану |
| GT-021 | Відкрита production | 1 | Перше відкриття production Web App інколи лишається на skeleton понад 15 секунд | Після одного refresh mailbox завантажився; додати content-free timing для bridge/backend bootstrap і перевірити cold-start timeout без Gmail mutations |
| GT-022 | Обмеження платформи | 1 | `clasp logs` недоступний, бо production використовує Apps Script-managed default GCP project без standard project ID | Не мігрувати лише заради логів: це незворотно скасувало б чинні authorizations. Використовувати Apps Script Executions UI або окремий content-free telemetry reader |
| GT-023 | В роботі; root cause перевірено production | 1 | Єдиний хвилинний `checkNewMail_` виконується 80–106 секунд, тому запуски перекриваються та вичерпують денну квоту `URLFETCH` | Другого trigger немає. Candidate додає атомарний 150-секундний timer slot через короткий ScriptLock, лишає realtime першим, а повний Gmail History backfill обмежує одним запуском на 15 хвилин; потрібні локальні тести, staging і production evidence після відновлення зовнішньої квоти |
| GT-024 | Відкрита shared blocker | 1 | Web App bootstrap повернув однаковий network error на production v56 і після exact rollback на v55 | Candidate-specific regression не підтверджена; не перемикати релізи повторно до контрольованого A/B після відновлення зовнішньої квоти |
| GT-025 | Виправлена у source candidate; live unverified | 1 | Parallel thread metadata завжди використовувала Apps Script owner token навіть у зовнішньому multi-account context | Вибирати `mailboxMultiGmailAccessToken_` для активного `connectionId`, залишаючи `ScriptApp.getOAuthToken()` лише для legacy/owner lane; regression test забороняє hardcoded owner token |

## Production-доказ 2026-07-20

- Apps Script stable: v42; staging: 0; immutable v41 збережено як rollback.
- Локальні тести: 418/418.
- setupTelegramControls завершився в Apps Script editor; Telegram menu став command-menu.
- Production /settings показав ізольовані Gmail-акаунти, one-click callbacks і прямий GitHub OAuth launcher.
- Реальний OAuth дійшов до нового Google consent gate; consent не підтверджено, callback success ще не доведено.
- REQ-0009: контрольний новий лист не з'явився після minute trigger і manual /check; webhook був healthy, тому збій локалізовано до frozen Gmail scan та порядку worker-ів.

## Production-доказ 2026-07-21

- Bridge-only PR #2 злитий як `a7df53c`; product PR #1 після normal merge-конфлікту злитий як `ee9286e`. Конфлікт `delete/modify` вирішено збереженням уже перевіреного bridge з `main`, без відкату коду Versie 1.
- Immutable Apps Script v55 спочатку пройшов E4 у staging, потім stable deployment просунуто з v50 на v55. Після E5 тимчасовий staging видалено.
- Фінальний `PreflightOnly`: stable v55, `headState=candidate_v55`, immutable ready, staging 0, legacy staging 0, journal `cleaned`.
- Staging E4: Web App відкрив mailbox без Drive error, показав profile photo, три ізольовані Gmail-підключення та one-click switch із відновленням початкового контексту.
- Production E5: контрольний owner self-message з `SENT+INBOX` автоматично створив одну картку; два `/check` повернули «Нових листів немає», а exact-marker search двічі показав один результат.
- Production menu: `📬 Пошта · Versie 1` відкриває статичний GitHub Pages bridge. Випадкові листи, OAuth records і Gmail-зони не змінювалися.
- Перше production-відкриття вимагало одного refresh після skeleton; `clasp logs` не запустився без підтвердженого GCP project ID. Обидва спостереження лишаються відкритими як GT-021/GT-022.
- Apps Script Executions підтвердив причину нового delivery outage: один хвилинний trigger породжував перекривні 80–106-секундні виконання, а Gmail History fan-out щохвилини завершився `Service invoked too many times for one day: urlfetch`. Trigger list містив рівно один `checkNewMail_`; конфігурацію trigger не змінено.
- GT-022 перекласифіковано як platform constraint: production використовує Apps Script-managed default GCP project. Перехід на standard GCP project лише заради `clasp logs` незворотно скасував би чинні authorizations, тому його не виконано; безпечним доказовим джерелом лишається Apps Script Executions UI.

## Як оновлювати

1. Нову проблему додати один раз із наступним `GT-*` ID.
2. Не видаляти вирішені записи; змінювати статус і додавати release evidence.
3. Не позначати `Перевірена production` лише за unit test або staging.
4. Не додавати email content, OAuth codes, tokens, cookies або secret properties.

## Дослідницький реєстр проблем

Повний report-derived список ризиків і невирішених конфліктів міститься в [Problems](knowledge-hub/PROBLEMS.md). Лише перевірені поточні дефекти отримують `GT-*` у таблиці вище.

## Незалежна перевірка

[VR-001](verification-reports/reports/VR-001/README.md) зберігає всі спростовані, часткові, неперевірені й заблоковані `KH-*` твердження. Вони не стають `GT-*` автоматично: `GT-010` додано окремо через статично підтверджену прогалину в поточному коді. Source request: `REQ-0004`.
