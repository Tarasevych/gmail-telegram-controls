const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const repo = path.resolve(__dirname, '..', '..');
const bridge = fs.readFileSync(path.join(repo, 'versie-001-staging-acceptance-20260722-v64.html'), 'utf8');
const menu = fs.readFileSync(path.join(repo, 'tools', 'update_bot_menu_versie_001.py'), 'utf8');
const stagingBackend = 'https://script.google.com/macros/s/AKfycbwuOlAB8WGC4MIHDi13zBphtvS3oWgSlMkZnNRTlO7GGS2y4BCNew_7eEDibspIVVvl/exec';
const stagingLauncher = 'https://tarasevych.github.io/gmail-telegram-controls/versie-001-staging-acceptance-20260722-v64.html';
const productionLauncher = 'https://tarasevych.github.io/gmail-telegram-controls/?v=20260715-5&action=mailbox';

test('v64 staging bridge targets only the exact immutable staging deployment', () => {
  assert.ok(bridge.includes(stagingBackend));
  assert.match(bridge, /Gmail Versie 1 staging v64/);
  assert.match(bridge, /mailbox_bootstrap/);
  assert.match(bridge, /init_data/);
  assert.match(bridge, /form.method = 'post'/);
  assert.match(bridge, /noindex,nofollow,noarchive/);
  assert.doesNotMatch(bridge, /v63/);
});

test('owner menu updater no longer selects historical v64 staging', () => {
  assert.ok(menu.includes('PRODUCTION_URL = "' + productionLauncher + '"'));
  assert.doesNotMatch(menu, /STAGING_URL = "https:\/\/tarasevych\.github\.io\/gmail-telegram-controls\/versie-001-staging-acceptance-20260722-v64\.html"/);
});
