# Lessons

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [Українська](../../uk/knowledge-hub/README.md)

> Draft knowledge hub. Every claim derives only from sanitized report extractions, is not independently verified, and does not prove live deployment or current state.

Lessons retain provenance and do not replace applicability checks.

| Canonical ID | Normalized statement | Source IDs | Lifecycle | Implementation | Conflicts | Gate |
|---|---|---|---|---|---|---|
| KH-LES-001 | The main problem is often not reading a message but retaining the plan for what to do with it next. | [R1-009](sources/REPORT-1.md#source-items) | current | unknown | none | Validate applicability to the selected scope and record the decision. |
| KH-LES-002 | An `action-only inbox` should leave only action-requiring messages in inbox or unread; folders should be broad, and filters should remove even small recurring noise. | [R1-068](sources/REPORT-1.md#source-items) | current | unknown | none | Validate applicability to the selected scope and record the decision. |
| KH-LES-003 | A plain UI with the message text and three basic actions is more useful than extra affordances and complex menus. | [R1-069](sources/REPORT-1.md#source-items) | current | unknown | none | Validate applicability to the selected scope and record the decision. |
| KH-LES-004 | Micro-start techniques should reduce uncertainty and require only one minimal movement. | [R1-072](sources/REPORT-1.md#source-items) | current | unknown | none | Validate applicability to the selected scope and record the decision. |
| KH-LES-005 | Do not put metadata, blobs, search, and queues in one database; the data plane should be layered. | [R2-052](sources/REPORT-2.md#source-items) | proposed | planned | none | Validate applicability to the selected scope and record the decision. |
| KH-LES-006 | Reported user patterns include timed triage, archiving or deleting stale mail, fixed check windows, one quick email, and calendar or snooze linkage. | [R2-061](sources/REPORT-2.md#source-items) | unverified | unknown | none | Validate applicability to the selected scope and record the decision. |
| KH-LES-007 | Building the frontend before a stable mail core creates integration instability; do not invert the work order. | [R2-073](sources/REPORT-2.md#source-items) | proposed | planned | none | Validate applicability to the selected scope and record the decision. |
| KH-LES-008 | Use time blindness, motivation, and dopamine as design models, not as a single explanation of ADHD. | [R3-007](sources/REPORT-3.md#source-items) | current | unknown | none | Validate applicability to the selected scope and record the decision. |
| KH-LES-010 | An Apps Script web app should be thin ingress; split heavy synchronous work or move it outside. | [R3-062](sources/REPORT-3.md#source-items) | current | planned | none | Validate applicability to the selected scope and record the decision. |
| KH-LES-011 | Working principle: minimum theory, maximum controlled verification, clear next actions, and controlled progress. | [R3-082](sources/REPORT-3.md#source-items) | current | unknown | none | Validate applicability to the selected scope and record the decision. |
| KH-LES-009 | The repository tree is an architectural recommendation, not a Google canonical structure; it separates UI, business logic, integrations, background jobs, and security. | [R3-101](sources/REPORT-3.md#source-items) | current | unknown | none | Validate applicability to the selected scope and record the decision. |

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
