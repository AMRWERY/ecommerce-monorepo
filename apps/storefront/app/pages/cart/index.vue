<template>
    <div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <!-- Breadcrumb Navigation using shared LazyVBreadcrumb -->
            <LazyVBreadcrumb :items="breadcrumbs" />

            <!-- Main Page Title -->
            <h1
                class="text-3xl sm:text-4xl lg:text-[40px] font-black uppercase tracking-tight mb-6 sm:mb-8 text-black dark:text-white">
                Your Cart
            </h1>

            <!-- Main Cart Layout -->
            <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <!-- Left Column: Cart Items List (col-span-7) -->
                <div
                    class="lg:col-span-7 border border-gray-200 dark:border-neutral-800 rounded-[20px] p-4 sm:p-6 bg-white dark:bg-[#1A1D25] divide-y divide-gray-100 dark:divide-neutral-800">
                    <lazy-cart-item-row v-for="item in cartStore.items" :key="item.id" :item="item"
                        @increase="cartStore.increaseQty" @decrease="cartStore.decreaseQty"
                        @remove="cartStore.removeItem" />
                </div>

                <!-- Right Column: Order Summary (col-span-5) -->
                <div class="lg:col-span-5">
                    <lazy-cart-order-summary :subtotal="cartStore.subtotal" :discount-amount="cartStore.discountAmount"
                        :discount-percent="cartStore.discountPercent" :delivery-fee="cartStore.deliveryFee"
                        :total="cartStore.total" :current-promo="cartStore.promoCode" @apply-promo="handleApplyPromo"
                        @checkout="handleGoToCheckout" />
                </div>
            </div>

            <!-- Empty Cart State -->
            <div v-else
                class="text-center py-16 sm:py-20 border border-gray-200 dark:border-neutral-800 rounded-[20px] bg-white dark:bg-[#1A1D25] space-y-4 px-4">
                <div
                    class="w-20 h-20 mx-auto rounded-full bg-[#F0EEED] dark:bg-neutral-800 flex items-center justify-center text-gray-400 dark:text-neutral-500">
                    <Icon name="lucide:shopping-bag" class="w-10 h-10" />
                </div>
                <h3 class="text-xl sm:text-2xl font-bold text-black dark:text-white">Your cart is empty</h3>
                <p class="text-sm text-gray-500 dark:text-neutral-400 max-w-sm mx-auto">
                    Looks like you haven't added anything to your cart yet. Explore our newest arrivals and find
                    something you love.
                </p>
                <div class="pt-2">
                    <LazyVButton to="/products" variant="solid" color="dark" shape="pill" size="md"
                        class="px-8 py-3 font-medium">
                        Continue Shopping
                    </LazyVButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@types/shared/VBreadcrumb'

const localePath = useLocalePath()
const cartStore = useCartStore()

const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', to: '/' },
    { label: 'Cart' },
]

const handleApplyPromo = (code: string) => {
    cartStore.applyPromo(code)
}

const handleGoToCheckout = () => {
    navigateTo(localePath('/checkout'))
}
</script>