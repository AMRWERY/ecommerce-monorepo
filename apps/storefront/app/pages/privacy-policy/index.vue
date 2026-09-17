<template>
  <div class="max-w-5xl mx-auto space-y-10 pb-16">
    <!-- Breadcrumb -->
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 md:p-16 shadow-xl">
      <!-- Background Ambient Glow -->
      <div class="absolute -top-24 -end-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -start-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none">
      </div>

      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
          <Icon name="lucide:lock" class="w-4 h-4 text-emerald-400" />
          <span>Privacy &amp; Data Protection</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Privacy Policy
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          At SHOP.CO, we respect your privacy and are committed to protecting your personal data. This policy explains
          what information we collect, how we use it, and your legal rights.
        </p>
        <div class="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-400">
          <span class="flex items-center gap-1.5">
            <Icon name="lucide:calendar" class="w-4 h-4 text-gray-300" />
            Last Updated: September 2026
          </span>
          <span>•</span>
          <span class="flex items-center gap-1.5">
            <Icon name="lucide:shield" class="w-4 h-4 text-emerald-400" />
            GDPR &amp; CCPA Compliant
          </span>
        </div>
      </div>
    </div>

    <!-- Trust Badges Summary -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="badge in trustBadges" :key="badge.title"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-2 transition-colors">
        <div
          class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white">
          <Icon :name="badge.icon" class="w-5 h-5" />
        </div>
        <h3 class="font-bold text-sm text-black dark:text-white">
          {{ badge.title }}
        </h3>
        <p class="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
          {{ badge.description }}
        </p>
      </div>
    </div>

    <!-- Quick Navigation Jump Bar -->
    <div
      class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-2xl p-4 shadow-sm transition-colors">
      <div class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
        <Icon name="lucide:list" class="w-4 h-4" />
        <span>Quick Navigation</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
          {{ section.number }}. {{ section.shortTitle }}
        </a>
      </div>
    </div>

    <!-- Policy Content Sections -->
    <div class="space-y-8">
      <!-- Section 1 -->
      <section id="collection"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
            01
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            Information We Collect
          </h2>
        </div>
        <div class="space-y-3 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed ps-0 sm:ps-11">
          <p>
            We collect information that you directly provide to us, as well as data automatically gathered when you
            interact with SHOP.CO:
          </p>
          <ul class="list-disc ps-5 space-y-2 text-gray-600 dark:text-neutral-300">
            <li>
              <strong class="text-black dark:text-white">Account &amp; Contact Details:</strong> Your name, email
              address, phone number, shipping address, and password.
            </li>
            <li>
              <strong class="text-black dark:text-white">Order &amp; Payment Data:</strong> Items purchased, billing
              address, transaction date, and payment confirmation tokens (we do not store raw card numbers).
            </li>
            <li>
              <strong class="text-black dark:text-white">Device &amp; Usage Information:</strong> IP address, browser
              type, operating system, pages viewed, and referral URLs.
            </li>
          </ul>
        </div>
      </section>

      <!-- Section 2 -->
      <section id="usage"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
            02
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            How We Use Your Information
          </h2>
        </div>
        <div class="space-y-3 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed ps-0 sm:ps-11">
          <p>
            We use your data responsibly to provide a seamless fashion shopping experience:
          </p>
          <ul class="list-disc ps-5 space-y-1.5 text-gray-600 dark:text-neutral-300">
            <li>Process and fulfill your purchases, order tracking, and deliveries.</li>
            <li>Manage your account, profile details, and saved wishlist.</li>
            <li>Send order confirmations, delivery updates, and support messages.</li>
            <li>Deliver personalized product recommendations and exclusive discounts (if opted-in).</li>
            <li>Detect and prevent fraud, unauthorized activity, and malicious attacks.</li>
          </ul>
        </div>
      </section>

      <!-- Section 3 -->
      <section id="sharing"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
            03
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            Sharing of Information
          </h2>
        </div>
        <div class="space-y-3 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed ps-0 sm:ps-11">
          <div
            class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3 mb-2">
            <Icon name="lucide:check-circle-2" class="w-5 h-5 shrink-0" />
            <span class="font-medium">
              We never sell, rent, or trade your personal data to third parties for their marketing purposes.
            </span>
          </div>
          <p>
            We only share data with trusted service providers who adhere to strict data protection standards:
          </p>
          <ul class="list-disc ps-5 space-y-1 text-gray-600 dark:text-neutral-300">
            <li>Shipping carriers (e.g., FedEx, DHL) to deliver your parcels.</li>
            <li>Payment gateways (e.g., Stripe, PayPal) to process encrypted transactions.</li>
            <li>Cloud hosting providers and infrastructure partners.</li>
          </ul>
        </div>
      </section>

      <!-- Section 4 -->
      <section id="rights"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
            04
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            Your Privacy Rights
          </h2>
        </div>
        <div class="space-y-4 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed ps-0 sm:ps-11">
          <p>
            Depending on your location (including the European Union under GDPR and California under CCPA), you have
            enforceable rights regarding your personal information:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div
              class="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200/60 dark:border-neutral-700/60 space-y-1">
              <h4 class="font-bold text-xs text-black dark:text-white flex items-center gap-2">
                <Icon name="lucide:download" class="w-4 h-4 text-black dark:text-white" />
                Right of Access &amp; Portability
              </h4>
              <p class="text-xs text-gray-500 dark:text-neutral-400">
                You can request a copy of the personal data we store about you in a readable format.
              </p>
            </div>
            <div
              class="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200/60 dark:border-neutral-700/60 space-y-1">
              <h4 class="font-bold text-xs text-black dark:text-white flex items-center gap-2">
                <Icon name="lucide:trash-2" class="w-4 h-4 text-rose-500" />
                Right to Erasure ("To Be Forgotten")
              </h4>
              <p class="text-xs text-gray-500 dark:text-neutral-400">
                You can request that we permanently delete your account and personal details.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap gap-3 pt-2">
            <button type="button" @click="handleRequestData"
              class="px-5 py-2.5 rounded-full border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 text-xs font-semibold transition-all flex items-center gap-2">
              <Icon name="lucide:download" class="w-4 h-4" />
              <span>Request My Data Archive</span>
            </button>
            <button type="button" @click="handleCookieSettings"
              class="px-5 py-2.5 rounded-full border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 text-xs font-semibold transition-all flex items-center gap-2">
              <Icon name="lucide:sliders" class="w-4 h-4" />
              <span>Cookie Preferences</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Contact Banner -->
      <div
        class="rounded-3xl bg-neutral-100 dark:bg-neutral-800/60 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="space-y-2 text-center sm:text-start">
          <h3 class="text-xl font-black text-black dark:text-white">
            Questions about your data?
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
            Contact our designated Data Protection Officer at privacy@shop.co.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <nuxt-link-locale to="/terms-of-service"
            class="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-xs sm:text-sm font-bold transition-all">
            Terms &amp; Conditions
          </nuxt-link-locale>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/types/shared/VBreadcrumb'

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Help' },
  { label: 'Privacy Policy' },
])

