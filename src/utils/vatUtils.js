// VAT (Value Added Tax) calculation utilities for Thailand
// Currently disabled but kept for future implementation

// VAT rate for Thailand (7%)
export const VAT_RATE = 0.07;

// Current VAT status (can be toggled when needed)
export const VAT_ENABLED = false;

/**
 * Calculate price with VAT included
 * @param {number} basePrice - Base price without VAT
 * @returns {number} Price with VAT included
 */
export const calculatePriceWithVAT = (basePrice) => {
  if (!VAT_ENABLED) {
    return basePrice;
  }
  return Math.round(basePrice * (1 + VAT_RATE));
};

/**
 * Calculate VAT amount from base price
 * @param {number} basePrice - Base price without VAT
 * @returns {number} VAT amount
 */
export const calculateVATAmount = (basePrice) => {
  if (!VAT_ENABLED) {
    return 0;
  }
  return Math.round(basePrice * VAT_RATE);
};

/**
 * Calculate base price from price with VAT
 * @param {number} priceWithVAT - Price including VAT
 * @returns {number} Base price without VAT
 */
export const calculateBasePriceFromVAT = (priceWithVAT) => {
  if (!VAT_ENABLED) {
    return priceWithVAT;
  }
  return Math.round(priceWithVAT / (1 + VAT_RATE));
};

/**
 * Calculate deposit amount (50% of total including VAT)
 * @param {number} baseAmount - Base amount without VAT
 * @returns {number} Deposit amount
 */
export const calculateDeposit = (baseAmount) => {
  const totalWithVAT = calculatePriceWithVAT(baseAmount);
  return Math.round(totalWithVAT * 0.5);
};

/**
 * Calculate remaining amount after deposit
 * @param {number} baseAmount - Base amount without VAT
 * @returns {number} Remaining amount after deposit
 */
export const calculateRemainingAmount = (baseAmount) => {
  const totalWithVAT = calculatePriceWithVAT(baseAmount);
  const deposit = calculateDeposit(baseAmount);
  return totalWithVAT - deposit;
};

/**
 * Format price breakdown for display
 * @param {number} basePrice - Base price without VAT
 * @returns {object} Price breakdown object
 */
export const getPriceBreakdown = (basePrice) => {
  const vatAmount = calculateVATAmount(basePrice);
  const totalPrice = calculatePriceWithVAT(basePrice);

  return {
    basePrice,
    vatAmount,
    totalPrice,
    vatRate: VAT_ENABLED ? VAT_RATE : 0,
    vatEnabled: VAT_ENABLED,
  };
};

/**
 * Enable or disable VAT calculations
 * @param {boolean} enabled - Whether to enable VAT
 */
export const setVATEnabled = (enabled) => {
  // Note: This would typically be handled by environment variables
  // or admin settings in a real application
  console.warn(
    "VAT status should be configured via environment variables or admin settings"
  );
  return VAT_ENABLED;
};

export default {
  VAT_RATE,
  VAT_ENABLED,
  calculatePriceWithVAT,
  calculateVATAmount,
  calculateBasePriceFromVAT,
  calculateDeposit,
  calculateRemainingAmount,
  getPriceBreakdown,
  setVATEnabled,
};
