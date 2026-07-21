# REPORT-3 source dossier

[Home](../README.md) | [Roadmap](../MASTER_ROADMAP.md) | [Traceability](../TRACEABILITY.md) | [Українська](../../../uk/knowledge-hub/README.md)

> Draft knowledge hub. Every claim derives only from sanitized report extractions, is not independently verified, and does not prove live deployment or current state.

Comprehensive table translation from catalog.json. The source text is already sanitized; local paths, emails, secrets, and account identifiers are not reproduced.

## Artifact metadata

| Field | Value |
|---|---|
| Report | R3 |
| Extraction artifact | deep-report3-extraction.md |
| Extraction bytes | 45529 |
| Extraction SHA-256 | 207f9d6dfa67d6289c3d21287657c5f7939e3b2e8e23aad1124eda579bf117a1 |
| Reported original | deep-research-report3.md |
| Reported original bytes | 48401 |
| Reported original SHA-256 | 9c72d21ec4682beddef23e4b6b7d6f44b38f3ed5f53263834464a3fb44437cb2 |
| Atomic items | 142 |
| Independent verification | not performed |

## Authority classification

- Explicit owner-granted quote: none detected.
- Permission candidate: R3-030.
- Every recommendation and standing rule requires canonical branch reconciliation.

## Source items

