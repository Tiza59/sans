/**
 * Sans UI Web Components Registration
 * 
 * This file registers the custom elements needed for the Sans UI components
 * to work properly in the browser.
 */

// Define the base class for Sans UI components
class SansBaseElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: inline-block;
      }
      
      .sans-component {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        box-sizing: border-box;
      }
      
      /* Button styles */
      button.sans-component {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid transparent;
        outline: none;
        padding: 8px 16px;
        font-size: 14px;
      }
      
      button.sans-component.primary {
        background-color: #6200ee;
        color: white;
      }
      
      button.sans-component.primary:hover {
        background-color: #5000c1;
      }
      
      button.sans-component.secondary {
        background-color: #03dac6;
        color: #000;
      }
      
      button.sans-component.secondary:hover {
        background-color: #00c4b4;
      }
      
      button.sans-component.danger {
        background-color: #cf6679;
        color: white;
      }
      
      button.sans-component.danger:hover {
        background-color: #b55a68;
      }
      
      button.sans-component.default {
        background-color: #f5f5f5;
        color: #333;
        border-color: #ddd;
      }
      
      button.sans-component.default:hover {
        background-color: #e9e9e9;
      }
      
      button.sans-component.small {
        padding: 4px 12px;
        font-size: 12px;
      }
      
      button.sans-component.medium {
        padding: 8px 16px;
        font-size: 14px;
      }
      
      button.sans-component.large {
        padding: 12px 24px;
        font-size: 16px;
      }
      
      button.sans-component[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
      
      /* Input styles */
      input.sans-component {
        display: block;
        padding: 8px 12px;
        border-radius: 4px;
        border: 1px solid #ddd;
        transition: border-color 0.2s ease;
      }
      
      input.sans-component:focus {
        border-color: #6200ee;
        outline: none;
      }
      
      /* Select styles */
      select.sans-component {
        display: block;
        padding: 8px 12px;
        border-radius: 4px;
        border: 1px solid #ddd;
        background-color: white;
        transition: border-color 0.2s ease;
      }
      
      select.sans-component:focus {
        border-color: #6200ee;
        outline: none;
      }
    `;
    
    this.shadowRoot.appendChild(style);
    
    // Create the main element based on the tag name
    const tagName = this.tagName.toLowerCase().replace('sans-', '');
    const element = document.createElement(tagName);
    element.className = 'sans-component';
    
    // Copy attributes from custom element to internal element
    Array.from(this.attributes).forEach(attr => {
      if (attr.name !== 'style' && attr.name !== 'class') {
        element.setAttribute(attr.name, attr.value);
      }
    });
    
    // Handle slot content
    const slot = document.createElement('slot');
    element.appendChild(slot);
    
    this.shadowRoot.appendChild(element);
    this._element = element;
  }
  
  // Reflect attribute changes to the internal element
  static get observedAttributes() {
    return ['type', 'size', 'disabled'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._element) return;
    
    if (name === 'type' || name === 'size') {
      // Remove old class
      if (oldValue) {
        this._element.classList.remove(oldValue);
      }
      // Add new class
      if (newValue) {
        this._element.classList.add(newValue);
      }
    } else if (name === 'disabled') {
      if (newValue !== null) {
        this._element.setAttribute('disabled', '');
      } else {
        this._element.removeAttribute('disabled');
      }
    } else {
      // Pass through other attributes
      if (newValue === null) {
        this._element.removeAttribute(name);
      } else {
        this._element.setAttribute(name, newValue);
      }
    }
  }
}

// Define the button component
class SansButtonElement extends SansBaseElement {}

// Define the input component
class SansInputElement extends SansBaseElement {}

// Define the select component
class SansSelectElement extends SansBaseElement {}

// Register the custom elements
customElements.define('sans-button', SansButtonElement);
customElements.define('sans-input', SansInputElement);
customElements.define('sans-select', SansSelectElement);

console.log('Sans UI Web Components registered');
