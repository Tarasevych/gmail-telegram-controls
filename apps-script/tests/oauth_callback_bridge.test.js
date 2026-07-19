const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.resolve(__dirname, '..', '..', 'gmail-oauth-callback.html'), 'utf8');

test('Gmail OAuth relay forwards only one-use state and code to the stable Apps Script callback', () => {
  assert.match(source, /history\.replaceState\(null, "", location\.pathname\)/);
  assert.match(source, /callback\.searchParams\.set\("action", "gmail_oauth_callback"\)/);
  assert.match(source, /callback\.searchParams\.set\("state", state\)/);
  assert.match(source, /callback\.searchParams\.set\("code", code\)/);
  assert.doesNotMatch(source, /callback\.searchParams\.set\("(?:authuser|prompt|scope|iss)"/);
  assert.doesNotMatch(source, /localStorage|sessionStorage|console\./);
});
