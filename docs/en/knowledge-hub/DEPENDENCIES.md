# Dependencies

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [Українська](../../uk/knowledge-hub/README.md)

> Draft knowledge hub. Every claim derives only from sanitized report extractions, is not independently verified, and does not prove live deployment or current state.

Every platform or library claim requires current capability, version, license, and limit verification.

## Dependency map

| Domain | Canonical IDs | Gate |
|---|---|---|
| Accessibility | KH-DEP-001 | Verify current capability, version, license, limits, and integration contract. |
| Mail standards and providers | KH-DEP-002, KH-DEP-003, KH-DEP-004, KH-DEP-006, KH-DEP-007 | Verify current capability, version, license, limits, and integration contract. |
| Mail implementation libraries | KH-DEP-008, KH-DEP-009 | Verify current capability, version, license, limits, and integration contract. |
| Google/Gmail runtime | KH-DEP-010, KH-DEP-011, KH-DEP-016, KH-DEP-019, KH-DEP-017, KH-DEP-013, KH-DEP-014, KH-DEP-015, KH-DEP-018 | Verify current capability, version, license, limits, and integration contract. |
| MIME and E2E | KH-DEP-020 | Verify current capability, version, license, limits, and integration contract. |
| Source attribution | KH-DEP-012 | Verify current capability, version, license, limits, and integration contract. |

## Canonical dependency register

| Canonical ID | Normalized statement | Source IDs | Lifecycle | Implementation | Conflicts | Gate |
|---|---|---|---|---|---|---|
| KH-DEP-001 | WCAG 2.2 is the baseline; W3C COGA guidance is also needed for cognitive accessibility. | [R1-003](sources/REPORT-1.md#source-items) | current | unknown | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-002 | The protocol contract should cover SMTP, IMAP, POP3, modern JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhooks, and push. | [R2-002](sources/REPORT-2.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-003 | Account for different provider paths: Google and Apple DAV, Microsoft Graph for Microsoft 365, and Fastmail's combined JMAP/IMAP/POP/DAV model. | [R2-009](sources/REPORT-2.md#source-items) | current | unknown | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-004 | Support password-over-TLS for self-hosted or legacy systems and OAuth 2.0/XOAUTH2 for modern external accounts. | [R2-010](sources/REPORT-2.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-005 | Mailcow GitOps should cover `mailcow.conf`, `docker-compose.yml`, protected secrets and volumes, ingress, logs, SSO, observability, backups, and the integration service. | [R2-024](sources/REPORT-2.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-006 | Baseline domain authentication is SPF, DKIM, and DMARC, with ARC for forwarding or lists; use established OpenDKIM, OpenDMARC, OpenARC, and Rspamd implementations. | [R2-034](sources/REPORT-2.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-007 | OpenPGP and S/MIME require separate operational models; available components include OpenPGP.js, Mailvelope, OpenSSL CMS, Bouncy Castle, and PKI.js. | [R2-037](sources/REPORT-2.md#source-items) | current | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-008 | For Node mail work, use ImapFlow, Nodemailer, and PostalMime instead of custom IMAP, SMTP, or MIME implementations. | [R2-046](sources/REPORT-2.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-009 | Use Redis for cache, coordination, and short-lived jobs: delayed send, snooze, classification, OCR, retries, AI summaries, and push fan-out. | [R2-056](sources/REPORT-2.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-010 | Heavy and long-running operations should execute outside Apps Script. | [R3-021](sources/REPORT-3.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-011 | The design anticipates a Gmail add-on, web app, installable triggers, `PropertiesService`, `CacheService`, `LockService`, `UrlFetchApp`, and advanced Google services. | [R3-025](sources/REPORT-3.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-016 | Sensitive or restricted Gmail scopes may require a standard Cloud project, verification, and additional safeguards. | [R3-043](sources/REPORT-3.md#source-items), [R3-103](sources/REPORT-3.md#source-items) | current | unknown | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-019 | For Google-to-Google flow, use manifest scopes and `ScriptApp.getOAuthToken()`. | [R3-044](sources/REPORT-3.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-017 | For external OAuth providers, use apps-script-oauth2 with Properties, Cache, and Lock practices. | [R3-045](sources/REPORT-3.md#source-items), [R3-106](sources/REPORT-3.md#source-items) | proposed | planned | CF-002 | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-020 | Proposed components are `postal-mime`, `OpenPGP.js`, `Mailvelope`, `PKI.js`, and RFC 8551. | [R3-049](sources/REPORT-3.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-012 | For third-party or open-source components, name the exact repository, library, or documentation source. | [R3-084](sources/REPORT-3.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-013 | Gmail API is needed for history, drafts, delayed send, and attachments. | [R3-094](sources/REPORT-3.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-014 | Pub/Sub and Cloud Run are needed for `watch`, webhook ingress, heavy jobs, retries, and idempotency. | [R3-095](sources/REPORT-3.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-015 | `PropertiesService`, `CacheService`, and `LockService` are needed for state, cache, refresh locking, and continuation. | [R3-096](sources/REPORT-3.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |
| KH-DEP-018 | Event continuation depends on `startHistoryId`, checkpoint state, `PropertiesService`, and triggers. | [R3-115](sources/REPORT-3.md#source-items) | proposed | planned | none | Verify current capability, version, license, limits, and integration contract. |

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
