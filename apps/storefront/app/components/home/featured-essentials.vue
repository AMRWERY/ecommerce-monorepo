<template>
  <div>
    <section class="container-page py-14 w-full">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xl md:text-2xl font-bold tracking-tight">
          featured Title
        </h2>
        <nuxt-link-locale to="#"
          class="text-sm font-semibold text-[#3373FF] hover:underline underline-offset-4"
        >
          see All
        </nuxt-link-locale>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="item in products"
          :key="item.id"
          class="surface-card hover-lift-card group flex flex-col"
        >
          <!-- Product Image Container -->
          <div
            class="w-full h-56 overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative"
          >
            <img
              :src="item.image"
              :alt="item.titleEn"
              class="img-zoom"
            />
          </div>

          <!-- Product Details -->
          <div class="p-5 flex flex-col flex-1 justify-between gap-3">
            <div>
              <h3
                class="font-semibold text-base tracking-tight title-hover-brand"
              >
                {{ isRtl ? item.titleAr : item.titleEn }}
              </h3>
              <p
                class="text-neutral-500 dark:text-[#F0F1F4]/60 text-xs mt-0.5"
              >
                {{ isRtl ? item.subtitleAr : item.subtitleEn }}
              </p>
            </div>
            <div class="text-lg font-bold text-[#3373FF]">
              ${{ item.price }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "~/types/home-page";

const { locale } = useI18n();

const isRtl = computed(() => locale.value === "ar");

const products: Product[] = [
  {
    id: 1,
    titleEn: "Classic Leather Wallet",
    titleAr: "محفظة جلدية كلاسيكية",
    subtitleEn: "Timeless everyday essential",
    subtitleAr: "قطعة أساسية يومية خالدة",
    price: 85,
    image: "/img/classic-leather-wallet.jpg",
  },
  {
    id: 2,
    titleEn: "Ceramic Mug Set",
    titleAr: "طقم أكواب سيراميك",
    subtitleEn: "Minimalist drinkware",
    subtitleAr: "أدوات شرب بطابع مينيمالي",
    price: 45,
    image: "/img/ceramic-mug-set.jpg",
  },
  {
    id: 3,
    titleEn: "Alloy Keyboard",
    titleAr: "لوحة مفاتيح ألمنيوم",
    subtitleEn: "Precision workspace tool",
    subtitleAr: "أداة مكتبية عالية الدقة",
    price: 150,
    image: "/img/alloy-keyboard.jpg",
  },
  {
    id: 4,
    titleEn: "Steel Flask",
    titleAr: "قارورة ستانلس ستيل",
    subtitleEn: "Sustainable hydration",
    subtitleAr: "ترطيب مستدام وأنيق",
    price: 35,
    image: "/img/steel-flask.jpg",
  },
];
</script>