const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const uiSource = fs.readFileSync(path.join(__dirname, '..', 'MailApp.html'), 'utf8');

function sourceBetween(start, end) {
  const from = uiSource.indexOf(start);
  const to = uiSource.indexOf(end, from + start.length);
  assert.notEqual(from, -1, `missing source start: ${start}`);
  assert.notEqual(to, -1, `missing source end: ${end}`);
  return uiSource.slice(from, to);
}

test('header X arms one close intent and hides the editor while work settles', () => {
  const closeSource = sourceBetween(
    '      function settleComposeCloseRequest() {',
    '      function setComposeSourceIsolation(active) {'
  );
  assert.match(closeSource, /function closeComposeFromHeader\(\)[\s\S]*state\.composeCloseRequested = true/);
  assert.match(closeSource, /syncComposeTransferAssociations\(\)[\s\S]*p0PersistComposeRecovery\(\)[\s\S]*minimizeCompose\(\{ quiet: true, reason: "header-close" \}\)/);
  assert.match(closeSource, /settleComposeCloseRequest\(\)[\s\S]*Передавання триває/);
  assert.doesNotMatch(sourceBetween('      function closeComposeFromHeader() {', '      function requestCloseCompose() {'), /cancelAllComposeAttachmentJobs/);
});

test('close settlement waits for transfer and canonical Gmail draft acknowledgement', () => {
  const settleSource = sourceBetween(
    '      function settleComposeCloseRequest() {',
    '      function closeComposeFromHeader() {'
  );
  const finishSource = sourceBetween(
    '      function finishCloseCompose(options) {',
    '      function setComposeSourceIsolation(active) {'
  );
  assert.match(settleSource, /jobs\.length \|\| state\.composeBusy \|\| state\.composeSaveInFlight[\s\S]*return false/);
  assert.match(settleSource, /state\.compose\.dirty && hasDraftContent\(\)[\s\S]*saveDraft\(\{ quiet: true, background: true, reason: "close-intent" \}\)/);
  assert.match(settleSource, /return finishCloseCompose\(\)/);
  assert.match(finishSource, /composeAttachmentJobs\(\)\.length && !opts\.discardTransfers[\s\S]*return false/);
  assert.match(finishSource, /if \(opts\.discardTransfers\) cancelAllComposeAttachmentJobs\(\)/);
});

test('one stable transfer job remains bound to the same compose session and can reopen it', () => {
  const associationSource = sourceBetween(
    '      function composeTransferAssociation() {',
    '      function openComposeCloseDialog() {'
  );
  const attachmentSource = sourceBetween(
    '      function createComposeAttachmentJob(file, info, options) {',
    '      function addInlineImageFiles(files) {'
  );
  const managerSource = sourceBetween(
    '      function renderTransferManager() {',
    '      function pruneManagedTransfers() {'
  );
  assert.match(associationSource, /composeSessionId:[\s\S]*connectionId:[\s\S]*draftId:/);
  assert.match(associationSource, /transferOperationId: job\.id/);
  assert.match(attachmentSource, /composeAssociation: composeTransferAssociation\(\)/);
  assert.match(attachmentSource, /job\.promise &&[\s\S]*return job\.promise/);
  assert.match(managerSource, /Повернутися до чернетки цього передавання[\s\S]*restoreCompose/);
});

test('minimize preserves edit focus and selection while both chips remain movable and non-overlapping', () => {
  const minimizeSource = sourceBetween(
    '      function applyConfirmedComposeMinimize(options) {',
    '      function discardComposeChanges() {'
  );
  const managerSource = sourceBetween(
    '      function ensureTransferManagerUi() {',
    '      function pruneManagedTransfers() {'
  );
  assert.match(minimizeSource, /rememberComposeSelection\(\)[\s\S]*applyConfirmedComposeMinimize/);
  assert.doesNotMatch(minimizeSource, /state\.composeSelection = null/);
  assert.match(minimizeSource, /activateComposeRange\(state\.composeSelection\)/);
  assert.match(minimizeSource, /pointerdown[\s\S]*pointermove[\s\S]*pointerup[\s\S]*pointercancel/);
  assert.match(minimizeSource, /Math\.max\(8, Math\.min\(/);
  assert.match(minimizeSource, /composeRestoreChip\.hidden = false[\s\S]*updateComposeRestoreChipTransferOffset/);
  assert.match(minimizeSource, /composeRestoreChip\.hidden = true[\s\S]*updateComposeRestoreChipTransferOffset\(state\.transferUi, false\)/);
  assert.match(uiSource, /function updateComposeRestoreChipTransferOffset[\s\S]*--compose-transfer-offset[\s\S]*getBoundingClientRect\(\)\.height/);
  assert.match(managerSource, /ui\.host\.hidden = !tasks\.length[\s\S]*updateComposeRestoreChipTransferOffset\(ui, true\)/);
  assert.match(uiSource, /\.compose-restore-chip\.with-transfer-manager/);
});

test('restart recovery records unfinished local files without claiming closed-WebView continuation', () => {
  const recoverySource = sourceBetween(
    '      function p0ComposeRecoveryValue(compose) {',
    '      function p0PersistComposeRecovery() {'
  );
  assert.match(recoverySource, /localAttachmentJobs = typeof composeAttachmentJobs/);
  assert.match(recoverySource, /attachmentCount:[\s\S]*\+ localAttachmentJobs/);
  assert.match(recoverySource, /missingAttachmentCount:[\s\S]*localAttachmentJobs/);
  assert.match(uiSource, /Якщо закрити Mini App до завершення, незавершені файли потрібно вибрати знову/);
  assert.doesNotMatch(uiSource, /передавання гарантовано продовжиться після закриття Mini App/i);
});
