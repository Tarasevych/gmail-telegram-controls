# Private research archive

## Purpose

The separate private repository [Tarasevych/gmail-telegram-onderzoeksarchief](https://github.com/Tarasevych/gmail-telegram-onderzoeksarchief) is the evidence archive for related Codex task history. It retains exact user-visible messages, operational events, attachments, private sources, and sanitized factual findings.

## Source-of-truth boundaries

- Product code and current behavior are defined by the active sequential `Versie` in this repository.
- The private archive is the source for history, provenance, failures, decisions, and avoiding repeated failed work; it is not production configuration.
- Secrets, OAuth material, cookies, passwords, and keys are never published as plaintext. Exact confidential payload is retained only with client-side encryption.
- Hidden reasoning, system prompts, and developer prompts are not exported. The archive retains exact visible events and a verifiable action/evidence trace.

## Required use order

1. Before repeating historical analysis, consult the bilingual index, chronology, decisions, failures, unresolved items, and factual verification in the private archive.
2. Open exact ciphertext locally only when sanitized findings are insufficient and owner access is confirmed.
3. Never move restored plaintext into this public repository, issues, pull requests, logs, or chat responses.
4. Add new events as append-only segments with byte offsets, hashes, and a manifest; never rewrite prior segments.
