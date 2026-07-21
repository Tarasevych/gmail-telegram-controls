# VR-004: Stabilization та root-cause audit після rollback v56

[English](../../../../en/verification-reports/reports/VR-004/README.md) | [Індекс](../../INDEX.md)

- **Дата:** 2026-07-21
- **Запит:** REQ-0020
- **Методика:** REQ-0004
- **Продуктова лінія:** Versie 1
- **Audit branch:** `audit/diagnostic-fix`
- **Target commit:** `55964930e2585ff634bddd0be8d0345d7ba964d2`
- **Зміна коду/release/runtime:** ні

## Рішення

Остання повністю production-accepted Git-межа — merge PR #3, commit `0b739ad0671d24cc337724817953d821c29cc52d`, що документує приймання v55. `main` уже містить cumulative candidate v56 через merge PR #4, commit `23927148cfa616dbd1504e81768d013b01a9ed37`, але production було точно повернуто до v55. Тому зелений merge v56 не прирівнюється до production acceptance.

Поточний network failure не доведено як regression v56: однаковий симптом повторився після exact rollback на v55. Apps Script executions локалізували активний blocker у `gmailApiRequest_`: денну квоту `URLFetch` вичерпано. До здорового baseline v55 повторне promotion, OAuth або зміни стабільних модулів заборонені.

## Заморожена стабільна зона

Наведені блоки мають production/test evidence до v55 і не є ціллю поточного ремонту:

| Блок | Перевірений контракт | Статус |
|---|---|---|
| Multi-account registry | UI active account відокремлено від notification fan-out; connection/zone scope збережено | frozen |
| Signed Telegram bootstrap | підпис, TTL, replay guard, owner/session binding | frozen |
| Account UI | avatar, три account roots, existing-session one-click switch | frozen |
| Delivery ordering | realtime lane виконується перед maintenance/frozen backlog | frozen |
| Dedupe | SENT+INBOX eligibility дає не більше однієї фізичної Telegram-картки | frozen |
| Card index/capacity/retention | compaction перед capacity guard, active-card safety, bounded purge | frozen |
| Lock isolation | короткі lane-specific leases; без shared lock під час Gmail/Telegram I/O | frozen |
| Mail actions/callbacks | account-bound Telegram card actions і Gmail mutation scope | frozen |
| OAuth/session model | чинні token/session contracts; новий consent у цьому audit не запускався | frozen |

Будь-який майбутній fix має починатися з timer scheduling/error classification. `MailClient.gs`, `MultiAccount.gs`, OAuth, session, card-index, dedupe та Gmail action paths не змінюються без нового прямого доказу, що першопричина розташована саме там.

## Stable/candidate boundary

| Поверхня | Фактичний стан | Інтерпретація |
|---|---|---|
| Production-accepted Git boundary | `0b739ad...` / PR #3 | stable v55 evidence |
| `origin/main` | `2392714...` / PR #4 | cumulative v56 candidate code |
| Runtime production/HEAD | exact rollback v55 | safe runtime fallback |
| Immutable staging | v56 збережено | історичний A/B candidate, не stable |
| Документаційний blocker | PR #5, commit `5596493...` | open, clean, blocked on shared baseline |
| Audit branch | `audit/diagnostic-fix` від `5596493...` | diagnostics/docs only |

## Діагностичні докази

- Усі 14 наявних worktrees були clean; незбережених змін не було. Тому порожній checkpoint commit навмисно не створено: фактичний стан уже збережено commit `5596493...`.
- Dev/autofix/release-helper/test-watch процесів не знайдено. Production task `TelegramBeheer` не зупинявся, бо він не є тимчасовим diagnostic процесом.
- Повний tracked Node suite на `audit/diagnostic-fix` пройшов: **20 files, 441/441 tests, 0 failures**.
- v56 і rollback v55 завершували `doPost`, session redemption/renewal і `mailboxRpc`; повторні `checkNewMail_` падали в `gmailApiRequest_` з content-free error `Service invoked too many times for one day: urlfetch`.
- Однаковий network symptom на candidate і stable rollback спростовує твердження про доведений candidate-specific regression. Він не доводить, що v56 готовий до production.

Подальша перевірка з cumulative v57 підтвердила ту саму shared boundary: staging v57 і два fresh production v55 launches показали однаковий mailbox error; `doPost`, `mailboxRedeemLaunch` та `mailboxRpc` v57 завершилися, а worker записав OAuth refresh failure і точний daily `urlfetch` quota error. Production лишається v55, immutable v56 є історичним, один staging v57 збережено, menu повернуто на production.

Окремі доказові додатки:

- [CI failure audit: усі 26 runs](CI_FAILURE_AUDIT.md)
- [Runtime quota evidence: v55/v57](RUNTIME_QUOTA_EVIDENCE.md)

## Атомарні findings

