/**
 * MobileAdapter.js
 * Adapter for NativeScript native UI rendering on mobile platforms
 */

// Import NativeScript components
// Note: These imports will only work when running in a NativeScript environment
let Button, Label, TextField, Image, ListView, StackLayout, FlexboxLayout;

// Dynamically import NativeScript to avoid errors in non-mobile environments
try {
  if (typeof process !== 'undefined' && process.versions && !process.versions.browser) {
    // Only try to require NativeScript in a Node.js environment, not in the browser
    // @ts-ignore - NativeScript imports
    const nativeScript = require('@nativescript/core');
    
    Button = nativeScript.Button;
    Label = nativeScript.Label;
    TextField = nativeScript.TextField;
    Image = nativeScript.Image;
    ListView = nativeScript.ListView;
    StackLayout = nativeScript.StackLayout;
    FlexboxLayout = nativeScript.FlexboxLayout;
  }
} catch (error) {
  // NativeScript not available, will use fallbacks
  console.warn('NativeScript not available, mobile adapter will use fallbacks');
}

/**
 * Maps component types to NativeScript view classes
 */
const COMPONENT_MAP = {
  'button': Button,
  'label': Label,
  'textbox': TextField,
  'image': Image,
  'list': ListView,
  'container': StackLayout
};

/**
 * Maps event names to NativeScript event names
 */
const EVENT_MAP = {
  'click': 'tap',
  'input': 'textChange',
  'change': 'selectedIndexChange',
  'focus': 'focus',
  'blur': 'blur'
};

/**
 * MobileAdapter class provides NativeScript implementation for mobile platforms
 */
export default class MobileAdapter {
  constructor(options = {}) {
    this.options = options;
    this.rootView = null;
    this.views = new Map();
    this.eventHandlers = new Map();
    
    // Initialize root view if NativeScript is available
    if (StackLayout) {
      this.rootView = new StackLayout();
    }
  }

  /**
   * Create a native UI element using NativeScript
   * @param {string} elementType - The type of element to create
   * @param {Object} props - Properties for the element
   * @returns {Object} The created native element
   */
  createElement(elementType, props = {}) {
    // Check if NativeScript is available
    if (!StackLayout) {
      return this._createFallbackElement(elementType, props);
    }

    const ViewClass = COMPONENT_MAP[elementType.toLowerCase()] || StackLayout;
    const view = new ViewClass();
    
    // Store view reference
    const id = this._generateId();
    this.views.set(id, view);
    view.__sansId = id;
    
    // Apply initial properties
    this.updateElement(view, props);
    
    return view;
  }

  /**
   * Create a fallback element when NativeScript is not available
   * @private
   * @param {string} elementType - The type of element to create
   * @param {Object} props - Properties for the element
   * @returns {Object} A fallback element object
   */
  _createFallbackElement(elementType, props = {}) {
    // Create a simple object to represent the element
    const element = {
      type: elementType,
      props: { ...props },
      children: [],
      __sansId: this._generateId(),
      __isFallback: true
    };
    
    this.views.set(element.__sansId, element);
    return element;
  }

  /**
   * Update an existing native UI element
   * @param {Object} element - The element to update
   * @param {Object} props - New properties for the element
   * @returns {Object} The updated element
   */
  updateElement(element, props = {}) {
    if (!element) return element;
    
    // Handle fallback elements
    if (element.__isFallback) {
      element.props = { ...element.props, ...props };
      return element;
    }
    
    // Apply properties based on element type
    if (Button && element instanceof Button) {
      if (props.label || props.text) {
        element.text = props.label || props.text;
      }
      if (props.disabled !== undefined) {
        element.isEnabled = !props.disabled;
      }
    } else if (Label && element instanceof Label) {
      if (props.text) {
        element.text = props.text;
      }
    } else if (TextField && element instanceof TextField) {
      if (props.value !== undefined) {
        element.text = props.value;
      }
      if (props.placeholder) {
        element.hint = props.placeholder;
      }
      if (props.disabled !== undefined) {
        element.isEnabled = !props.disabled;
      }
    } else if (Image && element instanceof Image) {
      if (props.src) {
        element.src = props.src;
      }
    }
    
    // Apply styles
    if (props.style) {
      this.applyStyles(element, props.style);
    }
    
    return element;
  }

