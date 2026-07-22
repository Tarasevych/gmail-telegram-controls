# REQ-0028 - Authorize cumulative staging integration

- ID: REQ-0028
- Date: 2026-07-22
- Status: blocked
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=update; plan=update; product=update; release=update
- Permission basis: explicit

<!-- lang:uk -->
## Українською

### Нормалізований запит

- Власник прямо дозволив виконати normal merge PR #16, створити наступний cumulative immutable staging candidate у межах Versie 1 та інтегрувати PR #11.
- Дозволені пов'язані оновлення гілок, commits, normal pushes, required checks, release preflight і staging acceptance.
- Production promotion дозволене лише після повного успішного staging acceptance, точного readback і готового rollback до production v57.

### Межі

- Versie 2 не дозволена; чинний продукт залишається Versie 1.
- Заборонені force-push, rebase опублікованої історії, rewrite history, bypass branch protection або required checks.
- Immutable candidates не переписуються; при code-level fix створюється наступна immutable Apps Script version.
- Не повторювати OAuth і не змінювати випадкові Gmail records; зупинитися на CAPTCHA, OTP/2FA, passkey, новій Google consent або неоднозначності account/zone.
- Production promotion заборонене, якщо будь-який staging gate є PARTIAL, UNVERIFIED, CONFLICTING, BLOCKED або failed.

### Критерії завершення

- REQ-0028 і вузьке release authority опубліковані та перевірені.
- PR #16 і PR #11 merged normal merge commits після green checks.
- Cumulative main проходить targeted, full-suite, documentation, release-contract і privacy gates.
- Наступний immutable candidate створений і розгорнутий тільки у staging з exact-v57 rollback readiness.
- Staging acceptance перевіряє Telegram bootstrap, avatar, account roots/switching, mailbox, Gmail label create/rename/delete/system protection, adapter flag boundary, duplicate suppression і відсутність account/zone mixing.
- Production promotion виконується лише після повного VERIFIED staging acceptance; інакше staging та evidence зберігаються без promotion.

### Результат

- PR #16 і PR #11 merged normal; cumulative immutable v58 та один owner-only staging deployment створені й збережені.
- Local release/full gates і GitHub checks пройшли, але staging acceptance не пройшов через GT-028; production promotion і cleanup не виконані.
- Follow-up REQ-0029 встановив stale automatic thread-route root cause і опублікував source recovery у draft PR #20; code-level release потребує окремого наступного immutable-дозволу.
- Одноразове повноваження P-008 позначено `consumed` commit `be41ce6`; production лишається exact v57, immutable v58 не переписано.

<!-- lang:en -->
## English

### Normalized request

- The owner explicitly authorized normal merge of PR #16, creation of the next cumulative immutable staging candidate within Versie 1, and integration of PR #11.
- Related branch updates, commits, normal pushes, required checks, release preflight, and staging acceptance are authorized.
- Production promotion is authorized only after complete successful staging acceptance, exact readback, and rollback readiness to production v57.

### Boundaries

- Versie 2 is not authorized; the active product remains Versie 1.
- Force-push, rebasing published history, history rewrite, and bypassing branch protection or required checks are forbidden.
- Immutable candidates are never rewritten; a code-level fix requires the next immutable Apps Script version.
- Do not repeat OAuth or mutate arbitrary Gmail records; stop at CAPTCHA, OTP/2FA, passkey, new Google consent, or ambiguous account/zone targeting.
- Production promotion is forbidden while any staging gate is PARTIAL, UNVERIFIED, CONFLICTING, BLOCKED, or failed.

### Completion criteria

- REQ-0028 and a narrow release authority are published and validated.
- PR #16 and PR #11 are merged through normal merge commits after green checks.
- Cumulative main passes targeted, full-suite, documentation, release-contract, and privacy gates.
- The next immutable candidate is created and deployed only to staging with exact-v57 rollback readiness.
- Staging acceptance covers Telegram bootstrap, avatar, account roots/switching, mailbox, Gmail label create/rename/delete/system protection, adapter flag boundary, duplicate suppression, and absence of account/zone mixing.
- Production promotion occurs only after fully VERIFIED staging acceptance; otherwise staging and evidence are preserved without promotion.

### Result

- PR #16 and PR #11 were merged normally; cumulative immutable v58 and one owner-only staging deployment were created and preserved.
- Local release/full gates and GitHub checks passed, but staging acceptance did not pass because of GT-028; production promotion and cleanup were not run.
- Follow-up REQ-0029 established the stale automatic thread-route root cause and published source recovery in draft PR #20; a code-level release requires separate next-immutable authority.
- Single-cycle authority P-008 is marked `consumed` in commit `be41ce6`; production remains exact v57 and immutable v58 was not rewritten.
