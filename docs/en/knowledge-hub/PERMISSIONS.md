# Permissions and privacy references

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [Українська](../../uk/knowledge-hub/README.md)

> Draft knowledge hub. Every claim derives only from sanitized report extractions, is not independently verified, and does not prove live deployment or current state.

> This page is a candidate/reference index only. It creates no authority, grants, or consent. Every entry requires reconciliation with the canonical permission branch.

## Explicit-owner-quote evidence

| Report | Evidence | Disposition |
|---|---|---|
| R1 | none detected | canonical reconciliation required |
| R2 | none detected | canonical reconciliation required |
| R3 | none detected | canonical reconciliation required |

## Permission candidates

| Canonical ID | Normalized statement | Source IDs | Lifecycle | Implementation | Conflicts | Gate |
|---|---|---|---|---|---|---|
| KH-PERM-001 | High-risk actions are allowed only after explicit user confirmation; this is a proposed permission gate, not granted authority. | [R1-034](sources/REPORT-1.md#source-items) | proposed | planned | none | Requires canonical branch reconciliation, an explicit owner quote, scope, duration, and revocation path. |
| KH-PERM-002 | A future Telegram surface should allow only explicitly selected actions: priority view, summary, quick reply, task confirmation, snooze, and triage; this is a product-scope candidate, not owner permission. | [R2-032](sources/REPORT-2.md#source-items) | proposed | planned | none | Requires canonical branch reconciliation, an explicit owner quote, scope, duration, and revocation path. |
| KH-PERM-003 | Browser, CDP, and runtime tools may be considered only after checking capability and permissions; this is not owner-granted permission. | [R3-030](sources/REPORT-3.md#source-items) | proposed | unknown | none | Requires canonical branch reconciliation, an explicit owner quote, scope, duration, and revocation path. |

## Privacy constraints as references

These records are recommendations or constraints, not permissions.

| Canonical ID | Normalized statement | Source IDs | Lifecycle | Implementation | Conflicts | Gate |
|---|---|---|---|---|---|---|
| KH-PRV-001 | The report describes AI processing of email content but does not specify retention, data minimization, encryption, provider boundaries, or data deletion. | [R1-065](sources/REPORT-1.md#source-items) | unverified | unknown | none | Complete privacy/security review, data-flow map, lawful-basis, and retention gates. |
| KH-PRV-002 | GDPR and ePrivacy controls should include encryption, access control, audit logs, minimization, contracts, retention, export and deletion, breach response, and residency. | [R2-039](sources/REPORT-2.md#source-items) | proposed | planned | none | Complete privacy/security review, data-flow map, lawful-basis, and retention gates. |
| KH-PRV-003 | Do not enable open tracking by default for EU-sensitive use cases; add legal gating, a preference center, granular opt-in, and separation of delivery from marketing telemetry. | [R2-041](sources/REPORT-2.md#source-items) | proposed | planned | none | Complete privacy/security review, data-flow map, lawful-basis, and retention gates. |
| KH-PRV-004 | Least privilege, clear data boundaries, minimal body extraction, and early verification-boundary planning are architectural requirements. | [R3-042](sources/REPORT-3.md#source-items), [R3-102](sources/REPORT-3.md#source-items) | proposed | planned | none | Complete privacy/security review, data-flow map, lawful-basis, and retention gates. |
| KH-PRV-005 | Do not store credentials in code; keep secrets in properties or an external vault and redact addresses, headers, and token fragments from logs. | [R3-047](sources/REPORT-3.md#source-items) | proposed | planned | none | Complete privacy/security review, data-flow map, lawful-basis, and retention gates. |

## Reconciliation gate

1. Reconcile the source candidate with the canonical permission branch.
2. Obtain an explicit owner quote for the specific action and scope.
3. Record duration, revocation, confirmation boundary, and audit evidence.
4. Until the gate is complete, treat authority as absent.

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.

## Canonical status

This page grants no authority. The [Повноваження branch](https://github.com/Tarasevych/gmail-telegram-controls/tree/%D0%9F%D0%BE%D0%B2%D0%BD%D0%BE%D0%B2%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F) is the only source of active permissions; report-derived candidates require a separate direct owner decision.
