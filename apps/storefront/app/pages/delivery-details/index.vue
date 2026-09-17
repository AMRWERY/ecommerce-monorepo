<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-16">
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 shadow-2xl">
      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
          <Icon name="lucide:truck" class="w-4 h-4 text-emerald-400" />
          <span>Global Logistics</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Delivery Details &amp; Shipping Rates
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          Fast, reliable, and trackable shipping worldwide. Find delivery estimates and shipping policies below.
        </p>
      </div>
    </div>

    <!-- Live Tracking Box -->
    <div
      class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
          <Icon name="lucide:search" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-lg font-bold text-black dark:text-white">
            Track a Specific Shipment
          </h2>
          <p class="text-xs text-gray-500 dark:text-neutral-400">
            Enter your SHOP.CO order number or carrier tracking ID
          </p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Icon name="lucide:package" class="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input v-model="trackingId" type="text" placeholder="e.g. SHP-884920 or 9400100000000"
            class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl ps-11 pe-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all border border-transparent" />
        </div>
        <button type="button" @click="handleTrack"
          class="px-8 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shrink-0">
          Track Package
        </button>
      </div>
    </div>

    <!-- Shipping Speeds Table -->
    <div
      class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm overflow-hidden transition-colors">
      <h2 class="text-xl font-bold text-black dark:text-white">
        Shipping Methods &amp; Estimated Transit Times
      </h2>

      <div class="overflow-x-auto">
        <table class="w-full text-start text-xs sm:text-sm">
          <thead>
            <tr
              class="border-b border-gray-200 dark:border-neutral-800 text-gray-400 font-semibold uppercase text-[11px]">
              <th class="py-3 text-start">Delivery Option</th>
              <th class="py-3 text-start">Estimated Time</th>
              <th class="py-3 text-start">Orders Over $50</th>
              <th class="py-3 text-end">Standard Rate</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-neutral-800/60">
            <tr v-for="method in shippingMethods" :key="method.name">
              <td class="py-4 font-bold text-black dark:text-white">
                {{ method.name }}
              </td>
              <td class="py-4 text-gray-600 dark:text-neutral-300">
                {{ method.time }}
              </td>
              <td class="py-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                {{ method.over50 }}
              </td>
              <td class="py-4 text-end font-bold text-black dark:text-white">
                {{ method.rate }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- FAQ & Customs Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <h3 class="font-bold text-base text-black dark:text-white flex items-center gap-2">
          <Icon name="lucide:globe" class="w-5 h-5 text-black dark:text-white" />
          International Customs &amp; Duties
        </h3>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
          For shipments outside the United States, applicable duties and taxes are calculated and collected during
          checkout, ensuring zero unexpected fees on arrival.
        </p>
      </div>

      <div
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <h3 class="font-bold text-base text-black dark:text-white flex items-center gap-2">
          <Icon name="lucide:shield-alert" class="w-5 h-5 text-black dark:text-white" />
          Damage &amp; Loss Guarantee
        </h3>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
          Every parcel is insured. In the unlikely event that your package is delayed, damaged, or lost in transit, our
          concierge will issue an immediate replacement or full refund.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/types/shared/VBreadcrumb'

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Help' },
  { label: 'Delivery Details' },
])

const toast = useToast()
const trackingId = ref('')

const shippingMethods = [
  { name: 'Standard Delivery', time: '3 – 5 business days', over50: 'FREE', rate: '$15.00' },
  { name: 'Express Shipping', time: '1 – 2 business days', over50: '$9.99', rate: '$24.99' },
  { name: 'Same-Day Dispatch (Metro areas)', time: 'Within 24 hours', over50: '$19.99', rate: '$34.99' },
]

const handleTrack = () => {
  if (!trackingId.value.trim()) {
    toast.error('Please enter a tracking number or order ID to look up shipment status.', { title: 'Missing ID' })
    return
  }

  toast.info(`Checking live status for parcel ${trackingId.value}... Located at Central Hub (In Transit).`, {
    title: 'Shipment Located',
    duration: 5000,
  })
}

definePageMeta({
  alias: ['/delivery'],
})

useSeoPage({
  title: 'Delivery Details',
  description: 'Explore shipping methods, rates, and track your SHOP.CO packages in real time.',
})
</script>