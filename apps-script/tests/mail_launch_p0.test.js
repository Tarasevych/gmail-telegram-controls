const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..', '..');
const bridge = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const mailApp = fs.readFileSync(path.join(root, 'apps-script', 'MailApp.html'), 'utf8');

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

test('mailbox bridge performs one hidden single-flight handoff', () => {
  assert.match(bridge, /data-mailbox-handoff/);
  assert.match(bridge, /__gtMailboxHandoff/);
  assert.match(bridge, /if \(started\) return/);
  assert.doesNotMatch(bridge, /Захищено підключаю Gmail до вашого Telegram/);
});

test('ordinary validated launch does not recreate the connection overlay', () => {
  assert.match(mailApp, /id="bootState"[^>]*hidden/);
  assert.equal((mailApp.match(/Відкриваю пошту/g) || []).length, 1);
  const pipeline = functionSource(mailApp, 'runBootPipeline');
  assert.doesNotMatch(pipeline, /setBootLoading\(\)/);
  assert.match(pipeline, /bootState\.hidden = true/);
});

test('launch is single-flight and warms storage without reading private records', () => {
  const boot = functionSource(mailApp, 'boot');
  const pipeline = functionSource(mailApp, 'runBootPipeline');
  assert.match(boot, /launchBootPromise/);
  assert.match(boot, /launchBootSettled/);
  assert.match(boot, /duplicateBootCalls/);
  assert.match(pipeline, /p0OpenDb/);
  assert.doesNotMatch(pipeline, /p0OpenDatabase/);
  const warmup = pipeline.slice(pipeline.indexOf('if (!launchTrace.storageWarmup'), pipeline.indexOf('renderMailContext'));
  assert.doesNotMatch(warmup, /p0ReadRecord|p0HydratePersistentState/);
  assert.ok(pipeline.indexOf('initializeFromBootstrap') < pipeline.indexOf('p0HydratePersistentState'),
    'private cache hydration must remain behind the server-established account allowlist');
});

test('RPC layer retains single-flight request deduplication', () => {
  const rpc = functionSource(mailApp, 'rpc');
  assert.match(rpc, /inflight/);
  assert.match(rpc, /dedupe/);
});

test('new code delta uses the next immutable client marker', () => {
  assert.match(mailApp, /P0_CLIENT_RELEASE_VERSION = 68/);
  assert.match(mailApp, /P0_PREVIOUS_IMMUTABLE_VERSION = 67/);
  assert.match(mailApp, /Versie-1-v68-p0/);
});
