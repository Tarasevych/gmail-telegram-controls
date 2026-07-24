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

### Оновлення доказів P0-A — 2026-07-24

- `PARTIAL`: source commit `a0b5643e2354d729f73fe1ce4f19d76324379d3a` злитий normal merge через product PR `#106` як `c8f09d3e373354132b9ea0000e9b1bbd532bfc43`; GitHub і приватний GitLab `main` мають точний parity.
- `VERIFIED`: підтверджена причина duplicate-launch risk — document-local guard не координував повторний document/iframe launch, а server claim та nonce issuance були розділені. P0-A додає cross-document single-flight і один bounded ScriptLock ledger для atomic issue/redeem із canonical claim, HMAC owner/route scopes, 60-секундним nonce та 11-хвилинними tombstones.
- `VERIFIED`: звичайний validated launch не показує blocking connection overlay; release reload виконується лише після quiescence активних мутацій, recovery persistence і exact-target content-free guard `p0-release-reload`.
- `VERIFIED`: focused launch/client gate `37/37`; повний Apps Script suite `668/668` за `24.229 s`; product PR checks `8/8`; bilingual `99` пар; knowledge-hub, verification-report, release-state та diff gates успішні.
- `VERIFIED` як локальний E2 synthetic evidence: перший cache-busted app shell досяг `DOMContentLoaded` за `515 ms`; десять warm reload дали `107–153 ms`; desktop `1440x900` і mobile `390x844` мали видимий app shell, прихований boot overlay та відсутнє horizontal overflow.
- `BLOCKED`: цей synthetic результат не є native Telegram target-device p95. Примусовий fresh offline document reload завершився `ERR_INTERNET_DISCONNECTED`, тому current direct HTML deployment не гарантує offline app shell без підтвердженого Service Worker/окремого same-origin hosting path.
- `PARTIAL`: створено `GT-067`, `B1-47`, `RCA-023` і парний `VR-042`; native 10-launch acceptance, cached-message/A-B-A timing, device-bound private unlock, native cache-hit/request metrics, staging і production лишаються `UNVERIFIED/BLOCKED`.
- `VERIFIED`: Gmail, Telegram, OAuth, staging, deployment і production не змінювалися; production лишається `v65`, active staging `0`; shared URL Fetch quota та `T-03` blockers не обійдені.

### Оновлення доказів P0-B — 2026-07-24

- `PARTIAL`: source implementation `28b438e68e1b327308761c246e074558b7ccd53d` і paired evidence `d9ece3ea385a47f212ef9a799a4c8b9223058243` злиті normal merge через product PR `#108` як `fa58011b65afdbc3302fd863fce4724217fb0be9`; GitHub і приватний GitLab `main` мають точний parity.
- `VERIFIED`: 45-секундний background revalidation більше не викликає full list/thread RPC безумовно. Exact Gmail connection спочатку читає bounded History delta; no-change cycle лише просуває account-scoped cursor.
- `VERIFIED`: Gmail History ID зберігається як opaque decimal string у чинному Telegram-owner + Gmail-connection IndexedDB namespace. Missing/stale cursor, Gmail 404 і більш ніж три History pages fail-closed вимагають full reconciliation; secrets і browser-stored OAuth/Telegram credentials не додані.
- `VERIFIED`: focused History/P0/Advanced Gmail gate `30/30`; повний Apps Script suite `673/673` за `25.763 s`; product PR checks `8/8`; bilingual `100` пар; knowledge-hub, verification-report, release-state та diff gates успішні.
- `PARTIAL`: створено `GT-068`, `B1-48`, `RCA-024` і парний `VR-043`. Gmail History не визначає membership довільного query/shared aggregate, тому після реальної зміни цей source contour поки виконує один bounded full-list refresh.
- `UNVERIFIED`: live cache-hit/request reduction, entity-level query reconciliation, native multi-account/shared acceptance, staging і production.
- `VERIFIED`: OAuth, Gmail/Telegram mutation, staging, deployment і production не виконувалися; shared URL Fetch quota та `T-03` release blockers не обійдені.

### Оновлення доказів P0-C — 2026-07-24

