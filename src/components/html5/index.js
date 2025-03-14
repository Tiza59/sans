/**
 * Sans UI - HTML5 Components
 * Exports all HTML5 components for easy importing
 */

// Svelte Components
export { default as Div } from './Div.svelte';
export { default as P } from './P.svelte';
export { default as H1 } from './H1.svelte';
export { default as A } from './A.svelte';
export { default as Img } from './Img.svelte';
export { default as Section } from './Section.svelte';
export { default as Article } from './Article.svelte';
export { default as Header } from './Header.svelte';
export { default as Footer } from './Footer.svelte';
export { default as Nav } from './Nav.svelte';
export { default as Aside } from './Aside.svelte';
export { default as Main } from './Main.svelte';

// Web Components
export { default as DivComponent } from './DivComponent.js';
export { default as PComponent } from './PComponent.js';
export { default as H1Component } from './H1Component.js';
export { default as AComponent } from './AComponent.js';
export { default as ImgComponent } from './ImgComponent.js';
export { default as SectionComponent } from './SectionComponent.js';
export { default as ArticleComponent } from './ArticleComponent.js';
export { default as HeaderComponent } from './HeaderComponent.js';
export { default as FooterComponent } from './FooterComponent.js';
export { default as NavComponent } from './NavComponent.js';
export { default as AsideComponent } from './AsideComponent.js';
export { default as MainComponent } from './MainComponent.js';

// Register all Web Components if in browser environment
export function registerAllComponents() {
  if (typeof window !== 'undefined' && window.customElements) {
    // Import and register all components
    const components = [
      { name: 'sans-div', component: DivComponent },
      { name: 'sans-p', component: PComponent },
      { name: 'sans-h1', component: H1Component },
      { name: 'sans-a', component: AComponent },
      { name: 'sans-img', component: ImgComponent },
      { name: 'sans-section', component: SectionComponent },
      { name: 'sans-article', component: ArticleComponent },
      { name: 'sans-header', component: HeaderComponent },
      { name: 'sans-footer', component: FooterComponent },
      { name: 'sans-nav', component: NavComponent },
      { name: 'sans-aside', component: AsideComponent },
      { name: 'sans-main', component: MainComponent }
    ];
    
    // Register each component if it hasn't been registered already
    components.forEach(({ name, component }) => {
      if (!customElements.get(name)) {
        customElements.define(name, component);
      }
    });
  }
}
