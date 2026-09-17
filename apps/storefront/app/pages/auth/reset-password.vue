<template>
  <div class="min-h-[calc(100vh-16rem)] flex items-center justify-center py-10 sm:py-16 px-4">
    <div
      class="w-full max-w-md space-y-8 bg-white dark:bg-[#1A1D25] p-6 sm:p-10 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-xl transition-colors"
    >
      <!-- === SUCCESS STATE === -->
      <template v-if="submitted">
        <div class="text-center space-y-4">
          <!-- Animated success icon -->
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 mb-2 animate-bounce-once"
          >
            <Icon name="lucide:mail-check" class="w-8 h-8" />
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight">
            Check Your Inbox
          </h1>
          <p class="text-sm text-gray-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed">
            We sent a reset link to
            <span class="font-semibold text-black dark:text-white break-all">{{ sentEmail }}</span>.
            Click the link in the email to create a new password.
          </p>
        </div>

        <!-- Tips box -->
        <div
          class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs space-y-1.5"
        >
          <p class="flex items-center gap-2 font-semibold">
            <Icon name="lucide:info" class="w-3.5 h-3.5 shrink-0" />
            Didn't receive an email?
          </p>
          <ul class="space-y-1 ps-5 list-disc text-amber-600 dark:text-amber-500">
            <li>Check your spam or junk folder</li>
            <li>Make sure the email address is correct</li>
            <li>Allow up to 2 minutes for delivery</li>
          </ul>
        </div>

        <!-- Resend button with countdown -->
        <div class="text-center space-y-3">
          <button
            v-if="resendCooldown > 0"
            disabled
            class="text-xs text-gray-400 dark:text-neutral-500 cursor-not-allowed"
          >
            Resend email in
            <span class="font-bold tabular-nums text-black dark:text-white">{{ resendCooldown }}s</span>
          </button>
          <button
            v-else
            @click="handleResend"
            :disabled="isResending"
            class="text-xs font-semibold text-black dark:text-white hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <template v-if="isResending">
              <Icon name="lucide:loader-circle" class="w-3.5 h-3.5 inline animate-spin me-1" />
              Resending…
            </template>
            <template v-else>
              Resend email
            </template>
          </button>

          <div v-if="resendSuccess" class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <Icon name="lucide:check-circle" class="w-3.5 h-3.5 inline me-1" />
            Email resent successfully!
          </div>
        </div>

        <!-- Back to login -->
        <nuxt-link-locale
          to="/auth"
          class="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-black dark:text-white hover:underline pt-2 transition-colors"
        >
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Back to Login
        </nuxt-link-locale>
      </template>

      <!-- === REQUEST FORM STATE === -->
      <template v-else>
        <!-- Header -->
        <div class="text-center space-y-2">
          <div
            class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white dark:bg-white dark:text-black mb-2 shadow-md"
          >
            <Icon name="lucide:key-round" class="w-6 h-6" />
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight">
            Reset Password
          </h1>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 max-w-xs mx-auto">
            Enter your account email and we'll send you a secure link to reset your password.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Email Field -->
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300">
              Email Address <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <Icon
                name="lucide:mail"
                class="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500 pointer-events-none"
              />
              <input
                v-model="email"
                type="email"
                required
                autofocus
                placeholder="alex.morgan@example.com"
                :class="[
                  'w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl ps-11 pe-4 py-3 focus:outline-none focus:ring-2 placeholder:text-gray-400 dark:placeholder-neutral-500 transition-all border',
                  emailError
                    ? 'border-red-400 dark:border-red-600 focus:ring-red-200 dark:focus:ring-red-800'
                    : 'border-transparent focus:ring-black/20 dark:focus:ring-white/20'
                ]"
                @blur="validateEmail"
              />
            </div>
            <p v-if="emailError" class="text-[11px] text-red-500 ps-1 flex items-center gap-1">
              <Icon name="lucide:alert-circle" class="w-3 h-3 shrink-0" />
              {{ emailError }}
            </p>
          </div>

          <!-- Submit Button -->
          <LazyVButton
            type="submit"
            variant="solid"
            color="dark"
            shape="pill"
            size="lg"
            block
            :loading="isLoading"
            class="w-full py-3.5 font-bold text-sm tracking-wide"
          >
            Send Reset Link
          </LazyVButton>
        </form>

        <!-- Back to Login -->
        <div class="text-center pt-1">
          <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
            Remember your password?
            <nuxt-link-locale
              to="/auth"
              class="font-bold text-black dark:text-white hover:underline ps-1"
            >
              Sign in
            </nuxt-link-locale>
          </p>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center border-t border-gray-100 dark:border-neutral-800 pt-5 -mt-2">
          <p class="text-xs text-gray-400 dark:text-neutral-500">
            New to SHOP.CO?
            <nuxt-link-locale
              to="/auth/sign-up"
              class="font-semibold text-black dark:text-white hover:underline ps-1"
            >
              Create an account
            </nuxt-link-locale>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
const email = ref('')
const emailError = ref('')
const isLoading = ref(false)
const submitted = ref(false)
const sentEmail = ref('')

// Resend state
const isResending = ref(false)
const resendCooldown = ref(0)
const resendSuccess = ref(false)
let cooldownTimer: ReturnType<typeof setInterval> | null = null

const validateEmail = () => {
  if (!email.value) {
    emailError.value = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email address.'
  } else {
    emailError.value = ''
  }
}

const toast = useToast()

const handleSubmit = async () => {
  validateEmail()
  if (emailError.value) {
    toast.error(emailError.value, { title: 'Invalid Email' })
    return
  }

  isLoading.value = true
  await new Promise((r) => setTimeout(r, 1200))
  isLoading.value = false

  sentEmail.value = email.value
  submitted.value = true
  toast.success(`Password reset instructions sent to ${email.value}`, { title: 'Email Sent' })
  startResendCooldown()
}

const startResendCooldown = () => {
  resendCooldown.value = 60
  resendSuccess.value = false
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownTimer!)
      cooldownTimer = null
    }
  }, 1000)
}

const handleResend = async () => {
  isResending.value = true
  resendSuccess.value = false
  await new Promise((r) => setTimeout(r, 900))
  isResending.value = false
  resendSuccess.value = true
  toast.success('A new reset link has been dispatched to your email.', { title: 'Link Resent' })
  startResendCooldown()
}

onUnmounted(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
})

definePageMeta({
  alias: ['/reset-password', '/auth/reset-password'],
})

useSeoPage({
  title: 'Reset Password',
  description: 'Reset your SHOP.CO account password securely.',
  noindex: true,
})
</script>

<style scoped>
@keyframes bounce-once {
  0%   { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.15); opacity: 1; }
  80%  { transform: scale(0.95); }
  100% { transform: scale(1); }
}
.animate-bounce-once {
  animation: bounce-once 0.5s ease-out forwards;
}
</style>