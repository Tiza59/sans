<p align="center">
  <img src="https://raw.githubusercontent.com/profullstack/sans/refs/heads/master/packages/ui/static/logos/ui/logo.sans-ui.white.svg" alt="Sans UI Logo" height="60" style="margin: 2.2rem;" />
  <img src="https://raw.githubusercontent.com/profullstack/sans/refs/heads/master/packages/api/static/logos/api/logo.sans-api.white.svg" alt="Sans API Logo" height="60" style="margin: 2.2rem;" />
  <img src="https://raw.githubusercontent.com/profullstack/sans/refs/heads/master/packages/db/static/logos/db/logo.sans-db.white.svg" alt="Sans DB Logo" height="60" style="margin: 2.2rem;" />
</p>

# Sans UI

A cross-platform native UI library which supports iOS, Android, Windows, macOS, and Linux using NodeGUI for desktop and NativeScript for mobile. Built with Svelte 4 and web components.

[See our HN announcement.](https://news.ycombinator.com/item?id=43362740)

### Frontends
[![Svelte](https://img.shields.io/badge/Svelte-f1413d.svg?logo=svelte&logoColor=fff&style=for-the-badge)](https://primatejs.com/modules/svelte)
[![Web Components](https://img.shields.io/badge/Web%20Components-29ABE2?logo=webcomponentsdotorg&logoColor=fff&style=for-the-badge)](https://primatejs.com/modules/web-components)

### Desktops
[![Qt](https://img.shields.io/badge/Qt-41CD52?logo=qt&logoColor=fff&style=for-the-badge)](https://www.qt.io/)
[![NodeGUI](https://img.shields.io/badge/NodeGUI-339933?logo=node.js&logoColor=fff&style=for-the-badge)](https://nodegui.org/)

### Mobile
[![NativeScript](https://img.shields.io/badge/NativeScript-65ADF1?logo=nativescript&logoColor=fff&style=for-the-badge)](https://nativescript.org/)

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

## Architecture

Sans UI uses a universal abstraction layer that maps Web Components and Svelte to native UI widgets:

- **Desktop Platforms (Windows, macOS, Linux)**: Uses NodeGUI/Qt
- **Mobile Platforms (iOS, Android)**: Uses NativeScript
- **Web Platforms**: Falls back to standard DOM elements

This architecture allows you to write UI code once and have it render natively on all platforms without using WebViews.

## Key Features

- **Write Once, Run Anywhere**: Use the same code across all platforms
- **Native Performance**: Better performance than WebView-based solutions
- **Native Look and Feel**: UI components look and behave like native widgets
- **Familiar API**: Web Components and Svelte provide a familiar developer experience
- **Smaller Bundle Size**: No need for a full browser engine

## Component Mapping

Sans UI provides a standard UI schema that maps to both NodeGUI and NativeScript:

| Component | Web API | Desktop (NodeGUI/Qt) | Mobile (NativeScript) |
|-----------|---------|----------------------|----------------------|
| Button | `<sans-button>` | `QPushButton` | `Button` |
| Text Input | `<sans-textbox>` | `QLineEdit` | `TextField` |
| Label | `<sans-label>` | `QLabel` | `Label` |
| List View | `<sans-list>` | `QListWidget` | `ListView` |
| Image | `<sans-image>` | `QPixmap` | `ImageView` |
| Container | `<sans-container>` | `QWidget` | `StackLayout` |

## Installation

```bash
npm install @profullstackinc/sans-ui
```

Or with pnpm:

```bash
pnpm add @profullstackinc/sans-ui
```

## Usage

### Web Components

```html
<sans-button type="primary">Click Me</sans-button>

<script>
  document.querySelector('sans-button').addEventListener('button-click', () => {
    console.log('Button clicked!');
  });
</script>
```

### Svelte Components

```svelte
<script>
  import { Button } from '@profullstackinc/sans-ui';
  
  function handleClick() {
    console.log('Button clicked!');
  }
</script>

<Button type="primary" onClick={handleClick}>Click Me</Button>
```

### JavaScript API

```javascript
import { createButton, getNativeUI } from '@profullstackinc/sans-ui';

const button = createButton({
  label: 'Click Me',
  type: 'primary'
});

const nativeUI = getNativeUI();
nativeUI.setEventHandler(button, 'click', () => {
  console.log('Button clicked!');
});

document.getElementById('container').appendChild(button);
```

## Development

### Running the Main App

```bash
pnpm dev
```

### Running the Documentation Site

```bash
pnpm docs
```

This will start a development server for the examples directory, which serves as the documentation site.

### Building the Library

```bash
pnpm build
```

### Building the Documentation Site

```bash
pnpm docs:build
```

### Running Tests

```bash
pnpm test
```

### Running on Desktop (NodeGUI)

```bash
pnpm desktop
```

### Running on Mobile (NativeScript)

```bash
pnpm mobile
```

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

## License

ISC