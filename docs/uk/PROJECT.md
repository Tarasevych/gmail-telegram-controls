# Проєкт та очікування

Оновлено: **2026-07-19**. Поточна версія в роботі: **Build 1**.

## Мета

Створити безпечний, нейроінклюзивний Gmail-клієнт у Telegram для одного власника та явно підключених Gmail-акаунтів: швидко показувати пошту, зменшувати когнітивне навантаження, підтримувати контрольовані дії та не змішувати акаунти, зони чи сесії.

## Очікування продукту

- Один Gmail message не створює дві Telegram-картки.
- Кожна Gmail-операція виконується тільки для явно вибраного account/connection.
- Додавання Gmail відкриває Google одразу, а callback повертає користувача до Telegram без сторінки Диска.
- Фото Google-профілю відображається там, де воно доступне; літера є лише fallback.
- Поведінка desktop і mobile перевіряється окремо.
- Реальні Gmail mutations не виконуються на випадкових листах; acceptance використовує контрольований тестовий лист або read-only перевірку.
- OTP, CAPTCHA, новий consent конкретного користувача та суттєвий ручний вибір залишаються точками втручання власника.
- Кожний Build має локальні тести, staging acceptance, production verification, Git commit/tag і rollback mapping.

## Джерело істини

- Активний код: гілка поточного Build.
- Останній підтверджений public release: `main` плюс release branch/tag.
- Поточні задачі: [ROADMAP.md](ROADMAP.md).
- Поточні дефекти: [ISSUES.md](ISSUES.md).
- Кумулятивна історія: [Build 1](releases/BUILD-001-2026-07-19.md).

## Приватність і секрети

У публічний Git не потрапляють bot tokens, OAuth client secrets, refresh/access tokens, authorization codes, cookies, Telegram `initData`, private chat IDs, вміст листів, приватні вкладення або protected runtime properties. Git містить код, шаблони конфігурації, санітизовані докази, рішення та спосіб отримання захищеної конфігурації без її значень.

## Definition of Done для Build

- усі заявлені контракти пройшли;
- staging відповідає точному commit;
- ручні OAuth gates завершені власником;
- production вказує на immutable цього Build;
- Telegram menu відкриває production Build;
- немає зайвих staging deployments або тимчасових процесів;
- статті UK/EN, реєстр проблем і roadmap оновлені;
- release branch/tag створені після перевірки, а не до неї.
