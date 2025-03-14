# Sans UI Library

A cross-platform native UI library which supports iOS, Android, Windows, macOS, and Linux using WebViewJS and Apple's WKWebView API. Built with Svelte 4 and web components.

## About

Sans UI is designed to create consistent user interfaces across multiple platforms while leveraging native capabilities. The library uses:

- **WebViewJS**: For cross-platform compatibility and communication between web and native code
- **Apple's WKWebView API**: For high-performance rendering on iOS and macOS
- **Svelte 4**: For efficient, reactive UI components
- **Web Components**: For framework-agnostic HTML5 elements that work everywhere

This approach allows developers to write code once and deploy across mobile, desktop, and web platforms while maintaining native-like performance and access to platform-specific features.

## Platform Support

### iOS & macOS
Utilizes Apple's WKWebView API for high-performance rendering and native integration. See the [iOS implementation details](./ios/README.md) for more information on the native bridge.

### Android
Implements WebView with JavaScript interfaces to communicate between the web UI and native Android code.

### Windows, Linux, macOS (Desktop)
Uses WebViewJS to create desktop applications with native capabilities while maintaining the same codebase.

### Web Browsers
All components work in modern web browsers through both Svelte components and standard Web Components.

## Architecture

Sans UI follows a layered architecture:

1. **UI Layer**: Svelte components that define the visual interface
2. **Bridge Layer**: WebViewJS adapters that handle communication between web and native code
3. **Native Layer**: Platform-specific implementations that provide access to native features

This separation allows for consistent UI across platforms while still leveraging platform-specific capabilities when needed.

## Installation

### Local Development

```sh
pnpm install
```

### Using in Your Projects

```sh
# Using npm
npm install @profullstack/sans-ui

# Using yarn
yarn add @profullstack/sans-ui

# Using pnpm
pnpm add @profullstack/sans-ui

# Using Bun
bun add @profullstack/sans-ui
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

### Using HTML5 Components

```svelte
<!-- MyComponent.svelte -->
<script>
  import { Div, H1, P, Section, Article } from '@profullstack/sans-ui/html5';
</script>

<Div className="container">
  <H1>Hello from Sans UI!</H1>
  <P>This is a paragraph using Sans UI components.</P>
  
  <Section>
    <Article>
      <P>Content inside semantic HTML5 elements.</P>
    </Article>
  </Section>
</Div>
```

### Using Web Components

```html
<script type="module">
  // Import and register all components
  import { registerAllComponents } from '@profullstack/sans-ui';
  registerAllComponents();
</script>

<sans-div style="padding: 20px;">
  <sans-h1>Hello, Sans UI Web Components!</sans-h1>
  <sans-p>This is a paragraph using Sans UI web components.</sans-p>
  
  <sans-section>
    <sans-article>
      <sans-p>Content inside semantic HTML5 elements.</sans-p>
    </sans-article>
  </sans-section>
</sans-div>
```

### Platform-Specific Code

```svelte
<script>
  import { WebViewAdapter } from '@webviewjs/webview';
  import { Div, P, Button } from '@profullstack/sans-ui/html5';
  
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

<Div>
  <P>Take a picture on your device</P>
  <Button onClick={takePicture}>Take Picture</Button>
</Div>
```

## Development Workflow

1. **Develop UI components** using Svelte in the web environment
2. **Test cross-platform features** using the WebViewJS simulator
3. **Build platform-specific packages** for deployment
4. **Deploy** to your target platforms

This workflow allows for rapid development in the web environment while still supporting native platform features.