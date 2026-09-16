<template>
    <section class="w-full bg-white py-14 sm:py-20 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header Row: Title & Navigation Arrows -->
            <div class="flex items-center justify-between mb-8 sm:mb-12">
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-black uppercase tracking-tight">
                    Our Happy Customers
                </h2>

                <!-- Arrow Controls -->
                <div class="flex items-center gap-3 shrink-0">
                    <!-- Previous Button -->
                    <button @click="scrollPrev" type="button"
                        class="p-2 text-black hover:text-gray-600 transition-colors focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                        :disabled="isAtStart" aria-label="Previous review">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>

                    <!-- Next Button -->
                    <button @click="scrollNext" type="button"
                        class="p-2 text-black hover:text-gray-600 transition-colors focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                        :disabled="isAtEnd" aria-label="Next review">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Carousel Scroll Track -->
            <div ref="carouselRef" @scroll="updateScrollState" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay"
                class="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <!-- Review Card -->
                <div v-for="review in reviews" :key="review.id"
                    class="snap-start shrink-0 w-[310px] sm:w-[380px] md:w-[400px] border border-gray-200/90 rounded-[20px] p-6 sm:p-8 bg-white flex flex-col justify-between transition-all duration-300 hover:border-gray-300">
                    <div>
                        <!-- Star Ratings -->
                        <div class="flex items-center gap-1.5 mb-3.5">
                            <svg v-for="star in 5" :key="star" class="w-5 h-5"
                                :class="star <= review.rating ? 'text-[#FFC633] fill-current' : 'text-gray-200 fill-current'"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>

                        <!-- Author & Verified Badge -->
                        <div class="flex items-center gap-1.5 mb-3">
                            <span class="text-lg sm:text-xl font-bold text-black tracking-tight">
                                {{ review.name }}
                            </span>

                            <!-- Green Checkmark Badge -->
                            <span v-if="review.verified"
                                class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#01AB31] text-white"
                                title="Verified Buyer">
                                <svg class="w-3 h-3 stroke-current stroke-[3]" fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                        </div>

                        <!-- Review Body -->
                        <p class="text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
                            "{{ review.comment }}"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
export interface CustomerReview {
    id: number | string
    name: string
    rating: number
    verified: boolean
    comment: string
}

// Carousel Reference & Scroll State
const carouselRef = ref<HTMLElement | null>(null)
const isAtStart = ref<boolean>(true)
const isAtEnd = ref<boolean>(false)
const currentIndex = ref<number>(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

// Dynamic Testimonials Data from screenshot
const reviews = ref<CustomerReview[]>([
    {
        id: 1,
        name: 'Sarah M.',
        rating: 5,
        verified: true,
        comment:
            "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
        id: 2,
        name: 'Alex K.',
        rating: 5,
        verified: true,
        comment:
            "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
        id: 3,
        name: 'James L.',
        rating: 5,
        verified: true,
        comment:
            "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
    {
        id: 4,
        name: 'Moody A.',
        rating: 5,
        verified: true,
        comment:
            'The fit of these clothes is simply amazing. Quick delivery and customer service that genuinely cares about your satisfaction!',
    },
    {
        id: 5,
        name: 'Emily R.',
        rating: 5,
        verified: true,
        comment:
            'Exceptional fabric quality! I was hesitant to order clothes online, but Shop.co has earned my trust completely.',
    },
])

// Scroll to a card by index
const scrollToIndex = (index: number, smooth = true): void => {
    if (!carouselRef.value) return
    const cards = carouselRef.value.querySelectorAll<HTMLElement>(':scope > div')
    if (!cards.length) return
    const card = cards[index]
    if (!card) return
    const gap = 24 // matches gap-6 (1.5rem)
    const offsetStart = card.offsetLeft - carouselRef.value.offsetLeft
    carouselRef.value.scrollTo({ left: offsetStart - gap, behavior: smooth ? 'smooth' : 'instant' })
}

// Carousel Controls
const scrollPrev = (): void => {
    currentIndex.value = currentIndex.value <= 0
        ? reviews.value.length - 1
        : currentIndex.value - 1
    scrollToIndex(currentIndex.value)
}

const scrollNext = (): void => {
    if (currentIndex.value >= reviews.value.length - 1) {
        // Jump to start instantly then animate from 0
        scrollToIndex(0, false)
        currentIndex.value = 0
    } else {
        currentIndex.value++
        scrollToIndex(currentIndex.value)
    }
}

const updateScrollState = (): void => {
    if (!carouselRef.value) return
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value
    isAtStart.value = scrollLeft <= 5
    isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 5
}

// Autoplay
const startAutoplay = (): void => {
    autoplayTimer = setInterval(() => {
        scrollNext()
    }, 3000)
}

const pauseAutoplay = (): void => {
    if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
    }
}

const resumeAutoplay = (): void => {
    pauseAutoplay()
    startAutoplay()
}

onMounted(() => {
    updateScrollState()
    startAutoplay()
})

onBeforeUnmount(() => {
    pauseAutoplay()
})
</script>

<style scoped>
/* Hide standard scrollbars while keeping smooth touch scroll */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>