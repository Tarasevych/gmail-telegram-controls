const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.resolve(__dirname, '..', '..', 'gmail-oauth-callback.html'), 'utf8');

test('legacy GitHub OAuth relay is decommissioned and retains no authorization response', () => {
  assert.match(source, /Versie 1 no longer relays OAuth codes through GitHub Pages/);
  assert.match(source, /https:\/\/t\.me\/TarasevychGmailNotifierBot/);
  assert.doesNotMatch(source, /script\.google\.com\/macros\/s\//);
  assert.doesNotMatch(source, /searchParams|location\.search|\bcode\b|\bstate\b/);
  assert.doesNotMatch(source, /localStorage|sessionStorage|console\./);
});
