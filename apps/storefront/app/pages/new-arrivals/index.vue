<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
      <!-- Breadcrumb Navigation -->
      <LazyVBreadcrumb :items="breadcrumbs" />

      <!-- Season Release Hero Banner -->
      <div
        class="relative overflow-hidden rounded-3xl bg-[#0E1015] text-white p-6 sm:p-10 mb-8 border border-neutral-800 shadow-xl">
        <div class="relative z-10 max-w-2xl space-y-3">
          <div
            class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-emerald-400">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Just Dropped — 2026 Season
          </div>
          <h1 class="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            New Arrivals
          </h1>
          <p class="text-sm sm:text-base text-gray-300 font-medium">
            Be the first to wear our freshest drops. Contemporary cuts, elevated textures, and iconic street staples
            designed to turn heads.
          </p>
        </div>

        <!-- Decorative background shapes -->
        <div class="absolute -end-8 -top-8 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute end-8 bottom-4 opacity-10 pointer-events-none">
          <Icon name="lucide:sparkles" class="w-48 h-48 text-white" />
        </div>
      </div>

      <!-- Quick Filter Tags -->
      <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        <button v-for="badge in releaseBadges" :key="badge.id" type="button" @click="activeTagFilter = badge.id" :class="[
          'px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 border',
          activeTagFilter === badge.id
            ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm'
            : 'bg-[#F0F0F0] dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 border-transparent hover:bg-gray-200 dark:hover:bg-neutral-700'
        ]">
          {{ badge.label }}
        </button>
      </div>

      <!-- Main Layout: Sidebar Filters + Products Catalog -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Sidebar & Mobile Filters -->
        <lazy-product-filters v-model:is-mobile-open="isMobileFilterOpen" v-model:selected-category="selectedCategory"
          v-model:min-price="minPrice" v-model:max-price="maxPrice" v-model:selected-color="selectedColor"
          v-model:selected-size="selectedSize" v-model:dress-style="selectedDressStyle"
          :class="[!isMobileFilterOpen ? 'hidden lg:block' : 'block', 'lg:col-span-4 xl:col-span-3']" />

        <!-- Catalog Products Section -->
        <div class="lg:col-span-8 xl:col-span-9">
          <!-- Catalog Header: Title, Count, Sort & Mobile Filter Trigger -->
          <lazy-product-catalog-header title="New Arrivals" :current-count="filteredProducts.length"
            :total-count="filteredProducts.length" v-model:sort-by="sortBy"
            @open-mobile-filter="isMobileFilterOpen = true" />

          <!-- Product Grid -->
          <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            <LazyVProductCardSkeleton v-for="n in filteredProducts.length" :key="n" />
          </div>
          <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            <LazyVProductCard v-for="item in filteredProducts" :key="item.id" :product="item" class="h-full" />
          </div>

          <!-- Empty State -->
          <LazyVEmptyState v-else icon="lucide:sparkles" title="No new arrival matches your filter"
            description="Try adjusting your category, price range, or clearing current selections."
            action-text="Reset Filters" action-variant="outline" action-color="dark" @action="resetFilters" />

          <!-- Pagination Bar -->
          <div v-if="!isLoading && filteredProducts.length > 0" class="mt-8">
            <LazyVPagination v-model="currentPage" :total-pages="5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@types/shared/VBreadcrumb'
import type { CatalogProduct } from '@/types/products'

const localePath = useLocalePath()
const isLoading = useSimulatedLoading()

// UI & Filter States
const isMobileFilterOpen = ref(false)
const currentPage = ref(1)
const sortBy = ref('Newest First')
const minPrice = ref(50)
const maxPrice = ref(300)
const selectedCategory = ref('')
const selectedSize = ref('')
const selectedColor = ref('')
const selectedDressStyle = ref('')
const activeTagFilter = ref('all')

const releaseBadges = [
  { id: 'all', label: 'All New Drops' },
  { id: 'this-week', label: 'Dropped This Week' },
  { id: 'trending', label: 'Trending Fits' },
  { id: 'exclusive', label: 'Exclusive Editions' },
  { id: 'summer', label: 'Summer Drops' },
]

// Breadcrumbs
const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'New Arrivals' },
])

