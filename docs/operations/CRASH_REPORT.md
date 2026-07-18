# Crash and blocker report

No current production crash was detected during the v28 baseline audit.

## Frozen issue

- Formal Codex Security scans repeatedly triggered the platform cybersecurity-content filter. Those artifacts remain frozen and that workflow is not resumed. Ordinary functional authorization tests may assert only the expected denial.

## Manual gates

Work must stop for CAPTCHA, OTP, a new Google OAuth consent belonging to a specific user, or an unavoidable owner decision. A blocker entry must include timestamp, affected phase, exact non-secret error, one attempted alternative, preserved state, and next safe action.

## Known non-crash limitations

- The v28 P0 Focus View now has fresh localhost desktop and 390×844 rendered QA. Provider OAuth and real-message mutation paths were intentionally not exercised.
- The repository is public. Runtime secrets, sessions, message content, and private QA captures must never be committed.
