<template>
  <div class="services-container">
    <!-- Header Section -->
    <section
      class="py-20 text-white bg-cover bg-center bg-blue-900 headerbg header-height"
    >
      <div
        class="container mx-auto px-4 reveal-section h-full flex flex-col justify-center"
      >
        <h1
          class="text-4xl md:text-5xl font-bold mb-6 text-center reveal-element"
        >
          {{ $t("servicesPage.hero.title") }}
        </h1>
        <div
          class="w-1/2 h-[2px] bg-[#fbc646] mx-auto mb-8 reveal-element"
        ></div>
        <p class="text-xl max-w-3xl mx-auto text-center reveal-element">
          {{ $t("servicesPage.hero.description") }}
        </p>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl font-bold mb-12 text-center text-[#051d40] reveal-section"
        >
          {{ $t("servicesPage.services.title") }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-section">
          <!-- Starter Website -->
          <div
            class="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 reveal-element"
          >
            <h3 class="text-2xl font-bold mb-2 text-[#051d40]">
              {{ $t("servicesPage.services.starter.title") }}
            </h3>
            <div class="text-[#fbc646] text-3xl font-bold mb-4">
              {{ $t("servicesPage.services.starter.price") }}
            </div>
            <ul class="mb-6 space-y-3">
              <li
                v-for="(feature, index) in $tm(
                  'servicesPage.services.starter.features'
                )"
                :key="index"
                class="flex items-center"
              >
                <svg
                  class="w-5 h-5 text-[#fbc646] mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div class="w-full">
                  {{ feature }}
                </div>
              </li>
            </ul>
            <p class="text-gray-600 mb-6">
              {{ $t("servicesPage.services.starter.description") }}
            </p>
            <router-link
              to="/contact"
              class="block text-center bg-[#051d40] text-white py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
            >
              Get Started
            </router-link>
          </div>

          <!-- E-commerce Website -->
          <div
            class="bg-[#051d40] bg-opacity-5 p-8 rounded-lg shadow-lg border border-[#051d40] border-opacity-20 transform scale-105 relative reveal-element"
          >
            <div
              class="absolute top-0 right-0 bg-[#fbc646] text-[#051d40] px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium"
            >
              {{ $t("servicesPage.services.popular") }}
            </div>
            <h3 class="text-2xl font-bold mb-2 text-white">
              {{ $t("servicesPage.services.ecommerce.title") }}
            </h3>
            <div class="text-[#fbc646] text-3xl font-bold mb-4">
              {{ $t("servicesPage.services.ecommerce.price") }}
            </div>
            <ul class="mb-6 space-y-3 text-white">
              <li
                v-for="(feature, index) in $tm(
                  'servicesPage.services.ecommerce.features'
                )"
                :key="index"
                class="flex items-center"
              >
                <svg
                  class="w-5 h-5 text-[#fbc646] mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div class="w-full">
                  {{ feature }}
                </div>
              </li>
            </ul>
            <p class="text-white mb-6">
              {{ $t("servicesPage.services.ecommerce.description") }}
            </p>
            <router-link
              to="/contact"
              class="block text-center bg-[#fbc646] text-[#051d40] py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300"
            >
              Get Started
            </router-link>
          </div>

          <!-- Custom Website -->
          <div
            class="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 reveal-element"
          >
            <h3 class="text-2xl font-bold mb-2 text-[#051d40]">
              {{ $t("servicesPage.services.custom.title") }}
            </h3>
            <div class="text-[#fbc646] text-3xl font-bold mb-4">
              {{ $t("servicesPage.services.custom.price") }}
            </div>
            <ul class="mb-6 space-y-3">
              <li
                v-for="(feature, index) in $tm(
                  'servicesPage.services.custom.features'
                )"
                :key="index"
                class="flex items-center"
              >
                <svg
                  class="w-5 h-5 text-[#fbc646] mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div class="w-full">
                  {{ feature }}
                </div>
              </li>
            </ul>
            <p class="text-gray-600 mb-6">
              {{ $t("servicesPage.services.custom.description") }}
            </p>
            <router-link
              to="/contact"
              class="block text-center bg-[#051d40] text-white py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
            >
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Add-on Services -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 reveal-section">
        <h2
          class="text-3xl font-bold mb-12 text-center text-[#051d40] reveal-element"
        >
          {{ $t("servicesPage.addons.title") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center reveal-element"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#051d40] bg-opacity-10 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-[#051d40]">
              {{ $t("servicesPage.addons.seo.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("servicesPage.addons.seo.description") }}
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-lg shadow-md text-center reveal-element"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#051d40] bg-opacity-10 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-[#051d40]">
              {{ $t("servicesPage.addons.domain.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("servicesPage.addons.domain.description") }}
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-lg shadow-md text-center reveal-element"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#051d40] bg-opacity-10 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-[#051d40]">
              {{ $t("servicesPage.addons.maintenance.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("servicesPage.addons.maintenance.description") }}
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-lg shadow-md text-center reveal-element"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#051d40] bg-opacity-10 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-[#051d40]">
              {{ $t("servicesPage.addons.content.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("servicesPage.addons.content.description") }}
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-lg shadow-md text-center reveal-element"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#051d40] bg-opacity-10 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-[#051d40]">
              {{ $t("servicesPage.addons.multilingual.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("servicesPage.addons.multilingual.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-[#051d40] text-white">
      <div class="container mx-auto px-4 text-center reveal-section">
        <h2 class="text-3xl font-bold mb-6 reveal-element">
          {{ $t("servicesPage.cta.title") }}
        </h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto reveal-element">
          {{ $t("servicesPage.cta.description") }}
        </p>
        <router-link
          to="/contact"
          class="inline-block bg-[#fbc646] text-[#051d40] px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300 reveal-element"
        >
          {{ $t("servicesPage.cta.contact") }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

// Function to set up reveal animations
const setupRevealAnimations = () => {
  // Set up section reveals
  const revealSections = document.querySelectorAll(".reveal-section");
  const revealElements = document.querySelectorAll(".reveal-element");

  // Create observer for sections and elements
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");

          // If it's a section, reveal its child elements
          if (entry.target.classList.contains("reveal-section")) {
            const elements = entry.target.querySelectorAll(".reveal-element");

            // Apply staggered delay to each element
            elements.forEach((el, index) => {
              // Calculate delay based on index
              const delay = index * 150; // 150ms between each element

              // Apply delay directly to element
              el.style.animationDelay = `${delay}ms`;

              // Start the animation after a short delay
              setTimeout(() => {
                el.style.animationPlayState = "running";
              }, 100);
            });
          } else {
            // If it's an individual element, just play it
            entry.target.style.animationPlayState = "running";
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 } // Slightly higher threshold so animation starts when more of the section is visible
  );

  // Observe all sections and elements
  revealSections.forEach((section) => observer.observe(section));

  // Don't observe individual elements outside of sections
  // We'll let the section observer handle those

  return observer;
};

let animationObserver = null;

onMounted(() => {
  // Setup animations with a small delay to ensure DOM is ready
  setTimeout(() => {
    animationObserver = setupRevealAnimations();
  }, 300); // Increased delay for more reliable initialization
});

onUnmounted(() => {
  // Clean up observer
  if (animationObserver) {
    animationObserver.disconnect();
  }
});
</script>

<style scoped>
.headerbg {
  background-image: linear-gradient(
      rgba(5, 29, 64, 0.85),
      rgba(5, 29, 64, 0.45)
    ),
    url("@/assets/images/nat-Qerg85B7JDI-unsplash.webp");
}

.header-height {
  height: 50vh;
  min-height: 350px; /* Fallback minimum height */
}

.services-container {
  min-height: 100vh;
}

/* Animation styles */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-element {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeInUp 0.8s ease forwards;
  animation-play-state: paused;
  will-change: transform, opacity;
}

.reveal-section {
  transition: opacity 0.5s ease;
}

.reveal-section.revealed {
  transition: transform 0.8s ease;
}

/* Add cascade delays for common elements */
h1.reveal-element {
  animation-duration: 0.7s;
}

h2.reveal-element {
  animation-duration: 0.75s;
}

p.reveal-element {
  animation-duration: 0.8s;
}

/* Grid items should stagger nicely */
.grid > div:nth-child(1) {
  animation-duration: 0.7s;
}
.grid > div:nth-child(2) {
  animation-duration: 0.75s;
}
.grid > div:nth-child(3) {
  animation-duration: 0.8s;
}
.grid > div:nth-child(4) {
  animation-duration: 0.85s;
}
.grid > div:nth-child(5) {
  animation-duration: 0.9s;
}
</style>
