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
      </div>

      <router-link
        to="/"
        class="inline-block bg-[#fbc646] text-[#051d40] font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300"
      >
        {{ $t("payment.returnHome") }}
      </router-link>
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

onMounted(async () => {
  try {
    // Get the payment_intent and payment_intent_client_secret from URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    const paymentIntentId = new URLSearchParams(window.location.search).get(
      "payment_intent"
    );

    if (clientSecret && paymentIntentId) {
      // Load Stripe
      const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      const stripe = await loadStripe(stripePublishableKey);

      // Retrieve payment intent
      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      if (paymentIntent) {
        paymentStatus.value = paymentIntent.status;
      }
    }
  } catch (error) {
    console.error("Error retrieving payment status:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
