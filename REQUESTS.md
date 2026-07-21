# Журнал запитів / Request ledger

<!-- lang:uk -->
## Українською

Гілка `Запити` є єдиним канонічним журналом проєктних звернень власника. Кожне звернення фіксується до виконання як очищена інтерпретація, ділиться на логічні частини та отримує явні маршрути. `Інструкції` і `Повноваження` не зберігають копії журналу: вони містять лише похідні нормативні записи з посиланням на `REQ-ID`.

| ID | Дата | Статус | Коротка тема | Запис |
|---|---|---|---|---|
<!-- request-index -->
| REQ-0001 | 2026-07-19 | superseded | Початковий спільний журнал та gate Versie | [record](requests/2026-07-19/REQ-0001-instruction-ledger-and-version-gate.md) |
| REQ-0002 | 2026-07-19 | completed | Відокремлений журнал і контекстна маршрутизація | [record](requests/2026-07-19/REQ-0002-separated-ledger-and-context-routing.md) |
| REQ-0003 | 2026-07-19 | completed | Маршрутизація трьох deep-research reports у knowledge hub | [record](requests/2026-07-19/REQ-0003-deep-research-knowledge-hub.md) |
| REQ-0004 | 2026-07-19 | completed | Незалежні двомовні factual verification reports | [record](requests/2026-07-19/REQ-0004-independent-factual-verification-reports.md) |
| REQ-0005 | 2026-07-19 | completed | Приватний Onderzoeksarchief двох історій task | [record](requests/2026-07-19/REQ-0005-private-chat-research-archive.md) |
| REQ-0006 | 2026-07-19 | completed | Межі повного confidential transcript archive | [record](requests/2026-07-19/REQ-0006-confidential-transcript-boundaries.md) |
| REQ-0007 | 2026-07-19 | completed | Owner-only доступ і межа внутрішніх Codex-даних | [record](requests/2026-07-19/REQ-0007-owner-only-archive-access.md) |
| REQ-0008 | 2026-07-20 | in_progress | Versie 1 multi-account OAuth return і one-click switch | [record](requests/2026-07-20/REQ-0008-versie-1-multi-account-oauth-return.md) |
| REQ-0009 | 2026-07-20 | recorded | Versie 1 multi-account Gmail delivery і account-scoped feeds | [record](requests/2026-07-20/REQ-0009-versie-1-multi-account-mail-delivery.md) |
| REQ-0010 | 2026-07-21 | recorded | Versie 1 postmortem, lessons learned і GitHub publication diagnosis | [record](requests/2026-07-21/REQ-0010-versie-1-postmortem-lessons.md) |

<!-- lang:en -->
## English

The `Запити` branch is the single canonical ledger of owner project requests. Each request is recorded before execution as a sanitized interpretation, split into logical parts, and assigned explicit routes. `Інструкції` and `Повноваження` do not keep ledger copies; they contain only derived normative records linked to the originating `REQ-ID`.

The table above is the canonical machine-checked index. Every record is internally bilingual.

## REQ-0011 | 2026-07-21

- Українською: автономне продовження, журналювання та recovery-повноваження в межах безпеки.
- English: autonomous continuation, logging, and recovery authority within safety boundaries.
- Record: [REQ-0011](requests/2026-07-21/REQ-0011-autonomous-continuation-permissions.md)
- Status: `recorded`

## REQ-0010 completion | 2026-07-21

- Status: `completed`
- Evidence: product `c98e69e`, instructions `80d79ab`, GitHub Actions `29810786984`, `29810787010`, `29810787006`.
- Boundary: v55 runtime candidate remains separate and unverified.

## REQ-0011 completion | 2026-07-21

- Status: `completed`
- Evidence: requests `bcd2509`, permissions `9653434`, instructions `976cba0`, resumed product evidence `c98e69e`.
- Boundary: no next Versie or release authorization.

## REQ-0009 v55 update | 2026-07-21

- Status: `partial`.
- Evidence: code `b5a5452`; docs `4ff66ca`; `432/432`; PreflightOnly passed; three GitHub Actions passed.
- Remaining: authorized staging/deployment and controlled live one-card acceptance.

## REQ-0012 | 2026-07-21

