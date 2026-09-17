<template>
    <div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <!-- Breadcrumb Navigation -->
            <LazyVBreadcrumb :items="breadcrumbs" />

            <!-- Main Layout: Sidebar Filters + Products Catalog -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <!-- Sidebar & Mobile Filters -->
                <lazy-product-filters v-model:is-mobile-open="isMobileFilterOpen"
                    v-model:selected-category="selectedCategory" v-model:min-price="minPrice"
                    v-model:max-price="maxPrice" v-model:selected-color="selectedColor"
                    v-model:selected-size="selectedSize" v-model:dress-style="selectedDressStyle"
                    :class="[!isMobileFilterOpen ? 'hidden lg:block' : 'block', 'lg:col-span-4 xl:col-span-3']" />

                <!-- Catalog Products Section -->
                <div class="lg:col-span-8 xl:col-span-9">
                    <!-- Catalog Header: Title, Count, Sort & Mobile Filter Trigger -->
                    <lazy-product-catalog-header :title="pageTitle" :current-count="filteredProducts.length"
                        :total-count="filteredProducts.length" v-model:sort-by="sortBy"
                        @open-mobile-filter="isMobileFilterOpen = true" />

                    <!-- Product Grid (using shared LazyVProductCard) -->
                    <div v-if="filteredProducts.length > 0"
                        class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                        <LazyVProductCard v-for="item in filteredProducts" :key="item.id" :product="item"
                            class="h-full" />
                    </div>

                    <!-- Empty State -->
                    <div v-else
                        class="py-16 text-center space-y-3 bg-[#F0EEED]/30 dark:bg-neutral-800/30 rounded-2xl p-8">
                        <Icon name="lucide:search-x" class="w-10 h-10 mx-auto text-gray-400" />
                        <h3 class="font-bold text-lg">No products found</h3>
                        <p class="text-sm text-gray-500">
                            Try adjusting your category, price range, or filter options.
                        </p>
                        <LazyVButton size="sm" shape="pill" variant="outline" @click="resetFilters">
                            Reset Filters
                        </LazyVButton>
                    </div>

                    <!-- Pagination Bar -->
                    <LazyVPagination v-model="currentPage" :total-pages="10" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@types/shared/VBreadcrumb'
import type { CatalogProduct } from '@/types/products'

const route = useRoute()

// UI & Filter States
const isMobileFilterOpen = ref(false)
const currentPage = ref(1)
const sortBy = ref('Most Popular')
const minPrice = ref(50)
const maxPrice = ref(250)
const selectedCategory = ref('')
const selectedSize = ref('')
const selectedColor = ref('')
const selectedDressStyle = ref('Casual')

// Helper mapping for category query values
const CATEGORY_MAP: Record<string, { title: string; dressStyle?: string; category?: string }> = {
    casual: { title: 'Casual', dressStyle: 'Casual' },
    formal: { title: 'Formal', dressStyle: 'Formal' },
    party: { title: 'Party', dressStyle: 'Party' },
    gym: { title: 'Gym / Sportswear', dressStyle: 'Gym' },
    men: { title: "Men's Clothes" },
    women: { title: "Women's Clothes" },
    't-shirts': { title: 'T-shirts', category: 'T-shirts' },
    shorts: { title: 'Shorts', category: 'Shorts' },
    shirts: { title: 'Shirts', category: 'Shirts' },
    hoodie: { title: 'Hoodie', category: 'Hoodie' },
    jeans: { title: 'Jeans', category: 'Jeans' },
}

// Sync route query with filter state
const applyCategoryFromRoute = (categoryQuery?: string | string[]) => {
    const queryVal = (Array.isArray(categoryQuery) ? categoryQuery[0] : categoryQuery)?.toLowerCase()
    if (queryVal && CATEGORY_MAP[queryVal]) {
        const matched = CATEGORY_MAP[queryVal]
        if (matched.dressStyle) {
            selectedDressStyle.value = matched.dressStyle
        }
        if (matched.category) {
            selectedCategory.value = matched.category
        }
    } else if (queryVal) {
        // General category fallback
        selectedCategory.value = queryVal
    }
}

// Initial sync and watch on route query changes
applyCategoryFromRoute(route.query.category as string)
watch(
    () => route.query.category,
    (newCategory) => {
        applyCategoryFromRoute(newCategory as string)
    }
)

