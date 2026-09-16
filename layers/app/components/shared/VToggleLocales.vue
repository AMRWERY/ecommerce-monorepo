<template>
  <LazyVButton
    variant="ghost"
    color="dark"
    size="sm"
    shape="pill"
    @click="toggleLocale"
    :title="t('navbar.toggleLocaleLabel')"
    :aria-label="t('navbar.toggleLocaleLabel')"
    class="font-semibold text-xs tracking-wider uppercase px-2.5 h-10 gap-1.5"
  >
    <Icon
      name="material-symbols:language"
      class="w-5 h-5 text-gray-800 dark:text-gray-200 shrink-0"
    />
    <span class="text-xs font-semibold text-gray-800 dark:text-gray-200">
      {{ currentLocaleLabel }}
    </span>
  </LazyVButton>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const localeStore = useLocaleStore();

const currentLocaleLabel = computed(() => {
  return locale.value === "en" ? "AR" : "EN";
});

const toggleLocale = () => {
  const nextLocale = locale.value === "en" ? "ar" : "en";
  return localeStore.updateLocale(nextLocale);
};
</script>