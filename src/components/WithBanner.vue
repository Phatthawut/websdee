<template>
  <!-- Banner Section -->
  <section
    class="banner-section relative text-white flex items-center reveal-section headerbg"
    :style="{ minHeight }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 w-full h-full bg-[#051d40] opacity-85"></div>

    <!-- Banner content -->
    <div
      class="container mx-auto px-4 relative z-10 flex flex-col items-center"
    >
      <h1
        class="text-4xl font-bold text-white mb-6 leading-tight reveal-element"
      >
        {{ title }}
      </h1>
      <div class="w-1/2 h-[2px] bg-[#fbc646] mx-auto mb-8 reveal-element"></div>
      <p
        v-if="subtitle"
        class="text-white text-xl mb-6 max-w-2xl text-center reveal-element"
      >
        {{ subtitle }}
      </p>
      <!-- Banner slot for extra content within the banner -->
      <slot name="banner"></slot>
    </div>
  </section>

  <!-- Main content -->
  <slot></slot>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    default: "",
  },
  minHeight: {
    type: String,
    default: "30vh",
  },
  subtitle: {
    type: String,
    default: "",
  },
});

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
.banner-section {
  width: 100%;
  background-color: #1e3a8a; /* bg-blue-900 fallback */
}

.headerbg {
  background-image: linear-gradient(
      rgba(5, 29, 64, 0.85),
      rgba(5, 29, 64, 0.45)
    ),
    url("@/assets/images/sandro-katalina-k1bO_VTiZSs-unsplash.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
