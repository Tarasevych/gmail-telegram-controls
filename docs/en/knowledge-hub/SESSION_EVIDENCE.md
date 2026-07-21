# Session evidence register

**Knowledge-hub source request:** REQ-0003  
**Evidence request:** REQ-0012

REQ-0012 processed two private session exports as evidence sources for VR-003.

## Reproducible boundary

- 2 UTF-8 sources, 167,176 logical lines.
- 231 deterministic private chunks with five-line overlap and zero coverage gaps.
- One overlong source line was split into two contiguous character ranges.
- Candidate extraction produced 6,483 sanitized hits; raw text remained private.
- Public output contains only aggregate metadata, hashes, sanitized atomic claims, and immutable evidence links.

## Interpretation rule

A transcript occurrence is provenance, not proof. Repetition does not raise an assertion above E0. Repository state is E2, local tests and preflight are E3, staging is E4, and production acceptance is E5.

## Public artifacts

- [VR-003 report](../verification-reports/reports/VR-003/README.md)
- [Atomic claims](../../verification-reports/VR-003/claims.json)
- [Source manifest](../../verification-reports/VR-003/source-manifest.json)
- [Report manifest](../../verification-reports/VR-003/manifest.json)

Raw transcripts, normalized corpus chunks, candidate excerpts, email addresses, tokens, OAuth material, private URLs, local paths, and mailbox content are excluded from Git.
