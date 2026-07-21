# VR-001 atomic claim ledger

[Report](README.md) | [Schema](../../REPORT_SCHEMA.md) | [Evidence policy](../../EVIDENCE_POLICY.md) | [Українська](../../../../uk/verification-reports/reports/VR-001/CLAIMS.md)

Source request: `REQ-0004`. Every entry links to VR-001, the current project, exact report-derived provenance, and primary Git evidence.

## KH-DEC-001

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Optimize the start threshold and small next action rather than processed-message volume.
- Implementation status: implemented_in_tracked_focus_candidate_static_only
- Dependencies: Owner-defined outcome criteria; Read-only usability or outcome evidence
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-002](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-062](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Evidence 2: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/docs/design/focus-view-v28-spec.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit introduced Focus View across UI, backend, tests, and specification artifacts.
- Evidence 3: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added energy-aware Focus sessions across implementation, tests, and the product contract.
- Limitations: Static artifacts verify design and implementation intent, not reduced start friction in use or current runtime behavior.

## KH-DEC-002

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E1`
- Claim: The goal is a functional inbox with low executive cost, not Inbox Zero.
- Implementation status: implementation_artifacts_present_static_only
- Dependencies: Resolution of CF-008; Owner adoption record; Outcome validation
- Conflicts: CF-008
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-004](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-010](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/product/functional-relief-metrics-v41.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/385f1dc5b2a04091d2bc9c471e52595570c6ee3c/docs/product/functional-relief-metrics-v41.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added functional-relief metric artifacts and changed the Apps Script implementation and static test contracts.
- Limitations: The immutable commit verifies occurrence of a functional-relief metrics phase, not user benefit, lifecycle supersession, or runtime state.

## KH-DEC-003

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: The digital service should be positioned as an assistive tool, not a replacement for treatment or a clinical system.
- Implementation status: no_explicit_clinical_positioning_policy_found
- Dependencies: Owner-approved product positioning; Legal or clinical review if health claims are introduced
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-025](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Limitations: The inspected release and implementation artifacts define a mail client but do not establish an explicit clinical disclaimer; absence in Git does not prove external positioning.

## KH-DEC-004

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: AI should orchestrate friction, energy, time, shame, and unfinished context rather than acting only as a summarizer.
- Implementation status: partially_aligned_without_ai_orchestration
- Dependencies: Explicit AI architecture decision; Privacy and safety review; User outcome validation
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-029](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Evidence 2: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added energy-aware Focus sessions across implementation, tests, and the product contract.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; The backend contains bounded attention and mail workflows, but no general AI orchestration layer was identified.
- Limitations: The tracked summary is documented as local heuristic processing rather than a generative model; no runtime or user-outcome proof was permitted.

## KH-DEC-005

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E1`
- Claim: Functional relief matters more than vanity KPIs such as the number of messages read.
- Implementation status: functional_relief_metric_artifacts_present
- Dependencies: Owner-approved metric definitions; Privacy-preserving outcome validation
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-058](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/product/functional-relief-metrics-v41.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/385f1dc5b2a04091d2bc9c471e52595570c6ee3c/docs/product/functional-relief-metrics-v41.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added functional-relief metric artifacts and changed the Apps Script implementation and static test contracts.
- Limitations: Commit evidence verifies that metrics artifacts were added, not metric validity, collection, or production use.

## KH-DEC-006

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: Build the product on open standards and a proven open-source mail core; differentiate through proprietary UI, AI, and integration APIs.
- Implementation status: not_implemented_in_current_gmail_apps_script_scope
- Dependencies: Resolution of CF-006; Owner architecture decision; Mail-core selection and migration plan
- Conflicts: CF-006
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; The primary backend is Gmail/Apps Script/Telegram. Static inspection found no Mailcow, Stalwart, Postfix, or Dovecot implementation symbols in the inspected source bundle.
- Limitations: Repository scope can establish the tracked architecture but not the absence of an external untracked service at runtime.

## KH-DEC-007

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: Choose Stalwart plus custom web/mobile UX for modern-first B2C/B2B, or Mailcow plus a custom frontend/BFF for a fast MVP; retain a proprietary orchestration layer.
- Implementation status: not_implemented_in_current_gmail_apps_script_scope
- Dependencies: Resolution of CF-006; Owner platform selection; Operations capability assessment
- Conflicts: CF-006
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-006](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No Stalwart, Mailcow, or custom BFF implementation was identified in the inspected tracked backend.
- Limitations: This verifies only the repository implementation scope, not external infrastructure.

## KH-DEC-008

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: Do not replace every protocol with one interface; use fan-in/fan-out while supporting legacy and modern interfaces together.
- Implementation status: partially_implemented_at_interface_compatibility_level
- Dependencies: Defined protocol scope; Architecture decision record
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-008](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; The tracked backend supports native Telegram callbacks, a Mini App, and legacy-card compatibility, but no general mail-protocol fan-in/fan-out layer was identified.
- Limitations: Interface compatibility is not equivalent to protocol-level fan-in/fan-out, and runtime compatibility was not tested.

## KH-DEC-009

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: low
- Scope and grade: `repository` / `E2`
- Claim: Choose Mailcow for the best MVP time to value.
- Implementation status: not_implemented
- Dependencies: Comparative platform evaluation; Owner platform decision
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-020](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No Mailcow implementation reference was found in the inspected tracked implementation; the active line is Gmail/Apps Script.
- Limitations: The comparative time-to-value assertion requires a primary benchmark; repository inspection cannot verify it.

## KH-DEC-010

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: low
- Scope and grade: `repository` / `E2`
- Claim: Choose Stalwart for a modern-first product because of native JMAP/DAV and API-first configuration and control.
- Implementation status: not_implemented
- Dependencies: Upstream capability verification; Owner platform decision
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-021](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No Stalwart or JMAP/DAV implementation reference was found in the inspected tracked implementation.
- Limitations: No external upstream verification was performed; the recommendation is outside the current Gmail-centric implementation.

## KH-DEC-011

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: low
- Scope and grade: `repository` / `E2`
- Claim: For a long-term enterprise route with maximum control, consider Postfix plus Dovecot when a strong operations team is available.
- Implementation status: not_implemented
- Dependencies: Enterprise scope decision; Operations staffing assessment
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-022](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No Postfix or Dovecot implementation reference was found in the inspected tracked implementation.
- Limitations: The operational tradeoff is not testable from this repository and no external benchmark was inspected.

## KH-DEC-012

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Use Apps Script as an adapter and control plane, not the full data plane; move heavy operations outside.
- Implementation status: contradicted_by_tracked_architecture
- Dependencies: Owner architecture decision; External worker and data-plane design
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-028](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-026](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-114](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Apps Script owns polling, Telegram webhook setup, notification state, Telegram delivery, and Gmail operations.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; MailClient.gs is explicitly the authenticated Gmail RPC backend and owns sessions, provider connections, drafts, mailbox actions, and attachment workflows.
- Evidence 3: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Static audit-record inspection only; runtime assertions in the audit were not accepted without independent proof.; The audit labels the control/data split partial and says no active durable worker layer exists.
- Limitations: Static code establishes the tracked architecture only; no runtime deployment was inspected.

## KH-DEC-013

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Build the default bridge from Telegram Bot API, a Mini App, a proprietary backend, and Gmail API; use TDLib or a user-account flow only deliberately.
- Implementation status: partially_implemented_with_apps_script_backend
- Dependencies: Resolution of CF-002; Authentication architecture decision
- Conflicts: CF-002
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-030](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Static code implements Telegram Bot API webhook/menu operations and Gmail operations in Apps Script.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; Static code implements the authenticated Telegram Mini App mailbox backend; no TDLib flow was identified.
- Evidence 3: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Limitations: The repository supports the Bot API and Mini App portions but does not evidence a separate external proprietary backend or runtime authentication state.

## KH-DEC-014

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: low
- Scope and grade: `repository` / `E2`
- Claim: Use Rspamd as the primary filter for new systems; retain SpamAssassin for compatibility or legacy cases.
- Implementation status: not_applicable_to_current_gmail_managed_filtering_scope
- Dependencies: Self-hosted mail-core decision; Spam-filter evaluation
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-036](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No Rspamd or SpamAssassin implementation reference was found in the inspected tracked backend.
- Limitations: Gmail-managed spam behavior and any external filtering service were not inspected at runtime.

## KH-DEC-015

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: Keep MIME, PGP, S/MIME, and E2E in a separate replaceable capability layer and outside the MVP unless needed.
- Implementation status: partially_aligned_by_exclusion_without_capability_layer
- Dependencies: Encryption scope decision; Threat model and interoperability requirements
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-038](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-048](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; The tracked client contains MIME attachment handling, but no separate PGP, S/MIME, or E2E capability layer was identified.
- Limitations: Static absence supports only that these capabilities are not tracked in the inspected implementation; it does not verify external or runtime capabilities.

## KH-DEC-016

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: low
- Scope and grade: `repository` / `E2`
- Claim: DAV strategy: integrated DAV/JMAP in Stalwart or Cyrus, or separate Radicale, Baikal, or SabreDAV; SOGo fills this role in Mailcow.
- Implementation status: not_implemented
- Dependencies: Calendar/contact scope; Platform selection
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-042](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; No DAV, JMAP, Radicale, Baikal, SabreDAV, or SOGo implementation reference was found in the inspected tracked backend.
- Limitations: No upstream product verification or external infrastructure inspection was performed.

## KH-DEC-017

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: Build one integration facade over Gmail API, Microsoft Graph, Google People/Calendar, and Telegram APIs instead of placing provider logic in the frontend.
- Implementation status: partially_implemented_as_backend_specific_integrations
- Dependencies: Provider scope decision; Facade contract
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-044](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Gmail and Telegram operations are server-side in Apps Script.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; The backend contains Gmail and Box-specific provider logic; no Microsoft Graph or Google People facade was identified.
- Evidence 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Test source was inspected but not run; this is E2, not E3.; The static test contract explicitly checks that Calendar handoff remains calendar-scope free.
- Limitations: No runtime provider behavior was inspected; static tests were not executed.

## KH-DEC-018

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Implement undo send as a grace window before actual sending, not as post-delivery recall.
- Implementation status: send_later_present_but_undo_send_contract_not_found
- Dependencies: Explicit undo-send state machine; Cancellation and idempotency acceptance criteria
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-049](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-034](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/f4764dfb89de41374ae97bdeb1a65d5a8764bd7a/docs/product/p1-gentle-action-contract.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added durable account-scoped send-later implementation and test changes.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; Static inspection identifies send-later support and draft-first sending but no explicit undo-send grace-window contract.
- Limitations: Send-later is not equivalent to undo send; no behavior test or runtime acceptance was run.

## KH-DEC-019

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: Build the integration bus with REST for commands and webhooks, SSE, or pub-sub for events.
- Implementation status: partially_implemented_with_webhook_commands_only
- Dependencies: Event-delivery architecture; External worker or pub-sub service
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-050](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Apps Script implements Telegram webhook ingress and command handling; no durable SSE or pub-sub event bus was identified.
- Evidence 2: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Static audit-record inspection only; runtime assertions in the audit were not accepted without independent proof.; The audit records the durable event worker layer as missing.
- Limitations: Static inspection cannot establish deployed webhook behavior or external untracked event infrastructure.

## KH-DEC-020

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: ADHD-friendly UI means consistency, lower cognitive load, clear steps, predictable navigation, and distraction control, not decorative brightness.
- Implementation status: implemented_in_tracked_focus_and_ui_contracts_static_only
- Dependencies: Accessibility and usability acceptance; Owner-approved design criteria
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-060](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Evidence 2: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/docs/design/focus-view-v28-spec.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit introduced Focus View across UI, backend, tests, and specification artifacts.
- Evidence 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Test source was inspected but not run; this is E2, not E3.; Static contracts cover bounded Focus actions, keyboard navigation, focus management, reduced overload, and explicit labels.
- Limitations: Repository evidence verifies design and code contracts, not accessibility outcomes with users or runtime rendering.

## KH-DEC-021

- Status: `partial`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `governance` / `E2`
- Claim: The previous two reports remain background, while report 3 is the new primary technical foundation.
- Implementation status: architecture_aligned_but_not_adopted_as_standing_governance
- Dependencies: Resolution of CF-006; Explicit owner or architecture adoption record
- Conflicts: CF-006
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-005](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Static inspection on the canonical Requests branch head.; REQ-0003 records report ingestion without runtime, Gmail, Telegram, Apps Script, or production changes and says report-derived claims did not become authority.
- Evidence 2: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Static inspection on the canonical Instructions branch head.; Standing governance requires reconciliation before live claims and states that report-derived claims do not become live-verified without new evidence.
- Evidence 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Limitations: The active Gmail/Apps Script/Telegram architecture aligns with report 3's scope, but canonical governance says report-derived claims were routed, not adopted as authority.

## KH-DEC-022

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: The target architecture should be hybrid: a Gmail add-on, web app, and external event/worker layer.
- Implementation status: partially_implemented_web_app_without_add_on_or_external_worker
- Dependencies: Resolution of CF-006; Gmail add-on decision; External worker design
- Conflicts: CF-006
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-006](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Static manifest inspection.; The Apps Script manifest declares a web app.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Apps Script contains the active backend and polling path; no Gmail add-on or external worker implementation was identified.
- Evidence 3: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Static audit-record inspection only; runtime assertions in the audit were not accepted without independent proof.; The audit calls the hybrid split partial and the durable worker layer missing.
- Limitations: Static repository evidence does not rule out untracked external services, and no runtime deployment was inspected.

## KH-DEC-023

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Do not use continuous Apps Script polling; use `watch()` and `history.list` with a checkpoint.
- Implementation status: contradicted_by_time_based_polling_implementation
- Dependencies: Gmail push-notification infrastructure; Durable history checkpoint and deduplication
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-112](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; replaceMailCheckTrigger_ creates a time-based checkNewMail_ trigger with everyMinutes(CONFIG.POLL_MINUTES); no active watch/history worker path was established.
- Evidence 2: [docs/audit/neuroinclusive-roadmap-status-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/neuroinclusive-roadmap-status-v45.md); Static audit-record inspection only; runtime assertions in the audit were not accepted without independent proof.; The repository audit records Gmail watch plus checkpoints as missing.
- Limitations: This is a static contradiction in tracked source, not proof of the currently deployed trigger state.

## KH-DEC-024

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Do not move the whole inbox into Telegram; use Mini Apps as dashboard and control, not a replacement for Gmail UX.
- Implementation status: contradicted_by_full_mail_client_scope
- Dependencies: Owner product-scope decision; Defined boundary between control surface and mail client
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-041](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; MailClient.gs identifies itself as the authenticated Gmail RPC backend for the Telegram Mini App and implements full mailbox folders, threads, drafts, actions, attachments, and provider connections.
- Evidence 3: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Limitations: The client still links to Gmail and bounds Telegram card output, but the tracked Mini App is explicitly a mail client rather than only a dashboard.

## KH-DEC-025

- Status: `recommendation`
- Category: `KH-DEC`; type: `decision`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Hardening should separate secret management, state machine, ingress, Gmail operations, and notifications.
- Implementation status: partially_separated_but_major_responsibilities_remain_co_located
- Dependencies: Threat model; Module-boundary decision; Security acceptance criteria
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-071](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Code.gs co-locates webhook ingress, notification state, polling, Telegram transport, and Gmail operations.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; MailClient.gs separates the authenticated mailbox RPC surface but also owns sessions, provider state, mailbox operations, drafts, and attachments.
- Evidence 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Static architecture inspection.; The repository has documented isolation and module boundaries, but not the complete five-way separation asserted by the recommendation.
- Limitations: Static module boundaries do not prove deployed secret handling or runtime isolation.

## KH-DEP-001

- Status: `blocked`
- Category: `KH-DEP`; type: `dependency`
- Relevance: high
- Scope and grade: `mixed` / `E2`
- Claim: WCAG 2.2 is the baseline; W3C COGA guidance is also needed for cognitive accessibility.
- Implementation status: partially_implemented
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-003](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus-visible styles, dialog focus traps, isolation helpers, accessible controls, and reduced-density UI structure.; Static accessibility primitives exist, but conformance and cognitive-accessibility outcomes require an audit and acceptance evidence.
- Limitations: Safe missing proof: current primary WCAG 2.2 and W3C COGA references plus an accessibility and cognitive-usability audit tied to the pinned commit.

## KH-DEP-002

- Status: `recommendation`
- Category: `KH-DEP`; type: `dependency`
- Relevance: medium
- Scope and grade: `mixed` / `E1`
- Claim: The protocol contract should cover SMTP, IMAP, POP3, modern JMAP, CalDAV, CardDAV, WebDAV, OAuth 2.0, webhooks, and push.
- Implementation status: not_implemented
- Dependencies: SMTP; IMAP; POP3; JMAP; CalDAV; CardDAV; WebDAV; OAuth 2.0
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-002](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-DEP-003

- Status: `unverified`
- Category: `KH-DEP`; type: `dependency`
- Relevance: medium
- Scope and grade: `external` / `E1`
- Claim: Account for different provider paths: Google and Apple DAV, Microsoft Graph for Microsoft 365, and Fastmail's combined JMAP/IMAP/POP/DAV model.
- Implementation status: not_implemented
- Dependencies: Google DAV; Apple DAV; Microsoft Graph; Fastmail
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-009](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-DEP-004

- Status: `partial`
- Category: `KH-DEP`; type: `dependency`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: Support password-over-TLS for self-hosted or legacy systems and OAuth 2.0/XOAUTH2 for modern external accounts.
- Implementation status: partially_implemented
- Dependencies: OAuth 2.0; TLS
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-010](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected repository-owned Google/Drive/Box OAuth state and callback handlers.; External-provider OAuth state, token exchange, refresh, and locking are implemented in project source rather than through a declared apps-script-oauth2 library.
- Evidence 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected dependency declarations.; No apps-script-oauth2 library dependency is declared.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Limitations: OAuth-based Google/Drive/Box account flows exist; no password-over-TLS self-hosted/legacy account path was found.

## KH-DEP-005

- Status: `recommendation`
- Category: `KH-DEP`; type: `dependency`
- Relevance: low
- Scope and grade: `repository` / `E1`
- Claim: Mailcow GitOps should cover `mailcow.conf`, `docker-compose.yml`, protected secrets and volumes, ingress, logs, SSO, observability, backups, and the integration service.
- Implementation status: not_implemented
- Dependencies: Mailcow; Docker Compose
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-024](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-DEP-006

- Status: `recommendation`
- Category: `KH-DEP`; type: `dependency`
- Relevance: low
- Scope and grade: `mixed` / `E1`
- Claim: Baseline domain authentication is SPF, DKIM, and DMARC, with ARC for forwarding or lists; use established OpenDKIM, OpenDMARC, OpenARC, and Rspamd implementations.
- Implementation status: not_implemented
- Dependencies: SPF; DKIM; DMARC; ARC
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-034](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-DEP-007

- Status: `unverified`
- Category: `KH-DEP`; type: `dependency`
- Relevance: low
- Scope and grade: `external` / `E1`
- Claim: OpenPGP and S/MIME require separate operational models; available components include OpenPGP.js, Mailvelope, OpenSSL CMS, Bouncy Castle, and PKI.js.
- Implementation status: not_implemented
- Dependencies: OpenPGP; S/MIME
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-037](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-DEP-008

- Status: `recommendation`
- Category: `KH-DEP`; type: `dependency`
- Relevance: low
- Scope and grade: `repository` / `E1`
- Claim: For Node mail work, use ImapFlow, Nodemailer, and PostalMime instead of custom IMAP, SMTP, or MIME implementations.
- Implementation status: not_applicable
- Dependencies: ImapFlow; Nodemailer; PostalMime
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-046](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The repository is Apps Script rather than a Node mail implementation and declares none of these packages; the technology choice remains a recommendation.

## KH-DEP-009

- Status: `recommendation`
- Category: `KH-DEP`; type: `dependency`
- Relevance: medium
- Scope and grade: `repository` / `E1`
- Claim: Use Redis for cache, coordination, and short-lived jobs: delayed send, snooze, classification, OCR, retries, AI summaries, and push fan-out.
- Implementation status: not_implemented
- Dependencies: Redis
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-056](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Evidence 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Limitations: The repository uses Apps Script Properties/Cache/Lock and triggers instead of Redis; Redis suitability and current limits were not externally verified.

## KH-DEP-010

- Status: `recommendation`
- Category: `KH-DEP`; type: `dependency`
- Relevance: high
- Scope and grade: `repository` / `E1`
- Claim: Heavy and long-running operations should execute outside Apps Script.
- Implementation status: not_implemented
- Dependencies: external worker
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-021](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Evidence 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Inspected immutable-version retrieval, normalized SHA-256 checks, five-file candidate allowlist, stage/promote/rollback gates, and journal transitions.; The release script hash-verifies immutable five-file candidates and separates staging, promotion, cleanup, and rollback; script presence does not prove execution.
- Limitations: The pinned deployable set is Apps Script only and has no external worker declaration. Whether specific operations exceed Apps Script limits requires runtime profiling and current quota evidence.

## KH-DEP-011

- Status: `partial`
- Category: `KH-DEP`; type: `dependency`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: The design anticipates a Gmail add-on, web app, installable triggers, `PropertiesService`, `CacheService`, `LockService`, `UrlFetchApp`, and advanced Google services.
- Implementation status: partially_implemented
- Dependencies: Apps Script; Gmail API
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-025](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Evidence 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Limitations: Web app, triggers, Properties/Cache/Lock, UrlFetchApp, and Gmail advanced service are present; the manifest has no Gmail add-on declaration.

## KH-DEP-012

- Status: `recommendation`
- Category: `KH-DEP`; type: `dependency`
- Relevance: medium
- Scope and grade: `governance` / `E1`
- Claim: For third-party or open-source components, name the exact repository, library, or documentation source.
- Implementation status: partially_implemented
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-084](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Evidence 2: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The manifest precisely names Gmail API v1, but the repository declares no third-party package set to audit; this remains a governance recommendation.

## KH-DEP-013

- Status: `verified`
- Category: `KH-DEP`; type: `dependency`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Gmail API is needed for history, drafts, delayed send, and attachments.
- Implementation status: implemented
- Dependencies: Gmail API v1
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-094](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Evidence 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Evidence 6: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-DEP-014

- Status: `recommendation`
- Category: `KH-DEP`; type: `dependency`
- Relevance: medium
- Scope and grade: `repository` / `E1`
- Claim: Pub/Sub and Cloud Run are needed for `watch`, webhook ingress, heavy jobs, retries, and idempotency.
- Implementation status: not_implemented
- Dependencies: Pub/Sub; Cloud Run
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-095](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Limitations: No Pub/Sub or Cloud Run declaration exists. The current source implements polling/history continuation, retries, and idempotency in Apps Script, while `watch` and webhook ingress remain absent.

## KH-DEP-015

- Status: `verified`
- Category: `KH-DEP`; type: `dependency`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: `PropertiesService`, `CacheService`, and `LockService` are needed for state, cache, refresh locking, and continuation.
- Implementation status: implemented
- Dependencies: Apps Script
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-096](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Evidence 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-DEP-016

- Status: `partial`
- Category: `KH-DEP`; type: `dependency`
- Relevance: high
- Scope and grade: `mixed` / `E2`
- Claim: Sensitive or restricted Gmail scopes may require a standard Cloud project, verification, and additional safeguards.
- Implementation status: partially_implemented
- Dependencies: Google OAuth policy
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-043](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-103](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected HTML/style/label/attachment sanitizers and source-fragment bounds.; The backend contains explicit sanitization, bounded evidence fragments, and owner/session authorization checks.
- Evidence 3: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inspected CSP, referrer policy, state/code validation, and query removal.; The callback relay minimizes retained OAuth response data and rejects malformed input.
- Limitations: The manifest proves Gmail/Drive scopes and source safeguards, but current scope classification, Cloud-project status, verification requirements, and policy compliance require primary Google policy and read-only project evidence.

## KH-DEP-017

- Status: `contradicted`
- Category: `KH-DEP`; type: `dependency`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: For external OAuth providers, use apps-script-oauth2 with Properties, Cache, and Lock practices.
- Implementation status: implemented_differently
- Dependencies: apps-script-oauth2
- Conflicts: CF-002
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-045](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-106](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected repository-owned Google/Drive/Box OAuth state and callback handlers.; External-provider OAuth state, token exchange, refresh, and locking are implemented in project source rather than through a declared apps-script-oauth2 library.
- Evidence 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected dependency declarations.; No apps-script-oauth2 library dependency is declared.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Evidence 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Limitations: The pinned implementation uses repository-owned OAuth handlers and Apps Script properties/locks, while the manifest declares no apps-script-oauth2 library. Static source does not assess whether this alternative is preferable.

## KH-DEP-018

- Status: `partial`
- Category: `KH-DEP`; type: `dependency`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Event continuation depends on `startHistoryId`, checkpoint state, `PropertiesService`, and triggers.
- Implementation status: implemented
- Dependencies: Gmail API v1; Apps Script
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-115](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Evidence 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Limitations: History IDs, persisted checkpoints/state, PropertiesService, and triggers are present; the exact `startHistoryId` naming and near-real-time event source were not established.

## KH-DEP-019

- Status: `verified`
- Category: `KH-DEP`; type: `dependency`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: For Google-to-Google flow, use manifest scopes and `ScriptApp.getOAuthToken()`.
- Implementation status: implemented
- Dependencies: Apps Script; Google OAuth
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-044](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Evidence 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-DEP-020

- Status: `recommendation`
- Category: `KH-DEP`; type: `dependency`
- Relevance: low
- Scope and grade: `mixed` / `E1`
- Claim: Proposed components are `postal-mime`, `OpenPGP.js`, `Mailvelope`, `PKI.js`, and RFC 8551.
- Implementation status: not_implemented
- Dependencies: postal-mime; OpenPGP.js; Mailvelope; PKI.js; RFC 8551
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-049](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-EVD-001

- Status: `unverified`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Defines the product differentiation premise.
- Scope and grade: `external` / `E0`
- Claim: [verified in report only] Gmail and Outlook provide separate AI features but not the described coherent neuroinclusive model.
- Implementation status: unknown
- Dependencies: Current official Gmail and Outlook capability evidence; A reproducible comparison against a defined neuroinclusive model
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-007](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence: no primary evidence retained
- Limitations: The repository contains no primary evidence for current Gmail or Outlook capabilities or for the asserted absence.

## KH-EVD-002

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Supports Focus View decomposition and bounded choices.
- Scope and grade: `mixed` / `E3`
- Claim: The reports associate ADHD with executive-function difficulties and use this to support decomposition and constrained choice.
- Implementation status: implemented_mechanics_only
- Dependencies: Primary clinical evidence for the ADHD association; User-outcome evidence for the design rationale
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-008](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-058](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-E03](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E08](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single full-file concept scan at the immutable commit.; Focus/triage controls and adaptive-density UI are present; the source exposes a bounded set of primary actions.
- Evidence 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed the Focus View test for bounded triage, Resume Rail, and exactly three primary actions, plus adaptive-density behavior.
- Limitations: E3 verifies local mechanics, not the clinical association or therapeutic/user outcome.

## KH-EVD-003

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Supports explicit scheduling, reminders, and time-bounded sessions.
- Scope and grade: `mixed` / `E3`
- Claim: The reports describe heterogeneous time-perception difficulties as support for time-oriented UI.
- Implementation status: implemented_mechanics_only
- Dependencies: Primary evidence for heterogeneous time-perception difficulties; Runtime usability evidence for the time-oriented UI
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-010](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-E07](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single full-file concept scan at the immutable commit.; The UI contains explicit send-later controls and bounded 10/25-minute co-processing sessions.
- Evidence 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed explicit, account-scoped, recoverable send-later and bounded co-processing UI contract tests.
- Limitations: The scientific rationale and user impact were not independently verified.

## KH-EVD-004

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Relates to gentle milestone feedback.
- Scope and grade: `mixed` / `E3`
- Claim: [verified in report only] Motivation and reward models explain a preference for immediate nearby rewards over delayed routine benefits.
- Implementation status: implemented_mechanics_only
- Dependencies: Primary motivation/reward research; Outcome evidence that milestone feedback has the asserted effect
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-012](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single full-file concept scan at the immutable commit.; Gentle milestone state and bounded progress acknowledgements are implemented.
- Evidence 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed the test that gentle milestones acknowledge bounded session progress without gamification or durable tracking.
- Limitations: Implementation presence does not verify the motivation/reward model or effectiveness.

## KH-EVD-005

- Status: `unverified`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Motivates low-pressure inbox language and interactions.
- Scope and grade: `external` / `E0`
- Claim: [verified in report only] Depressive symptoms can turn the inbox into a reminder of unmet obligations.
- Implementation status: unknown
- Dependencies: Primary clinical or qualitative evidence
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-018](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence: no primary evidence retained
- Limitations: No primary scientific evidence or runtime user study exists in the inspected Git evidence.

## KH-EVD-006

- Status: `unverified`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Underpins the combined neuroinclusive design rationale.
- Scope and grade: `external` / `E0`
- Claim: The reports associate ADHD and depression comorbidity with greater executive, motivational, and emotional burden.
- Implementation status: unknown
- Dependencies: Primary clinical evidence for the comorbidity claim
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-019](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-059](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-E05](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence: no primary evidence retained
- Limitations: Repository implementation and tests cannot establish a clinical association.

## KH-EVD-007

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Supports functional-relief metrics and bounded backlog rescue.
- Scope and grade: `mixed` / `E3`
- Claim: [verified in report only] Neurodivergent authors and users describe `Inbox Functional` as more practical than an empty inbox.
- Implementation status: implemented_mechanics_only
- Dependencies: Primary author/user evidence; Resolution of conflict CF-008; Runtime outcome evidence
- Conflicts: CF-008
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-066](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed content-free functional-relief metrics, stable recovery percentage, and bounded backlog-rescue tests.
- Evidence 2: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed UI tests for opt-in functional metrics and bounded, restorable backlog rescue.
- Limitations: Tests verify the implemented model, not user preference or comparative practicality; CF-008 remains unresolved by repository evidence.

## KH-EVD-008

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Supports digest mode, quiet hours, and bounded workers.
- Scope and grade: `mixed` / `E3`
- Claim: The reports describe batching and limited check windows as ways to reduce continuous reacting and stress.
- Implementation status: implemented_mechanics_only
- Dependencies: Primary behavioral evidence; Runtime evidence that stress or continuous reacting is reduced
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-067](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-E06](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E10](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; Bounded batches, digest delay state, quiet-hour behavior, and minute-worker limits are present.
- Evidence 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed digest grouping, quiet-hour deferral, bounded reminder worker, and bounded metadata batch tests.
- Limitations: No local test can verify reduced stress or reduced reacting in users.

## KH-EVD-009

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Supports the durable send-later feature.
- Scope and grade: `mixed` / `E3`
- Claim: [verified in report only] `Send later` and an editable pre-send interval are described as reducing anxiety and perfectionism-driven avoidance.
- Implementation status: implemented
- Dependencies: Primary evidence for anxiety/avoidance reduction; Production acceptance of scheduled delivery
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-070](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single full-file concept scan at the immutable commit.; Schedule, reschedule, cancel, state, lease, and worker operations are implemented for account-bound drafts.
- Evidence 2: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed seven send-later durability, isolation, uncertainty, quota, timezone, and at-most-once worker tests.
- Evidence 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed the explicit, recoverable, account-scoped send-later UI contract.
- Limitations: E3 does not prove production delivery or the claimed mental-health effect.

## KH-EVD-010

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Supports private co-processing sessions.
- Scope and grade: `mixed` / `E3`
- Claim: [verified in report only] Body doubling, virtual co-working, and light presence are described as practical ways to overcome the start barrier; the report calls email-specific evidence weaker.
- Implementation status: implemented
- Dependencies: Primary body-doubling/co-working evidence; Email-specific user-outcome evidence
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-071](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single full-file concept scan at the immutable commit.; Private account-scoped co-processing sessions with bounded 10/25-minute durations are implemented.
- Evidence 2: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed explicit, content-free, idempotent, account-scoped co-processing session tests.
- Evidence 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed the private, restorable co-processing presence UI test and confirmed it does not mutate mail.
- Limitations: Repository evidence verifies mechanics only; it does not prove start-barrier reduction or email-specific effectiveness.

## KH-EVD-011

- Status: `unverified`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Defines the Gmail comparison baseline.
- Scope and grade: `external` / `E0`
- Claim: [verified in report only] Gmail provides `AI Overview` and deadline reminders.
- Implementation status: not_applicable
- Dependencies: Current official Gmail documentation or safe live readback
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-030](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence: no primary evidence retained
- Limitations: The assigned local Git evidence cannot verify a current external Gmail product capability.

## KH-EVD-012

- Status: `unverified`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Defines the Outlook/Copilot comparison baseline.
- Scope and grade: `external` / `E0`
- Claim: [verified in report only] Outlook/Copilot provides cited summaries, attachment analysis, prioritization, rule creation, and automatic replies.
- Implementation status: not_applicable
- Dependencies: Current official Microsoft documentation or safe live readback
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-031](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence: no primary evidence retained
- Limitations: The assigned local Git evidence cannot verify current Outlook/Copilot capabilities.

## KH-EVD-013

- Status: `unverified`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Provides protocol architecture context.
- Scope and grade: `external` / `E0`
- Claim: The report maps SMTP, IMAP, POP3, JMAP, and JMAP over WebSocket to RFC 5321, 3501, 1939, 8620, 8621, and 8887.
- Implementation status: not_applicable
- Dependencies: Primary RFC texts and an exact protocol-to-RFC comparison
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-007](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence: no primary evidence retained
- Limitations: No primary RFC content was present in or consulted from the assigned repository evidence.

## KH-EVD-014

- Status: `unverified`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Affects privacy treatment of tracking pixels.
- Scope and grade: `external` / `E0`
- Claim: The report claims that 2026 CNIL and Garante materials raise consent concerns for email tracking pixels.
- Implementation status: not_applicable
- Dependencies: Primary 2026 CNIL and Garante materials; Jurisdiction-specific legal interpretation
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-040](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence: no primary evidence retained
- Limitations: No primary regulator material was present in or consulted from the assigned Git evidence.

## KH-EVD-015

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Determines which implementation and release lineage should be treated as current.
- Scope and grade: `mixed` / `E3`
- Claim: Existing project core and v45 are the current working base.
- Implementation status: historical_base_modified
- Dependencies: A precise definition of current working base; Read-only production deployment/version hash readback for any live-state interpretation
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E01](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/tools/release_apps_script_v37_product_v45.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/fa15f11987c1435ca8975594780c8a1d1c91508d/apps-script/tools/release_apps_script_v37_product_v45.ps1); git merge-base --is-ancestor fa15f11987c1435ca8975594780c8a1d1c91508d 2b3b9e2f678f9fa0c787247f92d7827f81e95c9a; Exit code 0: the v45 release commit is an ancestor of the assigned active commit.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); git diff --name-status and git rev-parse blob comparison from v45 to the assigned commit.; Code.gs, MailApp.html, MultiAccount.gs, and related tests changed after v45; MailClient.gs and appsscript.json retained their v45 blobs.
- Evidence 3: [apps-script/tests/release_v37_product_v45.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/release_v37_product_v45.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed both tests for the historical immutable v45 candidate and its fail-closed, at-most-once, rollback-capable gate.
- Evidence 4: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Single immutable release-artifact inspection.; The artifact states Versie 1 is not promoted, tagged, or represented by a release branch and still requires staging/manual acceptance gates.
- Limitations: v45 is verified as lineage, not as an unchanged current tree.; Exact safe missing production proof: read-only Apps Script deployment/version readback tied to immutable source hashes plus production acceptance; prohibited in this stream.

## KH-EVD-016

- Status: `contradicted`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Determines the actual Gmail integration surface.
- Scope and grade: `repository` / `E2`
- Claim: Gmail add-ons use card UI; contextual triggers run for opened messages and are unconditional in the manifest.
- Implementation status: not_implemented_as_claimed
- Dependencies: Official Gmail add-on documentation is still needed for the generic first clause
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E02](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Full immutable manifest inspection.; The manifest configures an anonymous Apps Script web app and Advanced Gmail service; it has no addOns, gmail.contextualTriggers, or unconditional contextual-trigger declaration.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; No CardService implementation was found; the only contextual matches concern OTP/code parsing, not Gmail add-on triggers.
- Limitations: The repository directly contradicts the project-specific manifest assertion; the generic statement about Gmail add-ons was not externally reverified.

## KH-EVD-017

- Status: `unverified`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Constrains how the product should explain ADHD.
- Scope and grade: `external` / `E0`
- Claim: Dopaminergic systems are relevant, but a simple dopamine-deficit model is described as reductive.
- Implementation status: unknown
- Dependencies: Primary neuroscience evidence and review literature
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E04](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence: no primary evidence retained
- Limitations: Repository source and tests cannot verify a neuroscience model.

## KH-EVD-018

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Supports reduced-content Focus View and adaptive density.
- Scope and grade: `mixed` / `E3`
- Claim: The report cites W3C and research to support fewer interruptions, focus, and reduced content.
- Implementation status: implemented_mechanics_only
- Dependencies: Primary W3C and research sources; Runtime accessibility and interruption outcomes
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E09](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E25](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed Focus View with exactly three primary actions and adaptive density that keeps minimal mode to three primary actions.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single full-file concept scan at the immutable commit.; Focus, triage, adaptive-density, and bounded-content UI controls are present.
- Limitations: The cited W3C/research basis and real user outcomes remain unverified.

## KH-EVD-019

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Covers core compose, send, attachment, and MIME operations.
- Scope and grade: `mixed` / `E3`
- Claim: The report claims Gmail API supports drafts, sending, attachment retrieval, and raw-message operations.
- Implementation status: implemented
- Dependencies: Current official Gmail API reference or safe read-only runtime proof
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E11](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E15](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Full immutable manifest inspection.; Advanced Gmail v1 is enabled with gmail.modify scope.
- Evidence 2: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed mocked/local tests for rich raw MIME drafts, base64url encoding, attachment retrieval, draft create/update, send-by-draft-ID, and at-most-once send reconciliation.
- Limitations: E3 verifies repository logic against mocks, not the current external API contract or live Gmail behavior.

## KH-EVD-020

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Supports Telegram command/control architecture.
- Scope and grade: `mixed` / `E3`
- Claim: Telegram Bot API is HTTP-based and suitable for short-command control.
- Implementation status: implemented
- Dependencies: Current official Telegram Bot API reference; Runtime usability evidence for suitability; Resolution of conflict CF-002
- Conflicts: CF-002
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E12](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; Telegram methods are sent through UrlFetchApp.fetch to the HTTPS Bot API endpoint.
- Evidence 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed bounded chat-native command, callback, retry, deduplication, and short control-flow tests.
- Limitations: The implementation proves an HTTP transport and bounded commands locally, not external API availability or qualitative suitability; CF-002 remains unresolved.

## KH-EVD-021

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Affects OAuth scope selection and release governance.
- Scope and grade: `mixed` / `E3`
- Claim: The report claims Gmail add-ons and restricted scopes have minimization and verification requirements.
- Implementation status: partial
- Dependencies: Current official Google restricted-scope and add-on verification policies; Server-side OAuth verification state
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E13](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E24](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Full immutable manifest inspection.; The project requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; it does not request full-mail or gmail.send.
- Evidence 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed the manifest test asserting gmail.modify without full-mail or send scope.
- Limitations: Scope contents are verified, but Google's current minimization/verification requirements and this project's verification status are not.

## KH-EVD-022

- Status: `unverified`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Guides OAuth state storage and refresh concurrency.
- Scope and grade: `external` / `E0`
- Claim: `apps-script-oauth2` recommends Properties/Cache/Lock and warns about refresh races.
- Implementation status: unknown
- Dependencies: Immutable primary apps-script-oauth2 documentation/source revision
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E14](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence: no primary evidence retained
- Limitations: The repository uses PropertiesService and locks in custom OAuth code but does not establish what apps-script-oauth2 recommends or whether that library is used.

## KH-EVD-023

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Defines expected source deployment and repository security controls.
- Scope and grade: `governance` / `E2`
- Claim: `clasp`, CodeQL, secret scanning and Dependabot are described as release/security controls.
- Implementation status: partial
- Dependencies: Read-only GitHub repository security-settings proof for server-side secret scanning; Primary tool documentation for the generic capability claim
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E16](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Full immutable configuration inspection.; A clasp ignore file allowlists the five Apps Script source/manifest files.
- Evidence 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); git ls-tree plus full inspection of both tracked workflows.; Only bilingual-docs and knowledge-hub validation workflows are tracked; no CodeQL workflow or Dependabot configuration is present at this commit.
- Limitations: Local Git cannot prove server-side GitHub secret-scanning settings.; The repository shows partial clasp packaging but not all four asserted controls.

