/**
 * Sans UI - HTML5 Components
 * Exports all HTML5 components for easy importing
 */

import { registerComponent } from '../../lib/components/ComponentFactory.js';
import ButtonComponent from './ButtonComponent.js';

// Svelte Components
export { default as Button } from './Button.svelte';
// Add other Svelte components as they are implemented
// export { default as P } from './P.svelte';
// export { default as H1 } from './H1.svelte';
// export { default as A } from './A.svelte';
// export { default as Img } from './Img.svelte';
// export { default as Section } from './Section.svelte';
// export { default as Article } from './Article.svelte';
// export { default as Header } from './Header.svelte';
// export { default as Footer } from './Footer.svelte';
// export { default as Nav } from './Nav.svelte';
// export { default as Aside } from './Aside.svelte';
// export { default as Main } from './Main.svelte';

// Web Components
export { default as ButtonComponent } from './ButtonComponent.js';
// Add other Web Components as they are implemented
// export { default as PComponent } from './PComponent.js';
// export { default as H1Component } from './H1Component.js';
// export { default as AComponent } from './AComponent.js';
// export { default as ImgComponent } from './ImgComponent.js';
// export { default as SectionComponent } from './SectionComponent.js';
// export { default as ArticleComponent } from './ArticleComponent.js';
// export { default as HeaderComponent } from './HeaderComponent.js';
// export { default as FooterComponent } from './FooterComponent.js';
// export { default as NavComponent } from './NavComponent.js';
// export { default as AsideComponent } from './AsideComponent.js';
// export { default as MainComponent } from './MainComponent.js';

// Form-related Components
// export { default as FormComponent } from './FormComponent.js';
// export { default as LabelComponent } from './LabelComponent.js';
// export { default as InputComponent } from './InputComponent.js';
// export { default as SelectComponent } from './SelectComponent.js';
// export { default as OptionComponent } from './OptionComponent.js';
// export { default as TextareaComponent } from './TextareaComponent.js';

// Component mapping for registration
const COMPONENTS = [
  { name: 'sans-button', component: ButtonComponent },
  // Add other components as they are implemented
];

/**
 * Register all Web Components if in browser environment
 */
export function registerAllComponents() {
  if (typeof window !== 'undefined' && window.customElements) {
    // Register each component
    COMPONENTS.forEach(({ name, component }) => {
      registerComponent(name, component);
    });
  }
}

// Auto-register components if in a browser environment
if (typeof window !== 'undefined') {
  registerAllComponents();
}
