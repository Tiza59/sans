/**
 * SelectComponent.js
 * A reusable sans-select web component that can be used in any HTML context
 */

class SansSelect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return [
      'id', 'class', 'style', 'name', 'disabled', 'required', 'autofocus',
      'multiple', 'size', 'form', 'data-testid'
    ];
  }
  
  connectedCallback() {
    this.render();
    this.select = this.shadowRoot.querySelector('select');
    
    // Add event listeners
    this.select.addEventListener('change', (e) => {
      // Dispatch a custom event
      this.dispatchEvent(new CustomEvent('select-change', {
        bubbles: true,
        composed: true,
        detail: { 
          source: this,
          value: e.target.value,
          selectedIndex: e.target.selectedIndex,
          selectedOptions: e.target.selectedOptions
        }
      }));
    });
    
    this.select.addEventListener('focus', (e) => {
      this.dispatchEvent(new CustomEvent('select-focus', {
        bubbles: true,
        composed: true,
        detail: { source: this }
      }));
    });
    
    this.select.addEventListener('blur', (e) => {
      this.dispatchEvent(new CustomEvent('select-blur', {
        bubbles: true,
        composed: true,
        detail: { source: this }
      }));
    });
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    if (this.shadowRoot) {
      this.render();
    }
  }
  
  render() {
    const id = this.getAttribute('id') || '';
    const className = this.getAttribute('class') || '';
    const style = this.getAttribute('style') || '';
    const name = this.getAttribute('name') || '';
    const disabled = this.hasAttribute('disabled') ? 'disabled' : '';
    const required = this.hasAttribute('required') ? 'required' : '';
    const autofocus = this.hasAttribute('autofocus') ? 'autofocus' : '';
    const multiple = this.hasAttribute('multiple') ? 'multiple' : '';
    const size = this.getAttribute('size') || '';
    const form = this.getAttribute('form') || '';
    const dataTestid = this.getAttribute('data-testid') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        select {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 14px;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          color: #333;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          min-width: 120px;
        }
        
        select:focus {
          outline: none;
          border-color: #6200ee;
          box-shadow: 0 0 0 2px rgba(98, 0, 238, 0.2);
        }
        
        select:disabled {
          background-color: #f5f5f5;
          color: #999;
          cursor: not-allowed;
        }
      </style>
      <select 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        ${name ? `name="${name}"` : ''}
        ${disabled}
        ${required}
        ${autofocus}
        ${multiple}
        ${size ? `size="${size}"` : ''}
        ${form ? `form="${form}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      >
        <slot></slot>
      </select>
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-select', SansSelect);
}

export default SansSelect;
