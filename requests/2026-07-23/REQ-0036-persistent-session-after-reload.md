# REQ-0036 — Стійка app session після reload / Persistent app session after reload

- ID: REQ-0036
- Date: 2026-07-23
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=reference
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Продовжити чинний V3 execution ledger з останнього перевіреного кроку й не втрачати або не повторювати завершені контури.
- Усунути критичний дефект, за якого F5, hard reload, відновлення вкладки або повторне відкриття того самого route у чинному browser profile повторно споживає одноразовий Telegram launch nonce й помилково вимагає відкрити пошту через Telegram.
- Провести окремий RCA для Telegram identity/link, app/browser session і Gmail OAuth конкретного connection; не маскувати помилку одного рівня повідомленням іншого.
- Обмінювати одноразовий trusted Telegram launch payload на стійку захищену app session. Повторний consumed nonce має бути ідемпотентним лише за наявності чинної authenticated session того самого користувача; анонімний новий browser не може replay цей nonce.
- Відновлювати без змішування акаунтів вибраний Gmail connection, route, folder/thread, дозволені local changes і drafts після reload, tab restore, browser-profile restart, короткої втрати мережі та паралельного відкриття вкладок.
- Оновлювати прострочений Gmail access token у вже дозволених межах незалежно від Telegram session. Реальне revoke має вимагати reconnect лише відповідного Gmail connection, не руйнуючи app session.
- Додати bounded retry, внутрішні sanitized reason codes, regression/integration tests, native Telegram Desktop/Mini App і browser acceptance та claim-level UK/EN evidence.
- Не зберігати raw Telegram initData, launch nonce, OAuth tokens, cookies, private mail або signed session URLs у public docs, logs чи незахищеному browser storage.

### Маршрутизація

| Частина | Destination | Дія |
|---|---|---|
| Канонічна історія запиту | `Запити` | створити запис і після виконання додати точні commit/test/native/release evidence |
| Standing instructions | `Інструкції` | reference; чинні recovery, lease, evidence і security rules достатні |
| Authority | `Повноваження` | reference `P-009`; новий або ширший дозвіл не створюється |
| План | активний V3 roadmap/task ledger | додати окремий критичний session/reload contour із залежностями й terminal status |
| Product | Versie 1 source/tests/docs | виправити session exchange/recovery, account isolation, diagnostics і UX |
| Release | чинний release contract | reference only; immutable/staging/production не дозволяються цим записом окремо |

### Критерії завершення

- Десять послідовних звичайних reload тієї самої authenticated page не викликають Telegram reauthorization error і не втрачають selected account/thread.
- Hard reload, tab restore і restart того самого browser profile відновлюють session відповідно до задокументованої policy.
- Паралельні tabs не споживають взаємно launch nonce; новий anonymous/incognito browser не використовує consumed nonce.
- Explicit logout і revoke реально припиняють відповідний access; Gmail token expiry перевірений окремо від Telegram/app session.
- Automated source/integration tests, supported native acceptance, paired docs, privacy scan, normal PR/CI і GitHub/private-GitLab readback мають точні докази.
- Якщо native acceptance потребує CAPTCHA, OTP/2FA, passkey, hardware key, нової Google consent або неоднозначного Gmail/Telegram identity, блокується лише залежний contour із однією точною owner action.

### Межа

- Контекст: `REQ-0034` задає one-second launch/auth deduplication; `REQ-0035` задає V3 recovery та execution process. Цей запис додає exact reload/replay defect і не переписує їхню історію.
- Versie лишається `Versie 1`.
- Цей запис не дозволяє новий immutable Apps Script candidate, staging deployment або production promotion і не розширює `P-009`.

<!-- lang:en -->
## English

### Normalized request

- Continue the current V3 execution ledger from the last verified step without losing or repeating completed contours.
- Correct the critical defect in which F5, hard reload, tab restoration, or reopening the same route in the current browser profile consumes the one-use Telegram launch nonce again and incorrectly requires mail to be opened through Telegram.
- Perform separate RCA for the Telegram identity/link, the app/browser session, and Gmail OAuth for the exact connection; never mask one layer's failure with another layer's message.
- Exchange the one-use trusted Telegram launch payload for a durable protected app session. A consumed nonce is idempotent only when a valid authenticated session for the same user already exists; a new anonymous browser cannot replay it.
- Restore the selected Gmail connection, route, folder or thread, permitted local changes, and drafts without account mixing after reload, tab restoration, browser-profile restart, brief network loss, and parallel tab opening.
- Refresh an expired Gmail access token within the existing grants independently of the Telegram session. A real revoke requires reconnecting only the affected Gmail connection and does not destroy the app session.
- Add bounded retry, internal sanitized reason codes, regression and integration tests, native Telegram Desktop/Mini App and browser acceptance, and claim-level paired UK/EN evidence.
- Never store raw Telegram initData, the launch nonce, OAuth tokens, cookies, private mail, or signed session URLs in public docs, logs, or unprotected browser storage.

### Routing

| Part | Destination | Action |
|---|---|---|
| Canonical request history | `Запити` | create the record and later add exact commit/test/native/release evidence |
| Standing instructions | `Інструкції` | reference; current recovery, lease, evidence, and security rules are sufficient |
| Authority | `Повноваження` | reference `P-009`; no new or broader authority is created |
| Plan | active V3 roadmap/task ledger | add a separate critical session/reload contour with dependencies and a terminal status |
| Product | Versie 1 source/tests/docs | repair session exchange/recovery, account isolation, diagnostics, and UX |
| Release | current release contract | reference only; this record does not independently authorize immutable/staging/production actions |

### Completion criteria

- Ten consecutive ordinary reloads of the same authenticated page cause no Telegram reauthorization error and preserve the selected account and thread.
- Hard reload, tab restoration, and restart of the same browser profile restore the session according to the documented policy.
- Parallel tabs do not consume the launch nonce from each other; a new anonymous or incognito browser cannot reuse a consumed nonce.
- Explicit logout and revoke actually end the applicable access; Gmail token expiry is verified separately from the Telegram/app session.
- Automated source and integration tests, supported native acceptance, paired docs, privacy scan, normal PR/CI, and GitHub/private-GitLab readback have exact evidence.
- If native acceptance requires CAPTCHA, OTP/2FA, passkey, hardware key, new Google consent, or ambiguous Gmail/Telegram identity, only the dependent contour is blocked with one exact owner action.

### Boundary

- Context: `REQ-0034` defines one-second launch/auth deduplication; `REQ-0035` defines V3 recovery and execution. This record adds the exact reload/replay defect without rewriting their history.
- The product remains `Versie 1`.
- This record does not authorize a new immutable Apps Script candidate, staging deployment, or production promotion and does not expand `P-009`.
