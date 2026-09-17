<template>
  <section class="mt-16 sm:mt-24 border-t border-gray-100 pt-16">
    <h2
      class="text-3xl sm:text-4xl lg:text-5xl font-black text-center text-black uppercase tracking-tight mb-10 sm:mb-14">
      {{ title }}
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-stretch">
      <LazyVProductCard v-for="item in displayProducts" :key="item.id" :product="item" class="h-full" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/shared/VProductCard'

const props = withDefaults(
  defineProps<{
    title?: string
    products?: Product[]
  }>(),
  {
    title: 'You might also like',
    products: undefined,
  }
)

const defaultProducts: Product[] = [
  {
    id: 101,
    title: 'Polo with Contrast Trim',
    price: 212,
    originalPrice: 242,
    discountPercent: 20,
    rating: 4.0,
    image: '/img/prod-012.png',
    route: '/products/101',
  },
  {
    id: 102,
    title: 'Gradient Graphic T-shirt',
    price: 145,
    rating: 3.5,
    image: '/img/prod-013.png',
    route: '/products/102',
  },
  {
    id: 103,
    title: 'Polo with Tipping Details',
    price: 180,
    rating: 4.5,
    image: '/img/prod-014.png',
    route: '/products/103',
  },
  {
    id: 104,
    title: 'Black Striped T-shirt',
    price: 120,
    originalPrice: 150,
    discountPercent: 30,
    rating: 5.0,
    image: '/img/prod-015.png',
    route: '/products/104',
  },
]

const displayProducts = computed(() => props.products ?? defaultProducts)
</script>