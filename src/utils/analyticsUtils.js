/**
 * Google Analytics utility functions
 * This file provides helper functions for tracking events in Google Analytics
 * Uses traditional gtag.js for better compatibility with Google Analytics tools
 */

/**
 * Track a page view in Google Analytics
 * @param {string} pagePath - The path of the page (e.g., '/home', '/contact')
 * @param {string} pageTitle - The title of the page
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (window.gtag) {
    window.gtag("config", "G-BYVM3CF7KD", {
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

/**
 * Track order confirmation events for enhanced ecommerce
 * @param {Object} orderData - Order data object
 */
export const trackOrderConfirmation = (orderData) => {
  if (window.gtag && orderData) {
    window.gtag("event", "purchase", {
      transaction_id: orderData.transactionId || orderData.reference_number,
      value: orderData.amount || orderData.order?.final_amount || 0,
      currency: orderData.currency || "THB",
      payment_type: orderData.payment_method,
      items: [
        {
          item_id: orderData.order?.package_name || "website_package",
          item_name: orderData.order?.package_name || "Website Package",
          category: "web_services",
          quantity: 1,
          price: orderData.amount || orderData.order?.final_amount || 0,
        },
      ],
    });
  }
};

export default {
  trackPageView,
  trackEvent,
  trackPayment,
  trackFormSubmission,
  trackOrderConfirmation,
};
