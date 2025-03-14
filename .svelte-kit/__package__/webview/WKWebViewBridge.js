/**
 * WKWebViewBridge.js
 * Bridge between JavaScript and native iOS WKWebView
 */

/**
 * Check if the code is running in a native iOS WKWebView environment
 * @returns {boolean} True if running in a native WKWebView
 */
export function isNativeWKWebView() {
  // Check if the window.webkit and window.webkit.messageHandlers objects exist
  // These are injected by WKWebView when running in a native iOS app
  return (
    typeof window !== 'undefined' &&
    window.webkit &&
    window.webkit.messageHandlers
  );
}

/**
 * Class to handle communication with native iOS WKWebView
 */
export class WKWebViewBridge {
  constructor() {
    this.callbackMap = new Map();
    this.callbackId = 0;
    
    // Setup message handler for receiving messages from native code
    if (typeof window !== 'undefined') {
      window.receiveNativeMessage = this.receiveNativeMessage.bind(this);
    }
  }

  /**
   * Send a message to the native iOS app
   * @param {string} action - The action to perform
   * @param {object} data - Data to send with the message
   * @returns {Promise<any>} - Promise that resolves with the response
   */
  sendMessage(action, data = {}) {
    return new Promise((resolve, reject) => {
      if (!isNativeWKWebView()) {
        reject(new Error('Not running in native WKWebView'));
        return;
      }

      const callbackId = `cb_${++this.callbackId}`;
      this.callbackMap.set(callbackId, { resolve, reject });

      const message = {
        id: callbackId,
        action,
        data
      };

      // Send message to native code
      try {
        window.webkit.messageHandlers.webViewBridge.postMessage(message);
      } catch (e) {
        this.callbackMap.delete(callbackId);
        reject(e);
      }
    });
  }

  /**
   * Receive a message from native code
   * @param {string} messageJson - JSON string containing the message
   */
  receiveNativeMessage(messageJson) {
    try {
      const message = JSON.parse(messageJson);
      const { id, error, data } = message;

      if (this.callbackMap.has(id)) {
        const { resolve, reject } = this.callbackMap.get(id);
        this.callbackMap.delete(id);

        if (error) {
          reject(new Error(error));
        } else {
          resolve(data);
        }
      }
    } catch (e) {
      console.error('Error processing native message:', e);
    }
  }

  /**
   * Navigate to a URL in the native WKWebView
   * @param {string} url - URL to navigate to
   * @returns {Promise<void>}
   */
  navigate(url) {
    return this.sendMessage('navigate', { url });
  }

  /**
   * Reload the current page in the native WKWebView
   * @returns {Promise<void>}
   */
  reload() {
    return this.sendMessage('reload');
  }

  /**
   * Execute JavaScript in the native WKWebView
   * @param {string} code - JavaScript code to execute
   * @returns {Promise<any>} - Result of the execution
   */
  executeJavaScript(code) {
    return this.sendMessage('executeJavaScript', { code });
  }
}

// Export singleton instance
export const wkWebViewBridge = new WKWebViewBridge();
