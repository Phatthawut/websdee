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

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5174",
  "https://websdee.com",
  "https://www.websdee.com",
];

// CORS wrapper function with origin checking
const corsWrapper = (fn) => {
  return (req, res) => {
    const origin = req.headers.origin;

    // Check if origin is allowed
    if (origin && allowedOrigins.includes(origin)) {
      res.set("Access-Control-Allow-Origin", origin);
    } else if (!origin) {
      // Allow requests with no origin (like curl or Stripe webhooks)
      res.set("Access-Control-Allow-Origin", "*");
    } else {
      // For non-OPTIONS requests with disallowed origin, continue but don't set CORS headers
      // For OPTIONS requests with disallowed origin, reject with 403
      if (req.method === "OPTIONS") {
        res.status(403).send("Forbidden by CORS policy");
        return;
      }
    }

    // Set other CORS headers
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Stripe-Signature"
    );
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Max-Age", "3600");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    return fn(req, res);
  };
};

// Initialize Firestore
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Initialize Firebase Admin
const admin = initializeApp();
const db = getFirestore();

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

        // Store payment data in Firestore
        try {
          await storePaymentData(paymentIntent, "payment_intent");
          logger.info("Payment data stored successfully", {
            paymentIntentId: paymentIntent.id,
          });
        } catch (error) {
          logger.error("Error storing payment data", error);
        }
        break;

      case "checkout.session.completed":
        const session = event.data.object;
        logger.info("Checkout session completed", {
          sessionId: session.id,
        });

        // Store payment data in Firestore
        try {
          await storePaymentData(session, "checkout_session");
          logger.info("Checkout session data stored successfully", {
            sessionId: session.id,
          });
        } catch (error) {
          logger.error("Error storing checkout session data", error);
        }
        break;

      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object;
        logger.info("Payment intent failed", {
          paymentIntentId: failedPaymentIntent.id,
        });
        break;

      case "customer.subscription.created":
        const subscription = event.data.object;
        logger.info("Subscription created", {
          subscriptionId: subscription.id,
        });
        break;

      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  })
);

// Helper function to store payment data in Firestore
async function storePaymentData(paymentData, type) {
  try {
    // Extract customer information from metadata
    const metadata = paymentData.metadata || {};

    // Create a document in the payments collection
    const paymentRef = db.collection("payments").doc(paymentData.id);

    // Create payment record
    const paymentRecord = {
      id: paymentData.id,
      type: type,
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: paymentData.status,
      payment_method:
        paymentData.payment_method_types || paymentData.payment_method,
      created: new Date(paymentData.created * 1000),
      metadata: metadata,

      // Customer information
      customer: {
        name: metadata.customer_name,
        email: metadata.customer_email,
        phone: metadata.customer_phone,
        company: metadata.customer_company,
      },

      // Order information
      order: {
        package_name: metadata.package_name,
        package_type: metadata.package_type,
        payment_type: metadata.payment_type,
        base_amount: parseInt(metadata.base_amount) || 0,
        addons_total: parseInt(metadata.addons_total) || 0,
        discount_applied: metadata.discount_applied,
        vat_amount: parseInt(metadata.vat_amount) || 0,
        final_amount: parseInt(metadata.final_amount) || paymentData.amount,
        addons_selected: metadata.addons_selected,
        project_requirements: metadata.project_requirements,
        order_status: metadata.order_status,
        delivery_status: metadata.delivery_status,
        project_status: metadata.project_status,
      },

      // Updated timestamp
      updated_at: new Date(),
    };

    // Save to Firestore
    await paymentRef.set(paymentRecord);

    return paymentRecord;
  } catch (error) {
    logger.error("Error storing payment data", error);
    throw error;
  }
}

// Store Payment Data (can be called directly from client)
exports.storePaymentData = onRequest(
  regionConfig,
  corsWrapper(async (req, res) => {
    logger.info("Storing payment data", { body: req.body });

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const { sessionId, paymentIntentId, orderData } = req.body;

      if (!sessionId && !paymentIntentId) {
        return res.status(400).json({
          error: "Missing required field: sessionId or paymentIntentId",
        });
      }

      if (!orderData) {
        return res.status(400).json({
          error: "Missing required field: orderData",
        });
      }

      // Use session ID or payment intent ID as document ID
      const docId = sessionId || paymentIntentId;

      // Store in Firestore
      const paymentRef = db.collection("payments").doc(docId);

      // Create payment record with client-side data
      const paymentRecord = {
        id: docId,
        type: sessionId ? "checkout_session" : "payment_intent",
        ...orderData,
        created_at: new Date(),
        updated_at: new Date(),
        source: "client_submission",
      };

      // Save to Firestore
      await paymentRef.set(paymentRecord, { merge: true });

      logger.info("Payment data stored successfully", { docId });

      res.json({
        success: true,
        message: "Payment data stored successfully",
        paymentId: docId,
      });
    } catch (error) {
      logger.error("Error storing payment data", error);
      res.status(500).json({
        error: "Failed to store payment data",
        message: error.message,
      });
    }
  })
);

