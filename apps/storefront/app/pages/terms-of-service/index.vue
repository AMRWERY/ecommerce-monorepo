<template>
  <div class="max-w-5xl mx-auto space-y-10 pb-16">
    <!-- Breadcrumb -->
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 md:p-16 shadow-xl">
      <!-- Background Ambient Glow -->
      <div class="absolute -top-24 -end-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -start-24 w-80 h-80 rounded-full bg-neutral-800/40 blur-3xl pointer-events-none">
      </div>

      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
          <Icon name="lucide:shield-check" class="w-4 h-4 text-emerald-400" />
          <span>Legal Agreement</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Terms &amp; Conditions
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          Welcome to SHOP.CO. These terms govern your access to and use of our website, mobile interfaces, products, and
          services. Please read them carefully before making a purchase.
        </p>
        <div class="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-400">
          <span class="flex items-center gap-1.5">
            <Icon name="lucide:calendar" class="w-4 h-4 text-gray-300" />
            Last Updated: September 2026
          </span>
          <span>•</span>
          <span class="flex items-center gap-1.5">
            <Icon name="lucide:clock" class="w-4 h-4 text-gray-300" />
            Reading time: ~6 mins
          </span>
        </div>
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

    <!-- Main Content Sections -->
    <div class="space-y-8">
      <!-- Section 1 -->
      <section id="acceptance"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
            01
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            Acceptance of Terms
          </h2>
        </div>
        <div class="space-y-3 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed ps-0 sm:ps-11">
          <p>
            By accessing or browsing our platform, registering an account, or placing an order on SHOP.CO, you agree to
            comply with and be legally bound by these Terms and Conditions and our Privacy Policy.
          </p>
          <p>
            If you do not agree to these terms, you must refrain from using the platform immediately. We reserve the
            right to revise these terms at any time by updating this document. Continued usage indicates your acceptance
            of any amendments.
          </p>
        </div>
      </section>

      <!-- Section 2 -->
      <section id="account"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
            02
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            Account Registration &amp; Security
          </h2>
        </div>
        <div class="space-y-3 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed ps-0 sm:ps-11">
          <p>
            To place an order or access special member privileges, you may create an account. You represent and warrant
            that all provided information is accurate, up-to-date, and complete.
          </p>
          <ul class="list-disc ps-5 space-y-1.5 text-gray-600 dark:text-neutral-300">
            <li>You are solely responsible for maintaining the confidentiality of your account credentials and password.
            </li>
            <li>You must notify us immediately of any unauthorized access or security breach regarding your account.
            </li>
            <li>SHOP.CO will not be liable for any losses caused by unauthorized use of your credentials.</li>
          </ul>
        </div>
      </section>

      <!-- Section 3 -->
      <section id="pricing"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
            03
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            Orders, Pricing &amp; Payment
          </h2>
        </div>
        <div class="space-y-3 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed ps-0 sm:ps-11">
          <p>
            All prices listed on SHOP.CO are in USD ($) and are inclusive or exclusive of applicable sales taxes as
            displayed at checkout. Prices and inventory availability are subject to change without prior notice.
          </p>
          <p>
            We accept major credit/debit cards (Visa, MasterCard), Apple Pay, Google Pay, and PayPal. By submitting
            payment details, you authorize SHOP.CO and its encrypted payment processors to charge the full order total.
          </p>
          <div
            class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3">
            <Icon name="lucide:alert-circle" class="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span class="font-bold">Order Confirmation Notice:</span> Receipt of an electronic order confirmation does
              not signify our final acceptance of your order. We reserve the right to cancel or limit order quantities
              for any reason, including pricing errors or suspect fraud.
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4 -->
      <section id="shipping"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
            04
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            Shipping &amp; Delivery
          </h2>
        </div>
        <div class="space-y-3 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed ps-0 sm:ps-11">
          <p>
            Estimated delivery dates are provided at checkout for your convenience. Standard delivery typically takes
            3–5 business days, while express options arrive within 1–2 business days.
          </p>
          <p>
            Title and risk of loss for products pass to you upon delivery to the specified carrier. We are not
            responsible for delays caused by carrier disruptions, customs clearances, or incorrect shipping addresses
            provided by the customer.
          </p>
        </div>
      </section>

      <!-- Section 5 -->
      <section id="returns"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
            05
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            Returns, Refunds &amp; Cancellations
          </h2>
        </div>
        <div class="space-y-3 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed ps-0 sm:ps-11">
          <p>
            We offer a <strong class="text-black dark:text-white">30-day hassle-free return policy</strong> for eligible
            items. To qualify for a return:
          </p>
          <ul class="list-disc ps-5 space-y-1 text-gray-600 dark:text-neutral-300">
            <li>Items must be unworn, unwashed, and in their original packaging with tags attached.</li>
            <li>Final sale items and intimate apparel cannot be returned for hygiene reasons.</li>
            <li>Refunds will be credited to the original payment method within 5–7 business days after inspection.</li>
          </ul>
        </div>
      </section>

      <!-- Section 6 -->
      <section id="intellectual"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
            06
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
            Intellectual Property Rights
          </h2>
        </div>
        <div class="space-y-3 text-sm text-gray-600 dark:text-neutral-300 leading-relaxed ps-0 sm:ps-11">
          <p>
            All content on SHOP.CO, including logos, graphics, icons, text, photographs, audio clips, and software, is
            the exclusive property of SHOP.CO or its content licensors and is protected by international copyright,
            trademark, and trade dress laws.
          </p>
        </div>
      </section>

      <!-- Section 7: Contact Card -->
      <div
        class="rounded-3xl bg-neutral-100 dark:bg-neutral-800/60 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="space-y-2 text-center sm:text-start">
          <h3 class="text-xl font-black text-black dark:text-white">
            Have questions about these Terms?
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
            Our legal and customer care team is available 24/7 to assist you.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button type="button" @click="handlePrint"
            class="px-5 py-3 rounded-full border border-gray-300 dark:border-neutral-700 hover:bg-gray-200/60 dark:hover:bg-neutral-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2">
            <Icon name="lucide:printer" class="w-4 h-4" />
            <span>Print Terms</span>
          </button>
          <nuxt-link-locale to="/privacy-policy"
            class="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-xs sm:text-sm font-bold transition-all">
            Privacy Policy
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
  { label: 'Terms & Conditions' },
])

const toast = useToast()

const sections = [
  { id: 'acceptance', number: '01', shortTitle: 'Acceptance' },
  { id: 'account', number: '02', shortTitle: 'Account & Security' },
  { id: 'pricing', number: '03', shortTitle: 'Pricing & Orders' },
  { id: 'shipping', number: '04', shortTitle: 'Shipping & Delivery' },
  { id: 'returns', number: '05', shortTitle: 'Returns & Refunds' },
  { id: 'intellectual', number: '06', shortTitle: 'Intellectual Property' },
]

const handlePrint = () => {
  if (import.meta.client) {
    window.print()
    toast.info('Opening print dialog for Terms & Conditions', { title: 'Print' })
  }
}

definePageMeta({
  alias: ['/terms-of-service'],
})

useSeoPage({
  title: 'Terms & Conditions',
  description: 'Review the official terms and conditions for using SHOP.CO and ordering fashion items.',
})
</script>