'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const APP_FILES = Object.freeze({
  Code: 'Code.gs',
  MultiAccount: 'MultiAccount.gs',
  MailClient: 'MailClient.gs',
  MailApp: 'MailApp.html',
  appsscript: 'appsscript.json',
});

function normalizedHash(filePath) {
  const value = fs.readFileSync(filePath, 'utf8').replace(/\r\n?/g, '\n');
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function parseInteger(source, variableName) {
  const match = source.match(new RegExp(`\\$${variableName}\\s*=\\s*(\\d+)`));
  if (!match) return null;
  return Number(match[1]);
}

function parseHashTable(source, variableName) {
  const match = source.match(new RegExp(`\\$${variableName}\\s*=\\s*@\\{([\\s\\S]*?)\\r?\\n\\}`));
  if (!match) {
    throw new Error(`missing PowerShell hash table $${variableName}`);
  }
  const parsed = Object.fromEntries(
    [...match[1].matchAll(/^\s*(Code|MultiAccount|MailClient|MailApp|appsscript)\s*=\s*'([a-f0-9]{64})'\s*$/gm)]
      .map((row) => [row[1], row[2]]),
  );
  return parsed;
}

function occurrences(source, needle) {
  return source.split(needle).length - 1;
}

function localSourceHashes(rootDir) {
  return Object.fromEntries(
    Object.entries(APP_FILES).map(([name, file]) => [name, normalizedHash(path.join(rootDir, file))]),
  );
}

module.exports = {
  APP_FILES,
  occurrences,
  parseHashTable,
  parseInteger,
  localSourceHashes,
};
