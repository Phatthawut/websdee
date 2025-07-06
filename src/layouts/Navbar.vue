<template>
  <header class="bg-white shadow-sm">
    <nav
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
    >
      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center">
        <router-link to="/" class="flex items-center">
          <img src="/WebsDee-logo.png" alt="WebsDee Logo" class="w-35" />
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center space-x-8">
        <!--
        <router-link
          to="/"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >{{ $t("nav.home") }}</router-link
        > -->
        <router-link
          to="/solutions"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >{{ $t("nav.solutions") }}</router-link
        >
        <router-link
          to="/about"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >{{ $t("nav.about") }}</router-link
        >
        <router-link
          to="/services"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >{{ $t("nav.services") }}</router-link
        >
        <router-link
          to="/articles"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >{{ $t("nav.articles") }}</router-link
        >
        <!--
        <router-link
          to="/contact"
          class="text-gray-700 hover:text-blue-700 font-medium"
          >{{ $t("nav.contact") }}</router-link
        > -->
      </div>

      <!-- Contact Info and Button -->
      <div class="hidden lg:flex items-center space-x-4">
        <LanguageSwitcher class="mr-4" />
        <a href="tel:+66834755212" class="text-gray-600 hover:text-blue-700">
          <span class="font-medium">083 475 5212</span>
        </a>
        <router-link
          to="/contact"
          class="bg-blue-700 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition duration-300"
        >
          {{ $t("nav.contact") }}
        </router-link>
      </div>

      <!-- Mobile menu button -->
      <div class="lg:hidden flex items-center">
        <LanguageSwitcher class="mr-4" />
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
    <div v-if="isMenuOpen" class="lg:hidden bg-white pt-2 pb-4 px-4">
      <div class="flex flex-col space-y-3">
        <router-link
          to="/"
          @click="closeMenu"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >{{ $t("nav.home") }}</router-link
        >
        <router-link
          to="/solutions"
          @click="closeMenu"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >{{ $t("nav.solutions") }}</router-link
        >
        <router-link
          to="/about"
          @click="closeMenu"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >{{ $t("nav.about") }}</router-link
        >
        <router-link
          to="/services"
          @click="closeMenu"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >{{ $t("nav.services") }}</router-link
        >
        <router-link
          to="/articles"
          @click="closeMenu"
          class="text-gray-700 hover:text-blue-700 font-medium py-2"
          >{{ $t("nav.articles") }}</router-link
        >
        <router-link
          to="/contact"
          @click="closeMenu"
          class="bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-center"
          >{{ $t("nav.contact") }}</router-link
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// Close menu when clicking outside or pressing escape
const handleClickOutside = (event) => {
  const navbar = event.target.closest("header");
  if (!navbar && isMenuOpen.value) {
    closeMenu();
  }
};

const handleEscapeKey = (event) => {
  if (event.key === "Escape" && isMenuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscapeKey);
});
</script>
