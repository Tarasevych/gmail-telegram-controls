# Unified factual-verification schema

[Home](README.md) | [Evidence policy](EVIDENCE_POLICY.md) | [Українська](../../uk/verification-reports/REPORT_SCHEMA.md)

Source request: `REQ-0004`. [Machine schema](../../verification-reports/schema.json).

## Atomic record

- `claim_id`: stable canonical ID.
- `source_ids`: exact source-report IDs.
- `category`, `claim_type`, `relevance`: classification and relevance.
- `statement_uk`, `statement_en`: equivalent language statements.
- `verification_status`, `verification_scope`, `evidence_grade`: result without scope mixing.
- `implementation_status`: what specifically exists or does not exist.
- `dependencies`, `conflicts`, `sensitivity`: explicit links, contradictions, and handling.
- `provenance`: REQ, canonical page, source IDs, and source spans.
- `evidence`: method, result, full commit, path, and GitHub URL.
- `limitations`: what the report does not prove.
- `report_id`, `analysis_stream`, `verified_at`: report, independent stream, and date.

## Statuses

| Status | Count | Meaning |
|---|---:|---|
| `verified` | 17 | Supported by primary evidence within the declared scope |
| `contradicted` | 13 | Primary evidence directly conflicts with the claim |
| `partial` | 82 | Only part of the claim or a lower scope is supported |
| `unverified` | 35 | No sufficient primary evidence was found |
| `blocked` | 7 | Required evidence is unavailable within the safe scope |
| `recommendation` | 91 | Normative proposal, not an implementation fact |
