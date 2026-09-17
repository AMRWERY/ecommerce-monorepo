<template>
  <div class="min-h-[calc(100vh-16rem)] flex items-center justify-center py-10 sm:py-16 px-4">
    <div
      class="w-full max-w-md space-y-8 bg-white dark:bg-[#1A1D25] p-6 sm:p-10 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-xl transition-colors">
      <!-- Header -->
      <div class="text-center space-y-2">
        <div
          class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white dark:bg-white dark:text-black mb-2 shadow-md">
          <Icon name="lucide:lock" class="w-6 h-6" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight">
          Welcome Back
        </h1>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
          Enter your email and password to sign in to your SHOP.CO account
        </p>
      </div>

      <!-- Social Logins -->
      <div class="grid grid-cols-2 gap-3 pt-2">
        <button type="button" @click="handleSocialLogin('Google')"
          class="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95">
          <Icon name="logos:google-icon" class="w-4 h-4" />
          <span>Google</span>
        </button>
        <button type="button" @click="handleSocialLogin('Apple')"
          class="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95">
          <Icon name="logos:apple" class="w-4 h-4 text-black dark:text-white" />
          <span>Apple</span>
        </button>
      </div>

      <!-- Divider -->
      <div class="relative flex items-center justify-center">
        <div class="border-t border-gray-200 dark:border-neutral-800 w-full"></div>
        <span
          class="bg-white dark:bg-[#1A1D25] px-3 text-xs uppercase tracking-wider text-gray-400 font-medium shrink-0">
          Or continue with
        </span>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email Field -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300">
            Email Address <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <Icon name="lucide:mail"
              class="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500 pointer-events-none" />
            <input v-model="form.email" type="email" required placeholder="alex.morgan@example.com"
              class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl ps-11 pe-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 placeholder:text-gray-400 dark:placeholder-neutral-500 transition-all border border-transparent" />
          </div>
        </div>

        <!-- Password Field -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300">
              Password <span class="text-red-500">*</span>
            </label>
            <nuxt-link-locale to="/auth/reset-password"
              class="text-xs text-gray-500 hover:text-black dark:hover:text-white hover:underline transition-colors">
              Forgot password?
            </nuxt-link-locale>
          </div>
          <div class="relative">
            <Icon name="lucide:lock"
              class="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500 pointer-events-none" />
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required placeholder="••••••••"
              class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl ps-11 pe-11 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 placeholder:text-gray-400 dark:placeholder-neutral-500 transition-all border border-transparent" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white focus:outline-none"
              :aria-label="showPassword ? 'Hide password' : 'Show password'">
              <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Remember Me Checkbox -->
        <div class="flex items-center gap-2 pt-1">
          <input id="remember" v-model="form.rememberMe" type="checkbox"
            class="rounded text-black focus:ring-black dark:text-white" />
          <label for="remember" class="text-xs text-gray-600 dark:text-neutral-400 select-none cursor-pointer">
            Remember me for 30 days
          </label>
        </div>

        <!-- Feedback Alert -->
        <div v-if="errorMessage"
          class="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <Icon name="lucide:alert-circle" class="w-4 h-4 shrink-0" />
          <span>{{ errorMessage }}</span>
        </div>

        <div v-if="successMessage"
          class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
          <Icon name="lucide:check-circle" class="w-4 h-4 shrink-0" />
          <span>{{ successMessage }}</span>
        </div>

        <!-- Submit Button -->
        <LazyVButton type="submit" variant="solid" color="dark" shape="pill" size="lg" block :loading="isLoading"
          class="w-full py-3.5 font-bold text-sm tracking-wide mt-2">
          Sign In
        </LazyVButton>
      </form>

      <!-- Switch to Sign Up -->
      <div class="text-center pt-2">
        <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
          Don't have an account?
          <nuxt-link-locale to="/auth/sign-up" class="font-bold text-black dark:text-white hover:underline ps-1">
            Create an account
          </nuxt-link-locale>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  rememberMe: true,
})

const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const toast = useToast()

const handleLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  // Simulate network login
  setTimeout(() => {
    isLoading.value = false
    if (!form.email || !form.password) {
      errorMessage.value = 'Please enter both your email and password.'
      toast.error('Please enter both your email and password.', { title: 'Sign In Failed' })
      return
    }

    successMessage.value = 'Signed in successfully! Redirecting...'
    toast.success('Signed in successfully! Welcome back.', { title: 'Welcome Back' })
    setTimeout(() => {
      router.push('/profile')
    }, 1200)
  }, 1000)
}

const handleSocialLogin = (provider: string) => {
  toast.info(`Connecting to ${provider} authentication...`, {
    title: `${provider} Login`,
  })
}

definePageMeta({
  alias: ['/login', '/auth/login'],
})

useSeoPage({
  title: 'Sign In',
  description: 'Sign in to your SHOP.CO account.',
  noindex: true,
})
</script>