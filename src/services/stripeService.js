import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
// TODO: Add your Stripe publishable key to environment variables
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

// Check if Stripe is properly configured
const isStripeConfigured = () => {
  return !!stripePublishableKey;
};

// VAT rate for Thailand
const VAT_RATE = 0.07;

// Exchange rate USD to THB (update regularly or use API)
const USD_TO_THB = 35;

// Package pricing in USD (base prices)
export const PACKAGE_PRICES_USD = {
  starter: 99,
  ecommerce: 145,
  premium: 455,
};

// Convert USD to THB with VAT
export const calculateTHBPrice = (usdPrice) => {
  const thbPrice = usdPrice * USD_TO_THB;
  const priceWithVAT = thbPrice * (1 + VAT_RATE);
  return Math.round(priceWithVAT);
};

// Package pricing in THB (base prices - VAT will be added during payment)
export const PACKAGE_PRICES_THB = {
  starter: 3000,
  ecommerce: 4500,
  premium: 15000,
};

// Add-on services pricing (THB including VAT)
export const ADDON_PRICES_THB = {
  domain: 450,
  extraPage: 590,
  sslCertificate: 990,
  ecommerceIntegration: 1990,
  multiLanguage: 2990,
  advancedSEO: 3490,
  logoDesign: 1990,
};

// Maintenance subscription plans (THB per month including VAT)
export const MAINTENANCE_PLANS_THB = {
  basic: 990,
  pro: 1990,
  enterprise: 3490,
};

// Create payment intent for one-time payments
export const createPaymentIntent = async (
  amount,
  currency = "thb",
  paymentMethodTypes = ["card", "promptpay"],
  metadata = {}
) => {
  if (!isStripeConfigured()) {
    throw new Error(
      "Stripe is not configured. Please set VITE_STRIPE_PUBLISHABLE_KEY environment variable."
    );
  }

  try {
    // Use Firebase Functions URL for production or localhost for emulator
    const apiUrl = "https://createpaymentintent-vno4kd46yq-as.a.run.app";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Stripe uses cents
        currency: currency.toLowerCase(),
        payment_method_types: paymentMethodTypes,
        metadata: {
          vat_included: "true",
          vat_rate: VAT_RATE.toString(),
          ...metadata,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create payment intent");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

// Create subscription for maintenance plans
export const createSubscription = async (priceId, customerId) => {
  try {
    // Use Firebase Functions URL for production or localhost for emulator
    const apiUrl = "https://createsubscription-vno4kd46yq-as.a.run.app";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_id: priceId,
        customer_id: customerId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create subscription");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
};

// Process payment with Stripe
export const processPayment = async (paymentData) => {
  if (!isStripeConfigured()) {
    throw new Error(
      "Stripe is not configured. Please set VITE_STRIPE_PUBLISHABLE_KEY environment variable."
    );
  }

  const stripe = await stripePromise;

  try {
    const { clientSecret, amount, currency, paymentType } = paymentData;

    if (paymentType === "full") {
      // Full payment
      const result = await stripe.confirmCardPayment(clientSecret);
      return result;
    } else if (paymentType === "deposit") {
      // 50% deposit payment
      const depositAmount = Math.round(amount * 0.5);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // Card details will be collected by Stripe Elements
          },
        },
      });
      return result;
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};

// Create customer for subscription billing
export const createCustomer = async (customerData) => {
  try {
    // Use Firebase Functions URL for production or localhost for emulator
    const apiUrl = "https://createcustomer-vno4kd46yq-as.a.run.app";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error("Failed to create customer");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

// Get available payment methods for Thai market
export const getThaiPaymentMethods = () => {
  return [
    {
      id: "card",
      name: "Credit/Debit Card",
      nameEN: "Credit/Debit Card",
      nameTH: "บัตรเครดิต/เดบิต",
      icon: "💳",
      popular: false,
    },
    {
      id: "promptpay",
      name: "PromptPay",
      nameEN: "PromptPay",
      nameTH: "พร้อมเพย์",
      icon: "📱",
      popular: true,
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      nameEN: "Bank Transfer",
      nameTH: "โอนเงินผ่านธนาคาร",
      icon: "🏦",
      popular: true,
    },
  ];
};

// Format currency for display
export const formatCurrency = (amount, currency = "THB", locale = "th-TH") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Calculate price with VAT (7% Thai VAT)
export const calculatePriceWithVAT = (basePrice) => {
  return Math.round(basePrice * (1 + VAT_RATE));
};

// Calculate VAT amount
export const calculateVATAmount = (basePrice) => {
  return Math.round(basePrice * VAT_RATE);
};

// Calculate deposit amount (50% of total including VAT)
export const calculateDeposit = (baseAmount) => {
  const totalWithVAT = calculatePriceWithVAT(baseAmount);
  return Math.round(totalWithVAT * 0.5);
};

// Calculate remaining amount after deposit
export const calculateRemainingAmount = (baseAmount) => {
  const totalWithVAT = calculatePriceWithVAT(baseAmount);
  const deposit = calculateDeposit(baseAmount);
  return totalWithVAT - deposit;
};

export default {
  createPaymentIntent,
  createSubscription,
  processPayment,
  createCustomer,
  getThaiPaymentMethods,
  formatCurrency,
  calculatePriceWithVAT,
  calculateVATAmount,
  calculateDeposit,
  calculateRemainingAmount,
  isStripeConfigured,
  PACKAGE_PRICES_THB,
  ADDON_PRICES_THB,
  MAINTENANCE_PLANS_THB,
  VAT_RATE,
};
