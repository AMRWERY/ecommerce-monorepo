<template>
  <div class="min-h-screen w-full relative">
    <!-- Content layer -->
    <div class="relative">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const localeStore = useLocaleStore();

onMounted(async () => {
  await localeStore.loadLocale();
});
</script>