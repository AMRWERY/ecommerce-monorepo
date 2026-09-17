<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-16">
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 shadow-2xl">
      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
          <Icon name="lucide:layers" class="w-4 h-4 text-blue-400" />
          <span>Platform Capabilities</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Engineered for an Effortless Shopping Experience
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          From AI-driven sizing guidance to lightning-fast checkout and automated delivery updates, explore the features
          that power SHOP.CO.
        </p>
      </div>
    </div>

    <!-- Feature Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="feat in platformFeatures" :key="feat.title"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all group">
        <div
          class="w-12 h-12 rounded-2xl bg-[#F0EEED] dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white group-hover:scale-110 transition-transform">
          <Icon :name="feat.icon" class="w-6 h-6" />
        </div>
        <h3 class="text-lg font-bold text-black dark:text-white">
          {{ feat.title }}
        </h3>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
          {{ feat.description }}
        </p>
      </div>
    </div>

    <!-- Interactive Feature Demonstration -->
    <div
      class="rounded-3xl border border-gray-200/80 dark:border-neutral-800 bg-white dark:bg-[#1A1D25] p-8 sm:p-12 space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <h3 class="text-xl sm:text-2xl font-black text-black dark:text-white">
            VIP Membership Rewards
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
            Earn 10 points for every $1 spent. Unlock early drops and free express shipping.
          </p>
        </div>
        <LazyVButton to="/auth/sign-up" variant="solid" color="dark" shape="pill" size="md"
          class="shrink-0 px-6 font-bold text-xs sm:text-sm">
          Join VIP Club
        </LazyVButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/types/shared/VBreadcrumb'

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Company' },
  { label: 'Features' },
])

const platformFeatures = [
  {
    icon: 'lucide:truck',
    title: 'Real-Time Parcel Tracking',
    description: 'Track your order from our fulfillment warehouse to your doorstep with live GPS checkpoints and instant SMS alerts.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Zero-Fraud 256-Bit SSL',
    description: 'Bank-grade encrypted tokenization protects every transaction via Apple Pay, Google Pay, Visa, and Mastercard.',
  },
  {
    icon: 'lucide:rotate-ccw',
    title: '30-Day Instant Exchanges',
    description: 'Wrong size? Generate prepaid return labels with a single click in your profile dashboard for instant size swaps.',
  },
  {
    icon: 'lucide:heart',
    title: 'Persistent Smart Wishlist',
    description: 'Save favorite outfits across devices with real-time stock alert pings whenever sold-out sizes restock.',
  },
  {
    icon: 'lucide:sparkles',
    title: 'Personalized Style Feeds',
    description: 'Our recommendation engine curates daily drops matching your color preferences, size fit, and past purchases.',
  },
  {
    icon: 'lucide:headphones',
    title: '24/7 Priority Support',
    description: 'Connect with dedicated fashion concierge specialists anytime via live chat or direct messaging.',
  },
]

useHead({
  title: 'Platform Features — SHOP.CO',
  meta: [{ name: 'description', content: 'Explore the modern e-commerce features powering the SHOP.CO fashion experience.' }],
})
</script>