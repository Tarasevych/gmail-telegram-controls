# Aудит неробочих функцій (v45) — список на виправлення

## Джерело
- [C:/Users/t/Documents/Telegram/gmail-telegram-v45-gentle-milestones/docs/audit/neuroinclusive-roadmap-status-v45.md](/C:/Users/t/Documents/Telegram/gmail-telegram-v45-gentle-milestones/docs/audit/neuroinclusive-roadmap-status-v45.md)
- Секція: `Verified implementation matrix`

## Недостатні / неімплементовані функції

1. **Gmail event ingestion durability (`watch` + dedupe/state checkpoints)**
   - Статус: **Missing**
   - Коментар: немає активного durable worker layer у поточному коді.
   - Пріоритет: **P0**

2. **Explicit webhook signature/replay controls**
   - Статус: **Missing**
   - Коментар: потрібна окрема задача на жорстке hardened ingress.
   - Пріоритет: **P1**

3. **Explicit Calendar-aware `до наступної зустрічі` preset**
   - Статус: **Missing**
   - Коментар: відсутній trusted Calendar availability contract у baseline.
   - Пріоритет: **P1**

4. **Read-only noise classification + user-confirmed rule suggestion**
   - Статус: **Missing**
   - Коментар: ще не реалізовано як явна shipped-функція.
   - Пріоритет: **P1**

5. **Optional learned personalization (time-of-day/avoidance patterns)**
   - Статус: **Missing**
   - Коментар: поточна адаптація наразі лише preference-driven.
   - Пріоритет: **P2**

## Примітка
- Цей список сформовано на основі локального аудиту в поточному робочому дереві.