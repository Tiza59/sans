/**
 * LabelComponent.js
 * A reusable sans-label web component that can be used in any HTML context
 */

class SansLabel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return ['id', 'class', 'style', 'for', 'form', 'data-testid'];
  }
  
  connectedCallback() {
    this.render();
    this.label = this.shadowRoot.querySelector('label');
    
    // Add event listeners
    this.label.addEventListener('click', (e) => {
      // Dispatch a custom event
      this.dispatchEvent(new CustomEvent('label-click', {
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
    const forAttr = this.getAttribute('for') || '';
    const form = this.getAttribute('form') || '';
    const dataTestid = this.getAttribute('data-testid') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        label {
          display: inline-block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 14px;
          color: inherit;
          cursor: pointer;
        }
      </style>
      <label 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        ${forAttr ? `for="${forAttr}"` : ''}
        ${form ? `form="${form}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      >
        <slot></slot>
      </label>
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-label', SansLabel);
}

export default SansLabel;
