<template>
  <section id="faq" class="faq-section py-16 px-4 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-[#051d40]">
          {{ $t("faq.title") }}
        </h2>
        <div class="w-24 h-1 bg-[#fbc646] mx-auto mb-6"></div>
        <p class="text-gray-600 max-w-2xl mx-auto">
          {{ $t("faq.subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
        <div
          v-for="(item, key) in faqItems"
          :key="key"
          class="border-b border-gray-200 pb-6"
        >
          <Disclosure v-slot="{ open }">
            <DisclosureButton
              class="flex justify-between items-center w-full text-left"
            >
              <span
                class="text-xl font-semibold mb-2"
                v-html="item.question"
              ></span>
              <ChevronRightIcon
                class="w-5 h-5 text-[#051d40] transition-transform duration-200"
                :class="{ 'rotate-90': open }"
              />
            </DisclosureButton>
            <DisclosurePanel class="mt-2">
              <p class="text-gray-600" v-html="item.answer"></p>
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
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale, messages } = useI18n();

const faqItems = computed(() => {
  const items = messages.value[locale.value]?.faq?.items;
  return items || {};
});
</script>
