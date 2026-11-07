# VR-003 lessons learned

**Verification framework:** REQ-0004

1. Keep the product line named **Versie 1** until the owner explicitly authorizes the next Versie.
2. Give every factual assertion an atomic claim ID, scope, status, evidence grade, limitation, and immutable provenance.
3. Do not promote repeated transcript or postmortem text above E0 without primary evidence.
4. Compact and deduplicate card indexes before every hard-capacity decision.
5. Never delete an active Telegram card merely to manufacture free capacity.
6. Use short lane-specific claim/commit leases; do not hold a shared lock during Gmail or Telegram I/O.
7. Apply Gmail eligibility and dedupe at one shared boundary used by realtime, retry, and frozen lanes.
8. Persist terminal duplicate decisions so overlapping windows cannot re-deliver the same Gmail event.
9. Test every corrected read path, not only the helper that performs compaction or filtering.
10. Pin every release bundle by exact hash and run tests plus `PreflightOnly` before any release mutation.
11. Correct stale pins through a new immutable history commit, never by force/reset or bypassing the guard.
12. Keep local E3 tests, staging E4 checks, and production E5 acceptance distinct; passing one does not prove the next.

These rules derive from `VR3-007` through `VR3-017` and recommendations `VR3-028` through `VR3-032` in [claims.json](../../../../verification-reports/VR-003/claims.json).
