<template>
  <section id="maintenance" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-[#051d40]">
          {{ $t("maintenance.title") }}
        </h2>
        <div class="w-24 h-1 bg-[#fbc646] mx-auto mb-6"></div>
        <p class="text-gray-600 max-w-2xl mx-auto">
          {{ $t("maintenance.subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Basic Plan -->
        <div
          class="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 text-[#051d40]">
              {{ $t("maintenance.basic.title") }}
            </h3>
            <div class="text-[#fbc646] text-3xl font-bold mb-4">
              {{ $t("maintenance.basic.price") }}
            </div>
            <ul class="mb-6 space-y-3">
              <li
                v-for="(feature, index) in $t('maintenance.basic.features')"
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
                <span>{{ feature }}</span>
              </li>
            </ul>
            <button
              @click="subscribeToPlan('basic')"
              :disabled="isProcessing"
              class="w-full bg-[#051d40] text-white py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300 disabled:opacity-50"
            >
              <span v-if="isProcessing && selectedPlan === 'basic'">
                {{ $t("payment.processing") }}
              </span>
              <span v-else>{{
                $t("maintenance.subscribe") || "Subscribe"
              }}</span>
            </button>
          </div>
        </div>

        <!-- Pro Plan (Recommended) -->
        <div
          class="bg-[#051d40] bg-opacity-5 rounded-lg shadow-md border border-[#051d40] border-opacity-20 transform scale-105 relative"
        >
          <div
            class="absolute top-0 right-0 bg-[#fbc646] text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium"
          >
            {{ $t("packages.recommended") }}
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 text-[#051d40]">
              {{ $t("maintenance.pro.title") }}
            </h3>
            <div class="text-[#fbc646] text-3xl font-bold mb-4">
              {{ $t("maintenance.pro.price") }}
            </div>
            <ul class="mb-6 space-y-3">
              <li
                v-for="(feature, index) in $t('maintenance.pro.features')"
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
                <span>{{ feature }}</span>
              </li>
            </ul>
            <button
              @click="subscribeToPlan('pro')"
              :disabled="isProcessing"
              class="w-full bg-[#fbc646] text-[#051d40] py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300 disabled:opacity-50"
            >
              <span v-if="isProcessing && selectedPlan === 'pro'">
                {{ $t("payment.processing") }}
              </span>
              <span v-else>{{
                $t("maintenance.subscribe") || "Subscribe"
              }}</span>
            </button>
          </div>
        </div>

        <!-- Enterprise Plan -->
        <div
          class="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 text-[#051d40]">
              {{ $t("maintenance.enterprise.title") }}
            </h3>
            <div class="text-[#fbc646] text-3xl font-bold mb-4">
              {{ $t("maintenance.enterprise.price") }}
            </div>
            <ul class="mb-6 space-y-3">
              <li
                v-for="(feature, index) in $t(
                  'maintenance.enterprise.features'
                )"
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
                <span>{{ feature }}</span>
              </li>
            </ul>
            <button
              @click="subscribeToPlan('enterprise')"
              :disabled="isProcessing"
              class="w-full bg-[#051d40] text-white py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300 disabled:opacity-50"
            >
              <span v-if="isProcessing && selectedPlan === 'enterprise'">
                {{ $t("payment.processing") }}
              </span>
              <span v-else>{{
                $t("maintenance.subscribe") || "Subscribe"
              }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Features Comparison Table -->
      <div class="mt-12">
        <h3 class="text-2xl font-bold text-center mb-8 text-[#051d40]">
          {{ $t("maintenance.compare") || "Compare Plans" }}
        </h3>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-lg shadow-md">
            <thead class="bg-[#051d40] text-white">
              <tr>
                <th class="px-6 py-4 text-left">
                  {{ $t("maintenance.features") || "Features" }}
                </th>
                <th class="px-6 py-4 text-center">
                  {{ $t("maintenance.basic.title") }}
                </th>
                <th class="px-6 py-4 text-center">
                  {{ $t("maintenance.pro.title") }}
                </th>
                <th class="px-6 py-4 text-center">
                  {{ $t("maintenance.enterprise.title") }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="feature in comparisonFeatures"
                :key="feature.name"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 font-medium">{{ feature.name }}</td>
                <td class="px-6 py-4 text-center">
                  <span v-if="feature.basic" class="text-green-500">✓</span>
                  <span v-else class="text-gray-300">—</span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span v-if="feature.pro" class="text-green-500">✓</span>
                  <span v-else class="text-gray-300">—</span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span v-if="feature.enterprise" class="text-green-500"
                    >✓</span
                  >
                  <span v-else class="text-gray-300">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Contact for Custom Plans -->
      <div class="text-center mt-12">
        <p class="text-gray-600 mb-4">
          {{
            $t("maintenance.customMessage") ||
            "Need a custom maintenance plan? Contact us for a tailored solution."
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

    <!-- Success/Error Notifications -->
    <div
      v-if="showNotification"
      class="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300"
      :class="
        notificationType === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
      "
    >
      <div class="flex items-center">
        <span>{{ notificationMessage }}</span>
        <button @click="closeNotification" class="ml-2 text-white">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import stripeService from "@/services/stripeService";

const { t, locale } = useI18n();

// State
const isProcessing = ref(false);
const selectedPlan = ref("");
const showNotification = ref(false);
const notificationType = ref("success");
const notificationMessage = ref("");

// Features comparison data
const comparisonFeatures = computed(() => [
  {
    name: t("maintenance.features.security") || "Security Updates",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    name: t("maintenance.features.backups") || "Backup Management",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    name: t("maintenance.features.monitoring") || "Uptime Monitoring",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    name: t("maintenance.features.support") || "Support",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    name: t("maintenance.features.content") || "Content Updates",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    name: t("maintenance.features.seo") || "SEO Monitoring",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    name: t("maintenance.features.performance") || "Performance Optimization",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    name: t("maintenance.features.development") || "Custom Development",
    basic: false,
    pro: false,
    enterprise: true,
  },
  {
    name: t("maintenance.features.analytics") || "Advanced Analytics",
    basic: false,
    pro: false,
    enterprise: true,
  },
  {
    name: t("maintenance.features.priority") || "24/7 Priority Support",
    basic: false,
    pro: false,
    enterprise: true,
  },
]);

// Methods
const subscribeToPlan = async (planType) => {
  isProcessing.value = true;
  selectedPlan.value = planType;

  try {
    // Get plan price from locale
    const planPrices = {
      basic: stripeService.MAINTENANCE_PLANS_THB.basic,
      pro: stripeService.MAINTENANCE_PLANS_THB.pro,
      enterprise: stripeService.MAINTENANCE_PLANS_THB.enterprise,
    };

    // For now, redirect to contact page for subscription setup
    // In a full implementation, you would:
    // 1. Create Stripe customer
    // 2. Create subscription with the plan
    // 3. Handle payment method collection

    showNotification.value = true;
    notificationType.value = "success";
    notificationMessage.value =
      t("maintenance.subscriptionInitiated") ||
      `Subscription request for ${planType} plan initiated. We'll contact you to complete the setup.`;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In real implementation, redirect to Stripe Customer Portal or payment setup
    window.location.href = `/contact?plan=${planType}&price=${planPrices[planType]}`;
  } catch (error) {
    console.error("Subscription error:", error);
    showNotification.value = true;
    notificationType.value = "error";
    notificationMessage.value =
      t("payment.error") || "Subscription failed. Please try again.";
  } finally {
    isProcessing.value = false;
    selectedPlan.value = "";
  }
};

const closeNotification = () => {
  showNotification.value = false;
};

// Auto-close notification after 5 seconds
setTimeout(() => {
  if (showNotification.value) {
    closeNotification();
  }
}, 5000);
</script>

<style scoped>
/* Additional styles for maintenance plans */
.maintenance-plan {
  transition: all 0.3s ease;
}

.maintenance-plan:hover {
  transform: translateY(-4px);
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.feature-item:last-child {
  border-bottom: none;
}
</style>
