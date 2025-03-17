/**
 * FormComponent.js
 * A reusable sans-form web component that can be used in any HTML context
 */

class SansForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return ['id', 'class', 'style', 'action', 'method', 'enctype', 'name', 'target', 'novalidate', 'autocomplete', 'data-testid'];
  }
  
  connectedCallback() {
    this.render();
    this.form = this.shadowRoot.querySelector('form');
    
    // Add event listeners
    this.form.addEventListener('submit', (e) => {
      // Prevent default form submission
      e.preventDefault();
      
      // Dispatch a custom event
      this.dispatchEvent(new CustomEvent('form-submit', {
        bubbles: true,
        composed: true,
        detail: { 
          source: this,
          formData: new FormData(this.form)
        }
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
    const action = this.getAttribute('action') || '';
    const method = this.getAttribute('method') || 'get';
    const enctype = this.getAttribute('enctype') || '';
    const name = this.getAttribute('name') || '';
    const target = this.getAttribute('target') || '';
    const novalidate = this.hasAttribute('novalidate') ? 'novalidate' : '';
    const autocomplete = this.getAttribute('autocomplete') || '';
    const dataTestid = this.getAttribute('data-testid') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        form {
          display: block;
        }
      </style>
      <form 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        ${action ? `action="${action}"` : ''}
        ${method ? `method="${method}"` : ''}
        ${enctype ? `enctype="${enctype}"` : ''}
        ${name ? `name="${name}"` : ''}
        ${target ? `target="${target}"` : ''}
        ${novalidate}
        ${autocomplete ? `autocomplete="${autocomplete}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      >
        <slot></slot>
      </form>
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-form', SansForm);
}

export default SansForm;
