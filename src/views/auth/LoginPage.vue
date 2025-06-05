<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="flex justify-center mb-6">
          <img src="/WebsDee-logo.png" alt="WebsDee Logo" class="h-16 w-auto" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
        <p class="text-gray-600">Access WebsDee Content Management System</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Error Message -->
        <div
          v-if="authStore.error"
          class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-red-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
            <p class="text-red-700 text-sm">{{ authStore.error }}</p>
          </div>
          <button
            @click="authStore.clearError"
            class="mt-2 text-red-600 hover:text-red-800 text-sm underline"
          >
            Dismiss
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="authStore.loading" class="text-center py-6">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
          ></div>
          <p class="mt-3 text-gray-600">Signing you in...</p>
        </div>

        <!-- Login Button -->
        <div v-else class="space-y-6">
          <div class="text-center">
            <p class="text-sm text-gray-600 mb-4">
              Sign in with your Google account to access the admin panel
            </p>
          </div>

          <button
            @click="handleGoogleSignIn"
            :disabled="authStore.loading"
            class="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <!-- Info Section -->
          <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <div class="flex items-start">
              <svg
                class="w-5 h-5 text-blue-600 mr-3 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h4 class="text-sm font-medium text-blue-900 mb-1">
                  Admin Access Required
                </h4>
                <p class="text-sm text-blue-700">
                  New admin team members will have pending status until approved
                  by an administrator. Contact your administrator for account
                  activation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Site -->
      <div class="text-center">
        <router-link
          to="/"
          class="text-sm text-gray-600 hover:text-gray-900 transition duration-300"
        >
          ← Back to Website
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";

const router = useRouter();
const authStore = useAuthStore();

// Watch for authentication changes and redirect accordingly
watch(
  () => [authStore.isAuthenticated, authStore.userProfile],
  ([isAuth, profile]) => {
    if (isAuth && profile) {
      // User is authenticated and profile is loaded
      if (authStore.canAccessAdmin) {
        router.push("/admin/dashboard");
      } else if (authStore.isPending) {
        authStore.error =
          "Your account is pending approval. Please contact the administrator to activate your access.";
      } else {
        authStore.error =
          "You do not have permission to access the admin panel. Please contact an administrator.";
      }
    }
  },
  { immediate: true }
);

// Handle Google sign in
const handleGoogleSignIn = async () => {
  try {
    // Clear any previous errors
    authStore.clearError();

    // Sign in with Google - the watcher will handle the redirect
    await authStore.signInWithGoogle();
  } catch (error) {
    console.error("Login failed:", error);
    // Error is already handled in the store
  }
};

// Redirect if already authenticated
onMounted(async () => {
  // Wait for auth to initialize
  if (!authStore.isInitialized) {
    await authStore.initializeAuth();
  }

  if (authStore.isAuthenticated && authStore.canAccessAdmin) {
    router.push("/admin/dashboard");
  }
});
</script>

<style scoped>
/* Additional custom styles if needed */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
