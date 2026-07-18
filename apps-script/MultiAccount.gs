/**
 * Gmail/Telegram v26 multi-tenant identity and mailbox connection boundary.
 *
 * The registry contains metadata and authorization grants only. Google access
 * and refresh tokens are stored separately and are never returned to clients.
 * Every public helper accepts opaque identifiers and resolves them again
 * through the authenticated Telegram user before Gmail transport is selected.
 */

const MAILBOX_MULTI_CONFIG_ = Object.freeze({
  REGISTRY_PROPERTY: 'MAILBOX_TENANT_REGISTRY_V1',
  OAUTH_STATE_PROPERTY: 'MAILBOX_GOOGLE_OAUTH_STATES_V1',
  OAUTH_TOKEN_PREFIX: 'MAILBOX_GOOGLE_OAUTH_TOKEN_V1_',
  OAUTH_REVOKE_QUEUE_PROPERTY: 'MAILBOX_GOOGLE_REVOKE_QUEUE_V1',
  OAUTH_CLIENT_ID_PROPERTY: 'GOOGLE_OAUTH_CLIENT_ID',
  OAUTH_CLIENT_SECRET_PROPERTY: 'GOOGLE_OAUTH_CLIENT_SECRET',
  OAUTH_REDIRECT_URI_PROPERTY: 'GOOGLE_OAUTH_REDIRECT_URI',
  OAUTH_STATE_SECONDS: 10 * 60,
  OAUTH_STATE_LIMIT: 24,
  SOURCE_REGISTRY_PROPERTY: 'MAILBOX_SOURCE_REGISTRY_V1',
  SOURCE_OAUTH_STATE_PROPERTY: 'MAILBOX_SOURCE_OAUTH_STATES_V1',
  SOURCE_OAUTH_TOKEN_PREFIX: 'MAILBOX_SOURCE_OAUTH_TOKEN_V1_',
  DRIVE_OAUTH_REDIRECT_URI_PROPERTY: 'GOOGLE_DRIVE_OAUTH_REDIRECT_URI',
  INVITE_SECONDS: 7 * 24 * 60 * 60,
  REGISTRY_VERSION: 1,
  LEGACY_ZONE_ID: 'zone-owner',
  LEGACY_CONNECTION_ID: 'gmail-owner',
  ROLE_ORDER: Object.freeze({ viewer: 10, responder: 20, manager: 30, admin: 40, owner: 50 }),
  GMAIL_SCOPES: Object.freeze([
    'openid',
    'email',
    'profile',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.settings.basic',
  ]),
  DRIVE_SCOPES: Object.freeze([
    'openid',
    'email',
    'profile',
    'https://www.googleapis.com/auth/drive.readonly',
  ]),
});

/**
 * Attachment-source identities are intentionally separate from Gmail
 * connections.  A message may be sent from Gmail A while its attachments are
 * read from Drive B or Box C.  The opaque sourceConnectionId is carried by
 * every source reference and re-authorized for the Telegram caller on every
 * request.
 */
function mailboxSourceInitialRegistry_() {
  return { v: 1, revision: 1, connections: [], preferences: [] };
}

function mailboxSourceReadRegistry_(properties) {
  const props = properties || PropertiesService.getScriptProperties();
  const raw = String(props.getProperty(MAILBOX_MULTI_CONFIG_.SOURCE_REGISTRY_PROPERTY) || '');
  if (!raw) return mailboxSourceInitialRegistry_();
  let value = null;
  try { value = JSON.parse(raw); } catch (error) { value = null; }
  return mailboxSourceValidateRegistry_(value);
}

function mailboxSourceValidateRegistry_(value) {
  if (!mailboxIsPlainObject_(value) || value.v !== 1 || !Number.isInteger(value.revision) ||
      value.revision < 1 || !Array.isArray(value.connections) || !Array.isArray(value.preferences)) {
    throw mailboxError_('SERVER_CONFIG', 'Реєстр джерел вкладень пошкоджений.');
  }
  const connections = value.connections.map(item => {
    const id = mailboxMultiOpaqueId_(item && item.id, 'source');
    const provider = String(item && item.provider || '');
    const ownerUserId = String(item && item.ownerUserId || '');
    const status = String(item && item.status || '');
    const email = String(item && item.email || '').toLowerCase();
    if (['drive', 'box'].indexOf(provider) === -1 || !/^\d{1,24}$/.test(ownerUserId) ||
        ['active', 'reauth_required', 'revoked'].indexOf(status) === -1 ||
        (email && mailboxSafeEmail_(email) !== email) ||
        !Number.isInteger(Number(item && item.tokenGeneration)) || Number(item.tokenGeneration) < 1) {
      throw mailboxError_('SERVER_CONFIG', 'Підключення джерела вкладень недійсне.');
    }
    return {
      id,
      provider,
      ownerUserId,
      email,
      displayName: mailboxSafeText_(item && item.displayName, 160) || email || provider,
      avatarUrl: mailboxMultiSafeAvatarUrl_(item && item.avatarUrl),
      status,
      connectedAt: mailboxMultiTimestamp_(item && item.connectedAt),
      tokenGeneration: Number(item.tokenGeneration),
    };
  });
  const ids = new Set(connections.map(item => item.id));
  if (ids.size !== connections.length) {
    throw mailboxError_('SERVER_CONFIG', 'Реєстр містить повторені джерела вкладень.');
  }
  const preferences = value.preferences.map(item => {
    const userId = String(item && item.userId || '');
    if (!/^\d{1,24}$/.test(userId)) {
      throw mailboxError_('SERVER_CONFIG', 'Налаштування джерел вкладень недійсні.');
    }
    const active = mailboxIsPlainObject_(item.active) ? item.active : {};
    const safeActive = {};
    ['drive', 'box'].forEach(provider => {
      const id = String(active[provider] || '');
      if (!id) return;
      const connection = connections.find(candidate => candidate.id === id &&
        candidate.provider === provider && candidate.ownerUserId === userId && candidate.status !== 'revoked');
      if (!connection) throw mailboxError_('SERVER_CONFIG', 'Обране джерело вкладень недоступне користувачу.');
      safeActive[provider] = id;
    });
    return { userId, active: safeActive, updatedAt: mailboxMultiTimestamp_(item && item.updatedAt) };
  });
  if (new Set(preferences.map(item => item.userId)).size !== preferences.length) {
    throw mailboxError_('SERVER_CONFIG', 'Налаштування джерел вкладень повторюються.');
  }
  return { v: 1, revision: value.revision, connections, preferences };
}

function mailboxSourceWriteRegistry_(properties, registry) {
  const props = properties || PropertiesService.getScriptProperties();
  const serialized = JSON.stringify(mailboxSourceValidateRegistry_(registry));
  assertTelegramPropertyValueFits_(MAILBOX_MULTI_CONFIG_.SOURCE_REGISTRY_PROPERTY, serialized);
  assertTelegramPropertyStoreFits_(props, { [MAILBOX_MULTI_CONFIG_.SOURCE_REGISTRY_PROPERTY]: serialized });
  props.setProperty(MAILBOX_MULTI_CONFIG_.SOURCE_REGISTRY_PROPERTY, serialized);
  return JSON.parse(serialized);
}

function mailboxSourceVisibleAccounts_(session, providerValue, registryValue) {
  const userId = String(session && session.userId || '');
  const provider = String(providerValue || '');
  if (!/^\d{1,24}$/.test(userId) || ['drive', 'box'].indexOf(provider) === -1) {
    throw mailboxError_('INVALID_SOURCE', 'Джерело вкладень недійсне.');
  }
  const registry = registryValue || mailboxSourceReadRegistry_();
  const pref = registry.preferences.find(item => item.userId === userId) || { active: {} };
  return registry.connections.filter(item => item.ownerUserId === userId && item.provider === provider &&
    item.status !== 'revoked').map(item => ({
      id: item.id,
      provider: item.provider,
      email: item.email,
      name: item.displayName,
      avatarUrl: item.avatarUrl,
      connected: item.status === 'active',
      requiresReauth: item.status === 'reauth_required',
      current: pref.active[provider] === item.id,
    }));
}

function mailboxSourceResolveAccess_(session, sourceConnectionIdValue, providerValue) {
  const userId = String(session && session.userId || '');
  const id = mailboxMultiOpaqueId_(sourceConnectionIdValue, 'source');
  const provider = String(providerValue || '');
  const registry = mailboxSourceReadRegistry_();
  const connection = registry.connections.find(item => item.id === id && item.provider === provider &&
    item.ownerUserId === userId && item.status !== 'revoked');
  if (!connection) throw mailboxError_('FORBIDDEN', 'Цей акаунт сховища належить іншому Telegram-користувачу.');
  if (connection.status !== 'active') {
    throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Для цього акаунта сховища потрібно оновити авторизацію.');
  }
  return connection;
}

function mailboxSourceSelect_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['provider', 'sourceConnectionId']);
  const provider = String(payload.provider || '');
  const connection = mailboxSourceResolveAccess_(session, payload.sourceConnectionId, provider);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Джерело вкладень уже перемикається.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxSourceReadRegistry_(props);
    let pref = registry.preferences.find(item => item.userId === String(session.userId));
    if (!pref) {
      pref = { userId: String(session.userId), active: {}, updatedAt: Date.now() };
      registry.preferences.push(pref);
    }
    pref.active[provider] = connection.id;
    pref.updatedAt = Date.now();
    registry.revision += 1;
    mailboxSourceWriteRegistry_(props, registry);
  } finally {
    lock.releaseLock();
  }
  return { provider, activeSourceConnectionId: connection.id };
}

function mailboxSourceAccounts_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['provider']);
  const provider = String(payload.provider || '');
  const registry = mailboxSourceReadRegistry_();
  const accounts = mailboxSourceVisibleAccounts_(session, provider, registry);
  const pref = registry.preferences.find(item => item.userId === String(session.userId)) || { active: {} };
  return { provider, activeSourceConnectionId: String(pref.active[provider] || ''), accounts };
}

function mailboxDriveOAuthConfig_() {
  const props = PropertiesService.getScriptProperties();
  const clientId = String(props.getProperty(MAILBOX_MULTI_CONFIG_.OAUTH_CLIENT_ID_PROPERTY) || '');
  const clientSecret = String(props.getProperty(MAILBOX_MULTI_CONFIG_.OAUTH_CLIENT_SECRET_PROPERTY) || '');
  const redirectUri = String(props.getProperty(MAILBOX_MULTI_CONFIG_.DRIVE_OAUTH_REDIRECT_URI_PROPERTY) || '');
  if (!/^[0-9]+-[A-Za-z0-9_-]+\.apps\.googleusercontent\.com$/.test(clientId) ||
      clientSecret.length < 16 || clientSecret.length > 512 || /[\s\u0000-\u001f\u007f]/.test(clientSecret) ||
      !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec\?action=drive_oauth_callback$/.test(redirectUri)) {
    throw mailboxError_('DRIVE_OAUTH_NOT_CONFIGURED', 'Підключення Google Drive ще не налаштовано на сервері.');
  }
  return { clientId, clientSecret, redirectUri };
}

