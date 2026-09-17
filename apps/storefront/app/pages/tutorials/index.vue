<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-16">
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 shadow-2xl">
      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
          <Icon name="lucide:code-2" class="w-4 h-4 text-blue-400" />
          <span>Developer Hub</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Development Tutorials &amp; API Docs
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          Learn how to integrate with the SHOP.CO headless monorepo, webhooks, cart APIs, and custom storefront
          extensions.
        </p>
      </div>
    </div>

    <!-- Tutorials List -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="tut in tutorials" :key="tut.title"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span
              class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300">
              {{ tut.tag }}
            </span>
            <span class="text-xs text-gray-400 font-medium">
              {{ tut.readTime }}
            </span>
          </div>
          <h3 class="text-lg font-bold text-black dark:text-white">
            {{ tut.title }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
            {{ tut.description }}
          </p>
        </div>

        <button type="button" @click="handleReadTutorial(tut.title)"
          class="w-full py-2.5 rounded-full border border-gray-300 dark:border-neutral-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-xs transition-all flex items-center justify-center gap-2">
          <span>Read Tutorial</span>
          <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/types/shared/VBreadcrumb'

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Resources' },
  { label: 'Development Tutorial' },
])

const toast = useToast()

const tutorials = [
  {
    tag: 'Nuxt 4 & Layers',
    title: 'Architecting Scalable Multi-Store E-Commerce with Nuxt Layers',
    description: 'Learn how our monorepo shares Tailwind themes, Pinia stores, and Vue components across multiple frontend apps.',
    readTime: '8 min read',
  },
  {
    tag: 'Webhooks & Nitro',
    title: 'Setting Up Stripe & Order Automation Webhooks',
    description: 'A step-by-step guide to verifying Stripe signatures, handling checkout sessions, and updating inventory atomically.',
    readTime: '12 min read',
  },
  {
    tag: 'Performance & SEO',
    title: 'Optimizing Core Web Vitals for Large Catalog E-Commerce',
    description: 'Techniques for image optimization, responsive picture tags, font subsetting, and dynamic meta pre-rendering.',
    readTime: '6 min read',
  },
  {
    tag: 'Tailwind & RTL',
    title: 'Internationalization: Building Flawless English & Arabic RTL Storefronts',
    description: 'How to combine Nuxt i18n with logical CSS utilities (start, end, ps-, pe-) for bilingual e-commerce.',
    readTime: '10 min read',
  },
]

const handleReadTutorial = (title: string) => {
  toast.info(`Opening developer guide: "${title}". Full documentation available in repo docs.`, {
    title: 'Dev Documentation',
    duration: 4000,
  })
}

useHead({
  title: 'Development Tutorials — SHOP.CO',
  meta: [{ name: 'description', content: 'Explore developer tutorials, Nuxt layer architecture, and e-commerce APIs for SHOP.CO.' }],
})
</script>