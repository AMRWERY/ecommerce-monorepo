<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-16">
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 shadow-2xl">
      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
          <Icon name="lucide:book-open" class="w-4 h-4 text-emerald-400" />
          <span>Style Library</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Free Fashion eBooks &amp; Lookbooks
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          Download our exclusive editorial lookbooks, seasonal capsule wardrobes, and styling guides crafted by industry
          fashion directors.
        </p>
      </div>
    </div>

    <!-- eBooks Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="book in ebooks" :key="book.title"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all group">
        <div class="space-y-3">
          <div
            class="w-12 h-12 rounded-2xl bg-[#F0EEED] dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white group-hover:scale-110 transition-transform">
            <Icon :name="book.icon" class="w-6 h-6" />
          </div>
          <div class="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase">
            <span>{{ book.pages }} Pages</span>
            <span>•</span>
            <span>{{ book.format }}</span>
          </div>
          <h3 class="text-base font-bold text-black dark:text-white leading-snug">
            {{ book.title }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
            {{ book.description }}
          </p>
        </div>

        <button type="button" @click="handleDownload(book.title)"
          class="w-full py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 font-bold text-xs flex items-center justify-center gap-2 transition-opacity">
          <Icon name="lucide:download" class="w-4 h-4" />
          <span>Download Free Copy</span>
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
  { label: 'Free eBooks' },
])

const toast = useToast()

const ebooks = [
  {
    icon: 'lucide:sparkles',
    title: 'The Minimalist Wardrobe Capsule: 24 Core Pieces',
    description: 'Learn how to build over 60 versatile daily outfits using timeless monochrome staples and smart accessories.',
    pages: '38',
    format: 'PDF Guide',
  },
  {
    icon: 'lucide:flame',
    title: 'Contemporary Streetwear: Shapes, Drops & Layering',
    description: 'A deep dive into modern loose-fit silhouettes, graphic statement tees, and seasonal palette pairing.',
    pages: '52',
    format: 'Digital Lookbook',
  },
  {
    icon: 'lucide:shirt',
    title: 'Fabric Longevity: Washing, Ironing & Care Secrets',
    description: 'Master care techniques to keep heavyweight cotton, denim, and knitwear looking pristine year after year.',
    pages: '26',
    format: 'Reference Guide',
  },
]

const handleDownload = (title: string) => {
  toast.success(`Preparing "${title}" for download... Your PDF will open shortly.`, {
    title: 'Download Started',
    duration: 4000,
  })
}

useHead({
  title: 'Free eBooks & Guides — SHOP.CO',
  meta: [{ name: 'description', content: 'Download free streetwear style guides, capsule wardrobe lookbooks, and seasonal trends.' }],
})

</script>