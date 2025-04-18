<template>
  <!-- Banner Section -->
  <section
    class="banner-section relative text-white flex items-center"
    :style="{ minHeight }"
  >
    <!-- Background image -->
    <div
      class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
      loading="lazy"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 w-full h-full bg-[#051d40] opacity-50"></div>

    <!-- Banner content -->
    <div
      class="container mx-auto px-4 relative z-10 flex flex-col items-center"
    >
      <h1 class="text-4xl font-bold text-white mb-6 leading-tight">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-white text-xl mb-6 max-w-2xl text-center">
        {{ subtitle }}
      </p>
      <!-- Banner slot for extra content within the banner -->
      <slot name="banner"></slot>
    </div>
  </section>

  <!-- Main content -->
  <slot></slot>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    default: "src/assets/images/sandro-katalina-k1bO_VTiZSs-unsplash.webp",
  },
  minHeight: {
    type: String,
    default: "25vh",
  },
  subtitle: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.banner-section {
  width: 100%;
}
</style>
