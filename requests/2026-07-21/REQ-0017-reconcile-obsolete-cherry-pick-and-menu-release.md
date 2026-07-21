# REQ-0017: reconcile obsolete cherry-pick state and continue the Versie 1 menu release

- ID: REQ-0017
- Received: 2026-07-21
- Status: completed
- Active Versie: Versie 1
- Next Versie authorization: no
- Routes: requests=record; instructions=reference; permissions=reference; plan=update; product=update; release=update
- Permission basis: explicit

<!-- lang:uk -->
## Українською

Власник уточнив, що незавершені зміни у publish-worktree походять із попередньої агентської роботи, і наказав перевірити їхню сумісність, не втратити корисні напрацювання, усунути застарілий conflict state, опублікувати факти у відповідних GitHub-розділах та продовжити поточний release/menu flow.

Фактична перевірка встановила: worktree `gmail-telegram-main-publish` зупинений у cherry-pick commit `f96d8f083ec548105a8eb5a153ac8acb8dade8ff` (`fix(versie-1): make Google account flow chat-native`). Цей exact commit уже є ancestor актуального product commit `ae8fa827784296062c1f5cfe65334824d0fcb2c2` і присутній у `origin/codex/versie-001-2026-07-19`. Тому staged зміни та `DU apps-script/tests/mail_actions.test.js` є застарілим повторним застосуванням уже інтегрованого commit, а не унікальною незбереженою роботою.

Дозволено завершити cleanup через штатний `git cherry-pick --abort` лише після збереження цієї доказової прив'язки, не використовуючи reset/force/rebase і не змінюючи сам commit `f96d8f0`. Після чистого readback дозволено створити ізольовану bridge branch від exact `origin/main`, оновити один staging backend URL на immutable `v55`, пройти E4/E5 та запровадити актуальний bot menu/App flow. Нові code fixes додаються лише до поточної `Versie 1`, ніколи до старої паралельної версії.

<!-- lang:en -->
## English

The owner clarified that the unfinished publish-worktree changes came from earlier agent work and ordered a compatibility review, preservation of useful work, removal of obsolete conflict state, publication of the facts in the appropriate GitHub sections, and continuation of the current release/menu flow.

Factual verification established that `gmail-telegram-main-publish` is stopped while cherry-picking commit `f96d8f083ec548105a8eb5a153ac8acb8dade8ff` (`fix(versie-1): make Google account flow chat-native`). That exact commit is already an ancestor of current product commit `ae8fa827784296062c1f5cfe65334824d0fcb2c2` and is present on `origin/codex/versie-001-2026-07-19`. The staged changes and `DU apps-script/tests/mail_actions.test.js` are therefore an obsolete replay of an already integrated commit, not unique unpreserved work.

Cleanup through the standard `git cherry-pick --abort` is authorized only after preserving this evidence mapping, without reset/force/rebase and without changing commit `f96d8f0` itself. After a clean readback, an isolated bridge branch may be created from exact `origin/main`, one staging backend URL may be updated to immutable `v55`, E4/E5 may continue, and the current bot menu/App flow may be deployed. Any new code fix belongs only to the current `Versie 1`, never to an older parallel version.

## Routing

- `Запити`: owner clarification, conflict classification, cleanup authorization, and completion evidence.
- `Інструкції`: reference execution order and release gates; no standing-rule change.
- `Повноваження`: use P-006 plus this explicit cleanup/release authorization; no expansion.
- Product/plan: record obsolete/replaced work and any verified current fix in paired UK/EN documentation.
- Runtime/release: continue exact immutable `v55` staging, owner-scoped menu acceptance, production promotion, cleanup, and merge only after gates pass.

## Completion gates

- Request ledger and bilingual checks pass before conflict cleanup.
- Commit `f96d8f0` remains reachable locally and on the remote current product branch.
- Aborting the obsolete cherry-pick returns the publish-worktree to exact `origin/main` with a clean index and no lost unique diff.
- The bridge change is one-file, normal-history, reviewable, and points only to immutable `v55`.
- E4 proves the staging App/menu path and controlled account-zone isolation; E5 proves production and the required current commands/App entry.
- No random email mutation, Gmail/Telegram zone mixing, OTP, CAPTCHA, or new Google consent is performed.
- Replaced or obsolete options are documented rather than silently deleted from project history.
- All durable changes are committed, pushed, checked, and linked to evidence before merge.

## Initial evidence

- In-progress operation: `CHERRY_PICK_HEAD=f96d8f083ec548105a8eb5a153ac8acb8dade8ff`.
- Conflict: `DU apps-script/tests/mail_actions.test.js`; ten other paths staged from the same commit.
- Ancestry: `f96d8f0` is an ancestor of `ae8fa827`; the active local and remote product branches contain it.
- Current release state: production `v50`; immutable/staging `v55`; staging journal `staging_verified`; production not promoted.
- Current bot menu readback: owner-scoped `type=commands`; staging App entry still requires the exact bridge update.

## Reconciliation result / Результат узгодження — 2026-07-21

### Українською

- Старий detached worktree містив незавершений cherry-pick коміту, який уже був предком актуальної продуктової лінії; операцію безпечно скасовано без reset/rebase і без втрати унікальних змін.
- Конфлікт bridge deletion проти перевіреної bridge modification вирішено на користь актуального GitHub Pages bridge з `main`; застаріле видалення не переносилося.
- Тимчасовий command-menu замінено production Web App menu після E4/E5; rollback immutable v50 збережено, stable працює на v55.
- Відкриті спостереження маршрутизовано окремо: cold-start skeleton та відсутній підтверджений GCP project ID для `clasp logs`.

### English

- The old detached worktree held an unfinished cherry-pick of a commit already ancestral to the current product line; it was safely aborted without reset/rebase and without losing unique work.
- The bridge deletion versus verified bridge modification conflict kept the current GitHub Pages bridge from `main`; the obsolete deletion was not carried forward.
- The temporary command menu was replaced by the production Web App menu after E4/E5; immutable rollback v50 remains and stable runs v55.
- Open observations were routed separately: cold-start skeleton and the missing verified GCP project ID for `clasp logs`.
