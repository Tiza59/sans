/**
 * WebAdapter.js
 * Adapter for web rendering as a fallback
 */

/**
 * WebAdapter class provides a web implementation for fallback
 */
export default class WebAdapter {
  constructor(options = {}) {
    this.options = options;
    this.rootElement = null;
    this.elements = new Map();
    this.eventHandlers = new Map();
    
    // Initialize root element
    if (typeof document !== 'undefined') {
      this.rootElement = document.createElement('div');
      this.rootElement.className = 'sans-ui-root';
    }
  }

  /**
   * Create a native UI element using web DOM
   * @param {string} elementType - The type of element to create
   * @param {Object} props - Properties for the element
   * @returns {Object} The created DOM element
   */
  createElement(elementType, props = {}) {
    // Check if DOM is available
    if (typeof document === 'undefined') {
      return this._createFallbackElement(elementType, props);
    }

    let element;
    
    // Map component types to HTML elements
    switch (elementType.toLowerCase()) {
      case 'button':
        element = document.createElement('button');
        break;
      case 'label':
        element = document.createElement('span');
        break;
      case 'textbox':
        element = document.createElement('input');
        element.type = 'text';
        break;
      case 'image':
        element = document.createElement('img');
        break;
      case 'list':
        element = document.createElement('ul');
        break;
      case 'container':
        element = document.createElement('div');
        break;
      default:
        element = document.createElement('div');
    }
    
    // Store element reference
    const id = this._generateId();
    this.elements.set(id, element);
    element.__sansId = id;
    
    // Apply initial properties
    this.updateElement(element, props);
    
    return element;
  }

  /**
   * Create a fallback element when DOM is not available
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
    
    this.elements.set(element.__sansId, element);
    return element;
  }

  /**
   * Update an existing UI element
   * @param {Object} element - The element to update
   * @param {Object} props - New properties for the element
   * @returns {Object} The updated element
   */
  updateElement(element, props = {}) {
    if (!element) return null;
    
    // Handle fallback elements
    if (element.__isFallback) {
      element.props = { ...element.props, ...props };
      return element;
    }
    
    // Apply properties based on element type
    if (element.tagName === 'BUTTON') {
      if (props.label || props.text) {
        element.textContent = props.label || props.text;
      }
      if (props.disabled !== undefined) {
        element.disabled = props.disabled;
      }
    } else if (element.tagName === 'SPAN') {
      if (props.text) {
        element.textContent = props.text;
      }
    } else if (element.tagName === 'INPUT') {
      if (props.value !== undefined) {
        element.value = props.value;
      }
      if (props.placeholder) {
        element.placeholder = props.placeholder;
      }
      if (props.disabled !== undefined) {
        element.disabled = props.disabled;
      }
    } else if (element.tagName === 'IMG') {
      if (props.src) {
        element.src = props.src;
      }
      if (props.alt) {
        element.alt = props.alt;
      }
    }
    
    // Apply styles
    if (props.style) {
      this.applyStyles(element, props.style);
    }
    
    // Apply other attributes
    if (props.attributes) {
      for (const [key, value] of Object.entries(props.attributes)) {
        element.setAttribute(key, value);
      }
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
    
    // For actual DOM elements
    if (parent.appendChild && typeof parent.appendChild === 'function') {
      parent.appendChild(child);
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
    
    // For actual DOM elements
    if (parent.removeChild && typeof parent.removeChild === 'function' && child.parentNode === parent) {
      parent.removeChild(child);
    }
  }

  /**
   * Set an event handler for a UI element
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
    
    // Map event names if needed
    const domEventName = this._mapEventName(eventName);
    
    // Store handler reference to prevent garbage collection
    if (!this.eventHandlers.has(element.__sansId)) {
      this.eventHandlers.set(element.__sansId, {});
    }
    
    const elementHandlers = this.eventHandlers.get(element.__sansId);
    
    // Remove previous handler if exists
    if (elementHandlers[domEventName]) {
      element.removeEventListener(domEventName, elementHandlers[domEventName]);
    }
    
    // Add new handler
    elementHandlers[domEventName] = handler;
    element.addEventListener(domEventName, handler);
  }

  /**
   * Map component event names to DOM event names
   * @private
   * @param {string} eventName - Component event name
   * @returns {string} DOM event name
   */
  _mapEventName(eventName) {
    const eventMap = {
      'click': 'click',
      'input': 'input',
      'change': 'change',
      'focus': 'focus',
      'blur': 'blur'
    };
    
    return eventMap[eventName.toLowerCase()] || eventName;
  }

  /**
   * Apply styles to a UI element
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
    
    // Apply styles to DOM element
    for (const [key, value] of Object.entries(styleObj)) {
      element.style[key] = value;
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
      const [property, value] = style.split(':').map(s => s.trim());
      if (property && value) {
        // Convert kebab-case to camelCase
        const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        result[camelProperty] = value;
      }
    }
    
    return result;
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
    
    // Clean up element references
    this.elements.clear();
    
    // Remove root element from DOM if it exists
    if (this.rootElement && this.rootElement.parentNode) {
      this.rootElement.parentNode.removeChild(this.rootElement);
    }
    
    this.rootElement = null;
  }
}