<template>
  <WithBanner title="About Us" />
  <div class="py-16 px-4 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
        <p class="text-gray-600 mb-6">
          Founded in 2010, ByteWave has been providing innovative IT solutions
          to businesses across various industries. Our journey began with a
          simple mission: to help businesses leverage technology to achieve
          their goals.
        </p>
        <p class="text-gray-600 mb-6">
          Over the years, we have grown from a small team of passionate tech
          enthusiasts to a full-service IT solutions provider with expertise in
          cloud computing, cybersecurity, software development, and more.
        </p>

        <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Team</h2>
        <p class="text-gray-600 mb-6">
          Our team consists of experienced professionals who are dedicated to
          delivering exceptional results. From our developers and engineers to
          our project managers and support staff, everyone at ByteWave is
          committed to helping our clients succeed.
        </p>

        <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Our Values
        </h2>
        <ul class="list-disc pl-6 text-gray-600">
          <li class="mb-2">Excellence in everything we do</li>
          <li class="mb-2">Customer-centric approach</li>
          <li class="mb-2">Innovation and continuous improvement</li>
          <li class="mb-2">Integrity and transparency</li>
          <li class="mb-2">Teamwork and collaboration</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import WithBanner from "../components/WithBanner.vue";
</script>
