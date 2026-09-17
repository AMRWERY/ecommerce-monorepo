<template>
  <header
    class="sticky top-0 z-30 w-full h-20 bg-white/90 dark:bg-[#12141A]/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-[#2A2E38] transition-colors"
  >
    <div class="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      <!-- Left Side: Mobile Menu Button & Search -->
      <div class="flex items-center gap-3 sm:gap-4 flex-1 max-w-lg">
        <!-- Mobile Sidebar Toggle -->
        <button
          type="button"
          class="flex lg:hidden items-center justify-center w-10 h-10 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#1A1D25] transition-colors shrink-0"
          aria-label="Toggle sidebar menu"
          @click="toggleMobileSidebar"
        >
          <Icon name="lucide:menu" class="w-5 h-5" />
        </button>

        <!-- Desktop Sidebar Toggle when Collapsed -->
        <button
          v-if="isSidebarCollapsed"
          type="button"
          class="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#1A1D25] transition-colors shrink-0"
          title="Expand sidebar"
          @click="toggleSidebarCollapse"
        >
          <Icon :name="isRtl ? 'lucide:panel-right-open' : 'lucide:panel-left-open'" class="w-5 h-5" />
        </button>

        <!-- Search Bar (Pill shape matching design) -->
        <div class="relative w-full max-w-md">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search product"
            class="w-full h-11 bg-neutral-50 dark:bg-[#181B23] border border-neutral-200 dark:border-[#2A2E38] rounded-full ps-4 pe-11 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#3373FF] focus:ring-2 focus:ring-[#3373FF]/15 transition-all shadow-sm"
          />
          <button
            type="button"
            class="absolute inset-y-0 end-0 pe-3.5 flex items-center text-neutral-400 hover:text-[#3373FF] transition-colors"
            title="Search"
          >
            <Icon name="lucide:search" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Right Side: Actions & Profile -->
      <div class="flex items-center gap-2 sm:gap-4 shrink-0">
        <!-- Messages Button with Badge -->
        <div class="relative">
          <button
            type="button"
            class="relative flex items-center justify-center w-10 h-10 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#1A1D25] hover:text-neutral-900 dark:hover:text-white transition-colors"
            title="Messages"
          >
            <Icon name="lucide:mail" class="w-5 h-5" />
            <!-- Red Count Badge (2) -->
            <span
              v-if="unreadMessages > 0"
              class="absolute -top-0.5 -end-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-[#12141A]"
            >
              {{ unreadMessages }}
            </span>
          </button>
        </div>

        <!-- Notifications Bell Button with Badge -->
        <div class="relative">
          <button
            type="button"
            class="relative flex items-center justify-center w-10 h-10 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#1A1D25] hover:text-neutral-900 dark:hover:text-white transition-colors"
            title="Notifications"
          >
            <Icon name="lucide:bell" class="w-5 h-5" />
            <!-- Red Count Badge (4) -->
            <span
              v-if="unreadNotifications > 0"
              class="absolute -top-0.5 -end-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-[#12141A]"
            >
              {{ unreadNotifications }}
            </span>
          </button>
        </div>

        <!-- Language Switcher -->
        <LazyVToggleLocales />

        <LazyVToggleTheme />

        <!-- Vertical Divider -->
        <div class="hidden sm:block h-6 w-px bg-neutral-200 dark:bg-[#2A2E38]" />

        <!-- User Profile Pill / Dropdown -->
        <div class="relative" ref="profileDropdownRef">
          <button
            type="button"
            class="flex items-center gap-3 p-1.5 sm:pe-3 rounded-full hover:bg-neutral-100 dark:hover:bg-[#1A1D25] transition-colors group select-none"
            @click="isProfileOpen = !isProfileOpen"
          >
            <!-- Avatar Image -->
            <div class="relative w-9 h-9 shrink-0">
              <img
                :src="userProfile.avatar"
                :alt="userProfile.name"
                class="w-full h-full rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
              />
              <span
                class="absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#12141A]"
              />
            </div>

            <!-- Name and Role (Desktop) -->
            <div class="hidden sm:flex flex-col text-start leading-tight">
              <span class="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-[#3373FF] transition-colors">
                {{ userProfile.name }}
              </span>
              <span class="text-xs text-neutral-400">
                {{ userProfile.role }}
              </span>
            </div>
          </button>

          <!-- Dropdown Menu -->
          <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="isProfileOpen"
              class="absolute end-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1A1D25] border border-neutral-200 dark:border-[#2A2E38] shadow-xl py-2 z-50 divide-y divide-neutral-100 dark:divide-[#2A2E38]"
            >
              <div class="px-4 py-2.5 sm:hidden">
                <div class="text-sm font-semibold text-neutral-900 dark:text-white">
                  {{ userProfile.name }}
                </div>
                <div class="text-xs text-neutral-400">{{ userProfile.role }}</div>
              </div>

              <div class="py-1">
                <nuxt-link-locale
                  to="/profile"
                  class="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-[#252932] hover:text-[#3373FF] transition-colors"
                  @click="isProfileOpen = false"
                >
                  <Icon name="lucide:user" class="w-4 h-4" />
                  My Profile
                </nuxt-link-locale>
                <nuxt-link-locale
                  to=""
                  class="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-[#252932] hover:text-[#3373FF] transition-colors"
                  @click="isProfileOpen = false"
                >
                  <Icon name="lucide:settings" class="w-4 h-4" />
                  Settings
                </nuxt-link-locale>
              </div>

              <div class="py-1">
                <button
                  type="button"
                  class="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  @click="handleLogout"
                >
                  <Icon name="lucide:log-out" class="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");

const {
  isSidebarCollapsed,
  unreadMessages,
  unreadNotifications,
  userProfile,
  toggleSidebarCollapse,
  toggleMobileSidebar,
} = useAdminLayout();

const searchQuery = ref("");
const isProfileOpen = ref(false);
const profileDropdownRef = ref<HTMLElement | null>(null);

// Close dropdown on click outside
onClickOutside(profileDropdownRef, () => {
  isProfileOpen.value = false;
});

const handleLogout = () => {
  isProfileOpen.value = false;
  // Handle logout logic if needed
};
</script>
