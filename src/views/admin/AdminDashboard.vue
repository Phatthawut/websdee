<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div
      class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white"
    >
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold mb-2">
            Welcome back, {{ authStore.user?.displayName }}! 👋
          </h2>
          <p class="text-blue-100">
            Here's what's happening with your blog today.
          </p>
        </div>
        <div class="hidden md:block">
          <svg
            class="w-16 h-16 text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg
              class="w-6 h-6 text-blue-600"
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
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900">Total Articles</h3>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.totalArticles }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900">Published</h3>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.publishedArticles }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900">Drafts</h3>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.draftArticles }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg
              class="w-6 h-6 text-purple-600"
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
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900">Users</h3>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.totalUsers }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <router-link
          to="/admin/articles/new"
          class="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group"
        >
          <svg
            class="w-8 h-8 text-gray-400 group-hover:text-blue-500 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <div>
            <h4 class="font-medium text-gray-900 group-hover:text-blue-700">
              New Article
            </h4>
            <p class="text-sm text-gray-500">Create a new blog post</p>
          </div>
        </router-link>

        <router-link
          to="/admin/articles"
          class="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group"
        >
          <svg
            class="w-8 h-8 text-gray-400 group-hover:text-green-500 mr-3"
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
          <div>
            <h4 class="font-medium text-gray-900 group-hover:text-green-700">
              Manage Articles
            </h4>
            <p class="text-sm text-gray-500">Edit existing content</p>
          </div>
        </router-link>

        <router-link
          v-if="authStore.isAdmin"
          to="/admin/users"
          class="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group"
        >
          <svg
            class="w-8 h-8 text-gray-400 group-hover:text-purple-500 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <div>
            <h4 class="font-medium text-gray-900 group-hover:text-purple-700">
              Manage Users
            </h4>
            <p class="text-sm text-gray-500">User roles & permissions</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Recent Articles -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">Recent Articles</h3>
          <router-link
            to="/admin/articles"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            View all →
          </router-link>
        </div>
      </div>

      <div v-if="loading" class="p-6">
        <div class="animate-pulse space-y-4">
          <div v-for="i in 3" :key="i" class="flex space-x-4">
            <div class="w-16 h-16 bg-gray-200 rounded"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="recentArticles.length === 0"
        class="p-6 text-center text-gray-500"
      >
        <svg
          class="w-12 h-12 mx-auto mb-4 text-gray-300"
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
        <p>No articles yet. Create your first article to get started!</p>
        <router-link
          to="/admin/articles/new"
          class="inline-block mt-2 text-blue-600 hover:text-blue-800"
        >
          Create Article →
        </router-link>
      </div>

      <div v-else class="divide-y divide-gray-200">
        <div
          v-for="article in recentArticles"
          :key="article.id"
          class="p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start space-x-4">
            <img
              :src="article.image || '/placeholder-article.jpg'"
              :alt="article.title?.en || 'Article'"
              class="w-16 h-16 rounded-lg object-cover"
            />
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-gray-900 truncate">
                {{ article.title?.en || "Untitled" }}
              </h4>
              <p class="text-sm text-gray-500 mt-1">
                {{ article.category || "Uncategorized" }} •
                {{ formatDate(article.createdAt) }}
              </p>
              <div class="flex items-center mt-2">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="getStatusClass(article.status)"
                >
                  {{ article.status || "draft" }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "@/services/firebase.js";
import { useAuthStore } from "@/stores/authStore.js";

const authStore = useAuthStore();
const loading = ref(true);
const recentArticles = ref([]);
const stats = ref({
  totalArticles: 0,
  publishedArticles: 0,
  draftArticles: 0,
  totalUsers: 0,
});

const loadDashboardData = async () => {
  try {
    loading.value = true;

    // Load recent articles
    const articlesQuery = query(
      collection(db, "articles"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const articlesSnapshot = await getDocs(articlesQuery);
    recentArticles.value = articlesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Calculate stats
    const allArticlesSnapshot = await getDocs(collection(db, "articles"));
    const allArticles = allArticlesSnapshot.docs.map((doc) => doc.data());

    stats.value.totalArticles = allArticles.length;
    stats.value.publishedArticles = allArticles.filter(
      (a) => a.status === "published"
    ).length;
    stats.value.draftArticles = allArticles.filter(
      (a) => a.status === "draft"
    ).length;

    // Load user count (admin only)
    if (authStore.isAdmin) {
      const usersSnapshot = await getDocs(collection(db, "users"));
      stats.value.totalUsers = usersSnapshot.size;
    }
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  } finally {
    loading.value = false;
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown date";

  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    date = new Date(timestamp);
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusClass = (status) => {
  const classes = {
    published: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    archived: "bg-gray-100 text-gray-800",
  };
  return classes[status] || classes.draft;
};

onMounted(() => {
  loadDashboardData();
});
</script>
