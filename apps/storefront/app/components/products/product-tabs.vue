<template>
  <section class="mt-16 sm:mt-20">
    <!-- Tabs Navigation -->
    <div class="flex border-b border-gray-200 text-center">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
        'flex-1 pb-4 sm:pb-5 text-sm sm:text-lg font-medium transition-colors relative',
        activeTab === tab.id ? 'text-black font-semibold' : 'text-gray-400 hover:text-gray-700'
      ]">
        {{ tab.label }}
        <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
      </button>
    </div>

    <!-- Rating & Reviews Tab Content -->
    <div v-if="activeTab === 'reviews'" class="py-8 sm:py-10">
      <!-- Reviews Control Bar -->
      <div class="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <div class="flex items-center gap-2">
          <h2 class="text-xl sm:text-2xl font-bold tracking-tight">All Reviews</h2>
          <span class="text-sm text-gray-500 font-normal">({{ reviews.length }})</span>
        </div>

        <div class="flex items-center gap-2.5">
          <!-- Filter icon button -->
          <LazyVButton variant="soft" color="neutral" shape="icon" size="md" aria-label="Filter">
            <Icon name="lucide:sliders-horizontal" class="w-4 h-4 text-black dark:text-white" />
          </LazyVButton>

          <!-- Sorting Dropdown -->
          <div class="relative hidden sm:block">
            <button
              class="flex items-center gap-3 bg-[#F0F0F0] hover:bg-gray-200 px-4 py-3 rounded-full text-sm font-medium transition-colors">
              <span>Latest</span>
              <Icon name="lucide:chevron-down" class="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <!-- Write Review Button -->
          <LazyVButton size="md" shape="pill" class="text-xs sm:text-sm px-4 sm:px-6 py-3">
            Write a Review
          </LazyVButton>
        </div>
      </div>

      <!-- Reviews Grid (2 Columns) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div v-for="review in reviews" :key="review.id"
          class="border border-gray-200/90 rounded-[20px] p-6 sm:p-7 bg-white flex flex-col justify-between">
          <div>
            <!-- Top row: Star rating + 3 dots menu -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center text-[#FFC633]">
                <Icon v-for="s in review.rating" :key="s" name="lucide:star" class="w-4 h-4 fill-current" />
              </div>
              <button class="text-gray-400 hover:text-black" aria-label="Options">
                <Icon name="lucide:ellipsis" class="w-5 h-5" />
              </button>
            </div>

            <!-- Reviewer name + Verified badge -->
            <div class="flex items-center gap-1.5 mb-2.5">
              <span class="font-bold text-base sm:text-lg text-black">{{ review.name }}</span>
              <span class="inline-flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#01AB31] text-white">
                <Icon name="lucide:check" class="w-3 h-3 stroke-[3]" />
              </span>
            </div>

            <!-- Review content -->
            <p class="text-gray-500 text-sm sm:text-base leading-relaxed font-normal">
              "{{ review.comment }}"
            </p>
          </div>

          <!-- Timestamp -->
          <div class="mt-4 pt-2 text-xs sm:text-sm text-gray-400 font-normal">
            Posted on {{ review.date }}
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="mt-9 text-center">
        <LazyVButton variant="outline" color="neutral" shape="pill" size="md" class="px-10 py-3.5 text-xs sm:text-sm">
          Load More Reviews
        </LazyVButton>
      </div>
    </div>

    <!-- Details & FAQs Placeholders -->
    <div v-else class="py-12 text-center text-gray-400 text-sm">
      Content for {{ activeTab }} section will appear here.
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Review } from '@/types/products'

withDefaults(
  defineProps<{
    reviews?: Review[]
  }>(),
  {
    reviews: () => [],
  }
)

const activeTab = ref<'details' | 'reviews' | 'faqs'>('reviews')

const tabs = [
  { id: 'details', label: 'Product Details' },
  { id: 'reviews', label: 'Rating & Reviews' },
  { id: 'faqs', label: 'FAQs' },
]
</script>