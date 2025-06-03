/**
 * Search Service
 * Handles article search and filtering logic
 */

import {
  getLocalizedTitle,
  getLocalizedExcerpt,
  getArticleTags,
} from "@/utils/articleUtils.js";

export const searchService = {
  // Filter articles by search term
  filterBySearchTerm(articles, searchTerm) {
    if (!searchTerm) return articles;

    const term = searchTerm.toLowerCase();
    return articles.filter((article) => {
      // Check title in both languages
      const titleMatch =
        getLocalizedTitle(article, "en").toLowerCase().includes(term) ||
        getLocalizedTitle(article, "th").toLowerCase().includes(term);

      // Check excerpt in both languages
      const excerptMatch =
        getLocalizedExcerpt(article, "en").toLowerCase().includes(term) ||
        getLocalizedExcerpt(article, "th").toLowerCase().includes(term);

      // Check tags
      const tags = getArticleTags(article);
      const tagsMatch = tags.some((tag) => tag.toLowerCase().includes(term));

      return titleMatch || excerptMatch || tagsMatch;
    });
  },

  // Filter articles by category
  filterByCategory(articles, category) {
    if (!category || category === "all") return articles;
    return articles.filter((article) => article.category === category);
  },

  // Combined search and filter
  searchAndFilter(articles, { searchTerm, category }) {
    let filtered = articles;

    // Apply category filter first
    filtered = this.filterByCategory(filtered, category);

    // Apply search filter
    filtered = this.filterBySearchTerm(filtered, searchTerm);

    return filtered;
  },

  // Paginate results
  paginate(articles, page = 1, itemsPerPage = 9) {
    const startIndex = (page - 1) * itemsPerPage;
    return articles.slice(startIndex, startIndex + itemsPerPage);
  },

  // Get pagination info
  getPaginationInfo(articles, page = 1, itemsPerPage = 9) {
    const totalItems = articles.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage,
      hasNextPage,
      hasPrevPage,
    };
  },
};
