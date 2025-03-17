import UIKit
import WebKit

/**
 * WebViewViewController
 * A sample iOS view controller that implements the WKWebView integration
 */
class WebViewViewController: UIViewController {
    
    private var webView: WKWebView!
    private var webViewHandler: WKWebViewHandler!
    
    var initialUrl: URL = URL(string: "https://example.com")!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupWebView()
        loadInitialUrl()
    }
    
    private func setupWebView() {
        // Create WKWebView configuration
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        
        // Create WKWebView
        webView = WKWebView(frame: view.bounds, configuration: configuration)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.addSubview(webView)
        
        // Create and setup the WKWebView handler
        webViewHandler = WKWebViewHandler(webView: webView)
    }
    
    private func loadInitialUrl() {
        let request = URLRequest(url: initialUrl)
        webView.load(request)
    }
    
    // Example of how to expose native functionality to JavaScript
    func exposeNativeFunctions() {
        // This could include additional native functionality like camera access, location, etc.
        // For example, to add a function that shows a native alert:
        let script = """
        window.nativeApp = window.nativeApp || {};
        window.nativeApp.showAlert = function(title, message) {
            window.webkit.messageHandlers.webViewBridge.postMessage({
                id: 'alert_' + Date.now(),
                action: 'showAlert',
                data: { title: title, message: message }
            });
        };
        """
        
        let userScript = WKUserScript(source: script, injectionTime: .atDocumentEnd, forMainFrameOnly: false)
        webView.configuration.userContentController.addUserScript(userScript)
    }
    
    // MARK: - Additional Native Functionality
    
    func showNativeAlert(title: String, message: String) {
        let alertController = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "OK", style: .default))
        present(alertController, animated: true)
    }
}
