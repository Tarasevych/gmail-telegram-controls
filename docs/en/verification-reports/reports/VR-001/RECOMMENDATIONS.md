# VR-001: recommendations

[Report](README.md) | [All claims](CLAIMS.md) | [Українська](../../../../uk/verification-reports/reports/VR-001/RECOMMENDATIONS.md)

Source request: `REQ-0004`.

A recommendation is a preserved proposal, not proof of implementation, a standing instruction, a permission, or authority for a new Versie. It enters the current roadmap only through a new owner request.

| Claim | Status | Grade | Claim |
|---|---|---|---|
| [KH-DEC-001](CLAIMS.md#kh-dec-001) | `recommendation` | `E2` | Optimize the start threshold and small next action rather than processed-message volume. |
| [KH-DEC-002](CLAIMS.md#kh-dec-002) | `recommendation` | `E1` | The goal is a functional inbox with low executive cost, not Inbox Zero. |
| [KH-DEC-003](CLAIMS.md#kh-dec-003) | `recommendation` | `E2` | The digital service should be positioned as an assistive tool, not a replacement for treatment or a clinical system. |
| [KH-DEC-004](CLAIMS.md#kh-dec-004) | `recommendation` | `E2` | AI should orchestrate friction, energy, time, shame, and unfinished context rather than acting only as a summarizer. |
| [KH-DEC-005](CLAIMS.md#kh-dec-005) | `recommendation` | `E1` | Functional relief matters more than vanity KPIs such as the number of messages read. |
| [KH-DEC-006](CLAIMS.md#kh-dec-006) | `recommendation` | `E2` | Build the product on open standards and a proven open-source mail core; differentiate through proprietary UI, AI, and integration APIs. |
| [KH-DEC-007](CLAIMS.md#kh-dec-007) | `recommendation` | `E2` | Choose Stalwart plus custom web/mobile UX for modern-first B2C/B2B, or Mailcow plus a custom frontend/BFF for a fast MVP; retain a proprietary orchestration layer. |
| [KH-DEC-008](CLAIMS.md#kh-dec-008) | `recommendation` | `E2` | Do not replace every protocol with one interface; use fan-in/fan-out while supporting legacy and modern interfaces together. |
| [KH-DEC-009](CLAIMS.md#kh-dec-009) | `recommendation` | `E2` | Choose Mailcow for the best MVP time to value. |
| [KH-DEC-010](CLAIMS.md#kh-dec-010) | `recommendation` | `E2` | Choose Stalwart for a modern-first product because of native JMAP/DAV and API-first configuration and control. |
| [KH-DEC-011](CLAIMS.md#kh-dec-011) | `recommendation` | `E2` | For a long-term enterprise route with maximum control, consider Postfix plus Dovecot when a strong operations team is available. |
| [KH-DEC-012](CLAIMS.md#kh-dec-012) | `recommendation` | `E2` | Use Apps Script as an adapter and control plane, not the full data plane; move heavy operations outside. |
| [KH-DEC-013](CLAIMS.md#kh-dec-013) | `recommendation` | `E2` | Build the default bridge from Telegram Bot API, a Mini App, a proprietary backend, and Gmail API; use TDLib or a user-account flow only deliberately. |
| [KH-DEC-014](CLAIMS.md#kh-dec-014) | `recommendation` | `E2` | Use Rspamd as the primary filter for new systems; retain SpamAssassin for compatibility or legacy cases. |
| [KH-DEC-015](CLAIMS.md#kh-dec-015) | `recommendation` | `E2` | Keep MIME, PGP, S/MIME, and E2E in a separate replaceable capability layer and outside the MVP unless needed. |
| [KH-DEC-016](CLAIMS.md#kh-dec-016) | `recommendation` | `E2` | DAV strategy: integrated DAV/JMAP in Stalwart or Cyrus, or separate Radicale, Baikal, or SabreDAV; SOGo fills this role in Mailcow. |
| [KH-DEC-017](CLAIMS.md#kh-dec-017) | `recommendation` | `E2` | Build one integration facade over Gmail API, Microsoft Graph, Google People/Calendar, and Telegram APIs instead of placing provider logic in the frontend. |
| [KH-DEC-018](CLAIMS.md#kh-dec-018) | `recommendation` | `E2` | Implement undo send as a grace window before actual sending, not as post-delivery recall. |
| [KH-DEC-019](CLAIMS.md#kh-dec-019) | `recommendation` | `E2` | Build the integration bus with REST for commands and webhooks, SSE, or pub-sub for events. |
| [KH-DEC-020](CLAIMS.md#kh-dec-020) | `recommendation` | `E2` | ADHD-friendly UI means consistency, lower cognitive load, clear steps, predictable navigation, and distraction control, not decorative brightness. |
| [KH-DEC-022](CLAIMS.md#kh-dec-022) | `recommendation` | `E2` | The target architecture should be hybrid: a Gmail add-on, web app, and external event/worker layer. |
| [KH-DEC-023](CLAIMS.md#kh-dec-023) | `recommendation` | `E2` | Do not use continuous Apps Script polling; use `watch()` and `history.list` with a checkpoint. |
| [KH-DEC-024](CLAIMS.md#kh-dec-024) | `recommendation` | `E2` | Do not move the whole inbox into Telegram; use Mini Apps as dashboard and control, not a replacement for Gmail UX. |
| [KH-DEC-025](CLAIMS.md#kh-dec-025) | `recommendation` | `E2` | Hardening should separate secret management, state machine, ingress, Gmail operations, and notifications. |
| [KH-DEP-002](CLAIMS.md#kh-dep-002) | `recommendation` | `E1` | The protocol contract should cover SMTP, IMAP, POP3, modern JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhooks, and push. |
| [KH-DEP-005](CLAIMS.md#kh-dep-005) | `recommendation` | `E1` | Mailcow GitOps should cover `mailcow.conf`, `docker-compose.yml`, protected secrets and volumes, ingress, logs, SSO, observability, backups, and the integration service. |
| [KH-DEP-006](CLAIMS.md#kh-dep-006) | `recommendation` | `E1` | Baseline domain authentication is SPF, DKIM, and DMARC, with ARC for forwarding or lists; use established OpenDKIM, OpenDMARC, OpenARC, and Rspamd implementations. |
| [KH-DEP-008](CLAIMS.md#kh-dep-008) | `recommendation` | `E1` | For Node mail work, use ImapFlow, Nodemailer, and PostalMime instead of custom IMAP, SMTP, or MIME implementations. |
| [KH-DEP-009](CLAIMS.md#kh-dep-009) | `recommendation` | `E1` | Use Redis for cache, coordination, and short-lived jobs: delayed send, snooze, classification, OCR, retries, AI summaries, and push fan-out. |
| [KH-DEP-010](CLAIMS.md#kh-dep-010) | `recommendation` | `E1` | Heavy and long-running operations should execute outside Apps Script. |
| [KH-DEP-012](CLAIMS.md#kh-dep-012) | `recommendation` | `E1` | For third-party or open-source components, name the exact repository, library, or documentation source. |
| [KH-DEP-014](CLAIMS.md#kh-dep-014) | `recommendation` | `E1` | Pub/Sub and Cloud Run are needed for `watch`, webhook ingress, heavy jobs, retries, and idempotency. |
| [KH-DEP-020](CLAIMS.md#kh-dep-020) | `recommendation` | `E1` | Proposed components are `postal-mime`, `OpenPGP.js`, `Mailvelope`, `PKI.js`, and RFC 8551. |
| [KH-INS-001](CLAIMS.md#kh-ins-001) | `recommendation` | `E2` | The interface should provide one dominant action, stable context, low density, explicit progress, clear priorities, and exact resumption after interruption. |
| [KH-INS-002](CLAIMS.md#kh-ins-002) | `recommendation` | `E2` | Define one visually primary next action for each message. |
| [KH-INS-003](CLAIMS.md#kh-ins-003) | `recommendation` | `E2` | Use neutral, supportive, non-judgmental language. |
| [KH-INS-004](CLAIMS.md#kh-ins-004) | `recommendation` | `E2` | Focus mode should expose no more than three or four primary actions. |
| [KH-INS-005](CLAIMS.md#kh-ins-005) | `recommendation` | `E2` | WCAG 2.2 should be treated as the minimum and COGA as the quality standard for structure, focus, memory, summaries, personalization, human help, and interruption control. |
| [KH-INS-006](CLAIMS.md#kh-ins-006) | `recommendation` | `E2` | Focus mode should be a separate information architecture with one on-screen task, not a cosmetic theme. |
| [KH-INS-007](CLAIMS.md#kh-ins-007) | `recommendation` | `E2` | The system should minimize context loss and preserve position, draft, temporary classification, latest conversation, and intermediate decisions. |
| [KH-INS-008](CLAIMS.md#kh-ins-008) | `recommendation` | `E2` | Personalization should be adaptive, scenario-based, and gradual, using simple presets instead of lengthy configuration. |
| [KH-INS-009](CLAIMS.md#kh-ins-009) | `recommendation` | `E2` | An AI summary should include source links, a confidence indication, and fast access to the original. |
| [KH-INS-010](CLAIMS.md#kh-ins-010) | `recommendation` | `E2` | The visual mode should use few colors, one accent, large targets, a visible focus state, and adjustable density. |
| [KH-INS-011](CLAIMS.md#kh-ins-011) | `recommendation` | `E2` | Do not write an MTA, MDA, or groupware system from scratch; assemble the product from established server components. |
| [KH-INS-012](CLAIMS.md#kh-ins-012) | `recommendation` | `E2` | Separate transport security, domain authenticity, content protection, and abuse/phishing defense; apply TLS, MTA-STS, TLS-RPT, and, with DNSSEC, DANE. |
| [KH-INS-013](CLAIMS.md#kh-ins-013) | `recommendation` | `E2` | Do not create a custom mail server; invest in UX, interoperability, privacy, AI triage, and managed ecosystem integrations. |
| [KH-INS-014](CLAIMS.md#kh-ins-014) | `recommendation` | `E1` | Use logs, checkpoints, audit notes, test trails, and lessons learned; do not repeat completed stages without review. |
| [KH-INS-015](CLAIMS.md#kh-ins-015) | `recommendation` | `E1` | Work sequence: product core, master prompt, implementation recipe, audit, and operational cycle; verify capabilities in the actual environment. |
| [KH-INS-016](CLAIMS.md#kh-ins-016) | `recommendation` | `E1` | The agent should act as product architect, Workspace engineer, accessibility researcher, security reviewer, and release engineer, producing a technical delivery program. |
| [KH-INS-017](CLAIMS.md#kh-ins-017) | `recommendation` | `E1` | The agent should deliver sections A-R covering architecture, UX, modules, scopes, OAuth, integrations, audit, build/debug/release plans, tests, backlog, patches, and fallback paths. |
| [KH-INS-018](CLAIMS.md#kh-ins-018) | `recommendation` | `E1` | For recommendations, explain the problem, rationale, and pitfalls; state platform limits directly and provide a workaround. |
| [KH-INS-019](CLAIMS.md#kh-ins-019) | `recommendation` | `E2` | When a hybrid architecture using Apps Script, Cloud Run, Pub/Sub, and Storage is needed, design it explicitly. |
| [KH-INS-020](CLAIMS.md#kh-ins-020) | `recommendation` | `E1` | Do not hide tradeoffs or give vague advice; write as a delivery document for the implementation team. |
| [KH-INS-021](CLAIMS.md#kh-ins-021) | `recommendation` | `E1` | Codex should act as a controlled technical reviewer and verification-protocol executor; confirm browser, CDP, and runtime capability before use. |
| [KH-INS-022](CLAIMS.md#kh-ins-022) | `recommendation` | `E1` | The operational loop should be mandatory and cover actual UI, runtime, and network behavior, not only code reading. |
| [KH-ISS-009](CLAIMS.md#kh-iss-009) | `recommendation` | `E2` | Basic authentication should not be treated as a reliable Google or Microsoft path; modern authentication must be reflected in onboarding, account linking, and support. |
| [KH-LES-002](CLAIMS.md#kh-les-002) | `recommendation` | `E2` | An `action-only inbox` should leave only action-requiring messages in inbox or unread; folders should be broad, and filters should remove even small recurring noise. |
| [KH-LES-003](CLAIMS.md#kh-les-003) | `recommendation` | `E2` | A plain UI with the message text and three basic actions is more useful than extra affordances and complex menus. |
| [KH-LES-004](CLAIMS.md#kh-les-004) | `recommendation` | `E2` | Micro-start techniques should reduce uncertainty and require only one minimal movement. |
| [KH-LES-005](CLAIMS.md#kh-les-005) | `recommendation` | `E2` | Do not put metadata, blobs, search, and queues in one database; the data plane should be layered. |
| [KH-LES-007](CLAIMS.md#kh-les-007) | `recommendation` | `E0` | Building the frontend before a stable mail core creates integration instability; do not invert the work order. |
| [KH-LES-008](CLAIMS.md#kh-les-008) | `recommendation` | `E2` | Use time blindness, motivation, and dopamine as design models, not as a single explanation of ADHD. |
| [KH-LES-010](CLAIMS.md#kh-les-010) | `recommendation` | `E2` | An Apps Script web app should be thin ingress; split heavy synchronous work or move it outside. |
| [KH-PERM-002](CLAIMS.md#kh-perm-002) | `recommendation` | `E2` | A future Telegram surface should allow only explicitly selected actions: priority view, summary, quick reply, task confirmation, snooze, and triage; this is a product-scope candidate, not owner permission. |
| [KH-PLAN-001](CLAIMS.md#kh-plan-001) | `recommendation` | `E1` | Implementation should be evolutionary rather than a `big bang`. |
| [KH-PLAN-006](CLAIMS.md#kh-plan-006) | `recommendation` | `E1` | Mailcow deployment: clone, run `generate_config.sh`, edit `mailcow.conf`, then run `docker compose pull/up`; the production host must avoid MTU, port, and host-service conflicts. |
| [KH-PLAN-007](CLAIMS.md#kh-plan-007) | `recommendation` | `E1` | For Stalwart, allocate persistent storage, choose a backend, complete bootstrap, and configure domains, TLS, rate limits, spam policy, and the management API. |
| [KH-PLAN-009](CLAIMS.md#kh-plan-009) | `recommendation` | `E1` | Single-node or MVP: Stalwart with RocksDB or default Mailcow, file or S3 blobs, Redis ephemeral state, and basic stack search. |
| [KH-PLAN-010](CLAIMS.md#kh-plan-010) | `recommendation` | `E1` | Mid-scale or multi-tenant: PostgreSQL metadata, S3/MinIO blobs, Redis locks, queues, rate, session and cache state, plus a separate search backend when needed. |
| [KH-PLAN-012](CLAIMS.md#kh-plan-012) | `recommendation` | `E1` | Phase 1: fix the protocol contract, select the core, launch a reference deployment with SPF, DKIM, DMARC, MTA-STS, TLS-RPT, backups, logs, and monitoring, then add API/BFF and clients. |
| [KH-PLAN-015](CLAIMS.md#kh-plan-015) | `recommendation` | `E1` | Quick MVP stack: Mailcow core, Roundcube or custom web shell, bundled Rspamd, integration service, Redis jobs, ADHD shell, and AI triage. |
| [KH-PLAN-016](CLAIMS.md#kh-plan-016) | `recommendation` | `E1` | Long-term modern stack: Stalwart core, Bulwark as a reference or temporary client, proprietary orchestration, PostgreSQL scale backend, S3/MinIO, Redis, and custom clients. |
| [KH-PLAN-017](CLAIMS.md#kh-plan-017) | `recommendation` | `E1` | Predictability stack: Postfix, Dovecot, Rspamd, OpenDKIM, OpenDMARC, OpenARC, Roundcube, and optional DAV server; this requires the most integration work. |
| [KH-PLAN-026](CLAIMS.md#kh-plan-026) | `recommendation` | `E1` | CI/CD should use protected `CLASPRC_JSON` and `.clasp.json` in GitHub Actions without committing credential values. |
| [KH-PLAN-032](CLAIMS.md#kh-plan-032) | `recommendation` | `E1` | Add GitHub CodeQL. |
| [KH-PLAN-033](CLAIMS.md#kh-plan-033) | `recommendation` | `E1` | Enable secret scanning from day one. |
| [KH-PLAN-034](CLAIMS.md#kh-plan-034) | `recommendation` | `E1` | Add Dependabot for dependency alerts and updates. |
| [KH-PLAN-035](CLAIMS.md#kh-plan-035) | `recommendation` | `E1` | CI should include linting, manifest validation, dry-run push, a staging smoke test, and a separate security lane. |
| [KH-PLAN-037](CLAIMS.md#kh-plan-037) | `recommendation` | `E2` | Inspect `appsscript.json` first: Gmail scopes, `script.external_request`, triggers, capability boundaries, and add-on/web-app separation. |
| [KH-PLAN-038](CLAIMS.md#kh-plan-038) | `recommendation` | `E2` | Inspect code and Git history for hardcoded secret classes, direct webhook URLs, private identifiers in fixtures, and full request or response logging. |
| [KH-PROD-022](CLAIMS.md#kh-prod-022) | `recommendation` | `E1` | Modular trajectory: Postfix plus Dovecot with separate antispam, DKIM/DMARC/ARC, webmail, and DAV components. |
| [KH-PROD-023](CLAIMS.md#kh-prod-023) | `recommendation` | `E1` | Integrated container trajectory: Mailcow or Docker Mailserver for faster launch with less glue code. |
| [KH-PROD-024](CLAIMS.md#kh-prod-024) | `recommendation` | `E1` | All-in-one trajectory: Stalwart, with Maddy or Apache James for specific scenarios; Stalwart is the modern-first candidate. |
| [KH-PROD-025](CLAIMS.md#kh-prod-025) | `recommendation` | `E1` | Add Thunderbird autoconfig XML and track IETF auto-configuration to reduce onboarding friction. |
| [KH-PROD-034](CLAIMS.md#kh-prod-034) | `recommendation` | `E1` | Postfix `postscreen` is the recommended first perimeter layer before content filtering. |
| [KH-PROD-035](CLAIMS.md#kh-prod-035) | `recommendation` | `E1` | Webmail candidates: Roundcube for classic/plugin IMAP, SnappyMail for a lightweight UI, Nextcloud Mail for suite integration, and Bulwark for JMAP/Stalwart. |
| [KH-PROD-036](CLAIMS.md#kh-prod-036) | `recommendation` | `E1` | Delivery clients: web/PWA with service workers/VAPID, React Native or Flutter with APNs/FCM, and Tauri or Electron for desktop. |
| [KH-PRV-002](CLAIMS.md#kh-prv-002) | `recommendation` | `E2` | GDPR and ePrivacy controls should include encryption, access control, audit logs, minimization, contracts, retention, export and deletion, breach response, and residency. |
| [KH-PRV-003](CLAIMS.md#kh-prv-003) | `recommendation` | `E2` | Do not enable open tracking by default for EU-sensitive use cases; add legal gating, a preference center, granular opt-in, and separation of delivery from marketing telemetry. |
| [KH-PRV-004](CLAIMS.md#kh-prv-004) | `recommendation` | `E2` | Least privilege, clear data boundaries, minimal body extraction, and early verification-boundary planning are architectural requirements. |
| [KH-PRV-005](CLAIMS.md#kh-prv-005) | `recommendation` | `E2` | Do not store credentials in code; keep secrets in properties or an external vault and redact addresses, headers, and token fragments from logs. |
