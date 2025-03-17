/**
 * TextareaComponent.js
 * A reusable sans-textarea web component that can be used in any HTML context
 */

class SansTextarea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return [
      'id', 'class', 'style', 'name', 'value', 'placeholder', 
      'disabled', 'readonly', 'required', 'autofocus', 'autocomplete',
      'rows', 'cols', 'minlength', 'maxlength', 'wrap', 'form',
      'data-testid'
    ];
  }
  
  connectedCallback() {
    this.render();
    this.textarea = this.shadowRoot.querySelector('textarea');
    
    // Add event listeners
    this.textarea.addEventListener('input', (e) => {
      // Update the value attribute to keep it in sync
      this.setAttribute('value', e.target.value);
      
      // Dispatch a custom event
      this.dispatchEvent(new CustomEvent('textarea-change', {
        bubbles: true,
        composed: true,
        detail: { 
          source: this,
          value: e.target.value
        }
      }));
    });
    
    this.textarea.addEventListener('focus', (e) => {
      this.dispatchEvent(new CustomEvent('textarea-focus', {
        bubbles: true,
        composed: true,
        detail: { source: this }
      }));
    });
    
    this.textarea.addEventListener('blur', (e) => {
      this.dispatchEvent(new CustomEvent('textarea-blur', {
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
      
      // Update the textarea value if it exists
      if (this.textarea && name === 'value') {
        this.textarea.value = newValue || '';
      }
    }
  }
  
  render() {
    const id = this.getAttribute('id') || '';
    const className = this.getAttribute('class') || '';
    const style = this.getAttribute('style') || '';
    const name = this.getAttribute('name') || '';
    const value = this.getAttribute('value') || '';
    const placeholder = this.getAttribute('placeholder') || '';
    const disabled = this.hasAttribute('disabled') ? 'disabled' : '';
    const readonly = this.hasAttribute('readonly') ? 'readonly' : '';
    const required = this.hasAttribute('required') ? 'required' : '';
    const autofocus = this.hasAttribute('autofocus') ? 'autofocus' : '';
    const autocomplete = this.getAttribute('autocomplete') || '';
    const rows = this.getAttribute('rows') || '';
    const cols = this.getAttribute('cols') || '';
    const minlength = this.getAttribute('minlength') || '';
    const maxlength = this.getAttribute('maxlength') || '';
    const wrap = this.getAttribute('wrap') || '';
    const form = this.getAttribute('form') || '';
    const dataTestid = this.getAttribute('data-testid') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        textarea {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 14px;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          color: #333;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          resize: vertical;
          min-height: 60px;
        }
        
        textarea:focus {
          outline: none;
          border-color: #6200ee;
          box-shadow: 0 0 0 2px rgba(98, 0, 238, 0.2);
        }
        
        textarea:disabled {
          background-color: #f5f5f5;
          color: #999;
          cursor: not-allowed;
        }
      </style>
      <textarea 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        ${name ? `name="${name}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${disabled}
        ${readonly}
        ${required}
        ${autofocus}
        ${autocomplete ? `autocomplete="${autocomplete}"` : ''}
        ${rows ? `rows="${rows}"` : ''}
        ${cols ? `cols="${cols}"` : ''}
        ${minlength ? `minlength="${minlength}"` : ''}
        ${maxlength ? `maxlength="${maxlength}"` : ''}
        ${wrap ? `wrap="${wrap}"` : ''}
        ${form ? `form="${form}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      >${value}</textarea>
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-textarea', SansTextarea);
}

export default SansTextarea;
