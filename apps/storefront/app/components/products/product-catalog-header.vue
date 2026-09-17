<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
    <!-- Title & Count -->
    <div class="flex items-baseline gap-3">
      <h1 class="text-3xl sm:text-4xl font-black text-black dark:text-white capitalize">
        {{ title }}
      </h1>
      <span class="text-xs sm:text-sm text-gray-400 font-normal">
        Showing {{ totalCount > 0 ? 1 : 0 }}-{{ currentCount }} of {{ totalCount }} Products
      </span>
    </div>

    <!-- Controls: Mobile Filter Button & Sort Dropdown -->
    <div class="flex items-center justify-between sm:justify-end gap-3">
      <!-- Mobile Filter Trigger -->
      <LazyVButton
        variant="soft"
        color="neutral"
        size="sm"
        shape="pill"
        class="lg:hidden flex items-center gap-2 text-xs font-semibold py-2 px-3.5"
        @click="$emit('openMobileFilter')"
      >
        <Icon name="lucide:sliders-horizontal" class="w-4 h-4" />
        <span>Filters</span>
      </LazyVButton>

      <!-- Sort Dropdown -->
      <div class="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        <span>Sort by:</span>
        <div class="relative">
          <select
            :value="sortBy"
            @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
            class="bg-transparent font-bold text-black dark:text-white cursor-pointer pe-4 py-1 appearance-none focus:outline-none"
          >
            <option value="Most Popular" class="dark:bg-[#1A1D25]">Most Popular</option>
            <option value="Price: Low to High" class="dark:bg-[#1A1D25]">Price: Low to High</option>
            <option value="Price: High to Low" class="dark:bg-[#1A1D25]">Price: High to Low</option>
            <option value="Highest Rated" class="dark:bg-[#1A1D25]">Highest Rated</option>
          </select>
          <Icon name="lucide:chevron-down" class="w-3.5 h-3.5 text-gray-400 absolute end-0 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    title?: string
    currentCount?: number
    totalCount?: number
    sortBy?: string
  }>(),
  {
    title: 'Casual',
    currentCount: 9,
    totalCount: 100,
    sortBy: 'Most Popular',
  }
)

defineEmits<{
  (e: 'openMobileFilter'): void
  (e: 'update:sortBy', value: string): void
}>()
</script>
