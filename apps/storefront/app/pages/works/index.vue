<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-16">
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 shadow-2xl">
      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
          <Icon name="lucide:workflow" class="w-4 h-4 text-emerald-400" />
          <span>Our Process</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          How SHOP.CO Works
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          From the initial sketch in our design studio to the moment you unbox your new favorite outfit, here is how we
          ensure world-class quality at every step.
        </p>
      </div>
    </div>

    <!-- Step by Step Timeline -->
    <div class="space-y-6">
      <div v-for="(step, index) in steps" :key="step.title"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-xs hover:shadow-md transition-all">
        <div
          class="w-14 h-14 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-black text-lg shrink-0">
          0{{ index + 1 }}
        </div>
        <div class="flex-1 space-y-1">
          <h3 class="text-lg sm:text-xl font-bold text-black dark:text-white">
            {{ step.title }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
            {{ step.description }}
          </p>
        </div>
        <div
          class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-500 dark:text-neutral-400 shrink-0">
          <Icon :name="step.icon" class="w-5 h-5" />
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div
      class="text-center bg-[#F0EEED] dark:bg-[#1A1D25] border border-gray-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-4">
      <h3 class="text-2xl font-black text-black dark:text-white">
        Experience the difference yourself
      </h3>
      <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 max-w-sm mx-auto">
        Join over 30,000 customers who trust SHOP.CO for their everyday and statement pieces.
      </p>
      <LazyVButton to="/products" variant="solid" color="dark" shape="pill" size="md" class="px-8 font-bold text-sm">
        Start Exploring
      </LazyVButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/types/shared/VBreadcrumb'

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Company' },
  { label: 'How Works' },
])

const steps = [
  {
    icon: 'lucide:pencil-ruler',
    title: 'Curated Design & Silhouette Concept',
    description: 'Our design team studies global streetwear cultures to draft versatile cuts, durable seam structures, and comfortable silhouettes.',
  },
  {
    icon: 'lucide:scissors',
    title: 'Ethical Fabric Sourcing & Weaving',
    description: 'We partner with certified textile mills utilizing sustainably harvested cotton, organic blends, and colorfast dye techniques.',
  },
  {
    icon: 'lucide:check-check',
    title: 'Strict Quality Control & Inspection',
    description: 'Each manufactured garment undergoes rigorous stitching stress tests, wash-shrinkage checks, and manual inspections before entering inventory.',
  },
  {
    icon: 'lucide:package-check',
    title: 'Eco-Friendly Fulfillment & Dispatch',
    description: 'Orders are packed in recyclable bio-based mailers with protective wrapping and dispatched via carbon-neutral global logistics.',
  },
]

useSeoPage({
  title: 'How It Works',
  description: 'Learn about the craftsmanship, production, and delivery process behind SHOP.CO fashion.',
})
</script>