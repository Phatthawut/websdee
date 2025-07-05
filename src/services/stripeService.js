import { loadStripe } from "@stripe/stripe-js";
import secureLogger from "@/utils/secureLogger";

// Initialize Stripe with your publishable key
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Log warning if key is missing
if (!stripePublishableKey) {
  secureLogger.warn(
    "Stripe publishable key is missing. Payment features will not work."
  );
}

// Initialize Stripe
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

// Create Stripe Elements instance for payment
const createElements = async (stripe, clientSecret) => {
  // Create a temporary div to mount Elements
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  document.body.appendChild(tempDiv);

  // Create Elements instance
  const elements = stripe.elements({
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  });

  // Create and mount the Payment Element
  const paymentElement = elements.create("payment");
  paymentElement.mount(tempDiv);

  return elements;
};

// Check if Stripe is properly configured
const isStripeConfigured = () => {
  return !!stripePublishableKey;
};

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
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe not initialized");
    }

    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        metadata,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { clientSecret } = await response.json();
    return { clientSecret };
  } catch (error) {
    secureLogger.error("Error creating payment intent", error);
    throw error;
  }
};

// Create subscription for maintenance plans
export const createSubscription = async (priceId, customerId) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe not initialized");
    }

    const response = await fetch("/api/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        customerId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const subscription = await response.json();
    return subscription;
  } catch (error) {
    secureLogger.error("Error creating subscription", error);
    throw error;
  }
};

// Create checkout session for a more reliable payment flow
export const createCheckoutSession = async (
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
    const apiUrl =
      "https://asia-southeast1-websdee-blog.cloudfunctions.net/createCheckoutSession";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount, // The function will multiply by 100
        currency: currency.toLowerCase(),
        payment_method_types: paymentMethodTypes,
        metadata: {
          // VAT disabled
          vat_included: "false",
          ...metadata,
        },
        success_url: `${window.location.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}&payment_method=stripe`,
        cancel_url: `${window.location.origin}/`,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating checkout session:", error);
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

  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe not initialized");
    }

    secureLogger.log("Processing payment", {
      paymentType: paymentData.paymentType,
      currency: paymentData.currency,
      amount: "***", // Mask the amount
    });

    // Create checkout session
    const session = await createCheckoutSession(
      paymentData.amount,
      paymentData.currency,
      [paymentData.paymentMethodType],
      paymentData.metadata
    );

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  } catch (error) {
    secureLogger.error("Error processing payment", error);
    throw error;
  }
};

// Create customer for subscription billing
export const createCustomer = async (customerData) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe not initialized");
    }

    const response = await fetch("/api/create-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const customer = await response.json();
    secureLogger.log("Customer created successfully", {
      customerId: customer.id,
    });
    return customer;
  } catch (error) {
    secureLogger.error("Error creating customer", error);
    throw error;
  }
};

// Get available payment methods for Thailand
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

export default {
  createPaymentIntent,
  createSubscription,
  processPayment,
  createCustomer,
  getThaiPaymentMethods,
  formatCurrency,
  isStripeConfigured,
  PACKAGE_PRICES_THB,
  ADDON_PRICES_THB,
  MAINTENANCE_PLANS_THB,
};