function mailboxDriveConnectStart_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['provider', 'loginHint']);
  if (String(payload.provider || 'drive') !== 'drive') {
    throw mailboxError_('INVALID_SOURCE', 'Некоректний провайдер Google Drive.');
  }
  const config = mailboxDriveOAuthConfig_();
  const loginHint = String(payload.loginHint || '').toLowerCase();
  if (loginHint && mailboxSafeEmail_(loginHint) !== loginHint) {
    throw mailboxError_('INVALID_REQUEST', 'Підказка Google-акаунта недійсна.');
  }
  const userId = String(session && session.userId || '');
  if (!/^\d{1,24}$/.test(userId)) throw mailboxError_('UNAUTHORIZED', 'Telegram-сеанс недійсний.');
  const state = mailboxRandomToken_();
  const now = Date.now();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Підключення Google Drive вже починається.');
  try {
    const props = PropertiesService.getScriptProperties();
    const states = mailboxSourceReadOauthStates_(props, now)
      .filter(item => !(item.userId === userId && item.provider === 'drive'))
      .slice(-(MAILBOX_MULTI_CONFIG_.OAUTH_STATE_LIMIT - 1));
    states.push({
      v: 1,
      hash: mailboxMultiHashText_(state),
      provider: 'drive',
      userId,
      createdAt: now,
      expiresAt: now + MAILBOX_MULTI_CONFIG_.OAUTH_STATE_SECONDS * 1000,
    });
    const serialized = JSON.stringify(states);
    assertTelegramPropertyValueFits_(MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_STATE_PROPERTY, serialized);
    assertTelegramPropertyStoreFits_(props, { [MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_STATE_PROPERTY]: serialized });
    props.setProperty(MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_STATE_PROPERTY, serialized);
  } finally {
    lock.releaseLock();
  }
  const query = {
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    access_type: 'offline',
    include_granted_scopes: 'true',
    prompt: 'select_account consent',
    scope: MAILBOX_MULTI_CONFIG_.DRIVE_SCOPES.join(' '),
    state,
  };
  if (loginHint) query.login_hint = loginHint;
  return {
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?' + Object.keys(query)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(query[key])).join('&'),
    expiresAt: now + MAILBOX_MULTI_CONFIG_.OAUTH_STATE_SECONDS * 1000,
    provider: 'drive',
  };
}

function mailboxSourceReadOauthStates_(properties, nowValue) {
  const raw = String(properties.getProperty(MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_STATE_PROPERTY) || '');
  if (!raw) return [];
  let states = null;
  try { states = JSON.parse(raw); } catch (error) { states = null; }
  if (!Array.isArray(states)) throw mailboxError_('SERVER_CONFIG', 'Стан OAuth джерел вкладень пошкоджений.');
  const now = Number(nowValue || Date.now());
  const seen = new Set();
  return states.map(item => {
    const valid = mailboxIsPlainObject_(item) && item.v === 1 && ['drive', 'box'].indexOf(item.provider) !== -1 &&
      /^[a-f0-9]{64}$/.test(String(item.hash || '')) && /^\d{1,24}$/.test(String(item.userId || '')) &&
      Number.isInteger(item.createdAt) && Number.isInteger(item.expiresAt) &&
      item.expiresAt - item.createdAt === MAILBOX_MULTI_CONFIG_.OAUTH_STATE_SECONDS * 1000;
    if (!valid || seen.has(item.hash)) throw mailboxError_('SERVER_CONFIG', 'Стан OAuth джерел вкладень пошкоджений.');
    seen.add(item.hash);
    return item;
  }).filter(item => item.expiresAt > now);
}

function mailboxSourceConsumeOauthState_(stateValue) {
  const state = String(stateValue || '');
  if (!/^[A-Za-z0-9_-]{43}$/.test(state)) throw mailboxError_('SOURCE_OAUTH_INVALID', 'OAuth-запит джерела недійсний.');
  const hash = mailboxMultiHashText_(state);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'OAuth джерела вкладень уже завершується.');
  try {
    const props = PropertiesService.getScriptProperties();
    const states = mailboxSourceReadOauthStates_(props, Date.now());
    const index = states.findIndex(item => constantTimeEqual_(item.hash, hash));
    if (index === -1) throw mailboxError_('SOURCE_OAUTH_INVALID', 'OAuth-запит використано або він завершився.');
    const record = states[index];
    states.splice(index, 1);
    props.setProperty(MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_STATE_PROPERTY, JSON.stringify(states));
    return record;
  } finally {
    lock.releaseLock();
  }
}

function mailboxDriveHandleOAuthCallback_(input) {
  if (!mailboxIsPlainObject_(input)) throw mailboxError_('DRIVE_OAUTH_INVALID', 'Відповідь Google недійсна.');
  mailboxAssertAllowedKeys_(input, ['code', 'state', 'error', 'errorDescription']);
  const state = String(input.state || '');
  const code = String(input.code || '');
  const providerError = String(input.error || '');
  if (!/^[A-Za-z0-9_-]{43}$/.test(state) || Boolean(code) === Boolean(providerError) ||
      code.length > 4096 || /[\u0000-\u001f\u007f]/.test(code)) {
    throw mailboxError_('DRIVE_OAUTH_INVALID', 'Відповідь Google недійсна.');
  }
  const stateRecord = mailboxSourceConsumeOauthState_(state);
  if (providerError) {
    throw mailboxError_(providerError === 'access_denied' ? 'DRIVE_OAUTH_DENIED' : 'DRIVE_OAUTH_FAILED',
      providerError === 'access_denied' ? 'Підключення Google Drive скасовано.' : 'Google не завершив авторизацію Drive.');
  }
  const config = mailboxDriveOAuthConfig_();
  const token = mailboxGoogleExchangeCode_(config, code);
  const identity = mailboxGoogleFetchOpenIdIdentity_(token.accessToken);
  return mailboxDrivePersistConnection_(stateRecord, token, identity);
}

function mailboxGoogleFetchOpenIdIdentity_(accessToken) {
  const response = UrlFetchApp.fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    method: 'get', headers: { Authorization: 'Bearer ' + accessToken }, muteHttpExceptions: true,
  });
  const user = mailboxGoogleJson_(response);
  const email = String(user && user.email || '').toLowerCase();
  const subject = String(user && user.sub || '');
  if (Number(response.getResponseCode()) !== 200 || mailboxSafeEmail_(email) !== email ||
      !/^[A-Za-z0-9_-]{5,128}$/.test(subject)) {
    throw mailboxError_('DRIVE_OAUTH_FAILED', 'Не вдалося підтвердити обраний Google Drive-акаунт.');
  }
  return {
    email,
    subject,
    displayName: mailboxSafeText_(user && user.name, 160) || email,
    avatarUrl: mailboxMultiSafeAvatarUrl_(user && user.picture),
  };
}

function mailboxDrivePersistConnection_(state, token, identity) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Google Drive-підключення вже зберігається.');
  try {
    if (token.scopes.indexOf('https://www.googleapis.com/auth/drive.readonly') === -1) {
      throw mailboxError_('DRIVE_OAUTH_REAUTH_REQUIRED', 'Google Drive не надав доступ лише для читання файлів.');
    }
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxSourceReadRegistry_(props);
    let connection = registry.connections.find(item => item.provider === 'drive' &&
      item.ownerUserId === state.userId && item.email === identity.email);
    const now = Date.now();
    if (!connection) {
      connection = {
        id: 'source-' + mailboxMultiHashText_('drive:' + state.userId + ':' + identity.subject).slice(0, 24),
        provider: 'drive', ownerUserId: state.userId, email: identity.email,
        displayName: identity.displayName, avatarUrl: identity.avatarUrl,
        status: 'active', connectedAt: now, tokenGeneration: 1,
      };
      registry.connections.push(connection);
    } else {
      connection.displayName = identity.displayName;
      connection.avatarUrl = identity.avatarUrl;
      connection.status = 'active';
      connection.tokenGeneration += 1;
    }
    const key = MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_TOKEN_PREFIX + connection.id;
    let previous = null;
    try { previous = JSON.parse(String(props.getProperty(key) || 'null')); } catch (error) { previous = null; }
    const refreshToken = token.refreshToken || String(previous && previous.refreshToken || '');
    if (!mailboxGoogleSafeToken_(refreshToken)) {
      throw mailboxError_('DRIVE_OAUTH_REAUTH_REQUIRED', 'Google не повернув довготривалий дозвіл Drive. Підключіть акаунт ще раз.');
    }
    let pref = registry.preferences.find(item => item.userId === state.userId);
    if (!pref) {
      pref = { userId: state.userId, active: {}, updatedAt: now };
      registry.preferences.push(pref);
    }
    pref.active.drive = connection.id;
    pref.updatedAt = now;
    registry.revision += 1;
    const tokenRecord = {
      v: 1, provider: 'drive', subject: identity.subject, email: identity.email,
      accessToken: token.accessToken, refreshToken, accessExpiresAt: token.expiresAt,
      scopes: token.scopes, generation: connection.tokenGeneration, updatedAt: now,
    };
    const serializedRegistry = JSON.stringify(mailboxSourceValidateRegistry_(registry));
    const serializedToken = JSON.stringify(tokenRecord);
    assertTelegramPropertyValueFits_(key, serializedToken);
    assertTelegramPropertyStoreFits_(props, {
      [MAILBOX_MULTI_CONFIG_.SOURCE_REGISTRY_PROPERTY]: serializedRegistry,
      [key]: serializedToken,
    });
    props.setProperties({
      [MAILBOX_MULTI_CONFIG_.SOURCE_REGISTRY_PROPERTY]: serializedRegistry,
      [key]: serializedToken,
    });
    return { ok: true, account: { id: connection.id, provider: 'drive', email: connection.email, name: connection.displayName } };
  } finally {
    lock.releaseLock();
  }
}

function mailboxDriveAccessToken_(session, sourceConnectionIdValue) {
  const connection = mailboxSourceResolveAccess_(session, sourceConnectionIdValue, 'drive');
  const props = PropertiesService.getScriptProperties();
  const key = MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_TOKEN_PREFIX + connection.id;
  let record = null;
  try { record = JSON.parse(String(props.getProperty(key) || 'null')); } catch (error) { record = null; }
  if (!record || record.v !== 1 || record.provider !== 'drive' || record.email !== connection.email ||
      Number(record.generation) !== Number(connection.tokenGeneration) || !mailboxGoogleSafeToken_(record.refreshToken)) {
    throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Захищений доступ до Google Drive відсутній або відкликаний.');
  }
  if (mailboxGoogleSafeToken_(record.accessToken) && Number(record.accessExpiresAt) > Date.now() + 90000) {
    return record.accessToken;
  }
  const config = mailboxDriveOAuthConfig_();
  const response = UrlFetchApp.fetch('https://oauth2.googleapis.com/token', {
    method: 'post', contentType: 'application/x-www-form-urlencoded', muteHttpExceptions: true,
    payload: { client_id: config.clientId, client_secret: config.clientSecret,
      refresh_token: record.refreshToken, grant_type: 'refresh_token' },
  });
  const value = mailboxGoogleJson_(response);
  const accessToken = String(value && value.access_token || '');
  const expiresIn = Number(value && value.expires_in);
  if (Number(response.getResponseCode()) !== 200 || !mailboxGoogleSafeToken_(accessToken) ||
      !Number.isInteger(expiresIn) || expiresIn < 60 || expiresIn > 86400) {
    throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Google відкликав доступ до Drive ' + connection.email + '.');
  }
  record.accessToken = accessToken;
  record.accessExpiresAt = Date.now() + expiresIn * 1000;
  record.updatedAt = Date.now();
  props.setProperty(key, JSON.stringify(record));
  return accessToken;
}

function mailboxDriveDisconnect_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['provider', 'sourceConnectionId']);
  if (String(payload.provider || '') !== 'drive') throw mailboxError_('INVALID_SOURCE', 'Некоректний провайдер Drive.');
  const connection = mailboxSourceResolveAccess_(session, payload.sourceConnectionId, 'drive');
  const props = PropertiesService.getScriptProperties();
  const key = MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_TOKEN_PREFIX + connection.id;
  let record = null;
  try { record = JSON.parse(String(props.getProperty(key) || 'null')); } catch (error) { record = null; }
  if (!record || record.v !== 1 || Number(record.generation) !== Number(connection.tokenGeneration)) {
    throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Захищений доступ Google Drive відсутній.');
  }
  const revokeToken = mailboxGoogleSafeToken_(record.refreshToken) || mailboxGoogleSafeToken_(record.accessToken);
  if (!revokeToken) throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Захищений доступ Google Drive відсутній.');
  const response = UrlFetchApp.fetch('https://oauth2.googleapis.com/revoke', {
    method: 'post', contentType: 'application/x-www-form-urlencoded', payload: { token: revokeToken },
    muteHttpExceptions: true, followRedirects: false,
  });
  if (Number(response.getResponseCode()) !== 200) {
    throw mailboxError_('SOURCE_CLEANUP_PENDING', 'Google ще не підтвердив відкликання Drive. Повторіть спробу пізніше.');
  }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Google Drive уже відключається.');
  try {
    const currentRegistry = mailboxSourceReadRegistry_(props);
    const current = currentRegistry.connections.find(item => item.id === connection.id &&
      item.ownerUserId === String(session.userId) && item.provider === 'drive');
    let currentRecord = null;
    try { currentRecord = JSON.parse(String(props.getProperty(key) || 'null')); } catch (error) { currentRecord = null; }
    if (!current || !currentRecord || Number(current.tokenGeneration) !== Number(connection.tokenGeneration) ||
        Number(currentRecord.generation) !== Number(record.generation)) {
      throw mailboxError_('BUSY', 'Підключення Drive змінилося під час відкликання. Перевірте список акаунтів.');
    }
    current.status = 'revoked';
    currentRegistry.preferences.filter(item => item.userId === String(session.userId)).forEach(pref => {
      if (pref.active.drive === connection.id) delete pref.active.drive;
      pref.updatedAt = Date.now();
    });
    currentRegistry.revision += 1;
    mailboxSourceWriteRegistry_(props, currentRegistry);
    props.deleteProperty(key);
    return { provider: 'drive', disconnected: true, sourceConnectionId: connection.id };
  } finally {
    lock.releaseLock();
  }
}

