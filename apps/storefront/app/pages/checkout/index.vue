<template>
  <div
    class="min-h-screen bg-white text-[#11141B] dark:bg-[#12141A] dark:text-[#F0F1F4] antialiased"
  >
    <!-- ==================== TOP CHECKOUT BAR ==================== -->
    <header
      class="border-b border-neutral-200/80 dark:border-[#2A2E38] sticky top-0 bg-white/95 dark:bg-[#1A1D25]/95 backdrop-blur-sm z-30"
    >
      <div
        class="container-page h-16 flex items-center justify-between"
      >
        <!-- Secure Badge -->
        <div
          class="hidden sm:flex items-center gap-2 text-xs font-semibold muted-text"
        >
          <svg
            class="w-4 h-4 text-neutral-600 dark:text-neutral-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span>Secure Checkout</span>
        </div>

        <!-- Return Link -->
        <nuxt-link-locale
          to="/shopping-bag"
          class="text-xs font-medium muted-text link-hover-brand"
        >
          Return to Cart
        </nuxt-link-locale>
      </div>
    </header>

    <!-- ==================== MAIN CHECKOUT CONTAINER ==================== -->
    <main class="container-page py-10">
      <!-- Stepper / Breadcrumb Progress -->
      <div class="max-w-xl mx-auto md:mx-0 mb-10">
        <div class="flex items-center justify-between relative">
          <!-- Step 1: Active -->
          <div class="flex flex-col items-center gap-2 z-10">
            <div
              class="w-8 h-8 rounded-full bg-[#3373FF] text-white flex items-center justify-center text-xs font-bold shadow-sm"
            >
              1
            </div>
            <span class="text-xs font-semibold text-[#3373FF]">Shipping</span>
          </div>

          <!-- Connecting Line 1 -->
          <div class="flex-1 h-[2px] bg-neutral-200 dark:bg-[#2A2E38] -mt-6 mx-3" />

          <!-- Step 2 -->
          <div class="flex flex-col items-center gap-2 z-10">
            <div
              class="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#1A1D25] border border-neutral-300 dark:border-[#2A2E38] muted-text flex items-center justify-center text-xs font-bold"
            >
              2
            </div>
            <span class="text-xs font-medium muted-text">Payment</span>
          </div>

          <!-- Connecting Line 2 -->
          <div class="flex-1 h-[2px] bg-neutral-200 dark:bg-[#2A2E38] -mt-6 mx-3" />

          <!-- Step 3 -->
          <div class="flex flex-col items-center gap-2 z-10">
            <div
              class="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#1A1D25] border border-neutral-300 dark:border-[#2A2E38] muted-text flex items-center justify-center text-xs font-bold"
            >
              3
            </div>
            <span class="text-xs font-medium muted-text">Review</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- ==================== LEFT COLUMN: SHIPPING FORM ==================== -->
        <section class="lg:col-span-7 space-y-8">
          <!-- Section Title -->
          <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Shipping Address
            </h1>
            <p class="text-sm muted-text mt-1">
              Please enter your shipping details below.
            </p>
          </div>

          <!-- Contact Information Block -->
          <div class="space-y-4">
            <h2 class="text-base font-bold tracking-tight">
              Contact Information
            </h2>

            <LazyVInput
              type="email"
              v-model="form.email"
              placeholder="Email Address"
            />

            <LazyVInput type="checkbox" v-model="form.newsletter">
              Email me with news and offers
            </LazyVInput>
          </div>

          <hr class="border-neutral-200 dark:border-[#2A2E38]" />

          <!-- Delivery Address Block -->
          <div class="space-y-4">
            <h2 class="text-base font-bold tracking-tight">Delivery Address</h2>
            <!-- Country Select -->
            <LazyVInput type="select" v-model="form.country" :options="countryOptions" />

            <!-- First & Last Name -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LazyVInput type="text" v-model="form.firstName" placeholder="First Name" />
            
              <LazyVInput type="text" v-model="form.lastName" placeholder="Last Name" />
            </div>

            <!-- Address -->
            <LazyVInput type="text" v-model="form.address" placeholder="Address" />

            <!-- Apartment / Suite -->
            <LazyVInput
              type="text"
              v-model="form.apartment"
              placeholder="Apartment, suite, etc. (optional)"
            />

            <!-- City, State, ZIP -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <LazyVInput type="text" v-model="form.city" placeholder="City" />
              <LazyVInput
                type="select"
                v-model="form.state"
                placeholder="State"
                :options="stateOptions"
              />
              <LazyVInput type="text" v-model="form.zipCode" placeholder="ZIP Code" />
            </div>

            <!-- Phone -->
            <LazyVInput type="tel" v-model="form.phone" placeholder="Phone" />
          </div>

          <!-- Bottom Action Buttons -->
          <div
            class="pt-6 flex items-center justify-center gap-4"
          >
            <VButton size="lg" class="w-full sm:w-auto btn-lift">
              Continue to Payment
            </VButton>
          </div>
        </section>

        <!-- ==================== RIGHT COLUMN: ORDER SUMMARY ==================== -->
        <aside class="lg:col-span-5">
          <div
            class="p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-[#2A2E38] bg-white dark:bg-[#1A1D25] shadow-sm space-y-6"
          >
            <h2 class="text-lg font-extrabold tracking-tight">Order Summary</h2>

            <!-- Items List -->
            <div class="space-y-4 divide-y divide-neutral-100 dark:divide-[#2A2E38]">
              <div
                v-for="item in orderItems"
                :key="item.id"
                class="pt-4 first:pt-0 flex items-center justify-between gap-4"
              >
                <div class="flex items-center gap-4">
                  <!-- Thumbnail with Corner Badge -->
                  <div
                    class="relative w-16 h-16 thumb-frame"
                  >
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-full h-full object-cover object-center"
                    />
                    <span
                      class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-neutral-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm"
                    >
                      {{ item.quantity }}
                    </span>
                  </div>

                  <div>
                    <h3 class="text-sm font-semibold leading-snug line-clamp-1">
                      {{ item.title }}
                    </h3>
                    <p class="text-xs muted-text mt-0.5">
                      {{ item.variant }}
                    </p>
                  </div>
                </div>

                <div class="text-sm font-semibold text-[#11141B] dark:text-[#F0F1F4] shrink-0">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Discount Code Input -->
            <div class="flex gap-2 pt-2 items-start">
              <div class="flex-1">
                <LazyVInput
                  type="text"
                  size="sm"
                  v-model="discountCode"
                  placeholder="Discount code"
                />
              </div>
              <VButton
                variant="soft"
                color="neutral"
                size="sm"
                @click="applyDiscount"
              >
                Apply
              </VButton>
            </div>

            <!-- Pricing Breakdown -->
            <div
              class="space-y-2.5 pt-4 border-t border-neutral-100 dark:border-[#2A2E38] text-xs font-medium"
            >
              <div class="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                <span>Subtotal</span>
                <span class="text-[#11141B] dark:text-[#F0F1F4] font-semibold"
                  >${{ subtotal.toFixed(2) }}</span
                >
              </div>
              <div class="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                <span>Shipping</span>
                <span class="text-neutral-500 dark:text-neutral-400">Calculated next step</span>
              </div>
              <div class="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                <span>Estimated Taxes</span>
                <span class="text-[#11141B] dark:text-[#F0F1F4] font-semibold"
                  >${{ estimatedTaxes.toFixed(2) }}</span
                >
              </div>
            </div>

            <!-- Grand Total -->
            <div
              class="border-t divider-border pt-4 flex items-baseline justify-between"
            >
              <span class="text-base font-bold">Total</span>
              <div class="flex items-baseline gap-1.5">
                <span class="text-xs text-neutral-400 dark:text-neutral-500 font-medium">USD</span>
                <span
                  class="text-2xl font-black tracking-tight text-[#11141B] dark:text-[#F0F1F4]"
                >
                  ${{ total.toFixed(2) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Security Footer Guarantee -->
          <div
            class="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-neutral-400 dark:text-neutral-500"
          >
            <svg
              class="w-4 h-4 text-neutral-400 dark:text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <span>256-bit Secure Checkout</span>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { SelectOption } from "~/types/shared/VInput";

// --- Select Options ---
const countryOptions: SelectOption[] = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "GB" },
  { label: "United Arab Emirates", value: "AE" },
  { label: "Saudi Arabia", value: "SA" },
];

const stateOptions: SelectOption[] = [
  { label: "California", value: "CA" },
  { label: "New York", value: "NY" },
  { label: "Texas", value: "TX" },
  { label: "Florida", value: "FL" },
];

// --- Form State ---
const form = ref({
  email: "",
  newsletter: false,
  country: "US",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
});

// --- Discount Code State ---
const discountCode = ref("");
const isDiscountApplied = ref(false);

// --- Order Summary Data ---
const orderItems = ref([
  {
    id: 1,
    title: "Minimalist Coffee Dripper",
    variant: "Matte White",
    quantity: 1,
    price: 45.0,
    image: "/img/alloy-keyboard.jpg",
  },
  {
    id: 2,
    title: "Elevate Laptop Stand",
    variant: "Silver",
    quantity: 1,
    price: 89.0,
    image: "/img/ceramic-mug-set.jpg",
  },
]);

// --- Calculation Helpers ---
const subtotal = computed(() =>
  orderItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
);

const estimatedTaxes = 11.39;

const total = computed(() => subtotal.value + estimatedTaxes);

const applyDiscount = () => {
  if (discountCode.value.trim().length > 0) {
    isDiscountApplied.value = true;
  }
};
</script>
