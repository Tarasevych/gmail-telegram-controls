# REQ-0019 — Versie 1 shared bootstrap A/B recovery

- ID: REQ-0019
- Date: 2026-07-21
- Status: completed
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
- Один контрольований inbound marker із owner-джерела, яке не входить до primary Gmail `Send mail as` aliases, створює рівно одну Telegram card і не дублюється після двох `/check`. Self/alias probes з `INBOX+SENT` мають бути пропущені чинним dedupe-інваріантом.

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
- One controlled inbound marker from an owner source that is not one of the primary Gmail `Send mail as` aliases creates exactly one Telegram card and does not duplicate after two `/check` runs. Self/alias probes carrying `INBOX+SENT` must be skipped by the existing dedupe invariant.

### Boundaries

- Do not create `Versie 2`; no next-Versie authorization exists.
- Do not modify immutable v56 or repeat release switching when the same failure reproduces on v55 and the candidate.
- Do not migrate the default GCP project solely for logs.
- Do not publish mail content, OAuth tokens, `initData`, identifiers, credentials, cookies, or secret properties; only content-free telemetry is allowed.
- Do not bypass unavailable-content messages or other safety controls; preserve only the sanitized visible fact of refusal.
- Do not mix Gmail connections, Telegram user/chat, or mail zones, and do not mutate arbitrary mail.
- Stop at CAPTCHA, OTP/2FA, passkey/biometric/hardware key, new Google OAuth consent, payment, physical action, or unresolved account/zone identity.

<!-- lang:uk -->
## Проміжний доказ 2026-07-21

- Перший ledger commit `f4fc31f` мав неканонічні значення `Routes`, тому GitHub Request ledger правильно завершився failure. Історію не переписано: follow-up commit `fc1d0a6` виправив лише routing vocabulary; Request ledger і Bilingual documentation для нього пройшли.
- Apps Script Executions показали completed `doPost`, session redemption/renewal і `mailboxRpc` на v56 та exact-rollback v55. У ті самі часові вікна worker падав з `Service invoked too many times for one day: urlfetch` у Gmail API path.
- Candidate-specific regression не підтверджена. Safe state лишається stable і HEAD v55, immutable staging v56 збережено, journal `rolled_back`, Telegram menu на production.
- `GT-024`, оновлений `B1-16`, A/B gate і cumulative release evidence опубліковані у PR #5 на commit `5596493`; локальні docs/release contracts пройшли `17/17`, bilingual parity — `44` пари, усі шість PR checks успішні.
- PR #5 не зливається до A/B pass. Наступна safe action — не створювати додаткові quota-consuming launches, а після factual quota recovery отримати два чисті v55 launches і лише потім перевірити preserved staging v56.

<!-- lang:en -->
## Interim evidence 2026-07-21

- The first ledger commit `f4fc31f` used non-canonical `Routes` values, so the GitHub Request ledger correctly failed. History was not rewritten: follow-up commit `fc1d0a6` changed only the routing vocabulary; its Request ledger and Bilingual documentation checks passed.
- Apps Script Executions showed completed `doPost`, session redemption/renewal, and `mailboxRpc` calls on v56 and exact-rollback v55. In the same time windows, the worker failed with `Service invoked too many times for one day: urlfetch` in the Gmail API path.
- No candidate-specific regression is confirmed. The safe state remains stable and HEAD v55, immutable staging v56 preserved, journal `rolled_back`, and the Telegram menu on production.
- `GT-024`, the updated `B1-16`, the A/B gate, and cumulative release evidence are published in PR #5 at commit `5596493`; local docs/release contracts passed `17/17`, bilingual parity passed `44` pairs, and all six PR checks succeeded.
- PR #5 is not merged before the A/B pass. The next safe action is to avoid additional quota-consuming launches and, after factual quota recovery, obtain two clean v55 launches before testing preserved staging v56.

<!-- lang:uk -->
## Blocked audit 2026-07-21

- Три послідовні goal turns дали однаковий read-only результат: Apps Script daily `urlfetch` quota лишається вичерпаною.
- У третьому audit execution `18:11` зафіксував два scoped Gmail History quota failures і фінальний exception у `gmailApiRequest_`; наступний minute worker уже запускався.
- A/B gate неможливо доказово пройти до external quota reset. Повторний promotion, trigger mutation або створення v57 без code-level evidence порушили б approved fail-closed strategy.
- Safe state збережено: stable і HEAD v55, immutable staging v56, journal `rolled_back`, Telegram menu на production, PR #5 відкритий без merge.
- Resume condition: Apps Script Executions більше не показують daily `urlfetch` failure, після чого два fresh production v55 launches мають пройти до staging v56 A/B.

<!-- lang:en -->
## Blocked audit 2026-07-21

- Three consecutive goal turns produced the same read-only result: the Apps Script daily `urlfetch` quota remains exhausted.
- In the third audit, execution `18:11` recorded two scoped Gmail History quota failures and a final exception in `gmailApiRequest_`; the next minute worker was already starting.
- The A/B gate cannot be proven before the external quota resets. Another promotion, trigger mutation, or v57 creation without code-level evidence would violate the approved fail-closed strategy.
- The safe state is preserved: stable and HEAD v55, immutable staging v56, journal `rolled_back`, Telegram menu on production, and PR #5 open without merge.
- Resume condition: Apps Script Executions no longer show the daily `urlfetch` failure, then two fresh production v55 launches must pass before the staging v56 A/B.