/** Multiple Box identities, independent from both Gmail and Google Drive. */
function mailboxBoxSourceConnectStart_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['provider']);
  if (String(payload.provider || '') !== 'box') throw mailboxError_('INVALID_SOURCE', 'Некоректний провайдер Box.');
  const config = mailboxBoxConfig_(true);
  const userId = String(session && session.userId || '');
  if (!/^\d{1,24}$/.test(userId)) throw mailboxError_('UNAUTHORIZED', 'Telegram-сеанс недійсний.');
  const state = mailboxRandomToken_();
  const now = Date.now();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Підключення Box уже починається.');
  try {
    const props = PropertiesService.getScriptProperties();
    const states = mailboxSourceReadOauthStates_(props, now)
      .filter(item => !(item.userId === userId && item.provider === 'box'))
      .slice(-(MAILBOX_MULTI_CONFIG_.OAUTH_STATE_LIMIT - 1));
    states.push({
      v: 1, hash: mailboxMultiHashText_(state), provider: 'box', userId,
      createdAt: now, expiresAt: now + MAILBOX_MULTI_CONFIG_.OAUTH_STATE_SECONDS * 1000,
    });
    const serialized = JSON.stringify(states);
    assertTelegramPropertyValueFits_(MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_STATE_PROPERTY, serialized);
    assertTelegramPropertyStoreFits_(props, { [MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_STATE_PROPERTY]: serialized });
    props.setProperty(MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_STATE_PROPERTY, serialized);
  } finally {
    lock.releaseLock();
  }
  const query = {
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    state,
  };
  return {
    authorizationUrl: 'https://account.box.com/api/oauth2/authorize?' + Object.keys(query)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(query[key])).join('&'),
    expiresAt: now + MAILBOX_MULTI_CONFIG_.OAUTH_STATE_SECONDS * 1000,
    provider: 'box',
  };
}

function mailboxBoxSourceHandleOAuthCallback_(input) {
  if (!mailboxIsPlainObject_(input)) throw mailboxError_('BOX_OAUTH_INVALID', 'Відповідь Box недійсна.');
  mailboxAssertAllowedKeys_(input, ['code', 'state', 'error', 'errorDescription']);
  const state = String(input.state || '');
  const code = String(input.code || '');
  const providerError = String(input.error || '');
  if (!/^[A-Za-z0-9_-]{43}$/.test(state) || Boolean(code) === Boolean(providerError) ||
      code.length > 4096 || /[\u0000-\u001f\u007f]/.test(code) ||
      (providerError && !/^[A-Za-z0-9_.-]{1,128}$/.test(providerError))) {
    throw mailboxError_('BOX_OAUTH_INVALID', 'Відповідь Box недійсна.');
  }
  const stateRecord = mailboxSourceConsumeOauthState_(state);
  if (stateRecord.provider !== 'box') throw mailboxError_('BOX_OAUTH_INVALID', 'OAuth-відповідь належить іншому джерелу.');
  if (providerError) {
    throw mailboxError_(providerError === 'access_denied' ? 'BOX_OAUTH_DENIED' : 'BOX_OAUTH_FAILED',
      providerError === 'access_denied' ? 'Підключення Box скасовано.' : 'Box не завершив авторизацію.');
  }
  const config = mailboxBoxConfig_(true);
  const token = mailboxBoxExchangeAuthorizationCode_(config, code);
  try {
    const identity = mailboxBoxFetchUserWithAccess_(token.accessToken);
    return mailboxBoxSourcePersistConnection_(stateRecord, token, identity);
  } catch (error) {
    // A provider grant that could not be bound to the exact Telegram user must
    // not remain as an unreferenced live credential.
    try { mailboxBoxCleanupFailedGrant_(config, token.refreshToken, '', ''); }
    catch (cleanupError) { /* Never expose the grant even if cleanup is deferred. */ }
    throw error;
  }
}

function mailboxBoxSourcePersistConnection_(state, token, identityValue) {
  const identity = identityValue || {};
  const account = identity.account || {};
  const accountId = String(account.id || '');
  if (!/^\d{1,32}$/.test(accountId)) throw mailboxError_('BOX_OAUTH_FAILED', 'Box не підтвердив акаунт.');
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Box-підключення вже зберігається.');
  let cleanupKey = '';
  let result = null;
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxSourceReadRegistry_(props);
    let connection = registry.connections.find(item => item.provider === 'box' &&
      item.ownerUserId === state.userId && item.email === String(account.login || '').toLowerCase());
    const now = Date.now();
    let priorRefreshToken = '';
    if (!connection) {
      connection = {
        id: 'source-' + mailboxMultiHashText_('box:' + state.userId + ':' + accountId).slice(0, 24),
        provider: 'box', ownerUserId: state.userId,
        email: String(account.login || '').toLowerCase(),
        displayName: mailboxSafeText_(account.name, 160) || String(account.login || '') || 'Box',
        avatarUrl: '', status: 'active', connectedAt: now, tokenGeneration: 1,
      };
      registry.connections.push(connection);
    } else {
      const priorKey = MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_TOKEN_PREFIX + connection.id;
      let priorRecord = null;
      try { priorRecord = JSON.parse(String(props.getProperty(priorKey) || 'null')); }
      catch (error) { priorRecord = null; }
      if (priorRecord && priorRecord.provider === 'box' &&
          Number(priorRecord.generation) === Number(connection.tokenGeneration) &&
          mailboxBoxSafeToken_(priorRecord.refreshToken)) {
        priorRefreshToken = priorRecord.refreshToken;
      }
      connection.displayName = mailboxSafeText_(account.name, 160) || connection.displayName;
      connection.status = 'active';
      connection.tokenGeneration += 1;
    }
    let pref = registry.preferences.find(item => item.userId === state.userId);
    if (!pref) {
      pref = { userId: state.userId, active: {}, updatedAt: now };
      registry.preferences.push(pref);
    }
    pref.active.box = connection.id;
    pref.updatedAt = now;
    registry.revision += 1;
    const key = MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_TOKEN_PREFIX + connection.id;
    const record = mailboxBoxCreateTokenRecord_(token, account);
    record.provider = 'box';
    record.generation = connection.tokenGeneration;
    if (priorRefreshToken && !constantTimeEqual_(priorRefreshToken, record.refreshToken)) {
      // Persist the old one-use Box grant in the protected cleanup journal
      // before replacing it. Provider I/O happens only after the registry and
      // new token are committed and the shared lock is released.
      cleanupKey = mailboxBoxEnqueuePendingRevocationLocked_(props, priorRefreshToken, 'cleanup');
    }
    const serializedRegistry = JSON.stringify(mailboxSourceValidateRegistry_(registry));
    const serializedToken = JSON.stringify(record);
    assertTelegramPropertyValueFits_(key, serializedToken);
    assertTelegramPropertyStoreFits_(props, {
      [MAILBOX_MULTI_CONFIG_.SOURCE_REGISTRY_PROPERTY]: serializedRegistry,
      [key]: serializedToken,
    });
    props.setProperties({
      [MAILBOX_MULTI_CONFIG_.SOURCE_REGISTRY_PROPERTY]: serializedRegistry,
      [key]: serializedToken,
    });
    result = {
      ok: true,
      account: { id: connection.id, provider: 'box', email: connection.email, name: connection.displayName },
      message: 'Box-акаунт ' + (connection.email || connection.displayName) + ' підключено.',
    };
  } finally {
    lock.releaseLock();
  }
  if (cleanupKey) {
    try { mailboxBoxRetryPendingRevocations_(mailboxBoxConfig_(true), cleanupKey); }
    catch (error) { /* The protected journal retains the exact retry. */ }
  }
  return result;
}

function mailboxBoxSourceAccessToken_(session, sourceConnectionIdValue, forceRefreshValue) {
  const connection = mailboxSourceResolveAccess_(session, sourceConnectionIdValue, 'box');
  const props = PropertiesService.getScriptProperties();
  const key = MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_TOKEN_PREFIX + connection.id;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Box уже оновлює доступ.');
  let accessToken = '';
  let failure = null;
  let config = null;
  try {
    let current = null;
    try { current = JSON.parse(String(props.getProperty(key) || 'null')); } catch (error) { current = null; }
    if (!current || current.v !== 1 || current.provider !== 'box' ||
        Number(current.generation) !== Number(connection.tokenGeneration) ||
        !mailboxBoxSafeToken_(current.refreshToken) || !mailboxBoxSafeToken_(current.accessToken)) {
      throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Підключення Box змінилося або захищений доступ відсутній.');
    }
    const pending = mailboxBoxPendingRevocationEntriesLocked_(props).find(item =>
      constantTimeEqual_(item.record.refreshToken, current.refreshToken));
    if (pending && pending.record.kind === 'cleanup') {
      mailboxBoxSourceMarkReauth_(connection.id, connection.tokenGeneration);
      throw mailboxError_('SOURCE_CLEANUP_PENDING', 'Цей доступ Box очікує підтвердженого відкликання. Підключіть акаунт знову після очищення.');
    }
    if (pending && pending.record.kind === 'provisional') {
      // Recovery after the new source record committed but execution stopped
      // before dropping its provisional tombstone.
      props.deleteProperty(pending.key);
    }
    if (!forceRefreshValue && Number(current.accessExpiresAt) > Date.now() + 90000) {
      accessToken = current.accessToken;
    } else {
      config = mailboxBoxConfig_(true);
      mailboxBoxEnqueuePendingRevocationLocked_(props, current.refreshToken, 'cleanup');
      let response = null;
      try {
        response = UrlFetchApp.fetch('https://api.box.com/oauth2/token', {
          method: 'post', contentType: 'application/x-www-form-urlencoded', muteHttpExceptions: true,
          followRedirects: false,
          payload: { grant_type: 'refresh_token', refresh_token: current.refreshToken,
            client_id: config.clientId, client_secret: config.clientSecret },
        });
      } catch (error) {
        mailboxBoxSourceMarkReauth_(connection.id, connection.tokenGeneration);
        throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Оновлення Box завершилося невизначено. Підключіть акаунт знову.');
      }
      if (Number(response.getResponseCode()) !== 200) {
        mailboxBoxSourceMarkReauth_(connection.id, connection.tokenGeneration);
        throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Box відхилив оновлення доступу. Підключіть акаунт знову.');
      }
      let token = null;
      try {
        token = mailboxBoxParseTokenResponse_(response);
      } catch (error) {
        const raw = mailboxBoxParseJsonResponse_(response);
        const returnedRefresh = mailboxBoxSafeToken_(raw && raw.refresh_token);
        if (returnedRefresh) mailboxBoxEnqueuePendingRevocationLocked_(props, returnedRefresh, 'cleanup');
        mailboxBoxSourceMarkReauth_(connection.id, connection.tokenGeneration);
        throw error;
      }
      const provisionalKey = mailboxBoxEnqueuePendingRevocationLocked_(props, token.refreshToken, 'provisional');
      const next = mailboxBoxCreateTokenRecord_(token, current.account);
      next.provider = 'box';
      next.generation = connection.tokenGeneration;
      try {
        props.setProperty(key, JSON.stringify(next));
      } catch (error) {
        mailboxBoxEnqueuePendingRevocationLocked_(props, token.refreshToken, 'cleanup');
        mailboxBoxSourceMarkReauth_(connection.id, connection.tokenGeneration);
        throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Не вдалося надійно зберегти новий доступ Box. Підключіть акаунт знову.');
      }
      props.deleteProperty(provisionalKey);
      accessToken = next.accessToken;
    }
  } catch (error) {
    failure = error;
  } finally {
    lock.releaseLock();
  }
  if (config) {
    // At most two grants can be pending after one rotation (old and returned
    // new). Retry only after releasing the shared state lock.
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try { if (mailboxBoxRetryPendingRevocations_(config, '')) break; }
      catch (error) { break; }
    }
  }
  if (failure) throw failure;
  return accessToken;
}

