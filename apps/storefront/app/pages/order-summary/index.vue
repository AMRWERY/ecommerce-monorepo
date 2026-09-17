<template>
  <div class="min-h-screen bg-white dark:bg-[#12141A] text-black dark:text-white font-sans antialiased">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Breadcrumb -->
      <LazyVBreadcrumb :items="breadcrumbs" />

      <!-- No order state: redirect hint -->
      <div v-if="!order" class="text-center py-20 space-y-4">
        <div class="w-20 h-20 mx-auto rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
          <Icon name="lucide:package-search" class="w-10 h-10 text-gray-400" />
        </div>
        <h1 class="text-2xl font-bold text-black dark:text-white">No order found</h1>
        <p class="text-sm text-gray-500 dark:text-neutral-400">Place an order first to view your order summary.</p>
        <LazyVButton :to="localePath('/products')" variant="solid" color="dark" shape="pill" size="md" class="px-8 mt-2">
          Start Shopping
        </LazyVButton>
      </div>

      <template v-else>
        <!-- ── Success Header ─────────────────────────────────────── -->
        <div class="text-center mb-8 sm:mb-10 pt-4">
          <!-- Animated Success Badge -->
          <div class="relative inline-flex items-center justify-center mb-5">
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center success-pulse">
              <Icon name="lucide:check-circle-2" class="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 dark:text-emerald-400" />
            </div>
          </div>
          <div class="inline-flex items-center gap-2 bg-[#F0F0F0] dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 text-xs font-mono px-3.5 py-1.5 rounded-full mb-3">
            <Icon name="lucide:hash" class="w-3.5 h-3.5" />
            {{ order.orderNumber }}
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-black dark:text-white mb-2 tracking-tight">
            Order Confirmed! 🎉
          </h1>
          <p class="text-gray-500 dark:text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
            Thank you, <strong class="text-black dark:text-white">{{ order.customer.firstName }}</strong>! Your order has been received and is being prepared.
          </p>
          <p class="text-xs text-gray-400 dark:text-neutral-500 mt-2">
            A confirmation will be sent to <span class="font-medium text-black dark:text-white">{{ order.customer.email }}</span>
          </p>
        </div>

        <!-- ── Order Tracking Timeline ─────────────────────────────── -->
        <div class="border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] mb-6">
          <h2 class="text-base font-bold mb-5 text-black dark:text-white">Order Status</h2>
          <div class="relative flex items-start justify-between gap-2">
            <!-- Progress Line -->
            <div class="absolute top-4 start-0 end-0 h-0.5 bg-gray-200 dark:bg-neutral-700 mx-8">
              <div
                class="h-full bg-emerald-500 transition-all duration-700"
                :style="{ width: progressWidth }"
              />
            </div>

            <div
              v-for="(step, idx) in timelineSteps"
              :key="step.id"
              class="relative flex flex-col items-center gap-2 flex-1 z-10"
            >
              <!-- Step Indicator -->
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border-2',
                  step.status === 'done'
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : step.status === 'active'
                    ? 'bg-white dark:bg-[#1A1D25] border-emerald-500 text-emerald-500'
                    : 'bg-white dark:bg-[#1A1D25] border-gray-200 dark:border-neutral-700 text-gray-300 dark:text-neutral-600',
                ]"
              >
                <Icon :name="step.status === 'done' ? 'lucide:check' : step.icon" class="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <!-- Label -->
              <div class="text-center">
                <p
                  :class="[
                    'text-xs font-semibold',
                    step.status === 'done' || step.status === 'active'
                      ? 'text-black dark:text-white'
                      : 'text-gray-400 dark:text-neutral-600',
                  ]"
                >
                  {{ step.title }}
                </p>
                <p v-if="step.status === 'active'" class="text-[10px] text-emerald-500 mt-0.5">In Progress</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Order Details Grid ──────────────────────────────────── -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

          <!-- Ordered Items Card -->
          <div class="md:col-span-2 border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] space-y-4">
            <h2 class="text-base font-bold flex items-center gap-2 text-black dark:text-white">
              <Icon name="lucide:package" class="w-5 h-5 text-gray-400 dark:text-neutral-500" />
              Items Ordered ({{ order.items.length }})
            </h2>
            <div class="divide-y divide-gray-100 dark:divide-neutral-800 space-y-1">
              <div
                v-for="item in order.items"
                :key="item.id"
                class="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-[12px] bg-[#F0EEED] dark:bg-neutral-800 overflow-hidden flex items-center justify-center shrink-0">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-sm sm:text-base text-black dark:text-white truncate">{{ item.title }}</p>
                  <div class="flex flex-wrap gap-1.5 mt-1">
                    <span class="text-xs bg-[#F0F0F0] dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 px-2 py-0.5 rounded-full">{{ item.size }}</span>
                    <span class="text-xs bg-[#F0F0F0] dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 px-2 py-0.5 rounded-full">{{ item.color }}</span>
                    <span class="text-xs bg-[#F0F0F0] dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 px-2 py-0.5 rounded-full">Qty: {{ item.quantity }}</span>
                  </div>
                </div>
                <div class="text-end shrink-0">
                  <p class="font-bold text-base text-black dark:text-white">${{ item.price * item.quantity }}</p>
                  <p v-if="item.quantity > 1" class="text-xs text-gray-400 dark:text-neutral-500">${{ item.price }} each</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Shipping Details Card -->
          <div class="border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] space-y-4">
            <h2 class="text-base font-bold flex items-center gap-2 text-black dark:text-white">
              <Icon name="lucide:map-pin" class="w-5 h-5 text-gray-400 dark:text-neutral-500" />
              Shipping & Contact
            </h2>
            <div class="space-y-2 text-sm">
              <div class="flex gap-2">
                <Icon name="lucide:user" class="w-4 h-4 text-gray-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                <span class="text-black dark:text-white font-medium">{{ order.customer.firstName }} {{ order.customer.lastName }}</span>
              </div>
              <div class="flex gap-2">
                <Icon name="lucide:mail" class="w-4 h-4 text-gray-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                <span class="text-gray-600 dark:text-neutral-400">{{ order.customer.email }}</span>
              </div>
              <div class="flex gap-2">
                <Icon name="lucide:phone" class="w-4 h-4 text-gray-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                <span class="text-gray-600 dark:text-neutral-400">{{ order.customer.phone }}</span>
              </div>
              <div class="border-t border-gray-100 dark:border-neutral-800 pt-3 mt-3 space-y-1.5">
                <div class="flex gap-2 text-gray-600 dark:text-neutral-400">
                  <Icon name="lucide:home" class="w-4 h-4 text-gray-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                  <div>
                    <p>{{ order.shipping.address }}</p>
                    <p>{{ order.shipping.city }}, {{ order.shipping.postalCode }}</p>
                    <p>{{ order.shipping.country }}</p>
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-100 dark:border-neutral-800 pt-3 mt-3 flex gap-2">
                <Icon name="lucide:truck" class="w-4 h-4 text-gray-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-medium text-black dark:text-white">{{ order.delivery.title }}</p>
                  <p class="text-gray-500 dark:text-neutral-400 text-xs">{{ order.delivery.estimatedDays }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Details Card -->
          <div class="border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] space-y-4">
            <h2 class="text-base font-bold flex items-center gap-2 text-black dark:text-white">
              <Icon name="lucide:credit-card" class="w-5 h-5 text-gray-400 dark:text-neutral-500" />
              Payment Details
            </h2>
            <div class="space-y-3 text-sm">
              <!-- Payment Method -->
              <div class="flex items-center justify-between">
                <span class="text-gray-500 dark:text-neutral-400">Method</span>
                <span class="font-medium text-black dark:text-white flex items-center gap-1.5">
                  <Icon :name="paymentIcon" class="w-4 h-4 text-gray-400 dark:text-neutral-500" />
                  {{ paymentLabel }}
                </span>
              </div>
              <div v-if="order.payment.cardLast4" class="flex items-center justify-between">
                <span class="text-gray-500 dark:text-neutral-400">Card Number</span>
                <span class="font-mono font-medium text-black dark:text-white">•••• •••• •••• {{ order.payment.cardLast4 }}</span>
              </div>
              <!-- Payment Status -->
              <div class="flex items-center justify-between border-t border-gray-100 dark:border-neutral-800 pt-3">
                <span class="text-gray-500 dark:text-neutral-400">Status</span>
                <span class="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                  :class="order.payment.status === 'paid'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50'
                    : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'"
                >
                  <span class="w-1.5 h-1.5 rounded-full"
                    :class="order.payment.status === 'paid' ? 'bg-emerald-500' : 'bg-amber-500'"
                  />
                  {{ order.payment.status === 'paid' ? 'Paid' : 'Pending' }}
                </span>
              </div>
            </div>

            <!-- Cost Breakdown -->
            <div class="border-t border-gray-100 dark:border-neutral-800 pt-4 space-y-2.5 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500 dark:text-neutral-400">Subtotal</span>
                <span class="text-black dark:text-white">${{ order.subtotal }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500 dark:text-neutral-400">Discount</span>
                <span class="text-[#FF3333]">-${{ order.discountAmount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500 dark:text-neutral-400">Delivery</span>
                <span class="text-black dark:text-white">${{ order.deliveryFee }}</span>
              </div>
              <div class="border-t border-gray-100 dark:border-neutral-800 pt-2.5 flex justify-between">
                <span class="font-black text-black dark:text-white">Total Paid</span>
                <span class="font-black text-lg text-black dark:text-white">${{ order.total }}</span>
              </div>
            </div>
          </div>

        </div>

        <!-- ── CTA Buttons ──────────────────────────────────────────── -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <LazyVButton
            :to="localePath('/products')"
            variant="outline"
            color="dark"
            shape="pill"
            size="lg"
            class="px-8"
          >
            <Icon name="lucide:shopping-bag" class="w-4 h-4" />
            Continue Shopping
          </LazyVButton>
          <LazyVButton
            @click="printReceipt"
            variant="solid"
            color="dark"
            shape="pill"
            size="lg"
            class="px-8"
          >
            <Icon name="lucide:printer" class="w-4 h-4" />
            Print Receipt
          </LazyVButton>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@types/shared/VBreadcrumb'
import type { PlacedOrder } from '~/types/cart'

const localePath = useLocalePath()
const cartStore = useCartStore()

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', to: localePath('/') },
  { label: 'Cart', to: localePath('/cart') },
  { label: 'Order Summary' },
]

// Load order: from store, or from localStorage on refresh
const order = computed<PlacedOrder | null>(() => {
  if (cartStore.currentOrder) return cartStore.currentOrder
  if (import.meta.client) {
    try {
      const saved = localStorage.getItem('shopco_last_order')
      if (saved) return JSON.parse(saved) as PlacedOrder
    } catch {
      return null
    }
  }
  return null
})

// Order Tracking Timeline
const timelineSteps = computed(() => {
  const STATUS_ORDER = ['placed', 'processing', 'shipped', 'delivered']
  const currentIdx = STATUS_ORDER.indexOf(order.value?.status ?? 'placed')
  return [
    { id: 'placed', title: 'Order Placed', icon: 'lucide:clipboard-check' },
    { id: 'processing', title: 'Processing', icon: 'lucide:settings-2' },
    { id: 'shipped', title: 'Shipped', icon: 'lucide:truck' },
    { id: 'delivered', title: 'Delivered', icon: 'lucide:package-check' },
  ].map((step, idx) => ({
    ...step,
    status: idx < currentIdx ? 'done' : idx === currentIdx ? 'active' : 'upcoming',
  }))
})

const progressWidth = computed(() => {
  const activeIdx = timelineSteps.value.findIndex((s) => s.status === 'active')
  const total = timelineSteps.value.length - 1
  return activeIdx > 0 ? `${(activeIdx / total) * 100}%` : '0%'
})

// Payment labels & icons
const paymentIcon = computed(() => {
  const map: Record<string, string> = {
    card: 'lucide:credit-card',
    cod: 'lucide:banknote',
    apple_pay: 'lucide:smartphone',
  }
  return map[order.value?.payment.method ?? 'card'] ?? 'lucide:credit-card'
})

const paymentLabel = computed(() => {
  const map: Record<string, string> = {
    card: 'Credit / Debit Card',
    cod: 'Cash on Delivery',
    apple_pay: 'Apple Pay',
  }
  return map[order.value?.payment.method ?? 'card'] ?? 'Card'
})

const printReceipt = () => {
  if (import.meta.client) {
    window.print()
  }
}
</script>

<style scoped>
@keyframes successPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { transform: scale(1.04); box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
}

.success-pulse {
  animation: successPulse 2s ease-in-out 2;
}

@media print {
  .no-print { display: none !important; }
}
</style>
