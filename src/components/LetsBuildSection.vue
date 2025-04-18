<template>
  <section class="lets-build-section py-16 px-4 bg-blue-700 text-white">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6">Let's Build Your Future</h2>
      <p class="text-xl mb-8 max-w-3xl mx-auto">
        Your online presence is more than just a website—it's your brand's
        foundation. We craft affordable websites that help your business grow
        and stand out. Let's build something amazing together.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <router-link
          to="/contact"
          class="bg-white text-blue-700 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300"
        >
          Request a Quote
        </router-link>
        <router-link
          to="/contact"
          class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-blue-700 transition duration-300"
        >
          Talk to Us
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
