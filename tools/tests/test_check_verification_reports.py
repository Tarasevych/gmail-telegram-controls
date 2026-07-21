import importlib.util
import unittest
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "check_verification_reports.py"
SPEC = importlib.util.spec_from_file_location("check_verification_reports", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)


class CanonicalLfHashTests(unittest.TestCase):
    def test_lf_and_crlf_have_the_same_hash(self):
        lf = "path\tsha256\nfile.md\tabc\n"
        crlf = lf.replace("\n", "\r\n")

        self.assertEqual(
            MODULE.canonical_lf_sha256(lf),
            MODULE.canonical_lf_sha256(crlf),
        )

    def test_lone_cr_is_normalized(self):
        self.assertEqual(
            MODULE.canonical_lf_sha256("a\rb\r"),
            MODULE.canonical_lf_sha256("a\nb\n"),
        )

    def test_content_change_changes_hash(self):
        self.assertNotEqual(
            MODULE.canonical_lf_sha256("a\n"),
            MODULE.canonical_lf_sha256("b\n"),
        )


if __name__ == "__main__":
    unittest.main()
