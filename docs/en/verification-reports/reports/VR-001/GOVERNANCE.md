# VR-001: governance and owner-granted permissions

[Report](README.md) | [All claims](CLAIMS.md) | [Українська](../../../../uk/verification-reports/reports/VR-001/GOVERNANCE.md)

Source request: `REQ-0004`. Claims: 30. `verified` 0, `contradicted` 0, `partial` 2, `unverified` 1, `blocked` 0, `recommendation` 27.

No report-derived recommendation became a standing instruction or owner authority through repetition. Canonical permission requires both a Permissions record and a traceable owner request. P-001 through P-004 lack sufficient REQ-ID provenance, so they did not receive verified permission status.

| Claim | Status | Grade | Claim |
|---|---|---|---|
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
| [KH-PERM-001](CLAIMS.md#kh-perm-001) | `partial` | `E1` | High-risk actions are allowed only after explicit user confirmation; this is a proposed permission gate, not granted authority. |
| [KH-PERM-002](CLAIMS.md#kh-perm-002) | `recommendation` | `E2` | A future Telegram surface should allow only explicitly selected actions: priority view, summary, quick reply, task confirmation, snooze, and triage; this is a product-scope candidate, not owner permission. |
| [KH-PERM-003](CLAIMS.md#kh-perm-003) | `partial` | `E1` | Browser, CDP, and runtime tools may be considered only after checking capability and permissions; this is not owner-granted permission. |
| [KH-PRV-001](CLAIMS.md#kh-prv-001) | `unverified` | `E0` | The report describes AI processing of email content but does not specify retention, data minimization, encryption, provider boundaries, or data deletion. |
| [KH-PRV-002](CLAIMS.md#kh-prv-002) | `recommendation` | `E2` | GDPR and ePrivacy controls should include encryption, access control, audit logs, minimization, contracts, retention, export and deletion, breach response, and residency. |
| [KH-PRV-003](CLAIMS.md#kh-prv-003) | `recommendation` | `E2` | Do not enable open tracking by default for EU-sensitive use cases; add legal gating, a preference center, granular opt-in, and separation of delivery from marketing telemetry. |
| [KH-PRV-004](CLAIMS.md#kh-prv-004) | `recommendation` | `E2` | Least privilege, clear data boundaries, minimal body extraction, and early verification-boundary planning are architectural requirements. |
| [KH-PRV-005](CLAIMS.md#kh-prv-005) | `recommendation` | `E2` | Do not store credentials in code; keep secrets in properties or an external vault and redact addresses, headers, and token fragments from logs. |
