# REQ-0018 — Versie 1 observability, fresh OAuth, and second-account fan-out

- ID: REQ-0018
- Date: 2026-07-21
- Status: in_progress
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=update
- Permission basis: explicit
- Authority reference: REQ-0011 / P-006

<!-- lang:uk -->
## Українською

### Санітизоване трактування запиту

Власник наказав продовжити поточну `Versie 1` з останньої перевіреної точки після stable Apps Script v55, E4/E5, GitHub merge та staging cleanup. Не повторювати завершений release. Наступна робота має закрити або доказово звузити відкриті `GT-021`/`GT-022`, перевірити fresh Google OAuth для нового контрольованого підключення та незалежну realtime-доставку з другого вже дозволеного Gmail connection.

### Маршрутизація

- `Запити`: цей незмінний sanitized owner request і factual result.
- `Інструкції`: reference; нової постійної норми не надано.
- `Повноваження`: reference на чинні `REQ-0011`/`P-006`; нового класу повноважень не надано.
- `План`: оновити factual status лише після перевірки.
- `Продукт`: змінювати тільки поточну лінію `Versie 1`, якщо root cause потребує коду.
- `Release`: не створювати й не просувати новий immutable artifact без фактичної code change, повного preflight та збереженого rollback.

### Межі

- Не створювати `Versie 2`; next-Versie authorization відсутній.
- Не вгадувати GCP project ID і не прив'язувати чужий cloud project.
- Не змішувати Gmail connections, Telegram user/chat або mail zones.
- Для live-перевірки використовувати лише контрольовані owner test artifacts; не змінювати випадкові листи.
- Зупинитися на CAPTCHA, OTP/2FA, passkey/біометрії/hardware key, оплаті, фізичній дії або невизначеній account/zone identity.

<!-- lang:en -->
## English

### Sanitized interpretation

The owner instructed continuation of the current `Versie 1` from the last verified point after stable Apps Script v55, E4/E5, GitHub merge, and staging cleanup. Do not repeat the completed release. The next work must close or factually narrow open `GT-021`/`GT-022`, verify fresh Google OAuth for a new controlled connection, and verify independent realtime delivery from a second already authorized Gmail connection.

### Routing

- `Запити`: this immutable sanitized owner request and factual result.
- `Інструкції`: reference; no new standing rule was granted.
- `Повноваження`: reference to current `REQ-0011`/`P-006`; no new authority class was granted.
- Plan: update factual status only after verification.
- Product: change only the current `Versie 1` line if root cause requires code.
- Release: do not create or promote a new immutable artifact without an actual code change, full preflight, and preserved rollback.

### Boundaries

- Do not create `Versie 2`; no next-Versie authorization exists.
- Do not guess a GCP project ID or bind an unrelated cloud project.
- Do not mix Gmail connections, Telegram user/chat, or mail zones.
- Use only controlled owner test artifacts for live verification; do not mutate arbitrary mail.
- Stop at CAPTCHA, OTP/2FA, passkey/biometric/hardware key, payment, physical action, or unresolved account/zone identity.
