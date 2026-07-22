const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const repo = path.resolve(__dirname, '..', '..');
const bridge = fs.readFileSync(path.join(repo, 'versie-001-staging-acceptance-20260722-v58.html'), 'utf8');
const menu = fs.readFileSync(path.join(repo, 'tools', 'update_bot_menu_versie_001.py'), 'utf8');
const stagingBackend = 'https://script.google.com/macros/s/AKfycbzXVL9eBCJoORbdPHABdvKQajja8c2twqdlRKfEMPDh0YQQA2ZINjiJUveG5Os8wztq/exec';
const stagingLauncher = 'https://tarasevych.github.io/gmail-telegram-controls/versie-001-staging-acceptance-20260722-v58.html';
const productionLauncher = 'https://tarasevych.github.io/gmail-telegram-controls/?v=20260715-5&action=mailbox';

test('v58 staging bridge targets only the exact immutable staging deployment', () => {
  assert.ok(bridge.includes(stagingBackend));
  assert.match(bridge, /Gmail Versie 1 staging v58/);
  assert.match(bridge, /mailbox_bootstrap/);
  assert.match(bridge, /init_data/);
  assert.match(bridge, /form.method = 'post'/);
  assert.match(bridge, /noindex,nofollow,noarchive/);
  assert.doesNotMatch(bridge, /v57/);
});

test('owner menu updater separates v58 staging from unchanged production', () => {
  assert.ok(menu.includes('STAGING_URL = "' + stagingLauncher + '"'));
  assert.ok(menu.includes('PRODUCTION_URL = "' + productionLauncher + '"'));
  assert.doesNotMatch(menu, /versie-001-staging-acceptance-20260721-v57.html/);
});
