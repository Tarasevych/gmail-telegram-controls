# Проєкт та очікування

Оновлено: **2026-07-19**. Поточна версія в роботі: **Versie 1**.

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
- Кожна Versie має локальні тести, staging acceptance, production verification, Git commit/tag і rollback mapping.

## Джерело істини

Для Gmail/Apps Script змін обов'язковим технічним gate є [перелік первинних джерел Google](GMAIL_PRIMARY_SOURCES.md). GitHub лишається канонічним сховищем коду та історії; Apps Script є runtime-поверхнею; Google Developer Profile використовується лише як підтримуваний discovery-індекс.

- Активний код: гілка поточної Versie.
- Останній підтверджений public release: `main` плюс release branch/tag.
- Поточні задачі: [ROADMAP.md](ROADMAP.md).
- Поточні дефекти: [ISSUES.md](ISSUES.md).
- Кумулятивна історія: [Versie 1](releases/VERSIE-001-2026-07-19.md).

## Приватність і секрети

У публічний Git не потрапляють bot tokens, OAuth client secrets, refresh/access tokens, authorization codes, cookies, Telegram `initData`, private chat IDs, вміст листів, приватні вкладення або protected runtime properties. Git містить код, шаблони конфігурації, санітизовані докази, рішення та спосіб отримання захищеної конфігурації без її значень.

## Definition of Done для Versie

- усі заявлені контракти пройшли;
- staging відповідає точному commit;
- ручні OAuth gates завершені власником;
- production вказує на immutable цієї Versie;
- Telegram menu відкриває production Versie;
- немає зайвих staging deployments або тимчасових процесів;
- статті UK/EN, реєстр проблем і roadmap оновлені;
- release branch/tag створені після перевірки, а не до неї.

## Кумулятивна база знань

[Knowledge hub](knowledge-hub/README.md) зберігає очищений і трасований контекст трьох deep-research reports. Цей файл залишається джерелом поточної мети, а hub є довгостроковим контекстом і не замінює live verification.

## Незалежна factual verification

[Verification reports](verification-reports/INDEX.md) є окремим доказовим шаром. `VR-001` класифікує всі 245 `KH-*` тверджень за первинними Git-артефактами й безпечними локальними тестами. Статус `verified` діє лише в указаному scope; `E1/E2` не доводить runtime або production. Source request: `REQ-0004`.
