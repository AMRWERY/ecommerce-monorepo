<template>
  <div :class="[!isMobileOpen && 'hidden lg:block']">
    <!-- Mobile Filter Drawer Backdrop (for smooth fade) -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileOpen"
        @click="closeMobileFilter"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      ></div>
    </Transition>

    <!-- Mobile: Full Screen sliding from bottom to the very top (100dvh) | Desktop: Normal Sidebar (lg:) -->
    <aside
      :class="[
        // Mobile: Full screen fixed modal from bottom to top; completely hidden on small screens if not open
        isMobileOpen
          ? 'fixed inset-0 z-50 h-[100dvh] w-full flex flex-col bg-white dark:bg-[#1A1D25] mobile-filter-animate-in'
          : 'hidden lg:block',
        isClosing && 'mobile-filter-animate-out',
        // Desktop: Normal in-grid sidebar
        'lg:relative lg:inset-auto lg:z-auto lg:h-auto lg:w-auto lg:max-w-none lg:block lg:translate-y-0 lg:border lg:border-gray-200 lg:dark:border-neutral-800 lg:rounded-[20px] lg:p-5 lg:sm:p-6 lg:space-y-6 lg:shadow-none'
      ]"
    >
      <!-- Header (Sticky on Mobile, standard on Desktop) -->
      <div
        class="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 p-5 sm:p-6 lg:p-0 lg:pb-5 shrink-0 bg-white dark:bg-[#1A1D25]"
      >
        <h2 class="text-xl font-bold tracking-tight text-black dark:text-white">Filters</h2>
        <button
          @click="closeMobileFilter"
          class="text-gray-400 hover:text-black dark:hover:text-white p-2 lg:hidden rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Close Filter"
        >
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
        <Icon name="lucide:sliders-horizontal" class="w-4 h-4 text-gray-400 hidden lg:block" />
      </div>

      <!-- Scrollable Filter Options (scrolls smoothly with hidden scrollbars) -->
      <div
        class="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-0 lg:overflow-visible space-y-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <!-- Category Links List -->
        <div class="space-y-3.5 text-sm border-b border-gray-100 dark:border-neutral-800 pb-5">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectCategory(cat)"
            :class="[
              'flex items-center justify-between w-full text-start transition-colors py-1',
              selectedCategory === cat
                ? 'text-black dark:text-white font-bold'
                : 'text-gray-500 hover:text-black dark:hover:text-white'
            ]"
          >
            <span>{{ cat }}</span>
            <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <!-- Price Filter Accordion with 2-Way Slider (2 Balls) -->
        <div class="border-b border-gray-100 dark:border-neutral-800 pb-6 space-y-4">
          <button
            @click="toggleSection('price')"
            class="flex items-center justify-between w-full font-bold text-base text-black dark:text-white"
          >
            <span>Price</span>
            <Icon
              :name="openSections.price ? 'lucide:chevron-up' : 'lucide:chevron-down'"
              class="w-4 h-4 text-gray-400"
            />
          </button>

          <div v-show="openSections.price" class="space-y-4 pt-2">
            <!-- 2-Ball Dual Range Slider -->
            <div class="relative w-full py-4">
              <!-- Background Track -->
              <div class="relative w-full h-1.5 bg-gray-200 dark:bg-neutral-700 rounded-full">
                <!-- Active Range Track -->
                <div
                  class="absolute h-full bg-black dark:bg-white rounded-full pointer-events-none transition-all duration-75"
                  :style="{
                    left: `${minPercentage}%`,
                    right: `${100 - maxPercentage}%`
                  }"
                ></div>
              </div>

              <!-- Left Ball / Min Price Thumb -->
              <input
                type="range"
                :min="minLimit"
                :max="maxLimit"
                :step="step"
                :value="currentMinPrice"
                @input="onMinInput"
                class="dual-range-input pointer-events-none absolute inset-x-0 top-4 w-full h-1.5 appearance-none bg-transparent focus:outline-none"
                aria-label="Minimum Price"
              />

              <!-- Right Ball / Max Price Thumb -->
              <input
                type="range"
                :min="minLimit"
                :max="maxLimit"
                :step="step"
                :value="currentMaxPrice"
                @input="onMaxInput"
                class="dual-range-input pointer-events-none absolute inset-x-0 top-4 w-full h-1.5 appearance-none bg-transparent focus:outline-none"
                aria-label="Maximum Price"
              />
            </div>

            <!-- Price Labels -->
            <div class="flex items-center justify-between text-xs sm:text-sm font-semibold text-black dark:text-white">
              <span>${{ currentMinPrice }}</span>
              <span>${{ currentMaxPrice }}</span>
            </div>
          </div>
        </div>

        <!-- Colors Filter Accordion -->
        <div class="border-b border-gray-100 dark:border-neutral-800 pb-6 space-y-4">
          <button
            @click="toggleSection('colors')"
            class="flex items-center justify-between w-full font-bold text-base text-black dark:text-white"
          >
            <span>Colors</span>
            <Icon
              :name="openSections.colors ? 'lucide:chevron-up' : 'lucide:chevron-down'"
              class="w-4 h-4 text-gray-400"
            />
          </button>

          <div v-show="openSections.colors" class="grid grid-cols-5 gap-3 pt-2">
            <button
              v-for="c in colorOptions"
              :key="c.hex"
              @click="selectColor(c.hex)"
              :style="{ backgroundColor: c.hex }"
              class="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200/60 dark:border-neutral-700 shadow-xs transition-transform transform active:scale-95"
              :title="c.name"
            >
              <Icon
                v-if="currentColor === c.hex"
                name="lucide:check"
                class="w-4 h-4"
                :class="c.hex === '#FFFFFF' ? 'text-black' : 'text-white'"
              />
            </button>
          </div>
        </div>

        <!-- Size Filter Accordion -->
        <div class="border-b border-gray-100 dark:border-neutral-800 pb-6 space-y-4">
          <button
            @click="toggleSection('size')"
            class="flex items-center justify-between w-full font-bold text-base text-black dark:text-white"
          >
            <span>Size</span>
            <Icon
              :name="openSections.size ? 'lucide:chevron-up' : 'lucide:chevron-down'"
              class="w-4 h-4 text-gray-400"
            />
          </button>

          <div v-show="openSections.size" class="flex flex-wrap gap-2 pt-2">
            <button
              v-for="size in sizeOptions"
              :key="size"
              @click="selectSize(size)"
              :class="[
                'px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all',
                currentSize === size
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-[#F0F0F0] dark:bg-neutral-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700'
              ]"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Dress Style Accordion -->
        <div class="space-y-4 border-b border-gray-100 dark:border-neutral-800 pb-6">
          <button
            @click="toggleSection('dressStyle')"
            class="flex items-center justify-between w-full font-bold text-base text-black dark:text-white"
          >
            <span>Dress Style</span>
            <Icon
              :name="openSections.dressStyle ? 'lucide:chevron-up' : 'lucide:chevron-down'"
              class="w-4 h-4 text-gray-400"
            />
          </button>

          <div v-show="openSections.dressStyle" class="space-y-3 text-sm pt-2">
            <button
              v-for="style in ['Casual', 'Formal', 'Party', 'Gym']"
              :key="style"
              @click="selectDressStyle(style)"
              :class="[
                'flex items-center justify-between w-full text-start transition-colors py-1',
                currentDressStyle === style
                  ? 'text-black dark:text-white font-bold'
                  : 'text-gray-500 hover:text-black dark:hover:text-white'
              ]"
            >
              <span>{{ style }}</span>
              <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <!-- Apply Filter Action (Sticky at bottom on Mobile, inline on Desktop) -->
      <div
        class="p-4 sm:p-6 lg:p-0 border-t border-gray-100 dark:border-neutral-800 lg:border-0 bg-white dark:bg-[#1A1D25] shrink-0"
      >
        <LazyVButton
          block
          size="md"
          shape="pill"
          class="py-3.5"
          @click="applyFilters"
        >
          Apply Filter
        </LazyVButton>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    isMobileOpen?: boolean
    selectedCategory?: string
    minPrice?: number
    maxPrice?: number
    selectedColor?: string
    selectedSize?: string
    dressStyle?: string
  }>(),
  {
    isMobileOpen: false,
    selectedCategory: '',
    minPrice: 50,
    maxPrice: 200,
    selectedColor: '',
    selectedSize: '',
    dressStyle: '',
  }
)