function mailboxBoxSourceMarkReauth_(connectionIdValue, generationValue) {
  const props = PropertiesService.getScriptProperties();
  const registry = mailboxSourceReadRegistry_(props);
  const connection = registry.connections.find(item => item.id === String(connectionIdValue || '') &&
    item.provider === 'box' && Number(item.tokenGeneration) === Number(generationValue));
  if (!connection) return false;
  connection.status = 'reauth_required';
  registry.revision += 1;
  mailboxSourceWriteRegistry_(props, registry);
  return true;
}

function mailboxBoxSourceDisconnect_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['provider', 'sourceConnectionId']);
  if (String(payload.provider || '') !== 'box') throw mailboxError_('INVALID_SOURCE', 'Некоректний провайдер Box.');
  const connection = mailboxSourceResolveAccess_(session, payload.sourceConnectionId, 'box');
  const props = PropertiesService.getScriptProperties();
  const key = MAILBOX_MULTI_CONFIG_.SOURCE_OAUTH_TOKEN_PREFIX + connection.id;
  let record = null;
  try { record = JSON.parse(String(props.getProperty(key) || 'null')); } catch (error) { record = null; }
  if (!record || Number(record.generation) !== Number(connection.tokenGeneration) ||
      !mailboxBoxSafeToken_(record.refreshToken)) {
    throw mailboxError_('SOURCE_REAUTH_REQUIRED', 'Захищений доступ Box відсутній.');
  }
  const config = mailboxBoxConfig_(true);
  if (!mailboxBoxTryRevokeToken_(config, record.refreshToken)) {
    throw mailboxError_('SOURCE_CLEANUP_PENDING', 'Box ще не підтвердив відкликання. Повторіть спробу пізніше.');
  }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Box уже відключається.');
  try {
    const registry = mailboxSourceReadRegistry_(props);
    const current = registry.connections.find(item => item.id === connection.id &&
      item.ownerUserId === String(session.userId) && item.provider === 'box');
    if (!current || Number(current.tokenGeneration) !== Number(connection.tokenGeneration)) {
      throw mailboxError_('BUSY', 'Підключення Box змінилося під час відкликання.');
    }
    current.status = 'revoked';
    registry.preferences.filter(item => item.userId === String(session.userId)).forEach(pref => {
      if (pref.active.box === connection.id) delete pref.active.box;
      pref.updatedAt = Date.now();
    });
    registry.revision += 1;
    mailboxSourceWriteRegistry_(props, registry);
    props.deleteProperty(key);
    return { provider: 'box', disconnected: true, sourceConnectionId: connection.id };
  } finally {
    lock.releaseLock();
  }
}

function mailboxMultiInitialRegistry_(ownerIdValue) {
  const ownerId = String(ownerIdValue || '');
  if (!/^\d{1,24}$/.test(ownerId)) {
    throw mailboxError_('SERVER_CONFIG', 'Власника поштової зони не налаштовано.');
  }
  return {
    v: MAILBOX_MULTI_CONFIG_.REGISTRY_VERSION,
    revision: 1,
    zones: [{
      id: MAILBOX_MULTI_CONFIG_.LEGACY_ZONE_ID,
      name: 'Особиста пошта',
      ownerUserId: ownerId,
      createdAt: Date.now(),
    }],
    members: [{
      zoneId: MAILBOX_MULTI_CONFIG_.LEGACY_ZONE_ID,
      userId: ownerId,
      role: 'owner',
      status: 'active',
      addedAt: Date.now(),
    }],
    connections: [{
      id: MAILBOX_MULTI_CONFIG_.LEGACY_CONNECTION_ID,
      zoneId: MAILBOX_MULTI_CONFIG_.LEGACY_ZONE_ID,
      provider: 'apps_script_owner',
      email: '',
      displayName: 'Павло Тарасевич',
      status: 'active',
      connectedByUserId: ownerId,
      connectedAt: Date.now(),
      tokenGeneration: 0,
    }],
    invites: [],
    preferences: [{
      userId: ownerId,
      activeConnectionId: MAILBOX_MULTI_CONFIG_.LEGACY_CONNECTION_ID,
      unifiedConnectionIds: [MAILBOX_MULTI_CONFIG_.LEGACY_CONNECTION_ID],
      notificationConnectionIds: [MAILBOX_MULTI_CONFIG_.LEGACY_CONNECTION_ID],
      notifications: 'all',
      updatedAt: Date.now(),
    }],
  };
}

function mailboxMultiReadRegistry_(properties) {
  const props = properties || PropertiesService.getScriptProperties();
  const raw = String(props.getProperty(MAILBOX_MULTI_CONFIG_.REGISTRY_PROPERTY) || '');
  if (!raw) return mailboxMultiInitialRegistry_(mailboxOwnerId_());
  let value = null;
  try { value = JSON.parse(raw); } catch (error) { value = null; }
  return mailboxMultiValidateRegistry_(value);
}

function mailboxMultiWriteRegistry_(properties, registry) {
  const props = properties || PropertiesService.getScriptProperties();
  const safe = mailboxMultiValidateRegistry_(registry);
  const serialized = JSON.stringify(safe);
  assertTelegramPropertyValueFits_(MAILBOX_MULTI_CONFIG_.REGISTRY_PROPERTY, serialized);
  assertTelegramPropertyStoreFits_(props, {
    [MAILBOX_MULTI_CONFIG_.REGISTRY_PROPERTY]: serialized,
  });
  props.setProperty(MAILBOX_MULTI_CONFIG_.REGISTRY_PROPERTY, serialized);
  return safe;
}

function mailboxMultiValidateRegistry_(value) {
  if (!mailboxIsPlainObject_(value) || value.v !== MAILBOX_MULTI_CONFIG_.REGISTRY_VERSION ||
      !Number.isInteger(value.revision) || value.revision < 1 ||
      !Array.isArray(value.zones) || !Array.isArray(value.members) ||
      !Array.isArray(value.connections) || !Array.isArray(value.invites) ||
      !Array.isArray(value.preferences)) {
    throw mailboxError_('SERVER_CONFIG', 'Реєстр поштових зон пошкоджений.');
  }
  const zones = value.zones.map(mailboxMultiValidateZone_);
  const zoneIds = new Set(zones.map(item => item.id));
  if (zoneIds.size !== zones.length) {
    throw mailboxError_('SERVER_CONFIG', 'Реєстр містить повторені поштові зони.');
  }
  const members = value.members.map(item => mailboxMultiValidateMember_(item, zoneIds));
  const memberKeys = new Set(members.map(item => item.zoneId + ':' + item.userId));
  if (memberKeys.size !== members.length) {
    throw mailboxError_('SERVER_CONFIG', 'Реєстр містить повторених учасників зони.');
  }
  zones.forEach(zone => {
    const owner = members.find(item => item.zoneId === zone.id && item.userId === zone.ownerUserId &&
      item.role === 'owner' && item.status === 'active');
    if (!owner) throw mailboxError_('SERVER_CONFIG', 'Поштова зона не має активного власника.');
  });
  const connections = value.connections.map(item => mailboxMultiValidateConnection_(item, zoneIds));
  const connectionIds = new Set(connections.map(item => item.id));
  if (connectionIds.size !== connections.length) {
    throw mailboxError_('SERVER_CONFIG', 'Реєстр містить повторені Gmail-підключення.');
  }
  const invites = value.invites.map(item => mailboxMultiValidateInvite_(item, zoneIds));
  const inviteIds = new Set(invites.map(item => item.id));
  if (inviteIds.size !== invites.length) {
    throw mailboxError_('SERVER_CONFIG', 'Реєстр містить повторені запрошення.');
  }
  const preferences = value.preferences.map(item =>
    mailboxMultiValidatePreferences_(item, members, connections)
  );
  const preferenceUsers = new Set(preferences.map(item => item.userId));
  if (preferenceUsers.size !== preferences.length) {
    throw mailboxError_('SERVER_CONFIG', 'Реєстр містить повторені налаштування користувача.');
  }
  return { v: 1, revision: value.revision, zones, members, connections, invites, preferences };
}

function mailboxMultiValidateZone_(item) {
  const id = mailboxMultiOpaqueId_(item && item.id, 'zone');
  const ownerUserId = String(item && item.ownerUserId || '');
  if (!/^\d{1,24}$/.test(ownerUserId)) {
    throw mailboxError_('SERVER_CONFIG', 'Власник поштової зони недійсний.');
  }
  return {
    id,
    name: mailboxSafeText_(item && item.name, 100) || 'Поштова зона',
    ownerUserId,
    createdAt: mailboxMultiTimestamp_(item && item.createdAt),
  };
}

function mailboxMultiValidateMember_(item, zoneIds) {
  const zoneId = mailboxMultiOpaqueId_(item && item.zoneId, 'zone');
  const userId = String(item && item.userId || '');
  const role = String(item && item.role || '');
  const status = String(item && item.status || '');
  if (!zoneIds.has(zoneId) || !/^\d{1,24}$/.test(userId) ||
      !Object.prototype.hasOwnProperty.call(MAILBOX_MULTI_CONFIG_.ROLE_ORDER, role) ||
      ['active', 'revoked'].indexOf(status) === -1) {
    throw mailboxError_('SERVER_CONFIG', 'Учасник поштової зони недійсний.');
  }
  return { zoneId, userId, role, status, addedAt: mailboxMultiTimestamp_(item && item.addedAt) };
}

function mailboxMultiValidateConnection_(item, zoneIds) {
  const id = mailboxMultiOpaqueId_(item && item.id, 'gmail');
  const zoneId = mailboxMultiOpaqueId_(item && item.zoneId, 'zone');
  const provider = String(item && item.provider || '');
  const status = String(item && item.status || '');
  const connectedByUserId = String(item && item.connectedByUserId || '');
  const email = String(item && item.email || '').toLowerCase();
  if (!zoneIds.has(zoneId) || ['apps_script_owner', 'google_oauth'].indexOf(provider) === -1 ||
      ['active', 'reauth_required', 'revoked'].indexOf(status) === -1 ||
      !/^\d{1,24}$/.test(connectedByUserId) ||
      (email && mailboxSafeEmail_(email) !== email) ||
      !Number.isInteger(Number(item && item.tokenGeneration)) || Number(item.tokenGeneration) < 0) {
    throw mailboxError_('SERVER_CONFIG', 'Gmail-підключення в реєстрі недійсне.');
  }
  return {
    id,
    zoneId,
    provider,
    email,
    displayName: mailboxSafeText_(item && item.displayName, 160),
    avatarUrl: mailboxMultiSafeAvatarUrl_(item && item.avatarUrl),
    status,
    connectedByUserId,
    connectedAt: mailboxMultiTimestamp_(item && item.connectedAt),
    tokenGeneration: Number(item.tokenGeneration),
  };
}

