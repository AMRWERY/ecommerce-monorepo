<template>
  <div>
    <LazyVButton
      variant="ghost"
      color="dark"
      shape="icon"
      @click="toggleTheme"
      :title="t('navbar.toggleThemeLabel')"
      aria-label="Toggle theme"
    >
      <!-- Sun Icon (shown in Dark mode) -->
      <Icon
        name="heroicons:sun"
        class="hidden dark:block w-5 h-5 transition-transform duration-300 rotate-0"
      />

      <!-- Moon Icon (shown in Light mode) -->
      <Icon
        name="heroicons:moon"
        class="dark:hidden w-5 h-5 transition-transform duration-300"
      />
    </LazyVButton>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const isDark = useDark();

const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>