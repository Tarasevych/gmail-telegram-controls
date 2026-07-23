# Дорожня карта

Оновлено: **2026-07-21**. Єдина активна версія: **Versie 1**.

| ID | Статус | Крок | Доказ завершення |
|---|---|---|---|
| B1-01 | Виконано | Відновити v45 source-of-truth і перевірити Git/production | remote правильний; production v37 підтверджено |
| B1-02 | Виконано | Виявити причину подвійних Telegram-карток | знайдено legacy + OAuth подвійне сканування; один trigger підтверджено |
| B1-03 | Виконано локально | Дедуплікація owner mailbox, avatar, прямий OAuth старт, stale account count | локальні контракти пройшли |
| B1-04 | Виконано локально | Neutral GitHub OAuth callback із credentialless POST до Apps Script | query очищається до передачі; one-use user/chat/zone state; Google multi-login cookies не надсилаються |
| B1-05 | Виконано | Зберегти новий redirect URI в Google OAuth client | `OAuth client saved`; точний URI прочитано назад |
| B1-06 | Виконано | Credentialless OAuth relay та послідовні immutable v41/v42 | stable v42, staging 0, точний v41 rollback |
| B1-07 | Не перевірено | Додати новий контрольний Gmail-акаунт через fresh OAuth flow | наявні підключення працюють; новий account choice/consent/callback не виконувався під час E4/E5 |
| B1-08 | Виконано production для owner lane | Повний real-time acceptance у @TarasevychGmailNotifierBot | stable v55 автоматично доставив одну картку; два `/check` не створили дубль; exact-marker count лишився 1 |
| B1-09 | Виконано | Promote, cleanup, production Web App menu | stable v55, staging 0, legacy staging 0, journal `cleaned`; menu відкриває neutral GitHub Pages bridge |
| B1-10 | Виконано | Оновити UK/EN docs, commit і push | postmortem та lessons опубліковано у c98e69e; три documentation Actions пройшли; release tag лишається gated B1-07/B1-08 |

| B1-11 | Виконано production | Відокремити realtime delivery від frozen backlog і запускати її перед maintenance | bounded recent-window lane stable v55 доставила контрольний лист перед backlog maintenance |
| B1-12 | Частково перевірено staging | Агрегувати всі notification accounts в один фізичний Telegram-потік з account identity та account-scoped діями | три ізольовані account roots і one-click switch перевірені; незалежний live fan-out із другого акаунта ще не доведено |

## Правило руху

Versie 2 не відкривається без точного owner-наказу `Next Versie authorization: yes, Versie 2`. До такого наказу всі дозволені зміни лишаються в активній лінії Versie 1, але жоден уже створений immutable Apps Script artifact не переписується. Нові проблеми отримують `GT-*` у [ISSUES.md](ISSUES.md).

## Актуалізація B1-20–B1-22 після v59 — 2026-07-22

- **B1-20:** owner-only Advanced Gmail adapter інтегровано в immutable v59, але protected flag лишився вимкненим; mailbox acceptance не доводить quota reduction. Статус `PARTIAL`.
- **B1-21:** label UI live-перевірено у v59 staging: create/manage controls, USER/SYSTEM separation, bounded scroll і довгі nested names працювали без overlap. Mutating label operations не виконувалися; після GT-030 production знову v57. Статус `PARTIAL`.
- **B1-22:** stale automatic route recovery live-перевірено у v59 staging і двох production launches. Fix не є частиною чинного v63 після exact rollback. Статус `PARTIAL`.

## B1-23 — Runtime gate v59 та exact rollback

- **Статус:** BLOCKED; safe state відновлено.
- **Виконано:** immutable v59 staged один раз, UI acceptance пройдено, promotion і два production launches пройшли, cleanup видалив staging.
- **Blocker:** post-cleanup execution `214.96 с` перевищив 150-секундний target і перекрився з наступним execution window; root cause `UNVERIFIED`.
- **Захист:** exact rollback до v63; stable і HEAD v63, staging `0`, journal `rolled_back`; fresh rollback mailbox launch пройшов.
- **Далі:** дослідити GT-030 без створення повторного immutable. Наступний cumulative candidate дозволений лише для нового причинного code delta, а не для нескінченного staging-loop.
- **Доказ:** [VR-007](verification-reports/reports/VR-007/README.md). Source requests: `REQ-0030`, `REQ-0031`.

