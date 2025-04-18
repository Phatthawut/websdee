<template>
  <div class="contact-container py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>

          <div class="prose max-w-none">
            <p class="text-lg text-gray-600 mb-6">
              We'd love to hear from you. Please fill out the form below and
              we'll get back to you as soon as possible.
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <div>
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
              <div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                  Office Location
                </h2>
                <p class="text-gray-600">
                  123 Business Street<br />
                  Suite 456<br />
                  City, State 12345<br />
                  United States
                </p>
              </div>

              <div>
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">
                  Contact Information
                </h2>
                <p class="text-gray-600">
                  Phone: (123) 456-7890<br />
                  Email: info@websdee.com<br />
                  Hours: Monday - Friday, 9:00 AM - 5:00 PM EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
</script>

<style scoped>
.contact-container {
  min-height: calc(100vh - 300px); /* Adjust based on header/footer height */
  background-color: #f7f9fc;
}
</style>
