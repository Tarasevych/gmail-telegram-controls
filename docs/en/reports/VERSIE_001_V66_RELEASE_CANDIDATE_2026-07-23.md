# Versie 1 Apps Script v66 release candidate

- Date: 2026-07-23
- Status: PARTIAL
- Scope: cumulative immutable candidate only; production remains exact v65
- Source request: REQ-0033
- Issue: GT-039
- Verification report: VR-015
- Ukrainian mirror: ../../uk/reports/VERSIE_001_V66_RELEASE_CANDIDATE_2026-07-23.md

## Candidate boundary

The helper pins exact source main d2da9d9b7393e125b3e6592f6d0fd527381946c0 and normalized-LF hashes for Code.gs, MultiAccount.gs, MailClient.gs, MailApp.html and appsscript.json. Candidate v66 restores SENT+INBOX eligibility after the required INBOX gate while retaining SPAM/TRASH exclusion, important-only mode and stable Gmail message-ID/card reservations.

Rollback and any exact legacy staging boundary are immutable v65. Immutable v65 is never rewritten.

## Verified local evidence

- GT-039 focused source contracts passed 161/161 before the release branch.
- The cumulative source and documentation phase passed 509/509.
- Bilingual, knowledge-hub, verification-report and canonical release-state validators passed.
- GitHub and private GitLab main parity was exact at d2da9d9b7393e125b3e6592f6d0fd527381946c0.

## Remaining acceptance

PreflightOnly, one StageOnly, signed native Telegram Desktop staging acceptance and production promotion remain UNVERIFIED. Production promotion is forbidden until staging acceptance passes. No new OAuth consent, random Gmail mutation or Gmail/Telegram zone mixing is permitted.