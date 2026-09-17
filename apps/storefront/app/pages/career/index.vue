<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-16">
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 shadow-2xl">
      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
          <Icon name="lucide:briefcase" class="w-4 h-4 text-emerald-400" />
          <span>Join The Team</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Build The Future of Modern Fashion
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          We are a team of designers, engineers, creative directors, and supply chain innovators redefining fashion
          e-commerce. Explore open positions.
        </p>
      </div>
    </div>

    <!-- Company Perks -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="perk in perks" :key="perk.title"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 space-y-2 shadow-xs transition-colors">
        <div
          class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white">
          <Icon :name="perk.icon" class="w-5 h-5" />
        </div>
        <h3 class="font-bold text-sm text-black dark:text-white">
          {{ perk.title }}
        </h3>
        <p class="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
          {{ perk.description }}
        </p>
      </div>
    </div>

    <!-- Open Positions Section -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black text-black dark:text-white tracking-tight">
            Open Opportunities
          </h2>
          <p class="text-xs text-gray-500 dark:text-neutral-400">
            {{ jobs.length }} roles currently open across remote &amp; on-site locations.
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div v-for="job in jobs" :key="job.title"
          class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition-all">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="font-bold text-base sm:text-lg text-black dark:text-white">
                {{ job.title }}
              </h3>
              <span
                class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300">
                {{ job.department }}
              </span>
            </div>
            <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-neutral-400">
              <span class="flex items-center gap-1">
                <Icon name="lucide:map-pin" class="w-3.5 h-3.5" />
                {{ job.location }}
              </span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <Icon name="lucide:clock" class="w-3.5 h-3.5" />
                {{ job.type }}
              </span>
            </div>
          </div>

          <button type="button" @click="handleApply(job.title)"
            class="px-5 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 font-bold text-xs shrink-0 transition-opacity">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/types/shared/VBreadcrumb'

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Company' },
  { label: 'Careers' },
])

const toast = useToast()

const perks = [
  { icon: 'lucide:laptop', title: 'Remote-First Culture', description: 'Work from anywhere with flexible hours and modern home office stipends.' },
  { icon: 'lucide:heart-pulse', title: 'Comprehensive Health', description: 'Premium medical, dental, and vision insurance for you and your dependents.' },
  { icon: 'lucide:sparkles', title: 'Generous Clothing Allowance', description: 'Enjoy generous discounts and annual shopping credits across all collections.' },
]

const jobs = [
  { title: 'Senior Frontend Engineer (Vue/Nuxt)', department: 'Engineering', location: 'Remote (Worldwide)', type: 'Full-time' },
  { title: 'Streetwear Apparel Designer', department: 'Product & Design', location: 'New York, NY', type: 'Full-time' },
  { title: 'Global Supply Chain Manager', department: 'Operations', location: 'London, UK', type: 'Full-time' },
  { title: 'Social Media & Brand Strategist', department: 'Marketing', location: 'Remote / Los Angeles', type: 'Full-time' },
]

const handleApply = (role: string) => {
  toast.success(`Application form opened for ${role}. Please check your email for the application link.`, {
    title: 'Career Application',
    duration: 4000,
  })
}

useSeoPage({
  title: 'Careers',
  description: 'Explore open positions and join the passionate team at SHOP.CO.',
})
</script>