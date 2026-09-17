<template>
  <div :dir="isRtl ? 'rtl' : 'ltr'">
    <div
      class="w-full relative flex flex-1 flex-col min-h-screen bg-white dark:bg-[#0E1015] text-neutral-900 dark:text-neutral-100 transition-colors">
      <lazy-top-banner />

      <navbar />
      <!-- Content layer -->
      <main class="flex-1 w-full flex flex-col animate-fade-slide-up"
        :class="isHomePage ? '' : 'max-w-[1400px] mx-auto p-6 md:p-8'">
        <slot />
      </main>

      <Footer />

      <!-- Global Toast Container -->
      <LazyVToast />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const route = useRoute();
const isRtl = computed(() => locale.value === "ar");

const isHomePage = computed(() => {
  const name = route.name ? String(route.name) : "";
  const path = route.path.replace(/\/$/, "");
  return name.startsWith("index") || path === "" || path === `/${locale.value}`;
});
</script>