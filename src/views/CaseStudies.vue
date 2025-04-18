<template>
  <WithBanner title="Case Studies" />
  <div class="py-16 px-4 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">
        Case Studies
      </h1>
      <p class="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Explore how we've helped businesses like yours achieve their goals.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Case Study 1 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="h-48 bg-gray-300"></div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              Financial Services Company
            </h3>
            <p class="text-gray-600 mb-4">
              How we helped a financial services company improve their security
              infrastructure and reduce operational costs.
            </p>
            <a href="#" class="text-blue-600 hover:text-blue-800 font-medium"
              >Read case study →</a
            >
          </div>
        </div>

        <!-- Case Study 2 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="h-48 bg-gray-300"></div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              Healthcare Provider
            </h3>
            <p class="text-gray-600 mb-4">
              Transforming patient care through integrated technology solutions
              for a leading healthcare provider.
            </p>
            <a href="#" class="text-blue-600 hover:text-blue-800 font-medium"
              >Read case study →</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WithBanner from "@/components/WithBanner.vue";
</script>