const emit = defineEmits<{
  (e: 'update:isMobileOpen', val: boolean): void
  (e: 'update:selectedCategory', val: string): void
  (e: 'update:minPrice', val: number): void
  (e: 'update:maxPrice', val: number): void
  (e: 'update:selectedColor', val: string): void
  (e: 'update:selectedSize', val: string): void
  (e: 'update:dressStyle', val: string): void
  (e: 'apply'): void
}>()

const minLimit = 50
const maxLimit = 300
const step = 5

const openSections = ref({
  price: true,
  colors: true,
  size: true,
  dressStyle: true,
})

const toggleSection = (section: keyof typeof openSections.value) => {
  openSections.value[section] = !openSections.value[section]
}

const currentMinPrice = computed({
  get: () => props.minPrice,
  set: (val: number) => emit('update:minPrice', val),
})

const currentMaxPrice = computed({
  get: () => props.maxPrice,
  set: (val: number) => emit('update:maxPrice', val),
})

const minPercentage = computed(() => {
  return Math.min(100, Math.max(0, ((currentMinPrice.value - minLimit) / (maxLimit - minLimit)) * 100))
})

const maxPercentage = computed(() => {
  return Math.min(100, Math.max(0, ((currentMaxPrice.value - minLimit) / (maxLimit - minLimit)) * 100))
})

