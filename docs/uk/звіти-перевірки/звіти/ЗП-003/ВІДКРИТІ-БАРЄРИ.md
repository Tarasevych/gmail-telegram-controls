# Відкриті gates VR-003

**Методика verification:** REQ-0004

| Gate | Статус | Необхідний доказ |
|---|---|---|
| Створити immutable v55 | не виконано | owner-authorized release action та immutable deployment readback |
| Stage v55 | не виконано | StageOnly result, exact deployment ID та post-stage readback |
| Production promotion | заблоковано release boundary | explicit owner authorization, Promote result та rollback confirmation |
| One-card production acceptance | blocked | controlled Gmail event, рівно одна Telegram card, правильний account marker та перевірка actions |
| Acceptance другого Gmail account | blocked на user-specific Google consent | користувач завершує consent, коли Google його покаже, далі callback і account-state verification |
| OAuth relay diagnosis | unverified | controlled callback trace без secrets і matched runtime evidence |
| Historical live v50/v54 state | partial | новий read-only deployment і Script Properties readback |
| Попередній stale-hash diagnosis | unverified | відповідний immutable Git або release-log evidence |

VR-003 навмисно зупиняється перед цими gates. Локальні tests і `PreflightOnly` є E3 evidence, а не production proof.
