#!/usr/bin/env python3
"""Atomically switch the exact owner bot menu between Versie 1 staging and production."""

from __future__ import annotations

import argparse
import json
import urllib.error
import urllib.request
from urllib.parse import urlsplit

import keyring


BOT_TOKEN_SERVICE = "GmailTelegramNotifier"
BOT_TOKEN_USERNAME = "bot_token"
BOT_ID = 8990322470
BOT_USERNAME = "TarasevychGmailNotifierBot"
OWNER_ID = 427886279
PRODUCTION_URL = "https://tarasevych.github.io/gmail-telegram-controls/?v=20260715-5&action=mailbox"
STAGING_URL = "https://tarasevych.github.io/gmail-telegram-controls/versie-001-staging-acceptance-20260723-v66.html"


class MenuError(RuntimeError):
    pass


def bot_api(token: str, method: str, payload: dict | None = None) -> object:
    request = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/{method}",
        data=json.dumps(payload or {}).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            envelope = json.load(response)
    except urllib.error.HTTPError as error:
        try:
            envelope = json.load(error)
            detail = str(envelope.get("description") or "HTTP error")
        except Exception:
            detail = f"HTTP {error.code}"
        raise MenuError(f"Telegram {method} failed: {detail}") from None
    except OSError as error:
        raise MenuError(f"Telegram {method} transport failure: {type(error).__name__}") from None
    if not envelope.get("ok"):
        raise MenuError(f"Telegram {method} failed: {envelope.get('description', 'unknown error')}")
    return envelope.get("result")


def summary(menu: dict) -> dict:
    parsed = urlsplit(str((menu.get("web_app") or {}).get("url") or ""))
    return {
        "type": menu.get("type"),
        "text": menu.get("text"),
        "host": parsed.hostname,
        "path": parsed.path,
        "has_query": bool(parsed.query),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=("inspect", "staging", "production"))
    args = parser.parse_args()

    token = keyring.get_password(BOT_TOKEN_SERVICE, BOT_TOKEN_USERNAME)
    if not token or ":" not in token:
        raise MenuError("Bot token is absent or malformed in Windows Credential Manager")
    me = bot_api(token, "getMe")
    if int(me.get("id", 0)) != BOT_ID or me.get("username") != BOT_USERNAME:
        raise MenuError("The credential belongs to a different Telegram bot")
    chat = bot_api(token, "getChat", {"chat_id": str(OWNER_ID)})
    if int(chat.get("id", 0)) != OWNER_ID or chat.get("type") != "private":
        raise MenuError("The configured owner chat does not match the private chat")

    current = bot_api(token, "getChatMenuButton", {"chat_id": str(OWNER_ID)})
    result = {"ok": True, "mode": args.mode, "bot": f"@{BOT_USERNAME}", "owner_id": OWNER_ID, "previous": summary(current)}
    if args.mode == "inspect":
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0

    target_url = STAGING_URL if args.mode == "staging" else PRODUCTION_URL
    target = {
        "type": "web_app",
        "text": "🧪 Пошта · Versie 1" if args.mode == "staging" else "📬 Пошта · Versie 1",
        "web_app": {"url": target_url},
    }
    attempted = False
    try:
        attempted = True
        bot_api(token, "setChatMenuButton", {"chat_id": str(OWNER_ID), "menu_button": target})
        verified = bot_api(token, "getChatMenuButton", {"chat_id": str(OWNER_ID)})
        if verified != target:
            raise MenuError("Telegram returned a menu button different from the requested one")
        result["current"] = summary(verified)
        result["current_url"] = target_url
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0
    except Exception:
        if attempted:
            try:
                bot_api(token, "setChatMenuButton", {"chat_id": str(OWNER_ID), "menu_button": current})
            except Exception as rollback_error:
                raise MenuError(f"Menu update failed and rollback also failed: {type(rollback_error).__name__}") from None
        raise


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except MenuError as error:
        print(str(error), file=__import__("sys").stderr)
        raise SystemExit(1)

