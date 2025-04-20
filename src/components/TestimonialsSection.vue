<template>
  <section class="testimonials-section py-16 px-4 bg-orange-500 text-white">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-12">
        Appreciation from<br />our loving clients
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-orange-600 bg-opacity-30 p-6 rounded-lg">
          <div class="flex items-center mb-4">
            <div class="text-yellow-300 flex">
              <span>★</span><span>★</span><span>★</span><span>★</span
              ><span>★</span>
            </div>
            <span class="ml-2">5.0</span>
          </div>
          <p class="mb-4">
            {{ $t("testimonials.owner1.description") }}
          </p>
          <div class="flex items-center">
            <div
              class="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center mr-3"
            >
              JD
            </div>
            <div>
              <div class="font-medium">
                {{ $t("testimonials.owner1.name") }}
              </div>
              <div class="text-sm text-orange-100">
                {{ $t("testimonials.owner1.position") }}
              </div>
            </div>
          </div>
        </div>

        <div class="bg-orange-600 bg-opacity-30 p-6 rounded-lg">
          <div class="flex items-center mb-4">
            <div class="text-yellow-300 flex">
              <span>★</span><span>★</span><span>★</span><span>★</span
              ><span>★</span>
            </div>
            <span class="ml-2">5.0</span>
          </div>
          <p class="mb-4">
            {{ $t("testimonials.owner2.description") }}
          </p>
          <div class="flex items-center">
            <div
              class="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center mr-3"
            >
              KW
            </div>
            <div>
              <div class="font-medium">
                {{ $t("testimonials.owner2.name") }}
              </div>
              <div class="text-sm text-orange-100">
                {{ $t("testimonials.owner2.position") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props or logic needed for now
</script>
