# VR-033 — E-04 Gmail label-management regression audit

Verification framework: REQ-0004

- **Status:** `CONFLICTING`
- **Date:** 2026-07-23
- **Request:** `REQ-0035`
- **Related records:** `GT-027`, `B1-21`, historical `VR-005`
- **Українське дзеркало:** [VR-033](../../../../uk/verification-reports/reports/VR-033/README.md)

## Atomic claims

| Claim | Category | Status | Origin |
|---|---|---|---|
| A Gmail Label has authoritative `type`: `user` can be modified/deleted and `system` cannot; name and visibility do not replace `type` | API | `VERIFIED` | [Gmail Label resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.labels), [Manage labels](https://developers.google.com/workspace/gmail/api/guides/labels) |
| Current backend derives `canEdit` only from provider `type=user`, not from a prefix or localized name | Source | `VERIFIED` | `apps-script/MailClient.gs`; E-04 behavioral matrix |
| USER labels named `INBOX/...`, `[Imap]/...`, localized/system-like names, and `labelHide` retain the edit contract; a SYSTEM label with a user-like name does not receive it | Regression | `VERIFIED` | synthetic backend/client fixtures |
| Sidebar and profile manager use one metadata snapshot; only USER labels receive the management action, and a late account response cannot update another Gmail context | State/isolation | `VERIFIED` | `apps-script/MailApp.html`; existing account-scoped contracts |
| Long/nested names, bounded scrolling, keyboard submit, ARIA labels, permission/retry, and guarded delete remain in current source | UX/accessibility | `VERIFIED` | focused E-04 contracts |
| Current source has a defect that removes pencils from USER labels | Root cause | `UNVERIFIED` | Source audit and tests did not reproduce the defect |
| Historical v59 staging showed pencils, while the current owner report says they are absent | Runtime | `CONFLICTING` | [VR-005](../VR-005/README.md) and the sanitized owner report |
| Current production v65 passed read-only native E-04 acceptance | Runtime | `UNVERIFIED` | The shared Apps Script URL Fetch quota blocks a causally valid readback; staging is `0` |

## Checks

- Focused label contracts: `7/7`.
- Full Apps Script suite: `619/619`.
- No real Gmail label create/rename/delete, OAuth, Telegram mutation, staging, or production action was performed.
- Fixtures contain no real email, label name, message content, token, or provider error text.

## Conclusion and boundaries

- Status is `CONFLICTING`: the source contract is confirmed, but the current native owner observation conflicts with historical live evidence and has not been independently reproduced.
- Active `GT-027/B1-21` is corrected from stale production v57/v59 statements to the current boundary: production v65 and staging `0`.
- The next evidence step is read-only UI acceptance after quota recovery: `+`, a pencil for every USER label, no pencil for SYSTEM labels, readable long names, and synchronized surfaces without any real mutation.
