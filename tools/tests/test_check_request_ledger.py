from __future__ import annotations

import importlib.util
import unittest
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "check_request_ledger.py"
SPEC = importlib.util.spec_from_file_location("check_request_ledger", MODULE_PATH)
assert SPEC and SPEC.loader
checker = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(checker)


VALID = """\
- Status: recorded
- Next Versie authorization: no
- Routes: requests=record; instructions=update; permissions=reference; plan=no-change; product=update; release=no-change
- Permission basis: explicit
<!-- lang:uk -->
<!-- lang:en -->
"""


class RequestLedgerContractTests(unittest.TestCase):
    def test_valid_record(self) -> None:
        self.assertEqual(checker.record_contract_errors(VALID), [])

    def test_route_order_is_not_semantic(self) -> None:
        reordered = VALID.replace(
            "requests=record; instructions=update; permissions=reference; plan=no-change; product=update; release=no-change",
            "release=no-change; product=update; requests=record; plan=no-change; permissions=reference; instructions=update",
        )
        self.assertEqual(checker.record_contract_errors(reordered), [])

    def test_unknown_route_key(self) -> None:
        errors = checker.record_contract_errors(VALID.replace("release=no-change", "release=no-change; problems=update"))
        self.assertIn("unknown route key: problems", errors)

    def test_missing_route_key(self) -> None:
        errors = checker.record_contract_errors(VALID.replace("; release=no-change", ""))
        self.assertIn("missing route key: release", errors)

    def test_invalid_route_value(self) -> None:
        errors = checker.record_contract_errors(VALID.replace("product=update", "product=conditional"))
        self.assertTrue(any(error.startswith("invalid route value: product=conditional") for error in errors))

    def test_duplicate_route_key(self) -> None:
        errors = checker.record_contract_errors(VALID.replace("release=no-change", "release=no-change; plan=update"))
        self.assertIn("duplicate route key: plan", errors)

    def test_arbitrary_permission_basis(self) -> None:
        errors = checker.record_contract_errors(VALID.replace("Permission basis: explicit", "Permission basis: owner said okay"))
        self.assertIn("missing or invalid permission basis", errors)

    def test_permission_update_requires_explicit_basis(self) -> None:
        content = VALID.replace("permissions=reference", "permissions=update").replace(
            "Permission basis: explicit", "Permission basis: none"
        )
        self.assertIn("permission update lacks explicit owner basis", checker.record_contract_errors(content))

    def test_missing_language_marker(self) -> None:
        errors = checker.record_contract_errors(VALID.replace("<!-- lang:en -->", ""))
        self.assertIn("missing bilingual markers", errors)

    def test_legacy_status_format(self) -> None:
        errors = checker.record_contract_errors(VALID.replace("- Status: recorded", "Status: recorded"))
        self.assertIn("missing or invalid status", errors)


if __name__ == "__main__":
    unittest.main()
