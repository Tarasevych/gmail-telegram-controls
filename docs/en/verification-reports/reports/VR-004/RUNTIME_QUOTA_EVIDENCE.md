# Runtime quota evidence: production v55 and staging v57

[Українська](../../../../uk/verification-reports/reports/VR-004/RUNTIME_QUOTA_EVIDENCE.md) | [VR-004](README.md)

- **Verification date:** 2026-07-21
- **Framework:** REQ-0004
- **Scope:** signed Telegram Desktop Mini App and Apps Script Executions
- **Gmail/OAuth mutation:** no
- **Release promotion:** no

## Verified fact

Owner-only staging v57 and two fresh production v55 launches showed the same generic mailbox error. A candidate-specific v57 regression is therefore not proven.

For staging v57, Apps Script Executions showed completed:

- `doPost`: 3.02 s;
- `mailboxRedeemLaunch`: 3.4 s;
- `mailboxRpc`: 23.218 s.

This separates the HTTP callback, signed-launch redemption, and RPC transport from the application-level Gmail API failure. The worker lane then logged:

1. `Google OAuth token refresh request failed`;
2. `Service invoked too many times for one day: urlfetch`;
3. stack boundary `gmailApiRequest_` -> `gmailApi_` -> `listGmailNotificationPage_` -> `runMailCheck_` -> `checkNewMail_`.

## Release decision

- Production and HEAD remain exact v55.
- Immutable v56 remains historical.
- One owner-only v57 staging deployment is preserved for the future A/B.
- The Telegram menu points back to production.
- v57 is not promoted while the shared quota is exhausted.
- Code is not changed for an external quota; the next candidate is v58 only if a candidate-only defect is proven.

## Next evidence gate

After daily quota recovery:

1. two fresh production v55 launches without a network error;
2. signed staging v57 bootstrap;
3. avatar and three account roots;
4. switch to the controlled second Gmail account and back without OAuth;
5. only after A/B pass, standard Promote, two production launches, and CleanupStaging;
6. four trigger opportunities without overlap, the 150-second worker slot, and the 15-minute History slot;
7. one owner self-message with a unique marker, exactly one Telegram card, and no duplicate after two `/check` runs.

## Limitations

- The UI execution ended with an application-level error, so a successful Apps Script row does not mean a successful mailbox result.
- The exact shared-quota recovery time is unverified.
- Mail content, tokens, `initData`, account identifiers, execution IDs, and secret properties are not published.
