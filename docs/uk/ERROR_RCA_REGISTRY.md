# Реєстр помилок і першопричин

[English](../en/ERROR_RCA_REGISTRY.md)

Це короткий активний індекс підтверджених помилок Gmail Telegram Controls. Він не замінює [реєстр проблем](ISSUES.md), postmortem або verification reports: тут зберігається причинний ланцюг, межа актуальності та правило запобігання повторенню.

Статуси: `VERIFIED`, `PARTIAL`, `UNVERIFIED`, `CONFLICTING`, `BLOCKED`, `RECOMMENDED`.

| ID | Симптом | Підтверджена першопричина | Корекція та актуальність | Запобігання | Статус | Доказ |
|---|---|---|---|---|---|---|
| RCA-001 | Telegram card capacity могла виглядати вичерпаною попри вільні slots | Guard рахував raw index із duplicate, stale та missing-record keys; перший patch пропустив reservation-path read | Index compaction застосовано перед усіма capacity reads | Тестувати кожен caller з duplicate, ghost і live keys | VERIFIED | [VR-003 root causes](verification-reports/reports/VR-003/ROOT_CAUSES.md) |
| RCA-002 | Realtime mail чекала на повільнішу роботу | Shared legacy `UserLock` охоплював зовнішній Gmail/Telegram I/O | Короткі `ScriptLock` claim/commit/release та per-lane lease | Не утримувати shared lock через external I/O; assert нуль realtime `UserLock` calls | VERIFIED | [Postmortem](POSTMORTEM.md), [VR-003 architecture](verification-reports/reports/VR-003/ARCHITECTURE.md) |
| RCA-003 | `SENT+INBOX` повідомлення губилося або могло дублювати card | Різні eligibility paths трактували одну Gmail message непослідовно | Canonical eligibility приймає `SENT+INBOX`, відхиляє sent-only/spam/trash і дедуплікує stable message ID; production v65 ще не містить correction | Одна eligibility function і один at-most-once key для всіх lanes | PARTIAL | [VR-015](verification-reports/reports/VR-015/README.md) |
| RCA-004 | Однаковий connection screen з’являвся двічі | Bridge handoff, static/runtime overlay, повторний boot і неправильний `p0OpenDatabase` symbol | Settled single-flight, hidden boot host і `p0OpenDb` є в immutable v68 source; production activation відсутня | Один launch owner, settled idempotency і test на фактичний symbol | PARTIAL | [VR-017](verification-reports/reports/VR-017/README.md) |
| RCA-005 | Mailbox показував generic network error у stable і candidate | Shared Apps Script daily `URLFetch` quota була вичерпана; повторне перемикання release не відновлювало quota | Incident root cause підтверджено; поточна quota після історичного інциденту не заявляється | A/B stable first; одна bounded спроба; не чергувати releases при shared failure | VERIFIED | [VR-004](verification-reports/reports/VR-004/README.md) |
| RCA-006 | Серії GitHub Actions failure для REQ metadata | Документи та монолітний regex validator мали різні contracts для `Routes` і `Permission basis` | Canonical fields та детальні schema checks запроваджено; historical failed runs лишаються failed | Template + parser за key/value set + fixture для кожного invalid field | VERIFIED | [CI failure audit](verification-reports/reports/VR-004/CI_FAILURE_AUDIT.md) |
| RCA-007 | Verification manifest hash відрізнявся Windows/Linux | SHA-256 рахував фізичні CRLF/LF bytes | Hash canonicalized до LF | Обов’язкові LF і CRLF fixtures з однаковим expected hash | VERIFIED | [CI failure audit](verification-reports/reports/VR-004/CI_FAILURE_AUDIT.md) |
| RCA-008 | Telegram callback міг віддати інше вкладення або exact connection context лишався без прямого matrix-доказу | Callback використовував mutable MIME ordinal; окремо role/zone/invite/revocation boundary мав evidence gap без підтвердженого source defect | Opaque exact token, single-match lookup і fail-closed ambiguity merged; focused access matrix `7/7` пройшла без зміни `MultiAccount.gs`; native download ще не перевірено | Стабільна identity, reorder/duplicate-name tests, повна role-threshold та invite lifecycle matrix і жодного raw attachment ID у callback | PARTIAL | [VR-018](verification-reports/reports/VR-018/README.md) |
| RCA-009 | Historical v68 integrity test блокував будь-яку наступну source-розробку | Test порівнював immutable v68 hashes із mutable HEAD | Test перевіряє pinned helper hashes; immutable helper і hashes не переписано | Historical release test не повинен вимагати вічної рівності mutable HEAD | VERIFIED | [VR-018](verification-reports/reports/VR-018/README.md) |
| RCA-010 | Паралельні branches отримали однакові `GT/B1` IDs | ID резервували без live registry/readback serialization | Follow-up перенумерував активні записи без переписування історії | Перед ID allocation: fetch main, open-PR check, maxima check, один registry lease | VERIFIED | [VR-006](verification-reports/reports/VR-006/README.md) |
| RCA-011 | Drive callback міг прийняти one-use state іншого source provider | Source-state містив provider, але Drive callback не перевіряв його після consume; error envelope також був слабший за Box | Exact `drive` provider binding і bounded sanitized error envelope додано у source; native provider boundary ще не перевірено | Кожний shared OAuth-state consumer зобов’язаний перевіряти provider до token exchange і мати synthetic wrong-provider contract | PARTIAL | [VR-028](verification-reports/reports/VR-028/README.md) |

## Правило оновлення

1. Новий рядок додається лише після санітизованого source request і доказу root cause.
2. Симптом без причинного доказу має статус `UNVERIFIED`, а не припущення у колонці першопричини.
3. Source test не підвищує native/runtime claim до `VERIFIED`.
4. Після deployment окремо оновлюються source, staging і production evidence.
5. Historical рядок не переписується заднім числом; нове розуміння додається як уточнення з посиланням.