// New Arrivals Products Data
const products = ref<CatalogProduct[]>([
  {
    id: 201,
    title: 'T-shirt with Tape Details',
    price: 120,
    rating: 4.5,
    image: '/img/prod-01.png',
    route: '/products/1',
    category: 'T-shirts',
    dressStyle: 'Casual',
    color: '#000000',
    size: 'Large',
  },
  {
    id: 202,
    title: 'Skinny Fit Indigo Jeans',
    price: 240,
    originalPrice: 260,
    discountPercent: 20,
    rating: 4.8,
    image: '/img/prod-02.png',
    route: '/products/2',
    category: 'Jeans',
    dressStyle: 'Casual',
    color: '#0000FF',
    size: 'Large',
  },
  {
    id: 203,
    title: 'Checkered Flannel Shirt',
    price: 180,
    rating: 4.6,
    image: '/img/prod-03.png',
    route: '/products/3',
    category: 'Shirts',
    dressStyle: 'Casual',
    color: '#F50606',
    size: 'Medium',
  },
  {
    id: 204,
    title: 'Sleeve Striped Oversized Tee',
    price: 130,
    originalPrice: 160,
    discountPercent: 30,
    rating: 4.7,
    image: '/img/prod-04.png',
    route: '/products/4',
    category: 'T-shirts',
    dressStyle: 'Casual',
    color: '#F57906',
    size: 'Large',
  },
  {
    id: 205,
    title: 'Polo with Contrast Tipping',
    price: 155,
    rating: 4.5,
    image: '/img/prod-05.png',
    route: '/products/5',
    category: 'Shirts',
    dressStyle: 'Formal',
    color: '#F5DD06',
    size: 'Medium',
  },
  {
    id: 206,
    title: 'Courage Graphic Capsule Tee',
    price: 145,
    rating: 4.2,
    image: '/img/prod-08.png',
    route: '/products/8',
    category: 'T-shirts',
    dressStyle: 'Party',
    color: '#06CAF5',
    size: 'Small',
  },
  {
    id: 207,
    title: 'Minimalist Relaxed Fit Shorts',
    price: 95,
    rating: 4.1,
    image: '/img/prod-09.png',
    route: '/products/9',
    category: 'Shorts',
    dressStyle: 'Gym',
    color: '#00C12B',
    size: 'Large',
  },
  {
    id: 208,
    title: 'Distressed Vintage Wash Jeans',
    price: 210,
    rating: 4.9,
    image: '/img/prod-012.png',
    route: '/products/12',
    category: 'Jeans',
    dressStyle: 'Casual',
    color: '#0000FF',
    size: 'Large',
  },
  {
    id: 209,
    title: 'Heavyweight Drop-Shoulder Hoodie',
    price: 175,
    rating: 5.0,
    image: '/img/prod-013.png',
    route: '/products/13',
    category: 'Hoodie',
    dressStyle: 'Casual',
    color: '#000000',
    size: 'X-Large',
  },
])

// Filter & Sort Logic
const filteredProducts = computed(() => {
  let list = [...products.value]

  // Filter by release tags
  if (activeTagFilter.value === 'trending') {
    list = list.filter(p => p.rating >= 4.6)
  } else if (activeTagFilter.value === 'exclusive') {
    list = list.filter(p => p.price >= 150)
  } else if (activeTagFilter.value === 'summer') {
    list = list.filter(p => p.category === 'T-shirts' || p.category === 'Shorts')
  }

  // Filter by category
  if (selectedCategory.value) {
    list = list.filter(
      p => p.category?.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }

  // Filter by dress style
  if (selectedDressStyle.value) {
    list = list.filter(
      p => p.dressStyle?.toLowerCase() === selectedDressStyle.value.toLowerCase()
    )
  }

  // Filter by price range
  list = list.filter(p => p.price >= minPrice.value && p.price <= maxPrice.value)

  // Filter by color
  if (selectedColor.value) {
    list = list.filter(p => p.color === selectedColor.value)
  }

  // Filter by size
  if (selectedSize.value) {
    list = list.filter(p => p.size === selectedSize.value)
  }

  // Sorting
  switch (sortBy.value) {
    case 'Price: Low to High':
      list.sort((a, b) => a.price - b.price)
      break
    case 'Price: High to Low':
      list.sort((a, b) => b.price - a.price)
      break
    case 'Highest Rated':
      list.sort((a, b) => b.rating - a.rating)
      break
    case 'Newest First':
    case 'Most Popular':
    default:
      list.sort((a, b) => Number(b.id) - Number(a.id))
      break
  }

  return list
})

const resetFilters = () => {
  activeTagFilter.value = 'all'
  selectedCategory.value = ''
  selectedDressStyle.value = ''
  selectedColor.value = ''
  selectedSize.value = ''
  minPrice.value = 50
  maxPrice.value = 300
}

useSeoPage({
  title: 'New Arrivals',
  description: 'Explore latest trendy releases and seasonal collections at SHOP.CO.',
})
</script>