  /**
   * Append a child element to a parent element
   * @param {Object} parent - The parent element
   * @param {Object} child - The child element to append
   */
  appendChild(parent, child) {
    if (!parent || !child) return;
    
    // Handle fallback elements
    if (parent.__isFallback) {
      parent.children.push(child);
      return;
    }
    
    // For actual NativeScript views
    if (parent.addChild && typeof parent.addChild === 'function') {
      parent.addChild(child);
    }
  }

  /**
   * Remove a child element from a parent element
   * @param {Object} parent - The parent element
   * @param {Object} child - The child element to remove
   */
  removeChild(parent, child) {
    if (!parent || !child) return;
    
    // Handle fallback elements
    if (parent.__isFallback) {
      const index = parent.children.indexOf(child);
      if (index !== -1) {
        parent.children.splice(index, 1);
      }
      return;
    }
    
    // For actual NativeScript views
    if (parent.removeChild && typeof parent.removeChild === 'function') {
      parent.removeChild(child);
    }
  }

  /**
   * Set an event handler for a native UI element
   * @param {Object} element - The element to set the event handler on
   * @param {string} eventName - The name of the event
   * @param {Function} handler - The event handler function
   */
  setEventHandler(element, eventName, handler) {
    if (!element) return;
    
    // Handle fallback elements
    if (element.__isFallback) {
      if (!element.__events) {
        element.__events = {};
      }
      element.__events[eventName] = handler;
      return;
    }
    
    // Map web event name to NativeScript event name
    const nsEventName = EVENT_MAP[eventName.toLowerCase()] || eventName;
    
    // Store handler reference to prevent garbage collection
    if (!this.eventHandlers.has(element.__sansId)) {
      this.eventHandlers.set(element.__sansId, {});
    }
    
    const elementHandlers = this.eventHandlers.get(element.__sansId);
    
    // Remove previous handler if exists
    if (elementHandlers[nsEventName] && element.off) {
      element.off(nsEventName, elementHandlers[nsEventName]);
    }
    
    // Add new handler
    elementHandlers[nsEventName] = handler;
    if (element.on) {
      element.on(nsEventName, handler);
    }
  }

  /**
   * Apply styles to a native UI element
   * @param {Object} element - The element to style
   * @param {Object|string} styles - The styles to apply
   */
  applyStyles(element, styles = {}) {
    if (!element) return;
    
    // Handle fallback elements
    if (element.__isFallback) {
      element.style = styles;
      return;
    }
    
    // Convert string styles to object
    let styleObj = styles;
    if (typeof styles === 'string') {
      styleObj = this._parseStyleString(styles);
    }
    
    // Apply styles to NativeScript view
    for (const [key, value] of Object.entries(styleObj)) {
      // Handle special cases
      switch (key) {
        case 'backgroundColor':
          if (element.backgroundColor !== undefined) {
            element.backgroundColor = value;
          }
          break;
        case 'color':
          if (element.color !== undefined) {
            element.color = value;
          }
          break;
        case 'fontSize':
          if (element.fontSize !== undefined) {
            element.fontSize = this._parseFontSize(value);
          }
          break;
        case 'fontWeight':
          if (element.fontWeight !== undefined) {
            element.fontWeight = value;
          }
          break;
        case 'width':
          if (element.width !== undefined) {
            element.width = this._parseSize(value);
          }
          break;
        case 'height':
          if (element.height !== undefined) {
            element.height = this._parseSize(value);
          }
          break;
        case 'margin':
          this._applyMargin(element, value);
          break;
        case 'padding':
          this._applyPadding(element, value);
          break;
        case 'borderRadius':
          if (element.borderRadius !== undefined) {
            element.borderRadius = this._parseSize(value);
          }
          break;
        default:
          // For other properties, try to set directly
          if (element[key] !== undefined) {
            element[key] = value;
          }
      }
    }
  }

  /**
   * Parse CSS style string into an object
   * @private
   * @param {string} styleString - CSS style string
   * @returns {Object} Style object
   */
  _parseStyleString(styleString) {
    const result = {};
    const styles = styleString.split(';');
    
    for (const style of styles) {
      const parts = style.split(':');
      if (parts.length === 2) {
        const property = parts[0].trim();
        const value = parts[1].trim();
        
        if (property && value) {
          // Convert kebab-case to camelCase
          const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          result[camelProperty] = value;
        }
      }
    }
    
    return result;
  }

