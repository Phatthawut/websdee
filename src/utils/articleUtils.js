/**
 * Article utility functions
 * Pure functions for article data manipulation and formatting
 */

/**
 * Get localized title from article object
 */
export const getLocalizedTitle = (article, locale = "en") => {
  return article?.title?.[locale] || article?.title?.en || "";
};

/**
 * Get localized excerpt from article object
 */
export const getLocalizedExcerpt = (article, locale = "en") => {
  return article?.excerpt?.[locale] || article?.excerpt?.en || "";
};

/**
 * Get localized content from article object
 */
export const getLocalizedContent = (article, locale = "en") => {
  return article?.content?.[locale] || article?.content?.en || "";
};

/**
 * Format article date for display
 */
export const formatArticleDate = (article, locale = "en") => {
  if (!article) return "";

  let dateToFormat;

  // Handle Firestore timestamps and different date fields
  if (article.createdAt && article.createdAt.toDate) {
    dateToFormat = article.createdAt.toDate(); // Firestore timestamp
  } else if (article.createdAt) {
    dateToFormat = new Date(article.createdAt);
  } else if (article.publishedAt) {
    dateToFormat = new Date(article.publishedAt);
  } else if (article.updatedAt && article.updatedAt.toDate) {
    dateToFormat = article.updatedAt.toDate();
  } else {
    return "";
  }

  return dateToFormat.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Get article tags array (handles both array and string formats)
 */
export const getArticleTags = (article) => {
  // Handle both array (tags) and string (tag) formats
  if (article?.tags && Array.isArray(article.tags)) {
    return article.tags;
  } else if (article?.tag && typeof article.tag === "string") {
    return article.tag.split(",").map((tag) => tag.trim());
  }
  return [];
};

/**
 * Generate article excerpt if none exists
 */
export const generateExcerpt = (content, maxLength = 150) => {
  if (!content) return "";

  // Strip HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, "");

  if (plainText.length <= maxLength) return plainText;

  return plainText.substring(0, maxLength).trim() + "...";
};

/**
 * Calculate estimated reading time
 */
export const calculateReadingTime = (content) => {
  if (!content) return 0;

  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);

  return Math.max(1, readingTime); // Minimum 1 minute
};

/**
 * Check if article is recently published (within last 7 days)
 */
export const isRecentArticle = (article) => {
  if (!article) return false;

  let articleDate;
  if (article.createdAt && article.createdAt.toDate) {
    articleDate = article.createdAt.toDate();
  } else if (article.publishedAt) {
    articleDate = new Date(article.publishedAt);
  } else {
    return false;
  }

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return articleDate > weekAgo;
};
