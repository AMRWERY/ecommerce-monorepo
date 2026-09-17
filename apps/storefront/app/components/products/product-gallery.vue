<template>
  <div class="flex flex-col-reverse sm:flex-row gap-3.5 sm:gap-4">
    <!-- Thumbnails -->
    <div class="flex sm:flex-col gap-3.5 shrink-0 justify-between sm:justify-start">
      <button v-for="(img, index) in images" :key="index" @click="activeImageIndex = index" :class="[
        'relative w-24 h-24 sm:w-[130px] sm:h-[130px] bg-[#F0EEED] rounded-[18px] sm:rounded-[20px] overflow-hidden transition-all border-2 shrink-0',
        activeImageIndex === index ? 'border-black' : 'border-transparent hover:border-gray-300'
      ]">
        <img :src="img" :alt="title ?? 'Product Thumbnail'"
          class="absolute inset-0 w-full h-full object-cover mix-blend-multiply" />
      </button>
    </div>

    <!-- Main Image -->
    <div class="relative flex-1 bg-[#F0EEED] rounded-[20px] sm:rounded-[24px] aspect-square overflow-hidden">
      <img :src="images[activeImageIndex]" :alt="title ?? 'Product Image'"
        class="absolute inset-0 w-full h-full object-fill mix-blend-multiply transition-all duration-300 hover:scale-105" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    images: string[]
    title?: string
  }>(),
  {
    images: () => [],
    title: '',
  }
)

const activeImageIndex = ref(0)
</script>