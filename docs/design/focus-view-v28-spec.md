# Focus View v28 design specification

References:

- `focus-view-desktop-v28.png` — 1488×1058 desktop concept.
- `focus-view-mobile-v28.png` — 853×1857 mobile concept.

## Product hierarchy

The recognizable Gmail skeleton remains intact. Focus View is a working mode inside the mail client, not a dashboard or a replacement inbox.

1. Resume Rail: `Продовжити з місця, де зупинились`.
2. Sender identity and original message metadata.
3. Trust layer: `AI-підсумок`, confidence, and `Джерела`.
4. Editable `Наступний крок`.
5. Persistent triage: `Дія`, `Чекаю`, `Інфо`, `Пізніше`.
6. Original message, visually faithful and always accessible.
7. Exactly three primary actions: `Зробити`, `Відповісти`, `Відкласти`.

## Design tokens

- Background: true white `#ffffff`.
- Primary: Gmail blue `#0b57d0` / selected surface `#eaf2ff`.
- Text: `#1f1f1f`; muted `#5f6368`; dividers `#dfe3e7`.
- Triage: action blue, waiting orange, info cyan-blue, later violet.
- Radius: 8px controls, 12px assist surface; no giant rounded wrappers.
- Type: system sans; 14px control labels, 16px body, 22–30px subject depending on viewport.
- Touch target: minimum 44px; focus ring 2px blue with visible offset.
- Motion: 160–200ms state transitions; disabled when `prefers-reduced-motion` is set.

## Responsive model

- Desktop keeps sidebar, bounded Focus list, reader, and a narrow Resume Rail.
- Mobile uses one scrollable reader. Resume Rail is inline at the top; the three actions remain sticky at the bottom.
- No nested page scroll trap. The original email remains in the same reader flow.

## Allowed visible copy

`Фокус`, `AI-підсумок`, `Впевненість`, `Джерела`, `Наступний крок`, `Дія`, `Чекаю`, `Інфо`, `Пізніше`, `Показати оригінальний лист`, `Продовжити з місця, де зупинились`, `Зробити`, `Відповісти`, `Відкласти`.

The generated concepts contain a few rasterized spelling imperfections. The code-native implementation must use the exact strings above.
