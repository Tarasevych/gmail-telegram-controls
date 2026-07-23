# Реєстр знайдених проблем

Оновлено: **2026-07-23**. Статуси: `Відкрита`, `В роботі`, `Заблокована`, `Вирішена локально`, `Перевірена staging`, `Розгорнута production`, `Перевірена production`.

| ID | Статус | З Versie | Проблема | Рішення / наступний доказ |
|---|---|---:|---|---|
| GT-001 | Вирішена і перевірена production v57 | 1 | Один лист надходить у Telegram двічі | Чистий external marker `INBOX` створив рівно одну картку, а durable Gmail message-ID/card reservations запобігли replay; окрему current недоставку `SENT+INBOX` відстежує GT-039 |
| GT-002 | В роботі | 1 | Google callback відкриває сторінку Диска замість сервісу | Direct Apps Script callback відхилено через офіційно непідтримуваний Google multi-login; впроваджується neutral GitHub callback + credentialless POST; потрібен live acceptance |
| GT-003 | Перевірена production | 1 | У header показується літера замість Google profile photo | Header використовує реальне Google profile photo з fallback; фото прочитано у staging та production v55 |
| GT-004 | Вирішена локально | 1 | `Додати Gmail-акаунт` вимагає зайвий клік `Продовжити в Google` | Відкривати authorization URL одразу; показувати fallback лише якщо браузер блокує перехід |
| GT-005 | Перевірена staging | 1 | Account panel рахує stale/inactive connection IDs | Preferences фільтруються за active visible IDs; staging v55 показав три ізольовані активні підключення та коректне відновлення початкового контексту |
| GT-006 | Відкрита | 1 | OAuth client має більше одного enabled secret | Окремо визначити active secret за protected runtime evidence; не видаляти й не ротувати в Versie 1 без безпечного плану |
| GT-007 | Відкрита, низький ризик | 1 | GitHub Pages попереджає про forced Node 24 для старих Actions | Оновити action pins у наступній Versie після production стабілізації |
| GT-008 | Частково перевірена production | 1 | Немає повного real-time acceptance нового Gmail flow | E5 для вже підключеного owner-акаунта пройдено; fresh account choice/consent/callback нового Gmail-акаунта та second-account fan-out залишаються неперевіреними |
| GT-009 | Вирішена локально | 1 | Accessibility label використовує множину для одного акаунта | `1 Gmail-акаунт`, множина для інших значень |
| GT-010 | Розгорнута production; concurrency перевірена локально | 1 | OAuth token refresh path не мав function-local coordination; паралельні виклики могли одночасно оновлювати один token record | Stable v55 містить короткі ScriptLock-секції claim/commit/release, per-connection lease без секретів, provider I/O поза lock і generation/reconnect recheck; примусовий live refresh не виконувався |
| GT-011 | Перевірена staging | 1 | Telegram settings не мали нативного one-click перемикання між Gmail-акаунтами | Staging v55 показав три ізольовані Gmail-підключення; one-click switch до іншого підключення та повернення до початкового контексту пройшли без OAuth |
| GT-012 | Перевірена staging для наявних сесій | 1 | Підписана Google-сесія переписує Apps Script web-app URL у `/macros/u/N/` і повертає Drive “файл не знайдено” | Neutral GitHub Pages bridge відкрив staging без Drive error; fresh OAuth callback ще не перевірено |

| GT-013 | Перевірена production | 1 | Owner-команда /settings потрапляла у fallback і не показувала Gmail-акаунти | Production v42 маршрутизує /settings і кнопку Gmail-акаунтів у нативне Telegram-меню |
| GT-014 | Перевірена production | 1 | Telegram menu web_app відкривав Apps Script у підписаній Google-сесії та повторював Drive error | Тимчасовий command-menu замінено на `📬 Пошта · Versie 1`; Web App відкриває нейтральний GitHub Pages bridge, а не прямий Apps Script URL |
| GT-015 | Відкрита, без мутації даних | 1 | Два connection records тієї самої owner Gmail показуються окремими кнопками | Не видаляти й не зливати записи автоматично; додати account-zone display dedupe після factual identity check |
| GT-016 | Обмеження платформи | 1 | Telegram Web показує стандартний Open Link перед зовнішнім Google OAuth | Власний зайвий Continue with Google усунуто; системне попередження Telegram не обходити |
| GT-017 | Відкрита | 1 | Старі кнопки листів «Відкрити гілку в Mini App» ще можуть відкрити Apps Script Drive error у multi-login Chrome | Account/OAuth flow вже chat-native; повний Mini App потребує нейтрального response-capable backend або заміни legacy deep links |

