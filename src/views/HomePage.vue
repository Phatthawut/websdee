<template>
  <div class="home-container font-Prompt">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Features Section -->
    <WhyChooseSection />

    <!-- Services Section -->
    <ServicesSection />

    <!-- Collaboration Image Section -->
    <section class="collaboration-section py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Team Collaboration"
          class="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>

    <!-- Pricing Section -->
    <PackagesSection />

    <!-- Testimonials Section -->
    <TestimonialsSection />

    <!-- FAQ Section -->
    <FAQSection />

    <!-- CTA Section -->
    <WithCTA
      title="เริ่มต้นธุรกิจออนไลน์กับเราวันนี้"
      subtitle="เราพร้อมช่วยให้ธุรกิจของคุณเติบโตบนโลกออนไลน์ด้วยเว็บไซต์ที่ออกแบบมาเฉพาะสำหรับคุณ"
      primaryText="รับข้อเสนอพิเศษ"
      primaryLink="/promotion"
      secondaryText="ปรึกษาฟรี"
      secondaryLink="/contact"
    >
    </WithCTA>
  </div>
</template>

<script setup>
import HeroSection from "@/components/HeroSection.vue";
import WhyChooseSection from "@/components/WhyChooseSection.vue";
import ServicesSection from "@/components/ServicesSection.vue";
import PackagesSection from "@/components/PackagesSection.vue";
import TestimonialsSection from "@/components/TestimonialsSection.vue";
import FAQSection from "@/components/FAQSection.vue";
import WithCTA from "@/components/WithCTA.vue";
</script>

<style scoped>
.home-container {
  min-height: 100vh;
}
</style>