- Українською: повна двокорпусна доказова реконструкція knowledge base з coverage manifest і evidence ledger.
- English: full two-corpus evidence-backed knowledge-base reconstruction with coverage manifest and evidence ledger.
- Record: [REQ-0012](requests/2026-07-21/REQ-0012-full-two-corpus-knowledge-base.md)
- Status: `completed`
- Next Versie authorization: `no`
- Evidence: product HEAD `df493b7`; VR-003 32 claims; 167,176 source lines with zero coverage gaps; three GitHub Actions passed; PR [#1](https://github.com/Tarasevych/gmail-telegram-controls/pull/1) is clean and mergeable.
- Boundary: no v55 deployment, production promotion, OAuth/Telegram acceptance, or next Versie.

## REQ-0013 | 2026-07-21

- Українською: merge перевіреного Versie 1 PR `#1` у `main` із post-merge verification.
- English: merge verified Versie 1 PR `#1` into `main` with post-merge verification.
- Record: [REQ-0013](requests/2026-07-21/REQ-0013-merge-verified-versie-1-pr.md)
- Status: `blocked`
- Next Versie authorization: `no`
- Boundary: no Apps Script deployment, production promotion, OAuth/Telegram acceptance, or next Versie.
- Blocker: `main` merge requires completed E4/E5 acceptance and an explicit release decision; v55 currently has E3 evidence only.
- Required authorization: Versie 1 v55 immutable/staging candidate plus controlled E4/E5 acceptance; production promotion and `main` merge remain separate.

## REQ-0014 | 2026-07-21

- Українською: виправити невдалий GitHub Actions `Request ledger` шляхом schema-only нормалізації REQ-0009–REQ-0013.
- English: repair failed GitHub Actions `Request ledger` through schema-only normalization of REQ-0009 through REQ-0013.
- Record: [REQ-0014](requests/2026-07-21/REQ-0014-repair-request-ledger-ci.md)
- Status: `completed`
- Next Versie authorization: `no`
- Boundary: request metadata only; no instruction, permission, product, runtime, release, or main change.
- Evidence: schema fix `42d341e`; Request ledger run [29831638800](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29831638800) and bilingual run [29831638784](https://github.com/Tarasevych/gmail-telegram-controls/actions/runs/29831638784) succeeded.

## REQ-0015 | 2026-07-21

- Українською: виправити й тестами довести function-local concurrency contract для OAuth token refresh (`GT-010`).
- English: repair and test the function-local OAuth token-refresh concurrency contract (`GT-010`).
- Record: [REQ-0015](requests/2026-07-21/REQ-0015-oauth-refresh-lock.md)
- Status: `recorded`
- Next Versie authorization: `no`
- Boundary: local code/tests/docs only; no OAuth, mailbox, deployment, production, main, or release change.

## REQ-0016 | 2026-07-21

- Українською: дозвіл на gated E4/E5, deployment, production promotion і merge поточної `Versie 1`.
- English: authorization for gated E4/E5, deployment, production promotion, and merge of the current `Versie 1`.
- Record: [REQ-0016](requests/2026-07-21/REQ-0016-authorize-versie-1-release-and-merge.md)
- Status: `completed`
- Next Versie authorization: `no`
- Source commit: `ae8fa827784296062c1f5cfe65334824d0fcb2c2`
- Boundary: exact-candidate gated release only; stop at OTP, CAPTCHA, new Google consent, unresolved account/zone identity, or a material manual choice.

## REQ-0017 | 2026-07-21

- Українською: звірити й без втрати прибрати застарілий cherry-pick conflict, задокументувати замінені напрацювання та продовжити menu/App release поточної `Versie 1`.
- English: reconcile and safely remove an obsolete cherry-pick conflict, document replaced work, and continue the current `Versie 1` menu/App release.
- Record: [REQ-0017](requests/2026-07-21/REQ-0017-reconcile-obsolete-cherry-pick-and-menu-release.md)
- Status: `completed`
- Next Versie authorization: `no`
- Preserved source: `f96d8f083ec548105a8eb5a153ac8acb8dade8ff`, already contained by current product commit `ae8fa827784296062c1f5cfe65334824d0fcb2c2`.
- Boundary: no destructive history rewrite, parallel version, arbitrary mailbox mutation, zone mixing, OTP, CAPTCHA, or new Google consent.

## REQ-0018 | 2026-07-21

- Українською: продовжити `Versie 1` з останньої перевіреної production v55 точки: відновити observability, перевірити fresh OAuth і незалежний second-account fan-out, не повторюючи release.
- English: continue `Versie 1` from the last verified production v55 point: restore observability, verify fresh OAuth and independent second-account fan-out, without repeating the release.
- Record: [REQ-0018](requests/2026-07-21/REQ-0018-versie-1-observability-oauth-fanout.md)
- Status: `in_progress`
- Next Versie authorization: `no`
- Boundary: no new Versie, rollback, repeated deployment, arbitrary mailbox mutation, account/zone mixing, guessed cloud project identity, CAPTCHA, OTP/2FA, passkey/biometric/hardware key, payment, or unavoidable physical action.

## REQ-0019 | 2026-07-21

- Українською: безпечно продовжити `Versie 1` після exact rollback з immutable v56 на stable v55, встановити спільну причину network/bootstrap failure і виконати контрольований A/B gate до будь-якого повторного promotion.
- English: safely continue `Versie 1` after the exact rollback from immutable v56 to stable v55, establish the shared network/bootstrap failure cause, and run a controlled A/B gate before any renewed promotion.
- Record: [REQ-0019](requests/2026-07-21/REQ-0019-versie-1-shared-bootstrap-ab-recovery.md)
- Status: `blocked`
- Next Versie authorization: `no`
- Boundary: preserve immutable v56 and exact v55 rollback; no repeated OAuth, arbitrary mailbox mutation, account/zone mixing, secret publication, safety-control bypass, CAPTCHA, OTP/2FA, passkey/biometric/hardware key, payment, or unavoidable physical action.

## REQ-0020 | 2026-07-21

- Українською: встановити fail-closed stabilization process, заморозити вже перевірені блоки, зберегти фактичний поточний стан, ізолювати діагностику та визначити одну-дві першопричини без змін коду.
- English: establish a fail-closed stabilization process, freeze already verified blocks, preserve the factual current state, isolate diagnostics, and identify one or two root causes without code changes.
- Record: [REQ-0020](requests/2026-07-21/REQ-0020-stabilization-root-cause-audit.md)
- Status: `completed`
- Next Versie authorization: `no`
- Boundary: no code, production, deployment, trigger, OAuth, Gmail, Telegram-zone, history-rewrite, force-push, or unrelated-worktree changes; checkpoint only factual dirty state and update only audit/governance/status evidence.

## REQ-0021 | 2026-07-21

- Українською: Gmail primary-source gate, CI validator hardening і factual межа для Google Developer Program Profile.
- English: Gmail primary-source gate, CI validator hardening, and the factual Google Developer Program Profile boundary.
- Record: [REQ-0021](requests/2026-07-21/REQ-0021-gmail-primary-source-ci-hardening-dual-publication.md)
- Status: `completed`
- Next Versie authorization: `no`
- Evidence: primary-source/publishing policy, validator hardening, 444/444 baseline, paired compatibility report, green GitHub checks, and GitHub/GitLab `main` parity at `660bc6a...`.
- Boundary: Google Developer Program Profile is not a repository mirror; no profile, release, OAuth, Gmail, Telegram-zone, or runtime mutation was performed.

## REQ-0022 | 2026-07-21

- Українською: дозволити за практичної потреби синхронізований приватний GitLab mirror без створення другої source-of-truth або паралельної Versie.
- English: authorize a synchronized private GitLab mirror when practically useful, without creating a second source of truth or a parallel Versie.
- Record: [REQ-0022](requests/2026-07-21/REQ-0022-private-gitlab-mirror-authority.md)
- Status: `completed`
- Next Versie authorization: `no`
- Boundary: GitHub remains canonical; ordinary non-force verified-ref pushes only; no secrets, OAuth/session data, mailbox content, production promotion, new Versie, or history rewrite.
- Evidence: private GitLab mirror, anonymous API `404`, and exact hash parity for `main`, `Запити`, `Інструкції`, and `Повноваження`.

## REQ-0023 | 2026-07-21

- Українською: повторно дозволити практичне використання вже створеного приватного GitLab mirror у чинних межах `P-007`.
- English: reaffirm practical use of the existing private GitLab mirror within the current `P-007` boundary.
- Record: [REQ-0023](requests/2026-07-21/REQ-0023-reaffirm-optional-private-gitlab-mirror.md)
- Status: `completed`
- Next Versie authorization: `no`
- Boundary: no new authority, product/release mutation, history rewrite, secrets, OAuth/session data, mailbox content, or Telegram-zone change.
- Evidence: ordinary non-force mirror sync completed; exact four-ref hash comparison passed and anonymous GitLab API returned `404`.

## REQ-0024 | 2026-07-21

- Українською: розробити feature-flagged owner-only Advanced Gmail read adapter без зміни external connection transport або live runtime.
- English: develop a feature-flagged owner-only Advanced Gmail read adapter without changing external-connection transport or live runtime.
- Record: [REQ-0024](requests/2026-07-21/REQ-0024-owner-only-advanced-gmail-read-adapter.md)
- Status: `blocked`
- Next Versie authorization: `no`
- Boundary: source/tests/docs only; no flag activation, immutable release, deployment, production promotion, OAuth, Gmail mutation, trigger change, account/zone mixing, or secret publication.
- Evidence: adapter `8/8`; full suite `451/452` with only the exact immutable v57 hash gate failing; source commit `0b0c361`, draft PR #11, green documentation/report Actions, and exact private GitLab branch parity. Merge/release requires separate next-immutable authority; live A/B requires quota recovery.

## REQ-0025 | 2026-07-21

- Українською: завершити незалежну autonomous night work парним factual morning/crash report і recovery checkpoint `complete_with_blockers`.
- English: complete the independent autonomous night work with paired factual morning/crash reports and a `complete_with_blockers` recovery checkpoint.
- Record: [REQ-0025](requests/2026-07-21/REQ-0025-autonomous-night-completion-report.md)
- Status: `completed`
- Next Versie authorization: `no`
- Boundary: documentation/recovery evidence only; no source-candidate merge, immutable, release-helper, feature-flag, deployment, trigger, OAuth, Gmail, Telegram-menu, or account/zone mutation.
- Evidence: paired report PR #12 and factual correction PR #13 merged normally; final `main=e838180cde18e8d7f5441bec54b30a170bd2e005`; all main workflows and final read-only preflight passed; GitHub/GitLab parity and `complete_with_blockers` checkpoint confirmed.
