# REQ-0016: authorize Versie 1 release acceptance, production promotion, and merge

- ID: REQ-0016
- Received: 2026-07-21
- Status: in_progress
- Active Versie: Versie 1
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=no-change; release=update
- Permission basis: explicit

<!-- lang:uk -->
## Українською

Власник явно надав дозвіл продовжити раніше заблоковані E4/E5, deployment і merge для найновішої поточної `Versie 1`. Єдиним допустимим source commit є `ae8fa827784296062c1f5cfe65334824d0fcb2c2`; нова номерна Versie не створюється.

Дозволена послідовність: повторний `PreflightOnly`, створення immutable/staging deployment з exact candidate bundle, контрольоване E4/E5 acceptance без змішування Gmail-акаунтів або Telegram-зон, promotion того самого immutable candidate у production і normal-history merge PR `#1` у `main`. Кожний наступний крок виконується лише після успішного попереднього gate.

Заборонено змінювати випадкові листи, підмінювати candidate старішою версією, створювати паралельний release, робити force/reset/rebase/amend або проходити OTP, CAPTCHA чи нову Google consent-згоду без зупинки. Для acceptance допускається лише явно маркована синтетична перевірка в одній підтвердженій Gmail/Telegram зоні.

<!-- lang:en -->
## English

The owner explicitly authorized continuation of the previously blocked E4/E5, deployment, and merge work for the latest current `Versie 1`. The only allowed source commit is `ae8fa827784296062c1f5cfe65334824d0fcb2c2`; no new numbered Versie is created.

The authorized sequence is: rerun `PreflightOnly`, create an immutable/staging deployment from the exact candidate bundle, perform controlled E4/E5 acceptance without mixing Gmail accounts or Telegram zones, promote that same immutable candidate to production, and merge PR `#1` into `main` with normal history. Each later action requires the preceding gate to pass.

Random mail mutation, replacing the candidate with an older version, creating a parallel release, force/reset/rebase/amend, or passing OTP, CAPTCHA, or new Google consent without stopping is prohibited. Acceptance may use only an explicitly marked synthetic check in one verified Gmail/Telegram zone.

## Routing

- `Запити`: this authorization and atomic completion evidence.
- `Інструкції`: reference the current execution order and release gates; no standing-rule change.
- `Повноваження`: use only P-006 and the explicit one-time owner authorization; no authority expansion.
- Product/plan: update only evidence and statuses required by verified release results.
- Runtime/release: authorized only for the exact current Versie 1 candidate and gated rollback.

## Completion gates

- Request-ledger and bilingual checks pass before runtime work.
- Product and request worktrees are clean, remote-aligned, and contain no unrelated changes.
- `PreflightOnly` passes against the exact candidate hash at product commit `ae8fa827784296062c1f5cfe65334824d0fcb2c2`.
- `StageOnly` creates an immutable candidate and isolated staging deployment without changing production.
- E4 proves one controlled account/zone path and exactly-once Gmail-to-Telegram delivery; E5 proves the promoted production surface and required bot elements.
- Any OTP, CAPTCHA, new Google consent, unresolved account/zone identity, or material manual choice is a hard stop.
- Promotion uses the exact accepted immutable candidate; rollback is used if post-promotion verification fails.
- PR `#1` is merged only after E4/E5 and production verification pass; post-merge Actions and exact `main` state are verified.
- Evidence is recorded bilingually; temporary processes and staging artifacts are cleaned up.

## Initial evidence

- Owner authorization: direct annotation “даю дозвіл” on the stated merge/deployment gate.
- Product HEAD: `ae8fa827784296062c1f5cfe65334824d0fcb2c2`.
- PR `#1`: `OPEN`, `CLEAN`, `MERGEABLE`, all current checks successful.
- Existing local proof: Gmail/Telegram tests 148/148, release tests 3/3, bilingual product pages 44/44.
- Runtime state remains unchanged pending this record and its checks.
