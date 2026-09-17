<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <page-header title="Dashboard" subtitle="Dashboard" />

    <!-- Top Grid: Sales Target, KPI Cards, and Promo Banner -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- 1. Sales Target Card -->
      <div
        class="lg:col-span-7 bg-white dark:bg-[#1A1D25] border border-neutral-200/80 dark:border-[#2A2E38] rounded-2xl p-5 shadow-sm space-y-4"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-neutral-900 dark:text-white">
            Sales Target
          </h2>
        </div>

        <div class="flex items-baseline justify-between pt-1">
          <div>
            <span class="text-xs text-neutral-400 block mb-1">InProgress</span>
            <span class="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              $231.032,444
            </span>
          </div>
          <div class="text-end">
            <span class="text-xs text-neutral-400 block mb-1">Sales Target</span>
            <span class="text-base sm:text-lg font-bold text-neutral-700 dark:text-neutral-300">
              $500,000,00
            </span>
          </div>
        </div>

        <!-- Target Progress Bar with Thumb -->
        <div class="relative pt-2 pb-1">
          <div class="w-full h-3.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div class="h-full bg-[#3373FF] rounded-full" style="width: 52%" />
          </div>
          <!-- Draggable/Indicator Thumb as in design -->
          <div
            class="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-300 dark:bg-neutral-600 border-2 border-white dark:border-[#1A1D25] shadow-md pointer-events-none"
            style="left: calc(52% - 12px)"
          />
        </div>
      </div>

      <!-- 2. KPI: Total Revenue (Brand Solid Card) -->
      <div
        class="lg:col-span-2 sm:col-span-6 bg-[#3373FF] rounded-2xl p-5 text-white flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs sm:text-sm font-medium text-white/90">Total Revenue</span>
          <Icon name="lucide:arrow-up-right" class="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <div class="mt-4">
          <div class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            $81.000
          </div>
          <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full">
            <Icon name="lucide:trending-up" class="w-3 h-3" />
            + 10.4% <span class="opacity-80 font-normal">from last week</span>
          </div>
        </div>
      </div>

      <!-- 3. KPI: Total Customer -->
      <div
        class="lg:col-span-3 sm:col-span-6 bg-white dark:bg-[#1A1D25] border border-neutral-200/80 dark:border-[#2A2E38] rounded-2xl p-5 flex flex-col justify-between shadow-sm group hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Customer</span>
          <Icon name="lucide:arrow-up-right" class="w-4 h-4 text-neutral-400 group-hover:text-[#3373FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <div class="mt-4">
          <div class="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            5.000
          </div>
          <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <Icon name="lucide:trending-up" class="w-3 h-3" />
            + 1.5% <span class="text-neutral-400 font-normal">from last week</span>
          </div>
        </div>
      </div>

      <!-- 4. Sales Chart Area -->
      <div
        class="lg:col-span-7 bg-white dark:bg-[#1A1D25] border border-neutral-200/80 dark:border-[#2A2E38] rounded-2xl p-5 shadow-sm space-y-4"
      >
        <div class="flex items-center justify-between flex-wrap gap-2">
          <h2 class="text-base font-bold text-neutral-900 dark:text-white">
            Your Sales this year
          </h2>
          <nuxt-link-locale
            to=""
            class="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-[#3373FF] transition-colors"
          >
            Show All
            <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
          </nuxt-link-locale>
        </div>

        <!-- Legend & Badges -->
        <div class="flex flex-wrap items-center gap-4 text-xs">
          <div class="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
            <span class="w-2.5 h-2.5 rounded-sm bg-lime-500" />
            <span>Average Sale Value</span>
          </div>
          <div class="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
            <span class="w-2.5 h-2.5 rounded-sm bg-[#3373FF]" />
            <span>Average item per sale</span>
          </div>
        </div>

        <!-- Average Value Highlight Badges -->
        <div class="flex items-center justify-center gap-3 py-2">
          <div class="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-center">
            <div class="text-[10px] text-neutral-400">Average item per sale</div>
            <div class="text-xs font-bold text-neutral-900 dark:text-white">$231.411,223</div>
          </div>
          <div class="px-3 py-1.5 rounded-xl bg-lime-400 text-neutral-900 text-center shadow-sm">
            <div class="text-[10px] font-medium opacity-80">Average sale value</div>
            <div class="text-xs font-bold">$339,091,688</div>
          </div>
        </div>

        <!-- Vector Wave Chart Illustration -->
        <div class="relative h-44 w-full">
          <svg class="w-full h-full" viewBox="0 0 700 160" preserveAspectRatio="none">
            <!-- Grid Lines -->
            <line x1="0" y1="40" x2="700" y2="40" stroke="currentColor" class="text-neutral-100 dark:text-neutral-800" stroke-dasharray="4 4" />
            <line x1="0" y1="80" x2="700" y2="80" stroke="currentColor" class="text-neutral-100 dark:text-neutral-800" stroke-dasharray="4 4" />
            <line x1="0" y1="120" x2="700" y2="120" stroke="currentColor" class="text-neutral-100 dark:text-neutral-800" stroke-dasharray="4 4" />

            <!-- Vertical indicator line at current month -->
            <line x1="300" y1="10" x2="300" y2="150" stroke="#3373FF" stroke-width="2" />

            <!-- Wave 1 (Green/Lime solid curve) -->
            <path
              d="M0,110 C80,115 150,85 240,105 C310,120 380,85 450,90 C530,95 610,65 700,50"
              fill="none"
              stroke="#84CC16"
              stroke-width="3"
            />

            <!-- Wave 2 (Blue dashed curve) -->
            <path
              d="M0,130 C90,100 160,120 250,90 C320,70 390,110 470,80 C540,60 620,75 700,40"
              fill="none"
              stroke="#3373FF"
              stroke-width="3"
              stroke-dasharray="6 4"
            />
          </svg>

          <!-- Months Bar -->
          <div class="flex justify-between text-[11px] text-neutral-400 mt-1 px-1">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Des</span>
          </div>
        </div>
      </div>

      <!-- 5. Remaining 2 KPI cards + Promo Banner -->
      <div class="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <!-- Total Transactions -->
        <div
          class="bg-white dark:bg-[#1A1D25] border border-neutral-200/80 dark:border-[#2A2E38] rounded-2xl p-5 flex flex-col justify-between shadow-sm group hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Transactions</span>
            <Icon name="lucide:arrow-up-right" class="w-4 h-4 text-neutral-400 group-hover:text-[#3373FF] transition-colors" />
          </div>
          <div class="mt-4">
            <div class="text-2xl sm:text-3xl font-extrabold text-[#3373FF] tracking-tight">
              12.000
            </div>
            <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <Icon name="lucide:trending-up" class="w-3 h-3" />
              + 3.4% <span class="text-neutral-400 font-normal">from last week</span>
            </div>
          </div>
        </div>

        <!-- Total Product -->
        <div
          class="bg-white dark:bg-[#1A1D25] border border-neutral-200/80 dark:border-[#2A2E38] rounded-2xl p-5 flex flex-col justify-between shadow-sm group hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Product</span>
            <Icon name="lucide:arrow-up-right" class="w-4 h-4 text-neutral-400 group-hover:text-[#3373FF] transition-colors" />
          </div>
          <div class="mt-4">
            <div class="text-2xl sm:text-3xl font-extrabold text-[#3373FF] tracking-tight">
              5.000
            </div>
            <div class="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-red-500">
              <Icon name="lucide:trending-down" class="w-3 h-3" />
              - 1.5% <span class="text-neutral-400 font-normal">from last week</span>
            </div>
          </div>
        </div>

        <!-- Banner Card: Increase your sales -->
        <div
          class="sm:col-span-2 rounded-2xl p-6 bg-gradient-to-r from-[#2563EB] to-[#4338CA] text-white shadow-md relative overflow-hidden flex flex-col justify-between min-h-[160px]"
        >
          <!-- Background glow circle -->
          <div class="absolute -end-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div class="relative z-10 space-y-2">
            <h3 class="text-xl font-bold tracking-tight">Increase your sales</h3>
            <p class="text-xs text-blue-100 leading-relaxed max-w-sm">
              Discover the Proven Methods to Skyrocket Your Sales! Unleash the Potential of Your Business and Achieve Remarkable Growth.
            </p>
          </div>

          <div class="relative z-10 pt-4">
            <button
              type="button"
              class="px-5 py-2 rounded-xl bg-white text-[#2563EB] font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Grid: Customer Growth Map + Popular Products Table -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Customer Growth 3 Province -->
      <div
        class="lg:col-span-5 bg-white dark:bg-[#1A1D25] border border-neutral-200/80 dark:border-[#2A2E38] rounded-2xl p-5 shadow-sm space-y-4"
      >
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base font-bold text-neutral-900 dark:text-white">Customer Growth</h2>
            <span class="text-xs text-neutral-400">3 Province</span>
          </div>
          <nuxt-link-locale
            to=""
            class="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-[#3373FF] transition-colors"
          >
            Show All
            <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
          </nuxt-link-locale>
        </div>

        <!-- Province Legend Dots -->
        <div class="flex flex-wrap items-center gap-3 text-xs">
          <div class="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
            <span class="w-2 h-2 rounded-full bg-lime-500" />
            <span>East Java (50%)</span>
          </div>
          <div class="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
            <span class="w-2 h-2 rounded-full bg-[#3373FF]" />
            <span>Kalimantan (30%)</span>
          </div>
          <div class="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
            <span class="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
            <span>Riau (20%)</span>
          </div>
        </div>

        <!-- Stylized Map Mockup -->
        <div class="relative h-56 bg-neutral-100 dark:bg-[#12141A] rounded-xl overflow-hidden flex items-center justify-center border border-neutral-200/60 dark:border-neutral-800">
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#3373FF_1px,transparent_1px)] [background-size:16px_16px]" />
          <!-- Map pins -->
          <div class="absolute top-1/3 start-1/4 flex flex-col items-center">
            <span class="w-3.5 h-3.5 rounded-full bg-[#3373FF] ring-4 ring-[#3373FF]/30 animate-pulse" />
          </div>
          <div class="absolute bottom-1/4 start-1/3 flex flex-col items-center">
            <span class="w-3.5 h-3.5 rounded-full bg-lime-500 ring-4 ring-lime-500/30" />
          </div>
          <div class="absolute bottom-1/3 end-1/3 flex flex-col items-center">
            <span class="w-3.5 h-3.5 rounded-full bg-[#3373FF] ring-4 ring-[#3373FF]/30" />
          </div>
          <span class="text-xs text-neutral-400 font-medium z-10">Regional Performance Map</span>
        </div>
      </div>

      <!-- Product Popular Table -->
      <div
        class="lg:col-span-7 bg-white dark:bg-[#1A1D25] border border-neutral-200/80 dark:border-[#2A2E38] rounded-2xl p-5 shadow-sm space-y-4"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-neutral-900 dark:text-white">Product Popular</h2>
          <nuxt-link-locale
            to=""
            class="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-[#3373FF] transition-colors"
          >
            Show All
            <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
          </nuxt-link-locale>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-start text-xs">
            <thead>
              <tr class="text-neutral-400 border-b border-neutral-100 dark:border-[#2A2E38]">
                <th class="pb-3 font-semibold text-start">Product</th>
                <th class="pb-3 font-semibold text-start">Price</th>
                <th class="pb-3 font-semibold text-start">Sales</th>
                <th class="pb-3 font-semibold text-start">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100 dark:divide-[#2A2E38]">
              <tr
                v-for="(product, idx) in popularProducts"
                :key="idx"
                class="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
              >
                <!-- Product name & thumb -->
                <td class="py-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-200/60 dark:border-neutral-700">
                      <Icon name="lucide:footprints" class="w-5 h-5 text-neutral-500" />
                    </div>
                    <div>
                      <div class="text-[10px] text-neutral-400">{{ product.code }}</div>
                      <div class="font-semibold text-neutral-900 dark:text-white">{{ product.name }}</div>
                    </div>
                  </div>
                </td>

                <!-- Price -->
                <td class="py-3 font-medium text-neutral-700 dark:text-neutral-300">
                  {{ product.price }}
                </td>

                <!-- Sales -->
                <td class="py-3 font-medium text-neutral-700 dark:text-neutral-300">
                  {{ product.sales }}
                </td>

                <!-- Status Pill -->
                <td class="py-3">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                    {{ product.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const popularProducts = [
  {
    code: "031031",
    name: "Kanky Kitadakate (Green)",
    price: "$20.00",
    sales: "3200",
    status: "Success",
  },
  {
    code: "031031",
    name: "Kanky Kitadakate (Green)",
    price: "$20.00",
    sales: "2511",
    status: "Success",
  },
  {
    code: "031031",
    name: "Kanky Kitadakate (Green)",
    price: "$20.00",
    sales: "2111",
    status: "Success",
  },
  {
    code: "031031",
    name: "Kanky Kitadakate (Green)",
    price: "$20.00",
    sales: "1841",
    status: "Success",
  },
];
</script>