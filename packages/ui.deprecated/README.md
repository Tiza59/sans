<p align="center">
  <a href="./ui"><img src="static/logos/ui/logo.sans-ui.white.svg" alt="Sans UI Logo" height="60" style="margin: 2.2rem;" /></a>
  <a href="./api"><img src="static/logos/api/logo.sans-api.white.svg" alt="Sans API Logo" height="60" style="margin: 2.2rem;" /></a>
  <a href="./db"><img src="static/logos/db/logo.sans-db.white.svg" alt="Sans DB Logo" height="60" style="margin: 2.2rem;" /></a>
</p>

# Sans UI Library

A cross-platform native UI library which supports iOS, Android, Windows, macOS, and Linux using WebViewJS, Apple's WKWebView API, and KDE's Qt WebEngine. Built with Svelte 4 and web components.

[See our HN announcement.](https://news.ycombinator.com/item?id=43362740)

### Frontends
[![Svelte](https://img.shields.io/badge/Svelte-f1413d.svg?logo=svelte&logoColor=fff&style=for-the-badge)](https://primatejs.com/modules/svelte)
[![Web Components](https://img.shields.io/badge/Web%20Components-29ABE2?logo=webcomponentsdotorg&logoColor=fff&style=for-the-badge)](https://primatejs.com/modules/web-components)

### Desktops
[![Qt](https://img.shields.io/badge/Qt-41CD52?logo=qt&logoColor=fff&style=for-the-badge)](https://www.qt.io/)
[![GTK](https://img.shields.io/badge/GTK-4A86CF?logo=gtk&logoColor=fff&style=for-the-badge)](https://www.gtk.org/)

### Runtimes
[![NodeJS](https://img.shields.io/badge/Node-6DA55F?logo=node.js&logoColor=fff&style=for-the-badge)](https://primatejs.com/modules/runtime-support)
[![Deno](https://img.shields.io/badge/Deno-000?logo=deno&logoColor=fff&style=for-the-badge)](https://primatejs.com/modules/runtime-support)
[![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff&style=for-the-badge)](https://primatejs.com/modules/runtime-support)

### Platforms
[![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=fff&style=for-the-badge)](https://github.com/profullstack/sans-ui)
[![iOS](https://img.shields.io/badge/iOS-000000?logo=apple&logoColor=fff&style=for-the-badge)](https://github.com/profullstack/sans-ui)
[![Windows](https://img.shields.io/badge/Windows-0078D6?logo=windows&logoColor=fff&style=for-the-badge)](https://github.com/profullstack/sans-ui)
[![macOS](https://img.shields.io/badge/macOS-000000?logo=macos&logoColor=fff&style=for-the-badge)](https://github.com/profullstack/sans-ui)
[![Linux](https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=000&style=for-the-badge)](https://github.com/profullstack/sans-ui)
[![KDE](https://img.shields.io/badge/KDE-1D99F3?logo=kde&logoColor=fff&style=for-the-badge)](https://github.com/profullstack/sans-ui)
[![GNOME](https://img.shields.io/badge/GNOME-4A86CF?logo=gnome&logoColor=fff&style=for-the-badge)](https://github.com/profullstack/sans-ui)

## About

Sans UI is designed to create consistent user interfaces across multiple platforms while leveraging native capabilities. The library uses:

- **WebViewJS**: For cross-platform compatibility and communication between web and native code
- **Apple's WKWebView API**: For high-performance rendering on iOS and macOS
- **Qt WebEngine**: For native KDE integration on Linux
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

### KDE (Linux)
Leverages Qt WebEngine for native KDE integration, providing access to KDE-specific features like file dialogs, notifications, and theming while maintaining the same web-based UI.

### Web Browsers
All components work in modern web browsers through both Svelte components and standard Web Components.

## Architecture

Sans UI follows a layered architecture:

1. **UI Layer**: Svelte components that define the visual interface
2. **Bridge Layer**: WebViewJS adapters that handle communication between web and native code
3. **Native Layer**: Platform-specific implementations that provide access to native features
   - iOS/macOS: WKWebView bridge
   - Android: WebView with JavaScript interfaces
   - KDE: Qt WebEngine bridge

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
pnpm dev  # This uses pnpx vite internally
```

## Running examples locally

The repository contains several examples that demonstrate different features of Sans UI:

### Backend Example with Supabase Integration

The backend example demonstrates how to use Supabase with Sans UI for database operations:

```bash
cd examples/backend
pnpm install
# Configure your .env file with Supabase credentials
pnpm dev
```

This example includes:
- Subscriber management with Supabase database
- RESTful API with search, pagination, and filtering
- Email integration with Mailgun

See the [backend example README](./examples/backend/README.md) for more details.

### Component Abstraction Example

This example demonstrates the abstraction layer for web components:

```bash
# Start a simple HTTP server in the Sans UI root directory
python -m http.server 8000

# Access the example at:
# http://localhost:8000/examples/component-abstraction/index.html
```

### Camera Subscribe Example

This example demonstrates camera access and a subscription form:

```bash
# Start a simple HTTP server in the Sans UI root directory
python -m http.server 8000

# Access the example at:
# http://localhost:8000/examples/camera-subscribe-example/
```

### Backend Example

This example runs a simple backend API for handling subscription form submissions:

```bash
# Navigate to the backend example directory
cd examples/backend

# Install dependencies
npm install

# Start the server
npm start
```

### KDE Example

To run the KDE native integration example:

```bash
# Build the KDE bridge application
cd native/kde
qmake
make

# Run the application with an example URL
./sans-ui-kde --url=http://localhost:8000/examples/component-abstraction/
```

## Building

```sh
pnpm build  # This uses pnpx vite build internally
```

## Preview

```sh
pnpm preview  # This uses pnpx vite preview internally
```

## Publishing

To publish a new version of Sans UI:

1. **Update the version** in `package.json`

```sh
# Bump the version (choose one)
npm version patch  # For bug fixes (0.0.x)
npm version minor  # For new features (0.x.0)
npm version major  # For breaking changes (x.0.0)
```

2. **Build the package**

```sh
pnpm build
```

3. **Test the build locally** (optional but recommended)

```sh
# Create a tarball
npm pack

# Install in a test project
npm install --no-save /path/to/profullstack-sans-ui-x.y.z.tgz
```

4. **Publish to package registries**

   a. **Publish to npm**
   ```sh
   npm run publish:npm
   # or directly
   npm publish --access public
   ```

   b. **Publish to Bun**
   ```sh
   npm run publish:bun
   # or directly
   bun publish
   ```

   c. **Publish to Deno**
   ```sh
   npm run publish:deno
   # This runs the deno:build script first and then publishes
   ```

5. **Create a GitHub release**
   - Tag the release in git
   - Create a release on GitHub with release notes
   - Attach the built package to the release

```sh
# Create a git tag
git tag v$(node -p "require('./package.json').version")

# Push the tag
git push origin v$(node -p "require('./package.json').version")
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