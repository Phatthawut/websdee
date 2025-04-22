import { createApp } from "vue";
import "./style.css";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/i18n";
import { VueReCaptcha } from "vue-recaptcha-v3";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: false,
  },
});
app.mount("#app");
