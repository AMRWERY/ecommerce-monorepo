<template>
  <div
    :class="[
      isRtl ? 'font-cairo' : 'font-inter',
      'bg-[#F6F7F9] text-[#11141B] dark:bg-[#12141A] dark:text-[#F0F1F4] min-h-screen transition-colors duration-200 antialiased flex flex-col selection:bg-[#3373FF] selection:text-white',
    ]"
    :dir="isRtl ? 'rtl' : 'ltr'"
  >
    <div class="w-full relative flex flex-1 flex-col">
      <lazy-top-promo-banner />

      <navbar />
      <!-- Content layer -->
      <main
        class="flex-1 max-w-[1400px] w-full mx-auto p-6 md:p-8 flex flex-col animate-fade-slide-up"
      >
        <slot />
      </main>

      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");
</script>