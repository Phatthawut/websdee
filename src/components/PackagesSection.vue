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
          <router-link
            to="/contact"
            class="w-full block text-center bg-[#051d40] text-white py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
          >
            {{ $t("packages.starter.cta") }}
          </router-link>
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
          <router-link
            to="/contact"
            class="w-full block text-center bg-[#fbc646] text-[#051d40] py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300"
          >
            {{ $t("packages.ecommerce.cta") }}
          </router-link>
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
          <router-link
            to="/contact"
            class="w-full block text-center bg-[#051d40] text-white py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
          >
            {{ $t("packages.premium.cta") }}
          </router-link>
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
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale, messages } = useI18n();

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
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap");
</style>
