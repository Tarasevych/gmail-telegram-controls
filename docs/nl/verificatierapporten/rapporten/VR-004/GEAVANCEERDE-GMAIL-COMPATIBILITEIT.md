# VR-004 Appendix: Advanced Gmail service compatibility

[Українська](../../../../uk/verification-reports/reports/VR-004/ADVANCED_GMAIL_COMPATIBILITY.md) | [VR-004](README.md) | [Index](../../INDEX.md)

- **Date:** 2026-07-21
- **Source requests:** `REQ-0004`, `REQ-0021`
- **Method:** official Google sources plus static analysis of exact `origin/main`
- **Target:** `535a77d1461a2b87e9039485da489ff8a418e878`
- **Code/manifest/runtime mutation:** none

## Decision

A wholesale replacement of direct Gmail `UrlFetch` with the Advanced Gmail service is incompatible with the current multi-account model. The advanced service automatically uses the authorization of the Apps Script execution user. External Gmail connections instead carry distinct bearer tokens selected by `Telegram user -> zone -> connection`. The advanced service cannot accept such a token.

The only safe direction is an explicit hybrid adapter:

- the `apps_script_owner` read lane can be a candidate for the Advanced Gmail service;
- external Gmail connection lanes remain on direct HTTP with a connection-scoped bearer token;
- OAuth token/revoke endpoints, Telegram API, and other external providers remain on direct `UrlFetch`;
- owner-lane mutations do not move to the advanced service until error/idempotency parity is proven;
- Advanced service -> direct HTTP fallback during an error is prohibited because it would hide quota pressure and can repeat an ambiguous mutation.

## Atomic claims

| ID | Status | Grade | Claim |
|---|---|---|---|
| VR4-G01 | verified | E1 | The Advanced Gmail service is a thin Gmail API wrapper, requires enablement, and handles authorization automatically. |
| VR4-G02 | verified | E1 | Gmail API `userId=me` means the authenticated user; it is not an impersonation mechanism for another consumer mailbox. |
| VR4-G03 | verified | E2 | The current manifest already contains the Gmail v1 advanced service and `gmail.modify`; no new service declaration is required for this research. |
| VR4-G04 | verified | E2 | `mailboxMultiGmailAccessToken_` returns the Apps Script owner token only for `apps_script_owner`; an external connection uses its own protected OAuth record. |
| VR4-G05 | verified | E2 | `gmailApiRequest_` manually adds the selected bearer token to a direct Gmail HTTP request, preserving connection identity. |
| VR4-G06 | recommendation | E0 | A future Advanced-service adapter is allowed only after an exact owner-lane check and a fail-closed prohibition in external context. |
| VR4-G07 | unverified | E0 | Reduced Apps Script `URLFetch` usage from an owner-lane hybrid has not been measured and is not treated as proven. |
| VR4-G08 | blocked | E0 | Runtime implementation/acceptance is blocked by the current daily quota and release gate; no OAuth or service enablement was started. |

## Official sources

- [Advanced Gmail Service](https://developers.google.com/apps-script/advanced/gmail)
- [Advanced Google services: authorization and direct HTTP comparison](https://developers.google.com/apps-script/guides/services/advanced)
- [Authorization for Google Services](https://developers.google.com/apps-script/guides/services/authorization)
- [Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas)
- [Gmail users.messages.list](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list)

## Future implementation gate

1. Add a separate identity predicate that allows the advanced service only for the exact `apps_script_owner`.
2. Start with read-only owner `messages.list/get` and `history.list`; external context must fail closed to the direct connection-token adapter with no fallback.
3. Normalize advanced-service errors into the current content-free runtime codes.
4. Add negative tests: an external connection never calls `Gmail.Users.*`; an owner call does not change the selected connection.
5. Compare call counts and behavior on synthetic fixtures, then in staging only after quota recovery and a separate release gate.

