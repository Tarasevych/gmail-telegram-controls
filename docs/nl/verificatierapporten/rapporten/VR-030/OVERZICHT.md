# VR-030 — Box OAuth least privilege and stable identity

Verification framework: REQ-0004

- **Status:** `PARTIAL`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-059`, `B1-39`, `RCA-012`
- **Українське дзеркало:** [VR-030](../../../../uk/verification-reports/reports/VR-030/README.md)

## Atomic claims

| Claim | Category | Status | Origin |
|---|---|---|---|
| The Box authorize endpoint supports `scope`, and omitting it applies all scopes configured for the application | External contract | `VERIFIED` | [Box authorize reference](https://developer.box.com/reference/get-authorize), [Box scopes guide](https://developer.box.com/guides/api-calls/permissions-and-errors/scopes) |
| `root_readonly` is the documented read-only files/folders scope | External contract | `VERIFIED` | [Box scopes guide](https://developer.box.com/guides/api-calls/permissions-and-errors/scopes) |
| The source contour adds explicit `scope=root_readonly` and does not transmit a login hint | Implementation | `VERIFIED` | `apps-script/MultiAccount.gs`, source-contract test |
| The provider callback rejects oversized, control-character, or orphan `errorDescription` before consuming state | Implementation | `VERIFIED` | `apps-script/MultiAccount.gs`, source-contract test |
| Reconnect uses stable Box account ID; a legacy record is resolved through its protected token record rather than email | Implementation | `VERIFIED` | `apps-script/MultiAccount.gs`, source-contract test |
| Live Box authorization, callback, refresh, revoke, and picker work in the deployment | Runtime | `UNVERIFIED` | Not exercised in this source-only contour |

## Checks

- Focused source contract: `3/3`.
- Full Apps Script suite: `615/615`.
- Bilingual docs, knowledge hub, verification reports, release state, and `git diff --check` must pass before publication.
- Gmail, Telegram, Apps Script staging/production, and live Box OAuth were not changed.

## Boundaries and sensitivity

- Tokens, authorization codes, callback state, private identifiers, and secret properties are neither read nor published.
- Status remains `PARTIAL` until authenticated owner-only acceptance provides runtime evidence.
- No new Google or Box consent is started without a confirmed need.
