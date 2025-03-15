/**
 * Sync Service for Sans UI example app
 * Handles synchronization of locally stored subscriptions with the backend API
 */

class SyncService {
  constructor() {
    this.apiUrl = 'http://localhost:3001';
    this.syncInterval = null;
    this.isSyncing = false;
    
    // Bind methods
    this.syncSubscriptions = this.syncSubscriptions.bind(this);
  }
  
  /**
   * Start the sync service with a specified interval
   * @param {number} intervalMs - Interval in milliseconds between sync attempts
   */
  start(intervalMs = 60000) {
    console.log('Starting subscription sync service...');
    
    // Clear any existing interval
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    
    // Attempt an immediate sync
    this.syncSubscriptions();
    
    // Set up regular sync interval
    this.syncInterval = setInterval(this.syncSubscriptions, intervalMs);
    
    // Also sync on online events
    window.addEventListener('online', this.syncSubscriptions);
  }
  
  /**
   * Stop the sync service
   */
  stop() {
    console.log('Stopping subscription sync service...');
    
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    
    window.removeEventListener('online', this.syncSubscriptions);
  }
  
  /**
   * Synchronize locally stored subscriptions with the backend
   */
  async syncSubscriptions() {
    // Prevent multiple syncs from running simultaneously
    if (this.isSyncing || !navigator.onLine) {
      return;
    }
    
    this.isSyncing = true;
    console.log('Syncing subscriptions with backend...');
    
    try {
      // Get locally stored subscriptions that haven't been synced
      const allSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      const unsynced = allSubscriptions.filter(sub => sub.synced === false);
      
      if (unsynced.length === 0) {
        console.log('No unsynced subscriptions found.');
        this.isSyncing = false;
        return;
      }
      
      console.log(`Found ${unsynced.length} unsynced subscriptions.`);
      
      // Process each unsynced subscription
      const results = await Promise.allSettled(
        unsynced.map(async (subscription, index) => {
          try {
            // Send to backend API
            const response = await fetch(`${this.apiUrl}/subscribe`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: subscription.name,
                email: subscription.email,
                consent: subscription.consent
              })
            });
            
            const result = await response.json();
            
            if (result.success) {
              // Mark as synced in local storage
              allSubscriptions[allSubscriptions.findIndex(s => 
                s.email === subscription.email && 
                s.timestamp === subscription.timestamp
              )].synced = true;
              
              console.log(`Synced subscription for ${subscription.email}`);
              return { success: true, email: subscription.email };
            } else {
              console.error(`Failed to sync subscription for ${subscription.email}:`, result.message);
              return { success: false, email: subscription.email, error: result.message };
            }
          } catch (error) {
            console.error(`Error syncing subscription for ${subscription.email}:`, error);
            return { success: false, email: subscription.email, error: error.message };
          }
        })
      );
      
      // Update local storage with synced status
      localStorage.setItem('subscriptions', JSON.stringify(allSubscriptions));
      
      // If native storage is available through bridge, update it too
      if (window.bridge && typeof window.bridge.storeData === 'function') {
        window.bridge.storeData('subscriptions', JSON.stringify(allSubscriptions));
      }
      
      // Show notification if bridge is available
      const syncedCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
      if (syncedCount > 0 && window.bridge && typeof window.bridge.showNotification === 'function') {
        window.bridge.showNotification({
          title: 'Subscriptions Synced',
          text: `Successfully synced ${syncedCount} subscription(s) with the server.`,
          iconName: 'network-transmit-receive'
        });
      }
      
      console.log(`Sync completed. ${syncedCount}/${unsynced.length} subscriptions synced.`);
      
    } catch (error) {
      console.error('Sync service error:', error);
    } finally {
      this.isSyncing = false;
    }
  }
}

// Initialize sync service when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.syncService = new SyncService();
  
  // Start the sync service with a 1-minute interval
  window.syncService.start(60000);
});
