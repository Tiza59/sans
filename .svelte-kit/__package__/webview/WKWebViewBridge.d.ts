/**
 * WKWebViewBridge.js
 * Bridge between JavaScript and native iOS WKWebView
 */
/**
 * Check if the code is running in a native iOS WKWebView environment
 * @returns {boolean} True if running in a native WKWebView
 */
export function isNativeWKWebView(): boolean;
/**
 * Class to handle communication with native iOS WKWebView
 */
export class WKWebViewBridge {
    callbackMap: Map<any, any>;
    callbackId: number;
    /**
     * Send a message to the native iOS app
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
     * Navigate to a URL in the native WKWebView
     * @param {string} url - URL to navigate to
     * @returns {Promise<void>}
     */
    navigate(url: string): Promise<void>;
    /**
     * Reload the current page in the native WKWebView
     * @returns {Promise<void>}
     */
    reload(): Promise<void>;
    /**
     * Execute JavaScript in the native WKWebView
     * @param {string} code - JavaScript code to execute
     * @returns {Promise<any>} - Result of the execution
     */
    executeJavaScript(code: string): Promise<any>;
}
export const wkWebViewBridge: WKWebViewBridge;
