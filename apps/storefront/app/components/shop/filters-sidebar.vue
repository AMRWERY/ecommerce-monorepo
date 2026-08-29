<template>
  <!-- ==================== DESKTOP SIDEBAR FILTERS ==================== -->
  <aside class="hidden lg:block lg:col-span-3 space-y-8 pe-4">
    <!-- Category Checkboxes -->
    <div>
      <h3 class="text-base font-bold mb-4 tracking-tight">Categories</h3>
      <div class="space-y-3 text-sm">
        <LazyVInput type="checkbox" v-model="categories.allFurniture">
          All Furniture
        </LazyVInput>
        <LazyVInput type="checkbox" v-model="categories.seating">Seating</LazyVInput>
        <LazyVInput type="checkbox" v-model="categories.tables">Tables</LazyVInput>
        <LazyVInput type="checkbox" v-model="categories.lighting">Lighting</LazyVInput>
      </div>
    </div>

    <hr class="border-neutral-200 dark:border-[#2A2E38]" />

    <!-- Price Range Slider -->
    <div>
      <h3 class="text-base font-bold mb-4 tracking-tight">Price Range</h3>
      <div class="space-y-3">
        <LazyVInput type="range" :min="0" :max="5000" v-model="priceRange" />
        <div class="flex items-center justify-between text-xs opacity-60 font-medium">
          <span>$0</span>
          <span>$5,000+</span>
        </div>
      </div>
    </div>

    <hr class="border-neutral-200 dark:border-[#2A2E38]" />

    <!-- Availability Radios -->
    <div>
      <h3 class="text-base font-bold mb-4 tracking-tight">Availability</h3>
      <div class="space-y-3 text-sm">
        <LazyVInput type="radio" name="availability" value="all" v-model="availability">
          All
        </LazyVInput>
        <LazyVInput type="radio" name="availability" value="in_stock" v-model="availability">
          In Stock
        </LazyVInput>
        <LazyVInput type="radio" name="availability" value="pre_order" v-model="availability">
          Pre Order
        </LazyVInput>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const priceRange = defineModel<number>("priceRange", { required: true });
const availability = defineModel<"all" | "in_stock" | "pre_order">(
  "availability",
  { required: true },
);

const categories = ref({
  allFurniture: true,
  seating: false,
  tables: false,
  lighting: false,
});
</script>