## KH-EVD-024

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Explains bounded workers, cursors, leases, and resumable state.
- Scope and grade: `mixed` / `E3`
- Claim: The report describes Apps Script execution limits and the need for continuation state or an external worker for long operations.
- Implementation status: implemented_continuation_state
- Dependencies: Current official Apps Script quota/limit documentation; Runtime duration and continuation acceptance
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E17](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E27](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; The implementation contains durable cursors, page tokens, leases, bounded batches, and minute-worker continuation paths.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single full-file concept scan at the immutable commit.; Mailbox operations use bounded cursors, leases, journals, and scheduled workers.
- Evidence 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed durable pagination over more than 500 messages, cursor restart, retry, lease, bounded-worker, and continuation tests.
- Limitations: Official execution-limit values and production behavior were not verified; no external worker deployment was evidenced.

## KH-EVD-025

- Status: `unverified`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Supports the proposed development workflow.
- Scope and grade: `external` / `E0`
- Claim: Codex documentation is cited in support of context/tool/environment-aware workflows.
- Implementation status: not_applicable
- Dependencies: Current official Codex documentation and exact cited passages
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E18](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence: no primary evidence retained
- Limitations: The assigned evidence scope did not consult external Codex documentation; repository workflow instructions are not proof of the cited documentation.

## KH-EVD-026

- Status: `blocked`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Affects discoverability and public-evidence claims.
- Scope and grade: `external` / `E0`
- Claim: Public indexing of `github.com/[PRIVATE]/gmail-telegram-controls` could not be confirmed.
- Implementation status: blocked
- Dependencies: Anonymous current GitHub visibility check; Independent current search-index query
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E19](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence: no primary evidence retained
- Limitations: Local immutable Git history cannot prove public indexing.; Exact safe missing proof: an anonymous read-only GitHub visibility response plus current independent search-index results for the canonical public URL; external/network checks were outside this stream.

## KH-EVD-027

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Maps the actual web, Gmail, synchronization, OAuth, and scope surfaces.
- Scope and grade: `mixed` / `E3`
- Claim: Gmail cards, `doGet`/`doPost`, Gmail API resources, `watch`, OAuth storage/locks and scope verification are cited as platform constraints.
- Implementation status: partial
- Dependencies: Current official platform documentation; Runtime verification for OAuth/scopes and Gmail synchronization
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E20](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; doPost and doGet are implemented; Gmail History uses startHistoryId; PropertiesService and locks are used; no Gmail CardService or watch call was found.
- Evidence 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Full immutable manifest inspection.; Advanced Gmail v1 and explicit scopes are configured, but no Gmail add-on card/trigger manifest exists.
- Evidence 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed Gmail History baseline/change/cursor tests and scope-minimization checks.
- Limitations: Cards and watch are not implemented in the checked tree; current platform constraints and OAuth verification state remain externally/runtime unverified.

## KH-EVD-028

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Defines intended responsibility boundaries across platform components.
- Scope and grade: `mixed` / `E3`
- Claim: The report attributes contextual UI to add-ons, richer UX to web apps, automation to Gmail API, event reliability to Pub/Sub/Cloud Run and state control to Properties/Cache/Lock.
- Implementation status: partial
- Dependencies: Primary platform documentation; Deployed architecture evidence for Pub/Sub/Cloud Run and add-ons
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E21](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Full immutable manifest inspection.; The project is an Apps Script web app with Advanced Gmail; no add-on, Pub/Sub, or Cloud Run configuration is present.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single full-file concept scan at the immutable commit.; The richer web UI backend uses Gmail REST operations plus PropertiesService and locks with durable cursors/leases.
- Evidence 3: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed mocked web-app, Gmail automation, state isolation, cursor, lock, and worker contracts.
- Limitations: Web-app/Gmail/state portions are evidenced; add-on and Pub/Sub/Cloud Run portions are absent, and platform-level reliability is unverified.

## KH-EVD-029

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Affects local source layout and Apps Script release tooling.
- Scope and grade: `mixed` / `E2`
- Claim: The report describes clasp as an open-source route for local directory-based development, versioning, and deployment.
- Implementation status: partial
- Dependencies: Primary clasp documentation/source; A tracked or safely referenced clasp project configuration for full local deployment use
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E22](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-E23](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Full immutable configuration inspection.; The repository contains clasp source-packaging rules for a five-file Apps Script bundle.
- Evidence 2: [apps-script/tools/release_apps_script_v37_product_v45.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_v37_product_v45.ps1); Single immutable release-helper inspection.; The v45 helper performs guarded Apps Script REST release operations directly; no clasp invocation was found.
- Limitations: A .claspignore file proves partial local layout usage only; the generic open-source/versioning/deployment capabilities and an active clasp deployment configuration were not independently verified.

## KH-EVD-030

- Status: `partial`
- Category: `KH-EVD`; type: `evidence`
- Relevance: Defines the expected Gmail change-synchronization architecture.
- Scope and grade: `mixed` / `E3`
- Claim: Gmail `watch()` uses Pub/Sub and `history.list`/`startHistoryId` for change synchronization.
- Implementation status: partial_history_only
- Dependencies: Current official Gmail API watch/history documentation; Read-only deployed Pub/Sub/watch configuration proof
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-E26](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single full-file concept scan at the immutable commit.; The repository implements a Gmail History request with startHistoryId and cursor advancement; no watch call or Pub/Sub configuration was found.
- Evidence 2: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Included in TR-001 with Node's test runner at concurrency 1; no OAuth, Gmail, Telegram, Apps Script, production, network, or secret access.; TR-001 passed Gmail History baseline, targeted-change, scoped-update, retry, snapshot-resume, and stale-cursor reset tests.
- Limitations: Only history synchronization is verified locally; watch/Pub/Sub behavior and the current external API contract remain unverified.

## KH-HIS-001

- Status: `unverified`
- Category: `KH-HIS`; type: `history`
- Relevance: medium
- Scope and grade: `repository` / `E1`
- Claim: Embedded markers such as `turn...view/search` are technical provenance references that require separate resolution during migration.
- Implementation status: no_concrete_marker_occurrence_found_in_active_tree
- Dependencies: Immutable original artifact containing concrete markers; Marker-resolution mapping
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-064](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Commit-wide Git search for concrete turn-number plus view/search markers, excluding the six assigned claim pages.; Zero matching tracked occurrences were found at the pinned commit.
- Limitations: A zero-match active-tree search does not disprove occurrence in an unavailable earlier private artifact. Safe missing proof: an immutable original source artifact containing the concrete marker and its resolution target.

## KH-HIS-002

- Status: `unverified`
- Category: `KH-HIS`; type: `history`
- Relevance: low
- Scope and grade: `external` / `E0`
- Claim: Do not classify EmailEngine as FOSS: the report describes it as formerly open source and now a source-available commercial unified email layer.
- Implementation status: not_used_in_inspected_repository
- Dependencies: Immutable upstream license history; Dated upstream release or licensing record
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-045](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence: no primary evidence retained
- Limitations: Project reports are not corroboration and no upstream primary artifact was inspected. Safe missing proof: an immutable EmailEngine upstream commit or release artifact showing the licensing transition.

## KH-HIS-003

- Status: `unverified`
- Category: `KH-HIS`; type: `history`
- Relevance: low
- Scope and grade: `external` / `E0`
- Claim: Mailparser is marked as maintenance-mode or legacy; PostalMime is recommended for new projects.
- Implementation status: neither_dependency_found_in_inspected_repository
- Dependencies: Immutable upstream maintenance statement; Dated upstream recommendation or migration record
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-047](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence: no primary evidence retained
- Limitations: Project reports are not corroboration and no upstream primary artifact was inspected. Safe missing proof: immutable upstream maintainer documentation or release records for both packages.

## KH-HIS-004

- Status: `partial`
- Category: `KH-HIS`; type: `history`
- Relevance: high
- Scope and grade: `mixed` / `E1`
- Claim: Work continues from the existing core at `[PRIVATE]`, not from an empty state.
- Implementation status: non_empty_core_lineage_verified_private_origin_not_inspected
- Dependencies: Authorized evidence for the redacted origin, if the location itself must be verified
- Conflicts: none
- Sensitivity: `secret-redacted`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/b73327e2927cd812e032167e5662b2a3c4bcd100/apps-script/Code.gs); Commit metadata, ancestry, and changed-path inspection.; The immutable ancestor preserved a non-empty Apps Script v27 baseline with backend, Mini App, architecture, tests, tools, and audit artifacts.
- Evidence 2: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Limitations: Immutable Git ancestry verifies continuation from a substantial existing Apps Script core. The redacted private origin was intentionally not accessed, so that location remains unverified.

