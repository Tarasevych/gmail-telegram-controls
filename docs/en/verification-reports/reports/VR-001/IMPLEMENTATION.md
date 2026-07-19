# VR-001: implementation and dependencies

[Report](README.md) | [All claims](CLAIMS.md) | [Українська](../../../../uk/verification-reports/reports/VR-001/IMPLEMENTATION.md)

Source request: `REQ-0004`. Claims: 95. `verified` 13, `contradicted` 7, `partial` 35, `unverified` 19, `blocked` 4, `recommendation` 17.

This page shows claims with the strongest positive evidence, direct contradiction, or blocker. The complete partial/unverified set remains in CLAIMS.

| Claim | Status | Grade | Claim |
|---|---|---|---|
| [KH-DEP-001](CLAIMS.md#kh-dep-001) | `blocked` | `E2` | WCAG 2.2 is the baseline; W3C COGA guidance is also needed for cognitive accessibility. |
| [KH-DEP-013](CLAIMS.md#kh-dep-013) | `verified` | `E2` | Gmail API is needed for history, drafts, delayed send, and attachments. |
| [KH-DEP-015](CLAIMS.md#kh-dep-015) | `verified` | `E2` | `PropertiesService`, `CacheService`, and `LockService` are needed for state, cache, refresh locking, and continuation. |
| [KH-DEP-017](CLAIMS.md#kh-dep-017) | `contradicted` | `E2` | For external OAuth providers, use apps-script-oauth2 with Properties, Cache, and Lock practices. |
| [KH-DEP-019](CLAIMS.md#kh-dep-019) | `verified` | `E2` | For Google-to-Google flow, use manifest scopes and `ScriptApp.getOAuthToken()`. |
| [KH-ISS-016](CLAIMS.md#kh-iss-016) | `contradicted` | `E2` | Expected risk: an external URL without allowlisting or validation. |
| [KH-ISS-017](CLAIMS.md#kh-iss-017) | `contradicted` | `E2` | Expected risk: unescaped HTML or user-generated strings. |
| [KH-ISS-018](CLAIMS.md#kh-iss-018) | `contradicted` | `E2` | Expected risk: all task state stored in one large JSON blob in `PropertiesService`. |
| [KH-ISS-019](CLAIMS.md#kh-iss-019) | `contradicted` | `E2` | Expected risk: inbox labels used as the sole source of truth. |
| [KH-ISS-021](CLAIMS.md#kh-iss-021) | `contradicted` | `E2` | Expected risk: a one-shot polling loop silently ending at the execution limit. |
| [KH-ISS-023](CLAIMS.md#kh-iss-023) | `contradicted` | `E2` | Expected risk: a webhook without replay protection. |
| [KH-PROD-008](CLAIMS.md#kh-prod-008) | `verified` | `E2` | `Resume Rail`: last conversation, stopping point, and autosaved position, state, and partial triage. |
| [KH-PROD-010](CLAIMS.md#kh-prod-010) | `verified` | `E2` | Use quiet, non-judgmental reminders and a digest containing a small number of the most important messages. |
| [KH-PROD-014](CLAIMS.md#kh-prod-014) | `verified` | `E2` | Provide short energy-aware reply templates and controlled delayed sending without copying private content. |
| [KH-PROD-015](CLAIMS.md#kh-prod-015) | `verified` | `E2` | Provide a short co-processing/body-doubling mode focused on one action without duplicating private content. |
| [KH-PROD-021](CLAIMS.md#kh-prod-021) | `blocked` | `E2` | Target concept: mail assumes part of the executive-function burden, reduces noise, explains priority, preserves context, and decomposes work. |
| [KH-PROD-033](CLAIMS.md#kh-prod-033) | `verified` | `E2` | Apps Script, GmailApp, and Gmail API provide a low-code path for Google Workspace automation and prototyping. |
| [KH-PROD-038](CLAIMS.md#kh-prod-038) | `verified` | `E2` | The web app is the Flow Layer for dashboard, backlog, rules, focus, and energy modes. |
| [KH-PROD-041](CLAIMS.md#kh-prod-041) | `blocked` | `E2` | Minimize cognitive load, decision fatigue, notification overwhelm, and task paralysis. |
| [KH-PROD-043](CLAIMS.md#kh-prod-043) | `verified` | `E2` | Telegram Bot API is an external short-command and digest control surface. |
| [KH-PROD-045](CLAIMS.md#kh-prod-045) | `verified` | `E2` | Second card level: three actions: quick reply, defer, and convert to task. |
| [KH-PROD-046](CLAIMS.md#kh-prod-046) | `verified` | `E2` | Third card level: collapsed metadata, thread details, attachments, and labels. |
| [KH-PROD-048](CLAIMS.md#kh-prod-048) | `verified` | `E2` | Delayed-send MVP: create a draft, store `draftId`, `sendAt`, and `messageIntent`, then let a trigger or worker invoke send. |
| [KH-PROD-049](CLAIMS.md#kh-prod-049) | `blocked` | `E2` | Telegram should be a low-friction control plane, not a copy of Gmail. |
