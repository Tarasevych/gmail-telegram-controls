# REQ-0026: Unified Gmail label management

- ID: REQ-0026
- Date: 2026-07-22
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=reference
- Permission basis: explicit

<!-- lang:uk -->
## Українська

### Нормалізований запит

Дослідити, задокументувати й виправити керування Gmail-мітками у чинній Versie 1 без створення паралельної продуктової структури. Обидві поверхні Mini App, профільна панель «Мітки й налаштування Gmail» і ліва навігація «Мітки», мають використовувати спільний стан і спільні операції створення, перейменування та безпечного видалення користувацьких міток.

### Межі реалізації

- виправити перекриття довгих назв елементами керування, забезпечити перенесення тексту, керовану прокрутку й адаптивність;
- додати кнопку створення біля заголовка «Мітки» та компактну доступну кнопку керування біля кожної користувацької мітки;
- застосувати поступове розкриття другорядних дій без рухомого тексту, мерехтіння або нав'язливої анімації;
- зберегти видимий фокус, клавіатурну навігацію, доступні назви та повідомлення про завантаження, успіх, помилку, порожній стан і відсутність дозволів;
- синхронно оновлювати обидві поверхні після підтвердженої Gmail API операції без перезавантаження;
- відрізняти `SYSTEM` від `USER` і блокувати створення, зміну або видалення системних та внутрішніх міток;
- не вигадувати окремий parent/category API: Gmail API надає ресурс мітки з повною назвою, але без поля батьківської мітки;
- додати регресійні, вузькоекранні, клавіатурні, accessibility, API-error/retry і state-convergence перевірки;
- оновити парні UK/EN документи, проблему, план/завдання та незалежний factual verification report лише після доказів.

### Джерела й обмеження

- Офіційний Gmail API: <https://developers.google.com/workspace/gmail/api/guides/labels>
- Ресурс `users.labels`: <https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels>
- Довідка Gmail щодо вкладених міток: <https://support.google.com/mail/answer/118708>
- Не повторювати OAuth і не змінювати випадкові листи або сторонні мітки.
- Зупинитися на CAPTCHA, OTP/2FA, passkey, новій Google OAuth-згоді або неоднозначності Gmail/Telegram-зони.

### Критерії завершення

Результат можна позначити `VERIFIED` лише після релевантних автоматичних перевірок, збірки, документаційних валідаторів і візуальної перевірки обох поверхонь на кількох ширинах. Новий immutable release і production promotion залишаються окремими release-gates.

<!-- lang:en -->
## English

### Normalized request

Research, document, and fix Gmail label management in the current Versie 1 without creating a parallel product structure. Both Mini App surfaces, the profile-side “Gmail labels and settings” panel and the left “Labels” navigation, must use shared state and shared create, rename, and safe-delete operations for user labels.

### Implementation boundary

- prevent long names from overlapping controls and provide wrapping, bounded scrolling, and responsive layout;
- add a create button beside the “Labels” heading and a compact accessible management button beside every user label;
- use progressive disclosure for secondary actions without moving text, flashing, or distracting animation;
- preserve visible focus, keyboard navigation, accessible names, and loading, success, error, empty, and permission-denied states;
- synchronously update both surfaces after a confirmed Gmail API operation without reloading;
- distinguish `SYSTEM` from `USER` and block creation, mutation, or deletion of system and internal labels;
- do not invent a parent/category API: Gmail API exposes a label resource with a full display name but no parent-label field;
- add regression, narrow-screen, keyboard, accessibility, API-error/retry, and state-convergence checks;
- update paired UK/EN documentation, the issue register, plan/tasks, and an independent factual verification report only from evidence.

### Sources and constraints

- Official Gmail API: <https://developers.google.com/workspace/gmail/api/guides/labels>
- `users.labels` resource: <https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels>
- Gmail Help for nested labels: <https://support.google.com/mail/answer/118708>
- Do not repeat OAuth or mutate arbitrary messages or unrelated labels.
- Stop at CAPTCHA, OTP/2FA, passkey, new Google OAuth consent, or ambiguous Gmail/Telegram zone selection.

### Completion criteria

The result may be marked `VERIFIED` only after relevant automated checks, build, documentation validators, and visual verification of both surfaces at multiple widths. A new immutable release and production promotion remain separate release gates.

## Докази реалізації — 2026-07-22

- **Статус:** PARTIAL
- **Product branch:** `fix/versie-001-unified-gmail-label-management`
- **Code commit:** [`4ac0b90fbdbe7c9032789da1734bb986795fab91`](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91)
- **Documentation commit:** [`69de50d7734328bc7c1a300f179feeddf757cfe2`](https://github.com/Tarasevych/gmail-telegram-controls/commit/69de50d7734328bc7c1a300f179feeddf757cfe2)
- **Draft PR:** [#16](https://github.com/Tarasevych/gmail-telegram-controls/pull/16)
- **Перевірено:** UI contract `84/84`; full suite `447/448`; bilingual, knowledge-hub, verification-report, whitespace та secret-pattern gates пройшли; responsive visual acceptance пройдено на 390×760 і 1280×820.
- **Release boundary:** BLOCKED — єдина full-suite помилка є exact-hash gate immutable v57. Новий immutable candidate, deployment або live label mutation не виконувалися.

## Implementation evidence — 2026-07-22

- **Status:** PARTIAL
- **Product branch:** `fix/versie-001-unified-gmail-label-management`
- **Code commit:** [`4ac0b90fbdbe7c9032789da1734bb986795fab91`](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91)
- **Documentation commit:** [`69de50d7734328bc7c1a300f179feeddf757cfe2`](https://github.com/Tarasevych/gmail-telegram-controls/commit/69de50d7734328bc7c1a300f179feeddf757cfe2)
- **Draft PR:** [#16](https://github.com/Tarasevych/gmail-telegram-controls/pull/16)
- **Verified:** UI contract `84/84`; full suite `447/448`; bilingual, knowledge-hub, verification-report, whitespace, and secret-pattern gates passed; responsive visual acceptance passed at 390×760 and 1280×820.
- **Release boundary:** BLOCKED — the only full-suite failure is the immutable v57 exact-hash gate. No new immutable candidate, deployment, or live label mutation was performed.
### Фінальне доповнення доказів

- VR-005 доповнено `CONFLICTING` розбіжністю офіційних меж labels (REST resource 10 000; Gmail Help 5 000) у [`dd2a4226d6c3cfb6456aa1829270cf6aee01e252`](https://github.com/Tarasevych/gmail-telegram-controls/commit/dd2a4226d6c3cfb6456aa1829270cf6aee01e252).
- Product head для PR #16: `dd2a4226d6c3cfb6456aa1829270cf6aee01e252`. Release boundary залишається BLOCKED.

### Final evidence addendum

- VR-005 now records the `CONFLICTING` official label-limit sources (10,000 in the REST resource; 5,000 in Gmail Help) in [`dd2a4226d6c3cfb6456aa1829270cf6aee01e252`](https://github.com/Tarasevych/gmail-telegram-controls/commit/dd2a4226d6c3cfb6456aa1829270cf6aee01e252).
- Product head for PR #16: `dd2a4226d6c3cfb6456aa1829270cf6aee01e252`. The release boundary remains BLOCKED.