# REQ-0025: Autonomous night completion report

- ID: REQ-0025
- Date: 2026-07-21
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Завершити всі незалежні безпечно досяжні етапи активного autonomous recovery goal.
- Опублікувати парний UK/EN morning report із requirement-by-requirement evidence, commits, tests, Actions, runtime state, blockers, manual gates, Crash Report і однією наступною дією.
- Позначити локальний recovery checkpoint як `complete_with_blockers`, якщо зовнішня quota та окремий next-immutable authorization лишаються невирішеними після вичерпання незалежної роботи.
- Зберегти GitHub канонічним source-of-truth, а приватний GitLab лише exact non-force recovery mirror перевірених refs.

### Критерії завершення

- Report відрізняє `verified`, `unverified`, `blocked` і recommendation та посилається на immutable commits, PR і workflow runs.
- Crash Report містить timestamp, subsystem, sanitized error, attempted action, alternative, evidence locator, preserved state, retry condition, manual-action status і safe next action.
- Парні UK/EN файли проходять bilingual, knowledge-hub і verification validators; privacy/secret scan не знаходить protected data.
- Documentation-only commit проходить GitHub Actions, normal PR merge і exact readback; verified refs дзеркаляться у приватний GitLab без force-push.
- Source candidate PR #11 лишається draft/unmerged; production v55, historical v56 і owner-only staging v57 не змінюються.

### Межа

Немає дозволу merge source candidate, створювати наступний immutable, змінювати release helper, feature flag, deployment, trigger, OAuth, Gmail data, Telegram menu або account/zone mapping.

<!-- lang:en -->
## English

### Normalized request

- Complete every independent safely achievable stage of the active autonomous recovery goal.
- Publish paired UK/EN morning reports with requirement-by-requirement evidence, commits, tests, Actions, runtime state, blockers, manual gates, a Crash Report, and one next action.
- Mark the local recovery checkpoint `complete_with_blockers` if the external quota and separate next-immutable authorization remain unresolved after independent work is exhausted.
- Keep GitHub as the canonical source of truth and private GitLab only as an exact non-force recovery mirror of verified refs.

### Completion criteria

- The report distinguishes `verified`, `unverified`, `blocked`, and recommendation and links immutable commits, PRs, and workflow runs.
- The Crash Report includes timestamp, subsystem, sanitized error, attempted action, alternative, evidence locator, preserved state, retry condition, manual-action status, and safe next action.
- Paired UK/EN files pass bilingual, knowledge-hub, and verification validators; the privacy/secret scan finds no protected data.
- The documentation-only commit passes GitHub Actions, a normal PR merge, and exact readback; verified refs are mirrored to private GitLab without force-push.
- Source candidate PR #11 remains draft and unmerged; production v55, historical v56, and owner-only staging v57 remain unchanged.

### Boundary

There is no authority to merge the source candidate, create the next immutable, change a release helper, feature flag, deployment, trigger, OAuth, Gmail data, Telegram menu, or account/zone mapping.
