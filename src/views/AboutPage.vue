<template>
  <div class="about-container">
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
          {{ $t("aboutPage.hero.title") }}
        </h1>
        <div
          class="w-1/2 h-[2px] bg-[#fbc646] mx-auto mb-8 reveal-element"
        ></div>
        <p class="text-xl max-w-3xl mx-auto text-center reveal-element">
          {{ $t("aboutPage.hero.description") }}
        </p>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col md:flex-row items-center gap-12 reveal-section"
        >
          <!-- Image -->
          <div class="md:w-1/2 reveal-element">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Our team"
              class="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          <!-- Content -->
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold mb-6 text-[#051d40] reveal-element">
              {{ $t("aboutPage.mission.title") }}
            </h2>
            <p class="text-lg text-gray-700 mb-6 reveal-element">
              {{ $t("aboutPage.mission.description") }}
            </p>
            <p class="text-lg text-gray-700 mb-6 reveal-element">
              {{ $t("aboutPage.mission.belief") }}
            </p>
            <p class="text-lg text-gray-700 reveal-element">
              {{ $t("aboutPage.mission.team") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Values Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 reveal-section">
        <h2
          class="text-3xl font-bold mb-12 text-center text-[#051d40] reveal-element"
        >
          {{ $t("aboutPage.values.title") }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Integrity -->
          <div
            class="bg-white p-8 rounded-lg shadow-md text-center reveal-element"
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-[#051d40]">
              {{ $t("aboutPage.values.integrity.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("aboutPage.values.integrity.description") }}
            </p>
          </div>

          <!-- Speed -->
          <div
            class="bg-white p-8 rounded-lg shadow-md text-center reveal-element"
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
              {{ $t("aboutPage.values.speed.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("aboutPage.values.speed.description") }}
            </p>
          </div>

          <!-- Simplicity -->
          <div
            class="bg-white p-8 rounded-lg shadow-md text-center reveal-element"
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
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-[#051d40]">
              {{ $t("aboutPage.values.simplicity.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("aboutPage.values.simplicity.description") }}
            </p>
          </div>

          <!-- Mobile First -->
          <div
            class="bg-white p-8 rounded-lg shadow-md text-center reveal-element"
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
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-[#051d40]">
              {{ $t("aboutPage.values.mobilefirst.title") }}
            </h3>
            <p class="text-gray-600">
              {{ $t("aboutPage.values.mobilefirst.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 reveal-section">
        <h2
          class="text-3xl font-bold mb-12 text-center text-[#051d40] reveal-element"
        >
          {{ $t("aboutPage.team.title") }}
        </h2>

        <div
          class="bg-[#051d40] bg-opacity-5 p-8 rounded-lg shadow-md max-w-3xl mx-auto text-center reveal-element"
        >
          <div
            class="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-[#fbc646] rounded-full text-[#051d40] font-bold text-xl"
          >
            WD
          </div>
          <h3 class="text-xl font-bold text-white mb-2">
            {{ $t("aboutPage.team.name") }}
          </h3>
          <p class="text-white mb-6">
            {{ $t("aboutPage.team.description1") }}
          </p>
          <p class="text-white">
            {{ $t("aboutPage.team.description2") }}
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-[#051d40] text-white">
      <div class="container mx-auto px-4 text-center reveal-section">
        <h2 class="text-3xl font-bold mb-6 reveal-element">
          {{ $t("aboutPage.cta.title") }}
        </h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto reveal-element">
          {{ $t("aboutPage.cta.description") }}
        </p>
        <div class="flex flex-wrap gap-4 justify-center reveal-element">
          <router-link
            to="/services"
            class="inline-block bg-transparent border border-[#fbc646] text-[#fbc646] px-8 py-3 rounded-md font-medium hover:bg-[#fbc646] hover:bg-opacity-20 transition duration-300"
          >
            {{ $t("aboutPage.cta.services") }}
          </router-link>
          <router-link
            to="/contact"
            class="inline-block bg-[#fbc646] text-[#051d40] px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300"
          >
            {{ $t("aboutPage.cta.contact") }}
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
    url("@/assets/images/fabio-oyXis2kALVg-unsplash.webp");
}

.header-height {
  height: 50vh;
  min-height: 350px; /* Fallback minimum height */
}

.about-container {
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
