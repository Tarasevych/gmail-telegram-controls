# REQ-0024: Owner-only Advanced Gmail read adapter

- ID: REQ-0024
- Date: 2026-07-21
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Продовжити `Versie 1` після підтвердження shared daily `URLFETCH` quota blocker без повторних quota-consuming запусків.
- Розробити ізольований owner-only read adapter для офіційного Apps Script Advanced Gmail Service під protected feature flag.
- Зберегти connection-scoped direct Gmail HTTP transport для всіх зовнішніх Gmail connections; не змішувати owner token, external OAuth tokens, Gmail accounts або Telegram zones.
- Додати детерміновані regression-тести й опублікувати лише перевірені source/doc зміни через звичайний GitHub PR; приватний GitLab лишається non-force recovery mirror.

### Критерії завершення

- Запис опубліковано до product mutation і він проходить валідатори гілки `Запити`.
- Allowlisted owner read operations можуть використовувати Advanced Gmail Service лише за явного protected flag; за замовчуванням чинний transport не змінюється.
- External connection reads, усі mutations та unsupported paths залишаються на поточному connection-scoped direct HTTP transport.
- Advanced Service error не запускає прихований direct-HTTP fallback.
- Targeted і повний локальні suites проходять; evidence не містить mail content, tokens, `initData`, identifiers або secret properties.
- Перевірений source commit зливається normal PR до канонічного GitHub і після green baseline дзеркалиться звичайним non-force push у приватний GitLab.

### Межа

Production лишається immutable v55; історичний v56 і один owner-only staging v57 не переписуються. Немає дозволу активувати feature flag, створити новий immutable, виконати promotion, повторний OAuth, Gmail mutation, trigger change або Telegram-zone change. Live A/B відновлюється лише після зовнішнього quota recovery.

<!-- lang:en -->
## English

### Normalized request

- Continue `Versie 1` after confirming the shared daily `URLFETCH` quota blocker, without repeated quota-consuming launches.
- Develop an isolated owner-only read adapter for the official Apps Script Advanced Gmail Service behind a protected feature flag.
- Preserve connection-scoped direct Gmail HTTP transport for every external Gmail connection; do not mix the owner token, external OAuth tokens, Gmail accounts, or Telegram zones.
- Add deterministic regression tests and publish only verified source/documentation changes through a normal GitHub PR; private GitLab remains a non-force recovery mirror.

### Completion criteria

- The record is published before product mutation and passes the `Запити` branch validators.
- Allowlisted owner read operations can use Advanced Gmail Service only under an explicit protected flag; the existing transport remains unchanged by default.
- External-connection reads, every mutation, and unsupported paths remain on the current connection-scoped direct HTTP transport.
- An Advanced Service error does not trigger a hidden direct-HTTP fallback.
- Targeted and full local suites pass; evidence contains no mail content, tokens, `initData`, identifiers, or secret properties.
- The verified source commit is merged by normal PR into canonical GitHub and, after a green baseline, mirrored by an ordinary non-force push to private GitLab.

### Boundary

Production remains immutable v55; historical v56 and the single owner-only staging v57 are not rewritten. There is no authority to enable the feature flag, create a new immutable, promote production, repeat OAuth, mutate Gmail, change triggers, or change a Telegram zone. Live A/B resumes only after external quota recovery.
