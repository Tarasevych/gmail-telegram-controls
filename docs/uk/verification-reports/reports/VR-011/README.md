# VR-011 — Immutable v63 і runtime-закриття GT-030

[English](../../../../en/verification-reports/reports/VR-011/README.md)

- **Дата:** 2026-07-22
- **Загальний статус:** VERIFIED
- **Межі:** публікація immutable v63, owner-only staging, production activation, причинне виправлення GT-030, no-overlap runtime gate, cleanup і залишкові boundaries
- **Запит:** `REQ-0033`
- **Verification framework:** `REQ-0004`
- **Детальний звіт:** [Випуск Versie 1 v63 і закриття GT-030](../../../reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)

## Атомарні висновки

| ID | Атомарне твердження | Статус | Доказ |
|---|---|---|---|
| VR-011-01 | Попередня 150-секундна property була лише admission TTL і могла завершитися до закінчення законного Apps Script worker. | VERIFIED | deterministic focused contract і source review |
| VR-011-02 | v63 використовує tokenized seven-minute crash lease, 150-second soft stage deadline і token-matched release. | VERIFIED | source commit `cd4c32c5af2a61161c0fc6e1b25cffa04e22f724`; `17/17` focused tests |
| VR-011-03 | Cumulative source/release/bridge suites пройшли `497/497`, `499/499` і `501/501`. | VERIFIED | local test traces |
| VR-011-04 | PR #32, #33 і #34 пройшли required checks та були merged normally. | VERIFIED | GitHub checks і merge commits |
| VR-011-05 | GitHub і private GitLab mirror досягли однакового `main` commit `ce46143b7270ca7776a91b01783490e1d08aa1ca`. | VERIFIED | remote readback |
| VR-011-06 | Immutable v63 staged один раз; native Telegram Desktop завантажив mailbox, dynamic identity і три isolated roots, після чого виконав switch і return без OAuth. | VERIFIED | authenticated owner-only staging readback |
| VR-011-07 | Два свіжі native Telegram Desktop production launches завантажили mailbox v63. | VERIFIED | authenticated production readback |
| VR-011-08 | Сім послідовних one-minute `checkNewMail_` executions завершилися без overlap. | VERIFIED | authenticated Apps Script Executions readback |
| VR-011-09 | 15-хвилинний History slot покритий automated contract; окремий runtime substage trace не зафіксовано. | PARTIAL | contract trace; runtime substage відсутній |
| VR-011-10 | Stable і HEAD є exact v63, staging `0`, journal `cleaned`. | VERIFIED | final read-only preflight |
| VR-011-11 | Promotion helper повідомив false negative після фактичного advancement deployment; стан reconciled без duplicate mutation. | PARTIAL | immediate error плюс пізніший stable-v63 preflight; tracked як GT-037 |
| VR-011-12 | Telegram Web K/A показав blank exact signed embed, тоді як native Telegram Desktop пройшов acceptance. | PARTIAL | controlled UI readback; root cause UNVERIFIED; tracked як GT-038 |
| VR-011-13 | External automatic INBOX delivery після v63 не перевірялася. | UNVERIFIED | додатковий реальний лист не надсилався |
| VR-011-14 | OAuth, GCP migration, secret read, account-zone change або random mail mutation не застосовувалися. | VERIFIED | operation trace |

## Висновок

Випуск v63 і GT-030 no-overlap gate мають статус VERIFIED. Це не підвищує scenario-specific P0 items GT-031–GT-036 понад їхні докази. Mutable canonical state: [CURRENT_STATE](../../../CURRENT_STATE.md); historical VR-010 лишається immutable rollback snapshot.
