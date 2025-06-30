<template>
  <div class="home-container">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Features Section -->
    <div class="reveal-section">
      <WhyChooseSection />
    </div>

    <!-- Services Section -->
    <div class="reveal-section">
      <ServicesSection />
    </div>

    <!-- Collaboration Image Section -->
    <div class="reveal-section">
      <section class="collaboration-section py-16 px-4 bg-white">
        <div class="max-w-7xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Team Collaboration"
            class="w-full h-auto rounded-lg shadow-lg reveal-element"
          />
        </div>
      </section>
    </div>

    <!-- Pricing Section -->
    <div class="reveal-section">
      <PackagesSection />
    </div>

    <!-- Maintenance Plans Section - Hidden for now -->
    <!-- <div class="reveal-section">
      <MaintenancePlans />
    </div> -->

    <!-- Testimonials Section -->
    <div class="reveal-section">
      <TestimonialsSection />
    </div>

    <!-- FAQ Section -->
    <div class="reveal-section">
      <FAQSection />
    </div>

    <!-- CTA Section -->
    <div class="reveal-section">
      <WithCTA
        :title="$t('cta.title')"
        :subtitle="$t('cta.subtitle')"
        :primaryText="$t('cta.primary')"
        primaryLink="/services"
        :secondaryText="$t('cta.secondary')"
        secondaryLink="/contact"
      >
      </WithCTA>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import HeroSection from "@/components/HeroSection.vue";
import WhyChooseSection from "@/components/WhyChooseSection.vue";
import ServicesSection from "@/components/ServicesSection.vue";
import PackagesSection from "@/components/PackagesSection.vue";
import MaintenancePlans from "@/components/MaintenancePlans.vue";
import TestimonialsSection from "@/components/TestimonialsSection.vue";
import FAQSection from "@/components/FAQSection.vue";
import WithCTA from "@/components/WithCTA.vue";

// Function to set up reveal animations for entire page
const setupPageAnimations = () => {
  // Set up section reveals
  const revealSections = document.querySelectorAll(".reveal-section");

  // Create observer for entire sections
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");

          // Find and animate all children with reveal-element class
          const elements = entry.target.querySelectorAll(".reveal-element");

          // Apply staggered delays for more controlled animation
          elements.forEach((el, index) => {
            // Calculate a delay based on the element's index
            const delay = index * 150; // 150ms between each element

            // Apply the delay directly to the element
            el.style.animationDelay = `${delay}ms`;

            // Start the animation after a slight delay to ensure proper sequencing
            setTimeout(() => {
              el.style.animationPlayState = "running";
            }, 100);
          });

          // Unobserve after revealing
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 } // Trigger when 15% of section is visible for more reliable triggering
  );

  // Observe all sections
  revealSections.forEach((section) => {
    sectionObserver.observe(section);

    // Find all headings and add reveal-element class
    const headings = section.querySelectorAll("h1, h2, h3, h4");
    headings.forEach((heading) => heading.classList.add("reveal-element"));

    // Find all paragraphs and add reveal-element class
    const paragraphs = section.querySelectorAll("p");
    paragraphs.forEach((p) => p.classList.add("reveal-element"));

    // Find all buttons, links and add reveal-element class
    const buttons = section.querySelectorAll(
      "button, a.btn, .router-link, .btn"
    );
    buttons.forEach((btn) => btn.classList.add("reveal-element"));
  });

  return sectionObserver;
};

let pageAnimationObserver = null;

onMounted(() => {
  // Setup animations with a small delay to ensure DOM is ready
  setTimeout(() => {
    pageAnimationObserver = setupPageAnimations();
  }, 300); // Increased delay for more reliable initialization
});

onUnmounted(() => {
  // Clean up observer
  if (pageAnimationObserver) {
    pageAnimationObserver.disconnect();
  }
});
</script>

<style>
/* Global animation styles - available to all components */
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

.reveal-section.revealed > div,
.reveal-section.revealed > section {
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

<style scoped>
.home-container {
  min-height: 80vh;
}
</style>
