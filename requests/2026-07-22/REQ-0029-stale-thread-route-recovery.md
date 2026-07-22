# REQ-0029 - Recover from a stale Mini App thread route

- ID: REQ-0029
- Date: 2026-07-22
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=no-change; plan=update; product=update; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Продовжити поточну Versie 1 з останнього перевіреного стану після невдалого staging acceptance v58.
- Виправити відтворюване повторне відкриття застарілого Gmail thread-маршруту в Telegram Mini App: свіжий запуск не повинен залишатися на помилковому reader-екрані, якщо list/bootstrap уже успішно завантажені.
- Зберегти звичайну retry-поведінку для помилки після свідомого вибору листа, але для автоматичного launch/deep-link failure безпечно повернутися до поточного списку й очистити застарілий reader-стан.
- Додати регресійні тести, парну UK/EN factual-документацію, commit, push і normal PR без переписування immutable v58.

### Межі

- Production лишається exact immutable v57; immutable v58 і єдиний staging deployment зберігаються без змін.
- Цей запит не дозволяє створення v59, нового immutable, нового deployment, перемикання Telegram menu, staging acceptance, production promotion або cleanup.
- Не повторювати OAuth, не змінювати Gmail records, не змішувати Gmail accounts/Telegram zones і не публікувати secrets або приватні дані.
- Зупинитися на CAPTCHA, OTP/2FA, passkey, новій Google consent або неоднозначності account/zone.

### Критерії завершення

- Першопричина пов'язана з точним client route/reader contract і задокументована як виправлення попередньої неточної локалізації GT-028/VR-006.
- Автоматичний stale-thread launch failure очищає thread selection, закриває reader і показує вже завантажений list без перезавантаження.
- Помилка ручного відкриття листа зберігає reader error і кнопку повторної спроби.
- Targeted і повний local test suites, documentation validators, privacy scan та required GitHub checks успішні.
- Зміни опубліковані normal PR; live acceptance і release лишаються окремим gate, доки власник прямо не дозволить наступний immutable.

<!-- lang:en -->
## English

### Normalized request

- Continue the current Versie 1 from the last verified state after the unsuccessful v58 staging acceptance.
- Repair the reproducible reopening of a stale Gmail thread route in the Telegram Mini App: a fresh launch must not remain on an error reader when list/bootstrap data loaded successfully.
- Preserve normal retry behavior for an error after an intentional message selection, while safely returning an automatic launch/deep-link failure to the current list and clearing stale reader state.
- Add regression tests, paired UK/EN factual documentation, a commit, push, and normal PR without rewriting immutable v58.

### Boundaries

- Production remains exact immutable v57; immutable v58 and its single staging deployment remain unchanged.
- This request does not authorize v59, a new immutable, a new deployment, a Telegram-menu switch, staging acceptance, production promotion, or cleanup.
- Do not repeat OAuth, mutate Gmail records, mix Gmail accounts/Telegram zones, or publish secrets or private data.
- Stop at CAPTCHA, OTP/2FA, passkey, new Google consent, or account/zone ambiguity.

### Completion criteria

- The root cause is tied to the exact client route/reader contract and documented as a correction to the earlier imprecise GT-028/VR-006 localization.
- An automatic stale-thread launch failure clears thread selection, closes the reader, and exposes the already loaded list without a reload.
- A manual message-open failure retains the reader error and retry action.
- Targeted and full local test suites, documentation validators, privacy scan, and required GitHub checks pass.
- Changes are published through a normal PR; live acceptance and release remain a separate gate until the owner explicitly authorizes the next immutable.
