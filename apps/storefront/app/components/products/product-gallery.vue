<template>
  <div class="flex flex-col-reverse sm:flex-row gap-3.5 sm:gap-4">
    <!-- Thumbnails -->
    <div class="flex sm:flex-col gap-3.5 shrink-0 justify-between sm:justify-start">
      <button v-for="(img, index) in images" :key="index" @click="activeImageIndex = index" :class="[
        'relative w-24 h-24 sm:w-[130px] sm:h-[130px] bg-[#F0EEED] rounded-[18px] sm:rounded-[20px] overflow-hidden transition-all border-2 shrink-0',
        activeImageIndex === index ? 'border-black' : 'border-transparent hover:border-gray-300'
      ]">
        <img :src="img" :alt="title ?? 'Product Thumbnail'"
          class="absolute inset-0 w-full h-full object-cover mix-blend-multiply" />
      </button>
    </div>

    <!-- Main Image -->
    <div class="relative flex-1 bg-[#F0EEED] rounded-[20px] sm:rounded-[24px] aspect-square overflow-hidden">
      <!-- Wishlist Heart Button -->
      <button
        type="button"
        @click="toggleWishlist"
        :aria-label="isSaved ? 'Remove from wishlist' : 'Add to wishlist'"
        class="absolute top-3.5 end-3.5 sm:top-4 sm:end-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-[#1A1D25]/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all duration-200 border border-black/5 dark:border-white/10"
      >
        <Icon
          :name="isSaved ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
          :class="[
            'w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200',
            isSaved ? 'text-rose-500 scale-110' : 'text-gray-500 dark:text-neutral-400 hover:text-rose-500'
          ]"
        />
      </button>

      <img :src="images[activeImageIndex]" :alt="title ?? 'Product Image'"
        class="absolute inset-0 w-full h-full object-fill mix-blend-multiply transition-all duration-300 hover:scale-105" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    images: string[]
    title?: string
    productId?: string | number
  }>(),
  {
    images: () => [],
    title: '',
    productId: undefined,
  }
)

const activeImageIndex = ref(0)
const route = useRoute()
const wishlistStore = useWishlistStore()

const currentId = computed(() => props.productId || route.params.slug || 1)
const isSaved = computed(() => wishlistStore.hasItem(currentId.value))

const toggleWishlist = () => {
  wishlistStore.toggleItem({
    id: currentId.value,
    title: props.title || 'ONE LIFE GRAPHIC T-SHIRT',
    price: 260,
    originalPrice: 300,
    discountPercent: 40,
    rating: 4.5,
    image: props.images?.[0] || '/img/prod-09.png',
    route: `/products/${currentId.value}`,
  })
}
</script>