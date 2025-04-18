<template>
  <!-- Section Wrapper -->
  <template v-if="position === 'before'">
    <div
      class="content-section relative"
      :class="[
        sectionClasses,
        { 'text-white': isLight === false },
        { 'text-center': centered },
      ]"
      :style="sectionStyles"
    >
      <!-- Background image if provided -->
      <div
        v-if="backgroundImage"
        class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
        loading="lazy"
      ></div>

      <!-- Background overlay if needed -->
      <div
        v-if="overlay"
        class="absolute inset-0 w-full h-full"
        :class="overlayClass"
      ></div>

      <!-- Section Content -->
      <div
        class="container mx-auto px-4 relative z-10"
        :class="{ 'flex flex-col items-center': centered }"
      >
        <!-- Section Header -->
        <div :class="{ 'text-center': centered, 'mb-10': headerMargin }">
          <h1
            v-if="title"
            :class="[
              titleClasses || 'text-4xl font-bold mb-6 leading-tight',
              { 'text-white': isLight === false },
            ]"
          >
            {{ title }}
          </h1>
          <p
            v-if="subtitle"
            :class="[
              subtitleClasses || 'text-xl mb-6 max-w-2xl',
              { 'text-white': isLight === false },
              { 'mx-auto': centered && !subtitleClasses?.includes('mx-auto') },
            ]"
          >
            {{ subtitle }}
          </p>
          <!-- Custom header content -->
          <slot name="header"></slot>
        </div>

        <!-- Main section content -->
        <slot name="content"></slot>
      </div>
    </div>

    <!-- Page content -->
    <slot></slot>
  </template>

  <template v-else>
    <!-- Page content -->
    <slot></slot>

    <!-- Section at the end -->
    <div
      class="content-section relative"
      :class="[
        sectionClasses,
        { 'text-white': isLight === false },
        { 'text-center': centered },
      ]"
      :style="sectionStyles"
    >
      <!-- Background image if provided -->
      <div
        v-if="backgroundImage"
        class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
        loading="lazy"
      ></div>

      <!-- Background overlay if needed -->
      <div
        v-if="overlay"
        class="absolute inset-0 w-full h-full"
        :class="overlayClass"
      ></div>

      <!-- Section Content -->
      <div
        class="container mx-auto px-4 relative z-10"
        :class="{ 'flex flex-col items-center': centered }"
      >
        <!-- Section Header -->
        <div :class="{ 'text-center': centered, 'mb-10': headerMargin }">
          <h1
            v-if="title"
            :class="[
              titleClasses || 'text-4xl font-bold mb-6 leading-tight',
              { 'text-white': isLight === false },
            ]"
          >
            {{ title }}
          </h1>
          <p
            v-if="subtitle"
            :class="[
              subtitleClasses || 'text-xl mb-6 max-w-2xl',
              { 'text-white': isLight === false },
              { 'mx-auto': centered && !subtitleClasses?.includes('mx-auto') },
            ]"
          >
            {{ subtitle }}
          </p>
          <!-- Custom header content -->
          <slot name="header"></slot>
        </div>

        <!-- Main section content -->
        <slot name="content"></slot>
      </div>
    </div>
  </template>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // Content props
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },

  // Styling props
  backgroundImage: {
    type: String,
    default: "",
  },
  backgroundColor: {
    type: String,
    default: "",
  },
  minHeight: {
    type: String,
    default: "",
  },
  overlay: {
    type: Boolean,
    default: false,
  },
  overlayClass: {
    type: String,
    default: "bg-[#051d40] opacity-50",
  },
  sectionClasses: {
    type: String,
    default: "",
  },
  titleClasses: {
    type: String,
    default: "",
  },
  subtitleClasses: {
    type: String,
    default: "",
  },

  // Layout props
  centered: {
    type: Boolean,
    default: true,
  },
  headerMargin: {
    type: Boolean,
    default: true,
  },
  isLight: {
    type: Boolean,
    default: null, // Auto detect based on background
  },
  position: {
    type: String,
    default: "before", // 'before' or 'after' the main content
    validator: (value) => ["before", "after"].includes(value),
  },
});

// Calculate computed styles
const sectionStyles = computed(() => {
  const styles = {};

  if (props.minHeight) {
    styles.minHeight = props.minHeight;
  }

  if (props.backgroundColor && !props.backgroundImage) {
    styles.backgroundColor = props.backgroundColor;
  }

  return styles;
});
</script>

<style scoped>
.content-section {
  width: 100%;
}
</style>
