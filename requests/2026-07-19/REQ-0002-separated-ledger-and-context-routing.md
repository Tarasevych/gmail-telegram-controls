# REQ-0002: Відокремлений журнал і контекстна маршрутизація / Separate ledger and contextual routing

- ID: REQ-0002
- Received: 2026-07-19
- Status: completed
- Active Versie: Versie 1
- Next Versie authorization: no
- Sensitive data persisted: no
- Routes: requests=record; instructions=update; permissions=update; plan=no-change; product=no-change; release=no-change
- Permission basis: explicit

<!-- lang:uk -->
## Українською

## Інтерпретація і маршрути

| Частина | Класифікація | Призначення | Дія |
|---|---|---|---|
| Відокремити історію звернень | request governance | `Запити` | створити канонічну гілку, індекс, policy, router і CI |
| Не змішувати журнал з правилами | instruction | `Інструкції` | видалити ledger-копії та залишити нормативний execution order |
| Автоматично визначати належність частин | explicit permission | `Повноваження` | створити вузьке P-005 без права припускати інші дозволи |
| Плани й продукт | no applicable change | активна Versie | не змінювати roadmap, issues, код або runtime |
| Наступна версія | release gate | Versie | Versie 2 не дозволена і не створюється |

Канонічний журнал тепер відокремлений. Кожне наступне проєктне повідомлення спочатку отримує очищений `REQ-ID` у `Запити`. Лише потім його окремі частини змінюють релевантні контури, а кожна похідна зміна посилається на джерело.

## Докази виконання

- `bfd74ab`: REQ-0002 опубліковано до структурних змін.
- `773dd48`: створено й опубліковано `Запити` з історією, маршрутизатором і CI.
- `ae858e4`: `Інструкції` очищено від канонічного журналу.
- `37ef923`: додано лише релевантне повноваження P-005.
- `bc80da9`: bootstrap-порядок застосовано до `main`.
- `5ae11fd`: bootstrap-порядок застосовано до активної Versie 1.
- Bilingual checks, request-ledger validation і `git diff --check` пройдені до commit.
- Product, Gmail, Telegram, Apps Script, deployment і release state не змінювалися.
- Versie 2 не створена й не авторизована.

<!-- lang:en -->
## English

## Interpretation and routes

| Part | Classification | Destination | Action |
|---|---|---|---|
| Separate request history | request governance | `Запити` | create the canonical branch, index, policy, router, and CI |
| Do not mix history with rules | instruction | `Інструкції` | remove ledger copies and retain only the normative execution order |
| Automatically determine where parts belong | explicit permission | `Повноваження` | create narrow P-005 without authority to infer other permissions |
| Plans and product | no applicable change | active Versie | do not change roadmap, issues, code, or runtime |
| Next version | release gate | Versie | Versie 2 is not authorized and is not created |

The canonical ledger is now separate. Every subsequent project message first receives a sanitized `REQ-ID` on `Запити`. Only then do its individual parts change relevant areas, and every derived change links back to its source.

## Implementation evidence

- `bfd74ab`: REQ-0002 was published before structural changes.
- `773dd48`: created and published `Запити` with history, routing, and CI.
- `ae858e4`: removed the canonical ledger from `Інструкції`.
- `37ef923`: added only the relevant P-005 authority.
- `bc80da9`: applied the bootstrap order to `main`.
- `5ae11fd`: applied the bootstrap order to active Versie 1.
- Bilingual checks, request-ledger validation, and `git diff --check` passed before commit.
- Product, Gmail, Telegram, Apps Script, deployment, and release state were not changed.
- Versie 2 was neither created nor authorized.