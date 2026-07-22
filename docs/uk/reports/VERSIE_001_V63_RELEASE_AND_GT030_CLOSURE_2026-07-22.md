# Випуск Versie 1 v63 і закриття GT-030

[English](../../en/reports/VERSIE_001_V63_RELEASE_AND_GT030_CLOSURE_2026-07-22.md)

- **Дата:** 2026-07-22
- **Статус:** VERIFIED для випуску v63 і GT-030 no-overlap gate
- **Запит:** `REQ-0033`
- **Атомарна verification:** [VR-011](../verification-reports/reports/VR-011/README.md)
- **Поточний стан:** [CURRENT_STATE](../CURRENT_STATE.md)

## Межі

Цей звіт фіксує cumulative immutable v63 у межах Versie 1, причинне виправлення `GT-030`, контрольований staging і production acceptance та точні залишкові evidence boundaries. Він не переписує історичні звіти про rollback v59 або v62.

## Першопричина

Попередня worker property трактувала 150-секундний admission TTL як повний execution lock. Google Apps Script дозволяє законному виконанню тривати суттєво довше. Після завершення TTL наступний minute trigger міг увійти, поки попередній worker ще працював. Deterministic contract відтворив цю re-entry умову.

## Реалізоване виправлення

- tokenized seven-minute crash lease покриває legal execution window;
- 150-секундне значення лишається soft stage deadline, а не exclusion lifetime;
- лише matching lease token може звільнити property у `finally`;
- content-free telemetry фіксує stage/runtime outcomes без тексту листів, tokens, identifiers або account data;
- immutable v63 є cumulative і зберігає всі прийняті client та multi-account зміни Versie 1 з попередніх candidates.

## Докази source і тестів

| Твердження | Результат | Статус |
|---|---:|---|
| Focused worker contracts | `17/17` | VERIFIED |
| Source suite | `497/497` | VERIFIED |
| Release-helper contracts | `2/2` | VERIFIED |
| Source plus release-helper suite | `499/499` | VERIFIED |
| Signed bridge contracts | `4/4` | VERIFIED |
| Final cumulative suite | `501/501` | VERIFIED |
| GitHub required checks для PR #32, #33 і #34 | пройдено | VERIFIED |
| GitHub/private GitLab `main` parity | `ce46143b7270ca7776a91b01783490e1d08aa1ca` | VERIFIED |
| Staged privacy scans | `0` findings | VERIFIED |

## Release trace

1. PR #32 злив worker-lease correction як `cd4c32c5af2a61161c0fc6e1b25cffa04e22f724`.
2. PR #33 злив immutable v63 release helper як `fce30f96597f7706f8aa0d3a8bbb21e51d9b9360`.
3. PR #34 злив signed staging bridge як `ce46143b7270ca7776a91b01783490e1d08aa1ca`.
4. Immutable v63 створено один раз і staged один раз для owner-only acceptance.
5. Native Telegram Desktop staging завантажив mailbox, dynamic account context, avatar behavior і рівно три isolated roots. Перемикання на контрольований наявний root і назад не вимагало OAuth.
6. Promotion змінив stable v57 на v63. Immediate read helper повернув stale state і створив false negative; read-only preflight reconciled stable v63 до будь-якої наступної мутації.
7. Два свіжі native Telegram Desktop production launches завантажили mailbox v63.
8. Cleanup видалив exact staging deployment, встановив HEAD exact v63 і залишив release journal `cleaned`.
9. Final preflight підтвердив stable/HEAD v63, staging `0` та immutable-ready source hashes.

## Runtime acceptance

Authenticated Apps Script Executions view показав сім послідовних завершених `checkNewMail_` runs з інтервалом в одну хвилину. Спостережені тривалості: `5.066 с`, `20.125 с`, `4.062 с`, `1.82 с`, `23.542 с`, `2.235 с` і `2.742 с`. Кожне виконання завершилося до наступного старту. Overlapping worker execution не спостерігалося.

15-хвилинний History slot лишається verified automated contract, а не окремим runtime substage trace. Cloud logs не показали новий content-free telemetry row під час observation window.

## Межі безпеки

- OAuth consent, GCP migration, secret-property read, account-zone change або random mail mutation не виконувалися.
- Додатковий реальний лист не надсилався. External automatic INBOX delivery після v63 лишається `UNVERIFIED`.
- Immutable v56, v59, v62 і v63 не переписувалися. Exact v57 лишається rollback target.
- Telegram Web K/A показав blank embedded page для exact signed route, тоді як native Telegram Desktop пройшов acceptance. Web-only root cause лишається `UNVERIFIED`; signed bootstrap checks не послаблювалися.

## Залишкова робота

- `GT-031`: виправити clipping вузького account header без втрати повного доступного email.
- `GT-032`–`GT-036`: завершити scenario-specific performance, cache, draft, typography і one-reload production evidence.
- `GT-037`: додати bounded read-after-write reconciliation до наступного release helper.
- `GT-038`: локалізувати Telegram Web K/A embed failure без послаблення signature або session controls.
- Підтвердити одну external automatic INBOX delivery після v63 окремо дозволеним контрольним повідомленням.
