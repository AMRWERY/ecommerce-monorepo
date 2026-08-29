<template>
  <div>
    <!-- Backdrop Overlay -->
    <div
      v-if="cartStore.isOpen"
      @click="cartStore.close()"
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-[3px] animate-fade-in"
    />

    <!-- Drawer Container (Trailing Edge Slide-in) -->
    <div
      v-if="cartStore.isOpen"
      class="fixed inset-y-0 right-0 z-50 w-full max-w-[420px] bg-white text-[#11141B] border-s border-neutral-200 dark:bg-[#1A1D25] dark:text-[#F0F1F4] dark:border-[#2A2E38] shadow-2xl flex flex-col justify-between selection:bg-[#3373FF] selection:text-white animate-slide-in-right"
    >
      <!-- ==================== DRAWER HEADER ==================== -->
      <div
        class="px-6 py-3 border-b divider-border flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <h2 class="text-base font-bold tracking-tight">Shopping Bag</h2>
          <span
            v-if="totalQuantity > 0"
            class="bg-[#3373FF] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
          >
            {{ totalQuantity }}
          </span>
        </div>

        <VButton
          variant="ghost"
          color="dark"
          shape="icon"
          @click="cartStore.close()"
          aria-label="Close Bag"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </VButton>
      </div>

      <!-- ==================== ITEMS LIST ==================== -->
      <div
        class="flex-1 px-6 py-4 overflow-y-auto divide-y divide-neutral-200 dark:divide-[#2A2E38]/60 space-y-4"
      >
        <div
          v-if="items.length === 0"
          class="h-full flex flex-col items-center justify-center text-center py-12 muted-text"
        >
          <svg
            class="w-12 h-12 text-neutral-300 dark:text-neutral-600 mb-3"
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
          <p class="text-sm font-medium">Your shopping bag is empty</p>
          <VButton
            to="/shop"
            variant="plain"
            shape="none"
            class="group gap-1 text-blue-600 text-sm hover:underline"
            @click="cartStore.close()"
          >
            Start Shopping
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
        </div>

        <div
          v-for="item in items"
          :key="item.id"
          class="pt-4 first:pt-0 flex gap-4 items-center group"
        >
          <!-- Thumbnail -->
          <div
            class="relative w-20 h-20 thumb-frame"
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
              class="text-sm font-semibold text-[#11141B] dark:text-[#F0F1F4] truncate leading-snug"
            >
              {{ item.title }}
            </h3>
            <p class="text-xs muted-text">
              {{ item.variant }}
            </p>
            <div
              class="text-sm font-bold text-[#11141B] dark:text-[#F0F1F4] pt-1"
            >
              ${{ (item.price * item.quantity).toLocaleString() }}
            </div>
          </div>

          <!-- Quantity Stepper -->
          <div
            class="flex items-center border divider-border rounded-lg bg-neutral-50 dark:bg-[#12141A] shrink-0 overflow-hidden"
          >
            <VButton
              variant="plain"
              shape="none"
              @click="decrementQty(item.id)"
              class="w-7 h-7 stepper-btn text-xs"
              aria-label="Decrease quantity"
            >
              –
            </VButton>
            <span
              class="w-6 text-center text-xs font-semibold text-[#11141B] dark:text-white select-none"
            >
              {{ item.quantity }}
            </span>

            <VButton
              variant="plain"
              shape="none"
              @click="incrementQty(item.id)"
              class="w-7 h-7 stepper-btn text-xs"
              aria-label="Increase quantity"
            >
              +
            </VButton>
          </div>
        </div>
      </div>

      <!-- ==================== ORDER SUMMARY & CHECKOUT ==================== -->
      <div
        class="p-6 border-t divider-border bg-neutral-50 dark:bg-[#161920] space-y-4"
      >
        <div class="space-y-2 text-xs">
          <div
            class="flex items-center justify-between muted-text"
          >
            <span>Subtotal</span>
            <span class="text-[#11141B] dark:text-white font-medium"
              >${{ subtotal.toLocaleString() }}</span
            >
          </div>
          <div
            class="flex items-center justify-between muted-text"
          >
            <span>Shipping</span>
            <span class="text-[#3373FF] font-medium">Free</span>
          </div>
        </div>

        <div class="border-t divider-border pt-3">
          <div
            class="flex items-center justify-between text-sm font-bold text-[#11141B] dark:text-white mb-1"
          >
            <span>Total</span>
            <span class="text-base">${{ subtotal.toLocaleString() }}</span>
          </div>
          <p class="text-[11px] muted-text">
            Taxes and calculated shipping fee added at checkout.
          </p>
        </div>

        <!-- Checkout Action Button -->
        <VButton
          to="/checkout"
          block
          size="lg"
          :disabled="items.length === 0"
          class="group"
          @click="cartStore.close()"
        >
          <span>Checkout</span>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CartItem } from "~/types/cart-drawer";

// --- Cart State ---
const cartStore = useCartStore();

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

// --- Quantity Handlers ---
const incrementQty = (id: number) => {
  const item = items.value.find((i) => i.id === id);
  if (item) item.quantity++;
};

const decrementQty = (id: number) => {
  const item = items.value.find((i) => i.id === id);
  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      items.value = items.value.filter((i) => i.id !== id);
    }
  }
};

// --- Calculations ---
const totalQuantity = computed(() =>
  items.value.reduce((acc, item) => acc + item.quantity, 0),
);
const subtotal = computed(() =>
  items.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
);
</script>