function mailboxMultiValidateInvite_(item, zoneIds) {
  const id = mailboxMultiOpaqueId_(item && item.id, 'invite');
  const zoneId = mailboxMultiOpaqueId_(item && item.zoneId, 'zone');
  const role = String(item && item.role || '');
  const status = String(item && item.status || '');
  const createdByUserId = String(item && item.createdByUserId || '');
  if (!zoneIds.has(zoneId) || ['viewer', 'responder', 'manager', 'admin'].indexOf(role) === -1 ||
      ['pending', 'accepted', 'revoked', 'expired'].indexOf(status) === -1 ||
      !/^\d{1,24}$/.test(createdByUserId)) {
    throw mailboxError_('SERVER_CONFIG', 'Запрошення до поштової зони недійсне.');
  }
  const acceptedByUserId = String(item && item.acceptedByUserId || '');
  if (acceptedByUserId && !/^\d{1,24}$/.test(acceptedByUserId)) {
    throw mailboxError_('SERVER_CONFIG', 'Одержувач запрошення недійсний.');
  }
  return {
    id,
    zoneId,
    role,
    status,
    secretHash: mailboxMultiDigest_(item && item.secretHash),
    createdByUserId,
    createdAt: mailboxMultiTimestamp_(item && item.createdAt),
    expiresAt: mailboxMultiTimestamp_(item && item.expiresAt),
    acceptedByUserId,
    acceptedAt: item && item.acceptedAt ? mailboxMultiTimestamp_(item.acceptedAt) : 0,
  };
}

function mailboxMultiValidatePreferences_(item, members, connections) {
  const userId = String(item && item.userId || '');
  const activeConnectionId = String(item && item.activeConnectionId || '');
  const unifiedConnectionIds = Array.isArray(item && item.unifiedConnectionIds)
    ? item.unifiedConnectionIds.map(value => mailboxMultiOpaqueId_(value, 'gmail'))
    : [];
  const notificationConnectionIds = Array.isArray(item && item.notificationConnectionIds)
    ? item.notificationConnectionIds.map(value => mailboxMultiOpaqueId_(value, 'gmail'))
    : [];
  const notifications = String(item && item.notifications || 'all');
  if (!/^\d{1,24}$/.test(userId) || ['all', 'important', 'none'].indexOf(notifications) === -1 ||
      (activeConnectionId && !/^gmail-[A-Za-z0-9_-]{1,80}$/.test(activeConnectionId))) {
    throw mailboxError_('SERVER_CONFIG', 'Налаштування поштового користувача недійсні.');
  }
  const allowedZones = new Set(members.filter(member => member.userId === userId && member.status === 'active')
    .map(member => member.zoneId));
  const allowedConnections = new Set(connections.filter(connection => allowedZones.has(connection.zoneId) &&
    connection.status !== 'revoked').map(connection => connection.id));
  if ((activeConnectionId && !allowedConnections.has(activeConnectionId)) ||
      unifiedConnectionIds.some(id => !allowedConnections.has(id)) ||
      notificationConnectionIds.some(id => !allowedConnections.has(id)) ||
      new Set(unifiedConnectionIds).size !== unifiedConnectionIds.length ||
      new Set(notificationConnectionIds).size !== notificationConnectionIds.length) {
    throw mailboxError_('SERVER_CONFIG', 'Налаштування посилаються на недоступний Gmail-акаунт.');
  }
  return {
    userId,
    activeConnectionId,
    unifiedConnectionIds,
    notificationConnectionIds,
    notifications,
    updatedAt: mailboxMultiTimestamp_(item && item.updatedAt),
  };
}

function mailboxMultiAuthorizeUser_(userIdValue, registryValue) {
  const userId = String(userIdValue || '');
  if (!/^\d{1,24}$/.test(userId)) throw mailboxError_('UNAUTHORIZED', 'Telegram-користувач недійсний.');
  const registry = registryValue || mailboxMultiReadRegistry_();
  const memberships = registry.members.filter(item => item.userId === userId && item.status === 'active');
  if (!memberships.length) {
    throw mailboxError_('FORBIDDEN', 'Немає доступу до жодної поштової зони. Попросіть власника надіслати запрошення.');
  }
  return { userId, memberships };
}

/** Create the caller's isolated personal zone on first authenticated launch. */
function mailboxMultiEnsurePersonalWorkspace_(userIdValue) {
  const userId = String(userIdValue || '');
  if (!/^\d{1,24}$/.test(userId)) throw mailboxError_('UNAUTHORIZED', 'Telegram-користувач недійсний.');
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Особистий поштовий простір уже створюється.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxMultiReadRegistry_(props);
    const active = registry.members.filter(item => item.userId === userId && item.status === 'active');
    if (active.length) return { registry, memberships: active };
    const suffix = mailboxMultiHashText_('personal:' + userId).slice(0, 20);
    const zoneId = 'zone-' + suffix;
    const now = Date.now();
    if (!registry.zones.some(item => item.id === zoneId)) {
      registry.zones.push({ id: zoneId, name: 'Моя пошта', ownerUserId: userId, createdAt: now });
    }
    registry.members.push({ zoneId, userId, role: 'owner', status: 'active', addedAt: now });
    registry.preferences.push({
      userId,
      activeConnectionId: '',
      unifiedConnectionIds: [],
      notificationConnectionIds: [],
      notifications: 'all',
      updatedAt: now,
    });
    registry.revision += 1;
    const saved = mailboxMultiWriteRegistry_(props, registry);
    return { registry: saved, memberships: saved.members.filter(item => item.userId === userId && item.status === 'active') };
  } finally {
    lock.releaseLock();
  }
}

function mailboxMultiPrincipal_(userIdValue) {
  const ensured = mailboxMultiEnsurePersonalWorkspace_(userIdValue);
  const userId = String(userIdValue);
  const preference = ensured.registry.preferences.find(item => item.userId === userId) || {
    activeConnectionId: '', unifiedConnectionIds: [], notificationConnectionIds: [], notifications: 'all',
  };
  const visible = mailboxMultiVisibleAccounts_({ userId, connectionId: preference.activeConnectionId }, ensured.registry);
  const selected = visible.find(item => item.id === preference.activeConnectionId && item.connected) ||
    visible.find(item => item.connected) || null;
  const membership = selected
    ? ensured.memberships.find(item => item.zoneId === selected.zoneId)
    : ensured.memberships[0];
  return {
    userId,
    registry: ensured.registry,
    memberships: ensured.memberships,
    connectionId: selected ? selected.id : '',
    zoneId: selected ? selected.zoneId : String(membership && membership.zoneId || ''),
    role: String(membership && membership.role || 'owner'),
  };
}

function mailboxMultiResolveAccess_(session, connectionIdValue, minimumRoleValue, registryValue) {
  const userId = String(session && session.userId || '');
  const connectionId = mailboxMultiOpaqueId_(connectionIdValue, 'gmail');
  const registry = registryValue || mailboxMultiReadRegistry_();
  const connection = registry.connections.find(item => item.id === connectionId && item.status !== 'revoked');
  if (!connection) throw mailboxError_('NOT_FOUND', 'Gmail-акаунт не підключено або доступ відкликано.');
  const member = registry.members.find(item => item.zoneId === connection.zoneId &&
    item.userId === userId && item.status === 'active');
  if (!member) throw mailboxError_('FORBIDDEN', 'Цей Gmail-акаунт належить іншій поштовій зоні.');
  const minimumRole = String(minimumRoleValue || 'viewer');
  if (!MAILBOX_MULTI_CONFIG_.ROLE_ORDER[minimumRole] ||
      MAILBOX_MULTI_CONFIG_.ROLE_ORDER[member.role] < MAILBOX_MULTI_CONFIG_.ROLE_ORDER[minimumRole]) {
    throw mailboxError_('FORBIDDEN', 'Ваша роль не дозволяє цю дію з Gmail.');
  }
  return { connection, member };
}

function mailboxMultiVisibleAccounts_(session, registryValue) {
  const registry = registryValue || mailboxMultiReadRegistry_();
  const userId = String(session && session.userId || '');
  const memberships = registry.members.filter(item => item.userId === userId && item.status === 'active');
  const membershipByZone = new Map(memberships.map(item => [item.zoneId, item]));
  const zones = new Set(membershipByZone.keys());
  return registry.connections.filter(item => zones.has(item.zoneId) && item.status !== 'revoked').map(item => ({
    id: item.id,
    zoneId: item.zoneId,
    email: item.email,
    name: item.displayName || item.email || 'Gmail',
    avatarUrl: item.avatarUrl || '',
    connected: item.status === 'active',
    requiresReauth: item.status === 'reauth_required',
    current: item.id === String(session && session.connectionId || ''),
    provider: item.provider,
    canDisconnect: item.provider === 'google_oauth' &&
      MAILBOX_MULTI_CONFIG_.ROLE_ORDER[membershipByZone.get(item.zoneId).role] >= MAILBOX_MULTI_CONFIG_.ROLE_ORDER.admin,
  }));
}

function mailboxMultiSelectConnection_(session, connectionIdValue, registryValue) {
  const access = mailboxMultiResolveAccess_(session, connectionIdValue, 'viewer', registryValue);
  if (access.connection.status !== 'active') {
    throw mailboxError_('REAUTH_REQUIRED', 'Для цього Gmail-акаунта потрібно оновити доступ Google.');
  }
  session.connectionId = access.connection.id;
  session.zoneId = access.connection.zoneId;
  session.role = access.member.role;
  if (!registryValue) mailboxMultiRememberSelection_(session.userId, access.connection.id);
  return access;
}

function mailboxMultiRememberSelection_(userIdValue, connectionIdValue) {
  const userId = String(userIdValue || '');
  const connectionId = mailboxMultiOpaqueId_(connectionIdValue, 'gmail');
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Вибір Gmail-акаунта вже оновлюється.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxMultiReadRegistry_(props);
    mailboxMultiResolveAccess_({ userId }, connectionId, 'viewer', registry);
    let preference = registry.preferences.find(item => item.userId === userId);
    if (!preference) {
      preference = { userId, activeConnectionId: '', unifiedConnectionIds: [], notificationConnectionIds: [], notifications: 'all', updatedAt: Date.now() };
      registry.preferences.push(preference);
    }
    preference.activeConnectionId = connectionId;
    if (preference.unifiedConnectionIds.indexOf(connectionId) === -1) preference.unifiedConnectionIds.push(connectionId);
    if (preference.notificationConnectionIds.indexOf(connectionId) === -1) preference.notificationConnectionIds.push(connectionId);
    preference.updatedAt = Date.now();
    registry.revision += 1;
    mailboxMultiWriteRegistry_(props, registry);
  } finally {
    lock.releaseLock();
  }
}

function mailboxMultiAccountSettings_(payload, session) {
  mailboxAssertAllowedKeys_(payload, []);
  const registry = mailboxMultiReadRegistry_();
  const preference = registry.preferences.find(item => item.userId === String(session.userId)) || {
    activeConnectionId: '', unifiedConnectionIds: [], notificationConnectionIds: [], notifications: 'all',
  };
  return {
    activeConnectionId: preference.activeConnectionId,
    unifiedConnectionIds: preference.unifiedConnectionIds.slice(),
    notificationConnectionIds: preference.notificationConnectionIds.slice(),
    notificationMode: preference.notifications,
    accounts: mailboxMultiVisibleAccounts_(session, registry).map(account => Object.assign({}, account, {
      inUnifiedInbox: preference.unifiedConnectionIds.indexOf(account.id) !== -1,
      notificationsEnabled: preference.notificationConnectionIds.indexOf(account.id) !== -1,
    })),
  };
}

