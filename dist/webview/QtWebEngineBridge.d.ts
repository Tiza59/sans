/**
 * QtWebEngineBridge.js
 * Bridge between JavaScript and native Qt WebEngine
 */
/**
 * Check if the code is running in a Qt WebEngine environment
 * @returns {boolean} True if running in a Qt WebEngine environment
 */
export function isQtWebEngine(): boolean;
/**
 * Class to handle communication with native Qt WebEngine
 */
export class QtWebEngineBridge {
    callbackMap: Map<any, any>;
    callbackId: number;
    channel: {
        objects: QWebChannelObject;
    } | null;
    qtBridge: any;
    /**
     * Initialize the Qt WebChannel for communication
     * @private
     */
    private _initWebChannel;
    /**
     * Send a message to the native KDE Qt application
     * @param {string} action - The action to perform
     * @param {object} data - Data to send with the message
     * @returns {Promise<any>} - Promise that resolves with the response
     */
    sendMessage(action: string, data?: object): Promise<any>;
    /**
     * Receive a message from native code
     * @param {string} messageJson - JSON string containing the message
     */
    receiveNativeMessage(messageJson: string): void;
    /**
     * Navigate to a URL in the native Qt WebEngine
     * @param {string} url - URL to navigate to
     * @returns {Promise<void>}
     */
    navigate(url: string): Promise<void>;
    /**
     * Reload the current page in the native Qt WebEngine
     * @returns {Promise<void>}
     */
    reload(): Promise<void>;
    /**
     * Execute JavaScript in the native Qt WebEngine
     * @param {string} code - JavaScript code to execute
     * @returns {Promise<any>} - Result of the execution
     */
    executeJavaScript(code: string): Promise<any>;
    /**
     * Open a native KDE file dialog
     * @param {Object} options - File dialog options
     * @returns {Promise<string>} - Selected file path
     */
    openFileDialog(options?: Object): Promise<string>;
    /**
     * Show a native KDE notification
     * @param {Object} options - Notification options
     * @returns {Promise<void>}
     */
    showNotification(options?: Object): Promise<void>;
}
export const qtWebEngineBridge: QtWebEngineBridge;
