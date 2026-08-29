<template>
  <!-- Top Bar: Result Count + Active Chip + Sort Dropdown -->
  <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
    <!-- Results Count -->
    <p class="text-sm opacity-80 font-medium">
      Showing <span class="text-[#3373FF] font-semibold">1-12</span> of 48
      results
    </p>

    <!-- Active Tag & Sort Selector -->
    <div class="flex items-center gap-3">
      <!-- Active Filter Chip (All Furniture ✕) -->
      <div
        v-if="selectedCategories.includes('all')"
        class="surface-card inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium text-inherit shadow-sm"
      >
        <span>All Furniture</span>
        <LazyVButton
          variant="plain"
          shape="none"
          @click="selectedCategories = []"
          class="opacity-60 hover:opacity-100 hover:text-red-500"
        >
          ✕
        </LazyVButton>
      </div>

      <!-- Sort Dropdown -->
      <div class="relative">
        <LazyVButton variant="soft" color="neutral" size="sm" class="shadow-sm">
          <span>Sort By</span>
          <svg class="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </LazyVButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const selectedCategories = defineModel<string[]>("selectedCategories", {
  required: true,
});
</script>
