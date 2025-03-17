/**
 * ComponentFactory.js
 * Factory for creating UI components that work across platforms
 */

import { createNativeUI } from '../native/NativeUIAdapter.js';
import { isDesktop, isMobile, isWeb } from '../platform/PlatformDetector.js';

// Create a singleton instance of the NativeUIAdapter
const nativeUI = createNativeUI();

/**
 * ComponentFactory class provides methods for creating UI components
 */
export class ComponentFactory {
  constructor() {
    this.components = new Map();
    this.registeredComponents = new Set();
  }

  /**
   * Create a component instance
   * @param {string} componentType - The type of component to create
   * @param {Object} props - Properties for the component
   * @returns {Object} The created component
   */
  createComponent(componentType, props = {}) {
    const element = nativeUI.createElement(componentType, props);
    return element;
  }

  /**
   * Update a component instance
   * @param {Object} component - The component to update
   * @param {Object} props - New properties for the component
   * @returns {Object} The updated component
   */
  updateComponent(component, props = {}) {
    return nativeUI.updateElement(component, props);
  }

  /**
   * Set an event handler for a component
   * @param {Object} component - The component to set the event handler on
   * @param {string} eventName - The name of the event
   * @param {Function} handler - The event handler function
   */
  setEventHandler(component, eventName, handler) {
    nativeUI.setEventHandler(component, eventName, handler);
  }

  /**
   * Apply styles to a component
   * @param {Object} component - The component to style
   * @param {Object|string} styles - The styles to apply
   */
  applyStyles(component, styles = {}) {
    nativeUI.applyStyles(component, styles);
  }

  /**
   * Register a Web Component class
   * @param {string} tagName - The custom element tag name
   * @param {class} componentClass - The component class
   */
  registerWebComponent(tagName, componentClass) {
    if (typeof window !== 'undefined' && window.customElements) {
      if (!window.customElements.get(tagName)) {
        window.customElements.define(tagName, componentClass);
        this.registeredComponents.add(tagName);
      }
    }
  }

  /**
   * Create a Svelte component wrapper for a native component
   * @param {string} componentType - The type of component
   * @returns {Function} A Svelte component factory function
   */
  createSvelteWrapper(componentType) {
    return (node, props = {}) => {
      // Create the native component
      const component = this.createComponent(componentType, props);
      
      // Append to the DOM node if in web environment
      if (isWeb() && node) {
        node.appendChild(component);
      }
      
      return {
        update: (newProps = {}) => {
          this.updateComponent(component, newProps);
        },
        destroy: () => {
          // Clean up the component
          if (isWeb() && node && component.parentNode === node) {
            node.removeChild(component);
          }
        }
      };
    };
  }

  /**
   * Get the platform-specific native UI adapter
   * @returns {Object} The native UI adapter
   */
  getNativeUI() {
    return nativeUI;
  }

  /**
   * Get information about the current platform
   * @returns {Object} Platform information
   */
  getPlatformInfo() {
    return {
      isDesktop: isDesktop(),
      isMobile: isMobile(),
      isWeb: isWeb()
    };
  }
}

// Create a singleton instance of the ComponentFactory
const componentFactory = new ComponentFactory();

/**
 * Create a button component
 * @param {Object} props - Button properties
 * @returns {Object} The created button component
 */
export function createButton(props = {}) {
  return componentFactory.createComponent('button', props);
}

/**
 * Create a label component
 * @param {Object} props - Label properties
 * @returns {Object} The created label component
 */
export function createLabel(props = {}) {
  return componentFactory.createComponent('label', props);
}

/**
 * Create a text input component
 * @param {Object} props - Text input properties
 * @returns {Object} The created text input component
 */
export function createTextInput(props = {}) {
  return componentFactory.createComponent('textbox', props);
}

/**
 * Create an image component
 * @param {Object} props - Image properties
 * @returns {Object} The created image component
 */
export function createImage(props = {}) {
  return componentFactory.createComponent('image', props);
}

/**
 * Create a list component
 * @param {Object} props - List properties
 * @returns {Object} The created list component
 */
export function createList(props = {}) {
  return componentFactory.createComponent('list', props);
}

/**
 * Create a container component
 * @param {Object} props - Container properties
 * @returns {Object} The created container component
 */
export function createContainer(props = {}) {
  return componentFactory.createComponent('container', props);
}

/**
 * Register a custom Web Component
 * @param {string} tagName - The custom element tag name
 * @param {class} componentClass - The component class
 */
export function registerComponent(tagName, componentClass) {
  componentFactory.registerWebComponent(tagName, componentClass);
}

/**
 * Create a Svelte action for a component type
 * @param {string} componentType - The type of component
 * @returns {Function} A Svelte action function
 */
export function createSvelteAction(componentType) {
  return componentFactory.createSvelteWrapper(componentType);
}

/**
 * Get the native UI adapter
 * @returns {Object} The native UI adapter
 */
export function getNativeUI() {
  return componentFactory.getNativeUI();
}

/**
 * Get information about the current platform
 * @returns {Object} Platform information
 */
export function getPlatformInfo() {
  return componentFactory.getPlatformInfo();
}

export default {
  createButton,
  createLabel,
  createTextInput,
  createImage,
  createList,
  createContainer,
  registerComponent,
  createSvelteAction,
  getNativeUI,
  getPlatformInfo
};
