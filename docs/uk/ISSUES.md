# Реєстр знайдених проблем

Оновлено: **2026-07-19**. Статуси: `Відкрита`, `В роботі`, `Заблокована`, `Вирішена локально`, `Перевірена production`.

| ID | Статус | З Build | Проблема | Рішення / наступний доказ |
|---|---|---:|---|---|
| GT-001 | Вирішена локально | 1 | Один лист надходить у Telegram двічі | Не сканувати owner mailbox повторно через OAuth і дедуплікувати same-user/same-email; потрібен real-time acceptance |
| GT-002 | В роботі | 1 | Google callback відкриває сторінку Диска замість сервісу | GitHub Pages relay live; OAuth redirect URI збережено й прочитано назад; потрібен staging callback acceptance |
| GT-003 | Вирішена локально | 1 | У header показується літера замість Google profile photo | Header використовує реальне фото з fallback на initial; потрібен staging readback |
| GT-004 | Вирішена локально | 1 | `Додати Gmail-акаунт` вимагає зайвий клік `Продовжити в Google` | Відкривати authorization URL одразу; показувати fallback лише якщо браузер блокує перехід |
| GT-005 | Вирішена локально | 1 | Account panel рахує stale/inactive connection IDs | Фільтрувати preferences за active visible IDs; потрібен staging readback |
| GT-006 | Відкрита | 1 | OAuth client має більше одного enabled secret | Окремо визначити active secret за protected runtime evidence; не видаляти й не ротувати в Versie 1 без безпечного плану |
| GT-007 | Відкрита, низький ризик | 1 | GitHub Pages попереджає про forced Node 24 для старих Actions | Оновити action pins у наступному Build після production стабілізації |
| GT-008 | Заблокована ручним gate | 1 | Немає повного real-time acceptance нового Gmail flow | Після OAuth Save власник проходить account choice/consent; далі журнал усіх функцій |
| GT-009 | Вирішена локально | 1 | Accessibility label використовує множину для одного акаунта | `1 Gmail-акаунт`, множина для інших значень |

## Як оновлювати

1. Нову проблему додати один раз із наступним `GT-*` ID.
2. Не видаляти вирішені записи; змінювати статус і додавати release evidence.
3. Не позначати `Перевірена production` лише за unit test або staging.
4. Не додавати email content, OAuth codes, tokens, cookies або secret properties.
