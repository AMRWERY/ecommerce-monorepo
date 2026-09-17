<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-16">
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 shadow-2xl">
      <div class="relative z-10 max-w-2xl space-y-4">
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
          <Icon name="lucide:life-buoy" class="w-4 h-4 text-emerald-400" />
          <span>Help Center</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          How Can We Help You Today?
        </h1>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          Our dedicated customer support team is on standby 24/7 to assist with orders, sizing, shipping, or returns.
        </p>
      </div>
    </div>

    <!-- Contact Options Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div v-for="channel in supportChannels" :key="channel.title"
        class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between transition-colors">
        <div class="space-y-3">
          <div
            class="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white">
            <Icon :name="channel.icon" class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-base text-black dark:text-white">
            {{ channel.title }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
            {{ channel.description }}
          </p>
        </div>
        <button type="button" @click="handleChannelAction(channel.title)"
          class="w-full py-2.5 rounded-full border border-gray-300 dark:border-neutral-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-xs transition-all">
          {{ channel.actionLabel }}
        </button>
      </div>
    </div>

    <!-- Interactive Support Form -->
    <div
      class="bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 transition-colors">
      <div class="space-y-1">
        <h2 class="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
          Send Us a Direct Message
        </h2>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
          We usually reply within 2 hours during regular business operations.
        </p>
      </div>

      <form @submit.prevent="handleSendMessage" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300">
              Your Name <span class="text-red-500">*</span>
            </label>
            <input v-model="form.name" type="text" required placeholder="Alex Morgan"
              class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all border border-transparent" />
          </div>
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300">
              Email Address <span class="text-red-500">*</span>
            </label>
            <input v-model="form.email" type="email" required placeholder="alex.morgan@example.com"
              class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all border border-transparent" />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300">
            Topic or Order Number
          </label>
          <input v-model="form.topic" type="text" placeholder="e.g. Order #SHP-98421 or Sizing question"
            class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all border border-transparent" />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300">
            Your Message <span class="text-red-500">*</span>
          </label>
          <textarea v-model="form.message" required rows="4" placeholder="How can our support specialists help you?"
            class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all border border-transparent resize-none"></textarea>
        </div>

        <LazyVButton type="submit" variant="solid" color="dark" shape="pill" size="lg" :loading="isSending"
          class="px-8 font-bold text-sm">
          Submit Ticket
        </LazyVButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/types/shared/VBreadcrumb'

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Help' },
  { label: 'Customer Support' },
])

const toast = useToast()

const supportChannels = [
  {
    icon: 'lucide:message-circle',
    title: 'Live Chat Support',
    description: 'Instant answers from our dedicated concierge team.',
    actionLabel: 'Start Live Chat',
  },
  {
    icon: 'lucide:mail',
    title: 'Email Inquiries',
    description: 'Direct inquiries to support@shop.co for detailed reviews.',
    actionLabel: 'Email Support',
  },
  {
    icon: 'lucide:phone-call',
    title: 'Toll-Free Phone',
    description: 'Call us +1 (800) 555-SHOP between 8am – 8pm EST.',
    actionLabel: 'Call Center',
  },
]

const form = reactive({
  name: '',
  email: '',
  topic: '',
  message: '',
})

const isSending = ref(false)

const handleChannelAction = (channel: string) => {
  toast.info(`Connecting to ${channel}... One of our specialists will be with you.`, {
    title: channel,
  })
}

const handleSendMessage = async () => {
  isSending.value = true
  await new Promise((r) => setTimeout(r, 1000))
  isSending.value = false

  toast.success('Your support inquiry has been submitted! Ticket #TK-' + Math.floor(10000 + Math.random() * 90000) + ' created.', {
    title: 'Message Sent',
    duration: 5000,
  })

  form.name = ''
  form.email = ''
  form.topic = ''
  form.message = ''
}

definePageMeta({
  alias: ['/support'],
})

useSeoPage({
  title: 'Customer Support',
  description: 'Get 24/7 assistance from SHOP.CO customer care for orders, tracking, and returns.',
})
</script>