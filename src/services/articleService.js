/**
 * Article Service
 * Business logic layer that combines store, cache, and search
 */

import { useArticleStore } from "@/stores/articleStore.js";
import { cacheService } from "./cacheService.js";
import { searchService } from "./searchService.js";

export const articleService = {
  // Get articles with caching
  async getArticles(limitCount = 20, useCache = true) {
    const cacheKey = `articles_${limitCount}`;

    // Check cache first
    if (useCache) {
      const cached = cacheService.get(cacheKey);
      if (cached) return cached;
    }

    // Fetch from store/database
    const store = useArticleStore();
    const articles = await store.readArticles(limitCount);

    // Cache the result
    cacheService.set(cacheKey, articles);

    return articles;
  },

  // Get single article with caching
  async getArticleBySlug(slug, useCache = true) {
    const cacheKey = `article_${slug}`;

    if (useCache) {
      const cached = cacheService.get(cacheKey);
      if (cached) return cached;
    }

    const store = useArticleStore();
    const article = await store.readArticleBySlug(slug);

    if (article) {
      cacheService.set(cacheKey, article);
    }

    return article;
  },

  // Get related articles
  async getRelatedArticles(currentArticleId, category, limit = 3) {
    const cacheKey = `related_${category}_${limit}`;

    let articles = cacheService.get(cacheKey);
    if (!articles) {
      const store = useArticleStore();
      articles = await store.readArticlesByCategory(category, limit * 2); // Get more to filter
      cacheService.set(cacheKey, articles);
    }

    // Filter out current article and limit results
    const related = articles
      .filter((article) => article.id !== currentArticleId)
      .slice(0, limit);

    return related;
  },

  // Search articles with filtering
  async searchArticles({ searchTerm, category, page = 1, itemsPerPage = 9 }) {
    // Get all articles (cached if possible)
    const allArticles = await this.getArticles(100, true);

    // Apply search and filters
    const filteredArticles = searchService.searchAndFilter(allArticles, {
      searchTerm,
      category,
    });

    // Apply pagination
    const paginatedArticles = searchService.paginate(
      filteredArticles,
      page,
      itemsPerPage
    );
    const paginationInfo = searchService.getPaginationInfo(
      filteredArticles,
      page,
      itemsPerPage
    );

    return {
      articles: paginatedArticles,
      pagination: paginationInfo,
      totalResults: filteredArticles.length,
    };
  },

  // Create article (invalidate cache)
  async createArticle(articleData) {
    const store = useArticleStore();
    const result = await store.createArticle(articleData);

    // Invalidate cache
    cacheService.clearAll();

    return result;
  },

  // Update article (invalidate cache)
  async updateArticle(articleId, updateData) {
    const store = useArticleStore();
    const result = await store.updateArticle(articleId, updateData);

    // Invalidate cache
    cacheService.clearAll();

    return result;
  },

  // Delete article (invalidate cache)
  async deleteArticle(articleId) {
    const store = useArticleStore();
    const result = await store.deleteArticle(articleId);

    // Invalidate cache
    cacheService.clearAll();

    return result;
  },

  // Get store loading state
  getLoadingState() {
    const store = useArticleStore();
    return {
      loading: store.loading,
      error: store.error,
      lastOperation: store.lastOperation,
    };
  },

  // Clear all caches
  clearCache() {
    cacheService.clearAll();
  },
};
