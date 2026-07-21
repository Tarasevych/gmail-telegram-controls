# VR-001: tests, history, and release state

[Report](README.md) | [All claims](CLAIMS.md) | [Українська](../../../../uk/verification-reports/reports/VR-001/RELEASES.md)

Source request: `REQ-0004`. Claims: 36. `verified` 0, `contradicted` 2, `partial` 20, `unverified` 13, `blocked` 1, `recommendation` 0.

- Local tests: `399/399`, E3, without network/OAuth/runtime.
- Versie 1 target: [`2b3b9e2f678f`](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a).
- Release status: not promoted, tag/release branch absent, E4/E5 absent.
- Runtime changes: none performed.

| Claim | Status | Grade | Claim |
|---|---|---|---|
| [KH-EVD-001](CLAIMS.md#kh-evd-001) | `unverified` | `E0` | [verified in report only] Gmail and Outlook provide separate AI features but not the described coherent neuroinclusive model. |
| [KH-EVD-002](CLAIMS.md#kh-evd-002) | `partial` | `E3` | The reports associate ADHD with executive-function difficulties and use this to support decomposition and constrained choice. |
| [KH-EVD-003](CLAIMS.md#kh-evd-003) | `partial` | `E3` | The reports describe heterogeneous time-perception difficulties as support for time-oriented UI. |
| [KH-EVD-004](CLAIMS.md#kh-evd-004) | `partial` | `E3` | [verified in report only] Motivation and reward models explain a preference for immediate nearby rewards over delayed routine benefits. |
| [KH-EVD-005](CLAIMS.md#kh-evd-005) | `unverified` | `E0` | [verified in report only] Depressive symptoms can turn the inbox into a reminder of unmet obligations. |
| [KH-EVD-006](CLAIMS.md#kh-evd-006) | `unverified` | `E0` | The reports associate ADHD and depression comorbidity with greater executive, motivational, and emotional burden. |
| [KH-EVD-007](CLAIMS.md#kh-evd-007) | `partial` | `E3` | [verified in report only] Neurodivergent authors and users describe `Inbox Functional` as more practical than an empty inbox. |
| [KH-EVD-008](CLAIMS.md#kh-evd-008) | `partial` | `E3` | The reports describe batching and limited check windows as ways to reduce continuous reacting and stress. |
| [KH-EVD-009](CLAIMS.md#kh-evd-009) | `partial` | `E3` | [verified in report only] `Send later` and an editable pre-send interval are described as reducing anxiety and perfectionism-driven avoidance. |
| [KH-EVD-010](CLAIMS.md#kh-evd-010) | `partial` | `E3` | [verified in report only] Body doubling, virtual co-working, and light presence are described as practical ways to overcome the start barrier; the report calls email-specific evidence weaker. |
| [KH-EVD-011](CLAIMS.md#kh-evd-011) | `unverified` | `E0` | [verified in report only] Gmail provides `AI Overview` and deadline reminders. |
| [KH-EVD-012](CLAIMS.md#kh-evd-012) | `unverified` | `E0` | [verified in report only] Outlook/Copilot provides cited summaries, attachment analysis, prioritization, rule creation, and automatic replies. |
| [KH-EVD-013](CLAIMS.md#kh-evd-013) | `unverified` | `E0` | The report maps SMTP, IMAP, POP3, JMAP, and JMAP over WebSocket to RFC 5321, 3501, 1939, 8620, 8621, and 8887. |
| [KH-EVD-014](CLAIMS.md#kh-evd-014) | `unverified` | `E0` | The report claims that 2026 CNIL and Garante materials raise consent concerns for email tracking pixels. |
| [KH-EVD-015](CLAIMS.md#kh-evd-015) | `partial` | `E3` | Existing project core and v45 are the current working base. |
| [KH-EVD-016](CLAIMS.md#kh-evd-016) | `contradicted` | `E2` | Gmail add-ons use card UI; contextual triggers run for opened messages and are unconditional in the manifest. |
| [KH-EVD-017](CLAIMS.md#kh-evd-017) | `unverified` | `E0` | Dopaminergic systems are relevant, but a simple dopamine-deficit model is described as reductive. |
| [KH-EVD-018](CLAIMS.md#kh-evd-018) | `partial` | `E3` | The report cites W3C and research to support fewer interruptions, focus, and reduced content. |
| [KH-EVD-019](CLAIMS.md#kh-evd-019) | `partial` | `E3` | The report claims Gmail API supports drafts, sending, attachment retrieval, and raw-message operations. |
| [KH-EVD-020](CLAIMS.md#kh-evd-020) | `partial` | `E3` | Telegram Bot API is HTTP-based and suitable for short-command control. |
| [KH-EVD-021](CLAIMS.md#kh-evd-021) | `partial` | `E3` | The report claims Gmail add-ons and restricted scopes have minimization and verification requirements. |
| [KH-EVD-022](CLAIMS.md#kh-evd-022) | `unverified` | `E0` | `apps-script-oauth2` recommends Properties/Cache/Lock and warns about refresh races. |
| [KH-EVD-023](CLAIMS.md#kh-evd-023) | `partial` | `E2` | `clasp`, CodeQL, secret scanning and Dependabot are described as release/security controls. |
| [KH-EVD-024](CLAIMS.md#kh-evd-024) | `partial` | `E3` | The report describes Apps Script execution limits and the need for continuation state or an external worker for long operations. |
| [KH-EVD-025](CLAIMS.md#kh-evd-025) | `unverified` | `E0` | Codex documentation is cited in support of context/tool/environment-aware workflows. |
| [KH-EVD-026](CLAIMS.md#kh-evd-026) | `blocked` | `E0` | Public indexing of `github.com/[PRIVATE]/gmail-telegram-controls` could not be confirmed. |
| [KH-EVD-027](CLAIMS.md#kh-evd-027) | `partial` | `E3` | Gmail cards, `doGet`/`doPost`, Gmail API resources, `watch`, OAuth storage/locks and scope verification are cited as platform constraints. |
| [KH-EVD-028](CLAIMS.md#kh-evd-028) | `partial` | `E3` | The report attributes contextual UI to add-ons, richer UX to web apps, automation to Gmail API, event reliability to Pub/Sub/Cloud Run and state control to Properties/Cache/Lock. |
| [KH-EVD-029](CLAIMS.md#kh-evd-029) | `partial` | `E2` | The report describes clasp as an open-source route for local directory-based development, versioning, and deployment. |
| [KH-EVD-030](CLAIMS.md#kh-evd-030) | `partial` | `E3` | Gmail `watch()` uses Pub/Sub and `history.list`/`startHistoryId` for change synchronization. |
| [KH-HIS-001](CLAIMS.md#kh-his-001) | `unverified` | `E1` | Embedded markers such as `turn...view/search` are technical provenance references that require separate resolution during migration. |
| [KH-HIS-002](CLAIMS.md#kh-his-002) | `unverified` | `E0` | Do not classify EmailEngine as FOSS: the report describes it as formerly open source and now a source-available commercial unified email layer. |
| [KH-HIS-003](CLAIMS.md#kh-his-003) | `unverified` | `E0` | Mailparser is marked as maintenance-mode or legacy; PostalMime is recommended for new projects. |
| [KH-HIS-004](CLAIMS.md#kh-his-004) | `partial` | `E1` | Work continues from the existing core at `[PRIVATE]`, not from an empty state. |
| [KH-HIS-005](CLAIMS.md#kh-his-005) | `contradicted` | `E2` | `gmail-telegram-v45-gentle-milestones` is designated as the current baseline artifact. |
| [KH-HIS-006](CLAIMS.md#kh-his-006) | `partial` | `E1` | `gmail-telegram-v44-co-processing`, `gmail-telegram-notifier`, and other release lines are retained as prior experience. |
