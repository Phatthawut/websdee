<template>
  <div>
    <Navbar />
    <main>
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/layouts/Navbar.vue";
import Footer from "@/layouts/Footer.vue";
</script>
