# VR-033 — E-04 Регресійна перевірка керування Gmail-мітками

Verification framework: REQ-0004

- **Статус:** `CONFLICTING`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-027`, `B1-21`, історичний `VR-005`
- **English mirror:** [VR-033](../../../../en/verification-reports/reports/VR-033/README.md)

## Атомарні твердження

| Твердження | Категорія | Статус | Походження |
|---|---|---|---|
| Gmail Label має authoritative `type`: `user` можна змінювати/видаляти, `system` — ні; name і visibility не замінюють `type` | API | `VERIFIED` | [Gmail Label resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels), [Manage labels](https://developers.google.com/workspace/gmail/api/guides/labels) |
| Current backend будує `canEdit` лише з provider `type=user`, не з prefix або localized name | Source | `VERIFIED` | `apps-script/MailClient.gs`; E-04 behavioral matrix |
| USER-мітки `INBOX/...`, `[Imap]/...`, localized/system-like names і `labelHide` зберігають edit contract; SYSTEM label із user-like name його не отримує | Regression | `VERIFIED` | synthetic backend/client fixtures |
| Sidebar і profile manager використовують один metadata snapshot; тільки USER labels отримують management action, а late account response не оновлює інший Gmail context | State/ізоляція | `VERIFIED` | `apps-script/MailApp.html`; existing account-scoped contracts |
| Довгі/вкладені назви, bounded scroll, keyboard submit, ARIA labels, permission/retry і guarded delete лишаються в current source | UX/доступність | `VERIFIED` | focused E-04 contracts |
| Current source має дефект, який видаляє pencils для USER labels | Root cause | `UNVERIFIED` | Source audit і tests дефект не відтворили |
| Історичний v59 staging показував pencils, але поточний owner report повідомляє про їх відсутність | Runtime | `CONFLICTING` | [VR-005](../VR-005/README.md) та sanitized owner report |
| Current production v65 пройшов read-only native E-04 acceptance | Runtime | `UNVERIFIED` | Shared Apps Script URL Fetch quota блокує причинно валідний readback; staging `0` |

## Перевірки

- Focused label contracts: `7/7`.
- Повний Apps Script suite: `619/619`.
- Жодної реальної Gmail label create/rename/delete, OAuth, Telegram mutation, staging або production action не виконано.
- Fixtures не містять реальних email, label names, message content, token або provider error text.

## Висновок і межі

- Status `CONFLICTING`: source contract підтверджено, але current native owner observation суперечить історичному live evidence і ще не відтворений незалежно.
- Active `GT-027/B1-21` виправлено з застарілих production v57/v59 тверджень на current boundary: production v65, staging `0`.
- Наступний доказовий крок — read-only UI acceptance після відновлення quota: `+`, pencil для кожної USER label, відсутність pencil для SYSTEM, long-name readability і sync двох surfaces без будь-якої реальної mutation.
