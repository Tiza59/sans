/**
 * ButtonComponent.js
 * A reusable sans-button web component that can be used in any HTML context
 * This version uses the native UI adapter for cross-platform rendering
 */

import { createButton, getNativeUI } from '../../lib/components/ComponentFactory.js';

class SansButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._disabled = false;
    this._type = 'default';
    this._size = 'medium';
    this._fullWidth = false;
    this._nativeButton = null;
    this._nativeUI = getNativeUI();
  }
  
  static get observedAttributes() {
    return ['disabled', 'type', 'size', 'full-width'];
  }
  
  connectedCallback() {
    // Create the native button
    this._nativeButton = createButton({
      label: this.textContent || '',
      type: this._type,
      size: this._size,
      disabled: this._disabled,
      fullWidth: this._fullWidth
    });
    
    // Set up event handler
    this._nativeUI.setEventHandler(this._nativeButton, 'click', (e) => {
      if (!this._disabled) {
        // Dispatch a custom event
        this.dispatchEvent(new CustomEvent('button-click', {
          bubbles: true,
          composed: true,
          detail: { source: this, originalEvent: e }
        }));
      }
    });
    
    // Create a container for the button in the shadow DOM
    const container = document.createElement('div');
    container.className = 'sans-button-container';
    
    // Add styles to the shadow DOM
    const style = document.createElement('style');
    style.textContent = this._getStyles();
    
    // Append elements to shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
    
    // If we're in a web environment, add the native button to the container
    if (typeof document !== 'undefined' && this._nativeButton) {
      container.appendChild(this._nativeButton);
    }
    
    // Observe slot content changes
    this._observeSlotContent();
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'disabled':
        this._disabled = newValue !== null;
        break;
      case 'type':
        this._type = newValue || 'default';
        break;
      case 'size':
        this._size = newValue || 'medium';
        break;
      case 'full-width':
        this._fullWidth = newValue !== null;
        break;
    }
    
    // Update the native button if it exists
    if (this._nativeButton) {
      this._nativeUI.updateElement(this._nativeButton, {
        type: this._type,
        size: this._size,
        disabled: this._disabled,
        fullWidth: this._fullWidth
      });
    }
  }
  
  disconnectedCallback() {
    // Clean up
    if (this._nativeButton) {
      // Remove the native button from its container
      const container = this.shadowRoot.querySelector('.sans-button-container');
      if (container && this._nativeButton.parentNode === container) {
        container.removeChild(this._nativeButton);
      }
      
      this._nativeButton = null;
    }
  }
  
  _observeSlotContent() {
    // Create a MutationObserver to watch for content changes
    const observer = new MutationObserver(() => {
      this._updateButtonText();
    });
    
    // Start observing
    observer.observe(this, { 
      childList: true, 
      characterData: true, 
      subtree: true 
    });
    
    // Initial update
    this._updateButtonText();
  }
  
  _updateButtonText() {
    if (this._nativeButton) {
      const text = this.textContent || '';
      this._nativeUI.updateElement(this._nativeButton, { 
        label: text.trim() 
      });
    }
  }
  
  _getStyles() {
    return `
      :host {
        display: inline-block;
        font-family: inherit;
      }
      
      :host([full-width]) {
        display: block;
        width: 100%;
      }
      
      .sans-button-container {
        display: inline-block;
        width: 100%;
      }
      
      /* These styles will apply to the web fallback button */
      .sans-button-container button {
        font-family: inherit;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s, transform 0.1s;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      
      .sans-button-container button:hover:not(:disabled) {
        filter: brightness(1.1);
      }
      
      .sans-button-container button:active:not(:disabled) {
        transform: scale(0.98);
      }
      
      .sans-button-container button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      /* Types */
      .sans-button-container button.default {
        background-color: #f0f0f0;
        color: #333;
      }
      
      .sans-button-container button.primary {
        background-color: #4a56e2;
        color: white;
      }
      
      .sans-button-container button.secondary {
        background-color: #e2e8f0;
        color: #1a202c;
      }
      
      .sans-button-container button.danger {
        background-color: #e53e3e;
        color: white;
      }
      
      /* Sizes */
      .sans-button-container button.small {
        padding: 6px 12px;
        font-size: 0.875rem;
      }
      
      .sans-button-container button.medium {
        padding: 8px 16px;
        font-size: 1rem;
      }
      
      .sans-button-container button.large {
        padding: 12px 24px;
        font-size: 1.125rem;
      }
    `;
  }
  
  // Getters and setters for properties
  get disabled() {
    return this._disabled;
  }
  
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
  
  get type() {
    return this._type;
  }
  
  set type(value) {
    this.setAttribute('type', value);
  }
  
  get size() {
    return this._size;
  }
  
  set size(value) {
    this.setAttribute('size', value);
  }
  
  get fullWidth() {
    return this._fullWidth;
  }
  
  set fullWidth(value) {
    if (value) {
      this.setAttribute('full-width', '');
    } else {
      this.removeAttribute('full-width');
    }
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-button', SansButton);
}

export default SansButton;
