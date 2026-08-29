<template>
  <div class="flex items-center justify-between lg:hidden mb-6">
    <LazyVButton variant="soft" color="neutral" size="sm" @click="isOpen = true">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      Filter
    </LazyVButton>
  </div>

  <!-- ==================== MOBILE DRAWER FILTERS ==================== -->
  <div v-if="isOpen" class="fixed inset-0 z-50 lg:hidden overflow-hidden">
    <div
      @click="isOpen = false"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm"
    />
    <div
      :class="[
        'fixed inset-y-0 max-w-xs w-full flex',
        isRtl ? 'left-0' : 'right-0',
      ]"
    >
      <div
        class="bg-white dark:bg-[#1A1D25] text-[#11141B] dark:text-[#F0F1F4] w-full h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
      >
        <div class="space-y-6">
          <div
            class="flex items-center justify-between border-b pb-4 dark:border-[#2A2E38]"
          >
            <h2 class="text-lg font-bold">filter</h2>
            <LazyVButton variant="plain" shape="none" class="p-1" @click="isOpen = false">✕</LazyVButton>
          </div>

          <!-- Categories -->
          <div>
            <h3 class="font-semibold text-sm mb-3">Categories</h3>
            <div class="space-y-2 text-sm">
              <LazyVInput type="checkbox" v-model="categories.allFurniture">
                All Furniture
              </VInput>
              <LazyVInput type="checkbox" v-model="categories.seating">
                Seating
              </VInput>
              <LazyVInput type="checkbox" v-model="categories.tables">
                Tables
              </VInput>
              <LazyVInput type="checkbox" v-model="categories.lighting">
                Lighting
              </VInput>
            </div>
          </div>
        </div>

        <LazyVButton block class="mt-6" @click="isOpen = false">
          Apply Filters
        </LazyVButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const locale = ref<"en" | "ar">("en");
const isRtl = computed(() => locale.value === "ar");

const isOpen = ref(false);

const categories = ref({
  allFurniture: true,
  seating: false,
  tables: false,
  lighting: false,
});
</script>