## KH-HIS-005

- Status: `contradicted`
- Category: `KH-HIS`; type: `history`
- Relevance: high
- Scope and grade: `governance` / `E2`
- Claim: `gmail-telegram-v45-gentle-milestones` is designated as the current baseline artifact.
- Implementation status: superseded_by_versie_1_governance
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-002](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Evidence 2: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Static release-artifact inspection at the pinned commit.; The active release artifact is Versie 1, while the prior Apps Script v37 production baseline remains separately described.
- Evidence 3: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Static inspection on the canonical Instructions branch head.; Standing governance requires reconciliation before live claims and states that report-derived claims do not become live-verified without new evidence.
- Limitations: The directory name and v45 artifacts remain historical lineage, but the pinned repository and standing governance designate Versie 1 as the active working line. This does not assert current runtime deployment.

## KH-HIS-006

- Status: `partial`
- Category: `KH-HIS`; type: `history`
- Relevance: medium
- Scope and grade: `repository` / `E1`
- Claim: `gmail-telegram-v44-co-processing`, `gmail-telegram-notifier`, and other release lines are retained as prior experience.
- Implementation status: v44_v45_and_prior_commit_lineage_retained_notifier_artifact_not_identified
- Dependencies: Immutable artifact identifying the named gmail-telegram-notifier line
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-003](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/operations/v44-co-processing-presence.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/7413454aa03581dbedaf75eab0e1c38b12e8bf8b/docs/operations/v44-co-processing-presence.md); Commit metadata, ancestry, and changed-path inspection.; The immutable ancestor added the v44 co-processing line and retained its implementation and documentation artifacts.
- Evidence 2: [docs/product/gentle-milestones-v45.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/fa15f11987c1435ca8975594780c8a1d1c91508d/docs/product/gentle-milestones-v45.md); Commit metadata, ancestry, and tracked-tree inspection.; The immutable ancestor consolidated product v45 on Apps Script v37; v45-named release, audit, product, and menu artifacts remain tracked.
- Evidence 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Static inspection at the pinned commit.; Versie 1 is the active development line; public production is described as remaining on Apps Script v37 pending Versie 1 acceptance. The repository excludes runtime state and credentials.
- Limitations: Git refs, ancestor commits, and tracked v44/v45 artifacts verify retained prior release lines. No separately named gmail-telegram-notifier repository artifact was identified in the active tree evidence pass.

