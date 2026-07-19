# Problems and risks

[Home](README.md) | [Roadmap](MASTER_ROADMAP.md) | [Traceability](TRACEABILITY.md) | [Українська](../../uk/knowledge-hub/README.md)

> Draft knowledge hub. Every claim derives only from sanitized report extractions, is not independently verified, and does not prove live deployment or current state.

Confirmed product problems and unverified audit risks are kept separate.

| Canonical ID | Normalized statement | Source IDs | Lifecycle | Implementation | Conflicts | Gate |
|---|---|---|---|---|---|---|
| KH-ISS-001 | Email creates a stream of micro-decisions, context switches, time estimates, and social pressure; ADHD and depression can turn this into start paralysis. | [R1-001](sources/REPORT-1.md#source-items) | current | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-002 | Push notifications, badges, banners, and other interruptions can impair focus and become part of the problem. | [R1-013](sources/REPORT-1.md#source-items) | current | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-003 | Red counters, aggressive reminders, public streaks, and judgmental language can intensify avoidance and harm adoption and retention. | [R1-020](sources/REPORT-1.md#source-items) | current | unknown | CF-005 | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-004 | AI summaries can be inaccurate or vulnerable to prompt injection through email content. | [R1-032](sources/REPORT-1.md#source-items) | current | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-005 | Over-gamification can encourage impulsive use without long-term benefit. | [R1-059](sources/REPORT-1.md#source-items) | proposed | unknown | CF-005 | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-006 | `AI overreach`: summaries without citations, opaque logic, and automatic actions without confirmation. | [R1-060](sources/REPORT-1.md#source-items) | proposed | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-007 | Low-energy mode will fail if it does not degrade to a genuinely simple mode. | [R1-061](sources/REPORT-1.md#source-items) | proposed | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-008 | Complex authentication, lengthy onboarding, and repeated data entry create hidden barriers. | [R1-062](sources/REPORT-1.md#source-items) | proposed | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-009 | Basic authentication should not be treated as a reliable Google or Microsoft path; modern authentication must be reflected in onboarding, account linking, and support. | [R2-011](sources/REPORT-2.md#source-items) | current | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-010 | There is no single official Telegram-to-Gmail API; the bridge must combine independent Telegram and Google interfaces. | [R2-029](sources/REPORT-2.md#source-items) | current | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-011 | Postfix/Dovecot full-text search often requires a separate Solr or Flatcurve/Xapian design; Stalwart models search as a separate native store. | [R2-055](sources/REPORT-2.md#source-items) | current | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-012 | Dovecot CE plus `dsync` is not a ready cluster control plane; an HA or multi-region roadmap may favor Stalwart or another unified stack. | [R2-057](sources/REPORT-2.md#source-items) | current | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-013 | Parallel token refresh can cause a race condition without locking. | [R3-046](sources/REPORT-3.md#source-items) | current | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-014 | An overbroad Gmail scope creates verification-failure risk and increases blast radius; no actual defect is confirmed. | [R3-057](sources/REPORT-3.md#source-items) | unverified | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-015 | Unredacted logging of external responses could disclose a token or private mail content; no actual instance is confirmed. | [R3-059](sources/REPORT-3.md#source-items) | unverified | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-016 | Expected risk: an external URL without allowlisting or validation. | [R3-063](sources/REPORT-3.md#source-items) | unverified | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-017 | Expected risk: unescaped HTML or user-generated strings. | [R3-064](sources/REPORT-3.md#source-items) | unverified | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-018 | Expected risk: all task state stored in one large JSON blob in `PropertiesService`. | [R3-065](sources/REPORT-3.md#source-items) | unverified | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-019 | Expected risk: inbox labels used as the sole source of truth. | [R3-066](sources/REPORT-3.md#source-items) | unverified | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-020 | Expected risk: secrets written to `Logger.log()` or `console.log()`. | [R3-067](sources/REPORT-3.md#source-items) | unverified | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-021 | Expected risk: a one-shot polling loop silently ending at the execution limit. | [R3-068](sources/REPORT-3.md#source-items) | unverified | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-022 | Expected risk: an overly broad OAuth consent surface. | [R3-069](sources/REPORT-3.md#source-items) | unverified | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |
| KH-ISS-023 | Expected risk: a webhook without replay protection. | [R3-070](sources/REPORT-3.md#source-items) | unverified | unknown | none | Reproduce or confirm with evidence; do not call a hypothetical risk a defect. |

## Confirmed versus hypothetical

No repository defect is confirmed by the reports. These audit risks are expected and unverified: KH-ISS-014, KH-ISS-015, KH-ISS-016, KH-ISS-017, KH-ISS-018, KH-ISS-019, KH-ISS-020, KH-ISS-021, KH-ISS-022, KH-ISS-023.

Blocked repository audit: KH-PLAN-036.

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