## Кумулятивна дослідницька roadmap

Довгострокові report-derived етапи, залежності й evidence gates містяться в [Master Roadmap](knowledge-hub/MASTER_ROADMAP.md). Поточні `B1-*` release gates вище мають пріоритет для Versie 1.

## Verification gate

`VR-001` завершив repository/test-класифікацію 245/245 `KH-*` claims: [звіт](verification-reports/reports/VR-001/README.md). E4/E5 для наявного owner connection і promotion v55 тепер доведені; B1-07 fresh OAuth та B1-12 second-account fan-out не закриваються цими доказами. Поточне продовження: `REQ-0018`.

### B1-13 — Ізоляція конкурентного Gmail OAuth refresh

- **Статус:** розгорнуто у stable v55; concurrency перевірено детермінованими локальними тестами.
- **Результат:** для кожного Gmail-з’єднання застосовано короткий ScriptLock лише на claim/commit/release та lease у protected Script Properties; HTTP refresh виконується поза lock.
- **Інваріанти:** активний lease не допускає другого provider fetch; перед commit повторно перевіряються connection ID, email, token generation і поточний token record; помилка звільняє власний lease без зміни захищеного токена.
- **Доказ:** детерміновані локальні тести та candidate hash pin для поточної Versie 1.
- **Source request:** REQ-0015.
- **Production evidence:** immutable v55, E4/E5 та cleanup пройдено; примусовий live token refresh і fresh OAuth цикл не виконувалися.

### B1-14 — Безконфліктне поєднання bridge і продукту

- **Статус:** виконано.
- **Результат:** bridge-only PR #2 (`a7df53c`) і product PR #1 (`ee9286e`) злиті normal merge; `delete/modify` конфлікт вирішено збереженням перевіреного bridge з `main`.
- **Без втрат:** product fixes, immutable history і rollback v50 збережені; obsolete bridge deletion не переносилася.

### B1-15 — Cold-start і production observability

- **Статус:** в роботі.
- **GT-021:** перше відкриття Web App інколи потребує refresh після тривалого skeleton.
- **GT-022:** `clasp logs` потребує точного підтвердженого GCP project ID; ідентичність не вгадувати.

### B1-16 — Закрити delivery-worker overlap gate

- **Статус:** VERIFIED
- **Випуск:** immutable v64 є production і HEAD; staging `0`. Worker code, прийнятий у v63, не змінений у v64.
- **Завершено:** deterministic reproduction, tokenized seven-minute crash lease, 150-second soft stage deadline, token-matched release, focused `17/17`, cumulative `501/501`, owner acceptance v63 і сім послідовних no-overlap runtime executions.
- **Спостереження v64:** шість post-cleanup executions завершилися. Один 3.164-секундний process shell наклався на попередній рядок приблизно на 5.7 секунди; concurrent long-running worker body не спостерігався, а exact lease-rejection substage лишається UNVERIFIED.
- **Доказ:** [VR-011](verification-reports/reports/VR-011/README.md), [звіт про v63](reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md) і [VR-013](verification-reports/reports/VR-013/README.md).
- **Залишкова межа:** History-substage telemetry та external automatic INBOX після v64 є окремими evidence items, а не переписуванням verified source/runtime gate GT-030.
### B1-17 — Google primary-source gate і publication surfaces

- Перед змінами Gmail/Apps Script читати канонічні Advanced Gmail Service та Advanced Google services сторінки й фіксувати дату/рішення.
- GitHub лишається канонічним code/history repository; Apps Script — runtime; Developer Profile — discovery-індекс, а не Git mirror.
- CI має тестувати LF/CRLF-стабільний evidence hash до перевірки factual verification reports.
- **Статус:** tooling/docs candidate; Gmail runtime і Versie не змінено.
- **Джерело:** `REQ-0021`.

### B1-18 — Connection-scoped metadata transport

