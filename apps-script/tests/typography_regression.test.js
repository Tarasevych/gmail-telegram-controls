const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const source = fs.readFileSync(path.join(__dirname, "..", "MailApp.html"), "utf8");

function f03StyleBlock() {
  const match = source.match(/<style id="typography-regression-f03">([\s\S]*?)<\/style>/);
  assert.ok(match, "F-03 typography override must exist");
  return match[1];
}

test("F-03 keeps local-first Gmail-compatible font stacks", () => {
  assert.match(
    source,
    /--mail-font-ui:\s*"Google Sans",\s*Roboto,\s*RobotoDraft,\s*Helvetica,\s*Arial,\s*sans-serif/
  );
  assert.match(
    source,
    /--mail-font-text:\s*Roboto,\s*"Helvetica Neue",\s*Arial,\s*sans-serif/
  );
  assert.doesNotMatch(source, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
});

test("F-03 raises compose account and save status to a readable metadata scale", () => {
  const css = f03StyleBlock();
  assert.match(css, /\.compose-account,\s*\.compose-save-status\s*\{[\s\S]*?font-size:\s*12px;[\s\S]*?line-height:\s*16px;/);
  assert.match(css, /\.compose-account\s*\{[\s\S]*?overflow-wrap:\s*anywhere;/);
});

test("F-03 raises settings metadata without blanket bold", () => {
  const css = f03StyleBlock();
  assert.match(
    css,
    /\.account-panel-note,\s*\.gmail-metadata-muted,\s*\.gmail-label-path-help\s*\{[\s\S]*?font-size:\s*12px;[\s\S]*?line-height:\s*18px;/
  );
  assert.doesNotMatch(css, /(?:body\s+\*|\*)\s*\{[\s\S]*?font-weight:\s*(?:bold|[7-9]00)/);
});

test("F-03 allows account names and addresses to wrap instead of clipping", () => {
  const css = f03StyleBlock();
  assert.match(
    css,
    /\.account-card-copy strong,\s*\.account-card-copy span\s*\{[\s\S]*?overflow-wrap:\s*anywhere;[\s\S]*?text-overflow:\s*clip;[\s\S]*?white-space:\s*normal;/
  );
});

test("F-03 keeps controls and metadata distinct from body text", () => {
  const css = f03StyleBlock();
  assert.match(
    css,
    /\.account-card-copy span,\s*\.account-status,\s*\.account-choice\s*\{[\s\S]*?font-size:\s*12px;[\s\S]*?line-height:\s*16px;/
  );
  assert.match(source, /\.compose-editor[\s\S]*?font-size:\s*14px;[\s\S]*?line-height:\s*1\.5;/);
});
