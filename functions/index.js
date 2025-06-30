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

// Initialize Stripe with secret key from environment
const stripeSecretKey = defineString("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineString("STRIPE_WEBHOOK_SECRET");

// Configure for Singapore region
const regionConfig = {
  region: "asia-southeast1",
  memory: "256MiB",
  timeoutSeconds: 60,
  invoker: "public", // Allow unauthenticated access
};

// CORS wrapper function with direct header setting
const corsWrapper = (fn) => {
  return (req, res) => {
    // Always set CORS headers for all responses
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Stripe-Signature"
    );
    res.set("Access-Control-Max-Age", "3600");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    return fn(req, res);
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
      const paymentIntentOptions = {
        amount: amount, // Amount should already be in cents from frontend
        currency: currency.toLowerCase(),
        metadata: {
          ...metadata,
          source: "websdee_website",
          region: "thailand",
        },
      };

      // Use either automatic payment methods or specific payment method types
      if (payment_method_types && payment_method_types.length > 0) {
        paymentIntentOptions.payment_method_types = payment_method_types;
      } else {
        paymentIntentOptions.automatic_payment_methods = {
          enabled: true,
          allow_redirects: "never", // For simplicity, disable redirects
        };
      }

      const paymentIntent = await stripe.paymentIntents.create(
        paymentIntentOptions
      );

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

// Stripe Webhook
exports.stripeWebhook = onRequest(
  regionConfig,
  corsWrapper(async (req, res) => {
    const stripe = require("stripe")(stripeSecretKey.value());
    const endpointSecret = stripeWebhookSecret.value();

    logger.info("Received webhook event");

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
      logger.error("Webhook signature verification failed", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    logger.info("Webhook verified", { type: event.type });

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        logger.info("Payment intent succeeded", {
          paymentIntentId: paymentIntent.id,
        });
        // Handle successful payment
        break;
      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object;
        logger.info("Payment intent failed", {
          paymentIntentId: failedPaymentIntent.id,
        });
        // Handle failed payment
        break;
      case "customer.subscription.created":
        const subscription = event.data.object;
        logger.info("Subscription created", {
          subscriptionId: subscription.id,
        });
        // Handle subscription creation
        break;
      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  })
);

// Test endpoint
exports.testStripe = onRequest(
  regionConfig,
  corsWrapper(async (req, res) => {
    res.json({
      message: "Stripe API is working!",
      timestamp: new Date().toISOString(),
      region: "asia-southeast1",
    });
  })
);
