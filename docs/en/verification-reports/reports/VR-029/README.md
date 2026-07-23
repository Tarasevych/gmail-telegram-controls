# VR-029 — Separation of the read-only Spam list and proactive notification policy

- **ID:** VR-029
- **Date:** 2026-07-23
- **Status:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-38`
- **Issue:** `GT-058`
- **V3 contour:** `G-01`

## Verified claim

The explicit owner command `/mail folder:spam` is a read-only list operation, separate from the policy that creates proactive Telegram cards. Product source already compiles the folder to the exact Gmail `SPAM` system label, adds `includeSpamTrash=true`, and uses a bounded page token. The proactive worker separately reads a frozen time slice and applies the current-`INBOX` gate after metadata read.

## Evidence-gap root cause

No source defect was confirmed. The gap was the absence of a direct regression contract pinning both allowed boundaries at once: Spam may be read on explicit owner request, while a Spam-only message must not become a proactive notification card.

## Evidence

- The synthetic parser accepts only allowlisted `folder:spam`.
- First and subsequent list requests use exact `labelIds=SPAM`, `includeSpamTrash=true`, and a bounded Gmail page token.
- The contract rejects the appearance of mutation endpoints in the Spam browse path.
- The notification scan remains a separate time-slice request without a `SPAM` folder filter.
- The source contract confirms the current-`INBOX` gate after metadata read.
- Focused contract: `2/2`.
- Complete Apps Script suite: `612/612`.
- `Code.gs` is unchanged.

## Boundaries

- No live Gmail message was read or changed.
- No Telegram command was run in production.
- OAuth, staging, production, menu, and release journal were unchanged.
- Native owner acceptance for first/next page, empty state, and runtime error remains `UNVERIFIED`.
- The shared URL Fetch quota blocker is not used as success or regression evidence.

## Conclusion

The source policy separation is `VERIFIED`; the overall contour remains `PARTIAL` pending native owner acceptance. This evidence neither changes proactive Spam policy nor creates a release candidate.

[Українське дзеркало](../../../../uk/verification-reports/reports/VR-029/README.md)
