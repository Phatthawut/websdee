<template>
  <section id="packages" class="py-16 bg-white font-prompt">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-[#051d40]">
          {{ $t("packages.title") }}
        </h2>
        <div class="w-24 h-1 bg-[#fbc646] mx-auto mb-6"></div>
        <p class="text-gray-600 max-w-2xl mx-auto">
          {{ $t("packages.subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Starter Package -->
        <div
          class="bg-white py-8 px-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <h3 class="text-2xl font-bold mb-4 text-[#051d40]">
            {{ $t("packages.starter.title") }}
          </h3>
          <div class="text-[#fbc646] text-4xl font-bold mb-2">
            {{ $t("packages.starter.price") }}
          </div>
          <p class="text-gray-500 mb-6">
            {{ $t("packages.starter.description") }}
          </p>
          <ul class="mb-8 space-y-3">
            <li
              v-for="(feature, index) in starterFeatures"
              :key="index"
              class="flex items-center"
            >
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div class="w-full">
                {{ feature }}
              </div>
            </li>
          </ul>
          <div class="space-y-2">
            <button
              @click="openPaymentModal('starter', 'full')"
              class="w-full bg-[#051d40] text-white py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
            >
              {{ $t("packages.starter.payNow") }}
            </button>
            <button
              @click="openPaymentModal('starter', 'deposit')"
              class="w-full border-2 border-[#051d40] text-[#051d40] py-3 rounded-md font-medium hover:bg-[#051d40] hover:text-white transition duration-300"
            >
              {{ $t("packages.starter.payDeposit") }}
            </button>
          </div>
        </div>

        <!-- E-commerce Package -->
        <div
          class="bg-[#051d40] bg-opacity-5 py-8 px-4 rounded-lg shadow-md border border-[#051d40] border-opacity-20 transform scale-105 relative"
        >
          <div
            class="absolute top-0 right-0 bg-[#fbc646] text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium"
          >
            {{ $t("packages.recommended") || "แนะนำ" }}
          </div>
          <h3 class="text-2xl font-bold mb-4 text-white">
            {{ $t("packages.ecommerce.title") }}
          </h3>
          <div class="text-[#fbc646] text-4xl font-bold mb-2">
            {{ $t("packages.ecommerce.price") }}
          </div>
          <p class="text-gray-500 mb-6">
            {{ $t("packages.ecommerce.description") }}
          </p>
          <ul class="mb-8 space-y-3 text-white">
            <li
              v-for="(feature, index) in ecommerceFeatures"
              :key="index"
              class="flex items-center"
            >
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div class="w-full">
                {{ feature }}
              </div>
            </li>
          </ul>
          <div class="space-y-2">
            <button
              @click="openPaymentModal('ecommerce', 'full')"
              class="w-full bg-[#fbc646] text-[#051d40] py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300"
            >
              {{ $t("packages.ecommerce.payNow") }}
            </button>
            <button
              @click="openPaymentModal('ecommerce', 'deposit')"
              class="w-full border-2 border-[#fbc646] text-[#fbc646] py-3 rounded-md font-medium hover:bg-[#fbc646] hover:text-[#051d40] transition duration-300"
            >
              {{ $t("packages.ecommerce.payDeposit") }}
            </button>
          </div>
        </div>

        <!-- Premium Package -->
        <div
          class="bg-white py-8 px-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <h3 class="text-2xl font-bold mb-4 text-[#051d40]">
            {{ $t("packages.premium.title") }}
          </h3>
          <div class="text-[#fbc646] text-4xl font-bold mb-2">
            {{ $t("packages.premium.price") }}
          </div>
          <p class="text-gray-500 mb-6">
            {{ $t("packages.premium.description") }}
          </p>
          <ul class="mb-8 space-y-3">
            <li
              v-for="(feature, index) in premiumFeatures"
              :key="index"
              class="flex items-center"
            >
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div class="w-full">
                {{ feature }}
              </div>
            </li>
          </ul>
          <div class="space-y-2">
            <button
              @click="openPaymentModal('premium', 'full')"
              class="w-full bg-[#051d40] text-white py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
            >
              {{ $t("packages.premium.payNow") }}
            </button>
            <button
              @click="openPaymentModal('premium', 'deposit')"
              class="w-full border-2 border-[#051d40] text-[#051d40] py-3 rounded-md font-medium hover:bg-[#051d40] hover:text-white transition duration-300"
            >
              {{ $t("packages.premium.payDeposit") }}
            </button>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <p class="text-gray-600 mb-4">
          {{
            $t("packages.customMessage") ||
            "ต้องการแพ็กเกจที่กำหนดเอง? ติดต่อเราสำหรับโซลูชันที่ปรับแต่งตามความต้องการของคุณ"
          }}
        </p>
        <router-link
          to="/contact"
          class="inline-block bg-[#051d40] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
        >
          {{ $t("contact.title") }}
        </router-link>
      </div>
    </div>

    <!-- Payment Modal -->
    <PaymentModal
      v-if="selectedPackage"
      :is-open="isPaymentModalOpen"
      :package-data="selectedPackage"
      @close="closePaymentModal"
      @payment-success="handlePaymentSuccess"
      @payment-error="handlePaymentError"
    />
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import PaymentModal from "./PaymentModal.vue";

const { t, locale, messages } = useI18n();

// Payment modal state
const isPaymentModalOpen = ref(false);
const selectedPackage = ref(null);
const selectedPaymentType = ref("full");

// Package data
const packageData = computed(() => ({
  starter: {
    id: "starter",
    title: t("packages.starter.title"),
    price: t("packages.starter.price"),
    priceUSD: t("packages.starter.priceUSD"),
    features: starterFeatures.value,
  },
  ecommerce: {
    id: "ecommerce",
    title: t("packages.ecommerce.title"),
    price: t("packages.ecommerce.price"),
    priceUSD: t("packages.ecommerce.priceUSD"),
    features: ecommerceFeatures.value,
  },
  premium: {
    id: "premium",
    title: t("packages.premium.title"),
    price: t("packages.premium.price"),
    priceUSD: t("packages.premium.priceUSD"),
    features: premiumFeatures.value,
  },
}));

const starterFeatures = computed(() => {
  const features = messages.value[locale.value]?.packages?.starter?.features;
  return Array.isArray(features) ? features : [];
});

const ecommerceFeatures = computed(() => {
  const features = messages.value[locale.value]?.packages?.ecommerce?.features;
  return Array.isArray(features) ? features : [];
});

const premiumFeatures = computed(() => {
  const features = messages.value[locale.value]?.packages?.premium?.features;
  return Array.isArray(features) ? features : [];
});

// Methods
const openPaymentModal = (packageType, paymentType = "full") => {
  selectedPackage.value = packageData.value[packageType];
  selectedPaymentType.value = paymentType;
  isPaymentModalOpen.value = true;
};

const closePaymentModal = () => {
  isPaymentModalOpen.value = false;
  selectedPackage.value = null;
  selectedPaymentType.value = "full";
};

const handlePaymentSuccess = (paymentData) => {
  console.log("Payment successful:", paymentData);
  closePaymentModal();

  // Show success message
  alert(
    t("payment.success") ||
      "Payment successful! We will contact you shortly to begin your project."
  );

  // Here you could:
  // 1. Send confirmation email
  // 2. Create project in your system
  // 3. Redirect to success page
  // 4. Update user dashboard
};

const handlePaymentError = (error) => {
  console.error("Payment error:", error);
  alert(
    t("payment.error") || "Payment failed. Please try again or contact support."
  );
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap");
</style>
