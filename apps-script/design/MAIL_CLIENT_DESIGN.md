# Gmail client inside Telegram — design specification

Concept image: `mail-client-concept.png`

## Product model

The bot has two coordinated surfaces:

1. Telegram topics are the live notification and activity layer.
2. The Telegram Mini App is the complete Gmail browser and composer. Gmail remains the source of truth.

No mailbox action opens a confirmation modal. A successful action returns a short transient server toast, removes the row from the current view, and offers Undo when the Gmail operation is reversible.

## Information architecture

Primary navigation labels:

- Пошта Павла
- Вхідні
- Надіслані
- Чернетки
- Архів
- Кошик
- Спам
- Усі листи
- Важливі
- Із зірочкою
- Мітки

Primary commands:

- Пошук
- Оновити
- Новий лист
- Відповісти
- Переслати
- Архівувати
- До кошика
- Спам
- Відписатися
- Позначити прочитаним / непрочитаним
- Додати / прибрати зірочку
- Застосувати мітку
- Відкрити в Gmail

## Layout

### Desktop

Three-pane open layout without nested cards:

- 220 px folder and label rail;
- 360–400 px message list with 1 px row dividers;
- flexible thread reader with a compact action toolbar.

### Mobile

- compact app bar with navigation, search, refresh and compose;
- folders in a slide-in drawer;
- message list as full-width rows;
- thread opens as a dedicated screen;
- compose/reply opens as a bottom sheet or full-screen sheet.

## Message row

- 36–40 px sender avatar or monogram;
- sender name and optional email;
- subject;
- two-line Ukrainian summary;
- timestamp;
- unread dot and semibold type when unread;
- star and attachment indicators;
- no decorative chips unless they communicate an actual Gmail state.

## Thread view

- subject and Gmail state;
- sender, recipient details and exact timestamp;
- Ukrainian whole-thread summary;
- one-tap copy for verification codes;
- sanitized original message with contextual links;
- attachments rail;
- collapsed quoted history;
- reply/forward and mailbox toolbar.

## Compose and reply

- Кому, Копія / Прихована копія, Тема;
- rich-text body with paragraph/heading styles, fonts, sizes, emphasis, colors, alignment, lists, quotes, tables, links and inline images;
- ordered attachment gallery with duplicate-safe identity, type icon, image/PDF preview and one-click removal;
- sources: device, Google Drive read-only picker, and guarded direct public HTTPS URL;
- insert an attachment reference at the current caret position;
- minimize/close only after acknowledged Gmail draft persistence;
- Зберегти чернетку;
- Надіслати.

Private OneDrive access is a separate integration phase because it requires a Microsoft Entra app registration, owner OAuth consent and delegated `Files.Read`. A public direct-download URL can use the guarded HTTPS source path; the UI must never imply that a private OneDrive account is connected before OAuth is configured.

## Visual system

- Background: `#ffffff`.
- Secondary rail / hover: `#f7f9fc` / `#eef4ff`.
- Primary text: `#172033`.
- Muted text: `#667085`.
- Border: `#e4e9f0`.
- Primary action: Telegram blue `#2481cc`.
- Destructive action: Gmail red `#d93025`.
- Warning / importance: `#f9ab00`.
- Success: `#188038`.
- Radius: 8 px controls, 12 px sheets, no giant rounded containers.
- Typography: system sans, 12–18 px UI scale, 20–24 px screen titles.
- Icons: one coherent outline family, approximately 20 px and 1.75 px stroke.

## Motion and feedback

- 160–220 ms row and pane transitions;
- transient bottom snackbar for success or error;
- Gmail move actions optimistically remove the current row only after the server returns success;
- Undo is shown for archive, trash, spam and read/star changes;
- respect `prefers-reduced-motion`.

## Telegram topic model

Permanent topics:

- 📥 Вхідні
- 📤 Надіслані
- 📝 Чернетки
- 🗄 Архів
- 🗑 Кошик
- 🚫 Спам
- ⭐ Важливі
- ⚙️ Система

Custom Gmail labels remain in the Mini App instead of creating an unbounded Telegram topic set.
