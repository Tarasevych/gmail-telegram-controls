# Засвоєні уроки VR-003

**Методика verification:** REQ-0004

1. Зберігати назву продуктової лінії **Versie 1**, доки власник прямо не авторизує наступну Versie.
2. Надавати кожному factual assertion атомарний claim ID, scope, status, evidence grade, limitation та immutable provenance.
3. Не підвищувати повторений transcript або postmortem текст вище E0 без primary evidence.
4. Compact-ити й deduplicate-ити card indexes перед кожним hard-capacity decision.
5. Не видаляти active Telegram card лише заради штучного звільнення capacity.
6. Використовувати короткі lane-specific claim/commit leases; не утримувати shared lock під час Gmail або Telegram I/O.
7. Застосовувати Gmail eligibility і dedupe на одній shared boundary для realtime, retry і frozen lanes.
8. Зберігати terminal duplicate decisions, щоб overlapping windows не доставляли ту саму Gmail-подію повторно.
9. Тестувати кожен виправлений read path, а не лише helper, який виконує compaction або filtering.
10. Pin-ити кожен release bundle exact hash і запускати tests плюс `PreflightOnly` до release mutation.
11. Виправляти stale pins новим immutable history commit, а не force/reset або обходом guard.
12. Розділяти local E3 tests, staging E4 checks і production E5 acceptance; проходження одного рівня не доводить наступний.

Ці правила походять із `VR3-007` до `VR3-017` та recommendations `VR3-028` до `VR3-032` у [claims.json](../../../../verification-reports/VR-003/claims.json).