## KH-INS-001

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `mixed` / `E2`
- Claim: The interface should provide one dominant action, stable context, low density, explicit progress, clear priorities, and exact resumption after interruption.
- Implementation status: partially_implemented_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: CF-001
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-005](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-001 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Primary-action (30), density (18), and progress (25) markers plus focus/session identifiers exist; one dominant action and exact resumption were not proven.
- Limitations: Rendered-state and interruption acceptance are missing.

## KH-INS-002

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `mixed` / `E2`
- Claim: Define one visually primary next action for each message.
- Implementation status: partially_implemented_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: CF-001; CF-003
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-014](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-012](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-002 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Primary-action markers exist in MailApp.html (30) and MailClient.gs (12), but exactly one primary action per message state was not established.
- Limitations: A rendered per-message action inventory is missing.

## KH-INS-003

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `mixed` / `E2`
- Claim: Use neutral, supportive, non-judgmental language.
- Implementation status: not_established_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-022](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-027](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-003 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; No explicit neutral/supportive/non-judgmental policy marker was found; token absence cannot assess wording quality.
- Limitations: A complete bilingual UX-copy audit and owner acceptance are missing.

## KH-INS-004

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `mixed` / `E2`
- Claim: Focus mode should expose no more than three or four primary actions.
- Implementation status: partially_implemented_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: CF-001
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-024](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-004 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Focus-mode (11) and primary-action (30) markers exist, but rendered primary-action cardinality was not enumerated.
- Limitations: The 3-4 cap needs a deterministic UI contract or rendered inspection.

## KH-INS-005

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `mixed` / `E2`
- Claim: WCAG 2.2 should be treated as the minimum and COGA as the quality standard for structure, focus, memory, summaries, personalization, human help, and interruption control.
- Implementation status: not_established_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-073](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-005 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; No WCAG or COGA marker was found; focus-related code does not establish conformance.
- Limitations: No criterion mapping, accessibility audit, or assistive-technology evidence was reviewed.

## KH-INS-006

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `mixed` / `E2`
- Claim: Focus mode should be a separate information architecture with one on-screen task, not a cosmetic theme.
- Implementation status: partially_implemented_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-074](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-006 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Dedicated focus render/load/toggle functions exist; one-task information architecture was not established.
- Limitations: Static function presence does not prove rendered information architecture.

## KH-INS-007

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `mixed` / `E2`
- Claim: The system should minimize context loss and preserve position, draft, temporary classification, latest conversation, and intermediate decisions.
- Implementation status: partially_implemented_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-026](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-007 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Draft, classification, session, recovery, and focus-state identifiers exist, but preservation of every listed element was not proven.
- Limitations: State-transition tests or read-only runtime acceptance are missing.

## KH-INS-008

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `mixed` / `E2`
- Claim: Personalization should be adaptive, scenario-based, and gradual, using simple presets instead of lengthy configuration.
- Implementation status: partially_implemented_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: CF-004
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-028](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-008 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Density markers (18) and focus configuration/preset functions exist; gradual scenario-based adaptation was not established.
- Limitations: No behavioral evidence shows adaptive progression or reduced setup burden.

## KH-INS-009

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `mixed` / `E2`
- Claim: An AI summary should include source links, a confidence indication, and fast access to the original.
- Implementation status: partially_implemented_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-033](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-009 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Summary (55), confidence (13), and source/original-link (9) markers exist, with more server-side summary/confidence markers.
- Limitations: No test verifies citation accuracy, confidence meaning, or original navigation.

## KH-INS-010

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `mixed` / `E2`
- Claim: The visual mode should use few colors, one accent, large targets, a visible focus state, and adjustable density.
- Implementation status: partially_implemented_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-048](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-010 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Focus-state and density code exists; palette count, accent uniqueness, and target dimensions were not measured.
- Limitations: A CSS/rendered accessibility audit is missing.

## KH-INS-011

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: architecture
- Scope and grade: `mixed` / `E2`
- Claim: Do not write an MTA, MDA, or groupware system from scratch; assemble the product from established server components.
- Implementation status: consistent_with_current_architecture_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-013](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-011 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; The tracked product is an Apps Script/Gmail API client with managed Google/Box endpoints; no dedicated custom mail-server component path was found.
- Limitations: Repository architecture does not prove all external infrastructure.

## KH-INS-012

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: architecture
- Scope and grade: `mixed` / `E2`
- Claim: Separate transport security, domain authenticity, content protection, and abuse/phishing defense; apply TLS, MTA-STS, TLS-RPT, and, with DNSSEC, DANE.
- Implementation status: not_implemented_in_tracked_client
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-033](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-012 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; No MTA-STS, TLS-RPT, DANE, or DNSSEC marker was found; this repository is a Gmail client, not domain mail infrastructure.
- Limitations: External DNS and mail-domain configuration were not inspected.

## KH-INS-013

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: architecture
- Scope and grade: `mixed` / `E2`
- Claim: Do not create a custom mail server; invest in UX, interoperability, privacy, AI triage, and managed ecosystem integrations.
- Implementation status: partially_implemented_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-079](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-013 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Managed Gmail/Telegram/Box integration and substantial UX/triage code exist; no custom mail-server component path was found.
- Limitations: Investment priority is not objectively verifiable; privacy completeness is open.

## KH-INS-014

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `governance` / `E1`
- Claim: Use logs, checkpoints, audit notes, test trails, and lessons learned; do not repeat completed stages without review.
- Implementation status: partially_reflected_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-004](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-014 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [AGENTS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/AGENTS.md); Read once at the assigned commit.; Governs request routing, evidence, secret handling, and release gates; adopts no KH-INS ID.
- Limitations: No canonical KH-INS-014 adoption exists.

## KH-INS-015

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `governance` / `E1`
- Claim: Work sequence: product core, master prompt, implementation recipe, audit, and operational cycle; verify capabilities in the actual environment.
- Implementation status: partially_reflected_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-009](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-015 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Limitations: Canonical order is request/release oriented, not this sequence; runtime capability verification was prohibited.

## KH-INS-016

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `governance` / `E1`
- Claim: The agent should act as product architect, Workspace engineer, accessibility researcher, security reviewer, and release engineer, producing a technical delivery program.
- Implementation status: not_applicable_to_product_runtime_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-022](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-016 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Limitations: This role recommendation has no explicit owner adoption.

## KH-INS-017

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `governance` / `E1`
- Claim: The agent should deliver sections A-R covering architecture, UX, modules, scopes, OAuth, integrations, audit, build/debug/release plans, tests, backlog, patches, and fallback paths.
- Implementation status: not_applicable_to_product_runtime_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-031](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-017 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Limitations: No canonical A-R template or owner adoption exists.

## KH-INS-018

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `governance` / `E1`
- Claim: For recommendations, explain the problem, rationale, and pitfalls; state platform limits directly and provide a workaround.
- Implementation status: not_applicable_to_product_runtime_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-032](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-018 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Limitations: Document quality is not proven by presence; owner adoption is absent.

## KH-INS-019

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: architecture
- Scope and grade: `mixed` / `E2`
- Claim: When a hybrid architecture using Apps Script, Cloud Run, Pub/Sub, and Storage is needed, design it explicitly.
- Implementation status: not_implemented_in_tracked_repository
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-083](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-019 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; No Cloud Run, Pub/Sub, or Cloud Storage architecture marker was found.
- Limitations: This conditional recommendation may be irrelevant until such architecture is required.

## KH-INS-020

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `governance` / `E1`
- Claim: Do not hide tradeoffs or give vague advice; write as a delivery document for the implementation team.
- Implementation status: not_applicable_to_product_runtime_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-085](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-020 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Limitations: This qualitative recommendation lacks explicit owner adoption.

## KH-INS-021

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `governance` / `E1`
- Claim: Codex should act as a controlled technical reviewer and verification-protocol executor; confirm browser, CDP, and runtime capability before use.
- Implementation status: partially_reflected_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-072](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-021 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [AGENTS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/AGENTS.md); Read once at the assigned commit.; Governs request routing, evidence, secret handling, and release gates; adopts no KH-INS ID.
- Limitations: No runtime capability check was permitted or performed.

## KH-INS-022

- Status: `recommendation`
- Category: `KH-INS`; type: `instruction`
- Relevance: current
- Scope and grade: `governance` / `E1`
- Claim: The operational loop should be mandatory and cover actual UI, runtime, and network behavior, not only code reading.
- Implementation status: partially_reflected_not_canonically_adopted
- Dependencies: REQ-0003; explicit owner adoption on canonical Інструкції
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-080](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/INSTRUCTIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [INSTRUCTIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/INSTRUCTIONS.md); Read the canonical instruction tip, its AGENTS.md, and both instructions/ files once.; No explicit or ID-linked adoption of KH-INS-022 exists; canonical hub maintenance says candidates become standing only on Інструкції.
- Evidence 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Read once at the assigned commit.; Versie 1 is in progress and not promoted; real-time controlled-mail acceptance and staging visual/readback remain unproven.
- Limitations: This stream excluded UI, runtime, network, and tests.

## KH-ISS-001

- Status: `unverified`
- Category: `KH-ISS`; type: `issue`
- Relevance: product rationale
- Scope and grade: `external` / `E0`
- Claim: Email creates a stream of micro-decisions, context switches, time estimates, and social pressure; ADHD and depression can turn this into start paralysis.
- Implementation status: not_established_by_repository
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-001](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-ISS-002

- Status: `unverified`
- Category: `KH-ISS`; type: `issue`
- Relevance: notification design
- Scope and grade: `external` / `E0`
- Claim: Push notifications, badges, banners, and other interruptions can impair focus and become part of the problem.
- Implementation status: mitigations_present_but_causal_claim_unproven
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-013](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-ISS-003

- Status: `unverified`
- Category: `KH-ISS`; type: `issue`
- Relevance: neuroinclusive UX
- Scope and grade: `external` / `E0`
- Claim: Red counters, aggressive reminders, public streaks, and judgmental language can intensify avoidance and harm adoption and retention.
- Implementation status: gentle_private_alternatives_implemented_causal_claim_unproven
- Dependencies: none
- Conflicts: CF-005
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-020](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No user study, rendered acceptance, or behavioral outcome measurement was performed.; No tests were run; inspected test definitions do not prove that any test passed.

## KH-ISS-004

- Status: `unverified`
- Category: `KH-ISS`; type: `issue`
- Relevance: summary feature
- Scope and grade: `external` / `E0`
- Claim: AI summaries can be inaccurate or vulnerable to prompt injection through email content.
- Implementation status: evidence_contract_and_sanitization_present_no_prompt_injection_reproduction
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-032](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 4: [apps-script/tests/mail_sanitizer.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_sanitizer.test.js); Exact static test-definition inspection only; tests were not executed.; Definitions reject active/obfuscated HTML and unsafe attributes while preserving bounded safe layout and links.
- Evidence 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/5e7c1f70b01814d0cd14a45abcbe6dfa8d2f3efb/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds the trustworthy summary evidence contract.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-005

- Status: `unverified`
- Category: `KH-ISS`; type: `issue`
- Relevance: milestone design
- Scope and grade: `external` / `E0`
- Claim: Over-gamification can encourage impulsive use without long-term benefit.
- Implementation status: bounded_private_milestones_avoid_durable_tracking
- Dependencies: none
- Conflicts: CF-005
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-059](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No user study, rendered acceptance, or behavioral outcome measurement was performed.; No tests were run; inspected test definitions do not prove that any test passed.

## KH-ISS-006

- Status: `partial`
- Category: `KH-ISS`; type: `issue`
- Relevance: current summary and action design
- Scope and grade: `repository` / `E2`
- Claim: `AI overreach`: summaries without citations, opaque logic, and automatic actions without confirmation.
- Implementation status: evidence_and_explicit_action_controls_mitigate_risk_statically
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-060](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Evidence 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/5e7c1f70b01814d0cd14a45abcbe6dfa8d2f3efb/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds the trustworthy summary evidence contract.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-007

- Status: `partial`
- Category: `KH-ISS`; type: `issue`
- Relevance: current energy and density modes
- Scope and grade: `repository` / `E2`
- Claim: Low-energy mode will fail if it does not degrade to a genuinely simple mode.
- Implementation status: minimal_mode_with_three_primary_actions_implemented_statically
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-061](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Evidence 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds energy-aware Focus sessions.
- Evidence 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/359b8cba5cdcaee9ec022ccd659538a4dd108455/apps-script/MailApp.html); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds adaptive information density.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-ISS-008

- Status: `partial`
- Category: `KH-ISS`; type: `issue`
- Relevance: current OAuth onboarding
- Scope and grade: `mixed` / `E2`
- Claim: Complex authentication, lengthy onboarding, and repeated data entry create hidden barriers.
- Implementation status: direct_oauth_and_callback_fixes_present_staging_acceptance_missing
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-062](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/ISSUES.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ISSUES.md); Immutable bilingual issue-register inspection.; Current defects are tracked as GT-001 through GT-009; locally resolved items still require staging or real-time acceptance where stated.
- Evidence 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 5: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Exact immutable callback-relay inspection; environment-specific endpoint value omitted.; The relay clears the query from browser history, validates bounded state and code, forwards only action/state/code, and fails closed on malformed input.
- Evidence 6: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/f67af598369a710c93af91772ee25d5364095a1e/apps-script/Code.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit consolidates duplicate-delivery and OAuth repair implementation.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-ISS-009

- Status: `recommendation`
- Category: `KH-ISS`; type: `issue`
- Relevance: current Google integration
- Scope and grade: `repository` / `E2`
- Claim: Basic authentication should not be treated as a reliable Google or Microsoft path; modern authentication must be reflected in onboarding, account linking, and support.
- Implementation status: google_oauth_implemented_microsoft_out_of_scope
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-011](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Evidence 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Evidence 4: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-010

- Status: `partial`
- Category: `KH-ISS`; type: `issue`
- Relevance: current bridge architecture
- Scope and grade: `mixed` / `E2`
- Claim: There is no single official Telegram-to-Gmail API; the bridge must combine independent Telegram and Google interfaces.
- Implementation status: independent_telegram_and_google_interfaces_combined_statically
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-029](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Evidence 4: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-011

- Status: `unverified`
- Category: `KH-ISS`; type: `issue`
- Relevance: outside current scope
- Scope and grade: `external` / `E0`
- Claim: Postfix/Dovecot full-text search often requires a separate Solr or Flatcurve/Xapian design; Stalwart models search as a separate native store.
- Implementation status: not_applicable_to_current_repository
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-055](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; Presence or absence is established only for the assigned immutable commit.

## KH-ISS-012

- Status: `unverified`
- Category: `KH-ISS`; type: `issue`
- Relevance: outside current scope
- Scope and grade: `external` / `E0`
- Claim: Dovecot CE plus `dsync` is not a ready cluster control plane; an HA or multi-region roadmap may favor Stalwart or another unified stack.
- Implementation status: not_applicable_to_current_repository
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-057](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; Presence or absence is established only for the assigned immutable commit.

## KH-ISS-013

- Status: `partial`
- Category: `KH-ISS`; type: `issue`
- Relevance: current OAuth implementation
- Scope and grade: `repository` / `E2`
- Claim: Parallel token refresh can cause a race condition without locking.
- Implementation status: mixed_lock_coverage_gmail_refresh_has_no_local_lock
- Dependencies: none
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-046](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 4: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover replay-resistant sessions, token/state locks, account isolation, Focus, triage, energy/reminders, co-processing, backlog rescue, content-free metrics, URL safety, idempotent send, and scheduled send.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No concurrent execution or race reproduction was performed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-014

- Status: `partial`
- Category: `KH-ISS`; type: `issue`
- Relevance: current manifest
- Scope and grade: `repository` / `E2`
- Claim: An overbroad Gmail scope creates verification-failure risk and increases blast radius; no actual defect is confirmed.
- Implementation status: gmail_modify_is_narrower_than_full_mail_but_consent_surface_has_additional_required_scopes
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-057](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-015

- Status: `partial`
- Category: `KH-ISS`; type: `issue`
- Relevance: current logging
- Scope and grade: `repository` / `E2`
- Claim: Unredacted logging of external responses could disclose a token or private mail content; no actual instance is confirmed.
- Implementation status: no_direct_token_or_mail_response_log_found_error_logging_requires_dataflow_review
- Dependencies: none
- Conflicts: none
- Sensitivity: `secret-redacted`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-059](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No value-level secret scan of protected stores or full historical blobs was performed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-016

- Status: `contradicted`
- Category: `KH-ISS`; type: `issue`
- Relevance: current external URL handling
- Scope and grade: `repository` / `E2`
- Claim: Expected risk: an external URL without allowlisting or validation.
- Implementation status: allowlisting_scheme_validation_and_public_dns_checks_present
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-063](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-017

- Status: `contradicted`
- Category: `KH-ISS`; type: `issue`
- Relevance: current mail and UI rendering
- Scope and grade: `repository` / `E2`
- Claim: Expected risk: unescaped HTML or user-generated strings.
- Implementation status: server_and_client_sanitization_and_text_dom_paths_present
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-064](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 4: [apps-script/tests/mail_sanitizer.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_sanitizer.test.js); Exact static test-definition inspection only; tests were not executed.; Definitions reject active/obfuscated HTML and unsafe attributes while preserving bounded safe layout and links.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-018

- Status: `contradicted`
- Category: `KH-ISS`; type: `issue`
- Relevance: current state model
- Scope and grade: `repository` / `E2`
- Claim: Expected risk: all task state stored in one large JSON blob in `PropertiesService`.
- Implementation status: state_is_partitioned_across_scoped_registries_ledgers_and_keys
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-065](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-019

- Status: `contradicted`
- Category: `KH-ISS`; type: `issue`
- Relevance: current state model
- Scope and grade: `repository` / `E2`
- Claim: Expected risk: inbox labels used as the sole source of truth.
- Implementation status: properties_sessions_history_and_operation_ledgers_complement_gmail_labels
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-066](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-020

- Status: `partial`
- Category: `KH-ISS`; type: `issue`
- Relevance: current logging
- Scope and grade: `repository` / `E2`
- Claim: Expected risk: secrets written to `Logger.log()` or `console.log()`.
- Implementation status: no_direct_secret_logging_found_but_error_logging_not_exhaustively_dataflow_proven
- Dependencies: none
- Conflicts: none
- Sensitivity: `secret-redacted`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-067](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No value-level secret scan of protected stores or full historical blobs was performed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-021

- Status: `contradicted`
- Category: `KH-ISS`; type: `issue`
- Relevance: current polling implementation
- Scope and grade: `repository` / `E2`
- Claim: Expected risk: a one-shot polling loop silently ending at the execution limit.
- Implementation status: bounded_scans_continuation_state_retry_ledgers_and_minute_trigger_present
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-068](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-ISS-022

- Status: `partial`
- Category: `KH-ISS`; type: `issue`
- Relevance: current OAuth consent
- Scope and grade: `mixed` / `E2`
- Claim: Expected risk: an overly broad OAuth consent surface.
- Implementation status: scopes_are_functional_and_bounded_but_external_verification_surface_not_assessed
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-069](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No external primary-source verification was performed; Git evidence cannot establish this general claim.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; GitHub server-side security settings were not read.

## KH-ISS-023

- Status: `contradicted`
- Category: `KH-ISS`; type: `issue`
- Relevance: current webhook and session ingress
- Scope and grade: `repository` / `E2`
- Claim: Expected risk: a webhook without replay protection.
- Implementation status: constant_time_webhook_key_update_dedupe_one_use_states_and_session_replay_controls_present
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-070](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PROBLEMS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PROBLEMS.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 4: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Evidence 5: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover replay-resistant sessions, token/state locks, account isolation, Focus, triage, energy/reminders, co-processing, backlog rescue, content-free metrics, URL safety, idempotent send, and scheduled send.
- Evidence 6: [apps-script/tests/oauth_callback_bridge.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/oauth_callback_bridge.test.js); Exact static test-definition inspection only; tests were not executed.; The contract permits only one-use state/code forwarding and excludes authuser, prompt, scope, iss, browser storage, and console logging.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-LES-001

- Status: `unverified`
- Category: `KH-LES`; type: `lesson`
- Relevance: high
- Scope and grade: `external` / `E0`
- Claim: The main problem is often not reading a message but retaining the plan for what to do with it next.
- Implementation status: product_features_address_the_hypothesis_but_do_not_verify_it
- Dependencies: Primary user-research protocol and data; Applicability study for the target population
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-009](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence: no primary evidence retained
- Limitations: Repository features and report repetition cannot verify this behavioral generalization. Safe missing proof: a primary, reviewable user-study dataset or published study supporting the stated population and context.

## KH-LES-002

- Status: `recommendation`
- Category: `KH-LES`; type: `lesson`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: An `action-only inbox` should leave only action-requiring messages in inbox or unread; folders should be broad, and filters should remove even small recurring noise.
- Implementation status: not_implemented_as_action_only_inbox
- Dependencies: Owner inbox policy; Safe rule suggestion and confirmation flow
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-068](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; The tracked client exposes Inbox, Unread, All Mail, categories, labels, and server-wide Gmail filters rather than enforcing an action-only inbox.
- Limitations: Static scope does not establish how an individual mailbox is configured at runtime.

## KH-LES-003

- Status: `recommendation`
- Category: `KH-LES`; type: `lesson`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: A plain UI with the message text and three basic actions is more useful than extra affordances and complex menus.
- Implementation status: partially_implemented_in_focus_view_only
- Dependencies: Comparative usability evidence
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-069](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Evidence 2: [apps-script/README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/README.md); Static inspection at the pinned commit.; The tracked product is a Gmail client in Telegram, with a full Mini App, native Telegram callbacks, Gmail folders, drafts, mail actions, and an Apps Script backend.
- Evidence 3: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Test source was inspected but not run; this is E2, not E3.; Static contracts assert bounded Focus actions but also cover a feature-rich mail client with folders, compose, attachments, labels, and settings.
- Limitations: The comparative usefulness claim requires usability evidence; repository inspection only verifies the two UI scopes.

## KH-LES-004

- Status: `recommendation`
- Category: `KH-LES`; type: `lesson`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Micro-start techniques should reduce uncertainty and require only one minimal movement.
- Implementation status: partially_implemented_in_focus_and_gentle_action_flows
- Dependencies: Usability validation; Outcome definition for reduced uncertainty
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-072](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Evidence 2: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added energy-aware Focus sessions across implementation, tests, and the product contract.
- Evidence 3: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/product/p1-gentle-action-contract.md); Static contract inspection and immutable commit correlation.; The tracked gentle-action contract defines bounded, energy-aware interactions and related product behavior.
- Limitations: Static flows cannot verify reduced uncertainty or one-movement completion in real use.

