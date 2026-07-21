# Історія випусків VR-003

**Методика verification:** REQ-0004

Усі рядки належать до єдиної продуктової лінії **Versie 1**. Внутрішні позначки vNN є історичними engineering checkpoints, а не паралельними поточними продуктовими випусками.

| Позначка | Підтверджений внесок | Статус VR-003 |
|---|---|---|
| v42-v46 | Історична лінія існує, але точні внески кожної версії не повністю встановлені primary evidence у VR-003 | partial |
| v47 | Card-index compaction перед capacity guard і reservation | підтверджено Git і тестами |
| v48 | Realtime lock isolation із коротким script lock та per-lane lease | підтверджено Git і тестами |
| v50 | Bounded retention і definitive `delete_too_old` detach behavior | підтверджено Git і тестами; поточний live state не перевірено повторно |
| v54 | Historical immutable/staging і staging-only mutation surface | report-backed; поточний live state не перевірено повторно |
| v55 | Shared SENT eligibility, durable realtime seen state, видалення mutation surface, 432/432 tests, успішний `PreflightOnly` | verified candidate; VR-003 його не deploy-ив |

Поточний helper pin-ить rollback v50, legacy staging v54 і candidate v55 exact hashes (`VR3-020`, `VR3-023`). Створення immutable v55, staging, promotion або оголошення production acceptance потребують окремої owner-authorized release action (`VR3-018`, `VR3-026`).
