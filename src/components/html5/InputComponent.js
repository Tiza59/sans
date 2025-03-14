/**
 * InputComponent.js
 * A reusable sans-input web component that can be used in any HTML context
 */

class SansInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return [
      'id', 'class', 'style', 'type', 'name', 'value', 'placeholder', 
      'disabled', 'readonly', 'required', 'autofocus', 'autocomplete',
      'min', 'max', 'step', 'pattern', 'minlength', 'maxlength',
      'checked', 'multiple', 'form', 'formaction', 'formmethod',
      'formnovalidate', 'formtarget', 'data-testid'
    ];
  }
  
  connectedCallback() {
    this.render();
    this.input = this.shadowRoot.querySelector('input');
    
    // Add event listeners
    this.input.addEventListener('input', (e) => {
      // Update the value attribute to keep it in sync
      if (this.getAttribute('type') !== 'file') {
        this.setAttribute('value', e.target.value);
      }
      
      // Dispatch a custom event
      this.dispatchEvent(new CustomEvent('input-change', {
        bubbles: true,
        composed: true,
        detail: { 
          source: this,
          value: e.target.value,
          files: e.target.files
        }
      }));
    });
    
    this.input.addEventListener('focus', (e) => {
      this.dispatchEvent(new CustomEvent('input-focus', {
        bubbles: true,
        composed: true,
        detail: { source: this }
      }));
    });
    
    this.input.addEventListener('blur', (e) => {
      this.dispatchEvent(new CustomEvent('input-blur', {
        bubbles: true,
        composed: true,
        detail: { source: this }
      }));
    });
    
    // For checkbox and radio buttons
    if (this.getAttribute('type') === 'checkbox' || this.getAttribute('type') === 'radio') {
      this.input.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.setAttribute('checked', '');
        } else {
          this.removeAttribute('checked');
        }
        
        this.dispatchEvent(new CustomEvent('input-change', {
          bubbles: true,
          composed: true,
          detail: { 
            source: this,
            checked: e.target.checked
          }
        }));
      });
    }
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    if (this.shadowRoot) {
      this.render();
      
      // Update the input value if it exists
      if (this.input && name === 'value' && this.getAttribute('type') !== 'file') {
        this.input.value = newValue || '';
      }
      
      // Update checked state for checkbox and radio
      if (this.input && name === 'checked') {
        this.input.checked = this.hasAttribute('checked');
      }
    }
  }
  
  render() {
    const id = this.getAttribute('id') || '';
    const className = this.getAttribute('class') || '';
    const style = this.getAttribute('style') || '';
    const type = this.getAttribute('type') || 'text';
    const name = this.getAttribute('name') || '';
    const value = this.getAttribute('value') || '';
    const placeholder = this.getAttribute('placeholder') || '';
    const disabled = this.hasAttribute('disabled') ? 'disabled' : '';
    const readonly = this.hasAttribute('readonly') ? 'readonly' : '';
    const required = this.hasAttribute('required') ? 'required' : '';
    const autofocus = this.hasAttribute('autofocus') ? 'autofocus' : '';
    const autocomplete = this.getAttribute('autocomplete') || '';
    const min = this.getAttribute('min') || '';
    const max = this.getAttribute('max') || '';
    const step = this.getAttribute('step') || '';
    const pattern = this.getAttribute('pattern') || '';
    const minlength = this.getAttribute('minlength') || '';
    const maxlength = this.getAttribute('maxlength') || '';
    const checked = this.hasAttribute('checked') ? 'checked' : '';
    const multiple = this.hasAttribute('multiple') ? 'multiple' : '';
    const form = this.getAttribute('form') || '';
    const formaction = this.getAttribute('formaction') || '';
    const formmethod = this.getAttribute('formmethod') || '';
    const formnovalidate = this.hasAttribute('formnovalidate') ? 'formnovalidate' : '';
    const formtarget = this.getAttribute('formtarget') || '';
    const dataTestid = this.getAttribute('data-testid') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        input {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 14px;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          color: #333;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        
        input:focus {
          outline: none;
          border-color: #6200ee;
          box-shadow: 0 0 0 2px rgba(98, 0, 238, 0.2);
        }
        
        input:disabled {
          background-color: #f5f5f5;
          color: #999;
          cursor: not-allowed;
        }
        
        input[type="checkbox"], input[type="radio"] {
          width: 16px;
          height: 16px;
          margin: 0;
          vertical-align: middle;
        }
      </style>
      <input 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        ${type ? `type="${type}"` : ''}
        ${name ? `name="${name}"` : ''}
        ${value && type !== 'file' ? `value="${value}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${disabled}
        ${readonly}
        ${required}
        ${autofocus}
        ${autocomplete ? `autocomplete="${autocomplete}"` : ''}
        ${min ? `min="${min}"` : ''}
        ${max ? `max="${max}"` : ''}
        ${step ? `step="${step}"` : ''}
        ${pattern ? `pattern="${pattern}"` : ''}
        ${minlength ? `minlength="${minlength}"` : ''}
        ${maxlength ? `maxlength="${maxlength}"` : ''}
        ${checked}
        ${multiple}
        ${form ? `form="${form}"` : ''}
        ${formaction ? `formaction="${formaction}"` : ''}
        ${formmethod ? `formmethod="${formmethod}"` : ''}
        ${formnovalidate}
        ${formtarget ? `formtarget="${formtarget}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      >
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-input', SansInput);
}

export default SansInput;
