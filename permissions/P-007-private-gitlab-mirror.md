# P-007: Приватне GitLab-дзеркало / Private GitLab mirror

- Status / Статус: active / чинне
- Source request / Джерело: `REQ-0022` on `Запити`
- Owner profile / Профіль власника: `https://gitlab.com/tarasevych.pavlo`
- Canonical authority / Канонічне джерело: `Tarasevych/gmail-telegram-controls` on GitHub

<!-- lang:uk -->
## Українською

Власник прямо дозволяє Codex, якщо це практично допомагає проєкту:

- використовувати наявний GitLab-профіль власника;
- перевірити чинну GitLab authentication без виведення credentials;
- створити окремий private GitLab project для synchronized off-platform mirror;
- додати GitLab як додатковий remote і виконувати звичайний non-force push лише перевірених Git refs;
- використовувати mirror для recovery та додаткових CI checks, якщо вони не суперечать GitHub contracts;
- документувати mirror URL, sync status і останній підтверджений commit без secrets.

## Межі

- GitHub лишається єдиною source-of-truth для product code, Versie/release history, issues, plans і public knowledge hub.
- GitLab mirror не створює паралельну Versie, release numbering line або незалежну release authority.
- Project на GitLab має бути `private`, доки власник окремо не накаже інше.
- Заборонено force-push, rewrite/delete history, зміну unrelated GitLab projects або автоматичне вирішення divergence на користь mirror.
- Secrets, tokens, cookies, OAuth/session material, mailbox content, `initData`, private identifiers і protected local state не публікуються.
- Якщо потрібні OTP/2FA, CAPTCHA, passkey/biometric/hardware key або неоднозначний manual choice, агент зупиняється.
- Це повноваження не дозволяє promotion v57, нову Versie, Gmail mutation, OAuth repetition або зміну Telegram zone.

<!-- lang:en -->
## English

The owner explicitly authorizes Codex, when it is practically useful to the project, to:

- use the owner's existing GitLab profile;
- verify current GitLab authentication without exposing credentials;
- create a separate private GitLab project for a synchronized off-platform mirror;
- add GitLab as an additional remote and use ordinary non-force push only for verified Git refs;
- use the mirror for recovery and additional CI checks when they do not conflict with GitHub contracts;
- document the mirror URL, sync status, and last confirmed commit without secrets.

## Boundaries

- GitHub remains the sole source of truth for product code, Versie/release history, issues, plans, and the public knowledge hub.
- The GitLab mirror does not create a parallel Versie, release-numbering line, or independent release authority.
- The GitLab project remains `private` unless the owner separately orders otherwise.
- Force-push, history rewrite/deletion, changes to unrelated GitLab projects, and automatic divergence resolution in favor of the mirror are prohibited.
- Secrets, tokens, cookies, OAuth/session material, mailbox content, `initData`, private identifiers, and protected local state are not published.
- If OTP/2FA, CAPTCHA, passkey/biometric/hardware key, or an ambiguous material choice is required, the agent stops.
- This authority does not permit v57 promotion, a new Versie, Gmail mutation, OAuth repetition, or a Telegram-zone change.
