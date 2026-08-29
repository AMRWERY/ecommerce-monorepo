<template>
  <nuxt-link-locale
    v-for="item in products"
    :key="item.id"
    :to="`/shop/${item.id}`"
    class="surface-card hover-lift-card group relative flex flex-col justify-between"
  >
    <!-- Card Image Area -->
    <div
      class="relative w-full aspect-[4/3] bg-[#F6F7F9] dark:bg-[#12141A] overflow-hidden"
    >
      <img
        :src="item.image"
        :alt="item.titleEn"
        class="img-zoom"
      />

      <!-- Badge -->
      <div
        v-if="item.badgeEn"
        :class="[
          isRtl ? 'right-3' : 'left-3',
          'absolute top-3 bg-[#3373FF] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm',
        ]"
      >
        {{ isRtl ? (item.badgeAr ?? item.badgeEn) : item.badgeEn }}
      </div>

      <!-- Wishlist Heart Button -->
      <LazyVButton
        variant="plain"
        shape="none"
        @click.stop="toggleWishlist(item.id)"
        :class="[
          isRtl ? 'left-3' : 'right-3',
          'absolute top-3 w-8 h-8 rounded-full bg-white/90 dark:bg-[#1A1D25]/90 backdrop-blur-sm text-neutral-700 dark:text-neutral-200 shadow-sm hover:scale-110',
        ]"
        aria-label="Wishlist"
      >
        <svg
          class="w-4 h-4 transition-colors"
          :class="
            wishlistedIds.includes(item.id)
              ? 'text-red-500 fill-red-500'
              : 'stroke-current fill-none'
          "
          viewBox="0 0 24 24"
          stroke-width="1.8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </LazyVButton>
    </div>

    <!-- Card Content Area -->
    <div class="p-5 flex flex-col justify-between flex-1 gap-4">
      <div>
        <span
          v-if="item.categoryEn"
          class="text-xs opacity-60 font-medium block mb-1"
        >
          {{ isRtl ? (item.categoryAr ?? item.categoryEn) : item.categoryEn }}
        </span>
        <h3
          class="text-base font-bold tracking-tight title-hover-brand leading-snug"
        >
          {{ isRtl ? (item.titleAr ?? item.titleEn) : item.titleEn }}
        </h3>
      </div>

      <div class="flex items-center justify-between gap-3">
        <span class="text-base font-bold text-[#3373FF] tracking-tight">
          ${{ item.price.toLocaleString() }}
        </span>

        <LazyVButton size="sm" @click.stop="cartStore.add()">
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          {{ t("shop.addToCart") }}
        </LazyVButton>
      </div>
    </div>
  </nuxt-link-locale>
</template>

<script lang="ts" setup>
import type { CatalogProduct } from "~/types/shop";

const { t, locale } = useI18n();
const cartStore = useCartStore();

defineProps<{
  products: CatalogProduct[];
}>();

const isRtl = computed(() => locale.value === "ar");

const wishlistedIds = ref<number[]>([]);

const toggleWishlist = (id: number) => {
  if (wishlistedIds.value.includes(id)) {
    wishlistedIds.value = wishlistedIds.value.filter((itemId) => itemId !== id);
  } else {
    wishlistedIds.value.push(id);
  }
};
</script>