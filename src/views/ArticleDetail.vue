<template>
  <div class="article-detail-container">
    <!-- Loading State -->
    <div
      v-if="articleStore.loading"
      class="flex justify-center items-center min-h-screen"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#051d40]"
      ></div>
    </div>

    <!-- Article Not Found -->
    <div
      v-else-if="notFound"
      class="flex flex-col items-center justify-center min-h-screen px-4"
    >
      <h1 class="text-2xl md:text-4xl font-bold text-gray-600 mb-4 text-center">
        Article Not Found
      </h1>
      <p class="text-gray-500 mb-6 text-center">
        The article you're looking for doesn't exist.
      </p>
      <router-link
        to="/articles"
        class="bg-[#051d40] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
      >
        Back to Articles
      </router-link>
    </div>

    <!-- Article Content -->
    <div v-else-if="articleStore.currentArticle">
      <!-- Header Image -->
      <section class="relative h-64 md:h-96 bg-gray-900 overflow-hidden">
        <img
          :src="articleStore.currentArticle?.image"
          :alt="articleStore.currentArticle?.title?.en || 'Article'"
          class="w-full h-full object-cover"
        />

        <!-- Breadcrumb -->
        <div class="absolute top-4 md:top-8 left-0 right-0">
          <div class="container mx-auto px-4">
            <nav
              class="flex text-white text-xs md:text-sm"
              style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8)"
            >
              <router-link to="/" class="hover:underline">Home</router-link>
              <span class="mx-1 md:mx-2">/</span>
              <router-link to="/articles" class="hover:underline"
                >Articles</router-link
              >
              <span class="mx-1 md:mx-2">/</span>
              <span class="text-gray-300 truncate">{{
                articleStore.currentArticle?.title?.en || "Article"
              }}</span>
            </nav>
          </div>
        </div>

        <!-- Article Meta -->
        <div class="absolute bottom-4 md:bottom-8 left-0 right-0">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
              <h1
                class="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight"
              >
                {{ localizedTitle }}
              </h1>
              <p class="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                {{ localizedExcerpt }}
              </p>
              <div
                class="flex flex-wrap items-center gap-4 text-white/80 text-sm"
              >
                <div
                  class="flex items-center gap-2"
                  v-if="articleStore.currentArticle.author"
                >
                  <img
                    :src="articleStore.currentArticle.author.avatar"
                    :alt="articleStore.currentArticle.author.name"
                    class="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{{ articleStore.currentArticle.author.name }}</span>
                </div>
                <span>•</span>
                <span>{{ formatDate(articleStore.currentArticle) }}</span>
                <span>•</span>
                <span>{{ articleStore.currentArticle.readTime }} min read</span>
                <span>•</span>
                <span
                  class="bg-[#fbc646] text-[#051d40] px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ getCategoryName(articleStore.currentArticle.category) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Article Body -->
      <section class="py-12 md:py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <!-- Article Content -->
            <div class="max-w-none">
              <div v-html="localizedContent" class="article-content"></div>
            </div>

            <!-- Tags -->
            <div class="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
              <h3
                class="text-base md:text-lg font-semibold mb-3 md:mb-4 text-[#051d40]"
              >
                Tags
              </h3>
              <div class="flex flex-wrap gap-2">
                <!-- Handle both array (tags) and string (tag) formats -->
                <template v-if="articleTags && articleTags.length > 0">
                  <span
                    v-for="tag in articleTags"
                    :key="tag"
                    class="px-2 md:px-3 py-1 bg-gray-100 text-gray-700 text-xs md:text-sm rounded-full hover:bg-gray-200 transition duration-300"
                  >
                    #{{ tag }}
                  </span>
                </template>
                <span v-else class="text-gray-500 text-sm"
                  >No tags available</span
                >
              </div>
            </div>

            <!-- Share Buttons -->
            <div class="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
              <h3
                class="text-base md:text-lg font-semibold mb-3 md:mb-4 text-[#051d40]"
              >
                Share this article
              </h3>
              <div class="grid grid-cols-2 md:flex gap-2 md:gap-4">
                <button
                  @click="shareOnFacebook"
                  class="flex items-center justify-center px-3 md:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-sm"
                >
                  <svg
                    class="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                  <span class="hidden md:inline">Facebook</span>
                  <span class="md:hidden">FB</span>
                </button>
                <button
                  @click="shareOnTwitter"
                  class="flex items-center justify-center px-3 md:px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition duration-300 text-sm"
                >
                  <svg
                    class="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                    />
                  </svg>
                  Twitter
                </button>
                <button
                  @click="shareOnLinkedIn"
                  class="flex items-center justify-center px-3 md:px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition duration-300 text-sm"
                >
                  <svg
                    class="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                  LinkedIn
                </button>
                <button
                  @click="copyToClipboard"
                  class="flex items-center justify-center px-3 md:px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 text-sm col-span-2 md:col-span-1"
                >
                  <svg
                    class="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Articles -->
      <section class="py-12 md:py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <h2
              class="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-[#051d40]"
            >
              Related Articles
            </h2>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              <article
                v-for="relatedArticle in relatedArticles"
                :key="relatedArticle.id"
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                @click="goToArticle(relatedArticle.slug)"
              >
                <img
                  :src="relatedArticle.image"
                  :alt="relatedArticle.title.en"
                  class="w-full h-40 md:h-48 object-cover"
                />
                <div class="p-4 md:p-6">
                  <span
                    class="inline-block px-2 md:px-3 py-1 text-xs font-medium bg-[#fbc646] text-[#051d40] rounded-full mb-2 md:mb-3"
                  >
                    {{ getCategoryName(relatedArticle.category) }}
                  </span>
                  <h3
                    class="text-lg font-bold text-[#051d40] mb-2 group-hover:text-[#fbc646] transition-colors duration-300"
                  >
                    {{ getRelatedArticleTitle(relatedArticle) }}
                  </h3>
                  <p class="text-gray-600 text-sm mb-4">
                    {{ getRelatedArticleExcerpt(relatedArticle) }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- Back to Articles -->
      <section class="py-6 md:py-8 bg-white border-t border-gray-200">
        <div class="container mx-auto px-4 text-center">
          <router-link
            to="/articles"
            class="inline-flex items-center text-[#051d40] hover:text-blue-700 font-medium transition duration-300 text-sm md:text-base"
          >
            <svg
              class="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2"
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
            Back to All Articles
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useArticleStore } from "@/stores/articleStore.js";
import {
  getLocalizedTitle,
  getLocalizedExcerpt,
  getLocalizedContent,
  formatArticleDate,
  getArticleTags,
} from "@/utils/articleUtils.js";
import { getCategoryName as getCategoryNameUtil } from "@/utils/categoryUtils.js";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();

