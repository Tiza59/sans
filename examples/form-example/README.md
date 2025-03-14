# Sans UI Form Components Example

This directory contains examples demonstrating the usage of the Sans UI form-related components. These components are designed to be reusable web components that can be used in any HTML context.

## Available Form Components

- `sans-form`: A form container component that handles submission and dispatches custom events
- `sans-label`: A label component for form fields
- `sans-input`: An input component supporting various input types (text, email, number, checkbox, etc.)
- `sans-select`: A select dropdown component
- `sans-option`: An option component for use within select components
- `sans-textarea`: A multi-line text input component

## Examples

This directory contains two examples:

1. **Basic Example** (`index.html`): Demonstrates direct usage of the Sans UI form components
2. **Abstraction Layer Example** (`abstraction-example.html`): Shows how to use the Sans UI component abstraction layer to create and manage form components programmatically

## Custom Events

The form components dispatch the following custom events:

- `form-submit`: Dispatched when a form is submitted
- `input-change`: Dispatched when an input value changes
- `textarea-change`: Dispatched when a textarea value changes
- `select-change`: Dispatched when a select value changes
- `label-click`: Dispatched when a label is clicked

## Using the Component Abstraction Layer

The component abstraction layer provides a simplified API for creating and managing Sans UI components. For form components, you can use the following factory methods:

```javascript
import ComponentFactory from '../../src/lib/components/ComponentFactory.js';

// Create a form
const form = ComponentFactory.createForm({
  id: 'myForm',
  method: 'post',
  action: '/submit'
});

// Create an input
const input = ComponentFactory.createInput({
  id: 'name',
  name: 'name',
  type: 'text',
  placeholder: 'Enter your name',
  required: true
});

// Create a select
const select = ComponentFactory.createSelect({
  id: 'country',
  name: 'country'
});

// Create an option
const option = ComponentFactory.createOption({
  value: 'us',
  textContent: 'United States'
});

// Create a textarea
const textarea = ComponentFactory.createTextarea({
  id: 'message',
  name: 'message',
  rows: 5,
  placeholder: 'Enter your message'
});

// Create a label
const label = ComponentFactory.createLabel({
  for: 'name',
  textContent: 'Name:'
});

// Add event listeners
form.addEventListener('form-submit', (e) => {
  console.log('Form submitted:', e.detail);
});
```

## Integration with Other Sans UI Components

The form components work seamlessly with other Sans UI components, such as buttons, divs, and other HTML5 components. You can use them together to create complex user interfaces.
