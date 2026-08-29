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
        <Icon
          :name="
            wishlistedIds.includes(item.id)
              ? 'heroicons:heart-solid'
              : 'heroicons:heart'
          "
          class="w-4 h-4 transition-colors"
          :class="wishlistedIds.includes(item.id) ? 'text-red-500' : ''"
        />
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
          <Icon name="heroicons:shopping-cart" class="w-3.5 h-3.5" />
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