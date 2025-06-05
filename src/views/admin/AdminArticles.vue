<template>
  <div class="space-y-6">
    <!-- Header with Actions -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Articles</h1>
        <p class="text-gray-600">Manage your blog articles and content</p>
      </div>
      <router-link
        to="/admin/articles/new"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg
          class="w-5 h-5 mr-2"
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
        New Article
      </router-link>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Search</label
          >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            v-model="statusFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <!-- Category Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Category</label
          >
          <select
            v-model="categoryFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="web-development">Web Development</option>
            <option value="design">Design</option>
            <option value="seo">SEO</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Articles Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="loading" class="p-6">
        <div class="animate-pulse space-y-4">
          <div v-for="i in 5" :key="i" class="flex space-x-4">
            <div class="w-16 h-16 bg-gray-200 rounded"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredArticles.length === 0" class="p-12 text-center">
        <svg
          class="w-16 h-16 mx-auto mb-4 text-gray-300"
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
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No articles found
        </h3>
        <p class="text-gray-500 mb-4">
          Get started by creating your first article.
        </p>
        <router-link
          to="/admin/articles/new"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
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
          Create Article
        </router-link>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Article
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="article in filteredArticles"
              :key="article.id"
              class="hover:bg-gray-50"
            >
              <!-- Article Info -->
              <td class="px-6 py-4">
                <div class="flex items-start space-x-4">
                  <img
                    :src="article.image || '/placeholder-article.jpg'"
                    :alt="article.title?.en || 'Article'"
                    class="w-12 h-12 rounded-lg object-cover"
                  />
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 truncate">
                      {{ article.title?.en || "Untitled" }}
                    </h4>
                    <p class="text-sm text-gray-500 mt-1 line-clamp-2">
                      {{ article.excerpt?.en || "No excerpt available" }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Category -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize"
                >
                  {{ article.category || "Uncategorized" }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="getStatusClass(article.status)"
                >
                  {{ article.status || "draft" }}
                </span>
              </td>

              <!-- Created Date -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(article.createdAt) }}
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <!-- View -->
                  <router-link
                    v-if="article.status === 'published'"
                    :to="`/articles/${article.slug}`"
                    target="_blank"
                    class="text-blue-600 hover:text-blue-800"
                    title="View Article"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </router-link>

                  <!-- Edit -->
                  <router-link
                    :to="`/admin/articles/${article.id}/edit`"
                    class="text-indigo-600 hover:text-indigo-800"
                    title="Edit Article"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </router-link>

                  <!-- Delete -->
                  <button
                    v-if="authStore.canDeleteArticles"
                    @click="confirmDelete(article)"
                    class="text-red-600 hover:text-red-800"
                    title="Delete Article"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="articleToDelete"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="cancelDelete"
    >
      <div class="bg-white rounded-lg p-6 max-w-md mx-4" @click.stop>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Delete Article</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete "{{ articleToDelete.title?.en }}"?
          This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="cancelDelete"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="deleteArticle"
            :disabled="deleting"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {{ deleting ? "Deleting..." : "Delete" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/services/firebase.js";
import { useAuthStore } from "@/stores/authStore.js";

const authStore = useAuthStore();
const loading = ref(true);
const articles = ref([]);
const searchQuery = ref("");
const statusFilter = ref("");
const categoryFilter = ref("");
const articleToDelete = ref(null);
const deleting = ref(false);

const filteredArticles = computed(() => {
  let filtered = articles.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (article) =>
        article.title?.en?.toLowerCase().includes(query) ||
        article.excerpt?.en?.toLowerCase().includes(query) ||
        article.category?.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (statusFilter.value) {
    filtered = filtered.filter(
      (article) => article.status === statusFilter.value
    );
  }

  // Category filter
  if (categoryFilter.value) {
    filtered = filtered.filter(
      (article) => article.category === categoryFilter.value
    );
  }

  return filtered;
});

const loadArticles = async () => {
  try {
    loading.value = true;
    const articlesQuery = query(
      collection(db, "articles"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(articlesQuery);
    articles.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error loading articles:", error);
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

const confirmDelete = (article) => {
  articleToDelete.value = article;
};

const cancelDelete = () => {
  articleToDelete.value = null;
};

const deleteArticle = async () => {
  if (!articleToDelete.value) return;

  try {
    deleting.value = true;
    await deleteDoc(doc(db, "articles", articleToDelete.value.id));

    // Remove from local array
    articles.value = articles.value.filter(
      (a) => a.id !== articleToDelete.value.id
    );

    articleToDelete.value = null;
  } catch (error) {
    console.error("Error deleting article:", error);
    alert("Failed to delete article. Please try again.");
  } finally {
    deleting.value = false;
  }
};

onMounted(() => {
  loadArticles();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