function mailboxMultiUpdateAccountSettings_(payload, session) {
  mailboxAssertAllowedKeys_(payload, [
    'activeConnectionId', 'unifiedConnectionIds', 'notificationConnectionIds', 'notificationMode',
  ]);
  const activeConnectionId = mailboxMultiOpaqueId_(payload.activeConnectionId, 'gmail');
  const unifiedConnectionIds = mailboxMultiUniqueConnectionIds_(payload.unifiedConnectionIds);
  const notificationConnectionIds = mailboxMultiUniqueConnectionIds_(payload.notificationConnectionIds);
  const notificationMode = String(payload.notificationMode || 'all');
  if (['all', 'important', 'none'].indexOf(notificationMode) === -1) {
    throw mailboxError_('INVALID_REQUEST', 'Режим сповіщень не підтримується.');
  }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Налаштування акаунтів уже оновлюються.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxMultiReadRegistry_(props);
    [activeConnectionId].concat(unifiedConnectionIds, notificationConnectionIds).forEach(id => {
      mailboxMultiResolveAccess_(session, id, 'viewer', registry);
    });
    let preference = registry.preferences.find(item => item.userId === String(session.userId));
    if (!preference) {
      preference = {
        userId: String(session.userId), activeConnectionId: '', unifiedConnectionIds: [],
        notificationConnectionIds: [], notifications: 'all', updatedAt: Date.now(),
      };
      registry.preferences.push(preference);
    }
    preference.activeConnectionId = activeConnectionId;
    preference.unifiedConnectionIds = unifiedConnectionIds;
    preference.notificationConnectionIds = notificationConnectionIds;
    preference.notifications = notificationMode;
    preference.updatedAt = Date.now();
    registry.revision += 1;
    mailboxMultiWriteRegistry_(props, registry);
    mailboxMultiSelectConnection_(session, activeConnectionId, registry);
    return mailboxMultiAccountSettings_({}, session);
  } finally {
    lock.releaseLock();
  }
}

function mailboxMultiUniqueConnectionIds_(value) {
  if (!Array.isArray(value)) throw mailboxError_('INVALID_REQUEST', 'Список Gmail-акаунтів має бути масивом.');
  const ids = value.map(item => mailboxMultiOpaqueId_(item, 'gmail'));
  if (new Set(ids).size !== ids.length) throw mailboxError_('INVALID_REQUEST', 'Gmail-акаунт повторюється в налаштуваннях.');
  return ids;
}

function mailboxMultiCreateInvite_(session, input) {
  mailboxAssertAllowedKeys_(input || {}, ['zoneId', 'role']);
  const zoneId = mailboxMultiOpaqueId_(input && input.zoneId, 'zone');
  const role = String(input && input.role || 'viewer');
  if (['viewer', 'responder', 'manager', 'admin'].indexOf(role) === -1) {
    throw mailboxError_('INVALID_REQUEST', 'Роль запрошення не підтримується.');
  }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Запрошення вже створюється.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxMultiReadRegistry_(props);
    const connection = registry.connections.find(item => item.zoneId === zoneId && item.status !== 'revoked');
    if (!connection) throw mailboxError_('NOT_FOUND', 'Поштова зона не має активного Gmail-підключення.');
    const access = mailboxMultiResolveAccess_(session, connection.id, 'admin', registry);
    if (MAILBOX_MULTI_CONFIG_.ROLE_ORDER[role] >=
        MAILBOX_MULTI_CONFIG_.ROLE_ORDER[access.member.role]) {
      throw mailboxError_(
        'FORBIDDEN',
        'Запрошення може надавати лише роль, нижчу за вашу власну.'
      );
    }
    const secret = mailboxRandomToken_();
    const now = Date.now();
    registry.invites = registry.invites.filter(item => item.expiresAt > now && item.status === 'pending').slice(-49);
    registry.invites.push({
      id: 'invite-' + mailboxRandomToken_().slice(0, 20),
      zoneId,
      role,
      status: 'pending',
      secretHash: mailboxMultiHashText_(secret),
      createdByUserId: String(session.userId),
      createdAt: now,
      expiresAt: now + MAILBOX_MULTI_CONFIG_.INVITE_SECONDS * 1000,
      acceptedByUserId: '',
      acceptedAt: 0,
    });
    registry.revision += 1;
    mailboxMultiWriteRegistry_(props, registry);
    return { inviteToken: secret, expiresAt: now + MAILBOX_MULTI_CONFIG_.INVITE_SECONDS * 1000 };
  } finally {
    lock.releaseLock();
  }
}

function mailboxMultiAcceptInvite_(userIdValue, inviteTokenValue) {
  const userId = String(userIdValue || '');
  const token = String(inviteTokenValue || '');
  if (!/^\d{1,24}$/.test(userId) || !/^[A-Za-z0-9_-]{43}$/.test(token)) {
    throw mailboxError_('INVALID_INVITE', 'Запрошення недійсне.');
  }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Запрошення вже приймається.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxMultiReadRegistry_(props);
    const hash = mailboxMultiHashText_(token);
    const invite = registry.invites.find(item => item.status === 'pending' &&
      constantTimeEqual_(item.secretHash, hash));
    if (!invite || invite.expiresAt <= Date.now()) {
      throw mailboxError_('INVALID_INVITE', 'Запрошення використано, відкликано або завершилося.');
    }
    const existing = registry.members.find(item => item.zoneId === invite.zoneId && item.userId === userId);
    if (existing && existing.status === 'active') {
      throw mailboxError_('INVITE_USED', 'Ви вже маєте доступ до цієї поштової зони.');
    }
    if (existing) {
      existing.status = 'active';
      existing.role = invite.role;
      existing.addedAt = Date.now();
    } else {
      registry.members.push({ zoneId: invite.zoneId, userId, role: invite.role, status: 'active', addedAt: Date.now() });
    }
    invite.status = 'accepted';
    invite.acceptedByUserId = userId;
    invite.acceptedAt = Date.now();
    registry.revision += 1;
    mailboxMultiWriteRegistry_(props, registry);
    return { zoneId: invite.zoneId, role: invite.role };
  } finally {
    lock.releaseLock();
  }
}

function mailboxMultiWorkspaceAccess_(payload, session) {
  mailboxAssertAllowedKeys_(payload, []);
  const registry = mailboxMultiReadRegistry_();
  const userId = String(session && session.userId || '');
  const memberships = registry.members.filter(item => item.userId === userId && item.status === 'active');
  return {
    zones: memberships.map(member => {
      const zone = registry.zones.find(item => item.id === member.zoneId);
      const canManage = MAILBOX_MULTI_CONFIG_.ROLE_ORDER[member.role] >= MAILBOX_MULTI_CONFIG_.ROLE_ORDER.admin;
      return {
        id: member.zoneId,
        name: zone ? zone.name : 'Поштова зона',
        role: member.role,
        canManage,
        accounts: registry.connections.filter(item => item.zoneId === member.zoneId && item.status !== 'revoked')
          .map(item => ({ id: item.id, email: item.email, name: item.displayName, status: item.status })),
        members: canManage ? registry.members.filter(item => item.zoneId === member.zoneId && item.status === 'active')
          .map(item => ({ userId: item.userId, role: item.role, isOwner: item.role === 'owner', isSelf: item.userId === userId })) : [],
      };
    }),
    roles: ['viewer', 'responder', 'manager', 'admin'],
  };
}

function mailboxMultiAcceptInviteForSession_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['inviteToken']);
  return mailboxMultiAcceptInvite_(session && session.userId, payload.inviteToken);
}

function mailboxMultiUpdateMember_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['zoneId', 'userId', 'role', 'remove']);
  const zoneId = mailboxMultiOpaqueId_(payload.zoneId, 'zone');
  const targetUserId = String(payload.userId || '');
  const role = String(payload.role || 'viewer');
  const remove = payload.remove === true;
  if (!/^\d{1,24}$/.test(targetUserId) || (!remove && ['viewer', 'responder', 'manager', 'admin'].indexOf(role) === -1)) {
    throw mailboxError_('INVALID_REQUEST', 'Учасник або роль недійсні.');
  }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Доступ учасника вже оновлюється.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxMultiReadRegistry_(props);
    const actor = registry.members.find(item => item.zoneId === zoneId && item.userId === String(session.userId) && item.status === 'active');
    if (!actor || MAILBOX_MULTI_CONFIG_.ROLE_ORDER[actor.role] < MAILBOX_MULTI_CONFIG_.ROLE_ORDER.admin) {
      throw mailboxError_('FORBIDDEN', 'Ваша роль не дозволяє керувати учасниками цієї зони.');
    }
    const target = registry.members.find(item => item.zoneId === zoneId && item.userId === targetUserId && item.status === 'active');
    if (!target) throw mailboxError_('NOT_FOUND', 'Активного учасника не знайдено.');
    if (target.role === 'owner') throw mailboxError_('FORBIDDEN', 'Власника поштової зони не можна видалити або понизити.');
    if (actor.role !== 'owner' && MAILBOX_MULTI_CONFIG_.ROLE_ORDER[target.role] >= MAILBOX_MULTI_CONFIG_.ROLE_ORDER[actor.role]) {
      throw mailboxError_('FORBIDDEN', 'Адміністратор не може змінювати рівного або вищого учасника.');
    }
    if (!remove && actor.role !== 'owner' && MAILBOX_MULTI_CONFIG_.ROLE_ORDER[role] >= MAILBOX_MULTI_CONFIG_.ROLE_ORDER[actor.role]) {
      throw mailboxError_('FORBIDDEN', 'Адміністратор не може призначити рівну або вищу роль.');
    }
    if (remove) target.status = 'revoked';
    else target.role = role;
    if (remove) {
      const targetPreference = registry.preferences.find(item => item.userId === targetUserId);
      if (targetPreference) {
        const allowedZones = new Set(registry.members.filter(member => member.userId === targetUserId && member.status === 'active')
          .map(member => member.zoneId));
        const allowedConnections = new Set(registry.connections.filter(item => item.status !== 'revoked' && allowedZones.has(item.zoneId))
          .map(item => item.id));
        targetPreference.unifiedConnectionIds = targetPreference.unifiedConnectionIds.filter(id => allowedConnections.has(id));
        targetPreference.notificationConnectionIds = targetPreference.notificationConnectionIds.filter(id => allowedConnections.has(id));
        if (!allowedConnections.has(targetPreference.activeConnectionId)) {
          targetPreference.activeConnectionId = targetPreference.unifiedConnectionIds[0] || Array.from(allowedConnections)[0] || '';
        }
        targetPreference.updatedAt = Date.now();
      }
    }
    registry.revision += 1;
    mailboxMultiWriteRegistry_(props, registry);
    return { zoneId, userId: targetUserId, role: remove ? '' : role, removed: remove };
  } finally {
    lock.releaseLock();
  }
}

function mailboxGoogleReadRevocationQueue_(properties) {
  const props = properties || PropertiesService.getScriptProperties();
  const raw = String(props.getProperty(MAILBOX_MULTI_CONFIG_.OAUTH_REVOKE_QUEUE_PROPERTY) || '');
  if (!raw) return [];
  let value = null;
  try { value = JSON.parse(raw); } catch (error) { value = null; }
  if (!Array.isArray(value) || value.length > 50) throw mailboxError_('SERVER_CONFIG', 'Черга відкликання Gmail пошкоджена.');
  const ids = value.map(item => mailboxMultiOpaqueId_(item, 'gmail'));
  if (new Set(ids).size !== ids.length) throw mailboxError_('SERVER_CONFIG', 'Черга відкликання Gmail пошкоджена.');
  return ids;
}

function mailboxGoogleWriteRevocationQueue_(properties, values) {
  const props = properties || PropertiesService.getScriptProperties();
  const ids = values.map(item => mailboxMultiOpaqueId_(item, 'gmail'));
  const serialized = JSON.stringify(ids);
  assertTelegramPropertyValueFits_(MAILBOX_MULTI_CONFIG_.OAUTH_REVOKE_QUEUE_PROPERTY, serialized);
  props.setProperty(MAILBOX_MULTI_CONFIG_.OAUTH_REVOKE_QUEUE_PROPERTY, serialized);
}

function mailboxGoogleRevokeToken_(tokenValue) {
  const token = mailboxGoogleSafeToken_(tokenValue);
  if (!token) return true;
  const response = UrlFetchApp.fetch('https://oauth2.googleapis.com/revoke', {
    method: 'post', contentType: 'application/x-www-form-urlencoded', payload: { token },
    muteHttpExceptions: true, followRedirects: false,
  });
  return Number(response.getResponseCode()) === 200;
}

