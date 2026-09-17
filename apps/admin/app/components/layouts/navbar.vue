<template>
  <header
    class="sticky top-0 z-30 w-full h-20 bg-white dark:bg-[#12141A] border-b border-gray-100 dark:border-neutral-800 transition-colors"
  >
    <div class="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      <!-- Left Side: Mobile Menu Button & Search -->
      <div class="flex items-center gap-3 sm:gap-4 flex-1 max-w-lg">
        <!-- Mobile Sidebar Toggle -->
        <button
          type="button"
          class="flex lg:hidden items-center justify-center w-10 h-10 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-[#F0F0F0] dark:hover:bg-neutral-800 transition-colors shrink-0"
          aria-label="Toggle sidebar menu"
          @click="toggleMobileSidebar"
        >
          <Icon name="lucide:menu" class="w-5 h-5" />
        </button>

        <!-- Desktop Sidebar Toggle when Collapsed -->
        <button
          v-if="isSidebarCollapsed"
          type="button"
          class="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:text-black dark:text-neutral-400 dark:hover:text-white hover:bg-[#F0F0F0] dark:hover:bg-neutral-800 transition-colors shrink-0"
          title="Expand sidebar"
          @click="toggleSidebarCollapse"
        >
          <Icon :name="isRtl ? 'lucide:panel-right-open' : 'lucide:panel-left-open'" class="w-5 h-5" />
        </button>

        <!-- Search Bar (Storefront matching style) -->
        <div class="relative w-full max-w-md">
          <span
            class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400 dark:text-neutral-500"
          >
            <Icon name="at-icons:magnifying-glass" class="w-4 h-4" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search product..."
            class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-gray-800 dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-400 text-sm rounded-full ps-11 pe-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 transition-all"
          />
        </div>
      </div>

      <!-- Right Side: Actions & Profile -->
      <div class="flex items-center gap-2 sm:gap-4 shrink-0">
        <!-- Messages Button with Badge -->
        <div class="relative">
          <button
            type="button"
            class="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-700 dark:text-gray-300 hover:bg-[#F0F0F0] dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors"
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
            class="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-700 dark:text-gray-300 hover:bg-[#F0F0F0] dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors"
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

        <!-- Theme Switcher from layers -->
        <LazyVToggleTheme />

        <!-- Vertical Divider -->
        <div class="hidden sm:block h-6 w-px bg-gray-200 dark:bg-neutral-800" />

        <!-- User Profile Pill / Dropdown -->
        <div class="relative" ref="profileDropdownRef">
          <button
            type="button"
            class="flex items-center gap-3 p-1.5 sm:pe-3 rounded-full hover:bg-[#F0F0F0] dark:hover:bg-neutral-800 transition-colors group select-none"
            @click="isProfileOpen = !isProfileOpen"
          >
            <!-- Avatar Image -->
            <div class="relative w-9 h-9 shrink-0">
              <img
                :src="userProfile.avatar"
                :alt="userProfile.name"
                class="w-full h-full rounded-full object-cover ring-2 ring-gray-200 dark:ring-neutral-700"
              />
              <span
                class="absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#12141A]"
              />
            </div>

            <!-- Name and Role (Desktop) -->
            <div class="hidden sm:flex flex-col text-start leading-tight">
              <span class="text-sm font-semibold text-black dark:text-white group-hover:text-[#3373FF] transition-colors">
                {{ userProfile.name }}
              </span>
              <span class="text-xs text-gray-500 dark:text-neutral-400">
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
              class="absolute end-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 shadow-xl py-2 z-50 divide-y divide-gray-100 dark:divide-neutral-800"
            >
              <div class="px-4 py-2.5 sm:hidden">
                <div class="text-sm font-semibold text-black dark:text-white">
                  {{ userProfile.name }}
                </div>
                <div class="text-xs text-gray-500 dark:text-neutral-400">{{ userProfile.role }}</div>
              </div>

              <div class="py-1">
                <nuxt-link-locale
                  to="/profile"
                  class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#F0F0F0] dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors"
                  @click="isProfileOpen = false"
                >
                  <Icon name="lucide:user" class="w-4 h-4" />
                  My Profile
                </nuxt-link-locale>
                <nuxt-link-locale
                  to=""
                  class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#F0F0F0] dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors"
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
