<template>
  <div>
    <!-- Mobile Filter Drawer Backdrop -->
    <div
      v-if="isMobileOpen"
      @click="closeMobileFilter"
      class="fixed inset-0 bg-black/40 z-40 lg:hidden"
    ></div>

    <!-- Sidebar Filters (Desktop & Mobile Drawer) -->
    <aside
      :class="[
        'border border-gray-200 dark:border-neutral-800 rounded-[20px] p-5 sm:p-6 bg-white dark:bg-[#1A1D25] space-y-6',
        'fixed inset-y-0 left-0 z-50 w-full max-w-xs overflow-y-auto transition-transform duration-300 ease-in-out lg:relative lg:inset-auto lg:z-auto lg:w-auto lg:max-w-none lg:block lg:col-span-4 xl:col-span-3 lg:transform-none',
        isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-5">
        <h2 class="text-xl font-bold tracking-tight text-black dark:text-white">Filters</h2>
        <button
          @click="closeMobileFilter"
          class="text-gray-400 hover:text-black dark:hover:text-white p-1 lg:hidden"
          aria-label="Close Filter"
        >
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
        <Icon name="lucide:sliders-horizontal" class="w-4 h-4 text-gray-400 hidden lg:block" />
      </div>

      <!-- Category Links List -->
      <div class="space-y-3.5 text-sm border-b border-gray-100 dark:border-neutral-800 pb-5">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectCategory(cat)"
          :class="[
            'flex items-center justify-between w-full text-start transition-colors',
            selectedCategory === cat
              ? 'text-black dark:text-white font-bold'
              : 'text-gray-500 hover:text-black dark:hover:text-white'
          ]"
        >
          <span>{{ cat }}</span>
          <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <!-- Price Filter Accordion -->
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

        <div v-show="openSections.price" class="space-y-3 pt-2">
          <input
            type="range"
            v-model.number="currentPriceRange"
            min="50"
            max="300"
            step="5"
            class="w-full accent-black cursor-pointer h-1.5 bg-gray-200 dark:bg-neutral-700 rounded-lg appearance-none"
          />
          <div class="flex items-center justify-between text-xs sm:text-sm font-semibold text-black dark:text-white">
            <span>$50</span>
            <span class="text-gray-400 font-normal">
              Selected: <strong class="text-black dark:text-white">${{ currentPriceRange }}</strong>
            </span>
            <span>$300</span>
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
              'flex items-center justify-between w-full text-start transition-colors',
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

      <!-- Apply Filter Button -->
      <LazyVButton
        block
        size="md"
        shape="pill"
        class="py-3.5"
        @click="applyFilters"
      >
        Apply Filter
      </LazyVButton>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    isMobileOpen?: boolean
    selectedCategory?: string
    priceRange?: number
    selectedColor?: string
    selectedSize?: string
    dressStyle?: string
  }>(),
  {
    isMobileOpen: false,
    selectedCategory: '',
    priceRange: 300,
    selectedColor: '',
    selectedSize: '',
    dressStyle: '',
  }
)

const emit = defineEmits<{
  (e: 'update:isMobileOpen', val: boolean): void
  (e: 'update:selectedCategory', val: string): void
  (e: 'update:priceRange', val: number): void
  (e: 'update:selectedColor', val: string): void
  (e: 'update:selectedSize', val: string): void
  (e: 'update:dressStyle', val: string): void
  (e: 'apply'): void
}>()

const openSections = ref({
  price: true,
  colors: true,
  size: true,
  dressStyle: true,
})

const toggleSection = (section: keyof typeof openSections.value) => {
  openSections.value[section] = !openSections.value[section]
}

const currentPriceRange = computed({
  get: () => props.priceRange,
  set: (val: number) => emit('update:priceRange', val),
})

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

const closeMobileFilter = () => {
  emit('update:isMobileOpen', false)
}

const applyFilters = () => {
  emit('apply')
  closeMobileFilter()
}
</script>
