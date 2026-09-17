<template>
  <div>
    <!-- Mobile Backdrop -->
    <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isMobileSidebarOpen" class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        @click="closeMobileSidebar" />
    </Transition>

    <!-- Sidebar Container -->
    <aside
      class="fixed inset-y-0 z-50 flex flex-col bg-white dark:bg-[#12141A] transition-all duration-300 ease-in-out"
      :class="[
        // Positioning: right-0 in RTL, left-0 in LTR
        isRtl ? 'right-0 border-l' : 'left-0 border-r',
        'border-neutral-200/80 dark:border-[#2A2E38]',
        // Mobile drawer classes
        isMobileSidebarOpen
          ? 'translate-x-0'
          : (isRtl ? 'translate-x-full' : '-translate-x-full') + ' lg:translate-x-0',
        // Desktop width classes
        isSidebarCollapsed ? 'w-20' : 'w-64',
      ]">
      <!-- 1. Header: Logo & Collapse Action -->
      <div class="flex items-center justify-between h-20 px-5 border-b border-neutral-100 dark:border-[#1E222D]"
        :class="isSidebarCollapsed ? 'justify-center px-2' : ''">
        <!-- Logo / Brand -->
        <nuxt-link-locale to="/" class="flex items-center gap-3 group overflow-hidden select-none">
          <!-- Modern Geometric Logo (as in design) -->
          <div class="relative w-8 h-8 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 transition-transform duration-300 group-hover:scale-105">
              <!-- Facet 1: Blue brand -->
              <path d="M18 4L31 29H5L18 4Z" fill="#3373FF" />
              <!-- Facet 2: Yellow accent -->
              <path d="M18 4L5 29L12 29L18 17L18 4Z" fill="#FBBF24" />
              <!-- Facet 3: Green accent -->
              <path d="M18 17L12 29H24L18 17Z" fill="#10B981" opacity="0.9" />
            </svg>
          </div>

          <span v-if="!isSidebarCollapsed" class="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Culters
          </span>
        </nuxt-link-locale>

        <!-- Sidebar Collapse Button (Desktop) -->
        <button v-if="!isSidebarCollapsed" type="button"
          class="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-[#1A1D25] transition-colors"
          title="Collapse sidebar" @click="toggleSidebarCollapse">
          <Icon :name="isRtl ? 'lucide:panel-right-close' : 'lucide:panel-left-close'" class="w-5 h-5" />
        </button>

        <!-- Mobile Close Button -->
        <button type="button"
          class="flex lg:hidden items-center justify-center w-8 h-8 rounded-lg text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-[#1A1D25]"
          @click="closeMobileSidebar">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>

      <!-- 2. Scrollable Body -->
      <div class="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-thin">
        <!-- Section: GENERAL -->
        <div>
          <div v-if="!isSidebarCollapsed"
            class="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            General
          </div>

          <nav class="space-y-1">
            <!-- Dashboard Item -->
            <nuxt-link-locale to="/"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors" :class="isRouteActive('/')
                  ? 'bg-[#EBF2FF] dark:bg-[#3373FF]/15 text-[#3373FF] font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-[#1A1D25]'
                " :title="isSidebarCollapsed ? 'Dashboard' : undefined">
              <Icon name="lucide:layout-grid" class="w-5 h-5 shrink-0"
                :class="isRouteActive('/') ? 'text-[#3373FF]' : 'text-neutral-500 dark:text-neutral-400'" />
              <span v-if="!isSidebarCollapsed" class="truncate">Dashboard</span>
            </nuxt-link-locale>

            <!-- Product Item (Collapsible Accordion with Tree Items) -->
            <div>
              <button type="button"
                class="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                :class="isProductActive
                    ? 'text-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-[#1A1D25]'
                  " @click="isProductExpanded = !isProductExpanded"
                :title="isSidebarCollapsed ? 'Product (119)' : undefined">
                <div class="flex items-center gap-3 min-w-0">
                  <Icon name="lucide:package" class="w-5 h-5 shrink-0 text-neutral-500 dark:text-neutral-400" />
                  <span v-if="!isSidebarCollapsed" class="truncate">Product (119)</span>
                </div>
                <Icon v-if="!isSidebarCollapsed" name="lucide:chevron-down"
                  class="w-4 h-4 text-neutral-400 transition-transform duration-200"
                  :class="isProductExpanded ? 'rotate-180' : ''" />
              </button>

              <!-- Nested Submenu with Visual Tree Guide Lines -->
              <div v-if="!isSidebarCollapsed && isProductExpanded"
                class="mt-1 space-y-1"
                :class="isRtl ? 'me-6 pe-4 border-r-2 border-neutral-200 dark:border-[#2A2E38]' : 'ms-6 ps-4 border-l-2 border-neutral-200 dark:border-[#2A2E38]'">
                <nuxt-link-locale v-for="subItem in productSubcategories" :key="subItem.title" :to="subItem.to"
                  class="relative block py-1.5 px-2 text-sm rounded-lg transition-colors" :class="isRouteActive(subItem.to)
                      ? 'text-[#3373FF] font-semibold bg-[#EBF2FF]/60 dark:bg-[#3373FF]/10'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#1A1D25]'
                    ">
                  <!-- Tree connector tick -->
                  <span class="absolute top-1/2 -translate-y-1/2 w-3.5 h-0.5 bg-neutral-200 dark:bg-[#2A2E38]"
                    :class="isRtl ? '-right-4' : '-left-4'" />
                  {{ subItem.title }}
                </nuxt-link-locale>
              </div>
            </div>

            <!-- Transaction Item -->
            <nuxt-link-locale to=""
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors" :class="isRouteActive('')
                  ? 'bg-[#EBF2FF] dark:bg-[#3373FF]/15 text-[#3373FF] font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-[#1A1D25]'
                " :title="isSidebarCollapsed ? 'Transaction (441)' : undefined">
              <Icon name="lucide:receipt" class="w-5 h-5 shrink-0"
                :class="isRouteActive('') ? 'text-[#3373FF]' : 'text-neutral-500 dark:text-neutral-400'" />
              <span v-if="!isSidebarCollapsed" class="truncate">Transaction (441)</span>
            </nuxt-link-locale>

            <!-- Customers Item -->
            <nuxt-link-locale to="/customers"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors" :class="isRouteActive('/customers')
                  ? 'bg-[#EBF2FF] dark:bg-[#3373FF]/15 text-[#3373FF] font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-[#1A1D25]'
                " :title="isSidebarCollapsed ? 'Customers' : undefined">
              <Icon name="lucide:users" class="w-5 h-5 shrink-0"
                :class="isRouteActive('/customers') ? 'text-[#3373FF]' : 'text-neutral-500 dark:text-neutral-400'" />
              <span v-if="!isSidebarCollapsed" class="truncate">Customers</span>
            </nuxt-link-locale>

            <!-- Sales Report Item -->
            <nuxt-link-locale to=""
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors" :class="isRouteActive('')
                  ? 'bg-[#EBF2FF] dark:bg-[#3373FF]/15 text-[#3373FF] font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-[#1A1D25]'
                " :title="isSidebarCollapsed ? 'Sales Report' : undefined">
              <Icon name="lucide:trending-up" class="w-5 h-5 shrink-0"
                :class="isRouteActive('') ? 'text-[#3373FF]' : 'text-neutral-500 dark:text-neutral-400'" />
              <span v-if="!isSidebarCollapsed" class="truncate">Sales Report</span>
            </nuxt-link-locale>
          </nav>
        </div>

        <!-- Section: TOOLS -->
        <div>
          <div v-if="!isSidebarCollapsed"
            class="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Tools
          </div>

          <nav class="space-y-1">
            <!-- Account & Settings -->
            <nuxt-link-locale to=""
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors" :class="isRouteActive('/settings')
                  ? 'bg-[#EBF2FF] dark:bg-[#3373FF]/15 text-[#3373FF] font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-[#1A1D25]'
                " :title="isSidebarCollapsed ? 'Account & Settings' : undefined">
              <Icon name="lucide:settings" class="w-5 h-5 shrink-0"
                :class="isRouteActive('/settings') ? 'text-[#3373FF]' : 'text-neutral-500 dark:text-neutral-400'" />
              <span v-if="!isSidebarCollapsed" class="truncate">Account & Settings</span>
            </nuxt-link-locale>

            <!-- Help -->
            <nuxt-link-locale to=""
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors" :class="isRouteActive('')
                  ? 'bg-[#EBF2FF] dark:bg-[#3373FF]/15 text-[#3373FF] font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-[#1A1D25]'
                " :title="isSidebarCollapsed ? 'Help' : undefined">
              <Icon name="lucide:help-circle" class="w-5 h-5 shrink-0"
                :class="isRouteActive('') ? 'text-[#3373FF]' : 'text-neutral-500 dark:text-neutral-400'" />
              <span v-if="!isSidebarCollapsed" class="truncate">Help</span>
            </nuxt-link-locale>
          </nav>
        </div>
      </div>

      <!-- 3. Bottom User Profile Card -->
      <div class="p-4 border-t border-neutral-100 dark:border-[#1E222D]"
        :class="isSidebarCollapsed ? 'px-2 flex justify-center' : ''">
        <div
          class="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-[#1A1D25] transition-colors cursor-pointer"
          :class="isSidebarCollapsed ? 'justify-center p-1' : 'justify-between'">
          <div class="flex items-center gap-3 min-w-0">
            <!-- User Avatar -->
            <div class="relative w-9 h-9 shrink-0">
              <img :src="userProfile.avatar" :alt="userProfile.name"
                class="w-full h-full rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700" />
              <span
                class="absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#12141A]" />
            </div>

            <!-- Name and Role -->
            <div v-if="!isSidebarCollapsed" class="min-w-0">
              <div class="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                {{ userProfile.name }}
              </div>
              <div class="text-xs text-neutral-400 truncate">
                {{ userProfile.role }}
              </div>
            </div>
          </div>

          <!-- Chevron dropdown icon -->
          <Icon v-if="!isSidebarCollapsed" name="lucide:chevron-down" class="w-4 h-4 text-neutral-400 shrink-0" />
        </div>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");

const {
  isSidebarCollapsed,
  isMobileSidebarOpen,
  userProfile,
  toggleSidebarCollapse,
  closeMobileSidebar,
} = useAdminLayout();

// Subcategories for Product item matching design
const isProductExpanded = ref(true);

const productSubcategories = [
  { title: "Sneakers", to: "" },
  { title: "Jacket", to: "" },
  { title: "T-Shirt", to: "" },
  { title: "Bag", to: "" },
];

const isRouteActive = (targetPath: string) => {
  const current = route.path.replace(/\/$/, "");
  const target = targetPath.replace(/\/$/, "");
  if (target === "" || target === "/") {
    return current === "" || current === "/" || current.endsWith("/en") || current.endsWith("/ar");
  }
  return current.includes(target);
};

const isProductActive = computed(() => {
  return route.path.includes("");
});

// Close mobile sidebar on route change
watch(
  () => route.path,
  () => {
    closeMobileSidebar();
  }
);
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.4);
  border-radius: 9999px;
}
</style>