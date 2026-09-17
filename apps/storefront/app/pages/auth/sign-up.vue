<template>
  <div class="min-h-[calc(100vh-16rem)] flex items-center justify-center py-10 sm:py-16 px-4">
    <div
      class="w-full max-w-md space-y-7 bg-white dark:bg-[#1A1D25] p-6 sm:p-10 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-xl transition-colors">
      <!-- Header -->
      <div class="text-center space-y-2">
        <div
          class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white dark:bg-white dark:text-black mb-2 shadow-md">
          <Icon name="lucide:user-plus" class="w-6 h-6" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight">
          Create Account
        </h1>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
          Sign up to track orders, save favorites, and receive VIP member drops
        </p>
      </div>

      <!-- Social Logins -->
      <div class="grid grid-cols-2 gap-3 pt-1">
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
          Or register with email
        </span>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="handleSignup" class="space-y-4">
        <!-- Name Row -->
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300">
              First Name <span class="text-red-500">*</span>
            </label>
            <input v-model="form.firstName" type="text" required placeholder="Alex"
              class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 placeholder:text-gray-400 dark:placeholder-neutral-500 transition-all border border-transparent" />
          </div>
          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300">
              Last Name <span class="text-red-500">*</span>
            </label>
            <input v-model="form.lastName" type="text" required placeholder="Morgan"
              class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 placeholder:text-gray-400 dark:placeholder-neutral-500 transition-all border border-transparent" />
          </div>
        </div>

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
          <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300">
            Password <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <Icon name="lucide:lock"
              class="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-500 pointer-events-none" />
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required
              placeholder="Minimum 8 characters"
              class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl ps-11 pe-11 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 placeholder:text-gray-400 dark:placeholder-neutral-500 transition-all border border-transparent" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white focus:outline-none"
              :aria-label="showPassword ? 'Hide password' : 'Show password'">
              <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-4 h-4" />
            </button>
          </div>

          <!-- Password Strength Meter -->
          <div v-if="form.password" class="space-y-1 pt-1">
            <div class="h-1 w-full bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden flex gap-1">
              <div v-for="i in 4" :key="i" :class="[
                'h-full flex-1 rounded-full transition-all duration-300',
                i <= passwordStrength.score ? passwordStrength.color : 'bg-transparent'
              ]"></div>
            </div>
            <p class="text-[11px] text-gray-400">
              Strength: <span class="font-semibold text-black dark:text-white">{{ passwordStrength.label }}</span>
            </p>
          </div>
        </div>

        <!-- Terms & Conditions Checkbox -->
        <div class="flex items-start gap-2 pt-1">
          <input id="terms" v-model="form.agreeTerms" type="checkbox" required
            class="mt-0.5 rounded text-black focus:ring-black dark:text-white" />
          <label for="terms"
            class="text-xs text-gray-600 dark:text-neutral-400 select-none cursor-pointer leading-tight">
            I agree to the
            <a href="#" class="font-semibold text-black dark:text-white hover:underline">Terms of Service</a>
            and
            <a href="#" class="font-semibold text-black dark:text-white hover:underline">Privacy Policy</a>
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
          Create Account
        </LazyVButton>
      </form>

      <!-- Switch to Login -->
      <div class="text-center pt-2">
        <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
          Already have an account?
          <nuxt-link-locale to="/auth" class="font-bold text-black dark:text-white hover:underline ps-1">
            Log in
          </nuxt-link-locale>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agreeTerms: false,
})

const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return { score: 0, label: 'None', color: 'bg-transparent' }
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++

  switch (score) {
    case 1:
      return { score: 1, label: 'Weak', color: 'bg-red-500' }
    case 2:
      return { score: 2, label: 'Fair', color: 'bg-amber-500' }
    case 3:
      return { score: 3, label: 'Good', color: 'bg-blue-500' }
    case 4:
    default:
      return { score: 4, label: 'Strong', color: 'bg-emerald-500' }
  }
})

const handleSignup = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.agreeTerms) {
    errorMessage.value = 'Please agree to the Terms of Service and Privacy Policy.'
    return
  }

  if (form.password.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long.'
    return
  }

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    successMessage.value = 'Account created successfully! Redirecting to your profile...'
    setTimeout(() => {
      router.push('/profile')
    }, 1200)
  }, 1000)
}

const handleSocialLogin = (provider: string) => {
  alert(`Connecting to ${provider} authentication...`)
}

definePageMeta({
  alias: ['/auth/sign-up'],
})

useHead({
  title: 'Sign Up — SHOP.CO',
  meta: [
    { name: 'description', content: 'Create an account on SHOP.CO.' }
  ],
})
</script>