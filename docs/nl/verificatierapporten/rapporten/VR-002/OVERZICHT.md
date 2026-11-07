# VR-002: factual verification of Gmail-to-Telegram delivery

[Index](../../INDEX.md) | [Schema](../../REPORT_SCHEMA.md) | [Українська](../../../../uk/verification-reports/reports/VR-002/README.md)

Verification framework marker: `REQ-0004`. Source request: `REQ-0009`. Baseline: [Versie 1 `f96d8f0`](https://github.com/Tarasevych/gmail-telegram-controls/tree/f96d8f0) and production Apps Script immutable v42.

## Scope

The verification used one controlled self-test message, owner `/status` and `/check` commands, read-only deployment/webhook inspection, and static source inspection. No random mail was changed. Google consent for another user was not accepted.

## Atomic claims

| Claim | Category | Status | Scope / grade | Statement and evidence | Dependencies / limitations |
|---|---|---|---|---|---|
| VR2-001 | transport | verified | production E5 | The v42 Telegram webhook answered owner commands; pending updates were 0 and no last error existed | Does not prove Gmail delivery |
| VR2-002 | delivery | verified | production E5 negative | One controlled new message produced no Telegram card after a minute interval and manual `/check` | Proves the failure, not its correction |
| VR2-003 | scheduler | verified | source E2 | `checkNewMail_` ran maintenance before mail delivery | The correction requires E3/E5 |
| VR2-004 | scanner | verified | source E2 | A frozen scan with unchanged `upperBoundMs` cannot see mail created after the backlog pass started | Frozen scan remains recovery/backfill |
| VR2-005 | multi-account | verified | source E2 | Fan-out uses `notificationConnectionIds`, not only the active UI account, and isolates connection context | A second real account has not accepted consent |
| VR2-006 | identity | partial | source E2 | A multi-account card includes account email and connection-ID callbacks; the legacy label needs runtime readback | Do not publish email/connection IDs |
| VR2-007 | remediation | partial | local source | Versie 1 adds a bounded realtime lane, per-connection watermark/retry, shared seen dedupe, and delivery-first entry | Local tests and immutable v43 acceptance are not yet recorded |
| VR2-008 | OAuth | blocked | production gate | The separate Gmail account is stopped at new user-specific Google consent | Do not bypass or mix it with the delivery fix |

## Architectural result

- One Telegram main chat is the canonical “All messages” feed.
- Each card is physically created once; account identity selects its address and connection-scoped actions.
- Account roots are filtered context views and do not create a copy of the same card.
- The realtime lane handles the newest bounded window; the frozen scan recovers backlog.
- The active account affects UI but does not constrain notification fan-out.

## Sensitivity and limitations

Tokens, IDs, mail content, OAuth codes, and credential values are excluded. Immutable v43, the complete local suite, and one-card production acceptance require separate evidence. OAuth for another Gmail account remains an independent manual gate.
