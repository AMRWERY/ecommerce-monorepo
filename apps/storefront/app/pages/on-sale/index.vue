<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
      <!-- Breadcrumb Navigation -->
      <LazyVBreadcrumb :items="breadcrumbs" />

      <!-- Promotional Hero Banner -->
      <div
        class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 text-white p-6 sm:p-10 mb-8 shadow-lg">
        <div class="relative z-10 max-w-2xl space-y-3">
          <div
            class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <Icon name="lucide:flame" class="w-4 h-4 text-amber-300" />
            Limited Time Offers
          </div>
          <h1 class="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Flash Sale — Up to 50% Off
          </h1>
          <p class="text-sm sm:text-base text-white/90 font-medium">
            Explore discounted streetwear, premium denim, graphic tees, and summer essentials. Don't miss out on
            unbeatable deals!
          </p>
        </div>

        <!-- Decorative background icon -->
        <div class="absolute -end-10 -bottom-10 opacity-15 pointer-events-none">
          <Icon name="lucide:percent" class="w-72 h-72 text-white" />
        </div>
      </div>

      <!-- Quick Discount Filter Badges -->
      <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        <button v-for="badge in discountBadges" :key="badge.id" type="button" @click="activeDiscountFilter = badge.id"
          :class="[
            'px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 border',
            activeDiscountFilter === badge.id
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
          <lazy-product-catalog-header title="On Sale" :current-count="filteredProducts.length"
            :total-count="filteredProducts.length" v-model:sort-by="sortBy"
            @open-mobile-filter="isMobileFilterOpen = true" />

          <!-- Product Grid -->
          <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            <LazyVProductCard v-for="item in filteredProducts" :key="item.id" :product="item" class="h-full" />
          </div>

          <!-- Empty State -->
          <div v-else class="py-16 text-center space-y-3 bg-[#F0EEED]/30 dark:bg-neutral-800/30 rounded-2xl p-8">
            <Icon name="lucide:tag" class="w-10 h-10 mx-auto text-gray-400" />
            <h3 class="font-bold text-lg">No sale items match your filter</h3>
            <p class="text-sm text-gray-500">
              Try adjusting your discount range or clearing category filters to view all active deals.
            </p>
            <LazyVButton size="sm" shape="pill" variant="outline" @click="resetFilters">
              Reset Filters
            </LazyVButton>
          </div>

          <!-- Pagination Bar -->
          <div v-if="filteredProducts.length > 0" class="mt-8">
            <LazyVPagination v-model="currentPage" :total-pages="4" />
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

// UI & Filter States
const isMobileFilterOpen = ref(false)
const currentPage = ref(1)
const sortBy = ref('Biggest Discount')
const minPrice = ref(20)
const maxPrice = ref(300)
const selectedCategory = ref('')
const selectedSize = ref('')
const selectedColor = ref('')
const selectedDressStyle = ref('')
const activeDiscountFilter = ref('all')

const discountBadges = [
  { id: 'all', label: 'All Deals' },
  { id: '10-20', label: '10% – 20% Off' },
  { id: '20-30', label: '20% – 30% Off' },
  { id: '30-plus', label: '30% Off & More' },
  { id: 'under-100', label: 'Deals Under $100' },
]

// Breadcrumbs
const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'On Sale' },
])

