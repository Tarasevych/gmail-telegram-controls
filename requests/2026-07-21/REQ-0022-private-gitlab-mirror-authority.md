# REQ-0022: Optional private GitLab mirror authority

- ID: REQ-0022
- Date: YYYY-MM-DD
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=no-change; permissions=update; plan=no-change; product=no-change; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

Власник дозволив використовувати профіль GitLab `tarasevych.pavlo`, якщо це практично допомагає Gmail/Telegram Controls.

### Рішення

- GitHub лишається canonical source-of-truth, release history і публічним knowledge hub.
- GitLab може використовуватися як синхронізований приватний off-platform mirror, recovery remote або додатковий CI channel.
- Mirror не створює паралельну Versie, окрему release numbering line чи незалежну product authority.
- Перед першою публікацією перевірити GitLab authentication, створити private project і виконати звичайний non-force push лише перевірених Git refs.
- Не публікувати secrets, tokens, cookies, OAuth/session data, mailbox content, `initData`, private identifiers або protected local state.
- Якщо GitLab conflictує з GitHub, canonical є GitHub; mirror має fail closed і не переписує history.

### Межа

Цей запит не дозволяє promotion v57, нову Versie, OAuth repetition, Gmail mutation або зміну Telegram zone. Поточний release gate лишається blocked до відновлення Apps Script daily `URLFetch` quota.

<!-- lang:en -->
## English

The owner authorizes use of the GitLab profile `tarasevych.pavlo` when it is practically useful to Gmail/Telegram Controls.

### Decision

- GitHub remains the canonical source of truth, release history, and public knowledge hub.
- GitLab may be used as a synchronized private off-platform mirror, recovery remote, or additional CI channel.
- The mirror does not create a parallel Versie, a separate release-numbering line, or independent product authority.
- Before first publication, verify GitLab authentication, create a private project, and use only ordinary non-force push of verified Git refs.
- Do not publish secrets, tokens, cookies, OAuth/session data, mailbox content, `initData`, private identifiers, or protected local state.
- If GitLab conflicts with GitHub, GitHub is canonical; the mirror fails closed and does not rewrite history.

### Boundary

This request does not authorize v57 promotion, a new Versie, OAuth repetition, Gmail mutation, or a Telegram-zone change. The current release gate remains blocked until the Apps Script daily `URLFetch` quota recovers.
