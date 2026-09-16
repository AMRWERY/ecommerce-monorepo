<template>
    <section class="w-full py-10 sm:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Outer Card Container -->
            <div class="bg-[#F0F0F0] rounded-[32px] sm:rounded-[40px] px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-20">
                <!-- Section Heading -->
                <h2
                    class="text-3xl sm:text-4xl lg:text-5xl font-black text-center text-black uppercase tracking-tight mb-8 sm:mb-14">
                    Browse by dress style
                </h2>

                <!-- Asymmetric Category Grid -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                    <nuxt-link-locale v-for="style in dressStyles" :key="style.id" :to="style.route"
                        :class="style.gridSpan"
                        class="group relative h-48 sm:h-64 md:h-72 bg-white rounded-[20px] overflow-hidden p-6 sm:p-8 flex transition-all duration-300 hover:shadow-md cursor-pointer">
                        <!-- Title (Top-Left) -->
                        <span class="text-2xl sm:text-3xl lg:text-4xl font-bold text-black z-10 select-none">
                            {{ style.name }}
                        </span>

                        <!-- Background / Side Image -->
                        <img :src="style.image" :alt="style.name"
                            class="absolute end-0 top-0 bottom-0 h-full w-3/4 sm:w-2/3 md:w-3/5 object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none pointer-events-none"
                            loading="lazy" />
                    </nuxt-link-locale>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { DressStyle } from '@/types/home/dress-style-section'

// Dynamic Dress Styles Data (Asymmetric alternating grid)
const dressStyles = ref<DressStyle[]>([
    {
        id: 'casual',
        name: 'Casual',
        route: '#',
        image: '/img/dress-style-01.png',
        // Row 1: Left - Narrower
        gridSpan: 'col-span-1 md:col-span-5',
    },
    {
        id: 'formal',
        name: 'Formal',
        route: '#',
        image: '/img/dress-style-02.png',
        // Row 1: Right - Wider
        gridSpan: 'col-span-1 md:col-span-7',
    },
    {
        id: 'party',
        name: 'Party',
        route: '#',
        image: '/img/dress-style-03.png',
        // Row 2: Left - Wider
        gridSpan: 'col-span-1 md:col-span-7',
    },
    {
        id: 'gym',
        name: 'Gym',
        route: '#',
        image: '/img/dress-style-04.png',
        // Row 2: Right - Narrower
        gridSpan: 'col-span-1 md:col-span-5',
    },
])
</script>