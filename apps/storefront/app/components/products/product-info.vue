<template>
  <div class="space-y-5">
    <!-- Title -->
    <h1 class="text-3xl sm:text-4xl lg:text-[40px] font-black uppercase tracking-tight leading-tight">
      {{ product.title }}
    </h1>

    <!-- Ratings -->
    <div class="flex items-center gap-3">
      <div class="flex items-center text-[#FFC633]">
        <Icon v-for="s in 4" :key="s" name="lucide:star" class="w-4 h-4 fill-current" />
        <Icon name="lucide:star-half" class="w-4 h-4 fill-current" />
      </div>
      <span class="text-sm font-normal">{{ product.rating }}<span class="text-gray-400">/5</span></span>
    </div>

    <!-- Pricing -->
    <div class="flex items-center gap-3.5">
      <span class="text-2xl sm:text-3xl font-bold">${{ product.price }}</span>
      <span v-if="product.originalPrice" class="text-2xl sm:text-3xl font-bold text-gray-300 line-through">
        ${{ product.originalPrice }}
      </span>
      <span v-if="product.discountPercent"
        class="text-xs sm:text-sm font-semibold text-[#FF3333] bg-[#FF3333]/10 px-3.5 py-1 rounded-full">
        -{{ product.discountPercent }}%
      </span>
    </div>

    <!-- Description -->
    <p class="text-gray-500 text-sm sm:text-base leading-relaxed border-b border-gray-100 pb-5">
      {{ product.description }}
    </p>

    <!-- Color Selector -->
    <div v-if="product.colors?.length" class="space-y-3 border-b border-gray-100 pb-5">
      <label class="text-xs sm:text-sm text-gray-500 font-normal">Select Colors</label>
      <div class="flex items-center gap-3">
        <button v-for="color in product.colors" :key="color.hex" @click="selectedColor = color.hex"
          :style="{ backgroundColor: color.hex }"
          class="w-9 h-9 rounded-full flex items-center justify-center transition-transform transform active:scale-95 shadow-xs"
          :aria-label="color.name">
          <Icon v-if="selectedColor === color.hex" name="lucide:check" class="w-4 h-4 text-white stroke-[3]" />
        </button>
      </div>
    </div>

    <!-- Size Selector -->
    <div v-if="product.sizes?.length" class="space-y-3 border-b border-gray-100 pb-6">
      <label class="text-xs sm:text-sm text-gray-500 font-normal">Choose Size</label>
      <div class="flex flex-wrap gap-2.5 sm:gap-3">
        <button v-for="size in product.sizes" :key="size" @click="selectedSize = size" :class="[
          'px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all',
          selectedSize === size
            ? 'bg-black text-white'
            : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
        ]">
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Quantity Counter & Add to Cart -->
    <div class="flex items-center gap-3.5 sm:gap-4 pt-1">
      <!-- Counter -->
      <div class="flex items-center bg-[#F0F0F0] rounded-full px-4 py-3 gap-5">
        <button @click="decreaseQty" class="text-gray-600 hover:text-black focus:outline-none" aria-label="Decrease">
          <Icon name="lucide:minus" class="w-4 h-4 stroke-[2.5]" />
        </button>
        <span class="font-bold text-sm w-4 text-center select-none">{{ quantity }}</span>
        <button @click="increaseQty" class="text-gray-600 hover:text-black focus:outline-none" aria-label="Increase">
          <Icon name="lucide:plus" class="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      <!-- Add to Cart Button -->
      <LazyVButton size="lg" shape="pill" class="flex-1 font-medium text-sm sm:text-base py-3.5"
        @click="handleAddToCart">
        Add to Cart
      </LazyVButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProductDetail } from '@/types/products'

const props = defineProps<{
  product: ProductDetail
}>()

const emit = defineEmits<{
  (e: 'addToCart', payload: { product: ProductDetail; size: string; color: string; quantity: number }): void
}>()

const quantity = ref(1)
const selectedSize = ref(props.product.sizes?.[2] ?? props.product.sizes?.[0] ?? 'Large')
const selectedColor = ref(props.product.colors?.[0]?.hex ?? '#4F4631')

const increaseQty = (): void => {
  quantity.value++
}

const decreaseQty = (): void => {
  if (quantity.value > 1) quantity.value--
}

const handleAddToCart = (): void => {
  emit('addToCart', {
    product: props.product,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
  })
}
</script>