## KH-LES-005

- Status: `recommendation`
- Category: `KH-LES`; type: `lesson`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: Do not put metadata, blobs, search, and queues in one database; the data plane should be layered.
- Implementation status: not_applicable_to_current_apps_script_storage_model
- Dependencies: External data-plane decision; Storage and retention architecture
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-052](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; The tracked implementation uses Gmail plus Apps Script properties and service APIs; no unified application database or layered external data plane was identified.
- Limitations: No external infrastructure or runtime storage configuration was inspected.

## KH-LES-006

- Status: `unverified`
- Category: `KH-LES`; type: `lesson`
- Relevance: medium
- Scope and grade: `external` / `E0`
- Claim: Reported user patterns include timed triage, archiving or deleting stale mail, fixed check windows, one quick email, and calendar or snooze linkage.
- Implementation status: some_related_features_present_but_user_pattern_unverified
- Dependencies: Primary user-research records; Sampling and methodology details
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-061](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence: no primary evidence retained
- Limitations: Implementation of timers, mail actions, snooze, or handoff does not verify that users exhibit these patterns. Safe missing proof: primary study notes or a reviewable dataset with methodology.

## KH-LES-007

- Status: `recommendation`
- Category: `KH-LES`; type: `lesson`
- Relevance: medium
- Scope and grade: `repository` / `E0`
- Claim: Building the frontend before a stable mail core creates integration instability; do not invert the work order.
- Implementation status: not_applicable_to_current_gmail_managed_core
- Dependencies: Defined self-hosted mail-core program; Comparative delivery evidence
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-073](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence: no primary evidence retained
- Limitations: Git chronology can show work order but cannot establish the claimed causal instability; the current product relies on Gmail rather than a newly built mail core.

## KH-LES-008

- Status: `recommendation`
- Category: `KH-LES`; type: `lesson`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Use time blindness, motivation, and dopamine as design models, not as a single explanation of ADHD.
- Implementation status: partially_reflected_in_energy_and_attention_design
- Dependencies: Clinical-safe language review; User research
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-007](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/docs/product/p1-gentle-action-contract.md); Commit metadata and changed-path inspection; the commit is an ancestor of the pinned commit.; The immutable commit added energy-aware Focus sessions across implementation, tests, and the product contract.
- Evidence 2: [docs/product/p1-gentle-action-contract.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/product/p1-gentle-action-contract.md); Static contract inspection and immutable commit correlation.; The tracked gentle-action contract defines bounded, energy-aware interactions and related product behavior.
- Evidence 3: [docs/design/focus-view-v28-spec.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/design/focus-view-v28-spec.md); Static specification inspection, correlated with tracked implementation and test-contract files.; Focus View preserves the Gmail skeleton, exposes an editable next step, and specifies exactly three primary actions.
- Limitations: Repository design artifacts address energy and attention but do not verify the scientific framing or prove that ADHD is not reduced to one model in external messaging.

## KH-LES-009

- Status: `partial`
- Category: `KH-LES`; type: `lesson`
- Relevance: medium
- Scope and grade: `mixed` / `E2`
- Claim: The repository tree is an architectural recommendation, not a Google canonical structure; it separates UI, business logic, integrations, background jobs, and security.
- Implementation status: repository_separation_present_but_not_complete
- Dependencies: Official Google structure comparison for the canonicality clause
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-101](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Static architecture inspection.; The repository documents a project-specific module arrangement.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Backend ingress, notifications, polling, Telegram transport, and Gmail operations remain substantially co-located.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; The authenticated mailbox backend is separated from the UI file, but it still combines several provider and state responsibilities.
- Limitations: The separation objective is partly visible. The statement that this is not a Google canonical structure was not checked against official external documentation.

## KH-LES-010

- Status: `recommendation`
- Category: `KH-LES`; type: `lesson`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: An Apps Script web app should be thin ingress; split heavy synchronous work or move it outside.
- Implementation status: contradicted_by_full_apps_script_backend
- Dependencies: External worker architecture; Latency and quota acceptance criteria
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-062](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Static symbol and control-flow inspection; no code was executed.; Apps Script handles ingress, polling, notification scans, Telegram transport, and Gmail actions.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Static symbol and control-flow inspection; no code was executed.; Apps Script hosts the authenticated mailbox RPC backend, sessions, drafts, provider integrations, and attachment workflows.
- Limitations: Static source shows a non-thin tracked backend but does not measure synchronous latency or deployed quota behavior.

## KH-LES-011

- Status: `partial`
- Category: `KH-LES`; type: `lesson`
- Relevance: high
- Scope and grade: `governance` / `E2`
- Claim: Working principle: minimum theory, maximum controlled verification, clear next actions, and controlled progress.
- Implementation status: controlled_evidence_governance_present
- Dependencies: Explicit standing adoption of the complete wording
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-082](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Static inspection on the canonical Instructions branch head.; Standing governance requires reconciliation before live claims and states that report-derived claims do not become live-verified without new evidence.
- Evidence 2: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Static inspection on the canonical Requests branch head.; REQ-0003 records report ingestion without runtime, Gmail, Telegram, Apps Script, or production changes and says report-derived claims did not become authority.
- Limitations: Canonical governance requires evidence, reconciliation, bounded routing, and status updates, but it does not adopt the complete phrase as a standing rule.

## KH-PERM-001

- Status: `partial`
- Category: `KH-PERM`; type: `permission`
- Relevance: permission_governance
- Scope and grade: `governance` / `E1`
- Claim: High-risk actions are allowed only after explicit user confirmation; this is a proposed permission gate, not granted authority.
- Implementation status: canonical_overlap_but_owner_request_trace_missing
- Dependencies: canonical Повноваження entry; traceable corresponding owner request
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-034](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [permissions/P-004-owner-intervention-boundaries.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/37ef923a0629da4cfd83b9f218561ead73386223/permissions/P-004-owner-intervention-boundaries.md); Compared once with the canonical active record.; P-004 has narrower stop conditions and no traceable REQ-ID.
- Evidence 3: [PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c32075367a0f8b5f0705f46835f28d74c3e0ff41/PERMISSIONS.md); Inspected immutable permission-branch ancestry and commit metadata.; P-001 through P-004 entered history at c320753 without a traceable REQ-ID; P-005 was added later from REQ-0002.
- Evidence 4: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Read once at the immutable REQ-0004 ledger tip.; REQ-0003 records permissions=reference and Permission basis: none; report candidates did not become authority.
- Evidence 5: [requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md); Read once at immutable commit c0ee799.; Requires primary evidence and canonical Повноваження plus a corresponding owner request for permission verification.
- Limitations: Exact safe missing proof: a canonical request record containing the owner's explicit high-risk confirmation rule and scope, linked from P-004 or a successor.

## KH-PERM-002

- Status: `recommendation`
- Category: `KH-PERM`; type: `permission`
- Relevance: future_product_scope
- Scope and grade: `mixed` / `E2`
- Claim: A future Telegram surface should allow only explicitly selected actions: priority view, summary, quick reply, task confirmation, snooze, and triage; this is a product-scope candidate, not owner permission.
- Implementation status: partially_implemented_nonexclusive_action_set
- Dependencies: explicit product-scope decision; action-level UX contract
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-032](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Priority, summary, snooze, and triage markers exist; quick-reply/task-confirmation markers were not found, while archive/trash/spam actions exist.
- Evidence 3: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Read once at the immutable REQ-0004 ledger tip.; REQ-0003 records permissions=reference and Permission basis: none; report candidates did not become authority.
- Limitations: Future scope is not authority; no rendered UI or runtime action inventory was executed.

## KH-PERM-003

- Status: `partial`
- Category: `KH-PERM`; type: `permission`
- Relevance: permission_governance
- Scope and grade: `governance` / `E1`
- Claim: Browser, CDP, and runtime tools may be considered only after checking capability and permissions; this is not owner-granted permission.
- Implementation status: canonical_browser_grant_asserted_but_owner_request_trace_missing
- Dependencies: canonical Повноваження entry; traceable corresponding owner request; capability evidence
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-030](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [permissions/P-001-browser-pc-control.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/37ef923a0629da4cfd83b9f218561ead73386223/permissions/P-001-browser-pc-control.md); Compared once with the canonical active record.; P-001 asserts browser/PC authority but has no REQ-ID and no CDP/runtime capability-check requirement.
- Evidence 3: [PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c32075367a0f8b5f0705f46835f28d74c3e0ff41/PERMISSIONS.md); Inspected immutable permission-branch ancestry and commit metadata.; P-001 through P-004 entered history at c320753 without a traceable REQ-ID; P-005 was added later from REQ-0002.
- Evidence 4: [requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md); Read once at the immutable REQ-0004 ledger tip.; REQ-0003 records permissions=reference and Permission basis: none; report candidates did not become authority.
- Evidence 5: [requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/c0ee79987b7d5637b35bb1462f1696fffcc4a828/requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md); Read once at immutable commit c0ee799.; Requires primary evidence and canonical Повноваження plus a corresponding owner request for permission verification.
- Limitations: Exact safe missing proof: the canonical owner request that granted P-001 plus explicit CDP/runtime scope and capability gate.

## KH-PLAN-001

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current delivery method
- Scope and grade: `repository` / `E1`
- Claim: Implementation should be evolutionary rather than a `big bang`.
- Implementation status: adopted_incrementally
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-053](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/apps-script/MailApp.html); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds neuroinclusive Focus View across client, server, tests, and design artifacts.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/fa15f11987c1435ca8975594780c8a1d1c91508d/apps-script/Code.gs); Git commit metadata and changed-path inspection.; The commit consolidates product v45 on an immutable Apps Script release lineage.
- Evidence 4: [docs/en/ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ROADMAP.md); Immutable bilingual roadmap inspection.; Versie 1 is the only active version; local fixes, manual OAuth acceptance, immutable staging, promotion, cleanup, tag, and release branch are distinct gates.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-002

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: implemented feature set
- Scope and grade: `repository` / `E2`
- Claim: Release 1: Focus View, four-class triage, batching, soft reminders, compassionate copy, cited summary, and low-pressure replies.
- Implementation status: implemented_statically_with_unverified_runtime
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-054](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 5: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Evidence 6: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Evidence 7: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/d88388ee9ac67dcfc537369014f36f7ad4b11a9a/apps-script/MailApp.html); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds neuroinclusive Focus View across client, server, tests, and design artifacts.
- Evidence 8: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/5e7c1f70b01814d0cd14a45abcbe6dfa8d2f3efb/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds the trustworthy summary evidence contract.
- Evidence 9: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/d6d105c3140d74888f89d77572f155d1eec941c0/apps-script/Code.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds compassionate account-scoped reminders; a later immutable commit continues them through digest windows.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-003