- `PARTIAL`: source implementation `7bd8270b2e14525dc8e99bd95387a1ef977dde1a` і paired evidence `e87e9b357da6be8e1385cce4f2524bda9722da5a` злиті normal merge через product PR `#110` як `d2db2ef9ccbeda8221248a3bf18cc76d6f5bd4bc`; GitHub і приватний GitLab `main` мають точний parity.
- `VERIFIED`: bounded Gmail History delta тепер класифікує message/label events за thread, а viewer-only `threadSummaries` повертає metadata лише для `1–20` exact thread IDs і явно повідомляє missing IDs.
- `VERIFIED`: сумісний single-account Inbox без query, filter або custom label оновлює тільки змінені рядки, зберігає cached body і стабільне сортування; selected body перечитується лише для message event, а не для label-only зміни.
- `VERIFIED`: shared/search/filter/custom-label/full-sync, понад `20` змінених thread IDs або incomplete summaries fail closed до одного bounded full-list refresh; foreign-account entity не може бути застосована до активного namespace.
- `VERIFIED`: focused entity/History/P0/Advanced Gmail gate `35/35`; повний Apps Script suite `678/678` за `25.414 s`; product PR checks `8/8`; bilingual `101` пара; knowledge-hub, verification-report, release-state та diff gates успішні.
- `PARTIAL`: створено `GT-069`, `B1-49`, `RCA-025` і парний `VR-044`. Live cache-hit/request reduction, arbitrary shared/query reconciliation, native target-device acceptance, staging і production лишаються `UNVERIFIED/BLOCKED`.
- `VERIFIED`: OAuth, Gmail/Telegram mutation, staging, deployment і production не виконувалися; shared URL Fetch quota та `T-03` release blockers не обійдені.

### Оновлення доказів P0-D — 2026-07-24

- `PARTIAL`: source implementation `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb` і paired evidence `59bcfcda96dd6dd5d01a39e399f57f1311eff0d2` злиті normal merge через product PR `#112` як `e3b68bdb5e2d35d76859ec912367d8d467cdd696`; GitHub і приватний GitLab `main` мають точний parity.
- `VERIFIED`: private cache тепер стартує locked; low-level IndexedDB reads/writes доступні лише після exact app-session, opaque owner `cacheScope` і connected-account allowlist gate. Hydration більше не self-authorize із mutable client state.
- `VERIFIED`: усі п’ять account-changing bootstrap paths rebind exact allowlist; switch, disconnect і confirmed sign-out очищають private memory та mail DOM, але не видаляють retained persistent records.
- `VERIFIED`: focused cache/launch/history gate `48/48`; повний Apps Script suite `685/685` за `26.020 s`; product PR checks `8/8`; bilingual `102` пари; knowledge-hub, verification-report, release-state та diff gates успішні.
- `PARTIAL`: створено `GT-070`, `B1-50`, `RCA-026` і парний `VR-045`. IndexedDB records ще не encrypted at rest; offline device-bound unlock, native target-device acceptance, staging і production лишаються `UNVERIFIED/BLOCKED`.
- `VERIFIED`: OAuth, Gmail/Telegram mutation, staging, deployment і production не виконувалися; shared URL Fetch quota та `T-03` release blockers не обійдені.

### Оновлення доказів P0-E — 2026-07-24

- `PARTIAL`: source implementation `6f8a357e1a650639c3a16f9d6c7601d89817e3fe` і paired evidence `f18fce674ab81233052f941a04f0ba96b7a9899c` злиті normal merge через product PR `#114` як `aff8c59a9b82fafdd30e83295a19ae0420ed3fd1`; GitHub і приватний GitLab `main` мають точний parity.
- `VERIFIED`: schema `3` не зберігає plaintext private cache value в IndexedDB. Кожен retained record шифрується AES-256-GCM із random 96-bit IV, 128-bit tag та AAD, що зв’язує schema, key, kind, namespace і expiry; incompatible schema upgrade очищає попередні plaintext records.
- `VERIFIED`: 32-byte cache key існує в runtime як non-extractable `CryptoKey`, а compact owner-scoped envelope зберігається лише через Telegram SecureStorage item `gmail_telegram_cache_key_v1`; browser `localStorage`, `sessionStorage`, IndexedDB і Cache Storage не отримують raw key, OAuth/Telegram secrets або plaintext fallback.
- `VERIFIED`: missing, malformed, scope-mismatched, `RESTORABLE` або unsupported SecureStorage state fail closed для persistent private cache без автоматичного consent/restore prompt; online mailbox залишається доступним, а lock очищає runtime key без видалення owner-retained encrypted records.
- `VERIFIED`: focused crypto/cache/launch gate `55/55`; повний Apps Script suite `692/692` за `23.540 s`; product PR checks успішні; bilingual `103` пари; knowledge-hub, verification-report, release-state та diff gates успішні.
- `PARTIAL`: створено `GT-071`, `B1-51`, `RCA-027` і парний `VR-046`. Реальна підтримка Telegram SecureStorage у цільовому WebView, device-bound offline unlock, offline document launch, native target-device performance, staging і production лишаються `UNVERIFIED/BLOCKED`.
- `VERIFIED`: OAuth, Gmail/Telegram mutation, staging, deployment і production не виконувалися; shared URL Fetch quota та `T-03` release blockers не обійдені.

