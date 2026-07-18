/**
 * Authenticated Gmail RPC backend for the Telegram Mini App.
 *
 * Security boundary:
 * - mailboxOpenSession() is the only endpoint that accepts Telegram initData.
 * - mailboxRpc() accepts only a short-lived bearer session and an allowlisted op.
 * - Gmail resources are converted to bounded DTOs; raw Gmail responses never
 *   cross the Apps Script boundary.
 * - Sending mail is possible only by first saving a Gmail draft and then using
 *   the explicit sendDraft operation. There is deliberately no direct send or
 *   permanent-delete operation.
 */

const MAILBOX_CLIENT_CONFIG_ = Object.freeze({
  // The bearer exists only in Mini App memory and remains owner-bound. A
  // six-hour absolute window avoids expiring during normal mail reading while
  // still requiring a fresh signed Telegram launch at least once per workday.
  SESSION_SECONDS: 6 * 60 * 60,
  SESSION_PREFIX: 'mailbox.session.v1.',
  // After the one-use launch handoff, refresh credentials remain only in Mini
  // App memory. Their HMAC envelope is owner-bound; compact durable family
  // state makes each jti single-use and revokes the preceding session bearer.
  REFRESH_TOKEN_SECONDS: 24 * 60 * 60,
  REFRESH_TOKEN_PREFIX: 'mbr1',
  REFRESH_SIGNING_SECRET_PROPERTY: 'MAILBOX_REFRESH_SIGNING_SECRET',
  REFRESH_FAMILIES_PROPERTY: 'MAILBOX_REFRESH_FAMILIES_V1',
  REFRESH_FAMILY_LIMIT: 24,
  // A 15 MiB binary attachment expands to about 20 MiB in base64. Requests
  // stay owner-authenticated and are still bounded before any Gmail write.
  MAX_REQUEST_CHARS: 22 * 1024 * 1024,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 30,
  UNIFIED_CURSOR_SECONDS: 10 * 60,
  UNIFIED_CURSOR_PREFIX: 'mailbox.unified.v1.',
  MAX_UNIFIED_ACCOUNTS: 20,
  MAX_UNIFIED_CURSOR_CHARS: 90000,
  MAX_THREAD_MESSAGES: 100,
  MAX_BODY_CHARS: 200000,
  MAX_HTML_CHARS: 180000,
  MAX_QUERY_CHARS: 500,
  MAX_RECIPIENTS: 50,
  MAX_SUBJECT_CHARS: 500,
  MAX_ATTACHMENT_ID_CHARS: 4096,
  MAX_ATTACHMENT_NAME_CHARS: 255,
  MAX_ATTACHMENT_NAME_BYTES: 180,
  MAX_INCOMING_ATTACHMENT_BYTES: 15 * 1024 * 1024,
  MAX_OUTGOING_ATTACHMENT_BYTES: 10 * 1024 * 1024,
  MAX_OUTGOING_ATTACHMENTS: 20,
  MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES: 15 * 1024 * 1024,
  MAX_SOURCE_PREVIEW_BYTES: 2 * 1024 * 1024,
  MAX_SOURCE_DOWNLOAD_BYTES: 10 * 1024 * 1024,
  MAX_SOURCE_QUERY_CHARS: 200,
  // UrlFetchApp accepts URLs up to 2 KB. Query-bearing CDN image URLs remain
  // valid up to that platform boundary; longer URLs cannot be fetched safely
  // or reliably from Apps Script.
  MAX_SOURCE_URL_CHARS: 2048,
  MAX_SOURCE_REDIRECTS: 3,
  MAX_DRIVE_PAGE_SIZE: 50,
  MAX_BOX_PAGE_SIZE: 50,
  BOX_CLIENT_ID_PROPERTY: 'BOX_CLIENT_ID',
  BOX_CLIENT_SECRET_PROPERTY: 'BOX_CLIENT_SECRET',
  BOX_REDIRECT_URI_PROPERTY: 'BOX_REDIRECT_URI',
  // Both OAuth credentials live in this single JSON value. No Box token is
  // ever placed in CacheService, an URL, a DTO, or a log message.
  BOX_TOKEN_PROPERTY: 'BOX_OAUTH_TOKEN_V1',
  BOX_REFRESH_JOURNAL_PROPERTY: 'BOX_OAUTH_REFRESH_JOURNAL_V1',
  BOX_PENDING_REVOCATION_PREFIX: 'BOX_OAUTH_PENDING_REVOCATION_V1_',
  BOX_PENDING_REVOCATION_LIMIT: 4,
  BOX_PENDING_REVOCATION_GRACE_SECONDS: 10 * 60,
  BOX_CONNECTION_GENERATION_PROPERTY: 'BOX_CONNECTION_GENERATION_V1',
  BOX_STATE_PREFIX: 'BOX_OAUTH_STATE_V1_',
  BOX_STATE_SECONDS: 10 * 60,
  BOX_STATE_LIMIT: 12,
  // Box refresh tokens are one-use and expire after sixty days. A one-day
  // safety margin avoids rotating at the provider boundary.
  BOX_REFRESH_TOKEN_SECONDS: 59 * 24 * 60 * 60,
  BOX_TOKEN_SKEW_SECONDS: 90,
  UNDO_TOKEN_SECONDS: 15 * 60,
  MAX_UNDO_TOKEN_CHARS: 24000,
  MAX_INLINE_IMAGE_TOKEN_CHARS: 80,
  MAX_INLINE_CONTENT_ID_CHARS: 160,
  MAX_LABEL_CHANGES: 50,
  MAX_DRAFT_LOOKUP_PAGES: 20,
  DRAFT_LOOKUP_PAGE_SIZE: 100,
  MAX_LIST_SUMMARY_SOURCE_CHARS: 1600,
  MAX_LIST_SUMMARY_CHARS: 420,
  MAX_TRANSLATION_CHUNK_CHARS: 4200,
  MAX_TRANSLATION_CHUNK_ITEMS: 10,
  MAX_THREAD_ANALYSIS_CHARS: 60000,
  MAX_THREAD_ANALYSIS_MESSAGE_CHARS: 6000,
  MAX_ANALYSIS_SOURCE_FRAGMENTS: 3,
  MAX_ANALYSIS_SOURCE_FRAGMENT_CHARS: 240,
  SUMMARY_CACHE_SECONDS: 6 * 60 * 60,
  SUMMARY_CACHE_PREFIX: 'mailbox.summary.v2.',
  SEND_AS_CACHE_SECONDS: 5 * 60,
  SEND_AS_CACHE_KEY: 'mailbox.sendas.v1',
  MAX_SEND_AS_ALIASES: 50,
  METADATA_SYNC_PREFIX: 'MAILBOX_METADATA_SYNC_V1_',
  METADATA_SYNC_INTERVAL_MS: 5 * 60 * 1000,
  METADATA_SYNC_LEASE_MS: 2 * 60 * 1000,
  METADATA_SYNC_MAX_BACKOFF_MS: 60 * 60 * 1000,
  METADATA_SYNC_MAX_BATCH: 3,
  FOCUS_PROPERTY_PREFIX: 'MAILBOX_FOCUS_V1_',
  MAX_FOCUS_RULES: 50,
  MAX_FOCUS_MANUAL_THREADS: 120,
  MAX_FOCUS_NAME_CHARS: 80,
  MAX_FOCUS_MATCH_CHARS: 240,
  ATTENTION_PROPERTY_PREFIX: 'MAILBOX_ATTENTION_V1_',
  MAX_ATTENTION_THREADS: 120,
  MAX_NEXT_ACTION_CHARS: 320,
  DRAFT_OPERATION_INDEX_PROPERTY: 'MAILBOX_DRAFT_OPERATION_INDEX_V1',
  DRAFT_OPERATION_PREFIX: 'MAILBOX_DRAFT_OPERATION_V1_',
  DRAFT_OPERATION_LIMIT: 80,
  DRAFT_OPERATION_TERMINAL_TTL_MS: 24 * 60 * 60 * 1000,
  SCHEDULED_SEND_PREFIX: 'MAILBOX_SCHEDULED_SEND_V1_',
  SCHEDULED_SEND_LIMIT: 40,
  SCHEDULED_SEND_SCOPE_LIMIT: 20,
  SCHEDULED_SEND_TERMINAL_LIMIT: 40,
  SCHEDULED_SEND_MAX_ATTEMPTS: 8,
  SCHEDULED_SEND_LEASE_MS: 2 * 60 * 1000,
  SCHEDULED_SEND_MIN_DELAY_MS: 60 * 1000,
  SCHEDULED_SEND_MAX_DELAY_MS: 365 * 24 * 60 * 60 * 1000,
  SCHEDULED_SEND_TERMINAL_TTL_MS: 24 * 60 * 60 * 1000,
  // v2 invalidates v1 entries that could contain the generic Ukrainian
  // fallback after a batch delimiter was normalized by LanguageApp.
  TRANSLATION_CACHE_PREFIX: 'mailbox.translation.uk.v2.',
});

// Apps Script isolates globals per execution. mailboxRpc sets this only for
// the duration of one authenticated dispatch so the shared Gmail transport can
// select the caller's authorized connection without trusting client payloads.
let mailboxCurrentSessionContext_ = null;

// Bot-managed snooze uses a visible user label because Gmail's public API can
// search native `in:snoozed` mail but cannot set native Gmail Snooze. Keep the
// folder query honest by showing both native and bot-managed deferred mail.
// The public Gmail API has no supported endpoint for writing native Gmail
// Snooze state.
const MAILBOX_BOT_SNOOZE_LABEL_NAME_ = 'Telegram/Відкладені';
const MAILBOX_BOT_SNOOZE_QUERY_ = 'label:"' + MAILBOX_BOT_SNOOZE_LABEL_NAME_ + '"';

const MAILBOX_SYSTEM_FOLDERS_ = Object.freeze({
  Inbox: Object.freeze({ name: 'Вхідні', query: '', labelId: 'INBOX', icon: 'inbox' }),
  Primary: Object.freeze({
    name: 'Основні', query: 'in:inbox', labelId: 'CATEGORY_PERSONAL',
    icon: 'primary', group: 'categories', category: 'primary',
  }),
  Social: Object.freeze({
    name: 'Соцмережі', query: 'in:inbox', labelId: 'CATEGORY_SOCIAL',
    icon: 'social', group: 'categories', category: 'social',
  }),
  Promotions: Object.freeze({
    name: 'Реклама', query: 'in:inbox', labelId: 'CATEGORY_PROMOTIONS',
    icon: 'promotions', group: 'categories', category: 'promotions',
  }),
  Updates: Object.freeze({
    name: 'Оновлення', query: 'in:inbox', labelId: 'CATEGORY_UPDATES',
    icon: 'updates', group: 'categories', category: 'updates',
  }),
  Forums: Object.freeze({
    name: 'Форуми', query: 'in:inbox', labelId: 'CATEGORY_FORUMS',
    icon: 'forums', group: 'categories', category: 'forums',
  }),
  Sent: Object.freeze({ name: 'Надіслані', query: '', labelId: 'SENT', icon: 'send' }),
  Drafts: Object.freeze({ name: 'Чернетки', query: '', labelId: 'DRAFT', icon: 'draft' }),
  // Native Gmail snooze remains discoverable, while bot-managed schedules are
  // visible through their dedicated label.
  Snoozed: Object.freeze({
    name: 'Відкладені',
    query: '{in:snoozed ' + MAILBOX_BOT_SNOOZE_QUERY_ + '}',
    icon: 'snooze',
  }),
  Archive: Object.freeze({
    name: 'Архів',
    query: '-in:inbox -in:sent -in:drafts -in:snoozed -' +
      MAILBOX_BOT_SNOOZE_QUERY_ + ' -in:trash -in:spam',
    icon: 'archive',
  }),
  Trash: Object.freeze({ name: 'Кошик', query: '', labelId: 'TRASH', includeSpamTrash: true, icon: 'trash' }),
  Spam: Object.freeze({ name: 'Спам', query: '', labelId: 'SPAM', includeSpamTrash: true, icon: 'spam' }),
  Starred: Object.freeze({ name: 'Із зірочкою', query: '', labelId: 'STARRED', icon: 'star' }),
  Important: Object.freeze({ name: 'Важливі', query: '', labelId: 'IMPORTANT', icon: 'important' }),
  All: Object.freeze({ name: 'Усі листи', query: '-in:trash -in:spam', icon: 'mail' }),
});

// These are the only list filters accepted from the Mini App. Keeping the
// Gmail operators server-side makes a filter apply to the complete folder,
// including pages that have not been loaded in Telegram yet.
const MAILBOX_LIST_FILTERS_ = Object.freeze({
  all: Object.freeze({ query: '' }),
  unread: Object.freeze({ query: 'is:unread' }),
  starred: Object.freeze({ query: 'is:starred' }),
  hasAttachment: Object.freeze({ query: 'has:attachment' }),
  important: Object.freeze({ query: 'is:important' }),
});

const MAILBOX_THREAD_ACTIONS_ = Object.freeze({
  archive: Object.freeze({ add: [], remove: ['INBOX'], undo: 'inbox' }),
  inbox: Object.freeze({ add: ['INBOX'], remove: [], undo: 'archive' }),
  spam: Object.freeze({ add: ['SPAM'], remove: ['INBOX'], undo: 'notSpam' }),
  notSpam: Object.freeze({ add: ['INBOX'], remove: ['SPAM'], undo: 'spam' }),
  read: Object.freeze({ add: [], remove: ['UNREAD'], undo: 'unread' }),
  unread: Object.freeze({ add: ['UNREAD'], remove: [], undo: 'read' }),
  star: Object.freeze({ add: ['STARRED'], remove: [], undo: 'unstar' }),
  unstar: Object.freeze({ add: [], remove: ['STARRED'], undo: 'star' }),
  important: Object.freeze({ add: ['IMPORTANT'], remove: [], undo: 'notImportant' }),
  notImportant: Object.freeze({ add: [], remove: ['IMPORTANT'], undo: 'important' }),
});

/**
 * Exchange freshly signed Telegram Mini App initData for a short-lived session
 * bound to that exact Telegram user and their isolated mailbox workspace.
 */
function mailboxOpenSession(initData) {
  try {
    const raw = String(initData || '');
    if (!raw || raw.length > 16384) {
      throw mailboxError_('UNAUTHORIZED', 'Telegram-команда відсутня або має некоректний формат.');
    }
    const user = validateTelegramMiniAppIdentity_(raw);
    const principal = mailboxMultiPrincipal_(String(user.id || ''));
    claimMailboxLaunchInitData_(raw);

    const sessionData = mailboxCreateSession_(principal.userId, principal.userId);
    return mailboxOk_(Object.assign({}, sessionData, {
      owner: {
        id: mailboxSafeText_(user.id, 32),
        firstName: mailboxSafeText_(user.first_name, 100),
        lastName: mailboxSafeText_(user.last_name, 100),
        username: mailboxSafeText_(user.username, 64),
      },
    }));
  } catch (error) {
    return mailboxFailure_(error, 'UNAUTHORIZED');
  }
}

/**
 * Rotate a valid owner-bound refresh credential into a fresh RPC session.
 * The old credential is never persisted or returned through a URL; the Mini
 * App replaces its in-memory copy with the newly signed token below.
 */
function mailboxRenewSession(refreshToken) {
  try {
    const claims = mailboxVerifyRefreshToken_(refreshToken);
    return mailboxOk_(mailboxCreateSession_(claims.sub, claims.sub, claims));
  } catch (error) {
    return mailboxFailure_(error, 'UNAUTHORIZED');
  }
}

/** Serialize Box state without blocking Telegram's ScriptLock journal. */
function mailboxBoxStateLock_() {
  return LockService.getUserLock();
}

/** Consume the short-lived Box OAuth callback without exposing provider secrets. */
function mailboxHandleBoxOAuthCallback_(input) {
  let cleanupConfig = null;
  let cleanupRefreshToken = '';
  let pendingRevocationKey = '';
  let cleanupConnectionGeneration = '';
  try {
    if (!mailboxIsPlainObject_(input)) {
      throw mailboxError_('BOX_OAUTH_INVALID', 'Відповідь Box має некоректний формат.');
    }
    mailboxAssertAllowedKeys_(input, ['code', 'state', 'error', 'errorDescription']);
    const state = String(input.state || '');
    const code = String(input.code || '');
    const providerError = String(input.error || '');
    const errorDescription = String(input.errorDescription || '');
    if (!/^[A-Za-z0-9_-]{32,256}$/.test(state) ||
        (code && (code.length > 2048 || /[\u0000-\u001f\u007f]/.test(code))) ||
        (providerError && !/^[A-Za-z0-9_.-]{1,128}$/.test(providerError)) ||
        errorDescription.length > 500 || /[\u0000-\u001f\u007f]/.test(errorDescription) ||
        Boolean(code) === Boolean(providerError)) {
      throw mailboxError_('BOX_OAUTH_INVALID', 'Відповідь Box має некоректний формат.');
    }
    const stateRecord = mailboxBoxConsumeOauthState_(state);
    cleanupConnectionGeneration = stateRecord.connectionGeneration;
    if (providerError) {
      throw mailboxError_(
        providerError === 'access_denied' ? 'BOX_OAUTH_DENIED' : 'BOX_OAUTH_FAILED',
        providerError === 'access_denied'
          ? 'Підключення Box скасовано. Жодного доступу не збережено.'
          : 'Box не завершив авторизацію. Почніть підключення ще раз.'
      );
    }
    const config = mailboxBoxConfig_(true);
    if (!constantTimeEqual_(stateRecord.redirectHash, mailboxDigestText_(config.redirectUri))) {
      throw mailboxError_(
        'BOX_OAUTH_INVALID',
        'Адреса повернення Box змінилася. Почніть підключення ще раз.'
      );
    }
    if (!mailboxBoxRetryPendingRevocations_(config, '')) {
      throw mailboxError_(
        'BOX_CLEANUP_PENDING',
        'Box ще завершує безпечне відкликання попереднього доступу.'
      );
    }
    const tokenResponse = mailboxBoxExchangeAuthorizationCode_(config, code);
    cleanupConfig = config;
    cleanupRefreshToken = tokenResponse.refreshToken;
    const pendingLock = mailboxBoxStateLock_();
    if (!pendingLock.tryLock(5000)) {
      throw mailboxError_('BUSY', 'Box зараз зберігає ключ відкликання. Спробуйте ще раз.');
    }
    try {
      pendingRevocationKey = mailboxBoxEnqueuePendingRevocationLocked_(
        PropertiesService.getScriptProperties(), tokenResponse.refreshToken, 'provisional'
      );
    } finally {
      pendingLock.releaseLock();
    }
    const identity = mailboxBoxFetchUserWithAccess_(tokenResponse.accessToken);
    const record = mailboxBoxCreateTokenRecord_(tokenResponse, identity.account);
    const lock = mailboxBoxStateLock_();
    if (!lock.tryLock(5000)) {
      throw mailboxError_('BUSY', 'Box зараз підключається. Спробуйте ще раз.');
    }
    let commitError = null;
    try {
      const properties = PropertiesService.getScriptProperties();
      const currentGeneration = mailboxBoxCurrentConnectionGeneration_(properties);
      const tokenAlreadyStored = Boolean(String(
        properties.getProperty(MAILBOX_CLIENT_CONFIG_.BOX_TOKEN_PROPERTY) || ''
      ));
      if (!currentGeneration ||
          !constantTimeEqual_(currentGeneration, stateRecord.connectionGeneration)) {
        commitError = mailboxError_(
          'BOX_OAUTH_INVALID',
          'Стан підключення Box змінився. Почніть підключення ще раз.'
        );
      } else if (tokenAlreadyStored) {
        commitError = mailboxError_(
          'BOX_OAUTH_INVALID',
          'Інше підключення Box уже завершено. Нові дані не збережено.'
        );
      } else {
        try {
          properties.deleteProperty(MAILBOX_CLIENT_CONFIG_.BOX_REFRESH_JOURNAL_PROPERTY);
          mailboxBoxDeleteOauthStates_(properties);
          properties.setProperty(
            MAILBOX_CLIENT_CONFIG_.BOX_TOKEN_PROPERTY,
            JSON.stringify(record)
          );
        } catch (error) {
          try { mailboxBoxWriteReauthLocked_(properties, 'oauth_commit_failed'); }
          catch (storageError) {}
          commitError = mailboxError_(
            'STORAGE_FULL',
            'Не вдалося безпечно зберегти підключення Box. Спробуйте ще раз.'
          );
        }
      }
    } catch (error) {
      commitError = error && error.mailboxCode
        ? error
        : mailboxError_(
            'STORAGE_FULL',
            'Не вдалося перевірити захищений стан Box. Спробуйте ще раз.'
          );
    } finally {
      lock.releaseLock();
    }
    if (commitError) {
      throw commitError;
    }
    cleanupRefreshToken = '';
    mailboxBoxDropProvisionalRevocationBestEffort_(
      pendingRevocationKey, tokenResponse.refreshToken
    );
    return {
      ok: true,
      title: 'Box підключено',
      message: 'Доступ лише для читання підтверджено. Можна повернутися до Mini App.',
    };
  } catch (error) {
    if (cleanupConfig && cleanupRefreshToken) {
      mailboxBoxCleanupFailedGrant_(cleanupConfig, cleanupRefreshToken,
        pendingRevocationKey, cleanupConnectionGeneration);
    }
    const known = error && error.mailboxCode;
    return {
      ok: false,
      title: 'Box не підключено',
      message: mailboxSafeText_(
        known
          ? error.message
          : 'Не вдалося завершити підключення Box. Почніть його ще раз у Mini App.',
        500
      ),
    };
  }
}

function mailboxBoxStatus_(payload, session) {
  mailboxAssertAttachmentSourceSession_(session);
  mailboxAssertLegacyAttachmentOwner_(session);
  mailboxAssertAllowedKeys_(payload, []);
  const config = mailboxBoxConfig_(false);
  const properties = PropertiesService.getScriptProperties();
  if (!config) {
    const lock = mailboxBoxStateLock_();
    if (!lock.tryLock(5000)) return { connected: false, status: 'cleanup_pending' };
    try {
      const pending = mailboxBoxPendingRevocationEntriesLocked_(properties).length > 0;
      return { connected: false, status: pending ? 'cleanup_pending' : 'not_configured' };
    } catch (error) {
      return { connected: false, status: 'cleanup_manual' };
    } finally {
      lock.releaseLock();
    }
  }
  try {
    if (!mailboxBoxRetryPendingRevocations_(config, '')) {
      return { connected: false, status: 'cleanup_pending' };
    }
  } catch (error) {
    if (error && error.mailboxCode === 'BOX_CLEANUP_MANUAL') {
      return { connected: false, status: 'cleanup_manual' };
    }
    throw error;
  }
  let stored;
  try {
    stored = mailboxBoxReadTokenRecord_(properties);
  } catch (error) {
    if (error && error.mailboxCode === 'BOX_REAUTH_REQUIRED') {
      return { connected: false, status: 'cleanup_manual' };
    }
    throw error;
  }
  if (!stored || stored.status !== 'active') {
    return { connected: false, status: stored ? 'reauth_required' : 'disconnected' };
  }
  try {
    const requestContext = {};
    const identity = mailboxBoxApiJsonRequest_(
      '/users/me?fields=id,name,login,status,space_amount,space_used',
      requestContext
    );
    if (!constantTimeEqual_(String(identity.id || ''), String(requestContext.accountId || ''))) {
      const disposition = mailboxBoxMarkReauthRequiredIfCurrent_(
        'account_changed',
        requestContext.connectionGeneration,
        requestContext.accessDigest
      );
      if (disposition === 'changed') {
        throw mailboxError_('BOX_BUSY', 'Підключення Box змінилося. Повторіть перевірку.');
      }
      return { connected: false, status: 'cleanup_pending' };
    }
    const safe = mailboxBoxIdentityDto_(identity);
    return {
      connected: true,
      status: 'connected',
      account: safe.account,
      capacity: safe.capacity,
    };
  } catch (error) {
    if (error && error.mailboxCode === 'BOX_REAUTH_REQUIRED') {
      return { connected: false, status: 'cleanup_pending' };
    }
    throw error;
  }
}

function mailboxBoxConnectStart_(payload, session) {
  mailboxAssertAttachmentSourceSession_(session);
  mailboxAssertLegacyAttachmentOwner_(session);
  mailboxAssertAllowedKeys_(payload, []);
  const config = mailboxBoxConfig_(true);
  if (!mailboxBoxRetryPendingRevocations_(config, '')) {
    throw mailboxError_(
      'BOX_CLEANUP_PENDING',
      'Попередній доступ Box ще не відкликано. Повторіть спробу пізніше.'
    );
  }
  const ownerId = mailboxOwnerId_();
  const familyId = String(session && session.familyId || '');
  if (!/^[A-Za-z0-9_-]{43}$/.test(familyId)) {
    throw mailboxError_('UNAUTHORIZED', 'Сеанс пошти не може підключити Box.');
  }
  const state = mailboxRandomToken_();
  const now = Date.now();
  const properties = PropertiesService.getScriptProperties();
  const lock = mailboxBoxStateLock_();
  if (!lock.tryLock(5000)) {
    throw mailboxError_('BUSY', 'Box зараз підключається. Спробуйте ще раз.');
  }
  try {
    if (mailboxBoxPendingRevocationEntriesLocked_(properties).length) {
      throw mailboxError_(
        'BOX_CLEANUP_PENDING',
        'Попередній доступ Box ще не відкликано.'
      );
    }
    const family = mailboxReadRefreshFamilies_(
      properties,
      Math.floor(now / 1000)
    ).find(item =>
      constantTimeEqual_(String(item.fid), familyId) &&
      constantTimeEqual_(String(item.sub), ownerId)
    );
    if (!family ||
        !/^mailbox\.session\.v1\.[A-Za-z0-9_-]{43}$/.test(String(family.sessionKey || ''))) {
      throw mailboxError_('SESSION_EXPIRED', 'Сеанс, що підключає Box, уже завершився.');
    }
    const rawStoredToken = String(
      properties.getProperty(MAILBOX_CLIENT_CONFIG_.BOX_TOKEN_PROPERTY) || ''
    );
    let stored = null;
    try {
      stored = mailboxBoxReadTokenRecord_(properties);
    } catch (error) {
      if (error && error.mailboxCode === 'BOX_REAUTH_REQUIRED') {
        throw mailboxError_(
          'BOX_CLEANUP_MANUAL',
          'Захищений стан Box пошкоджено. Автоматичне перепідключення заблоковано.'
        );
      }
      throw error;
    }
    if (stored && stored.status === 'active') {
      throw mailboxError_(
        'BOX_ALREADY_CONNECTED',
        'Box уже підключено. Спочатку від’єднайте поточний обліковий запис.'
      );
    }
    if (rawStoredToken && stored && stored.status === 'reauth_required') {
      properties.deleteProperty(MAILBOX_CLIENT_CONFIG_.BOX_TOKEN_PROPERTY);
    }
    const connectionGeneration = mailboxBoxRotateConnectionGenerationLocked_(properties);
    mailboxBoxDeleteOauthStates_(properties);
    const record = {
      v: 1,
      ownerId,
      familyId,
      sessionKey: String(family.sessionKey),
      connectionGeneration,
      issuedAt: now,
      expiresAt: now + MAILBOX_CLIENT_CONFIG_.BOX_STATE_SECONDS * 1000,
      redirectHash: mailboxDigestText_(config.redirectUri),
    };
    properties.setProperty(
      MAILBOX_CLIENT_CONFIG_.BOX_STATE_PREFIX + mailboxDigestText_(state),
      JSON.stringify(record)
    );
  } finally {
    lock.releaseLock();
  }
  const query = [
    'response_type=code',
    'client_id=' + encodeURIComponent(config.clientId),
    'redirect_uri=' + encodeURIComponent(config.redirectUri),
    'scope=root_readonly',
    'state=' + encodeURIComponent(state),
  ].join('&');
  return {
    authorizationUrl: 'https://account.box.com/api/oauth2/authorize?' + query,
    expiresInSeconds: MAILBOX_CLIENT_CONFIG_.BOX_STATE_SECONDS,
  };
}

function mailboxBoxDisconnect_(payload, session) {
  mailboxAssertAttachmentSourceSession_(session);
  mailboxAssertLegacyAttachmentOwner_(session);
  mailboxAssertAllowedKeys_(payload, []);
  const config = mailboxBoxConfig_(true);
  const properties = PropertiesService.getScriptProperties();
  let pendingKey = '';
  const stageLock = mailboxBoxStateLock_();
  if (!stageLock.tryLock(5000)) {
    throw mailboxError_('BUSY', 'Box зараз оновлює доступ. Спробуйте ще раз.');
  }
  try {
    const queued = mailboxBoxPendingRevocationEntriesLocked_(properties);
    let record;
    try {
      record = mailboxBoxReadTokenRecord_(properties);
    } catch (error) {
      if (error && error.mailboxCode === 'BOX_REAUTH_REQUIRED') {
        throw mailboxError_(
          'BOX_CLEANUP_MANUAL',
          'Захищений стан Box пошкоджено. Автоматичне видалення заблоковано.'
        );
      }
      throw error;
    }
    queued.forEach(item => {
      mailboxBoxEnqueuePendingRevocationLocked_(
        properties, item.record.refreshToken, 'cleanup'
      );
    });
    if (queued.length) pendingKey = queued[0].key;
    mailboxBoxRotateConnectionGenerationLocked_(properties);
    mailboxBoxDeleteOauthStates_(properties);
    if (record && record.status === 'active') {
      pendingKey = MAILBOX_CLIENT_CONFIG_.BOX_PENDING_REVOCATION_PREFIX +
        mailboxDigestText_(record.refreshToken);
      mailboxBoxWriteReauthLocked_(properties, 'disconnecting', record);
    }
  } finally {
    stageLock.releaseLock();
  }
  // The revoke request is performed by the CAS-based queue worker without a
  // Box UserLock or global ScriptLock. A failed provider call stays durably queued.
  if (pendingKey && !mailboxBoxRetryPendingRevocations_(config, pendingKey)) {
    throw mailboxError_(
      'BOX_CLEANUP_PENDING',
      'Box ще не підтвердив відкликання доступу. Повторіть спробу пізніше.'
    );
  }
  const finalizeLock = mailboxBoxStateLock_();
  if (!finalizeLock.tryLock(5000)) {
    throw mailboxError_('BUSY', 'Box підтвердив відкликання. Завершіть від’єднання ще раз.');
  }
  try {
    if (mailboxBoxPendingRevocationEntriesLocked_(properties).length) {
      throw mailboxError_('BOX_CLEANUP_PENDING', 'Відкликання Box ще не завершено.');
    }
    const finalRecord = mailboxBoxReadTokenRecord_(properties);
    if (finalRecord && finalRecord.status === 'active') {
      throw mailboxError_('BOX_BUSY', 'Підключення Box змінилося. Повторіть від’єднання.');
    }
    properties.deleteProperty(MAILBOX_CLIENT_CONFIG_.BOX_TOKEN_PROPERTY);
    properties.deleteProperty(MAILBOX_CLIENT_CONFIG_.BOX_REFRESH_JOURNAL_PROPERTY);
  } finally {
    finalizeLock.releaseLock();
  }
  return {
    disconnected: true,
    connected: false,
    status: 'disconnected',
    revoked: true,
  };
}

function mailboxBoxConfig_(required) {
  const properties = PropertiesService.getScriptProperties();
  const clientId = String(
    properties.getProperty(MAILBOX_CLIENT_CONFIG_.BOX_CLIENT_ID_PROPERTY) || ''
  );
  const clientSecret = String(
    properties.getProperty(MAILBOX_CLIENT_CONFIG_.BOX_CLIENT_SECRET_PROPERTY) || ''
  );
  const redirectUri = String(
    properties.getProperty(MAILBOX_CLIENT_CONFIG_.BOX_REDIRECT_URI_PROPERTY) || ''
  );
  if (!clientId && !clientSecret && !redirectUri && !required) return null;
  let parsed = null;
  try { parsed = new URL(redirectUri); } catch (error) { parsed = null; }
  const valid = /^[A-Za-z0-9_-]{8,200}$/.test(clientId) &&
    /^[^\s\u0000-\u001f\u007f]{8,1024}$/.test(clientSecret) &&
    parsed && parsed.protocol === 'https:' && parsed.hostname === 'script.google.com' &&
    !parsed.username && !parsed.password && (!parsed.port || parsed.port === '443') &&
    /^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(parsed.pathname) &&
    parsed.search === '?action=box_oauth_callback' && !parsed.hash;
  if (!valid) {
    throw mailboxError_('BOX_NOT_CONFIGURED', 'Box ще не налаштовано на сервері.');
  }
  return { clientId, clientSecret, redirectUri };
}
function mailboxBoxRotateConnectionGenerationLocked_(properties) {
  const generation = mailboxRandomToken_();
  try {
    properties.setProperty(
      MAILBOX_CLIENT_CONFIG_.BOX_CONNECTION_GENERATION_PROPERTY,
      generation
    );
  } catch (error) {
    throw mailboxError_(
      'STORAGE_FULL',
      'Не вдалося оновити захищений стан підключення Box.'
    );
  }
  return generation;
}

function mailboxBoxCurrentConnectionGeneration_(properties) {
  const generation = String(
    properties.getProperty(MAILBOX_CLIENT_CONFIG_.BOX_CONNECTION_GENERATION_PROPERTY) || ''
  );
  return /^[A-Za-z0-9_-]{43}$/.test(generation) ? generation : '';
}

function mailboxBoxConsumeOauthState_(state) {
  const properties = PropertiesService.getScriptProperties();
  const key = MAILBOX_CLIENT_CONFIG_.BOX_STATE_PREFIX + mailboxDigestText_(state);
  const lock = mailboxBoxStateLock_();
  if (!lock.tryLock(5000)) {
    throw mailboxError_('BUSY', 'Box зараз завершує підключення. Спробуйте ще раз.');
  }
  try {
    const raw = String(properties.getProperty(key) || '');
    if (!raw) {
      throw mailboxError_(
        'BOX_OAUTH_INVALID',
        'Посилання Box уже використано або воно застаріло.'
      );
    }
    let record = null;
    try { record = JSON.parse(raw); } catch (error) { record = null; }
    properties.deleteProperty(key);
    const keys = record && mailboxIsPlainObject_(record)
      ? Object.keys(record).sort()
      : [];
    const expected = [
      'connectionGeneration', 'expiresAt', 'familyId', 'issuedAt',
      'ownerId', 'redirectHash', 'sessionKey', 'v',
    ];
    const valid = keys.length === expected.length &&
      keys.every((item, index) => item === expected[index]) &&
      record.v === 1 && /^\d{1,24}$/.test(String(record.ownerId || '')) &&
      /^[A-Za-z0-9_-]{43}$/.test(String(record.familyId || '')) &&
      /^mailbox\.session\.v1\.[A-Za-z0-9_-]{43}$/.test(String(record.sessionKey || '')) &&
      /^[A-Za-z0-9_-]{43}$/.test(String(record.connectionGeneration || '')) &&
      /^[A-Za-z0-9_-]{43}$/.test(String(record.redirectHash || '')) &&
      Number.isInteger(record.issuedAt) && Number.isInteger(record.expiresAt) &&
      record.expiresAt - record.issuedAt ===
        MAILBOX_CLIENT_CONFIG_.BOX_STATE_SECONDS * 1000;
    if (!valid || record.issuedAt > Date.now() + 60000 ||
        record.expiresAt <= Date.now() ||
        !constantTimeEqual_(String(record.ownerId), mailboxOwnerId_())) {
      throw mailboxError_(
        'BOX_OAUTH_INVALID',
        'Посилання Box уже використано або воно застаріло.'
      );
    }
    const active = mailboxReadRefreshFamilies_(
      properties,
      Math.floor(Date.now() / 1000)
    ).some(item =>
      constantTimeEqual_(String(item.fid), String(record.familyId)) &&
      constantTimeEqual_(String(item.sub), String(record.ownerId)) &&
      constantTimeEqual_(String(item.sessionKey), String(record.sessionKey))
    );
    if (!active) {
      throw mailboxError_(
        'BOX_OAUTH_INVALID',
        'Сеанс, що почав підключення Box, уже завершився.'
      );
    }
    return record;
  } finally {
    lock.releaseLock();
  }
}

function mailboxBoxPruneOauthStates_(properties, nowValue) {
  const now = Number(nowValue || Date.now());
  const all = properties.getProperties();
  const active = [];
  Object.keys(all)
    .filter(key => key.indexOf(MAILBOX_CLIENT_CONFIG_.BOX_STATE_PREFIX) === 0)
    .forEach(key => {
      let value = null;
      try { value = JSON.parse(String(all[key] || '')); } catch (error) { value = null; }
      if (!value || !Number.isInteger(value.expiresAt) || value.expiresAt <= now) {
        properties.deleteProperty(key);
      } else {
        active.push({ key, issuedAt: Number(value.issuedAt || 0) });
      }
    });
  active.sort((a, b) => a.issuedAt - b.issuedAt);
  while (active.length >= MAILBOX_CLIENT_CONFIG_.BOX_STATE_LIMIT) {
    properties.deleteProperty(active.shift().key);
  }
}

function mailboxBoxDeleteOauthStates_(properties) {
  Object.keys(properties.getProperties()).forEach(key => {
    if (key.indexOf(MAILBOX_CLIENT_CONFIG_.BOX_STATE_PREFIX) === 0) {
      properties.deleteProperty(key);
    }
  });
}
function mailboxBoxExchangeAuthorizationCode_(config, code) {
  let response;
  try {
    response = UrlFetchApp.fetch('https://api.box.com/oauth2/token', {
      method: 'post',
      contentType: 'application/x-www-form-urlencoded',
      payload: {
        grant_type: 'authorization_code',
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
      },
      muteHttpExceptions: true,
      followRedirects: false,
    });
  } catch (error) {
    throw mailboxError_(
      'BOX_OAUTH_FAILED',
      'Box не відповів під час авторизації. Почніть підключення ще раз.'
    );
  }
  if (Number(response.getResponseCode()) !== 200) {
    throw mailboxError_(
      'BOX_OAUTH_FAILED',
      'Box відхилив код авторизації. Почніть підключення ще раз.'
    );
  }
  return mailboxBoxParseTokenResponse_(response);
}

function mailboxBoxParseTokenResponse_(response) {
  const value = mailboxBoxParseJsonResponse_(response);
  const accessToken = mailboxBoxSafeToken_(value && value.access_token);
  const refreshToken = mailboxBoxSafeToken_(value && value.refresh_token);
  const expiresIn = Number(value && value.expires_in);
  if (!accessToken || !refreshToken || !Number.isInteger(expiresIn) ||
      expiresIn < 60 || expiresIn > 86400 ||
      (value.token_type && String(value.token_type).toLowerCase() !== 'bearer')) {
    throw mailboxError_(
      'BOX_REAUTH_REQUIRED',
      'Box повернув неповні облікові дані. Підключіть Box знову.'
    );
  }
  return { accessToken, refreshToken, expiresIn };
}

function mailboxBoxSafeToken_(value) {
  const token = String(value || '');
  return token.length >= 16 && token.length <= 4096 &&
    !/[\s\u0000-\u001f\u007f]/.test(token)
    ? token
    : '';
}

function mailboxBoxParseJsonResponse_(response) {
  let value = null;
  try {
    value = JSON.parse(String(response && response.getContentText() || ''));
  } catch (error) {
    value = null;
  }
  return mailboxIsPlainObject_(value) ? value : null;
}

function mailboxBoxFetchUserWithAccess_(accessToken) {
  let response;
  try {
    response = UrlFetchApp.fetch(
      'https://api.box.com/2.0/users/me?fields=id,name,login,status,space_amount,space_used',
      {
        method: 'get',
        headers: { Authorization: 'Bearer ' + accessToken },
        muteHttpExceptions: true,
        followRedirects: false,
      }
    );
  } catch (error) {
    throw mailboxError_(
      'BOX_OAUTH_FAILED',
      'Не вдалося перевірити обліковий запис Box. Почніть підключення ще раз.'
    );
  }
  if (Number(response.getResponseCode()) !== 200) {
    throw mailboxError_(
      'BOX_OAUTH_FAILED',
      'Box не підтвердив обліковий запис. Почніть підключення ще раз.'
    );
  }
  const value = mailboxBoxParseJsonResponse_(response);
  if (!value) {
    throw mailboxError_('BOX_OAUTH_FAILED', 'Box повернув некоректні дані облікового запису.');
  }
  return mailboxBoxIdentityDto_(value);
}

function mailboxBoxIdentityDto_(value) {
  const id = String(value && value.id || '');
  const status = String(value && value.status || 'active').toLowerCase();
  if (!/^\d{1,32}$/.test(id) || status !== 'active') {
    throw mailboxError_('BOX_FORBIDDEN', 'Обліковий запис Box неактивний або недоступний.');
  }
  const used = mailboxSafeCount_(value && value.space_used);
  const total = mailboxSafeCount_(value && value.space_amount);
  return {
    account: {
      id,
      name: mailboxSafeText_(value && value.name, 160) || 'Box',
      login: mailboxSafeText_(value && value.login, 254),
    },
    capacity: {
      usedBytes: used,
      totalBytes: total || null,
    },
  };
}

function mailboxBoxCreateTokenRecord_(tokenResponse, accountValue) {
  const now = Date.now();
  const account = accountValue || {};
  const accessToken = mailboxBoxSafeToken_(tokenResponse && tokenResponse.accessToken);
  const refreshToken = mailboxBoxSafeToken_(tokenResponse && tokenResponse.refreshToken);
  const expiresIn = Number(tokenResponse && tokenResponse.expiresIn);
  if (!accessToken || !refreshToken || !Number.isInteger(expiresIn) ||
      !/^\d{1,32}$/.test(String(account.id || ''))) {
    throw mailboxError_('BOX_OAUTH_FAILED', 'Box не підтвердив власника облікового запису.');
  }
  return {
    v: 1,
    status: 'active',
    accessToken,
    refreshToken,
    accessExpiresAt: now + expiresIn * 1000,
    refreshExpiresAt: now + MAILBOX_CLIENT_CONFIG_.BOX_REFRESH_TOKEN_SECONDS * 1000,
    updatedAt: now,
    account: {
      id: String(account.id),
      name: mailboxSafeText_(account.name, 160) || 'Box',
      login: mailboxSafeText_(account.login, 254),
    },
  };
}

function mailboxBoxReadTokenRecord_(properties) {
  const raw = String(
    properties.getProperty(MAILBOX_CLIENT_CONFIG_.BOX_TOKEN_PROPERTY) || ''
  );
  if (!raw) return null;
  let value = null;
  try { value = JSON.parse(raw); } catch (error) { value = null; }
  if (value && value.v === 1 && value.status === 'reauth_required' &&
      Number.isInteger(value.updatedAt) &&
      mailboxSafeText_(value.reason, 80) === String(value.reason || '')) {
    return value;
  }
  const account = value && value.account;
  const valid = value && value.v === 1 && value.status === 'active' &&
    mailboxBoxSafeToken_(value.accessToken) === value.accessToken &&
    mailboxBoxSafeToken_(value.refreshToken) === value.refreshToken &&
    Number.isInteger(value.accessExpiresAt) && Number.isInteger(value.refreshExpiresAt) &&
    Number.isInteger(value.updatedAt) && value.accessExpiresAt > value.updatedAt &&
    value.refreshExpiresAt > value.accessExpiresAt && account &&
    /^\d{1,32}$/.test(String(account.id || '')) &&
    mailboxSafeText_(account.name, 160) === String(account.name || '') &&
    mailboxSafeText_(account.login, 254) === String(account.login || '');
  if (!valid) {
    throw mailboxError_(
      'BOX_REAUTH_REQUIRED',
      'Захищений стан Box пошкоджено. Підключіть Box знову.'
    );
  }
  return value;
}

function mailboxBoxReadRefreshJournal_(properties) {
  const raw = String(
    properties.getProperty(MAILBOX_CLIENT_CONFIG_.BOX_REFRESH_JOURNAL_PROPERTY) || ''
  );
  if (!raw) return null;
  let value = null;
  try { value = JSON.parse(raw); } catch (error) { value = null; }
  const valid = value && value.v === 1 &&
    ['started', 'completed', 'ambiguous'].indexOf(value.status) !== -1 &&
    /^[A-Za-z0-9_-]{43}$/.test(String(value.attemptId || '')) &&
    /^[A-Za-z0-9_-]{43}$/.test(String(value.refreshDigest || '')) &&
    Number.isInteger(value.startedAt);
  if (!valid) {
    throw mailboxError_(
      'BOX_REAUTH_REQUIRED',
      'Журнал оновлення Box пошкоджено. Підключіть Box знову.'
    );
  }
  return value;
}

function mailboxBoxWriteReauthLocked_(properties, reason, recordValue) {
  const record = recordValue || null;
  if (record && record.status === 'active' && mailboxBoxSafeToken_(record.refreshToken)) {
    mailboxBoxEnqueuePendingRevocationLocked_(
      properties, record.refreshToken, 'cleanup'
    );
  }
  mailboxBoxWriteReauthMarkerLocked_(properties, reason);
}

function mailboxBoxMarkReauthRequiredIfCurrent_(
  reason,
  expectedConnectionGeneration,
  expectedAccessDigest
) {
  const expectedGeneration = String(expectedConnectionGeneration || '');
  const expectedDigest = String(expectedAccessDigest || '');
  if ((expectedGeneration && !/^[A-Za-z0-9_-]{43}$/.test(expectedGeneration)) ||
      !/^[A-Za-z0-9_-]{43}$/.test(expectedDigest)) {
    return 'changed';
  }
  const lock = mailboxBoxStateLock_();
  if (!lock.tryLock(5000)) {
    throw mailboxError_('BUSY', 'Box зараз оновлює доступ. Спробуйте ще раз.');
  }
  try {
    const properties = PropertiesService.getScriptProperties();
    let record;
    try {
      record = mailboxBoxReadTokenRecord_(properties);
    } catch (error) {
      if (error && error.mailboxCode === 'BOX_REAUTH_REQUIRED') return 'not_active';
      throw error;
    }
    if (!record || record.status !== 'active') return 'not_active';
    const currentGeneration = mailboxBoxCurrentConnectionGeneration_(properties);
    const currentDigest = mailboxDigestText_(record.accessToken);
    if (!constantTimeEqual_(currentGeneration, expectedGeneration) ||
        !constantTimeEqual_(currentDigest, expectedDigest)) {
      return 'changed';
    }
    mailboxBoxWriteReauthLocked_(properties, reason, record);
    return 'marked';
  } finally {
    lock.releaseLock();
  }
}

function mailboxBoxAccessContext_(forceRefresh, rejectedAccessDigest) {
  const lock = mailboxBoxStateLock_();
  if (!lock.tryLock(5000)) {
    throw mailboxError_('BUSY', 'Box зараз оновлює доступ. Спробуйте ще раз.');
  }
  try {
    const properties = PropertiesService.getScriptProperties();
    let record = mailboxBoxReadTokenRecord_(properties);
    if (!record || record.status !== 'active') {
      throw mailboxError_('BOX_REAUTH_REQUIRED', 'Підключіть Box знову.');
    }
    const pendingRevocations = mailboxBoxPendingRevocationEntriesLocked_(properties);
    const matchingCleanup = pendingRevocations.some(item =>
      item.record.kind === 'cleanup' &&
      constantTimeEqual_(item.record.refreshToken, record.refreshToken)
    );
    if (matchingCleanup) {
      throw mailboxError_(
        'BOX_CLEANUP_PENDING',
        'Box завершує відкликання цього доступу. Дочекайтеся завершення.'
      );
    }
    const connectionGeneration = mailboxBoxCurrentConnectionGeneration_(properties);
    const refreshDigest = mailboxDigestText_(record.refreshToken);
    let journal;
    try {
      journal = mailboxBoxReadRefreshJournal_(properties);
    } catch (error) {
      try { mailboxBoxWriteReauthLocked_(properties, 'invalid_refresh_journal', record); }
      catch (storageError) {}
      throw error;
    }
    if (journal && (journal.status === 'started' || journal.status === 'ambiguous') &&
        constantTimeEqual_(journal.refreshDigest, refreshDigest)) {
      try { mailboxBoxWriteReauthLocked_(properties, 'ambiguous_refresh', record); }
      catch (error) {}
      throw mailboxError_(
        'BOX_REAUTH_REQUIRED',
        'Попереднє оновлення Box завершилося невизначено. Підключіть Box знову.'
      );
    }
    const now = Date.now();
    if (record.refreshExpiresAt <=
        now + MAILBOX_CLIENT_CONFIG_.BOX_TOKEN_SKEW_SECONDS * 1000) {
      mailboxBoxWriteReauthLocked_(properties, 'refresh_expired', record);
      throw mailboxError_(
        'BOX_REAUTH_REQUIRED',
        'Термін підключення Box завершився. Підключіть Box знову.'
      );
    }
    const accessDigest = mailboxDigestText_(record.accessToken);
    if (forceRefresh && rejectedAccessDigest &&
        !constantTimeEqual_(accessDigest, rejectedAccessDigest)) {
      return {
        accessToken: record.accessToken,
        accessDigest,
        connectionGeneration,
        account: record.account,
        refreshed: false,
      };
    }
    if (!forceRefresh && record.accessExpiresAt >
        now + MAILBOX_CLIENT_CONFIG_.BOX_TOKEN_SKEW_SECONDS * 1000) {
      return {
        accessToken: record.accessToken,
        accessDigest,
        connectionGeneration,
        account: record.account,
        refreshed: false,
      };
    }
    record = mailboxBoxRefreshLocked_(properties, record);
    return {
      accessToken: record.accessToken,
      accessDigest: mailboxDigestText_(record.accessToken),
      connectionGeneration,
      account: record.account,
      refreshed: true,
    };
  } finally {
    lock.releaseLock();
  }
}

function mailboxBoxRefreshLocked_(properties, record) {
  const config = mailboxBoxConfig_(true);
  const attempt = {
    v: 1,
    status: 'started',
    attemptId: mailboxRandomToken_(),
    refreshDigest: mailboxDigestText_(record.refreshToken),
    startedAt: Date.now(),
  };
  try {
    properties.setProperty(
      MAILBOX_CLIENT_CONFIG_.BOX_REFRESH_JOURNAL_PROPERTY,
      JSON.stringify(attempt)
    );
  } catch (error) {
    throw mailboxError_(
      'STORAGE_FULL',
      'Не вдалося почати безпечне оновлення Box. Доступ не змінено.'
    );
  }
  let response;
  try {
    response = UrlFetchApp.fetch('https://api.box.com/oauth2/token', {
      method: 'post',
      contentType: 'application/x-www-form-urlencoded',
      payload: {
        grant_type: 'refresh_token',
        refresh_token: record.refreshToken,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      },
      muteHttpExceptions: true,
      followRedirects: false,
    });
  } catch (error) {
    mailboxBoxFailClosedRefreshLocked_(properties, attempt, 'network_ambiguous', record);
    throw mailboxError_(
      'BOX_REAUTH_REQUIRED',
      'Оновлення Box завершилося невизначено. Підключіть Box знову.'
    );
  }
  if (Number(response.getResponseCode()) !== 200) {
    mailboxBoxFailClosedRefreshLocked_(properties, attempt, 'provider_rejected', record);
    throw mailboxError_(
      'BOX_REAUTH_REQUIRED',
      'Box відхилив оновлення доступу. Підключіть Box знову.'
    );
  }
  let tokenResponse;
  try {
    tokenResponse = mailboxBoxParseTokenResponse_(response);
  } catch (error) {
    mailboxBoxFailClosedRefreshLocked_(properties, attempt, 'invalid_success', record);
    throw mailboxError_(
      'BOX_REAUTH_REQUIRED',
      'Box повернув неповне оновлення. Підключіть Box знову.'
    );
  }
  let nextPendingKey = '';
  try {
    nextPendingKey = mailboxBoxEnqueuePendingRevocationLocked_(
      properties, tokenResponse.refreshToken, 'provisional'
    );
  } catch (error) {
    if (!mailboxBoxTryRevokeToken_(config, tokenResponse.refreshToken)) {
      mailboxBoxFailClosedRefreshLocked_(
        properties, attempt, 'pending_storage_failed', record, [tokenResponse.refreshToken]
      );
    } else {
      mailboxBoxFailClosedRefreshLocked_(
        properties, attempt, 'pending_storage_failed', record
      );
    }
    throw mailboxError_(
      'BOX_REAUTH_REQUIRED',
      'Не вдалося захистити оновлений доступ Box. Підключіть Box знову.'
    );
  }
  let next;
  try {
    next = mailboxBoxCreateTokenRecord_(tokenResponse, record.account);
  } catch (error) {
    mailboxBoxFailClosedRefreshLocked_(
      properties, attempt, 'invalid_success', record, [tokenResponse.refreshToken]
    );
    throw error;
  }
  try {
    properties.setProperty(
      MAILBOX_CLIENT_CONFIG_.BOX_TOKEN_PROPERTY,
      JSON.stringify(next)
    );
  } catch (error) {
    mailboxBoxFailClosedRefreshLocked_(
      properties, attempt, 'storage_ambiguous', record, [tokenResponse.refreshToken]
    );
    throw mailboxError_(
      'BOX_REAUTH_REQUIRED',
      'Не вдалося надійно зберегти оновлення Box. Підключіть Box знову.'
    );
  }
  try { properties.deleteProperty(nextPendingKey); } catch (error) {}
  try {
    properties.setProperty(
      MAILBOX_CLIENT_CONFIG_.BOX_REFRESH_JOURNAL_PROPERTY,
      JSON.stringify({
        v: 1,
        status: 'completed',
        attemptId: attempt.attemptId,
        refreshDigest: attempt.refreshDigest,
        startedAt: attempt.startedAt,
        finishedAt: Date.now(),
      })
    );
  } catch (error) {
    // The new refresh-token digest no longer matches the started journal.
  }
  return next;
}

function mailboxBoxFailClosedRefreshLocked_(
  properties,
  attempt,
  reason,
  recordValue,
  additionalTokensValue
) {
  try {
    properties.setProperty(
      MAILBOX_CLIENT_CONFIG_.BOX_REFRESH_JOURNAL_PROPERTY,
      JSON.stringify({
        v: 1,
        status: 'ambiguous',
        attemptId: attempt.attemptId,
        refreshDigest: attempt.refreshDigest,
        startedAt: attempt.startedAt,
        finishedAt: Date.now(),
      })
    );
  } catch (error) {}
  try {
    (additionalTokensValue || []).forEach(token =>
      mailboxBoxEnqueuePendingRevocationLocked_(properties, token, 'cleanup')
    );
    mailboxBoxWriteReauthLocked_(properties, reason, recordValue || null);
  } catch (error) {
    // Never erase the active record unless every known refresh token is queued.
  }
}

function mailboxBoxApiJsonRequest_(requestPath, requestContextValue) {
  const path = String(requestPath || '');
  if (!/^\/(?:users\/me|folders\/\d{1,32}(?:\/items)?|files\/\d{1,32}|search)(?:\?|$)/.test(path)) {
    throw mailboxError_('INVALID_SOURCE', 'Некоректний шлях Box API.');
  }
  let access = mailboxBoxAccessContext_(false, '');
  let response = mailboxBoxAuthorizedGet_(path, access.accessToken);
  if (Number(response.getResponseCode()) === 401 && !access.refreshed) {
    access = mailboxBoxAccessContext_(true, access.accessDigest);
    response = mailboxBoxAuthorizedGet_(path, access.accessToken);
  }
  if (mailboxIsPlainObject_(requestContextValue)) {
    requestContextValue.connectionGeneration = access.connectionGeneration;
    requestContextValue.accessDigest = access.accessDigest;
    requestContextValue.accountId = String(access.account && access.account.id || '');
  }
  const status = Number(response.getResponseCode());
  if (status === 401) {
    const disposition = mailboxBoxMarkReauthRequiredIfCurrent_(
      'provider_unauthorized',
      access.connectionGeneration,
      access.accessDigest
    );
    if (disposition === 'changed') {
      throw mailboxError_('BOX_BUSY', 'Підключення Box змінилося. Повторіть запит.');
    }
    throw mailboxError_('BOX_REAUTH_REQUIRED', 'Box відкликав доступ. Підключіть Box знову.');
  }
  if (status === 403) {
    throw mailboxError_('BOX_FORBIDDEN', 'Box не дозволив прочитати цей файл або папку.');
  }
  if (status === 404) {
    throw mailboxError_('BOX_NOT_FOUND', 'Файл або папку Box не знайдено.');
  }
  if (status === 429) {
    throw mailboxError_('BOX_BUSY', 'Box тимчасово обмежив запити. Спробуйте трохи пізніше.');
  }
  if (status < 200 || status >= 300) {
    throw mailboxError_('BOX_FAILED', 'Box тимчасово не відповідає. Спробуйте ще раз.');
  }
  const value = mailboxBoxParseJsonResponse_(response);
  if (!value) throw mailboxError_('BOX_FAILED', 'Box повернув некоректну відповідь.');
  return value;
}

function mailboxBoxAuthorizedGet_(requestPath, accessToken) {
  try {
    return UrlFetchApp.fetch('https://api.box.com/2.0' + requestPath, {
      method: 'get',
      headers: { Authorization: 'Bearer ' + accessToken },
      muteHttpExceptions: true,
      followRedirects: false,
    });
  } catch (error) {
    throw mailboxError_('BOX_FAILED', 'Не вдалося зв’язатися з Box. Спробуйте ще раз.');
  }
}

function mailboxBoxTryRevokeToken_(config, tokenValue) {
  const token = mailboxBoxSafeToken_(tokenValue);
  if (!config || !token) return false;
  let response;
  try {
    response = UrlFetchApp.fetch('https://api.box.com/oauth2/revoke', {
      method: 'post',
      contentType: 'application/x-www-form-urlencoded',
      payload: {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        token,
      },
      muteHttpExceptions: true,
      followRedirects: false,
    });
  } catch (error) {
    return false;
  }
  const status = Number(response.getResponseCode());
  if (status >= 200 && status < 300) return true;
  if (status !== 400) return false;
  const parsed = mailboxBoxParseJsonResponse_(response);
  return String(parsed && parsed.error || '') === 'invalid_token';
}

function mailboxBoxPendingRevocationEntriesLocked_(properties) {
  const all = properties.getProperties();
  const prefix = MAILBOX_CLIENT_CONFIG_.BOX_PENDING_REVOCATION_PREFIX;
  const keys = Object.keys(all).filter(key => key.indexOf(prefix) === 0).sort();
  if (keys.length > MAILBOX_CLIENT_CONFIG_.BOX_PENDING_REVOCATION_LIMIT) {
    throw mailboxError_('BOX_CLEANUP_MANUAL', 'Захищена черга відкликання Box пошкоджена.');
  }
  const now = Date.now();
  const expectedKeys = [
    'attempts', 'createdAt', 'kind', 'lastAttemptAt', 'refreshToken',
    'retryAfter', 'status', 'tokenDigest', 'v',
  ];
  return keys.map(key => {
    let value = null;
    try { value = JSON.parse(String(all[key] || '')); } catch (error) { value = null; }
    const recordKeys = value && mailboxIsPlainObject_(value)
      ? Object.keys(value).sort()
      : [];
    const token = value && mailboxBoxSafeToken_(value.refreshToken);
    const valid = recordKeys.length === expectedKeys.length &&
      recordKeys.every((item, index) => item === expectedKeys[index]) &&
      value.v === 1 && value.status === 'pending' &&
      (value.kind === 'provisional' || value.kind === 'cleanup') &&
      token && token === value.refreshToken &&
      /^[A-Za-z0-9_-]{43}$/.test(String(value.tokenDigest || '')) &&
      key === prefix + String(value.tokenDigest || '') &&
      constantTimeEqual_(mailboxDigestText_(token), String(value.tokenDigest || '')) &&
      Number.isInteger(value.createdAt) && value.createdAt > 0 &&
      value.createdAt <= now + 60000 && Number.isInteger(value.retryAfter) &&
      value.retryAfter >= value.createdAt &&
      value.retryAfter <= value.createdAt +
        MAILBOX_CLIENT_CONFIG_.BOX_PENDING_REVOCATION_GRACE_SECONDS * 1000 &&
      Number.isInteger(value.attempts) && value.attempts >= 0 && value.attempts <= 1000000 &&
      Number.isInteger(value.lastAttemptAt) &&
      (value.lastAttemptAt === 0 ||
        value.lastAttemptAt >= value.createdAt && value.lastAttemptAt <= now + 60000);
    if (!valid) {
      throw mailboxError_('BOX_CLEANUP_MANUAL', 'Захищена черга відкликання Box пошкоджена.');
    }
    return { key, record: value };
  });
}

function mailboxBoxEnqueuePendingRevocationLocked_(properties, tokenValue, kindValue) {
  const token = mailboxBoxSafeToken_(tokenValue);
  const kind = kindValue === 'provisional' ? 'provisional' : 'cleanup';
  if (!token) {
    throw mailboxError_('BOX_CLEANUP_MANUAL', 'Box повернув некоректний ключ відкликання.');
  }
  const digest = mailboxDigestText_(token);
  const key = MAILBOX_CLIENT_CONFIG_.BOX_PENDING_REVOCATION_PREFIX + digest;
  const entries = mailboxBoxPendingRevocationEntriesLocked_(properties);
  const existing = entries.find(item => item.key === key);
  const now = Date.now();
  if (existing) {
    if (!constantTimeEqual_(existing.record.refreshToken, token)) {
      throw mailboxError_('BOX_CLEANUP_MANUAL', 'Захищена черга відкликання Box пошкоджена.');
    }
    if (kind === 'cleanup' && existing.record.kind !== 'cleanup') {
      properties.setProperty(key, JSON.stringify(Object.assign({}, existing.record, {
        kind: 'cleanup',
        retryAfter: Math.min(existing.record.retryAfter, now),
      })));
    }
    return key;
  }
  if (entries.length >= MAILBOX_CLIENT_CONFIG_.BOX_PENDING_REVOCATION_LIMIT) {
    throw mailboxError_('STORAGE_FULL', 'Безпечна черга відкликання Box заповнена.');
  }
  const record = {
    v: 1,
    status: 'pending',
    kind,
    refreshToken: token,
    tokenDigest: digest,
    createdAt: now,
    retryAfter: kind === 'provisional'
      ? now + MAILBOX_CLIENT_CONFIG_.BOX_PENDING_REVOCATION_GRACE_SECONDS * 1000
      : now,
    attempts: 0,
    lastAttemptAt: 0,
  };
  const serialized = JSON.stringify(record);
  try {
    assertTelegramPropertyValueFits_(key, serialized);
    assertTelegramPropertyStoreFits_(properties, { [key]: serialized });
    properties.setProperty(key, serialized);
  } catch (error) {
    throw mailboxError_('STORAGE_FULL', 'Не вдалося зберегти ключ для відкликання Box.');
  }
  return key;
}

function mailboxBoxDropProvisionalRevocationBestEffort_(keyValue, tokenValue) {
  const key = String(keyValue || '');
  const token = mailboxBoxSafeToken_(tokenValue);
  if (!token || key !== MAILBOX_CLIENT_CONFIG_.BOX_PENDING_REVOCATION_PREFIX +
      mailboxDigestText_(token)) return;
  const lock = mailboxBoxStateLock_();
  if (!lock.tryLock(5000)) return;
  try {
    const properties = PropertiesService.getScriptProperties();
    const item = mailboxBoxPendingRevocationEntriesLocked_(properties)
      .find(entry => entry.key === key);
    if (item && item.record.kind === 'provisional' &&
        constantTimeEqual_(item.record.refreshToken, token)) {
      properties.deleteProperty(key);
    }
  } catch (error) {
    // A later retry safely reconciles a surviving provisional entry.
  } finally {
    lock.releaseLock();
  }
}

function mailboxBoxWriteReauthMarkerLocked_(properties, reason) {
  properties.setProperty(
    MAILBOX_CLIENT_CONFIG_.BOX_TOKEN_PROPERTY,
    JSON.stringify({
      v: 1,
      status: 'reauth_required',
      updatedAt: Date.now(),
      reason: mailboxSafeText_(reason || 'reauth_required', 80),
    })
  );
}

function mailboxBoxRetryPendingRevocations_(config, forceKeyValue) {
  const forceKey = String(forceKeyValue || '');
  let snapshot = null;
  const selectLock = mailboxBoxStateLock_();
  if (!selectLock.tryLock(5000)) return false;
  try {
    const properties = PropertiesService.getScriptProperties();
    const entries = mailboxBoxPendingRevocationEntriesLocked_(properties);
    if (!entries.length) return true;
    let active = null;
    try {
      const stored = mailboxBoxReadTokenRecord_(properties);
      if (stored && stored.status === 'active') active = stored;
    } catch (error) {
      active = null;
    }
    const committed = entries.find(item => item.record.kind === 'provisional' &&
      active && constantTimeEqual_(active.refreshToken, item.record.refreshToken));
    if (committed) {
      properties.deleteProperty(committed.key);
      return mailboxBoxPendingRevocationEntriesLocked_(properties).length === 0;
    }
    const now = Date.now();
    const forced = forceKey && entries.find(item => item.key === forceKey);
    const candidate = forced || entries.find(item => item.record.retryAfter <= now);
    if (!candidate) return false;
    snapshot = {
      key: candidate.key,
      refreshToken: candidate.record.refreshToken,
      tokenDigest: candidate.record.tokenDigest,
    };
  } finally {
    selectLock.releaseLock();
  }
  // Provider I/O deliberately runs without the Box UserLock. The exact key, digest
  // and token are compared again below before any marker or deletion is made.
  const confirmed = mailboxBoxTryRevokeToken_(config, snapshot.refreshToken);
  const commitLock = mailboxBoxStateLock_();
  if (!commitLock.tryLock(5000)) return false;
  try {
    const properties = PropertiesService.getScriptProperties();
    const entries = mailboxBoxPendingRevocationEntriesLocked_(properties);
    const current = entries.find(item => item.key === snapshot.key &&
      constantTimeEqual_(item.record.tokenDigest, snapshot.tokenDigest) &&
      constantTimeEqual_(item.record.refreshToken, snapshot.refreshToken));
    if (!current) return entries.length === 0;
    if (!confirmed) {
      try {
        properties.setProperty(current.key, JSON.stringify(Object.assign({}, current.record, {
          attempts: Math.min(1000000, current.record.attempts + 1),
          lastAttemptAt: Date.now(),
        })));
      } catch (error) {}
      return false;
    }
    let active = null;
    try {
      const stored = mailboxBoxReadTokenRecord_(properties);
      if (stored && stored.status === 'active') active = stored;
    } catch (error) {
      active = null;
    }
    if (active && constantTimeEqual_(active.refreshToken, current.record.refreshToken)) {
      try { mailboxBoxWriteReauthMarkerLocked_(properties, 'cleanup_revoked'); }
      catch (error) { return false; }
    }
    properties.deleteProperty(current.key);
    return mailboxBoxPendingRevocationEntriesLocked_(properties).length === 0;
  } finally {
    commitLock.releaseLock();
  }
}

function mailboxBoxCleanupFailedGrant_(
  config,
  tokenValue,
  pendingKeyValue,
  expectedGenerationValue
) {
  const token = mailboxBoxSafeToken_(tokenValue);
  if (!token) return;
  let key = String(pendingKeyValue || '');
  const expectedGeneration = String(expectedGenerationValue || '');
  const lock = mailboxBoxStateLock_();
  if (lock.tryLock(5000)) {
    try {
      const properties = PropertiesService.getScriptProperties();
      const pendingStillExists = key && Boolean(String(properties.getProperty(key) || ''));
      const currentGeneration = mailboxBoxCurrentConnectionGeneration_(properties);
      let activeSameToken = false;
      try {
        const active = mailboxBoxReadTokenRecord_(properties);
        activeSameToken = Boolean(active && active.status === 'active' &&
          constantTimeEqual_(active.refreshToken, token));
      } catch (error) {
        activeSameToken = false;
      }
      if (key && !pendingStillExists && !activeSameToken && currentGeneration &&
          expectedGeneration &&
          !constantTimeEqual_(currentGeneration, expectedGeneration)) {
        // A newer disconnect tombstone already consumed and confirmed this
        // exact provisional entry. Do not issue a duplicate revoke request.
        return;
      }
      key = mailboxBoxEnqueuePendingRevocationLocked_(
        properties, token, 'cleanup'
      );
    } catch (error) {
      key = '';
    } finally {
      lock.releaseLock();
    }
  }
  if (key) {
    try { mailboxBoxRetryPendingRevocations_(config, key); } catch (error) {}
    return;
  }
  if (mailboxBoxTryRevokeToken_(config, token)) return;
  const retryLock = mailboxBoxStateLock_();
  if (!retryLock.tryLock(5000)) return;
  try {
    mailboxBoxEnqueuePendingRevocationLocked_(
      PropertiesService.getScriptProperties(), token, 'cleanup'
    );
  } catch (error) {
    // Provider and protected storage both failed; no token is exposed or logged.
  } finally {
    retryLock.releaseLock();
  }
}

/**
 * Execute one allowlisted mailbox operation through an authenticated session.
 */
function mailboxRpc(sessionToken, request) {
  try {
    const session = mailboxRequireSession_(sessionToken);
    const normalized = mailboxNormalizeRequest_(request);
    let data;
    let executionSession = session;
    const minimumRole = mailboxRequestMinimumRole_(normalized.op);
    if (normalized.connectionId && !minimumRole) {
        throw mailboxError_('INVALID_REQUEST', 'Ця операція не підтримує окремий Gmail-акаунт у запиті.');
    }
    if (minimumRole) {
      const targetConnectionId = normalized.connectionId || session.connectionId;
      const access = mailboxMultiResolveAccess_(session, targetConnectionId, minimumRole);
      if (access.connection.status !== 'active') {
        throw mailboxError_('REAUTH_REQUIRED', 'Для вибраного Gmail-акаунта потрібно оновити доступ Google.');
      }
      executionSession = Object.assign({}, session, {
        connectionId: access.connection.id,
        zoneId: access.connection.zoneId,
        role: access.member.role,
      });
    }
    mailboxCurrentSessionContext_ = executionSession;
    try {
      data = mailboxDispatch_(normalized.op, normalized.payload, executionSession);
    } finally {
      mailboxCurrentSessionContext_ = null;
    }
    mailboxTouchSession_(sessionToken, session);
    return mailboxOk_(data);
  } catch (error) {
    return mailboxFailure_(error, 'REQUEST_FAILED');
  }
}

function mailboxDispatch_(op, payload, session) {
  if (op === 'bootstrap') return mailboxBootstrap_(payload, session);
  if (op === 'switchAccount') return mailboxSwitchAccount_(payload, session);
  if (op === 'connectGoogleStart') return mailboxGoogleConnectStart_(payload, session);
  if (op === 'accountSettings') return mailboxMultiAccountSettings_(payload, session);
  if (op === 'updateAccountSettings') return mailboxMultiUpdateAccountSettings_(payload, session);
  if (op === 'workspaceAccess') return mailboxMultiWorkspaceAccess_(payload, session);
  if (op === 'createInvite') return mailboxMultiCreateInvite_(session, payload);
  if (op === 'acceptInvite') return mailboxMultiAcceptInviteForSession_(payload, session);
  if (op === 'updateMember') return mailboxMultiUpdateMember_(payload, session);
  if (op === 'disconnectGmail') return mailboxMultiDisconnectGmail_(payload, session);
  if (op === 'list') return mailboxListThreads_(payload);
  if (op === 'unifiedList') return mailboxListUnifiedThreads_(payload, session);
  if (op === 'thread') return mailboxGetThread_(payload);
  if (op === 'attachment') return mailboxGetAttachment_(payload);
  if (op === 'sourceList') return mailboxListAttachmentSources_(payload, session);
  if (op === 'sourceMetadata') return mailboxAttachmentSourceMetadata_(payload, session);
  if (op === 'sourceContent') return mailboxAttachmentSourceContent_(payload, session);
  if (op === 'sourceAccounts') return mailboxSourceAccounts_(payload, session);
  if (op === 'sourceConnectStart') {
    if (String(payload && payload.provider || '') === 'drive') return mailboxDriveConnectStart_(payload, session);
    if (String(payload && payload.provider || '') === 'box') return mailboxBoxSourceConnectStart_(payload, session);
    throw mailboxError_('INVALID_SOURCE', 'Цей провайдер ще не підтримує нове підключення.');
  }
  if (op === 'sourceSelect') return mailboxSourceSelect_(payload, session);
  if (op === 'sourceDisconnect') {
    if (String(payload && payload.provider || '') === 'drive') return mailboxDriveDisconnect_(payload, session);
    if (String(payload && payload.provider || '') === 'box') return mailboxBoxSourceDisconnect_(payload, session);
    throw mailboxError_('INVALID_SOURCE', 'Цей провайдер ще не підтримує нове відключення.');
  }
  if (op === 'boxStatus') return mailboxBoxStatus_(payload, session);
  if (op === 'boxConnectStart') return mailboxBoxConnectStart_(payload, session);
  if (op === 'boxDisconnect') return mailboxBoxDisconnect_(payload, session);
  if (op === 'metadata') return mailboxGmailMetadata_(payload, session);
  if (op === 'labelAdmin') return mailboxManageUserLabel_(payload, session);
  if (op === 'focusConfig') return mailboxFocusConfig_(payload, session);
  if (op === 'focusRuleAdmin') return mailboxFocusRuleAdmin_(payload, session);
  if (op === 'focusThread') return mailboxFocusThread_(payload, session);
  if (op === 'attentionState') return mailboxAttentionState_(payload, session);
  if (op === 'attentionUpdate') return mailboxAttentionUpdate_(payload, session);
  if (op === 'attentionPreferences') return mailboxAttentionPreferences_(payload, session);
  if (op === 'label') return mailboxModifyUserLabels_(payload);
  if (op === 'action') return mailboxApplyAction_(payload);
  if (op === 'saveDraft') return mailboxSaveDraft_(payload);
  if (op === 'sendDraft') return mailboxSendDraft_(payload);
  if (op === 'scheduledSendState') return mailboxScheduledSendState_(payload, session);
  if (op === 'scheduleDraftSend') return mailboxScheduleDraftSend_(payload, session);
  if (op === 'rescheduleDraftSend') return mailboxRescheduleDraftSend_(payload, session);
  if (op === 'cancelScheduledSend') return mailboxCancelScheduledSend_(payload, session);
  if (op === 'ackOperation') return mailboxAcknowledgeDraftOperation_(payload);
  throw mailboxError_('UNKNOWN_OPERATION', 'Ця поштова операція не підтримується.');
}

function mailboxNormalizeRequest_(request) {
  if (!mailboxIsPlainObject_(request)) {
    throw mailboxError_('INVALID_REQUEST', 'Запит повинен бути об’єктом.');
  }
  let serialized = '';
  try { serialized = JSON.stringify(request); } catch (error) { serialized = ''; }
  if (!serialized || serialized.length > MAILBOX_CLIENT_CONFIG_.MAX_REQUEST_CHARS) {
    throw mailboxError_('INVALID_REQUEST', 'Запит завеликий або має некоректний формат.');
  }
  mailboxAssertAllowedKeys_(request, ['op', 'payload', 'connectionId']);
  const op = String(request.op || '');
  const allowed = [
    'bootstrap', 'switchAccount', 'connectGoogleStart', 'accountSettings', 'updateAccountSettings', 'workspaceAccess', 'createInvite', 'acceptInvite', 'updateMember', 'disconnectGmail', 'metadata', 'labelAdmin', 'focusConfig', 'focusRuleAdmin', 'focusThread', 'attentionState', 'attentionUpdate', 'attentionPreferences', 'list', 'unifiedList', 'thread', 'attachment', 'label', 'action', 'saveDraft', 'sendDraft', 'scheduledSendState', 'scheduleDraftSend', 'rescheduleDraftSend', 'cancelScheduledSend',
    'ackOperation', 'sourceList', 'sourceMetadata', 'sourceContent', 'sourceAccounts', 'sourceConnectStart', 'sourceSelect', 'sourceDisconnect',
    'boxStatus', 'boxConnectStart', 'boxDisconnect',
  ];
  if (allowed.indexOf(op) === -1) {
    throw mailboxError_('UNKNOWN_OPERATION', 'Ця поштова операція не підтримується.');
  }
  const payload = request.payload === undefined ? {} : request.payload;
  if (!mailboxIsPlainObject_(payload)) {
    throw mailboxError_('INVALID_REQUEST', 'Параметри операції повинні бути об’єктом.');
  }
  const connectionId = request.connectionId
    ? mailboxMultiOpaqueId_(request.connectionId, 'gmail')
    : '';
  return { op, payload, connectionId };
}

function mailboxBootstrap_(payload, session) {
  mailboxAssertAllowedKeys_(payload, []);
  if (!session.connectionId) {
    const principal = mailboxMultiPrincipal_(session.userId);
    session.connectionId = principal.connectionId;
    session.zoneId = principal.zoneId;
    session.role = principal.role;
  }
  const accounts = mailboxMultiVisibleAccounts_(session);
  if (!session.connectionId) {
    return {
      account: { emailAddress: '', messagesTotal: 0, threadsTotal: 0, historyId: '' },
      accounts,
      accountSettings: mailboxMultiAccountSettings_({}, session),
      sendAs: [],
      folders: [],
      customLabels: [],
      needsGoogleConnection: true,
      capabilities: {
        operations: ['bootstrap', 'switchAccount', 'connectGoogleStart', 'workspaceAccess', 'acceptInvite'],
        actions: [],
        listFilters: [],
        multiAccount: true,
        connectGoogle: true,
        permanentDelete: false,
      },
      limits: {
        maxIncomingAttachmentBytes: MAILBOX_CLIENT_CONFIG_.MAX_INCOMING_ATTACHMENT_BYTES,
        maxOutgoingAttachmentBytes: MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENT_BYTES,
        maxOutgoingAttachments: MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS,
        maxOutgoingAttachmentsTotalBytes: MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES,
      },
    };
  }
  mailboxMultiResolveAccess_(session, session.connectionId, 'viewer');
  const profile = gmailApiRequest_('/profile', { method: 'get' });
  const sendAs = mailboxGetSendAs_(profile, true);
  const labels = mailboxGetUserLabels_();
  const folders = Object.keys(MAILBOX_SYSTEM_FOLDERS_).map(key => {
    const folder = MAILBOX_SYSTEM_FOLDERS_[key];
    return {
      key: key.charAt(0).toLowerCase() + key.slice(1),
      name: folder.name,
      icon: folder.icon,
      type: 'system',
      group: folder.group || 'mailbox',
      category: folder.category || '',
    };
  });
  const customLabels = labels.map(label => Object.assign({}, label, {
    folderKey: 'label:' + label.id,
    type: 'label',
  }));

  return {
    account: {
      id: mailboxSafeText_(session.connectionId, 96),
      emailAddress: mailboxSafeEmail_(profile.emailAddress),
      messagesTotal: mailboxSafeCount_(profile.messagesTotal),
      threadsTotal: mailboxSafeCount_(profile.threadsTotal),
      historyId: mailboxSafeOpaqueToken_(profile.historyId, 128),
    },
    accounts: mailboxMultiVisibleAccounts_(session).map(item => Object.assign({}, item, {
      current: item.id === session.connectionId,
    })),
    accountSettings: mailboxMultiAccountSettings_({}, session),
    sendAs,
    folders,
    customLabels,
    capabilities: {
      operations: [
        'bootstrap', 'switchAccount', 'connectGoogleStart', 'accountSettings', 'updateAccountSettings', 'workspaceAccess', 'createInvite', 'acceptInvite', 'updateMember', 'disconnectGmail', 'attentionState', 'attentionUpdate', 'attentionPreferences', 'list', 'thread', 'attachment', 'label', 'action', 'saveDraft', 'sendDraft', 'scheduledSendState', 'scheduleDraftSend', 'rescheduleDraftSend', 'cancelScheduledSend',
        'ackOperation', 'sourceList', 'sourceMetadata', 'sourceContent', 'sourceAccounts', 'sourceConnectStart', 'sourceSelect', 'sourceDisconnect',
        'boxStatus', 'boxConnectStart', 'boxDisconnect',
      ],
      actions: Object.keys(MAILBOX_THREAD_ACTIONS_).concat([
        'trash', 'untrash', 'unsubscribe', 'snooze',
      ]),
      listFilters: Object.keys(MAILBOX_LIST_FILTERS_),
      multiAccount: true,
      connectGoogle: true,
      unifiedInbox: true,
      permanentDelete: false,
      unsubscribe: true,
      snooze: mailboxSnoozeCapabilities_(),
      sendLater: {
        enabled: true,
        minimumDelayMs: MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_MIN_DELAY_MS,
        maximumDelayMs: MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_MAX_DELAY_MS,
        maxActivePerAccount: MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_SCOPE_LIMIT,
      },
      attachments: {
        download: true,
        draft: true,
        send: true,
        inlineImages: true,
        driveReadonly: true,
        boxReadonly: true,
        publicHttps: true,
        privateOneDrive: false,
        resumableUpload: false,
        backgroundUpload: false,
        sourceProviders: ['drive', 'box', 'publicHttps'],
      },
      labels: {
        modifyUserLabels: true,
        maxChanges: MAILBOX_CLIENT_CONFIG_.MAX_LABEL_CHANGES,
        systemLabels: false,
      },
    },
    limits: {
      maxPageSize: MAILBOX_CLIENT_CONFIG_.MAX_PAGE_SIZE,
      maxBodyChars: MAILBOX_CLIENT_CONFIG_.MAX_BODY_CHARS,
      maxIncomingAttachmentBytes: MAILBOX_CLIENT_CONFIG_.MAX_INCOMING_ATTACHMENT_BYTES,
      maxOutgoingAttachmentBytes: MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENT_BYTES,
      maxOutgoingAttachments: MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS,
      maxOutgoingAttachmentsTotalBytes:
        MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES,
      maxSourcePreviewBytes: MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_PREVIEW_BYTES,
      maxSourceDownloadBytes: MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_DOWNLOAD_BYTES,
    },
    session: {
      ownerId: mailboxSafeText_(session.ownerId, 32),
      userId: mailboxSafeText_(session.userId, 32),
      zoneId: mailboxSafeText_(session.zoneId, 96),
      connectionId: mailboxSafeText_(session.connectionId, 96),
      role: mailboxSafeText_(session.role, 32),
      expiresInSeconds: MAILBOX_CLIENT_CONFIG_.SESSION_SECONDS,
    },
  };
}

function mailboxRequestMinimumRole_(opValue) {
  const op = String(opValue || '');
  if (['metadata', 'focusConfig', 'focusRuleAdmin', 'focusThread', 'attentionState', 'attentionUpdate', 'attentionPreferences', 'scheduledSendState', 'list', 'thread', 'attachment'].indexOf(op) !== -1) return 'viewer';
  if (['saveDraft', 'sendDraft', 'scheduleDraftSend', 'rescheduleDraftSend', 'cancelScheduledSend', 'ackOperation'].indexOf(op) !== -1) return 'responder';
  if (['label', 'labelAdmin', 'action'].indexOf(op) !== -1) return 'manager';
  return '';
}

function mailboxSwitchAccount_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['connectionId']);
  const selected = mailboxMultiSelectConnection_(session, payload.connectionId);
  return {
    connectionId: selected.connection.id,
    zoneId: selected.connection.zoneId,
    account: {
      id: selected.connection.id,
      emailAddress: selected.connection.email,
      name: selected.connection.displayName || selected.connection.email || 'Gmail',
      avatarUrl: selected.connection.avatarUrl || '',
    },
    accounts: mailboxMultiVisibleAccounts_(session),
  };
}

function mailboxGetSendAs_(profileValue, allowProfileFallback) {
  const cached = mailboxReadSendAsCache_();
  if (cached) return cached;

  let aliases = [];
  let requestError = null;
  try {
    const response = gmailApiRequest_('/settings/sendAs', { method: 'get' });
    aliases = mailboxNormalizeSendAs_(response && response.sendAs);
  } catch (error) {
    requestError = error;
  }

  if (!aliases.length && allowProfileFallback) {
    aliases = mailboxProfileSendAs_(profileValue);
  }
  if (!aliases.length) {
    if (requestError && requestError.mailboxCode) throw requestError;
    throw mailboxError_(
      'SEND_AS_UNAVAILABLE',
      'Gmail не надав перевірених адрес відправника. Оновіть доступ і спробуйте ще раз.'
    );
  }
  mailboxWriteSendAsCache_(aliases);
  return aliases;
}

function mailboxCurrentAccountContext_() {
  if (!mailboxCurrentSessionContext_ || !mailboxCurrentSessionContext_.connectionId) return null;
  return mailboxMultiVisibleAccounts_(mailboxCurrentSessionContext_)
    .find(item => item.id === mailboxCurrentSessionContext_.connectionId) || null;
}

function mailboxSendAsCacheKey_() {
  const connectionId = mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.connectionId
    ? String(mailboxCurrentSessionContext_.connectionId)
    : '';
  return MAILBOX_CLIENT_CONFIG_.SEND_AS_CACHE_KEY + (connectionId ? '.' + connectionId : '');
}

function mailboxComposeSendAs_(requestedEmailValue) {
  const cached = mailboxReadSendAsCache_();
  if (cached) return cached;

  // The configured Gmail account is a server-side allowlist entry, not a
  // browser assertion. It is therefore a safe fast path for the primary
  // address when a compose RPC arrives before bootstrap has populated the
  // short-lived send-as cache. Any different address still has to be returned
  // by Gmail's settings/sendAs endpoint below.
  const accountContext = mailboxCurrentAccountContext_();
  const configured = mailboxProfileSendAs_({
    emailAddress: accountContext && accountContext.email
      ? accountContext.email
      : (typeof CONFIG === 'object' && CONFIG ? CONFIG.GMAIL_ACCOUNT : ''),
  });
  const requestedEmail = mailboxSafeEmail_(requestedEmailValue);
  if (configured.length && (!requestedEmail ||
      configured[0].sendAsEmail.toLowerCase() === requestedEmail.toLowerCase())) {
    return configured;
  }
  try {
    return mailboxGetSendAs_(null, false);
  } catch (settingsError) {
    // A profile response proves only the authenticated primary address. It is
    // a safe degraded fallback, but never authorizes an unverified alias.
    let profile = null;
    try { profile = gmailApiRequest_('/profile', { method: 'get' }); }
    catch (profileError) {
      throw mailboxError_(
        'SEND_AS_UNAVAILABLE',
        'Не вдалося перевірити адресу відправника в Gmail.'
      );
    }
    const profileFallback = mailboxProfileSendAs_(profile);
    const fallback = profileFallback.length ? profileFallback : configured;
    if (!fallback.length) throw settingsError;
    return fallback;
  }
}

function mailboxReadSendAsCache_() {
  const cache = CacheService.getScriptCache();
  const cacheKey = mailboxSendAsCacheKey_();
  const serialized = String(cache.get(cacheKey) || '');
  if (!serialized) return null;
  let value = null;
  try { value = JSON.parse(serialized); } catch (error) { value = null; }
  const aliases = value && value.version === 1
    ? mailboxNormalizeSendAs_(value.aliases)
    : [];
  if (!aliases.length) {
    cache.remove(cacheKey);
    return null;
  }
  return aliases;
}

function mailboxWriteSendAsCache_(aliasesValue) {
  const aliases = mailboxNormalizeSendAs_(aliasesValue);
  if (!aliases.length) return;
  CacheService.getScriptCache().put(
    mailboxSendAsCacheKey_(),
    JSON.stringify({ version: 1, aliases }),
    MAILBOX_CLIENT_CONFIG_.SEND_AS_CACHE_SECONDS
  );
}

function mailboxNormalizeSendAs_(values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .slice(0, MAILBOX_CLIENT_CONFIG_.MAX_SEND_AS_ALIASES * 2)
    .map(value => {
      const item = value || {};
      const sendAsEmail = mailboxSafeEmail_(
        item.sendAsEmail || item.emailAddress || item.email
      );
      const key = sendAsEmail.toLowerCase();
      const verificationStatus = mailboxEnum_(
        String(item.verificationStatus || item.status || '').toLowerCase(),
        ['accepted', 'pending', 'verificationstatusunspecified'],
        ''
      );
      const isPrimary = Boolean(item.isPrimary || item.primary);
      const isDefault = Boolean(item.isDefault || item.default);
      const eligible = isPrimary || isDefault || verificationStatus === 'accepted';
      if (!sendAsEmail || !eligible || seen.has(key)) return null;
      seen.add(key);
      return {
        sendAsEmail,
        displayName: mailboxSafeHeader_(item.displayName || item.name, 300),
        isPrimary,
        isDefault,
        verificationStatus,
      };
    })
    .filter(Boolean)
    .slice(0, MAILBOX_CLIENT_CONFIG_.MAX_SEND_AS_ALIASES)
    .sort((left, right) =>
      Number(Boolean(right.isDefault || right.isPrimary)) -
      Number(Boolean(left.isDefault || left.isPrimary))
    );
}

function mailboxProfileSendAs_(profileValue) {
  const email = mailboxSafeEmail_(profileValue && profileValue.emailAddress);
  return email ? [{
    sendAsEmail: email,
    displayName: '',
    isPrimary: true,
    isDefault: true,
    verificationStatus: 'accepted',
  }] : [];
}

function mailboxGetUserLabels_() {
  const response = gmailApiRequest_('/labels', { method: 'get' });
  return (response.labels || [])
    .filter(label => String(label.type || '').toLowerCase() === 'user')
    // This label is an internal state marker, not a user-managed category.
    // Hiding it also keeps generic label RPC from removing the timer's guard.
    .filter(label => String(label.name || '') !== MAILBOX_BOT_SNOOZE_LABEL_NAME_)
    .map(mailboxLabelDto_)
    .filter(Boolean)
    .sort((left, right) => left.name.localeCompare(right.name, 'uk'));
}

function mailboxLabelDto_(label) {
  const id = mailboxSafeLabelId_(label && label.id, false);
  if (!id) return null;
  const color = label && label.color ? label.color : {};
  return {
    id,
    name: mailboxSafeText_(label && label.name, 300),
    messageListVisibility: mailboxEnum_(
      label && label.messageListVisibility,
      ['show', 'hide'],
      ''
    ),
    labelListVisibility: mailboxEnum_(
      label && label.labelListVisibility,
      ['labelShow', 'labelShowIfUnread', 'labelHide'],
      ''
    ),
    color: {
      backgroundColor: mailboxSafeColor_(color.backgroundColor),
      textColor: mailboxSafeColor_(color.textColor),
    },
  };
}

/**
 * Add/remove only Gmail labels whose authoritative type is `user`.
 * System labels stay behind the dedicated reversible mailbox actions.
 */
function mailboxModifyUserLabels_(payload) {
  mailboxAssertAllowedKeys_(payload, ['threadId', 'addLabelIds', 'removeLabelIds']);
  const threadId = mailboxRequireGmailId_(payload.threadId, 'threadId');
  const addLabelIds = mailboxNormalizeLabelChangeIds_(payload.addLabelIds, 'addLabelIds');
  const removeLabelIds = mailboxNormalizeLabelChangeIds_(payload.removeLabelIds, 'removeLabelIds');
  if (!addLabelIds.length && !removeLabelIds.length) {
    throw mailboxError_('INVALID_LABEL', 'Додайте хоча б одну зміну мітки.');
  }
  if (addLabelIds.length + removeLabelIds.length > MAILBOX_CLIENT_CONFIG_.MAX_LABEL_CHANGES) {
    throw mailboxError_(
      'TOO_MANY_LABELS',
      'За одну дію можна змінити не більше ' + MAILBOX_CLIENT_CONFIG_.MAX_LABEL_CHANGES + ' міток.'
    );
  }
  const overlap = addLabelIds.find(id => removeLabelIds.indexOf(id) !== -1);
  if (overlap) {
    throw mailboxError_('INVALID_LABEL', 'Одну мітку не можна одночасно додати й видалити.');
  }

  const allowed = new Set(mailboxGetUserLabels_().map(label => label.id));
  addLabelIds.concat(removeLabelIds).forEach(id => {
    if (!allowed.has(id)) {
      throw mailboxError_(
        'INVALID_LABEL',
        'Системну, невідому або видалену мітку Gmail змінювати не можна.'
      );
    }
  });

  let undoSnapshot = null;
  try {
    undoSnapshot = mailboxCaptureUndoState_(
      threadId,
      'label',
      addLabelIds.concat(removeLabelIds)
    );
  } catch (readError) {
    // Label mutation may proceed, but an approximate inverse is never shown.
    undoSnapshot = null;
  }

  gmailApiRequest_(
    '/threads/' + encodeURIComponent(threadId) + '/modify',
    {
      method: 'post',
      body: {
        addLabelIds: addLabelIds.slice(),
        removeLabelIds: removeLabelIds.slice(),
      },
    }
  );
  const result = {
    action: 'label',
    threadId,
    addLabelIds: addLabelIds.slice(),
    removeLabelIds: removeLabelIds.slice(),
    undo: undoSnapshot ? {
      op: 'action',
      threadId,
      action: 'restoreState',
      undoToken: mailboxIssueUndoToken_(undoSnapshot),
    } : null,
  };
  const thread = mailboxPostCommitThreadSummary_(threadId);
  if (thread) result.thread = thread;
  result.telegramSync = mailboxSynchronizeTelegramState_(threadId, '');
  return result;
}

function mailboxNormalizeLabelChangeIds_(value, fieldName) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    throw mailboxError_('INVALID_LABEL', 'Поле ' + fieldName + ' повинно бути списком міток.');
  }
  if (value.length > MAILBOX_CLIENT_CONFIG_.MAX_LABEL_CHANGES) {
    throw mailboxError_(
      'TOO_MANY_LABELS',
      'За одну дію можна змінити не більше ' + MAILBOX_CLIENT_CONFIG_.MAX_LABEL_CHANGES + ' міток.'
    );
  }
  const result = [];
  value.forEach(rawId => {
    const id = mailboxSafeLabelId_(rawId, false);
    if (!id) throw mailboxError_('INVALID_LABEL', 'Некоректний ідентифікатор мітки Gmail.');
    if (result.indexOf(id) === -1) result.push(id);
  });
  return result;
}

function mailboxListThreads_(payload) {
  mailboxAssertAllowedKeys_(payload, ['folder', 'labelId', 'pageSize', 'pageToken', 'query', 'filter']);
  const folder = mailboxResolveFolder_(payload.folder, payload.labelId);
  const pageSize = mailboxPageSize_(payload.pageSize);
  const pageToken = payload.pageToken
    ? mailboxSafePageToken_(payload.pageToken)
    : '';
  const userQuery = mailboxSafeSearchQuery_(payload.query);
  const filter = mailboxResolveListFilter_(payload.filter);
  const queryParts = [];
  if (folder.query) queryParts.push(folder.query);
  if (filter.query) queryParts.push(filter.query);
  if (userQuery) queryParts.push(queryParts.length ? '(' + userQuery + ')' : userQuery);

  const parameters = ['maxResults=' + pageSize];
  if (queryParts.length) parameters.push('q=' + encodeURIComponent(queryParts.join(' ')));
  if (folder.labelId) parameters.push('labelIds=' + encodeURIComponent(folder.labelId));
  if (folder.includeSpamTrash) parameters.push('includeSpamTrash=true');
  if (pageToken) parameters.push('pageToken=' + encodeURIComponent(pageToken));

  const response = gmailApiRequest_('/threads?' + parameters.join('&'), { method: 'get' });
  const references = (response.threads || []).slice(0, pageSize);
  const metadataQuery = mailboxMetadataQuery_([
    'From', 'To', 'Cc', 'Date', 'Subject', 'Message-ID',
  ]);
  const resources = mailboxFetchThreadMetadataBatch_(references, metadataQuery);
  // A thread can disappear between threads.list and the parallel metadata
  // fetch (for example after another Gmail client deletes it). Preserve the
  // response index and skip only that reference so the following summaries do
  // not slide onto the wrong thread.
  const pending = references.reduce((items, reference, index) => {
    if (!resources[index]) return items;
    items.push(mailboxThreadSummaryFromResource_(reference, resources[index]));
    return items;
  }, []);
  const summariesUk = mailboxTranslateSummariesUk_(pending.map(item => item.summarySource));
  const accountContext = mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.connectionId
    ? mailboxMultiVisibleAccounts_(mailboxCurrentSessionContext_)
      .find(item => item.id === mailboxCurrentSessionContext_.connectionId)
    : null;
  const focusRegistry = mailboxFocusRegistryForCurrentSession_();
  const attentionRegistry = mailboxAttentionRegistryForCurrentSession_();
  const threads = pending.map((item, index) => {
    const dto = mailboxFinalizeThreadSummary_(item.dto, summariesUk[index]);
    if (focusRegistry) dto.focus = mailboxFocusEvaluate_(focusRegistry, dto);
    if (attentionRegistry) dto.attention = mailboxAttentionThreadDto_(attentionRegistry, dto.id);
    if (accountContext) {
      dto.account = {
        id: accountContext.id,
        email: accountContext.email,
        name: accountContext.name,
        avatarUrl: accountContext.avatarUrl,
      };
    }
    return dto;
  });
  return {
    folder: {
      key: folder.key,
      name: folder.name,
      type: folder.type,
      group: folder.group || '',
      category: folder.category || '',
    },
    query: userQuery,
    filter: filter.key,
    threads,
    nextPageToken: mailboxSafeOpaqueToken_(response.nextPageToken, 1024),
    resultSizeEstimate: mailboxSafeCount_(response.resultSizeEstimate),
    pageSize,
  };
}

function mailboxResolveFolder_(folderValue, labelValue) {
  const requestedFolderKey = folderValue === undefined || folderValue === null || folderValue === ''
    ? 'Inbox'
    : String(folderValue);
  const folderKey = requestedFolderKey.toLowerCase() === 'allmail'
    ? 'All'
    : Object.keys(MAILBOX_SYSTEM_FOLDERS_).find(key =>
        key.toLowerCase() === requestedFolderKey.toLowerCase()
      ) || requestedFolderKey;
  let labelId = labelValue ? mailboxSafeLabelId_(labelValue, true) : '';
  if (requestedFolderKey.toLowerCase().indexOf('label:') === 0) {
    const fromKey = mailboxSafeLabelId_(requestedFolderKey.slice(6), true);
    if (labelId && labelId !== fromKey) {
      throw mailboxError_('INVALID_FOLDER', 'У запиті вказано дві різні мітки.');
    }
    labelId = fromKey;
  }
  if (labelId) {
    const labels = mailboxGetUserLabels_();
    const selected = labels.find(label => label.id === labelId);
    if (!selected) throw mailboxError_('INVALID_FOLDER', 'Ця мітка Gmail не існує.');
    return {
      key: 'label:' + selected.id,
      name: selected.name,
      type: 'label',
      labelId: selected.id,
      query: '',
    };
  }
  if (!Object.prototype.hasOwnProperty.call(MAILBOX_SYSTEM_FOLDERS_, folderKey)) {
    throw mailboxError_('INVALID_FOLDER', 'Невідома папка Gmail.');
  }
  const system = MAILBOX_SYSTEM_FOLDERS_[folderKey];
  return {
    key: folderKey.charAt(0).toLowerCase() + folderKey.slice(1),
    name: system.name,
    type: 'system',
    labelId: system.labelId || '',
    query: system.query,
    includeSpamTrash: Boolean(system.includeSpamTrash),
    group: system.group || 'mailbox',
    category: system.category || '',
  };
}

function mailboxPageSize_(value) {
  if (value === undefined || value === null || value === '') {
    return MAILBOX_CLIENT_CONFIG_.DEFAULT_PAGE_SIZE;
  }
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) {
    throw mailboxError_('INVALID_REQUEST', 'Некоректне значення pageSize.');
  }
  return Math.min(number, MAILBOX_CLIENT_CONFIG_.MAX_PAGE_SIZE);
}

function mailboxResolveListFilter_(value) {
  const requested = value === undefined || value === null || value === ''
    ? 'all'
    : String(value);
  const key = Object.keys(MAILBOX_LIST_FILTERS_).find(candidate =>
    candidate.toLowerCase() === requested.toLowerCase()
  );
  if (!key) {
    throw mailboxError_('INVALID_FILTER', 'Цей фільтр Gmail не підтримується.');
  }
  return { key, query: MAILBOX_LIST_FILTERS_[key].query };
}

function mailboxThreadSummary_(reference) {
  const threadId = mailboxRequireGmailId_(reference && reference.id, 'threadId');
  const query = mailboxMetadataQuery_([
    'From', 'To', 'Cc', 'Date', 'Subject', 'Message-ID',
  ]);
  const thread = gmailApiRequest_(
    '/threads/' + encodeURIComponent(threadId) + '?' + query,
    { method: 'get' }
  );
  const pending = mailboxThreadSummaryFromResource_(reference, thread);
  const summaryUk = mailboxTranslateSummariesUk_([pending.summarySource])[0];
  return mailboxFinalizeThreadSummary_(pending.dto, summaryUk);
}

/**
 * Enrich an already-confirmed Gmail mutation without changing its outcome.
 * The mutation response is authoritative; this secondary GET is only for an
 * immediately refreshed row in the Mini App and is safe to defer to reload.
 */
function mailboxPostCommitThreadSummary_(threadIdValue) {
  try {
    return mailboxThreadSummary_({
      id: mailboxRequireGmailId_(threadIdValue, 'threadId'),
    });
  } catch (error) {
    console.error('Could not enrich confirmed Gmail thread mutation.');
    return null;
  }
}

function mailboxThreadSummaryFromResource_(reference, threadValue) {
  const threadId = mailboxRequireGmailId_(reference && reference.id, 'threadId');
  const thread = threadValue || {};
  const messages = (thread.messages || []).slice().sort(mailboxCompareMessages_);
  const latest = messages[messages.length - 1] || {};
  const first = messages[0] || latest;
  const latestHeaders = headersObject_((latest.payload && latest.payload.headers) || []);
  const firstHeaders = headersObject_((first.payload && first.payload.headers) || []);
  const labels = mailboxCollectLabelIds_(messages);
  const from = mailboxSafeHeader_(latestHeaders.from, 1000);
  const subject = mailboxSafeHeader_(firstHeaders.subject || latestHeaders.subject, 1000);
  const summarySource = mailboxSafeText_(
    cleanBodyForAnalysis_(latest.snippet || thread.snippet || reference.snippet || subject),
    MAILBOX_CLIENT_CONFIG_.MAX_LIST_SUMMARY_SOURCE_CHARS
  );
  return {
    summarySource,
    dto: {
      id: threadId,
      messageId: mailboxSafeGmailId_(latest.id),
      historyId: mailboxSafeOpaqueToken_(thread.historyId || reference.historyId, 128),
      subject: subject || '(без теми)',
      sender: mailboxSenderDto_(from),
      from,
      sentAt: mailboxSafeHeader_(latestHeaders.date, 300),
      timestamp: mailboxSafeTimestamp_(latest.internalDate),
      messageCount: messages.length,
      labelIds: labels,
      state: mailboxThreadState_(labels),
      hasAttachments: messages.some(message => mailboxHasAttachment_(message.payload)),
      gmailUrl: mailboxGmailUrl_(threadId),
    },
  };
}

function mailboxFinalizeThreadSummary_(dtoValue, translatedValue) {
  const dto = Object.assign({}, dtoValue || {});
  const summaryUk = mailboxSafeText_(
    translatedValue || mailboxSummaryFallbackUk_(),
    MAILBOX_CLIENT_CONFIG_.MAX_LIST_SUMMARY_CHARS
  );
  dto.summaryUk = summaryUk;
  dto.summary = summaryUk;
  // Keep the compatibility field Ukrainian as well so older clients cannot
  // accidentally fall back to Gmail's source-language snippet.
  dto.snippet = summaryUk;
  return dto;
}

/**
 * Gmail's threads.list only returns references. Resolve the page metadata in
 * one UrlFetchApp.fetchAll call so a 20-row inbox does not pay 20 serial HTTP
 * round trips.
 */
function mailboxFetchThreadMetadataBatch_(references, metadataQuery) {
  const items = references || [];
  if (!items.length) return [];
  const token = ScriptApp.getOAuthToken();
  const requests = items.map(reference => {
    const threadId = mailboxRequireGmailId_(reference && reference.id, 'threadId');
    return {
      url: 'https://gmail.googleapis.com/gmail/v1/users/me/threads/' +
        encodeURIComponent(threadId) + '?' + metadataQuery,
      method: 'get',
      headers: { Authorization: 'Bearer ' + token },
      muteHttpExceptions: true,
    };
  });
  let responses;
  try {
    responses = UrlFetchApp.fetchAll(requests);
  } catch (error) {
    console.error('Gmail metadata batch failed: ' + mailboxSafeText_(error && error.message, 300));
    throw mailboxError_('GMAIL_ERROR', 'Gmail тимчасово недоступний. Спробуйте ще раз трохи пізніше.');
  }
  if (!Array.isArray(responses) || responses.length !== requests.length) {
    throw mailboxError_('GMAIL_ERROR', 'Gmail повернув неповну сторінку листів. Спробуйте ще раз.');
  }
  return responses.map(mailboxParseGmailBatchResponse_);
}

function mailboxParseGmailBatchResponse_(response) {
  const code = Number(response && response.getResponseCode ? response.getResponseCode() : 0);
  const text = String(response && response.getContentText ? response.getContentText() : '');
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch (error) { data = {}; }
  if (code >= 200 && code < 300) return data;
  if (code === 401 || code === 403) {
    throw mailboxError_('GMAIL_ERROR', 'Gmail не дозволив прочитати листи. Потрібно оновити доступ бота.');
  }
  // A missing thread is a benign list race: keep a null placeholder so the
  // caller can skip the matching reference without shifting later responses.
  if (code === 404) return null;
  if (code === 429 || code >= 500 || !code) {
    throw mailboxError_('GMAIL_ERROR', 'Gmail тимчасово недоступний. Спробуйте ще раз трохи пізніше.');
  }
  throw mailboxError_('GMAIL_ERROR', 'Gmail не виконав читання листів (HTTP ' + code + ').');
}

/**
 * Translate unique, uncached list previews in bounded chunks. A chunk consumes
 * one LanguageApp call, and a stable Ukrainian message is used if translation
 * fails or a provider returns an unchanged non-Cyrillic string.
 */
function mailboxTranslateSummariesUk_(values) {
  const sources = (values || []).map(value => mailboxSafeText_(
    cleanBodyForAnalysis_(value),
    MAILBOX_CLIENT_CONFIG_.MAX_LIST_SUMMARY_SOURCE_CHARS
  ));
  if (!sources.length) return [];
  const cache = CacheService.getScriptCache();
  const uniqueSources = [];
  const sourceIndexes = new Map();
  sources.forEach((source, index) => {
    if (!source) return;
    if (!sourceIndexes.has(source)) {
      sourceIndexes.set(source, []);
      uniqueSources.push(source);
    }
    sourceIndexes.get(source).push(index);
  });

  const translatedBySource = new Map();
  const cacheCandidates = [];
  uniqueSources.forEach(source => {
    if (mailboxLikelyUkrainian_(source)) {
      translatedBySource.set(source, makePreview_(source, MAILBOX_CLIENT_CONFIG_.MAX_LIST_SUMMARY_CHARS));
      return;
    }
    const key = mailboxTranslationCacheKey_(source);
    cacheCandidates.push({ source, key });
  });
  const fallback = mailboxSummaryFallbackUk_();
  const cachedByKey = cacheCandidates.length
    ? (cache.getAll(cacheCandidates.map(item => item.key)) || {})
    : {};
  const pending = [];
  cacheCandidates.forEach(item => {
    const cached = mailboxSafeText_(cachedByKey[item.key], MAILBOX_CLIENT_CONFIG_.MAX_LIST_SUMMARY_CHARS);
    if (cached && cached !== fallback && mailboxTranslationLooksValid_(item.source, cached)) {
      translatedBySource.set(item.source, cached);
    } else {
      pending.push(item);
    }
  });

  // LanguageApp may collapse line breaks, add spaces inside long numbers, or
  // normalize punctuation. Reserve the complete numbered envelope overhead
  // when chunking, then parse digit markers tolerantly instead of splitting on
  // one exact delimiter. The random per-call nonce prevents untrusted email
  // text from forging a boundary.
  const markerChars = mailboxTranslationMarker_('000000000000000000', 0).length;
  const chunks = [];
  let chunk = [];
  let chunkChars = markerChars;
  pending.forEach(item => {
    const nextChars = item.source.length + markerChars + 2;
    if (chunk.length && (
      chunk.length >= MAILBOX_CLIENT_CONFIG_.MAX_TRANSLATION_CHUNK_ITEMS ||
      chunkChars + nextChars > MAILBOX_CLIENT_CONFIG_.MAX_TRANSLATION_CHUNK_CHARS
    )) {
      chunks.push(chunk);
      chunk = [];
      chunkChars = markerChars;
    }
    chunk.push(item);
    chunkChars += nextChars;
  });
  if (chunk.length) chunks.push(chunk);

  const cacheWrites = {};
  chunks.forEach(items => {
    let pieces = [];
    try {
      const envelope = mailboxBuildTranslationEnvelope_(items);
      if (envelope.text.length > MAILBOX_CLIENT_CONFIG_.MAX_TRANSLATION_CHUNK_CHARS) {
        throw new Error('translation envelope exceeded the configured bound');
      }
      const translated = LanguageApp.translate(envelope.text, '', 'uk');
      pieces = mailboxParseTranslationEnvelope_(translated, envelope.nonce, items.length);
    } catch (error) {
      console.error('Mailbox list translation failed: ' + mailboxSafeText_(error && error.message, 300));
      pieces = [];
    }
    items.forEach((item, index) => {
      const candidate = pieces.length === items.length
        ? makePreview_(pieces[index], MAILBOX_CLIENT_CONFIG_.MAX_LIST_SUMMARY_CHARS)
        : '';
      const valid = candidate !== fallback && mailboxTranslationLooksValid_(item.source, candidate);
      const safe = valid ? candidate : fallback;
      translatedBySource.set(item.source, safe);
      // A provider failure must be retried on the next refresh. Caching the
      // generic fallback hid recoverable translation failures for six hours.
      if (valid) cacheWrites[item.key] = safe;
    });
  });
  if (Object.keys(cacheWrites).length) {
    cache.putAll(cacheWrites, MAILBOX_CLIENT_CONFIG_.SUMMARY_CACHE_SECONDS);
  }

  return sources.map(source => source
    ? (translatedBySource.get(source) || fallback)
    : fallback
  );
}

function mailboxTranslationMarkerNonce_() {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(Utilities.getUuid()) + ':' + String(Date.now()),
    Utilities.Charset.UTF_8
  );
  let nonce = '';
  for (let index = 0; index < 6; index += 1) {
    nonce += String((Number(bytes[index]) + 256) % 256).padStart(3, '0');
  }
  return nonce;
}

function mailboxTranslationMarker_(nonce, index) {
  return '7319048265::' + String(nonce) + '::' +
    String(Number(index) || 0).padStart(3, '0') + '::5642091738';
}

function mailboxBuildTranslationEnvelope_(items) {
  const nonce = mailboxTranslationMarkerNonce_();
  const segments = (items || []).map((item, index) =>
    mailboxTranslationMarker_(nonce, index) + '\n' + String(item && item.source || '')
  );
  segments.push(mailboxTranslationMarker_(nonce, segments.length));
  return { nonce, text: segments.join('\n') };
}

function mailboxTranslationDigitsPattern_(digits) {
  return String(digits || '').split('').join('[^0-9]{0,3}');
}

function mailboxParseTranslationEnvelope_(translatedValue, nonce, expectedCount) {
  const translated = String(translatedValue || '');
  const count = Number(expectedCount || 0);
  if (!translated || !Number.isInteger(count) || count < 1 ||
      count > MAILBOX_CLIENT_CONFIG_.MAX_TRANSLATION_CHUNK_ITEMS) {
    return [];
  }
  const prefixPattern = mailboxTranslationDigitsPattern_('7319048265');
  const noncePattern = mailboxTranslationDigitsPattern_(nonce);
  const indexPattern = '([0-9][^0-9]{0,3}[0-9][^0-9]{0,3}[0-9])';
  const suffixPattern = mailboxTranslationDigitsPattern_('5642091738');
  const markerPattern = new RegExp(
    prefixPattern + '[^0-9]{0,48}' + noncePattern + '[^0-9]{0,48}' +
      indexPattern + '[^0-9]{0,48}' + suffixPattern,
    'g'
  );
  const markers = [];
  let match;
  while ((match = markerPattern.exec(translated)) !== null) {
    markers.push({
      index: Number(String(match[1] || '').replace(/[^0-9]/g, '')),
      start: match.index,
      end: markerPattern.lastIndex,
    });
    if (markers.length > count + 1) return [];
  }
  if (markers.length !== count + 1) return [];
  for (let index = 0; index <= count; index += 1) {
    if (markers[index].index !== index) return [];
  }
  return markers.slice(0, count).map((marker, index) =>
    translated.slice(marker.end, markers[index + 1].start).trim()
  );
}

function mailboxTranslationCacheKey_(source) {
  return MAILBOX_CLIENT_CONFIG_.TRANSLATION_CACHE_PREFIX + mailboxDigestText_(source);
}

function mailboxDigestText_(value) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(value || ''),
    Utilities.Charset.UTF_8
  );
  return Utilities.base64EncodeWebSafe(bytes).replace(/=+$/g, '');
}

function mailboxLikelyUkrainian_(value) {
  const text = String(value || '').toLowerCase();
  if (!/[\u0400-\u04ff]/.test(text)) return false;
  if (/[іїєґ]/.test(text)) return true;
  // Russian and Ukrainian share many Cyrillic words (for example «для»,
  // «ваш», and «лист»), so those must still pass through LanguageApp. Keep
  // this list deliberately conservative and limited to Ukrainian-exclusive
  // lexemes that can be written without і/ї/є/ґ. Tokenization is explicit
  // because JavaScript's ASCII-oriented \b does not delimit Cyrillic words.
  const ukrainianExclusive = new Set([
    'авжеж', 'буде', 'готове', 'готовий', 'дякую', 'дякуємо',
    'замовлення', 'застосунок', 'можна', 'наразі', 'отримано', 'переглянути',
    'рахунок', 'щиро', 'що', 'щодо',
  ]);
  const words = text.match(/[а-яёіїєґ]+/g) || [];
  return words.some(word => ukrainianExclusive.has(word));
}

function mailboxTranslationLooksValid_(source, translated) {
  const output = String(translated || '').trim();
  if (!output) return false;
  const input = String(source || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const normalizedOutput = output.replace(/\s+/g, ' ').trim().toLowerCase();
  if (/[a-z]/i.test(input) && !/[\u0400-\u04ff]/.test(output)) return false;
  return input !== normalizedOutput || mailboxLikelyUkrainian_(output);
}

function mailboxSummaryFallbackUk_() {
  return 'Відкрийте лист, щоб переглянути короткий зміст українською.';
}

function mailboxMetadataQuery_(headers) {
  return ['format=metadata'].concat(
    (headers || []).map(name => 'metadataHeaders=' + encodeURIComponent(name))
  ).join('&');
}

function mailboxCompareMessages_(left, right) {
  return Number(left && left.internalDate || 0) - Number(right && right.internalDate || 0);
}

function mailboxGetThread_(payload) {
  mailboxAssertAllowedKeys_(payload, ['threadId']);
  const threadId = mailboxRequireGmailId_(payload.threadId, 'threadId');
  const thread = gmailApiRequest_(
    '/threads/' + encodeURIComponent(threadId) + '?format=full',
    { method: 'get' }
  );
  const allMessages = (thread.messages || []).slice().sort(mailboxCompareMessages_);
  const start = Math.max(0, allMessages.length - MAILBOX_CLIENT_CONFIG_.MAX_THREAD_MESSAGES);
  const draftIdsByMessage = mailboxDraftIdsByMessage_(allMessages);
  const analysisItems = [];
  const messages = [];
  allMessages.forEach((message, index) => {
    const mime = mailboxParseMessageMime_(message);
    analysisItems.push({
      id: mailboxSafeGmailId_(message && message.id),
      timestamp: mailboxSafeTimestamp_(message && message.internalDate),
      body: mailboxMessageAnalysisBody_(message, mime),
    });
    if (index < start) return;
    const dto = mailboxMessageDto_(message, mime);
    const draftId = draftIdsByMessage[dto.id] || '';
    if (draftId) dto.draft = mailboxEditableDraftDto_(draftId, message, dto, mime);
    messages.push(dto);
  });
  const drafts = messages.map(message => message.draft).filter(Boolean);
  const labels = mailboxCollectLabelIds_(allMessages);
  const subjectMessage = messages.find(message => message.subject) || messages[0] || {};
  const subject = subjectMessage.subject || '(без теми)';
  const analysis = mailboxThreadAnalysis_(threadId, subject, analysisItems);
  const unsubscribeSelection = mailboxThreadUnsubscribe_(allMessages);
  const unsubscribe = Object.assign({}, unsubscribeSelection.info, {
    messageId: unsubscribeSelection.messageId,
  });
  const accountContext = mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.connectionId
    ? mailboxMultiVisibleAccounts_(mailboxCurrentSessionContext_)
      .find(item => item.id === mailboxCurrentSessionContext_.connectionId)
    : null;
  const accountEmail = accountContext && accountContext.email
    ? accountContext.email
    : (typeof CONFIG === 'object' && CONFIG ? CONFIG.GMAIL_ACCOUNT : '');
  let threadSendAs = mailboxProfileSendAs_({ emailAddress: accountEmail });
  try { threadSendAs = mailboxGetSendAs_({ emailAddress: accountEmail }, true); }
  catch (error) {
    // Reading a thread must not fail merely because Gmail settings/sendAs is
    // temporarily unavailable. The authenticated primary mailbox remains the
    // only safe fallback and is revalidated again when a draft is saved.
  }
  const detail = {
    id: threadId,
    historyId: mailboxSafeOpaqueToken_(thread.historyId, 128),
    subject,
    summaryUk: analysis.summaryUk,
    summary: analysis.summaryUk,
    action: analysis.action,
    importance: analysis.importance,
    deadlines: analysis.deadlines,
    amounts: analysis.amounts,
    analysis,
    messages,
    drafts,
    totalMessages: allMessages.length,
    truncated: start > 0,
    labelIds: labels,
    state: mailboxThreadState_(labels),
    unsubscribe,
    unsubscribeMessageId: unsubscribeSelection.messageId,
    replyPreset: mailboxBuildReplyPreset_(allMessages, subject),
    sendAs: threadSendAs,
    gmailUrl: mailboxGmailUrl_(threadId),
    account: accountContext ? {
      id: accountContext.id,
      email: accountContext.email,
      name: accountContext.name,
      avatarUrl: accountContext.avatarUrl,
    } : null,
  };
  const focusRegistry = mailboxFocusRegistryForCurrentSession_();
  detail.focus = focusRegistry
    ? mailboxFocusEvaluate_(focusRegistry, {
        id: threadId, subject, sender: messages.length ? messages[messages.length - 1].from : null, labelIds: labels,
      })
    : { priority: 'none', label: '', color: '', rank: 0, source: 'none', ruleId: '', reason: '' };
  const attentionRegistry = mailboxAttentionRegistryForCurrentSession_();
  detail.attention = attentionRegistry
    ? mailboxAttentionThreadDto_(attentionRegistry, threadId)
    : mailboxAttentionEmptyThreadDto_(threadId, 0);
  return detail;
}

function mailboxParseMessageMime_(message) {
  try {
    return parseMimeTree_(mailboxRequireGmailId_(message && message.id, 'messageId'), message && message.payload || {});
  } catch (error) {
    console.warn('Mail client MIME parse failed for ' + hashedMessageId_(message && message.id));
    return { plain: '', html: '', attachments: [], inlineAttachments: [], mimeTypes: [] };
  }
}

function mailboxMessageAnalysisBody_(message, mimeValue) {
  const mime = mimeValue || {};
  let body = '';
  try {
    body = selectAnalysisBody_(mime.plain, mime.html, message && message.snippet);
  } catch (error) {
    body = mime.plain || (mime.html ? htmlToText_(mime.html) : message && message.snippet);
  }
  return mailboxSafeText_(
    cleanBodyForAnalysis_(body),
    MAILBOX_CLIENT_CONFIG_.MAX_THREAD_ANALYSIS_MESSAGE_CHARS
  );
}

/**
 * Every non-empty unique message body receives an equal bounded slice. This
 * keeps the analysis capped while ensuring long conversations are represented
 * across the entire thread rather than by Gmail's latest-message snippet.
 */
function mailboxBoundedThreadAnalysisText_(items) {
  const unique = [];
  const seen = new Set();
  (items || []).forEach(item => {
    const body = mailboxSafeText_(
      cleanBodyForAnalysis_(item && item.body),
      MAILBOX_CLIENT_CONFIG_.MAX_THREAD_ANALYSIS_MESSAGE_CHARS
    );
    if (!body) return;
    const fingerprint = mailboxDigestText_(body);
    if (seen.has(fingerprint)) return;
    seen.add(fingerprint);
    unique.push(body);
  });
  if (!unique.length) return '';
  const separator = '\n\n';
  const separatorBudget = separator.length * Math.max(0, unique.length - 1);
  const bodyBudget = Math.max(unique.length, MAILBOX_CLIENT_CONFIG_.MAX_THREAD_ANALYSIS_CHARS - separatorBudget);
  const perBody = Math.max(1, Math.min(
    MAILBOX_CLIENT_CONFIG_.MAX_THREAD_ANALYSIS_MESSAGE_CHARS,
    Math.floor(bodyBudget / unique.length)
  ));
  return unique.map(body => body.slice(0, perBody)).join(separator)
    .slice(0, MAILBOX_CLIENT_CONFIG_.MAX_THREAD_ANALYSIS_CHARS);
}

function mailboxThreadAnalysis_(threadId, subject, items) {
  const body = mailboxBoundedThreadAnalysisText_(items);
  const cache = CacheService.getScriptCache();
  const key = MAILBOX_CLIENT_CONFIG_.SUMMARY_CACHE_PREFIX + mailboxDigestText_(
    String(threadId || '') + '\n' + String(subject || '') + '\n' + body
  );
  const cached = cache.get(key);
  if (cached) {
    try {
      return mailboxNormalizeThreadAnalysis_(JSON.parse(cached), subject, body, items);
    } catch (error) {
      cache.remove(key);
    }
  }

  let raw = null;
  try {
    raw = analyzeMessage_(subject, body);
  } catch (error) {
    console.error('Mailbox thread analysis failed: ' + mailboxSafeText_(error && error.message, 300));
    raw = null;
  }
  const analysis = mailboxNormalizeThreadAnalysis_(raw, subject, body, items);
  cache.put(key, JSON.stringify(analysis), MAILBOX_CLIENT_CONFIG_.SUMMARY_CACHE_SECONDS);
  return analysis;
}

function mailboxNormalizeThreadAnalysis_(value, subject, body, items) {
  const raw = value || {};
  const source = cleanBodyForAnalysis_((subject ? subject + '. ' : '') + (body || ''));
  const fallback = source
    ? 'Відкрийте розмову нижче, щоб переглянути повний зміст листування.'
    : 'У цій розмові немає доступного тексту для підсумку.';
  const candidateSummary = makePreview_(raw.essence || raw.summaryUk || '', CONFIG.MAX_SUMMARY_CHARS);
  const summaryUk = mailboxAnalysisTextUk_(source, candidateSummary, fallback);
  const candidateAction = makePreview_(raw.action || '', CONFIG.MAX_ACTION_CHARS);
  const action = candidateAction
    ? mailboxAnalysisTextUk_(source, candidateAction, '')
    : '';
  const importanceValue = raw.importance || {};
  const importance = {
    icon: mailboxSafeText_(importanceValue.icon, 8) || '🟢',
    level: mailboxSafeText_(importanceValue.level, 40) || 'звичайна',
    reason: mailboxSafeText_(importanceValue.reason, 240) || 'не знайдено термінових дій або ризиків',
  };
  const deadlines = (Array.isArray(raw.deadlines) ? raw.deadlines : [])
    .slice(0, 3).map(value => mailboxSafeText_(value, 160)).filter(Boolean);
  const amounts = (Array.isArray(raw.amounts) ? raw.amounts : [])
    .slice(0, 3).map(value => mailboxSafeText_(value, 120)).filter(Boolean);
  const sourceFragments = mailboxAnalysisSourceFragments_(items, {
    summaryUk,
    action,
    importance,
    deadlines,
    amounts,
  });
  const hasGeneratedSummary = Boolean(candidateSummary && summaryUk !== fallback);
  const confidence = sourceFragments.length && hasGeneratedSummary
    ? {
      level: 'medium',
      label: 'середня',
      reason: 'Підсумок автоматичний; звірте ключові дати, суми й дії з наведеними цитатами.',
    }
    : {
      level: 'limited',
      label: 'обмежена',
      reason: sourceFragments.length
        ? 'Автоматичний підсумок недоступний або неповний; використайте цитати та оригінал.'
        : 'Для перевірки підсумку недостатньо доступного тексту; відкрийте оригінал.',
    };
  const risk = importance.level === 'висока'
    ? 'Можна пропустити строк, безпекову подію або потрібну дію; перевірте оригінал.'
    : (importance.level === 'середня'
      ? 'Можна пропустити потрібну дію або строк; перевірте оригінал.'
      : 'Явного ризику ігнорування не виявлено.');
  return {
    kind: 'automated-ai-analysis',
    label: 'Автоматичний AI-аналіз',
    method: 'локальний аналіз і машинний переклад',
    summaryUk: mailboxSafeText_(summaryUk, CONFIG.MAX_SUMMARY_CHARS),
    action: mailboxSafeText_(action, CONFIG.MAX_ACTION_CHARS),
    importance,
    deadlines,
    amounts,
    risk,
    confidence,
    sourceFragments,
  };
}

function mailboxAnalysisSourceFragments_(items, analysis) {
  const targets = [
    analysis && analysis.summaryUk,
    analysis && analysis.action,
    analysis && analysis.importance && analysis.importance.reason,
  ].concat(analysis && analysis.deadlines || [], analysis && analysis.amounts || []);
  const targetWords = new Set(
    cleanBodyForAnalysis_(targets.filter(Boolean).join(' ')).toLowerCase()
      .match(/[\p{L}\p{N}]{4,}/gu) || []
  );
  const normalizedDeadlines = (analysis && analysis.deadlines || [])
    .map(value => cleanBodyForAnalysis_(value).toLowerCase()).filter(Boolean);
  const normalizedAmounts = (analysis && analysis.amounts || [])
    .map(value => cleanBodyForAnalysis_(value).toLowerCase()).filter(Boolean);
  const seenBodies = new Set();
  const candidates = [];
  (items || []).forEach((item, itemIndex) => {
    const body = mailboxSafeText_(
      cleanBodyForAnalysis_(item && item.body),
      MAILBOX_CLIENT_CONFIG_.MAX_THREAD_ANALYSIS_MESSAGE_CHARS
    );
    if (!body) return;
    const fingerprint = mailboxDigestText_(body);
    if (seenBodies.has(fingerprint)) return;
    seenBodies.add(fingerprint);
    const sentences = splitSentences_(body).filter(sentence => !isBoilerplateSentence_(sentence));
    const options = sentences.length ? sentences : [body];
    let best = null;
    options.forEach((sentence, sentenceIndex) => {
      const normalized = String(sentence || '').replace(/\s+/g, ' ').trim();
      if (!normalized) return;
      const words = normalized.toLowerCase().match(/[\p{L}\p{N}]{4,}/gu) || [];
      const lower = normalized.toLowerCase();
      const hasDeadline = normalizedDeadlines.some(value => lower.indexOf(value) !== -1);
      const hasAmount = normalizedAmounts.some(value => lower.indexOf(value) !== -1);
      let score = words.reduce((total, word) => total + (targetWords.has(word) ? 2 : 0), 0);
      if (isActionSentence_(normalized)) score += 5;
      if (hasDeadline) score += 4;
      if (hasAmount) score += 4;
      if (/(urgent|термінов|негайно|security|безпек|overdue|простроч|final notice|останнє попередження)/i.test(normalized)) score += 4;
      if (!best || score > best.score || (score === best.score && sentenceIndex < best.sentenceIndex)) {
        best = { text: normalized, score, sentenceIndex };
      }
    });
    if (!best) return;
    const bestLower = best.text.toLowerCase();
    const supports = [];
    if (isActionSentence_(best.text)) supports.push('action');
    if (normalizedDeadlines.some(value => bestLower.indexOf(value) !== -1)) supports.push('deadline');
    if (normalizedAmounts.some(value => bestLower.indexOf(value) !== -1)) supports.push('amount');
    if (/(urgent|термінов|негайно|security|безпек|overdue|простроч|final notice|останнє попередження)/i.test(best.text)) supports.push('risk');
    if (!supports.length) supports.push('summary');
    candidates.push({
      messageId: mailboxSafeGmailId_(item && item.id),
      timestamp: mailboxSafeTimestamp_(item && item.timestamp),
      quote: mailboxSafeText_(best.text, MAILBOX_CLIENT_CONFIG_.MAX_ANALYSIS_SOURCE_FRAGMENT_CHARS),
      supports: supports.slice(0, 4),
      score: best.score,
      order: itemIndex,
    });
  });
  return candidates
    .filter(item => item.messageId && item.quote)
    .sort((left, right) => right.score - left.score || right.timestamp - left.timestamp || left.order - right.order)
    .slice(0, MAILBOX_CLIENT_CONFIG_.MAX_ANALYSIS_SOURCE_FRAGMENTS)
    .sort((left, right) => left.timestamp - right.timestamp || left.order - right.order)
    .map(item => ({
      messageId: item.messageId,
      timestamp: item.timestamp,
      quote: item.quote,
      supports: item.supports,
    }));
}

function mailboxAnalysisTextUk_(source, candidate, fallback) {
  const output = String(candidate || '').trim();
  if (!output) return fallback;
  if (mailboxLikelyUkrainian_(source)) return output;
  return mailboxTranslationLooksValid_(source, output) ? output : fallback;
}

/**
 * Gmail thread resources expose draft messages but not their draft IDs. Resolve
 * only the draft messages in the selected thread through a bounded drafts.list
 * scan; no raw draft or MIME data crosses the RPC boundary.
 */
function mailboxDraftIdsByMessage_(messages) {
  const wanted = new Set((messages || [])
    .filter(message => (message.labelIds || []).indexOf('DRAFT') !== -1)
    .map(message => mailboxSafeGmailId_(message && message.id))
    .filter(Boolean));
  const found = {};
  if (!wanted.size) return found;

  let pageToken = '';
  const seenTokens = new Set();
  for (let page = 0; page < MAILBOX_CLIENT_CONFIG_.MAX_DRAFT_LOOKUP_PAGES; page += 1) {
    const parameters = ['maxResults=' + MAILBOX_CLIENT_CONFIG_.DRAFT_LOOKUP_PAGE_SIZE];
    if (pageToken) parameters.push('pageToken=' + encodeURIComponent(pageToken));
    const response = gmailApiRequest_('/drafts?' + parameters.join('&'), { method: 'get' });
    (response.drafts || []).forEach(draft => {
      const draftId = mailboxSafeGmailId_(draft && draft.id);
      const messageId = mailboxSafeGmailId_(draft && draft.message && draft.message.id);
      if (draftId && wanted.has(messageId)) found[messageId] = draftId;
    });
    if (Object.keys(found).length >= wanted.size) break;
    const next = mailboxSafeOpaqueToken_(response.nextPageToken, 1024);
    if (!next || seenTokens.has(next)) break;
    seenTokens.add(next);
    pageToken = next;
  }
  return found;
}

function mailboxEditableDraftDto_(draftIdValue, message, messageDtoValue, parsedMimeValue) {
  const draftId = mailboxRequireGmailId_(draftIdValue, 'draftId');
  const mime = parsedMimeValue || mailboxParseMessageMime_(message);
  const messageDto = messageDtoValue || mailboxMessageDto_(message, mime);
  const inlineAttachments = mailboxDraftInlineAttachmentRefs_(message);
  return {
    id: draftId,
    draftId,
    messageId: messageDto.id,
    threadId: messageDto.threadId,
    mode: 'draft',
    replyToMessageId: '',
    from: mailboxSafeEmail_(messageDto.sender && messageDto.sender.email),
    to: messageDto.to,
    cc: messageDto.cc,
    bcc: messageDto.bcc,
    subject: messageDto.subject,
    bodyText: messageDto.bodyText,
    bodyHtml: mailboxDraftHtmlWithInlineRefs_(mime.html, inlineAttachments),
    attachments: mailboxDraftAttachmentRefs_(message),
    inlineAttachments,
  };
}

function mailboxDraftAttachmentRefs_(message) {
  return mailboxAllDraftAttachmentRefs_(message).filter(reference => !reference.inline);
}

function mailboxDraftInlineAttachmentRefs_(message) {
  return mailboxAllDraftAttachmentRefs_(message).filter(reference =>
    reference.inline && mailboxIsAllowedInlineImageMimeType_(reference.mimeType)
  );
}

function mailboxAllDraftAttachmentRefs_(message) {
  const messageId = mailboxRequireGmailId_(message && message.id, 'messageId');
  const output = [];
  mailboxCollectDraftAttachmentRefs_(messageId, message && message.payload, output);
  return output.slice(0, MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS);
}

function mailboxCollectDraftAttachmentRefs_(messageId, partValue, output) {
  const part = partValue || {};
  const body = part.body || {};
  const headers = headersObject_(part.headers || []);
  const filename = String(part.filename || '').trim();
  const disposition = String(headers['content-disposition'] || '');
  const contentId = String(headers['content-id'] || '').replace(/[<>]/g, '').trim();
  const inline = /\binline\b/i.test(disposition) || Boolean(contentId);
  const partId = mailboxSafePartId_(part.partId);
  if (partId && (body.data || body.attachmentId) && (filename || inline)) {
    const attachmentId = mailboxSafeAttachmentId_(body.attachmentId);
    const reference = {
      messageId,
      partId,
      attachmentId,
      name: mailboxSafeText_(filename || ('inline-' + (contentId || partId)), MAILBOX_CLIENT_CONFIG_.MAX_ATTACHMENT_NAME_CHARS),
      mimeType: mailboxSafeMimeType_(part.mimeType),
      size: mailboxSafeCount_(body.size),
      inline,
      // Gmail may inline a small named attachment directly in body.data
      // instead of assigning an attachmentId. The authenticated attachment
      // RPC already resolves both forms by stable message/part identity.
      downloadable: Boolean(partId && (attachmentId || body.data)),
      existing: true,
    };
    if (inline) {
      reference.contentId = mailboxSafeInlineContentId_(contentId);
      reference.token = mailboxInlineReadbackToken_(messageId, partId, reference.contentId);
    }
    output.push(reference);
  }
  (part.parts || []).forEach(child => mailboxCollectDraftAttachmentRefs_(messageId, child, output));
}

function mailboxDraftHtmlWithInlineRefs_(htmlValue, referencesValue) {
  const references = referencesValue || [];
  const allowedTokens = new Set();
  const cidToToken = new Map();
  references.forEach(reference => {
    const token = mailboxSafeInlineToken_(reference && reference.token);
    const contentId = mailboxSafeInlineContentId_(reference && reference.contentId);
    if (!token || !contentId) return;
    allowedTokens.add(token);
    cidToToken.set(contentId, token);
    cidToToken.set(contentId.toLowerCase(), token);
  });
  return mailboxSanitizeHtml_(htmlValue, { allowedTokens, cidToToken });
}

function mailboxInlineReadbackToken_(messageIdValue, partIdValue, contentIdValue) {
  const seed = [
    mailboxSafeGmailId_(messageIdValue),
    mailboxSafePartId_(partIdValue),
    mailboxSafeInlineContentId_(contentIdValue),
  ].join('|');
  return 'inline_' + mailboxDigestText_(seed).slice(0, 32);
}

function mailboxMessageDto_(message, parsedMimeValue) {
  const messageId = mailboxRequireGmailId_(message && message.id, 'messageId');
  const threadId = mailboxRequireGmailId_(message && message.threadId, 'threadId');
  const rawHeaders = (message.payload && message.payload.headers) || [];
  const headers = headersObject_(rawHeaders);
  const mime = parsedMimeValue || mailboxParseMessageMime_(message);
  const incomingInlineAttachments = (mime.inlineAttachments || []).slice(0, 100).map(attachment =>
    mailboxIncomingInlineAttachmentDto_(messageId, attachment)
  );
  const cidToAttachmentToken = new Map();
  const allowedAttachmentTokens = new Set();
  incomingInlineAttachments.forEach(reference => {
    const token = mailboxSafeInlineToken_(reference && reference.token);
    const contentId = mailboxSafeInlineContentId_(reference && reference.contentId);
    if (!token || !contentId) return;
    allowedAttachmentTokens.add(token);
    cidToAttachmentToken.set(contentId, token);
    cidToAttachmentToken.set(contentId.toLowerCase(), token);
  });
  const plain = mailboxSafeBody_(mime.plain || (mime.html ? htmlToText_(mime.html) : message.snippet));
  const from = mailboxSafeHeader_(headers.from, 1000);
  const labelIds = mailboxSanitizeLabelIds_(message.labelIds || []);
  const unsubscribeInfo = mailboxUnsubscribeDto_(unsubscribeInfoFromHeaders_(rawHeaders));
  const unsubscribeMessageId = unsubscribeInfo.available ? messageId : '';
  let codes = [];
  try {
    codes = extractOtpCodes_(String(headers.subject || '') + '\n' + plain).slice(0, 5).map(code => ({
      value: mailboxSafeText_(code.value, 32),
      display: mailboxSafeText_(code.display, 40),
    }));
  } catch (error) {
    codes = [];
  }
  return {
    id: messageId,
    threadId,
    historyId: mailboxSafeOpaqueToken_(message.historyId, 128),
    timestamp: mailboxSafeTimestamp_(message.internalDate),
    sentAt: mailboxSafeHeader_(headers.date, 300),
    timestampLabel: mailboxSafeText_(formatSentDate_(headers.date, message.internalDate), 160),
    subject: mailboxSafeHeader_(headers.subject, 1000),
    sender: mailboxSenderDto_(from),
    from,
    to: mailboxSafeHeader_(headers.to, 4000),
    cc: mailboxSafeHeader_(headers.cc, 4000),
    bcc: mailboxSafeHeader_(headers.bcc, 4000),
    replyTo: mailboxSafeHeader_(headers['reply-to'], 1000),
    snippet: mailboxSafeText_(message.snippet, 1200),
    bodyText: plain,
    bodyHtml: mailboxSanitizeHtml_(mime.html, {
      allowedAttachmentTokens,
      cidToAttachmentToken,
    }),
    attachmentCount: mailboxSafeCount_((mime.attachments || []).length),
    attachments: (mime.attachments || []).slice(0, 100).map(attachment =>
      mailboxAttachmentDto_(attachment, false)
    ),
    inlineAttachments: incomingInlineAttachments,
    labelIds,
    state: mailboxThreadState_(labelIds),
    unsubscribe: Object.assign({}, unsubscribeInfo, { messageId: unsubscribeMessageId }),
    unsubscribeMessageId,
    copyCodes: codes,
    gmailUrl: mailboxGmailUrl_(threadId),
  };
}

function mailboxIncomingInlineAttachmentDto_(messageIdValue, attachmentValue) {
  const attachment = attachmentValue || {};
  const dto = mailboxAttachmentDto_(attachment, true);
  dto.token = mailboxInlineReadbackToken_(
    messageIdValue,
    dto.partId,
    mailboxSafeInlineContentId_(dto.contentId)
  );
  dto.localRef = 'attachment:' + dto.token;
  return dto;
}

/**
 * Find the newest message that actually advertises a supported unsubscribe
 * method. Inspect the complete Gmail thread, including messages older than the
 * bounded reader window, and keep the exact supporting message ID for the
 * subsequent Gmail action.
 */
function mailboxThreadUnsubscribe_(messages) {
  const ordered = (messages || []).slice().sort(mailboxCompareMessages_).reverse();
  for (const message of ordered) {
    const messageId = mailboxSafeGmailId_(message && message.id);
    if (!messageId) continue;
    const headers = message && message.payload && message.payload.headers || [];
    const info = mailboxUnsubscribeDto_(unsubscribeInfoFromHeaders_(headers));
    if (info.available) return { info, messageId };
  }
  return { info: mailboxUnsubscribeDto_(null), messageId: '' };
}

function mailboxAttachmentDto_(attachment, inline) {
  const attachmentId = mailboxSafeAttachmentId_(attachment && attachment.attachmentId);
  const partId = mailboxSafePartId_(attachment && attachment.partId);
  const hasEmbeddedData = Boolean(String(attachment && attachment.data || ''));
  return {
    attachmentId,
    partId,
    name: mailboxSafeText_(
      attachment && attachment.name,
      MAILBOX_CLIENT_CONFIG_.MAX_ATTACHMENT_NAME_CHARS
    ) || 'attachment',
    mimeType: mailboxSafeMimeType_(attachment && attachment.mimeType),
    size: mailboxSafeCount_(attachment && attachment.size),
    contentId: mailboxSafeText_(attachment && attachment.contentId, 500),
    inline: Boolean(inline),
    downloadable: Boolean(partId && (attachmentId || hasEmbeddedData)),
    forwardable: Boolean(!inline && partId),
  };
}

/**
 * Return one bounded Gmail attachment after proving that it belongs to the
 * requested message and thread. No raw message object crosses the RPC boundary.
 */
function mailboxGetAttachment_(payload) {
  mailboxAssertAllowedKeys_(payload, ['threadId', 'messageId', 'partId', 'attachmentId']);
  const threadId = mailboxRequireGmailId_(payload.threadId, 'threadId');
  const messageId = mailboxRequireGmailId_(payload.messageId, 'messageId');
  const partId = mailboxRequirePartId_(payload.partId);
  const rawAttachmentId = Object.prototype.hasOwnProperty.call(payload, 'attachmentId')
    ? String(payload.attachmentId || '')
    : '';
  const requestedAttachmentId = rawAttachmentId
    ? mailboxRequireAttachmentId_(rawAttachmentId)
    : '';
  const message = gmailApiRequest_(
    '/messages/' + encodeURIComponent(messageId) + '?format=full',
    { method: 'get' }
  );
  if (String(message && message.threadId || '') !== threadId) {
    throw mailboxError_(
      'INVALID_ATTACHMENT',
      'Вкладення не належить до вказаного ланцюжка листів.'
    );
  }

  const part = mailboxFindDownloadableAttachmentPartById_(message && message.payload, partId);
  if (!part) {
    throw mailboxError_('ATTACHMENT_NOT_FOUND', 'Цього вкладення немає у вказаному листі.');
  }
  const body = part.body || {};
  const attachmentId = mailboxSafeAttachmentId_(body.attachmentId);
  if (requestedAttachmentId && requestedAttachmentId !== attachmentId) {
    throw mailboxError_(
      'INVALID_ATTACHMENT',
      'Ідентифікатор вкладення не відповідає вибраній частині листа.'
    );
  }
  const declaredSize = mailboxSafeCount_(body.size);
  if (declaredSize > MAILBOX_CLIENT_CONFIG_.MAX_INCOMING_ATTACHMENT_BYTES) {
    throw mailboxError_(
      'ATTACHMENT_TOO_LARGE',
      'Вкладення завелике для безпечного відкриття в Telegram. Відкрийте його у Gmail.'
    );
  }

  let encoded = String(body.data || '');
  let responseSize = declaredSize;
  if (!encoded) {
    if (!attachmentId) {
      throw mailboxError_('ATTACHMENT_NOT_FOUND', 'Цього вкладення немає у вказаному листі.');
    }
    const attachment = gmailApiRequest_(
      '/messages/' + encodeURIComponent(messageId) +
        '/attachments/' + encodeURIComponent(attachmentId),
      { method: 'get' }
    );
    encoded = String(attachment && attachment.data || '');
    responseSize = mailboxSafeCount_(attachment && attachment.size);
  }
  const decoded = mailboxDecodeIncomingAttachment_(encoded);
  if ((responseSize && responseSize !== decoded.bytes.length) ||
      (declaredSize && declaredSize !== decoded.bytes.length)) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Gmail повернув пошкоджене вкладення.');
  }

  const headers = headersObject_(part.headers || []);
  const disposition = String(headers['content-disposition'] || '');
  const contentId = String(headers['content-id'] || '').replace(/[<>]/g, '').trim();
  return {
    threadId,
    messageId,
    attachmentId,
    name: mailboxSafeText_(
      String(part.filename || '').trim(),
      MAILBOX_CLIENT_CONFIG_.MAX_ATTACHMENT_NAME_CHARS
    ) || 'attachment',
    mimeType: mailboxSafeMimeType_(part.mimeType),
    size: decoded.bytes.length,
    dataBase64Url: decoded.dataBase64Url,
    encoding: 'base64url',
    inline: /\binline\b/i.test(disposition) || Boolean(contentId),
    contentId: mailboxSafeText_(contentId, 500),
  };
}

/**
 * Owner-only attachment sources.  Source DTOs intentionally contain only
 * immutable references and bounded metadata; file bytes are returned only by
 * sourceContent or resolved transiently while saving a Gmail draft.
 */
function mailboxAssertAttachmentSourceSession_(session) {
  if (!session || !/^\d{1,24}$/.test(String(session.userId || ''))) {
    throw mailboxError_('FORBIDDEN', 'Джерела вкладень потребують підтвердженого Telegram-сеансу.');
  }
}

function mailboxAssertLegacyAttachmentOwner_(session) {
  mailboxAssertAttachmentSourceSession_(session);
  if (!constantTimeEqual_(String(session.userId || ''), mailboxOwnerId_())) {
    throw mailboxError_(
      'FORBIDDEN',
      'Це застаріле джерело вкладень доступне лише його власнику. Підключіть власний акаунт.'
    );
  }
}

function mailboxUnifiedConnectionIds_(session, registryValue) {
  const registry = registryValue || mailboxMultiReadRegistry_();
  const userId = String(session && session.userId || '');
  const preference = (registry.preferences || []).find(item => item.userId === userId);
  const ids = preference && Array.isArray(preference.unifiedConnectionIds)
    ? preference.unifiedConnectionIds.slice() : [];
  const unique = [];
  ids.forEach(value => {
    const id = mailboxMultiOpaqueId_(value, 'gmail');
    if (unique.indexOf(id) !== -1) return;
    const access = mailboxMultiResolveAccess_(session, id, 'viewer', registry);
    if (access.connection.status === 'active') unique.push(id);
  });
  if (!unique.length) {
    throw mailboxError_('UNIFIED_EMPTY', 'Оберіть хоча б один Gmail-акаунт для спільної стрічки.');
  }
  if (unique.length > MAILBOX_CLIENT_CONFIG_.MAX_UNIFIED_ACCOUNTS) {
    throw mailboxError_(
      'UNIFIED_TOO_MANY',
      'За один перегляд підтримується до ' + MAILBOX_CLIENT_CONFIG_.MAX_UNIFIED_ACCOUNTS +
        ' Gmail-акаунтів. Решта підключень залишаються доступними окремо.'
    );
  }
  return unique;
}

function mailboxWithConnection_(session, connectionId, minimumRole, callback) {
  const access = mailboxMultiResolveAccess_(session, connectionId, minimumRole || 'viewer');
  if (access.connection.status !== 'active') {
    throw mailboxError_('REAUTH_REQUIRED', 'Для одного з Gmail-акаунтів потрібно оновити доступ Google.');
  }
  const previous = mailboxCurrentSessionContext_;
  mailboxCurrentSessionContext_ = Object.assign({}, session, {
    connectionId: access.connection.id,
    zoneId: access.connection.zoneId,
    role: access.member.role,
  });
  try { return callback(); }
  finally { mailboxCurrentSessionContext_ = previous; }
}

function mailboxUnifiedCursorKey_(token, indexValue) {
  const value = String(token || '');
  if (!/^[A-Za-z0-9_-]{43}$/.test(value)) {
    throw mailboxError_('UNIFIED_CURSOR_EXPIRED', 'Спільна стрічка застаріла. Оновіть список.');
  }
  if (indexValue === undefined || indexValue === null) {
    return MAILBOX_CLIENT_CONFIG_.UNIFIED_CURSOR_PREFIX + value;
  }
  const index = Number(indexValue);
  if (!Number.isInteger(index) || index < 0 || index >= MAILBOX_CLIENT_CONFIG_.MAX_UNIFIED_ACCOUNTS) {
    throw mailboxError_('UNIFIED_CURSOR_EXPIRED', 'Спільна стрічка пошкоджена. Оновіть список.');
  }
  return MAILBOX_CLIENT_CONFIG_.UNIFIED_CURSOR_PREFIX + value + '.' + index;
}

function mailboxUnifiedRequest_(payload) {
  mailboxAssertAllowedKeys_(payload, ['folder', 'labelId', 'pageSize', 'pageToken', 'query', 'filter']);
  const pageSize = mailboxPageSize_(payload.pageSize);
  const request = {
    folder: payload.folder,
    labelId: payload.labelId,
    pageSize,
    pageToken: '',
    query: payload.query,
    filter: payload.filter,
  };
  const fingerprint = mailboxDigestText_(JSON.stringify({
    folder: String(payload.folder || ''),
    labelId: String(payload.labelId || ''),
    pageSize,
    query: String(payload.query || ''),
    filter: String(payload.filter || ''),
  }));
  return { request, pageSize, fingerprint, cursor: String(payload.pageToken || '') };
}

function mailboxUnifiedLoadAccountPage_(session, connectionId, requestValue, nextPageToken) {
  const request = Object.assign({}, requestValue, { pageToken: String(nextPageToken || '') });
  return mailboxWithConnection_(session, connectionId, 'viewer', () => mailboxListThreads_(request));
}

function mailboxUnifiedValidateState_(value, connectionId, index) {
  const state = value && typeof value === 'object' ? value : null;
  if (!state || state.v !== 1 || state.index !== index || state.connectionId !== connectionId ||
      !Array.isArray(state.buffer) || state.buffer.length > MAILBOX_CLIENT_CONFIG_.MAX_PAGE_SIZE ||
      typeof state.nextPageToken !== 'string' || state.nextPageToken.length > 1024) {
    throw mailboxError_('UNIFIED_CURSOR_EXPIRED', 'Стан спільної стрічки застарів. Оновіть список.');
  }
  state.buffer.forEach(item => {
    if (!item || typeof item !== 'object' || !mailboxSafeGmailId_(item.id) ||
        !item.account || item.account.id !== connectionId) {
      throw mailboxError_('UNIFIED_CURSOR_EXPIRED', 'Стан спільної стрічки пошкоджений. Оновіть список.');
    }
  });
  return state;
}

function mailboxUnifiedPutState_(cache, key, value, ttlSeconds) {
  const serialized = JSON.stringify(value);
  if (serialized.length > MAILBOX_CLIENT_CONFIG_.MAX_UNIFIED_CURSOR_CHARS) {
    throw mailboxError_('UNIFIED_CURSOR_FULL', 'Сторінка спільної стрічки завелика. Зменште кількість листів.');
  }
  cache.put(key, serialized, ttlSeconds);
}

function mailboxListUnifiedThreads_(payload, session) {
  const normalized = mailboxUnifiedRequest_(payload || {});
  const registry = mailboxMultiReadRegistry_();
  const connectionIds = mailboxUnifiedConnectionIds_(session, registry);
  const cache = CacheService.getScriptCache();
  const now = Date.now();
  let token = normalized.cursor;
  let manifest = null;
  let states = [];

  if (token) {
    let rawManifest = null;
    try { rawManifest = JSON.parse(String(cache.get(mailboxUnifiedCursorKey_(token)) || 'null')); }
    catch (error) { rawManifest = null; }
    const sameConnections = rawManifest && Array.isArray(rawManifest.connectionIds) &&
      rawManifest.connectionIds.length === connectionIds.length &&
      rawManifest.connectionIds.every((id, index) => id === connectionIds[index]);
    if (!rawManifest || rawManifest.v !== 1 || rawManifest.userId !== String(session.userId || '') ||
        rawManifest.fingerprint !== normalized.fingerprint || !sameConnections ||
        !Number.isInteger(rawManifest.createdAt) || now - rawManifest.createdAt < 0 ||
        now - rawManifest.createdAt > MAILBOX_CLIENT_CONFIG_.UNIFIED_CURSOR_SECONDS * 1000) {
      throw mailboxError_('UNIFIED_CURSOR_EXPIRED', 'Спільна стрічка змінилася або застаріла. Оновіть список.');
    }
    manifest = rawManifest;
    states = connectionIds.map((connectionId, index) => {
      let value = null;
      try { value = JSON.parse(String(cache.get(mailboxUnifiedCursorKey_(token, index)) || 'null')); }
      catch (error) { value = null; }
      mailboxMultiResolveAccess_(session, connectionId, 'viewer', registry);
      return mailboxUnifiedValidateState_(value, connectionId, index);
    });
  } else {
    token = mailboxRandomToken_();
    const firstPages = connectionIds.map((connectionId, index) => {
      const page = mailboxUnifiedLoadAccountPage_(session, connectionId, normalized.request, '');
      return {
        v: 1,
        index,
        connectionId,
        buffer: (page.threads || []).slice().sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0)),
        nextPageToken: String(page.nextPageToken || ''),
        resultSizeEstimate: Math.max(0, Number(page.resultSizeEstimate || 0)),
      };
    });
    states = firstPages;
    manifest = {
      v: 1,
      userId: String(session.userId || ''),
      fingerprint: normalized.fingerprint,
      connectionIds: connectionIds.slice(),
      folder: null,
      createdAt: now,
    };
  }

  const output = [];
  let refillCount = 0;
  while (output.length < normalized.pageSize) {
    for (let index = 0; index < states.length; index += 1) {
      const state = states[index];
      if (!state.buffer.length && state.nextPageToken) {
        refillCount += 1;
        if (refillCount > states.length * 4 + normalized.pageSize) {
          throw mailboxError_('UNIFIED_STALLED', 'Gmail не зміг продовжити спільну стрічку. Оновіть список.');
        }
        const previousPageToken = state.nextPageToken;
        const page = mailboxUnifiedLoadAccountPage_(
          session, state.connectionId, normalized.request, state.nextPageToken
        );
        state.buffer = (page.threads || []).slice()
          .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
        state.nextPageToken = String(page.nextPageToken || '');
        if (!state.buffer.length && state.nextPageToken === previousPageToken) {
          throw mailboxError_('UNIFIED_STALLED', 'Gmail повернув повторний курсор. Оновіть спільну стрічку.');
        }
      }
    }
    const candidates = states.filter(state => state.buffer.length).map(state => ({
      state,
      thread: state.buffer[0],
    }));
    if (!candidates.length) break;
    candidates.sort((left, right) => {
      const time = Number(right.thread.timestamp || 0) - Number(left.thread.timestamp || 0);
      if (time) return time;
      return (left.state.connectionId + ':' + left.thread.id)
        .localeCompare(right.state.connectionId + ':' + right.thread.id);
    });
    output.push(candidates[0].state.buffer.shift());
  }

  const hasMore = states.some(state => state.buffer.length || state.nextPageToken);
  const elapsedSeconds = Math.floor((Date.now() - manifest.createdAt) / 1000);
  const ttl = Math.max(1, MAILBOX_CLIENT_CONFIG_.UNIFIED_CURSOR_SECONDS - elapsedSeconds);
  const stateKeys = states.map((state, index) => mailboxUnifiedCursorKey_(token, index));
  if (hasMore) {
    states.forEach((state, index) => mailboxUnifiedPutState_(cache, stateKeys[index], state, ttl));
    mailboxUnifiedPutState_(cache, mailboxUnifiedCursorKey_(token), manifest, ttl);
  } else {
    cache.remove(mailboxUnifiedCursorKey_(token));
    if (typeof cache.removeAll === 'function') cache.removeAll(stateKeys);
    else stateKeys.forEach(key => cache.remove(key));
  }
  return {
    folder: { key: String(payload.folder || 'Inbox').toLowerCase(), name: 'Спільна стрічка', type: 'unified' },
    query: String(payload.query || ''),
    filter: String(payload.filter || 'all'),
    threads: output,
    nextPageToken: hasMore ? token : '',
    resultSizeEstimate: states.reduce((sum, state) => sum + state.resultSizeEstimate, 0),
    pageSize: normalized.pageSize,
    unified: true,
    accountCount: connectionIds.length,
  };
}

function mailboxLabelCatalog_() {
  const response = gmailApiRequest_('/labels', { method: 'get' });
  return (response.labels || []).map(label => {
    const dto = mailboxLabelDto_(label);
    if (!dto) return null;
    const type = String(label && label.type || '').toLowerCase() === 'user' ? 'user' : 'system';
    dto.type = type;
    dto.internal = type === 'user' && dto.name === MAILBOX_BOT_SNOOZE_LABEL_NAME_;
    dto.canApply = type === 'user' || ['INBOX', 'UNREAD', 'STARRED', 'IMPORTANT', 'TRASH', 'SPAM']
      .indexOf(dto.id) !== -1;
    dto.canApply = dto.canApply && !dto.internal;
    dto.canEdit = type === 'user' && !dto.internal;
    dto.version = mailboxDigestText_(JSON.stringify({
      id: dto.id, name: dto.name, messageListVisibility: dto.messageListVisibility,
      labelListVisibility: dto.labelListVisibility, color: dto.color,
    }));
    return dto;
  }).filter(Boolean).sort((left, right) => {
    if (left.type !== right.type) return left.type === 'system' ? -1 : 1;
    return left.name.localeCompare(right.name, 'uk');
  });
}

function mailboxMetadataTry_(path, field) {
  try {
    return { supported: true, value: gmailApiRequest_(path, { method: 'get' }) };
  } catch (error) {
    return {
      supported: false,
      value: null,
      code: error && error.gmailHttpStatus === 403 ? 'SCOPE_REQUIRED' : 'UNAVAILABLE',
      message: field + ' зараз недоступні для цього Gmail-підключення.',
    };
  }
}

function mailboxNormalizeLanguageSetting_(value) {
  return { displayLanguage: mailboxSafeText_(value && value.displayLanguage, 32) };
}

function mailboxNormalizeImapSetting_(value) {
  const item = value || {};
  return {
    enabled: Boolean(item.enabled),
    autoExpunge: Boolean(item.autoExpunge),
    expungeBehavior: mailboxEnum_(item.expungeBehavior,
      ['archive', 'trash', 'deleteForever', 'expungeBehaviorUnspecified'], ''),
    maxFolderSize: mailboxBoundedInteger_(item.maxFolderSize, 0, 0, 1000000, 'maxFolderSize'),
  };
}

function mailboxNormalizePopSetting_(value) {
  const item = value || {};
  return {
    accessWindow: mailboxEnum_(item.accessWindow,
      ['disabled', 'fromNowOn', 'allMail', 'accessWindowUnspecified'], ''),
    disposition: mailboxEnum_(item.disposition,
      ['leaveInInbox', 'archive', 'trash', 'markRead', 'dispositionUnspecified'], ''),
  };
}

function mailboxNormalizeVacationSetting_(value) {
  const item = value || {};
  return {
    enableAutoReply: Boolean(item.enableAutoReply),
    responseSubject: mailboxSafeHeader_(item.responseSubject, 998),
    responseBodyPlainText: mailboxSafeText_(item.responseBodyPlainText, 20000),
    restrictToContacts: Boolean(item.restrictToContacts),
    restrictToDomain: Boolean(item.restrictToDomain),
    startTime: mailboxSafeTimestamp_(item.startTime),
    endTime: mailboxSafeTimestamp_(item.endTime),
  };
}

function mailboxNormalizeFilterSetting_(value) {
  const item = value || {};
  const criteria = item.criteria || {};
  const action = item.action || {};
  return {
    id: mailboxSafeOpaqueToken_(item.id, 256),
    criteria: {
      from: mailboxSafeHeader_(criteria.from, 998),
      to: mailboxSafeHeader_(criteria.to, 998),
      subject: mailboxSafeHeader_(criteria.subject, 998),
      query: mailboxSafeText_(criteria.query, 4096),
      negatedQuery: mailboxSafeText_(criteria.negatedQuery, 4096),
      hasAttachment: Boolean(criteria.hasAttachment),
      excludeChats: Boolean(criteria.excludeChats),
      size: mailboxSafeCount_(criteria.size),
      sizeComparison: mailboxEnum_(criteria.sizeComparison,
        ['larger', 'smaller', 'sizeComparisonUnspecified'], ''),
    },
    action: {
      addLabelIds: (Array.isArray(action.addLabelIds) ? action.addLabelIds : [])
        .slice(0, 100).map(id => mailboxSafeLabelId_(id, false)).filter(Boolean),
      removeLabelIds: (Array.isArray(action.removeLabelIds) ? action.removeLabelIds : [])
        .slice(0, 100).map(id => mailboxSafeLabelId_(id, false)).filter(Boolean),
      forward: mailboxSafeEmail_(action.forward),
    },
  };
}

/** Read a fresh per-connection metadata snapshot; Gmail remains authoritative. */
function mailboxGmailMetadata_(payload, session) {
  mailboxAssertAllowedKeys_(payload, []);
  const labels = mailboxLabelCatalog_();
  const profile = gmailApiRequest_('/profile', { method: 'get' });
  const sendAs = mailboxMetadataTry_('/settings/sendAs', 'Адреси відправника');
  if (sendAs.supported) sendAs.value = mailboxNormalizeSendAs_(sendAs.value && sendAs.value.sendAs);
  const settings = {
    language: mailboxMetadataTry_('/settings/language', 'Мова Gmail'),
    imap: mailboxMetadataTry_('/settings/imap', 'IMAP'),
    pop: mailboxMetadataTry_('/settings/pop', 'POP'),
    vacation: mailboxMetadataTry_('/settings/vacation', 'Автовідповідач'),
    filters: mailboxMetadataTry_('/settings/filters', 'Фільтри'),
  };
  if (settings.language.supported) settings.language.value = mailboxNormalizeLanguageSetting_(settings.language.value);
  if (settings.imap.supported) settings.imap.value = mailboxNormalizeImapSetting_(settings.imap.value);
  if (settings.pop.supported) settings.pop.value = mailboxNormalizePopSetting_(settings.pop.value);
  if (settings.vacation.supported) settings.vacation.value = mailboxNormalizeVacationSetting_(settings.vacation.value);
  if (settings.filters.supported) {
    settings.filters.value = (settings.filters.value && settings.filters.value.filter || [])
      .slice(0, 1000).map(mailboxNormalizeFilterSetting_);
  }
  const account = mailboxCurrentAccountContext_() || {};
  const snapshot = {
    account: { id: String(account.id || session.connectionId || ''), email: mailboxSafeEmail_(profile.emailAddress) },
    labels,
    sendAs,
    settings,
    fetchedAt: Date.now(),
  };
  snapshot.version = mailboxDigestText_(JSON.stringify({
    account: snapshot.account, labels: snapshot.labels, sendAs: snapshot.sendAs, settings: snapshot.settings,
  }));
  snapshot.sync = mailboxMetadataSyncPublicStatus_(session.connectionId, snapshot.version);
  return snapshot;
}

function mailboxMetadataSyncPropertyKey_(connectionIdValue) {
  const connectionId = mailboxMultiOpaqueId_(connectionIdValue, 'gmail');
  return MAILBOX_CLIENT_CONFIG_.METADATA_SYNC_PREFIX + mailboxDigestText_('metadata:' + connectionId).slice(0, 32);
}

function mailboxMetadataSyncReadRecord_(properties, connectionIdValue) {
  const props = properties || PropertiesService.getScriptProperties();
  const connectionId = mailboxMultiOpaqueId_(connectionIdValue, 'gmail');
  const raw = String(props.getProperty(mailboxMetadataSyncPropertyKey_(connectionId)) || '');
  if (!raw) return null;
  let item = null;
  try { item = JSON.parse(raw); } catch (error) { item = null; }
  if (!mailboxIsPlainObject_(item) || item.v !== 1 || item.connectionId !== connectionId) return null;
  try {
    const state = ['checking', 'healthy', 'degraded'].indexOf(String(item.state || '')) !== -1
      ? String(item.state) : 'degraded';
    return {
      v: 1,
      connectionId,
      zoneId: mailboxMultiOpaqueId_(item.zoneId, 'zone'),
      tokenGeneration: mailboxBoundedInteger_(item.tokenGeneration, 0, 0, 1000000000, 'tokenGeneration'),
      state,
      leaseToken: mailboxSafeOpaqueToken_(item.leaseToken, 128),
      leaseUntil: mailboxSafeTimestamp_(item.leaseUntil),
      version: mailboxSafeOpaqueToken_(item.version, 128),
      labelsVersion: mailboxSafeOpaqueToken_(item.labelsVersion, 128),
      sendAsVersion: mailboxSafeOpaqueToken_(item.sendAsVersion, 128),
      settingsVersion: mailboxSafeOpaqueToken_(item.settingsVersion, 128),
      lastCheckedAt: mailboxSafeTimestamp_(item.lastCheckedAt),
      lastChangedAt: mailboxSafeTimestamp_(item.lastChangedAt),
      nextCheckAt: mailboxSafeTimestamp_(item.nextCheckAt),
      failures: mailboxBoundedInteger_(item.failures, 0, 0, 1000000, 'failures'),
      errorCode: mailboxSafeText_(item.errorCode, 80),
    };
  } catch (error) {
    return null;
  }
}

function mailboxMetadataSyncWriteRecord_(properties, recordValue) {
  const props = properties || PropertiesService.getScriptProperties();
  const record = mailboxMetadataSyncReadRecord_({
    getProperty: () => JSON.stringify(recordValue),
  }, recordValue.connectionId);
  if (!record) throw mailboxError_('SERVER_CONFIG', 'Стан синхронізації Gmail metadata недійсний.');
  const key = mailboxMetadataSyncPropertyKey_(record.connectionId);
  const serialized = JSON.stringify(record);
  if (typeof assertTelegramPropertyValueFits_ === 'function') {
    assertTelegramPropertyValueFits_(key, serialized);
    assertTelegramPropertyStoreFits_(props, { [key]: serialized });
  } else if (serialized.length > 7000) {
    throw mailboxError_('STORAGE_FULL', 'Стан синхронізації Gmail metadata завеликий.');
  }
  props.setProperty(key, serialized);
  return record;
}

function mailboxMetadataSyncPublicStatus_(connectionIdValue, currentVersionValue) {
  if (!connectionIdValue) return {
    state: 'pending', lastCheckedAt: 0, lastChangedAt: 0, current: false,
  };
  const record = mailboxMetadataSyncReadRecord_(null, connectionIdValue);
  if (!record) return {
    state: 'pending', lastCheckedAt: 0, lastChangedAt: 0, current: false,
  };
  return {
    state: record.state,
    lastCheckedAt: record.lastCheckedAt,
    lastChangedAt: record.lastChangedAt,
    nextCheckAt: record.nextCheckAt,
    failures: record.failures,
    errorCode: record.errorCode,
    current: Boolean(currentVersionValue && record.version === String(currentVersionValue)),
  };
}

function mailboxMetadataSyncDigest_(snapshot) {
  return {
    version: mailboxSafeOpaqueToken_(snapshot && snapshot.version, 128),
    labelsVersion: mailboxDigestText_(JSON.stringify(snapshot && snapshot.labels || [])),
    sendAsVersion: mailboxDigestText_(JSON.stringify(snapshot && snapshot.sendAs || {})),
    settingsVersion: mailboxDigestText_(JSON.stringify(snapshot && snapshot.settings || {})),
  };
}

function mailboxMetadataSyncLeaseToken_() {
  const uuid = typeof Utilities === 'object' && Utilities && typeof Utilities.getUuid === 'function'
    ? Utilities.getUuid() : String(Math.random()) + ':' + Date.now();
  return mailboxDigestText_('metadata-lease:' + uuid + ':' + Date.now());
}

function mailboxMetadataSyncReserveOne_() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return null;
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxMultiReadRegistry_(props);
    const now = Date.now();
    const active = registry.connections.filter(item => item.status === 'active').sort((left, right) => {
      const leftRecord = mailboxMetadataSyncReadRecord_(props, left.id);
      const rightRecord = mailboxMetadataSyncReadRecord_(props, right.id);
      return Number(leftRecord && leftRecord.nextCheckAt || 0) - Number(rightRecord && rightRecord.nextCheckAt || 0) ||
        left.id.localeCompare(right.id);
    });
    for (let index = 0; index < active.length; index += 1) {
      const connection = active[index];
      const current = mailboxMetadataSyncReadRecord_(props, connection.id);
      if (current && current.state === 'checking' && current.leaseUntil > now) continue;
      if (current && current.nextCheckAt > now) continue;
      const owner = registry.members.find(item => item.zoneId === connection.zoneId &&
        item.status === 'active' && item.role === 'owner');
      if (!owner) continue;
      const leaseToken = mailboxMetadataSyncLeaseToken_();
      const reserved = {
        v: 1,
        connectionId: connection.id,
        zoneId: connection.zoneId,
        tokenGeneration: connection.tokenGeneration,
        state: 'checking',
        leaseToken,
        leaseUntil: now + MAILBOX_CLIENT_CONFIG_.METADATA_SYNC_LEASE_MS,
        version: current && current.version || '',
        labelsVersion: current && current.labelsVersion || '',
        sendAsVersion: current && current.sendAsVersion || '',
        settingsVersion: current && current.settingsVersion || '',
        lastCheckedAt: current && current.lastCheckedAt || 0,
        lastChangedAt: current && current.lastChangedAt || 0,
        nextCheckAt: now,
        failures: current && current.failures || 0,
        errorCode: '',
      };
      mailboxMetadataSyncWriteRecord_(props, reserved);
      return {
        connectionId: connection.id,
        zoneId: connection.zoneId,
        tokenGeneration: connection.tokenGeneration,
        leaseToken,
        previousVersion: reserved.version,
        previousChangedAt: reserved.lastChangedAt,
        previousFailures: reserved.failures,
        session: {
          userId: owner.userId,
          ownerId: owner.userId,
          connectionId: connection.id,
          zoneId: connection.zoneId,
          role: 'owner',
        },
      };
    }
    return null;
  } finally {
    lock.releaseLock();
  }
}

function mailboxMetadataSyncFinish_(reservation, snapshot, failure) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Стан Gmail metadata зараз оновлюється.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxMultiReadRegistry_(props);
    const connection = registry.connections.find(item => item.id === reservation.connectionId &&
      item.zoneId === reservation.zoneId && item.status === 'active');
    const current = mailboxMetadataSyncReadRecord_(props, reservation.connectionId);
    if (!connection || Number(connection.tokenGeneration) !== Number(reservation.tokenGeneration) ||
        !current || current.state !== 'checking' || current.leaseToken !== reservation.leaseToken) {
      return { completed: false, stale: true, changed: false };
    }
    const now = Date.now();
    if (failure) {
      const failures = Math.min(1000000, Number(reservation.previousFailures || 0) + 1);
      const backoff = Math.min(MAILBOX_CLIENT_CONFIG_.METADATA_SYNC_MAX_BACKOFF_MS,
        60 * 1000 * Math.pow(2, Math.min(failures - 1, 6)));
      const status = Number(failure && failure.gmailHttpStatus || 0);
      const errorCode = mailboxSafeText_(failure && failure.mailboxCode ||
        (status ? 'GMAIL_HTTP_' + status : 'UNAVAILABLE'), 80);
      mailboxMetadataSyncWriteRecord_(props, {
        v: 1, connectionId: connection.id, zoneId: connection.zoneId,
        tokenGeneration: connection.tokenGeneration, state: 'degraded', leaseToken: '', leaseUntil: 0,
        version: reservation.previousVersion, labelsVersion: current.labelsVersion,
        sendAsVersion: current.sendAsVersion, settingsVersion: current.settingsVersion,
        lastCheckedAt: now, lastChangedAt: reservation.previousChangedAt,
        nextCheckAt: now + backoff, failures, errorCode,
      });
      return { completed: true, failed: true, changed: false, connectionId: connection.id, errorCode };
    }
    const digests = mailboxMetadataSyncDigest_(snapshot);
    const changed = Boolean(reservation.previousVersion && reservation.previousVersion !== digests.version);
    mailboxMetadataSyncWriteRecord_(props, {
      v: 1, connectionId: connection.id, zoneId: connection.zoneId,
      tokenGeneration: connection.tokenGeneration, state: 'healthy', leaseToken: '', leaseUntil: 0,
      version: digests.version, labelsVersion: digests.labelsVersion,
      sendAsVersion: digests.sendAsVersion, settingsVersion: digests.settingsVersion,
      lastCheckedAt: now,
      lastChangedAt: changed || !reservation.previousChangedAt ? now : reservation.previousChangedAt,
      nextCheckAt: now + MAILBOX_CLIENT_CONFIG_.METADATA_SYNC_INTERVAL_MS,
      failures: 0, errorCode: '',
    });
    if (changed || (current.sendAsVersion && current.sendAsVersion !== digests.sendAsVersion)) {
      try {
        CacheService.getScriptCache().remove(MAILBOX_CLIENT_CONFIG_.SEND_AS_CACHE_KEY + '.' + connection.id);
      } catch (cacheError) {
        console.error('Could not invalidate send-as cache after Gmail metadata change: ' + cacheError);
      }
    }
    return { completed: true, failed: false, changed, connectionId: connection.id };
  } finally {
    lock.releaseLock();
  }
}

/** Rotating read-only reconciliation for each active Gmail connection. */
function mailboxProcessMetadataReconciliations_(limitValue) {
  const limit = mailboxBoundedInteger_(limitValue, 1, 1,
    MAILBOX_CLIENT_CONFIG_.METADATA_SYNC_MAX_BATCH, 'metadataSyncLimit');
  const result = { processed: 0, changed: 0, failed: 0, stale: 0 };
  for (let index = 0; index < limit; index += 1) {
    const reservation = mailboxMetadataSyncReserveOne_();
    if (!reservation) break;
    let snapshot = null;
    let failure = null;
    try {
      snapshot = mailboxWithConnection_(reservation.session, reservation.connectionId, 'viewer', () =>
        mailboxGmailMetadata_({}, reservation.session));
    } catch (error) {
      failure = error;
    }
    const completed = mailboxMetadataSyncFinish_(reservation, snapshot, failure);
    if (completed.stale) result.stale += 1;
    else {
      result.processed += 1;
      if (completed.failed) result.failed += 1;
      if (completed.changed) result.changed += 1;
    }
  }
  return result;
}

function mailboxNormalizeManagedLabelBody_(payload, creating) {
  const name = mailboxSafeText_(payload && payload.name, 225).trim();
  if (creating && !name) throw mailboxError_('INVALID_LABEL', 'Вкажіть назву нової мітки Gmail.');
  const body = {};
  if (name) body.name = name;
  if (Object.prototype.hasOwnProperty.call(payload, 'messageListVisibility')) {
    body.messageListVisibility = mailboxEnum_(payload.messageListVisibility, ['show', 'hide'], '');
    if (!body.messageListVisibility) throw mailboxError_('INVALID_LABEL', 'Некоректна видимість листів мітки.');
  }
  if (Object.prototype.hasOwnProperty.call(payload, 'labelListVisibility')) {
    body.labelListVisibility = mailboxEnum_(payload.labelListVisibility,
      ['labelShow', 'labelShowIfUnread', 'labelHide'], '');
    if (!body.labelListVisibility) throw mailboxError_('INVALID_LABEL', 'Некоректна видимість мітки.');
  }
  if (payload && payload.color !== undefined) {
    if (!mailboxIsPlainObject_(payload.color)) throw mailboxError_('INVALID_LABEL', 'Некоректний колір мітки.');
    const backgroundColor = mailboxSafeColor_(payload.color.backgroundColor);
    const textColor = mailboxSafeColor_(payload.color.textColor);
    if (!backgroundColor || !textColor) throw mailboxError_('INVALID_LABEL', 'Gmail потребує пару кольорів тексту й фону.');
    body.color = { backgroundColor, textColor };
  }
  if (!Object.keys(body).length) throw mailboxError_('INVALID_LABEL', 'Немає змін для мітки Gmail.');
  return body;
}

/** Create, edit or deliberately delete only user-managed Gmail labels. */
function mailboxManageUserLabel_(payload, session) {
  mailboxAssertAllowedKeys_(payload, [
    'action', 'labelId', 'expectedVersion', 'name', 'messageListVisibility',
    'labelListVisibility', 'color', 'confirmDelete',
  ]);
  const action = mailboxEnum_(payload.action, ['create', 'update', 'delete'], '');
  if (!action) throw mailboxError_('INVALID_LABEL', 'Некоректна дія з міткою Gmail.');
  if (action === 'create') {
    const created = gmailApiRequest_('/labels', {
      method: 'post', body: mailboxNormalizeManagedLabelBody_(payload, true),
    });
    return { action, label: mailboxLabelDto_(created), metadata: mailboxGmailMetadata_({}, session) };
  }
  const labelId = mailboxSafeLabelId_(payload.labelId, true);
  const current = mailboxLabelCatalog_().find(label => label.id === labelId);
  if (!current || current.type !== 'user' || !current.canEdit) {
    throw mailboxError_('INVALID_LABEL', 'Системну, внутрішню або вже видалену мітку змінювати не можна.');
  }
  const expectedVersion = String(payload.expectedVersion || '');
  if (!/^[A-Za-z0-9_-]{43}$/.test(expectedVersion) || !constantTimeEqual_(expectedVersion, current.version)) {
    throw mailboxError_('METADATA_CONFLICT', 'Мітка змінилася в Gmail. Оновіть список перед повторною дією.');
  }
  if (action === 'delete') {
    if (String(session && session.role || '') !== 'owner' && String(session && session.role || '') !== 'admin') {
      throw mailboxError_('FORBIDDEN', 'Видаляти мітки може лише власник або адміністратор поштової зони.');
    }
    if (payload.confirmDelete !== 'DELETE_LABEL') {
      throw mailboxError_('CONFIRM_REQUIRED', 'Підтвердіть видалення мітки та її зняття з усіх листів.');
    }
    gmailApiRequest_('/labels/' + encodeURIComponent(labelId), { method: 'delete' });
    return { action, deletedLabelId: labelId, metadata: mailboxGmailMetadata_({}, session) };
  }
  const updated = gmailApiRequest_('/labels/' + encodeURIComponent(labelId), {
    method: 'patch', body: mailboxNormalizeManagedLabelBody_(payload, false),
  });
  return { action, label: mailboxLabelDto_(updated), metadata: mailboxGmailMetadata_({}, session) };
}

const MAILBOX_FOCUS_LEVELS_ = Object.freeze({
  low: Object.freeze({ rank: 1, label: 'До уваги', color: '#5b8def' }),
  medium: Object.freeze({ rank: 2, label: 'Важливо', color: '#8b5cf6' }),
  high: Object.freeze({ rank: 3, label: 'Високий пріоритет', color: '#f29900' }),
  critical: Object.freeze({ rank: 4, label: 'Не пропустити', color: '#d93025' }),
});

const MAILBOX_FOCUS_COLORS_ = Object.freeze([
  '#5b8def', '#8b5cf6', '#12a594', '#f29900', '#e85d4a', '#d93025',
  '#c2185b', '#526078', '#1a73e8', '#188038', '#b06000', '#a50e0e',
]);

function mailboxFocusScope_(session) {
  const userId = String(session && session.userId || '');
  const connectionId = String(mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.connectionId || '');
  if (!/^\d{1,20}$/.test(userId) || !/^gmail-[A-Za-z0-9_-]{3,80}$/.test(connectionId)) {
    throw mailboxError_('FORBIDDEN', 'Не вдалося визначити ізольований профіль пріоритетів.');
  }
  return { userId, connectionId };
}

function mailboxFocusPropertyKey_(scope) {
  return MAILBOX_CLIENT_CONFIG_.FOCUS_PROPERTY_PREFIX +
    mailboxDigestText_(scope.userId + ':' + scope.connectionId).slice(0, 32);
}

function mailboxFocusLevel_(value, allowNone) {
  const level = String(value || '').toLowerCase();
  if (allowNone && (!level || level === 'none')) return 'none';
  if (!Object.prototype.hasOwnProperty.call(MAILBOX_FOCUS_LEVELS_, level)) {
    throw mailboxError_('INVALID_FOCUS', 'Некоректний рівень пріоритету.');
  }
  return level;
}

function mailboxFocusColor_(value, level) {
  const color = String(value || '').toLowerCase();
  if (MAILBOX_FOCUS_COLORS_.indexOf(color) !== -1) return color;
  return MAILBOX_FOCUS_LEVELS_[level] ? MAILBOX_FOCUS_LEVELS_[level].color : '';
}

function mailboxFocusRuleConditions_(value) {
  const input = value || {};
  if (!mailboxIsPlainObject_(input)) throw mailboxError_('INVALID_FOCUS', 'Некоректні умови правила.');
  mailboxAssertAllowedKeys_(input, ['fromEmail', 'fromDomain', 'subjectContains', 'labelId']);
  const fromEmail = input.fromEmail ? mailboxSafeEmail_(input.fromEmail).toLowerCase() : '';
  if (input.fromEmail && !fromEmail) throw mailboxError_('INVALID_FOCUS', 'Некоректна адреса відправника.');
  const fromDomain = String(input.fromDomain || '').trim().toLowerCase();
  if (fromDomain && !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(fromDomain)) {
    throw mailboxError_('INVALID_FOCUS', 'Некоректний домен відправника.');
  }
  const subjectContains = mailboxSafeText_(input.subjectContains, MAILBOX_CLIENT_CONFIG_.MAX_FOCUS_MATCH_CHARS)
    .trim().toLowerCase();
  const labelId = input.labelId ? mailboxSafeLabelId_(input.labelId, true) : '';
  if (!fromEmail && !fromDomain && !subjectContains && !labelId) {
    throw mailboxError_('INVALID_FOCUS', 'Додайте хоча б одну умову правила.');
  }
  return { fromEmail, fromDomain, subjectContains, labelId };
}

function mailboxFocusNormalizeRule_(value) {
  const input = value || {};
  const level = mailboxFocusLevel_(input.priority, false);
  const name = mailboxSafeText_(input.name, MAILBOX_CLIENT_CONFIG_.MAX_FOCUS_NAME_CHARS).trim();
  if (!name) throw mailboxError_('INVALID_FOCUS', 'Вкажіть назву правила пріоритету.');
  return {
    id: mailboxSafeOpaqueToken_(input.id, 80),
    name,
    enabled: input.enabled !== false,
    priority: level,
    color: mailboxFocusColor_(input.color, level),
    match: mailboxEnum_(input.match, ['all', 'any'], 'all'),
    conditions: mailboxFocusRuleConditions_(input.conditions),
    createdAt: mailboxSafeTimestamp_(input.createdAt),
    updatedAt: mailboxSafeTimestamp_(input.updatedAt),
  };
}

function mailboxFocusValidateRegistry_(value, scope) {
  const input = value || {};
  if (!mailboxIsPlainObject_(input) || Number(input.v) !== 1 ||
      String(input.userId || '') !== scope.userId || String(input.connectionId || '') !== scope.connectionId) {
    throw mailboxError_('FOCUS_CORRUPT', 'Сховище пріоритетів пошкоджене й не буде використане.');
  }
  const rules = (Array.isArray(input.rules) ? input.rules : [])
    .slice(0, MAILBOX_CLIENT_CONFIG_.MAX_FOCUS_RULES).map(mailboxFocusNormalizeRule_);
  const manual = (Array.isArray(input.manual) ? input.manual : [])
    .slice(0, MAILBOX_CLIENT_CONFIG_.MAX_FOCUS_MANUAL_THREADS).map(item => {
      const threadId = mailboxRequireGmailId_(item && item.threadId, 'threadId');
      const priority = mailboxFocusLevel_(item && item.priority, false);
      return {
        threadId,
        priority,
        color: mailboxFocusColor_(item && item.color, priority),
        note: mailboxSafeText_(item && item.note, 160).trim(),
        updatedAt: mailboxSafeTimestamp_(item && item.updatedAt),
      };
    });
  return {
    v: 1, userId: scope.userId, connectionId: scope.connectionId,
    revision: mailboxSafeCount_(input.revision), rules, manual,
  };
}

function mailboxFocusInitialRegistry_(scope) {
  return { v: 1, userId: scope.userId, connectionId: scope.connectionId, revision: 0, rules: [], manual: [] };
}

function mailboxFocusReadRegistry_(properties, scope) {
  const props = properties || PropertiesService.getScriptProperties();
  const raw = String(props.getProperty(mailboxFocusPropertyKey_(scope)) || '');
  if (!raw) return mailboxFocusInitialRegistry_(scope);
  let parsed = null;
  try { parsed = JSON.parse(raw); } catch (error) { parsed = null; }
  return mailboxFocusValidateRegistry_(parsed, scope);
}

function mailboxFocusWriteRegistry_(properties, scope, registry) {
  const props = properties || PropertiesService.getScriptProperties();
  const safe = mailboxFocusValidateRegistry_(registry, scope);
  const key = mailboxFocusPropertyKey_(scope);
  const serialized = JSON.stringify(safe);
  assertTelegramPropertyValueFits_(key, serialized);
  assertTelegramPropertyStoreFits_(props, { [key]: serialized });
  props.setProperty(key, serialized);
  return safe;
}

function mailboxFocusConfigDto_(registry) {
  return {
    revision: registry.revision,
    levels: Object.keys(MAILBOX_FOCUS_LEVELS_).map(key => ({
      key, label: MAILBOX_FOCUS_LEVELS_[key].label,
      color: MAILBOX_FOCUS_LEVELS_[key].color, rank: MAILBOX_FOCUS_LEVELS_[key].rank,
    })),
    colors: MAILBOX_FOCUS_COLORS_.slice(),
    rules: registry.rules.map(rule => Object.assign({}, rule, { conditions: Object.assign({}, rule.conditions) })),
    manualCount: registry.manual.length,
  };
}

function mailboxFocusConfig_(payload, session) {
  mailboxAssertAllowedKeys_(payload, []);
  const scope = mailboxFocusScope_(session);
  return mailboxFocusConfigDto_(mailboxFocusReadRegistry_(null, scope));
}

function mailboxFocusRuleAdmin_(payload, session) {
  mailboxAssertAllowedKeys_(payload, [
    'action', 'ruleId', 'operationId', 'expectedRevision', 'name', 'enabled', 'priority', 'color', 'match', 'conditions',
  ]);
  const action = mailboxEnum_(payload.action, ['create', 'update', 'delete'], '');
  if (!action) throw mailboxError_('INVALID_FOCUS', 'Некоректна дія з правилом пріоритету.');
  const scope = mailboxFocusScope_(session);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Налаштування пріоритетів зараз оновлюються.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxFocusReadRegistry_(props, scope);
    const operationId = action === 'create' && payload.operationId
      ? mailboxSafeOpaqueToken_(payload.operationId, 80) : '';
    if (payload.operationId && !/^[a-f0-9]{16}$/.test(operationId)) {
      throw mailboxError_('INVALID_FOCUS', 'Некоректний ідентифікатор створення правила.');
    }
    const deterministicId = operationId
      ? 'focus-' + mailboxDigestText_(scope.userId + ':' + scope.connectionId + ':' + operationId).slice(0, 20)
      : '';
    if (deterministicId && registry.rules.some(rule => rule.id === deterministicId)) {
      return mailboxFocusConfigDto_(registry);
    }
    const expectedRevision = mailboxSafeCount_(payload.expectedRevision);
    if (expectedRevision !== registry.revision) {
      throw mailboxError_('FOCUS_CONFLICT', 'Правила вже змінилися. Оновіть список і повторіть дію.');
    }
    const ruleId = payload.ruleId ? mailboxSafeOpaqueToken_(payload.ruleId, 80) : '';
    const index = ruleId ? registry.rules.findIndex(rule => rule.id === ruleId) : -1;
    if (action === 'create') {
      if (registry.rules.length >= MAILBOX_CLIENT_CONFIG_.MAX_FOCUS_RULES) {
        throw mailboxError_('FOCUS_LIMIT', 'Досягнуто ліміт правил пріоритету.');
      }
      const now = Date.now();
      registry.rules.push(mailboxFocusNormalizeRule_(Object.assign({}, payload, {
        id: deterministicId || 'focus-' + mailboxRandomToken_().slice(0, 20), createdAt: now, updatedAt: now,
      })));
    } else {
      if (index === -1) throw mailboxError_('FOCUS_CONFLICT', 'Правило вже видалене або змінилося.');
      if (action === 'delete') registry.rules.splice(index, 1);
      else registry.rules[index] = mailboxFocusNormalizeRule_(Object.assign({}, registry.rules[index], payload, {
        id: ruleId, createdAt: registry.rules[index].createdAt, updatedAt: Date.now(),
      }));
    }
    registry.revision += 1;
    if (typeof reserveTelegramFocusReconciliationLocked_ === 'function') {
      reserveTelegramFocusReconciliationLocked_(props, scope);
    }
    return mailboxFocusConfigDto_(mailboxFocusWriteRegistry_(props, scope, registry));
  } finally {
    lock.releaseLock();
  }
}

function mailboxFocusThread_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['threadId', 'priority', 'color', 'note']);
  const threadId = mailboxRequireGmailId_(payload.threadId, 'threadId');
  const priority = mailboxFocusLevel_(payload.priority, true);
  const scope = mailboxFocusScope_(session);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Пріоритет листа зараз оновлюється.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxFocusReadRegistry_(props, scope);
    const existing = registry.manual.find(item => item.threadId === threadId);
    const requestedColor = priority === 'none' ? '' : mailboxFocusColor_(payload.color, priority);
    const requestedNote = priority === 'none' ? '' : mailboxSafeText_(payload.note, 160).trim();
    if ((priority === 'none' && !existing) ||
        (existing && existing.priority === priority && existing.color === requestedColor &&
          existing.note === requestedNote)) {
      return { threadId, focus: mailboxFocusEvaluate_(registry, { id: threadId }) };
    }
    registry.manual = registry.manual.filter(item => item.threadId !== threadId);
    if (priority !== 'none') {
      registry.manual.unshift({
        threadId, priority, color: requestedColor,
        note: requestedNote, updatedAt: Date.now(),
      });
      registry.manual = registry.manual.slice(0, MAILBOX_CLIENT_CONFIG_.MAX_FOCUS_MANUAL_THREADS);
    }
    registry.revision += 1;
    if (typeof reserveTelegramFocusReconciliationLocked_ === 'function') {
      reserveTelegramFocusReconciliationLocked_(props, scope);
    }
    mailboxFocusWriteRegistry_(props, scope, registry);
    return { threadId, focus: mailboxFocusEvaluate_(registry, { id: threadId }) };
  } finally {
    lock.releaseLock();
  }
}

function mailboxFocusRuleMatches_(rule, thread) {
  if (!rule.enabled) return false;
  const senderEmail = String(thread && thread.sender && thread.sender.email || '').toLowerCase();
  const senderDomain = senderEmail.indexOf('@') === -1 ? '' : senderEmail.split('@').pop();
  const subject = String(thread && thread.subject || '').toLowerCase();
  const labelIds = new Set((thread && thread.labelIds || []).map(String));
  const conditions = rule.conditions || {};
  const checks = [];
  if (conditions.fromEmail) checks.push(senderEmail === conditions.fromEmail);
  if (conditions.fromDomain) checks.push(senderDomain === conditions.fromDomain);
  if (conditions.subjectContains) checks.push(subject.indexOf(conditions.subjectContains) !== -1);
  if (conditions.labelId) checks.push(labelIds.has(conditions.labelId));
  return checks.length > 0 && (rule.match === 'any' ? checks.some(Boolean) : checks.every(Boolean));
}

function mailboxFocusEvaluate_(registry, thread) {
  const manual = registry.manual.find(item => item.threadId === String(thread && thread.id || ''));
  if (manual) {
    return {
      priority: manual.priority, label: MAILBOX_FOCUS_LEVELS_[manual.priority].label,
      color: manual.color, rank: MAILBOX_FOCUS_LEVELS_[manual.priority].rank,
      source: 'manual', ruleId: '', reason: manual.note || 'Призначено вручну',
    };
  }
  const matches = registry.rules.filter(rule => mailboxFocusRuleMatches_(rule, thread)).sort((left, right) =>
    MAILBOX_FOCUS_LEVELS_[right.priority].rank - MAILBOX_FOCUS_LEVELS_[left.priority].rank ||
    Number(right.updatedAt || 0) - Number(left.updatedAt || 0)
  );
  const selected = matches[0];
  if (!selected) return { priority: 'none', label: '', color: '', rank: 0, source: 'none', ruleId: '', reason: '' };
  return {
    priority: selected.priority, label: MAILBOX_FOCUS_LEVELS_[selected.priority].label,
    color: selected.color, rank: MAILBOX_FOCUS_LEVELS_[selected.priority].rank,
    source: 'rule', ruleId: selected.id, reason: 'Правило: ' + selected.name,
  };
}

function mailboxFocusRegistryForCurrentSession_() {
  const session = mailboxCurrentSessionContext_;
  if (!session) return null;
  try {
    const scope = mailboxFocusScope_(session);
    return mailboxFocusReadRegistry_(null, scope);
  } catch (error) {
    console.error('Focus registry unavailable: ' + mailboxSafeText_(error && error.message, 240));
    return null;
  }
}

const MAILBOX_ATTENTION_TRIAGE_ = Object.freeze({
  action: Object.freeze({ label: 'Дія', rank: 4 }),
  waiting: Object.freeze({ label: 'Чекаю', rank: 3 }),
  info: Object.freeze({ label: 'Інфо', rank: 2 }),
  later: Object.freeze({ label: 'Пізніше', rank: 1 }),
});
const MAILBOX_ATTENTION_SESSION_PRESETS_ = Object.freeze({
  low: Object.freeze({ label: 'Мало сил', maxThreads: 1 }),
  five_minutes: Object.freeze({ label: '5 хвилин', maxThreads: 3 }),
  three_threads: Object.freeze({ label: '3 листи', maxThreads: 3 }),
  untimed: Object.freeze({ label: 'Без таймера', maxThreads: 10 }),
});
const MAILBOX_ATTENTION_REMINDER_MODES_ = Object.freeze({
  soft: 'М’яко',
  digest: 'Дайджест',
  urgent_only: 'Лише термінове',
});
const MAILBOX_ATTENTION_DEFAULT_DIGEST_WINDOWS_ = Object.freeze([540, 1080]);

function mailboxAttentionScope_(session) {
  const userId = String(session && session.userId || '');
  const connectionId = String(mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.connectionId || '');
  if (!/^\d{1,20}$/.test(userId) || !/^gmail-[A-Za-z0-9_-]{3,80}$/.test(connectionId)) {
    throw mailboxError_('FORBIDDEN', 'Не вдалося визначити ізольований профіль уваги.');
  }
  return { userId, connectionId };
}

function mailboxAttentionPropertyKey_(scope) {
  return MAILBOX_CLIENT_CONFIG_.ATTENTION_PROPERTY_PREFIX +
    mailboxDigestText_(scope.userId + ':' + scope.connectionId).slice(0, 32);
}

function mailboxAttentionTriage_(value, allowNone) {
  const triage = String(value || '').toLowerCase();
  if (allowNone && (!triage || triage === 'none')) return 'none';
  if (!Object.prototype.hasOwnProperty.call(MAILBOX_ATTENTION_TRIAGE_, triage)) {
    throw mailboxError_('INVALID_ATTENTION', 'Некоректний стан листа.');
  }
  return triage;
}

function mailboxAttentionProgress_(value) {
  return mailboxBoundedInteger_(value, 0, 0, 100, 'прогресу читання');
}

function mailboxAttentionPreferencesNormalize_(value) {
  const input = value || {};
  const digestWindows = Array.from(new Set((Array.isArray(input.digestWindows)
    ? input.digestWindows : MAILBOX_ATTENTION_DEFAULT_DIGEST_WINDOWS_)
    .map(item => mailboxBoundedInteger_(item, 0, 0, 1439, 'часового вікна digest'))))
    .sort((left, right) => left - right)
    .slice(0, 2);
  const timezone = input.timezone
    ? mailboxScheduledSendTimezone_(input.timezone)
    : 'UTC';
  return {
    sessionPreset: mailboxEnum_(input.sessionPreset,
      Object.keys(MAILBOX_ATTENTION_SESSION_PRESETS_), 'five_minutes'),
    reminderMode: mailboxEnum_(input.reminderMode,
      Object.keys(MAILBOX_ATTENTION_REMINDER_MODES_), 'soft'),
    digestWindows: digestWindows.length ? digestWindows : MAILBOX_ATTENTION_DEFAULT_DIGEST_WINDOWS_.slice(),
    timezone,
    onboardingCompletedAt: mailboxSafeTimestamp_(input.onboardingCompletedAt),
    updatedAt: mailboxSafeTimestamp_(input.updatedAt),
  };
}

function mailboxAttentionPreferencesDto_(registry) {
  const preferences = mailboxAttentionPreferencesNormalize_(registry && registry.preferences);
  const preset = MAILBOX_ATTENTION_SESSION_PRESETS_[preferences.sessionPreset];
  return Object.assign({}, preferences, {
    revision: mailboxSafeCount_(registry && registry.revision),
    maxThreads: preset.maxThreads,
    sessionPresets: Object.keys(MAILBOX_ATTENTION_SESSION_PRESETS_).map(key => ({
      key,
      label: MAILBOX_ATTENTION_SESSION_PRESETS_[key].label,
      maxThreads: MAILBOX_ATTENTION_SESSION_PRESETS_[key].maxThreads,
    })),
    reminderModes: Object.keys(MAILBOX_ATTENTION_REMINDER_MODES_).map(key => ({
      key,
      label: MAILBOX_ATTENTION_REMINDER_MODES_[key],
    })),
    quietHours: { startMinute: 22 * 60, endMinute: 8 * 60, label: '22:00–08:00' },
  });
}

function mailboxAttentionNormalizeEntry_(value) {
  const item = value || {};
  return {
    threadId: mailboxRequireGmailId_(item.threadId, 'threadId'),
    triage: mailboxAttentionTriage_(item.triage, true),
    nextAction: mailboxSafeText_(item.nextAction, MAILBOX_CLIENT_CONFIG_.MAX_NEXT_ACTION_CHARS).trim(),
    readingProgress: mailboxAttentionProgress_(item.readingProgress),
    draftId: item.draftId ? mailboxRequireGmailId_(item.draftId, 'draftId') : '',
    updatedAt: mailboxSafeTimestamp_(item.updatedAt),
  };
}

function mailboxAttentionNormalizeResume_(value) {
  const item = value || {};
  const threadId = item.threadId ? mailboxRequireGmailId_(item.threadId, 'threadId') : '';
  const labelId = item.labelId ? mailboxSafeLabelId_(item.labelId, true) : '';
  const filter = mailboxEnum_(item.filter, Object.keys(MAILBOX_LIST_FILTERS_), 'all');
  return {
    threadId,
    folderId: mailboxSafeText_(item.folderId, 80).trim(),
    labelId,
    query: mailboxSafeText_(item.query, MAILBOX_CLIENT_CONFIG_.MAX_QUERY_CHARS).trim(),
    filter,
    readingProgress: mailboxAttentionProgress_(item.readingProgress),
    draftId: item.draftId ? mailboxRequireGmailId_(item.draftId, 'draftId') : '',
    updatedAt: mailboxSafeTimestamp_(item.updatedAt),
  };
}

function mailboxAttentionValidateRegistry_(value, scope) {
  const input = value || {};
  if (!mailboxIsPlainObject_(input) || Number(input.v) !== 1 ||
      String(input.userId || '') !== scope.userId || String(input.connectionId || '') !== scope.connectionId) {
    throw mailboxError_('ATTENTION_CORRUPT', 'Сховище фокусу пошкоджене й не буде використане.');
  }
  const entries = (Array.isArray(input.entries) ? input.entries : [])
    .slice(0, MAILBOX_CLIENT_CONFIG_.MAX_ATTENTION_THREADS)
    .map(mailboxAttentionNormalizeEntry_);
  return {
    v: 1,
    userId: scope.userId,
    connectionId: scope.connectionId,
    revision: mailboxSafeCount_(input.revision),
    entries,
    resume: mailboxAttentionNormalizeResume_(input.resume),
    preferences: mailboxAttentionPreferencesNormalize_(input.preferences),
  };
}

function mailboxAttentionInitialRegistry_(scope) {
  return {
    v: 1,
    userId: scope.userId,
    connectionId: scope.connectionId,
    revision: 0,
    entries: [],
    resume: mailboxAttentionNormalizeResume_({}),
    preferences: mailboxAttentionPreferencesNormalize_({}),
  };
}

function mailboxAttentionReadRegistry_(properties, scope) {
  const props = properties || PropertiesService.getScriptProperties();
  const raw = String(props.getProperty(mailboxAttentionPropertyKey_(scope)) || '');
  if (!raw) return mailboxAttentionInitialRegistry_(scope);
  let parsed = null;
  try { parsed = JSON.parse(raw); } catch (error) { parsed = null; }
  return mailboxAttentionValidateRegistry_(parsed, scope);
}

function mailboxAttentionWriteRegistry_(properties, scope, registry) {
  const props = properties || PropertiesService.getScriptProperties();
  const safe = mailboxAttentionValidateRegistry_(registry, scope);
  const key = mailboxAttentionPropertyKey_(scope);
  const serialized = JSON.stringify(safe);
  assertTelegramPropertyValueFits_(key, serialized);
  assertTelegramPropertyStoreFits_(props, { [key]: serialized });
  props.setProperty(key, serialized);
  return safe;
}

function mailboxAttentionEmptyThreadDto_(threadId, revision) {
  return {
    threadId: String(threadId || ''),
    triage: 'none',
    triageLabel: '',
    nextAction: '',
    readingProgress: 0,
    draftId: '',
    updatedAt: 0,
    revision: mailboxSafeCount_(revision),
  };
}

function mailboxAttentionThreadDto_(registry, threadId) {
  const id = String(threadId || '');
  const entry = registry.entries.find(item => item.threadId === id);
  if (!entry) return mailboxAttentionEmptyThreadDto_(id, registry.revision);
  return Object.assign({}, entry, {
    triageLabel: entry.triage === 'none' ? '' : MAILBOX_ATTENTION_TRIAGE_[entry.triage].label,
    revision: registry.revision,
  });
}

function mailboxAttentionStateDto_(registry, threadId) {
  return {
    revision: registry.revision,
    triageOptions: Object.keys(MAILBOX_ATTENTION_TRIAGE_).map(key => ({
      key,
      label: MAILBOX_ATTENTION_TRIAGE_[key].label,
      rank: MAILBOX_ATTENTION_TRIAGE_[key].rank,
    })),
    thread: threadId ? mailboxAttentionThreadDto_(registry, threadId) : null,
    resume: Object.assign({}, registry.resume),
    preferences: mailboxAttentionPreferencesDto_(registry),
  };
}

function mailboxAttentionState_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['threadId']);
  const threadId = payload.threadId ? mailboxRequireGmailId_(payload.threadId, 'threadId') : '';
  const scope = mailboxAttentionScope_(session);
  return mailboxAttentionStateDto_(mailboxAttentionReadRegistry_(null, scope), threadId);
}

function mailboxAttentionUpdate_(payload, session) {
  mailboxAssertAllowedKeys_(payload, [
    'threadId', 'triage', 'nextAction', 'readingProgress', 'draftId',
    'folderId', 'labelId', 'query', 'filter', 'expectedRevision',
  ]);
  const threadId = mailboxRequireGmailId_(payload.threadId, 'threadId');
  const scope = mailboxAttentionScope_(session);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Стан фокусу зараз оновлюється.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxAttentionReadRegistry_(props, scope);
    const expectedRevision = mailboxSafeCount_(payload.expectedRevision);
    if (expectedRevision !== registry.revision) {
      throw mailboxError_('ATTENTION_CONFLICT', 'Стан листа вже змінився. Оновіть його й повторіть дію.');
    }
    const previous = registry.entries.find(item => item.threadId === threadId) ||
      mailboxAttentionNormalizeEntry_({ threadId });
    const next = mailboxAttentionNormalizeEntry_({
      threadId,
      triage: payload.triage === undefined ? previous.triage : payload.triage,
      nextAction: payload.nextAction === undefined ? previous.nextAction : payload.nextAction,
      readingProgress: payload.readingProgress === undefined ? previous.readingProgress : payload.readingProgress,
      draftId: payload.draftId === undefined ? previous.draftId : payload.draftId,
      updatedAt: previous.updatedAt,
    });
    const previousResume = registry.resume;
    const nextResume = mailboxAttentionNormalizeResume_({
      threadId,
      folderId: payload.folderId === undefined ? previousResume.folderId : payload.folderId,
      labelId: payload.labelId === undefined ? previousResume.labelId : payload.labelId,
      query: payload.query === undefined ? previousResume.query : payload.query,
      filter: payload.filter === undefined ? previousResume.filter : payload.filter,
      readingProgress: next.readingProgress,
      draftId: next.draftId,
      updatedAt: previousResume.updatedAt,
    });
    const entryChanged = ['triage', 'nextAction', 'readingProgress', 'draftId']
      .some(key => previous[key] !== next[key]);
    const resumeChanged = ['threadId', 'folderId', 'labelId', 'query', 'filter', 'readingProgress', 'draftId']
      .some(key => previousResume[key] !== nextResume[key]);
    if (!entryChanged && !resumeChanged) return mailboxAttentionStateDto_(registry, threadId);
    const now = Date.now();
    next.updatedAt = now;
    nextResume.updatedAt = now;
    registry.entries = registry.entries.filter(item => item.threadId !== threadId);
    if (next.triage !== 'none' || next.nextAction || next.readingProgress || next.draftId) {
      registry.entries.unshift(next);
      registry.entries = registry.entries.slice(0, MAILBOX_CLIENT_CONFIG_.MAX_ATTENTION_THREADS);
    }
    registry.resume = nextResume;
    registry.revision += 1;
    const saved = mailboxAttentionWriteRegistry_(props, scope, registry);
    return mailboxAttentionStateDto_(saved, threadId);
  } finally {
    lock.releaseLock();
  }
}

function mailboxAttentionPreferences_(payload, session) {
  mailboxAssertAllowedKeys_(payload, [
    'sessionPreset', 'reminderMode', 'digestWindows', 'timezone', 'completeOnboarding', 'expectedRevision',
  ]);
  if (payload.sessionPreset !== undefined &&
      !Object.prototype.hasOwnProperty.call(MAILBOX_ATTENTION_SESSION_PRESETS_, String(payload.sessionPreset || ''))) {
    throw mailboxError_('INVALID_ATTENTION', 'Некоректний темп короткої сесії.');
  }
  if (payload.reminderMode !== undefined &&
      !Object.prototype.hasOwnProperty.call(MAILBOX_ATTENTION_REMINDER_MODES_, String(payload.reminderMode || ''))) {
    throw mailboxError_('INVALID_ATTENTION', 'Некоректний режим нагадувань.');
  }
  if (payload.digestWindows !== undefined && !Array.isArray(payload.digestWindows)) {
    throw mailboxError_('INVALID_ATTENTION', 'Некоректні часові вікна дайджесту.');
  }
  if (payload.completeOnboarding !== undefined && payload.completeOnboarding !== true) {
    throw mailboxError_('INVALID_ATTENTION', 'Некоректний стан знайомства із сервісом.');
  }
  const scope = mailboxAttentionScope_(session);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Налаштування фокусу зараз оновлюються.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxAttentionReadRegistry_(props, scope);
    const expectedRevision = mailboxSafeCount_(payload.expectedRevision);
    if (expectedRevision !== registry.revision) {
      throw mailboxError_('ATTENTION_CONFLICT', 'Налаштування вже змінилися. Оновіть їх і повторіть дію.');
    }
    const previous = mailboxAttentionPreferencesNormalize_(registry.preferences);
    const next = mailboxAttentionPreferencesNormalize_({
      sessionPreset: payload.sessionPreset === undefined ? previous.sessionPreset : payload.sessionPreset,
      reminderMode: payload.reminderMode === undefined ? previous.reminderMode : payload.reminderMode,
      digestWindows: payload.digestWindows === undefined ? previous.digestWindows : payload.digestWindows,
      timezone: payload.timezone === undefined ? previous.timezone : payload.timezone,
      onboardingCompletedAt: payload.completeOnboarding === true
        ? (previous.onboardingCompletedAt || Date.now())
        : previous.onboardingCompletedAt,
      updatedAt: previous.updatedAt,
    });
    if (previous.sessionPreset === next.sessionPreset && previous.reminderMode === next.reminderMode &&
        previous.timezone === next.timezone &&
        previous.onboardingCompletedAt === next.onboardingCompletedAt &&
        JSON.stringify(previous.digestWindows) === JSON.stringify(next.digestWindows)) {
      return mailboxAttentionStateDto_(registry, '');
    }
    next.updatedAt = Date.now();
    registry.preferences = next;
    registry.revision += 1;
    return mailboxAttentionStateDto_(mailboxAttentionWriteRegistry_(props, scope, registry), '');
  } finally {
    lock.releaseLock();
  }
}

function mailboxAttentionRegistryForCurrentSession_() {
  const session = mailboxCurrentSessionContext_;
  if (!session) return null;
  try {
    return mailboxAttentionReadRegistry_(null, mailboxAttentionScope_(session));
  } catch (error) {
    console.error('Attention registry unavailable: ' + mailboxSafeText_(error && error.message, 240));
    return null;
  }
}

function mailboxListAttachmentSources_(payload, session) {
  mailboxAssertAttachmentSourceSession_(session);
  mailboxAssertAllowedKeys_(payload, ['provider', 'sourceConnectionId', 'query', 'pageToken', 'pageSize', 'folderId']);
  const provider = String(payload.provider || '');
  if (provider === 'box') return mailboxBoxListSources_(payload, session);
  if (provider !== 'drive' || payload.folderId !== undefined) {
    throw mailboxError_('INVALID_SOURCE', 'Некоректне джерело списку вкладень.');
  }
  const query = mailboxSafeAttachmentSourceQuery_(payload.query);
  const pageToken = payload.pageToken
    ? mailboxSafeOpaqueToken_(payload.pageToken, 1024)
    : '';
  if (payload.pageToken && !pageToken) {
    throw mailboxError_('INVALID_PAGE_TOKEN', 'Токен сторінки Google Drive недійсний.');
  }
  const pageSize = mailboxBoundedInteger_(
    payload.pageSize,
    30,
    1,
    MAILBOX_CLIENT_CONFIG_.MAX_DRIVE_PAGE_SIZE,
    'pageSize'
  );
  const sourceConnectionId = String(payload.sourceConnectionId || '');
  if (!sourceConnectionId) mailboxAssertLegacyAttachmentOwner_(session);
  const accessToken = sourceConnectionId
    ? mailboxDriveAccessToken_(session, sourceConnectionId)
    : ScriptApp.getOAuthToken();
  const driveQuery = ["trashed = false"];
  if (query) driveQuery.push("name contains '" + mailboxEscapeDriveQueryLiteral_(query) + "'");
  const parameters = [
    'pageSize=' + pageSize,
    'orderBy=' + encodeURIComponent('modifiedTime desc,name'),
    'q=' + encodeURIComponent(driveQuery.join(' and ')),
    'spaces=drive',
    'corpora=user',
    'includeItemsFromAllDrives=true',
    'supportsAllDrives=true',
    'fields=' + encodeURIComponent(
      'nextPageToken,files(id,name,mimeType,size,modifiedTime,webViewLink,iconLink,capabilities(canDownload))'
    ),
  ];
  if (pageToken) parameters.push('pageToken=' + encodeURIComponent(pageToken));
  const result = mailboxDriveJsonRequest_('/files?' + parameters.join('&'), accessToken);
  return {
    provider: 'drive',
    sourceConnectionId,
    items: (result.files || []).slice(0, pageSize).map(file =>
      mailboxDriveSourceDto_(file, sourceConnectionId)
    ).filter(Boolean),
    nextPageToken: mailboxSafeOpaqueToken_(result.nextPageToken, 1024),
  };
}

function mailboxAttachmentSourceMetadata_(payload, session) {
  mailboxAssertAttachmentSourceSession_(session);
  mailboxAssertAllowedKeys_(payload, ['source']);
  return mailboxResolveAttachmentSourceMetadata_(payload.source);
}

function mailboxAttachmentSourceContent_(payload, session) {
  mailboxAssertAttachmentSourceSession_(session);
  mailboxAssertAllowedKeys_(payload, ['source', 'purpose', 'maxBytes']);
  const purpose = mailboxEnum_(payload.purpose, ['preview', 'download'], 'preview');
  const cap = purpose === 'preview'
    ? MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_PREVIEW_BYTES
    : MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_DOWNLOAD_BYTES;
  const maxBytes = mailboxBoundedInteger_(payload.maxBytes, cap, 1, cap, 'maxBytes');
  const resolved = mailboxResolveAttachmentSourceBytes_(payload.source, maxBytes);
  return Object.assign({}, resolved.metadata, {
    dataBase64Url: Utilities.base64EncodeWebSafe(resolved.bytes).replace(/=+$/g, ''),
    encoding: 'base64url',
  });
}

function mailboxSafeAttachmentSourceQuery_(value) {
  if (value === undefined || value === null || value === '') return '';
  const query = String(value).trim();
  if (!query || query.length > MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_QUERY_CHARS ||
      /[\u0000-\u001f\u007f]/.test(query)) {
    throw mailboxError_('INVALID_QUERY', 'Пошук Google Drive має некоректний формат.');
  }
  return query;
}

function mailboxEscapeDriveQueryLiteral_(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function mailboxRequireDriveFileId_(value) {
  const fileId = String(value || '');
  if (!fileId || fileId.length > 200 || !/^[A-Za-z0-9_-]+$/.test(fileId)) {
    throw mailboxError_('INVALID_SOURCE', 'Ідентифікатор файлу Google Drive недійсний.');
  }
  return fileId;
}

function mailboxDriveJsonRequest_(requestPath, accessTokenValue) {
  const response = mailboxDriveFetch_(requestPath, { accessToken: accessTokenValue });
  let parsed;
  try { parsed = JSON.parse(String(response.getContentText() || '')); }
  catch (error) {
    throw mailboxError_('SOURCE_FAILED', 'Google Drive повернув некоректну відповідь.');
  }
  if (!mailboxIsPlainObject_(parsed)) {
    throw mailboxError_('SOURCE_FAILED', 'Google Drive повернув некоректну відповідь.');
  }
  return parsed;
}

function mailboxDriveFetch_(requestPath, optionsValue) {
  const path = String(requestPath || '');
  if (!/^\/files(?:\/|\?|$)/.test(path)) {
    throw mailboxError_('INVALID_SOURCE', 'Некоректний шлях Google Drive API.');
  }
  const options = optionsValue || {};
  const accessToken = String(options.accessToken || ScriptApp.getOAuthToken());
  const headers = Object.assign({}, options.headers || {}, {
    Authorization: 'Bearer ' + accessToken,
  });
  const response = UrlFetchApp.fetch('https://www.googleapis.com/drive/v3' + path, {
    method: 'get',
    headers,
    muteHttpExceptions: true,
    followRedirects: false,
  });
  const status = Number(response.getResponseCode());
  if (status < 200 || status >= 300) {
    if (status === 401 || status === 403) {
      throw mailboxError_('SOURCE_FORBIDDEN', 'Google Drive не дозволив прочитати цей файл.');
    }
    if (status === 404) throw mailboxError_('SOURCE_NOT_FOUND', 'Файл Google Drive не знайдено.');
    throw mailboxError_('SOURCE_FAILED', 'Не вдалося прочитати файл Google Drive.');
  }
  return response;
}

function mailboxDriveFileMetadata_(source) {
  mailboxAssertAllowedKeys_(source, ['provider', 'sourceConnectionId', 'fileId', 'exportAs']);
  const fileId = mailboxRequireDriveFileId_(source.fileId);
  const sourceConnectionId = String(source.sourceConnectionId || '');
  if (!sourceConnectionId) mailboxAssertLegacyAttachmentOwner_(mailboxCurrentSessionContext_);
  const accessToken = sourceConnectionId
    ? mailboxDriveAccessToken_(mailboxCurrentSessionContext_, sourceConnectionId)
    : ScriptApp.getOAuthToken();
  const result = mailboxDriveJsonRequest_(
    '/files/' + encodeURIComponent(fileId) + '?supportsAllDrives=true&fields=' +
      encodeURIComponent('id,name,mimeType,size,modifiedTime,webViewLink,iconLink,capabilities(canDownload)'),
    accessToken
  );
  if (String(result.id || '') !== fileId) {
    throw mailboxError_('SOURCE_NOT_FOUND', 'Файл Google Drive не знайдено.');
  }
  const nativeGoogle = mailboxGoogleNativeExportKind_(result.mimeType);
  const exportAs = String(source.exportAs || '');
  if (nativeGoogle && exportAs !== 'pdf') {
    throw mailboxError_('SOURCE_EXPORT_REQUIRED', 'Google Docs, Sheets і Slides потрібно експортувати як PDF.');
  }
  if (!nativeGoogle && exportAs) {
    throw mailboxError_('INVALID_SOURCE', 'PDF-експорт дозволено лише для Google Docs, Sheets або Slides.');
  }
  const dto = mailboxDriveSourceDto_(result, sourceConnectionId);
  if (!dto || dto.mimeType === 'application/vnd.google-apps.folder') {
    throw mailboxError_('INVALID_SOURCE', 'Папку Google Drive не можна додати як вкладення.');
  }
  if (/^application\/vnd\.google-apps\./.test(dto.mimeType) && !nativeGoogle) {
    throw mailboxError_('INVALID_SOURCE', 'Цей тип Google Drive не підтримує безпечний експорт.');
  }
  if (!nativeGoogle && result.capabilities && result.capabilities.canDownload === false) {
    throw mailboxError_('SOURCE_FORBIDDEN', 'Власник файлу заборонив завантаження з Google Drive.');
  }
  if (nativeGoogle) {
    dto.name = mailboxPdfAttachmentName_(dto.name);
    dto.mimeType = 'application/pdf';
    dto.size = 0;
    dto.exportAs = 'pdf';
  }
  return { file: result, metadata: dto, nativeGoogle, accessToken };
}

function mailboxDriveSourceDto_(fileValue, sourceConnectionIdValue) {
  const file = fileValue || {};
  const fileId = String(file.id || '');
  if (!fileId || !/^[A-Za-z0-9_-]+$/.test(fileId) || fileId.length > 200) return null;
  const mimeType = mailboxSafeMimeType_(file.mimeType);
  const nativeGoogle = Boolean(mailboxGoogleNativeExportKind_(mimeType));
  const sourceConnectionId = String(sourceConnectionIdValue || '');
  const source = { provider: 'drive', fileId };
  if (sourceConnectionId) source.sourceConnectionId = sourceConnectionId;
  return {
    provider: 'drive',
    fileId,
    name: mailboxSafeText_(file.name, MAILBOX_CLIENT_CONFIG_.MAX_ATTACHMENT_NAME_CHARS) || 'Drive file',
    mimeType,
    size: mailboxSafeCount_(file.size),
    modifiedTime: mailboxSafeText_(file.modifiedTime, 64),
    webViewLink: file.webViewLink ? mailboxSafePublicSourceUrl_(file.webViewLink, false) : '',
    iconLink: file.iconLink ? mailboxSafePublicSourceUrl_(file.iconLink, false) : '',
    nativeGoogle,
    exportAs: nativeGoogle ? ['pdf'] : [],
    downloadable: nativeGoogle || !(file.capabilities && file.capabilities.canDownload === false),
    source,
  };
}

function mailboxRequireBoxItemId_(value, label) {
  const id = String(value === undefined || value === null ? '' : value);
  if (!/^\d{1,32}$/.test(id)) {
    throw mailboxError_(
      'INVALID_SOURCE',
      'Ідентифікатор ' + (label || 'об’єкта') + ' Box недійсний.'
    );
  }
  return id;
}

function mailboxSafeBoxQuery_(value) {
  if (value === undefined || value === null || value === '') return '';
  const query = String(value).trim();
  if (!query || query.length > MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_QUERY_CHARS ||
      /[\u0000-\u001f\u007f]/.test(query)) {
    throw mailboxError_('INVALID_QUERY', 'Пошук Box має некоректний формат.');
  }
  return query;
}

function mailboxBoxSourceApiJsonRequest_(requestPath, session, sourceConnectionIdValue) {
  const path = String(requestPath || '');
  if (!/^\/(?:users\/me|folders\/\d{1,32}(?:\/items)?|files\/\d{1,32}|search)(?:\?|$)/.test(path)) {
    throw mailboxError_('INVALID_SOURCE', 'Некоректний шлях Box API.');
  }
  const sourceConnectionId = String(sourceConnectionIdValue || '');
  let token = mailboxBoxSourceAccessToken_(session, sourceConnectionId, false);
  let response = mailboxBoxAuthorizedGet_(path, token);
  if (Number(response.getResponseCode()) === 401) {
    token = mailboxBoxSourceAccessToken_(session, sourceConnectionId, true);
    response = mailboxBoxAuthorizedGet_(path, token);
  }
  const status = Number(response.getResponseCode());
  if (status === 401 || status === 403) {
    throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Box не дозволив прочитати цей акаунт. Оновіть авторизацію.');
  }
  if (status === 404) throw mailboxError_('BOX_NOT_FOUND', 'Файл або папку Box не знайдено.');
  if (status === 429) throw mailboxError_('BOX_BUSY', 'Box тимчасово обмежив запити.');
  if (status < 200 || status >= 300) throw mailboxError_('BOX_FAILED', 'Box не виконав запит.');
  const value = mailboxBoxParseJsonResponse_(response);
  if (!value) throw mailboxError_('BOX_FAILED', 'Box повернув некоректну відповідь.');
  return value;
}

function mailboxBoxListSources_(payload, session) {
  if (String(payload.provider || '') !== 'box') {
    throw mailboxError_('INVALID_SOURCE', 'Некоректне джерело списку Box.');
  }
  const folderId = mailboxRequireBoxItemId_(
    payload.folderId === undefined ? '0' : payload.folderId,
    'папки'
  );
  const query = mailboxSafeBoxQuery_(payload.query);
  const pageToken = payload.pageToken
    ? mailboxSafeOpaqueToken_(payload.pageToken, 2048)
    : '';
  if (payload.pageToken && !pageToken) {
    throw mailboxError_('INVALID_PAGE_TOKEN', 'Токен сторінки Box недійсний.');
  }
  const pageSize = mailboxBoundedInteger_(
    payload.pageSize,
    20,
    1,
    MAILBOX_CLIENT_CONFIG_.MAX_BOX_PAGE_SIZE,
    'pageSize'
  );
  const sourceConnectionId = String(payload.sourceConnectionId || '');
  if (sourceConnectionId) mailboxSourceResolveAccess_(session, sourceConnectionId, 'box');
  else mailboxAssertLegacyAttachmentOwner_(session);
  const folder = mailboxBoxFolderMetadata_(folderId, sourceConnectionId, session);
  const fields = 'id,type,name,size,modified_at,extension,item_collection,path_collection';
  const parameters = [];
  let path;
  if (query) {
    parameters.push('query=' + encodeURIComponent(query));
    parameters.push('scope=user_content');
    parameters.push('content_types=name');
    parameters.push('ancestor_folder_ids=' + encodeURIComponent(folderId));
    parameters.push('limit=' + pageSize);
    parameters.push('usemarker=true');
    parameters.push('fields=' + encodeURIComponent(fields));
    if (pageToken) parameters.push('marker=' + encodeURIComponent(pageToken));
    path = '/search?' + parameters.join('&');
  } else {
    parameters.push('limit=' + pageSize);
    parameters.push('usemarker=true');
    parameters.push('fields=' + encodeURIComponent(fields));
    if (pageToken) parameters.push('marker=' + encodeURIComponent(pageToken));
    path = '/folders/' + encodeURIComponent(folderId) + '/items?' + parameters.join('&');
  }
  const result = sourceConnectionId
    ? mailboxBoxSourceApiJsonRequest_(path, session, sourceConnectionId)
    : mailboxBoxApiJsonRequest_(path);
  const entries = Array.isArray(result.entries) ? result.entries : [];
  const rawNextPageToken = String(result.next_marker || '');
  const nextPageToken = rawNextPageToken
    ? mailboxSafeOpaqueToken_(rawNextPageToken, 2048)
    : '';
  if (rawNextPageToken && !nextPageToken) {
    throw mailboxError_('BOX_FAILED', 'Box повернув некоректний токен наступної сторінки.');
  }
  return {
    provider: 'box',
    sourceConnectionId,
    folderId,
    query,
    breadcrumbs: mailboxBoxBreadcrumbs_(folder),
    items: entries
      .slice(0, pageSize)
      .map(item => mailboxBoxSourceDto_(item, sourceConnectionId))
      .filter(Boolean),
    nextPageToken,
  };
}

function mailboxBoxFolderMetadata_(folderIdValue, sourceConnectionIdValue, session) {
  const folderId = mailboxRequireBoxItemId_(folderIdValue, 'папки');
  const path = '/folders/' + encodeURIComponent(folderId) + '?fields=' +
    encodeURIComponent('id,type,name,path_collection');
  if (!sourceConnectionIdValue) mailboxAssertLegacyAttachmentOwner_(session);
  const value = sourceConnectionIdValue
    ? mailboxBoxSourceApiJsonRequest_(path, session, sourceConnectionIdValue)
    : mailboxBoxApiJsonRequest_(path);
  if (String(value.id || '') !== folderId || String(value.type || '') !== 'folder') {
    throw mailboxError_('BOX_NOT_FOUND', 'Папку Box не знайдено.');
  }
  return value;
}

function mailboxBoxBreadcrumbs_(folderValue) {
  const folder = folderValue || {};
  const output = [];
  const entries = folder.path_collection && Array.isArray(folder.path_collection.entries)
    ? folder.path_collection.entries
    : [];
  entries.concat([folder]).forEach(item => {
    if (String(item && item.type || '') !== 'folder') return;
    const id = String(item.id || '');
    if (!/^\d{1,32}$/.test(id) || output.some(entry => entry.id === id)) return;
    output.push({
      id,
      name: mailboxSafeText_(item.name, 160) || (id === '0' ? 'Усі файли' : 'Папка'),
    });
  });
  if (!output.length || output[0].id !== '0') {
    output.unshift({ id: '0', name: 'Усі файли' });
  }
  return output;
}

function mailboxBoxSourceDto_(itemValue, sourceConnectionIdValue) {
  const item = itemValue || {};
  const type = String(item.type || '');
  // Box search can also return web_link. It must never become an attachment.
  if (type !== 'file' && type !== 'folder') return null;
  const id = String(item.id || '');
  if (!/^\d{1,32}$/.test(id)) return null;
  const name = mailboxSafeText_(
    item.name,
    MAILBOX_CLIENT_CONFIG_.MAX_ATTACHMENT_NAME_CHARS
  ) || (type === 'folder' ? 'Папка' : 'Файл');
  const dto = {
    type,
    id,
    name,
    modifiedTime: mailboxSafeText_(item.modified_at, 64),
    webViewLink: 'https://app.box.com/' +
      (type === 'folder' ? 'folder/' : 'file/') + id,
  };
  if (type === 'folder') {
    const total = item.item_collection && item.item_collection.total_count;
    dto.itemCount = Number.isFinite(Number(total)) ? mailboxSafeCount_(total) : null;
    return dto;
  }
  dto.fileId = id;
  dto.source = { provider: 'box', fileId: id };
  const sourceConnectionId = String(sourceConnectionIdValue || '');
  if (sourceConnectionId) dto.source.sourceConnectionId = sourceConnectionId;
  dto.mimeType = mailboxBoxMimeType_(name, item.extension);
  dto.size = mailboxSafeCount_(item.size);
  dto.downloadable = dto.size <= MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_DOWNLOAD_BYTES;
  return dto;
}

function mailboxBoxMimeType_(nameValue, extensionValue) {
  const match = String(nameValue || '').toLowerCase().match(/\.([a-z0-9]{1,12})$/);
  const extension = String(extensionValue || (match && match[1]) || '').toLowerCase();
  const map = {
    pdf: 'application/pdf',
    txt: 'text/plain',
    csv: 'text/csv',
    html: 'text/html',
    htm: 'text/html',
    json: 'application/json',
    xml: 'application/xml',
    zip: 'application/zip',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
  };
  return map[extension] || 'application/octet-stream';
}

function mailboxBoxFileMetadata_(sourceValue) {
  const source = sourceValue || {};
  mailboxAssertAllowedKeys_(source, ['provider', 'sourceConnectionId', 'fileId']);
  if (String(source.provider || '') !== 'box') {
    throw mailboxError_('INVALID_SOURCE', 'Некоректне джерело файла Box.');
  }
  const fileId = mailboxRequireBoxItemId_(source.fileId, 'файлу');
  const sourceConnectionId = String(source.sourceConnectionId || '');
  if (!sourceConnectionId) mailboxAssertLegacyAttachmentOwner_(mailboxCurrentSessionContext_);
  const path = '/files/' + encodeURIComponent(fileId) + '?fields=' +
    encodeURIComponent('id,type,name,size,modified_at,extension,parent,path_collection');
  const value = sourceConnectionId
    ? mailboxBoxSourceApiJsonRequest_(path, mailboxCurrentSessionContext_, sourceConnectionId)
    : mailboxBoxApiJsonRequest_(path);
  if (String(value.id || '') !== fileId || String(value.type || '') !== 'file') {
    throw mailboxError_('BOX_NOT_FOUND', 'Файл Box не знайдено.');
  }
  const dto = mailboxBoxSourceDto_(value, sourceConnectionId);
  if (!dto) {
    throw mailboxError_('INVALID_SOURCE', 'Box повернув некоректні дані файла.');
  }
  return {
    file: value,
    metadata: {
      provider: 'box',
      fileId,
      source: dto.source,
      name: dto.name,
      mimeType: dto.mimeType,
      size: dto.size,
      modifiedTime: dto.modifiedTime,
      webViewLink: dto.webViewLink,
      nativeGoogle: false,
      exportAs: [],
      downloadable: dto.downloadable,
    },
  };
}
function mailboxBoxFileBytes_(sourceValue, maxBytesValue) {
  const maxBytes = mailboxBoundedInteger_(
    maxBytesValue,
    MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_DOWNLOAD_BYTES,
    1,
    MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_DOWNLOAD_BYTES,
    'maxBytes'
  );
  const resolved = mailboxBoxFileMetadata_(sourceValue);
  const expectedSize = mailboxSafeCount_(resolved.metadata.size);
  if (!resolved.metadata.downloadable || expectedSize > maxBytes) {
    throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Файл Box перевищує дозволений розмір.');
  }
  const response = mailboxBoxContentApiResponse_(
    resolved.metadata.fileId,
    maxBytes,
    sourceValue && sourceValue.sourceConnectionId,
    mailboxCurrentSessionContext_
  );
  const headers = mailboxResponseHeaders_(response);
  const totalSize = mailboxPublicResponseTotalSize_(headers);
  if (totalSize > maxBytes) {
    throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Файл Box перевищує дозволений розмір.');
  }
  const bytes = mailboxResponseBytes_(response);
  if (!bytes.length || bytes.length > maxBytes) {
    throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Файл Box перевищує дозволений розмір.');
  }
  const declaredLength = mailboxStrictNonnegativeInteger_(headers['content-length']);
  if (declaredLength !== null && declaredLength !== bytes.length) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Box повернув файл іншого розміру.');
  }
  if (expectedSize && totalSize && expectedSize !== totalSize) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Розмір файла Box змінився під час завантаження.');
  }
  const expectedMime = mailboxBoxComparableMimeType_(resolved.metadata.mimeType);
  const responseMime = mailboxBoxComparableMimeType_(
    String(headers['content-type'] || '').split(';')[0].trim()
  );
  const generic = 'application/octet-stream';
  if (expectedMime !== generic && responseMime !== generic && expectedMime !== responseMime) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Вміст файла Box не відповідає його MIME-типу.');
  }
  const mimeType = expectedMime !== generic ? expectedMime : responseMime;
  if (!mailboxContentMagicMatches_(mimeType, bytes)) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Вміст файла Box не відповідає його формату.');
  }
  return {
    metadata: Object.assign({}, resolved.metadata, {
      mimeType,
      size: bytes.length,
      downloadable: true,
    }),
    bytes,
  };
}

function mailboxBoxComparableMimeType_(value) {
  const mimeType = mailboxSafeMimeType_(String(value || '').split(';')[0].trim());
  return {
    'application/x-zip-compressed': 'application/zip',
    'binary/octet-stream': 'application/octet-stream',
    'image/jpg': 'image/jpeg',
    'text/x-csv': 'text/csv',
  }[mimeType] || mimeType;
}

function mailboxBoxContentApiResponse_(fileIdValue, maxBytesValue, sourceConnectionIdValue, session) {
  const fileId = mailboxRequireBoxItemId_(fileIdValue, 'файлу');
  const maxBytes = mailboxBoundedInteger_(
    maxBytesValue,
    MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_DOWNLOAD_BYTES,
    1,
    MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_DOWNLOAD_BYTES,
    'maxBytes'
  );
  const sourceConnectionId = String(sourceConnectionIdValue || '');
  if (sourceConnectionId) {
    let sourceAccess = mailboxBoxSourceAccessToken_(session, sourceConnectionId, false);
    let sourceResponse = mailboxBoxAuthorizedContentGet_(fileId, sourceAccess, maxBytes);
    if (Number(sourceResponse.getResponseCode()) === 401) {
      sourceAccess = mailboxBoxSourceAccessToken_(session, sourceConnectionId, true);
      sourceResponse = mailboxBoxAuthorizedContentGet_(fileId, sourceAccess, maxBytes);
    }
    const sourceStatus = Number(sourceResponse.getResponseCode());
    if (sourceStatus === 401 || sourceStatus === 403) {
      throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Box не дозволив завантажити файл. Оновіть авторизацію акаунта.');
    }
    if (sourceStatus === 404) throw mailboxError_('BOX_NOT_FOUND', 'Файл Box не знайдено.');
    if (sourceStatus === 429) throw mailboxError_('BOX_BUSY', 'Box тимчасово обмежив запити.');
    if (sourceStatus === 302) return mailboxBoxFollowDownloadRedirect_(sourceResponse, maxBytes);
    if (sourceStatus !== 200 && sourceStatus !== 206) {
      throw mailboxError_('BOX_FAILED', 'Box не зміг підготувати файл до завантаження.');
    }
    return sourceResponse;
  }
  let access = mailboxBoxAccessContext_(false, '');
  let response = mailboxBoxAuthorizedContentGet_(fileId, access.accessToken, maxBytes);
  if (Number(response.getResponseCode()) === 401 && !access.refreshed) {
    access = mailboxBoxAccessContext_(true, access.accessDigest);
    response = mailboxBoxAuthorizedContentGet_(fileId, access.accessToken, maxBytes);
  }
  const status = Number(response.getResponseCode());
  if (status === 401) {
    const disposition = mailboxBoxMarkReauthRequiredIfCurrent_(
      'provider_unauthorized',
      access.connectionGeneration,
      access.accessDigest
    );
    if (disposition === 'changed') {
      throw mailboxError_('BOX_BUSY', 'Підключення Box змінилося. Повторіть завантаження.');
    }
    throw mailboxError_('BOX_REAUTH_REQUIRED', 'Box відкликав доступ. Підключіть Box знову.');
  }
  if (status === 403) {
    throw mailboxError_('BOX_FORBIDDEN', 'Box не дозволив завантажити цей файл.');
  }
  if (status === 404) {
    throw mailboxError_('BOX_NOT_FOUND', 'Файл Box не знайдено.');
  }
  if (status === 429) {
    throw mailboxError_('BOX_BUSY', 'Box тимчасово обмежив запити. Спробуйте трохи пізніше.');
  }
  if (status === 302) return mailboxBoxFollowDownloadRedirect_(response, maxBytes);
  if (status !== 200 && status !== 206) {
    throw mailboxError_('BOX_FAILED', 'Box не зміг підготувати файл до завантаження.');
  }
  return response;
}

function mailboxBoxAuthorizedContentGet_(fileIdValue, accessToken, maxBytes) {
  const fileId = mailboxRequireBoxItemId_(fileIdValue, 'файлу');
  try {
    return UrlFetchApp.fetch(
      'https://api.box.com/2.0/files/' + encodeURIComponent(fileId) + '/content',
      {
        method: 'get',
        headers: {
          Accept: '*/*',
          Authorization: 'Bearer ' + accessToken,
          Range: 'bytes=0-' + (maxBytes - 1),
        },
        muteHttpExceptions: true,
        followRedirects: false,
        validateHttpsCertificates: true,
      }
    );
  } catch (error) {
    throw mailboxError_('BOX_FAILED', 'Не вдалося зв’язатися з Box. Спробуйте ще раз.');
  }
}

function mailboxBoxFollowDownloadRedirect_(response, maxBytes) {
  const location = String(mailboxResponseHeaders_(response).location || '').trim();
  if (!location || location.length > 8192 || /[\u0000-\u0020\u007f\\]/.test(location)) {
    throw mailboxError_('BOX_FAILED', 'Box повернув небезпечне посилання на файл.');
  }
  let parsed;
  try { parsed = new URL(location); }
  catch (error) {
    throw mailboxError_('BOX_FAILED', 'Box повернув некоректне посилання на файл.');
  }
  const host = String(parsed.hostname || '').toLowerCase().replace(/\.$/, '');
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password ||
      parsed.port && parsed.port !== '443' || parsed.hash ||
      !/(^|\.)boxcloud\.com$/.test(host) || host.indexOf('..') !== -1) {
    throw mailboxError_('BOX_FAILED', 'Box повернув недовірене посилання на файл.');
  }
  parsed.hostname = host;
  let redirected;
  try {
    // The OAuth bearer is deliberately absent here: Box signed download URLs
    // are followed only on the fixed boxcloud.com boundary.
    redirected = UrlFetchApp.fetch(parsed.toString(), {
      method: 'get',
      headers: {
        Accept: '*/*',
        Range: 'bytes=0-' + (maxBytes - 1),
      },
      muteHttpExceptions: true,
      followRedirects: false,
      validateHttpsCertificates: true,
    });
  } catch (error) {
    throw mailboxError_('BOX_FAILED', 'Не вдалося завантажити файл із Box.');
  }
  const status = Number(redirected.getResponseCode());
  if (status === 401 || status === 403) {
    throw mailboxError_('BOX_FORBIDDEN', 'Підписане посилання Box не дозволило завантажити файл.');
  }
  if (status === 404) {
    throw mailboxError_('BOX_NOT_FOUND', 'Файл Box більше не доступний.');
  }
  if (status === 429) {
    throw mailboxError_('BOX_BUSY', 'Box тимчасово обмежив завантаження. Спробуйте трохи пізніше.');
  }
  if (status !== 200 && status !== 206) {
    throw mailboxError_('BOX_FAILED', 'Box не завершив безпечне завантаження файла.');
  }
  return redirected;
}


function mailboxGoogleNativeExportKind_(mimeTypeValue) {
  const mimeType = String(mimeTypeValue || '').toLowerCase();
  return {
    'application/vnd.google-apps.document': 'document',
    'application/vnd.google-apps.spreadsheet': 'spreadsheet',
    'application/vnd.google-apps.presentation': 'presentation',
  }[mimeType] || '';
}

function mailboxPdfAttachmentName_(value) {
  let name = mailboxNormalizeAttachmentName_(value || 'Google Drive', 0);
  if (!/\.pdf$/i.test(name)) name += '.pdf';
  return mailboxNormalizeAttachmentName_(name, 0);
}

function mailboxResolveAttachmentSourceMetadata_(sourceValue) {
  if (!mailboxIsPlainObject_(sourceValue)) {
    throw mailboxError_('INVALID_SOURCE', 'Джерело вкладення має некоректний формат.');
  }
  const provider = String(sourceValue.provider || '');
  if (provider === 'drive') return mailboxDriveFileMetadata_(sourceValue).metadata;
  if (provider === 'box') return mailboxBoxFileMetadata_(sourceValue).metadata;
  if (provider === 'publicHttps') return mailboxPublicSourceMetadata_(sourceValue).metadata;
  throw mailboxError_('INVALID_SOURCE', 'Невідоме джерело вкладення.');
}

function mailboxResolveAttachmentSourceBytes_(sourceValue, maxBytesValue) {
  if (!mailboxIsPlainObject_(sourceValue)) {
    throw mailboxError_('INVALID_SOURCE', 'Джерело вкладення має некоректний формат.');
  }
  const maxBytes = mailboxBoundedInteger_(
    maxBytesValue,
    MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_DOWNLOAD_BYTES,
    1,
    MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_DOWNLOAD_BYTES,
    'maxBytes'
  );
  const provider = String(sourceValue.provider || '');
  if (provider === 'drive') {
    const drive = mailboxDriveFileMetadata_(sourceValue);
    if (drive.metadata.size && drive.metadata.size > maxBytes) {
      throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Файл Google Drive перевищує дозволений розмір.');
    }
    const requestPath = drive.nativeGoogle
      ? '/files/' + encodeURIComponent(drive.metadata.fileId) + '/export?mimeType=' + encodeURIComponent('application/pdf')
      : '/files/' + encodeURIComponent(drive.metadata.fileId) + '?alt=media&supportsAllDrives=true';
    const response = mailboxDriveFetch_(requestPath, {
      headers: drive.nativeGoogle ? {} : { Range: 'bytes=0-' + maxBytes },
      accessToken: drive.accessToken,
    });
    const bytes = mailboxResponseBytes_(response);
    if (!bytes.length || bytes.length > maxBytes) {
      throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Файл Google Drive перевищує дозволений розмір.');
    }
    if (drive.nativeGoogle && !mailboxContentMagicMatches_('application/pdf', bytes)) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Google Drive повернув некоректний PDF.');
    }
    const metadata = Object.assign({}, drive.metadata, { size: bytes.length });
    return { metadata, bytes };
  }
  if (provider === 'box') return mailboxBoxFileBytes_(sourceValue, maxBytes);
  if (provider === 'publicHttps') return mailboxPublicSourceBytes_(sourceValue, maxBytes);
  throw mailboxError_('INVALID_SOURCE', 'Невідоме джерело вкладення.');
}

function mailboxResponseBytes_(response) {
  try {
    if (response && typeof response.getBlob === 'function') {
      return Array.from(response.getBlob().getBytes() || [], value => Number(value) & 255);
    }
  } catch (error) {
    throw mailboxError_('SOURCE_FAILED', 'Не вдалося прочитати файл із зовнішнього джерела.');
  }
  try {
    return Array.from(Utilities.newBlob(response.getContentText()).getBytes() || [], value => Number(value) & 255);
  } catch (error) {
    throw mailboxError_('SOURCE_FAILED', 'Не вдалося прочитати файл із зовнішнього джерела.');
  }
}

function mailboxPublicSourceMetadata_(sourceValue) {
  const source = sourceValue || {};
  mailboxAssertAllowedKeys_(source, ['provider', 'url']);
  const requestedUrl = mailboxSafePublicSourceUrl_(source.url, true);
  const head = mailboxPublicFetch_(requestedUrl, 'head', {});
  let response = head.response;
  let finalUrl = head.url;
  let status = Number(response.getResponseCode());
  if (status === 405 || status === 501) {
    const probe = mailboxPublicFetch_(requestedUrl, 'get', { Range: 'bytes=0-0' });
    response = probe.response;
    finalUrl = probe.url;
    status = Number(response.getResponseCode());
    const probeBytes = mailboxResponseBytes_(response);
    if (probeBytes.length > 1 && status !== 206) {
      throw mailboxError_('SOURCE_TOO_LARGE', 'Зовнішній сервер проігнорував безпечний обмежений запит.');
    }
  }
  if (status < 200 || status >= 300) {
    if (status === 404) throw mailboxError_('SOURCE_NOT_FOUND', 'Файл за HTTPS-посиланням не знайдено.');
    if (status === 401 || status === 403) {
      throw mailboxError_('SOURCE_FORBIDDEN', 'HTTPS-посилання потребує окремої авторизації.');
    }
    throw mailboxError_('SOURCE_FAILED', 'Не вдалося перевірити HTTPS-джерело вкладення.');
  }
  const headers = mailboxResponseHeaders_(response);
  let size = mailboxPublicResponseTotalSize_(headers);
  let mimeType = mailboxSafeExternalMimeType_(headers['content-type'], finalUrl, headers);
  if (!size || !mimeType) {
    const probe = mailboxPublicFetch_(requestedUrl, 'get', { Range: 'bytes=0-0' });
    const probeStatus = Number(probe.response.getResponseCode());
    if (probeStatus !== 200 && probeStatus !== 206) {
      throw mailboxError_('SOURCE_FAILED', 'HTTPS-джерело не дозволило перевірити розмір файлу.');
    }
    const probeHeaders = mailboxResponseHeaders_(probe.response);
    const probeBytes = mailboxResponseBytes_(probe.response);
    if (probeStatus === 200 && probeBytes.length > 1) {
      throw mailboxError_('SOURCE_TOO_LARGE', 'Зовнішній сервер проігнорував безпечний обмежений запит.');
    }
    finalUrl = probe.url;
    size = mailboxPublicResponseTotalSize_(probeHeaders) || probeBytes.length;
    mimeType = mailboxSafeExternalMimeType_(probeHeaders['content-type'], finalUrl, probeHeaders);
  }
  if (!mimeType) {
    throw mailboxError_('INVALID_SOURCE_TYPE', 'HTTPS-джерело не повідомило безпечний MIME-тип файлу.');
  }
  if (size > MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_DOWNLOAD_BYTES) {
    throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Файл за HTTPS-посиланням перевищує 10 МБ.');
  }
  return {
    metadata: {
      provider: 'publicHttps',
      url: finalUrl,
      name: mailboxPublicAttachmentName_(headers, finalUrl, mimeType),
      mimeType,
      size,
      modifiedTime: mailboxSafeText_(headers['last-modified'], 128),
      webViewLink: finalUrl,
      nativeGoogle: false,
      exportAs: [],
      downloadable: true,
    },
  };
}

function mailboxPublicSourceBytes_(sourceValue, maxBytes) {
  const source = sourceValue || {};
  mailboxAssertAllowedKeys_(source, ['provider', 'url']);
  const requestedUrl = mailboxSafePublicSourceUrl_(source.url, true);
  const fetched = mailboxPublicFetch_(requestedUrl, 'get', { Range: 'bytes=0-' + maxBytes });
  const response = fetched.response;
  const status = Number(response.getResponseCode());
  if (status !== 200 && status !== 206) {
    if (status === 404) throw mailboxError_('SOURCE_NOT_FOUND', 'Файл за HTTPS-посиланням не знайдено.');
    if (status === 401 || status === 403) {
      throw mailboxError_('SOURCE_FORBIDDEN', 'HTTPS-посилання потребує окремої авторизації.');
    }
    throw mailboxError_('SOURCE_FAILED', 'Не вдалося завантажити HTTPS-джерело вкладення.');
  }
  const headers = mailboxResponseHeaders_(response);
  const totalSize = mailboxPublicResponseTotalSize_(headers);
  if (totalSize > maxBytes) {
    throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Файл за HTTPS-посиланням перевищує дозволений розмір.');
  }
  const bytes = mailboxResponseBytes_(response);
  if (!bytes.length || bytes.length > maxBytes) {
    throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Файл за HTTPS-посиланням перевищує дозволений розмір.');
  }
  if (status === 200) {
    const declared = mailboxStrictNonnegativeInteger_(headers['content-length']);
    if (declared !== null && declared !== bytes.length) {
      throw mailboxError_('INVALID_ATTACHMENT', 'HTTPS-сервер повернув файл іншого розміру.');
    }
  }
  const mimeType = mailboxSafeExternalMimeType_(headers['content-type'], fetched.url, headers);
  if (!mimeType || !mailboxContentMagicMatches_(mimeType, bytes)) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Вміст HTTPS-файлу не відповідає безпечному MIME-типу.');
  }
  return {
    metadata: {
      provider: 'publicHttps',
      url: fetched.url,
      name: mailboxPublicAttachmentName_(headers, fetched.url, mimeType),
      mimeType,
      size: bytes.length,
      modifiedTime: mailboxSafeText_(headers['last-modified'], 128),
      webViewLink: fetched.url,
      nativeGoogle: false,
      exportAs: [],
      downloadable: true,
    },
    bytes,
  };
}

function mailboxPublicFetch_(urlValue, methodValue, headersValue) {
  let current = mailboxSafePublicSourceUrl_(urlValue, true);
  const method = String(methodValue || 'get').toLowerCase();
  if (['get', 'head'].indexOf(method) === -1) {
    throw mailboxError_('INVALID_SOURCE', 'Непідтримуваний метод HTTPS-джерела.');
  }
  let redirect = 0;
  while (redirect <= MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_REDIRECTS) {
    // Google image sharing can finish at an HTML /imgres wrapper. Extract only
    // its explicit imgurl target; the extracted URL is still revalidated by the
    // same HTTPS, DNS, redirect, MIME, magic-byte and size boundary as any URL
    // pasted directly by the owner.
    const googleImageTarget = mailboxGoogleImageRedirectTarget_(current);
    if (googleImageTarget) {
      if (redirect >= MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_REDIRECTS) {
        throw mailboxError_('SOURCE_REDIRECT', 'HTTPS-джерело має забагато перенаправлень.');
      }
      current = googleImageTarget;
      redirect += 1;
      continue;
    }
    const response = UrlFetchApp.fetch(current, {
      method,
      headers: Object.assign({ Accept: '*/*' }, headersValue || {}),
      muteHttpExceptions: true,
      followRedirects: false,
      validateHttpsCertificates: true,
    });
    const status = Number(response.getResponseCode());
    if ([301, 302, 303, 307, 308].indexOf(status) === -1) return { response, url: current };
    if (redirect >= MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_REDIRECTS) {
      throw mailboxError_('SOURCE_REDIRECT', 'HTTPS-джерело має забагато перенаправлень.');
    }
    const location = mailboxResponseHeaders_(response).location;
    if (!location || location.length > MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_URL_CHARS ||
        /[\u0000-\u001f\u007f\\]/.test(location)) {
      throw mailboxError_('SOURCE_REDIRECT', 'HTTPS-джерело повернуло небезпечне перенаправлення.');
    }
    let redirected;
    try { redirected = new URL(location, current).toString(); }
    catch (error) {
      throw mailboxError_('SOURCE_REDIRECT', 'HTTPS-джерело повернуло некоректне перенаправлення.');
    }
    current = mailboxSafePublicSourceUrl_(redirected, true);
    redirect += 1;
  }
  throw mailboxError_('SOURCE_REDIRECT', 'HTTPS-джерело має забагато перенаправлень.');
}

function mailboxGoogleImageRedirectTarget_(urlValue) {
  let parsed;
  try { parsed = new URL(String(urlValue || '')); }
  catch (error) { return ''; }
  const host = String(parsed.hostname || '').toLowerCase().replace(/\.$/, '');
  if (parsed.protocol !== 'https:' || host !== 'www.google.com' || parsed.pathname !== '/imgres') {
    return '';
  }
  const values = parsed.searchParams.getAll('imgurl');
  if (values.length !== 1 || !String(values[0] || '').trim()) {
    throw mailboxError_(
      'SOURCE_NOT_DOWNLOADABLE',
      'Google-посилання не містить одного прямого публічного файла для завантаження.'
    );
  }
  const target = String(values[0]).trim();
  if (target.length > MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_URL_CHARS) {
    throw mailboxError_('INVALID_SOURCE_URL', 'Пряме посилання на файл перевищує ліміт Apps Script у 2 КБ.');
  }
  return mailboxSafePublicSourceUrl_(target, true);
}

function mailboxSafePublicSourceUrl_(value, verifyDns) {
  const raw = String(value || '').trim();
  if (!raw || raw.length > MAILBOX_CLIENT_CONFIG_.MAX_SOURCE_URL_CHARS ||
      /[\u0000-\u0020\u007f\\]/.test(raw)) {
    throw mailboxError_('INVALID_SOURCE_URL', 'HTTPS-посилання має некоректний формат.');
  }
  let parsed;
  try { parsed = new URL(raw); }
  catch (error) {
    throw mailboxError_('INVALID_SOURCE_URL', 'HTTPS-посилання має некоректний формат.');
  }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password ||
      parsed.port && parsed.port !== '443') {
    throw mailboxError_('INVALID_SOURCE_URL', 'Дозволені лише публічні HTTPS-посилання без облікових даних.');
  }
  const host = String(parsed.hostname || '').toLowerCase().replace(/\.$/, '');
  if (!host || host.length > 253 || host.indexOf('.') === -1 || host.indexOf('..') !== -1 ||
      !/^[a-z0-9.-]+$/.test(host) || /^\d+(?:\.\d+){0,3}$/.test(host) ||
      host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') ||
      host.endsWith('.internal') || host.endsWith('.home') || host.endsWith('.lan') ||
      host.endsWith('.nip.io') || host.endsWith('.sslip.io') || host.endsWith('.xip.io') ||
      host === 'localtest.me' || host.endsWith('.localtest.me') || host === 'lvh.me' || host.endsWith('.lvh.me')) {
    throw mailboxError_('PRIVATE_SOURCE_URL', 'Приватні, локальні та IP-адреси не можна використовувати як джерело.');
  }
  const labels = host.split('.');
  if (labels.some(label => !label || label.length > 63 || label.startsWith('-') || label.endsWith('-')) ||
      !/^(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/.test(labels[labels.length - 1])) {
    throw mailboxError_('INVALID_SOURCE_URL', 'HTTPS-посилання має некоректне доменне ім’я.');
  }
  parsed.hostname = host;
  parsed.hash = '';
  if (verifyDns) mailboxAssertPublicDnsHost_(host);
  return parsed.toString();
}

function mailboxAssertPublicDnsHost_(hostValue) {
  const host = String(hostValue || '').toLowerCase();
  const addresses = [];
  [1, 28].forEach(type => {
    const response = UrlFetchApp.fetch(
      'https://dns.google/resolve?name=' + encodeURIComponent(host) + '&type=' + type,
      {
        method: 'get',
        headers: { Accept: 'application/dns-json' },
        muteHttpExceptions: true,
        followRedirects: false,
      }
    );
    if (Number(response.getResponseCode()) !== 200) {
      throw mailboxError_('SOURCE_DNS_FAILED', 'Не вдалося безпечно перевірити домен HTTPS-джерела.');
    }
    let payload;
    try { payload = JSON.parse(String(response.getContentText() || '')); }
    catch (error) {
      throw mailboxError_('SOURCE_DNS_FAILED', 'DNS повернув некоректну відповідь.');
    }
    (payload.Answer || []).forEach(answer => {
      if (Number(answer && answer.type) === type) addresses.push(String(answer.data || '').trim());
    });
  });
  if (!addresses.length || addresses.some(address => !mailboxIsPublicIpAddress_(address))) {
    throw mailboxError_('PRIVATE_SOURCE_URL', 'Домен HTTPS-джерела веде на приватну або службову IP-адресу.');
  }
}

function mailboxIsPublicIpAddress_(value) {
  const address = String(value || '').toLowerCase();
  if (/^\d+\.\d+\.\d+\.\d+$/.test(address)) {
    const parts = address.split('.');
    if (parts.some(part => !/^(?:0|[1-9]\d{0,2})$/.test(part) || Number(part) > 255)) return false;
    const a = Number(parts[0]);
    const b = Number(parts[1]);
    if (a === 0 || a === 10 || a === 127 || a >= 224 ||
        a === 100 && b >= 64 && b <= 127 ||
        a === 169 && b === 254 ||
        a === 172 && b >= 16 && b <= 31 ||
        a === 192 && (b === 0 || b === 168) ||
        a === 198 && (b === 18 || b === 19) ||
        a === 192 && b === 0 && Number(parts[2]) === 2 ||
        a === 198 && b === 51 && Number(parts[2]) === 100 ||
        a === 203 && b === 0 && Number(parts[2]) === 113) return false;
    return true;
  }
  if (!/^[0-9a-f:]+$/.test(address) || address.indexOf(':') === -1) return false;
  // Only globally routable unicast 2000::/3 is accepted. This excludes ::1,
  // ULA, link-local, multicast, IPv4-mapped and other special-use ranges.
  const first = parseInt(address.split(':')[0] || '0', 16);
  if (!Number.isFinite(first) || first < 0x2000 || first > 0x3fff) return false;
  if (/^2001:0?db8(?::|$)/.test(address)) return false;
  return true;
}

function mailboxResponseHeaders_(response) {
  let source = {};
  try {
    source = response && typeof response.getAllHeaders === 'function'
      ? response.getAllHeaders()
      : response && typeof response.getHeaders === 'function' ? response.getHeaders() : {};
  } catch (error) { source = {}; }
  const result = {};
  Object.keys(source || {}).forEach(key => {
    const value = Array.isArray(source[key]) ? source[key].join(', ') : source[key];
    result[String(key).toLowerCase()] = String(value == null ? '' : value).trim();
  });
  return result;
}

function mailboxPublicResponseTotalSize_(headersValue) {
  const headers = headersValue || {};
  const range = String(headers['content-range'] || '').match(/^bytes\s+\d+-\d+\/(\d+)$/i);
  const fromRange = range ? mailboxStrictNonnegativeInteger_(range[1]) : null;
  if (fromRange !== null) return fromRange;
  const length = mailboxStrictNonnegativeInteger_(headers['content-length']);
  return length === null ? 0 : length;
}

function mailboxStrictNonnegativeInteger_(value) {
  const text = String(value == null ? '' : value).trim();
  if (!/^(?:0|[1-9]\d{0,15})$/.test(text)) return null;
  const number = Number(text);
  return Number.isSafeInteger(number) && number >= 0 ? number : null;
}

function mailboxSafeExternalMimeType_(value, urlValue, headersValue) {
  let mimeType = String(value || '').split(';')[0].trim().toLowerCase();
  const blocked = /^(?:text\/html|application\/(?:xhtml\+xml|javascript|x-javascript)|image\/svg\+xml)$/;
  if (blocked.test(mimeType)) {
    throw mailboxError_(
      'SOURCE_NOT_DOWNLOADABLE',
      'Посилання веде на вебсторінку або активний документ, а не на прямий файл. Скопіюйте пряме публічне посилання на завантаження.'
    );
  }
  if (!/^[a-z0-9][a-z0-9!#$&^_.+-]{0,63}\/[a-z0-9][a-z0-9!#$&^_.+-]{0,63}$/.test(mimeType) ||
      mimeType === 'application/octet-stream') {
    mimeType = mailboxInferExternalMimeType_(urlValue, headersValue);
  }
  if (!mimeType) return '';
  return mimeType;
}

function mailboxInferExternalMimeType_(urlValue, headersValue) {
  const name = mailboxPublicAttachmentName_(headersValue || {}, urlValue, '');
  const extension = String(name || '').toLowerCase().match(/\.([a-z0-9]{1,10})$/);
  if (!extension) return '';
  return {
    pdf: 'application/pdf', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
    gif: 'image/gif', webp: 'image/webp', txt: 'text/plain', csv: 'text/csv',
    md: 'text/markdown', zip: 'application/zip', doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    mp3: 'audio/mpeg', mp4: 'video/mp4', webm: 'video/webm', eml: 'message/rfc822',
  }[extension[1]] || '';
}

function mailboxPublicAttachmentName_(headersValue, urlValue, mimeTypeValue) {
  const headers = headersValue || {};
  const disposition = String(headers['content-disposition'] || '');
  let name = '';
  const utf8 = disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
  if (utf8) {
    try { name = decodeURIComponent(utf8[1].trim().replace(/^"|"$/g, '')); } catch (error) { name = ''; }
  }
  if (!name) {
    const plain = disposition.match(/filename\s*=\s*(?:"([^"]+)"|([^;\s]+))/i);
    name = plain ? plain[1] || plain[2] || '' : '';
  }
  if (!name) {
    try {
      const pathname = new URL(String(urlValue || '')).pathname;
      const segment = pathname.split('/').filter(Boolean).pop() || '';
      name = decodeURIComponent(segment);
    } catch (error) { name = ''; }
  }
  if (!name) {
    const extension = String(mimeTypeValue || '') === 'application/pdf' ? '.pdf' : '';
    name = 'external-file' + extension;
  }
  return mailboxNormalizeAttachmentName_(name, 0);
}

function mailboxContentMagicMatches_(mimeTypeValue, bytesValue) {
  const mimeType = String(mimeTypeValue || '').toLowerCase();
  const bytes = Array.from(bytesValue || [], value => Number(value) & 255);
  if (mailboxIsAllowedInlineImageMimeType_(mimeType)) {
    return mailboxInlineImageMagicMatches_(mimeType, bytes);
  }
  if (mimeType === 'application/pdf') {
    return bytes.length >= 5 && String.fromCharCode.apply(null, bytes.slice(0, 5)) === '%PDF-';
  }
  if (mimeType === 'application/zip' || /openxmlformats/.test(mimeType)) {
    return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b &&
      [[0x03, 0x04], [0x05, 0x06], [0x07, 0x08]].some(pair => bytes[2] === pair[0] && bytes[3] === pair[1]);
  }
  if (/^text\//.test(mimeType)) return bytes.indexOf(0) === -1;
  return true;
}

function mailboxFindDownloadableAttachmentPartById_(rootPart, partId) {
  const part = mailboxFindPartById_(rootPart, partId);
  if (!part) return null;
  const body = part.body || {};
  const headers = headersObject_(part.headers || []);
  const disposition = String(headers['content-disposition'] || '');
  const contentId = String(headers['content-id'] || '').replace(/[<>]/g, '').trim();
  const isAttachment = Boolean(String(part.filename || '').trim()) ||
    /\b(?:attachment|inline)\b/i.test(disposition) || Boolean(contentId);
  return isAttachment && (String(body.data || '') || mailboxSafeAttachmentId_(body.attachmentId))
    ? part
    : null;
}

function mailboxDecodeIncomingAttachment_(value) {
  const encoded = String(value || '');
  const maxEncoded = Math.ceil(
    MAILBOX_CLIENT_CONFIG_.MAX_INCOMING_ATTACHMENT_BYTES * 4 / 3
  ) + 8;
  if (!encoded || encoded.length > maxEncoded ||
      !/^[A-Za-z0-9_-]+={0,2}$/.test(encoded) ||
      encoded.replace(/=+$/g, '').length % 4 === 1) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Gmail повернув вкладення у некоректному форматі.');
  }
  let bytes = [];
  try {
    bytes = Utilities.base64DecodeWebSafe(encoded);
  } catch (error) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Gmail повернув вкладення у некоректному форматі.');
  }
  if (bytes.length > MAILBOX_CLIENT_CONFIG_.MAX_INCOMING_ATTACHMENT_BYTES) {
    throw mailboxError_(
      'ATTACHMENT_TOO_LARGE',
      'Вкладення завелике для безпечного відкриття в Telegram. Відкрийте його у Gmail.'
    );
  }
  return {
    bytes,
    dataBase64Url: encoded.replace(/=+$/g, ''),
  };
}

function mailboxUnsubscribeDto_(info) {
  const value = info || {};
  const mode = mailboxEnum_(value.mode, ['one_click', 'web', 'mailto', 'none'], 'none');
  const available = Boolean(value.available && mode !== 'none');
  return {
    available,
    mode: available ? mode : 'none',
    openUrl: available && mode !== 'one_click' ? mailboxSafeOpenUrl_(value.openUrl) : '',
  };
}

function mailboxSnoozeCapabilities_() {
  if (typeof botManagedSnoozeCapabilities_ !== 'function') {
    return {
      supported: false,
      mode: 'bot_managed',
      nativeGmail: false,
      requestField: 'snoozeUntil',
      requestFormat: 'unix_ms_integer',
      labelName: MAILBOX_BOT_SNOOZE_LABEL_NAME_,
    };
  }
  const value = botManagedSnoozeCapabilities_() || {};
  return {
    supported: value.supported === true,
    mode: 'bot_managed',
    nativeGmail: false,
    requestField: 'snoozeUntil',
    requestFormat: 'unix_ms_integer',
    minDelayMs: mailboxSafeCount_(value.minDelayMs),
    maxDelayMs: mailboxSafeCount_(value.maxDelayMs),
    labelName: MAILBOX_BOT_SNOOZE_LABEL_NAME_,
    repair: {
      requiredCount: mailboxSafeCount_(value.repair && value.repair.requiredCount),
      folder: 'snoozed',
      action: 'inbox',
      description: mailboxSafeText_(value.repair && value.repair.description, 200),
    },
  };
}

function mailboxSnoozeErrorFromBackend_(error) {
  if (error && error.botSnoozeRecoveryPending === true) {
    return mailboxError_(
      'SNOOZE_PENDING',
      'Відповідь Gmail невизначена. Запит збережено; сервер перевірить стан без сліпого повтору.'
    );
  }
  const code = String(error && error.botSnoozeCode || 'SNOOZE_FAILED');
  if (code === 'INVALID_SNOOZE' || code === 'INVALID_SNOOZE_TIME') {
    return mailboxError_(code, mailboxSafeText_(error && error.message, 500));
  }
  if (code === 'SNOOZE_BUSY' || code === 'SNOOZE_CAPACITY') {
    return mailboxError_(
      'SNOOZE_BUSY',
      'Відкладення тимчасово зайняте або заповнене. Gmail не змінено; спробуйте трохи пізніше.'
    );
  }
  return mailboxError_(
    'SNOOZE_FAILED',
    'Не вдалося підготувати відкладення. Gmail не змінено.'
  );
}

function mailboxPrepareSnoozeAction_(threadId, snoozeUntil) {
  if (typeof prepareBotManagedSnooze_ !== 'function') {
    throw mailboxError_(
      'SNOOZE_UNAVAILABLE',
      'Кероване ботом відкладення ще не доступне в цій версії сервера.'
    );
  }
  try {
    const preparation = prepareBotManagedSnooze_({ threadId, snoozeUntil }) || {};
    if (!preparation.propertyKey || !preparation.operationToken || !preparation.labelId) {
      throw mailboxError_('SNOOZE_FAILED', 'Сервер не зберіг повний журнал відкладення.');
    }
    return preparation;
  } catch (error) {
    if (error && error.mailboxCode) throw error;
    throw mailboxSnoozeErrorFromBackend_(error);
  }
}

function mailboxPrepareSnoozeCancellation_(threadId, action) {
  if (typeof prepareBotManagedSnoozeCancellation_ !== 'function') {
    return { required: false, labelId: '' };
  }
  try {
    return prepareBotManagedSnoozeCancellation_(threadId, action) ||
      { required: false, labelId: '' };
  } catch (error) {
    throw mailboxSnoozeErrorFromBackend_(error);
  }
}

/**
 * A user may delete the visible bot-managed Snooze label in Gmail. Persisted
 * schedules then retain its old ID, but passing that stale ID to threads.modify
 * makes Gmail reject the otherwise valid Inbox/Spam repair. Read the current
 * thread before mutation and remove only a marker that still exists on it.
 */
function mailboxLiveSnoozeMarkerId_(threadIdValue, labelIdValue) {
  const threadId = mailboxRequireGmailId_(threadIdValue, 'threadId');
  const labelId = mailboxSafeLabelId_(labelIdValue, false);
  if (!labelId) return '';
  const thread = gmailApiRequest_(
    '/threads/' + encodeURIComponent(threadId) + '?format=minimal',
    { method: 'get' }
  );
  const labels = mailboxCollectLabelIds_(thread && thread.messages || []);
  return labels.indexOf(labelId) !== -1 ? labelId : '';
}

function mailboxRollbackSnoozePreparation_(action, preparation) {
  if (!preparation) return true;
  try {
    if (action === 'snooze' && typeof rollbackBotManagedSnooze_ === 'function') {
      const result = rollbackBotManagedSnooze_(preparation);
      return result === true || Boolean(result && result.safe);
    } else if (['inbox', 'trash', 'spam'].includes(action) && preparation.required &&
               typeof rollbackBotManagedSnoozeCancellation_ === 'function') {
      const result = rollbackBotManagedSnoozeCancellation_(preparation);
      return result === true || Boolean(result && result.safe);
    }
    return !preparation.required;
  } catch (error) {
    console.error('Could not roll back bot-managed snooze preparation: ' +
      mailboxSafeText_(error && error.message, 300));
    return false;
  }
}

function mailboxMarkSnoozePreparationUncertain_(action, preparation, error) {
  if (!preparation) return;
  try {
    if (action === 'snooze' && typeof markBotManagedSnoozeUncertain_ === 'function') {
      markBotManagedSnoozeUncertain_(preparation, error);
    } else if (['inbox', 'trash', 'spam'].includes(action) && preparation.required &&
               typeof markBotManagedSnoozeCancellationUncertain_ === 'function') {
      markBotManagedSnoozeCancellationUncertain_(preparation, error);
    }
  } catch (saveError) {
    console.error('Could not preserve uncertain bot-managed snooze state: ' +
      mailboxSafeText_(saveError && saveError.message, 300));
  }
}

function mailboxFinalizeSnoozePreparation_(action, preparation) {
  if (!preparation) return null;
  try {
    if (action === 'snooze') {
      if (typeof activateBotManagedSnooze_ !== 'function') return { status: 'recovering' };
      activateBotManagedSnooze_(preparation);
      return {
        status: 'scheduled',
        mode: 'bot_managed',
        nativeGmail: false,
        snoozeUntil: Number(preparation.snoozeUntil),
        snoozeUntilIso: new Date(Number(preparation.snoozeUntil)).toISOString(),
        labelName: MAILBOX_BOT_SNOOZE_LABEL_NAME_,
      };
    }
    if (['inbox', 'trash', 'spam'].includes(action) && preparation.required) {
      if (typeof completeBotManagedSnoozeCancellation_ !== 'function') {
        return { status: 'recovering', mode: 'bot_managed', cancelled: true };
      }
      if (action === 'trash' && typeof cleanupBotManagedSnoozeAfterDisposition_ === 'function') {
        cleanupBotManagedSnoozeAfterDisposition_(preparation);
      } else {
        completeBotManagedSnoozeCancellation_(preparation);
      }
      return { status: 'cancelled', mode: 'bot_managed', cancelled: true };
    }
  } catch (error) {
    // Gmail has already confirmed success. The durable reserved/cancel_pending
    // record lets checkNewMail_ finish this bookkeeping later.
    console.error('Bot-managed snooze finalization deferred to timer: ' +
      mailboxSafeText_(error && error.message, 300));
    return {
      status: 'recovering',
      mode: 'bot_managed',
      nativeGmail: false,
      snoozeUntil: action === 'snooze' ? Number(preparation.snoozeUntil) : undefined,
      cancelled: ['inbox', 'trash', 'spam'].includes(action) ? true : undefined,
      labelName: MAILBOX_BOT_SNOOZE_LABEL_NAME_,
    };
  }
  return null;
}

function mailboxApplyAction_(payload) {
  mailboxAssertAllowedKeys_(payload, [
    'threadId', 'messageId', 'action', 'folder', 'labelId', 'query', 'filter', 'snoozeUntil',
    'undoToken',
  ]);
  const threadId = mailboxRequireGmailId_(payload.threadId, 'threadId');
  const action = String(payload.action || '');
  const viewContext = mailboxActionViewContext_(payload);

  if (action === 'restoreState') {
    if (!payload.undoToken || Object.prototype.hasOwnProperty.call(payload, 'snoozeUntil')) {
      throw mailboxError_('INVALID_ACTION', 'Для точного скасування потрібен undoToken.');
    }
    return mailboxRestoreUndoState_(threadId, payload.undoToken);
  }
  if (Object.prototype.hasOwnProperty.call(payload, 'undoToken')) {
    throw mailboxError_('INVALID_ACTION', 'undoToken дозволено лише для точного скасування.');
  }

  if (action !== 'snooze' && Object.prototype.hasOwnProperty.call(payload, 'snoozeUntil')) {
    throw mailboxError_('INVALID_ACTION', 'snoozeUntil дозволено лише для дії snooze.');
  }

  if (action === 'unsubscribe') {
    return Object.assign(mailboxUnsubscribe_(threadId, payload.messageId), {
      removeFromView: false,
    });
  }

  let snoozePreparation = null;
  if (action === 'snooze') {
    if (!Object.prototype.hasOwnProperty.call(payload, 'snoozeUntil')) {
      throw mailboxError_('INVALID_SNOOZE_TIME', 'Для відкладення потрібен точний snoozeUntil.');
    }
    snoozePreparation = mailboxPrepareSnoozeAction_(threadId, payload.snoozeUntil);
  } else if (['inbox', 'trash', 'spam'].includes(action)) {
    snoozePreparation = mailboxPrepareSnoozeCancellation_(threadId, action);
    if (snoozePreparation && snoozePreparation.required && snoozePreparation.labelId) {
      try {
        snoozePreparation.labelId = mailboxLiveSnoozeMarkerId_(
          threadId,
          snoozePreparation.labelId
        );
      } catch (readError) {
        const rollbackSafe = mailboxRollbackSnoozePreparation_(action, snoozePreparation);
        if (!rollbackSafe) {
          throw mailboxError_(
            'SNOOZE_PENDING',
            'Стан відкладення потребує серверної перевірки; Gmail не змінено.'
          );
        }
        throw readError;
      }
    }
  }

  // Reserve Telegram retry capacity before Gmail changes whenever a matching
  // Telegram card exists. If storage is saturated, fail here while Gmail is
  // still untouched instead of creating an unsynchronizable mailbox state.
  let telegramPreparation;
  try {
    telegramPreparation = mailboxPrepareTelegramMoveAction_(
      action,
      threadId,
      mailboxSafeGmailId_(payload.messageId)
    );
  } catch (error) {
    const rollbackSafe = mailboxRollbackSnoozePreparation_(action, snoozePreparation);
    if (!rollbackSafe && snoozePreparation) {
      throw mailboxError_(
        'SNOOZE_PENDING',
        'Стан відкладення потребує серверної перевірки; Gmail-дію не можна вважати завершеною.'
      );
    }
    throw error;
  }
  let undoSnapshot = null;
  // Cancelling an already active bot snooze also changes a durable schedule.
  // Omit Undo rather than return a label-only inverse that would be false.
  const cancelsExistingSnooze = ['inbox', 'trash', 'spam'].includes(action) &&
    snoozePreparation && snoozePreparation.required;
  if (!cancelsExistingSnooze) {
    try {
      undoSnapshot = mailboxCaptureUndoState_(
        threadId,
        action,
        mailboxActionAffectedLabels_(action, snoozePreparation)
      );
    } catch (readError) {
      // Snapshot enrichment is optional. The Gmail action remains available,
      // but no unsafe approximate Undo is exposed.
      undoSnapshot = null;
    }
  }
  let undoAction = '';
  try {
    if (action === 'snooze') {
      gmailApiRequest_(
        '/threads/' + encodeURIComponent(threadId) + '/modify',
        {
          method: 'post',
          body: {
            addLabelIds: [String(snoozePreparation.labelId)],
            removeLabelIds: ['INBOX'],
          },
        }
      );
      undoAction = 'inbox';
    } else if (action === 'trash' || action === 'untrash') {
      const suffix = action === 'trash' ? '/trash' : '/untrash';
      gmailApiRequest_('/threads/' + encodeURIComponent(threadId) + suffix, { method: 'post' });
      undoAction = action === 'trash' ? 'untrash' : 'trash';
    } else {
      const definition = MAILBOX_THREAD_ACTIONS_[action];
      if (!definition) {
        throw mailboxError_('INVALID_ACTION', 'Ця дія з листом не підтримується.');
      }
      const removeLabelIds = definition.remove.slice();
      if (['inbox', 'spam'].includes(action) && snoozePreparation &&
          snoozePreparation.labelId &&
          removeLabelIds.indexOf(String(snoozePreparation.labelId)) === -1) {
        removeLabelIds.push(String(snoozePreparation.labelId));
      }
      gmailApiRequest_(
        '/threads/' + encodeURIComponent(threadId) + '/modify',
        {
          method: 'post',
          body: {
            addLabelIds: definition.add.slice(),
            removeLabelIds,
          },
        }
      );
      undoAction = definition.undo;
    }
  } catch (gmailError) {
    if (mailboxGmailMutationOutcomeUncertain_(gmailError)) {
      mailboxMarkTelegramMovePreparationUncertain_(telegramPreparation, gmailError);
      mailboxMarkSnoozePreparationUncertain_(action, snoozePreparation, gmailError);
      if (action === 'snooze' ||
          ['inbox', 'trash', 'spam'].includes(action) &&
          snoozePreparation && snoozePreparation.required) {
        throw mailboxError_(
          'SNOOZE_PENDING',
          'Відповідь Gmail невизначена. Запит збережено; сервер перевірить фактичний стан.'
        );
      }
    } else {
      mailboxCancelTelegramMovePreparation_(telegramPreparation);
      const rollbackSafe = mailboxRollbackSnoozePreparation_(action, snoozePreparation);
      if (!rollbackSafe && snoozePreparation) {
        throw mailboxError_(
          'SNOOZE_PENDING',
          'Gmail відхилив дію, але cleanup-журнал не підтверджено. Сервер не повідомляє хибний успіх.'
        );
      }
    }
    throw gmailError;
  }

  const snooze = mailboxFinalizeSnoozePreparation_(action, snoozePreparation);

  // Gmail is authoritative: reconcile the already-delivered Telegram card
  // only after Gmail confirms the mutation. Telegram failures are contained
  // here and must never turn a successful mailbox action into an RPC error.
  let telegramSync = mailboxReconcileTelegramMoveAction_(
    action,
    threadId,
    mailboxSafeGmailId_(payload.messageId),
    telegramPreparation
  );
  if (telegramSync && telegramSync.status === 'not_applicable') {
    telegramSync = mailboxSynchronizeTelegramState_(
      threadId,
      mailboxSafeGmailId_(payload.messageId)
    );
  }

  const result = {
    action,
    threadId,
    undoAction,
    undo: undoSnapshot ? {
      op: 'action',
      threadId,
      action: 'restoreState',
      undoToken: mailboxIssueUndoToken_(undoSnapshot),
    } : null,
    removeFromView: mailboxActionRemovesFromView_(action, viewContext),
    telegramSync,
  };
  const thread = mailboxPostCommitThreadSummary_(threadId);
  if (thread) result.thread = thread;
  if (snooze) result.snooze = snooze;
  return result;
}

function mailboxActionAffectedLabels_(actionValue, snoozePreparation) {
  const action = String(actionValue || '');
  const map = {
    archive: ['INBOX'], inbox: ['INBOX'],
    trash: ['TRASH', 'INBOX'], untrash: ['TRASH', 'INBOX'],
    spam: ['SPAM', 'INBOX'], notSpam: ['SPAM', 'INBOX'],
    read: ['UNREAD'], unread: ['UNREAD'],
    star: ['STARRED'], unstar: ['STARRED'],
    important: ['IMPORTANT'], notImportant: ['IMPORTANT'],
    snooze: ['INBOX'],
  };
  const labels = (map[action] || []).slice();
  const snoozeLabelId = mailboxSafeLabelId_(snoozePreparation && snoozePreparation.labelId, false);
  if (snoozeLabelId && labels.indexOf(snoozeLabelId) === -1) labels.push(snoozeLabelId);
  return labels;
}

function mailboxCaptureUndoState_(threadIdValue, actionValue, affectedLabelIdsValue) {
  const threadId = mailboxRequireGmailId_(threadIdValue, 'threadId');
  const affectedLabelIds = (affectedLabelIdsValue || []).map(label =>
    mailboxSafeLabelId_(label, false)
  ).filter(Boolean);
  if (!affectedLabelIds.length || affectedLabelIds.length > 12) return null;
  const thread = gmailApiRequest_(
    '/threads/' + encodeURIComponent(threadId) + '?format=minimal',
    { method: 'get' }
  );
  const messages = (thread && thread.messages || []);
  if (!messages.length || messages.length > MAILBOX_CLIENT_CONFIG_.MAX_THREAD_MESSAGES) {
    // Never offer an approximate Undo for a thread too large to snapshot.
    return null;
  }
  const affected = new Set(affectedLabelIds);
  const items = messages.map(message => {
    const messageId = mailboxRequireGmailId_(message && message.id, 'messageId');
    const labels = mailboxSanitizeLabelIds_(message && message.labelIds || [])
      .filter(label => affected.has(label));
    return [messageId, labels];
  });
  return {
    v: 1,
    sub: mailboxOwnerId_(),
    threadId,
    action: String(actionValue || '').slice(0, 32),
    affectedLabelIds,
    items,
    exp: Math.floor(Date.now() / 1000) + MAILBOX_CLIENT_CONFIG_.UNDO_TOKEN_SECONDS,
  };
}

function mailboxIssueUndoToken_(snapshotValue) {
  const snapshot = snapshotValue || {};
  const encoded = Utilities.base64EncodeWebSafe(
    Utilities.newBlob(JSON.stringify(snapshot), 'application/json').getBytes()
  ).replace(/=+$/g, '');
  const signature = Utilities.base64EncodeWebSafe(
    Utilities.computeHmacSha256Signature(encoded, mailboxRefreshSigningSecret_())
  ).replace(/=+$/g, '');
  const token = 'mbu1.' + encoded + '.' + signature;
  if (token.length > MAILBOX_CLIENT_CONFIG_.MAX_UNDO_TOKEN_CHARS) {
    throw mailboxError_('UNDO_UNAVAILABLE', 'Ланцюжок завеликий для точного скасування.');
  }
  return token;
}

function mailboxVerifyUndoToken_(tokenValue, threadIdValue) {
  const token = String(tokenValue || '');
  if (!token || token.length > MAILBOX_CLIENT_CONFIG_.MAX_UNDO_TOKEN_CHARS) {
    throw mailboxError_('INVALID_UNDO', 'Токен скасування недійсний.');
  }
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'mbu1' ||
      !/^[A-Za-z0-9_-]+$/.test(parts[1]) || !/^[A-Za-z0-9_-]+$/.test(parts[2])) {
    throw mailboxError_('INVALID_UNDO', 'Токен скасування недійсний.');
  }
  const expected = Utilities.base64EncodeWebSafe(
    Utilities.computeHmacSha256Signature(parts[1], mailboxRefreshSigningSecret_())
  ).replace(/=+$/g, '');
  if (!constantTimeEqual_(expected, parts[2])) {
    throw mailboxError_('INVALID_UNDO', 'Токен скасування недійсний.');
  }
  let snapshot;
  try {
    const bytes = mailboxDecodeCanonicalBase64UrlBytes_(parts[1]);
    snapshot = JSON.parse(Utilities.newBlob(bytes, 'application/json').getDataAsString());
  } catch (error) {
    throw mailboxError_('INVALID_UNDO', 'Токен скасування недійсний.');
  }
  const threadId = mailboxRequireGmailId_(threadIdValue, 'threadId');
  if (!mailboxIsPlainObject_(snapshot) || snapshot.v !== 1 ||
      !constantTimeEqual_(String(snapshot.sub || ''), mailboxOwnerId_()) ||
      String(snapshot.threadId || '') !== threadId ||
      !Number.isSafeInteger(Number(snapshot.exp)) || Number(snapshot.exp) < Math.floor(Date.now() / 1000)) {
    throw mailboxError_('INVALID_UNDO', 'Токен скасування прострочений або належить іншому листу.');
  }
  const affected = Array.isArray(snapshot.affectedLabelIds)
    ? snapshot.affectedLabelIds.map(label => mailboxSafeLabelId_(label, false)).filter(Boolean)
    : [];
  if (!affected.length || affected.length > 12 || affected.length !== snapshot.affectedLabelIds.length ||
      !Array.isArray(snapshot.items) || !snapshot.items.length ||
      snapshot.items.length > MAILBOX_CLIENT_CONFIG_.MAX_THREAD_MESSAGES) {
    throw mailboxError_('INVALID_UNDO', 'Токен скасування містить некоректний стан.');
  }
  const allowed = new Set(affected);
  const seen = new Set();
  const items = snapshot.items.map(item => {
    if (!Array.isArray(item) || item.length !== 2 || !Array.isArray(item[1])) {
      throw mailboxError_('INVALID_UNDO', 'Токен скасування містить некоректний стан.');
    }
    const messageId = mailboxRequireGmailId_(item[0], 'messageId');
    if (seen.has(messageId)) throw mailboxError_('INVALID_UNDO', 'Токен скасування містить дублікати.');
    seen.add(messageId);
    const labels = item[1].map(label => mailboxSafeLabelId_(label, false)).filter(Boolean);
    if (labels.length !== item[1].length || labels.some(label => !allowed.has(label))) {
      throw mailboxError_('INVALID_UNDO', 'Токен скасування містить некоректні мітки.');
    }
    return { messageId, labels: new Set(labels) };
  });
  return {
    threadId,
    action: String(snapshot.action || ''),
    affectedLabelIds: affected,
    items,
  };
}

function mailboxRestoreUndoState_(threadIdValue, tokenValue) {
  const snapshot = mailboxVerifyUndoToken_(tokenValue, threadIdValue);
  const thread = gmailApiRequest_(
    '/threads/' + encodeURIComponent(snapshot.threadId) + '?format=minimal',
    { method: 'get' }
  );
  const currentById = new Map((thread && thread.messages || []).map(message => [
    mailboxSafeGmailId_(message && message.id),
    new Set(mailboxSanitizeLabelIds_(message && message.labelIds || [])),
  ]));
  let snoozeCancellation = null;
  if (snapshot.action === 'snooze') {
    snoozeCancellation = mailboxPrepareSnoozeCancellation_(snapshot.threadId, 'inbox');
  }
  try {
    snapshot.items.forEach(item => {
      const current = currentById.get(item.messageId);
      if (!current) return;
      const wantsTrash = item.labels.has('TRASH');
      const hasTrash = current.has('TRASH');
      if (wantsTrash !== hasTrash) {
        gmailApiRequest_(
          '/messages/' + encodeURIComponent(item.messageId) + (wantsTrash ? '/trash' : '/untrash'),
          { method: 'post' }
        );
        if (wantsTrash) current.add('TRASH');
        else current.delete('TRASH');
      }
      const addLabelIds = [];
      const removeLabelIds = [];
      snapshot.affectedLabelIds.filter(label => label !== 'TRASH').forEach(label => {
        const wanted = item.labels.has(label);
        const present = current.has(label);
        if (wanted && !present) addLabelIds.push(label);
        if (!wanted && present) removeLabelIds.push(label);
      });
      if (addLabelIds.length || removeLabelIds.length) {
        gmailApiRequest_(
          '/messages/' + encodeURIComponent(item.messageId) + '/modify',
          { method: 'post', body: { addLabelIds, removeLabelIds } }
        );
      }
    });
  } catch (error) {
    if (snoozeCancellation) mailboxRollbackSnoozePreparation_('inbox', snoozeCancellation);
    throw error;
  }
  if (snoozeCancellation) mailboxFinalizeSnoozePreparation_('inbox', snoozeCancellation);
  const result = {
    action: 'restoreState',
    threadId: snapshot.threadId,
    undoAction: '',
    undo: null,
    removeFromView: false,
    telegramSync: mailboxSynchronizeTelegramState_(snapshot.threadId, ''),
  };
  const summary = mailboxPostCommitThreadSummary_(snapshot.threadId);
  if (summary) result.thread = summary;
  return result;
}

function mailboxPrepareTelegramMoveAction_(actionValue, threadIdValue, messageIdValue) {
  const action = String(actionValue || '');
  if (!['archive', 'trash', 'spam', 'inbox', 'untrash', 'notSpam'].includes(action)) {
    return { mode: 'not_applicable' };
  }
  if (typeof prepareTelegramMailCardAction_ !== 'function') return { mode: 'legacy' };
  try {
    const result = prepareTelegramMailCardAction_({
      action,
      gmailThreadId: mailboxSafeGmailId_(threadIdValue),
      gmailMessageId: mailboxSafeGmailId_(messageIdValue),
      userId: mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.userId,
      chatId: mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.userId,
      connectionId: mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.connectionId,
    }) || {};
    if (!result.required) return { mode: 'not_registered', reason: String(result.reason || '') };
    return {
      mode: 'reserved',
      reservation: {
        propertyKey: mailboxSafeText_(result.propertyKey, 180),
        action: mailboxSafeText_(result.action, 30),
        gmailThreadId: mailboxSafeGmailId_(result.gmailThreadId),
        gmailMessageId: mailboxSafeGmailId_(result.gmailMessageId),
      },
    };
  } catch (error) {
    console.error('Telegram reconciliation capacity check failed before Gmail action: ' +
      mailboxSafeText_(error && error.message, 300));
    throw mailboxError_(
      'TELEGRAM_SYNC_BUSY',
      'Синхронізація Telegram тимчасово зайнята. Gmail не змінено; спробуйте ще раз трохи пізніше.'
    );
  }
}

function mailboxCancelTelegramMovePreparation_(preparation) {
  if (!preparation || preparation.mode !== 'reserved' ||
      typeof cancelTelegramMailCardAction_ !== 'function') return;
  try { cancelTelegramMailCardAction_(preparation.reservation); }
  catch (error) {
    console.error('Could not cancel unused Telegram reconciliation reservation: ' +
      mailboxSafeText_(error && error.message, 300));
  }
}

function mailboxGmailMutationOutcomeUncertain_(error) {
  if (error && error.gmailOutcomeUncertain === true) return true;
  const status = Number(error && (error.gmailHttpStatus || error.httpStatus) || 0);
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

function mailboxMarkTelegramMovePreparationUncertain_(preparation, error) {
  if (!preparation || preparation.mode !== 'reserved' ||
      typeof markTelegramMailCardActionUncertain_ !== 'function') return;
  try { markTelegramMailCardActionUncertain_(preparation.reservation, error); }
  catch (saveError) {
    console.error('Could not preserve uncertain Gmail outcome for Telegram reconciliation: ' +
      mailboxSafeText_(saveError && saveError.message, 300));
  }
}

/**
 * Best-effort bridge from Mini App thread mutations to Telegram-only card
 * reconciliation. MailClient.gs is also unit-tested and may be deployed
 * without Code.gs, so the hook is intentionally feature-detected.
 */
function mailboxReconcileTelegramMoveAction_(actionValue, threadIdValue, messageIdValue, preparation) {
  const action = String(actionValue || '');
  if (!['archive', 'trash', 'spam', 'inbox', 'untrash', 'notSpam'].includes(action)) {
    return { status: 'not_applicable', queued: 0 };
  }
  if (preparation && preparation.mode === 'not_registered') {
    return { status: 'not_registered', queued: 0 };
  }
  if (preparation && preparation.mode === 'reserved') {
    if (typeof activateTelegramMailCardAction_ !== 'function') {
      return { status: 'failed', queued: 0 };
    }
    try {
      const activated = activateTelegramMailCardAction_(preparation.reservation) || {};
      const rawQueued = Number(activated.queued || 0);
      return {
        status: rawQueued > 0 ? 'requested' : 'not_registered',
        queued: Number.isFinite(rawQueued) ? Math.max(0, Math.min(Math.floor(rawQueued), 100)) : 0,
      };
    } catch (error) {
      console.error('Reserved Telegram mail-card reconciliation failed after Gmail action: ' +
        mailboxSafeText_(error && error.message, 300));
      return { status: 'failed', queued: 0 };
    }
  }
  if (typeof reconcileTelegramMailCardAction_ !== 'function') {
    return { status: 'unavailable', queued: 0 };
  }

  try {
    const result = reconcileTelegramMailCardAction_({
      action,
      gmailThreadId: mailboxSafeGmailId_(threadIdValue),
      gmailMessageId: mailboxSafeGmailId_(messageIdValue),
      userId: mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.userId,
      chatId: mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.userId,
      connectionId: mailboxCurrentSessionContext_ && mailboxCurrentSessionContext_.connectionId,
    }) || {};
    const rawQueued = Number(result.queued || 0);
    const queued = Number.isFinite(rawQueued)
      ? Math.max(0, Math.min(Math.floor(rawQueued), 100))
      : 0;
    return {
      // The hook may complete synchronously or leave a durable retry record;
      // "requested" is the strongest status MailClient can truthfully claim.
      status: queued > 0 ? 'requested' : 'not_registered',
      queued,
    };
  } catch (error) {
    console.error(
      'Telegram mail-card reconciliation failed after Gmail action: ' +
      mailboxSafeText_(error && error.message, 300)
    );
    return { status: 'failed', queued: 0 };
  }
}

function mailboxSynchronizeTelegramState_(threadIdValue, messageIdValue) {
  if (typeof syncTelegramMailCardsForThreadFromGmail_ !== 'function') {
    return { status: 'unavailable', attempted: 0, completed: 0, failed: 0 };
  }
  try {
    const result = syncTelegramMailCardsForThreadFromGmail_(
      mailboxSafeGmailId_(threadIdValue),
      mailboxSafeGmailId_(messageIdValue),
      mailboxCurrentSessionContext_ ? {
        userId: String(mailboxCurrentSessionContext_.userId || ''),
        chatId: String(mailboxCurrentSessionContext_.userId || ''),
        connectionId: String(mailboxCurrentSessionContext_.connectionId || ''),
      } : null
    ) || {};
    const attempted = Math.max(0, Math.min(Number(result.attempted || 0), 20));
    const completed = Math.max(0, Math.min(Number(result.completed || 0), attempted));
    const failed = Math.max(0, Math.min(Number(result.failed || 0), attempted));
    return {
      status: failed ? 'partial' : (attempted ? 'completed' : 'not_registered'),
      attempted,
      completed,
      failed,
    };
  } catch (error) {
    // Gmail is already authoritative. Gmail History plus the sparse recovery
    // sweep remain the retry path; never turn a confirmed mailbox action into
    // an apparent failure because Telegram is temporarily unavailable.
    console.error('Immediate Telegram state synchronization failed after Gmail action: ' +
      mailboxSafeText_(error && error.message, 300));
    return { status: 'failed', attempted: 0, completed: 0, failed: 1 };
  }
}

function mailboxActionViewContext_(payload) {
  const value = payload || {};
  const hasFolderContext = Object.prototype.hasOwnProperty.call(value, 'folder') ||
    Object.prototype.hasOwnProperty.call(value, 'labelId');
  const query = mailboxSafeSearchQuery_(value.query);
  const filter = mailboxResolveListFilter_(value.filter);
  if (!hasFolderContext) return null;
  return {
    folder: mailboxResolveFolder_(value.folder, value.labelId),
    query,
    filter,
  };
}

/**
 * Return true only when the requested mutation is guaranteed to exclude the
 * thread from the active fixed folder/filter. An arbitrary Gmail query may
 * contain OR, braces or negation, so it is validated above but deliberately
 * not guessed here.
 */
function mailboxActionRemovesFromView_(action, context) {
  if (!context || !context.folder || !context.filter) return false;
  const folderKey = String(context.folder.key || '').toLowerCase();
  const filterKey = String(context.filter.key || 'all');

  if (action === 'trash') return folderKey !== 'trash';
  if (action === 'untrash') return folderKey === 'trash';
  if (action === 'spam') return folderKey !== 'spam' && folderKey !== 'trash';
  if (action === 'notSpam') return folderKey === 'spam';
  if (action === 'archive' &&
      (folderKey === 'inbox' || context.folder.group === 'categories')) return true;
  if (action === 'snooze' &&
      (folderKey === 'inbox' || context.folder.group === 'categories')) return true;
  if (action === 'inbox' && folderKey === 'archive') return true;
  if (action === 'unstar' && (folderKey === 'starred' || filterKey === 'starred')) return true;
  if (action === 'notImportant' &&
      (folderKey === 'important' || filterKey === 'important')) return true;
  if (action === 'read' && filterKey === 'unread') return true;
  return false;
}

function mailboxUnsubscribe_(threadId, requestedMessageId) {
  let messageId = requestedMessageId
    ? mailboxRequireGmailId_(requestedMessageId, 'messageId')
    : '';
  if (!messageId) {
    const thread = gmailApiRequest_(
      '/threads/' + encodeURIComponent(threadId) + '?' + mailboxMetadataQuery_([
        'List-Unsubscribe', 'List-Unsubscribe-Post', 'DKIM-Signature',
        'Authentication-Results', 'Subject',
      ]),
      { method: 'get' }
    );
    const messages = (thread.messages || []).slice().sort(mailboxCompareMessages_).reverse();
    const supported = messages.find(message => {
      const headers = (message.payload && message.payload.headers) || [];
      return unsubscribeInfoFromHeaders_(headers).available;
    });
    if (!supported) {
      throw mailboxError_('UNSUBSCRIBE_UNAVAILABLE', 'Відправник не додав безпечний спосіб відписки.');
    }
    messageId = mailboxRequireGmailId_(supported.id, 'messageId');
  }

  const minimal = gmailApiRequest_(
    '/messages/' + encodeURIComponent(messageId) + '?format=minimal',
    { method: 'get' }
  );
  if (String(minimal.threadId || '') !== threadId) {
    throw mailboxError_('INVALID_ACTION', 'Лист для відписки не належить до цього ланцюжка.');
  }
  const metadata = getMailboxActionMetadata_(messageId);
  const info = unsubscribeInfoFromHeaders_(metadata.headers || []);
  if (!info.available) {
    throw mailboxError_('UNSUBSCRIBE_UNAVAILABLE', 'Відправник не додав безпечний спосіб відписки.');
  }
  const result = executeUnsubscribe_(metadata, messageId, mailboxSafeText_(metadata.subject, 300));
  return {
    action: 'unsubscribe',
    threadId,
    messageId,
    mode: info.mode,
    completed: info.mode === 'one_click',
    message: mailboxSafeText_(result && result.message, 800),
    openUrl: mailboxSafeOpenUrl_(result && result.openUrl),
    undoAction: '',
  };
}

/**
 * Draft creation, replacement and sending are not safe to repeat after an
 * Apps Script transport timeout: Gmail may have committed the first request
 * even though the browser never received its response.  Keep a compact,
 * owner-bound operation journal in Script Properties and reconcile by a
 * stable RFC Message-ID before any retry.  The journal never stores message
 * bodies or attachment bytes.
 */
function mailboxRequireClientOperationId_(value) {
  const operationId = String(value || '');
  if (!/^[A-Za-z0-9_-]{16,128}$/.test(operationId)) {
    throw mailboxError_('INVALID_REQUEST', 'Некоректний ідентифікатор поштової операції.');
  }
  return operationId;
}

function mailboxCanonicalOperationValue_(value) {
  if (Array.isArray(value)) return value.map(mailboxCanonicalOperationValue_);
  if (!mailboxIsPlainObject_(value)) return value;
  const output = {};
  Object.keys(value).sort().forEach(key => {
    if (value[key] !== undefined) output[key] = mailboxCanonicalOperationValue_(value[key]);
  });
  return output;
}

function mailboxOperationRequestHash_(payload, excludedKeys) {
  const excluded = new Set((excludedKeys || []).map(String));
  const bounded = {};
  Object.keys(payload || {}).sort().forEach(key => {
    if (!excluded.has(key) && payload[key] !== undefined) bounded[key] = payload[key];
  });
  return mailboxDigestText_(JSON.stringify(mailboxCanonicalOperationValue_(bounded)));
}

function mailboxDraftOperationKey_(ownerId, kind, operationId) {
  return MAILBOX_CLIENT_CONFIG_.DRAFT_OPERATION_PREFIX +
    mailboxDigestText_([ownerId, kind, operationId].join('|'));
}

function mailboxDraftOperationMessageId_(ownerId, kind, operationId, requestHash) {
  return '<tg.' + mailboxDigestText_(
    [ownerId, kind, operationId, requestHash].join('|')
  ) + '@gmail-telegram.invalid>';
}

function mailboxDraftOperationScopeId_() {
  const session = mailboxCurrentSessionContext_;
  const userId = String(session && session.userId || '');
  const connectionId = String(session && session.connectionId || '');
  if (/^\d{1,24}$/.test(userId) && /^gmail-[A-Za-z0-9_-]{1,80}$/.test(connectionId)) {
    return 'telegram:' + userId + '|gmail:' + connectionId;
  }
  return 'telegram:' + mailboxOwnerId_() + '|gmail:gmail-owner';
}

function mailboxDraftOperationStates_() {
  return ['reserved', 'dispatching', 'uncertain', 'committed', 'failed'];
}

function mailboxDraftOperationIsTerminal_(operation) {
  return operation && (operation.state === 'committed' || operation.state === 'failed');
}

function mailboxDraftOperationPersistable_(operation) {
  return {
    v: 1,
    ownerId: String(operation.ownerId || ''),
    operationId: String(operation.operationId || ''),
    kind: String(operation.kind || ''),
    requestHash: String(operation.requestHash || ''),
    messageIdHeader: String(operation.messageIdHeader || ''),
    draftId: String(operation.draftId || ''),
    state: String(operation.state || ''),
    result: operation.result && mailboxIsPlainObject_(operation.result)
      ? mailboxCanonicalOperationValue_(operation.result)
      : null,
    createdAt: Number(operation.createdAt || 0),
    updatedAt: Number(operation.updatedAt || 0),
    errorCode: mailboxSafeText_(operation.errorCode, 64),
    // The active record reserves enough already-counted quota for the larger
    // committed result.  Terminal transitions remove this padding.
    reserve: mailboxDraftOperationIsTerminal_(operation) ? '' : String(operation.reserve || ''),
  };
}

function mailboxAttachDraftOperationKey_(key, operation) {
  return Object.assign({ _key: String(key || '') }, operation || {});
}

function mailboxValidateDraftOperation_(key, value, ownerIdValue) {
  const operation = value || {};
  const ownerId = String(ownerIdValue || '');
  const validKind = ['draft_create', 'draft_update', 'draft_send'].indexOf(operation.kind) !== -1;
  const expectedKey = validKind && /^[A-Za-z0-9_-]{16,128}$/.test(String(operation.operationId || ''))
    ? mailboxDraftOperationKey_(ownerId, operation.kind, operation.operationId)
    : '';
  const valid = operation.v === 1 && String(operation.ownerId || '') === ownerId &&
    String(key || '') === expectedKey && validKind &&
    /^[A-Za-z0-9_-]{43}$/.test(String(operation.requestHash || '')) &&
    mailboxDraftOperationStates_().indexOf(String(operation.state || '')) !== -1 &&
    (!operation.messageIdHeader || Boolean(mailboxSafeMessageIdHeader_(operation.messageIdHeader))) &&
    (!operation.draftId || Boolean(mailboxSafeGmailId_(operation.draftId))) &&
    Number.isFinite(Number(operation.createdAt)) && Number(operation.createdAt) > 0 &&
    Number.isFinite(Number(operation.updatedAt)) && Number(operation.updatedAt) > 0 &&
    (operation.result === null || mailboxIsPlainObject_(operation.result));
  if (!valid) {
    throw mailboxError_('SERVER_CONFIG', 'Журнал поштових операцій пошкоджений.');
  }
  return mailboxAttachDraftOperationKey_(key, mailboxDraftOperationPersistable_(operation));
}

function mailboxReadDraftOperations_(properties, ownerIdValue) {
  const ownerId = String(ownerIdValue || '');
  const all = properties.getProperties() || {};
  return Object.keys(all)
    .filter(key => key.indexOf(MAILBOX_CLIENT_CONFIG_.DRAFT_OPERATION_PREFIX) === 0)
    .sort()
    .map(key => {
      let parsed = null;
      try { parsed = JSON.parse(String(all[key] || '')); } catch (error) { parsed = null; }
      if (!mailboxIsPlainObject_(parsed) || String(parsed.ownerId || '') !== ownerId) return null;
      return mailboxValidateDraftOperation_(key, parsed, ownerId);
    })
    .filter(Boolean);
}

function mailboxDraftOperationIndexJson_(operations) {
  return JSON.stringify({
    v: 1,
    keys: (operations || []).map(operation => String(operation._key || '')).sort(),
  });
}

function mailboxAssertDraftOperationStorage_(properties, replacements, deletedKeys) {
  try {
    Object.keys(replacements || {}).forEach(key =>
      assertTelegramPropertyValueFits_(key, String(replacements[key]))
    );
    assertTelegramPropertyStoreFits_(properties, replacements || {}, deletedKeys || []);
  } catch (error) {
    throw mailboxError_('STORAGE_FULL', 'Сховище безпечних поштових операцій тимчасово заповнене.');
  }
}

function mailboxPersistDraftOperationLocked_(properties, operationsValue, operationValue, deletedKeysValue) {
  const operation = operationValue;
  const deletedKeys = Array.from(new Set((deletedKeysValue || []).map(String)));
  const operations = (operationsValue || [])
    .filter(item => deletedKeys.indexOf(String(item._key || '')) === -1 &&
      String(item._key || '') !== String(operation._key || ''))
    .concat([operation]);
  const recordJson = JSON.stringify(mailboxDraftOperationPersistable_(operation));
  const indexJson = mailboxDraftOperationIndexJson_(operations);
  const replacements = {
    [operation._key]: recordJson,
    [MAILBOX_CLIENT_CONFIG_.DRAFT_OPERATION_INDEX_PROPERTY]: indexJson,
  };
  mailboxAssertDraftOperationStorage_(properties, replacements, deletedKeys);

  deletedKeys.forEach(key => {
    try { properties.deleteProperty(key); } catch (error) {}
  });
  const undeleted = deletedKeys.find(key => properties.getProperty(key) !== null);
  if (undeleted) {
    throw mailboxError_('STORAGE_FULL', 'Не вдалося звільнити журнал поштових операцій.');
  }

  try { properties.setProperty(operation._key, recordJson); } catch (error) {}
  if (String(properties.getProperty(operation._key) || '') !== recordJson) {
    throw mailboxError_('STORAGE_FULL', 'Не вдалося надійно зберегти поштову операцію.');
  }
  // The per-operation property is authoritative.  If an index write is
  // interrupted, the next read rebuilds it from the bounded key prefix.
  try { properties.setProperty(MAILBOX_CLIENT_CONFIG_.DRAFT_OPERATION_INDEX_PROPERTY, indexJson); }
  catch (error) {
    console.error('Draft operation index will be rebuilt from operation records.');
  }
  return mailboxAttachDraftOperationKey_(
    operation._key,
    mailboxDraftOperationPersistable_(operation)
  );
}

function mailboxWithDraftOperationLock_(callback) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    throw mailboxError_('BUSY', 'Інша поштова операція ще завершується. Спробуйте ще раз.');
  }
  try {
    return callback(PropertiesService.getScriptProperties());
  } finally {
    lock.releaseLock();
  }
}

function mailboxReserveDraftOperation_(kindValue, operationIdValue, requestHashValue, seedValue) {
  const kind = String(kindValue || '');
  const operationId = mailboxRequireClientOperationId_(operationIdValue);
  const requestHash = String(requestHashValue || '');
  if (['draft_create', 'draft_update', 'draft_send'].indexOf(kind) === -1 ||
      !/^[A-Za-z0-9_-]{43}$/.test(requestHash)) {
    throw mailboxError_('INVALID_REQUEST', 'Некоректний журнал поштової операції.');
  }
  return mailboxWithDraftOperationLock_(properties => {
    const ownerId = mailboxDraftOperationScopeId_();
    let operations = mailboxReadDraftOperations_(properties, ownerId);
    const key = mailboxDraftOperationKey_(ownerId, kind, operationId);
    const draftId = seedValue && seedValue.draftId
      ? mailboxRequireGmailId_(seedValue.draftId, 'draftId')
      : '';
    const assertDraftMutex = excludedKey => {
      if (kind !== 'draft_send' && kind !== 'draft_update') return;
      const conflicting = operations.find(item => item._key !== excludedKey &&
        (item.kind === 'draft_send' || item.kind === 'draft_update') &&
        item.draftId === draftId && !mailboxDraftOperationIsTerminal_(item));
      if (conflicting) {
        throw mailboxError_('OPERATION_CONFLICT', 'Цю чернетку вже змінює інша операція.');
      }
    };
    let existing = operations.find(item => item._key === key);
    if (existing) {
      if (existing.requestHash !== requestHash) {
        throw mailboxError_('OPERATION_CONFLICT', 'Цей ідентифікатор уже належить іншій версії листа.');
      }
      if (existing.state !== 'failed') return existing;
      assertDraftMutex(existing._key);
      existing.state = 'reserved';
      existing.result = null;
      existing.errorCode = '';
      existing.updatedAt = Date.now();
      existing.reserve = 'x'.repeat(1024);
      return mailboxPersistDraftOperationLocked_(properties, operations, existing, []);
    }

    assertDraftMutex('');

    const now = Date.now();
    const deletedKeys = [];
    operations.filter(mailboxDraftOperationIsTerminal_).forEach(item => {
      if (now - Number(item.updatedAt || 0) >
          MAILBOX_CLIENT_CONFIG_.DRAFT_OPERATION_TERMINAL_TTL_MS) {
        deletedKeys.push(item._key);
      }
    });
    operations = operations.filter(item => deletedKeys.indexOf(item._key) === -1);
    while (operations.length >= MAILBOX_CLIENT_CONFIG_.DRAFT_OPERATION_LIMIT) {
      // A committed response may have been lost after Gmail succeeded. Keep
      // every unexpired, unacknowledged commit so a late exact retry remains
      // read-only. Definitively failed rows are safe to compact first.
      const terminal = operations.filter(item => item.state === 'failed')
        .sort((left, right) => Number(left.updatedAt) - Number(right.updatedAt))[0];
      if (!terminal) {
        throw mailboxError_('STORAGE_FULL', 'Забагато незавершених поштових операцій.');
      }
      deletedKeys.push(terminal._key);
      operations = operations.filter(item => item._key !== terminal._key);
    }

    const operation = mailboxAttachDraftOperationKey_(key, {
      v: 1,
      ownerId,
      operationId,
      kind,
      requestHash,
      messageIdHeader: kind === 'draft_send' ? '' :
        mailboxDraftOperationMessageId_(ownerId, kind, operationId, requestHash),
      draftId,
      state: 'reserved',
      result: null,
      createdAt: now,
      updatedAt: now,
      errorCode: '',
      reserve: 'x'.repeat(1024),
    });
    return mailboxPersistDraftOperationLocked_(properties, operations, operation, deletedKeys);
  });
}

function mailboxAcknowledgeDraftOperation_(payload) {
  mailboxAssertAllowedKeys_(payload, ['clientOperationId', 'kind']);
  const operationId = mailboxRequireClientOperationId_(payload.clientOperationId);
  const requestedKind = String(payload.kind || '');
  if (requestedKind !== 'draft' && requestedKind !== 'send') {
    throw mailboxError_('INVALID_REQUEST', 'Некоректний тип підтвердження поштової операції.');
  }
  return mailboxWithDraftOperationLock_(properties => {
    const ownerId = mailboxDraftOperationScopeId_();
    const operations = mailboxReadDraftOperations_(properties, ownerId);
    const matches = operations.filter(item => item.operationId === operationId &&
      (requestedKind === 'send'
        ? item.kind === 'draft_send'
        : item.kind === 'draft_create' || item.kind === 'draft_update'));
    if (!matches.length) return { acknowledged: true, kind: requestedKind };
    if (matches.length !== 1) {
      throw mailboxError_('SERVER_CONFIG', 'Журнал містить неоднозначну поштову операцію.');
    }
    const operation = matches[0];
    if (operation.state !== 'committed') {
      throw requestedKind === 'send' ? mailboxSendPending_() : mailboxDraftPending_();
    }
    try { properties.deleteProperty(operation._key); } catch (error) {}
    if (properties.getProperty(operation._key) !== null) {
      throw mailboxError_('STORAGE_FULL', 'Не вдалося підтвердити завершену поштову операцію.');
    }
    const remaining = operations.filter(item => item._key !== operation._key);
    const indexJson = mailboxDraftOperationIndexJson_(remaining);
    mailboxAssertDraftOperationStorage_(properties, {
      [MAILBOX_CLIENT_CONFIG_.DRAFT_OPERATION_INDEX_PROPERTY]: indexJson,
    }, [operation._key]);
    try {
      properties.setProperty(MAILBOX_CLIENT_CONFIG_.DRAFT_OPERATION_INDEX_PROPERTY, indexJson);
    } catch (error) {
      // The committed record is already gone; prefix scan is authoritative.
      console.error('Acknowledged operation index will be rebuilt from records.');
    }
    return { acknowledged: true, kind: requestedKind };
  });
}

function mailboxUpdateDraftOperation_(operationValue, updater) {
  const expected = operationValue || {};
  return mailboxWithDraftOperationLock_(properties => {
    const ownerId = mailboxDraftOperationScopeId_();
    const operations = mailboxReadDraftOperations_(properties, ownerId);
    const current = operations.find(item => item._key === String(expected._key || ''));
    if (!current || current.requestHash !== String(expected.requestHash || '') ||
        current.operationId !== String(expected.operationId || '') ||
        current.kind !== String(expected.kind || '')) {
      throw mailboxError_('OPERATION_CONFLICT', 'Стан поштової операції змінився.');
    }
    const next = updater(Object.assign({}, current)) || current;
    next.updatedAt = Date.now();
    return mailboxPersistDraftOperationLocked_(properties, operations, next, []);
  });
}

function mailboxBeginDraftOperationDispatch_(operation) {
  return mailboxUpdateDraftOperation_(operation, current => {
    if (current.state !== 'reserved') throw mailboxDraftPending_();
    current.state = 'dispatching';
    return current;
  });
}

function mailboxBindDraftOperationMessageId_(operation, messageIdHeaderValue) {
  const messageIdHeader = mailboxSafeMessageIdHeader_(messageIdHeaderValue);
  if (!messageIdHeader) {
    throw mailboxError_('INVALID_DRAFT', 'Спочатку збережіть чернетку перед надсиланням.');
  }
  return mailboxUpdateDraftOperation_(operation, current => {
    if (current.state !== 'reserved') throw mailboxSendPending_();
    if (current.messageIdHeader && current.messageIdHeader !== messageIdHeader) {
      throw mailboxError_('OPERATION_CONFLICT', 'Чернетка змінилася під час надсилання.');
    }
    current.messageIdHeader = messageIdHeader;
    return current;
  });
}

function mailboxMarkDraftOperationUncertain_(operation, error) {
  try {
    return mailboxUpdateDraftOperation_(operation, current => {
      if (current.state === 'committed') return current;
      current.state = 'uncertain';
      current.errorCode = mailboxSafeText_(error && error.mailboxCode || 'GMAIL_UNCERTAIN', 64);
      return current;
    });
  } catch (saveError) {
    console.error('Could not persist uncertain draft outcome; dispatching state remains authoritative.');
    return operation;
  }
}

function mailboxFailDraftOperation_(operation, error) {
  try {
    return mailboxUpdateDraftOperation_(operation, current => {
      if (current.state === 'committed') return current;
      current.state = 'failed';
      current.result = null;
      current.reserve = '';
      current.errorCode = mailboxSafeText_(
        error && error.mailboxCode || 'REQUEST_FAILED',
        64
      );
      return current;
    });
  } catch (saveError) {
    // This path is reached only when no Gmail mutation was applied (local
    // preflight or a definitive Gmail error).  Remove the active reservation
    // rather than leak a non-evictable slot.
    try {
      PropertiesService.getScriptProperties().deleteProperty(String(operation && operation._key || ''));
    } catch (cleanupError) {}
    return operation;
  }
}

function mailboxCommitDraftOperation_(operation, resultValue) {
  return mailboxUpdateDraftOperation_(operation, current => {
    if (current.state === 'committed') return current;
    const result = resultValue || {};
    current.state = 'committed';
    current.reserve = '';
    current.errorCode = '';
    current.result = {
      draftId: mailboxSafeGmailId_(result.draftId || current.draftId),
      messageId: mailboxSafeGmailId_(result.messageId || result.id),
      threadId: mailboxSafeGmailId_(result.threadId),
      historyId: mailboxSafeOpaqueToken_(result.historyId, 128),
    };
    if (current.result.draftId) current.draftId = current.result.draftId;
    return current;
  });
}

function mailboxDraftPending_() {
  return mailboxError_(
    'DRAFT_PENDING',
    'Gmail ще підтверджує чернетку. Не змінюйте її та повторіть перевірку.'
  );
}

function mailboxSendPending_() {
  return mailboxError_(
    'SEND_PENDING',
    'Gmail ще підтверджує надсилання. Не надсилайте лист повторно та перевірте стан.'
  );
}

function mailboxMessageIdHeaderFromPayload_(payload) {
  const headers = headersObject_((payload && payload.headers) || []);
  return mailboxSafeMessageIdHeader_(headers['message-id']);
}

function mailboxDraftMessageIdHeader_(draft) {
  return mailboxMessageIdHeaderFromPayload_(draft && draft.message && draft.message.payload);
}

function mailboxSearchDraftsByMessageId_(messageIdHeader) {
  const query = encodeURIComponent('rfc822msgid:' + messageIdHeader);
  const listed = gmailApiRequest_('/drafts?maxResults=10&q=' + query, { method: 'get' });
  const matches = [];
  (listed.drafts || []).slice(0, 10).forEach(reference => {
    const draftId = mailboxSafeGmailId_(reference && reference.id);
    if (!draftId) return;
    const draft = gmailApiRequest_(
      '/drafts/' + encodeURIComponent(draftId) + '?format=full',
      { method: 'get' }
    );
    if (mailboxDraftMessageIdHeader_(draft) === messageIdHeader) matches.push(draft);
  });
  return matches;
}

function mailboxDraftResponseFromFull_(draftValue, supersededValue) {
  const draft = draftValue || {};
  const response = mailboxDraftDto_(draft);
  const message = draft.message || {};
  const mime = mailboxParseMessageMime_(message);
  response.draft = mailboxEditableDraftDto_(
    response.draftId,
    message,
    mailboxMessageDto_(message, mime),
    mime
  );
  if (supersededValue) response.superseded = true;
  return response;
}

function mailboxStoredDraftResponse_(operation, supersededValue) {
  const result = operation && operation.result || {};
  const response = {
    draftId: mailboxRequireGmailId_(result.draftId || operation.draftId, 'draftId'),
    messageId: mailboxSafeGmailId_(result.messageId),
    threadId: mailboxSafeGmailId_(result.threadId),
    labelIds: ['DRAFT'],
    draft: null,
  };
  if (supersededValue) response.superseded = true;
  return response;
}

function mailboxReconcileDraftSaveOperation_(operationValue) {
  let operation = operationValue;
  const state = String(operation.state || '');
  if (state === 'failed') return { operation, committed: false, currentDraft: null };

  if (operation.draftId) {
    let draft = null;
    try {
      draft = gmailApiRequest_(
        '/drafts/' + encodeURIComponent(operation.draftId) + '?format=full',
        { method: 'get' }
      );
    } catch (error) {
      if (state === 'committed') {
        return { operation, committed: true, response: mailboxStoredDraftResponse_(operation, true) };
      }
      if (Number(error && error.gmailHttpStatus || 0) === 404 && state === 'reserved') {
        throw mailboxError_('INVALID_DRAFT', 'Чернетка більше не існує.');
      }
      if (state !== 'reserved') throw mailboxDraftPending_();
      throw error;
    }
    const exact = mailboxDraftMessageIdHeader_(draft) === operation.messageIdHeader;
    if (exact) {
      const dto = mailboxDraftDto_(draft);
      try { operation = mailboxCommitDraftOperation_(operation, dto); }
      catch (error) { throw mailboxDraftPending_(); }
      return { operation, committed: true, draft };
    }
    if (state === 'committed') {
      const currentMessageId = mailboxSafeGmailId_(draft && draft.message && draft.message.id);
      const committedMessageId = mailboxSafeGmailId_(
        operation.result && operation.result.messageId
      );
      if (committedMessageId && currentMessageId && currentMessageId !== committedMessageId) {
        return { operation, committed: true, draft, superseded: true };
      }
      throw mailboxDraftPending_();
    }
    if (state === 'reserved') return { operation, committed: false, currentDraft: draft };
    throw mailboxDraftPending_();
  }

  if (state === 'committed' && operation.result && operation.result.draftId) {
    operation.draftId = operation.result.draftId;
    return mailboxReconcileDraftSaveOperation_(operation);
  }
  // A durably reserved create has not crossed the dispatch boundary, so it is
  // safe to perform local preflight and POST exactly once.  Only a
  // dispatching/uncertain create needs Gmail search-based reconciliation.
  if (state === 'reserved') {
    return { operation, committed: false, currentDraft: null };
  }
  let matches;
  try { matches = mailboxSearchDraftsByMessageId_(operation.messageIdHeader); }
  catch (error) { throw mailboxDraftPending_(); }
  if (matches.length === 1) {
    const dto = mailboxDraftDto_(matches[0]);
    try { operation = mailboxCommitDraftOperation_(operation, dto); }
    catch (error) { throw mailboxDraftPending_(); }
    return { operation, committed: true, draft: matches[0] };
  }
  throw mailboxDraftPending_();
}

function mailboxSearchSentByMessageId_(messageIdHeader) {
  const query = encodeURIComponent('in:sent rfc822msgid:' + messageIdHeader);
  const listed = gmailApiRequest_(
    '/messages?maxResults=10&includeSpamTrash=true&q=' + query,
    { method: 'get' }
  );
  const matches = [];
  (listed.messages || []).slice(0, 10).forEach(reference => {
    const messageId = mailboxSafeGmailId_(reference && reference.id);
    if (!messageId) return;
    const message = gmailApiRequest_(
      '/messages/' + encodeURIComponent(messageId) +
        '?format=metadata&metadataHeaders=Message-ID',
      { method: 'get' }
    );
    if (mailboxMessageIdHeaderFromPayload_(message && message.payload) === messageIdHeader) {
      matches.push(message);
    }
  });
  return matches;
}

function mailboxStoredSentResponse_(operation) {
  const result = operation && operation.result || {};
  const threadId = mailboxRequireGmailId_(result.threadId, 'threadId');
  return {
    draftId: mailboxRequireGmailId_(result.draftId || operation.draftId, 'draftId'),
    message: {
      id: mailboxRequireGmailId_(result.messageId, 'messageId'),
      threadId,
      historyId: mailboxSafeOpaqueToken_(result.historyId, 128),
      labelIds: ['SENT'],
      gmailUrl: mailboxGmailUrl_(threadId),
    },
  };
}

function mailboxReconcileSendOperation_(operationValue) {
  let operation = operationValue;
  const state = String(operation.state || '');
  if (state === 'committed') {
    return { operation, committed: true, response: mailboxStoredSentResponse_(operation) };
  }
  if (!operation.messageIdHeader) {
    if (state !== 'reserved') throw mailboxSendPending_();
    return { operation, committed: false, currentDraft: null };
  }
  let matches;
  try { matches = mailboxSearchSentByMessageId_(operation.messageIdHeader); }
  catch (error) { throw mailboxSendPending_(); }
  if (matches.length === 1) {
    const sent = mailboxSentMessageDto_(matches[0]);
    try {
      operation = mailboxCommitDraftOperation_(operation, {
        draftId: operation.draftId,
        messageId: sent.id,
        threadId: sent.threadId,
        historyId: sent.historyId,
      });
    } catch (error) {
      throw mailboxSendPending_();
    }
    return { operation, committed: true, response: { draftId: operation.draftId, message: sent } };
  }
  if (matches.length > 1 || state !== 'reserved') throw mailboxSendPending_();

  let draft;
  try {
    draft = gmailApiRequest_(
      '/drafts/' + encodeURIComponent(operation.draftId) + '?format=full',
      { method: 'get' }
    );
  } catch (error) {
    if (Number(error && error.gmailHttpStatus || 0) === 404) {
      throw mailboxError_('INVALID_DRAFT', 'Чернетка більше не існує.');
    }
    throw error;
  }
  if (mailboxDraftMessageIdHeader_(draft) !== operation.messageIdHeader) {
    throw mailboxError_('OPERATION_CONFLICT', 'Чернетка змінилася перед надсиланням.');
  }
  return { operation, committed: false, currentDraft: draft };
}

function mailboxSaveDraft_(payload) {
  mailboxAssertAllowedKeys_(payload, [
    'draftId', 'threadId', 'replyMessageId', 'from', 'to', 'cc', 'bcc', 'subject', 'bodyText', 'bodyHtml',
    'attachments', 'inlineAttachments', 'existingAttachments', 'existingInlineAttachments',
    'forwardSource', 'clientOperationId',
  ]);
  const draftId = payload.draftId
    ? mailboxRequireGmailId_(payload.draftId, 'draftId')
    : '';
  const operationId = mailboxRequireClientOperationId_(payload.clientOperationId);
  if (!draftId && Object.prototype.hasOwnProperty.call(payload, 'existingAttachments')) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Посилання на вкладення дозволені лише для наявної чернетки.');
  }
  if (!draftId && Object.prototype.hasOwnProperty.call(payload, 'existingInlineAttachments')) {
    throw mailboxError_('INVALID_INLINE_IMAGE', 'Посилання на вбудовані зображення дозволені лише для наявної чернетки.');
  }
  if (draftId && Object.prototype.hasOwnProperty.call(payload, 'forwardSource')) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Оригінальні вкладення можна додати лише під час створення пересланої чернетки.');
  }
  const requestHash = mailboxOperationRequestHash_(payload, ['clientOperationId']);
  let operation = mailboxReserveDraftOperation_(
    draftId ? 'draft_update' : 'draft_create',
    operationId,
    requestHash,
    { draftId }
  );
  let message;
  try {
    const reconciliation = mailboxReconcileDraftSaveOperation_(operation);
    operation = reconciliation && reconciliation.operation || operation;
    if (reconciliation && reconciliation.committed) {
      if (reconciliation.response) return reconciliation.response;
      return mailboxDraftResponseFromFull_(
        reconciliation.draft,
        reconciliation.superseded
      );
    }
    if (String(operation.state) !== 'reserved') throw mailboxDraftPending_();

    const existingDraft = reconciliation && reconciliation.currentDraft || null;
    const compose = mailboxNormalizeCompose_(payload, false);
    if (existingDraft) {
      const existingMessage = existingDraft && existingDraft.message ? existingDraft.message : {};
      const existingThreadId = mailboxRequireGmailId_(existingMessage.threadId, 'threadId');
      if (compose.threadId && compose.threadId !== existingThreadId) {
        throw mailboxError_('INVALID_DRAFT', 'Чернетка не належить до вказаного ланцюжка листів.');
      }
      compose.threadId = existingThreadId;
      if (!payload.replyMessageId) {
        const headers = headersObject_((existingMessage.payload && existingMessage.payload.headers) || []);
        compose.inReplyTo = mailboxSafeMessageIdHeader_(headers['in-reply-to']);
        compose.references = mailboxBuildReferences_(headers.references, '');
      }
      const existingAttachments = mailboxResolveExistingDraftAttachments_(
        existingDraft,
        Object.prototype.hasOwnProperty.call(payload, 'existingAttachments')
          ? payload.existingAttachments
          : undefined,
        compose.attachments.concat(compose.inlineAttachments)
      );
      compose.attachments = existingAttachments.concat(compose.attachments);
      const existingInlineAttachments = mailboxResolveExistingDraftInlineAttachments_(
        existingDraft,
        Object.prototype.hasOwnProperty.call(payload, 'existingInlineAttachments')
          ? payload.existingInlineAttachments
          : undefined,
        compose.attachments.concat(compose.inlineAttachments)
      );
      compose.inlineAttachments = existingInlineAttachments.concat(compose.inlineAttachments);
    } else if (Object.prototype.hasOwnProperty.call(payload, 'forwardSource')) {
      const forwardedAttachments = mailboxResolveForwardSource_(
        payload.forwardSource,
        compose.attachments.concat(compose.inlineAttachments)
      );
      compose.attachments = forwardedAttachments.concat(compose.attachments);
    }
    mailboxAssertCombinedAttachmentLimits_(compose.attachments.concat(compose.inlineAttachments));
    compose.bodyHtml = mailboxFinalizeComposeHtml_(
      compose.bodyHtmlSource,
      compose.inlineAttachments,
      compose.attachments
    );
    if (!String(compose.bodyText || '').trim() && compose.bodyHtml) {
      compose.bodyText = mailboxNormalizeBody_(htmlToText_(compose.bodyHtml));
    }
    compose.messageIdHeader = String(operation.messageIdHeader);
    message = { raw: mailboxBuildMime_(compose) };
    if (compose.threadId) message.threadId = compose.threadId;
    operation = mailboxBeginDraftOperationDispatch_(operation);
  } catch (error) {
    if (operation && operation.state === 'reserved' &&
        String(error && error.mailboxCode || '') !== 'DRAFT_PENDING') {
      mailboxFailDraftOperation_(operation, error);
    }
    throw error;
  }

  let result;
  try {
    result = draftId
      ? gmailApiRequest_(
          '/drafts/' + encodeURIComponent(draftId),
          { method: 'put', body: { message } }
        )
      : gmailApiRequest_('/drafts', { method: 'post', body: { message } });
  } catch (gmailError) {
    if (mailboxGmailMutationOutcomeUncertain_(gmailError)) {
      operation = mailboxMarkDraftOperationUncertain_(operation, gmailError);
      const recovered = mailboxReconcileDraftSaveOperation_(operation);
      if (recovered && recovered.committed) {
        if (recovered.response) return recovered.response;
        return mailboxDraftResponseFromFull_(recovered.draft, recovered.superseded);
      }
      throw mailboxDraftPending_();
    }
    mailboxFailDraftOperation_(operation, gmailError);
    throw gmailError;
  }
  const response = mailboxDraftDto_(result);
  try { operation = mailboxCommitDraftOperation_(operation, response); }
  catch (error) { throw mailboxDraftPending_(); }
  try {
    const refreshed = gmailApiRequest_(
      '/drafts/' + encodeURIComponent(response.draftId) + '?format=full',
      { method: 'get' }
    );
    if (mailboxDraftMessageIdHeader_(refreshed) !== operation.messageIdHeader) {
      throw mailboxDraftPending_();
    }
    return mailboxDraftResponseFromFull_(refreshed);
  } catch (error) {
    // A save is complete only after the UI receives canonical attachment
    // references.  Retrying the same operation performs read-only recovery.
    console.error('Could not read back confirmed Gmail draft after save.');
    throw mailboxDraftPending_();
  }
}

/**
 * Copy explicitly selected, non-inline MIME parts from one authoritative Gmail
 * message into a new draft. The browser supplies only source IDs and part IDs;
 * filenames, MIME types, attachment IDs and bytes always come from Gmail.
 */
function mailboxResolveForwardSource_(sourceValue, reservedAttachmentsValue) {
  if (!mailboxIsPlainObject_(sourceValue)) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Джерело оригінальних вкладень має некоректний формат.');
  }
  mailboxAssertAllowedKeys_(sourceValue, ['threadId', 'messageId', 'partIds']);
  const threadId = mailboxRequireGmailId_(sourceValue.threadId, 'threadId');
  const messageId = mailboxRequireGmailId_(sourceValue.messageId, 'messageId');
  if (!Array.isArray(sourceValue.partIds) || !sourceValue.partIds.length) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Оберіть хоча б одне оригінальне вкладення.');
  }
  const reservedAttachments = reservedAttachmentsValue || [];
  if (sourceValue.partIds.length + reservedAttachments.length >
      MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS) {
    throw mailboxError_(
      'TOO_MANY_ATTACHMENTS',
      'До одного листа можна додати не більше ' +
        MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS + ' вкладень.'
    );
  }

  const used = new Set();
  const partIds = sourceValue.partIds.map(value => {
    const partId = mailboxRequirePartId_(value);
    if (used.has(partId)) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Одне оригінальне вкладення не можна додати двічі.');
    }
    used.add(partId);
    return partId;
  });
  const message = gmailApiRequest_(
    '/messages/' + encodeURIComponent(messageId) + '?format=full',
    { method: 'get' }
  );
  if (String(message && message.threadId || '') !== threadId) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Оригінальне вкладення не належить до вказаної розмови.');
  }

  const prepared = partIds.map((partId, index) => {
    const part = mailboxFindPartById_(message && message.payload, partId);
    if (!part) {
      throw mailboxError_('ATTACHMENT_NOT_FOUND', 'Оригінальне вкладення більше не існує. Оновіть розмову.');
    }
    const body = part.body || {};
    const headers = headersObject_(part.headers || []);
    const filename = String(part.filename || '').trim();
    const disposition = String(headers['content-disposition'] || '');
    const contentId = String(headers['content-id'] || '').replace(/[<>]/g, '').trim();
    const inline = /\binline\b/i.test(disposition) || Boolean(contentId);
    if (!filename || inline || (!body.data && !body.attachmentId)) {
      throw mailboxError_(
        'INVALID_ATTACHMENT',
        'Mini App пересилає лише звичайні вкладення, а не вбудовані ресурси листа.'
      );
    }
    const name = mailboxNormalizeAttachmentName_(filename, index);
    const mimeType = mailboxNormalizeOutgoingMimeType_(part.mimeType, index);
    const declaredSize = mailboxSafeCount_(body.size);
    if (declaredSize > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENT_BYTES) {
      throw mailboxError_(
        'ATTACHMENT_TOO_LARGE',
        'Файл «' + mailboxSafeText_(name, 100) + '» перевищує дозволений розмір.'
      );
    }
    return { part, name, mimeType, declaredSize, index };
  });

  const reservedBytes = reservedAttachments.reduce(
    (sum, attachment) => sum + Number(attachment && attachment.size || 0),
    0
  );
  const declaredBytes = prepared.reduce((sum, item) => sum + item.declaredSize, 0);
  if (reservedBytes + declaredBytes >
      MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES) {
    throw mailboxError_('ATTACHMENTS_TOO_LARGE', 'Загальний розмір вкладень перевищує 15 МБ.');
  }

  let actualBytes = reservedBytes;
  const attachments = prepared.map(item => {
    const body = item.part.body || {};
    let encoded = String(body.data || '');
    let responseSize = 0;
    if (!encoded) {
      const attachmentId = mailboxRequireAttachmentId_(body.attachmentId);
      const attachment = gmailApiRequest_(
        '/messages/' + encodeURIComponent(messageId) +
          '/attachments/' + encodeURIComponent(attachmentId),
        { method: 'get' }
      );
      encoded = String(attachment && attachment.data || '');
      responseSize = mailboxSafeCount_(attachment && attachment.size);
    }
    const decoded = mailboxDecodeOutgoingAttachment_({ dataBase64Url: encoded }, item.index);
    if ((item.declaredSize && item.declaredSize !== decoded.bytes.length) ||
        (responseSize && responseSize !== decoded.bytes.length)) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Gmail повернув пошкоджене оригінальне вкладення.');
    }
    actualBytes += decoded.bytes.length;
    if (actualBytes > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES) {
      throw mailboxError_('ATTACHMENTS_TOO_LARGE', 'Загальний розмір вкладень перевищує 15 МБ.');
    }
    return {
      name: item.name,
      mimeType: item.mimeType,
      size: decoded.bytes.length,
      dataBase64: mailboxStandardBase64_(decoded.bytes),
    };
  });
  mailboxAssertCombinedAttachmentLimits_(attachments.concat(reservedAttachments));
  return attachments;
}

function mailboxResolveExistingDraftAttachments_(draft, requestedValue, reservedAttachmentsValue) {
  const message = draft && draft.message ? draft.message : {};
  const messageId = mailboxRequireGmailId_(message.id, 'messageId');
  const authoritative = mailboxDraftAttachmentRefs_(message);
  const requested = requestedValue === undefined ? authoritative.map(reference => ({
    messageId: reference.messageId,
    partId: reference.partId,
    attachmentId: reference.attachmentId,
  })) : requestedValue;
  if (!Array.isArray(requested)) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Посилання на вкладення повинні бути списком.');
  }
  const reservedAttachments = reservedAttachmentsValue || [];
  if (requested.length + reservedAttachments.length > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS) {
    throw mailboxError_(
      'TOO_MANY_ATTACHMENTS',
      'До одного листа можна додати не більше ' + MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS + ' вкладень.'
    );
  }

  const byPartId = new Map(authoritative.map(reference => [reference.partId, reference]));
  const used = new Set();
  let totalBytes = reservedAttachments.reduce(
    (sum, attachment) => sum + Number(attachment && attachment.size || 0),
    0
  );
  return requested.map((reference, index) => {
    if (!mailboxIsPlainObject_(reference)) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Посилання на вкладення №' + (index + 1) + ' має некоректний формат.');
    }
    mailboxAssertAllowedKeys_(reference, ['messageId', 'partId', 'attachmentId']);
    if (mailboxRequireGmailId_(reference.messageId, 'messageId') !== messageId) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Вкладення не належить до цієї чернетки.');
    }
    const partId = mailboxRequirePartId_(reference.partId);
    if (used.has(partId)) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Одне вкладення не можна додати двічі.');
    }
    used.add(partId);
    const expected = byPartId.get(partId);
    if (!expected || mailboxSafeAttachmentId_(reference.attachmentId) !== expected.attachmentId) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Вкладення чернетки змінилося. Оновіть список листів.');
    }
    if (expected.size > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENT_BYTES) {
      throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Вкладення «' + mailboxSafeText_(expected.name, 100) + '» завелике для редагування в Mini App.');
    }
    if (expected.size && totalBytes + expected.size >
        MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES) {
      throw mailboxError_('ATTACHMENTS_TOO_LARGE', 'Загальний розмір вкладень перевищує 15 МБ.');
    }
    const part = mailboxFindPartById_(message.payload, partId);
    if (!part) throw mailboxError_('INVALID_ATTACHMENT', 'Вкладення чернетки більше не існує.');
    const body = part.body || {};
    const encoded = String(body.data || (body.attachmentId
      ? gmailApiRequest_(
          '/messages/' + encodeURIComponent(messageId) + '/attachments/' + encodeURIComponent(body.attachmentId),
          { method: 'get' }
        ).data
      : ''));
    const decoded = mailboxDecodeOutgoingAttachment_({ dataBase64Url: encoded }, index);
    if (expected.size && expected.size !== decoded.bytes.length) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Gmail повернув пошкоджене вкладення чернетки.');
    }
    totalBytes += decoded.bytes.length;
    if (totalBytes > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES) {
      throw mailboxError_('ATTACHMENTS_TOO_LARGE', 'Загальний розмір вкладень перевищує 15 МБ.');
    }
    return {
      name: mailboxNormalizeAttachmentName_(expected.name, index),
      mimeType: mailboxNormalizeOutgoingMimeType_(expected.mimeType, index),
      size: decoded.bytes.length,
      dataBase64: mailboxStandardBase64_(decoded.bytes),
    };
  });
}

function mailboxResolveExistingDraftInlineAttachments_(draft, requestedValue, reservedAttachmentsValue) {
  const message = draft && draft.message ? draft.message : {};
  const messageId = mailboxRequireGmailId_(message.id, 'messageId');
  const authoritative = mailboxDraftInlineAttachmentRefs_(message);
  // The separate field is opt-in so an older editor that never received safe
  // inline placeholders can still update a regular draft without becoming
  // trapped by hidden MIME resources.
  const requested = requestedValue === undefined ? [] : requestedValue;
  if (!Array.isArray(requested)) {
    throw mailboxError_('INVALID_INLINE_IMAGE', 'Посилання на вбудовані зображення повинні бути списком.');
  }
  const reservedAttachments = reservedAttachmentsValue || [];
  if (requested.length + reservedAttachments.length > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS) {
    throw mailboxError_(
      'TOO_MANY_ATTACHMENTS',
      'До одного листа можна додати не більше ' + MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS + ' файлів.'
    );
  }

  const byPartId = new Map(authoritative.map(reference => [reference.partId, reference]));
  const usedParts = new Set();
  const usedTokens = new Set();
  let totalBytes = reservedAttachments.reduce(
    (sum, attachment) => sum + Number(attachment && attachment.size || 0),
    0
  );
  return requested.map((reference, index) => {
    if (!mailboxIsPlainObject_(reference)) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'Посилання на вбудоване зображення №' + (index + 1) + ' має некоректний формат.');
    }
    mailboxAssertAllowedKeys_(reference, ['messageId', 'partId', 'attachmentId', 'token']);
    if (mailboxRequireGmailId_(reference.messageId, 'messageId') !== messageId) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'Вбудоване зображення не належить до цієї чернетки.');
    }
    const partId = mailboxRequirePartId_(reference.partId);
    const token = mailboxRequireInlineToken_(reference.token, index);
    if (usedParts.has(partId) || usedTokens.has(token)) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'Одне вбудоване зображення не можна додати двічі.');
    }
    usedParts.add(partId);
    usedTokens.add(token);
    const expected = byPartId.get(partId);
    if (!expected || token !== expected.token ||
        mailboxSafeAttachmentId_(reference.attachmentId) !== expected.attachmentId) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'Вбудоване зображення чернетки змінилося. Оновіть лист.');
    }
    const mimeType = mailboxRequireInlineImageMimeType_(expected.mimeType, index);
    if (expected.size > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENT_BYTES) {
      throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Вбудоване зображення «' + mailboxSafeText_(expected.name, 100) + '» завелике.');
    }
    if (expected.size && totalBytes + expected.size >
        MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES) {
      throw mailboxError_('ATTACHMENTS_TOO_LARGE', 'Загальний розмір вкладень перевищує 15 МБ.');
    }
    const part = mailboxFindPartById_(message.payload, partId);
    if (!part) throw mailboxError_('INVALID_INLINE_IMAGE', 'Вбудоване зображення чернетки більше не існує.');
    const body = part.body || {};
    const encoded = String(body.data || (body.attachmentId
      ? gmailApiRequest_(
          '/messages/' + encodeURIComponent(messageId) + '/attachments/' + encodeURIComponent(body.attachmentId),
          { method: 'get' }
        ).data
      : ''));
    const decoded = mailboxDecodeOutgoingAttachment_({ dataBase64Url: encoded }, index);
    if ((expected.size && expected.size !== decoded.bytes.length) ||
        !mailboxInlineImageMagicMatches_(mimeType, decoded.bytes)) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'Gmail повернув пошкоджене або підмінене вбудоване зображення.');
    }
    totalBytes += decoded.bytes.length;
    if (totalBytes > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES) {
      throw mailboxError_('ATTACHMENTS_TOO_LARGE', 'Загальний розмір вкладень перевищує 15 МБ.');
    }
    return {
      token,
      contentId: mailboxGenerateInlineContentId_(),
      name: mailboxNormalizeAttachmentName_(expected.name, index),
      mimeType,
      size: decoded.bytes.length,
      dataBase64: mailboxStandardBase64_(decoded.bytes),
      inline: true,
    };
  });
}

function mailboxFindPartById_(partValue, partId) {
  const part = partValue || {};
  if (String(part.partId || '') === partId) return part;
  const children = part.parts || [];
  for (let index = 0; index < children.length; index += 1) {
    const found = mailboxFindPartById_(children[index], partId);
    if (found) return found;
  }
  return null;
}

function mailboxAssertCombinedAttachmentLimits_(attachments) {
  if ((attachments || []).length > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS) {
    throw mailboxError_(
      'TOO_MANY_ATTACHMENTS',
      'До одного листа можна додати не більше ' + MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS + ' вкладень.'
    );
  }
  const total = (attachments || []).reduce((sum, attachment) => sum + Number(attachment.size || 0), 0);
  if (total > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES) {
    throw mailboxError_('ATTACHMENTS_TOO_LARGE', 'Загальний розмір вкладень перевищує 15 МБ.');
  }
}

function mailboxSendDraft_(payload) {
  mailboxAssertAllowedKeys_(payload, ['draftId', 'clientOperationId']);
  const draftId = mailboxRequireGmailId_(payload.draftId, 'draftId');
  const operationId = mailboxRequireClientOperationId_(payload.clientOperationId);
  const requestHash = mailboxOperationRequestHash_(payload, ['clientOperationId']);
  let operation = mailboxReserveDraftOperation_(
    'draft_send',
    operationId,
    requestHash,
    { draftId }
  );

  try {
    let reconciliation = mailboxReconcileSendOperation_(operation);
    operation = reconciliation && reconciliation.operation || operation;
    if (reconciliation && reconciliation.committed) return reconciliation.response;
    if (operation.state !== 'reserved') throw mailboxSendPending_();

    let currentDraft = reconciliation && reconciliation.currentDraft || null;
    if (!operation.messageIdHeader) {
      currentDraft = gmailApiRequest_(
        '/drafts/' + encodeURIComponent(draftId) + '?format=full',
        { method: 'get' }
      );
      operation = mailboxBindDraftOperationMessageId_(
        operation,
        mailboxDraftMessageIdHeader_(currentDraft)
      );
    }
    if (!currentDraft) {
      reconciliation = mailboxReconcileSendOperation_(operation);
      operation = reconciliation && reconciliation.operation || operation;
      if (reconciliation && reconciliation.committed) return reconciliation.response;
    }
    operation = mailboxBeginDraftOperationDispatch_(operation);
  } catch (error) {
    if (operation && operation.state === 'reserved' &&
        String(error && error.mailboxCode || '') !== 'SEND_PENDING') {
      mailboxFailDraftOperation_(operation, error);
    }
    throw error;
  }

  let message;
  try {
    message = gmailApiRequest_('/drafts/send', {
      method: 'post',
      body: { id: draftId },
    });
  } catch (gmailError) {
    if (mailboxGmailMutationOutcomeUncertain_(gmailError)) {
      operation = mailboxMarkDraftOperationUncertain_(operation, gmailError);
      const recovered = mailboxReconcileSendOperation_(operation);
      if (recovered && recovered.committed) return recovered.response;
      throw mailboxSendPending_();
    }
    mailboxFailDraftOperation_(operation, gmailError);
    throw gmailError;
  }
  const sent = mailboxSentMessageDto_(message);
  try {
    mailboxCommitDraftOperation_(operation, {
      draftId,
      messageId: sent.id,
      threadId: sent.threadId,
      historyId: sent.historyId,
    });
  } catch (error) {
    throw mailboxSendPending_();
  }
  return { draftId, message: sent };
}

/**
 * Durable send-later journal. Records contain routing metadata only; the Gmail
 * draft remains authoritative for recipients, content and attachments.
 */
function mailboxScheduledSendScope_(sessionValue) {
  const session = sessionValue || mailboxCurrentSessionContext_ || {};
  const userId = String(session.userId || '');
  const connectionId = String(session.connectionId || '');
  if (!/^\d{1,24}$/.test(userId) || !/^gmail-[A-Za-z0-9_-]{1,80}$/.test(connectionId)) {
    throw mailboxError_('FORBIDDEN', 'Не вдалося визначити точну поштову зону для відкладеного надсилання.');
  }
  return { userId, connectionId, id: 'telegram:' + userId + '|gmail:' + connectionId };
}

function mailboxScheduledSendStates_() {
  return ['scheduled', 'sending', 'sent', 'cancelled', 'needs_review', 'failed_terminal'];
}

function mailboxScheduledSendKey_(scopeIdValue, operationIdValue) {
  return MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_PREFIX +
    mailboxDigestText_([String(scopeIdValue || ''), String(operationIdValue || '')].join('|'));
}

function mailboxScheduledSendTimezone_(value) {
  const timezone = String(value || 'UTC');
  if (timezone.length > 80 || !/^[A-Za-z0-9_+\-/]{1,80}$/.test(timezone)) {
    throw mailboxError_('INVALID_REQUEST', 'Некоректний часовий пояс відкладеного надсилання.');
  }
  try { Utilities.formatDate(new Date(0), timezone, 'yyyy'); }
  catch (error) {
    throw mailboxError_('INVALID_REQUEST', 'Вибраний часовий пояс не підтримується.');
  }
  return timezone;
}

function mailboxScheduledSendEpoch_(value) {
  const dueAt = Number(value);
  if (!Number.isInteger(dueAt) || dueAt <= 0) {
    throw mailboxError_('INVALID_REQUEST', 'Некоректний час відкладеного надсилання.');
  }
  return dueAt;
}

function mailboxScheduledSendDueAt_(value, nowValue) {
  const dueAt = mailboxScheduledSendEpoch_(value);
  const now = Number(nowValue || Date.now());
  if (dueAt < now + MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_MIN_DELAY_MS ||
      dueAt > now + MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_MAX_DELAY_MS) {
    throw mailboxError_('INVALID_REQUEST', 'Оберіть час від однієї хвилини до одного року вперед.');
  }
  return dueAt;
}

function mailboxScheduledSendPersistable_(value) {
  const record = value || {};
  return {
    v: 1,
    operationId: String(record.operationId || ''),
    userId: String(record.userId || ''),
    connectionId: String(record.connectionId || ''),
    draftId: String(record.draftId || ''),
    messageIdHeader: String(record.messageIdHeader || ''),
    requestHash: String(record.requestHash || ''),
    dueAt: Number(record.dueAt || 0),
    timezone: String(record.timezone || 'UTC'),
    state: String(record.state || ''),
    revision: Number(record.revision || 0),
    phase: String(record.phase || ''),
    operationToken: String(record.operationToken || ''),
    leaseUntil: Number(record.leaseUntil || 0),
    attempts: Number(record.attempts || 0),
    nextRetryAt: Number(record.nextRetryAt || 0),
    result: record.result && mailboxIsPlainObject_(record.result)
      ? mailboxCanonicalOperationValue_(record.result) : null,
    errorCode: mailboxSafeText_(record.errorCode, 64),
    createdAt: Number(record.createdAt || 0),
    updatedAt: Number(record.updatedAt || 0),
    reserve: ['scheduled', 'sending'].indexOf(String(record.state || '')) !== -1
      ? String(record.reserve || '') : '',
  };
}

function mailboxValidateScheduledSend_(keyValue, value) {
  const key = String(keyValue || '');
  const raw = value || {};
  const record = mailboxScheduledSendPersistable_(value);
  const scope = 'telegram:' + record.userId + '|gmail:' + record.connectionId;
  const valid = raw.v === 1 && /^\d{1,24}$/.test(record.userId) &&
    /^gmail-[A-Za-z0-9_-]{1,80}$/.test(record.connectionId) &&
    /^[A-Za-z0-9_-]{16,128}$/.test(record.operationId) &&
    key === mailboxScheduledSendKey_(scope, record.operationId) &&
    Boolean(mailboxSafeGmailId_(record.draftId)) &&
    Boolean(mailboxSafeMessageIdHeader_(record.messageIdHeader)) &&
    /^[A-Za-z0-9_-]{43}$/.test(record.requestHash) &&
    mailboxScheduledSendStates_().indexOf(record.state) !== -1 &&
    ['', 'claimed', 'retry', 'readback_only'].indexOf(record.phase) !== -1 &&
    (!record.operationToken || /^[A-Za-z0-9_-]{16,80}$/.test(record.operationToken)) &&
    /^[A-Za-z0-9_+\-/]{1,80}$/.test(record.timezone) &&
    Number.isInteger(record.dueAt) && record.dueAt > 0 &&
    Number.isInteger(record.revision) && record.revision > 0 &&
    Number.isInteger(record.attempts) && record.attempts >= 0 &&
    Number.isInteger(record.leaseUntil) && record.leaseUntil >= 0 &&
    Number.isInteger(record.nextRetryAt) && record.nextRetryAt >= 0 &&
    Number.isFinite(record.createdAt) && record.createdAt > 0 &&
    Number.isFinite(record.updatedAt) && record.updatedAt > 0;
  if (!valid) throw mailboxError_('SERVER_CONFIG', 'Журнал відкладених листів пошкоджений.');
  return Object.assign({ _key: key }, record);
}

function mailboxReadScheduledSends_(properties) {
  const all = properties.getProperties() || {};
  return Object.keys(all).filter(key =>
    key.indexOf(MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_PREFIX) === 0
  ).sort().map(key => {
    let parsed = null;
    try { parsed = JSON.parse(String(all[key] || '')); } catch (error) { parsed = null; }
    try { return mailboxValidateScheduledSend_(key, parsed); }
    catch (error) {
      console.error('Ignoring corrupt scheduled-send record ' + mailboxDigestText_(key));
      return null;
    }
  }).filter(Boolean);
}

function mailboxScheduledSendLock_(callback) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    throw mailboxError_('BUSY', 'Інша відкладена операція ще завершується. Спробуйте ще раз.');
  }
  try { return callback(PropertiesService.getScriptProperties()); }
  finally { lock.releaseLock(); }
}

function mailboxPersistScheduledSendLocked_(properties, recordValue, deletedKeysValue) {
  const record = recordValue;
  const deletedKeys = Array.from(new Set((deletedKeysValue || []).map(String)));
  const serialized = JSON.stringify(mailboxScheduledSendPersistable_(record));
  try {
    assertTelegramPropertyValueFits_(record._key, serialized);
    assertTelegramPropertyStoreFits_(properties, { [record._key]: serialized }, deletedKeys);
  } catch (error) {
    throw mailboxError_('STORAGE_FULL', 'Сховище відкладених листів тимчасово заповнене.');
  }
  deletedKeys.forEach(key => { try { properties.deleteProperty(key); } catch (error) {} });
  const undeleted = deletedKeys.find(key => properties.getProperty(key) !== null);
  if (undeleted) throw mailboxError_('STORAGE_FULL', 'Не вдалося звільнити журнал відкладених листів.');
  try { properties.setProperty(record._key, serialized); } catch (error) {}
  if (String(properties.getProperty(record._key) || '') !== serialized) {
    throw mailboxError_('STORAGE_FULL', 'Не вдалося надійно зберегти відкладене надсилання.');
  }
  return Object.assign({ _key: record._key }, mailboxScheduledSendPersistable_(record));
}

function mailboxScheduledSendDto_(record) {
  return {
    operationId: record.operationId,
    draftId: record.draftId,
    dueAt: record.dueAt,
    timezone: record.timezone,
    state: record.state,
    revision: record.revision,
    attempts: record.attempts,
    errorCode: record.errorCode,
    result: record.result ? {
      messageId: mailboxSafeGmailId_(record.result.messageId),
      threadId: mailboxSafeGmailId_(record.result.threadId),
      historyId: mailboxSafeOpaqueToken_(record.result.historyId, 128),
    } : null,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

function mailboxScheduledSendState_(payload, session) {
  mailboxAssertAllowedKeys_(payload, []);
  const scope = mailboxScheduledSendScope_(session);
  const records = mailboxReadScheduledSends_(PropertiesService.getScriptProperties())
    .filter(record => record.userId === scope.userId && record.connectionId === scope.connectionId)
    .sort((left, right) => left.dueAt - right.dueAt || left.createdAt - right.createdAt);
  return { items: records.map(mailboxScheduledSendDto_) };
}

function mailboxScheduleDraftSend_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['draftId', 'clientOperationId', 'dueAt', 'timezone']);
  const scope = mailboxScheduledSendScope_(session);
  const draftId = mailboxRequireGmailId_(payload.draftId, 'draftId');
  const operationId = mailboxRequireClientOperationId_(payload.clientOperationId);
  const dueAt = mailboxScheduledSendEpoch_(payload.dueAt);
  const timezone = mailboxScheduledSendTimezone_(payload.timezone);
  const requestHash = mailboxOperationRequestHash_({ draftId, dueAt, timezone }, []);
  const key = mailboxScheduledSendKey_(scope.id, operationId);
  const existingDto = mailboxScheduledSendLock_(properties => {
    const existing = mailboxReadScheduledSends_(properties).find(record => record._key === key);
    if (!existing) return null;
    if (existing.requestHash !== requestHash) {
      throw mailboxError_('OPERATION_CONFLICT', 'Цей ідентифікатор уже належить іншому плануванню.');
    }
    return mailboxScheduledSendDto_(existing);
  });
  if (existingDto) return existingDto;
  mailboxScheduledSendDueAt_(dueAt);
  const draft = gmailApiRequest_('/drafts/' + encodeURIComponent(draftId) + '?format=full', { method: 'get' });
  const messageIdHeader = mailboxDraftMessageIdHeader_(draft);
  if (!messageIdHeader) {
    throw mailboxError_('INVALID_DRAFT', 'Спочатку збережіть чернетку перед плануванням.');
  }
  return mailboxScheduledSendLock_(properties => {
    const now = Date.now();
    let records = mailboxReadScheduledSends_(properties);
    const existing = records.find(record => record._key === key);
    if (existing) {
      if (existing.requestHash !== requestHash) {
        throw mailboxError_('OPERATION_CONFLICT', 'Цей ідентифікатор уже належить іншому плануванню.');
      }
      return mailboxScheduledSendDto_(existing);
    }
    const duplicateDraft = records.find(record => record.userId === scope.userId &&
      record.connectionId === scope.connectionId && record.draftId === draftId &&
      ['scheduled', 'sending'].indexOf(record.state) !== -1);
    if (duplicateDraft) {
      throw mailboxError_('OPERATION_CONFLICT', 'Цю чернетку вже заплановано до надсилання.');
    }
    const deletedKeys = records.filter(record =>
      ['sent', 'cancelled', 'needs_review', 'failed_terminal'].indexOf(record.state) !== -1 &&
      now - record.updatedAt > MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_TERMINAL_TTL_MS
    ).map(record => record._key);
    records = records.filter(record => deletedKeys.indexOf(record._key) === -1);
    const compactable = records.filter(record =>
      ['sent', 'cancelled', 'failed_terminal'].indexOf(record.state) !== -1
    ).sort((left, right) => left.updatedAt - right.updatedAt);
    while (compactable.length >= MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_TERMINAL_LIMIT) {
      const oldest = compactable.shift();
      deletedKeys.push(oldest._key);
      records = records.filter(record => record._key !== oldest._key);
    }
    const activeCount = records.filter(record =>
      ['scheduled', 'sending', 'needs_review'].indexOf(record.state) !== -1
    ).length;
    const scopeCount = records.filter(record => record.userId === scope.userId &&
      record.connectionId === scope.connectionId &&
      ['scheduled', 'sending', 'needs_review'].indexOf(record.state) !== -1).length;
    if (activeCount >= MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_LIMIT ||
        scopeCount >= MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_SCOPE_LIMIT) {
      throw mailboxError_('STORAGE_FULL', 'Досягнуто ліміт активних відкладених листів.');
    }
    const record = {
      _key: key, v: 1, operationId, userId: scope.userId, connectionId: scope.connectionId,
      draftId, messageIdHeader, requestHash, dueAt, timezone, state: 'scheduled', revision: 1,
      phase: '', operationToken: '', leaseUntil: 0, attempts: 0, nextRetryAt: dueAt,
      result: null, errorCode: '', createdAt: now, updatedAt: now, reserve: 'x'.repeat(768),
    };
    return mailboxScheduledSendDto_(mailboxPersistScheduledSendLocked_(properties, record, deletedKeys));
  });
}

function mailboxRescheduleDraftSend_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['clientOperationId', 'expectedRevision', 'dueAt', 'timezone']);
  const scope = mailboxScheduledSendScope_(session);
  const operationId = mailboxRequireClientOperationId_(payload.clientOperationId);
  const dueAt = mailboxScheduledSendDueAt_(payload.dueAt);
  const timezone = mailboxScheduledSendTimezone_(payload.timezone);
  const expectedRevision = Number(payload.expectedRevision);
  if (!Number.isInteger(expectedRevision)) {
    throw mailboxError_('OPERATION_CONFLICT', 'Час надсилання вже змінився. Оновіть список.');
  }
  const snapshot = mailboxScheduledSendLock_(properties => {
    const key = mailboxScheduledSendKey_(scope.id, operationId);
    const record = mailboxReadScheduledSends_(properties).find(item => item._key === key);
    if (!record) throw mailboxError_('NOT_FOUND', 'Відкладене надсилання не знайдено.');
    if (record.revision !== expectedRevision || record.state !== 'scheduled') {
      throw mailboxError_('OPERATION_CONFLICT', 'Лист уже змінився або обробляється. Оновіть список.');
    }
    return { draftId: record.draftId, revision: record.revision };
  });
  const draft = gmailApiRequest_(
    '/drafts/' + encodeURIComponent(snapshot.draftId) + '?format=full',
    { method: 'get' }
  );
  const messageIdHeader = mailboxDraftMessageIdHeader_(draft);
  if (!messageIdHeader) throw mailboxError_('INVALID_DRAFT', 'Чернетка більше не готова до планування.');
  return mailboxScheduledSendLock_(properties => {
    const records = mailboxReadScheduledSends_(properties);
    const key = mailboxScheduledSendKey_(scope.id, operationId);
    const record = records.find(item => item._key === key);
    if (!record) throw mailboxError_('NOT_FOUND', 'Відкладене надсилання не знайдено.');
    if (expectedRevision !== record.revision) {
      throw mailboxError_('OPERATION_CONFLICT', 'Час надсилання вже змінився. Оновіть список.');
    }
    if (record.state !== 'scheduled') {
      throw mailboxError_('OPERATION_CONFLICT', 'Лист уже обробляється й не може бути перепланований.');
    }
    record.dueAt = dueAt;
    record.timezone = timezone;
    record.messageIdHeader = messageIdHeader;
    record.requestHash = mailboxOperationRequestHash_({ draftId: record.draftId, dueAt, timezone }, []);
    record.revision += 1;
    record.nextRetryAt = dueAt;
    record.updatedAt = Date.now();
    return mailboxScheduledSendDto_(mailboxPersistScheduledSendLocked_(properties, record, []));
  });
}

function mailboxCancelScheduledSend_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['clientOperationId', 'expectedRevision']);
  const scope = mailboxScheduledSendScope_(session);
  const operationId = mailboxRequireClientOperationId_(payload.clientOperationId);
  return mailboxScheduledSendLock_(properties => {
    const records = mailboxReadScheduledSends_(properties);
    const key = mailboxScheduledSendKey_(scope.id, operationId);
    const record = records.find(item => item._key === key);
    if (!record) throw mailboxError_('NOT_FOUND', 'Відкладене надсилання не знайдено.');
    const revision = Number(payload.expectedRevision);
    if (!Number.isInteger(revision) || revision !== record.revision) {
      throw mailboxError_('OPERATION_CONFLICT', 'Стан відкладеного листа вже змінився. Оновіть список.');
    }
    if (record.state !== 'scheduled') {
      throw mailboxError_('OPERATION_CONFLICT', 'Лист уже обробляється; скасування більше не гарантоване.');
    }
    record.state = 'cancelled';
    record.revision += 1;
    record.nextRetryAt = 0;
    record.reserve = '';
    record.updatedAt = Date.now();
    return mailboxScheduledSendDto_(mailboxPersistScheduledSendLocked_(properties, record, []));
  });
}

function mailboxScheduledSendRetryDelay_(attempts) {
  return Math.min(60 * 60 * 1000, Math.pow(2, Math.max(0, Number(attempts || 1) - 1)) * 60 * 1000);
}

function mailboxClaimScheduledSend_(keyValue, nowValue) {
  const key = String(keyValue || '');
  const now = Number(nowValue || Date.now());
  return mailboxScheduledSendLock_(properties => {
    const record = mailboxReadScheduledSends_(properties).find(item => item._key === key);
    if (!record) return null;
    const eligible = (record.state === 'scheduled' && record.dueAt <= now) ||
      (record.state === 'sending' && record.leaseUntil <= now && record.nextRetryAt <= now);
    if (!eligible) return null;
    if (record.attempts >= MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_MAX_ATTEMPTS) {
      record.state = 'needs_review';
      record.errorCode = 'RETRY_EXHAUSTED';
      record.reserve = '';
      record.revision += 1;
      record.updatedAt = now;
      mailboxPersistScheduledSendLocked_(properties, record, []);
      return null;
    }
    record.state = 'sending';
    record.phase = record.phase === 'readback_only' ? 'readback_only' : 'claimed';
    record.operationToken = Utilities.getUuid();
    record.leaseUntil = now + MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_LEASE_MS;
    record.nextRetryAt = record.leaseUntil;
    record.attempts += 1;
    record.revision += 1;
    record.updatedAt = now;
    return mailboxPersistScheduledSendLocked_(properties, record, []);
  });
}

function mailboxRenewScheduledSendClaim_(claimValue) {
  const claim = claimValue || {};
  return mailboxScheduledSendLock_(properties => {
    const record = mailboxReadScheduledSends_(properties).find(item => item._key === claim._key);
    if (!record || record.state !== 'sending' ||
        record.operationToken !== claim.operationToken || record.revision !== claim.revision) {
      throw mailboxError_('OPERATION_CONFLICT', 'Відкладене надсилання вже обробляє інший процес.');
    }
    record.leaseUntil = Date.now() + MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_LEASE_MS;
    record.nextRetryAt = record.leaseUntil;
    record.updatedAt = Date.now();
    return mailboxPersistScheduledSendLocked_(properties, record, []);
  });
}

function mailboxFinishScheduledSend_(claimValue, stateValue, resultValue, errorCodeValue) {
  const claim = claimValue || {};
  return mailboxScheduledSendLock_(properties => {
    const record = mailboxReadScheduledSends_(properties).find(item => item._key === claim._key);
    if (!record || record.state !== 'sending' || record.operationToken !== claim.operationToken) {
      throw mailboxError_('OPERATION_CONFLICT', 'Результат відкладеного надсилання вже застарів.');
    }
    record.state = String(stateValue || 'needs_review');
    record.result = resultValue && mailboxIsPlainObject_(resultValue) ? resultValue : null;
    record.errorCode = mailboxSafeText_(errorCodeValue, 64);
    record.operationToken = '';
    record.leaseUntil = 0;
    record.nextRetryAt = 0;
    record.reserve = '';
    record.revision += 1;
    record.updatedAt = Date.now();
    return mailboxPersistScheduledSendLocked_(properties, record, []);
  });
}

function mailboxReleaseScheduledSend_(claimValue, error) {
  const claim = claimValue || {};
  return mailboxScheduledSendLock_(properties => {
    const record = mailboxReadScheduledSends_(properties).find(item => item._key === claim._key);
    if (!record || record.state !== 'sending' || record.operationToken !== claim.operationToken) return null;
    const code = mailboxSafeText_(error && error.mailboxCode || 'REQUEST_FAILED', 64);
    if (record.attempts >= MAILBOX_CLIENT_CONFIG_.SCHEDULED_SEND_MAX_ATTEMPTS) {
      record.state = 'needs_review';
      record.reserve = '';
      record.nextRetryAt = 0;
    } else {
      record.phase = code === 'SEND_PENDING' ? 'readback_only' : 'retry';
      record.nextRetryAt = Date.now() + mailboxScheduledSendRetryDelay_(record.attempts);
    }
    record.errorCode = code;
    record.operationToken = '';
    record.leaseUntil = 0;
    record.revision += 1;
    record.updatedAt = Date.now();
    return mailboxPersistScheduledSendLocked_(properties, record, []);
  });
}

function mailboxProcessScheduledSendClaim_(claimValue) {
  let claim = claimValue;
  const session = { userId: claim.userId, connectionId: claim.connectionId };
  try {
    return mailboxWithConnection_(session, claim.connectionId, 'responder', () => {
      claim = mailboxRenewScheduledSendClaim_(claim);
      if (claim.phase === 'readback_only') {
        const reconciled = mailboxSendDraft_({
          draftId: claim.draftId,
          clientOperationId: claim.operationId,
        });
        return mailboxFinishScheduledSend_(claim, 'sent', {
          messageId: reconciled.message.id,
          threadId: reconciled.message.threadId,
          historyId: reconciled.message.historyId,
        }, '');
      }
      let draft;
      try {
        draft = gmailApiRequest_('/drafts/' + encodeURIComponent(claim.draftId) + '?format=full', { method: 'get' });
      } catch (error) {
        if (Number(error && error.gmailHttpStatus || 0) === 404) {
          return mailboxFinishScheduledSend_(claim, 'needs_review', null, 'DRAFT_MISSING');
        }
        throw error;
      }
      if (mailboxDraftMessageIdHeader_(draft) !== claim.messageIdHeader) {
        return mailboxFinishScheduledSend_(claim, 'needs_review', null, 'DRAFT_CHANGED');
      }
      const response = mailboxSendDraft_({
        draftId: claim.draftId,
        clientOperationId: claim.operationId,
      });
      return mailboxFinishScheduledSend_(claim, 'sent', {
        messageId: response.message.id,
        threadId: response.message.threadId,
        historyId: response.message.historyId,
      }, '');
    });
  } catch (error) {
    const terminal = ['FORBIDDEN', 'NOT_FOUND', 'REAUTH_REQUIRED', 'INVALID_DRAFT', 'OPERATION_CONFLICT']
      .indexOf(String(error && error.mailboxCode || '')) !== -1;
    if (terminal) return mailboxFinishScheduledSend_(claim, 'needs_review', null, error.mailboxCode);
    mailboxReleaseScheduledSend_(claim, error);
    throw error;
  }
}

function mailboxProcessDueScheduledSends_(limitValue) {
  const limit = Math.max(0, Math.min(Number(limitValue) || 3, 5));
  const properties = PropertiesService.getScriptProperties();
  const now = Date.now();
  const candidates = mailboxReadScheduledSends_(properties).filter(record =>
    (record.state === 'scheduled' && record.dueAt <= now) ||
    (record.state === 'sending' && record.leaseUntil <= now && record.nextRetryAt <= now)
  ).sort((left, right) => left.nextRetryAt - right.nextRetryAt || left.dueAt - right.dueAt);
  let attempted = 0;
  let completed = 0;
  let failed = 0;
  candidates.slice(0, limit).forEach(candidate => {
    let claim = null;
    try { claim = mailboxClaimScheduledSend_(candidate._key, Date.now()); }
    catch (error) { failed += 1; return; }
    if (!claim) return;
    attempted += 1;
    try {
      const result = mailboxProcessScheduledSendClaim_(claim);
      if (result && ['sent', 'needs_review', 'failed_terminal'].indexOf(result.state) !== -1) completed += 1;
    } catch (error) {
      failed += 1;
      console.error('Scheduled draft send retry failed for ' + claim.operationId + ': ' + error);
    }
  });
  return { attempted, completed, failed, pending: Math.max(0, candidates.length - attempted) };
}

function mailboxNormalizeCompose_(payload, sending) {
  const reply = payload.replyMessageId
    ? mailboxReplyContext_(payload.replyMessageId)
    : null;
  const requestedThreadId = payload.threadId
    ? mailboxRequireGmailId_(payload.threadId, 'threadId')
    : '';
  if (reply && requestedThreadId && requestedThreadId !== reply.threadId) {
    throw mailboxError_('INVALID_REPLY', 'Лист-відповідь не належить до вказаного ланцюжка.');
  }

  const from = mailboxResolveComposeFrom_(payload.from);
  let to = mailboxNormalizeAddresses_(payload.to, 'to');
  const cc = mailboxNormalizeAddresses_(payload.cc, 'cc');
  const bcc = mailboxNormalizeAddresses_(payload.bcc, 'bcc');
  if (!to.length && reply && reply.replyAddress) to = [reply.replyAddress];
  if (to.length + cc.length + bcc.length > MAILBOX_CLIENT_CONFIG_.MAX_RECIPIENTS) {
    throw mailboxError_('INVALID_RECIPIENT', 'У листі забагато одержувачів.');
  }
  if (sending && !to.length && !cc.length && !bcc.length) {
    throw mailboxError_('INVALID_RECIPIENT', 'Додайте хоча б одного одержувача.');
  }

  let subject = mailboxSafeComposeHeader_(payload.subject, 'Тема', MAILBOX_CLIENT_CONFIG_.MAX_SUBJECT_CHARS);
  if (!subject && reply) subject = mailboxReplySubject_(reply.subject);
  const bodyText = mailboxNormalizeBody_(payload.bodyText);
  const bodyHtmlSource = mailboxNormalizeBodyHtmlSource_(payload.bodyHtml);
  const attachments = mailboxNormalizeOutgoingAttachments_(payload.attachments);
  const inlineAttachments = mailboxNormalizeOutgoingInlineAttachments_(payload.inlineAttachments);
  return {
    threadId: reply ? reply.threadId : requestedThreadId,
    to,
    cc,
    bcc,
    from: from.sendAsEmail,
    fromHeader: mailboxSendAsHeader_(from),
    subject,
    bodyText,
    bodyHtml: '',
    bodyHtmlSource,
    attachments,
    inlineAttachments,
    inReplyTo: reply ? reply.messageIdHeader : '',
    references: reply ? reply.references : '',
  };
}

function mailboxResolveComposeFrom_(value) {
  const requestedHeader = mailboxSafeComposeHeader_(value, 'Від', 254);
  const requested = requestedHeader ? mailboxSafeEmail_(requestedHeader) : '';
  if (requestedHeader && !requested) {
    throw mailboxError_('INVALID_FROM', 'Адреса відправника має некоректний формат.');
  }
  const aliases = mailboxComposeSendAs_(requested);
  const selected = requested
    ? aliases.find(alias => String(alias.sendAsEmail).toLowerCase() === requested.toLowerCase())
    : aliases.find(alias => alias.isDefault) || aliases.find(alias => alias.isPrimary) || aliases[0];
  if (!selected) {
    throw mailboxError_(
      'INVALID_FROM',
      'Ця адреса не підтверджена в налаштуваннях Gmail «Надсилати листи як».'
    );
  }
  return selected;
}

function mailboxSendAsHeader_(aliasValue) {
  const alias = aliasValue || {};
  const email = mailboxSafeEmail_(alias.sendAsEmail);
  if (!email) throw mailboxError_('INVALID_FROM', 'Gmail повернув некоректну адресу відправника.');
  const displayName = mailboxSafeHeader_(alias.displayName, 300);
  if (!displayName) return email;
  const encodedName = /^[\x20-\x7e]+$/.test(displayName)
    ? '"' + displayName.replace(/(["\\])/g, '\\$1') + '"'
    : mailboxEncodeMimeHeader_(displayName);
  return encodedName + ' <' + email + '>';
}

function mailboxReplyContext_(messageIdValue) {
  const messageId = mailboxRequireGmailId_(messageIdValue, 'replyMessageId');
  const query = mailboxMetadataQuery_([
    'From', 'Reply-To', 'To', 'Cc', 'Subject', 'Message-ID', 'References',
  ]);
  const message = gmailApiRequest_(
    '/messages/' + encodeURIComponent(messageId) + '?' + query,
    { method: 'get' }
  );
  const headers = headersObject_((message.payload && message.payload.headers) || []);
  const recipients = mailboxReplyRecipientsFromHeaders_(headers);
  const messageIdHeader = mailboxSafeMessageIdHeader_(headers['message-id']);
  const references = mailboxBuildReferences_(headers.references, messageIdHeader);
  return {
    threadId: mailboxRequireGmailId_(message.threadId, 'threadId'),
    replyAddress: recipients.replyTo[0] || '',
    subject: mailboxSafeHeader_(headers.subject, MAILBOX_CLIENT_CONFIG_.MAX_SUBJECT_CHARS),
    messageIdHeader,
    references,
  };
}

function mailboxBuildReplyPreset_(messages, subjectValue) {
  const ordered = (messages || []).slice().sort(mailboxCompareMessages_);
  const latest = ordered[ordered.length - 1] || {};
  const headers = headersObject_((latest.payload && latest.payload.headers) || []);
  const recipients = mailboxReplyRecipientsFromHeaders_(headers);
  const subject = mailboxReplySubject_(subjectValue || headers.subject);
  return {
    messageId: mailboxSafeGmailId_(latest.id),
    subject: mailboxSafeHeader_(subject, MAILBOX_CLIENT_CONFIG_.MAX_SUBJECT_CHARS),
    canReply: Boolean(recipients.replyTo.length),
    canReplyAll: recipients.replyAllTo.length + recipients.replyAllCc.length > 1,
    reply: {
      to: recipients.replyTo.slice(0, 1).join(', '),
      cc: '',
    },
    replyAll: {
      to: recipients.replyAllTo.join(', '),
      cc: recipients.replyAllCc.join(', '),
    },
  };
}

function mailboxReplyRecipientsFromHeaders_(headersValue) {
  const headers = headersValue || {};
  const accountContext = mailboxCurrentAccountContext_();
  const owner = mailboxCanonicalOwnerAddress_(
    accountContext && accountContext.email
      ? accountContext.email
      : (typeof CONFIG === 'object' && CONFIG ? CONFIG.GMAIL_ACCOUNT : '')
  );
  const from = mailboxAddressListSafe_(headers.from);
  const explicitReplyTo = mailboxAddressListSafe_(headers['reply-to']);
  const to = mailboxAddressListSafe_(headers.to);
  const cc = mailboxAddressListSafe_(headers.cc);
  const withoutOwner = values => mailboxUniqueAddresses_(values).filter(address =>
    !owner || mailboxCanonicalOwnerAddress_(address) !== owner
  );
  const senderIsOwner = Boolean(owner && from.some(address =>
    mailboxCanonicalOwnerAddress_(address) === owner
  ));
  let primary = senderIsOwner
    ? withoutOwner(to)
    : withoutOwner(explicitReplyTo.length ? explicitReplyTo : from);
  if (!primary.length && senderIsOwner) primary = withoutOwner(cc);

  let replyAllTo = senderIsOwner
    ? withoutOwner(to)
    : withoutOwner(primary.concat(to));
  let replyAllCc = withoutOwner(cc).filter(address =>
    !replyAllTo.some(existing => existing.toLowerCase() === address.toLowerCase())
  );
  if (!replyAllTo.length && replyAllCc.length) {
    replyAllTo = [replyAllCc[0]];
    replyAllCc = replyAllCc.slice(1);
  }
  return {
    replyTo: primary.slice(0, 1),
    replyAllTo: replyAllTo.slice(0, MAILBOX_CLIENT_CONFIG_.MAX_RECIPIENTS),
    replyAllCc: replyAllCc.slice(0, Math.max(
      0,
      MAILBOX_CLIENT_CONFIG_.MAX_RECIPIENTS - replyAllTo.length
    )),
  };
}

/**
 * Gmail treats dots in the local part as insignificant, accepts +tags, and
 * aliases googlemail.com to gmail.com. Apply those rules only to Gmail domains;
 * other providers may treat dots and plus signs as distinct mailboxes.
 */
function mailboxCanonicalOwnerAddress_(value) {
  const address = mailboxSafeEmail_(value).toLowerCase();
  const at = address.lastIndexOf('@');
  if (at <= 0) return address;
  let local = address.slice(0, at);
  let domain = address.slice(at + 1);
  if (domain === 'googlemail.com') domain = 'gmail.com';
  if (domain === 'gmail.com') {
    local = local.split('+', 1)[0].replace(/\./g, '');
  }
  return local + '@' + domain;
}

function mailboxAddressListSafe_(value) {
  try {
    return mailboxNormalizeAddresses_(value, 'replyPreset');
  } catch (error) {
    return mailboxSplitAddressList_(String(value || '')).map(item => senderEmail_(item))
      .filter(address => mailboxIsEmail_(address));
  }
}

function mailboxUniqueAddresses_(values) {
  const seen = new Set();
  const output = [];
  (values || []).forEach(value => {
    const address = mailboxSafeEmail_(value);
    const key = address.toLowerCase();
    if (!address || seen.has(key)) return;
    seen.add(key);
    output.push(address);
  });
  return output;
}

function mailboxReplySubject_(subjectValue) {
  const subject = String(subjectValue || '').trim();
  if (!subject) return 'Re:';
  return /^\s*re\s*:/i.test(subject) ? subject : 'Re: ' + subject;
}

function mailboxNormalizeAddresses_(value, fieldName) {
  if (value === undefined || value === null || value === '') return [];
  const values = Array.isArray(value) ? value : mailboxSplitAddressList_(String(value));
  const result = [];
  values.forEach(item => {
    const raw = String(item || '').trim();
    if (!raw) return;
    if (/[\r\n\u0000]/.test(raw) || raw.length > 500) {
      throw mailboxError_('INVALID_RECIPIENT', 'Некоректна адреса в полі ' + fieldName + '.');
    }
    const bracketed = raw.match(/<\s*([^<>\s]+@[^<>\s]+)\s*>\s*$/);
    const address = (bracketed ? bracketed[1] : raw).trim();
    if (!mailboxIsEmail_(address)) {
      throw mailboxError_('INVALID_RECIPIENT', 'Некоректна email-адреса в полі ' + fieldName + '.');
    }
    if (result.indexOf(address) === -1) result.push(address);
  });
  return result;
}

function mailboxSplitAddressList_(value) {
  const output = [];
  let current = '';
  let quoted = false;
  let angleDepth = 0;
  for (let index = 0; index < value.length; index += 1) {
    const character = value.charAt(index);
    if (character === '"' && value.charAt(index - 1) !== '\\') quoted = !quoted;
    if (!quoted && character === '<') angleDepth += 1;
    if (!quoted && character === '>' && angleDepth > 0) angleDepth -= 1;
    if (!quoted && angleDepth === 0 && (character === ',' || character === ';')) {
      output.push(current);
      current = '';
    } else {
      current += character;
    }
  }
  output.push(current);
  return output;
}

function mailboxIsEmail_(address) {
  const value = String(address || '');
  if (!value || value.length > 254 || /[^\x21-\x7e]/.test(value)) return false;
  const at = value.lastIndexOf('@');
  if (at <= 0 || at >= value.length - 3) return false;
  const local = value.slice(0, at);
  const domain = value.slice(at + 1);
  if (local.length > 64 || domain.length > 253 || local.startsWith('.') || local.endsWith('.') || local.indexOf('..') !== -1) {
    return false;
  }
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;
  if (!/^[A-Za-z0-9.-]+$/.test(domain) || domain.indexOf('.') === -1 || domain.indexOf('..') !== -1) return false;
  return domain.split('.').every(label =>
    Boolean(label) && label.length <= 63 && !label.startsWith('-') && !label.endsWith('-')
  );
}

function mailboxSafeComposeHeader_(value, fieldName, maxLength) {
  const text = value === undefined || value === null ? '' : String(value);
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw mailboxError_('INVALID_HEADER', fieldName + ' містить недопустимий перенос рядка.');
  }
  if (Array.from(text).length > maxLength) {
    throw mailboxError_('INVALID_HEADER', fieldName + ' задовга.');
  }
  return text.trim();
}

function mailboxNormalizeBody_(value) {
  const text = value === undefined || value === null ? '' : String(value);
  if (text.length > MAILBOX_CLIENT_CONFIG_.MAX_BODY_CHARS) {
    throw mailboxError_('BODY_TOO_LARGE', 'Текст листа завеликий.');
  }
  return text.replace(/\u0000/g, '').replace(/\r\n|\r|\n/g, '\r\n');
}

function mailboxNormalizeBodyHtmlSource_(value) {
  if (value === undefined || value === null || value === '') return '';
  const source = String(value);
  if (source.length > MAILBOX_CLIENT_CONFIG_.MAX_HTML_CHARS * 2) {
    throw mailboxError_('BODY_TOO_LARGE', 'HTML-версія листа завелика.');
  }
  return source.replace(/\u0000/g, '');
}

function mailboxNormalizeBodyHtml_(value) {
  return mailboxFinalizeComposeHtml_(mailboxNormalizeBodyHtmlSource_(value), []);
}

function mailboxNormalizeOutgoingAttachments_(value) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    throw mailboxError_('INVALID_ATTACHMENT', 'Вкладення повинні бути списком файлів.');
  }
  if (value.length > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS) {
    throw mailboxError_(
      'TOO_MANY_ATTACHMENTS',
      'До одного листа можна додати не більше ' +
        MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS + ' вкладень.'
    );
  }
  let totalBytes = 0;
  const usedTokens = new Set();
  return value.map((item, index) => {
    if (!mailboxIsPlainObject_(item)) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Вкладення №' + (index + 1) + ' має некоректний формат.');
    }
    const hasSource = Object.prototype.hasOwnProperty.call(item, 'source');
    mailboxAssertAllowedKeys_(
      item,
      hasSource ? ['token', 'source'] : ['token', 'name', 'mimeType', 'dataBase64', 'dataBase64Url']
    );
    const token = item.token === undefined || item.token === null || item.token === ''
      ? ''
      : mailboxRequireInlineToken_(item.token, index);
    if (token && usedTokens.has(token)) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Токен вкладення не може повторюватися.');
    }
    if (token) usedTokens.add(token);
    const resolved = hasSource
      ? mailboxResolveAttachmentSourceBytes_(
          item.source,
          MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENT_BYTES
        )
      : null;
    const name = resolved
      ? mailboxNormalizeAttachmentName_(resolved.metadata.name, index)
      : mailboxNormalizeAttachmentName_(item.name, index);
    const mimeType = resolved
      ? mailboxNormalizeOutgoingMimeType_(resolved.metadata.mimeType, index)
      : mailboxNormalizeOutgoingMimeType_(item.mimeType, index);
    const decoded = resolved ? { bytes: resolved.bytes } : mailboxDecodeOutgoingAttachment_(item, index);
    if (decoded.bytes.length > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENT_BYTES) {
      throw mailboxError_(
        'ATTACHMENT_TOO_LARGE',
        'Файл «' + mailboxSafeText_(name, 100) + '» перевищує дозволений розмір.'
      );
    }
    totalBytes += decoded.bytes.length;
    if (totalBytes > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES) {
      throw mailboxError_(
        'ATTACHMENTS_TOO_LARGE',
        'Загальний розмір вкладень перевищує 15 МБ.'
      );
    }
    const attachment = {
      name,
      mimeType,
      size: decoded.bytes.length,
      dataBase64: mailboxStandardBase64_(decoded.bytes),
    };
    if (token) {
      attachment.token = token;
      attachment.contentId = mailboxGenerateInlineContentId_();
    }
    return attachment;
  });
}

function mailboxNormalizeOutgoingInlineAttachments_(value) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    throw mailboxError_('INVALID_INLINE_IMAGE', 'Вбудовані зображення повинні бути списком файлів.');
  }
  if (value.length > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS) {
    throw mailboxError_(
      'TOO_MANY_ATTACHMENTS',
      'До одного листа можна додати не більше ' + MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS + ' файлів.'
    );
  }
  let totalBytes = 0;
  const usedTokens = new Set();
  return value.map((item, index) => {
    if (!mailboxIsPlainObject_(item)) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'Вбудоване зображення №' + (index + 1) + ' має некоректний формат.');
    }
    mailboxAssertAllowedKeys_(item, ['token', 'name', 'mimeType', 'dataBase64', 'dataBase64Url']);
    const token = mailboxRequireInlineToken_(item.token, index);
    if (usedTokens.has(token)) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'Токен вбудованого зображення не може повторюватися.');
    }
    usedTokens.add(token);
    const name = mailboxNormalizeAttachmentName_(item.name, index);
    const mimeType = mailboxRequireInlineImageMimeType_(item.mimeType, index);
    const decoded = mailboxDecodeOutgoingAttachment_(item, index);
    if (decoded.bytes.length > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENT_BYTES) {
      throw mailboxError_('ATTACHMENT_TOO_LARGE', 'Зображення «' + mailboxSafeText_(name, 100) + '» перевищує дозволений розмір.');
    }
    if (!mailboxInlineImageMagicMatches_(mimeType, decoded.bytes)) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'Вміст зображення «' + mailboxSafeText_(name, 100) + '» не відповідає його MIME-типу.');
    }
    totalBytes += decoded.bytes.length;
    if (totalBytes > MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENTS_TOTAL_BYTES) {
      throw mailboxError_('ATTACHMENTS_TOO_LARGE', 'Загальний розмір вкладень перевищує 15 МБ.');
    }
    return {
      token,
      contentId: mailboxGenerateInlineContentId_(),
      name,
      mimeType,
      size: decoded.bytes.length,
      dataBase64: mailboxStandardBase64_(decoded.bytes),
      inline: true,
    };
  });
}

function mailboxFinalizeComposeHtml_(sourceValue, inlineAttachmentsValue, regularAttachmentsValue) {
  const source = String(sourceValue || '');
  const inlineAttachments = inlineAttachmentsValue || [];
  const regularAttachments = regularAttachmentsValue || [];
  const byToken = new Map();
  inlineAttachments.forEach((attachment, index) => {
    const token = mailboxRequireInlineToken_(attachment && attachment.token, index);
    if (byToken.has(token)) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'Токен вбудованого зображення не може повторюватися.');
    }
    byToken.set(token, attachment);
  });
  const regularByToken = new Map();
  regularAttachments.forEach((attachment, index) => {
    const rawToken = attachment && attachment.token;
    if (!rawToken) return;
    const token = mailboxRequireInlineToken_(rawToken, index);
    if (byToken.has(token) || regularByToken.has(token)) {
      throw mailboxError_('INVALID_ATTACHMENT', 'Токен вкладення не може повторюватися.');
    }
    regularByToken.set(token, attachment);
  });
  const allTokens = new Set(Array.from(byToken.keys()).concat(Array.from(regularByToken.keys())));
  const referenced = mailboxValidateComposeImageSources_(source, allTokens);
  for (const token of byToken.keys()) {
    if (!referenced.has(token)) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'Кожне вбудоване зображення має бути розміщене в тексті листа.');
    }
  }
  for (const token of referenced) {
    const regular = regularByToken.get(token);
    if (regular && !mailboxIsAllowedInlineImageMimeType_(regular.mimeType)) {
      throw mailboxError_('INVALID_INLINE_IMAGE', 'У тексті листа можна розмістити лише PNG, JPEG, GIF або WebP.');
    }
  }
  const sanitized = mailboxSanitizeHtml_(source, {
    allowedTokens: new Set(byToken.keys()),
    allowedAttachmentTokens: new Set(regularByToken.keys()),
  })
    .replace(/\r\n|\r|\n/g, '\r\n');
  const sanitizedTokens = mailboxValidateComposeImageSources_(sanitized, allTokens);
  for (const token of byToken.keys()) {
    if (!sanitizedTokens.has(token)) {
      throw mailboxError_('BODY_TOO_LARGE', 'HTML-версія листа обрізала вбудоване зображення. Скоротіть лист.');
    }
  }
  return sanitized.replace(/\bsrc="inline:([A-Za-z0-9._-]+)"/g, (match, token) => {
    const attachment = byToken.get(token);
    const contentId = mailboxSafeInlineContentId_(attachment && attachment.contentId);
    if (!contentId) throw mailboxError_('INVALID_INLINE_IMAGE', 'Сервер не зміг створити Content-ID зображення.');
    return 'src="cid:' + mailboxEscapeHtmlAttribute_(contentId) + '"';
  }).replace(/\bsrc="attachment:([A-Za-z0-9._-]+)"/g, (match, token) => {
    const attachment = regularByToken.get(token);
    const contentId = mailboxSafeInlineContentId_(attachment && attachment.contentId);
    if (!contentId) throw mailboxError_('INVALID_INLINE_IMAGE', 'Сервер не зміг створити Content-ID вкладення.');
    return 'src="cid:' + mailboxEscapeHtmlAttribute_(contentId) + '"';
  });
}

function mailboxValidateComposeImageSources_(htmlValue, allowedTokens) {
  const html = String(htmlValue || '');
  const referenced = new Set();
  const imagePattern = /<\s*img\b[^>]*>/gi;
  let match;
  while ((match = imagePattern.exec(html)) !== null) {
    const sourceMatches = Array.from(match[0].matchAll(
      /\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi
    ));
    if (sourceMatches.length !== 1) continue;
    const source = decodeHtmlEntities_(
      sourceMatches[0][1] || sourceMatches[0][2] || sourceMatches[0][3] || ''
    ).trim();
    const tokenMatch = source.match(/^(?:inline|attachment):([A-Za-z0-9._-]+)$/);
    const token = tokenMatch ? mailboxSafeInlineToken_(tokenMatch[1]) : '';
    if (/^(?:inline|attachment):/i.test(source) && (!token || !allowedTokens.has(token))) {
      throw mailboxError_(
        'INVALID_INLINE_IMAGE',
        'Зображення в HTML може посилатися лише на завантажений inline-токен або токен вкладення.'
      );
    }
    if (token && allowedTokens.has(token)) referenced.add(token);
  }
  // Malformed, remote, data:, blob: and javascript: image tags are discarded
  // by the sanitizer below. They never become outgoing MIME references.
  return referenced;
}

function mailboxRequireInlineToken_(value, index) {
  const token = mailboxSafeInlineToken_(value);
  if (!token) {
    throw mailboxError_('INVALID_INLINE_IMAGE', 'Некоректний токен вбудованого зображення №' + (Number(index) + 1) + '.');
  }
  return token;
}

function mailboxSafeInlineToken_(value) {
  const token = String(value || '');
  const max = MAILBOX_CLIENT_CONFIG_.MAX_INLINE_IMAGE_TOKEN_CHARS;
  return token && token.length <= max && /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(token) ? token : '';
}

function mailboxRequireInlineImageMimeType_(value, index) {
  const mimeType = mailboxNormalizeOutgoingMimeType_(value, index);
  if (!mailboxIsAllowedInlineImageMimeType_(mimeType)) {
    throw mailboxError_('INVALID_INLINE_IMAGE', 'Вбудоване зображення повинно бути PNG, JPEG, GIF або WebP.');
  }
  return mimeType;
}

function mailboxIsAllowedInlineImageMimeType_(value) {
  return ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
    .indexOf(String(value || '').toLowerCase()) !== -1;
}

function mailboxInlineImageMagicMatches_(mimeTypeValue, bytesValue) {
  const mimeType = String(mimeTypeValue || '').toLowerCase();
  const bytes = Array.from(bytesValue || [], value => Number(value) & 255);
  if (mimeType === 'image/png') {
    return bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10]
      .every((value, index) => bytes[index] === value);
  }
  if (mimeType === 'image/jpeg') {
    return bytes.length >= 4 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  }
  if (mimeType === 'image/gif') {
    const signature = bytes.slice(0, 6).map(value => String.fromCharCode(value)).join('');
    return signature === 'GIF87a' || signature === 'GIF89a';
  }
  if (mimeType === 'image/webp') {
    const riff = bytes.slice(0, 4).map(value => String.fromCharCode(value)).join('');
    const webp = bytes.slice(8, 12).map(value => String.fromCharCode(value)).join('');
    return bytes.length >= 12 && riff === 'RIFF' && webp === 'WEBP';
  }
  return false;
}

function mailboxGenerateInlineContentId_() {
  const uuid = String(Utilities.getUuid()).replace(/[^A-Za-z0-9]/g, '').slice(0, 64);
  return mailboxSafeInlineContentId_('inline.' + uuid + '@gmail-telegram.local');
}

function mailboxSafeInlineContentId_(value) {
  const contentId = String(value || '').trim().replace(/^<|>$/g, '');
  if (!contentId || contentId.length > MAILBOX_CLIENT_CONFIG_.MAX_INLINE_CONTENT_ID_CHARS ||
      /[\u0000-\u0020\u007f<>"\\]/.test(contentId)) {
    return '';
  }
  return /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.@-]+$/.test(contentId) ? contentId : '';
}

function mailboxNormalizeAttachmentName_(value, index) {
  const name = String(value === undefined || value === null ? '' : value).trim();
  const nameBytes = Utilities.newBlob(name, 'text/plain; charset=UTF-8').getBytes().length;
  if (!name || name === '.' || name === '..' || /[\u0000-\u001f\u007f\\/]/.test(name) ||
      Array.from(name).length > MAILBOX_CLIENT_CONFIG_.MAX_ATTACHMENT_NAME_CHARS ||
      nameBytes > MAILBOX_CLIENT_CONFIG_.MAX_ATTACHMENT_NAME_BYTES) {
    throw mailboxError_(
      'INVALID_ATTACHMENT',
      'Некоректне ім’я вкладення №' + (index + 1) + '.'
    );
  }
  return name;
}

function mailboxNormalizeOutgoingMimeType_(value, index) {
  const mime = String(value || 'application/octet-stream').toLowerCase();
  if (mime.length > 127 || !/^[a-z0-9!#$&^_.+-]+\/[a-z0-9!#$&^_.+-]+$/.test(mime)) {
    throw mailboxError_(
      'INVALID_ATTACHMENT',
      'Некоректний MIME-тип вкладення №' + (index + 1) + '.'
    );
  }
  return mime;
}

function mailboxDecodeOutgoingAttachment_(item, index) {
  const hasStandard = Object.prototype.hasOwnProperty.call(item, 'dataBase64');
  const hasWebSafe = Object.prototype.hasOwnProperty.call(item, 'dataBase64Url');
  if (hasStandard === hasWebSafe) {
    throw mailboxError_(
      'INVALID_ATTACHMENT',
      'Вкладення №' + (index + 1) + ' повинно містити рівно одне base64-поле.'
    );
  }
  const encoded = String(hasStandard ? item.dataBase64 : item.dataBase64Url);
  const maxEncoded = Math.ceil(
    MAILBOX_CLIENT_CONFIG_.MAX_OUTGOING_ATTACHMENT_BYTES * 4 / 3
  ) + 8;
  const pattern = hasStandard
    ? /^[A-Za-z0-9+/]*={0,2}$/
    : /^[A-Za-z0-9_-]*={0,2}$/;
  const core = encoded.replace(/=+$/g, '');
  if (encoded.length > maxEncoded || !pattern.test(encoded) || core.length % 4 === 1 ||
      (/=/.test(encoded) && encoded.length % 4 !== 0)) {
    throw mailboxError_(
      'INVALID_ATTACHMENT',
      'Вкладення №' + (index + 1) + ' має некоректні base64-дані.'
    );
  }
  const webSafe = (hasStandard ? core.replace(/\+/g, '-').replace(/\//g, '_') : core);
  let bytes = [];
  try {
    bytes = Utilities.base64DecodeWebSafe(webSafe);
  } catch (error) {
    throw mailboxError_(
      'INVALID_ATTACHMENT',
      'Вкладення №' + (index + 1) + ' має некоректні base64-дані.'
    );
  }
  const canonical = Utilities.base64EncodeWebSafe(bytes).replace(/=+$/g, '');
  if (canonical !== webSafe) {
    throw mailboxError_(
      'INVALID_ATTACHMENT',
      'Вкладення №' + (index + 1) + ' має некоректні base64-дані.'
    );
  }
  return { bytes };
}

function mailboxSafeMessageIdHeader_(value) {
  const text = String(value || '').trim();
  if (!text || text.length > 900 || /[\r\n\u0000]/.test(text)) return '';
  return /^<[^<>\s]+@[^<>\s]+>$/.test(text) ? text : '';
}

function mailboxBuildReferences_(existing, messageIdHeader) {
  const raw = String(existing || '');
  if (/[\r\n\u0000]/.test(raw) || raw.length > 8000) return messageIdHeader;
  const values = raw.match(/<[^<>\s]+@[^<>\s]+>/g) || [];
  if (messageIdHeader && values.indexOf(messageIdHeader) === -1) values.push(messageIdHeader);
  const bounded = values.slice(-20);
  while (bounded.join(' ').length > 900) bounded.shift();
  return bounded.join(' ');
}

function mailboxBuildMime_(compose) {
  const headers = [];
  headers.push('From: ' + compose.fromHeader);
  if (compose.to.length) headers.push(mailboxFoldAddressHeader_('To', compose.to));
  if (compose.cc.length) headers.push(mailboxFoldAddressHeader_('Cc', compose.cc));
  if (compose.bcc.length) headers.push(mailboxFoldAddressHeader_('Bcc', compose.bcc));
  headers.push('Subject: ' + mailboxEncodeMimeHeader_(compose.subject));
  if (compose.messageIdHeader) {
    headers.push('Message-ID: ' + mailboxSafeMessageIdHeader_(compose.messageIdHeader));
  }
  if (compose.inReplyTo) headers.push('In-Reply-To: ' + compose.inReplyTo);
  if (compose.references) headers.push('References: ' + compose.references);
  headers.push('MIME-Version: 1.0');
  const attachments = compose.attachments || [];
  const hasHtml = Boolean(compose.bodyHtml);
  let mime = '';
  if (!attachments.length) {
    if (!hasHtml) {
      headers.push('Content-Type: text/plain; charset=UTF-8');
      headers.push('Content-Transfer-Encoding: 8bit');
      mime = headers.join('\r\n') + '\r\n\r\n' + compose.bodyText + '\r\n';
    } else {
      const alternativeBoundary = mailboxMimeBoundary_('alternative');
      headers.push('Content-Type: multipart/alternative; boundary="' + alternativeBoundary + '"');
      mime = headers.join('\r\n') + '\r\n\r\n' +
        mailboxAlternativeMimeLines_(compose, alternativeBoundary).join('\r\n');
    }
  } else {
    const boundary = mailboxMimeBoundary_('mixed');
    headers.push('Content-Type: multipart/mixed; boundary="' + boundary + '"');
    const parts = ['--' + boundary];
    if (hasHtml) {
      const alternativeBoundary = mailboxMimeBoundary_('alternative');
      parts.push(
        'Content-Type: multipart/alternative; boundary="' + alternativeBoundary + '"',
        '',
        mailboxAlternativeMimeLines_(compose, alternativeBoundary).join('\r\n')
      );
    } else {
      parts.push(
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        '',
        compose.bodyText
      );
    }
    attachments.forEach(attachment => {
      const encodedName = mailboxEncodeRfc5987_(attachment.name);
      const fallbackName = mailboxAsciiAttachmentName_(attachment.name);
      const attachmentHeaders = [
        '--' + boundary,
        'Content-Type: ' + attachment.mimeType + '; name="' + fallbackName + '";\r\n' +
          " name*=UTF-8''" + encodedName,
        'Content-Transfer-Encoding: base64'
      ];
      const contentId = mailboxSafeInlineContentId_(attachment.contentId);
      if (contentId) attachmentHeaders.push('Content-ID: <' + contentId + '>');
      attachmentHeaders.push(
        'Content-Disposition: attachment; filename="' + fallbackName + '";\r\n' +
          " filename*=UTF-8''" + encodedName,
        '',
        mailboxFoldBase64_(attachment.dataBase64)
      );
      parts.push.apply(parts, attachmentHeaders);
    });
    parts.push('--' + boundary + '--', '');
    mime = headers.join('\r\n') + '\r\n\r\n' + parts.join('\r\n');
  }
  return Utilities.base64EncodeWebSafe(
    Utilities.newBlob(mime, 'message/rfc822').getBytes()
  ).replace(/=+$/g, '');
}

function mailboxMimeBoundary_(kindValue) {
  const kind = String(kindValue || 'part').replace(/[^A-Za-z0-9]/g, '').slice(0, 24) || 'part';
  return '=_gmail_telegram_' + kind + '_' +
    String(Utilities.getUuid()).replace(/[^A-Za-z0-9]/g, '');
}

function mailboxAlternativeMimeLines_(compose, boundary) {
  const lines = [
    '--' + boundary,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    compose.bodyText,
  ];
  const inlineAttachments = compose.inlineAttachments || [];
  if (!inlineAttachments.length) {
    lines.push(
      '--' + boundary,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      compose.bodyHtml
    );
  } else {
    const relatedBoundary = mailboxMimeBoundary_('related');
    lines.push(
      '--' + boundary,
      'Content-Type: multipart/related; type="text/html"; boundary="' + relatedBoundary + '"',
      '',
      '--' + relatedBoundary,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      compose.bodyHtml
    );
    inlineAttachments.forEach(attachment => {
      const encodedName = mailboxEncodeRfc5987_(attachment.name);
      const fallbackName = mailboxAsciiAttachmentName_(attachment.name);
      lines.push(
        '--' + relatedBoundary,
        'Content-Type: ' + attachment.mimeType + '; name="' + fallbackName + '";\r\n' +
          " name*=UTF-8''" + encodedName,
        'Content-Transfer-Encoding: base64',
        'Content-ID: <' + attachment.contentId + '>',
        'Content-Disposition: inline; filename="' + fallbackName + '";\r\n' +
          " filename*=UTF-8''" + encodedName,
        '',
        mailboxFoldBase64_(attachment.dataBase64)
      );
    });
    lines.push('--' + relatedBoundary + '--', '');
  }
  lines.push('--' + boundary + '--', '');
  return lines;
}

function mailboxEncodeRfc5987_(value) {
  return encodeURIComponent(String(value || '')).replace(/[!'()*]/g, character =>
    '%' + character.charCodeAt(0).toString(16).toUpperCase()
  );
}

function mailboxAsciiAttachmentName_(value) {
  const fallback = String(value || '')
    .replace(/[^\x20-\x7e]/g, '_')
    .replace(/["\\]/g, '_')
    .slice(0, 120);
  return fallback || 'attachment';
}

function mailboxFoldBase64_(value) {
  const encoded = String(value || '');
  const lines = [];
  for (let index = 0; index < encoded.length; index += 76) {
    lines.push(encoded.slice(index, index + 76));
  }
  return lines.join('\r\n');
}

function mailboxFoldAddressHeader_(name, addresses) {
  const lines = [];
  let current = name + ': ';
  (addresses || []).forEach((address, index) => {
    const addition = (index ? ', ' : '') + address;
    if (current.length + addition.length > 78 && current !== name + ': ') {
      lines.push(current + ',');
      current = ' ' + address;
    } else {
      current += addition;
    }
  });
  lines.push(current);
  return lines.join('\r\n');
}

function mailboxEncodeMimeHeader_(value) {
  const text = String(value || '');
  if (/^[\x20-\x7e]*$/.test(text)) return text;
  const characters = Array.from(text);
  if (!characters.length) return '';
  const words = [];
  let chunk = '';
  characters.forEach(character => {
    const candidate = chunk + character;
    const bytes = Utilities.newBlob(candidate, 'text/plain; charset=UTF-8').getBytes();
    if (bytes.length > 42 && chunk) {
      words.push(chunk);
      chunk = character;
    } else {
      chunk = candidate;
    }
  });
  if (chunk) words.push(chunk);
  return words.map(word => '=?UTF-8?B?' + mailboxStandardBase64_(
    Utilities.newBlob(word, 'text/plain; charset=UTF-8').getBytes()
  ) + '?=').join('\r\n ');
}

function mailboxStandardBase64_(bytes) {
  const webSafe = Utilities.base64EncodeWebSafe(bytes).replace(/=+$/g, '');
  const standard = webSafe.replace(/-/g, '+').replace(/_/g, '/');
  return standard + '='.repeat((4 - standard.length % 4) % 4);
}

function mailboxDraftDto_(draft) {
  const message = draft && draft.message ? draft.message : {};
  return {
    draftId: mailboxRequireGmailId_(draft && draft.id, 'draftId'),
    messageId: mailboxSafeGmailId_(message.id),
    threadId: mailboxSafeGmailId_(message.threadId),
    labelIds: mailboxSanitizeLabelIds_(message.labelIds || []),
  };
}

function mailboxSentMessageDto_(message) {
  return {
    id: mailboxRequireGmailId_(message && message.id, 'messageId'),
    threadId: mailboxRequireGmailId_(message && message.threadId, 'threadId'),
    historyId: mailboxSafeOpaqueToken_(message && message.historyId, 128),
    labelIds: mailboxSanitizeLabelIds_(message && message.labelIds || []),
    gmailUrl: mailboxGmailUrl_(message && message.threadId),
  };
}

function mailboxCreateSession_(ownerIdValue, userIdValue, refreshClaims) {
  const ownerId = String(ownerIdValue || '');
  const userId = String(userIdValue || '');
  if (!/^\d{1,24}$/.test(ownerId) || userId !== ownerId) {
    throw mailboxError_('FORBIDDEN', 'Сеанс пошти не належить Telegram-користувачу.');
  }
  const principal = mailboxMultiPrincipal_(userId);

  const now = Date.now();
  const refreshIssuedAt = refreshClaims ? Number(refreshClaims.iat) : undefined;
  const refreshExpiresAt = refreshClaims ? Number(refreshClaims.exp) : undefined;
  const token = mailboxRandomToken_();
  const credential = mailboxIssueRefreshCredential_(
    ownerId,
    refreshIssuedAt,
    refreshExpiresAt,
    refreshClaims ? refreshClaims.fid : undefined
  );
  const sessionExpiresAt = Math.min(
    now + MAILBOX_CLIENT_CONFIG_.SESSION_SECONDS * 1000,
    refreshClaims ? refreshExpiresAt * 1000 : Number.MAX_SAFE_INTEGER
  );
  const expiresInSeconds = Math.max(1, Math.ceil((sessionExpiresAt - now) / 1000));
  const session = {
    version: 2,
    ownerId,
    userId,
    zoneId: principal.zoneId,
    connectionId: principal.connectionId,
    role: principal.role,
    createdAt: now,
    lastSeenAt: now,
    expiresAt: sessionExpiresAt,
    familyId: credential.claims.fid,
  };
  mailboxPersistSessionFamily_(
    refreshClaims || null,
    credential.claims,
    token,
    session,
    expiresInSeconds
  );
  return {
    sessionToken: token,
    refreshToken: credential.token,
    expiresInSeconds,
  };
}

function mailboxIssueRefreshToken_(
  ownerIdValue,
  issuedAtSecondsValue,
  expiresAtSecondsValue,
  familyIdValue,
  jtiValue
) {
  return mailboxIssueRefreshCredential_(
    ownerIdValue,
    issuedAtSecondsValue,
    expiresAtSecondsValue,
    familyIdValue,
    jtiValue
  ).token;
}

function mailboxIssueRefreshCredential_(
  ownerIdValue,
  issuedAtSecondsValue,
  expiresAtSecondsValue,
  familyIdValue,
  jtiValue
) {
  const ownerId = String(ownerIdValue || '');
  if (!/^\d{1,24}$/.test(ownerId)) {
    throw mailboxError_('UNAUTHORIZED', 'Власник токена оновлення недійсний.');
  }
  const nowSeconds = issuedAtSecondsValue === undefined
    ? Math.floor(Date.now() / 1000)
    : Number(issuedAtSecondsValue);
  if (!Number.isInteger(nowSeconds) || nowSeconds < 1) {
    throw mailboxError_('UNAUTHORIZED', 'Час токена оновлення недійсний.');
  }
  const expiresAtSeconds = expiresAtSecondsValue === undefined
    ? nowSeconds + MAILBOX_CLIENT_CONFIG_.REFRESH_TOKEN_SECONDS
    : Number(expiresAtSecondsValue);
  if (!Number.isInteger(expiresAtSeconds) ||
      expiresAtSeconds - nowSeconds !== MAILBOX_CLIENT_CONFIG_.REFRESH_TOKEN_SECONDS) {
    throw mailboxError_('UNAUTHORIZED', 'Термін токена оновлення недійсний.');
  }
  const familyId = familyIdValue === undefined
    ? mailboxRandomToken_()
    : String(familyIdValue || '');
  const jti = jtiValue === undefined ? mailboxRandomToken_() : String(jtiValue || '');
  if (!/^[A-Za-z0-9_-]{43}$/.test(familyId) || !/^[A-Za-z0-9_-]{43}$/.test(jti)) {
    throw mailboxError_('UNAUTHORIZED', 'Родина токена оновлення недійсна.');
  }
  const payload = {
    v: 1,
    sub: ownerId,
    iat: nowSeconds,
    exp: expiresAtSeconds,
    fid: familyId,
    jti,
  };
  const payloadBytes = Utilities.newBlob(
    JSON.stringify(payload),
    'application/json'
  ).getBytes();
  const encodedPayload = Utilities.base64EncodeWebSafe(payloadBytes).replace(/=+$/g, '');
  const signingInput = MAILBOX_CLIENT_CONFIG_.REFRESH_TOKEN_PREFIX + '.' + encodedPayload;
  const signature = Utilities.base64EncodeWebSafe(
    Utilities.computeHmacSha256Signature(signingInput, mailboxRefreshSigningSecret_())
  ).replace(/=+$/g, '');
  return {
    token: signingInput + '.' + signature,
    claims: payload,
  };
}

function mailboxVerifyRefreshToken_(tokenValue) {
  const token = String(tokenValue || '');
  const pattern = new RegExp(
    '^' + MAILBOX_CLIENT_CONFIG_.REFRESH_TOKEN_PREFIX +
      '\\.([A-Za-z0-9_-]{40,384})\\.([A-Za-z0-9_-]{43})$'
  );
  const match = token.match(pattern);
  if (!match) {
    throw mailboxError_('UNAUTHORIZED', 'Токен оновлення сеансу недійсний.');
  }

  const signingInput = MAILBOX_CLIENT_CONFIG_.REFRESH_TOKEN_PREFIX + '.' + match[1];
  const expectedSignature = Utilities.base64EncodeWebSafe(
    Utilities.computeHmacSha256Signature(signingInput, mailboxRefreshSigningSecret_())
  ).replace(/=+$/g, '');
  if (!constantTimeEqual_(expectedSignature, match[2])) {
    throw mailboxError_('UNAUTHORIZED', 'Підпис токена оновлення недійсний.');
  }

  let claims = null;
  try {
    const json = Utilities.newBlob(
      mailboxDecodeCanonicalBase64UrlBytes_(match[1])
    ).getDataAsString();
    claims = JSON.parse(json);
  } catch (error) {
    claims = null;
  }
  const expectedKeys = ['exp', 'fid', 'iat', 'jti', 'sub', 'v'];
  const actualKeys = claims && mailboxIsPlainObject_(claims)
    ? Object.keys(claims).sort()
    : [];
  const structurallyValid = actualKeys.length === expectedKeys.length &&
    actualKeys.every((key, index) => key === expectedKeys[index]) &&
    claims.v === 1 && /^\d{1,24}$/.test(String(claims.sub || '')) &&
    Number.isInteger(claims.iat) && Number.isInteger(claims.exp) &&
    /^[A-Za-z0-9_-]{43}$/.test(String(claims.fid || '')) &&
    /^[A-Za-z0-9_-]{43}$/.test(String(claims.jti || '')) &&
    claims.iat > 0 && claims.exp > claims.iat &&
    claims.exp - claims.iat === MAILBOX_CLIENT_CONFIG_.REFRESH_TOKEN_SECONDS;
  if (!structurallyValid) {
    throw mailboxError_('UNAUTHORIZED', 'Вміст токена оновлення недійсний.');
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (claims.iat > nowSeconds + 60) {
    throw mailboxError_('UNAUTHORIZED', 'Токен оновлення ще не набув чинності.');
  }
  if (claims.exp <= nowSeconds) {
    throw mailboxError_('SESSION_EXPIRED', 'Токен оновлення сеансу завершився. Відкрийте Mini App знову.');
  }
  mailboxMultiAuthorizeUser_(String(claims.sub), mailboxMultiPrincipal_(String(claims.sub)).registry);
  return claims;
}

function mailboxDecodeCanonicalBase64UrlBytes_(value) {
  const encoded = String(value || '');
  if (!encoded || !/^[A-Za-z0-9_-]+$/.test(encoded) || encoded.length % 4 === 1) {
    throw new Error('Invalid base64url payload.');
  }
  const paddingLength = (4 - (encoded.length % 4)) % 4;
  const padded = encoded + (paddingLength === 2 ? '==' : paddingLength === 1 ? '=' : '');
  const bytes = Utilities.base64DecodeWebSafe(padded);
  const canonical = Utilities.base64EncodeWebSafe(bytes).replace(/=+$/g, '');
  if (canonical !== encoded) {
    throw new Error('Non-canonical base64url payload.');
  }
  return bytes;
}

function mailboxPersistSessionFamily_(presentedClaims, nextClaims, token, session, expiresInSeconds) {
  const sessionToken = String(token || '');
  const nextSessionKey = mailboxSessionKey_(sessionToken);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    throw mailboxError_('BUSY', 'Сеанс пошти вже оновлюється. Спробуйте ще раз.');
  }
  try {
    const properties = PropertiesService.getScriptProperties();
    const nowSeconds = Math.floor(Date.now() / 1000);
    const families = mailboxReadRefreshFamilies_(properties, nowSeconds);
    const familyId = String(nextClaims && nextClaims.fid || '');
    const index = families.findIndex(item =>
      constantTimeEqual_(String(item.fid || ''), familyId)
    );
    let previousSessionKey = '';

    if (presentedClaims) {
      if (index === -1) {
        throw mailboxError_('SESSION_EXPIRED', 'Токен оновлення вже використано або завершився.');
      }
      const current = families[index];
      const sameFamily = constantTimeEqual_(String(current.sub), String(presentedClaims.sub)) &&
        Number(current.iat) === Number(presentedClaims.iat) &&
        Number(current.exp) === Number(presentedClaims.exp);
      if (!sameFamily) {
        throw mailboxError_('UNAUTHORIZED', 'Родина токена оновлення не збігається.');
      }
      const nextMatchesFamily = constantTimeEqual_(String(nextClaims.fid), String(presentedClaims.fid)) &&
        constantTimeEqual_(String(nextClaims.sub), String(presentedClaims.sub)) &&
        Number(nextClaims.iat) === Number(presentedClaims.iat) &&
        Number(nextClaims.exp) === Number(presentedClaims.exp);
      if (!nextMatchesFamily) {
        throw mailboxError_('UNAUTHORIZED', 'Оновлений токен змінив абсолютні межі родини.');
      }
      if (!constantTimeEqual_(String(current.jti), String(presentedClaims.jti))) {
        throw mailboxError_('SESSION_EXPIRED', 'Токен оновлення вже використано.');
      }
      previousSessionKey = String(current.sessionKey || '');
    } else {
      if (index !== -1) {
        throw mailboxError_('BUSY', 'Не вдалося створити унікальну родину сесії. Спробуйте ще раз.');
      }
      if (families.length >= MAILBOX_CLIENT_CONFIG_.REFRESH_FAMILY_LIMIT) {
        throw mailboxError_(
          'STORAGE_FULL',
          'Досягнуто ліміт активних сеансів пошти. Закрийте старий Mini App або спробуйте після завершення його сесії.'
        );
      }
    }

    const nextRecord = mailboxRefreshFamilyRecord_(nextClaims, nextSessionKey);
    if (index === -1) families.push(nextRecord);
    else families[index] = nextRecord;
    const serializedFamilies = JSON.stringify(families);
    mailboxAssertRefreshFamilyStorage_(properties, serializedFamilies);

    const cache = CacheService.getScriptCache();
    cache.put(nextSessionKey, JSON.stringify(session), expiresInSeconds);
    try {
      properties.setProperty(
        MAILBOX_CLIENT_CONFIG_.REFRESH_FAMILIES_PROPERTY,
        serializedFamilies
      );
    } catch (error) {
      try { cache.remove(nextSessionKey); } catch (cleanupError) {}
      throw mailboxError_('STORAGE_FULL', 'Не вдалося зберегти захищений стан сесії пошти.');
    }

    // The durable current-session digest above is the authority. Removing the
    // old cache entry is still attempted while the same lock is held; even if
    // CacheService is temporarily unavailable, mailboxRequireSession_ rejects
    // that bearer because it no longer matches the family record.
    if (previousSessionKey && !constantTimeEqual_(previousSessionKey, nextSessionKey)) {
      try { cache.remove(previousSessionKey); }
      catch (error) {
        console.error('Could not remove rotated mailbox session cache entry.');
      }
    }
  } finally {
    lock.releaseLock();
  }
}

function mailboxRefreshFamilyRecord_(claims, sessionKeyValue) {
  return {
    v: 1,
    fid: String(claims && claims.fid || ''),
    sub: String(claims && claims.sub || ''),
    iat: Number(claims && claims.iat || 0),
    exp: Number(claims && claims.exp || 0),
    jti: String(claims && claims.jti || ''),
    sessionKey: String(sessionKeyValue || ''),
  };
}

function mailboxReadRefreshFamilies_(properties, nowSecondsValue) {
  const raw = String(properties.getProperty(
    MAILBOX_CLIENT_CONFIG_.REFRESH_FAMILIES_PROPERTY
  ) || '');
  if (!raw) return [];
  let parsed = null;
  try { parsed = JSON.parse(raw); } catch (error) { parsed = null; }
  if (!Array.isArray(parsed)) {
    throw mailboxError_('SERVER_CONFIG', 'Стан родин поштових сесій пошкоджений.');
  }
  const nowSeconds = Number(nowSecondsValue || Math.floor(Date.now() / 1000));
  const seen = new Set();
  const active = [];
  parsed.forEach(record => {
    const expectedKeys = ['exp', 'fid', 'iat', 'jti', 'sessionKey', 'sub', 'v'];
    const keys = mailboxIsPlainObject_(record) ? Object.keys(record).sort() : [];
    const structurallyValid = keys.length === expectedKeys.length &&
      keys.every((key, index) => key === expectedKeys[index]) &&
      record.v === 1 && /^[A-Za-z0-9_-]{43}$/.test(String(record.fid || '')) &&
      /^\d{1,24}$/.test(String(record.sub || '')) &&
      Number.isInteger(record.iat) && Number.isInteger(record.exp) &&
      record.iat > 0 &&
      record.exp - record.iat === MAILBOX_CLIENT_CONFIG_.REFRESH_TOKEN_SECONDS &&
      /^[A-Za-z0-9_-]{43}$/.test(String(record.jti || '')) &&
      /^mailbox\.session\.v1\.[A-Za-z0-9_-]{43}$/.test(String(record.sessionKey || ''));
    if (!structurallyValid || seen.has(String(record.fid))) {
      throw mailboxError_('SERVER_CONFIG', 'Стан родин поштових сесій пошкоджений.');
    }
    seen.add(String(record.fid));
    // Expired records are the only records eligible for compaction.
    if (record.exp > nowSeconds) active.push(mailboxRefreshFamilyRecord_(record, record.sessionKey));
  });
  return active;
}

function mailboxAssertRefreshFamilyStorage_(properties, serializedFamilies) {
  try {
    assertTelegramPropertyValueFits_(
      MAILBOX_CLIENT_CONFIG_.REFRESH_FAMILIES_PROPERTY,
      serializedFamilies
    );
    assertTelegramPropertyStoreFits_(properties, {
      [MAILBOX_CLIENT_CONFIG_.REFRESH_FAMILIES_PROPERTY]: serializedFamilies,
    });
  } catch (error) {
    throw mailboxError_('STORAGE_FULL', 'Сховище активних поштових сесій тимчасово заповнене.');
  }
}

function mailboxRefreshFamilyOwnsSession_(familyIdValue, sessionKeyValue, ownerIdValue) {
  const familyId = String(familyIdValue || '');
  const sessionKey = String(sessionKeyValue || '');
  const ownerId = String(ownerIdValue || '');
  if (!/^[A-Za-z0-9_-]{43}$/.test(familyId) ||
      !/^mailbox\.session\.v1\.[A-Za-z0-9_-]{43}$/.test(sessionKey) ||
      !/^\d{1,24}$/.test(ownerId)) return false;
  const families = mailboxReadRefreshFamilies_(
    PropertiesService.getScriptProperties(),
    Math.floor(Date.now() / 1000)
  );
  return families.some(record =>
    constantTimeEqual_(String(record.fid), familyId) &&
    constantTimeEqual_(String(record.sessionKey), sessionKey) &&
    constantTimeEqual_(String(record.sub), ownerId)
  );
}

function mailboxRefreshSigningSecret_() {
  const properties = PropertiesService.getScriptProperties();
  const propertyName = MAILBOX_CLIENT_CONFIG_.REFRESH_SIGNING_SECRET_PROPERTY;
  let secret = String(properties.getProperty(propertyName) || '');
  if (secret && !/^[A-Za-z0-9_-]{43,128}$/.test(secret)) {
    throw mailboxError_('SERVER_CONFIG', 'Ключ підпису токенів оновлення пошкоджений.');
  }
  if (secret) return secret;

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    throw mailboxError_('BUSY', 'Сеанс пошти зараз налаштовується. Спробуйте ще раз.');
  }
  try {
    secret = String(properties.getProperty(propertyName) || '');
    if (secret && !/^[A-Za-z0-9_-]{43,128}$/.test(secret)) {
      throw mailboxError_('SERVER_CONFIG', 'Ключ підпису токенів оновлення пошкоджений.');
    }
    if (!secret) {
      secret = mailboxRandomToken_();
      properties.setProperty(propertyName, secret);
    }
    return secret;
  } finally {
    lock.releaseLock();
  }
}

function mailboxRequireSession_(tokenValue) {
  const token = String(tokenValue || '');
  if (!/^[A-Za-z0-9_-]{40,128}$/.test(token)) {
    throw mailboxError_('UNAUTHORIZED', 'Сеанс пошти недійсний. Відкрийте Mini App знову.');
  }
  const serialized = CacheService.getScriptCache().get(mailboxSessionKey_(token));
  if (!serialized) {
    throw mailboxError_('SESSION_EXPIRED', 'Сеанс пошти завершився. Відкрийте Mini App знову.');
  }
  let session = null;
  try { session = JSON.parse(serialized); } catch (error) { session = null; }
  if (!session || session.version !== 2 || !/^\d{1,24}$/.test(String(session.userId || '')) ||
      String(session.ownerId || '') !== String(session.userId || '')) {
    throw mailboxError_('UNAUTHORIZED', 'Сеанс пошти не належить Telegram-користувачу.');
  }
  mailboxMultiAuthorizeUser_(String(session.userId));
  const sessionKey = mailboxSessionKey_(token);
  if (!mailboxRefreshFamilyOwnsSession_(session.familyId, sessionKey, session.userId)) {
    mailboxRemoveSessionCacheBestEffort_(sessionKey);
    throw mailboxError_('SESSION_EXPIRED', 'Сеанс пошти відкликано або завершено.');
  }
  const createdAt = Number(session.createdAt || 0);
  const maximumExpiresAt = createdAt + MAILBOX_CLIENT_CONFIG_.SESSION_SECONDS * 1000;
  const expiresAt = Number(session.expiresAt || maximumExpiresAt);
  const now = Date.now();
  const age = now - createdAt;
  if (!createdAt || age < -60 * 1000 || !Number.isFinite(expiresAt) ||
      expiresAt <= createdAt || expiresAt > maximumExpiresAt || now >= expiresAt) {
    mailboxRemoveSessionCacheBestEffort_(sessionKey);
    throw mailboxError_('SESSION_EXPIRED', 'Сеанс пошти завершився. Відкрийте Mini App знову.');
  }
  return session;
}

function mailboxTouchSession_(token, session) {
  try {
    const sessionKey = mailboxSessionKey_(String(token));
    if (!mailboxRefreshFamilyOwnsSession_(session && session.familyId, sessionKey, session && session.ownerId)) {
      mailboxRemoveSessionCacheBestEffort_(sessionKey);
      return;
    }
    const updated = Object.assign({}, session, { lastSeenAt: Date.now() });
    const remainingSeconds = mailboxSessionRemainingSeconds_(session);
    CacheService.getScriptCache().put(
      sessionKey,
      JSON.stringify(updated),
      Math.min(MAILBOX_CLIENT_CONFIG_.SESSION_SECONDS, remainingSeconds)
    );
  } catch (error) {
    // Authentication already succeeded and mailboxDispatch_ already returned.
    // Session-cache maintenance must never rewrite a confirmed Gmail outcome.
    console.error('Could not maintain mailbox session cache after dispatch.');
  }
}

function mailboxRemoveSessionCacheBestEffort_(sessionKey) {
  try {
    CacheService.getScriptCache().remove(String(sessionKey || ''));
  } catch (error) {
    // The durable refresh-family record remains authoritative, so a stale cache
    // entry cannot authenticate. Cleanup failure must preserve SESSION_EXPIRED.
    console.error('Could not remove inactive mailbox session cache entry.');
  }
}

function mailboxSessionRemainingSeconds_(session) {
  const createdAt = Number(session && session.createdAt || 0);
  const maximumExpiresAt = createdAt + MAILBOX_CLIENT_CONFIG_.SESSION_SECONDS * 1000;
  const expiresAt = Number(session && session.expiresAt || maximumExpiresAt);
  return Math.max(1, Math.min(
    MAILBOX_CLIENT_CONFIG_.SESSION_SECONDS,
    Math.ceil((expiresAt - Date.now()) / 1000)
  ));
}

function mailboxOwnerId_() {
  const value = String(PropertiesService.getScriptProperties().getProperty('CHAT_ID') || '');
  if (!/^\d{1,24}$/.test(value)) {
    throw mailboxError_('SERVER_CONFIG', 'Власника поштової скриньки не налаштовано.');
  }
  return value;
}

function mailboxRandomToken_() {
  const entropy = [
    Utilities.getUuid(), Utilities.getUuid(), Utilities.getUuid(), String(Date.now()),
  ].join(':');
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    entropy,
    Utilities.Charset.UTF_8
  );
  return Utilities.base64EncodeWebSafe(bytes).replace(/=+$/g, '');
}

function mailboxSessionKey_(token) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(token || ''),
    Utilities.Charset.UTF_8
  );
  return MAILBOX_CLIENT_CONFIG_.SESSION_PREFIX +
    Utilities.base64EncodeWebSafe(digest).replace(/=+$/g, '');
}

function mailboxThreadState_(labelIds) {
  const labels = new Set(labelIds || []);
  return {
    inbox: labels.has('INBOX'),
    trash: labels.has('TRASH'),
    spam: labels.has('SPAM'),
    unread: labels.has('UNREAD'),
    starred: labels.has('STARRED'),
    important: labels.has('IMPORTANT'),
    draft: labels.has('DRAFT'),
    sent: labels.has('SENT'),
  };
}

function mailboxCollectLabelIds_(messages) {
  const set = new Set();
  (messages || []).forEach(message => {
    (message.labelIds || []).forEach(label => {
      const safe = mailboxSafeLabelId_(label, false);
      if (safe) set.add(safe);
    });
  });
  return Array.from(set).sort();
}

function mailboxSanitizeLabelIds_(values) {
  const set = new Set();
  (values || []).slice(0, 200).forEach(value => {
    const safe = mailboxSafeLabelId_(value, false);
    if (safe) set.add(safe);
  });
  return Array.from(set).sort();
}

function mailboxHasAttachment_(payload) {
  if (!payload) return false;
  if (String(payload.filename || '').trim()) return true;
  return (payload.parts || []).some(mailboxHasAttachment_);
}

function mailboxSenderDto_(value) {
  const safe = mailboxSafeHeader_(value, 1000);
  const email = mailboxSafeEmail_(senderEmail_(safe));
  return {
    name: mailboxSafeText_(senderName_(safe), 300),
    email,
    display: safe,
    avatarUrl: mailboxDomainLogoUrl_(email),
  };
}

/**
 * A deterministic sender-domain favicon is safer than reusing remote images
 * embedded in email HTML: it never calls a sender-controlled tracking pixel
 * and contains no mailbox address or local part.
 */
function mailboxDomainLogoUrl_(emailValue) {
  const email = mailboxSafeEmail_(emailValue);
  if (!email) return '';
  const domain = email.slice(email.lastIndexOf('@') + 1).toLowerCase();
  const personalDomains = new Set([
    'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com',
    'icloud.com', 'me.com', 'yahoo.com', 'proton.me', 'protonmail.com',
  ]);
  if (!domain || personalDomains.has(domain) ||
      !/^[a-z0-9.-]+$/.test(domain) || domain.indexOf('.') === -1 || domain.length > 253) {
    return '';
  }
  return 'https://www.google.com/s2/favicons?domain_url=' +
    encodeURIComponent('https://' + domain) + '&sz=128';
}

function mailboxGmailUrl_(threadIdValue) {
  const threadId = mailboxSafeGmailId_(threadIdValue);
  if (!threadId) return '';
  return 'https://mail.google.com/mail/?authuser=' +
    encodeURIComponent(String(CONFIG.GMAIL_ACCOUNT || '')) + '#all/' + encodeURIComponent(threadId);
}

function mailboxSanitizeHtml_(htmlValue, inlineImagePolicyValue) {
  let source = String(htmlValue || '').slice(0, MAILBOX_CLIENT_CONFIG_.MAX_HTML_CHARS * 2);
  if (!source) return '';
  const inlineImagePolicy = inlineImagePolicyValue || null;
  source = source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript|iframe|object|embed|form|svg|canvas|video|audio|head)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<(meta|link|base|input|button|textarea|select|option)\b[^>]*\/?\s*>/gi, '');
  const allowed = new Set([
    'a', 'b', 'blockquote', 'br', 'code', 'del', 'div', 'em', 'h1', 'h2', 'h3',
    'h4', 'h5', 'h6', 'hr', 'i', 'li', 'ol', 'p', 'pre', 's', 'span', 'strike',
    'strong', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'u', 'ul',
  ]);
  if (inlineImagePolicy) allowed.add('img');
  const voidTags = new Set(['br', 'hr', 'img']);
  const tagPattern = /<[^>]*>/g;
  let output = '';
  let cursor = 0;
  let match;
  while ((match = tagPattern.exec(source)) !== null && output.length < MAILBOX_CLIENT_CONFIG_.MAX_HTML_CHARS) {
    output += mailboxEscapeHtmlText_(source.slice(cursor, match.index));
    cursor = match.index + match[0].length;
    const parsed = match[0].match(/^<\s*(\/?)\s*([A-Za-z0-9]+)([\s\S]*?)\s*(\/?)>$/);
    if (!parsed) continue;
    const closing = Boolean(parsed[1]);
    const tag = parsed[2].toLowerCase();
    if (!allowed.has(tag)) continue;
    if (closing) {
      if (!voidTags.has(tag)) output += '</' + tag + '>';
      continue;
    }
    const attributes = [];
    if (tag === 'img') {
      const sourceMatches = Array.from(parsed[3].matchAll(
        /\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi
      ));
      const rawSource = sourceMatches.length === 1
        ? sourceMatches[0][1] || sourceMatches[0][2] || sourceMatches[0][3]
        : '';
      const safeSource = mailboxSanitizedInlineImageSource_(rawSource, inlineImagePolicy);
      if (!safeSource) continue;
      attributes.push('src="' + mailboxEscapeHtmlAttribute_(safeSource) + '"');
      const altMatch = parsed[3].match(/\balt\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i);
      if (altMatch) {
        const alt = mailboxSafeText_(
          decodeHtmlEntities_(altMatch[1] || altMatch[2] || altMatch[3] || ''),
          500
        );
        if (alt) attributes.push('alt="' + mailboxEscapeHtmlAttribute_(alt) + '"');
      }
      ['width', 'height'].forEach(name => {
        const dimensionMatch = parsed[3].match(new RegExp(
          '\\b' + name + '\\s*=\\s*(?:"([0-9]+)"|\'([0-9]+)\'|([0-9]+))',
          'i'
        ));
        const dimension = Number(dimensionMatch &&
          (dimensionMatch[1] || dimensionMatch[2] || dimensionMatch[3]));
        if (Number.isInteger(dimension) && dimension >= 1 && dimension <= 4096) {
          attributes.push(name + '="' + dimension + '"');
        }
      });
      const imageStyleMatch = parsed[3].match(/\bstyle\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i);
      const imageStyle = mailboxSanitizeComposeStyle_(
        imageStyleMatch && (imageStyleMatch[1] || imageStyleMatch[2] || imageStyleMatch[3]),
        tag
      );
      if (imageStyle) attributes.push('style="' + mailboxEscapeHtmlAttribute_(imageStyle) + '"');
      output += '<img ' + attributes.join(' ') + '>';
      continue;
    }
    if (tag === 'a') {
      const hrefMatch = parsed[3].match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i);
      const href = mailboxSafeLink_(hrefMatch && (hrefMatch[1] || hrefMatch[2] || hrefMatch[3]));
      if (href) {
        attributes.push('href="' + mailboxEscapeHtmlAttribute_(href) + '"');
        attributes.push('target="_blank"');
        attributes.push('rel="noopener noreferrer"');
      }
    }
    const styleMatch = parsed[3].match(/\bstyle\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i);
    let rawStyle = String(styleMatch && (styleMatch[1] || styleMatch[2] || styleMatch[3]) || '');
    const alignMatch = parsed[3].match(/\balign\s*=\s*(?:"(left|center|right|justify)"|'(left|center|right|justify)'|(left|center|right|justify))/i);
    if (alignMatch) rawStyle += ';text-align:' + (alignMatch[1] || alignMatch[2] || alignMatch[3]);
    const bgcolorMatch = parsed[3].match(/\bbgcolor\s*=\s*(?:"(#[0-9a-f]{3,6})"|'(#[0-9a-f]{3,6})'|(#[0-9a-f]{3,6}))/i);
    if (bgcolorMatch) rawStyle += ';background-color:' + (bgcolorMatch[1] || bgcolorMatch[2] || bgcolorMatch[3]);
    const widthMatch = parsed[3].match(/\bwidth\s*=\s*(?:"([0-9]{1,4}%?)"|'([0-9]{1,4}%?)'|([0-9]{1,4}%?))/i);
    if (widthMatch && tag !== 'img') {
      const rawWidth = widthMatch[1] || widthMatch[2] || widthMatch[3];
      rawStyle += ';width:' + (/%$/.test(rawWidth) ? rawWidth : rawWidth + 'px');
    }
    const style = mailboxSanitizeComposeStyle_(
      rawStyle,
      tag
    );
    if (style) attributes.push('style="' + mailboxEscapeHtmlAttribute_(style) + '"');
    output += '<' + tag + (attributes.length ? ' ' + attributes.join(' ') : '') + '>';
  }
  output += mailboxEscapeHtmlText_(source.slice(cursor));
  return output.slice(0, MAILBOX_CLIENT_CONFIG_.MAX_HTML_CHARS);
}

function mailboxSanitizedInlineImageSource_(value, policyValue) {
  const policy = policyValue || {};
  const source = decodeHtmlEntities_(String(value || '').trim());
  const inlineMatch = source.match(/^inline:([A-Za-z0-9._-]+)$/);
  if (inlineMatch) {
    const token = mailboxSafeInlineToken_(inlineMatch[1]);
    if (token && policy.allowedTokens && policy.allowedTokens.has(token)) {
      return 'inline:' + token;
    }
    return '';
  }
  const attachmentMatch = source.match(/^attachment:([A-Za-z0-9._-]+)$/);
  if (attachmentMatch) {
    const token = mailboxSafeInlineToken_(attachmentMatch[1]);
    if (token && policy.allowedAttachmentTokens && policy.allowedAttachmentTokens.has(token)) {
      return 'attachment:' + token;
    }
    return '';
  }
  const cidMatch = source.match(/^cid:(.+)$/i);
  if (!cidMatch) return '';
  const contentId = mailboxSafeInlineContentId_(cidMatch[1]);
  if (!contentId) return '';
  if (policy.cidToAttachmentToken) {
    const attachmentToken = policy.cidToAttachmentToken.get(contentId) ||
      policy.cidToAttachmentToken.get(contentId.toLowerCase());
    if (mailboxSafeInlineToken_(attachmentToken)) return 'attachment:' + attachmentToken;
  }
  if (!policy.cidToToken) return '';
  const token = policy.cidToToken.get(contentId) || policy.cidToToken.get(contentId.toLowerCase());
  return mailboxSafeInlineToken_(token) ? 'inline:' + token : '';
}

function mailboxSanitizeComposeStyle_(value, tagValue) {
  const source = decodeHtmlEntities_(String(value || '')).trim();
  if (!source || source.length > 1000) {
    return '';
  }
  const tag = String(tagValue || '').toLowerCase();
  const declarations = {};
  const safeLength = (rawValue, maximum, allowPercent, allowAuto) => {
    const text = String(rawValue || '').toLowerCase().trim();
    if (allowAuto && text === 'auto') return text;
    if (text === '0') return '0px';
    const match = text.match(/^([0-9]{1,4}(?:\.[0-9])?)(px|%)$/);
    if (!match) return '';
    const number = Number(match[1]);
    if (!Number.isFinite(number) || number < 0) return '';
    if (match[2] === '%' && (!allowPercent || number > 100)) return '';
    if (match[2] === 'px' && number > maximum) return '';
    return String(number).replace(/\.0$/, '') + match[2];
  };
  const safeBox = (rawValue, maximum, allowAuto) => {
    const parts = String(rawValue || '').trim().split(/\s+/);
    if (!parts.length || parts.length > 4) return '';
    const values = parts.map(item => safeLength(item, maximum, false, allowAuto));
    return values.every(Boolean) ? values.join(' ') : '';
  };
  source.split(';').forEach(declaration => {
    const separator = declaration.indexOf(':');
    if (separator <= 0) return;
    const property = declaration.slice(0, separator).trim().toLowerCase();
    const raw = declaration.slice(separator + 1).trim();
    if (/url\s*\(|expression\s*\(|@import|javascript:|data:/i.test(raw)) return;
    let canonical = '';
    if (property === 'color' || property === 'background-color') {
      const color = raw.toLowerCase();
      if (/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/.test(color)) canonical = color;
    } else if (property === 'font-family') {
      const family = raw.replace(/["']/g, '').replace(/\s+/g, ' ').trim();
      const allowedFamilies = [
        'Arial', 'Georgia', 'Times New Roman', 'Verdana', 'Tahoma',
        'Trebuchet MS', 'Courier New',
      ];
      const selected = allowedFamilies.find(item => item.toLowerCase() === family.toLowerCase());
      if (selected) canonical = selected;
    } else if (property === 'font-size') {
      const size = raw.toLowerCase();
      if (['10px', '12px', '14px', '16px', '18px', '24px', '32px'].indexOf(size) !== -1) {
        canonical = size;
      }
    } else if (property === 'font-weight') {
      const weight = raw.toLowerCase();
      if (/^(?:normal|bold|[1-9]00)$/.test(weight)) canonical = weight;
    } else if (property === 'font-style') {
      const fontStyle = raw.toLowerCase();
      if (['normal', 'italic'].indexOf(fontStyle) !== -1) canonical = fontStyle;
    } else if (property === 'text-decoration') {
      const decoration = raw.toLowerCase().replace(/\s+/g, ' ');
      if (['none', 'underline', 'line-through'].indexOf(decoration) !== -1) canonical = decoration;
    } else if (property === 'line-height') {
      const line = raw.toLowerCase();
      if (/^(?:1|1\.[0-9]|2|2\.[0-5])$/.test(line)) canonical = line;
      else canonical = safeLength(line, 48, false, false);
    } else if (property === 'text-align' &&
        ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'td', 'th', 'table'].indexOf(tag) !== -1) {
      const alignment = raw.toLowerCase();
      if (['left', 'center', 'right', 'justify'].indexOf(alignment) !== -1) canonical = alignment;
    } else if (property === 'margin-left' &&
        ['p', 'div', 'blockquote', 'ul', 'ol'].indexOf(tag) !== -1) {
      const indent = raw.toLowerCase();
      if (['0', '0px', '20px', '40px', '60px', '80px'].indexOf(indent) !== -1) canonical = indent === '0' ? '0px' : indent;
    } else if (property === 'vertical-align' && ['td', 'th', 'img', 'span'].indexOf(tag) !== -1) {
      const vertical = raw.toLowerCase();
      if (['top', 'middle', 'bottom', 'baseline'].indexOf(vertical) !== -1) canonical = vertical;
    } else if (property === 'border-collapse' && tag === 'table' &&
        ['collapse', 'separate'].indexOf(raw.toLowerCase()) !== -1) {
      canonical = raw.toLowerCase();
    } else if (['width', 'max-width', 'min-width'].indexOf(property) !== -1 &&
        ['table', 'tbody', 'tr', 'td', 'th', 'div', 'p', 'img'].indexOf(tag) !== -1) {
      canonical = safeLength(raw, 1600, true, property === 'width');
    } else if (property === 'height' && ['td', 'th', 'div', 'img'].indexOf(tag) !== -1) {
      canonical = safeLength(raw, 1600, false, true);
    } else if (property === 'border' && ['table', 'td', 'th', 'div'].indexOf(tag) !== -1) {
      const border = raw.toLowerCase().replace(/\s+/g, ' ');
      if (/^[0-4]px (?:solid|dashed|dotted) #[0-9a-f]{3}(?:[0-9a-f]{3})?$/.test(border)) canonical = border;
    } else if (property === 'border-radius' && ['table', 'td', 'th', 'div', 'img'].indexOf(tag) !== -1) {
      canonical = safeBox(raw, 32, false);
    } else if (property === 'padding' && ['table', 'td', 'th', 'div', 'p'].indexOf(tag) !== -1) {
      canonical = safeBox(raw, 80, false);
    } else if (property === 'margin' && ['table', 'div', 'p', 'h1', 'h2', 'h3', 'blockquote'].indexOf(tag) !== -1) {
      canonical = safeBox(raw, 120, true);
    } else if (property === 'display') {
      const display = raw.toLowerCase();
      if (['block', 'inline', 'inline-block', 'table', 'table-row', 'table-cell'].indexOf(display) !== -1) canonical = display;
    } else if (property === 'white-space' && ['pre', 'code', 'div', 'span', 'p'].indexOf(tag) !== -1) {
      const whiteSpace = raw.toLowerCase();
      if (['normal', 'pre', 'pre-wrap', 'nowrap'].indexOf(whiteSpace) !== -1) canonical = whiteSpace;
    } else if (property === 'word-break') {
      const wordBreak = raw.toLowerCase();
      if (['normal', 'break-all', 'break-word'].indexOf(wordBreak) !== -1) canonical = wordBreak;
    }
    if (canonical) declarations[property] = canonical;
  });
  return Object.keys(declarations).sort().map(property =>
    property + ':' + declarations[property]
  ).join(';');
}

function mailboxSafeLink_(value) {
  const decoded = decodeHtmlEntities_(String(value || '').trim());
  if (!decoded || decoded.length > 2048 || /[\u0000-\u001f\u007f\\]/.test(decoded)) return '';
  if (/^https?:\/\//i.test(decoded)) return decoded;
  if (/^mailto:/i.test(decoded)) return decoded;
  return '';
}

function mailboxSafeOpenUrl_(value) {
  const text = String(value || '');
  if (!text) return '';
  return isSafePublicHttpsUrl_(text) || '';
}

function mailboxEscapeHtmlText_(value) {
  return String(value || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function mailboxEscapeHtmlAttribute_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function mailboxSafeSearchQuery_(value) {
  if (value === undefined || value === null || value === '') return '';
  const query = String(value).trim();
  if (query.length > MAILBOX_CLIENT_CONFIG_.MAX_QUERY_CHARS || /[\u0000-\u001f\u007f]/.test(query)) {
    throw mailboxError_('INVALID_QUERY', 'Пошуковий запит має некоректний формат.');
  }
  return query;
}

function mailboxSafePageToken_(value) {
  const token = String(value || '');
  if (!token || token.length > 1024 || !/^[A-Za-z0-9._~+\/=:-]+$/.test(token)) {
    throw mailboxError_('INVALID_PAGE_TOKEN', 'Токен наступної сторінки недійсний.');
  }
  return token;
}

function mailboxRequireGmailId_(value, fieldName) {
  const id = mailboxSafeGmailId_(value);
  if (!id) throw mailboxError_('INVALID_ID', 'Некоректний ідентифікатор ' + fieldName + '.');
  return id;
}

function mailboxSafeGmailId_(value) {
  const id = String(value || '');
  return /^[A-Za-z0-9_-]{1,256}$/.test(id) ? id : '';
}

function mailboxRequireAttachmentId_(value) {
  const id = mailboxSafeAttachmentId_(value);
  if (!id) throw mailboxError_('INVALID_ID', 'Некоректний ідентифікатор attachmentId.');
  return id;
}

function mailboxSafeAttachmentId_(value) {
  const id = String(value || '');
  if (!id || id.length > MAILBOX_CLIENT_CONFIG_.MAX_ATTACHMENT_ID_CHARS) return '';
  return /^[A-Za-z0-9_-]+$/.test(id) ? id : '';
}

function mailboxRequirePartId_(value) {
  const id = mailboxSafePartId_(value);
  if (!id) throw mailboxError_('INVALID_ID', 'Некоректний ідентифікатор partId.');
  return id;
}

function mailboxSafePartId_(value) {
  const id = String(value || '');
  return /^[A-Za-z0-9._-]{1,256}$/.test(id) ? id : '';
}

function mailboxSafeLabelId_(value, required) {
  const id = String(value || '');
  if (/^[A-Za-z0-9_.-]{1,256}$/.test(id)) return id;
  if (required) throw mailboxError_('INVALID_FOLDER', 'Некоректний ідентифікатор мітки Gmail.');
  return '';
}

function mailboxSafeOpaqueToken_(value, maxLength) {
  const text = String(value || '');
  if (!text || text.length > maxLength || /[\u0000-\u001f\u007f]/.test(text)) return '';
  return text;
}

function mailboxSafeHeader_(value, maxLength) {
  return mailboxSafeText_(String(value || '').replace(/[\r\n]+/g, ' '), maxLength);
}

function mailboxSafeBody_(value) {
  return String(value || '')
    .replace(/\u0000/g, '')
    .slice(0, MAILBOX_CLIENT_CONFIG_.MAX_BODY_CHARS);
}

function mailboxSafeText_(value, maxLength) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .slice(0, maxLength);
}

function mailboxSafeEmail_(value) {
  const email = String(value || '').trim();
  return mailboxIsEmail_(email) ? email : '';
}

function mailboxSafeMimeType_(value) {
  const mime = String(value || '').toLowerCase();
  return /^[a-z0-9!#$&^_.+-]+\/[a-z0-9!#$&^_.+-]+$/.test(mime)
    ? mime
    : 'application/octet-stream';
}

function mailboxSafeColor_(value) {
  const color = String(value || '');
  return /^#[0-9a-f]{6}$/i.test(color) ? color.toLowerCase() : '';
}

function mailboxSafeTimestamp_(value) {
  const number = Number(value || 0);
  return Number.isFinite(number) && number >= 0 ? Math.floor(number) : 0;
}

function mailboxSafeCount_(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || number < 0) return 0;
  return Math.min(Math.floor(number), Number.MAX_SAFE_INTEGER);
}

function mailboxBoundedInteger_(value, fallback, minimum, maximum, fieldName) {
  if (value === undefined || value === null || value === '') return fallback;
  const number = Number(value);
  if (!Number.isInteger(number) || number < minimum || number > maximum) {
    throw mailboxError_('INVALID_REQUEST', 'Некоректне значення ' + fieldName + '.');
  }
  return number;
}

function mailboxEnum_(value, allowed, fallback) {
  const text = String(value || '');
  return allowed.indexOf(text) !== -1 ? text : fallback;
}

function mailboxAssertAllowedKeys_(object, allowed) {
  const unknown = Object.keys(object || {}).filter(key => allowed.indexOf(key) === -1);
  if (unknown.length) {
    throw mailboxError_('INVALID_REQUEST', 'Невідомий параметр запиту: ' + mailboxSafeText_(unknown[0], 80) + '.');
  }
}

function mailboxIsPlainObject_(value) {
  return Boolean(value) && Object.prototype.toString.call(value) === '[object Object]';
}

function mailboxOk_(data) {
  return { ok: true, data };
}

function mailboxError_(code, message) {
  const error = new Error(String(message || 'Поштова операція не виконана.'));
  error.mailboxCode = String(code || 'REQUEST_FAILED');
  return error;
}

function mailboxFailure_(error, fallbackCode) {
  const knownCode = error && error.mailboxCode ? String(error.mailboxCode) : '';
  const rawMessage = String(error && error.message || '');
  let code = knownCode || fallbackCode || 'REQUEST_FAILED';
  let message = knownCode ? rawMessage : 'Не вдалося виконати поштову операцію.';

  if (!knownCode && /^Gmail\b/i.test(rawMessage)) {
    code = 'GMAIL_ERROR';
    message = mailboxSafeText_(rawMessage, 500);
  } else if (!knownCode && /Telegram|власник|підпис|команд/i.test(rawMessage)) {
    code = 'UNAUTHORIZED';
    message = mailboxSafeText_(rawMessage, 500);
  }
  console.error('Mail client error [' + code + ']: ' + mailboxSafeText_(rawMessage, 1000));
  return {
    ok: false,
    error: {
      code: mailboxSafeText_(code, 64),
      message: message || 'Не вдалося виконати поштову операцію.',
    },
  };
}
