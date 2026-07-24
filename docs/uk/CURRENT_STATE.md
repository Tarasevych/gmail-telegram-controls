# Поточний стан

[English](../en/CURRENT_STATE.md)

<!-- release-state: production=v65; candidate=v65; staging=0; status=VERIFIED; as-of=2026-07-23 -->

## Канонічний стан випуску

- **Versie:** Versie 1.
- **Production:** Apps Script immutable v65, `VERIFIED`.
- **Accepted release HEAD:** точний cumulative v65.
- **Активні staging deployments:** `0`.
- **Останній release journal:** v70 terminal `abandoned`; журнал прийнятого production v65 історично лишається `cleaned`.
- **Release source boundary:** прийнятий cumulative v65 source `3373ca4aa403a28f3252ad72fbe65310b318c53c`; source merge v70 `0666165b614f430103530728aa45349083db5e78`; release-asset merge v70 `70cc87ebf2a9c06b000e042e1e676838cf27d6b2`.
- **Rollback:** exact immutable v64 лишається доступним; historical immutable v56, v57, v59, v62, v66-v70 збережені та не переписані.
- **Telegram menu:** production `📬 Пошта · Versie 1`.

## Перевірений acceptance v65

- Source і release-marker contracts пройшли `14/14`; pre-release cumulative suite пройшов `505/505`.
- Helper contracts v65 пройшли `2/2`, cumulative release suite `507/507`; signed bridge phase пройшла `4/4` і `509/509`.
- Один `StageOnly` створив immutable v65 та один owner-only staging deployment. Bounded read-after-create propagation fix прийняв цей exact deployment без повторного `deployments.create`.
- Native Telegram Desktop staging завантажив mailbox і avatar, показав рівно три isolated Gmail roots та перемкнувся на secondary account і назад без OAuth.
- Один promotion просунув v64 до v65. Два fresh production launches завантажили primary mailbox, cleanup видалив staging, а final preflight підтвердив stable/HEAD v65 і journal `cleaned`.
- Post-cleanup worker telemetry показала повні успішні stage traces з `errorCode=none`. Process shell тривалістю 64.611 секунди наклався на наступний trigger приблизно на п'ять секунд, але наступне виконання записало лише `gmail_timer_worker_skip: lease_active`; simultaneous worker work було відхилено.

## Відкриті межі доказів

- `GT-031` і `GT-037` лишаються `VERIFIED`; production v65 і release cleanup мають статус `VERIFIED`.
- `GT-032`–`GT-036` лишаються `PARTIAL`. Automatic reload transition v64-to-v65 неможливо довести, бо сам parser v64 пропускав canonical manifest field.
- Direct Apps Script Processes API повернув `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT`; scope expansion, OAuth cycle або migration default GCP project не виконувалися.
- `GT-039` має статус `BLOCKED`: production v65 пропускає `INBOX+SENT`, тоді як current source доставляє його один раз. `REQ-0009`/`REQ-0019` і пізніший `GT-039` задають суперечливі self/alias semantics; до прямого owner decision цей source delta не входить до production candidate. Доказ: `VR-025`.
- 15-хвилинний History gate verified automated contract; live stage trace не показує due-versus-skip decision, тому dedicated runtime cadence лишається `UNVERIFIED`.
- `GT-038` лишається `PARTIAL` для Telegram Web; той самий signed release пройшов у native Telegram Desktop.

## Докази й навігація

- [Детальний звіт про v65](reports/VERSIE_001_V65_RELEASE_CANDIDATE_2026-07-23.md)
- [Verification production client VR-014](verification-reports/reports/VR-014/README.md)
- [Verification доставки SENT+INBOX VR-015](verification-reports/reports/VR-015/README.md)
- [Історичний звіт про v63 і закриття GT-030](reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)
- [Cumulative історія випуску Versie 1](releases/VERSIE-001-2026-07-19.md)
- [Machine-readable release state](../release-state.json)

## P0 ONE-SECOND boundary — 2026-07-23

