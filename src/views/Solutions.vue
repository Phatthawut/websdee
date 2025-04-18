<template>
  <WithBanner
    title="Our Solutions"
    subtitle="Customized technology solutions designed to drive your business forward"
  >
    <!-- Optional additional banner content with named slot -->
    <template #banner>
      <button
        class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full mt-4"
      >
        Learn More
      </button>
    </template>

    <!-- Main content in default slot -->
    <div class="solutions-container py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">Our Solutions</h1>

            <div class="prose max-w-none">
              <p class="text-lg text-gray-600 mb-6">
                We offer a range of solutions to help businesses grow and
                succeed in the digital age. Our team of experts is dedicated to
                providing high-quality services that meet the unique needs of
                each client.
              </p>

              <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                Web Development
              </h2>
              <p class="text-gray-600 mb-6">
                Our web development services include custom website design,
                e-commerce solutions, and web application development. We use
                the latest technologies to create fast, secure, and
                user-friendly websites.
              </p>

              <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                Mobile App Development
              </h2>
              <p class="text-gray-600 mb-6">
                We develop native and cross-platform mobile applications for iOS
                and Android. Our apps are designed to be intuitive, responsive,
                and feature-rich.
              </p>

              <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                Digital Marketing
              </h2>
              <p class="text-gray-600 mb-6">
                Our digital marketing services help businesses increase their
                online presence and reach more customers. We offer SEO, SEM,
                social media marketing, and content marketing services.
              </p>

              <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                IT Consulting
              </h2>
              <p class="text-gray-600 mb-6">
                We provide IT consulting services to help businesses optimize
                their technology infrastructure and processes. Our team of
                experts can help you make informed decisions about your IT
                investments.
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
  </WithBanner>
</template>

<script setup>
import WithBanner from "@/components/WithBanner.vue";
</script>

<style scoped>
.solutions-container {
  min-height: calc(100vh - 300px); /* Adjust based on header/footer height */
  background-color: #f7f9fc;
}
</style>
