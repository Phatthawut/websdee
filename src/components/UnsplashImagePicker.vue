<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="close"
  >
    <div
      class="bg-white rounded-lg w-full max-w-4xl mx-4 flex flex-col max-h-[90vh] overflow-hidden"
      style="height: 90vh"
      @click.stop
    >
      <!-- Header -->
      <div
        class="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200"
      >
        <div>
          <h3 class="text-lg font-semibold text-gray-900">
            Choose from Unsplash
          </h3>
          <p class="text-sm text-gray-500">
            Beautiful, free photos from Unsplash
          </p>
        </div>
        <button
          @click="close"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Search -->
      <div class="flex-shrink-0 p-4 border-b border-gray-200">
        <div class="flex gap-2">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for photos..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @keyup.enter="searchPhotos"
            />
          </div>
          <button
            @click="searchPhotos"
            :disabled="loading"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{ loading ? "Searching..." : "Search" }}
          </button>
        </div>

        <!-- Quick Categories -->
        <div class="flex flex-wrap gap-2 mt-3">
          <span class="text-sm text-gray-500">Quick searches:</span>
          <button
            v-for="category in quickCategories"
            :key="category"
            @click="quickSearch(category)"
            class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Content Area - Scrollable -->
      <div class="flex-1 overflow-hidden">
        <!-- Loading State -->
        <div v-if="loading" class="h-full overflow-y-auto p-4">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="i in 12"
              :key="i"
              class="aspect-square bg-gray-200 rounded-lg animate-pulse"
            ></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="h-full overflow-y-auto p-4 text-center">
          <div class="text-red-500 mb-2">
            <svg
              class="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h4 class="text-lg font-medium text-gray-900 mb-2">
            Error loading photos
          </h4>
          <p class="text-gray-500 mb-4">{{ error }}</p>
          <button
            @click="loadFeaturedPhotos"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>

        <!-- Photos Grid -->
        <div v-else-if="photos.length > 0" class="h-full overflow-y-auto">
          <div class="p-4">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                v-for="photo in photos"
                :key="photo.id"
                class="group cursor-pointer relative aspect-square overflow-hidden rounded-lg border-2 border-transparent hover:border-blue-500 transition-all"
                @click="selectPhoto(photo)"
              >
                <img
                  :src="photo.urls.small"
                  :alt="photo.description"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />

                <!-- Overlay -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-end"
                >
                  <div class="p-3 text-white">
                    <p class="text-sm font-medium">{{ photo.user.name }}</p>
                    <div class="flex items-center gap-2 text-xs">
                      <span>{{ photo.likes }} likes</span>
                      <span>•</span>
                      <span>{{ photo.downloads }} downloads</span>
                    </div>
                  </div>
                </div>

                <!-- Selection indicator -->
                <div
                  class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div
                    class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
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
                </div>
              </div>
            </div>

            <!-- Load More -->
            <div v-if="hasMore" class="mt-6 text-center">
              <button
                @click="loadMore"
                :disabled="loadingMore"
                class="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  v-if="loadingMore"
                  class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{
                  loadingMore
                    ? "Loading..."
                    : `Load More (${photos.length} of ${totalPhotos})`
                }}
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="h-full overflow-y-auto p-4 text-center">
          <div class="text-gray-300 mb-4">
            <svg
              class="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h4 class="text-lg font-medium text-gray-900 mb-2">
            No photos found
          </h4>
          <p class="text-gray-500">Try searching for something else</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500">
            Photos by
            <a
              href="https://unsplash.com/?utm_source=websdee&utm_medium=referral"
              target="_blank"
              rel="noopener"
              class="text-blue-600 hover:text-blue-800"
            >
              Unsplash
            </a>
          </div>
          <button
            @click="close"
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, toRefs, onBeforeUnmount } from "vue";
import { unsplashService } from "@/services/unsplashService.js";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "select"]);

// State
const searchQuery = ref("");
const photos = ref([]);
const loading = ref(false);
const loadingMore = ref(false);
const error = ref(null);
const currentPage = ref(1);
const hasMore = ref(true);
const isSearchMode = ref(false);
const totalPhotos = ref(0);
const photosPerPage = 12;

// Quick search categories
const quickCategories = [
  "business",
  "technology",
  "design",
  "office",
  "computer",
  "marketing",
  "workspace",
];

// Methods
const close = () => {
  // Restore body scroll when closing
  document.body.style.overflow = "auto";
  emit("close");
};

