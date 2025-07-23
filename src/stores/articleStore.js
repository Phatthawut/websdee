import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  limit,
  startAfter,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/services/firebase.js";

export const useArticleStore = defineStore("article", () => {
  // State using ref
  const articles = ref([]);
  const currentArticle = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const lastOperation = ref(null);
  const operationTimestamp = ref(null);

  // Getters using computed
  const getArticles = computed(() => {
    return (id) => articles.value.find((article) => article.id === id);
  });

  const getArticleBySlug = computed(() => {
    return (slug) => articles.value.find((article) => article.slug === slug);
  });

  const getArticlesByCategory = computed(() => {
    return (category) =>
      articles.value.filter((article) => article.category === category);
  });

  // CREATE

  // READ - Get all articles
  const fetchArticles = async (limitCount = 10) => {
    loading.value = true;
    error.value = "";

    try {
      const articlesQuery = query(
        collection(db, "articles"),
        where("status", "==", "published"),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(articlesQuery);

      const articlesList = [];
      querySnapshot.forEach((doc) => {
        articlesList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      articles.value = articlesList;
      loading.value = false;
      error.value = null;
      lastOperation.value = "READ_ARTICLES_SUCCESS";
      operationTimestamp.value = Date.now();
      return articlesList;
    } catch (err) {
      console.error("Error fetching articles:", err);
      error.value = "Failed to load articles. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  // READ - Get single article by ID
  const readArticleById = async (id) => {
    loading.value = true;
    error.value = "";

    try {
      const articleRef = doc(db, "articles", id);
      const articleSnapshot = await getDoc(articleRef);

      if (articleSnapshot.exists()) {
        currentArticle.value = {
          id: articleSnapshot.id,
          ...articleSnapshot.data(),
        };
      } else {
        error.value = "Article not found";
        currentArticle.value = null;
      }
    } catch (err) {
      console.error("Error fetching article:", err);
      error.value = "Failed to load article. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  // READ - Get single article by slug
  const readArticleBySlug = async (slug) => {
    loading.value = true;
    error.value = "";

    try {
      const articleQuery = query(
        collection(db, "articles"),
        where("slug", "==", slug),
        where("status", "==", "published"),
        limit(1)
      );

      const querySnapshot = await getDocs(articleQuery);

      if (!querySnapshot.empty) {
        const articleWithSlug = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (articleWithSlug.length === 1) {
          currentArticle.value = articleWithSlug[0];
        } else {
          error.value = "Article not found";
          currentArticle.value = null;
        }
        return articleWithSlug;
      } else {
        error.value = "Article not found";
        currentArticle.value = null;
        return [];
      }
    } catch (err) {
      console.error("Error fetching article:", err);
      error.value = "Failed to load article. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  // READ - Get articles by category
  const fetchArticlesByCategory = async (category, limitCount = 10) => {
    loading.value = true;
    error.value = "";

    try {
      const articlesQuery = query(
        collection(db, "articles"),
        where("category", "==", category),
        where("status", "==", "published"),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(articlesQuery);

      if (!querySnapshot.empty) {
        const articlesWithCategory = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return articlesWithCategory;
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      error.value = "Failed to load articles. Please try again.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  // UPDATE
  const updateArticle = async (articleId, updateData) => {
    loading.value = true;
    error.value = "";

    try {
      const articleRef = doc(db, "articles", articleId);
      await updateDoc(articleRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      });

      // Update local state
      const index = articles.value.findIndex((a) => a.id === articleId);
      if (index !== -1) {
        articles.value[index] = {
          ...articles.value[index],
          ...updateData,
          updatedAt: new Date(),
        };
      }

      return true;
    } catch (err) {
      console.error("Error updating article:", err);
      error.value = "Failed to update article. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  // DELETE
  const deleteArticle = async (articleId) => {
    loading.value = true;
    error.value = "";

    try {
      const articleRef = doc(db, "articles", articleId);
      await deleteDoc(articleRef);

      // Update local state
      articles.value = articles.value.filter((a) => a.id !== articleId);

      // Clear current article if it's the one being deleted
      if (currentArticle.value?.id === articleId) {
        currentArticle.value = null;
      }

      return true;
    } catch (err) {
      console.error("Error deleting article:", err);
      error.value = "Failed to delete article. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  // Simple state management
  const setCurrentArticle = (article) => {
    currentArticle.value = article;
  };

  const clearError = () => {
    error.value = null;
  };

  const clearCurrentArticle = () => {
    currentArticle.value = null;
  };

  // Reset store to initial state
  const $reset = () => {
    articles.value = [];
    currentArticle.value = null;
    loading.value = false;
    error.value = null;
    lastOperation.value = null;
    operationTimestamp.value = null;
  };

  // Return all state, getters, and actions
  return {
    // State
    articles,
    currentArticle,
    loading,
    error,
    lastOperation,
    operationTimestamp,

    // Getters
    getArticles,
    getArticleBySlug,
    getArticlesByCategory,

    // Actions
    fetchArticles,
    readArticleById,
    readArticleBySlug,
    fetchArticlesByCategory,
    updateArticle,
    deleteArticle,
    setCurrentArticle,
    clearError,
    clearCurrentArticle,
    $reset,
  };
});
