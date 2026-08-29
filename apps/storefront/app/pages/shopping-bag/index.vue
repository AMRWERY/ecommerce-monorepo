<template>
  <div class="w-full">
    <!-- ==================== PAGE HEADER ==================== -->
    <div class="flex items-center gap-3 mb-8">
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
        Shopping Bag
      </h1>
      <span
        v-if="totalQuantity > 0"
        class="bg-[#3373FF] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
      >
        {{ totalQuantity }}
      </span>
    </div>

    <!-- ==================== EMPTY STATE ==================== -->
    <div
      v-if="items.length === 0"
      class="flex flex-col items-center justify-center text-center py-24 muted-text"
    >
      <svg
        class="w-16 h-16 text-neutral-300 dark:text-neutral-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <p class="text-base font-medium mb-5">Your shopping bag is empty</p>
      <VButton to="/shop" size="lg">Start Shopping</VButton>
    </div>

    <!-- ==================== BAG CONTENT ==================== -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <!-- ================ ITEMS LIST ================ -->
      <section
        class="lg:col-span-8 divide-y divide-neutral-200 dark:divide-[#2A2E38]"
      >
        <div
          v-for="item in items"
          :key="item.id"
          class="py-6 first:pt-0 last:pb-0 flex gap-5 items-center group"
        >
          <!-- Thumbnail -->
          <div
            class="relative w-24 h-24 sm:w-28 sm:h-28 thumb-frame"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="img-zoom"
            />
          </div>

          <!-- Product Details -->
          <div class="flex-1 min-w-0 space-y-1">
            <h3
              class="text-sm sm:text-base font-semibold text-[#11141B] dark:text-[#F0F1F4] truncate leading-snug"
            >
              {{ item.title }}
            </h3>
            <p
              class="text-xs sm:text-sm muted-text"
            >
              {{ item.variant }}
            </p>
            <p
              class="text-xs sm:text-sm muted-text"
            >
              ${{ item.price.toLocaleString() }} each
            </p>

            <!-- Quantity Stepper -->
            <div
              class="mt-3 inline-flex items-center border divider-border rounded-lg bg-neutral-50 dark:bg-[#12141A] overflow-hidden"
            >
              <VButton
                variant="plain"
                shape="none"
                @click="decrementQty(item.id)"
                class="w-8 h-8 stepper-btn text-sm"
                aria-label="Decrease quantity"
              >
                –
              </VButton>
              <span
                class="w-8 text-center text-sm font-semibold text-[#11141B] dark:text-white select-none"
              >
                {{ item.quantity }}
              </span>
              <VButton
                variant="plain"
                shape="none"
                @click="incrementQty(item.id)"
                class="w-8 h-8 stepper-btn text-sm"
                aria-label="Increase quantity"
              >
                +
              </VButton>
            </div>
          </div>

          <!-- Line Total + Remove -->
          <div class="flex flex-col items-end gap-3 shrink-0">
            <div
              class="text-sm sm:text-base font-bold text-[#11141B] dark:text-[#F0F1F4]"
            >
              ${{ (item.price * item.quantity).toLocaleString() }}
            </div>
            <VButton
              variant="ghost"
              color="danger"
              shape="icon"
              size="sm"
              @click="removeItem(item.id)"
              aria-label="Remove item"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v13a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z"
                />
              </svg>
            </VButton>
          </div>
        </div>
      </section>

      <!-- ================ ORDER SUMMARY ================ -->
      <aside class="lg:col-span-4">
        <div
          class="p-6 sm:p-8 rounded-2xl border divider-border bg-white dark:bg-[#1A1D25] shadow-sm space-y-6 lg:sticky lg:top-24"
        >
          <h2 class="text-lg font-extrabold tracking-tight">Order Summary</h2>

          <div class="space-y-2.5 text-xs sm:text-sm font-medium">
            <div
              class="flex items-center justify-between muted-text"
            >
              <span>Subtotal</span>
              <span class="text-[#11141B] dark:text-white font-semibold"
                >${{ subtotal.toLocaleString() }}</span
              >
            </div>
            <div
              class="flex items-center justify-between muted-text"
            >
              <span>Shipping</span>
              <span class="text-[#3373FF] font-semibold">Free</span>
            </div>
          </div>

          <div
            class="border-t divider-border pt-4 flex items-baseline justify-between"
          >
            <span class="text-base font-bold">Total</span>
            <span
              class="text-2xl font-black tracking-tight text-[#11141B] dark:text-white"
            >
              ${{ subtotal.toLocaleString() }}
            </span>
          </div>
          <p class="text-[11px] muted-text -mt-4">
            Taxes and calculated shipping fee added at checkout.
          </p>

          <VButton to="/checkout" block size="lg" class="group">
            <span>Proceed to Checkout</span>
            <svg
              class="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </VButton>
          <VButton to="/shop" variant="outline" color="neutral" block>
            Continue Shopping
          </VButton>
        </div>
      </aside>
    </div>

    <!-- ==================== RECOMMENDATIONS ==================== -->
    <div class="mt-16 pt-16 border-t divider-border">
      <LazyRecommendationsProducts />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CartItem } from "~/types/cart-drawer";

const items = ref<CartItem[]>([
  {
    id: 1,
    title: "Omega Seamaster Aqua Terra",
    variant: "Silver / Blue Dial",
    price: 1250,
    quantity: 1,
    image: "/img/alloy-keyboard.jpg",
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless",
    variant: "Midnight Black",
    price: 900,
    quantity: 2,
    image: "/img/arc-minimalist-lamp.jpg",
  },
  {
    id: 3,
    title: "Luxury Leather Bifold Wallet",
    variant: "Espresso Brown",
    price: 450,
    quantity: 1,
    image: "/img/ceramic-mug-set.jpg",
  },
]);

const incrementQty = (id: number) => {
  const item = items.value.find((i) => i.id === id);
  if (item) item.quantity++;
};

const decrementQty = (id: number) => {
  const item = items.value.find((i) => i.id === id);
  if (item && item.quantity > 1) item.quantity--;
};

const removeItem = (id: number) => {
  items.value = items.value.filter((i) => i.id !== id);
};

const totalQuantity = computed(() =>
  items.value.reduce((acc, item) => acc + item.quantity, 0),
);
const subtotal = computed(() =>
  items.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
);
</script>