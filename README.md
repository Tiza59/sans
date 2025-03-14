# Sans UI Library

A cross-platform UI library which supports iOS, Android, Windows, macOS, and Linux using WebViewJS and Apple's WKWebView API. Built with Svelte 4.

## About

Sans UI is designed to create consistent user interfaces across multiple platforms while leveraging native capabilities. The library uses:

- **WebViewJS**: For cross-platform compatibility and communication between web and native code
- **Apple's WKWebView API**: For high-performance rendering on iOS and macOS
- **Svelte 4**: For efficient, reactive UI components

This approach allows developers to write code once and deploy across mobile, desktop, and web platforms while maintaining native-like performance and access to platform-specific features.

## Platform Support

### iOS & macOS
Utilizes Apple's WKWebView API for high-performance rendering and native integration. See the [iOS implementation details](./ios/README.md) for more information on the native bridge.

### Android
Implements WebView with JavaScript interfaces to communicate between the web UI and native Android code.

### Windows, Linux, macOS (Desktop)
Uses WebViewJS to create desktop applications with native capabilities while maintaining the same codebase.

## Architecture

Sans UI follows a layered architecture:

1. **UI Layer**: Svelte components that define the visual interface
2. **Bridge Layer**: WebViewJS adapters that handle communication between web and native code
3. **Native Layer**: Platform-specific implementations that provide access to native features

This separation allows for consistent UI across platforms while still leveraging platform-specific capabilities when needed.

## Installation

```sh
pnpm install
```

## Running in Dev Mode

```sh
pnpm dev
```

## Building

```sh
pnpm build
```

## Preview

```sh
pnpm preview
```

## Usage Examples

### Creating a Component

```svelte
<!-- MyComponent.svelte -->
<script>
  import { onMount } from 'svelte';
  import { WebViewAdapter } from '@webviewjs/webview';
  
  let platform = 'web';
  
  onMount(async () => {
    const adapter = new WebViewAdapter();
    platform = await adapter.getPlatform();
  });
</script>

<div class="my-component">
  <h1>Hello from {platform}!</h1>
  <slot />
</div>
```

### Platform-Specific Code

```svelte
<script>
  import { WebViewAdapter } from '@webviewjs/webview';
  
  const adapter = new WebViewAdapter();
  
  async function takePicture() {
    if (await adapter.isPlatform('ios') || await adapter.isPlatform('android')) {
      return adapter.callNative('takePicture');
    } else {
      // Fallback for desktop/web
      console.log('Camera not available on this platform');
    }
  }
</script>
```

## Development Workflow

1. **Develop UI components** using Svelte in the web environment
2. **Test cross-platform features** using the WebViewJS simulator
3. **Build platform-specific packages** for deployment
4. **Deploy** to your target platforms

This workflow allows for rapid development in the web environment while still supporting native platform features.