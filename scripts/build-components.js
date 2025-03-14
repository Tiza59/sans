/**
 * build-components.js
 * Script to build and bundle web components for distribution
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function buildComponents() {
  try {
    console.log('Building web components for distribution...');
    
    // Create dist directory if it doesn't exist
    const distDir = path.join(rootDir, 'dist');
    const html5DistDir = path.join(distDir, 'html5');
    
    try {
      await fs.mkdir(distDir, { recursive: true });
      await fs.mkdir(html5DistDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
    
    // Build the main entry file
    await buildEntryFile();
    
    // Build the HTML5 components
    await buildHTML5Components();
    
    console.log('✅ Components built successfully!');
  } catch (error) {
    console.error('Error building components:', error);
    process.exit(1);
  }
}

async function buildEntryFile() {
  // Create the CJS version of the main entry file
  const cjsContent = `'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const html5 = require('./html5/index.cjs');

// Re-export all HTML5 components
Object.keys(html5).forEach(key => {
  exports[key] = html5[key];
});

// Export version information
exports.VERSION = '1.0.0';
`;
  
  await fs.writeFile(path.join(rootDir, 'dist', 'index.cjs'), cjsContent, 'utf8');
  
  // Copy the ESM version
  await fs.copyFile(
    path.join(rootDir, 'src', 'index.js'),
    path.join(rootDir, 'dist', 'index.js')
  );
}

async function buildHTML5Components() {
  // Create the CJS version of the HTML5 index file
  const html5CjsContent = `'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Svelte Components (pre-compiled to JS)
const Div = require('../svelte-components/Div.js');
const P = require('../svelte-components/P.js');
const H1 = require('../svelte-components/H1.js');
const A = require('../svelte-components/A.js');
const Img = require('../svelte-components/Img.js');
const Section = require('../svelte-components/Section.js');
const Article = require('../svelte-components/Article.js');
const Header = require('../svelte-components/Header.js');
const Footer = require('../svelte-components/Footer.js');
const Nav = require('../svelte-components/Nav.js');
const Aside = require('../svelte-components/Aside.js');
const Main = require('../svelte-components/Main.js');

// Web Components
const DivComponent = require('./DivComponent.js');
const PComponent = require('./PComponent.js');
const H1Component = require('./H1Component.js');
const AComponent = require('./AComponent.js');
const ImgComponent = require('./ImgComponent.js');
const SectionComponent = require('./SectionComponent.js');
const ArticleComponent = require('./ArticleComponent.js');
const HeaderComponent = require('./HeaderComponent.js');
const FooterComponent = require('./FooterComponent.js');
const NavComponent = require('./NavComponent.js');
const AsideComponent = require('./AsideComponent.js');
const MainComponent = require('./MainComponent.js');

// Export Svelte components
exports.Div = Div;
exports.P = P;
exports.H1 = H1;
exports.A = A;
exports.Img = Img;
exports.Section = Section;
exports.Article = Article;
exports.Header = Header;
exports.Footer = Footer;
exports.Nav = Nav;
exports.Aside = Aside;
exports.Main = Main;

// Export Web Components
exports.DivComponent = DivComponent;
exports.PComponent = PComponent;
exports.H1Component = H1Component;
exports.AComponent = AComponent;
exports.ImgComponent = ImgComponent;
exports.SectionComponent = SectionComponent;
exports.ArticleComponent = ArticleComponent;
exports.HeaderComponent = HeaderComponent;
exports.FooterComponent = FooterComponent;
exports.NavComponent = NavComponent;
exports.AsideComponent = AsideComponent;
exports.MainComponent = MainComponent;

// Register all Web Components function
exports.registerAllComponents = function registerAllComponents() {
  if (typeof window !== 'undefined' && window.customElements) {
    // Define all components
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
};
`;
  
  await fs.writeFile(path.join(rootDir, 'dist', 'html5', 'index.cjs'), html5CjsContent, 'utf8');
  
  // Copy the ESM version
  await fs.copyFile(
    path.join(rootDir, 'src', 'components', 'html5', 'index.js'),
    path.join(rootDir, 'dist', 'html5', 'index.js')
  );
  
  // Copy all the web component JS files
  const componentFiles = [
    'DivComponent.js',
    'PComponent.js',
    'H1Component.js',
    'AComponent.js',
    'ImgComponent.js',
    'SectionComponent.js',
    'ArticleComponent.js',
    'HeaderComponent.js',
    'FooterComponent.js',
    'NavComponent.js',
    'AsideComponent.js',
    'MainComponent.js'
  ];
  
  for (const file of componentFiles) {
    await fs.copyFile(
      path.join(rootDir, 'src', 'components', 'html5', file),
      path.join(rootDir, 'dist', 'html5', file)
    );
  }
  
  // Compile Svelte components to JS
  // Note: In a real implementation, you would use @sveltejs/package or svelte-kit package
  // This is a simplified version for demonstration
  console.log('Compiling Svelte components...');
  try {
    execSync('npx @sveltejs/package build', { cwd: rootDir, stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to compile Svelte components:', error);
    throw error;
  }
}

// Run the build process
buildComponents();
