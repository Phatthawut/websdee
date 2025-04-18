<template>
  <section class="footer-cta-section py-16 px-4 bg-blue-800 text-white">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6">Ready to get online fast?</h2>
      <p class="text-xl mb-8">
        Choose your package and let us build your dream website.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <router-link
          to="/solutions"
          class="bg-white text-blue-800 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300"
        >
          Choose a Plan
        </router-link>
        <router-link
          to="/contact"
          class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-blue-800 transition duration-300"
        >
          Message Us Now
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props or logic needed for now
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