| GT-018 | Перевірена production v57 | 1 | Нові Gmail-листи не доходять, доки frozen scan відпрацьовує старий backlog | Bounded realtime-смуга автоматично доставила чистий external `INBOX` marker; frozen scan лишається backfill |
| GT-019 | Перевірена production v57 | 1 | Ручна `/check` перевіряла лише legacy mailbox | Два послідовні `/check` після автоматичної доставки повернули «нових листів немає» і не створили повторної картки; marker лишився одним Telegram list item |
| GT-020 | Відкрита операційна | 1 | У protected credential store лишився застарілий alias Telegram bot token, який повертає 401 | Runtime використовує окреме підтверджене protected посилання; не ротувати чинний token без окремого безпечного плану |
| GT-021 | Відкрита production | 1 | Перше відкриття production Web App інколи лишається на skeleton понад 15 секунд | Після одного refresh mailbox завантажився; додати content-free timing для bridge/backend bootstrap і перевірити cold-start timeout без Gmail mutations |
| GT-022 | Обмеження платформи | 1 | `clasp logs` недоступний, бо production використовує Apps Script-managed default GCP project без standard project ID | Не мігрувати лише заради логів: це незворотно скасувало б чинні authorizations. Використовувати Apps Script Executions UI або окремий content-free telemetry reader |
| GT-023 | Вирішена і перевірена production v57 | 1 | Єдиний хвилинний `checkNewMail_` виконувався довше хвилини, тому повні worker-проходи перекривалися та вичерпували денну квоту `URLFETCH` | Immutable v57 використовує атомарний 150-секундний timer slot, лишає realtime першим і обмежує повний Gmail History backfill 15-хвилинним slot. `444/444` tests пройшли; production показав completed full/skip cadence без failed worker у acceptance window |
| GT-024 | Вирішена і перевірена production v57 | 1 | Однаковий mailbox network error відтворився на production v55 та owner-only staging v57 під час quota incident | Після quota recovery два v55 launches і staging v57 A/B пройшли; v57 просунуто, двічі перевірено production, staging очищено. Валідний external `INBOX` автоматично створив одну картку без дубля після двох `/check` |
| GT-025 | Інтегрована в immutable v58; live unverified | 1 | Parallel thread metadata завжди використовувала Apps Script owner token навіть у зовнішньому multi-account context | `mailboxMultiGmailAccessToken_` вибирається для активного `connectionId`, а `ScriptApp.getOAuthToken()` лишається тільки для legacy/owner lane; cumulative v58 suite пройшов, але mailbox acceptance заблокований GT-028 |
| GT-026 | Інтегрована в immutable v58; flag off; live unverified | 1 | Allowlisted owner Gmail reads завжди витрачають Apps Script `URLFETCH` quota, хоча офіційний Advanced Gmail Service увімкнено | Allowlisted owner-read adapter включено в cumulative v58, але protected flag не вмикався; зовнішні OAuth connections лишаються на власних token paths. Live quota reduction не перевірена через GT-028. Source requests: `REQ-0024`, `REQ-0027`, `REQ-0028` |
| GT-027 | PARTIAL; live UI перевірено у v59, production відкочено | 1 | Sidebar і profile manager мали різні label state/render paths, не мали узгоджених create/manage controls і ламали довгі назви | v59 staging показав `+ Створити`, доступну manage-action для USER labels, bounded scroll і довгі вкладені назви без overlap; mutating operations не виконувалися. Production повернуто на v57 через GT-030 |
| GT-028 | PARTIAL; fix live-перевірено у v59, production відкочено | 1 | Launcher зберігав одноразовий thread route у Telegram WebView history, а невдалий automatic open лишав reader у error-state без повернення до вже завантаженого списку | v59 staging і два production launches відновили stale automatic route у список без network/Drive error; повторно збережений Telegram route все ще дає content-free recovery notice. Production повернуто на v57 через окремий GT-030 |
| GT-029 | Вирішена та синхронізована | 1 | Root README називав v37 поточним production, хоча verified runtime працював на v57, створюючи конфлікт для людей і recovery-агентів | `docs/release-state.json`, парні CURRENT_STATE сторінки та Release state CI синхронізують canonical mutable state; runtime source audit не знайшов читання GitHub Markdown ботом, тому це не runtime root cause. Source request: `REQ-0031` |
| GT-030 | VERIFIED у production; dedicated History-substage trace лишається UNVERIFIED | 1 | Попередній 150-секундний admission TTL міг завершитися раніше за legal Apps Script execution | Tokenized seven-minute crash lease запобігає simultaneous Gmail work, зберігає 150-секундний soft stage deadline і пройшов sequential production worker evidence; окремий 15-хвилинний History substage має лише automated-contract evidence |
| GT-031 | Перевірена production v64 і збережена у v65 | 1 | Ідентичність активного акаунта обрізалася у вузькому header | Stable-ID context view, повний email disclosure, shared mapping, wrapping і compact narrow-screen details пройшли native staging та два fresh production launches |
| GT-032 | PARTIAL | 1 | Типографіка відрізнялася від Gmail reading context | Gmail-compatible local-first type scales deployed; same-scale production visual comparison лишається UNVERIFIED |
| GT-033 | PARTIAL | 1 | Внутрішня навігація повторно очищала й завантажувала вже доступні views | Warm list/thread restore, request dedupe, generation guards, keyed rows і saved view state deployed; measured production `A -> B -> A` evidence лишається UNVERIFIED |
| GT-034 | PARTIAL | 1 | Клієнт не мав bounded account-isolated cache і background revalidation | Memory LRU, bounded IndexedDB records, expiry, stale-while-revalidate та account purge deployed; browser quota/eviction acceptance лишається UNVERIFIED |
| GT-035 | PARTIAL | 1 | Текст чернетки не мав негайного persistent recovery checkpoint | Account-scoped IndexedDB text recovery доповнює stable Gmail Draft autosave; offline/restart/cross-session acceptance лишається UNVERIFIED |
| GT-036 | PARTIAL; source deployed у v65 | 1 | Новий production client міг лишатися stale у відкритому Mini App | Canonical release parsing і marker v65 deployed з one-reload guards; майбутній transition v65-to-newer має довести рівно один reload без loop |
| GT-037 | Перевірена production v64 і збережена у v65 | 1 | Promotion міг повідомити failure після успішного deployment update | Одна mutation плюс bounded read-after-write reconciliation пройшли live promotion, cleanup і final preflight |
| GT-038 | PARTIAL | 1 | Telegram Web K/A показує blank signed Mini App, тоді як native Desktop працює | Native Desktop staging/production пройшли; web-only root cause лишається UNVERIFIED, а signature/session controls не можна послаблювати |
| GT-039 | PARTIAL; source fix merged | 1 | Лист із labels `SENT` та `INBOX` мовчки виключається з Telegram | Прибрати `SENT` exclusion лише після required `INBOX` gate; зберегти spam/trash/important boundaries і dedupe за stable Gmail message ID; v66 staging/production acceptance ще потрібен |