### Оновлення доказів P0-F — 2026-07-24

- `PARTIAL`: source implementation `2bd7eb52d2f3297929c24c12d8ccbb4611699b84` і paired evidence `3ab96c6e40821151c3815e71524332b1396d8250` злиті normal merge через product PR `#116` як `64b77f0a000b94e2d9a578ec0fa81f795e5a5c88`; GitHub і приватний GitLab `main` мають точний parity.
- `VERIFIED`: після verified online bootstrap створюється 35-day AES-GCM encrypted bootstrap record без session token, OAuth token, Telegram `initData` або signed launch data. Record key/kind/owner-bootstrap namespace/schema/expiry входять до AAD.
- `VERIFIED`: transient network failure може відновити exact owner/account context лише через Telegram SecureStorage content key, validated ciphertext, schema/scope/age/unique-account-set/active-account checks. `RESTORABLE`, malformed/expired data, decrypt failure, revoked auth або account mismatch не обходяться.
- `VERIFIED`: offline-unlocked cache є read-only; `rpc()` fail closed з `OFFLINE_CACHE_ONLY`, prefetch/revalidation не запускаються, а online/visibility retry повторює verified boot pipeline. Online verified bootstrap вимикає offline mode та оновлює snapshot.
- `VERIFIED`: focused offline/cache/security gate `33/33`; повний Apps Script suite `701/701` за `25.944 s`; product PR checks успішні; bilingual `104` пари; knowledge-hub, verification-report, release-state та diff gates успішні.
- `PARTIAL`: створено `GT-072`, `B1-52`, `RCA-028` і парний `VR-047`. Fresh offline Apps Script document navigation, native Telegram SecureStorage/WebView acceptance, target-device one-second measurements, staging і production лишаються `UNVERIFIED/BLOCKED`.
- `VERIFIED`: OAuth, Gmail/Telegram mutation, staging, deployment і production не виконувалися; shared URL Fetch quota та `T-03` release blockers не обійдені.

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

### P0-A evidence update — 2026-07-24

- `PARTIAL`: source commit `a0b5643e2354d729f73fe1ce4f19d76324379d3a` was normally merged through product PR `#106` as `c8f09d3e373354132b9ea0000e9b1bbd532bfc43`; GitHub and private GitLab `main` have exact parity.
- `VERIFIED`: the duplicate-launch risk was traced to a document-local guard that could not coordinate a repeated document/iframe launch, while server claim and nonce issuance were split. P0-A adds cross-document single-flight and one bounded ScriptLock ledger for atomic issue/redeem with a canonical claim, HMAC owner/route scopes, a 60-second nonce, and 11-minute tombstones.
- `VERIFIED`: an ordinary validated launch does not show the blocking connection overlay; release reload occurs only after active-mutation quiescence, recovery persistence, and the exact-target content-free `p0-release-reload` guard.
- `VERIFIED`: focused launch/client gate `37/37`; complete Apps Script suite `668/668` in `24.229 s`; product PR checks `8/8`; `99` bilingual pairs; knowledge-hub, verification-report, release-state, and diff gates passed.
- `VERIFIED` as local E2 synthetic evidence: the first cache-busted app shell reached `DOMContentLoaded` in `515 ms`; ten warm reloads took `107–153 ms`; desktop `1440x900` and mobile `390x844` had a visible app shell, hidden boot overlay, and no horizontal overflow.
- `BLOCKED`: this synthetic result is not native Telegram target-device p95. A forced fresh offline document reload ended with `ERR_INTERNET_DISCONNECTED`, so the current direct HTML deployment does not guarantee an offline app shell without a confirmed Service Worker or separate same-origin hosting path.
- `PARTIAL`: `GT-067`, `B1-47`, `RCA-023`, and paired `VR-042` were created; native ten-launch acceptance, cached-message/A-B-A timing, device-bound private unlock, native cache-hit/request metrics, staging, and production remain `UNVERIFIED/BLOCKED`.
- `VERIFIED`: Gmail, Telegram, OAuth, staging, deployment, and production were not changed; production remains `v65`, active staging `0`; the shared URL Fetch quota and `T-03` blockers were not bypassed.

