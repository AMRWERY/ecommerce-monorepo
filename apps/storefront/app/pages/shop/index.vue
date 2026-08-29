<template>
  <div>
    <!-- ==================== MAIN CONTENT ==================== -->
    <lazy-mobile-filters />

    <!-- Grid Layout: Sidebar + Catalog Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <lazy-filters-sidebar
        v-model:price-range="priceRange"
        v-model:availability="availability"
      />

      <!-- ==================== PRODUCT CATALOG SECTION ==================== -->
      <section class="lg:col-span-9 flex flex-col">
        <lazy-catalog-toolbar v-model:selected-categories="selectedCategories" />

        <lazy-product-skeleton-grid v-if="isLoading" />

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <LazyVProductCard :products="catalogProducts" />
        </div>

        <!-- Centered "Load More Products" Button -->
        <div class="flex justify-center mt-12 mb-4">
          <LazyVButton variant="outline" size="lg" class="shadow-sm">
            Load More
          </LazyVButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CatalogProduct } from "~/types/shop";

// --- State Management ---
const activeNav = ref<"shop" | "categories">("shop");
const cartCount = ref(3);
const isCartOpen = ref(false);
const isLoading = ref(false);

const catalogProducts: CatalogProduct[] = [
  {
    id: 1,
    categoryEn: "Seating",
    categoryAr: "المقاعد",
    titleEn: "Aero Lounge Chair",
    titleAr: "كرسي استرخاء إيرو",
    price: 1299,
    image: "/img/alloy-keyboard.jpg",
  },
  {
    id: 2,
    categoryEn: "Tables",
    categoryAr: "الطاولات",
    titleEn: "Glacier Coffee Table",
    titleAr: "طاولة قهوة جلاسيير",
    price: 849,
    image: "/img/ceramic-mug-set.jpg",
  },
  {
    id: 3,
    categoryEn: "Lighting",
    categoryAr: "الإضاءة",
    titleEn: "Arc Minimalist Lamp",
    titleAr: "مصباح قوسي مينيمالي",
    price: 450,
    badgeEn: "New",
    badgeAr: "جديد",
    image: "/img/arc-minimalist-lamp.jpg",
  },
  {
    id: 4,
    categoryEn: "Seating",
    categoryAr: "المقاعد",
    titleEn: "Monolith Sofa",
    titleAr: "أريكة مونوليث",
    price: 3200,
    image: "/img/monolith-sofa.jpg",
  },
  {
    id: 5,
    categoryEn: "Seating",
    categoryAr: "المقاعد",
    titleEn: "Curve Ash Chair",
    titleAr: "كرسي كيرف من خشب الرماد",
    price: 580,
    image: "/img/curve-ash-chair.jpg",
  },
  {
    id: 6,
    categoryEn: "Tables",
    categoryAr: "الطاولات",
    titleEn: "Cylinder Side Table",
    titleAr: "طاولة جانبية أسطوانية",
    price: 620,
    image: "/img/cylinder-side-table.jpg",
  },
];

// --- Filter States ---
const selectedCategories = ref<string[]>(["all"]);
const priceRange = ref<number>(1299);
const availability = ref<"all" | "in_stock" | "pre_order">("all");
const sortBy = ref<"recommended" | "price_asc" | "price_desc" | "newest">(
  "recommended",
);
</script>