function mailboxProcessGoogleRevocations_(limitValue) {
  const limit = Math.max(1, Math.min(Number(limitValue) || 1, 3));
  let processed = 0;
  let failed = 0;
  for (let index = 0; index < limit; index += 1) {
    const props = PropertiesService.getScriptProperties();
    const queue = mailboxGoogleReadRevocationQueue_(props);
    if (!queue.length) break;
    const connectionId = queue[0];
    const tokenKey = MAILBOX_MULTI_CONFIG_.OAUTH_TOKEN_PREFIX + connectionId;
    const raw = String(props.getProperty(tokenKey) || '');
    let record = null;
    try { record = raw ? JSON.parse(raw) : null; } catch (error) { record = null; }
    if (raw && (!record || typeof record !== 'object')) {
      failed += 1;
      break;
    }
    const token = String(record && (record.refreshToken || record.accessToken) || '');
    let revoked = !raw;
    try { if (!revoked) revoked = mailboxGoogleRevokeToken_(token); } catch (error) { revoked = false; }
    if (!revoked) {
      failed += 1;
      break;
    }
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) {
      failed += 1;
      break;
    }
    try {
      const current = mailboxGoogleReadRevocationQueue_(props);
      if (current.indexOf(connectionId) === -1) continue;
      props.deleteProperty(tokenKey);
      if (props.getProperty(tokenKey)) {
        failed += 1;
        break;
      }
      mailboxGoogleWriteRevocationQueue_(props, current.filter(id => id !== connectionId));
      processed += 1;
    } finally {
      lock.releaseLock();
    }
  }
  return { processed, failed, pending: mailboxGoogleReadRevocationQueue_().length };
}

function mailboxMultiDisconnectGmail_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['connectionId']);
  const connectionId = mailboxMultiOpaqueId_(payload.connectionId, 'gmail');
  const tokenKey = MAILBOX_MULTI_CONFIG_.OAUTH_TOKEN_PREFIX + connectionId;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Gmail-підключення вже від’єднується.');
  let revokeToken = '';
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxMultiReadRegistry_(props);
    const access = mailboxMultiResolveAccess_(session, connectionId, 'admin', registry);
    if (access.connection.provider !== 'google_oauth') {
      throw mailboxError_('FORBIDDEN', 'Системний Gmail Apps Script не можна від’єднати через Mini App.');
    }
    let tokenRecord = null;
    try { tokenRecord = JSON.parse(String(props.getProperty(tokenKey) || 'null')); } catch (error) { tokenRecord = null; }
    revokeToken = String(tokenRecord && (tokenRecord.refreshToken || tokenRecord.accessToken) || '');
    access.connection.status = 'revoked';
    registry.preferences.forEach(preference => {
      preference.unifiedConnectionIds = preference.unifiedConnectionIds.filter(id => id !== connectionId);
      preference.notificationConnectionIds = preference.notificationConnectionIds.filter(id => id !== connectionId);
      if (preference.activeConnectionId === connectionId) {
        const allowedZones = new Set(registry.members.filter(member => member.userId === preference.userId && member.status === 'active')
          .map(member => member.zoneId));
        const replacement = registry.connections.find(item => item.id !== connectionId && item.status !== 'revoked' && allowedZones.has(item.zoneId));
        preference.activeConnectionId = replacement ? replacement.id : '';
      }
      preference.updatedAt = Date.now();
    });
    const queue = mailboxGoogleReadRevocationQueue_(props);
    if (queue.indexOf(connectionId) === -1) queue.push(connectionId);
    registry.revision += 1;
    const serializedRegistry = JSON.stringify(mailboxMultiValidateRegistry_(registry));
    const serializedQueue = JSON.stringify(queue);
    assertTelegramPropertyStoreFits_(props, {
      [MAILBOX_MULTI_CONFIG_.REGISTRY_PROPERTY]: serializedRegistry,
      [MAILBOX_MULTI_CONFIG_.OAUTH_REVOKE_QUEUE_PROPERTY]: serializedQueue,
    });
    props.setProperties({
      [MAILBOX_MULTI_CONFIG_.REGISTRY_PROPERTY]: serializedRegistry,
      [MAILBOX_MULTI_CONFIG_.OAUTH_REVOKE_QUEUE_PROPERTY]: serializedQueue,
    });
    if (typeof mailboxMetadataSyncPropertyKey_ === 'function') {
      props.deleteProperty(mailboxMetadataSyncPropertyKey_(connectionId));
    }
    const disconnectedUserIds = Array.from(new Set(registry.members
      .filter(member => member.zoneId === access.connection.zoneId)
      .map(member => String(member.userId || ''))
      .filter(userId => /^\d{1,20}$/.test(userId))));
    disconnectedUserIds.forEach(userId => {
      const scope = { userId, connectionId };
      if (typeof mailboxFocusPropertyKey_ === 'function') {
        props.deleteProperty(mailboxFocusPropertyKey_(scope));
      }
      if (typeof mailboxAttentionPropertyKey_ === 'function') {
        props.deleteProperty(mailboxAttentionPropertyKey_(scope));
      }
    });
    try {
      if (typeof MAILBOX_CLIENT_CONFIG_ === 'object' && MAILBOX_CLIENT_CONFIG_) {
        CacheService.getScriptCache().remove(MAILBOX_CLIENT_CONFIG_.SEND_AS_CACHE_KEY + '.' + connectionId);
      }
    } catch (cacheError) {
      console.error('Could not clear disconnected Gmail metadata cache: ' + cacheError);
    }
  } finally {
    lock.releaseLock();
  }

  let revoked = false;
  try { revoked = mailboxGoogleRevokeToken_(revokeToken); } catch (error) { revoked = false; }
  if (revoked) {
    const cleanupLock = LockService.getScriptLock();
    if (cleanupLock.tryLock(5000)) {
      try {
        const props = PropertiesService.getScriptProperties();
        props.deleteProperty(tokenKey);
        if (props.getProperty(tokenKey)) throw mailboxError_('TOKEN_CLEANUP_FAILED', 'OAuth-доступ Gmail відкликано, але локальне очищення ще не завершено.');
        const queue = mailboxGoogleReadRevocationQueue_(props).filter(id => id !== connectionId);
        mailboxGoogleWriteRevocationQueue_(props, queue);
      } finally { cleanupLock.releaseLock(); }
    } else revoked = false;
  }
  return { connectionId, disconnected: true, providerRevoked: revoked, cleanupPending: !revoked };
}

function mailboxMultiOpaqueId_(value, prefix) {
  const text = String(value || '');
  const pattern = new RegExp('^' + String(prefix || 'id') + '-[A-Za-z0-9_-]{1,80}$');
  if (!pattern.test(text)) throw mailboxError_('INVALID_REQUEST', 'Ідентифікатор поштового ресурсу недійсний.');
  return text;
}

function mailboxMultiTimestamp_(value) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1 || number > 9007199254740991) {
    throw mailboxError_('SERVER_CONFIG', 'Час поштового ресурсу недійсний.');
  }
  return number;
}

function mailboxMultiDigest_(value) {
  const text = String(value || '');
  if (!/^[a-f0-9]{64}$/.test(text)) {
    throw mailboxError_('SERVER_CONFIG', 'Відбиток поштового ресурсу недійсний.');
  }
  return text;
}

function mailboxMultiHashText_(value) {
  return bytesToHex_(Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(value || ''),
    Utilities.Charset.UTF_8
  ));
}

function mailboxMultiSafeAvatarUrl_(value) {
  const text = String(value || '');
  if (!text) return '';
  if (!/^https:\/\/[A-Za-z0-9.-]+(?:\/[^\s]*)?$/.test(text) || text.length > 1024) return '';
  return text;
}

function mailboxGoogleOAuthConfig_() {
  const props = PropertiesService.getScriptProperties();
  const clientId = String(props.getProperty(MAILBOX_MULTI_CONFIG_.OAUTH_CLIENT_ID_PROPERTY) || '');
  const clientSecret = String(props.getProperty(MAILBOX_MULTI_CONFIG_.OAUTH_CLIENT_SECRET_PROPERTY) || '');
  const redirectUri = String(props.getProperty(MAILBOX_MULTI_CONFIG_.OAUTH_REDIRECT_URI_PROPERTY) || '');
  if (!/^[0-9]+-[A-Za-z0-9_-]+\.apps\.googleusercontent\.com$/.test(clientId) ||
      clientSecret.length < 16 || clientSecret.length > 512 || /[\s\u0000-\u001f\u007f]/.test(clientSecret) ||
      !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec\?action=gmail_oauth_callback$/.test(redirectUri)) {
    throw mailboxError_('GOOGLE_OAUTH_NOT_CONFIGURED', 'Підключення нових Gmail-акаунтів ще не налаштовано на сервері.');
  }
  return { clientId, clientSecret, redirectUri };
}

function mailboxGoogleConnectStart_(payload, session) {
  mailboxAssertAllowedKeys_(payload, ['zoneId', 'loginHint']);
  const config = mailboxGoogleOAuthConfig_();
  const zoneId = payload.zoneId
    ? mailboxMultiOpaqueId_(payload.zoneId, 'zone')
    : mailboxMultiOpaqueId_(session && session.zoneId, 'zone');
  const registry = mailboxMultiReadRegistry_();
  const member = registry.members.find(item => item.zoneId === zoneId &&
    item.userId === String(session && session.userId || '') && item.status === 'active');
  if (!member || MAILBOX_MULTI_CONFIG_.ROLE_ORDER[member.role] < MAILBOX_MULTI_CONFIG_.ROLE_ORDER.manager) {
    throw mailboxError_('FORBIDDEN', 'Ваша роль не дозволяє підключати Gmail до цієї зони.');
  }
  const loginHint = String(payload.loginHint || '').toLowerCase();
  if (loginHint && mailboxSafeEmail_(loginHint) !== loginHint) {
    throw mailboxError_('INVALID_REQUEST', 'Підказка Gmail-адреси недійсна.');
  }
  const state = mailboxRandomToken_();
  const now = Date.now();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Підключення Gmail уже починається.');
  try {
    const props = PropertiesService.getScriptProperties();
    const states = mailboxGoogleReadStates_(props, now)
      .filter(item => !(item.userId === String(session.userId) && item.zoneId === zoneId))
      .slice(-(MAILBOX_MULTI_CONFIG_.OAUTH_STATE_LIMIT - 1));
    states.push({
      v: 1,
      hash: mailboxMultiHashText_(state),
      userId: String(session.userId),
      zoneId,
      createdAt: now,
      expiresAt: now + MAILBOX_MULTI_CONFIG_.OAUTH_STATE_SECONDS * 1000,
    });
    const serialized = JSON.stringify(states);
    assertTelegramPropertyValueFits_(MAILBOX_MULTI_CONFIG_.OAUTH_STATE_PROPERTY, serialized);
    assertTelegramPropertyStoreFits_(props, { [MAILBOX_MULTI_CONFIG_.OAUTH_STATE_PROPERTY]: serialized });
    props.setProperty(MAILBOX_MULTI_CONFIG_.OAUTH_STATE_PROPERTY, serialized);
  } finally {
    lock.releaseLock();
  }
  const query = {
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    access_type: 'offline',
    include_granted_scopes: 'true',
    prompt: 'select_account consent',
    scope: MAILBOX_MULTI_CONFIG_.GMAIL_SCOPES.join(' '),
    state,
  };
  if (loginHint) query.login_hint = loginHint;
  return {
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?' + Object.keys(query)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(query[key])).join('&'),
    expiresAt: now + MAILBOX_MULTI_CONFIG_.OAUTH_STATE_SECONDS * 1000,
    target: { zoneId, loginHint },
  };
}

