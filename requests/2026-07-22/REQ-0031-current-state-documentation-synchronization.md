# REQ-0031 — Синхронізація актуального стану документації / Current-state documentation synchronization

- ID: REQ-0031
- Date: 2026-07-22
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=update; permissions=reference; plan=update; product=update; release=update
- Permission basis: none

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Перевірити, чи застарілі GitHub-статті можуть спричиняти помилки Telegram/Gmail runtime або release automation.
- Фактичний source audit не знайшов runtime-коду, який читає GitHub Markdown, README або knowledge hub; тому застаріла стаття не є доведеною першопричиною роботи бота.
- Водночас root `README.md` містить застаріле твердження про production Apps Script v37, яке конфліктує з актуальним verified release evidence для production v57. Така розбіжність може помилково скеровувати людей, агентів і recovery-процеси, що читають репозиторій.
- Відокремити mutable current-state документацію від immutable historical evidence: історичні release/postmortem статті не переписувати, а поточний status surface, README, індекси, roadmap/issues і cumulative release header синхронізувати після кожного успішного release.
- У release cycle додати fail-closed documentation gate: cycle не отримує статус completed, доки GitHub/GitLab current-state surfaces не відображають exact production/staging state та не пройшли bilingual/consistency checks.

### Критерії завершення

- Root README більше не називає v37 поточним production і посилається на канонічну парну UK/EN current-state сторінку.
- Створено один machine-readable current-state manifest і парні UK/EN сторінки без secrets та приватних identifiers.
- Автоматична перевірка виявляє суперечність між manifest, root README і парними current-state сторінками.
- `BOUNDED_RELEASE_AUTOMATION` вимагає оновлення current-state документації після promotion або rollback до закриття cycle.
- Historical release/postmortem evidence залишається незмінним; актуальність визначається явною датою та статусом current-state surface.

<!-- lang:en -->
## English

### Normalized request

- Determine whether stale GitHub articles can cause Telegram/Gmail runtime failures or release-automation errors.
- The factual source audit found no runtime code that reads GitHub Markdown, README, or the knowledge hub; a stale article is therefore not a proven root cause of bot runtime behavior.
- However, the root `README.md` still claims Apps Script v37 is production, conflicting with current verified release evidence for production v57. This inconsistency can misdirect people, agents, and recovery processes that read the repository.
- Separate mutable current-state documentation from immutable historical evidence: do not rewrite historical release/postmortem articles, while synchronizing the current status surface, README, indexes, roadmap/issues, and cumulative release header after every successful release.
- Add a fail-closed documentation gate to the release cycle: the cycle cannot become completed until GitHub/GitLab current-state surfaces reflect the exact production/staging state and pass bilingual/consistency checks.

### Completion criteria

- The root README no longer calls v37 current production and links to a canonical paired UK/EN current-state page.
- One machine-readable current-state manifest and paired UK/EN pages exist without secrets or private identifiers.
- An automated check detects contradictions among the manifest, root README, and paired current-state pages.
- `BOUNDED_RELEASE_AUTOMATION` requires current-state documentation updates after promotion or rollback before closing the cycle.
- Historical release/postmortem evidence remains unchanged; currency is established by an explicit date and status on the current-state surface.
