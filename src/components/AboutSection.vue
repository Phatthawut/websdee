<template>
  <section id="about" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center gap-12">
        <!-- Image -->
        <div class="md:w-1/2">
          <img
            src="@/assets/images/about-image.jpg"
            alt="เกี่ยวกับ WebsDee"
            class="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        <!-- Content -->
        <div class="md:w-1/2">
          <div class="mb-6">
            <h2 class="text-3xl font-bold mb-4">เกี่ยวกับ WebsDee</h2>
            <div class="w-20 h-1 bg-orange-500 mb-6"></div>
            <p class="text-gray-600 mb-4">
              WebsDee
              เป็นบริษัทพัฒนาเว็บไซต์และแอปพลิเคชันที่เชี่ยวชาญในการสร้างโซลูชันดิจิทัลที่ทันสมัยสำหรับธุรกิจ
              SME ไทย เรามีประสบการณ์มากกว่า 5 ปี
              ในการช่วยธุรกิจเล็กและขนาดกลางสร้างการแสดงตัวตนออนไลน์ที่แข็งแกร่ง
            </p>
            <p class="text-gray-600 mb-4">
              ทีมงานของเราประกอบด้วยนักพัฒนา นักออกแบบ
              และผู้เชี่ยวชาญด้านการตลาดดิจิทัลที่มุ่งมั่นในการสร้างประสบการณ์ออนไลน์ที่ยอดเยี่ยมสำหรับลูกค้าของคุณ
              เราเชื่อว่าเว็บไซต์ที่ออกแบบอย่างดีและใช้งานง่ายสามารถเปลี่ยนแปลงธุรกิจของคุณได้
            </p>
          </div>

          <!-- Our Values -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-4">ค่านิยมของเรา</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-orange-500 mr-2 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <div>
                  <span class="font-medium">นวัตกรรม</span> -
                  เรามุ่งมั่นที่จะนำเสนอโซลูชันที่ทันสมัยที่สุดเสมอ
                </div>
              </li>
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-orange-500 mr-2 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <div>
                  <span class="font-medium">ความเป็นเลิศ</span> -
                  เราให้ความสำคัญกับคุณภาพและความเป็นเลิศในทุกโปรเจกต์
                </div>
              </li>
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-orange-500 mr-2 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <div>
                  <span class="font-medium">การทำงานเป็นทีม</span> -
                  เราทำงานร่วมกันเพื่อส่งมอบผลลัพธ์ที่ดีที่สุดสำหรับลูกค้าของเรา
                </div>
              </li>
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-orange-500 mr-2 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <div>
                  <span class="font-medium">ความซื่อสัตย์</span> -
                  เราเชื่อในความซื่อสัตย์และความโปร่งใสในทุกปฏิสัมพันธ์
                </div>
              </li>
            </ul>
          </div>

          <!-- CTA Button -->
          <div>
            <RouterLink
              to="/contact"
              class="inline-block bg-orange-500 text-white font-medium py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300"
            >
              ติดต่อเราวันนี้
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
