# REQ-0014: repair Request ledger CI / Виправлення CI реєстру запитів

- ID: REQ-0014
- Received: 2026-07-21
- Status: recorded
- Active Versie: Versie 1
- Next Versie authorization: no
- Routes: requests=record; instructions=no-change; permissions=reference; plan=no-change; product=no-change; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

Власник повідомив про email-сповіщення щодо невдалого GitHub Actions workflow `Request ledger` на commit `ccab14a` і наказав установити причину та виправити її.

Read-only GitHub log підтвердив, що bilingual workflow успішний, а request-ledger validator відхиляє REQ-0009–REQ-0013 через відсутні або нестандартні machine-readable metadata, routes, permission basis та language markers. Виправлення має нормалізувати лише schema metadata без зміни історичних рішень, scope або повноважень.

## Критерії завершення

- REQ-0009–REQ-0013 відповідають чинній схемі `tools/check_request_ledger.py`.
- REQ-0014 зареєстровано у правильній схемі та внесено до `REQUESTS.md`.
- Local request-ledger і bilingual checks проходять.
- Privacy та `git diff --check` проходять.
- Commit pushed до `Запити`; exact GitHub Actions run на новому HEAD успішний.

<!-- lang:en -->
## English

The owner reported an email notification for a failed GitHub Actions `Request ledger` workflow on commit `ccab14a` and ordered diagnosis and repair.

Read-only GitHub logs confirmed that the bilingual workflow succeeds while the request-ledger validator rejects REQ-0009 through REQ-0013 for missing or nonstandard machine-readable metadata, routes, permission basis, and language markers. The fix must normalize schema metadata only, without changing historical decisions, scope, or authority.

## Completion criteria

- REQ-0009 through REQ-0013 conform to the current `tools/check_request_ledger.py` schema.
- REQ-0014 is recorded with the correct schema and indexed in `REQUESTS.md`.
- Local request-ledger and bilingual checks pass.
- Privacy and `git diff --check` pass.
- The commit is pushed to `Запити`, and the exact GitHub Actions run on the new HEAD succeeds.
