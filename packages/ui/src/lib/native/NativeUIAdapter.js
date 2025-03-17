/**
 * NativeUIAdapter.js
 * Core adapter for native UI rendering across platforms
 */

import { isDesktop, isMobile, isWeb } from '../platform/PlatformDetector.js';
import DesktopAdapter from './desktop/DesktopAdapter.js';
import MobileAdapter from './mobile/MobileAdapter.js';
import WebAdapter from './web/WebAdapter.js';

/**
 * NativeUIAdapter class provides a unified interface for different native UI implementations
 */
export class NativeUIAdapter {
  constructor(options = {}) {
    this.options = options;
    this.adapter = null;
    this._initialize();
  }

  /**
   * Initialize the appropriate adapter based on the platform
   * @private
   */
  _initialize() {
    if (isDesktop()) {
      // Desktop implementation using NodeGUI
      this.adapter = new DesktopAdapter(this.options);
    } else if (isMobile()) {
      // Mobile implementation using NativeScript
      this.adapter = new MobileAdapter(this.options);
    } else {
      // Web implementation as fallback
      this.adapter = new WebAdapter(this.options);
    }
  }

  /**
   * Create a native UI element
   * @param {string} elementType - The type of element to create (e.g., 'button', 'textbox')
   * @param {Object} props - Properties for the element
   * @returns {Object} The created native element
   */
  createElement(elementType, props = {}) {
    if (!this.adapter) {
      throw new Error('NativeUIAdapter not initialized');
    }
    return this.adapter.createElement(elementType, props);
  }

  /**
   * Update an existing native UI element
   * @param {Object} element - The element to update
   * @param {Object} props - New properties for the element
   * @returns {Object} The updated element
   */
  updateElement(element, props = {}) {
    if (!this.adapter) {
      throw new Error('NativeUIAdapter not initialized');
    }
    return this.adapter.updateElement(element, props);
  }

  /**
   * Append a child element to a parent element
   * @param {Object} parent - The parent element
   * @param {Object} child - The child element to append
   */
  appendChild(parent, child) {
    if (!this.adapter) {
      throw new Error('NativeUIAdapter not initialized');
    }
    return this.adapter.appendChild(parent, child);
  }

  /**
   * Remove a child element from a parent element
   * @param {Object} parent - The parent element
   * @param {Object} child - The child element to remove
   */
  removeChild(parent, child) {
    if (!this.adapter) {
      throw new Error('NativeUIAdapter not initialized');
    }
    return this.adapter.removeChild(parent, child);
  }

  /**
   * Set an event handler for a native UI element
   * @param {Object} element - The element to set the event handler on
   * @param {string} eventName - The name of the event
   * @param {Function} handler - The event handler function
   */
  setEventHandler(element, eventName, handler) {
    if (!this.adapter) {
      throw new Error('NativeUIAdapter not initialized');
    }
    return this.adapter.setEventHandler(element, eventName, handler);
  }

  /**
   * Apply styles to a native UI element
   * @param {Object} element - The element to style
   * @param {Object} styles - The styles to apply
   */
  applyStyles(element, styles = {}) {
    if (!this.adapter) {
      throw new Error('NativeUIAdapter not initialized');
    }
    return this.adapter.applyStyles(element, styles);
  }

  /**
   * Get the platform-specific adapter
   * @returns {Object} The platform adapter
   */
  getPlatformAdapter() {
    return this.adapter;
  }

  /**
   * Clean up resources when the adapter is no longer needed
   */
  destroy() {
    if (this.adapter && typeof this.adapter.destroy === 'function') {
      this.adapter.destroy();
    }
    this.adapter = null;
  }
}

/**
 * Factory function to create a NativeUIAdapter
 * @param {Object} options - Options for the adapter
 * @returns {NativeUIAdapter} - A new NativeUIAdapter instance
 */
export function createNativeUI(options = {}) {
  return new NativeUIAdapter(options);
}

export default NativeUIAdapter;