function mailboxGoogleHandleOAuthCallback_(input) {
  if (!mailboxIsPlainObject_(input)) throw mailboxError_('GOOGLE_OAUTH_INVALID', 'Відповідь Google має некоректний формат.');
  mailboxAssertAllowedKeys_(input, ['code', 'state', 'error', 'errorDescription']);
  const state = String(input.state || '');
  const code = String(input.code || '');
  const providerError = String(input.error || '');
  if (!/^[A-Za-z0-9_-]{43}$/.test(state) || Boolean(code) === Boolean(providerError) ||
      code.length > 4096 || /[\u0000-\u001f\u007f]/.test(code) ||
      (providerError && !/^[A-Za-z0-9_.-]{1,128}$/.test(providerError))) {
    throw mailboxError_('GOOGLE_OAUTH_INVALID', 'Відповідь Google має некоректний формат.');
  }
  const stateRecord = mailboxGoogleConsumeState_(state);
  if (providerError) {
    throw mailboxError_(providerError === 'access_denied' ? 'GOOGLE_OAUTH_DENIED' : 'GOOGLE_OAUTH_FAILED',
      providerError === 'access_denied' ? 'Підключення Gmail скасовано. Доступ не збережено.' :
        'Google не завершив авторизацію Gmail.');
  }
  const config = mailboxGoogleOAuthConfig_();
  const token = mailboxGoogleExchangeCode_(config, code);
  const identity = mailboxGoogleFetchIdentity_(token.accessToken);
  return mailboxGooglePersistConnection_(stateRecord, token, identity);
}

function mailboxGoogleReadStates_(properties, nowValue) {
  const raw = String(properties.getProperty(MAILBOX_MULTI_CONFIG_.OAUTH_STATE_PROPERTY) || '');
  if (!raw) return [];
  let states = null;
  try { states = JSON.parse(raw); } catch (error) { states = null; }
  if (!Array.isArray(states)) throw mailboxError_('SERVER_CONFIG', 'Стан Google OAuth пошкоджений.');
  const now = Number(nowValue || Date.now());
  const seen = new Set();
  return states.map(item => {
    const valid = mailboxIsPlainObject_(item) && item.v === 1 &&
      /^[a-f0-9]{64}$/.test(String(item.hash || '')) && /^\d{1,24}$/.test(String(item.userId || '')) &&
      /^zone-[A-Za-z0-9_-]{1,80}$/.test(String(item.zoneId || '')) &&
      Number.isInteger(item.createdAt) && Number.isInteger(item.expiresAt) && item.expiresAt > item.createdAt &&
      item.expiresAt - item.createdAt === MAILBOX_MULTI_CONFIG_.OAUTH_STATE_SECONDS * 1000;
    if (!valid || seen.has(item.hash)) throw mailboxError_('SERVER_CONFIG', 'Стан Google OAuth пошкоджений.');
    seen.add(item.hash);
    return item;
  }).filter(item => item.expiresAt > now);
}

function mailboxGoogleConsumeState_(state) {
  const hash = mailboxMultiHashText_(state);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Google OAuth уже завершується.');
  try {
    const props = PropertiesService.getScriptProperties();
    const states = mailboxGoogleReadStates_(props, Date.now());
    const index = states.findIndex(item => constantTimeEqual_(item.hash, hash));
    if (index === -1) throw mailboxError_('GOOGLE_OAUTH_INVALID', 'Google OAuth-запит використано або він завершився.');
    const record = states[index];
    states.splice(index, 1);
    props.setProperty(MAILBOX_MULTI_CONFIG_.OAUTH_STATE_PROPERTY, JSON.stringify(states));
    return record;
  } finally {
    lock.releaseLock();
  }
}

function mailboxGoogleExchangeCode_(config, code) {
  const response = UrlFetchApp.fetch('https://oauth2.googleapis.com/token', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload: {
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code',
    },
    muteHttpExceptions: true,
    followRedirects: false,
  });
  const status = Number(response.getResponseCode());
  const value = mailboxGoogleJson_(response);
  const accessToken = String(value && value.access_token || '');
  const refreshToken = String(value && value.refresh_token || '');
  const expiresIn = Number(value && value.expires_in);
  if (status !== 200 || !mailboxGoogleSafeToken_(accessToken) ||
      (refreshToken && !mailboxGoogleSafeToken_(refreshToken)) ||
      !Number.isInteger(expiresIn) || expiresIn < 60 || expiresIn > 86400) {
    throw mailboxError_('GOOGLE_OAUTH_FAILED', 'Google не видав коректний доступ Gmail. Спробуйте підключити акаунт ще раз.');
  }
  return {
    accessToken,
    refreshToken,
    expiresAt: Date.now() + expiresIn * 1000,
    scopes: String(value.scope || '').split(/\s+/).filter(Boolean),
  };
}

function mailboxGoogleFetchIdentity_(accessToken) {
  const profileResponse = UrlFetchApp.fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    method: 'get', headers: { Authorization: 'Bearer ' + accessToken }, muteHttpExceptions: true,
  });
  const userResponse = UrlFetchApp.fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    method: 'get', headers: { Authorization: 'Bearer ' + accessToken }, muteHttpExceptions: true,
  });
  const profile = mailboxGoogleJson_(profileResponse);
  const user = mailboxGoogleJson_(userResponse);
  const email = String(profile && profile.emailAddress || user && user.email || '').toLowerCase();
  const subject = String(user && user.sub || '');
  if (Number(profileResponse.getResponseCode()) !== 200 || mailboxSafeEmail_(email) !== email ||
      Number(userResponse.getResponseCode()) !== 200 || !/^[A-Za-z0-9_-]{5,128}$/.test(subject)) {
    throw mailboxError_('GOOGLE_OAUTH_FAILED', 'Не вдалося підтвердити обраний Gmail-акаунт.');
  }
  return {
    email,
    subject,
    displayName: mailboxSafeText_(user && user.name, 160) || email,
    avatarUrl: mailboxMultiSafeAvatarUrl_(user && user.picture),
  };
}

function mailboxGooglePersistConnection_(state, token, identity) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw mailboxError_('BUSY', 'Gmail-підключення вже зберігається.');
  try {
    const props = PropertiesService.getScriptProperties();
    const registry = mailboxMultiReadRegistry_(props);
    const member = registry.members.find(item => item.zoneId === state.zoneId &&
      item.userId === state.userId && item.status === 'active');
    if (!member || MAILBOX_MULTI_CONFIG_.ROLE_ORDER[member.role] < MAILBOX_MULTI_CONFIG_.ROLE_ORDER.manager) {
      throw mailboxError_('FORBIDDEN', 'Доступ до поштової зони відкликано до завершення Google OAuth.');
    }
    let connection = registry.connections.find(item => item.zoneId === state.zoneId &&
      item.email === identity.email);
    const now = Date.now();
    if (!connection) {
      connection = {
        id: 'gmail-' + mailboxMultiHashText_(state.zoneId + ':' + identity.subject).slice(0, 24),
        zoneId: state.zoneId,
        provider: 'google_oauth',
        email: identity.email,
        displayName: identity.displayName,
        avatarUrl: identity.avatarUrl,
        status: 'active',
        connectedByUserId: state.userId,
        connectedAt: now,
        tokenGeneration: 1,
      };
      registry.connections.push(connection);
    } else if (connection.provider !== 'google_oauth') {
      throw mailboxError_('GOOGLE_OAUTH_CONFLICT', 'Ця Gmail-скринька вже підключена іншим серверним способом.');
    } else {
      connection.displayName = identity.displayName;
      connection.avatarUrl = identity.avatarUrl;
      connection.status = 'active';
      connection.tokenGeneration += 1;
    }
    const tokenKey = MAILBOX_MULTI_CONFIG_.OAUTH_TOKEN_PREFIX + connection.id;
    let previous = null;
    try { previous = JSON.parse(String(props.getProperty(tokenKey) || 'null')); } catch (error) { previous = null; }
    const refreshToken = token.refreshToken || String(previous && previous.refreshToken || '');
    if (!mailboxGoogleSafeToken_(refreshToken)) {
      throw mailboxError_('GOOGLE_OAUTH_REAUTH_REQUIRED', 'Google не повернув довготривалий дозвіл. Відкличте старий доступ і підключіть Gmail ще раз.');
    }
    const tokenRecord = {
      v: 1,
      subject: identity.subject,
      email: identity.email,
      accessToken: token.accessToken,
      refreshToken,
      accessExpiresAt: token.expiresAt,
      scopes: token.scopes,
      generation: connection.tokenGeneration,
      updatedAt: now,
    };
    const pref = registry.preferences.find(item => item.userId === state.userId);
    if (pref) {
      pref.activeConnectionId = connection.id;
      if (pref.unifiedConnectionIds.indexOf(connection.id) === -1) pref.unifiedConnectionIds.push(connection.id);
      if (pref.notificationConnectionIds.indexOf(connection.id) === -1) pref.notificationConnectionIds.push(connection.id);
      pref.updatedAt = now;
    }
    registry.revision += 1;
    const serializedRegistry = JSON.stringify(mailboxMultiValidateRegistry_(registry));
    const serializedToken = JSON.stringify(tokenRecord);
    assertTelegramPropertyValueFits_(tokenKey, serializedToken);
    assertTelegramPropertyStoreFits_(props, {
      [MAILBOX_MULTI_CONFIG_.REGISTRY_PROPERTY]: serializedRegistry,
      [tokenKey]: serializedToken,
    });
    props.setProperties({
      [MAILBOX_MULTI_CONFIG_.REGISTRY_PROPERTY]: serializedRegistry,
      [tokenKey]: serializedToken,
    });
    return {
      ok: true,
      account: { id: connection.id, email: connection.email, name: connection.displayName, avatarUrl: connection.avatarUrl },
      message: 'Gmail-акаунт ' + connection.email + ' підключено.',
    };
  } finally {
    lock.releaseLock();
  }
}

function mailboxMultiGmailAccessToken_(session) {
  const access = mailboxMultiResolveAccess_(session, session && session.connectionId, 'viewer');
  if (access.connection.status !== 'active') {
    throw mailboxError_('REAUTH_REQUIRED', 'Це Gmail-підключення неактивне або його доступ відкликано.');
  }
  if (access.connection.provider === 'apps_script_owner') return ScriptApp.getOAuthToken();
  const props = PropertiesService.getScriptProperties();
  const key = MAILBOX_MULTI_CONFIG_.OAUTH_TOKEN_PREFIX + access.connection.id;
  let record = null;
  try { record = JSON.parse(String(props.getProperty(key) || 'null')); } catch (error) { record = null; }
  if (!record || record.v !== 1 || record.email !== access.connection.email ||
      Number(record.generation) !== Number(access.connection.tokenGeneration) ||
      !mailboxGoogleSafeToken_(record.refreshToken)) {
    throw mailboxError_('REAUTH_REQUIRED', 'Захищений доступ до цього Gmail-акаунта відсутній або відкликаний.');
  }
  if (mailboxGoogleSafeToken_(record.accessToken) && Number(record.accessExpiresAt) > Date.now() + 90000) {
    return record.accessToken;
  }
  return mailboxGoogleRefreshAccess_(key, record, access.connection);
}

function mailboxGoogleRefreshAccess_(key, record, connection) {
  const config = mailboxGoogleOAuthConfig_();
  const response = UrlFetchApp.fetch('https://oauth2.googleapis.com/token', {
    method: 'post', contentType: 'application/x-www-form-urlencoded', muteHttpExceptions: true,
    payload: {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: record.refreshToken,
      grant_type: 'refresh_token',
    },
  });
  const value = mailboxGoogleJson_(response);
  const accessToken = String(value && value.access_token || '');
  const expiresIn = Number(value && value.expires_in);
  if (Number(response.getResponseCode()) !== 200 || !mailboxGoogleSafeToken_(accessToken) ||
      !Number.isInteger(expiresIn) || expiresIn < 60 || expiresIn > 86400) {
    throw mailboxError_('REAUTH_REQUIRED', 'Google відкликав або завершив доступ до ' + connection.email + '. Підключіть акаунт знову.');
  }
  record.accessToken = accessToken;
  record.accessExpiresAt = Date.now() + expiresIn * 1000;
  record.updatedAt = Date.now();
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(record));
  return accessToken;
}

function mailboxGoogleSafeToken_(value) {
  const token = String(value || '');
  return token.length >= 16 && token.length <= 4096 && !/[\s\u0000-\u001f\u007f]/.test(token) ? token : '';
}

function mailboxGoogleJson_(response) {
  try {
    const value = JSON.parse(String(response && response.getContentText() || ''));
    return mailboxIsPlainObject_(value) ? value : {};
  } catch (error) {
    return {};
  }
}
