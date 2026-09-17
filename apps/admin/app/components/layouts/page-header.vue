<template>
  <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {{ title }}
      </h1>
      <!-- Breadcrumb / Sub-title -->
      <nav class="flex items-center gap-1.5 mt-1 text-xs sm:text-sm text-neutral-400 dark:text-neutral-400 font-medium">
        <template v-if="breadcrumbs && breadcrumbs.length">
          <template v-for="(item, index) in breadcrumbs" :key="index">
            <nuxt-link-locale
              v-if="item.to"
              :to="item.to"
              class="hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
            >
              {{ item.label }}
            </nuxt-link-locale>
            <span v-else class="text-neutral-400">{{ item.label }}</span>
            <span v-if="index < breadcrumbs.length - 1" class="text-neutral-300 dark:text-neutral-600">/</span>
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
