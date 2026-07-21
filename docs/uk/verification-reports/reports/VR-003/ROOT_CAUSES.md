# Аналіз кореневих причин VR-003

**Методика verification:** REQ-0004

Як підтверджені наведено лише дефекти, зіставлені з первинними Git або test evidence.

| № | Версія виявлення | Симптом | Root cause | Виправлення | Запобігання |
|---:|---|---|---|---|---|
| 1 | до v47 | Telegram card capacity могла виглядати вичерпаною попри stale slots | Guard рахував raw index із duplicate, stale і missing-record keys; перший patch також пропустив фактичний read у reservation path | v47 compact-ить index перед обома capacity reads і зберігає live records (`VR3-007`, `VR3-008`) | Тестувати кожен capacity read path із duplicate, ghost і live keys |
| 2 | до v48 | Realtime-доставка могла чекати на повільнішу роботу | Realtime path утримував shared legacy `UserLock`, тому contention блокував fast lane | v48 використовує короткі `ScriptLock` claim/commit/release sections та per-lane lease (`VR3-009`, `VR3-010`) | Не утримувати shared lock під час Gmail або Telegram I/O; assert нуль realtime `UserLock` calls |
| 3 | до v55 | Одна Gmail-подія могла створювати duplicate notification | Повідомлення могло одночасно мати `INBOX` і `SENT`; delivery lanes не використовували єдиний eligibility invariant | v55 відкидає SENT copy на shared eligibility boundary і durable-mark-ить seen у realtime (`VR3-013`, `VR3-014`) | Проганяти один dedupe contract для realtime, retry і frozen backlog paths |

Заявлений OAuth callback diagnosis, попередні stale hash pins та історичний live retention result залишаються unverified, оскільки VR-003 не відтворював їх із primary runtime evidence (`VR3-012`, `VR3-022`, `VR3-024`).
