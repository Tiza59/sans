/**
 * Main application file for Sans UI example app
 * Initializes Sans UI and handles platform detection
 */

class SansUIApp {
  constructor() {
    this.platform = this.detectPlatform();
    this.initSansUI();
  }
  
  detectPlatform() {
    // Detect platform based on available APIs
    if (typeof window.qt !== 'undefined' && typeof window.qt.webChannelTransport !== 'undefined') {
      return 'qt';
    } else if (typeof window.webkit !== 'undefined' && typeof window.webkit.messageHandlers !== 'undefined') {
      return 'ios';
    } else if (typeof window.Android !== 'undefined') {
      return 'android';
    } else if (typeof window.chrome !== 'undefined' && typeof window.chrome.webview !== 'undefined') {
      return 'windows';
    } else if (typeof window.webkit !== 'undefined' && typeof window.webkit.messageHandlers !== 'undefined') {
      return 'macos';
    } else if (typeof window.GtkBridge !== 'undefined') {
      return 'gtk';
    } else {
      return 'web';
    }
  }
  
  initSansUI() {
    // Initialize Sans UI based on detected platform
    document.addEventListener('DOMContentLoaded', () => {
      // Update UI with platform information
      this.updatePlatformInfo();
      
      // Initialize bridge when ready
      if (typeof window.bridgeReady === 'function') {
        // Bridge will call this function when ready
        console.log('Sans UI bridge is being initialized...');
      } else {
        // Set up bridgeReady function for platforms that use it
        window.bridgeReady = (bridge) => {
          console.log('Sans UI bridge is ready');
          window.bridge = bridge;
          this.onBridgeReady(bridge);
        };
      }
      
      // For platforms without a bridge mechanism
      if (this.platform === 'web') {
        console.log('Running in web mode (no native bridge)');
        this.setupWebFallbacks();
      }
    });
  }
  
  onBridgeReady(bridge) {
    // Called when the native bridge is ready
    console.log(`Sans UI bridge ready for platform: ${this.platform}`);
    
    // Show welcome notification
    if (typeof bridge.showNotification === 'function') {
      bridge.showNotification({
        title: 'Sans UI Example App',
        text: `Running on ${this.getPlatformName()}`,
        iconName: 'dialog-information'
      });
    }
  }
  
  updatePlatformInfo() {
    // Add platform info to the page
    const footer = document.querySelector('footer');
    const platformInfo = document.createElement('p');
    platformInfo.textContent = `Detected platform: ${this.getPlatformName()}`;
    platformInfo.className = 'platform-info';
    footer.appendChild(platformInfo);
    
    // Add platform-specific class to body for styling
    document.body.classList.add(`platform-${this.platform}`);
  }
  
  getPlatformName() {
    // Get user-friendly platform name
    const platformNames = {
      'qt': 'Qt Desktop',
      'gtk': 'GTK Desktop',
      'ios': 'iOS',
      'android': 'Android',
      'windows': 'Windows',
      'macos': 'macOS',
      'web': 'Web Browser'
    };
    
    return platformNames[this.platform] || 'Unknown Platform';
  }
  
  setupWebFallbacks() {
    // Set up fallbacks for web platform where native features aren't available
    window.bridge = {
      // Implement basic fallbacks for web
      showNotification: (options) => {
        console.log('Notification:', options.title, '-', options.text);
        // Could implement a web notification here
        if ('Notification' in window && Notification.permission === 'granted') {
          return new Notification(options.title, { body: options.text });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              return new Notification(options.title, { body: options.text });
            }
          });
        }
        return true;
      },
      
      requestPermission: async (permissionType) => {
        console.log(`Permission request for: ${permissionType}`);
        if (permissionType === 'camera') {
          try {
            // Try to get user media to trigger browser permission
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Stop all tracks immediately
            stream.getTracks().forEach(track => track.stop());
            return true;
          } catch (error) {
            console.error('Permission denied:', error);
            return false;
          }
        }
        return true; // Default to granted for other permissions in web mode
      },
      
      storeData: (key, value) => {
        localStorage.setItem(key, value);
        return true;
      },
      
      getData: (key) => {
        return localStorage.getItem(key);
      }
    };
  }
}

// Initialize the app
const app = new SansUIApp();
