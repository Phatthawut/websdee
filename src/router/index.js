import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import { useAuthStore } from "@/stores/authStore.js";
import { trackPageView } from "@/utils/analyticsUtils";

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
        path: "order-confirmation",
        name: "OrderConfirmation",
        component: () => import("@/views/OrderConfirmation.vue"),
      },
      {
        path: "payment-success",
        name: "PaymentSuccess",
        component: () => import("@/views/PaymentSuccess.vue"),
      },
      {
        path: "bank-transfer-thank-you",
        name: "BankTransferThankYou",
        component: () => import("@/views/BankTransferThankYou.vue"),
      },
      {
        path: "bank-transfer-test",
        name: "BankTransferTest",
        component: () => import("@/views/BankTransferTest.vue"),
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
  // Admin Routes
  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () => import("@/views/admin/AdminDashboard.vue"),
      },
      {
        path: "articles",
        name: "AdminArticles",
        component: () => import("@/views/admin/AdminArticles.vue"),
      },
      {
        path: "articles/new",
        name: "AdminArticleNew",
        component: () => import("@/views/admin/AdminArticleEditor.vue"),
      },
      {
        path: "articles/:id/edit",
        name: "AdminArticleEdit",
        component: () => import("@/views/admin/AdminArticleEditor.vue"),
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("@/views/admin/AdminUsers.vue"),
        meta: {
          requiresAdmin: true, // Only admin can access user management
        },
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: () => import("@/views/admin/AdminSettings.vue"),
      },
      {
        path: "payments",
        name: "AdminPayments",
        component: () => import("@/views/admin/AdminPayments.vue"),
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

// Add Google Analytics tracking after each route change
router.afterEach((to) => {
  // Track page view in Google Analytics
  trackPageView(to.path, to.name);
});

export default router;
