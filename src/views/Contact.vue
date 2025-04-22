<template>
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
        {{ $t("contactForm.hero") }}
      </h1>
      <div class="w-1/2 h-[2px] bg-[#fbc646] mx-auto mb-8 reveal-element"></div>
      <p class="text-xl max-w-3xl mx-auto text-center reveal-element">
        {{ $t("contactForm.heroDescription") }}
      </p>
    </div>
  </section>

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
                <!-- Add honeypot field - invisible to humans, but bots might fill it -->
                <div class="hidden" aria-hidden="true">
                  <label for="website" class="hidden">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    v-model="form.website"
                    tabindex="-1"
                    autocomplete="off"
                  />
                </div>

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
                  <p v-if="errors.name" class="mt-1 text-sm text-red-500">
                    {{ errors.name }}
                  </p>
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
                  <p v-if="errors.email" class="mt-1 text-sm text-red-500">
                    {{ errors.email }}
                  </p>
                </div>

                <div class="reveal-element">
                  <label
                    for="phone"
                    class="block text-sm font-medium text-gray-700 pb-2"
                  >
                    {{ $t("contactForm.phone") }}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="form.phone"
                    class="p-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p v-if="errors.phone" class="mt-1 text-sm text-red-500">
                    {{ errors.phone }}
                  </p>
                </div>

                <div class="reveal-element">
                  <label
                    for="company"
                    class="block text-sm font-medium text-gray-700 pb-2"
                  >
                    {{ $t("contactForm.company") }}
                  </label>
                  <input
                    type="text"
                    id="company"
                    v-model="form.company"
                    class="p-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p v-if="errors.company" class="mt-1 text-sm text-red-500">
                    {{ errors.company }}
                  </p>
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
                  <p v-if="errors.message" class="mt-1 text-sm text-red-500">
                    {{ errors.message }}
                  </p>
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

  <!-- Toast Notification -->
  <div
    v-if="toast.show"
    class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-md transition-all duration-300"
    :class="toast.isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'"
  >
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg
          v-if="!toast.isError"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          v-else
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium">{{ toast.message }}</p>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            @click="toast.show = false"
            class="inline-flex text-white hover:text-gray-100 focus:outline-none"
          >
            <span class="sr-only">Close</span>
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import emailjs from "@emailjs/browser";

const isLoaded = ref(false);
const isSubmitting = ref(false);
// Replace submitStatus with toast
const toast = ref({
  show: false,
  isError: false,
  message: "",
});

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Rate limiting: Track submissions
const lastSubmission = ref(
  localStorage.getItem("lastSubmission")
    ? parseInt(localStorage.getItem("lastSubmission"))
    : 0
);
const submissionCount = ref(
  localStorage.getItem("submissionCount")
    ? parseInt(localStorage.getItem("submissionCount"))
    : 0
);

// Computed property to check if submission is allowed (rate limiting)
const canSubmit = computed(() => {
  const now = Date.now();
  const hourInMs = 60 * 60 * 1000;

  // Reset counter if more than an hour has passed since last submission
  if (now - lastSubmission.value > hourInMs) {
    submissionCount.value = 0;
    return true;
  }

  // Limit to 5 submissions per hour
  return submissionCount.value < 5;
});

// Time until next submission allowed (in minutes)
const timeUntilNextSubmission = computed(() => {
  if (canSubmit.value) return 0;

  const now = Date.now();
  const hourInMs = 60 * 60 * 1000;
  const remainingMs = hourInMs - (now - lastSubmission.value);

  return Math.ceil(remainingMs / (60 * 1000));
});

const form = ref({
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  website: "", // Honeypot field - should remain empty
});

// Form validation
const errors = ref({});

// Updated function to show toast
const showToast = (message, isError = false) => {
  toast.value = {
    show: true,
    isError,
    message,
  };

  // Auto-hide toast after 5 seconds
  setTimeout(() => {
    toast.value.show = false;
  }, 5000);
};

