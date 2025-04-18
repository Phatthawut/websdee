<template>
  <header class="bg-white shadow-sm">
    <nav
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
    >
      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center">
        <router-link to="/" class="flex items-center">
          <span class="text-xl font-bold text-blue-700">WebsDee</span>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <router-link
          to="/"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >Home</router-link
        >
        <router-link
          to="/page"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >Page</router-link
        >
        <router-link
          to="/solutions"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >Solutions</router-link
        >
        <router-link
          to="/company"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >Company</router-link
        >
        <router-link
          to="/case-studies"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >Case Studies</router-link
        >
        <router-link
          to="/blog"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >Blog</router-link
        >
        <router-link
          to="/faq"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >FAQs</router-link
        >
      </div>

      <!-- Contact Info and Button -->
      <div class="hidden md:flex items-center space-x-4">
        <a href="tel:+18554007002" class="text-gray-600 hover:text-blue-700">
          <span class="font-medium">083 475 5212</span>
        </a>
        <router-link
          to="/contact"
          class="bg-blue-700 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition duration-300"
        >
          Contact
        </router-link>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden flex items-center">
        <button
          @click="toggleMenu"
          type="button"
          class="p-2 rounded-md text-gray-700 hover:text-blue-700 focus:outline-none"
        >
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white pt-2 pb-4 px-4">
      <div class="flex flex-col space-y-3">
        <router-link
          to="/"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >Home</router-link
        >
        <router-link
          to="/page"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >Page</router-link
        >
        <router-link
          to="/solutions"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >Solutions</router-link
        >
        <router-link
          to="/company"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >Company</router-link
        >
        <router-link
          to="/case-studies"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >Case Studies</router-link
        >
        <router-link
          to="/blog"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >Blog</router-link
        >
        <router-link
          to="/faq"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >FAQs</router-link
        >
        <router-link
          to="/contact"
          class="bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-center"
          >Contact</router-link
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
