# Versie 1 Apps Script v64 production acceptance and GT-031/GT-037 closure

[Українською](../../uk/reports/VERSIE_001_V64_RELEASE_AND_GT031_GT037_CLOSURE_2026-07-22.md)

- **Date:** 2026-07-22
- **Status:** VERIFIED
- **Source request:** `REQ-0033`
- **Atomic verification:** [VR-013](../verification-reports/reports/VR-013/README.md)

## Release boundary

- Versie remains **Versie 1**.
- Cumulative source boundary: `da8b2768323db8fd8c1ba886b556bbfd2148d6de`.
- Helper PR #38 merged normally as `bbb6fa39a550c623f1507ccc4791d20bfb150b57`.
- Signed bridge PR #39 merged normally as `8b65d7e7653aadac4344e5ad2d4d86f56bb40f4d`.
- Final deployment state: stable and HEAD immutable v64, staging `0`, journal `cleaned`.
- Direct rollback is exact immutable v63. Historical immutables were not rewritten.

## Source and release gates

- GT-031 focused UI contracts: `88/88`; pre-release source suite: `501/501`.
- v64 release-helper contracts: `2/2`; cumulative release suite: `503/503`.
- The first bridge pass exposed a stale historical assertion that coupled preserved v63 evidence to the mutable current menu pointer. The assertion was corrected to preserve v63 while prohibiting its reactivation.
- Final bridge/cumulative suite: `505/505`.
- Required GitHub checks passed for PR #38 and PR #39; GitHub and the private GitLab mirror were synchronized at each merged boundary.
- Read-only `PreflightOnly` accepted stable/HEAD v63 with no staging. Exactly one `StageOnly` created immutable v64 and one staging deployment; post-stage preflight reported `staging_verified`.

## Native staging acceptance

- The single-account header showed the active name, full email and a tappable narrow-screen `Адреса повністю` disclosure.
- The real profile avatar and the intentional letter fallback both rendered.
- Exactly three isolated Gmail roots were present.
- Controlled switching `alternate -> primary -> alternate` completed without OAuth.
- `Спільна пошта` displayed the actual three-account name-to-address mapping, then the initial mode was restored.
- One incidental shared-membership toggle caused by UI automation was immediately reversed; authoritative readback again showed three included Gmail roots.
- No OTP, CAPTCHA, passkey or Google consent screen appeared.

## Promotion and production acceptance

- The owner menu was returned to `📬 Пошта · Versie 1` before promotion.
- `Promote` advanced exact v63 to v64 using one bounded mutation and converged without a false negative.
- Two independent fresh native Telegram Desktop production launches loaded the v64 mailbox and responsive account context.
- `CleanupStaging` removed the exact staging deployment.
- Final `PreflightOnly` reported stable/HEAD v64, immutable-ready hashes, staging `0` and journal `cleaned`.

## Runtime observation and limits

- The direct Apps Script Processes API returned `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT`. No scope expansion, OAuth cycle or default-GCP-project migration was attempted.
- The authenticated owner Apps Script UI showed six completed post-cleanup `checkNewMail_` rows with durations `30.765 s`, `65.734 s`, `3.164 s`, `39.805 s`, `45.915 s` and `19.764 s`.
- The 3.164-second shell formally overlapped the preceding row by about 5.7 seconds and exited first. This is consistent with tokenized lease rejection, but the exact substage reason is `UNVERIFIED` because content-free telemetry was unavailable.
- No additional real email was sent or changed. External automatic INBOX delivery after v64 therefore remains `UNVERIFIED`.

## Result

- `GT-031`: `VERIFIED` in production v64.
- `GT-037`: `VERIFIED` in production v64.
- `GT-032` through `GT-036`: `PARTIAL` pending their distinct P0 scenarios.
- Immutable v64 is the only current production/HEAD target; exact v63 is the rollback target.