// Computed Page Title based on active filter or route
const pageTitle = computed(() => {
    const queryVal = (route.query.category as string)?.toLowerCase()
    if (queryVal && CATEGORY_MAP[queryVal]) {
        return CATEGORY_MAP[queryVal].title
    }
    if (selectedCategory.value) {
        return selectedCategory.value
    }
    if (selectedDressStyle.value) {
        return selectedDressStyle.value
    }
    return 'Casual'
})

// Breadcrumbs
const breadcrumbs = computed<BreadcrumbItem[]>(() => [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/products' },
    { label: pageTitle.value },
])

// Catalog Products Data
const products = ref<CatalogProduct[]>([
    {
        id: 1,
        title: 'Gradient Graphic T-shirt',
        price: 145,
        rating: 3.5,
        image: '/img/prod-01.png',
        route: '/products/1',
        category: 'T-shirts',
        dressStyle: 'Casual',
        color: '#06CAF5',
        size: 'Large',
    },
    {
        id: 2,
        title: 'Polo with Tipping Details',
        price: 180,
        rating: 4.5,
        image: '/img/prod-02.png',
        route: '/products/2',
        category: 'Shirts',
        dressStyle: 'Casual',
        color: '#F5DD06',
        size: 'Medium',
    },
    {
        id: 3,
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
        id: 4,
        title: 'Skinny Fit Jeans',
        price: 240,
        originalPrice: 260,
        discountPercent: 20,
        rating: 3.5,
        image: '/img/prod-04.png',
        route: '/products/4',
        category: 'Jeans',
        dressStyle: 'Casual',
        color: '#0000FF',
        size: 'Large',
    },
    {
        id: 5,
        title: 'Checkered Shirt',
        price: 180,
        rating: 4.5,
        image: '/img/prod-05.png',
        route: '/products/5',
        category: 'Shirts',
        dressStyle: 'Formal',
        color: '#F50606',
        size: 'Medium',
    },
    {
        id: 6,
        title: 'Sleeve Striped T-shirt',
        price: 130,
        originalPrice: 160,
        discountPercent: 30,
        rating: 4.5,
        image: '/img/prod-06.png',
        route: '/products/6',
        category: 'T-shirts',
        dressStyle: 'Casual',
        color: '#F57906',
        size: 'Large',
    },
    {
        id: 7,
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
        id: 8,
        title: 'Courage Graphic T-shirt',
        price: 145,
        rating: 4.0,
        image: '/img/prod-08.png',
        route: '/products/8',
        category: 'T-shirts',
        dressStyle: 'Party',
        color: '#06CAF5',
        size: 'Small',
    },
    {
        id: 9,
        title: 'Loose Fit Bermuda Shorts',
        price: 80,
        rating: 3.0,
        image: '/img/prod-09.png',
        route: '/products/9',
        category: 'Shorts',
        dressStyle: 'Gym',
        color: '#00C12B',
        size: 'Large',
    },
])

// Filter & Sort Logic
const filteredProducts = computed(() => {
    let list = [...products.value]

    // Filter by category
    if (selectedCategory.value) {
        list = list.filter(
            (p) => p.category?.toLowerCase() === selectedCategory.value.toLowerCase()
        )
    }

    // Filter by dress style
    if (selectedDressStyle.value) {
        list = list.filter(
            (p) => p.dressStyle?.toLowerCase() === selectedDressStyle.value.toLowerCase()
        )
    }

    // Filter by price range (2-way)
    list = list.filter((p) => p.price >= minPrice.value && p.price <= maxPrice.value)

    // Filter by color
    if (selectedColor.value) {
        list = list.filter((p) => p.color === selectedColor.value)
    }

    // Filter by size
    if (selectedSize.value) {
        list = list.filter((p) => p.size === selectedSize.value)
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
        case 'Most Popular':
        default:
            list.sort((a, b) => Number(a.id) - Number(b.id))
            break
    }

    return list
})

const resetFilters = () => {
    selectedCategory.value = ''
    selectedDressStyle.value = ''
    selectedColor.value = ''
    selectedSize.value = ''
    minPrice.value = 50
    maxPrice.value = 300
}
</script>