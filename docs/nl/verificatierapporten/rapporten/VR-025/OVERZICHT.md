# VR-025 — `INBOX+SENT` policy conflict

[Українською](../../../../uk/verification-reports/reports/VR-025/README.md)

- **Date:** 2026-07-23
- **Overall status:** CONFLICTING
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Workstream:** V3 `T-03`
- **Issue:** `GT-039`
- **Release boundary:** `BLOCKED`; production v65, staging `0`, immutable v70 unchanged; no Gmail, Telegram, OAuth, menu, deployment, or release-journal mutation

## Verified states

1. `REQ-0009` defines one physical delivery per Gmail message and forbids duplicates.
2. `REQ-0019` explicitly records one card for an external `INBOX` message and a skip for self/alias `INBOX+SENT`.
3. Production v65 implements the `INBOX+SENT` skip; the prior live probe produced zero cards.
4. Current `main` allows `INBOX+SENT` in `gmailNotificationLabelsEligible_`; the focused `161/161` suite proves one delivery and no repeat delivery.
5. `REQ-0033`, to which `GT-039` is linked, contains no separate direct owner policy decision for self/alias mail.

## Three-layer RCA

| Layer | Conclusion | Status |
|---|---|---|
| Gmail labels | One Gmail message may carry both `INBOX` and `SENT`; these are not two separate message identities. | VERIFIED |
| Delivery/dedupe | Both implementations are deterministic: production skips, while current source delivers once through stable message-ID dedupe. | VERIFIED |
| Product policy | Canonical owner records define incompatible self/alias outcomes. A technical test cannot choose product policy. | CONFLICTING |

## Atomic claims

| ID | Claim | Status | Evidence |
|---|---|---|---|
| VR-025-01 | Production v65 skips `INBOX+SENT`. | VERIFIED | VR-015 production observation |
| VR-025-02 | Current source delivers `INBOX+SENT` once and does not repeat delivery. | VERIFIED | `gmailNotificationLabelsEligible_`; focused `161/161` |
| VR-025-03 | `REQ-0019` explicitly accepts skipping the self/alias probe. | VERIFIED | sanitized canonical request record |
| VR-025-04 | `REQ-0033` provides no direct new self/alias policy instruction. | VERIFIED | canonical request record |
| VR-025-05 | The exactly-once source delta is authorized for production promotion. | BLOCKED | direct owner decision required |

## Single required owner action

Choose one invariant:

- `(A)` skip self/alias `INBOX+SENT`; deliver external `INBOX` exactly once.
- `(B)` deliver every `INBOX`, including self/alias `INBOX+SENT`, exactly once.

Until that decision, do not create a release candidate containing the disputed notification-policy delta. Independent UI, attachment, cache, draft, and provider workstreams may continue.