const onMinInput = (e: Event) => {
  const val = Number((e.target as HTMLInputElement).value)
  if (val > currentMaxPrice.value - step) {
    currentMinPrice.value = currentMaxPrice.value - step
  } else {
    currentMinPrice.value = val
  }
}

const onMaxInput = (e: Event) => {
  const val = Number((e.target as HTMLInputElement).value)
  if (val < currentMinPrice.value + step) {
    currentMaxPrice.value = currentMinPrice.value + step
  } else {
    currentMaxPrice.value = val
  }
}

const currentColor = computed({
  get: () => props.selectedColor,
  set: (val: string) => emit('update:selectedColor', val),
})

const currentSize = computed({
  get: () => props.selectedSize,
  set: (val: string) => emit('update:selectedSize', val),
})

const currentDressStyle = computed({
  get: () => props.dressStyle,
  set: (val: string) => emit('update:dressStyle', val),
})

const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']

const colorOptions = [
  { name: 'Green', hex: '#00C12B' },
  { name: 'Red', hex: '#F50606' },
  { name: 'Yellow', hex: '#F5DD06' },
  { name: 'Orange', hex: '#F57906' },
  { name: 'Cyan', hex: '#06CAF5' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Purple', hex: '#7D06F5' },
  { name: 'Pink', hex: '#F506A4' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
]

const sizeOptions = [
  'XX-Small',
  'X-Small',
  'Small',
  'Medium',
  'Large',
  'X-Large',
  '3X-Large',
  '4X-Large',
]

const selectCategory = (cat: string) => {
  emit('update:selectedCategory', props.selectedCategory === cat ? '' : cat)
}

const selectColor = (hex: string) => {
  emit('update:selectedColor', props.selectedColor === hex ? '' : hex)
}

const selectSize = (size: string) => {
  emit('update:selectedSize', props.selectedSize === size ? '' : size)
}

const selectDressStyle = (style: string) => {
  emit('update:dressStyle', props.dressStyle === style ? '' : style)
}

const isClosing = ref(false)

const closeMobileFilter = () => {
  if (isClosing.value) return
  isClosing.value = true
  setTimeout(() => {
    emit('update:isMobileOpen', false)
    isClosing.value = false
  }, 220)
}

const applyFilters = () => {
  emit('apply')
  closeMobileFilter()
}

// Lock body scroll when mobile filter is open
if (import.meta.client) {
  watch(
    () => props.isMobileOpen,
    (open) => {
      if (!open) isClosing.value = false
      document.body.style.overflow = open ? 'hidden' : ''
    }
  )
}
</script>

<style scoped>
@keyframes slideUpFromBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideDownToBottom {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

@media (max-width: 1023px) {
  .mobile-filter-animate-in {
    animation: slideUpFromBottom 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .mobile-filter-animate-out {
    animation: slideDownToBottom 0.22s cubic-bezier(0.4, 0, 1, 1) forwards;
  }
}
.dual-range-input::-webkit-slider-thumb {
  pointer-events: auto;
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000000;
  border: 2.5px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  cursor: grab;
  position: relative;
  z-index: 20;
  transition: transform 0.15s ease;
}

.dual-range-input::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

.dual-range-input::-webkit-slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.2);
}

:global(.dark) .dual-range-input::-webkit-slider-thumb {
  background-color: #ffffff;
  border: 2.5px solid #1A1D25;
}

.dual-range-input::-moz-range-thumb {
  pointer-events: auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000000;
  border: 2.5px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  cursor: grab;
  position: relative;
  z-index: 20;
  transition: transform 0.15s ease;
}

.dual-range-input::-moz-range-thumb:hover {
  transform: scale(1.15);
}

.dual-range-input::-moz-range-thumb:active {
  cursor: grabbing;
  transform: scale(1.2);
}

:global(.dark) .dual-range-input::-moz-range-thumb {
  background-color: #ffffff;
  border: 2.5px solid #1A1D25;
}
</style>
