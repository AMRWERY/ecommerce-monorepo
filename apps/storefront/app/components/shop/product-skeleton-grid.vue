<template>
  <!-- SKELETON LOADING GRID -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="i in 6"
      :key="i"
      class="surface-card rounded-xl border overflow-hidden animate-pulse flex flex-col"
    >
      <div class="w-full aspect-[4/3] bg-neutral-200 dark:bg-neutral-800"></div>
      <div class="p-5 space-y-3">
        <div class="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
        <div class="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
        <div
          class="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3 pt-1"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>