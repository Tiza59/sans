import Foundation
import WebKit

/**
 * WKWebViewHandler
 * Handles the native iOS side of the WKWebView bridge
 */
class WKWebViewHandler: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
    
    private weak var webView: WKWebView?
    
    init(webView: WKWebView) {
        self.webView = webView
        super.init()
        
        // Configure the WKWebView
        setup()
    }
    
    private func setup() {
        guard let webView = webView else { return }
        
        // Set navigation delegate
        webView.navigationDelegate = self
        
        // Add script message handler
        webView.configuration.userContentController.add(self, name: "webViewBridge")
        
        // Inject JavaScript bridge code
        let bridgeScript = WKUserScript(
            source: "window.webkit = window.webkit || {}; window.webkit.messageHandlers = window.webkit.messageHandlers || {};",
            injectionTime: .atDocumentStart,
            forMainFrameOnly: false
        )
        webView.configuration.userContentController.addUserScript(bridgeScript)
    }
    
    // MARK: - WKScriptMessageHandler
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any],
              let id = body["id"] as? String,
              let action = body["action"] as? String else {
            sendErrorResponse(id: "unknown", error: "Invalid message format")
            return
        }
        
        let data = body["data"] as? [String: Any] ?? [:]
        
        // Handle different actions
        switch action {
        case "navigate":
            handleNavigate(id: id, data: data)
        case "reload":
            handleReload(id: id)
        case "executeJavaScript":
            handleExecuteJavaScript(id: id, data: data)
        default:
            sendErrorResponse(id: id, error: "Unknown action: \(action)")
        }
    }
    
    // MARK: - Action Handlers
    
    private func handleNavigate(id: String, data: [String: Any]) {
        guard let urlString = data["url"] as? String,
              let url = URL(string: urlString) else {
            sendErrorResponse(id: id, error: "Invalid URL")
            return
        }
        
        let request = URLRequest(url: url)
        webView?.load(request)
        sendSuccessResponse(id: id)
    }
    
    private func handleReload(id: String) {
        webView?.reload()
        sendSuccessResponse(id: id)
    }
    
    private func handleExecuteJavaScript(id: String, data: [String: Any]) {
        guard let code = data["code"] as? String else {
            sendErrorResponse(id: id, error: "Missing JavaScript code")
            return
        }
        
        webView?.evaluateJavaScript(code) { result, error in
            if let error = error {
                self.sendErrorResponse(id: id, error: error.localizedDescription)
            } else {
                self.sendSuccessResponse(id: id, data: ["result": result as Any])
            }
        }
    }
    
    // MARK: - Response Helpers
    
    private func sendSuccessResponse(id: String, data: [String: Any] = [:]) {
        sendResponse(id: id, error: nil, data: data)
    }
    
    private func sendErrorResponse(id: String, error: String) {
        sendResponse(id: id, error: error, data: [:])
    }
    
    private func sendResponse(id: String, error: String?, data: [String: Any]) {
        guard let webView = webView else { return }
        
        var response: [String: Any] = ["id": id]
        if let error = error {
            response["error"] = error
        } else {
            response["data"] = data
        }
        
        do {
            let jsonData = try JSONSerialization.data(withJSONObject: response)
            if let jsonString = String(data: jsonData, encoding: .utf8) {
                let js = "window.receiveNativeMessage('\(jsonString.replacingOccurrences(of: "'", with: "\\'"))');"
                webView.evaluateJavaScript(js, completionHandler: nil)
            }
        } catch {
            print("Error sending response: \(error)")
        }
    }
    
    // MARK: - Cleanup
    
    func cleanup() {
        webView?.configuration.userContentController.removeScriptMessageHandler(forName: "webViewBridge")
        webView = nil
    }
    
    deinit {
        cleanup()
    }
}