// Use article store
const articleStore = useArticleStore();

// Local state for UI
const notFound = ref(false);
const relatedArticles = ref([]);

// Load article from Firebase
const loadArticle = async () => {
  try {
    console.log("Loading article from Firebase...");
    const slug = route.params.slug;
    const foundArticle = await articleStore.readArticleBySlug(slug);

    if (foundArticle && foundArticle.length > 0) {
      console.log("Article found in Firebase:", foundArticle);
      // Get related articles by category
      if (articleStore.currentArticle) {
        const related = await articleStore.fetchArticlesByCategory(
          articleStore.currentArticle.category,
          4 // Get 4 to filter out current article
        );
        // Filter out current article from related articles
        relatedArticles.value = related
          .filter((article) => article.id !== articleStore.currentArticle.id)
          .slice(0, 3);
      }
      notFound.value = false;

      // Update meta tags after article is loaded
      updateMetaTags();
    } else {
      notFound.value = true;
    }
  } catch (error) {
    console.error("Error loading article:", error);
    notFound.value = true;
  }
};

// Computed properties using store functions
const localizedTitle = computed(() => {
  return getLocalizedTitle(articleStore.currentArticle, locale.value);
});

const localizedExcerpt = computed(() => {
  return getLocalizedExcerpt(articleStore.currentArticle, locale.value);
});

const localizedContent = computed(() => {
  return getLocalizedContent(articleStore.currentArticle, locale.value);
});

const articleTags = computed(() => {
  return getArticleTags(articleStore.currentArticle);
});

