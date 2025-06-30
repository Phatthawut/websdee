<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
  >
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div class="mb-6">
        <svg
          class="w-16 h-16 text-green-500 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-gray-800 mb-3">
        {{ $t("payment.successTitle") }}
      </h1>
      <p class="text-gray-600 mb-6">{{ $t("payment.successMessage") }}</p>

      <div v-if="isLoading" class="flex justify-center mb-4">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fbc646]"
        ></div>
      </div>

      <div v-if="paymentStatus" class="mb-6 p-4 bg-gray-50 rounded-lg">
        <p class="text-sm font-medium">
          {{ $t("payment.status") }}:
          <span
            :class="
              paymentStatus === 'succeeded' ? 'text-green-600' : 'text-blue-600'
            "
          >
            {{
              paymentStatus === "succeeded"
                ? $t("payment.statusSucceeded")
                : $t("payment.statusProcessing")
            }}
          </span>
        </p>

        <div v-if="paymentDetails" class="mt-4 text-left">
          <p class="text-sm text-gray-700 mb-1">
            <span class="font-medium">{{ $t("payment.form.name") }}:</span>
            {{ paymentDetails.customer?.name }}
          </p>
          <p class="text-sm text-gray-700 mb-1">
            <span class="font-medium">{{ $t("payment.form.email") }}:</span>
            {{ paymentDetails.customer?.email }}
          </p>
          <p class="text-sm text-gray-700 mb-1">
            <span class="font-medium">{{ $t("payment.package") }}:</span>
            {{ paymentDetails.order?.package_name }}
          </p>
          <p class="text-sm text-gray-700 mb-1">
            <span class="font-medium">{{ $t("payment.amount") }}:</span>
            {{
              formatCurrency(
                paymentDetails.order?.final_amount || paymentDetails.amount
              )
            }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-medium">{{ $t("payment.reference") }}:</span>
            {{ paymentDetails.id }}
          </p>
        </div>
      </div>

      <div class="space-y-3">
        <router-link
          to="/"
          class="inline-block bg-[#fbc646] text-[#051d40] font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300"
        >
          {{ $t("payment.returnHome") }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { loadStripe } from "@stripe/stripe-js";

const route = useRoute();
const isLoading = ref(true);
const paymentStatus = ref("");
const paymentDetails = ref(null);

// Format currency
const formatCurrency = (amount) => {
  // Check if amount is in cents (Stripe format) and convert to whole units
  // If amount > 10000, assume it's in cents and needs to be divided by 100
  const formattedAmount = amount > 10000 ? amount / 100 : amount;

  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(formattedAmount);
};

// Store payment data in Firestore
const storePaymentData = async (sessionId, paymentIntentId, orderData) => {
  try {
    const apiUrl =
      "https://asia-southeast1-websdee-blog.cloudfunctions.net/storePaymentData";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        paymentIntentId,
        orderData,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to store payment data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error storing payment data:", error);
    return null;
  }
};

// Retrieve session details from Stripe
const retrieveSessionDetails = async (sessionId) => {
  try {
    // For security reasons, we need to retrieve session details from our backend
    const apiUrl = `https://asia-southeast1-websdee-blog.cloudfunctions.net/getSessionDetails?session_id=${sessionId}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to retrieve session details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error retrieving session details:", error);
    return null;
  }
};

onMounted(async () => {
  try {
    // Get the session_id from URL
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      // For checkout session, we assume it was successful if we got redirected here
      paymentStatus.value = "succeeded";
      console.log("Checkout session completed:", sessionId);

      // Store basic payment data
      const orderData = {
        status: "succeeded",
        amount: 0, // Will be updated with actual amount if we get session details
        currency: "thb",
        customer: {
          // These will be populated from session metadata if available
          name: "",
          email: "",
          phone: "",
        },
        order: {
          payment_type: "",
          package_name: "",
        },
        metadata: {},
      };

      // Try to retrieve session details
      try {
        // Note: This function doesn't exist yet - we'll need to create it
        // For now, we'll just store the basic data
        const sessionDetails = await retrieveSessionDetails(sessionId);

        if (sessionDetails) {
          // Update order data with session details
          orderData.amount = sessionDetails.amount_total;
          orderData.currency = sessionDetails.currency;
          orderData.metadata = sessionDetails.metadata || {};

          // Extract customer info from metadata
          if (sessionDetails.metadata) {
            orderData.customer.name = sessionDetails.metadata.customer_name;
            orderData.customer.email = sessionDetails.metadata.customer_email;
            orderData.customer.phone = sessionDetails.metadata.customer_phone;

            orderData.order.payment_type = sessionDetails.metadata.payment_type;
            orderData.order.package_name = sessionDetails.metadata.package_name;
          }

          // Set payment details for display
          paymentDetails.value = orderData;
        }
      } catch (error) {
        console.error("Error retrieving session details:", error);
      }

      // Store payment data in Firestore
      await storePaymentData(sessionId, null, orderData);
    } else {
      // Try to get payment intent info as fallback
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      const paymentIntentId = new URLSearchParams(window.location.search).get(
        "payment_intent"
      );

      if (clientSecret && paymentIntentId) {
        // Load Stripe
        const stripePublishableKey = import.meta.env
          .VITE_STRIPE_PUBLISHABLE_KEY;
        const stripe = await loadStripe(stripePublishableKey);

        // Retrieve payment intent
        const { paymentIntent } = await stripe.retrievePaymentIntent(
          clientSecret
        );

        if (paymentIntent) {
          paymentStatus.value = paymentIntent.status;

          // Create order data from payment intent
          const orderData = {
            status: paymentIntent.status,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            customer: {
              // These will be populated from payment intent metadata if available
              name: "",
              email: "",
              phone: "",
            },
            order: {
              payment_type: "",
              package_name: "",
            },
            metadata: paymentIntent.metadata || {},
          };

          // Extract customer info from metadata
          if (paymentIntent.metadata) {
            orderData.customer.name = paymentIntent.metadata.customer_name;
            orderData.customer.email = paymentIntent.metadata.customer_email;
            orderData.customer.phone = paymentIntent.metadata.customer_phone;

            orderData.order.payment_type = paymentIntent.metadata.payment_type;
            orderData.order.package_name = paymentIntent.metadata.package_name;
          }

          // Set payment details for display
          paymentDetails.value = orderData;

          // Store payment data in Firestore
          await storePaymentData(null, paymentIntentId, orderData);
        }
      }
    }
  } catch (error) {
    console.error("Error retrieving payment status:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