<!-- lang:uk -->
## Фінальний доказ 2026-07-22

- External `URLFETCH` blocker зник; два свіжі production v55 launches завантажили mailbox без network error.
- Owner-only staging v57 пройшов signed Telegram Desktop bootstrap, avatar, три Gmail roots, one-click switch на контрольований другий connection і повернення без OAuth.
- Hash-pinned helper штатно просунув immutable v57 у production. Два свіжі production v57 launches пройшли acceptance; cleanup видалив staging і застосував HEAD до minute trigger. Exact rollback на v55 та immutable v56 збережені.
- Після cleanup `PreflightOnly` підтвердив stable v57, staging `0`, legacy staging `0` і journal `cleaned`; локальний product suite пройшов `444/444`.
- Runtime window містив послідовні completed minute-trigger rows без failure. Повні worker проходи чергувалися з короткими slot-skip проходами; source і regression tests зберігають 150-секундний worker slot та 15-хвилинний History slot без network I/O під lock.
- Первинний same-account probe і probe з контрольованого linked Gmail отримали Gmail labels `INBOX+SENT`. Обидва правильно не створили картку; це довело, що попередня формула self-message acceptance була непридатною і не повинна послаблювати duplicate suppression.
- Один content-free marker із незалежного owner-controlled Workspace sender, відсутнього у primary `Send mail as`, надійшов як `INBOX+UNREAD` без `SENT`, автоматично створив рівно одну Telegram card із правильним account marker і після двох `/check` лишився одним Telegram list item.
- CAPTCHA, OTP/2FA, passkey, нова Google OAuth-згода, account-zone ambiguity або secret-property access не виникали. Листи, addresses, identifiers, tokens, cookies та `initData` у repository evidence не публікуються.

<!-- lang:en -->
## Final evidence 2026-07-22

- The external `URLFETCH` blocker cleared; two fresh production v55 launches loaded the mailbox without a network error.
- Owner-only v57 staging passed signed Telegram Desktop bootstrap, avatar, three Gmail roots, one-click switching to the controlled second connection and back without OAuth.
- The hash-pinned helper promoted immutable v57 through the standard production path. Two fresh production v57 launches passed acceptance; cleanup removed staging and applied HEAD to the minute trigger. Exact v55 rollback and immutable v56 remain preserved.
- Post-cleanup `PreflightOnly` confirmed stable v57, staging `0`, legacy staging `0`, and journal `cleaned`; the local product suite passed `444/444`.
- The runtime window contained consecutive completed minute-trigger rows with no failure. Full worker passes alternated with short slot-skip passes; source and regression tests preserve the 150-second worker slot and 15-minute History slot with no network I/O under lock.
- The initial same-account probe and a probe from a controlled linked Gmail received Gmail labels `INBOX+SENT`. Both correctly produced no card; this proved that the former self-message acceptance formula was invalid and must not weaken duplicate suppression.
- One content-free marker from an independent owner-controlled Workspace sender absent from primary `Send mail as` arrived as `INBOX+UNREAD` without `SENT`, automatically created exactly one Telegram card with the correct account marker, and remained one Telegram list item after two `/check` runs.
- No CAPTCHA, OTP/2FA, passkey, new Google OAuth consent, account-zone ambiguity, or secret-property access occurred. Mail, addresses, identifiers, tokens, cookies, and `initData` are not published in repository evidence.

## Follow-up verification — 2026-07-22

### Українською

- Початковий контрольний лист для root-2 був класифікований Google як Spam. Production коректно не створив Telegram-картку для Spam. Лише цей контрольований лист було позначено як Not spam; випадкові листи не змінювалися.
- Після цього новий content-free owner self-test для root-2 потрапив у Inbox і автоматично створив рівно одну Telegram-картку з правильною позначкою Gmail-зони.
- Окремий content-free owner self-test для root-3 автоматично створив рівно одну Telegram-картку з правильною позначкою Gmail-зони.
- Для root-2 і root-3 виконано по два повторні owner-only /check. Кожна перевірка повідомила про відсутність нових листів, а accessibility-index залишив рівно одну картку для кожного контрольного маркера.
- Раніше зафіксований статус secondary-root inbound fan-out unverified цим доказом замінено на verified.
- OAuth, scopes, deployment, triggers і production code під час follow-up не змінювалися.

### English

- The initial root-2 probe was classified by Google as Spam. Production correctly created no Telegram card for Spam. Only that controlled probe was marked Not spam; unrelated mail was not changed.
- A new content-free owner self-test then reached the root-2 Inbox and automatically produced exactly one Telegram card with the correct Gmail-zone marker.
- A separate content-free owner self-test for root-3 automatically produced exactly one Telegram card with the correct Gmail-zone marker.
- Two owner-only /check repetitions were completed for both root-2 and root-3. Every check reported no new mail, while the accessibility index remained at exactly one card per controlled marker.
- The earlier secondary-root inbound fan-out unverified status is superseded by this verified evidence.
- OAuth, scopes, deployment, triggers, and production code were unchanged during this follow-up.
