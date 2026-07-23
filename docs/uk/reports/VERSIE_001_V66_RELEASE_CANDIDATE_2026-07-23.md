# Release candidate Apps Script v66 у Versie 1

- Дата: 2026-07-23
- Статус: PARTIAL
- Scope: лише cumulative immutable candidate; production лишається exact v65
- Source request: REQ-0033
- Проблема: GT-039
- Verification report: VR-015
- English mirror: ../../en/reports/VERSIE_001_V66_RELEASE_CANDIDATE_2026-07-23.md

## Межа кандидата

Helper pin-ить exact source main d2da9d9b7393e125b3e6592f6d0fd527381946c0 і normalized-LF hashes для Code.gs, MultiAccount.gs, MailClient.gs, MailApp.html та appsscript.json. Candidate v66 відновлює eligibility SENT+INBOX після required INBOX gate, зберігаючи exclusion SPAM/TRASH, important-only mode та stable Gmail message-ID/card reservations.

Rollback і будь-яка exact legacy staging boundary є immutable v65. Immutable v65 ніколи не переписується.

## Перевірені локальні докази

- Focused source contracts GT-039 пройшли 161/161 до release branch.
- Cumulative source і documentation phase пройшли 509/509.
- Bilingual, knowledge-hub, verification-report і canonical release-state validators пройшли.
- GitHub і private GitLab main мали exact parity на d2da9d9b7393e125b3e6592f6d0fd527381946c0.

## Решта acceptance

PreflightOnly і один StageOnly VERIFIED: stable та HEAD лишилися exact v65, immutable v66 створено один раз, і існує рівно один owner-only staging deployment. Signed native Telegram Desktop staging acceptance і production promotion лишаються UNVERIFIED. Production promotion заборонений до успішного staging acceptance. Новий OAuth consent, випадкова Gmail mutation або змішування Gmail/Telegram zones не допускаються.