<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
      <!-- Breadcrumb -->
      <LazyVBreadcrumb :items="breadcrumbs" />

      <!-- Page Title -->
      <h1
        class="text-3xl sm:text-4xl lg:text-[40px] font-black uppercase tracking-tight mb-6 sm:mb-8 text-black dark:text-white">
        Checkout
      </h1>

      <form @submit.prevent="handlePlaceOrder">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          <!-- ── LEFT: Checkout Form ─────────────────────────────────── -->
          <div class="lg:col-span-7 space-y-6">

            <!-- 1. Contact Details -->
            <section
              class="border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] space-y-4">
              <h2 class="text-lg sm:text-xl font-bold flex items-center gap-2 text-black dark:text-white">
                <span
                  class="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm flex items-center justify-center font-black shrink-0">1</span>
                Contact Details
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2 space-y-1.5">
                  <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Email Address <span
                      class="text-red-500">*</span></label>
                  <div class="relative">
                    <Icon name="lucide:mail"
                      class="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500 pointer-events-none" />
                    <input v-model="form.email" type="email" required placeholder="john@example.com"
                      class="input-field ps-icon" />
                  </div>
                </div>
                <div class="sm:col-span-2 space-y-1.5">
                  <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Phone Number <span
                      class="text-red-500">*</span></label>
                  <div class="relative">
                    <Icon name="lucide:phone"
                      class="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500 pointer-events-none" />
                    <input v-model="form.phone" type="tel" required placeholder="+1 (555) 000-0000"
                      class="input-field ps-icon" />
                  </div>
                </div>
              </div>
            </section>

            <!-- 2. Shipping Address -->
            <section
              class="border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] space-y-4">
              <h2 class="text-lg sm:text-xl font-bold flex items-center gap-2 text-black dark:text-white">
                <span
                  class="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm flex items-center justify-center font-black shrink-0">2</span>
                Shipping Address
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">First Name <span
                      class="text-red-500">*</span></label>
                  <input v-model="form.firstName" type="text" required placeholder="John" class="input-field" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Last Name <span
                      class="text-red-500">*</span></label>
                  <input v-model="form.lastName" type="text" required placeholder="Doe" class="input-field" />
                </div>
                <div class="sm:col-span-2 space-y-1.5">
                  <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Street Address <span
                      class="text-red-500">*</span></label>
                  <div class="relative">
                    <Icon name="lucide:map-pin"
                      class="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500 pointer-events-none" />
                    <input v-model="form.address" type="text" required placeholder="123 Fashion Street, Apt 4B"
                      class="input-field ps-icon" />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">City <span
                      class="text-red-500">*</span></label>
                  <input v-model="form.city" type="text" required placeholder="New York" class="input-field" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Postal Code <span
                      class="text-red-500">*</span></label>
                  <input v-model="form.postalCode" type="text" required placeholder="10001" class="input-field" />
                </div>
                <div class="sm:col-span-2 space-y-1.5">
                  <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Country <span
                      class="text-red-500">*</span></label>
                  <select v-model="form.country" required class="input-field appearance-none cursor-pointer">
                    <option value="US">United States</option>
                    <option value="EG">Egypt</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- 3. Delivery Method -->
            <section
              class="border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] space-y-4">
              <h2 class="text-lg sm:text-xl font-bold flex items-center gap-2 text-black dark:text-white">
                <span
                  class="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm flex items-center justify-center font-black shrink-0">3</span>
                Delivery Method
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label v-for="option in deliveryOptions" :key="option.id" :class="[
                  'relative flex flex-col gap-1.5 p-4 rounded-[14px] border-2 cursor-pointer transition-all duration-200 group',
                  form.deliveryMethod === option.id
                    ? 'border-black dark:border-white bg-black/5 dark:bg-white/5'
                    : 'border-gray-200 dark:border-neutral-700 hover:border-gray-400 dark:hover:border-neutral-500'
                ]">
                  <input type="radio" :value="option.id" v-model="form.deliveryMethod" class="sr-only" />
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <Icon :name="option.icon" class="w-5 h-5 text-black dark:text-white" />
                      <span class="font-bold text-sm text-black dark:text-white">{{ option.title }}</span>
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0">
                      <span class="font-bold text-sm text-black dark:text-white">${{ option.price }}</span>
                      <span v-if="form.deliveryMethod === option.id"
                        class="w-5 h-5 rounded-full bg-black dark:bg-white flex items-center justify-center shrink-0">
                        <Icon name="lucide:check" class="w-3 h-3 text-white dark:text-black stroke-[3]" />
                      </span>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-neutral-400 leading-snug">{{ option.description }}</p>
                  <p class="text-xs font-medium text-gray-700 dark:text-neutral-300">{{ option.estimatedDays }}</p>
                </label>
              </div>
            </section>

            <!-- 4. Payment Method -->
            <section
              class="border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] space-y-4">
              <h2 class="text-lg sm:text-xl font-bold flex items-center gap-2 text-black dark:text-white">
                <span
                  class="w-7 h-7 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm flex items-center justify-center font-black shrink-0">4</span>
                Payment Method
              </h2>

              <!-- Payment Method Selector Tabs -->
              <div class="flex gap-2 flex-wrap">
                <button v-for="pm in paymentMethods" :key="pm.id" type="button" @click="form.paymentMethod = pm.id"
                  :class="[
                    'flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200',
                    form.paymentMethod === pm.id
                      ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
                      : 'border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:border-gray-400 dark:hover:border-neutral-500'
                  ]">
                  <Icon :name="pm.icon" class="w-4 h-4" />
                  {{ pm.title }}
                </button>
              </div>

              <!-- Card Details Form -->
              <Transition enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
                <div v-if="form.paymentMethod === 'card'" class="space-y-4 pt-2">
                  <div class="space-y-1.5">
                    <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Cardholder Name
                      <span class="text-red-500">*</span></label>
                    <input v-model="form.cardHolder" type="text" :required="form.paymentMethod === 'card'"
                      placeholder="John Doe" class="input-field" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Card Number <span
                        class="text-red-500">*</span></label>
                    <div class="relative">
                      <Icon name="lucide:credit-card"
                        class="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500 pointer-events-none" />
                      <input v-model="form.cardNumber" type="text" :required="form.paymentMethod === 'card'"
                        placeholder="0000 0000 0000 0000" maxlength="19" @input="formatCardNumber"
                        class="input-field ps-icon font-mono tracking-widest" />
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Expiry Date
                        <span class="text-red-500">*</span></label>
                      <input v-model="form.expiry" type="text" :required="form.paymentMethod === 'card'"
                        placeholder="MM / YY" maxlength="7" @input="formatExpiry" class="input-field font-mono" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">CVV <span
                          class="text-red-500">*</span></label>
                      <div class="relative">
                        <input v-model="form.cvv" type="password" :required="form.paymentMethod === 'card'"
                          placeholder="•••" maxlength="4" class="input-field pe-icon font-mono" />
                        <Icon name="lucide:lock"
                          class="absolute end-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 dark:text-neutral-600 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <p class="text-xs text-gray-400 dark:text-neutral-500 flex items-center gap-1.5">
                    <Icon name="lucide:shield-check" class="w-3.5 h-3.5 text-emerald-500" />
                    Your payment is encrypted and secured with SSL.
                  </p>
                </div>
              </Transition>

              <!-- Cash on Delivery Note -->
              <Transition enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
                <div v-if="form.paymentMethod === 'cod'"
                  class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-[12px] p-4 flex gap-3">
                  <Icon name="lucide:banknote" class="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p class="font-semibold text-sm text-amber-800 dark:text-amber-300">Cash on Delivery</p>
                    <p class="text-xs text-amber-700 dark:text-amber-400 mt-0.5">Pay in cash when your order arrives.
                      Additional fees may apply depending on location.</p>
                  </div>
                </div>
              </Transition>

              <!-- Apple Pay Note -->
              <Transition enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
                <div v-if="form.paymentMethod === 'apple_pay'"
                  class="bg-gray-50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-[12px] p-4 flex gap-3">
                  <Icon name="lucide:smartphone" class="w-5 h-5 text-gray-700 dark:text-neutral-300 shrink-0 mt-0.5" />
                  <div>
                    <p class="font-semibold text-sm text-gray-800 dark:text-neutral-200">Apple Pay</p>
                    <p class="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">Complete payment securely using Apple
                      Pay on your device.</p>
                  </div>
                </div>
              </Transition>
            </section>
          </div>

          <!-- ── RIGHT: Order Preview ───────────────────────────────── -->
          <div class="lg:col-span-5 space-y-4 lg:sticky lg:top-6">
            <div
              class="border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] space-y-5">
              <h2 class="text-lg sm:text-xl font-bold text-black dark:text-white">Order Review</h2>

              <!-- Items Preview -->
              <div class="space-y-3 divide-y divide-gray-100 dark:divide-neutral-800">
                <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-3 pt-3 first:pt-0">
                  <div
                    class="w-14 h-14 rounded-[10px] bg-[#F0EEED] dark:bg-neutral-800 overflow-hidden flex items-center justify-center shrink-0">
                    <img :src="item.image" :alt="item.title"
                      class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm truncate text-black dark:text-white">{{ item.title }}</p>
                    <p class="text-xs text-gray-500 dark:text-neutral-400">{{ item.size }} · {{ item.color }}</p>
                  </div>
                  <div class="text-end shrink-0">
                    <p class="font-bold text-sm text-black dark:text-white">${{ item.price }}</p>
                    <p class="text-xs text-gray-400 dark:text-neutral-500">x{{ item.quantity }}</p>
                  </div>
                </div>
              </div>

              <!-- Cost Breakdown -->
              <div class="space-y-2.5 text-sm pt-2 border-t border-gray-100 dark:border-neutral-800">
                <div class="flex justify-between">
                  <span class="text-gray-500 dark:text-neutral-400">Subtotal</span>
                  <span class="font-semibold text-black dark:text-white">${{ cartStore.subtotal }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500 dark:text-neutral-400">Discount ({{ cartStore.discountPercent }}%)</span>
                  <span class="font-semibold text-[#FF3333]">-${{ cartStore.discountAmount }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500 dark:text-neutral-400">Delivery</span>
                  <span class="font-semibold text-black dark:text-white">${{ selectedDeliveryOption.price }}</span>
                </div>
                <div class="border-t border-gray-100 dark:border-neutral-800 pt-2.5 flex justify-between">
                  <span class="font-bold text-black dark:text-white">Total</span>
                  <span class="font-black text-lg text-black dark:text-white">${{ grandTotal }}</span>
                </div>
              </div>

              <!-- Place Order Button -->
              <LazyVButton type="submit" variant="solid" color="dark" shape="pill" size="lg" block :loading="isPlacing"
                :disabled="cartStore.items.length === 0"
                class="w-full py-4 font-bold text-sm sm:text-base flex items-center justify-center gap-2 mt-2">
                <Icon name="lucide:lock" class="w-4 h-4" />
                Place Order
              </LazyVButton>

              <p
                class="text-center text-xs text-gray-400 dark:text-neutral-500 flex items-center justify-center gap-1.5">
                <Icon name="lucide:shield" class="w-3.5 h-3.5 text-emerald-500" />
                256-bit SSL encryption
              </p>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@types/shared/VBreadcrumb'
import type { PlacedOrder } from '~/types/cart'

const localePath = useLocalePath()
const cartStore = useCartStore()

// Redirect back to cart if empty
onMounted(() => {
  if (cartStore.items.length === 0) {
    navigateTo(localePath('/cart'))
  }
})

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Cart', to: '/cart' },
  { label: 'Checkout' },
]

// Delivery Options
const deliveryOptions = [
  {
    id: 'standard' as const,
    title: 'Standard Delivery',
    description: 'Regular shipping to your doorstep.',
    price: 15,
    estimatedDays: '3–7 business days',
    icon: 'lucide:truck',
  },
  {
    id: 'express' as const,
    title: 'Express Delivery',
    description: 'Priority fulfillment and fast shipping.',
    price: 25,
    estimatedDays: '1–2 business days',
    icon: 'lucide:zap',
  },
]

// Payment Methods
const paymentMethods = [
  { id: 'card' as const, title: 'Card', icon: 'lucide:credit-card' },
  { id: 'cod' as const, title: 'Cash on Delivery', icon: 'lucide:banknote' },
  { id: 'apple_pay' as const, title: 'Apple Pay', icon: 'lucide:smartphone' },
]

// Form state
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'US',
  deliveryMethod: 'standard' as 'standard' | 'express',
  paymentMethod: 'card' as 'card' | 'cod' | 'apple_pay',
  cardHolder: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
})

