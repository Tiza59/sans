/**
 * MainComponent.js
 * A reusable sans-main web component that can be used in any HTML context
 */

class SansMain extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return ['id', 'class', 'style', 'role', 'tabindex', 'aria-label', 'data-testid'];
  }
  
  connectedCallback() {
    this.render();
    this.main = this.shadowRoot.querySelector('main');
    this.main.addEventListener('click', (e) => {
      // Dispatch a custom event
      this.dispatchEvent(new CustomEvent('main-click', {
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
        
        main {
          display: block;
        }
      </style>
      <main 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        ${role ? `role="${role}"` : ''}
        ${tabindex ? `tabindex="${tabindex}"` : ''}
        ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      >
        <slot></slot>
      </main>
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-main', SansMain);
}

export default SansMain;
