<template>
  <section class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">{{ $t("whyChoose.title") }}</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          {{ $t("whyChoose.subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
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
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-bold ml-3">
              {{ $t("whyChoose.features.affordable.title") }}
            </h3>
          </div>
          <p class="text-gray-600">
            {{ $t("whyChoose.features.affordable.description") }}
          </p>
        </div>

        <!-- Feature 2 -->
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-bold ml-3">
              {{ $t("whyChoose.features.quickDelivery.title") }}
            </h3>
          </div>
          <p class="text-gray-600">
            {{ $t("whyChoose.features.quickDelivery.description") }}
          </p>
        </div>

        <!-- Feature 3 -->
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
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
                d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-bold ml-3">
              {{ $t("whyChoose.features.responsive.title") }}
            </h3>
          </div>
          <p class="text-gray-600">
            {{ $t("whyChoose.features.responsive.description") }}
          </p>
        </div>

        <!-- Feature 4 -->
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          <div class="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-[#fbc646]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
              />
            </svg>
            <h3 class="text-xl font-bold ml-3">
              {{ $t("whyChoose.features.design.title") }}
            </h3>
          </div>
          <p class="text-gray-600">
            {{ $t("whyChoose.features.design.description") }}
          </p>
        </div>

        <!-- Feature 5 -->
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
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
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-bold ml-3">
              {{ $t("whyChoose.features.upgrades.title") }}
            </h3>
          </div>
          <p class="text-gray-600">
            {{ $t("whyChoose.features.upgrades.description") }}
          </p>
        </div>

        <!-- Feature 6 -->
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
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
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-bold ml-3">
              {{ $t("whyChoose.features.transparent.title") }}
            </h3>
          </div>
          <p class="text-gray-600">
            {{ $t("whyChoose.features.transparent.description") }}
          </p>
        </div>
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