  /**
   * Parse font size value to NativeScript compatible value
   * @private
   * @param {string} value - CSS font size value
   * @returns {number} NativeScript font size
   */
  _parseFontSize(value) {
    if (typeof value === 'number') return value;
    
    // Remove 'px', 'pt', etc. and convert to number
    const size = parseFloat(value);
    return isNaN(size) ? 14 : size; // Default to 14 if parsing fails
  }

  /**
   * Parse size value to NativeScript compatible value
   * @private
   * @param {string|number} value - CSS size value
   * @returns {number|string} NativeScript size
   */
  _parseSize(value) {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return value;
    
    // Handle percentage values
    if (value.endsWith('%')) {
      return value; // NativeScript supports percentage strings
    }
    
    // Remove 'px', 'pt', etc. and convert to number
    const size = parseFloat(value);
    return isNaN(size) ? value : size;
  }

  /**
   * Apply margin to a NativeScript view
   * @private
   * @param {Object} element - The element to style
   * @param {string|number} value - Margin value
   */
  _applyMargin(element, value) {
    if (!element.margin && !element.marginTop) return;
    
    if (typeof value === 'number') {
      if (element.margin !== undefined) {
        element.margin = value;
      }
      return;
    }
    
    // Handle shorthand CSS margin
    const parts = String(value).split(/\s+/);
    
    if (parts.length === 1) {
      // All sides
      if (element.margin !== undefined) {
        element.margin = this._parseSize(parts[0]);
      }
    } else if (parts.length === 2) {
      // Vertical | Horizontal
      if (element.marginTop !== undefined) {
        element.marginTop = this._parseSize(parts[0]);
      }
      if (element.marginRight !== undefined) {
        element.marginRight = this._parseSize(parts[1]);
      }
      if (element.marginBottom !== undefined) {
        element.marginBottom = this._parseSize(parts[0]);
      }
      if (element.marginLeft !== undefined) {
        element.marginLeft = this._parseSize(parts[1]);
      }
    } else if (parts.length === 4) {
      // Top | Right | Bottom | Left
      if (element.marginTop !== undefined) {
        element.marginTop = this._parseSize(parts[0]);
      }
      if (element.marginRight !== undefined) {
        element.marginRight = this._parseSize(parts[1]);
      }
      if (element.marginBottom !== undefined) {
        element.marginBottom = this._parseSize(parts[2]);
      }
      if (element.marginLeft !== undefined) {
        element.marginLeft = this._parseSize(parts[3]);
      }
    }
  }

  /**
   * Apply padding to a NativeScript view
   * @private
   * @param {Object} element - The element to style
   * @param {string|number} value - Padding value
   */
  _applyPadding(element, value) {
    if (!element.padding && !element.paddingTop) return;
    
    if (typeof value === 'number') {
      if (element.padding !== undefined) {
        element.padding = value;
      }
      return;
    }
    
    // Handle shorthand CSS padding
    const parts = String(value).split(/\s+/);
    
    if (parts.length === 1) {
      // All sides
      if (element.padding !== undefined) {
        element.padding = this._parseSize(parts[0]);
      }
    } else if (parts.length === 2) {
      // Vertical | Horizontal
      if (element.paddingTop !== undefined) {
        element.paddingTop = this._parseSize(parts[0]);
      }
      if (element.paddingRight !== undefined) {
        element.paddingRight = this._parseSize(parts[1]);
      }
      if (element.paddingBottom !== undefined) {
        element.paddingBottom = this._parseSize(parts[0]);
      }
      if (element.paddingLeft !== undefined) {
        element.paddingLeft = this._parseSize(parts[1]);
      }
    } else if (parts.length === 4) {
      // Top | Right | Bottom | Left
      if (element.paddingTop !== undefined) {
        element.paddingTop = this._parseSize(parts[0]);
      }
      if (element.paddingRight !== undefined) {
        element.paddingRight = this._parseSize(parts[1]);
      }
      if (element.paddingBottom !== undefined) {
        element.paddingBottom = this._parseSize(parts[2]);
      }
      if (element.paddingLeft !== undefined) {
        element.paddingLeft = this._parseSize(parts[3]);
      }
    }
  }

  /**
   * Generate a unique ID for tracking elements
   * @private
   * @returns {string} Unique ID
   */
  _generateId() {
    return `sans_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clean up resources when the adapter is no longer needed
   */
  destroy() {
    // Clean up event handlers
    this.eventHandlers.clear();
    
    // Clean up view references
    this.views.clear();
    
    // Clear root view
    this.rootView = null;
  }
}