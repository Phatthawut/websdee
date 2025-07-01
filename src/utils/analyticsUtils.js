/**
 * Google Analytics utility functions
 * This file provides helper functions for tracking events in Google Analytics
 */

/**
 * Track a page view in Google Analytics
 * @param {string} pagePath - The path of the page (e.g., '/home', '/contact')
 * @param {string} pageTitle - The title of the page
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (window.gtag) {
    window.gtag("config", "G-F4FKY27RL3", {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

/**
 * Track a custom event in Google Analytics
 * @param {string} eventName - Name of the event to track
 * @param {Object} eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

/**
 * Track a payment event in Google Analytics
 * @param {Object} paymentData - Payment data object
 * @param {string} paymentData.transactionId - Unique transaction ID
 * @param {number} paymentData.value - Transaction value
 * @param {string} paymentData.currency - Currency code (e.g., 'THB', 'USD')
 * @param {string} paymentData.paymentMethod - Payment method used
 */
export const trackPayment = (paymentData) => {
  if (window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: paymentData.transactionId,
      value: paymentData.value,
      currency: paymentData.currency,
      payment_type: paymentData.paymentMethod,
      items: paymentData.items || [],
    });
  }
};

/**
 * Track form submissions in Google Analytics
 * @param {string} formName - Name of the form that was submitted
 * @param {Object} formData - Additional form data (optional)
 */
export const trackFormSubmission = (formName, formData = {}) => {
  if (window.gtag) {
    window.gtag("event", "form_submit", {
      form_name: formName,
      ...formData,
    });
  }
};

export default {
  trackPageView,
  trackEvent,
  trackPayment,
  trackFormSubmission,
};
