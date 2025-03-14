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
