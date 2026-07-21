# REPORT-2 source dossier

[Home](../README.md) | [Roadmap](../MASTER_ROADMAP.md) | [Traceability](../TRACEABILITY.md) | [Українська](../../../uk/knowledge-hub/README.md)

> Draft knowledge hub. Every claim derives only from sanitized report extractions, is not independently verified, and does not prove live deployment or current state.

Comprehensive table translation from catalog.json. The source text is already sanitized; local paths, emails, secrets, and account identifiers are not reproduced.

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

- Explicit owner-granted quote: none detected.
- Permission candidate: R2-032.
- Every recommendation and standing rule requires canonical branch reconciliation.

## Source items

| Source ID | Canonical | Category | Lifecycle | Implementation | Priority | Source span | Dedup group | Normalized text |
|---|---|---|---|---|---|---|---|---|
| R2-001 | KH-DEC-006 | decision | proposed | planned | стратегічна рекомендація | Контекст і стратегічний висновок, 5 | distinct | Build the product on open standards and a proven open-source mail core; differentiate through proprietary UI, AI, and integration APIs. |
| R2-002 | KH-DEP-002 | dependency | proposed | planned | базовий мінімум | Контекст і стратегічний висновок, 5 | distinct | The protocol contract should cover SMTP, IMAP, POP3, modern JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhooks, and push. |
| R2-003 | KH-PROD-022 | product | proposed | planned | — | Контекст і стратегічний висновок, 7 | distinct | Modular path: Postfix plus Dovecot with separate antispam, DKIM/DMARC/ARC, webmail, and DAV components. |
| R2-004 | KH-PROD-023 | product | proposed | planned | — | Контекст і стратегічний висновок, 7 | distinct | Integrated container path: Mailcow or Docker Mailserver for faster launch with less glue code. |
| R2-005 | KH-PROD-024 | product | proposed | planned | — | Контекст і стратегічний висновок, 7 | distinct | All-in-one path: Stalwart, and in selected scenarios Maddy or Apache James; Stalwart is the modern-first candidate. |
| R2-006 | KH-DEC-007 | decision | proposed | planned | — | Контекст і стратегічний висновок, 9 | distinct | Choose Stalwart plus custom web/mobile UX for modern-first B2C/B2B, or Mailcow plus a custom frontend/BFF for a fast MVP; retain a proprietary orchestration layer. |
| R2-007 | KH-EVD-013 | evidence | unverified | unknown | — | Відкриті стандарти та сумісність, 13 | distinct | The report maps SMTP, IMAP, POP3, JMAP, and JMAP over WebSocket to RFC 5321, 3501, 1939, 8620, 8621, and 8887. |
| R2-008 | KH-DEC-008 | decision | proposed | planned | — | Відкриті стандарти та сумісність, 15 | distinct | Do not replace every protocol with one interface; use fan-in/fan-out while supporting legacy and modern interfaces together. |
| R2-009 | KH-DEP-003 | dependency | current | unknown | — | Відкриті стандарти та сумісність, 15 | distinct | Account for different provider paths: Google and Apple DAV, Microsoft Graph for Microsoft 365, and Fastmail's combined JMAP/IMAP/POP/DAV model. |
| R2-010 | KH-DEP-004 | dependency | proposed | planned | критично | Відкриті стандарти та сумісність, 17 | distinct | Support password-over-TLS for self-hosted or legacy systems and OAuth 2.0/XOAUTH2 for modern external accounts. |
| R2-011 | KH-ISS-009 | issue | current | unknown | — | Відкриті стандарти та сумісність, 19 | distinct | Basic authentication should not be treated as a reliable Google or Microsoft path; modern authentication must be reflected in onboarding, account linking, and support. |
| R2-012 | KH-PROD-025 | product | proposed | planned | — | Відкриті стандарти та сумісність, 21 | distinct | Add Thunderbird autoconfig XML and track IETF auto-configuration work to reduce onboarding friction. |
| R2-013 | KH-INS-011 | instruction | proposed | planned | — | Серверні платформи та готові збірки, 25 | distinct | Do not write an MTA, MDA, or groupware system from scratch; assemble the product from established server components. |
| R2-014 | KH-PROD-026 | product | current | unknown | — | Серверні платформи та готові збірки, 29 | distinct | Postfix plus Dovecot provides a mature SMTP/IMAP/POP3 stack; caveat: Dovecot CE is described as a single-server edition. |
| R2-015 | KH-PROD-027 | product | current | unknown | — | Серверні платформи та готові збірки, 30 | distinct | Mailcow integrates Postfix, Dovecot, Rspamd, Redis, MariaDB, SOGo, Nginx, and ACME; caveat: it is a heavy multi-container bundle. |
| R2-016 | KH-PROD-028 | product | current | unknown | — | Серверні платформи та готові збірки, 31 | distinct | Stalwart combines JMAP, IMAP, POP3, SMTP, CalDAV, CardDAV, and WebDAV; caveat: it has a large control surface. |
| R2-017 | KH-PROD-029 | product | current | unknown | — | Серверні платформи та готові збірки, 32 | distinct | Docker Mailserver is a simpler container-first mail server without SQL, but it has fewer integrated groupware capabilities. |
| R2-018 | KH-PROD-030 | product | current | unknown | — | Серверні платформи та готові збірки, 33 | distinct | Maddy is a lightweight all-in-one SMTP and IMAP server with less glue code but a smaller integration ecosystem. |
| R2-019 | KH-PROD-031 | product | current | unknown | — | Серверні платформи та готові збірки, 34 | distinct | Cyrus IMAP and Apache James fit enterprise, JMAP, and scale scenarios but require greater operational discipline. |
| R2-020 | KH-DEC-009 | decision | proposed | planned | MVP | Базова рекомендація по вибору, 38 | distinct | Choose Mailcow for the best MVP time to value. |
| R2-021 | KH-DEC-010 | decision | proposed | planned | modern-first | Базова рекомендація по вибору, 40 | distinct | Choose Stalwart for a modern-first product because of native JMAP/DAV and API-first configuration and control. |
| R2-022 | KH-DEC-011 | decision | proposed | planned | довгий корпоративний маршрут | Базова рекомендація по вибору, 42 | distinct | For a long-term enterprise route with maximum control, consider Postfix plus Dovecot when a strong operations team is available. |
| R2-023 | KH-PLAN-006 | plan | proposed | planned | — | Практичний рецепт для Mailcow, 46 | distinct | Mailcow deployment: clone, run `generate_config.sh`, edit `mailcow.conf`, then run `docker compose pull/up`; the production host must avoid MTU, port, and host-service conflicts. |
| R2-024 | KH-DEP-005 | dependency | proposed | planned | — | Практичний рецепт для Mailcow, 48 | distinct | Mailcow GitOps should cover `mailcow.conf`, `docker-compose.yml`, protected secrets and volumes, ingress, logs, SSO, observability, backups, and the integration service. |
| R2-025 | KH-PROD-032 | product | current | unknown | — | Практичний рецепт для Stalwart, 52 | distinct | Stalwart uses a minimal `config.json`, data-store configuration, WebUI/CLI, bootstrap, and recovery modes; the model supports wizard, declarative, and multi-tenant control. |
| R2-026 | KH-PLAN-007 | plan | proposed | planned | — | Практичний рецепт для Stalwart, 54 | distinct | For Stalwart, allocate persistent storage, choose a backend, complete bootstrap, and configure domains, TLS, rate limits, spam policy, and the management API. |
| R2-027 | KH-PROD-033 | product | current | unknown | — | Практичний рецепт для Google Apps Script і Gmail, 58 | distinct | Apps Script, GmailApp, and Gmail API provide a low-code route for Google Workspace automation and prototyping. |
| R2-028 | KH-DEC-012 | decision | proposed | planned | — | Практичний рецепт для Google Apps Script і Gmail, 60 | apps-script-boundary | Use `GmailApp` for personal or domain Gmail, Gmail REST API for an external service, and a Workspace add-on for embedded UX; keep Apps Script as an enterprise adapter, not the core. |
| R2-029 | KH-ISS-010 | issue | current | unknown | — | Практичний рецепт для Telegram і Gmail з’єднання, 64 | distinct | There is no single official Telegram-to-Gmail API; the bridge must combine independent Telegram and Google interfaces. |
| R2-030 | KH-DEC-013 | decision | proposed | planned | — | Практичний рецепт для Telegram і Gmail з’єднання, 64 | distinct | Build the default bridge from Telegram Bot API, a Mini App, a proprietary backend, and Gmail API; use TDLib or a user-account flow only deliberately. |
| R2-031 | KH-PLAN-008 | plan | proposed | planned | — | Практичний рецепт для Telegram і Gmail з’єднання, 66 | distinct | Telegram flow: BotFather, Main Mini App, Allowed URLs, frontend, backend authentication, and linkage between Telegram identity and an internal account record. |
| R2-032 | KH-PERM-002 | permission-candidate | proposed | planned | — | Практичний рецепт для Telegram і Gmail з’єднання, 66 | distinct | A future Telegram surface should allow only explicitly selected actions: priority view, summary, quick reply, task confirmation, snooze, and triage; this is a product-scope candidate, not owner permission. |
| R2-033 | KH-INS-012 | instruction | proposed | planned | критично | Безпека та відповідність, 70 | distinct | Separate transport security, domain authenticity, content protection, and abuse/phishing defense; apply TLS, MTA-STS, TLS-RPT, and, with DNSSEC, DANE. |
| R2-034 | KH-DEP-006 | dependency | proposed | planned | базовий мінімум | Безпека та відповідність, 72 | distinct | Baseline domain authentication is SPF, DKIM, and DMARC, with ARC for forwarding or lists; use established OpenDKIM, OpenDMARC, OpenARC, and Rspamd implementations. |
| R2-035 | KH-PROD-034 | product | current | unknown | — | Безпека та відповідність, 74 | distinct | Postfix `postscreen` is the recommended first perimeter layer before content filtering. |
| R2-036 | KH-DEC-014 | decision | proposed | planned | — | Безпека та відповідність, 76 | distinct | Use Rspamd as the primary filter for new systems; retain SpamAssassin for compatibility or legacy cases. |
| R2-037 | KH-DEP-007 | dependency | current | planned | — | Безпека та відповідність, 78 | distinct | OpenPGP and S/MIME require separate operational models; available components include OpenPGP.js, Mailvelope, OpenSSL CMS, Bouncy Castle, and PKI.js. |
| R2-038 | KH-DEC-015 | decision | proposed | planned | обов’язково/додатково | Безпека та відповідність, 80 | replaceable-e2e | Make transport and domain security mandatory; add OpenPGP or S/MIME by segment; model E2E as a separate capability layer with key-management UX. |
| R2-039 | KH-PRV-002 | privacy | proposed | planned | базовий фундамент | Безпека та відповідність, 82 | distinct | GDPR and ePrivacy controls should include encryption, access control, audit logs, minimization, contracts, retention, export and deletion, breach response, and residency. |
| R2-040 | KH-EVD-014 | evidence | unverified | unknown | — | Безпека та відповідність, 84 | distinct | The report claims that 2026 CNIL and Garante materials raise consent concerns for email tracking pixels. |
| R2-041 | KH-PRV-003 | privacy | proposed | planned | дуже важливо | Безпека та відповідність, 84 | distinct | Do not enable open tracking by default for EU-sensitive use cases; add legal gating, a preference center, granular opt-in, and separation of delivery from marketing telemetry. |
| R2-042 | KH-DEC-016 | decision | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 88 | distinct | DAV strategy: integrated DAV/JMAP in Stalwart or Cyrus, or separate Radicale, Baikal, or SabreDAV; SOGo fills this role in Mailcow. |
| R2-043 | KH-PROD-035 | product | current | unknown | — | Функції, інтеграції та клієнтська платформа, 90 | distinct | Webmail candidates: Roundcube for classic/plugin IMAP, SnappyMail for lightweight UI, Nextcloud Mail for suite integration, and Bulwark for JMAP/Stalwart. |
| R2-044 | KH-DEC-017 | decision | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 92 | distinct | Build one integration facade over Gmail API, Microsoft Graph, Google People/Calendar, and Telegram APIs instead of placing provider logic in the frontend. |
| R2-045 | KH-HIS-002 | historical-artifact | superseded | unknown | — | Функції, інтеграції та клієнтська платформа, 92 | distinct | Do not classify EmailEngine as FOSS: the report describes it as formerly open source and now a source-available commercial unified email layer. |
| R2-046 | KH-DEP-008 | dependency | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 94 | distinct | For Node mail work, use ImapFlow, Nodemailer, and PostalMime instead of custom IMAP, SMTP, or MIME implementations. |
| R2-047 | KH-HIS-003 | historical-artifact | superseded | unknown | — | Функції, інтеграції та клієнтська платформа, 94 | distinct | Mailparser is marked as maintenance-mode or legacy; PostalMime is recommended for new projects. |
| R2-048 | KH-PROD-018 | product | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 96 | smart-triage | Smart sorting has three levels: deterministic Sieve or rules, statistical/Rspamd scoring, and AI summaries, action extraction, risk detection, and reply detection. |
| R2-049 | KH-DEC-018 | lesson | current | planned | — | Функції, інтеграції та клієнтська платформа, 98 | undo-send | Undo send is implemented as a pre-send hold queue; SMTP cannot reliably retract after Internet delivery. |
| R2-050 | KH-DEC-019 | decision | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 100 | distinct | Build the integration bus with REST for commands and webhooks, SSE, or pub-sub for events. |
| R2-051 | KH-PROD-036 | product | proposed | planned | — | Функції, інтеграції та клієнтська платформа, 102 | distinct | Delivery clients: web/PWA with service workers and VAPID, React Native or Flutter with APNs/FCM, and Tauri or Electron for desktop. |
| R2-052 | KH-LES-005 | lesson | proposed | planned | — | Дані, пошук і масштабування, 106 | distinct | Do not put metadata, blobs, search, and queues in one database; the data plane should be layered. |
| R2-053 | KH-PLAN-009 | plan | proposed | planned | MVP | Дані, пошук і масштабування, 108 | distinct | Single-node or MVP: Stalwart with RocksDB or default Mailcow, file or S3 blobs, Redis ephemeral state, and basic stack search. |
| R2-054 | KH-PLAN-010 | plan | proposed | planned | mid-scale | Дані, пошук і масштабування, 110 | distinct | Mid-scale or multi-tenant: PostgreSQL metadata, S3/MinIO blobs, Redis locks, queues, rate, session and cache state, plus a separate search backend when needed. |
| R2-055 | KH-ISS-011 | issue | current | unknown | — | Дані, пошук і масштабування, 112 | distinct | Postfix/Dovecot full-text search often requires a separate Solr or Flatcurve/Xapian design; Stalwart models search as a separate native store. |
| R2-056 | KH-DEP-009 | dependency | proposed | planned | — | Дані, пошук і масштабування, 114 | distinct | Use Redis for cache, coordination, and short-lived jobs: delayed send, snooze, classification, OCR, retries, AI summaries, and push fan-out. |
| R2-057 | KH-ISS-012 | issue | current | unknown | — | Дані, пошук і масштабування, 116 | distinct | Dovecot CE plus `dsync` is not a ready cluster control plane; an HA or multi-region roadmap may favor Stalwart or another unified stack. |
| R2-058 | KH-EVD-002 | evidence | unverified | unknown | — | ADHD-орієнтований UX і продуктова логіка, 120 | adhd-executive-evidence | The report associates ADHD with executive dysfunction, time-perception difficulties, impulsivity, and depression comorbidity; the product should compensate for the intent-to-action gap. |
| R2-059 | KH-EVD-006 | evidence | unverified | unknown | — | ADHD-орієнтований UX і продуктова логіка, 122 | comorbidity-evidence | The report claims ADHD plus depression increases working-memory and executive burden, while a large inbox triggers overload, avoidance, and a guilt spiral. |
| R2-060 | KH-DEC-020 | decision | proposed | planned | — | ADHD-орієнтований UX і продуктова логіка, 124 | distinct | ADHD-friendly UI means consistency, lower cognitive load, clear steps, predictable navigation, and distraction control, not decorative brightness. |
| R2-061 | KH-LES-006 | lesson | unverified | unknown | — | Практичні патерни від нейровідмінних користувачів, 128 | distinct | Reported user patterns include timed triage, archiving or deleting stale mail, fixed check windows, one quick email, and calendar or snooze linkage. |
| R2-062 | KH-DEC-001 | decision | proposed | planned | — | Практичні патерни від нейровідмінних користувачів, 130 | entry-threshold | Product success should be measured by lowering the start barrier and enabling a small next step, not by the number of messages in a list. |
| R2-063 | KH-PROD-005 | product | proposed | planned | — | Карта рішень, 136 | smallest-action | Start mode shows the three to five easiest actions and quick actions instead of the full inbox. |
| R2-064 | KH-PROD-002 | product | proposed | planned | — | Карта рішень, 137 | time-framing | Time-framing UI shows an effort estimate, deadline risk, and calendar action. |
| R2-065 | KH-PROD-010 | product | proposed | planned | — | Карта рішень, 138 | soft-reminders | Non-judgmental reminders express achievable short actions without guilt language. |
| R2-066 | KH-PROD-007 | product | proposed | planned | — | Карта рішень, 139 | focus-surface | Focus mode uses one column, hidden secondary panels, minimal badges, a plain-text option, and a summary-first view. |
| R2-067 | KH-PROD-004 | product | proposed | planned | — | Карта рішень, 140 | microprogress | Microprogress provides short session goals, a progress bar, and a streak for regular triage rather than volume. |
| R2-068 | KH-PROD-014 | product | proposed | planned | — | Карта рішень, 141 | reply-assistance | AI opener creates one or two short reply templates for acknowledgment, clarification, or a deferred response. |
| R2-069 | KH-PROD-003 | product | proposed | planned | — | Карта рішень, 142 | batch-sessions | Batch mode groups mail into scheduled check-ins while leaving emergency signals on a separate channel. |
| R2-070 | KH-PROD-020 | product | proposed | planned | — | Яким має бути AI-асистент, 146 | energy-ai | The AI assistant has three modes: energy-aware summarization, action scaffolding, and routine automation; it is not a separate noisy full-screen chatbot. |
| R2-071 | KH-PLAN-011 | plan | proposed | planned | — | Рекомендована цільова архітектура, 152 | distinct | Target layered architecture: Stalwart or Mailcow core, a proprietary integration facade, AI and task workers, and smart web/mobile clients. |
| R2-072 | KH-PLAN-012 | plan | proposed | planned | етап 1 | Практичний порядок робіт, 156 | distinct | Phase 1: fix the protocol contract, select the core, launch a reference deployment with SPF, DKIM, DMARC, MTA-STS, TLS-RPT, backups, logs, and monitoring, then add API/BFF and clients. |
| R2-073 | KH-LES-007 | lesson | proposed | planned | — | Практичний порядок робіт, 156 | distinct | Building the frontend before a stable mail core creates integration instability; do not invert the work order. |
| R2-074 | KH-PLAN-013 | plan | proposed | planned | етап 2 | Практичний порядок робіт, 158 | distinct | Phase 2: Gmail API, Microsoft Graph, Telegram Bot and Mini App, storage adapters, and a consent/privacy module; Apps Script or an add-on is optional. |
| R2-075 | KH-PLAN-014 | plan | proposed | planned | етап 3 | Практичний порядок робіт, 160 | distinct | Phase 3: an ADHD-first smart surface with quick-action, deadline-risk, waiting, later, filtered, and energy-required queues. |
| R2-076 | KH-PLAN-015 | plan | proposed | planned | швидкий MVP | Що брати в production вже зараз, 166–167 | distinct | Quick MVP stack: Mailcow core, Roundcube or custom web shell, bundled Rspamd, integration service, Redis jobs, ADHD shell, and AI triage. |
| R2-077 | KH-PLAN-016 | plan | proposed | planned | довгий продукт | Що брати в production вже зараз, 169–170 | distinct | Long-term modern stack: Stalwart core, Bulwark as a reference or temporary client, proprietary orchestration, PostgreSQL scale backend, S3/MinIO, Redis, and custom clients. |
| R2-078 | KH-PLAN-017 | plan | proposed | planned | максимальна передбачуваність | Що брати в production вже зараз, 172–173 | distinct | Predictability stack: Postfix, Dovecot, Rspamd, OpenDKIM, OpenDMARC, OpenARC, Roundcube, and optional DAV server; this requires the most integration work. |
| R2-079 | KH-INS-013 | instruction | proposed | planned | підсумкова рекомендація | План впровадження, 175 | distinct | Do not create a custom mail server; invest in UX, interoperability, privacy, AI triage, and managed ecosystem integrations. |

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

- CF-002: Telegram Bot API and provider-specific OAuth are not separated clearly enough; the actual authentication model is unverified.
- CF-005: A regular-triage streak is not reconciled with the risks of public streaks, penalties, and over-gamification.
- CF-006: The standalone open-mail-core roadmap and Gmail-centric hybrid roadmap have different product scope; report 3 is the primary foundation but does not explicitly cancel report 2's broader scope.

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
