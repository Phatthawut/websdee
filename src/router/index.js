import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import { useAuthStore } from "@/stores/authStore.js";

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
        path: "/articles",
        name: "Articles",
        component: () => import("@/views/ArticlesPage.vue"),
      },
      {
        path: "/articles/:slug",
        name: "ArticleDetail",
        component: () => import("@/views/ArticleDetail.vue"),
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
  // Auth Routes (outside MainLayout)
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/LoginPage.vue"),
    meta: {
      hideLayout: true,
      guest: true, // Only accessible when not authenticated
    },
  },
  // Admin Routes (will be added later)
  {
    path: "/admin",
    name: "Admin",
    redirect: "/admin/dashboard",
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
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

// Route Guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Only wait for auth initialization if the route requires authentication
  if (to.meta.requiresAuth || to.meta.guest) {
    if (!authStore.isInitialized) {
      await authStore.initializeAuth();
    }
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next("/login");
    }

    // Check if route requires admin access
    if (to.meta.requiresAdmin && !authStore.canAccessAdmin) {
      return next("/login");
    }
  }

  // Redirect authenticated users away from guest-only pages
  if (to.meta.guest && authStore.isAuthenticated && authStore.canAccessAdmin) {
    return next("/admin/dashboard");
  }

  next();
});

export default router;
