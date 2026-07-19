# VR-001: conflicts and contradictions

[Report](README.md) | [All claims](CLAIMS.md) | [Українська](../../../../uk/verification-reports/reports/VR-001/CONFLICTS.md)

Source request: `REQ-0004`.

This page preserves every contradicted claim or claim with an explicit conflict ID. They are not deleted when focus changes; stronger future evidence creates a traced correction or a new report.

| Claim | Status | Grade | Claim |
|---|---|---|---|
| [KH-DEC-002](CLAIMS.md#kh-dec-002) | `recommendation` | `E1` | The goal is a functional inbox with low executive cost, not Inbox Zero. |
| [KH-DEC-006](CLAIMS.md#kh-dec-006) | `recommendation` | `E2` | Build the product on open standards and a proven open-source mail core; differentiate through proprietary UI, AI, and integration APIs. |
| [KH-DEC-007](CLAIMS.md#kh-dec-007) | `recommendation` | `E2` | Choose Stalwart plus custom web/mobile UX for modern-first B2C/B2B, or Mailcow plus a custom frontend/BFF for a fast MVP; retain a proprietary orchestration layer. |
| [KH-DEC-013](CLAIMS.md#kh-dec-013) | `recommendation` | `E2` | Build the default bridge from Telegram Bot API, a Mini App, a proprietary backend, and Gmail API; use TDLib or a user-account flow only deliberately. |
| [KH-DEC-021](CLAIMS.md#kh-dec-021) | `partial` | `E2` | The previous two reports remain background, while report 3 is the new primary technical foundation. |
| [KH-DEC-022](CLAIMS.md#kh-dec-022) | `recommendation` | `E2` | The target architecture should be hybrid: a Gmail add-on, web app, and external event/worker layer. |
| [KH-DEP-017](CLAIMS.md#kh-dep-017) | `contradicted` | `E2` | For external OAuth providers, use apps-script-oauth2 with Properties, Cache, and Lock practices. |
| [KH-EVD-007](CLAIMS.md#kh-evd-007) | `partial` | `E3` | [verified in report only] Neurodivergent authors and users describe `Inbox Functional` as more practical than an empty inbox. |
| [KH-EVD-016](CLAIMS.md#kh-evd-016) | `contradicted` | `E2` | Gmail add-ons use card UI; contextual triggers run for opened messages and are unconditional in the manifest. |
| [KH-EVD-020](CLAIMS.md#kh-evd-020) | `partial` | `E3` | Telegram Bot API is HTTP-based and suitable for short-command control. |
| [KH-HIS-005](CLAIMS.md#kh-his-005) | `contradicted` | `E2` | `gmail-telegram-v45-gentle-milestones` is designated as the current baseline artifact. |
| [KH-INS-001](CLAIMS.md#kh-ins-001) | `recommendation` | `E2` | The interface should provide one dominant action, stable context, low density, explicit progress, clear priorities, and exact resumption after interruption. |
| [KH-INS-002](CLAIMS.md#kh-ins-002) | `recommendation` | `E2` | Define one visually primary next action for each message. |
| [KH-INS-004](CLAIMS.md#kh-ins-004) | `recommendation` | `E2` | Focus mode should expose no more than three or four primary actions. |
| [KH-INS-008](CLAIMS.md#kh-ins-008) | `recommendation` | `E2` | Personalization should be adaptive, scenario-based, and gradual, using simple presets instead of lengthy configuration. |
| [KH-ISS-003](CLAIMS.md#kh-iss-003) | `unverified` | `E0` | Red counters, aggressive reminders, public streaks, and judgmental language can intensify avoidance and harm adoption and retention. |
| [KH-ISS-005](CLAIMS.md#kh-iss-005) | `unverified` | `E0` | Over-gamification can encourage impulsive use without long-term benefit. |
| [KH-ISS-016](CLAIMS.md#kh-iss-016) | `contradicted` | `E2` | Expected risk: an external URL without allowlisting or validation. |
| [KH-ISS-017](CLAIMS.md#kh-iss-017) | `contradicted` | `E2` | Expected risk: unescaped HTML or user-generated strings. |
| [KH-ISS-018](CLAIMS.md#kh-iss-018) | `contradicted` | `E2` | Expected risk: all task state stored in one large JSON blob in `PropertiesService`. |
| [KH-ISS-019](CLAIMS.md#kh-iss-019) | `contradicted` | `E2` | Expected risk: inbox labels used as the sole source of truth. |
| [KH-ISS-021](CLAIMS.md#kh-iss-021) | `contradicted` | `E2` | Expected risk: a one-shot polling loop silently ending at the execution limit. |
| [KH-ISS-023](CLAIMS.md#kh-iss-023) | `contradicted` | `E2` | Expected risk: a webhook without replay protection. |
| [KH-PLAN-008](CLAIMS.md#kh-plan-008) | `partial` | `E2` | Telegram flow: BotFather, Main Mini App, Allowed URLs, frontend, backend authentication, and linkage between Telegram identity and an internal account record. |
| [KH-PLAN-011](CLAIMS.md#kh-plan-011) | `contradicted` | `E2` | Target layered architecture: Stalwart or Mailcow core, a proprietary integration facade, AI and task workers, and smart web/mobile clients. |
| [KH-PLAN-027](CLAIMS.md#kh-plan-027) | `contradicted` | `E1` | The proposed tree separates `appsscript.json`, `src/addon`, `src/core`, `src/integrations`, `src/web`, `src/jobs`, `src/security`, `tests`, and `.github/workflows/deploy.yml`. |
| [KH-PLAN-030](CLAIMS.md#kh-plan-030) | `contradicted` | `E2` | Event flow: mailbox change to `watch`, Pub/Sub, Cloud Run consumer, normalize and deduplicate, enqueue or call Apps Script, then update labels, digest, task state, and Telegram output. |
| [KH-PLAN-036](CLAIMS.md#kh-plan-036) | `contradicted` | `E2` | The repository audit was not performed because availability or indexing was unconfirmed; only an audit plan is provided. |
| [KH-PLAN-047](CLAIMS.md#kh-plan-047) | `partial` | `E2` | `UX trace`: primary CTA count, digest tone, quiet mode, and non-shaming backlog. |
| [KH-PROD-004](CLAIMS.md#kh-prod-004) | `partial` | `E2` | Reward concrete small completions without gambling mechanics, oversized goals, or streak penalties. |
| [KH-PROD-007](CLAIMS.md#kh-prod-007) | `partial` | `E2` | The focus surface should be low-density, single-column or card-based, and should not imitate a full mail client. |
| [KH-PROD-014](CLAIMS.md#kh-prod-014) | `verified` | `E2` | Provide short energy-aware reply templates and controlled delayed sending without copying private content. |
| [KH-PROD-037](CLAIMS.md#kh-prod-037) | `unverified` | `E2` | A Gmail add-on is a contextual card surface for quick triage. |
| [KH-PROD-041](CLAIMS.md#kh-prod-041) | `blocked` | `E2` | Minimize cognitive load, decision fatigue, notification overwhelm, and task paralysis. |
| [KH-PROD-043](CLAIMS.md#kh-prod-043) | `verified` | `E2` | Telegram Bot API is an external short-command and digest control surface. |
| [KH-PROD-045](CLAIMS.md#kh-prod-045) | `verified` | `E2` | Second card level: three actions: quick reply, defer, and convert to task. |
| [KH-PROD-047](CLAIMS.md#kh-prod-047) | `partial` | `E2` | The Gmail homepage should show a small prioritized set: priority mail, quick win, short work block, and waiting follow-up. |
