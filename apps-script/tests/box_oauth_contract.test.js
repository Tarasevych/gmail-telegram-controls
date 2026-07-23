'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', 'MultiAccount.gs'), 'utf8');

function functionSource(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} must exist`);
  const bodyStart = source.indexOf('{', start);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = bodyStart; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === quote) quote = '';
      continue;
    }
    if (character === '"' || character === "'" || character === '`') {
      quote = character;
      continue;
    }
    if (character === '{') depth += 1;
    if (character === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  assert.fail(`${name} has no closing brace`);
}

test('Box authorize URL is least-privilege and does not accept login hints', () => {
  const body = functionSource('mailboxBoxSourceConnectStart_');
  assert.match(body, /scope:\s*['"]root_readonly['"]/);
  assert.doesNotMatch(body, /login[_]?hint/i);
});

test('Box callback validates the provider-specific error description envelope', () => {
  const body = functionSource('mailboxBoxSourceHandleOAuthCallback_');
  assert.match(body, /const errorDescription = String\(input\.errorDescription \|\| ''\)/);
  assert.match(body, /errorDescription\.length > 500/);
  assert.match(body, /\\u0000-\\u001f/);
  assert.match(body, /\(errorDescription && !providerError\)/);
  assert.match(body, /BOX_OAUTH_INVALID/);
});

test('Box reconnect is keyed by stable provider account ID with legacy token-record lookup', () => {
  const body = functionSource('mailboxBoxSourcePersistConnection_');
  assert.match(body, /const stableConnectionId =/);
  assert.match(body, /item\.id === stableConnectionId/);
  assert.match(body, /priorRecord\.account/);
  assert.match(body, /String\(priorRecord\.account\.id\) === accountId/);
  assert.doesNotMatch(body, /item\.email ===/);
  assert.match(body, /id:\s*stableConnectionId/);
  assert.match(body, /connection\.email = normalizedLogin/);
});
