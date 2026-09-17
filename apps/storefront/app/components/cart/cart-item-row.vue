<template>
  <div class="flex items-center gap-4 sm:gap-5 py-4 first:pt-0 last:pb-0">
    <!-- Product Thumbnail -->
    <div
      class="w-24 h-24 sm:w-28 sm:h-28 bg-[#F0EEED] dark:bg-neutral-800/80 rounded-[14px] flex items-center justify-center p-2 shrink-0 overflow-hidden">
      <img :src="item.image" :alt="item.title"
        class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal select-none" loading="lazy" />
    </div>

    <!-- Product Details -->
    <div class="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
      <!-- Top Row: Title & Remove Button -->
      <div class="flex items-start justify-between gap-2">
        <h2 class="font-bold text-base sm:text-lg text-black dark:text-white truncate">
          {{ item.title }}
        </h2>
        <!-- Delete Item Button -->
        <button @click="$emit('remove', item.id)"
          class="text-[#FF3333] hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30"
          aria-label="Remove item">
          <Icon name="lucide:trash-2" class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <!-- Meta: Size & Color -->
      <div class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 space-y-0.5">
        <p>
          Size: <span class="text-gray-700 dark:text-neutral-200 font-medium">{{ item.size }}</span>
        </p>
        <p>
          Color: <span class="text-gray-700 dark:text-neutral-200 font-medium">{{ item.color }}</span>
        </p>
      </div>

      <!-- Bottom Row: Price & Quantity Controls -->
      <div class="flex items-center justify-between mt-2">
        <span class="font-bold text-lg sm:text-2xl text-black dark:text-white">
          ${{ item.price }}
        </span>

        <!-- Quantity Selector Pill -->
        <div class="flex items-center bg-[#F0F0F0] dark:bg-neutral-800 rounded-full px-3.5 py-1.5 gap-4">
          <button @click="$emit('decrease', item.id)"
            class="text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none"
            aria-label="Decrease quantity">
            <Icon name="lucide:minus" class="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
          <span class="font-bold text-xs sm:text-sm min-w-3 text-center select-none text-black dark:text-white">
            {{ item.quantity }}
          </span>
          <button @click="$emit('increase', item.id)"
            class="text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none"
            aria-label="Increase quantity">
            <Icon name="lucide:plus" class="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CartItem } from '~/types/cart'

defineProps<{
  item: CartItem
}>()

defineEmits<{
  (e: 'increase', id: number): void
  (e: 'decrease', id: number): void
  (e: 'remove', id: number): void
}>()
</script>