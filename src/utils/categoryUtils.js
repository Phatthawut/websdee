/**
 * Category utility functions
 */

// Default categories configuration
export const DEFAULT_CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "web-development", name: "Web Development" },
  { id: "design", name: "Design" },
  { id: "seo", name: "SEO" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
];

/**
 * Get category name by ID
 */
export const getCategoryName = (
  categoryId,
  categories = DEFAULT_CATEGORIES
) => {
  const category = categories.find((cat) => cat.id === categoryId);
  return category ? category.name : categoryId;
};

/**
 * Get category object by ID
 */
export const getCategoryById = (
  categoryId,
  categories = DEFAULT_CATEGORIES
) => {
  return categories.find((cat) => cat.id === categoryId);
};

/**
 * Get all categories except 'all'
 */
export const getActiveCategories = (categories = DEFAULT_CATEGORIES) => {
  return categories.filter((cat) => cat.id !== "all");
};

/**
 * Check if category exists
 */
export const categoryExists = (categoryId, categories = DEFAULT_CATEGORIES) => {
  return categories.some((cat) => cat.id === categoryId);
};

/**
 * Get categories for forms/selects
 */
export const getCategoriesForSelect = () => {
  return DEFAULT_CATEGORIES.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));
};
