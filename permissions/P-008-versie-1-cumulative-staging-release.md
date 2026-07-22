# P-008: Cumulative staging і conditional production Versie 1 / Cumulative staging and conditional production for Versie 1

Source request: `REQ-0028`
Status: `active`
Granted by: project owner on `2026-07-22`
Scope: one cumulative Versie 1 release cycle

## Українською

### Надані повноваження

- Виконати normal merge PR #16 і PR #11 після required checks без rebase, force-push або переписування історії.
- Оновлювати пов'язані branches, commits, normal pushes, PR metadata та release evidence у межах `REQ-0028`.
- Створити наступну cumulative immutable Apps Script version у межах Versie 1 та розгорнути її як owner-only staging candidate.
- Виконати release preflight і staging acceptance для Telegram bootstrap, mailbox, avatar, account roots/switching, Gmail labels, owner Advanced Gmail read adapter, duplicate suppression та account/zone isolation.
- Виконати production promotion лише після того, як усі staging gates отримають статус `VERIFIED`, точний deployment readback успішний і rollback до production v57 готовий.

### Межі

- Це не дозвіл на Versie 2 або будь-яку іншу наступну продуктову Versie.
- Immutable version не змінюється після створення. Code-level виправлення потребує наступної immutable Apps Script version.
- Якщо будь-який staging gate має статус `PARTIAL`, `UNVERIFIED`, `CONFLICTING`, `BLOCKED` або failed, production promotion заборонене.
- Заборонено обходити branch protection, required checks, CAPTCHA, OTP/2FA, passkey, Google consent або secret protection.
- Новий OAuth scope чи нова Google consent конкретного користувача є manual gate і не випливає з цього дозволу.
- Не змінювати випадкові Gmail records і не змішувати Gmail accounts, Telegram zones або owner/external OAuth paths.
- Повноваження є одноразовим для циклу `REQ-0028`; після verified completion або failed release gate статус має бути оновлений на `consumed` або `blocked` з доказами.

## English

### Granted authority

- Normally merge PR #16 and PR #11 after required checks, without rebasing, force-pushing, or rewriting history.
- Update related branches, commits, normal pushes, PR metadata, and release evidence within `REQ-0028`.
- Create the next cumulative immutable Apps Script version within Versie 1 and deploy it as an owner-only staging candidate.
- Run release preflight and staging acceptance for Telegram bootstrap, mailbox, avatar, account roots/switching, Gmail labels, the owner Advanced Gmail read adapter, duplicate suppression, and account/zone isolation.
- Promote to production only after every staging gate is `VERIFIED`, exact deployment readback succeeds, and rollback to production v57 is ready.

### Boundaries

- This is not authorization for Versie 2 or any other next product Versie.
- An immutable version is never changed after creation. A code-level fix requires the next immutable Apps Script version.
- Production promotion is forbidden if any staging gate is `PARTIAL`, `UNVERIFIED`, `CONFLICTING`, `BLOCKED`, or failed.
- Branch protection, required checks, CAPTCHA, OTP/2FA, passkeys, Google consent, and secret protection must not be bypassed.
- A new OAuth scope or new user-specific Google consent is a manual gate and is not implied by this authorization.
- Do not mutate arbitrary Gmail records or mix Gmail accounts, Telegram zones, or owner/external OAuth paths.
- This authority is single-use for the `REQ-0028` cycle; after verified completion or a failed release gate, update its status to `consumed` or `blocked` with evidence.
