/**
 * Subscription form functionality for Sans UI example app
 * Demonstrates how to handle form submissions and integrate with native features
 * Connects to the Elysia backend API for processing subscriptions and sending emails
 */

class SubscriptionManager {
  constructor() {
    // DOM elements
    this.subscribeForm = document.getElementById('subscribe-form');
    this.nameInput = document.getElementById('name');
    this.emailInput = document.getElementById('email');
    this.consentCheckbox = document.getElementById('consent');
    this.successMessage = document.getElementById('subscription-success');
    
    // API configuration
    this.apiUrl = 'http://localhost:3001'; // Default backend URL
    
    // Bind methods
    this.handleSubmit = this.handleSubmit.bind(this);
    
    // Initialize event listeners
    this.initEventListeners();
  }
  
  initEventListeners() {
    this.subscribeForm.addEventListener('submit', this.handleSubmit);
    
    // Add input validation
    this.emailInput.addEventListener('blur', () => this.validateEmail());
  }
  
  validateEmail() {
    const email = this.emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
      this.emailInput.setCustomValidity('Please enter a valid email address');
      return false;
    } else {
      this.emailInput.setCustomValidity('');
      return true;
    }
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    
    // Validate form
    if (!this.validateEmail()) return;
    
    // Disable form during submission
    this.setFormLoading(true);
    
    const formData = {
      name: this.nameInput.value.trim(),
      email: this.emailInput.value.trim(),
      consent: this.consentCheckbox.checked
    };
    
    try {
      // Send data to the backend API
      const response = await fetch(`${this.apiUrl}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show success message
        this.subscribeForm.style.display = 'none';
        this.successMessage.style.display = 'block';
        
        // Show native notification if bridge is available
        if (window.bridge && typeof window.bridge.showNotification === 'function') {
          window.bridge.showNotification({
            title: 'Subscription Successful',
            text: `Thank you, ${formData.name}! You've been added to our waitlist.`,
            iconName: 'mail-mark-important'
          });
        }
        
        // Save subscription to local storage as backup
        this.saveSubscription(formData);
      } else {
        this.showError(result.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      
      // If API is unreachable, fall back to local storage
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.log('API unreachable, falling back to local storage');
        this.saveSubscription(formData);
        
        // Show success message anyway (graceful degradation)
        this.subscribeForm.style.display = 'none';
        this.successMessage.style.display = 'block';
        
        if (window.bridge && typeof window.bridge.showNotification === 'function') {
          window.bridge.showNotification({
            title: 'Subscription Saved Locally',
            text: `Thank you, ${formData.name}! Your subscription has been saved locally.`,
            iconName: 'mail-mark-important'
          });
        }
      } else {
        this.showError(`Could not process subscription: ${error.message}`);
      }
    } finally {
      // Re-enable form
      this.setFormLoading(false);
    }
  }
  
  setFormLoading(isLoading) {
    const submitButton = this.subscribeForm.querySelector('button[type="submit"]');
    
    if (isLoading) {
      submitButton.disabled = true;
      submitButton.textContent = 'Subscribing...';
    } else {
      submitButton.disabled = false;
      submitButton.textContent = 'Subscribe';
    }
  }
  
  saveSubscription(formData) {
    // Save to local storage for backup/offline support
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    subscriptions.push({
      ...formData,
      timestamp: new Date().toISOString(),
      synced: false // Flag to indicate it needs to be synced with server
    });
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    
    // If native storage is available through bridge, use it
    if (window.bridge && typeof window.bridge.storeData === 'function') {
      window.bridge.storeData('subscriptions', JSON.stringify(subscriptions));
    }
  }
  
  showError(message) {
    // Show error using native notification if available
    if (window.bridge && typeof window.bridge.showNotification === 'function') {
      window.bridge.showNotification({
        title: 'Subscription Error',
        text: message,
        iconName: 'dialog-error'
      });
    } else {
      // Fallback to alert
      alert(`Subscription Error: ${message}`);
    }
    
    // Also log to console
    console.error('Subscription error:', message);
  }
}

// Initialize subscription manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.subscriptionManager = new SubscriptionManager();
});
