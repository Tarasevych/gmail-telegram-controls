# REQ-0037 — P0 one-second offline-first acceptance

- ID: REQ-0037
- Date: 2026-07-23
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=reference
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Після завершення вже відкритого C-02 контуру та його cleanup виконувати ONE-SECOND RULE раніше за всі незавершені некритичні продуктові задачі, а після доказового terminal state повернутися до останнього перевіреного попереднього плану.
- Не дублювати `REQ-0033`, `REQ-0034` або `REQ-0036`: цей запис повторно закріплює owner-priority та об'єднує їхні чинні contracts у один контрольований acceptance contour на актуальному merged baseline.
- Підтвердити першопричину подвійного launch overlay і реалізувати один ідемпотентний single-flight pipeline для Telegram bootstrap, захищеної app session, authorization check і background sync.
- Після першого безпечного linking показувати реальний cached app shell та дозволений локальний mailbox state не пізніше 1000 ms без повторного connection screen або network blocking.
- Побудувати versioned persistent cache переважно на IndexedDB: normalized message/thread entities, bounded LRU/quota handling, schema migration, per-Telegram-user/per-Gmail-connection namespaces, lock/unlock boundary і явне device-data removal без browser-stored OAuth/Telegram secrets.
- Реалізувати cache-first/stale-while-revalidate, incremental sync, request deduplication, stale-response protection і пріоритетний prefetch, який не позначає лист прочитаним, не виконує небезпечний HTML і не завантажує tracking resources.
- Зберігати локальний recovery draft негайно та синхронізувати account-scoped Gmail Draft у фоні зі stable operation/draft identity, bounded retry, out-of-order protection і явною conflict strategy.
- Реалізувати exact release ID/content hash, versioned client-cache migration та рівно один controlled reload лише після нового production release, без reload loop або змішування assets.
- Перевірити офіційні Telegram Mini Apps, Gmail API, Google Apps Script і browser storage/service-worker/background-sync contracts; не оголошувати підтримку після закриття WebView без доказу.
- Створити пов'язані factual `GT`, `B1`, `RCA` і `VR` лише з поточних registry maxima для performance, launch/auth deduplication, offline cache, prefetch, cache locking, drafts, version-aware update і multi-account isolation.

### Перевірений recovery boundary

- `VERIFIED`: C-02 product PR `#103` і request PR `#104` злиті normal merge; GitHub/GitLab parity підтверджено; exact C-02 worktrees, feature refs, preview process/tabs і lease прибрано.
- `VERIFIED`: відкритих GitHub PR немає; current product baseline — merge `1d5fb8352ea62f7b25d6980312f277060ce4d0ae`.
- `VERIFIED`: published release manifest має production/candidate immutable `v65`, active staging `0`, rollback `v64`; цей запит не змінює historical immutable artifacts.
- `BLOCKED`: новий staging або promotion не виконується, доки чинні shared URL Fetch quota та `T-03` policy blockers не отримають доказовий terminal state.

### Критерії завершення

- Baseline і after evidence містять фактичні usable-UI time, warm-launch p95 на визначеному target device, cached-message open, `A -> B -> A`, request count, reload count, duplicate bootstrap/auth count і cache-hit ratio.
- Warm launch, cached-message open і повернення до cached state досягають `<=1000 ms`; ціль cached-message open — `<=250 ms`; skeleton або splash не рахується usable UI.
- Десять послідовних warm launches після linking мають `0` повторних connection overlays, duplicate bootstrap/auth, ordinary-navigation full reload, draft loss і cross-account leakage.
- Offline launch, cached mail, logout/cache lock, same-account unlock, explicit device-data removal, quota/migration failure, multi-account/shared mode, drafts і exactly-one-release-reload мають автоматичні та supported native докази.
- Source, tests і paired UK/EN docs публікуються окремим normal PR з green required checks, privacy scan і GitHub/private-GitLab parity.
- Immutable/staging/production дозволені лише окремим exact release cycle під active `P-009`, після усунення shared blockers і повного staging acceptance; historical candidate не просувається.
- Hard stops: CAPTCHA, OTP/2FA, passkey/biometric/hardware key, нова або ширша user-specific Google consent, unresolved Gmail/Telegram identity або materially unsafe irreversible choice.

### Межа