// SEO Meta Tags Management
const updateMetaTags = () => {
  if (!articleStore.currentArticle) return;

  const title =
    articleStore.currentArticle.metaTitle?.[locale.value] ||
    articleStore.currentArticle.metaTitle?.en ||
    localizedTitle.value ||
    "Article";

  const description =
    articleStore.currentArticle.metaDescription?.[locale.value] ||
    articleStore.currentArticle.metaDescription?.en ||
    localizedExcerpt.value ||
    "";

  const image = articleStore.currentArticle.image || "";
  const url = window.location.href;

  // Update document title
  document.title = `${title} | WebsDee`;

  // Update or create meta tags
  updateMetaTag("description", description);
  updateMetaTag("keywords", articleStore.currentArticle.tags?.join(", ") || "");

  // Open Graph meta tags
  updateMetaTag("og:title", title, "property");
  updateMetaTag("og:description", description, "property");
  updateMetaTag("og:image", image, "property");
  updateMetaTag("og:url", url, "property");
  updateMetaTag("og:type", "article", "property");

  // Twitter Card meta tags
  updateMetaTag("twitter:card", "summary_large_image", "name");
  updateMetaTag("twitter:title", title, "name");
  updateMetaTag("twitter:description", description, "name");
  updateMetaTag("twitter:image", image, "name");

  // Article specific meta tags
  if (articleStore.currentArticle.author?.name) {
    updateMetaTag("author", articleStore.currentArticle.author.name);
  }

  // Canonical URL
  updateLinkTag("canonical", url);
};

const updateMetaTag = (name, content, attribute = "name") => {
  if (!content) return;

  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const updateLinkTag = (rel, href) => {
  if (!href) return;

  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

// Watch for article changes to update meta tags
watch(() => articleStore.currentArticle, updateMetaTags, { deep: true });
watch(locale, updateMetaTags);

// Helper function to get category name
const getCategoryName = (categoryId) => {
  return getCategoryNameUtil(categoryId);
};

// Helper function to format date
const formatDate = (article) => {
  return formatArticleDate(article, locale.value);
};

const getRelatedArticleTitle = (relatedArticle) => {
  return relatedArticle.title[locale.value] || relatedArticle.title.en;
};

const getRelatedArticleExcerpt = (relatedArticle) => {
  return relatedArticle.excerpt[locale.value] || relatedArticle.excerpt.en;
};

const goToArticle = (slug) => {
  router.push(`/articles/${slug}`);
};

const goBack = () => {
  router.push("/articles");
};

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(localizedTitle.value);
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "_blank"
  );
};

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const shareOnLinkedIn = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(localizedTitle.value);
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
    "_blank"
  );
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

onMounted(() => {
  loadArticle();
});
</script>

<style scoped>
.article-detail-container {
  min-height: 100vh;
}

/* Enhanced styles for TipTap HTML content */
.article-content {
  color: #374151 !important;
  line-height: 1.75 !important;
  font-size: 1rem !important;
}

.article-content h1 {
  font-size: 2.25rem !important;
  font-weight: bold !important;
  color: #051d40 !important;
  margin: 2rem 0 1rem 0 !important;
  padding: 0 !important;
  line-height: 1.2 !important;
  display: block !important;
}

.article-content h2 {
  font-size: 1.875rem !important;
  font-weight: bold !important;
  color: #051d40 !important;
  margin: 2rem 0 1rem 0 !important;
  padding: 0 !important;
  line-height: 1.3 !important;
  display: block !important;
}

.article-content h3 {
  font-size: 1.5rem !important;
  font-weight: bold !important;
  color: #051d40 !important;
  margin: 1.5rem 0 0.75rem 0 !important;
  padding: 0 !important;
  line-height: 1.4 !important;
  display: block !important;
}

.article-content h4 {
  font-size: 1.25rem !important;
  font-weight: bold !important;
  color: #051d40 !important;
  margin: 1.5rem 0 0.75rem 0 !important;
  padding: 0 !important;
  line-height: 1.4 !important;
  display: block !important;
}

.article-content h5 {
  font-size: 1.125rem !important;
  font-weight: bold !important;
  color: #051d40 !important;
  margin: 1.25rem 0 0.5rem 0 !important;
  padding: 0 !important;
  line-height: 1.4 !important;
  display: block !important;
}

.article-content h6 {
  font-size: 1rem !important;
  font-weight: bold !important;
  color: #051d40 !important;
  margin: 1.25rem 0 0.5rem 0 !important;
  padding: 0 !important;
  line-height: 1.4 !important;
  display: block !important;
}

.article-content p {
  color: #374151 !important;
  line-height: 1.75 !important;
  margin: 0 0 1.25rem 0 !important;
  padding: 0 !important;
  white-space: pre-wrap !important;
  display: block !important;
  font-size: 1rem !important;
}

