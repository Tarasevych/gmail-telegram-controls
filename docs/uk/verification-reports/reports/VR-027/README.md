# VR-027 — Керовані desktop panes

- **Загальний статус:** PARTIAL
- **Дата:** 2026-07-23
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Workstream:** V3 `E-02`
- **Product task:** `B1-36`
- **Issue:** `GT-056`
- **English mirror:** [English report](../../../../en/verification-reports/reports/VR-027/README.md)

## Атомарне твердження

До цього інкременту desktop grid використовував фіксовані `--rail-w` і `--list-w`. Чинний source не надавав resize handles, collapse-to-icons або account-scoped відновлення ширини після restart.

## Реалізація

Додано єдиний desktop-pane layout controller:

- два видимі лише на desktop `role="separator"` controls;
- pointer drag і клавіші `ArrowLeft`, `ArrowRight`, `Home`, `End`, `Space` та `Enter`;
- детерміновані min/max bounds зі збереженням мінімальної ширини reader;
- згортання sidebar до піктограм і відновлення попередньої expanded width;
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`, видимий focus і підписана collapse-кнопка;
- persistence через чинні `p0CurrentNamespace`, `p0ReadRecord` і `p0WriteRecord`;
- bounded memory-only fallback, якщо scoped IndexedDB недоступний.

Контур не використовує `localStorage`/`sessionStorage`, не створює паралельну account model і не запускає RPC, reload, OAuth або Gmail mutation. Mobile drawer behavior не змінено.

## Доказ

Focused Mail App suite після реалізації пройшов `90/90`. Behavioral contract перевіряє bounds, collapse/restore, keyboard semantics, ARIA contract, account-scoped persistence helpers, mobile breakpoint і відсутність небезпечного storage/RPC/reload.

Повний Apps Script suite, bilingual, knowledge-hub, verification-report, release-state, diff і sensitive-pattern gates є обов’язковими перед публікацією.

## Межа перевірки

Source implementation і focused behavioral contract мають доказ. Native Telegram Desktop/WebView pointer drag, keyboard navigation, visual layout і IndexedDB restore після restart лишаються `UNVERIFIED`; тому загальний статус `PARTIAL`.

Production v65, staging, immutable history, Telegram menu, OAuth і Gmail цим інкрементом не змінюються.
