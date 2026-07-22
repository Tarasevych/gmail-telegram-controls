# VR-010 — Cumulative release attempt v62 і exact rollback

[Індекс verification](../../INDEX.md) | [Release evidence](../../../reports/VERSIE_001_V62_RELEASE_ATTEMPT_AND_ROLLBACK_2026-07-22.md) | [English](../../../../en/verification-reports/reports/VR-010/README.md)

- **Дата:** 2026-07-22
- **Source request:** `REQ-0033`
- **Verification framework:** `REQ-0004`
- **Target commit:** `42dfbd76d1e904fe065094010f61418da8896978`
- **Загальний статус:** `BLOCKED`
- **Чутливість:** sanitized; без email content, addresses, tokens, init data, deployment IDs, cookies або secret properties

## Атомарні твердження

| Твердження | Категорія | Статус | Доказ / залежність |
|---|---|---|---|
| GitHub `main` і private GitLab mirror вказували на однаковий target commit до closure | release | VERIFIED | authenticated Git readback |
| Cumulative product/release suite пройшов 494/494, bridge tests 3/3 | tests | VERIFIED | локальні command outputs до release |
| Immutable v62 був exact, owner-only staging пройшов mailbox, profile, три roots, shared view і account switching | staging | VERIFIED | release helper readback і signed Telegram Desktop acceptance |
| Per-account list v62 лишався scoped до requested connection | multi-account | VERIFIED | controlled secondary-account staging і production UI readback |
| Два свіжі production v62 launches завантажили usable mailbox | production UI | VERIFIED | signed Telegram Desktop launches |
| Owner self-copy control не створив card, а два `/check` не створили duplicate | dedupe | VERIFIED | expected SENT exclusion і Telegram readback |
| External automatic INBOX delivery після v62 працював | delivery | UNVERIFIED | self-copy control навмисно ineligible і не доводить inbound delivery |
| Post-v62 worker execution не перевищував 150-second slot і не overlap | runtime | BLOCKED | Apps Script process API повернув 403; `clasp logs` не мав configured project identity |
| v62 зберіг той самий worker code, що й line, пов'язаний із GT-030 | provenance | VERIFIED | exact source hash comparison |
| v62 спричинив нову runtime regression | root cause | UNVERIFIED | candidate-specific execution trace відсутній |
| Exact rollback v62 -> v57 відновив stable/HEAD v57, staging 0, journal `rolled_back` | rollback | VERIFIED | release helper output і post-rollback preflight |
| Два свіжі production v57 launches завантажили mailbox без network error | rollback acceptance | VERIFIED | signed Telegram Desktop readback |

## Висновок

Client candidate v62 є цінним історичним доказом, його UI/account-isolation acceptance пройшов. Він не є прийнятим production release, бо inherited GT-030 runtime gate не вдалося перевірити. Exact production v57 відновлено без OAuth, migration, Gmail mutation або secret access. Наступний immutable дозволений лише після causal worker fix і content-free execution evidence.

Shared machine-readable registry лишається на VR-003, оскільки пізніші narrative reports не змінюють validator contract.
