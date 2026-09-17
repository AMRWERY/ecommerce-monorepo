<template>
    <section class="w-full bg-[#F2F0F1] overflow-hidden">
        <!-- Hero Main Container -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-20">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                <!-- Left Column: Content -->
                <div class="lg:col-span-7 z-10 space-y-6 sm:space-y-8">
                    <!-- Main Heading -->
                    <h1
                        class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-black leading-[1.08] uppercase">
                        Find Clothes<br />
                        That Matches<br />
                        Your Style
                    </h1>

                    <!-- Subtitle Description -->
                    <p class="text-gray-600 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
                        Browse through our diverse range of meticulously crafted garments, designed
                        to bring out your individuality and cater to your sense of style.
                    </p>

                    <!-- Shop Now CTA Button -->
                    <div>
                        <LazyVButton to="/products" size="lg" shape="pill" class="w-full sm:w-auto px-14 py-4 text-base">
                            Shop Now
                        </LazyVButton>
                    </div>

                    <!-- Statistics Section -->
                    <div
                        class="py-6 sm:py-10 flex flex-wrap items-center justify-center lg:justify-start gap-y-4 sm:gap-y-6">
                        <!-- Stat 1 and Stat 2 -->
                        <div class="flex items-center justify-center gap-6 sm:gap-8 md:gap-10">
                            <div>
                                <span
                                    class="block text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">200+</span>
                                <span
                                    class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 font-normal">International
                                    Brands</span>
                            </div>

                            <div class="w-px h-12 bg-gray-300 dark:bg-neutral-700"></div>

                            <div>
                                <span
                                    class="block text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">2,000+</span>
                                <span
                                    class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 font-normal">High-Quality
                                    Products</span>
                            </div>
                        </div>

                        <!-- Divider between Stat 2 and Stat 3 (only on large screens) -->
                        <div class="w-px h-12 bg-gray-300 dark:bg-neutral-700 hidden lg:block mx-6 xl:mx-8"></div>

                        <!-- Stat 3 (full-width centered on < lg, inline on lg) -->
                        <div class="w-full lg:w-auto text-center lg:text-start">
                            <span
                                class="block text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">30,000+</span>
                            <span class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 font-normal">Happy
                                Customers</span>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Hero Visual with Sparkle Stars -->
                <div class="lg:col-span-5 relative flex justify-center lg:justify-end mt-6 lg:mt-0">
                    <!-- Small Star Vector (Left / Mid) -->
                    <div class="absolute start-2 sm:start-6 top-1/2 -translate-y-12 z-20 animate-pulse">
                        <svg class="w-10 h-10 sm:w-14 sm:h-14 text-black fill-current" viewBox="0 0 100 100">
                            <path
                                d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 50 72.4 50 100 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0 Z" />
                        </svg>
                    </div>

                    <!-- Large Star Vector (Top Right) -->
                    <div class="absolute end-0 sm:end-4 top-4 sm:top-2 z-20 animate-pulse">
                        <svg class="w-16 h-16 sm:w-24 sm:h-24 text-black fill-current" viewBox="0 0 100 100">
                            <path
                                d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 50 72.4 50 100 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0 Z" />
                        </svg>
                    </div>

                    <!-- Hero Image -->
                    <div class="relative w-full max-w-md lg:max-w-none flex items-end">
                        <img :src="heroImage" alt="Fashion Couple Models"
                            class="w-full h-auto object-cover object-bottom select-none pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Animated Brands Banner Strip -->
        <div class="bg-black py-8 sm:py-10 overflow-hidden relative">
            <!-- Infinite Marquee Track -->
            <div class="marquee-track flex items-center whitespace-nowrap">
                <!-- Render 2 duplicated loops for seamless infinite scrolling -->
                <div v-for="loopIndex in 2" :key="loopIndex"
                    class="flex items-center gap-12 sm:gap-20 md:gap-28 shrink-0 px-6 sm:px-10">
                    <span v-for="brand in brandList" :key="brand.name" :class="brand.customClass"
                        class="text-white hover:text-gray-300 transition-colors select-none cursor-pointer">
                        {{ brand.name }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { Brand } from "@/types/home/hero-section";

// Transparent cutout fashion image
const heroImage = ref<string>(
    '/img/hero-section.png'
)

// Brand logo list with customized font typography styles
const brandList = ref<Brand[]>([
    { name: 'VERSACE', customClass: 'font-serif text-2xl sm:text-3xl lg:text-4xl tracking-widest font-bold' },
    { name: 'ZARA', customClass: 'font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter' },
    { name: 'GUCCI', customClass: 'font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] font-medium' },
    { name: 'PRADA', customClass: 'font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wider' },
    { name: 'Calvin Klein', customClass: 'font-sans text-xl sm:text-2xl lg:text-3xl font-light tracking-wide' },
])
</script>

<style scoped>
/* Infinite marquee horizontal scrolling animation */
.marquee-track {
    display: flex;
    width: max-content;
    animation: scrollMarquee 25s linear infinite;
}

/* Pause marquee when user hovers */
.marquee-track:hover {
    animation-play-state: paused;
}

@keyframes scrollMarquee {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}
</style>