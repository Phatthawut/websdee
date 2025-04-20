<template>
  <section id="services" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">{{ $t("services.title") }}</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          {{ $t("services.subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Service 1 -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col h-full items-center"
        >
          <div class="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-[#fbc646]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-bold ml-3">
              {{ $t("services.items.web.title") }}
            </h3>
          </div>
          <p class="text-gray-600 mb-4">
            {{ $t("services.items.web.description") }}
          </p>
          <div class="mt-auto">
            <router-link
              to="/services"
              class="inline-block bg-[#fbc646] text-[#051d40] font-semibold px-6 py-2 rounded hover:bg-yellow-500 transition duration-300"
            >
              {{ $t("services.learnMore") }}
            </router-link>
          </div>
        </div>

        <!-- Service 2 -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col h-full items-center"
        >
          <div class="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-[#fbc646]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
              <path
                d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"
              />
            </svg>
            <h3 class="text-xl font-bold ml-3">
              {{ $t("services.items.ecommerce.title") }}
            </h3>
          </div>
          <p class="text-gray-600 mb-4">
            {{ $t("services.items.ecommerce.description") }}
          </p>
          <div class="mt-auto">
            <router-link
              to="/services"
              class="inline-block bg-[#fbc646] text-[#051d40] font-semibold px-6 py-2 rounded hover:bg-yellow-500 transition duration-300"
            >
              {{ $t("services.learnMore") }}
            </router-link>
          </div>
        </div>

        <!-- Service 3 -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col h-full items-center"
        >
          <div class="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-[#fbc646]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-bold ml-3">
              {{ $t("services.items.seo.title") }}
            </h3>
          </div>
          <p class="text-gray-600 mb-4">
            {{ $t("services.items.seo.description") }}
          </p>
          <div class="mt-auto">
            <router-link
              to="/services"
              class="inline-block bg-[#fbc646] text-[#051d40] font-semibold px-6 py-2 rounded hover:bg-yellow-500 transition duration-300"
            >
              {{ $t("services.learnMore") }}
            </router-link>
          </div>
        </div>

        <!-- Service 4 -->
        <div
          class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col h-full items-center"
        >
          <div class="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-[#fbc646]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-bold ml-3">
              {{ $t("services.items.maintenance.title") }}
            </h3>
          </div>
          <p class="text-gray-600 mb-4">
            {{ $t("services.items.maintenance.description") }}
          </p>
          <div class="mt-auto">
            <router-link
              to="/services"
              class="inline-block bg-[#fbc646] text-[#051d40] font-semibold px-6 py-2 rounded hover:bg-yellow-500 transition duration-300"
            >
              {{ $t("services.learnMore") }}
            </router-link>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <router-link
          to="/services"
          class="inline-block bg-[#051d40] text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-900 transition duration-300"
        >
          {{ $t("services.viewAllServices") }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props or logic needed at this moment
</script>

<style scoped>
/* Styles if needed */
</style>
