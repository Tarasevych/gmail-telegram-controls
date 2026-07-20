const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.resolve(__dirname, '..', '..', 'gmail-oauth-callback.html'), 'utf8');

test('GitHub OAuth relay strips the query and posts one-use data without Google cookies', () => {
  assert.match(source, /history\.replaceState\(null, "", location\.pathname\)/);
  assert.match(source, /https:\/\/script\.google\.com\/macros\/s\/AKfycbwQkmQIIsboUayMhWdv_DzGj_gbERMKdWEpUVUpIjvwTaIjyjyLaBWUmw1g3lFWFV3Z\/exec/);
  assert.match(source, /body\.set\("action", "gmail_oauth_callback"\)/);
  assert.match(source, /body\.set\("relay", "github_pages_v2"\)/);
  assert.match(source, /body\.set\("state", state\)/);
  assert.match(source, /body\.set\("code", code\)/);
  assert.match(source, /mode: "no-cors"/);
  assert.match(source, /credentials: "omit"/);
  assert.doesNotMatch(source, /body\.set\("(?:authuser|prompt|scope|iss)"/);
  assert.doesNotMatch(source, /client_secret|refresh_token|BOT_TOKEN/i);
  assert.doesNotMatch(source, /localStorage|sessionStorage|console\./);
  const inlineScript = source.match(/<script>([\s\S]+)<\/script>/);
  assert.ok(inlineScript);
  assert.doesNotThrow(() => new vm.Script(inlineScript[1]));
});