- **GT-025:** усунути hardcoded Apps Script owner token у parallel `threads.get` metadata.
- Зберегти direct Gmail API для зовнішніх OAuth connections; Advanced Gmail Service оцінювати лише як окремий owner-lane adapter.
- Наступний quota-reduction spike: один Gmail HTTP batch із fail-closed multipart/Content-ID parser та без змішування connection tokens.
- **Статус:** source candidate; live staging/production `unverified`.
- **Джерело:** `REQ-0021`.

### B1-19 — Shared bootstrap A/B після rollback v56

- **Статус:** виконано і перевірено 2026-07-22.
- **Safe state:** stable production v63; immutable v56 історичний; exact rollback v55 збережено; staging `0`; Telegram menu вказує на production.
- **Доказ A/B:** два свіжі v55 mailbox launches пройшли, signed staging v57 показав avatar, три roots і switch на контрольований другий account та назад без OAuth; після promotion два v57 production launches пройшли.
- **Delivery gate:** незалежний owner-controlled external `INBOX` автоматично створив одну Telegram card із правильним account marker; два `/check` не створили дубль. Self/alias `INBOX+SENT` probes правильно пропущені.
- **Release rule:** immutable v56/v57 не переписувати; Versie 2 або наступний immutable не створювати без нового точного owner-наказу.
- **Source requests:** REQ-0019, REQ-0021.

### B1-20 — Owner-only Advanced Gmail read adapter

- **Статус:** PARTIAL — інтегровано в immutable v58/v59, protected flag не ввімкнено, live evidence очікує v59 acceptance.
- Зберегти allowlisted adapter для `messages.list`, `messages.get` і `history.list` під protected property `GMAIL_OWNER_ADVANCED_READ_V1=enabled`.
- Визначати поточне connection через registry й fail closed, якщо provider не `apps_script_owner`; кожне зовнішнє OAuth connection зберігає власний direct HTTP token path.
- Залишити mutations та unsupported reads на direct HTTP і передавати Advanced Service failures без автоматичного fallback.
- **Межа доказу:** до синхронізації детерміновані adapter-тести пройшли 8/8. Актуальні докази `main` збережені, але candidate навмисно відрізняється від immutable v57, тому exact release-hash gate очікувано лишається до окремо авторизованого наступного immutable. Flag не встановлено, production лишається exact v57, staging дорівнює `0`, а live зменшення quota має статус `unverified`.
- **Source requests:** `REQ-0024`, `REQ-0027`.

## Оновлення дорожньої карти від 2026-07-22

- [x] Підтвердити автоматичну доставку для primary Gmail root.
- [x] Підтвердити автоматичну доставку для root-2 з правильною позначкою акаунта.
- [x] Підтвердити автоматичну доставку для root-3 з правильною позначкою акаунта.
- [x] Підтвердити dedupe для кожного secondary root двома повторними /check.
- [x] Відокремити Gmail Spam-класифікацію від product delivery failure.
- [x] Закрити secondary-root частину B1-16 і B1-19 production evidence.
- [ ] Нова Google OAuth-згода залишається окремим manual gate і не ініціюється без технічної потреби.
- [ ] Наступна Versie не авторизована; усі подальші виправлення залишаються в Versie 1.

## B1-21 — Єдине доступне керування Gmail-мітками

- **Статус:** PARTIAL — інтегровано в immutable v58/v59; v59 staging acceptance очікується.
- **Дата:** 2026-07-22
- **Обсяг:** одна модель USER/SYSTEM labels для sidebar і профільної панелі; create, rename, guarded delete, full-path nesting, доступність, responsive layout, loading/error/retry та account isolation.
- **Реалізовано:** VERIFIED локально у [4ac0b90](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91).
- **Доказ:** [GT-027](ISSUES.md), [VR-005](verification-reports/reports/VR-005/README.md).
- **Залишилось:** BLOCKED до усунення GT-028 і повторного staging acceptance; production verification виконується лише після pass.
- **English mirror:** [docs/en/ROADMAP.md](../en/ROADMAP.md)

## B1-22 — Recovery від stale automatic thread route

