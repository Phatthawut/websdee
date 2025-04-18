<template>
  <section
    class="cta-section py-20 px-4 bg-gradient-to-r from-[#051d40] to-[#0e2d5a] text-white text-center"
  >
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">
        พร้อมสร้างเว็บไซต์มืออาชีพกับเราหรือยัง?
      </h2>
      <p class="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
        เว็บไซต์ที่ออกแบบอย่างมืออาชีพสามารถเปลี่ยนธุรกิจของคุณได้
        ติดต่อเราวันนี้เพื่อเริ่มต้นการเดินทางดิจิทัลของคุณ
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/packages"
          class="inline-block py-3 px-8 bg-[#fbc646] text-[#051d40] rounded-md font-medium hover:bg-yellow-400 transition duration-300"
        >
          ดูแพ็คเกจของเรา
        </router-link>
        <router-link
          to="/contact"
          class="inline-block py-3 px-8 bg-transparent border-2 border-[#fbc646] text-[#fbc646] rounded-md font-medium hover:bg-[#0a2448] transition duration-300"
        >
          ติดต่อเราวันนี้
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props or logic needed for now
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