- Status: `verified`
- Category: `KH-PLAN`; type: `plan`
- Relevance: implemented feature set
- Scope and grade: `repository` / `E2`
- Claim: Release 2: energy modes, backlog rescue, calendar and task extraction, and co-processing.
- Implementation status: implemented_statically
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-055](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 4: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover replay-resistant sessions, token/state locks, account isolation, Focus, triage, energy/reminders, co-processing, backlog rescue, content-free metrics, URL safety, idempotent send, and scheduled send.
- Evidence 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/968826da8b9f13c27e6eef65033ead10c7797a11/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds energy-aware Focus sessions.
- Evidence 6: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/a41242cc608d1c94edb336eeb4f4c8b00ac1ec67/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds bounded backlog rescue sessions.
- Evidence 7: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/eadcd818f8ce008823aabfd6992efef53ff87572/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds evidence-grounded task and Calendar handoff.
- Evidence 8: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/7413454aa03581dbedaf75eab0e1c38b12e8bf8b/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds private co-processing presence.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-004

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: future personalization
- Scope and grade: `repository` / `E2`
- Claim: Release 3: personalized learning based on time of day, avoidance, reminder style, triage speed, and information density.
- Implementation status: adaptive_density_and_preferences_implemented_without_learning_model
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-056](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Evidence 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/359b8cba5cdcaee9ec022ccd659538a4dd108455/apps-script/MailApp.html); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds adaptive information density.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-005

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current metrics design
- Scope and grade: `repository` / `E2`
- Claim: Metrics should cover time to first action, completion without reopening, backlog recovery, resume time, reminder dismissals, overwhelm, guilt, adoption, and retention.
- Implementation status: content_free_metrics_implemented_for_subset
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-057](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Evidence 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/385f1dc5b2a04091d2bc9c471e52595570c6ee3c/apps-script/MailClient.gs); Git commit metadata and changed-path inspection, corroborated by active static code.; The commit adds private functional-relief metrics.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-PLAN-006

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: outside current scope
- Scope and grade: `repository` / `E1`
- Claim: Mailcow deployment: clone, run `generate_config.sh`, edit `mailcow.conf`, then run `docker compose pull/up`; the production host must avoid MTU, port, and host-service conflicts.
- Implementation status: not_implemented
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-023](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-007

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: outside current scope
- Scope and grade: `repository` / `E1`
- Claim: For Stalwart, allocate persistent storage, choose a backend, complete bootstrap, and configure domains, TLS, rate limits, spam policy, and the management API.
- Implementation status: not_implemented
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-026](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-008

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current Telegram architecture
- Scope and grade: `mixed` / `E2`
- Claim: Telegram flow: BotFather, Main Mini App, Allowed URLs, frontend, backend authentication, and linkage between Telegram identity and an internal account record.
- Implementation status: frontend_backend_identity_linkage_implemented_runtime_configuration_unverified
- Dependencies: none
- Conflicts: CF-002
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-031](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Evidence 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 5: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover replay-resistant sessions, token/state locks, account isolation, Focus, triage, energy/reminders, co-processing, backlog rescue, content-free metrics, URL safety, idempotent send, and scheduled send.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-009

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: outside current scope
- Scope and grade: `repository` / `E1`
- Claim: Single-node or MVP: Stalwart with RocksDB or default Mailcow, file or S3 blobs, Redis ephemeral state, and basic stack search.
- Implementation status: not_implemented
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-053](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-010

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: future scaling outside current scope
- Scope and grade: `repository` / `E1`
- Claim: Mid-scale or multi-tenant: PostgreSQL metadata, S3/MinIO blobs, Redis locks, queues, rate, session and cache state, plus a separate search backend when needed.
- Implementation status: not_implemented
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-054](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-011

- Status: `contradicted`
- Category: `KH-PLAN`; type: `plan`
- Relevance: superseded by current Gmail-centric mission
- Scope and grade: `mixed` / `E2`
- Claim: Target layered architecture: Stalwart or Mailcow core, a proprietary integration facade, AI and task workers, and smart web/mobile clients.
- Implementation status: not_current_architecture
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: CF-006
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-071](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Evidence 5: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-012

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: outside current Gmail-centric scope
- Scope and grade: `repository` / `E1`
- Claim: Phase 1: fix the protocol contract, select the core, launch a reference deployment with SPF, DKIM, DMARC, MTA-STS, TLS-RPT, backups, logs, and monitoring, then add API/BFF and clients.
- Implementation status: not_implemented
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-072](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-013

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: partly current
- Scope and grade: `repository` / `E2`
- Claim: Phase 2: Gmail API, Microsoft Graph, Telegram Bot and Mini App, storage adapters, and a consent/privacy module; Apps Script or an add-on is optional.
- Implementation status: gmail_telegram_storage_implemented_graph_and_standalone_consent_module_absent
- Dependencies: phase 4 Gmail contextual MVP
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-074](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 5: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 6: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; Presence or absence is established only for the assigned immutable commit.

## KH-PLAN-014

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: partly current
- Scope and grade: `repository` / `E2`
- Claim: Phase 3: an ADHD-first smart surface with quick-action, deadline-risk, waiting, later, filtered, and energy-required queues.
- Implementation status: focus_quick_actions_and_triage_implemented_full_queue_set_not_proven
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-075](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-015

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: outside current scope
- Scope and grade: `repository` / `E1`
- Claim: Quick MVP stack: Mailcow core, Roundcube or custom web shell, bundled Rspamd, integration service, Redis jobs, ADHD shell, and AI triage.
- Implementation status: not_implemented
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-076](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-016

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: outside current scope
- Scope and grade: `repository` / `E1`
- Claim: Long-term modern stack: Stalwart core, Bulwark as a reference or temporary client, proprietary orchestration, PostgreSQL scale backend, S3/MinIO, Redis, and custom clients.
- Implementation status: not_implemented
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-077](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-017

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: outside current scope
- Scope and grade: `repository` / `E1`
- Claim: Predictability stack: Postfix, Dovecot, Rspamd, OpenDKIM, OpenDMARC, OpenARC, Roundcube, and optional DAV server; this requires the most integration work.
- Implementation status: not_implemented
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-078](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No external primary-source verification was performed; Git evidence cannot establish this general claim.

## KH-PLAN-018

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current audit
- Scope and grade: `repository` / `E2`
- Claim: Prepare and execute a repository audit covering security, OAuth, state, locking, webhooks, MIME, logging, and secrets, ending with a patch plan.
- Implementation status: multiple_static_audits_and_fixes_exist_complete_patch_plan_not_proven
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-028](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-088](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Immutable tree and history inspection only; audit prose was not accepted as proof by repetition.; Multiple audit artifacts exist, disproving repository unavailability but not proving a complete runtime audit.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 5: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No value-level secret scan of protected stores or full historical blobs was performed.

## KH-PLAN-019

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current release engineering
- Scope and grade: `repository` / `E2`
- Claim: Build a release flow using `clasp`, Git branching, GitHub Actions, versioning, deployment, rollback, smoke tests, and security scanning.
- Implementation status: local_release_and_rollback_implemented_ci_smoke_security_lanes_absent
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-029](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Evidence 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Local git show-ref, tag, branch, merge-base, and divergence inspection at the assigned commit.; The active local and origin Versie branch matched the assigned commit; no tag or release/versie-001 ref existed, and main was on a divergent publication lineage.
- Evidence 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Evidence 5: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; GitHub server-side security settings were not read.

## KH-PLAN-020

- Status: `verified`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current architecture
- Scope and grade: `repository` / `E2`
- Claim: Prepare architecture v1.
- Implementation status: architecture_contract_present_and_reflected_in_code
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-086](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Evidence 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Evidence 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-021

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: future scaling
- Scope and grade: `repository` / `E1`
- Claim: Prepare the architecture v2 expansion path.
- Implementation status: future_partitioned_storage_path_documented_without_separate_v2_artifact
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-087](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-022

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current security
- Scope and grade: `repository` / `E2`
- Claim: Prepare the security-hardening plan.
- Implementation status: controls_and_audit_artifacts_exist_no_single_complete_plan_proven
- Dependencies: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-089](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 6: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Immutable tree and history inspection only; audit prose was not accepted as proof by repetition.; Multiple audit artifacts exist, disproving repository unavailability but not proving a complete runtime audit.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No value-level secret scan of protected stores or full historical blobs was performed.

## KH-PLAN-023

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current release gates
- Scope and grade: `repository` / `E1`
- Claim: Prepare a concrete checklist for launching the MVP in 7-14 days.
- Implementation status: concrete_versie1_gates_exist_without_7_14_day_commitment
- Dependencies: phase 2 neuroinclusive contract; phase 3 reference platform path
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-090](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ROADMAP.md); Immutable bilingual roadmap inspection.; Versie 1 is the only active version; local fixes, manual OAuth acceptance, immutable staging, promotion, cleanup, tag, and release branch are distinct gates.
- Evidence 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Immutable release-article inspection; prose was treated as a claim unless corroborated by code or Git metadata.; Versie 1 is explicitly in progress and not promoted, tagged, or represented by a release branch; production acceptance remains incomplete.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-024

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current release gates
- Scope and grade: `repository` / `E2`
- Claim: Prepare a concrete production-hardening checklist.
- Implementation status: guarded_release_steps_exist_without_complete_production_hardening_checklist
- Dependencies: phase 4 Gmail contextual MVP; phase 5 automation and Telegram; phase 6 security and release hardening
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-091](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Evidence 3: [apps-script/tests/release_versie_001_20260719.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/release_versie_001_20260719.test.js); Exact static test-definition inspection only; tests were not executed.; Definitions pin rollback/staging/candidate versions and assert current bundle hashes against the release helper.
- Evidence 4: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Immutable release-article inspection; prose was treated as a claim unless corroborated by code or Git metadata.; Versie 1 is explicitly in progress and not promoted, tagged, or represented by a release branch; production acceptance remains incomplete.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-025

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current tooling
- Scope and grade: `repository` / `E1`
- Claim: Local setup: create a separate Cloud project, enable Apps Script API, run `clasp login`, then `clasp create` or `clasp clone`, and keep the code in Git.
- Implementation status: git_and_clasp_release_artifacts_present_cloud_setup_not_proven
- Dependencies: phase 2 neuroinclusive contract; phase 3 reference platform path
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-098](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Exact deployment-filter inspection.; Only the manifest and four Apps Script implementation files are included in the clasp source bundle.
- Evidence 3: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Evidence 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-026

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current CI gap
- Scope and grade: `repository` / `E1`
- Claim: CI/CD should use protected `CLASPRC_JSON` and `.clasp.json` in GitHub Actions without committing credential values.
- Implementation status: not_implemented_in_workflows
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-099](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Evidence 3: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Evidence 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; GitHub server-side security settings were not read.

## KH-PLAN-027

- Status: `contradicted`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current repository layout
- Scope and grade: `repository` / `E1`
- Claim: The proposed tree separates `appsscript.json`, `src/addon`, `src/core`, `src/integrations`, `src/web`, `src/jobs`, `src/security`, `tests`, and `.github/workflows/deploy.yml`.
- Implementation status: repository_uses_flat_apps_script_bundle_and_no_deploy_workflow
- Dependencies: phase 2 neuroinclusive contract; phase 3 reference platform path
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-100](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Evidence 3: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Exact deployment-filter inspection.; Only the manifest and four Apps Script implementation files are included in the clasp source bundle.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.

## KH-PLAN-028

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current private pilot and future public release
- Scope and grade: `mixed` / `E2`
- Claim: Split scope strategy into an internal, private, or Workspace-only MVP and public production with minimized scopes and a verification package.
- Implementation status: private_owner_scope_established_public_verification_package_not_proven
- Dependencies: explicit owner scope decision; canonical permission and instruction reconciliation
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-104](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [docs/en/PROJECT.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/PROJECT.md); Immutable file inspection reconciled with the Ukrainian twin.; The current mission is a safe Gmail client in Telegram for one owner and explicitly connected accounts; the active Versie branch and current roadmap/issues are authoritative.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; GitHub server-side security settings were not read.

## KH-PLAN-029

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current manifest
- Scope and grade: `repository` / `E2`
- Claim: Start with narrow context, label, draft, and send scopes; add explicit external-request scope for `UrlFetchApp` only when needed.
- Implementation status: gmail_modify_without_full_mail_and_required_external_request_present
- Dependencies: phase 2 neuroinclusive contract; phase 3 reference platform path
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-105](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Evidence 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-030

- Status: `contradicted`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current event architecture
- Scope and grade: `repository` / `E2`
- Claim: Event flow: mailbox change to `watch`, Pub/Sub, Cloud Run consumer, normalize and deduplicate, enqueue or call Apps Script, then update labels, digest, task state, and Telegram output.
- Implementation status: apps_script_polling_webhook_and_gmail_history_used_instead
- Dependencies: phase 4 Gmail contextual MVP
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-113](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; Presence or absence is established only for the assigned immutable commit.

## KH-PLAN-031

- Status: `verified`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current release tooling
- Scope and grade: `repository` / `E2`
- Claim: Use `clasp` and immutable versions and deployments for release and rollback.
- Implementation status: implemented_statically
- Dependencies: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-050](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Evidence 3: [apps-script/tests/release_versie_001_20260719.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/release_versie_001_20260719.test.js); Exact static test-definition inspection only; tests were not executed.; Definitions pin rollback/staging/candidate versions and assert current bundle hashes against the release helper.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-032

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current CI gap
- Scope and grade: `repository` / `E1`
- Claim: Add GitHub CodeQL.
- Implementation status: not_implemented_at_commit
- Dependencies: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-051](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Evidence 3: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; GitHub server-side security settings were not read.

## KH-PLAN-033

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current external setting gap
- Scope and grade: `mixed` / `E1`
- Claim: Enable secret scanning from day one.
- Implementation status: not_proven
- Dependencies: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-052](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Evidence 3: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; GitHub server-side security settings were not read.; No value-level secret scan of protected stores or full historical blobs was performed.; The exact safe missing proof is a read-only GitHub security-settings readback showing secret scanning enabled for this repository.

## KH-PLAN-034

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current CI gap
- Scope and grade: `repository` / `E1`
- Claim: Add Dependabot for dependency alerts and updates.
- Implementation status: no_dependabot_configuration_at_commit
- Dependencies: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-053](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Evidence 3: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; GitHub server-side security settings were not read.

## KH-PLAN-035

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current CI gap
- Scope and grade: `repository` / `E1`
- Claim: CI should include linting, manifest validation, dry-run push, a staging smoke test, and a separate security lane.
- Implementation status: not_implemented_in_current_workflows
- Dependencies: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-054](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Evidence 3: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Evidence 4: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Presence or absence is established only for the assigned immutable commit.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-036

- Status: `contradicted`
- Category: `KH-PLAN`; type: `plan`
- Relevance: outdated current-state claim
- Scope and grade: `mixed` / `E2`
- Claim: The repository audit was not performed because availability or indexing was unconfirmed; only an audit plan is provided.
- Implementation status: repository_available_and_static_audit_evidence_present
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-055](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [KNOWLEDGE_HUB.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/4bd94b5a589182ece0c25e086486decec6d5e5da/KNOWLEDGE_HUB.md); Immutable canonical main-branch governance inspection.; The hub is explicitly report-derived baseline, not production-state evidence; Requests, Instructions, Permissions, and the active Versie are separate canonical areas.
- Evidence 3: [instructions/KNOWLEDGE_HUB_MAINTENANCE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/10630a566e81ff92542cea173d9021c764a7ec1a/instructions/KNOWLEDGE_HUB_MAINTENANCE.md); Immutable canonical Instructions-branch inspection.; Report-derived claims require new evidence and must be reconciled with current PROJECT, ROADMAP, or ISSUES before live assertions.
- Evidence 4: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Immutable tree and history inspection only; audit prose was not accepted as proof by repetition.; Multiple audit artifacts exist, disproving repository unavailability but not proving a complete runtime audit.
- Evidence 5: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Current evidence cannot prove what the earlier report author could access at the report date.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-037

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current audit method
- Scope and grade: `repository` / `E2`
- Claim: Inspect `appsscript.json` first: Gmail scopes, `script.external_request`, triggers, capability boundaries, and add-on/web-app separation.
- Implementation status: manifest_inspected_in_this_stream
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-056](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-038

- Status: `recommendation`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current security audit
- Scope and grade: `repository` / `E2`
- Claim: Inspect code and Git history for hardcoded secret classes, direct webhook URLs, private identifiers in fixtures, and full request or response logging.
- Implementation status: current_files_inspected_full_value_level_history_scan_not_performed
- Dependencies: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-058](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 5: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Evidence 6: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Static inspection with all values redacted.; The public helper contains environment-specific project/deployment identifiers and a machine-local recovery-path literal; no value is reproduced in this report.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No value-level secret scan of protected stores or full historical blobs was performed.; Presence or absence is established only for the assigned immutable commit.

## KH-PLAN-039

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current concurrency audit
- Scope and grade: `repository` / `E2`
- Claim: Check locking discipline for state, queues, checkpoints, send operations, Telegram calls, and token refresh.
- Implementation status: many_lock_paths_present_gmail_refresh_local_lock_gap_remains
- Dependencies: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-060](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Evidence 5: [apps-script/tests/mail_client.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_client.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover replay-resistant sessions, token/state locks, account isolation, Focus, triage, energy/reminders, co-processing, backlog rescue, content-free metrics, URL safety, idempotent send, and scheduled send.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No concurrent execution or race reproduction was performed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-040

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current webhook security
- Scope and grade: `repository` / `E2`
- Claim: For webhook ingress, verify signature or token validation, allowed methods, idempotency, deduplication, and absence of production debug output.
- Implementation status: token_validation_and_dedupe_present_debug_output_absence_not_runtime_proven
- Dependencies: phase 3 reference platform path; phase 4 Gmail contextual MVP; phase 5 automation and Telegram
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-061](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/tests/mail_actions.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_actions.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover gmail.modify without full-mail/send scope, webhook constant-time secret checks, callback deduplication, bounded polling/retry, account isolation, URL/DNS safety, Gmail History, and quiet-hour reminders.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.

## KH-PLAN-041

- Status: `verified`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current repository audit
- Scope and grade: `repository` / `E2`
- Claim: `Repo discovery`: manifest, scopes, deployment configuration, workflows, README, release notes, and secret usage.
- Implementation status: completed_for_assigned_commit
- Dependencies: phase 0 authority reconciliation
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-073](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [README.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/README.md); Full immutable git ls-tree inventory plus targeted static inspection.; The repository is Apps Script, static callback, documentation, tests, and release tooling; no Mailcow, Stalwart, Dovecot, Postfix, Redis, PostgreSQL, Pub/Sub, Cloud Run, or Microsoft Graph implementation exists.
- Evidence 3: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Evidence 5: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Immutable release-article inspection; prose was treated as a claim unless corroborated by code or Git metadata.; Versie 1 is explicitly in progress and not promoted, tagged, or represented by a release branch; production acceptance remains incomplete.
- Evidence 6: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact ignore-policy inspection.; Credential-like files, tokens, keys, logs, caches, and local artifacts are excluded by pattern; this does not prove GitHub server-side secret scanning.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No value-level secret scan of protected stores or full historical blobs was performed.; Presence or absence is established only for the assigned immutable commit.

## KH-PLAN-042

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current OAuth audit
- Scope and grade: `mixed` / `E2`
- Claim: `OAuth trace`: redirect URI, consent screen, scopes, token errors, and races.
- Implementation status: static_redirect_scope_state_and_refresh_trace_completed_runtime_trace_missing
- Dependencies: phase 0 authority reconciliation
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-074](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Single-pass static OAuth, identity, state, and lock inspection with sensitive literals redacted.; Found Telegram-user/zone/connection authorization, one-use OAuth state, separate protected token records, profile avatar capture, account-scoped registries, and numerous locks; the Gmail access-token refresh function has no lock local to that function.
- Evidence 3: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Exact immutable callback-relay inspection; environment-specific endpoint value omitted.; The relay clears the query from browser history, validates bounded state and code, forwards only action/state/code, and fails closed on malformed input.
- Evidence 4: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 5: [apps-script/tests/oauth_callback_bridge.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/oauth_callback_bridge.test.js); Exact static test-definition inspection only; tests were not executed.; The contract permits only one-use state/code forwarding and excludes authuser, prompt, scope, iss, browser storage, and console logging.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No concurrent execution or race reproduction was performed.

## KH-PLAN-043

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current UI audit
- Scope and grade: `repository` / `E2`
- Claim: `Gmail UI trace`: homepage, context cards, compose, empty states, and error cards.
- Implementation status: static_ui_trace_completed_rendered_behavior_unverified
- Dependencies: phase 0 authority reconciliation
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-075](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Evidence 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-PLAN-044

- Status: `blocked`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current runtime evidence gap
- Scope and grade: `runtime` / `E2`
- Claim: `Network trace`: external calls, response codes, retries, duplicates, and latency.
- Implementation status: static_call_paths_only
- Dependencies: phase 0 authority reconciliation
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-076](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found account-scoped RPC, Focus rules, four-way attention triage, backlog rescue, co-processing, functional metrics, evidence-grounded handoff, sanitizers, URL/DNS checks, operation journals, scheduled send, sessions, and lock-protected state paths.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; The exact safe missing proof is a read-only staging network trace tied to this commit showing redacted endpoint class, response code, retry and deduplication outcome, and latency.

## KH-PLAN-045

- Status: `blocked`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current runtime evidence gap
- Scope and grade: `runtime` / `E2`
- Claim: `Runtime trace`: execution logs, disabled triggers, retry loops, continuation state, and `historyId`.
- Implementation status: static_continuation_and_history_paths_only
- Dependencies: phase 0 authority reconciliation
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-077](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 3: [docs/en/ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/ROADMAP.md); Immutable bilingual roadmap inspection.; Versie 1 is the only active version; local fixes, manual OAuth acceptance, immutable staging, promotion, cleanup, tag, and release branch are distinct gates.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; The exact safe missing proof is a read-only Apps Script execution-log and trigger snapshot tied to the immutable deployment and commit, including retry, continuation, and historyId state with private values redacted.

## KH-PLAN-046

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current release evidence gap
- Scope and grade: `mixed` / `E2`
- Claim: `Release trace`: staging/production separation, rollback, log privacy, CodeQL, and secret scanning.
- Implementation status: release_and_rollback_static_paths_present_security_services_and_runtime_separation_unproven
- Dependencies: phase 4 Gmail contextual MVP; phase 5 automation and Telegram; phase 6 security and release hardening
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-078](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Evidence 3: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Local git show-ref, tag, branch, merge-base, and divergence inspection at the assigned commit.; The active local and origin Versie branch matched the assigned commit; no tag or release/versie-001 ref existed, and main was on a divergent publication lineage.
- Evidence 4: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow checks bilingual documentation only with read-only contents permission.
- Evidence 5: [2b3b9e2f678f](https://github.com/Tarasevych/gmail-telegram-controls/tree/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a); Exact workflow inspection plus immutable .github tree inventory.; This workflow validates bilingual knowledge-hub hygiene only; no CodeQL, Dependabot configuration, deploy workflow, staging smoke lane, or separate security lane exists at the commit.
- Evidence 6: [docs/en/releases/VERSIE-001-2026-07-19.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/releases/VERSIE-001-2026-07-19.md); Immutable release-article inspection; prose was treated as a claim unless corroborated by code or Git metadata.; Versie 1 is explicitly in progress and not promoted, tagged, or represented by a release branch; production acceptance remains incomplete.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; GitHub server-side security settings were not read.; No value-level secret scan of protected stores or full historical blobs was performed.

## KH-PLAN-047

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current neuroinclusive UX
- Scope and grade: `repository` / `E2`
- Claim: `UX trace`: primary CTA count, digest tone, quiet mode, and non-shaming backlog.
- Implementation status: static_contracts_present_behavioral_acceptance_missing
- Dependencies: phase 0 authority reconciliation; phase 1 evidence and foundation audit; phase 6 security and release hardening
- Conflicts: CF-001
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-079](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass static function/API/pattern inspection with sensitive literals redacted.; Found owner/same-email notification deduplication, bounded delivery ledgers, polling and continuation state, Script/User locks, one-use launch nonces, webhook-key validation, reminders, Gmail History synchronization, and Telegram callbacks.
- Evidence 4: [apps-script/tests/mail_app_contract.test.js](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tests/mail_app_contract.test.js); Static test-name and relevant contract inspection only; tests were not executed.; Definitions cover avatar routing, exact account preservation, three primary Focus actions, compassionate energy/reminder settings, adaptive density, co-processing, gentle milestones, backlog rescue, content-free metrics, accessible onboarding, and idempotent compose.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No user study, rendered acceptance, or behavioral outcome measurement was performed.

## KH-PLAN-048

- Status: `partial`
- Category: `KH-PLAN`; type: `plan`
- Relevance: current acceptance gap
- Scope and grade: `mixed` / `E2`
- Claim: Acceptance artifacts: scopes, endpoint map, state diagram, concurrency hotspots, privacy-exposure locations, OAuth reproduction, UI evidence, and a before/after patch plan.
- Implementation status: several_artifacts_present_complete_package_not_proven
- Dependencies: phase 4 Gmail contextual MVP; phase 5 automation and Telegram; phase 6 security and release hardening
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-081](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/MASTER_ROADMAP.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/MASTER_ROADMAP.md); The English and Ukrainian source pages were read once and reconciled by canonical ID.; This records the assigned report-derived claim and is not independent evidence of implementation or runtime behavior.
- Evidence 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Exact immutable manifest inspection.; The project enables Gmail v1 and requests gmail.modify, drive.readonly, script.external_request, and script.scriptapp; the web app executes as the deployer and allows anonymous ingress that application code must authenticate.
- Evidence 3: [apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/V26_MULTI_ACCOUNT_ARCHITECTURE.md); Immutable architecture-contract inspection, corroborated where possible by current code.; A Gmail/Telegram identity-to-zone-to-role-to-connection contract and a future partitioned storage path are documented; Mailcow, Stalwart, and Microsoft Graph are not the current implementation.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Single-pass static function/DOM/pattern inspection with sensitive literals redacted.; Found Focus View, triage, energy/reminder/density settings, quiet hours, co-processing, gentle milestones, backlog rescue, evidence display, account avatars, direct OAuth navigation with fallback, empty/error states, compose, DOM sanitization, and idempotent client operation IDs.
- Evidence 5: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Exact immutable callback-relay inspection; environment-specific endpoint value omitted.; The relay clears the query from browser history, validates bounded state and code, forwards only action/state/code, and fails closed on malformed input.
- Evidence 6: [apps-script/tools/release_apps_script_versie_001_20260719.ps1](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/tools/release_apps_script_versie_001_20260719.ps1); Exact static release-helper inspection with credentials, environment identifiers, and local path values omitted.; The helper pins hashes for rollback, legacy staging, and candidate bundles; separates preflight, stage, promote, cleanup, and rollback; journals at-most-once creates; and verifies immutable content.
- Evidence 7: [docs/audit/v45-nonworking-functions-fix-list.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/audit/v45-nonworking-functions-fix-list.md); Immutable tree and history inspection only; audit prose was not accepted as proof by repetition.; Multiple audit artifacts exist, disproving repository unavailability but not proving a complete runtime audit.
- Limitations: The knowledge-hub source is report-derived provenance, not independent proof.; Static inspection establishes implementation structure but not successful execution.; No tests were run; inspected test definitions do not prove that any test passed.; No Gmail, Telegram, Apps Script, staging, or production state was accessed.; No value-level secret scan of protected stores or full historical blobs was performed.

## KH-PROD-001

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: AI should turn a message into a next step, draft, reminder, task, or deferred action.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-006](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Evidence 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Evidence 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Evidence 6: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Limitations: Static code supports summaries, next actions, drafts, reminders, tasks, and deferral, but it does not prove model quality or successful end-to-end behavior.

## KH-PROD-002

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Provide energy- and context-aware time modes, effort estimates, and deadline-risk signals.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-011; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-011](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-016](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-037](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-064](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-011](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Limitations: Energy/focus state and heuristic deadline/risk extraction are present; calibrated effort estimates and context-aware timing are not fully established by static inspection.

## KH-PROD-003

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Group mail into manageable sessions while preserving a separate channel for genuinely urgent signals.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-011; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-015](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-069](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-015](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Limitations: Managed focus sessions and an urgent-only preference exist, but a distinct emergency channel and its runtime routing were not proven.

## KH-PROD-004

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `mixed` / `E2`
- Claim: Reward concrete small completions without gambling mechanics, oversized goals, or streak penalties.
- Implementation status: implemented
- Dependencies: KH-DEP-011
- Conflicts: CF-005
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-017](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-044](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-067](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-017](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected resetGentleMilestones, recordGentleMilestone, and renderGentleMilestoneCard.; A dismissible gentle-milestone UI records small completion events; no streak or gambling mechanism was identified in the selected source.
- Limitations: The gentle-milestone code supports small completion acknowledgements and no streak mechanism was identified, but absence of manipulative effects requires UX review.

## KH-PROD-005

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `mixed` / `E2`
- Claim: In start or low-energy mode, show only a few smallest achievable actions without shame.
- Implementation status: implemented
- Dependencies: KH-DEP-011; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-021](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-063](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-008](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Limitations: Low-energy focus and bounded action surfaces are present; the no-shame outcome and action suitability need accessibility/usability acceptance evidence.

## KH-PROD-006

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Indecision support should offer ready choices: `Reply later`, `Convert to task`, `Ask AI for draft`, and `Archive with reminder`.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-023](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected evidence-grounded task title and Calendar suggestion construction.; Task and Calendar handoff suggestions are derived from message evidence; the backend explicitly avoids inventing dates or creating Calendar objects.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected task/calendar evidence rendering and calendar handoff URL construction.; The UI exposes task and Calendar handoff actions.
- Evidence 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Evidence 6: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Limitations: Reply/defer, task handoff, archive/snooze, and draft flows exist; the exact four-option contract, especially `Ask AI for draft`, was not established.

## KH-PROD-007

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: The focus surface should be low-density, single-column or card-based, and should not imitate a full mail client.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-011
- Conflicts: CF-001
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-035](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-066](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-107](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected folders, threads, compose, attachments, labels, focus, and adaptive-density UI.; The repository implements a broad mail web app with an optional focused/adaptive surface, not only a minimal card surface.
- Limitations: Adaptive low-density focus UI exists, but it is embedded in a broad full mail client; whether the focus surface feels distinct requires rendered UX evidence.

## KH-PROD-008

- Status: `verified`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: `Resume Rail`: last conversation, stopping point, and autosaved position, state, and partial triage.
- Implementation status: implemented
- Dependencies: KH-DEP-015; KH-DEP-018
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-036](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected normalizeResumeRail, buildResumeRail, lifecycle autosave, and session-bar functions.; Resume Rail and best-effort autosave code preserve selected UI/session state.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected attention resume state and persisted session-family functions.; Backend state supports resumption and session continuity.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-009

- Status: `unverified`
- Category: `KH-PROD`; type: `product`
- Relevance: medium
- Scope and grade: `repository` / `E1`
- Claim: `Start Button`: begin with one sentence, a summary, a decision, or a date move.
- Implementation status: unknown
- Dependencies: KH-DEP-011
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-038](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The selected implementation inventory did not establish a dedicated `Start Button` contract; adjacent summary and next-action controls are not equivalent proof.

## KH-PROD-010

- Status: `verified`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Use quiet, non-judgmental reminders and a digest containing a small number of the most important messages.
- Implementation status: implemented
- Dependencies: KH-DEP-011; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-039](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R1-045](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-065](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-013](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-016](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-011

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Route messages into a few broad states for action, waiting, reference, and later.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-040](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-014](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Limitations: Archive/inbox, snooze/later, labels, and action state exist; the exact action/waiting/reference/later taxonomy is not fully represented.

## KH-PROD-012

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: `Cited Summary`: a summary, three key source sentences, and a `who/what/when/next-action` block.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-041](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Limitations: Evidence fragments and action/deadline/amount/risk metadata exist, but exactly three sentences and the complete `who/what/when/next-action` schema were not established.

## KH-PROD-013

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: `Trust Layer`: AI label, confidence band, source display, and confirmation of high-risk claims.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-042](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Limitations: An automated-AI label, evidence source, and risk heuristics exist; a calibrated confidence band and explicit high-risk confirmation gate were not fully established.

## KH-PROD-014

- Status: `verified`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Provide short energy-aware reply templates and controlled delayed sending without copying private content.
- Implementation status: implemented
- Dependencies: KH-DEP-013; KH-DEP-015
- Conflicts: CF-004
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-043](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-068](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md), [R3-035](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Evidence 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected HTML/style/label/attachment sanitizers and source-fragment bounds.; The backend contains explicit sanitization, bounded evidence fragments, and owner/session authorization checks.
- Evidence 6: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inspected CSP, referrer policy, state/code validation, and query removal.; The callback relay minimizes retained OAuth response data and rejects malformed input.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-015

- Status: `verified`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Provide a short co-processing/body-doubling mode focused on one action without duplicating private content.
- Implementation status: implemented
- Dependencies: KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-046](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R3-040](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected mailboxCoProcessingSession_ and presence normalization/DTO functions.; Private 10- or 25-minute co-processing sessions are implemented as account-scoped presence state.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected co-processing card, clock, disclosure, and session controls.; A dedicated one-action co-processing surface is present.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected HTML/style/label/attachment sanitizers and source-fragment bounds.; The backend contains explicit sanitization, bounded evidence fragments, and owner/session authorization checks.
- Evidence 4: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inspected CSP, referrer policy, state/code validation, and query removal.; The callback relay minimizes retained OAuth response data and rejects malformed input.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-016

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: `Neuroinclusive onboarding`: three steps, progress, a sticky summary, magic links/passkeys, and stable help placement.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-011; KH-DEP-019
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-047](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding preference, rendering, focus isolation, choice, and completion functions.; A multi-step neuroinclusive onboarding flow with progress/preferences and reachable help UI is present; no passkey or magic-link implementation was established.
- Evidence 2: [gmail-oauth-callback.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/gmail-oauth-callback.html); Inspected the sanitized OAuth callback relay page.; The connection flow is OAuth callback based, not a magic-link or passkey flow.
- Limitations: Multi-step onboarding and stable help are present; no magic-link or passkey implementation was found, and sticky-summary behavior was not fully established.

## KH-PROD-017

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: Visual anchors: thread timeline, status stickers, session progress, and a pinned next step.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-011
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-049](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Evidence 4: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Limitations: Session progress, thread-state labels, and next-action controls exist; a complete thread timeline and pinned-next-step contract were not established.

## KH-PROD-018

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Combine deterministic rules, statistical scoring, and AI for noise filtering, summaries, and action extraction.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-050](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-048](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Evidence 3: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: Deterministic rules and heuristic scores are implemented, but no statistical-model or external AI dependency/declaration was found; the `automated-ai-analysis` label alone is not proof of AI.

## KH-PROD-019

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Calendar- and task-based messages should propose an event, reminder, or checklist.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-051](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected evidence-grounded task title and Calendar suggestion construction.; Task and Calendar handoff suggestions are derived from message evidence; the backend explicitly avoids inventing dates or creating Calendar objects.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected task/calendar evidence rendering and calendar handoff URL construction.; The UI exposes task and Calendar handoff actions.
- Limitations: Evidence-grounded task and Calendar handoff are present; reminder/checklist coverage and end-to-end creation are not proven.

## KH-PROD-020

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `mixed` / `E2`
- Claim: The AI assistant should adapt summaries, action scaffolding, and automation to energy without a separate noisy chat interface.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-052](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md), [R2-070](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Evidence 5: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: Energy-aware scaffolding and non-chat UI are present; actual AI adaptation and outcome quality are not established by static source.

## KH-PROD-021

- Status: `blocked`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `mixed` / `E2`
- Claim: Target concept: mail assumes part of the executive-function burden, reduces noise, explains priority, preserves context, and decomposes work.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-011; KH-DEP-013; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-063](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Evidence 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected normalizeResumeRail, buildResumeRail, lifecycle autosave, and session-bar functions.; Resume Rail and best-effort autosave code preserve selected UI/session state.
- Evidence 6: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected attention resume state and persisted session-family functions.; Backend state supports resumption and session continuity.
- Limitations: Safe missing proof: a read-only acceptance or usability result tied to the pinned commit demonstrating reduced noise, understandable priority, preserved context, and successful work decomposition.

## KH-PROD-022

- Status: `recommendation`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `mixed` / `E1`
- Claim: Modular trajectory: Postfix plus Dovecot with separate antispam, DKIM/DMARC/ARC, webmail, and DAV components.
- Implementation status: not_implemented
- Dependencies: Postfix; Dovecot; antispam; DAV
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-003](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-023

- Status: `recommendation`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `mixed` / `E1`
- Claim: Integrated container trajectory: Mailcow or Docker Mailserver for faster launch with less glue code.
- Implementation status: not_implemented
- Dependencies: Mailcow; Docker Mailserver
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-004](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-024

- Status: `recommendation`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `mixed` / `E1`
- Claim: All-in-one trajectory: Stalwart, with Maddy or Apache James for specific scenarios; Stalwart is the modern-first candidate.
- Implementation status: not_implemented
- Dependencies: Stalwart; Maddy; Apache James
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-005](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-025

- Status: `recommendation`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `mixed` / `E1`
- Claim: Add Thunderbird autoconfig XML and track IETF auto-configuration to reduce onboarding friction.
- Implementation status: not_implemented
- Dependencies: Thunderbird autoconfig; IETF auto-configuration
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-012](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-026

- Status: `unverified`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `external` / `E1`
- Claim: Postfix plus Dovecot provide a mature SMTP/IMAP/POP3 stack; caveat: Dovecot CE is described as a single-server edition.
- Implementation status: not_applicable
- Dependencies: Postfix; Dovecot
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-014](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-027

- Status: `unverified`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `external` / `E1`
- Claim: Mailcow integrates Postfix, Dovecot, Rspamd, Redis, MariaDB, SOGo, Nginx, and ACME; caveat: it is a heavy multi-container bundle.
- Implementation status: not_applicable
- Dependencies: Mailcow
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-015](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-028

- Status: `unverified`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `external` / `E1`
- Claim: Stalwart combines JMAP, IMAP, POP3, SMTP, CalDAV, CardDAV, and WebDAV; caveat: it has a large control surface.
- Implementation status: not_applicable
- Dependencies: Stalwart
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-016](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-029

- Status: `unverified`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `external` / `E1`
- Claim: Docker Mailserver is a simpler container-first mail server without SQL, but has fewer integrated groupware capabilities.
- Implementation status: not_applicable
- Dependencies: Docker Mailserver
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-017](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-030

- Status: `unverified`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `external` / `E1`
- Claim: Maddy is a lightweight all-in-one SMTP and IMAP server with less glue code but a smaller integration ecosystem.
- Implementation status: not_applicable
- Dependencies: Maddy
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-018](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-031

- Status: `unverified`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `external` / `E1`
- Claim: Cyrus IMAP and Apache James suit enterprise, JMAP, and scale scenarios but require more operational discipline.
- Implementation status: not_applicable
- Dependencies: Cyrus IMAP; Apache James
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-019](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-032

- Status: `unverified`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `external` / `E1`
- Claim: Stalwart uses a minimal `config.json`, data-store configuration, WebUI/CLI, bootstrap and recovery modes; the model supports wizard, declarative, and multi-tenant control.
- Implementation status: not_applicable
- Dependencies: Stalwart
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-025](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: The repository cannot establish current external capability, version, license, limits, or vendor behavior; no current primary external source was accessed.

## KH-PROD-033

- Status: `verified`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Apps Script, GmailApp, and Gmail API provide a low-code path for Google Workspace automation and prototyping.
- Implementation status: implemented
- Dependencies: Gmail API v1; Apps Script
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-027](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Evidence 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-034

- Status: `recommendation`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `external` / `E1`
- Claim: Postfix `postscreen` is the recommended first perimeter layer before content filtering.
- Implementation status: not_implemented
- Dependencies: Postfix
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-035](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-035

- Status: `recommendation`
- Category: `KH-PROD`; type: `product`
- Relevance: low
- Scope and grade: `external` / `E1`
- Claim: Webmail candidates: Roundcube for classic/plugin IMAP, SnappyMail for a lightweight UI, Nextcloud Mail for suite integration, and Bulwark for JMAP/Stalwart.
- Implementation status: not_implemented
- Dependencies: Roundcube; SnappyMail; Nextcloud Mail; Bulwark
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-043](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: This is a normative architecture recommendation. Repository presence or absence does not verify its external merit, compatibility, licensing, or current limits.

## KH-PROD-036

- Status: `recommendation`
- Category: `KH-PROD`; type: `product`
- Relevance: medium
- Scope and grade: `mixed` / `E1`
- Claim: Delivery clients: web/PWA with service workers/VAPID, React Native or Flutter with APNs/FCM, and Tauri or Electron for desktop.
- Implementation status: partially_implemented
- Dependencies: PWA; VAPID; React Native; Flutter; Tauri; Electron
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-051](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: A web app exists, but the listed PWA push, native-mobile, and desktop-framework dependencies are not declared. The broader technology choice remains a recommendation.

## KH-PROD-037

- Status: `unverified`
- Category: `KH-PROD`; type: `product`
- Relevance: medium
- Scope and grade: `repository` / `E2`
- Claim: A Gmail add-on is a contextual card surface for quick triage.
- Implementation status: not_implemented
- Dependencies: KH-DEP-011
- Conflicts: CF-001
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-018](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-092](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Limitations: The active manifest declares only a web app and no Gmail add-on configuration; external Gmail add-on capability was not independently verified.

## KH-PROD-038

- Status: `verified`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: The web app is the Flow Layer for dashboard, backlog, rules, focus, and energy modes.
- Implementation status: implemented
- Dependencies: KH-DEP-011; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-019](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-093](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Inspected enabled advanced services, OAuth scopes, runtime, and web-app declaration.; The manifest enables Gmail API v1, declares Gmail modify/Drive read-only/external-request/script scopes, and declares a web app; it has no Gmail add-on declaration or third-party library entry.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected folders, threads, compose, attachments, labels, focus, and adaptive-density UI.; The repository implements a broad mail web app with an optional focused/adaptive surface, not only a minimal card surface.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-039

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: `Automation Layer`: `watch`, `history.list`, queue/worker, and Apps Script orchestration.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013; KH-DEP-015; KH-DEP-018
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-020](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Evidence 3: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Evidence 4: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: Apps Script history synchronization, property-backed work ledgers, retries, and triggers exist; Gmail `watch`, Pub/Sub ingress, and an external worker are not declared.

## KH-PROD-040

- Status: `unverified`
- Category: `KH-PROD`; type: `product`
- Relevance: medium
- Scope and grade: `governance` / `E1`
- Claim: The target audience includes users with ADHD, executive dysfunction, and frequent comorbid depression.
- Implementation status: unknown
- Dependencies: none
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-023](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/.claspignore](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/.claspignore); Compared the full pinned Git tree with the explicit Apps Script deployment allowlist and manifest.; The deployable set is four Apps Script/HTML sources plus the manifest. The active tree has no Node package manifest, Redis, Mailcow, Postfix/Dovecot, Pub/Sub/Cloud Run, OpenPGP, S/MIME, or listed mail-library declaration.
- Limitations: Production code can embody neuroinclusive patterns but cannot establish audience demographics, diagnoses, or comorbidity claims; no independent primary evidence was accessed.

## KH-PROD-041

- Status: `blocked`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `mixed` / `E2`
- Claim: Minimize cognitive load, decision fatigue, notification overwhelm, and task paralysis.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-001; KH-DEP-011
- Conflicts: CF-003
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-024](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Evidence 5: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus-visible styles, dialog focus traps, isolation helpers, accessible controls, and reduced-density UI structure.; Static accessibility primitives exist, but conformance and cognitive-accessibility outcomes require an audit and acceptance evidence.
- Limitations: Safe missing proof: an accessibility/usability acceptance artifact tied to the pinned commit measuring cognitive load, decision fatigue, notification overwhelm, and task-paralysis outcomes.

## KH-PROD-042

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Gmail integration should support UI triage, near-real-time `watch/history`, and later Telegram/dashboard expansion.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013; KH-DEP-015; KH-DEP-018
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-027](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Gmail history state, current-history-id, changed-message lookup, checkpoint persistence, and trigger continuation functions.; Gmail history synchronization, bounded continuation, retries, and Telegram card reconciliation are implemented in Apps Script.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram update validation/routing, callback handling, Bot API requests, digest/cards, browsing, and menu functions.; The repository contains an owner-scoped Telegram Bot API control plane with short actions and message cards.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected folders, threads, compose, attachments, labels, focus, and adaptive-density UI.; The repository implements a broad mail web app with an optional focused/adaptive surface, not only a minimal card surface.
- Limitations: UI triage, Gmail history synchronization, Telegram, and dashboard-like web UI exist; `watch`/Pub/Sub near-real-time delivery is not declared or proven.

## KH-PROD-043

- Status: `verified`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Telegram Bot API is an external short-command and digest control surface.
- Implementation status: implemented
- Dependencies: Telegram Bot API
- Conflicts: CF-002
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-097](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram update validation/routing, callback handling, Bot API requests, digest/cards, browsing, and menu functions.; The repository contains an owner-scoped Telegram Bot API control plane with short actions and message cards.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-044

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: First card level: one-line AI summary, type icon, and estimated effort.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-013
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-108](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected thread-summary, evidence-source, action/deadline/amount/risk extraction, and deterministic scoring functions.; The backend builds Ukrainian summaries with source fragments and action metadata using deterministic heuristics.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected summary/evidence rendering and task/calendar handoff symbols.; The frontend renders summary evidence and structured follow-up suggestions.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Limitations: Card summaries and visual metadata exist; an actual AI model and calibrated estimated effort were not established.

## KH-PROD-045

- Status: `verified`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Second card level: three actions: quick reply, defer, and convert to task.
- Implementation status: implemented
- Dependencies: KH-DEP-013; KH-DEP-015
- Conflicts: CF-001
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-109](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected evidence-grounded task title and Calendar suggestion construction.; Task and Calendar handoff suggestions are derived from message evidence; the backend explicitly avoids inventing dates or creating Calendar objects.
- Evidence 4: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected task/calendar evidence rendering and calendar handoff URL construction.; The UI exposes task and Calendar handoff actions.
- Evidence 5: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Evidence 6: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-046

- Status: `verified`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Third card level: collapsed metadata, thread details, attachments, and labels.
- Implementation status: implemented
- Dependencies: KH-DEP-013
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-110](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected folders, threads, compose, attachments, labels, focus, and adaptive-density UI.; The repository implements a broad mail web app with an optional focused/adaptive surface, not only a minimal card surface.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-047

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: The Gmail homepage should show a small prioritized set: priority mail, quick win, short work block, and waiting follow-up.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-011; KH-DEP-015
- Conflicts: CF-003
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-111](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected focus, energy, density, session, next-action, and resume UI symbols in the pinned blob.; The frontend contains focus settings, focus-session rendering, density modes, a next-action editor, and a Resume Rail; this proves code presence only.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected focus registry/evaluation and attention-state functions in the pinned blob.; The backend contains account-scoped focus levels/rules, attention state, backlog rescue, and persisted session-related DTOs.
- Limitations: Priority/focus, quick-win, and bounded backlog/session concepts are implemented; the exact four-part homepage set, especially waiting follow-up, was not fully established.

## KH-PROD-048

- Status: `verified`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Delayed-send MVP: create a draft, store `draftId`, `sendAt`, and `messageIntent`, then let a trigger or worker invoke send.
- Implementation status: implemented
- Dependencies: KH-DEP-013; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-033](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected scheduled-send validation, persistence, claim, retry, cancellation, and due-send processing functions.; Durable account-scoped draft scheduling and trigger-driven processing are present in source.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected send-later state, controls, draft saving, and compose dispatch functions.; The compose UI can schedule, reschedule, cancel, and display delayed draft sends.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected PropertiesService, CacheService, LockService, ScriptApp trigger, UrlFetchApp, and OAuth-token call sites.; Apps Script state, cache, locking, external fetch, installable trigger, and Google OAuth-token primitives are used.
- Evidence 4: [apps-script/MultiAccount.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MultiAccount.gs); Inspected account registries, OAuth state, PropertiesService, and LockService usage.; Multi-account OAuth and authorization state are persisted and guarded with Apps Script properties and locks.
- Limitations: Static implementation inspection proves code presence only; no automated test, staging readback, or production acceptance was performed.

## KH-PROD-049

- Status: `blocked`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `mixed` / `E2`
- Claim: Telegram should be a low-friction control plane, not a copy of Gmail.
- Implementation status: implemented
- Dependencies: Telegram Bot API
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-036](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram update validation/routing, callback handling, Bot API requests, digest/cards, browsing, and menu functions.; The repository contains an owner-scoped Telegram Bot API control plane with short actions and message cards.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected folders, threads, compose, attachments, labels, focus, and adaptive-density UI.; The repository implements a broad mail web app with an optional focused/adaptive surface, not only a minimal card surface.
- Limitations: Safe missing proof: a read-only rendered UX or user-acceptance result tied to the pinned commit showing that Telegram interactions are low-friction and remain meaningfully narrower than the mail web app.

## KH-PROD-050

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: The Telegram digest should show a small number of highest-impact messages.
- Implementation status: implemented
- Dependencies: KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-037](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Evidence 3: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram update validation/routing, callback handling, Bot API requests, digest/cards, browsing, and menu functions.; The repository contains an owner-scoped Telegram Bot API control plane with short actions and message cards.
- Limitations: Bounded digest delivery and priority inputs exist; static inspection does not prove that ranking consistently selects the highest-impact messages.

## KH-PROD-051

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Telegram control should support `done`, `later`, `nudge tomorrow`, and `show summary`.
- Implementation status: partially_implemented
- Dependencies: Telegram Bot API; KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-038](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram update validation/routing, callback handling, Bot API requests, digest/cards, browsing, and menu functions.; The repository contains an owner-scoped Telegram Bot API control plane with short actions and message cards.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Evidence 3: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Evidence 4: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Inspected action preparation/application, snooze, labels, reply presets, and Telegram move reconciliation.; The backend implements archive/inbox, snooze/defer, labels, reply presets, and reconciled action state.
- Evidence 5: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected Telegram callback routing, card actions, reminder callbacks, and Gmail reconciliation.; Telegram short actions and their Gmail state reconciliation are present.
- Limitations: Done/archive, later/snooze, reminder callbacks, and summary/card views exist, but the exact four literal command contract was not established.

## KH-PROD-052

- Status: `partial`
- Category: `KH-PROD`; type: `product`
- Relevance: high
- Scope and grade: `repository` / `E2`
- Claim: Provide emergency relay only for genuinely urgent messages.
- Implementation status: partially_implemented
- Dependencies: KH-DEP-015
- Conflicts: none
- Sensitivity: `public`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-039](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Inspected reminder reservation, quiet-hour/digest gating, dispatch, callbacks, and processing functions.; The backend implements bounded soft reminders, digest windows, later actions, retries, and Telegram delivery orchestration.
- Evidence 2: [apps-script/MailApp.html](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailApp.html); Inspected onboarding reminder choices and digest-window UI.; The UI exposes soft, digest, and urgent-only reminder preferences.
- Limitations: An urgent-only reminder preference and priority gating exist; a distinct emergency relay and production routing proof are missing.

## KH-PRV-001

- Status: `unverified`
- Category: `KH-PRV`; type: `privacy`
- Relevance: privacy
- Scope and grade: `repository` / `E0`
- Claim: The report describes AI processing of email content but does not specify retention, data minimization, encryption, provider boundaries, or data deletion.
- Implementation status: report_omission_not_independently_proven
- Dependencies: approved primary source or independent privacy specification
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R1-065](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-1.md)
- Evidence 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [docs/en/knowledge-hub/sources/REPORT-1.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/sources/REPORT-1.md); Located by targeted KH-PRV search.; Repeats the assertion but is not primary proof.
- Limitations: Exact safe missing proof: an approved sanitized primary-source excerpt for the cited report sections, or an independent privacy specification proving what was and was not specified.

