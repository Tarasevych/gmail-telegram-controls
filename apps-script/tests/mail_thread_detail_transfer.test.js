const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const source = fs.readFileSync(
  path.join(__dirname, "..", "MailApp.html"),
  "utf8"
);

function threadTransferHelper() {
  return source.match(
    /function runManagedThreadDetailFetch\([\s\S]*?\n      }\n\n      async function p0RefreshThread/
  );
}

test("thread detail fetch uses the bounded shared transfer manager", () => {
  const helper = threadTransferHelper();
  assert.ok(helper, "thread detail transfer helper must remain present");
  assert.match(helper[0], /kind:\s*"thread-detail"/);
  assert.match(helper[0], /enqueueManagedTransfer\(task,/);
  assert.match(helper[0], /controls\.setPhase\("transferring"\)/);
  assert.match(helper[0], /controls\.setPhase\("processing"\)/);
});

test("thread detail Apps Script RPC reports honest indeterminate progress", () => {
  const helper = threadTransferHelper();
  assert.ok(helper, "thread detail transfer helper must remain present");
  assert.match(helper[0], /byteProgress:\s*false/);
  assert.match(helper[0], /canCancel:\s*false/);
  assert.doesNotMatch(helper[0], /setProgress|percent|setInterval/);
});

test("parallel thread detail requests use one in-flight transfer", () => {
  const helper = threadTransferHelper();
  assert.ok(helper, "thread detail transfer helper must remain present");
  assert.match(helper[0], /p0Runtime\.threadDetailTransfers/);
  assert.match(helper[0], /if\s*\(inFlight\s*&&\s*inFlight\.promise\)\s*return inFlight/);
  assert.match(helper[0], /threadDetailTransfers\.delete\(key\)/);
});

test("retry keeps the task identity and fails closed after navigation", () => {
  const helper = threadTransferHelper();
  assert.ok(helper, "thread detail transfer helper must remain present");
  assert.match(helper[0], /task\.retry\s*=\s*function/);
  assert.match(helper[0], /generation\s*!==\s*p0Runtime\.readerGeneration/);
  assert.match(helper[0], /state\.selectedThreadId\s*!==\s*id/);
  assert.match(helper[0], /state\.selectedConnectionId\s*!==\s*connectionId/);
  assert.match(helper[0], /transferTask:\s*task/);
});

test("cached reader path remains cache-first and stale responses stay guarded", () => {
  assert.match(source, /if\s*\(cached\)[\s\S]*?renderThread\(\)/);
  assert.match(source, /var refresh = p0RefreshThread\(/);
  assert.match(source, /generation\s*!==\s*p0Runtime\.readerGeneration/);
});