const searchPhotos = async () => {
  if (!searchQuery.value.trim()) {
    await loadFeaturedPhotos();
    return;
  }

  try {
    loading.value = true;
    error.value = null;
    currentPage.value = 1;
    isSearchMode.value = true;

    console.log("Searching for:", searchQuery.value.trim());
    const result = await unsplashService.searchPhotos(
      searchQuery.value.trim(),
      1,
      photosPerPage
    );
    console.log(
      "Search results:",
      result.results.length,
      "total:",
      result.total
    );

    // Update state and ensure reactivity
    photos.value = [...result.results];
    totalPhotos.value = result.total;
    hasMore.value = result.totalPages > 1;
    loading.value = false; // Set loading to false immediately

    console.log(
      "Search state updated - photos:",
      photos.value.length,
      "loading:",
      loading.value
    );
  } catch (err) {
    console.error("Error searching photos:", err);
    error.value = err.message || "Failed to search photos";
    loading.value = false; // Ensure loading is false on error
  }
};

const quickSearch = async (category) => {
  searchQuery.value = category;
  await searchPhotos();
};

const loadFeaturedPhotos = async () => {
  try {
    loading.value = true;
    error.value = null;
    currentPage.value = 1;
    isSearchMode.value = false;

    console.log("Loading featured photos...");
    const featuredPhotos = await unsplashService.getFeaturedPhotos(
      1,
      photosPerPage
    );
    console.log("Featured photos loaded:", featuredPhotos.length);

    // Update state in the correct order and ensure reactivity
    photos.value = [...featuredPhotos]; // Use spread to ensure reactivity
    totalPhotos.value = featuredPhotos.length;
    hasMore.value = featuredPhotos.length === photosPerPage;

    // Force loading to false immediately after data is set
    loading.value = false;

    console.log(
      "State updated - photos:",
      photos.value.length,
      "loading:",
      loading.value
    );
  } catch (err) {
    console.error("Error loading featured photos:", err);
    error.value = err.message || "Failed to load featured photos";
    loading.value = false; // Ensure loading is false on error
  }
};

const loadMore = async () => {
  if (!hasMore.value || loadingMore.value) return;

  try {
    loadingMore.value = true;
    currentPage.value += 1;

    let newPhotos;
    if (isSearchMode.value && searchQuery.value.trim()) {
      const result = await unsplashService.searchPhotos(
        searchQuery.value.trim(),
        currentPage.value,
        photosPerPage
      );
      newPhotos = result.results;
      hasMore.value = currentPage.value < result.totalPages;
    } else {
      newPhotos = await unsplashService.getFeaturedPhotos(
        currentPage.value,
        photosPerPage
      );
      totalPhotos.value += newPhotos.length;
      hasMore.value = newPhotos.length === photosPerPage;
    }

    photos.value.push(...newPhotos);
  } catch (err) {
    console.error("Error loading more photos:", err);
    currentPage.value -= 1; // Revert page increment on error
  } finally {
    loadingMore.value = false;
  }
};

const selectPhoto = async (photo) => {
  try {
    // Track download as required by Unsplash API guidelines
    await unsplashService.trackDownload(photo.links.download);

    // Emit the selected photo with the regular size URL
    emit("select", {
      url: photo.urls.regular,
      description: photo.description,
      attribution: unsplashService.getAttribution(photo),
      attributionHtml: unsplashService.getAttributionHtml(photo),
      unsplashId: photo.id,
      photographer: photo.user.name,
      photographerUrl: photo.user.profileUrl,
    });

    close();
  } catch (err) {
    console.error("Error selecting photo:", err);
    // Still emit the photo even if tracking fails
    emit("select", {
      url: photo.urls.regular,
      description: photo.description,
      attribution: unsplashService.getAttribution(photo),
      attributionHtml: unsplashService.getAttributionHtml(photo),
      unsplashId: photo.id,
      photographer: photo.user.name,
      photographerUrl: photo.user.profileUrl,
    });
    close();
  }
};

// Load featured photos when component is opened
onMounted(() => {
  if (props.isOpen) {
    loadFeaturedPhotos();
  }
});

// Watch for prop changes
const { isOpen } = toRefs(props);
watch(isOpen, (newValue) => {
  if (newValue) {
    // Lock body scroll when modal opens
    document.body.style.overflow = "hidden";

    // Reset state when modal opens
    photos.value = [];
    loading.value = false;
    error.value = null;
    currentPage.value = 1;
    hasMore.value = true;
    totalPhotos.value = 0;
    searchQuery.value = "";
    isSearchMode.value = false;

    // Load featured photos
    loadFeaturedPhotos();
  } else {
    // Restore body scroll when modal closes
    document.body.style.overflow = "auto";
  }
});

// Clean up on component unmount
onBeforeUnmount(() => {
  // Restore body scroll if component is destroyed while modal is open
  document.body.style.overflow = "auto";
});
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