## Production-доказ 2026-07-20

- Apps Script stable: v42; staging: 0; immutable v41 збережено як rollback.
- Локальні тести: 418/418.
- setupTelegramControls завершився в Apps Script editor; Telegram menu став command-menu.
- Production /settings показав ізольовані Gmail-акаунти, one-click callbacks і прямий GitHub OAuth launcher.
- Реальний OAuth дійшов до нового Google consent gate; consent не підтверджено, callback success ще не доведено.
- REQ-0009: контрольний новий лист не з'явився після minute trigger і manual /check; webhook був healthy, тому збій локалізовано до frozen Gmail scan та порядку worker-ів.

## Production-доказ 2026-07-21

- Bridge-only PR #2 злитий як `a7df53c`; product PR #1 після normal merge-конфлікту злитий як `ee9286e`. Конфлікт `delete/modify` вирішено збереженням уже перевіреного bridge з `main`, без відкату коду Versie 1.
- Immutable Apps Script v55 спочатку пройшов E4 у staging, потім stable deployment просунуто з v50 на v55. Після E5 тимчасовий staging видалено.
- Фінальний `PreflightOnly`: stable v55, `headState=candidate_v55`, immutable ready, staging 0, legacy staging 0, journal `cleaned`.
- Staging E4: Web App відкрив mailbox без Drive error, показав profile photo, три ізольовані Gmail-підключення та one-click switch із відновленням початкового контексту.
- Production E5: контрольний owner self-message з `SENT+INBOX` автоматично створив одну картку; два `/check` повернули «Нових листів немає», а exact-marker search двічі показав один результат.
- Production menu: `📬 Пошта · Versie 1` відкриває статичний GitHub Pages bridge. Випадкові листи, OAuth records і Gmail-зони не змінювалися.
- Перше production-відкриття вимагало одного refresh після skeleton; `clasp logs` не запустився без підтвердженого GCP project ID. Обидва спостереження лишаються відкритими як GT-021/GT-022.
- Apps Script Executions підтвердив причину нового delivery outage: один хвилинний trigger породжував перекривні 80–106-секундні виконання, а Gmail History fan-out щохвилини завершився `Service invoked too many times for one day: urlfetch`. Trigger list містив рівно один `checkNewMail_`; конфігурацію trigger не змінено.
- GT-022 перекласифіковано як platform constraint: production використовує Apps Script-managed default GCP project. Перехід на standard GCP project лише заради `clasp logs` незворотно скасував би чинні authorizations, тому його не виконано; безпечним доказовим джерелом лишається Apps Script Executions UI.

## Recovery evidence 2026-07-21 — REQ-0019

- PR #4 злитий normal merge як `23927148cfa616dbd1504e81768d013b01a9ed37`; повний suite пройшов `440/440`, додаткові release-тести `5/5`, GitHub checks успішні.
- Immutable v56 збережено. Owner-only staging v56 відкрив mailbox без Drive error, показав profile photo і три account roots; автоматизована спроба switch не дала перевірюваної зміни стану, тому switch лишається `unverified`.
- Після promotion production v56 показав network error. Exact rollback повернув stable на v55 зі збереженим staging v56; два production v55 bootstrap-запуски показали той самий error, тому candidate-specific regression не доведена.
- Apps Script Executions для v56 і v55 показали успішні `doPost`, `mailboxRedeemLaunch`/`mailboxRenewSession` та `mailboxRpc`. У ті самі часові вікна `checkNewMail_` завершувався `Service invoked too many times for one day: urlfetch` у `gmailApiRequest_`; це відділяє callback/session replay від підтвердженого Gmail API quota blocker.
- Поточний safe state: stable і HEAD v55, один preserved staging v56, journal `rolled_back`, Telegram menu на production. Default GCP project не мігрувався, secret properties не читалися й не публікувалися.
- Source request: `REQ-0019`.

