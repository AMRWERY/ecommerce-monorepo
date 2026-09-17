<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-16">
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 shadow-2xl">
      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
          <Icon name="lucide:newspaper" class="w-4 h-4 text-emerald-400" />
          <span>Editorial &amp; Style Journal</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          The SHOP.CO Style Journal
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          How-to guides, fashion essays, trend forecasts, and styling inspirations from our creative collective.
        </p>
      </div>
    </div>

    <!-- Category Filters -->
    <div class="flex flex-wrap gap-2">
      <button v-for="cat in categories" :key="cat" type="button" @click="selectedCategory = cat" :class="[
        'px-4 py-2 rounded-full text-xs font-bold transition-all',
        selectedCategory === cat
          ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
          : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700'
      ]">
        {{ cat }}
      </button>
    </div>

    <!-- Blog Articles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="post in filteredPosts" :key="post.title"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div class="p-6 sm:p-7 space-y-3">
          <div class="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase">
            <span>{{ post.category }}</span>
            <span>{{ post.date }}</span>
          </div>
          <h3 class="text-base sm:text-lg font-bold text-black dark:text-white leading-snug">
            {{ post.title }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
            {{ post.excerpt }}
          </p>
        </div>

        <div class="p-6 pt-0">
          <button type="button" @click="handleReadPost(post.title)"
            class="text-xs font-bold text-black dark:text-white hover:underline inline-flex items-center gap-1.5">
            <span>Read Guide</span>
            <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
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
  { label: 'Resources' },
  { label: 'Blog' },
])

const toast = useToast()

const categories = ['All Guides', 'Styling Tips', 'Care & Longevity', 'Trends']
const selectedCategory = ref('All Guides')

const posts = [
  {
    category: 'Styling Tips',
    date: 'Sep 14, 2026',
    title: 'How to Style Oversized Hoodies Without Looking Bulky',
    excerpt: 'Balance proportions by pairing dropped-shoulder heavyweight hoodies with tailored cargo trousers or clean slim denim.',
  },
  {
    category: 'Trends',
    date: 'Sep 09, 2026',
    title: 'Autumn Footwear & Denim Coordination: The 2026 Breakdown',
    excerpt: 'Which sneaker cuts pair best with straight-leg vs relaxed-taper jeans this upcoming transition season.',
  },
  {
    category: 'Care & Longevity',
    date: 'Aug 28, 2026',
    title: 'How to Prevent Dark Indigo Denim from Bleeding and Fading',
    excerpt: 'Cold water soaks, vinegar setting tricks, and why you should rarely machine dry raw or deep indigo jeans.',
  },
  {
    category: 'Styling Tips',
    date: 'Aug 19, 2026',
    title: 'Mastering The Monochrome Outfit: Texture Over Color',
    excerpt: 'When styling an all-black or all-cream silhouette, contrasting waffle knits, matte cotton, and leather creates depth.',
  },
]

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'All Guides') return posts
  return posts.filter((p) => p.category === selectedCategory.value)
})

const handleReadPost = (title: string) => {
  toast.info(`Opening "${title}" article.`, { title: 'Style Article' })
}

useSeoPage({
  title: 'Style Blog & How-To Guides',
  description: 'Explore how-to fashion guides, streetwear layering tips, and trend forecasts at SHOP.CO.',
})
</script>