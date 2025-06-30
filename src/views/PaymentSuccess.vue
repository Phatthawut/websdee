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

      <div
        v-if="paymentStore.paymentStatus"
        class="mb-6 p-4 bg-gray-50 rounded-lg"
      >
        <p class="text-sm font-medium">
          {{ $t("payment.status") }}:
          <span
            :class="
              paymentStore.paymentStatus === 'succeeded'
                ? 'text-green-600'
                : 'text-blue-600'
            "
          >
            {{
              paymentStore.paymentStatus === "succeeded"
                ? $t("payment.statusSucceeded")
                : $t("payment.statusProcessing")
            }}
          </span>
        </p>

        <div v-if="paymentStore.currentPaymentDetails" class="mt-4 text-left">
          <p class="text-sm text-gray-700 mb-1">
            <span class="font-medium">{{ $t("payment.form.name") }}:</span>
            {{ paymentStore.currentPaymentDetails.customer?.name }}
          </p>
          <p class="text-sm text-gray-700 mb-1">
            <span class="font-medium">{{ $t("payment.form.email") }}:</span>
            {{ paymentStore.currentPaymentDetails.customer?.email }}
          </p>
          <p class="text-sm text-gray-700 mb-1">
            <span class="font-medium">{{ $t("payment.package") }}:</span>
            {{ paymentStore.currentPaymentDetails.order?.package_name }}
          </p>
          <p class="text-sm text-gray-700 mb-1">
            <span class="font-medium">{{ $t("payment.amount") }}:</span>
            {{
              formatCurrency(
                paymentStore.currentPaymentDetails.order?.final_amount ||
                  paymentStore.currentPaymentDetails.amount
              )
            }}
          </p>
          <p class="text-sm text-gray-700">
            <span class="font-medium">{{ $t("payment.reference") }}:</span>
            {{ paymentStore.currentPaymentDetails.id }}
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
import { usePaymentStore } from "@/stores/paymentStore";

const route = useRoute();
const isLoading = ref(true);
const paymentStore = usePaymentStore();

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

onMounted(async () => {
  try {
    // Get the session_id from URL
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      // For checkout session, we assume it was successful if we got redirected here
      paymentStore.paymentStatus = "succeeded";
      console.log("Checkout session completed:", sessionId);

      // Store basic payment data
      const orderData = {
        status: "succeeded",
        amount: 0, // Will be updated with actual amount if we get session details
        currency: "thb",
        id: sessionId,
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
        const sessionDetails = await paymentStore.retrieveSessionDetails(
          sessionId
        );

        if (sessionDetails) {
          // The payment store already updated currentPaymentDetails
          console.log("Session details retrieved successfully");
        }
      } catch (error) {
        console.error("Error retrieving session details:", error);
      }

      // Store payment data in Firestore
      await paymentStore.storePaymentData(sessionId, null, orderData);
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
          paymentStore.paymentStatus = paymentIntent.status;

          // Create order data from payment intent
          const orderData = {
            status: paymentIntent.status,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            id: paymentIntentId,
            customer: {
              // These will be populated from payment intent metadata if available
              name: paymentIntent.metadata?.customer_name || "",
              email: paymentIntent.metadata?.customer_email || "",
              phone: paymentIntent.metadata?.customer_phone || "",
            },
            order: {
              payment_type: paymentIntent.metadata?.payment_type || "",
              package_name: paymentIntent.metadata?.package_name || "",
            },
            metadata: paymentIntent.metadata || {},
          };

          // Set current payment details
          paymentStore.setCurrentPaymentDetails(orderData);

          // Store payment data in Firestore
          await paymentStore.storePaymentData(null, paymentIntentId, orderData);
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