// Store Bank Transfer Data
exports.storeBankTransferData = onRequest(
  regionConfig,
  corsWrapper(async (req, res) => {
    logger.info("Storing bank transfer data", { body: req.body });

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const { reference, orderData } = req.body;

      if (!reference) {
        return res.status(400).json({
          error: "Missing required field: reference",
        });
      }

      if (!orderData) {
        return res.status(400).json({
          error: "Missing required field: orderData",
        });
      }

      // Store in unified payments collection only
      const paymentRef = db.collection("payments").doc(reference);

      // Create bank transfer record
      const bankTransferRecord = {
        id: reference,
        reference_number: reference,
        type: "bank_transfer",
        status: "pending_payment",
        payment_method: "bank_transfer",
        amount: orderData.final_amount,
        currency: orderData.currency || "THB",
        created_at: new Date(),
        updated_at: new Date(),
        source: "websdee_website",

        // Customer information
        customer: {
          name: orderData.customer_name,
          email: orderData.customer_email,
          phone: orderData.customer_phone,
          company: orderData.customer_company || "",
        },

        // Order information
        order: {
          package_name: orderData.package_name,
          package_type: orderData.package_type,
          payment_type: orderData.payment_type,
          base_amount: orderData.base_amount,
          addons_total: orderData.addons_total,
          discount_applied: orderData.discount_applied,
          final_amount: orderData.final_amount,
          addons_selected: orderData.addons_selected,
          project_requirements: orderData.project_requirements,
          order_status: orderData.order_status,
          delivery_status: orderData.delivery_status,
          project_status: orderData.project_status,
        },

        // Bank transfer specific information
        bank_details: {
          bank_name: "ธนาคารทหารไทยธนชาต (TMB Bank)",
          account_name: "น.ส. พัชรีรัตน์ จันทวงศ์",
          account_number: "621-2-54406-5",
          branch: "เซ็นทรัลพลาซ่า เชียงใหม่ แอร์พอร์ต",
        },

        // Metadata
        metadata: orderData,
      };

      // Save to Firestore - only in payments collection
      await paymentRef.set(bankTransferRecord);

      logger.info("Bank transfer data stored successfully", { reference });

      res.json({
        success: true,
        message:
          "Bank transfer data stored successfully in payments collection",
        reference: reference,
        payment_id: reference,
      });
    } catch (error) {
      logger.error("Error storing bank transfer data", error);
      res.status(500).json({
        error: "Failed to store bank transfer data",
        message: error.message,
      });
    }
  })
);

// Get Session Details
exports.getSessionDetails = onRequest(
  regionConfig,
  corsWrapper(async (req, res) => {
    logger.info("Getting session details", { query: req.query });

    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const sessionId = req.query.session_id;

      if (!sessionId) {
        return res.status(400).json({
          error: "Missing required query parameter: session_id",
        });
      }

      // Initialize Stripe
      const stripe = require("stripe")(stripeSecretKey.value());

      // Retrieve session with line items and customer details
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "customer"],
      });

      // Check if session exists in Firestore
      const paymentRef = db.collection("payments").doc(sessionId);
      const paymentDoc = await paymentRef.get();

      // If session exists in Firestore, return the stored data
      if (paymentDoc.exists) {
        const paymentData = paymentDoc.data();

        // Merge Stripe session data with stored data
        const responseData = {
          ...session,
          stored_data: paymentData,
        };

        res.json(responseData);
      } else {
        // If session doesn't exist in Firestore, return just the Stripe data
        res.json(session);
      }
    } catch (error) {
      logger.error("Error getting session details", error);
      res.status(500).json({
        error: "Failed to get session details",
        message: error.message,
      });
    }
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

// Create Checkout Session
exports.createCheckoutSession = onRequest(
  regionConfig,
  corsWrapper(async (req, res) => {
    const stripe = require("stripe")(stripeSecretKey.value());

    logger.info("Creating checkout session", { body: req.body });

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const {
        amount,
        currency,
        payment_method_types,
        metadata,
        success_url,
        cancel_url,
      } = req.body;

      // Validate required fields
      if (!amount || !currency || !success_url) {
        return res.status(400).json({
          error: "Missing required fields: amount, currency, success_url",
        });
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: payment_method_types || ["card", "promptpay"],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: metadata.package_name || "Website Package",
                description: `${
                  metadata.payment_type === "full"
                    ? "Full Payment"
                    : "50% Deposit"
                } for ${metadata.package_name || "Website Package"}`,
                metadata: metadata,
              },
              unit_amount: amount * 100, // Stripe uses cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: success_url,
        cancel_url: cancel_url || success_url,
        metadata: metadata,
      });

      logger.info("Checkout session created", {
        sessionId: session.id,
        amount: amount,
        currency: currency,
      });

      res.json({
        sessionId: session.id,
        url: session.url,
      });
    } catch (error) {
      logger.error("Error creating checkout session", error);
      res.status(500).json({
        error: "Failed to create checkout session",
        message: error.message,
      });
    }
  })
);
