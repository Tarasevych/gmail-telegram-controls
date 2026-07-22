# Versie 1: release attempt v62 і exact rollback

[Поточний стан](../CURRENT_STATE.md) | [VR-010](../verification-reports/reports/VR-010/README.md) | [English](../../en/reports/VERSIE_001_V62_RELEASE_ATTEMPT_AND_ROLLBACK_2026-07-22.md)

- **Дата:** 2026-07-22
- **Source request:** `REQ-0033`
- **Загальний статус:** `BLOCKED`
- **Production після closure:** immutable v57
- **Історичний candidate:** immutable v62
- **Staging deployments:** 0

## Реалізований candidate

v62 cumulative містив Versie 1 P0 client work, dynamic active/shared account context, unified Gmail-label UI, stale-route recovery, bounded account-scoped cache, draft recovery checkpoints, version-aware client activation та exact per-account list request isolation. PR #29 і PR #30 злиті normal merge; GitHub і private GitLab mirror досягли `42dfbd76d1e904fe065094010f61418da8896978`.

## Перевірені докази

- Product/release suite: `494/494`; bridge suite: `3/3`; required GitHub checks пройшли.
- Immutable v62 і його source hashes прочитано назад точно; під час acceptance існував лише один guarded staging deployment.
- Owner-only staging завантажив mailbox, profile image, три isolated Gmail roots і shared view; switching на controlled secondary account і назад не потребував OAuth. Visible list лишався scoped до requested account.
- Два свіжі production v62 launches завантажили mailbox після promotion.
- Один дозволений owner self-copy не створив Telegram card через SENT exclusion; два `/check` не створили дубль. Це доводить suppression/dedupe boundary, але не external automatic INBOX delivery.
- Exact rollback output повідомив v62 -> v57. Post-rollback preflight: stable v57, HEAD `stable_v57`, immutable v62 ready, staging 0, journal `rolled_back`.
- Два свіжі production v57 launches завантажили mailbox без network error.

## Заблоковані докази

Обов'язковий post-v62 Apps Script execution trace не отримано. Official process endpoint повернув 403, а `clasp logs` зупинився через відсутній GCP project ID. Міграцію Apps Script-managed default project лише заради logs відхилено, бо вона могла відкликати чинні authorizations. Новий OAuth consent не запускався.

Тому GT-030 лишається відкритим: v62 зберіг той самий worker code, що й candidate-line з раніше зафіксованим execution 214.96 секунди та overlap execution window. Source identity VERIFIED; v62-specific runtime regression не доведено. Без content-free phase/slot trace 150-second/no-overlap release gate лишається `UNVERIFIED`.

## Безпечний terminal state

Production є exact immutable v57, staging 0, Telegram menu веде на production, immutable v62 збережено для історичного порівняння. v62 не можна змінювати або повторно просувати. Майбутній immutable потребує causal fix GT-030 і нового execution evidence; звичайні mail changes не виправдовують release toggling.

Під час closure не змінено випадковий email, Gmail label, draft, OAuth record, token, secret property або account-zone mapping.
