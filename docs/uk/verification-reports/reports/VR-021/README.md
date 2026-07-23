# VR-021 — Foundation єдиного чесного transfer manager

[English](../../../../en/verification-reports/reports/VR-021/README.md)

- **Дата:** 2026-07-23
- **Загальний статус:** PARTIAL
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-31` / V3 `B-03`
- **Issue:** `GT-051`
- **Source commit:** `58933f0`
- **Release boundary:** source-only; immutable, staging, production, OAuth, Gmail, Telegram, Drive або Box mutation не виконувалися

## Підтверджена першопричина

Клієнт не мав спільної transfer truth. Локальні device files використовували compose-only `FileReader` jobs із byte progress і cancel, а incoming attachment та provider previews мали незалежні loading copy, spinner і snackbar. Кожен прийнятий local file міг стартувати без спільного concurrency scheduler. Apps Script RPC не надає trustworthy incremental byte callbacks або real client abort handle, тому transport percentage чи cancel control для цих lanes були б вигаданими.

## Реалізований foundation

1. Compose і global tasks використовують один underlying transfer store з окремими domains.
2. Lifecycle охоплює `queued`, `preparing`, `transferring`, `processing`, `attaching`, `completed`, `cancelled`, `failed`, `blocked`, `retryable` і capability-aware `paused`.
3. Bounded scheduler допускає щонайбільше три runners і дедуплікує active task Promise.
4. Actual `FileReader` callbacks визначають bytes, percentage, smoothed speed, ETA і real abort.
5. RPC lanes показують лише indeterminate phase та не мають fake percentage чи нефункціонального cancel.
6. Movable accessible chip переживає composer minimize, доки Mini App лишається живим.
7. Local compose attachment reads, incoming attachment fetch і provider preview використовують foundation.

## Атомарні твердження

| ID | Твердження | Статус | Доказ |
|---|---|---|---|
| VR-021-01 | Transfer state був розділений між compose jobs і незалежним preview/download UI. | VERIFIED | source inspection |
| VR-021-02 | Один underlying store і canonical lifecycle обслуговують compose та global transfer domains. | VERIFIED | behavioral/source contracts |
| VR-021-03 | Scheduler concurrency ніколи не перевищує три runners. | VERIFIED | deterministic behavioral test із сімома tasks |
| VR-021-04 | Невідомий RPC total не створює percentage, speed або ETA. | VERIFIED | behavioral contract |
| VR-021-05 | Actual byte callbacks створюють bytes, percentage, speed та ETA. | VERIFIED | behavioral contract |
| VR-021-06 | Queued cancel не допускає execution; running cancel викликає registered abort callback; retry зберігає stable transfer ID. | VERIFIED | behavioral contracts |
| VR-021-07 | Пов'язані transfer/MailApp contracts проходять `99/99`; повний Apps Script suite проходить `551/551`. | VERIFIED | local Node test traces |
| VR-021-08 | Thread detail, draft persistence, URL import, RPC abort, restart recovery і native slow-network behavior використовують повний manager. | UNVERIFIED | не повністю інтегровано або не прийнято нативно |

## Platform та release boundary

Manager не заявляє JavaScript continuation після вивантаження Telegram WebView. Restart recovery можна перевести у `VERIFIED` лише для server-side resumable session. Apps Script RPC лишається indeterminate, бо не надає trustworthy transport byte stream або abort handle. Перед production claims потрібні окремо авторизований cumulative candidate і native slow/stalled-network acceptance.

## 2026-07-23: докази продовження для деталей ланцюжка

Status: PARTIAL

REQ-0035 розширює реалізацію спільного transfer-state на отримання деталей ланцюжка/листа. Реалізація зберігає cache-first рендеринг, ставить Apps Script RPC у чергу з невизначеним прогресом, не показує непідтримуване скасування, повторно використовує ідентичність завдання для retry та зберігає generation guard проти застарілого рендерингу. Focused contract-тести пройшли 104/104, а повний Apps Script suite — 577/577. Перевірки bilingual, knowledge hub, verification report, release state, diff і доданих рядків на секрети пройшли. Native acceptance для повільної мережі/згортання лишається поза межами цього інкремента.

## 2026-07-23: докази продовження для збереження чернеток

Status: PARTIAL

REQ-0035 розширює реалізацію спільного transfer-state на чинний Gmail draft persistence RPC. Точні compose snapshot і operation ID лишаються авторитетними; прогрес невизначений, непідтримуване скасування відсутнє, retry повторно використовує точну ідентичність task, а змінений compose/account context працює fail-closed. Focused contract-тести пройшли 102/102, а повний Apps Script suite — 580/580. Для цього source-інкремента не виконувались live Gmail mutation, OAuth-дія, staging deployment або production promotion.

## 2026-07-23: докази продовження для public HTTPS import

Status: PARTIAL

REQ-0035 розширює shared transfer-state на повний public-HTTPS source submit. Runtime-тести підтверджують один RPC та одне вкладення для паралельних submit, generic content-free task identity, чесний невизначений прогрес і account/session fail-closed retry. Чинні server SSRF і content-bound контракти лишаються покритими повним suite. Focused contract-тести пройшли 111/111, а повний Apps Script suite — 584/584. Live external URL, Gmail mutation, OAuth-дія, staging deployment або production promotion не використовувалися.