- Versie лишається `Versie 1`; `Next Versie authorization` — `no`.
- Чинні standing instructions і `P-009` лише referenced; нове або ширше повноваження не створюється.
- Не змінювати випадкові Gmail records, не змішувати Gmail accounts/Telegram zones і не публікувати mail, identifiers, tokens, signed launch data, deployment URLs або secrets.

<!-- lang:en -->
## English

### Normalized request

- After the already-open C-02 contour and its cleanup are complete, execute the ONE-SECOND RULE ahead of every unfinished noncritical product task; after an evidence-backed terminal state, return to the last verified prior plan.
- Do not duplicate `REQ-0033`, `REQ-0034`, or `REQ-0036`: this record reasserts owner priority and combines their active contracts into one controlled acceptance contour on the current merged baseline.
- Establish the root cause of the duplicate launch overlay and implement one idempotent single-flight pipeline for Telegram bootstrap, the protected app session, authorization checks, and background synchronization.
- After the first safe link, expose the real cached app shell and permitted local mailbox state within 1000 ms without another connection screen or network blocking.
- Build a versioned persistent cache, primarily in IndexedDB: normalized message/thread entities, bounded LRU/quota handling, schema migration, per-Telegram-user/per-Gmail-connection namespaces, a lock/unlock boundary, and explicit device-data removal without browser-stored OAuth or Telegram secrets.
- Implement cache-first/stale-while-revalidate, incremental synchronization, request deduplication, stale-response protection, and prioritized prefetch that neither marks mail read nor executes unsafe HTML or loads tracking resources.
- Persist an immediate local recovery draft and synchronize an account-scoped Gmail Draft in the background with stable operation/draft identity, bounded retry, out-of-order protection, and an explicit conflict strategy.
- Implement an exact release ID/content hash, versioned client-cache migration, and exactly one controlled reload only after a new production release, without reload loops or mixed assets.
- Verify official Telegram Mini Apps, Gmail API, Google Apps Script, and browser storage/service-worker/background-sync contracts; do not claim execution after WebView close without evidence.
- Create related factual `GT`, `B1`, `RCA`, and `VR` records only from current registry maxima for performance, launch/auth deduplication, offline cache, prefetch, cache locking, drafts, version-aware update, and multi-account isolation.

### Verified recovery boundary

- `VERIFIED`: C-02 product PR `#103` and request PR `#104` were normally merged; GitHub/GitLab parity was confirmed; exact C-02 worktrees, feature refs, preview process/tabs, and lease were removed.
- `VERIFIED`: there are no open GitHub pull requests; the current product baseline is merge `1d5fb8352ea62f7b25d6980312f277060ce4d0ae`.
- `VERIFIED`: the published release manifest has production/candidate immutable `v65`, active staging `0`, and rollback `v64`; this request does not alter historical immutable artifacts.
- `BLOCKED`: no new staging or promotion occurs until the current shared URL Fetch quota and `T-03` policy blockers reach an evidence-backed terminal state.

### Completion criteria

- Baseline and after evidence contain actual usable-UI time, warm-launch p95 on a defined target device, cached-message open, `A -> B -> A`, request count, reload count, duplicate bootstrap/auth count, and cache-hit ratio.
- Warm launch, cached-message open, and return to cached state reach `<=1000 ms`; the cached-message-open target is `<=250 ms`; a skeleton or splash does not count as usable UI.
- Ten consecutive warm launches after linking have `0` repeated connection overlays, duplicate bootstrap/auth, ordinary-navigation full reloads, draft loss, and cross-account leakage.
- Offline launch, cached mail, logout/cache locking, same-account unlock, explicit device-data removal, quota/migration failure, multi-account/shared mode, drafts, and exactly-one-release-reload have automated and supported native evidence.
- Source, tests, and paired UK/EN documentation are published through a separate normal pull request with green required checks, privacy scanning, and GitHub/private-GitLab parity.
- Immutable/staging/production actions are allowed only in a separate exact release cycle under active `P-009`, after shared blockers are resolved and staging acceptance is complete; no historical candidate is promoted.
- Hard stops are CAPTCHA, OTP/2FA, passkey/biometric/hardware key, new or broader user-specific Google consent, unresolved Gmail/Telegram identity, or a materially unsafe irreversible choice.

### Boundary

- The product remains `Versie 1`; `Next Versie authorization` is `no`.
- Existing standing instructions and `P-009` are referenced only; no new or broader authority is created.
- Do not mutate arbitrary Gmail records, mix Gmail accounts or Telegram zones, or publish mail, identifiers, tokens, signed launch data, deployment URLs, or secrets.