| ID | Категорія | Статус | Evidence | Твердження |
|---|---|---|---|---|
| VR4-001 | release | verified | E5 | PR #3 / `0b739ad...` є останньою production-accepted Git-межею v55. |
| VR4-002 | release | verified | E4 | `main` містить v56 candidate, але production runtime точно повернуто до v55. |
| VR4-003 | recovery | verified | E3 | 14/14 worktrees clean; порожній checkpoint не потрібний; audit branch ізольовано. |
| VR4-004 | tests | verified | E3 | Повний tracked suite пройшов 441/441. |
| VR4-005 | root-cause | verified | E4 | Однаковий network symptom на v56 і rollback v55 не доводить candidate regression. |
| VR4-006 | root-cause | verified | E4 | Активний blocker — вичерпана денна `URLFetch` quota в `gmailApiRequest_`. |
| VR4-007 | root-cause | partial | E4 | Overlap та all-account History є pressure pattern; точний per-path total не підраховано. |
| VR4-008 | release | verified | E2 | Merge/checks/tests не замінюють production acceptance evidence. |
| VR4-009 | safety | recommendation | E0 | Заморозити стабільні account/session/card/OAuth paths до нового прямого доказу. |
| VR4-010 | release | recommendation | E0 | Продовжувати лише через healthy v55 baseline і controlled owner-only A/B. |
| VR4-011 | CI | verified | E4 | GitHub Actions API підтвердив рівно 26 historical failures: 12 Request ledger і 14 Verification reports. |
| VR4-012 | CI | verified | E4 | Follow-up commits виправили schema/hash defects; historical failed runs лишаються immutable evidence. |
| VR4-013 | root-cause | verified | E4 | Однаковий v55/v57 UI symptom та exact worker error підтверджують shared quota blocker, а не доведену regression v57. |

## Root cause analysis

### RC-1 — shared Apps Script URLFetch daily quota exhaustion

Поточна операційна відмова спричинена вичерпаною спільною денною квотою `URLFetch`. Це блокує Gmail API calls у worker і може проявлятися як загальний network error у mailbox UI. Перемикання між v55/v56 не відновлює спільну квоту, тому повторні rollout/rollback цикли лише споживають додатковий ресурс і плутають діагностику.

Повторні хвилинні `checkNewMail_`, all-account History fan-out і виконання, довші за trigger interval, є підтвердженим pressure pattern. Точний внесок кожного call path у денний total не підраховано, тому цей механізм позначено `partial`, а не як окрема повністю доведена причина.

### RC-2 — split release authority

Git `main`, immutable staging і production runtime вказували на різні рівні приймання: merged v56 candidate проти production rollback v55. Через спільну квоту однаковий failure помилково міг виглядати як regression candidate. Єдиним authority для stable є production acceptance evidence, а не merge, green checks або local tests окремо.

## Що перебуває під загрозою

- realtime Gmail-to-Telegram delivery;
- frozen/history recovery і manual `/check`;
- mailbox list/bootstrap після переходу до Gmail API calls;
- достовірність A/B висновку, якщо запускати його під уже вичерпаною квотою.

Немає доказів нової поломки account registry, avatar/roots, one-click switch, signed session, card index, retention, dedupe або callbacks. Вони залишаються frozen.

## Безпечний план виправлення

1. Не змінювати код і не перемикати release, доки квота не відновиться.
2. На v55 виконати два свіжі production mailbox launches без network error; це обов'язковий baseline.
3. Лише після baseline виконати owner-only signed staging launch v57, перевірити avatar, три roots і switch на другий Gmail account та назад без OAuth.
4. Якщо v57 проходить A/B, виконати стандартний Promote, два production launches і `CleanupStaging`.
5. Після promotion спостерігати щонайменше чотири trigger opportunities; підтвердити відсутність overlap, 150-секундний worker slot і 15-хвилинний History slot.
6. Надіслати один owner self-message з унікальним marker; очікувати рівно одну Telegram card і жодного дубля після двох `/check`.
7. Якщо новий failure є лише на candidate, не змінювати immutable v56/v57: створити cumulative v58 і обмежити patch доказаним block. Exact rollback залишається v55.
8. Якщо failure однаковий на v55 і candidate, не перемикати релізи; залишити shared blocker відкритим і продовжити quota telemetry.

## GitHub status map

| PR | Статус | Аудит-рішення |
|---|---|---|
| #1 | merged | Done; v55 delivery hardening і VR-003 evidence |
| #2 | merged | Done; v55 staging bridge |
| #3 | merged | Done; остання production-accepted evidence boundary |
| #4 | merged | Candidate; code/tests merged, production acceptance blocked |
| #5 | open, clean | Blocked; shared quota baseline та controlled A/B pending |
| #6 | open, clean | VR-004 та доказові додатки; merge після #5 |
| #7 | merged | Connection-scoped Gmail metadata identity fix |
| #8 | merged | Isolated immutable v57 staging launcher |

Repository Issues вимкнені. До підтвердження GitHub Projects scope PR-коментарі та цей report є authoritative task-status surface.

## Обмеження

- Audit не запускав новий Gmail/OAuth flow, не змінював листи, Telegram, Apps Script deployment, triggers або Script Properties.
- 441/441 доводить regression contracts у локальному test scope, але не production health.
- Квота не була відновлена в межах audit; A/B acceptance залишається pending.
- Приватні execution identifiers, mailbox content, tokens, `initData` і secret properties не публікуються.
