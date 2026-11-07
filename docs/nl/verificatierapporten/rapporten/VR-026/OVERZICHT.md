# VR-026 — Telegram Mini App viewport events

- **Status:** PARTIAL
- **Date:** 2026-07-23
- **Source request:** `REQ-0035`
- **Verification framework:** `REQ-0004`
- **Product task:** `B1-35`
- **Problem:** `GT-055`
- **Українське дзеркало:** [Український звіт](../../../../uk/verification-reports/reports/VR-026/README.md)

## Atomic claim

The current client called `Telegram.WebApp.expand()` but did not subscribe to `viewportChanged`, `safeAreaChanged`, or `contentSafeAreaChanged`, and sized the app shell only with CSS viewport units. The layout therefore had no explicit response to Telegram WebView height, keyboard, or safe-area changes.

## Implementation

One idempotent viewport bridge was added. It:

- subscribes to Telegram viewport and safe-area events exactly once;
- coalesces repeated events into one animation frame;
- updates live viewport height while movement is in progress;
- changes stable layout height only after a stable event;
- uses the official Telegram CSS variables as its initial fallback;
- does not invoke `boot`, render, RPC, reload, OAuth, or Gmail mutation.

## Evidence

A contract test executes the bridge in a VM and checks unstable/stable transitions, one set of event subscriptions, and the absence of relaunch/RPC/reload in this contour. The complete Apps Script suite and documentation gates are mandatory before the commit is published.

## Verification boundary

The source implementation and automated contract can be verified locally. Native Telegram Desktop/mobile acceptance for keyboard, resize, safe-area, and varying viewport heights remains `UNVERIFIED`; the overall status is therefore `PARTIAL`. Production v65, staging, menu, OAuth, and Gmail remain unchanged by this increment.

## Primary source

[Telegram Mini Apps documentation](https://core.telegram.org/bots/webapps) defines `viewportHeight`, `viewportStableHeight`, the related CSS variables, and `viewportChanged`.
