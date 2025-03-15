/**
 * ComponentAdapter.js
 * 
 * An abstraction layer for Sans UI components that simplifies property passing
 * and event handling across different platforms and frameworks.
 */

class ComponentAdapter {
  /**
   * Create a new component adapter
   * @param {string} componentType - The type of component (e.g., 'button', 'input')
   * @param {Object} options - Configuration options
   */
  constructor(componentType, options = {}) {
    this.componentType = componentType;
    this.options = options;
    this.element = null;
    this.eventHandlers = {};
    this.properties = {};
  }

  /**
   * Create and return the component element
   * @param {HTMLElement} container - The container to append the component to
   * @returns {HTMLElement} The created component element
   */
  create(container) {
    // Create the element based on component type
    const tagName = `sans-${this.componentType}`;
    this.element = document.createElement(tagName);
    
    // Apply initial properties
    this._applyProperties();
    
    // Append to container if provided
    if (container) {
      container.appendChild(this.element);
    }
    
    return this.element;
  }

  /**
   * Set a property on the component
   * @param {string} name - The property name
   * @param {any} value - The property value
   * @returns {ComponentAdapter} The component adapter instance for chaining
   */
  setProperty(name, value) {
    this.properties[name] = value;
    
    if (this.element) {
      this._applyProperty(name, value);
    }
    
    return this;
  }

  /**
   * Set multiple properties at once
   * @param {Object} props - Object containing properties to set
   * @returns {ComponentAdapter} The component adapter instance for chaining
   */
  setProperties(props) {
    Object.entries(props).forEach(([name, value]) => {
      this.properties[name] = value;
    });
    
    if (this.element) {
      this._applyProperties();
    }
    
    return this;
  }

  /**
   * Add an event listener to the component
   * @param {string} eventName - The event name
   * @param {Function} handler - The event handler function
   * @returns {ComponentAdapter} The component adapter instance for chaining
   */
  on(eventName, handler) {
    // Store the handler
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
    
    // Attach the handler if element exists
    if (this.element) {
      this._attachEventHandler(eventName, handler);
    }
    
    return this;
  }

  /**
   * Remove an event listener from the component
   * @param {string} eventName - The event name
   * @param {Function} [handler] - The specific handler to remove (optional)
   * @returns {ComponentAdapter} The component adapter instance for chaining
   */
  off(eventName, handler) {
    if (!this.eventHandlers[eventName]) return this;
    
    if (handler) {
      // Remove specific handler
      const index = this.eventHandlers[eventName].indexOf(handler);
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
        if (this.element) {
          // For custom elements, we need to recreate the event listeners
          this._refreshEventHandlers(eventName);
        }
      }
    } else {
      // Remove all handlers for this event
      delete this.eventHandlers[eventName];
      if (this.element) {
        // For custom elements, we need to recreate the event listeners
        this._refreshEventHandlers(eventName);
      }
    }
    
    return this;
  }

  /**
   * Get the native element
   * @returns {HTMLElement} The native element
   */
  getElement() {
    return this.element;
  }

  /**
   * Remove the component from the DOM
   */
  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = null;
  }

  /**
   * Apply all properties to the element
   * @private
   */
  _applyProperties() {
    if (!this.element) return;
    
    Object.entries(this.properties).forEach(([name, value]) => {
      this._applyProperty(name, value);
    });
  }

  /**
   * Apply a single property to the element
   * @param {string} name - The property name
   * @param {any} value - The property value
   * @private
   */
  _applyProperty(name, value) {
    if (!this.element) return;
    
    // Handle boolean attributes
    if (typeof value === 'boolean') {
      if (value) {
        // Convert camelCase to kebab-case for attributes
        const attrName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        this.element.setAttribute(attrName, '');
      } else {
        const attrName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        this.element.removeAttribute(attrName);
      }
    } 
    // Handle object and array values (as properties, not attributes)
    else if (typeof value === 'object') {
      this.element[name] = value;
    } 
    // Handle primitive values
    else {
      const attrName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      this.element.setAttribute(attrName, value);
    }
  }

  /**
   * Attach an event handler to the element
   * @param {string} eventName - The event name
   * @param {Function} handler - The event handler function
   * @private
   */
  _attachEventHandler(eventName, handler) {
    if (!this.element) return;
    
    // Map common event names to custom element event names
    const customEventMap = {
      'click': 'button-click',
      'change': 'input-change',
      'input': 'input-input',
      'submit': 'form-submit'
    };
    
    const customEventName = customEventMap[eventName] || eventName;
    
    // Create a wrapper function to handle custom events
    const wrapperFn = (e) => {
      // For custom events, the actual data is in e.detail
      const eventData = e.detail || e;
      handler(eventData, this);
    };
    
    // Store the wrapper function reference for removal later
    handler._wrapperFn = wrapperFn;
    
    this.element.addEventListener(customEventName, wrapperFn);
  }

  /**
   * Refresh event handlers for a specific event
   * @param {string} eventName - The event name
   * @private
   */
  _refreshEventHandlers(eventName) {
    if (!this.element) return;
    
    // Map common event names to custom element event names
    const customEventMap = {
      'click': 'button-click',
      'change': 'input-change',
      'input': 'input-input',
      'submit': 'form-submit'
    };
    
    const customEventName = customEventMap[eventName] || eventName;
    
    // Remove all listeners for this event
    const oldElement = this.element;
    const newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
    this.element = newElement;
    
    // Reattach all remaining handlers
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach(handler => {
        this._attachEventHandler(eventName, handler);
      });
    }
  }
}

export default ComponentAdapter;
