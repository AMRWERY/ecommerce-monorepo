<template>
  <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div>
      <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white">
        {{ title }}
      </h1>
      <!-- Breadcrumb / Sub-title -->
      <nav class="flex items-center gap-1.5 mt-1 text-xs sm:text-sm text-gray-500 dark:text-neutral-400 font-medium">
        <template v-if="breadcrumbs && breadcrumbs.length">
          <template v-for="(item, index) in breadcrumbs" :key="index">
            <nuxt-link-locale
              v-if="item.to"
              :to="item.to"
              class="hover:text-black dark:hover:text-white transition-colors"
            >
              {{ item.label }}
            </nuxt-link-locale>
            <span v-else class="text-gray-400 dark:text-neutral-500">{{ item.label }}</span>
            <span v-if="index < breadcrumbs.length - 1" class="text-gray-300 dark:text-neutral-700">/</span>
          </template>
        </template>
        <span v-else>{{ subtitle || title }}</span>
      </nav>
    </div>

    <!-- Right slot for page action controls (filters, export, create buttons) -->
    <div v-if="$slots.actions" class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface BreadcrumbItem {
  label: string;
  to?: string;
}

withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
  }>(),
  {
    subtitle: "",
    breadcrumbs: () => [],
  }
);
</script>
