<template>
  <WithCTA
    title="เริ่มต้นธุรกิจออนไลน์กับเราวันนี้"
    subtitle="เราพร้อมช่วยให้ธุรกิจของคุณเติบโตบนโลกออนไลน์ด้วยเว็บไซต์ที่ออกแบบมาเฉพาะสำหรับคุณ"
    primaryText="รับข้อเสนอพิเศษ"
    primaryLink="/promotion"
    secondaryText="ปรึกษาฟรี"
    secondaryLink="/contact"
  >
    <div class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">บริการของเรา</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold mb-3 text-gray-800">
              เว็บไซต์สำหรับธุรกิจ
            </h3>
            <p class="text-gray-600">
              สร้างเว็บไซต์ที่มืออาชีพเพื่อส่งเสริมธุรกิจของคุณ
            </p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold mb-3 text-gray-800">
              ร้านค้าออนไลน์
            </h3>
            <p class="text-gray-600">
              เริ่มขายสินค้าออนไลน์ด้วยร้านค้าที่ใช้งานง่าย
            </p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold mb-3 text-gray-800">
              การตลาดออนไลน์
            </h3>
            <p class="text-gray-600">
              เพิ่มยอดขายด้วยกลยุทธ์การตลาดดิจิทัลที่มีประสิทธิภาพ
            </p>
          </div>
        </div>
      </div>
    </div>
  </WithCTA>
</template>

<script setup>
import WithCTA from "@/components/WithCTA.vue";
</script>
