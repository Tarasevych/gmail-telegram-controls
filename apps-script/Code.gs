const CONFIG = Object.freeze({
  POLL_MINUTES: 1,
  MAX_SUMMARY_CHARS: 560,
  MAX_ACTION_CHARS: 260,
  MAX_ATTACHMENT_BYTES: 18 * 1024 * 1024,
  MAX_EML_BYTES: 30 * 1024 * 1024,
  MAX_RICH_HTML_CHARS: 28000,
  MAX_RICH_BLOCKS: 400,
  SEEN_IDS_LIMIT: 500,
  // A frozen, bounded Gmail scan processes one page per minute. Its exact
  // crash-recovery ledger is chunked at this same size, so token restarts and
  // verification passes remain duplicate-free even beyond 500 messages.
  GMAIL_NOTIFICATION_PAGE_SIZE: 100,
  GMAIL_NOTIFICATION_SAFETY_LAG_MS: 2 * 1000,
  GMAIL_NOTIFICATION_INITIAL_OVERLAP_MS: 5 * 60 * 1000,
  GMAIL_NOTIFICATION_QUARANTINE_LIMIT: 60,
  GMAIL_NOTIFICATION_QUARANTINE_RETRY_BATCH: 5,
  GMAIL_NOTIFICATION_QUARANTINE_MAX_ATTEMPTS: 8,
  GMAIL_NOTIFICATION_QUARANTINE_MAX_DELAY_MS: 6 * 60 * 60 * 1000,
  // Keep worst-case durable payloads comfortably below Apps Script's shared
  // Script Properties quota alongside the card and topic ledgers.
  TELEGRAM_UPDATE_IDS_LIMIT: 40,
  TELEGRAM_UPDATE_LEASE_MS: 2 * 60 * 1000,
  TELEGRAM_UPDATE_MAX_ATTEMPTS: 5,
  TELEGRAM_UPDATE_PAYLOAD_MAX_CHARS: 3500,
  // Script Properties documents a 9 KB value ceiling. Keep every JSON value
  // below 8.5 KB so UTF-8 expansion and future fields retain safe headroom.
  TELEGRAM_PROPERTY_MAX_BYTES: 8500,
  TELEGRAM_PROPERTY_STORE_SAFE_BYTES: 450 * 1024,
  TELEGRAM_MAIL_REPLY_MARKUP_MAX_BYTES: 6000,
  TELEGRAM_UPDATE_ACTIVE_HARD_LIMIT: 32,
  TELEGRAM_CARD_LEDGER_LIMIT: 60,
  TELEGRAM_CARD_LEDGER_ACTIVE_HARD_LIMIT: 72,
  TELEGRAM_MAIL_CARD_HARD_LIMIT: 72,
  TELEGRAM_MAIL_STATE_SYNC_BATCH: 5,
  // Gmail History is the primary near-real-time path. A sparse rotating sweep
  // remains only as recovery insurance and must not consume the consumer Apps
  // Script daily URLFetch/runtime/property quotas every minute.
  TELEGRAM_MAIL_FALLBACK_SYNC_INTERVAL_MS: 15 * 60 * 1000,
  GMAIL_HISTORY_SYNC_CARD_LIMIT: 20,
  GMAIL_HISTORY_SYNC_PAGE_LIMIT: 2,
  // Chat-native browsing may request a large logical Gmail page, but renders
  // only ten rows at once. This keeps Telegram text/markup bounded and caps a
  // callback at one list call plus one bounded metadata batch.
  TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS: 10,
  TELEGRAM_MAIL_BROWSE_STATE_LIMIT: 12,
  TELEGRAM_MAIL_BROWSE_STATE_TTL_MS: 30 * 60 * 1000,
  TELEGRAM_MAIL_BROWSE_PREVIOUS_TOKEN_LIMIT: 3,
  TELEGRAM_MAIL_DELIVERY_RESERVATION_MS: 5 * 60 * 1000,
  TELEGRAM_MAIL_RECONCILE_ACTIVE_HARD_LIMIT: 24,
  MAIL_REMINDER_LEDGER_HARD_LIMIT: 72,
  MAIL_REMINDER_ACCOUNT_ACTIVE_LIMIT: 24,
  MAIL_REMINDER_USER_TOTAL_LIMIT: 48,
  MAIL_REMINDER_SCAN_LIMIT: 12,
  MAIL_REMINDER_LEASE_MS: 2 * 60 * 1000,
  MAIL_REMINDER_SOFT_DELAY_MS: 24 * 60 * 60 * 1000,
  MAIL_REMINDER_SOFT_DIGEST_DELAY_MS: 24 * 60 * 60 * 1000,
  MAIL_REMINDER_URGENT_DELAY_MS: 2 * 60 * 60 * 1000,
  MAIL_REMINDER_LATER_DELAY_MS: 24 * 60 * 60 * 1000,
  MAIL_REMINDER_SUPPRESSION_TTL_MS: 365 * 24 * 60 * 60 * 1000,
  MAIL_REMINDER_MAX_ATTEMPTS: 8,
  TELEGRAM_CARD_MOVE_MAX_ATTEMPTS: 6,
  // Gmail's public API can search native snoozed mail but does not expose a
  // mutable snooze endpoint. These limits therefore protect the bot-managed
  // schedule described by BOT_SNOOZE_LABEL_NAME below.
  // Sixty remains the legacy reader/worker ceiling so already-persisted work
  // is never stranded after an upgrade. New work uses the smaller shared
  // tracked ceiling below: at maximum-length Gmail IDs both durable indices
  // then remain safely below the per-value limit.
  BOT_SNOOZE_ACTIVE_HARD_LIMIT: 60,
  BOT_SNOOZE_TRACKED_HARD_LIMIT: 48,
  BOT_SNOOZE_MIN_DELAY_MS: 60 * 1000,
  BOT_SNOOZE_MAX_DELAY_MS: 365 * 24 * 60 * 60 * 1000,
  BOT_SNOOZE_LEASE_MS: 2 * 60 * 1000,
  BOT_SNOOZE_MAX_ATTEMPTS: 8,
  BOT_SNOOZE_REPAIR_HARD_LIMIT: 48,
  // Every newly accepted schedule carries this removable padding. Moving an
  // exhausted operation to the repair registry first removes the padding,
  // leaving enough already-reserved store space for the repair record and its
  // enlarged index even if unrelated guarded state grew in the meantime.
  BOT_SNOOZE_REPAIR_RESERVE_CHARS: 3000,
  SEARCH_QUERY: 'in:inbox newer_than:2d',
  GMAIL_ACCOUNT: 'tarasevych.pavlo@gmail.com',
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z/exec',
  CONTROL_PAGE_URL: 'https://tarasevych.github.io/gmail-telegram-controls/',
  CONTROL_PAGE_REVISION: 'versie-001-20260720-oauth-relay2',
  // Apps Script can retain a warm doPost runtime for an unchanged deployment
  // URL. Bump this with each backend release so Telegram reaches the deployed
  // code instead of generating mail cards from an older runtime.
  WEBHOOK_REVISION: '20260720-02',
  QUIET_HOURS_START: 22,
  QUIET_HOURS_END: 8,
});

const BOT_UI = Object.freeze({
  CHECK_TEXT: '🔄 Перевірити пошту зараз',
  STATUS_TEXT: '📊 Статус',
  MENU_TEXT: '☰ Меню',
  FOLDERS_TEXT: '📂 Папки',
  BROWSE_TEXT: '📬 Листи в чаті',
  FOCUS_TEXT: '🎯 Пріоритети',
  CHECK_ACTION: 'mail.check',
  STATUS_ACTION: 'mail.status',
  SETTINGS_ACTION: 'mail.settings',
  ACCOUNT_PREFIX: 'ga.',
  HELP_ACTION: 'mail.help',
  FOLDERS_ACTION: 'mail.folders',
  BROWSE_ACTION: 'mail.browse',
  BROWSE_PREFIX: 'b.',
  EML_PREFIX: 'mail.eml:',
  ORIGINAL_PREFIX: 'mail.original:',
  ATTACHMENT_PREFIX: 'mail.att:',
  ORIGINAL_MULTI_PREFIX: 'o2.',
  EML_MULTI_PREFIX: 'e2.',
  ATTACHMENT_MULTI_PREFIX: 'a2.',
  UNSUBSCRIBE_UNAVAILABLE_ACTION: 'mail.unsub_na',
  MAILBOX_PREFIX: 'm.',
  MAILBOX_MULTI_PREFIX: 'm2.',
  FOCUS_MULTI_PREFIX: 'pf2.',
  FOCUS_RULE_MULTI_PREFIX: 'r2.',
  REMINDER_PREFIX: 'rm2.',
  NOOP_ACTION: 'mail.noop',
});

const TELEGRAM_FOCUS_ACTIONS = Object.freeze({
  menu: 'm',
  critical: 'c',
  high: 'h',
  medium: 'v',
  low: 'l',
  none: 'n',
  back: 'b',
});

const TELEGRAM_FOCUS_RULE_ACTIONS = Object.freeze({
  list: 'l',
  select: 's',
  toggle: 't',
  delete: 'd',
  confirmDelete: 'c',
  page: 'p',
});

const MAILBOX_CALLBACK_CODES = Object.freeze({
  archive: 'a',
  trash: 't',
  spam: 's',
  unsubscribe: 'u',
  inbox: 'i',
  untrash: 'r',
  notSpam: 'n',
  read: 'd',
  unread: 'e',
  star: 'f',
  unstar: 'x',
  important: 'p',
  notImportant: 'o',
});

const TELEGRAM_MAIL_BROWSE_PAGE_SIZES = Object.freeze([10, 20, 30, 40, 50, 60, 70, 90, 100]);
const TELEGRAM_MAIL_BROWSE_PERIODS = Object.freeze({
  '1d': { label: 'сьогодні', query: 'newer_than:1d' },
  '2d': { label: '2 дні', query: 'newer_than:2d' },
  '7d': { label: '7 днів', query: 'newer_than:7d' },
  '30d': { label: '30 днів', query: 'newer_than:30d' },
  '90d': { label: '90 днів', query: 'newer_than:90d' },
  all: { label: 'увесь час', query: '' },
});
const TELEGRAM_MAIL_BROWSE_FOLDERS = Object.freeze({
  inbox: { label: '📥 Вхідні', labelId: 'INBOX', query: '' },
  unread: { label: '📩 Непрочитані', labelId: '', query: 'is:unread -in:spam -in:trash' },
  all: { label: '📚 Уся пошта', labelId: '', query: '-in:spam -in:trash' },
  sent: { label: '📤 Надіслані', labelId: 'SENT', query: '' },
  drafts: { label: '📝 Чернетки', labelId: 'DRAFT', query: '' },
  snoozed: { label: '🕘 Відкладені', labelId: '', query: 'in:snoozed' },
  archive: {
    label: '🗄 Архів',
    labelId: '',
    query: '-in:inbox -in:sent -in:drafts -in:snoozed -in:spam -in:trash',
  },
  trash: { label: '🗑 Кошик', labelId: 'TRASH', query: '' },
  spam: { label: '🚫 Спам', labelId: 'SPAM', query: '' },
  starred: { label: '⭐ Із зірочкою', labelId: 'STARRED', query: '' },
  important: { label: '❗ Важливі', labelId: 'IMPORTANT', query: '' },
  primary: { label: '📨 Основні', labelId: 'CATEGORY_PERSONAL', query: '' },
  social: { label: '👥 Соцмережі', labelId: 'CATEGORY_SOCIAL', query: '' },
  promotions: { label: '🏷 Реклама', labelId: 'CATEGORY_PROMOTIONS', query: '' },
  updates: { label: '🔔 Оновлення', labelId: 'CATEGORY_UPDATES', query: '' },
  forums: { label: '💬 Форуми', labelId: 'CATEGORY_FORUMS', query: '' },
});

// Index topics expose Mini App views but never receive duplicate mail cards;
// canonical topics own the single movable Telegram representation of a card.
const TELEGRAM_MAIL_TOPICS = Object.freeze({
  inbox: { name: '📥 Вхідні', color: 0x6FB9F0, role: 'canonical', folder: 'inbox' },
  sent: { name: '📤 Надіслані', color: 0x8EEE98, role: 'canonical', folder: 'sent' },
  drafts: { name: '📝 Чернетки', color: 0xCB86DB, role: 'canonical', folder: 'drafts' },
  snoozed: { name: '🕘 Відкладені', color: 0xFFD67E, role: 'canonical', folder: 'snoozed' },
  archive: { name: '🗄 Архів', color: 0xFFD67E, role: 'canonical', folder: 'archive' },
  trash: { name: '🗑 Кошик', color: 0xFF93B2, role: 'canonical', folder: 'trash' },
  spam: { name: '🚫 Спам', color: 0xFF93B2, role: 'canonical', folder: 'spam' },
  starred: { name: '⭐ Позначені', color: 0xFFD67E, role: 'index', folder: 'starred' },
  important: { name: '❗ Важливі', color: 0xFFD67E, role: 'index', folder: 'important' },
  all: { name: '📚 Уся пошта', color: 0x6FB9F0, role: 'index', folder: 'all' },
  system: { name: '⚙️ Система', color: 0x6FB9F0, role: 'index', folder: '' },
});

const TELEGRAM_TOPIC_STATE_VERSION = 1;
const TELEGRAM_TOPIC_TOPOLOGY_VERSION = 2;
const TELEGRAM_CARD_STATE_VERSION = 1;
const GMAIL_NOTIFICATION_SCAN_VERSION = 1;
const GMAIL_NOTIFICATION_WATERMARK = 'GMAIL_NOTIFICATION_WATERMARK_MS';
const GMAIL_NOTIFICATION_SCAN = 'GMAIL_NOTIFICATION_SCAN_V1';
const GMAIL_NOTIFICATION_PAGE_DONE = 'GMAIL_NOTIFICATION_PAGE_DONE_V1';
const GMAIL_NOTIFICATION_SCAN_DONE_PREFIX = 'GMAIL_NOTIFICATION_SCAN_DONE_V1_';
const GMAIL_NOTIFICATION_QUARANTINE = 'GMAIL_NOTIFICATION_QUARANTINE_V1';
const GMAIL_NOTIFICATION_SCOPE_PREFIX = 'GMAIL_NOTIFICATION_SCOPE_V1_';
const GMAIL_MULTI_NOTIFICATION_CURSOR = 'GMAIL_MULTI_NOTIFICATION_CURSOR_V1';
const TELEGRAM_CARD_MOVE_ABANDONED_AUDIT = 'TELEGRAM_CARD_MOVE_ABANDONED_AUDIT_V1';

function gmailNotificationScope_(value) {
  if (!value || !String(value.connectionId || '')) return null;
  const userId = String(value.userId || '');
  const chatId = String(value.chatId || userId);
  const connectionId = String(value.connectionId || '');
  if (!/^\d{1,24}$/.test(userId) || !/^\d{1,24}$/.test(chatId) ||
      !/^[A-Za-z0-9_-]{3,80}$/.test(connectionId)) {
    throw new Error('Некоректна область Gmail-сповіщень.');
  }
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    userId + ':' + chatId + ':' + connectionId,
    Utilities.Charset.UTF_8
  );
  return {
    userId,
    chatId,
    connectionId,
    notificationMode: ['all', 'important', 'none'].indexOf(String(value.notificationMode || 'all')) !== -1
      ? String(value.notificationMode || 'all') : 'all',
    account: value.account && typeof value.account === 'object' ? value.account : {},
    token: bytesToHex_(digest).slice(0, 20),
  };
}

function gmailNotificationScopedSuffix_(virtualName) {
  const name = String(virtualName || '');
  if (name === 'STARTED_AT') return 'T';
  if (name === 'SEEN_MESSAGE_IDS') return 'S';
  if (name === GMAIL_NOTIFICATION_WATERMARK) return 'W';
  if (name === GMAIL_NOTIFICATION_SCAN) return 'N';
  if (name === GMAIL_NOTIFICATION_PAGE_DONE) return 'P';
  if (name === GMAIL_NOTIFICATION_QUARANTINE) return 'Q';
  if (name.indexOf(GMAIL_NOTIFICATION_SCAN_DONE_PREFIX) === 0 &&
      /^\d+$/.test(name.slice(GMAIL_NOTIFICATION_SCAN_DONE_PREFIX.length))) {
    return 'D' + name.slice(GMAIL_NOTIFICATION_SCAN_DONE_PREFIX.length);
  }
  if (/^LAST_CHECK_[A-Z0-9_]{1,64}$/.test(name)) return 'L' + name.slice('LAST_CHECK_'.length);
  return '';
}

function gmailNotificationVirtualName_(suffix) {
  const value = String(suffix || '');
  if (value === 'T') return 'STARTED_AT';
  if (value === 'S') return 'SEEN_MESSAGE_IDS';
  if (value === 'W') return GMAIL_NOTIFICATION_WATERMARK;
  if (value === 'N') return GMAIL_NOTIFICATION_SCAN;
  if (value === 'P') return GMAIL_NOTIFICATION_PAGE_DONE;
  if (value === 'Q') return GMAIL_NOTIFICATION_QUARANTINE;
  if (/^D\d+$/.test(value)) return GMAIL_NOTIFICATION_SCAN_DONE_PREFIX + value.slice(1);
  if (/^L[A-Z0-9_]{1,64}$/.test(value)) return 'LAST_CHECK_' + value.slice(1);
  return '';
}

function gmailNotificationScopedPropertyName_(scope, virtualName) {
  const normalized = gmailNotificationScope_(scope);
  if (!normalized) return String(virtualName || '');
  const suffix = gmailNotificationScopedSuffix_(virtualName);
  if (!suffix) return String(virtualName || '');
  return GMAIL_NOTIFICATION_SCOPE_PREFIX + normalized.token + '_' + suffix;
}

function gmailNotificationSafeSeenPropertyName_(value) {
  const name = String(value || 'SEEN_MESSAGE_IDS');
  return name === 'SEEN_MESSAGE_IDS' ||
    new RegExp('^' + GMAIL_NOTIFICATION_SCOPE_PREFIX + '[a-f0-9]{20}_S$').test(name)
    ? name : '';
}

function gmailNotificationProperties_(baseProperties, scopeValue) {
  const base = baseProperties || PropertiesService.getScriptProperties();
  const scope = gmailNotificationScope_(scopeValue);
  if (!scope) return base;
  const prefix = GMAIL_NOTIFICATION_SCOPE_PREFIX + scope.token + '_';
  const physicalName = name => gmailNotificationScopedPropertyName_(scope, name);
  return {
    getProperty(name) { return base.getProperty(physicalName(name)); },
    setProperty(name, value) { base.setProperty(physicalName(name), value); return this; },
    deleteProperty(name) { base.deleteProperty(physicalName(name)); return this; },
    setProperties(values, deleteAllOthers) {
      if (deleteAllOthers) throw new Error('Scoped Gmail properties cannot delete unrelated state.');
      Object.keys(values || {}).forEach(name => base.setProperty(physicalName(name), values[name]));
      return this;
    },
    getProperties() {
      const stored = base.getProperties() || {};
      // Preserve every other scope under its physical key so global storage
      // limits are never under-counted. Only the current scope is projected to
      // virtual names used by the existing scan helpers.
      const visible = Object.assign({}, stored);
      Object.keys(stored).forEach(name => {
        if (name.indexOf(prefix) !== 0) return;
        const virtualName = gmailNotificationVirtualName_(name.slice(prefix.length));
        if (virtualName) {
          delete visible[name];
          visible[virtualName] = stored[name];
        }
      });
      return visible;
    },
    scopedPhysicalName(name) { return physicalName(name); },
  };
}

// This is deliberately bot-managed snooze, not Gmail's native Snooze. The
// public Gmail API documents `in:snoozed` for search but no write endpoint for
// setting the native snooze timestamp. A dedicated user label keeps scheduled
// threads visible and makes timer recovery observable in Gmail itself.
// The public Gmail API has no supported endpoint for writing native Gmail
// Snooze state.
const BOT_SNOOZE_STATE_VERSION = 1;
const BOT_SNOOZE_INDEX = 'BOT_SNOOZE_INDEX_V1';
const BOT_SNOOZE_PROPERTY_PREFIX = 'BOT_SNOOZE_V1_';
const BOT_SNOOZE_REPAIR_INDEX = 'BOT_SNOOZE_REPAIR_INDEX_V1';
const BOT_SNOOZE_REPAIR_PROPERTY_PREFIX = 'BOT_SNOOZE_REPAIR_V1_';
const BOT_SNOOZE_LABEL_NAME = 'Telegram/Відкладені';

/**
 * Initial one-time setup. It deliberately starts from the current moment so
 * that old inbox messages do not flood Telegram.
 */
function setupNotifier_() {
  const props = PropertiesService.getScriptProperties();
  requireSetting_(props, 'BOT_TOKEN');
  requireSetting_(props, 'CHAT_ID');

  const startedAt = Date.now();
  props.setProperty('STARTED_AT', String(startedAt));
  props.setProperty('SEEN_MESSAGE_IDS', JSON.stringify([]));
  props.setProperty(GMAIL_NOTIFICATION_WATERMARK, String(startedAt));
  deleteScriptProperty_(props, GMAIL_NOTIFICATION_SCAN);
  clearGmailNotificationScanDone_(props);
  deleteScriptProperty_(props, GMAIL_NOTIFICATION_QUARANTINE);
  replaceMailCheckTrigger_();

  sendTelegramText_(
    '<b>✅ Gmail підключено</b>\n\n' +
    'Нові листи надходитимуть сюди приблизно протягом однієї хвилини.',
    replyKeyboard_(),
    systemTopicOptions_()
  );
}

/**
 * Safe upgrade entry point for an existing installation. Unlike setupNotifier_
 * it preserves STARTED_AT and SEEN_MESSAGE_IDS, so deploying a new version can
 * never replay the old inbox into Telegram.
 */
function migrateDeployment_() {
  const props = PropertiesService.getScriptProperties();
  requireSetting_(props, 'BOT_TOKEN');
  requireSetting_(props, 'CHAT_ID');

  // Recreate instead of retaining the old clock trigger. This preserves all
  // mailbox state while ensuring the timer is bound to the current project
  // code after an immutable web-app deployment update.
  replaceMailCheckTrigger_();

  if (!props.getProperty('STARTED_AT')) {
    props.setProperty('STARTED_AT', String(Date.now()));
  }
  if (!props.getProperty('SEEN_MESSAGE_IDS')) {
    props.setProperty('SEEN_MESSAGE_IDS', JSON.stringify([]));
  }
  initializeGmailNotificationWatermark_(props, Date.now());

  setupTelegramControls_();
  return {
    triggerHandler: 'checkNewMail_',
    statePreserved: true,
    webhook: verifyWebhookTransport_(),
    topicsStatus: props.getProperty('TELEGRAM_TOPICS_STATUS') || '',
  };
}

function replaceMailCheckTrigger_() {
  const oldTriggers = ScriptApp.getProjectTriggers()
    .filter(trigger => ['checkNewMail', 'checkNewMail_'].indexOf(trigger.getHandlerFunction()) !== -1);
  // Create first: a quota/auth/transient failure must leave the known working
  // trigger untouched. If later deletion is partial, the next migration safely
  // creates one replacement and removes every trigger it observed beforehand.
  const replacement = ScriptApp.newTrigger('checkNewMail_')
    .timeBased()
    .everyMinutes(CONFIG.POLL_MINUTES)
    .create();
  oldTriggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  return replacement;
}

/**
 * Run after deploying this project as a Web App. Persistent reply-keyboard
 * controls use the top-level Mini App, while per-message actions use native
 * Telegram callbacks so archive/trash/spam/unsubscribe never open a window.
 */
function setupTelegramControls_() {
  const props = PropertiesService.getScriptProperties();
  const chatId = requireSetting_(props, 'CHAT_ID');
  requireSetting_(props, 'BOT_TOKEN');
  ensureControlToken_(props);
  const webhookKey = ensureWebhookKey_(props);
  if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/i.test(CONFIG.WEB_APP_URL)) {
    throw new Error('CONFIG.WEB_APP_URL must contain the deployed /exec URL.');
  }

  const webhookUrl = nativeWebhookUrl_(webhookKey);
  const nativeWebhookWasReady = props.getProperty('NATIVE_CALLBACK_WEBHOOK_READY') === '1';
  telegramRequest_('setWebhook', {
    url: webhookUrl,
    allowed_updates: JSON.stringify(['message', 'callback_query']),
    // On the first callback migration, discard old button presses that Telegram
    // may have queued while no compatible webhook was available. Later setup
    // runs preserve fresh updates.
    drop_pending_updates: !nativeWebhookWasReady,
    max_connections: 1,
  });
  // Persist immediately after Telegram accepts the webhook. A later menu/topic
  // failure must not make a retry drop fresh owner commands or callbacks again.
  props.setProperty('WEBHOOK_URL', webhookUrl);
  props.setProperty('NATIVE_CALLBACK_WEBHOOK_READY', '1');
  telegramRequest_('deleteMyCommands', {
    scope: JSON.stringify({ type: 'chat', chat_id: chatId }),
  });
  telegramRequest_('setChatMenuButton', {
    chat_id: chatId,
    menu_button: JSON.stringify({
      type: 'web_app',
      text: '📬 Пошта',
      web_app: { url: mailboxAppUrl_() },
    }),
  });

  // Telegram topics are optional until Threaded Mode is enabled in BotFather.
  // Once enabled, this creates each permanent mail section exactly once.
  ensureTelegramMailTopics_();

  sendTelegramText_(
    '<b>📬 Керування Gmail увімкнено</b>\n\n' +
    'Кнопка <b>«Перевірити пошту зараз»</b> доступна під полем введення. ' +
    'Вона запускає захищену перевірку одразу, не очікуючи хвилинного таймера.',
    replyKeyboard_(),
    systemTopicOptions_()
  );
}

/**
 * Harmless deployment check: verifies that Telegram reaches the Web App with a
 * direct 2xx POST instead of the redirect returned by ContentService. The
 * private webhook key is never included in the result or logs.
 */
function verifyWebhookTransport_() {
  const props = PropertiesService.getScriptProperties();
  const webhookKey = ensureWebhookKey_(props);
  const response = UrlFetchApp.fetch(
    nativeWebhookUrl_(webhookKey),
    {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({}),
      followRedirects: false,
      muteHttpExceptions: true,
    }
  );
  const code = response.getResponseCode();
  const headers = response.getAllHeaders ? response.getAllHeaders() : {};
  const result = {
    ok: code >= 200 && code < 300,
    code,
    redirected: Boolean(headers.Location || headers.location),
    checkedAt: new Date().toISOString(),
  };
  props.setProperty('WEBHOOK_TRANSPORT_CHECK', JSON.stringify(result));
  console.log(JSON.stringify(result));
  return result;
}

function nativeWebhookUrl_(webhookKey) {
  return CONFIG.WEB_APP_URL + '?key=' + encodeURIComponent(String(webhookKey || '')) +
    '&rev=' + encodeURIComponent(String(CONFIG.WEBHOOK_REVISION || '1'));
}

/** Timer entry point. */
function checkNewMail_() {
  // Webhook failures and half-finished Telegram card moves are durable. The
  // minute trigger provides a bounded retry path without repeating Gmail work.
  try { retryFailedTelegramUpdates_(3); } catch (error) {
    console.error('Telegram update retry failed: ' + error);
  }
  try { retryPendingTelegramMailCardActions_(5); } catch (error) {
    console.error('Telegram Mini App reconciliation retry failed: ' + error);
  }
  try { reconcileTelegramMailCards_(5); } catch (error) {
    console.error('Telegram card reconciliation failed: ' + error);
  }
  try { processTelegramFocusReconciliations_(5); } catch (error) {
    console.error('Telegram focus reconciliation failed: ' + error);
  }
  try {
    if (typeof mailboxProcessMetadataReconciliations_ === 'function') {
      mailboxProcessMetadataReconciliations_(1);
    }
  } catch (error) {
    console.error('Per-account Gmail metadata reconciliation failed: ' + error);
  }
  try { syncTelegramMailCardsFromAllGmailHistory_(CONFIG.GMAIL_HISTORY_SYNC_CARD_LIMIT); } catch (error) {
    console.error('Gmail History synchronization failed: ' + error);
  }
  // Gmail History is authoritative for ordinary changes. The rotating metadata
  // sweep is deliberately sparse and exists only to heal a missed/expired
  // history edge without exhausting consumer Apps Script quotas.
  try { syncTelegramMailCardsFromGmailFallbackIfDue_(CONFIG.TELEGRAM_MAIL_STATE_SYNC_BATCH); } catch (error) {
    console.error('Gmail to Telegram state synchronization failed: ' + error);
  }
  try { purgeOldTelegramMailCards_(5); } catch (error) {
    console.error('Telegram mail-card retention cleanup failed: ' + error);
  }
  // Bot-managed snooze is processed independently. Every retry reads current
  // Gmail labels first, so a timer retry never blindly repeats a mailbox
  // mutation or replays unrelated mail actions.
  try { processDueBotManagedSnoozes_(10); } catch (error) {
    console.error('Bot-managed snooze processing failed: ' + error);
  }
  try {
    if (typeof mailboxProcessDueScheduledSends_ === 'function') {
      mailboxProcessDueScheduledSends_(3);
    }
  } catch (error) {
    console.error('Scheduled draft send processing failed: ' + error);
  }
  try { processCompassionateMailReminders_(2); } catch (error) {
    console.error('Compassionate reminder processing failed: ' + error);
  }
  try {
    if (typeof mailboxProcessExpiredFunctionalMetrics_ === 'function') {
      mailboxProcessExpiredFunctionalMetrics_();
    }
  } catch (error) {
    console.error('Private functional-metrics retention cleanup failed: ' + error);
  }
  try {
    if (typeof mailboxProcessGoogleRevocations_ === 'function') mailboxProcessGoogleRevocations_(1);
  } catch (error) {
    console.error('Gmail OAuth revocation cleanup failed: ' + error);
  }
  const legacyResult = (() => { return runMailCheck_('timer'); })();
  try { legacyResult.multiAccount = runMultiAccountMailChecks_(3); } catch (error) {
    console.error('Multi-account Gmail notification scan failed: ' + error);
    legacyResult.multiAccount = { failed: 1, processed: 0 };
  }
  return legacyResult;
}

function runMultiAccountMailChecks_(limitValue) {
  if (typeof mailboxMultiReadRegistry_ !== 'function' ||
      typeof withMailboxConnectionContext_ !== 'function') return { processed: 0, failed: 0, pending: 0 };
  const props = PropertiesService.getScriptProperties();
  const registry = mailboxMultiReadRegistry_(props);
  const work = [];
  const ownerId = String(mailboxOwnerId_());
  const legacyEmail = String(CONFIG.GMAIL_ACCOUNT || '').trim().toLowerCase();
  const scheduledMailboxes = new Set();
  (registry.preferences || []).forEach(preference => {
    const userId = String(preference.userId || '');
    const mode = String(preference.notifications || 'all');
    if (!/^\d{1,24}$/.test(userId) || mode === 'none') return;
    (preference.notificationConnectionIds || []).forEach(connectionIdValue => {
      const connectionId = String(connectionIdValue || '');
      if (!connectionId || connectionId === MAILBOX_MULTI_CONFIG_.LEGACY_CONNECTION_ID) return;
      const connection = (registry.connections || []).find(item =>
        String(item.id || '') === connectionId && String(item.status || '') === 'active');
      const member = connection && (registry.members || []).find(item =>
        String(item.zoneId || '') === String(connection.zoneId || '') &&
        String(item.userId || '') === userId && String(item.status || '') === 'active');
      if (!connection || !member) return;
      const connectionEmail = String(connection.email || '').trim().toLowerCase();
      const mailboxKey = userId + ':' + connectionEmail;
      // The owner mailbox is already scanned by runMailCheck_ above. A legacy
      // owner connection and a Google OAuth connection can temporarily point
      // at that same physical Gmail account; scanning both creates two cards.
      // Also collapse same-user/same-email connections across zones without
      // merging their permissions or deleting either connection record.
      if (!connectionEmail || (userId === ownerId && connectionEmail === legacyEmail) ||
          scheduledMailboxes.has(mailboxKey)) return;
      scheduledMailboxes.add(mailboxKey);
      work.push({
        userId,
        chatId: userId,
        connectionId,
        notificationMode: mode,
        account: {
          id: connectionId,
          email: connectionEmail,
          name: String(connection.displayName || connection.email || 'Gmail'),
          avatarUrl: String(connection.avatarUrl || ''),
        },
      });
    });
  });
  work.sort((a, b) => (a.userId + ':' + a.connectionId).localeCompare(b.userId + ':' + b.connectionId));
  if (!work.length) {
    deleteScriptProperty_(props, GMAIL_MULTI_NOTIFICATION_CURSOR);
    return { processed: 0, failed: 0, pending: 0 };
  }
  const limit = Math.max(1, Math.min(Number(limitValue) || 1, 5));
  const start = Math.max(0, Number(props.getProperty(GMAIL_MULTI_NOTIFICATION_CURSOR) || 0)) % work.length;
  let processed = 0;
  let failed = 0;
  for (let offset = 0; offset < Math.min(limit, work.length); offset += 1) {
    const scope = work[(start + offset) % work.length];
    try {
      withMailboxConnectionContext_(scope.userId, scope.connectionId, 'viewer', () =>
        runMailCheck_('timer', scope));
    } catch (error) {
      failed += 1;
      console.error('Scoped Gmail notification scan failed for ' + scope.connectionId + ': ' + error);
    }
    processed += 1;
  }
  props.setProperty(GMAIL_MULTI_NOTIFICATION_CURSOR, String((start + processed) % work.length));
  return { processed, failed, pending: Math.max(0, work.length - processed) };
}

function initializeGmailNotificationWatermark_(props, nowValue) {
  const now = Number(nowValue || Date.now());
  const stored = Number(props.getProperty(GMAIL_NOTIFICATION_WATERMARK) || 0);
  if (Number.isFinite(stored) && stored > 0 && stored <= now + 60 * 1000) return stored;

  const startedAt = Number(props.getProperty('STARTED_AT') || now);
  const lastCheckAt = Number(props.getProperty('LAST_CHECK_AT') || 0);
  const lastFailed = Number(props.getProperty('LAST_CHECK_FAILED') || 0);
  // A clean legacy poll may safely become the initial watermark with a small
  // overlap. If legacy delivery was failing, start from STARTED_AT instead:
  // possible duplicate prevention is secondary to never losing that mail.
  const legacyCandidate = lastFailed === 0 && lastCheckAt >= startedAt
    ? lastCheckAt - CONFIG.GMAIL_NOTIFICATION_INITIAL_OVERLAP_MS
    : startedAt;
  const watermark = Math.max(1, Math.min(now, Math.max(startedAt, legacyCandidate)));
  props.setProperty(GMAIL_NOTIFICATION_WATERMARK, String(watermark));
  deleteScriptProperty_(props, GMAIL_NOTIFICATION_SCAN);
  clearGmailNotificationScanDone_(props);
  return watermark;
}

function gmailNotificationScanState_(props, nowValue) {
  const now = Number(nowValue || Date.now());
  const watermark = initializeGmailNotificationWatermark_(props, now);
  let stored = null;
  try { stored = JSON.parse(props.getProperty(GMAIL_NOTIFICATION_SCAN) || 'null'); }
  catch (error) { stored = null; }
  const pageToken = stored && String(stored.pageToken || '');
  const boundsValid = stored && Number(stored.version) === GMAIL_NOTIFICATION_SCAN_VERSION &&
    Number(stored.lowerBoundMs) === watermark &&
    Number.isFinite(Number(stored.upperBoundMs)) &&
    Number(stored.upperBoundMs) >= watermark &&
    Number(stored.upperBoundMs) <= now + 60 * 1000;
  if (boundsValid) {
    const normalized = Object.assign({}, stored, {
      pageToken,
      page: Math.max(0, Number(stored.page || 0)),
      pass: Math.max(0, Number(stored.pass || 0)),
      passNewCount: Math.max(0, Number(stored.passNewCount || 0)),
      verificationPass: stored.verificationPass === true,
      tokenRestarts: Math.max(0, Number(stored.tokenRestarts || 0)),
    });
    if (pageToken.length <= 1024 && !/[\u0000-\u0020\u007F]/.test(pageToken)) {
      return normalized;
    }
    // A syntactically damaged persisted token must not strand the frozen
    // interval. Restart the same immutable query and retain its exact done
    // ledger, so no already-notified message can be replayed.
    normalized.pageToken = '';
    normalized.page = 0;
    normalized.pass += 1;
    normalized.passNewCount = 0;
    normalized.verificationPass = true;
    normalized.tokenRestarts += 1;
    normalized.updatedAt = now;
    persistGmailNotificationScanState_(props, normalized);
    return normalized;
  }

  const state = {
    version: GMAIL_NOTIFICATION_SCAN_VERSION,
    lowerBoundMs: watermark,
    upperBoundMs: Math.max(watermark, now - CONFIG.GMAIL_NOTIFICATION_SAFETY_LAG_MS),
    pageToken: '',
    page: 0,
    pass: 0,
    passNewCount: 0,
    verificationPass: false,
    tokenRestarts: 0,
    createdAt: now,
  };
  // A prior scan may have committed its watermark immediately before an Apps
  // Script termination. Its done chunks belong to that old interval.
  clearGmailNotificationScanDone_(props);
  persistGmailNotificationScanState_(props, state);
  return state;
}

function persistGmailNotificationScanState_(props, state) {
  const serialized = JSON.stringify(state || {});
  assertTelegramPropertyValueFits_(GMAIL_NOTIFICATION_SCAN, serialized);
  assertTelegramPropertyStoreFits_(props, { [GMAIL_NOTIFICATION_SCAN]: serialized });
  props.setProperty(GMAIL_NOTIFICATION_SCAN, serialized);
  return state;
}

function gmailNotificationDoneChunkKeys_(props) {
  if (!props || typeof props.getProperties !== 'function') return [];
  return Object.keys(props.getProperties() || {})
    .filter(name => name.indexOf(GMAIL_NOTIFICATION_SCAN_DONE_PREFIX) === 0 &&
      /^\d+$/.test(name.slice(GMAIL_NOTIFICATION_SCAN_DONE_PREFIX.length)))
    .sort((a, b) =>
      Number(a.slice(GMAIL_NOTIFICATION_SCAN_DONE_PREFIX.length)) -
      Number(b.slice(GMAIL_NOTIFICATION_SCAN_DONE_PREFIX.length))
    );
}

function clearGmailNotificationScanDone_(props) {
  deleteScriptProperty_(props, GMAIL_NOTIFICATION_PAGE_DONE);
  gmailNotificationDoneChunkKeys_(props).forEach(name => deleteScriptProperty_(props, name));
}

function gmailNotificationScanDone_(props) {
  const done = new Set();
  gmailNotificationDoneChunkKeys_(props).forEach(name => {
    readJsonArrayProperty_(props, name).forEach(value => {
      const id = String(value || '');
      if (/^[a-zA-Z0-9_-]{5,64}$/.test(id)) done.add(id);
    });
  });
  // Read the one-page legacy ledger during an in-flight deployment upgrade.
  readJsonArrayProperty_(props, GMAIL_NOTIFICATION_PAGE_DONE).forEach(value => {
    const id = String(value || '');
    if (/^[a-zA-Z0-9_-]{5,64}$/.test(id)) done.add(id);
  });
  return done;
}

function persistGmailNotificationScanDoneId_(props, done, messageId) {
  const id = String(messageId || '');
  if (!/^[a-zA-Z0-9_-]{5,64}$/.test(id)) {
    throw new Error('Некоректний Gmail message ID у scan ledger.');
  }
  if (done.has(id)) return false;
  const keys = gmailNotificationDoneChunkKeys_(props);
  let key = keys.length
    ? keys[keys.length - 1]
    : GMAIL_NOTIFICATION_SCAN_DONE_PREFIX + '0';
  let values = readJsonArrayProperty_(props, key)
    .map(String)
    .filter(value => /^[a-zA-Z0-9_-]{5,64}$/.test(value));
  let candidate = JSON.stringify(values.concat([id]));
  if (values.length >= CONFIG.GMAIL_NOTIFICATION_PAGE_SIZE ||
      utf8ByteLength_(candidate) > CONFIG.TELEGRAM_PROPERTY_MAX_BYTES) {
    key = GMAIL_NOTIFICATION_SCAN_DONE_PREFIX + String(keys.length);
    values = [];
    candidate = JSON.stringify([id]);
  }
  assertTelegramPropertyValueFits_(key, candidate);
  assertTelegramPropertyStoreFits_(props, { [key]: candidate });
  props.setProperty(key, candidate);
  done.add(id);
  return true;
}

function persistRecentGmailNotificationIds_(props, seen) {
  const ids = Array.from(seen).slice(-CONFIG.SEEN_IDS_LIMIT);
  let serialized = JSON.stringify(ids);
  while (ids.length && utf8ByteLength_(serialized) > CONFIG.TELEGRAM_PROPERTY_MAX_BYTES) {
    ids.shift();
    serialized = JSON.stringify(ids);
  }
  assertTelegramPropertyValueFits_('SEEN_MESSAGE_IDS', serialized);
  props.setProperty('SEEN_MESSAGE_IDS', serialized);
}

function gmailNotificationDeadLetterAudit_(value) {
  const input = value && typeof value === 'object' ? value : {};
  const lastId = String(input.lastId || '');
  return {
    total: Math.max(0, Number(input.total) || 0),
    lastId: /^[a-zA-Z0-9_-]{5,64}$/.test(lastId) ? lastId : '',
    lastAt: Math.max(0, Number(input.lastAt) || 0),
    lastAttempts: Math.max(0, Math.min(Number(input.lastAttempts) || 0, 1000)),
    reason: ['capacity', 'attempts'].indexOf(String(input.reason || '')) !== -1
      ? String(input.reason) : '',
  };
}

function nextGmailNotificationDeadLetterAudit_(auditValue, row, reason) {
  const audit = gmailNotificationDeadLetterAudit_(auditValue);
  return {
    total: audit.total + 1,
    lastId: String(row && row.id || ''),
    lastAt: Date.now(),
    lastAttempts: Math.max(0, Number(row && row.attempts || 0)),
    reason: String(reason || 'attempts'),
  };
}

function gmailNotificationQuarantineState_(props) {
  let stored = [];
  try { stored = JSON.parse(props.getProperty(GMAIL_NOTIFICATION_QUARANTINE) || '[]'); }
  catch (error) { stored = []; }
  const source = Array.isArray(stored)
    ? stored
    : (stored && Array.isArray(stored.q) ? stored.q : []);
  const deadTuple = !Array.isArray(stored) && stored && Array.isArray(stored.d)
    ? stored.d : [];
  const audit = gmailNotificationDeadLetterAudit_({
    total: deadTuple[0],
    lastId: deadTuple[1],
    lastAt: deadTuple[2],
    lastAttempts: deadTuple[3],
    reason: deadTuple[4],
  });
  const rows = [];
  const seen = new Set();
  source.forEach(value => {
    const tuple = Array.isArray(value) ? value : [];
    const id = String(tuple[0] || '');
    if (!/^[a-zA-Z0-9_-]{5,64}$/.test(id) || seen.has(id)) return;
    seen.add(id);
    rows.push({
      id,
      attempts: Math.max(0, Math.min(Number(tuple[1]) || 0, 1000)),
      retryAt: Math.max(0, Number(tuple[2]) || 0),
      firstAt: Math.max(0, Number(tuple[3]) || 0),
      lowerBoundMs: Math.max(0, Number(tuple[4]) || 0),
      upperBoundMs: Math.max(0, Number(tuple[5]) || 0),
    });
  });
  return {
    rows: rows.slice(0, CONFIG.GMAIL_NOTIFICATION_QUARANTINE_LIMIT),
    audit,
  };
}

function gmailNotificationQuarantineRows_(props) {
  return gmailNotificationQuarantineState_(props).rows;
}

function persistGmailNotificationQuarantine_(props, rows, auditValue) {
  const tuples = (rows || []).slice(0, CONFIG.GMAIL_NOTIFICATION_QUARANTINE_LIMIT)
    .map(row => [
      String(row.id),
      Number(row.attempts || 0),
      Number(row.retryAt || 0),
      Number(row.firstAt || 0),
      Number(row.lowerBoundMs || 0),
      Number(row.upperBoundMs || 0),
    ]);
  const audit = arguments.length >= 3
    ? gmailNotificationDeadLetterAudit_(auditValue)
    : gmailNotificationQuarantineState_(props).audit;
  if (!tuples.length && !audit.total) {
    deleteScriptProperty_(props, GMAIL_NOTIFICATION_QUARANTINE);
    return [];
  }
  const payload = audit.total
    ? {
        q: tuples,
        d: [audit.total, audit.lastId, audit.lastAt, audit.lastAttempts, audit.reason],
      }
    : tuples;
  const serialized = JSON.stringify(payload);
  assertTelegramPropertyValueFits_(GMAIL_NOTIFICATION_QUARANTINE, serialized);
  assertTelegramPropertyStoreFits_(props, { [GMAIL_NOTIFICATION_QUARANTINE]: serialized });
  props.setProperty(GMAIL_NOTIFICATION_QUARANTINE, serialized);
  return rows;
}

function quarantineGmailNotification_(props, messageId, scan) {
  const id = String(messageId || '');
  const state = gmailNotificationQuarantineState_(props);
  const rows = state.rows;
  if (rows.some(row => row.id === id)) return rows;
  if (rows.length >= CONFIG.GMAIL_NOTIFICATION_QUARANTINE_LIMIT) {
    // Retain the rows with the best chance of recovery. The most exhausted
    // row, with oldest-first tie breaking, becomes a compact audited
    // dead-letter. Queue replacement and audit are one property write, so a
    // crash can neither lose the victim silently nor double-count it.
    let victimIndex = 0;
    for (let index = 1; index < rows.length; index += 1) {
      const candidate = rows[index];
      const victim = rows[victimIndex];
      if (candidate.attempts > victim.attempts ||
          (candidate.attempts === victim.attempts && candidate.firstAt < victim.firstAt)) {
        victimIndex = index;
      }
    }
    const victim = rows.splice(victimIndex, 1)[0];
    state.audit = nextGmailNotificationDeadLetterAudit_(state.audit, victim, 'capacity');
    console.error('Gmail notification moved to bounded dead-letter after capacity pressure: ' +
      hashedMessageId_(victim.id));
  }
  const now = Date.now();
  rows.push({
    id,
    attempts: 0,
    retryAt: now + 60 * 1000,
    firstAt: now,
    lowerBoundMs: Math.max(0, Number(scan && scan.lowerBoundMs || 0)),
    upperBoundMs: Math.max(0, Number(scan && scan.upperBoundMs || 0)),
  });
  persistGmailNotificationQuarantine_(props, rows, state.audit);
  return rows;
}

function retryGmailNotificationQuarantine_(props, seen, limit, notificationOptions) {
  const state = gmailNotificationQuarantineState_(props);
  const rows = state.rows;
  const maximum = Math.max(0, Math.min(Number(limit) || 0, 20));
  let attempted = 0;
  let delivered = 0;
  let failed = 0;
  let deadLettered = 0;
  let audit = state.audit;
  const retained = [];
  rows.forEach(row => {
    if (attempted >= maximum || row.retryAt > Date.now()) {
      retained.push(row);
      return;
    }
    attempted += 1;
    try {
      if (seen.has(row.id)) return;
      const message = getGmailMessage_(row.id);
      const timestamp = Number(message && message.timestamp || 0);
      const labels = new Set((message && message.labelIds || []).map(String));
      if (!timestamp ||
          (row.lowerBoundMs && timestamp < row.lowerBoundMs) ||
          (row.upperBoundMs && timestamp >= row.upperBoundMs) ||
          !labels.has('INBOX') || labels.has('SPAM') || labels.has('TRASH')) return;
      if (notificationOptions && notificationOptions.notificationMode === 'important' &&
          !labels.has('IMPORTANT')) return;
      notifyMessage_(message, notificationOptions);
      seen.add(row.id);
      persistRecentGmailNotificationIds_(props, seen);
      delivered += 1;
    } catch (error) {
      if (Number(error && error.gmailHttpStatus || 0) === 404) return;
      row.attempts = Math.min(1000, Number(row.attempts || 0) + 1);
      row.retryAt = Date.now() + Math.min(
        CONFIG.GMAIL_NOTIFICATION_QUARANTINE_MAX_DELAY_MS,
        Math.pow(2, Math.min(12, Math.max(0, row.attempts - 1))) * 60 * 1000
      );
      failed += 1;
      if (row.attempts >= CONFIG.GMAIL_NOTIFICATION_QUARANTINE_MAX_ATTEMPTS) {
        audit = nextGmailNotificationDeadLetterAudit_(audit, row, 'attempts');
        deadLettered += 1;
        console.error('Gmail notification exhausted bounded quarantine and was audited: ' +
          hashedMessageId_(row.id));
      } else {
        retained.push(row);
        console.error('Quarantined Gmail notification retry failed for ' + hashedMessageId_(row.id) + ': ' + error);
      }
    }
  });
  persistGmailNotificationQuarantine_(props, retained, audit);
  return { attempted, delivered, failed, deadLettered, rows: retained };
}

function restartGmailNotificationScanPage_(props, scan) {
  const restarted = Object.assign({}, scan, {
    pageToken: '',
    page: 0,
    pass: Math.max(0, Number(scan.pass || 0)) + 1,
    passNewCount: 0,
    verificationPass: true,
    tokenRestarts: Math.max(0, Number(scan.tokenRestarts || 0)) + 1,
    updatedAt: Date.now(),
  });
  persistGmailNotificationScanState_(props, restarted);
  return restarted;
}

function isInvalidGmailNotificationPageTokenError_(error, scan) {
  if (!String(scan && scan.pageToken || '')) return false;
  return Boolean(error && error.gmailPageTokenInvalid) ||
    Number(error && error.gmailHttpStatus || 0) === 400;
}

function advanceGmailNotificationScan_(props, scan, nextPageToken, pageNewCount) {
  const next = String(nextPageToken || '');
  const passNewCount = Math.max(0, Number(scan.passNewCount || 0)) +
    Math.max(0, Number(pageNewCount || 0));
  if (next) {
    const advanced = Object.assign({}, scan, {
      pageToken: next,
      page: Number(scan.page || 0) + 1,
      passNewCount,
      updatedAt: Date.now(),
    });
    persistGmailNotificationScanState_(props, advanced);
    return { pending: true, completed: false };
  }

  // A full second pass over the label-independent query is the commit barrier.
  // It catches IDs that became search-visible while an earlier pass was being
  // paged. The exact done ledger makes every restart duplicate-free.
  if (scan.verificationPass === true && passNewCount === 0) {
    // Commit the watermark first. If execution stops before cleanup, the stale
    // scan no longer matches the watermark and is discarded on the next run.
    props.setProperty(GMAIL_NOTIFICATION_WATERMARK, String(scan.upperBoundMs));
    deleteScriptProperty_(props, GMAIL_NOTIFICATION_SCAN);
    clearGmailNotificationScanDone_(props);
    return { pending: false, completed: true };
  }

  const verification = Object.assign({}, scan, {
    pageToken: '',
    page: 0,
    pass: Math.max(0, Number(scan.pass || 0)) + 1,
    passNewCount: 0,
    verificationPass: true,
    updatedAt: Date.now(),
  });
  persistGmailNotificationScanState_(props, verification);
  return { pending: true, completed: false, verifying: true };
}

/** Shared timer/manual core. Every frozen page is crash-resumable. */
function runMailCheck_(source) {
  // Timer/manual Gmail checks share a user-scoped lock. Telegram callback
  // deduplication uses ScriptLock separately, so a long email delivery cannot
  // swallow a button press as "busy".
  const lock = LockService.getUserLock();
  if (!lock.tryLock(1500)) return { busy: true, delivered: 0 };

  try {
    const baseProps = PropertiesService.getScriptProperties();
    const scope = gmailNotificationScope_(arguments.length > 1 ? arguments[1] : null);
    const props = gmailNotificationProperties_(baseProps, scope);
    requireSetting_(props, 'BOT_TOKEN');
    requireSetting_(props, 'CHAT_ID');
    if (scope && !props.getProperty('STARTED_AT')) {
      props.setProperty('STARTED_AT', String(Date.now()));
    }
    const notificationOptions = scope ? {
      chatId: scope.chatId,
      userId: scope.userId,
      account: scope.account,
      showAccount: true,
      notificationMode: scope.notificationMode,
      seenPropertyName: props.scopedPhysicalName('SEEN_MESSAGE_IDS'),
    } : null;

    const quarantineAuditBefore = gmailNotificationQuarantineState_(props).audit.total;
    const seen = new Set(readJsonArrayProperty_(props, 'SEEN_MESSAGE_IDS').map(String));
    const quarantineRetry = retryGmailNotificationQuarantine_(
      props,
      seen,
      CONFIG.GMAIL_NOTIFICATION_QUARANTINE_RETRY_BATCH,
      notificationOptions
    );
    let scan = gmailNotificationScanState_(props, Date.now());
    let page;
    try {
      page = listGmailNotificationPage_(scan);
    } catch (error) {
      if (!isInvalidGmailNotificationPageTokenError_(error, scan)) throw error;
      scan = restartGmailNotificationScanPage_(props, scan);
      page = listGmailNotificationPage_(scan);
    }
    const scanDone = gmailNotificationScanDone_(props);
    let quarantineRows = quarantineRetry.rows;
    const quarantineIds = new Set(quarantineRows.map(row => row.id));
    const candidates = [];
    let delivered = quarantineRetry.delivered;
    let failed = quarantineRetry.failed;
    let blockingFailures = 0;
    let uncertain = 0;
    let quarantined = 0;
    const pageNewCount = page.ids.filter(id => !scanDone.has(id)).length;
    const quarantineAndComplete = (id, error) => {
      try {
        if (!quarantineIds.has(id)) {
          quarantineRows = quarantineGmailNotification_(props, id, scan);
          quarantineIds.add(id);
        }
        persistGmailNotificationScanDoneId_(props, scanDone, id);
        quarantined += 1;
        failed += 1;
      } catch (quarantineError) {
        blockingFailures += 1;
        failed += 1;
        console.error('Could not quarantine Gmail notification ' + hashedMessageId_(id) + ': ' + quarantineError);
      }
      console.error('Mail notification deferred for ' + hashedMessageId_(id) + ': ' + error);
    };
    page.ids.filter(id => !scanDone.has(id)).forEach(id => {
      if (quarantineIds.has(id)) {
        try { persistGmailNotificationScanDoneId_(props, scanDone, id); }
        catch (error) {
          blockingFailures += 1;
          failed += 1;
        }
        return;
      }
      try {
        const message = getGmailMessage_(id);
        const timestamp = Number(message && message.timestamp || 0);
        const labels = new Set((message && message.labelIds || []).map(String));
        if (!timestamp || timestamp < Number(scan.lowerBoundMs) ||
            timestamp >= Number(scan.upperBoundMs) || seen.has(id) ||
            !labels.has('INBOX') || labels.has('SPAM') || labels.has('TRASH')) {
          persistGmailNotificationScanDoneId_(props, scanDone, id);
          return;
        }
        if (scope && scope.notificationMode === 'important' && !labels.has('IMPORTANT')) {
          persistGmailNotificationScanDoneId_(props, scanDone, id);
          return;
        }
        candidates.push(message);
      } catch (error) {
        quarantineAndComplete(id, error);
      }
    });
    candidates.sort((a, b) => a.timestamp - b.timestamp);
    for (const message of candidates) {
      try {
        const notification = notifyMessage_(message, notificationOptions);
        seen.add(message.id);
        if (notification && notification.uncertain) uncertain += 1;
        else delivered += 1;
        persistRecentGmailNotificationIds_(props, seen);
        persistGmailNotificationScanDoneId_(props, scanDone, message.id);
      } catch (error) {
        quarantineAndComplete(message.id, error);
      }
    }

    const quarantineStateAfter = gmailNotificationQuarantineState_(props);
    const deadLettered = Math.max(
      0,
      Number(quarantineStateAfter.audit.total || 0) - Number(quarantineAuditBefore || 0)
    );
    const deadLetteredTotal = Math.max(0, Number(quarantineStateAfter.audit.total || 0));
    const retryPending = quarantineStateAfter.rows.length;

    const progress = blockingFailures === 0
      ? advanceGmailNotificationScan_(props, scan, page.nextPageToken, pageNewCount)
      : { pending: true, completed: false };

    props.setProperty('LAST_CHECK_AT', String(Date.now()));
    props.setProperty('LAST_CHECK_SOURCE', source || 'unknown');
    props.setProperty('LAST_CHECK_DELIVERED', String(delivered));
    props.setProperty('LAST_CHECK_FAILED', String(failed));
    props.setProperty('LAST_CHECK_QUARANTINED', String(quarantined));
    props.setProperty('LAST_CHECK_UNCERTAIN', String(uncertain));
    props.setProperty('LAST_CHECK_DEAD_LETTERED', String(deadLettered));
    props.setProperty('LAST_CHECK_DEAD_LETTER_TOTAL', String(deadLetteredTotal));
    props.setProperty('LAST_CHECK_RETRY_PENDING', String(retryPending));
    props.setProperty('LAST_CHECK_PENDING', progress.pending ? '1' : '0');
    return {
      busy: false,
      delivered,
      failed,
      uncertain,
      quarantined,
      deadLettered,
      deadLetteredTotal,
      retryPending,
      pending: progress.pending,
    };
  } finally {
    lock.releaseLock();
  }
}

function runManualMailCheck_() {
  try {
    const typingPayload = {
      chat_id: PropertiesService.getScriptProperties().getProperty('CHAT_ID'),
      action: 'typing',
    };
    const systemThread = telegramTopicId_('system');
    if (systemThread) typingPayload.message_thread_id = systemThread;
    telegramRequest_('sendChatAction', typingPayload);
  } catch (error) {
    console.error('sendChatAction failed: ' + error);
  }

  const result = runMailCheck_('manual');
  const deadLettered = Math.max(0, Number(result.deadLettered || 0));
  const deadLetteredTotal = Math.max(0, Number(result.deadLetteredTotal || 0));
  const retryPending = Math.max(0, Number(result.retryPending || 0));
  const deadLetterNotice = deadLetteredTotal
    ? '\nБез автоматичного повтору за весь час: <b>' + deadLetteredTotal +
      '</b>. Оригінали залишаються доступними у Gmail.'
    : '';
  if (result.busy) {
    sendTelegramText_(
      '⏳ Перевірка вже виконується. Спробуйте ще раз за кілька секунд.',
      null,
      systemTopicOptions_()
    );
  } else if (result.failed > 0 || result.uncertain > 0 || deadLettered > 0) {
    sendTelegramText_(
      '⚠️ <b>Gmail перевірено частково</b>\n\nДоставлено: <b>' + result.delivered +
      '</b>. Нові або повторні помилки доставки: <b>' + result.failed +
      '</b>. Зараз очікують автоматичного повтору: <b>' + retryPending + '</b>.' +
      (deadLettered
        ? '\nПід час цієї перевірки автоматичні спроби остаточно вичерпано для: <b>' +
          deadLettered + '</b>.'
        : '') +
      (result.uncertain
        ? '\nНевизначена відповідь Telegram: <b>' + result.uncertain +
          '</b>. Бот не повторює їх автоматично, щоб не створити дублікати; оригінали доступні у Gmail.'
        : '') +
      deadLetterNotice +
      (result.pending ? '\nЧерга наступних сторінок продовжиться автоматично.' : ''),
      replyKeyboard_(),
      systemTopicOptions_({ silent: true })
    );
  } else if (result.delivered === 0) {
    sendTelegramText_(
      '✅ <b>Gmail перевірено</b>\n\nНових листів немає.' +
      (result.pending ? '\nПеревірка наступних сторінок продовжиться автоматично.' : '') +
      deadLetterNotice,
      replyKeyboard_(),
      systemTopicOptions_()
    );
  } else {
    sendTelegramText_(
      '✅ <b>Gmail перевірено</b>\n\nНових листів доставлено: <b>' +
      result.delivered + '</b>.' +
      (result.pending ? '\nНаступна сторінка черги буде перевірена автоматично.' : '') +
      deadLetterNotice,
      replyKeyboard_(),
      systemTopicOptions_({ silent: true })
    );
  }
}

/** Telegram Web App endpoint. */
function doPost(e) {
  const postedParams = e && e.parameter ? e.parameter : {};
  if (String(postedParams.action || '') === 'gmail_oauth_callback' &&
      String(postedParams.relay || '') === 'github_pages_v2') {
    return serveGoogleOAuthRelayPost_(e);
  }
  if (String(postedParams.action || '') === 'mailbox' &&
      String(postedParams.mailbox_bootstrap || '') === '1') {
    return serveMailboxLaunchPost_(e);
  }
  try {
    const props = PropertiesService.getScriptProperties();
    const expectedKey = props.getProperty('WEBHOOK_KEY');
    if (!expectedKey || !e ||
        !constantTimeEqual_(expectedKey, String((e.parameter || {}).key || ''))) {
      return webhookOk_();
    }

    const update = JSON.parse(String((e.postData || {}).contents || '{}'));
    if (!isOwnPrivateUpdate_(update, props.getProperty('CHAT_ID'))) {
      const tenantUserId = telegramPrivateUserId_(update);
      if (tenantUserId) routeTenantUpdate_(update, tenantUserId);
      return webhookOk_();
    }

    const claim = claimTelegramUpdate_(update.update_id, update);
    const shouldRun = claim === 'new' || claim === 'retry';
    const callbackData = String(
      update.callback_query && update.callback_query.data || ''
    );
    const nativeMailboxCallback = Boolean(
      parseMailboxCallback_(callbackData) ||
      parseTelegramMailBrowseCallback_(callbackData) ||
      parseTelegramFocusCallback_(callbackData) ||
      parseTelegramFocusRuleCallback_(callbackData) ||
      parseMailReminderCallback_(callbackData) ||
      parseTelegramGmailAccountCallback_(callbackData) ||
      callbackData === BOT_UI.BROWSE_ACTION
    );
    const deferredCallbackToast = nativeMailboxCallback ||
      callbackData === BOT_UI.UNSUBSCRIBE_UNAVAILABLE_ACTION;
    if (update.callback_query && !shouldRun) {
      answerTelegramCallback_(
        update.callback_query.id,
        claim === 'busy'
          ? 'Команда вже виконується'
          : (claim === 'overloaded'
              ? 'Синхронізація зайнята. Спробуйте ще раз трохи пізніше'
              : (claim === 'exhausted' ? 'Не вдалося виконати. Натисніть кнопку ще раз' : 'Цю команду вже виконано'))
      );
    }

    if (shouldRun) {
      // Mailbox mutations answer once, after Gmail confirms success, so the
      // only visible feedback is a short auto-disappearing Telegram toast.
      // Non-mutating controls may still clear their spinner immediately.
      let callbackAnswered = false;
       if (update.callback_query && !deferredCallbackToast) {
        answerTelegramCallback_(update.callback_query.id, '');
        callbackAnswered = true;
      }
      try {
        const routeResult = routeTelegramUpdate_(update);
        if (update.callback_query && deferredCallbackToast) {
          answerTelegramCallback_(
            update.callback_query.id,
            String(routeResult && routeResult.message || '✅ Готово')
          );
          callbackAnswered = true;
        }
        completeTelegramUpdate_(update.update_id);
      } catch (actionError) {
        console.error('Telegram action failed: ' +
          (actionError && actionError.stack ? actionError.stack : actionError));
        failTelegramUpdate_(update.update_id, actionError);
        if (update.callback_query) {
          markTelegramCallbackFailure_(
            update.callback_query.message,
            update.callback_query.data
          );
          if (!callbackAnswered) {
            answerTelegramCallback_(
              update.callback_query.id,
              '⚠️ ' + String(actionError && actionError.message || 'Не вдалося виконати')
            );
          } else if (!deferredCallbackToast) {
            try {
              sendCallbackActionError_(update.callback_query, actionError);
            } catch (reportError) {
              console.error('Could not report Telegram callback failure: ' + reportError);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Webhook error: ' + (error && error.stack ? error.stack : error));
  }
  return webhookOk_();
}

function doGet(e) {
  const action = String((e && e.parameter && e.parameter.action) || 'menu');
  const view = String((e && e.parameter && e.parameter.view) || '');
  if (action === 'gmail_oauth_start') {
    return serveGoogleOAuthStart_(e);
  }
  if (action === 'gmail_oauth_callback') {
    return serveGoogleOAuthCallback_(e);
  }
  if (action === 'drive_oauth_callback') {
    return serveDriveOAuthCallback_(e);
  }
  // Exact Box OAuth landing route; token exchange/state consumption lives in MailClient.
  // Keep this ahead of mailbox bootstrap and the legacy private-key handler.
  if (action === 'box_oauth_callback') {
    return serveBoxOAuthCallback_(e);
  }

  if (action === 'mailbox' || view === 'mailbox') return serveMailboxApp_();
  const messageId = String((e && e.parameter && e.parameter.message_id) || '');
  const controlKey = String((e && e.parameter && e.parameter.key) || '');
  const initData = String((e && e.parameter && e.parameter.init_data) || '');
  const confirmed = String((e && e.parameter && e.parameter.confirmed) || '');
  const allowed = new Set([
    'check', 'status', 'menu', 'settings', 'help', 'eml',
    'archive', 'trash', 'spam', 'unsubscribe',
  ]);
  const safeAction = allowed.has(action) ? action : 'menu';
  const safeMessageId = /^[a-zA-Z0-9_-]{5,64}$/.test(messageId) ? messageId : '';
  let result;
  let failed = false;
  try {
    result = handlePrivateWebAction_(safeAction, safeMessageId, controlKey, initData, confirmed);
  } catch (error) {
    failed = true;
    result = { message: error && error.message ? error.message : 'Не вдалося виконати команду' };
    console.error('Web action error: ' + (error && error.stack ? error.stack : error));
  }
  if (String((e && e.parameter && e.parameter.format) || '') === 'js') {
    return ContentService
      .createTextOutput(
        'window.telegramControlDone(' + JSON.stringify({
          ok: !failed,
          message: String(result.message || (failed ? 'Помилка' : 'Готово')),
          openUrl: !failed && isSafePublicHttpsUrl_(result.openUrl) ? result.openUrl : '',
        }) + ');'
      )
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  const title = failed ? 'Не вдалося виконати' : 'Готово';
  const html = '<!doctype html><html><head><base target="_top">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<style>body{font:16px system-ui;margin:0;background:var(--tg-theme-bg-color,#fff);' +
    'color:var(--tg-theme-text-color,#111);display:grid;place-items:center;min-height:100vh}' +
    '.box{text-align:center;padding:24px}.mark{font-size:38px}.bad{color:#c62828}' +
    'small{opacity:.7}</style></head><body><div class="box">' +
    '<div class="mark' + (failed ? ' bad' : '') + '">' + (failed ? '!' : '✓') + '</div>' +
    '<p><b>' + escapeHtml_(title) + '</b></p><small>' +
    escapeHtml_(String(result.message || 'Команду виконано')) + '</small></div></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('Gmail → Telegram');
}

function serveBoxOAuthCallback_(e) {
  let input = null;
  let result;
  try {
    input = boxOAuthCallbackInput_(e);
    result = typeof mailboxBoxSourceHandleOAuthCallback_ === 'function'
      ? mailboxBoxSourceHandleOAuthCallback_(input)
      : mailboxHandleBoxOAuthCallback_(input);
  } catch (error) {
    // OAuth exceptions may contain authorization codes, state or raw provider text.
    // Never log or render them.
    result = {
      ok: false,
      title: 'Не вдалося підключити Box',
      message: 'Посилання авторизації недійсне або застаріло. ' +
        'Поверніться до пошти та почніть підключення ще раз.',
    };
  }
  return renderBoxOAuthCallbackPage_(result, input);
}

function boxOAuthCallbackInput_(e) {
  const action = boxOAuthCallbackParameter_(e, 'action', 64);
  const state = boxOAuthCallbackParameter_(e, 'state', 256);
  const code = boxOAuthCallbackParameter_(e, 'code', 2048);
  const providerError = boxOAuthCallbackParameter_(e, 'error', 128);
  const errorDescription = boxOAuthCallbackParameter_(e, 'error_description', 500);

  if (action !== 'box_oauth_callback' || !/^[A-Za-z0-9_-]{32,256}$/.test(state)) {
    throw new Error('INVALID_BOX_OAUTH_CALLBACK');
  }
  if (Boolean(code) === Boolean(providerError)) {
    throw new Error('INVALID_BOX_OAUTH_CALLBACK');
  }
  if (providerError && !/^[A-Za-z0-9_.-]{1,128}$/.test(providerError)) {
    throw new Error('INVALID_BOX_OAUTH_CALLBACK');
  }
  if (!providerError && errorDescription) {
    throw new Error('INVALID_BOX_OAUTH_CALLBACK');
  }

  return {
    code: code,
    state: state,
    error: providerError,
    errorDescription: errorDescription,
  };
}

function boxOAuthCallbackParameter_(e, name, maxLength) {
  const parameters = e && e.parameters;
  let raw;
  if (parameters && Object.prototype.hasOwnProperty.call(parameters, name)) {
    const values = parameters[name];
    if (!Array.isArray(values) || values.length !== 1) {
      throw new Error('INVALID_BOX_OAUTH_CALLBACK');
    }
    raw = values[0];
  } else {
    raw = e && e.parameter ? e.parameter[name] : '';
    if (Array.isArray(raw)) throw new Error('INVALID_BOX_OAUTH_CALLBACK');
  }
  if (raw !== undefined && raw !== null && typeof raw !== 'string') {
    throw new Error('INVALID_BOX_OAUTH_CALLBACK');
  }
  const value = raw === undefined || raw === null ? '' : raw;
  if (value.length > maxLength || /[\u0000-\u001F\u007F]/.test(value)) {
    throw new Error('INVALID_BOX_OAUTH_CALLBACK');
  }
  return value;
}
function renderBoxOAuthCallbackPage_(rawResult, callbackInput) {
  const ok = Boolean(rawResult && rawResult.ok === true);
  const fallbackTitle = ok ? 'Box підключено' : 'Не вдалося підключити Box';
  const fallbackMessage = ok
    ? 'Можна закрити це вікно й повернутися до пошти.'
    : 'Поверніться до пошти та спробуйте ще раз.';
  const forbidden = callbackInput
    ? [
        callbackInput.code,
        callbackInput.state,
        callbackInput.error,
        callbackInput.errorDescription,
      ].filter(Boolean)
    : [];
  const title = boxOAuthCallbackUiText_(
    rawResult && rawResult.title,
    96,
    fallbackTitle,
    forbidden
  );
  const message = boxOAuthCallbackUiText_(
    rawResult && rawResult.message,
    500,
    fallbackMessage,
    forbidden
  );
  const html = '<!doctype html><html lang="uk"><head><base target="_top">' +
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="referrer" content="no-referrer">' +
    '<meta name="robots" content="noindex,nofollow,noarchive">' +
    '<meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0">' +
    '<meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0">' +
    '<style>body{font:16px system-ui;margin:0;background:#f6f8fb;color:#172033;' +
    'display:grid;place-items:center;min-height:100vh}.card{box-sizing:border-box;max-width:420px;' +
    'margin:20px;padding:28px;border-radius:20px;background:#fff;text-align:center;' +
    'box-shadow:0 12px 36px #1720331a}.mark{font-size:40px;color:#16835f}' +
    '.bad{color:#c62828}h1{font-size:21px;margin:12px 0}p{line-height:1.5;margin:0;color:#586174}' +
    'button{margin-top:20px;border:0;border-radius:12px;padding:11px 18px;background:#1778d4;' +
    'color:#fff;font:600 15px system-ui;cursor:pointer}</style>' +
    '<script>try{history.replaceState(null,"",location.pathname+"?action=box_oauth_callback")}' +
    'catch(e){}</script></head><body><main class="card"><div class="mark' +
    (ok ? '' : ' bad') + '">' + (ok ? '✓' : '!') + '</div><h1>' + escapeHtml_(title) +
    '</h1><p>' + escapeHtml_(message) + '</p><button type="button" onclick="window.close()">' +
    'Закрити</button></main></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('Box · Gmail → Telegram');
}

function boxOAuthCallbackUiText_(value, maxLength, fallback, forbiddenValues) {
  const text = value === undefined || value === null ? '' : String(value).trim();
  const containsSensitiveValue = (forbiddenValues || []).some(secret =>
    secret && text.indexOf(String(secret)) !== -1
  );
  if (!text || text.length > maxLength ||
      /[\u0000-\u001F\u007F]/.test(text) || containsSensitiveValue) {
    return fallback;
  }
  return text;
}

function handleWebAppAction_(action, messageId, initData, confirmed) {
  validateTelegramMiniApp_(initData);
  return executeControlAction_(action, messageId, confirmed);
}

function handlePrivateWebAction_(action, messageId, controlKey, initData, confirmed) {
  validateControlToken_(controlKey);
  // Reply-keyboard Web Apps are opened by Telegram as SimpleWebView and do
  // not receive initData. Menu/inline Web Apps do receive it, so validate the
  // Telegram HMAC whenever the client supplies it. Every path still requires
  // the private 256-bit control token embedded only in this owner's buttons.
  if (isMailboxAction_(action)) {
    // Changing a message requires both the private button key and a fresh,
    // owner-bound Telegram signature. A copied URL alone can never mutate Gmail.
    validateTelegramMiniApp_(initData);
  } else if (String(initData || '')) {
    validateTelegramMiniApp_(initData);
  }
  return executeControlAction_(action, messageId, confirmed);
}

function executeControlAction_(action, messageId, confirmed) {
  const value = String(action || '');
  if (value === 'check') {
    runManualMailCheck_();
    return { ok: true, message: 'Gmail перевірено' };
  }
  if (value === 'status') {
    sendBotStatus_();
    return { ok: true, message: 'Статус надіслано в чат' };
  }
  if (value === 'menu') {
    sendControlMenu_();
    return { ok: true, message: 'Меню відкрито в чаті' };
  }
  if (value === 'settings') {
    sendSettingsMenu_();
    return { ok: true, message: 'Налаштування надіслано' };
  }
  if (value === 'help') {
    sendBotHelp_();
    return { ok: true, message: 'Довідку надіслано' };
  }
  if (value === 'eml' && /^[a-zA-Z0-9_-]{5,64}$/.test(String(messageId || ''))) {
    sendEmlForMessage_(String(messageId), null);
    return { ok: true, message: 'Оригінал .eml надіслано' };
  }
  if (isMailboxAction_(value)) {
    if (String(confirmed || '') !== '1') {
      throw new Error('Потрібне явне підтвердження цієї дії.');
    }
    return executeMailboxAction_(value, String(messageId || ''));
  }
  throw new Error('Невідома команда.');
}

function isMailboxAction_(action) {
  return Object.prototype.hasOwnProperty.call(MAILBOX_CALLBACK_CODES, String(action || ''));
}

function executeMailboxAction_(action, messageId) {
  if (!/^[a-zA-Z0-9_-]{5,64}$/.test(String(messageId || ''))) {
    throw new Error('Некоректний Gmail ID листа.');
  }
  const metadata = getMailboxActionMetadata_(messageId);
  const labels = new Set(metadata.labelIds || []);
  const subjectLabel = mailboxSubjectLabel_(metadata.subject);

  if (action === 'archive') {
    if (!labels.has('INBOX')) {
      return { ok: true, message: 'Лист уже не у Вхідних: ' + subjectLabel };
    }
    gmailApiRequest_(
      '/messages/' + encodeURIComponent(messageId) + '/modify',
      { method: 'post', body: { removeLabelIds: ['INBOX'] } }
    );
    recordMailboxAction_(action, messageId, 'ok');
    return { ok: true, message: 'Лист архівовано: ' + subjectLabel };
  }

  if (action === 'trash') {
    if (labels.has('TRASH')) {
      return { ok: true, message: 'Лист уже в кошику: ' + subjectLabel };
    }
    gmailApiRequest_(
      '/messages/' + encodeURIComponent(messageId) + '/trash',
      { method: 'post' }
    );
    recordMailboxAction_(action, messageId, 'ok');
    return { ok: true, message: 'Лист переміщено до кошика: ' + subjectLabel };
  }

  if (action === 'spam') {
    if (labels.has('SPAM')) {
      return { ok: true, message: 'Лист уже позначено як спам: ' + subjectLabel };
    }
    gmailApiRequest_(
      '/messages/' + encodeURIComponent(messageId) + '/modify',
      { method: 'post', body: { addLabelIds: ['SPAM'], removeLabelIds: ['INBOX'] } }
    );
    recordMailboxAction_(action, messageId, 'ok');
    return { ok: true, message: 'Лист позначено як спам: ' + subjectLabel };
  }

  if (action === 'unsubscribe') {
    return executeUnsubscribe_(metadata, messageId, subjectLabel);
  }
  if (action === 'inbox') {
    if (labels.has('TRASH')) {
      gmailApiRequest_('/messages/' + encodeURIComponent(messageId) + '/untrash', { method: 'post' });
    }
    gmailApiRequest_(
      '/messages/' + encodeURIComponent(messageId) + '/modify',
      { method: 'post', body: { addLabelIds: ['INBOX'], removeLabelIds: ['SPAM'] } }
    );
    recordMailboxAction_(action, messageId, 'ok');
    return { ok: true, message: 'Лист повернено до Вхідних: ' + subjectLabel };
  }
  if (action === 'untrash') {
    if (labels.has('TRASH')) {
      gmailApiRequest_('/messages/' + encodeURIComponent(messageId) + '/untrash', { method: 'post' });
    }
    gmailApiRequest_(
      '/messages/' + encodeURIComponent(messageId) + '/modify',
      { method: 'post', body: { addLabelIds: ['INBOX'] } }
    );
    recordMailboxAction_(action, messageId, 'ok');
    return { ok: true, message: 'Лист відновлено з кошика: ' + subjectLabel };
  }
  if (action === 'notSpam') {
    gmailApiRequest_(
      '/messages/' + encodeURIComponent(messageId) + '/modify',
      { method: 'post', body: { addLabelIds: ['INBOX'], removeLabelIds: ['SPAM'] } }
    );
    recordMailboxAction_(action, messageId, 'ok');
    return { ok: true, message: 'Позначку «Спам» знято: ' + subjectLabel };
  }
  const labelAction = {
    read: { removeLabelIds: ['UNREAD'], message: 'Позначено прочитаним' },
    unread: { addLabelIds: ['UNREAD'], message: 'Позначено непрочитаним' },
    star: { addLabelIds: ['STARRED'], message: 'Додано зірочку' },
    unstar: { removeLabelIds: ['STARRED'], message: 'Зірочку знято' },
    important: { addLabelIds: ['IMPORTANT'], message: 'Позначено важливим' },
    notImportant: { removeLabelIds: ['IMPORTANT'], message: 'Позначку важливості знято' },
  }[action];
  if (labelAction) {
    const modifyBody = {};
    if (labelAction.addLabelIds) modifyBody.addLabelIds = labelAction.addLabelIds;
    if (labelAction.removeLabelIds) modifyBody.removeLabelIds = labelAction.removeLabelIds;
    gmailApiRequest_(
      '/messages/' + encodeURIComponent(messageId) + '/modify',
      { method: 'post', body: modifyBody }
    );
    recordMailboxAction_(action, messageId, 'ok');
    return { ok: true, message: labelAction.message + ': ' + subjectLabel };
  }
  throw new Error('Невідома поштова дія.');
}

function getMailboxActionMetadata_(messageId) {
  const wanted = [
    'Subject',
    'List-Unsubscribe',
    'List-Unsubscribe-Post',
    'DKIM-Signature',
    'Authentication-Results',
  ];
  const query = ['format=metadata'].concat(
    wanted.map(name => 'metadataHeaders=' + encodeURIComponent(name))
  ).join('&');
  const data = gmailApi_(
    '/messages/' + encodeURIComponent(messageId) + '?' + query
  );
  const headers = (data.payload && data.payload.headers) || [];
  return {
    id: data.id,
    labelIds: data.labelIds || [],
    subject: firstHeaderValue_(headers, 'Subject') || '(без теми)',
    headers,
  };
}

function executeUnsubscribe_(metadata, messageId, subjectLabel) {
  const info = unsubscribeInfoFromHeaders_(metadata.headers || []);
  if (!info.available) {
    throw new Error('Відправник не додав безпечний спосіб відписки для цього листа.');
  }

  if (info.mode === 'one_click') {
    const claim = beginUnsubscribeClaim_(messageId);
    if (claim.alreadySent) {
      return { ok: true, message: 'Запит на відписку для цього листа вже надсилали.' };
    }
    if (!claim.claimed) throw new Error('Запит на відписку вже виконується. Зачекайте трохи.');
    let response;
    try {
      response = performOneClickUnsubscribe_(info.url);
    } catch (error) {
      finishUnsubscribeClaim_(messageId, false);
      throw new Error('Сервіс розсилки тимчасово не відповідає. Спробуйте пізніше.');
    }
    const code = response.getResponseCode();
    if (code < 200 || code >= 300) {
      finishUnsubscribeClaim_(messageId, false);
      console.error('One-click unsubscribe failed with HTTP ' + code + ' for message ' +
        hashedMessageId_(messageId));
      throw new Error('Сервіс розсилки не підтвердив відписку (HTTP ' + code + ').');
    }
    if (!finishUnsubscribeClaim_(messageId, true)) {
      recordMailboxAction_('unsubscribe', messageId, 'one_click_remote_ok_local_state_error');
      return {
        ok: true,
        message: 'Сервіс прийняв відписку. Бот не зміг оновити локальний журнал, тому кнопку вимкнено.',
      };
    }
    recordMailboxAction_('unsubscribe', messageId, 'one_click_ok');
    return { ok: true, message: 'Запит на відписку прийнято: ' + subjectLabel };
  }

  recordMailboxAction_('unsubscribe', messageId, info.mode + '_opened');
  return {
    ok: true,
    message: info.mode === 'mailto'
      ? 'Відкриваю підготовлений лист-відписку в Gmail.'
      : 'Відкриваю сторінку відписки відправника.',
    openUrl: info.openUrl,
  };
}

function performOneClickUnsubscribe_(urlValue) {
  // Resolve and validate immediately before the only outbound POST. Apps Script
  // cannot pin an address for TLS, so every returned A/AAAA answer must be
  // public; mixed public/private answers fail closed.
  const target = assertPublicOneClickUnsubscribeUrl_(urlValue);
  return UrlFetchApp.fetch(target, {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload: 'List-Unsubscribe=One-Click',
    followRedirects: false,
    validateHttpsCertificates: true,
    muteHttpExceptions: true,
  });
}

function assertPublicOneClickUnsubscribeUrl_(candidate) {
  const safe = isSafePublicHttpsUrl_(candidate);
  if (!safe) throw new Error('Небезпечна або некоректна HTTPS-адреса відписки.');
  let parsed;
  try { parsed = new URL(safe); }
  catch (error) { throw new Error('Некоректна HTTPS-адреса відписки.'); }
  parsed.hash = '';
  const host = String(parsed.hostname || '').toLowerCase().replace(/\.$/, '');
  assertPublicOneClickDnsHost_(host);
  return parsed.toString();
}

function assertPublicOneClickDnsHost_(hostValue) {
  const host = String(hostValue || '').toLowerCase();
  const addresses = [];
  [1, 28].forEach(type => {
    let response;
    try {
      response = UrlFetchApp.fetch(
        'https://dns.google/resolve?name=' + encodeURIComponent(host) + '&type=' + type,
        {
          method: 'get',
          headers: { Accept: 'application/dns-json' },
          muteHttpExceptions: true,
          followRedirects: false,
          validateHttpsCertificates: true,
        }
      );
    } catch (error) {
      throw new Error('Не вдалося безпечно перевірити DNS адреси відписки.');
    }
    if (Number(response.getResponseCode()) !== 200) {
      throw new Error('Не вдалося безпечно перевірити DNS адреси відписки.');
    }
    let payload;
    try { payload = JSON.parse(String(response.getContentText() || '')); }
    catch (error) { throw new Error('DNS адреси відписки повернув некоректну відповідь.'); }
    if (!payload || Number(payload.Status) !== 0 || payload.TC === true) {
      throw new Error('DNS адреси відписки не підтвердив публічний домен.');
    }
    const answers = Array.isArray(payload.Answer) ? payload.Answer : [];
    answers.forEach(answer => {
      if (Number(answer && answer.type) === type) {
        addresses.push(String(answer.data || '').trim());
      }
    });
  });
  if (!addresses.length || addresses.some(address => !isPublicOneClickIpAddress_(address))) {
    throw new Error('Домен адреси відписки веде на приватну або службову IP-адресу.');
  }
}

function isPublicOneClickIpAddress_(value) {
  const address = String(value || '').trim().toLowerCase();
  if (/^\d+\.\d+\.\d+\.\d+$/.test(address)) {
    const parts = address.split('.');
    if (parts.some(part => !/^(?:0|[1-9]\d{0,2})$/.test(part) || Number(part) > 255)) return false;
    const a = Number(parts[0]);
    const b = Number(parts[1]);
    const c = Number(parts[2]);
    if (a === 0 || a === 10 || a === 127 || a >= 224 ||
        a === 100 && b >= 64 && b <= 127 ||
        a === 169 && b === 254 ||
        a === 172 && b >= 16 && b <= 31 ||
        a === 192 && (b === 168 || b === 0 && (c === 0 || c === 2) || b === 88 && c === 99) ||
        a === 198 && (b === 18 || b === 19 || b === 51 && c === 100) ||
        a === 203 && b === 0 && c === 113) return false;
    return true;
  }

  if (!/^[0-9a-f:]+$/.test(address) || address.indexOf(':') === -1 ||
      address.indexOf('.') !== -1) return false;
  const halves = address.split('::');
  if (halves.length > 2) return false;
  const left = halves[0] ? halves[0].split(':') : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
  if (left.concat(right).some(part => !/^[0-9a-f]{1,4}$/.test(part))) return false;
  if (halves.length === 1 && left.length !== 8 ||
      halves.length === 2 && left.length + right.length >= 8) return false;
  const fill = halves.length === 2 ? Array(8 - left.length - right.length).fill('0') : [];
  const parts = left.concat(fill, right).map(part => parseInt(part, 16));
  if (parts.length !== 8 || parts.some(part => !Number.isFinite(part))) return false;

  // Accept globally routable unicast only. This rejects loopback, ULA,
  // link-local, multicast, IPv4-mapped, documentation and transition ranges.
  if (parts[0] < 0x2000 || parts[0] > 0x3fff) return false;
  if (parts[0] === 0x2001 && (parts[1] < 0x0200 || parts[1] === 0x0db8)) return false;
  if (parts[0] === 0x2002 || parts[0] === 0x3fff) return false;
  return true;
}
function unsubscribeInfoFromHeaders_(headers) {
  const listValues = headerValues_(headers, 'List-Unsubscribe');
  const candidates = [];
  listValues.forEach(value => {
    const matches = String(value || '').match(/<([^<>]+)>/g) || [];
    matches.forEach(match => candidates.push(match.slice(1, -1).trim()));
  });

  const webCandidates = candidates.filter(value => /^https?:\/\//i.test(String(value || '')));
  const httpsUrls = webCandidates.map(isSafePublicHttpsUrl_).filter(Boolean);
  const httpsUrl = httpsUrls[0] || '';
  const mailto = candidates.map(parseSafeMailto_).find(Boolean) || null;
  const postValues = headerValues_(headers, 'List-Unsubscribe-Post');
  const oneClickHeader = postValues.length === 1 &&
    /^\s*List-Unsubscribe\s*=\s*One-Click\s*$/i.test(postValues[0]);
  const oneClickEligible = Boolean(
    listValues.length === 1 && webCandidates.length === 1 && httpsUrls.length === 1 &&
    httpsUrl && oneClickHeader && dkimAuthorizesOneClick_(headers)
  );

  if (oneClickEligible) {
    return { available: true, mode: 'one_click', url: httpsUrl, openUrl: '' };
  }
  if (httpsUrl) {
    return { available: true, mode: 'web', url: '', openUrl: httpsUrl };
  }
  if (mailto) {
    return {
      available: true,
      mode: 'mailto',
      url: '',
      openUrl: gmailComposeUrlForUnsubscribe_(mailto),
    };
  }
  return { available: false, mode: 'none', url: '', openUrl: '' };
}

function dkimAuthorizesOneClick_(headers) {
  const authResults = headerValues_(headers, 'Authentication-Results')
    .filter(value => /^\s*mx\.google\.com\s*;/i.test(String(value)));
  const signatures = headerValues_(headers, 'DKIM-Signature');
  // RFC 8058 is an externally visible POST. Fail closed when Gmail reports
  // multiple authentication verdicts or the message contains multiple DKIM
  // signatures: correlating an arbitrary `pass` with a different signature is
  // not strong enough authority to unsubscribe the user.
  if (authResults.length !== 1 || signatures.length !== 1) return false;
  const signature = signatures[0];
  const domainMatch = String(signature).match(/(?:^|;)\s*d\s*=\s*([^;\s]+)/i);
  const selectorMatch = String(signature).match(/(?:^|;)\s*s\s*=\s*([^;\s]+)/i);
  const signedHeadersMatch = String(signature).match(/(?:^|;)\s*h\s*=\s*([^;]+)/i);
  const bodyHashMatch = String(signature).match(/(?:^|;)\s*b\s*=\s*([^;]*)/i);
  if (!domainMatch || !selectorMatch || !signedHeadersMatch || !bodyHashMatch) return false;
  const signedNames = signedHeadersMatch[1]
    .split(':')
    .map(name => name.trim().toLowerCase());
  if (signedNames.indexOf('list-unsubscribe') === -1 ||
      signedNames.indexOf('list-unsubscribe-post') === -1) {
    return false;
  }
  const domain = domainMatch[1].replace(/^"|"$/g, '').toLowerCase();
  const selector = selectorMatch[1].replace(/^"|"$/g, '').toLowerCase();
  const signatureB = bodyHashMatch[1].replace(/\s+/g, '');
  if (!domain || !selector || !signatureB) return false;
  return dkimPassMatchesSignature_(authResults, domain, selector, signatureB);
}

function dkimPassMatchesSignature_(authResults, domain, selector, signatureB) {
  const values = Array.isArray(authResults) ? authResults : [authResults];
  if (values.length !== 1) return false;
  const clauses = String(values[0] || '').split(';')
    .map(value => value.trim())
    .filter(value => /^dkim\s*=/i.test(value));
  if (clauses.length !== 1 || !/^dkim\s*=\s*pass\b/i.test(clauses[0])) return false;
  const clause = clauses[0];
  const domainMatch = clause.match(/\bheader\.d\s*=\s*("[^"]+"|[^\s;]+)/i);
  const identityMatch = clause.match(/\bheader\.i\s*=\s*("[^"]+"|[^\s;]+)/i);
  const selectorMatch = clause.match(/\bheader\.s\s*=\s*("[^"]+"|[^\s;]+)/i);
  const signatureMatch = clause.match(/\bheader\.b\s*=\s*("[^"]+"|[^\s;]+)/i);
  if ((!domainMatch && !identityMatch) || !selectorMatch || !signatureMatch) return false;
  const passedDomain = domainMatch
    ? domainMatch[1].replace(/^"|"$/g, '').toLowerCase()
    : dkimIdentityDomain_(identityMatch[1]);
  const passedSelector = selectorMatch[1].replace(/^"|"$/g, '').toLowerCase();
  const passedB = signatureMatch[1].replace(/^"|"$/g, '');
  return passedDomain === domain && passedSelector === selector &&
    Boolean(passedB) && signatureB.indexOf(passedB) === 0;
}

function dkimIdentityDomain_(identity) {
  const value = String(identity || '').replace(/^"|"$/g, '').toLowerCase();
  const at = value.lastIndexOf('@');
  return at >= 0 && at < value.length - 1 ? value.slice(at + 1) : '';
}

function headerValues_(headers, name) {
  const wanted = String(name || '').toLowerCase();
  return (headers || [])
    .filter(header => String(header.name || '').toLowerCase() === wanted)
    .map(header => String(header.value || '').replace(/\r?\n[ \t]+/g, ' ').trim());
}

function firstHeaderValue_(headers, name) {
  return headerValues_(headers, name)[0] || '';
}

function isSafePublicHttpsUrl_(candidate) {
  const raw = String(candidate || '').trim();
  if (!raw || raw.length > 2048) return '';
  if (/[\u0000-\u0020\\]/.test(raw)) return '';
  const match = raw.match(/^https:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  if (!match) return '';
  const authority = match[1];
  if (!authority || authority.indexOf('@') !== -1 || authority.indexOf('[') !== -1 ||
      authority.indexOf(']') !== -1) return '';

  if (authority.indexOf(':') !== -1) return '';
  const host = authority.toLowerCase().replace(/\.$/, '');
  const numericHostLabels = host.split('.').every(label =>
    /^(?:\d+|0x[0-9a-f]+)$/i.test(label)
  );
  if (!host || host.indexOf('.') === -1 || host.indexOf('..') !== -1 ||
      !/^[a-z0-9.-]+$/.test(host) || numericHostLabels ||
      host === 'localhost' || host.endsWith('.localhost') ||
      host.endsWith('.local') || host.endsWith('.internal') ||
      host.endsWith('.home') || host.endsWith('.lan') ||
      host === 'nip.io' || host.endsWith('.nip.io') ||
      host === 'sslip.io' || host.endsWith('.sslip.io') ||
      host === 'xip.io' || host.endsWith('.xip.io') ||
      host === 'localtest.me' || host.endsWith('.localtest.me') ||
      host === 'lvh.me' || host.endsWith('.lvh.me')) return '';
  const labels = host.split('.');
  if (labels.some(label => !label || label.length > 63 || label.startsWith('-') || label.endsWith('-'))) {
    return '';
  }
  return raw;
}

function parseSafeMailto_(candidate) {
  const raw = String(candidate || '').trim();
  if (!/^mailto:/i.test(raw) || raw.length > 2048) return null;
  const value = raw.slice(raw.indexOf(':') + 1);
  const separator = value.indexOf('?');
  const rawAddress = separator === -1 ? value : value.slice(0, separator);
  const rawQuery = separator === -1 ? '' : value.slice(separator + 1);
  let address;
  try { address = decodeURIComponent(rawAddress); } catch (error) { return null; }
  if (!/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(address)) return null;
  const fields = {};
  rawQuery.split('&').filter(Boolean).forEach(pair => {
    const index = pair.indexOf('=');
    const keyPart = index === -1 ? pair : pair.slice(0, index);
    const valuePart = index === -1 ? '' : pair.slice(index + 1);
    try {
      const key = decodeURIComponent(keyPart.replace(/\+/g, ' ')).toLowerCase();
      if (key === 'subject' || key === 'body') {
        fields[key] = decodeURIComponent(valuePart.replace(/\+/g, ' '));
      }
    } catch (error) {
      // Ignore malformed optional fields.
    }
  });
  return {
    to: address,
    subject: String(fields.subject || 'unsubscribe').slice(0, 240),
    body: String(fields.body || 'Please unsubscribe this address.').slice(0, 2000),
  };
}

function gmailComposeUrlForUnsubscribe_(mailto) {
  return 'https://mail.google.com/mail/?authuser=' + encodeURIComponent(CONFIG.GMAIL_ACCOUNT) +
    '&view=cm&fs=1&to=' + encodeURIComponent(mailto.to) +
    '&su=' + encodeURIComponent(mailto.subject) +
    '&body=' + encodeURIComponent(mailto.body);
}

function mailboxSubjectLabel_(subject) {
  const clean = String(subject || '(без теми)').replace(/\s+/g, ' ').trim();
  return clean.length > 90 ? clean.slice(0, 87) + '…' : clean;
}

function beginUnsubscribeClaim_(messageId) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(3000)) return { claimed: false, alreadySent: false };
  try {
    const props = PropertiesService.getScriptProperties();
    const sent = readJsonArrayProperty_(props, 'UNSUBSCRIBED_MESSAGE_IDS');
    const id = String(messageId);
    const stateKey = unsubscribeStateKey_(id);
    if (props.getProperty(stateKey) === 'sent' || sent.indexOf(id) !== -1) {
      return { claimed: false, alreadySent: true };
    }
    const now = Date.now();
    const directState = String(props.getProperty(stateKey) || '');
    const directPendingAt = directState.indexOf('pending:') === 0
      ? Number(directState.slice('pending:'.length))
      : 0;
    if (directPendingAt && now - directPendingAt < 15 * 60 * 1000) {
      return { claimed: false, alreadySent: false };
    }
    const claims = readJsonArrayProperty_(props, 'UNSUBSCRIBE_CLAIMS')
      .filter(item => item && item.id && now - Number(item.at || 0) < 15 * 60 * 1000);
    if (claims.some(item => String(item.id) === id)) {
      return { claimed: false, alreadySent: false };
    }
    claims.push({ id, at: now });
    props.setProperty(stateKey, 'pending:' + now);
    props.setProperty('UNSUBSCRIBE_CLAIMS', JSON.stringify(claims.slice(-50)));
    return { claimed: true, alreadySent: false };
  } finally {
    lock.releaseLock();
  }
}

function finishUnsubscribeClaim_(messageId, succeeded) {
  const props = PropertiesService.getScriptProperties();
  const id = String(messageId);
  const stateKey = unsubscribeStateKey_(id);
  try {
    if (succeeded) {
      // This per-message marker is the durable idempotency source. It is saved
      // before best-effort cleanup of the shared audit arrays, so even lock
      // contention cannot cause a second external one-click POST.
      props.setProperty(stateKey, 'sent');
    } else {
      props.deleteProperty(stateKey);
    }
  } catch (stateError) {
    console.error('Could not persist unsubscribe state for ' + hashedMessageId_(messageId));
    return false;
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    console.error('Could not clean unsubscribe audit claim for ' + hashedMessageId_(messageId));
    return true;
  }
  try {
    const claims = readJsonArrayProperty_(props, 'UNSUBSCRIBE_CLAIMS')
      .filter(item => item && String(item.id) !== id);
    props.setProperty('UNSUBSCRIBE_CLAIMS', JSON.stringify(claims.slice(-50)));
    if (succeeded) {
      const sent = readJsonArrayProperty_(props, 'UNSUBSCRIBED_MESSAGE_IDS');
      if (sent.indexOf(id) === -1) sent.push(id);
      props.setProperty('UNSUBSCRIBED_MESSAGE_IDS', JSON.stringify(sent.slice(-200)));
    }
    return true;
  } finally {
    lock.releaseLock();
  }
}

function unsubscribeStateKey_(messageId) {
  return 'UNSUBSCRIBE_STATE_' + String(messageId || '');
}

function readJsonArrayProperty_(props, name) {
  try {
    const value = JSON.parse(props.getProperty(String(name)) || '[]');
    return Array.isArray(value) ? value : [];
  } catch (error) {
    return [];
  }
}

function recordMailboxAction_(action, messageId, status) {
  const props = PropertiesService.getScriptProperties();
  let audit = [];
  try { audit = JSON.parse(props.getProperty('MAIL_ACTION_AUDIT') || '[]'); } catch (error) { audit = []; }
  audit.push({
    at: Date.now(),
    action: String(action || ''),
    message: hashedMessageId_(messageId),
    status: String(status || ''),
  });
  props.setProperty('MAIL_ACTION_AUDIT', JSON.stringify(audit.slice(-50)));
}

function hashedMessageId_(messageId) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(messageId || ''),
    Utilities.Charset.UTF_8
  );
  return bytesToHex_(digest).slice(0, 16);
}

function validateTelegramMiniApp_(initData) {
  const user = validateTelegramMiniAppIdentity_(initData);
  const chatId = requireSetting_(PropertiesService.getScriptProperties(), 'CHAT_ID');
  if (String(user.id || '') !== String(chatId)) throw new Error('Ця кнопка доступна лише власнику бота.');
  return user;
}

function telegramPrivateUserId_(update) {
  const message = update && (update.message || update.callback_query && update.callback_query.message);
  const from = update && (update.message && update.message.from || update.callback_query && update.callback_query.from);
  const chat = message && message.chat;
  const userId = String(from && from.id || '');
  if (!chat || String(chat.type || '') !== 'private' || String(chat.id || '') !== userId ||
      !/^\d{1,24}$/.test(userId)) return '';
  return userId;
}

/** Non-owner users can create only their isolated workspace from chat. */
function routeTenantBootstrapUpdate_(update, userId) {
  try {
    mailboxMultiEnsurePersonalWorkspace_(userId);
    if (update && update.callback_query) {
      answerTelegramCallback_(update.callback_query.id, 'Відкрийте пошту через кнопку нижче');
      return;
    }
    const text = String(update && update.message && update.message.text || '');
    if (text && text.charAt(0) === '/' && !/^\/(?:start|mail)(?:@\w+)?(?:\s|$)/i.test(text)) return;
    sendTelegramText_(
      '📬 <b>Ваша особиста пошта в Telegram</b>\n\n' +
      'Підключіть один або кілька Gmail-акаунтів. Кожна скринька ізольована вашим Telegram ID; ' +
      'пароль вводиться лише на сторінці Google.',
      JSON.stringify({ inline_keyboard: [
        [{ text: '📬 Відкрити мою пошту', web_app: { url: mailboxBootstrapUrl_() } }],
        [{ text: '⚙️ Мої Gmail-акаунти', callback_data: BOT_UI.SETTINGS_ACTION }],
      ] }),
      { chatId: userId, silent: false }
    );
  } catch (error) {
    console.error('Could not initialize isolated Telegram mailbox workspace.');
  }
}

function routeTenantUpdate_(update, userId) {
  const callback = update && update.callback_query;
  const data = String(callback && callback.data || '');
  const text = String(update && update.message && update.message.text || '').trim();
  if ((callback && data === BOT_UI.SETTINGS_ACTION) ||
      (!callback && /^\/settings(?:@\w+)?$/i.test(text))) {
    const result = sendSettingsMenu_(userId, userId);
    if (callback) answerTelegramCallback_(callback.id, 'Налаштування оновлено');
    return result;
  }
  if (!callback && (text === BOT_UI.FOCUS_TEXT || /^\/focus(?:@\w+)?(?:\s|$)/i.test(text))) {
    const textClaim = claimTelegramUpdate_(update.update_id, update);
    if (textClaim !== 'new' && textClaim !== 'retry') return;
    try {
      const result = sendTelegramFocusRules_(update.update_id, text, update.message, userId);
      completeTelegramUpdate_(update.update_id);
      return result;
    } catch (error) {
      failTelegramUpdate_(update.update_id, error);
      if (error && error.telegramFocusInput) {
        sendTelegramText_(
          '<b>⚠️ Не вдалося створити правило</b>\n\n' + escapeHtml_(error.message),
          null,
          { chatId: userId, replyTo: update.message && update.message.message_id, silent: true }
        );
        return;
      }
      throw error;
    }
  }
  const mailbox = callback ? parseMailboxCallback_(data) : null;
  const focus = callback ? parseTelegramFocusCallback_(data) : null;
  const focusRule = callback ? parseTelegramFocusRuleCallback_(data) : null;
  const reminder = callback ? parseMailReminderCallback_(data) : null;
  const content = callback ? parseMailboxContentCallback_(data) : null;
  const attachment = callback ? parseAttachmentCallback_(data) : null;
  const accountSwitch = callback ? parseTelegramGmailAccountCallback_(data) : null;
  const connectionId = String(mailbox && mailbox.connectionId || focus && focus.connectionId ||
    focusRule && focusRule.connectionId || content && content.connectionId ||
    attachment && attachment.connectionId || accountSwitch && accountSwitch.connectionId || '');
  if (!callback || (!connectionId && !reminder)) {
    routeTenantBootstrapUpdate_(update, userId);
    return;
  }
  const claim = claimTelegramUpdate_(update.update_id, update);
  if (claim !== 'new' && claim !== 'retry') {
    answerTelegramCallback_(callback.id, claim === 'busy' ? 'Команда вже виконується' : 'Цю команду вже виконано');
    return;
  }
  try {
    const replyTo = callback.message && callback.message.message_id;
    const result = accountSwitch
      ? switchTelegramGmailAccount_(userId, userId, accountSwitch.connectionId)
      : reminder
      ? executeMailReminderCallback_(callback, reminder, String(userId))
      : focusRule
      ? handleTelegramFocusRuleCallback_(callback, focusRule, String(userId))
      : focus
      ? executeTelegramFocusCallback_(callback, focus, {
          userId: String(userId), chatId: String(userId),
        })
      : mailbox
      ? executeDurableMailboxCallback_(update.update_id, callback, mailbox, {
          userId: String(userId), chatId: String(userId),
        })
      : withMailboxConnectionContext_(userId, connectionId, 'viewer', () => {
          if (content && content.kind === 'original') {
            return sendFullOriginalForMessage_(content.messageId, replyTo, null, String(userId));
          }
          if (content && content.kind === 'eml') {
            return sendEmlForMessage_(content.messageId, replyTo, null, String(userId));
          }
          return sendAttachmentByIndex_(attachment.messageId, attachment.index, replyTo, null, String(userId));
        });
    answerTelegramCallback_(callback.id, String(result && result.message || '✅ Готово'));
    completeTelegramUpdate_(update.update_id);
  } catch (error) {
    failTelegramUpdate_(update.update_id, error);
    answerTelegramCallback_(callback.id, '⚠️ ' + String(error && error.message || 'Не вдалося виконати'));
  }
}

function serveGoogleOAuthStart_(e) {
  let authorizationUrl = '';
  let errorMessage = '';
  try {
    const params = e && e.parameter ? e.parameter : {};
    authorizationUrl = mailboxGoogleResolveOAuthStart_(String(params.state || '')).authorizationUrl;
  } catch (error) {
    errorMessage = String(error && error.message || 'Посилання Google недійсне або завершилося.').slice(0, 500);
  }
  const safeScriptUrl = JSON.stringify(authorizationUrl).replace(/</g, '\\u003c');
  const html = '<!doctype html><html lang="uk"><head><base target="_top">' +
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="referrer" content="no-referrer"><meta name="robots" content="noindex,nofollow,noarchive">' +
    '<meta http-equiv="Cache-Control" content="no-store"><style>' +
    'body{font:16px system-ui;margin:0;background:#f6f8fb;color:#172033;display:grid;place-items:center;min-height:100vh}' +
    '.card{box-sizing:border-box;max-width:430px;margin:20px;padding:28px;border-radius:20px;background:#fff;text-align:center;box-shadow:0 12px 36px #1720331a}' +
    'a{display:inline-block;border-radius:12px;padding:11px 18px;background:#1778d4;color:#fff;font-weight:600;text-decoration:none}' +
    '</style></head><body><main class="card"><h1>' + (authorizationUrl ? 'Відкриваємо Google' : 'Посилання завершилося') + '</h1><p>' +
    escapeHtml_(authorizationUrl ? 'Зачекайте: зараз відкриється офіційна сторінка Google.' : errorMessage) + '</p>' +
    (authorizationUrl ? '<a href="' + escapeHtml_(authorizationUrl) + '">Продовжити в Google</a>' :
      '<a href="https://t.me/TarasevychGmailNotifierBot">Повернутися в Telegram</a>') +
    '</main>' + (authorizationUrl ? '<script>location.replace(' + safeScriptUrl + ')</script>' : '') +
    '</body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('Google Gmail · Telegram');
}

function serveGoogleOAuthRelayPost_(e) {
  let ok = false;
  try {
    const params = e && e.parameter ? e.parameter : {};
    const result = mailboxGoogleHandleOAuthCallback_({
      code: String(params.code || ''),
      state: String(params.state || ''),
      error: String(params.error || ''),
      errorDescription: '',
    });
    ok = Boolean(result && result.ok);
    if (ok && /^\d{1,24}$/.test(String(result.telegramUserId || ''))) {
      try {
        sendSettingsMenu_(String(result.telegramUserId), String(result.telegramChatId || result.telegramUserId));
      } catch (notificationError) {
        console.error('Gmail OAuth relay completed but Telegram refresh failed: ' +
          String(notificationError && notificationError.message || notificationError));
      }
    }
  } catch (error) {
    console.error('Gmail OAuth relay failed: ' + String(error && error.message || error));
  }
  return ContentService.createTextOutput(ok ? 'ok' : 'failed')
    .setMimeType(ContentService.MimeType.TEXT);
}

function serveGoogleOAuthCallback_(e) {
  let result = null;
  let ok = false;
  try {
    const params = e && e.parameter ? e.parameter : {};
    result = mailboxGoogleHandleOAuthCallback_({
      code: String(params.code || ''),
      state: String(params.state || ''),
      error: String(params.error || ''),
      errorDescription: String(params.error_description || ''),
    });
    ok = Boolean(result && result.ok);
    if (ok && /^\d{1,24}$/.test(String(result.telegramUserId || ''))) {
      try {
        sendSettingsMenu_(String(result.telegramUserId), String(result.telegramChatId || result.telegramUserId));
      } catch (notificationError) {
        console.error('Gmail OAuth completed but Telegram refresh failed: ' +
          String(notificationError && notificationError.message || notificationError));
      }
    }
  } catch (error) {
    result = { message: String(error && error.message || 'Не вдалося підключити Gmail.').slice(0, 500) };
  }
  const title = ok ? 'Gmail підключено' : 'Не вдалося підключити Gmail';
  const message = String(result && result.message || (ok
    ? 'Акаунт готовий до роботи в Telegram.'
    : 'Поверніться до Mini App і спробуйте ще раз.'));
  const telegramUrl = 'https://t.me/TarasevychGmailNotifierBot?start=gmail_connected';
  const html = '<!doctype html><html lang="uk"><head><base target="_top">' +
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="referrer" content="no-referrer"><meta name="robots" content="noindex,nofollow,noarchive">' +
    '<meta http-equiv="Cache-Control" content="no-store"><style>' +
    'body{font:16px system-ui;margin:0;background:#f6f8fb;color:#172033;display:grid;place-items:center;min-height:100vh}' +
    '.card{box-sizing:border-box;max-width:430px;margin:20px;padding:28px;border-radius:20px;background:#fff;text-align:center;box-shadow:0 12px 36px #1720331a}' +
    '.mark{font-size:42px;color:' + (ok ? '#16835f' : '#c62828') + '}h1{font-size:21px;margin:12px 0}' +
    'p{line-height:1.5;color:#586174}.actions{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}' +
    'button,a{border:0;border-radius:12px;padding:11px 18px;font:600 15px system-ui;text-decoration:none}' +
    'button{background:#eef3f8;color:#30445a}a{background:#1778d4;color:#fff}' +
    '</style><script>try{history.replaceState(null,"",location.pathname+"?action=gmail_oauth_callback")}catch(e){}</script>' +
    '</head><body><main class="card"><div class="mark">' + (ok ? '✓' : '!') + '</div><h1>' +
    escapeHtml_(title) + '</h1><p>' + escapeHtml_(message) + '</p><div class="actions">' +
    '<button type="button" onclick="window.close()">Закрити</button>' +
    '<a href="' + telegramUrl + '">Повернутися в Telegram</a></div></main>' +
    (ok ? '<script>setTimeout(function(){location.replace("' + telegramUrl + '")},1200)</script>' : '') +
    '</body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('Gmail · Telegram');
}

function serveDriveOAuthCallback_(e) {
  let result = null;
  let ok = false;
  try {
    const params = e && e.parameter ? e.parameter : {};
    result = mailboxDriveHandleOAuthCallback_({
      code: String(params.code || ''),
      state: String(params.state || ''),
      error: String(params.error || ''),
      errorDescription: String(params.error_description || ''),
    });
    ok = Boolean(result && result.ok);
  } catch (error) {
    result = { message: String(error && error.message || 'Не вдалося підключити Google Drive.').slice(0, 500) };
  }
  const title = ok ? 'Google Drive підключено' : 'Не вдалося підключити Google Drive';
  const account = result && result.account && result.account.email ? ' (' + result.account.email + ')' : '';
  const message = ok
    ? 'Акаунт' + account + ' можна вибирати окремо від Gmail-відправника.'
    : String(result && result.message || 'Поверніться до Mini App і спробуйте ще раз.');
  const html = '<!doctype html><html lang="uk"><head><base target="_top">' +
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="referrer" content="no-referrer"><meta name="robots" content="noindex,nofollow,noarchive">' +
    '<meta http-equiv="Cache-Control" content="no-store"><style>' +
    'body{font:16px system-ui;margin:0;background:#f6f8fb;color:#172033;display:grid;place-items:center;min-height:100vh}' +
    '.card{box-sizing:border-box;max-width:430px;margin:20px;padding:28px;border-radius:20px;background:#fff;text-align:center;box-shadow:0 12px 36px #1720331a}' +
    '.mark{font-size:42px;color:' + (ok ? '#16835f' : '#c62828') + '}h1{font-size:21px;margin:12px 0}' +
    'p{line-height:1.5;color:#586174}button{border:0;border-radius:12px;padding:11px 18px;background:#1778d4;color:#fff;font:600 15px system-ui}' +
    '</style><script>try{history.replaceState(null,"",location.pathname+"?action=drive_oauth_callback")}catch(e){}</script>' +
    '</head><body><main class="card"><div class="mark">' + (ok ? '✓' : '!') + '</div><h1>' +
    escapeHtml_(title) + '</h1><p>' + escapeHtml_(message) + '</p><button type="button" onclick="window.close()">' +
    'Закрити й повернутися до Telegram</button></main></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('Google Drive · Telegram');
}

/** Validate Telegram identity without granting access to any mailbox. */
function validateTelegramMiniAppIdentity_(initData) {
  const parsed = parseTelegramMiniAppInitData_(initData);
  const fields = parsed.fields;
  const receivedHash = parsed.receivedHash;
  if (!/^[a-f0-9]{64}$/.test(receivedHash)) throw new Error('Telegram-підпис відсутній.');
  const token = requireSetting_(PropertiesService.getScriptProperties(), 'BOT_TOKEN');
  const secretKey = Utilities.computeHmacSha256Signature(token, 'WebAppData');
  const calculatedHash = bytesToHex_(
    Utilities.computeHmacSha256Signature(
      Utilities.newBlob(parsed.dataCheckString, 'text/plain').getBytes(),
      secretKey
    )
  );
  if (!constantTimeEqual_(calculatedHash, receivedHash)) {
    throw new Error('Недійсний Telegram-підпис.');
  }
  const authDate = Number(fields.auth_date || 0);
  if (!authDate || Math.abs(Date.now() / 1000 - authDate) > 10 * 60) {
    throw new Error('Telegram-команда застаріла. Натисніть кнопку ще раз.');
  }
  let user = {};
  try { user = JSON.parse(fields.user || '{}'); } catch (error) { user = {}; }
  if (!/^\d{1,24}$/.test(String(user.id || ''))) {
    throw new Error('Telegram-користувач у підписаній команді недійсний.');
  }
  return user;
}

function parseTelegramMiniAppInitData_(initData) {
  const raw = String(initData || '');
  if (!raw || raw.length > 16384) {
    throw new Error('Команду потрібно відкрити кнопкою всередині Telegram.');
  }
  const fields = Object.create(null);
  raw.split('&').forEach(pair => {
    const separator = pair.indexOf('=');
    let key = '';
    let value = '';
    try {
      key = decodeURIComponent(
        (separator === -1 ? pair : pair.slice(0, separator)).replace(/\+/g, ' ')
      );
      value = decodeURIComponent(
        (separator === -1 ? '' : pair.slice(separator + 1)).replace(/\+/g, ' ')
      );
    } catch (error) {
      throw new Error('Telegram-команда має некоректне кодування.');
    }
    if (!/^[A-Za-z0-9_]{1,64}$/.test(key)) {
      throw new Error('Telegram-команда містить некоректний параметр.');
    }
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      throw new Error('Telegram-команда містить повторений параметр.');
    }
    fields[key] = value;
  });
  return {
    fields,
    receivedHash: String(fields.hash || '').toLowerCase(),
    dataCheckString: Object.keys(fields)
      .filter(key => key !== 'hash')
      .sort()
      .map(key => key + '=' + fields[key])
      .join('\n'),
  };
}

function bytesToHex_(bytes) {
  return (bytes || []).map(value => ('0' + ((value + 256) % 256).toString(16)).slice(-2)).join('');
}

function constantTimeEqual_(left, right) {
  const a = String(left || '');
  const b = String(right || '');
  let difference = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i += 1) {
    difference |= (a.charCodeAt(i % Math.max(1, a.length)) || 0) ^
      (b.charCodeAt(i % Math.max(1, b.length)) || 0);
  }
  return difference === 0;
}

function ensureControlToken_(properties) {
  return ensureRandomTokenProperty_(properties, 'CONTROL_TOKEN');
}

function ensureWebhookKey_(properties) {
  return ensureRandomTokenProperty_(properties, 'WEBHOOK_KEY');
}

function ensureRandomTokenProperty_(properties, name) {
  const props = properties || PropertiesService.getScriptProperties();
  const propertyName = String(name || 'PRIVATE_TOKEN');
  let token = String(props.getProperty(propertyName) || '');
  if (!/^[A-Za-z0-9_-]{40,128}$/.test(token)) {
    const entropy = [
      Utilities.getUuid(),
      Utilities.getUuid(),
      String(Date.now()),
      String(Math.random()),
    ].join(':');
    token = Utilities.base64EncodeWebSafe(
      Utilities.computeDigest(
        Utilities.DigestAlgorithm.SHA_256,
        entropy,
        Utilities.Charset.UTF_8
      )
    ).replace(/=+$/g, '');
    props.setProperty(propertyName, token);
  }
  return token;
}

function validateControlToken_(candidate) {
  const expected = ensureControlToken_();
  if (!constantTimeEqual_(expected, String(candidate || ''))) {
    throw new Error('Недійсний приватний ключ кнопки.');
  }
}

function webAppActionUrl_(action, messageId) {
  const controlPage = String(CONFIG.CONTROL_PAGE_URL || CONFIG.WEB_APP_URL).replace(/\/$/, '');
  let url = controlPage + '?v=' + encodeURIComponent(String(CONFIG.CONTROL_PAGE_REVISION || '1')) +
    '&action=' + encodeURIComponent(String(action || 'menu'));
  if (messageId) url += '&message_id=' + encodeURIComponent(String(messageId));
  url += '&key=' + encodeURIComponent(ensureControlToken_());
  return url;
}

function mailboxAppUrl_(view, threadId, messageId, panel) {
  const base = mailboxBootstrapUrl_();
  const state = [];
  if (view) state.push('view=' + encodeURIComponent(String(view)));
  if (threadId) state.push('thread=' + encodeURIComponent(String(threadId)));
  if (messageId) state.push('message=' + encodeURIComponent(String(messageId)));
  if (panel && ['labels'].indexOf(String(panel)) !== -1) {
    state.push('panel=' + encodeURIComponent(String(panel)));
  }
  return state.length ? base + '#' + state.join('&') : base;
}

function mailboxFolderUrl_(folderKey, filterKey) {
  const base = mailboxBootstrapUrl_();
  const key = String(folderKey || '').trim();
  if (!key) return base;
  let route = '#view=list&folder=' + encodeURIComponent(key);
  const filter = String(filterKey || '').trim().toLowerCase();
  if (['all', 'unread', 'read', 'starred', 'important', 'attachments'].indexOf(filter) !== -1 &&
      filter !== 'all') {
    route += '&filter=' + encodeURIComponent(filter);
  }
  return base + route;
}

function mailboxBootstrapUrl_() {
  const controlPage = String(CONFIG.CONTROL_PAGE_URL || '').replace(/\/$/, '');
  if (!/^https:\/\//i.test(controlPage)) {
    throw new Error('CONTROL_PAGE_URL must be a public HTTPS URL.');
  }
  return controlPage + '?v=' + encodeURIComponent(String(CONFIG.CONTROL_PAGE_REVISION || '1')) +
    '&action=mailbox';
}

/**
 * Mailbox launches start in Telegram's top-level GitHub Pages Web App, where
 * Telegram.WebApp.initData is available. That page form-POSTs the signed data
 * here, keeping it out of URLs, browser history, referrers, and client storage.
 */
function serveMailboxLaunchPost_(e) {
  const params = e && e.parameter ? e.parameter : {};
  const rawInitData = String(params.init_data || '');
  const opened = mailboxOpenSession(rawInitData);
  if (!opened || opened.ok !== true || !opened.data) {
    const message = opened && opened.error && opened.error.message
      ? String(opened.error.message)
      : 'Не вдалося перевірити Telegram-команду.';
    return serveMailboxApp_({
      launchError: message,
      launchErrorCode: opened && opened.error && opened.error.code,
      capacityRecoveryToken: opened && opened.capacityRecoveryToken,
    });
  }

  const token = String(opened.data.sessionToken || '');
  const refreshToken = String(opened.data.refreshToken || '');
  if (!/^[A-Za-z0-9_-]{40,128}$/.test(token)) {
    return serveMailboxApp_({ launchError: 'Сервер не створив захищену сесію пошти.' });
  }
  if (!/^mbr1\.[A-Za-z0-9_-]{40,384}\.[A-Za-z0-9_-]{43}$/.test(refreshToken)) {
    return serveMailboxApp_({ launchError: 'Сервер не створив токен оновлення сесії пошти.' });
  }
  const launchNonce = storeMailboxLaunchSession_(token, refreshToken);
  return serveMailboxApp_({
    launchNonce,
    route: normalizeMailboxLaunchRoute_(params.route),
  });
}

function claimMailboxLaunchInitData_(rawInitData) {
  // validateTelegramMiniApp_ runs immediately before this function. Deriving
  // the claim from its canonical signed hash makes reordered or equivalently
  // percent-encoded copies collide with the original launch.
  const parsed = parseTelegramMiniAppInitData_(rawInitData);
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    parsed.receivedHash,
    Utilities.Charset.UTF_8
  );
  const claimId = Utilities.base64EncodeWebSafe(digest).replace(/=+$/g, '');
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    throw new Error('Пошта вже відкривається. Спробуйте ще раз за кілька секунд.');
  }
  try {
    const props = PropertiesService.getScriptProperties();
    const now = Date.now();
    let claims = [];
    try { claims = JSON.parse(props.getProperty('MAILBOX_INITDATA_CLAIMS') || '[]'); } catch (error) { claims = []; }
    claims = (Array.isArray(claims) ? claims : [])
      .filter(item => item && /^[A-Za-z0-9_-]{43}$/.test(String(item.id || '')) &&
        now - Number(item.at || 0) < 10 * 60 * 1000);
    if (claims.some(item => constantTimeEqual_(String(item.id), claimId))) {
      throw new Error('Цю Telegram-команду вже використано. Закрийте вікно та відкрийте пошту ще раз.');
    }
    if (claims.length >= 100) {
      throw new Error('Забагато активних запусків пошти. Спробуйте пізніше.');
    }
    claims.push({ id: claimId, at: now });
    const serialized = JSON.stringify(claims);
    assertTelegramPropertyValueFits_('MAILBOX_INITDATA_CLAIMS', serialized);
    assertTelegramPropertyStoreFits_(props, { MAILBOX_INITDATA_CLAIMS: serialized });
    props.setProperty('MAILBOX_INITDATA_CLAIMS', serialized);
  } finally {
    lock.releaseLock();
  }
}

function storeMailboxLaunchSession_(sessionToken, refreshTokenValue) {
  const token = String(sessionToken || '');
  const refreshToken = String(refreshTokenValue || '');
  if (!/^[A-Za-z0-9_-]{40,128}$/.test(token)) {
    throw new Error('Сервер не створив захищену сесію пошти.');
  }
  if (!/^mbr1\.[A-Za-z0-9_-]{40,384}\.[A-Za-z0-9_-]{43}$/.test(refreshToken)) {
    throw new Error('Сервер не створив токен оновлення сесії пошти.');
  }
  const nonce = mailboxRandomToken_();
  CacheService.getScriptCache().put(
    mailboxLaunchSessionKey_(nonce),
    JSON.stringify({ version: 2, token, refreshToken, createdAt: Date.now() }),
    60
  );
  return nonce;
}

/** Redeem the one-use launch nonce from MailApp for the in-memory RPC bearer. */
function mailboxRedeemLaunch(launchNonce) {
  try {
    const nonce = String(launchNonce || '');
    if (!/^[A-Za-z0-9_-]{40,128}$/.test(nonce)) {
      throw mailboxError_('UNAUTHORIZED', 'Код запуску пошти недійсний. Відкрийте Mini App знову.');
    }
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) {
      throw mailboxError_('BUSY', 'Пошта вже відкривається. Спробуйте ще раз.');
    }
    let serialized = '';
    try {
      const cache = CacheService.getScriptCache();
      const key = mailboxLaunchSessionKey_(nonce);
      serialized = String(cache.get(key) || '');
      cache.remove(key);
    } finally {
      lock.releaseLock();
    }

    let launch = null;
    try { launch = JSON.parse(serialized); } catch (error) { launch = null; }
    if (!launch || launch.version !== 2 ||
        Date.now() - Number(launch.createdAt || 0) > 60 * 1000) {
      throw mailboxError_('SESSION_EXPIRED', 'Код запуску завершився. Відкрийте Mini App знову.');
    }
    const token = String(launch.token || '');
    const refreshToken = String(launch.refreshToken || '');
    const session = mailboxRequireSession_(token);
    mailboxVerifyRefreshToken_(refreshToken);
    return mailboxOk_({
      sessionToken: token,
      refreshToken,
      expiresInSeconds: mailboxSessionRemainingSeconds_(session),
    });
  } catch (error) {
    return mailboxFailure_(error, 'UNAUTHORIZED');
  }
}

function mailboxLaunchSessionKey_(nonce) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(nonce || ''),
    Utilities.Charset.UTF_8
  );
  return 'mailbox.launch.session.v1.' +
    Utilities.base64EncodeWebSafe(digest).replace(/=+$/g, '');
}

function normalizeMailboxLaunchRoute_(value) {
  const raw = String(value || '').replace(/^#/, '').trim();
  if (!raw || raw.length > 512 || /[\u0000-\u001F\u007F]/.test(raw)) return '';

  const fields = {};
  const parts = raw.split('&');
  if (parts.length > 5) return '';
  try {
    for (const part of parts) {
      if (!part) continue;
      const separator = part.indexOf('=');
      const rawKey = separator === -1 ? part : part.slice(0, separator);
      const rawValue = separator === -1 ? '' : part.slice(separator + 1);
      const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
      if (!/^(view|thread|message|folder|filter|panel)$/.test(key) ||
          Object.prototype.hasOwnProperty.call(fields, key)) return '';
      fields[key] = decodeURIComponent(rawValue.replace(/\+/g, ' '));
    }
  } catch (error) {
    return '';
  }

  const view = String(fields.view || '').toLowerCase();
  if (view === 'thread') {
    const threadId = mailboxLaunchRouteId_(fields.thread);
    const messageId = mailboxLaunchRouteId_(fields.message);
    const panel = String(fields.panel || '').toLowerCase();
    if (!threadId || fields.folder || fields.filter || (panel && panel !== 'labels')) return '';
    return 'view=thread&thread=' + encodeURIComponent(threadId) +
      (messageId ? '&message=' + encodeURIComponent(messageId) : '') +
      (panel ? '&panel=' + encodeURIComponent(panel) : '');
  }
  if (view !== 'list' || fields.thread || fields.message || fields.panel) return '';

  const rawFolder = String(fields.folder || '');
  const systemFolders = new Set([
    'inbox', 'sent', 'draft', 'drafts', 'snoozed', 'archive', 'trash', 'spam',
    'all', 'important', 'starred',
    'primary', 'social', 'promotions', 'updates', 'forums',
  ]);
  const lowerFolder = rawFolder.toLowerCase();
  const filter = String(fields.filter || '').toLowerCase();
  const filterAliases = {
    unread: 'unread',
    starred: 'starred',
    important: 'important',
    attachments: 'hasAttachment',
    hasattachment: 'hasAttachment',
  };
  const safeFilter = filterAliases[filter] || '';
  if (fields.filter && !safeFilter) return '';
  if (systemFolders.has(lowerFolder)) {
    return 'view=list&folder=' + encodeURIComponent(lowerFolder) +
      (safeFilter ? '&filter=' + encodeURIComponent(safeFilter) : '');
  }
  if (/^label:/i.test(rawFolder)) {
    const labelId = mailboxLaunchRouteId_(rawFolder.slice(rawFolder.indexOf(':') + 1));
    if (labelId) return 'view=list&folder=' + encodeURIComponent('label:' + labelId) +
      (safeFilter ? '&filter=' + encodeURIComponent(safeFilter) : '');
  }
  return '';
}

function mailboxLaunchRouteId_(value) {
  const id = String(value || '');
  return /^[A-Za-z0-9][A-Za-z0-9._:@-]{0,179}$/.test(id) ? id : '';
}

function mailboxTemplateBase64_(value) {
  const bytes = Utilities.newBlob(String(value || '')).getBytes();
  return Utilities.base64EncodeWebSafe(bytes).replace(/=+$/g, '');
}

function serveMailboxApp_(options) {
  const input = options || {};
  const template = HtmlService.createTemplateFromFile('MailApp');
  const launchNonce = String(input.launchNonce || '');
  template.mailboxLaunchNonce = /^[A-Za-z0-9_-]{40,128}$/.test(launchNonce) ? launchNonce : '';
  template.mailboxLaunchRouteB64 = mailboxTemplateBase64_(normalizeMailboxLaunchRoute_(input.route));
  template.mailboxLaunchErrorB64 = mailboxTemplateBase64_(String(input.launchError || '').slice(0, 500));
  template.mailboxLaunchErrorCodeB64 = mailboxTemplateBase64_(String(input.launchErrorCode || '').slice(0, 64));
  const capacityRecoveryToken = String(input.capacityRecoveryToken || '');
  template.mailboxCapacityRecoveryToken = /^[A-Za-z0-9_-]{43}$/.test(capacityRecoveryToken)
    ? capacityRecoveryToken
    : '';
  return template
    .evaluate()
    .setTitle('Gmail сповіщення Павла · Versie 1')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
}

function webhookOk_() {
  // HtmlService returns a direct 2xx Web App response; ContentService responds
  // through a googleusercontent.com redirect that Telegram webhooks reject.
  return HtmlService.createHtmlOutput('ok');
}

function isOwnPrivateUpdate_(update, expectedChatId) {
  const query = update.callback_query;
  const message = query ? query.message : update.message;
  const sender = query ? query.from : message && message.from;
  return Boolean(
    message && sender && message.chat && message.chat.type === 'private' &&
    String(message.chat.id) === String(expectedChatId) &&
    String(sender.id) === String(expectedChatId)
  );
}

function telegramUpdatePayloadKey_(updateId) {
  return 'TELEGRAM_UPDATE_PAYLOAD_' + String(updateId).replace(/[^0-9-]/g, '').slice(0, 32);
}

function telegramUpdateOperationKey_(updateId) {
  return 'TELEGRAM_UPDATE_OPERATION_' + String(updateId).replace(/[^0-9-]/g, '').slice(0, 32);
}

function deleteScriptProperty_(props, name) {
  if (props && typeof props.deleteProperty === 'function') props.deleteProperty(name);
  else if (props) props.setProperty(name, '');
}

/** Compact rows: [update id, p|d|f|x, updatedAt, attempts, lastError]. */
function readTelegramUpdateJournal_(props) {
  let rows = [];
  try { rows = JSON.parse(props.getProperty('TELEGRAM_UPDATE_JOURNAL') || '[]'); }
  catch (error) { rows = []; }
  rows = Array.isArray(rows) ? rows.filter(row => Array.isArray(row) && row.length >= 4) : [];
  if (!rows.length) {
    let legacy = [];
    try { legacy = JSON.parse(props.getProperty('PROCESSED_TELEGRAM_UPDATE_IDS') || '[]'); }
    catch (error) { legacy = []; }
    rows = (Array.isArray(legacy) ? legacy : []).map(id => [String(id), 'd', 0, 1, '']);
  }
  return compactSoftLimit_(
    rows,
    CONFIG.TELEGRAM_UPDATE_IDS_LIMIT,
    row => row[1] === 'p' || row[1] === 'f'
  ).kept;
}

function writeTelegramUpdateJournal_(props, rows) {
  const compacted = compactSoftLimit_(
    rows,
    CONFIG.TELEGRAM_UPDATE_IDS_LIMIT,
    row => row[1] === 'p' || row[1] === 'f'
  );
  const bounded = compacted.kept;
  const serialized = JSON.stringify(bounded);
  const processedJson = JSON.stringify(
    bounded.filter(row => row[1] === 'd').map(row => String(row[0]))
  );
  assertTelegramPropertyValueFits_('TELEGRAM_UPDATE_JOURNAL', serialized);
  assertTelegramPropertyStoreFits_(props, {
    TELEGRAM_UPDATE_JOURNAL: serialized,
    PROCESSED_TELEGRAM_UPDATE_IDS: processedJson,
  }, compacted.evicted.flatMap(row => [
    telegramUpdatePayloadKey_(row[0]),
    telegramUpdateOperationKey_(row[0]),
  ]));
  props.setProperty('TELEGRAM_UPDATE_JOURNAL', serialized);
  compacted.evicted.forEach(row => {
    deleteScriptProperty_(props, telegramUpdatePayloadKey_(row[0]));
    deleteScriptProperty_(props, telegramUpdateOperationKey_(row[0]));
  });
  // Keep the old compact list during the migration window. Only completed
  // updates belong here; pending/failed work must remain retryable.
  props.setProperty(
    'PROCESSED_TELEGRAM_UPDATE_IDS',
    processedJson
  );
}

/**
 * A soft bound that always sheds the oldest terminal records first. Active
 * retry work is deliberately retained even when it temporarily exceeds the
 * nominal limit; deleting it would silently lose an already accepted action.
 */
function compactSoftLimit_(values, limit, isActive) {
  const source = Array.isArray(values) ? values.slice() : [];
  const softLimit = Math.max(0, Number(limit) || 0);
  const activeFlags = source.map(value => {
    try { return Boolean(isActive && isActive(value)); }
    catch (error) { return false; }
  });
  const activeCount = activeFlags.filter(Boolean).length;
  const terminalBudget = Math.max(0, softLimit - activeCount);
  const terminalIndexes = [];
  activeFlags.forEach((active, index) => { if (!active) terminalIndexes.push(index); });
  const retainedTerminalIndexes = new Set(
    terminalBudget > 0 ? terminalIndexes.slice(-terminalBudget) : []
  );
  const kept = [];
  const evicted = [];
  source.forEach((value, index) => {
    if (activeFlags[index] || retainedTerminalIndexes.has(index)) kept.push(value);
    else evicted.push(value);
  });
  return { kept, evicted };
}

function utf8ByteLength_(value) {
  const text = String(value || '');
  let bytes = 0;
  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    if (code < 0x80) bytes += 1;
    else if (code < 0x800) bytes += 2;
    else if (code >= 0xD800 && code <= 0xDBFF && index + 1 < text.length &&
             text.charCodeAt(index + 1) >= 0xDC00 && text.charCodeAt(index + 1) <= 0xDFFF) {
      bytes += 4;
      index += 1;
    } else bytes += 3;
  }
  return bytes;
}

function assertTelegramPropertyValueFits_(name, serialized) {
  if (utf8ByteLength_(serialized) > CONFIG.TELEGRAM_PROPERTY_MAX_BYTES) {
    throw new Error(String(name || 'Telegram state') + ' перевищує безпечний ліміт сховища.');
  }
}

function assertTelegramPropertyStoreFits_(props, replacements, deletedNames) {
  if (!props || typeof props.getProperties !== 'function') return;
  const current = props.getProperties() || {};
  const next = Object.assign({}, current);
  (deletedNames || []).forEach(name => { delete next[String(name)]; });
  Object.keys(replacements || {}).forEach(name => { next[name] = String(replacements[name]); });
  const total = Object.keys(next).reduce((sum, name) =>
    sum + utf8ByteLength_(name) + utf8ByteLength_(next[name]), 0);
  if (total > CONFIG.TELEGRAM_PROPERTY_STORE_SAFE_BYTES) {
    throw new Error('Telegram synchronization storage is temporarily full.');
  }
}

function storeTelegramUpdatePayload_(props, updateId, update) {
  if (!update) return true;
  let serialized = '';
  try { serialized = JSON.stringify(durableTelegramUpdatePayload_(update)); }
  catch (error) { serialized = ''; }
  if (serialized && serialized.length <= CONFIG.TELEGRAM_UPDATE_PAYLOAD_MAX_CHARS) {
    assertTelegramPropertyValueFits_(telegramUpdatePayloadKey_(updateId), serialized);
    assertTelegramPropertyStoreFits_(props, {
      [telegramUpdatePayloadKey_(updateId)]: serialized,
    });
    props.setProperty(telegramUpdatePayloadKey_(updateId), serialized);
    return true;
  }
  return false;
}

function durableTelegramUpdatePayload_(update) {
  if (update && update.callback_query) {
    const query = update.callback_query;
    const message = query.message || {};
    const chat = message.chat || {};
    return {
      update_id: update.update_id,
      callback_query: {
        id: String(query.id || ''),
        data: String(query.data || ''),
        from: { id: query.from && query.from.id },
        message: {
          message_id: message.message_id,
          message_thread_id: message.message_thread_id,
          chat: { id: chat.id, type: chat.type },
        },
      },
    };
  }
  const message = update && update.message || {};
  const chat = message.chat || {};
  return {
    update_id: update && update.update_id,
    message: {
      message_id: message.message_id,
      // Persist only commands the bot can actually replay. Arbitrary private
      // chat text is never needed for recovery and must not enter Properties.
      text: durableTelegramCommandText_(message.text),
      from: { id: message.from && message.from.id },
      chat: { id: chat.id, type: chat.type },
    },
  };
}

function durableTelegramCommandText_(value) {
  const text = String(value || '').trim();
  if (text === BOT_UI.CHECK_TEXT || text === BOT_UI.STATUS_TEXT || text === BOT_UI.MENU_TEXT ||
      text === BOT_UI.FOLDERS_TEXT || text === BOT_UI.BROWSE_TEXT ||
      /^\/(?:check|status|start|menu|folders|help)(?:@\w+)?$/i.test(text)) {
    return text.slice(0, 100);
  }
  if (/^\/mail(?:@\w+)?(?:\s|$)/i.test(text) && text.length <= 500 &&
      !/[\u0000-\u001F\u007F]/.test(text)) {
    return text;
  }
  return '';
}

function claimTelegramUpdate_(updateId, update) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(2000)) return 'busy';
  try {
    const props = PropertiesService.getScriptProperties();
    const key = String(updateId);
    const now = Date.now();
    const rows = readTelegramUpdateJournal_(props);
    let row = rows.find(item => String(item[0]) === key);
    if (row && row[1] === 'd') return 'duplicate';
    if (row && row[1] === 'x') return 'exhausted';
    if (row && row[1] === 'p' && now - Number(row[2] || 0) < CONFIG.TELEGRAM_UPDATE_LEASE_MS) {
      return 'busy';
    }
    if (row && Number(row[3] || 0) >= CONFIG.TELEGRAM_UPDATE_MAX_ATTEMPTS) {
      row[1] = 'x';
      row[2] = now;
      writeTelegramUpdateJournal_(props, rows);
      deleteScriptProperty_(props, telegramUpdatePayloadKey_(key));
      return 'exhausted';
    }
    if (row) {
      row[1] = 'p';
      row[2] = now;
      row[3] = Number(row[3] || 0) + 1;
      row[4] = '';
      if (update && !storeTelegramUpdatePayload_(props, key, update)) return 'overloaded';
      writeTelegramUpdateJournal_(props, rows);
      return 'retry';
    }
    const activeCount = rows.filter(item => item[1] === 'p' || item[1] === 'f').length;
    if (activeCount >= CONFIG.TELEGRAM_UPDATE_ACTIVE_HARD_LIMIT) return 'overloaded';
    row = [key, 'p', now, 1, ''];
    rows.push(row);
    if (!storeTelegramUpdatePayload_(props, key, update)) return 'overloaded';
    try {
      writeTelegramUpdateJournal_(props, rows);
    } catch (capacityError) {
      deleteScriptProperty_(props, telegramUpdatePayloadKey_(key));
      console.error('Telegram update journal is full: ' + capacityError);
      return 'overloaded';
    }
    return 'new';
  } finally {
    lock.releaseLock();
  }
}

function settleTelegramUpdate_(updateId, status, error) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('Не вдалося зберегти стан Telegram update.');
  try {
    const props = PropertiesService.getScriptProperties();
    const key = String(updateId);
    const rows = readTelegramUpdateJournal_(props);
    let row = rows.find(item => String(item[0]) === key);
    if (!row) {
      row = [key, 'p', Date.now(), 1, ''];
      rows.push(row);
    }
    row[1] = status;
    row[2] = Date.now();
    row[4] = String(error && error.message || error || '').slice(0, 140);
    if (status === 'f' && Number(row[3] || 0) >= CONFIG.TELEGRAM_UPDATE_MAX_ATTEMPTS) {
      row[1] = 'x';
    }
    writeTelegramUpdateJournal_(props, rows);
    if (row[1] === 'd' || row[1] === 'x') {
      deleteScriptProperty_(props, telegramUpdatePayloadKey_(key));
      deleteScriptProperty_(props, telegramUpdateOperationKey_(key));
    }
    return row[1];
  } finally {
    lock.releaseLock();
  }
}

function completeTelegramUpdate_(updateId) {
  return settleTelegramUpdate_(updateId, 'd', '');
}

function failTelegramUpdate_(updateId, error) {
  return settleTelegramUpdate_(updateId, 'f', error);
}

/** Bounded timer retry for failed or lease-expired webhook work. */
function retryFailedTelegramUpdates_(limit) {
  const props = PropertiesService.getScriptProperties();
  const rows = readTelegramUpdateJournal_(props);
  const now = Date.now();
  const candidates = rows.filter(row =>
    row[1] === 'f' ||
    (row[1] === 'p' && now - Number(row[2] || 0) >= CONFIG.TELEGRAM_UPDATE_LEASE_MS)
  ).slice(0, Math.max(0, Math.min(Number(limit) || 3, 5)));
  let completed = 0;
  candidates.forEach(row => {
    const updateId = String(row[0]);
    let update = null;
    try {
      update = JSON.parse(props.getProperty(telegramUpdatePayloadKey_(updateId)) || 'null');
    } catch (error) {
      update = null;
    }
    if (!update || !isOwnPrivateUpdate_(update, props.getProperty('CHAT_ID'))) {
      settleTelegramUpdate_(updateId, 'x', 'Durable retry payload is unavailable.');
      return;
    }
    const claim = claimTelegramUpdate_(updateId);
    if (claim !== 'retry') return;
    try {
      routeTelegramUpdate_(update);
      completeTelegramUpdate_(updateId);
      completed += 1;
    } catch (error) {
      failTelegramUpdate_(updateId, error);
    }
  });
  return { attempted: candidates.length, completed };
}

function answerTelegramCallback_(callbackId, message) {
  if (!callbackId) return;
  try {
    const payload = {
      callback_query_id: callbackId,
      show_alert: false,
      cache_time: 0,
    };
    const text = String(message || '').trim();
    if (text) payload.text = text.slice(0, 190);
    telegramRequest_('answerCallbackQuery', payload);
  } catch (error) {
    // The Gmail operation is authoritative; a failed spinner acknowledgement
    // must never cancel or repeat the mutation.
    console.error('Could not acknowledge Telegram callback: ' + error);
  }
}

function markTelegramCallbackFailure_(message, callbackData) {
  try {
    const rows = message && message.reply_markup && message.reply_markup.inline_keyboard;
    if (!message || !message.message_id || !Array.isArray(rows)) return;
    let changed = false;
    const updatedRows = rows.map(row => (row || []).map(button => {
      if (!button || String(button.callback_data || '') !== String(callbackData || '')) {
        return button;
      }
      changed = true;
      return {
        text: '⚠️ Не вдалося · повторити',
        callback_data: String(callbackData),
      };
    }));
    if (!changed) return;
    telegramRequest_('editMessageReplyMarkup', {
      chat_id: telegramCallbackChatId_(message),
      message_id: message.message_id,
      reply_markup: JSON.stringify({ inline_keyboard: updatedRows }),
    });
  } catch (error) {
    console.error('Could not mark Telegram callback failure: ' + error);
  }
}

/**
 * Durable callback retries intentionally omit Telegram's potentially large
 * reply_markup. Rehydrate it from the owner-bound card registry only when the
 * callback identifies the same live Telegram message.
 */
function hydrateTelegramCallbackMarkup_(query) {
  const message = query && query.message;
  if (!message || message.reply_markup || !message.message_id) return message;
  const parsed = parseMailboxCallback_(String(query && query.data || '')) ||
    parseTelegramFocusCallback_(String(query && query.data || ''));
  if (!parsed || !parsed.messageId) return message;
  try {
    const card = readTelegramMailCardSyncRecordById_(
      parsed.messageId,
      null,
      parsed.connectionId,
      telegramCallbackChatId_(message)
    );
    if (!card || String(card.chatId || '') !== String(telegramCallbackChatId_(message)) ||
        Number(card.telegramMessageId || 0) !== Number(message.message_id || 0)) return message;
    const markup = typeof card.replyMarkup === 'string'
      ? JSON.parse(card.replyMarkup || '{}') : card.replyMarkup;
    if (markup && Array.isArray(markup.inline_keyboard)) message.reply_markup = markup;
  } catch (error) {
    console.error('Could not rehydrate Telegram callback markup: ' + error);
  }
  return message;
}

function telegramFocusDisplay_(focusValue) {
  const focus = focusValue || {};
  const labels = {
    critical: '🔴 Не пропустити',
    high: '🟠 Високий пріоритет',
    medium: '🟣 Важливо',
    low: '🔵 До уваги',
  };
  return labels[String(focus.priority || '')] || '🎯 Персональний пріоритет';
}

function telegramFocusMessageContext_(messageId) {
  const message = getGmailMessage_(messageId);
  const threadId = String(message && message.threadId || '');
  if (!/^[A-Za-z0-9_-]{5,64}$/.test(threadId)) {
    throw new Error('Gmail не повернув коректну гілку для цього листа.');
  }
  return {
    message,
    thread: {
      id: threadId,
      sender: { email: senderEmail_(message.from) },
      subject: String(message.subject || ''),
      labelIds: Array.isArray(message.labelIds) ? message.labelIds.slice() : [],
    },
  };
}

function telegramFocusKeyboard_(currentMarkupValue, focusCallback, focusValue, expanded) {
  const current = currentMarkupValue || {};
  const rows = (Array.isArray(current.inline_keyboard) ? current.inline_keyboard : [])
    .filter(row => !(row || []).some(button =>
      parseTelegramFocusCallback_(String(button && button.callback_data || ''))
    ));
  const messageId = focusCallback.messageId;
  const connectionId = focusCallback.connectionId;
  const insertAt = Math.min(rows.length, 3);
  if (expanded) {
    rows.splice(insertAt, 0,
      [{ text: '🎯 Оберіть рівень · зараз: ' + telegramFocusDisplay_(focusValue), callback_data: BOT_UI.NOOP_ACTION }],
      [
        { text: '🔴 Не пропустити', callback_data: telegramFocusCallbackData_('critical', messageId, connectionId) },
        { text: '🟠 Високий', callback_data: telegramFocusCallbackData_('high', messageId, connectionId) },
      ],
      [
        { text: '🟣 Важливо', callback_data: telegramFocusCallbackData_('medium', messageId, connectionId) },
        { text: '🔵 До уваги', callback_data: telegramFocusCallbackData_('low', messageId, connectionId) },
      ],
      [
        { text: '⚪ Прибрати пріоритет', callback_data: telegramFocusCallbackData_('none', messageId, connectionId) },
        { text: '↩️ Закрити', callback_data: telegramFocusCallbackData_('back', messageId, connectionId) },
      ]
    );
  } else {
    rows.splice(insertAt, 0, [{
      text: telegramFocusDisplay_(focusValue),
      callback_data: telegramFocusCallbackData_('menu', messageId, connectionId),
    }]);
  }
  const serialized = telegramMailBrowseMarkup_(rows);
  return { inline_keyboard: rows, serialized };
}

function executeTelegramFocusCallback_(query, focusCallback, principalValue) {
  const principal = principalValue || {};
  const userId = String(principal.userId || mailboxOwnerId_());
  const chatId = String(principal.chatId || telegramCallbackChatId_(query && query.message));
  if (!/^\d{1,24}$/.test(userId) || !/^-?\d{1,24}$/.test(chatId) ||
      !constantTimeEqual_(userId, String(query && query.from && query.from.id || ''))) {
    throw new Error('Ця кнопка пріоритету належить іншому Telegram-користувачу.');
  }
  return withMailboxConnectionContext_(userId, focusCallback.connectionId, 'viewer', () => {
    const context = telegramFocusMessageContext_(focusCallback.messageId);
    let focus;
    if (['critical', 'high', 'medium', 'low', 'none'].indexOf(focusCallback.action) !== -1) {
      focus = mailboxFocusThread_({
        threadId: context.thread.id,
        priority: focusCallback.action,
        color: '',
        note: 'Призначено в Telegram',
      }, mailboxCurrentSessionContext_).focus;
    } else {
      const scope = mailboxFocusScope_(mailboxCurrentSessionContext_);
      focus = mailboxFocusEvaluate_(mailboxFocusReadRegistry_(null, scope), context.thread);
    }
    const keyboard = telegramFocusKeyboard_(
      query && query.message && query.message.reply_markup,
      focusCallback,
      focus,
      focusCallback.action === 'menu'
    );
    telegramRequest_('editMessageReplyMarkup', {
      chat_id: chatId,
      message_id: query && query.message && query.message.message_id,
      reply_markup: keyboard.serialized,
    });
    updateTelegramMailCardMarkupRecord_(
      focusCallback.messageId,
      keyboard.serialized,
      null,
      focusCallback.connectionId,
      chatId
    );
    return {
      message: focusCallback.action === 'menu' ? 'Оберіть рівень пріоритету' :
        focusCallback.action === 'back' ? 'Меню пріоритету закрито' :
        focus && focus.priority !== 'none' ? 'Пріоритет: ' + telegramFocusDisplay_(focus) : 'Персональний пріоритет прибрано',
    };
  });
}

function mailReminderIndexName_() {
  return 'MAIL_REMINDER_INDEX_V1';
}

function mailReminderId_(userId, connectionId, threadId) {
  return hashMessageId_(String(userId) + ':' + String(connectionId) + ':' + String(threadId));
}

function mailReminderPropertyKey_(reminderId) {
  const id = String(reminderId || '');
  return /^[a-f0-9]{16}$/.test(id) ? 'MAIL_REMINDER_V1_' + id : '';
}

function mailReminderCallbackData_(action, reminderId, revisionValue) {
  const code = action === 'later' ? 'l' : action === 'suppress' ? 's' : '';
  const id = String(reminderId || '');
  const revision = Math.max(1, Math.floor(Number(revisionValue || 0)));
  if (!code || !/^[a-f0-9]{16}$/.test(id) || !Number.isSafeInteger(revision)) {
    throw new Error('Некоректна кнопка нагадування.');
  }
  return BOT_UI.REMINDER_PREFIX + code + '.' + id + '.' + revision.toString(36);
}

function parseMailReminderCallback_(value) {
  const escaped = BOT_UI.REMINDER_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = String(value || '').match(new RegExp('^' + escaped + '([ls])\\.([a-f0-9]{16})\\.([1-9a-z][0-9a-z]{0,6})$'));
  if (!match) return null;
  return { action: match[1] === 'l' ? 'later' : 'suppress', reminderId: match[2], revision: parseInt(match[3], 36) };
}

function mailReminderReadRecord_(properties, reminderId) {
  const props = properties || PropertiesService.getScriptProperties();
  const key = mailReminderPropertyKey_(reminderId);
  if (!key) return null;
  let value = null;
  try { value = JSON.parse(props.getProperty(key) || 'null'); } catch (error) { value = null; }
  if (!value || Number(value.v) !== 1 || String(value.reminderId || '') !== String(reminderId) ||
      !/^\d{1,24}$/.test(String(value.userId || '')) || !/^-?\d{1,24}$/.test(String(value.chatId || '')) ||
      !/^gmail-[A-Za-z0-9_-]{1,80}$/.test(String(value.connectionId || '')) ||
      !/^[A-Za-z0-9_-]{5,64}$/.test(String(value.threadId || '')) ||
      !/^[A-Za-z0-9_-]{5,64}$/.test(String(value.messageId || '')) ||
      !Number.isInteger(Number(value.revision || 0)) || Number(value.revision || 0) < 1 ||
      ['pending', 'reserved', 'dispatching', 'delivered', 'suppressed', 'uncertain'].indexOf(String(value.state || '')) === -1) return null;
  return value;
}

function mailReminderCanonicalIndex_(props) {
  const prefix = 'MAIL_REMINDER_V1_';
  const values = props.getProperties();
  return Object.keys(values).filter(key => {
    if (!key.startsWith(prefix)) return false;
    return Boolean(mailReminderReadRecord_(props, key.slice(prefix.length)));
  }).sort();
}

function mailReminderWriteLocked_(props, record) {
  const key = mailReminderPropertyKey_(record && record.reminderId);
  if (!key) throw new Error('Некоректний запис нагадування.');
  // The stored index is only a cache. Rebuild from prefixed records so a
  // previous partial record/index write cannot bypass global or account caps.
  let index = mailReminderCanonicalIndex_(props).filter(item => item !== key);
  index.push(key);
  const evicted = [];
  const activeStates = new Set(['pending', 'reserved', 'dispatching', 'uncertain']);
  const rowFor = item => item === key ? record
    : mailReminderReadRecord_(props, String(item).replace(/^MAIL_REMINDER_V1_/, ''));
  const accountActiveCount = index.reduce((count, item) => {
    const row = rowFor(item);
    return count + (row && row.userId === record.userId && row.connectionId === record.connectionId &&
      activeStates.has(row.state) ? 1 : 0);
  }, 0);
  if (accountActiveCount > CONFIG.MAIL_REMINDER_ACCOUNT_ACTIVE_LIMIT) {
    throw new Error('Для цього Gmail-акаунта забагато активних нагадувань.');
  }
  const userTotalCount = index.reduce((count, item) => {
    const row = rowFor(item);
    return count + (row && row.userId === record.userId ? 1 : 0);
  }, 0);
  // Keep a fixed reserve for other Telegram owners. Never achieve fairness by
  // deleting a still-active delivered or suppressed tombstone.
  if (userTotalCount > CONFIG.MAIL_REMINDER_USER_TOTAL_LIMIT) {
    throw new Error('Особисте сховище нагадувань заповнене; місце для інших користувачів зарезервовано.');
  }
  if (index.length > CONFIG.MAIL_REMINDER_LEDGER_HARD_LIMIT) {
    const activeMessageIds = new Set(telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX').map(cardKey => {
      try { return JSON.parse(props.getProperty(cardKey) || 'null'); } catch (error) { return null; }
    }).filter(card => card && card.state === 'active').map(card => String(card.gmailMessageId || '')));
    const now = Date.now();
    const removable = index.filter(item => {
      if (item === key) return false;
      const row = rowFor(item);
      if (!row || activeMessageIds.has(String(row.messageId || ''))) return false;
      if (['delivered', 'uncertain'].indexOf(row.state) !== -1) return true;
      return row.state === 'suppressed' && now - Number(row.updatedAt || 0) > CONFIG.MAIL_REMINDER_SUPPRESSION_TTL_MS;
    });
    while (index.length > CONFIG.MAIL_REMINDER_LEDGER_HARD_LIMIT && removable.length) {
      const remove = removable.shift();
      index = index.filter(item => item !== remove);
      evicted.push(remove);
    }
  }
  if (index.length > CONFIG.MAIL_REMINDER_LEDGER_HARD_LIMIT) {
    throw new Error('Сховище нагадувань тимчасово заповнене.');
  }
  const indexJson = JSON.stringify(index);
  const recordJson = JSON.stringify(record);
  const previousRecordJson = props.getProperty(key);
  assertTelegramPropertyValueFits_(mailReminderIndexName_(), indexJson);
  assertTelegramPropertyValueFits_(key, recordJson);
  assertTelegramPropertyStoreFits_(props, { [mailReminderIndexName_()]: indexJson, [key]: recordJson }, evicted);
  props.setProperty(key, recordJson);
  try {
    props.setProperty(mailReminderIndexName_(), indexJson);
  } catch (error) {
    // The canonical scan above will still count this record on the next write.
    // Best-effort rollback keeps the cache and record aligned immediately.
    if (previousRecordJson === null || previousRecordJson === undefined) deleteScriptProperty_(props, key);
    else props.setProperty(key, previousRecordJson);
    throw error;
  }
  evicted.forEach(item => deleteScriptProperty_(props, item));
  return record;
}

function mailReminderMinuteInTimezone_(date, timezone) {
  const hour = Number(Utilities.formatDate(date, timezone, 'H'));
  const minute = Number(Utilities.formatDate(date, timezone, 'm'));
  return hour * 60 + minute;
}

function mailReminderInQuietHours_(minute) {
  return minute >= CONFIG.QUIET_HOURS_START * 60 || minute < CONFIG.QUIET_HOURS_END * 60;
}

function mailReminderDigestWindowOpen_(minute, windows) {
  return (Array.isArray(windows) ? windows : []).some(windowMinute => {
    const delta = (minute - Number(windowMinute) + 1440) % 1440;
    return delta >= 0 && delta < 10;
  });
}

function mailReminderCandidate_(card, now) {
  const userId = String(card && card.userId || card && card.chatId || '');
  const chatId = String(card && card.chatId || '');
  const connectionId = String(card && card.connectionId || '');
  const threadId = String(card && card.gmailThreadId || '');
  const messageId = String(card && card.gmailMessageId || '');
  if (!/^\d{1,24}$/.test(userId) || !/^\d{1,24}$/.test(chatId) || !constantTimeEqual_(userId, chatId) ||
      !/^gmail-[A-Za-z0-9_-]{1,80}$/.test(connectionId) ||
      !/^[A-Za-z0-9_-]{5,64}$/.test(threadId) || !/^[A-Za-z0-9_-]{5,64}$/.test(messageId)) return null;
  return withMailboxConnectionContext_(userId, connectionId, 'viewer', () => {
    const attentionScope = mailboxAttentionScope_(mailboxCurrentSessionContext_);
    const attention = mailboxAttentionReadRegistry_(null, attentionScope);
    const preferences = mailboxAttentionPreferencesNormalize_(attention.preferences);
    if (!preferences.onboardingCompletedAt) return null;
    const entry = attention.entries.find(item => item.threadId === threadId);
    const message = getGmailMessage_(messageId);
    const labels = new Set((message && message.labelIds || []).map(String));
    if (labels.has('TRASH') || labels.has('SPAM')) return null;
    const focusRegistry = mailboxFocusReadRegistry_(null, mailboxFocusScope_(mailboxCurrentSessionContext_));
    const focus = mailboxFocusEvaluate_(focusRegistry, {
      id: threadId,
      sender: { email: senderEmail_(message && message.from) },
      subject: String(message && message.subject || ''),
      labelIds: Array.from(labels),
    });
    const explicitlyActionable = Boolean(entry && ['action', 'later'].indexOf(entry.triage) !== -1);
    const priorityActionable = Number(focus && focus.rank || 0) >= 2;
    if (!explicitlyActionable && !priorityActionable) return null;
    if (preferences.reminderMode === 'urgent_only' && String(focus && focus.priority || '') !== 'critical') return null;
    const timezone = preferences.timezone || 'UTC';
    const minute = mailReminderMinuteInTimezone_(new Date(now), timezone);
    if (mailReminderInQuietHours_(minute)) return null;
    const manualFocus = (focusRegistry.manual || []).find(item => item.threadId === threadId);
    const matchedRule = focus && focus.ruleId
      ? (focusRegistry.rules || []).find(item => item.id === focus.ruleId) : null;
    const baseAt = Math.max(
      0,
      Math.max(Number(card.createdAt || 0), Number(card.updatedAt || 0)),
      Number(entry && entry.updatedAt || 0),
      Number(manualFocus && manualFocus.updatedAt || 0),
      Number(matchedRule && matchedRule.updatedAt || 0)
    );
    if (preferences.reminderMode === 'soft' && now < baseAt + CONFIG.MAIL_REMINDER_SOFT_DELAY_MS) return null;
    if (preferences.reminderMode === 'urgent_only' && now < baseAt + CONFIG.MAIL_REMINDER_URGENT_DELAY_MS) return null;
    if (preferences.reminderMode === 'digest' && !mailReminderDigestWindowOpen_(minute, preferences.digestWindows)) return null;
    return {
      v: 1,
      reminderId: mailReminderId_(userId, connectionId, threadId),
      userId, chatId, connectionId, threadId, messageId,
      state: 'pending', mode: preferences.reminderMode, revision: 1,
      nextEligibleAt: now, attempts: 0, createdAt: now, updatedAt: now,
      activityAt: baseAt,
      digestWindowOpen: mailReminderDigestWindowOpen_(minute, preferences.digestWindows),
      focusRuleId: String(focus && focus.ruleId || ''),
      attentionRevision: Number(attention.revision || 0),
      focusRevision: Number(focusRegistry.revision || 0),
      subject: String(message && message.subject || '').slice(0, 180),
      accountEmail: String((mailboxMultiReadRegistry_().connections || []).find(item => item.id === connectionId)?.email || '').slice(0, 254),
    };
  });
}

function mailReminderFreshActivityAtLocked_(props, candidate) {
  return withMailboxConnectionContext_(candidate.userId, candidate.connectionId, 'viewer', () => {
    const attention = mailboxAttentionReadRegistry_(props, mailboxAttentionScope_(mailboxCurrentSessionContext_));
    const focusRegistry = mailboxFocusReadRegistry_(props, mailboxFocusScope_(mailboxCurrentSessionContext_));
    if (Number(attention.revision || 0) !== Number(candidate.attentionRevision || 0) ||
        Number(focusRegistry.revision || 0) !== Number(candidate.focusRevision || 0)) {
      // A removal has no object timestamp to compare. Any scoped registry
      // revision change therefore invalidates the pre-lock eligibility view.
      return Number.MAX_SAFE_INTEGER;
    }
    const entry = (attention.entries || []).find(item => item.threadId === candidate.threadId);
    const manual = (focusRegistry.manual || []).find(item => item.threadId === candidate.threadId);
    const rule = candidate.focusRuleId
      ? (focusRegistry.rules || []).find(item => item.id === candidate.focusRuleId) : null;
    const card = readTelegramMailCardSyncRecordById_(
      candidate.messageId, props, candidate.connectionId, candidate.chatId
    );
    return Math.max(
      Number(candidate.activityAt || 0),
      Number(entry && entry.updatedAt || 0),
      Number(manual && manual.updatedAt || 0),
      Number(rule && rule.updatedAt || 0),
      Number(card && card.createdAt || 0),
      Number(card && card.updatedAt || 0)
    );
  });
}

function reserveMailReminder_(candidate, now) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return null;
  try {
    const props = PropertiesService.getScriptProperties();
    let existing = mailReminderReadRecord_(props, candidate.reminderId);
    let previousTelegramMessageId = Number(existing && existing.previousTelegramMessageId || 0);
    if (existing && existing.state === 'suppressed') return null;
    if (existing && existing.state === 'uncertain') return null;
    if (existing && existing.state === 'delivered' && existing.messageId === candidate.messageId) {
      const actedAfterDelivery = Number(candidate.activityAt || 0) > Number(existing.activityAt || 0);
      const mayContinueInDigest = ['soft', 'soft_digest'].indexOf(String(existing.mode || '')) !== -1;
      const digestDue = Boolean(candidate.digestWindowOpen) &&
        now >= Number(existing.deliveredAt || existing.updatedAt || 0) + CONFIG.MAIL_REMINDER_SOFT_DIGEST_DELAY_MS;
      if (actedAfterDelivery || !mayContinueInDigest || !digestDue || previousTelegramMessageId) return null;
      let freshActivityAt = 0;
      try { freshActivityAt = mailReminderFreshActivityAtLocked_(props, candidate); }
      catch (error) {
        console.error('Soft reminder continuation deferred because fresh activity could not be verified: ' + error);
        return null;
      }
      if (freshActivityAt > Number(existing.activityAt || 0)) return null;
      previousTelegramMessageId = Number(existing.telegramMessageId || 0);
      existing = Object.assign({}, existing, {
        state: 'pending',
        mode: 'soft_digest',
        nextEligibleAt: now,
        attempts: 0,
        activityAt: freshActivityAt,
        activityAttentionRevision: Number(candidate.attentionRevision || 0),
        activityFocusRevision: Number(candidate.focusRevision || 0),
        previousTelegramMessageId,
      });
      delete existing.deliveredAt;
      delete existing.telegramMessageId;
      delete existing.deliveryKind;
    }
    if (existing && existing.state === 'delivered' && existing.messageId !== candidate.messageId) {
      if (previousTelegramMessageId) return null;
      const previousRevision = Number(existing.revision || 0);
      const firstCreatedAt = Number(existing.createdAt || candidate.createdAt || now);
      existing = Object.assign({}, candidate, {
        revision: previousRevision,
        attempts: 0,
        createdAt: firstCreatedAt,
      });
      delete existing.deliveredAt;
      delete existing.telegramMessageId;
      delete existing.deliveryKind;
    }
    if (existing && existing.mode === 'soft_digest' &&
        ['pending', 'reserved'].indexOf(existing.state) !== -1) {
      let freshActivityAt = 0;
      try { freshActivityAt = mailReminderFreshActivityAtLocked_(props, candidate); }
      catch (error) {
        console.error('Soft digest retry deferred because fresh activity could not be verified: ' + error);
        return null;
      }
      const revisionsChanged =
        Number(candidate.attentionRevision || 0) !== Number(existing.activityAttentionRevision || 0) ||
        Number(candidate.focusRevision || 0) !== Number(existing.activityFocusRevision || 0);
      if (freshActivityAt > Number(existing.activityAt || 0) || revisionsChanged) {
        existing.state = 'delivered';
        existing.mode = 'soft';
        existing.nextEligibleAt = 0;
        existing.activityAt = freshActivityAt;
        existing.revision += 1;
        existing.updatedAt = now;
        if (previousTelegramMessageId) {
          existing.telegramMessageId = previousTelegramMessageId;
          existing.deliveryKind = 'single';
          delete existing.previousTelegramMessageId;
        }
        delete existing.leaseToken;
        mailReminderWriteLocked_(props, existing);
        return null;
      }
    }
    if (existing && existing.mode === 'soft_digest' && !candidate.digestWindowOpen) return null;
    if (existing && Number(existing.nextEligibleAt || 0) > now) return null;
    if (existing && ['reserved', 'dispatching'].indexOf(existing.state) !== -1 &&
        now - Number(existing.updatedAt || 0) < CONFIG.MAIL_REMINDER_LEASE_MS) return null;
    if (existing && existing.state === 'dispatching') {
      existing.state = 'uncertain';
      existing.revision += 1;
      existing.updatedAt = now;
      mailReminderWriteLocked_(props, existing);
      return null;
    }
    if (existing && Number(existing.attempts || 0) >= CONFIG.MAIL_REMINDER_MAX_ATTEMPTS) {
      existing.state = 'uncertain';
      existing.revision += 1;
      existing.updatedAt = now;
      existing.lastError = 'Вичерпано безпечний ліміт повторів Telegram.';
      mailReminderWriteLocked_(props, existing);
      return null;
    }
    const token = telegramMailDeliveryReservationId_();
    const stored = Object.assign({}, existing || candidate, {
      state: 'reserved', leaseToken: token,
      revision: Math.max(0, Number(existing && existing.revision || 0)) + 1,
      attempts: Math.max(0, Number(existing && existing.attempts || 0)) + 1,
      updatedAt: now,
    });
    delete stored.subject;
    delete stored.accountEmail;
    delete stored.digestWindowOpen;
    delete stored.focusRuleId;
    delete stored.attentionRevision;
    delete stored.focusRevision;
    mailReminderWriteLocked_(props, stored);
    return {
      record: stored,
      leaseToken: token,
      subject: candidate.subject,
      accountEmail: candidate.accountEmail,
      previousTelegramMessageId,
    };
  } finally { lock.releaseLock(); }
}

function markMailReminderDispatching_(claim) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return null;
  try {
    const props = PropertiesService.getScriptProperties();
    const stored = mailReminderReadRecord_(props, claim && claim.record && claim.record.reminderId);
    if (!stored || stored.state !== 'reserved' || stored.leaseToken !== String(claim && claim.leaseToken || '')) return null;
    stored.state = 'dispatching';
    stored.updatedAt = Date.now();
    mailReminderWriteLocked_(props, stored);
    claim.record = stored;
    return claim;
  } finally { lock.releaseLock(); }
}

function finishMailReminder_(claim, result, error) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return null;
  try {
    const props = PropertiesService.getScriptProperties();
    const stored = mailReminderReadRecord_(props, claim.record.reminderId);
    if (!stored || stored.state !== 'dispatching' || stored.leaseToken !== claim.leaseToken) return null;
    delete stored.leaseToken;
    stored.revision += 1;
    stored.updatedAt = Date.now();
    if (error) {
      const exhausted = Number(stored.attempts || 0) >= CONFIG.MAIL_REMINDER_MAX_ATTEMPTS;
      stored.state = error.telegramOutcomeUncertain || exhausted ? 'uncertain' : 'pending';
      stored.nextEligibleAt = stored.state === 'uncertain' ? 0 : Date.now() + Math.min(6 * 60 * 60 * 1000, stored.attempts * 15 * 60 * 1000);
      stored.lastError = String(error && error.message || error).slice(0, 180);
    } else {
      stored.state = 'delivered';
      stored.deliveredAt = Date.now();
      stored.telegramMessageId = Number(result && result.message_id || 0);
      stored.deliveryKind = result && result.mailReminderDigest ? 'digest' : 'single';
      stored.nextEligibleAt = 0;
      delete stored.lastError;
    }
    return mailReminderWriteLocked_(props, stored);
  } finally { lock.releaseLock(); }
}

function finishAcceptedMailReminder_(claim, result) {
  let persistenceError = null;
  try {
    const completed = finishMailReminder_(claim, result, null);
    if (completed) return completed;
    persistenceError = new Error('Telegram accepted the reminder but its delivered marker was not persisted.');
  } catch (error) {
    persistenceError = error;
  }
  persistenceError.telegramOutcomeUncertain = true;
  try { finishMailReminder_(claim, null, persistenceError); }
  catch (error) { console.error('Could not quarantine an accepted reminder after persistence failure: ' + error); }
  throw persistenceError;
}

function sendClaimedMailReminder_(claim) {
  const subject = escapeHtml_(claim.subject || 'Лист, до якого можна повернутися');
  const account = claim.accountEmail ? '\n📮 <code>' + escapeHtml_(claim.accountEmail) + '</code>' : '';
  const text = '<b>🌿 М’яке нагадування</b>\n\n' + subject + account +
    '\n\nМожна зробити лише один маленький крок або відкласти без провини.';
  const keyboard = JSON.stringify({ inline_keyboard: [
    [{ text: '📖 Відкрити лист', web_app: { url: mailboxAppUrl_('thread', claim.record.threadId, claim.record.messageId) } }],
    [
      { text: '🕘 Пізніше', callback_data: mailReminderCallbackData_('later', claim.record.reminderId, claim.record.revision + 1) },
      { text: '🔕 Не нагадувати про цей лист', callback_data: mailReminderCallbackData_('suppress', claim.record.reminderId, claim.record.revision + 1) },
    ],
  ] });
  return sendTelegramText_(text, keyboard, { chatId: claim.record.chatId, silent: false });
}

function sendClaimedMailReminderDigest_(claims) {
  const items = (Array.isArray(claims) ? claims : []).slice(0, 3);
  if (!items.length) throw new Error('Дайджест нагадувань порожній.');
  const text = '<b>🌿 Спокійний дайджест</b>\n\n' + items.map((claim, index) =>
    (index + 1) + '. ' + escapeHtml_(claim.subject || 'Лист, до якого можна повернутися') +
    (claim.accountEmail ? '\n   📮 <code>' + escapeHtml_(claim.accountEmail) + '</code>' : '')
  ).join('\n\n') + '\n\nОберіть лише один посильний крок. Решта може зачекати.';
  const rows = [];
  items.forEach((claim, index) => {
    rows.push([{
      text: '📖 ' + (index + 1) + '. Відкрити',
      web_app: { url: mailboxAppUrl_('thread', claim.record.threadId, claim.record.messageId) },
    }]);
    rows.push([
      { text: '🕘 ' + (index + 1) + '. Пізніше', callback_data: mailReminderCallbackData_('later', claim.record.reminderId, claim.record.revision + 1) },
      { text: '🔕 ' + (index + 1) + '. Не нагадувати', callback_data: mailReminderCallbackData_('suppress', claim.record.reminderId, claim.record.revision + 1) },
    ]);
  });
  return sendTelegramText_(text, JSON.stringify({ inline_keyboard: rows }), {
    chatId: items[0].record.chatId,
    silent: false,
  });
}

function retirePreviousReminderMessage_(claim) {
  const messageId = Number(claim && (claim.previousTelegramMessageId ||
    claim.record && claim.record.previousTelegramMessageId) || 0);
  const chatId = String(claim && claim.record && claim.record.chatId || '');
  if (!messageId || !/^\d{1,24}$/.test(chatId)) return false;
  try {
    telegramRequest_('deleteMessage', { chat_id: chatId, message_id: messageId });
    return clearRetiredPreviousReminderMessage_(claim.record, messageId);
  } catch (error) {
    if (telegramDeleteAlreadyApplied_(error)) {
      return clearRetiredPreviousReminderMessage_(claim.record, messageId);
    }
    console.error('Could not retire the previous soft reminder: ' + error);
    return false;
  }
}

function clearRetiredPreviousReminderMessage_(recordValue, messageIdValue) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return false;
  try {
    const props = PropertiesService.getScriptProperties();
    const stored = mailReminderReadRecord_(props, recordValue && recordValue.reminderId);
    if (!stored || Number(stored.previousTelegramMessageId || 0) !== Number(messageIdValue || 0)) return false;
    delete stored.previousTelegramMessageId;
    stored.updatedAt = Date.now();
    mailReminderWriteLocked_(props, stored);
    return true;
  } finally { lock.releaseLock(); }
}

function retirePendingPreviousReminderMessages_(limitValue) {
  const props = PropertiesService.getScriptProperties();
  const limit = Math.max(1, Math.min(Number(limitValue || 2), 3));
  let retired = 0;
  for (const key of mailReminderCanonicalIndex_(props)) {
    if (retired >= limit) break;
    const row = mailReminderReadRecord_(props, String(key).replace(/^MAIL_REMINDER_V1_/, ''));
    if (!row || row.state !== 'delivered' || !Number(row.previousTelegramMessageId || 0)) continue;
    if (retirePreviousReminderMessage_({ record: row })) retired += 1;
  }
  return retired;
}

function processCompassionateMailReminders_(limitValue) {
  if (typeof mailboxAttentionReadRegistry_ !== 'function' || typeof mailboxFocusReadRegistry_ !== 'function') {
    return { attempted: 0, delivered: 0 };
  }
  try { retirePendingPreviousReminderMessages_(2); }
  catch (error) { console.error('Could not retire previous soft reminders: ' + error); }
  const maximum = Math.max(1, Math.min(Number(limitValue || 2), 3));
  const now = Date.now();
  const newestByThread = new Map();
  readTelegramMailCardSyncRecords_().filter(card => card && card.state === 'active').forEach(card => {
    const key = String(card.userId || card.chatId || '') + ':' + String(card.connectionId || '') + ':' +
      String(card.gmailThreadId || '');
    const previous = newestByThread.get(key);
    const cardAt = Math.max(Number(card.createdAt || 0), Number(card.updatedAt || 0));
    const previousAt = previous
      ? Math.max(Number(previous.createdAt || 0), Number(previous.updatedAt || 0)) : 0;
    if (!previous || cardAt > previousAt) {
      newestByThread.set(key, card);
    }
  });
  const allCards = Array.from(newestByThread.values());
  const scanLimit = Math.min(CONFIG.MAIL_REMINDER_SCAN_LIMIT, allCards.length);
  const start = allCards.length ? (Math.floor(now / 60000) * CONFIG.MAIL_REMINDER_SCAN_LIMIT) % allCards.length : 0;
  const cards = [];
  for (let offset = 0; offset < scanLimit; offset += 1) cards.push(allCards[(start + offset) % allCards.length]);
  let attempted = 0;
  let delivered = 0;
  const digestClaimsByChat = new Map();
  for (let index = 0; index < cards.length && attempted < maximum; index += 1) {
    let candidate = null;
    try { candidate = mailReminderCandidate_(cards[index], now); }
    catch (error) { console.error('Reminder candidate skipped: ' + error); }
    if (!candidate) continue;
    const claim = reserveMailReminder_(candidate, now);
    if (!claim) continue;
    attempted += 1;
    if (['digest', 'soft_digest'].indexOf(claim.record.mode) !== -1) {
      const key = String(claim.record.userId) + ':' + String(claim.record.chatId);
      const batch = digestClaimsByChat.get(key) || [];
      batch.push(claim);
      digestClaimsByChat.set(key, batch);
      continue;
    }
    try {
      const dispatching = markMailReminderDispatching_(claim);
      if (!dispatching) continue;
      const result = sendClaimedMailReminder_(dispatching);
      finishAcceptedMailReminder_(dispatching, result);
      retirePreviousReminderMessage_(dispatching);
      delivered += 1;
    } catch (error) {
      finishMailReminder_(claim, null, error);
    }
  }
  digestClaimsByChat.forEach(claims => {
    const dispatching = claims.map(markMailReminderDispatching_).filter(Boolean);
    if (!dispatching.length) return;
    let result = null;
    try {
      result = sendClaimedMailReminderDigest_(dispatching);
    } catch (error) {
      dispatching.forEach(claim => finishMailReminder_(claim, null, error));
      return;
    }
    const digestResult = Object.assign({}, result || {}, { mailReminderDigest: true });
    dispatching.forEach(claim => {
      try {
        finishAcceptedMailReminder_(claim, digestResult);
        retirePreviousReminderMessage_(claim);
        delivered += 1;
      } catch (error) {
        console.error('Accepted digest reminder was quarantined: ' + error);
      }
    });
  });
  return { attempted, delivered };
}

function executeMailReminderCallback_(query, callback, userIdValue) {
  const userId = String(userIdValue || '');
  const chatId = String(telegramCallbackChatId_(query && query.message));
  if (!/^\d{1,24}$/.test(userId) || !constantTimeEqual_(userId, String(query && query.from && query.from.id || ''))) {
    throw new Error('Це нагадування належить іншому Telegram-користувачу.');
  }
  let changed = null;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw new Error('Нагадування зараз оновлюється.');
  try {
    const props = PropertiesService.getScriptProperties();
    const stored = mailReminderReadRecord_(props, callback.reminderId);
    if (!stored || !constantTimeEqual_(stored.userId, userId) || !constantTimeEqual_(stored.chatId, chatId)) {
      throw new Error('Нагадування не знайдено або воно належить іншому чату.');
    }
    if (stored.state !== 'delivered' || Number(callback.revision || 0) !== Number(stored.revision || 0)) {
      throw new Error('Ця кнопка застаріла; стан нагадування вже змінено.');
    }
    if (Number(stored.telegramMessageId || 0) !==
        Number(query && query.message && query.message.message_id || 0)) {
      throw new Error('Ця кнопка належить до іншого циклу нагадування.');
    }
    stored.state = callback.action === 'later' ? 'pending' : 'suppressed';
    stored.nextEligibleAt = callback.action === 'later' ? Date.now() + CONFIG.MAIL_REMINDER_LATER_DELAY_MS : 0;
    stored.revision += 1;
    stored.updatedAt = Date.now();
    changed = mailReminderWriteLocked_(props, stored);
  } finally { lock.releaseLock(); }
  try {
    if (changed.deliveryKind === 'digest') {
      const markup = query && query.message && query.message.reply_markup;
      const rows = markup && Array.isArray(markup.inline_keyboard) ? markup.inline_keyboard : [];
      const remaining = rows.filter(row => !(row || []).some(button => {
        const parsed = parseMailReminderCallback_(String(button && button.callback_data || ''));
        return parsed && parsed.reminderId === callback.reminderId;
      }));
      if (rows.length && remaining.length !== rows.length) {
        telegramRequest_('editMessageReplyMarkup', {
          chat_id: chatId,
          message_id: Number(query && query.message && query.message.message_id || 0),
          reply_markup: telegramMailBrowseMarkup_(remaining),
        });
      }
    } else {
      telegramRequest_('deleteMessage', { chat_id: chatId, message_id: Number(query && query.message && query.message.message_id || 0) });
    }
  } catch (error) { console.error('Could not hide handled reminder: ' + error); }
  return { message: callback.action === 'later'
    ? 'Нагадаю не раніше завтра; тихі години не перериваються'
    : 'Нагадування для цієї гілки вимкнено', reminder: changed };
}

function routeTelegramUpdate_(update) {
  if (update.callback_query) {
    hydrateTelegramCallbackMarkup_(update.callback_query);
    const action = String(update.callback_query.data || '');
    const replyTo = update.callback_query.message && update.callback_query.message.message_id;
    if (action === BOT_UI.CHECK_ACTION) return runManualMailCheck_();
    if (action === BOT_UI.STATUS_ACTION) return sendBotStatus_();
    if (action === BOT_UI.SETTINGS_ACTION) return sendSettingsMenu_(mailboxOwnerId_(), telegramCallbackChatId_(update.callback_query.message));
    const accountSwitch = parseTelegramGmailAccountCallback_(action);
    if (accountSwitch) {
      return switchTelegramGmailAccount_(
        mailboxOwnerId_(),
        telegramCallbackChatId_(update.callback_query.message),
        accountSwitch.connectionId
      );
    }
    if (action === BOT_UI.HELP_ACTION) return sendBotHelp_();
    if (action === BOT_UI.FOLDERS_ACTION) return sendFolderMenu_();
    if (action === BOT_UI.BROWSE_ACTION) {
      return sendTelegramMailBrowse_(
        update.update_id,
        '/mail',
        update.callback_query.message,
        true
      );
    }
    const browse = parseTelegramMailBrowseCallback_(action);
    if (browse) {
      return handleTelegramMailBrowseCallback_(
        update.update_id,
        update.callback_query,
        browse
      );
    }
    if (action === BOT_UI.UNSUBSCRIBE_UNAVAILABLE_ACTION) {
      return { message: 'Цей відправник не підтримує безпечну відписку' };
    }
    const reminderCallback = parseMailReminderCallback_(action);
    if (reminderCallback) {
      return executeMailReminderCallback_(update.callback_query, reminderCallback, mailboxOwnerId_());
    }
    const scopedContent = parseMailboxContentCallback_(action);
    if (scopedContent) {
      return withMailboxConnectionContext_(mailboxOwnerId_(), scopedContent.connectionId, 'viewer', () =>
        scopedContent.kind === 'original'
          ? sendFullOriginalForMessage_(scopedContent.messageId, replyTo,
              update.callback_query.message && update.callback_query.message.message_thread_id)
          : sendEmlForMessage_(scopedContent.messageId, replyTo,
              update.callback_query.message && update.callback_query.message.message_thread_id)
      );
    }
    const focusCallback = parseTelegramFocusCallback_(action);
    if (focusCallback) {
      return executeTelegramFocusCallback_(update.callback_query, focusCallback, {
        userId: mailboxOwnerId_(),
        chatId: telegramCallbackChatId_(update.callback_query.message),
      });
    }
    const focusRuleCallback = parseTelegramFocusRuleCallback_(action);
    if (focusRuleCallback) {
      return handleTelegramFocusRuleCallback_(
        update.callback_query,
        focusRuleCallback,
        mailboxOwnerId_()
      );
    }
    if (action.indexOf(BOT_UI.ORIGINAL_PREFIX) === 0) {
      const messageId = action.slice(BOT_UI.ORIGINAL_PREFIX.length);
      if (/^[a-zA-Z0-9_-]{5,64}$/.test(messageId)) {
        return sendFullOriginalForMessage_(
          messageId,
          replyTo,
          update.callback_query.message && update.callback_query.message.message_thread_id
        );
      }
    }
    const attachment = parseAttachmentCallback_(action);
    if (attachment) {
      const sendAttachment = () => sendAttachmentByIndex_(
          attachment.messageId, attachment.index, replyTo,
          update.callback_query.message && update.callback_query.message.message_thread_id
        );
      return attachment.connectionId
        ? withMailboxConnectionContext_(mailboxOwnerId_(), attachment.connectionId, 'viewer', sendAttachment)
        : sendAttachment();
    }
    if (action.indexOf(BOT_UI.EML_PREFIX) === 0) {
      const messageId = action.slice(BOT_UI.EML_PREFIX.length);
      if (/^[a-zA-Z0-9_-]{5,64}$/.test(messageId)) {
        return sendEmlForMessage_(
          messageId,
          replyTo,
          update.callback_query.message && update.callback_query.message.message_thread_id
        );
      }
    }
    if (action === BOT_UI.NOOP_ACTION) return;
    const mailbox = parseMailboxCallback_(action);
    if (mailbox) {
      return executeDurableMailboxCallback_(update.update_id, update.callback_query, mailbox);
    }
    return;
  }

  const text = String((update.message || {}).text || '').trim();
  if (text === BOT_UI.CHECK_TEXT || /^\/check(?:@\w+)?$/i.test(text)) {
    return runManualMailCheck_();
  }
  if (text === BOT_UI.STATUS_TEXT || /^\/status(?:@\w+)?$/i.test(text)) {
    return sendBotStatus_();
  }
  if (text === BOT_UI.MENU_TEXT || /^\/(?:start|menu)(?:@\w+)?$/i.test(text)) {
    return sendControlMenu_();
  }
  if (text === BOT_UI.FOLDERS_TEXT || /^\/folders(?:@\w+)?$/i.test(text)) {
    return sendFolderMenu_();
  }
  if (text === BOT_UI.BROWSE_TEXT || /^\/mail(?:@\w+)?(?:\s|$)/i.test(text)) {
    return sendTelegramMailBrowse_(update.update_id, text, update.message, false);
  }
  if (text === BOT_UI.FOCUS_TEXT || /^\/focus(?:@\w+)?(?:\s|$)/i.test(text)) {
    try {
      return sendTelegramFocusRules_(update.update_id, text, update.message, mailboxOwnerId_());
    } catch (error) {
      if (!error || !error.telegramFocusInput) throw error;
      sendTelegramText_(
        '<b>⚠️ Не вдалося створити правило</b>\n\n' + escapeHtml_(error.message),
        null,
        systemTopicOptions_({ replyTo: update.message && update.message.message_id, silent: true })
      );
      return { message: 'Перевірте команду /focus' };
    }
  }
  if (/^\/help(?:@\w+)?$/i.test(text)) return sendBotHelp_();

  sendTelegramText_(
    'Скористайтеся кнопками керування нижче або відкрийте <b>☰ Меню</b>.',
    replyKeyboard_()
  );
}

function readTelegramUpdateOperation_(updateId) {
  try {
    return JSON.parse(
      PropertiesService.getScriptProperties().getProperty(
        telegramUpdateOperationKey_(updateId)
      ) || 'null'
    );
  } catch (error) {
    return null;
  }
}

function saveTelegramUpdateOperation_(updateId, operation) {
  const props = PropertiesService.getScriptProperties();
  const propertyKey = telegramUpdateOperationKey_(updateId);
  const serialized = JSON.stringify(operation);
  assertTelegramPropertyValueFits_(propertyKey, serialized);
  assertTelegramPropertyStoreFits_(props, { [propertyKey]: serialized });
  props.setProperty(propertyKey, serialized);
}

/**
 * Persists Gmail success before any Telegram card work. A timer retry can then
 * finish the card move without executing the Gmail mutation (or unsubscribe)
 * a second time.
 */
function executeDurableMailboxCallback_(updateId, query, mailbox, principalValue) {
  const props = PropertiesService.getScriptProperties();
  const principal = principalValue || {};
  const ownerId = String(props.getProperty('ALLOWED_USER_ID') || props.getProperty('CHAT_ID') || '');
  const userId = String(principal.userId || ownerId);
  const chatId = String(principal.chatId || props.getProperty('CHAT_ID') || '');
  const connectionId = String(mailbox && mailbox.connectionId || '');
  if (!/^\d{1,24}$/.test(userId) || !/^-?\d{1,24}$/.test(chatId)) {
    throw new Error('Telegram-користувач або чат недійсний.');
  }
  if (!connectionId && !constantTimeEqual_(userId, ownerId)) {
    throw new Error('Кнопка не містить Gmail-акаунт. Відкрийте актуальну картку листа.');
  }
  let operation = readTelegramUpdateOperation_(updateId);
  if (operation && (
    String(operation.chatId) !== chatId ||
    String(operation.userId || ownerId) !== userId ||
    String(operation.connectionId || '') !== connectionId ||
    String(operation.action) !== String(mailbox.action) ||
    String(operation.gmailMessageId) !== String(mailbox.messageId)
  )) {
    throw new Error('Збережена Telegram-операція не відповідає команді.');
  }

  if (!operation) {
    // Reserve the operation value before Gmail or an external unsubscribe POST
    // runs. The padding is retained through the gmail_done boundary, so every
    // later idempotency/reconciliation write only shrinks the reserved value.
    operation = {
      version: 2,
      chatId,
      userId,
      connectionId,
      action: String(mailbox.action),
      gmailMessageId: String(mailbox.messageId),
      phase: 'reserved',
      message: '',
      reconciliationWarning: '',
      capacityPadding: 'x'.repeat(700),
      updatedAt: Date.now(),
    };
    saveTelegramUpdateOperation_(updateId, operation);
  }

  let result;
  if (operation && operation.phase === 'gmail_done') {
    result = { ok: true, message: String(operation.message || '✅ Готово') };
  } else {
    if (connectionId) {
      let previousContext = mailboxCurrentSessionContext_;
      try {
        const access = mailboxMultiResolveAccess_({ userId }, connectionId, 'manager');
        mailboxCurrentSessionContext_ = {
          userId,
          connectionId: access.connection.id,
          zoneId: access.connection.zoneId,
          role: access.member.role,
        };
        result = executeMailboxAction_(mailbox.action, mailbox.messageId);
      } finally {
        mailboxCurrentSessionContext_ = previousContext;
      }
    } else {
      result = executeMailboxAction_(mailbox.action, mailbox.messageId);
    }
    operation.phase = 'gmail_done';
    operation.message = mailboxActionDoneLabel_(mailbox.action);
    operation.updatedAt = Date.now();
    // This write is the idempotency boundary: everything below may retry, but
    // the Gmail mutation above must never run again for the same update_id.
    saveTelegramUpdateOperation_(updateId, operation);
  }

  const relocation = finalizeMailboxCallback_(
    query && query.message,
    query && query.data,
    mailbox.action,
    mailbox.messageId,
    connectionId
  );
  operation.reconciliationWarning = relocation && relocation.warning
    ? String(relocation.warning)
    : '';
  operation.message = mailboxActionDoneLabel_(mailbox.action) +
    (operation.reconciliationWarning
      ? ' · ⚠️ ' + String(operation.reconciliationWarning)
      : '');
  operation.updatedAt = Date.now();
  delete operation.capacityPadding;
  saveTelegramUpdateOperation_(updateId, operation);
  if (relocation && relocation.retryNeeded) {
    // Gmail has already succeeded and that boundary is durable. Surface a
    // transient failure so the update journal retries only the Telegram card
    // reconciliation on the timer, never the Gmail mutation itself.
    throw new Error(String(relocation.warning || 'Не вдалося перемістити картку листа в Telegram.'));
  }
  result.message = operation.message;
  return result;
}

function mailboxCallbackData_(action, messageId, connectionId) {
  const code = MAILBOX_CALLBACK_CODES[String(action || '')];
  const id = String(messageId || '');
  if (!code || !/^[a-zA-Z0-9_-]{5,50}$/.test(id)) {
    throw new Error('Некоректна дія або Gmail ID для Telegram-кнопки.');
  }
  const connection = String(connectionId || '');
  if (connection && !/^gmail-[A-Za-z0-9_-]{1,32}$/.test(connection)) {
    throw new Error('Некоректний Gmail-акаунт для Telegram-кнопки.');
  }
  const value = connection
    ? BOT_UI.MAILBOX_MULTI_PREFIX + code + ':' + connection + ':' + id
    : BOT_UI.MAILBOX_PREFIX + code + ':' + id;
  if (value.length > 64) throw new Error('Telegram callback_data перевищує 64 байти.');
  return value;
}

function parseMailboxCallback_(value) {
  const escapedMultiPrefix = BOT_UI.MAILBOX_MULTI_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const multi = String(value || '').match(
    new RegExp('^' + escapedMultiPrefix + '([atsuirndefxpo]):(gmail-[A-Za-z0-9_-]{1,32}):([a-zA-Z0-9_-]{5,50})$')
  );
  if (multi) {
    return {
      action: Object.keys(MAILBOX_CALLBACK_CODES)
        .find(name => MAILBOX_CALLBACK_CODES[name] === multi[1]),
      connectionId: multi[2],
      messageId: multi[3],
    };
  }
  const escapedPrefix = BOT_UI.MAILBOX_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = String(value || '').match(
    new RegExp('^' + escapedPrefix + '([atsuirndefxpo]):([a-zA-Z0-9_-]{5,50})$')
  );
  if (!match) return null;
  return {
    action: Object.keys(MAILBOX_CALLBACK_CODES)
      .find(name => MAILBOX_CALLBACK_CODES[name] === match[1]),
    connectionId: '',
    messageId: match[2],
  };
}

function attachmentCallbackData_(messageId, index, connectionId) {
  const id = String(messageId || '');
  const ordinal = Number(index);
  if (!/^[a-zA-Z0-9_-]{5,50}$/.test(id) || !Number.isInteger(ordinal) || ordinal < 0 || ordinal > 99) {
    throw new Error('Некоректне вкладення для Telegram-кнопки.');
  }
  const connection = String(connectionId || '');
  if (connection && !/^gmail-[A-Za-z0-9_-]{1,32}$/.test(connection)) {
    throw new Error('Некоректний Gmail-акаунт вкладення.');
  }
  const value = connection
    ? BOT_UI.ATTACHMENT_MULTI_PREFIX + connection + ':' + id + ':' + ordinal.toString(36)
    : BOT_UI.ATTACHMENT_PREFIX + id + ':' + ordinal.toString(36);
  if (BufferSafeByteLength_(value) > 64) {
    throw new Error('Telegram callback_data вкладення перевищує 64 байти.');
  }
  return value;
}

function parseAttachmentCallback_(value) {
  const escapedMultiPrefix = BOT_UI.ATTACHMENT_MULTI_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const multi = String(value || '').match(new RegExp(
    '^' + escapedMultiPrefix + '(gmail-[A-Za-z0-9_-]{1,32}):([a-zA-Z0-9_-]{5,50}):([0-9a-z]{1,2})$'
  ));
  if (multi) {
    const multiIndex = parseInt(multi[3], 36);
    return Number.isInteger(multiIndex) && multiIndex >= 0 && multiIndex <= 99
      ? { connectionId: multi[1], messageId: multi[2], index: multiIndex }
      : null;
  }
  const escapedPrefix = BOT_UI.ATTACHMENT_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = String(value || '').match(
    new RegExp('^' + escapedPrefix + '([a-zA-Z0-9_-]{5,50}):([0-9a-z]{1,2})$')
  );
  if (!match) return null;
  const index = parseInt(match[2], 36);
  if (!Number.isInteger(index) || index < 0 || index > 99) return null;
  return { messageId: match[1], index };
}

function telegramFocusCallbackData_(actionValue, messageIdValue, connectionIdValue) {
  const action = String(actionValue || '');
  const code = TELEGRAM_FOCUS_ACTIONS[action];
  const messageId = String(messageIdValue || '');
  const connectionId = String(connectionIdValue || '');
  if (!code || !/^[a-zA-Z0-9_-]{5,50}$/.test(messageId) ||
      !/^gmail-[A-Za-z0-9_-]{1,32}$/.test(connectionId)) {
    throw new Error('Некоректний персональний пріоритет для Telegram-кнопки.');
  }
  const value = BOT_UI.FOCUS_MULTI_PREFIX + code + ':' + connectionId + ':' + messageId;
  if (utf8ByteLength_(value) > 64) throw new Error('Telegram callback_data пріоритету перевищує 64 байти.');
  return value;
}

function parseTelegramFocusCallback_(value) {
  const escaped = BOT_UI.FOCUS_MULTI_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = String(value || '').match(new RegExp(
    '^' + escaped + '([mchvlnb]):(gmail-[A-Za-z0-9_-]{1,32}):([a-zA-Z0-9_-]{5,50})$'
  ));
  if (!match) return null;
  const action = Object.keys(TELEGRAM_FOCUS_ACTIONS)
    .find(name => TELEGRAM_FOCUS_ACTIONS[name] === match[1]);
  return action ? { action, connectionId: match[2], messageId: match[3] } : null;
}

function telegramFocusRuleCallbackData_(actionValue, connectionIdValue, revisionValue, argumentValue) {
  const action = String(actionValue || '');
  const code = TELEGRAM_FOCUS_RULE_ACTIONS[action];
  const connectionId = String(connectionIdValue || '');
  const revisionNumber = Number(revisionValue || 0);
  const revision = Number.isInteger(revisionNumber) && revisionNumber >= 0 && revisionNumber <= 2176782335
    ? revisionNumber.toString(36) : '';
  const argument = String(argumentValue || '');
  if (!code || !/^gmail-[A-Za-z0-9_-]{1,32}$/.test(connectionId) ||
      !/^[0-9a-z]{1,6}$/.test(revision) || (argument && !/^[A-Za-z0-9_-]{1,10}$/.test(argument))) {
    throw new Error('Некоректна Telegram-команда правил пріоритету.');
  }
  const value = BOT_UI.FOCUS_RULE_MULTI_PREFIX + code + ':' + connectionId + ':' + revision +
    (argument ? ':' + argument : '');
  if (utf8ByteLength_(value) > 64) throw new Error('Telegram callback_data правила перевищує 64 байти.');
  return value;
}

function parseTelegramFocusRuleCallback_(value) {
  const escaped = BOT_UI.FOCUS_RULE_MULTI_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = String(value || '').match(new RegExp(
    '^' + escaped + '([lstdcp]):(gmail-[A-Za-z0-9_-]{1,32}):([0-9a-z]{1,6})(?::([A-Za-z0-9_-]{1,10}))?$'
  ));
  if (!match) return null;
  const revision = parseInt(match[3], 36);
  if (!Number.isInteger(revision) || revision < 0 || revision > 2176782335) return null;
  const action = Object.keys(TELEGRAM_FOCUS_RULE_ACTIONS)
    .find(name => TELEGRAM_FOCUS_RULE_ACTIONS[name] === match[1]);
  return action ? {
    action, connectionId: match[2], revision, argument: match[4] || '',
  } : null;
}

function telegramFocusRuleFingerprint_(ruleIdValue) {
  const ruleId = String(ruleIdValue || '');
  if (!/^focus-[A-Za-z0-9_-]{8,60}$/.test(ruleId)) return '';
  return hashedMessageId_('focus-rule:' + ruleId).slice(0, 8);
}

function telegramFocusRuleByFingerprint_(rulesValue, fingerprintValue) {
  const fingerprint = String(fingerprintValue || '');
  if (!/^[a-f0-9]{8}$/.test(fingerprint)) return null;
  const matches = (Array.isArray(rulesValue) ? rulesValue : [])
    .filter(rule => telegramFocusRuleFingerprint_(rule && rule.id) === fingerprint);
  if (matches.length !== 1) return null;
  return matches[0];
}

function telegramFocusRuleConditionsText_(conditionsValue) {
  const conditions = conditionsValue || {};
  const parts = [];
  if (conditions.fromEmail) parts.push('від ' + conditions.fromEmail);
  if (conditions.fromDomain) parts.push('домен ' + conditions.fromDomain);
  if (conditions.subjectContains) parts.push('тема містить «' + conditions.subjectContains + '»');
  if (conditions.labelId) parts.push('мітка ' + conditions.labelId);
  return parts.join(' · ') || 'умови не задано';
}

function telegramFocusLevelDisplay_(priorityValue) {
  return telegramFocusDisplay_({ priority: String(priorityValue || '') });
}

function telegramFocusRulesView_(userIdValue, connectionIdValue, pageValue, confirmDeleteValue) {
  const userId = String(userIdValue || '');
  const principal = mailboxMultiPrincipal_(userId);
  const visible = mailboxMultiVisibleAccounts_(principal, principal.registry)
    .filter(account => account.connected);
  const connectionId = String(connectionIdValue || principal.connectionId || '');
  const selected = visible.find(account => account.id === connectionId);
  if (!selected) {
    return {
      text: '<b>🎯 Пріоритети</b>\n\nСпочатку підключіть Gmail-акаунт у Mini App.',
      markup: telegramMailBrowseMarkup_([[{
        text: '＋ Підключити Gmail', web_app: { url: mailboxBootstrapUrl_() },
      }]]),
      connectionId: '', revision: 0,
    };
  }
  const selectedEmail = String(selected.email ||
    (connectionId === MAILBOX_MULTI_CONFIG_.LEGACY_CONNECTION_ID ? CONFIG.GMAIL_ACCOUNT : selected.name || 'Gmail'));
  return withMailboxConnectionContext_(userId, connectionId, 'viewer', () => {
    const config = mailboxFocusConfig_({}, mailboxCurrentSessionContext_);
    const rules = Array.isArray(config.rules) ? config.rules : [];
    const perPage = 6;
    const maxPage = Math.max(0, Math.ceil(rules.length / perPage) - 1);
    const page = Math.max(0, Math.min(maxPage, Number(pageValue || 0)));
    const start = page * perPage;
    const rows = [];
    if (visible.length > 1) {
      const accountButtons = visible.slice(0, 8).map(account => ({
        text: (account.id === connectionId ? '✓ ' : '📮 ') + makePreview_(account.email, 28),
        callback_data: telegramFocusRuleCallbackData_('select', account.id, 0),
      }));
      rows.push.apply(rows, chunkTelegramMailBrowseButtons_(accountButtons, 2));
    }
    const lines = [
      '<b>🎯 ADHD-фокус і пріоритети</b>',
      'Скринька: <code>' + escapeHtml_(selectedEmail) + '</code>',
      '',
      rules.length
        ? 'Автоматичних правил: <b>' + rules.length + '</b>'
        : '<i>Автоматичних правил ще немає.</i>',
    ];
    rules.slice(start, start + perPage).forEach((rule, index) => {
      const ordinal = start + index + 1;
      const fingerprint = telegramFocusRuleFingerprint_(rule.id);
      lines.push(
        '', '<b>' + ordinal + '. ' + escapeHtml_(rule.name) + '</b> · ' +
          escapeHtml_(telegramFocusLevelDisplay_(rule.priority)),
        (rule.enabled ? '🟢 активне' : '⚪ вимкнене') + ' · ' +
          escapeHtml_(telegramFocusRuleConditionsText_(rule.conditions))
      );
      const confirming = fingerprint && fingerprint === String(confirmDeleteValue || '');
      if (confirming) {
        rows.push([
          { text: '🗑 Так, видалити №' + ordinal,
            callback_data: telegramFocusRuleCallbackData_('confirmDelete', connectionId, config.revision, fingerprint) },
          { text: '↩️ Скасувати',
            callback_data: telegramFocusRuleCallbackData_('list', connectionId, config.revision, page.toString(36)) },
        ]);
      } else {
        rows.push([
          { text: rule.enabled ? '⏸ Вимкнути №' + ordinal : '▶️ Увімкнути №' + ordinal,
            callback_data: telegramFocusRuleCallbackData_(
              'toggle', connectionId, config.revision, fingerprint + (rule.enabled ? '0' : '1')
            ) },
          { text: '🗑 Видалити №' + ordinal,
            callback_data: telegramFocusRuleCallbackData_('delete', connectionId, config.revision, fingerprint) },
        ]);
      }
    });
    if (maxPage > 0) {
      const navigation = [];
      if (page > 0) navigation.push({
        text: '◀️', callback_data: telegramFocusRuleCallbackData_('page', connectionId, config.revision, (page - 1).toString(36)),
      });
      navigation.push({ text: (page + 1) + ' / ' + (maxPage + 1), callback_data: BOT_UI.NOOP_ACTION });
      if (page < maxPage) navigation.push({
        text: '▶️', callback_data: telegramFocusRuleCallbackData_('page', connectionId, config.revision, (page + 1).toString(36)),
      });
      rows.push(navigation);
    }
    rows.push([
      { text: '➕ Важлива людина', copy_text: { text: '/focus add level:critical from:email@example.com name:"Важлива людина"' } },
      { text: '➕ Оплата', copy_text: { text: '/focus add level:high subject:"рахунок" name:"Оплата рахунків"' } },
    ]);
    rows.push([{
      text: '🧩 Розширені правила й кольори', web_app: { url: mailboxBootstrapUrl_() },
    }]);
    lines.push(
      '', '<b>Створення правила</b>',
      '<code>/focus add level:critical from:worker@example.com name:"Соціальний працівник"</code>',
      '<i>Поля: from, domain, subject, label, level, name, match.</i>'
    );
    if (visible.length > 8) lines.push('', '<i>Показано 8 із ' + visible.length + ' скриньок; усі доступні в Mini App.</i>');
    return {
      text: lines.join('\n'), markup: telegramMailBrowseMarkup_(rows),
      connectionId, revision: config.revision, page,
    };
  });
}

const TELEGRAM_FOCUS_SYNC_PREFIX = 'TELEGRAM_FOCUS_SYNC_V1_';
const TELEGRAM_FOCUS_SYNC_SCOPE_LIMIT = 20;

function telegramFocusSyncPropertyKey_(userIdValue, connectionIdValue) {
  const userId = String(userIdValue || '');
  const connectionId = String(connectionIdValue || '');
  if (!/^\d{1,24}$/.test(userId) || !/^gmail-[A-Za-z0-9_-]{1,80}$/.test(connectionId)) return '';
  return TELEGRAM_FOCUS_SYNC_PREFIX + hashedMessageId_('focus-sync:' + userId + ':' + connectionId);
}

/** Called while MailClient already owns the ScriptLock, before focus state commits. */
function reserveTelegramFocusReconciliationLocked_(properties, scopeValue) {
  const props = properties || PropertiesService.getScriptProperties();
  const scope = scopeValue || {};
  const userId = String(scope.userId || '');
  const connectionId = String(scope.connectionId || '');
  const key = telegramFocusSyncPropertyKey_(userId, connectionId);
  if (!key) throw mailboxError_('INVALID_FOCUS', 'Не вдалося зарезервувати синхронізацію пріоритетів.');
  const all = props.getProperties();
  const keys = Object.keys(all).filter(name => name.indexOf(TELEGRAM_FOCUS_SYNC_PREFIX) === 0);
  if (!Object.prototype.hasOwnProperty.call(all, key) && keys.length >= TELEGRAM_FOCUS_SYNC_SCOPE_LIMIT) {
    throw mailboxError_('STORAGE_FULL', 'Черга синхронізації пріоритетів заповнена.');
  }
  let existing = null;
  try { existing = JSON.parse(String(all[key] || 'null')); } catch (error) { existing = null; }
  const now = Date.now();
  const record = {
    v: 1,
    userId,
    chatId: userId,
    connectionId,
    cursor: '',
    attempts: 0,
    createdAt: existing && Number(existing.createdAt || 0) > 0 ? Number(existing.createdAt) : now,
    updatedAt: now,
  };
  const serialized = JSON.stringify(record);
  assertTelegramPropertyValueFits_(key, serialized);
  assertTelegramPropertyStoreFits_(props, { [key]: serialized });
  props.setProperty(key, serialized);
  return record;
}

function telegramFocusSyncRecord_(keyValue, rawValue) {
  const key = String(keyValue || '');
  let value = null;
  try { value = JSON.parse(String(rawValue || '')); } catch (error) { value = null; }
  if (!/^TELEGRAM_FOCUS_SYNC_V1_[a-f0-9]{16}$/.test(key) || !value || value.v !== 1 ||
      !/^\d{1,24}$/.test(String(value.userId || '')) ||
      String(value.chatId || '') !== String(value.userId || '') ||
      !/^gmail-[A-Za-z0-9_-]{1,80}$/.test(String(value.connectionId || '')) ||
      key !== telegramFocusSyncPropertyKey_(value.userId, value.connectionId) ||
      (value.cursor && !/^[A-Za-z0-9_-]{5,64}$/.test(String(value.cursor))) ||
      !Number.isInteger(value.attempts) || value.attempts < 0 || value.attempts > 1000000) return null;
  return value;
}

function syncTelegramFocusCard_(card, userId, connectionId, registry) {
  const message = getGmailMessage_(card.gmailMessageId);
  const focus = mailboxFocusEvaluate_(registry, {
    id: String(message.threadId || card.gmailThreadId || ''),
    sender: { email: senderEmail_(message.from) },
    subject: String(message.subject || ''),
    labelIds: Array.isArray(message.labelIds) ? message.labelIds : [],
  });
  let currentMarkup = {};
  try {
    currentMarkup = typeof card.replyMarkup === 'string'
      ? JSON.parse(card.replyMarkup || '{}') : card.replyMarkup || {};
  } catch (error) {
    currentMarkup = {};
  }
  const callback = {
    action: 'menu', connectionId, messageId: String(card.gmailMessageId),
  };
  const keyboard = telegramFocusKeyboard_(currentMarkup, callback, focus, false);
  try {
    telegramRequest_('editMessageReplyMarkup', {
      chat_id: String(card.chatId),
      message_id: Number(card.telegramMessageId),
      reply_markup: keyboard.serialized,
    });
  } catch (error) {
    if (!telegramEditAlreadyApplied_(error)) throw error;
  }
  updateTelegramMailCardMarkupRecord_(
    card.gmailMessageId, keyboard.serialized, null, connectionId, card.chatId
  );
  return focus;
}

function processTelegramFocusReconciliations_(limitValue) {
  const limit = Math.max(1, Math.min(10, Number(limitValue || 5)));
  const props = PropertiesService.getScriptProperties();
  const all = props.getProperties();
  const keys = Object.keys(all).filter(name => name.indexOf(TELEGRAM_FOCUS_SYNC_PREFIX) === 0).sort();
  if (keys.length > TELEGRAM_FOCUS_SYNC_SCOPE_LIMIT) {
    throw new Error('Черга синхронізації пріоритетів перевищила безпечний ліміт.');
  }
  let processed = 0;
  let completedScopes = 0;
  for (const key of keys) {
    if (processed >= limit) break;
    const record = telegramFocusSyncRecord_(key, all[key]);
    if (!record) throw new Error('Черга синхронізації пріоритетів пошкоджена.');
    const cards = readTelegramMailCards_({
      chatId: record.chatId,
      userId: record.userId,
      connectionId: record.connectionId,
    }).sort((left, right) => String(left.gmailMessageId).localeCompare(String(right.gmailMessageId)));
    const pending = cards.filter(card => !record.cursor || String(card.gmailMessageId) > record.cursor);
    if (!pending.length) {
      props.deleteProperty(key);
      completedScopes += 1;
      continue;
    }
    try {
      withMailboxConnectionContext_(record.userId, record.connectionId, 'viewer', () => {
        const registry = mailboxFocusRegistryForCurrentSession_();
        if (!registry) throw new Error('Налаштування пріоритетів тимчасово недоступні.');
        pending.slice(0, limit - processed).forEach(card => {
          syncTelegramFocusCard_(card, record.userId, record.connectionId, registry);
          record.cursor = String(card.gmailMessageId);
          record.updatedAt = Date.now();
          record.attempts = 0;
          props.setProperty(key, JSON.stringify(record));
          processed += 1;
        });
      });
    } catch (error) {
      record.attempts = Math.min(1000000, Number(record.attempts || 0) + 1);
      record.updatedAt = Date.now();
      props.setProperty(key, JSON.stringify(record));
      console.error('Focus card reconciliation failed for ' + record.connectionId + ': ' + error);
      continue;
    }
    const remaining = cards.some(card => String(card.gmailMessageId) > record.cursor);
    if (!remaining) {
      props.deleteProperty(key);
      completedScopes += 1;
    }
  }
  return { processed, completedScopes, pendingScopes: Math.max(0, keys.length - completedScopes) };
}

function telegramFocusCommandError_(message) {
  const error = new Error(String(message || 'Некоректна команда пріоритету.'));
  error.telegramFocusInput = true;
  return error;
}

function parseTelegramFocusCommand_(commandTextValue) {
  const raw = String(commandTextValue || '').trim();
  if (raw === BOT_UI.FOCUS_TEXT || /^\/focus(?:@\w+)?$/i.test(raw)) return { action: 'list' };
  const command = raw.match(/^\/focus(?:@\w+)?\s+add(?:\s+([\s\S]*))?$/i);
  if (!command || raw.length > 700 || /[\u0000-\u001F\u007F]/.test(raw)) {
    throw telegramFocusCommandError_('Використайте /focus або /focus add з безпечними полями.');
  }
  const source = String(command[1] || '').trim();
  if (!source) throw telegramFocusCommandError_('Після /focus add додайте умову та назву правила.');
  const values = Object.create(null);
  const pattern = /([A-Za-z]+):(?:"([^"]*)"|(\S+))/g;
  let cursor = 0;
  let match;
  while ((match = pattern.exec(source))) {
    if (source.slice(cursor, match.index).trim()) {
      throw telegramFocusCommandError_('Між полями потрібні пробіли; фрази беріть у лапки.');
    }
    cursor = pattern.lastIndex;
    const key = String(match[1] || '').toLowerCase();
    const value = String(match[2] !== undefined ? match[2] : match[3] || '').trim();
    if (['level', 'from', 'domain', 'subject', 'label', 'name', 'match'].indexOf(key) === -1) {
      throw telegramFocusCommandError_('Невідоме поле: ' + key + '.');
    }
    if (values[key] !== undefined) throw telegramFocusCommandError_('Поле ' + key + ' вказано двічі.');
    if (!value || value.length > (key === 'name' ? 80 : 120)) {
      throw telegramFocusCommandError_('Поле ' + key + ' порожнє або завелике.');
    }
    values[key] = value;
  }
  if (source.slice(cursor).trim()) throw telegramFocusCommandError_('Не вдалося прочитати кінець команди.');
  const level = String(values.level || '').toLowerCase();
  if (['low', 'medium', 'high', 'critical'].indexOf(level) === -1) {
    throw telegramFocusCommandError_('level: low, medium, high або critical.');
  }
  const mode = String(values.match || 'all').toLowerCase();
  if (['all', 'any'].indexOf(mode) === -1) throw telegramFocusCommandError_('match: all або any.');
  if (!values.name) throw telegramFocusCommandError_('Додайте name:"Назва правила".');
  if (!values.from && !values.domain && !values.subject && !values.label) {
    throw telegramFocusCommandError_('Додайте from, domain, subject або label.');
  }
  return {
    action: 'create', name: values.name, priority: level, match: mode,
    fromEmail: String(values.from || ''), fromDomain: String(values.domain || ''),
    subjectContains: String(values.subject || ''), labelName: String(values.label || ''),
  };
}

function editTelegramFocusRulesMessage_(message, view) {
  if (!message || !message.message_id) throw new Error('Telegram-повідомлення правил відсутнє.');
  try {
    return telegramRequest_('editMessageText', {
      chat_id: telegramCallbackChatId_(message),
      message_id: message.message_id,
      text: view.text,
      parse_mode: 'HTML',
      link_preview_options: JSON.stringify({ is_disabled: true }),
      reply_markup: view.markup,
    });
  } catch (error) {
    if (telegramEditAlreadyApplied_(error)) return null;
    throw error;
  }
}

function sendTelegramFocusRules_(updateId, commandText, message, userIdValue) {
  const userId = String(userIdValue || '');
  const parsed = parseTelegramFocusCommand_(commandText);
  const principal = mailboxMultiPrincipal_(userId);
  let connectionId = String(principal.connectionId || '');
  if (parsed.action === 'create') {
    if (!connectionId) throw telegramFocusCommandError_('Спочатку підключіть і виберіть Gmail-акаунт.');
    withMailboxConnectionContext_(userId, connectionId, 'viewer', () => {
      const current = mailboxFocusConfig_({}, mailboxCurrentSessionContext_);
      let labelId = '';
      if (parsed.labelName) labelId = resolveTelegramMailBrowseLabel_(parsed.labelName).id;
      mailboxFocusRuleAdmin_({
        action: 'create', operationId: hashedMessageId_('focus-create:' + String(updateId || '')),
        expectedRevision: current.revision, name: parsed.name, enabled: true,
        priority: parsed.priority, color: '', match: parsed.match,
        conditions: {
          fromEmail: parsed.fromEmail,
          fromDomain: parsed.fromDomain,
          subjectContains: parsed.subjectContains,
          labelId,
        },
      }, mailboxCurrentSessionContext_);
    });
  }
  const view = telegramFocusRulesView_(userId, connectionId, 0, '');
  sendTelegramText_(view.text, view.markup, {
    chatId: userId,
    replyTo: message && message.message_id,
    silent: true,
  });
  return { message: parsed.action === 'create' ? 'Правило пріоритету створено' : 'Пріоритети відкрито' };
}

function handleTelegramFocusRuleCallback_(query, callback, userIdValue) {
  const userId = String(userIdValue || '');
  const chatId = String(telegramCallbackChatId_(query && query.message));
  if (!/^\d{1,24}$/.test(userId) || chatId !== userId ||
      String(query && query.from && query.from.id || '') !== userId) {
    throw new Error('Це меню пріоритетів належить іншому Telegram-користувачу.');
  }
  let connectionId = callback.connectionId;
  let page = 0;
  let confirmDelete = '';
  let resultMessage = 'Правила оновлено';
  if (callback.action === 'select') {
    mailboxMultiRememberSelection_(userId, connectionId);
    resultMessage = 'Gmail-акаунт вибрано';
  } else if (callback.action === 'page' || callback.action === 'list') {
    page = callback.argument ? parseInt(callback.argument, 36) : 0;
    if (!Number.isInteger(page) || page < 0 || page > 1000) page = 0;
    resultMessage = 'Правила відкрито';
  } else {
    withMailboxConnectionContext_(userId, connectionId, 'viewer', () => {
      let config = mailboxFocusConfig_({}, mailboxCurrentSessionContext_);
      const fingerprint = callback.action === 'toggle'
        ? callback.argument.slice(0, 8) : callback.argument;
      let rule = telegramFocusRuleByFingerprint_(config.rules, fingerprint);
      if (callback.action === 'delete') {
        if (!rule) throw new Error('Правило вже видалене або змінилося.');
        if (config.revision !== callback.revision) {
          resultMessage = 'Список правил вже змінився';
          return;
        }
        confirmDelete = fingerprint;
        resultMessage = 'Підтвердіть видалення правила';
        return;
      }
      if (callback.action === 'toggle') {
        const desired = callback.argument.slice(8) === '1';
        if (config.revision !== callback.revision) {
          if (config.revision === callback.revision + 1 && rule && rule.enabled === desired) {
            resultMessage = desired ? 'Правило увімкнено' : 'Правило вимкнено';
            return;
          }
          resultMessage = 'Список правил вже змінився';
          return;
        }
        if (!rule) throw new Error('Правило вже видалене або змінилося.');
        config = mailboxFocusRuleAdmin_({
          action: 'update', ruleId: rule.id, expectedRevision: config.revision,
          name: rule.name, enabled: desired, priority: rule.priority,
          color: rule.color, match: rule.match, conditions: rule.conditions,
        }, mailboxCurrentSessionContext_);
        resultMessage = desired ? 'Правило увімкнено' : 'Правило вимкнено';
        return;
      }
      if (callback.action === 'confirmDelete') {
        if (config.revision !== callback.revision) {
          if (config.revision === callback.revision + 1 && !rule) {
            resultMessage = 'Правило видалено';
            return;
          }
          resultMessage = 'Список правил вже змінився';
          return;
        }
        if (!rule) throw new Error('Правило вже видалене або змінилося.');
        mailboxFocusRuleAdmin_({
          action: 'delete', ruleId: rule.id, expectedRevision: config.revision,
        }, mailboxCurrentSessionContext_);
        resultMessage = 'Правило видалено';
      }
    });
  }
  const view = telegramFocusRulesView_(userId, connectionId, page, confirmDelete);
  editTelegramFocusRulesMessage_(query && query.message, view);
  return { message: resultMessage };
}

function withMailboxConnectionContext_(userIdValue, connectionIdValue, minimumRole, callback) {
  const userId = String(userIdValue || '');
  const connectionId = String(connectionIdValue || '');
  const access = mailboxMultiResolveAccess_({ userId }, connectionId, minimumRole || 'viewer');
  const previous = mailboxCurrentSessionContext_;
  mailboxCurrentSessionContext_ = {
    userId,
    connectionId: access.connection.id,
    zoneId: access.connection.zoneId,
    role: access.member.role,
  };
  try { return callback(); }
  finally { mailboxCurrentSessionContext_ = previous; }
}

function mailboxContentCallbackData_(kindValue, messageIdValue, connectionIdValue) {
  const kind = String(kindValue || '');
  const messageId = String(messageIdValue || '');
  const connectionId = String(connectionIdValue || '');
  if (['original', 'eml'].indexOf(kind) === -1 || !/^[a-zA-Z0-9_-]{5,50}$/.test(messageId) ||
      (connectionId && !/^gmail-[A-Za-z0-9_-]{1,32}$/.test(connectionId))) {
    throw new Error('Некоректний оригінал листа для Telegram-кнопки.');
  }
  if (!connectionId) return (kind === 'original' ? BOT_UI.ORIGINAL_PREFIX : BOT_UI.EML_PREFIX) + messageId;
  const value = (kind === 'original' ? BOT_UI.ORIGINAL_MULTI_PREFIX : BOT_UI.EML_MULTI_PREFIX) +
    connectionId + ':' + messageId;
  if (BufferSafeByteLength_(value) > 64) throw new Error('Telegram callback_data оригіналу перевищує 64 байти.');
  return value;
}

function parseMailboxContentCallback_(value) {
  const text = String(value || '');
  const variants = [
    { kind: 'original', prefix: BOT_UI.ORIGINAL_MULTI_PREFIX },
    { kind: 'eml', prefix: BOT_UI.EML_MULTI_PREFIX },
  ];
  for (let i = 0; i < variants.length; i += 1) {
    const escaped = variants[i].prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = text.match(new RegExp('^' + escaped + '(gmail-[A-Za-z0-9_-]{1,32}):([a-zA-Z0-9_-]{5,50})$'));
    if (match) return { kind: variants[i].kind, connectionId: match[1], messageId: match[2] };
  }
  return null;
}

function BufferSafeByteLength_(value) {
  return utf8ByteLength_(String(value || ''));
}

function mailboxActionDisplayName_(action) {
  return {
    archive: 'архівувати лист',
    trash: 'перемістити лист до кошика',
    spam: 'позначити лист як спам',
    unsubscribe: 'відписатися від розсилки',
    inbox: 'повернути лист до Вхідних',
    untrash: 'відновити лист',
    notSpam: 'зняти позначку спаму',
  }[String(action || '')] || 'виконати дію';
}

function mailboxActionDoneLabel_(action) {
  return {
    archive: '✅ Архівовано',
    trash: '✅ У кошику',
    spam: '✅ Позначено як спам',
    unsubscribe: '✅ Відписку надіслано',
    inbox: '✅ У Вхідних',
    untrash: '✅ Відновлено',
    notSpam: '✅ Не спам',
    read: '✅ Прочитано',
    unread: '✅ Непрочитано',
    star: '⭐ Позначено',
    unstar: '☆ Без зірочки',
    important: '❗ Позначено важливим',
    notImportant: '✅ Важливість знято',
  }[String(action || '')] || '✅ Виконано';
}

function markMailboxCallbackDone_(message, callbackData, action) {
  try {
    const rows = message && message.reply_markup && message.reply_markup.inline_keyboard;
    if (!message || !message.message_id || !Array.isArray(rows)) return;
    let changed = false;
    const terminalMove = action === 'trash' || action === 'spam';
    const updatedRows = rows.map(row => (row || []).map(button => {
      const buttonCallback = button && String(button.callback_data || '');
      if (buttonCallback === String(callbackData || '')) {
        changed = true;
        return {
          text: mailboxActionDoneLabel_(action),
          callback_data: BOT_UI.NOOP_ACTION,
        };
      }
      if (terminalMove && button &&
          (parseMailboxCallback_(buttonCallback) || button.text === '🔕 Відписатися')) {
        changed = true;
        return null;
      }
      return button;
    }).filter(Boolean)).filter(row => row.length);
    if (!changed) return;
    telegramRequest_('editMessageReplyMarkup', {
      chat_id: telegramCallbackChatId_(message),
      message_id: message.message_id,
      reply_markup: JSON.stringify({ inline_keyboard: updatedRows }),
    });
  } catch (error) {
    console.error('Could not update Telegram action button: ' + error);
  }
}

function telegramCardIndex_(props, name) {
  try {
    const value = JSON.parse(props.getProperty(name) || '[]');
    return Array.isArray(value) ? value.map(String) : [];
  } catch (error) {
    return [];
  }
}

function telegramCardMovePropertyKey_(chatId, sourceMessageId, destinationThreadId) {
  return 'TELEGRAM_CARD_MOVE_' +
    String(chatId).replace(/[^0-9-]/g, '').slice(-24) + '_' +
    String(sourceMessageId).replace(/\D/g, '').slice(0, 24) + '_' +
    String(destinationThreadId).replace(/\D/g, '').slice(0, 24);
}

function telegramMailCardPropertyKey_(gmailMessageId, connectionIdValue, chatIdValue) {
  const connectionId = String(connectionIdValue || '');
  const chatId = String(chatIdValue || '');
  if (connectionId) {
    if (!/^gmail-[A-Za-z0-9_-]{1,32}$/.test(connectionId) || !/^-?\d{1,24}$/.test(chatId)) return '';
    return 'TELEGRAM_MAIL_CARD_V2_' +
      chatId.replace(/[^0-9-]/g, '').slice(-24) + '_' + connectionId + '_' +
      String(gmailMessageId || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
  }
  return 'TELEGRAM_MAIL_CARD_' +
    String(gmailMessageId || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
}

function writeBoundedTelegramRecord_(props, indexName, propertyKey, record, isActive) {
  let keys = telegramCardIndex_(props, indexName).filter(key => key !== propertyKey);
  keys.push(propertyKey);
  const compacted = isActive
    ? compactSoftLimit_(keys, CONFIG.TELEGRAM_CARD_LEDGER_LIMIT, key => {
        if (key === propertyKey) return Boolean(isActive(record));
        let stored = null;
        try { stored = JSON.parse(props.getProperty(key) || 'null'); }
        catch (error) { stored = null; }
        return Boolean(stored && isActive(stored));
      })
    : {
        kept: keys.slice(-CONFIG.TELEGRAM_CARD_LEDGER_LIMIT),
        evicted: keys.slice(0, Math.max(0, keys.length - CONFIG.TELEGRAM_CARD_LEDGER_LIMIT)),
      };
  const hardLimit = indexName === 'TELEGRAM_MAIL_RECONCILE_INDEX'
    ? CONFIG.TELEGRAM_MAIL_RECONCILE_ACTIVE_HARD_LIMIT
    : CONFIG.TELEGRAM_CARD_LEDGER_ACTIVE_HARD_LIMIT;
  if (isActive) {
    const activeCount = compacted.kept.reduce((count, key) => {
      if (key === propertyKey) return count + (isActive(record) ? 1 : 0);
      let stored = null;
      try { stored = JSON.parse(props.getProperty(key) || 'null'); }
      catch (error) { stored = null; }
      return count + (stored && isActive(stored) ? 1 : 0);
    }, 0);
    if (activeCount > hardLimit) {
      throw new Error('Telegram synchronization capacity is temporarily full.');
    }
  }
  const indexJson = JSON.stringify(compacted.kept);
  assertTelegramPropertyValueFits_(indexName, indexJson);
  const recordJson = JSON.stringify(record);
  assertTelegramPropertyValueFits_(propertyKey, recordJson);
  assertTelegramPropertyStoreFits_(props, {
    [indexName]: indexJson,
    [propertyKey]: recordJson,
  }, compacted.evicted);
  props.setProperty(indexName, indexJson);
  compacted.evicted.forEach(key => deleteScriptProperty_(props, key));
  props.setProperty(propertyKey, recordJson);
}

function withTelegramCardStateLock_(callback) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw new Error('Telegram card state is busy.');
  try {
    return callback(PropertiesService.getScriptProperties());
  } finally {
    lock.releaseLock();
  }
}

function saveTelegramMailCard_(card) {
  return withTelegramCardStateLock_(props => {
    const normalized = Object.assign({}, card, {
      version: TELEGRAM_CARD_STATE_VERSION,
      chatId: String(card.chatId || props.getProperty('CHAT_ID') || ''),
      userId: String(card.userId || ''),
      connectionId: String(card.connectionId || ''),
      gmailMessageId: String(card.gmailMessageId || ''),
      gmailThreadId: String(card.gmailThreadId || ''),
      telegramMessageId: Number(card.telegramMessageId || 0),
      messageThreadId: Number(card.messageThreadId || 0),
      state: 'active',
      updatedAt: Date.now(),
    });
    const propertyKey = telegramMailCardPropertyKey_(normalized.gmailMessageId, normalized.connectionId, normalized.chatId);
    if (!normalized.gmailMessageId || !normalized.telegramMessageId || !propertyKey) return null;
    const existingKeys = telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX')
      .filter(key => key !== propertyKey);
    if (!props.getProperty(propertyKey) && existingKeys.length >= CONFIG.TELEGRAM_MAIL_CARD_HARD_LIMIT) {
      throw new Error('Telegram mail-card registry is temporarily full.');
    }
    existingKeys.push(propertyKey);
    const indexJson = JSON.stringify(existingKeys);
    const recordJson = JSON.stringify(normalized);
    assertTelegramPropertyValueFits_('TELEGRAM_MAIL_CARD_INDEX', indexJson);
    assertTelegramPropertyValueFits_(propertyKey, recordJson);
    assertTelegramPropertyStoreFits_(props, {
      TELEGRAM_MAIL_CARD_INDEX: indexJson,
      [propertyKey]: recordJson,
    });
    props.setProperty(propertyKey, recordJson);
    props.setProperty('TELEGRAM_MAIL_CARD_INDEX', indexJson);
    return normalized;
  });
}

function telegramMailDeliveryReservationId_() {
  return Date.now().toString(36) + '_' +
    Math.floor(Math.random() * 0x7FFFFFFF).toString(36) + '_' +
    Math.floor(Math.random() * 0x7FFFFFFF).toString(36);
}

function telegramMailDeliveryQuarantineIndexName_() {
  return 'TELEGRAM_MAIL_DELIVERY_QUARANTINE_INDEX_V1';
}

function telegramMailDeliveryQuarantineLimit_() {
  // This is an audit working set, not the authoritative Gmail/Telegram card
  // registry. A compact total counter and SEEN_MESSAGE_IDS survive eviction.
  return 20;
}

function quarantineTelegramMailCardDeliveryLocked_(props, storedValue, deliveryError, knownTelegramMessageId) {
  const stored = storedValue || {};
  const gmailMessageId = String(stored.gmailMessageId || '');
  const propertyKey = telegramMailCardPropertyKey_(gmailMessageId, stored.connectionId, stored.chatId);
  if (!propertyKey || !gmailMessageId) {
    throw new Error('Невизначену Telegram-доставку неможливо додати до карантину.');
  }

  const now = Date.now();
  const quarantineIndexName = telegramMailDeliveryQuarantineIndexName_();
  const previousQuarantineKeys = telegramCardIndex_(props, quarantineIndexName);
  const alreadyQuarantined = previousQuarantineKeys.indexOf(propertyKey) !== -1 &&
    String(stored.state || '') === 'delivery_uncertain';
  const orderedQuarantineKeys = previousQuarantineKeys
    .filter(key => key !== propertyKey)
    .concat([propertyKey]);
  const overflow = Math.max(0, orderedQuarantineKeys.length - telegramMailDeliveryQuarantineLimit_());
  const evictedKeys = orderedQuarantineKeys.slice(0, overflow);
  const quarantineKeys = orderedQuarantineKeys.slice(overflow);
  const cardKeys = telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX')
    .filter(key => key !== propertyKey);

  const knownId = Math.max(0, Number(knownTelegramMessageId || 0));
  const lastError = String(deliveryError && deliveryError.message || deliveryError ||
    'Telegram не підтвердив створення картки.')
    .replace(/[\u0000-\u001F\u007F]/g, ' ').slice(0, 180);
  const uncertain = {
    version: TELEGRAM_CARD_STATE_VERSION,
    chatId: String(stored.chatId || props.getProperty('CHAT_ID') || ''),
    userId: String(stored.userId || ''),
    connectionId: String(stored.connectionId || ''),
    gmailMessageId,
    gmailThreadId: String(stored.gmailThreadId || ''),
    telegramMessageId: Number.isSafeInteger(knownId) ? knownId : 0,
    messageThreadId: Math.max(0, Number(stored.messageThreadId || 0)),
    topic: String(stored.topic || ''),
    state: 'delivery_uncertain',
    lastError,
    createdAt: Math.max(0, Number(stored.createdAt || now)),
    uncertainAt: Math.max(0, Number(stored.uncertainAt || now)),
    updatedAt: now,
  };

  const seenPropertyName = gmailNotificationSafeSeenPropertyName_(stored.seenPropertyName) ||
    'SEEN_MESSAGE_IDS';
  const seenIds = readJsonArrayProperty_(props, seenPropertyName).map(String)
    .filter(id => id !== gmailMessageId);
  seenIds.push(gmailMessageId);
  while (seenIds.length > CONFIG.SEEN_IDS_LIMIT) seenIds.shift();
  let seenJson = JSON.stringify(seenIds);
  while (seenIds.length && utf8ByteLength_(seenJson) > CONFIG.TELEGRAM_PROPERTY_MAX_BYTES) {
    seenIds.shift();
    seenJson = JSON.stringify(seenIds);
  }

  const totalName = 'TELEGRAM_MAIL_DELIVERY_QUARANTINE_TOTAL_V1';
  const total = Math.max(0, Number(props.getProperty(totalName) || 0)) +
    (alreadyQuarantined ? 0 : 1);
  const lastName = 'TELEGRAM_MAIL_DELIVERY_QUARANTINE_LAST_V1';
  const lastJson = JSON.stringify({
    gmailMessageId,
    gmailThreadId: uncertain.gmailThreadId,
    knownTelegramMessageId: uncertain.telegramMessageId,
    reason: lastError,
    at: now,
  });
  const recordJson = JSON.stringify(uncertain);
  const quarantineIndexJson = JSON.stringify(quarantineKeys);
  const cardIndexJson = JSON.stringify(cardKeys);
  assertTelegramPropertyValueFits_(propertyKey, recordJson);
  assertTelegramPropertyValueFits_(quarantineIndexName, quarantineIndexJson);
  assertTelegramPropertyValueFits_('TELEGRAM_MAIL_CARD_INDEX', cardIndexJson);
  assertTelegramPropertyValueFits_(seenPropertyName, seenJson);
  assertTelegramPropertyValueFits_(lastName, lastJson);
  assertTelegramPropertyStoreFits_(props, {
    [propertyKey]: recordJson,
    [quarantineIndexName]: quarantineIndexJson,
    TELEGRAM_MAIL_CARD_INDEX: cardIndexJson,
    [seenPropertyName]: seenJson,
    [totalName]: String(total),
    [lastName]: lastJson,
  }, evictedKeys);

  // Persist the at-most-once tombstone before releasing its active registry
  // slot. Any interruption is therefore repairable without another create.
  props.setProperty(propertyKey, recordJson);
  props.setProperty(quarantineIndexName, quarantineIndexJson);
  props.setProperty(seenPropertyName, seenJson);
  props.setProperty(totalName, String(total));
  props.setProperty(lastName, lastJson);
  props.setProperty('TELEGRAM_MAIL_CARD_INDEX', cardIndexJson);
  evictedKeys.forEach(key => {
    if (key !== propertyKey && cardKeys.indexOf(key) === -1) deleteScriptProperty_(props, key);
  });
  return uncertain;
}

function quarantineStoredTelegramMailCardDelivery_(propertyKey, reason) {
  return withTelegramCardStateLock_(props => {
    let stored = null;
    try { stored = JSON.parse(props.getProperty(String(propertyKey || '')) || 'null'); }
    catch (error) { stored = null; }
    if (!stored || ['delivery_reserved', 'delivery_uncertain']
      .indexOf(String(stored.state || '')) === -1) return null;
    if (String(stored.state || '') === 'delivery_reserved' &&
        Date.now() - Number(stored.createdAt || stored.updatedAt || 0) <
          CONFIG.TELEGRAM_MAIL_DELIVERY_RESERVATION_MS) return null;
    const knownId = String(stored.state || '') === 'delivery_uncertain' &&
      Number(stored.telegramMessageId || 0) !== Number.MAX_SAFE_INTEGER
      ? Number(stored.telegramMessageId || 0) : 0;
    return quarantineTelegramMailCardDeliveryLocked_(props, stored, reason || stored.lastError, knownId);
  });
}

/**
 * Atomically consumes both a registry slot and the exact reply-markup storage
 * before Telegram creates an externally visible message. The placeholder is
 * intentionally larger than its final active record, so promotion cannot need
 * extra Script Properties capacity after sendMessage/sendPhoto succeeds.
 */
function reserveTelegramMailCardDelivery_(card) {
  purgeOldTelegramMailCards_(5);
  return withTelegramCardStateLock_(props => {
    const now = Date.now();
    const chatId = String(card && card.chatId || props.getProperty('CHAT_ID') || '');
    const userId = String(card && card.userId || '');
    const connectionId = String(card && card.connectionId || '');
    const gmailMessageId = String(card && card.gmailMessageId || '');
    const gmailThreadId = String(card && card.gmailThreadId || '');
    const requestedSeenPropertyName = String(card && card.seenPropertyName || 'SEEN_MESSAGE_IDS');
    const seenPropertyName = gmailNotificationSafeSeenPropertyName_(requestedSeenPropertyName);
    const propertyKey = telegramMailCardPropertyKey_(gmailMessageId, connectionId, chatId);
    if (!chatId || !gmailMessageId || !gmailThreadId || !propertyKey || !seenPropertyName) {
      throw new Error('Не вдалося зарезервувати Telegram-картку: відсутній Gmail або chat ID.');
    }

    let existing = null;
    try { existing = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { existing = null; }
    if (existing && Number(existing.version) === TELEGRAM_CARD_STATE_VERSION &&
        String(existing.chatId || '') === chatId &&
        String(existing.state || 'active') === 'active' &&
        Number(existing.telegramMessageId || 0) > 0) {
      return { alreadyRegistered: true, card: existing };
    }
    if (existing && Number(existing.version) === TELEGRAM_CARD_STATE_VERSION &&
        String(existing.chatId || '') === chatId &&
        String(existing.gmailMessageId || '') === gmailMessageId &&
        String(existing.gmailThreadId || '') === gmailThreadId &&
        String(existing.connectionId || '') === connectionId &&
        String(existing.state || '') === 'delivery_uncertain') {
      return { outcomeUncertain: true, card: existing };
    }
    if (existing && String(existing.state || '') === 'delivery_reserved') {
      if (now - Number(existing.createdAt || existing.updatedAt || 0) <
          CONFIG.TELEGRAM_MAIL_DELIVERY_RESERVATION_MS) {
        throw new Error('Надсилання цієї Telegram-картки вже виконується.');
      }
      // Apps Script may stop after Telegram created the message but before its
      // returned ID was committed. Retrying would create a duplicate, so the
      // stale reservation becomes an explicit at-most-once quarantine record.
      const uncertain = quarantineTelegramMailCardDeliveryLocked_(
        props,
        existing,
        'Виконання зупинилося на межі створення Telegram-картки; автоматичний повтор заборонено.',
        0
      );
      return { outcomeUncertain: true, staleReservation: true, card: uncertain };
    }

    const existingKeys = telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX')
      .filter(key => key !== propertyKey);
    if (existingKeys.length >= CONFIG.TELEGRAM_MAIL_CARD_HARD_LIMIT) {
      throw new Error('Telegram-картки тимчасово очікують синхронізації. Новий лист буде повторено пізніше.');
    }
    existingKeys.push(propertyKey);
    const reservation = {
      version: TELEGRAM_CARD_STATE_VERSION,
      chatId,
      userId,
      connectionId,
      gmailMessageId,
      gmailThreadId,
      // Reserve the maximum safe integer width; the real Bot API message ID is
      // no longer, so promotion only shrinks this JSON value.
      telegramMessageId: Number.MAX_SAFE_INTEGER,
      messageThreadId: Number(card && card.messageThreadId || 0),
      topic: String(card && card.topic || ''),
      gmailState: card && card.gmailState || null,
      replyMarkup: typeof card.replyMarkup === 'string'
        ? card.replyMarkup
        : JSON.stringify(card && card.replyMarkup || {}),
      state: 'delivery_reserved',
      seenPropertyName,
      reservationId: telegramMailDeliveryReservationId_(),
      capacityPadding: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      createdAt: now,
      updatedAt: now,
    };
    const indexJson = JSON.stringify(existingKeys);
    const recordJson = JSON.stringify(reservation);
    assertTelegramPropertyValueFits_('TELEGRAM_MAIL_CARD_INDEX', indexJson);
    assertTelegramPropertyValueFits_(propertyKey, recordJson);
    assertTelegramPropertyStoreFits_(props, {
      TELEGRAM_MAIL_CARD_INDEX: indexJson,
      [propertyKey]: recordJson,
    });
    props.setProperty(propertyKey, recordJson);
    props.setProperty('TELEGRAM_MAIL_CARD_INDEX', indexJson);
    return {
      alreadyRegistered: false,
      propertyKey,
      reservationId: reservation.reservationId,
      gmailMessageId,
      gmailThreadId,
      chatId,
      userId,
      connectionId,
      seenPropertyName: reservation.seenPropertyName,
    };
  });
}

function finalizeTelegramMailCardDelivery_(reservation, telegramMessage) {
  const input = reservation || {};
  const telegramMessageId = Number(telegramMessage && telegramMessage.message_id || 0);
  if (!telegramMessageId) throw new Error('Telegram не повернув ID надісланої картки.');
  return withTelegramCardStateLock_(props => {
    const propertyKey = String(input.propertyKey || '');
    let stored = null;
    const storedJson = String(props.getProperty(propertyKey) || '');
    try { stored = JSON.parse(storedJson || 'null'); }
    catch (error) { stored = null; }
    if (!stored || String(stored.state || '') !== 'delivery_reserved' ||
        String(stored.reservationId || '') !== String(input.reservationId || '') ||
        String(stored.chatId || '') !== String(input.chatId || props.getProperty('CHAT_ID') || '') ||
        String(stored.connectionId || '') !== String(input.connectionId || '') ||
        String(stored.gmailMessageId || '') !== String(input.gmailMessageId || '')) {
      throw new Error('Резервація Telegram-картки втрачена до завершення надсилання.');
    }
    const active = Object.assign({}, stored, {
      telegramMessageId,
      state: 'active',
      updatedAt: Date.now(),
    });
    delete active.reservationId;
    delete active.capacityPadding;
    const activeJson = JSON.stringify(active);
    assertTelegramPropertyValueFits_(propertyKey, activeJson);
    if (utf8ByteLength_(activeJson) > utf8ByteLength_(storedJson)) {
      throw new Error('Фінальна Telegram-картка перевищила зарезервований обсяг сховища.');
    }
    assertTelegramPropertyStoreFits_(props, { [propertyKey]: activeJson });
    props.setProperty(propertyKey, activeJson);
    return active;
  });
}

function markTelegramMailCardDeliveryUncertain_(reservation, deliveryError, knownTelegramMessageId) {
  const input = reservation || {};
  return withTelegramCardStateLock_(props => {
    const propertyKey = String(input.propertyKey || '');
    let stored = null;
    try { stored = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { stored = null; }
    if (!stored || String(stored.state || '') !== 'delivery_reserved' ||
        String(stored.reservationId || '') !== String(input.reservationId || '') ||
        String(stored.chatId || '') !== String(input.chatId || props.getProperty('CHAT_ID') || '') ||
        String(stored.connectionId || '') !== String(input.connectionId || '') ||
        String(stored.gmailMessageId || '') !== String(input.gmailMessageId || '')) {
      throw new Error('Резервація невизначеної Telegram-доставки втрачена.');
    }
    return quarantineTelegramMailCardDeliveryLocked_(
      props,
      stored,
      deliveryError,
      knownTelegramMessageId
    );
  });
}

function cancelTelegramMailCardDelivery_(reservation) {
  const input = reservation || {};
  return withTelegramCardStateLock_(props => {
    const propertyKey = String(input.propertyKey || '');
    let stored = null;
    try { stored = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { stored = null; }
    if (!stored || String(stored.state || '') !== 'delivery_reserved' ||
        String(stored.reservationId || '') !== String(input.reservationId || '')) return false;
    deleteScriptProperty_(props, propertyKey);
    const next = telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX')
      .filter(key => key !== propertyKey);
    props.setProperty('TELEGRAM_MAIL_CARD_INDEX', JSON.stringify(next));
    return true;
  });
}

function assertTelegramMailCardCapacity_(gmailMessageId) {
  purgeOldTelegramMailCards_(5);
  return withTelegramCardStateLock_(props => {
    const propertyKey = telegramMailCardPropertyKey_(gmailMessageId);
    const keys = telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX');
    if (keys.indexOf(propertyKey) === -1 && keys.length >= CONFIG.TELEGRAM_MAIL_CARD_HARD_LIMIT) {
      throw new Error('Telegram-картки тимчасово очікують синхронізації. Новий лист буде повторено пізніше.');
    }
    const projected = keys.indexOf(propertyKey) === -1 ? keys.concat([propertyKey]) : keys;
    assertTelegramPropertyValueFits_('TELEGRAM_MAIL_CARD_INDEX', JSON.stringify(projected));
    // Reserve enough total-store headroom for the compact card metadata and
    // reply markup before Telegram creates an externally visible message.
    assertTelegramPropertyStoreFits_(props, {
      TELEGRAM_MAIL_CARD_INDEX: JSON.stringify(projected),
      [propertyKey]: 'x'.repeat(5000),
    });
    return true;
  });
}

function removeTelegramMailCardPropertyKey_(propertyKey) {
  return withTelegramCardStateLock_(props => {
    deleteScriptProperty_(props, propertyKey);
    const next = telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX')
      .filter(key => key !== propertyKey);
    props.setProperty('TELEGRAM_MAIL_CARD_INDEX', JSON.stringify(next));
    return true;
  });
}

/**
 * Telegram keeps only a recent working set of cards. Older cards are removed
 * from Telegram first; their registry entry is deleted only after Telegram
 * confirms deletion (or reports the idempotent already-gone result).
 */
function purgeOldTelegramMailCards_(limit) {
  const props = PropertiesService.getScriptProperties();
  const maximum = Math.max(0, Math.min(Number(limit) || 5, 10));
  let keys = telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX');
  let quarantined = 0;
  for (const propertyKey of keys) {
    if (quarantined >= maximum) break;
    let card = null;
    try { card = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { card = null; }
    const state = String(card && card.state || '');
    const staleReservation = state === 'delivery_reserved' &&
      Date.now() - Number(card.createdAt || card.updatedAt || 0) >=
        CONFIG.TELEGRAM_MAIL_DELIVERY_RESERVATION_MS;
    if (state !== 'delivery_uncertain' && !staleReservation) continue;
    try {
      if (quarantineStoredTelegramMailCardDelivery_(
        propertyKey,
        staleReservation
          ? 'Застаріла резервація Telegram-create переведена до at-most-once карантину.'
          : String(card.lastError || 'Невизначену доставку перенесено до обмеженого карантину.')
      )) quarantined += 1;
    } catch (error) {
      console.error('Could not migrate uncertain Telegram delivery: ' + error);
    }
  }

  keys = telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX');
  const excess = Math.max(0, keys.length - CONFIG.TELEGRAM_CARD_LEDGER_LIMIT);
  const candidates = [];
  for (const propertyKey of keys) {
    if (candidates.length >= Math.min(excess, maximum)) break;
    let card = null;
    try { card = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { card = null; }
    if (card && ['delivery_reserved', 'delivery_uncertain'].indexOf(String(card.state || '')) !== -1) {
      continue;
    }
    candidates.push(propertyKey);
  }
  let removed = 0;
  candidates.forEach(propertyKey => {
    let card = null;
    try { card = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { card = null; }
    if (!card || !card.telegramMessageId || !/^-?\d{1,24}$/.test(String(card.chatId || ''))) {
      removeTelegramMailCardPropertyKey_(propertyKey);
      removed += 1;
      return;
    }
    try {
      telegramRequest_('deleteMessage', {
        chat_id: String(card.chatId),
        message_id: Number(card.telegramMessageId),
      });
    } catch (error) {
      if (!telegramDeleteAlreadyApplied_(error)) {
        console.error('Could not purge old Telegram mail card: ' + error);
        return;
      }
    }
    if (removeTelegramMailCardRecord_(card)) removed += 1;
  });
  return { attempted: candidates.length, removed };
}

function recordTelegramMailCard_(gmailMessage, telegramMessage, replyMarkup, topicName, contextValue) {
  if (!gmailMessage || !telegramMessage || !telegramMessage.message_id ||
      typeof PropertiesService === 'undefined' || typeof LockService === 'undefined') return;
  try {
    const context = contextValue || {};
    saveTelegramMailCard_({
      chatId: String(context.chatId || ''),
      userId: String(context.userId || ''),
      connectionId: String(context.connectionId || ''),
      gmailMessageId: gmailMessage.id,
      gmailThreadId: gmailMessage.threadId,
      telegramMessageId: telegramMessage.message_id,
      messageThreadId: telegramTopicId_(topicName),
      topic: String(topicName || ''),
      replyMarkup: typeof replyMarkup === 'string' ? replyMarkup : JSON.stringify(replyMarkup || {}),
      gmailState: telegramMailStateFromLabelIds_(gmailMessage.labelIds || []),
    });
  } catch (error) {
    // Delivery already succeeded; a registry write must never replay the email.
    console.error('Could not register Telegram mail card: ' + error);
  }
}

function readTelegramMailCards_(criteria) {
  const props = PropertiesService.getScriptProperties();
  const wanted = criteria || {};
  const expectedChatId = String(wanted.chatId || props.getProperty('CHAT_ID') || '');
  return telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX').map(propertyKey => {
    try { return JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { return null; }
  }).filter(card => card &&
    Number(card.version) === TELEGRAM_CARD_STATE_VERSION &&
    String(card.chatId) === expectedChatId &&
    (!wanted.userId || String(card.userId || '') === String(wanted.userId)) &&
    (!wanted.connectionId || String(card.connectionId || '') === String(wanted.connectionId)) &&
    String(card.state || 'active') === 'active' &&
    Number(card.telegramMessageId || 0) > 0 &&
    (wanted.gmailThreadId
      ? String(card.gmailThreadId) === String(wanted.gmailThreadId)
      : (!wanted.gmailMessageId || String(card.gmailMessageId) === String(wanted.gmailMessageId)))
  );
}

function readTelegramMailCardSyncRecords_() {
  const props = PropertiesService.getScriptProperties();
  return telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX')
    .map(propertyKey => readTelegramMailCardSyncRecordByKey_(propertyKey, props))
    .filter(Boolean);
}

function readTelegramMailCardSyncRecordByKey_(propertyKey, properties) {
  const props = properties || PropertiesService.getScriptProperties();
  const key = String(propertyKey || '');
  if (!/^TELEGRAM_MAIL_CARD_[a-zA-Z0-9_-]{5,64}$/.test(key) &&
      !/^TELEGRAM_MAIL_CARD_V2_-?\d{1,24}_gmail-[A-Za-z0-9_-]{1,32}_[A-Za-z0-9_-]{5,64}$/.test(key)) return null;
  let card = null;
  try { card = JSON.parse(props.getProperty(key) || 'null'); }
  catch (error) { card = null; }
  const expectedKey = telegramMailCardPropertyKey_(card && card.gmailMessageId, card && card.connectionId, card && card.chatId);
  if (!card || Number(card.version) !== TELEGRAM_CARD_STATE_VERSION ||
      !/^[a-zA-Z0-9_-]{5,64}$/.test(String(card.gmailMessageId || '')) ||
      expectedKey !== key ||
      ['active', 'hidden'].indexOf(String(card.state || 'active')) === -1) return null;
  return card;
}

function readTelegramMailCardSyncRecordById_(gmailMessageId, properties, connectionId, chatId) {
  const id = String(gmailMessageId || '');
  if (!/^[a-zA-Z0-9_-]{5,64}$/.test(id)) return null;
  return readTelegramMailCardSyncRecordByKey_(telegramMailCardPropertyKey_(id, connectionId, chatId), properties);
}

function persistTelegramMailCardState_(cardValue) {
  const input = Object.assign({}, cardValue || {});
  return withTelegramCardStateLock_(props => {
    const propertyKey = telegramMailCardPropertyKey_(input.gmailMessageId, input.connectionId, input.chatId);
    let stored = null;
    try { stored = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { stored = null; }
    if (!stored || (input.chatId && String(stored.chatId || '') !== String(input.chatId))) return null;
    if (input.expectedTelegramMessageId !== undefined &&
        Number(stored.telegramMessageId || 0) !== Number(input.expectedTelegramMessageId || 0)) return null;
    const next = Object.assign({}, stored, input, {
      version: TELEGRAM_CARD_STATE_VERSION,
      chatId: String(stored.chatId || input.chatId || props.getProperty('CHAT_ID') || ''),
      userId: String(stored.userId || input.userId || ''),
      connectionId: String(stored.connectionId || input.connectionId || ''),
      gmailMessageId: String(stored.gmailMessageId || input.gmailMessageId || ''),
      gmailThreadId: String(input.gmailThreadId || stored.gmailThreadId || ''),
      telegramMessageId: Number(input.telegramMessageId !== undefined
        ? input.telegramMessageId : stored.telegramMessageId || 0),
      messageThreadId: Number(input.messageThreadId !== undefined
        ? input.messageThreadId : stored.messageThreadId || 0),
      state: String(input.state || stored.state || 'active'),
      updatedAt: Date.now(),
    });
    delete next.expectedTelegramMessageId;
    if (next.state === 'active' && !next.telegramMessageId) return null;
    if (next.state === 'hidden') {
      next.telegramMessageId = 0;
      next.messageThreadId = 0;
    }
    const serialized = JSON.stringify(next);
    assertTelegramPropertyValueFits_(propertyKey, serialized);
    assertTelegramPropertyStoreFits_(props, { [propertyKey]: serialized });
    props.setProperty(propertyKey, serialized);
    return next;
  });
}

function hideTelegramMailCardRecord_(card, destination, gmailState) {
  if (!card || !card.gmailMessageId) return null;
  return persistTelegramMailCardState_({
    gmailMessageId: card.gmailMessageId,
    chatId: card.chatId,
    userId: card.userId,
    connectionId: card.connectionId,
    gmailThreadId: card.gmailThreadId,
    expectedTelegramMessageId: card.telegramMessageId,
    telegramMessageId: 0,
    messageThreadId: 0,
    topic: String(destination || card.topic || 'archive'),
    state: 'hidden',
    gmailState: gmailState || card.gmailState || null,
    hiddenAt: Date.now(),
  });
}

function updateTelegramMailCardMarkupRecord_(gmailMessageId, replyMarkup, gmailState, connectionId, chatId) {
  const cards = readTelegramMailCards_({ gmailMessageId, connectionId, chatId });
  if (!cards.length) return null;
  const card = cards[0];
  return persistTelegramMailCardState_({
    gmailMessageId: card.gmailMessageId,
    chatId: card.chatId,
    userId: card.userId,
    connectionId: card.connectionId,
    expectedTelegramMessageId: card.telegramMessageId,
    replyMarkup: typeof replyMarkup === 'string' ? replyMarkup : JSON.stringify(replyMarkup || {}),
    gmailState: gmailState || card.gmailState || null,
  });
}

function telegramMailStateFromLabelIds_(labelIds) {
  const labels = new Set((labelIds || []).map(String));
  const known = new Set([
    'CHAT', 'DRAFT', 'IMPORTANT', 'INBOX', 'SENT', 'SPAM', 'STARRED', 'TRASH',
    'UNREAD', 'CATEGORY_FORUMS', 'CATEGORY_PERSONAL', 'CATEGORY_PROMOTIONS',
    'CATEGORY_SOCIAL', 'CATEGORY_UPDATES',
  ]);
  let folder = 'archive';
  if (labels.has('TRASH')) folder = 'trash';
  else if (labels.has('SPAM')) folder = 'spam';
  else if (labels.has('DRAFT')) folder = 'drafts';
  else if (labels.has('INBOX')) folder = 'inbox';
  else if (labels.has('SENT')) folder = 'sent';
  const userLabelIds = Array.from(labels)
    .filter(label => !known.has(label) && !/^CATEGORY_/i.test(label))
    .sort()
    .slice(0, 50);
  return {
    folder,
    unread: labels.has('UNREAD'),
    starred: labels.has('STARRED'),
    important: labels.has('IMPORTANT'),
    userLabelIds,
    userLabelCount: userLabelIds.length,
  };
}

function telegramMailStateFromGmail_(card) {
  const message = gmailApi_(
    '/messages/' + encodeURIComponent(String(card.gmailMessageId || '')) +
    '?format=metadata&metadataHeaders=Message-ID'
  );
  const state = telegramMailStateFromLabelIds_(message && message.labelIds || []);
  state.historyId = String(message && message.historyId || '');
  state.threadId = String(message && message.threadId || card.gmailThreadId || '');
  let botManagedSnooze = false;
  try {
    const snooze = typeof botSnoozeReadRecord_ === 'function'
      ? botSnoozeReadRecord_(state.threadId) : null;
    if (snooze && ['scheduled', 'processing', 'repair_required'].indexOf(String(snooze.state || '')) !== -1) {
      state.folder = 'snoozed';
      botManagedSnooze = true;
    }
  } catch (error) {
    // Gmail label state remains authoritative when the optional snooze ledger
    // is temporarily unavailable.
  }
  if (!botManagedSnooze && state.folder === 'archive' &&
      gmailMessageIsNativeSnoozed_(message, card)) {
    state.folder = 'snoozed';
  }
  return state;
}

function isRfc5322CfwsOnly_(value) {
  const text = String(value || '');
  let depth = 0;
  let escaped = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (depth > 0 && char === '\\') {
      escaped = true;
      continue;
    }
    if (char === '(') {
      depth += 1;
      continue;
    }
    if (char === ')') {
      if (!depth) return false;
      depth -= 1;
      continue;
    }
    if (depth > 0 || /[\t\r\n ]/.test(char)) continue;
    return false;
  }
  return depth === 0 && !escaped;
}

function normalizeRfc822MessageIdForQuery_(value) {
  const raw = String(value || '').trim();
  if (!raw || raw.length > 998 || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(raw)) return '';
  const open = raw.indexOf('<');
  const close = raw.lastIndexOf('>');
  let candidate = raw;
  if (open !== -1 || close !== -1) {
    if (open < 0 || close <= open || raw.indexOf('<', open + 1) !== -1 ||
        raw.slice(open + 1, close).indexOf('>') !== -1 ||
        !isRfc5322CfwsOnly_(raw.slice(0, open)) ||
        !isRfc5322CfwsOnly_(raw.slice(close + 1))) return '';
    // RFC 5322 permits comments/folding whitespace outside the angle brackets.
    // Only the bounded identifier itself enters the Gmail query.
    candidate = raw.slice(open + 1, close).trim();
  }
  if (candidate.length < 3 || candidate.length > 512 ||
      !/^[\x21-\x7E]+$/.test(candidate) || /[<>]/.test(candidate)) return '';
  const at = candidate.lastIndexOf('@');
  if (at <= 0 || at >= candidate.length - 1) return '';
  const left = candidate.slice(0, at);
  const right = candidate.slice(at + 1);
  const atom = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+";
  const dotAtom = new RegExp('^' + atom + '(?:\\.' + atom + ')*$');
  const quotedLeft = /^"(?:[\x21\x23-\x5B\x5D-\x7E]|\\[\x21-\x7E])*"$/;
  const domainLiteral = /^\[(?:[\x21-\x5A\x5E-\x7E]|\\[\x21-\x7E])*\]$/;
  if ((!dotAtom.test(left) && !quotedLeft.test(left)) ||
      (!dotAtom.test(right) && !domainLiteral.test(right))) return '';
  return candidate;
}

function gmailMessageIsNativeSnoozed_(message, card) {
  const headers = headersObject_(message && message.payload && message.payload.headers || []);
  const rfc822MessageId = normalizeRfc822MessageIdForQuery_(headers['message-id']);
  const gmailMessageId = String(message && message.id || card && card.gmailMessageId || '');
  if (!rfc822MessageId || !/^[a-zA-Z0-9_-]{5,100}$/.test(gmailMessageId)) return false;
  const query = encodeURIComponent('in:snoozed rfc822msgid:<' + rfc822MessageId + '>');
  const result = gmailApi_('/messages?maxResults=10&includeSpamTrash=true&q=' + query) || {};
  return (result.messages || []).some(item => String(item && item.id || '') === gmailMessageId);
}

function telegramMailReconciliationPropertyKey_(gmailId) {
  const safeId = String(gmailId || 'thread').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 28) || 'thread';
  const nonce = Date.now().toString(36) + '_' + Math.floor(Math.random() * 0xFFFFFFF).toString(36);
  return 'TELEGRAM_MAIL_RECONCILE_' + safeId + '_' + nonce;
}

function readTelegramMailReconciliation_(propertyKey) {
  try {
    return JSON.parse(
      PropertiesService.getScriptProperties().getProperty(propertyKey) || 'null'
    );
  } catch (error) {
    return null;
  }
}

function saveTelegramMailReconciliation_(request) {
  return withTelegramCardStateLock_(props => {
    const normalized = Object.assign({}, request, {
      version: TELEGRAM_CARD_STATE_VERSION,
      chatId: String(request.chatId || props.getProperty('CHAT_ID') || ''),
      updatedAt: Date.now(),
    });
    writeBoundedTelegramRecord_(
      props,
      'TELEGRAM_MAIL_RECONCILE_INDEX',
      normalized.propertyKey,
      normalized,
      stored => ['reserved', 'uncertain', 'pending', 'processing', 'failed'].indexOf(String(stored.state || '')) !== -1
    );
    return normalized;
  });
}

/**
 * The Mini App calls this only after Gmail succeeds. Persisting this small,
 * body-free bridge record before looking up or moving a Telegram card closes
 * the failure window between the Gmail RPC and the card-move ledger.
 */
function queueTelegramMailCardReconciliation_(request, destination, initialState) {
  const input = request || {};
  const gmailMessageId = String(input.gmailMessageId || '');
  const gmailThreadId = String(input.gmailThreadId || '');
  const connectionId = String(input.connectionId || '');
  const userId = String(input.userId || '');
  const requestedChatId = String(input.chatId || '');
  if (gmailMessageId && !/^[a-zA-Z0-9_-]{5,100}$/.test(gmailMessageId)) {
    throw new Error('Некоректний Gmail message ID для Telegram reconciliation.');
  }
  if (gmailThreadId && !/^[a-zA-Z0-9_-]{5,100}$/.test(gmailThreadId)) {
    throw new Error('Некоректний Gmail thread ID для Telegram reconciliation.');
  }
  if (!gmailMessageId && !gmailThreadId) {
    throw new Error('Gmail ID для Telegram reconciliation відсутній.');
  }
  if (connectionId && (!/^gmail-[A-Za-z0-9_-]{1,80}$/.test(connectionId) ||
      !/^\d{1,24}$/.test(userId) || !/^-?\d{1,24}$/.test(requestedChatId))) {
    throw new Error('Контекст Gmail/Telegram для reconciliation недійсний.');
  }
  return withTelegramCardStateLock_(props => {
    let propertyKey = '';
    for (let attempt = 0; attempt < 5 && !propertyKey; attempt += 1) {
      const candidate = telegramMailReconciliationPropertyKey_(gmailMessageId || gmailThreadId);
      if (!props.getProperty(candidate)) propertyKey = candidate;
    }
    if (!propertyKey) throw new Error('Не вдалося створити унікальний reconciliation ID.');
    const now = Date.now();
    const record = {
      version: TELEGRAM_CARD_STATE_VERSION,
      propertyKey,
      chatId: requestedChatId || String(props.getProperty('CHAT_ID') || ''),
      userId,
      connectionId,
      gmailMessageId,
      gmailThreadId,
      action: String(input.action || ''),
      destination: String(destination || ''),
      state: initialState === 'reserved' ? 'reserved' : 'pending',
      attempts: 0,
      nextRetryAt: 0,
      lastError: '',
      createdAt: now,
      updatedAt: now,
    };
    if (!record.chatId) throw new Error('CHAT_ID не налаштовано.');
    writeBoundedTelegramRecord_(
      props,
      'TELEGRAM_MAIL_RECONCILE_INDEX',
      propertyKey,
      record,
      stored => ['reserved', 'uncertain', 'pending', 'processing', 'failed'].indexOf(String(stored.state || '')) !== -1
    );
    return record;
  });
}

function claimTelegramMailReconciliation_(propertyKey) {
  return withTelegramCardStateLock_(props => {
    let record = null;
    try { record = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { record = null; }
    if (!record) return null;
    const currentChatId = String(props.getProperty('CHAT_ID') || '');
    const scoped = Boolean(String(record.connectionId || ''));
    const invalidScopedContext = scoped &&
      (!/^gmail-[A-Za-z0-9_-]{1,80}$/.test(String(record.connectionId || '')) ||
       !/^\d{1,24}$/.test(String(record.userId || '')) ||
       !/^-?\d{1,24}$/.test(String(record.chatId || '')));
    if (invalidScopedContext || (!scoped && String(record.chatId || '') !== currentChatId)) {
      record.state = 'done';
      record.outcome = 'chat_changed';
      record.lastError = '';
      record.updatedAt = Date.now();
      writeBoundedTelegramRecord_(
        props,
        'TELEGRAM_MAIL_RECONCILE_INDEX',
        propertyKey,
        record,
        stored => ['reserved', 'uncertain', 'pending', 'processing', 'failed'].indexOf(String(stored.state || '')) !== -1
      );
      return record;
    }
    if (record.state === 'done') return record;
    if (record.state === 'reserved' || record.state === 'uncertain') {
      record.busy = true;
      return record;
    }
    const now = Date.now();
    if (record.state === 'processing' &&
        now - Number(record.updatedAt || 0) < CONFIG.TELEGRAM_UPDATE_LEASE_MS) {
      record.busy = true;
      return record;
    }
    if (Number(record.nextRetryAt || 0) > now) {
      record.busy = true;
      return record;
    }
    record.state = 'processing';
    record.busy = false;
    record.attempts = Number(record.attempts || 0) + 1;
    record.updatedAt = now;
    props.setProperty(propertyKey, JSON.stringify(record));
    return record;
  });
}

function finishTelegramMailReconciliation_(record, outcome, details) {
  const completed = Object.assign({}, record, details || {}, {
    state: 'done',
    outcome: String(outcome || 'done'),
    nextRetryAt: 0,
    lastError: '',
  });
  delete completed.busy;
  return saveTelegramMailReconciliation_(completed);
}

function failTelegramMailReconciliation_(record, error) {
  const failed = Object.assign({}, record, {
    state: 'failed',
    nextRetryAt: Date.now() + telegramCardRetryDelay_(Number(record.attempts || 1)),
    lastError: String(error && error.message || error || '').slice(0, 180),
  });
  delete failed.busy;
  return saveTelegramMailReconciliation_(failed);
}

function removeTelegramMailCardRecord_(card) {
  return withTelegramCardStateLock_(props => {
    const propertyKey = telegramMailCardPropertyKey_(
      card && card.gmailMessageId,
      card && card.connectionId,
      card && card.chatId
    );
    let stored = null;
    try { stored = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { stored = null; }
    // Never remove a newer replacement card created by a concurrent delivery.
    if (!stored || Number(stored.telegramMessageId || 0) !== Number(card.telegramMessageId || 0)) {
      return false;
    }
    deleteScriptProperty_(props, propertyKey);
    props.setProperty(
      'TELEGRAM_MAIL_CARD_INDEX',
      JSON.stringify(telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX').filter(key => key !== propertyKey))
    );
    return true;
  });
}

/** Runs one Telegram-only Mini App reconciliation request. It never touches Gmail. */
function runTelegramMailCardReconciliation_(propertyKey) {
  let record = claimTelegramMailReconciliation_(propertyKey);
  if (!record) return { completed: false, warning: 'reconciliation record is unavailable' };
  if (record.busy) return { completed: false, pending: true, busy: true };
  if (record.state === 'done') {
    return { completed: true, reason: record.outcome || 'done', cardMoves: Number(record.cardMoves || 0) };
  }

  try {
    const cards = readTelegramMailCards_({
      chatId: record.chatId,
      connectionId: record.connectionId,
      gmailMessageId: record.gmailMessageId,
      gmailThreadId: record.gmailThreadId,
    });
    if (!cards.length) {
      finishTelegramMailReconciliation_(record, 'no_card', { cardMoves: 0 });
      return { completed: true, reason: 'no_card', cardMoves: 0 };
    }

    const ownerChatId = String(PropertiesService.getScriptProperties().getProperty('CHAT_ID') || '');
    const ownerTopicMode = String(record.chatId || '') === ownerChatId;
    const topics = ownerTopicMode ? telegramMailTopics_() : {};
    const destinationThreadId = ownerTopicMode ? Number(telegramTopicId_(record.destination) || 0) : 0;
    const hasAnyTopic = ownerTopicMode &&
      Object.keys(topics || {}).some(key => Number(topics[key] || 0) > 0);

    // Flat-chat mode mirrors native callbacks: a completed Gmail move removes
    // the old card instead of leaving a second, disorganized inbox. Deletion is
    // idempotent and the durable request retries any transport failure.
    if (!destinationThreadId && !hasAnyTopic) {
      const cardsOutsideDestination = cards.filter(card =>
        String(card.topic || '') !== String(record.destination || '')
      );
      if (!cardsOutsideDestination.length) {
        finishTelegramMailReconciliation_(record, 'already_current', { cardMoves: 0 });
        return { completed: true, reason: 'already_current', cardMoves: 0 };
      }
      cardsOutsideDestination.forEach(card => {
        try {
          telegramRequest_('deleteMessage', {
            chat_id: card.chatId,
            message_id: card.telegramMessageId,
          });
        } catch (deleteError) {
          if (!telegramDeleteAlreadyApplied_(deleteError)) throw deleteError;
        }
        hideTelegramMailCardRecord_(card, record.destination, card.gmailState || null);
      });
      finishTelegramMailReconciliation_(record, 'flat_hidden', { cardMoves: 0 });
      return { completed: true, reason: 'flat_hidden', cardMoves: 0 };
    }
    if (!destinationThreadId) {
      throw new Error('Telegram topic topology is incomplete for ' + record.destination + '.');
    }

    const moves = [];
    cards.forEach(card => {
      if (Number(card.messageThreadId || 0) === destinationThreadId &&
          String(card.topic || '') === String(record.destination)) return;
      let currentMarkup = {};
      try { currentMarkup = JSON.parse(card.replyMarkup || '{}'); }
      catch (error) { currentMarkup = {}; }
      const nextMarkup = buildRelocatedMailKeyboard_(
        currentMarkup,
        record.destination,
        card.gmailMessageId,
        card.connectionId
      );
      const move = queueTelegramCardMove_({
        message_id: card.telegramMessageId,
        message_thread_id: card.messageThreadId,
      }, record.destination, card.gmailMessageId, nextMarkup, card.connectionId);
      if (!move) throw new Error('Could not create Telegram card-move ledger record.');
      moves.push(move);
    });

    // Once every required card-move record exists, those ledgers own the retry.
    // Settling this bridge first cannot lose work even if the immediate copy or
    // delete call below fails.
    finishTelegramMailReconciliation_(record, moves.length ? 'queued' : 'already_current', {
      cardMoves: moves.length,
    });
    moves.forEach(move => {
      try { runTelegramCardMove_(move.propertyKey); }
      catch (error) { console.error('Immediate Telegram card move failed: ' + error); }
    });
    return {
      completed: true,
      reason: moves.length ? 'queued' : 'already_current',
      cardMoves: moves.length,
    };
  } catch (error) {
    try { record = failTelegramMailReconciliation_(record, error); }
    catch (saveError) { console.error('Could not persist failed Telegram reconciliation: ' + saveError); }
    return {
      completed: false,
      pending: true,
      warning: String(error && error.message || error || '').slice(0, 180),
    };
  }
}

function telegramCanonicalTopicFromGmail_(record) {
  if (record && record.connectionId) {
    return withMailboxConnectionContext_(
      String(record.userId || record.chatId || ''),
      String(record.connectionId),
      'viewer',
      () => telegramCanonicalTopicFromGmail_(Object.assign({}, record, { connectionId: '' }))
    );
  }
  const threadId = String(record && record.gmailThreadId || '');
  const messageId = String(record && record.gmailMessageId || '');
  let messages = [];
  if (threadId) {
    const thread = gmailApi_(
      '/threads/' + encodeURIComponent(threadId) + '?format=metadata'
    );
    messages = Array.isArray(thread && thread.messages) ? thread.messages : [];
  } else if (messageId) {
    messages = [gmailApi_(
      '/messages/' + encodeURIComponent(messageId) + '?format=metadata'
    )];
  }
  if (!messages.length) throw new Error('Gmail thread is unavailable for Telegram reconciliation.');
  const labels = new Set();
  messages.forEach(message => (message && message.labelIds || []).forEach(label => labels.add(String(label))));
  if (labels.has('TRASH')) return 'trash';
  if (labels.has('SPAM')) return 'spam';
  if (labels.has('INBOX')) return 'inbox';
  return 'archive';
}

function markTelegramMailCardActionUncertain_(reservation, error) {
  const propertyKey = String(reservation && reservation.propertyKey || reservation || '');
  if (!/^TELEGRAM_MAIL_RECONCILE_[a-zA-Z0-9_-]{10,120}$/.test(propertyKey)) return false;
  return withTelegramCardStateLock_(props => {
    let record = null;
    try { record = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (parseError) { record = null; }
    if (!record || record.state === 'done') return false;
    record.state = 'uncertain';
    record.uncertainChecks = Number(record.uncertainChecks || 0) + 1;
    record.nextRetryAt = Date.now() + telegramCardRetryDelay_(record.uncertainChecks);
    record.lastError = String(error && error.message || error || 'Gmail outcome is uncertain').slice(0, 180);
    record.updatedAt = Date.now();
    delete record.busy;
    writeBoundedTelegramRecord_(
      props,
      'TELEGRAM_MAIL_RECONCILE_INDEX',
      propertyKey,
      record,
      stored => ['reserved', 'uncertain', 'pending', 'processing', 'failed']
        .indexOf(String(stored.state || '')) !== -1
    );
    return true;
  });
}

/**
 * Resolves an interrupted prepare→Gmail→activate sequence using only a Gmail
 * GET. The worker never repeats the mailbox mutation: it observes Gmail's
 * current canonical folder, then makes Telegram match that authoritative state.
 */
function recoverReservedTelegramMailReconciliation_(propertyKey) {
  let record = readTelegramMailReconciliation_(propertyKey);
  if (!record || ['reserved', 'uncertain'].indexOf(String(record.state || '')) === -1) {
    return { completed: false, skipped: true };
  }
  const now = Date.now();
  if (record.state === 'reserved' &&
      now - Number(record.createdAt || record.updatedAt || 0) < CONFIG.TELEGRAM_UPDATE_LEASE_MS) {
    return { completed: false, pending: true, busy: true };
  }
  if (Number(record.nextRetryAt || 0) > now) {
    return { completed: false, pending: true, busy: true };
  }
  try {
    const destination = telegramCanonicalTopicFromGmail_(record);
    const promoted = withTelegramCardStateLock_(props => {
      let current = null;
      try { current = JSON.parse(props.getProperty(propertyKey) || 'null'); }
      catch (parseError) { current = null; }
      if (!current || ['reserved', 'uncertain'].indexOf(String(current.state || '')) === -1) {
        return false;
      }
      current.destination = destination;
      current.state = 'pending';
      current.nextRetryAt = 0;
      current.lastError = '';
      current.gmailObservedAt = Date.now();
      current.updatedAt = Date.now();
      delete current.busy;
      writeBoundedTelegramRecord_(
        props,
        'TELEGRAM_MAIL_RECONCILE_INDEX',
        propertyKey,
        current,
        stored => ['reserved', 'uncertain', 'pending', 'processing', 'failed']
          .indexOf(String(stored.state || '')) !== -1
      );
      return true;
    });
    if (!promoted) return { completed: false, skipped: true };
    return runTelegramMailCardReconciliation_(propertyKey);
  } catch (error) {
    try { markTelegramMailCardActionUncertain_(propertyKey, error); }
    catch (saveError) { console.error('Could not persist uncertain Gmail outcome: ' + saveError); }
    return {
      completed: false,
      pending: true,
      warning: String(error && error.message || error || '').slice(0, 180),
    };
  }
}

function retryPendingTelegramMailCardActions_(limit) {
  const props = PropertiesService.getScriptProperties();
  const keys = telegramCardIndex_(props, 'TELEGRAM_MAIL_RECONCILE_INDEX');
  const now = Date.now();
  const maximum = Math.max(0, Math.min(Number(limit) || 5, 10));
  let attempted = 0;
  let completed = 0;

  const interrupted = keys.filter(propertyKey => {
    const record = readTelegramMailReconciliation_(propertyKey);
    if (!record || ['reserved', 'uncertain'].indexOf(String(record.state || '')) === -1) return false;
    if (Number(record.nextRetryAt || 0) > now) return false;
    return record.state === 'uncertain' ||
      now - Number(record.createdAt || record.updatedAt || 0) >= CONFIG.TELEGRAM_UPDATE_LEASE_MS;
  }).slice(0, maximum);
  interrupted.forEach(propertyKey => {
    attempted += 1;
    const result = recoverReservedTelegramMailReconciliation_(propertyKey);
    if (result && result.completed) completed += 1;
  });

  const remaining = Math.max(0, maximum - attempted);
  const candidates = keys.filter(propertyKey => {
    const record = readTelegramMailReconciliation_(propertyKey);
    if (!record || record.state === 'done' || record.state === 'reserved' ||
        record.state === 'uncertain' || Number(record.nextRetryAt || 0) > now) return false;
    return record.state !== 'processing' ||
      now - Number(record.updatedAt || 0) >= CONFIG.TELEGRAM_UPDATE_LEASE_MS;
  }).slice(0, remaining);
  candidates.forEach(propertyKey => {
    attempted += 1;
    const result = runTelegramMailCardReconciliation_(propertyKey);
    if (result && result.completed) completed += 1;
  });
  return { attempted, completed };
}

function readTelegramCardMove_(propertyKey) {
  try {
    return JSON.parse(
      PropertiesService.getScriptProperties().getProperty(propertyKey) || 'null'
    );
  } catch (error) {
    return null;
  }
}

function telegramCardMoveAbandonmentAudit_(props) {
  let stored = null;
  try { stored = JSON.parse(props.getProperty(TELEGRAM_CARD_MOVE_ABANDONED_AUDIT) || 'null'); }
  catch (error) { stored = null; }
  const source = stored && typeof stored === 'object' ? stored : {};
  const recentKeys = [];
  const seen = new Set();
  (Array.isArray(source.recentKeys) ? source.recentKeys : []).forEach(value => {
    const key = String(value || '');
    if (/^TELEGRAM_CARD_MOVE_[0-9_-]{3,80}$/.test(key) && !seen.has(key) &&
        recentKeys.length < CONFIG.TELEGRAM_CARD_LEDGER_ACTIVE_HARD_LIMIT) {
      seen.add(key);
      recentKeys.push(key);
    }
  });
  return {
    version: 1,
    total: Math.max(0, Number(source.total || 0)),
    recentKeys,
    lastAt: Math.max(0, Number(source.lastAt || 0)),
    lastStage: ['copy_outcome_uncertain', 'copy_retry_exhausted', 'delete_retry_exhausted']
      .indexOf(String(source.lastStage || '')) !== -1 ? String(source.lastStage) : '',
    lastError: String(source.lastError || '').replace(/[\u0000-\u001F\u007F]/g, ' ').slice(0, 180),
  };
}

function telegramCardMoveAbandonmentStage_(move) {
  const explicit = String(move && move.abandonReason || '');
  if (['copy_outcome_uncertain', 'copy_retry_exhausted', 'delete_retry_exhausted']
    .indexOf(explicit) !== -1) return explicit;
  if (move && move.copyOutcomeUncertain) return 'copy_outcome_uncertain';
  return Number(move && move.destinationMessageId || 0) > 0
    ? 'delete_retry_exhausted' : 'copy_retry_exhausted';
}

/**
 * Persist a compact, idempotent audit before the terminal move record. If the
 * execution stops between those writes, recentKeys prevents the next recovery
 * pass from double-counting the same move.
 */
function recordTelegramCardMoveAbandonmentLocked_(props, move) {
  const propertyKey = String(move && move.propertyKey || '');
  if (String(move && move.state || '') !== 'abandoned' ||
      !/^TELEGRAM_CARD_MOVE_[0-9_-]{3,80}$/.test(propertyKey)) return null;
  const audit = telegramCardMoveAbandonmentAudit_(props);
  if (audit.recentKeys.indexOf(propertyKey) !== -1) return audit;
  audit.total += 1;
  audit.recentKeys.push(propertyKey);
  audit.recentKeys = audit.recentKeys.slice(-CONFIG.TELEGRAM_CARD_LEDGER_ACTIVE_HARD_LIMIT);
  audit.lastAt = Date.now();
  audit.lastStage = telegramCardMoveAbandonmentStage_(move);
  audit.lastError = String(move.lastError || 'Потрібна ручна перевірка переміщення картки.')
    .replace(/[\u0000-\u001F\u007F]/g, ' ').slice(0, 180);
  const serialized = JSON.stringify(audit);
  assertTelegramPropertyValueFits_(TELEGRAM_CARD_MOVE_ABANDONED_AUDIT, serialized);
  assertTelegramPropertyStoreFits_(props, {
    [TELEGRAM_CARD_MOVE_ABANDONED_AUDIT]: serialized,
  });
  props.setProperty(TELEGRAM_CARD_MOVE_ABANDONED_AUDIT, serialized);
  return audit;
}

function telegramCardMoveAbandonmentStatus_(props) {
  const audit = telegramCardMoveAbandonmentAudit_(props);
  let current = 0;
  // A saturated active ledger may compact a newly-terminal move out of the
  // primary index while retaining its exact abandoned tombstone. The audit's
  // recentKeys is the durable secondary index for those manual-recovery rows;
  // scan both indexes so status never reports zero while such a row exists.
  const keys = Array.from(new Set(
    telegramCardIndex_(props, 'TELEGRAM_CARD_MOVE_INDEX').concat(audit.recentKeys)
  ));
  keys.forEach(propertyKey => {
    let move = null;
    try { move = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { move = null; }
    if (move && String(move.state || '') === 'abandoned') current += 1;
  });
  return {
    current,
    total: Math.max(current, audit.total),
    lastAt: audit.lastAt,
    lastStage: audit.lastStage,
    lastError: audit.lastError,
  };
}

function saveTelegramCardMove_(move) {
  return withTelegramCardStateLock_(props => {
    const normalized = Object.assign({}, move, {
      version: TELEGRAM_CARD_STATE_VERSION,
      chatId: String(move.chatId || props.getProperty('CHAT_ID') || ''),
      updatedAt: Date.now(),
    });
    let previous = null;
    try { previous = JSON.parse(props.getProperty(normalized.propertyKey) || 'null'); }
    catch (error) { previous = null; }
    if (normalized.state === 'abandoned' && (!previous || previous.state !== 'abandoned')) {
      recordTelegramCardMoveAbandonmentLocked_(props, normalized);
    }
    writeBoundedTelegramRecord_(
      props,
      'TELEGRAM_CARD_MOVE_INDEX',
      normalized.propertyKey,
      normalized,
      stored => ['done', 'abandoned'].indexOf(String(stored.state || '')) === -1
    );
    return normalized;
  });
}

function queueTelegramCardMove_(message, destination, gmailMessageId, replyMarkup, connectionId) {
  const props = PropertiesService.getScriptProperties();
  const chatId = telegramCallbackChatId_(message);
  const destinationThreadId = telegramTopicId_(destination);
  if (!message || !message.message_id || !destinationThreadId) return null;
  const propertyKey = telegramCardMovePropertyKey_(
    chatId,
    message.message_id,
    destinationThreadId
  );
  const existing = readTelegramCardMove_(propertyKey);
  if (existing && String(existing.chatId) === String(chatId)) return existing;
  return saveTelegramCardMove_({
    propertyKey,
    chatId: String(chatId),
    connectionId: String(connectionId || ''),
    gmailMessageId: String(gmailMessageId || ''),
    sourceMessageId: Number(message.message_id),
    sourceThreadId: Number(message.message_thread_id || 0),
    destination: String(destination),
    destinationThreadId: Number(destinationThreadId),
    destinationMessageId: 0,
    replyMarkup: typeof replyMarkup === 'string' ? replyMarkup : JSON.stringify(replyMarkup || {}),
    state: 'copy_pending',
    copyAttempts: 0,
    deleteAttempts: 0,
    nextRetryAt: 0,
    lastError: '',
    createdAt: Date.now(),
  });
}

function claimTelegramCardMove_(propertyKey) {
  return withTelegramCardStateLock_(props => {
    let move = null;
    try { move = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { move = null; }
    if (!move || !/^-?\d{1,24}$/.test(String(move.chatId || ''))) return null;
    if (move.state === 'done' || move.state === 'abandoned') return move;
    const now = Date.now();
    if ((move.state === 'copying' || move.state === 'deleting') &&
        now - Number(move.updatedAt || 0) < CONFIG.TELEGRAM_UPDATE_LEASE_MS) {
      move.busy = true;
      return move;
    }
    if (move.state === 'copying' && !Number(move.destinationMessageId || 0)) {
      // The runtime may have stopped after copyMessage created its destination
      // but before the returned ID was committed. Re-copying after the lease
      // would knowingly risk a duplicate, so preserve the source and surface a
      // terminal, auditable at-most-once result.
      move.state = 'abandoned';
      move.copyOutcomeUncertain = true;
      move.abandonReason = 'copy_outcome_uncertain';
      move.nextRetryAt = 0;
      move.lastError = 'Сеанс зупинився на межі Telegram copyMessage; джерело збережено, автоматичного повтору немає.';
      move.busy = false;
      move.updatedAt = now;
      const serialized = JSON.stringify(move);
      assertTelegramPropertyValueFits_(propertyKey, serialized);
      recordTelegramCardMoveAbandonmentLocked_(props, move);
      assertTelegramPropertyStoreFits_(props, { [propertyKey]: serialized });
      props.setProperty(propertyKey, serialized);
      return move;
    }
    if (Number(move.nextRetryAt || 0) > now) {
      move.busy = true;
      return move;
    }
    move.state = Number(move.destinationMessageId || 0) > 0 ? 'deleting' : 'copying';
    move.busy = false;
    move.updatedAt = now;
    props.setProperty(propertyKey, JSON.stringify(move));
    return move;
  });
}

function telegramCardRetryDelay_(attempt) {
  return Math.min(30 * 60 * 1000, Math.pow(2, Math.max(0, Number(attempt) - 1)) * 60 * 1000);
}

function updateTelegramMailCardAfterMove_(move) {
  const cards = readTelegramMailCards_({
    gmailMessageId: move.gmailMessageId,
    connectionId: move.connectionId,
    chatId: move.chatId,
  });
  if (!cards.length || !move.destinationMessageId) return;
  const current = cards[0];
  saveTelegramMailCard_(Object.assign({}, current, {
    telegramMessageId: move.destinationMessageId,
    messageThreadId: move.destinationThreadId,
    topic: move.destination,
    replyMarkup: move.replyMarkup,
  }));
}

/** Runs Telegram-only reconciliation. It never mutates Gmail. */
function runTelegramCardMove_(propertyKey) {
  let move = claimTelegramCardMove_(propertyKey);
  if (!move) return { moved: false, warning: 'запис переміщення втрачено' };
  if (move.busy) return { moved: Boolean(move.destinationMessageId), busy: true };
  if (move.state === 'done') return { moved: true, sourceDeleted: true };
  if (move.state === 'abandoned') {
    return { moved: Boolean(move.destinationMessageId), sourceDeleted: false, warning: move.lastError || 'потрібна ручна перевірка' };
  }

  if (!Number(move.destinationMessageId || 0)) {
    move.copyAttempts = Number(move.copyAttempts || 0) + 1;
    try {
      const copied = telegramRequest_('copyMessage', {
        chat_id: move.chatId,
        from_chat_id: move.chatId,
        message_id: move.sourceMessageId,
        message_thread_id: move.destinationThreadId,
        disable_notification: true,
        reply_markup: move.replyMarkup,
      });
      if (!copied || !copied.message_id) throw new Error('Telegram did not return copied message_id.');
      move.destinationMessageId = Number(copied.message_id);
      move.state = 'delete_pending';
      move.lastError = '';
      move.nextRetryAt = 0;
      // Critical ordering: persist the copy ID before the first delete. Any
      // later retry sees destinationMessageId and can only retry deletion.
      move = saveTelegramCardMove_(move);
      updateTelegramMailCardAfterMove_(move);
    } catch (copyError) {
      move.lastError = String(copyError && copyError.message || copyError).slice(0, 180);
      if (copyError && copyError.telegramOutcomeUncertain) {
        // Telegram Bot API has no idempotency key for copyMessage. Retrying an
        // unknown transport outcome could create duplicate cards, so keep the
        // authoritative source card and require an explicit visual check.
        move.state = 'abandoned';
        move.copyOutcomeUncertain = true;
        move.abandonReason = 'copy_outcome_uncertain';
        move.nextRetryAt = 0;
        move.lastError = 'Telegram не підтвердив копіювання; джерельну картку збережено, автоматичного повтору немає.';
        saveTelegramCardMove_(move);
        return {
          moved: false,
          sourceDeleted: false,
          warning: 'Telegram не підтвердив копіювання; джерельну картку залишено, автоматичного повтору не буде',
        };
      }
      const copyExhausted = move.copyAttempts >= CONFIG.TELEGRAM_CARD_MOVE_MAX_ATTEMPTS;
      move.state = copyExhausted ? 'abandoned' : 'copy_pending';
      move.nextRetryAt = copyExhausted
        ? 0 : Date.now() + telegramCardRetryDelay_(move.copyAttempts);
      if (copyExhausted) {
        move.abandonReason = 'copy_retry_exhausted';
        move.lastError = 'Автоматичні спроби копіювання вичерпано; джерельну картку збережено, потрібна ручна перевірка.';
      }
      saveTelegramCardMove_(move);
      return {
        moved: false,
        sourceDeleted: false,
        warning: copyExhausted
          ? 'автоматичні спроби перенесення вичерпано; джерельну картку збережено, потрібна ручна перевірка'
          : 'картку буде перенесено під час повторної синхронізації',
      };
    }
  }

  move.state = 'deleting';
  move.deleteAttempts = Number(move.deleteAttempts || 0) + 1;
  move = saveTelegramCardMove_(move);
  try {
    telegramRequest_('deleteMessage', {
      chat_id: move.chatId,
      message_id: move.sourceMessageId,
    });
    move.state = 'done';
    move.lastError = '';
    move.nextRetryAt = 0;
    saveTelegramCardMove_(move);
    return { moved: true, sourceDeleted: true, destinationMessageId: move.destinationMessageId };
  } catch (deleteError) {
    if (telegramDeleteAlreadyApplied_(deleteError)) {
      move.state = 'done';
      move.lastError = '';
      move.nextRetryAt = 0;
      saveTelegramCardMove_(move);
      return { moved: true, sourceDeleted: true, destinationMessageId: move.destinationMessageId };
    }
    move.lastError = String(deleteError && deleteError.message || deleteError).slice(0, 180);
    const deleteExhausted = move.deleteAttempts >= CONFIG.TELEGRAM_CARD_MOVE_MAX_ATTEMPTS;
    move.state = deleteExhausted ? 'abandoned' : 'delete_pending';
    move.nextRetryAt = deleteExhausted
      ? 0 : Date.now() + telegramCardRetryDelay_(move.deleteAttempts);
    if (deleteExhausted) {
      move.abandonReason = 'delete_retry_exhausted';
      move.lastError = 'Копію створено, але автоматичні спроби прибрати стару картку вичерпано; потрібна ручна перевірка.';
    }
    saveTelegramCardMove_(move);
    return {
      moved: true,
      sourceDeleted: false,
      destinationMessageId: move.destinationMessageId,
      warning: deleteExhausted
        ? 'копію створено, але стару картку не прибрано; автоматичні спроби вичерпано, потрібна ручна перевірка'
        : 'копію перенесено, стару картку бот спробує прибрати повторно',
    };
  }
}

function reconcileTelegramMailCards_(limit) {
  const props = PropertiesService.getScriptProperties();
  const keys = telegramCardIndex_(props, 'TELEGRAM_CARD_MOVE_INDEX');
  let attempted = 0;
  let completed = 0;
  keys.forEach(propertyKey => {
    if (attempted >= Math.max(0, Math.min(Number(limit) || 5, 10))) return;
    const move = readTelegramCardMove_(propertyKey);
    if (!move || move.state === 'done' || move.state === 'abandoned' ||
        Number(move.nextRetryAt || 0) > Date.now()) return;
    attempted += 1;
    const result = runTelegramCardMove_(propertyKey);
    if (result && result.sourceDeleted) completed += 1;
  });
  return { attempted, completed };
}

function telegramMailDestinationForAction_(action) {
  return {
    archive: 'archive', trash: 'trash', spam: 'spam', inbox: 'inbox',
    untrash: 'inbox', notSpam: 'inbox',
  }[String(action || '')] || '';
}

/** Reserve durable Telegram capacity before MailClient mutates Gmail. */
function prepareTelegramMailCardAction_(request) {
  const input = request || {};
  const destination = telegramMailDestinationForAction_(input.action);
  if (!destination) return { required: false, reason: 'non_moving_action' };
  const cards = readTelegramMailCards_({
    chatId: input.chatId,
    connectionId: input.connectionId,
    gmailMessageId: String(input.gmailMessageId || ''),
    gmailThreadId: String(input.gmailThreadId || ''),
  });
  if (!cards.length) return { required: false, reason: 'no_card' };
  const durable = queueTelegramMailCardReconciliation_(input, destination, 'reserved');
  return {
    required: true,
    propertyKey: durable.propertyKey,
    action: durable.action,
    gmailMessageId: durable.gmailMessageId,
    gmailThreadId: durable.gmailThreadId,
  };
}

function activateTelegramMailCardAction_(reservation) {
  const input = reservation || {};
  const propertyKey = String(input.propertyKey || '');
  if (!/^TELEGRAM_MAIL_RECONCILE_[a-zA-Z0-9_-]{10,120}$/.test(propertyKey)) {
    throw new Error('Некоректна Telegram reconciliation reservation.');
  }
  withTelegramCardStateLock_(props => {
    let record = null;
    try { record = JSON.parse(props.getProperty(propertyKey) || 'null'); }
    catch (error) { record = null; }
    if (!record || String(record.chatId || '') !== String(props.getProperty('CHAT_ID') || '') ||
        String(record.action || '') !== String(input.action || '') ||
        String(record.gmailMessageId || '') !== String(input.gmailMessageId || '') ||
        String(record.gmailThreadId || '') !== String(input.gmailThreadId || '')) {
      throw new Error('Telegram reconciliation reservation не відповідає Gmail-дії.');
    }
    if (record.state === 'done') return;
    if (record.state !== 'reserved' && record.state !== 'uncertain' &&
        record.state !== 'pending' && record.state !== 'failed') {
      throw new Error('Telegram reconciliation reservation уже виконується.');
    }
    record.state = 'pending';
    record.nextRetryAt = 0;
    record.lastError = '';
    record.updatedAt = Date.now();
    const serialized = JSON.stringify(record);
    assertTelegramPropertyValueFits_(propertyKey, serialized);
    assertTelegramPropertyStoreFits_(props, { [propertyKey]: serialized });
    props.setProperty(propertyKey, serialized);
  });
  const result = runTelegramMailCardReconciliation_(propertyKey);
  return {
    queued: 1,
    cardMoves: Number(result && result.cardMoves || 0),
    pending: Boolean(result && result.pending),
    reason: String(result && result.reason || ''),
  };
}

function cancelTelegramMailCardAction_(reservation) {
  const propertyKey = String(reservation && reservation.propertyKey || '');
  if (!/^TELEGRAM_MAIL_RECONCILE_[a-zA-Z0-9_-]{10,120}$/.test(propertyKey)) return false;
  const record = readTelegramMailReconciliation_(propertyKey);
  if (!record || record.state === 'done') return false;
  finishTelegramMailReconciliation_(record, 'gmail_failed', { cardMoves: 0 });
  return true;
}

/**
 * Legacy post-Gmail hook retained for older clients. Current MailClient uses
 * prepare/activate/cancel so capacity is reserved before Gmail mutates.
 */
function reconcileTelegramMailCardAction_(request) {
  const input = request || {};
  const destination = telegramMailDestinationForAction_(input.action);
  if (!destination) return { queued: 0, reason: 'non_moving_action' };
  // Gmail has already succeeded in MailClient.gs. The bridge record is written
  // first, so every later lookup/Telegram failure remains timer-retryable and
  // can never cause Gmail to run twice.
  const durable = queueTelegramMailCardReconciliation_(input, destination);
  let result;
  try {
    result = runTelegramMailCardReconciliation_(durable.propertyKey);
  } catch (error) {
    // A processing lease makes even an unexpected runtime error retryable.
    result = { completed: false, pending: true, warning: String(error && error.message || error).slice(0, 180) };
  }
  return {
    // "queued" means the durable reconciliation request was accepted. The
    // exact number of underlying card moves is exposed separately.
    queued: 1,
    cardMoves: Number(result && result.cardMoves || 0),
    pending: Boolean(result && result.pending),
    reason: String(result && result.reason || ''),
  };
}

function finalizeMailboxCallback_(message, callbackData, action, gmailMessageId, connectionId) {
  const destination = {
    archive: 'archive',
    trash: 'trash',
    spam: 'spam',
    inbox: 'inbox',
    untrash: 'inbox',
    notSpam: 'inbox',
  }[String(action || '')];
  if (!destination) {
    updateMailboxToggle_(message, callbackData, action, gmailMessageId, connectionId);
    return { moved: false, updated: true };
  }

  const callbackChatId = telegramCallbackChatId_(message);
  const ownerChatId = String(PropertiesService.getScriptProperties().getProperty('CHAT_ID') || '');
  const destinationThread = String(callbackChatId) === ownerChatId ? telegramTopicId_(destination) : 0;
  if (!message || !message.message_id) {
    markMailboxCallbackDone_(message, callbackData, action);
    return {
      moved: false,
      warning: 'картка лишилась у поточному розділі',
    };
  }

  // Before private-chat topics are enabled there is nowhere honest to copy a
  // card. Keep Gmail as the durable archive and remove the completed card from
  // the flat bot chat so it does not become a second, disorganized inbox.
  if (!destinationThread) {
    try {
      telegramRequest_('deleteMessage', {
        chat_id: telegramCallbackChatId_(message),
        message_id: message.message_id,
      });
      const cards = readTelegramMailCards_({ gmailMessageId, connectionId, chatId: telegramCallbackChatId_(message) });
      if (cards.length) hideTelegramMailCardRecord_(cards[0], destination, cards[0].gmailState || null);
      return { moved: false, sourceDeleted: true, hidden: true };
    } catch (deleteError) {
      if (telegramDeleteAlreadyApplied_(deleteError)) {
        const cards = readTelegramMailCards_({ gmailMessageId, connectionId, chatId: telegramCallbackChatId_(message) });
        if (cards.length) hideTelegramMailCardRecord_(cards[0], destination, cards[0].gmailState || null);
        return { moved: false, sourceDeleted: true, hidden: true };
      }
      console.error('Could not hide completed flat-chat mail card: ' + deleteError);
      markMailboxCallbackDone_(message, callbackData, action);
      return {
        moved: false,
        retryNeeded: true,
        warning: 'дію в Gmail виконано, але Telegram-картку ще не вдалося приховати',
      };
    }
  }

  const replyMarkup = buildRelocatedMailKeyboard_(
    message.reply_markup,
    destination,
    gmailMessageId,
    connectionId
  );
  let move;
  try {
    move = queueTelegramCardMove_(message, destination, gmailMessageId, replyMarkup, connectionId);
    if (!move) throw new Error('Could not queue Telegram card move.');
    const result = runTelegramCardMove_(move.propertyKey);
    if (!result.sourceDeleted) markMailboxCallbackDone_(message, callbackData, action);
    return result;
  } catch (moveError) {
    console.error('Could not queue/reconcile Telegram mail card: ' + moveError);
    markMailboxCallbackDone_(message, callbackData, action);
    return {
      moved: false,
      retryNeeded: true,
      warning: 'дію в Gmail виконано, але картку не вдалося додати до журналу',
    };
  }
}

function telegramDeleteAlreadyApplied_(error) {
  const text = String(error && error.message || error || '').toLowerCase();
  return text.includes('message to delete not found') ||
    text.includes('message_id_invalid') ||
    text.includes('message identifier is not specified');
}

function updateMailboxToggle_(message, callbackData, action, gmailMessageId, connectionId) {
  const inverse = {
    read: 'unread',
    unread: 'read',
    star: 'unstar',
    unstar: 'star',
    important: 'notImportant',
    notImportant: 'important',
  }[String(action || '')];
  if (!inverse || !message || !message.message_id || !message.reply_markup) {
    markMailboxCallbackDone_(message, callbackData, action);
    return;
  }
  const labels = {
    read: '📩 Непрочитано',
    unread: '✅ Прочитано',
    star: '⭐ Зняти зірочку',
    unstar: '☆ Позначити',
    important: '❕ Не важливе',
    notImportant: '❗ Важливе',
  };
  const rows = (message.reply_markup.inline_keyboard || []).map(row => row.map(button => {
    if (String(button.callback_data || '') !== String(callbackData || '')) return button;
    return {
      text: labels[action] || mailboxActionDoneLabel_(action),
      callback_data: mailboxCallbackData_(inverse, gmailMessageId, connectionId),
    };
  }));
  const nextMarkup = { inline_keyboard: rows };
  telegramRequest_('editMessageReplyMarkup', {
    chat_id: telegramCallbackChatId_(message),
    message_id: message.message_id,
    reply_markup: JSON.stringify(nextMarkup),
  });
  try {
    updateTelegramMailCardMarkupRecord_(
      gmailMessageId, nextMarkup, null, connectionId, telegramCallbackChatId_(message)
    );
  }
  catch (error) { console.error('Could not persist Telegram toggle markup: ' + error); }
}

/**
 * Callback updates may expose chat IDs as JSON numbers. Apps Script can
 * re-encode large numbers inconsistently in form payloads, so every Bot API
 * mutation uses the owner ID stored losslessly as a Script Property string.
 */
function telegramCallbackChatId_(message) {
  try {
    const configured = String(
      PropertiesService.getScriptProperties().getProperty('CHAT_ID') || ''
    ).trim();
    if (configured) return configured;
  } catch (error) {
    // Unit tests and local previews may not provide PropertiesService.
  }
  const observed = message && message.chat && message.chat.id;
  if (observed === undefined || observed === null || observed === '') {
    throw new Error('Telegram chat ID is unavailable.');
  }
  return observed;
}

function buildRelocatedMailKeyboard_(currentMarkup, destination, gmailMessageId, connectionId) {
  const keptRows = ((currentMarkup || {}).inline_keyboard || []).map(row =>
    (row || []).filter(button => {
      const parsed = parseMailboxCallback_(String(button && button.callback_data || ''));
      return !parsed || ['read', 'unread', 'star', 'unstar', 'important', 'notImportant']
        .indexOf(parsed.action) !== -1;
    })
  ).filter(row => row.length);

  if (destination === 'archive') {
    keptRows.push([
      { text: '↩️ До Вхідних', callback_data: mailboxCallbackData_('inbox', gmailMessageId, connectionId) },
      { text: '🗑 До кошика', callback_data: mailboxCallbackData_('trash', gmailMessageId, connectionId) },
    ]);
  } else if (destination === 'trash') {
    keptRows.push([{
      text: '↩️ Відновити',
      callback_data: mailboxCallbackData_('untrash', gmailMessageId, connectionId),
    }]);
  } else if (destination === 'spam') {
    keptRows.push([
      { text: '↩️ Не спам', callback_data: mailboxCallbackData_('notSpam', gmailMessageId, connectionId) },
      { text: '🗑 До кошика', callback_data: mailboxCallbackData_('trash', gmailMessageId, connectionId) },
    ]);
  } else {
    keptRows.push([
      { text: '🗄 Архів', callback_data: mailboxCallbackData_('archive', gmailMessageId, connectionId) },
      { text: '🗑 До кошика', callback_data: mailboxCallbackData_('trash', gmailMessageId, connectionId) },
    ]);
    keptRows.push([{
      text: '🚫 Спам',
      callback_data: mailboxCallbackData_('spam', gmailMessageId, connectionId),
    }]);
  }
  return { inline_keyboard: keptRows };
}

function telegramManagedMailAction_(button) {
  const parsed = parseMailboxCallback_(String(button && button.callback_data || ''));
  if (parsed && parsed.action !== 'unsubscribe') return true;
  return String(button && button.callback_data || '') === BOT_UI.NOOP_ACTION &&
    /^(?:✅|⭐|☆|❗|❕)/.test(String(button && button.text || ''));
}

function buildSynchronizedMailKeyboard_(currentMarkup, state, gmailMessageId, connectionId) {
  let markup = currentMarkup || {};
  if (typeof markup === 'string') {
    try { markup = JSON.parse(markup || '{}'); }
    catch (error) { markup = {}; }
  }
  const labelCount = Math.max(0, Number(state && state.userLabelCount || 0));
  const keptRows = ((markup || {}).inline_keyboard || []).map(row =>
    (row || []).filter(button => !telegramManagedMailAction_(button)).map(button => {
      const url = String(button && button.web_app && button.web_app.url || '');
      if (/[#&]panel=labels(?:&|$)/.test(url)) {
        return Object.assign({}, button, {
          text: '🏷 Мітки' + (labelCount ? ' (' + labelCount + ')' : ''),
        });
      }
      return button;
    })
  ).filter(row => row.length);

  keptRows.push([
    {
      text: state && state.starred ? '⭐ Зняти зірочку' : '☆ Позначити',
      callback_data: mailboxCallbackData_(state && state.starred ? 'unstar' : 'star', gmailMessageId, connectionId),
    },
    {
      text: state && state.unread ? '✅ Прочитано' : '📩 Непрочитано',
      callback_data: mailboxCallbackData_(state && state.unread ? 'read' : 'unread', gmailMessageId, connectionId),
    },
  ]);
  keptRows.push([{
    text: state && state.important ? '❕ Зняти важливість' : '❗ Позначити важливим',
    callback_data: mailboxCallbackData_(state && state.important ? 'notImportant' : 'important', gmailMessageId, connectionId),
  }]);

  const folder = String(state && state.folder || 'inbox');
  if (folder === 'trash') {
    keptRows.push([{
      text: '↩️ Відновити',
      callback_data: mailboxCallbackData_('untrash', gmailMessageId, connectionId),
    }]);
  } else if (folder === 'spam') {
    keptRows.push([
      { text: '↩️ Не спам', callback_data: mailboxCallbackData_('notSpam', gmailMessageId, connectionId) },
      { text: '🗑 До кошика', callback_data: mailboxCallbackData_('trash', gmailMessageId, connectionId) },
    ]);
  } else if (folder === 'archive' || folder === 'sent' || folder === 'drafts' || folder === 'snoozed') {
    keptRows.push([
      { text: '↩️ До Вхідних', callback_data: mailboxCallbackData_('inbox', gmailMessageId, connectionId) },
      { text: '🗑 До кошика', callback_data: mailboxCallbackData_('trash', gmailMessageId, connectionId) },
    ]);
  } else {
    keptRows.push([
      { text: '🗄 Архівувати', callback_data: mailboxCallbackData_('archive', gmailMessageId, connectionId) },
      { text: '🗑 Видалити', callback_data: mailboxCallbackData_('trash', gmailMessageId, connectionId) },
    ]);
    keptRows.push([{
      text: '🚫 Спам',
      callback_data: mailboxCallbackData_('spam', gmailMessageId, connectionId),
    }]);
  }
  return { inline_keyboard: keptRows };
}

function telegramEditAlreadyApplied_(error) {
  const text = String(error && error.message || error || '').toLowerCase();
  return text.includes('message is not modified') || text.includes('message_not_modified');
}

function telegramEditTargetMissing_(error) {
  const text = String(error && error.message || error || '').toLowerCase();
  return text.includes('message to edit not found') ||
    text.includes('message_id_invalid') || text.includes('message identifier is not specified');
}

function telegramHasAnyMailTopic_() {
  const topics = telegramMailTopics_() || {};
  return Object.keys(topics).some(key => Number(topics[key] || 0) > 0);
}

function syncTelegramMailCardFromGmail_(card, contextReady) {
  if (card && card.connectionId && !contextReady) {
    return withMailboxConnectionContext_(
      String(card.userId || card.chatId || ''),
      String(card.connectionId),
      'viewer',
      () => syncTelegramMailCardFromGmail_(card, true)
    );
  }
  let state;
  try {
    state = telegramMailStateFromGmail_(card);
  } catch (error) {
    if (Number(error && error.gmailHttpStatus || 0) === 404) {
      if (String(card.state || 'active') === 'active' && card.telegramMessageId) {
        try {
          telegramRequest_('deleteMessage', {
            chat_id: card.chatId,
            message_id: card.telegramMessageId,
          });
        } catch (deleteError) {
          if (!telegramDeleteAlreadyApplied_(deleteError)) throw deleteError;
        }
      }
      removeTelegramMailCardRecord_(card);
      return { deleted: true };
    }
    throw error;
  }

  const destination = String(state.folder || 'archive');
  if (String(card.state || 'active') === 'hidden') {
    if (destination === 'inbox') {
      const full = getGmailMessage_(card.gmailMessageId);
      const visibleAccount = card.connectionId && mailboxCurrentSessionContext_
        ? mailboxMultiVisibleAccounts_(mailboxCurrentSessionContext_)
          .find(item => item.id === card.connectionId)
        : null;
      notifyMessage_(full, {
        silent: true,
        restored: true,
        chatId: String(card.chatId || ''),
        userId: String(card.userId || card.chatId || ''),
        account: visibleAccount || null,
      });
      return { restored: true, destination };
    }
    persistTelegramMailCardState_({
      gmailMessageId: card.gmailMessageId,
      chatId: card.chatId,
      userId: card.userId,
      connectionId: card.connectionId,
      state: 'hidden',
      topic: destination,
      gmailState: state,
    });
    return { hidden: true, destination };
  }

  const nextMarkup = buildSynchronizedMailKeyboard_(
    card.replyMarkup, state, card.gmailMessageId, card.connectionId
  );
  const nextMarkupJson = JSON.stringify(nextMarkup);
  if (destination !== String(card.topic || 'inbox')) {
    const ownerChatId = String(PropertiesService.getScriptProperties().getProperty('CHAT_ID') || '');
    const destinationThreadId = String(card.chatId || '') === ownerChatId
      ? Number(telegramTopicId_(destination) || 0)
      : 0;
    if (!destinationThreadId &&
        (String(card.chatId || '') !== ownerChatId || !telegramHasAnyMailTopic_())) {
      try {
        telegramRequest_('deleteMessage', {
          chat_id: card.chatId,
          message_id: card.telegramMessageId,
        });
      } catch (deleteError) {
        if (!telegramDeleteAlreadyApplied_(deleteError)) throw deleteError;
      }
      hideTelegramMailCardRecord_(card, destination, state);
      return { hidden: true, destination };
    }
    if (!destinationThreadId) throw new Error('Telegram topic topology is incomplete for ' + destination + '.');
    const move = queueTelegramCardMove_({
      chat: { id: card.chatId },
      message_id: card.telegramMessageId,
      message_thread_id: card.messageThreadId,
    }, destination, card.gmailMessageId, nextMarkup, card.connectionId);
    const moved = runTelegramCardMove_(move.propertyKey);
    const current = readTelegramMailCards_({
      gmailMessageId: card.gmailMessageId,
      connectionId: card.connectionId,
      chatId: card.chatId,
    })[0];
    if (current) persistTelegramMailCardState_({
      gmailMessageId: current.gmailMessageId,
      chatId: current.chatId,
      userId: current.userId,
      connectionId: current.connectionId,
      expectedTelegramMessageId: current.telegramMessageId,
      replyMarkup: nextMarkupJson,
      gmailState: state,
    });
    return Object.assign({ destination }, moved || {});
  }

  if (String(card.replyMarkup || '') === nextMarkupJson &&
      JSON.stringify(card.gmailState || null) === JSON.stringify(state)) {
    return { unchanged: true, destination };
  }

  try {
    telegramRequest_('editMessageReplyMarkup', {
      chat_id: card.chatId,
      message_id: card.telegramMessageId,
      reply_markup: nextMarkupJson,
    });
  } catch (editError) {
    if (!telegramEditAlreadyApplied_(editError)) {
      if (telegramEditTargetMissing_(editError)) {
        hideTelegramMailCardRecord_(card, destination, state);
        return { hidden: true, missing: true, destination };
      }
      throw editError;
    }
  }
  persistTelegramMailCardState_({
    gmailMessageId: card.gmailMessageId,
    chatId: card.chatId,
    userId: card.userId,
    connectionId: card.connectionId,
    expectedTelegramMessageId: card.telegramMessageId,
    replyMarkup: nextMarkupJson,
    gmailState: state,
  });
  return { updated: true, destination };
}

/** Immediate best-effort convergence after a confirmed Mini App flag/label action. */
function syncTelegramMailCardsForThreadFromGmail_(threadIdValue, messageIdValue, scopeValue) {
  const threadId = String(threadIdValue || '');
  const messageId = String(messageIdValue || '');
  const scope = scopeValue || {};
  const cards = messageId
    ? [readTelegramMailCardSyncRecordById_(messageId, null, scope.connectionId, scope.chatId)].filter(Boolean)
    : readTelegramMailCardSyncRecords_().filter(card =>
        String(card.gmailThreadId || '') === threadId &&
        (!scope.connectionId || String(card.connectionId || '') === String(scope.connectionId)) &&
        (!scope.chatId || String(card.chatId || '') === String(scope.chatId))
      );
  let attempted = 0;
  let completed = 0;
  let failed = 0;
  cards.slice(0, 20).forEach(card => {
    attempted += 1;
    try {
      syncTelegramMailCardFromGmail_(card);
      completed += 1;
    } catch (error) {
      failed += 1;
      console.error('Immediate Telegram mail-card synchronization failed: ' + error);
    }
  });
  return { attempted, completed, failed };
}

function syncTelegramMailCardsFromGmail_(limit) {
  const props = PropertiesService.getScriptProperties();
  const keys = telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX');
  if (!keys.length) return { attempted: 0, updated: 0, failed: 0 };
  const maximum = Math.max(0, Math.min(Number(limit) || 5, 20));
  const cursor = Math.max(0, Number(props.getProperty('TELEGRAM_MAIL_SYNC_CURSOR_V1') || 0)) % keys.length;
  let attempted = 0;
  let updated = 0;
  let failed = 0;
  for (let offset = 0; offset < Math.min(maximum, keys.length); offset += 1) {
    const card = readTelegramMailCardSyncRecordByKey_(keys[(cursor + offset) % keys.length], props);
    attempted += 1;
    if (!card) continue;
    try {
      syncTelegramMailCardFromGmail_(card);
      updated += 1;
    } catch (error) {
      failed += 1;
      console.error('Could not synchronize Telegram mail card: ' + error);
    }
  }
  props.setProperty('TELEGRAM_MAIL_SYNC_CURSOR_V1', String((cursor + attempted) % keys.length));
  return { attempted, updated, failed };
}

function syncTelegramMailCardsFromGmailFallbackIfDue_(limit) {
  const props = PropertiesService.getScriptProperties();
  const now = Date.now();
  const lastAt = Math.max(0, Number(props.getProperty('TELEGRAM_MAIL_FALLBACK_SYNC_AT_V1') || 0));
  if (now - lastAt < CONFIG.TELEGRAM_MAIL_FALLBACK_SYNC_INTERVAL_MS) {
    return { deferred: true, attempted: 0, nextAt: lastAt + CONFIG.TELEGRAM_MAIL_FALLBACK_SYNC_INTERVAL_MS };
  }
  // Claim the sparse window before network reads; overlapping timer executions
  // then converge on one sweep. Gmail History remains the per-minute primary.
  props.setProperty('TELEGRAM_MAIL_FALLBACK_SYNC_AT_V1', String(now));
  return syncTelegramMailCardsFromGmail_(limit);
}

function gmailTelegramHistoryState_(value) {
  const input = value && typeof value === 'object' ? value : {};
  const pendingMessageIds = [];
  const pendingSeen = new Set();
  (Array.isArray(input.pendingMessageIds) ? input.pendingMessageIds : []).forEach(value => {
    const id = String(value || '');
    if (/^[a-zA-Z0-9_-]{5,64}$/.test(id) && !pendingSeen.has(id) &&
        pendingMessageIds.length < CONFIG.TELEGRAM_MAIL_CARD_HARD_LIMIT) {
      pendingSeen.add(id);
      pendingMessageIds.push(id);
    }
  });
  return {
    version: 1,
    historyId: /^\d{1,64}$/.test(String(input.historyId || '')) ? String(input.historyId) : '',
    pageToken: /^[A-Za-z0-9_-]{1,512}$/.test(String(input.pageToken || ''))
      ? String(input.pageToken) : '',
    nextPageToken: /^[A-Za-z0-9_-]{1,512}$/.test(String(input.nextPageToken || ''))
      ? String(input.nextPageToken) : '',
    pageLoaded: input.pageLoaded === true,
    pendingMessageIds,
    targetHistoryId: /^\d{1,64}$/.test(String(input.targetHistoryId || ''))
      ? String(input.targetHistoryId) : '',
    attempts: Math.max(0, Math.min(Number(input.attempts) || 0, 20)),
    retryAt: Math.max(0, Number(input.retryAt) || 0),
    leaseToken: /^[A-Za-z0-9_-]{12,128}$/.test(String(input.leaseToken || ''))
      ? String(input.leaseToken) : '',
    leaseUntil: Math.max(0, Number(input.leaseUntil) || 0),
    updatedAt: Math.max(0, Number(input.updatedAt) || 0),
  };
}

function gmailTelegramHistoryScope_(scopeValue) {
  const scope = scopeValue || {};
  const connectionId = String(scope.connectionId || '');
  const chatId = String(scope.chatId || '');
  const userId = String(scope.userId || chatId || '');
  if (!connectionId) {
    return { propertyKey: 'GMAIL_TG_HISTORY_STATE_V1', connectionId: '', chatId: '', userId: '' };
  }
  if (!/^gmail-[A-Za-z0-9_-]{1,80}$/.test(connectionId) ||
      !/^-?\d{1,24}$/.test(chatId) || !/^\d{1,24}$/.test(userId)) {
    throw new Error('Контекст Gmail History недійсний.');
  }
  return {
    propertyKey: 'GMAIL_TG_HISTORY_STATE_V2_' +
      chatId.replace(/[^0-9-]/g, '').slice(-24) + '_' + connectionId,
    connectionId,
    chatId,
    userId,
  };
}

function gmailTelegramHistoryWriteLocked_(props, stateValue, scopeValue) {
  const scope = gmailTelegramHistoryScope_(scopeValue);
  const state = gmailTelegramHistoryState_(stateValue);
  state.updatedAt = Date.now();
  const serialized = JSON.stringify(state);
  assertTelegramPropertyValueFits_(scope.propertyKey, serialized);
  assertTelegramPropertyStoreFits_(props, { [scope.propertyKey]: serialized });
  props.setProperty(scope.propertyKey, serialized);
  return state;
}

function claimGmailTelegramHistoryState_(scopeValue) {
  const scope = gmailTelegramHistoryScope_(scopeValue);
  return withTelegramCardStateLock_(props => {
    let state = null;
    try { state = JSON.parse(props.getProperty(scope.propertyKey) || 'null'); }
    catch (error) { state = null; }
    state = gmailTelegramHistoryState_(state);
    if (state.leaseToken && state.leaseUntil > Date.now()) return { busy: true };
    state.leaseToken = Date.now().toString(36) + '_' +
      Math.floor(Math.random() * 0x7FFFFFFF).toString(36);
    state.leaseUntil = Date.now() + CONFIG.TELEGRAM_UPDATE_LEASE_MS;
    return { busy: false, state: gmailTelegramHistoryWriteLocked_(props, state, scope) };
  });
}

function persistGmailTelegramHistoryState_(stateValue, scopeValue) {
  const scope = gmailTelegramHistoryScope_(scopeValue);
  const input = gmailTelegramHistoryState_(stateValue);
  return withTelegramCardStateLock_(props => {
    let stored = null;
    try { stored = gmailTelegramHistoryState_(JSON.parse(props.getProperty(scope.propertyKey) || '{}')); }
    catch (error) { stored = gmailTelegramHistoryState_({}); }
    if (!input.leaseToken || input.leaseToken !== stored.leaseToken) {
      throw new Error('Gmail History synchronization lease was superseded.');
    }
    input.leaseUntil = Date.now() + CONFIG.TELEGRAM_UPDATE_LEASE_MS;
    return gmailTelegramHistoryWriteLocked_(props, input, scope);
  });
}

function releaseGmailTelegramHistoryState_(stateValue, scopeValue) {
  const scope = gmailTelegramHistoryScope_(scopeValue);
  const input = gmailTelegramHistoryState_(stateValue);
  if (!input.leaseToken) return;
  try {
    withTelegramCardStateLock_(props => {
      let stored = null;
      try { stored = gmailTelegramHistoryState_(JSON.parse(props.getProperty(scope.propertyKey) || '{}')); }
      catch (error) { stored = gmailTelegramHistoryState_({}); }
      if (stored.leaseToken !== input.leaseToken) return;
      stored.leaseToken = '';
      stored.leaseUntil = 0;
      gmailTelegramHistoryWriteLocked_(props, stored, scope);
    });
  } catch (error) {
    console.error('Could not release Gmail History lease: ' + error);
  }
}

function gmailHistoryChangedMessageIds_(historyRows) {
  const ids = [];
  const seen = new Set();
  const add = message => {
    const id = String(message && message.id || '');
    if (/^[a-zA-Z0-9_-]{5,64}$/.test(id) && !seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
  };
  (historyRows || []).forEach(row => {
    (row && row.messages || []).forEach(add);
    ['messagesAdded', 'messagesDeleted', 'labelsAdded', 'labelsRemoved'].forEach(name => {
      (row && row[name] || []).forEach(item => add(item && item.message));
    });
  });
  return ids;
}

function gmailCurrentHistoryId_() {
  const profile = gmailApi_('/profile');
  const historyId = String(profile && profile.historyId || '');
  if (!/^\d{1,64}$/.test(historyId)) {
    throw new Error('Gmail не повернув коректний History ID.');
  }
  return historyId;
}

function syncTelegramMailCardsFromGmailHistory_(limit, scopeValue) {
  const scope = gmailTelegramHistoryScope_(scopeValue);
  const claim = claimGmailTelegramHistoryState_(scope);
  if (claim.busy) return { busy: true, attempted: 0 };
  let state = claim.state;
  const maximum = Math.max(1, Math.min(Number(limit) || 10, CONFIG.TELEGRAM_MAIL_CARD_HARD_LIMIT));
  try {
    if (state.retryAt > Date.now()) return { deferred: true, attempted: 0 };
    if (!state.historyId) {
      state.historyId = gmailCurrentHistoryId_();
      state.pageToken = '';
      state.nextPageToken = '';
      state.pageLoaded = false;
      state.pendingMessageIds = [];
      state.targetHistoryId = '';
      state.attempts = 0;
      state.retryAt = 0;
      state = persistGmailTelegramHistoryState_(state, scope);
      return { baseline: true, historyId: state.historyId, attempted: 0 };
    }

    let attempted = 0;
    let pages = 0;
    while (true) {
      if (!state.pageLoaded) {
        if (pages >= CONFIG.GMAIL_HISTORY_SYNC_PAGE_LIMIT) {
          return { pending: true, attempted };
        }
        let path = '/history?startHistoryId=' + encodeURIComponent(state.historyId) + '&maxResults=500';
        if (state.pageToken) path += '&pageToken=' + encodeURIComponent(state.pageToken);
        let response;
        try {
          response = gmailApi_(path);
        } catch (error) {
          if (Number(error && error.gmailHttpStatus || 0) === 404) {
            state.historyId = gmailCurrentHistoryId_();
            state.pageToken = '';
            state.nextPageToken = '';
            state.pageLoaded = false;
            state.pendingMessageIds = [];
            state.targetHistoryId = '';
            state.attempts = 0;
            state.retryAt = 0;
            state = persistGmailTelegramHistoryState_(state, scope);
            return { reset: true, historyId: state.historyId, attempted };
          }
          throw error;
        }

        const changedIds = gmailHistoryChangedMessageIds_(response && response.history || []);
        if (changedIds.length) {
          const props = PropertiesService.getScriptProperties();
          const registeredKeys = new Set(telegramCardIndex_(props, 'TELEGRAM_MAIL_CARD_INDEX'));
          state.pendingMessageIds = changedIds.filter(messageId =>
            registeredKeys.has(telegramMailCardPropertyKey_(messageId, scope.connectionId, scope.chatId))
          ).slice(0, CONFIG.TELEGRAM_MAIL_CARD_HARD_LIMIT);
        } else {
          state.pendingMessageIds = [];
        }
        state.targetHistoryId = String(response && response.historyId || state.targetHistoryId || state.historyId);
        const nextPageToken = String(response && response.nextPageToken || '');
        if (nextPageToken && !/^[A-Za-z0-9_-]{1,512}$/.test(nextPageToken)) {
          throw new Error('Gmail повернув некоректний токен сторінки History.');
        }
        state.nextPageToken = nextPageToken;
        state.pageLoaded = true;
        state.attempts = 0;
        state.retryAt = 0;
        state = persistGmailTelegramHistoryState_(state, scope);
        pages += 1;
      }

      if (state.pendingMessageIds.length) {
        const budget = Math.max(0, maximum - attempted);
        if (!budget) {
          return { pending: true, attempted, remaining: state.pendingMessageIds.length };
        }
        const batchIds = state.pendingMessageIds.slice(0, budget);
        let completed = 0;
        for (const messageId of batchIds) {
          const card = readTelegramMailCardSyncRecordById_(
            messageId, null, scope.connectionId, scope.chatId
          );
          if (card) syncTelegramMailCardFromGmail_(card);
          attempted += 1;
          completed += 1;
        }
        state.pendingMessageIds = state.pendingMessageIds.slice(completed);
        state = persistGmailTelegramHistoryState_(state, scope);
        if (state.pendingMessageIds.length) {
          return { pending: true, attempted, remaining: state.pendingMessageIds.length };
        }
      }

      // The loaded page is now fully consumed. Advancing is independent of the
      // live registry order, so a card being moved/deleted cannot skip another
      // changed message when the next trigger resumes.
      if (state.nextPageToken) {
        state.pageToken = state.nextPageToken;
        state.nextPageToken = '';
        state.pageLoaded = false;
        state = persistGmailTelegramHistoryState_(state, scope);
        if (attempted >= maximum || pages >= CONFIG.GMAIL_HISTORY_SYNC_PAGE_LIMIT) {
          return { pending: true, attempted };
        }
        continue;
      }

      if (/^\d{1,64}$/.test(state.targetHistoryId)) state.historyId = state.targetHistoryId;
      state.pageToken = '';
      state.nextPageToken = '';
      state.pageLoaded = false;
      state.pendingMessageIds = [];
      state.targetHistoryId = '';
      state.attempts = 0;
      state.retryAt = 0;
      state = persistGmailTelegramHistoryState_(state, scope);
      return { completed: true, attempted, historyId: state.historyId };
    }
  } catch (error) {
    state.attempts = Math.min(20, Number(state.attempts || 0) + 1);
    state.retryAt = Date.now() + Math.min(
      30 * 60 * 1000,
      Math.pow(2, Math.max(0, state.attempts - 1)) * 60 * 1000
    );
    try { state = persistGmailTelegramHistoryState_(state, scope); }
    catch (saveError) { console.error('Could not persist Gmail History retry: ' + saveError); }
    throw error;
  } finally {
    releaseGmailTelegramHistoryState_(state, scope);
  }
}

/** Synchronize the legacy owner plus every isolated Gmail/chat card group. */
function syncTelegramMailCardsFromAllGmailHistory_(limit) {
  const maximum = Math.max(1, Math.min(Number(limit) || 10, CONFIG.TELEGRAM_MAIL_CARD_HARD_LIMIT));
  const result = { groups: 0, attempted: 0, failed: 0 };
  try {
    const legacy = syncTelegramMailCardsFromGmailHistory_(maximum) || {};
    result.groups += 1;
    result.attempted += Number(legacy.attempted || 0);
  } catch (error) {
    result.failed += 1;
    console.error('Legacy Gmail History synchronization failed: ' + error);
  }
  const groups = new Map();
  readTelegramMailCardSyncRecords_().forEach(card => {
    const connectionId = String(card && card.connectionId || '');
    const chatId = String(card && card.chatId || '');
    const userId = String(card && card.userId || chatId || '');
    if (!connectionId) return;
    const key = chatId + ':' + connectionId;
    if (!groups.has(key)) groups.set(key, { connectionId, chatId, userId });
  });
  for (const scope of groups.values()) {
    try {
      const current = withMailboxConnectionContext_(
        scope.userId, scope.connectionId, 'viewer',
        () => syncTelegramMailCardsFromGmailHistory_(maximum, scope)
      ) || {};
      result.groups += 1;
      result.attempted += Number(current.attempted || 0);
    } catch (error) {
      result.failed += 1;
      console.error('Scoped Gmail History synchronization failed: ' + error);
    }
  }
  return result;
}

function telegramMailTopics_() {
  const props = PropertiesService.getScriptProperties();
  return loadTelegramTopicState_(props).topics;
}

function telegramTopicId_(name) {
  const value = Number(telegramMailTopics_()[String(name || '')] || 0);
  return value > 0 ? value : null;
}

function telegramTopicRoles_() {
  const roles = {};
  Object.keys(TELEGRAM_MAIL_TOPICS).forEach(key => {
    roles[key] = TELEGRAM_MAIL_TOPICS[key].role === 'index' ? 'index' : 'canonical';
  });
  return roles;
}

function normalizeTelegramIdMap_(value) {
  const normalized = {};
  const source = value && typeof value === 'object' ? value : {};
  Object.keys(TELEGRAM_MAIL_TOPICS).forEach(key => {
    const id = Number(source[key] || 0);
    if (id > 0 && Math.floor(id) === id) normalized[key] = id;
  });
  return normalized;
}

function loadTelegramTopicState_(props) {
  const chatId = String(props.getProperty('CHAT_ID') || '').trim();
  let saved = null;
  try { saved = JSON.parse(props.getProperty('TELEGRAM_MAIL_TOPIC_STATE') || 'null'); }
  catch (error) { saved = null; }

  if (saved && Number(saved.version) === TELEGRAM_TOPIC_STATE_VERSION &&
      String(saved.chatId || '') === chatId) {
    return {
      version: TELEGRAM_TOPIC_STATE_VERSION,
      topologyVersion: TELEGRAM_TOPIC_TOPOLOGY_VERSION,
      chatId,
      roles: telegramTopicRoles_(),
      topics: normalizeTelegramIdMap_(saved.topics),
      headers: normalizeTelegramIdMap_(saved.headers),
      updatedAt: Number(saved.updatedAt || 0),
    };
  }

  // One-time migration from the pre-versioned maps. After this write, a CHAT_ID
  // change can never reuse topic/message IDs belonging to the previous chat.
  const legacyBinding = String(props.getProperty('TELEGRAM_MAIL_TOPICS_CHAT_ID') || '');
  let legacyTopics = {};
  let legacyHeaders = {};
  if (!legacyBinding || legacyBinding === chatId) {
    try { legacyTopics = JSON.parse(props.getProperty('TELEGRAM_MAIL_TOPICS') || '{}'); }
    catch (error) { legacyTopics = {}; }
    try { legacyHeaders = JSON.parse(props.getProperty('TELEGRAM_TOPIC_HEADERS') || '{}'); }
    catch (error) { legacyHeaders = {}; }
  }
  return {
    version: TELEGRAM_TOPIC_STATE_VERSION,
    topologyVersion: TELEGRAM_TOPIC_TOPOLOGY_VERSION,
    chatId,
    roles: telegramTopicRoles_(),
    topics: normalizeTelegramIdMap_(legacyTopics),
    headers: normalizeTelegramIdMap_(legacyHeaders),
    updatedAt: 0,
  };
}

function persistTelegramTopicState_(props, state) {
  state.version = TELEGRAM_TOPIC_STATE_VERSION;
  state.topologyVersion = TELEGRAM_TOPIC_TOPOLOGY_VERSION;
  state.chatId = String(props.getProperty('CHAT_ID') || '').trim();
  state.roles = telegramTopicRoles_();
  state.topics = normalizeTelegramIdMap_(state.topics);
  state.headers = normalizeTelegramIdMap_(state.headers);
  state.updatedAt = Date.now();
  props.setProperty('TELEGRAM_MAIL_TOPIC_STATE', JSON.stringify(state));
  props.setProperty('TELEGRAM_MAIL_TOPICS_CHAT_ID', state.chatId);
  // Maintain the legacy maps for a safe rollback to the previous deployment.
  props.setProperty('TELEGRAM_MAIL_TOPICS', JSON.stringify(state.topics));
  props.setProperty('TELEGRAM_TOPIC_HEADERS', JSON.stringify(state.headers));
  return state;
}

function telegramTopicStateReadiness_(state) {
  const missingTopics = [];
  const missingHeaders = [];
  Object.keys(TELEGRAM_MAIL_TOPICS).forEach(key => {
    if (!(Number((state.topics || {})[key]) > 0)) missingTopics.push(key);
    if (!(Number((state.headers || {})[key]) > 0)) missingHeaders.push(key);
  });
  return {
    ready: !missingTopics.length && !missingHeaders.length,
    missingTopics,
    missingHeaders,
  };
}

/** Isolate long Telegram topic setup from the webhook ScriptLock journal. */
function telegramTopicSetupLock_() {
  return LockService.getUserLock();
}

function ensureTelegramMailTopics_() {
  const props = PropertiesService.getScriptProperties();
  const lock = telegramTopicSetupLock_();
  if (!lock.tryLock(10000)) {
    props.setProperty('TELEGRAM_TOPICS_STATUS', 'setup_busy');
    return loadTelegramTopicState_(props).topics;
  }
  try {
    const state = loadTelegramTopicState_(props);
    const chatId = requireSetting_(props, 'CHAT_ID');
    persistTelegramTopicState_(props, state);
    const me = telegramRequest_('getMe', {});
    if (!me || !me.has_topics_enabled) {
      props.setProperty('TELEGRAM_TOPICS_STATUS', 'threaded_mode_required');
      return state.topics;
    }
    Object.keys(TELEGRAM_MAIL_TOPICS).forEach(key => {
      if (Number(state.topics[key]) > 0) return;
      const spec = TELEGRAM_MAIL_TOPICS[key];
      const topic = telegramRequest_('createForumTopic', {
        chat_id: chatId,
        name: spec.name,
        icon_color: spec.color,
      });
      if (topic && topic.message_thread_id) {
        state.topics[key] = topic.message_thread_id;
        // Persist each topic immediately. If Telegram fails halfway through the
        // list, the next migration resumes instead of creating duplicates.
        persistTelegramTopicState_(props, state);
      }
    });
    state.headers = ensureTelegramTopicHeaders_(state.topics, state);
    persistTelegramTopicState_(props, state);
    const readiness = telegramTopicStateReadiness_(state);
    props.setProperty(
      'TELEGRAM_TOPICS_STATUS',
      readiness.ready
        ? 'ready'
        : 'incomplete:topics=' + readiness.missingTopics.join(',') +
          ';headers=' + readiness.missingHeaders.join(',')
    );
  } catch (error) {
    props.setProperty('TELEGRAM_TOPICS_STATUS', 'error:' + String(error && error.message || error).slice(0, 180));
    console.error('Could not create Telegram mail topics: ' + error);
  } finally {
    lock.releaseLock();
  }
  return loadTelegramTopicState_(props).topics;
}

function ensureTelegramTopicHeaders_(topics, topicState) {
  const props = PropertiesService.getScriptProperties();
  const state = topicState || loadTelegramTopicState_(props);
  const headers = normalizeTelegramIdMap_(state.headers);
  Object.keys(TELEGRAM_MAIL_TOPICS).forEach(key => {
    const threadId = Number((topics || {})[key] || 0);
    if (!threadId || Number(headers[key]) > 0) return;
    try {
      const spec = TELEGRAM_MAIL_TOPICS[key];
      const folderKey = String(spec.folder || '');
      const isIndex = spec.role === 'index';
      const response = telegramRequest_('sendMessage', {
        chat_id: requireSetting_(props, 'CHAT_ID'),
        message_thread_id: threadId,
        text: '<b>' + escapeHtml_(spec.name) + '</b>\n\n' +
          (isIndex
            ? 'Індексний розділ: картки листів не дублюються. Актуальний вміст відкривається у поштовому клієнті.'
            : 'Канонічний розділ для карток Gmail. Відкрийте його, щоб переглянути актуальні гілки.'),
        parse_mode: 'HTML',
        disable_notification: true,
        reply_markup: JSON.stringify({
          inline_keyboard: [[{
            text: folderKey ? '📬 Відкрити розділ' : '📬 Відкрити пошту',
            web_app: { url: mailboxFolderUrl_(folderKey) },
          }]],
        }),
      });
      if (response && response.message_id) {
        headers[key] = response.message_id;
        state.headers = headers;
        persistTelegramTopicState_(props, state);
      }
    } catch (error) {
      console.error('Could not create Telegram topic header for ' + key + ': ' + error);
    }
  });
  return headers;
}

function sendCallbackActionError_(query, error) {
  const mailbox = parseMailboxCallback_(String((query || {}).data || ''));
  const actionName = mailbox ? mailboxActionDisplayName_(mailbox.action) : 'виконати команду';
  const detail = String(error && error.message ? error.message : 'Невідома помилка.');
  const replyTo = query && query.message && query.message.message_id;
  const threadId = query && query.message && query.message.message_thread_id;
  sendTelegramText_(
    '⚠️ <b>Не вдалося ' + escapeHtml_(actionName) + '</b>\n\n' + escapeHtml_(detail),
    null,
    { replyTo, threadId, silent: true }
  );
}

function replyKeyboard_() {
  return JSON.stringify({
    keyboard: [
      [{ text: BOT_UI.CHECK_TEXT }],
      [{ text: BOT_UI.BROWSE_TEXT }],
      [{ text: BOT_UI.FOCUS_TEXT }],
      [
        { text: BOT_UI.STATUS_TEXT },
        { text: BOT_UI.MENU_TEXT },
      ],
      [{ text: BOT_UI.FOLDERS_TEXT }],
    ],
    is_persistent: true,
    resize_keyboard: true,
    input_field_placeholder: 'Керування Gmail',
  });
}

function systemTopicOptions_(options) {
  const value = Object.assign({}, options || {});
  const threadId = telegramTopicId_('system');
  if (threadId) value.threadId = threadId;
  return value;
}

const TELEGRAM_MAIL_BROWSE_STATE_PREFIX = 'TELEGRAM_MAIL_BROWSE_V1_';
const TELEGRAM_MAIL_BROWSE_STATE_INDEX = 'TELEGRAM_MAIL_BROWSE_INDEX_V1';

function telegramMailBrowseInputError_(message) {
  const error = new Error(String(message || 'Некоректний фільтр пошти.'));
  error.telegramMailBrowseInput = true;
  return error;
}

function telegramMailBrowseCallbackData_(token, revisionValue, action, argument) {
  const session = String(token || '');
  const revisionNumber = Number(revisionValue);
  const revision = Number.isInteger(revisionNumber) && revisionNumber > 0 && revisionNumber <= 2176782335
    ? revisionNumber.toString(36) : '';
  const code = String(action || '');
  const suffix = argument === undefined || argument === null || argument === ''
    ? '' : '.' + String(argument);
  if (!/^[a-f0-9]{16}$/.test(session) || !/^[0-9a-z]{1,6}$/.test(revision) || !/^[a-z]$/.test(code) ||
      (suffix && !/^\.[A-Za-z0-9_-]{1,20}$/.test(suffix))) {
    throw new Error('Некоректна Telegram-команда списку пошти.');
  }
  const value = BOT_UI.BROWSE_PREFIX + session + '.' + revision + '.' + code + suffix;
  if (utf8ByteLength_(value) > 64) {
    throw new Error('Telegram callback_data списку перевищує 64 байти.');
  }
  return value;
}

function parseTelegramMailBrowseCallback_(value) {
  const escaped = BOT_UI.BROWSE_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = String(value || '').match(
    new RegExp('^' + escaped + '([a-f0-9]{16})\\.([0-9a-z]{1,6})\\.([a-z])(?:\\.([A-Za-z0-9_-]{1,20}))?$')
  );
  if (!match) return null;
  const revision = parseInt(match[2], 36);
  if (!Number.isInteger(revision) || revision <= 0 || revision > 2176782335) return null;
  return { token: match[1], revision, action: match[3], argument: match[4] || '' };
}

function telegramMailBrowseDefaultFilters_() {
  return {
    period: 'all',
    folder: 'inbox',
    sender: '',
    subject: '',
    text: '',
    labelId: '',
    labelName: '',
  };
}

function telegramMailBrowseSafePhrase_(value, maxLength) {
  const text = String(value || '').trim();
  return Boolean(
    text && text.length <= Number(maxLength || 120) &&
    !/[\u0000-\u001F\u007F"\\{}]/.test(text)
  );
}

function parseTelegramMailBrowseCommand_(commandText) {
  const raw = String(commandText || '').trim();
  let source = '';
  if (raw === BOT_UI.BROWSE_TEXT || !raw) {
    source = '';
  } else {
    const command = raw.match(/^\/mail(?:@\w+)?(?:\s+([\s\S]*))?$/i);
    if (!command || raw.length > 500 || /[\u0000-\u001F\u007F]/.test(raw)) {
      throw telegramMailBrowseInputError_('Команда має починатися з /mail і містити лише безпечні фільтри.');
    }
    source = String(command[1] || '').trim();
  }

  const result = {
    pageSize: 10,
    filters: telegramMailBrowseDefaultFilters_(),
    requestedLabel: '',
  };
  if (!source) return result;

  const seen = Object.create(null);
  const pattern = /([A-Za-z]+):(?:"([^"]*)"|(\S+))/g;
  let cursor = 0;
  let match;
  while ((match = pattern.exec(source))) {
    if (source.slice(cursor, match.index).trim()) {
      throw telegramMailBrowseInputError_('Між фільтрами потрібні пробіли; фрази використовуйте в лапках.');
    }
    cursor = pattern.lastIndex;
    let key = String(match[1] || '').toLowerCase();
    const value = String(match[2] !== undefined ? match[2] : match[3] || '').trim();
    if (key === 'sender') key = 'from';
    if (seen[key]) throw telegramMailBrowseInputError_('Фільтр ' + key + ' вказано двічі.');
    seen[key] = true;

    if (key === 'size') {
      const pageSize = Number(value);
      if (TELEGRAM_MAIL_BROWSE_PAGE_SIZES.indexOf(pageSize) === -1) {
        throw telegramMailBrowseInputError_('Розмір: 10, 20, 30, 40, 50, 60, 70, 90 або 100.');
      }
      result.pageSize = pageSize;
    } else if (key === 'period') {
      if (!Object.prototype.hasOwnProperty.call(TELEGRAM_MAIL_BROWSE_PERIODS, value)) {
        throw telegramMailBrowseInputError_('Період: 1d, 2d, 7d, 30d, 90d або all.');
      }
      result.filters.period = value;
    } else if (key === 'folder') {
      if (seen.category) throw telegramMailBrowseInputError_('Оберіть folder або category, а не обидва.');
      const folder = value.toLowerCase();
      if (!Object.prototype.hasOwnProperty.call(TELEGRAM_MAIL_BROWSE_FOLDERS, folder)) {
        throw telegramMailBrowseInputError_('Невідома папка Gmail.');
      }
      result.filters.folder = folder;
    } else if (key === 'category') {
      if (seen.folder) throw telegramMailBrowseInputError_('Оберіть folder або category, а не обидва.');
      const category = value.toLowerCase();
      if (['primary', 'social', 'promotions', 'updates', 'forums'].indexOf(category) === -1) {
        throw telegramMailBrowseInputError_('Категорія: primary, social, promotions, updates або forums.');
      }
      result.filters.folder = category;
    } else if (key === 'from') {
      const sender = value.replace(/^@/, '');
      const email = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,190}$/.test(sender);
      const domain = /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/.test(sender);
      if (!email && !domain) {
        throw telegramMailBrowseInputError_('Відправник має бути email-адресою або доменом.');
      }
      result.filters.sender = sender;
    } else if (key === 'subject' || key === 'text') {
      if (!telegramMailBrowseSafePhrase_(value, 120)) {
        throw telegramMailBrowseInputError_('Фраза ' + key + ' має містити 1–120 безпечних символів.');
      }
      result.filters[key] = value;
    } else if (key === 'label') {
      if (!value || value.length > 120 || /[\u0000-\u001F\u007F]/.test(value)) {
        throw telegramMailBrowseInputError_('Назва мітки має містити 1–120 символів.');
      }
      result.requestedLabel = value;
    } else {
      throw telegramMailBrowseInputError_('Невідомий фільтр: ' + key + '.');
    }
  }
  if (source.slice(cursor).trim()) {
    throw telegramMailBrowseInputError_('Не вдалося розібрати фільтри. Фрази беріть у подвійні лапки.');
  }
  return result;
}

function telegramMailBrowseUserLabels_() {
  const data = gmailApi_('/labels');
  return (data.labels || []).filter(label =>
    label && String(label.type || '').toLowerCase() === 'user' &&
    /^[A-Za-z0-9][A-Za-z0-9._:@-]{0,179}$/.test(String(label.id || '')) &&
    String(label.name || '').trim()
  ).map(label => ({
    id: String(label.id),
    name: cleanHeader_(label.name).replace(/[\u0000-\u001F\u007F]/g, ' ').slice(0, 120),
  })).sort((left, right) => left.name.localeCompare(right.name));
}

function telegramMailBrowseLabelFingerprint_(labelId) {
  const text = String(labelId || '');
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return ('00000000' + (hash >>> 0).toString(16)).slice(-8);
}

function telegramMailBrowseLabelSelection_(argument, labelsValue) {
  const match = String(argument || '').match(/^([0-9a-z]{1,3})_([a-f0-9]{8})$/);
  if (!match) return null;
  const labels = Array.isArray(labelsValue) ? labelsValue : [];
  const index = parseInt(match[1], 36);
  const fingerprint = match[2];
  const indexed = labels[index];
  if (indexed && telegramMailBrowseLabelFingerprint_(indexed.id) === fingerprint) return indexed;
  return labels.find(label => telegramMailBrowseLabelFingerprint_(label.id) === fingerprint) || null;
}

function resolveTelegramMailBrowseLabel_(requested) {
  const wanted = String(requested || '').trim();
  const labels = telegramMailBrowseUserLabels_();
  const exactId = labels.find(label => label.id === wanted);
  const lower = wanted.toLocaleLowerCase();
  const exactName = labels.find(label => label.name.toLocaleLowerCase() === lower);
  const selected = exactId || exactName;
  if (!selected) throw telegramMailBrowseInputError_('Мітку «' + wanted.slice(0, 80) + '» не знайдено.');
  return selected;
}

function telegramMailBrowseStateKey_(token) {
  if (!/^[a-f0-9]{16}$/.test(String(token || ''))) throw new Error('Некоректний ID сесії пошти.');
  return TELEGRAM_MAIL_BROWSE_STATE_PREFIX + token;
}

function telegramMailBrowsePageToken_(value, allowEmpty) {
  const token = String(value || '');
  if (!token && allowEmpty) return '';
  return token && token.length <= 256 && !/[\u0000-\u0020\u007F]/.test(token) ? token : null;
}

function normalizeTelegramMailBrowseState_(value) {
  const source = value && typeof value === 'object' ? value : {};
  if (Number(source.version || 0) !== 1 || !/^[a-f0-9]{16}$/.test(String(source.token || ''))) return null;
  const pageSize = TELEGRAM_MAIL_BROWSE_PAGE_SIZES.indexOf(Number(source.pageSize)) !== -1
    ? Number(source.pageSize) : 10;
  const rawFilters = source.filters && typeof source.filters === 'object' ? source.filters : {};
  const filters = telegramMailBrowseDefaultFilters_();
  if (Object.prototype.hasOwnProperty.call(TELEGRAM_MAIL_BROWSE_PERIODS, rawFilters.period)) {
    filters.period = String(rawFilters.period);
  }
  if (Object.prototype.hasOwnProperty.call(TELEGRAM_MAIL_BROWSE_FOLDERS, rawFilters.folder)) {
    filters.folder = String(rawFilters.folder);
  }
  if (/^[A-Za-z0-9._%+@-]{1,254}$/.test(String(rawFilters.sender || ''))) {
    filters.sender = String(rawFilters.sender);
  }
  ['subject', 'text'].forEach(key => {
    if (telegramMailBrowseSafePhrase_(rawFilters[key], 120)) filters[key] = String(rawFilters[key]);
  });
  if (/^[A-Za-z0-9][A-Za-z0-9._:@-]{0,179}$/.test(String(rawFilters.labelId || '')) &&
      String(rawFilters.labelName || '').trim()) {
    filters.labelId = String(rawFilters.labelId);
    filters.labelName = cleanHeader_(rawFilters.labelName).slice(0, 120);
  }
  const ids = [];
  (Array.isArray(source.ids) ? source.ids : []).slice(0, pageSize).forEach(id => {
    const clean = String(id || '');
    if (/^[A-Za-z0-9_-]{5,64}$/.test(clean) && ids.indexOf(clean) === -1) ids.push(clean);
  });
  const pageToken = telegramMailBrowsePageToken_(source.pageToken, true);
  const nextPageToken = telegramMailBrowsePageToken_(source.nextPageToken, true);
  if (pageToken === null || nextPageToken === null) return null;
  const previousPageTokens = (Array.isArray(source.previousPageTokens)
    ? source.previousPageTokens : []).map(token => telegramMailBrowsePageToken_(token, true))
    .filter(token => token !== null)
    .slice(-CONFIG.TELEGRAM_MAIL_BROWSE_PREVIOUS_TOKEN_LIMIT);
  let offset = Math.max(0, Number(source.offset || 0));
  offset = Math.floor(offset / CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS) *
    CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS;
  if (ids.length) offset = Math.min(offset, Math.floor((ids.length - 1) /
    CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS) * CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS);
  else offset = 0;
  return {
    version: 1,
    token: String(source.token),
    chatId: String(source.chatId || ''),
    pageSize,
    filters,
    pageToken,
    nextPageToken,
    previousPageTokens,
    ids,
    offset,
    resultSizeEstimate: Math.max(0, Number(source.resultSizeEstimate || 0)),
    revision: Math.min(2176782335, Math.floor(Math.max(0, Number(source.revision || 0)))),
    lastUpdateId: String(source.lastUpdateId || '').slice(0, 32),
    createdAt: Math.max(0, Number(source.createdAt || 0)),
    updatedAt: Math.max(0, Number(source.updatedAt || 0)),
  };
}

function readTelegramMailBrowseIndex_(props) {
  let rows = [];
  try { rows = JSON.parse(props.getProperty(TELEGRAM_MAIL_BROWSE_STATE_INDEX) || '[]'); }
  catch (error) { rows = []; }
  return (Array.isArray(rows) ? rows : []).filter(row =>
    Array.isArray(row) && /^[a-f0-9]{16}$/.test(String(row[0] || '')) && Number(row[1] || 0) > 0
  ).map(row => [String(row[0]), Number(row[1])]);
}

function telegramMailBrowseStaleStateError_() {
  const error = new Error('Список пошти вже змінився. Повторіть дію з оновленого списку.');
  error.telegramMailBrowseStale = true;
  return error;
}

function persistTelegramMailBrowseState_(stateValue, expectedRevisionValue) {
  const state = normalizeTelegramMailBrowseState_(stateValue);
  if (!state) throw new Error('Не вдалося зберегти сесію списку пошти.');
  const compareRevision = expectedRevisionValue !== undefined && expectedRevisionValue !== null;
  const expectedRevision = Number(expectedRevisionValue);
  if (compareRevision && (!Number.isInteger(expectedRevision) || expectedRevision < 0 ||
      expectedRevision > 2176782335)) {
    throw new Error('Некоректна очікувана ревізія списку пошти.');
  }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('Пошта вже оновлюється. Спробуйте ще раз.');
  try {
    const props = PropertiesService.getScriptProperties();
    const now = Date.now();
    if (compareRevision) {
      let currentRaw = null;
      try {
        currentRaw = JSON.parse(props.getProperty(telegramMailBrowseStateKey_(state.token)) || 'null');
      } catch (error) {
        currentRaw = null;
      }
      let current = normalizeTelegramMailBrowseState_(currentRaw);
      if (current && now - current.updatedAt > CONFIG.TELEGRAM_MAIL_BROWSE_STATE_TTL_MS) current = null;
      const currentRevision = current ? Number(current.revision || 0) : 0;
      if (currentRevision !== expectedRevision ||
          (current && (current.chatId !== state.chatId || current.token !== state.token)) ||
          state.revision !== expectedRevision + 1) {
        throw telegramMailBrowseStaleStateError_();
      }
    }
    state.updatedAt = now;
    if (!state.createdAt) state.createdAt = now;
    let rows = readTelegramMailBrowseIndex_(props);
    const deleted = [];
    rows = rows.filter(row => {
      const keep = row[0] !== state.token &&
        now - Number(row[1]) <= CONFIG.TELEGRAM_MAIL_BROWSE_STATE_TTL_MS;
      if (!keep && row[0] !== state.token) deleted.push(telegramMailBrowseStateKey_(row[0]));
      return keep;
    });
    rows.push([state.token, now]);
    while (rows.length > CONFIG.TELEGRAM_MAIL_BROWSE_STATE_LIMIT) {
      const evicted = rows.shift();
      if (evicted) deleted.push(telegramMailBrowseStateKey_(evicted[0]));
    }
    let serialized = JSON.stringify(state);
    while (utf8ByteLength_(serialized) > CONFIG.TELEGRAM_PROPERTY_MAX_BYTES &&
           state.previousPageTokens.length) {
      state.previousPageTokens.shift();
      serialized = JSON.stringify(state);
    }
    assertTelegramPropertyValueFits_(telegramMailBrowseStateKey_(state.token), serialized);
    const indexJson = JSON.stringify(rows);
    assertTelegramPropertyValueFits_(TELEGRAM_MAIL_BROWSE_STATE_INDEX, indexJson);
    assertTelegramPropertyStoreFits_(props, {
      [telegramMailBrowseStateKey_(state.token)]: serialized,
      [TELEGRAM_MAIL_BROWSE_STATE_INDEX]: indexJson,
    }, deleted);
    deleted.forEach(name => deleteScriptProperty_(props, name));
    props.setProperty(telegramMailBrowseStateKey_(state.token), serialized);
    props.setProperty(TELEGRAM_MAIL_BROWSE_STATE_INDEX, indexJson);
    return state;
  } finally {
    lock.releaseLock();
  }
}

function readTelegramMailBrowseState_(token) {
  const props = PropertiesService.getScriptProperties();
  let raw = null;
  try { raw = JSON.parse(props.getProperty(telegramMailBrowseStateKey_(token)) || 'null'); }
  catch (error) { raw = null; }
  const state = normalizeTelegramMailBrowseState_(raw);
  if (!state || Date.now() - state.updatedAt > CONFIG.TELEGRAM_MAIL_BROWSE_STATE_TTL_MS) return null;
  const owner = String(props.getProperty('CHAT_ID') || '');
  if (!owner || state.chatId !== owner) throw new Error('Ця сесія пошти не належить поточному власнику.');
  return state;
}

function telegramMailBrowseQuery_(state) {
  const filters = state.filters || telegramMailBrowseDefaultFilters_();
  const folder = TELEGRAM_MAIL_BROWSE_FOLDERS[filters.folder] || TELEGRAM_MAIL_BROWSE_FOLDERS.inbox;
  const period = TELEGRAM_MAIL_BROWSE_PERIODS[filters.period] || TELEGRAM_MAIL_BROWSE_PERIODS.all;
  const parts = [folder.query, period.query].filter(Boolean);
  if (filters.sender) parts.push('from:"' + filters.sender + '"');
  if (filters.subject) parts.push('subject:"' + filters.subject + '"');
  if (filters.text) parts.push('"' + filters.text + '"');
  return parts.join(' ');
}

function loadTelegramMailBrowsePage_(state, requestedPageToken) {
  const pageToken = telegramMailBrowsePageToken_(requestedPageToken, true);
  if (pageToken === null) throw new Error('Некоректний Gmail page token.');
  const folder = TELEGRAM_MAIL_BROWSE_FOLDERS[state.filters.folder] || TELEGRAM_MAIL_BROWSE_FOLDERS.inbox;
  const params = [
    'maxResults=' + encodeURIComponent(String(state.pageSize)),
    'includeSpamTrash=true',
  ];
  const query = telegramMailBrowseQuery_(state);
  if (query) params.push('q=' + encodeURIComponent(query));
  const labelIds = [];
  if (folder.labelId) labelIds.push(folder.labelId);
  if (state.filters.labelId && labelIds.indexOf(state.filters.labelId) === -1) {
    labelIds.push(state.filters.labelId);
  }
  labelIds.forEach(labelId => params.push('labelIds=' + encodeURIComponent(labelId)));
  if (pageToken) params.push('pageToken=' + encodeURIComponent(pageToken));
  const data = gmailApi_('/messages?' + params.join('&'));
  const ids = [];
  (data.messages || []).slice(0, state.pageSize).forEach(item => {
    const id = String(item && item.id || '');
    if (!/^[A-Za-z0-9_-]{5,64}$/.test(id)) throw new Error('Gmail повернув некоректний ID листа.');
    if (ids.indexOf(id) === -1) ids.push(id);
  });
  const nextPageToken = telegramMailBrowsePageToken_(data.nextPageToken, true);
  if (nextPageToken === null || (nextPageToken && nextPageToken === pageToken)) {
    throw new Error('Gmail повернув некоректний курсор списку.');
  }
  state.pageToken = pageToken;
  state.nextPageToken = nextPageToken || '';
  state.ids = ids;
  state.offset = Math.min(
    Math.max(0, Number(state.offset || 0)),
    ids.length ? Math.floor((ids.length - 1) / CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS) *
      CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS : 0
  );
  state.resultSizeEstimate = Math.max(0, Number(data.resultSizeEstimate || 0));
  return state;
}

function telegramMailBrowseMetadataDto_(dataValue, messageIdValue) {
  const data = dataValue || {};
  const messageId = String(messageIdValue || '');
  const returnedId = String(data.id || '');
  if (!/^[A-Za-z0-9_-]{5,64}$/.test(messageId) || returnedId !== messageId) {
    throw new Error('Gmail повернув метадані іншого листа.');
  }
  const headers = (data.payload && data.payload.headers) || [];
  const labels = data.labelIds || [];
  return {
    id: returnedId,
    threadId: String(data.threadId || ''),
    labelIds: labels,
    unread: labels.indexOf('UNREAD') !== -1,
    from: firstHeaderValue_(headers, 'From') || '',
    subject: firstHeaderValue_(headers, 'Subject') || '(без теми)',
    sentAt: firstHeaderValue_(headers, 'Date') || '',
    timestamp: Number(data.internalDate || 0),
    snippet: String(data.snippet || ''),
  };
}

function telegramMailBrowseMetadata_(messageId) {
  const query = ['From', 'Subject', 'Date'].map(name =>
    'metadataHeaders=' + encodeURIComponent(name)
  ).join('&');
  const data = gmailApi_(
    '/messages/' + encodeURIComponent(messageId) + '?format=metadata&' + query
  );
  return telegramMailBrowseMetadataDto_(data, messageId);
}

function telegramMailBrowseMetadataBatch_(messageIdsValue) {
  const ids = Array.isArray(messageIdsValue) ? messageIdsValue.map(String) : [];
  const maxBatch = 10;
  if (ids.length > maxBatch) {
    throw new Error('Telegram-список перевищив безпечний розмір пакета Gmail.');
  }
  if (!ids.length) return [];
  const seen = new Set();
  ids.forEach(id => {
    if (!/^[A-Za-z0-9_-]{5,64}$/.test(id) || seen.has(id)) {
      throw new Error('Telegram-список містить некоректний ID листа.');
    }
    seen.add(id);
  });
  const query = ['From', 'Subject', 'Date'].map(name =>
    'metadataHeaders=' + encodeURIComponent(name)
  ).join('&');
  const token = String(ScriptApp.getOAuthToken() || '');
  if (!token) {
    const authError = new Error('Gmail не надав доступ для читання списку листів.');
    authError.gmailHttpStatus = 0;
    throw authError;
  }
  const baseUrl = 'https://gmail.googleapis.com/gmail/v1/users/me';
  let responses;
  try {
    responses = UrlFetchApp.fetchAll(ids.map(id => ({
      url: baseUrl + '/messages/' + encodeURIComponent(id) + '?format=metadata&' + query,
      method: 'get',
      headers: { Authorization: 'Bearer ' + token },
      muteHttpExceptions: true,
      followRedirects: false,
    })));
  } catch (error) {
    const transportError = new Error('Gmail тимчасово не завантажив список листів. Спробуйте ще раз.');
    transportError.gmailHttpStatus = 0;
    throw transportError;
  }
  if (!Array.isArray(responses) || responses.length !== ids.length) {
    const incompleteError = new Error('Gmail повернув неповний пакет списку листів.');
    incompleteError.gmailHttpStatus = 0;
    throw incompleteError;
  }
  return responses.map((response, index) => {
    const code = Number(response && response.getResponseCode && response.getResponseCode());
    if (code === 404) return null;
    if (!Number.isInteger(code) || code < 200 || code >= 300) {
      console.error('Gmail metadata batch HTTP ' + (Number.isInteger(code) ? code : 0) +
        ' for row ' + index + '.');
      let error;
      if (code === 401 || code === 403) {
        error = new Error('Gmail не дозволив прочитати список листів. Потрібно оновити доступ бота.');
      } else if (code === 408 || code === 425 || code === 429 || code >= 500) {
        error = new Error('Gmail тимчасово недоступний. Спробуйте ще раз трохи пізніше.');
      } else {
        error = new Error('Gmail не завантажив список листів (HTTP ' + (Number.isInteger(code) ? code : 0) + ').');
      }
      error.gmailHttpStatus = Number.isInteger(code) ? code : 0;
      throw error;
    }
    let data;
    try {
      const responseText = String(response.getContentText() || '');
      data = responseText ? JSON.parse(responseText) : null;
    } catch (error) {
      data = null;
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      const invalidError = new Error('Gmail повернув некоректні метадані списку листів.');
      invalidError.gmailHttpStatus = code;
      throw invalidError;
    }
    return telegramMailBrowseMetadataDto_(data, ids[index]);
  });
}
function telegramMailBrowseShortDate_(sentAt, timestamp) {
  if (!sentAt && !Number(timestamp || 0)) return 'дата невідома';
  const date = sentAt ? new Date(sentAt) : new Date(Number(timestamp || 0));
  if (isNaN(date.getTime())) return 'дата невідома';
  try {
    return Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd.MM.yy HH:mm');
  } catch (error) {
    return date.toISOString().slice(0, 16).replace('T', ' ');
  }
}

function telegramMailBrowseGmailUrl_(threadId) {
  return 'https://mail.google.com/mail/?authuser=' + encodeURIComponent(CONFIG.GMAIL_ACCOUNT) +
    '#all/' + encodeURIComponent(String(threadId || ''));
}

function telegramMailBrowseMarkup_(rows) {
  (rows || []).forEach(row => (row || []).forEach(button => {
    if (button && button.callback_data && utf8ByteLength_(button.callback_data) > 64) {
      throw new Error('Telegram callback_data перевищує 64 байти.');
    }
  }));
  const serialized = JSON.stringify({ inline_keyboard: rows || [] });
  if (utf8ByteLength_(serialized) > CONFIG.TELEGRAM_MAIL_REPLY_MARKUP_MAX_BYTES) {
    throw new Error('Клавіатура списку пошти завелика для Telegram.');
  }
  return serialized;
}

function telegramMailBrowseMiniAppUrl_(state) {
  const folder = String(state.filters.folder || 'inbox');
  if (state.filters.labelId) return mailboxAppUrl_();
  if (folder === 'unread') return mailboxFolderUrl_('inbox', 'unread');
  return mailboxFolderUrl_(folder);
}

function telegramMailBrowseFilterSummary_(state) {
  const filters = state.filters;
  const values = [
    (TELEGRAM_MAIL_BROWSE_FOLDERS[filters.folder] || TELEGRAM_MAIL_BROWSE_FOLDERS.inbox).label,
    'період: ' + (TELEGRAM_MAIL_BROWSE_PERIODS[filters.period] || TELEGRAM_MAIL_BROWSE_PERIODS.all).label,
  ];
  if (filters.labelName) values.push('мітка: ' + filters.labelName);
  if (filters.sender) values.push('від: ' + filters.sender);
  if (filters.subject) values.push('тема: ' + makePreview_(filters.subject, 42));
  if (filters.text) values.push('текст: ' + makePreview_(filters.text, 42));
  return values.join(' · ');
}

function renderTelegramMailBrowseList_(state) {
  const start = state.offset;
  const end = Math.min(state.ids.length, start + CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS);
  const visibleIds = state.ids.slice(start, end);
  const metadataRows = telegramMailBrowseMetadataBatch_(visibleIds);
  if (!Array.isArray(metadataRows) || metadataRows.length !== visibleIds.length) {
    throw new Error('Gmail повернув неповний список метаданих листів.');
  }
  const rows = [];
  const lines = [
    '<b>📬 Пошта у цьому чаті</b>',
    escapeHtml_(telegramMailBrowseFilterSummary_(state)),
    '',
    visibleIds.length
      ? 'Показано <b>' + (start + 1) + '–' + end + '</b> із вікна <b>' + state.ids.length +
        '</b> · запитано ' + state.pageSize
      : '<i>За цими фільтрами листів немає.</i>',
  ];
  visibleIds.forEach((id, relativeIndex) => {
    const absoluteIndex = start + relativeIndex;
    const item = metadataRows[relativeIndex] || {
      id, unread: false, subject: 'Лист тимчасово недоступний', from: '', sentAt: '', timestamp: 0,
    };
    const unread = item.unread ? '🔵' : '⚪';
    const subject = makePreview_(cleanHeader_(item.subject) || '(без теми)', 72);
    const sender = makePreview_(senderName_(item.from) || senderEmail_(item.from) || 'невідомий відправник', 45);
    lines.push(
      '', '<b>' + unread + ' ' + (absoluteIndex + 1) + '. ' + escapeHtml_(subject) + '</b>',
      escapeHtml_(sender) + ' · <i>' + escapeHtml_(telegramMailBrowseShortDate_(item.sentAt, item.timestamp)) + '</i>'
    );
    rows.push([{
      text: unread + ' ' + (absoluteIndex + 1) + ' · ' + makePreview_(subject, 48),
      callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'o', absoluteIndex.toString(36)),
    }]);
  });
  const navigation = [];
  if (state.offset > 0 || state.previousPageTokens.length) {
    navigation.push({ text: '◀️ Назад', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'p') });
  }
  navigation.push({ text: (Math.floor(state.offset / CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS) + 1) +
    ' / ' + Math.max(1, Math.ceil(state.ids.length / CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS)),
  callback_data: BOT_UI.NOOP_ACTION });
  if (end < state.ids.length || state.nextPageToken) {
    navigation.push({ text: 'Далі ▶️', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'n') });
  }
  rows.push(navigation);
  rows.push([
    { text: '🔎 Фільтри', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'f') },
    { text: '🔄 Оновити', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'r') },
  ]);
  rows.push([
    { text: '🧩 Mini App', web_app: { url: telegramMailBrowseMiniAppUrl_(state) } },
    { text: '📨 Gmail', url: 'https://mail.google.com/mail/?authuser=' + encodeURIComponent(CONFIG.GMAIL_ACCOUNT) + '#all' },
  ]);
  const text = lines.join('\n');
  if (utf8ByteLength_(text) > 4096) throw new Error('Список пошти завеликий для Telegram.');
  return { text, markup: telegramMailBrowseMarkup_(rows), visibleCount: visibleIds.length };
}

function chunkTelegramMailBrowseButtons_(buttons, width) {
  const rows = [];
  for (let index = 0; index < buttons.length; index += width) rows.push(buttons.slice(index, index + width));
  return rows;
}

function renderTelegramMailBrowseFilters_(state) {
  const rows = [];
  rows.push.apply(rows, chunkTelegramMailBrowseButtons_(TELEGRAM_MAIL_BROWSE_PAGE_SIZES.map(size => ({
    text: (state.pageSize === size ? '✓ ' : '') + String(size),
    callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'z', String(size)),
  })), 3));
  rows.push.apply(rows, chunkTelegramMailBrowseButtons_(Object.keys(TELEGRAM_MAIL_BROWSE_PERIODS).map(key => ({
    text: (state.filters.period === key ? '✓ ' : '') + TELEGRAM_MAIL_BROWSE_PERIODS[key].label,
    callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 't', key),
  })), 3));
  rows.push.apply(rows, chunkTelegramMailBrowseButtons_(Object.keys(TELEGRAM_MAIL_BROWSE_FOLDERS).map(key => ({
    text: (state.filters.folder === key ? '✓ ' : '') + TELEGRAM_MAIL_BROWSE_FOLDERS[key].label,
    callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'd', key),
  })), 2));
  rows.push([{ text: '🏷 Мої мітки Gmail', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'g', '0') }]);
  rows.push([
    { text: '🧹 Скинути пошук', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'x') },
    { text: '↩️ До листів', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'l') },
  ]);
  return {
    text: '<b>🔎 Фільтри пошти</b>\n\n' +
      escapeHtml_(telegramMailBrowseFilterSummary_(state)) + '\n\n' +
      'Для відправника, теми або тексту надішліть:\n' +
      '<code>/mail from:example.com subject:"invoice" text:"payment" size:20 period:30d</code>\n\n' +
      '<i>Gmail-запит формує сервер; довільні оператори не виконуються.</i>',
    markup: telegramMailBrowseMarkup_(rows),
  };
}

function renderTelegramMailBrowseLabels_(state, pageValue) {
  const labels = telegramMailBrowseUserLabels_().slice(0, 100);
  const perPage = 8;
  const maxPage = Math.max(0, Math.ceil(labels.length / perPage) - 1);
  const page = Math.max(0, Math.min(maxPage, Number(pageValue || 0)));
  const start = page * perPage;
  const rows = labels.slice(start, start + perPage).map((label, index) => [{
    text: (state.filters.labelId === label.id ? '✓ ' : '🏷 ') + makePreview_(label.name, 52),
    callback_data: telegramMailBrowseCallbackData_(
      state.token,
      state.revision,
      'y',
      (start + index).toString(36) + '_' + telegramMailBrowseLabelFingerprint_(label.id)
    ),
  }]);
  const navigation = [];
  if (page > 0) navigation.push({
    text: '◀️', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'g', (page - 1).toString(36)),
  });
  navigation.push({ text: (page + 1) + ' / ' + (maxPage + 1), callback_data: BOT_UI.NOOP_ACTION });
  if (page < maxPage) navigation.push({
    text: '▶️', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'g', (page + 1).toString(36)),
  });
  rows.push(navigation);
  rows.push([{ text: '↩️ До фільтрів', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'f') }]);
  return {
    text: '<b>🏷 Мітки Gmail</b>\n\n' +
      (labels.length ? 'Оберіть мітку. Вона використається як точний Gmail labelId.' : '<i>Користувацьких міток немає.</i>'),
    markup: telegramMailBrowseMarkup_(rows),
    page,
  };
}

function renderTelegramMailBrowseDetail_(state, indexValue) {
  const index = Number(indexValue);
  if (!Number.isInteger(index) || index < 0 || index >= state.ids.length) {
    throw new Error('Обраний лист вже не входить до цього вікна.');
  }
  const message = getGmailMessage_(state.ids[index]);
  const sender = senderName_(message.from) || 'невідомий відправник';
  const email = senderEmail_(message.from);
  const body = makePreview_(selectAnalysisBody_(message.plain, message.html, message.snippet), 1700) ||
    'Текстовий вміст недоступний; відкрийте оригінал.';
  const gmailUrl = telegramMailBrowseGmailUrl_(message.threadId);
  const rows = [
    [{ text: '🧩 Відкрити гілку в Mini App', web_app: { url: mailboxAppUrl_('thread', message.threadId, message.id) } }],
    [{ text: '📨 Відкрити гілку в Gmail', url: gmailUrl }],
    [{ text: '↩️ До списку', callback_data: telegramMailBrowseCallbackData_(state.token, state.revision, 'l') }],
  ];
  return {
    text: '<b>' + (message.unread ? '🔵 Непрочитаний' : '⚪ Прочитаний') + ' лист</b>\n\n' +
      '<b>' + escapeHtml_(message.subject || '(без теми)') + '</b>\n' +
      escapeHtml_(sender) + (email ? ' · <code>' + escapeHtml_(email) + '</code>' : '') + '\n' +
      '<i>' + escapeHtml_(formatSentDate_(message.sentAt, message.timestamp)) + '</i>\n\n' +
      '<blockquote>' + escapeHtml_(body) + '</blockquote>' +
      (message.attachments.length ? '\n\n📎 Вкладень: <b>' + message.attachments.length + '</b>' : '') +
      '\n\n<i>Перегляд не змінює стан листа в Gmail.</i>',
    markup: telegramMailBrowseMarkup_(rows),
    message,
  };
}

function editTelegramMailBrowseMessage_(message, view) {
  if (!message || !message.message_id) throw new Error('Telegram-повідомлення для оновлення відсутнє.');
  try {
    return telegramRequest_('editMessageText', {
      chat_id: telegramCallbackChatId_(message),
      message_id: message.message_id,
      text: view.text,
      parse_mode: 'HTML',
      link_preview_options: JSON.stringify({ is_disabled: true }),
      reply_markup: view.markup,
    });
  } catch (error) {
    if (telegramEditAlreadyApplied_(error)) return null;
    throw error;
  }
}

function renderExpiredTelegramMailBrowse_(message) {
  return editTelegramMailBrowseMessage_(message, {
    text: '<b>⏳ Сеанс списку завершився</b>\n\nСесія зберігається 30 хвилин. Відкрийте новий список.',
    markup: telegramMailBrowseMarkup_([
      [{ text: '📬 Листи в чаті', callback_data: BOT_UI.BROWSE_ACTION }],
      [{ text: '🧩 Mini App', web_app: { url: mailboxAppUrl_() } }],
    ]),
  });
}

function sendTelegramMailBrowseAtMostOnce_(updateId, chatId, token, deliveryKind, html, markup, options) {
  let operation = readTelegramUpdateOperation_(updateId);
  const kind = String(deliveryKind || 'list');
  if (operation && (
    operation.kind !== 'mail_browse_initial_send' ||
    String(operation.chatId || '') !== String(chatId || '') ||
    String(operation.token || '') !== String(token || '') ||
    String(operation.deliveryKind || '') !== kind
  )) {
    throw new Error('Збережена Telegram-доставка не відповідає цьому списку пошти.');
  }

  if (operation && ['reserved', 'uncertain', 'sent'].indexOf(operation.phase) !== -1) {
    if (operation.phase === 'reserved') {
      operation.phase = 'uncertain';
      operation.lastError = 'A previous sendMessage dispatch may have been accepted.';
      operation.updatedAt = Date.now();
      try { saveTelegramUpdateOperation_(updateId, operation); }
      catch (error) { console.error('Could not quarantine uncertain mail-list delivery: ' + error); }
    }
    return {
      sent: operation.phase === 'sent',
      uncertain: operation.phase !== 'sent',
      suppressed: true,
    };
  }

  if (!operation) {
    operation = {
      version: 1,
      kind: 'mail_browse_initial_send',
      chatId: String(chatId || ''),
      token: String(token || ''),
      deliveryKind: kind,
      phase: 'reserved',
      attempts: 1,
      lastError: '',
      updatedAt: Date.now(),
    };
  } else {
    operation.phase = 'reserved';
    operation.attempts = Math.max(1, Number(operation.attempts || 0) + 1);
    operation.lastError = '';
    operation.updatedAt = Date.now();
  }
  // This is the at-most-once boundary. A retry that observes `reserved` must
  // never dispatch sendMessage again because the prior process could have
  // reached Telegram and crashed before recording the response.
  saveTelegramUpdateOperation_(updateId, operation);

  try {
    sendTelegramText_(html, markup, options);
  } catch (error) {
    operation.lastError = String(error && error.message || error || '').slice(0, 180);
    operation.updatedAt = Date.now();
    if (error && error.telegramOutcomeUncertain) {
      operation.phase = 'uncertain';
      try { saveTelegramUpdateOperation_(updateId, operation); }
      catch (saveError) { console.error('Could not persist uncertain mail-list delivery: ' + saveError); }
      return { sent: false, uncertain: true, suppressed: false };
    }
    operation.phase = 'retryable';
    // A definite Bot API rejection is safe to retry. If this write itself
    // fails, the durable `reserved` value remains and errs on no-duplicate.
    try { saveTelegramUpdateOperation_(updateId, operation); }
    catch (saveError) { console.error('Could not mark rejected mail-list delivery retryable: ' + saveError); }
    throw error;
  }

  operation.phase = 'sent';
  operation.updatedAt = Date.now();
  try {
    saveTelegramUpdateOperation_(updateId, operation);
  } catch (error) {
    // Telegram already accepted sendMessage. Never turn a post-dispatch
    // bookkeeping failure into an automatic duplicate; `reserved` remains the
    // conservative state if this guarded write did not commit.
    console.error('Mail-list delivery succeeded but its sent marker was not persisted: ' + error);
  }
  return { sent: true, uncertain: false, suppressed: false };
}

function sendTelegramMailBrowse_(updateId, commandText, message, editExisting) {
  const props = PropertiesService.getScriptProperties();
  const chatId = requireSetting_(props, 'CHAT_ID');
  const token = hashedMessageId_([
    'mail-browse', chatId, String(updateId || ''), String(message && message.message_id || ''),
  ].join('|'));
  let state = readTelegramMailBrowseState_(token);
  try {
    if (!state) {
      const parsed = parseTelegramMailBrowseCommand_(commandText);
      if (parsed.requestedLabel) {
        const label = resolveTelegramMailBrowseLabel_(parsed.requestedLabel);
        parsed.filters.labelId = label.id;
        parsed.filters.labelName = label.name;
        parsed.filters.folder = 'all';
      }
      state = {
        version: 1,
        token,
        chatId: String(chatId),
        pageSize: parsed.pageSize,
        filters: parsed.filters,
        pageToken: '',
        nextPageToken: '',
        previousPageTokens: [],
        ids: [],
        offset: 0,
        resultSizeEstimate: 0,
        revision: 1,
        lastUpdateId: String(updateId || '').slice(0, 32),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      loadTelegramMailBrowsePage_(state, '');
      try {
        state = persistTelegramMailBrowseState_(state, 0);
      } catch (error) {
        if (!error.telegramMailBrowseStale) throw error;
        state = readTelegramMailBrowseState_(token);
        if (!state) throw error;
      }
    }
    const view = renderTelegramMailBrowseList_(state);
    if (editExisting) editTelegramMailBrowseMessage_(message, view);
    else {
      const delivery = sendTelegramMailBrowseAtMostOnce_(
        updateId,
        chatId,
        token,
        'list',
        view.text,
        view.markup,
        systemTopicOptions_({ replyTo: message && message.message_id, silent: true })
      );
      if (delivery.uncertain || delivery.suppressed) {
        return { message: 'Доставку не повторено, щоб уникнути дубліката' };
      }
    }
    return { message: view.visibleCount ? 'Листи завантажено' : 'Листів за фільтром немає' };
  } catch (error) {
    if (!error.telegramMailBrowseInput || editExisting) throw error;
    const delivery = sendTelegramMailBrowseAtMostOnce_(
      updateId,
      chatId,
      token,
      'input_error',
      '<b>⚠️ Не вдалося застосувати фільтр</b>\n\n' + escapeHtml_(error.message) + '\n\n' +
      '<code>/mail folder:inbox period:7d size:20</code>',
      null,
      systemTopicOptions_({ replyTo: message && message.message_id, silent: true })
    );
    if (delivery.uncertain || delivery.suppressed) {
      return { message: 'Повтор не виконано, щоб уникнути дубліката' };
    }
    return { message: 'Перевірте фільтри /mail' };
  }
}

function resetTelegramMailBrowsePage_(state) {
  state.pageToken = '';
  state.nextPageToken = '';
  state.previousPageTokens = [];
  state.offset = 0;
  return loadTelegramMailBrowsePage_(state, '');
}

function telegramMailBrowseViewForOperation_(state, operation) {
  if (operation.view === 'detail') return renderTelegramMailBrowseDetail_(state, parseInt(operation.viewArgument, 36));
  if (operation.view === 'filters') return renderTelegramMailBrowseFilters_(state);
  if (operation.view === 'labels') return renderTelegramMailBrowseLabels_(state, parseInt(operation.viewArgument || '0', 36));
  return renderTelegramMailBrowseList_(state);
}

function telegramMailBrowseOperationViewDescriptor_(action, argument) {
  if (action === 'o') return { view: 'detail', viewArgument: String(argument || '') };
  if (action === 'f') return { view: 'filters', viewArgument: '' };
  if (action === 'g') return { view: 'labels', viewArgument: String(argument || '0') };
  return { view: 'list', viewArgument: '' };
}

function renderStaleTelegramMailBrowse_(token, message) {
  const current = readTelegramMailBrowseState_(token);
  if (!current) {
    renderExpiredTelegramMailBrowse_(message);
    return { message: 'Сеанс завершився' };
  }
  editTelegramMailBrowseMessage_(message, renderTelegramMailBrowseList_(current));
  return { message: 'Список вже оновився · повторіть дію' };
}

function handleTelegramMailBrowseCallback_(updateId, query, callback) {
  let state = readTelegramMailBrowseState_(callback.token);
  if (!state) {
    renderExpiredTelegramMailBrowse_(query && query.message);
    return { message: 'Сеанс завершився' };
  }
  const props = PropertiesService.getScriptProperties();
  const chatId = String(props.getProperty('CHAT_ID') || '');
  if (String(telegramCallbackChatId_(query && query.message)) !== chatId || state.chatId !== chatId) {
    throw new Error('Ця команда доступна лише власнику бота.');
  }
  let operation = readTelegramUpdateOperation_(updateId);
  if (operation && (
    operation.kind !== 'mail_browse' || operation.chatId !== chatId ||
    operation.token !== callback.token || operation.action !== callback.action ||
    operation.argument !== callback.argument || Number(operation.baseRevision) !== Number(callback.revision)
  )) {
    throw new Error('Збережена Telegram-операція не відповідає списку пошти.');
  }
  if (!Number.isInteger(Number(callback.revision)) || Number(callback.revision) <= 0) {
    throw new Error('Кнопка списку не містить коректної ревізії.');
  }

  if (operation && operation.phase === 'applied') {
    if (Number(operation.resultRevision || 0) !== Number(state.revision) ||
        String(state.lastUpdateId) !== String(updateId)) {
      return renderStaleTelegramMailBrowse_(callback.token, query && query.message);
    }
    const retriedView = telegramMailBrowseViewForOperation_(state, operation);
    editTelegramMailBrowseMessage_(query && query.message, retriedView);
    return {
      message: operation.view === 'detail' ? 'Лист відкрито без змін у Gmail' :
        operation.view === 'filters' ? 'Фільтри відкрито' :
        operation.view === 'labels' ? 'Мітки відкрито' : 'Список оновлено',
    };
  }

  // A crash may happen after the CAS state commit but before the per-update
  // operation reaches `applied`. Infer completion only for the exact update
  // and exact next revision; a later callback can never be mistaken for it.
  if (operation && operation.phase === 'reserved' &&
      String(state.lastUpdateId) === String(updateId) &&
      Number(state.revision) === Number(callback.revision) + 1) {
    const inferred = telegramMailBrowseOperationViewDescriptor_(callback.action, callback.argument);
    operation.phase = 'applied';
    operation.view = inferred.view;
    operation.viewArgument = inferred.viewArgument;
    operation.resultRevision = state.revision;
    operation.updatedAt = Date.now();
    saveTelegramUpdateOperation_(updateId, operation);
    const inferredView = telegramMailBrowseViewForOperation_(state, operation);
    editTelegramMailBrowseMessage_(query && query.message, inferredView);
    return { message: 'Список оновлено' };
  }

  if (Number(state.revision) !== Number(callback.revision)) {
    return renderStaleTelegramMailBrowse_(callback.token, query && query.message);
  }
  if (!operation) {
    operation = {
      version: 1,
      kind: 'mail_browse',
      chatId,
      token: callback.token,
      action: callback.action,
      argument: callback.argument,
      phase: 'reserved',
      baseRevision: Number(callback.revision),
      view: 'list',
      viewArgument: '',
      updatedAt: Date.now(),
    };
    saveTelegramUpdateOperation_(updateId, operation);
  } else if (operation.phase !== 'reserved') {
    throw new Error('Некоректний стан Telegram-операції списку.');
  }

  const action = callback.action;
  const argument = callback.argument;
  const descriptor = telegramMailBrowseOperationViewDescriptor_(action, argument);
  if (action === 'n') {
    if (state.offset + CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS < state.ids.length) {
      state.offset += CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS;
    } else if (state.nextPageToken) {
      state.previousPageTokens.push(state.pageToken);
      state.previousPageTokens = state.previousPageTokens.slice(-CONFIG.TELEGRAM_MAIL_BROWSE_PREVIOUS_TOKEN_LIMIT);
      state.offset = 0;
      loadTelegramMailBrowsePage_(state, state.nextPageToken);
    }
  } else if (action === 'p') {
    if (state.offset >= CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS) {
      state.offset -= CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS;
    } else if (state.previousPageTokens.length) {
      const previous = state.previousPageTokens.pop();
      state.offset = 0;
      loadTelegramMailBrowsePage_(state, previous);
      state.offset = state.ids.length ? Math.floor((state.ids.length - 1) /
        CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS) * CONFIG.TELEGRAM_MAIL_BROWSE_VISIBLE_ROWS : 0;
    }
  } else if (action === 'r') {
    loadTelegramMailBrowsePage_(state, state.pageToken);
  } else if (action === 'g') {
    if (!/^[0-9a-z]{1,3}$/.test(argument)) throw new Error('Некоректна сторінка міток.');
  } else if (action === 'o') {
    const index = parseInt(argument, 36);
    if (!/^[0-9a-z]{1,3}$/.test(argument) || !Number.isInteger(index) || index < 0 || index >= state.ids.length) {
      throw new Error('Некоректний номер листа.');
    }
  } else if (action === 'z') {
    const size = Number(argument);
    if (TELEGRAM_MAIL_BROWSE_PAGE_SIZES.indexOf(size) === -1) throw new Error('Некоректний розмір вікна.');
    state.pageSize = size;
    resetTelegramMailBrowsePage_(state);
  } else if (action === 't') {
    if (!Object.prototype.hasOwnProperty.call(TELEGRAM_MAIL_BROWSE_PERIODS, argument)) throw new Error('Некоректний період.');
    state.filters.period = argument;
    resetTelegramMailBrowsePage_(state);
  } else if (action === 'd') {
    if (!Object.prototype.hasOwnProperty.call(TELEGRAM_MAIL_BROWSE_FOLDERS, argument)) throw new Error('Некоректна папка.');
    state.filters.folder = argument;
    resetTelegramMailBrowsePage_(state);
  } else if (action === 'y') {
    const labels = telegramMailBrowseUserLabels_().slice(0, 100);
    const label = telegramMailBrowseLabelSelection_(argument, labels);
    if (!label) throw new Error('Мітка вже недоступна.');
    state.filters.labelId = label.id;
    state.filters.labelName = label.name;
    state.filters.folder = 'all';
    resetTelegramMailBrowsePage_(state);
  } else if (action === 'x') {
    state.filters.sender = '';
    state.filters.subject = '';
    state.filters.text = '';
    state.filters.labelId = '';
    state.filters.labelName = '';
    resetTelegramMailBrowsePage_(state);
  } else if (['l', 'f'].indexOf(action) === -1) {
    throw new Error('Невідома команда списку пошти.');
  }

  if (Number(callback.revision) >= 2176782335) throw new Error('Сеанс списку вичерпав ліміт ревізій.');
  state.revision = Number(callback.revision) + 1;
  state.lastUpdateId = String(updateId).slice(0, 32);
  try {
    state = persistTelegramMailBrowseState_(state, Number(callback.revision));
  } catch (error) {
    if (!error.telegramMailBrowseStale) throw error;
    return renderStaleTelegramMailBrowse_(callback.token, query && query.message);
  }
  operation.phase = 'applied';
  operation.view = descriptor.view;
  operation.viewArgument = descriptor.viewArgument;
  operation.resultRevision = state.revision;
  operation.updatedAt = Date.now();
  saveTelegramUpdateOperation_(updateId, operation);

  const rendered = telegramMailBrowseViewForOperation_(state, operation);
  editTelegramMailBrowseMessage_(query && query.message, rendered);
  return {
    message: operation.view === 'detail' ? 'Лист відкрито без змін у Gmail' :
      operation.view === 'filters' ? 'Фільтри відкрито' :
      operation.view === 'labels' ? 'Мітки відкрито' : 'Список оновлено',
  };
}

function inlineControlMenu_() {
  return JSON.stringify({
    inline_keyboard: [
      [{ text: '📬 Листи в цьому чаті', callback_data: BOT_UI.BROWSE_ACTION }],
      [{ text: '🧩 Повний поштовий клієнт', web_app: { url: mailboxAppUrl_() } }],
      [{ text: '📂 Папки, мітки й стани', callback_data: BOT_UI.FOLDERS_ACTION }],
      [{ text: '🔄 Перевірити зараз', callback_data: BOT_UI.CHECK_ACTION }],
      [
        { text: '📊 Статус', callback_data: BOT_UI.STATUS_ACTION },
        { text: '⚙️ Налаштування', callback_data: BOT_UI.SETTINGS_ACTION },
      ],
      [{ text: 'ℹ️ Можливості бота', callback_data: BOT_UI.HELP_ACTION }],
    ],
  });
}

function folderControlMenu_() {
  return JSON.stringify({
    inline_keyboard: [
      [{ text: '📬 Переглянути листи в чаті', callback_data: BOT_UI.BROWSE_ACTION }],
      [
        { text: '📥 Вхідні', web_app: { url: mailboxFolderUrl_('inbox') } },
        { text: '📩 Непрочитані', web_app: { url: mailboxFolderUrl_('inbox', 'unread') } },
      ],
      [
        { text: '📤 Надіслані', web_app: { url: mailboxFolderUrl_('sent') } },
        { text: '📝 Чернетки', web_app: { url: mailboxFolderUrl_('drafts') } },
      ],
      [
        { text: '🕘 Відкладені', web_app: { url: mailboxFolderUrl_('snoozed') } },
        { text: '🗄 Архів', web_app: { url: mailboxFolderUrl_('archive') } },
      ],
      [
        { text: '🗑 Кошик', web_app: { url: mailboxFolderUrl_('trash') } },
        { text: '🚫 Спам', web_app: { url: mailboxFolderUrl_('spam') } },
      ],
      [
        { text: '⭐ Із зірочкою', web_app: { url: mailboxFolderUrl_('starred') } },
        { text: '❗ Важливі', web_app: { url: mailboxFolderUrl_('important') } },
      ],
      [{ text: '📚 Уся пошта', web_app: { url: mailboxFolderUrl_('all') } }],
      [{ text: 'ℹ️ Можливості бота', callback_data: BOT_UI.HELP_ACTION }],
    ],
  });
}

function sendFolderMenu_() {
  sendTelegramText_(
    '<b>📂 Папки Gmail</b>\n\n' +
    'Відкрийте <b>📬 Листи в чаті</b>, щоб переглядати папки, категорії та мітки без відкриття Mini App. Кнопки нижче залишаються прямими посиланнями на повний клієнт.',
    folderControlMenu_(),
    systemTopicOptions_({ silent: true })
  );
  return { message: 'Папки відкрито' };
}

function sendControlMenu_() {
  sendTelegramText_(
    '<b>⚙️ Керування поштою</b>\n\n' +
    'Ручна перевірка запускається одразу. Автоматична перевірка продовжує ' +
    'працювати щохвилини.',
    inlineControlMenu_(),
    systemTopicOptions_()
  );
}

function telegramMetadataSyncStatusLabel_(statusValue) {
  const status = statusValue || {};
  if (status.state === 'healthy') return '🟢 синхронізовано';
  if (status.state === 'checking') return '🟡 перевіряється';
  if (status.state === 'degraded') return '🔴 тимчасова помилка';
  return '⚪ очікує перевірки';
}

function telegramGmailAccountCallbackData_(connectionIdValue) {
  const connectionId = mailboxMultiOpaqueId_(connectionIdValue, 'gmail');
  const value = BOT_UI.ACCOUNT_PREFIX + connectionId;
  if (value.length > 64) throw new Error('Telegram account callback exceeds 64 bytes.');
  return value;
}

function parseTelegramGmailAccountCallback_(value) {
  const text = String(value || '');
  if (text.indexOf(BOT_UI.ACCOUNT_PREFIX) !== 0) return null;
  try {
    return { connectionId: mailboxMultiOpaqueId_(text.slice(BOT_UI.ACCOUNT_PREFIX.length), 'gmail') };
  } catch (error) {
    return null;
  }
}

function switchTelegramGmailAccount_(userIdValue, chatIdValue, connectionIdValue) {
  const userId = String(userIdValue || '');
  const chatId = String(chatIdValue || userId);
  if (!/^\d{1,24}$/.test(userId) || !/^-?\d{1,24}$/.test(chatId)) {
    throw new Error('Некоректна Telegram-зона перемикання Gmail.');
  }
  const selected = mailboxMultiSelectConnection_({ userId }, connectionIdValue);
  sendSettingsMenu_(userId, chatId);
  return { message: 'Активна Gmail: ' + String(selected.connection.email || selected.connection.displayName || 'Gmail') };
}

function sendSettingsMenu_(userIdValue, chatIdValue) {
  const userId = String(userIdValue || mailboxOwnerId_());
  const chatId = String(chatIdValue || userId);
  if (!/^\d{1,24}$/.test(userId) || !/^-?\d{1,24}$/.test(chatId)) {
    throw new Error('Некоректна Telegram-зона налаштувань.');
  }
  const principal = mailboxMultiPrincipal_(userId);
  const accounts = mailboxMultiVisibleAccounts_({
    userId,
    connectionId: principal.connectionId,
  }, principal.registry).filter(item => item.connected);
  const active = accounts.find(item => item.id === principal.connectionId) || null;
  let googleStart = null;
  try {
    googleStart = mailboxGoogleConnectStart_({}, principal);
  } catch (error) {
    console.error('Direct Gmail OAuth launcher unavailable: ' + String(error && error.message || error));
  }
  const accountLines = accounts.slice(0, 12).map(account => {
    const sync = typeof mailboxMetadataSyncPublicStatus_ === 'function'
      ? mailboxMetadataSyncPublicStatus_(account.id, '')
      : { state: 'pending', lastCheckedAt: 0 };
    const checked = sync.lastCheckedAt
      ? ' · ' + Utilities.formatDate(new Date(sync.lastCheckedAt), Session.getScriptTimeZone(), 'dd.MM HH:mm')
      : '';
    return (account.id === principal.connectionId ? '▶️ ' : '• ') +
      '<b>' + escapeHtml_(account.email || account.name || 'Gmail') + '</b> · ' +
      telegramMetadataSyncStatusLabel_(sync) + checked;
  });
  if (accounts.length > 12) accountLines.push('…ще ' + (accounts.length - 12) + ' акаунтів у Mini App');
  const text = '<b>⚙️ Налаштування Gmail</b>\n\n' +
    (active
      ? 'Активна скринька: <b>' + escapeHtml_(active.email || active.name || 'Gmail') + '</b>\n'
      : 'Активну Gmail-скриньку ще не підключено.\n') +
    'Кожна скринька ізольована Telegram-користувачем і поштовою зоною.\n\n' +
    (accountLines.length ? accountLines.join('\n') : '<i>Підключених Gmail-акаунтів немає.</i>') +
    '\n\n🌙 Сповіщення без звуку: <b>22:00–08:00</b>\n' +
    '🎯 Правила пріоритетів: команда <code>/focus</code>\n' +
    '🔄 Мітки, send-as і підтримувані налаштування перевіряються окремо для кожної скриньки.';
  const keyboard = accounts.slice(0, 12).map(account => [{
    text: (account.id === principal.connectionId ? '✅ ' : '▫️ ') +
      String(account.email || account.name || 'Gmail').slice(0, 48),
    callback_data: telegramGmailAccountCallbackData_(account.id),
  }]);
  if (googleStart && /^https:\/\/tarasevych\.github\.io\/gmail-telegram-controls\/gmail-oauth-callback\.html\?start=1&state=[A-Za-z0-9_-]{43}&client=[0-9]+-[A-Za-z0-9_-]+\.apps\.googleusercontent\.com$/.test(String(googleStart.launchUrl || ''))) {
    keyboard.push([{ text: '＋ Додати Gmail-акаунт', url: googleStart.launchUrl }]);
  }
  keyboard.push(
    [{ text: '🧩 Відкрити поштовий клієнт', web_app: { url: mailboxBootstrapUrl_() } }],
    [{ text: '🔄 Оновити стан', callback_data: BOT_UI.SETTINGS_ACTION }]
  );
  sendTelegramText_(
    text,
    JSON.stringify({ inline_keyboard: keyboard }),
    { chatId, silent: true }
  );
  return { message: 'Налаштування Gmail оновлено' };
}

function sendBotHelp_() {
  sendTelegramText_(
    '<b>ℹ️ Що вміє бот</b>\n\n' +
    '• перевіряти Gmail автоматично або вручну;\n' +
    '• робити український висновок за всім текстом листа;\n' +
    '• визначати важливість, дію, строки, суми та коди;\n' +
    '• показувати повний оригінал із посиланнями на їхніх місцях;\n' +
    '• копіювати код або email одним натисканням;\n' +
      '• передавати вкладення і точний MIME-оригінал <code>.eml</code>;\n' +
      '• переглядати до 100 листів за логічну сторінку прямо в Telegram з фільтрами;\n' +
    '• архівувати, видаляти до кошика та позначати лист як спам;\n' +
    '• безпечно відписувати від розсилки, якщо відправник це підтримує.',
    inlineControlMenu_(),
    systemTopicOptions_()
  );
}

function sendBotStatus_() {
  const props = PropertiesService.getScriptProperties();
  const lastCheck = Number(props.getProperty('LAST_CHECK_AT') || 0);
  const gmailNotificationState = gmailNotificationQuarantineState_(props);
  const gmailDeadLetterTotal = Math.max(0, Number(gmailNotificationState.audit.total || 0));
  const abandonedMoves = telegramCardMoveAbandonmentStatus_(props);
  const uncertainDeliveries = telegramCardIndex_(
    props,
    telegramMailDeliveryQuarantineIndexName_()
  ).length;
  const uncertainDeliveriesTotal = Math.max(
    uncertainDeliveries,
    Number(props.getProperty('TELEGRAM_MAIL_DELIVERY_QUARANTINE_TOTAL_V1') || 0)
  );
  const triggerActive = ScriptApp.getProjectTriggers()
    .some(trigger => ['checkNewMail', 'checkNewMail_'].indexOf(trigger.getHandlerFunction()) !== -1);
  let controlsStatus = 'активні';
  try {
    const info = telegramRequest_('getWebhookInfo', {});
    if (!info.url) {
      controlsStatus = 'callback webhook не підключено';
    } else if (String(info.url).indexOf(CONFIG.WEB_APP_URL) !== 0) {
      controlsStatus = 'підключено інший webhook';
    } else if (info.last_error_message) {
      controlsStatus = 'callback webhook повідомляє про помилку';
    } else {
      controlsStatus = 'активні — без окремих вікон';
    }
  } catch (error) {
    controlsStatus = 'не вдалося перевірити callback webhook';
  }

  const lastCheckText = lastCheck
    ? Utilities.formatDate(new Date(lastCheck), Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm:ss')
    : 'ще не зафіксовано';
  sendTelegramText_(
    '<b>📊 Статус Gmail-бота</b>\n\n' +
    'Автоперевірка: <b>' + (triggerActive ? 'працює' : 'вимкнена') + '</b>\n' +
    'Ручні кнопки: <b>' + escapeHtml_(controlsStatus) + '</b>\n' +
    'Остання перевірка: <b>' + escapeHtml_(lastCheckText) + '</b>\n' +
    'Останнє джерело: <b>' + escapeHtml_(props.getProperty('LAST_CHECK_SOURCE') || '—') + '</b>\n' +
    'Gmail-сповіщення у черзі повтору: <b>' + gmailNotificationState.rows.length + '</b>\n' +
    'Gmail-сповіщення без автоповтору: <b>' + gmailDeadLetterTotal + '</b>' +
      (gmailDeadLetterTotal ? ' — оригінали залишаються у Gmail' : '') + '\n' +
    'Невизначені Telegram-доставки: <b>' + uncertainDeliveries + '</b>' +
      (uncertainDeliveries
        ? ' — автоматичний повтор вимкнено; перевірте оригінали в Gmail'
        : '') + '\n' +
    'Усього зафіксовано невизначених: <b>' + uncertainDeliveriesTotal + '</b>\n' +
    'Переміщення карток для ручної перевірки: <b>' + abandonedMoves.current + '</b>' +
      (abandonedMoves.current
        ? ' — автоматичні спроби вичерпано; перевірте Gmail і Telegram'
        : '') + '\n' +
    'Усього зафіксовано таких переміщень: <b>' + abandonedMoves.total + '</b>\n' +
    'Зараз без звуку: <b>' + (isQuietHours_() ? 'так' : 'ні') + '</b>',
    inlineControlMenu_(),
    systemTopicOptions_()
  );
}

/** Sends a harmless configuration test. */
function testNotifier_() {
  sendTelegramText_(
    '<b>🧪 Перевірка успішна</b>\n\nБот може надсилати повідомлення у цей чат.',
    replyKeyboard_(),
    systemTopicOptions_()
  );
}

/** Re-sends the newest inbox email to preview the current Telegram layout. */
function previewLatestEmail_() {
  const ids = listGmailMessageIds_(Date.now() - 2 * 24 * 60 * 60 * 1000);
  if (!ids.length) throw new Error('No recent inbox messages found.');
  notifyMessage_(getGmailMessage_(ids[0]));
}

function notifyMessage_(message, options) {
  const opts = options || {};
  const account = opts.account && typeof opts.account === 'object' ? opts.account : {};
  const requestedAccountEmail = String(account.email || '').trim().toLowerCase();
  const accountEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(requestedAccountEmail)
    ? requestedAccountEmail
    : CONFIG.GMAIL_ACCOUNT;
  const sender = cleanHeader_(message.from);
  const senderLabel = senderName_(sender) || '(невідомий відправник)';
  const senderEmail = senderEmail_(sender);
  const subject = message.subject || '(без теми)';
  const analysisBody = selectAnalysisBody_(message.plain, message.html, message.snippet);
  const analysis = analyzeMessage_(subject, analysisBody);
  let focus = { priority: 'none', label: '', color: '', rank: 0, source: 'none', reason: '' };
  if (typeof mailboxFocusRegistryForCurrentSession_ === 'function' &&
      typeof mailboxFocusEvaluate_ === 'function') {
    try {
      const focusRegistry = mailboxFocusRegistryForCurrentSession_();
      if (focusRegistry) {
        focus = mailboxFocusEvaluate_(focusRegistry, {
          id: String(message.threadId || ''),
          sender: { email: senderEmail },
          subject,
          labelIds: Array.isArray(message.labelIds) ? message.labelIds : [],
        });
      }
    } catch (error) {
      console.error('Could not evaluate Telegram mail focus: ' + String(error && error.message || error || ''));
    }
  }
  const actionLinks = extractActionLinks_(message.html, message.unsubscribe);
  const sentDate = formatSentDate_(message.sentAt, message.timestamp);
  const gmailUrl =
    'https://mail.google.com/mail/?authuser=' + encodeURIComponent(accountEmail) +
    '#all/' + encodeURIComponent(message.threadId);

  const attachmentList = message.attachments.length
    ? message.attachments.slice(0, 8).map(file =>
        '• ' + escapeHtml_(file.name || 'вкладення') + ' (' + formatBytes_(file.size) + ')'
      ).join('\n') + (message.attachments.length > 8 ? '\n• …ще ' + (message.attachments.length - 8) : '')
    : 'немає';
  const facts = [];
  if (analysis.deadlines.length) facts.push('⏳ ' + analysis.deadlines.join(', '));
  if (analysis.amounts.length) facts.push('💳 ' + analysis.amounts.join(', '));

  const codeBlock = analysis.otpCodes.length
    ? '\n\n<b>Код</b>\n' + analysis.otpCodes.map(code =>
        '🔐 <code>' + escapeHtml_(code.display) + '</code>'
      ).join('\n')
    : '';
  const card =
    (accountEmail && (opts.showAccount || accountEmail !== CONFIG.GMAIL_ACCOUNT)
      ? '📮 <b>' + escapeHtml_(accountEmail) + '</b>\n'
      : '') +
    (focus && focus.priority !== 'none'
      ? '<b>' + escapeHtml_(telegramFocusDisplay_(focus)) + '</b>' +
        (focus.reason ? ' · ' + escapeHtml_(focus.reason) : '') + '\n\n'
      : '') +
    '<b>' + escapeHtml_(subject) + '</b>\n' +
    '<b>' + escapeHtml_(senderLabel) + '</b>' +
    (senderEmail ? '  ·  <code>' + escapeHtml_(senderEmail) + '</code>' : '') + '\n' +
    '<i>' + escapeHtml_(sentDate) + '</i>\n\n' +
    '<blockquote><b>Коротко українською</b>\n' +
    escapeHtml_(analysis.essence || 'У листі немає доступного тексту для аналізу.') + '</blockquote>\n' +
    analysis.importance.icon + ' <b>' + escapeHtml_(analysis.importance.level) + '</b> · ' +
    escapeHtml_(analysis.importance.reason) +
    (analysis.action ? '\n\n<b>Дія</b>\n' + escapeHtml_(analysis.action) : '') +
    (facts.length ? '\n\n' + facts.map(escapeHtml_).join('\n') : '') +
    codeBlock +
    (message.attachments.length ? '\n\n<b>📎 Вкладення</b>\n' + attachmentList : '');

  const replyMarkup = buildMailKeyboard_(
    gmailUrl,
    senderEmail,
    analysis.otpCodes,
    message.id,
    message.unsubscribe,
    message.threadId,
    message.labelIds,
    telegramDownloadableAttachments_(message),
    actionLinks,
    String(opts.account && opts.account.id || ''),
    focus
  );
  const senderPhoto = getSenderPhoto_(senderEmail);
  const gmailState = telegramMailStateFromLabelIds_(message.labelIds || []);
  const cardTopic = String(opts.topic || gmailState.folder || 'inbox');
  const sendOptions = {
    chatId: /^\d{1,24}$/.test(String(opts.chatId || '')) ? String(opts.chatId) : '',
    threadId: /^\d{1,24}$/.test(String(opts.chatId || '')) &&
      String(opts.chatId) !== String(PropertiesService.getScriptProperties().getProperty('CHAT_ID') || '')
      ? 0 : telegramTopicId_(cardTopic),
    silent: Boolean(opts.silent),
  };
  let deliveryReservation = null;
  if (typeof PropertiesService !== 'undefined' && typeof LockService !== 'undefined') {
    const targetChatId = String(sendOptions.chatId || PropertiesService.getScriptProperties().getProperty('CHAT_ID') || '');
    deliveryReservation = reserveTelegramMailCardDelivery_({
      chatId: targetChatId,
      userId: String(opts.userId || targetChatId),
      connectionId: String(opts.account && opts.account.id || ''),
      gmailMessageId: message.id,
      gmailThreadId: message.threadId,
      messageThreadId: Number(sendOptions.threadId || 0),
      topic: cardTopic,
      replyMarkup,
      gmailState,
      seenPropertyName: String(opts.seenPropertyName || 'SEEN_MESSAGE_IDS'),
    });
    // A previous send may have completed and been registered just before the
    // execution stopped, while SEEN_MESSAGE_IDS was not yet updated. Reuse the
    // durable card instead of sending a duplicate notification.
    if (deliveryReservation && deliveryReservation.alreadyRegistered) {
      return { message_id: Number(deliveryReservation.card.telegramMessageId), reused: true };
    }
    if (deliveryReservation && deliveryReservation.outcomeUncertain) {
      return { message_id: 0, reused: true, uncertain: true };
    }
  }
  let mainMessage;
  try {
    if (senderPhoto && htmlVisibleLength_(card) <= 950) {
      mainMessage = sendTelegramPhoto_(senderPhoto, card, replyMarkup, sendOptions);
    } else {
      mainMessage = sendTelegramText_(card, replyMarkup, sendOptions);
    }
  } catch (sendError) {
    if (deliveryReservation) {
      if (sendError && sendError.telegramOutcomeUncertain) {
        try {
          markTelegramMailCardDeliveryUncertain_(deliveryReservation, sendError);
          return { message_id: 0, uncertain: true };
        } catch (uncertainError) {
          // Keeping the original reservation is safer than deleting it: a
          // transport loss may have created the Telegram card already.
          console.error('Could not persist uncertain Telegram delivery: ' + uncertainError);
          return { message_id: 0, uncertain: true, durabilityWarning: true };
        }
      } else {
        try { cancelTelegramMailCardDelivery_(deliveryReservation); }
        catch (cancelError) { console.error('Could not release failed Telegram delivery reservation: ' + cancelError); }
      }
    }
    throw sendError;
  }
  if (deliveryReservation) {
    try {
      finalizeTelegramMailCardDelivery_(deliveryReservation, mainMessage);
    } catch (finalizeError) {
      // Never accept an externally visible but unregistered card. If the local
      // promotion cannot be committed, compensate with an idempotent delete and
      // leave the Gmail message unseen so the timer retries from a clean state.
      let deleted = false;
      try {
        telegramRequest_('deleteMessage', {
          chat_id: String(deliveryReservation.chatId || ''),
          message_id: Number(mainMessage && mainMessage.message_id || 0),
        });
        deleted = true;
      } catch (deleteError) {
        if (telegramDeleteAlreadyApplied_(deleteError)) deleted = true;
        else console.error('Could not compensate an unregistered Telegram card: ' + deleteError);
      }
      if (deleted) {
        try { cancelTelegramMailCardDelivery_(deliveryReservation); }
        catch (cancelError) { console.error('Could not clear compensated Telegram reservation: ' + cancelError); }
      } else {
        try {
          markTelegramMailCardDeliveryUncertain_(
            deliveryReservation,
            finalizeError,
            Number(mainMessage && mainMessage.message_id || 0)
          );
        } catch (uncertainError) {
          console.error('Could not quarantine unregistered Telegram card: ' + uncertainError);
        }
        return { message_id: 0, uncertain: true, durabilityWarning: true };
      }
      throw finalizeError;
    }
  } else {
    // Formatting-only unit contexts do not provide Apps Script storage. Live
    // Apps Script always uses the durable reservation branch above.
    recordTelegramMailCard_(message, mainMessage, replyMarkup, cardTopic, {
      chatId: String(sendOptions.chatId || ''),
      userId: String(opts.userId || sendOptions.chatId || ''),
      connectionId: String(opts.account && opts.account.id || ''),
    });
  }
  return mainMessage;
}

/**
 * Some multipart/alternative messages ship a deliberately tiny text/plain
 * fallback while the complete letter lives in text/html. Analyse the richer
 * representation so codes, sums, dates and required actions are not lost.
 */
function selectAnalysisBody_(plain, html, snippet) {
  const plainText = cleanBodyForAnalysis_(plain);
  const htmlText = cleanBodyForAnalysis_(htmlToText_(html));
  if (!plainText) return htmlText || cleanBodyForAnalysis_(snippet);
  if (!htmlText) return plainText || cleanBodyForAnalysis_(snippet);

  const plainScore = analysisBodyRichness_(plainText);
  const htmlScore = analysisBodyRichness_(htmlText);
  return htmlScore > plainScore + 80 ? htmlText : plainText;
}

function analysisBodyRichness_(text) {
  const value = String(text || '');
  let score = Math.min(value.length, 12000);
  if (/(?:code|код|otp|pin|passcode|verification|verificatie|bevestigingscode)/i.test(value)) score += 500;
  if (/[€$£₴]\s?\d|\d\s?(?:eur|usd|uah|gbp|грн|euro)/i.test(value)) score += 250;
  if (/\b(?:today|tomorrow|сьогодні|завтра)\b|\b\d{1,2}[:.]\d{2}\b|\b\d{1,2}[./-]\d{1,2}/i.test(value)) score += 200;
  if (/(?:please|must|required|confirm|verify|review|reply|потрібно|необхідно|підтверд|перевір)/i.test(value)) score += 200;
  return score;
}

function stripBidiControls_(value) {
  return String(value || '')
    .replace(/[\u0000-\u001F\u007F\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function canonicalPublicHttpsIdentity_(candidate) {
  const safe = isSafePublicHttpsUrl_(candidate);
  if (!safe) return '';
  try {
    const parsed = new URL(safe);
    const normalizePercent = value => String(value || '').replace(/%([0-9a-f]{2})/gi, (all, hex) => {
      const character = String.fromCharCode(parseInt(hex, 16));
      return /^[A-Za-z0-9._~-]$/.test(character) ? character : '%' + String(hex).toUpperCase();
    });
    const port = parsed.port && parsed.port !== '443' ? ':' + parsed.port : '';
    return 'https://' + String(parsed.hostname || '').toLowerCase().replace(/\.$/, '') + port +
      normalizePercent(parsed.pathname || '/') + normalizePercent(parsed.search || '');
  } catch (error) {
    return '';
  }
}

function extractActionLinks_(html, unsubscribe) {
  const source = String(html || '').slice(0, 250000);
  if (!source) return [];
  const blocked = new Set([
    String(unsubscribe && unsubscribe.url || ''),
    String(unsubscribe && unsubscribe.openUrl || ''),
  ].map(canonicalPublicHttpsIdentity_).filter(Boolean));
  const result = [];
  const seen = new Set();
  const pattern = /<a\b([^>]*)>([\s\S]*?)<\/a\s*>/gi;
  let match;
  while ((match = pattern.exec(source)) !== null && result.length < 3) {
    const hrefMatch = String(match[1] || '').match(
      /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i
    );
    const candidate = decodeHtmlEntities_(hrefMatch && (hrefMatch[1] || hrefMatch[2] || hrefMatch[3]) || '');
    const url = isSafePublicHttpsUrl_(candidate);
    const identity = canonicalPublicHttpsIdentity_(url);
    if (!url || !identity || blocked.has(identity) || seen.has(identity) ||
        /(?:unsubscribe|opt[-_ ]?out|відпис|pixel|track(?:ing)?|open\.gif)/i.test(url)) continue;
    let label = stripBidiControls_(htmlToText_(match[2] || ''));
    if (!label || /^(?:click here|here|learn more|read more|open|перейти|докладніше)$/i.test(label)) {
      label = 'Відкрити посилання';
    }
    let domain = '';
    try { domain = String(new URL(url).hostname || '').replace(/^www\./i, ''); }
    catch (error) { domain = ''; }
    label = makePreview_(label, 32);
    const text = ('↗ ' + (domain ? domain + ' · ' : '') + label).slice(0, 64);
    result.push({ text, url });
    seen.add(identity);
  }
  return result;
}

function telegramAttachmentButtonText_(entry, index) {
  const attachment = entry && entry.attachment || entry || {};
  const rawName = stripBidiControls_(attachment.name || 'вкладення ' + (Number(index) + 1));
  const name = makePreview_(rawName, 38);
  const size = Number(attachment.size || 0) > 0 ? ' · ' + formatBytes_(attachment.size) : '';
  return ('📎 ' + name + size).slice(0, 64);
}

function buildMailKeyboard_(gmailUrl, senderEmail, otpCodes, gmailMessageId, unsubscribe, threadId, labelIds, attachments, actionLinks, connectionId, focusValue) {
  const rows = [];
  const labels = new Set(labelIds || []);
  const boundedActionLinks = (actionLinks || []).slice(0, 3).map(link => ({
    text: stripBidiControls_(link && link.text || '↗ Відкрити посилання').slice(0, 64),
    url: isSafePublicHttpsUrl_(link && link.url),
  })).filter(link => link.url);
  let unsubscribeWebButton = null;
  (otpCodes || []).slice(0, 3).forEach(code => {
    rows.push([{
      text: '📋 Скопіювати код ' + code.display,
      copy_text: { text: code.value },
    }]);
  });
  if (threadId) {
    rows.push([
      {
        text: '📖 Лист · гілка · відповідь',
        web_app: { url: mailboxAppUrl_('thread', threadId, gmailMessageId) },
      },
      {
        text: '🏷 Мітки',
        web_app: { url: mailboxAppUrl_('thread', threadId, gmailMessageId, 'labels') },
      },
    ]);
  }
  rows.push([{ text: '📨 Відкрити в Gmail', url: gmailUrl }]);
  const actionInsertAt = rows.length;
  const secondary = [];
  if (senderEmail) {
    secondary.push({ text: '📋 Email', copy_text: { text: senderEmail } });
  }
  if (gmailMessageId) {
    secondary.push({
      text: '📄 Оригінал у чаті',
      callback_data: mailboxContentCallbackData_('original', gmailMessageId, connectionId),
    });
    secondary.push({
      text: '📎 Оригінал .eml',
      callback_data: mailboxContentCallbackData_('eml', gmailMessageId, connectionId),
    });
  }
  if (secondary.length) rows.push(secondary);
  const downloadable = (attachments || []).slice(0, 4);
  downloadable.forEach((entry, index) => {
    rows.push([{
      text: telegramAttachmentButtonText_(entry, index),
      callback_data: attachmentCallbackData_(gmailMessageId, index, connectionId),
    }]);
  });
  if ((attachments || []).length > downloadable.length && threadId) {
    rows.push([{
      text: '📎 Ще ' + ((attachments || []).length - downloadable.length) + ' вкладень',
      web_app: { url: mailboxAppUrl_('thread', threadId, gmailMessageId) },
    }]);
  }
  if (gmailMessageId) {
    if (connectionId) {
      rows.push([{
        text: telegramFocusDisplay_(focusValue),
        callback_data: telegramFocusCallbackData_('menu', gmailMessageId, connectionId),
      }]);
    }
    rows.push([
      {
        text: labels.has('STARRED') ? '⭐ Зняти зірочку' : '☆ Позначити',
        callback_data: mailboxCallbackData_(labels.has('STARRED') ? 'unstar' : 'star', gmailMessageId, connectionId),
      },
      {
        text: labels.has('UNREAD') ? '✅ Прочитано' : '📩 Непрочитано',
        callback_data: mailboxCallbackData_(labels.has('UNREAD') ? 'read' : 'unread', gmailMessageId, connectionId),
      },
    ]);
    rows.push([
      {
        text: labels.has('IMPORTANT') ? '❕ Зняти важливість' : '❗ Важливий',
        callback_data: mailboxCallbackData_(labels.has('IMPORTANT') ? 'notImportant' : 'important', gmailMessageId, connectionId),
      },
      {
        text: '🗄 Архівувати',
        callback_data: mailboxCallbackData_('archive', gmailMessageId, connectionId),
      },
    ]);
    const moderation = [{
      text: '⚠️ У спам',
      callback_data: mailboxCallbackData_('spam', gmailMessageId, connectionId),
    }, {
      text: '⚠️ До кошика',
      callback_data: mailboxCallbackData_('trash', gmailMessageId, connectionId),
    }];
    let unsubscribeButtonAdded = false;
    if (unsubscribe && unsubscribe.available) {
      if (unsubscribe.mode === 'one_click') {
        moderation.push({
          text: '🔕 Відписатися',
          callback_data: mailboxCallbackData_('unsubscribe', gmailMessageId, connectionId),
        });
        unsubscribeButtonAdded = true;
      } else {
        const unsubscribeUrl = isSafePublicHttpsUrl_(unsubscribe.openUrl);
        if (unsubscribeUrl) {
          unsubscribeWebButton = { text: '🔕 Відписатися', url: unsubscribeUrl };
          moderation.push(unsubscribeWebButton);
          unsubscribeButtonAdded = true;
        }
      }
    }
    if (!unsubscribeButtonAdded) {
      moderation.push({
        text: '▫️ Відписка недоступна',
        callback_data: BOT_UI.UNSUBSCRIBE_UNAVAILABLE_ACTION,
      });
    }
    rows.push(moderation);
    if (unsubscribeButtonAdded || moderation.length > 2) {
      const unsubscribeAction = moderation.splice(2);
      if (unsubscribeAction.length) rows.push(unsubscribeAction);
    }
  }
  let serialized = JSON.stringify({ inline_keyboard: rows });
  if (utf8ByteLength_(serialized) > CONFIG.TELEGRAM_MAIL_REPLY_MARKUP_MAX_BYTES && unsubscribeWebButton) {
    delete unsubscribeWebButton.url;
    if (threadId) {
      unsubscribeWebButton.text = '🔕 Відписатися у листі';
      unsubscribeWebButton.web_app = { url: mailboxAppUrl_('thread', threadId, gmailMessageId) };
    } else {
      unsubscribeWebButton.text = '▫️ Відписка недоступна';
      unsubscribeWebButton.callback_data = BOT_UI.UNSUBSCRIBE_UNAVAILABLE_ACTION;
    }
    serialized = JSON.stringify({ inline_keyboard: rows });
  }

  let insertedActionRows = 0;
  let omittedActionRows = 0;
  boundedActionLinks.forEach(link => {
    const row = [{ text: link.text || '↗ Відкрити посилання', url: link.url }];
    rows.splice(actionInsertAt + insertedActionRows, 0, row);
    const candidate = JSON.stringify({ inline_keyboard: rows });
    if (utf8ByteLength_(candidate) > CONFIG.TELEGRAM_MAIL_REPLY_MARKUP_MAX_BYTES) {
      rows.splice(actionInsertAt + insertedActionRows, 1);
      omittedActionRows += 1;
    } else {
      serialized = candidate;
      insertedActionRows += 1;
    }
  });
  if (omittedActionRows && threadId) {
    const overflowRow = [{
      text: '↗ Інші посилання в оригіналі',
      web_app: { url: mailboxAppUrl_('thread', threadId, gmailMessageId) },
    }];
    rows.splice(actionInsertAt + insertedActionRows, 0, overflowRow);
    const candidate = JSON.stringify({ inline_keyboard: rows });
    if (utf8ByteLength_(candidate) <= CONFIG.TELEGRAM_MAIL_REPLY_MARKUP_MAX_BYTES) {
      serialized = candidate;
    } else {
      rows.splice(actionInsertAt + insertedActionRows, 1);
    }
  }
  serialized = JSON.stringify({ inline_keyboard: rows });
  if (utf8ByteLength_(serialized) > CONFIG.TELEGRAM_MAIL_REPLY_MARKUP_MAX_BYTES) {
    throw new Error('Telegram keyboard exceeds its safe durable size budget.');
  }
  return serialized;
}

function sendFullOriginalForMessage_(messageId, replyTo, threadId, chatId) {
  try {
    const message = getGmailMessage_(messageId);
    sendFullOriginal_(message, replyTo, threadId, chatId);
    return { message: 'Оригінал відкрито в чаті' };
  } catch (error) {
    console.error('Full original delivery failed: ' + error);
    sendTelegramText_(
      '⚠️ Не вдалося показати оригінал листа. Скористайтеся Mini App або файлом <b>.eml</b>.',
      null,
      { chatId, replyTo, threadId, silent: true }
    );
    throw error;
  }
}

function sendFullOriginal_(message, replyTo, threadId, chatId) {
  const rendered = renderEmailOriginal_(message.html, message.plain);
  const chunks = splitRichBlocks_(rendered.blocks);
  if (!chunks.length) {
    sendTelegramText_(
      '<b>📄 Оригінал листа</b>\n\nТекстової версії немає. ' +
      'Скористайтеся кнопкою <b>«Оригінал .eml»</b>.',
      null,
      { chatId, replyTo, threadId, silent: true }
    );
    return;
  }

  chunks.forEach((chunk, index) => {
    const part = chunks.length > 1 ? ' — частина ' + (index + 1) + '/' + chunks.length : '';
    const richHtml =
      '<details><summary>📄 Оригінал листа' + escapeHtml_(part) + '</summary>' +
      chunk + '</details>';
    try {
      sendTelegramRich_(richHtml, null, { chatId, replyTo, threadId, silent: true });
    } catch (error) {
      console.error('sendRichMessage failed, using regular fallback: ' + error);
      const regular = richHtmlToTelegramHtml_(chunk);
      splitSafeRichHtml_(regular, 3400).forEach((fallbackChunk, fallbackIndex) => {
        sendTelegramText_(
          '<b>📄 Оригінал листа' + escapeHtml_(part) +
          (fallbackIndex ? ' · продовження' : '') + '</b>\n\n' + fallbackChunk,
          null,
          { chatId, replyTo, threadId, silent: true }
        );
      });
    }
  });
}

function telegramDownloadableAttachments_(message) {
  const regular = (message && message.attachments || []).map(item => ({
    attachment: item,
    inline: false,
  }));
  const inline = (message && message.inlineAttachments || []).map(item => ({
    attachment: item,
    inline: true,
  }));
  return regular.concat(inline).slice(0, 100);
}

function sendAttachmentByIndex_(messageId, index, replyTo, threadId, chatId) {
  const message = getGmailMessage_(messageId);
  const selected = telegramDownloadableAttachments_(message)[Number(index)];
  if (!selected || !selected.attachment) {
    throw new Error('Це вкладення більше не доступне в поточній версії листа.');
  }
  const delivery = sendAttachmentSafely_(
    messageId,
    selected.attachment,
    message.subject || '(без теми)',
    replyTo,
    selected.inline,
    threadId,
    chatId
  );
  return delivery && delivery.sent
    ? { message: 'Вкладення надіслано в чат' }
    : { message: 'Вкладення завелике для Telegram; відкрийте його в Gmail' };
}

function sendAttachmentSafely_(messageId, attachment, subject, replyTo, isInline, threadId, chatId) {
  if (attachment.size > CONFIG.MAX_ATTACHMENT_BYTES) {
    sendTelegramText_(
      '⚠️ Вкладення <b>' + escapeHtml_(attachment.name || 'без назви') +
      '</b> завелике для пересилання (' + formatBytes_(attachment.size) + '). ' +
      'Воно залишається доступним у Gmail.',
      null,
      { chatId, replyTo, threadId, silent: true }
    );
    return { sent: false, reason: 'too_large' };
  }

  try {
    const bytes = readPartBytes_(messageId, attachment);
    const fallbackName = isInline ? 'inline-image' : 'attachment';
    const blob = Utilities.newBlob(
      bytes,
      attachment.mimeType || 'application/octet-stream',
      attachment.name || fallbackName
    );
    const caption = (isInline ? 'Зображення з оригіналу: ' : 'Вкладення до: ') + subject;
    if (isInline && /^image\/(?:jpeg|png|gif|webp)$/i.test(attachment.mimeType || '')) {
      try {
        sendTelegramPhoto_(blob, escapeHtml_(caption.slice(0, 900)), null, {
          replyTo,
          threadId,
          chatId,
          silent: true,
        });
        return { sent: true, via: 'photo' };
      } catch (photoError) {
        console.error('Inline photo upload failed, using document: ' + photoError);
      }
    }
    sendTelegramDocument_(blob, caption.slice(0, 900), { chatId, replyTo, threadId, silent: true });
    return { sent: true, via: 'document' };
  } catch (error) {
    console.error('Attachment delivery failed: ' + error);
    throw error;
  }
}

function sendEmlForMessage_(messageId, replyTo, threadId, chatId) {
  try {
    const metadata = getGmailMessage_(messageId);
    const raw = gmailApi_('/messages/' + encodeURIComponent(messageId) + '?format=raw');
    const bytes = Utilities.base64DecodeWebSafe(raw.raw || '');
    if (bytes.length > CONFIG.MAX_EML_BYTES) {
      const gmailUrl =
        'https://mail.google.com/mail/?authuser=' + encodeURIComponent(CONFIG.GMAIL_ACCOUNT) +
        '#all/' + encodeURIComponent(metadata.threadId);
      sendTelegramText_(
        '⚠️ Точний оригінал завеликий для Telegram. ' +
        '<a href="' + escapeHtml_(gmailUrl) + '">Відкрити лист у Gmail</a>.',
        null,
        { chatId, replyTo, threadId, silent: true }
      );
      return;
    }
    const filename = safeFilename_(metadata.subject || 'email') + '.eml';
    const blob = Utilities.newBlob(bytes, 'message/rfc822', filename);
    sendTelegramDocument_(
      blob,
      'Точний MIME-оригінал листа. Відкривається у поштовій програмі.',
      { chatId, replyTo, threadId, silent: true }
    );
  } catch (error) {
    console.error('EML delivery failed: ' + error);
    sendTelegramText_(
      '⚠️ Не вдалося підготувати <code>.eml</code>. Лист залишається доступним у Gmail.',
      null,
      { chatId, replyTo, threadId, silent: true }
    );
  }
}

function listGmailNotificationPage_(scanValue) {
  const scan = scanValue || {};
  const lowerBoundMs = Number(scan.lowerBoundMs || 0);
  const upperBoundMs = Number(scan.upperBoundMs || 0);
  if (!Number.isFinite(lowerBoundMs) || !Number.isFinite(upperBoundMs) ||
      lowerBoundMs <= 0 || upperBoundMs < lowerBoundMs) {
    throw new Error('Некоректні межі Gmail notification scan.');
  }
  const afterSeconds = Math.max(0, Math.floor(lowerBoundMs / 1000) - 1);
  const beforeSeconds = Math.max(afterSeconds + 1, Math.ceil(upperBoundMs / 1000));
  const query = encodeURIComponent(
    'after:' + afterSeconds + ' before:' + beforeSeconds
  );
  // Freeze membership against ordinary mailbox actions. Archive, Spam and
  // Trash mutate labels while a multi-trigger scan is in flight; querying the
  // complete time slice and filtering current INBOX labels after messages.get
  // prevents those changes from shifting page offsets and hiding other IDs.
  let path = '/messages?q=' + query + '&includeSpamTrash=true&maxResults=' +
    CONFIG.GMAIL_NOTIFICATION_PAGE_SIZE;
  const currentPageToken = String(scan.pageToken || '');
  if (currentPageToken) path += '&pageToken=' + encodeURIComponent(currentPageToken);
  const data = gmailApi_(path) || {};
  const ids = [];
  (data.messages || []).forEach(message => {
    const id = String(message && message.id || '');
    if (/^[a-zA-Z0-9_-]{5,64}$/.test(id) && ids.indexOf(id) === -1) ids.push(id);
  });
  const nextPageToken = String(data.nextPageToken || '');
  if (nextPageToken && nextPageToken === currentPageToken) {
    const error = new Error('Gmail повернув повторний page token; scan буде безпечно перезапущено.');
    error.gmailPageTokenInvalid = true;
    throw error;
  }
  if (nextPageToken.length > 1024 || /[\u0000-\u0020\u007F]/.test(nextPageToken)) {
    const error = new Error('Gmail повернув некоректний page token.');
    error.gmailPageTokenInvalid = true;
    throw error;
  }
  return { ids, nextPageToken };
}

function listGmailMessageIds_(startedAt) {
  const query = encodeURIComponent(
    CONFIG.SEARCH_QUERY + ' after:' + Math.floor(startedAt / 1000)
  );
  const ids = [];
  const seenTokens = new Set();
  let pageToken = '';
  for (let page = 0; page < 10 && ids.length < CONFIG.SEEN_IDS_LIMIT; page += 1) {
    let path = '/messages?q=' + query + '&maxResults=100';
    if (pageToken) path += '&pageToken=' + encodeURIComponent(pageToken);
    const data = gmailApi_(path);
    (data.messages || []).forEach(message => {
      if (message && message.id && ids.indexOf(message.id) === -1) ids.push(message.id);
    });
    const next = String(data.nextPageToken || '');
    if (!next || seenTokens.has(next)) break;
    seenTokens.add(next);
    pageToken = next;
  }
  return ids.slice(0, CONFIG.SEEN_IDS_LIMIT);
}

function getGmailMessage_(id) {
  const data = gmailApi_('/messages/' + encodeURIComponent(id) + '?format=full');
  const headers = headersObject_(data.payload && data.payload.headers);
  const rawHeaders = (data.payload && data.payload.headers) || [];
  const mime = parseMimeTree_(id, data.payload || {});
  const html = mime.html || '';
  const plain = mime.plain || (html ? htmlToText_(html) : '');
  const complexMime = /multipart\/(?:signed|encrypted)|application\/(?:pkcs7|pgp)/i.test(
    String((data.payload || {}).mimeType || '') + ' ' + mime.mimeTypes.join(' ')
  );
  const complexHtml = /<(?:img|svg|canvas|video|audio|iframe|form)\b|background\s*:/i.test(html);

  return {
    id: data.id,
    threadId: data.threadId,
    labelIds: data.labelIds || [],
    unread: (data.labelIds || []).indexOf('UNREAD') !== -1,
    timestamp: Number(data.internalDate),
    sentAt: headers.date || '',
    from: headers.from || '',
    subject: headers.subject || '',
    snippet: data.snippet || '',
    plain,
    html,
    attachments: dedupeAttachments_(mime.attachments),
    inlineAttachments: dedupeAttachments_(mime.inlineAttachments),
    unsubscribe: unsubscribeInfoFromHeaders_(rawHeaders),
    needsEml: complexMime || complexHtml || !plain.trim(),
  };
}

function parseMimeTree_(messageId, rootPart) {
  const result = parseMimePart_(messageId, rootPart || {});
  return {
    plain: result.plain.join('\n\n').trim(),
    html: result.html.join('\n').trim(),
    attachments: result.attachments,
    inlineAttachments: result.inlineAttachments,
    mimeTypes: result.mimeTypes,
  };
}

function emptyMimeResult_() {
  return { plain: [], html: [], attachments: [], inlineAttachments: [], mimeTypes: [] };
}

function mergeMimeResult_(target, source) {
  target.plain = target.plain.concat(source.plain);
  target.html = target.html.concat(source.html);
  target.attachments = target.attachments.concat(source.attachments);
  target.inlineAttachments = target.inlineAttachments.concat(source.inlineAttachments);
  target.mimeTypes = target.mimeTypes.concat(source.mimeTypes);
  return target;
}

function parseMimePart_(messageId, part) {
  const out = emptyMimeResult_();
  const mimeType = String(part.mimeType || '').toLowerCase();
  out.mimeTypes.push(mimeType);
  const children = part.parts || [];

  if (mimeType === 'multipart/alternative' && children.length) {
    const alternatives = children.map(child => parseMimePart_(messageId, child));
    const htmlChoice = alternatives.slice().reverse().find(item => item.html.length);
    const plainChoice = alternatives.find(item => item.plain.length);
    if (htmlChoice) out.html = htmlChoice.html.slice();
    if (plainChoice) out.plain = plainChoice.plain.slice();
    alternatives.forEach(item => {
      out.attachments = out.attachments.concat(item.attachments);
      out.inlineAttachments = out.inlineAttachments.concat(item.inlineAttachments);
      out.mimeTypes = out.mimeTypes.concat(item.mimeTypes);
    });
    return out;
  }

  const body = part.body || {};
  const headers = headersObject_(part.headers);
  const filename = String(part.filename || '').trim();
  const disposition = String(headers['content-disposition'] || '');
  const contentId = String(headers['content-id'] || '').replace(/[<>]/g, '').trim();
  const isInline = /\binline\b/i.test(disposition) || Boolean(contentId);
  const hasPayload = Boolean(body.data || body.attachmentId);

  if ((mimeType === 'text/plain' || mimeType === 'text/html') && hasPayload && !filename) {
    const text = readPartText_(messageId, part);
    if (mimeType === 'text/html') out.html.push(text);
    else out.plain.push(text);
  } else if (hasPayload && (filename || isInline)) {
    const attachment = {
      partId: String(part.partId || ''),
      name: filename || (isInline ? 'inline-' + (contentId || Utilities.getUuid()) : 'attachment'),
      mimeType: mimeType || 'application/octet-stream',
      size: Number(body.size || 0),
      attachmentId: body.attachmentId || '',
      data: body.data || '',
      contentId,
      contentLocation: headers['content-location'] || '',
    };
    (isInline ? out.inlineAttachments : out.attachments).push(attachment);
  }

  children.forEach(child => mergeMimeResult_(out, parseMimePart_(messageId, child)));
  return out;
}

function readPartBytes_(messageId, part) {
  const encoded = part.data || (part.attachmentId
    ? gmailApi_(
        '/messages/' + encodeURIComponent(messageId) +
        '/attachments/' + encodeURIComponent(part.attachmentId)
      ).data
    : '');
  return Utilities.base64DecodeWebSafe(encoded || '');
}

function readPartText_(messageId, part) {
  const bytes = readPartBytes_(messageId, {
    data: (part.body || {}).data || '',
    attachmentId: (part.body || {}).attachmentId || '',
  });
  const headers = headersObject_(part.headers);
  const contentType = String(headers['content-type'] || part.mimeType || '');
  const match = contentType.match(/charset\s*=\s*["']?([^;"'\s]+)/i);
  const charset = match ? match[1].trim() : 'UTF-8';
  try {
    return Utilities.newBlob(bytes).getDataAsString(charset);
  } catch (error) {
    return Utilities.newBlob(bytes).getDataAsString('UTF-8');
  }
}

function headersObject_(headers) {
  const result = {};
  (headers || []).forEach(header => {
    result[String(header.name || '').toLowerCase()] = String(header.value || '');
  });
  return result;
}

function dedupeAttachments_(items) {
  const seen = new Set();
  return (items || []).filter(item => {
    const key = [item.attachmentId, item.data, item.contentId, item.name, item.size].join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Public contract used by MailClient.gs. This is intentionally explicit that
 * the schedule belongs to the bot: Gmail's public API offers `in:snoozed` for
 * search, but no supported endpoint for setting native Gmail Snooze.
 */
function botManagedSnoozeCapabilities_() {
  return {
    supported: true,
    mode: 'bot_managed',
    nativeGmail: false,
    requestField: 'snoozeUntil',
    requestFormat: 'unix_ms_integer',
    minDelayMs: CONFIG.BOT_SNOOZE_MIN_DELAY_MS,
    maxDelayMs: CONFIG.BOT_SNOOZE_MAX_DELAY_MS,
    labelName: BOT_SNOOZE_LABEL_NAME,
    repair: {
      requiredCount: botSnoozeRepairCount_(),
      folder: 'snoozed',
      action: 'inbox',
      description: 'Відкрийте «Відкладені» та натисніть «До вхідних».',
    },
  };
}

function botSnoozeError_(code, message) {
  const error = new Error(String(message || 'Не вдалося змінити відкладення листа.'));
  error.botSnoozeCode = String(code || 'SNOOZE_FAILED');
  return error;
}

function botSnoozeRequireGmailId_(value, fieldName) {
  const id = String(value || '');
  if (!/^[a-zA-Z0-9_-]{5,128}$/.test(id)) {
    throw botSnoozeError_('INVALID_SNOOZE', 'Некоректний Gmail ID у полі ' + fieldName + '.');
  }
  return id;
}

function botSnoozeRequireUntil_(value, nowValue) {
  const until = Number(value);
  const now = Number(nowValue || Date.now());
  if (typeof value !== 'number' || !Number.isSafeInteger(until)) {
    throw botSnoozeError_(
      'INVALID_SNOOZE_TIME',
      'snoozeUntil має бути цілим Unix-часом у мілісекундах.'
    );
  }
  if (until < now + CONFIG.BOT_SNOOZE_MIN_DELAY_MS ||
      until > now + CONFIG.BOT_SNOOZE_MAX_DELAY_MS) {
    throw botSnoozeError_(
      'INVALID_SNOOZE_TIME',
      'Час відкладення має бути в межах від 1 хвилини до 365 днів.'
    );
  }
  return until;
}

function botSnoozePropertyKey_(threadId) {
  return BOT_SNOOZE_PROPERTY_PREFIX +
    botSnoozeRequireGmailId_(threadId, 'threadId').slice(0, 128);
}

function botSnoozeOperationToken_() {
  if (typeof Utilities !== 'undefined' && Utilities && typeof Utilities.getUuid === 'function') {
    return String(Utilities.getUuid());
  }
  return String(Date.now()) + '-' + Math.random().toString(36).slice(2, 14);
}

function botSnoozeReadIndex_(props) {
  let values = [];
  try { values = JSON.parse(props.getProperty(BOT_SNOOZE_INDEX) || '[]'); }
  catch (error) { values = []; }
  const seen = new Set();
  return (Array.isArray(values) ? values : []).reduce((result, value) => {
    const key = String(value || '');
    if (!/^BOT_SNOOZE_V1_[a-zA-Z0-9_-]{5,128}$/.test(key) || seen.has(key)) return result;
    seen.add(key);
    result.push(key);
    return result;
  }, []);
}

function botSnoozeReadRecordByKey_(props, propertyKey) {
  let record = null;
  try { record = JSON.parse(props.getProperty(propertyKey) || 'null'); }
  catch (error) { record = null; }
  if (!record || record.version !== BOT_SNOOZE_STATE_VERSION) return null;
  try {
    if (botSnoozePropertyKey_(record.threadId) !== propertyKey) return null;
  } catch (error) {
    return null;
  }
  return record;
}

function botSnoozeReadRecord_(threadId) {
  const props = PropertiesService.getScriptProperties();
  return botSnoozeReadRecordByKey_(props, botSnoozePropertyKey_(threadId));
}

/**
 * Return every valid active record, including a record whose index update was
 * interrupted. Script Properties is small and bounded, so scanning its keys is
 * preferable to making a Gmail marker permanently undiscoverable.
 */
function botSnoozeAllActiveKeys_(props) {
  const seen = new Set();
  const candidates = botSnoozeReadIndex_(props).slice();
  if (props && typeof props.getProperties === 'function') {
    Object.keys(props.getProperties() || {}).forEach(key => {
      if (/^BOT_SNOOZE_V1_[a-zA-Z0-9_-]{5,128}$/.test(key)) candidates.push(key);
    });
  }
  return candidates.reduce((result, value) => {
    const key = String(value || '');
    if (seen.has(key) || !botSnoozeReadRecordByKey_(props, key)) return result;
    seen.add(key);
    result.push(key);
    return result;
  }, []);
}

function botSnoozeWriteRecordLocked_(props, record) {
  const normalized = Object.assign({}, record, {
    version: BOT_SNOOZE_STATE_VERSION,
    threadId: botSnoozeRequireGmailId_(record && record.threadId, 'threadId'),
    labelName: BOT_SNOOZE_LABEL_NAME,
    updatedAt: Number(record && record.updatedAt || Date.now()),
  });
  const propertyKey = botSnoozePropertyKey_(normalized.threadId);
  const originalIndex = botSnoozeAllActiveKeys_(props);
  const keys = originalIndex.filter(key => key !== propertyKey && props.getProperty(key) !== null);
  if (originalIndex.indexOf(propertyKey) !== -1 || props.getProperty(propertyKey) !== null) {
    keys.push(propertyKey);
  } else {
    if (keys.length >= CONFIG.BOT_SNOOZE_ACTIVE_HARD_LIMIT) {
      throw botSnoozeError_(
        'SNOOZE_CAPACITY',
        'Сховище відкладених листів тимчасово заповнене.'
      );
    }
    keys.push(propertyKey);
  }
  if (keys.length > CONFIG.BOT_SNOOZE_ACTIVE_HARD_LIMIT) {
    throw botSnoozeError_('SNOOZE_CAPACITY', 'Забагато активних відкладень.');
  }
  const indexJson = JSON.stringify(keys);
  const recordJson = JSON.stringify(normalized);
  assertTelegramPropertyValueFits_(BOT_SNOOZE_INDEX, indexJson);
  assertTelegramPropertyValueFits_(propertyKey, recordJson);
  assertTelegramPropertyStoreFits_(props, {
    [BOT_SNOOZE_INDEX]: indexJson,
    [propertyKey]: recordJson,
  });

  const previousIndexJson = props.getProperty(BOT_SNOOZE_INDEX);
  props.setProperty(BOT_SNOOZE_INDEX, indexJson);
  try {
    props.setProperty(propertyKey, recordJson);
  } catch (error) {
    // The preflight guards should make this exceptional. Best-effort rollback
    // keeps an index from claiming that an unpersisted schedule exists.
    try {
      if (previousIndexJson === null) deleteScriptProperty_(props, BOT_SNOOZE_INDEX);
      else props.setProperty(BOT_SNOOZE_INDEX, previousIndexJson);
    } catch (rollbackError) {
      console.error('Could not roll back bot snooze index: ' + rollbackError);
    }
    throw error;
  }
  return Object.assign({ propertyKey }, normalized);
}

function botSnoozeDeleteRecordLocked_(props, propertyKey, operationToken) {
  const current = botSnoozeReadRecordByKey_(props, propertyKey);
  if (!current) return false;
  if (operationToken && String(current.operationToken || '') !== String(operationToken)) return false;
  const keys = botSnoozeAllActiveKeys_(props).filter(key => key !== propertyKey);
  const indexJson = JSON.stringify(keys);
  assertTelegramPropertyValueFits_(BOT_SNOOZE_INDEX, indexJson);
  assertTelegramPropertyStoreFits_(props, { [BOT_SNOOZE_INDEX]: indexJson }, [propertyKey]);
  // Delete the schedule first. If the smaller index write unexpectedly fails,
  // the next reader safely prunes its stale key; the reverse order could lose
  // a live due schedule while leaving its Gmail label behind.
  deleteScriptProperty_(props, propertyKey);
  props.setProperty(BOT_SNOOZE_INDEX, indexJson);
  return true;
}

function botSnoozeRepairPropertyKey_(threadId) {
  return BOT_SNOOZE_REPAIR_PROPERTY_PREFIX +
    botSnoozeRequireGmailId_(threadId, 'threadId').slice(0, 128);
}

function botSnoozeReadRepairIndex_(props) {
  let values = [];
  try { values = JSON.parse(props.getProperty(BOT_SNOOZE_REPAIR_INDEX) || '[]'); }
  catch (error) { values = []; }
  const seen = new Set();
  return (Array.isArray(values) ? values : []).reduce((result, value) => {
    const key = String(value || '');
    if (!/^BOT_SNOOZE_REPAIR_V1_[a-zA-Z0-9_-]{5,128}$/.test(key) || seen.has(key)) {
      return result;
    }
    seen.add(key);
    result.push(key);
    return result;
  }, []);
}

function botSnoozeReadRepairByKey_(props, propertyKey) {
  let record = null;
  try { record = JSON.parse(props.getProperty(propertyKey) || 'null'); }
  catch (error) { record = null; }
  if (!record || record.version !== BOT_SNOOZE_STATE_VERSION || record.state !== 'repair_required') {
    return null;
  }
  try {
    if (botSnoozeRepairPropertyKey_(record.threadId) !== propertyKey) return null;
  } catch (error) {
    return null;
  }
  return record;
}

/** See botSnoozeAllActiveKeys_: repair records must survive a partial index write. */
function botSnoozeAllRepairKeys_(props) {
  const seen = new Set();
  const candidates = botSnoozeReadRepairIndex_(props).slice();
  if (props && typeof props.getProperties === 'function') {
    Object.keys(props.getProperties() || {}).forEach(key => {
      if (/^BOT_SNOOZE_REPAIR_V1_[a-zA-Z0-9_-]{5,128}$/.test(key)) candidates.push(key);
    });
  }
  return candidates.reduce((result, value) => {
    const key = String(value || '');
    if (seen.has(key) || !botSnoozeReadRepairByKey_(props, key)) return result;
    seen.add(key);
    result.push(key);
    return result;
  }, []);
}

function botSnoozeRepairProbe_(record) {
  return {
    version: BOT_SNOOZE_STATE_VERSION,
    state: 'repair_required',
    threadId: String(record && record.threadId || ''),
    labelName: BOT_SNOOZE_LABEL_NAME,
    repairAction: 'inbox',
    snoozeUntil: Number(record && record.snoozeUntil || Date.now()),
    labelId: 'L'.repeat(128),
    operationToken: 'o'.repeat(64),
    failedAt: Date.now(),
    attempts: 999999,
    // BMP characters model the larger UTF-8 representation allowed by the
    // actual 300/80-character truncation performed during dead-lettering.
    lastError: '\u0800'.repeat(300),
    repairReason: '\u0800'.repeat(80),
    updatedAt: Date.now(),
  };
}

/**
 * Backpressure new work before Gmail is mutated. The shared logical cap keeps
 * both maximum-length indices bounded, while the hypothetical repair write
 * proves that the durable store can hold the schedule and its recovery record
 * at the same time.
 */
function botSnoozeAssertRepairHeadroomLocked_(props, record, previous) {
  const propertyKey = botSnoozePropertyKey_(record.threadId);
  const repairPropertyKey = botSnoozeRepairPropertyKey_(record.threadId);
  const activeKeys = botSnoozeAllActiveKeys_(props).filter(key => key !== propertyKey);
  const repairKeys = botSnoozeAllRepairKeys_(props);
  const existingRepair = botSnoozeReadRepairByKey_(props, repairPropertyKey);
  if (existingRepair || previous && previous.state === 'repair_required') {
    throw botSnoozeError_(
      'SNOOZE_REPAIR_REQUIRED',
      'Спочатку поверніть цей лист до вхідних, щоб завершити попереднє відкладення.'
    );
  }

  const futureActiveKeys = activeKeys.concat(propertyKey);
  const futureRepairKeys = repairKeys.concat(repairPropertyKey);
  if (futureActiveKeys.length + repairKeys.length > CONFIG.BOT_SNOOZE_TRACKED_HARD_LIMIT ||
      futureRepairKeys.length > CONFIG.BOT_SNOOZE_REPAIR_HARD_LIMIT) {
    throw botSnoozeError_(
      'SNOOZE_CAPACITY',
      'Сховище відкладених листів тимчасово заповнене; спочатку відновіть один із них.'
    );
  }

  const normalized = Object.assign({}, record, {
    version: BOT_SNOOZE_STATE_VERSION,
    threadId: botSnoozeRequireGmailId_(record.threadId, 'threadId'),
    labelName: BOT_SNOOZE_LABEL_NAME,
    updatedAt: Number(record.updatedAt || Date.now()),
  });
  const activeIndexJson = JSON.stringify(futureActiveKeys);
  const activeRecordJson = JSON.stringify(normalized);
  const repairIndexJson = JSON.stringify(futureRepairKeys);
  const repairRecordJson = JSON.stringify(botSnoozeRepairProbe_(normalized));
  assertTelegramPropertyValueFits_(BOT_SNOOZE_INDEX, activeIndexJson);
  assertTelegramPropertyValueFits_(propertyKey, activeRecordJson);
  assertTelegramPropertyValueFits_(BOT_SNOOZE_REPAIR_INDEX, repairIndexJson);
  assertTelegramPropertyValueFits_(repairPropertyKey, repairRecordJson);
  assertTelegramPropertyStoreFits_(props, {
    [BOT_SNOOZE_INDEX]: activeIndexJson,
    [propertyKey]: activeRecordJson,
    [BOT_SNOOZE_REPAIR_INDEX]: repairIndexJson,
    [repairPropertyKey]: repairRecordJson,
  });
}

function botSnoozeWriteRepairLocked_(props, record) {
  const normalized = Object.assign({}, record, {
    version: BOT_SNOOZE_STATE_VERSION,
    state: 'repair_required',
    threadId: botSnoozeRequireGmailId_(record && record.threadId, 'threadId'),
    labelName: BOT_SNOOZE_LABEL_NAME,
    repairAction: 'inbox',
    updatedAt: Date.now(),
  });
  const propertyKey = botSnoozeRepairPropertyKey_(normalized.threadId);
  const existing = botSnoozeReadRepairByKey_(props, propertyKey);
  const keys = botSnoozeAllRepairKeys_(props).filter(key => key !== propertyKey);
  if (!existing && keys.length >= CONFIG.BOT_SNOOZE_REPAIR_HARD_LIMIT) {
    // Never evict unresolved metadata while its Gmail marker remains. The
    // caller keeps the terminal active record, which is itself user-repairable.
    throw botSnoozeError_(
      'SNOOZE_REPAIR_CAPACITY',
      'Черга відновлення відкладених листів заповнена.'
    );
  }
  keys.push(propertyKey);
  const indexJson = JSON.stringify(keys);
  const recordJson = JSON.stringify(normalized);
  assertTelegramPropertyValueFits_(BOT_SNOOZE_REPAIR_INDEX, indexJson);
  assertTelegramPropertyValueFits_(propertyKey, recordJson);
  assertTelegramPropertyStoreFits_(props, {
    [BOT_SNOOZE_REPAIR_INDEX]: indexJson,
    [propertyKey]: recordJson,
  });
  // Store the record first. If the following index write is interrupted,
  // botSnoozeAllRepairKeys_ rediscovers it by prefix on the next request.
  props.setProperty(propertyKey, recordJson);
  props.setProperty(BOT_SNOOZE_REPAIR_INDEX, indexJson);
  return Object.assign({ propertyKey }, normalized);
}

function botSnoozeDeleteRepairLocked_(props, propertyKey, operationToken) {
  const current = botSnoozeReadRepairByKey_(props, propertyKey);
  if (!current) return false;
  if (operationToken && String(current.operationToken || '') !== String(operationToken)) return false;
  const keys = botSnoozeAllRepairKeys_(props).filter(key => key !== propertyKey);
  const indexJson = JSON.stringify(keys);
  assertTelegramPropertyValueFits_(BOT_SNOOZE_REPAIR_INDEX, indexJson);
  assertTelegramPropertyStoreFits_(props, {
    [BOT_SNOOZE_REPAIR_INDEX]: indexJson,
  }, [propertyKey]);
  deleteScriptProperty_(props, propertyKey);
  props.setProperty(BOT_SNOOZE_REPAIR_INDEX, indexJson);
  return true;
}

/**
 * Move retryable work out of the legacy active slots. The original Gmail label
 * remains a visible repair queue, while Mini App exposes Inbox as the repair
 * action. The active record becomes terminal before any cleanup can fail, so
 * the timer can never execute an action that the RPC reported as failed.
 */
function botSnoozeMoveToRepairLocked_(props, current, reason, error) {
  const propertyKey = botSnoozePropertyKey_(current.threadId);
  const live = botSnoozeReadRecordByKey_(props, propertyKey);
  if (!live || String(live.operationToken || '') !== String(current.operationToken || '')) {
    return null;
  }
  live.state = 'repair_required';
  live.processingKind = 'deadletter';
  live.leaseUntil = 0;
  live.nextRetryAt = 0;
  live.lastError = String(error && error.message || error || live.lastError || '').slice(0, 300);
  live.repairReason = String(reason || 'retry_exhausted').slice(0, 80);
  live.updatedAt = Date.now();
  // Release the capacity reserved when this schedule was accepted before the
  // repair record is persisted. If that persistence still fails, this terminal
  // active record remains indexed and can be repaired through Inbox.
  delete live.repairCapacityPadding;
  const terminal = botSnoozeWriteRecordLocked_(props, live);
  const repair = botSnoozeWriteRepairLocked_(props, {
    threadId: terminal.threadId,
    snoozeUntil: Number(terminal.snoozeUntil || 0),
    labelId: String(terminal.labelId || ''),
    operationToken: botSnoozeOperationToken_(),
    failedAt: Date.now(),
    attempts: Number(terminal.attempts || 0),
    lastError: terminal.lastError,
    repairReason: terminal.repairReason,
  });
  botSnoozeDeleteRecordLocked_(props, terminal.propertyKey, terminal.operationToken);
  return repair;
}

function botSnoozeRepairCount_() {
  if (typeof PropertiesService === 'undefined') return 0;
  const props = PropertiesService.getScriptProperties();
  const threadIds = new Set();
  botSnoozeAllRepairKeys_(props).forEach(key => {
    const record = botSnoozeReadRepairByKey_(props, key);
    if (record) threadIds.add(String(record.threadId));
  });
  // A saturated repair registry deliberately leaves the terminal record in the
  // active ledger. Count it so status never understates marked Gmail threads.
  botSnoozeAllActiveKeys_(props).forEach(key => {
    const record = botSnoozeReadRecordByKey_(props, key);
    if (record && record.state === 'repair_required') threadIds.add(String(record.threadId));
  });
  return threadIds.size;
}

function withBotSnoozeLock_(callback) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    throw botSnoozeError_('SNOOZE_BUSY', 'Відкладення пошти зараз оновлюється. Спробуйте ще раз.');
  }
  try {
    return callback(PropertiesService.getScriptProperties());
  } finally {
    lock.releaseLock();
  }
}

function botSnoozeSafeLabel_(label) {
  const id = String(label && label.id || '');
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id) ||
      String(label && label.type || '').toLowerCase() !== 'user' ||
      String(label && label.name || '') !== BOT_SNOOZE_LABEL_NAME) return null;
  return { id, name: BOT_SNOOZE_LABEL_NAME };
}

function findBotManagedSnoozeLabel_() {
  const response = gmailApiRequest_('/labels', { method: 'get' });
  const match = (response.labels || []).map(botSnoozeSafeLabel_).find(Boolean);
  return match || null;
}

function ensureBotManagedSnoozeLabel_(beforeCreate) {
  const existing = findBotManagedSnoozeLabel_();
  if (existing) return existing;
  try {
    if (typeof beforeCreate === 'function') beforeCreate();
    const created = gmailApiRequest_('/labels', {
      method: 'post',
      body: {
        name: BOT_SNOOZE_LABEL_NAME,
        labelListVisibility: 'labelShow',
        messageListVisibility: 'show',
      },
    });
    const label = botSnoozeSafeLabel_(Object.assign({}, created, { type: created.type || 'user' }));
    if (!label) throw botSnoozeError_('SNOOZE_LABEL', 'Gmail повернув некоректну мітку відкладення.');
    return label;
  } catch (error) {
    // Another request may have won the create race. A read after conflict (or
    // an uncertain transport result) is safe and never changes a mail thread.
    if (Number(error && error.gmailHttpStatus || 0) === 409 ||
        error && error.gmailOutcomeUncertain === true) {
      const recovered = findBotManagedSnoozeLabel_();
      if (recovered) return recovered;
    }
    throw error;
  }
}

function botSnoozeAttachLabel_(preparation, label) {
  return withBotSnoozeLock_(props => {
    const propertyKey = String(preparation && preparation.propertyKey || '');
    const current = botSnoozeReadRecordByKey_(props, propertyKey);
    if (!current || String(current.operationToken || '') !== String(preparation.operationToken || '')) {
      throw botSnoozeError_('SNOOZE_BUSY', 'Операція відкладення вже змінилася.');
    }
    current.labelId = String(label && label.id || '');
    current.state = 'reserved';
    current.nextRetryAt = Date.now() + CONFIG.BOT_SNOOZE_LEASE_MS;
    current.lastError = '';
    current.updatedAt = Date.now();
    return botSnoozeWriteRecordLocked_(props, current);
  });
}

/** Persist the complete schedule before MailClient mutates the Gmail thread. */
function prepareBotManagedSnooze_(request) {
  const input = request || {};
  const threadId = botSnoozeRequireGmailId_(input.threadId, 'threadId');
  const snoozeUntil = botSnoozeRequireUntil_(input.snoozeUntil, Date.now());
  const existingLabel = findBotManagedSnoozeLabel_();
  const operationToken = botSnoozeOperationToken_();
  const reserved = withBotSnoozeLock_(props => {
    const propertyKey = botSnoozePropertyKey_(threadId);
    const previous = botSnoozeReadRecordByKey_(props, propertyKey);
    if (previous && (
      previous.state === 'processing' && Number(previous.leaseUntil || 0) > Date.now() ||
      ['reserved', 'label_pending', 'cancel_pending'].includes(previous.state) &&
        Number(previous.nextRetryAt || 0) > Date.now()
    )) {
      throw botSnoozeError_('SNOOZE_BUSY', 'Цей лист уже обробляється таймером.');
    }
    const now = Date.now();
    const record = {
      threadId,
      snoozeUntil,
      labelId: existingLabel ? existingLabel.id : '',
      state: existingLabel ? 'reserved' : 'label_pending',
      operationToken,
      createdAt: Number(previous && previous.createdAt || now),
      updatedAt: now,
      // Give the initiating RPC an exclusive window to perform its Gmail
      // mutation. If it crashes, the timer takes over after this short lease.
      nextRetryAt: now + CONFIG.BOT_SNOOZE_LEASE_MS,
      attempts: Number(previous && previous.attempts || 0),
      lastError: '',
      repairCapacityPadding: 'r'.repeat(CONFIG.BOT_SNOOZE_REPAIR_RESERVE_CHARS),
    };
    botSnoozeAssertRepairHeadroomLocked_(props, record, previous);
    const saved = botSnoozeWriteRecordLocked_(props, record);
    saved.rollbackRecord = previous ? Object.assign({}, previous) : null;
    return saved;
  });

  if (existingLabel) return reserved;
  try {
    return Object.assign(
      botSnoozeAttachLabel_(reserved, ensureBotManagedSnoozeLabel_()),
      { rollbackRecord: reserved.rollbackRecord }
    );
  } catch (error) {
    if (error && error.gmailOutcomeUncertain === true) {
      markBotManagedSnoozeUncertain_(reserved, error);
      error.botSnoozeRecoveryPending = true;
    } else {
      try {
        const rollback = rollbackBotManagedSnooze_(reserved);
        if (!(rollback === true || rollback && rollback.safe)) {
          error.botSnoozeRecoveryPending = true;
        }
      } catch (rollbackError) {
        console.error('Could not terminalize failed snooze preparation: ' + rollbackError);
        error.botSnoozeRecoveryPending = true;
      }
    }
    throw error;
  }
}

function activateBotManagedSnooze_(preparation) {
  return withBotSnoozeLock_(props => {
    const propertyKey = String(preparation && preparation.propertyKey || '');
    const current = botSnoozeReadRecordByKey_(props, propertyKey);
    if (!current || String(current.operationToken || '') !== String(preparation.operationToken || '')) {
      throw botSnoozeError_('SNOOZE_BUSY', 'Журнал відкладення вже змінився.');
    }
    current.state = 'scheduled';
    current.leaseUntil = 0;
    current.processingKind = '';
    current.nextRetryAt = 0;
    current.lastError = '';
    current.updatedAt = Date.now();
    return botSnoozeWriteRecordLocked_(props, current);
  });
}

function rollbackBotManagedSnooze_(preparation) {
  return withBotSnoozeLock_(props => {
    const propertyKey = String(preparation && preparation.propertyKey || '');
    const current = botSnoozeReadRecordByKey_(props, propertyKey);
    if (!current || String(current.operationToken || '') !== String(preparation.operationToken || '')) {
      return { safe: false, reason: 'superseded' };
    }
    if (preparation.rollbackRecord) {
      try {
        botSnoozeWriteRecordLocked_(props, preparation.rollbackRecord);
        return { safe: true, restored: true };
      } catch (restoreError) {
        const repair = botSnoozeMoveToRepairLocked_(
          props, current, 'rollback_storage_failure', restoreError
        );
        return { safe: Boolean(repair), repairRequired: Boolean(repair) };
      }
    }
    const repair = botSnoozeMoveToRepairLocked_(
      props, current, 'aborted_after_gmail_failure', 'Gmail rejected the snooze mutation.'
    );
    return { safe: Boolean(repair), repairRequired: Boolean(repair) };
  });
}

function markBotManagedSnoozeUncertain_(preparation, error) {
  return withBotSnoozeLock_(props => {
    const propertyKey = String(preparation && preparation.propertyKey || '');
    const current = botSnoozeReadRecordByKey_(props, propertyKey);
    if (!current || String(current.operationToken || '') !== String(preparation.operationToken || '')) {
      return false;
    }
    if (current.state !== 'label_pending') current.state = 'reserved';
    current.nextRetryAt = Date.now();
    current.lastError = String(error && error.message || error || '').slice(0, 300);
    current.updatedAt = Date.now();
    botSnoozeWriteRecordLocked_(props, current);
    return true;
  });
}

function markBotManagedSnoozeCancellationUncertain_(preparation, error) {
  if (!preparation || !preparation.required || preparation.source === 'repair') return false;
  return withBotSnoozeLock_(props => {
    const current = botSnoozeReadRecordByKey_(props, String(preparation.propertyKey || ''));
    if (!current || String(current.operationToken || '') !== String(preparation.operationToken || '')) {
      return false;
    }
    current.state = 'cancel_pending';
    current.nextRetryAt = Date.now();
    current.leaseUntil = 0;
    current.lastError = String(error && error.message || error || '').slice(0, 300);
    current.updatedAt = Date.now();
    botSnoozeWriteRecordLocked_(props, current);
    return true;
  });
}

/**
 * Inbox is the explicit inverse. The cancel intent is persisted before Gmail
 * receives add-INBOX/remove-label, so a timeout can be resolved by a later
 * read instead of repeating the user's unrelated mailbox actions.
 */
function prepareBotManagedSnoozeCancellation_(threadIdValue, targetActionValue) {
  const threadId = botSnoozeRequireGmailId_(threadIdValue, 'threadId');
  const cancelAction = ['inbox', 'trash', 'spam'].includes(String(targetActionValue || ''))
    ? String(targetActionValue)
    : 'inbox';
  return withBotSnoozeLock_(props => {
    const propertyKey = botSnoozePropertyKey_(threadId);
    const current = botSnoozeReadRecordByKey_(props, propertyKey);
    if (!current) {
      const repairPropertyKey = botSnoozeRepairPropertyKey_(threadId);
      const repair = botSnoozeReadRepairByKey_(props, repairPropertyKey);
      if (repair) {
        if (Number(repair.leaseUntil || 0) > Date.now()) {
          throw botSnoozeError_('SNOOZE_BUSY', 'Цей запис уже відновлюється.');
        }
        repair.operationToken = botSnoozeOperationToken_();
        repair.leaseUntil = Date.now() + CONFIG.BOT_SNOOZE_LEASE_MS;
        repair.pendingAction = cancelAction;
        const reservedRepair = botSnoozeWriteRepairLocked_(props, repair);
        return Object.assign({}, reservedRepair, {
          required: true,
          source: 'repair',
          propertyKey: repairPropertyKey,
          cancelAction,
        });
      }
      return {
        required: false,
        source: 'none',
        propertyKey,
        threadId,
        labelId: '',
        labelName: BOT_SNOOZE_LABEL_NAME,
      };
    }
    if (current.state === 'repair_required') {
      return Object.assign({}, current, {
        required: true,
        source: 'active_repair',
        propertyKey,
        cancelAction,
      });
    }
    if (current.state === 'processing' && Number(current.leaseUntil || 0) > Date.now() ||
        ['reserved', 'label_pending', 'cancel_pending'].includes(current.state) &&
          Number(current.nextRetryAt || 0) > Date.now()) {
      throw botSnoozeError_('SNOOZE_BUSY', 'Цей лист уже обробляється таймером.');
    }
    const rollbackRecord = Object.assign({}, current);
    current.state = 'cancel_pending';
    current.cancelAction = cancelAction;
    current.operationToken = botSnoozeOperationToken_();
    current.labelId = current.labelId || '';
    current.nextRetryAt = Date.now() + CONFIG.BOT_SNOOZE_LEASE_MS;
    current.lastError = '';
    current.updatedAt = Date.now();
    const saved = botSnoozeWriteRecordLocked_(props, current);
    saved.required = true;
    saved.source = 'active';
    saved.cancelAction = cancelAction;
    saved.rollbackRecord = rollbackRecord;
    return saved;
  });
}

function completeBotManagedSnoozeCancellation_(preparation) {
  if (!preparation || !preparation.required) return false;
  return withBotSnoozeLock_(props => {
    if (preparation.source === 'repair') {
      return botSnoozeDeleteRepairLocked_(
        props,
        String(preparation.propertyKey || ''),
        String(preparation.operationToken || '')
      );
    }
    return botSnoozeDeleteRecordLocked_(
      props,
      String(preparation.propertyKey || ''),
      String(preparation.operationToken || '')
    );
  });
}

function rollbackBotManagedSnoozeCancellation_(preparation) {
  if (!preparation || !preparation.required) return false;
  return withBotSnoozeLock_(props => {
    if (preparation.source === 'repair') {
      const repair = botSnoozeReadRepairByKey_(props, String(preparation.propertyKey || ''));
      if (!repair || String(repair.operationToken || '') !== String(preparation.operationToken || '')) {
        return { safe: false, reason: 'superseded' };
      }
      repair.leaseUntil = 0;
      repair.pendingAction = '';
      botSnoozeWriteRepairLocked_(props, repair);
      return { safe: true, restored: true };
    }
    if (preparation.source === 'active_repair') {
      return { safe: true, restored: true };
    }
    const current = botSnoozeReadRecordByKey_(props, String(preparation.propertyKey || ''));
    if (!current || String(current.operationToken || '') !== String(preparation.operationToken || '')) {
      return { safe: false, reason: 'superseded' };
    }
    if (!preparation.rollbackRecord) {
      const repair = botSnoozeMoveToRepairLocked_(
        props, current, 'cancel_rollback_missing', 'Cancellation rollback metadata was missing.'
      );
      return { safe: Boolean(repair), repairRequired: Boolean(repair) };
    }
    try {
      botSnoozeWriteRecordLocked_(props, preparation.rollbackRecord);
      return { safe: true, restored: true };
    } catch (restoreError) {
      const repair = botSnoozeMoveToRepairLocked_(
        props, current, 'cancel_rollback_storage_failure', restoreError
      );
      return { safe: Boolean(repair), repairRequired: Boolean(repair) };
    }
  });
}

/** Remove the private snooze marker after Gmail has confirmed Trash. */
function cleanupBotManagedSnoozeAfterDisposition_(preparation) {
  if (!preparation || !preparation.required || !preparation.labelId) {
    return completeBotManagedSnoozeCancellation_(preparation);
  }
  if (preparation.source === 'repair') {
    const renewed = withBotSnoozeLock_(props => {
      const current = botSnoozeReadRepairByKey_(props, String(preparation.propertyKey || ''));
      if (!current || String(current.operationToken || '') !== String(preparation.operationToken || '')) {
        throw botSnoozeError_('SNOOZE_SUPERSEDED', 'Новіша repair-операція замінила цю дію.');
      }
      current.operationToken = botSnoozeOperationToken_();
      current.leaseUntil = Date.now() + CONFIG.BOT_SNOOZE_LEASE_MS;
      return botSnoozeWriteRepairLocked_(props, current);
    });
    Object.assign(preparation, renewed);
    botSnoozeModifyThread_(preparation.threadId, [], [preparation.labelId]);
    return completeBotManagedSnoozeCancellation_(preparation);
  }

  const claim = withBotSnoozeLock_(props => {
    const current = botSnoozeReadRecordByKey_(props, String(preparation.propertyKey || ''));
    if (!current || String(current.operationToken || '') !== String(preparation.operationToken || '')) {
      throw botSnoozeError_('SNOOZE_SUPERSEDED', 'Новіша операція замінила очищення мітки.');
    }
    current.state = 'processing';
    current.processingKind = 'cancel';
    current.cancelAction = String(preparation.cancelAction || 'trash');
    current.operationToken = botSnoozeOperationToken_();
    current.leaseUntil = Date.now() + CONFIG.BOT_SNOOZE_LEASE_MS;
    current.updatedAt = Date.now();
    return botSnoozeWriteRecordLocked_(props, current);
  });
  try {
    botSnoozeModifyThreadForClaim_(claim, [], [claim.labelId]);
    return botSnoozeFinishWork_(claim);
  } catch (error) {
    botSnoozeReleaseWork_(claim, error);
    throw error;
  }
}

function botSnoozeThreadLabelSet_(thread) {
  const labels = new Set();
  (thread && thread.messages || []).forEach(message => {
    (message.labelIds || []).forEach(label => labels.add(String(label || '')));
  });
  return labels;
}

function botSnoozeClaimWork_(propertyKey, nowValue) {
  const now = Number(nowValue || Date.now());
  return withBotSnoozeLock_(props => {
    const current = botSnoozeReadRecordByKey_(props, propertyKey);
    if (!current || Number(current.nextRetryAt || 0) > now) return null;
    let kind = '';
    if (current.state === 'scheduled') {
      if (Number(current.snoozeUntil || 0) > now) return null;
      kind = 'wake';
    } else if (current.state === 'cancel_pending') {
      kind = 'cancel';
    } else if (current.state === 'reserved' || current.state === 'label_pending') {
      kind = 'apply';
    } else if (current.state === 'processing') {
      if (Number(current.leaseUntil || 0) > now) return null;
      kind = String(current.processingKind || 'apply');
    } else if (current.state === 'repair_required') {
      kind = 'deadletter';
    } else {
      return null;
    }
    current.state = 'processing';
    current.processingKind = kind;
    current.operationToken = botSnoozeOperationToken_();
    current.leaseUntil = now + CONFIG.BOT_SNOOZE_LEASE_MS;
    current.attempts = Math.max(0, Number(current.attempts || 0)) + 1;
    current.updatedAt = now;
    return botSnoozeWriteRecordLocked_(props, current);
  });
}

function botSnoozeRetryDelay_(attempts) {
  return Math.min(15 * 60 * 1000, Math.max(15 * 1000,
    Math.pow(2, Math.min(Math.max(0, Number(attempts || 1) - 1), 6)) * 15 * 1000));
}

function botSnoozeIsPermanentError_(error) {
  const status = Number(error && (error.gmailHttpStatus || error.httpStatus) || 0);
  return status >= 400 && status < 500 &&
    status !== 408 && status !== 425 && status !== 429;
}

function botSnoozeReleaseWork_(claim, error) {
  return withBotSnoozeLock_(props => {
    const current = botSnoozeReadRecordByKey_(props, String(claim && claim.propertyKey || ''));
    if (!current || String(current.operationToken || '') !== String(claim && claim.operationToken || '')) {
      return false;
    }
    if (botSnoozeIsPermanentError_(error) ||
        Number(current.attempts || 0) >= CONFIG.BOT_SNOOZE_MAX_ATTEMPTS) {
      const repair = botSnoozeMoveToRepairLocked_(
        props,
        current,
        botSnoozeIsPermanentError_(error) ? 'permanent_gmail_failure' : 'retry_exhausted',
        error
      );
      return { deadLettered: Boolean(repair), repairRequired: Boolean(repair) };
    }
    current.state = current.processingKind === 'deadletter'
      ? 'repair_required'
      : current.processingKind === 'wake'
      ? 'scheduled'
      : current.processingKind === 'cancel' ? 'cancel_pending' : (current.labelId ? 'reserved' : 'label_pending');
    current.leaseUntil = 0;
    current.nextRetryAt = Date.now() + botSnoozeRetryDelay_(current.attempts);
    current.lastError = String(error && error.message || error || '').slice(0, 300);
    current.updatedAt = Date.now();
    botSnoozeWriteRecordLocked_(props, current);
    return { retrying: true };
  });
}

function botSnoozeFinishWork_(claim) {
  return withBotSnoozeLock_(props => botSnoozeDeleteRecordLocked_(
    props,
    String(claim && claim.propertyKey || ''),
    String(claim && claim.operationToken || '')
  ));
}

function botSnoozeMarkScheduled_(claim, labelId) {
  return withBotSnoozeLock_(props => {
    const current = botSnoozeReadRecordByKey_(props, String(claim && claim.propertyKey || ''));
    if (!current || String(current.operationToken || '') !== String(claim && claim.operationToken || '')) {
      return false;
    }
    current.state = 'scheduled';
    current.labelId = String(labelId || current.labelId || '');
    current.leaseUntil = 0;
    current.processingKind = '';
    current.nextRetryAt = 0;
    current.lastError = '';
    current.updatedAt = Date.now();
    botSnoozeWriteRecordLocked_(props, current);
    return true;
  });
}

function botSnoozeRenewClaimBeforeMutation_(claim) {
  const renewed = withBotSnoozeLock_(props => {
    const current = botSnoozeReadRecordByKey_(props, String(claim && claim.propertyKey || ''));
    if (!current || current.state !== 'processing' ||
        String(current.operationToken || '') !== String(claim && claim.operationToken || '') ||
        String(current.processingKind || '') !== String(claim && claim.processingKind || '')) {
      throw botSnoozeError_(
        'SNOOZE_SUPERSEDED',
        'Новіша операція замінила цей таймер; Gmail не змінено.'
      );
    }
    current.operationToken = botSnoozeOperationToken_();
    current.leaseUntil = Date.now() + CONFIG.BOT_SNOOZE_LEASE_MS;
    current.updatedAt = Date.now();
    return botSnoozeWriteRecordLocked_(props, current);
  });
  Object.assign(claim, renewed);
  return claim;
}

function botSnoozeModifyThread_(threadId, addLabelIds, removeLabelIds) {
  const body = {};
  const add = Array.from(new Set((addLabelIds || []).filter(Boolean).map(String)));
  const remove = Array.from(new Set((removeLabelIds || []).filter(Boolean).map(String)))
    .filter(label => add.indexOf(label) === -1);
  if (add.length) body.addLabelIds = add;
  if (remove.length) body.removeLabelIds = remove;
  if (!add.length && !remove.length) return null;
  return gmailApiRequest_(
    '/threads/' + encodeURIComponent(threadId) + '/modify',
    { method: 'post', body }
  );
}

function botSnoozeModifyThreadForClaim_(claim, addLabelIds, removeLabelIds) {
  botSnoozeRenewClaimBeforeMutation_(claim);
  return botSnoozeModifyThread_(claim.threadId, addLabelIds, removeLabelIds);
}

function processBotSnoozeClaim_(claim) {
  let label = null;
  try {
    if (claim.processingKind === 'deadletter') {
      const repair = withBotSnoozeLock_(props => botSnoozeMoveToRepairLocked_(
        props,
        botSnoozeReadRecordByKey_(props, claim.propertyKey) || claim,
        claim.repairReason || 'terminal_cleanup',
        claim.lastError || 'Terminal snooze record requires repair.'
      ));
      return { status: repair ? 'repair_required' : 'superseded', mutated: false };
    }
    if (claim.processingKind === 'apply') {
      label = ensureBotManagedSnoozeLabel_(() => {
        botSnoozeRenewClaimBeforeMutation_(claim);
      });
    } else if (claim.labelId) {
      label = { id: String(claim.labelId), name: BOT_SNOOZE_LABEL_NAME };
    } else {
      label = findBotManagedSnoozeLabel_();
    }

    const thread = gmailApiRequest_(
      '/threads/' + encodeURIComponent(claim.threadId) + '?format=minimal',
      { method: 'get' }
    );
    const labels = botSnoozeThreadLabelSet_(thread);
    const labelId = label && label.id || '';
    const hasMarker = Boolean(labelId && labels.has(labelId));
    const isInbox = labels.has('INBOX');
    const isDiscarded = labels.has('TRASH') || labels.has('SPAM');

    if (claim.processingKind === 'cancel') {
      const cancelAction = ['trash', 'spam'].includes(String(claim.cancelAction || ''))
        ? String(claim.cancelAction)
        : 'inbox';
      if (cancelAction === 'trash' || cancelAction === 'spam') {
        const confirmed = labels.has(cancelAction === 'trash' ? 'TRASH' : 'SPAM');
        if (!confirmed) {
          botSnoozeMarkScheduled_(claim, labelId);
          return { status: 'cancel_not_applied', mutated: false };
        }
        if (hasMarker) botSnoozeModifyThreadForClaim_(claim, [], [labelId]);
        botSnoozeFinishWork_(claim);
        return { status: 'discarded', mutated: hasMarker };
      }
      if (isDiscarded) {
        if (hasMarker) botSnoozeModifyThreadForClaim_(claim, [], [labelId]);
        botSnoozeFinishWork_(claim);
        return { status: 'discarded', mutated: hasMarker };
      }
      if (!isInbox || hasMarker) {
        botSnoozeModifyThreadForClaim_(claim, ['INBOX'], hasMarker ? [labelId] : []);
      }
      botSnoozeFinishWork_(claim);
      return { status: 'cancelled', mutated: !isInbox || hasMarker };
    }

    if (claim.processingKind === 'wake' || Number(claim.snoozeUntil || 0) <= Date.now()) {
      if (isDiscarded) {
        if (hasMarker) botSnoozeModifyThreadForClaim_(claim, [], [labelId]);
      } else if (!isInbox || hasMarker) {
        botSnoozeModifyThreadForClaim_(claim, ['INBOX'], hasMarker ? [labelId] : []);
      }
      botSnoozeFinishWork_(claim);
      return { status: isDiscarded ? 'discarded' : 'restored', mutated: hasMarker || !isInbox };
    }

    if (isDiscarded) {
      if (hasMarker) botSnoozeModifyThreadForClaim_(claim, [], [labelId]);
      botSnoozeFinishWork_(claim);
      return { status: 'discarded', mutated: hasMarker };
    }

    if (!hasMarker || isInbox) {
      botSnoozeModifyThreadForClaim_(claim, [labelId], ['INBOX']);
    }
    botSnoozeMarkScheduled_(claim, labelId);
    return { status: 'scheduled', mutated: !hasMarker || isInbox };
  } catch (error) {
    if (Number(error && error.gmailHttpStatus || 0) === 404) {
      botSnoozeFinishWork_(claim);
      return { status: 'missing', mutated: false };
    }
    botSnoozeReleaseWork_(claim, error);
    throw error;
  }
}

/** Bounded timer worker; every Gmail POST is preceded by a current-state GET. */
function processDueBotManagedSnoozes_(limit) {
  const max = Math.max(0, Math.min(Number(limit) || 10, 20));
  const props = PropertiesService.getScriptProperties();
  const keys = botSnoozeAllActiveKeys_(props).slice(0, CONFIG.BOT_SNOOZE_ACTIVE_HARD_LIMIT);
  let attempted = 0;
  let completed = 0;
  let failed = 0;
  keys.forEach(propertyKey => {
    if (attempted >= max) return;
    let claim = null;
    try { claim = botSnoozeClaimWork_(propertyKey, Date.now()); }
    catch (error) {
      failed += 1;
      return;
    }
    if (!claim) return;
    attempted += 1;
    try {
      const result = processBotSnoozeClaim_(claim);
      if (result && ['cancelled', 'restored', 'discarded', 'missing'].includes(result.status)) {
        completed += 1;
      }
    } catch (error) {
      failed += 1;
      console.error('Bot-managed snooze retry failed for ' + claim.threadId + ': ' + error);
    }
  });
  return { attempted, completed, failed };
}

function gmailApi_(path) {
  return gmailApiRequest_(path, { method: 'get' });
}

function gmailApiRequest_(path, options) {
  const opts = options || {};
  const oauthToken = mailboxCurrentSessionContext_
    ? mailboxMultiGmailAccessToken_(mailboxCurrentSessionContext_)
    : ScriptApp.getOAuthToken();
  const request = {
    method: String(opts.method || 'get').toLowerCase(),
    headers: { Authorization: 'Bearer ' + oauthToken },
    muteHttpExceptions: true,
  };
  if (Object.prototype.hasOwnProperty.call(opts, 'body')) {
    request.contentType = 'application/json';
    request.payload = JSON.stringify(opts.body);
  }
  let response;
  try {
    response = UrlFetchApp.fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me' + path,
      request
    );
  } catch (fetchError) {
    // A transport failure after a POST was dispatched cannot prove whether
    // Gmail applied it. Preserve that ambiguity for the read-only recovery
    // worker instead of cancelling the Telegram reconciliation reservation.
    fetchError.gmailOutcomeUncertain = request.method !== 'get';
    fetchError.gmailHttpStatus = 0;
    throw fetchError;
  }
  const text = response.getContentText();
  const code = response.getResponseCode();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch (error) { data = {}; }
  if (code >= 300) {
    console.error('Gmail API HTTP ' + code + ': ' + text);
    let error;
    if (code === 401 || code === 403) {
      error = new Error('Gmail не дозволив змінити лист. Потрібно оновити доступ бота.');
    } else if (code === 404) {
      error = new Error('Лист уже недоступний у цій поштовій скриньці.');
    } else if (code === 408 || code === 425 || code === 429 || code >= 500) {
      error = new Error('Gmail тимчасово недоступний. Спробуйте ще раз трохи пізніше.');
      error.gmailOutcomeUncertain = request.method !== 'get';
    } else {
      error = new Error('Gmail не виконав дію (HTTP ' + code + ').');
    }
    error.gmailHttpStatus = code;
    throw error;
  }
  return data;
}

function sendTelegramText_(html, replyMarkup, options) {
  const props = PropertiesService.getScriptProperties();
  const opts = options || {};
  const payload = {
    chat_id: /^\d{1,24}$/.test(String(opts.chatId || '')) ? String(opts.chatId) : props.getProperty('CHAT_ID'),
    text: html,
    parse_mode: 'HTML',
    link_preview_options: JSON.stringify({ is_disabled: true }),
    disable_notification: Boolean(opts.silent || isQuietHours_()),
  };
  if (replyMarkup) payload.reply_markup = replyMarkup;
  if (opts.replyTo) payload.reply_parameters = replyParameters_(opts.replyTo);
  if (opts.threadId) payload.message_thread_id = Number(opts.threadId);
  return telegramRequest_('sendMessage', payload);
}

function sendTelegramRich_(html, replyMarkup, options) {
  const props = PropertiesService.getScriptProperties();
  const opts = options || {};
  const payload = {
    chat_id: /^\d{1,24}$/.test(String(opts.chatId || '')) ? String(opts.chatId) : props.getProperty('CHAT_ID'),
    rich_message: JSON.stringify({ html, skip_entity_detection: false }),
    disable_notification: Boolean(opts.silent || isQuietHours_()),
  };
  if (replyMarkup) payload.reply_markup = replyMarkup;
  if (opts.replyTo) payload.reply_parameters = replyParameters_(opts.replyTo);
  if (opts.threadId) payload.message_thread_id = Number(opts.threadId);
  return telegramRequest_('sendRichMessage', payload);
}

function sendTelegramPhoto_(photo, caption, replyMarkup, options) {
  const props = PropertiesService.getScriptProperties();
  const opts = options || {};
  const payload = {
    chat_id: /^\d{1,24}$/.test(String(opts.chatId || '')) ? String(opts.chatId) : props.getProperty('CHAT_ID'),
    photo,
    caption,
    parse_mode: 'HTML',
    disable_notification: Boolean(opts.silent || isQuietHours_()),
  };
  if (replyMarkup) payload.reply_markup = replyMarkup;
  if (opts.replyTo) payload.reply_parameters = replyParameters_(opts.replyTo);
  if (opts.threadId) payload.message_thread_id = Number(opts.threadId);
  return telegramRequest_('sendPhoto', payload);
}

function sendTelegramDocument_(blob, caption, options) {
  const props = PropertiesService.getScriptProperties();
  const opts = options || {};
  const payload = {
    chat_id: /^\d{1,24}$/.test(String(opts.chatId || '')) ? String(opts.chatId) : props.getProperty('CHAT_ID'),
    document: blob,
    caption,
    disable_notification: Boolean(opts.silent || isQuietHours_()),
  };
  if (opts.replyTo) payload.reply_parameters = replyParameters_(opts.replyTo);
  if (opts.threadId) payload.message_thread_id = Number(opts.threadId);
  return telegramRequest_('sendDocument', payload);
}

function replyParameters_(messageId) {
  return JSON.stringify({ message_id: Number(messageId), allow_sending_without_reply: true });
}

function telegramMethodHasNonIdempotentCreate_(method) {
  return ['sendMessage', 'sendPhoto', 'sendDocument', 'sendRichMessage',
    'copyMessage', 'createForumTopic'].indexOf(String(method || '')) !== -1;
}

function telegramRequestError_(message, status, uncertain, cause) {
  const error = new Error(String(message || 'Telegram API request failed.'));
  error.telegramHttpStatus = Number(status || 0);
  error.telegramOutcomeUncertain = Boolean(uncertain);
  if (cause) error.telegramCause = String(cause && cause.message || cause).slice(0, 180);
  return error;
}

function telegramRequest_(method, payload) {
  const token = PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
  if (!token) throw new Error('Script Property BOT_TOKEN is missing.');
  const createsExternalObject = telegramMethodHasNonIdempotentCreate_(method);
  let response;
  try {
    response = UrlFetchApp.fetch(
      'https://api.telegram.org/bot' + token + '/' + method,
      {
        method: 'post',
        payload: payload || {},
        muteHttpExceptions: true,
      }
    );
  } catch (transportError) {
    throw telegramRequestError_(
      'Telegram transport error: ' + String(transportError && transportError.message || transportError),
      0,
      createsExternalObject,
      transportError
    );
  }
  const status = response && typeof response.getResponseCode === 'function'
    ? Number(response.getResponseCode() || 0) : 0;
  const text = response.getContentText();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (parseError) {
    throw telegramRequestError_(
      'Telegram returned an unreadable response.',
      status,
      createsExternalObject && (status === 0 || status < 400 || status >= 500),
      parseError
    );
  }
  if (!data.ok) {
    throw telegramRequestError_(
      'Telegram API error: ' + text,
      status,
      createsExternalObject && (status === 0 || status >= 500)
    );
  }
  return data.result;
}

/** Whole-message local analysis: every sentence competes for the summary. */
function analyzeMessage_(subject, body) {
  const source = cleanBodyForAnalysis_((subject ? subject + '. ' : '') + (body || ''));
  const sentences = splitSentences_(source).filter(sentence => !isBoilerplateSentence_(sentence));
  const subjectWords = new Set(
    String(subject || '').toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) || []
  );
  const otpCodes = extractOtpCodes_(subject + '\n' + body);
  const deadlines = extractDeadlines_(source);
  const amounts = extractAmounts_(source);
  const scored = sentences.map((sentence, index) => ({
    sentence,
    index,
    score: scoreSentence_(sentence, index, sentences.length, subjectWords),
  }));
  const selected = scored
    .filter(item => item.sentence.length >= 18)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 4)
    .sort((a, b) => a.index - b.index)
    .map(item => item.sentence);
  const essenceSource = selected.join(' ') || sentences.slice(0, 3).join(' ') || source;
  const normalizedSubject = String(subject || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const actionCandidates = scored
    .filter(item => isActionSentence_(item.sentence))
    .sort((a, b) => b.score - a.score);
  const actionCandidate = actionCandidates.find(item =>
    item.sentence.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim() !== normalizedSubject
  ) || actionCandidates[0];

  const importance = determineImportance_(source, otpCodes, deadlines, amounts, Boolean(actionCandidate));
  return {
    essence: makePreview_(translateToUkrainian_(essenceSource), CONFIG.MAX_SUMMARY_CHARS),
    action: actionCandidate
      ? makePreview_(translateToUkrainian_(actionCandidate.sentence), CONFIG.MAX_ACTION_CHARS)
      : '',
    importance,
    deadlines: deadlines.slice(0, 3),
    amounts: amounts.slice(0, 3),
    otpCodes,
  };
}

function splitSentences_(text) {
  const value = String(text || '').replace(/\r/g, '').trim();
  if (!value) return [];
  const decimalMarker = '\uE000';
  const protectedValue = value.replace(/(\d)\.(\d)/g, '$1' + decimalMarker + '$2');
  return (protectedValue.match(/[^.!?\n]+(?:[.!?]+|$)/g) || [protectedValue])
    .map(item => item.replace(new RegExp(decimalMarker, 'g'), '.').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .slice(0, 1000);
}

function scoreSentence_(sentence, index, total, subjectWords) {
  const lower = sentence.toLowerCase();
  let score = Math.max(0, 3 - index * 0.04);
  if (index > total * 0.25 && index < total * 0.85) score += 1;
  if (isActionSentence_(sentence)) score += 7;
  if (/(urgent|important|action required|термінов|важлив|негайно|deadline|due|expires?|overdue|security|безпек|verify|підтверд|payment|invoice|рахунок|оплат|appointment|зустріч|delivery|достав)/i.test(lower)) score += 6;
  if (/\b(?:today|tomorrow|сьогодні|завтра|vandaag|morgen)\b|\b\d{1,2}[:.]\d{2}\b|\b\d{1,2}[./-]\d{1,2}(?:[./-]\d{2,4})?\b/i.test(lower)) score += 4;
  if (/[€$£₴]\s?\d|\d\s?(?:eur|usd|uah|грн|euro)/i.test(lower)) score += 4;
  if (/(code|код|otp|pin|passcode|verification|verificatie|bevestigingscode)/i.test(lower)) score += 7;
  const words = lower.match(/[\p{L}\p{N}]{3,}/gu) || [];
  words.forEach(word => { if (subjectWords.has(word)) score += 1.5; });
  if (sentence.length > 40 && sentence.length < 260) score += 2;
  if (sentence.length > 500) score -= 4;
  return score;
}

function isActionSentence_(sentence) {
  const value = String(sentence || '');
  if (/(?:no|not)\s+(?:further\s+)?(?:action|response|reply)\s+(?:is\s+)?required|no\s+need\s+to|(?:дій|відповіді)\s+не\s+потрібно|нічого\s+робити\s+не\s+потрібно/i.test(value)) {
    return false;
  }
  return /\b(?:please|kindly|must|required|click|confirm|verify|complete|reply|respond|pay|download|sign|update)\b|\bneed\s+to\b|(?:будь ласка|потрібно|необхідно|натисніть|підтверд|сплат|завантаж|підпиш|відпові|перевір|gelieve|moet|bevestig|betaal|cliquez|confirmez|veuillez)/i.test(value);
}

function isBoilerplateSentence_(sentence) {
  const lower = String(sentence || '').toLowerCase();
  return sentence.length < 8 ||
    /(unsubscribe|відписат|privacy policy|політик.*конфіденц|all rights reserved|copyright|do not reply|не відповідайте|view in browser|social media|facebook|instagram|linkedin)/i.test(lower) ||
    (/https?:\/\//i.test(lower) && lower.replace(/https?:\/\/\S+/gi, '').trim().length < 15);
}

function determineImportance_(source, codes, deadlines, amounts, hasAction) {
  const lower = String(source || '').toLowerCase();
  const highSignals = [];
  if (codes.length) highSignals.push('містить одноразовий код');
  if (/(urgent|термінов|негайно|security alert|підозр|unauthori[sz]ed|overdue|простроч|final notice|останнє попередження)/i.test(lower)) highSignals.push('є терміновий або безпековий сигнал');
  if (deadlines.length && hasAction) highSignals.push('є строк і потрібна дія');
  if (highSignals.length) return { icon: '🔴', level: 'висока', reason: highSignals.join('; ') };

  const mediumSignals = [];
  if (hasAction) mediumSignals.push('потрібна дія');
  if (deadlines.length) mediumSignals.push('зазначено строк');
  if (amounts.length) mediumSignals.push('є фінансова сума');
  if (/(invoice|payment|рахунок|оплат|appointment|зустріч|booking|бронюван|delivery|достав)/i.test(lower)) mediumSignals.push('операційний лист');
  if (mediumSignals.length) return { icon: '🟡', level: 'середня', reason: unique_(mediumSignals).join('; ') };
  return { icon: '🟢', level: 'звичайна', reason: 'не знайдено термінових дій або ризиків' };
}

function extractOtpCodes_(text) {
  const value = String(text || '');
  const patterns = [
    /(?:(?:verification|security|confirmation|one[- ]?time|access|login|auth(?:entication)?|verificatie|bevestigings|confirmatie)\s+)?(?:code|код|парол(?:ь|ем)?|otp|pin|passcode|verificatiecode|bevestigingscode)\s*(?:is|це|:|=|-|—)?\s*([A-Z0-9][A-Z0-9 -]{2,14}[A-Z0-9])(?=[^A-Z0-9]|$)/giu,
    /(?:your|ваш|uw)\s+(?:verification\s+|security\s+|одноразовий\s+)?(?:code|код|otp|pin|passcode)\s*(?:is|це|:|=|-|—)?\s*([A-Z0-9][A-Z0-9 -]{2,14}[A-Z0-9])(?=[^A-Z0-9]|$)/giu,
    /([0-9][0-9 -]{2,10}[0-9])[^\p{L}\p{N}]{0,25}(?:is your|verification|security|code|код|otp|pin|passcode|verificatiecode)/giu,
  ];
  const found = [];
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(value)) && found.length < 6) {
      const display = match[1].trim().replace(/\s+/g, ' ');
      const normalized = display.replace(/[\s-]/g, '');
      const contextual = /(?:code|код|otp|pin|passcode|verific|bevestig)/i.test(match[0]);
      if (normalized.length >= 4 && normalized.length <= 10 && /\d/.test(normalized) &&
          (!/^\d{4}$/.test(normalized) || contextual)) {
        found.push({ display, value: normalized });
      }
    }
  });
  const seen = new Set();
  return found.filter(item => {
    if (seen.has(item.value)) return false;
    seen.add(item.value);
    return true;
  }).slice(0, 3);
}

function extractDeadlines_(text) {
  const value = String(text || '');
  const namedDates = value.match(
    /\b\d{1,2}\s+(?:january|february|march|april|may|june|july|august|september|october|november|december|січня|лютого|березня|квітня|травня|червня|липня|серпня|вересня|жовтня|листопада|грудня|januari|februari|maart|mei|juni|juli|augustus|oktober|december)\s+\d{4}(?:\s+(?:at|о|om)\s+(?:[01]?\d|2[0-3]):[0-5]\d)?/gi
  ) || [];
  const compactDates = value.match(
    /\b(?:today|tomorrow|сьогодні|завтра|vandaag|morgen)\b(?:\s+(?:at|о|om)\s+(?:[01]?\d|2[0-3]):[0-5]\d)?|\b\d{1,2}[./-]\d{1,2}(?:[./-]\d{2,4})?(?:\s+(?:at|о|om)\s+(?:[01]?\d|2[0-3]):[0-5]\d)?|\b(?:[01]?\d|2[0-3]):[0-5]\d\b/gi
  ) || [];
  const matches = unique_(namedDates.concat(compactDates).map(item => item.trim())).filter(item => {
    const numericDate = item.match(/^(\d{1,2})[./-](\d{1,2})(?:[./-]|$)/);
    return !numericDate || (Number(numericDate[1]) <= 31 && Number(numericDate[2]) <= 12);
  });
  return matches.filter(item => !matches.some(other =>
    other !== item && other.length > item.length && other.toLowerCase().indexOf(item.toLowerCase()) !== -1
  )).slice(0, 5);
}

function extractAmounts_(text) {
  const matches = String(text || '').match(
    /(?:[€$£₴]\s?\d[\d\s.,]*|\b\d[\d\s.,]*\s?(?:EUR|USD|UAH|GBP|грн|euro|dollars?)\b)/gi
  ) || [];
  return unique_(matches.map(item =>
    item.replace(/\s+/g, ' ').replace(/[\s,;:.]+$/g, '').trim()
  )).slice(0, 5);
}

function translateToUkrainian_(text) {
  const value = String(text || '').trim();
  if (!value) return '';
  try {
    return LanguageApp.translate(value.slice(0, 4500), '', 'uk');
  } catch (error) {
    console.error('Translation failed: ' + error);
    return value;
  }
}

function cleanBodyForAnalysis_(text) {
  return decodeHtmlEntities_(String(text || ''))
    .replace(/\r\n/g, '\n')
    .replace(/[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180F\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '')
    .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Converts email HTML to a conservative Telegram Rich HTML block list. */
function renderEmailOriginal_(html, plain) {
  if (!String(html || '').trim()) {
    return { blocks: plainTextToRichBlocks_(plain), fidelityLoss: false };
  }
  try {
    const tree = parseEmailHtml_(html);
    const state = { fidelityLoss: false };
    const blocks = renderContainerBlocks_(tree, state);
    return {
      blocks: blocks.length ? blocks : plainTextToRichBlocks_(plain || htmlToText_(html)),
      fidelityLoss: state.fidelityLoss,
    };
  } catch (error) {
    console.error('HTML sanitizer failed: ' + error);
    return { blocks: plainTextToRichBlocks_(plain || htmlToText_(html)), fidelityLoss: true };
  }
}

function parseEmailHtml_(html) {
  const root = { tag: 'root', attrs: {}, children: [] };
  const stack = [root];
  tokenizeEmailHtml_(String(html || '')).forEach(token => {
    if (token.type === 'text') {
      stack[stack.length - 1].children.push({ type: 'text', value: token.value });
      return;
    }
    if (token.type === 'start') {
      const node = { tag: token.name, attrs: token.attrs, children: [] };
      stack[stack.length - 1].children.push(node);
      if (!token.selfClosing && !isVoidHtmlTag_(token.name)) stack.push(node);
      return;
    }
    if (token.type === 'end') {
      for (let i = stack.length - 1; i > 0; i -= 1) {
        if (stack[i].tag === token.name) {
          stack.length = i;
          break;
        }
      }
    }
  });
  return root;
}

function tokenizeEmailHtml_(html) {
  const tokens = [];
  let index = 0;
  while (index < html.length) {
    if (html[index] !== '<') {
      const next = html.indexOf('<', index);
      const end = next === -1 ? html.length : next;
      tokens.push({ type: 'text', value: html.slice(index, end) });
      index = end;
      continue;
    }
    if (html.slice(index, index + 4) === '<!--') {
      const commentEnd = html.indexOf('-->', index + 4);
      index = commentEnd === -1 ? html.length : commentEnd + 3;
      continue;
    }
    let quote = '';
    let end = index + 1;
    for (; end < html.length; end += 1) {
      const char = html[end];
      if (quote) {
        if (char === quote) quote = '';
      } else if (char === '"' || char === "'") {
        quote = char;
      } else if (char === '>') {
        break;
      }
    }
    if (end >= html.length) {
      tokens.push({ type: 'text', value: html.slice(index) });
      break;
    }
    const token = parseHtmlTagToken_(html.slice(index + 1, end));
    if (token) tokens.push(token);
    index = end + 1;
  }
  return tokens;
}

function parseHtmlTagToken_(inside) {
  let value = String(inside || '').trim();
  if (!value || /^[!?]/.test(value)) return null;
  if (value[0] === '/') {
    const endName = value.slice(1).trim().match(/^([a-zA-Z0-9:-]+)/);
    return endName ? { type: 'end', name: endName[1].toLowerCase() } : null;
  }
  const selfClosing = /\/\s*$/.test(value);
  value = value.replace(/\/\s*$/, '').trim();
  const match = value.match(/^([a-zA-Z0-9:-]+)/);
  if (!match) return null;
  const name = match[1].toLowerCase();
  return {
    type: 'start',
    name,
    attrs: parseHtmlAttributes_(value.slice(match[0].length)),
    selfClosing,
  };
}

function parseHtmlAttributes_(source) {
  const attrs = {};
  let index = 0;
  const text = String(source || '');
  while (index < text.length) {
    while (index < text.length && /\s/.test(text[index])) index += 1;
    if (index >= text.length) break;
    const start = index;
    while (index < text.length && !/[\s=]/.test(text[index])) index += 1;
    const name = text.slice(start, index).toLowerCase();
    if (!name) { index += 1; continue; }
    while (index < text.length && /\s/.test(text[index])) index += 1;
    let value = '';
    if (text[index] === '=') {
      index += 1;
      while (index < text.length && /\s/.test(text[index])) index += 1;
      if (text[index] === '"' || text[index] === "'") {
        const quote = text[index++];
        const valueStart = index;
        while (index < text.length && text[index] !== quote) index += 1;
        value = text.slice(valueStart, index);
        if (text[index] === quote) index += 1;
      } else {
        const valueStart = index;
        while (index < text.length && !/\s/.test(text[index])) index += 1;
        value = text.slice(valueStart, index);
      }
    }
    attrs[name] = decodeHtmlEntities_(value);
  }
  return attrs;
}

function isVoidHtmlTag_(tag) {
  return ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].indexOf(tag) !== -1;
}

function isDroppedNode_(node) {
  if (!node || node.type === 'text') return false;
  if (['head', 'style', 'script', 'noscript', 'template', 'form', 'svg', 'canvas'].indexOf(node.tag) !== -1) return true;
  const attrs = node.attrs || {};
  const style = String(attrs.style || '').toLowerCase().replace(/\s+/g, '');
  return Object.prototype.hasOwnProperty.call(attrs, 'hidden') ||
    String(attrs['aria-hidden'] || '').toLowerCase() === 'true' ||
    /display:none|visibility:hidden|font-size:0(?:px|pt|em|rem|%)?|mso-hide:all/.test(style);
}

function isBlockNode_(node) {
  if (!node || node.type === 'text') return false;
  return /^(?:p|div|section|article|main|header|footer|address|h[1-6]|ul|ol|li|blockquote|pre|table|details|hr|img|video|audio|iframe)$/.test(node.tag);
}

function hasBlockDescendant_(node) {
  return (node.children || []).some(child => isBlockNode_(child) || hasBlockDescendant_(child));
}

function renderContainerBlocks_(node, state) {
  const blocks = [];
  let inline = '';
  const flush = () => {
    const value = cleanupInlineHtml_(inline);
    if (htmlVisibleLength_(value)) blocks.push('<p>' + value + '</p>');
    inline = '';
  };

  (node.children || []).forEach(child => {
    if (isDroppedNode_(child)) {
      if (child && child.tag && ['svg', 'canvas', 'form'].indexOf(child.tag) !== -1) state.fidelityLoss = true;
      return;
    }
    if (child.type === 'text' || (!isBlockNode_(child) && !hasBlockDescendant_(child))) {
      inline += renderInlineNode_(child, state);
      return;
    }
    flush();
    if (!isBlockNode_(child)) {
      blocks.push.apply(blocks, renderContainerBlocks_(child, state));
    } else {
      blocks.push.apply(blocks, renderBlockNode_(child, state));
    }
  });
  flush();
  return blocks;
}

function renderBlockNode_(node, state) {
  const tag = node.tag;
  if (/^h[1-6]$/.test(tag)) {
    const content = cleanupInlineHtml_(renderInlineChildren_(node, state));
    return content ? ['<' + tag + '>' + content + '</' + tag + '>'] : [];
  }
  if (tag === 'p' || tag === 'address') {
    if (hasBlockDescendant_(node)) return renderContainerBlocks_(node, state);
    const content = cleanupInlineHtml_(renderInlineChildren_(node, state));
    return content ? ['<p>' + content + '</p>'] : [];
  }
  if (/^(?:div|section|article|main|header|footer)$/.test(tag)) {
    const nested = renderContainerBlocks_(node, state);
    if (tag === 'footer' && nested.length === 1) {
      return ['<footer>' + stripOuterParagraph_(nested[0]) + '</footer>'];
    }
    return nested;
  }
  if (tag === 'hr') return ['<hr/>'];
  if (tag === 'img') return renderImageBlock_(node, state);
  if (/^(?:video|audio|iframe)$/.test(tag)) {
    state.fidelityLoss = true;
    const label = tag === 'audio' ? 'Аудіо з листа' : tag === 'video' ? 'Відео з листа' : 'Вбудований вміст';
    return ['<p><i>[' + escapeHtml_(label) + ' — доступно в .eml або Gmail]</i></p>'];
  }
  if (tag === 'pre') {
    const text = escapeHtml_(collectNodeText_(node).replace(/^\s+|\s+$/g, ''));
    return text ? ['<pre><code>' + text + '</code></pre>'] : [];
  }
  if (tag === 'blockquote') {
    const nested = renderContainerBlocks_(node, state);
    return nested.length ? ['<blockquote>' + nested.join('') + '</blockquote>'] : [];
  }
  if (tag === 'ul' || tag === 'ol') return renderListBlock_(node, state);
  if (tag === 'table') return renderTableBlock_(node, state);
  if (tag === 'details') {
    const summary = (node.children || []).find(child => child.tag === 'summary');
    const summaryText = summary
      ? cleanupInlineHtml_(renderInlineChildren_(summary, state))
      : 'Деталі';
    const holder = {
      tag: 'root', attrs: {},
      children: (node.children || []).filter(child => child !== summary),
    };
    const nested = renderContainerBlocks_(holder, state);
    return ['<details><summary>' + summaryText + '</summary>' + nested.join('') + '</details>'];
  }
  return renderContainerBlocks_(node, state);
}

function renderListBlock_(node, state) {
  const items = (node.children || []).filter(child => child.tag === 'li');
  if (!items.length) return renderContainerBlocks_(node, state);
  const tag = node.tag === 'ol' ? 'ol' : 'ul';
  const html = items.map(item => {
    const content = cleanupInlineHtml_(renderInlineChildren_(item, state));
    return content ? '<li>' + content + '</li>' : '';
  }).join('');
  return html ? ['<' + tag + '>' + html + '</' + tag + '>'] : [];
}

function renderTableBlock_(node, state) {
  const rows = findDescendantsByTag_(node, 'tr').slice(0, 80);
  if (!rows.length) return renderContainerBlocks_(node, state);
  const renderedRows = [];
  let maxColumns = 0;
  rows.forEach(row => {
    const cells = (row.children || []).filter(child => child.tag === 'td' || child.tag === 'th').slice(0, 20);
    if (!cells.length) return;
    maxColumns = Math.max(maxColumns, cells.length);
    renderedRows.push('<tr>' + cells.map(cell => {
      const cellTag = cell.tag === 'th' ? 'th' : 'td';
      const attrs = renderTableCellAttrs_(cell.attrs || {});
      const content = cleanupInlineHtml_(renderInlineChildren_(cell, state)) || ' ';
      return '<' + cellTag + attrs + '>' + content + '</' + cellTag + '>';
    }).join('') + '</tr>');
  });
  if (!renderedRows.length || maxColumns > 20) {
    state.fidelityLoss = true;
    return renderContainerBlocks_(node, state);
  }
  if (rows.length > 80) state.fidelityLoss = true;
  return ['<table bordered striped>' + renderedRows.join('') + '</table>'];
}

function renderTableCellAttrs_(attrs) {
  let result = '';
  ['colspan', 'rowspan'].forEach(name => {
    const value = Math.max(1, Math.min(20, Number(attrs[name] || 1)));
    if (value > 1) result += ' ' + name + '="' + value + '"';
  });
  if (/^(?:left|center|right)$/.test(attrs.align || '')) result += ' align="' + attrs.align + '"';
  if (/^(?:top|middle|bottom)$/.test(attrs.valign || '')) result += ' valign="' + attrs.valign + '"';
  return result;
}

function renderImageBlock_(node, state) {
  state.fidelityLoss = true;
  const attrs = node.attrs || {};
  const alt = cleanBodyForAnalysis_(attrs.alt || attrs.title || '') || 'Зображення з листа';
  const src = sanitizeHref_(attrs.src || '');
  const label = '🖼️ ' + escapeHtml_(alt.slice(0, 160));
  return ['<p><i>[' + (src ? '<a href="' + escapeHtml_(src) + '">' + label + '</a>' : label) + ']</i></p>'];
}

function renderInlineChildren_(node, state) {
  return (node.children || []).map(child => renderInlineNode_(child, state)).join('');
}

function renderInlineNode_(node, state) {
  if (!node) return '';
  if (node.type === 'text') {
    return escapeHtml_(decodeHtmlEntities_(node.value).replace(/\s+/g, ' '));
  }
  if (isDroppedNode_(node)) return '';
  const tagMap = {
    strong: 'b', b: 'b', em: 'i', i: 'i', u: 'u', ins: 'u',
    s: 's', strike: 's', del: 's', code: 'code', mark: 'mark', sub: 'sub', sup: 'sup',
  };
  if (node.tag === 'br') return '<br/>';
  if (node.tag === 'img') {
    state.fidelityLoss = true;
    const alt = cleanBodyForAnalysis_((node.attrs || {}).alt || '') || 'зображення';
    return '<i>[🖼️ ' + escapeHtml_(alt.slice(0, 120)) + ']</i>';
  }
  if (node.tag === 'a') {
    const href = sanitizeHref_((node.attrs || {}).href || '');
    let label = cleanupInlineHtml_(renderInlineChildren_(node, state));
    if (!label) label = escapeHtml_(href ? readableUrlLabel_(href) : 'посилання');
    return href ? '<a href="' + escapeHtml_(href) + '">' + label + '</a>' : label;
  }
  if (tagMap[node.tag]) {
    const mapped = tagMap[node.tag];
    const content = renderInlineChildren_(node, state);
    return content ? '<' + mapped + '>' + content + '</' + mapped + '>' : '';
  }
  if (isBlockNode_(node)) return escapeHtml_(collectNodeText_(node).replace(/\s+/g, ' ').trim());
  return renderInlineChildren_(node, state);
}

function sanitizeHref_(value) {
  let href = decodeHtmlEntities_(String(value || ''))
    .replace(/[\u0000-\u001F\u007F\s]+/g, '')
    .slice(0, 2048);
  if (/^\/\//.test(href)) href = 'https:' + href;
  return /^(?:https?:|mailto:|tel:)/i.test(href) ? href : '';
}

function readableUrlLabel_(url) {
  const mail = String(url).match(/^mailto:([^?]+)/i);
  if (mail) return mail[1];
  const domain = String(url).match(/^https?:\/\/([^/?#]+)/i);
  return domain ? domain[1].replace(/^www\./i, '') : 'відкрити посилання';
}

function collectNodeText_(node) {
  if (!node) return '';
  if (node.type === 'text') return decodeHtmlEntities_(node.value);
  return (node.children || []).map(collectNodeText_).join(' ');
}

function findDescendantsByTag_(node, tag) {
  const result = [];
  (node.children || []).forEach(child => {
    if (child.tag === tag) result.push(child);
    result.push.apply(result, findDescendantsByTag_(child, tag));
  });
  return result;
}

function plainTextToRichBlocks_(plain) {
  const text = String(plain || '').replace(/\r\n/g, '\n').trim();
  if (!text) return [];
  return text.split(/\n{2,}/).filter(Boolean).map(paragraph =>
    '<p>' + linkifyPlainText_(paragraph.replace(/\n/g, '<br/>')) + '</p>'
  );
}

function linkifyPlainText_(textWithBreaks) {
  const parts = String(textWithBreaks || '').split(/(<br\/>)/);
  return parts.map(part => {
    if (part === '<br/>') return part;
    let cursor = 0;
    let result = '';
    const pattern = /https?:\/\/[^\s<>()]+/gi;
    let match;
    while ((match = pattern.exec(part))) {
      result += escapeHtml_(decodeHtmlEntities_(part.slice(cursor, match.index)));
      const url = match[0].replace(/[.,;:!?]+$/, '');
      result += '<a href="' + escapeHtml_(url) + '">' + escapeHtml_(url) + '</a>';
      cursor = match.index + url.length;
    }
    result += escapeHtml_(decodeHtmlEntities_(part.slice(cursor)));
    return result;
  }).join('');
}

function cleanupInlineHtml_(html) {
  return String(html || '')
    .replace(/(?:\s|&nbsp;)+/g, ' ')
    .replace(/\s*(<br\/>\s*){3,}/g, '<br/><br/>')
    .replace(/^\s+|\s+$/g, '');
}

function stripOuterParagraph_(html) {
  return String(html || '').replace(/^<p>/i, '').replace(/<\/p>$/i, '');
}

function splitRichBlocks_(blocks) {
  const expanded = [];
  (blocks || []).forEach(block => {
    splitSafeRichHtml_(block, CONFIG.MAX_RICH_HTML_CHARS - 300).forEach(part => expanded.push(part));
  });
  const chunks = [];
  let current = '';
  let blockCount = 0;
  expanded.forEach(block => {
    const count = estimateRichBlockCount_(block);
    if (current && (
      current.length + block.length + 1 > CONFIG.MAX_RICH_HTML_CHARS - 300 ||
      blockCount + count > CONFIG.MAX_RICH_BLOCKS
    )) {
      chunks.push(current);
      current = '';
      blockCount = 0;
    }
    current += (current ? '\n' : '') + block;
    blockCount += count;
  });
  if (current) chunks.push(current);
  return chunks;
}

function splitSafeRichHtml_(html, maxLength) {
  const source = String(html || '');
  if (source.length <= maxLength) return source ? [source] : [];
  const tokens = source.match(/<[^>]+>|[^<]+/g) || [source];
  const chunks = [];
  const stack = [];
  let current = '';

  function closingMarkup() {
    return stack.slice().reverse().map(item => '</' + item.name + '>').join('');
  }
  function openingMarkup() {
    return stack.map(item => item.open).join('');
  }
  function flush() {
    const closers = closingMarkup();
    const complete = current + closers;
    if (htmlVisibleLength_(complete)) chunks.push(complete);
    current = openingMarkup();
  }

  tokens.forEach(token => {
    if (token[0] === '<') {
      const close = token.match(/^<\/\s*([a-z0-9-]+)/i);
      const open = token.match(/^<\s*([a-z0-9-]+)/i);
      const selfClosing = /\/\s*>$/.test(token) || /^<(?:br|hr)\b/i.test(token);
      if (current.length + token.length + closingMarkup().length > maxLength && current) flush();
      current += token;
      if (close) {
        for (let i = stack.length - 1; i >= 0; i -= 1) {
          if (stack[i].name === close[1].toLowerCase()) {
            stack.splice(i, 1);
            break;
          }
        }
      } else if (open && !selfClosing) {
        stack.push({ name: open[1].toLowerCase(), open: token });
      }
      return;
    }

    let rest = token;
    while (rest) {
      const room = maxLength - current.length - closingMarkup().length - 16;
      if (room < 32) {
        flush();
        continue;
      }
      if (rest.length <= room) {
        current += rest;
        rest = '';
      } else {
        const cut = chooseSafeCut_(rest, room);
        current += rest.slice(0, cut);
        rest = rest.slice(cut);
        flush();
      }
    }
  });
  if (htmlVisibleLength_(current)) chunks.push(current + closingMarkup());
  return chunks;
}

function chooseSafeCut_(text, maxLength) {
  let cut = Math.min(maxLength, text.length);
  const candidates = [
    text.lastIndexOf('\n\n', cut),
    text.lastIndexOf('\n', cut),
    text.lastIndexOf('. ', cut),
    text.lastIndexOf(' ', cut),
  ];
  const best = Math.max.apply(null, candidates);
  if (best > cut * 0.5) cut = best + (text.slice(best, best + 2) === '. ' ? 1 : 0);
  if (cut > 0 && /[\uD800-\uDBFF]/.test(text[cut - 1]) && /[\uDC00-\uDFFF]/.test(text[cut])) cut -= 1;
  return Math.max(1, cut);
}

function estimateRichBlockCount_(html) {
  return Math.max(1, (String(html || '').match(/<(?:p|h[1-6]|li|tr|blockquote|details|table|pre|hr)\b/gi) || []).length);
}

function richHtmlToTelegramHtml_(html) {
  return String(html || '')
    .replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, '<b>$1</b>\n\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/?(?:ul|ol|table|tbody|thead|tfoot|tr)[^>]*>/gi, '')
    .replace(/<(?:td|th)[^>]*>/gi, '')
    .replace(/<\/(?:td|th)>/gi, ' · ')
    .replace(/<hr\s*\/?>/gi, '\n────────\n')
    .replace(/<details[^>]*>/gi, '')
    .replace(/<summary[^>]*>([\s\S]*?)<\/summary>/gi, '<b>$1</b>\n')
    .replace(/<\/details>/gi, '')
    .replace(/<footer[^>]*>/gi, '<i>')
    .replace(/<\/footer>/gi, '</i>')
    .replace(/<\/?(?:mark|sub|sup)[^>]*>/gi, '')
    .replace(/<pre><code>/gi, '<pre>')
    .replace(/<\/code><\/pre>/gi, '</pre>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function htmlToText_(html) {
  const text = String(html || '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<head\b[^>]*>[\s\S]*?<\/head\s*>/gi, ' ')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/(p|div|tr|table|h[1-6]|li)\s*>/gi, '\n')
    .replace(/<li\b[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, ' ');
  return decodeHtmlEntities_(text)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function decodeHtmlEntities_(text) {
  const named = {
    nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", hellip: '…',
    mdash: '—', ndash: '–', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
    copy: '©', reg: '®', trade: '™', euro: '€', pound: '£', cent: '¢', bull: '•',
  };
  return String(text || '')
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => safeCodePoint_(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => safeCodePoint_(Number(code)))
    .replace(/&([a-z]+);/gi, (whole, name) =>
      Object.prototype.hasOwnProperty.call(named, name.toLowerCase())
        ? named[name.toLowerCase()]
        : whole
    );
}

function safeCodePoint_(code) {
  if (!Number.isFinite(code) || code < 0 || code > 0x10FFFF || (code >= 0xD800 && code <= 0xDFFF)) return '�';
  return String.fromCodePoint(code);
}

function makePreview_(text, maxLength) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean || clean.length <= maxLength) return clean;
  let cut = Math.max(
    clean.lastIndexOf('. ', maxLength),
    clean.lastIndexOf('! ', maxLength),
    clean.lastIndexOf('? ', maxLength),
    clean.lastIndexOf(' ', maxLength)
  );
  if (cut < maxLength * 0.55) cut = maxLength;
  return clean.slice(0, cut).trim() + '…';
}

function cleanHeader_(value) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim();
}

function senderName_(value) {
  const clean = cleanHeader_(value);
  const match = clean.match(/^\s*"?([^"<]+?)"?\s*<[^>]+>\s*$/);
  return match ? match[1].trim() : clean;
}

function senderEmail_(value) {
  const clean = cleanHeader_(value);
  const bracketed = clean.match(/<\s*([^<>\s]+@[^<>\s]+)\s*>/);
  if (bracketed) return bracketed[1].trim();
  const plain = clean.match(/\b[^\s<>@]+@[^\s<>@]+\b/);
  return plain ? plain[0].replace(/[>,;]+$/, '') : '';
}

function formatSentDate_(headerDate, fallbackTimestamp) {
  let date = headerDate ? new Date(headerDate) : new Date(Number(fallbackTimestamp));
  if (isNaN(date.getTime())) date = new Date(Number(fallbackTimestamp));
  const timezone = Session.getScriptTimeZone();
  const weekdayNumber = Number(Utilities.formatDate(date, timezone, 'u'));
  const monthNumber = Number(Utilities.formatDate(date, timezone, 'M'));
  const weekdays = ['понеділок', 'вівторок', 'середа', 'четвер', 'п’ятниця', 'субота', 'неділя'];
  const months = [
    'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
    'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
  ];
  return weekdays[weekdayNumber - 1] + ', ' +
    Utilities.formatDate(date, timezone, 'd') + ' ' +
    months[monthNumber - 1] + ' ' +
    Utilities.formatDate(date, timezone, "yyyy 'о' HH:mm");
}

function getSenderPhoto_(email) {
  if (!email) return null;
  try {
    const domain = String(email).split('@').pop().toLowerCase().replace(/[^a-z0-9.-]/g, '');
    const personalDomains = new Set([
      'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com',
      'icloud.com', 'me.com', 'yahoo.com', 'proton.me', 'protonmail.com'
    ]);
    if (!domain || personalDomains.has(domain)) return null;
    const response = UrlFetchApp.fetch(
      'https://www.google.com/s2/favicons?domain_url=' +
      encodeURIComponent('https://' + domain) + '&sz=128',
      { muteHttpExceptions: true }
    );
    if (response.getResponseCode() >= 300) return null;
    const blob = response.getBlob();
    if (!/^image\//i.test(blob.getContentType()) || blob.getBytes().length < 100) return null;
    return blob.setName('sender-logo.png');
  } catch (error) {
    console.error('Sender logo lookup failed: ' + error);
    return null;
  }
}

function isQuietHours_() {
  const hour = Number(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'H'));
  const start = CONFIG.QUIET_HOURS_START;
  const end = CONFIG.QUIET_HOURS_END;
  if (start === end) return false;
  return start < end ? hour >= start && hour < end : hour >= start || hour < end;
}

function htmlVisibleLength_(html) {
  return decodeHtmlEntities_(String(html || '').replace(/<[^>]+>/g, '')).length;
}

function escapeHtml_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeFilename_(value) {
  return String(value || 'email')
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_')
    .replace(/[. ]+$/g, '')
    .slice(0, 120) || 'email';
}

function formatBytes_(bytes) {
  if (bytes < 1024) return bytes + ' Б';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
  return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
}

function unique_(items) {
  return Array.from(new Set(items));
}

function requireSetting_(props, key) {
  const value = props.getProperty(key);
  if (!value) throw new Error('Script Property ' + key + ' is missing.');
  return value;
}
