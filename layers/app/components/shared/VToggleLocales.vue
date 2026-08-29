<template>
  <div>
    <LazyVButton
      variant="plain"
      shape="none"
      @click="toggleLocale"
      :title="t('navbar.toggleLocaleLabel')"
      class="text-[#11141B]/80 hover:text-[#11141B] dark:text-[#F0F1F4]/80 dark:hover:text-[#F0F1F4] text-[13px] tracking-wider px-1 py-1 rounded-md"
    >
      EN/AR
    </LazyVButton>
  </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const localeStore = useLocaleStore();

const toggleLocale = () => {
  const nextLocale = locale.value === "en" ? "ar" : "en";
  return localeStore.updateLocale(nextLocale);
};
</script>