## KH-PRV-002

- Status: `recommendation`
- Category: `KH-PRV`; type: `privacy`
- Relevance: privacy
- Scope and grade: `mixed` / `E2`
- Claim: GDPR and ePrivacy controls should include encryption, access control, audit logs, minimization, contracts, retention, export and deletion, breach response, and residency.
- Implementation status: partially_implemented_static_evidence_only
- Dependencies: privacy impact assessment; data-flow map; retention schedule; processor contracts
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-039](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Read once at the assigned commit.; Scopes are gmail.modify, drive.readonly, script.external_request, and script.scriptapp; no retention, residency, breach-response, or telemetry-preference policy is declared.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Properties, sanitization/redaction, expiry, and audit/logging markers exist; contracts, residency, export/delete rights, and breach response were not established.
- Limitations: Legal compliance is not proven by code; no protected configuration, runtime data, contracts, or external policy was accessed.

## KH-PRV-003

- Status: `recommendation`
- Category: `KH-PRV`; type: `privacy`
- Relevance: privacy
- Scope and grade: `mixed` / `E2`
- Claim: Do not enable open tracking by default for EU-sensitive use cases; add legal gating, a preference center, granular opt-in, and separation of delivery from marketing telemetry.
- Implementation status: not_established_one_static_match_unresolved
- Dependencies: contextual review of the static match; telemetry inventory; default-setting contract
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R2-041](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-2.md)
- Evidence 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; One tracking-pattern lexical match appeared in MailClient.gs and zero in the other five inspected implementation files; context was not retained, so presence or absence is not established.
- Limitations: Exact safe missing proof: contextual review of the one match plus a telemetry/default-settings inventory and read-only network trace.

