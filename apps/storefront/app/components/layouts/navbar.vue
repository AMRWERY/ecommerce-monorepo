<template>
    <header
        class="w-full bg-white dark:bg-[#12141A] border-b border-gray-100 dark:border-neutral-800 transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20 gap-4 md:gap-8">

                <!-- Left: Logo & Nav Links -->
                <div class="flex items-center gap-4 lg:gap-8 shrink-0">
                    <!-- Mobile Menu Button (Hamburger) -->
                    <LazyVButton variant="ghost" color="dark" shape="icon" size="md" class="md:hidden"
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                        :aria-label="isMobileMenuOpen ? 'Close menu' : 'Toggle menu'">
                        <Icon
                            :name="isMobileMenuOpen ? 'material-symbols:menu-open-rounded' : 'material-symbols:menu-rounded'"
                            class="w-6 h-6" />
                    </LazyVButton>

                    <!-- Logo -->
                    <nuxt-link-locale to="/"
                        class="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white uppercase select-none">
                        SHOP.CO
                    </nuxt-link-locale>

                    <!-- Desktop Navigation -->
                    <nav
                        class="hidden md:flex items-center gap-6 text-base text-gray-700 dark:text-gray-300 font-normal">
                        <!-- Shop Dropdown -->
                        <LazyVDropdownMenu :label="t('navbar.shop') || 'Shop'" :items="shopCategories" />

                        <nuxt-link-locale to="/on-sale" class="hover:text-black dark:hover:text-white transition-colors">On
                            Sale</nuxt-link-locale>
                        <nuxt-link-locale to="/new-arrivals" class="hover:text-black dark:hover:text-white transition-colors">New
                            Arrivals</nuxt-link-locale>
                        <nuxt-link-locale to="/products"
                            class="hover:text-black dark:hover:text-white transition-colors">Brands</nuxt-link-locale>
                    </nav>
                </div>

                <!-- Middle: Search Bar -->
                <div class="flex-1 max-w-xl">
                    <div class="relative w-full">
                        <span
                            class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400 dark:text-neutral-500">
                            <Icon name="at-icons:magnifying-glass" class="w-5 h-5" />
                        </span>
                        <input v-model="searchQuery" type="text" placeholder="Search for products..."
                            class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-gray-800 dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-400 text-sm rounded-full ps-11 pe-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 transition-all" />
                    </div>
                </div>

                <!-- Right: Action Icons -->
                <div class="flex items-center gap-1 sm:gap-2 shrink-0">
                    <!-- Language Toggle -->
                    <LazyVToggleLocales />

                    <!-- Theme Toggle -->
                    <LazyVToggleThemes />

                    <!-- Cart Icon Button -->
                    <LazyVButton variant="ghost" color="dark" shape="icon" size="md" class="relative"
                        :aria-label="t('navbar.cartTitle') || 'Cart'" to="/cart">
                        <Icon name="material-symbols:add-shopping-cart-rounded" class="w-6 h-6" />
                        <!-- Badge (optional) -->
                        <span v-if="cartCount > 0"
                            class="absolute top-1 end-1 bg-black text-white dark:bg-white dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                            {{ cartCount }}
                        </span>
                    </LazyVButton>

                    <!-- User Profile Icon Button -->
                    <LazyVButton variant="ghost" color="dark" shape="icon" size="md"
                        :aria-label="t('navbar.userAccount') || 'Account'" to="/profile">
                        <Icon name="material-symbols:account-circle-outline" class="w-6 h-6" />
                    </LazyVButton>
                </div>
            </div>
        </div>

        <!-- Mobile Navigation Drawer -->
        <div v-if="isMobileMenuOpen"
            class="md:hidden border-t border-gray-100 dark:border-neutral-800 px-4 pt-3 pb-6 bg-white dark:bg-[#12141A] space-y-3">
            <div>
                <button @click="toggleShopDropdown"
                    class="flex items-center justify-between w-full py-2 text-base font-medium text-gray-800 dark:text-gray-200">
                    <span>{{ t('navbar.shop') || 'Shop' }}</span>
                    <Icon
                        :name="isShopOpen ? 'material-symbols:keyboard-arrow-up-rounded' : 'material-symbols:keyboard-arrow-down-rounded'"
                        class="w-4 h-4" />
                </button>
                <div v-if="isShopOpen" class="ps-4 space-y-2 mt-1">
                    <nuxt-link-locale v-for="item in shopCategories" :key="item.name" :to="item.route"
                        @click="isMobileMenuOpen = false"
                        class="block py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                        {{ item.name }}
                    </nuxt-link-locale>
                </div>
            </div>
            <nuxt-link-locale to="/on-sale" @click="isMobileMenuOpen = false"
                class="block py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white">On
                Sale</nuxt-link-locale>
            <nuxt-link-locale to="/new-arrivals" @click="isMobileMenuOpen = false"
                class="block py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white">New
                Arrivals</nuxt-link-locale>
            <nuxt-link-locale to="/products" @click="isMobileMenuOpen = false"
                class="block py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white">Brands</nuxt-link-locale>
        </div>
    </header>
</template>

<script lang="ts" setup>
import type { ShopCategory } from '@/types/layouts/navbar'

const { t } = useI18n()

// Component State
const searchQuery = ref<string>('')
const isShopOpen = ref<boolean>(false)
const isMobileMenuOpen = ref<boolean>(false)
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.count)

// Categories List for Dropdown
const shopCategories: ShopCategory[] = [
    { name: "Men's Clothes", route: '/products?category=men' },
    { name: "Women's Clothes", route: '/products?category=women' },
    { name: 'Casual Wear', route: '/products?category=casual' },
    { name: 'Formal Wear', route: '/products?category=formal' },
    { name: 'Party Wear', route: '/products?category=party' },
    { name: 'Gym / Sportswear', route: '/products?category=gym' },
]

const toggleShopDropdown = (): void => {
    isShopOpen.value = !isShopOpen.value
}
</script>