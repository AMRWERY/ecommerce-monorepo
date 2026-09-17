<template>
  <div v-if="isLoading" class="space-y-5 animate-pulse">
    <div class="h-9 sm:h-11 bg-gray-200 dark:bg-neutral-800 rounded-full w-4/5" />
    <div class="h-4 bg-gray-200 dark:bg-neutral-800 rounded-full w-24" />
    <div class="h-8 bg-gray-200 dark:bg-neutral-800 rounded-full w-1/3" />
    <div class="space-y-2 border-b border-gray-100 pb-5">
      <div class="h-4 bg-gray-200 dark:bg-neutral-800 rounded-full w-full" />
      <div class="h-4 bg-gray-200 dark:bg-neutral-800 rounded-full w-2/3" />
    </div>
    <div class="h-14 bg-gray-200 dark:bg-neutral-800 rounded-full w-full" />
  </div>

  <div v-else class="space-y-5">
    <!-- Title -->
    <h1 class="text-3xl sm:text-4xl lg:text-[40px] font-black uppercase tracking-tight leading-tight">
      {{ product.title }}
    </h1>

    <!-- Ratings -->
    <div class="flex items-center gap-3">
      <div class="flex items-center text-[#FFC633]">
        <Icon v-for="s in 4" :key="s" name="lucide:star" class="w-4 h-4 fill-current" />
        <Icon name="lucide:star-half" class="w-4 h-4 fill-current" />
      </div>
      <span class="text-sm font-normal">{{ product.rating }}<span class="text-gray-400">/5</span></span>
    </div>

    <!-- Pricing -->
    <div class="flex items-center gap-3.5">
      <span class="text-2xl sm:text-3xl font-bold">${{ product.price }}</span>
      <span v-if="product.originalPrice" class="text-2xl sm:text-3xl font-bold text-gray-300 line-through">
        ${{ product.originalPrice }}
      </span>
      <span v-if="product.discountPercent"
        class="text-xs sm:text-sm font-semibold text-[#FF3333] bg-[#FF3333]/10 px-3.5 py-1 rounded-full">
        -{{ product.discountPercent }}%
      </span>
    </div>

    <!-- Description -->
    <p class="text-gray-500 text-sm sm:text-base leading-relaxed border-b border-gray-100 pb-5">
      {{ product.description }}
    </p>

    <!-- Color Selector -->
    <div v-if="product.colors?.length" class="space-y-3 border-b border-gray-100 pb-5">
      <label class="text-xs sm:text-sm text-gray-500 font-normal">Select Colors</label>
      <div class="flex items-center gap-3">
        <button v-for="color in product.colors" :key="color.hex" @click="selectedColor = color.hex"
          :style="{ backgroundColor: color.hex }"
          class="w-9 h-9 rounded-full flex items-center justify-center transition-transform transform active:scale-95 shadow-xs"
          :aria-label="color.name">
          <Icon v-if="selectedColor === color.hex" name="lucide:check" class="w-4 h-4 text-white stroke-[3]" />
        </button>
      </div>
    </div>

    <!-- Size Selector -->
    <div v-if="product.sizes?.length" class="space-y-3 border-b border-gray-100 pb-6">
      <label class="text-xs sm:text-sm text-gray-500 font-normal">Choose Size</label>
      <div class="flex flex-wrap gap-2.5 sm:gap-3">
        <button v-for="size in product.sizes" :key="size" @click="selectedSize = size" :class="[
          'px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all',
          selectedSize === size
            ? 'bg-black text-white'
            : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
        ]">
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Quantity Counter & Add to Cart -->
    <div class="flex items-center gap-3.5 sm:gap-4 pt-1">
      <!-- Counter -->
      <div class="flex items-center bg-[#F0F0F0] rounded-full px-4 py-3 gap-5">
        <button @click="decreaseQty" class="text-gray-600 hover:text-black focus:outline-none" aria-label="Decrease">
          <Icon name="lucide:minus" class="w-4 h-4 stroke-[2.5]" />
        </button>
        <span class="font-bold text-sm w-4 text-center select-none">{{ quantity }}</span>
        <button @click="increaseQty" class="text-gray-600 hover:text-black focus:outline-none" aria-label="Increase">
          <Icon name="lucide:plus" class="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      <!-- Add to Cart Button -->
      <LazyVButton size="lg" shape="pill" class="flex-1 font-medium text-sm sm:text-base py-3.5"
        :loading="isAddingToCart" @click="handleAddToCart">
        Add to Cart
      </LazyVButton>

      <!-- Wishlist Heart Button -->
      <button
        type="button"
        @click="toggleWishlist"
        :disabled="isTogglingWishlist"
        :aria-label="isSaved ? 'Remove from wishlist' : 'Add to wishlist'"
        :class="[
          'w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 border cursor-pointer hover:scale-105 active:scale-95 disabled:pointer-events-none',
          isSaved
            ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-800/60 shadow-xs'
            : 'bg-[#F0F0F0] dark:bg-neutral-800 border-transparent text-gray-600 dark:text-neutral-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50/60 dark:hover:bg-rose-950/30'
        ]"
      >
        <Icon
          v-if="isTogglingWishlist"
          name="svg-spinners:180-ring"
          class="w-5 h-5 animate-spin"
        />
        <Icon
          v-else
          :name="isSaved ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
          :class="[
            'w-6 h-6 transition-all duration-200',
            isSaved ? 'text-rose-500 scale-110' : ''
          ]"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProductDetail } from '@/types/products'

const props = withDefaults(
  defineProps<{
    product: ProductDetail
    productId?: string | number
  }>(),
  {
    productId: undefined,
  }
)

const emit = defineEmits<{
  (e: 'addToCart', payload: { product: ProductDetail; size: string; color: string; quantity: number }): void
}>()

const isLoading = useSimulatedLoading()
const route = useRoute()
const wishlistStore = useWishlistStore()

const currentId = computed(() => props.productId || (props.product as any).id || route.params.slug || 1)
const isSaved = computed(() => wishlistStore.hasItem(currentId.value))

const toast = useToast()
const isTogglingWishlist = ref(false)

const toggleWishlist = async (): Promise<void> => {
  if (isTogglingWishlist.value) return
  isTogglingWishlist.value = true
  await new Promise((resolve) => setTimeout(resolve, 400))
  isTogglingWishlist.value = false

  const added = wishlistStore.toggleItem({
    id: currentId.value,
    title: props.product.title,
    price: props.product.price,
    originalPrice: props.product.originalPrice,
    discountPercent: props.product.discountPercent,
    rating: props.product.rating,
    image: props.product.images?.[0] || '/img/prod-01.png',
    route: `/products/${currentId.value}`,
  })

  if (added) {
    toast.success(`Added "${props.product.title}" to wishlist`, {
      title: 'Saved Item',
      duration: 3000,
    })
  } else {
    toast.info(`Removed "${props.product.title}" from wishlist`, {
      title: 'Wishlist Updated',
      duration: 3000,
    })
  }
}

const quantity = ref(1)
const selectedSize = ref(props.product.sizes?.[2] ?? props.product.sizes?.[0] ?? 'Large')
const selectedColor = ref(props.product.colors?.[0]?.hex ?? '#4F4631')

const increaseQty = (): void => {
  quantity.value++
}

const decreaseQty = (): void => {
  if (quantity.value > 1) quantity.value--
}

const isAddingToCart = ref(false)

const handleAddToCart = async (): Promise<void> => {
  if (isAddingToCart.value) return
  isAddingToCart.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))
  isAddingToCart.value = false

  emit('addToCart', {
    product: props.product,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value,
  })
}
</script>