const toast = useToast()

const trustBadges = [
  {
    icon: 'lucide:shield-check',
    title: 'Never Sold',
    description: 'We do not sell your personal data to advertisers.',
  },
  {
    icon: 'lucide:lock',
    title: '256-Bit SSL',
    description: 'Bank-grade encryption on all transactions and forms.',
  },
  {
    icon: 'lucide:user-check',
    title: 'Your Control',
    description: 'Export or delete your data whenever you desire.',
  },
  {
    icon: 'lucide:globe',
    title: 'Global Compliance',
    description: 'Adherence to GDPR, CCPA, and ePrivacy regulations.',
  },
]

const sections = [
  { id: 'collection', number: '01', shortTitle: 'Information We Collect' },
  { id: 'usage', number: '02', shortTitle: 'How We Use Data' },
  { id: 'sharing', number: '03', shortTitle: 'Sharing of Data' },
  { id: 'rights', number: '04', shortTitle: 'Your Privacy Rights' },
]

const handleRequestData = () => {
  toast.success('Your data archive request has been received. You will receive an email within 24 hours.', {
    title: 'Data Export Initiated',
    duration: 5000,
  })
}

const handleCookieSettings = () => {
  toast.info('Cookie preferences panel will be updated. Essential cookies remain active.', {
    title: 'Preferences Updated',
  })
}

definePageMeta({
  alias: ['/privacy'],
})

useHead({
  title: 'Privacy Policy — SHOP.CO',
  meta: [
    {
      name: 'description',
      content: 'Learn how SHOP.CO protects, uses, and secures your personal data and your privacy rights.',
    },
  ],
})
</script>