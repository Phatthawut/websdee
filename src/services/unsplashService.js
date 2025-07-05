import secureLogger from "@/utils/secureLogger";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = "https://api.unsplash.com";

/**
 * Unsplash API service for fetching high-quality images
 */
class UnsplashService {
  constructor() {
    if (!UNSPLASH_ACCESS_KEY) {
      secureLogger.warn(
        "Unsplash access key not found. Please add VITE_UNSPLASH_ACCESS_KEY to your .env file"
      );
    }
  }

  /**
   * Search for photos by query
   * @param {string} query - Search query
   * @param {number} page - Page number (default: 1)
   * @param {number} perPage - Number of photos per page (default: 12, max: 30)
   * @returns {Promise<Array>} - Array of photos
   */
  async searchPhotos(query, page = 1, perPage = 12) {
    if (!UNSPLASH_ACCESS_KEY) {
      throw new Error("Unsplash access key is required");
    }

    try {
      const url = `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(
        query
      )}&page=${page}&per_page=${perPage}`;

      secureLogger.logApiUrl("Searching Unsplash photos", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          "Accept-Version": "v1",
        },
      });

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`);
      }

      const data = await response.json();
      const formattedPhotos = data.results.map((photo) =>
        this.formatPhoto(photo)
      );

      secureLogger.log("Unsplash search completed", {
        query,
        count: formattedPhotos.length,
        page,
      });

      return formattedPhotos;
    } catch (error) {
      secureLogger.error("Error searching Unsplash photos", error);
      throw error;
    }
  }

  /**
   * Get featured/curated photos
   * @param {number} page - Page number (default: 1)
   * @param {number} perPage - Number of photos per page (default: 12, max: 30)
   * @returns {Promise<Array>} - Array of featured photos
   */
  async getFeaturedPhotos(page = 1, perPage = 12) {
    if (!UNSPLASH_ACCESS_KEY) {
      throw new Error("Unsplash access key is required");
    }

    try {
      secureLogger.log("Fetching featured photos from Unsplash API");

      const url = `${UNSPLASH_API_URL}/photos?page=${page}&per_page=${perPage}&order_by=popular`;
      secureLogger.logApiUrl("API URL", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          "Accept-Version": "v1",
        },
      });

      secureLogger.log("API Response status", { status: response.status });

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`);
      }

      const data = await response.json();
      secureLogger.log("Raw API data received", { count: data.length });

      const formattedPhotos = data.map((photo) => this.formatPhoto(photo));
      secureLogger.log("Formatted photos", { count: formattedPhotos.length });

      return formattedPhotos;
    } catch (error) {
      secureLogger.error("Error fetching featured Unsplash photos", error);
      throw error;
    }
  }

  /**
   * Get photos by category/collection
   * @param {string} category - Category name (e.g., 'business', 'technology', 'design')
   * @param {number} page - Page number
   * @param {number} perPage - Number of photos per page
   * @returns {Promise<Object>} - Search results for category
   */
  async getPhotosByCategory(category, page = 1, perPage = 12) {
    const categoryQueries = {
      "web-development": "programming code computer",
      design: "design ui ux interface",
      seo: "analytics marketing digital",
      business: "business office meeting",
      technology: "technology innovation digital",
    };

    const query = categoryQueries[category] || category;
    return this.searchPhotos(query, page, perPage);
  }

  /**
   * Download/track photo usage (required by Unsplash API guidelines)
   * @param {string} downloadUrl - Download URL from photo object
   * @returns {Promise<string>} - Download URL
   */
  async trackDownload(downloadUrl) {
    if (!UNSPLASH_ACCESS_KEY || !downloadUrl) {
      return downloadUrl;
    }

    try {
      await fetch(downloadUrl, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });
      return downloadUrl;
    } catch (error) {
      secureLogger.error("Error tracking download", error);
      return downloadUrl;
    }
  }

  /**
   * Format photo object for consistent use
   * @param {Object} photo - Raw photo object from Unsplash API
   * @returns {Object} - Formatted photo object
   */
  formatPhoto(photo) {
    return {
      id: photo.id,
      description:
        photo.description || photo.alt_description || "Unsplash Photo",
      urls: {
        raw: photo.urls.raw,
        full: photo.urls.full,
        regular: photo.urls.regular,
        small: photo.urls.small,
        thumb: photo.urls.thumb,
      },
      links: {
        html: photo.links.html,
        download: photo.links.download_location,
      },
      user: {
        name: photo.user.name,
        username: photo.user.username,
        profileUrl: photo.user.links.html,
      },
      width: photo.width,
      height: photo.height,
      color: photo.color,
      downloads: photo.downloads,
      likes: photo.likes,
    };
  }

  /**
   * Generate attribution text for a photo
   * @param {Object} photo - Formatted photo object
   * @returns {string} - Attribution text
   */
  getAttribution(photo) {
    return `Photo by ${photo.user.name} on Unsplash`;
  }

  /**
   * Generate attribution HTML for a photo
   * @param {Object} photo - Formatted photo object
   * @returns {string} - Attribution HTML
   */
  getAttributionHtml(photo) {
    return `Photo by <a href="${photo.user.profileUrl}?utm_source=websdee&utm_medium=referral" target="_blank" rel="noopener">${photo.user.name}</a> on <a href="https://unsplash.com/?utm_source=websdee&utm_medium=referral" target="_blank" rel="noopener">Unsplash</a>`;
  }
}

export const unsplashService = new UnsplashService();
export default unsplashService;
