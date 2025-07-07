/**
 * Secure logging utility with automatic data masking
 * Prevents sensitive information from being exposed in console logs
 */

// Define sensitive field patterns that should be masked
const SENSITIVE_PATTERNS = [
  // Payment related
  "amount",
  "total",
  "price",
  "payment",
  "card",
  "cvv",
  "cvc",
  "expiry",
  "account_number",
  "routing_number",
  "bank_account",

  // Authentication
  "password",
  "token",
  "secret",
  "key",
  "auth",
  "credential",
  "session_id",
  "access_token",
  "refresh_token",
  "api_key",

  // Personal information
  "email",
  "phone",
  "address",
  "ssn",
  "tax_id",
  "passport",
  "credit_card",
  "debit_card",
  "account_name",

  // Business sensitive
  "stripe_",
  "paypal_",
  "firebase_",
  "unsplash_",
  "recaptcha",
  "app_check",
];

// URLs that should be masked
const SENSITIVE_URL_PATTERNS = [
  "session_id=",
  "access_key=",
  "api_key=",
  "token=",
  "secret=",
  "password=",
];

/**
 * Mask sensitive data in any object or string
 * @param {*} data - Data to mask
 * @param {number} maxDepth - Maximum depth to traverse (prevent infinite recursion)
 * @returns {*} - Masked data
 */
function maskSensitiveData(data, maxDepth = 3) {
  if (maxDepth <= 0) return "[MAX_DEPTH_REACHED]";

  if (typeof data === "string") {
    return maskString(data);
  }

  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      return data.map((item) => maskSensitiveData(item, maxDepth - 1));
    }

    const masked = {};
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();

      // Check if field name indicates sensitive data
      const isSensitive = SENSITIVE_PATTERNS.some((pattern) =>
        lowerKey.includes(pattern.toLowerCase())
      );

      if (isSensitive) {
        // Mask the value based on its type
        if (typeof value === "string") {
          masked[key] = maskString(value);
        } else if (typeof value === "number") {
          masked[key] = "***";
        } else {
          masked[key] = "[MASKED]";
        }
      } else {
        // Recursively mask nested objects
        masked[key] = maskSensitiveData(value, maxDepth - 1);
      }
    }
    return masked;
  }

  return data;
}

/**
 * Mask sensitive parts of a string (URLs, IDs, etc.)
 * @param {string} str - String to mask
 * @returns {string} - Masked string
 */
function maskString(str) {
  if (!str || typeof str !== "string") return str;

  let maskedStr = str;

  // Mask URLs with sensitive parameters
  SENSITIVE_URL_PATTERNS.forEach((pattern) => {
    const regex = new RegExp(`(${pattern})([^&\\s]+)`, "gi");
    maskedStr = maskedStr.replace(regex, "$1***");
  });

  // Mask session IDs and similar long identifiers
  maskedStr = maskedStr.replace(
    /\b(cs_|pi_|sk_|pk_|acct_)[a-zA-Z0-9_]{10,}\b/g,
    (match) => {
      const prefix = match.substring(0, 7);
      return prefix + "***";
    }
  );

  // Mask email addresses
  maskedStr = maskedStr.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    (email) => {
      const [local, domain] = email.split("@");
      return local.substring(0, 2) + "***@" + domain;
    }
  );

  // Mask phone numbers
  maskedStr = maskedStr.replace(/\b\d{3}-?\d{3}-?\d{4}\b/g, "***-***-****");

  return maskedStr;
}

/**
 * Secure logger with automatic data masking
 */
class SecureLogger {
  constructor(isDevelopment = process.env.NODE_ENV === "development") {
    this.isDevelopment = isDevelopment;
    this.enabledInProduction = false; // Never log sensitive data in production
  }

  /**
   * Enable logging in production (use with caution)
   * @param {boolean} enabled - Whether to enable production logging
   */
  setProductionLogging(enabled = false) {
    this.enabledInProduction = enabled;
  }

  /**
   * Check if logging should be performed
   * @returns {boolean}
   */
  shouldLog() {
    return this.isDevelopment || this.enabledInProduction;
  }

  /**
   * Log information with data masking
   * @param {string} message - Log message
   * @param {*} data - Data to log (will be masked)
   */
  log(message, data) {
    if (!this.shouldLog()) return;

    if (data !== undefined) {
      const maskedData = maskSensitiveData(data);
      console.log(`[SECURE] ${message}`, maskedData);
    } else {
      console.log(`[SECURE] ${message}`);
    }
  }

  /**
   * Log warnings with data masking
   * @param {string} message - Warning message
   * @param {*} data - Data to log (will be masked)
   */
  warn(message, data) {
    if (!this.shouldLog()) return;

    if (data !== undefined) {
      const maskedData = maskSensitiveData(data);
      console.warn(`[SECURE] ${message}`, maskedData);
    } else {
      console.warn(`[SECURE] ${message}`);
    }
  }

  /**
   * Log errors with data masking
   * @param {string} message - Error message
   * @param {*} error - Error object or data (will be masked)
   */
  error(message, error) {
    if (!this.shouldLog()) return;

    if (error !== undefined) {
      // For Error objects, preserve the stack trace but mask the message
      if (error instanceof Error) {
        const maskedError = {
          name: error.name,
          message: maskString(error.message),
          stack: error.stack ? maskString(error.stack) : undefined,
        };
        console.error(`[SECURE] ${message}`, maskedError);
      } else {
        const maskedData = maskSensitiveData(error);
        console.error(`[SECURE] ${message}`, maskedData);
      }
    } else {
      console.error(`[SECURE] ${message}`);
    }
  }

  /**
   * Log debug information (only in development)
   * @param {string} message - Debug message
   * @param {*} data - Data to log (will be masked)
   */
  debug(message, data) {
    if (!this.isDevelopment) return;

    if (data !== undefined) {
      const maskedData = maskSensitiveData(data);
      console.debug(`[SECURE DEBUG] ${message}`, maskedData);
    } else {
      console.debug(`[SECURE DEBUG] ${message}`);
    }
  }

  /**
   * Log API URLs with parameter masking
   * @param {string} message - Log message
   * @param {string} url - URL to log (will be masked)
   */
  logApiUrl(message, url) {
    if (!this.shouldLog()) return;

    const maskedUrl = maskString(url);
    console.log(`[SECURE API] ${message}`, maskedUrl);
  }

  /**
   * Log payment data with complete masking
   * @param {string} message - Log message
   * @param {Object} paymentData - Payment data (will be heavily masked)
   */
  logPayment(message, paymentData) {
    if (!this.shouldLog()) return;

    const heavilyMasked = {
      status: paymentData?.status || "unknown",
      currency: paymentData?.currency || "unknown",
      amount: "***",
      customer: {
        name: "***",
        email: "***",
        phone: "***",
      },
      order: {
        package_name: paymentData?.order?.package_name || "unknown",
        amount: "***",
      },
      metadata: "[MASKED]",
    };

    console.log(`[SECURE PAYMENT] ${message}`, heavilyMasked);
  }
}

// Create and export default instance
const secureLogger = new SecureLogger();

export default secureLogger;
export { SecureLogger, maskSensitiveData };
