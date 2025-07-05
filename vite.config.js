import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Production optimizations and security
  build: {
    // Remove console.log statements in production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable source maps only in development
    sourcemap: process.env.NODE_ENV !== "production",
  },

  // Define global constants
  define: {
    // Enable secure logging only in development
    __SECURE_LOGGING__: JSON.stringify(process.env.NODE_ENV !== "production"),
    // Disable logging completely in production
    __DISABLE_CONSOLE__: JSON.stringify(process.env.NODE_ENV === "production"),
  },
});