### P0-B evidence update — 2026-07-24

- `PARTIAL`: source implementation `28b438e68e1b327308761c246e074558b7ccd53d` and paired evidence `d9ece3ea385a47f212ef9a799a4c8b9223058243` were normally merged through product PR `#108` as `fa58011b65afdbc3302fd863fce4724217fb0be9`; GitHub and private GitLab `main` have exact parity.
- `VERIFIED`: the 45-second background revalidation no longer calls full list/thread RPC unconditionally. The exact Gmail connection reads a bounded History delta first; a no-change cycle advances only its account-scoped cursor.
- `VERIFIED`: Gmail History ID is retained as an opaque decimal string in the existing Telegram-owner + Gmail-connection IndexedDB namespace. A missing/stale cursor, Gmail 404, or more than three History pages fails closed to full reconciliation; no secrets or browser-stored OAuth/Telegram credentials were added.
- `VERIFIED`: focused History/P0/Advanced Gmail gate `30/30`; complete Apps Script suite `673/673` in `25.763 s`; product PR checks `8/8`; `100` bilingual pairs; knowledge-hub, verification-report, release-state, and diff gates passed.
- `PARTIAL`: `GT-068`, `B1-48`, `RCA-024`, and paired `VR-043` were created. Gmail History does not establish membership in an arbitrary query/shared aggregate, so this source contour still performs one bounded full-list refresh after a real change.
- `UNVERIFIED`: live cache-hit/request reduction, entity-level query reconciliation, native multi-account/shared acceptance, staging, and production.
- `VERIFIED`: no OAuth, Gmail/Telegram mutation, staging, deployment, or production action occurred; the shared URL Fetch quota and `T-03` release blockers were not bypassed.

### P0-C evidence update — 2026-07-24

- `PARTIAL`: source implementation `7bd8270b2e14525dc8e99bd95387a1ef977dde1a` and paired evidence `e87e9b357da6be8e1385cce4f2524bda9722da5a` were normally merged through product PR `#110` as `d2db2ef9ccbeda8221248a3bf18cc76d6f5bd4bc`; GitHub and private GitLab `main` have exact parity.
- `VERIFIED`: the bounded Gmail History delta now classifies message and label events by thread, while viewer-only `threadSummaries` returns metadata for only `1–20` exact thread IDs and explicitly reports missing IDs.
- `VERIFIED`: a compatible single-account Inbox without a query, filter, or custom label updates only changed rows, retains cached bodies and stable ordering, and rereads the selected body only for a message event rather than a label-only change.
- `VERIFIED`: shared/search/filter/custom-label/full-sync paths, more than `20` changed thread IDs, or incomplete summaries fail closed to one bounded full-list refresh; a foreign-account entity cannot be applied to the active namespace.
- `VERIFIED`: focused entity/History/P0/Advanced Gmail gate `35/35`; complete Apps Script suite `678/678` in `25.414 s`; product PR checks `8/8`; `101` bilingual pairs; knowledge-hub, verification-report, release-state, and diff gates passed.
- `PARTIAL`: `GT-069`, `B1-49`, `RCA-025`, and paired `VR-044` were created. Live cache-hit/request reduction, arbitrary shared/query reconciliation, native target-device acceptance, staging, and production remain `UNVERIFIED/BLOCKED`.
- `VERIFIED`: no OAuth, Gmail/Telegram mutation, staging, deployment, or production action occurred; the shared URL Fetch quota and `T-03` release blockers were not bypassed.

### P0-D evidence update — 2026-07-24

- `PARTIAL`: source implementation `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb` and paired evidence `59bcfcda96dd6dd5d01a39e399f57f1311eff0d2` were normally merged through product PR `#112` as `e3b68bdb5e2d35d76859ec912367d8d467cdd696`; GitHub and private GitLab `main` have exact parity.
- `VERIFIED`: private cache now starts locked; low-level IndexedDB reads and writes become available only after the exact app-session, opaque owner `cacheScope`, and connected-account allowlist gate. Hydration can no longer self-authorize from mutable client state.
- `VERIFIED`: all five account-changing bootstrap paths rebind the exact allowlist; switch, disconnect, and confirmed sign-out clear private memory and mail DOM without deleting retained persistent records.
- `VERIFIED`: focused cache/launch/history gate `48/48`; complete Apps Script suite `685/685` in `26.020 s`; product PR checks `8/8`; `102` bilingual pairs; knowledge-hub, verification-report, release-state, and diff gates passed.
- `PARTIAL`: `GT-070`, `B1-50`, `RCA-026`, and paired `VR-045` were created. IndexedDB records are not yet encrypted at rest; offline device-bound unlock, native target-device acceptance, staging, and production remain `UNVERIFIED/BLOCKED`.
- `VERIFIED`: no OAuth, Gmail/Telegram mutation, staging, deployment, or production action occurred; the shared URL Fetch quota and `T-03` release blockers were not bypassed.

