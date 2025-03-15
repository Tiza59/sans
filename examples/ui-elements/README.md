<p align="center">
  <img src="../../static/ui/logo.sans-ui.svg" alt="Sans UI Logo" width="138" height="74" style="margin-right: 20px;" />
  <img src="../../static/api/logo.sans-api.svg" alt="Sans API Logo" width="138" height="74" style="margin-right: 20px;" />
  <img src="../../static/db/logo.sans-db.svg" alt="Sans DB Logo" width="138" height="74" />
</p>

# Sans UI Elements Showcase

This example showcases all the available UI elements and components in the Sans UI library. It serves as a visual reference and documentation for developers using the Sans UI framework.

## Components Demonstrated

### Basic HTML Components
- `sans-div`: Basic container component
- `sans-p`: Paragraph component
- `sans-h1`: Heading component
- `sans-a`: Anchor/link component
- `sans-img`: Image component
- `sans-button`: Button component

### Form Components
- `sans-form`: Form container component
- `sans-input`: Input field component (text, number, checkbox, etc.)
- `sans-select`: Dropdown select component
- `sans-option`: Option component for select dropdowns
- `sans-textarea`: Multi-line text input component
- `sans-label`: Label component for form fields

### Layout Components
- `sans-section`: Section container component
- `sans-article`: Article container component
- `sans-header`: Header component
- `sans-footer`: Footer component

## Color Palette
The example also demonstrates the standard color palette used in Sans UI:
- Primary: #6200ee
- Secondary: #03dac6
- Error: #b00020
- Warning: #ffab00
- Info: #2196f3
- Success: #4caf50

## Component Abstraction Layer
The example includes a demonstration of the Component Abstraction Layer, showing how to create and manipulate components programmatically using the `ComponentFactory` class.

## Usage
To view this example, run the development server using:

```bash
pnpm dev
```

Then navigate to the UI Elements example from the home page or go directly to `/examples/ui-elements/`.

## Integration
All components shown in this example can be used in your own applications by importing and registering them from the Sans UI library:

```javascript
import { registerAllComponents } from 'sans-ui/components/html5/index.js';

// Register all components
registerAllComponents();
```

For programmatic component creation, use the Component Factory:

```javascript
import ComponentFactory from 'sans-ui/lib/components/ComponentFactory.js';

const button = ComponentFactory.createButton({
  textContent: 'Click Me',
  id: 'myButton'
});

document.body.appendChild(button.getElement());
```
