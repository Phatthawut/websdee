import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/HomePage.vue"),
      },
      {
        path: "solutions",
        name: "Solutions",
        component: () => import("@/views/SolutionsPage.vue"),
      },
      {
        path: "services",
        name: "Services",
        component: () => import("@/views/ServicesPage.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/AboutPage.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/views/Contact.vue"),
      },
      {
        path: "privacy-policy",
        name: "PrivacyPolicy",
        component: () => import("@/views/PrivacyPolicy.vue"),
      },
      {
        path: "terms",
        name: "TermsOfUse",
        component: () => import("@/views/TermsOfUse.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 };
  },
});

export default router;