### P0-E evidence update — 2026-07-24

- `PARTIAL`: source implementation `6f8a357e1a650639c3a16f9d6c7601d89817e3fe` and paired evidence `f18fce674ab81233052f941a04f0ba96b7a9899c` were normally merged through product PR `#114` as `aff8c59a9b82fafdd30e83295a19ae0420ed3fd1`; GitHub and private GitLab `main` have exact parity.
- `VERIFIED`: schema `3` stores no plaintext private-cache value in IndexedDB. Every retained record is encrypted with AES-256-GCM, a random 96-bit IV, a 128-bit tag, and AAD binding the schema, key, kind, namespace, and expiry; the incompatible schema upgrade clears prior plaintext records.
- `VERIFIED`: the 32-byte cache key exists at runtime as a non-extractable `CryptoKey`, while a compact owner-scoped envelope is stored only through the Telegram SecureStorage item `gmail_telegram_cache_key_v1`; browser `localStorage`, `sessionStorage`, IndexedDB, and Cache Storage receive no raw key, OAuth or Telegram secret, or plaintext fallback.
- `VERIFIED`: a missing, malformed, scope-mismatched, `RESTORABLE`, or unsupported SecureStorage state fails closed for the persistent private cache without an automatic consent or restore prompt; the online mailbox remains available, and locking clears the runtime key without deleting owner-retained encrypted records.
- `VERIFIED`: focused crypto/cache/launch gate `55/55`; complete Apps Script suite `692/692` in `23.540 s`; product PR checks passed; `103` bilingual pairs; knowledge-hub, verification-report, release-state, and diff gates passed.
- `PARTIAL`: `GT-071`, `B1-51`, `RCA-027`, and paired `VR-046` were created. Real Telegram SecureStorage support in the target WebView, device-bound offline unlock, offline document launch, native target-device performance, staging, and production remain `UNVERIFIED/BLOCKED`.
- `VERIFIED`: no OAuth, Gmail/Telegram mutation, staging, deployment, or production action occurred; the shared URL Fetch quota and `T-03` release blockers were not bypassed.

### P0-F evidence update — 2026-07-24

- `PARTIAL`: source implementation `2bd7eb52d2f3297929c24c12d8ccbb4611699b84` and paired evidence `3ab96c6e40821151c3815e71524332b1396d8250` were normally merged through product PR `#116` as `64b77f0a000b94e2d9a578ec0fa81f795e5a5c88`; GitHub and private GitLab `main` have exact parity.
- `VERIFIED`: a 35-day AES-GCM encrypted bootstrap record is created after verified online bootstrap without a session token, OAuth token, Telegram `initData`, or signed launch data. Record key, kind, owner-bootstrap namespace, schema, and expiry are included in AAD.
- `VERIFIED`: a transient network failure can restore the exact owner/account context only through the Telegram SecureStorage content key, validated ciphertext, and schema/scope/age/unique-account-set/active-account checks. `RESTORABLE`, malformed or expired data, decrypt failure, revoked auth, and account mismatch are not bypassed.
- `VERIFIED`: offline-unlocked cache is read-only; `rpc()` fails closed with `OFFLINE_CACHE_ONLY`, prefetch and revalidation do not run, and online or visibility retry reruns the verified boot pipeline. Verified online bootstrap disables offline mode and refreshes the snapshot.
- `VERIFIED`: focused offline/cache/security gate `33/33`; complete Apps Script suite `701/701` in `25.944 s`; product PR checks passed; `104` bilingual pairs; knowledge-hub, verification-report, release-state, and diff gates passed.
- `PARTIAL`: `GT-072`, `B1-52`, `RCA-028`, and paired `VR-047` were created. Fresh offline Apps Script document navigation, native Telegram SecureStorage/WebView acceptance, target-device one-second measurements, staging, and production remain `UNVERIFIED/BLOCKED`.
- `VERIFIED`: no OAuth, Gmail/Telegram mutation, staging, deployment, or production action occurred; the shared URL Fetch quota and `T-03` release blockers were not bypassed.
