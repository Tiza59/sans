/**
 * Factory function to create a WebView adapter
 * @param {string} url - The URL to load
 * @param {Object} options - Options for the WebView
 * @returns {WebViewAdapter} - A new WebView adapter instance
 */
export function createWebView(url: string, options?: Object): WebViewAdapter;
/**
 * WebViewAdapter class provides a unified interface for different WebView implementations
 */
export class WebViewAdapter {
    constructor(url: any, options?: {});
    url: any;
    options: {};
    webview: WebViewJS | {
        element: HTMLDivElement;
        navigate: (url: any) => Promise<void>;
        reload: () => Promise<void>;
        executeJavaScript: (code: any) => Promise<any>;
        destroy: () => void;
        openFileDialog?: undefined;
        showNotification?: undefined;
    } | {
        element: HTMLIFrameElement;
        navigate: (url: any) => void;
        reload: () => void;
        executeJavaScript: (code: any) => any;
        destroy: () => void;
        openFileDialog?: undefined;
        showNotification?: undefined;
    } | {
        element: HTMLDivElement;
        navigate: (url: any) => Promise<void>;
        reload: () => Promise<void>;
        executeJavaScript: (code: any) => Promise<any>;
        openFileDialog: (options: any) => Promise<string>;
        showNotification: (options: any) => Promise<void>;
        destroy: () => void;
    } | {
        element: HTMLIFrameElement;
        navigate: (url: any) => void;
        reload: () => void;
        executeJavaScript: (code: any) => any;
        openFileDialog: () => Promise<never>;
        showNotification: () => Promise<never>;
        destroy: () => void;
    } | null;
    element: HTMLElement | null;
    /**
     * Initialize the WebView in the provided element
     * @param {HTMLElement} element - The DOM element to attach the WebView to
     */
    initialize(element: HTMLElement): this;
    /**
     * Initialize WebViewJS implementation
     * @private
     */
    private _initializeWebViewJS;
    /**
     * Initialize WKWebView implementation for iOS
     * @private
     */
    private _initializeWKWebView;
    /**
     * Initialize Qt WebEngine implementation
     * @private
     */
    private _initializeQtWebEngine;
    /**
     * Navigate to a new URL
     * @param {string} url - The URL to navigate to
     */
    navigate(url: string): void;
    /**
     * Reload the current page
     */
    reload(): void;
    /**
     * Execute JavaScript in the WebView
     * @param {string} code - JavaScript code to execute
     * @returns {Promise<any>} - Result of the execution
     */
    executeJavaScript(code: string): Promise<any>;
    /**
     * Clean up resources when the WebView is no longer needed
     */
    destroy(): void;
}
export default WebViewAdapter;
import WebViewJS from '@webviewjs/webview';
