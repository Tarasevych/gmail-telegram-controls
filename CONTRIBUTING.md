# Contributing to Gmail Telegram Controls

Source request: `REQ-0010`. Active product line: **Versie 1 · 2026-07-19**. Do not create a next Versie without explicit owner authorization recorded on `Запити`.

## Українською

### Порядок внесення змін

1. Прочитайте поточний `REQ-ID`, постійні правила `Інструкції` та лише релевантний запис `Повноваження`.
2. Працюйте тільки в активній Versie; історичні immutable releases не редагуються.
3. Не додавайте tokens, OAuth codes, cookies, mailbox content, deployment-local values або інші secrets.
4. Українські й англійські сторінки створюйте та змінюйте парно.
5. Перед commit запускайте checks, які покривають змінений контур, і записуйте межі доказу.

### Lessons learned

1. Product Versie та Apps Script immutable є різними ідентифікаторами; immutable ніколи не переписується.
2. Спочатку тестується точний candidate source, потім запускається preflight; preflight не замінює behavioral tests.
3. Release bundle має бути hash-pinned; deploy, description і rollback metadata генеруються з одного bundle.
4. Після неоднозначного external mutation потрібні idempotency key і readback до retry.
5. Global/user lock не можна тримати під час Gmail, Telegram або іншого network I/O; locks мають бути account-scoped і короткими.
6. Realtime, frozen і Spam paths повинні використовувати одну canonical eligibility function.
7. Shared seen ledger забезпечує at-most-once Telegram card для одного logical message незалежно від labels або scan lane.
8. `activeConnectionId` впливає лише на UI; notification fan-out охоплює всі enabled connections із суворою account isolation.
9. Результат кожної lane/connection треба зберегти; aggregation не може приховувати `REAUTH` або іншу вищу severity.
10. Diagnostics мають бути stage-specific і sanitized: без token, email content, connection IDs та credentials.
11. Capacity рахується за validated live records після compaction/purge; raw index length заборонений як capacity guard.
12. Acceptance має перевіряти observable behavior: одну картку, правильний account marker/callback scope, Inbox/Spam/Sent exclusions, retry і multi-account fan-out.

### Обов’язкові документаційні checks

```powershell
python tools/check_bilingual_docs.py
python tools/check_knowledge_hub.py
python tools/check_verification_reports.py
```

Кожна verification-report сторінка зберігає repository-wide framework marker `REQ-0004` і окремо називає свій фактичний source request.

Повний розбір: [український postmortem](docs/uk/POSTMORTEM.md).

## English

### Change order

1. Read the current `REQ-ID`, standing `Інструкції`, and only the relevant `Повноваження` record.
2. Work only on the active Versie; historical immutable releases are never edited.
3. Do not commit tokens, OAuth codes, cookies, mailbox content, deployment-local values, or other secrets.
4. Create and update Ukrainian and English pages as a pair.
5. Before commit, run checks that cover the changed area and record the evidence boundary.

### Lessons learned

1. Product Versie and Apps Script immutable are different identifiers; an immutable is never rewritten.
2. Test the exact candidate source before preflight; preflight does not replace behavioral tests.
3. Hash-pin the release bundle; generate deployment, description, and rollback metadata from that one bundle.
4. After an ambiguous external mutation, use an idempotency key and readback before retrying.
5. Never hold a global/user lock across Gmail, Telegram, or other network I/O; locks must be account-scoped and short.
6. Realtime, frozen, and Spam paths must use one canonical eligibility function.
7. A shared seen ledger enforces at-most-once Telegram card creation for one logical message across labels and scan lanes.
8. `activeConnectionId` affects UI only; notification fan-out covers every enabled connection with strict account isolation.
9. Preserve every lane/connection result; aggregation must not hide `REAUTH` or any higher-severity outcome.
10. Diagnostics must be stage-specific and sanitized: no tokens, mail content, connection IDs, or credentials.
11. Calculate capacity from validated live records after compaction/purge; raw index length is forbidden as a capacity guard.
12. Acceptance must test observable behavior: one card, correct account marker/callback scope, Inbox/Spam/Sent exclusions, retry, and multi-account fan-out.

### Required documentation checks

```powershell
python tools/check_bilingual_docs.py
python tools/check_knowledge_hub.py
python tools/check_verification_reports.py
```

Every verification-report page keeps the repository-wide `REQ-0004` framework marker and separately names its actual source request.

Full analysis: [English postmortem](docs/en/POSTMORTEM.md).
