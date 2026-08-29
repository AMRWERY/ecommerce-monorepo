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
      <svg
        class="hidden dark:block w-5 h-5 transition-transform duration-300 rotate-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>

      <!-- Moon / Brightness Icon (shown in Light mode as per screenshot) -->
      <svg
        class="dark:hidden w-5 h-5 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v1.5m6.364 1.864l-1.06 1.06M21 12h-1.5m-1.864 6.364l-1.06-1.06M12 21v-1.5m-6.364-1.864l1.06-1.06M3 12h1.5m1.864-6.364l1.06 1.06M12 8a4 4 0 100 8 4 4 0 000-8z"
        />
      </svg>
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