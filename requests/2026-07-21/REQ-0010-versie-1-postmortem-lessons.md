# REQ-0010: Versie 1 postmortem and lessons learned / Postmortem і засвоєні уроки Versie 1

- ID: REQ-0010
- Received: 2026-07-21
- Status: recorded
- Active Versie: Versie 1
- Next Versie authorization: no
- Depends on: REQ-0009 delivery evidence and supplied v42-v55 session records
- Sensitive data persisted: no mail content, account addresses, tokens, cookies, OAuth material, private identifiers, or credentials in Git
- Routes: requests=record; instructions=update; permissions=no-change; plan=no-change; product=update; release=no-change
- Permission basis: explicit
- Detailed scope: documentation and verification update from supplied evidence; latest relevant GitHub email read-only; no product-code/runtime change; main only after document checks

<!-- lang:uk -->
## Українською

Власник наказав перетворити підтверджену історію розробки Gmail-to-Telegram Versie 1, зокрема Apps Script v42-v55, на двомовний postmortem і постійні правила для учасників. Перед публікацією необхідно read-only проаналізувати останній вхідний лист GitHub у підтвердженій owner Gmail-пошті та врахувати лише доведену причину проблеми публікації.

## Частини й маршрути

| Частина | Клас | Маршрут |
|---|---|---|
| Повний RCA та lessons learned | documentation / verification | Активна Versie 1, парні UK/EN сторінки |
| Постійні contributor rules | instruction | `Інструкції`, з посиланням на REQ-0010 |
| Історія звернення | request | Лише `Запити` |
| Нове повноваження | permission | No-change: власник нового дозволу не надавав |
| GitHub mail diagnosis | evidence | Read-only; у Git лише санітизований висновок |
| Runtime або новий release | release | No-change |

## Критерії завершення

- Останній релевантний GitHub-лист прочитано без зміни пошти; причина та потрібне виправлення підтверджені або позначені `unverified`.
- `docs/uk/POSTMORTEM.md` і `docs/en/POSTMORTEM.md` мають паралельну структуру та однаковий набір RCA-ідентифікаторів.
- `CONTRIBUTING.md` містить практичний розділ Lessons learned і посилання на REQ-0010.
- Документацію перевірено на відсутність секретів та мовний parity.
- Окремі commits і звичайні pushes опубліковані у відповідних гілках; `Повноваження`, runtime і release не змінені.

<!-- lang:en -->
## English

The owner ordered the verified Gmail-to-Telegram Versie 1 development history, including Apps Script v42-v55, to be converted into a bilingual postmortem and standing contributor rules. Before publication, the latest incoming GitHub message in the verified owner Gmail mailbox must be reviewed read-only, and only an evidenced publication issue may affect the result.

## Parts and routes

| Part | Class | Route |
|---|---|---|
| Complete RCA and lessons learned | documentation / verification | Active Versie 1, paired UK/EN pages |
| Standing contributor rules | instruction | `Інструкції`, linked to REQ-0010 |
| Request history | request | `Запити` only |
| New authority | permission | No-change: the owner granted no new permission |
| GitHub mail diagnosis | evidence | Read-only; Git receives only a sanitized conclusion |
| Runtime or next release | release | No-change |

## Completion criteria

- The latest relevant GitHub message is read without changing mail; its cause and required correction are evidenced or marked `unverified`.
- `docs/uk/POSTMORTEM.md` and `docs/en/POSTMORTEM.md` use parallel structure and the same RCA identifiers.
- `CONTRIBUTING.md` contains actionable Lessons learned and cites REQ-0010.
- Documentation is checked for secrets and language parity.
- Separate commits and ordinary pushes are published to the applicable branches; `Повноваження`, runtime, and release remain unchanged.

## Completion evidence: c98e69e

Status: `completed`
Completed: `2026-07-21`

- Latest relevant GitHub email was inspected read-only; it identified failed Actions run `29788979153` for product commit `184184c`.
- Authorized GitHub CLI inspection proved the exact failure: both VR-002 pages lacked the repository-wide `REQ-0004` marker; bilingual and knowledge-hub checks had already passed.
- Active Versie documentation commit: `c98e69eaec23da06d63f883451ac433f4ae38d09`.
- Standing contributor lessons commit on `Інструкції`: `80d79ab`.
- Local checks passed: 37 bilingual pairs, knowledge hub 295 source IDs / 245 canonical items / 8 explicit conflicts, verification reports 245 claims, 20/20 RCA parity, targeted privacy scan, and identical CONTRIBUTING hashes.
- GitHub Actions passed: bilingual `29810786984`, knowledge hub `29810787010`, verification reports `29810787006`.
- No `apps-script/*` file entered the documentation commit. The separate v55 candidate remains `unverified` and was not deployed or released by this request.
