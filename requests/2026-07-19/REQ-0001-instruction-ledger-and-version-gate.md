# REQ-0001: Початковий журнал і gate наступної Versie / Initial ledger and next-Versie gate

- ID: REQ-0001
- Received: 2026-07-19
- Status: superseded
- Active Versie: Versie 1
- Next Versie authorization: no
- Sensitive data persisted: no
- Routes: requests=record; instructions=update; permissions=no-change; plan=no-change; product=no-change; release=no-change
- Permission basis: none
- Superseded by: REQ-0002

<!-- lang:uk -->
## Українською

## Історичне рішення

Запит створив гілку `Інструкції`, первинний двомовний журнал і заборону нової Versie без прямого наказу. Рішення про gate Versie та обов'язкову фіксацію звернень залишається чинним. Частину про спільне зберігання інструкцій та історії замінено REQ-0002: канонічний журнал тепер міститься окремо в `Запити`.

## Докази

- `8667248`: первинний журнал та CI.
- `d3cf37e`: первинний bootstrap.
- `8d4c3b9`, `09a9cbd`, `149b7b6`: поширення bootstrap.
- `a3400e4`: завершення первинного запиту.
- REQ-0002 зберігає наступне структурне рішення без видалення цієї історії.

<!-- lang:en -->
## English

## Historical decision

This request created `Інструкції`, the initial bilingual ledger, and the prohibition on a new Versie without a direct order. The Versie gate and mandatory request capture remain in force. REQ-0002 supersedes only the combined storage model: canonical request history now lives separately on `Запити`.

## Evidence

- `8667248`: initial ledger and CI.
- `d3cf37e`: initial bootstrap.
- `8d4c3b9`, `09a9cbd`, and `149b7b6`: bootstrap propagation.
- `a3400e4`: initial request completion.
- REQ-0002 preserves the subsequent structural decision without deleting this history.