# REPORT-2 source dossier

[Home](../README.md) | [Roadmap](../MASTER_ROADMAP.md) | [Traceability](../TRACEABILITY.md) | [English](../../../en/knowledge-hub/README.md)

> Чернетка knowledge hub. Усі твердження походять лише із санітизованих екстракцій звітів, не перевірені незалежно й не доводять live deployment або поточний стан.

Comprehensive table translation із catalog.json. Source text уже санітизовано; local paths, emails, secrets і account identifiers не відтворюються.

## Artifact metadata

| Field | Value |
|---|---|
| Report | R2 |
| Extraction artifact | deep-report2-extraction.md |
| Extraction bytes | 42937 |
| Extraction SHA-256 | 508b251d5947a010632eaf0251ca25f828a9dae97e1156e93f6dc98176f0cdde |
| Reported original | deep-research-report2.md |
| Reported original bytes | 58865 |
| Reported original SHA-256 | 879a2e9de104dadc5d4dce23092ce55514d7420af804b355b106a185d2c24777 |
| Atomic items | 79 |
| Independent verification | not performed |

## Authority classification

- Explicit owner-granted quote: не виявлено.
- Permission candidate: R2-032.
- Усі recommendations та standing rules вимагають canonical branch reconciliation.

## Source items

| Source ID | Canonical | Category | Lifecycle | Implementation | Priority | Source span | Dedup group | Нормалізований текст |
|---|---|---|---|---|---|---|---|---|
| R2-001 | KH-DEC-006 | decision | proposed | planned | стратегічна рекомендація | Контекст і стратегічний висновок, 5 | distinct | Будувати продукт на відкритих стандартах і готовому open-source mail core; диференціюватися власними UI, AI та integration API. |
| R2-002 | KH-DEP-002 | dependency | proposed | planned | базовий мінімум | Контекст і стратегічний висновок, 5 | distinct | Протокольний контракт має охоплювати SMTP, IMAP, POP3 та сучасні JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhooks і push. |
| R2-003 | KH-PROD-022 | product | proposed | planned | — | Контекст і стратегічний висновок, 7 | distinct | Модульна траєкторія: Postfix + Dovecot + окремі antispam, DKIM/DMARC/ARC, webmail і DAV-компоненти. |
| R2-004 | KH-PROD-023 | product | proposed | planned | — | Контекст і стратегічний висновок, 7 | distinct | Інтегрована container-траєкторія: Mailcow або Docker Mailserver для швидкого запуску з меншим glue-code. |
| R2-005 | KH-PROD-024 | product | proposed | planned | — | Контекст і стратегічний висновок, 7 | distinct | All-in-one траєкторія: Stalwart, а в окремих сценаріях Maddy або Apache James; Stalwart є modern-first кандидатом. |
| R2-006 | KH-DEC-007 | decision | proposed | planned | — | Контекст і стратегічний висновок, 9 | distinct | Обирати Stalwart + власний web/mobile UX для modern-first B2C/B2B, Mailcow + custom frontend/BFF для швидкого MVP; orchestration layer лишати власним. |
| R2-007 | KH-EVD-013 | evidence | unverified | unknown | — | Відкриті стандарти та сумісність, 13 | distinct | Звіт пов’язує SMTP, IMAP, POP3, JMAP і JMAP over WebSocket з RFC 5321, 3501, 1939, 8620, 8621 і 8887. |
| R2-008 | KH-DEC-008 | decision | proposed | planned | — | Відкриті стандарти та сумісність, 15 | distinct | Не замінювати всі протоколи одним; застосувати fan-in/fan-out з одночасною підтримкою legacy і modern interfaces. |
| R2-009 | KH-DEP-003 | dependency | current | unknown | — | Відкриті стандарти та сумісність, 15 | distinct | Врахувати різні provider paths: Google/Apple DAV, Microsoft Graph для Microsoft 365 та комбіновану JMAP/IMAP/POP/DAV модель Fastmail. |
| R2-010 | KH-DEP-004 | dependency | proposed | planned | критично | Відкриті стандарти та сумісність, 17 | distinct | Підтримувати password-over-TLS для self-hosted/legacy і OAuth 2.0/XOAUTH2 для сучасних зовнішніх акаунтів. |
| R2-011 | KH-ISS-009 | issue | current | unknown | — | Відкриті стандарти та сумісність, 19 | distinct | Basic auth не слід вважати надійним шляхом для Google/Microsoft; modern auth треба врахувати в onboarding, account linking і support. |
| R2-012 | KH-PROD-025 | product | proposed | planned | — | Відкриті стандарти та сумісність, 21 | distinct | Додати Thunderbird autoconfig XML і стежити за IETF auto-configuration для зменшення onboarding friction. |
| R2-013 | KH-INS-011 | instruction | proposed | planned | — | Серверні платформи та готові збірки, 25 | distinct | Не писати MTA, MDA або groupware з нуля; збирати продукт із готових серверних компонентів. |
| R2-014 | KH-PROD-026 | product | current | unknown | — | Серверні платформи та готові збірки, 29 | distinct | Postfix + Dovecot дають зрілий SMTP/IMAP/POP3 стек; caveat: Dovecot CE описано як single-server edition. |
| R2-015 | KH-PROD-027 | product | current | unknown | — | Серверні платформи та готові збірки, 30 | distinct | Mailcow інтегрує Postfix, Dovecot, Rspamd, Redis, MariaDB, SOGo, Nginx і ACME; caveat: важкий багатоконтейнерний bundle. |
| R2-016 | KH-PROD-028 | product | current | unknown | — | Серверні платформи та готові збірки, 31 | distinct | Stalwart об’єднує JMAP, IMAP, POP3, SMTP, CalDAV, CardDAV і WebDAV; caveat: великий control surface. |
| R2-017 | KH-PROD-029 | product | current | unknown | — | Серверні платформи та готові збірки, 32 | distinct | Docker Mailserver є простішим container-first mail server без SQL, але має менше integrated groupware можливостей. |
| R2-018 | KH-PROD-030 | product | current | unknown | — | Серверні платформи та готові збірки, 33 | distinct | Maddy є легким all-in-one SMTP+IMAP сервером із меншим glue-code, але меншою екосистемою інтеграцій. |
| R2-019 | KH-PROD-031 | product | current | unknown | — | Серверні платформи та готові збірки, 34 | distinct | Cyrus IMAP і Apache James придатні для enterprise/JMAP/scale сценаріїв, але потребують більшої операційної дисципліни. |
| R2-020 | KH-DEC-009 | decision | proposed | planned | MVP | Базова рекомендація по вибору, 38 | distinct | Для найкращого MVP time-to-value обрати Mailcow. |
| R2-021 | KH-DEC-010 | decision | proposed | planned | modern-first | Базова рекомендація по вибору, 40 | distinct | Для modern-first продукту обрати Stalwart через native JMAP/DAV та API-first configuration/control plane. |
| R2-022 | KH-DEC-011 | decision | proposed | planned | довгий корпоративний маршрут | Базова рекомендація по вибору, 42 | distinct | Для довгого корпоративного маршруту з максимальною контрольованістю розглядати Postfix + Dovecot, якщо є сильна ops-команда. |
| R2-023 | KH-PLAN-006 | plan | proposed | planned | — | Практичний рецепт для Mailcow, 46 | distinct | Mailcow deployment: clone, `generate_config.sh`, редагування `mailcow.conf`, `docker compose pull/up`; production-хост має уникати MTU, port і host-service конфліктів. |
| R2-024 | KH-DEP-005 | dependency | proposed | planned | — | Практичний рецепт для Mailcow, 48 | distinct | GitOps для Mailcow має охоплювати `mailcow.conf`, `docker-compose.yml`, protected secrets/volumes, ingress, logs, SSO, observability, backups та integration service. |
| R2-025 | KH-PROD-032 | product | current | unknown | — | Практичний рецепт для Stalwart, 52 | distinct | Stalwart використовує мінімальний `config.json`, data-store configuration, WebUI/CLI, bootstrap і recovery modes; модель підтримує wizard/declarative/multi-tenant control. |
| R2-026 | KH-PLAN-007 | plan | proposed | planned | — | Практичний рецепт для Stalwart, 54 | distinct | Для Stalwart виділити persistent store, обрати backend, пройти bootstrap і налаштувати domains, TLS, rate limits, spam policy та management API. |
| R2-027 | KH-PROD-033 | product | current | unknown | — | Практичний рецепт для Google Apps Script і Gmail, 58 | distinct | Apps Script/GmailApp/Gmail API дають low-code шлях для Google Workspace automation і прототипування. |
| R2-028 | KH-DEC-012 | decision | proposed | planned | — | Практичний рецепт для Google Apps Script і Gmail, 60 | apps-script-boundary | Використовувати `GmailApp` для власного/domain Gmail, Gmail REST API для зовнішнього сервісу, Workspace add-on для embedded UX; Apps Script лишити enterprise adapter, не core. |
| R2-029 | KH-ISS-010 | issue | current | unknown | — | Практичний рецепт для Telegram і Gmail з’єднання, 64 | distinct | Єдиного офіційного Telegram × Gmail API немає; bridge треба компонувати з незалежних Telegram і Google interfaces. |
| R2-030 | KH-DEC-013 | decision | proposed | planned | — | Практичний рецепт для Telegram і Gmail з’єднання, 64 | distinct | Базовий bridge будувати як Telegram Bot API + Mini App + власний backend + Gmail API; TDLib/user-account flow використовувати лише свідомо. |
| R2-031 | KH-PLAN-008 | plan | proposed | planned | — | Практичний рецепт для Telegram і Gmail з’єднання, 66 | distinct | Telegram flow: BotFather, Main Mini App, Allowed URLs, frontend, backend authentication та linkage між Telegram identity і internal account record. |
| R2-032 | KH-PERM-002 | permission-candidate | proposed | planned | — | Практичний рецепт для Telegram і Gmail з’єднання, 66 | distinct | Майбутній Telegram surface має дозволяти лише явно обрані дії: priority view, summary, quick reply, task confirmation, snooze і triage; це product-scope candidate, не дозвіл власника. |
| R2-033 | KH-INS-012 | instruction | proposed | planned | критично | Безпека та відповідність, 70 | distinct | Розділяти transport security, domain authenticity, content protection та abuse/phishing defense; застосувати TLS, MTA-STS, TLS-RPT і за DNSSEC також DANE. |
| R2-034 | KH-DEP-006 | dependency | proposed | planned | базовий мінімум | Безпека та відповідність, 72 | distinct | Базова domain authentication: SPF, DKIM, DMARC; ARC для forwarding/listserv; використовувати готові OpenDKIM/OpenDMARC/OpenARC/Rspamd implementations. |
| R2-035 | KH-PROD-034 | product | current | unknown | — | Безпека та відповідність, 74 | distinct | Postfix `postscreen` є рекомендованим first perimeter layer до content filtering. |
| R2-036 | KH-DEC-014 | decision | proposed | planned | — | Безпека та відповідність, 76 | distinct | Для нових систем ставити Rspamd primary filter; SpamAssassin лишати для compatibility/legacy випадків. |
| R2-037 | KH-DEP-007 | dependency | current | planned | — | Безпека та відповідність, 78 | distinct | OpenPGP і S/MIME потребують окремих operational models; доступні OpenPGP.js, Mailvelope, OpenSSL CMS, Bouncy Castle і PKI.js. |
| R2-038 | KH-DEC-015 | decision | proposed | planned | обов’язково/додатково | Безпека та відповідність, 80 | replaceable-e2e | Transport/domain security зробити обов’язковими; OpenPGP/S/MIME додавати сегментно; E2E оформити окремим capability layer із key-management UX. |
| R2-039 | KH-PRV-002 | privacy | proposed | planned | базовий фундамент | Безпека та відповідність, 82 | distinct | GDPR/ePrivacy controls мають включати encryption, access control, audit logs, minimization, contracts, retention, export/delete, breach response і residency. |
| R2-040 | KH-EVD-014 | evidence | unverified | unknown | — | Безпека та відповідність, 84 | distinct | Звіт стверджує, що матеріали CNIL/Garante 2026 року встановлюють consent concerns для email tracking pixels. |
| R2-041 | KH-PRV-003 | privacy | proposed | planned | дуже важливо | Безпека та відповідність, 84 | distinct | Open tracking не вмикати за замовчуванням для EU-sensitive use cases; додати legal gating, preference center, granular opt-in і розділення delivery/marketing telemetry. |
| R2-042 | KH-DEC-016 | decision | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 88 | distinct | DAV strategy: integrated DAV/JMAP у Stalwart/Cyrus або окремий Radicale/Baïkal/SabreDAV; у Mailcow роль виконує SOGo. |
| R2-043 | KH-PROD-035 | product | current | unknown | — | Функції, інтеграції та клієнтська платформа, 90 | distinct | Webmail candidates: Roundcube для classic/plugin IMAP, SnappyMail для lightweight UI, Nextcloud Mail для suite integration, Bulwark для JMAP/Stalwart. |
| R2-044 | KH-DEC-017 | decision | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 92 | distinct | Побудувати єдиний integration facade над Gmail API, Microsoft Graph, Google People/Calendar та Telegram APIs замість provider logic у frontend. |
| R2-045 | KH-HIS-002 | historical-artifact | superseded | unknown | — | Функції, інтеграції та клієнтська платформа, 92 | distinct | Не класифікувати EmailEngine як FOSS: звіт описує його як колишній open-source, нині source-available/commercial unified email layer. |
| R2-046 | KH-DEP-008 | dependency | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 94 | distinct | Для Node mail work використовувати ImapFlow, Nodemailer і PostalMime замість власного IMAP/SMTP/MIME implementation. |
| R2-047 | KH-HIS-003 | historical-artifact | superseded | unknown | — | Функції, інтеграції та клієнтська платформа, 94 | distinct | Mailparser позначено maintenance mode/legacy choice; для нових проєктів рекомендовано PostalMime. |
| R2-048 | KH-PROD-018 | product | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 96 | smart-triage | Smart sorting має три рівні: deterministic Sieve/rules, statistical/Rspamd scoring і AI summaries/action extraction/risk/reply detection. |
| R2-049 | KH-DEC-018 | lesson | current | planned | — | Функції, інтеграції та клієнтська платформа, 98 | undo-send | Undo send реалізується pre-send hold queue; SMTP не дає надійного retract після internet delivery. |
| R2-050 | KH-DEC-019 | decision | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 100 | distinct | Integration bus будувати як REST for commands і webhooks/SSE/pub-sub for events. |
| R2-051 | KH-PROD-036 | product | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 102 | distinct | Delivery clients: web/PWA + service workers/VAPID, React Native або Flutter + APNs/FCM, Tauri або Electron для desktop. |
| R2-052 | KH-LES-005 | lesson | proposed | planned | — | Дані, пошук і масштабування, 106 | distinct | Не складати metadata, blobs, search і queues в одну БД; data plane має бути багатошаровим. |
| R2-053 | KH-PLAN-009 | plan | proposed | planned | MVP | Дані, пошук і масштабування, 108 | distinct | Single-node/MVP: Stalwart + RocksDB або default Mailcow, file/S3 blobs, Redis ephemeral state і базовий search стека. |
| R2-054 | KH-PLAN-010 | plan | proposed | planned | mid-scale | Дані, пошук і масштабування, 110 | distinct | Mid-scale/multi-tenant: PostgreSQL metadata, S3/MinIO blobs, Redis locks/queues/rate/session/cache та окремий search backend за потреби. |
| R2-055 | KH-ISS-011 | issue | current | unknown | — | Дані, пошук і масштабування, 112 | distinct | Postfix/Dovecot FTS часто потребує окремого Solr або Flatcurve/Xapian design; Stalwart моделює search як окремий native store. |
| R2-056 | KH-DEP-009 | dependency | proposed | planned | — | Дані, пошук і масштабування, 114 | distinct | Redis використовувати для cache, coordination і short-lived jobs: delayed send, snooze, classification, OCR, retries, AI summaries та push fan-out. |
| R2-057 | KH-ISS-012 | issue | current | unknown | — | Дані, пошук і масштабування, 116 | distinct | Dovecot CE + `dsync` не дорівнює готовому cluster control plane; HA/multi-region roadmap може схилити вибір до Stalwart/unified stack. |
| R2-058 | KH-EVD-002 | evidence | unverified | unknown | — | ADHD-орієнтований UX і продуктова логіка, 120 | adhd-executive-evidence | Звіт пов’язує ADHD із executive dysfunction, time-perception difficulties, impulsivity і depression comorbidity; продукт має компенсувати intent-to-action gap. |
| R2-059 | KH-EVD-006 | evidence | unverified | unknown | — | ADHD-орієнтований UX і продуктова логіка, 122 | comorbidity-evidence | Звіт стверджує, що ADHD + depression посилюють working-memory/executive burden, а великий inbox запускає overload, avoidance і guilt spiral. |
| R2-060 | KH-DEC-020 | decision | proposed | planned | — | ADHD-орієнтований UX і продуктова логіка, 124 | distinct | ADHD-friendly UI означає послідовність, менше cognitive load, ясні кроки, predictable navigation і distraction control, а не декоративну яскравість. |
| R2-061 | KH-LES-006 | lesson | unverified | unknown | — | Практичні патерни від нейровідмінних користувачів, 128 | distinct | Описані user patterns: timed triage, archive/delete stale mail, fixed check windows, one quick email, calendar/snooze linkage. |
| R2-062 | KH-DEC-001 | decision | proposed | planned | — | Практичні патерни від нейровідмінних користувачів, 130 | entry-threshold | Product success слід вимірювати зниженням стартового бар’єра і допомогою з малим наступним кроком, не кількістю листів у списку. |
| R2-063 | KH-PROD-005 | product | proposed | planned | — | Карта рішень, 136 | smallest-action | Режим старту показує 3–5 найлегших дій і quick actions замість повного inbox. |
| R2-064 | KH-PROD-002 | product | proposed | planned | — | Карта рішень, 137 | time-framing | Time framing UI показує effort estimate, deadline risk і calendar action. |
| R2-065 | KH-PROD-010 | product | proposed | planned | — | Карта рішень, 138 | soft-reminders | Безосудні reminders формулюють досяжні короткі дії без guilt language. |
| R2-066 | KH-PROD-007 | product | proposed | planned | — | Карта рішень, 139 | focus-surface | Focus mode використовує одну колонку, приховані secondary panels, мінімум badges, plain-text option і summary-first view. |
| R2-067 | KH-PROD-004 | product | proposed | planned | — | Карта рішень, 140 | microprogress | Microprogress дає короткі session goals, progress bar і streak за регулярний triage, а не volume. |
| R2-068 | KH-PROD-014 | product | proposed | planned | — | Карта рішень, 141 | reply-assistance | AI opener створює 1–2 короткі reply templates для acknowledgment, clarification або deferred response. |
| R2-069 | KH-PROD-003 | product | proposed | planned | — | Карта рішень, 142 | batch-sessions | Batch mode групує пошту у scheduled check-ins, залишаючи emergency signals окремим каналом. |
| R2-070 | KH-PROD-020 | product | proposed | planned | — | Яким має бути AI-асистент, 146 | energy-ai | AI assistant має три режими: energy-aware summarization, action scaffolding і routine automation; не окремий шумний full-screen chatbot. |
| R2-071 | KH-PLAN-011 | plan | proposed | planned | — | Рекомендована цільова архітектура, 152 | distinct | Цільова layered architecture: Stalwart/Mailcow core, власний integration facade, AI/task workers та smart web/mobile clients. |
| R2-072 | KH-PLAN-012 | plan | proposed | planned | етап 1 | Практичний порядок робіт, 156 | distinct | Етап 1: зафіксувати protocol contract, обрати core, підняти reference deployment з SPF/DKIM/DMARC/MTA-STS/TLS-RPT, backups, logs і monitoring, потім API/BFF і clients. |
| R2-073 | KH-LES-007 | lesson | proposed | planned | — | Практичний порядок робіт, 156 | distinct | Frontend до стабільного mail core створює інтеграційну нестабільність; порядок робіт не слід інвертувати. |
| R2-074 | KH-PLAN-013 | plan | proposed | planned | етап 2 | Практичний порядок робіт, 158 | distinct | Етап 2: Gmail API, Microsoft Graph, Telegram Bot/Mini App, storage adapters і consent/privacy module; Apps Script/add-on опційно. |
| R2-075 | KH-PLAN-014 | plan | proposed | planned | етап 3 | Практичний порядок робіт, 160 | distinct | Етап 3: ADHD-first smart surface з quick actions, deadline risk, waiting, later, filtered і energy-required queues. |
| R2-076 | KH-PLAN-015 | plan | proposed | planned | швидкий MVP | Що брати в production вже зараз, 166–167 | distinct | Quick MVP stack: Mailcow core, Roundcube/custom web shell, bundled Rspamd, integration service, Redis jobs, ADHD shell та AI triage. |
| R2-077 | KH-PLAN-016 | plan | proposed | planned | довгий продукт | Що брати в production вже зараз, 169–170 | distinct | Long modern stack: Stalwart core, Bulwark як reference/temporary client, own orchestration, PostgreSQL/scale backend, S3/MinIO, Redis, custom clients. |
| R2-078 | KH-PLAN-017 | plan | proposed | planned | максимальна передбачуваність | Що брати в production вже зараз, 172–173 | distinct | Predictability stack: Postfix + Dovecot + Rspamd + OpenDKIM/OpenDMARC/OpenARC + Roundcube + optional DAV server; найбільше integration work. |
| R2-079 | KH-INS-013 | instruction | proposed | planned | підсумкова рекомендація | План впровадження, 175 | distinct | Не створювати власний mail server; інвестувати в UX, interoperability, privacy, AI triage та керовані ecosystem integrations. |

## Coverage register

| Category | Count |
|---|---:|
| decision | 15 |
| dependency | 8 |
| product | 24 |
| evidence | 4 |
| issue | 4 |
| instruction | 3 |
| plan | 12 |
| permission-candidate | 1 |
| privacy | 2 |
| historical-artifact | 2 |
| lesson | 4 |

## Conflict references

- CF-002: Telegram Bot API та provider-specific OAuth описані недостатньо розділено; фактична auth model не перевірена.
- CF-005: Streak за регулярний triage не узгоджено з ризиками публічних streaks, penalties та over-gamification.
- CF-006: Standalone/open mail-core roadmap і Gmail-centric hybrid roadmap мають різний product scope; report3 є primary foundation, але явно не скасовує ширший scope report2.

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