- **Статус:** PARTIAL — root cause і source fix VERIFIED; immutable v59 staged; live acceptance UNVERIFIED.
- **Виконано:** direct production v57 inspection довів, що mailbox/bootstrap, avatar, Inbox і delivery працюють; failure локалізовано до повторного automatic thread route та reader recovery.
- **Source candidate:** launcher споживає route один раз; automatic initial/hash/resume failures повертаються до list; manual open лишає retry semantics. Targeted `238/238`, non-release `440/440` і docs validators green; два release hash guards очікувано блокують changed source від маскування під immutable v57/v58. Source request: `REQ-0029`.
- **Межа:** production exact v57 не змінено; immutable v59 і один owner-only staging створені, historical v58 staging прибрано після exact replacement verification; promotion заборонене до pass.
- **Наступний доказ:** targeted/full/docs tests, normal PR і required checks; після окремого release-дозволу — новий immutable staging acceptance двома fresh launches до будь-якого promotion.
- **Доказ:** [GT-028](ISSUES.md), [VR-006](verification-reports/reports/VR-006/README.md).
- **English mirror:** [docs/en/ROADMAP.md](../en/ROADMAP.md)

## B1-24 — Динамічний активний поштовий контекст

- **Статус:** VERIFIED — source, native staging і production acceptance пройшли в immutable v64.
- **Дата:** 2026-07-22.
- **Обсяг:** замінити static owner heading на блок, похідний від opaque connection ID, для одного акаунта або фактичного shared view без другої state-моделі.
- **Реалізація:** повне ім'я/email, український родовий відмінок із safe fallback, `Спільна пошта` лише для двох або більше включених акаунтів, accessible name-to-email disclosure, loading/empty/error states, responsive wrapping і narrow-screen disclosure повної адреси.
- **Acceptance:** три isolated roots, real avatar і fallback, switch на інший акаунт та повернення без OAuth, actual shared mapping і два fresh production launches.
- **Тести:** focused `88/88`; final cumulative suite `505/505`.
- **Доказ:** [GT-031](ISSUES.md), [VR-013](verification-reports/reports/VR-013/README.md). Source requests: `REQ-0032` і `REQ-0033`.
- **English mirror:** [docs/en/ROADMAP.md](../en/ROADMAP.md).
## B1-25 — P0 швидка навігація, bounded cache, drafts, typography та client updates

- **Статус:** PARTIAL
- **Production boundary:** cumulative source deployed як immutable v65; staging `0`, journal `cleaned`, exact v64 є rollback.
- **Перевірено:** dynamic active context і narrow full-address disclosure, три isolated roots, switching без OAuth, shared mapping, production app-shell load, worker gate GT-030, bounded promotion GT-037 та exact release cleanup.
- **Поточний source step:** staging v65, два production launches і cleanup пройшли. GT-039 виявив inherited exclusion `SENT+INBOX`; його message-ID dedupe correction merged, а наступний cumulative source marker є v66.
- **Ще потрібно:** hash-pinned staging/production acceptance v66 для GT-039 і майбутній one-reload/no-loop evidence для GT-036; measured cold/warm і `A -> B -> A` traces; scroll/focus restoration; incremental arrival evidence; quota/LRU eviction; offline/restart/cross-session draft recovery; conflict handling; same-scale production typography comparison.
- **Пов'язані проблеми:** GT-032–GT-036, GT-038 і GT-039 лишаються open/partial; GT-031 і GT-037 verified.
- **Правило:** продовжувати в межах Versie 1. Створювати наступний immutable лише для окремо протестованої cumulative code change після clean preflight boundary.
- **Доказ:** [VR-009](verification-reports/reports/VR-009/README.md), [VR-013](verification-reports/reports/VR-013/README.md), [VR-014](verification-reports/reports/VR-014/README.md) і [VR-015](verification-reports/reports/VR-015/README.md).

## B1-26 — P0 ONE-SECOND launch

