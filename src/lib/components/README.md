<p align="center">
  <img src="../../../../logo.svg" alt="Sans UI Logo" width="138" height="74" />
</p>

# Sans UI Component Abstraction Layer

This module provides a simple abstraction layer for Sans UI components, making it easier to work with web components across different platforms and frameworks. It simplifies property passing and event handling, providing a consistent API regardless of the underlying implementation.

## Features

- Unified API for creating and managing components
- Simplified property setting and getting
- Consistent event handling across platforms
- Automatic conversion between JavaScript property names and HTML attributes
- Chainable methods for a fluent interface

## Usage

### Basic Usage

```javascript
import { ComponentFactory } from '@sans-ui/components';

// Create a button component
const button = ComponentFactory.createButton({
  type: 'primary',
  size: 'medium',
  disabled: false
});

// Set the button text
button.getElement().textContent = 'Click Me';

// Add a click event handler
button.on('click', (event, component) => {
  console.log('Button clicked!');
});

// Add the button to the DOM
button.create(document.getElementById('container'));
```

### Dynamic Property Changes

```javascript
// Change properties dynamically
button.setProperty('disabled', true);
button.setProperty('type', 'secondary');

// Or set multiple properties at once
button.setProperties({
  disabled: false,
  type: 'danger',
  size: 'large'
});
```

### Event Handling

```javascript
// Add event listeners
button.on('click', handleClick);

// Remove specific event listener
button.off('click', handleClick);

// Remove all click event listeners
button.off('click');
```

### Creating Custom Components

```javascript
import { ComponentFactory } from '@sans-ui/components';

// Create any Sans UI component by type
const customComponent = ComponentFactory.create('custom-type', {
  // Initial properties
  property1: 'value1',
  property2: 'value2'
});

customComponent.on('custom-event', handleCustomEvent);
customComponent.create(container);
```

## API Reference

### ComponentFactory

The `ComponentFactory` class provides static methods for creating component adapters:

- `createButton(props)`: Create a button component
- `createInput(props)`: Create an input component
- `createSelect(props)`: Create a select component
- `createForm(props)`: Create a form component
- `createCard(props)`: Create a card component
- `createModal(props)`: Create a modal component
- `create(type, props)`: Create any component by type

### ComponentAdapter

The `ComponentAdapter` class provides methods for managing components:

- `create(container)`: Create the component and append it to a container
- `setProperty(name, value)`: Set a single property
- `setProperties(props)`: Set multiple properties
- `on(eventName, handler)`: Add an event listener
- `off(eventName, [handler])`: Remove an event listener
- `getElement()`: Get the native element
- `destroy()`: Remove the component from the DOM

## Integration with Frameworks

### React

```jsx
import { useEffect, useRef } from 'react';
import { ComponentFactory } from '@sans-ui/components';

function SansButton({ type, size, disabled, onClick, children }) {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    // Create the button component
    const button = ComponentFactory.createButton({
      type,
      size,
      disabled
    });
    
    // Set the button text
    button.getElement().textContent = children;
    
    // Add click handler
    if (onClick) {
      button.on('click', onClick);
    }
    
    // Create the button in the DOM
    button.create(containerRef.current);
    
    // Store the button reference
    buttonRef.current = button;
    
    // Clean up on unmount
    return () => {
      button.destroy();
    };
  }, []);
  
  // Update properties when they change
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setProperties({
        type,
        size,
        disabled
      });
    }
  }, [type, size, disabled]);
  
  return <div ref={containerRef}></div>;
}
```

### Vue

```vue
<template>
  <div ref="container"></div>
</template>

<script>
import { ComponentFactory } from '@sans-ui/components';

export default {
  props: {
    type: { type: String, default: 'default' },
    size: { type: String, default: 'medium' },
    disabled: { type: Boolean, default: false },
    text: { type: String, required: true }
  },
  data() {
    return {
      button: null
    };
  },
  mounted() {
    // Create the button component
    this.button = ComponentFactory.createButton({
      type: this.type,
      size: this.size,
      disabled: this.disabled
    });
    
    // Set the button text
    this.button.getElement().textContent = this.text;
    
    // Add click handler
    this.button.on('click', () => {
      this.$emit('click');
    });
    
    // Create the button in the DOM
    this.button.create(this.$refs.container);
  },
  beforeDestroy() {
    // Clean up
    if (this.button) {
      this.button.destroy();
    }
  },
  watch: {
    // Watch for prop changes
    type(newValue) {
      this.button?.setProperty('type', newValue);
    },
    size(newValue) {
      this.button?.setProperty('size', newValue);
    },
    disabled(newValue) {
      this.button?.setProperty('disabled', newValue);
    },
    text(newValue) {
      if (this.button) {
        this.button.getElement().textContent = newValue;
      }
    }
  }
};
</script>
```

## Benefits

1. **Consistency**: Provides a consistent API across different platforms and frameworks
2. **Simplicity**: Simplifies property passing and event handling
3. **Flexibility**: Works with any Sans UI component
4. **Framework Agnostic**: Can be used with any JavaScript framework or vanilla JS
5. **Chainable API**: Fluent interface for better readability

---

## Connect With Us

[![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white)](https://www.reddit.com/r/sans_ui/)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/profullstackinc)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/profullstackinc)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/+VGCI_sR-guhmNTNh)
[![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://flightclub.profullstack.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/profullstack)

*Built happily using "Windsurf on Linux"*  
*Sponsored by [Profullstack, Inc.](https://profullstack.com)* -- hire us!
