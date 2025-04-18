<template>
  <div class="page-container py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            Welcome to Our Page
          </h1>

          <div class="prose max-w-none">
            <p class="text-lg text-gray-600 mb-6">
              This is a dedicated page that can contain various types of content
              such as articles, information about your company, services, or any
              other important information you want to share with your visitors.
            </p>

            <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Our Mission
            </h2>
            <p class="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
              eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget
              ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl
              nisl eget nisl.
            </p>

            <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Our Services
            </h2>
            <ul class="list-disc pl-6 mb-6 text-gray-600">
              <li class="mb-2">Service 1 - Description of the service</li>
              <li class="mb-2">Service 2 - Description of the service</li>
              <li class="mb-2">Service 3 - Description of the service</li>
              <li class="mb-2">Service 4 - Description of the service</li>
            </ul>

            <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              Contact Us
            </h2>
            <p class="text-gray-600 mb-6">
              If you have any questions or inquiries, please don&apos;t hesitate
              to contact us.
            </p>

            <div class="mt-8">
              <router-link
                to="/contact"
                class="inline-block bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition duration-300"
              >
                Get in Touch
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No imports needed
</script>

<style scoped>
.page-container {
  min-height: calc(100vh - 300px); /* Adjust based on header/footer height */
  background-color: #f7f9fc;
}
</style>