// On Sale Products Data (items with discountPercent and originalPrice)
const products = ref<CatalogProduct[]>([
  {
    id: 101,
    title: 'Black Striped T-shirt',
    price: 120,
    originalPrice: 150,
    discountPercent: 30,
    rating: 5.0,
    image: '/img/prod-03.png',
    route: '/products/3',
    category: 'T-shirts',
    dressStyle: 'Casual',
    color: '#000000',
    size: 'Large',
  },
  {
    id: 102,
    title: 'Skinny Fit Jeans',
    price: 240,
    originalPrice: 260,
    discountPercent: 20,
    rating: 3.5,
    image: '/img/prod-02.png',
    route: '/products/2',
    category: 'Jeans',
    dressStyle: 'Casual',
    color: '#0000FF',
    size: 'Large',
  },
  {
    id: 103,
    title: 'Sleeve Striped T-shirt',
    price: 130,
    originalPrice: 160,
    discountPercent: 30,
    rating: 4.5,
    image: '/img/prod-04.png',
    route: '/products/4',
    category: 'T-shirts',
    dressStyle: 'Casual',
    color: '#F57906',
    size: 'Large',
  },
  {
    id: 104,
    title: 'Vertical Striped Shirt',
    price: 212,
    originalPrice: 232,
    discountPercent: 20,
    rating: 5.0,
    image: '/img/prod-07.png',
    route: '/products/7',
    category: 'Shirts',
    dressStyle: 'Formal',
    color: '#FFFFFF',
    size: 'X-Large',
  },
  {
    id: 105,
    title: 'Loose Fit Bermuda Shorts',
    price: 75,
    originalPrice: 110,
    discountPercent: 32,
    rating: 4.0,
    image: '/img/prod-09.png',
    route: '/products/9',
    category: 'Shorts',
    dressStyle: 'Gym',
    color: '#00C12B',
    size: 'Large',
  },
  {
    id: 106,
    title: 'Courage Graphic Print T-shirt',
    price: 115,
    originalPrice: 145,
    discountPercent: 21,
    rating: 4.5,
    image: '/img/prod-08.png',
    route: '/products/8',
    category: 'T-shirts',
    dressStyle: 'Party',
    color: '#06CAF5',
    size: 'Small',
  },
  {
    id: 107,
    title: 'Checkered Smart Casual Shirt',
    price: 135,
    originalPrice: 180,
    discountPercent: 25,
    rating: 4.5,
    image: '/img/prod-05.png',
    route: '/products/5',
    category: 'Shirts',
    dressStyle: 'Formal',
    color: '#F50606',
    size: 'Medium',
  },
  {
    id: 108,
    title: 'Faded Relaxed Denim',
    price: 160,
    originalPrice: 220,
    discountPercent: 27,
    rating: 4.2,
    image: '/img/prod-010.png',
    route: '/products/10',
    category: 'Jeans',
    dressStyle: 'Casual',
    color: '#0000FF',
    size: 'Medium',
  },
  {
    id: 109,
    title: 'Urban Crewneck Sweatshirt',
    price: 85,
    originalPrice: 140,
    discountPercent: 39,
    rating: 4.8,
    image: '/img/prod-011.png',
    route: '/products/11',
    category: 'Hoodie',
    dressStyle: 'Casual',
    color: '#000000',
    size: 'X-Large',
  },
])

// Filter & Sort Logic
const filteredProducts = computed(() => {
  let list = [...products.value]

  // Filter by discount badges
  if (activeDiscountFilter.value === '10-20') {
    list = list.filter(p => (p.discountPercent || 0) >= 10 && (p.discountPercent || 0) <= 20)
  } else if (activeDiscountFilter.value === '20-30') {
    list = list.filter(p => (p.discountPercent || 0) > 20 && (p.discountPercent || 0) <= 30)
  } else if (activeDiscountFilter.value === '30-plus') {
    list = list.filter(p => (p.discountPercent || 0) >= 30)
  } else if (activeDiscountFilter.value === 'under-100') {
    list = list.filter(p => p.price < 100)
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
    case 'Biggest Discount':
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
      break
    case 'Price: Low to High':
      list.sort((a, b) => a.price - b.price)
      break
    case 'Price: High to Low':
      list.sort((a, b) => b.price - a.price)
      break
    case 'Highest Rated':
      list.sort((a, b) => b.rating - a.rating)
      break
    case 'Most Popular':
    default:
      list.sort((a, b) => Number(a.id) - Number(b.id))
      break
  }

  return list
})

const resetFilters = () => {
  activeDiscountFilter.value = 'all'
  selectedCategory.value = ''
  selectedDressStyle.value = ''
  selectedColor.value = ''
  selectedSize.value = ''
  minPrice.value = 20
  maxPrice.value = 300
}
</script>
