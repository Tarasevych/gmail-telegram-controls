# VR-040 — C-01 Gmail-style autosave state machine

Verification framework: REQ-0004

- **Статус:** `PARTIAL`
- **Дата:** 2026-07-23
- **Запит:** `REQ-0035`
- **Пов’язані записи:** `GT-035`, `GT-045`, `B1-25`, `RCA-021`
- **English mirror:** [VR-040](../../../../en/verification-reports/reports/VR-040/README.md)

## Межа

Цей source-only contour розширює чинний Versie 1 compose state. Він не змінює Gmail/OAuth scopes, server draft RPC, stable operation journal, Telegram identity, листи, мітки, deployment, staging або production.

## Підтверджена першопричина

Server уже повертав canonical Gmail draft і безпечно reconciled uncertain operation за stable ID. Client UI однак default-ився до «Збережено в Gmail», змішував dirty, in-flight і pending states та пропонував manual «Перевірити збереження» під час normal autosave. Same-session pending і terminal failures не мали одного bounded terminal presentation contract.

## Source correction

- Один derived presentation model показує `Змінено`, `Зберігаю…`, `Збережено ✓ <час>`, `Офлайн — у черзі`, `Конфлікт` або `Не збережено — повторити`.
- `Збережено` та timestamp встановлюються лише після canonical Gmail draft readback.
- Pending і terminal automatic retries обмежені трьома спробами; після цього доступна одна explicit retry action.
- Manual retry використовує той самий pending operation ID і не створює паралельну Gmail operation.
- Offline edit лишається в persistent local recovery та не запускає transport, доки browser не повідомить про відновлення мережі.
- Existing local/Gmail conflict зберігає обидві версії та вимагає explicit choice.
- Status має non-colour `✓`, live-region text і keyboard action лише коли дія справді доступна.

## Атомарні твердження

| Твердження | Категорія | Статус | Доказ |
|---|---|---|---|
| Normal autosave не просить manual «Перевірити збереження» | UX | `VERIFIED` | executable source contract |
| Saved state виникає лише після canonical Gmail draft readback | Integrity | `VERIFIED` | ordered source contract |
| Pending і terminal automatic retry мають bounded terminal state | Reliability | `VERIFIED` | synthetic state/retry contracts |
| Manual retry не змінює stable pending operation ID | Idempotency | `VERIFIED` | retry source contract |
| Offline state не видається за Gmail acknowledgement | Offline safety | `VERIFIED` | state precedence і transport gate contracts |
| Local/server conflict не перезаписує версію без explicit choice | Conflict safety | `VERIFIED` | existing recovery conflict control plus status contract |
| Real Gmail draft переживає native restart, offline recovery і cross-session continuation | Runtime | `UNVERIFIED` | shared Apps Script blocker не дозволяє безпечний staging |
| Current production має corrected autosave UX | Production | `UNVERIFIED` | release state не змінювався |

## Validation

Focused autosave contracts і повний Apps Script suite мають пройти до merge; GitHub checks є authoritative publication gate. Тести synthetic і не створюють, не змінюють та не видаляють реальні Gmail drafts.

## Висновок

Client source тепер відрізняє local recovery від canonical Gmail acknowledgement і завершує automatic retry чесною bounded межею. Статус лишається `PARTIAL` до native offline/restart/cross-session acceptance та production verification після зняття shared release blocker.
