<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-16">
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Section -->
    <div class="relative overflow-hidden rounded-3xl bg-black text-white p-8 sm:p-14 lg:p-20 shadow-2xl">
      <div class="absolute -top-20 -end-20 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
      <div class="relative z-10 max-w-2xl space-y-5">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
          <Icon name="lucide:sparkles" class="w-4 h-4 text-amber-400" />
          <span>Our Story &amp; Vision</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          We Find Clothes That Match Your Vibe
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
          Founded with a passion for contemporary street fashion and refined everyday aesthetics, SHOP.CO delivers premium apparel designed to express individuality with confidence.
        </p>
      </div>
    </div>

    <!-- Stat Highlights -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-2xl p-6 text-center space-y-1 shadow-xs transition-colors"
      >
        <div class="text-2xl sm:text-4xl font-black text-black dark:text-white font-mono">
          {{ stat.value }}
        </div>
        <div class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 font-medium">
          {{ stat.label }}
        </div>
      </div>
    </div>

    <!-- Core Values Grid -->
    <div class="space-y-6">
      <div class="text-center max-w-lg mx-auto space-y-2">
        <h2 class="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight">
          What Sets Us Apart
        </h2>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
          Built on principles of uncompromising quality, ethical craft, and modern minimalism.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="value in values"
          :key="value.title"
          class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all"
        >
          <div class="w-12 h-12 rounded-2xl bg-[#F0EEED] dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white">
            <Icon :name="value.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-black dark:text-white">
            {{ value.title }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
            {{ value.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Join The Movement CTA -->
    <div class="rounded-3xl bg-[#F0F0F0] dark:bg-[#1A1D25] p-8 sm:p-12 text-center space-y-6 border border-gray-200 dark:border-neutral-800">
      <h3 class="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight">
        Ready to upgrade your wardrobe?
      </h3>
      <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 max-w-md mx-auto">
        Explore handpicked collections created for those who value authenticity, style, and comfort.
      </p>
      <div class="flex items-center justify-center gap-4">
        <LazyVButton
          to="/products"
          variant="solid"
          color="dark"
          shape="pill"
          size="lg"
          class="px-8 font-bold text-sm"
        >
          Shop Latest Drops
        </LazyVButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/types/shared/VBreadcrumb'

useHead({
  title: 'About Us — SHOP.CO',
  meta: [{ name: 'description', content: 'Discover the story, mission, and craftsmanship behind SHOP.CO fashion.' }],
})

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Company' },
  { label: 'About Us' },
])

const stats = [
  { value: '200+', label: 'International Brands' },
  { value: '2,000+', label: 'High-Quality Products' },
  { value: '30,000+', label: 'Happy Customers' },
  { value: '99.4%', label: 'Positive Feedback' },
]

const values = [
  {
    icon: 'lucide:gem',
    title: 'Premium Quality Fabrics',
    description: 'Every piece is crafted from durable, breathable materials engineered to retain their shape and feel season after season.',
  },
  {
    icon: 'lucide:sparkles',
    title: 'Modern Minimalist Cuts',
    description: 'Our in-house design studio creates versatile staples that pair effortlessly with statement streetwear trends.',
  },
  {
    icon: 'lucide:leaf',
    title: 'Sustainable Initiatives',
    description: 'We prioritize eco-friendly packaging and ethical sourcing across our global manufacturing partners.',
  },
]
</script>
