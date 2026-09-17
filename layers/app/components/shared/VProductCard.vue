<template>
    <nuxt-link-locale :to="product.route"
        class="group flex flex-col justify-between h-full bg-white dark:bg-[#1A1D25] border border-gray-200 dark:border-neutral-800 rounded-[20px] sm:rounded-[24px] hover:border-gray-300 dark:hover:border-neutral-700 hover:shadow-sm transition-all duration-200 cursor-pointer">
        <!-- Image Box -->
        <div
            class="relative bg-[#F0EEED] dark:bg-neutral-800 rounded-t-[14px] sm:rounded-t-[18px] h-52 sm:h-64 flex items-center justify-center overflow-hidden">
            <!-- Discount Percentage Badge (Top-End on Image) -->
            <span v-if="discountBadge"
                class="absolute top-2.5 end-2.5 sm:top-3 sm:end-3 z-10 text-xs sm:text-sm font-semibold text-[#FF3333] bg-[#FF3333]/15 dark:bg-[#FF3333]/25 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-sm select-none">
                -{{ discountBadge }}%
            </span>

            <!-- Wishlist Heart Button (Top-Start on Image) -->
            <button
                type="button"
                @click.prevent.stop="toggleWishlist"
                :aria-label="isSaved ? 'Remove from wishlist' : 'Add to wishlist'"
                class="absolute top-2.5 start-2.5 sm:top-3 sm:start-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-[#1A1D25]/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all duration-200 group/heart border border-black/5 dark:border-white/10"
            >
                <Icon
                    :name="isSaved ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'"
                    :class="[
                        'w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200',
                        isSaved ? 'text-rose-500 scale-110' : 'text-gray-500 dark:text-neutral-400 group-hover/heart:text-rose-500'
                    ]"
                />
            </button>

            <img :src="product.image" :alt="product.title"
                class="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300 ease-out select-none"
                loading="lazy" />
        </div>

        <!-- Product Details -->
        <div class="mt-1 sm:mt-1 space-y-1.5 flex flex-col justify-between flex-1 p-3 sm:p-4">
            <!-- Title -->
            <h3
                class="font-bold text-base sm:text-lg text-black dark:text-white line-clamp-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                {{ product.title }}
            </h3>

            <!-- Star Rating -->
            <div class="flex items-center gap-2">
                <div class="flex items-center gap-1">
                    <template v-for="star in 5" :key="star">
                        <!-- Full Star -->
                        <Icon name="ic:round-star" v-if="star <= Math.floor(product.rating)"
                            class="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FFC633]" />

                        <!-- Half Star -->
                        <div v-else-if="star === Math.ceil(product.rating) && product.rating % 1 !== 0"
                            class="relative w-4 h-4 sm:w-4.5 sm:h-4.5">
                            <!-- Background Empty Star -->
                            <Icon name="ic:round-star-half"
                                class="w-full h-full text-gray-200 dark:text-neutral-700 fill-current" />
                        </div>

                        <!-- Empty Star -->
                        <Icon name="ic:round-star-purple500" v-else
                            class="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-200 dark:text-neutral-700 fill-current" />
                    </template>
                </div>

                <!-- Numerical Rating -->
                <span class="text-xs sm:text-sm text-black dark:text-white font-normal">
                    {{ product.rating }}<span class="text-gray-400 dark:text-neutral-500">/5</span>
                </span>
            </div>

            <!-- Pricing Row -->
            <div class="flex items-center gap-2.5 pt-1 mt-auto">
                <!-- Current Price -->
                <span class="font-bold text-xl sm:text-2xl text-black dark:text-white">
                    ${{ product.price }}
                </span>

                <!-- Original Price (if discounted) -->
                <span v-if="product.originalPrice"
                    class="font-bold text-xl sm:text-2xl text-gray-400 dark:text-neutral-500 line-through">
                    ${{ product.originalPrice }}
                </span>
            </div>
        </div>
    </nuxt-link-locale>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/shared/VProductCard'

const props = defineProps<{
    product: Product
}>()

const wishlistStore = useWishlistStore()
const toast = useToast()
const isSaved = computed(() => wishlistStore.hasItem(props.product.id))

const toggleWishlist = () => {
    const added = wishlistStore.toggleItem(props.product)
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

// Calculate discount percentage if not provided directly
const discountBadge = computed<number | null>(() => {
    if (props.product.discountPercent) {
        return props.product.discountPercent
    }
    if (props.product.originalPrice && props.product.originalPrice > props.product.price) {
        return Math.round(
            ((props.product.originalPrice - props.product.price) / props.product.originalPrice) * 100
        )
    }
    return null
})
</script>