<template>
  <LazyVButton
    variant="ghost"
    color="dark"
    shape="icon"
    size="md"
    @click="toggleTheme"
    :title="t('navbar.toggleThemeLabel')"
    aria-label="Toggle theme"
  >
    <!-- Sun Icon (shown in Dark mode) -->
    <Icon
      name="heroicons:sun"
      class="hidden dark:block w-6 h-6 transition-transform duration-300 rotate-0 text-gray-800 dark:text-gray-200"
    />

    <!-- Moon Icon (shown in Light mode) -->
    <Icon
      name="heroicons:moon"
      class="dark:hidden w-6 h-6 transition-transform duration-300 text-gray-800 dark:text-gray-200"
    />
  </LazyVButton>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const isDark = useDark({
  storageKey: "shop-co-theme",
  initialValue: "light",
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>