- **Статус:** PARTIAL
- **Recovery boundary:** v66 завершено fail-closed; stable/HEAD v65, staging `0`, production menu відновлено.
- **Source candidate:** cumulative v67 прибирає duplicate launch presentation, single-flight-ить bridge/boot і прогріває IndexedDB без читання приватних records до bootstrap.
- **Local gates:** launch `5/5`, P0 cache/navigation `14/14`, MailApp contract `88/88`.
- **Blocked evidence:** production p95 `≤1000 ms`, 10 native launches, offline private Inbox, arrival prefetch і bidirectional account switch.
- **Release gate:** лише один hash-pinned v67 staging після повного suite/CI; promotion тільки якщо всі native acceptance criteria VERIFIED.
- **Доказ:** [VR-016](verification-reports/reports/VR-016/README.md), проблеми [GT-040–GT-047](ISSUES.md), source request `REQ-0034`.

- **Final local gate 2026-07-23:** cumulative `518/518`; bilingual `71` pairs; knowledge hub `17` pairs/`295` source IDs; verification checker passed.

## P0 gate продовження після v67

- [x] Усунути дубльовану видиму послідовність bridge та bootstrap loading.
- [x] Зберегти єдиний bootstrap/auth single-flight і блокування приватного кешу до серверної перевірки акаунтів.
- [x] Зберегти immutable v67, повернути production menu та після неповного acceptance видалити лише точний тимчасовий staging deployment v67.
- [ ] Додати відтворюване внутрішнє вимірювання time-to-interactive без overhead керування desktop і screenshot.
- [ ] Погодити та реалізувати device-bound unlock або single-origin architecture до заяви про offline-запуск приватної пошти.
- [ ] Перевірити десять нативних warm launches, offline-доступ до кешованої пошти, відновлення чернеток і двостороннє багатоакаунтне перемикання до будь-якого наступного promotion.

## B1-27 — V3 cache-first launch hardening

- **Статус:** PARTIAL.
- **Source request:** `REQ-0035`.
- **Release candidate:** cumulative Versie 1 зафіксовано окремим immutable v68 на базі preserved immutable v67.
- **Локально VERIFIED:** duplicate boot copy прибрано; settled single-flight, правильний IndexedDB warmup, cache-first list/thread, opaque owner/account namespace, bounded schema v2, advisory persistent storage, unread-first prefetch без `markRead` і non-blocking account attention flow.
- **Gates:** targeted `25/25`, release `3/3`, MailApp contract `88/88`, final cumulative `531/531`, documentation validators і required PR checks пройшли.
- **Native staging:** два launches без repeated connection overlay/OAuth; три roots, primary-secondary-primary і shared context verified. Real cached Inbox `≤1000 ms`, десять запусків, offline/cache-lock, prefetch та drafts лишаються `UNVERIFIED` або `BLOCKED`.
- **Terminal state:** promotion не виконувався; owner menu повернуто на production; exact staging видалено через merged fail-closed helper PR #62; production/HEAD v65, staging `0`, immutable v68 retained, journal `abandoned`.
- **Наступний крок:** не повторювати v68 staging без нового вимірюваного acceptance-контуру або окремого cumulative fix. Підготувати in-app TTI trace та architecture decision для device-bound unlock/single-origin offline shell.
- **Доказ:** [VR-017](verification-reports/reports/VR-017/README.md), issues [GT-040–GT-047](ISSUES.md).
- **English mirror:** [docs/en/ROADMAP.md](../en/ROADMAP.md).

## B1-28 — Точна ідентичність Gmail-вкладення в Telegram

- **Статус:** PARTIAL.
- **Source request:** `REQ-0035`; V3 task `B-01`.
- **Локально VERIFIED:** нові Telegram-картки використовують opaque exact-identity callback; повторне читання вимагає рівно один збіг; неоднозначність fail closed; historical callbacks зберігають legacy compatibility.
- **Gates:** targeted attachment tests `154/154`, final cumulative suite `532/532`, `git diff --check` clean, added-lines secret scan `0`.
- **Ще потрібно:** normal PR/required CI, owner-only native Telegram download acceptance і лише потім окремо авторизований cumulative immutable release contour.
- **Release boundary:** production/HEAD v65, staging `0`, immutable v68 historical; ця source correction не deployed і не змінює Versie 1.
- **Доказ:** [GT-048](ISSUES.md), [VR-018](verification-reports/reports/VR-018/README.md).
- **English mirror:** [docs/en/ROADMAP.md](../en/ROADMAP.md).