.article-content p:first-child {
  margin-top: 0 !important;
}

.article-content p:last-child {
  margin-bottom: 0 !important;
}

.article-content strong {
  font-weight: 600 !important;
  color: #111827 !important;
}

.article-content em {
  font-style: italic !important;
}

.article-content u {
  text-decoration: underline !important;
}

/* Fix for lists - make them visible and properly styled */
.article-content ul {
  display: block !important;
  margin: 1.25rem 0 !important;
  padding: 0 0 0 1.75rem !important;
  list-style-type: disc !important;
  list-style-position: outside !important;
}

.article-content ol {
  display: block !important;
  margin: 1.25rem 0 !important;
  padding: 0 0 0 1.75rem !important;
  list-style-type: decimal !important;
  list-style-position: outside !important;
}

.article-content li {
  display: list-item !important;
  margin: 0.5rem 0 !important;
  padding: 0 !important;
  line-height: 1.75 !important;
  color: #374151 !important;
  list-style: inherit !important;
}

.article-content li::marker {
  color: #374151 !important;
}

.article-content li > p {
  margin: 0.5rem 0 !important;
  display: inline !important;
}

.article-content ul ul,
.article-content ul ol,
.article-content ol ul,
.article-content ol ol {
  margin: 0.75rem 0 !important;
  padding-left: 1.5rem !important;
}

.article-content blockquote {
  border-left: 4px solid #fbc646 !important;
  padding: 0.5rem 1rem !important;
  font-style: italic !important;
  color: #6b7280 !important;
  margin: 1.75rem 0 !important;
  background-color: #f9fafb !important;
  border-radius: 0.375rem !important;
  display: block !important;
}

.article-content blockquote p {
  margin: 0 !important;
  padding: 0 !important;
}

.article-content a {
  color: #051d40 !important;
  text-decoration: underline !important;
  text-underline-offset: 2px !important;
  transition: color 0.2s ease !important;
}

.article-content a:hover {
  color: #fbc646 !important;
}

.article-content code {
  background-color: #f3f4f6 !important;
  color: #1f2937 !important;
  padding: 0.125rem 0.375rem !important;
  border-radius: 0.25rem !important;
  font-size: 0.875rem !important;
  font-family: "Consolas", "Monaco", "Courier New", monospace !important;
}

.article-content pre {
  background-color: #1f2937 !important;
  color: #f9fafb !important;
  padding: 1.25rem !important;
  border-radius: 0.5rem !important;
  overflow-x: auto !important;
  margin: 1.75rem 0 !important;
  font-family: "Consolas", "Monaco", "Courier New", monospace !important;
  line-height: 1.5 !important;
  display: block !important;
}

.article-content pre code {
  background-color: transparent !important;
  color: inherit !important;
  padding: 0 !important;
  border-radius: 0 !important;
  font-size: inherit !important;
}

.article-content img {
  border-radius: 0.5rem !important;
  margin: 1.75rem 0 !important;
  max-width: 100% !important;
  height: auto !important;
  display: block !important;
}

.article-content hr {
  border: none !important;
  border-top: 1px solid #e5e7eb !important;
  margin: 2rem 0 !important;
  display: block !important;
}

/* Force spacing for empty elements */
.article-content br {
  display: block !important;
  margin: 0.5rem 0 !important;
  content: "" !important;
  line-height: 1rem !important;
}

.article-content p:empty {
  min-height: 1.5rem !important;
  display: block !important;
  margin: 0 0 1.25rem 0 !important;
}

/* Ensure proper spacing between all block elements */
.article-content > * {
  margin-bottom: 1rem !important;
}

.article-content > *:last-child {
  margin-bottom: 0 !important;
}

/* Table styles */
.article-content table {
  width: 100% !important;
  margin: 1.75rem 0 !important;
  border-collapse: collapse !important;
  display: table !important;
}

.article-content th,
.article-content td {
  border: 1px solid #e5e7eb !important;
  padding: 0.75rem !important;
  text-align: left !important;
}

.article-content th {
  background-color: #f9fafb !important;
  font-weight: 600 !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .article-content h1 {
    font-size: 1.875rem !important;
  }

  .article-content h2 {
    font-size: 1.5rem !important;
  }

  .article-content h3 {
    font-size: 1.25rem !important;
  }

  .article-content {
    font-size: 0.9rem !important;
  }
}
</style>
