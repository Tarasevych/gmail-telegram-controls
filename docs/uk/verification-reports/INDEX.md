# Індекс verification reports

[Головна](README.md) | [Схема](REPORT_SCHEMA.md) | [Політика доказів](EVIDENCE_POLICY.md) | [English](../../en/verification-reports/INDEX.md)

Source request: `REQ-0004`.

| Report | Дата | Ціль | Покриття | Результат |
|---|---|---|---:|---|
| [VR-001](reports/VR-001/README.md) | 2026-07-19 | `2b3b9e2f678f` | 245/245 | `verified` 17, `contradicted` 13, `partial` 82, `unverified` 35, `blocked` 7, `recommendation` 91 |
| [VR-002](reports/VR-002/README.md) | 2026-07-20 | `f96d8f0` + production v42 | 8/8 | `verified` 5, `partial` 2, `blocked` 1 |

[Machine-readable index](../../verification-reports/index.json).

Історичний report не переписується після публікації для приховування помилки. Нове незалежне спростування або сильніший доказ додається новим report ID чи явно трасованою correction-зміною.

## VR-003 (2026-07-21)

[VR-003](reports/VR-003/README.md) є двокорпусною factual verification для Versie 1. Вона публікує 32 очищені атомарні твердження, метадані повного покриття джерел, підтверджені root causes і явні runtime/release gates. Machine-readable артефакти: [manifest](../../verification-reports/VR-003/manifest.json), [claims](../../verification-reports/VR-003/claims.json) і [source manifest](../../verification-reports/VR-003/source-manifest.json).

## VR-004 (2026-07-21)

[VR-004](reports/VR-004/README.md) є stabilization/root-cause audit після rollback v56 та staging v57. Він відділяє production-accepted v55 від candidate line, фіксує shared URLFetch quota blocker і fail-closed A/B план. Додатки містять [повний аудит 26 CI failures](reports/VR-004/CI_FAILURE_AUDIT.md), [runtime evidence v55/v57](reports/VR-004/RUNTIME_QUOTA_EVIDENCE.md), [Stage 1 continuation audit](reports/VR-004/STAGE_1_CONTINUATION_AUDIT.md) і [Advanced Gmail compatibility analysis](reports/VR-004/ADVANCED_GMAIL_COMPATIBILITY.md). Чинний machine index VR-003 не змінено без окремої зміни validator-контракту.

## VR-005 — Керування Gmail-мітками

- **Статус:** PARTIAL
- **Дата:** 2026-07-22
- **Покриття:** офіційні Gmail API constraints, production baseline без мутацій, root cause, реалізація, автоматичні й responsive visual checks, release boundary.
- **Звіт:** [reports/VR-005/README.md](reports/VR-005/README.md)
- **Примітка:** shared machine index залишається на VR-003; VR-005 не змінює machine-report contract.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-027 — Керовані desktop panes

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** V3 `E-02`, accessible pointer/keyboard separators, bounded widths, collapse/restore, account-scoped P0 persistence, behavioral contracts і source-only release boundary.
- **Звіт:** [reports/VR-027/README.md](reports/VR-027/README.md)
- **Висновок:** focused source contracts `90/90` пройшли; native Telegram Desktop/WebView drag, keyboard, visual і restart acceptance лишається `UNVERIFIED`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-026 — Події viewport Telegram Mini App

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** V3 `E-01`, Telegram viewport/safe-area event bridge, stable-height layout, behavioral source contract і source-only release boundary.
- **Звіт:** [reports/VR-026/README.md](reports/VR-026/README.md)
- **Висновок:** source correction підготовлено з behavioral contract; native Desktop/mobile keyboard, resize і safe-area acceptance лишається `UNVERIFIED`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-007 — v59 release attempt і exact rollback

