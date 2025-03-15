<p align="center">
  <img src="../static/logos/ui/logo.sans-ui.svg" alt="Sans UI Logo" width="180" height="60" style="margin-right: 20px;" />
  <img src="../static/logos/api/logo.sans-api.svg" alt="Sans API Logo" width="180" height="60" style="margin-right: 20px;" />
  <img src="../static/logos/db/logo.sans-db.svg" alt="Sans DB Logo" width="180" height="60" />
</p>

# WKWebView Integration for iOS

This directory contains the native iOS code needed to implement Apple's WKWebView in your iOS application. The implementation provides a bridge between your Svelte application and the native WKWebView component.

## Overview

The integration consists of three main components:

1. **WKWebViewBridge.js** - JavaScript bridge that communicates with native iOS code
2. **WKWebViewHandler.swift** - Swift handler that manages the native WKWebView and processes messages from JavaScript
3. **WebViewViewController.swift** - Example view controller that demonstrates how to use the WKWebView handler

## Integration Steps

### 1. Add Swift Files to Your iOS Project

Add the following files to your iOS project:
- `WKWebViewHandler.swift`
- `WebViewViewController.swift` (or create your own view controller)

### 2. Initialize the WKWebView in Your iOS App

```swift
// In your view controller
let webViewController = WebViewViewController()
webViewController.initialUrl = URL(string: "https://your-app-url.com")!
present(webViewController, animated: true)
```

### 3. Ensure JavaScript Bridge Is Loaded

The JavaScript bridge is automatically loaded by the WebViewAdapter when running in an iOS environment. The adapter detects if it's running in a native WKWebView and uses the appropriate implementation.

## How It Works

1. The `WebViewAdapter` in your Svelte app detects if it's running in a native iOS WKWebView environment
2. If running in a native environment, it uses the `WKWebViewBridge` to communicate with the native code
3. The `WKWebViewHandler` in your iOS app processes messages from JavaScript and performs native operations
4. The bridge provides a consistent API for navigation, reloading, and executing JavaScript

## Extending Functionality

You can extend the bridge to support additional native functionality:

1. Add new message handlers in `WKWebViewHandler.swift`
2. Expose new JavaScript functions in `WebViewViewController.swift`
3. Update `WKWebViewBridge.js` to include the new functionality

## Example: Adding Camera Access

```swift
// In WKWebViewHandler.swift, add a new case to the switch statement
case "takePicture":
    handleTakePicture(id: id)

// Add the handler method
private func handleTakePicture(id: String) {
    // Implement camera access
    // ...
    sendSuccessResponse(id: id, data: ["imageUrl": imageUrl])
}
```

Then expose it to JavaScript in your view controller:

```swift
let script = """
window.nativeApp = window.nativeApp || {};
window.nativeApp.takePicture = function() {
    return new Promise((resolve, reject) => {
        const callbackId = 'camera_' + Date.now();
        window.webkit.messageHandlers.webViewBridge.postMessage({
            id: callbackId,
            action: 'takePicture',
            data: {}
        });
    });
};
"""
```

## Testing

When testing in a browser, the WebViewAdapter will fall back to using an iframe to simulate the WKWebView. This allows you to develop and test your application without needing to build and run the iOS app for every change.

---

## Connect With Us

[![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white)](https://www.reddit.com/r/sans_ui/)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/profullstackinc)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/profullstackinc)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/+VGCI_sR-guhmNTNh)
[![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://join.slack.com/t/profullstackinc/shared_invite/zt-2d9c842fk-jo848We~tDajW9nn6DEggw)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/XXvzu4G4)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/profullstack)

*Built happily using "Windsurf on Linux"*  
*Sponsored by [Profullstack, Inc.](https://profullstack.com)*
