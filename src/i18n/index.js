import { createI18n } from "vue-i18n";
// Import locale files directly with explicit paths
import en from "../locales/en.json";
import th from "../locales/th.json";

// Detect browser language or use stored preference
const getBrowserLocale = () => {
  const storedLocale = localStorage.getItem("language");
  if (storedLocale) {
    return storedLocale;
  }

  const language = navigator.language || navigator.userLanguage;
  const locale = language.split("-")[0]; // Get the language code (e.g., 'en' from 'en-US')

  return locale === "th" ? "th" : "en"; // Default to 'en' if not Thai
};

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: getBrowserLocale(),
  fallbackLocale: "en",
  messages: {
    en,
    th,
  },
  globalInjection: true, // Adds $t to all components
});

// Function to change the language
export const setLanguage = (lang) => {
  i18n.global.locale.value = lang;
  localStorage.setItem("language", lang);
  document.querySelector("html").setAttribute("lang", lang);

  // For Thai language, add a special class to the html element for font handling
  if (lang === "th") {
    document.documentElement.classList.add("lang-th");
  } else {
    document.documentElement.classList.remove("lang-th");
  }
};

export default i18n;
