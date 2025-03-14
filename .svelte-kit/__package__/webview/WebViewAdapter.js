/**
 * WebViewAdapter.js
 * Abstraction layer for different WebView implementations
 */

// Import the webviewjs implementation
import WebViewJS from '@webviewjs/webview';
// Import the WKWebView bridge
import { isNativeWKWebView, wkWebViewBridge } from './WKWebViewBridge';
// Import the Qt WebEngine bridge
import { isQtWebEngine, qtWebEngineBridge } from './QtWebEngineBridge';

// Platform detection
const isIOS = () => {
  if (typeof navigator !== 'undefined') {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  return false;
};

const isQt = () => {
  if (typeof navigator !== 'undefined') {
    // Check for Qt environment
    // This can be enhanced with more specific detection if needed
    return isQtWebEngine() || /Qt/.test(navigator.userAgent);
  }
  return false;
};

/**
 * WebViewAdapter class provides a unified interface for different WebView implementations
 */
export class WebViewAdapter {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.webview = null;
    this.element = null;
  }

  /**
   * Initialize the WebView in the provided element
   * @param {HTMLElement} element - The DOM element to attach the WebView to
   */
  initialize(element) {
    this.element = element;
    
    if (isIOS()) {
      // iOS implementation using WKWebView
      this._initializeWKWebView();
    } else if (isQt()) {
      // Qt implementation using Qt WebEngine
      this._initializeQtWebEngine();
    } else {
      // Default implementation using webviewjs
      this._initializeWebViewJS();
    }
    
    return this;
  }

  /**
   * Initialize WebViewJS implementation
   * @private
   */
  _initializeWebViewJS() {
    this.webview = new WebViewJS(this.url, this.options);
    // Apply the webview to the element
    if (this.element) {
      this.element.appendChild(this.webview.element);
    }
  }

  /**
   * Initialize WKWebView implementation for iOS
   * @private
   */
  _initializeWKWebView() {
    // Check if we're running in a native WKWebView environment
    if (isNativeWKWebView()) {
      // We're running in a native iOS app with WKWebView
      // Use the native bridge for communication
      
      // Create a placeholder element to represent the WebView
      const placeholder = document.createElement('div');
      placeholder.style.width = '100%';
      placeholder.style.height = '100%';
      placeholder.style.border = 'none';
      placeholder.style.backgroundColor = '#f8f8f8';
      
      if (this.element) {
        this.element.appendChild(placeholder);
      }
      
      // Navigate to the initial URL
      wkWebViewBridge.navigate(this.url).catch(e => {
        console.error('Error navigating in native WKWebView:', e);
      });
      
      // Create the webview interface that uses the native bridge
      this.webview = {
        element: placeholder,
        navigate: (url) => wkWebViewBridge.navigate(url),
        reload: () => wkWebViewBridge.reload(),
        executeJavaScript: (code) => wkWebViewBridge.executeJavaScript(code),
        destroy: () => {
          if (placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
          }
        }
      };
    } else {
      // Create an iframe as a fallback when running in a browser
      // This simulates a WKWebView when not running in a native iOS app
      const iframe = document.createElement('iframe');
      iframe.src = this.url;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      
      if (this.element) {
        this.element.appendChild(iframe);
      }
      
      this.webview = {
        element: iframe,
        navigate: (url) => { iframe.src = url; },
        reload: () => { iframe.src = iframe.src; },
        executeJavaScript: (code) => {
          try {
            return iframe.contentWindow.eval(code);
          } catch (e) {
            console.error('Error executing JavaScript in WKWebView:', e);
            return null;
          }
        },
        destroy: () => {
          if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
        }
      };
    }
  }

  /**
   * Initialize Qt WebEngine implementation
   * @private
   */
  _initializeQtWebEngine() {
    // Check if we're running in a native Qt WebEngine environment
    if (isQtWebEngine()) {
      // We're running in a native app with Qt WebEngine
      // Use the native bridge for communication
      
      // Create a placeholder element to represent the WebView
      const placeholder = document.createElement('div');
      placeholder.style.width = '100%';
      placeholder.style.height = '100%';
      placeholder.style.border = 'none';
      placeholder.style.backgroundColor = '#f8f8f8';
      placeholder.classList.add('qt-webengine-container');
      
      if (this.element) {
        this.element.appendChild(placeholder);
      }
      
      // Navigate to the initial URL
      qtWebEngineBridge.navigate(this.url).catch(e => {
        console.error('Error navigating in Qt WebEngine:', e);
      });
      
      // Create the webview interface that uses the native bridge
      this.webview = {
        element: placeholder,
        navigate: (url) => qtWebEngineBridge.navigate(url),
        reload: () => qtWebEngineBridge.reload(),
        executeJavaScript: (code) => qtWebEngineBridge.executeJavaScript(code),
        openFileDialog: (options) => qtWebEngineBridge.openFileDialog(options),
        showNotification: (options) => qtWebEngineBridge.showNotification(options),
        destroy: () => {
          if (placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
          }
        }
      };
    } else {
      // Create an iframe as a fallback when running in a browser
      // This simulates a Qt WebEngine when not running in a native Qt app
      const iframe = document.createElement('iframe');
      iframe.src = this.url;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.classList.add('qt-webengine-fallback');
      
      if (this.element) {
        this.element.appendChild(iframe);
      }
      
      this.webview = {
        element: iframe,
        navigate: (url) => { iframe.src = url; },
        reload: () => { iframe.src = iframe.src; },
        executeJavaScript: (code) => {
          try {
            return iframe.contentWindow.eval(code);
          } catch (e) {
            console.error('Error executing JavaScript in Qt WebEngine:', e);
            return null;
          }
        },
        openFileDialog: () => Promise.reject(new Error('Native file dialog not available in fallback mode')),
        showNotification: () => Promise.reject(new Error('Native notifications not available in fallback mode')),
        destroy: () => {
          if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
        }
      };
    }
  }

  /**
   * Navigate to a new URL
   * @param {string} url - The URL to navigate to
   */
  navigate(url) {
    if (this.webview) {
      this.webview.navigate(url);
    }
  }

  /**
   * Reload the current page
   */
  reload() {
    if (this.webview) {
      this.webview.reload();
    }
  }

  /**
   * Execute JavaScript in the WebView
   * @param {string} code - JavaScript code to execute
   * @returns {Promise<any>} - Result of the execution
   */
  executeJavaScript(code) {
    if (this.webview) {
      return this.webview.executeJavaScript(code);
    }
    return Promise.resolve(null);
  }

  /**
   * Clean up resources when the WebView is no longer needed
   */
  destroy() {
    if (this.webview) {
      this.webview.destroy();
      this.webview = null;
    }
  }
}

/**
 * Factory function to create a WebView adapter
 * @param {string} url - The URL to load
 * @param {Object} options - Options for the WebView
 * @returns {WebViewAdapter} - A new WebView adapter instance
 */
export function createWebView(url, options = {}) {
  return new WebViewAdapter(url, options);
}

export default WebViewAdapter;
