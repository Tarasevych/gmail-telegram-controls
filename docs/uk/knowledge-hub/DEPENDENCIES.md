# Залежності

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [English](../../en/knowledge-hub/README.md)

> Чернетка knowledge hub. Усі твердження походять лише із санітизованих екстракцій звітів, не перевірені незалежно й не доводять live deployment або поточний стан.

Усі platform/library claims потребують актуальної capability, version, license і limit verification.

## Dependency map

| Domain | Canonical IDs | Gate |
|---|---|---|
| Accessibility | KH-DEP-001 | Перевірити актуальну capability, version, license, limits і integration contract. |
| Mail standards and providers | KH-DEP-002, KH-DEP-003, KH-DEP-004, KH-DEP-006, KH-DEP-007 | Перевірити актуальну capability, version, license, limits і integration contract. |
| Mail implementation libraries | KH-DEP-008, KH-DEP-009 | Перевірити актуальну capability, version, license, limits і integration contract. |
| Google/Gmail runtime | KH-DEP-010, KH-DEP-011, KH-DEP-016, KH-DEP-019, KH-DEP-017, KH-DEP-013, KH-DEP-014, KH-DEP-015, KH-DEP-018 | Перевірити актуальну capability, version, license, limits і integration contract. |
| MIME and E2E | KH-DEP-020 | Перевірити актуальну capability, version, license, limits і integration contract. |
| Source attribution | KH-DEP-012 | Перевірити актуальну capability, version, license, limits і integration contract. |

## Canonical dependency register

| Canonical ID | Нормалізоване твердження | Source IDs | Lifecycle | Implementation | Конфлікти | Gate |
|---|---|---|---|---|---|---|
| KH-DEP-001 | WCAG 2.2 є базовим рівнем; для когнітивної доступності потрібні також W3C COGA-настанови. | [R1-003](sources/REPORT-1.md#source-items) | current | unknown | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-002 | Протокольний контракт має охоплювати SMTP, IMAP, POP3 та сучасні JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhooks і push. | [R2-002](sources/REPORT-2.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-003 | Врахувати різні provider paths: Google/Apple DAV, Microsoft Graph для Microsoft 365 та комбіновану JMAP/IMAP/POP/DAV модель Fastmail. | [R2-009](sources/REPORT-2.md#source-items) | current | unknown | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-004 | Підтримувати password-over-TLS для self-hosted/legacy і OAuth 2.0/XOAUTH2 для сучасних зовнішніх акаунтів. | [R2-010](sources/REPORT-2.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-005 | GitOps для Mailcow має охоплювати `mailcow.conf`, `docker-compose.yml`, protected secrets/volumes, ingress, logs, SSO, observability, backups та integration service. | [R2-024](sources/REPORT-2.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-006 | Базова domain authentication: SPF, DKIM, DMARC; ARC для forwarding/listserv; використовувати готові OpenDKIM/OpenDMARC/OpenARC/Rspamd implementations. | [R2-034](sources/REPORT-2.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-007 | OpenPGP і S/MIME потребують окремих operational models; доступні OpenPGP.js, Mailvelope, OpenSSL CMS, Bouncy Castle і PKI.js. | [R2-037](sources/REPORT-2.md#source-items) | current | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-008 | Для Node mail work використовувати ImapFlow, Nodemailer і PostalMime замість власного IMAP/SMTP/MIME implementation. | [R2-046](sources/REPORT-2.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-009 | Redis використовувати для cache, coordination і short-lived jobs: delayed send, snooze, classification, OCR, retries, AI summaries та push fan-out. | [R2-056](sources/REPORT-2.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-010 | Важкі та довготривалі операції мають виконуватися поза Apps Script. | [R3-021](sources/REPORT-3.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-011 | Передбачені Gmail add-on, web app, installable triggers, `PropertiesService`, `CacheService`, `LockService`, `UrlFetchApp` і advanced Google services. | [R3-025](sources/REPORT-3.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-016 | Sensitive або restricted Gmail scopes можуть вимагати standard Cloud project, verification і додаткових safeguards. | [R3-043](sources/REPORT-3.md#source-items), [R3-103](sources/REPORT-3.md#source-items) | current | unknown | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-019 | Для Google-to-Google flow передбачено manifest scopes і `ScriptApp.getOAuthToken()`. | [R3-044](sources/REPORT-3.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-017 | Для зовнішніх OAuth providers використовувати apps-script-oauth2 з Properties, Cache і Lock practices. | [R3-045](sources/REPORT-3.md#source-items), [R3-106](sources/REPORT-3.md#source-items) | proposed | planned | CF-002 | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-020 | Запропоновані `postal-mime`, `OpenPGP.js`, `Mailvelope`, `PKI.js` і RFC 8551. | [R3-049](sources/REPORT-3.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-012 | Для сторонніх або open-source components слід вказувати точний repository, library або documentation source. | [R3-084](sources/REPORT-3.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-013 | Gmail API потрібен для history, drafts/delayed send і attachments. | [R3-094](sources/REPORT-3.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-014 | Pub/Sub і Cloud Run потрібні для `watch`, webhook ingress, heavy jobs, retries та idempotency. | [R3-095](sources/REPORT-3.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-015 | `PropertiesService`, `CacheService`, `LockService` потрібні для state, cache, refresh locking і continuation. | [R3-096](sources/REPORT-3.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |
| KH-DEP-018 | Event continuation залежить від `startHistoryId`, checkpoint state, `PropertiesService` і triggers. | [R3-115](sources/REPORT-3.md#source-items) | proposed | planned | none | Перевірити актуальну capability, version, license, limits і integration contract. |

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
