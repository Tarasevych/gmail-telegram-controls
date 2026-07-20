# Known problem register

Updated: **2026-07-20**. Statuses: `Open`, `In progress`, `Blocked`, `Resolved locally`, `Verified in production`.

| ID | Status | Since Versie | Problem | Resolution / next evidence |
|---|---|---:|---|---|
| GT-001 | Resolved locally | 1 | One email reaches Telegram twice | Do not rescan the owner mailbox through OAuth and dedupe same-user/same-email; real-time acceptance remains |
| GT-002 | Resolved locally | 1 | Google callback opens a Drive error page instead of the service | The active flow uses the configured Apps Script redirect directly; the stale GitHub relay is decommissioned; staging callback acceptance remains |
| GT-003 | Resolved locally | 1 | Header shows an initial instead of the Google profile photo | Header uses the real photo with an initial fallback; staging readback remains |
| GT-004 | Resolved locally | 1 | `Add Gmail account` requires an extra `Continue with Google` click | Open the authorization URL immediately; show fallback only when browser navigation is blocked |
| GT-005 | Resolved locally | 1 | Account panel counts stale/inactive connection IDs | Filter preferences against active visible IDs; staging readback remains |
| GT-006 | Open | 1 | OAuth client has more than one enabled secret | Determine the active secret from protected runtime evidence; do not delete or rotate in Versie 1 without a safe plan |
| GT-007 | Open, low risk | 1 | GitHub Pages warns about forced Node 24 for older Actions | Update action pins in a later Versie after production stabilization |
| GT-008 | Blocked by manual gate | 1 | Full real-time acceptance of the new Gmail flow is missing | After OAuth Save, owner completes account choice/consent; then log every function |
| GT-009 | Resolved locally | 1 | Accessibility label uses plural for one account | `1 Gmail account`, plural for other values |
| GT-010 | Open | 1 | The OAuth token-refresh path has no function-local lock; concurrent behavior is unproven | Add a lock or prove external serialization; run a controlled concurrency test before production |
| GT-011 | Resolved locally | 1 | Telegram settings lacked native one-click Gmail account switching | Added user/zone-bound callback buttons, a short OAuth launcher, and automatic menu refresh after callback; staging/readback remains |

## Update procedure

1. Add a new problem once using the next `GT-*` ID.
2. Never delete resolved records; change status and add release evidence.
3. Do not mark `Verified in production` from a unit test or staging alone.
4. Do not add email content, OAuth codes, tokens, cookies, or secret properties.

## Research problem register

The complete report-derived risk and unresolved-conflict list is in [Problems](knowledge-hub/PROBLEMS.md). Only verified current defects receive a `GT-*` entry in the table above.

## Independent verification

[VR-001](verification-reports/reports/VR-001/README.md) preserves every contradicted, partial, unverified, and blocked `KH-*` claim. They do not become `GT-*` automatically; `GT-010` was added separately because the current code has a statically confirmed gap. Source request: `REQ-0004`.
