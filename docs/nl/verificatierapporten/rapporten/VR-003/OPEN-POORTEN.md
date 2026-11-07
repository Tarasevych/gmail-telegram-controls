# VR-003 open gates

**Verification framework:** REQ-0004

| Gate | Status | Required evidence |
|---|---|---|
| Create immutable v55 | not performed | owner-authorized release action and immutable deployment readback |
| Stage v55 | not performed | StageOnly result, exact deployment ID, and post-stage readback |
| Production promotion | blocked by release boundary | explicit owner authorization, Promote result, and rollback confirmation |
| One-card production acceptance | blocked | controlled Gmail event, exactly one Telegram card, correct account marker, and action verification |
| Second Gmail account acceptance | blocked on user-specific Google consent | user completes consent when Google presents it, then callback and account-state verification |
| OAuth relay diagnosis | unverified | controlled callback trace without secrets and matched runtime evidence |
| Historical live v50/v54 state | partial | fresh read-only deployment and Script Properties readback |
| Earlier stale-hash diagnosis | unverified | matching immutable Git or release-log evidence |

VR-003 intentionally stops before these gates. Local tests and `PreflightOnly` are E3 evidence, not production proof.