const isPlacing = ref(false)

const selectedDeliveryOption = computed(() => {
  return deliveryOptions.find((o) => o.id === form.deliveryMethod) ?? deliveryOptions[0]!
})

const grandTotal = computed(() => {
  return cartStore.subtotal - cartStore.discountAmount + selectedDeliveryOption.value.price
})

// Input formatters
const formatCardNumber = () => {
  const raw = form.cardNumber.replace(/\D/g, '').slice(0, 16)
  form.cardNumber = raw.replace(/(\d{4})(?=\d)/g, '$1 ')
}

const formatExpiry = () => {
  const raw = form.expiry.replace(/\D/g, '').slice(0, 4)
  if (raw.length >= 3) {
    form.expiry = `${raw.slice(0, 2)} / ${raw.slice(2)}`
  } else {
    form.expiry = raw
  }
}

const generateOrderId = () => {
  return `ORD-${Math.floor(10000 + Math.random() * 90000)}`
}

const handlePlaceOrder = async () => {
  if (isPlacing.value) return
  isPlacing.value = true

  // Simulate an API call delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const orderNumber = generateOrderId()
  const deliveryOpt = selectedDeliveryOption.value

  const order: PlacedOrder = {
    orderId: orderNumber,
    orderNumber,
    createdAt: new Date().toISOString(),
    status: 'placed',
    items: [...cartStore.items],
    customer: {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
    },
    shipping: {
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
      country: form.country,
    },
    delivery: {
      method: form.deliveryMethod,
      title: deliveryOpt.title,
      price: deliveryOpt.price,
      estimatedDays: deliveryOpt.estimatedDays,
    },
    payment: {
      method: form.paymentMethod,
      cardLast4: form.paymentMethod === 'card' ? form.cardNumber.replace(/\s/g, '').slice(-4) : undefined,
      status: 'paid',
    },
    subtotal: cartStore.subtotal,
    discountAmount: cartStore.discountAmount,
    deliveryFee: deliveryOpt.price,
    total: grandTotal.value,
  }

  cartStore.createOrder(order)
  isPlacing.value = false
  navigateTo(localePath('/order-summary'))
}
</script>

<style scoped>
.input-field {
  @apply w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-[12px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 placeholder:text-gray-400 dark:placeholder-neutral-500 transition-all border border-transparent focus:border-black/10 dark:focus:border-white/10;
}

.input-field.ps-icon {
  padding-inline-start: 2.85rem !important;
}

.input-field.pe-icon {
  padding-inline-end: 2.85rem !important;
}
</style>