- **Статус:** PARTIAL
- **Дата:** 2026-07-22
- **Покриття:** bounded authority, PR #16/#11 integration, immutable v59, local/CI gates, owner-only UI acceptance, promotion, production launches, cleanup, post-cleanup execution overlap і exact rollback.
- **Звіт:** [reports/VR-007/README.md](reports/VR-007/README.md)
- **Висновок:** UI/stale-route acceptance пройдено, але runtime gate не пройдено; safe production відновлено на v57, staging `0`, v60 не створено.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-006 — Cumulative v58 staging A/B

- **Статус:** BLOCKED
- **Дата:** 2026-07-22
- **Покриття:** PR #16/#11 integration, immutable v58, local/CI gates, owner-only staging, controlled v57/v58 A/B, Apps Script execution localization і safe-state boundary.
- **Звіт:** [reports/VR-006/README.md](reports/VR-006/README.md)
- **Висновок:** candidate-specific regression не доведена; shared pre-handler transport/deployment-access cause лишається UNVERIFIED, тому promotion заблокований.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-008 — Динамічний активний поштовий контекст

- **Статус:** PARTIAL
- **Дата:** 2026-07-22
- **Покриття:** чинне multi-account state source, статичні fallback root causes, похідний active/shared view-model, доступність, responsive contract і release boundary.
- **Звіт:** [reports/VR-008/README.md](reports/VR-008/README.md)
- **Висновок:** source candidate усуває статичну identity-модель без зміни Gmail/OAuth contract; production verification відсутній, v60 не створено.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-010 — Cumulative release attempt v62 і exact rollback

- **Статус:** BLOCKED
- **Дата:** 2026-07-22
- **Покриття:** merged P0 source, immutable v62, локальні/CI gates, staging і production UI readbacks, delivery dedupe boundary, недоступний Apps Script execution evidence та exact rollback до v57.
- **Звіт:** [reports/VR-010/README.md](reports/VR-010/README.md)
- **Висновок:** client acceptance пройдено, але inherited GT-030 worker risk не закрито execution trace; production відновлено на exact v57, staging `0`, immutable v62 збережено.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-011 — Immutable v63 і runtime-закриття GT-030

- **Статус:** VERIFIED
- **Дата:** 2026-07-22
- **Покриття:** причинне виправлення GT-030, cumulative immutable v63, source/CI gates, owner-only native staging, production activation, seven-run no-overlap trace, cleanup і exact residual boundaries.
- **Звіт:** [reports/VR-011/README.md](reports/VR-011/README.md)
- **Висновок:** stable/HEAD є exact v63, staging `0`, worker no-overlap gate verified; scenario-specific P0 items лишаються partial там, де відсутні їхні власні докази.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-012 — Source correction вузького active-account header для GT-031

- **Статус:** PARTIAL
- **Дата:** 2026-07-22
- **Покриття:** observed production-v63 clipping, render-layer root cause, stable-ID disclosure implementation, focused/full automated contracts, immutable-v63 boundary і required live acceptance.
- **Звіт:** [reports/VR-012/README.md](reports/VR-012/README.md)
- **Висновок:** source correction локально verified; production лишається v63, native staging/production visual acceptance ще unverified.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-013 — production acceptance v64 і закриття GT-031/GT-037

- **Статус:** VERIFIED
- **Дата:** 2026-07-22
- **Покриття:** exact v63 rollback, cumulative v64 hashes, bounded deployment reconciliation, один staging deployment, native account-context acceptance, live promotion, два production launches, cleanup і explicit runtime limits.
- **Звіт:** [reports/VR-013/README.md](reports/VR-013/README.md)
- **Висновок:** immutable v64 є production/HEAD зі staging `0` і journal `cleaned`; GT-031 і GT-037 verified, а решта P0 scenarios лишається partial.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-014 — виправлення визначення production client release для GT-036

