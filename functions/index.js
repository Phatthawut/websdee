/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { defineString } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const cors = require("cors")({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://websdee.com",
    "https://www.websdee.com",
    // Add your actual production domain here when you deploy
    // "https://your-production-domain.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Stripe-Signature"],
});

// Initialize Stripe with secret key from environment
const stripeSecretKey = defineString("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineString("STRIPE_WEBHOOK_SECRET");

// Configure for Singapore region
const regionConfig = {
  region: "asia-southeast1",
  memory: "256MiB",
  timeoutSeconds: 60,
  cors: true,
};

// CORS wrapper function
const corsWrapper = (fn) => {
  return (req, res) => {
    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", req.headers.origin || "*");
      res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.set("Access-Control-Max-Age", "3600");
      return res.status(204).send("");
    }

    return cors(req, res, () => fn(req, res));
  };
};

// Create Payment Intent
exports.createPaymentIntent = onRequest(
  regionConfig,
  corsWrapper(async (req, res) => {
    const stripe = require("stripe")(stripeSecretKey.value());

    logger.info("Creating payment intent", { body: req.body });

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const { amount, currency, payment_method_types, metadata } = req.body;

      // Validate required fields
      if (!amount || !currency) {
        return res.status(400).json({
          error: "Missing required fields: amount, currency",
        });
      }

      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Amount should already be in cents from frontend
        currency: currency.toLowerCase(),
        payment_method_types: payment_method_types || ["card"],
        metadata: {
          ...metadata,
          source: "websdee_website",
          region: "thailand",
        },
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never", // For simplicity, disable redirects
        },
      });

      logger.info("Payment intent created", {
        paymentIntentId: paymentIntent.id,
        amount: amount,
        currency: currency,
      });

      res.json({
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
      });
    } catch (error) {
      logger.error("Error creating payment intent", error);
      res.status(500).json({
        error: "Failed to create payment intent",
        message: error.message,
      });
    }
  })
);

// Create Customer
exports.createCustomer = onRequest(
  regionConfig,
  corsWrapper(async (req, res) => {
    const stripe = require("stripe")(stripeSecretKey.value());

    logger.info("Creating customer", { body: req.body });

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const { email, name, phone, address } = req.body;

      // Validate required fields
      if (!email) {
        return res.status(400).json({
          error: "Missing required field: email",
        });
      }

      // Create customer
      const customer = await stripe.customers.create({
        email,
        name,
        phone,
        address,
        metadata: {
          source: "websdee_website",
          region: "thailand",
        },
      });

      logger.info("Customer created", { customerId: customer.id, email });

      res.json({
        customer_id: customer.id,
        email: customer.email,
      });
    } catch (error) {
      logger.error("Error creating customer", error);
      res.status(500).json({
        error: "Failed to create customer",
        message: error.message,
      });
    }
  })
);

// Create Subscription
exports.createSubscription = onRequest(
  regionConfig,
  corsWrapper(async (req, res) => {
    const stripe = require("stripe")(stripeSecretKey.value());

    logger.info("Creating subscription", { body: req.body });

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const { customer_id, price_id } = req.body;

      // Validate required fields
      if (!customer_id || !price_id) {
        return res.status(400).json({
          error: "Missing required fields: customer_id, price_id",
        });
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer_id,
        items: [{ price: price_id }],
        payment_behavior: "default_incomplete",
        payment_settings: {
          save_default_payment_method: "on_subscription",
        },
        expand: ["latest_invoice.payment_intent"],
        metadata: {
          source: "websdee_website",
          region: "thailand",
        },
      });

      logger.info("Subscription created", {
        subscriptionId: subscription.id,
        customerId: customer_id,
      });

      res.json({
        subscription_id: subscription.id,
        client_secret: subscription.latest_invoice.payment_intent.client_secret,
      });
    } catch (error) {
      logger.error("Error creating subscription", error);
      res.status(500).json({
        error: "Failed to create subscription",
        message: error.message,
      });
    }
  })
);

// Handle Stripe Webhooks
exports.stripeWebhook = onRequest(regionConfig, async (req, res) => {
  const stripe = require("stripe")(stripeSecretKey.value());
  const endpointSecret = stripeWebhookSecret.value();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    logger.info("Webhook verified", { type: event.type, id: event.id });
  } catch (err) {
    logger.error("Webhook signature verification failed", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        logger.info("Payment succeeded", {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        });

        // TODO: Update your database, send confirmation email, etc.
        // You can integrate with Firestore here to update order status
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        logger.warn("Payment failed", {
          paymentIntentId: failedPayment.id,
          lastPaymentError: failedPayment.last_payment_error,
        });

        // TODO: Handle failed payment
        break;

      case "invoice.payment_succeeded":
        const invoice = event.data.object;
        logger.info("Subscription payment succeeded", {
          invoiceId: invoice.id,
          subscriptionId: invoice.subscription,
        });

        // TODO: Update subscription status in your database
        break;

      case "customer.subscription.deleted":
        const subscription = event.data.object;
        logger.info("Subscription canceled", {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
        });

        // TODO: Handle subscription cancellation
        break;

      default:
        logger.info("Unhandled event type", { type: event.type });
    }

    res.json({ received: true });
  } catch (error) {
    logger.error("Error handling webhook", error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
});

// Test endpoint to verify functions are working
exports.testStripe = onRequest(
  regionConfig,
  corsWrapper(async (req, res) => {
    logger.info("Test endpoint called");

    res.json({
      message: "Stripe Firebase Functions are working!",
      region: "asia-southeast1",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  })
);
