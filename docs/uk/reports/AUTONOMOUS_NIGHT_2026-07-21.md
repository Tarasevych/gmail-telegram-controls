# Звіт про завершення автономної нічної роботи - 2026-07-21

Source request: `REQ-0025`  
Статус checkpoint: **complete_with_blockers**  
Межа доказів: **2026-07-21 23:22 +02:00 (Europe/Brussels)**
Канонічний репозиторій: `Tarasevych/gmail-telegram-controls`

## Підсумковий результат

Усю незалежну роботу, яка лишалася безпечно досяжною без зміни production, повторного OAuth, витрачання вичерпаної Apps Script quota або створення недозволеного immutable, завершено й збережено. GitHub лишається канонічним. Перевірені refs дзеркалено до приватного GitLab звичайними non-force push.

Лишаються два незалежні gates:

1. Apps Script daily `URLFETCH` quota має відновитися до продовження контрольованого live A/B acceptance.
2. Власник має прямо дозволити наступний immutable, перш ніж ізольований Advanced Gmail source candidate отримає новий hash-pinned release helper, повністю зелений suite, merge або deployment.

Production не залишено на неперевіреному candidate.

## Requirement-by-requirement audit

| Вимога | Статус | Доказ і обмеження |
|---|---|---|
| Read-only Git/worktree audit | verified | Канонічний `main` є `660bc6a52e949925f1855dcaaf79ac5de9b2d188`; request і source-candidate worktrees чисті; Stage 1 audit не знайшов незавершеної Git operation. |
| GitHub PR та Actions audit | verified | Відкритим лишається тільки draft PR [#11](https://github.com/Tarasevych/gmail-telegram-controls/pull/11). Main knowledge-hub, bilingual, verification-report і Pages runs зелені. |
| Приватне recovery mirror | verified | GitHub і приватний GitLab мають однакові hashes для `main`, `Запити` і `fix/versie-001-owner-gmail-read-adapter`; GitHub лишається єдиним source of truth. |
| Process cleanup | verified | Не залишилося створених цією роботою тимчасових Git, Node, Python, verification, watcher або browser diagnostic processes. Сторонні TCK jobs і production controls не змінювалися. |
| Research corpus audit | verified | Три deep-research reports було hashed і classified під час Stage 1; sanitized результат містить [Stage 1 continuation audit](../verification-reports/reports/VR-004/STAGE_1_CONTINUATION_AUDIT.md). |
| Clean baseline | verified | Чистий main Apps Script/product suite пройшов `444/444`; парні documentation і factual-report validators пройшли; tracked secret-signature scan не знайшов файлів. |
| Request/schema failures | verified complete | Canonical template/parser, route diagnostics, regression fixtures, bilingual checks і LF/CRLF-stable report hashing уже зелені. Historical failed runs не класифікувалися як поточні failures. |
| Gmail primary-source compatibility | verified у static scope | Official Google documentation і project token boundaries показують, що wholesale Advanced Gmail migration порушить isolation зовнішніх connections; безпечно тестувати лише owner-lane adapter. Runtime quota reduction не перевірено. |
| Owner-only Advanced Gmail adapter | partial | Commit [`0b0c361a7edf0cdca2099090fe0d5c25185e63f8`](https://github.com/Tarasevych/gmail-telegram-controls/commit/0b0c361a7edf0cdca2099090fe0d5c25185e63f8) додає protected allowlisted adapter. Targeted tests проходять `8/8`; повний suite навмисно заблоковано на `451/452` immutable v57 hash gate. Draft PR #11 не можна merge або deploy. |
| Production/staging A/B | blocked | Свіже execution знову завершилося daily `urlfetch` quota exception. Подальший quota-consuming launch або retry loop не виконувався. |
| OAuth/fresh account acceptance | unverified | Повторний OAuth, new Google consent, CAPTCHA, OTP, passkey або Gmail mutation не виконувалися. Existing sessions не доводять fresh consent чи second-account fan-out. |

## Розбіжності з початковим handoff

| Твердження handoff | Перевірений поточний стан |
|---|---|
| Main був приблизно `23927148...` | Main просунувся normal PR до `660bc6a52e949925f1855dcaaf79ac5de9b2d188`. |
| Request branch був щонайменше `ed21a2d...` | `Запити` є `c5683e5f6a17918cfc308837213fc5c33537d823` після `REQ-0025`. |
| PR #5 і #6 могли бути open | Вони більше не open; відкритий лише draft PR #11. |
| Local baseline був `441/441` | Clean-main baseline є `444/444`; ізольований candidate додає вісім тестів і має `451/452`, бо release hash gate правильно його блокує. |
| Safe runtime був v55 із preserved staging v56 | Runtime пізніше зберіг immutable v56 як history і один owner-only staging v57, тоді як stable production лишився v55. |

## Commits і branches

| Призначення | Ref | Результат |
|---|---|---|
| Stage 1 factual continuation evidence | PR #9 / `fcbceb63e61da2e94e189743959654bffd6098b3` | normal merge |
| Official Advanced Gmail compatibility evidence | PR #10 / `660bc6a52e949925f1855dcaaf79ac5de9b2d188` | normal merge; current main |
| Owner-only adapter request | `REQ-0024`, request commits `c7dfdb6` і `82e3d24` | recorded, потім blocked з evidence |
| Owner-only adapter source | branch `fix/versie-001-owner-gmail-read-adapter`, commit `0b0c361a7edf0cdca2099090fe0d5c25185e63f8` | збережено в draft PR #11; не merged |
| Completion report request | `REQ-0025`, commit `c5683e5f6a17918cfc308837213fc5c33537d823` | recorded; request workflows green |

## Test і CI evidence

| Gate | Результат |
|---|---|
| Clean main Apps Script/product tests | `444/444` passed |
| Advanced Gmail adapter targeted tests | `8/8` passed |
| Advanced Gmail candidate full suite | `451/452`; failed лише exact immutable v57 source-hash contract |
| Bilingual validator | `50/50` UK/EN page pairs до цього report; цей report додає один paired path |
| Knowledge hub validator | 17 language pairs, 295 source IDs, 245 canonical items, 8 explicit conflicts |
| Verification-report validator | passed: VR-001 245 claims і VR-003 32 claims |
| Request ledger | 25 indexed requests пройшли до implementation цього report |
| Privacy checks | `diff --check` і secret-signature scans passed; protected values не публікувалися |

Relevant successful main runs:

- [Knowledge hub 29866782044](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29866782044)
- [Bilingual documentation 29866782042](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29866782042)
- [Verification reports 29866782162](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29866782162)
- [Pages 29866781002](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29866781002)

## Runtime і release boundary

| Surface | Перевірений стан |
|---|---|
| Product | Versie 1 |
| Stable production | Apps Script immutable v55 |
| Immutable history | v56 збережено |
| Owner-only staging | один v57 deployment збережено |
| Telegram menu | production target |
| Trigger | один minute `checkNewMail_`; не змінено |
| Release journal | staging-verified state збережено; promotion у цій фазі не виконувався |
| Advanced Gmail flag | unset; runtime behavior не змінено |
| Final read-only preflight | пройшов о 23:22: stable v55, HEAD `stable_v55`, один staging, zero legacy staging, journal `staging_verified`, exact immutable v57 hashes |

Останнє перевірене failed execution о 22:49:14 завершилося в `gmailApiRequest_` через notification scan path exact daily `urlfetch` quota exception. Це доводить shared external blocker, а не v57-specific regression.

## Crash Report 1 - Apps Script quota

| Поле | Значення |
|---|---|
| Timestamp | 2026-07-21 22:49:14 +02:00 |
| Subsystem | Apps Script minute worker / Gmail API transport |
| Sanitized error | `Exception: Service invoked too many times for one day: urlfetch` |
| Attempted action | Read-only inspection latest failed worker execution після збереження production v55 |
| Одна альтернатива | Зупинено live retries і продовжено official-source compatibility analysis та isolated local adapter |
| Evidence locator | Apps Script Executions; `REQ-0024`; local recovery checkpoint |
| Preserved state | production v55, historical v56, один owner-only staging v57, Telegram menu на production |
| Retry condition | Daily quota recovery, підтверджене двома clean production v55 launches |
| Потрібна ручна дія | Немає негайної account action; чекати external recovery |
| Safe next action | Не витрачати quota; лишити blocker open і продовжити local/documentation work |

## Crash Report 2 - immutable release contract

| Поле | Значення |
|---|---|
| Timestamp | 2026-07-21 23:00 +02:00 |
| Subsystem | Versie 1 release hash-pinning test |
| Sanitized error | Поточний `Code.gs` hash `685aa67...` відрізняється від immutable v57 pinned hash `5c609754...` |
| Attempted action | Full local suite після додавання feature-flagged owner-only adapter |
| Одна альтернатива | v57 збережено без змін, gate задокументовано, source pushed лише до isolated branch і draft PR |
| Evidence locator | `apps-script/tests/release_versie_001_20260719.test.js`; draft PR #11 |
| Preserved state | v57 helper та immutable history без змін; source commit збережено як `0b0c361...` |
| Retry condition | Прямий owner authorization для наступного immutable і новий exact hash-pinned helper |
| Потрібна ручна дія | Так, explicit next-immutable authorization |
| Safe next action | Лишити PR #11 draft і unmerged |

## Manual gates

- CAPTCHA, OTP/2FA, passkey, biometric, hardware key, payment або new Google consent gate під час цього continuation не відкривалися.
- Account identity або Gmail/Telegram zone не вгадувалися.
- Remaining manual decision є release governance, а не authentication.

## Незавершені blockers

- `GT-023/GT-024`: external daily `URLFETCH` recovery і controlled v55-to-staging A/B.
- `GT-026`: source adapter локально isolated, але не може merge або deploy під immutable v57 hash contract.
- Fresh Google account consent/callback і independent second-account realtime fan-out лишаються unverified.

## Одна рекомендована наступна дія

Власник має прямо дозволити наступний immutable у межах Versie 1. Після цього створити новий cumulative hash-pinned helper без переписування v56/v57, повернути повністю green local suite і лише після quota recovery пройти чинний staging A/B gate до будь-якого production promotion.

## Privacy boundary

Цей report не містить mail content, private email address, OAuth token, authorization code, cookie, Telegram `initData`, chat/user identifier, deployment identifier або secret property value.
