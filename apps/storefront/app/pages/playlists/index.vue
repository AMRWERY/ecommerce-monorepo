<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-16">
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 shadow-2xl">
      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
          <Icon name="lucide:video" class="w-4 h-4 text-red-400" />
          <span>Video Lookbooks</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Curated Playlists &amp; Lookbooks
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          Watch high-definition fit sessions, styling tutorials, fabric walkthroughs, and campaign reels from SHOP.CO
          Studios.
        </p>
      </div>
    </div>

    <!-- Playlists Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="playlist in playlists" :key="playlist.title"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
        <div class="relative aspect-video bg-neutral-900 flex items-center justify-center overflow-hidden">
          <div
            class="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-red-600 transition-all">
            <Icon name="lucide:play" class="w-6 h-6 fill-current ps-0.5" />
          </div>
          <div
            class="absolute bottom-3 end-3 px-2 py-0.5 rounded-md bg-black/80 text-[11px] text-white font-mono font-semibold">
            {{ playlist.duration }}
          </div>
        </div>

        <div class="p-6 space-y-2 flex-1 flex flex-col justify-between">
          <div class="space-y-1">
            <div class="text-[11px] font-bold text-gray-400 uppercase">
              {{ playlist.episodes }} Episodes
            </div>
            <h3 class="text-base font-bold text-black dark:text-white leading-snug">
              {{ playlist.title }}
            </h3>
            <p class="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
              {{ playlist.description }}
            </p>
          </div>

          <div class="pt-4">
            <button type="button" @click="handleWatch(playlist.title)"
              class="w-full py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 font-bold text-xs flex items-center justify-center gap-2 transition-opacity">
              <Icon name="lucide:play" class="w-3.5 h-3.5 fill-current" />
              <span>Watch Playlist</span>
            </button>
          </div>
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
  { label: 'Playlists' },
])

const toast = useToast()

const playlists = [
  {
    title: 'Essential Outfits: 30-Day Fit Challenges',
    description: 'Weekly breakdowns pairing minimalist hoodies, pleated trousers, and casual jackets for varied weather.',
    episodes: '8',
    duration: '42:15',
  },
  {
    title: 'Fabric Deep-Dives: GSM, Weaves & Dyes',
    description: 'Understand the science of 400+ GSM French Terry cotton, loopback weaves, and color retention.',
    episodes: '5',
    duration: '28:40',
  },
  {
    title: 'Seasonal Runway & Streetwear Spotlights',
    description: 'Behind the scenes at our London & Tokyo campaign photoshoots with the creative director.',
    episodes: '12',
    duration: '1:14:00',
  },
]

const handleWatch = (title: string) => {
  toast.info(`Opening "${title}" video stream in theater mode.`, {
    title: 'Playing Video',
    duration: 3500,
  })
}

useHead({
  title: 'Video Playlists & Lookbooks — SHOP.CO',
  meta: [{ name: 'description', content: 'Watch styling video series, outfit breakdowns, and lookbooks from SHOP.CO.' }],
})
</script>