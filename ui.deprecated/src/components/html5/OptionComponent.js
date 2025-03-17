/**
 * OptionComponent.js
 * A reusable sans-option web component that can be used within sans-select
 */

class SansOption extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return ['id', 'class', 'style', 'value', 'disabled', 'selected', 'label', 'data-testid'];
  }
  
  connectedCallback() {
    this.render();
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
    const value = this.getAttribute('value') || '';
    const disabled = this.hasAttribute('disabled') ? 'disabled' : '';
    const selected = this.hasAttribute('selected') ? 'selected' : '';
    const label = this.getAttribute('label') || '';
    const dataTestid = this.getAttribute('data-testid') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
      </style>
      <option 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${disabled}
        ${selected}
        ${label ? `label="${label}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      >
        <slot></slot>
      </option>
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-option', SansOption);
}

export default SansOption;
