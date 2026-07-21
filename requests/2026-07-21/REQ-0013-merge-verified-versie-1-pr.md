# REQ-0013: merge the verified Versie 1 pull request

Date: `2026-07-21`
Status: `recorded`
Active product: `Versie 1`
Next Versie authorization: `no`

## Українською

Власник наказав продовжити з останньої перевіреної межі. Наступний безпечний крок: злити перевірений PR `#1` у `main`, не змінюючи його вже підтверджений tree, а потім перевірити exact merge commit, GitHub Actions, remote state і чистоту worktree.

Цей запит не дозволяє створення наступної Versie, Apps Script immutable/staging deployment, production promotion, Gmail mutation, OAuth consent або Telegram production acceptance.

## English

The owner ordered continuation from the last verified boundary. The next safe action is to merge verified PR `#1` into `main` without changing its already validated tree, then verify the exact merge commit, GitHub Actions, remote state, and worktree cleanliness.

This request does not authorize the next Versie, an Apps Script immutable/staging deployment, production promotion, Gmail mutation, OAuth consent, or Telegram production acceptance.

## Routing

- `Запити`: this request and completion evidence.
- `Інструкції`: read the current instruction index before merge; no standing-rule change requested.
- `Повноваження`: use only the existing relevant autonomous Git/GitHub authority; no permission expansion requested.
- Product branch: no source edit unless merge verification exposes a reproducible defect.
- Runtime/release: out of scope.

## Completion gates

- PR `#1` is still open, clean, mergeable, and green immediately before merge.
- Merge uses normal GitHub history without force, rebase, reset, or amendment.
- `main` resolves to the resulting exact commit and contains the verified Versie 1 tree.
- Required post-merge GitHub Actions succeed.
- Product and request worktrees remain clean; completion evidence is pushed to `Запити`.