## Stage 1 continuation evidence 2026-07-21

- Git boundary: `origin/main` `535a77d...`; 16 clean worktrees, no stashes or unfinished Git operations, no open PR, latest main checks green.
- Release boundary: GET-only `PreflightOnly` passed with production v55, one preserved staging v57, journal `staging_verified` and legacy staging 0. Immutable v56 remained historical.
- Runtime: exactly one `checkNewMail_` trigger; recent 45-149-second executions overlapped, and a failed run ended with the daily `urlfetch` quota exception in `gmailApiRequest_`.
- Telegram control plane remained healthy: production menu, pending updates 0, no webhook last error, max connections 1, allowed updates `message`/`callback_query`.
- Clean local baseline passed 444/444 tests and all documentation/report gates. Fresh account-switch, delivery, dedupe and Mini App acceptance remain `unverified` until quota recovery.
- Full sanitized evidence: [VR-004 Stage 1 appendix](verification-reports/reports/VR-004/STAGE_1_CONTINUATION_AUDIT.md). Source requests: `REQ-0019`, `REQ-0020`.
- Advanced Gmail research: wholesale replacement of direct HTTP is incompatible with external connection tokens; only an owner-lane hybrid is a safe candidate, and quota reduction remains `unverified`. [Compatibility evidence](verification-reports/reports/VR-004/ADVANCED_GMAIL_COMPATIBILITY.md). Source request: `REQ-0021`.

## Як оновлювати

1. Нову проблему додати один раз із наступним `GT-*` ID.
2. Не видаляти вирішені записи; змінювати статус і додавати release evidence.
3. Не позначати `Перевірена production` лише за unit test або staging.
4. Не додавати email content, OAuth codes, tokens, cookies або secret properties.

## Дослідницький реєстр проблем

Повний report-derived список ризиків і невирішених конфліктів міститься в [Problems](knowledge-hub/PROBLEMS.md). Лише перевірені поточні дефекти отримують `GT-*` у таблиці вище.

## Незалежна перевірка

[VR-001](verification-reports/reports/VR-001/README.md) зберігає всі спростовані, часткові, неперевірені й заблоковані `KH-*` твердження. Вони не стають `GT-*` автоматично: `GT-010` додано окремо через статично підтверджену прогалину в поточному коді. Source request: `REQ-0004`.

## Доповнення від 2026-07-22: приймання всіх Gmail-коренів

- Попередню примітку про неперевірений inbound fan-out для другорядних коренів скасовано новим production evidence.
- Root-2: чистий Inbox-вхід створив рівно одну картку з правильною позначкою акаунта; два повторні /check не створили дубль.
- Root-3: чистий Inbox-вхід створив рівно одну картку з правильною позначкою акаунта; два повторні /check не створили дубль.
- Початкове потрапляння контрольного root-2 листа у Spam є зовнішньою Gmail-класифікацією, а не дефектом delivery: production навмисно виключає Spam.
- Видимий viewport Telegram не є достатнім доказом відсутності картки. Остаточний count перевіряється accessibility-index за унікальним sanitized marker.
- GT-018, GT-019, GT-023 і GT-024 не мають відкритого secondary-root acceptance blocker для production v57.

## GT-027 — Узгоджене керування Gmail-мітками

