<template>
  <section
    class="hero-section relative text-white min-h-screen flex items-center"
  >
    <!-- Background image Photo by Sandro Katalina on Unsplash -->
    <div
      class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[url(src/assets/images/sandro-katalina-k1bO_VTiZSs-unsplash.webp)]"
      loading="lazy"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 w-full h-full bg-[#051d40] opacity-85"></div>

    <!-- Content container -->
    <div class="container mx-auto px-4 relative z-10 flex flex-col h-screen">
      <!-- Main content - centered -->
      <div class="flex-grow flex items-center justify-center">
        <div class="text-center">
          <h1
            class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            เว็บไซต์<span class="text-[#fbc646]">มืออาชีพ</span> ในราคาประหยัด
          </h1>
          <h2 class="text-2xl md:text-3xl text-white mb-6">
            ทำเสร็จไว ไม่ยุ่งยาก
          </h2>
          <p class="text-gray-300 mb-4 text-xl max-w-3xl mx-auto font-medium">
            เริ่มต้นเพียง
            <span class="text-[#fbc646] text-2xl">฿3,500</span> พร้อมใช้งานภายใน
            7 วัน
          </p>
          <p class="text-gray-300 mb-10 text-lg max-w-3xl mx-auto">
            รองรับมือถือ สวยงาม และพร้อมสำหรับ SEO
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <router-link
              to="/contact"
              class="bg-[#fbc646] text-[#051d40] px-8 py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300"
            >
              เริ่มต้นเลย
            </router-link>
            <router-link
              to="/packages"
              class="bg-transparent border border-[#fbc646] text-[#fbc646] px-8 py-3 rounded-md font-medium hover:bg-[#fbc646] hover:bg-opacity-20 transition duration-300"
            >
              ดูแพ็กเกจ
            </router-link>
          </div>
        </div>
      </div>

      <!-- Feature badges at bottom -->
      <div class="w-full pb-4">
        <div
          class="flex flex-wrap justify-center gap-2 md:gap-6 border-t border-gray-700 pt-3"
        >
          <div class="flex items-center text-sm md:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-[#fbc646] mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-300">รองรับมือถือ – ใช้งานได้ทุกหน้าจอ</span>
          </div>
          <div class="flex items-center text-sm md:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-[#fbc646] mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-300"
              >ส่งมอบไว – เว็บไซต์เสร็จภายใน 7 วัน</span
            >
          </div>
          <div class="flex items-center text-sm md:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-[#fbc646] mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-gray-300"
              >ไม่มีค่าซ่อนเร้น – ราคาโปร่งใสชัดเจน</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional functionality needed for this component
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
}
</style>
