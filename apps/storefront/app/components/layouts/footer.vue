<template>
    <footer class="relative bg-[#F0F0F0] text-gray-600 mt-28 sm:mt-36">
        <!-- Floating Newsletter Card (Overlapping top section) -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
                class="relative -top-20 sm:-top-24 bg-black rounded-[20px] px-6 py-8 sm:px-12 sm:py-10 md:py-12 shadow-lg">
                <div class="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">

                    <!-- Newsletter Title -->
                    <h2
                        class="text-white text-3xl sm:text-4xl lg:text-[40px] font-black uppercase tracking-tight leading-tight max-w-xl text-start">
                        Stay upto date about our latest offers
                    </h2>

                    <!-- Newsletter Form -->
                    <form @submit.prevent="handleSubscribe" class="w-full lg:max-w-sm space-y-3.5">
                        <!-- Email Input -->
                        <div class="relative">
                            <span
                                class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400 z-10">
                                <Icon name="solar:letter-outline" class="w-5 h-5" />
                            </span>
                            <LazyVInput v-model="email" type="email" placeholder="Enter your email address" required
                                class="[&_input]:!rounded-full [&_input]:!ps-11 [&_input]:!bg-white [&_input]:!text-black [&_input]:!placeholder-gray-400 [&_input]:!border-transparent [&_input]:focus:!ring-gray-300" />
                        </div>

                        <!-- Submit Button -->
                        <LazyVButton type="submit" color="light" shape="pill" block>
                            Subscribe to Newsletter
                        </LazyVButton>
                    </form>
                </div>
            </div>
        </div>

        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 pb-12">
            <!-- 5-Column Navigation Grid -->
            <div class="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-12">
                <!-- Brand & Bio Column -->
                <div class="col-span-2 md:col-span-4 lg:col-span-4 space-y-5">
                    <nuxt-link-locale to="/"
                        class="text-3xl font-black text-black tracking-tight uppercase select-none">
                        SHOP.CO
                    </nuxt-link-locale>
                    <p class="text-sm text-gray-500 leading-relaxed max-w-xs font-normal">
                        We have clothes that suits your style and which you're proud to wear. From women to men.
                    </p>

                    <!-- Social Icons -->
                    <div class="flex items-center gap-3 pt-1">
                        <!-- Twitter -->
                        <a href="#" aria-label="Twitter"
                            class="group/icon w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-black hover:shadow-md active:scale-95">
                            <Icon name="devicon:twitter"
                                class="w-4 h-4 fill-current transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                        </a>
                        <!-- Facebook -->
                        <a href="#" aria-label="Facebook"
                            class="group/icon w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-black hover:shadow-md active:scale-95">
                            <Icon name="selfhst:facebook"
                                class="w-4 h-4 fill-current transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                        </a>
                        <!-- Instagram -->
                        <a href="#" aria-label="Instagram"
                            class="group/icon w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-black hover:shadow-md active:scale-95">
                            <Icon name="skill-icons:instagram"
                                class="w-4 h-4 fill-current transition-all duration-300 group-hover/icon:scale-110" />
                        </a>
                        <!-- Snapchat -->
                        <a href="#" aria-label="Snapchat"
                            class="group/icon w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-black hover:shadow-md active:scale-95">
                            <Icon name="selfhst:snapchat"
                                class="w-4 h-4 fill-current transition-all duration-300 group-hover/icon:text-white group-hover/icon:scale-110" />
                        </a>
                    </div>
                </div>

                <!-- Links Columns -->
                <div v-for="column in footerLinks" :key="column.title" class="col-span-1 md:col-span-2">
                    <h3 class="text-sm font-semibold text-black tracking-widest uppercase mb-4 sm:mb-6">
                        {{ column.title }}
                    </h3>
                    <ul class="space-y-3 sm:space-y-3.5">
                        <li v-for="link in column.items" :key="link.label">
                            <nuxt-link-locale :to="link.route"
                                class="text-sm text-gray-500 hover:text-black transition-colors font-normal">
                                {{ link.label }}
                            </nuxt-link-locale>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar: Copyright & Payment Badges -->
            <div class="border-t border-gray-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <!-- Copyright -->
                <p class="text-xs sm:text-sm text-gray-500 font-normal">
                    Shop.co &copy; 2000-{{ currentYear }}, All Rights Reserved
                </p>

                <!-- Payment Badges -->
                <div class="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
                    <!-- Visa -->
                    <div
                        class="bg-white border border-gray-200 rounded-md px-3 py-1.5 h-8 flex items-center justify-center shadow-xs transition-all duration-200 hover:scale-110 hover:border-gray-400 hover:shadow-md active:scale-95 cursor-pointer">
                        <Icon name="logos:visa" class="w-7 h-7" />
                    </div>

                    <!-- Mastercard -->
                    <div
                        class="bg-white border border-gray-200 rounded-md px-3 py-1.5 h-8 flex items-center justify-center shadow-xs transition-all duration-200 hover:scale-110 hover:border-gray-400 hover:shadow-md active:scale-95 cursor-pointer">
                        <Icon name="selfhst:mastercard" class="w-7 h-7" />
                    </div>

                    <!-- PayPal -->
                    <div
                        class="bg-white border border-gray-200 rounded-md px-3 py-1.5 h-8 flex items-center justify-center shadow-xs transition-all duration-200 hover:scale-110 hover:border-gray-400 hover:shadow-md active:scale-95 cursor-pointer">
                        <Icon name="logos:paypal" class="w-5 h-5" />
                    </div>

                    <!-- Apple Pay -->
                    <div
                        class="bg-white border border-gray-200 rounded-md px-3 py-1.5 h-8 flex items-center justify-center shadow-xs transition-all duration-200 hover:scale-110 hover:border-gray-400 hover:shadow-md active:scale-95 cursor-pointer">
                        <Icon name="logos:apple-pay" class="w-7 h-7" />
                    </div>

                    <!-- Google Pay -->
                    <div
                        class="bg-white border border-gray-200 rounded-md px-3 py-1.5 h-8 flex items-center justify-center shadow-xs transition-all duration-200 hover:scale-110 hover:border-gray-400 hover:shadow-md active:scale-95 cursor-pointer">
                        <Icon name="logos:google-pay" class="w-7 h-7" />
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import type { FooterColumn, LinkItem } from '@/types/layouts/footer'

