/**
 * Svelte Integration for Sans UI Component Abstraction Layer
 * 
 * This file creates custom elements that integrate with the Sans UI Svelte components
 * to demonstrate how the component abstraction layer works with the actual components.
 */

// Import the Svelte components
import Button from '../../src/components/html5/Button.svelte';

// Define a registry for Svelte components
const SvelteRegistry = {
  'button': Button
};

// Create custom elements for each Svelte component
class SansSvelteElement extends HTMLElement {
  constructor() {
    super();
    this._props = {};
    this._svelteInstance = null;
  }
  
  connectedCallback() {
    const tagName = this.tagName.toLowerCase().replace('sans-', '');
    const SvelteComponent = SvelteRegistry[tagName];
    
    if (!SvelteComponent) {
      console.error(`No Svelte component found for ${tagName}`);
      return;
    }
    
    // Create a container for the Svelte component
    const container = document.createElement('div');
    container.style.display = 'contents';
    this.appendChild(container);
    
    // Initialize the Svelte component with the current attributes
    const props = this._getPropsFromAttributes();
    this._props = props;
    
    this._svelteInstance = new SvelteComponent({
      target: container,
      props: props
    });
  }
  
  disconnectedCallback() {
    if (this._svelteInstance) {
      this._svelteInstance.$destroy();
      this._svelteInstance = null;
    }
  }
  
  _getPropsFromAttributes() {
    const props = {};
    
    // Convert attributes to props
    Array.from(this.attributes).forEach(attr => {
      const name = attr.name;
      let value = attr.value;
      
      // Convert boolean attributes
      if (value === '' || value === name) {
        value = true;
      } else if (value === 'false') {
        value = false;
      } else if (!isNaN(Number(value))) {
        // Convert numeric values
        value = Number(value);
      }
      
      props[name] = value;
    });
    
    return props;
  }
  
  // Handle attribute changes
  static get observedAttributes() {
    return ['type', 'size', 'disabled', 'fullwidth', 'style'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._svelteInstance) return;
    
    let value = newValue;
    
    // Convert boolean attributes
    if (value === '' || value === name) {
      value = true;
    } else if (value === 'false' || value === null) {
      value = false;
    } else if (!isNaN(Number(value))) {
      // Convert numeric values
      value = Number(value);
    }
    
    // Update the Svelte component
    this._props[name] = value;
    this._svelteInstance.$set({ [name]: value });
  }
}

// Register the custom elements
customElements.define('sans-button', SansSvelteElement);

console.log('Sans UI Svelte components registered as custom elements');
