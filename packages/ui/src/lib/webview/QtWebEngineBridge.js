/**
 * QtWebEngineBridge.js
 * Bridge between JavaScript and native Qt WebEngine
 */

/**
 * Check if the code is running in a Qt WebEngine environment
 * @returns {boolean} True if running in a Qt WebEngine environment
 */
export function isQtWebEngine() {
  // Check for Qt WebEngine specific objects and properties
  // Qt WebEngine injects a 'qt' object with specific properties
  return (
    typeof window !== 'undefined' &&
    typeof window.qt !== 'undefined' &&
    typeof window.qt.webChannelTransport !== 'undefined'
  );
}

/**
 * Class to handle communication with native Qt WebEngine
 */
export class QtWebEngineBridge {
  constructor() {
    this.callbackMap = new Map();
    this.callbackId = 0;
    this.channel = null;
    this.qtBridge = null;
    
    // Initialize the WebChannel when in a Qt WebEngine environment
    if (isQtWebEngine()) {
      this._initWebChannel();
    }
  }

  /**
   * Initialize the Qt WebChannel for communication
   * @private
   */
  _initWebChannel() {
    // The Qt WebChannel API should be injected by Qt WebEngine
    if (typeof QWebChannel === 'undefined') {
      console.error('QWebChannel not found. Make sure Qt WebEngine is properly set up.');
      return;
    }

    // Create a new WebChannel using the transport provided by Qt
    new QWebChannel(window.qt.webChannelTransport, (channel) => {
      this.channel = channel;
      // The 'bridge' object should be exposed by the C++ side
      this.qtBridge = channel.objects.bridge;
      
      if (this.qtBridge) {
        // Connect to the signal from C++ side
        this.qtBridge.messageReceived.connect(this.receiveNativeMessage.bind(this));
        console.log('Qt WebEngine bridge initialized successfully');
      } else {
        console.error('Bridge object not found in WebChannel');
      }
    });
  }

  /**
   * Send a message to the native KDE Qt application
   * @param {string} action - The action to perform
   * @param {object} data - Data to send with the message
   * @returns {Promise<any>} - Promise that resolves with the response
   */
  sendMessage(action, data = {}) {
    return new Promise((resolve, reject) => {
      if (!isQtWebEngine() || !this.qtBridge) {
        reject(new Error('Not running in Qt WebEngine or bridge not initialized'));
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
        // Convert to JSON string for transmission
        this.qtBridge.sendMessage(JSON.stringify(message));
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
   * Navigate to a URL in the native Qt WebEngine
   * @param {string} url - URL to navigate to
   * @returns {Promise<void>}
   */
  navigate(url) {
    return this.sendMessage('navigate', { url });
  }

  /**
   * Reload the current page in the native Qt WebEngine
   * @returns {Promise<void>}
   */
  reload() {
    return this.sendMessage('reload');
  }

  /**
   * Execute JavaScript in the native Qt WebEngine
   * @param {string} code - JavaScript code to execute
   * @returns {Promise<any>} - Result of the execution
   */
  executeJavaScript(code) {
    return this.sendMessage('executeJavaScript', { code });
  }

  /**
   * Open a native KDE file dialog
   * @param {Object} options - File dialog options
   * @returns {Promise<string>} - Selected file path
   */
  openFileDialog(options = {}) {
    return this.sendMessage('openFileDialog', options);
  }

  /**
   * Show a native KDE notification
   * @param {Object} options - Notification options
   * @returns {Promise<void>}
   */
  showNotification(options = {}) {
    return this.sendMessage('showNotification', options);
  }
}

// Export singleton instance
export const qtWebEngineBridge = new QtWebEngineBridge();
