/**
 * ImgComponent.js
 * A reusable sans-img web component that can be used in any HTML context
 */

class SansImg extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return ['id', 'class', 'style', 'src', 'alt', 'width', 'height', 'loading', 'decoding', 'role', 'aria-label', 'data-testid'];
  }
  
  connectedCallback() {
    this.render();
    this.img = this.shadowRoot.querySelector('img');
    this.img.addEventListener('click', (e) => {
      // Dispatch a custom event
      this.dispatchEvent(new CustomEvent('img-click', {
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
    const src = this.getAttribute('src') || '';
    const alt = this.getAttribute('alt') || '';
    const width = this.getAttribute('width') || '';
    const height = this.getAttribute('height') || '';
    const loading = this.getAttribute('loading') || '';
    const decoding = this.getAttribute('decoding') || '';
    const role = this.getAttribute('role') || '';
    const ariaLabel = this.getAttribute('aria-label') || '';
    const dataTestid = this.getAttribute('data-testid') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        img {
          display: block;
          max-width: 100%;
        }
      </style>
      <img 
        ${id ? `id="${id}"` : ''}
        ${className ? `class="${className}"` : ''}
        ${style ? `style="${style}"` : ''}
        ${src ? `src="${src}"` : ''}
        ${alt ? `alt="${alt}"` : ''}
        ${width ? `width="${width}"` : ''}
        ${height ? `height="${height}"` : ''}
        ${loading ? `loading="${loading}"` : ''}
        ${decoding ? `decoding="${decoding}"` : ''}
        ${role ? `role="${role}"` : ''}
        ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
        ${dataTestid ? `data-testid="${dataTestid}"` : ''}
      />
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-img', SansImg);
}

export default SansImg;
