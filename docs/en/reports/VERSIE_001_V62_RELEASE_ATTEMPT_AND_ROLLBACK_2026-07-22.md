# Versie 1 v62 release attempt and exact rollback

[Current state](../CURRENT_STATE.md) | [VR-010](../verification-reports/reports/VR-010/README.md) | [Українська](../../uk/reports/VERSIE_001_V62_RELEASE_ATTEMPT_AND_ROLLBACK_2026-07-22.md)

- **Date:** 2026-07-22
- **Source request:** `REQ-0033`
- **Overall status:** `BLOCKED`
- **Production after closure:** immutable v57
- **Historical candidate:** immutable v62
- **Staging deployments:** 0

## Implemented candidate

v62 cumulatively contained the Versie 1 P0 client work, dynamic active/shared account context, unified Gmail-label UI, stale-route recovery, bounded account-scoped cache, draft recovery checkpointing, version-aware client activation, and exact per-account list request isolation. PR #29 and PR #30 merged normally; GitHub and the private GitLab mirror reached `42dfbd76d1e904fe065094010f61418da8896978`.

## Verified evidence

- Product/release suite: `494/494`; bridge suite: `3/3`; required GitHub checks passed.
- Immutable v62 and its source hashes were read back exactly; only one guarded staging deployment existed during acceptance.
- Owner-only staging loaded the mailbox, profile image, three isolated Gmail roots and shared view; switching to the controlled secondary account and back required no OAuth. The visible list remained scoped to the requested account.
- Two fresh production v62 launches loaded the mailbox after promotion.
- One authorized owner self-copy produced no Telegram card under the SENT exclusion; two `/check` runs produced no duplicate. This proves the suppression/dedupe boundary, not external automatic INBOX delivery.
- Exact rollback output reported v62 -> v57. Post-rollback preflight reported stable v57, HEAD `stable_v57`, immutable v62 ready, staging 0 and journal `rolled_back`.
- Two fresh production v57 launches loaded the mailbox without network error.

## Blocked evidence

The required post-v62 Apps Script execution trace was not obtained. The official process endpoint returned 403, and `clasp logs` stopped because no GCP project ID was configured. Migrating the Apps Script-managed default project solely for logs was rejected because it could revoke current authorizations. No new OAuth consent was started.

GT-030 therefore remains open: v62 retained the same worker code as the candidate line that previously produced a 214.96-second execution and an overlapping execution window. That source identity is verified; a v62-specific runtime regression is not proven. Without a content-free phase/slot trace, the 150-second/no-overlap release gate remains `UNVERIFIED`.

## Safe terminal state

Production is exact immutable v57, staging is 0, the Telegram menu targets production, and immutable v62 is preserved for historical comparison. v62 must not be modified or promoted again. A future immutable requires a causal GT-030 fix and fresh execution evidence; ordinary mail changes do not justify release toggling.

No arbitrary email, Gmail label, draft, OAuth record, token, secret property, or account-zone mapping was changed during closure.
