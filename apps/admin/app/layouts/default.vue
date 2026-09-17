<template>
  <div :dir="isRtl ? 'rtl' : 'ltr'" class="relative w-full">
    <div class="min-h-screen bg-[#F8F9FB] dark:bg-[#0E1015] text-neutral-900 dark:text-neutral-100 transition-colors">
      <!-- Admin Sidebar -->
      <sidebar />

      <!-- Main Content Container with dynamic margin for sidebar -->
      <div
        class="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        :class="[
          isSidebarCollapsed
            ? (isRtl ? 'lg:pr-20 lg:pl-0' : 'lg:pl-20 lg:pr-0')
            : (isRtl ? 'lg:pr-64 lg:pl-0' : 'lg:pl-64 lg:pr-0')
        ]"
      >
        <!-- Top Navbar -->
        <navbar />

        <!-- Main Page Content Layer -->
        <main class="flex-1 p-4 sm:p-6 lg:p-8 animate-fade-slide-up">
          <slot />
        </main>
      </div>

      <!-- Global Toast Container -->
      <LazyVToast />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");

// Synchronize html direction and lang attributes
useHead({
  htmlAttrs: {
    dir: computed(() => (isRtl.value ? "rtl" : "ltr")),
    lang: computed(() => locale.value),
  },
});

const { isSidebarCollapsed } = useAdminLayout();
const localeStore = useLocaleStore();

// Light mode by default with full theme toggle support
const isDark = useDark({
  storageKey: "shop-co-theme",
  initialValue: "light",
});

onMounted(async () => {
  await localeStore.loadLocale();

  // If user hasn't explicitly set a theme preference yet, default to light mode
  const savedTheme = localStorage.getItem("shop-co-theme");
  if (!savedTheme) {
    isDark.value = false;
    document.documentElement.classList.remove("dark");
  }
});
</script>