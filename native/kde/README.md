<p align="center">
  <img src="../../static/ui/logo.sans-ui.svg" alt="Sans UI Logo" width="138" height="74" style="margin-right: 20px;" />
  <img src="../../static/api/logo.sans-api.svg" alt="Sans API Logo" width="138" height="74" style="margin-right: 20px;" />
  <img src="../../static/db/logo.sans-db.svg" alt="Sans DB Logo" width="138" height="74" />
</p>

# Sans UI KDE Bridge

This is a native KDE implementation for Sans UI using Qt WebEngine. It provides a bridge between your web-based UI and native KDE functionality.

## Features

- Native KDE window with proper integration
- Qt WebEngine for web content rendering (Chromium-based)
- JavaScript bridge for bidirectional communication
- Native KDE file dialogs
- Native KDE notifications
- Support for KDE themes and styling

## Prerequisites

To build and run the KDE bridge, you need:

- Qt 5.12+ with WebEngine support
- KDE Frameworks 5 (specifically KNotifications)
- C++ development environment

## Building

### Install Dependencies

On Debian/Ubuntu-based systems:

```bash
sudo apt install build-essential qtbase5-dev qtwebengine5-dev libkf5notifications-dev
```

On Fedora/RHEL-based systems:

```bash
sudo dnf install qt5-qtbase-devel qt5-qtwebengine-devel kf5-knotifications-devel
```

On Arch Linux:

```bash
sudo pacman -S qt5-base qt5-webengine knotifications
```

### Compile

```bash
cd native/kde
qmake
make
```

## Usage

Run the KDE bridge application and pass your web application URL:

```bash
./sans-ui-kde --url=http://localhost:3000 --title="My Sans UI App"
```

Options:

- `--url` or `-u`: URL to load (default: http://localhost:3000)
- `--title` or `-t`: Window title (default: "Sans UI Application")
- `--width` or `-w`: Window width (default: 800)
- `--height` or `-h`: Window height (default: 600)

## JavaScript API

The bridge exposes a JavaScript API that can be accessed from your web application:

```javascript
// Check if running in KDE WebEngine environment
if (typeof window.qt !== 'undefined' && typeof window.qt.webChannelTransport !== 'undefined') {
  // The bridge will be available as window.bridge once initialized
  window.bridgeReady = function(bridge) {
    // Now you can use the bridge
    
    // Open a file dialog
    bridge.openFileDialog({ title: 'Select a file' })
      .then(filePath => {
        console.log('Selected file:', filePath);
      });
    
    // Show a notification
    bridge.showNotification({
      title: 'Hello',
      text: 'This is a native KDE notification',
      iconName: 'dialog-information'
    });
  };
}
```

## Integration with Sans UI

The KDE bridge is automatically detected and used when your Sans UI application is running in the KDE environment. The WebViewAdapter in Sans UI will use the appropriate bridge based on the detected platform.

## License

Same as the main Sans UI project.

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
