/**
 * build-deno.js
 * Script to prepare the package for Deno distribution
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function buildDeno() {
  try {
    console.log('Preparing package for Deno distribution...');
    
    // Create deno directory if it doesn't exist
    const denoDir = path.join(rootDir, 'deno');
    const html5DenoDir = path.join(denoDir, 'html5');
    
    try {
      await fs.mkdir(denoDir, { recursive: true });
      await fs.mkdir(html5DenoDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
    
    // Create mod.ts (Deno's entry point)
    const modContent = `/**
 * Sans UI - Deno entry point
 * A cross-platform UI library with Svelte and Web Components for HTML5 elements
 */

// Export all HTML5 components
export * from './html5/mod.ts';

// Export version information
export const VERSION = '1.0.0';
`;
    
    await fs.writeFile(path.join(denoDir, 'mod.ts'), modContent, 'utf8');
    
    // Create HTML5 mod.ts
    const html5ModContent = `/**
 * Sans UI - HTML5 Components for Deno
 * Exports all HTML5 components for easy importing
 */

// Svelte Components
export { default as Div } from '../../src/components/html5/Div.svelte';
export { default as P } from '../../src/components/html5/P.svelte';
export { default as H1 } from '../../src/components/html5/H1.svelte';
export { default as A } from '../../src/components/html5/A.svelte';
export { default as Img } from '../../src/components/html5/Img.svelte';
export { default as Section } from '../../src/components/html5/Section.svelte';
export { default as Article } from '../../src/components/html5/Article.svelte';
export { default as Header } from '../../src/components/html5/Header.svelte';
export { default as Footer } from '../../src/components/html5/Footer.svelte';
export { default as Nav } from '../../src/components/html5/Nav.svelte';
export { default as Aside } from '../../src/components/html5/Aside.svelte';
export { default as Main } from '../../src/components/html5/Main.svelte';

// Web Components
export { default as DivComponent } from './DivComponent.ts';
export { default as PComponent } from './PComponent.ts';
export { default as H1Component } from './H1Component.ts';
export { default as AComponent } from './AComponent.ts';
export { default as ImgComponent } from './ImgComponent.ts';
export { default as SectionComponent } from './SectionComponent.ts';
export { default as ArticleComponent } from './ArticleComponent.ts';
export { default as HeaderComponent } from './HeaderComponent.ts';
export { default as FooterComponent } from './FooterComponent.ts';
export { default as NavComponent } from './NavComponent.ts';
export { default as AsideComponent } from './AsideComponent.ts';
export { default as MainComponent } from './MainComponent.ts';

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
}`;
    
    await fs.writeFile(path.join(html5DenoDir, 'mod.ts'), html5ModContent, 'utf8');
    
    // Convert JS components to TS for Deno
    const componentFiles = [
      'DivComponent',
      'PComponent',
      'H1Component',
      'AComponent',
      'ImgComponent',
      'SectionComponent',
      'ArticleComponent',
      'HeaderComponent',
      'FooterComponent',
      'NavComponent',
      'AsideComponent',
      'MainComponent'
    ];
    
    for (const component of componentFiles) {
      const jsContent = await fs.readFile(
        path.join(rootDir, 'src', 'components', 'html5', `${component}.js`),
        'utf8'
      );
      
      // Convert to TypeScript with Deno-compatible imports
      const tsContent = jsContent.replace(
        'export default',
        `// Deno-compatible version

class ${component.replace('Component', '')}Element extends HTMLElement {
  // TypeScript type definitions
  private shadowRoot: ShadowRoot;
  private ${component.toLowerCase().replace('component', '')}: HTMLElement;

  // Rest of the class implementation
}

export default`
      );
      
      await fs.writeFile(path.join(html5DenoDir, `${component}.ts`), tsContent, 'utf8');
    }
    
    // Create deno.json configuration file
    const denoJsonContent = `{
  "name": "@profullstack/sans-ui",
  "version": "1.0.0",
  "exports": {
    ".": "./mod.ts",
    "./html5": "./html5/mod.ts"
  },
  "compilerOptions": {
    "allowJs": true,
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react"
  },
  "imports": {
    "svelte": "npm:svelte@^4.0.0"
  }
}`;
    
    await fs.writeFile(path.join(denoDir, 'deno.json'), denoJsonContent, 'utf8');
    
    console.log('u2705 Deno build completed successfully!');
  } catch (error) {
    console.error('Error building for Deno:', error);
    process.exit(1);
  }
}

// Run the build process
buildDeno();
