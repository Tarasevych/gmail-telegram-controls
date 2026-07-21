# REQ-0019 — Versie 1 shared bootstrap A/B recovery

- ID: REQ-0019
- Date: 2026-07-21
- Status: in_progress
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=update
- Permission basis: explicit
- Authority reference: REQ-0011 / P-006

<!-- lang:uk -->
## Українською

### Санітизоване трактування запиту

Власник наказав продовжити поточну `Versie 1` з перевіреного стану після exact rollback: stable і HEAD v55, immutable v56 збережено як історичний артефакт, один owner-only staging v56 збережено, а release journal має стан `rolled_back`. Однаковий network error відтворився на production v56 і після rollback на v55, тому regression v56 не підтверджена. До повторного promotion потрібні factual diagnosis і контрольований A/B gate.

### Маршрутизація

- `Запити`: цей sanitized owner request і подальший factual result.
- `Інструкції`: reference на чинні release, bilingual, evidence і safety правила; нової постійної норми не надано.
- `Повноваження`: reference на чинні `REQ-0011`/`P-006`; нового класу повноважень не надано.
- `План`: виконувати діагностику, A/B gate, acceptance, observability і cleanup послідовно.
- `Проблеми`: створити `GT-024` для shared bootstrap/network failure і відділити platform/quota blocker від candidate-specific regression.
- `Продукт`: змінювати код лише за доказаної code-level причини; immutable v56 не переписувати.
- `Release`: якщо потрібен fix, створити cumulative immutable v57 у межах `Versie 1`, зберегти exact rollback на v55 і просувати лише після повного gate.

### Критерії приймання

- Apps Script Executions доказово розрізняють URLFetch quota, bootstrap transport, session replay і Gmail API failure без читання чи публікації secret properties.
- Два свіжі production-запуски v55 завантажують mailbox без network error до перевірки candidate.
- Owner-only staging candidate проходить signed Telegram Desktop bootstrap, avatar, три account roots і перемикання на контрольований другий акаунт та назад без нового OAuth.
- Після promotion два свіжі production-запуски проходять acceptance; HEAD застосовується до trigger лише через штатний cleanup.
- Щонайменше чотири trigger opportunities підтверджують відсутність overlapping workers, 150-секундний worker slot і 15-хвилинний History slot.
- Один контрольований owner self-message створює рівно одну Telegram card і не дублюється після двох `/check`.

### Межі

- Не створювати `Versie 2`; next-Versie authorization відсутній.
- Не змінювати immutable v56 і не повторювати перемикання релізів, якщо однакова помилка відтворюється на v55 і candidate.
- Не мігрувати default GCP project лише заради логів.
- Не публікувати листи, OAuth tokens, `initData`, identifiers, credentials, cookies або secret properties; дозволена лише content-free telemetry.
- Не обходити повідомлення про недоступний контент або інші safety controls; зберігати лише sanitized видимий факт відмови.
- Не змішувати Gmail connections, Telegram user/chat або mail zones і не змінювати випадкові листи.
- Зупинитися на CAPTCHA, OTP/2FA, passkey/біометрії/hardware key, новій Google OAuth-згоді, оплаті, фізичній дії або невизначеній account/zone identity.

<!-- lang:en -->
## English

### Sanitized interpretation

The owner instructed continuation of the current `Versie 1` from the verified exact-rollback state: stable and HEAD are v55, immutable v56 is preserved as a historical artifact, one owner-only v56 staging deployment is preserved, and the release journal is `rolled_back`. The same network error reproduced on production v56 and on v55 after rollback, so a v56 regression is not confirmed. Factual diagnosis and a controlled A/B gate are required before any renewed promotion.

### Routing

- `Запити`: this sanitized owner request and the subsequent factual result.
- `Інструкції`: reference to current release, bilingual, evidence, and safety rules; no new standing rule was granted.
- `Повноваження`: reference to current `REQ-0011`/`P-006`; no new authority class was granted.
- Plan: execute diagnosis, A/B gate, acceptance, observability, and cleanup in sequence.
- Problems: create `GT-024` for the shared bootstrap/network failure and distinguish a platform/quota blocker from a candidate-specific regression.
- Product: change code only for a proven code-level cause; do not rewrite immutable v56.
- Release: if a fix is required, create cumulative immutable v57 within `Versie 1`, preserve exact rollback to v55, and promote only after the full gate.

### Acceptance criteria

- Apps Script Executions factually distinguish URLFetch quota, bootstrap transport, session replay, and Gmail API failure without reading or publishing secret properties.
- Two fresh production v55 launches load the mailbox without a network error before candidate testing.
- The owner-only staging candidate passes signed Telegram Desktop bootstrap, avatar, three account roots, and switching to the controlled second account and back without new OAuth.
- After promotion, two fresh production launches pass acceptance; HEAD reaches the trigger only through the standard cleanup path.
- At least four trigger opportunities confirm no overlapping workers, the 150-second worker slot, and the 15-minute History slot.
- One controlled owner self-message creates exactly one Telegram card and does not duplicate after two `/check` runs.

### Boundaries

- Do not create `Versie 2`; no next-Versie authorization exists.
- Do not modify immutable v56 or repeat release switching when the same failure reproduces on v55 and the candidate.
- Do not migrate the default GCP project solely for logs.
- Do not publish mail content, OAuth tokens, `initData`, identifiers, credentials, cookies, or secret properties; only content-free telemetry is allowed.
- Do not bypass unavailable-content messages or other safety controls; preserve only the sanitized visible fact of refusal.
- Do not mix Gmail connections, Telegram user/chat, or mail zones, and do not mutate arbitrary mail.
- Stop at CAPTCHA, OTP/2FA, passkey/biometric/hardware key, new Google OAuth consent, payment, physical action, or unresolved account/zone identity.