// Enhanced validation with more specific checks and stronger security measures
const validateForm = () => {
  errors.value = {};

  // Check honeypot field - if filled, silently reject the form
  if (form.value.website) {
    console.log("Honeypot triggered - possible bot submission");
    return false;
  }

  // Name validation (required, min 2 chars, allow Latin and Thai characters)
  if (!form.value.name.trim()) {
    errors.value.name = "Name is required";
  } else if (form.value.name.trim().length < 2) {
    errors.value.name = "Name must be at least 2 characters";
  } else if (!/^[\u0E00-\u0E7FA-Za-z\s\-']+$/.test(form.value.name.trim())) {
    errors.value.name =
      "Name should only contain letters, Thai characters, spaces, hyphens, and apostrophes";
  }

  // Email validation (required, valid format) - using a more comprehensive regex
  if (!form.value.email.trim()) {
    errors.value.email = "Email is required";
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      form.value.email.trim()
    )
  ) {
    errors.value.email = "Please enter a valid email address";
  }

  // Phone validation (optional, but if provided must be valid)
  if (
    form.value.phone &&
    !/^[\d\+\-\s\(\)]{6,20}$/.test(form.value.phone.trim())
  ) {
    errors.value.phone = "Please enter a valid phone number";
  }

  // Message validation (required, min length, max length to prevent abuse)
  if (!form.value.message.trim()) {
    errors.value.message = "Message is required";
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = "Message must be at least 10 characters";
  } else if (form.value.message.trim().length > 1000) {
    errors.value.message = "Message must be less than 1000 characters";
  }

  // Check for rate limiting
  if (!canSubmit.value) {
    errors.value.rateLimit = `Too many submissions. Please try again in ${timeUntilNextSubmission.value} minutes.`;
  }

  return Object.keys(errors.value).length === 0;
};

// Enhanced input sanitization function
const sanitizeInput = (input) => {
  if (!input) return "";

  // First pass: Create a temporary DOM element to escape HTML
  const tempElement = document.createElement("div");
  tempElement.textContent = input;
  let sanitized = tempElement.innerHTML;

  // Second pass: Remove any potentially dangerous patterns
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove script tags
    .replace(/javascript:/gi, "blocked:") // Block javascript: protocol
    .replace(/on\w+=/gi, "blocked="); // Block onload=, onclick=, etc.

  return sanitized;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    // Show toast for validation errors
    if (form.value.website) {
      // If honeypot was triggered, show a generic message
      showToast("Something went wrong. Please try again later.", true);
    } else {
      showToast("Please fill in all required fields correctly.", true);
    }
    return;
  }

  isSubmitting.value = true;

  try {
    // Sanitize all inputs before sending
    const templateParams = {
      from_name: sanitizeInput(form.value.name),
      from_email: sanitizeInput(form.value.email),
      phone: sanitizeInput(form.value.phone) || "Not provided",
      company: sanitizeInput(form.value.company) || "Not provided",
      message: sanitizeInput(form.value.message),
      to_name: "WebsDee Team",
      reply_to: sanitizeInput(form.value.email),
      source: "WebsDee Website",
    };

    // Send email directly with EmailJS
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    // Update rate limiting counters
    lastSubmission.value = Date.now();
    submissionCount.value += 1;
    localStorage.setItem("lastSubmission", lastSubmission.value.toString());
    localStorage.setItem("submissionCount", submissionCount.value.toString());

    // Show success toast
    showToast(
      "Thank you! Your message has been sent successfully. We will get back to you soon."
    );

    // Reset form
    form.value = {
      name: "",
      email: "",
      phone: "",
      message: "",
      company: "",
      website: "", // Reset honeypot field too
    };

    // Reset errors
    errors.value = {};
  } catch (error) {
    console.error("Error sending email:", error);

    // Show error toast
    showToast(
      "Sorry, there was an error processing your request. Please try again later or contact us directly.",
      true
    );
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  // Initialize EmailJS with your public key from env variable
  emailjs.init(EMAILJS_PUBLIC_KEY);

  // Trigger animations after component is mounted
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
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
.headerbg {
  background-image: linear-gradient(
      rgba(5, 29, 64, 0.85),
      rgba(5, 29, 64, 0.45)
    ),
    url("@/assets/images/luca-bravo-JqOvq9ypB4w-unsplash.webp");
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
