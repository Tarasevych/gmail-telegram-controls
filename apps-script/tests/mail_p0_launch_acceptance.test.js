const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const source = fs.readFileSync(
  path.join(__dirname, "..", "MailApp.html"),
  "utf8"
);

function functionSource(name) {
  const marker = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`);
  const match = marker.exec(source);
  assert.ok(match, `missing function ${name}`);
  const start = match.index;
  const open = source.indexOf("{", match.index);
  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let index = open; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`unterminated function ${name}`);
}

function sourceBetween(startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(start, -1, `missing marker ${startMarker}`);
  assert.notEqual(end, -1, `missing marker ${endMarker}`);
  return source.slice(start, end);
}

test("warm and offline paths remain usable without weakening cache ordering", () => {
  const leaseRunner = functionSource("p0RunWithIndexedDbLaunchLeaseP0A_");
  const pipeline = functionSource("runBootPipeline");
  const releaseCheck = functionSource("p0CheckClientRelease");

  assert.match(leaseRunner, /if\s*\(!attempt\.supported\)\s*return work\(\)/);
  assert.ok(
    pipeline.indexOf("initializeFromBootstrap") <
      pipeline.indexOf("p0HydratePersistentState"),
    "server bootstrap must continue to establish the private-cache allowlist"
  );
  assert.match(
    pipeline,
    /loadThreads\(true,\s*\{\s*returnAfterCache:\s*true\s*\}\)/
  );
  assert.match(releaseCheck, /catch\s*\(error\)\s*\{\s*return false;\s*\}/);
  assert.doesNotMatch(releaseCheck, /showBootError|setBootLoading|state\.threads\s*=\s*\[\]/);
});

test("IndexedDB fallback elects one content-free lease owner atomically", () => {
  const acquire = functionSource("p0TryAcquireLaunchLeaseP0A_");
  const release = functionSource("p0ReleaseLaunchLeaseP0A_");

  assert.match(
    acquire,
    /transaction\(P0_LAUNCH_COORDINATION_STORE_P0A,\s*"readwrite"\)/
  );
  assert.match(
    acquire,
    /current\.ownerNonce !== ownerNonce && currentExpiresAt > now/
  );
  assert.match(acquire, /store\.put\(\{\s*key:[\s\S]*ownerNonce:[\s\S]*expiresAt:/);
  assert.match(release, /current\.ownerNonce !== ownerNonce/);
  assert.match(release, /store\.delete\(P0_LAUNCH_COORDINATION_KEY_P0A\)/);
});

test("launch coordination persists no mailbox or Telegram identity material", () => {
  const coordination = sourceBetween(
    "var P0_LAUNCH_LOCK_NAME_P0A",
    "var P0_RELEASE_ATTEMPT_STORAGE_KEY_P0A"
  );

  assert.doesNotMatch(
    coordination,
    /initData|sessionToken|refreshToken|launchNonce|userId|chatId|connectionId|accountId|email/i
  );
  assert.match(coordination, /ownerNonce/);
  assert.match(coordination, /createdAt/);
  assert.match(coordination, /expiresAt/);
});

test("duplicate boot remains hidden and is coordinated after document-local suppression", () => {
  const boot = functionSource("boot");
  const coordinator = functionSource("p0RunCoordinatedBootP0A_");
  const pipeline = functionSource("runBootPipeline");

  assert.match(boot, /launchBootPromise/);
  assert.match(boot, /launchBootSettled/);
  assert.match(boot, /duplicateBootCalls/);
  assert.match(
    boot,
    /p0RunCoordinatedBootP0A_\(function\s*\(\)\s*\{\s*return runBootPipeline\(\);\s*\}\)/
  );
  assert.match(coordinator, /window\.navigator && window\.navigator\.locks/);
  assert.match(coordinator, /p0RunWithIndexedDbLaunchLeaseP0A_/);
  assert.doesNotMatch(coordinator, /showBootError|setBootLoading/);
  assert.doesNotMatch(pipeline, /setBootLoading\(\)/);
  assert.match(pipeline, /bootState\.hidden = true/);
});

test("release reload is exact-target, single-flight, recovered, and quiescent", () => {
  const releaseCheck = functionSource("p0CheckClientRelease");
  const mutationCheck = functionSource("p0ReleaseMutationActiveP0A_");
  const recovery = functionSource("p0PersistReleaseRecoveryP0A_");

  const waitAt = releaseCheck.indexOf("await p0WaitForReleaseQuiescenceP0A_()");
  const recoverAt = releaseCheck.indexOf("await p0PersistReleaseRecoveryP0A_()");
  const recheckAt = releaseCheck.indexOf("p0ReleaseMutationActiveP0A_()", recoverAt);
  const decisionAt = releaseCheck.indexOf(
    'sessionStorage.setItem("p0-release-reload"'
  );
  const reloadAt = releaseCheck.indexOf("location.reload()");

  assert.ok(
    waitAt !== -1 &&
      recoverAt > waitAt &&
      recheckAt > recoverAt &&
      decisionAt > recheckAt &&
      reloadAt > decisionAt,
    "reload must follow quiescence, recovery persistence, recheck, and exact-target persistence"
  );
  assert.equal((releaseCheck.match(/location\.reload\(\)/g) || []).length, 1);
  assert.match(releaseCheck, /p0ReleaseReloadTargetP0A === targetVersion/);
  assert.match(releaseCheck, /p0ReleaseAction\(P0_CLIENT_RELEASE_VERSION,\s*targetVersion,\s*attemptedVersion\)/);
  assert.match(mutationCheck, /state\.composeBusy/);
  assert.match(mutationCheck, /state\.composeSavePromise/);
  assert.match(mutationCheck, /state\.composeOperationPromise/);
  assert.match(mutationCheck, /composeAttachmentJobsPending\(\)/);
  assert.match(mutationCheck, /p0ReleaseActiveTransferMutationP0A_\(\)/);
  assert.match(recovery, /await p0PersistComposeRecovery\(\)/);
});

test("offline update-check failure leaves the current cached UI untouched", () => {
  const releaseCheck = functionSource("p0CheckClientRelease");

  assert.match(releaseCheck, /cache:\s*"no-store"/);
  assert.match(releaseCheck, /controller\.abort\(\)/);
  assert.match(releaseCheck, /if\s*\(!response \|\| !response\.ok\)\s*return false/);
  assert.match(releaseCheck, /\.catch\(function\s*\(\)\s*\{\s*return false;\s*\}\)/);
  assert.doesNotMatch(
    releaseCheck,
    /showBootError|setBootLoading|renderListLoading|state\.threads\s*=\s*\[\]/
  );
});