- **Статус:** PARTIAL
- **Дата:** 2026-07-22
- **Покриття:** mismatch canonical manifest field, stale marker v60 у production-v64 source, exact source marker v65 і real-manifest one-reload/no-loop regression contract.
- **Звіт:** [reports/VR-014/README.md](reports/VR-014/README.md)
- **Висновок:** source correction deployed у v65 і fresh launches проходять; defective automatic transition v64-to-v65 лишається неможливо довести.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-015 — exactly-once correction доставки SENT+INBOX

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** controlled production observation, worker telemetry, deterministic source root cause, exactly-once regression contract і release boundary v65/v66.
- **Звіт:** [reports/VR-015/README.md](reports/VR-015/README.md)
- **Висновок:** exclusion у production v65 verified, source correction пройшов `161/161`; live acceptance потребує cumulative v66.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-016 — P0 ONE-SECOND launch та offline-first межа

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** v66 safe terminal state, duplicate launch root cause, bridge/boot single-flight source correction, cache security ordering, platform boundary та v67 release gates.
- **Звіт:** [reports/VR-016/README.md](reports/VR-016/README.md)
- **Висновок:** local contracts `5/5 + 14/14 + 88/88` зелені; production лишається v65, а native one-second/offline/account-switch acceptance ще не виконано.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

- **VR-016 final local gate:** cumulative `518/518` і всі documentation validators пройшли.

## VR-017 — V3 cache-first launch hardening

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** REQ-0035 recovery boundary, confirmed v67 source defects, immutable v68 code correction, owner/account cache isolation, local/CI gates, owner-only native staging, platform limits і fail-closed abandon.
- **Звіт:** [reports/VR-017/README.md](reports/VR-017/README.md)
- **Висновок:** final suite `531/531`; multi-account switch/shared context частково прийнято нативно, але one-second/offline/drafts gate не пройдено. v68 не promoted; production v65, staging `0`, immutable v68 retained, journal `abandoned`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-018 — Exact identity для Telegram-вкладень

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** V3 `B-01`, ordinal-callback root cause, opaque exact identity, fail-closed matching, historical callback compatibility, повна role/zone/invite/revocation access matrix і release boundary.
- **Звіт:** [reports/VR-018/README.md](reports/VR-018/README.md)
- **Висновок:** source correction, попередній локальний suite `532/532` і focused access matrix `7/7` VERIFIED; access gap не вимагав зміни `MultiAccount.gs`. Native Telegram download, staging acceptance та deployment лишаються `UNVERIFIED`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-019 — Error/RCA registry та agent failure prevention

- **Статус:** VERIFIED
- **Дата:** 2026-07-23
- **Покриття:** V3 `T-04`, standalone bilingual causal registry, prevention playbook, navigation, authority boundary і documentation validation.
- **Звіт:** [reports/VR-019/README.md](reports/VR-019/README.md)
- **Висновок:** confirmed failures зведено без зміни historical evidence; playbook є quality gate, не authority source. Runtime/release state не змінено.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-020 — Стабільність scroll і focus читача

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** V3 `A-03`, unconditional reader-root replacement, stable content anchors, focus restoration, layout-shift handling, local regression/full-suite evidence і release boundary.
- **Звіт:** [reports/VR-020/README.md](reports/VR-020/README.md)
- **Висновок:** source correction і повний suite `540/540` VERIFIED; native desktop/mobile, real remote-image layout, staging acceptance і deployment лишаються `UNVERIFIED`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-021 — Foundation єдиного чесного transfer manager

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** V3 `B-03`, fragmented transfer state, canonical lifecycle/store, bounded scheduling, truthful byte/indeterminate progress, cancellation/retry capability boundaries, local integration evidence і release limits.
- **Звіт:** [reports/VR-021/README.md](reports/VR-021/README.md)
- **Висновок:** shared source foundation і повний suite `551/551` VERIFIED; remaining lanes, native slow-network acceptance, resumable restart, staging і deployment лишаються `UNVERIFIED`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-022 — Fail-closed матриця preview вкладень

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** V3 `B-02`, active SVG surface, PDF sandbox, недовірені ZIP metadata, bounded reads, traversal/encryption/symlink/bomb guards, behavioral/full-suite evidence і release boundary.
- **Звіт:** [reports/VR-022/README.md](reports/VR-022/README.md)
- **Висновок:** source hardening і повний suite `560/560` VERIFIED; native preview/fallback acceptance, staging і deployment лишаються `UNVERIFIED`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-023 — Persistent app session після reload

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** `REQ-0036`, втрата memory-only refresh state, replay уже спожитого launch proof, Telegram `SecureStorage`, single-flight recovery, bounded idempotent refresh rotation, локальні regression/full-suite evidence, native A/B v65/v69 і v65/v70, hard reload, shared quota evidence і terminal release cleanup.
- **Звіт:** [reports/VR-023/README.md](reports/VR-023/README.md)
- **Висновок:** source/session correction локально VERIFIED. Hard reload v69 завершився `UNTRUSTED_NONCE_REPLAY`; v70 пізніше один раз відкрив native mailbox, але secondary switching і fresh v65 launch отримали той самий generic error, тоді як execution telemetry підтвердила `urlfetch_quota`. v70 не promoted, exact staging видалено, production лишилася v65. One-second, offline, Desktop recovery, mobile і concurrency acceptance залишаються `PARTIAL`/`UNVERIFIED`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-024 — Fail-fast circuit URL Fetch quota

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** authenticated continuation evidence після першого daily-quota error, transport signal propagation, content-free 15-хвилинний probe circuit, timer fail-fast behavior, deterministic/full-suite evidence та source-only release boundary.
- **Звіт:** [reports/VR-024/README.md](reports/VR-024/README.md)
- **Висновок:** повторне quota-dependent continuation VERIFIED і виправлене у source. Runtime-budget contracts `9/9` і повний suite `593/593` проходять. Live quota recovery, staging, native acceptance та production promotion лишаються `UNVERIFIED`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-025 — Конфлікт політики `INBOX+SENT`

