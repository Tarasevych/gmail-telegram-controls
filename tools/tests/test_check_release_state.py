import importlib.util
import json
import tempfile
import unittest
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "check_release_state.py"
SPEC = importlib.util.spec_from_file_location("check_release_state", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)


class ReleaseStateTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.state = {
            "schemaVersion": 1,
            "asOf": "2026-07-22",
            "versie": "Versie 1",
            "production": {"appsScriptImmutable": 57, "status": "VERIFIED"},
            "candidate": {
                "appsScriptImmutable": 58,
                "status": "BLOCKED",
                "activeStagingDeployments": 1,
            },
            "releaseArticle": {
                "uk": "docs/uk/releases/release.md",
                "en": "docs/en/releases/release.md",
            },
            "productionEvidence": {
                "uk": "docs/uk/reports/evidence.md",
                "en": "docs/en/reports/evidence.md",
            },
        }
        (self.root / "docs" / "uk" / "releases").mkdir(parents=True)
        (self.root / "docs" / "en" / "releases").mkdir(parents=True)
        (self.root / "docs" / "uk" / "reports").mkdir(parents=True)
        (self.root / "docs" / "en" / "reports").mkdir(parents=True)
        (self.root / "docs" / "release-state.json").write_text(
            json.dumps(self.state), encoding="utf-8"
        )
        for path in (
            "docs/uk/releases/release.md",
            "docs/en/releases/release.md",
            "docs/uk/reports/evidence.md",
            "docs/en/reports/evidence.md",
        ):
            (self.root / path).write_text("evidence\n", encoding="utf-8")
        marker = MODULE.release_state_marker(self.state)
        (self.root / "README.md").write_text(
            marker
            + "\nПоточний production працює на v57.\n"
            + "Current production runs v57.\n"
            + "docs/uk/CURRENT_STATE.md docs/en/CURRENT_STATE.md\n",
            encoding="utf-8",
        )
        (self.root / "docs" / "uk" / "CURRENT_STATE.md").write_text(
            marker
            + "\nreleases/release.md reports/evidence.md ../en/CURRENT_STATE.md\n",
            encoding="utf-8",
        )
        (self.root / "docs" / "en" / "CURRENT_STATE.md").write_text(
            marker
            + "\nreleases/release.md reports/evidence.md ../uk/CURRENT_STATE.md\n",
            encoding="utf-8",
        )

    def tearDown(self):
        self.temp.cleanup()

    def test_matching_surfaces_pass(self):
        self.assertEqual([], MODULE.check_release_state(self.root))

    def test_stale_current_production_claim_fails(self):
        readme = self.root / "README.md"
        readme.write_text(
            readme.read_text(encoding="utf-8").replace(
                "Поточний production працює на v57",
                "Поточний production працює на v37",
            ),
            encoding="utf-8",
        )
        errors = MODULE.check_release_state(self.root)
        self.assertTrue(any("v37 != v57" in error for error in errors))

    def test_mismatched_marker_fails(self):
        page = self.root / "docs" / "en" / "CURRENT_STATE.md"
        page.write_text(
            page.read_text(encoding="utf-8").replace("candidate=v58", "candidate=v59"),
            encoding="utf-8",
        )
        errors = MODULE.check_release_state(self.root)
        self.assertTrue(any("exact canonical release-state marker" in error for error in errors))


if __name__ == "__main__":
    unittest.main()
