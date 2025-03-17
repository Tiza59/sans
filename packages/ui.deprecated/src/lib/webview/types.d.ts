/**
 * Type definitions for Qt WebEngine and other platform-specific objects
 */

// Qt WebEngine types
interface QWebChannelTransport {
  send: (message: any) => void;
  onmessage: (callback: (event: MessageEvent) => void) => void;
}

interface QtObject {
  webChannelTransport: QWebChannelTransport;
}

interface QWebChannelObject {
  [key: string]: any;
}

declare class QWebChannel {
  constructor(transport: QWebChannelTransport, callback: (channel: { objects: QWebChannelObject }) => void);
}

// Extend Window interface to include platform-specific objects
declare interface Window {
  // Qt WebEngine specific
  qt?: QtObject;
  QWebChannel?: typeof QWebChannel;
  bridge?: any;
  bridgeReady?: (bridge: any) => void;
  
  // iOS WKWebView specific
  webkit?: {
    messageHandlers: {
      [key: string]: {
        postMessage: (message: any) => void;
      };
    };
  };
  receiveNativeMessage?: (messageJson: string) => void;
  
  // Microsoft WebView2 specific
  chrome?: any;
  MSStream?: any;
}

// Declare the WebViewJS module
declare module '@webviewjs/webview' {
  export default class WebViewJS {
    constructor(url: string, options?: any);
    element: HTMLElement;
    navigate(url: string): void;
    reload(): void;
    executeJavaScript(code: string): Promise<any>;
    destroy(): void;
  }
}
