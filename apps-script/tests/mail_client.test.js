const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const codePath = path.join(root, 'Code.gs');
const clientPath = path.join(root, 'MailClient.gs');
const multiAccountPath = path.join(root, 'MultiAccount.gs');
const uiPath = path.join(root, 'MailApp.html');

const codeSource = fs.readFileSync(codePath, 'utf8');
const clientSource = fs.existsSync(clientPath) ? fs.readFileSync(clientPath, 'utf8') : '';
const multiAccountSource = fs.existsSync(multiAccountPath) ? fs.readFileSync(multiAccountPath, 'utf8') : '';
const uiSource = fs.existsSync(uiPath) ? fs.readFileSync(uiPath, 'utf8') : '';

const OWNER_ID = '427886279';
const BOT_TOKEN = '123456789:test-bot-token';

function requireClientFile() {
  assert.ok(
    clientSource,
    'MailClient.gs is missing; add the mailbox RPC implementation before running this suite.'
  );
}

function requireUiFile() {
  assert.ok(
    uiSource,
    'MailApp.html is missing; add the authenticated Mini App shell before running this suite.'
  );
}

function byteArray(value) {
  const bytes = Buffer.isBuffer(value)
    ? value
    : Array.isArray(value) || ArrayBuffer.isView(value)
      ? Buffer.from(Array.from(value, item => Number(item) < 0 ? Number(item) + 256 : Number(item)))
      : Buffer.from(String(value == null ? '' : value), 'utf8');
  return Array.from(bytes, item => item > 127 ? item - 256 : item);
}

function bufferFrom(value) {
  if (Buffer.isBuffer(value)) return Buffer.from(value);
  if (Array.isArray(value) || ArrayBuffer.isView(value)) {
    return Buffer.from(Array.from(value, item => Number(item) < 0 ? Number(item) + 256 : Number(item)));
  }
  return Buffer.from(String(value == null ? '' : value), 'utf8');
}

function makeBlob(value, contentType = 'application/octet-stream', name = '') {
  const bytes = bufferFrom(value);
  let filename = name;
  return {
    getBytes: () => byteArray(bytes),
    getDataAsString: () => bytes.toString('utf8'),
    getContentType: () => contentType,
    getName: () => filename,
    setName: valueToSet => {
      filename = String(valueToSet || '');
      return makeBlob(bytes, contentType, filename);
    },
  };
}

function jsonResponse(value, status = 200) {
  return {
    getResponseCode: () => status,
    getContentText: () => JSON.stringify(value),
  };
}

function httpResponse(body = '', status = 200, headers = {}) {
  const bytes = bufferFrom(body);
  return {
    getResponseCode: () => status,
    getContentText: () => bytes.toString('utf8'),
    getAllHeaders: () => ({ ...headers }),
    getHeaders: () => ({ ...headers }),
    getBlob: () => makeBlob(bytes, headers['Content-Type'] || headers['content-type'] || 'application/octet-stream'),
  };
}

function makeContext(options = {}) {
  requireClientFile();
  const propertyValues = {
    BOT_TOKEN,
    CHAT_ID: OWNER_ID,
    ...(options.properties || {}),
  };
  const cacheValues = new Map();
  const gmailCalls = [];
  const urlFetchCalls = [];
  const urlFetchSingleCalls = [];
  const fetchAllBatches = [];
  const cacheGetCalls = [];
  const cacheGetAllCalls = [];
  const languageCalls = [];
  let uuidCounter = 0;

  const properties = {
    getProperty: key => Object.prototype.hasOwnProperty.call(propertyValues, key)
      ? String(propertyValues[key])
      : null,
    setProperty: (key, value) => {
      if (options.propertySet) options.propertySet(String(key), String(value), propertyValues);
      propertyValues[key] = String(value);
    },
    setProperties: values => {
      Object.keys(values || {}).forEach(key => {
        if (options.propertySet) options.propertySet(String(key), String(values[key]), propertyValues);
        propertyValues[key] = String(values[key]);
      });
    },
    deleteProperty: key => {
      if (options.propertyDelete) options.propertyDelete(String(key), propertyValues);
      delete propertyValues[key];
    },
    getProperties: () => ({ ...propertyValues }),
  };
  const cache = {
    get: key => {
      cacheGetCalls.push(String(key));
      return cacheValues.has(String(key)) ? cacheValues.get(String(key)) : null;
    },
    getAll: keys => {
      const normalized = (keys || []).map(String);
      cacheGetAllCalls.push(normalized);
      return normalized.reduce((values, key) => {
        if (cacheValues.has(key)) values[key] = cacheValues.get(key);
        return values;
      }, {});
    },
    put: (key, value) => {
      const normalizedKey = String(key);
      const normalizedValue = String(value);
      if (options.cachePut) options.cachePut(normalizedKey, normalizedValue, cacheValues);
      cacheValues.set(normalizedKey, normalizedValue);
    },
    putAll: values => Object.entries(values || {}).forEach(([key, value]) => {
      cacheValues.set(String(key), String(value));
    }),
    remove: key => {
      const normalizedKey = String(key);
      if (options.cacheRemove) options.cacheRemove(normalizedKey, cacheValues);
      cacheValues.delete(normalizedKey);
    },
    removeAll: keys => (keys || []).forEach(key => cacheValues.delete(String(key))),
  };

  const context = vm.createContext({
    console: {
      log: () => {},
      warn: () => {},
      error: () => {},
    },
    URL,
    URLSearchParams,
    Set,
    Map,
    Date,
    JSON,
    Math,
    Buffer,
    PropertiesService: { getScriptProperties: () => properties },
    CacheService: {
      getScriptCache: () => cache,
      getUserCache: () => cache,
    },
    LockService: {
      getScriptLock: () => ({ tryLock: () => true, waitLock: () => {}, releaseLock: () => {} }),
      getUserLock: () => ({ tryLock: () => true, waitLock: () => {}, releaseLock: () => {} }),
    },
    ScriptApp: {
      getOAuthToken: () => 'oauth-token-for-tests',
      getProjectTriggers: () => [],
    },
    Session: {
      getScriptTimeZone: () => 'Europe/Brussels',
      getActiveUser: () => ({ getEmail: () => 'tarasevych.pavlo@gmail.com' }),
    },
    Utilities: {
      Charset: { UTF_8: 'UTF-8' },
      DigestAlgorithm: { SHA_256: 'SHA_256' },
      computeDigest: (_algorithm, value) => byteArray(
        crypto.createHash('sha256').update(bufferFrom(value)).digest()
      ),
      computeHmacSha256Signature: (value, key) => byteArray(
        crypto.createHmac('sha256', bufferFrom(key)).update(bufferFrom(value)).digest()
      ),
      base64EncodeWebSafe: value => bufferFrom(value).toString('base64url'),
      base64DecodeWebSafe: value => options.base64DecodeWebSafe
        ? options.base64DecodeWebSafe(String(value || ''))
        : byteArray(Buffer.from(String(value || ''), 'base64url')),
      newBlob: (value, contentType, name) => options.newBlob
        ? options.newBlob(value, contentType, name)
        : makeBlob(value, contentType, name),
      getUuid: () => `00000000-0000-4000-8000-${String(++uuidCounter).padStart(12, '0')}`,
      formatDate: (date, timezone, pattern) => options.formatDate
        ? options.formatDate(new Date(date), timezone, pattern)
        : new Date(date).toISOString(),
      sleep: () => {},
    },
    UrlFetchApp: {
      fetch: (url, request) => {
        urlFetchCalls.push({ url: String(url), request: request || {} });
        urlFetchSingleCalls.push({ url: String(url), request: request || {} });
        if (options.urlFetch) return options.urlFetch(String(url), request || {});
        throw new Error(`Unexpected UrlFetchApp.fetch in unit test: ${url}`);
      },
      fetchAll: requests => {
        fetchAllBatches.push((requests || []).slice());
        return (requests || []).map(request => {
          const url = typeof request === 'string' ? request : request.url;
          const opts = typeof request === 'string' ? {} : request;
          urlFetchCalls.push({ url: String(url), request: opts });
          if (options.urlFetch) return options.urlFetch(String(url), opts);
          throw new Error(`Unexpected UrlFetchApp.fetchAll in unit test: ${url}`);
        });
      },
    },
    LanguageApp: {
      translate: (value, sourceLanguage, targetLanguage) => {
        languageCalls.push({ value: String(value || ''), sourceLanguage, targetLanguage });
        return options.languageTranslate
          ? options.languageTranslate(String(value || ''), sourceLanguage, targetLanguage)
          : String(value || '');
      },
    },
    HtmlService: {
      createHtmlOutput: value => ({
        value,
        setTitle() { return this; },
        setXFrameOptionsMode() { return this; },
      }),
      createTemplateFromFile: () => ({ evaluate: () => ({ setTitle() { return this; } }) }),
      XFrameOptionsMode: { ALLOWALL: 'ALLOWALL' },
    },
    ContentService: {
      MimeType: { JAVASCRIPT: 'text/javascript', JSON: 'application/json' },
      createTextOutput: value => ({ value, setMimeType() { return this; } }),
    },
  });

  vm.runInContext(`${codeSource}\n${multiAccountSource}\n${clientSource}`, context, {
    filename: 'Code.gs+MultiAccount.gs+MailClient.gs',
  });

  const defaultGmail = (requestPath, requestOptions = {}) => {
    gmailCalls.push({ requestPath, options: requestOptions });
    if (options.gmail) return options.gmail(requestPath, requestOptions, gmailCalls.length - 1);
    throw new Error(`Unexpected Gmail request in unit test: ${requestPath}`);
  };
  context.gmailApiRequest_ = defaultGmail;
  context.gmailApi_ = requestPath => defaultGmail(requestPath, { method: 'get' });

  return {
    context,
    propertyValues,
    cacheValues,
    gmailCalls,
    urlFetchCalls,
    urlFetchSingleCalls,
    fetchAllBatches,
    cacheGetCalls,
    cacheGetAllCalls,
    languageCalls,
    setGmail(handler) {
      context.gmailApiRequest_ = (requestPath, requestOptions = {}) => {
        gmailCalls.push({ requestPath, options: requestOptions });
        return handler(requestPath, requestOptions, gmailCalls.length - 1);
      };
      context.gmailApi_ = requestPath => context.gmailApiRequest_(requestPath, { method: 'get' });
    },
  };
}

function telegramInitData(userId = OWNER_ID, overrides = {}) {
  const fields = {
    auth_date: String(Math.floor(Date.now() / 1000)),
    query_id: 'AAE-unit-test-query',
    user: JSON.stringify({
      id: Number(userId),
      first_name: 'Pavlo',
      username: 'tarasevych',
    }),
    ...overrides,
  };
  const check = Object.keys(fields)
    .sort()
    .map(key => `${key}=${fields[key]}`)
    .join('\n');
  const secret = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest();
  fields.hash = crypto.createHmac('sha256', secret).update(check).digest('hex');
  return new URLSearchParams(fields).toString();
}

function assertPublicFunctions(context) {
  assert.equal(
    typeof context.mailboxOpenSession,
    'function',
    'MailClient.gs must expose mailboxOpenSession(initData).'
  );
  assert.equal(
    typeof context.mailboxRpc,
    'function',
    'MailClient.gs must expose mailboxRpc(sessionToken, request).'
  );
  assert.equal(
    typeof context.mailboxRenewSession,
    'function',
    'MailClient.gs must expose mailboxRenewSession(refreshToken).'
  );
  assert.equal(
    typeof context.mailboxRecoverSessionCapacity,
    'function',
    'MailClient.gs must expose explicit owner-bound session-capacity recovery.'
  );
}

function resultData(result, message = 'mailbox RPC should succeed') {
  assert.ok(result && typeof result === 'object', `${message}: expected a result object`);
  assert.equal(
    result.ok,
    true,
    `${message}: ${JSON.stringify(result && result.error ? result.error : result)}`
  );
  return result.data;
}

function resultFailed(result, message = 'mailbox RPC should reject the request') {
  assert.ok(result && typeof result === 'object', `${message}: expected a structured result`);
  assert.equal(result.ok, false, `${message}: ${JSON.stringify(result)}`);
  assert.ok(result.error && result.error.code, `${message}: error.code is required`);
  return result.error;
}

function openOwnerSession(harness) {
  const { context } = harness;
  assertPublicFunctions(context);
  const opened = context.mailboxOpenSession(telegramInitData());
  const data = resultData(opened, 'owner-bound Telegram session should open');
  const token = typeof data === 'string'
    ? data
    : data && (data.sessionToken || data.session || data.token);
  assert.match(String(token || ''), /^[A-Za-z0-9_-]{24,256}$/, 'session token must be opaque');
  assert.notEqual(String(token), telegramInitData(), 'raw Telegram initData must not become the bearer token');
  return String(token);
}
const BOX_TEST_REDIRECT_URI =
  'https://script.google.com/macros/s/unit-test-deployment_123/exec?action=box_oauth_callback';

function boxTestProperties(overrides = {}) {
  return {
    BOX_CLIENT_ID: 'box-client-id-unit-123',
    BOX_CLIENT_SECRET: 'box-client-secret-unit-123456789',
    BOX_REDIRECT_URI: BOX_TEST_REDIRECT_URI,
    ...overrides,
  };
}

function installBoxToken(harness, options = {}) {
  const accessToken = options.accessToken || 'box-access-token-unit-0001';
  const refreshToken = options.refreshToken || 'box-refresh-token-unit-0001';
  const record = harness.context.mailboxBoxCreateTokenRecord_(
    { accessToken, refreshToken, expiresIn: options.expiresIn || 3600 },
    {
      id: options.accountId || '99887766',
      name: options.accountName || 'Pavlo Box',
      login: options.login || 'tarasevych.pavlo@gmail.com',
    }
  );
  if (options.record) Object.assign(record, options.record);
  harness.propertyValues.BOX_OAUTH_TOKEN_V1 = JSON.stringify(record);
  return record;
}

let rpcOperationCounter = 0;
function rpc(harness, token, op, payload = {}) {
  let boundedPayload = payload;
  if ((op === 'saveDraft' || op === 'sendDraft') && !payload.clientOperationId) {
    boundedPayload = {
      ...payload,
      clientOperationId: `unit-operation-${String(++rpcOperationCounter).padStart(8, '0')}`,
    };
  }
  return harness.context.mailboxRpc(token, { op, payload: boundedPayload });
}

function parseRequestQuery(requestPath) {
  const index = String(requestPath).indexOf('?');
  return new URLSearchParams(index === -1 ? '' : String(requestPath).slice(index + 1));
}

function decodeBase64Url(value) {
  assert.match(String(value || ''), /^[A-Za-z0-9_-]+={0,2}$/, 'raw MIME must use base64url');
  assert.doesNotMatch(String(value), /[+/\s]/, 'base64url must not contain standard base64 characters');
  return Buffer.from(String(value), 'base64url').toString('utf8');
}

function draftOperationMessageId(body) {
  const raw = decodeBase64Url(body && body.message && body.message.raw);
  const match = raw.match(/^Message-ID:\s*(<[^\r\n]+>)\s*$/mi);
  assert.ok(match, 'draft MIME must carry the durable operation Message-ID');
  return match[1];
}

function extractUiFunction(name) {
  const pattern = new RegExp(
    `      (?:async )?function ${name}\\([^\\n]*\\) \\{[\\s\\S]*?\\n      \\}`
  );
  const match = uiSource.match(pattern);
  assert.ok(match, `MailApp function ${name} must exist`);
  return match[0].trim();
}

test('MailClient loads beside Code.gs and exposes only the intended public RPC surface', () => {
  requireClientFile();
  const harness = makeContext();
  assertPublicFunctions(harness.context);

  const publicFunctions = [...clientSource.matchAll(/^function\s+([A-Za-z0-9_$]+)\s*\(/gm)]
    .map(match => match[1])
    .filter(name => !name.endsWith('_'))
    .sort();
  assert.deepEqual(
    publicFunctions,
    ['mailboxCloseSession', 'mailboxOpenSession', 'mailboxRecoverSessionCapacity', 'mailboxRenewSession', 'mailboxRpc'],
    'only the authenticated session endpoints may be public to HtmlService clients'
  );
});

test('sessions reject missing signatures and stale tokens while isolating every valid Telegram user', () => {
  const harness = makeContext();
  const { context } = harness;
  assertPublicFunctions(context);

  resultFailed(context.mailboxOpenSession(''), 'empty Telegram initData must be rejected');
  resultFailed(
    context.mailboxOpenSession('auth_date=1&user=%7B%7D&hash=' + '0'.repeat(64)),
    'invalid Telegram signature must be rejected'
  );
  const secondUser = resultData(
    context.mailboxOpenSession(telegramInitData('999999999')),
    'a correctly signed Telegram user must receive an isolated personal workspace'
  );
  assert.ok(secondUser.sessionToken);

  const token = openOwnerSession(harness);
  resultFailed(
    context.mailboxRpc('unknown-session-token-000000000000', { op: 'bootstrap', payload: {} }),
    'unknown session token must be rejected'
  );
  assert.ok(token);
});

test('mailbox launch initData is claimed once and a new browser cannot replay its nonce', () => {
  const harness = makeContext();
  const { context } = harness;
  const initData = telegramInitData();

  const issued = context.mailboxIssueLaunch_(initData, '');
  assert.match(issued.launchNonce, /^[A-Za-z0-9_-]{43}$/);
  const firstOpen = resultData(context.mailboxRedeemLaunch(issued.launchNonce));
  assert.ok(firstOpen.sessionToken);
  assert.match(firstOpen.refreshToken, /^mbr1\.[A-Za-z0-9_-]{40,384}\.[A-Za-z0-9_-]{43}$/);
  let replay = null;
  try {
    context.mailboxIssueLaunch_(initData, '');
  } catch (error) {
    replay = error;
  }
  assert.ok(replay, 'the same signed Telegram launch must not mint another session');
  assert.equal(replay.mailboxCode, 'UNTRUSTED_NONCE_REPLAY');
  assert.match(replay.message, /вже використано/i);

  resultFailed(
    context.mailboxRedeemLaunch(issued.launchNonce),
    'a launch nonce must be removed before its first redemption returns'
  );
});

test('Telegram initData rejects duplicate keys before any session or launch claim is created', () => {
  const harness = makeContext();
  const { context, propertyValues } = harness;
  const signed = telegramInitData();
  const authDate = new URLSearchParams(signed).get('auth_date');
  const duplicate = signed + '&auth_date=' + encodeURIComponent(authDate);
  const rejected = context.mailboxOpenSession(duplicate);
  assert.equal(resultFailed(rejected).code, 'UNAUTHORIZED');
  assert.match(rejected.error.message, /повторений параметр/i);
  assert.equal(propertyValues.MAILBOX_INITDATA_CLAIMS, undefined);
  assert.equal(propertyValues.MAILBOX_REFRESH_FAMILIES_V1, undefined);
});

test('canonical Telegram hash claims block reordered and equivalently encoded replays', () => {
  const variants = signed => {
    const reordered = signed.split('&').reverse().join('&');
    const percentCase = signed.replace(/%[0-9A-F]{2}/, value => value.toLowerCase());
    const uppercaseHash = signed.replace(/hash=([a-f0-9]{64})/, (_match, hash) => 'hash=' + hash.toUpperCase());
    assert.notEqual(reordered, signed);
    assert.notEqual(percentCase, signed);
    assert.notEqual(uppercaseHash, signed);
    return [reordered, percentCase, uppercaseHash];
  };

  for (const replayIndex of [0, 1, 2]) {
    const harness = makeContext();
    const signed = telegramInitData();
    resultData(harness.context.mailboxOpenSession(signed));
    const replay = harness.context.mailboxOpenSession(variants(signed)[replayIndex]);
    assert.equal(resultFailed(replay).code, 'UNTRUSTED_NONCE_REPLAY');
    assert.match(replay.error.message, /вже використано/i);
    assert.equal(JSON.parse(harness.propertyValues.MAILBOX_REFRESH_FAMILIES_V1).length, 1);
  }
  assert.match(
    codeSource,
    /claimMailboxLaunchInitData_[\s\S]{0,700}parsed\.receivedHash/,
    'the replay claim must derive from the verified canonical hash, not raw query bytes'
  );
});

test('refresh renewal rotates both credentials and returns the exact public contract', () => {
  const harness = makeContext();
  const { context, cacheValues, propertyValues } = harness;
  const opened = resultData(context.mailboxOpenSession(telegramInitData()));

  assert.match(opened.sessionToken, /^[A-Za-z0-9_-]{43}$/);
  assert.match(opened.refreshToken, /^mbr1\.[A-Za-z0-9_-]{40,384}\.[A-Za-z0-9_-]{43}$/);
  assert.match(propertyValues.MAILBOX_REFRESH_SIGNING_SECRET, /^[A-Za-z0-9_-]{43,128}$/);
  const initialFamilyState = propertyValues.MAILBOX_REFRESH_FAMILIES_V1;
  assert.doesNotMatch(initialFamilyState, new RegExp(opened.sessionToken));
  assert.doesNotMatch(initialFamilyState, new RegExp(opened.refreshToken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(JSON.parse(initialFamilyState)[0].sessionKey, /^mailbox\.session\.v1\.[A-Za-z0-9_-]{43}$/);

  const renewed = resultData(context.mailboxRenewSession(opened.refreshToken));
  assert.deepEqual(
    Object.keys(JSON.parse(JSON.stringify(renewed))).sort(),
    ['expiresInSeconds', 'refreshToken', 'sessionToken'],
    'renewal must expose only the documented credentials and lifetime'
  );
  assert.equal(renewed.expiresInSeconds, 6 * 60 * 60);
  assert.match(renewed.sessionToken, /^[A-Za-z0-9_-]{43}$/);
  assert.match(renewed.refreshToken, /^mbr1\.[A-Za-z0-9_-]{40,384}\.[A-Za-z0-9_-]{43}$/);
  assert.notEqual(renewed.sessionToken, opened.sessionToken, 'renewal must mint a fresh bearer');
  assert.notEqual(renewed.refreshToken, opened.refreshToken, 'renewal must rotate the refresh token');
  const originalClaims = JSON.parse(Buffer.from(opened.refreshToken.split('.')[1], 'base64url').toString('utf8'));
  const renewedClaims = JSON.parse(Buffer.from(renewed.refreshToken.split('.')[1], 'base64url').toString('utf8'));
  assert.equal(originalClaims.sub, OWNER_ID, 'the refresh credential must be owner-bound');
  assert.equal(originalClaims.exp - originalClaims.iat, 24 * 60 * 60, 'the absolute refresh window is 24 hours');
  assert.equal(renewedClaims.iat, originalClaims.iat, 'rotation must preserve the original refresh start');
  assert.equal(renewedClaims.exp, originalClaims.exp, 'rotation must not slide the absolute 24-hour expiry');
  assert.notEqual(renewedClaims.jti, originalClaims.jti, 'rotation must mint a new refresh token id');
  assert.ok(cacheValues.has(context.mailboxSessionKey_(renewed.sessionToken)));
  assert.equal(
    propertyValues.MAILBOX_REFRESH_SIGNING_SECRET,
    context.mailboxRefreshSigningSecret_(),
    'renewal must reuse the existing signing secret rather than rotate it'
  );

  const nowSeconds = Math.floor(Date.now() / 1000);
  const nearExpiry = context.mailboxIssueRefreshToken_(
    OWNER_ID,
    nowSeconds - 24 * 60 * 60 + 90,
    undefined,
    renewedClaims.fid
  );
  const nearClaims = JSON.parse(Buffer.from(nearExpiry.split('.')[1], 'base64url').toString('utf8'));
  const families = JSON.parse(propertyValues.MAILBOX_REFRESH_FAMILIES_V1);
  const family = families.find(item => item.fid === renewedClaims.fid);
  family.iat = nearClaims.iat;
  family.exp = nearClaims.exp;
  family.jti = nearClaims.jti;
  propertyValues.MAILBOX_REFRESH_FAMILIES_V1 = JSON.stringify(families);
  const bounded = resultData(context.mailboxRenewSession(nearExpiry));
  const boundedClaims = JSON.parse(Buffer.from(bounded.refreshToken.split('.')[1], 'base64url').toString('utf8'));
  assert.equal(boundedClaims.exp, nowSeconds + 90);
  assert.ok(
    bounded.expiresInSeconds > 0 && bounded.expiresInSeconds <= 90,
    'a renewed short session must not outlive the original refresh deadline'
  );
});

test('refresh claims round-trip through the strict Apps Script base64url and Blob contracts', () => {
  const decodedInputs = [];
  const blobArgumentCounts = [];
  const harness = makeContext({
    base64DecodeWebSafe: value => {
      decodedInputs.push(value);
      assert.equal(value.length % 4, 0, 'Apps Script must receive padded base64url input');
      assert.match(value, /^[A-Za-z0-9_-]+={0,2}$/);
      return byteArray(Buffer.from(value, 'base64url'));
    },
    newBlob: (value, contentType, name) => {
      const blob = makeBlob(value, contentType, name);
      return {
        ...blob,
        getDataAsString(...args) {
          blobArgumentCounts.push(args.length);
          if (args.length) {
            throw new TypeError('Blob.getDataAsString(charset) requires a String charset in Apps Script.');
          }
          return blob.getDataAsString();
        },
      };
    },
  });
  const issued = harness.context.mailboxIssueLaunch_(telegramInitData(), '');
  const opened = resultData(harness.context.mailboxRedeemLaunch(issued.launchNonce));
  const payload = opened.refreshToken.split('.')[1];
  assert.notEqual(payload.length % 4, 0, 'the issued token must exercise padding restoration');

  const redeemed = opened;
  assert.equal(redeemed.sessionToken, opened.sessionToken);
  assert.equal(redeemed.refreshToken, opened.refreshToken);
  harness.context.mailboxVerifyRefreshToken_(opened.refreshToken);
  assert.deepEqual(blobArgumentCounts, [0], 'UTF-8 must use the zero-argument Blob overload');
  assert.equal(decodedInputs[0].length % 4, 0);
  assert.equal(decodedInputs[0].replace(/=+$/g, ''), payload);
  assert.equal(harness.gmailCalls.length, 0, 'session redemption must not touch Gmail');

  assert.throws(
    () => harness.context.mailboxDecodeCanonicalBase64UrlBytes_('e31'),
    /non-canonical/i,
    'alternate base64url spellings of the same bytes must be rejected'
  );
  assert.throws(
    () => harness.context.mailboxDecodeCanonicalBase64UrlBytes_('A'),
    /invalid/i,
    'impossible base64url lengths must be rejected'
  );
});

test('refresh renewal rejects tampering, expiry, and an unissued token without a session family', () => {
  const harness = makeContext();
  const { context } = harness;
  const opened = resultData(context.mailboxOpenSession(telegramInitData()));
  const parts = opened.refreshToken.split('.');
  parts[2] = (parts[2][0] === 'A' ? 'B' : 'A') + parts[2].slice(1);

  assert.equal(
    resultFailed(context.mailboxRenewSession(parts.join('.'))).code,
    'UNAUTHORIZED',
    'a modified HMAC signature must fail'
  );

  const expired = context.mailboxIssueRefreshToken_(
    OWNER_ID,
    Math.floor(Date.now() / 1000) - 24 * 60 * 60 - 1
  );
  assert.equal(
    resultFailed(context.mailboxRenewSession(expired)).code,
    'SESSION_EXPIRED',
    'a correctly signed but expired refresh token must fail'
  );

  const wrongOwner = context.mailboxIssueRefreshToken_('999999999');
  assert.equal(
    resultFailed(context.mailboxRenewSession(wrongOwner)).code,
    'SESSION_EXPIRED',
    'a correctly signed token without an issued refresh family must fail'
  );
  assert.match(
    clientSource,
    /constantTimeEqual_\(expectedSignature, match\[2\]\)/,
    'refresh signatures must be compared in constant time'
  );
});

test('refresh family returns one idempotent rotation to parallel reloads and revokes its preceding bearer', () => {
  const harness = makeContext();
  const { context, cacheValues } = harness;
  const opened = resultData(context.mailboxOpenSession(telegramInitData()));

  const attempts = Array.from({ length: 10 }, () =>
    resultData(context.mailboxRenewSession(opened.refreshToken))
  );
  const renewed = attempts[0];
  attempts.forEach(result => assert.deepEqual(
    JSON.parse(JSON.stringify(result)),
    JSON.parse(JSON.stringify(renewed)),
    'parallel reloads with the same authenticated refresh credential receive one rotation'
  ));

  assert.equal(
    cacheValues.has(context.mailboxSessionKey_(opened.sessionToken)),
    false,
    'rotation must remove the preceding bearer from CacheService'
  );
  assert.equal(
    resultFailed(context.mailboxRpc(opened.sessionToken, { op: 'bootstrap', payload: {} })).code,
    'SESSION_EXPIRED',
    'the preceding bearer must fail through the public RPC boundary'
  );
  assert.equal(context.mailboxRequireSession_(renewed.sessionToken).familyId.length, 43);

  const originalClaims = JSON.parse(
    Buffer.from(opened.refreshToken.split('.')[1], 'base64url').toString('utf8')
  );
  cacheValues.delete(context.mailboxSessionRenewalReplayKey_(originalClaims));
  assert.equal(
    resultFailed(context.mailboxRenewSession(opened.refreshToken)).code,
    'SESSION_EXPIRED',
    'the consumed credential remains revoked after its bounded idempotency window'
  );
});

test('confirmed Gmail dispatch survives post-dispatch session cache put and remove failures', () => {
  for (const failureMode of ['put', 'remove']) {
    let failSessionPut = false;
    let failSessionRemove = false;
    const harness = makeContext({
      cachePut: key => {
        if (failSessionPut && key.startsWith('mailbox.session.v1.')) {
          throw new Error('injected session cache put failure');
        }
      },
      cacheRemove: key => {
        if (failSessionRemove && key.startsWith('mailbox.session.v1.')) {
          throw new Error('injected session cache remove failure');
        }
      },
    });
    const token = openOwnerSession(harness);
    const errorLogs = [];
    harness.context.console.error = (...args) => { errorLogs.push(args.map(String).join(' ')); };
    const threadId = `thread_post_dispatch_${failureMode}`;
    harness.setGmail((requestPath, options) => {
      if (requestPath === `/threads/${threadId}/modify`) {
        assert.equal(String(options.method || '').toLowerCase(), 'post');
        return { id: threadId };
      }
      if (requestPath.startsWith(`/threads/${threadId}?`)) {
        return {
          id: threadId,
          messages: [{ id: `message_${failureMode}`, labelIds: [] }],
        };
      }
      throw new Error(`Unexpected Gmail request: ${requestPath}`);
    });

    if (failureMode === 'remove') {
      const originalOwnsSession = harness.context.mailboxRefreshFamilyOwnsSession_;
      let ownershipChecks = 0;
      harness.context.mailboxRefreshFamilyOwnsSession_ = (...args) => {
        ownershipChecks += 1;
        return ownershipChecks === 1
          ? originalOwnsSession(...args)
          : false;
      };
      failSessionRemove = true;
    } else {
      failSessionPut = true;
    }

    const result = rpc(harness, token, 'action', {
      threadId,
      action: 'read',
    });
    assert.equal(
      harness.gmailCalls.filter(call => call.requestPath === `/threads/${threadId}/modify`).length,
      1,
      `Gmail must be dispatched exactly once before ${failureMode} session maintenance fails: ` +
        JSON.stringify(harness.gmailCalls)
    );
    const data = resultData(
      result,
      `${failureMode} maintenance failure must not mask Gmail success: ${errorLogs.join(' | ')}`
    );
    assert.equal(data.action, 'read');
  }
});

test('confirmed thread actions and user-label changes survive post-commit summary read failures', () => {
  for (const operation of ['action', 'label']) {
    const harness = makeContext();
    const token = openOwnerSession(harness);
    const threadId = `thread_post_commit_${operation}`;
    const labelId = 'Label_post_commit';
    let mutationCount = 0;
    let summaryReadCount = 0;
    harness.setGmail((requestPath, options) => {
      if (operation === 'label' && requestPath === '/labels') {
        return { labels: [{ id: labelId, name: 'Після запису', type: 'user' }] };
      }
      if (requestPath === `/threads/${threadId}/modify`) {
        assert.equal(String(options.method || '').toLowerCase(), 'post');
        mutationCount += 1;
        return { id: threadId };
      }
      if (requestPath.startsWith(`/threads/${threadId}?`)) {
        summaryReadCount += 1;
        throw new Error('injected post-commit summary read failure');
      }
      throw new Error(`Unexpected Gmail request: ${requestPath}`);
    });

    const result = operation === 'action'
      ? rpc(harness, token, 'action', { threadId, action: 'read' })
      : rpc(harness, token, 'label', {
          threadId,
          addLabelIds: [labelId],
          removeLabelIds: [],
        });
    const data = resultData(result, `${operation} must preserve confirmed Gmail success`);
    assert.equal(data.action, operation === 'action' ? 'read' : 'label');
    assert.equal(data.threadId, threadId);
    assert.equal(data.thread, undefined, 'failed optional enrichment must be omitted');
    assert.equal(mutationCount, 1, 'the Gmail mutation must execute exactly once');
    assert.equal(summaryReadCount, 2,
      'a failed optional Undo snapshot and failed post-commit summary must not mask Gmail success');
  }
});

test('confirmed draft save becomes pending after readback failure and retries without a second PUT', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const draftId = 'draft_post_commit';
  const threadId = 'thread_draft_post_commit';
  let initialReadCount = 0;
  let updateCount = 0;
  let readbackCount = 0;
  let operationMessageId = '';
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/drafts/${draftId}?format=full`) {
      if (!initialReadCount) {
        initialReadCount += 1;
        return {
          id: draftId,
          message: {
            id: 'message_draft_before',
            threadId,
            internalDate: '1710000000000',
            labelIds: ['DRAFT'],
            payload: { headers: [], parts: [] },
          },
        };
      }
      readbackCount += 1;
      if (readbackCount === 1) throw new Error('injected post-commit draft readback failure');
      return {
        id: draftId,
        message: {
          id: 'message_draft_after',
          threadId,
          internalDate: '1710000001000',
          labelIds: ['DRAFT'],
          payload: { headers: [{ name: 'Message-ID', value: operationMessageId }], parts: [] },
        },
      };
    }
    if (requestPath === `/drafts/${draftId}`) {
      assert.equal(String(options.method || '').toLowerCase(), 'put');
      updateCount += 1;
      operationMessageId = draftOperationMessageId(options.body);
      return {
        id: draftId,
        message: {
          id: 'message_draft_after',
          threadId,
          labelIds: ['DRAFT'],
        },
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const request = {
    draftId,
    bodyText: 'Підтверджений текст чернетки',
    existingAttachments: [],
    clientOperationId: 'post-commit-readback-operation-0001',
  };
  const pending = resultFailed(rpc(harness, token, 'saveDraft', request));
  assert.equal(pending.code, 'DRAFT_PENDING');
  const data = resultData(rpc(harness, token, 'saveDraft', request),
    'the exact retry should recover the confirmed draft read-only');
  assert.equal(data.draftId, draftId);
  assert.equal(data.draft.draftId, draftId);
  assert.equal(initialReadCount, 1, 'pre-commit draft validation remains fail-closed');
  assert.equal(updateCount, 1, 'Gmail draft PUT must execute exactly once');
  assert.equal(readbackCount, 2, 'retry performs only the missing canonical readback');
});

test('revoked and expired sessions still return SESSION_EXPIRED when cache cleanup fails', () => {
  for (const sessionState of ['revoked', 'expired']) {
    let failSessionRemove = false;
    const harness = makeContext({
      cacheRemove: key => {
        if (failSessionRemove && key.startsWith('mailbox.session.v1.')) {
          throw new Error('injected session cache cleanup failure');
        }
      },
    });
    const opened = resultData(harness.context.mailboxOpenSession(telegramInitData(OWNER_ID, {
      query_id: `AAE-cache-cleanup-${sessionState}`,
    })));
    const sessionKey = harness.context.mailboxSessionKey_(opened.sessionToken);

    if (sessionState === 'revoked') {
      failSessionRemove = true;
      resultData(harness.context.mailboxRenewSession(opened.refreshToken));
      assert.equal(
        harness.cacheValues.has(sessionKey),
        true,
        'the injected rotation cleanup failure must leave the stale bearer cached for this regression'
      );
    } else {
      const session = JSON.parse(harness.cacheValues.get(sessionKey));
      session.expiresAt = Date.now() - 1;
      harness.cacheValues.set(sessionKey, JSON.stringify(session));
      failSessionRemove = true;
    }

    const error = resultFailed(harness.context.mailboxRpc(
      opened.sessionToken,
      { op: 'bootstrap', payload: {} }
    ));
    assert.equal(
      error.code,
      'SESSION_EXPIRED',
      `${sessionState} cache cleanup failure must preserve the intended authentication error`
    );
    assert.equal(harness.gmailCalls.length, 0, 'failed authentication must not dispatch Gmail');
  }
});

test('separate Mini App instances retain independent bounded refresh families', () => {
  const harness = makeContext();
  const { context, propertyValues } = harness;
  const first = resultData(context.mailboxOpenSession(telegramInitData(OWNER_ID, {
    query_id: 'AAE-refresh-family-one',
  })));
  const second = resultData(context.mailboxOpenSession(telegramInitData(OWNER_ID, {
    query_id: 'AAE-refresh-family-two',
  })));
  const before = JSON.parse(propertyValues.MAILBOX_REFRESH_FAMILIES_V1);
  assert.equal(before.length, 2);

  const firstRenewed = resultData(context.mailboxRenewSession(first.refreshToken));
  assert.ok(firstRenewed.sessionToken);
  assert.equal(context.mailboxRequireSession_(second.sessionToken).ownerId, OWNER_ID);
  const secondRenewed = resultData(context.mailboxRenewSession(second.refreshToken));
  assert.ok(secondRenewed.sessionToken);

  const after = JSON.parse(propertyValues.MAILBOX_REFRESH_FAMILIES_V1);
  assert.equal(after.length, 2, 'rotation must update one family instead of replacing other instances');
  assert.equal(new Set(after.map(item => item.fid)).size, 2);
});

test('explicit sign out revokes only the current Mini App family and never touches Gmail', () => {
  const harness = makeContext();
  const { context, propertyValues } = harness;
  const first = resultData(context.mailboxOpenSession(telegramInitData(OWNER_ID, {
    query_id: 'AAE-explicit-sign-out-first',
  })));
  const second = resultData(context.mailboxOpenSession(telegramInitData(OWNER_ID, {
    query_id: 'AAE-explicit-sign-out-second',
  })));
  assert.equal(JSON.parse(propertyValues.MAILBOX_REFRESH_FAMILIES_V1).length, 2);
  assert.deepEqual(JSON.parse(JSON.stringify(resultData(context.mailboxCloseSession(first.sessionToken, first.refreshToken)))), { signedOut: true });
  const after = JSON.parse(propertyValues.MAILBOX_REFRESH_FAMILIES_V1);
  assert.equal(after.length, 1);
  assert.equal(after[0].sessionKey, context.mailboxSessionKey_(second.sessionToken));
  assert.equal(context.mailboxRequireSession_(second.sessionToken).ownerId, OWNER_ID);
  assert.equal(resultFailed(context.mailboxRpc(first.sessionToken, { op: 'bootstrap', payload: {} })).code, 'SESSION_EXPIRED');
  assert.deepEqual(JSON.parse(JSON.stringify(resultData(context.mailboxCloseSession(first.sessionToken, first.refreshToken)))), { signedOut: true });
  const mismatchOne = resultData(context.mailboxOpenSession(telegramInitData(OWNER_ID, { query_id: 'AAE-sign-out-mismatch-one' })));
  const mismatchTwo = resultData(context.mailboxOpenSession(telegramInitData(OWNER_ID, { query_id: 'AAE-sign-out-mismatch-two' })));
  assert.equal(resultFailed(context.mailboxCloseSession(mismatchOne.sessionToken, mismatchTwo.refreshToken)).code, 'FORBIDDEN');
  assert.equal(harness.gmailCalls.length, 0);
});

test('fresh launches retain six parallel same-user families and retire only that user oldest sessions', () => {
  const harness = makeContext();
  const { context, propertyValues } = harness;
  const sessions = [];
  for (let index = 0; index < 24; index += 1) {
    sessions.push(resultData(context.mailboxOpenSession(telegramInitData(OWNER_ID, {
      query_id: `AAE-family-capacity-${index}`,
    }))));
  }
  const bounded = JSON.parse(propertyValues.MAILBOX_REFRESH_FAMILIES_V1);
  assert.equal(bounded.length, 6);
  assert.deepEqual(
    bounded.map(item => item.fid),
    sessions.slice(-6).map(item =>
      JSON.parse(Buffer.from(item.refreshToken.split('.')[1], 'base64url').toString('utf8')).fid
    ),
    'only the six newest parallel families for the same Telegram user remain'
  );
  assert.throws(
    () => context.mailboxRequireSession_(sessions[0].sessionToken),
    error => error && error.mailboxCode === 'SESSION_EXPIRED',
    'the retired oldest bearer must no longer authorize RPC'
  );
  assert.equal(context.mailboxRequireSession_(sessions.at(-1).sessionToken).ownerId, OWNER_ID);
  assert.ok(
    Buffer.byteLength(propertyValues.MAILBOX_REFRESH_FAMILIES_V1, 'utf8') < 8500,
    'the bounded same-user family registry must fit one Script Property value'
  );

  const fullHarness = makeContext();
  resultData(fullHarness.context.mailboxOpenSession(telegramInitData(OWNER_ID, {
    query_id: 'AAE-cross-user-seed',
  })));
  const seed = JSON.parse(fullHarness.propertyValues.MAILBOX_REFRESH_FAMILIES_V1)[0];
  const foreignRows = Array.from({ length: 24 }, (_, index) => ({
    ...seed,
    fid: crypto.randomBytes(32).toString('base64url'),
    sub: String(1500000000 + index),
    iat: seed.iat - index,
    exp: seed.exp - index,
    jti: crypto.randomBytes(32).toString('base64url'),
    sessionKey: `mailbox.session.v1.${crypto.randomBytes(32).toString('base64url')}`,
  }));
  fullHarness.propertyValues.MAILBOX_REFRESH_FAMILIES_V1 = JSON.stringify(foreignRows);
  const fullIds = foreignRows.map(item => item.fid);
  assert.equal(
    resultFailed(fullHarness.context.mailboxOpenSession(telegramInitData(OWNER_ID, {
      query_id: 'AAE-family-over-capacity',
    }))).code,
    'SESSION_CAPACITY'
  );
  assert.deepEqual(
    JSON.parse(fullHarness.propertyValues.MAILBOX_REFRESH_FAMILIES_V1).map(item => item.fid),
    fullIds,
    'a fresh user must never evict another Telegram user family'
  );

  const nowSeconds = Math.floor(Date.now() / 1000);
  const full = JSON.parse(fullHarness.propertyValues.MAILBOX_REFRESH_FAMILIES_V1);
  full[0].exp = nowSeconds - 1;
  full[0].iat = full[0].exp - 24 * 60 * 60;
  fullHarness.propertyValues.MAILBOX_REFRESH_FAMILIES_V1 = JSON.stringify(full);
  resultData(fullHarness.context.mailboxOpenSession(telegramInitData(OWNER_ID, {
    query_id: 'AAE-family-after-expiry',
  })));
  const compacted = JSON.parse(fullHarness.propertyValues.MAILBOX_REFRESH_FAMILIES_V1);
  assert.equal(compacted.length, 24);
  assert.equal(compacted.some(item => item.fid === fullIds[0]), false);
  fullIds.slice(1).forEach(fid => assert.ok(compacted.some(item => item.fid === fid)));

  assert.match(clientSource, /assertTelegramPropertyValueFits_\(/);
  assert.match(clientSource, /assertTelegramPropertyStoreFits_\(/);
});

test('explicit capacity recovery replaces only the caller final old family under global pressure', () => {
  const harness = makeContext();
  const { context, propertyValues } = harness;
  const ownerSession = resultData(context.mailboxOpenSession(telegramInitData(OWNER_ID, {
    query_id: 'AAE-owner-capacity-existing',
  })));
  const ownerFamily = JSON.parse(propertyValues.MAILBOX_REFRESH_FAMILIES_V1)[0];
  const foreignRows = Array.from({ length: 23 }, (_, index) => ({
    ...ownerFamily,
    fid: crypto.randomBytes(32).toString('base64url'),
    sub: String(1500000000 + index),
    iat: ownerFamily.iat - index - 1,
    exp: ownerFamily.exp - index - 1,
    jti: crypto.randomBytes(32).toString('base64url'),
    sessionKey: `mailbox.session.v1.${crypto.randomBytes(32).toString('base64url')}`,
  }));
  propertyValues.MAILBOX_REFRESH_FAMILIES_V1 = JSON.stringify([ownerFamily, ...foreignRows]);
  const before = JSON.parse(propertyValues.MAILBOX_REFRESH_FAMILIES_V1);
  const otherFamilies = before.filter(item => item.sub !== OWNER_ID).map(item => item.fid);

  const blockedInitData = telegramInitData(OWNER_ID, {
    query_id: 'AAE-owner-capacity-blocked',
  });
  const blocked = context.mailboxOpenSession(blockedInitData);
  assert.equal(resultFailed(blocked).code, 'SESSION_CAPACITY');
  assert.match(blocked.capacityRecoveryToken, /^[A-Za-z0-9_-]{43}$/);
  assert.equal(harness.gmailCalls.length, 0);

  const recovered = resultData(
    context.mailboxRecoverSessionCapacity(blocked.capacityRecoveryToken)
  );
  assert.ok(recovered.sessionToken);
  assert.ok(recovered.refreshToken);
  const after = JSON.parse(propertyValues.MAILBOX_REFRESH_FAMILIES_V1);
  assert.equal(after.length, 24, 'the old owner family is replaced while all other users remain');
  assert.deepEqual(after.filter(item => item.sub !== OWNER_ID).map(item => item.fid), otherFamilies);
  assert.throws(
    () => context.mailboxRequireSession_(ownerSession.sessionToken),
    error => error && error.mailboxCode === 'SESSION_EXPIRED'
  );
  assert.equal(resultFailed(context.mailboxRecoverSessionCapacity(
    blocked.capacityRecoveryToken
  )).code, 'SESSION_EXPIRED', 'the recovery bearer must be one-use');
  assert.match(resultFailed(context.mailboxOpenSession(blockedInitData)).message, /вже використано/i,
    'the failed launch claim remains consumed and cannot mint another family');
  assert.equal(harness.gmailCalls.length, 0, 'session recovery must never call Gmail');
});

test('refresh family total-storage guard fails before creating a bearer cache entry', () => {
  const harness = makeContext({ properties: { FILLER: 'x'.repeat(450 * 1024) } });
  const { context, cacheValues } = harness;
  assert.throws(
    () => context.mailboxCreateSession_(OWNER_ID, OWNER_ID),
    error => error && error.mailboxCode === 'STORAGE_FULL'
  );
  assert.equal(
    [...cacheValues.keys()].filter(key => key.startsWith('mailbox.session.v1.')).length,
    0
  );
});

test('refresh signing secret is generated once while holding the script lock', () => {
  const harness = makeContext();
  const { context, propertyValues } = harness;
  let held = false;
  let lockAttempts = 0;
  let releases = 0;
  let secretWrites = 0;
  context.LockService = {
    getScriptLock: () => ({
      tryLock: () => {
        lockAttempts += 1;
        held = true;
        return true;
      },
      releaseLock: () => {
        held = false;
        releases += 1;
      },
    }),
  };
  context.PropertiesService = {
    getScriptProperties: () => ({
      getProperty: key => Object.prototype.hasOwnProperty.call(propertyValues, key)
        ? String(propertyValues[key])
        : null,
      setProperty: (key, value) => {
        if (key === 'MAILBOX_REFRESH_SIGNING_SECRET') {
          assert.equal(held, true, 'the signing secret may only be written under ScriptLock');
          secretWrites += 1;
        }
        propertyValues[key] = String(value);
      },
    }),
  };

  const first = context.mailboxRefreshSigningSecret_();
  const second = context.mailboxRefreshSigningSecret_();
  assert.equal(first, second);
  assert.equal(lockAttempts, 1);
  assert.equal(releases, 1);
  assert.equal(secretWrites, 1);
});

test('mailbox sessions have an absolute six-hour lifetime', () => {
  const harness = makeContext();
  const { context, cacheValues } = harness;
  const token = openOwnerSession(harness);
  const key = context.mailboxSessionKey_(token);
  const session = JSON.parse(cacheValues.get(key));
  session.createdAt = Date.now() - (6 * 60 * 60 * 1000 + 1);
  cacheValues.set(key, JSON.stringify(session));

  resultFailed(
    context.mailboxRpc(token, { op: 'bootstrap', payload: {} }),
    'activity must not extend a mailbox session beyond its absolute lifetime'
  );
  assert.equal(cacheValues.has(key), false, 'expired session cache must be removed');
});

test('folder mapping is allowlisted and user search cannot inject extra URL parameters', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    if (requestPath.startsWith('/threads?')) {
      return { threads: [], nextPageToken: 'NEXT_PAGE_SAFE', resultSizeEstimate: 0 };
    }
    if (requestPath === '/labels') return { labels: [] };
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const maliciousFolder = 'inbox&includeSpamTrash=true from:attacker@example.com';
  const before = harness.gmailCalls.length;
  const rejected = rpc(harness, token, 'list', {
    folder: maliciousFolder,
    pageSize: 20,
    pageToken: '',
    query: '',
  });
  resultFailed(rejected, 'unknown/injected folder must be rejected');
  assert.equal(harness.gmailCalls.length, before, 'invalid folder must fail before Gmail is called');

  const search = 'subject:"quarterly & review" from:sender@example.com';
  const listed = rpc(harness, token, 'list', {
    folder: 'Inbox',
    pageSize: 20,
    pageToken: '',
    query: search,
  });
  resultData(listed, 'valid Gmail search should list threads');
  const listCall = harness.gmailCalls.find(call => call.requestPath.startsWith('/threads?'));
  assert.ok(listCall, 'list RPC must call Gmail threads.list');
  const params = parseRequestQuery(listCall.requestPath);
  assert.equal(params.get('q'), search, 'search is one encoded q value, not extra query parameters');
  assert.equal(params.get('includeSpamTrash'), null, 'search text must not inject includeSpamTrash');
  assert.equal(params.getAll('labelIds').includes('INBOX'), true, 'Inbox must map to the INBOX label');

  if (typeof harness.context.mailboxResolveFolder_ === 'function') {
    const allMail = harness.context.mailboxResolveFolder_('All');
    assert.ok(allMail && typeof allMail === 'object', 'All Mail must have a fixed folder spec');
    assert.doesNotMatch(JSON.stringify(allMail), /attacker|includeSpamTrash=true/i);
  }
});

test('list filters are allowlisted, composed server-side, and apply before pagination', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    if (requestPath.startsWith('/threads?')) {
      return { threads: [], nextPageToken: 'FILTER_NEXT', resultSizeEstimate: 0 };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const search = 'subject:"billing review"';
  const cases = [
    ['all', search],
    ['unread', `is:unread (${search})`],
    ['starred', `is:starred (${search})`],
    ['hasAttachment', `has:attachment (${search})`],
    ['important', `is:important (${search})`],
  ];
  for (const [filter, expectedQuery] of cases) {
    const before = harness.gmailCalls.length;
    const page = resultData(rpc(harness, token, 'list', {
      folder: 'Inbox', pageSize: 20, pageToken: '', query: search, filter,
    }), `${filter} should be accepted`);
    const call = harness.gmailCalls.slice(before).find(item => item.requestPath.startsWith('/threads?'));
    assert.ok(call, `${filter} must call Gmail threads.list`);
    assert.equal(parseRequestQuery(call.requestPath).get('q'), expectedQuery);
    assert.equal(page.filter, filter, 'the canonical server filter must be echoed to the client');
  }

  const allMail = resultData(rpc(harness, token, 'list', {
    folder: 'All', pageSize: 20, pageToken: '', query: 'from:sender@example.com', filter: 'hasAttachment',
  }));
  assert.equal(allMail.filter, 'hasAttachment');
  const allCall = harness.gmailCalls.filter(item => item.requestPath.startsWith('/threads?')).at(-1);
  assert.equal(
    parseRequestQuery(allCall.requestPath).get('q'),
    '-in:trash -in:spam has:attachment (from:sender@example.com)'
  );

  const callsBeforeInvalid = harness.gmailCalls.length;
  resultFailed(rpc(harness, token, 'list', {
    folder: 'Inbox', pageSize: 20, pageToken: '', query: '',
    filter: 'unread&includeSpamTrash=true',
  }), 'an injected or unknown filter must be rejected');
  assert.equal(
    harness.gmailCalls.length,
    callsBeforeInvalid,
    'an invalid filter must fail before Gmail is called'
  );
});

test('Snoozed combines native search with the bot label and both stay outside Archive', () => {
  const harness = makeContext();
  const snoozed = harness.context.mailboxResolveFolder_('Snoozed');
  const archive = harness.context.mailboxResolveFolder_('Archive');
  assert.equal(snoozed.key, 'snoozed');
  assert.match(snoozed.query, /in:snoozed/);
  assert.match(snoozed.query, /label:"Telegram\/Відкладені"/);
  assert.match(archive.query, /(?:^|\s)-in:snoozed(?:\s|$)/);
  assert.match(archive.query, /-label:"Telegram\/Відкладені"/);
  assert.throws(
    () => harness.context.mailboxResolveFolder_('Scheduled'),
    error => error && error.mailboxCode === 'INVALID_FOLDER',
    'Scheduled must not be invented without a documented Gmail API/search contract'
  );

  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    if (requestPath === '/profile') {
      return { emailAddress: 'tarasevych.pavlo@gmail.com', messagesTotal: 1, threadsTotal: 1 };
    }
    if (requestPath === '/labels') return { labels: [] };
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const bootstrap = resultData(rpc(harness, token, 'bootstrap', {}));
  assert.equal(bootstrap.account.id, bootstrap.session.connectionId,
    'bootstrap must bind the legacy primary profile to the exact opaque Gmail connection');
  assert.ok(bootstrap.folders.some(folder => folder.key === 'snoozed'));
  assert.deepEqual(
    Array.from(
      bootstrap.folders.filter(folder => folder.group === 'categories'),
      folder => folder.key
    ),
    ['primary', 'social', 'promotions', 'updates', 'forums']
  );
  assert.deepEqual(
    Array.from(bootstrap.capabilities.listFilters),
    ['all', 'unread', 'starred', 'hasAttachment', 'important']
  );
  assert.equal(bootstrap.capabilities.attachments.resumableUpload, false);
  assert.equal(bootstrap.capabilities.attachments.backgroundUpload, false);
  assert.deepEqual(
    JSON.parse(JSON.stringify(bootstrap.capabilities.snooze)),
    {
      supported: true,
      mode: 'bot_managed',
      nativeGmail: false,
      requestField: 'snoozeUntil',
      requestFormat: 'unix_ms_integer',
      minDelayMs: 60000,
      maxDelayMs: 31536000000,
      labelName: 'Telegram/Відкладені',
      repair: {
        requiredCount: 0,
        folder: 'snoozed',
        action: 'inbox',
        description: 'Відкрийте «Відкладені» та натисніть «До вхідних».',
      },
    }
  );
  assert.ok(bootstrap.capabilities.actions.includes('snooze'));
});

test('Gmail inbox categories use fixed official CATEGORY labels and stay grouped', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    if (requestPath.startsWith('/threads?')) return { threads: [], resultSizeEstimate: 0 };
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const categories = [
    ['Primary', 'CATEGORY_PERSONAL', 'primary'],
    ['Social', 'CATEGORY_SOCIAL', 'social'],
    ['Promotions', 'CATEGORY_PROMOTIONS', 'promotions'],
    ['Updates', 'CATEGORY_UPDATES', 'updates'],
    ['Forums', 'CATEGORY_FORUMS', 'forums'],
  ];
  for (const [folderName, labelId, category] of categories) {
    const folder = harness.context.mailboxResolveFolder_(folderName);
    assert.equal(folder.labelId, labelId);
    assert.equal(folder.query, 'in:inbox');
    assert.equal(folder.group, 'categories');
    assert.equal(folder.category, category);

    const before = harness.gmailCalls.length;
    const page = resultData(rpc(harness, token, 'list', {
      folder: folderName,
      query: '',
      filter: 'unread',
      pageSize: 20,
      pageToken: '',
    }));
    const call = harness.gmailCalls.slice(before).find(item => item.requestPath.startsWith('/threads?'));
    const params = parseRequestQuery(call.requestPath);
    assert.equal(params.get('labelIds'), labelId);
    assert.equal(params.get('q'), 'in:inbox is:unread');
    assert.equal(page.folder.group, 'categories');
    assert.equal(page.folder.category, category);
  }
});

test('list pagination clamps page size, returns nextPageToken, and rejects oversized tokens', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    if (requestPath.startsWith('/threads?')) {
      return { threads: [], nextPageToken: 'NEXT_2-opaque', resultSizeEstimate: 41 };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const page = resultData(rpc(harness, token, 'list', {
    folder: 'Inbox',
    pageSize: 9999,
    pageToken: 'PAGE_1-opaque',
    query: '',
  }), 'bounded list page should succeed');
  assert.equal(page.nextPageToken, 'NEXT_2-opaque', 'Gmail nextPageToken must be forwarded exactly');
  const listCall = harness.gmailCalls.find(call => call.requestPath.startsWith('/threads?'));
  assert.ok(listCall, 'threads.list call is required');
  const params = parseRequestQuery(listCall.requestPath);
  const maxResults = Number(params.get('maxResults'));
  assert.equal(maxResults, 30, 'oversized page size must be clamped to the configured maximum');
  assert.equal(params.get('pageToken'), 'PAGE_1-opaque');

  const callsBeforeInvalidToken = harness.gmailCalls.length;
  resultFailed(rpc(harness, token, 'list', {
    folder: 'Inbox',
    pageSize: 20,
    pageToken: 'A'.repeat(2048),
    query: '',
  }), 'oversized page token must be rejected');
  assert.equal(
    harness.gmailCalls.length,
    callsBeforeInvalidToken,
    'invalid page token must fail before Gmail is called'
  );
});

test('mail list resolves metadata in one parallel batch and translates previews in bounded cached chunks', () => {
  const references = Array.from({ length: 20 }, (_, index) => ({
    id: `thread_parallel_${String(index).padStart(2, '0')}`,
    historyId: String(index + 1),
    snippet: `English summary ${index}`,
  }));
  const harness = makeContext({
    urlFetch: url => {
      const match = String(url).match(/\/threads\/([^?]+)/);
      assert.ok(match, `parallel request must target one Gmail thread: ${url}`);
      const id = decodeURIComponent(match[1]);
      const index = Number(id.slice(-2));
      return jsonResponse({
        id,
        historyId: String(index + 1),
        messages: [{
          id: `message_parallel_${String(index).padStart(2, '0')}`,
          threadId: id,
          internalDate: String(1710000000000 + index),
          labelIds: ['INBOX'],
          snippet: `English summary ${index}`,
          payload: {
            headers: [
              { name: 'From', value: `Sender ${index} <sender${index}@example.com>` },
              { name: 'To', value: 'tarasevych.pavlo@gmail.com' },
              { name: 'Date', value: 'Wed, 15 Jul 2026 13:09:00 +0200' },
              { name: 'Subject', value: `Subject ${index}` },
            ],
          },
        }],
      });
    },
    languageTranslate: value => value.replace(/English summary (\d+)/g, 'Український підсумок $1'),
  });
  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    if (requestPath.startsWith('/threads?')) {
      return { threads: references, resultSizeEstimate: references.length };
    }
    throw new Error(`Serial metadata request is forbidden in this test: ${requestPath}`);
  });

  const first = resultData(rpc(harness, token, 'list', {
    folder: 'Inbox',
    pageSize: 20,
    pageToken: '',
    query: '',
  }));
  assert.equal(first.threads.length, 20);
  assert.equal(harness.fetchAllBatches.length, 1, 'one page must use exactly one UrlFetchApp.fetchAll call');
  assert.equal(harness.fetchAllBatches[0].length, 20, 'the whole metadata page must be fetched in parallel');
  assert.equal(harness.urlFetchSingleCalls.length, 0, 'thread metadata must not use serial UrlFetchApp.fetch');
  assert.ok(harness.languageCalls.length <= 2, '20 previews must require at most two bounded translation calls');
  assert.ok(harness.languageCalls.every(call => call.value.length <= 4200));
  first.threads.forEach((thread, index) => {
    assert.equal(thread.summaryUk, `Український підсумок ${index}`);
    assert.equal(thread.summary, thread.summaryUk);
    assert.equal(thread.snippet, thread.summaryUk, 'compatibility snippet must never expose source-language text');
  });

  const translationCallsBeforeCacheHit = harness.languageCalls.length;
  resultData(rpc(harness, token, 'list', {
    folder: 'Inbox',
    pageSize: 20,
    pageToken: '',
    query: '',
  }));
  assert.equal(harness.fetchAllBatches.length, 2, 'fresh Gmail metadata is still retrieved on refresh');
  assert.equal(
    harness.languageCalls.length,
    translationCallsBeforeCacheHit,
    'unchanged previews must come from the translation cache'
  );
});

test('list translation cache is read in one getAll call without serial cache lookups', () => {
  const harness = makeContext({
    languageTranslate: value => value.replace('Fresh English preview.', 'Свіжий український підсумок.'),
  });
  const sources = [
    'Cached English preview one.',
    'Fresh English preview.',
    'Cached English preview two.',
  ];
  const firstKey = harness.context.mailboxTranslationCacheKey_(sources[0]);
  const secondKey = harness.context.mailboxTranslationCacheKey_(sources[2]);
  harness.cacheValues.set(firstKey, 'Кешований підсумок один.');
  harness.cacheValues.set(secondKey, 'Кешований підсумок два.');

  const translated = Array.from(harness.context.mailboxTranslateSummariesUk_(sources));
  assert.deepEqual(translated, [
    'Кешований підсумок один.',
    'Свіжий український підсумок.',
    'Кешований підсумок два.',
  ]);
  assert.equal(harness.cacheGetAllCalls.length, 1, 'all summary cache keys must be fetched together');
  assert.deepEqual(
    Array.from(harness.cacheGetAllCalls[0]).sort(),
    [firstKey, harness.context.mailboxTranslationCacheKey_(sources[1]), secondKey].sort()
  );
  assert.equal(harness.cacheGetCalls.length, 0, 'summary translation must not use serial cache.get calls');
  assert.equal(harness.languageCalls.length, 1, 'only the uncached preview should be translated');
});

test('language detection translates ambiguous Russian Cyrillic but preserves Ukrainian-only words', () => {
  const harness = makeContext({
    languageTranslate: value => value
      .replace('Информация для вас', 'Інформація для вас')
      .replace('Информация готова', 'Інформація готова')
      .replace('Ваш лист для вас', 'Ваш лист призначений для вас'),
  });
  assert.equal(
    harness.context.mailboxLikelyUkrainian_('Информация для вас'),
    false,
    'shared Cyrillic words must not make Russian text look Ukrainian'
  );
  assert.equal(
    harness.context.mailboxLikelyUkrainian_('Ваш лист для вас'),
    false,
    'ambiguous words such as «ваш», «лист», and «для» require translation'
  );
  assert.equal(
    harness.context.mailboxLikelyUkrainian_('Информация готова'),
    false,
    'Russian «готова» is shared and must not be treated as Ukrainian-exclusive'
  );
  assert.equal(
    harness.context.mailboxLikelyUkrainian_('Дякую'),
    true,
    'a Ukrainian-exclusive word without і/ї/є/ґ must still be recognized'
  );

  const translated = Array.from(harness.context.mailboxTranslateSummariesUk_([
    'Информация для вас',
    'Дякую',
    'Ваш лист для вас',
    'Информация готова',
  ]));
  assert.deepEqual(translated, [
    'Інформація для вас',
    'Дякую',
    'Ваш лист призначений для вас',
    'Інформація готова',
  ]);
  assert.equal(harness.languageCalls.length, 1, 'only the three ambiguous Cyrillic summaries need translation');
  assert.doesNotMatch(translated.join('\n'), /Відкрийте лист, щоб переглянути/);
});

test('list translation keeps ten mixed summaries aligned when whitespace and markers are normalized', () => {
  const pairs = [
    ['Your invoice is ready.', 'Ваш рахунок готовий.'],
    ['Uw afspraak is bevestigd.', 'Вашу зустріч підтверджено.'],
    ['Votre colis arrivera demain.', 'Ваша посилка прибуде завтра.'],
    ['Ihre Zahlung wurde empfangen.', 'Ваш платіж отримано.'],
    ['Twoje haslo zostalo zmienione.', 'Ваш пароль змінено.'],
    ['Su reserva esta confirmada.', 'Ваше бронювання підтверджено.'],
    ['La riunione inizia alle nove.', 'Зустріч починається о дев\u2019ятій.'],
    ['O seu pedido foi enviado.', 'Ваше замовлення надіслано.'],
    ['Din rapport ar nu tillganglig.', 'Ваш звіт уже доступний.'],
    ['Your verification code is 482910.', 'Ваш код підтвердження: 482910.'],
  ];
  const harness = makeContext({
    languageTranslate: value => {
      let translated = value;
      pairs.forEach(([source, target]) => {
        translated = translated.split(source).join(target);
      });
      // Simulate a provider that collapses every line and rewrites both the
      // marker punctuation and spacing inside its long digit groups.
      return translated
        .replace(
          /7319048265::(\d{18})::(\d{3})::5642091738/g,
          (_marker, nonce, index) => [
            '7319048265'.split('').join(' '),
            nonce.split('').join(' '),
            index.split('').join(' '),
            '5642091738'.split('').join(' '),
          ].join('  \u2014  ')
        )
        .replace(/\s+/g, ' ')
        .trim();
    },
  });

  const first = Array.from(harness.context.mailboxTranslateSummariesUk_(pairs.map(pair => pair[0])));
  assert.deepEqual(first, pairs.map(pair => pair[1]));
  assert.equal(harness.languageCalls.length, 1, 'ten summaries must remain one bounded batch');
  assert.ok(
    harness.languageCalls[0].value.length <= 4200,
    'the complete numbered envelope must stay inside the translation bound'
  );
  assert.ok(first.every(value => !value.startsWith('Відкрийте лист')));

  const callsBeforeCache = harness.languageCalls.length;
  const second = Array.from(harness.context.mailboxTranslateSummariesUk_(pairs.map(pair => pair[0])));
  assert.deepEqual(second, first);
  assert.equal(harness.languageCalls.length, callsBeforeCache, 'valid aligned translations must be cached');
  assert.ok(
    Array.from(harness.cacheValues.keys()).every(key => key.startsWith('mailbox.translation.uk.v2.')),
    'the v2 namespace must leave stale v1 fallback entries behind'
  );
});

test('mail list skips only a concurrently disappeared 404 thread and preserves response alignment', () => {
  const references = ['thread_race_a', 'thread_race_b', 'thread_race_c'].map(id => ({ id }));
  const harness = makeContext({
    urlFetch: url => {
      const id = decodeURIComponent(String(url).match(/\/threads\/([^?]+)/)[1]);
      if (id === 'thread_race_b') return jsonResponse({ error: { code: 404 } }, 404);
      const suffix = id.endsWith('_a') ? 'A' : 'C';
      return jsonResponse({
        id,
        messages: [{
          id: `message_race_${suffix.toLowerCase()}`,
          threadId: id,
          internalDate: suffix === 'A' ? '1' : '3',
          labelIds: ['INBOX'],
          snippet: `English race summary ${suffix}`,
          payload: { headers: [
            { name: 'From', value: `${suffix} <${suffix.toLowerCase()}@example.com>` },
            { name: 'Subject', value: `Subject ${suffix}` },
          ] },
        }],
      });
    },
    languageTranslate: value => value.replace(/English race summary ([AC])/g, 'Український підсумок $1'),
  });
  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    if (requestPath.startsWith('/threads?')) return { threads: references, resultSizeEstimate: 3 };
    throw new Error(`Unexpected serial Gmail request: ${requestPath}`);
  });

  const page = resultData(rpc(harness, token, 'list', {
    folder: 'Inbox', pageSize: 20, pageToken: '', query: '',
  }));
  assert.deepEqual(Array.from(page.threads, thread => thread.id), ['thread_race_a', 'thread_race_c']);
  assert.deepEqual(
    Array.from(page.threads, thread => `${thread.id}:${thread.subject}:${thread.summaryUk}`),
    [
      'thread_race_a:Subject A:Український підсумок A',
      'thread_race_c:Subject C:Український підсумок C',
    ],
    'the response after a 404 must stay attached to its own reference'
  );
});

test('parallel metadata still fails the whole page for non-404 Gmail errors', () => {
  const harness = makeContext({
    urlFetch: () => jsonResponse({ error: { code: 500 } }, 500),
  });
  assert.throws(
    () => harness.context.mailboxFetchThreadMetadataBatch_([{ id: 'thread_server_error' }], 'format=metadata'),
    error => error && error.mailboxCode === 'GMAIL_ERROR',
    'a Gmail server failure must not be silently treated as a disappeared thread'
  );
});

test('list translation failure has a deterministic Ukrainian fallback, is not cached, and retries', () => {
  let translationOffline = true;
  const harness = makeContext({
    languageTranslate: value => {
      if (translationOffline) throw new Error('translation offline');
      return value
        .replaceAll('The same English preview.', 'Той самий український підсумок.')
        .replace('Another English preview.', 'Інший український підсумок.');
    },
  });
  const sources = [
    'The same English preview.',
    'The same English preview.',
    'Another English preview.',
  ];
  const translated = Array.from(harness.context.mailboxTranslateSummariesUk_(sources));
  assert.equal(harness.languageCalls.length, 1, 'equal previews must be translated only once in one chunk');
  assert.equal(translated[0], translated[1]);
  translated.forEach(value => {
    assert.equal(value, 'Відкрийте лист, щоб переглянути короткий зміст українською.');
    assert.match(value, /[іїє]/i);
  });
  assert.equal(harness.cacheValues.size, 0, 'provider failures must never cache the generic fallback');

  translationOffline = false;
  const retried = Array.from(harness.context.mailboxTranslateSummariesUk_(sources));
  assert.equal(harness.languageCalls.length, 2, 'the next refresh must retry a failed translation');
  assert.deepEqual(retried, [
    'Той самий український підсумок.',
    'Той самий український підсумок.',
    'Інший український підсумок.',
  ]);
  assert.equal(harness.cacheValues.size, 2, 'only successful unique translations may be cached');
});

test('thread reader caches a whole-thread Ukrainian analysis built from all unique bounded bodies', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_whole_summary_1';
  const repeated = 'Перший повний контекст розмови з важливою передісторією.';
  const latest = 'Фінальна відповідь просить сплатити €31.80 до 18 липня 2026 року.';
  function message(id, body, timestamp) {
    return {
      id,
      threadId,
      internalDate: String(timestamp),
      labelIds: ['INBOX'],
      snippet: `RAW GMAIL SNIPPET ${id}`,
      payload: {
        mimeType: 'text/plain',
        headers: [
          { name: 'From', value: 'Alice <alice@example.com>' },
          { name: 'To', value: 'tarasevych.pavlo@gmail.com' },
          { name: 'Date', value: 'Wed, 15 Jul 2026 13:09:00 +0200' },
          { name: 'Subject', value: 'Payment thread' },
          { name: 'Message-ID', value: `<${id}@example.com>` },
        ],
        body: { data: Buffer.from(body, 'utf8').toString('base64url'), size: Buffer.byteLength(body) },
      },
    };
  }
  const resource = {
    id: threadId,
    historyId: 'history_whole_1',
    snippet: 'RAW THREAD SNIPPET MUST NOT REACH READER SUMMARY',
    messages: [
      message('message_whole_1', repeated, 1710000000000),
      message('message_whole_2', repeated, 1710000001000),
      message('message_whole_3', latest, 1710000002000),
    ],
  };
  harness.setGmail(requestPath => {
    if (requestPath === `/threads/${threadId}?format=full`) return resource;
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const analysisCalls = [];
  harness.context.analyzeMessage_ = (subject, body) => {
    analysisCalls.push({ subject, body });
    return {
      essence: 'У листуванні узгоджено оплату; останнє повідомлення містить суму та строк.',
      action: 'Сплатити €31.80 до 18 липня 2026 року.',
      importance: { icon: '🔴', level: 'висока', reason: 'є строк і потрібна дія' },
      deadlines: ['18 липня 2026 року'],
      amounts: ['€31.80'],
      otpCodes: [],
    };
  };

  const first = resultData(rpc(harness, token, 'thread', { threadId }));
  assert.equal(analysisCalls.length, 1, 'the first reader load must analyze once');
  assert.equal(analysisCalls[0].subject, 'Payment thread');
  assert.match(analysisCalls[0].body, /Перший повний контекст/);
  assert.match(analysisCalls[0].body, /Фінальна відповідь/);
  assert.equal(
    (analysisCalls[0].body.match(/Перший повний контекст/g) || []).length,
    1,
    'duplicate message bodies must not distort the whole-thread analysis'
  );
  assert.ok(analysisCalls[0].body.length <= 60000, 'whole-thread analysis input must be bounded');
  assert.equal(first.summaryUk, 'У листуванні узгоджено оплату; останнє повідомлення містить суму та строк.');
  assert.equal(first.action, 'Сплатити €31.80 до 18 липня 2026 року.');
  assert.equal(first.importance.level, 'висока');
  assert.deepEqual(Array.from(first.deadlines), ['18 липня 2026 року']);
  assert.deepEqual(Array.from(first.amounts), ['€31.80']);
  assert.equal(first.analysis.kind, 'automated-ai-analysis');
  assert.equal(first.analysis.label, 'Автоматичний AI-аналіз');
  assert.equal(first.analysis.method, 'локальний аналіз і машинний переклад');
  assert.equal(first.analysis.confidence.level, 'medium');
  assert.equal(first.analysis.confidence.label, 'середня');
  assert.match(first.analysis.confidence.reason, /звірте/i);
  assert.match(first.analysis.risk, /пропустити/i);
  assert.deepEqual(Array.from(first.analysis.sourceFragments, item => item.messageId), [
    'message_whole_1',
    'message_whole_3',
  ]);
  first.analysis.sourceFragments.forEach(fragment => {
    assert.ok(fragment.quote.length > 0 && fragment.quote.length <= 240);
    assert.doesNotMatch(fragment.quote, /<[^>]+>/, 'evidence must be cleaned text, never raw HTML');
    assert.ok(Array.from(fragment.supports).length > 0);
  });
  assert.ok(
    Array.from(first.analysis.sourceFragments).some(fragment => Array.from(fragment.supports).includes('amount')),
    'the exact payment source must be tied to the amount claim'
  );
  assert.ok(
    Array.from(first.analysis.sourceFragments).some(fragment => Array.from(fragment.supports).includes('deadline')),
    'the exact payment source must be tied to the deadline claim'
  );
  assert.equal(first.handoff.version, 1);
  assert.equal(first.handoff.account.email, 'tarasevych.pavlo@gmail.com');
  assert.equal(first.handoff.gmailUrl, first.gmailUrl);
  assert.equal(first.handoff.task.available, true);
  assert.equal(first.analysis.actionSource.messageId, 'message_whole_3');
  assert.match(first.analysis.taskTitleUk, /сплатити/i);
  assert.equal(first.handoff.task.title, first.analysis.taskTitleUk);
  assert.equal(first.handoff.task.source.messageId, 'message_whole_3');
  assert.match(first.handoff.task.source.quote, /сплатити/i);
  assert.equal(first.handoff.calendar.available, true);
  assert.equal(first.handoff.calendar.title, 'Payment thread');
  assert.equal(first.handoff.calendar.deadlineText, '18 липня 2026 року');
  assert.equal(first.handoff.calendar.startLocal, '', 'the server must never invent a calendar start');
  assert.equal(first.handoff.calendar.endLocal, '', 'the server must never invent a calendar end');
  assert.equal(first.handoff.calendar.source.messageId, 'message_whole_3');
  assert.match(first.handoff.calendar.source.quote, /18 липня 2026 року/);
  assert.equal(first.handoff.calendar.timezone, 'UTC');
  const unsupportedHandoff = harness.context.mailboxThreadHandoffDto_({
    action: 'Сплатити рахунок.',
    deadlines: ['завтра'],
    sourceFragments: [{
      messageId: 'message_unsupported', timestamp: 1, quote: 'Звичайний інформаційний лист.', supports: ['summary'],
    }],
  }, {
    subject: 'Unsupported', accountEmail: 'tarasevych.pavlo@gmail.com', timezone: 'Europe/Brussels',
  });
  assert.equal(unsupportedHandoff.task.available, false,
    'an action without an action-supporting source must not become a task proposal');
  assert.equal(unsupportedHandoff.calendar.available, false,
    'an ambiguous deadline without an exact deadline source must not become a calendar proposal');
  assert.equal(unsupportedHandoff.task.source, null);
  assert.equal(unsupportedHandoff.calendar.source, null);
  const actionFragments = [{
    messageId: 'message_action_wrong', timestamp: 1,
    quote: 'Підтвердьте бронювання готелю до п’ятниці.', supports: ['action'],
  }, {
    messageId: 'message_action_exact', timestamp: 2,
    quote: 'Подайте заяву на компенсацію до 20 липня.', supports: ['action'],
  }];
  const exactActionSource = harness.context.mailboxAnalysisActionSource_(actionFragments);
  assert.equal(exactActionSource.messageId, 'message_action_exact',
    'the newest selected action candidate must retain its exact message source in a multi-message thread');
  const originalTranslateSummaries = harness.context.mailboxTranslateSummariesUk_;
  harness.context.mailboxTranslateSummariesUk_ = values => values.map(() => 'Подайте заяву на компенсацію до 20 липня.');
  const translatedTaskTitle = harness.context.mailboxTaskTitleUkFromSource_({
    messageId: 'message_english_action', timestamp: 3,
    quote: 'Submit the compensation claim by July 20.',
  });
  harness.context.mailboxTranslateSummariesUk_ = originalTranslateSummaries;
  assert.equal(translatedTaskTitle, 'Подайте заяву на компенсацію до 20 липня.',
    'a foreign-language task title must be translated from the already selected exact source sentence');
  const exactActionHandoff = harness.context.mailboxThreadHandoffDto_({
    action: 'Подайте заяву на компенсацію до 20 липня.',
    actionSource: exactActionSource,
    taskTitleUk: 'Подайте заяву на компенсацію до 20 липня.',
    deadlines: [],
    sourceFragments: actionFragments,
  }, {
    subject: 'Two actions', accountId: 'gmail-one', accountEmail: 'tarasevych.pavlo@gmail.com',
  });
  assert.equal(exactActionHandoff.task.available, true);
  assert.equal(exactActionHandoff.task.source.messageId, 'message_action_exact');
  const amountOnlyEvidence = Array.from(harness.context.mailboxAnalysisSourceFragments_([
    { id: 'message_amount_only', timestamp: 1, body: 'До сплати €31.80.' },
  ], {
    summaryUk: 'До сплати €31.80.',
    action: '',
    importance: { reason: 'є фінансова сума' },
    deadlines: ['18 липня 2026 року'],
    amounts: ['€31.80'],
  }));
  assert.ok(Array.from(amountOnlyEvidence[0].supports).includes('amount'));
  assert.equal(Array.from(amountOnlyEvidence[0].supports).includes('deadline'), false,
    'a decimal amount must not be misclassified as a dotted date');
  assert.equal(first.snippet, undefined, 'reader detail must not expose Gmail snippet as a summary fallback');

  const second = resultData(rpc(harness, token, 'thread', { threadId }));
  assert.equal(second.summaryUk, first.summaryUk);
  assert.deepEqual(JSON.parse(JSON.stringify(second.analysis)), JSON.parse(JSON.stringify(first.analysis)));
  assert.equal(analysisCalls.length, 1, 'unchanged thread analysis must be served from cache');
});

test('reply presets honor Reply-To, preserve reply-all participants, and never target the owner', () => {
  const harness = makeContext();
  function rawMessage(id, timestamp, headers) {
    return {
      id,
      threadId: 'thread_reply_preset_1',
      internalDate: String(timestamp),
      payload: { headers: Object.entries(headers).map(([name, value]) => ({ name, value })) },
    };
  }
  const incoming = harness.context.mailboxBuildReplyPreset_([
    rawMessage('message_incoming_1', 1, {
      From: 'Sender <sender@example.com>',
      'Reply-To': 'Support <support@example.org>',
      To: 'Pavlo <tarasevych.pavlo@gmail.com>, Teammate <teammate@example.net>',
      Cc: 'Manager <manager@example.net>',
      Subject: 'Question',
    }),
  ], 'Question');
  assert.equal(incoming.reply.to, 'support@example.org', 'Reply-To must override From');
  assert.equal(incoming.replyAll.to, 'support@example.org, teammate@example.net');
  assert.equal(incoming.replyAll.cc, 'manager@example.net');
  assert.equal(incoming.canReplyAll, true);
  assert.doesNotMatch(JSON.stringify(incoming), /tarasevych\.pavlo@gmail\.com/i);

  const outgoing = harness.context.mailboxBuildReplyPreset_([
    rawMessage('message_outgoing_1', 2, {
      From: 'Pavlo <tarasevych.pavlo@gmail.com>',
      'Reply-To': 'tarasevych.pavlo@gmail.com',
      To: 'Alice <alice@example.com>, Pavlo <tarasevych.pavlo@gmail.com>, Bob <bob@example.com>',
      Cc: 'Manager <manager@example.net>, tarasevych.pavlo@gmail.com',
      Subject: 'Sent update',
    }),
  ], 'Sent update');
  assert.equal(outgoing.reply.to, 'alice@example.com', 'replying to an own sent message must target a recipient');
  assert.equal(outgoing.replyAll.to, 'alice@example.com, bob@example.com');
  assert.equal(outgoing.replyAll.cc, 'manager@example.net');
  assert.doesNotMatch(JSON.stringify(outgoing), /tarasevych\.pavlo@gmail\.com/i);

  const gmailAlias = harness.context.mailboxBuildReplyPreset_([
    rawMessage('message_gmail_alias_1', 3, {
      From: 'Pavlo alias <ta.rasevychpavlo+sent@googlemail.com>',
      To: 'Alice <alice@example.com>, Owner tag <tarasevych.pavlo+alerts@gmail.com>',
      Cc: 'Owner alias <t.arasevychpavlo+copy@googlemail.com>, Bob <bob@example.com>',
      Subject: 'Gmail aliases',
    }),
  ], 'Gmail aliases');
  assert.equal(gmailAlias.reply.to, 'alice@example.com');
  assert.equal(gmailAlias.replyAll.to, 'alice@example.com');
  assert.equal(gmailAlias.replyAll.cc, 'bob@example.com');
  assert.doesNotMatch(JSON.stringify(gmailAlias), /googlemail|\+alerts|\+copy/i);
  assert.equal(
    harness.context.mailboxCanonicalOwnerAddress_('a.b+tag@example.com'),
    'a.b+tag@example.com',
    'dot and plus normalization must not be applied to non-Gmail providers'
  );
  assert.equal(
    harness.context.mailboxCanonicalOwnerAddress_('Ta.RasevychPavlo+tag@GoogleMail.com'),
    'tarasevychpavlo@gmail.com'
  );
  assert.match(uiSource, /openCompose\("replyAll"\)/, 'MailApp must expose Reply all');
  assert.match(uiSource, /preset\.replyAll/, 'MailApp compose must consume the server reply-all preset');
  assert.match(uiSource, /Відповідь усім/, 'MailApp must label the reply-all composer');
});

test('thread unsubscribe points to the newest exact supporting message even outside the rendered window', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_unsubscribe_history_1';
  const messages = Array.from({ length: 102 }, (_, index) => {
    const headers = [
      { name: 'From', value: 'Newsletter <news@example.com>' },
      { name: 'To', value: 'tarasevych.pavlo@gmail.com' },
      { name: 'Subject', value: 'Newsletter history' },
      { name: 'Date', value: 'Wed, 15 Jul 2026 13:09:00 +0200' },
    ];
    if (index === 0) headers.push({
      name: 'List-Unsubscribe', value: '<https://news.example.com/unsubscribe/older>',
    });
    if (index === 1) headers.push({
      name: 'List-Unsubscribe', value: '<https://news.example.com/unsubscribe/newer>',
    });
    return {
      id: `message_unsubscribe_${String(index).padStart(3, '0')}`,
      threadId,
      internalDate: String(index + 1),
      labelIds: ['INBOX'],
      snippet: `Message ${index}`,
      payload: { mimeType: 'text/plain', headers, body: { data: '', size: 0 } },
    };
  });
  harness.setGmail(requestPath => {
    if (requestPath === `/threads/${threadId}?format=full`) {
      return { id: threadId, historyId: 'history_unsubscribe_1', messages };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  harness.context.analyzeMessage_ = () => ({
    essence: 'Історія розсилки.', action: '',
    importance: { icon: '🟢', level: 'звичайна', reason: 'без термінових дій' },
    deadlines: [], amounts: [], otpCodes: [],
  });

  const thread = resultData(rpc(harness, token, 'thread', { threadId }));
  assert.equal(thread.truncated, true);
  assert.equal(thread.messages.length, 100);
  assert.equal(
    thread.messages.some(message => message.id === 'message_unsubscribe_001'),
    false,
    'the supporting message is intentionally older than the rendered window'
  );
  assert.equal(thread.unsubscribe.available, true);
  assert.equal(thread.unsubscribe.openUrl, 'https://news.example.com/unsubscribe/newer');
  assert.equal(thread.unsubscribe.messageId, 'message_unsubscribe_001');
  assert.equal(thread.unsubscribeMessageId, 'message_unsubscribe_001');
});

test('message DTOs expose a full Ukrainian header date and a safe sender-domain logo fallback', () => {
  const formatted = {
    u: '3',
    M: '7',
    d: '15',
    "yyyy 'о' HH:mm": '2026 о 13:09',
  };
  const harness = makeContext({
    formatDate: (_date, _timezone, pattern) => formatted[pattern] || '',
  });
  const dto = harness.context.mailboxMessageDto_({
    id: 'message_localized_date_1',
    threadId: 'thread_localized_date_1',
    internalDate: String(Date.parse('2026-07-15T11:09:00Z')),
    labelIds: ['INBOX'],
    payload: { headers: [
      { name: 'From', value: 'Billing <notify@billing.example.com>' },
      { name: 'To', value: 'tarasevych.pavlo@gmail.com' },
      { name: 'Date', value: 'Wed, 15 Jul 2026 13:09:00 +0200' },
      { name: 'Subject', value: 'Localized date' },
    ] },
  }, { plain: 'Body', html: '', attachments: [], inlineAttachments: [] });
  assert.equal(dto.timestampLabel, 'середа, 15 липня 2026 о 13:09');
  assert.equal(
    dto.sender.avatarUrl,
    'https://www.google.com/s2/favicons?domain_url=https%3A%2F%2Fbilling.example.com&sz=128'
  );
  assert.doesNotMatch(dto.sender.avatarUrl, /notify|@/i, 'avatar URL must not contain sender-local tracking data');
  assert.equal(
    harness.context.mailboxSenderDto_('Person <person@gmail.com>').avatarUrl,
    '',
    'personal mailbox domains should use the local initial avatar'
  );
  assert.match(uiSource, /formatMessageHeaderTimestamp/, 'MailApp must have a full-date client fallback');
  assert.match(uiSource, /weekday:\s*"long"/, 'reader date fallback must include the localized weekday');
});

test('dynamic list and compose titles keep their accessibility names synchronized', () => {
  requireUiFile();
  assert.match(uiSource, /id="listPane"\s+aria-label="Вхідні"/);
  assert.match(uiSource, /id="composeSheet"[^>]*aria-labelledby="composeTitle"/);
  const listRenderer = extractUiFunction('renderThreadList');
  assert.match(listRenderer, /listPane\.setAttribute\("aria-label",\s*visibleListTitle\)/);
  assert.match(listRenderer, /threadList\.setAttribute\("aria-label",\s*"Список розмов: "\s*\+\s*visibleListTitle\)/);
  const composeRenderer = extractUiFunction('renderCompose');
  assert.match(composeRenderer, /composeTitle\.textContent\s*=\s*visibleComposeTitle/);
  assert.match(composeRenderer, /Відповідь усім/);
});

test('RPC operation names are strictly allowlisted and cannot reach setup or delete functions', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    throw new Error(`allowlist bypass reached Gmail: ${requestPath}`);
  });

  for (const op of ['setupNotifier', 'checkNewMail', '__proto__', 'constructor', 'delete', 'permanentDelete', 'composeSend']) {
    resultFailed(rpc(harness, token, op, {}), `operation ${op} must be rejected`);
  }
  assert.equal(harness.gmailCalls.length, 0, 'unknown RPC operations must not call Gmail');
});

test('reversible thread actions return signed exact-state descriptors and never call permanent delete', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_abc123';
  const immediateSync = [];
  harness.context.syncTelegramMailCardsForThreadFromGmail_ = (syncedThreadId, messageId) => {
    assert.ok(
      harness.gmailCalls.some(call => call.requestPath === `/threads/${threadId}/modify`),
      'immediate Telegram state sync must run only after Gmail confirms the mutation'
    );
    immediateSync.push({ threadId: syncedThreadId, messageId });
    return { attempted: 1, completed: 1, failed: 0 };
  };
  harness.setGmail((requestPath, options) => {
    if (requestPath.startsWith(`/threads/${threadId}?`)) {
      return {
        id: threadId,
        messages: [{ id: 'message_1', labelIds: ['INBOX', 'UNREAD'] }],
      };
    }
    if (requestPath === `/threads/${threadId}/trash` ||
        requestPath === `/threads/${threadId}/untrash` ||
        requestPath === `/threads/${threadId}/modify`) {
      assert.equal(String(options.method || '').toLowerCase(), 'post');
      return { id: threadId };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const expectations = [
    ['archive', 'inbox'],
    ['trash', 'untrash'],
    ['spam', 'notSpam'],
    ['read', 'unread'],
    ['star', 'unstar'],
    ['important', 'notImportant'],
  ];
  for (const [action, inverse] of expectations) {
    const data = resultData(rpc(harness, token, 'action', { threadId, action }), `${action} should succeed`);
    assert.ok(data.undo && typeof data.undo === 'object', `${action} must return an undo descriptor`);
    assert.equal(data.undoAction, inverse, `${action} keeps the legacy action label for UI copy`);
    assert.equal(data.undo.action, 'restoreState', `${action} undo must restore the captured state`);
    assert.match(data.undo.undoToken, /^mbu1\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
    assert.equal(
      String(data.undo.threadId || data.undo.targetId || data.undo.target || ''),
      threadId,
      `${action} undo must be bound to the same thread`
    );
  }
  assert.deepEqual(immediateSync, [
    { threadId, messageId: '' },
    { threadId, messageId: '' },
    { threadId, messageId: '' },
  ], 'read/star/important must update Telegram immediately; moves use the durable move reconciler');

  assert.ok(
    harness.gmailCalls.some(call => call.requestPath === `/threads/${threadId}/trash`),
    'trash must use Gmail threads.trash'
  );
  assert.ok(
    harness.gmailCalls.some(call => call.requestPath === `/threads/${threadId}/modify`),
    'archive/label actions must use Gmail threads.modify'
  );
  assert.equal(
    harness.gmailCalls.some(call => String(call.options.method || '').toLowerCase() === 'delete'),
    false,
    'mailbox actions must never use HTTP DELETE'
  );
  const threadActionSource = clientSource.slice(
    clientSource.indexOf('function mailboxApplyAction_('),
    clientSource.indexOf('function mailboxActionAffectedLabels_(')
  );
  assert.doesNotMatch(threadActionSource, /method\s*:\s*['"]delete['"]/i,
    'thread actions must not implement permanent delete');
  assert.match(clientSource, /function mailboxManageUserLabel_\([\s\S]*confirmDelete !== 'DELETE_LABEL'[\s\S]*\/labels\//,
    'the only deliberate delete surface must be guarded user-label administration');
  assert.doesNotMatch(clientSource, /\/(?:messages|threads)\/[^'"\n]+\/delete/i);
});

test('bot-managed snooze persists before Gmail, returns an honest DTO, and Inbox cancels it', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_snooze_12345';
  const labelId = 'Label_bot_snooze_1';
  const propertyKey = `BOT_SNOOZE_V1_${threadId}`;
  const snoozeUntil = Date.now() + 2 * 60 * 60 * 1000;
  let currentLabels = ['INBOX', 'UNREAD'];

  harness.setGmail((requestPath, options) => {
    if (requestPath === '/labels') {
      return { labels: [{ id: labelId, name: 'Telegram/Відкладені', type: 'user' }] };
    }
    if (requestPath === `/threads/${threadId}/modify`) {
      const durable = JSON.parse(harness.propertyValues[propertyKey]);
      assert.ok(durable, 'schedule must exist before Gmail threads.modify');
      assert.ok(['reserved', 'cancel_pending'].includes(durable.state));
      assert.ok(Buffer.byteLength(harness.propertyValues.BOT_SNOOZE_INDEX_V1, 'utf8') < 8500);
      const body = options.body || {};
      if (durable.state === 'reserved') {
        assert.deepEqual(Array.from(body.addLabelIds), [labelId]);
        assert.deepEqual(Array.from(body.removeLabelIds), ['INBOX']);
        currentLabels = [labelId, 'UNREAD'];
      } else {
        assert.deepEqual(Array.from(body.addLabelIds), ['INBOX']);
        assert.ok(Array.from(body.removeLabelIds).includes(labelId));
        currentLabels = ['INBOX', 'UNREAD'];
      }
      return { id: threadId };
    }
    if (requestPath.startsWith(`/threads/${threadId}?`)) {
      return {
        id: threadId,
        messages: [{
          id: 'message_snooze_1',
          threadId,
          internalDate: String(Date.now()),
          labelIds: currentLabels.slice(),
          payload: { headers: [{ name: 'Subject', value: 'Snooze contract' }] },
        }],
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const scheduled = resultData(rpc(harness, token, 'action', {
    threadId,
    action: 'snooze',
    snoozeUntil,
    folder: 'Inbox',
    filter: 'all',
  }));
  assert.equal(scheduled.undoAction, 'inbox');
  assert.equal(scheduled.undo.action, 'restoreState');
  assert.match(scheduled.undo.undoToken, /^mbu1\./);
  assert.equal(scheduled.removeFromView, true);
  assert.equal(scheduled.snooze.status, 'scheduled');
  assert.equal(scheduled.snooze.mode, 'bot_managed');
  assert.equal(scheduled.snooze.nativeGmail, false);
  assert.equal(scheduled.snooze.snoozeUntil, snoozeUntil);
  assert.equal(scheduled.snooze.labelName, 'Telegram/Відкладені');
  assert.equal(JSON.parse(harness.propertyValues[propertyKey]).state, 'scheduled');

  const restored = resultData(rpc(harness, token, 'action', {
    threadId,
    action: 'inbox',
    folder: 'Snoozed',
    filter: 'all',
  }));
  assert.equal(restored.snooze.status, 'cancelled');
  assert.equal(restored.snooze.cancelled, true);
  assert.equal(harness.propertyValues[propertyKey], undefined);
  assert.deepEqual(JSON.parse(harness.propertyValues.BOT_SNOOZE_INDEX_V1), []);
  assert.equal(
    harness.gmailCalls.some(call => String(call.options.method || '').toLowerCase() === 'delete'),
    false
  );
});

test('snooze creates its visible user label only after the durable reservation exists', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_snooze_label_1';
  const propertyKey = `BOT_SNOOZE_V1_${threadId}`;
  const labelId = 'Label_created_snooze_1';
  let labelReads = 0;

  harness.setGmail((requestPath, options) => {
    if (requestPath === '/labels' && String(options.method || '').toLowerCase() === 'get') {
      labelReads += 1;
      if (labelReads > 1) {
        const record = JSON.parse(harness.propertyValues[propertyKey]);
        assert.equal(record.state, 'label_pending');
      }
      return { labels: [] };
    }
    if (requestPath === '/labels' && String(options.method || '').toLowerCase() === 'post') {
      const record = JSON.parse(harness.propertyValues[propertyKey]);
      assert.equal(record.state, 'label_pending', 'label creation must follow the durable reservation');
      assert.equal(options.body.name, 'Telegram/Відкладені');
      return { id: labelId, name: 'Telegram/Відкладені', type: 'user' };
    }
    if (requestPath === `/threads/${threadId}/modify`) {
      const record = JSON.parse(harness.propertyValues[propertyKey]);
      assert.equal(record.state, 'reserved');
      assert.equal(record.labelId, labelId);
      return { id: threadId };
    }
    if (requestPath.startsWith(`/threads/${threadId}?`)) {
      return {
        id: threadId,
        messages: [{ id: 'message_snooze_label_1', threadId, labelIds: [labelId], payload: { headers: [] } }],
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  resultData(rpc(harness, token, 'action', {
    threadId,
    action: 'snooze',
    snoozeUntil: Date.now() + 60 * 60 * 1000,
  }));
  assert.ok(labelReads >= 2);
  assert.equal(JSON.parse(harness.propertyValues[propertyKey]).state, 'scheduled');
});

test('snooze rejects non-integer time and saturated durable storage before Gmail mutation', () => {
  const invalidHarness = makeContext();
  const invalidToken = openOwnerSession(invalidHarness);
  invalidHarness.setGmail(requestPath => {
    throw new Error(`invalid snooze reached Gmail: ${requestPath}`);
  });
  for (const snoozeUntil of [
    new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    Date.now() + 1000,
    Date.now() + 366 * 24 * 60 * 60 * 1000,
  ]) {
    const error = resultFailed(rpc(invalidHarness, invalidToken, 'action', {
      threadId: 'thread_invalid_snooze_1', action: 'snooze', snoozeUntil,
    }));
    assert.equal(error.code, 'INVALID_SNOOZE_TIME');
  }
  assert.equal(invalidHarness.gmailCalls.length, 0);

  const propertyValues = {};
  const keys = [];
  for (let index = 0; index < 60; index += 1) {
    const threadId = `thread_capacity_${String(index).padStart(3, '0')}`;
    const key = `BOT_SNOOZE_V1_${threadId}`;
    keys.push(key);
    propertyValues[key] = JSON.stringify({
      version: 1,
      threadId,
      labelName: 'Telegram/Відкладені',
      labelId: 'Label_bot_snooze_1',
      snoozeUntil: Date.now() + 60 * 60 * 1000,
      state: 'scheduled',
    });
  }
  propertyValues.BOT_SNOOZE_INDEX_V1 = JSON.stringify(keys);
  const fullHarness = makeContext({ properties: propertyValues });
  const fullToken = openOwnerSession(fullHarness);
  fullHarness.setGmail((requestPath, options) => {
    if (requestPath === '/labels' && String(options.method || '').toLowerCase() === 'get') {
      return { labels: [{ id: 'Label_bot_snooze_1', name: 'Telegram/Відкладені', type: 'user' }] };
    }
    throw new Error(`capacity overflow reached Gmail mutation: ${requestPath}`);
  });
  const capacityError = resultFailed(rpc(fullHarness, fullToken, 'action', {
    threadId: 'thread_capacity_new_1',
    action: 'snooze',
    snoozeUntil: Date.now() + 60 * 60 * 1000,
  }));
  assert.equal(capacityError.code, 'SNOOZE_BUSY');
  assert.equal(
    fullHarness.gmailCalls.some(call => String(call.options.method || '').toLowerCase() === 'post'),
    false,
    'hard-cap rejection may read labels but must not mutate Gmail'
  );
});

test('definite Gmail snooze failure rolls back the durable schedule', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_snooze_failure_1';
  harness.setGmail((requestPath, options) => {
    if (requestPath === '/labels') {
      return { labels: [{ id: 'Label_snooze_failure', name: 'Telegram/Відкладені', type: 'user' }] };
    }
    if (requestPath === `/threads/${threadId}/modify`) {
      const error = new Error('definite rejection');
      error.gmailHttpStatus = 400;
      throw error;
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  resultFailed(rpc(harness, token, 'action', {
    threadId,
    action: 'snooze',
    snoozeUntil: Date.now() + 60 * 60 * 1000,
  }));
  assert.equal(harness.propertyValues[`BOT_SNOOZE_V1_${threadId}`], undefined);
  assert.deepEqual(JSON.parse(harness.propertyValues.BOT_SNOOZE_INDEX_V1), []);
  const repairKey = `BOT_SNOOZE_REPAIR_V1_${threadId}`;
  const repair = JSON.parse(harness.propertyValues[repairKey]);
  assert.equal(repair.state, 'repair_required');
  assert.equal(repair.repairReason, 'aborted_after_gmail_failure');
  const gmailCallsBeforeTimer = harness.gmailCalls.length;
  assert.deepEqual(
    JSON.parse(JSON.stringify(harness.context.processDueBotManagedSnoozes_(10))),
    { attempted: 0, completed: 0, failed: 0 },
    'terminal repair state must never be executable timer work'
  );
  assert.equal(harness.gmailCalls.length, gmailCallsBeforeTimer);
});

test('due snooze recovery reads Gmail before retry and never repeats a confirmed wake mutation', () => {
  const harness = makeContext();
  const { context } = harness;
  const threadId = 'thread_due_snooze_1';
  const propertyKey = `BOT_SNOOZE_V1_${threadId}`;
  const labelId = 'Label_due_snooze_1';
  context.withBotSnoozeLock_(props => context.botSnoozeWriteRecordLocked_(props, {
    threadId,
    snoozeUntil: Date.now() - 1000,
    labelId,
    state: 'scheduled',
    operationToken: 'initial-due-token',
    createdAt: Date.now() - 60000,
    updatedAt: Date.now() - 60000,
    nextRetryAt: 0,
    attempts: 0,
  }));

  let phase = 1;
  let wakePosts = 0;
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/threads/${threadId}?format=minimal`) {
      return {
        id: threadId,
        messages: [{ labelIds: phase === 1 ? [labelId] : ['INBOX'] }],
      };
    }
    if (requestPath === `/threads/${threadId}/modify`) {
      wakePosts += 1;
      assert.deepEqual(Array.from(options.body.addLabelIds), ['INBOX']);
      assert.deepEqual(Array.from(options.body.removeLabelIds), [labelId]);
      const error = new Error('transport outcome uncertain');
      error.gmailOutcomeUncertain = true;
      error.gmailHttpStatus = 503;
      throw error;
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const first = context.processDueBotManagedSnoozes_(10);
  assert.equal(first.failed, 1);
  assert.equal(wakePosts, 1);
  const retryRecord = JSON.parse(harness.propertyValues[propertyKey]);
  retryRecord.nextRetryAt = 0;
  harness.propertyValues[propertyKey] = JSON.stringify(retryRecord);
  phase = 2;

  const second = context.processDueBotManagedSnoozes_(10);
  assert.equal(second.completed, 1);
  assert.equal(wakePosts, 1, 'read-back confirmation must prevent a second Gmail mutation');
  assert.equal(harness.propertyValues[propertyKey], undefined);
  assert.deepEqual(
    harness.gmailCalls.map(call => String(call.options.method || 'get').toLowerCase()),
    ['get', 'post', 'get'],
    'each attempted mutation must be preceded by a current Gmail read'
  );
});

test('rollback storage failure is reported as pending, never as a definite failed snooze', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_rollback_failure_1';
  harness.context.rollbackBotManagedSnooze_ = () => {
    throw new Error('simulated property rollback outage');
  };
  harness.setGmail((requestPath) => {
    if (requestPath === '/labels') {
      return { labels: [{ id: 'Label_rollback_failure', name: 'Telegram/Відкладені', type: 'user' }] };
    }
    if (requestPath === `/threads/${threadId}/modify`) {
      const error = new Error('definite Gmail rejection');
      error.gmailHttpStatus = 400;
      throw error;
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const error = resultFailed(rpc(harness, token, 'action', {
    threadId,
    action: 'snooze',
    snoozeUntil: Date.now() + 60 * 60 * 1000,
  }));
  assert.equal(error.code, 'SNOOZE_PENDING');
  assert.equal(JSON.parse(harness.propertyValues[`BOT_SNOOZE_V1_${threadId}`]).state, 'reserved');
});

test('failed Inbox cancellation with broken rollback stays pending instead of executing silently', () => {
  const harness = makeContext();
  const { context } = harness;
  const token = openOwnerSession(harness);
  const threadId = 'thread_cancel_rollback_failure_1';
  const propertyKey = `BOT_SNOOZE_V1_${threadId}`;
  context.withBotSnoozeLock_(props => context.botSnoozeWriteRecordLocked_(props, {
    threadId,
    snoozeUntil: Date.now() + 60 * 60 * 1000,
    labelId: 'Label_cancel_rollback_failure',
    state: 'scheduled',
    operationToken: 'cancel-rollback-start',
    createdAt: Date.now(), updatedAt: Date.now(), nextRetryAt: 0, attempts: 0,
  }));
  context.rollbackBotManagedSnoozeCancellation_ = () => {
    throw new Error('simulated cancel rollback outage');
  };
  harness.setGmail(requestPath => {
    if (requestPath === `/threads/${threadId}/modify`) {
      const error = new Error('definite Inbox rejection');
      error.gmailHttpStatus = 400;
      throw error;
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const error = resultFailed(rpc(harness, token, 'action', { threadId, action: 'inbox' }));
  assert.equal(error.code, 'SNOOZE_PENDING');
  assert.equal(JSON.parse(harness.propertyValues[propertyKey]).state, 'cancel_pending');
});

test('an expired stale worker cannot POST after a newer operation supersedes its token', () => {
  const harness = makeContext();
  const { context } = harness;
  const threadId = 'thread_superseded_worker_1';
  const labelId = 'Label_superseded_worker';
  const initial = context.withBotSnoozeLock_(props => context.botSnoozeWriteRecordLocked_(props, {
    threadId,
    snoozeUntil: Date.now() - 1000,
    labelId,
    state: 'scheduled',
    operationToken: 'initial-worker-token',
    createdAt: Date.now() - 60000,
    updatedAt: Date.now() - 60000,
    nextRetryAt: 0,
    attempts: 0,
  }));
  const staleClaim = context.botSnoozeClaimWork_(initial.propertyKey, Date.now());
  context.withBotSnoozeLock_(props => context.botSnoozeWriteRecordLocked_(props, {
    ...staleClaim,
    state: 'scheduled',
    processingKind: '',
    operationToken: 'newer-operation-token',
    snoozeUntil: Date.now() + 60 * 60 * 1000,
    leaseUntil: 0,
    nextRetryAt: 0,
  }));
  let posts = 0;
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/threads/${threadId}?format=minimal`) {
      return { id: threadId, messages: [{ labelIds: [labelId] }] };
    }
    if (String(options.method || '').toLowerCase() === 'post') posts += 1;
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  assert.throws(
    () => context.processBotSnoozeClaim_(staleClaim),
    error => error && error.botSnoozeCode === 'SNOOZE_SUPERSEDED'
  );
  assert.equal(posts, 0, 'token revalidation must happen immediately before the Gmail mutation');
  assert.equal(
    JSON.parse(harness.propertyValues[initial.propertyKey]).operationToken,
    'newer-operation-token'
  );
});

test('the reserved snooze label is hidden and cannot be changed through generic label RPC', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const reservedId = 'Label_reserved_snooze';
  const userId = 'Label_user_visible';
  let modifies = 0;
  harness.setGmail((requestPath) => {
    if (requestPath === '/profile') {
      return { emailAddress: 'tarasevych.pavlo@gmail.com', messagesTotal: 1, threadsTotal: 1 };
    }
    if (requestPath === '/labels') {
      return { labels: [
        { id: reservedId, name: 'Telegram/Відкладені', type: 'user' },
        { id: userId, name: 'Робота', type: 'user' },
      ] };
    }
    if (requestPath.includes('/modify')) modifies += 1;
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const bootstrap = resultData(rpc(harness, token, 'bootstrap', {}));
  assert.deepEqual(Array.from(bootstrap.customLabels, label => label.id), [userId]);
  const rejected = resultFailed(rpc(harness, token, 'label', {
    threadId: 'thread_reserved_label_1',
    removeLabelIds: [reservedId],
  }));
  assert.equal(rejected.code, 'INVALID_LABEL');
  assert.equal(modifies, 0);
});

test('confirmed Trash and Spam cancel schedules and remove the private marker promptly', () => {
  for (const action of ['trash', 'spam']) {
    const harness = makeContext();
    const { context } = harness;
    const token = openOwnerSession(harness);
    const threadId = `thread_${action}_snooze_1`;
    const labelId = `Label_${action}_snooze`;
    const propertyKey = `BOT_SNOOZE_V1_${threadId}`;
    context.withBotSnoozeLock_(props => context.botSnoozeWriteRecordLocked_(props, {
      threadId,
      snoozeUntil: Date.now() + 60 * 60 * 1000,
      labelId,
      state: 'scheduled',
      operationToken: `${action}-scheduled-token`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      nextRetryAt: 0,
      attempts: 0,
    }));
    let currentLabels = [labelId];
    const writes = [];
    harness.setGmail((requestPath, options) => {
      if (requestPath === `/threads/${threadId}/trash`) {
        writes.push({ requestPath, body: options.body || null });
        currentLabels = ['TRASH', labelId];
        return { id: threadId };
      }
      if (requestPath === `/threads/${threadId}/modify`) {
        writes.push({ requestPath, body: options.body || {} });
        if (action === 'spam' && writes.length === 1) {
          assert.ok(Array.from(options.body.addLabelIds).includes('SPAM'));
          assert.ok(Array.from(options.body.removeLabelIds).includes(labelId));
          currentLabels = ['SPAM'];
        } else {
          assert.deepEqual(Array.from(options.body.removeLabelIds), [labelId]);
          currentLabels = ['TRASH'];
        }
        return { id: threadId };
      }
      if (requestPath.startsWith(`/threads/${threadId}?`)) {
        return { id: threadId, messages: [{
          id: `message_${action}_snooze_1`, threadId, labelIds: currentLabels, payload: { headers: [] },
        }] };
      }
      throw new Error(`Unexpected Gmail request: ${requestPath}`);
    });
    const result = resultData(rpc(harness, token, 'action', { threadId, action }));
    assert.equal(result.snooze.status, 'cancelled');
    assert.equal(harness.propertyValues[propertyKey], undefined);
    assert.equal(currentLabels.includes(labelId), false);
    assert.equal(writes.length, action === 'trash' ? 2 : 1);
  }
});

test('uncertain Trash and Spam outcomes are read back before marker cleanup', () => {
  for (const action of ['trash', 'spam']) {
    const harness = makeContext();
    const { context } = harness;
    const threadId = `thread_${action}_readback_1`;
    const labelId = `Label_${action}_readback`;
    const propertyKey = `BOT_SNOOZE_V1_${threadId}`;
    context.withBotSnoozeLock_(props => context.botSnoozeWriteRecordLocked_(props, {
      threadId,
      snoozeUntil: Date.now() + 60 * 60 * 1000,
      labelId,
      state: 'cancel_pending',
      cancelAction: action,
      operationToken: `${action}-uncertain-token`,
      createdAt: Date.now(), updatedAt: Date.now(), nextRetryAt: 0, leaseUntil: 0, attempts: 0,
    }));
    let writes = 0;
    harness.setGmail((requestPath, options) => {
      if (requestPath === `/threads/${threadId}?format=minimal`) {
        return { id: threadId, messages: [{ labelIds: [action === 'trash' ? 'TRASH' : 'SPAM', labelId] }] };
      }
      if (requestPath === `/threads/${threadId}/modify`) {
        writes += 1;
        assert.deepEqual(Array.from(options.body.removeLabelIds), [labelId]);
        return { id: threadId };
      }
      throw new Error(`Unexpected Gmail request: ${requestPath}`);
    });
    const result = context.processDueBotManagedSnoozes_(10);
    assert.equal(result.completed, 1);
    assert.equal(writes, 1);
    assert.equal(harness.propertyValues[propertyKey], undefined);
    assert.deepEqual(
      harness.gmailCalls.map(call => String(call.options.method || 'get').toLowerCase()),
      ['get', 'post']
    );
  }
});

test('permanent or exhausted worker failures leave active capacity and expose a repair path', () => {
  const harness = makeContext();
  const { context } = harness;
  const threadId = 'thread_dead_letter_snooze_1';
  const labelId = 'Label_dead_letter_snooze';
  const propertyKey = `BOT_SNOOZE_V1_${threadId}`;
  context.withBotSnoozeLock_(props => context.botSnoozeWriteRecordLocked_(props, {
    threadId,
    snoozeUntil: Date.now() - 1000,
    labelId,
    state: 'scheduled',
    operationToken: 'dead-letter-start',
    createdAt: Date.now() - 60000,
    updatedAt: Date.now() - 60000,
    nextRetryAt: 0,
    attempts: 7,
  }));
  harness.setGmail((requestPath) => {
    if (requestPath === `/threads/${threadId}?format=minimal`) {
      return { id: threadId, messages: [{ labelIds: [labelId] }] };
    }
    if (requestPath === `/threads/${threadId}/modify`) {
      const error = new Error('persistent Gmail outage');
      error.gmailHttpStatus = 503;
      error.gmailOutcomeUncertain = true;
      throw error;
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const first = context.processDueBotManagedSnoozes_(10);
  assert.equal(first.failed, 1);
  assert.equal(harness.propertyValues[propertyKey], undefined, 'dead-letter must free the active slot');
  const repairKey = `BOT_SNOOZE_REPAIR_V1_${threadId}`;
  assert.equal(JSON.parse(harness.propertyValues[repairKey]).state, 'repair_required');
  const callsBeforeSecondPass = harness.gmailCalls.length;
  context.processDueBotManagedSnoozes_(10);
  assert.equal(harness.gmailCalls.length, callsBeforeSecondPass, 'repair records must never auto-mutate Gmail');
  const capability = context.botManagedSnoozeCapabilities_();
  assert.equal(capability.repair.requiredCount, 1);
  assert.equal(capability.repair.action, 'inbox');
});

test('Inbox restores an active Snooze schedule after its Gmail label was deleted', () => {
  const harness = makeContext();
  const { context } = harness;
  const token = openOwnerSession(harness);
  const threadId = 'thread_deleted_snooze_label_active';
  const staleLabelId = 'Label_deleted_by_user_active';
  const propertyKey = `BOT_SNOOZE_V1_${threadId}`;
  context.withBotSnoozeLock_(props => context.botSnoozeWriteRecordLocked_(props, {
    threadId,
    snoozeUntil: Date.now() + 60 * 60 * 1000,
    labelId: staleLabelId,
    state: 'scheduled',
    operationToken: 'deleted-label-active-start',
    createdAt: Date.now() - 60 * 1000,
    updatedAt: Date.now() - 60 * 1000,
    nextRetryAt: 0,
    attempts: 0,
  }));

  let currentLabels = ['UNREAD'];
  let mutations = 0;
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/threads/${threadId}?format=minimal`) {
      return { id: threadId, messages: [{ id: 'message_deleted_active', labelIds: currentLabels.slice() }] };
    }
    if (requestPath === `/threads/${threadId}/modify`) {
      mutations += 1;
      assert.deepEqual(Array.from(options.body.addLabelIds), ['INBOX']);
      assert.deepEqual(Array.from(options.body.removeLabelIds), []);
      currentLabels = ['INBOX', 'UNREAD'];
      return { id: threadId };
    }
    if (requestPath.startsWith(`/threads/${threadId}?`)) {
      return {
        id: threadId,
        messages: [{
          id: 'message_deleted_active', threadId, internalDate: String(Date.now()),
          labelIds: currentLabels.slice(), payload: { headers: [] },
        }],
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const data = resultData(rpc(harness, token, 'action', {
    threadId,
    action: 'inbox',
    folder: 'Snoozed',
    filter: 'all',
  }));
  assert.equal(data.snooze.status, 'cancelled');
  assert.equal(mutations, 1);
  assert.equal(harness.propertyValues[propertyKey], undefined);
  assert.deepEqual(JSON.parse(harness.propertyValues.BOT_SNOOZE_INDEX_V1), []);
});

test('the visible Inbox repair action clears a dead-letter marker and repair record', () => {
  const harness = makeContext();
  const { context } = harness;
  const token = openOwnerSession(harness);
  const threadId = 'thread_repair_inbox_1';
  const labelId = 'Label_repair_inbox';
  const repairKey = `BOT_SNOOZE_REPAIR_V1_${threadId}`;
  context.withBotSnoozeLock_(props => context.botSnoozeWriteRepairLocked_(props, {
    threadId,
    snoozeUntil: Date.now() - 60 * 1000,
    labelId,
    operationToken: 'repair-inbox-start',
    failedAt: Date.now() - 30 * 1000,
    attempts: 8,
    repairReason: 'retry_exhausted',
  }));

  let currentLabels = [labelId, 'UNREAD'];
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/threads/${threadId}/modify`) {
      assert.equal(String(options.method || '').toLowerCase(), 'post');
      assert.deepEqual(Array.from(options.body.addLabelIds), ['INBOX']);
      assert.ok(Array.from(options.body.removeLabelIds).includes(labelId));
      currentLabels = ['INBOX', 'UNREAD'];
      return { id: threadId };
    }
    if (requestPath.startsWith(`/threads/${threadId}?`)) {
      return {
        id: threadId,
        messages: [{
          id: 'message_repair_inbox_1',
          threadId,
          labelIds: currentLabels.slice(),
          payload: { headers: [] },
        }],
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const result = resultData(rpc(harness, token, 'action', {
    threadId,
    action: 'inbox',
    folder: 'Snoozed',
    filter: 'all',
  }));
  assert.equal(result.snooze.status, 'cancelled');
  assert.equal(harness.propertyValues[repairKey], undefined);
  assert.deepEqual(JSON.parse(harness.propertyValues.BOT_SNOOZE_REPAIR_INDEX_V1), []);
  assert.equal(currentLabels.includes(labelId), false);
  assert.equal(context.botManagedSnoozeCapabilities_().repair.requiredCount, 0);
});

test('Inbox clears a Snooze repair record after its Gmail label was deleted', () => {
  const harness = makeContext();
  const { context } = harness;
  const token = openOwnerSession(harness);
  const threadId = 'thread_deleted_snooze_label_repair';
  const staleLabelId = 'Label_deleted_by_user_repair';
  const repairKey = `BOT_SNOOZE_REPAIR_V1_${threadId}`;
  context.withBotSnoozeLock_(props => context.botSnoozeWriteRepairLocked_(props, {
    threadId,
    snoozeUntil: Date.now() - 60 * 1000,
    labelId: staleLabelId,
    operationToken: 'deleted-label-repair-start',
    failedAt: Date.now() - 30 * 1000,
    attempts: 8,
    repairReason: 'retry_exhausted',
  }));

  let currentLabels = ['UNREAD'];
  let mutations = 0;
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/threads/${threadId}?format=minimal`) {
      return { id: threadId, messages: [{ id: 'message_deleted_repair', labelIds: currentLabels.slice() }] };
    }
    if (requestPath === `/threads/${threadId}/modify`) {
      mutations += 1;
      assert.deepEqual(Array.from(options.body.addLabelIds), ['INBOX']);
      assert.deepEqual(Array.from(options.body.removeLabelIds), []);
      currentLabels = ['INBOX', 'UNREAD'];
      return { id: threadId };
    }
    if (requestPath.startsWith(`/threads/${threadId}?`)) {
      return {
        id: threadId,
        messages: [{
          id: 'message_deleted_repair', threadId, internalDate: String(Date.now()),
          labelIds: currentLabels.slice(), payload: { headers: [] },
        }],
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const data = resultData(rpc(harness, token, 'action', {
    threadId,
    action: 'inbox',
    folder: 'Snoozed',
    filter: 'all',
  }));
  assert.equal(data.snooze.status, 'cancelled');
  assert.equal(mutations, 1);
  assert.equal(harness.propertyValues[repairKey], undefined);
  assert.deepEqual(JSON.parse(harness.propertyValues.BOT_SNOOZE_REPAIR_INDEX_V1), []);
  assert.equal(context.botManagedSnoozeCapabilities_().repair.requiredCount, 0);
});

test('a permanent Gmail worker error dead-letters on the first attempt', () => {
  const harness = makeContext();
  const { context } = harness;
  const threadId = 'thread_permanent_snooze_1';
  const labelId = 'Label_permanent_snooze';
  const propertyKey = `BOT_SNOOZE_V1_${threadId}`;
  context.withBotSnoozeLock_(props => context.botSnoozeWriteRecordLocked_(props, {
    threadId,
    snoozeUntil: Date.now() - 1000,
    labelId,
    state: 'scheduled',
    operationToken: 'permanent-start',
    createdAt: Date.now(), updatedAt: Date.now(), nextRetryAt: 0, attempts: 0,
  }));
  harness.setGmail(requestPath => {
    if (requestPath === `/threads/${threadId}?format=minimal`) {
      return { id: threadId, messages: [{ labelIds: [labelId] }] };
    }
    if (requestPath === `/threads/${threadId}/modify`) {
      const error = new Error('permission revoked');
      error.gmailHttpStatus = 403;
      throw error;
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const result = context.processDueBotManagedSnoozes_(10);
  assert.equal(result.failed, 1);
  assert.equal(harness.propertyValues[propertyKey], undefined);
  assert.equal(
    JSON.parse(harness.propertyValues[`BOT_SNOOZE_REPAIR_V1_${threadId}`]).repairReason,
    'permanent_gmail_failure'
  );
});

test('moving a thread reconciles its Telegram card only after Gmail succeeds', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_reconcile_1';
  const messageId = 'message_reconcile_1';
  const reconciliationCalls = [];
  harness.context.prepareTelegramMailCardAction_ = request => {
    assert.ok(
      !harness.gmailCalls.some(call => call.requestPath === `/threads/${threadId}/modify`),
      'Telegram capacity must be reserved before Gmail mutates'
    );
    return Object.assign({
      required: true,
      propertyKey: 'TELEGRAM_MAIL_RECONCILE_test_reservation_1',
    }, request);
  };
  harness.context.activateTelegramMailCardAction_ = request => {
    assert.ok(
      harness.gmailCalls.some(call => call.requestPath === `/threads/${threadId}/modify`),
      'Telegram reconciliation must run only after Gmail confirms the mutation'
    );
    reconciliationCalls.push({
      action: request.action,
      gmailThreadId: request.gmailThreadId,
      gmailMessageId: request.gmailMessageId,
    });
    return { queued: 1 };
  };
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/threads/${threadId}/modify`) {
      assert.equal(String(options.method || '').toLowerCase(), 'post');
      return { id: threadId };
    }
    if (requestPath.startsWith(`/threads/${threadId}?`)) {
      return {
        id: threadId,
        messages: [{
          id: messageId,
          threadId,
          labelIds: [],
          internalDate: '1710000000000',
          snippet: 'Archived',
          payload: { headers: [{ name: 'Subject', value: 'Archived thread' }] },
        }],
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const data = resultData(rpc(harness, token, 'action', {
    threadId,
    messageId,
    action: 'archive',
  }));
  assert.deepEqual(reconciliationCalls, [{
    action: 'archive',
    gmailThreadId: threadId,
    gmailMessageId: messageId,
  }]);
  assert.deepEqual(JSON.parse(JSON.stringify(data.telegramSync)), {
    status: 'requested',
    queued: 1,
  });
  assert.equal(
    harness.gmailCalls.filter(call => call.requestPath === `/threads/${threadId}/modify`).length,
    1,
    'Telegram reconciliation must not replay the Gmail mutation'
  );
});

test('Telegram reconciliation is allowlisted to the six canonical move actions', () => {
  const harness = makeContext();
  const calls = [];
  harness.context.reconcileTelegramMailCardAction_ = request => {
    calls.push(JSON.parse(JSON.stringify(request)));
    return { queued: 9999 };
  };
  const movingActions = ['archive', 'trash', 'spam', 'inbox', 'untrash', 'notSpam'];
  movingActions.forEach(action => {
    const result = harness.context.mailboxReconcileTelegramMoveAction_(
      action,
      'thread_reconcile_allowlist_1',
      ''
    );
    assert.equal(result.status, 'requested');
    assert.equal(result.queued, 100, 'client-visible queue counts must stay bounded');
  });
  ['read', 'unread', 'star', 'unstar', 'important', 'notImportant'].forEach(action => {
    const result = harness.context.mailboxReconcileTelegramMoveAction_(
      action,
      'thread_reconcile_allowlist_1',
      ''
    );
    assert.equal(result.status, 'not_applicable');
  });
  assert.deepEqual(calls.map(call => call.action), movingActions);
});

test('Telegram reconciliation failure never masks a confirmed Gmail action', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_reconcile_failure_1';
  harness.context.prepareTelegramMailCardAction_ = request => Object.assign({
    required: true,
    propertyKey: 'TELEGRAM_MAIL_RECONCILE_test_reservation_2',
  }, request);
  harness.context.activateTelegramMailCardAction_ = () => {
    throw new Error('Telegram temporarily unavailable');
  };
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/threads/${threadId}/trash`) {
      assert.equal(String(options.method || '').toLowerCase(), 'post');
      return { id: threadId };
    }
    if (requestPath.startsWith(`/threads/${threadId}?`)) {
      return {
        id: threadId,
        messages: [{
          id: 'message_reconcile_failure_1',
          threadId,
          labelIds: ['TRASH'],
          internalDate: '1710000000000',
          snippet: 'Trashed',
          payload: { headers: [{ name: 'Subject', value: 'Trashed thread' }] },
        }],
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const data = resultData(rpc(harness, token, 'action', { threadId, action: 'trash' }));
  assert.equal(data.action, 'trash');
  assert.deepEqual(JSON.parse(JSON.stringify(data.telegramSync)), {
    status: 'failed',
    queued: 0,
  });
  assert.equal(
    harness.gmailCalls.filter(call => call.requestPath === `/threads/${threadId}/trash`).length,
    1
  );
});

test('a rejected Gmail mutation never starts Telegram reconciliation', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  let reconciliationCalls = 0;
  let cancellationCalls = 0;
  harness.context.prepareTelegramMailCardAction_ = request => Object.assign({
    required: true,
    propertyKey: 'TELEGRAM_MAIL_RECONCILE_test_reservation_3',
  }, request);
  harness.context.activateTelegramMailCardAction_ = () => {
    reconciliationCalls += 1;
    return { queued: 1 };
  };
  harness.context.cancelTelegramMailCardAction_ = () => { cancellationCalls += 1; };
  harness.setGmail(requestPath => {
    if (requestPath === '/threads/thread_gmail_failure_1/modify') {
      throw new Error('Gmail rejected the mutation');
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  resultFailed(rpc(harness, token, 'action', {
    threadId: 'thread_gmail_failure_1',
    action: 'archive',
  }));
  assert.equal(reconciliationCalls, 0);
  assert.equal(cancellationCalls, 1, 'failed Gmail must settle the unused reservation');
});

test('Telegram reservation overload rejects the move before Gmail is mutated', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  harness.context.prepareTelegramMailCardAction_ = () => {
    throw new Error('Telegram synchronization capacity is temporarily full.');
  };
  harness.setGmail(() => {
    assert.fail('Gmail must not be called when Telegram durability cannot be reserved');
  });

  const result = rpc(harness, token, 'action', {
    threadId: 'thread_capacity_full_1',
    messageId: 'message_capacity_full_1',
    action: 'archive',
  });
  assert.equal(result.ok, false);
  assert.equal(result.error.code, 'TELEGRAM_SYNC_BUSY');
  assert.equal(harness.gmailCalls.length, 0);
});

test('MailClient remains safe when the optional Code.gs reconciliation hook is absent', () => {
  requireClientFile();
  const context = vm.createContext({
    console: { error: () => {} },
    Set,
    Map,
    Date,
    JSON,
    Math,
  });
  vm.runInContext(clientSource, context, { filename: 'MailClient.gs' });
  assert.deepEqual(
    JSON.parse(JSON.stringify(context.mailboxReconcileTelegramMoveAction_(
      'archive',
      'thread_without_code_1',
      'message_without_code_1'
    ))),
    { status: 'unavailable', queued: 0 }
  );
});

test('thread actions return a conservative current-view removal decision', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_view_context_1';
  harness.setGmail((requestPath, options) => {
    if (requestPath.startsWith(`/threads/${threadId}?`)) {
      return {
        id: threadId,
        messages: [{ id: 'message_view_1', labelIds: ['INBOX', 'UNREAD', 'STARRED', 'IMPORTANT'] }],
      };
    }
    if (requestPath === `/threads/${threadId}/trash` ||
        requestPath === `/threads/${threadId}/untrash` ||
        requestPath === `/threads/${threadId}/modify`) {
      assert.equal(String(options.method || '').toLowerCase(), 'post');
      return { id: threadId };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const cases = [
    [{ action: 'archive', folder: 'Inbox', filter: 'all' }, true],
    [{ action: 'archive', folder: 'Primary', filter: 'all' }, true],
    [{ action: 'archive', folder: 'Archive', filter: 'all' }, false],
    [{ action: 'inbox', folder: 'Archive', filter: 'all' }, true],
    [{ action: 'untrash', folder: 'Trash', filter: 'all' }, true],
    [{ action: 'notSpam', folder: 'Spam', filter: 'all' }, true],
    [{ action: 'read', folder: 'Inbox', filter: 'unread' }, true],
    [{ action: 'unstar', folder: 'Inbox', filter: 'starred' }, true],
    [{ action: 'notImportant', folder: 'Important', filter: 'all' }, true],
    [{ action: 'star', folder: 'Starred', filter: 'all' }, false],
    // An arbitrary Gmail query can contain OR/negation, so the server must not
    // infer removal from free-form query text alone.
    [{ action: 'read', folder: 'Inbox', filter: 'all', query: 'is:unread' }, false],
  ];
  for (const [view, expected] of cases) {
    const data = resultData(rpc(harness, token, 'action', { threadId, ...view }));
    assert.equal(
      data.removeFromView,
      expected,
      `${view.action} in ${view.folder}/${view.filter} must return ${expected}`
    );
  }

  const legacy = resultData(rpc(harness, token, 'action', { threadId, action: 'archive' }));
  assert.equal(legacy.removeFromView, false, 'missing view context must stay conservative');

  const callsBeforeInvalid = harness.gmailCalls.length;
  resultFailed(rpc(harness, token, 'action', {
    threadId,
    action: 'archive',
    folder: 'Inbox',
    filter: 'not-a-filter',
  }), 'invalid action view filter must fail');
  assert.equal(
    harness.gmailCalls.length,
    callsBeforeInvalid,
    'invalid view context must fail before the mailbox mutation'
  );
});

test('custom label RPC accepts only existing user labels and returns a bounded inverse operation', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_labels_1';
  const modifyBodies = [];
  const labelSyncCalls = [];
  let currentLabels = ['INBOX', 'Label_work'];
  harness.context.syncTelegramMailCardsForThreadFromGmail_ = (syncedThreadId, messageId) => {
    labelSyncCalls.push({ threadId: syncedThreadId, messageId });
    return { attempted: 1, completed: 1, failed: 0 };
  };
  harness.setGmail((requestPath, options) => {
    if (requestPath === '/profile') {
      return { emailAddress: 'tarasevych.pavlo@gmail.com', messagesTotal: 10, threadsTotal: 5 };
    }
    if (requestPath === '/labels') {
      return {
        labels: [
          { id: 'Label_work', name: 'Робота', type: 'user' },
          { id: 'Label_finance', name: 'Фінанси', type: 'user' },
          { id: 'INBOX', name: 'INBOX', type: 'system' },
        ],
      };
    }
    if (requestPath === `/threads/${threadId}/modify`) {
      assert.equal(String(options.method || '').toLowerCase(), 'post');
      modifyBodies.push(options.body);
      const additions = new Set(options.body.addLabelIds || []);
      const removals = new Set(options.body.removeLabelIds || []);
      currentLabels = currentLabels.filter(id => !removals.has(id));
      additions.forEach(id => {
        if (!currentLabels.includes(id)) currentLabels.push(id);
      });
      return { id: threadId };
    }
    if (requestPath.startsWith(`/threads/${threadId}?`)) {
      return {
        id: threadId,
        messages: [{
          id: 'message_labels_1',
          threadId,
          internalDate: '1710000000000',
          labelIds: currentLabels.slice(),
          snippet: 'Label test',
          payload: {
            headers: [
              { name: 'From', value: 'Sender <sender@example.com>' },
              { name: 'Subject', value: 'Label test' },
            ],
          },
        }],
      };
    }
    if (requestPath === '/messages/message_labels_1/modify') {
      assert.equal(String(options.method || '').toLowerCase(), 'post');
      modifyBodies.push(options.body);
      const additions = new Set(options.body.addLabelIds || []);
      const removals = new Set(options.body.removeLabelIds || []);
      currentLabels = currentLabels.filter(id => !removals.has(id));
      additions.forEach(id => {
        if (!currentLabels.includes(id)) currentLabels.push(id);
      });
      return { id: 'message_labels_1' };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const bootstrap = resultData(rpc(harness, token, 'bootstrap', {}));
  assert.equal(bootstrap.capabilities.labels.modifyUserLabels, true);
  assert.equal(bootstrap.capabilities.labels.systemLabels, false);
  assert.equal(bootstrap.capabilities.labels.maxChanges, 50);

  const changed = resultData(rpc(harness, token, 'label', {
    threadId,
    addLabelIds: ['Label_finance', 'Label_finance'],
    removeLabelIds: ['Label_work'],
  }), 'existing user labels should be modified');
  assert.equal(modifyBodies.length, 1);
  assert.deepEqual(Array.from(modifyBodies[0].addLabelIds), ['Label_finance']);
  assert.deepEqual(Array.from(modifyBodies[0].removeLabelIds), ['Label_work']);
  assert.deepEqual(Array.from(changed.thread.labelIds), ['INBOX', 'Label_finance']);
  assert.equal(changed.undo.op, 'action');
  assert.equal(changed.undo.threadId, threadId);
  assert.equal(changed.undo.action, 'restoreState');
  assert.match(changed.undo.undoToken, /^mbu1\./);
  assert.deepEqual(labelSyncCalls, [{ threadId, messageId: '' }]);

  resultData(rpc(harness, token, changed.undo.op, {
    threadId: changed.undo.threadId,
    action: changed.undo.action,
    undoToken: changed.undo.undoToken,
  }), 'exact-state label operation should be executable');
  assert.equal(modifyBodies.length, 2);
  assert.deepEqual(Array.from(modifyBodies[1].addLabelIds), ['Label_work']);
  assert.deepEqual(Array.from(modifyBodies[1].removeLabelIds), ['Label_finance']);
  assert.deepEqual(labelSyncCalls, [
    { threadId, messageId: '' },
    { threadId, messageId: '' },
  ]);

  const writesBeforeSystem = modifyBodies.length;
  resultFailed(rpc(harness, token, 'label', {
    threadId,
    addLabelIds: ['INBOX'],
    removeLabelIds: [],
  }), 'system label IDs must be rejected');
  resultFailed(rpc(harness, token, 'label', {
    threadId,
    addLabelIds: ['Label_unknown'],
    removeLabelIds: [],
  }), 'unknown user label IDs must be rejected');
  assert.equal(modifyBodies.length, writesBeforeSystem, 'rejected labels must never reach threads.modify');

  const callsBeforeOverlap = harness.gmailCalls.length;
  resultFailed(rpc(harness, token, 'label', {
    threadId,
    addLabelIds: ['Label_work'],
    removeLabelIds: ['Label_work'],
  }), 'the same label cannot be added and removed in one request');
  assert.equal(harness.gmailCalls.length, callsBeforeOverlap, 'conflicting labels must fail before Gmail');

  const callsBeforeOverflow = harness.gmailCalls.length;
  resultFailed(rpc(harness, token, 'label', {
    threadId,
    addLabelIds: Array.from({ length: 51 }, (_, index) => `Label_${index}`),
    removeLabelIds: [],
  }), 'label count must be bounded');
  assert.equal(harness.gmailCalls.length, callsBeforeOverflow, 'oversized label lists must fail before Gmail');
});

test('bootstrap exposes only eligible Gmail send-as identities and falls back to the proven primary account', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    if (requestPath === '/profile') {
      return {
        emailAddress: 'tarasevych.pavlo@gmail.com',
        messagesTotal: 12,
        threadsTotal: 8,
        historyId: 'history_send_as_1',
      };
    }
    if (requestPath === '/settings/sendAs') {
      return {
        sendAs: [
          {
            sendAsEmail: 'tarasevych.pavlo@gmail.com',
            displayName: 'Pavlo',
            isPrimary: true,
            isDefault: true,
            verificationStatus: 'accepted',
          },
          {
            sendAsEmail: 'default.pending@example.com',
            displayName: 'Gmail default',
            isDefault: true,
            verificationStatus: 'pending',
          },
          {
            sendAsEmail: 'accepted.alias@example.com',
            displayName: 'Accepted alias',
            verificationStatus: 'accepted',
          },
          {
            sendAsEmail: 'pending.alias@example.com',
            displayName: 'Pending alias',
            verificationStatus: 'pending',
          },
          {
            sendAsEmail: 'forged@example.com\r\nBcc: attacker@example.com',
            isPrimary: true,
            verificationStatus: 'accepted',
          },
        ],
      };
    }
    if (requestPath === '/labels') return { labels: [] };
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const bootstrap = resultData(rpc(harness, token, 'bootstrap', {}));
  const emails = Array.from(bootstrap.sendAs, alias => alias.sendAsEmail).sort();
  assert.deepEqual(emails, [
    'accepted.alias@example.com',
    'default.pending@example.com',
    'tarasevych.pavlo@gmail.com',
  ]);
  assert.ok(bootstrap.sendAs.every(alias =>
    alias.isPrimary || alias.isDefault || alias.verificationStatus === 'accepted'
  ));
  assert.doesNotMatch(JSON.stringify(bootstrap.sendAs), /pending\.alias|attacker|Bcc/i);

  const fallbackHarness = makeContext();
  const fallbackToken = openOwnerSession(fallbackHarness);
  fallbackHarness.setGmail(requestPath => {
    if (requestPath === '/profile') {
      return {
        emailAddress: 'tarasevych.pavlo@gmail.com',
        messagesTotal: 1,
        threadsTotal: 1,
        historyId: 'history_send_as_fallback',
      };
    }
    if (requestPath === '/settings/sendAs') throw new Error('scope unavailable');
    if (requestPath === '/labels') return { labels: [] };
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const fallback = resultData(rpc(fallbackHarness, fallbackToken, 'bootstrap', {}));
  assert.deepEqual(
    JSON.parse(JSON.stringify(fallback.sendAs)),
    [{
      sendAsEmail: 'tarasevych.pavlo@gmail.com',
      displayName: '',
      isPrimary: true,
      isDefault: true,
      verificationStatus: 'accepted',
    }]
  );
});

test('rich drafts sanitize HTML, nest alternative MIME with attachments, and revalidate cold-cache From aliases', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const draftWrites = [];
  let settingsCalls = 0;
  let richMessageId = '';
  harness.setGmail((requestPath, options) => {
    if (requestPath === '/settings/sendAs') {
      settingsCalls += 1;
      return {
        sendAs: [
          {
            sendAsEmail: 'tarasevych.pavlo@gmail.com',
            displayName: 'Pavlo',
            isPrimary: true,
            isDefault: true,
            verificationStatus: 'accepted',
          },
          {
            sendAsEmail: 'trusted.alias@example.com',
            displayName: 'Trusted Alias',
            verificationStatus: 'accepted',
          },
          {
            sendAsEmail: 'pending.alias@example.com',
            displayName: 'Pending Alias',
            verificationStatus: 'pending',
          },
        ],
      };
    }
    if (requestPath === '/drafts' && String(options.method).toLowerCase() === 'post') {
      draftWrites.push(options.body);
      richMessageId = draftOperationMessageId(options.body);
      return {
        id: 'draft_rich_1',
        message: { id: 'message_rich_1', threadId: 'thread_rich_1' },
      };
    }
    if (requestPath === '/drafts/draft_rich_1?format=full') {
      return {
        id: 'draft_rich_1',
        message: {
          id: 'message_rich_1',
          threadId: 'thread_rich_1',
          internalDate: '1710000000000',
          labelIds: ['DRAFT'],
          payload: {
            headers: [
              { name: 'Message-ID', value: richMessageId },
              { name: 'From', value: 'Trusted Alias <trusted.alias@example.com>' },
              { name: 'To', value: 'recipient@example.com' },
              { name: 'Subject', value: 'Rich draft' },
            ],
            parts: [],
          },
        },
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const attachmentBytes = Buffer.from('rich attachment', 'utf8');
  const richRpcResult = rpc(harness, token, 'saveDraft', {
    from: 'trusted.alias@example.com',
    to: 'recipient@example.com',
    subject: 'Rich draft',
    bodyText: '',
    bodyHtml: '<p class="x" style="color:#d32f2f;background-color:#ffffff;font-family:Arial;font-size:16px;text-align:center" onclick="steal()">Hello <strong>World</strong>' +
      '<script>alert(1)</script><a href="javascript:alert(2)">bad</a>' +
      '<a data-secret="x" href="https://safe.example/path?x=1&amp;y=2">safe</a>' +
      '<img src="https://tracker.example/pixel"></p>',
    attachments: [{
      name: 'rich.txt',
      mimeType: 'text/plain',
      dataBase64: attachmentBytes.toString('base64'),
    }],
  });
  const saved = resultData(richRpcResult, 'a verified alias should work even when the send-as cache starts cold');
  assert.equal(saved.draftId, 'draft_rich_1');
  assert.equal(settingsCalls, 1, 'a non-primary cold-cache From must be revalidated against Gmail');
  assert.equal(draftWrites.length, 1);

  const raw = decodeBase64Url(draftWrites[0].message.raw);
  assert.match(raw, /^From: "Trusted Alias" <trusted\.alias@example\.com>\r?$/m);
  assert.match(raw, /Content-Type: multipart\/mixed; boundary="[^"]+"/i);
  assert.match(raw, /Content-Type: multipart\/alternative; boundary="[^"]+"/i);
  assert.match(raw, /Content-Type: text\/plain; charset=UTF-8/i);
  assert.match(raw, /Content-Type: text\/html; charset=UTF-8/i);
  assert.match(raw, /Hello\s+World\s*bad\s*safe/i, 'plain fallback should be derived from sanitized HTML');
  assert.match(raw, /<p style="background-color:#ffffff;color:#d32f2f;font-family:Arial;font-size:16px;text-align:center">Hello <strong>World<\/strong><a>bad<\/a>/i);
  assert.match(raw, /href="https:\/\/safe\.example\/path\?x=1&amp;y=2" target="_blank" rel="noopener noreferrer"/i);
  assert.doesNotMatch(raw, /<script|<img|onclick|javascript:|data-secret|tracker\.example/i);
  assert.ok(raw.includes(attachmentBytes.toString('base64')));

  const rejectedWrites = draftWrites.length;
  const rejectedPending = resultFailed(rpc(harness, token, 'saveDraft', {
    from: 'pending.alias@example.com',
    to: 'recipient@example.com',
    subject: 'Rejected alias',
    bodyText: 'No write',
    attachments: [],
  }));
  assert.equal(rejectedPending.code, 'INVALID_FROM');
  const rejectedForged = resultFailed(rpc(harness, token, 'saveDraft', {
    from: 'forged.alias@example.com',
    to: 'recipient@example.com',
    subject: 'Rejected alias',
    bodyText: 'No write',
    attachments: [],
  }));
  assert.equal(rejectedForged.code, 'INVALID_FROM');
  const rejectedInjection = resultFailed(rpc(harness, token, 'saveDraft', {
    from: 'trusted.alias@example.com\r\nBcc: attacker@example.com',
    to: 'recipient@example.com',
    subject: 'Rejected injection',
    bodyText: 'No write',
    attachments: [],
  }));
  assert.equal(rejectedInjection.code, 'INVALID_HEADER');
  const rejectedDisplayHeader = resultFailed(rpc(harness, token, 'saveDraft', {
    from: 'Trusted Alias <trusted.alias@example.com>',
    to: 'recipient@example.com',
    subject: 'Rejected display header',
    bodyText: 'No write',
    attachments: [],
  }));
  assert.equal(rejectedDisplayHeader.code, 'INVALID_FROM');
  assert.equal(draftWrites.length, rejectedWrites, 'rejected From values must fail before a Gmail draft write');
});

test('draft MIME rejects header injection and preserves reply threading with base64url encoding', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const draftBodies = [];
  let replyOperationMessageId = '';
  harness.setGmail((requestPath, options) => {
    if (requestPath.startsWith('/messages/reply_message_1?')) {
      return {
        id: 'reply_message_1',
        threadId: 'thread_reply_1',
        payload: {
          headers: [
            { name: 'Message-ID', value: '<original-message@example.com>' },
            { name: 'References', value: '<older-message@example.com>' },
            { name: 'Subject', value: 'Topic' },
            { name: 'Reply-To', value: 'sender@example.com' },
            { name: 'From', value: 'Sender <sender@example.com>' },
          ],
        },
      };
    }
    if (requestPath === '/drafts') {
      draftBodies.push(options.body);
      replyOperationMessageId = draftOperationMessageId(options.body);
      return { id: 'draft_1', message: { id: 'draft_message_1', threadId: 'thread_reply_1' } };
    }
    if (requestPath === '/drafts/draft_1?format=full') {
      return {
        id: 'draft_1',
        message: {
          id: 'draft_message_1',
          threadId: 'thread_reply_1',
          internalDate: '1710000000000',
          labelIds: ['DRAFT'],
          payload: {
            headers: [
              { name: 'Message-ID', value: replyOperationMessageId },
              { name: 'To', value: 'sender@example.com' },
              { name: 'Subject', value: 'Re: Topic' },
            ],
          },
        },
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const injection = rpc(harness, token, 'saveDraft', {
    to: 'victim@example.com\r\nBcc: attacker@example.com',
    subject: 'Safe subject\r\nX-Injected: yes',
    bodyText: 'Hello',
  });
  if (injection && injection.ok === true) {
    const injectedRaw = decodeBase64Url(draftBodies.at(-1).message.raw);
    assert.doesNotMatch(injectedRaw, /Bcc:\s*attacker@example\.com|X-Injected:\s*yes/i);
  } else {
    resultFailed(injection, 'CRLF header injection must be rejected');
    assert.equal(draftBodies.length, 0, 'rejected compose data must not create a draft');
  }

  const saved = resultData(rpc(harness, token, 'saveDraft', {
    threadId: 'thread_reply_1',
    replyMessageId: 'reply_message_1',
    to: 'sender@example.com',
    subject: 'Re: Topic',
    bodyText: 'Thank you.\n\nPavlo',
  }), 'reply draft should be created');
  assert.equal(saved.draftId || saved.id, 'draft_1');
  const body = draftBodies.at(-1);
  assert.equal(body.message.threadId, 'thread_reply_1', 'draft must stay in the requested Gmail thread');
  const raw = decodeBase64Url(body.message.raw);
  assert.match(raw, /(?:^|\r?\n)To:\s*sender@example\.com(?:\r?\n)/i);
  assert.match(raw, /(?:^|\r?\n)Subject:\s*Re: Topic(?:\r?\n)/i);
  assert.match(raw, /(?:^|\r?\n)In-Reply-To:\s*<original-message@example\.com>(?:\r?\n)/i);
  assert.match(
    raw,
    /(?:^|\r?\n)References:\s*<older-message@example\.com>\s+<original-message@example\.com>(?:\r?\n)/i
  );
  assert.match(raw, /Thank you\.\r?\n\r?\nPavlo/);
});

test('attachment RPC proves thread/message ownership and returns only bounded base64url data', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_attachment_1';
  const messageId = 'message_attachment_1';
  const attachmentId = 'attachment_opaque_listed_1';
  const currentAttachmentId = 'attachment_opaque_current_1';
  const attachmentBytes = Buffer.from([0, 1, 2, 250, 251, 252, 253, 254, 255]);
  const attachmentData = attachmentBytes.toString('base64url');
  const message = {
    id: messageId,
    threadId,
    internalDate: '1710000000000',
    labelIds: ['INBOX'],
    snippet: 'Attached report',
    payload: {
      mimeType: 'multipart/mixed',
      headers: [
        { name: 'From', value: 'Sender <sender@example.com>' },
        { name: 'To', value: 'tarasevych.pavlo@gmail.com' },
        { name: 'Subject', value: 'Attachment test' },
      ],
      parts: [
        {
          partId: '0',
          mimeType: 'text/plain',
          body: { data: Buffer.from('Attached report').toString('base64url'), size: 15 },
        },
        {
          partId: '1',
          mimeType: 'application/pdf',
          filename: 'report.pdf',
          headers: [{ name: 'Content-Disposition', value: 'attachment; filename="report.pdf"' }],
          body: { attachmentId, size: attachmentBytes.length },
        },
      ],
    },
  };
  const currentMessage = JSON.parse(JSON.stringify(message));
  currentMessage.payload.parts[1].body.attachmentId = currentAttachmentId;
  let dataFetches = 0;
  harness.setGmail(requestPath => {
    if (requestPath === `/threads/${threadId}?format=full`) {
      return { id: threadId, messages: [message] };
    }
    if (requestPath === `/messages/${messageId}?format=full`) return currentMessage;
    if (requestPath === `/messages/${messageId}/attachments/${currentAttachmentId}`) {
      dataFetches += 1;
      return { size: attachmentBytes.length, data: attachmentData };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const thread = resultData(rpc(harness, token, 'thread', { threadId }));
  const dto = thread.messages[0].attachments[0];
  assert.equal(dto.attachmentId, attachmentId, 'thread DTO must expose the opaque attachment id');
  assert.equal(dto.partId, '1', 'thread DTO must expose the stable MIME part id');
  assert.equal(dto.downloadable, true);
  assert.equal(dto.size, attachmentBytes.length);
  assert.equal(dto.dataBase64Url, undefined, 'thread DTO must never include attachment bytes');
  assert.equal(dto.data, undefined, 'thread DTO must never include the Gmail body data');

  const downloaded = resultData(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: dto.partId,
  }));
  assert.equal(downloaded.threadId, threadId);
  assert.equal(downloaded.messageId, messageId);
  assert.equal(downloaded.attachmentId, currentAttachmentId, 'download must return the current Gmail attachment id');
  assert.equal(downloaded.encoding, 'base64url');
  assert.equal(downloaded.dataBase64Url, attachmentData);
  assert.deepEqual(Buffer.from(downloaded.dataBase64Url, 'base64url'), attachmentBytes);
  assert.equal(dataFetches, 1);
  assert.equal(
    harness.gmailCalls.some(call => String(call.requestPath || '').includes('/attachments/' + attachmentId)),
    false,
    'the stale listed attachment id must never be used for the attachment endpoint'
  );

  const guardedDownload = resultData(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: dto.partId,
    attachmentId: currentAttachmentId,
  }), 'the current attachment id may be supplied as an additional guard');
  assert.equal(guardedDownload.attachmentId, currentAttachmentId);
  assert.equal(guardedDownload.dataBase64Url, attachmentData);
  assert.equal(dataFetches, 2, 'the guarded request should fetch the attachment exactly once');

  resultFailed(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: dto.partId,
    attachmentId,
  }), 'a stale attachment id guard must not silently select the current part');
  assert.equal(dataFetches, 2, 'a mismatched attachment guard must fail before attachment bytes are fetched');

  const callsBeforeMissingPartId = harness.gmailCalls.length;
  resultFailed(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    attachmentId: currentAttachmentId,
  }), 'attachment RPC must require the stable MIME part id');
  assert.equal(harness.gmailCalls.length, callsBeforeMissingPartId, 'missing part id must fail before Gmail');

  resultFailed(rpc(harness, token, 'attachment', {
    threadId: 'different_thread',
    messageId,
    partId: dto.partId,
    attachmentId,
  }), 'cross-thread attachment access must be rejected');
  assert.equal(dataFetches, 2, 'cross-thread request must fail before attachment bytes are fetched');

  resultFailed(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: '9',
    attachmentId,
  }), 'unknown MIME part id must not fall back to a stale attachment id');
  assert.equal(dataFetches, 2, 'unknown MIME part id must not reach the attachment endpoint');

  resultFailed(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: '0',
    attachmentId,
  }), 'a text body part must not be treated as a downloadable attachment');
  assert.equal(dataFetches, 2, 'a text body part must not reach the attachment endpoint');

  resultFailed(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: dto.partId,
    attachmentId: 'unknown_attachment',
  }), 'an incorrect attachment id guard must be rejected');
  assert.equal(dataFetches, 2, 'unknown attachment id must not reach the attachment endpoint');

  const callsBeforeInvalidId = harness.gmailCalls.length;
  resultFailed(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: dto.partId,
    attachmentId: '../attachment_opaque_1',
  }), 'attachment id path injection must be rejected');
  assert.equal(harness.gmailCalls.length, callsBeforeInvalidId, 'invalid attachment id must fail before Gmail');

  const callsBeforeInvalidPartId = harness.gmailCalls.length;
  resultFailed(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: '../1',
    attachmentId,
  }), 'malformed part id must not fall back to the legacy attachment id path');
  assert.equal(harness.gmailCalls.length, callsBeforeInvalidPartId, 'invalid part id must fail before Gmail');

  currentMessage.payload.parts[1].body.size = 16 * 1024 * 1024;
  resultFailed(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: dto.partId,
    attachmentId,
  }), 'oversized incoming attachment must require the Gmail fallback');
  assert.equal(dataFetches, 2, 'declared oversized attachment must fail before bytes are fetched');
});

test('small inline-body Gmail attachments download by stable part id without exposing bytes in DTOs', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_embedded_attachment_1';
  const messageId = 'message_embedded_attachment_1';
  const attachmentBytes = Buffer.from('small attachment stored directly in Gmail body.data', 'utf8');
  const attachmentData = attachmentBytes.toString('base64url');
  const message = {
    id: messageId,
    threadId,
    internalDate: '1710000000000',
    labelIds: ['INBOX'],
    snippet: 'Small attachment',
    payload: {
      mimeType: 'multipart/mixed',
      headers: [
        { name: 'From', value: 'Sender <sender@example.com>' },
        { name: 'To', value: 'tarasevych.pavlo@gmail.com' },
        { name: 'Subject', value: 'Embedded attachment test' },
      ],
      parts: [
        {
          partId: '0',
          mimeType: 'text/plain',
          body: { data: Buffer.from('See attachment').toString('base64url'), size: 14 },
        },
        {
          partId: '2',
          mimeType: 'text/plain',
          filename: 'small-note.txt',
          headers: [{ name: 'Content-Disposition', value: 'attachment; filename="small-note.txt"' }],
          body: { data: attachmentData, size: attachmentBytes.length },
        },
      ],
    },
  };
  let attachmentEndpointCalls = 0;
  harness.setGmail(requestPath => {
    if (requestPath === `/threads/${threadId}?format=full`) {
      return { id: threadId, messages: [message] };
    }
    if (requestPath === `/messages/${messageId}?format=full`) return message;
    if (requestPath.includes('/attachments/')) {
      attachmentEndpointCalls += 1;
      throw new Error('Embedded body.data must not call the Gmail attachments endpoint');
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const thread = resultData(rpc(harness, token, 'thread', { threadId }));
  const dto = thread.messages[0].attachments[0];
  assert.equal(dto.partId, '2');
  assert.equal(dto.attachmentId, '');
  assert.equal(dto.downloadable, true, 'body.data attachments must be downloadable by stable part id');
  assert.equal(dto.size, attachmentBytes.length);
  assert.equal(dto.data, undefined);
  assert.equal(dto.dataBase64, undefined);
  assert.equal(dto.dataBase64Url, undefined);
  assert.doesNotMatch(JSON.stringify(dto), new RegExp(attachmentData));

  const downloaded = resultData(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: dto.partId,
  }));
  assert.equal(downloaded.attachmentId, '');
  assert.equal(downloaded.dataBase64Url, attachmentData);
  assert.equal(downloaded.encoding, 'base64url');
  assert.deepEqual(Buffer.from(downloaded.dataBase64Url, 'base64url'), attachmentBytes);
  assert.equal(attachmentEndpointCalls, 0, 'body.data must be decoded without an attachments endpoint call');

  resultFailed(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: '9',
  }), 'an unknown stable MIME part id must be rejected');
  resultFailed(rpc(harness, token, 'attachment', {
    threadId,
    messageId,
    partId: dto.partId,
    attachmentId: 'unexpected_attachment_guard',
  }), 'body.data attachments must reject a non-empty attachment id guard');
  assert.equal(attachmentEndpointCalls, 0);
});

test('draft and explicit send support strictly validated multipart attachments without caching bytes', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const writes = [];
  const savedDrafts = new Map();
  harness.setGmail((requestPath, options) => {
    if (requestPath === '/drafts') {
      writes.push({ requestPath, body: options.body });
      const index = savedDrafts.size + 1;
      const id = `draft_attachment_${index}`;
      const message = {
        id: `draft_message_${index}`,
        threadId: `thread_draft_${index}`,
        internalDate: '1710000000000',
        labelIds: ['DRAFT'],
        payload: {
          headers: [{ name: 'Message-ID', value: draftOperationMessageId(options.body) }],
          parts: [],
        },
      };
      savedDrafts.set(id, { id, message });
      return { id, message: { id: message.id, threadId: message.threadId } };
    }
    const fullDraft = requestPath.match(/^\/drafts\/([^?]+)\?format=full$/);
    if (fullDraft && savedDrafts.has(fullDraft[1])) {
      return savedDrafts.get(fullDraft[1]);
    }
    if (requestPath === '/drafts/send') {
      writes.push({ requestPath, body: options.body });
      return { id: 'sent_attachment_1', threadId: 'thread_sent_1', labelIds: ['SENT'] };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const pdfBytes = Buffer.from('%PDF-1.7\nattachment-test\n', 'utf8');
  const standardBase64 = pdfBytes.toString('base64');
  resultData(rpc(harness, token, 'saveDraft', {
    to: 'recipient@example.com',
    subject: 'Звіт',
    bodyText: 'Додаю звіт.',
    attachments: [{
      name: 'звіт.pdf',
      mimeType: 'application/pdf',
      dataBase64: standardBase64,
    }],
  }), 'draft with an attachment should be created');
  assert.equal(writes.length, 1);
  assert.equal(writes[0].requestPath, '/drafts', 'saving must not send the message');
  const draftRaw = decodeBase64Url(writes[0].body.message.raw);
  assert.match(draftRaw, /Content-Type:\s*multipart\/mixed;\s*boundary=/i);
  assert.match(draftRaw, /Content-Disposition:\s*attachment;/i);
  assert.match(draftRaw, /filename\*=UTF-8''%D0%B7%D0%B2%D1%96%D1%82\.pdf/i);
  assert.match(draftRaw, /Content-Transfer-Encoding:\s*base64/i);
  assert.ok(draftRaw.includes(standardBase64), 'MIME body must contain the attachment data');

  const webSafeBytes = Buffer.from('second attachment', 'utf8');
  const secondDraft = resultData(rpc(harness, token, 'saveDraft', {
    to: 'recipient@example.com',
    subject: 'Explicit send',
    bodyText: 'This operation was explicitly requested.',
    attachments: [{
      name: 'note.txt',
      mimeType: 'text/plain',
      dataBase64Url: webSafeBytes.toString('base64url'),
    }],
  }), 'attachment must be persisted as a draft before send');
  assert.equal(writes.length, 2);
  assert.equal(writes[1].requestPath, '/drafts');
  const sentRaw = decodeBase64Url(writes[1].body.message.raw);
  assert.ok(sentRaw.includes(webSafeBytes.toString('base64')));

  resultData(rpc(harness, token, 'sendDraft', {
    draftId: secondDraft.draftId,
  }), 'explicit send must consume the already-saved draft');
  assert.equal(writes.length, 3);
  assert.equal(writes[2].requestPath, '/drafts/send');
  assert.deepEqual(JSON.parse(JSON.stringify(writes[2].body)), { id: secondDraft.draftId });
  assert.equal(
    writes.some(write => write.requestPath === '/messages/send'),
    false,
    'direct messages.send must never be used'
  );

  const callsBeforeInvalid = harness.gmailCalls.length;
  resultFailed(rpc(harness, token, 'saveDraft', {
    to: 'recipient@example.com',
    subject: 'Invalid data URL',
    bodyText: '',
    attachments: [{
      name: 'bad.txt',
      mimeType: 'text/plain',
      dataBase64: 'data:text/plain;base64,SGVsbG8=',
    }],
  }), 'data URLs must be rejected; only raw base64 is accepted');
  assert.equal(harness.gmailCalls.length, callsBeforeInvalid, 'invalid bytes must fail before a Gmail write');

  resultFailed(rpc(harness, token, 'saveDraft', {
    to: 'recipient@example.com',
    subject: 'Too many files',
    bodyText: '',
    attachments: Array.from({ length: 21 }, (_, index) => ({
      name: `file-${index}.txt`,
      mimeType: 'text/plain',
      dataBase64: '',
    })),
  }), 'attachment count must be bounded');

  for (const cached of harness.cacheValues.values()) {
    assert.equal(
      String(cached).includes(standardBase64),
      false,
      'raw attachment bytes must not be persisted in CacheService'
    );
  }
});

test('inline compose images use server CIDs and related MIME inside alternative while mixed stays attachment-only', () => {
  const harness = makeContext();
  const { context } = harness;
  const pngBytes = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0]);
  const regularBytes = Buffer.from('regular attachment', 'utf8');
  const payload = {
    to: 'recipient@example.com',
    subject: 'Inline image',
    bodyText: 'Before image after image',
    bodyHtml: '<p>Before <img src="inline:hero_1" alt="Hero" width="320"> after</p>',
    inlineAttachments: [{
      token: 'hero_1',
      name: 'hero.png',
      mimeType: 'image/png',
      dataBase64: pngBytes.toString('base64'),
    }],
    attachments: [{
      name: 'note.txt',
      mimeType: 'text/plain',
      dataBase64: regularBytes.toString('base64'),
    }],
  };

  const compose = context.mailboxNormalizeCompose_(payload, false);
  compose.bodyHtml = context.mailboxFinalizeComposeHtml_(
    compose.bodyHtmlSource,
    compose.inlineAttachments
  );
  const raw = decodeBase64Url(context.mailboxBuildMime_(compose));
  const mixedIndex = raw.indexOf('Content-Type: multipart/mixed');
  const alternativeIndex = raw.indexOf('Content-Type: multipart/alternative');
  const relatedIndex = raw.indexOf('Content-Type: multipart/related');
  assert.ok(mixedIndex >= 0 && alternativeIndex > mixedIndex && relatedIndex > alternativeIndex);
  assert.match(raw, /src="cid:inline\.[A-Za-z0-9]+@gmail-telegram\.local"/);
  assert.doesNotMatch(raw, /src="inline:hero_1"/);
  assert.match(raw, /Content-ID:\s*<inline\.[A-Za-z0-9]+@gmail-telegram\.local>/);
  assert.match(raw, /Content-Disposition:\s*inline;[^\r\n]*filename="hero\.png"/i);
  assert.match(raw, /Content-Disposition:\s*attachment;[^\r\n]*filename="note\.txt"/i);
  assert.ok(raw.includes(pngBytes.toString('base64')));
  assert.ok(raw.includes(regularBytes.toString('base64')));

  const inlineOnly = context.mailboxNormalizeCompose_({
    ...payload,
    attachments: [],
  }, false);
  inlineOnly.bodyHtml = context.mailboxFinalizeComposeHtml_(
    inlineOnly.bodyHtmlSource,
    inlineOnly.inlineAttachments
  );
  const inlineOnlyRaw = decodeBase64Url(context.mailboxBuildMime_(inlineOnly));
  assert.match(inlineOnlyRaw, /^Content-Type:\s*multipart\/alternative/m);
  assert.match(inlineOnlyRaw, /Content-Type:\s*multipart\/related/i);
  assert.doesNotMatch(inlineOnlyRaw, /Content-Type:\s*multipart\/mixed/i,
    'inline resources alone must not create a top-level mixed container');
});

test('saveDraft accepts the split inline payload and returns canonical refs without bytes', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const draftId = 'draft_inline_create_1';
  const messageId = 'message_inline_create_1';
  const threadId = 'thread_inline_create_1';
  const pngBytes = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 9, 8, 7, 6]);
  let operationMessageId = '';
  let generatedCid = '';
  let writtenRaw = '';
  harness.setGmail((requestPath, options) => {
    if (requestPath === '/drafts' && String(options.method).toLowerCase() === 'post') {
      writtenRaw = decodeBase64Url(options.body.message.raw);
      operationMessageId = draftOperationMessageId(options.body);
      const match = writtenRaw.match(/Content-ID:\s*<([^>]+)>/i);
      generatedCid = match && match[1] || '';
      return { id: draftId, message: { id: messageId, threadId } };
    }
    if (requestPath === `/drafts/${draftId}?format=full`) {
      const bodyHtml = `<p>Created <img src="cid:${generatedCid}" alt="Created"></p>`;
      return {
        id: draftId,
        message: {
          id: messageId,
          threadId,
          internalDate: '1710000000000',
          labelIds: ['DRAFT'],
          payload: {
            mimeType: 'multipart/alternative',
            headers: [
              { name: 'Message-ID', value: operationMessageId },
              { name: 'From', value: 'tarasevych.pavlo@gmail.com' },
              { name: 'To', value: 'recipient@example.com' },
              { name: 'Subject', value: 'Create inline' },
            ],
            parts: [
              {
                partId: '0', mimeType: 'text/plain',
                body: { data: Buffer.from('Created').toString('base64url'), size: 7 },
              },
              {
                partId: '1', mimeType: 'multipart/related', body: { size: 0 }, parts: [
                  {
                    partId: '1.0', mimeType: 'text/html',
                    body: { data: Buffer.from(bodyHtml).toString('base64url'), size: Buffer.byteLength(bodyHtml) },
                  },
                  {
                    partId: '1.1', mimeType: 'image/png', filename: 'created.png',
                    headers: [
                      { name: 'Content-Disposition', value: 'inline; filename="created.png"' },
                      { name: 'Content-ID', value: `<${generatedCid}>` },
                    ],
                    body: { data: pngBytes.toString('base64url'), size: pngBytes.length },
                  },
                ],
              },
            ],
          },
        },
      };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const saved = resultData(rpc(harness, token, 'saveDraft', {
    to: 'recipient@example.com',
    subject: 'Create inline',
    bodyText: 'Created',
    bodyHtml: '<p>Created <img src="inline:create_token_0001" alt="Created"></p>',
    attachments: [],
    inlineAttachments: [{
      token: 'create_token_0001',
      name: 'created.png',
      mimeType: 'image/png',
      dataBase64: pngBytes.toString('base64'),
    }],
  }));
  assert.match(generatedCid, /^inline\.[A-Za-z0-9]+@gmail-telegram\.local$/);
  assert.match(writtenRaw, /Content-Type:\s*multipart\/related/i);
  assert.equal(saved.draft.attachments.length, 0);
  assert.equal(saved.draft.inlineAttachments.length, 1);
  const reference = saved.draft.inlineAttachments[0];
  assert.equal(reference.existing, true);
  assert.equal(reference.contentId, generatedCid);
  assert.equal(reference.dataBase64, undefined);
  assert.match(saved.draft.bodyHtml, new RegExp(`src="inline:${reference.token}"`));
  assert.doesNotMatch(JSON.stringify(saved), new RegExp(pngBytes.toString('base64url')));
});

test('inline image boundary rejects token spoofing and MIME polyglots while discarding remote sources', () => {
  const { context } = makeContext();
  const pngBytes = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0]);
  const valid = context.mailboxNormalizeOutgoingInlineAttachments_([{
    token: 'safe_token',
    name: 'safe.png',
    mimeType: 'image/png',
    dataBase64: pngBytes.toString('base64'),
  }]);
  assert.equal(valid.length, 1);

  for (const unsafeSource of [
    'https://tracker.example/pixel.png',
    'data:image/png;base64,AAAA',
    'blob:https://example.test/id',
    'javascript:alert(1)',
  ]) {
    const sanitized = context.mailboxFinalizeComposeHtml_(
      `<p>Safe text<img src="${unsafeSource}"></p>`,
      []
    );
    assert.equal(sanitized, '<p>Safe text</p>');
    assert.doesNotMatch(sanitized, /https?:|data:|blob:|javascript:/i);
  }

  assert.throws(() => context.mailboxFinalizeComposeHtml_(
    '<img src="inline:unknown_token">',
    valid
  ), /inline-токен/i);
  assert.throws(() => context.mailboxFinalizeComposeHtml_(
    '<p>No image here</p>',
    valid
  ), /розміщене в тексті/i);
  assert.throws(() => context.mailboxNormalizeOutgoingInlineAttachments_([{
    token: 'wrong_magic',
    name: 'fake.png',
    mimeType: 'image/png',
    dataBase64: Buffer.from('<svg></svg>').toString('base64'),
  }]), /MIME-типу/i);
  assert.throws(() => context.mailboxNormalizeOutgoingInlineAttachments_([{
    token: 'svg_file',
    name: 'vector.svg',
    mimeType: 'image/svg+xml',
    dataBase64: Buffer.from('<svg></svg>').toString('base64'),
  }]), /PNG, JPEG, GIF або WebP/i);
  assert.throws(() => context.mailboxNormalizeOutgoingInlineAttachments_([{
    token: 'client_cid',
    contentId: 'attacker@example.com',
    name: 'safe.png',
    mimeType: 'image/png',
    dataBase64: pngBytes.toString('base64'),
  }]), /Невідомий параметр/i,
  'the browser must never choose a MIME Content-ID');
  assert.throws(() => context.mailboxNormalizeOutgoingInlineAttachments_([
    {
      token: 'duplicate', name: 'one.png', mimeType: 'image/png',
      dataBase64: pngBytes.toString('base64'),
    },
    {
      token: 'duplicate', name: 'two.png', mimeType: 'image/png',
      dataBase64: pngBytes.toString('base64'),
    },
  ]), /не може повторюватися/i);
});

test('existing inline draft resources round-trip through stable refs without exposing bytes', () => {
  const harness = makeContext();
  const { context } = harness;
  const messageId = 'draft_inline_message_1';
  const threadId = 'draft_inline_thread_1';
  const draftId = 'draft_inline_1';
  const originalCid = 'original.logo@example.com';
  const pngBytes = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 1, 2, 3, 4]);
  const html = `<p>Logo <img src="cid:${originalCid}" alt="Brand"></p>`;
  const message = {
    id: messageId,
    threadId,
    internalDate: '1710000000000',
    labelIds: ['DRAFT'],
    payload: {
      mimeType: 'multipart/alternative',
      headers: [
        { name: 'From', value: 'Pavlo <tarasevych.pavlo@gmail.com>' },
        { name: 'To', value: 'recipient@example.com' },
        { name: 'Subject', value: 'Existing inline' },
      ],
      parts: [
        {
          partId: '0',
          mimeType: 'text/plain',
          body: { data: Buffer.from('Logo Brand').toString('base64url'), size: 10 },
        },
        {
          partId: '1',
          mimeType: 'multipart/related',
          body: { size: 0 },
          parts: [
            {
              partId: '1.0',
              mimeType: 'text/html',
              body: { data: Buffer.from(html).toString('base64url'), size: Buffer.byteLength(html) },
            },
            {
              partId: '1.1',
              mimeType: 'image/png',
              filename: 'logo.png',
              headers: [
                { name: 'Content-Disposition', value: 'inline; filename="logo.png"' },
                { name: 'Content-ID', value: `<${originalCid}>` },
              ],
              body: { data: pngBytes.toString('base64url'), size: pngBytes.length },
            },
          ],
        },
      ],
    },
  };

  const editable = context.mailboxEditableDraftDto_(draftId, message);
  assert.equal(editable.attachments.length, 0);
  assert.equal(editable.inlineAttachments.length, 1);
  const reference = editable.inlineAttachments[0];
  assert.equal(reference.messageId, messageId);
  assert.equal(reference.partId, '1.1');
  assert.equal(reference.contentId, originalCid);
  assert.match(reference.token, /^inline_[A-Za-z0-9_-]{32}$/);
  assert.equal(reference.dataBase64, undefined);
  assert.match(editable.bodyHtml, new RegExp(`src="inline:${reference.token}"`));
  assert.doesNotMatch(JSON.stringify(editable), new RegExp(pngBytes.toString('base64url')));

  const resolved = context.mailboxResolveExistingDraftInlineAttachments_(
    { id: draftId, message },
    [{
      messageId: reference.messageId,
      partId: reference.partId,
      attachmentId: reference.attachmentId,
      token: reference.token,
    }]
  );
  assert.equal(resolved.length, 1);
  assert.notEqual(resolved[0].contentId, originalCid, 'every outgoing save must receive a server-generated CID');
  const outgoingHtml = context.mailboxFinalizeComposeHtml_(editable.bodyHtml, resolved);
  const compose = {
    fromHeader: 'tarasevych.pavlo@gmail.com',
    to: ['recipient@example.com'], cc: [], bcc: [],
    subject: 'Existing inline', bodyText: editable.bodyText, bodyHtml: outgoingHtml,
    attachments: [], inlineAttachments: resolved,
    messageIdHeader: '', inReplyTo: '', references: '',
  };
  const raw = decodeBase64Url(context.mailboxBuildMime_(compose));
  assert.match(raw, /^Content-Type:\s*multipart\/alternative/m);
  assert.match(raw, /Content-Type:\s*multipart\/related/i);
  assert.match(raw, new RegExp(`src="cid:${resolved[0].contentId.replace(/\./g, '\\.')}"`));
  assert.match(raw, new RegExp(`Content-ID: <${resolved[0].contentId.replace(/\./g, '\\.')}>`));
  assert.doesNotMatch(raw, /Content-Type:\s*multipart\/mixed/i);

  assert.throws(() => context.mailboxResolveExistingDraftInlineAttachments_(
    { id: draftId, message },
    [{
      messageId: reference.messageId,
      partId: reference.partId,
      attachmentId: reference.attachmentId,
      token: 'tampered_token',
    }]
  ), /змінилося/i);
});

test('forward creates a canonical Gmail draft with every selected non-inline source attachment', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const sourceThreadId = 'thread_forward_source_1';
  const sourceMessageId = 'message_forward_source_1';
  const draftId = 'draft_forward_1';
  const createdThreadId = 'thread_forward_created_1';
  const inlineBytes = Buffer.from('small original attachment', 'utf8');
  const remoteBytes = Buffer.from('%PDF-forwarded-original', 'utf8');
  const hiddenInlineBytes = Buffer.from('tracking pixel', 'utf8');
  const writes = [];
  let forwardOperationMessageId = '';

  const sourceMessage = {
    id: sourceMessageId,
    threadId: sourceThreadId,
    internalDate: '1710000000000',
    labelIds: ['INBOX'],
    payload: {
      mimeType: 'multipart/mixed',
      headers: [
        { name: 'From', value: 'Sender <sender@example.com>' },
        { name: 'To', value: 'tarasevych.pavlo@gmail.com' },
        { name: 'Subject', value: 'Forward originals' },
      ],
      parts: [
        {
          partId: '0',
          mimeType: 'text/plain',
          body: { data: Buffer.from('Original message', 'utf8').toString('base64url'), size: 16 },
        },
        {
          partId: '1',
          mimeType: 'text/plain',
          filename: 'original-note.txt',
          headers: [{ name: 'Content-Disposition', value: 'attachment; filename="original-note.txt"' }],
          body: { data: inlineBytes.toString('base64url'), size: inlineBytes.length },
        },
        {
          partId: '2',
          mimeType: 'application/pdf',
          filename: 'original-report.pdf',
          headers: [{ name: 'Content-Disposition', value: 'attachment; filename="original-report.pdf"' }],
          body: { attachmentId: 'remote_forward_attachment_1', size: remoteBytes.length },
        },
        {
          partId: '3',
          mimeType: 'image/png',
          filename: 'inline-logo.png',
          headers: [
            { name: 'Content-Disposition', value: 'inline; filename="inline-logo.png"' },
            { name: 'Content-ID', value: '<logo@example.com>' },
          ],
          body: { data: hiddenInlineBytes.toString('base64url'), size: hiddenInlineBytes.length },
        },
      ],
    },
  };
  const refreshedMessage = {
    id: 'draft_forward_message_1',
    threadId: createdThreadId,
    internalDate: '1710000001000',
    labelIds: ['DRAFT'],
    payload: {
      mimeType: 'multipart/mixed',
      headers: [
        { name: 'To', value: 'recipient@example.com' },
        { name: 'Subject', value: 'Fwd: Forward originals' },
      ],
      parts: [
        {
          partId: '0',
          mimeType: 'text/plain',
          body: { data: Buffer.from('Forward body', 'utf8').toString('base64url'), size: 12 },
        },
        {
          partId: '1',
          mimeType: 'text/plain',
          filename: 'original-note.txt',
          headers: [{ name: 'Content-Disposition', value: 'attachment; filename="original-note.txt"' }],
          body: { data: inlineBytes.toString('base64url'), size: inlineBytes.length },
        },
        {
          partId: '2',
          mimeType: 'application/pdf',
          filename: 'original-report.pdf',
          headers: [{ name: 'Content-Disposition', value: 'attachment; filename="original-report.pdf"' }],
          body: { data: remoteBytes.toString('base64url'), size: remoteBytes.length },
        },
      ],
    },
  };

  harness.setGmail((requestPath, options) => {
    if (requestPath === `/messages/${sourceMessageId}?format=full`) return sourceMessage;
    if (requestPath === `/messages/${sourceMessageId}/attachments/remote_forward_attachment_1`) {
      return { data: remoteBytes.toString('base64url'), size: remoteBytes.length };
    }
    if (requestPath === '/drafts' && String(options.method).toLowerCase() === 'post') {
      writes.push(options.body);
      forwardOperationMessageId = draftOperationMessageId(options.body);
      return { id: draftId, message: { id: refreshedMessage.id, threadId: createdThreadId } };
    }
    if (requestPath === `/drafts/${draftId}?format=full`) {
      const message = JSON.parse(JSON.stringify(refreshedMessage));
      message.payload.headers.push({ name: 'Message-ID', value: forwardOperationMessageId });
      return { id: draftId, message };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const sourceDto = harness.context.mailboxMessageDto_(sourceMessage);
  assert.equal(sourceDto.attachmentCount, 2);
  assert.deepEqual(Array.from(sourceDto.attachments, item => item.partId), ['1', '2']);
  assert.equal(sourceDto.attachments[0].forwardable, true);
  assert.equal(sourceDto.inlineAttachments[0].inline, true);
  assert.doesNotMatch(JSON.stringify(sourceDto), new RegExp(inlineBytes.toString('base64url')));

  const saved = resultData(rpc(harness, token, 'saveDraft', {
    to: 'recipient@example.com',
    subject: 'Fwd: Forward originals',
    bodyText: 'Forward body',
    attachments: [],
    forwardSource: {
      threadId: sourceThreadId,
      messageId: sourceMessageId,
      partIds: ['1', '2'],
    },
  }));
  assert.equal(writes.length, 1, 'forwarding must create a draft, not send a message');
  const raw = decodeBase64Url(writes[0].message.raw);
  assert.match(raw, /original-note\.txt/);
  assert.match(raw, /original-report\.pdf/);
  assert.ok(raw.includes(inlineBytes.toString('base64')));
  assert.ok(raw.includes(remoteBytes.toString('base64')));
  assert.doesNotMatch(raw, /inline-logo\.png|tracking pixel/);
  assert.equal(saved.draft.draftId, draftId);
  assert.equal(saved.draft.attachments.length, 2);
  assert.ok(saved.draft.attachments.every(attachment => attachment.existing));
  assert.ok(saved.draft.attachments.every(attachment => attachment.dataBase64 === undefined));
  for (const cached of harness.cacheValues.values()) {
    assert.doesNotMatch(String(cached), new RegExp(remoteBytes.toString('base64')));
  }
});

test('forward source rejects arbitrary, inline, duplicate, oversized, and cross-thread parts before draft write', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const sourceThreadId = 'thread_forward_guard_1';
  const sourceMessageId = 'message_forward_guard_1';
  let sourceMessage;
  let attachmentFetches = 0;
  let draftWrites = 0;

  function makeSource(parts) {
    return {
      id: sourceMessageId,
      threadId: sourceThreadId,
      payload: { mimeType: 'multipart/mixed', headers: [], parts },
    };
  }
  function remotePart(partId, size, attachmentId = `remote_${partId}`) {
    return {
      partId,
      mimeType: 'application/octet-stream',
      filename: `file-${partId}.bin`,
      headers: [{ name: 'Content-Disposition', value: `attachment; filename="file-${partId}.bin"` }],
      body: { attachmentId, size },
    };
  }
  function forwardPayload(overrides = {}) {
    return {
      to: 'recipient@example.com',
      subject: 'Fwd: guarded',
      bodyText: 'Forward body',
      attachments: [],
      forwardSource: {
        threadId: sourceThreadId,
        messageId: sourceMessageId,
        partIds: ['1'],
      },
      ...overrides,
    };
  }
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/messages/${sourceMessageId}?format=full`) return sourceMessage;
    if (requestPath.startsWith(`/messages/${sourceMessageId}/attachments/`)) {
      attachmentFetches += 1;
      return { data: Buffer.from('abc', 'utf8').toString('base64url'), size: 3 };
    }
    if (requestPath === '/drafts' || (requestPath.startsWith('/drafts/') && String(options.method).toLowerCase() === 'put')) {
      draftWrites += 1;
      throw new Error('A rejected forward must never write a draft.');
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  sourceMessage = makeSource([remotePart('1', 3)]);
  resultFailed(rpc(harness, token, 'saveDraft', forwardPayload({
    forwardSource: { threadId: 'different_thread', messageId: sourceMessageId, partIds: ['1'] },
  })), 'cross-thread forward source must be rejected');

  resultFailed(rpc(harness, token, 'saveDraft', forwardPayload({
    forwardSource: { threadId: sourceThreadId, messageId: sourceMessageId, partIds: ['missing'] },
  })), 'unknown MIME parts must be rejected');
  resultFailed(rpc(harness, token, 'saveDraft', forwardPayload({
    forwardSource: { threadId: sourceThreadId, messageId: sourceMessageId, partIds: ['1', '1'] },
  })), 'duplicate MIME parts must be rejected');
  resultFailed(rpc(harness, token, 'saveDraft', forwardPayload({
    forwardSource: { threadId: sourceThreadId, messageId: sourceMessageId, partIds: ['../1'] },
  })), 'path-like part IDs must be rejected');
  resultFailed(rpc(harness, token, 'saveDraft', forwardPayload({
    forwardSource: {
      threadId: sourceThreadId,
      messageId: sourceMessageId,
      partIds: ['1'],
      dataBase64: Buffer.from('attacker bytes').toString('base64'),
    },
  })), 'the client must not inject bytes or metadata into forwardSource');

  sourceMessage = makeSource([{
    ...remotePart('1', 3),
    headers: [
      { name: 'Content-Disposition', value: 'inline; filename="pixel.png"' },
      { name: 'Content-ID', value: '<pixel@example.com>' },
    ],
  }]);
  resultFailed(rpc(harness, token, 'saveDraft', forwardPayload()), 'inline resources must never be forwarded');

  sourceMessage = makeSource([remotePart('1', 11 * 1024 * 1024)]);
  resultFailed(rpc(harness, token, 'saveDraft', forwardPayload()), 'per-file forward limit must be enforced from Gmail metadata');

  sourceMessage = makeSource([remotePart('1', 8 * 1024 * 1024), remotePart('2', 8 * 1024 * 1024)]);
  resultFailed(rpc(harness, token, 'saveDraft', forwardPayload({
    forwardSource: { threadId: sourceThreadId, messageId: sourceMessageId, partIds: ['1', '2'] },
  })), 'forward source total must be preflighted before attachment bytes');

  sourceMessage = makeSource([remotePart('1', 7 * 1024 * 1024)]);
  assert.throws(
    () => harness.context.mailboxResolveForwardSource_(
      { threadId: sourceThreadId, messageId: sourceMessageId, partIds: ['1'] },
      [{ name: 'local.bin', mimeType: 'application/octet-stream', size: 9 * 1024 * 1024, dataBase64: '' }]
    ),
    /15 МБ/,
    'local and original attachments must share the same total limit'
  );

  const callsBeforeCount = harness.gmailCalls.length;
  resultFailed(rpc(harness, token, 'saveDraft', forwardPayload({
    forwardSource: {
      threadId: sourceThreadId,
      messageId: sourceMessageId,
      partIds: Array.from({ length: 21 }, (_, index) => `p${index}`),
    },
  })), 'forward count must fail before Gmail lookup');
  assert.equal(harness.gmailCalls.length, callsBeforeCount);

  sourceMessage = makeSource([remotePart('1', 4)]);
  const attachmentFetchesBeforeMismatch = attachmentFetches;
  resultFailed(rpc(harness, token, 'saveDraft', forwardPayload()), 'declared and actual Gmail bytes must match');
  assert.equal(attachmentFetches, attachmentFetchesBeforeMismatch + 1);
  assert.equal(draftWrites, 0);
});

test('MailApp forwards only non-inline part references and never original bytes', () => {
  requireUiFile();
  const state = {
    thread: { id: 'thread_ui_forward_1' },
    compose: null,
    limits: {
      maxOutgoingAttachmentBytes: 10 * 1024 * 1024,
      maxOutgoingAttachments: 20,
      maxOutgoingAttachmentsTotalBytes: 15 * 1024 * 1024,
    },
  };
  const sandbox = {
    state,
    Object,
    Number,
    JSON,
    String,
    Boolean,
    Set,
    formatSize: value => `${value} bytes`,
    safeText: (value, fallback = '') => String(value == null || value === '' ? fallback : value),
    safeId: value => /^[A-Za-z0-9_-]+$/.test(String(value || '')) ? String(value) : '',
    safeClientOperationId: value => /^[A-Za-z0-9_-]{16,128}$/.test(String(value || '')) ? String(value) : '',
    els: {
      composeFrom: { value: 'tarasevych.pavlo@gmail.com' },
      composeTo: { value: 'recipient@example.com' },
      composeCc: { value: '' },
      composeBcc: { value: '' },
      composeSubject: { value: 'Fwd: UI' },
      composeBody: { value: 'Forward body' },
    },
    normalizeComposeFrom: value => String(value || 'tarasevych.pavlo@gmail.com'),
    composeEditorText: () => String(sandbox.els.composeBody.value || ''),
    composeEditorHtml: () => '',
    updateComposeDirty: () => false,
    blankCompose: () => ({}),
  };
  const uiContext = vm.createContext(sandbox);
  vm.runInContext([
    extractUiFunction('prepareForwardAttachments'),
    extractUiFunction('syncComposeFromFields'),
    extractUiFunction('composePayload'),
    extractUiFunction('translateRpcRequest'),
  ].join('\n\n'), uiContext);

  const selected = uiContext.prepareForwardAttachments({
    id: 'message_ui_forward_1',
    attachmentCount: 2,
    attachments: [
      { partId: '1', name: 'one.pdf', size: 100, inline: false, dataBase64: 'must-not-leave-ui' },
      { partId: '2', name: 'two.txt', size: 200, inline: false, dataBase64: 'must-not-leave-ui' },
      { partId: '3', name: 'inline.png', size: 10, inline: true, dataBase64: 'inline-bytes' },
    ],
  });
  assert.deepEqual(JSON.parse(JSON.stringify(selected.forwardSource)), {
    threadId: 'thread_ui_forward_1',
    messageId: 'message_ui_forward_1',
  });
  assert.deepEqual(Array.from(selected.attachments, item => item.partId), ['1', '2']);
  assert.ok(selected.attachments.every(item => item.forward && item.dataBase64 === ''));

  state.compose = {
    id: '',
    mode: 'forward',
    threadId: '',
    replyToMessageId: '',
    to: 'recipient@example.com',
    cc: '',
    bcc: '',
    subject: 'Fwd: UI',
    body: 'Forward body',
    forwardSource: selected.forwardSource,
    attachments: selected.attachments.slice(0, 1),
  };
  const clientDraft = uiContext.composePayload();
  assert.deepEqual(JSON.parse(JSON.stringify(clientDraft.forwardSource)), {
    threadId: 'thread_ui_forward_1',
    messageId: 'message_ui_forward_1',
    partIds: ['1'],
  });
  assert.equal(clientDraft.attachments.length, 0, 'original bytes must not be treated as browser uploads');
  const request = uiContext.translateRpcRequest({ op: 'saveDraft', draft: clientDraft });
  assert.deepEqual(JSON.parse(JSON.stringify(request.payload.forwardSource)), {
    threadId: 'thread_ui_forward_1',
    messageId: 'message_ui_forward_1',
    partIds: ['1'],
  });
  assert.doesNotMatch(JSON.stringify(request.payload.forwardSource), /dataBase64|attachmentId|mimeType|name/);

  assert.throws(() => uiContext.prepareForwardAttachments({
    id: 'message_ui_forward_1',
    attachmentCount: 2,
    attachments: [{ partId: '1', name: 'one.pdf', size: 100, inline: false }],
  }), /Gmail/, 'truncated attachment metadata must not silently omit an original file');
  assert.throws(() => uiContext.prepareForwardAttachments({
    id: 'message_ui_forward_1',
    attachmentCount: 1,
    attachments: [{ partId: '1', name: 'huge.bin', size: 11 * 1024 * 1024, inline: false }],
  }), /Gmail/, 'over-limit originals must produce an explicit Gmail fallback');
});

test('existing Gmail drafts expose a bounded editable DTO, preserve referenced attachments, and send by draft ID', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const threadId = 'thread_existing_draft_1';
  const draftId = 'draft_existing_1';
  const attachmentBytes = Buffer.from('existing attachment bytes', 'utf8');
  const attachmentEncoded = attachmentBytes.toString('base64url');
  const writes = [];

  function draftMessage(messageId, bodyText) {
    return {
      id: messageId,
      threadId,
      internalDate: '1710000000000',
      labelIds: ['DRAFT'],
      snippet: bodyText,
      payload: {
        mimeType: 'multipart/mixed',
        headers: [
          { name: 'From', value: 'Pavlo <tarasevych.pavlo@gmail.com>' },
          { name: 'To', value: 'recipient@example.com' },
          { name: 'Cc', value: 'copy@example.com' },
          { name: 'Subject', value: 'Re: Existing draft' },
          { name: 'In-Reply-To', value: '<original@example.com>' },
          { name: 'References', value: '<older@example.com> <original@example.com>' },
        ],
        parts: [
          {
            partId: '0',
            mimeType: 'multipart/alternative',
            body: { size: 0 },
            parts: [
              {
                partId: '0.0',
                mimeType: 'text/plain',
                body: { data: Buffer.from(bodyText, 'utf8').toString('base64url'), size: Buffer.byteLength(bodyText) },
              },
              {
                partId: '0.1',
                mimeType: 'text/html',
                body: {
                  data: Buffer.from(`<p><strong>${bodyText}</strong></p>`, 'utf8').toString('base64url'),
                  size: Buffer.byteLength(`<p><strong>${bodyText}</strong></p>`),
                },
              },
            ],
          },
          {
            partId: '1',
            mimeType: 'text/plain',
            filename: 'existing.txt',
            headers: [{ name: 'Content-Disposition', value: 'attachment; filename="existing.txt"' }],
            body: { data: attachmentEncoded, size: attachmentBytes.length },
          },
        ],
      },
    };
  }

  let currentMessage = draftMessage('draft_message_1', 'Original draft body');
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/threads/${threadId}?format=full`) {
      return { id: threadId, messages: [currentMessage] };
    }
    if (requestPath === '/drafts?maxResults=100') {
      return { drafts: [{ id: draftId, message: { id: currentMessage.id, threadId } }] };
    }
    if (requestPath === `/drafts/${draftId}?format=full`) {
      return { id: draftId, message: currentMessage };
    }
    if (requestPath === `/messages/${currentMessage.id}?format=full`) {
      return currentMessage;
    }
    if (requestPath === `/drafts/${draftId}` && String(options.method).toLowerCase() === 'put') {
      writes.push({ requestPath, body: options.body });
      currentMessage = draftMessage('draft_message_2', 'Edited draft body');
      const savedHtml = '<p style="color:#d32f2f;text-align:right"><strong>Edited draft body</strong></p>';
      currentMessage.payload.parts[0].parts[1].body = {
        data: Buffer.from(savedHtml, 'utf8').toString('base64url'),
        size: Buffer.byteLength(savedHtml),
      };
      currentMessage.payload.headers.push({
        name: 'Message-ID',
        value: draftOperationMessageId(options.body),
      });
      return { id: draftId, message: { id: currentMessage.id, threadId } };
    }
    if (requestPath === '/drafts/send') {
      writes.push({ requestPath, body: options.body });
      return { id: 'sent_existing_1', threadId, labelIds: ['SENT'] };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const thread = resultData(rpc(harness, token, 'thread', { threadId }));
  assert.equal(thread.drafts.length, 1, 'the selected Gmail draft must be mapped to its draft ID');
  const editable = thread.drafts[0];
  assert.equal(editable.draftId, draftId);
  assert.equal(editable.messageId, 'draft_message_1');
  assert.equal(editable.from, 'tarasevych.pavlo@gmail.com');
  assert.equal(editable.to, 'recipient@example.com');
  assert.equal(editable.cc, 'copy@example.com');
  assert.equal(editable.bodyText, 'Original draft body');
  assert.equal(editable.bodyHtml, '<p><strong>Original draft body</strong></p>');
  assert.equal(editable.attachments.length, 1);
  assert.deepEqual(
    JSON.parse(JSON.stringify(editable.attachments[0])),
    {
      messageId: 'draft_message_1',
      partId: '1',
      attachmentId: '',
      name: 'existing.txt',
      mimeType: 'text/plain',
      size: attachmentBytes.length,
      inline: false,
      downloadable: true,
      existing: true,
    }
  );
  assert.equal(editable.attachments[0].dataBase64, undefined, 'draft list DTO must not expose attachment bytes');
  assert.doesNotMatch(JSON.stringify(editable), new RegExp(attachmentEncoded));

  const previewable = resultData(rpc(harness, token, 'attachment', {
    threadId,
    messageId: editable.messageId,
    partId: editable.attachments[0].partId,
    attachmentId: editable.attachments[0].attachmentId,
  }));
  assert.deepEqual(Buffer.from(previewable.dataBase64Url, 'base64url'), attachmentBytes,
    'a small MIME-body draft attachment must remain previewable after canonical readback');

  const refs = editable.attachments.map(attachment => ({
    messageId: attachment.messageId,
    partId: attachment.partId,
    attachmentId: attachment.attachmentId,
  }));
  const callsBeforeBadRef = writes.length;
  resultFailed(rpc(harness, token, 'saveDraft', {
    draftId,
    threadId,
    to: editable.to,
    subject: editable.subject,
    bodyText: 'Must not be written',
    existingAttachments: [{ ...refs[0], messageId: 'different_message' }],
    attachments: [],
  }), 'cross-draft attachment refs must be rejected');
  assert.equal(writes.length, callsBeforeBadRef, 'invalid refs must fail before drafts.update');

  const saved = resultData(rpc(harness, token, 'saveDraft', {
    draftId,
    threadId,
    to: editable.to,
    cc: editable.cc,
    subject: editable.subject,
    bodyText: 'Edited draft body',
    bodyHtml: '<p style="color:#d32f2f;text-align:right"><strong>Edited draft body</strong><script>bad()</script></p>',
    existingAttachments: refs,
    attachments: [],
  }), 'existing draft should update through drafts.update');
  assert.equal(writes.length, 1);
  assert.equal(writes[0].requestPath, `/drafts/${draftId}`);
  const updatedRaw = decodeBase64Url(writes[0].body.message.raw);
  assert.match(updatedRaw, /Edited draft body/);
  assert.match(updatedRaw, /Content-Type: multipart\/alternative/i);
  assert.match(updatedRaw, /<p style="color:#d32f2f;text-align:right"><strong>Edited draft body<\/strong><\/p>/i);
  assert.doesNotMatch(updatedRaw, /<script|bad\(\)/i);
  assert.match(updatedRaw, /In-Reply-To:\s*<original@example\.com>/i);
  assert.match(updatedRaw, /References:\s*<older@example\.com>\s+<original@example\.com>/i);
  assert.ok(updatedRaw.includes(attachmentBytes.toString('base64')), 'existing attachment bytes must be preserved server-side');
  assert.equal(saved.draft.draftId, draftId);
  assert.equal(saved.draft.messageId, 'draft_message_2', 'refreshed DTO must use the replacement draft message ID');
  assert.equal(saved.draft.from, 'tarasevych.pavlo@gmail.com');
  assert.equal(saved.draft.bodyHtml, '<p style="color:#d32f2f;text-align:right"><strong>Edited draft body</strong></p>');
  assert.equal(saved.draft.attachments[0].dataBase64, undefined);

  const sent = resultData(rpc(harness, token, 'sendDraft', { draftId }));
  assert.equal(sent.draftId, draftId);
  assert.equal(writes[1].requestPath, '/drafts/send');
  assert.deepEqual(JSON.parse(JSON.stringify(writes[1].body)), { id: draftId });
});

test('uncertain draft create keeps one POST, survives reconciliation outages, and rejects operation reuse', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const operationId = 'uncertain-create-operation-0001';
  const draftId = 'draft_uncertain_create_1';
  const threadId = 'thread_uncertain_create_1';
  let postCount = 0;
  let searchCount = 0;
  let operationMessageId = '';
  let committedDraft = null;
  harness.setGmail((requestPath, options) => {
    if (requestPath === '/drafts' && String(options.method).toLowerCase() === 'post') {
      postCount += 1;
      const activeRecords = Object.entries(harness.propertyValues)
        .filter(([key]) => key.startsWith('MAILBOX_DRAFT_OPERATION_V1_'))
        .map(([, value]) => JSON.parse(value));
      assert.equal(activeRecords.length, 1);
      assert.equal(activeRecords[0].state, 'dispatching',
        'the durable dispatch boundary must be persisted before Gmail POST');
      operationMessageId = draftOperationMessageId(options.body);
      committedDraft = {
        id: draftId,
        message: {
          id: 'message_uncertain_create_1',
          threadId,
          internalDate: '1710000000000',
          labelIds: ['DRAFT'],
          payload: {
            mimeType: 'text/plain',
            headers: [
              { name: 'Message-ID', value: operationMessageId },
              { name: 'To', value: 'recipient@example.com' },
              { name: 'Subject', value: 'Uncertain create' },
            ],
            body: { data: Buffer.from('Body', 'utf8').toString('base64url'), size: 4 },
          },
        },
      };
      const error = new Error('transport ended after Gmail accepted the draft');
      error.gmailOutcomeUncertain = true;
      throw error;
    }
    if (requestPath.startsWith('/drafts?maxResults=10&q=')) {
      searchCount += 1;
      if (searchCount <= 2) throw new Error('draft search temporarily unavailable');
      return { drafts: [{ id: draftId, message: { id: committedDraft.message.id, threadId } }] };
    }
    if (requestPath === `/drafts/${draftId}?format=full`) return committedDraft;
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const request = {
    clientOperationId: operationId,
    to: 'recipient@example.com',
    subject: 'Uncertain create',
    bodyText: 'Body',
  };
  assert.equal(resultFailed(rpc(harness, token, 'saveDraft', request)).code, 'DRAFT_PENDING');
  assert.equal(resultFailed(rpc(harness, token, 'saveDraft', request)).code, 'DRAFT_PENDING');
  const conflict = resultFailed(rpc(harness, token, 'saveDraft', {
    ...request,
    subject: 'Different request under the same operation',
  }));
  assert.equal(conflict.code, 'OPERATION_CONFLICT');
  const recovered = resultData(rpc(harness, token, 'saveDraft', request));
  assert.equal(recovered.draftId, draftId);
  assert.equal(recovered.draft.draftId, draftId);
  assert.equal(postCount, 1, 'an uncertain draft create must never be POSTed twice');
  assert.equal(searchCount, 3, 'every retry remains read-only until Gmail exposes the draft');
});

test('uncertain draft update preserves authoritative attachment bytes and never repeats PUT', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const draftId = 'draft_uncertain_update_1';
  const threadId = 'thread_uncertain_update_1';
  const oldMessageId = 'message_uncertain_update_old';
  const newMessageId = 'message_uncertain_update_new';
  const attachmentBytes = Buffer.from('authoritative existing attachment', 'utf8');
  const attachmentData = attachmentBytes.toString('base64url');
  let currentDraft = {
    id: draftId,
    message: {
      id: oldMessageId,
      threadId,
      internalDate: '1710000000000',
      labelIds: ['DRAFT'],
      payload: {
        mimeType: 'multipart/mixed',
        headers: [{ name: 'Subject', value: 'Attachment update' }],
        parts: [{
          partId: '1',
          mimeType: 'text/plain',
          filename: 'kept.txt',
          headers: [{ name: 'Content-Disposition', value: 'attachment; filename="kept.txt"' }],
          body: { data: attachmentData, size: attachmentBytes.length },
        }],
      },
    },
  };
  let putCount = 0;
  let failFirstReconciliationRead = false;
  let rawUpdate = '';
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/drafts/${draftId}?format=full`) {
      if (failFirstReconciliationRead) {
        failFirstReconciliationRead = false;
        throw new Error('read after uncertain PUT is temporarily unavailable');
      }
      return currentDraft;
    }
    if (requestPath === `/drafts/${draftId}` && String(options.method).toLowerCase() === 'put') {
      putCount += 1;
      rawUpdate = decodeBase64Url(options.body.message.raw);
      currentDraft = {
        id: draftId,
        message: {
          id: newMessageId,
          threadId,
          internalDate: '1710000001000',
          labelIds: ['DRAFT'],
          payload: {
            mimeType: 'multipart/mixed',
            headers: [
              { name: 'Message-ID', value: draftOperationMessageId(options.body) },
              { name: 'Subject', value: 'Attachment update' },
            ],
            parts: [{
              partId: '1',
              mimeType: 'text/plain',
              filename: 'kept.txt',
              headers: [{ name: 'Content-Disposition', value: 'attachment; filename="kept.txt"' }],
              body: { data: attachmentData, size: attachmentBytes.length },
            }],
          },
        },
      };
      failFirstReconciliationRead = true;
      const error = new Error('transport ended after Gmail replaced the draft');
      error.gmailOutcomeUncertain = true;
      throw error;
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const request = {
    clientOperationId: 'uncertain-update-operation-0001',
    draftId,
    threadId,
    to: 'recipient@example.com',
    subject: 'Attachment update',
    bodyText: 'Updated body',
    attachments: [],
    existingAttachments: [{ messageId: oldMessageId, partId: '1', attachmentId: '' }],
  };
  assert.equal(resultFailed(rpc(harness, token, 'saveDraft', request)).code, 'DRAFT_PENDING');
  const recovered = resultData(rpc(harness, token, 'saveDraft', request));
  assert.equal(recovered.draft.messageId, newMessageId);
  assert.equal(putCount, 1, 'the stale old attachment reference must not trigger a second PUT');
  assert.ok(rawUpdate.includes(attachmentBytes.toString('base64')),
    'the only PUT must contain the server-authoritative original attachment bytes');
});

test('uncertain send stays locked through search lag and reconciles without a second send POST', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const draftId = 'draft_uncertain_send_1';
  const threadId = 'thread_uncertain_send_1';
  const stableMessageId = '<tg.send-reconciliation-0001@gmail-telegram.invalid>';
  const draft = {
    id: draftId,
    message: {
      id: 'message_uncertain_send_draft',
      threadId,
      internalDate: '1710000000000',
      labelIds: ['DRAFT'],
      payload: { headers: [{ name: 'Message-ID', value: stableMessageId }] },
    },
  };
  const sentMessage = {
    id: 'message_uncertain_send_sent',
    threadId,
    historyId: 'history_uncertain_send_1',
    labelIds: ['SENT'],
    payload: { headers: [{ name: 'Message-ID', value: stableMessageId }] },
  };
  let sendPostCount = 0;
  let sentSearchCount = 0;
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/drafts/${draftId}?format=full`) return draft;
    if (requestPath === '/drafts/send') {
      sendPostCount += 1;
      const error = new Error('transport ended after Gmail sent the message');
      error.gmailOutcomeUncertain = true;
      throw error;
    }
    if (requestPath.startsWith('/messages?maxResults=10&includeSpamTrash=true&q=')) {
      sentSearchCount += 1;
      if (sentSearchCount === 1) return { messages: [] };
      if (sentSearchCount === 2) throw new Error('sent search temporarily unavailable');
      return { messages: [{ id: sentMessage.id, threadId }] };
    }
    if (requestPath === `/messages/${sentMessage.id}?format=metadata&metadataHeaders=Message-ID`) {
      return sentMessage;
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const request = {
    draftId,
    clientOperationId: 'uncertain-send-operation-0001',
  };
  assert.equal(resultFailed(rpc(harness, token, 'sendDraft', request)).code, 'SEND_PENDING');
  assert.equal(resultFailed(rpc(harness, token, 'sendDraft', request)).code, 'SEND_PENDING');
  const blocked = resultFailed(rpc(harness, token, 'sendDraft', {
    draftId,
    clientOperationId: 'different-send-operation-0002',
  }));
  assert.equal(blocked.code, 'OPERATION_CONFLICT');
  const recovered = resultData(rpc(harness, token, 'sendDraft', request));
  assert.equal(recovered.message.id, sentMessage.id);
  assert.equal(sendPostCount, 1, 'an uncertain send must never be POSTed twice');
  assert.equal(sentSearchCount, 3);
});

test('committed save retry distinguishes a stripped Message-ID from a later superseding save', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const draftId = 'draft_superseded_1';
  const threadId = 'thread_superseded_1';
  let putCount = 0;
  let current = {
    id: draftId,
    message: {
      id: 'message_superseded_0',
      threadId,
      internalDate: '1710000000000',
      labelIds: ['DRAFT'],
      payload: { headers: [], body: { data: '', size: 0 } },
    },
  };
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/drafts/${draftId}?format=full`) return current;
    if (requestPath === `/drafts/${draftId}` && String(options.method).toLowerCase() === 'put') {
      putCount += 1;
      const bodyText = putCount === 1 ? 'First version' : 'Second version';
      current = {
        id: draftId,
        message: {
          id: `message_superseded_${putCount}`,
          threadId,
          internalDate: String(1710000000000 + putCount),
          labelIds: ['DRAFT'],
          payload: {
            mimeType: 'text/plain',
            headers: [
              { name: 'Message-ID', value: draftOperationMessageId(options.body) },
              { name: 'To', value: 'recipient@example.com' },
              { name: 'Subject', value: 'Superseded save' },
            ],
            body: {
              data: Buffer.from(bodyText, 'utf8').toString('base64url'),
              size: Buffer.byteLength(bodyText),
            },
          },
        },
      };
      return { id: draftId, message: { id: current.message.id, threadId } };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const first = {
    clientOperationId: 'superseded-save-operation-0001',
    draftId,
    to: 'recipient@example.com',
    subject: 'Superseded save',
    bodyText: 'First version',
  };
  resultData(rpc(harness, token, 'saveDraft', first));
  const firstHeader = current.message.payload.headers.find(item => item.name === 'Message-ID').value;
  current.message.payload.headers = current.message.payload.headers.filter(item => item.name !== 'Message-ID');
  assert.equal(
    resultFailed(rpc(harness, token, 'saveDraft', first)).code,
    'DRAFT_PENDING',
    'the same Gmail message without the journal header is not a superseding save'
  );
  current.message.payload.headers.push({ name: 'Message-ID', value: firstHeader });

  const second = {
    clientOperationId: 'superseded-save-operation-0002',
    draftId,
    to: 'recipient@example.com',
    subject: 'Superseded save',
    bodyText: 'Second version',
  };
  resultData(rpc(harness, token, 'saveDraft', second));
  const oldRetry = resultData(rpc(harness, token, 'saveDraft', first));
  assert.equal(oldRetry.superseded, true);
  assert.equal(oldRetry.draft.messageId, 'message_superseded_2');
  assert.equal(putCount, 2, 'retrying an older committed save must not restore its old MIME');
});

test('invalid preflight operations become evictable terminals and cannot exhaust the active journal', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  for (let index = 0; index < 100; index += 1) {
    const failure = resultFailed(rpc(harness, token, 'saveDraft', {
      clientOperationId: `invalid-preflight-${String(index).padStart(4, '0')}-operation`,
      to: 'victim@example.com\r\nBcc: attacker@example.com',
      subject: 'Must fail before Gmail',
      bodyText: 'No write',
    }));
    assert.notEqual(failure.code, 'STORAGE_FULL');
  }
  assert.equal(harness.gmailCalls.length, 0, 'invalid local input must never reach Gmail');
  const records = Object.entries(harness.propertyValues)
    .filter(([key]) => key.startsWith('MAILBOX_DRAFT_OPERATION_V1_'))
    .map(([, value]) => JSON.parse(value));
  assert.ok(records.length <= 80, 'the bounded journal must evict terminal records first');
  assert.ok(records.every(record => record.state === 'failed'),
    'invalid preflight must not leak non-evictable reserved records');
});

test('draft journal recovers a missing index and rejects property/store pressure before Gmail', () => {
  let failOperationWrites = false;
  const failedWriteHarness = makeContext({
    propertySet: key => {
      if (failOperationWrites && key.startsWith('MAILBOX_DRAFT_OPERATION_V1_')) {
        throw new Error('injected property write failure');
      }
    },
  });
  const failedWriteToken = openOwnerSession(failedWriteHarness);
  failOperationWrites = true;
  const failedWrite = resultFailed(rpc(failedWriteHarness, failedWriteToken, 'saveDraft', {
    clientOperationId: 'property-write-failure-operation-0001',
    to: 'recipient@example.com',
    subject: 'No Gmail write',
    bodyText: 'No Gmail write',
  }));
  assert.equal(failedWrite.code, 'STORAGE_FULL');
  assert.equal(failedWriteHarness.gmailCalls.length, 0);

  const pressureHarness = makeContext();
  const pressureToken = openOwnerSession(pressureHarness);
  for (let index = 0; index < 56; index += 1) {
    pressureHarness.propertyValues[`FILLER_${String(index).padStart(2, '0')}`] = 'x'.repeat(8200);
  }
  const pressure = resultFailed(rpc(pressureHarness, pressureToken, 'saveDraft', {
    clientOperationId: 'total-store-pressure-operation-0001',
    to: 'recipient@example.com',
    subject: 'No Gmail write',
    bodyText: 'No Gmail write',
  }));
  assert.equal(pressure.code, 'STORAGE_FULL');
  assert.equal(pressureHarness.gmailCalls.length, 0);

  const recoveryHarness = makeContext();
  const recoveryToken = openOwnerSession(recoveryHarness);
  for (const operationId of ['partial-index-operation-0001', 'partial-index-operation-0002']) {
    if (operationId.endsWith('0002')) {
      recoveryHarness.propertyValues.MAILBOX_DRAFT_OPERATION_INDEX_V1 = '{"v":1,"keys":[]}';
    }
    resultFailed(rpc(recoveryHarness, recoveryToken, 'saveDraft', {
      clientOperationId: operationId,
      to: 'invalid@example.com\r\nBcc: attacker@example.com',
      bodyText: 'No write',
    }));
  }
  const recoveredIndex = JSON.parse(
    recoveryHarness.propertyValues.MAILBOX_DRAFT_OPERATION_INDEX_V1
  );
  assert.equal(recoveredIndex.keys.length, 2,
    'prefix scan must rebuild an interrupted or stale operation index');
  assert.equal(recoveryHarness.gmailCalls.length, 0);
});

test('journal cap retains active and unacknowledged commits, while explicit ack safely frees capacity', () => {
  const activeHarness = makeContext();
  const activeHash = activeHarness.context.mailboxDigestText_('active-cap-request');
  for (let index = 0; index < 80; index += 1) {
    activeHarness.context.mailboxReserveDraftOperation_(
      'draft_create',
      `active-cap-operation-${String(index).padStart(4, '0')}`,
      activeHash,
      {}
    );
  }
  assert.throws(
    () => activeHarness.context.mailboxReserveDraftOperation_(
      'draft_create', 'active-cap-operation-overflow', activeHash, {}
    ),
    error => error && error.mailboxCode === 'STORAGE_FULL'
  );
  const activeRecords = Object.entries(activeHarness.propertyValues)
    .filter(([key]) => key.startsWith('MAILBOX_DRAFT_OPERATION_V1_'))
    .map(([, value]) => JSON.parse(value));
  assert.equal(activeRecords.length, 80);
  assert.ok(activeRecords.every(record => record.state === 'reserved'),
    'active journal entries must never be evicted');

  const committedHarness = makeContext();
  const committedToken = openOwnerSession(committedHarness);
  const committedHash = committedHarness.context.mailboxDigestText_('committed-cap-request');
  const operationIds = [];
  for (let index = 0; index < 80; index += 1) {
    const operationId = `committed-cap-operation-${String(index).padStart(4, '0')}`;
    operationIds.push(operationId);
    const reserved = committedHarness.context.mailboxReserveDraftOperation_(
      'draft_create', operationId, committedHash, {}
    );
    committedHarness.context.mailboxCommitDraftOperation_(reserved, {
      draftId: `draft_cap_${index}`,
      messageId: `message_cap_${index}`,
      threadId: `thread_cap_${index}`,
    });
  }
  const full = resultFailed(rpc(committedHarness, committedToken, 'saveDraft', {
    clientOperationId: 'committed-cap-overflow-operation',
    to: 'recipient@example.com',
    bodyText: 'Must fail closed',
  }));
  assert.equal(full.code, 'STORAGE_FULL',
    'unacknowledged committed operations must not be load-evicted');
  const ack = resultData(rpc(committedHarness, committedToken, 'ackOperation', {
    clientOperationId: operationIds[0],
    kind: 'draft',
  }));
  assert.equal(ack.acknowledged, true);
  const afterAck = resultFailed(rpc(committedHarness, committedToken, 'saveDraft', {
    clientOperationId: 'committed-cap-after-ack-operation',
    to: 'recipient@example.com\r\nBcc: attacker@example.com',
    bodyText: 'Invalid but reservation must fit',
  }));
  assert.notEqual(afterAck.code, 'STORAGE_FULL', 'acknowledgment must safely release one slot');
  assert.equal(committedHarness.gmailCalls.length, 0);
});

test('per-draft mutex blocks concurrent update/update and update/send before Gmail', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const draftId = 'draft_mutex_1';
  const requestHash = harness.context.mailboxDigestText_('first-update-request');
  harness.context.mailboxReserveDraftOperation_(
    'draft_update',
    'draft-mutex-first-operation',
    requestHash,
    { draftId }
  );
  const secondUpdate = resultFailed(rpc(harness, token, 'saveDraft', {
    clientOperationId: 'draft-mutex-second-operation',
    draftId,
    to: 'recipient@example.com',
    bodyText: 'Concurrent update',
  }));
  assert.equal(secondUpdate.code, 'OPERATION_CONFLICT');
  const concurrentSend = resultFailed(rpc(harness, token, 'sendDraft', {
    clientOperationId: 'draft-mutex-send-operation',
    draftId,
  }));
  assert.equal(concurrentSend.code, 'OPERATION_CONFLICT');
  assert.equal(harness.gmailCalls.length, 0);

  const retryHarness = makeContext();
  const retryDraftId = 'draft_mutex_retry_1';
  const retryHash = retryHarness.context.mailboxDigestText_('failed-update-request');
  const failed = retryHarness.context.mailboxReserveDraftOperation_(
    'draft_update', 'draft-mutex-failed-operation', retryHash, { draftId: retryDraftId }
  );
  retryHarness.context.mailboxFailDraftOperation_(
    failed,
    retryHarness.context.mailboxError_('INVALID_DRAFT', 'definitive failure')
  );
  retryHarness.context.mailboxReserveDraftOperation_(
    'draft_update',
    'draft-mutex-current-owner',
    retryHarness.context.mailboxDigestText_('current-owner-request'),
    { draftId: retryDraftId }
  );
  assert.throws(
    () => retryHarness.context.mailboxReserveDraftOperation_(
      'draft_update', 'draft-mutex-failed-operation', retryHash, { draftId: retryDraftId }
    ),
    error => error && error.mailboxCode === 'OPERATION_CONFLICT',
    'a failed operation must not reactivate while another operation owns the draft mutex'
  );
});

test('lost send commit-journal write reconciles from Sent without repeating POST', () => {
  let failCommittedWriteOnce = false;
  const harness = makeContext({
    propertySet: (key, value) => {
      if (failCommittedWriteOnce && key.startsWith('MAILBOX_DRAFT_OPERATION_V1_') &&
          value.includes('"state":"committed"')) {
        failCommittedWriteOnce = false;
        throw new Error('injected commit journal write loss');
      }
    },
  });
  const token = openOwnerSession(harness);
  const draftId = 'draft_send_commit_loss_1';
  const threadId = 'thread_send_commit_loss_1';
  const messageIdHeader = '<tg.send-commit-loss-0001@gmail-telegram.invalid>';
  const sent = {
    id: 'message_send_commit_loss_1',
    threadId,
    historyId: 'history_send_commit_loss_1',
    labelIds: ['SENT'],
    payload: { headers: [{ name: 'Message-ID', value: messageIdHeader }] },
  };
  let postCount = 0;
  let sentVisible = false;
  harness.setGmail((requestPath, options) => {
    if (requestPath === `/drafts/${draftId}?format=full`) {
      return {
        id: draftId,
        message: {
          id: 'draft_message_send_commit_loss_1',
          threadId,
          internalDate: '1710000000000',
          labelIds: ['DRAFT'],
          payload: { headers: [{ name: 'Message-ID', value: messageIdHeader }] },
        },
      };
    }
    if (requestPath === '/drafts/send') {
      postCount += 1;
      sentVisible = true;
      failCommittedWriteOnce = true;
      return sent;
    }
    if (requestPath.startsWith('/messages?maxResults=10&includeSpamTrash=true&q=')) {
      return { messages: sentVisible ? [{ id: sent.id, threadId }] : [] };
    }
    if (requestPath === `/messages/${sent.id}?format=metadata&metadataHeaders=Message-ID`) return sent;
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });

  const request = {
    clientOperationId: 'send-commit-loss-operation-0001',
    draftId,
  };
  assert.equal(resultFailed(rpc(harness, token, 'sendDraft', request)).code, 'SEND_PENDING');
  const recovered = resultData(rpc(harness, token, 'sendDraft', request));
  assert.equal(recovered.message.id, sent.id);
  assert.equal(postCount, 1);
});

test('closing untouched compose presets does not save an empty or synthetic draft', () => {
  requireUiFile();
  const sandbox = {
    JSON,
    String,
    Number,
    Boolean,
    state: { compose: null },
    els: {
      composeFrom: { value: 'tarasevych.pavlo@gmail.com' },
      composeTo: { value: '' },
      composeCc: { value: '' },
      composeBcc: { value: '' },
      composeSubject: { value: '' },
      composeBody: { value: '' },
    },
    normalizeComposeFrom: value => String(value || 'tarasevych.pavlo@gmail.com'),
    composeEditorText: () => String(sandbox.els.composeBody.value || ''),
    composeEditorHtml: () => '',
    composeAttachmentJobs: () => [],
    safeText: (value, fallback = '') => String(value == null || value === '' ? fallback : value),
    safeId: value => /^[A-Za-z0-9_-]+$/.test(String(value || '')) ? String(value) : '',
    saves: 0,
    closes: 0,
  };
  sandbox.saveDraft = () => { sandbox.saves += 1; };
  sandbox.finishCloseCompose = () => { sandbox.closes += 1; };
  const uiContext = vm.createContext(sandbox);
  vm.runInContext([
    'composeFingerprint',
    'setComposeBaseline',
    'updateComposeDirty',
    'composePendingKind',
    'composeLocked',
    'syncComposeFromFields',
    'hasDraftContent',
    'requestCloseCompose',
  ].map(extractUiFunction).join('\n\n'), uiContext);

  const presets = [
    { mode: 'compose', to: '', subject: '', body: '' },
    { mode: 'reply', to: 'sender@example.com', subject: 'Re: Topic', body: '' },
    { mode: 'forward', to: '', subject: 'Fwd: Topic', body: '---------- Forwarded message ----------' },
  ];
  for (const preset of presets) {
    const draft = {
      ...preset,
      cc: '',
      bcc: '',
      attachments: [],
      dirty: false,
      baselineFingerprint: '',
    };
    uiContext.state.compose = uiContext.setComposeBaseline(draft);
    uiContext.els.composeTo.value = draft.to;
    uiContext.els.composeCc.value = draft.cc;
    uiContext.els.composeBcc.value = draft.bcc;
    uiContext.els.composeSubject.value = draft.subject;
    uiContext.els.composeBody.value = draft.body;
    const savesBefore = uiContext.saves;
    const closesBefore = uiContext.closes;
    uiContext.requestCloseCompose();
    assert.equal(uiContext.saves, savesBefore, `${preset.mode} without user edits must not save`);
    assert.equal(uiContext.closes, closesBefore + 1, `${preset.mode} without edits should close immediately`);
    assert.equal(uiContext.state.compose.dirty, false);
  }

  const edited = {
    mode: 'reply',
    to: 'sender@example.com',
    cc: '',
    bcc: '',
    subject: 'Re: Topic',
    body: '',
    attachments: [],
    dirty: false,
    baselineFingerprint: '',
  };
  uiContext.state.compose = uiContext.setComposeBaseline(edited);
  uiContext.els.composeTo.value = edited.to;
  uiContext.els.composeSubject.value = edited.subject;
  uiContext.els.composeBody.value = 'A real user reply';
  const savesBeforeEdit = uiContext.saves;
  uiContext.requestCloseCompose();
  assert.equal(uiContext.saves, savesBeforeEdit + 1, 'a real user edit should still autosave on close');
  assert.equal(uiContext.state.compose.dirty, true);
});

test('MailApp sends only through saveDraft then sendDraft and exposes no direct compose send', () => {
  requireUiFile();
  const sendComposeSource = extractUiFunction('sendCompose');
  const saveIndex = sendComposeSource.indexOf('await saveDraft(');
  const sendIndex = sendComposeSource.indexOf('op: "sendDraft"');
  assert.ok(saveIndex !== -1 && sendIndex > saveIndex, 'sendCompose must persist a draft before consuming its ID');
  assert.doesNotMatch(uiSource, /composeSend|\/messages\/send/);
  assert.doesNotMatch(clientSource, /composeSend|\/messages\/send/);
  assert.match(uiSource, /if \(op === "sendDraft"\)/, 'the UI translator must expose only the draft send operation');
});

test('MailApp authenticates with Telegram initData without URL/localStorage secrets or confirmation modal', () => {
  requireUiFile();
  assert.match(uiSource, /telegram-web-app\.js/i, 'MailApp must load the Telegram Mini App SDK');
  assert.match(uiSource, /\.initData\b/, 'MailApp must send Telegram.WebApp.initData to the backend');
  assert.match(uiSource, /mailboxOpenSession/, 'MailApp must open an authenticated mailbox session');
  assert.match(uiSource, /mailboxRenewSession/, 'MailApp must renew an authenticated mailbox session in memory');
  assert.match(uiSource, /Telegram\.WebApp/);
  assert.match(uiSource, /SecureStorage/, 'Telegram SecureStorage must preserve only the app refresh credential');
  assert.match(uiSource, /recoverMailboxSessionFromSecureStorage/,
    'reload must attempt secure session recovery before consuming a new launch');
  assert.match(uiSource, /mailboxRpc/, 'MailApp must use the allowlisted mailbox RPC');
  assert.match(uiSource, /embeddedLaunchNonce/, 'MailApp must accept a one-use server launch nonce');
  assert.match(uiSource, /mailboxRedeemLaunch/, 'MailApp must redeem the nonce before receiving its in-memory session');
  assert.match(uiSource, /embeddedLaunchRoute/, 'MailApp must preserve a validated deep-link route after POST');
  assert.match(uiSource, /mailboxRecoverSessionCapacity/, 'capacity recovery must be an explicit server action');
  assert.match(uiSource, /Завершити старі мої сеанси й відкрити/,
    'the capacity screen must explain that only the current user sessions are ended');
  assert.match(codeSource, /capacityRecoveryToken[\s\S]{0,300}mailboxCapacityRecoveryToken/,
    'POST launch failures must pass only the bounded one-use recovery bearer into the template');
  assert.match(
    codeSource,
    /postedParams\.action[\s\S]{0,160}mailbox_bootstrap[\s\S]{0,100}serveMailboxLaunchPost_\(e\)/,
    'mailbox POST bootstrap must run before the Telegram webhook key gate'
  );

  assert.doesNotMatch(uiSource, /CONTROL_TOKEN|WEBHOOK_KEY|BOT_TOKEN/);
  assert.doesNotMatch(uiSource, /mailboxSessionToken/, 'the bearer session must not be embedded into raw HTML');
  assert.doesNotMatch(uiSource, /[?&](?:key|token|session)=/i, 'secrets must not be carried in URLs');
  assert.doesNotMatch(
    uiSource,
    /searchParams\.set\(\s*['"](?:key|token|session|sessionToken|refreshToken)['"]/i,
    'MailApp must not append bearer credentials to a URL'
  );
  assert.doesNotMatch(
    codeSource,
    /setXFrameOptionsMode\s*\(\s*HtmlService\.XFrameOptionsMode\.ALLOWALL\s*\)/,
    'MailApp must retain the default anti-framing policy'
  );
  assert.doesNotMatch(uiSource, /\blocalStorage\b/i,
    'mailbox state and credentials must not use localStorage');
  assert.match(
    uiSource,
    /sessionStorage\.(?:getItem|setItem)\(\s*["']p0-release-reload["']/,
    'sessionStorage is limited to the content-free one-reload release guard'
  );
  assert.doesNotMatch(
    uiSource,
    /sessionStorage\.(?:setItem|getItem)\([^\n]{0,240}(?:token|sessionToken|refreshToken|accessToken|bodyHtml|bodyText|message|thread)/i,
    'mailbox credentials and mail content must never enter sessionStorage'
  );
  assert.doesNotMatch(
    uiSource + '\n' + codeSource,
    /[?&#](?:refreshToken|refresh_token)=/i,
    'refresh credentials must never be serialized into a URL'
  );
  assert.doesNotMatch(uiSource, /\b(?:window\.)?confirm\s*\(/i, 'mail actions must not open confirm()');
  assert.doesNotMatch(
    uiSource,
    /confirmationModal|confirm-dialog|Ви впевнені|Підтвердити дію/i,
    'mail actions must not render a confirmation modal'
  );
  assert.doesNotMatch(
    uiSource,
    /\.innerHTML\s*=\s*[^;\n]*(?:message\.(?:bodyHtml|messageHtml|rawHtml)(?!Sanitized\b)|message\.body(?!HtmlSanitized\b))/i,
    'untrusted email HTML must not be assigned directly to innerHTML'
  );
});

test('Box state uses an isolated UserLock while Telegram claims retain ScriptLock', () => {
  const boxStart = clientSource.indexOf('function mailboxHandleBoxOAuthCallback_');
  const boxEnd = clientSource.indexOf('function mailboxRpc');
  assert.ok(boxStart >= 0 && boxEnd > boxStart, 'Box state region must be present');
  const boxStateSource = clientSource.slice(boxStart, boxEnd);
  assert.match(
    clientSource,
    /function mailboxBoxStateLock_\(\)\s*{\s*return LockService\.getUserLock\(\);\s*}/
  );
  assert.doesNotMatch(boxStateSource, /LockService\.getScriptLock\(\)/);
  assert.equal((boxStateSource.match(/=\s*mailboxBoxStateLock_\(\);/g) || []).length, 14);

  const claimStart = codeSource.indexOf('function claimTelegramUpdate_');
  const claimEnd = codeSource.indexOf('\nfunction ', claimStart + 1);
  assert.ok(claimStart >= 0 && claimEnd > claimStart, 'Telegram claim function must be present');
  const claimSource = codeSource.slice(claimStart, claimEnd);
  assert.match(claimSource, /LockService\.getScriptLock\(\)/);
  assert.doesNotMatch(claimSource, /LockService\.getUserLock\(\)/);
});

test('Box OAuth is owner-session bound, root_readonly, one-use, and returns no provider secret', () => {
  const accessToken = 'box-access-token-oauth-0001';
  const refreshToken = 'box-refresh-token-oauth-0001';
  let tokenRequests = 0;
  let identityRequests = 0;
  const harness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      if (url === 'https://api.box.com/oauth2/token') {
        tokenRequests += 1;
        assert.equal(request.method, 'post');
        assert.equal(request.followRedirects, false);
        assert.equal(request.payload.grant_type, 'authorization_code');
        assert.equal(request.payload.client_id, 'box-client-id-unit-123');
        assert.equal(request.payload.client_secret, 'box-client-secret-unit-123456789');
        assert.equal(request.payload.redirect_uri, BOX_TEST_REDIRECT_URI);
        return jsonResponse({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 3600,
          token_type: 'bearer',
        });
      }
      if (url.startsWith('https://api.box.com/2.0/users/me?')) {
        identityRequests += 1;
        assert.equal(request.headers.Authorization, 'Bearer ' + accessToken);
        return jsonResponse({
          id: '99887766',
          type: 'user',
          name: 'Pavlo Box',
          login: 'tarasevych.pavlo@gmail.com',
          status: 'active',
          space_amount: 10 * 1024 * 1024 * 1024,
          space_used: 12345,
        });
      }
      throw new Error('Unexpected Box OAuth URL: ' + url);
    },
  });
  const token = openOwnerSession(harness);

  function startConnection() {
    const data = resultData(rpc(harness, token, 'boxConnectStart', {}));
    const url = new URL(data.authorizationUrl);
    const state = url.searchParams.get('state');
    return {
      data,
      url,
      state,
      key: 'BOX_OAUTH_STATE_V1_' + harness.context.mailboxDigestText_(state),
    };
  }

  const superseded = startConnection();
  const supersededGeneration = JSON.parse(
    harness.propertyValues[superseded.key]
  ).connectionGeneration;
  const expired = startConnection();
  const expiredRecord = JSON.parse(harness.propertyValues[expired.key]);
  assert.notEqual(expiredRecord.connectionGeneration, supersededGeneration);
  assert.equal(harness.propertyValues[superseded.key], undefined,
    'a newer connect start must delete every older pending state');
  assert.equal(harness.context.mailboxHandleBoxOAuthCallback_({
    code: 'authorization-code-superseded',
    state: superseded.state,
  }).ok, false);
  assert.equal(tokenRequests, 0, 'a superseded state must fail before token exchange');
  expiredRecord.issuedAt = Date.now() - 700000;
  expiredRecord.expiresAt = expiredRecord.issuedAt + 600000;
  harness.propertyValues[expired.key] = JSON.stringify(expiredRecord);
  assert.equal(harness.context.mailboxHandleBoxOAuthCallback_({
    code: 'authorization-code-expired',
    state: expired.state,
  }).ok, false);
  assert.equal(tokenRequests, 0, 'expired OAuth state must fail before token exchange');

  const wrongSession = startConnection();
  const wrongRecord = JSON.parse(harness.propertyValues[wrongSession.key]);
  wrongRecord.sessionKey = 'mailbox.session.v1.' + 'A'.repeat(43);
  harness.propertyValues[wrongSession.key] = JSON.stringify(wrongRecord);
  assert.equal(harness.context.mailboxHandleBoxOAuthCallback_({
    code: 'authorization-code-wrong-session',
    state: wrongSession.state,
  }).ok, false);
  assert.equal(tokenRequests, 0, 'state bound to another exact session must fail before exchange');

  const current = startConnection();
  assert.equal(current.url.origin, 'https://account.box.com');
  assert.equal(current.url.pathname, '/api/oauth2/authorize');
  assert.equal(current.url.searchParams.get('response_type'), 'code');
  assert.equal(current.url.searchParams.get('client_id'), 'box-client-id-unit-123');
  assert.equal(current.url.searchParams.get('redirect_uri'), BOX_TEST_REDIRECT_URI);
  assert.equal(current.url.searchParams.get('scope'), 'root_readonly');
  assert.match(current.state, /^[A-Za-z0-9_-]{43}$/);
  const durableState = JSON.parse(harness.propertyValues[current.key]);
  assert.equal(durableState.ownerId, OWNER_ID);
  assert.equal(durableState.sessionKey, harness.context.mailboxSessionKey_(token));
  harness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1 = JSON.stringify({
    v: 1,
    status: 'ambiguous',
    attemptId: 'J'.repeat(43),
    refreshDigest: 'K'.repeat(43),
    startedAt: Date.now() - 1000,
    finishedAt: Date.now(),
  });

  const completed = harness.context.mailboxHandleBoxOAuthCallback_({
    code: 'authorization-code-current',
    state: current.state,
  });
  assert.deepEqual(JSON.parse(JSON.stringify(completed)), {
    ok: true,
    title: 'Box підключено',
    message: 'Доступ лише для читання підтверджено. Можна повернутися до Mini App.',
  });
  assert.doesNotMatch(JSON.stringify(completed), /access|refresh|token/i);
  assert.equal(tokenRequests, 1);
  assert.equal(identityRequests, 1);
  assert.equal(harness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1, undefined,
    'a fresh grant must clear any stale one-use refresh journal before becoming active');

  const stored = JSON.parse(harness.propertyValues.BOX_OAUTH_TOKEN_V1);
  assert.equal(stored.accessToken, accessToken);
  assert.equal(stored.refreshToken, refreshToken);
  const tokenBearingProperties = Object.entries(harness.propertyValues)
    .filter(([, value]) => String(value).includes(accessToken) || String(value).includes(refreshToken))
    .map(([key]) => key);
  assert.deepEqual(tokenBearingProperties, ['BOX_OAUTH_TOKEN_V1']);

  const status = resultData(rpc(harness, token, 'boxStatus', {}));
  assert.equal(status.connected, true);
  assert.equal(status.account.id, '99887766');
  assert.doesNotMatch(JSON.stringify(status), /access|refresh|token/i);
  const activeGeneration = harness.propertyValues.BOX_CONNECTION_GENERATION_V1;
  const reconnect = resultFailed(rpc(harness, token, 'boxConnectStart', {}));
  assert.equal(reconnect.code, 'BOX_ALREADY_CONNECTED');
  assert.equal(harness.propertyValues.BOX_CONNECTION_GENERATION_V1, activeGeneration,
    'rejecting an active reconnect must not invalidate the current connection');
  assert.equal(
    Object.keys(harness.propertyValues).some(key => key.startsWith('BOX_OAUTH_STATE_V1_')),
    false
  );

  const replay = harness.context.mailboxHandleBoxOAuthCallback_({
    code: 'authorization-code-replay',
    state: current.state,
  });
  assert.equal(replay.ok, false);
  assert.equal(tokenRequests, 1, 'one-use OAuth state must never exchange twice');

  const oversizedError = harness.context.mailboxHandleBoxOAuthCallback_({
    state: 'B'.repeat(43),
    error: 'access_denied',
    errorDescription: 'x'.repeat(501),
  });
  assert.equal(oversizedError.ok, false);
  assert.ok(oversizedError.message.length <= 500);
  assert.equal(tokenRequests, 1);
});
test('Box callback cannot resurrect a disconnected account or overwrite a sibling completed grant', () => {
  const candidateAccess = 'box-race-access-token-0001';
  const candidateRefresh = 'box-race-refresh-token-0001';
  let disconnectHarness;
  let disconnectSession = '';
  let disconnectTriggered = false;
  let disconnectRevokeCalls = 0;
  disconnectHarness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      if (url === 'https://api.box.com/oauth2/token') {
        return jsonResponse({
          access_token: candidateAccess,
          refresh_token: candidateRefresh,
          expires_in: 3600,
          token_type: 'bearer',
        });
      }
      if (url.startsWith('https://api.box.com/2.0/users/me?')) {
        assert.equal(request.headers.Authorization, 'Bearer ' + candidateAccess);
        disconnectTriggered = true;
        const disconnected = resultData(rpc(
          disconnectHarness,
          disconnectSession,
          'boxDisconnect',
          {}
        ));
        assert.equal(disconnected.disconnected, true);
        return jsonResponse({
          id: '99887766',
          type: 'user',
          name: 'Pavlo Box',
          login: 'tarasevych.pavlo@gmail.com',
          status: 'active',
        });
      }
      if (url === 'https://api.box.com/oauth2/revoke') {
        disconnectRevokeCalls += 1;
        assert.equal(request.payload.token, candidateRefresh);
        return httpResponse('', 204);
      }
      throw new Error('Unexpected disconnect race URL: ' + url);
    },
  });
  disconnectSession = openOwnerSession(disconnectHarness);
  const disconnectStart = resultData(rpc(
    disconnectHarness,
    disconnectSession,
    'boxConnectStart',
    {}
  ));
  const disconnectState = new URL(disconnectStart.authorizationUrl).searchParams.get('state');
  const disconnectStateKey =
    'BOX_OAUTH_STATE_V1_' + disconnectHarness.context.mailboxDigestText_(disconnectState);
  const startedGeneration = JSON.parse(
    disconnectHarness.propertyValues[disconnectStateKey]
  ).connectionGeneration;
  const disconnectedCallback = disconnectHarness.context.mailboxHandleBoxOAuthCallback_({
    code: 'authorization-code-racing-disconnect',
    state: disconnectState,
  });
  assert.equal(disconnectTriggered, true);
  assert.equal(disconnectedCallback.ok, false);
  assert.notEqual(
    disconnectHarness.propertyValues.BOX_CONNECTION_GENERATION_V1,
    startedGeneration
  );
  assert.equal(disconnectHarness.propertyValues.BOX_OAUTH_TOKEN_V1, undefined);
  assert.equal(disconnectRevokeCalls, 1,
    'the grant exchanged before a disconnect tombstone must be revoked exactly once');

  const siblingAccess = 'box-sibling-access-token-0001';
  const siblingRefresh = 'box-sibling-refresh-token-0001';
  const existingAccess = 'box-existing-access-token-0001';
  const existingRefresh = 'box-existing-refresh-token-0001';
  let siblingHarness;
  let siblingInstalled = false;
  let siblingRevokeCalls = 0;
  siblingHarness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      if (url === 'https://api.box.com/oauth2/token') {
        return jsonResponse({
          access_token: siblingAccess,
          refresh_token: siblingRefresh,
          expires_in: 3600,
          token_type: 'bearer',
        });
      }
      if (url.startsWith('https://api.box.com/2.0/users/me?')) {
        assert.equal(request.headers.Authorization, 'Bearer ' + siblingAccess);
        installBoxToken(siblingHarness, {
          accessToken: existingAccess,
          refreshToken: existingRefresh,
        });
        siblingInstalled = true;
        return jsonResponse({
          id: '99887766',
          type: 'user',
          name: 'Pavlo Box',
          login: 'tarasevych.pavlo@gmail.com',
          status: 'active',
        });
      }
      if (url === 'https://api.box.com/oauth2/revoke') {
        siblingRevokeCalls += 1;
        assert.equal(request.payload.token, siblingRefresh);
        return httpResponse('', 204);
      }
      throw new Error('Unexpected sibling grant race URL: ' + url);
    },
  });
  const siblingSession = openOwnerSession(siblingHarness);
  const siblingStart = resultData(rpc(siblingHarness, siblingSession, 'boxConnectStart', {}));
  const siblingState = new URL(siblingStart.authorizationUrl).searchParams.get('state');
  const siblingCallback = siblingHarness.context.mailboxHandleBoxOAuthCallback_({
    code: 'authorization-code-sibling-collision',
    state: siblingState,
  });
  assert.equal(siblingInstalled, true);
  assert.equal(siblingCallback.ok, false);
  const preserved = JSON.parse(siblingHarness.propertyValues.BOX_OAUTH_TOKEN_V1);
  assert.equal(preserved.accessToken, existingAccess);
  assert.equal(preserved.refreshToken, existingRefresh);
  assert.equal(siblingRevokeCalls, 1,
    'a losing sibling grant must be revoked without replacing the committed token');
});
test('stale Box 401 and account mismatch responses cannot overwrite a newer connection', () => {
  const oldAccess = 'box-stale-access-token-0001';
  const oldRefresh = 'box-stale-refresh-token-0001';
  const newAccess = 'box-current-access-token-0001';
  const newRefresh = 'box-current-refresh-token-0001';
  const oldGeneration = 'L'.repeat(43);
  const newGeneration = 'N'.repeat(43);

  let jsonHarness;
  jsonHarness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      assert.ok(url.startsWith('https://api.box.com/2.0/users/me'));
      assert.equal(request.headers.Authorization, 'Bearer ' + oldAccess);
      installBoxToken(jsonHarness, { accessToken: newAccess, refreshToken: newRefresh });
      jsonHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = newGeneration;
      return jsonResponse({}, 401);
    },
  });
  const oldJsonRecord = installBoxToken(jsonHarness, {
    accessToken: oldAccess,
    refreshToken: oldRefresh,
  });
  jsonHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = oldGeneration;
  jsonHarness.context.mailboxBoxAccessContext_ = () => ({
    accessToken: oldAccess,
    accessDigest: jsonHarness.context.mailboxDigestText_(oldAccess),
    connectionGeneration: oldGeneration,
    account: oldJsonRecord.account,
    refreshed: true,
  });
  assert.throws(
    () => jsonHarness.context.mailboxBoxApiJsonRequest_('/users/me?fields=id'),
    error => error && error.mailboxCode === 'BOX_BUSY'
  );
  assert.equal(JSON.parse(jsonHarness.propertyValues.BOX_OAUTH_TOKEN_V1).accessToken, newAccess);
  assert.equal(JSON.parse(jsonHarness.propertyValues.BOX_OAUTH_TOKEN_V1).status, 'active');

  let contentHarness;
  contentHarness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      assert.equal(url, 'https://api.box.com/2.0/files/321/content');
      assert.equal(request.headers.Authorization, 'Bearer ' + oldAccess);
      installBoxToken(contentHarness, { accessToken: newAccess, refreshToken: newRefresh });
      contentHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = newGeneration;
      return httpResponse('', 401);
    },
  });
  const oldContentRecord = installBoxToken(contentHarness, {
    accessToken: oldAccess,
    refreshToken: oldRefresh,
  });
  contentHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = oldGeneration;
  contentHarness.context.mailboxBoxAccessContext_ = () => ({
    accessToken: oldAccess,
    accessDigest: contentHarness.context.mailboxDigestText_(oldAccess),
    connectionGeneration: oldGeneration,
    account: oldContentRecord.account,
    refreshed: true,
  });
  assert.throws(
    () => contentHarness.context.mailboxBoxContentApiResponse_('321', 64),
    error => error && error.mailboxCode === 'BOX_BUSY'
  );
  assert.equal(JSON.parse(contentHarness.propertyValues.BOX_OAUTH_TOKEN_V1).accessToken, newAccess);
  assert.equal(JSON.parse(contentHarness.propertyValues.BOX_OAUTH_TOKEN_V1).status, 'active');

  let earlyStatusHarness;
  earlyStatusHarness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      assert.ok(url.startsWith('https://api.box.com/2.0/users/me'));
      assert.equal(request.headers.Authorization, 'Bearer ' + newAccess);
      return jsonResponse({
        id: '22334455',
        type: 'user',
        name: 'Current Box',
        login: 'current@example.com',
        status: 'active',
      });
    },
  });
  installBoxToken(earlyStatusHarness, {
    accessToken: oldAccess,
    refreshToken: oldRefresh,
    accountId: '99887766',
  });
  earlyStatusHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = oldGeneration;
  const earlyStatusSession = openOwnerSession(earlyStatusHarness);
  earlyStatusHarness.context.mailboxBoxAccessContext_ = () => {
    const current = installBoxToken(earlyStatusHarness, {
      accessToken: newAccess,
      refreshToken: newRefresh,
      accountId: '22334455',
      accountName: 'Current Box',
      login: 'current@example.com',
    });
    earlyStatusHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = newGeneration;
    return {
      accessToken: newAccess,
      accessDigest: earlyStatusHarness.context.mailboxDigestText_(newAccess),
      connectionGeneration: newGeneration,
      account: current.account,
      refreshed: true,
    };
  };
  const earlyStatus = resultData(rpc(earlyStatusHarness, earlyStatusSession, 'boxStatus', {}));
  assert.equal(earlyStatus.connected, true);
  assert.equal(earlyStatus.account.id, '22334455');
  assert.equal(JSON.parse(earlyStatusHarness.propertyValues.BOX_OAUTH_TOKEN_V1).status, 'active');

  const statusHarness = makeContext({ properties: boxTestProperties() });
  const oldStatusRecord = installBoxToken(statusHarness, {
    accessToken: oldAccess,
    refreshToken: oldRefresh,
  });
  statusHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = oldGeneration;
  const statusSession = openOwnerSession(statusHarness);
  statusHarness.context.mailboxBoxApiJsonRequest_ = (_path, requestContext) => {
    requestContext.connectionGeneration = oldGeneration;
    requestContext.accessDigest = statusHarness.context.mailboxDigestText_(oldAccess);
    requestContext.accountId = oldStatusRecord.account.id;
    installBoxToken(statusHarness, { accessToken: newAccess, refreshToken: newRefresh });
    statusHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = newGeneration;
    return { id: '11223344', type: 'user', name: 'Other Box', status: 'active' };
  };
  const staleStatus = resultFailed(rpc(statusHarness, statusSession, 'boxStatus', {}));
  assert.equal(staleStatus.code, 'BOX_BUSY');
  const currentStatusRecord = JSON.parse(statusHarness.propertyValues.BOX_OAUTH_TOKEN_V1);
  assert.equal(currentStatusRecord.accessToken, newAccess);
  assert.equal(currentStatusRecord.status, 'active');
  assert.notEqual(oldStatusRecord.accessToken, currentStatusRecord.accessToken);
});

test('Box source lists support folder search marker paging and filter non-file web links', () => {
  let boxApiCalls = 0;
  const harness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      boxApiCalls += 1;
      assert.equal(request.headers.Authorization, 'Bearer box-access-token-unit-0001');
      if (url.includes('/2.0/folders/0?fields=')) {
        return jsonResponse({ id: '0', type: 'folder', name: 'All Files', path_collection: { entries: [] } });
      }
      if (url.includes('/2.0/search?')) {
        const params = new URL(url).searchParams;
        assert.equal(params.get('query'), 'report & scope=enterprise');
        assert.deepEqual(params.getAll('scope'), ['user_content']);
        assert.equal(params.get('content_types'), 'name');
        assert.equal(params.get('ancestor_folder_ids'), '0');
        assert.equal(params.get('marker'), 'marker in');
        assert.equal(params.get('usemarker'), 'true');
        return jsonResponse({
          entries: [
            { id: '77', type: 'web_link', name: 'External shortcut' },
            {
              id: '101', type: 'file', name: 'report.pdf', extension: 'pdf', size: '18',
              modified_at: '2026-07-17T10:00:00Z',
            },
            {
              id: '202', type: 'folder', name: 'Reports', modified_at: '2026-07-17T09:00:00Z',
              item_collection: { total_count: 4 },
            },
          ],
          next_marker: 'marker out',
        });
      }
      if (url.includes('/2.0/folders/202/items?')) {
        const params = new URL(url).searchParams;
        assert.equal(params.get('usemarker'), 'true');
        return jsonResponse({
          entries: [{
            id: '303', type: 'file', name: 'inside.txt', extension: 'txt', size: '6',
            modified_at: '2026-07-17T11:00:00Z',
          }],
          next_marker: '',
        });
      }
      if (url.includes('/2.0/folders/202?fields=')) {
        return jsonResponse({
          id: '202',
          type: 'folder',
          name: 'Reports',
          path_collection: { entries: [{ id: '0', type: 'folder', name: 'All Files' }] },
        });
      }
      throw new Error('Unexpected Box source URL: ' + url);
    },
  });
  installBoxToken(harness);
  const token = openOwnerSession(harness);
  const searched = resultData(rpc(harness, token, 'sourceList', {
    provider: 'box',
    folderId: '0',
    query: 'report & scope=enterprise',
    pageToken: 'marker in',
    pageSize: 3,
  }));
  assert.equal(searched.provider, 'box');
  assert.equal(searched.nextPageToken, 'marker out');
  assert.deepEqual(
    JSON.parse(JSON.stringify(searched.items.map(item => ({ id: item.id, type: item.type })))),
    [{ id: '101', type: 'file' }, { id: '202', type: 'folder' }]
  );
  assert.equal(searched.items[0].source.provider, 'box');
  assert.equal(searched.items[0].mimeType, 'application/pdf');
  assert.equal(searched.items[1].itemCount, 4);

  const folder = resultData(rpc(harness, token, 'sourceList', {
    provider: 'box',
    folderId: '202',
    query: '',
    pageToken: '',
    pageSize: 10,
  }));
  assert.deepEqual(
    JSON.parse(JSON.stringify(folder.breadcrumbs)),
    [{ id: '0', name: 'All Files' }, { id: '202', name: 'Reports' }]
  );
  assert.equal(folder.items[0].fileId, '303');

  const beforeInvalid = boxApiCalls;
  const invalid = resultFailed(rpc(harness, token, 'sourceMetadata', {
    source: { provider: 'box', fileId: '101x' },
  }));
  assert.equal(invalid.code, 'INVALID_SOURCE');
  assert.equal(boxApiCalls, beforeInvalid, 'non-numeric Box IDs must fail before network access');
});

test('Box content keeps 2/10 MiB bounds, strips bearer on signed redirects, and rejects MIME or host changes', () => {
  const goodBytes = Buffer.from('box text file');
  const pngBytes = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 1, 2, 3, 4]);
  const signedGood = 'https://dl.boxcloud.com/signed/good-file';
  const signedWrong = 'https://dl.boxcloud.com/signed/wrong-mime';
  const evilRedirect = 'https://dl.boxcloud.com.attacker.example/signed/evil';
  const ranges = [];
  const signedRequests = [];
  const harness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      const metadataMatch = url.match(/\/2\.0\/files\/(301|302|303)\?fields=/);
      if (metadataMatch) {
        assert.equal(request.headers.Authorization, 'Bearer box-access-token-unit-0001');
        const id = metadataMatch[1];
        if (id === '302') {
          return jsonResponse({
            id, type: 'file', name: 'wrong.pdf', extension: 'pdf', size: String(pngBytes.length),
            modified_at: '2026-07-17T12:00:00Z',
          });
        }
        return jsonResponse({
          id, type: 'file', name: id === '301' ? 'good.txt' : 'evil.txt',
          extension: 'txt', size: String(goodBytes.length), modified_at: '2026-07-17T12:00:00Z',
        });
      }
      const contentMatch = url.match(/\/2\.0\/files\/(301|302|303)\/content$/);
      if (contentMatch) {
        assert.equal(request.headers.Authorization, 'Bearer box-access-token-unit-0001');
        ranges.push(request.headers.Range);
        const id = contentMatch[1];
        return httpResponse('', 302, {
          Location: id === '301' ? signedGood : id === '302' ? signedWrong : evilRedirect,
        });
      }
      if (url === signedGood || url === signedWrong) {
        signedRequests.push({ url, request });
        assert.equal(Object.prototype.hasOwnProperty.call(request.headers, 'Authorization'), false);
        const body = url === signedGood ? goodBytes : pngBytes;
        return httpResponse(body, 200, {
          'Content-Type': url === signedGood ? 'text/plain' : 'image/png',
          'Content-Length': String(body.length),
        });
      }
      throw new Error('Unexpected Box content URL: ' + url);
    },
  });
  installBoxToken(harness);
  const token = openOwnerSession(harness);

  const preview = resultData(rpc(harness, token, 'sourceContent', {
    source: { provider: 'box', fileId: '301' },
    purpose: 'preview',
    maxBytes: 2 * 1024 * 1024,
  }));
  assert.deepEqual(Buffer.from(preview.dataBase64Url, 'base64url'), goodBytes);

  const download = resultData(rpc(harness, token, 'sourceContent', {
    source: { provider: 'box', fileId: '301' },
    purpose: 'download',
    maxBytes: 10 * 1024 * 1024,
  }));
  assert.deepEqual(Buffer.from(download.dataBase64Url, 'base64url'), goodBytes);
  assert.deepEqual(ranges.slice(0, 2), ['bytes=0-2097151', 'bytes=0-10485759']);
  assert.deepEqual(
    signedRequests.slice(0, 2).map(item => item.request.headers.Range),
    ['bytes=0-2097151', 'bytes=0-10485759']
  );

  assert.equal(resultFailed(rpc(harness, token, 'sourceContent', {
    source: { provider: 'box', fileId: '301' },
    purpose: 'preview',
    maxBytes: 2 * 1024 * 1024 + 1,
  })).code, 'INVALID_REQUEST');
  assert.equal(resultFailed(rpc(harness, token, 'sourceContent', {
    source: { provider: 'box', fileId: '301' },
    purpose: 'download',
    maxBytes: 10 * 1024 * 1024 + 1,
  })).code, 'INVALID_REQUEST');

  const wrongMime = resultFailed(rpc(harness, token, 'sourceContent', {
    source: { provider: 'box', fileId: '302' },
    purpose: 'download',
    maxBytes: pngBytes.length,
  }));
  assert.equal(wrongMime.code, 'INVALID_ATTACHMENT');

  const unsafeHost = resultFailed(rpc(harness, token, 'sourceContent', {
    source: { provider: 'box', fileId: '303' },
    purpose: 'download',
    maxBytes: goodBytes.length,
  }));
  assert.equal(unsafeHost.code, 'BOX_FAILED');
  assert.equal(harness.urlFetchCalls.some(call => call.url === evilRedirect), false);
});

test('Box refresh rotates once on success and fails closed without replay after an ambiguous exchange', () => {
  const oldAccess = 'box-old-access-token-0001';
  const oldRefresh = 'box-old-refresh-token-0001';
  const newAccess = 'box-new-access-token-0001';
  const newRefresh = 'box-new-refresh-token-0001';
  let successHarness;
  let successRefreshCalls = 0;
  successHarness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      if (url === 'https://api.box.com/oauth2/token') {
        successRefreshCalls += 1;
        const started = JSON.parse(successHarness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1);
        assert.equal(started.status, 'started', 'refresh journal must persist before network exchange');
        assert.equal(String(successHarness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1).includes(oldRefresh), false);
        assert.equal(request.payload.grant_type, 'refresh_token');
        assert.equal(request.payload.refresh_token, oldRefresh);
        return jsonResponse({
          access_token: newAccess,
          refresh_token: newRefresh,
          expires_in: 3600,
          token_type: 'bearer',
        });
      }
      if (url.startsWith('https://api.box.com/2.0/users/me')) {
        if (request.headers.Authorization === 'Bearer ' + oldAccess) return jsonResponse({}, 401);
        assert.equal(request.headers.Authorization, 'Bearer ' + newAccess);
        return jsonResponse({ id: '99887766', type: 'user', name: 'Pavlo Box', status: 'active' });
      }
      throw new Error('Unexpected successful refresh URL: ' + url);
    },
  });
  installBoxToken(successHarness, { accessToken: oldAccess, refreshToken: oldRefresh });
  const identity = successHarness.context.mailboxBoxApiJsonRequest_('/users/me?fields=id,name,status');
  assert.equal(identity.id, '99887766');
  assert.equal(successRefreshCalls, 1);
  const rotated = JSON.parse(successHarness.propertyValues.BOX_OAUTH_TOKEN_V1);
  assert.equal(rotated.accessToken, newAccess);
  assert.equal(rotated.refreshToken, newRefresh);
  assert.equal(JSON.parse(successHarness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1).status, 'completed');
  assert.equal(successHarness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1.includes(oldRefresh), false);

  let ambiguousHarness;
  let ambiguousApiCalls = 0;
  let ambiguousRefreshCalls = 0;
  ambiguousHarness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      if (url.startsWith('https://api.box.com/2.0/users/me')) {
        ambiguousApiCalls += 1;
        assert.equal(request.headers.Authorization, 'Bearer ' + oldAccess);
        return jsonResponse({}, 401);
      }
      if (url === 'https://api.box.com/oauth2/token') {
        ambiguousRefreshCalls += 1;
        throw new Error('connection lost after one-use refresh token may have rotated');
      }
      throw new Error('Unexpected ambiguous refresh URL: ' + url);
    },
  });
  installBoxToken(ambiguousHarness, { accessToken: oldAccess, refreshToken: oldRefresh });
  const request = () => ambiguousHarness.context.mailboxBoxApiJsonRequest_('/users/me?fields=id');
  assert.throws(request, error => error && error.mailboxCode === 'BOX_REAUTH_REQUIRED');
  assert.throws(request, error => error && error.mailboxCode === 'BOX_REAUTH_REQUIRED');
  assert.equal(ambiguousApiCalls, 1, 'reauth-required state must fail before a second API request');
  assert.equal(ambiguousRefreshCalls, 1, 'ambiguous one-use refresh must never be repeated');
  const failedClosed = JSON.stringify(ambiguousHarness.propertyValues);
  assert.equal(failedClosed.includes(oldAccess), false);
  assert.equal(failedClosed.includes(oldRefresh), true,
    'an ambiguously consumed refresh token must remain only in the protected cleanup queue');
  const ambiguousPending = Object.entries(ambiguousHarness.propertyValues)
    .filter(([key]) => key.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_'));
  assert.equal(ambiguousPending.length, 1);
  assert.equal(JSON.parse(ambiguousPending[0][1]).kind, 'cleanup');
  assert.equal(JSON.parse(ambiguousPending[0][1]).refreshToken, oldRefresh);
  assert.equal(JSON.parse(ambiguousHarness.propertyValues.BOX_OAUTH_TOKEN_V1).status, 'reauth_required');
  assert.equal(JSON.parse(ambiguousHarness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1).status, 'ambiguous');
});

test('Box disconnect durably queues credentials on revoke failure and deletes them only after confirmation', () => {
  let revokeMode = 'fail';
  let revokeCalls = 0;
  const harness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      assert.equal(url, 'https://api.box.com/oauth2/revoke');
      revokeCalls += 1;
      assert.equal(request.method, 'post');
      assert.equal(request.payload.client_id, 'box-client-id-unit-123');
      assert.equal(request.payload.token, 'box-refresh-token-unit-0001');
      return revokeMode === 'fail'
        ? jsonResponse({ error: 'temporarily_unavailable' }, 503)
        : httpResponse('', 204);
    },
  });
  installBoxToken(harness);
  harness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1 = JSON.stringify({
    v: 1,
    status: 'completed',
    attemptId: 'A'.repeat(43),
    refreshDigest: 'B'.repeat(43),
    startedAt: Date.now(),
  });
  harness.propertyValues.BOX_OAUTH_STATE_V1_test = JSON.stringify({ expiresAt: Date.now() + 60000 });
  harness.propertyValues.BOX_CONNECTION_GENERATION_V1 = 'C'.repeat(43);
  const original = harness.propertyValues.BOX_OAUTH_TOKEN_V1;
  const token = openOwnerSession(harness);

  const failed = resultFailed(rpc(harness, token, 'boxDisconnect', {}));
  assert.equal(failed.code, 'BOX_CLEANUP_PENDING');
  assert.notEqual(harness.propertyValues.BOX_OAUTH_TOKEN_V1, original);
  assert.equal(JSON.parse(harness.propertyValues.BOX_OAUTH_TOKEN_V1).status, 'reauth_required');
  const queued = Object.entries(harness.propertyValues)
    .filter(([key]) => key.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_'));
  assert.equal(queued.length, 1);
  assert.equal(JSON.parse(queued[0][1]).kind, 'cleanup');
  assert.equal(JSON.parse(queued[0][1]).refreshToken, 'box-refresh-token-unit-0001');
  assert.ok(harness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1);
  assert.notEqual(harness.propertyValues.BOX_CONNECTION_GENERATION_V1, 'C'.repeat(43),
    'disconnect must rotate the callback tombstone before a revoke attempt');
  const generationAfterFailure = harness.propertyValues.BOX_CONNECTION_GENERATION_V1;
  assert.equal(harness.propertyValues.BOX_OAUTH_STATE_V1_test, undefined,
    'pending OAuth states must be invalidated even when provider revoke fails');

  revokeMode = 'success';
  const disconnected = resultData(rpc(harness, token, 'boxDisconnect', {}));
  assert.deepEqual(JSON.parse(JSON.stringify(disconnected)), {
    disconnected: true,
    connected: false,
    status: 'disconnected',
    revoked: true,
  });
  assert.equal(revokeCalls, 2);
  assert.notEqual(harness.propertyValues.BOX_CONNECTION_GENERATION_V1, generationAfterFailure);
  assert.equal(harness.propertyValues.BOX_OAUTH_TOKEN_V1, undefined);
  assert.equal(harness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1, undefined);
  assert.equal(harness.propertyValues.BOX_OAUTH_STATE_V1_test, undefined);
});

test('Box identity failure persists cleanup through a network revoke failure and status retries unlocked', () => {
  const accessToken = 'box-identity-failed-access-0001';
  const refreshToken = 'box-identity-failed-refresh-0001';
  let revokeMode = 'network';
  let revokeCalls = 0;
  let lockHeld = false;
  let harness;
  harness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      if (url === 'https://api.box.com/oauth2/token') {
        return jsonResponse({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 3600,
          token_type: 'bearer',
        });
      }
      if (url.startsWith('https://api.box.com/2.0/users/me?')) {
        throw new Error('identity network failure');
      }
      if (url === 'https://api.box.com/oauth2/revoke') {
        assert.equal(lockHeld, false, 'provider revoke must run outside the Box UserLock');
        revokeCalls += 1;
        assert.equal(request.payload.token, refreshToken);
        if (revokeMode === 'network') throw new Error('revoke network failure');
        return httpResponse('', 204);
      }
      throw new Error('Unexpected identity cleanup URL: ' + url);
    },
  });
  const session = openOwnerSession(harness);
  const started = resultData(rpc(harness, session, 'boxConnectStart', {}));
  const state = new URL(started.authorizationUrl).searchParams.get('state');
  harness.context.LockService = {
    getScriptLock: () => ({ tryLock: () => true, waitLock: () => {}, releaseLock: () => {} }),
    getUserLock: () => ({
      tryLock: () => {
        assert.equal(lockHeld, false, 'Box UserLock must not be nested');
        lockHeld = true;
        return true;
      },
      releaseLock: () => { lockHeld = false; },
    }),
  };

  const failed = harness.context.mailboxHandleBoxOAuthCallback_({
    code: 'identity-failure-code',
    state,
  });
  assert.equal(failed.ok, false);
  assert.doesNotMatch(JSON.stringify(failed), new RegExp(refreshToken));
  assert.equal(revokeCalls, 1);
  const queued = Object.entries(harness.propertyValues)
    .filter(([key]) => key.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_'));
  assert.equal(queued.length, 1);
  assert.equal(JSON.parse(queued[0][1]).refreshToken, refreshToken);
  assert.equal(JSON.parse(queued[0][1]).kind, 'cleanup');

  revokeMode = 'success';
  const status = resultData(rpc(harness, session, 'boxStatus', {}));
  assert.deepEqual(JSON.parse(JSON.stringify(status)), {
    connected: false,
    status: 'disconnected',
  });
  assert.equal(revokeCalls, 2);
  assert.equal(Object.keys(harness.propertyValues)
    .some(key => key.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_')), false);
});

test('Box non-2xx revoke stays queued and reconnect is blocked until invalid_token confirms cleanup', () => {
  const accessToken = 'box-non2xx-access-token-0001';
  const refreshToken = 'box-non2xx-refresh-token-0001';
  let revokeMode = 'unavailable';
  let revokeCalls = 0;
  const harness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      if (url === 'https://api.box.com/oauth2/token') {
        return jsonResponse({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 3600,
          token_type: 'bearer',
        });
      }
      if (url.startsWith('https://api.box.com/2.0/users/me?')) {
        return jsonResponse({}, 503);
      }
      if (url === 'https://api.box.com/oauth2/revoke') {
        revokeCalls += 1;
        assert.equal(request.payload.token, refreshToken);
        return revokeMode === 'invalid'
          ? jsonResponse({ error: 'invalid_token' }, 400)
          : jsonResponse({ error: 'temporarily_unavailable' }, 503);
      }
      throw new Error('Unexpected non-2xx cleanup URL: ' + url);
    },
  });
  const session = openOwnerSession(harness);
  const firstStart = resultData(rpc(harness, session, 'boxConnectStart', {}));
  const state = new URL(firstStart.authorizationUrl).searchParams.get('state');
  const failed = harness.context.mailboxHandleBoxOAuthCallback_({
    code: 'identity-provider-failure-code',
    state,
  });
  assert.equal(failed.ok, false);
  assert.equal(revokeCalls, 1);
  const queuedKey = Object.keys(harness.propertyValues)
    .find(key => key.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_'));
  assert.ok(queuedKey);
  assert.equal(JSON.parse(harness.propertyValues[queuedKey]).attempts, 1);

  const blocked = resultFailed(rpc(harness, session, 'boxConnectStart', {}));
  assert.equal(blocked.code, 'BOX_CLEANUP_PENDING');
  assert.equal(revokeCalls, 2);
  assert.equal(harness.propertyValues[queuedKey] !== undefined, true,
    '503 must never be treated as confirmed revocation');
  assert.equal(
    Object.keys(harness.propertyValues).some(key => key.startsWith('BOX_OAUTH_STATE_V1_')),
    false,
    'blocked reconnect must not mint a new OAuth state'
  );

  revokeMode = 'invalid';
  const resumed = resultData(rpc(harness, session, 'boxConnectStart', {}));
  assert.match(resumed.authorizationUrl, /^https:\/\/account\.box\.com\/api\/oauth2\/authorize\?/);
  assert.equal(revokeCalls, 3);
  assert.equal(harness.propertyValues[queuedKey], undefined);
  assert.equal(
    Object.keys(harness.propertyValues)
      .filter(key => key.startsWith('BOX_OAUTH_STATE_V1_')).length,
    1
  );
});

test('Box account mismatch and corrupt refresh journal preserve cleanup tokens before reauth markers', () => {
  const accountHarness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      assert.ok(url.startsWith('https://api.box.com/2.0/users/me?'));
      assert.equal(request.headers.Authorization, 'Bearer box-account-mismatch-access-0001');
      return jsonResponse({
        id: '11223344',
        type: 'user',
        name: 'Different Box',
        login: 'different@example.com',
        status: 'active',
      });
    },
  });
  installBoxToken(accountHarness, {
    accessToken: 'box-account-mismatch-access-0001',
    refreshToken: 'box-account-mismatch-refresh-0001',
    accountId: '99887766',
  });
  accountHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = 'G'.repeat(43);
  const accountSession = openOwnerSession(accountHarness);
  const mismatch = resultData(rpc(accountHarness, accountSession, 'boxStatus', {}));
  assert.equal(mismatch.status, 'cleanup_pending');
  assert.equal(JSON.parse(accountHarness.propertyValues.BOX_OAUTH_TOKEN_V1).status, 'reauth_required');
  const accountQueue = Object.entries(accountHarness.propertyValues)
    .filter(([key]) => key.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_'));
  assert.equal(accountQueue.length, 1);
  assert.equal(
    JSON.parse(accountQueue[0][1]).refreshToken,
    'box-account-mismatch-refresh-0001'
  );
  assert.doesNotMatch(JSON.stringify(mismatch), /box-account-mismatch-refresh/);

  const journalHarness = makeContext({ properties: boxTestProperties() });
  installBoxToken(journalHarness, {
    accessToken: 'box-journal-corrupt-access-0001',
    refreshToken: 'box-journal-corrupt-refresh-0001',
  });
  journalHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = 'H'.repeat(43);
  journalHarness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1 = '{not-json';
  const journalSession = openOwnerSession(journalHarness);
  const journalStatus = resultData(rpc(journalHarness, journalSession, 'boxStatus', {}));
  assert.equal(journalStatus.status, 'cleanup_pending');
  assert.equal(JSON.parse(journalHarness.propertyValues.BOX_OAUTH_TOKEN_V1).status, 'reauth_required');
  const journalQueue = Object.entries(journalHarness.propertyValues)
    .filter(([key]) => key.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_'));
  assert.equal(journalQueue.length, 1);
  assert.equal(
    JSON.parse(journalQueue[0][1]).refreshToken,
    'box-journal-corrupt-refresh-0001'
  );
});

test('Box corrupt raw token record blocks status and reconnect without automatic deletion', () => {
  const harness = makeContext({ properties: boxTestProperties() });
  const raw = '{"v":1,"status":"active","refreshToken":"truncated"';
  harness.propertyValues.BOX_OAUTH_TOKEN_V1 = raw;
  const session = openOwnerSession(harness);

  const status = resultData(rpc(harness, session, 'boxStatus', {}));
  assert.deepEqual(JSON.parse(JSON.stringify(status)), {
    connected: false,
    status: 'cleanup_manual',
  });
  assert.equal(harness.propertyValues.BOX_OAUTH_TOKEN_V1, raw);

  const blocked = resultFailed(rpc(harness, session, 'boxConnectStart', {}));
  assert.equal(blocked.code, 'BOX_CLEANUP_MANUAL');
  assert.equal(harness.propertyValues.BOX_OAUTH_TOKEN_V1, raw);
  assert.equal(
    Object.keys(harness.propertyValues).some(key => key.startsWith('BOX_OAUTH_STATE_V1_')),
    false
  );
});

test('Box refresh fail-closed branches queue every known refresh token before erasing active state', () => {
  const cases = [
    {
      name: 'provider_rejected',
      response: () => jsonResponse({ error: 'temporarily_unavailable' }, 503),
      expected: index => [`box-failclosed-old-refresh-${index}-0001`],
    },
    {
      name: 'invalid_success',
      response: index => jsonResponse({
        access_token: `box-failclosed-new-access-${index}-0001`,
        expires_in: 3600,
        token_type: 'bearer',
      }),
      expected: index => [`box-failclosed-old-refresh-${index}-0001`],
    },
    {
      name: 'storage_ambiguous',
      response: index => jsonResponse({
        access_token: `box-failclosed-new-access-${index}-0001`,
        refresh_token: `box-failclosed-new-refresh-${index}-0001`,
        expires_in: 3600,
        token_type: 'bearer',
      }),
      expected: index => [
        `box-failclosed-new-refresh-${index}-0001`,
        `box-failclosed-old-refresh-${index}-0001`,
      ],
      failTokenWrite: true,
    },
  ];

  cases.forEach((scenario, index) => {
    const oldAccess = `box-failclosed-old-access-${index}-0001`;
    const oldRefresh = `box-failclosed-old-refresh-${index}-0001`;
    const harness = makeContext({
      properties: boxTestProperties(),
      urlFetch: url => {
        assert.equal(url, 'https://api.box.com/oauth2/token', scenario.name);
        return scenario.response(index);
      },
    });
    installBoxToken(harness, { accessToken: oldAccess, refreshToken: oldRefresh });
    if (scenario.failTokenWrite) {
      const properties = harness.context.PropertiesService.getScriptProperties();
      const originalSet = properties.setProperty.bind(properties);
      let failed = false;
      properties.setProperty = (key, value) => {
        if (!failed && key === 'BOX_OAUTH_TOKEN_V1' &&
            String(value).includes(`box-failclosed-new-access-${index}-0001`)) {
          failed = true;
          throw new Error('simulated active token storage failure');
        }
        return originalSet(key, value);
      };
    }

    assert.throws(
      () => harness.context.mailboxBoxAccessContext_(true, ''),
      error => error && error.mailboxCode === 'BOX_REAUTH_REQUIRED',
      scenario.name
    );
    const queuedTokens = Object.entries(harness.propertyValues)
      .filter(([key]) => key.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_'))
      .map(([, value]) => JSON.parse(value).refreshToken)
      .sort();
    assert.deepEqual(queuedTokens, scenario.expected(index).sort(), scenario.name);
    assert.equal(JSON.parse(harness.propertyValues.BOX_OAUTH_TOKEN_V1).status, 'reauth_required');
    assert.equal(JSON.parse(harness.propertyValues.BOX_OAUTH_REFRESH_JOURNAL_V1).status, 'ambiguous');
  });
});

test('Box callback recovers a transient pending-journal write failure without orphaning the grant', () => {
  const accessToken = 'box-journal-write-access-0001';
  const refreshToken = 'box-journal-write-refresh-0001';
  let revokeCalls = 0;
  let identityCalls = 0;
  const harness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      if (url === 'https://api.box.com/oauth2/token') {
        return jsonResponse({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 3600,
          token_type: 'bearer',
        });
      }
      if (url.startsWith('https://api.box.com/2.0/users/me?')) {
        identityCalls += 1;
        throw new Error('identity must not run before durable pending state');
      }
      if (url === 'https://api.box.com/oauth2/revoke') {
        revokeCalls += 1;
        assert.equal(request.payload.token, refreshToken);
        return jsonResponse({ error: 'temporarily_unavailable' }, 503);
      }
      throw new Error('Unexpected journal-write cleanup URL: ' + url);
    },
  });
  const session = openOwnerSession(harness);
  const started = resultData(rpc(harness, session, 'boxConnectStart', {}));
  const state = new URL(started.authorizationUrl).searchParams.get('state');
  const properties = harness.context.PropertiesService.getScriptProperties();
  const originalSet = properties.setProperty.bind(properties);
  let rejectedOnce = false;
  properties.setProperty = (key, value) => {
    if (!rejectedOnce && key.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_')) {
      rejectedOnce = true;
      throw new Error('simulated transient pending write failure');
    }
    return originalSet(key, value);
  };

  const failed = harness.context.mailboxHandleBoxOAuthCallback_({
    code: 'journal-write-failure-code',
    state,
  });
  assert.equal(failed.ok, false);
  assert.equal(identityCalls, 0);
  assert.equal(revokeCalls, 1);
  const queued = Object.entries(harness.propertyValues)
    .filter(([key]) => key.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_'));
  assert.equal(queued.length, 1);
  assert.equal(JSON.parse(queued[0][1]).kind, 'cleanup');
  assert.equal(JSON.parse(queued[0][1]).refreshToken, refreshToken);
});

test('Box active access fails closed for a matching cleanup queue or corrupt queue', () => {
  const accessToken = 'box-cleanup-gate-access-0001';
  const refreshToken = 'box-cleanup-gate-refresh-0001';
  let matchingCalls = 0;
  const matchingHarness = makeContext({
    properties: boxTestProperties(),
    urlFetch: () => {
      matchingCalls += 1;
      return jsonResponse({ id: '99887766', name: 'Pavlo Box', status: 'active' });
    },
  });
  installBoxToken(matchingHarness, { accessToken, refreshToken });
  matchingHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = 'U'.repeat(43);
  matchingHarness.context.mailboxBoxEnqueuePendingRevocationLocked_(
    matchingHarness.context.PropertiesService.getScriptProperties(),
    refreshToken,
    'cleanup'
  );

  assert.throws(
    () => matchingHarness.context.mailboxBoxApiJsonRequest_('/users/me?fields=id'),
    error => error && error.mailboxCode === 'BOX_CLEANUP_PENDING'
  );
  assert.equal(matchingCalls, 0, 'matching cleanup must block before any Box API request');

  let corruptCalls = 0;
  const corruptHarness = makeContext({
    properties: boxTestProperties(),
    urlFetch: () => {
      corruptCalls += 1;
      return jsonResponse({ id: '99887766', name: 'Pavlo Box', status: 'active' });
    },
  });
  installBoxToken(corruptHarness, { accessToken, refreshToken });
  corruptHarness.propertyValues.BOX_CONNECTION_GENERATION_V1 = 'V'.repeat(43);
  corruptHarness.propertyValues['BOX_OAUTH_PENDING_REVOCATION_V1_' + 'W'.repeat(43)] = '{not-json';

  assert.throws(
    () => corruptHarness.context.mailboxBoxApiJsonRequest_('/users/me?fields=id'),
    error => error && error.mailboxCode === 'BOX_CLEANUP_MANUAL'
  );
  assert.equal(corruptCalls, 0, 'corrupt cleanup state must block before any Box API request');
});

test('Box active access ignores unrelated cleanup and its own committed provisional entry', () => {
  const accessToken = 'box-cleanup-scope-access-0001';
  const refreshToken = 'box-cleanup-scope-refresh-0001';
  let apiCalls = 0;
  const harness = makeContext({
    properties: boxTestProperties(),
    urlFetch: (url, request) => {
      assert.ok(url.startsWith('https://api.box.com/2.0/users/me?'));
      assert.equal(request.headers.Authorization, 'Bearer ' + accessToken);
      apiCalls += 1;
      return jsonResponse({ id: '99887766', name: 'Pavlo Box', status: 'active' });
    },
  });
  installBoxToken(harness, { accessToken, refreshToken });
  harness.propertyValues.BOX_CONNECTION_GENERATION_V1 = 'X'.repeat(43);
  const properties = harness.context.PropertiesService.getScriptProperties();
  harness.context.mailboxBoxEnqueuePendingRevocationLocked_(
    properties,
    'box-unrelated-cleanup-refresh-0001',
    'cleanup'
  );
  const first = harness.context.mailboxBoxApiJsonRequest_('/users/me?fields=id');
  assert.equal(first.id, '99887766');
  assert.equal(apiCalls, 1);

  harness.context.mailboxBoxEnqueuePendingRevocationLocked_(
    properties,
    refreshToken,
    'provisional'
  );
  const second = harness.context.mailboxBoxApiJsonRequest_('/users/me?fields=id');
  assert.equal(second.id, '99887766');
  assert.equal(apiCalls, 2);
});

test('owner-session Drive sources list metadata download and export native Google files as PDF', () => {
  const pdf = Buffer.from('%PDF-1.7\nDrive export\n');
  const binary = Buffer.from('drive binary');
  const harness = makeContext({
    urlFetch: (url, request) => {
      assert.equal(request.headers.Authorization, 'Bearer oauth-token-for-tests');
      if (url.includes('/drive/v3/files?')) return jsonResponse({
        files: [{
          id: 'drive_binary_123', name: 'note.txt', mimeType: 'text/plain', size: String(binary.length),
          modifiedTime: '2026-07-16T10:00:00.000Z', webViewLink: 'https://drive.google.com/file/d/drive_binary_123/view',
          capabilities: { canDownload: true },
        }],
        nextPageToken: 'next_drive_page',
      });
      if (url.includes('/drive/v3/files/drive_binary_123?alt=media')) {
        return httpResponse(binary, 200, { 'Content-Type': 'text/plain', 'Content-Length': String(binary.length) });
      }
      if (url.includes('/drive/v3/files/drive_binary_123?')) return jsonResponse({
        id: 'drive_binary_123', name: 'note.txt', mimeType: 'text/plain', size: String(binary.length),
        modifiedTime: '2026-07-16T10:00:00.000Z', capabilities: { canDownload: true },
      });
      if (url.includes('/drive/v3/files/drive_document_123/export?')) {
        return httpResponse(pdf, 200, { 'Content-Type': 'application/pdf', 'Content-Length': String(pdf.length) });
      }
      if (url.includes('/drive/v3/files/drive_document_123?')) return jsonResponse({
        id: 'drive_document_123', name: 'Plan', mimeType: 'application/vnd.google-apps.document',
        modifiedTime: '2026-07-16T11:00:00.000Z', capabilities: { canDownload: true },
      });
      throw new Error(`Unexpected URL fetch: ${url}`);
    },
  });
  const token = openOwnerSession(harness);
  const listed = resultData(rpc(harness, token, 'sourceList', { provider: 'drive', query: 'note' }));
  assert.equal(listed.items[0].fileId, 'drive_binary_123');
  assert.equal(listed.nextPageToken, 'next_drive_page');
  const metadata = resultData(rpc(harness, token, 'sourceMetadata', {
    source: { provider: 'drive', fileId: 'drive_binary_123' },
  }));
  assert.equal(metadata.mimeType, 'text/plain');
  const downloaded = resultData(rpc(harness, token, 'sourceContent', {
    source: { provider: 'drive', fileId: 'drive_binary_123' }, purpose: 'download',
  }));
  assert.deepEqual(Buffer.from(downloaded.dataBase64Url, 'base64url'), binary);
  const exported = resultData(rpc(harness, token, 'sourceContent', {
    source: { provider: 'drive', fileId: 'drive_document_123', exportAs: 'pdf' }, purpose: 'download',
  }));
  assert.equal(exported.name, 'Plan.pdf');
  assert.equal(exported.mimeType, 'application/pdf');
  assert.deepEqual(Buffer.from(exported.dataBase64Url, 'base64url'), pdf);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'appsscript.json'), 'utf8'));
  assert.ok(manifest.oauthScopes.includes('https://www.googleapis.com/auth/drive.readonly'));
});

test('public HTTPS sources enforce DNS/IP redirects MIME and byte bounds', () => {
  const pdf = Buffer.from('%PDF-1.7\nPublic source\n');
  const target = 'https://files.example.com/report.pdf';
  const harness = makeContext({
    urlFetch: (url, request) => {
      if (url.startsWith('https://dns.google/resolve?')) {
        const params = new URL(url).searchParams;
        const host = params.get('name');
        const type = Number(params.get('type'));
        if (host === 'private.example.com') {
          return jsonResponse({ Answer: type === 1 ? [{ type: 1, data: '10.0.0.7' }] : [] });
        }
        return jsonResponse({ Answer: type === 1
          ? [{ type: 1, data: '93.184.216.34' }]
          : [{ type: 28, data: '2606:2800:220:1:248:1893:25c8:1946' }] });
      }
      if (url === target && String(request.method).toLowerCase() === 'head') {
        return httpResponse('', 200, {
          'Content-Type': 'application/pdf', 'Content-Length': String(pdf.length),
          'Content-Disposition': 'attachment; filename="report.pdf"',
        });
      }
      if (url === target && String(request.method).toLowerCase() === 'get') {
        return httpResponse(pdf, 200, {
          'Content-Type': 'application/pdf', 'Content-Length': String(pdf.length),
          'Content-Disposition': 'attachment; filename="report.pdf"',
        });
      }
      throw new Error(`Unexpected URL fetch: ${url}`);
    },
  });
  const token = openOwnerSession(harness);
  const metadata = resultData(rpc(harness, token, 'sourceMetadata', {
    source: { provider: 'publicHttps', url: target },
  }));
  assert.equal(metadata.name, 'report.pdf');
  assert.equal(metadata.size, pdf.length);
  assert.equal(metadata.originUrl, target);
  assert.equal(metadata.classification, 'direct_file');
  assert.match(metadata.licensingWarning, /право використовувати/i);
  const content = resultData(rpc(harness, token, 'sourceContent', {
    source: { provider: 'publicHttps', url: target }, purpose: 'download', maxBytes: pdf.length,
  }));
  assert.deepEqual(Buffer.from(content.dataBase64Url, 'base64url'), pdf);
  for (const unsafe of [
    'https://127.0.0.1/file.pdf', 'https://2130706433/file.pdf',
    'https://169.254.169.254/file.pdf', 'https://private.example.com/file.pdf',
  ]) {
    resultFailed(rpc(harness, token, 'sourceMetadata', {
      source: { provider: 'publicHttps', url: unsafe },
    }), `unsafe source ${unsafe} must be rejected`);
  }
  assert.equal(harness.urlFetchCalls.some(call => call.url.startsWith('http://')), false);
});

test('the exact query-bearing iStock JPEG URL remains a direct bounded public source', () => {
  const sourceUrl = 'https://media.istockphoto.com/id/1498878143/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D1%82%D0%BE%D0%BF%D0%BA%D0%B0-%D0%BA%D0%BD%D0%B8%D0%B3-%D1%96-%D0%B2%D1%96%D0%B4%D0%BA%D1%80%D0%B8%D1%82%D0%B0-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0-%D0%BD%D0%B0-%D0%BF%D0%B8%D1%81%D1%8C%D0%BC%D0%BE%D0%B2%D0%BE%D0%BC%D1%83-%D1%81%D1%82%D0%BE%D0%BB%D1%96-%D0%B2-%D1%81%D1%83%D1%87%D0%B0%D1%81%D0%BD%D1%96%D0%B9-%D0%BF%D1%83%D0%B1%D0%BB%D1%96%D1%87%D0%BD%D1%96%D0%B9-%D0%B1%D1%96%D0%B1%D0%BB%D1%96%D0%BE%D1%82%D0%B5%D1%86%D1%96.jpg?s=612x612&w=is&k=20&c=f8Ept9tgyGIZ5T3TvZZ5hm2ef4Itk0qNUvunk0X18aE=';
  const jpeg = Buffer.from([255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 255, 217]);
  const harness = makeContext({
    urlFetch: (url, request) => {
      if (url.startsWith('https://dns.google/resolve?')) {
        const type = Number(new URL(url).searchParams.get('type'));
        return jsonResponse({ Answer: type === 1 ? [{ type: 1, data: '18.239.208.55' }] : [] });
      }
      assert.equal(url, sourceUrl, 'the signed query string must survive URL validation unchanged');
      const method = String(request.method).toLowerCase();
      if (method === 'head') return httpResponse('', 200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': String(jpeg.length),
        'Content-Disposition': 'inline; filename=istockphoto-1498878143-612x612.jpg',
      });
      if (method === 'get') return httpResponse(jpeg, 200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': String(jpeg.length),
        'Content-Disposition': 'inline; filename=istockphoto-1498878143-612x612.jpg',
      });
      throw new Error(`Unexpected iStock method: ${method}`);
    },
  });
  const token = openOwnerSession(harness);
  const metadata = resultData(rpc(harness, token, 'sourceMetadata', {
    source: { provider: 'publicHttps', url: sourceUrl },
  }));
  assert.equal(metadata.name, 'istockphoto-1498878143-612x612.jpg');
  assert.equal(metadata.mimeType, 'image/jpeg');
  assert.equal(metadata.size, jpeg.length);
  assert.equal(metadata.url, sourceUrl);
  const content = resultData(rpc(harness, token, 'sourceContent', {
    source: { provider: 'publicHttps', url: sourceUrl }, purpose: 'download', maxBytes: jpeg.length,
  }));
  assert.deepEqual(Buffer.from(content.dataBase64Url, 'base64url'), jpeg);
});

test('share.google resolves only a safe Google imgres target and rejects an HTML share page precisely', () => {
  const shareUrl = 'https://share.google/LmzgSZ4zxkDRxxf1j';
  const googleShareUrl = 'https://www.google.com/share.google?q=LmzgSZ4zxkDRxxf1j';
  const imageUrl = 'https://cdn.intent.press/cache/f6/a8/f6a8d8b2685d80caf4f9372723a8f5d4.jpg';
  const imgresUrl = 'https://www.google.com/imgres?imgurl=' + encodeURIComponent(imageUrl) +
    '&imgrefurl=' + encodeURIComponent('https://intent.press/example');
  const badShareUrl = 'https://share.google/not-a-download';
  const badGoogleUrl = 'https://www.google.com/share.google?q=missing';
  const jpeg = Buffer.from([255, 216, 255, 225, 1, 2, 3, 4, 255, 217]);
  const harness = makeContext({
    urlFetch: (url, request) => {
      if (url.startsWith('https://dns.google/resolve?')) {
        const type = Number(new URL(url).searchParams.get('type'));
        return jsonResponse({ Answer: type === 1 ? [{ type: 1, data: '142.251.151.119' }] : [] });
      }
      const method = String(request.method).toLowerCase();
      if (url === shareUrl) return httpResponse('', 302, { Location: googleShareUrl });
      if (url === googleShareUrl) return httpResponse('', 301, { Location: imgresUrl });
      if (url === imageUrl && method === 'head') return httpResponse('', 200, {
        'Content-Type': 'image/jpeg', 'Content-Length': String(jpeg.length),
      });
      if (url === imageUrl && method === 'get') return httpResponse(jpeg, 200, {
        'Content-Type': 'image/jpeg', 'Content-Length': String(jpeg.length),
      });
      if (url === badShareUrl) return httpResponse('', 302, { Location: badGoogleUrl });
      if (url === badGoogleUrl) return httpResponse('<html>Google share page</html>', 200, {
        'Content-Type': 'text/html; charset=UTF-8', 'Content-Length': '30',
      });
      throw new Error(`Unexpected Google share fetch: ${url}`);
    },
  });
  const token = openOwnerSession(harness);
  const metadata = resultData(rpc(harness, token, 'sourceMetadata', {
    source: { provider: 'publicHttps', url: shareUrl },
  }));
  assert.equal(metadata.url, imageUrl);
  assert.equal(metadata.originUrl, shareUrl);
  assert.equal(metadata.classification, 'wrapper_file');
  assert.equal(metadata.mimeType, 'image/jpeg');
  const content = resultData(rpc(harness, token, 'sourceContent', {
    source: { provider: 'publicHttps', url: shareUrl }, purpose: 'download', maxBytes: jpeg.length,
  }));
  assert.deepEqual(Buffer.from(content.dataBase64Url, 'base64url'), jpeg);
  assert.equal(harness.urlFetchCalls.some(call => call.url === imgresUrl), false,
    'the Google HTML imgres wrapper must never be fetched as attachment content');

  const explicitWrapper = 'https://www.google.com/url?url=' + encodeURIComponent(imageUrl);
  const explicitMetadata = resultData(rpc(harness, token, 'sourceMetadata', {
    source: { provider: 'publicHttps', url: explicitWrapper },
  }));
  assert.equal(explicitMetadata.url, imageUrl);
  assert.equal(explicitMetadata.originUrl, explicitWrapper);
  assert.equal(explicitMetadata.classification, 'wrapper_file');
  assert.equal(harness.urlFetchCalls.some(call => call.url === explicitWrapper), false,
    'an explicit Google redirect wrapper must not be fetched as attachment content');

  const googleSearch = 'https://www.google.com/search?tbm=isch&q=books';
  const searchError = resultFailed(rpc(harness, token, 'sourceMetadata', {
    source: { provider: 'publicHttps', url: googleSearch },
  }));
  assert.equal(searchError.code, 'SOURCE_AMBIGUOUS');
  assert.match(searchError.message, /сторінка результатів|адресу самого зображення/i);
  assert.equal(harness.urlFetchCalls.some(call => call.url === googleSearch), false,
    'an ambiguous Google result page must be classified without fetching its HTML');

  const htmlError = resultFailed(rpc(harness, token, 'sourceMetadata', {
    source: { provider: 'publicHttps', url: badShareUrl },
  }));
  assert.equal(htmlError.code, 'SOURCE_NOT_DOWNLOADABLE');
  assert.match(htmlError.message, /вебсторінку|прямий файл/i);

  for (const maliciousTarget of [
    'http://example.com/file.jpg',
    'https://127.0.0.1/file.jpg',
    'https://user:pass@example.com/file.jpg',
  ]) {
    const maliciousImgres = 'https://www.google.com/imgres?imgurl=' + encodeURIComponent(maliciousTarget);
    const error = resultFailed(rpc(harness, token, 'sourceMetadata', {
      source: { provider: 'publicHttps', url: maliciousImgres },
    }));
    assert.ok(['INVALID_SOURCE_URL', 'PRIVATE_SOURCE_URL'].includes(error.code));
  }

  for (const invalidWrapper of [
    'https://www.google.com/imgres?imgrefurl=' + encodeURIComponent('https://intent.press/example'),
    'https://www.google.com/imgres?imgurl=' + encodeURIComponent(imageUrl) +
      '&imgurl=' + encodeURIComponent('https://example.com/other.jpg'),
  ]) {
    const error = resultFailed(rpc(harness, token, 'sourceMetadata', {
      source: { provider: 'publicHttps', url: invalidWrapper },
    }));
    assert.equal(error.code, 'SOURCE_NOT_DOWNLOADABLE');
  }
});

test('saveDraft resolves source refs transiently and maps attachment tokens to regular CID attachments', () => {
  const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 1, 2, 3, 4]);
  let writtenRaw = '';
  let messageIdHeader = '';
  const harness = makeContext({
    urlFetch: url => {
      if (url.includes('/drive/v3/files/drive_image_123?alt=media')) {
        return httpResponse(png, 200, { 'Content-Type': 'image/png', 'Content-Length': String(png.length) });
      }
      if (url.includes('/drive/v3/files/drive_image_123?')) return jsonResponse({
        id: 'drive_image_123', name: 'hero.png', mimeType: 'image/png', size: String(png.length),
        capabilities: { canDownload: true },
      });
      throw new Error(`Unexpected URL fetch: ${url}`);
    },
  });
  const token = openOwnerSession(harness);
  harness.setGmail((requestPath, options) => {
    if (requestPath === '/drafts') {
      writtenRaw = decodeBase64Url(options.body.message.raw);
      messageIdHeader = draftOperationMessageId(options.body);
      return { id: 'draft_source_1', message: { id: 'message_source_1', threadId: 'thread_source_1' } };
    }
    if (requestPath === '/drafts/draft_source_1?format=full') return {
      id: 'draft_source_1',
      message: {
        id: 'message_source_1', threadId: 'thread_source_1', labelIds: ['DRAFT'],
        payload: { headers: [{ name: 'Message-ID', value: messageIdHeader }], parts: [] },
      },
    };
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const saveResult = rpc(harness, token, 'saveDraft', {
    to: 'recipient@example.com', subject: 'Source image', bodyText: 'Hero',
    bodyHtml: '<p>Hero <img src="attachment:driveHero" alt="Hero"></p>',
    attachments: [{
      token: 'driveHero', source: { provider: 'drive', fileId: 'drive_image_123' },
    }],
  });
  assert.ok(saveResult.ok || saveResult.error && saveResult.error.code === 'DRAFT_PENDING',
    'the mock readback may stay pending only after the canonical Gmail draft POST');
  assert.match(writtenRaw, /src="cid:inline\.[A-Za-z0-9]+@gmail-telegram\.local"/);
  assert.match(writtenRaw, /Content-ID:\s*<inline\.[A-Za-z0-9]+@gmail-telegram\.local>/);
  assert.match(writtenRaw, /Content-Disposition:\s*attachment;/i);
  assert.ok(writtenRaw.includes(png.toString('base64')));
  const serializedState = JSON.stringify(harness.propertyValues) + JSON.stringify(Array.from(harness.cacheValues.values()));
  assert.equal(serializedState.includes(png.toString('base64')), false,
    'resolved attachment bytes must never persist in properties or cache');
});

test('incoming CID HTML keeps stable attachment refs and exact Undo does not invent Inbox state', () => {
  const harness = makeContext();
  const { context } = harness;
  const message = {
    id: 'message_cid_123', threadId: 'thread_cid_123', labelIds: [], internalDate: '1710000000000',
    payload: { headers: [{ name: 'From', value: 'sender@example.com' }] },
  };
  const dto = context.mailboxMessageDto_(message, {
    plain: 'Logo', html: '<p><img src="cid:logo@example.com" alt="Logo"></p>', attachments: [],
    inlineAttachments: [{
      partId: '2.1', attachmentId: 'attachment_cid_123', name: 'logo.png', mimeType: 'image/png',
      size: 12, contentId: 'logo@example.com', data: 'must-not-cross',
    }],
  });
  assert.equal(dto.inlineAttachments.length, 1);
  assert.match(dto.bodyHtml, new RegExp(`src="attachment:${dto.inlineAttachments[0].token}"`));
  assert.equal(dto.inlineAttachments[0].localRef, `attachment:${dto.inlineAttachments[0].token}`);
  assert.doesNotMatch(JSON.stringify(dto), /must-not-cross/);

  const token = openOwnerSession(harness);
  const writes = [];
  harness.setGmail((requestPath, options) => {
    if (requestPath.startsWith('/threads/thread_archived_exact?')) return {
      id: 'thread_archived_exact', messages: [{ id: 'message_archived_exact', labelIds: [] }],
    };
    if (requestPath === '/threads/thread_archived_exact/modify') {
      writes.push({ requestPath, body: options.body });
      return { id: 'thread_archived_exact' };
    }
    if (requestPath === '/messages/message_archived_exact/modify') {
      writes.push({ requestPath, body: options.body });
      return { id: 'message_archived_exact' };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const archived = resultData(rpc(harness, token, 'action', {
    threadId: 'thread_archived_exact', action: 'archive',
  }));
  resultData(rpc(harness, token, archived.undo.op, {
    threadId: archived.undo.threadId, action: archived.undo.action, undoToken: archived.undo.undoToken,
  }));
  assert.equal(writes.filter(write => write.requestPath.includes('/messages/')).length, 0,
    'Undo of a no-op archive must not add INBOX');
});

test('multi-account workspaces isolate Telegram users and issue only official one-use Google OAuth starts', () => {
  const harness = makeContext({
    properties: {
      GOOGLE_OAUTH_CLIENT_ID: '123456789-unit-test.apps.googleusercontent.com',
      GOOGLE_OAUTH_CLIENT_SECRET: 'unit-test-google-client-secret-123456789',
      GOOGLE_OAUTH_REDIRECT_URI:
        'https://script.google.com/macros/s/unit-test-deployment_123/exec?action=gmail_oauth_callback',
    },
  });
  const ownerSession = resultData(harness.context.mailboxOpenSession(telegramInitData())).sessionToken;
  const otherUserId = '999999999';
  const otherSession = resultData(
    harness.context.mailboxOpenSession(telegramInitData(otherUserId))
  ).sessionToken;
  const otherBootstrap = resultData(rpc(harness, otherSession, 'bootstrap'));
  assert.equal(otherBootstrap.needsGoogleConnection, true);
  assert.deepEqual(otherBootstrap.accounts, []);

  const registry = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 ||
    JSON.stringify(harness.context.mailboxMultiInitialRegistry_(OWNER_ID)));
  const otherZone = registry.members.find(item => item.userId === otherUserId).zoneId;
  registry.connections.push({
    id: 'gmail-other-unit',
    zoneId: otherZone,
    provider: 'google_oauth',
    email: 'other@example.com',
    displayName: 'Other User',
    avatarUrl: '',
    status: 'active',
    connectedByUserId: otherUserId,
    connectedAt: Date.now(),
    tokenGeneration: 1,
  });
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);

  assert.equal(
    resultFailed(rpc(harness, ownerSession, 'switchAccount', { connectionId: 'gmail-other-unit' })).code,
    'FORBIDDEN',
    'an opaque connection ID must not cross Telegram-user zones'
  );
  const selected = resultData(rpc(harness, otherSession, 'switchAccount', {
    connectionId: 'gmail-other-unit',
  }));
  assert.equal(selected.connectionId, 'gmail-other-unit');
  const settings = resultData(rpc(harness, otherSession, 'updateAccountSettings', {
    activeConnectionId: 'gmail-other-unit',
    unifiedConnectionIds: ['gmail-other-unit'],
    notificationConnectionIds: [],
    notificationMode: 'important',
  }));
  assert.deepEqual(settings.unifiedConnectionIds, ['gmail-other-unit']);
  assert.deepEqual(settings.notificationConnectionIds, []);
  assert.equal(settings.notificationMode, 'important');
  assert.equal(
    resultFailed(rpc(harness, ownerSession, 'updateAccountSettings', {
      activeConnectionId: 'gmail-other-unit',
      unifiedConnectionIds: ['gmail-other-unit'],
      notificationConnectionIds: ['gmail-other-unit'],
      notificationMode: 'all',
    })).code,
    'FORBIDDEN'
  );

  const oauth = resultData(rpc(harness, otherSession, 'connectGoogleStart', {
    zoneId: otherZone,
    loginHint: 'other@example.com',
  }));
  const authorization = new URL(oauth.authorizationUrl);
  assert.equal(authorization.origin, 'https://accounts.google.com');
  assert.equal(authorization.pathname, '/o/oauth2/v2/auth');
  assert.equal(authorization.searchParams.get('access_type'), 'offline');
  assert.equal(authorization.searchParams.get('prompt'), 'select_account');
  assert.equal(
    authorization.searchParams.get('redirect_uri'),
    'https://tarasevych.github.io/gmail-telegram-controls/gmail-oauth-callback.html',
  );
  assert.match(authorization.searchParams.get('scope'), /gmail\.settings\.basic/);
  assert.equal(authorization.searchParams.get('login_hint'), 'other@example.com');
  assert.match(authorization.searchParams.get('state'), /^[A-Za-z0-9_-]{43}$/);
  assert.doesNotMatch(oauth.authorizationUrl, /client_secret|refresh_token|BOT_TOKEN/i);
  const launch = new URL(oauth.launchUrl);
  assert.equal(launch.origin, 'https://tarasevych.github.io');
  assert.equal(launch.pathname, '/gmail-telegram-controls/gmail-oauth-callback.html');
  assert.equal(launch.searchParams.get('start'), '1');
  assert.equal(launch.searchParams.get('state'), authorization.searchParams.get('state'));
  assert.equal(launch.searchParams.get('client'), '123456789-unit-test.apps.googleusercontent.com');
  assert.equal(
    harness.context.mailboxGoogleResolveOAuthStart_(launch.searchParams.get('state')).authorizationUrl,
    oauth.authorizationUrl,
  );
  const pendingState = JSON.parse(harness.propertyValues.MAILBOX_GOOGLE_OAUTH_STATES_V1)[0];
  assert.equal(pendingState.v, 2);
  assert.equal(pendingState.userId, otherUserId);
  assert.equal(pendingState.chatId, otherUserId);
  assert.equal(pendingState.returnTo, 'telegram');
  harness.context.mailboxGoogleConsumeState_(launch.searchParams.get('state'));
  assert.throws(() => harness.context.mailboxGoogleResolveOAuthStart_(launch.searchParams.get('state')),
    /використано|завершилося/);
});

test('Telegram settings expose only the requesting user Gmail zone and exact per-account sync status', () => {
  const harness = makeContext({ properties: {
    GOOGLE_OAUTH_CLIENT_ID: '123456789-unit-test.apps.googleusercontent.com',
    GOOGLE_OAUTH_CLIENT_SECRET: 'unit-test-google-client-secret-123456789',
    GOOGLE_OAUTH_REDIRECT_URI:
      'https://script.google.com/macros/s/unit-test-deployment_123/exec?action=gmail_oauth_callback',
  } });
  openOwnerSession(harness);
  const otherUserId = '999999999';
  resultData(harness.context.mailboxOpenSession(telegramInitData(otherUserId)));
  const registry = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1);
  const otherZone = registry.members.find(item => item.userId === otherUserId).zoneId;
  registry.connections.push({
    id: 'gmail-owner-private', zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'owner-private@example.com', displayName: 'Owner private', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  }, {
    id: 'gmail-other-settings', zoneId: otherZone, provider: 'google_oauth',
    email: 'other-settings@example.com', displayName: 'Other settings', avatarUrl: '', status: 'active',
    connectedByUserId: otherUserId, connectedAt: Date.now(), tokenGeneration: 1,
  }, {
    id: 'gmail-other-second', zoneId: otherZone, provider: 'google_oauth',
    email: 'other-second@example.com', displayName: 'Other second', avatarUrl: '', status: 'active',
    connectedByUserId: otherUserId, connectedAt: Date.now(), tokenGeneration: 1,
  });
  const otherPreference = registry.preferences.find(item => item.userId === otherUserId);
  otherPreference.activeConnectionId = 'gmail-other-settings';
  otherPreference.unifiedConnectionIds = ['gmail-other-settings'];
  otherPreference.notificationConnectionIds = ['gmail-other-settings'];
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);
  const syncKey = harness.context.mailboxMetadataSyncPropertyKey_('gmail-other-settings');
  harness.propertyValues[syncKey] = JSON.stringify({
    v: 1, connectionId: 'gmail-other-settings', zoneId: otherZone, tokenGeneration: 1,
    state: 'healthy', leaseToken: '', leaseUntil: 0, version: 'a'.repeat(43),
    labelsVersion: 'b'.repeat(43), sendAsVersion: 'c'.repeat(43), settingsVersion: 'd'.repeat(43),
    lastCheckedAt: Date.now(), lastChangedAt: Date.now(), nextCheckAt: Date.now() + 300000,
    failures: 0, errorCode: '',
  });
  const deliveries = [];
  harness.context.sendTelegramText_ = (text, markup, options) => deliveries.push({ text, markup, options });
  const result = harness.context.sendSettingsMenu_(otherUserId, otherUserId);
  assert.equal(result.message, 'Налаштування Gmail оновлено');
  assert.equal(deliveries.length, 1);
  assert.equal(deliveries[0].options.chatId, otherUserId);
  assert.match(deliveries[0].text, /other-settings@example\.com/);
  assert.match(deliveries[0].text, /синхронізовано/);
  assert.doesNotMatch(deliveries[0].text, /owner-private@example\.com|Павло Тарасевич/);
  assert.doesNotMatch(deliveries[0].markup, /client_secret|refresh_token|BOT_TOKEN/i);
  const buttons = JSON.parse(deliveries[0].markup).inline_keyboard.flat();
  const secondButton = buttons.find(button => button.callback_data === 'ga.gmail-other-second');
  const addButton = buttons.find(button => button.text === '＋ Додати Gmail-акаунт');
  const nativeMailButton = buttons.find(button => button.text === '📬 Листи в чаті');
  assert.ok(secondButton, 'every visible sibling Gmail must have a native Telegram switch button');
  assert.equal(nativeMailButton.callback_data, 'mail.browse');
  assert.equal(buttons.some(button => button.web_app), false,
    'account management must not enter an Apps Script webview');
  assert.match(addButton.url,
    /^https:\/\/tarasevych\.github\.io\/gmail-telegram-controls\/gmail-oauth-callback\.html\?start=1&state=[A-Za-z0-9_-]{43}&client=123456789-unit-test\.apps\.googleusercontent\.com$/);
  const parsed = harness.context.parseTelegramGmailAccountCallback_(secondButton.callback_data);
  assert.deepEqual({ ...harness.context.parseTelegramGmailSettingsPageCallback_('gp.a') }, { page: 10 });
  assert.equal(harness.context.parseTelegramGmailSettingsPageCallback_('gp.!'), null);
  const switched = harness.context.switchTelegramGmailAccount_(otherUserId, otherUserId, parsed.connectionId);
  assert.equal(switched.message, 'Активна Gmail: other-second@example.com');
  const switchedRegistry = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1);
  assert.equal(switchedRegistry.preferences.find(item => item.userId === otherUserId).activeConnectionId,
    'gmail-other-second');
  assert.throws(() => harness.context.switchTelegramGmailAccount_(OWNER_ID, OWNER_ID, parsed.connectionId),
    /іншій поштовій зоні/);
});

test('Gmail metadata is connection-scoped and user labels use optimistic guarded CRUD', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const userLabel = {
    id: 'Label_project', name: 'Проєкт', type: 'user',
    messageListVisibility: 'show', labelListVisibility: 'labelShow',
    color: { backgroundColor: '#16a766', textColor: '#ffffff' },
  };
  const calls = [];
  harness.setGmail((requestPath, options) => {
    calls.push({ requestPath, method: String(options.method || 'get').toLowerCase(), body: options.body });
    if (requestPath === '/labels' && String(options.method || 'get').toLowerCase() === 'get') {
      return { labels: [userLabel, { id: 'INBOX', name: 'INBOX', type: 'system' }] };
    }
    if (requestPath === '/profile') return { emailAddress: 'owner@example.com', historyId: '123' };
    if (requestPath === '/settings/sendAs') return { sendAs: [{ sendAsEmail: 'owner@example.com', isPrimary: true, isDefault: true }] };
    if (requestPath === '/settings/language') return { displayLanguage: 'uk', providerOnly: 'drop-me' };
    if (requestPath === '/settings/imap') return {
      enabled: true, autoExpunge: false, expungeBehavior: 'archive', maxFolderSize: 1000,
      providerOnly: 'drop-me',
    };
    if (requestPath === '/settings/pop') return {
      accessWindow: 'fromNowOn', disposition: 'leaveInInbox', providerOnly: 'drop-me',
    };
    if (requestPath === '/settings/vacation') return {
      enableAutoReply: true, responseSubject: 'Відпустка', responseBodyPlainText: 'Повернуся скоро',
      responseBodyHtml: '<img src=x onerror=alert(1)>', restrictToContacts: true,
      restrictToDomain: false, startTime: '100', endTime: '200', providerOnly: 'drop-me',
    };
    if (requestPath === '/settings/filters') return { filter: [{
      id: 'filter-1', providerOnly: 'drop-me',
      criteria: { from: 'sender@example.com', query: 'has:attachment', hasAttachment: true, providerOnly: 'drop-me' },
      action: { addLabelIds: ['Label_project', 'bad/id'], removeLabelIds: ['INBOX'], forward: 'owner@example.com', providerOnly: 'drop-me' },
    }] };
    if (requestPath === '/labels' && options.method === 'post') {
      return { ...userLabel, id: 'Label_created', name: options.body.name };
    }
    if (requestPath === '/labels/Label_project' && options.method === 'patch') {
      return { ...userLabel, ...options.body };
    }
    if (requestPath === '/labels/Label_project' && options.method === 'delete') return {};
    throw new Error(`Unexpected Gmail metadata request: ${requestPath}`);
  });

  const metadata = resultData(rpc(harness, token, 'metadata', {}));
  assert.equal(metadata.account.email, 'owner@example.com');
  assert.match(metadata.version, /^[A-Za-z0-9_-]{43}$/);
  const label = metadata.labels.find(item => item.id === 'Label_project');
  assert.equal(label.type, 'user');
  assert.equal(label.canEdit, true);
  assert.match(label.version, /^[A-Za-z0-9_-]{43}$/);
  assert.equal(metadata.labels.find(item => item.id === 'INBOX').canEdit, false);
  assert.equal(metadata.settings.language.value.displayLanguage, 'uk');
  assert.deepEqual(Object.keys(metadata.settings.language.value), ['displayLanguage']);
  assert.equal(metadata.settings.imap.value.enabled, true);
  assert.equal(metadata.settings.imap.value.autoExpunge, false);
  assert.equal(metadata.settings.imap.value.expungeBehavior, 'archive');
  assert.equal(metadata.settings.imap.value.maxFolderSize, 1000);
  assert.equal(Object.keys(metadata.settings.imap.value).length, 4);
  assert.equal(metadata.settings.vacation.value.responseBodyHtml, undefined);
  assert.equal(metadata.settings.vacation.value.providerOnly, undefined);
  assert.equal(metadata.settings.filters.value[0].providerOnly, undefined);
  assert.equal(metadata.settings.filters.value[0].criteria.providerOnly, undefined);
  assert.equal(metadata.settings.filters.value[0].action.addLabelIds.join(','), 'Label_project');

  const created = resultData(rpc(harness, token, 'labelAdmin', { action: 'create', name: 'Нова мітка' }));
  assert.equal(created.label.name, 'Нова мітка');
  const nested = resultData(rpc(harness, token, 'labelAdmin', {
    action: 'create', name: 'Проєкти / 2026 / Дослідження',
  }));
  assert.equal(nested.label.name, 'Проєкти/2026/Дослідження');
  assert.ok(calls.some(call => call.requestPath === '/labels' && call.method === 'post' &&
    call.body.name === 'Проєкти/2026/Дослідження'));
  assert.equal(resultFailed(rpc(harness, token, 'labelAdmin', {
    action: 'create', name: 'Проєкти//Порожній рівень',
  })).code, 'INVALID_LABEL');
  assert.equal(resultFailed(rpc(harness, token, 'labelAdmin', {
    action: 'create', name: `Небезпечна\u0000мітка`,
  })).code, 'INVALID_LABEL');
  const updated = resultData(rpc(harness, token, 'labelAdmin', {
    action: 'update', labelId: label.id, expectedVersion: label.version, name: 'Оновлений проєкт',
  }));
  assert.equal(updated.label.name, 'Оновлений проєкт');
  assert.equal(resultFailed(rpc(harness, token, 'labelAdmin', {
    action: 'delete', labelId: label.id, expectedVersion: '0'.repeat(64), confirmDelete: 'DELETE_LABEL',
  })).code, 'METADATA_CONFLICT');
  assert.equal(resultFailed(rpc(harness, token, 'labelAdmin', {
    action: 'delete', labelId: label.id, expectedVersion: label.version,
  })).code, 'CONFIRM_REQUIRED');
  const deleted = resultData(rpc(harness, token, 'labelAdmin', {
    action: 'delete', labelId: label.id, expectedVersion: label.version, confirmDelete: 'DELETE_LABEL',
  }));
  assert.equal(deleted.deletedLabelId, label.id);
  assert.ok(calls.some(call => call.requestPath === '/labels/Label_project' && call.method === 'delete'));
  assert.equal(resultFailed(rpc(harness, token, 'labelAdmin', {
    action: 'update', labelId: 'INBOX', expectedVersion: metadata.labels.find(item => item.id === 'INBOX').version,
    name: 'Не можна',
  })).code, 'INVALID_LABEL');
});

test('label administration trusts Gmail type for system-like hidden and localized names', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const labels = [
    {
      id: 'Label_inbox_child', name: 'INBOX/Проєкт', type: 'user',
      messageListVisibility: 'hide', labelListVisibility: 'labelHide',
      color: { backgroundColor: '#16a766', textColor: '#ffffff' },
    },
    {
      id: 'Label_imap_archive', name: '[Imap]/Archive', type: 'user',
      messageListVisibility: 'show', labelListVisibility: 'labelShowIfUnread',
    },
    {
      id: 'Label_localized', name: 'Вхідні/Команда', type: 'user',
      messageListVisibility: 'show', labelListVisibility: 'labelShow',
    },
    { id: 'INBOX', name: 'Inbox', type: 'system' },
    { id: 'Label_system_named_project', name: 'Проєкт', type: 'system' },
  ];
  const calls = [];
  harness.setGmail((requestPath, options) => {
    const method = String(options.method || 'get').toLowerCase();
    calls.push({ requestPath, method, body: options.body });
    if (requestPath === '/labels' && method === 'get') return { labels };
    if (requestPath === '/profile') return { emailAddress: 'owner@example.com', historyId: '321' };
    if (requestPath === '/settings/sendAs') {
      return { sendAs: [{ sendAsEmail: 'owner@example.com', isPrimary: true, isDefault: true }] };
    }
    if (requestPath.startsWith('/settings/')) return {};
    if (requestPath === '/labels/Label_inbox_child' && method === 'patch') {
      return { ...labels[0], ...options.body };
    }
    throw new Error(`Unexpected Gmail label regression request: ${requestPath}`);
  });

  const metadata = resultData(rpc(harness, token, 'metadata', {}));
  ['Label_inbox_child', 'Label_imap_archive', 'Label_localized'].forEach(id => {
    const label = metadata.labels.find(item => item.id === id);
    assert.equal(label.type, 'user');
    assert.equal(label.canEdit, true);
    assert.equal(label.canApply, true);
  });
  const hidden = metadata.labels.find(item => item.id === 'Label_inbox_child');
  assert.equal(hidden.messageListVisibility, 'hide');
  assert.equal(hidden.labelListVisibility, 'labelHide');
  assert.equal(metadata.labels.find(item => item.id === 'INBOX').canEdit, false);
  assert.equal(metadata.labels.find(item => item.id === 'Label_system_named_project').canEdit, false);

  const updated = resultData(rpc(harness, token, 'labelAdmin', {
    action: 'update',
    labelId: hidden.id,
    expectedVersion: hidden.version,
    name: 'INBOX/Оновлений проєкт',
  }));
  assert.equal(updated.label.name, 'INBOX/Оновлений проєкт');
  assert.ok(calls.some(call =>
    call.requestPath === '/labels/Label_inbox_child' &&
    call.method === 'patch' &&
    call.body.name === 'INBOX/Оновлений проєкт'
  ));

  const system = metadata.labels.find(item => item.id === 'Label_system_named_project');
  assert.equal(resultFailed(rpc(harness, token, 'labelAdmin', {
    action: 'update',
    labelId: system.id,
    expectedVersion: system.version,
    name: 'Не можна',
  })).code, 'INVALID_LABEL');
});

test('Gmail label administration reports a dedicated permission state without exposing provider details', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  harness.setGmail(() => {
    const error = new Error('provider detail must not cross the boundary');
    error.gmailHttpStatus = 403;
    throw error;
  });
  const failure = resultFailed(rpc(harness, token, 'labelAdmin', { action: 'create', name: 'Контрольована мітка' }));
  assert.equal(failure.code, 'LABEL_PERMISSION_REQUIRED');
  assert.match(failure.message, /бракує дозволу/);
  assert.doesNotMatch(failure.message, /provider detail/);
});

test('per-account metadata reconciliation is read-only isolated leased and invalidates only changed send-as cache', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const registry = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 ||
    JSON.stringify(harness.context.mailboxMultiInitialRegistry_(OWNER_ID)));
  registry.connections.push({
    id: 'gmail-owner-second', zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'second@example.com', displayName: 'Second', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  });
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);

  let secondRevision = 1;
  let failSecond = false;
  harness.setGmail((requestPath, options) => {
    assert.equal(String(options.method || 'get').toLowerCase(), 'get',
      'metadata reconciliation must never mutate Gmail');
    const connectionId = harness.context.mailboxCurrentAccountContext_().id;
    const second = connectionId === 'gmail-owner-second';
    const email = second ? 'second@example.com' : 'owner@example.com';
    if (failSecond && second && requestPath === '/labels') {
      const error = new Error('temporary metadata outage');
      error.mailboxCode = 'TEMPORARY_GMAIL';
      throw error;
    }
    if (requestPath === '/labels') return { labels: [{
      id: second ? 'Label_second' : 'Label_owner',
      name: second ? `Second ${secondRevision}` : 'Owner', type: 'user',
    }] };
    if (requestPath === '/profile') return { emailAddress: email, historyId: second ? '200' : '100' };
    if (requestPath === '/settings/sendAs') return { sendAs: [{
      sendAsEmail: second && secondRevision > 1 ? 'alias.second@example.com' : email,
      isPrimary: true, isDefault: true,
    }] };
    if (requestPath === '/settings/language') return { displayLanguage: second ? 'en' : 'uk' };
    if (requestPath === '/settings/imap') return { enabled: true, autoExpunge: true };
    if (requestPath === '/settings/pop') return { accessWindow: 'disabled', disposition: 'leaveInInbox' };
    if (requestPath === '/settings/vacation') return { enableAutoReply: false };
    if (requestPath === '/settings/filters') return { filter: [] };
    throw new Error(`Unexpected Gmail metadata request: ${requestPath}`);
  });

  const first = harness.context.mailboxProcessMetadataReconciliations_(2);
  assert.deepEqual(JSON.parse(JSON.stringify(first)), { processed: 2, changed: 0, failed: 0, stale: 0 });
  const keys = Object.keys(harness.propertyValues)
    .filter(key => key.startsWith('MAILBOX_METADATA_SYNC_V1_'));
  assert.equal(keys.length, 2);
  const records = keys.map(key => JSON.parse(harness.propertyValues[key]));
  assert.deepEqual(records.map(item => item.connectionId).sort(), ['gmail-owner', 'gmail-owner-second']);
  assert.ok(records.every(item => item.state === 'healthy' && item.version && item.nextCheckAt > item.lastCheckedAt));
  assert.equal(new Set(records.map(item => item.version)).size, 2,
    'metadata fingerprints must remain connection-specific');

  harness.cacheValues.set('mailbox.sendas.v1.gmail-owner', 'owner-cache');
  harness.cacheValues.set('mailbox.sendas.v1.gmail-owner-second', 'second-cache');
  const secondKey = keys.find(key => JSON.parse(harness.propertyValues[key]).connectionId === 'gmail-owner-second');
  let secondRecord = JSON.parse(harness.propertyValues[secondKey]);
  secondRecord.state = 'checking';
  secondRecord.leaseToken = 'active-lease';
  secondRecord.leaseUntil = Date.now() + 60000;
  secondRecord.nextCheckAt = 0;
  harness.propertyValues[secondKey] = JSON.stringify(secondRecord);
  const callsBeforeLeaseCheck = harness.gmailCalls.length;
  assert.equal(harness.context.mailboxProcessMetadataReconciliations_(1).processed, 0);
  assert.equal(harness.gmailCalls.length, callsBeforeLeaseCheck,
    'an active lease must prevent a duplicate provider read');

  secondRecord = JSON.parse(harness.propertyValues[secondKey]);
  secondRecord.state = 'healthy';
  secondRecord.leaseToken = '';
  secondRecord.leaseUntil = 0;
  secondRecord.nextCheckAt = 0;
  harness.propertyValues[secondKey] = JSON.stringify(secondRecord);
  secondRevision = 2;
  const changed = harness.context.mailboxProcessMetadataReconciliations_(1);
  assert.equal(changed.changed, 1);
  assert.equal(harness.cacheValues.has('mailbox.sendas.v1.gmail-owner-second'), false);
  assert.equal(harness.cacheValues.get('mailbox.sendas.v1.gmail-owner'), 'owner-cache',
    'a changed Gmail account must not evict another account cache');

  resultData(rpc(harness, token, 'switchAccount', { connectionId: 'gmail-owner-second' }));
  const metadata = resultData(rpc(harness, token, 'metadata', {}));
  assert.equal(metadata.account.id, 'gmail-owner-second');
  assert.equal(metadata.sync.state, 'healthy');
  assert.equal(metadata.sync.current, true);
  assert.ok(metadata.sync.lastCheckedAt > 0);

  secondRecord = JSON.parse(harness.propertyValues[secondKey]);
  const stableVersion = secondRecord.version;
  secondRecord.nextCheckAt = 0;
  harness.propertyValues[secondKey] = JSON.stringify(secondRecord);
  failSecond = true;
  const failed = harness.context.mailboxProcessMetadataReconciliations_(1);
  assert.equal(failed.failed, 1);
  const degraded = JSON.parse(harness.propertyValues[secondKey]);
  assert.equal(degraded.state, 'degraded');
  assert.equal(degraded.version, stableVersion, 'a failed read must preserve the last proven fingerprint');
  assert.equal(degraded.failures, 1);
  assert.equal(degraded.errorCode, 'TEMPORARY_GMAIL');
  assert.ok(degraded.nextCheckAt > degraded.lastCheckedAt, 'failures must use a bounded retry backoff');
});

test('ADHD focus rules and manual priorities stay scoped to the Telegram user and Gmail connection', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const initial = resultData(rpc(harness, token, 'focusConfig', {}));
  assert.equal(initial.revision, 0);
  assert.equal(initial.rules.length, 0);
  assert.equal(initial.manualCount, 0);
  assert.equal(initial.levels.map(item => item.key).join(','), 'low,medium,high,critical');

  const configured = resultData(rpc(harness, token, 'focusRuleAdmin', {
    action: 'create', expectedRevision: 0, name: 'Соціальний працівник',
    enabled: true, priority: 'critical', color: '#d93025', match: 'any',
    conditions: { fromEmail: 'worker@example.com', subjectContains: 'соціальна допомога' },
  }));
  assert.equal(configured.revision, 1);
  assert.equal(configured.rules.length, 1);
  assert.equal(configured.rules[0].priority, 'critical');
  assert.equal(configured.rules[0].conditions.fromEmail, 'worker@example.com');
  assert.equal(configured.rules[0].conditions.subjectContains, 'соціальна допомога');

  const registryKey = Object.keys(harness.propertyValues).find(key => key.startsWith('MAILBOX_FOCUS_V1_'));
  assert.ok(registryKey, 'focus preferences must use an isolated opaque property key');
  assert.doesNotMatch(registryKey, new RegExp(OWNER_ID));
  const registry = JSON.parse(harness.propertyValues[registryKey]);
  const automatic = harness.context.mailboxFocusEvaluate_(registry, {
    id: 'thread_auto', subject: 'Новини щодо соціальна допомога',
    sender: { email: 'someone@example.net' }, labelIds: [],
  });
  assert.equal(automatic.priority, 'critical');
  assert.equal(automatic.source, 'rule');

  const manual = resultData(rpc(harness, token, 'focusThread', {
    threadId: 'thread_manual', priority: 'high', color: '#f29900', note: 'Сплатити до п’ятниці',
  }));
  assert.equal(manual.focus.priority, 'high');
  assert.equal(manual.focus.source, 'manual');
  const beforeIdempotentRetry = resultData(rpc(harness, token, 'focusConfig', {}));
  assert.equal(beforeIdempotentRetry.manualCount, 1);
  assert.equal(beforeIdempotentRetry.revision, 2);
  const repeatedManual = resultData(rpc(harness, token, 'focusThread', {
    threadId: 'thread_manual', priority: 'high', color: '#f29900', note: 'Сплатити до п’ятниці',
  }));
  assert.equal(repeatedManual.focus.priority, 'high');
  assert.equal(resultData(rpc(harness, token, 'focusConfig', {})).revision, 2,
    'an exact Telegram retry must not create a second focus revision');
  resultData(rpc(harness, token, 'focusThread', { threadId: 'thread_manual', priority: 'none' }));
  assert.equal(resultData(rpc(harness, token, 'focusConfig', {})).manualCount, 0);

  assert.equal(resultFailed(rpc(harness, token, 'focusRuleAdmin', {
    action: 'create', expectedRevision: 3, name: 'Небезпечне правило', priority: 'critical',
    conditions: { fromEmail: 'not-an-email' },
  })).code, 'INVALID_FOCUS');
  assert.equal(resultFailed(rpc(harness, token, 'focusRuleAdmin', {
    action: 'delete', expectedRevision: 0, ruleId: configured.rules[0].id,
  })).code, 'FOCUS_CONFLICT');
});

test('neuroinclusive triage next action and Resume Rail persist idempotently per Gmail connection', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const initial = resultData(rpc(harness, token, 'attentionState', { threadId: 'thread_attention_1' }));
  assert.equal(initial.revision, 0);
  assert.equal(initial.thread.triage, 'none');
  assert.equal(initial.thread.nextAction, '');
  assert.equal(initial.triageOptions.map(item => item.key).join(','), 'action,waiting,info,later');

  const updated = resultData(rpc(harness, token, 'attentionUpdate', {
    threadId: 'thread_attention_1', expectedRevision: 0,
    triage: 'action', nextAction: 'Сплатити рахунок до п’ятниці', readingProgress: 42,
    folderId: 'INBOX', filter: 'unread', query: 'from:worker@example.com',
  }));
  assert.equal(updated.revision, 1);
  assert.equal(updated.thread.triageLabel, 'Дія');
  assert.equal(updated.thread.nextAction, 'Сплатити рахунок до п’ятниці');
  assert.equal(updated.resume.threadId, 'thread_attention_1');
  assert.equal(updated.resume.readingProgress, 42);
  assert.equal(updated.resume.filter, 'unread');

  const registryKey = Object.keys(harness.propertyValues)
    .find(key => key.startsWith('MAILBOX_ATTENTION_V1_'));
  assert.ok(registryKey, 'attention state must use a durable isolated property');
  assert.doesNotMatch(registryKey, new RegExp(OWNER_ID));
  assert.doesNotMatch(harness.propertyValues[registryKey], /worker@example\.com.*body|message body/i,
    'Resume Rail may store navigation and the explicit next action, never message content');

  const repeated = resultData(rpc(harness, token, 'attentionUpdate', {
    threadId: 'thread_attention_1', expectedRevision: 1,
    triage: 'action', nextAction: 'Сплатити рахунок до п’ятниці', readingProgress: 42,
    folderId: 'INBOX', filter: 'unread', query: 'from:worker@example.com',
  }));
  assert.equal(repeated.revision, 1, 'an exact UI retry must not create a second revision');
  assert.equal(resultFailed(rpc(harness, token, 'attentionUpdate', {
    threadId: 'thread_attention_1', expectedRevision: 0, triage: 'later',
  })).code, 'ATTENTION_CONFLICT');
  assert.equal(resultFailed(rpc(harness, token, 'attentionUpdate', {
    threadId: 'thread_attention_1', expectedRevision: 1, triage: 'urgent',
  })).code, 'INVALID_ATTENTION');

  const refreshed = resultData(rpc(harness, token, 'attentionState', { threadId: 'thread_attention_1' }));
  assert.equal(refreshed.thread.triage, 'action');
  assert.equal(refreshed.resume.query, 'from:worker@example.com');
});

test('energy and reminder preferences are bounded idempotent and isolated per Gmail connection', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const initial = resultData(rpc(harness, token, 'attentionState', {}));
  assert.equal(initial.preferences.sessionPreset, 'five_minutes');
  assert.equal(initial.preferences.reminderMode, 'soft');
  assert.equal(initial.preferences.densityMode, 'auto');
  assert.equal(initial.preferences.analysisMode, 'collapsed');
  assert.deepEqual(Array.from(initial.preferences.digestWindows), [540, 1080]);
  assert.equal(initial.preferences.timezone, 'UTC');
  assert.equal(initial.preferences.onboardingCompletedAt, 0);
  assert.equal(initial.preferences.maxThreads, 3);
  assert.equal(initial.preferences.sessionPresets.map(item => item.key).join(','),
    'low,five_minutes,three_threads,untimed');
  assert.equal(initial.preferences.reminderModes.map(item => item.key).join(','),
    'soft,digest,urgent_only');
  assert.equal(initial.preferences.densityModes.map(item => item.key).join(','),
    'auto,minimal,standard,analytical');
  assert.equal(initial.preferences.analysisModes.map(item => item.key).join(','),
    'collapsed,expanded,hidden');

  const low = resultData(rpc(harness, token, 'attentionPreferences', {
    sessionPreset: 'low', reminderMode: 'digest', densityMode: 'minimal', analysisMode: 'hidden', digestWindows: [1080],
    timezone: 'Europe/Brussels', completeOnboarding: true, expectedRevision: 0,
  }));
  assert.equal(low.revision, 1);
  assert.equal(low.preferences.sessionPreset, 'low');
  assert.equal(low.preferences.maxThreads, 1);
  assert.equal(low.preferences.reminderMode, 'digest');
  assert.equal(low.preferences.densityMode, 'minimal');
  assert.equal(low.preferences.analysisMode, 'hidden');
  assert.deepEqual(Array.from(low.preferences.digestWindows), [1080]);
  assert.equal(low.preferences.timezone, 'Europe/Brussels');
  assert.ok(low.preferences.onboardingCompletedAt > 0,
    'completion time must be generated by the server');
  const completedAt = low.preferences.onboardingCompletedAt;

  const repeated = resultData(rpc(harness, token, 'attentionPreferences', {
    sessionPreset: 'low', reminderMode: 'digest', densityMode: 'minimal', analysisMode: 'hidden', digestWindows: [1080],
    timezone: 'Europe/Brussels', completeOnboarding: true, expectedRevision: 1,
  }));
  assert.equal(repeated.revision, 1, 'an exact preference retry must be idempotent');
  assert.equal(repeated.preferences.onboardingCompletedAt, completedAt,
    'an exact retry must not replace the original completion time');
  assert.equal(resultFailed(rpc(harness, token, 'attentionPreferences', {
    sessionPreset: 'untimed', reminderMode: 'soft', expectedRevision: 0,
  })).code, 'ATTENTION_CONFLICT');
  assert.equal(resultFailed(rpc(harness, token, 'attentionPreferences', {
    sessionPreset: 'endless', reminderMode: 'soft', expectedRevision: 1,
  })).code, 'INVALID_ATTENTION');
  assert.equal(resultFailed(rpc(harness, token, 'attentionPreferences', {
    densityMode: 'overwhelming', expectedRevision: 1,
  })).code, 'INVALID_ATTENTION');
  assert.equal(resultFailed(rpc(harness, token, 'attentionPreferences', {
    analysisMode: 'always', expectedRevision: 1,
  })).code, 'INVALID_ATTENTION');
  assert.equal(resultFailed(rpc(harness, token, 'attentionPreferences', {
    digestWindows: '09:00', expectedRevision: 1,
  })).code, 'INVALID_ATTENTION');
  assert.equal(resultFailed(rpc(harness, token, 'attentionPreferences', {
    digestWindows: [-1, 1440], expectedRevision: 1,
  })).code, 'INVALID_REQUEST');
  assert.equal(resultFailed(rpc(harness, token, 'attentionPreferences', {
    timezone: 'Europe/Brussels<script>', expectedRevision: 1,
  })).code, 'INVALID_REQUEST');

  const registry = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 ||
    JSON.stringify(harness.context.mailboxMultiInitialRegistry_(OWNER_ID)));
  registry.connections.push({
    id: 'gmail-owner-energy-second', zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'energy.second@example.com', displayName: 'Energy second', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  });
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);
  resultData(rpc(harness, token, 'switchAccount', { connectionId: 'gmail-owner-energy-second' }));
  const second = resultData(rpc(harness, token, 'attentionState', {}));
  assert.equal(second.preferences.sessionPreset, 'five_minutes');
  assert.equal(second.preferences.reminderMode, 'soft');
  assert.equal(second.preferences.densityMode, 'auto');
  assert.equal(second.preferences.onboardingCompletedAt, 0);
  assert.deepEqual(Array.from(second.preferences.digestWindows), [540, 1080]);

  const keys = Object.keys(harness.propertyValues).filter(key => key.startsWith('MAILBOX_ATTENTION_V1_'));
  assert.equal(keys.length, 1, 'reading default preferences must not create a second durable record');
  assert.doesNotMatch(harness.propertyValues[keys[0]], /subject|sender|message body/i,
    'preference storage must never retain email content');
});

test('local analysis suppresses trivial signatures and grounds actionable claims', () => {
  const harness = makeContext();
  const callsBefore = harness.languageCalls.length;
  [
    'Sent from my iPhone',
    'Надіслано з мого iPhone',
    'Verzonden vanaf mijn iPhone',
    'Get Outlook for Android',
    '',
  ].forEach(body => {
    const result = harness.context.analyzeMessage_('Attachment', body);
    assert.equal(result.substantive, false);
    assert.equal(result.essence, 'Немає змістовного підсумку.');
    assert.equal(result.action, '');
    assert.deepEqual(Array.from(result.deadlines), []);
    assert.deepEqual(Array.from(result.amounts), []);
  });
  assert.equal(harness.languageCalls.length, callsBefore,
    'trivial or attachment-only mail must not invoke machine translation');

  const shortMeaningful = harness.context.analyzeMessage_('', 'Так, погоджуюсь.');
  assert.equal(shortMeaningful.substantive, true,
    'a short substantive reply must not be discarded by a length-only threshold');

  const ungrounded = harness.context.mailboxNormalizeThreadAnalysis_({
    substantive: true,
    essence: 'Потрібно терміново сплатити рахунок.',
    action: 'Сплатити €99 завтра.',
    importance: { icon: '🔴', level: 'висока', reason: 'є строк і потрібна дія' },
    deadlines: ['завтра'],
    amounts: ['€99'],
  }, 'Neutral subject', 'Це нейтральне інформаційне повідомлення.', [{
    id: 'message_grounding_1',
    timestamp: 1000,
    body: 'Це нейтральне інформаційне повідомлення.',
  }]);
  assert.equal(ungrounded.action, '');
  assert.deepEqual(Array.from(ungrounded.deadlines), []);
  assert.deepEqual(Array.from(ungrounded.amounts), []);
  assert.equal(ungrounded.importance.level, 'звичайна');
  assert.equal(ungrounded.risk, 'Явного ризику ігнорування не виявлено.');
});

test('private co-processing sessions are explicit content-free idempotent and account-scoped', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    throw new Error(`Co-processing must not call Gmail: ${requestPath}`);
  });

  const initial = resultData(rpc(harness, token, 'attentionState', {}));
  assert.equal(initial.presence.active, false);
  assert.equal(initial.presence.expired, false);
  assert.deepEqual(Array.from(initial.presence.allowedDurations), [10, 25]);
  assert.match(initial.presence.disclosure, /Вміст листів не читається й не копіюється/);

  const enabledMetrics = resultData(rpc(harness, token, 'functionalMetrics', {
    action: 'enable', expectedRevision: 0,
  }));
  assert.equal(enabledMetrics.enabled, true);

  const startOperation = 'presence_start_01';
  const started = resultData(rpc(harness, token, 'coProcessingSession', {
    action: 'start', durationMinutes: 10, operationId: startOperation, expectedRevision: 0,
  }));
  assert.equal(started.active, true);
  assert.equal(started.durationMinutes, 10);
  assert.equal(started.endsAt - started.startedAt, 10 * 60 * 1000);
  assert.equal(started.revision, 1);

  const repeatedStart = resultData(rpc(harness, token, 'coProcessingSession', {
    action: 'start', durationMinutes: 10, operationId: startOperation, expectedRevision: 0,
  }));
  assert.equal(repeatedStart.startedAt, started.startedAt,
    'a retry after a lost response must not restart the timer');
  assert.equal(repeatedStart.revision, 1);
  assert.equal(resultFailed(rpc(harness, token, 'coProcessingSession', {
    action: 'start', durationMinutes: 25, operationId: 'presence_start_02', expectedRevision: 1,
  })).code, 'PRESENCE_ACTIVE');

  const finished = resultData(rpc(harness, token, 'coProcessingSession', {
    action: 'finish', operationId: 'presence_finish_1', expectedRevision: 1,
  }));
  assert.equal(finished.active, false);
  assert.equal(finished.revision, 2);
  const repeatedFinish = resultData(rpc(harness, token, 'coProcessingSession', {
    action: 'finish', operationId: 'presence_finish_1', expectedRevision: 1,
  }));
  assert.equal(repeatedFinish.revision, 2,
    'a repeated finish must remain idempotent after a lost response');

  const restarted = resultData(rpc(harness, token, 'coProcessingSession', {
    action: 'start', durationMinutes: 25, operationId: 'presence_start_03', expectedRevision: 2,
  }));
  assert.equal(restarted.durationMinutes, 25);
  const stopped = resultData(rpc(harness, token, 'coProcessingSession', {
    action: 'stop', operationId: 'presence_stop_01', expectedRevision: 3,
  }));
  assert.equal(stopped.active, false);
  assert.equal(stopped.revision, 4);
  assert.equal(resultFailed(rpc(harness, token, 'coProcessingSession', {
    action: 'start', durationMinutes: 15, operationId: 'presence_invalid1', expectedRevision: 4,
  })).code, 'INVALID_ATTENTION');
  assert.equal(resultFailed(rpc(harness, token, 'coProcessingSession', {
    action: 'start', durationMinutes: 10, operationId: 'presence_conflict', expectedRevision: 2,
  })).code, 'ATTENTION_CONFLICT');

  const metrics = resultData(rpc(harness, token, 'functionalMetrics', { action: 'state' }));
  assert.equal(metrics.last30Days.sessionsCompleted, 1);
  assert.equal(metrics.last30Days.sessionsStopped, 1);

  const attentionKey = Object.keys(harness.propertyValues)
    .find(key => key.startsWith('MAILBOX_ATTENTION_V1_'));
  assert.ok(attentionKey);
  const storedPresence = JSON.stringify(JSON.parse(harness.propertyValues[attentionKey]).presence);
  assert.doesNotMatch(storedPresence,
    /subject|sender|recipient|bodyText|summaryUk|messageId|threadId/i,
    'presence storage may contain timing state but no mail content or mail identifiers');

  const registry = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 ||
    JSON.stringify(harness.context.mailboxMultiInitialRegistry_(OWNER_ID)));
  registry.connections.push({
    id: 'gmail-owner-presence-second', zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'presence.second@example.com', displayName: 'Presence second', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  });
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);
  resultData(rpc(harness, token, 'switchAccount', { connectionId: 'gmail-owner-presence-second' }));
  const sibling = resultData(rpc(harness, token, 'attentionState', {}));
  assert.equal(sibling.presence.active, false,
    'a sibling Gmail connection must never inherit the first account presence state');
  assert.equal(sibling.presence.revision, 0);
});

test('bounded backlog rescue scans read-only and persists only account-scoped thread ids and progress', () => {
  const references = [
    { id: 'thread_old_unread' }, { id: 'thread_important' }, { id: 'thread_plain' },
    { id: 'thread_focus' }, { id: 'thread_action' },
  ];
  const harness = makeContext({
    urlFetch: url => {
      const match = String(url).match(/\/threads\/([^?]+)/);
      assert.ok(match, `rescue metadata request must target one exact thread: ${url}`);
      const id = decodeURIComponent(match[1]);
      const index = references.findIndex(item => item.id === id);
      const labels = ['INBOX'];
      if (id === 'thread_old_unread') labels.push('UNREAD');
      if (id === 'thread_important') labels.push('IMPORTANT');
      return jsonResponse({
        id, historyId: String(index + 1),
        messages: [{
          id: `message_${id}`, threadId: id,
          internalDate: String(1710000000000 + index * 1000), labelIds: labels,
          snippet: `Private preview ${id}`,
          payload: { headers: [
            { name: 'From', value: `Private Sender ${index} <sender${index}@example.com>` },
            { name: 'To', value: 'tarasevych.pavlo@gmail.com' },
            { name: 'Date', value: 'Wed, 15 Jul 2026 13:09:00 +0200' },
            { name: 'Subject', value: `Private subject ${id}` },
          ] },
        }],
      });
    },
    languageTranslate: value => value.replace(/Private preview/g, 'Приватний підсумок'),
  });
  const token = openOwnerSession(harness);
  harness.setGmail((requestPath, requestOptions) => {
    assert.equal(String(requestOptions.method || 'get').toLowerCase(), 'get',
      'starting a rescue session must never mutate Gmail');
    if (requestPath.startsWith('/threads?')) {
      return { threads: references, resultSizeEstimate: references.length };
    }
    throw new Error(`Unexpected rescue Gmail call: ${requestPath}`);
  });

  resultData(rpc(harness, token, 'focusThread', {
    threadId: 'thread_focus', priority: 'critical', color: '#d93025', note: '',
  }));
  const attention = resultData(rpc(harness, token, 'attentionUpdate', {
    threadId: 'thread_action', triage: 'action', expectedRevision: 0,
  }));
  assert.equal(attention.revision, 1);

  const started = resultData(rpc(harness, token, 'backlogRescue', {
    action: 'start', expectedRevision: 1,
  }));
  assert.equal(started.rescue.active, true);
  assert.equal(started.rescue.selectedCount, 3);
  assert.equal(started.rescue.completedCount, 0);
  assert.equal(started.rescue.scannedCount, 5);
  assert.equal(started.rescue.revision, 2);
  assert.deepEqual(Array.from(started.threads, item => item.id), [
    'thread_action', 'thread_focus', 'thread_important',
  ], 'explicit triage, focus priority and Gmail importance should lead the bounded block');
  assert.ok(harness.languageCalls.length <= 1,
    'the bounded block should translate only the selected previews in one chunk');
  assert.doesNotMatch(harness.languageCalls.map(call => call.value).join('\n'), /thread_plain|thread_old_unread/,
    'scanned but unselected previews must not consume translation work');
  assert.ok(harness.gmailCalls.every(call => String(call.options.method || 'get').toLowerCase() === 'get'));
  assert.ok(harness.fetchAllBatches.flat().every(call => String(call.method || 'get').toLowerCase() === 'get'));

  const attentionKey = Object.keys(harness.propertyValues)
    .find(key => key.startsWith('MAILBOX_ATTENTION_V1_'));
  const stored = harness.propertyValues[attentionKey];
  assert.match(stored, /thread_action/);
  assert.doesNotMatch(stored, /Private subject|Private Sender|Private preview|Приватний підсумок|example\.com/,
    'durable rescue state must contain no sender, subject, snippet, summary or body content');

  assert.equal(resultFailed(rpc(harness, token, 'backlogRescue', {
    action: 'complete', threadId: 'thread_not_selected', expectedRevision: 2,
  })).code, 'INVALID_ATTENTION');
  const completed = resultData(rpc(harness, token, 'backlogRescue', {
    action: 'complete', threadId: 'thread_action', expectedRevision: 2,
  }));
  assert.equal(completed.rescue.completedCount, 1);
  assert.equal(completed.rescue.remainingCount, 2);
  assert.equal(completed.rescue.revision, 3);
  assert.deepEqual(Array.from(completed.threads, item => item.id), ['thread_focus', 'thread_important']);

  const originalConnectionId = started.threads[0].account.id;
  const tenantRegistry = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 ||
    JSON.stringify(harness.context.mailboxMultiInitialRegistry_(OWNER_ID)));
  tenantRegistry.connections.push({
    id: 'gmail-owner-rescue-second', zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'rescue.second@example.com', displayName: 'Rescue second', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  });
  tenantRegistry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(tenantRegistry);
  resultData(rpc(harness, token, 'switchAccount', { connectionId: 'gmail-owner-rescue-second' }));
  assert.equal(resultData(rpc(harness, token, 'attentionState', {})).rescue.active, false,
    'a sibling Gmail account must never inherit the active rescue session');
  resultData(rpc(harness, token, 'switchAccount', { connectionId: originalConnectionId }));
  assert.equal(resultData(rpc(harness, token, 'attentionState', {})).rescue.remainingCount, 2,
    'returning to the original Gmail account must restore only its own rescue progress');

  const finished = resultData(rpc(harness, token, 'backlogRescue', {
    action: 'finish', expectedRevision: 3,
  }));
  assert.equal(finished.rescue.active, false);
  assert.equal(finished.rescue.selectedCount, 0);
  assert.equal(finished.rescue.revision, 4);
  assert.equal(finished.threads.length, 0);
});

test('functional relief metrics are opt-in content-free bounded and isolated per Telegram user and Gmail account', () => {
  let failNextMetricRetentionWrite = false;
  const harness = makeContext({
    propertySet: key => {
      if (failNextMetricRetentionWrite && key.startsWith('MAILBOX_FUNCTIONAL_METRICS_V1_')) {
        failNextMetricRetentionWrite = false;
        throw new Error('synthetic transient retention write failure');
      }
    },
    urlFetch: url => {
      const match = String(url).match(/\/threads\/([^?]+)/);
      assert.ok(match, `metric-backed rescue must request one exact thread: ${url}`);
      const id = decodeURIComponent(match[1]);
      return jsonResponse({
        id, historyId: '1', messages: [{
          id: `message_${id}`, threadId: id, internalDate: '1710000000000', labelIds: ['INBOX', 'IMPORTANT'],
          snippet: 'Private metric preview that must never persist',
          payload: { headers: [
            { name: 'From', value: 'Private Metrics Sender <private-metrics@example.com>' },
            { name: 'To', value: 'tarasevych.pavlo@gmail.com' },
            { name: 'Date', value: 'Wed, 15 Jul 2026 13:09:00 +0200' },
            { name: 'Subject', value: 'Private metric subject that must never persist' },
          ] },
        }],
      });
    },
    languageTranslate: value => value,
  });
  const token = openOwnerSession(harness);
  harness.setGmail((requestPath, requestOptions) => {
    assert.equal(String(requestOptions.method || 'get').toLowerCase(), 'get');
    if (requestPath.startsWith('/threads?')) return { threads: [{ id: 'thread_metrics_1' }], resultSizeEstimate: 1 };
    throw new Error(`Unexpected functional-metrics Gmail call: ${requestPath}`);
  });

  const initial = resultData(rpc(harness, token, 'functionalMetrics', { action: 'state' }));
  assert.equal(initial.enabled, false);
  assert.equal(initial.revision, 0);
  assert.equal(initial.last30Days.decisions, 0);
  assert.equal(Object.keys(harness.propertyValues)
    .filter(key => key.startsWith('MAILBOX_FUNCTIONAL_METRICS_V1_')).length, 0,
  'reading disabled defaults must not create durable tracking state');

  const enabled = resultData(rpc(harness, token, 'functionalMetrics', {
    action: 'enable', expectedRevision: 0,
  }));
  assert.equal(enabled.enabled, true);
  assert.equal(enabled.revision, 1);
  assert.equal(resultFailed(rpc(harness, token, 'functionalMetrics', {
    action: 'disable', expectedRevision: 0,
  })).code, 'METRICS_CONFLICT', 'stale preference writes must fail closed');

  const started = resultData(rpc(harness, token, 'backlogRescue', {
    action: 'start', expectedRevision: 0,
  }));
  assert.equal(started.rescue.selectedCount, 1);
  const afterStart = resultData(rpc(harness, token, 'functionalMetrics', { action: 'state' }));
  assert.equal(afterStart.last7Days.rescueStarted, 1);
  assert.equal(afterStart.last7Days.selectedOffered, 1);
  assert.equal(afterStart.last7Days.decisions, 0);

  resultData(rpc(harness, token, 'backlogRescue', {
    action: 'complete', threadId: 'thread_metrics_1', expectedRevision: 1,
  }));
  const afterDecision = resultData(rpc(harness, token, 'functionalMetrics', { action: 'state' }));
  assert.equal(afterDecision.last7Days.decisions, 1);
  assert.equal(afterDecision.last7Days.sessionsCompleted, 1);
  assert.equal(afterDecision.last7Days.recoveryPercent, 100);
  assert.equal(afterDecision.last7Days.medianFirstDecision.key, 'under_1m');
  assert.equal(afterDecision.last7Days.medianFirstDecision.sampleCount, 1);
  assert.equal(harness.context.mailboxMetricsFirstDecisionBucket_(60 * 1000), 0,
    'the exact one-minute boundary belongs to the disclosed up-to-one-minute bucket');

  const metricKeys = Object.keys(harness.propertyValues)
    .filter(key => key.startsWith('MAILBOX_FUNCTIONAL_METRICS_V1_'));
  assert.equal(metricKeys.length, 1);
  const stored = harness.propertyValues[metricKeys[0]];
  assert.doesNotMatch(stored,
    /thread_metrics|message_thread|Private metric|private-metrics|Subject|From|snippet|body|summary/i,
    'durable metrics must contain no Gmail thread/message id or mail content');
  const storedRecord = JSON.parse(stored);
  assert.ok(storedRecord.days.length <= 30);
  assert.deepEqual(Object.keys(storedRecord.days[0]).sort(), [
    'day', 'decisions', 'firstDecisionBuckets', 'rescueStarted', 'selectedOffered',
    'sessionsCompleted', 'sessionsStopped',
  ]);
  storedRecord.days.unshift({
    day: '2000-01-01', rescueStarted: 99, selectedOffered: 99, decisions: 99,
    sessionsCompleted: 99, sessionsStopped: 99, firstDecisionBuckets: [99, 0, 0, 0, 0],
  });
  harness.propertyValues[metricKeys[0]] = JSON.stringify(storedRecord);
  const purge = harness.context.mailboxProcessExpiredFunctionalMetrics_();
  assert.equal(purge.compacted, 1);
  assert.equal(purge.failed, 0);
  assert.equal(harness.context.mailboxProcessExpiredFunctionalMetrics_().skipped, 'already_today',
    'the minute worker must scan the bounded property store at most once per UTC day');
  const compacted = resultData(rpc(harness, token, 'functionalMetrics', { action: 'state' }));
  assert.equal(compacted.last30Days.decisions, 1);
  assert.doesNotMatch(harness.propertyValues[metricKeys[0]], /2000-01-01/,
    'a read must physically compact behavioral aggregates older than 30 calendar days');

  delete harness.propertyValues.MAILBOX_FUNCTIONAL_METRICS_PURGE_DAY_V1;
  const corruptKey = 'MAILBOX_FUNCTIONAL_METRICS_V1_' + 'f'.repeat(32);
  harness.propertyValues[corruptKey] = '{not-json';
  const corruptPurge = harness.context.mailboxProcessExpiredFunctionalMetrics_();
  assert.equal(corruptPurge.failed, 0);
  assert.equal(corruptPurge.compacted, 1);
  assert.equal(harness.propertyValues[corruptKey], undefined,
    'a malformed content-free metrics registry must be deleted fail-closed');

  delete harness.propertyValues.MAILBOX_FUNCTIONAL_METRICS_PURGE_DAY_V1;
  storedRecord.days.unshift({
    day: '2000-01-01', rescueStarted: 1, selectedOffered: 1, decisions: 1,
    sessionsCompleted: 1, sessionsStopped: 0, firstDecisionBuckets: [1, 0, 0, 0, 0],
  });
  harness.propertyValues[metricKeys[0]] = JSON.stringify(storedRecord);
  failNextMetricRetentionWrite = true;
  const failedPurge = harness.context.mailboxProcessExpiredFunctionalMetrics_();
  assert.equal(failedPurge.failed, 1);
  assert.equal(harness.propertyValues.MAILBOX_FUNCTIONAL_METRICS_PURGE_DAY_V1, undefined,
    'a transient compaction write failure must not suppress the next minute-worker retry');
  const retriedPurge = harness.context.mailboxProcessExpiredFunctionalMetrics_();
  assert.equal(retriedPurge.failed, 0);
  assert.equal(retriedPurge.compacted, 1);
  assert.doesNotMatch(harness.propertyValues[metricKeys[0]], /2000-01-01/);

  const tenantRegistry = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 ||
    JSON.stringify(harness.context.mailboxMultiInitialRegistry_(OWNER_ID)));
  tenantRegistry.connections.push({
    id: 'gmail-owner-metrics-second', zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'metrics.second@example.com', displayName: 'Metrics second', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  });
  tenantRegistry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(tenantRegistry);
  resultData(rpc(harness, token, 'switchAccount', { connectionId: 'gmail-owner-metrics-second' }));
  const sibling = resultData(rpc(harness, token, 'functionalMetrics', { action: 'state' }));
  assert.equal(sibling.enabled, false);
  assert.equal(sibling.last30Days.decisions, 0,
    'a sibling Gmail connection must not inherit the first account metrics');
  resultData(rpc(harness, token, 'switchAccount', { connectionId: 'gmail-owner' }));
  const restored = resultData(rpc(harness, token, 'functionalMetrics', { action: 'state' }));
  assert.equal(restored.last30Days.decisions, 1);

  const cleared = resultData(rpc(harness, token, 'functionalMetrics', {
    action: 'clear', expectedRevision: restored.revision,
  }));
  assert.equal(cleared.enabled, true, 'clearing history must not silently change the opt-in preference');
  assert.equal(cleared.last30Days.decisions, 0);
  const disabled = resultData(rpc(harness, token, 'functionalMetrics', {
    action: 'disable', expectedRevision: cleared.revision,
  }));
  assert.equal(disabled.enabled, false);
});

test('functional recovery percentage keeps a rescue session in its start-day cohort across midnight', () => {
  let now = Date.now();
  const civilMidnight = now + 60 * 1000;
  const harness = makeContext({
    formatDate: (date, timezone) => timezone === 'Pacific/Kiritimati'
      ? '2026-07-18' : (date.getTime() < civilMidnight ? '2026-07-17' : '2026-07-18'),
    urlFetch: url => {
      const id = decodeURIComponent(String(url).match(/\/threads\/([^?]+)/)[1]);
      return jsonResponse({
        id, historyId: '1', messages: [{
          id: `message_${id}`, threadId: id, internalDate: '1710000000000', labelIds: ['INBOX'],
          snippet: 'Cohort preview', payload: { headers: [
            { name: 'From', value: 'Cohort Sender <cohort@example.com>' },
            { name: 'To', value: 'tarasevych.pavlo@gmail.com' },
            { name: 'Date', value: 'Wed, 15 Jul 2026 13:09:00 +0200' },
            { name: 'Subject', value: 'Cohort subject' },
          ] },
        }],
      });
    },
  });
  const NativeDate = Date;
  class FakeDate extends NativeDate {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  harness.context.Date = FakeDate;
  const token = openOwnerSession(harness);
  harness.setGmail(requestPath => {
    if (requestPath.startsWith('/threads?')) return { threads: [{ id: 'thread_cohort_1' }], resultSizeEstimate: 1 };
    throw new Error(`Unexpected cohort Gmail call: ${requestPath}`);
  });

  resultData(rpc(harness, token, 'functionalMetrics', { action: 'enable', expectedRevision: 0 }));
  resultData(rpc(harness, token, 'backlogRescue', { action: 'start', expectedRevision: 0 }));
  resultData(rpc(harness, token, 'attentionPreferences', {
    timezone: 'Pacific/Kiritimati', expectedRevision: 1,
  }));
  now = civilMidnight + 60 * 1000;
  resultData(rpc(harness, token, 'backlogRescue', {
    action: 'complete', threadId: 'thread_cohort_1', expectedRevision: 2,
  }));

  const metrics = resultData(rpc(harness, token, 'functionalMetrics', { action: 'state' }));
  assert.equal(metrics.last7Days.selectedOffered, 1);
  assert.equal(metrics.last7Days.decisions, 1);
  assert.equal(metrics.last7Days.recoveryPercent, 100);
  const key = Object.keys(harness.propertyValues)
    .find(item => item.startsWith('MAILBOX_FUNCTIONAL_METRICS_V1_'));
  const days = JSON.parse(harness.propertyValues[key]).days;
  assert.equal(days.length, 1);
  assert.equal(days[0].day, '2026-07-17',
    'both events must retain the fixed session start-day even after midnight and timezone change');

  const rescueSource = clientSource.slice(
    clientSource.indexOf('function mailboxBacklogRescue_(payload, session) {'),
    clientSource.indexOf('function mailboxSourceProvider_(value) {')
  );
  assert.ok(rescueSource.indexOf('mailboxMetricsRecordLockedBestEffort_') <
    rescueSource.indexOf('lock.releaseLock()'),
  'metrics must be decided under the same lock as the rescue action so opt-in and clear cannot race');
});

test('Telegram priority callbacks update only the exact user account and Gmail thread', () => {
  const harness = makeContext();
  const sessionToken = openOwnerSession(harness);
  const originalMessage = harness.context.getGmailMessage_;
  const originalTelegramRequest = harness.context.telegramRequest_;
  const originalMarkupRecord = harness.context.updateTelegramMailCardMarkupRecord_;
  const calls = [];
  try {
    harness.context.getGmailMessage_ = messageId => {
      assert.equal(messageId, 'message_focus_123');
      return {
        id: messageId,
        threadId: 'thread_focus_123',
        from: 'Social Worker <worker@example.com>',
        subject: 'Документи соціальної допомоги',
        labelIds: ['INBOX', 'UNREAD'],
      };
    };
    harness.context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      return true;
    };
    harness.context.updateTelegramMailCardMarkupRecord_ = (...args) => {
      calls.push({ method: 'persistMarkup', args });
      return true;
    };
    const query = {
      from: { id: Number(OWNER_ID) },
      message: {
        chat: { id: Number(OWNER_ID), type: 'private' },
        message_id: 700,
        reply_markup: { inline_keyboard: [[{
          text: '🎯 Персональний пріоритет',
          callback_data: harness.context.telegramFocusCallbackData_(
            'menu', 'message_focus_123', 'gmail-owner'
          ),
        }]] },
      },
    };
    const result = harness.context.executeTelegramFocusCallback_(query, {
      action: 'critical', connectionId: 'gmail-owner', messageId: 'message_focus_123',
    }, { userId: OWNER_ID, chatId: OWNER_ID });
    assert.match(result.message, /Не пропустити/);
    assert.equal(calls[0].method, 'editMessageReplyMarkup');
    const edited = JSON.parse(calls[0].payload.reply_markup).inline_keyboard.flat();
    assert.ok(edited.some(button => button.text === '🔴 Не пропустити'));
    assert.deepEqual(calls[1].args.slice(2), [null, 'gmail-owner', OWNER_ID]);

    const focusKey = Object.keys(harness.propertyValues)
      .find(key => key.startsWith('MAILBOX_FOCUS_V1_'));
    const stored = JSON.parse(harness.propertyValues[focusKey]);
    assert.equal(stored.userId, OWNER_ID);
    assert.equal(stored.connectionId, 'gmail-owner');
    assert.equal(stored.manual[0].threadId, 'thread_focus_123');
    assert.equal(stored.manual[0].priority, 'critical');

    assert.throws(() => harness.context.executeTelegramFocusCallback_(query, {
      action: 'high', connectionId: 'gmail-owner', messageId: 'message_focus_123',
    }, { userId: '999999999', chatId: OWNER_ID }), /іншому Telegram-користувачу/);
  } finally {
    harness.context.getGmailMessage_ = originalMessage;
    harness.context.telegramRequest_ = originalTelegramRequest;
    harness.context.updateTelegramMailCardMarkupRecord_ = originalMarkupRecord;
  }
});

test('chat-native focus rules create idempotently and remain bound to the selected Gmail account', () => {
  const harness = makeContext();
  const sessionToken = openOwnerSession(harness);
  const originalSend = harness.context.sendTelegramText_;
  const originalTelegramRequest = harness.context.telegramRequest_;
  const deliveries = [];
  try {
    harness.context.sendTelegramText_ = (text, markup, options) => {
      deliveries.push({ text, markup: JSON.parse(markup), options });
      return { message_id: 810 };
    };
    harness.context.telegramRequest_ = (method, payload) => {
      deliveries.push({ method, payload });
      return true;
    };
    const command = '/focus add level:critical from:worker@example.com name:"Соціальний працівник"';
    const first = harness.context.sendTelegramFocusRules_(7001, command, {
      message_id: 701, chat: { id: Number(OWNER_ID), type: 'private' },
    }, OWNER_ID);
    assert.equal(first.message, 'Правило пріоритету створено');
    const second = harness.context.sendTelegramFocusRules_(7001, command, {
      message_id: 701, chat: { id: Number(OWNER_ID), type: 'private' },
    }, OWNER_ID);
    assert.equal(second.message, 'Правило пріоритету створено');

    const principal = harness.context.mailboxMultiPrincipal_(OWNER_ID);
    const config = resultData(rpc(harness, sessionToken, 'focusConfig', {}));
    assert.equal(config.revision, 1, 'retrying the same Telegram update must not create another revision');
    assert.equal(config.rules.length, 1);
    assert.equal(config.rules[0].name, 'Соціальний працівник');
    assert.equal(config.rules[0].conditions.fromEmail, 'worker@example.com');
    assert.equal(principal.connectionId, 'gmail-owner');

    const view = harness.context.telegramFocusRulesView_(OWNER_ID, 'gmail-owner', 0, '');
    assert.match(view.text, /ADHD-фокус і пріоритети/);
    assert.match(view.text, /tarasevych\.pavlo@gmail\.com/);
    const buttons = JSON.parse(view.markup).inline_keyboard.flat();
    const toggle = buttons.map(button => harness.context.parseTelegramFocusRuleCallback_(button.callback_data))
      .find(item => item && item.action === 'toggle');
    assert.equal(toggle.connectionId, 'gmail-owner');
    assert.equal(toggle.revision, 1);
    assert.ok(Buffer.byteLength(buttons.find(button => {
      const parsed = harness.context.parseTelegramFocusRuleCallback_(button.callback_data);
      return parsed && parsed.action === 'toggle';
    }).callback_data, 'utf8') <= 64);

    const query = {
      from: { id: Number(OWNER_ID) },
      message: { chat: { id: Number(OWNER_ID), type: 'private' }, message_id: 811 },
    };
    const toggled = harness.context.handleTelegramFocusRuleCallback_(query, toggle, OWNER_ID);
    assert.equal(toggled.message, 'Правило вимкнено');
    const toggledRetry = harness.context.handleTelegramFocusRuleCallback_(query, toggle, OWNER_ID);
    assert.equal(toggledRetry.message, 'Правило вимкнено');
    assert.equal(resultData(rpc(harness, sessionToken, 'focusConfig', {})).revision, 2,
      'an exact toggle retry must not create another revision');

    const afterToggleView = harness.context.telegramFocusRulesView_(OWNER_ID, 'gmail-owner', 0, '');
    const deleteCallback = JSON.parse(afterToggleView.markup).inline_keyboard.flat()
      .map(button => harness.context.parseTelegramFocusRuleCallback_(button.callback_data))
      .find(item => item && item.action === 'delete');
    const prompted = harness.context.handleTelegramFocusRuleCallback_(query, deleteCallback, OWNER_ID);
    assert.equal(prompted.message, 'Підтвердіть видалення правила');
    const latestEdit = deliveries.filter(item => item.method === 'editMessageText').slice(-1)[0];
    const confirmCallback = JSON.parse(latestEdit.payload.reply_markup).inline_keyboard.flat()
      .map(button => harness.context.parseTelegramFocusRuleCallback_(button.callback_data))
      .find(item => item && item.action === 'confirmDelete');
    assert.ok(confirmCallback);
    const deleted = harness.context.handleTelegramFocusRuleCallback_(query, confirmCallback, OWNER_ID);
    assert.equal(deleted.message, 'Правило видалено');
    const deletedRetry = harness.context.handleTelegramFocusRuleCallback_(query, confirmCallback, OWNER_ID);
    assert.equal(deletedRetry.message, 'Правило видалено');
    const finalConfig = resultData(rpc(harness, sessionToken, 'focusConfig', {}));
    assert.equal(finalConfig.revision, 3);
    assert.equal(finalConfig.rules.length, 0);

    assert.throws(() => harness.context.parseTelegramFocusCommand_(
      '/focus add level:critical from:worker@example.com name:"X" evil:true'
    ), /Невідоме поле/);
  } finally {
    harness.context.sendTelegramText_ = originalSend;
    harness.context.telegramRequest_ = originalTelegramRequest;
  }
});

test('chat-native focus account switching and rule callbacks reject cross-user access', () => {
  const harness = makeContext();
  openOwnerSession(harness);
  const registry = harness.context.mailboxMultiReadRegistry_();
  registry.connections.push({
    id: 'gmail-owner-work', zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'work@example.com', displayName: 'Work', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  });
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);
  const originalTelegramRequest = harness.context.telegramRequest_;
  const calls = [];
  try {
    harness.context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      return true;
    };
    const selectData = harness.context.telegramFocusRuleCallbackData_(
      'select', 'gmail-owner-work', 0
    );
    const callback = harness.context.parseTelegramFocusRuleCallback_(selectData);
    const query = {
      from: { id: Number(OWNER_ID) },
      message: { chat: { id: Number(OWNER_ID), type: 'private' }, message_id: 820 },
    };
    const selected = harness.context.handleTelegramFocusRuleCallback_(query, callback, OWNER_ID);
    assert.equal(selected.message, 'Gmail-акаунт вибрано');
    assert.equal(harness.context.mailboxMultiPrincipal_(OWNER_ID).connectionId, 'gmail-owner-work');
    assert.equal(calls[0].method, 'editMessageText');
    assert.match(calls[0].payload.text, /work@example\.com/);

    assert.throws(() => harness.context.handleTelegramFocusRuleCallback_(query, callback, '999999999'),
      /іншому Telegram-користувачу/);
  } finally {
    harness.context.telegramRequest_ = originalTelegramRequest;
  }
});

test('focus changes durably reconcile already-delivered Telegram cards for the exact user account', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const created = resultData(rpc(harness, token, 'focusRuleAdmin', {
    action: 'create', operationId: '0123456789abcdef', expectedRevision: 0,
    name: 'Соціальний працівник', enabled: true, priority: 'critical', color: '#d93025', match: 'all',
    conditions: { fromEmail: 'worker@example.com' },
  }));
  assert.equal(created.revision, 1);
  const syncKey = Object.keys(harness.propertyValues)
    .find(key => key.startsWith('TELEGRAM_FOCUS_SYNC_V1_'));
  assert.ok(syncKey, 'focus mutation must reserve reconciliation before it commits');

  const replyMarkup = harness.context.buildMailKeyboard_(
    'https://mail.google.com/mail/?authuser=tarasevych.pavlo@gmail.com#all/thread_focus_sync',
    'worker@example.com', [], 'message_focus_sync', { available: false, mode: 'none' },
    'thread_focus_sync', ['INBOX', 'UNREAD'], [], [], 'gmail-owner'
  );
  const reservation = harness.context.reserveTelegramMailCardDelivery_({
    chatId: OWNER_ID, userId: OWNER_ID, connectionId: 'gmail-owner',
    gmailMessageId: 'message_focus_sync', gmailThreadId: 'thread_focus_sync',
    messageThreadId: 0, topic: 'inbox', replyMarkup,
    gmailState: { folder: 'inbox', unread: true, starred: false, important: false, userLabelIds: [] },
    seenPropertyName: 'SEEN_MESSAGE_IDS',
  });
  harness.context.finalizeTelegramMailCardDelivery_(reservation, { message_id: 830 });

  const originalGetMessage = harness.context.getGmailMessage_;
  const originalTelegramRequest = harness.context.telegramRequest_;
  const calls = [];
  try {
    harness.context.getGmailMessage_ = messageId => ({
      id: messageId, threadId: 'thread_focus_sync',
      from: 'Social Worker <worker@example.com>', subject: 'Важливі документи',
      labelIds: ['INBOX', 'UNREAD'], attachments: [],
    });
    harness.context.telegramRequest_ = (method, payload) => {
      calls.push({ method, payload });
      return true;
    };
    const result = harness.context.processTelegramFocusReconciliations_(5);
    assert.deepEqual({ ...result }, { processed: 1, completedScopes: 1, pendingScopes: 0 });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].method, 'editMessageReplyMarkup');
    assert.equal(String(calls[0].payload.chat_id), OWNER_ID);
    assert.equal(calls[0].payload.message_id, 830);
    const buttons = JSON.parse(calls[0].payload.reply_markup).inline_keyboard.flat();
    assert.ok(buttons.some(button => button.text === '🔴 Не пропустити'));
    assert.equal(harness.propertyValues[syncKey], undefined);
    const storedCard = harness.context.readTelegramMailCards_({
      chatId: OWNER_ID, userId: OWNER_ID, connectionId: 'gmail-owner',
      gmailMessageId: 'message_focus_sync',
    })[0];
    assert.ok(JSON.parse(storedCard.replyMarkup).inline_keyboard.flat()
      .some(button => button.text === '🔴 Не пропустити'));
  } finally {
    harness.context.getGmailMessage_ = originalGetMessage;
    harness.context.telegramRequest_ = originalTelegramRequest;
  }
});

test('focus mutation fails before commit when durable reconciliation capacity is full', () => {
  const properties = {};
  for (let index = 0; index < 20; index += 1) {
    properties['TELEGRAM_FOCUS_SYNC_V1_' + index.toString(16).padStart(16, '0')] = '{}';
  }
  const harness = makeContext({ properties });
  const token = openOwnerSession(harness);
  const failed = resultFailed(rpc(harness, token, 'focusThread', {
    threadId: 'thread_capacity', priority: 'critical', note: 'Must not commit',
  }));
  assert.equal(failed.code, 'STORAGE_FULL');
  assert.equal(Object.keys(harness.propertyValues).some(key => key.startsWith('MAILBOX_FOCUS_V1_')), false);
});

test('per-request Gmail routing is authorized, role-aware, and does not change the selected mailbox', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const registry = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 ||
    JSON.stringify(harness.context.mailboxMultiReadRegistry_()));
  registry.connections.push({
    id: 'gmail-owner-second', zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'second@example.com', displayName: 'Second', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  });
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);
  harness.setGmail(requestPath => {
    assert.match(requestPath, /^\/threads\/thread_second\?/);
    return {
      id: 'thread_second', historyId: '77',
      messages: [{
        id: 'message_second', threadId: 'thread_second', internalDate: String(Date.now()), labelIds: ['INBOX'], snippet: 'Second account',
        payload: { headers: [
          { name: 'From', value: 'Sender <sender@example.com>' },
          { name: 'To', value: 'second@example.com' },
          { name: 'Date', value: 'Thu, 17 Jul 2026 20:00:00 +0000' },
          { name: 'Subject', value: 'Second account thread' },
          { name: 'Message-ID', value: '<second@example.com>' },
        ], body: { data: '' }, parts: [] },
      }],
    };
  });
  const detail = resultData(harness.context.mailboxRpc(token, {
    op: 'thread', connectionId: 'gmail-owner-second', payload: { threadId: 'thread_second' },
  }));
  assert.equal(detail.account.id, 'gmail-owner-second');
  assert.equal(detail.account.email, 'second@example.com');
  assert.equal(harness.context.mailboxRequireSession_(token).connectionId, 'gmail-owner',
    'a scoped read must not change the user selected mailbox');

  const otherUserId = '999999999';
  const otherToken = resultData(harness.context.mailboxOpenSession(telegramInitData(otherUserId))).sessionToken;
  assert.equal(resultFailed(harness.context.mailboxRpc(otherToken, {
    op: 'thread', connectionId: 'gmail-owner-second', payload: { threadId: 'thread_second' },
  })).code, 'FORBIDDEN');
  assert.equal(resultFailed(harness.context.mailboxRpc(token, {
    op: 'bootstrap', connectionId: 'gmail-owner-second', payload: {},
  })).code, 'INVALID_REQUEST');
});

test('workspace invitations are one-use and owners can change or revoke member roles', () => {
  const harness = makeContext();
  const ownerSession = openOwnerSession(harness);
  const otherUserId = '999999999';
  const otherSession = resultData(harness.context.mailboxOpenSession(telegramInitData(otherUserId))).sessionToken;
  const created = resultData(rpc(harness, ownerSession, 'createInvite', {
    zoneId: 'zone-owner', role: 'responder',
  }));
  assert.match(created.inviteToken, /^[A-Za-z0-9_-]{43}$/);
  const accepted = resultData(rpc(harness, otherSession, 'acceptInvite', {
    inviteToken: created.inviteToken,
  }));
  assert.equal(accepted.zoneId, 'zone-owner');
  assert.equal(accepted.role, 'responder');
  assert.equal(resultFailed(rpc(harness, otherSession, 'acceptInvite', {
    inviteToken: created.inviteToken,
  })).code, 'INVALID_INVITE');

  const otherAccess = resultData(rpc(harness, otherSession, 'workspaceAccess', {}));
  assert.equal(otherAccess.zones.find(zone => zone.id === 'zone-owner').role, 'responder');
  assert.equal(otherAccess.zones.find(zone => zone.id === 'zone-owner').canManage, false);
  const scopedOtherSession = resultData(
    harness.context.mailboxOpenSession(telegramInitData(otherUserId, {
      query_id: 'AAE-unit-test-query-after-invite',
    }))
  ).sessionToken;
  assert.equal(resultFailed(rpc(harness, scopedOtherSession, 'action', {
    action: 'archive', threadId: 'thread_denied_without_connection',
  })).code, 'FORBIDDEN',
  'omitting connectionId must not skip the manager role required by action');
  assert.equal(resultFailed(rpc(harness, otherSession, 'updateMember', {
    zoneId: 'zone-owner', userId: OWNER_ID, role: 'viewer', remove: false,
  })).code, 'FORBIDDEN');

  const promoted = resultData(rpc(harness, ownerSession, 'updateMember', {
    zoneId: 'zone-owner', userId: otherUserId, role: 'manager', remove: false,
  }));
  assert.equal(promoted.role, 'manager');
  const promotedAdmin = resultData(rpc(harness, ownerSession, 'updateMember', {
    zoneId: 'zone-owner', userId: otherUserId, role: 'admin', remove: false,
  }));
  assert.equal(promotedAdmin.role, 'admin');
  assert.equal(resultFailed(rpc(harness, otherSession, 'createInvite', {
    zoneId: 'zone-owner', role: 'admin',
  })).code, 'FORBIDDEN',
  'an admin may invite only a lower role, while the owner remains able to invite admins');
  const removed = resultData(rpc(harness, ownerSession, 'updateMember', {
    zoneId: 'zone-owner', userId: otherUserId, role: 'viewer', remove: true,
  }));
  assert.equal(removed.removed, true);
  assert.equal(resultData(rpc(harness, otherSession, 'workspaceAccess', {})).zones.some(zone => zone.id === 'zone-owner'), false);
  assert.equal(resultFailed(rpc(harness, ownerSession, 'updateMember', {
    zoneId: 'zone-owner', userId: OWNER_ID, role: 'admin', remove: false,
  })).code, 'FORBIDDEN');
});

test('Gmail disconnect hides the account before provider revocation and scrubs every preference', () => {
  const connectionId = 'gmail-owner-revocable';
  const harness = makeContext({
    urlFetch: (url, request) => {
      assert.equal(url, 'https://oauth2.googleapis.com/revoke');
      assert.equal(request.payload.token, 'gmail-refresh-token-revocable');
      return httpResponse('', 200);
    },
  });
  const token = openOwnerSession(harness);
  const registry = harness.context.mailboxMultiReadRegistry_();
  registry.connections.push({
    id: connectionId, zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'revocable@example.com', displayName: 'Revocable', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  });
  const preference = registry.preferences.find(item => item.userId === OWNER_ID);
  preference.activeConnectionId = connectionId;
  preference.unifiedConnectionIds.push(connectionId);
  preference.notificationConnectionIds.push(connectionId);
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);
  harness.propertyValues[`MAILBOX_GOOGLE_OAUTH_TOKEN_V1_${connectionId}`] = JSON.stringify({
    v: 1, email: 'revocable@example.com', subject: 'subject-revocable', generation: 1,
    refreshToken: 'gmail-refresh-token-revocable', accessToken: 'gmail-access-token-revocable',
    accessExpiresAt: Date.now() + 3600000, scopes: [], updatedAt: Date.now(),
  });
  const metadataSyncKey = harness.context.mailboxMetadataSyncPropertyKey_(connectionId);
  harness.propertyValues[metadataSyncKey] = JSON.stringify({
    v: 1, connectionId, zoneId: 'zone-owner', tokenGeneration: 1, state: 'healthy',
    leaseToken: '', leaseUntil: 0, version: 'a'.repeat(43), labelsVersion: 'b'.repeat(43),
    sendAsVersion: 'c'.repeat(43), settingsVersion: 'd'.repeat(43), lastCheckedAt: Date.now(),
    lastChangedAt: Date.now(), nextCheckAt: Date.now() + 300000, failures: 0, errorCode: '',
  });
  harness.cacheValues.set(`mailbox.sendas.v1.${connectionId}`, 'cached-send-as');
  const focusKey = harness.context.mailboxFocusPropertyKey_({ userId: OWNER_ID, connectionId });
  const attentionKey = harness.context.mailboxAttentionPropertyKey_({ userId: OWNER_ID, connectionId });
  harness.propertyValues[focusKey] = 'private-focus-state';
  harness.propertyValues[attentionKey] = 'private-attention-preferences';

  assert.equal(resultData(rpc(harness, token, 'accountSettings', {})).accounts
    .find(item => item.id === connectionId).canDisconnect, true);

  const disconnected = resultData(rpc(harness, token, 'disconnectGmail', { connectionId }));
  assert.equal(disconnected.disconnected, true);
  assert.equal(disconnected.providerRevoked, true);
  const saved = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1);
  assert.equal(saved.connections.find(item => item.id === connectionId).status, 'revoked');
  const savedPreference = saved.preferences.find(item => item.userId === OWNER_ID);
  assert.equal(savedPreference.activeConnectionId, 'gmail-owner');
  assert.equal(savedPreference.unifiedConnectionIds.includes(connectionId), false);
  assert.equal(savedPreference.notificationConnectionIds.includes(connectionId), false);
  assert.equal(harness.propertyValues[`MAILBOX_GOOGLE_OAUTH_TOKEN_V1_${connectionId}`], undefined);
  assert.equal(harness.propertyValues[metadataSyncKey], undefined);
  assert.equal(harness.propertyValues[focusKey], undefined);
  assert.equal(harness.propertyValues[attentionKey], undefined);
  assert.equal(harness.cacheValues.has(`mailbox.sendas.v1.${connectionId}`), false);
  assert.deepEqual(JSON.parse(harness.propertyValues.MAILBOX_GOOGLE_REVOKE_QUEUE_V1), []);
  assert.equal(resultFailed(rpc(harness, token, 'disconnectGmail', { connectionId: 'gmail-owner' })).code, 'FORBIDDEN');
});

test('failed Gmail provider revocation stays inaccessible and the minute worker finishes cleanup', () => {
  const connectionId = 'gmail-owner-cleanup';
  let revokeCalls = 0;
  const harness = makeContext({
    urlFetch: () => httpResponse('', ++revokeCalls === 1 ? 503 : 200),
  });
  const token = openOwnerSession(harness);
  const registry = harness.context.mailboxMultiReadRegistry_();
  registry.connections.push({
    id: connectionId, zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'cleanup@example.com', displayName: 'Cleanup', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  });
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);
  harness.propertyValues[`MAILBOX_GOOGLE_OAUTH_TOKEN_V1_${connectionId}`] = JSON.stringify({
    v: 1, email: 'cleanup@example.com', subject: 'subject-cleanup', generation: 1,
    refreshToken: 'gmail-refresh-token-cleanup', accessToken: 'gmail-access-token-cleanup',
    accessExpiresAt: Date.now() + 3600000, scopes: [], updatedAt: Date.now(),
  });

  const disconnected = resultData(rpc(harness, token, 'disconnectGmail', { connectionId }));
  assert.equal(disconnected.cleanupPending, true);
  assert.equal(resultData(rpc(harness, token, 'accountSettings', {})).accounts.some(item => item.id === connectionId), false);
  assert.deepEqual(JSON.parse(harness.propertyValues.MAILBOX_GOOGLE_REVOKE_QUEUE_V1), [connectionId]);

  const cleanup = harness.context.mailboxProcessGoogleRevocations_(1);
  assert.deepEqual(JSON.parse(JSON.stringify(cleanup)), { processed: 1, failed: 0, pending: 0 });
  assert.equal(revokeCalls, 2);
  assert.equal(harness.propertyValues[`MAILBOX_GOOGLE_OAUTH_TOKEN_V1_${connectionId}`], undefined);
  assert.deepEqual(JSON.parse(harness.propertyValues.MAILBOX_GOOGLE_REVOKE_QUEUE_V1), []);
});

test('reconnecting a revoked Gmail identity reuses its tombstone without duplicating the registry id', () => {
  const harness = makeContext();
  openOwnerSession(harness);
  const subject = 'subject-reconnect-unit';
  const connectionId = 'gmail-' +
    harness.context.mailboxMultiHashText_('zone-owner:' + subject).slice(0, 24);
  const registry = harness.context.mailboxMultiReadRegistry_();
  registry.connections.push({
    id: connectionId, zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'reconnect@example.com', displayName: 'Old name', avatarUrl: '',
    status: 'revoked', connectedByUserId: OWNER_ID, connectedAt: Date.now() - 1000,
    tokenGeneration: 1,
  });
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);

  const result = harness.context.mailboxGooglePersistConnection_(
    { zoneId: 'zone-owner', userId: OWNER_ID },
    {
      accessToken: 'gmail-access-token-reconnect',
      refreshToken: 'gmail-refresh-token-reconnect',
      expiresAt: Date.now() + 3600000,
      scopes: ['https://www.googleapis.com/auth/gmail.modify'],
    },
    {
      email: 'reconnect@example.com', subject,
      displayName: 'Reconnected', avatarUrl: '',
    }
  );
  assert.equal(result.account.id, connectionId);
  const saved = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1);
  assert.equal(saved.connections.filter(item => item.id === connectionId).length, 1);
  assert.equal(saved.connections.find(item => item.id === connectionId).status, 'active');
  assert.equal(saved.connections.find(item => item.id === connectionId).tokenGeneration, 2);
});

test('unified inbox cursor merges accounts exactly and remains bound to user and settings', () => {
  const harness = makeContext();
  const registry = harness.context.mailboxMultiReadRegistry_();
  registry.connections.push({
    id: 'gmail-owner-second', zoneId: 'zone-owner', provider: 'google_oauth',
    email: 'second@example.com', displayName: 'Second', avatarUrl: '', status: 'active',
    connectedByUserId: OWNER_ID, connectedAt: Date.now(), tokenGeneration: 1,
  });
  const preference = registry.preferences.find(item => item.userId === OWNER_ID);
  preference.unifiedConnectionIds = ['gmail-owner', 'gmail-owner-second'];
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);
  const session = { userId: OWNER_ID, connectionId: 'gmail-owner', zoneId: 'zone-owner', role: 'owner' };
  const pages = {
    'gmail-owner:': { items: [['a5', 5000], ['a3', 3000]], next: 'owner-next' },
    'gmail-owner:owner-next': { items: [['a1', 1000]], next: '' },
    'gmail-owner-second:': { items: [['b4', 4000], ['b2', 2000]], next: '' },
  };
  const originals = {
    mailboxWithConnection_: harness.context.mailboxWithConnection_,
    mailboxListThreads_: harness.context.mailboxListThreads_,
  };
  let activeConnection = '';
  try {
    harness.context.mailboxWithConnection_ = (_session, connectionId, _role, callback) => {
      activeConnection = connectionId;
      return callback();
    };
    harness.context.mailboxListThreads_ = request => {
      const page = pages[activeConnection + ':' + String(request.pageToken || '')];
      assert.ok(page, 'unexpected unified account page');
      return {
        threads: page.items.map(([id, timestamp]) => ({
          id, timestamp, subject: id, account: {
            id: activeConnection,
            email: activeConnection === 'gmail-owner' ? 'owner@example.com' : 'second@example.com',
          },
        })),
        nextPageToken: page.next,
        resultSizeEstimate: activeConnection === 'gmail-owner' ? 3 : 2,
      };
    };
    const first = harness.context.mailboxListUnifiedThreads_({ folder: 'Inbox', pageSize: 2 }, session);
    assert.deepEqual(Array.from(first.threads, item => item.id), ['a5', 'b4']);
    assert.match(first.nextPageToken, /^[A-Za-z0-9_-]{43}$/);
    const second = harness.context.mailboxListUnifiedThreads_({
      folder: 'Inbox', pageSize: 2, pageToken: first.nextPageToken,
    }, session);
    assert.deepEqual(Array.from(second.threads, item => item.id), ['a3', 'b2']);
    assert.equal(second.nextPageToken, first.nextPageToken);
    const third = harness.context.mailboxListUnifiedThreads_({
      folder: 'Inbox', pageSize: 2, pageToken: first.nextPageToken,
    }, session);
    assert.deepEqual(Array.from(third.threads, item => item.id), ['a1']);
    assert.equal(third.nextPageToken, '');
    assert.equal(third.resultSizeEstimate, 5);

    const fresh = harness.context.mailboxListUnifiedThreads_({ folder: 'Inbox', pageSize: 1 }, session);
    assert.equal(resultFailed(harness.context.mailboxRpc(
      resultData(harness.context.mailboxOpenSession(telegramInitData('999999999'))).sessionToken,
      { op: 'unifiedList', payload: { folder: 'Inbox', pageSize: 1, pageToken: fresh.nextPageToken } }
    )).code, 'UNIFIED_EMPTY');
  } finally {
    Object.assign(harness.context, originals);
  }
});

test('Drive accounts are independent from Gmail senders and isolated by Telegram user', () => {
  const harness = makeContext({ properties: {
    GOOGLE_OAUTH_CLIENT_ID: '123456789-unit-test.apps.googleusercontent.com',
    GOOGLE_OAUTH_CLIENT_SECRET: 'unit-test-google-client-secret-123456789',
    GOOGLE_DRIVE_OAUTH_REDIRECT_URI:
      'https://script.google.com/macros/s/unit-test-deployment_123/exec?action=drive_oauth_callback',
  } });
  const ownerSession = resultData(harness.context.mailboxOpenSession(telegramInitData())).sessionToken;
  const otherUserId = '999999999';
  const otherSession = resultData(harness.context.mailboxOpenSession(telegramInitData(otherUserId))).sessionToken;
  harness.propertyValues.MAILBOX_SOURCE_REGISTRY_V1 = JSON.stringify({
    v: 1,
    revision: 1,
    connections: [{
      id: 'source-drive-other-unit', provider: 'drive', ownerUserId: otherUserId,
      email: 'drive-only@example.com', displayName: 'Drive only', avatarUrl: '',
      status: 'active', connectedAt: Date.now(), tokenGeneration: 1,
    }],
    preferences: [{
      userId: otherUserId, active: { drive: 'source-drive-other-unit' }, updatedAt: Date.now(),
    }],
  });

  const visible = resultData(rpc(harness, otherSession, 'sourceAccounts', { provider: 'drive' }));
  assert.equal(visible.activeSourceConnectionId, 'source-drive-other-unit');
  assert.equal(visible.accounts[0].email, 'drive-only@example.com');
  assert.deepEqual(resultData(rpc(harness, ownerSession, 'sourceAccounts', { provider: 'drive' })).accounts, []);
  assert.equal(resultFailed(rpc(harness, ownerSession, 'sourceSelect', {
    provider: 'drive', sourceConnectionId: 'source-drive-other-unit',
  })).code, 'FORBIDDEN');
  assert.equal(resultFailed(rpc(harness, otherSession, 'sourceList', {
    provider: 'drive', query: '',
  })).code, 'FORBIDDEN',
  'a non-owner must connect a personal Drive source instead of inheriting the legacy owner source');
  assert.equal(resultFailed(rpc(harness, otherSession, 'boxStatus', {})).code, 'FORBIDDEN',
    'legacy Box state must remain private to the configured owner');

  const start = resultData(rpc(harness, otherSession, 'sourceConnectStart', {
    provider: 'drive', loginHint: 'another-drive@example.com',
  }));
  const url = new URL(start.authorizationUrl);
  assert.equal(url.origin, 'https://accounts.google.com');
  assert.equal(url.pathname, '/o/oauth2/v2/auth');
  assert.equal(url.searchParams.get('access_type'), 'offline');
  assert.equal(url.searchParams.get('prompt'), 'select_account consent');
  assert.equal(url.searchParams.get('login_hint'), 'another-drive@example.com');
  assert.match(url.searchParams.get('scope'), /drive\.readonly/);
  assert.doesNotMatch(start.authorizationUrl, /client_secret|refresh_token|BOT_TOKEN/i);
});

test('Drive disconnect revokes only the selected source account and removes its active selection', () => {
  const sourceId = 'source-drive-owner-unit';
  const harness = makeContext({
    urlFetch: (url, request) => {
      assert.equal(url, 'https://oauth2.googleapis.com/revoke');
      assert.equal(request.payload.token, 'drive-refresh-token-owner-unit');
      return httpResponse('', 200);
    },
  });
  const token = openOwnerSession(harness);
  harness.propertyValues.MAILBOX_SOURCE_REGISTRY_V1 = JSON.stringify({
    v: 1, revision: 1,
    connections: [{ id: sourceId, provider: 'drive', ownerUserId: OWNER_ID,
      email: 'drive-owner@example.com', displayName: 'Drive owner', avatarUrl: '',
      status: 'active', connectedAt: Date.now(), tokenGeneration: 1 }],
    preferences: [{ userId: OWNER_ID, active: { drive: sourceId }, updatedAt: Date.now() }],
  });
  harness.propertyValues[`MAILBOX_SOURCE_OAUTH_TOKEN_V1_${sourceId}`] = JSON.stringify({
    v: 1, provider: 'drive', email: 'drive-owner@example.com', generation: 1,
    refreshToken: 'drive-refresh-token-owner-unit', accessToken: 'drive-access-token-owner-unit',
    accessExpiresAt: Date.now() + 3600000,
  });
  const disconnected = resultData(rpc(harness, token, 'sourceDisconnect', {
    provider: 'drive', sourceConnectionId: sourceId,
  }));
  assert.equal(disconnected.disconnected, true);
  const registry = JSON.parse(harness.propertyValues.MAILBOX_SOURCE_REGISTRY_V1);
  assert.equal(registry.connections[0].status, 'revoked');
  assert.equal(registry.preferences[0].active.drive, undefined);
  assert.equal(harness.propertyValues[`MAILBOX_SOURCE_OAUTH_TOKEN_V1_${sourceId}`], undefined);
});

test('Box accounts are independent attachment sources and isolated by Telegram user', () => {
  const harness = makeContext({ properties: {
    BOX_CLIENT_ID: 'box-client-unit-12345',
    BOX_CLIENT_SECRET: 'box-client-secret-unit-12345',
    BOX_REDIRECT_URI:
      'https://script.google.com/macros/s/unit-test-deployment_123/exec?action=box_oauth_callback',
  } });
  const ownerSession = resultData(harness.context.mailboxOpenSession(telegramInitData())).sessionToken;
  const otherUserId = '999999999';
  const otherSession = resultData(harness.context.mailboxOpenSession(telegramInitData(otherUserId))).sessionToken;
  harness.propertyValues.MAILBOX_SOURCE_REGISTRY_V1 = JSON.stringify({
    v: 1, revision: 1,
    connections: [{
      id: 'source-box-other-unit', provider: 'box', ownerUserId: otherUserId,
      email: 'box-only@example.com', displayName: 'Box only', avatarUrl: '',
      status: 'active', connectedAt: Date.now(), tokenGeneration: 1,
    }],
    preferences: [{
      userId: otherUserId, active: { box: 'source-box-other-unit' }, updatedAt: Date.now(),
    }],
  });

  const visible = resultData(rpc(harness, otherSession, 'sourceAccounts', { provider: 'box' }));
  assert.equal(visible.activeSourceConnectionId, 'source-box-other-unit');
  assert.equal(visible.accounts[0].email, 'box-only@example.com');
  assert.deepEqual(resultData(rpc(harness, ownerSession, 'sourceAccounts', { provider: 'box' })).accounts, []);
  assert.equal(resultFailed(rpc(harness, ownerSession, 'sourceSelect', {
    provider: 'box', sourceConnectionId: 'source-box-other-unit',
  })).code, 'FORBIDDEN');

  const start = resultData(rpc(harness, otherSession, 'sourceConnectStart', { provider: 'box' }));
  const url = new URL(start.authorizationUrl);
  assert.equal(url.origin, 'https://account.box.com');
  assert.equal(url.pathname, '/api/oauth2/authorize');
  assert.equal(url.searchParams.get('client_id'), 'box-client-unit-12345');
  assert.equal(url.searchParams.get('redirect_uri'), harness.propertyValues.BOX_REDIRECT_URI);
  assert.match(url.searchParams.get('state'), /^[A-Za-z0-9_-]{43}$/);
  assert.doesNotMatch(start.authorizationUrl, /client_secret|refresh_token|BOT_TOKEN/i);
});

test('Box source reauthorization durably replaces and revokes only the prior grant', () => {
  const sourceId = 'source-box-owner-unit';
  const revoked = [];
  const harness = makeContext({
    properties: {
      BOX_CLIENT_ID: 'box-client-unit-12345',
      BOX_CLIENT_SECRET: 'box-client-secret-unit-12345',
      BOX_REDIRECT_URI:
        'https://script.google.com/macros/s/unit-test-deployment_123/exec?action=box_oauth_callback',
    },
    urlFetch: (url, request) => {
      assert.equal(url, 'https://api.box.com/oauth2/revoke');
      revoked.push(request.payload.token);
      return httpResponse('', 200);
    },
  });
  harness.propertyValues.MAILBOX_SOURCE_REGISTRY_V1 = JSON.stringify({
    v: 1, revision: 1,
    connections: [{ id: sourceId, provider: 'box', ownerUserId: OWNER_ID,
      email: 'box-owner@example.com', displayName: 'Old Box', avatarUrl: '',
      status: 'active', connectedAt: Date.now(), tokenGeneration: 1 }],
    preferences: [{ userId: OWNER_ID, active: { box: sourceId }, updatedAt: Date.now() }],
  });
  harness.propertyValues[`MAILBOX_SOURCE_OAUTH_TOKEN_V1_${sourceId}`] = JSON.stringify({
    v: 1, status: 'active', provider: 'box', generation: 1,
    accessToken: 'box-old-access-token-unit', refreshToken: 'box-old-refresh-token-unit',
    accessExpiresAt: Date.now() + 3600000, refreshExpiresAt: Date.now() + 86400000,
    updatedAt: Date.now(), account: { id: '12345' },
  });

  const result = harness.context.mailboxBoxSourcePersistConnection_(
    { userId: OWNER_ID },
    { accessToken: 'box-new-access-token-unit', refreshToken: 'box-new-refresh-token-unit', expiresIn: 3600 },
    { account: { id: '12345', login: 'box-owner@example.com', name: 'New Box' } }
  );
  assert.equal(result.account.id, sourceId);
  assert.deepEqual(revoked, ['box-old-refresh-token-unit']);
  const registry = JSON.parse(harness.propertyValues.MAILBOX_SOURCE_REGISTRY_V1);
  assert.equal(registry.connections[0].tokenGeneration, 2);
  assert.equal(registry.connections[0].displayName, 'New Box');
  const current = JSON.parse(harness.propertyValues[`MAILBOX_SOURCE_OAUTH_TOKEN_V1_${sourceId}`]);
  assert.equal(current.generation, 2);
  assert.equal(current.refreshToken, 'box-new-refresh-token-unit');
  assert.equal(
    Object.keys(harness.propertyValues).filter(name => name.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_')).length,
    0,
    'a provider-confirmed revoke must clear the protected cleanup entry'
  );
});

test('Box source refresh journals old and new grants and fails closed after ambiguous transport', () => {
  const sourceId = 'source-box-refresh-unit';
  const makeSourceHarness = urlFetch => {
    const harness = makeContext({
      properties: {
        BOX_CLIENT_ID: 'box-client-unit-12345',
        BOX_CLIENT_SECRET: 'box-client-secret-unit-12345',
        BOX_REDIRECT_URI:
          'https://script.google.com/macros/s/unit-test-deployment_123/exec?action=box_oauth_callback',
      },
      urlFetch,
    });
    harness.propertyValues.MAILBOX_SOURCE_REGISTRY_V1 = JSON.stringify({
      v: 1, revision: 1,
      connections: [{ id: sourceId, provider: 'box', ownerUserId: OWNER_ID,
        email: 'box-refresh@example.com', displayName: 'Box refresh', avatarUrl: '',
        status: 'active', connectedAt: Date.now(), tokenGeneration: 1 }],
      preferences: [{ userId: OWNER_ID, active: { box: sourceId }, updatedAt: Date.now() }],
    });
    harness.propertyValues[`MAILBOX_SOURCE_OAUTH_TOKEN_V1_${sourceId}`] = JSON.stringify({
      v: 1, status: 'active', provider: 'box', generation: 1,
      accessToken: 'box-expired-access-token-unit', refreshToken: 'box-old-refresh-token-unit',
      accessExpiresAt: Date.now() - 1000, refreshExpiresAt: Date.now() + 86400000,
      updatedAt: Date.now(), account: { id: '12345' },
    });
    return harness;
  };

  const revoked = [];
  const successful = makeSourceHarness((url, request) => {
    if (url === 'https://api.box.com/oauth2/token') {
      assert.equal(request.payload.refresh_token, 'box-old-refresh-token-unit');
      return jsonResponse({ access_token: 'box-new-access-token-unit',
        refresh_token: 'box-new-refresh-token-unit', expires_in: 3600, token_type: 'bearer' });
    }
    assert.equal(url, 'https://api.box.com/oauth2/revoke');
    revoked.push(request.payload.token);
    return httpResponse('', 200);
  });
  assert.equal(
    successful.context.mailboxBoxSourceAccessToken_({ userId: OWNER_ID }, sourceId, false),
    'box-new-access-token-unit'
  );
  assert.deepEqual(revoked, ['box-old-refresh-token-unit']);
  const current = JSON.parse(successful.propertyValues[`MAILBOX_SOURCE_OAUTH_TOKEN_V1_${sourceId}`]);
  assert.equal(current.refreshToken, 'box-new-refresh-token-unit');
  assert.equal(Object.keys(successful.propertyValues)
    .filter(name => name.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_')).length, 0);

  const ambiguous = makeSourceHarness((url) => {
    if (url === 'https://api.box.com/oauth2/token') throw new Error('network lost after request');
    return httpResponse(JSON.stringify({ error: 'temporarily_unavailable' }), 503);
  });
  assert.throws(
    () => ambiguous.context.mailboxBoxSourceAccessToken_({ userId: OWNER_ID }, sourceId, true),
    error => error && error.mailboxCode === 'SOURCE_REAUTH_REQUIRED'
  );
  const failedRegistry = JSON.parse(ambiguous.propertyValues.MAILBOX_SOURCE_REGISTRY_V1);
  assert.equal(failedRegistry.connections[0].status, 'reauth_required');
  assert.equal(Object.keys(ambiguous.propertyValues)
    .filter(name => name.startsWith('BOX_OAUTH_PENDING_REVOCATION_V1_')).length, 1,
    'the possibly consumed refresh token must remain in protected cleanup storage'
  );
});

test('send-later persists a content-free account-bound schedule and cancels by revision', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const operationId = 'scheduled-send-operation-0001';
  const draftId = 'draft_scheduled_0001';
  let messageIdHeader = '<scheduled-0001@example.test>';
  let draftReads = 0;
  harness.setGmail((requestPath, options) => {
    assert.equal(String(options.method || 'get').toLowerCase(), 'get');
    if (requestPath === `/drafts/${draftId}?format=full`) {
      draftReads += 1;
      return { id: draftId, message: { id: 'message_scheduled_0001', threadId: 'thread_scheduled_0001',
        payload: { headers: [{ name: 'Message-ID', value: messageIdHeader }] } } };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const dueAt = Date.now() + 10 * 60 * 1000;
  const request = { draftId, clientOperationId: operationId, dueAt, timezone: 'Europe/Brussels' };
  const scheduled = resultData(rpc(harness, token, 'scheduleDraftSend', request));
  assert.equal(scheduled.state, 'scheduled');
  assert.equal(scheduled.revision, 1);
  assert.equal(draftReads, 1);
  const rows = Object.entries(harness.propertyValues)
    .filter(([key]) => key.startsWith('MAILBOX_SCHEDULED_SEND_V1_'));
  assert.equal(rows.length, 1);
  const durable = JSON.parse(rows[0][1]);
  assert.equal(durable.userId, OWNER_ID);
  assert.equal(durable.connectionId, 'gmail-owner');
  assert.equal(durable.draftId, draftId);
  assert.equal(durable.messageIdHeader, messageIdHeader);
  assert.equal(JSON.stringify(durable).includes('recipient@example.com'), false);
  assert.equal(JSON.stringify(durable).includes('message body'), false);
  assert.equal(resultData(rpc(harness, token, 'scheduleDraftSend', request)).revision, 1);
  assert.equal(draftReads, 1, 'an idempotent retry must use the durable row without depending on the draft still existing');
  assert.equal(resultFailed(rpc(harness, token, 'scheduleDraftSend', {
    ...request, dueAt: dueAt + 60000,
  })).code, 'OPERATION_CONFLICT');
  harness.propertyValues.MAILBOX_SCHEDULED_SEND_V1_corrupt = '{broken';
  assert.equal(resultData(rpc(harness, token, 'scheduledSendState')).items.length, 1,
    'one corrupt prefixed row must not block a valid tenant schedule');
  messageIdHeader = '<scheduled-0001-edited@example.test>';
  const rescheduled = resultData(rpc(harness, token, 'rescheduleDraftSend', {
    clientOperationId: operationId,
    expectedRevision: scheduled.revision,
    dueAt: dueAt + 120000,
    timezone: 'Europe/Brussels',
  }));
  assert.equal(rescheduled.state, 'scheduled');
  assert.equal(rescheduled.revision, 2);
  assert.equal(JSON.parse(rows[0][1]).messageIdHeader, '<scheduled-0001@example.test>',
    'the captured fixture snapshot must stay immutable');
  assert.equal(JSON.parse(harness.propertyValues[rows[0][0]]).messageIdHeader, messageIdHeader);
  const cancelled = resultData(rpc(harness, token, 'cancelScheduledSend', {
    clientOperationId: operationId, expectedRevision: rescheduled.revision,
  }));
  assert.equal(cancelled.state, 'cancelled');
  assert.equal(cancelled.revision, 3);
  const overdue = JSON.parse(harness.propertyValues[rows[0][0]]);
  overdue.dueAt = 1;
  overdue.requestHash = harness.context.mailboxOperationRequestHash_(
    { draftId, dueAt: 1, timezone: 'Europe/Brussels' }, []
  );
  harness.propertyValues[rows[0][0]] = JSON.stringify(overdue);
  assert.equal(resultData(rpc(harness, token, 'scheduleDraftSend', {
    draftId, clientOperationId: operationId, dueAt: 1, timezone: 'Europe/Brussels',
  })).state, 'cancelled', 'an overdue exact retry must return the durable result before future-window validation');
  assert.equal(harness.gmailCalls.every(call => String(call.options.method || 'get') === 'get'), true);
});

test('send-later worker sends one exact draft and never repeats a confirmed POST', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const operationId = 'scheduled-send-operation-0002';
  const draftId = 'draft_scheduled_0002';
  const threadId = 'thread_scheduled_0002';
  const messageIdHeader = '<scheduled-0002@example.test>';
  let sendPosts = 0;
  const draft = { id: draftId, message: { id: 'message_scheduled_0002', threadId,
    payload: { headers: [{ name: 'Message-ID', value: messageIdHeader }] } } };
  harness.setGmail((requestPath) => {
    if (requestPath === `/drafts/${draftId}?format=full`) return draft;
    if (requestPath === '/drafts/send') {
      sendPosts += 1;
      const schedule = Object.entries(harness.propertyValues)
        .filter(([key]) => key.startsWith('MAILBOX_SCHEDULED_SEND_V1_'))
        .map(([, value]) => JSON.parse(value))[0];
      assert.equal(schedule.state, 'sending');
      const operation = Object.entries(harness.propertyValues)
        .filter(([key]) => key.startsWith('MAILBOX_DRAFT_OPERATION_V1_'))
        .map(([, value]) => JSON.parse(value))[0];
      assert.equal(operation.state, 'dispatching');
      return { id: 'sent_scheduled_0002', threadId, historyId: 'history_scheduled_0002', labelIds: ['SENT'] };
    }
    if (requestPath.startsWith('/messages?maxResults=10&includeSpamTrash=true&q=')) return { messages: [] };
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  resultData(rpc(harness, token, 'scheduleDraftSend', {
    draftId, clientOperationId: operationId, dueAt: Date.now() + 120000, timezone: 'Europe/Brussels',
  }));
  const scheduleKey = Object.keys(harness.propertyValues)
    .find(key => key.startsWith('MAILBOX_SCHEDULED_SEND_V1_'));
  const due = JSON.parse(harness.propertyValues[scheduleKey]);
  due.dueAt = Date.now() - 1;
  due.nextRetryAt = due.dueAt;
  harness.propertyValues[scheduleKey] = JSON.stringify(due);
  const first = harness.context.mailboxProcessDueScheduledSends_(3);
  assert.deepEqual(JSON.parse(JSON.stringify(first)), { attempted: 1, completed: 1, failed: 0, pending: 0 });
  assert.equal(sendPosts, 1);
  assert.equal(JSON.parse(harness.propertyValues[scheduleKey]).state, 'sent');
  assert.equal(harness.context.mailboxProcessDueScheduledSends_(3).attempted, 0);
  assert.equal(sendPosts, 1);
});

test('send-later uncertain Gmail outcome remains readback-only until Sent proves completion', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const operationId = 'scheduled-send-operation-0003';
  const draftId = 'draft_scheduled_0003';
  const threadId = 'thread_scheduled_0003';
  const messageIdHeader = '<scheduled-0003@example.test>';
  const draft = { id: draftId, message: { id: 'draft_message_0003', threadId,
    payload: { headers: [{ name: 'Message-ID', value: messageIdHeader }] } } };
  let sendPosts = 0;
  let sentSearches = 0;
  let gmailAccepted = false;
  harness.setGmail((requestPath) => {
    if (requestPath === `/drafts/${draftId}?format=full`) {
      if (gmailAccepted) {
        const error = new Error('draft disappeared after Gmail accepted send');
        error.gmailHttpStatus = 404;
        throw error;
      }
      return draft;
    }
    if (requestPath === '/drafts/send') {
      sendPosts += 1;
      gmailAccepted = true;
      const error = new Error('transport lost after Gmail accepted send');
      error.gmailOutcomeUncertain = true;
      throw error;
    }
    if (requestPath.startsWith('/messages?maxResults=10&includeSpamTrash=true&q=')) {
      sentSearches += 1;
      return sentSearches === 1 ? { messages: [] } : { messages: [{ id: 'sent_scheduled_0003', threadId }] };
    }
    if (requestPath === '/messages/sent_scheduled_0003?format=metadata&metadataHeaders=Message-ID') {
      return { id: 'sent_scheduled_0003', threadId, historyId: 'history_scheduled_0003', labelIds: ['SENT'],
        payload: { headers: [{ name: 'Message-ID', value: messageIdHeader }] } };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  resultData(rpc(harness, token, 'scheduleDraftSend', {
    draftId, clientOperationId: operationId, dueAt: Date.now() + 120000, timezone: 'Europe/Brussels',
  }));
  const scheduleKey = Object.keys(harness.propertyValues)
    .find(key => key.startsWith('MAILBOX_SCHEDULED_SEND_V1_'));
  let row = JSON.parse(harness.propertyValues[scheduleKey]);
  row.dueAt = Date.now() - 1;
  row.nextRetryAt = row.dueAt;
  harness.propertyValues[scheduleKey] = JSON.stringify(row);
  assert.equal(harness.context.mailboxProcessDueScheduledSends_(1).failed, 1);
  assert.equal(sendPosts, 1);
  row = JSON.parse(harness.propertyValues[scheduleKey]);
  assert.equal(row.state, 'sending');
  assert.equal(row.phase, 'readback_only');
  row.leaseUntil = 0;
  row.nextRetryAt = Date.now() - 1;
  harness.propertyValues[scheduleKey] = JSON.stringify(row);
  assert.equal(harness.context.mailboxProcessDueScheduledSends_(1).completed, 1);
  assert.equal(sendPosts, 1);
  assert.equal(JSON.parse(harness.propertyValues[scheduleKey]).state, 'sent');
});

test('send-later isolation hides another Telegram user schedule and changed drafts never send', () => {
  const harness = makeContext();
  const ownerToken = openOwnerSession(harness);
  const operationId = 'scheduled-send-operation-0004';
  const draftId = 'draft_scheduled_0004';
  const originalMessageId = '<scheduled-0004@example.test>';
  let changed = false;
  let sendPosts = 0;
  harness.setGmail(requestPath => {
    if (requestPath === `/drafts/${draftId}?format=full`) {
      return { id: draftId, message: { id: 'draft_message_0004', threadId: 'thread_scheduled_0004',
        payload: { headers: [{ name: 'Message-ID', value: changed ? '<changed@example.test>' : originalMessageId }] } } };
    }
    if (requestPath === '/drafts/send') { sendPosts += 1; return {}; }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const scheduled = resultData(rpc(harness, ownerToken, 'scheduleDraftSend', {
    draftId, clientOperationId: operationId, dueAt: Date.now() + 120000, timezone: 'Europe/Brussels',
  }));
  const registry = JSON.parse(harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 ||
    JSON.stringify(harness.context.mailboxMultiInitialRegistry_(OWNER_ID)));
  const ownerMember = registry.members.find(item => item.userId === OWNER_ID);
  registry.members.push({
    ...ownerMember,
    userId: '427886280',
    role: 'responder',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  registry.revision += 1;
  harness.propertyValues.MAILBOX_TENANT_REGISTRY_V1 = JSON.stringify(registry);
  const otherOpened = resultData(harness.context.mailboxOpenSession(telegramInitData('427886280')));
  const otherToken = String(otherOpened.sessionToken || otherOpened.session || otherOpened.token);
  assert.deepEqual(JSON.parse(JSON.stringify(resultData(rpc(harness, otherToken, 'scheduledSendState')).items)), []);
  assert.equal(resultFailed(rpc(harness, otherToken, 'cancelScheduledSend', {
    clientOperationId: operationId, expectedRevision: scheduled.revision,
  })).code, 'NOT_FOUND');
  const scheduleKey = Object.keys(harness.propertyValues)
    .find(key => key.startsWith('MAILBOX_SCHEDULED_SEND_V1_'));
  const row = JSON.parse(harness.propertyValues[scheduleKey]);
  row.dueAt = Date.now() - 1;
  row.nextRetryAt = row.dueAt;
  harness.propertyValues[scheduleKey] = JSON.stringify(row);
  changed = true;
  assert.equal(harness.context.mailboxProcessDueScheduledSends_(1).completed, 1);
  assert.equal(sendPosts, 0);
  const final = JSON.parse(harness.propertyValues[scheduleKey]);
  assert.equal(final.state, 'needs_review');
  assert.equal(final.errorCode, 'DRAFT_CHANGED');
});

test('minute worker includes bounded send-later processing without adding another trigger', () => {
  const timerStart = codeSource.indexOf('function checkNewMail_()');
  const timerEnd = codeSource.indexOf('\nfunction runMultiAccountMailChecks_', timerStart);
  const timer = codeSource.slice(timerStart, timerEnd);
  assert.match(timer, /mailboxProcessDueScheduledSends_\(3\)/);
  assert.match(timer, /mailboxProcessExpiredFunctionalMetrics_\(\)/,
    'the existing minute trigger must perform the internally once-daily metrics retention purge');
  assert.equal((codeSource.match(/\.everyMinutes\(CONFIG\.POLL_MINUTES\)/g) || []).length, 1);
  const multiStart = codeSource.indexOf('function runMultiAccountMailChecks_(');
  const multiEnd = codeSource.indexOf('\nfunction initializeGmailNotificationWatermark_', multiStart);
  const multi = codeSource.slice(multiStart, multiEnd);
  assert.match(multi, /userId === ownerId && connectionEmail === legacyEmail/,
    'the owner Gmail must not be scanned once by legacy and again by OAuth');
  assert.match(multi, /scheduledMailboxes\.has\(mailboxKey\)/,
    'same-user connections to the same physical mailbox must produce one notification scan');
});

test('send-later storage failure accepts no work and an expired claim cannot outlive its lease token', () => {
  const draftId = 'draft_scheduled_fencing_1';
  const operationId = 'scheduled-send-operation-fencing-0001';
  const draft = { id: draftId, message: { id: 'draft_message_fencing_1', threadId: 'thread_fencing_1',
    payload: { headers: [{ name: 'Message-ID', value: '<scheduled-fencing@example.test>' }] } } };
  const rejected = makeContext({
    propertySet: key => {
      if (key.startsWith('MAILBOX_SCHEDULED_SEND_V1_')) throw new Error('synthetic storage pressure');
    },
  });
  rejected.setGmail(requestPath => {
    if (requestPath === `/drafts/${draftId}?format=full`) return draft;
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const rejectedToken = openOwnerSession(rejected);
  assert.equal(resultFailed(rpc(rejected, rejectedToken, 'scheduleDraftSend', {
    draftId, clientOperationId: operationId,
    dueAt: Date.now() + 120000, timezone: 'Europe/Brussels',
  })).code, 'STORAGE_FULL');
  assert.equal(Object.keys(rejected.propertyValues)
    .some(key => key.startsWith('MAILBOX_SCHEDULED_SEND_V1_')), false);
  assert.equal(rejected.gmailCalls.every(call => String(call.options.method || 'get') === 'get'), true);

  const harness = makeContext();
  harness.setGmail(requestPath => {
    if (requestPath === `/drafts/${draftId}?format=full`) return draft;
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  const token = openOwnerSession(harness);
  resultData(rpc(harness, token, 'scheduleDraftSend', {
    draftId, clientOperationId: operationId,
    dueAt: Date.now() + 120000, timezone: 'Europe/Brussels',
  }));
  const key = Object.keys(harness.propertyValues)
    .find(name => name.startsWith('MAILBOX_SCHEDULED_SEND_V1_'));
  let row = JSON.parse(harness.propertyValues[key]);
  row.dueAt = Date.now() - 1;
  row.nextRetryAt = row.dueAt;
  harness.propertyValues[key] = JSON.stringify(row);
  const firstClaim = harness.context.mailboxClaimScheduledSend_(key, Date.now());
  row = JSON.parse(harness.propertyValues[key]);
  row.leaseUntil = Date.now() - 1;
  row.nextRetryAt = row.leaseUntil;
  harness.propertyValues[key] = JSON.stringify(row);
  const secondClaim = harness.context.mailboxClaimScheduledSend_(key, Date.now());
  assert.notEqual(firstClaim.operationToken, secondClaim.operationToken);
  assert.throws(
    () => harness.context.mailboxRenewScheduledSendClaim_(firstClaim),
    error => error && error.mailboxCode === 'OPERATION_CONFLICT'
  );
  assert.equal(harness.gmailCalls.filter(call => String(call.options.method || 'get') !== 'get').length, 0);
});

test('send-later separates active quota from compactable terminal history and validates real timezones', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const scope = harness.context.mailboxScheduledSendScope_({ userId: OWNER_ID, connectionId: 'gmail-owner' });
  for (let index = 0; index < 40; index += 1) {
    const operationId = `terminal-schedule-operation-${String(index).padStart(4, '0')}`;
    const draftId = `terminal_draft_${String(index).padStart(4, '0')}`;
    const key = harness.context.mailboxScheduledSendKey_(scope.id, operationId);
    harness.propertyValues[key] = JSON.stringify({
      v: 1, operationId, userId: OWNER_ID, connectionId: 'gmail-owner', draftId,
      messageIdHeader: `<terminal-${index}@example.test>`,
      requestHash: harness.context.mailboxOperationRequestHash_({ draftId, dueAt: 1, timezone: 'UTC' }, []),
      dueAt: 1, timezone: 'UTC', state: 'cancelled', revision: 1, phase: '', operationToken: '',
      leaseUntil: 0, attempts: 0, nextRetryAt: 0, result: null, errorCode: '',
      createdAt: Date.now() - 100000 + index, updatedAt: Date.now() - 100000 + index, reserve: '',
    });
  }
  const draftId = 'draft_after_terminal_history_1';
  harness.setGmail(requestPath => {
    if (requestPath === `/drafts/${draftId}?format=full`) {
      return { id: draftId, message: { id: 'message_after_terminal_history_1', threadId: 'thread_after_terminal_history_1',
        payload: { headers: [{ name: 'Message-ID', value: '<after-terminal-history@example.test>' }] } } };
    }
    throw new Error(`Unexpected Gmail request: ${requestPath}`);
  });
  assert.equal(resultData(rpc(harness, token, 'scheduleDraftSend', {
    draftId, clientOperationId: 'active-after-terminal-history-0001',
    dueAt: Date.now() + 120000, timezone: 'Europe/Brussels',
  })).state, 'scheduled');
  assert.equal(Object.keys(harness.propertyValues)
    .filter(key => key.startsWith('MAILBOX_SCHEDULED_SEND_V1_')).length, 40,
    'the oldest compactable terminal row should yield one slot without consuming active quota');

  const invalidTimezone = makeContext({
    formatDate: (date, timezone) => {
      if (timezone === 'Europe/Atlantis') throw new Error('invalid timezone');
      return new Date(date).toISOString();
    },
  });
  const invalidToken = openOwnerSession(invalidTimezone);
  assert.equal(resultFailed(rpc(invalidTimezone, invalidToken, 'scheduleDraftSend', {
    draftId: 'draft_invalid_timezone_1', clientOperationId: 'invalid-timezone-operation-0001',
    dueAt: Date.now() + 120000, timezone: 'Europe/Atlantis',
  })).code, 'INVALID_REQUEST');
  assert.equal(invalidTimezone.gmailCalls.length, 0);
});

// Source request: REQ-0015.
function installGoogleRefreshFixture(harness, overrides = {}) {
  const connection = {
    id: overrides.connectionId || 'gmail-refresh-connection',
    userId: String(overrides.userId || OWNER_ID),
    zoneId: overrides.zoneId || 'zone-owner',
    provider: 'google_oauth',
    email: overrides.email || 'refresh.fixture@example.com',
    status: 'active',
    tokenGeneration: Number(overrides.tokenGeneration || 1)
  };
  const key = `MAILBOX_GOOGLE_OAUTH_TOKEN_V1_${connection.id}`;
  const record = {
    v: 1,
    connectionId: connection.id,
    email: connection.email,
    generation: connection.tokenGeneration,
    refreshToken: 'test-refresh-token-00000001',
    accessToken: 'expired-test-access-token',
    accessTokenExpiresAt: Date.now() - 60000,
    updatedAt: new Date(Date.now() - 120000).toISOString()
  };
  harness.propertyValues[key] = JSON.stringify(record);
  harness.context.mailboxMultiReadRegistry_ = () => ({ connections: [connection] });
  harness.context.mailboxGoogleOAuthConfig_ = () => ({
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret'
  });
  return { connection, key, record };
}

function installTrackedGoogleRefreshLock(harness, state) {
  harness.context.LockService = {
    getScriptLock() {
      return {
        tryLock() {
          assert.equal(state.depth, 0);
          state.depth += 1;
          state.calls += 1;
          return true;
        },
        releaseLock() {
          assert.equal(state.depth, 1);
          state.depth -= 1;
        }
      };
    }
  };
}

test('Gmail token refresh keeps provider I/O outside ScriptLock and commits through a lease', () => {
  const harness = makeContext();
  const fixture = installGoogleRefreshFixture(harness);
  const lockState = { depth: 0, calls: 0 };
  let fetchCalls = 0;
  installTrackedGoogleRefreshLock(harness, lockState);
  harness.context.UrlFetchApp = {
    fetch(url, request) {
      fetchCalls += 1;
      assert.equal(lockState.depth, 0);
      assert.equal(url, 'https://oauth2.googleapis.com/token');
      assert.equal(request.payload.refresh_token, fixture.record.refreshToken);
      return {
        getResponseCode: () => 200,
        getContentText: () => JSON.stringify({ access_token: 'fresh-test-access-token', expires_in: 3600 })
      };
    }
  };

  const token = harness.context.mailboxGoogleRefreshAccess_(fixture.key, fixture.record, fixture.connection);
  const stored = JSON.parse(harness.propertyValues[fixture.key]);
  const leaseKey = harness.context.mailboxGoogleRefreshLeaseKey_(fixture.key);
  assert.equal(token, 'fresh-test-access-token');
  assert.equal(stored.accessToken, token);
  assert.ok(stored.accessTokenExpiresAt > Date.now() + 3500000);
  assert.equal(fetchCalls, 1);
  assert.equal(lockState.depth, 0);
  assert.ok(lockState.calls >= 2);
  assert.equal(Object.prototype.hasOwnProperty.call(harness.propertyValues, leaseKey), false);
});

test('Gmail token refresh rejects an active lease and reuses a fresh protected token', () => {
  const harness = makeContext();
  const fixture = installGoogleRefreshFixture(harness);
  let fetchCalls = 0;
  harness.context.UrlFetchApp = { fetch() { fetchCalls += 1; throw new Error('unexpected fetch'); } };
  const leaseKey = harness.context.mailboxGoogleRefreshLeaseKey_(fixture.key);
  harness.propertyValues[leaseKey] = JSON.stringify({
    v: 1,
    owner: 'another-refresh-owner',
    connectionId: fixture.connection.id,
    generation: fixture.connection.tokenGeneration,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 60000
  });

  assert.throws(
    () => harness.context.mailboxGoogleRefreshAccess_(fixture.key, fixture.record, fixture.connection),
    (error) => error && error.mailboxCode === 'BUSY'
  );
  assert.equal(fetchCalls, 0);

  const freshRecord = Object.assign({}, fixture.record, {
    accessToken: 'already-committed-access-token',
    accessTokenExpiresAt: Date.now() + 3600000,
    updatedAt: new Date().toISOString()
  });
  harness.propertyValues[fixture.key] = JSON.stringify(freshRecord);
  const token = harness.context.mailboxGoogleRefreshAccess_(fixture.key, fixture.record, fixture.connection);
  assert.equal(token, freshRecord.accessToken);
  assert.equal(fetchCalls, 0);
});

test('failed Gmail token refresh releases its lease and preserves protected token state', () => {
  const harness = makeContext();
  const fixture = installGoogleRefreshFixture(harness);
  const original = harness.propertyValues[fixture.key];
  harness.context.UrlFetchApp = {
    fetch() {
      return {
        getResponseCode: () => 503,
        getContentText: () => JSON.stringify({ error: 'temporarily_unavailable' })
      };
    }
  };

  assert.throws(
    () => harness.context.mailboxGoogleRefreshAccess_(fixture.key, fixture.record, fixture.connection),
    (error) => error && error.mailboxCode === 'REAUTH_REQUIRED'
  );
  const leaseKey = harness.context.mailboxGoogleRefreshLeaseKey_(fixture.key);
  assert.equal(harness.propertyValues[fixture.key], original);
  assert.equal(Object.prototype.hasOwnProperty.call(harness.propertyValues, leaseKey), false);
});

test('draft restart status distinguishes a missing operation and terminalizes a never-dispatched reservation', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const missing = resultData(rpc(harness, token, 'draftOperationStatus', {
    clientOperationId: 'restart-status-missing-0001',
  }));
  assert.equal(missing.status, 'missing');

  const operationId = 'restart-status-reserved-0001';
  const reserved = harness.context.mailboxReserveDraftOperation_(
    'draft_create',
    operationId,
    harness.context.mailboxDigestText_('restart-status-reserved'),
    {}
  );
  const status = resultData(rpc(harness, token, 'draftOperationStatus', {
    clientOperationId: operationId,
  }));
  assert.equal(status.status, 'not_dispatched');
  const stored = JSON.parse(harness.propertyValues[reserved._key]);
  assert.equal(stored.state, 'failed');
  assert.equal(harness.gmailCalls.length, 0);
});

test('draft restart status performs read-only canonical reconciliation for a committed operation', () => {
  const harness = makeContext();
  const token = openOwnerSession(harness);
  const operationId = 'restart-status-committed-0001';
  const draftId = 'draft_restart_status_1';
  const reserved = harness.context.mailboxReserveDraftOperation_(
    'draft_create',
    operationId,
    harness.context.mailboxDigestText_('restart-status-committed'),
    {}
  );
  harness.context.mailboxCommitDraftOperation_(reserved, {
    draftId,
    messageId: 'message_restart_status_1',
    threadId: 'thread_restart_status_1',
  });
  harness.setGmail((requestPath, options) => {
    assert.equal(requestPath, `/drafts/${draftId}?format=full`);
    assert.equal(String(options.method).toLowerCase(), 'get');
    return {
      id: draftId,
      message: {
        id: 'message_restart_status_1',
        threadId: 'thread_restart_status_1',
        internalDate: '1710000000000',
        labelIds: ['DRAFT'],
        payload: {
          mimeType: 'text/plain',
          headers: [
            { name: 'Message-ID', value: reserved.messageIdHeader },
            { name: 'To', value: 'recipient@example.com' },
            { name: 'Subject', value: 'Restart recovery' },
          ],
          body: {
            data: Buffer.from('Recovered body', 'utf8').toString('base64url'),
            size: Buffer.byteLength('Recovered body'),
          },
        },
      },
    };
  });

  const status = resultData(rpc(harness, token, 'draftOperationStatus', {
    clientOperationId: operationId,
  }));
  assert.equal(status.status, 'committed');
  assert.equal(status.draftId, draftId);
  assert.equal(status.draft.id, draftId);
});
