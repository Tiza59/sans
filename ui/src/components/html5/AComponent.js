/**
 * AComponent.js
 * A reusable sans-a web component that can be used in any HTML context
 */

class SansA extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return ['id', 'class', 'style', 'href', 'target', 'rel', 'download', 'role', 'tabindex', 'aria-label', 'data-testid'];
  }
  
  connectedCallback() {
    this.render();
    this.a = this.shadowRoot.querySelector('a');
    this.a.addEventListener('click', (e) => {
      // Dispatch a custom event
      this.dispatchEvent(new CustomEvent('a-click', {
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
    const href = this.getAttribute('href') || '#';
    const target = this.getAttribute('target') || '';
    const rel = this.getAttribute('rel') || '';
    const download = this.getAttribute('download') || '';
    const role = this.getAttribute('role') || '';
    const tabindex = this.getAttribute('tabindex') || '';
    const ariaLabel = this.getAttribute('aria-label') || '';
    const dataTestid = this.getAttribute('data-testid') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline;
        }
        
        a {
          color: #0066cc;
          text-decoration: underline;
          cursor: pointer;
        }
        
        a:hover {
          text-decoration: underline;
        }
        
        a:visited {
          color: #551a8b;
        }
      </style>
      <a 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        href="${href}"
        ${target ? `target="${target}"` : ''}
        ${rel ? `rel="${rel}"` : ''}
        ${download ? `download="${download}"` : ''}
        ${role ? `role="${role}"` : ''}
        ${tabindex ? `tabindex="${tabindex}"` : ''}
        ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      >
        <slot></slot>
      </a>
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-a', SansA);
}

export default SansA;
