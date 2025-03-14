/**
 * Component Adapter class for Sans UI
 */
export class ComponentAdapter {
  constructor(element, properties = {}) {
    this.element = element || document.createElement('div');
    this.properties = properties || {};
    this.eventHandlers = {};
    
    // Apply initial properties
    this.applyProperties();
  }
  
  /**
   * Apply properties to the element
   */
  applyProperties() {
    for (const [key, value] of Object.entries(this.properties)) {
      this.applyProperty(key, value);
    }
  }
  
  /**
   * Apply a single property to the element
   */
  applyProperty(key, value) {
    if (key === 'type') {
      // Remove all type classes
      this.element.classList.remove('default', 'primary', 'secondary', 'danger');
      // Add the new type class
      this.element.classList.add(value);
    } else if (key === 'size') {
      // Remove all size classes
      this.element.classList.remove('small', 'medium', 'large');
      // Add the new size class
      this.element.classList.add(value);
    } else if (key === 'disabled') {
      if (value) {
        this.element.setAttribute('disabled', '');
        this.element.classList.add('disabled');
      } else {
        this.element.removeAttribute('disabled');
        this.element.classList.remove('disabled');
      }
    } else {
      // Set as attribute
      if (value === true) {
        this.element.setAttribute(key, '');
      } else if (value === false) {
        this.element.removeAttribute(key);
      } else if (value !== null && value !== undefined) {
        this.element.setAttribute(key, value);
      }
    }
  }
  
  /**
   * Set a property value
   */
  setProperty(key, value) {
    this.properties[key] = value;
    this.applyProperty(key, value);
    return this;
  }
  
  /**
   * Get a property value
   */
  getProperty(key) {
    return this.properties[key];
  }
  
  /**
   * Get the DOM element
   */
  getElement() {
    return this.element;
  }
  
  /**
   * Add an event listener
   */
  on(eventName, handler) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    
    const wrappedHandler = (e) => {
      handler(e, this);
    };
    
    // Store reference to the original handler
    handler._wrapperFn = wrappedHandler;
    
    this.eventHandlers[eventName].push(handler);
    this.element.addEventListener(eventName, wrappedHandler);
    
    return this;
  }
  
  /**
   * Remove an event listener
   */
  off(eventName, handler) {
    if (!this.eventHandlers[eventName]) return this;
    
    const index = this.eventHandlers[eventName].indexOf(handler);
    if (index !== -1) {
      const wrappedHandler = handler._wrapperFn;
      this.element.removeEventListener(eventName, wrappedHandler);
      this.eventHandlers[eventName].splice(index, 1);
    }
    
    return this;
  }
  
  /**
   * Create the component in the DOM
   */
  create(parent) {
    if (parent) {
      parent.appendChild(this.element);
    }
    return this;
  }
  
  /**
   * Remove the component from the DOM
   */
  remove() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    return this;
  }
  
  /**
   * Replace an existing element with this component
   */
  replace(oldElement) {
    if (oldElement && oldElement.parentNode) {
      oldElement.parentNode.replaceChild(this.element, oldElement);
    }
    return this;
  }
}

/**
 * Component Factory for Sans UI
 */
export class ComponentFactory {
  /**
   * Create a button component
   */
  static createButton(properties = {}) {
    const button = document.createElement('button');
    button.classList.add('sans-button');
    
    // Set default properties
    const defaultProps = {
      type: 'default',
      size: 'medium'
    };
    
    return new ComponentAdapter(button, { ...defaultProps, ...properties });
  }
  
  /**
   * Create an input component
   */
  static createInput(properties = {}) {
    const input = document.createElement('input');
    input.classList.add('sans-input');
    
    // Set default properties
    const defaultProps = {
      type: 'text',
      size: 'medium'
    };
    
    return new ComponentAdapter(input, { ...defaultProps, ...properties });
  }
  
  /**
   * Create a select component
   */
  static createSelect(properties = {}) {
    const select = document.createElement('select');
    select.classList.add('sans-select');
    
    // Set default properties
    const defaultProps = {
      size: 'medium'
    };
    
    return new ComponentAdapter(select, { ...defaultProps, ...properties });
  }
}

export default ComponentFactory;
