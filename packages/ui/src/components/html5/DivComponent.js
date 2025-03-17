/**
 * DivComponent.js
 * A reusable sans-div web component that can be used in any HTML context
 */

class SansDiv extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return ['id', 'class', 'style', 'role', 'tabindex', 'aria-label', 'data-testid'];
  }
  
  connectedCallback() {
    this.render();
    this.div = this.shadowRoot.querySelector('div');
    this.div.addEventListener('click', (e) => {
      // Dispatch a custom event
      this.dispatchEvent(new CustomEvent('div-click', {
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
        
        div {
          display: block;
        }
      </style>
      <div 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        ${role ? `role="${role}"` : ''}
        ${tabindex ? `tabindex="${tabindex}"` : ''}
        ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      >
        <slot></slot>
      </div>
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-div', SansDiv);
}

export default SansDiv;
