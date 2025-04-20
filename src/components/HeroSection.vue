<template>
  <section
    class="hero-section relative text-white min-h-screen flex items-center overflow-hidden"
  >
    <!-- Background image with parallax effect -->
    <div
      ref="parallaxBg"
      class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[url(src/assets/images/sandro-katalina-k1bO_VTiZSs-unsplash.webp)] transform scale-110"
      style="will-change: transform"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 w-full h-full bg-[#051d40] opacity-85"></div>

    <!-- Content container -->
    <div class="container mx-auto px-4 relative z-10 flex flex-col h-screen">
      <!-- Main content - centered -->
      <div class="flex-grow flex items-center justify-center">
        <div class="text-center">
          <h1
            class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight reveal-element"
          >
            {{ $t("hero.title") }}
          </h1>
          <h2
            class="text-2xl md:text-3xl text-white mb-6 max-w-xl mx-auto reveal-element"
          >
            {{ $t("hero.subtitle") }}
          </h2>
          <div class="flex flex-wrap gap-4 justify-center">
            <router-link
              to="/contact"
              class="bg-[#fbc646] text-[#051d40] px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300 reveal-element"
            >
              {{ $t("hero.cta.primary") }}
            </router-link>
            <router-link
              to="/services"
              class="bg-transparent border border-[#fbc646] text-[#fbc646] px-8 py-3 rounded-md font-medium hover:bg-[#fbc646] hover:bg-opacity-20 transition duration-300 reveal-element"
            >
              {{ $t("hero.cta.secondary") }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Feature badges at bottom -->
      <div class="w-full pb-4">
        <div
          class="flex flex-wrap justify-center gap-2 md:gap-6 border-t border-gray-700 pt-3 reveal-element"
        >
          <div class="flex items-center text-sm md:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-[#fbc646] mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-300">{{ $t("hero.features.mobile") }}</span>
          </div>
          <div class="flex items-center text-sm md:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-[#fbc646] mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-300">{{ $t("hero.features.quick") }}</span>
          </div>
          <div class="flex items-center text-sm md:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-[#fbc646] mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-300">{{
              $t("hero.features.transparent")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const parallaxBg = ref(null);
let scrollListener = null;

// Function to handle the parallax effect
const handleParallax = () => {
  if (!parallaxBg.value) return;

  const scrollPosition = window.pageYOffset;
  const translateY = scrollPosition * 0.5; // Adjust speed factor as needed (0.5 = half speed of scroll)

  // Apply transform to create parallax effect
  parallaxBg.value.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.1)`;
};

// Set up reveal animations
const setupRevealAnimations = () => {
  // Select all elements with the reveal-element class
  const revealElements = document.querySelectorAll(".reveal-element");

  // Create a new Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
          // Play the animation
          entry.target.style.animationPlayState = "running";
          // Unobserve after triggering
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  ); // Trigger when at least 10% of the element is visible

  // Observe all reveal elements
  revealElements.forEach((element) => {
    observer.observe(element);
  });

  return observer;
};

let animationObserver = null;

onMounted(() => {
  // Add scroll event listener for parallax
  window.addEventListener("scroll", handleParallax);
  scrollListener = handleParallax;

  // Initial call to set parallax position
  handleParallax();

  // Setup reveal animations with a small delay to ensure DOM is fully loaded
  setTimeout(() => {
    animationObserver = setupRevealAnimations();
  }, 100);
});

onUnmounted(() => {
  // Clean up event listeners
  if (scrollListener) {
    window.removeEventListener("scroll", scrollListener);
  }

  // Clean up observer
  if (animationObserver) {
    animationObserver.disconnect();
  }
});
</script>

<style scoped>
.hero-section {
  max-height: 50vh;
}

/* Add smooth transition for parallax effect */
[ref="parallaxBg"] {
  transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-element {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
  animation-play-state: paused;
  animation-delay: calc(var(--animation-order, 0) * 0.1s);
}

/* Add staggered animation delays to create a nice sequence */
h1.reveal-element {
  --animation-order: 1;
}

h2.reveal-element {
  --animation-order: 2;
}

.flex.flex-wrap.gap-4 .reveal-element:nth-child(1) {
  --animation-order: 3;
}

.flex.flex-wrap.gap-4 .reveal-element:nth-child(2) {
  --animation-order: 4;
}

.flex.flex-wrap.justify-center.gap-2 {
  --animation-order: 5;
}
</style>