## KH-PRV-004

- Status: `recommendation`
- Category: `KH-PRV`; type: `privacy`
- Relevance: privacy
- Scope and grade: `mixed` / `E2`
- Claim: Least privilege, clear data boundaries, minimal body extraction, and early verification-boundary planning are architectural requirements.
- Implementation status: partially_implemented_static_evidence_only
- Dependencies: scope justification matrix; data-flow map; body-minimization test
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-042](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md), [R3-102](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [apps-script/appsscript.json](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/appsscript.json); Read once at the assigned commit.; Scopes are gmail.modify, drive.readonly, script.external_request, and script.scriptapp; no retention, residency, breach-response, or telemetry-preference policy is declared.
- Evidence 3: [apps-script/MailClient.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/MailClient.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; Account/session scope and guarded token/session identifiers indicate boundaries; minimal body extraction and least-privilege sufficiency were not established.
- Limitations: gmail.modify and scriptapp may be necessary, but least privilege requires a scope-to-feature audit; runtime isolation was not tested.

## KH-PRV-005

- Status: `recommendation`
- Category: `KH-PRV`; type: `privacy`
- Relevance: privacy
- Scope and grade: `mixed` / `E2`
- Claim: Do not store credentials in code; keep secrets in properties or an external vault and redact addresses, headers, and token fragments from logs.
- Implementation status: partially_implemented_static_evidence_only
- Dependencies: credential-safe secret scan; logging data-flow review; synthetic redaction tests
- Conflicts: none
- Sensitivity: `internal`
- Report and project: [VR-001](README.md); [Project](../../../PROJECT.md); [machine record](../../../../verification-reports/VR-001/claims.json)
- Exact provenance: [R3-047](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/uk/knowledge-hub/sources/REPORT-3.md)
- Evidence 1: [docs/en/knowledge-hub/PERMISSIONS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/docs/en/knowledge-hub/PERMISSIONS.md); Single read of the assigned UK/EN page pair at the immutable active commit.; Bilingual IDs, source IDs, conflicts, and wording agree; the page labels the item report-derived and non-authoritative.
- Evidence 2: [apps-script/Code.gs](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/apps-script/Code.gs); Single-pass read-only lexical and identifier inspection of six tracked implementation files; no code executed.; PropertiesService use (138 markers), sanitization/redaction identifiers, and 84 logging calls exist; this does not prove every log is redacted or that no credential literal exists.
- Evidence 3: [AGENTS.md](https://github.com/Tarasevych/gmail-telegram-controls/blob/2b3b9e2f678f9fa0c787247f92d7827f81e95c9a/AGENTS.md); Read once at the assigned commit.; Governs request routing, evidence, secret handling, and release gates; adopts no KH-INS ID.
- Limitations: No protected store or secret value was accessed. Exact safe missing proof: a credential-safe repository scan and contextual review of every logging sink.
