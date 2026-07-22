# Реєстр знайдених проблем

Оновлено: **2026-07-22**. Статуси: `Відкрита`, `В роботі`, `Заблокована`, `Вирішена локально`, `Перевірена staging`, `Розгорнута production`, `Перевірена production`.

| ID | Статус | З Versie | Проблема | Рішення / наступний доказ |
|---|---|---:|---|---|
| GT-001 | Вирішена і перевірена production v57 | 1 | Один лист надходить у Telegram двічі | `INBOX+SENT` self/alias копії повністю пропускаються і фіксуються як seen. Чистий external `INBOX` marker автоматично створив рівно одну картку; після двох `/check` Telegram містив один marker list item |
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
| GT-027 | Інтегрована в immutable v58; staging acceptance заблокований | 1 | Sidebar і profile manager мали різні label state/render paths, не мали узгоджених create/manage controls і ламали довгі назви | Shared USER/SYSTEM renderer, доступні create/rename/delete controls, full-path nesting, bounded scroll і account isolation пройшли cumulative tests; live label UI не прийнято, бо mailbox bootstrap зупинився на GT-028 |
| GT-028 | PARTIAL; immutable v59 staged; acceptance pending | 1 | Launcher зберігав одноразовий thread route у Telegram WebView history, а невдалий automatic open лишав reader у error-state без повернення до вже завантаженого списку | Fix merged через PR #20; exact v59 source/helper merged через PR #21. Immutable v59 і один owner-only staging створені, production лишається v57; live acceptance ще `UNVERIFIED`. |
| GT-029 | Вирішена локально та перевірена CI | 1 | Root README називав v37 поточним production, хоча verified runtime працював на v57, створюючи конфлікт для людей і recovery-агентів | `docs/release-state.json`, парні CURRENT_STATE сторінки та Release state CI синхронізують canonical mutable state; runtime source audit не знайшов читання GitHub Markdown ботом, тому це не runtime root cause. Source request: `REQ-0031` |

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

- **Статус:** PARTIAL — інтегровано в immutable v58; staging acceptance заблокований GT-028.
- **Дата:** 2026-07-22
- **Запит:** [REQ-0026](https://github.com/Tarasevych/gmail-telegram-controls/blob/%D0%97%D0%B0%D0%BF%D0%B8%D1%82%D0%B8/requests/2026-07-22/REQ-0026-unified-gmail-label-management.md)
- **Першопричина:** VERIFIED — профільний список резервував ширину для кількох постійно видимих дій, sidebar не мав create/manage controls, а два представлення залежали від різних зрізів стану. Під час acceptance також виявлено спливання click до глобального close-handler і стискання implicit CSS-grid rows до 44 px.
- **Виправлення:** VERIFIED локально у [коміті 4ac0b90](https://github.com/Tarasevych/gmail-telegram-controls/commit/4ac0b90fbdbe7c9032789da1734bb986795fab91): спільний state/render path, `+` біля заголовка, одна доступна pencil-action для кожної USER-мітки, progressive disclosure, bounded scroll, нормалізація вкладеного повного шляху, захист SYSTEM-міток, permission/retry states і синхронне оновлення обох поверхонь.
- **Перевірка:** VERIFIED локально — фінальний UI contract `84/84`; cumulative v58 suite `460/460`; 390×760 і 1280×820 з 48 synthetic labels не мають горизонтальних або вертикальних перекриттів.
- **Release boundary:** PARTIAL — cumulative immutable v58 і один owner-only staging створені за REQ-0028; production promotion BLOCKED через GT-028.
- **Production:** UNVERIFIED — зміни не розгорнуті.
- **Звіт:** [VR-005](verification-reports/reports/VR-005/README.md)
- **English mirror:** [docs/en/ISSUES.md](../en/ISSUES.md)

## GT-028 — Застарілий automatic thread route у Telegram Mini App

- **Статус:** PARTIAL — першопричина VERIFIED; source fix підготовлено, live release UNVERIFIED.
- **Дата:** 2026-07-22.
- **Фактичне уточнення:** окреме вікно production v57 успішно завантажило avatar, Inbox і реальний список листів; у Telegram також був свіжий доставлений notification. Отже попередня локалізація «до server handler» не підтвердилася.
- **Першопричина:** VERIFIED — GitHub Pages launcher передавав hash route у POST, але зберігав той самий route у history Telegram WebView. `openThread()` перехоплював failure автоматичного deep-link, показував reader error і не очищав selection/route, тому fresh menu launch повторював stale thread.
- **Source fix:** REQ-0029 робить hash одноразовим, а automatic initial/hash/resume open у разі failure очищає reader і показує вже завантажений list. Manual message selection зберігає error і `Повторити`.
- **Локальні докази:** targeted bridge/route suite `238/238`; усі non-release tests `440/440`; bilingual, knowledge-hub і verification validators пройшли. Повний release suite fail-closed лише на двох очікуваних immutable hash guards, бо змінений source навмисно не відповідає історичним v57/v58 pins.
- **Release boundary:** production лишається exact v57; immutable v58 та один staging збережені; v59/deployment/promotion не дозволені цим запитом.
- **Звіт:** [VR-006](verification-reports/reports/VR-006/README.md). Source request: `REQ-0029`.
- **English mirror:** [docs/en/ISSUES.md](../en/ISSUES.md)
