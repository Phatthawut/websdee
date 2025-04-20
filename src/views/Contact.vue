<template>
  <WithBanner
    title="Contact Us"
    subtitle="We’d love to hear from you! Whether you have questions, need support, or want to collaborate, feel free to reach out."
    minHeight="50vh"
    backgroundImage="src/assets/images/luca-bravo-JqOvq9ypB4w-unsplash.webp"
  />
  <div class="contact-container py-16 px-4">
    <section class="reveal-section">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 reveal-element">
              {{ $t("contactForm.title") }}
            </h1>

            <div class="prose max-w-none">
              <p class="text-lg text-gray-600 mb-6 reveal-element">
                {{ $t("contactForm.description") }}
              </p>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="reveal-element">
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 pb-2"
                  >
                    {{ $t("contactForm.name") }}
                  </label>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    class="p-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div class="reveal-element">
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 pb-2"
                  >
                    {{ $t("contactForm.email") }}
                  </label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    class="p-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div class="reveal-element">
                  <label
                    for="message"
                    class="block text-sm font-medium text-gray-700 pb-2"
                  >
                    {{ $t("contactForm.message") }}
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="6"
                    class="p-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <div class="reveal-element">
                  <button
                    type="submit"
                    class="w-full bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition duration-300"
                    :disabled="isSubmitting"
                  >
                    {{ isSubmitting ? "Sending..." : "Send Message" }}
                  </button>
                </div>
              </form>

              <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="reveal-element">
                  <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                    Office Location
                  </h2>
                  <p class="text-gray-600">
                    207/101 หมู่ที่ 2<br />
                    ตำบลต้นเปา อำเภอสันกำแพง<br />
                    จังหวัดเชียงใหม่ 50130
                  </p>
                </div>

                <div class="reveal-element">
                  <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                    Contact Information
                  </h2>
                  <p class="text-gray-600">
                    Phone: 083-475-5212<br />
                    Email: info@websdee.com<br />
                    Hours: จันทร์ - ศุกร์, 09:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import WithBanner from "@/components/WithBanner.vue";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", form.value);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Message sent successfully!");
    form.value = { name: "", email: "", message: "" };
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to send message. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

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
