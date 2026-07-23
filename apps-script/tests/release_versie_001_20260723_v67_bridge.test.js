const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const repo = path.resolve(__dirname, '..', '..');
const bridge = fs.readFileSync(path.join(repo, 'versie-001-staging-acceptance-20260723-v67.html'), 'utf8');
const menu = fs.readFileSync(path.join(repo, 'tools', 'update_bot_menu_versie_001.py'), 'utf8');
const stagingBackend = 'https://script.google.com/macros/s/AKfycbzs-WWCXDdBigh2yYoJOjzuipJN99eFlVcoeAv3cSttdGNtQbmqfRaH4aVfkWVLUnmg/exec';
const productionLauncher = 'https://tarasevych.github.io/gmail-telegram-controls/?v=20260715-5&action=mailbox';

test('v67 staging bridge targets only the exact immutable staging deployment', () => {
  assert.ok(bridge.includes(stagingBackend));
  assert.match(bridge, /Gmail Versie 1 staging v67/);
  assert.match(bridge, /mailbox_bootstrap/);
  assert.match(bridge, /init_data/);
  assert.match(bridge, /form.method = 'post'/);
  assert.match(bridge, /data-mailbox-handoff/);
  assert.match(bridge, /__gtMailboxHandoff\.submitted/);
  assert.match(bridge, /if \(window\.__gtMailboxHandoff\.submitted\) return/);
  assert.match(bridge, /noindex,nofollow,noarchive/);
  assert.doesNotMatch(bridge, /v65/);
});

test('v67 bridge remains historical while the owner menu may advance to a later staging candidate', () => {
  const currentStaging = menu.match(/STAGING_URL = "https:\/\/tarasevych\.github\.io\/gmail-telegram-controls\/versie-001-staging-acceptance-20260723-v(\d+)\.html"/);
  assert.ok(currentStaging, 'owner menu must keep an exact versioned staging launcher');
  assert.ok(Number(currentStaging[1]) >= 67, 'current staging launcher must not predate v67');
  assert.ok(menu.includes('PRODUCTION_URL = "' + productionLauncher + '"'));
  assert.doesNotMatch(menu, /versie-001-staging-acceptance-20260723-v65.html/);
});
