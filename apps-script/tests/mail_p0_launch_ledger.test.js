const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

// Source request: REQ-0037 / P0-A.
const root = path.resolve(__dirname, '..', '..');
const code = fs.readFileSync(path.join(root, 'apps-script', 'Code.gs'), 'utf8');

function functionSource(source, name) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} must exist`);
  const bodyStart = source.indexOf('{', start);
  let depth = 0;
  for (let index = bodyStart; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`${name} has no closing brace`);
}

test('issue persists the canonical launch before constructing the response', () => {
  const serve = functionSource(code, 'serveMailboxLaunchPost_');
  const issue = functionSource(code, 'mailboxIssueLaunch_');
  const newRecordPath = issue.slice(issue.indexOf('const expiresAt'));

  assert.match(serve, /mailboxIssueLaunch_\(rawInitData, route\)/);
  assert.doesNotMatch(serve, /mailboxOpenSession|storeMailboxLaunchSession_/);
  assert.ok(
    newRecordPath.indexOf('mailboxPersistLaunchLedgerLocked_') <
      newRecordPath.indexOf('mailboxLaunchResponseForRecord_'),
    'a failure after the durable claim must be replayable without issuing another claim'
  );
});

test('duplicate issue returns the same still-valid deterministic response', () => {
  const issue = functionSource(code, 'mailboxIssueLaunch_');
  const response = functionSource(code, 'mailboxLaunchResponseForRecord_');
  const nonce = functionSource(code, 'mailboxLaunchNonceForClaim_');

  assert.match(issue, /existing\.record\.state === 'issued' && now < existing\.record\.expiresAt/);
  assert.match(issue, /return mailboxLaunchResponseForRecord_\(existing, route\)/);
  assert.match(response, /mailboxLaunchNonceForClaim_\(entry\.claimId, entry\.record\.expiresAt\)/);
  assert.match(nonce, /mailboxLaunchHmac_/);
  assert.doesNotMatch(nonce, /Math\.random|mailboxRandomToken_/);
});

test('redeem atomically claims once and leaves terminal tombstones', () => {
  const claim = functionSource(code, 'mailboxClaimLaunchRedemption_');
  const finish = functionSource(code, 'mailboxFinishLaunchRedemption_');
  const redeem = functionSource(code, 'mailboxRedeemLaunch');

  assert.match(claim, /entry\.record\.state !== 'issued'/);
  assert.match(claim, /entry\.record\.state = 'redeeming'/);
  assert.match(claim, /mailboxPersistLaunchLedgerLocked_\(properties, ledger\)/);
  assert.match(finish, /\['redeemed', 'failed'\]/);
  assert.match(finish, /entry\.record\.state = state/);
  assert.match(redeem, /mailboxFinishLaunchRedemption_\(claim, 'redeemed'\)/);
  assert.match(redeem, /mailboxFinishLaunchRedemption_\(claim, 'failed'\)/);
  assert.doesNotMatch(redeem, /CacheService|cache\.get|cache\.remove/);
});

test('expired launches fail closed and remain bounded until tombstone expiry', () => {
  const issue = functionSource(code, 'mailboxIssueLaunch_');
  const claim = functionSource(code, 'mailboxClaimLaunchRedemption_');
  const read = functionSource(code, 'mailboxReadLaunchLedgerLocked_');

  assert.match(code, /MAILBOX_LAUNCH_NONCE_TTL_MS_ = 60 \* 1000/);
  assert.match(code, /MAILBOX_LAUNCH_TOMBSTONE_TTL_MS_ = 11 \* 60 \* 1000/);
  assert.match(code, /MAILBOX_LAUNCH_LEDGER_LIMIT_ = 100/);
  assert.match(issue, /existing\.record\.state = 'expired'/);
  assert.match(claim, /now >= entry\.record\.expiresAt/);
  assert.match(claim, /entry\.record\.state = 'expired'/);
  assert.match(read, /entry\.record\.purgeAt <= now/);
});

test('anonymous and wrong-principal replay stay fail closed', () => {
  const issue = functionSource(code, 'mailboxIssueLaunch_');
  const resolve = functionSource(code, 'mailboxResolveLaunchOwnerId_');
  const response = functionSource(code, 'mailboxLaunchResponseForRecord_');

  assert.match(issue, /validateTelegramMiniAppIdentity_\(raw\)/);
  assert.match(issue, /mailboxMultiPrincipal_\(String\(user\.id \|\| ''\)\)/);
  assert.match(issue, /constantTimeEqual_\(existing\.record\.ownerScope, ownerScope\)/);
  assert.match(resolve, /item\.status === 'active'/);
  assert.match(resolve, /constantTimeEqual_\(mailboxLaunchOwnerScope_\(userId\), ownerScope\)/);
  assert.match(resolve, /matches\.length !== 1/);
  assert.match(response, /constantTimeEqual_\(entry\.record\.route, mailboxLaunchRouteScope_\(route\)\)/);
});

test('ledger records and persistence exclude launch-sensitive material', () => {
  const record = functionSource(code, 'mailboxLaunchRecord_');
  const persist = functionSource(code, 'mailboxPersistLaunchLedgerLocked_');
  const launchBlock = code.slice(
    code.indexOf('const MAILBOX_LAUNCH_LEDGER_INDEX_'),
    code.indexOf('function normalizeMailboxLaunchRoute_')
  );

  assert.match(record, /nonceHash/);
  assert.match(record, /ownerScope/);
  assert.match(record, /route:/);
  assert.match(record, /expiresAt/);
  assert.match(record, /purgeAt/);
  assert.doesNotMatch(
    record,
    /initData|sessionToken|refreshToken|email|deploymentUrl|userId|firstName|lastName|username/
  );
  assert.doesNotMatch(
    persist,
    /initData|sessionToken|refreshToken|email|deploymentUrl|userId|firstName|lastName|username/
  );
  assert.doesNotMatch(launchBlock, /MAILBOX_INITDATA_CLAIMS|storeMailboxLaunchSession_|CacheService/);
  assert.match(code, /mailboxLaunchCanonicalClaimId_/);
  assert.match(code, /mailboxLaunchRouteScope_/);
  assert.match(code, /mailboxLaunchOwnerScope_/);
});