- Production і release-state stable залишаються immutable v65; owner menu залишається на production.
- Immutable v66–v69 збережені історично; v69 завершився fail-closed як `abandoned` після native hard-reload/session conflict і не був promoted.
- Source v70 merged normal PR на SHA `0666165b614f430103530728aa45349083db5e78`; immutable v70 створено рівно один раз, один раз перевірено та збережено історично.
- Локальні gates після release assets: helper `3/3`, bridge contracts `4/4`, cumulative suite `572/572`, Python menu syntax і `git diff --check` pass.
- Source v70 додає content-free SecureStorage classification, fail-closed locked state без restart-loop і перевірюваний bridge-to-usable timing; nonce replay protection не послаблено.
- Native v70 відкрив mailbox без нового OAuth cycle або повторного connection screen, відновив cached thread і показав avatar та три isolated Gmail roots. Перемикання на secondary root повернуло generic mail-operation error.
- Fresh production v65 launch повернув той самий generic error ще до mailbox. Його executions `doPost`, `mailboxRedeemLaunch` і `mailboxRpc` завершилися, а сусідній timer trace впав у `legacy_recovery` з `errorCode=urlfetch_quota` та Apps Script daily `urlfetch` quota exception. Отже candidate-specific regression v70 не доведена.
- Production promotion не виконано. Menu повернуто на production, exact staging deployment v70 видалено journal-bound helper, active staging `0`, journal v70 terminal `abandoned`.
- Native button-to-interactive p95, десять запусків, hard reload, offline private Inbox, exact Windows SecureStorage recovery і bidirectional account switching залишаються `UNVERIFIED`/`BLOCKED`; повторний A/B відкладено до відновлення зовнішньої добової квоти.
- Канонічні докази: [VR-016](verification-reports/reports/VR-016/README.md), [VR-023](verification-reports/reports/VR-023/README.md).

## Межа P0 acceptance v67 від 2026-07-23

- Production і HEAD залишаються на immutable v65.
- Immutable v67 збережено як історичний доказ; його точний тимчасовий staging deployment видалено.
- Дубльовану видиму послідовність запуску/підключення виправлено у v67 та якісно підтверджено під час коректних запусків у Telegram Desktop.
- P95 однієї секунди, offline unlock приватної пошти, відновлення чернеток і двостороннє багатоакаунтне перемикання не мають статусу VERIFIED; тому v67 не просувався.
- VR-016 є авторитетним доказовим записом цієї acceptance-межі.

## REQ-0037 P0-A source contour - 2026-07-24

- **Статус:** `PARTIAL`; лише source evidence.
- Cross-document launch ownership тепер використовує `navigator.locks` і expiring content-free IndexedDB lease fallback. Звичайний validated launch лишається без overlay; release reload очікує mutation quiescence і використовує лише `p0-release-reload` у `sessionStorage`.
- Server issuance/redemption тепер використовують один `ScriptLock`-backed canonical claim ledger з HMAC owner/route scopes, deterministic 60-second nonce lifetime, 11-minute tombstones, максимумом 100 записів і без secrets або identifiers.
- Підтверджена історична першопричина: issuance та redemption були розділені між state paths.
- Source evidence: focused `37/37`; повний Apps Script suite `668/668` за `24.229s`; baseline `1d5fb8352ea62f7b25d6980312f277060ce4d0ae`.
- Production і staging не змінювалися; mailbox mutation не виконувалася. Native p95, ten-launch acceptance, offline private device-bound unlock, POST-Redirect-GET, incremental Gmail History, Service Worker/Background Sync, staging і production лишаються unverified або blocked через shared URL Fetch quota та `T-03`.
- Записи: чинні `GT-040-GT-047`, `GT-051`, `GT-053`, `GT-054`; нові `GT-067`, `B1-47`, `RCA-023`, `VR-042`.

## REQ-0037 P0-B History contour - 2026-07-24

- **Статус:** `PARTIAL`; source evidence only.
- Безумовний full-list background poll замінено на exact-connection Gmail History delta. No-change cycle не виконує повторний list/thread RPC.
- History cursor зберігається як decimal opaque string у чинному Telegram-owner + Gmail-connection IndexedDB namespace; secrets, OAuth tokens і Telegram signatures туди не записуються.
- Missing/stale cursor, 404 і bounded page overflow fail-closed переводять цикл у повну reconciliation. Складний query/shared view при реальній зміні поки також використовує bounded full list.
- Source evidence: focused `30/30`; повний Apps Script suite `673/673` за `25.763s`; baseline `28b438e68e1b327308761c246e074558b7ccd53d`.
- Runtime, staging і production не змінювалися; Gmail/Telegram mutation або OAuth не виконувалися. Live request metrics, native multi-account acceptance та entity-level query membership лишаються `UNVERIFIED`; release gate лишається `BLOCKED` shared URL Fetch quota і `T-03`.
- Записи: `GT-068`, `B1-48`, `RCA-024`, `VR-043`.

