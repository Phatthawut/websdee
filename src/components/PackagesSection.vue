<template>
  <section id="packages" class="py-16 bg-white font-prompt">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-[#051d40]">แพ็กเกจของเรา</h2>
        <div class="w-24 h-1 bg-[#fbc646] mx-auto mb-6"></div>
        <p class="text-gray-600 max-w-2xl mx-auto">
          เลือกแพ็กเกจที่เหมาะกับธุรกิจของคุณ
          ทุกแพ็กเกจรวมการดูแลเว็บไซต์และการสนับสนุนทางเทคนิคฟรี
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Starter Package -->
        <div
          class="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <h3 class="text-2xl font-bold mb-4 text-[#051d40]">Starter</h3>
          <div class="text-[#fbc646] text-4xl font-bold mb-2">฿3,500</div>
          <p class="text-gray-500 mb-6">
            สำหรับธุรกิจเริ่มต้น หรือแบรนด์ส่วนตัว
          </p>
          <ul class="mb-8 space-y-3">
            <li class="flex items-center">
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              หน้าเดียว
            </li>
            <li class="flex items-center">
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              รองรับมือถือ
            </li>
            <li class="flex items-center">
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              ส่งมอบภายใน 7 วัน
            </li>
          </ul>
          <router-link
            to="/contact"
            class="w-full block text-center bg-[#051d40] text-white py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
          >
            เริ่มต้นตอนนี้
          </router-link>
        </div>

        <!-- Business Package -->
        <div
          class="bg-[#051d40] bg-opacity-5 p-8 rounded-lg shadow-md border border-[#051d40] border-opacity-20 transform scale-105 relative"
        >
          <div
            class="absolute top-0 right-0 bg-[#fbc646] text-[#051d40] px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium"
          >
            แนะนำ
          </div>
          <h3 class="text-2xl font-bold mb-4 text-[#051d40]">Business</h3>
          <div class="text-[#fbc646] text-4xl font-bold mb-2">฿9,900</div>
          <p class="text-gray-500 mb-6">
            สำหรับธุรกิจที่ต้องการฟังก์ชันมากขึ้น
          </p>
          <ul class="mb-8 space-y-3">
            <li class="flex items-center">
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              สูงสุด 5 หน้า
            </li>
            <li class="flex items-center">
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              มีแผนที่ ฟอร์มติดต่อ และแกลเลอรี
            </li>
            <li class="flex items-center">
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              SEO เบื้องต้น
            </li>
          </ul>
          <router-link
            to="/contact"
            class="w-full block text-center bg-[#fbc646] text-[#051d40] py-3 rounded-md font-medium hover:bg-yellow-400 transition duration-300"
          >
            เริ่มต้นตอนนี้
          </router-link>
        </div>

        <!-- E-commerce Package -->
        <div
          class="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <h3 class="text-2xl font-bold mb-4 text-[#051d40]">eCommerce</h3>
          <div class="text-[#fbc646] text-4xl font-bold mb-2">฿15,900</div>
          <p class="text-gray-500 mb-6">สำหรับร้านค้าที่ต้องการขายของออนไลน์</p>
          <ul class="mb-8 space-y-3">
            <li class="flex items-center">
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              ระบบ WooCommerce
            </li>
            <li class="flex items-center">
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              หน้าสินค้า ตะกร้า และชำระเงิน
            </li>
            <li class="flex items-center">
              <svg
                class="w-5 h-5 text-[#fbc646] mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              เชื่อมต่อเกตเวย์จ่ายเงิน
            </li>
          </ul>
          <router-link
            to="/contact"
            class="w-full block text-center bg-[#051d40] text-white py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
          >
            เริ่มต้นตอนนี้
          </router-link>
        </div>
      </div>

      <div class="text-center mt-12">
        <p class="text-gray-600 mb-4">
          ต้องการแพ็กเกจที่กำหนดเอง?
          ติดต่อเราสำหรับโซลูชันที่ปรับแต่งตามความต้องการของคุณ
        </p>
        <router-link
          to="/contact"
          class="inline-block bg-[#051d40] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0e2d5a] transition duration-300"
        >
          ติดต่อเรา
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props or logic needed for now
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap");
</style>
