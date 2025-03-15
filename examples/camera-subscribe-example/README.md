<p align="center">
  <img src="../../static/ui/logo.sans-ui.svg" alt="Sans UI Logo" width="138" height="74" style="margin-right: 20px;" />
  <img src="../../static/api/logo.sans-api.svg" alt="Sans API Logo" width="138" height="74" style="margin-right: 20px;" />
  <img src="../../static/db/logo.sans-db.svg" alt="Sans DB Logo" width="138" height="74" />
</p>

# Sans UI Camera & Subscribe Example

This example demonstrates how to build a cross-platform application using Sans UI that utilizes device camera access and includes a subscription form for collecting email addresses.

## Features

- Camera access with permission handling
- Photo capture and gallery display
- Camera switching (front/back) when available
- Email subscription form with validation
- Native notifications through Sans UI bridge
- Platform detection and adaptation
- Responsive design for all screen sizes

## Running the Example

### Web Browser

To run the example in a web browser:

1. Start a local web server in the Sans UI root directory:
   ```bash
   cd /path/to/sans-ui
   python -m http.server 8000
   ```

2. Open a browser and navigate to:
   ```
   http://localhost:8000/examples/camera-subscribe-example/
   ```

### Qt Desktop

To run the example using the Qt bridge:

1. Build the Qt bridge application:
   ```bash
   cd native/qt
   qmake
   make
   ```

2. Run the application with the example URL:
   ```bash
   ./sans-ui-qt --url=http://localhost:8000/examples/camera-subscribe-example/
   ```

### GTK Desktop

To run the example using the GTK bridge:

1. Build the GTK bridge application (if available).
2. Run the application with the example URL.

## Implementation Details

### Camera Implementation

The camera functionality demonstrates:

- Requesting camera permissions through the native bridge
- Accessing the device camera using the MediaDevices API
- Capturing photos and displaying them in a gallery
- Switching between front and back cameras
- Saving photos using native file dialogs when available

### Subscription Form

The subscription form demonstrates:

- Form validation with native feedback
- Handling form submissions
- Displaying success messages
- Storing subscription data locally
- Using native notifications for feedback

### Sans UI Integration

This example shows how to:

- Detect the running platform
- Initialize the appropriate Sans UI bridge
- Use native features when available
- Provide web fallbacks when running in a browser
- Adapt the UI based on the platform

## Code Structure

- `index.html` - Main HTML structure
- `css/styles.css` - Styling for the application
- `js/app.js` - Sans UI initialization and platform detection
- `js/camera.js` - Camera functionality
- `js/subscribe.js` - Subscription form handling

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
