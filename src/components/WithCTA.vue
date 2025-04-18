<template>
  <!-- Main content -->
  <slot></slot>

  <!-- CTA Section -->
  <section
    class="cta-section py-20 px-4 text-white text-center"
    :class="customClass || 'bg-gradient-to-r from-[#051d40] to-[#0e2d5a]'"
  >
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
        {{ subtitle }}
      </p>

      <!-- Default buttons if no custom content provided -->
      <div
        v-if="!$slots.cta"
        class="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <router-link
          :to="primaryLink"
          class="inline-block py-3 px-8 bg-[#fbc646] text-[#051d40] rounded-md font-medium hover:bg-yellow-400 transition duration-300"
        >
          {{ primaryText }}
        </router-link>
        <router-link
          v-if="secondaryText"
          :to="secondaryLink"
          class="inline-block py-3 px-8 bg-transparent border-2 border-[#fbc646] text-[#fbc646] rounded-md font-medium hover:bg-[#0a2448] transition duration-300"
        >
          {{ secondaryText }}
        </router-link>
      </div>

      <!-- Slot for custom CTA content -->
      <slot name="cta"></slot>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "พร้อมสร้างเว็บไซต์มืออาชีพกับเราหรือยัง?",
  },
  subtitle: {
    type: String,
    default:
      "เว็บไซต์ที่ออกแบบอย่างมืออาชีพสามารถเปลี่ยนธุรกิจของคุณได้ ติดต่อเราวันนี้เพื่อเริ่มต้นการเดินทางดิจิทัลของคุณ",
  },
  primaryText: {
    type: String,
    default: "ดูแพ็คเกจของเรา",
  },
  primaryLink: {
    type: String,
    default: "/packages",
  },
  secondaryText: {
    type: String,
    default: "ติดต่อเราวันนี้",
  },
  secondaryLink: {
    type: String,
    default: "/contact",
  },
  customClass: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.cta-section {
  width: 100%;
}
</style>
