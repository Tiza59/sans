/**
 * Main application file for Sans UI example app
 * Initializes Sans UI and handles platform detection
 * Updated to use the Sans UI component abstraction layer
 */

// Component Adapter for Sans UI components
class ComponentAdapter {
  constructor(element) {
    this.element = element;
  }
  
  // Get the underlying DOM element
  getElement() {
    return this.element;
  }
  
  // Set a property on the component
  setProperty(name, value) {
    if (this.element) {
      if (typeof value === 'boolean') {
        if (value) {
          this.element.setAttribute(name, '');
        } else {
          this.element.removeAttribute(name);
        }
      } else {
        this.element.setAttribute(name, value);
      }
    }
    return this;
  }
  
  // Get a property from the component
  getProperty(name) {
    if (this.element) {
      return this.element.getAttribute(name);
    }
    return null;
  }
  
  // Add an event listener to the component
  addEventListener(eventName, callback) {
    if (this.element) {
      this.element.addEventListener(eventName, callback);
    }
    return this;
  }
  
  // Remove an event listener from the component
  removeEventListener(eventName, callback) {
    if (this.element) {
      this.element.removeEventListener(eventName, callback);
    }
    return this;
  }
  
  // Set the text content of the component
  setText(text) {
    if (this.element) {
      this.element.textContent = text;
    }
    return this;
  }
  
  // Add a CSS class to the component
  addClass(className) {
    if (this.element) {
      this.element.classList.add(className);
    }
    return this;
  }
  
  // Remove a CSS class from the component
  removeClass(className) {
    if (this.element) {
      this.element.classList.remove(className);
    }
    return this;
  }
}

// Factory for creating Sans UI components
class ComponentFactory {
  // Create a button component
  static createButton(id, text, type = 'primary') {
    const button = document.createElement('sans-button');
    button.id = id;
    button.setAttribute('type', type);
    button.textContent = text;
    return new ComponentAdapter(button);
  }
  
  // Create an input component
  static createInput(id, type = 'text', placeholder = '', required = false) {
    const input = document.createElement('sans-input');
    input.id = id;
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);
    if (required) {
      input.setAttribute('required', '');
    }
    return new ComponentAdapter(input);
  }
  
  // Create a div component
  static createDiv(id = '', className = '') {
    const div = document.createElement('sans-div');
    if (id) div.id = id;
    if (className) div.setAttribute('className', className);
    return new ComponentAdapter(div);
  }
  
  // Get an existing component by ID
  static getComponentById(id) {
    const element = document.getElementById(id);
    return element ? new ComponentAdapter(element) : null;
  }
  
  // Get an existing component by selector
  static getComponentBySelector(selector) {
    const element = document.querySelector(selector);
    return element ? new ComponentAdapter(element) : null;
  }
}

class SansUIApp {
  constructor() {
    this.platform = this.detectPlatform();
    this.initSansUI();
    
    // Initialize camera and subscription managers after DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.initializeManagers();
    });
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
  
  initializeManagers() {
    console.log('Initializing camera and subscription managers');
    
    // Initialize camera manager
    if (typeof CameraManager !== 'undefined') {
      window.cameraManager = new CameraManager();
    }
    
    // Initialize subscription manager
    if (typeof SubscriptionManager !== 'undefined') {
      window.subscriptionManager = new SubscriptionManager();
    }
    
    // Initialize sync service
    if (typeof SyncService !== 'undefined') {
      window.syncService = new SyncService();
      window.syncService.start(60000); // Start with a 1-minute interval
    }
    
    // Example of using the ComponentFactory to create a component dynamically
    this.createDynamicComponents();
  }
  
  createDynamicComponents() {
    // Example of creating a dynamic button without using ComponentFactory
    const container = document.querySelector('.camera-controls');
    if (container) {
      // Create the button element directly
      const resetButton = document.createElement('sans-button');
      resetButton.id = 'reset-camera';
      resetButton.setAttribute('type', 'secondary');
      resetButton.setAttribute('disabled', '');
      resetButton.textContent = 'Reset';
      
      // Add event listener directly to the button
      resetButton.addEventListener('click', () => {
        console.log('Reset camera clicked');
        if (window.cameraManager) {
          // Reset camera functionality
          window.cameraManager.stopCamera();
          window.cameraManager.startCamera();
        }
      });
      
      // Append the button to the container
      container.appendChild(resetButton);
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
    // Add platform info to the page using Sans UI components
    const footer = document.querySelector('sans-footer');
    
    // Create platform info using ComponentFactory
    const platformInfo = ComponentFactory.createDiv('platform-info', 'platform-info');
    const platformText = document.createElement('sans-p');
    platformText.textContent = `Detected platform: ${this.getPlatformName()}`;
    platformInfo.getElement().appendChild(platformText);
    
    footer.appendChild(platformInfo.getElement());
    
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
