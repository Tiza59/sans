/**
 * Sans UI - Main entry point
 * A cross-platform UI library with Svelte and Web Components for native UI rendering
 */

// Export all HTML5 components
export * from './components/html5/index.js';

// Export platform detection utilities
export { 
  PLATFORM, 
  OS, 
  detectPlatform, 
  detectOS, 
  isDesktop, 
  isMobile, 
  isWeb, 
  getPlatformInfo 
} from './lib/platform/PlatformDetector.js';

// Export component factory functions
export {
  createButton,
  createLabel,
  createTextInput,
  createImage,
  createList,
  createContainer,
  registerComponent,
  createSvelteAction,
  getNativeUI,
  getPlatformInfo as getComponentPlatformInfo
} from './lib/components/ComponentFactory.js';

// Export native UI adapter
export { createNativeUI, NativeUIAdapter } from './lib/native/NativeUIAdapter.js';

// Export version information
export const VERSION = '1.0.0';

/**
 * Initialize the Sans UI library
 * @param {Object} options - Initialization options
 */
export function initialize(options = {}) {
  // Register all Web Components
  if (typeof window !== 'undefined' && window.customElements) {
    // Import and register all components
    import('./components/html5/index.js').then(module => {
      if (typeof module.registerAllComponents === 'function') {
        module.registerAllComponents();
      }
    }).catch(err => {
      console.error('Error registering Sans UI components:', err);
    });
  }
  
  // Return the initialized state
  return {
    version: VERSION,
    initialized: true,
    options
  };
}

// Auto-initialize if in a browser environment
if (typeof window !== 'undefined') {
  initialize();
}

export default {
  VERSION,
  initialize
};