const email = ref<string>('')
const currentYear = new Date().getFullYear()

// Dynamic Navigation Links matching design
const footerLinks: FooterColumn[] = [
    {
        title: 'Company',
        items: [
            { label: 'About', route: '/about' },
            { label: 'Features', route: '/features' },
            { label: 'Works', route: '/works' },
            { label: 'Career', route: '/career' },
        ],
    },
    {
        title: 'Help',
        items: [
            { label: 'Customer Support', route: '/customer-support' },
            { label: 'Delivery Details', route: '/delivery-details' },
            { label: 'Terms & Conditions', route: '/terms-of-service' },
            { label: 'Privacy Policy', route: '/privacy-policy' },
        ],
    },
    {
        title: 'FAQ',
        items: [
            { label: 'Account', route: '/profile?tab=personal' },
            { label: 'Manage Deliveries', route: '/profile?tab=addresses' },
            { label: 'Orders', route: '/profile?tab=orders' },
            { label: 'Payments', route: '/profile?tab=payment' },
        ],
    },
    {
        title: 'Resources',
        items: [
            { label: 'Free eBooks', route: '/ebooks' },
            { label: 'Development Tutorial', route: '/tutorials' },
            { label: 'How to - Blog', route: '/blog' },
            { label: 'Youtube Playlist', route: '/playlists' },
        ],
    },
]

const toast = useToast()

const handleSubscribe = (): void => {
    if (!email.value) return
    toast.success(`Thank you for subscribing with: ${email.value}`, {
        title: 'Subscribed to Newsletter',
    })
    email.value = ''
}
</script>