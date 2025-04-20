import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { setLanguage } from "@/i18n";

export function useLanguage() {
  const { locale, t } = useI18n();

  const currentLocale = computed(() => locale.value);

  // Check if current language is Thai
  const isThai = computed(() => locale.value === "th");

  // Toggle between English and Thai
  const toggleLanguage = () => {
    const newLocale = currentLocale.value === "en" ? "th" : "en";
    setLanguage(newLocale);
  };

  // Switch to a specific language
  const switchToLanguage = (lang) => {
    if (lang === "en" || lang === "th") {
      setLanguage(lang);
    }
  };

  // Format currency based on current language
  const formatCurrency = (amount) => {
    if (isThai.value) {
      return `฿${new Intl.NumberFormat("th-TH").format(amount)}`;
    } else {
      return `$${new Intl.NumberFormat("en-US").format(amount)}`;
    }
  };

  // Convert currency (naive implementation - in real app, use exchange rates)
  const convertCurrency = (amountUSD) => {
    if (isThai.value) {
      // Approximate exchange rate: 1 USD = 35 THB
      return Math.round(amountUSD * 35);
    }
    return amountUSD;
  };

  return {
    currentLocale,
    isThai,
    toggleLanguage,
    switchToLanguage,
    formatCurrency,
    convertCurrency,
    t, // Re-export the translation function for convenience
  };
}
