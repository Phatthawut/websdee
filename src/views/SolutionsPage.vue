<template>
  <div class="solutions-container">
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
          {{ $t("solutionsPage.hero.title") }}
        </h1>
        <div
          class="w-1/2 h-[2px] bg-[#fbc646] mx-auto mb-8 reveal-element"
        ></div>
        <p class="text-xl max-w-3xl mx-auto text-center reveal-element">
          {{ $t("solutionsPage.hero.description") }}
        </p>
      </div>
    </section>

    <!-- Who We Help Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 reveal-section">
        <h2
          class="text-3xl font-bold mb-12 text-center text-[#051d40] reveal-element"
        >
          {{ $t("solutionsPage.whoWeHelp.title") }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <!-- Local Businesses -->
          <div
            class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center reveal-element"
          >
            <div
              class="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#051d40] bg-opacity-10 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-[#051d40]">
              {{ $t("solutionsPage.whoWeHelp.local.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("solutionsPage.whoWeHelp.local.description") }}
            </p>
          </div>

          <!-- Startups -->
          <div
            class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center reveal-element"
          >
            <div
              class="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#051d40] bg-opacity-10 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-[#051d40]">
              {{ $t("solutionsPage.whoWeHelp.startups.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("solutionsPage.whoWeHelp.startups.description") }}
            </p>
          </div>

          <!-- Freelancers & Creatives -->
          <div
            class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center reveal-element"
          >
            <div
              class="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#051d40] bg-opacity-10 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-[#051d40]">
              {{ $t("solutionsPage.whoWeHelp.freelancers.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("solutionsPage.whoWeHelp.freelancers.description") }}
            </p>
          </div>

          <!-- Retail & eCommerce -->
          <div
            class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center reveal-element"
          >
            <div
              class="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#051d40] bg-opacity-10 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-[#051d40]">
              {{ $t("solutionsPage.whoWeHelp.ecommerce.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("solutionsPage.whoWeHelp.ecommerce.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution Approach -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 reveal-section">
        <h2
          class="text-3xl font-bold mb-12 text-center text-[#051d40] reveal-element"
        >
          {{ $t("solutionsPage.approach.title") }}
        </h2>

        <div
          class="flex flex-col md:flex-row items-center justify-center gap-12"
        >
          <!-- Process Steps -->
          <div class="space-y-8 md:w-1/2">
            <!-- Step 1 -->
            <div class="flex items-start reveal-element">
              <div
                class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#051d40] text-white font-bold text-lg mr-4"
              >
                1
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2 text-[#051d40]">
                  {{ $t("solutionsPage.approach.step1.title") }}
                </h3>
                <p class="text-gray-600">
                  {{ $t("solutionsPage.approach.step1.description") }}
                </p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex items-start reveal-element">
              <div
                class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#051d40] text-white font-bold text-lg mr-4"
              >
                2
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2 text-[#051d40]">
                  {{ $t("solutionsPage.approach.step2.title") }}
                </h3>
                <p class="text-gray-600">
                  {{ $t("solutionsPage.approach.step2.description") }}
                </p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex items-start reveal-element">
              <div
                class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#051d40] text-white font-bold text-lg mr-4"
              >
                3
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2 text-[#051d40]">
                  {{ $t("solutionsPage.approach.step3.title") }}
                </h3>
                <p class="text-gray-600">
                  {{ $t("solutionsPage.approach.step3.description") }}
                </p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="flex items-start reveal-element">
              <div
                class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#051d40] text-white font-bold text-lg mr-4"
              >
                4
              </div>
              <div>
                <h3 class="text-xl font-bold mb-2 text-[#051d40]">
                  {{ $t("solutionsPage.approach.step4.title") }}
                </h3>
                <p class="text-gray-600">
                  {{ $t("solutionsPage.approach.step4.description") }}
                </p>
              </div>
            </div>
          </div>

          <!-- Image -->
          <div class="md:w-1/2 reveal-element">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Team working on solutions"
              class="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Success Stories -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 reveal-section">
        <h2
          class="text-3xl font-bold mb-12 text-center text-[#051d40] reveal-element"
        >
          {{ $t("solutionsPage.success.title") }}
        </h2>

        <div
          class="bg-[#051d40] bg-opacity-5 p-8 rounded-lg shadow-md max-w-3xl mx-auto reveal-element"
        >
          <div class="flex items-center mb-6">
            <div
              class="w-16 h-16 bg-[#fbc646] rounded-full mr-4 flex items-center justify-center text-white font-bold text-2xl"
            >
              CS
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-600">
                {{ $t("solutionsPage.success.comingSoon") }}
              </h3>
              <p class="text-gray-600">
                {{ $t("solutionsPage.success.collection") }}
              </p>
            </div>
          </div>
          <p class="text-gray-700 italic">
            {{ $t("solutionsPage.success.quote") }}
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-[#051d40] text-white">
      <div class="container mx-auto px-4 text-center reveal-section">
        <h2 class="text-3xl font-bold mb-6 reveal-element">
          {{ $t("solutionsPage.cta.title") }}
        </h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto reveal-element">
          {{ $t("solutionsPage.cta.description") }}
        </p>
        <div class="flex flex-wrap gap-4 justify-center reveal-element">
          <router-link
            to="/services"
            class="inline-block bg-transparent border border-[#fbc646] text-[#fbc646] px-8 py-3 rounded-md font-medium hover:bg-[#fbc646] hover:bg-opacity-20 transition duration-300"
          >
            {{ $t("solutionsPage.cta.services") }}
          </router-link>
          <router-link
            to="/contact"
            class="inline-block bg-[#fbc646] text-[#051d40] px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300"
          >
            {{ $t("solutionsPage.cta.contact") }}
          </router-link>
        </div>
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
    url("@/assets/images/javier-miranda-MrWOCGKFVDg-unsplash.webp");
}

.header-height {
  height: 50vh;
  min-height: 350px; /* Fallback minimum height */
}

.solutions-container {
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
</style>
