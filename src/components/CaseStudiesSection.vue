<template>
  <section class="bg-gray-50 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <span class="text-blue-700 font-medium">OUR WORK</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Case Studies
        </h2>
        <p class="mt-4 text-gray-600 max-w-3xl mx-auto">
          Case studies that showcase the agency's expertise in serving specific
          clients.
        </p>
      </div>

      <!-- Case Studies Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Case Study 1 -->
        <div
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
        >
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1576671081098-d40121d88ca4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Healthcare case study"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900">
              Demystifying IT Services: A Digital Healthcare Transformation
            </h3>
            <p class="mt-2 text-gray-600 text-sm">
              Learn how we helped a healthcare provider improve patient care and
              operational efficiency through digital transformation.
            </p>
            <div class="mt-4 text-sm text-gray-500">SEPTEMBER 15, 2023</div>
          </div>
        </div>

        <!-- Case Study 2 -->
        <div
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
        >
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Banking case study"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900">
              Unlocking Business Potential: The Bank Of IT Services Today
            </h3>
            <p class="mt-2 text-gray-600 text-sm">
              Discover how we helped a financial institution modernize their IT
              infrastructure to support rapid growth and improve security.
            </p>
            <div class="mt-4 text-sm text-gray-500">SEPTEMBER 22, 2023</div>
          </div>
        </div>

        <!-- Case Study 3 -->
        <div
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
        >
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Business case study"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900">
              Tech Insights: How IT Services Drive Modern Business
            </h3>
            <p class="mt-2 text-gray-600 text-sm">
              Learn how we implemented a custom ERP solution that helped a
              manufacturing company optimize operations and reduce costs.
            </p>
            <div class="mt-4 text-sm text-gray-500">OCTOBER 05, 2023</div>
          </div>
        </div>
      </div>

      <!-- Pagination Dots -->
      <div class="flex justify-center mt-10 space-x-2">
        <button class="w-2 h-2 rounded-full bg-blue-700"></button>
        <button
          class="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-700 transition duration-300"
        ></button>
        <button
          class="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-700 transition duration-300"
        ></button>
        <button
          class="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-700 transition duration-300"
        ></button>
        <button
          class="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-700 transition duration-300"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional functionality needed for this component
</script>
