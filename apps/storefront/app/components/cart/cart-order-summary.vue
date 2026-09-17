<template>
  <div
    class="border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] space-y-5">
    <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
      Order Summary
    </h2>

    <!-- Price Calculation Rows -->
    <div class="space-y-3.5 text-base sm:text-lg">
      <!-- Subtotal -->
      <div class="flex items-center justify-between">
        <span class="text-gray-500 dark:text-neutral-400 font-normal">Subtotal</span>
        <span class="font-bold text-black dark:text-white">${{ subtotal }}</span>
      </div>

      <!-- Discount -->
      <div class="flex items-center justify-between">
        <span class="text-gray-500 dark:text-neutral-400 font-normal">Discount (-{{ discountPercent }}%)</span>
        <span class="font-bold text-[#FF3333]">-${{ discountAmount }}</span>
      </div>

      <!-- Delivery Fee -->
      <div class="flex items-center justify-between">
        <span class="text-gray-500 dark:text-neutral-400 font-normal">Delivery Fee</span>
        <span class="font-bold text-black dark:text-white">${{ deliveryFee }}</span>
      </div>

      <!-- Divider line -->
      <div class="border-t border-gray-100 dark:border-neutral-800 pt-3.5">
        <div class="flex items-center justify-between">
          <span class="text-black dark:text-white font-medium">Total</span>
          <span class="text-xl sm:text-2xl font-black text-black dark:text-white">${{ total }}</span>
        </div>
      </div>
    </div>

    <!-- Promo Code Input & Apply Button -->
    <form @submit.prevent="handleApplyPromo" class="space-y-2 pt-2">
      <div class="flex items-center gap-3">
        <div class="relative flex-1">
          <Icon name="lucide:tag"
            class="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500" />
          <input v-model="inputPromo" type="text" placeholder="Add promo code"
            class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-xs sm:text-sm rounded-full ps-11 pe-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 placeholder:text-gray-400 dark:placeholder-neutral-500 transition-all" />
        </div>
        <LazyVButton type="submit" variant="solid" color="dark" shape="pill" size="md"
          class="shrink-0 px-6 sm:px-8 py-3" :loading="isApplyingPromo">
          Apply
        </LazyVButton>
      </div>

      <!-- Feedback Alert / Message -->
      <p v-if="promoFeedback"
        :class="['text-xs px-2', isPromoSuccess ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-red-500']">
        {{ promoFeedback }}
      </p>
    </form>

    <!-- Checkout Action Button using Shared LazyVButton -->
    <LazyVButton @click="$emit('checkout')" variant="solid" color="dark" shape="pill" size="lg" block
      class="w-full py-4 text-sm sm:text-base font-medium flex items-center justify-center gap-3 shadow-sm hover:shadow transition-all">
      <span>Go to Checkout</span>
      <Icon name="lucide:arrow-right" class="w-4 h-4" />
    </LazyVButton>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    subtotal: number
    discountAmount: number
    discountPercent: number
    deliveryFee: number
    total: number
    currentPromo?: string
  }>(),
  {
    currentPromo: '',
  }
)

const emit = defineEmits<{
  (e: 'applyPromo', code: string): void
  (e: 'checkout'): void
}>()

const inputPromo = ref(props.currentPromo)
const promoFeedback = ref('')
const isPromoSuccess = ref(true)
const isApplyingPromo = ref(false)

watch(
  () => props.currentPromo,
  (val) => {
    if (val) inputPromo.value = val
  }
)

const handleApplyPromo = async () => {
  if (!inputPromo.value.trim()) {
    promoFeedback.value = 'Please enter a promo code'
    isPromoSuccess.value = false
    return
  }

  isApplyingPromo.value = true
  await new Promise((resolve) => setTimeout(resolve, 600))
  isApplyingPromo.value = false

  emit('applyPromo', inputPromo.value.trim())
  promoFeedback.value = `Promo code "${inputPromo.value.trim().toUpperCase()}" applied!`
  isPromoSuccess.value = true
}
</script>