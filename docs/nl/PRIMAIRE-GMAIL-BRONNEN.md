# Gmail primary sources and publication surfaces

Source request: `REQ-0021`. Source review date: 2026-07-21.

## Mandatory source gate

Before changing Gmail integration, Apps Script, authorization, scopes, callback, quota, or release behavior, review the current official Google pages:

1. [Advanced Gmail Service](https://developers.google.com/apps-script/advanced/gmail?hl=en) - canonical page. Owner-provided account-qualified URL: `https://developers.google.com/apps-script/advanced/gmail?authuser=0`.
2. [Advanced Google services](https://developers.google.com/apps-script/guides/services/advanced) - enablement, authorization, and advanced-service versus direct-HTTP guidance.

The change record must state the access date, relevant contract, and decision. Missing or conflicting evidence is `unverified`, not an assumption.

## Implementation rule

- Use the Advanced Gmail Service only after proving compatibility with the Versie 1 connection-scoped multi-account identity, scopes, callback, and rollback contract.
- Do not automatically replace the current OAuth/`UrlFetch` path only because Google recommends advanced services.
- Do not mix owner Gmail sessions, Telegram zones, or token records while comparing implementations.
- Do not publish OAuth tokens, `initData`, identifiers, cookies, secret properties, or message content.

## Versie 1 compatibility assessment

| Lane | Actual auth contract | Advanced Gmail Service | Decision |
|---|---|---|---|
| `apps_script_owner` | `ScriptApp.getOAuthToken()` and the authenticated Apps Script principal | Partially compatible; runtime acceptance is still `unverified` | A separate adapter is possible after enablement, scope, and rollback testing |
| `google_oauth` multi-account | Separate access/refresh token per `connectionId`, generation, and Gmail zone | Incompatible as a complete replacement: the advanced service uses Apps Script authorization automatically, while `users/me` denotes the authenticated user | Keep direct Gmail API transport with the connection-scoped bearer token |
| Metadata fan-out | `threads.list` through the connection token, followed by parallel `threads.get` calls | The advanced service cannot preserve the external identity | Immediately align the batch token with the current connection; separately evaluate Gmail HTTP batch |

The local code review found that `gmailApiRequest_` already selects `mailboxMultiGmailAccessToken_` correctly, while `mailboxFetchThreadMetadataBatch_` used only `ScriptApp.getOAuthToken()`. That could mix the owner/legacy mailbox with the selected external Gmail connection. The candidate corrects token selection without changing OAuth records or messages.

The official [Gmail batch contract](https://developers.google.com/workspace/gmail/api/guides/batch) supports up to 100 inner Gmail API calls in one `multipart/mixed` HTTP request and applies the outer `Authorization` header to its parts. This is a compatible direction for reducing `UrlFetch` calls in the multi-account lane, although each inner operation still counts as a separate Gmail API request. Implementation requires a fail-closed multipart parser, `Content-ID` alignment tests, 401/403/404/429/5xx tests, and quota telemetry.

## Publication surfaces

| Surface | Role | Canonical status |
|---|---|---|
| GitHub `Tarasevych/gmail-telegram-controls` | Code, documentation, issue/plan/request history, commits, and rollback | Canonical repository |
| Google Apps Script | Executable immutable deployment and staging | Runtime surface, not a Git mirror |
| Google Developer Profile | Profile, badges, saved pages/collections, and GitHub link | Discovery index, not a repository |

Google Developer Profile has no contract for storing Git objects, branches, commits, or complete file history. The dual-publication requirement therefore means: publish all verified code and documentation to GitHub, publish the matching Apps Script deployment for runtime changes, and maintain supported profile linking/indexing in Developer Profile. This must not be described as a complete repository mirror.

## Release gate

An external Gmail-contract change requires separate evidence: local tests, staging, rollback target, owner-only acceptance, and production verification. No new Versie is created without a direct owner command.
