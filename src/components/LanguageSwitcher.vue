<template>
  <div class="language-switcher">
    <button
      @click="toggleLanguage"
      class="flex items-center space-x-1 hover:text-yellow-500 transition-colors duration-200"
      :title="buttonTitle"
    >
      <span class="language-text">{{
        currentLocale === "en" ? "TH" : "EN"
      }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { setLanguage } from "@/i18n";

const { locale, t } = useI18n();
const currentLocale = computed(() => locale.value);

// Computed property for the button title
const buttonTitle = computed(() => {
  return currentLocale.value === "en"
    ? "เปลี่ยนเป็นภาษาไทย"
    : "Switch to English";
});

// Toggle between English and Thai
const toggleLanguage = () => {
  const newLocale = currentLocale.value === "en" ? "th" : "en";
  setLanguage(newLocale);
};

// Initialize language on component mount
onMounted(() => {
  // This ensures that the language is set correctly on initial load
  setLanguage(currentLocale.value);
});
</script>

<style scoped>
.language-switcher {
  display: inline-block;
  cursor: pointer;
}

.flag-icon {
  font-size: 1.2rem;
  margin-right: 4px;
}

.language-text {
  font-weight: 500;
}
</style>
