<template>
  <section
    class="hero-section relative text-white min-h-screen flex items-center"
  >
    <!-- Background image Photo by Sandro Katalina on Unsplash -->
    <div
      class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[url(src/assets/images/sandro-katalina-k1bO_VTiZSs-unsplash.webp)]"
      loading="lazy"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 w-full h-full bg-[#051d40] opacity-50"></div>

    <!-- content -->
    <div
      class="container mx-auto px-4 relative z-10 flex flex-col items-center"
    >
      <h1 class="text-4xl font-bold text-white mb-6 leading-tight">About Us</h1>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 25vh;
}
</style>
