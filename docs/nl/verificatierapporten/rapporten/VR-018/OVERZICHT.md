# VR-018 — Exact identity for Telegram attachments

[Українською](../../../../uk/verification-reports/reports/VR-018/README.md)

- **Date:** 2026-07-23
- **Overall status:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-28` / V3 `B-01`
- **Issue:** `GT-048`
- **Release boundary:** Apps Script production/HEAD v65, staging `0`; immutable v68 historical; correction commit `f2c00d3` is not deployed

## Root cause

The Telegram callback contained an attachment ordinal from one MIME read. On the next read, the same ordinal was not a stable identity: parts could be reordered and duplicate names did not remove ambiguity. A historical callback could therefore select a different attachment.

## Source correction

- New cards encode a short opaque token computed from stable MIME/Gmail attributes: `partId`, attachment/inline-data identity, content metadata, name, type, and size.
- The raw Gmail attachment ID is not exposed in Telegram callback data.
- After a click, the server reads the Gmail message again in the correct connection context and requires exactly one identity match.
- Zero or multiple matches fail closed without sending an arbitrary file.
- Historical `mail.att:` and `a2.` callbacks continue through the legacy ordinal path so existing cards do not break.
- The immutable v68 helper and its hashes were not changed. Its regression test verifies historical pinned hashes instead of requiring mutable HEAD to remain identical to v68 forever.

## Access matrix

Reinspection of `mailboxMultiResolveAccess_` found no new source defect. The existing fail-closed code first resolves the exact opaque connection ID, excludes a revoked connection, then requires active membership in that connection's exact zone before comparing the actual `viewer`, `responder`, `manager`, `admin`, and `owner` roles.

The new focused behavioral test closes the previous evidence gap:

- all `25` actual-role × minimum-role combinations;
- owner access and allowed shared-role behavior;
- zone mismatch, cross-user denial, and exact selection between two connections with the same visible identity;
- a pending invite without membership, plus expired, revoked, and replayed/accepted invites;
- acceptance of every supported invite role and reactivation of a revoked member only with the invited role;
- the actor/invite delegation matrix for the actual roles;
- revoked membership, a hidden revoked connection, and the explicit `reauth_required` boundary.

`MultiAccount.gs` is unchanged. The actual schema has no separate `hidden` status: a revoked connection is hidden by exclusion from visible accounts.

## Atomic claims

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-018-01 | An ordinal callback is not a stable Gmail attachment identity. | VERIFIED | source inspection and reorder regression |
| VR-018-02 | New callbacks contain an opaque exact token and no raw attachment ID. | VERIFIED | unit contract |
| VR-018-03 | Reorder, duplicate names, Unicode inline data, and zero-byte attachments resolve the correct exact item. | VERIFIED | `mail_actions.test.js` |
| VR-018-04 | A missing or ambiguous exact match sends no attachment. | VERIFIED | fail-closed regression |
| VR-018-05 | Historical ordinal callbacks remain parse-compatible. | VERIFIED | legacy `a2.` regression |
| VR-018-06 | The source correction does not regress Apps Script contracts. | VERIFIED | targeted `154/154`; cumulative `532/532` |
| VR-018-07 | The added source contains no credential material. | VERIFIED | added-line secret-pattern matches `0` |
| VR-018-08 | The native Telegram owner receives the correct file after attachment reordering. | UNVERIFIED | staging/native download was not run |
| VR-018-09 | The correction is active in production. | UNVERIFIED | production/HEAD remains v65; no promotion ran |
| VR-018-10 | All five roles allow only their actual minimum-role thresholds. | VERIFIED | focused access matrix `7/7`, role assertions `25/25` |
| VR-018-11 | Zone mismatch, cross-user access, and revoked membership receive no connection access. | VERIFIED | direct behavioral regression |
| VR-018-12 | Pending, expired, revoked, and replayed invites grant no unauthorized access. | VERIFIED | invite lifecycle regression |
| VR-018-13 | Exact connection selection does not depend on a display name or email address. | VERIFIED | duplicate-visible-identity selection regression |
| VR-018-14 | Closing the access evidence gap required no product-code correction. | VERIFIED | `MultiAccount.gs` unchanged |
| VR-018-15 | The native/runtime access matrix passed acceptance in the deployed Telegram flow. | UNVERIFIED | no live Gmail/OAuth/Telegram or release action ran |

## Release decision

The source correction and focused access evidence are ready for a normal PR and required CI. No new immutable candidate was created: current owner authorization does not permit a hidden release contour, and native download plus deployed access acceptance are still absent. Until that acceptance exists, `GT-048` and `B1-28` remain `PARTIAL`.
