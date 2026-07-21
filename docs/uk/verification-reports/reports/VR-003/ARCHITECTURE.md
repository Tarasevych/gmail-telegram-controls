# Архітектурна характеристика VR-003

**Методика verification:** REQ-0004

## Realtime-смуга доставки

Хвилинний trigger виконує bounded realtime fan-out перед maintenance і frozen recovery (`VR3-002`). Поточна смуга зберігає per-connection state і використовує bounded 15-хвилинне вікно, overlap, lag, ліміт 25 повідомлень та bounded retries (`VR3-003`). Починаючи з v48, claim/commit/release використовує короткий `ScriptLock` із per-lane lease; Gmail і Telegram I/O не утримує legacy `UserLock` (`VR3-009`, `VR3-010`).

Версії: v48 запровадила підтверджену ізоляцію lock; invariant присутній у поточному кандидатові v55. Точна перша версія кожної realtime-константи не перевірена.

## Frozen backlog scanner

Frozen scanner є bounded, crash-resumable механізмом backfill і не є realtime-смугою (`VR3-004`). Він працює після realtime path і зберігає окрему recovery semantics.

Версії: scanner присутній у поточному кандидатові v55 та історичній лінії v42-v54. Точна версія першого впровадження не перевірена VR-003.

## Telegram card index і capacity

Card index compact-иться перед capacity checks: duplicate keys і keys без records видаляються, а live records зберігаються (`VR3-007`). v47 виправила дефект raw-index capacity та пропущений read у reservation path (`VR3-008`). Одна Gmail-подія резервує одну фізичну картку, а не окрему картку для кожного view (`VR3-006`).

Версії: v47 виправила capacity accounting; invariant збережений у v55.

## Retention і purge

Retention є bounded. Локальний record від'єднується лише за definitive Telegram result `delete_too_old`; інші failures залишаються fail-closed (`VR3-011`). Заявлений у transcript live-результат `72 до 60` незалежно не перевірявся і залишається unverified (`VR3-012`).

Версії: v50 реалізувала підтверджену retention-поведінку. Її runtime-ефективність у поточному production-стані не перевірена.

## Multi-account fan-out

`activeConnectionId` визначає UI-контекст. `notificationConnectionIds` визначає акаунти, що беруть участь в automatic fan-out (`VR3-005`). Account identity і connection-scoped callbacks зберігають контекст, а physical-card invariant запобігає копії картки для кожного view (`VR3-006`).

Версії: це розділення підтверджене у поточному кандидатові v55. Transcript не містить достатнього первинного доказу, щоб віднести перше впровадження до однієї точної попередньої версії.

## Release-процес

Release helper pin-ить rollback v50, legacy staging v54 і candidate v55 за exact SHA-256 bundle (`VR3-020`). Hash checks виконуються до StageOnly або Promote; звичайний preflight не змінює stable rollback (`VR3-023`). `PreflightOnly` для v55 пройдено без mutation (`VR3-017`). Release-операція v55 не виконувалася (`VR3-018`).

Версії: v50 є report-backed stable baseline, v54 є report-backed legacy staging immutable, v55 є протестованим кандидатом. Їхній live deployment state не перечитувався у VR-003.