## REQ-0037 P0-C entity contour - 2026-07-24

- **Статус:** `PARTIAL`; source evidence only.
- Simple single-account Inbox тепер застосовує History delta через bounded metadata-only `threadSummaries`: new/relabelled/missing rows змінюються без повного list RPC і без заміни cached body.
- History event type відрізняє message change від label-only change; selected body повторно читається лише для message event.
- Safety boundary: максимум 20 exact IDs, viewer-only account access, explicit missing set, stable timestamp order, page-capacity bound та foreign-account isolation.
- Focused evidence `35/35`; повний Apps Script suite `678/678` за `25.414s`; baseline `7bd8270b2e14525dc8e99bd95387a1ef977dde1a`.
- Shared/query/filter/custom-label/oversized/incomplete paths лишаються на full-list fallback. Live Gmail, native Telegram, staging і production не перевірялися; release blockers не змінені.
- Записи: `GT-069`, `B1-49`, `RCA-025`, `VR-044`.

## REQ-0037 P0-D cache-lock contour - 2026-07-24

- **Статус:** `PARTIAL`; source evidence only.
- Persistent mail records тепер мають explicit locked/unlocked lifecycle; low-level IndexedDB reads/writes відхиляються до verified session bootstrap.
- Exact owner scope і connected-account set перевіряються при кожному з п’яти bootstrap paths; account reset і confirmed sign-out очищають private memory та DOM без видалення retained records.
- Focused evidence `48/48`; повний Apps Script suite `685/685` за `26.020s`; baseline `8c01143411e20f96b7ec4fc885dd1898ac2e4bbb`.
- IndexedDB records ще не encrypted at rest, а offline device-bound unlock не реалізовано; native Telegram, staging і production не перевірялися, release blockers не змінені.
- Записи: `GT-070`, `B1-50`, `RCA-026`, `VR-045`.

## REQ-0037 P0-E encrypted-cache contour - 2026-07-24

- **Статус:** `PARTIAL`; source evidence only.
- Persistent cache schema 3 шифрує private values через AES-256-GCM; metadata AAD запобігає перестановці ciphertext між records.
- Content key зберігається лише в Telegram `SecureStorage`; browser storage не отримує key, OAuth token, refresh token або `initData`.
- Upgrade очищає incompatible schema-2 plaintext cache. Focused evidence `55/55`; повний Apps Script suite `692/692` за `23.540s`; baseline `6f8a357e1a650639c3a16f9d6c7601d89817e3fe`.
- Native target-device key persistence, offline encrypted bootstrap, staging і production не перевірялися; release blockers не змінені.
- Записи: `GT-071`, `B1-51`, `RCA-027`, `VR-046`.

## P0-F encrypted offline bootstrap

- **Статус:** `PARTIAL`; source evidence only.
- Verified online session зберігає encrypted 35-day bootstrap snapshot без session/OAuth secrets; Telegram SecureStorage owner key та AES-GCM AAD прив’язують його до exact owner namespace.
- Лише transient network failure може відкрити read-only retained cache; RPC і mutations блокуються до verified online recovery.
- Focused evidence `33/33`; повний Apps Script suite `701/701` за `25.944s`; baseline `2bd7eb52d2f3297929c24c12d8ccbb4611699b84`.
- Fresh offline document navigation, native target-device acceptance, staging і production не перевірялися; shared URL Fetch quota та `T-03` release blockers не змінені.
- Записи: `GT-072`, `B1-52`, `RCA-028`, `VR-047`.

## P0-G conflict-safe Gmail Drafts update

- **Статус:** `PARTIAL`; source evidence only.
- Canonical Gmail draft DTO тепер містить opaque `serverVersion`; encrypted recovery та save payload зберігають exact expected version для account-bound draft.
- Existing-draft update fail closed без 43-символьної version, перевіряє canonical server state двічі до `PUT` і при mismatch повертає read-only conflict. UI зупиняє retry та вимагає явного вибору локальної або Gmail-версії.
- Focused evidence `258/258`; повний Apps Script suite `707/707` за `23.349s`; baseline `9b00a335c0016c439a463233b67a16e1499b7222`.
- Gmail API не документує atomic revision/ETag precondition, тому вузька TOCTOU-гонка між другим read і update лишається. Authenticated multi-session, staging і production не перевірялися; release blockers не змінені.
- Записи: `GT-073`, `B1-53`, `RCA-029`, `VR-048`.
