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
        path: "page",
        name: "Page",
        component: () => import("@/views/Page.vue"),
      },
      {
        path: "solutions",
        name: "Solutions",
        component: () => import("@/views/Solutions.vue"),
      },
      {
        path: "case-studies",
        name: "CaseStudies",
        component: () => import("@/views/CaseStudies.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/AboutView.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/views/Contact.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
      },
      {
        path: "sampleSection",
        name: "SampleSection",
        component: () => import("@/views/ExampleSectionView.vue"),
      },
      {
        path: "sampleCTA",
        name: "SampleCTA",
        component: () => import("@/views/ExampleCTAView.vue"),
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