- **Статус:** CONFLICTING
- **Дата:** 2026-07-23
- **Покриття:** V3 `T-03`, owner request history, production v65, current source/tests, `GT-039` і release boundary.
- **Звіт:** [reports/VR-025/README.md](reports/VR-025/README.md)
- **Висновок:** production skip і current-source exactly-once обидва доказові, але owner policy суперечлива; release цього delta `BLOCKED` до одного прямого рішення.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-028 — Прямі контракти Google Drive OAuth

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** V3 `D-01`, owner-bound one-use state, strict callback envelope, provider isolation, token-free DTO, refresh/generation fail-closed та exact disconnect.
- **Звіт:** [reports/VR-028/README.md](reports/VR-028/README.md)
- **Висновок:** source defect підтверджено й мінімально виправлено; focused synthetic matrix є локальним evidence. Native Google/deployed callback і user-visible acceptance лишаються `UNVERIFIED`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

## VR-029 — Розділення read-only Spam list і proactive policy

- **Статус:** PARTIAL
- **Дата:** 2026-07-23
- **Покриття:** V3 `G-01`, `/mail folder:spam`, exact system label `SPAM`, bounded pagination, read-only endpoint boundary, окремий time-slice notification scan і current-`INBOX` delivery gate.
- **Звіт:** [reports/VR-029/README.md](reports/VR-029/README.md)
- **Висновок:** source уже мав правильне розділення; missing direct regression evidence додано без product-code mutation. Focused `2/2` і full `612/612` VERIFIED; native owner acceptance лишається `UNVERIFIED`.
- **English mirror:** [docs/en/verification-reports/INDEX.md](../../en/verification-reports/INDEX.md)

| [VR-030](reports/VR-030/README.md) | Box OAuth: мінімальні права, строгий callback та стабільна ідентичність | `PARTIAL` | `REQ-0035`, `GT-059`, `B1-39`, `RCA-012` |

| [VR-031](reports/VR-031/README.md) | D-03 Smart, safe URL resolver | `PARTIAL` | `REQ-0035`, `GT-060`, `B1-40`, `RCA-013` |

| [VR-032](reports/VR-032/README.md) | E-03 Навігація та фактичний поштовий контекст | `PARTIAL` | `REQ-0035`, `GT-061`, `B1-41`, `RCA-014` |
