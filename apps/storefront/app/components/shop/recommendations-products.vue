<template>
  <div>
    <div>
      <!-- Section Header with Arrows -->
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xl sm:text-2xl font-bold tracking-tight">
          You May Also Like
        </h2>
        <div class="flex items-center gap-2">
          <LazyVButton
            variant="outline"
            color="neutral"
            shape="icon"
            aria-label="Previous items"
          >
            <Icon name="heroicons:chevron-left" class="w-4 h-4" />
          </LazyVButton>
          <LazyVButton
            variant="outline"
            color="neutral"
            shape="icon"
            aria-label="Next items"
          >
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          </LazyVButton>
        </div>
      </div>

      <!-- 4-Column Responsive Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <LazyVProductCard :products="recommendations" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CatalogProduct } from "~/types/shop";

const recommendations: CatalogProduct[] = [
  {
    id: 101,
    categoryEn: "Limited Edition",
    titleEn: "Premium Titanium Pen",
    price: 450,
    image: "/img/recommended-prod-01.jpg",
  },
  {
    id: 102,
    categoryEn: "20,000mAh Ultra-Slim Design",
    titleEn: "Ultra-Fast Portable Charger",
    price: 280,
    badgeEn: "New",
    image: "/img/recommended-prod-02.jpg",
  },
  {
    id: 103,
    categoryEn: "Genuine Leather with Integrated Tracking",
    titleEn: "Smart Leather Wallet",
    price: 350,
    image: "/img/recommended-prod-03.jpg",
  },
  {
    id: 104,
    categoryEn: "Active Noise Cancellation - Midnight Black",
    titleEn: "Pro Wireless Headphones",
    price: 1200,
    image: "/img/recommended-prod-04.jpg",
  },
];
</script>