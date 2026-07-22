# REQ-0032 — Динамічний контекст активної пошти / Dynamic active-mail context

- ID: REQ-0032
- Date: 2026-07-22
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=reference
- Permission basis: none

<!-- lang:uk -->
## Українською

### Нормалізований запит

- У межах чинної Versie 1 замінити статичний заголовок головної поштової сторінки на динамічний блок, який відображає фактичний активний акаунт або фактичний спільний режим.
- Використати наявне джерело стану перемикання акаунтів і стабільний внутрішній ідентифікатор підключення; не створювати паралельну модель стану та не змінювати правила доступу до Gmail або склад спільного перегляду.
- Для одного активного акаунта показувати граматично коректний локалізований заголовок, ім'я власника, повну email-адресу та фото як додатковий, але не єдиний орієнтир.
- Якщо ім'я недоступне, основним ідентифікатором має бути повна email-адреса. Відсутнє фото не повинно блокувати розпізнавання акаунта.
- Для фактичного спільного режиму показувати «Спільна пошта», імена залучених власників і доступне зіставлення кожного імені з повною email-адресою. Не називати режим спільним, якщо активний лише один акаунт.
- Оновлювати блок без перезавантаження після перемикання акаунта, зміни режиму або складу спільного перегляду.
- Забезпечити читабельність довгих імен та адрес, адаптивність, масштабування, видимий фокус, клавіатурну навігацію, доступні назви й сумісність із програмами зчитування з екрана.
- Передбачити стани завантаження, відсутнього імені, відсутнього фото та помилки профілю без змішування Gmail-акаунтів.

### Критерії завершення

- Автоматичні тести покривають один акаунт, два акаунти з однаковими іменами, спільний перегляд, зміну складу спільного перегляду, відсутні ім'я/фото, довгі значення, вузький екран і оновлення без перезавантаження.
- Приклади «Пошта Павла» та «Пошта Ольги» відображаються у правильному відмінку без жорстко записаної особи.
- Повна email-адреса лишається доступною в усіх розмірах екрана.
- Реалізація повторно використовує чинний стан активного підключення та не змінює OAuth, Gmail permissions або склад поштового потоку.
- Релевантні UK/EN сторінки, журнал проблем, план і verification evidence оновлені парами та пройшли чинні перевірки документації.
- Нова immutable release-версія не створюється лише цим записом; release/promotion підпорядковуються чинним bounded gates і відкритим runtime-блокерам.

<!-- lang:en -->
## English

### Normalized request

- Within the current Versie 1, replace the static main-mail-page heading with a dynamic block that reflects the actual active account or the actual shared mode.
- Reuse the existing account-switching state source and stable internal connection identifier; do not create a parallel state model or change Gmail access rules or shared-view membership.
- For one active account, show a grammatically correct localized heading, owner name, full email address, and the photo as a supplementary rather than sole identifier.
- When the name is unavailable, use the full email address as the primary identifier. A missing photo must not prevent account identification.
- For an actual shared mode, show “Спільна пошта” in the Ukrainian UI, the participating owners, and an accessible mapping from every name to the full email address. Do not label the mode shared when only one account is active.
- Update the block without a page reload after account switching, mode changes, or shared-view membership changes.
- Preserve readability for long names and addresses, responsive layout, zoom support, visible focus, keyboard navigation, accessible names, and screen-reader compatibility.
- Provide loading, missing-name, missing-photo, and profile-error states without mixing Gmail accounts.

### Completion criteria

- Automated tests cover one account, two accounts with equal names, shared view, shared-membership changes, missing name/photo, long values, narrow screens, and updates without reload.
- The Ukrainian examples “Пошта Павла” and “Пошта Ольги” use the correct case without hard-coding a person.
- The full email address remains accessible at every viewport size.
- The implementation reuses current active-connection state and does not change OAuth, Gmail permissions, or mail-flow composition.
- Relevant UK/EN pages, issue ledger, plan, and verification evidence are updated in pairs and pass the current documentation checks.
- This record alone does not authorize a new immutable release; release and promotion remain subject to the existing bounded gates and open runtime blockers.
