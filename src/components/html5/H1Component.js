/**
 * H1Component.js
 * A reusable sans-h1 web component that can be used in any HTML context
 */

class SansH1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return ['id', 'class', 'style', 'role', 'tabindex', 'aria-label', 'data-testid'];
  }
  
  connectedCallback() {
    this.render();
    this.h1 = this.shadowRoot.querySelector('h1');
    this.h1.addEventListener('click', (e) => {
      // Dispatch a custom event
      this.dispatchEvent(new CustomEvent('h1-click', {
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
    const role = this.getAttribute('role') || '';
    const tabindex = this.getAttribute('tabindex') || '';
    const ariaLabel = this.getAttribute('aria-label') || '';
    const dataTestid = this.getAttribute('data-testid') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        h1 {
          display: block;
          font-size: 2em;
          margin: 0.67em 0;
          font-weight: bold;
        }
      </style>
      <h1 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        ${role ? `role="${role}"` : ''}
        ${tabindex ? `tabindex="${tabindex}"` : ''}
        ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      >
        <slot></slot>
      </h1>
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-h1', SansH1);
}

export default SansH1;
