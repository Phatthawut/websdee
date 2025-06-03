/**
 * Cache Service
 * Handles article caching logic
 */

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const cache = new Map();

export const cacheService = {
  // Check if cache is valid
  isValid(key) {
    const cached = cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < CACHE_DURATION;
  },

  // Get from cache
  get(key) {
    const cached = cache.get(key);
    if (cached && this.isValid(key)) {
      return cached.data;
    }
    return null;
  },

  // Set cache
  set(key, data) {
    cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  },

  // Clear specific cache
  clear(key) {
    cache.delete(key);
  },

  // Clear all cache
  clearAll() {
    cache.clear();
  },

  // Get cache keys
  keys() {
    return Array.from(cache.keys());
  },
};
