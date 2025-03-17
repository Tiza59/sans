/**
 * Subscribe Module
 * Handles subscription form submission and validation
 */

/**
 * Handle subscription form submission
 * @param {Object} data - Subscription data
 * @param {string} data.email - Email address
 * @param {string} data.name - Full name
 * @param {boolean} data.terms - Terms acceptance
 * @returns {Promise<Object>} - Subscription result
 */
export async function handleSubscribe(data) {
  // Validate data
  if (!data.email) {
    throw new Error('Email is required');
  }
  
  if (!isValidEmail(data.email)) {
    throw new Error('Invalid email format');
  }
  
  if (!data.name) {
    throw new Error('Name is required');
  }
  
  if (!data.terms) {
    throw new Error('You must accept the terms and conditions');
  }
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Thank you, ${data.name}! You have been subscribed with email: ${data.email}`,
        data
      });
    }, 1000);
  });
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sync with backend service
 * This is a placeholder for actual backend synchronization
 * @param {Object} data - Subscription data
 * @returns {Promise<Object>} - Sync result
 */
export async function syncWithService(data) {
  // This would normally make an API call to a backend service
  console.log('Syncing with service:', data);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Data synced successfully',
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
}

// Export all functions
export default {
  handleSubscribe,
  syncWithService
};
