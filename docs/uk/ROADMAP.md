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
- **B1-22:** stale automatic route recovery live-перевірено у v59 staging і двох production launches. Fix не є частиною чинного v57 після exact rollback. Статус `PARTIAL`.

## B1-23 — Runtime gate v59 та exact rollback

- **Статус:** BLOCKED; safe state відновлено.
- **Виконано:** immutable v59 staged один раз, UI acceptance пройдено, promotion і два production launches пройшли, cleanup видалив staging.
- **Blocker:** post-cleanup execution `214.96 с` перевищив 150-секундний target і перекрився з наступним execution window; root cause `UNVERIFIED`.
- **Захист:** exact rollback до v57; stable і HEAD v57, staging `0`, journal `rolled_back`; fresh rollback mailbox launch пройшов.
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

### B1-16 — Timer runtime budget і URLFetch quota isolation

- **Статус:** виконано і перевірено production v57; immutable v56 збережено як історію, exact rollback v55 збережено, staging `0`, journal `cleaned`.
- **GT-023:** один хвилинний trigger запускав новий worker до завершення попереднього 80–106-секундного виконання; щохвилинний all-account Gmail History fan-out вичерпав денну квоту `URLFETCH`.
- **Зміна:** content-free timer slots у Script Properties, атомарні лише під коротким ScriptLock; worker cadence 150 секунд, realtime лишається першим, повний History backfill не частіше одного разу на 15 хвилин.
- **Без зміни:** trigger лишається єдиним і хвилинним; Gmail records, OAuth tokens, Telegram zones і листи не мутуються.
- **Gates:** повний suite пройшов `444/444`; hash-pinned v57 staging A/B, два production launches, cleanup і post-cleanup `PreflightOnly` пройшли. Production trigger window мав completed full/slot-skip cadence без failed worker.
- **Source requests:** REQ-0018, REQ-0019, REQ-0021.

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
- **Safe state:** stable production v57; immutable v56 історичний; exact rollback v55 збережено; staging `0`; Telegram menu вказує на production.
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

- **Статус:** PARTIAL — source implementation додано в Versie 1; production acceptance відсутній.
- **Дата:** 2026-07-22.
- **Обсяг:** замінити статичний owner heading на похідний від opaque connection ID блок для одного акаунта або фактичного shared view без другої state-моделі.
- **Реалізація:** повне ім’я/email, український родовий відмінок із безпечним fallback, `Спільна пошта` лише для двох або більше включених акаунтів, доступне name-to-email disclosure, loading/empty/error states і responsive wrapping.
- **Інваріанти:** не змінювати OAuth, Gmail permissions, shared membership або mail-flow; не визначати акаунт за ім’ям чи avatar; оновлюватися через чинні bootstrap/switch/preferences render paths без reload.
- **Наступний доказ:** targeted UI contract, non-release suite, парні docs gates, visual responsive check і normal PR. Immutable/staging/production лишаються окремим bounded cycle після розв’язання GT-030.
- **Доказ:** [GT-031](ISSUES.md), [VR-008](verification-reports/reports/VR-008/README.md). Source request: `REQ-0032`.
- **English mirror:** [docs/en/ROADMAP.md](../en/ROADMAP.md).

## B1-25 — P0 миттєвий клієнт, bounded cache і надійні чернетки

- **Статус:** PARTIAL — architecture, baseline і source implementation зафіксовано; automated/browser/staging/production acceptance очікується.
- **Дата:** 2026-07-22. Source request: `REQ-0033`.
- **Обсяг:** Gmail-compatible typography; app-shell internal navigation; account-isolated memory/IndexedDB LRU; stale-while-revalidate; keyed incremental list reconciliation; optimistic mutation rollback; local плюс Gmail draft autosave; version-aware one-time client activation.
- **Проблеми:** [GT-032](ISSUES.md), [GT-033](ISSUES.md), [GT-034](ISSUES.md), [GT-035](ISSUES.md), [GT-036](ISSUES.md).
- **Доказ:** [VR-009](verification-reports/reports/VR-009/README.md).
- **Release boundary:** immutable candidate або deployment не створюється до pass локального source і CI gates. Promotion потребує bounded staging acceptance; exact rollback лишається v57.
- **English mirror:** [docs/en/ROADMAP.md](../en/ROADMAP.md).