- **Статус:** PARTIAL — інтегровано в immutable v58/v59; live UI прийнято у v59, але production повернуто на v57 через GT-030.
- **Дата:** 2026-07-22
- **Запит:** [REQ-0026](https://github.com/Tarasevych/gmail-telegram-controls/blob/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8/requests/2026-07-22/REQ-0026-unified-gmail-label-management.md)
- **Першопричина:** VERIFIED — профільний список резервував ширину для кількох постійно видимих дій, sidebar не мав create/manage controls, а два представлення залежали від різних зрізів стану. Під час acceptance також виявлено спливання click до глобального close-handler і стискання implicit CSS-grid rows до 44 px.
- **Виправлення:** VERIFIED локально у [коміті 4ac0b90](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91): спільний state/render path, `+` біля заголовка, одна доступна pencil-action для кожної USER-мітки, progressive disclosure, bounded scroll, нормалізація вкладеного повного шляху, захист SYSTEM-міток, permission/retry states і синхронне оновлення обох поверхонь.
- **Перевірка:** VERIFIED локально — фінальний UI contract `84/84`; cumulative v58 suite `460/460`; 390×760 і 1280×820 з 48 synthetic labels не мають горизонтальних або вертикальних перекриттів.
- **Live verification:** VERIFIED у v59 staging — profile panel показав `+ Створити`, доступну manage-action для кожної USER-мітки, окремі SYSTEM labels, bounded scroll і довгі вкладені назви без overlap. Create/rename/delete навмисно не запускалися, щоб не мутувати випадкові Gmail labels.
- **Release boundary:** PARTIAL — v59 було просунуто після UI acceptance, але exact rollback повернув production на v63 через окремий runtime blocker GT-030.
- **Production:** UNVERIFIED — label changes не є частиною чинного production v57.
- **Звіт:** [VR-005](verification-reports/reports/VR-005/README.md)
- **English mirror:** [docs/en/ISSUES.md](../en/ISSUES.md)

## GT-028 — Застарілий automatic thread route у Telegram Mini App

- **Статус:** PARTIAL — першопричина і recovery behavior VERIFIED у v59; чинний production після GT-030 знову v57.
- **Дата:** 2026-07-22.
- **Фактичне уточнення:** окреме вікно production v57 успішно завантажило avatar, Inbox і реальний список листів; у Telegram також був свіжий доставлений notification. Отже попередня локалізація «до server handler» не підтвердилася.
- **Першопричина:** VERIFIED — GitHub Pages launcher передавав hash route у POST, але зберігав той самий route у history Telegram WebView. `openThread()` перехоплював failure автоматичного deep-link, показував reader error і не очищав selection/route, тому fresh menu launch повторював stale thread.
- **Source fix:** REQ-0029 робить hash одноразовим, а automatic initial/hash/resume open у разі failure очищає reader і показує вже завантажений list. Manual message selection зберігає error і `Повторити`.
- **Локальні докази:** targeted bridge/route suite `238/238`; усі non-release tests `440/440`; bilingual, knowledge-hub і verification validators пройшли. Повний release suite fail-closed лише на двох очікуваних immutable hash guards, бо змінений source навмисно не відповідає історичним v57/v58 pins.
- **Live evidence:** v59 staging відкрив mailbox, avatar і три account roots; stale automatic route повернувся до вже завантаженого списку з content-free notice замість reader/network failure. Два v59 production launches також завантажили mailbox.
- **Release boundary:** v59 promotion і cleanup були виконані за REQ-0030/P-009, але post-cleanup runtime gate GT-030 спричинив exact rollback до v63. Immutable v59 збережено, staging `0`.
- **Звіт:** [VR-006](verification-reports/reports/VR-006/README.md). Source request: `REQ-0029`.
- **English mirror:** [docs/en/ISSUES.md](../en/ISSUES.md)

## GT-030 — Worker admission lease міг завершитися раніше за Apps Script execution

- **Статус:** VERIFIED — immutable v63 є production, а сім послідовних one-minute worker executions завершилися без overlap.
- **Першопричина:** попередня 150-секундна property була admission TTL, а не повним execution lock. Legal Apps Script execution міг тривати довше, дозволяючи наступному minute trigger увійти, поки перший worker ще працював.
- **Виправлення:** v63 використовує tokenized seven-minute crash lease, лишає 150 секунд soft stage deadline, дозволяє лише token-matched release у `finally` та створює content-free telemetry.
- **Доказ:** focused contracts `17/17`, cumulative suite `501/501`, два production launches, сім послідовних завершених runtime rows і final stable/HEAD v63 preflight. Див. [VR-011](verification-reports/reports/VR-011/README.md).
- **Межа:** окремий 15-хвилинний History substage має automated-contract evidence; dedicated runtime substage trace лишається UNVERIFIED.

## GT-031 — Ідентичність активного акаунта може обрізатися у вузькому header

- **Статус:** VERIFIED — виправлення пройшло native staging і два fresh production launches на immutable v64.
- **Спостережений residual у v63:** header контрольованого альтернативного акаунта обрізав фінальну частину довгої email-адреси у вузькому view.
- **Першопричина:** desktop wrapping існував, але fixed narrow topbar стискав subtitle до cropped line і не мав tappable single-account disclosure повної адреси. Desktop `title` hint був недостатнім recovery path для touch-пристрою.
- **Виправлення:** wider views зберігають wrapping; narrow views використовують compact native `<details>` disclosure на чинній stable-ID context model і full account map. Hidden-state precedence, focus visibility, keyboard behavior і shared mode збережено.
- **Acceptance:** native staging v64 показав disclosure повної адреси, avatar/fallback behavior, три isolated roots, shared mapping і контрольоване switching без OAuth; два fresh production launches повторили responsive account context.
- **Тести:** focused mail-app contract `88/88`; final cumulative suite `505/505`.
- **Доказ:** [VR-013](verification-reports/reports/VR-013/README.md). Source request: `REQ-0033`.
## GT-032 — Типографіка відрізняється від читального контексту Gmail

- **Статус:** PARTIAL — live Gmail CSS, source fix і native v63 staging/production presentation VERIFIED; same-scale production typography comparison лишається UNVERIFIED. Release evidence: [VR-011](verification-reports/reports/VR-011/README.md).
- **Дата:** 2026-07-22. Source request: `REQ-0033`.
- **Першопричина:** клієнт змішував замалий 11–13 px interface text, важкі заголовки та message line-height 1.65 без єдиної типографічної шкали.
- **Source fix:** local-first Gmail-compatible UI stack, окремий reading stack, 14 px/20 px list rhythm, 14 px/1.5 reading і compose rhythm, responsive sizing та відсутність remote font dependency або layout-blocking font request.
- **Доказ:** authenticated read-only Gmail inspection в однаковому масштабі повернув чинний UI stack і 14 px/20 px mail-list cells; жодного листа не відкрито й не змінено. Див. [VR-009](verification-reports/reports/VR-009/README.md).
- **English mirror:** [docs/en/ISSUES.md](../en/ISSUES.md).

## GT-033 — Повторне завантаження та блокування внутрішньої навігації

- **Статус:** PARTIAL — root cause, source implementation, local performance contracts і v63 native list/account acceptance VERIFIED; measured production `A -> B -> A` trace лишається UNVERIFIED. Release evidence: [VR-011](verification-reports/reports/VR-011/README.md).
- **Першопричина:** list routes очищували всі rows перед кожним RPC; кожне відкриття листа відкидало detail; `threadLoading` втрачав другий клік; прийняті responses перебудовували весь list DOM.
- **Baseline:** local preview cold usable list `898 ms`; B open `431 ms`; already visited A reopen `409 ms`; static trace показує три `getThread` плюс три `attentionState` RPC для `A -> B -> A`.
- **Source fix:** warm list/thread restore, concurrent generation guards, request dedupe, keyed row reuse, збережені scroll/view state і відсутність document reload для звичайної навігації.
- **Доказ:** [VR-009](verification-reports/reports/VR-009/README.md). Source request: `REQ-0033`.
- **English mirror:** [docs/en/ISSUES.md](../en/ISSUES.md).

## GT-034 — Відсутній bounded cache і background revalidation

- **Статус:** PARTIAL — bounded architecture і v63 live account/list isolation VERIFIED; browser quota та eviction acceptance лишаються UNVERIFIED. Release evidence: [VR-011](verification-reports/reports/VR-011/README.md).
- **Першопричина:** клієнт не мав memory cache, IndexedDB, Cache Storage, Service Worker або persistent view state; усі freshness checks блокували видимий UI.
- **Source fix:** normalized account-scoped records, memory LRU на 60 entries, persistent budget 120 records/4 MiB, seven-day hard expiry, per-record cap, stale-while-revalidate, 45-second visible-tab refresh, stable IDs, stale-response rejection та account purge.
- **Межа:** token, session, credential або staging value не зберігаються. Service Worker/Background Sync не заявляються; Apps Script staging boundary треба протестувати до зміни статусу.
- **Доказ:** [VR-009](verification-reports/reports/VR-009/README.md). Source request: `REQ-0033`.
- **English mirror:** [docs/en/ISSUES.md](../en/ISSUES.md).

## GT-035 — Текст чернетки не мав негайного persistent recovery checkpoint

- **Статус:** PARTIAL — чинний Gmail autosave і local checkpoint наявні у production v63; offline/restart/cross-session acceptance лишається UNVERIFIED. Release evidence: [VR-011](verification-reports/reports/VR-011/README.md).
- **Першопричина:** Gmail autosave вже використовував stable operation ID і stale-response guards, але незбережені зміни лишалися лише в пам’яті до завершення debounced server request.
- **Source fix:** негайний bounded IndexedDB text checkpoint для кожного connection, чинне debounced Gmail Draft save, lifecycle flushes, виключення attachment bytes, cleanup після canonical acknowledgement та явний local-versus-Gmail conflict choice.
- **Межа:** інший пристрій може продовжити лише Gmail-confirmed draft. Browser-local recovery ніколи не позначається server-confirmed.
- **Доказ:** [VR-009](verification-reports/reports/VR-009/README.md). Source request: `REQ-0033`.
- **English mirror:** [docs/en/ISSUES.md](../en/ISSUES.md).

## GT-036 — Новий production client може лишатися stale у відкритому Mini App

- **Статус:** PARTIAL — manifest/marker correction deployed у production v65 і два fresh launches пройшли; automatic one-reload/no-loop transition лишається UNVERIFIED.
- **Першопричина:** ordinary mail state і client-code version спочатку не мали окремого lifecycle. Перша реалізація потім пропустила канонічне поле manifest `production.appsScriptImmutable` і зберегла stale marker v60 у production v64, тому не могла довести відповідність новозавантаженого client production-версії.
- **Source correction:** спочатку читати canonical immutable field, ідентифікувати immutable v65 як `Versie-1-v65-p0`, зберегти draft-safe one-reload/session guard behavior і regression-test реального contract `docs/release-state.json`.
- **Межа:** immutable Apps Script HTML лишається app shell. Unsupported Service Worker не симулюється, а routine mail synchronization ніколи не reload-ить документ.
- **Release boundary:** production/HEAD є exact immutable v65, staging `0`, journal `cleaned`, а exact v64 лишається rollback. Defective parser v64 не дозволяє прямо довести automatic transition v64-to-v65.
- **Доказ:** [VR-014](verification-reports/reports/VR-014/README.md). Source request: `REQ-0033`.
- **English mirror:** [docs/en/ISSUES.md](../en/ISSUES.md).
## GT-037 — Promotion helper може повідомити false negative після успішного deployment update

- **Статус:** VERIFIED — bounded helper hardening і live promotion acceptance v63-to-v64 пройшли.
- **Спостережена поведінка у v63:** `Promote` просунув stable v57 до v63, після чого immediate stale read створив помилку `Stable deployment did not advance to the candidate.`
- **Першопричина:** старий helper не мав bounded read-after-write reconciliation window. Propagation mechanism виведено з authoritative readback, а не заявлено як platform guarantee.
- **Виправлення:** promotion і rollback виконують один deployment PUT, після чого не більше п'яти read-only checks, приймають лише exact prior version під час convergence і fail closed за будь-якої contradictory version.
- **Live acceptance:** promotion v64 просунув exact v63 до v64 однією mutation із bounded reconciliation, без duplicate mutation або false negative. Cleanup і final preflight підтвердили stable/HEAD v64, staging `0` і journal `cleaned`.
- **Тести:** focused release contracts `2/2`; final cumulative suite `505/505`.
- **Доказ:** [VR-013](verification-reports/reports/VR-013/README.md).
## GT-038 — Telegram Web K/A показує blank signed Mini App, тоді як native Desktop працює

- **Статус:** PARTIAL — native Telegram Desktop staging і production VERIFIED; web-only failure та його root cause лишаються UNVERIFIED.
- **Спостережена поведінка:** Telegram Web K і A відкрили exact v63 signed bridge iframe, але показали blank/broken embedded page.
- **Межа:** не послаблювати signed bootstrap, session validation або account isolation заради web rendering.
- **Наступний доказ:** зібрати content-free browser/runtime diagnostics того самого release і порівняти supported Telegram Web embedding constraints із native Desktop.
- **Доказ:** [VR-011](verification-reports/reports/VR-011/README.md).

## GT-039 — `SENT+INBOX` mail виключається замість one-time delivery

- **Статус:** PARTIAL — root cause і source correction VERIFIED; production acceptance очікує cumulative v66.
- **Спостережена поведінка:** один контрольований owner self-message існував як `UNREAD+SENT+INBOX`; automatic worker і два `/check` повідомили про відсутність нових листів, а exact-marker chat search повернув zero cards.
- **Першопричина:** `gmailNotificationLabelsEligible_` вимагав `INBOX`, але також відхиляв кожен `SENT` label, після чого durable позначав message як seen. Runtime stages завершилися з `errorCode=none`, тому exclusion був silent і deterministic.
- **Source correction:** зберегти required `INBOX`, відхиляти `SPAM` і `TRASH`, зберегти important-only mode та дозволити чинному stable Gmail message-ID/card reservation dedupe забезпечити exactly-once delivery.
- **Verification:** focused source suite `161/161`; перший scan доставляє один раз, другий не refetch-ить і не resend-ить; `SENT` без `INBOX` лишається ineligible.
- **Release boundary:** fix merge `a6ba4d07feaeb7e9369b5e64860e1c3acd57048b`; production лишається v65 до hash-pinned staging v66.
- **Доказ:** [VR-015](verification-reports/reports/VR-015/README.md). Source request: `REQ-0033`.
- **English mirror:** [docs/en/ISSUES.md](../en/ISSUES.md).

## GT-040 — ONE-SECOND warm-launch performance

- **Статус:** PARTIAL
- **Source request:** `REQ-0034`
- **Доказ:** [VR-016](verification-reports/reports/VR-016/README.md)
- Локальний попередній trace: cold `898 ms`, B `431 ms`, cached A `409 ms`.
- Production p95 від Telegram button до реального interactive cached Inbox ще `UNVERIFIED`; потрібні 10 native staging launches.

## GT-041 — Дубльований launch/auth pipeline

- **Статус:** PARTIAL
- **Root cause:** bridge handoff, статичний MailApp overlay і повторний `setBootLoading()` показували однаковий connection screen.
- **Source fix:** hidden credentialless handoff, single-flight form submit, shared in-flight `boot()` Promise і відсутність boot overlay у звичайному validated launch.
- **Доказ:** launch contract `5/5`; native staging acceptance ще `UNVERIFIED`.

## GT-042 — Offline persistent cache

- **Статус:** PARTIAL
- Чинний bounded/versioned IndexedDB cache, LRU і account namespaces перевірені локально.
- Приватне читання лишається після server bootstrap/allowlist. Справжній offline private Inbox до bootstrap є `BLOCKED` без окремого device-bound unlock contract.

## GT-043 — Фоновий prefetch та incremental sync

- **Статус:** PARTIAL
- Warm list/thread stale-while-revalidate і Gmail History boundary вже існують у cumulative source.
- Closed-app Background Sync не заявляється: він залежить від Service Worker і не має універсальної WebView підтримки. Native arrival/prefetch trace лишається `UNVERIFIED`.

## GT-044 — Session/cache locking

- **Статус:** PARTIAL
- Cache namespaces fail closed за Telegram/Gmail connection IDs; storage warmup не читає приватних records.
- Device-bound unlock для показу приватного cache до server bootstrap не реалізований і потребує окремого security decision.

## GT-045 — Чернетки

- **Статус:** PARTIAL
- Локальний recovery, serialized autosave, stable draft operation IDs і Gmail readback contracts проходять локально.
- Cross-session/device continuation, offline conflict і native restart acceptance лишаються `UNVERIFIED`.

## GT-046 — Version-aware client update

- **Статус:** PARTIAL
- One-reload/no-loop source guard перевірений; новий source marker — v67 після preserved immutable v66.
- Реальний production transition не перевіряється до staging pass і не є підставою для автоматичного promotion.

## GT-047 — Multi-account cache isolation та switch

- **Статус:** CONFLICTING
- Локальні namespace/switch contracts проходять, але v66 staging не повернув UI marker із secondary до primary account.
- Promotion заборонений до native bidirectional switch acceptance без OAuth і без змішування зон.

## Рішення щодо staging v67 від 2026-07-23

- GT-040 продуктивність однієї секунди: PARTIAL. Коректні запуски кешованого представлення спостерігалися, але валідного нативного p95 trace немає.
- GT-041 дедуплікація launch/auth: PARTIAL. Код і автоматичні тести проходять, а коректні запуски не показують дубльованого екрана підключення; нативна single-flight telemetry ще потрібна.
- GT-042 offline cache: PARTIAL. Persistent storage існує, але приватні записи навмисно заблоковані до серверної перевірки акаунтів.
- GT-043 background prefetch: PARTIAL. Автоматичні контракти проходять; виконання після закриття WebView не заявляється.
- GT-044 блокування session/cache: PARTIAL. Allowlist gate збережено; device-bound offline unlock не реалізовано.
- GT-045 чернетки: UNVERIFIED у нативному staging acceptance.
- GT-046 version-aware update: PARTIAL. Контракти коду проходять; один контрольований production reload не перевірявся, оскільки v67 не просувався.
- GT-047 багатоакаунтна ізоляція: UNVERIFIED у нативному staging acceptance.
- Рішення: immutable v67 збережено, тимчасовий staging видалено, production v65 незмінний, promotion не виконувався.

### Примітка GT-040/GT-041 щодо acceptance tooling

- Статус: UNVERIFIED
- Chrome-авторизація Telegram Web і чат owner-бота працюють, але child surface Mini App не вдалося утримати для DOM або network inspection.
- Цей результат не можна використовувати для приписування regression production v65 або immutable v67.
- Не повторювати staging, доки content-free launch telemetry або підтримуваний child-target trace не надасть корельований результат time-to-interactive.

## Оновлення REQ-0035 для GT-040–GT-047

- **Дата:** 2026-07-23
- **Source request:** `REQ-0035`
- **Доказ:** [VR-017](verification-reports/reports/VR-017/README.md)
- Нові паралельні GT не створено: `GT-040–GT-047` уже є канонічними issues для восьми напрямів P0.

### GT-040 — ONE-SECOND warm-launch performance

- **Статус:** PARTIAL.
- Source candidate v68 додає content-free `warmLaunchUsableMs`, cache-hit і request counters, але native p95 `≤1000 ms` та десять контрольованих запусків ще `UNVERIFIED`.
- Попередні `898/431/409 ms` лишаються лише локальним baseline і не є production button-to-interactive доказом.

### GT-041 — Дубльований launch/auth pipeline

- **Статус:** PARTIAL.
- Підтверджені source root causes: дубльований static/runtime connection copy, помилковий виклик неіснуючого `p0OpenDatabase` замість `p0OpenDb` і можливість повторного boot після завершення першої Promise.
- Source fix: один порожній hidden boot host, settled single-flight guard, правильний storage warmup helper і account-scoped onboarding decision після `attentionState`.
- Local contracts проходять; нуль повторних екранів і нуль duplicate bootstrap у native staging ще `UNVERIFIED`.

### GT-042 — Offline persistent cache

- **Статус:** PARTIAL.
- Schema v2 має bounded budgets `480 records / 16 MiB / 45 days`, per-record cap, LRU і advisory persistent-storage request.
- Приватний offline Inbox до серверної перевірки лишається `BLOCKED`: plaintext token або Telegram signature у browser storage не допускаються.

### GT-043 — Фоновий prefetch та incremental sync

- **Статус:** PARTIAL.
- Додано bounded unread-first prefetch трьох thread bodies після появи UI; він не викликає `markRead` або mail mutation.
- Closed-WebView Background Sync не заявляється; native arrival/prefetch trace ще `UNVERIFIED`.

### GT-044 — Session/cache locking

- **Статус:** PARTIAL.
- Cache namespace тепер містить server-issued opaque HMAC scope Telegram owner та stable Gmail connection ID. Інший owner/account не проходить allowlist.
- Records іншого owner або тимчасово від’єднаного account залишаються заблокованими, а не видаються чи безумовно видаляються.
- Device-bound unlock до server bootstrap не реалізовано.

### GT-045 — Чернетки

- **Статус:** PARTIAL.
- Existing local recovery, serialized Gmail autosave, stable operation/draft IDs і conflict contracts не регресували у suite `526/526`.
- Native restart, offline/online recovery і підтверджене cross-device Gmail Draft continuation ще `UNVERIFIED`.

### GT-046 — Version-aware client update

- **Статус:** PARTIAL.
- Source marker v68, schema migration і one-reload/no-loop guards існують; historical immutable v67 не переписано.
- v68 ще не є immutable release і не просувався; production transition evidence відсутній.

### GT-047 — Multi-account cache isolation та switch

- **Статус:** PARTIAL.
- Owner/account namespace, poisoned-record rejection і deterministic switch contracts проходять локально.
- Native primary-secondary-primary switching, shared mode і cache lock/readback ще `UNVERIFIED`; новий OAuth не запускався.