| Source ID | Canonical | Category | Lifecycle | Implementation | Priority | Source span | Dedup group | Normalized text |
|---|---|---|---|---|---|---|---|---|
| R3-001 | KH-HIS-004 | historical-artifact | current | implemented | - | H02, 5 | distinct | Work continues from the existing core at `[PRIVATE]`, not from an empty state. |
| R3-002 | KH-HIS-005 | historical-artifact | current | implemented | - | H02, 6 | distinct | `gmail-telegram-v45-gentle-milestones` is designated as the current baseline artifact. |
| R3-003 | KH-HIS-006 | historical-artifact | historical | implemented | - | H02, 7-10 | distinct | `gmail-telegram-v44-co-processing`, `gmail-telegram-notifier`, and other release lines are retained as prior experience. |
| R3-004 | KH-INS-014 | instruction | current | unknown | - | H02, 11 | distinct | Use logs, checkpoints, audit notes, test trails, and lessons learned; do not repeat completed stages without review. |
| R3-005 | KH-DEC-021 | decision | superseded | implemented | - | H02, 12 | distinct | The previous two reports remain background context, while report 3 becomes the new primary technical foundation. |
| R3-006 | KH-DEC-022 | decision | proposed | planned | - | H03, 16 | distinct | The target architecture should be hybrid: Gmail add-on, web app, and an external event/worker layer. |
| R3-007 | KH-LES-008 | lesson | current | unknown | - | H03, 18 | distinct | Use time blindness, motivation, and dopamine as design models, not as a single explanation of ADHD. |
| R3-008 | KH-PROD-005 | product | proposed | planned | - | H03, 20 | smallest-action | The service should not shame users for backlog; it should show the smallest possible next action. |
| R3-009 | KH-INS-015 | instruction | current | unknown | - | H03, 22 | distinct | Work sequence: product core, master prompt, implementation recipe, audit, and operational cycle; verify capabilities in the actual environment. |
| R3-010 | KH-DEC-002 | product | proposed | planned | - | H05, 28 | inbox-functional | The product goal is not Inbox Zero but lower executive cost and fewer decisions per message. |
| R3-011 | KH-PROD-002 | product | proposed | planned | - | H06, 34 | time-framing | Show message age, overdue risk, nearest deadline, `Suggested Next Slot`, and a five-minute mode. |
| R3-012 | KH-INS-002 | product | proposed | planned | - | H06, 35 | one-next-action | Show one primary CTA per message: short reply, intentional deferment, or task conversion. |
| R3-013 | KH-PROD-010 | product | proposed | planned | - | H06, 36 | soft-reminders | Quiet inbox should remove sound and red counters and use a gentle digest. |
| R3-014 | KH-PROD-011 | product | proposed | planned | - | H06, 37 | task-triage | Route messages to `Task / Waiting / Reference`, leaving only a label or snooze trace in Gmail. |
| R3-015 | KH-PROD-003 | product | proposed | planned | - | H06, 38 | batch-sessions | Offer email sessions by default instead of requiring continuous user attention to the inbox. |
| R3-016 | KH-PROD-010 | product | proposed | planned | - | H06, 39 | soft-reminders | Reminders should show a few highest-impact messages without accusatory wording. |
| R3-017 | KH-PROD-004 | product | proposed | planned | - | H06, 40 | microprogress | Tie micro-rewards to a completed action, delegation, or clear reply rather than an empty inbox. |
| R3-018 | KH-PROD-037 | product | proposed | planned | - | H07, 44 | gmail-context-surface | `Context Layer`: Gmail add-on cards with three clear contextual actions. |
| R3-019 | KH-PROD-038 | product | proposed | planned | - | H07, 44 | web-flow-surface | `Flow Layer`: web app for longer scenarios, rules, focus modes, backlog dashboard, and Telegram control. |
| R3-020 | KH-PROD-039 | product | proposed | planned | - | H07, 44 | distinct | `Automation Layer`: `watch`, `history.list`, queue or worker, and Apps Script orchestration. |
| R3-021 | KH-DEP-010 | dependency | proposed | planned | - | H07, 44 | distinct | Heavy and long-running operations should execute outside Apps Script. |
| R3-022 | KH-INS-016 | instruction | current | unknown | - | H08, 48-55 | distinct | The agent should act as product architect, Workspace engineer, accessibility researcher, security reviewer, and release engineer, producing a technical delivery program. |
| R3-023 | KH-PROD-040 | product | proposed | planned | основна ціль | H08, 57-58 | distinct | The target audience includes users with ADHD, executive dysfunction, and frequent comorbid depression. |
| R3-024 | KH-PROD-041 | product | proposed | planned | основна ціль | H08, 59 | distinct | Minimize cognitive load, decision fatigue, notification overwhelm, and task paralysis. |
| R3-025 | KH-DEP-011 | dependency | proposed | planned | - | H08, 60-66 | distinct | The design anticipates a Gmail add-on, web app, installable triggers, `PropertiesService`, `CacheService`, `LockService`, `UrlFetchApp`, and advanced Google services. |
| R3-026 | KH-DEC-012 | decision | proposed | planned | критична вимога | H08, 67 | apps-script-boundary | Do not use Apps Script for everything; move Pub/Sub, Cloud Run, MIME parsing, webhook relay, queue workers, and OAuth backend outside it when justified. |
| R3-027 | KH-PROD-042 | product | proposed | planned | - | H08, 68-71 | distinct | Gmail integration should support UI triage, near-real-time `watch/history`, and later Telegram or dashboard expansion. |
| R3-028 | KH-PLAN-018 | plan | proposed | planned | - | H08, 72-76 | repository-audit | Audit `gmail-telegram-controls` for security, OAuth, runtime state, locking, token storage, webhooks, MIME, logging, and secret exposure, then prepare a patch plan. |
| R3-029 | KH-PLAN-019 | plan | proposed | planned | - | H08, 77-85 | distinct | Build a release flow using `clasp`, Git branching, GitHub Actions, versioning, deployment, rollback, smoke tests, and security scanning. |
| R3-030 | KH-PERM-003 | permission-candidate | proposed | unknown | - | H08, 86-93 | distinct | Browser, CDP, and runtime tools may be considered only after checking capability and permissions; this is not owner-granted permission. |
| R3-031 | KH-INS-017 | instruction | current | unknown | P0/P1/P2 taxonomy без призначень | H08, 95-121 | distinct | The agent should deliver sections A-R covering architecture, UX, modules, scopes, OAuth, integrations, audit, build/debug/release plans, tests, backlog, patches, and fallback paths. |
| R3-032 | KH-INS-018 | instruction | current | unknown | критична | H08, 123-125 | distinct | For recommendations, explain the problem, rationale, and pitfalls; state platform limits directly and provide a workaround. |
| R3-033 | KH-PROD-048 | product | proposed | planned | MVP | H16, 245 | distinct | Delayed-send MVP: create a draft, store `draftId`, `sendAt`, and `messageIntent`, then let a trigger or worker invoke send. |
| R3-034 | KH-DEC-018 | decision | proposed | planned | MVP | H16, 245 | undo-send | Custom `undo send` means a grace window before actual sending, not recall of an already sent message. |
| R3-035 | KH-PROD-014 | product | proposed | planned | - | H16, 247-253 | reply-assistance | Reply templates should be energy-graded as low, normal, and high energy without reproducing private message content. |
| R3-036 | KH-PROD-049 | product | proposed | planned | - | H17, 257 | distinct | Telegram should be a low-friction control plane, not a copy of Gmail. |
| R3-037 | KH-PROD-050 | product | proposed | planned | - | H17, 259 | distinct | The Telegram digest should show a small number of highest-impact messages. |
| R3-038 | KH-PROD-051 | product | proposed | planned | - | H17, 260 | distinct | Telegram control should support `done`, `later`, `nudge tomorrow`, and `show summary`. |
| R3-039 | KH-PROD-052 | product | proposed | planned | - | H17, 261 | distinct | Provide emergency relay only for genuinely urgent messages. |
| R3-040 | KH-PROD-015 | product | proposed | planned | - | H17, 262 | co-processing | Body-doubling mode should provide a short prompt toward one action without duplicating private message content. |
| R3-041 | KH-DEC-024 | decision | proposed | planned | - | H17, 264 | distinct | Do not move the entire inbox into Telegram; use Mini Apps as dashboard and control, not a replacement for Gmail UX. |
| R3-042 | KH-PRV-004 | privacy | proposed | planned | найвища | H19, 270 | least-privilege | The architecture should enforce least privilege, clear data boundaries, and minimal extraction of message bodies from Gmail. |
| R3-043 | KH-DEP-016 | dependency | current | unknown | - | H19, 270 | gmail-scope-verification | Restricted Gmail scopes may require production verification and additional safeguards for external infrastructure. |
| R3-044 | KH-DEP-019 | dependency | proposed | planned | - | H20, 274 | distinct | For Google-to-Google flow, use manifest scopes and `ScriptApp.getOAuthToken()`. |
| R3-045 | KH-DEP-017 | dependency | proposed | planned | - | H20, 274 | external-oauth-library | For external OAuth providers, use `googleworkspace/apps-script-oauth2` with `PropertiesService`, `CacheService`, and `LockService`. |
| R3-046 | KH-ISS-013 | issue | current | unknown | обов’язкова серіалізація | H20, 274-280 | distinct | Parallel token refresh can cause a race condition without locking. |
| R3-047 | KH-PRV-005 | privacy | proposed | planned | - | H20, 276-281 | distinct | Do not store credentials in code; keep secrets in properties or an external vault and redact addresses, headers, and token fragments from logs. |
| R3-048 | KH-DEC-015 | decision | proposed | planned | post-MVP | H21, 285 | replaceable-e2e | Move the full MIME/PGP/S/MIME layer to a replaceable worker and exclude it from the MVP unless needed. |
| R3-049 | KH-DEP-020 | dependency | proposed | planned | post-MVP | H21, 285 | distinct | Proposed components are `postal-mime`, `OpenPGP.js`, `Mailvelope`, `PKI.js`, and RFC 8551. |
| R3-050 | KH-PLAN-031 | plan | proposed | planned | мінімальний контур | H22, 289-293 | distinct | Use `clasp` and immutable versions and deployments for release and rollback. |
| R3-051 | KH-PLAN-032 | plan | proposed | planned | мінімальний контур | H22, 294 | distinct | Add GitHub CodeQL. |
| R3-052 | KH-PLAN-033 | plan | proposed | planned | мінімальний контур | H22, 295-298 | distinct | Enable secret scanning from day one. |
| R3-053 | KH-PLAN-034 | plan | proposed | planned | мінімальний контур | H22, 296 | distinct | Add Dependabot for dependency alerts and updates. |
| R3-054 | KH-PLAN-035 | plan | proposed | planned | - | H22, 298 | distinct | CI should include linting, manifest validation, dry-run push, a staging smoke test, and a separate security lane. |
| R3-055 | KH-PLAN-036 | plan | unverified | blocked | - | H23, 302 | distinct | The repository audit was not performed because availability or indexing was unconfirmed; only an audit plan is provided. |
| R3-056 | KH-PLAN-037 | plan | proposed | planned | перша черга | H25, 308-314 | distinct | Inspect `appsscript.json` first: Gmail scopes, `script.external_request`, triggers, capability boundaries, and add-on/web-app separation. |
| R3-057 | KH-ISS-014 | issue | unverified | unknown | - | H25, 316 | distinct | An overbroad Gmail scope creates verification-failure risk and increases blast radius; no actual defect is confirmed. |
| R3-058 | KH-PLAN-038 | plan | proposed | planned | - | H26, 320-327 | distinct | Inspect code and Git history for hardcoded secret classes, direct webhook URLs, private identifiers in fixtures, and full request or response logging. |
| R3-059 | KH-ISS-015 | issue | unverified | unknown | - | H26, 327 | distinct | Unredacted logging of external responses could disclose a token or private mail content; no actual instance is confirmed. |
| R3-060 | KH-PLAN-039 | plan | proposed | planned | висока, словесно | H27, 331-339 | distinct | Check locking discipline for state, queues, checkpoints, send operations, Telegram calls, and token refresh. |
| R3-061 | KH-PLAN-040 | plan | proposed | planned | - | H28, 343-349 | distinct | For webhook ingress, verify signature or token validation, allowed methods, idempotency, deduplication, and absence of production debug output. |
| R3-062 | KH-LES-010 | lesson | current | planned | - | H28, 351 | distinct | An Apps Script web app should be thin ingress; split heavy synchronous work or move it outside. |
| R3-063 | KH-ISS-016 | issue | unverified | unknown | - | H29, 357 | distinct | Expected risk: an external URL without allowlisting or validation. |
| R3-064 | KH-ISS-017 | issue | unverified | unknown | - | H29, 358 | distinct | Expected risk: unescaped HTML or user-generated strings. |
| R3-065 | KH-ISS-018 | issue | unverified | unknown | - | H29, 359 | distinct | Expected risk: all task state stored in one large JSON blob in `PropertiesService`. |
| R3-066 | KH-ISS-019 | issue | unverified | unknown | - | H29, 360 | distinct | Expected risk: inbox labels used as the sole source of truth. |
| R3-067 | KH-ISS-020 | issue | unverified | unknown | - | H29, 361 | distinct | Expected risk: secrets written to `Logger.log()` or `console.log()`. |
| R3-068 | KH-ISS-021 | issue | unverified | unknown | - | H29, 362 | distinct | Expected risk: a one-shot polling loop silently ending at the execution limit. |
| R3-069 | KH-ISS-022 | issue | unverified | unknown | - | H29, 363 | distinct | Expected risk: an overly broad OAuth consent surface. |
| R3-070 | KH-ISS-023 | issue | unverified | unknown | - | H29, 364 | distinct | Expected risk: a webhook without replay protection. |
| R3-071 | KH-DEC-025 | decision | proposed | planned | - | H29, 366 | distinct | Hardening should separate secret management, state machine, ingress, Gmail operations, and notifications. |
| R3-072 | KH-INS-021 | instruction | current | unknown | обов’язкова перевірка | H31, 372 | distinct | Codex should act as a controlled technical reviewer and verification-protocol executor; confirm browser, CDP, and runtime capability before use. |
| R3-073 | KH-PLAN-041 | plan | proposed | planned | крок 1 | H32, 378-380 | distinct | `Repo discovery`: manifest, scopes, deployment configuration, workflows, README, release notes, and secret usage. |
| R3-074 | KH-PLAN-042 | plan | proposed | planned | крок 2 | H32, 381-382 | distinct | `OAuth trace`: redirect URI, consent screen, scopes, token errors, and races. |
| R3-075 | KH-PLAN-043 | plan | proposed | planned | крок 3 | H32, 384-385 | distinct | `Gmail UI trace`: homepage, context cards, compose, empty states, and error cards. |
| R3-076 | KH-PLAN-044 | plan | proposed | planned | крок 4 | H32, 387-388 | distinct | `Network trace`: external calls, response codes, retries, duplicates, and latency. |
| R3-077 | KH-PLAN-045 | plan | proposed | planned | крок 5 | H32, 390-391 | distinct | `Runtime trace`: execution logs, disabled triggers, retry loops, continuation state, and `historyId`. |
| R3-078 | KH-PLAN-046 | plan | proposed | planned | крок 6 | H32, 393-394 | distinct | `Release trace`: staging/production separation, rollback, log privacy, CodeQL, and secret scanning. |
| R3-079 | KH-PLAN-047 | plan | proposed | planned | крок 7 | H32, 396-397 | distinct | `UX trace`: primary CTA count, digest tone, quiet mode, and non-shaming backlog. |
| R3-080 | KH-INS-022 | instruction | current | unknown | обов’язкова | H32, 399 | distinct | The operational loop should be mandatory and cover actual UI, runtime, and network behavior, not only code reading. |
| R3-081 | KH-PLAN-048 | plan | proposed | planned | acceptance criteria | H33, 403-412 | distinct | Acceptance artifacts: scopes, endpoint map, state diagram, concurrency hotspots, privacy-exposure locations, OAuth reproduction, UI evidence, and a before/after patch plan. |
| R3-082 | KH-LES-011 | lesson | current | unknown | - | H33, 414 | distinct | Working principle: minimum theory, maximum controlled verification, clear next actions, and controlled progress. |
| R3-083 | KH-INS-019 | instruction | current | unknown | - | H08, 126 | distinct | When a hybrid architecture using Apps Script, Cloud Run, Pub/Sub, and Storage is needed, design it explicitly. |
| R3-084 | KH-DEP-012 | dependency | proposed | planned | - | H08, 127 | distinct | For third-party or open-source components, name the exact repository, library, or documentation source. |
| R3-085 | KH-INS-020 | instruction | current | unknown | - | H08, 128-130 | distinct | Do not hide tradeoffs or give vague advice; write as a delivery document for the implementation team. |
| R3-086 | KH-PLAN-020 | plan | proposed | planned | deliverable 1 | H08, 132-133 | distinct | Prepare architecture v1. |
| R3-087 | KH-PLAN-021 | plan | proposed | planned | deliverable 2 | H08, 134 | distinct | Prepare the architecture v2 expansion path. |
| R3-088 | KH-PLAN-018 | plan | proposed | planned | deliverable 3 | H08, 135 | repository-audit | Prepare the repository audit plan. |
| R3-089 | KH-PLAN-022 | plan | proposed | planned | deliverable 4 | H08, 136 | distinct | Prepare the security-hardening plan. |
| R3-090 | KH-PLAN-023 | plan | proposed | planned | 7-14 днів | H08, 137 | distinct | Prepare a concrete checklist for launching the MVP in 7-14 days. |
| R3-091 | KH-PLAN-024 | plan | proposed | planned | deliverable 6 | H08, 138 | distinct | Prepare a concrete production-hardening checklist. |
| R3-092 | KH-PROD-037 | product | proposed | planned | MVP | H10, 147-151 | gmail-context-surface | The Apps Script Gmail add-on is a contextual surface for fast triage in desktop and mobile Gmail. |
| R3-093 | KH-PROD-038 | product | proposed | planned | MVP | H10, 152 | web-flow-surface | The Apps Script web app is a surface for dashboard, backlog, rules, and energy modes. |
| R3-094 | KH-DEP-013 | dependency | proposed | planned | MVP | H10, 153 | distinct | Gmail API is needed for history, drafts, delayed send, and attachments. |
| R3-095 | KH-DEP-014 | dependency | proposed | planned | MVP/hybrid | H10, 154 | distinct | Pub/Sub and Cloud Run are needed for `watch`, webhook ingress, heavy jobs, retries, and idempotency. |
| R3-096 | KH-DEP-015 | dependency | proposed | planned | MVP | H10, 155 | distinct | `PropertiesService`, `CacheService`, and `LockService` are needed for state, cache, refresh locking, and continuation. |
| R3-097 | KH-PROD-043 | product | proposed | planned | expansion | H10, 156 | distinct | Telegram Bot API is an external short-command and digest control surface. |
| R3-098 | KH-PLAN-025 | plan | proposed | planned | перший deployment step | H12, 162 | distinct | Local setup: create a separate Cloud project, enable Apps Script API, run `clasp login`, then `clasp create` or `clasp clone`, and keep the code in Git. |
| R3-099 | KH-PLAN-026 | plan | proposed | planned | - | H12, 162 | distinct | CI/CD should use protected `CLASPRC_JSON` and `.clasp.json` in GitHub Actions without committing credential values. |
| R3-100 | KH-PLAN-027 | plan | proposed | planned | MVP structure | H12, 164-200 | distinct | The proposed tree separates `appsscript.json`, `src/addon`, `src/core`, `src/integrations`, `src/web`, `src/jobs`, `src/security`, `tests`, and `.github/workflows/deploy.yml`. |
| R3-101 | KH-LES-009 | lesson | current | unknown | - | H12, 202 | distinct | The repository tree is an architectural recommendation, not a Google canonical structure; it separates UI, business logic, integrations, background jobs, and security. |
| R3-102 | KH-PRV-004 | privacy | proposed | planned | критична | H13, 206 | least-privilege | Scope hygiene is architectural: apply least privilege and plan the verification boundary from the start. |
| R3-103 | KH-DEP-016 | dependency | current | unknown | - | H13, 206 | gmail-scope-verification | A Gmail add-on requires `addOns.gmail`; production with sensitive or restricted scopes may require a standard Cloud project and verification. |
| R3-104 | KH-PLAN-028 | plan | proposed | planned | - | H13, 208-211 | distinct | Split scope strategy into an internal, private, or Workspace-only MVP and public production with minimized scopes and a verification package. |
| R3-105 | KH-PLAN-029 | plan | proposed | planned | least privilege | H13, 213 | distinct | Start with narrow context, label, draft, and send scopes; add explicit external-request scope for `UrlFetchApp` only when needed. |
| R3-106 | KH-DEP-017 | dependency | proposed | planned | - | H13, 213 | external-oauth-library | For an external OAuth provider, use `googleworkspace/apps-script-oauth2` with documented storage, cache, and lock practices. |
| R3-107 | KH-PROD-007 | product | proposed | planned | - | H14, 217-221 | focus-surface | The Gmail add-on should use a three-level triage card rather than trying to be a full mail client. |
| R3-108 | KH-PROD-044 | product | proposed | planned | level 1 | H14, 219 | distinct | First card level: one-line AI summary, type icon, and estimated effort. |
| R3-109 | KH-PROD-045 | product | proposed | planned | level 2 | H14, 220 | distinct | Second card level: three actions: quick reply, defer, and convert to task. |
| R3-110 | KH-PROD-046 | product | proposed | planned | level 3 | H14, 221 | distinct | Third card level: collapsed metadata, thread details, attachments, and labels. |
| R3-111 | KH-PROD-047 | product | proposed | planned | - | H14, 223 | distinct | The Gmail homepage should show a small prioritized set: priority mail, quick win, short work block, and waiting follow-up. |
| R3-112 | KH-DEC-023 | decision | proposed | planned | reliability | H15, 227 | distinct | Do not use continuous Apps Script polling; use `watch()` and `history.list` with a checkpoint. |
| R3-113 | KH-PLAN-030 | plan | proposed | planned | target flow | H15, 229-239 | distinct | Event flow: mailbox change to `watch`, Pub/Sub, Cloud Run consumer, normalize and deduplicate, enqueue or call Apps Script, then update labels, digest, task state, and Telegram output. |
| R3-114 | KH-DEC-012 | decision | proposed | planned | architecture boundary | H15, 241 | apps-script-boundary | Apps Script should be the control plane, not the complete data plane; split timeout-prone tasks and continue them through state and triggers. |
| R3-115 | KH-DEP-018 | dependency | proposed | planned | - | H15, 227-241 | distinct | Event continuation depends on `startHistoryId`, checkpoint state, `PropertiesService`, and triggers. |
| R3-E01 | KH-EVD-015 | evidence | current | implemented | - | H02, 5-10, verified-in-report only; not independently verified | distinct | Existing project core and v45 are the current working base. |
| R3-E02 | KH-EVD-016 | evidence | current | unknown | - | H03, 16, verified-in-report only; not independently verified | distinct | Gmail add-ons use card UI; contextual triggers run for opened messages and are unconditional in the manifest. |
| R3-E03 | KH-EVD-002 | evidence | current | unknown | - | H03, 18, verified-in-report only; not independently verified | adhd-executive-evidence | ADHD is associated with working-memory, planning, attention, switching, organization and time-perception difficulties. |
| R3-E04 | KH-EVD-017 | evidence | current | unknown | - | H03, 18, verified-in-report only; not independently verified | distinct | Dopaminergic systems are relevant, but a simple dopamine-deficit model is described as reductive. |
| R3-E05 | KH-EVD-006 | evidence | current | unknown | - | H03, 20, verified-in-report only; not independently verified | comorbidity-evidence | Comorbid depression is associated with stronger self-regulation, rumination and executive-function problems. |
| R3-E06 | KH-EVD-008 | evidence | current | unknown | - | H05, 28, verified-in-report only; not independently verified | batching-evidence | Practical sources support batching, limited notifications, templates, snooze and separating tasks from inbox. |
| R3-E07 | KH-EVD-003 | evidence | current | unknown | - | H06, 34, verified-in-report only; not independently verified | time-evidence | Time-perception and temporal-foresight deficits support time-oriented UI. |
| R3-E08 | KH-EVD-002 | evidence | current | unknown | - | H06, 35, verified-in-report only; not independently verified | adhd-executive-evidence | Executive dysfunction is cited as support for constrained action choice. |
| R3-E09 | KH-EVD-018 | evidence | current | unknown | - | H06, 36, verified-in-report only; not independently verified | cognitive-accessibility-evidence | W3C is cited as recommending limited interruptions for cognitive accessibility. |
| R3-E10 | KH-EVD-008 | evidence | current | unknown | - | H06, 38, verified-in-report only; not independently verified | batching-evidence | Longer email time is linked to stress; batching is linked to productivity. |
| R3-E11 | KH-EVD-019 | evidence | current | unknown | - | H16, 245, verified-in-report only; not independently verified | gmail-draft-evidence | Gmail API exposes drafts and `drafts.send`. |
| R3-E12 | KH-EVD-020 | evidence | current | unknown | - | H17, 264, verified-in-report only; not independently verified | distinct | Telegram Bot API is HTTP-based and suitable for short-command control. |
| R3-E13 | KH-EVD-021 | evidence | current | unknown | - | H19, 270, verified-in-report only; not independently verified | scope-evidence | Gmail message/mailbox scopes can be restricted and require verification. |
| R3-E14 | KH-EVD-022 | evidence | current | unknown | - | H20, 274, verified-in-report only; not independently verified | distinct | apps-script-oauth2` recommends Properties/Cache/Lock and warns about refresh races. |
| R3-E15 | KH-EVD-019 | evidence | current | unknown | - | H21, 285, verified-in-report only; not independently verified | gmail-draft-evidence | Gmail API supports attachment retrieval and raw message/draft send. |
| R3-E16 | KH-EVD-023 | evidence | current | unknown | - | H22, 293-298, verified-in-report only; not independently verified | distinct | clasp`, CodeQL, secret scanning and Dependabot are described as release/security controls. |
| R3-E17 | KH-EVD-024 | evidence | current | unknown | - | H28, 351, verified-in-report only; not independently verified | runtime-limits-evidence | Apps Script web apps are HTTP entrypoints; long work should use continuation or an external worker. |
| R3-E18 | KH-EVD-025 | evidence | current | unknown | - | H31, 372; H33, 414, verified-in-report only; not independently verified | distinct | Codex documentation is cited in support of context/tool/environment-aware workflows. |
| R3-E19 | KH-EVD-026 | evidence | unverified | blocked | - | H23, 302, verified-in-report only; not independently verified | distinct | Public indexing of `github.com/[PRIVATE]/gmail-telegram-controls` could not be confirmed. |
| R3-E20 | KH-EVD-027 | evidence | current | unknown | - | H08, 141, verified-in-report only; not independently verified | distinct | Gmail cards, `doGet`/`doPost`, Gmail API resources, `watch`, OAuth storage/locks and scope verification are cited as platform constraints. |
| R3-E21 | KH-EVD-028 | evidence | current | unknown | - | H10, 151-156, verified-in-report only; not independently verified | distinct | The report attributes contextual UI to add-ons, richer UX to web apps, automation to Gmail API, event reliability to Pub/Sub/Cloud Run and state control to Properties/Cache/Lock. |
| R3-E22 | KH-EVD-029 | evidence | current | unknown | - | H12, 162, verified-in-report only; not independently verified | clasp-evidence | clasp` is described as Google's open-source local development/version/deployment route, with documented GitHub Actions use. |
| R3-E23 | KH-EVD-029 | evidence | current | unknown | - | H12, 202, verified-in-report only; not independently verified | clasp-evidence | clasp` is described as supporting directory-based development. |
| R3-E24 | KH-EVD-021 | evidence | current | unknown | - | H13, 206, verified-in-report only; not independently verified | scope-evidence | Google is cited as requiring minimal permissions; add-ons need `addOns.gmail`; public sensitive/restricted-scope apps may need a standard Cloud project and verification. |
| R3-E25 | KH-EVD-018 | evidence | current | unknown | - | H14, 223, verified-in-report only; not independently verified | cognitive-accessibility-evidence | W3C cognitive-accessibility guidance and ADHD/depression research are cited for focus, fewer interruptions and reduced content. |
| R3-E26 | KH-EVD-030 | evidence | current | unknown | - | H15, 227, verified-in-report only; not independently verified | distinct | Gmail `watch()` uses Pub/Sub and `history.list`/`startHistoryId` for change synchronization. |
| R3-E27 | KH-EVD-024 | evidence | current | unknown | - | H15, 241, verified-in-report only; not independently verified | runtime-limits-evidence | Apps Script has execution limits; timeout-prone work is described as requiring state persistence and trigger continuation. |

## Coverage register

| Category | Count |
|---|---:|
| historical-artifact | 3 |
| instruction | 9 |
| decision | 9 |
| lesson | 4 |
| product | 30 |
| dependency | 13 |
| plan | 32 |
| permission-candidate | 1 |
| privacy | 3 |
| issue | 11 |
| evidence | 27 |

## Conflict references

- CF-001: CTA cardinality is unresolved: one dominant or primary action versus three contextual actions or three to four primary actions.
- CF-002: Telegram Bot API and provider-specific OAuth are not separated clearly enough; the actual authentication model is unverified.
- CF-003: Multiple homepage groups may conflict with constrained choice; acceptable density is not defined.
- CF-005: A regular-triage streak is not reconciled with the risks of public streaks, penalties, and over-gamification.
- CF-006: The standalone open-mail-core roadmap and Gmail-centric hybrid roadmap have different product scope; report 3 is the primary foundation but does not explicitly cancel report 2's broader scope.
- CF-008: The `superseded` lifecycle on R1-004 is attached to a claim favoring Inbox Functional that later material supports; the object of supersession is ambiguous.

---

Source request / Джерело запиту: `REQ-0003`. Report-derived baseline; live claims require current-state verification.
