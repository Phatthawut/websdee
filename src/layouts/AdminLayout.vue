<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
    >
      <div class="flex items-center justify-center h-16 px-4 bg-blue-600">
        <img src="/WebsDee-logo.png" alt="WebsDee" class="h-8 w-auto" />
        <span class="ml-2 text-xl font-bold text-white">Admin</span>
      </div>

      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <router-link
            to="/admin/dashboard"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
            :class="{
              'bg-blue-50 text-blue-700 border-r-2 border-blue-700':
                $route.name === 'AdminDashboard',
            }"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z"
              ></path>
            </svg>
            Dashboard
          </router-link>

          <router-link
            to="/admin/articles"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
            :class="{
              'bg-blue-50 text-blue-700 border-r-2 border-blue-700':
                $route.name === 'AdminArticles',
            }"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Articles
          </router-link>

          <router-link
            v-if="authStore.isAdmin"
            to="/admin/users"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
            :class="{
              'bg-blue-50 text-blue-700 border-r-2 border-blue-700':
                $route.name === 'AdminUsers',
            }"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              ></path>
            </svg>
            Users
          </router-link>

          <router-link
            to="/admin/settings"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
            :class="{
              'bg-blue-50 text-blue-700 border-r-2 border-blue-700':
                $route.name === 'AdminSettings',
            }"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            Settings
          </router-link>

          <router-link
            to="/admin/payments"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
            :class="{
              'bg-blue-50 text-blue-700 border-r-2 border-blue-700':
                $route.name === 'AdminPayments',
            }"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
              ></path>
            </svg>
            Payments
          </router-link>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="ml-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-6 py-4">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900">
              {{ pageTitle }}
            </h1>
            <p class="text-sm text-gray-600">{{ pageDescription }}</p>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Back to Website -->
            <router-link
              to="/"
              class="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back to Website
            </router-link>

            <!-- User Menu -->
            <div class="flex items-center space-x-3">
              <img
                :src="authStore.userAvatarUrl"
                :alt="authStore.user?.displayName"
                class="w-8 h-8 rounded-full object-cover"
                @error="$event.target.src = '/default-avatar.png'"
              />
              <div class="hidden md:block">
                <p class="text-sm font-medium text-gray-900">
                  {{ authStore.user?.displayName }}
                </p>
                <p class="text-xs text-gray-500 capitalize">
                  {{ authStore.userProfile?.role }}
                </p>
              </div>
              <button
                @click="handleLogout"
                class="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const pageTitle = computed(() => {
  const titles = {
    AdminDashboard: "Dashboard",
    AdminArticles: "Articles",
    AdminUsers: "Users",
    AdminSettings: "Settings",
    AdminPayments: "Payments",
  };
  return titles[route.name] || "Admin Panel";
});

const pageDescription = computed(() => {
  const descriptions = {
    AdminDashboard: "Overview of your content and website statistics",
    AdminArticles: "Manage your blog articles and content",
    AdminUsers: "Manage user roles and permissions",
    AdminSettings: "Configure your website settings",
    AdminPayments: "View and manage customer payments",
  };
  return descriptions[route.name] || "WebsDee Admin Panel";
});

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>

<style scoped>
/* Removed problematic @apply directive - active states are handled with :class bindings */
</style>
