<template>
  <section class="faq-section py-16 px-4 bg-white">
    <div class="max-w-7xl mx-auto">
      <h2
        class="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
      >
        Ask us if you have<br />doubts or questions
      </h2>

      <div class="grid grid-cols-1 gap-8">
        <div class="border-b border-gray-200 pb-4 mb-4 mx-auto w-[80%]">
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex justify-between items-center w-full">
              <span class="text-xl font-semibold mb-2">
                What is included in the Basic plan?
              </span>
              <ChevronRightIcon
                class="w-5 h-5"
                :class="{ 'rotate-90': open }"
              />
            </DisclosureButton>
            <DisclosurePanel>
              <p class="text-gray-600">
                Our Basic plan includes a one-page responsive website, contact
                form integration, and mobile-friendly design, perfect for
                individuals or small businesses just starting out.
              </p>
            </DisclosurePanel>
          </Disclosure>
        </div>
        <div class="border-b border-gray-200 pb-4 mb-4 mx-auto w-[80%]">
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex justify-between items-center w-full">
              <h3 class="text-xl font-semibold mb-2">
                Do I need to find my own hosting?
              </h3>
              <ChevronRightIcon
                class="w-5 h-5"
                :class="{ 'rotate-90': open }"
              />
            </DisclosureButton>
            <DisclosurePanel>
              <p class="text-gray-600">
                No, all our plans include reliable hosting for your website. We
                handle all the technical aspects so you can focus on your
                business.
              </p>
            </DisclosurePanel>
          </Disclosure>
        </div>

        <div class="border-b border-gray-200 pb-4 mb-4 mx-auto w-[80%]">
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex justify-between items-center w-full">
              <h3 class="text-xl font-semibold mb-2">How does pricing work?</h3>
              <ChevronRightIcon
                class="w-5 h-5"
                :class="{ 'rotate-90': open }"
              />
            </DisclosureButton>
            <DisclosurePanel>
              <p class="text-gray-600">
                We offer transparent pricing with no hidden fees. You can choose
                from our three plans or contact us for a custom solution
                tailored to your specific needs.
              </p>
            </DisclosurePanel>
          </Disclosure>
        </div>
        <div class="border-b border-gray-200 pb-4 mb-4 mx-auto w-[80%]">
          <Disclosure v-slot="{ open }">
            <DisclosureButton class="flex justify-between items-center w-full">
              <h3 class="text-xl font-semibold mb-2">
                Can I get help with domain registration?
              </h3>
              <ChevronRightIcon
                class="w-5 h-5"
                :class="{ 'rotate-90': open }"
              />
            </DisclosureButton>
            <DisclosurePanel>
              <p class="text-gray-600">
                Yes, we can help you find and register the perfect domain name
                for your business. This service is included in our Pro and
                Business plans.
              </p>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
</script>
