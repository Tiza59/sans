/**
 * Sans UI Examples - Common JavaScript
 * Provides common functionality for all examples
 */

// Import Sans UI
import { 
  initialize, 
  getPlatformInfo 
} from '../../src/index.js';

// Initialize Sans UI
initialize();

/**
 * Set the active navigation link based on the current page
 */
export function setupNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath)) {
      link.classList.add('active');
    }
  });
}

/**
 * Display platform information in the specified element
 * @param {string} elementId - The ID of the element to display platform info in
 */
export function displayPlatformInfo(elementId = 'platform-output') {
  const platformInfo = getPlatformInfo();
  const element = document.getElementById(elementId);
  
  if (element) {
    element.textContent = JSON.stringify(platformInfo, null, 2);
  }
}

/**
 * Add syntax highlighting to code blocks
 * This is a simple implementation - in a real app you might use a library like Prism.js
 */
export function highlightCode() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    // Simple syntax highlighting for HTML
    const html = block.innerHTML;
    const highlighted = html
      .replace(/&lt;(\/?[a-zA-Z0-9-]+)&gt;/g, '<span style="color: #905;">&lt;$1&gt;</span>')
      .replace(/&lt;([a-zA-Z0-9-]+)(\s+)/g, '<span style="color: #905;">&lt;$1</span>$2')
      .replace(/(\s+)([a-zA-Z0-9-]+)=/g, '$1<span style="color: #07a;">$2</span>=')
      .replace(/=&quot;([^&]*)&quot;/g, '=<span style="color: #690;">&quot;$1&quot;</span>');
    
    block.innerHTML = highlighted;
  });
}

/**
 * Initialize the example page
 */
export function initExample() {
  // Set up navigation
  setupNavigation();
  
  // Display platform information
  displayPlatformInfo();
  
  // Add syntax highlighting
  highlightCode();
  
  // Log initialization
  console.log('Sans UI Example initialized');
}

// Export all common functions
export default {
  setupNavigation,
  displayPlatformInfo,
  highlightCode,
  initExample
};