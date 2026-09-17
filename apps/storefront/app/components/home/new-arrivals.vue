<template>
    <section class="w-full bg-white dark:bg-[#0E1015] py-4 sm:py-7">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Title -->
            <h2
                class="text-3xl sm:text-4xl lg:text-5xl font-black text-center text-black dark:text-white uppercase tracking-tight mb-10 sm:mb-14">
                New Arrivals
            </h2>

            <!-- Dynamic Product Cards Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
                <LazyVProductCard v-for="product in products" :key="product.id" :product="product" class="h-full" />
            </div>

            <!-- View All CTA Button -->
            <div class="mt-10 sm:mt-14 text-center">
                <LazyVButton to="/products" size="lg" shape="pill" variant="outline"
                    class="w-full sm:w-auto px-14 py-4 text-base">
                    View All
                </LazyVButton>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Product } from "@/types/shared/VProductCard"

// Dynamic Products Data List matching your screenshot
const products = ref<Product[]>([
    {
        id: 1,
        title: 'T-shirt with Tape Details',
        image: '/img/prod-01.png',
        rating: 4.5,
        price: 120,
        route: '/products/1',
    },
    {
        id: 2,
        title: 'Skinny Fit Jeans',
        image: '/img/prod-02.png',
        rating: 3.5,
        price: 240,
        originalPrice: 260,
        discountPercent: 20,
        route: '/products/2',
    },
    {
        id: 3,
        title: 'Checkered Shirt',
        image: '/img/prod-03.png',
        rating: 4.5,
        price: 180,
        route: '/products/3',
    },
    {
        id: 4,
        title: 'Sleeve Striped T-shirt',
        image: '/img/prod-04.png',
        rating: 4.5,
        price: 130,
        originalPrice: 160,
        discountPercent: 30,
        route: '/products/4',
    },
])
</script>