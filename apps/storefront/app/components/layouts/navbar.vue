<template>
  <div>
    <header
      class="bg-white border-neutral-200/80 dark:bg-[#1A1D25] dark:border-[#2A2E38] sticky top-0 z-30 w-full border-b transition-colors duration-200"
    >
      <div
        class="container-page h-16 flex items-center justify-between"
      >
        <!-- Left: Logo & Navigation -->
        <div class="flex items-center gap-10">
          <!-- Logo -->
          <nuxt-link-locale to="/"
            class="text-xl font-extrabold tracking-tight hover:opacity-90 transition-opacity flex items-center gap-1"
          >
            <span class="tracking-widest uppercase">{{
              t("navbar.brand")
            }}</span>
          </nuxt-link-locale>

          <!-- Nav Items -->
          <nav
            class="hidden sm:flex items-center gap-8 text-[15px] font-medium"
          >
            <nuxt-link-locale
              to="/shop"
              :class="[
                isShopActive
                  ? 'text-[#3373FF] font-semibold'
                  : 'text-[#11141B]/70 hover:text-[#11141B] dark:text-[#F0F1F4]/70 dark:hover:text-[#F0F1F4]',
                'relative py-5 transition-colors duration-150',
              ]"
            >
              {{ t("navbar.shop") }}
              <!-- Active Indicator Line -->
              <span
                v-if="isShopActive"
                class="absolute bottom-0 start-0 end-0 h-[2px] bg-[#3373FF] rounded-full animate-fade-in"
              />
            </nuxt-link-locale>

            <LazyVButton
              variant="plain"
              shape="none"
              @click="isCategoriesActive = true"
              :class="[
                isCategoriesActive
                  ? 'text-[#3373FF] font-semibold'
                  : 'text-[#11141B]/70 hover:text-[#11141B] dark:text-[#F0F1F4]/70 dark:hover:text-[#F0F1F4]',
                'relative py-5',
              ]"
            >
              {{ t("navbar.categories") }}
              <!-- Active Indicator Line -->
              <span
                v-if="isCategoriesActive"
                class="absolute bottom-0 start-0 end-0 h-[2px] bg-[#3373FF] rounded-full animate-fade-in"
              />
            </LazyVButton>
          </nav>
        </div>

        <!-- Right: Actions (Language, Theme, Profile, Cart) -->
        <div class="flex items-center gap-5 sm:gap-6">
          <!-- Locale Switcher -->
          <LazyVToggleLocales />

          <!-- Sun/Moon Theme Toggle -->
          <LazyVToggleThemes />

          <!-- User Account Icon -->
          <LazyVButton
            variant="ghost"
            color="dark"
            shape="icon"
            :title="t('navbar.userAccount')"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </LazyVButton>

          <!-- Shopping Cart Icon with Badge -->
          <LazyVButton
            variant="ghost"
            color="dark"
            shape="icon"
            class="relative"
            @click="cartStore.toggle()"
            aria-label="Shopping Cart"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            <!-- Cart Badge -->
            <span
              v-if="cartStore.count > 0"
              class="absolute -top-0.5 -end-0.5 bg-[#3373FF] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
            >
              {{ cartStore.count }}
            </span>
          </LazyVButton>
        </div>
      </div>
    </header>

    <lazy-cart-drawer />
  </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();

const cartStore = useCartStore();
const route = useRoute();

// --- State Management ---
const isCategoriesActive = ref(false);

// --- Computed Helpers ---
const isRtl = computed(() => locale.value === "ar");
const isShopActive = computed(
  () => !isCategoriesActive.value && route.path.includes("/shop"),
);

watch(
  () => route.path,
  () => {
    isCategoriesActive.value = false;
  },
);
</script>