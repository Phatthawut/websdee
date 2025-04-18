<template>
  <div class="py-16 px-4 bg-gray-50">
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-8">404</h1>
      <h2 class="text-3xl font-semibold text-gray-700 mb-8">Page Not Found</h2>
      <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <router-link
        to="/"
        class="inline-block bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition duration-300"
      >
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script setup></script>
