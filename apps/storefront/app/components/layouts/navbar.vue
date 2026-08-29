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
            <Icon name="heroicons:user-circle" class="w-5 h-5" />
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
            <Icon name="heroicons:shopping-cart" class="w-5 h-5" />

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