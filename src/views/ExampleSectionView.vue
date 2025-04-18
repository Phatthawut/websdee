<template>
  <WithSection
    title="Our Services"
    subtitle="We provide a range of digital solutions for your business"
    backgroundImage="src/assets/images/sandro-katalina-k1bO_VTiZSs-unsplash.webp"
    minHeight="40vh"
    overlay
    position="before"
  >
    <!-- This content will appear in the page body -->
    <div class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">What We Offer</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold mb-3 text-gray-800">
              Website Development
            </h3>
            <p class="text-gray-600">
              Custom websites designed to meet your business needs. From simple
              landing pages to complex e-commerce solutions.
            </p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold mb-3 text-gray-800">
              Digital Marketing
            </h3>
            <p class="text-gray-600">
              Comprehensive digital marketing strategies to boost your online
              presence and drive targeted traffic.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- This adds a CTA section at the bottom of the page -->
    <WithSection
      position="after"
      title="Ready to Get Started?"
      subtitle="Contact us today to discuss your project requirements"
      sectionClasses="py-20 bg-gradient-to-r from-[#051d40] to-[#0e2d5a]"
      isLight="{false}"
    >
      <!-- Custom content for the CTA section -->
      <template #content>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/packages"
            class="inline-block py-3 px-8 bg-[#fbc646] text-[#051d40] rounded-md font-medium hover:bg-yellow-400 transition duration-300"
          >
            View Our Packages
          </router-link>
          <router-link
            to="/contact"
            class="inline-block py-3 px-8 bg-transparent border-2 border-[#fbc646] text-[#fbc646] rounded-md font-medium hover:bg-[#0a2448] transition duration-300"
          >
            Contact Us Today
          </router-link>
        </div>
      </template>
    </WithSection>
  </WithSection>
</template>

<script setup>
import WithSection from "@/components/WithSection.vue";
</script>
