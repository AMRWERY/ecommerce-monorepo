<template>
  <section class="container-page py-10 text-[#11141B]">
    <!-- Breadcrumbs -->
    <nav
      class="flex items-center gap-2 text-xs text-neutral-400 mb-8 font-medium"
    >
      <a href="#" class="link-hover-brand">Home</a>
      <span>/</span>
      <a href="#" class="link-hover-brand"
        >Luxury Electronics</a
      >
      <span>/</span>
      <span class="text-[#11141B] font-semibold"
        >Ultra Titanium Smartwatch</span
      >
    </nav>

    <!-- ==================== PRODUCT HERO SECTION ==================== -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
      <!-- Product Media Gallery (Left in Desktop) -->
      <div class="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
        <!-- Vertical Thumbnails -->
        <div class="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
          <LazyVButton
            v-for="(img, idx) in images"
            :key="idx"
            variant="plain"
            shape="none"
            @click="activeImage = img"
            :class="[
              activeImage === img
                ? 'border-[#3373FF] ring-2 ring-[#3373FF]/20'
                : 'border-neutral-200 hover:border-neutral-400',
              'w-16 h-16 md:w-20 md:h-20 rounded-xl border overflow-hidden shrink-0 bg-neutral-50',
            ]"
          >
            <img
              :src="img"
              :alt="`Thumbnail ${idx + 1}`"
              class="w-full h-full object-cover object-center"
            />
          </LazyVButton>
        </div>

        <!-- Main Display Image -->
        <div
          class="relative flex-1 aspect-[4/5] rounded-2xl border border-neutral-200/80 bg-[#F6F7F9] overflow-hidden group"
        >
          <img
            :src="activeImage"
            alt="Ultra Titanium Smartwatch"
            class="img-zoom duration-500"
          />
          <LazyVButton
            variant="plain"
            shape="icon"
            class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-neutral-200/60 shadow-sm text-neutral-700 hover:text-[#3373FF] hover:scale-105"
            aria-label="Zoom Image"
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </LazyVButton>
        </div>
      </div>

      <!-- Product Configuration Details (Right in Desktop) -->
      <div class="lg:col-span-5 space-y-6">
        <!-- Header: Title & Wishlist -->
        <div class="flex items-start justify-between gap-4">
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ultra Titanium Smartwatch
          </h1>
          <LazyVButton
            variant="plain"
            shape="none"
            @click="isWishlisted = !isWishlisted"
            class="p-2 rounded-full border border-neutral-200 hover:border-neutral-300 shrink-0"
            aria-label="Save to Wishlist"
          >
            <svg
              class="w-5 h-5 transition-colors"
              :class="
                isWishlisted
                  ? 'fill-red-500 text-red-500'
                  : 'fill-none text-neutral-600'
              "
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </LazyVButton>
        </div>

        <!-- Rating & Price -->
        <div class="flex items-center gap-4">
          <div class="text-2xl font-bold text-[#3373FF] tracking-tight">
            $450.00
          </div>
          <div
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold"
          >
            <span class="text-amber-500">★</span>
            <span>4.8</span>
            <span class="text-neutral-400 font-normal">(124 reviews)</span>
          </div>
        </div>

        <!-- Short Description -->
        <p class="text-sm text-neutral-600 leading-relaxed">
          A contemporary design combining aerospace titanium elegance with
          high-performance power. Featuring an ultra-bright OLED display,
          precision health & fitness tracking sensors, and a battery lasting up
          to 7 days.
        </p>

        <!-- Color Swatch Selection -->
        <div class="space-y-3 pt-2">
          <div
            class="text-xs font-semibold uppercase tracking-wider text-neutral-500"
          >
            Color:
            <span class="text-[#11141B] capitalize">{{ selectedColor }}</span>
          </div>
          <div class="flex items-center gap-3">
            <LazyVButton
              variant="plain"
              shape="none"
              @click="selectedColor = 'midnight'"
              :class="[
                selectedColor === 'midnight'
                  ? 'ring-2 ring-[#3373FF] ring-offset-2'
                  : 'hover:scale-105',
                'w-8 h-8 rounded-full bg-[#11141B] border border-neutral-300',
              ]"
              aria-label="Midnight Black"
            />
            <LazyVButton
              variant="plain"
              shape="none"
              @click="selectedColor = 'silver'"
              :class="[
                selectedColor === 'silver'
                  ? 'ring-2 ring-[#3373FF] ring-offset-2'
                  : 'hover:scale-105',
                'w-8 h-8 rounded-full bg-[#E5E7EB] border border-neutral-300',
              ]"
              aria-label="Natural Silver"
            />
            <LazyVButton
              variant="plain"
              shape="none"
              @click="selectedColor = 'blue'"
              :class="[
                selectedColor === 'blue'
                  ? 'ring-2 ring-[#3373FF] ring-offset-2'
                  : 'hover:scale-105',
                'w-8 h-8 rounded-full bg-[#2563EB] border border-neutral-300',
              ]"
              aria-label="Deep Blue"
            />
          </div>
        </div>

        <!-- Size Options Selection -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between text-xs">
            <span
              class="font-semibold uppercase tracking-wider text-neutral-500"
              >Size</span
            >
            <a href="#" class="text-[#3373FF] font-semibold hover:underline"
              >Size Guide</a
            >
          </div>
          <div class="grid grid-cols-3 gap-3">
            <LazyVButton
              v-for="size in ['41mm', '45mm', '49mm (Ultra)']"
              :key="size"
              variant="plain"
              shape="none"
              @click="selectedSize = size"
              :class="[
                selectedSize === size
                  ? 'border-[#3373FF] bg-[#3373FF]/5 text-[#3373FF] font-semibold'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 bg-white',
                'py-2.5 px-3 rounded-xl border text-xs text-center',
              ]"
            >
              {{ size }}
            </LazyVButton>
          </div>
        </div>

        <!-- Quantity Stepper & Add to Cart Action -->
        <div class="flex items-center gap-4 pt-2">
          <div
            class="flex items-center border border-neutral-200 rounded-xl overflow-hidden bg-white"
          >
            <LazyVButton
              variant="plain"
              shape="none"
              @click="decrementQty"
              class="w-10 h-11 text-neutral-500 hover:bg-neutral-100 text-base"
            >
              –
            </LazyVButton>
            <span class="w-10 text-center text-sm font-semibold select-none">
              {{ quantity }}
            </span>
            <LazyVButton
              variant="plain"
              shape="none"
              @click="incrementQty"
              class="w-10 h-11 text-neutral-500 hover:bg-neutral-100 text-base"
            >
              +
            </LazyVButton>
          </div>

          <LazyVButton
            class="flex-1 h-11 btn-lift"
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Add to Cart
          </LazyVButton>
        </div>

        <!-- Direct Buy Button -->
        <LazyVButton color="dark" block>
          Buy Now
        </LazyVButton>

        <!-- Accordions -->
        <div class="border-t border-neutral-200 pt-4 space-y-3">
          <!-- Specs Accordion -->
          <div class="border-b border-neutral-100 pb-3">
            <LazyVButton
              variant="plain"
              shape="none"
              @click="toggleAccordion('specs')"
              class="w-full flex items-center justify-between py-2 text-sm font-semibold text-start"
            >
              <span>Details & Specifications</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="
                  openAccordion === 'specs'
                    ? 'rotate-180 text-[#3373FF]'
                    : 'text-neutral-400'
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </LazyVButton>
            <div
              v-show="openAccordion === 'specs'"
              class="pt-2 text-xs text-neutral-600 space-y-2"
            >
              <ul class="list-disc ps-4 space-y-1 leading-relaxed">
                <li>Aerospace-grade titanium lightweight chassis</li>
                <li>Water resistance rated up to 100 meters (WR100)</li>
                <li>
                  Always-On Retina OLED display reaching 2,000 nits peak
                  brightness
                </li>
                <li>Dual-frequency high-precision GPS positioning system</li>
              </ul>
            </div>
          </div>

          <!-- Shipping Accordion -->
          <div class="border-b border-neutral-100 pb-3">
            <LazyVButton
              variant="plain"
              shape="none"
              @click="toggleAccordion('shipping')"
              class="w-full flex items-center justify-between py-2 text-sm font-semibold text-start"
            >
              <span>Shipping & Delivery</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="
                  openAccordion === 'shipping'
                    ? 'rotate-180 text-[#3373FF]'
                    : 'text-neutral-400'
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </LazyVButton>
            <div
              v-show="openAccordion === 'shipping'"
              class="pt-2 text-xs text-neutral-600 leading-relaxed"
            >
              Complimentary express shipping on all orders over $100. Standard
              delivery in 2-4 business days with signature required upon
              receipt.
            </div>
          </div>

          <!-- Returns Accordion -->
          <div class="pb-1">
            <LazyVButton
              variant="plain"
              shape="none"
              @click="toggleAccordion('returns')"
              class="w-full flex items-center justify-between py-2 text-sm font-semibold text-start"
            >
              <span>Return Policy</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="
                  openAccordion === 'returns'
                    ? 'rotate-180 text-[#3373FF]'
                    : 'text-neutral-400'
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </LazyVButton>
            <div
              v-show="openAccordion === 'returns'"
              class="pt-2 text-xs text-neutral-600 leading-relaxed"
            >
              Enjoy hassle-free returns within 30 days of delivery. Items must
              be in pristine condition with original packaging and receipt.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== RECOMMENDATIONS CAROUSEL ==================== -->
    <lazy-recommendations-products />
  </section>
</template>

<script lang="ts" setup>
// --- Gallery State ---
const images = [
  "/img/watch-prod-01.jpg",
  "/img/watch-prod-02.jpg",
  "/img/watch-prod-03.jpg",
  "/img/watch-prod-04.jpg",
];
const activeImage = ref(images[0]);

// --- Product Config State ---
const isWishlisted = ref(false);
const selectedColor = ref<"midnight" | "silver" | "blue">("midnight");
const selectedSize = ref("45mm");
const quantity = ref(1);

// --- Accordions State ---
const openAccordion = ref<"specs" | "shipping" | "returns" | null>("specs");

const toggleAccordion = (section: "specs" | "shipping" | "returns") => {
  openAccordion.value = openAccordion.value === section ? null : section;
};

// --- Stepper Controls ---
const incrementQty = () => quantity.value++;
const decrementQty = () => {
  if (quantity.value > 1) quantity.value--;
};
</script>