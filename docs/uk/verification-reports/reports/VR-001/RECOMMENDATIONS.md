# VR-001: рекомендації

[Звіт](README.md) | [Усі claims](CLAIMS.md) | [English](../../../../en/verification-reports/reports/VR-001/RECOMMENDATIONS.md)

Source request: `REQ-0004`.

Recommendation є збереженою пропозицією, а не доказом реалізації, standing instruction, permission або дозволом на нову Versie. Вона потрапляє до поточної roadmap лише через новий owner request.

| Claim | Статус | Рівень | Твердження |
|---|---|---|---|
| [KH-DEC-001](CLAIMS.md#kh-dec-001) | `recommendation` | `E2` | Оптимізувати поріг старту та малу наступну дію, а не обсяг обробленої пошти. |
| [KH-DEC-002](CLAIMS.md#kh-dec-002) | `recommendation` | `E1` | Мета - функціональний інбокс із низькою виконавчою вартістю, а не Inbox Zero. |
| [KH-DEC-003](CLAIMS.md#kh-dec-003) | `recommendation` | `E2` | Цифровий сервіс слід позиціонувати як допоміжний інструмент, а не заміну лікуванню або клінічну систему. |
| [KH-DEC-004](CLAIMS.md#kh-dec-004) | `recommendation` | `E2` | AI має оркеструвати тертя, енергію, час, сором і незавершений контекст, а не бути лише summarizer. |
| [KH-DEC-005](CLAIMS.md#kh-dec-005) | `recommendation` | `E1` | Функціональне полегшення важливіше за vanity KPI на кшталт кількості прочитаних листів. |
| [KH-DEC-006](CLAIMS.md#kh-dec-006) | `recommendation` | `E2` | Будувати продукт на відкритих стандартах і готовому open-source mail core; диференціюватися власними UI, AI та integration API. |
| [KH-DEC-007](CLAIMS.md#kh-dec-007) | `recommendation` | `E2` | Обирати Stalwart + власний web/mobile UX для modern-first B2C/B2B, Mailcow + custom frontend/BFF для швидкого MVP; orchestration layer лишати власним. |
| [KH-DEC-008](CLAIMS.md#kh-dec-008) | `recommendation` | `E2` | Не замінювати всі протоколи одним; застосувати fan-in/fan-out з одночасною підтримкою legacy і modern interfaces. |
| [KH-DEC-009](CLAIMS.md#kh-dec-009) | `recommendation` | `E2` | Для найкращого MVP time-to-value обрати Mailcow. |
| [KH-DEC-010](CLAIMS.md#kh-dec-010) | `recommendation` | `E2` | Для modern-first продукту обрати Stalwart через native JMAP/DAV та API-first configuration/control plane. |
| [KH-DEC-011](CLAIMS.md#kh-dec-011) | `recommendation` | `E2` | Для довгого корпоративного маршруту з максимальною контрольованістю розглядати Postfix + Dovecot, якщо є сильна ops-команда. |
| [KH-DEC-012](CLAIMS.md#kh-dec-012) | `recommendation` | `E2` | Apps Script використовувати як адаптер і control plane, а не повний data plane; важкі операції виносити назовні. |
| [KH-DEC-013](CLAIMS.md#kh-dec-013) | `recommendation` | `E2` | Базовий bridge будувати як Telegram Bot API + Mini App + власний backend + Gmail API; TDLib/user-account flow використовувати лише свідомо. |
| [KH-DEC-014](CLAIMS.md#kh-dec-014) | `recommendation` | `E2` | Для нових систем ставити Rspamd primary filter; SpamAssassin лишати для compatibility/legacy випадків. |
| [KH-DEC-015](CLAIMS.md#kh-dec-015) | `recommendation` | `E2` | MIME/PGP/S/MIME та E2E тримати окремим замінним capability layer і не включати до MVP без потреби. |
| [KH-DEC-016](CLAIMS.md#kh-dec-016) | `recommendation` | `E2` | DAV strategy: integrated DAV/JMAP у Stalwart/Cyrus або окремий Radicale/Baïkal/SabreDAV; у Mailcow роль виконує SOGo. |
| [KH-DEC-017](CLAIMS.md#kh-dec-017) | `recommendation` | `E2` | Побудувати єдиний integration facade над Gmail API, Microsoft Graph, Google People/Calendar та Telegram APIs замість provider logic у frontend. |
| [KH-DEC-018](CLAIMS.md#kh-dec-018) | `recommendation` | `E2` | Undo send реалізувати як grace window до фактичного надсилання, а не як відкликання після доставки. |
| [KH-DEC-019](CLAIMS.md#kh-dec-019) | `recommendation` | `E2` | Integration bus будувати як REST for commands і webhooks/SSE/pub-sub for events. |
| [KH-DEC-020](CLAIMS.md#kh-dec-020) | `recommendation` | `E2` | ADHD-friendly UI означає послідовність, менше cognitive load, ясні кроки, predictable navigation і distraction control, а не декоративну яскравість. |
| [KH-DEC-022](CLAIMS.md#kh-dec-022) | `recommendation` | `E2` | Цільова архітектура має бути гібридною: Gmail add-on, web app і зовнішній event/worker layer. |
| [KH-DEC-023](CLAIMS.md#kh-dec-023) | `recommendation` | `E2` | Не використовувати постійний Apps Script polling; застосувати `watch()` і `history.list` із checkpoint. |
| [KH-DEC-024](CLAIMS.md#kh-dec-024) | `recommendation` | `E2` | Не переносити весь inbox у Telegram; Mini Apps використовувати як dashboard/control, а не заміну Gmail UX. |
| [KH-DEC-025](CLAIMS.md#kh-dec-025) | `recommendation` | `E2` | Hardening має розділити secret management, state machine, ingress, Gmail operations і notifications. |
| [KH-DEP-002](CLAIMS.md#kh-dep-002) | `recommendation` | `E1` | Протокольний контракт має охоплювати SMTP, IMAP, POP3 та сучасні JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhooks і push. |
| [KH-DEP-005](CLAIMS.md#kh-dep-005) | `recommendation` | `E1` | GitOps для Mailcow має охоплювати `mailcow.conf`, `docker-compose.yml`, protected secrets/volumes, ingress, logs, SSO, observability, backups та integration service. |
| [KH-DEP-006](CLAIMS.md#kh-dep-006) | `recommendation` | `E1` | Базова domain authentication: SPF, DKIM, DMARC; ARC для forwarding/listserv; використовувати готові OpenDKIM/OpenDMARC/OpenARC/Rspamd implementations. |
| [KH-DEP-008](CLAIMS.md#kh-dep-008) | `recommendation` | `E1` | Для Node mail work використовувати ImapFlow, Nodemailer і PostalMime замість власного IMAP/SMTP/MIME implementation. |
| [KH-DEP-009](CLAIMS.md#kh-dep-009) | `recommendation` | `E1` | Redis використовувати для cache, coordination і short-lived jobs: delayed send, snooze, classification, OCR, retries, AI summaries та push fan-out. |
| [KH-DEP-010](CLAIMS.md#kh-dep-010) | `recommendation` | `E1` | Важкі та довготривалі операції мають виконуватися поза Apps Script. |
| [KH-DEP-012](CLAIMS.md#kh-dep-012) | `recommendation` | `E1` | Для сторонніх або open-source components слід вказувати точний repository, library або documentation source. |
| [KH-DEP-014](CLAIMS.md#kh-dep-014) | `recommendation` | `E1` | Pub/Sub і Cloud Run потрібні для `watch`, webhook ingress, heavy jobs, retries та idempotency. |
| [KH-DEP-020](CLAIMS.md#kh-dep-020) | `recommendation` | `E1` | Запропоновані `postal-mime`, `OpenPGP.js`, `Mailvelope`, `PKI.js` і RFC 8551. |
| [KH-INS-001](CLAIMS.md#kh-ins-001) | `recommendation` | `E2` | Інтерфейс повинен мати одну домінантну дію, стабільний контекст, низьку щільність, явний прогрес, зрозумілі пріоритети й точне повернення після переривання. |
| [KH-INS-002](CLAIMS.md#kh-ins-002) | `recommendation` | `E2` | Для кожного листа визначати одну візуально головну наступну дію. |
| [KH-INS-003](CLAIMS.md#kh-ins-003) | `recommendation` | `E2` | Використовувати нейтральну, підтримувальну й неосудливу мову. |
| [KH-INS-004](CLAIMS.md#kh-ins-004) | `recommendation` | `E2` | У фокус-режимі має бути не більше 3-4 первинних дій. |
| [KH-INS-005](CLAIMS.md#kh-ins-005) | `recommendation` | `E2` | WCAG 2.2 слід трактувати як мінімум, а COGA як стандарт якості для структури, фокусу, пам'яті, summaries, персоналізації, human help і контролю переривань. |
| [KH-INS-006](CLAIMS.md#kh-ins-006) | `recommendation` | `E2` | Focus mode має бути окремою інформаційною архітектурою з однією екранною задачею, а не косметичною темою. |
| [KH-INS-007](CLAIMS.md#kh-ins-007) | `recommendation` | `E2` | Система має мінімізувати втрату контексту та зберігати позицію, чернетку, тимчасову класифікацію, останню розмову й проміжні рішення. |
| [KH-INS-008](CLAIMS.md#kh-ins-008) | `recommendation` | `E2` | Персоналізація повинна бути адаптивною, сценарною та поступовою, з простими пресетами замість довгого налаштування. |
| [KH-INS-009](CLAIMS.md#kh-ins-009) | `recommendation` | `E2` | AI-summary має містити джерельні посилання, confidence indication і швидкий перехід до оригіналу. |
| [KH-INS-010](CLAIMS.md#kh-ins-010) | `recommendation` | `E2` | Візуальний режим має використовувати мало кольорів, один акцент, великі targets, видимий focus state і регульовану щільність. |
| [KH-INS-011](CLAIMS.md#kh-ins-011) | `recommendation` | `E2` | Не писати MTA, MDA або groupware з нуля; збирати продукт із готових серверних компонентів. |
| [KH-INS-012](CLAIMS.md#kh-ins-012) | `recommendation` | `E2` | Розділяти transport security, domain authenticity, content protection та abuse/phishing defense; застосувати TLS, MTA-STS, TLS-RPT і за DNSSEC також DANE. |
| [KH-INS-013](CLAIMS.md#kh-ins-013) | `recommendation` | `E2` | Не створювати власний mail server; інвестувати в UX, interoperability, privacy, AI triage та керовані ecosystem integrations. |
| [KH-INS-014](CLAIMS.md#kh-ins-014) | `recommendation` | `E1` | Використовувати logs, checkpoints, audit notes, test trails і lessons learned; не повторювати пройдені стадії без огляду. |
| [KH-INS-015](CLAIMS.md#kh-ins-015) | `recommendation` | `E1` | Послідовність роботи: product core, master prompt, implementation recipe, audit, operational cycle; capabilities перевіряти фактично. |
| [KH-INS-016](CLAIMS.md#kh-ins-016) | `recommendation` | `E1` | Агент має діяти як product architect, Workspace engineer, accessibility researcher, security reviewer і release engineer та створювати technical delivery program. |
| [KH-INS-017](CLAIMS.md#kh-ins-017) | `recommendation` | `E1` | Агент повинен видати секції A-R: architecture, UX, modules, scopes, OAuth, integrations, audit, build/debug/release plans, tests, backlog, patches і fallback paths. |
| [KH-INS-018](CLAIMS.md#kh-ins-018) | `recommendation` | `E1` | Для рекомендацій пояснювати problem, rationale і pitfalls; platform limits називати прямо та давати workaround. |
| [KH-INS-019](CLAIMS.md#kh-ins-019) | `recommendation` | `E2` | Якщо потрібна hybrid architecture з Apps Script, Cloud Run, Pub/Sub і Storage, її слід спроєктувати явно. |
| [KH-INS-020](CLAIMS.md#kh-ins-020) | `recommendation` | `E1` | Не приховувати tradeoffs, уникати vague advice і писати як delivery document для implementation team. |
| [KH-INS-021](CLAIMS.md#kh-ins-021) | `recommendation` | `E1` | Codex має бути керованим technical reviewer і executor verification protocol; browser/CDP/runtime capability підтверджувати перед use. |
| [KH-INS-022](CLAIMS.md#kh-ins-022) | `recommendation` | `E1` | Operational loop має бути mandatory і охоплювати actual UI, runtime та network behavior, а не лише code reading. |
| [KH-ISS-009](CLAIMS.md#kh-iss-009) | `recommendation` | `E2` | Basic auth не слід вважати надійним шляхом для Google/Microsoft; modern auth треба врахувати в onboarding, account linking і support. |
| [KH-LES-002](CLAIMS.md#kh-les-002) | `recommendation` | `E2` | `Action-only inbox` має залишати в inbox/unread лише те, що потребує дії; папки повинні бути широкими, а фільтри прибирати навіть невеликий регулярний шум. |
| [KH-LES-003](CLAIMS.md#kh-les-003) | `recommendation` | `E2` | Plain UI з текстом листа та трьома базовими діями корисніший за додаткові affordances і складні меню. |
| [KH-LES-004](CLAIMS.md#kh-les-004) | `recommendation` | `E2` | Техніки мікростарту мають зменшувати невизначеність і вимагати лише одного мінімального руху. |
| [KH-LES-005](CLAIMS.md#kh-les-005) | `recommendation` | `E2` | Не складати metadata, blobs, search і queues в одну БД; data plane має бути багатошаровим. |
| [KH-LES-007](CLAIMS.md#kh-les-007) | `recommendation` | `E0` | Frontend до стабільного mail core створює інтеграційну нестабільність; порядок робіт не слід інвертувати. |
| [KH-LES-008](CLAIMS.md#kh-les-008) | `recommendation` | `E2` | Time blindness, мотивацію та дофамін слід використовувати як design models, а не як єдине пояснення ADHD. |
| [KH-LES-010](CLAIMS.md#kh-les-010) | `recommendation` | `E2` | Apps Script web app має бути thin ingress; heavy synchronous work треба дробити або виносити назовні. |
| [KH-PERM-002](CLAIMS.md#kh-perm-002) | `recommendation` | `E2` | Майбутній Telegram surface має дозволяти лише явно обрані дії: priority view, summary, quick reply, task confirmation, snooze і triage; це product-scope candidate, не дозвіл власника. |
| [KH-PLAN-001](CLAIMS.md#kh-plan-001) | `recommendation` | `E1` | Впровадження має бути еволюційним, а не `big bang`. |
| [KH-PLAN-006](CLAIMS.md#kh-plan-006) | `recommendation` | `E1` | Mailcow deployment: clone, `generate_config.sh`, редагування `mailcow.conf`, `docker compose pull/up`; production-хост має уникати MTU, port і host-service конфліктів. |
| [KH-PLAN-007](CLAIMS.md#kh-plan-007) | `recommendation` | `E1` | Для Stalwart виділити persistent store, обрати backend, пройти bootstrap і налаштувати domains, TLS, rate limits, spam policy та management API. |
| [KH-PLAN-009](CLAIMS.md#kh-plan-009) | `recommendation` | `E1` | Single-node/MVP: Stalwart + RocksDB або default Mailcow, file/S3 blobs, Redis ephemeral state і базовий search стека. |
| [KH-PLAN-010](CLAIMS.md#kh-plan-010) | `recommendation` | `E1` | Mid-scale/multi-tenant: PostgreSQL metadata, S3/MinIO blobs, Redis locks/queues/rate/session/cache та окремий search backend за потреби. |
| [KH-PLAN-012](CLAIMS.md#kh-plan-012) | `recommendation` | `E1` | Етап 1: зафіксувати protocol contract, обрати core, підняти reference deployment з SPF/DKIM/DMARC/MTA-STS/TLS-RPT, backups, logs і monitoring, потім API/BFF і clients. |
| [KH-PLAN-015](CLAIMS.md#kh-plan-015) | `recommendation` | `E1` | Quick MVP stack: Mailcow core, Roundcube/custom web shell, bundled Rspamd, integration service, Redis jobs, ADHD shell та AI triage. |
| [KH-PLAN-016](CLAIMS.md#kh-plan-016) | `recommendation` | `E1` | Long modern stack: Stalwart core, Bulwark як reference/temporary client, own orchestration, PostgreSQL/scale backend, S3/MinIO, Redis, custom clients. |
| [KH-PLAN-017](CLAIMS.md#kh-plan-017) | `recommendation` | `E1` | Predictability stack: Postfix + Dovecot + Rspamd + OpenDKIM/OpenDMARC/OpenARC + Roundcube + optional DAV server; найбільше integration work. |
| [KH-PLAN-026](CLAIMS.md#kh-plan-026) | `recommendation` | `E1` | CI/CD має використовувати protected `CLASPRC_JSON` і `.clasp.json` у GitHub Actions без включення credential value в repository. |
| [KH-PLAN-032](CLAIMS.md#kh-plan-032) | `recommendation` | `E1` | Додати GitHub CodeQL. |
| [KH-PLAN-033](CLAIMS.md#kh-plan-033) | `recommendation` | `E1` | Увімкнути secret scanning із першого дня. |
| [KH-PLAN-034](CLAIMS.md#kh-plan-034) | `recommendation` | `E1` | Додати Dependabot для dependency alerts та updates. |
| [KH-PLAN-035](CLAIMS.md#kh-plan-035) | `recommendation` | `E1` | CI має включати lint, manifest validation, dry-run push, staging smoke test і separate security lane. |
| [KH-PLAN-037](CLAIMS.md#kh-plan-037) | `recommendation` | `E2` | Першим перевірити `appsscript.json`: Gmail scopes, `script.external_request`, triggers, capability boundaries і separation add-on/web app. |
| [KH-PLAN-038](CLAIMS.md#kh-plan-038) | `recommendation` | `E2` | Перевірити code і Git history на hardcoded secret classes, direct webhook URLs, private identifiers у fixtures і full request/response logging. |
| [KH-PROD-022](CLAIMS.md#kh-prod-022) | `recommendation` | `E1` | Модульна траєкторія: Postfix + Dovecot + окремі antispam, DKIM/DMARC/ARC, webmail і DAV-компоненти. |
| [KH-PROD-023](CLAIMS.md#kh-prod-023) | `recommendation` | `E1` | Інтегрована container-траєкторія: Mailcow або Docker Mailserver для швидкого запуску з меншим glue-code. |
| [KH-PROD-024](CLAIMS.md#kh-prod-024) | `recommendation` | `E1` | All-in-one траєкторія: Stalwart, а в окремих сценаріях Maddy або Apache James; Stalwart є modern-first кандидатом. |
| [KH-PROD-025](CLAIMS.md#kh-prod-025) | `recommendation` | `E1` | Додати Thunderbird autoconfig XML і стежити за IETF auto-configuration для зменшення onboarding friction. |
| [KH-PROD-034](CLAIMS.md#kh-prod-034) | `recommendation` | `E1` | Postfix `postscreen` є рекомендованим first perimeter layer до content filtering. |
| [KH-PROD-035](CLAIMS.md#kh-prod-035) | `recommendation` | `E1` | Webmail candidates: Roundcube для classic/plugin IMAP, SnappyMail для lightweight UI, Nextcloud Mail для suite integration, Bulwark для JMAP/Stalwart. |
| [KH-PROD-036](CLAIMS.md#kh-prod-036) | `recommendation` | `E1` | Delivery clients: web/PWA + service workers/VAPID, React Native або Flutter + APNs/FCM, Tauri або Electron для desktop. |
| [KH-PRV-002](CLAIMS.md#kh-prv-002) | `recommendation` | `E2` | GDPR/ePrivacy controls мають включати encryption, access control, audit logs, minimization, contracts, retention, export/delete, breach response і residency. |
| [KH-PRV-003](CLAIMS.md#kh-prv-003) | `recommendation` | `E2` | Open tracking не вмикати за замовчуванням для EU-sensitive use cases; додати legal gating, preference center, granular opt-in і розділення delivery/marketing telemetry. |
| [KH-PRV-004](CLAIMS.md#kh-prv-004) | `recommendation` | `E2` | Least privilege, чіткі межі даних, мінімальне вилучення body та раннє планування verification boundary є архітектурними вимогами. |
| [KH-PRV-005](CLAIMS.md#kh-prv-005) | `recommendation` | `E2` | Credentials не зберігати в коді; secrets тримати у properties або external vault; logs редагувати щодо addresses, headers і token fragments. |
