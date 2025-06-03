<template>
  <div class="articles-container">
    <!-- Header Section -->
    <section
      class="py-12 md:py-20 text-white bg-cover bg-center bg-blue-900 headerbg header-height"
    >
      <div
        class="container mx-auto px-4 reveal-section h-full flex flex-col justify-center"
      >
        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center reveal-element"
        >
          {{ $t("articlesPage.hero.title") }}
        </h1>
        <div
          class="w-1/2 md:w-1/3 h-[2px] bg-[#fbc646] mx-auto mb-6 md:mb-8 reveal-element"
        ></div>
        <p
          class="text-lg md:text-xl max-w-3xl mx-auto text-center reveal-element px-4"
        >
          {{ $t("articlesPage.hero.description") }}
        </p>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="py-6 md:py-8 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-center">
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              :class="[
                'px-3 md:px-4 py-2 rounded-lg font-medium transition duration-300 text-sm md:text-base',
                selectedCategory === category.id
                  ? 'bg-[#051d40] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100',
              ]"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div
          v-if="articleStore.loading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            <!-- Skeleton Image -->
            <div class="w-full h-48 sm:h-52 md:h-48 bg-gray-300"></div>
            <div class="p-4 md:p-6">
              <!-- Skeleton Category and Date -->
              <div class="flex items-center justify-between mb-3">
                <div class="h-4 bg-gray-300 rounded-full w-20"></div>
                <div class="h-3 bg-gray-300 rounded w-16"></div>
              </div>
              <!-- Skeleton Title -->
              <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <!-- Skeleton Excerpt -->
              <div class="space-y-2 mb-4">
                <div class="h-4 bg-gray-300 rounded"></div>
                <div class="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
              <!-- Skeleton Author and Read More -->
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div
                    class="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full mr-2"
                  ></div>
                  <div class="h-3 bg-gray-300 rounded w-16"></div>
                </div>
                <div class="h-3 bg-gray-300 rounded w-12"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Articles Grid -->
        <div
          v-else-if="!articleStore.loading && filteredArticles.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <article
            v-for="article in filteredArticles"
            :key="article.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
            @click="goToArticle(article.slug)"
          >
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                :src="article.image"
                :alt="article.title.en"
                class="w-full h-48 sm:h-52 md:h-48 object-cover"
              />
            </div>
            <div class="p-4 md:p-6">
              <div class="flex items-center justify-between mb-3">
                <span
                  class="inline-block px-2 md:px-3 py-1 text-xs font-medium bg-[#fbc646] text-[#051d40] rounded-full"
                >
                  {{ getCategoryName(article.category) }}
                </span>
                <span class="text-xs md:text-sm text-gray-500">
                  {{ formatDate(article.publishedAt) }}
                </span>
              </div>
              <h3
                class="text-xl font-bold text-[#051d40] mb-2 group-hover:text-[#fbc646] transition-colors duration-300"
              >
                {{ getLocalizedTitle(article, locale) }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                {{ getLocalizedExcerpt(article, locale) }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img
                    :src="article.author.avatar"
                    :alt="article.author.name"
                    class="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2"
                  />
                  <span class="text-xs md:text-sm text-gray-600">{{
                    article.author.name
                  }}</span>
                </div>
                <span class="text-xs md:text-sm text-[#051d40] font-medium">
                  {{ $t("articlesPage.readMore") }} →
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- Load More Button -->
        <div
          class="text-center mt-8 md:mt-12"
          v-if="canLoadMore && !articleStore.loading"
        >
          <button
            @click="loadMoreArticles"
            class="bg-[#051d40] text-white px-6 md:px-8 py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300 text-sm md:text-base"
          >
            {{ $t("articlesPage.loadMore") }}
          </button>
        </div>

        <!-- No Results -->
        <div
          v-if="!articleStore.loading && filteredArticles.length === 0"
          class="text-center py-8 md:py-12"
        >
          <svg
            class="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4"
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
          <h3 class="text-lg md:text-xl font-semibold text-gray-600 mb-2">
            {{ $t("articlesPage.noResults.title") }}
          </h3>
          <p class="text-gray-500 text-sm md:text-base">
            {{ $t("articlesPage.noResults.description") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-12 md:py-16 bg-gray-50">
      <div class="container mx-auto px-4 text-center reveal-section">
        <h2
          class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#051d40] reveal-element"
        >
          {{ $t("articlesPage.newsletter.title") }}
        </h2>
        <p
          class="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-gray-600 reveal-element px-4"
        >
          {{ $t("articlesPage.newsletter.description") }}
        </p>
        <div
          class="max-w-md mx-auto flex flex-col sm:flex-row gap-3 md:gap-4 reveal-element px-4"
        >
          <input
            v-model="email"
            type="email"
            :placeholder="$t('articlesPage.newsletter.placeholder')"
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#051d40] focus:border-transparent text-sm md:text-base"
          />
          <button
            @click="subscribeNewsletter"
            class="bg-[#fbc646] text-[#051d40] px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition duration-300 text-sm md:text-base whitespace-nowrap"
          >
            {{ $t("articlesPage.newsletter.subscribe") }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useArticleStore } from "@/stores/articleStore.js";
import {
  getLocalizedTitle,
  getLocalizedExcerpt,
  formatArticleDate,
} from "@/utils/articleUtils.js";
import { getCategoryName, DEFAULT_CATEGORIES } from "@/utils/categoryUtils.js";

// Use centralized store state
const articleStore = useArticleStore();

const router = useRouter();
const { t, locale } = useI18n();

// Only local UI state (not data state)
const searchQuery = ref("");
const selectedCategory = ref("all");
const email = ref("");
const currentPage = ref(1);
const articlesPerPage = 10;

// Computed properties
const categories = computed(() => DEFAULT_CATEGORIES);

const filteredArticles = computed(() => {
  let articles = articleStore.articles || [];

  // Filter by category
  if (selectedCategory.value !== "all") {
    articles = articles.filter(
      (article) => article.category === selectedCategory.value
    );
  }

  // Filter by search query if needed
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    articles = articles.filter(
      (article) =>
        article.title?.en?.toLowerCase().includes(query) ||
        article.title?.th?.toLowerCase().includes(query) ||
        article.excerpt?.en?.toLowerCase().includes(query) ||
        article.excerpt?.th?.toLowerCase().includes(query)
    );
  }

  return articles;
});

const canLoadMore = computed(() => {
  // For now, let's assume we can load more if we have articles
  // In a real app, this would check if there are more articles to load
  return false; // Disable for now since we're fetching a limited set
});

// Methods using utility functions
const formatDate = (dateString) => {
  // For simple date strings, use basic formatting
  return new Date(dateString).toLocaleDateString(
    locale.value === "th" ? "th-TH" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
};

const goToArticle = (slug) => {
  router.push(`/articles/${slug}`);
};

const loadMoreArticles = () => {
  currentPage.value++;
};

const subscribeNewsletter = () => {
  if (email.value) {
    // In a real app, this would make an API call
    alert("Thank you for subscribing to our newsletter!");
    email.value = "";
  }
};

// Animation setup
const setupRevealAnimations = () => {
  const revealSections = document.querySelectorAll(".reveal-section");
  const revealElements = document.querySelectorAll(".reveal-element");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");

          if (entry.target.classList.contains("reveal-section")) {
            const elements = entry.target.querySelectorAll(".reveal-element");
            elements.forEach((el, index) => {
              const delay = index * 150;
              el.style.animationDelay = `${delay}ms`;
              setTimeout(() => {
                el.style.animationPlayState = "running";
              }, 100);
            });
          } else {
            entry.target.style.animationPlayState = "running";
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealSections.forEach((section) => observer.observe(section));
  return observer;
};

let animationObserver = null;

onMounted(() => {
  // Use store's fetch method
  articleStore.fetchArticles();
  setTimeout(() => {
    animationObserver = setupRevealAnimations();
  }, 300);
});

onUnmounted(() => {
  if (animationObserver) {
    animationObserver.disconnect();
  }
});
</script>

<style scoped>
.headerbg {
  background-image: linear-gradient(
      rgba(5, 29, 64, 0.85),
      rgba(5, 29, 64, 0.45)
    ),
    url("@/assets/images/nat-Qerg85B7JDI-unsplash.webp");
}

.header-height {
  height: 50vh;
  min-height: 350px;
}

@media (max-width: 768px) {
  .header-height {
    height: 40vh;
    min-height: 300px;
  }
}

.articles-container {
  min-height: 100vh;
}

/* Animation styles */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-element {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeInUp 0.8s ease forwards;
  animation-play-state: paused;
  will-change: transform, opacity;
}

.reveal-section {
  transition: opacity 0.5s ease;
}

.reveal-section.revealed {
  transition: transform 0.8s ease;
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Grid stagger animations */
.grid > article:nth-child(1) {
  animation-duration: 0.7s;
}
.grid > article:nth-child(2) {
  animation-duration: 0.75s;
}
.grid > article:nth-child(3) {
  animation-duration: 0.8s;
}
.grid > article:nth-child(4) {
  animation-duration: 0.85s;
}
.grid > article:nth-child(5) {
  animation-duration: 0.9s;
}
.grid > article:nth-child(6) {
  animation-duration: 0.95s;
}
.grid > article:nth-child(7) {
  animation-duration: 1s;
}
.grid > article:nth-child(8) {
  animation-duration: 1.05s;
}
.grid > article:nth-child(9) {
  animation-duration: 1.1s;
}
</style>
