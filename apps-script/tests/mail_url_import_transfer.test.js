const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(
  path.join(__dirname, "..", "MailApp.html"),
  "utf8"
);

function sourceBetween(start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from + start.length);
  assert.notEqual(from, -1, `missing start marker: ${start}`);
  assert.notEqual(to, -1, `missing end marker: ${end}`);
  return source.slice(from, to);
}

const helperSource = sourceBetween(
  "      function runManagedPublicHttpsImport(sourceValue, options) {",
  "      function sourcePreviewData(response, metadata) {"
);
const classificationSource = sourceBetween(
  "      function classifyPublicSourceInput(value) {",
  "      function insertPublicSourceLink() {"
);

function harness(options = {}) {
  const phases = [];
  const requests = [];
  const attachments = [];
  const compose = {
    connectionId: "gmail-unit-personal",
    attachments: []
  };
  const state = {
    compose,
    composeSessionId: "compose_session_1234567890"
  };
  const p0Runtime = {};
  const els = { composePublicSourceStatus: { textContent: "" } };
  const context = vm.createContext({
    state,
    p0Runtime,
    els,
    normalizeAttachmentSource(value) {
      if (!value || value.provider !== "publicHttps" || !String(value.url || "").startsWith("https://")) return null;
      return { provider: "publicHttps", url: String(value.url) };
    },
    normalizeSourceMetadata(value, fallback) {
      if (!value) return null;
      return {
        source: value.source || fallback,
        name: value.name || "file.pdf",
        mimeType: value.mimeType || "application/pdf",
        size: Number(value.size || 1)
      };
    },
    safeClientOperationId: value => String(value || ""),
    safeId: value => String(value || ""),
    safeText: (value, fallback = "") => value == null || value === "" ? String(fallback || "") : String(value),
    createManagedTransfer: transferOptions => Object.assign({
      id: "generic_transfer_1234567890",
      transferState: "queued"
    }, transferOptions),
    enqueueManagedTransfer: (task, runner) => Promise.resolve().then(() => runner(task, {
      setPhase: phase => phases.push(phase)
    })),
    rpc: options.rpc || (async request => {
      requests.push(JSON.parse(JSON.stringify(request)));
      return {
        source: request.source,
        name: "file.pdf",
        mimeType: "application/pdf",
        size: 12
      };
    }),
    addComposeSourceAttachment(metadata) {
      attachments.push(metadata);
      return metadata;
    },
    renderTransferManager() {},
    scheduleTransferPrune() {},
    Date,
    Map,
    Promise,
    Error
  });
  vm.runInContext(helperSource, context);
  return { context, state, p0Runtime, els, phases, requests, attachments };
}

test("public HTTPS import uses honest generic shared transfer state", async () => {
  const run = harness();
  const sourceValue = { provider: "publicHttps", url: "https://example.com/file.pdf" };
  const transfer = run.context.runManagedPublicHttpsImport(sourceValue, {});
  const metadata = await transfer.promise;

  assert.equal(transfer.task.kind, "url-import");
  assert.equal(transfer.task.label, "Перевіряю HTTPS-файл");
  assert.equal(transfer.task.label.includes(sourceValue.url), false);
  assert.equal(transfer.task.id.includes("example.com"), false);
  assert.equal(transfer.task.byteProgress, false);
  assert.equal(transfer.task.canCancel, false);
  assert.equal(transfer.task.canRetry, true);
  assert.deepEqual(run.phases, ["transferring", "processing"]);
  assert.deepEqual(run.requests, [{ op: "sourceMetadata", source: sourceValue }]);
  assert.equal(run.attachments.length, 1);
  assert.equal(metadata.name, "file.pdf");
});

test("parallel submit shares one RPC and adds one attachment", async () => {
  let resolveRpc;
  let calls = 0;
  const run = harness({
    rpc: request => {
      calls += 1;
      return new Promise(resolve => {
        resolveRpc = () => resolve({
          source: request.source,
          name: "shared.pdf",
          mimeType: "application/pdf",
          size: 7
        });
      });
    }
  });
  const sourceValue = { provider: "publicHttps", url: "https://example.com/shared.pdf" };
  const first = run.context.runManagedPublicHttpsImport(sourceValue, {});
  const second = run.context.runManagedPublicHttpsImport(sourceValue, {});

  assert.equal(first, second);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(calls, 1);
  resolveRpc();
  await first.promise;
  assert.equal(run.attachments.length, 1);
});

test("retry keeps the task and fails closed after compose context changes", async () => {
  const run = harness();
  const sourceValue = { provider: "publicHttps", url: "https://example.com/retry.pdf" };
  const transfer = run.context.runManagedPublicHttpsImport(sourceValue, {});
  await transfer.promise;

  const retryResult = await transfer.task.retry();
  assert.equal(retryResult.name, "file.pdf");
  assert.equal(run.attachments.length, 2);

  run.state.compose = { connectionId: "gmail-unit-other" };
  assert.equal(await transfer.task.retry(), false);
  assert.equal(transfer.task.transferState, "cancelled");
  assert.equal(transfer.task.canRetry, false);
});

test("form submit delegates to the managed import and hides raw URL from labels", () => {
  assert.match(source, /var classification = classifyPublicSourceInput\(els\.composePublicSourceUrl\.value\)/);
  assert.match(source, /await runManagedPublicHttpsImport\(source\)\.promise/);
  assert.doesNotMatch(helperSource, /label:\s*[^,\n]*source\.url/);
  assert.doesNotMatch(helperSource, /id:\s*[^,\n]*source\.url/);
  assert.doesNotMatch(helperSource, /setInterval|percent|canCancel:\s*true/);
});

test("URL classification keeps direct files and explicit wrappers while routing ambiguous Google pages to link mode", () => {
  const context = vm.createContext({
    safeComposeLink(value) {
      try {
        const parsed = new URL(String(value || ""));
        return parsed.protocol === "https:" && !parsed.username && !parsed.password ? parsed.toString() : "";
      } catch (error) {
        return "";
      }
    },
    safeText: value => String(value == null ? "" : value),
    URL
  });
  vm.runInContext(classificationSource, context);

  assert.equal(context.classifyPublicSourceInput("https://cdn.example.com/file.jpg").kind, "https_candidate");
  assert.equal(
    context.classifyPublicSourceInput("https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.example.com%2Ffile.jpg").kind,
    "explicit_wrapper"
  );
  assert.equal(
    context.classifyPublicSourceInput("https://www.google.com/search?tbm=isch&q=books").kind,
    "google_search"
  );
  assert.equal(
    context.classifyPublicSourceInput("https://www.google.com/imgres?imgrefurl=https%3A%2F%2Fexample.com").kind,
    "ambiguous_wrapper"
  );
});
