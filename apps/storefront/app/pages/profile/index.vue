<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10">
      <!-- Breadcrumb Navigation -->
      <LazyVBreadcrumb :items="breadcrumbs" />

      <!-- Profile Header Hero -->
      <div
        class="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 mb-8 border border-neutral-800 shadow-lg">
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-center gap-4 sm:gap-6">
            <!-- Avatar with Badge -->
            <div class="relative group shrink-0">
              <div
                class="w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-white/20 bg-neutral-800 flex items-center justify-center text-2xl font-bold uppercase shadow-md">
                <img v-if="user.avatar" :src="user.avatar" :alt="user.firstName" class="w-full h-full object-cover" />
                <span v-else class="text-white text-2xl font-bold">
                  {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                </span>
              </div>
              <button type="button" aria-label="Change Avatar"
                class="absolute bottom-0 end-0 bg-white text-black dark:bg-neutral-800 dark:text-white p-1.5 rounded-full shadow hover:scale-105 transition-transform border border-black/10 dark:border-white/10">
                <Icon name="lucide:camera" class="w-3.5 h-3.5" />
              </button>
            </div>

            <!-- User Bio -->
            <div class="space-y-1">
              <div class="flex items-center gap-2.5 flex-wrap">
                <h1 class="text-xl sm:text-2xl font-black tracking-tight">
                  {{ user.firstName }} {{ user.lastName }}
                </h1>
                <span
                  class="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  <Icon name="lucide:crown" class="w-3 h-3" />
                  {{ user.tier }}
                </span>
              </div>
              <p class="text-sm text-gray-400">{{ user.email }}</p>
              <p class="text-xs text-gray-500">{{ user.memberSince }}</p>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="flex items-center gap-4 sm:gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-800">
            <div class="text-center px-3">
              <div class="text-xl sm:text-2xl font-black text-white">{{ orders.length }}</div>
              <div class="text-xs text-gray-400">Total Orders</div>
            </div>
            <div class="h-8 w-px bg-neutral-800"></div>
            <div class="text-center px-3">
              <div class="text-xl sm:text-2xl font-black text-emerald-400">1</div>
              <div class="text-xs text-gray-400">Active Order</div>
            </div>
            <div class="h-8 w-px bg-neutral-800"></div>
            <div class="text-center px-3">
              <div class="text-xl sm:text-2xl font-black text-rose-400">{{ wishlist.length }}</div>
              <div class="text-xs text-gray-400">Wishlist</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Layout: Navigation Tabs Sidebar + Content Panel -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Sidebar Navigation Menu -->
        <div
          class="lg:col-span-4 xl:col-span-3 bg-[#F9F9F9] dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-2xl p-3 space-y-1">
          <button v-for="tab in tabs" :key="tab.id" type="button" @click="activeTab = tab.id" :class="[
            'w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-start',
            activeTab === tab.id
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
              : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-200/60 dark:hover:bg-neutral-800'
          ]">
            <div class="flex items-center gap-3">
              <Icon :name="tab.icon" class="w-4 h-4 shrink-0" />
              <span>{{ tab.label }}</span>
            </div>
            <span v-if="tab.badge" :class="[
              'text-xs px-2 py-0.5 rounded-full font-bold',
              activeTab === tab.id
                ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black'
                : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300'
            ]">
              {{ tab.badge }}
            </span>
          </button>

          <div class="pt-2 border-t border-gray-200 dark:border-neutral-800 mt-2">
            <nuxt-link-locale to="/auth"
              class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all text-start">
              <Icon name="lucide:log-out" class="w-4 h-4 shrink-0" />
              <span>Sign Out</span>
            </nuxt-link-locale>
          </div>
        </div>

        <!-- Right Content Section -->
        <div
          class="lg:col-span-8 xl:col-span-9 bg-white dark:bg-[#1A1D25] border border-gray-200/80 dark:border-neutral-800 rounded-2xl p-6 sm:p-8">
          <!-- ── TAB 1: PERSONAL INFORMATION ──────────────────────── -->
          <div v-if="activeTab === 'personal'" class="space-y-6">
            <div>
              <h2 class="text-xl font-bold text-black dark:text-white">Personal Information</h2>
              <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
                Update your personal details and contact preferences
              </p>
            </div>

            <form @submit.prevent="savePersonalInfo" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5">First
                    Name</label>
                  <input v-model="userForm.firstName" type="text" required
                    class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5">Last
                    Name</label>
                  <input v-model="userForm.lastName" type="text" required
                    class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5">Email
                    Address</label>
                  <input v-model="userForm.email" type="email" required
                    class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5">Phone
                    Number</label>
                  <input v-model="userForm.phone" type="tel" required
                    class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5">Date of
                    Birth</label>
                  <input v-model="userForm.dateOfBirth" type="date"
                    class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1.5">Gender</label>
                  <select v-model="userForm.gender"
                    class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <!-- Save Notification -->
              <div v-if="saveSuccess"
                class="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
                <Icon name="lucide:check-circle" class="w-4 h-4 shrink-0" />
                <span>Personal details updated successfully!</span>
              </div>

              <div class="pt-3 flex justify-end">
                <LazyVButton type="submit" variant="solid" color="dark" shape="pill" size="md" class="px-8">
                  Save Changes
                </LazyVButton>
              </div>
            </form>
          </div>

          <!-- ── TAB 2: MY ORDERS ─────────────────────────────────── -->
          <div v-else-if="activeTab === 'orders'" class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 class="text-xl font-bold text-black dark:text-white">Order History</h2>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
                  Track and view details of your current and past orders
                </p>
              </div>

              <!-- Orders Filter Pills -->
              <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button v-for="status in orderFilters" :key="status.id" type="button"
                  @click="activeOrderFilter = status.id" :class="[
                    'px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap',
                    activeOrderFilter === status.id
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 hover:bg-gray-200'
                  ]">
                  {{ status.label }}
                </button>
              </div>
            </div>

            <!-- Orders List -->
            <div v-if="filteredOrders.length > 0" class="space-y-4">
              <div v-for="order in filteredOrders" :key="order.orderId"
                class="border border-gray-200 dark:border-neutral-800 rounded-2xl p-5 hover:border-black/20 dark:hover:border-white/20 transition-all bg-white dark:bg-[#16181F]">
                <!-- Order Card Header -->
                <div
                  class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-neutral-800/80">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-sm text-black dark:text-white font-mono">{{ order.orderNumber
                      }}</span>
                      <span :class="[
                        'text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase',
                        getStatusBadgeClass(order.status)
                      ]">
                        {{ order.status }}
                      </span>
                    </div>
                    <span class="text-xs text-gray-400">Placed on {{ order.date }}</span>
                  </div>

                  <div class="text-end">
                    <span class="text-xs text-gray-400 block">Total Amount</span>
                    <span class="font-black text-base text-black dark:text-white">${{ order.total }}</span>
                  </div>
                </div>

                <!-- Items Preview Row -->
                <div class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex items-center gap-3 overflow-x-auto pb-1">
                    <div v-for="item in order.items" :key="item.id"
                      class="relative w-14 h-14 rounded-xl bg-gray-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-gray-200/50 dark:border-neutral-700/50">
                      <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                      <span v-if="item.quantity > 1"
                        class="absolute bottom-0 end-0 bg-black text-white text-[9px] font-bold px-1.5 rounded-tl">
                        ×{{ item.quantity }}
                      </span>
                    </div>
                    <div class="ps-1">
                      <p class="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                        {{ order.items[0]?.title }}
                      </p>
                      <p class="text-xs text-gray-400">
                        {{ order.itemCount }} {{ order.itemCount === 1 ? 'item' : 'items' }}
                      </p>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-2 shrink-0">
                    <LazyVButton :to="`/order-summary?orderId=${order.orderId}`" size="sm" variant="outline"
                      shape="pill" class="text-xs">
                      View Order
                    </LazyVButton>
                    <LazyVButton v-if="order.status === 'processing' || order.status === 'shipped'"
                      :to="`/order-summary?orderId=${order.orderId}`" size="sm" variant="solid" color="dark"
                      shape="pill" class="text-xs">
                      Track
                    </LazyVButton>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty Orders State -->
            <LazyVEmptyState v-else icon="lucide:package-open" title="No orders found"
              description="You haven't placed any orders matching this filter." action-text="Explore Products"
              action-to="/products" action-variant="outline" action-color="dark" />
          </div>

          <!-- ── TAB 3: SAVED ADDRESSES ──────────────────────────── -->
          <div v-else-if="activeTab === 'addresses'" class="space-y-6">
            <div class="flex items-center justify-between gap-4">
              <div>
                <h2 class="text-xl font-bold text-black dark:text-white">Delivery Addresses</h2>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
                  Manage shipping and billing addresses for fast checkout
                </p>
              </div>
              <LazyVButton @click="showAddressForm = !showAddressForm" size="sm" variant="solid" color="dark"
                shape="pill" class="flex items-center gap-1.5">
                <Icon name="lucide:plus" class="w-4 h-4" />
                <span>Add Address</span>
              </LazyVButton>
            </div>

            <!-- Add Address Form (Expandable) -->
            <div v-if="showAddressForm"
              class="border border-gray-200 dark:border-neutral-800 rounded-2xl p-5 bg-[#FAFAFA] dark:bg-neutral-900/50 space-y-4">
              <h3 class="text-sm font-bold text-black dark:text-white">New Delivery Address</h3>
              <form @submit.prevent="addAddress" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Label (e.g.
                      Home, Office)</label>
                    <input v-model="newAddress.label" type="text" required placeholder="Home"
                      class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Recipient
                      Name</label>
                    <input v-model="newAddress.recipientName" type="text" required placeholder="Alex Morgan"
                      class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Phone
                      Number</label>
                    <input v-model="newAddress.phone" type="tel" required placeholder="+1 (555) 234-5678"
                      class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Street
                      Address</label>
                    <input v-model="newAddress.street" type="text" required placeholder="742 Evergreen Terrace"
                      class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">City</label>
                    <input v-model="newAddress.city" type="text" required placeholder="Springfield"
                      class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Postal
                      Code</label>
                    <input v-model="newAddress.postalCode" type="text" required placeholder="97477"
                      class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Country</label>
                    <input v-model="newAddress.country" type="text" required placeholder="United States"
                      class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                  </div>
                </div>

                <div class="flex items-center gap-2 pt-1">
                  <input id="isDefault" v-model="newAddress.isDefault" type="checkbox"
                    class="rounded text-black focus:ring-black dark:text-white" />
                  <label for="isDefault" class="text-xs font-medium text-gray-700 dark:text-neutral-300">
                    Set as default shipping address
                  </label>
                </div>

                <div class="flex items-center justify-end gap-2 pt-2">
                  <LazyVButton @click="showAddressForm = false" type="button" size="sm" variant="ghost">
                    Cancel
                  </LazyVButton>
                  <LazyVButton type="submit" size="sm" variant="solid" color="dark" shape="pill">
                    Save Address
                  </LazyVButton>
                </div>
              </form>
            </div>

            <!-- Address Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="addr in addresses" :key="addr.id" :class="[
                'border rounded-2xl p-5 relative transition-all',
                addr.isDefault
                  ? 'border-black dark:border-white bg-neutral-50/50 dark:bg-neutral-800/30'
                  : 'border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700'
              ]">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:map-pin" class="w-4 h-4 text-black dark:text-white" />
                    <span class="font-bold text-sm text-black dark:text-white">{{ addr.label }}</span>
                  </div>
                  <span v-if="addr.isDefault"
                    class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black uppercase">
                    Default
                  </span>
                </div>

                <div class="space-y-1 text-xs text-gray-600 dark:text-neutral-400">
                  <p class="font-semibold text-black dark:text-white">{{ addr.recipientName }}</p>
                  <p>{{ addr.street }}</p>
                  <p>{{ addr.city }}, {{ addr.postalCode }}</p>
                  <p>{{ addr.country }}</p>
                  <p class="pt-1 text-gray-500">{{ addr.phone }}</p>
                </div>

                <div
                  class="flex items-center justify-between pt-4 mt-3 border-t border-gray-100 dark:border-neutral-800/80">
                  <button v-if="!addr.isDefault" type="button" @click="setDefaultAddress(addr.id)"
                    class="text-xs font-semibold text-black dark:text-white hover:underline">
                    Set as Default
                  </button>
                  <span v-else class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Default Address</span>

                  <button type="button" @click="deleteAddress(addr.id)"
                    class="text-xs text-rose-500 hover:text-rose-700 font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ── TAB 4: PAYMENT METHODS ──────────────────────────── -->
          <div v-else-if="activeTab === 'payment'" class="space-y-6">
            <div class="flex items-center justify-between gap-4">
              <div>
                <h2 class="text-xl font-bold text-black dark:text-white">Payment Methods</h2>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
                  Saved cards and wallets for seamless checkout
                </p>
              </div>
              <LazyVButton @click="showCardForm = !showCardForm" size="sm" variant="solid" color="dark" shape="pill"
                class="flex items-center gap-1.5">
                <Icon name="lucide:plus" class="w-4 h-4" />
                <span>Add Card</span>
              </LazyVButton>
            </div>

            <!-- Add Card Form (Expandable) -->
            <div v-if="showCardForm"
              class="border border-gray-200 dark:border-neutral-800 rounded-2xl p-5 bg-[#FAFAFA] dark:bg-neutral-900/50 space-y-4">
              <h3 class="text-sm font-bold text-black dark:text-white">Add Credit or Debit Card</h3>
              <form @submit.prevent="addPaymentMethod" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Cardholder
                    Name</label>
                  <input v-model="newCard.cardHolder" type="text" required placeholder="Alex Morgan"
                    class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Card
                    Number</label>
                  <input v-model="newCard.cardNumber" type="text" required placeholder="4242 •••• •••• 4242"
                    maxlength="19"
                    class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Expiry
                      Date</label>
                    <input v-model="newCard.expiry" type="text" required placeholder="MM/YY" maxlength="5"
                      class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">CVV</label>
                    <input v-model="newCard.cvv" type="password" required placeholder="123" maxlength="4"
                      class="w-full bg-white dark:bg-neutral-800 text-sm rounded-xl px-3.5 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none" />
                  </div>
                </div>

                <div class="flex items-center justify-end gap-2 pt-2">
                  <LazyVButton @click="showCardForm = false" type="button" size="sm" variant="ghost">
                    Cancel
                  </LazyVButton>
                  <LazyVButton type="submit" size="sm" variant="solid" color="dark" shape="pill">
                    Save Card
                  </LazyVButton>
                </div>
              </form>
            </div>

            <!-- Cards List -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="card in paymentMethods" :key="card.id"
                class="rounded-2xl p-5 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black text-white relative shadow-md border border-neutral-700/50">
                <div class="flex items-center justify-between mb-8">
                  <div class="flex items-center gap-2">
                    <Icon :name="card.type === 'visa' ? 'logos:visa' : 'logos:mastercard'"
                      class="w-10 h-6 object-contain" />
                    <span class="text-xs font-bold uppercase tracking-wider text-gray-400">{{ card.type }}</span>
                  </div>
                  <span v-if="card.isDefault"
                    class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white uppercase">
                    Default
                  </span>
                </div>

                <div class="font-mono text-lg tracking-widest mb-4">
                  •••• •••• •••• {{ card.last4 }}
                </div>

                <div class="flex items-center justify-between text-xs text-gray-400">
                  <div>
                    <span class="block text-[10px] uppercase tracking-wider text-gray-500">Cardholder</span>
                    <span class="font-bold text-white uppercase">{{ card.cardHolder }}</span>
                  </div>
                  <div>
                    <span class="block text-[10px] uppercase tracking-wider text-gray-500">Expires</span>
                    <span class="font-bold text-white">{{ card.expiry }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── TAB 5: WISHLIST ─────────────────────────────────── -->
          <div v-else-if="activeTab === 'wishlist'" class="space-y-6">
            <div class="flex items-center justify-between gap-4">
              <div>
                <h2 class="text-xl font-bold text-black dark:text-white">Saved Items</h2>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
                  Your curated favorite styles ready to be added to cart
                </p>
              </div>
              <span class="text-xs font-bold text-gray-400">{{ wishlist.length }} items</span>
            </div>

            <!-- Wishlist Items Grid -->
            <div v-if="wishlist.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="item in wishlist" :key="item.id"
                class="flex items-center gap-4 border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 bg-white dark:bg-[#16181F] hover:border-black/20 dark:hover:border-white/20 transition-all">
                <div
                  class="w-20 h-20 rounded-xl bg-gray-100 dark:bg-neutral-800 overflow-hidden shrink-0 border border-gray-100 dark:border-neutral-700">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                </div>

                <div class="flex-1 min-w-0">
                  <nuxt-link-locale :to="item.route"
                    class="font-bold text-sm text-black dark:text-white hover:underline truncate block">
                    {{ item.title }}
                  </nuxt-link-locale>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="font-bold text-sm text-black dark:text-white">${{ item.price }}</span>
                    <span v-if="item.originalPrice" class="text-xs text-gray-400 line-through">
                      ${{ item.originalPrice }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2 mt-3">
                    <button type="button" @click="addToCartFromWishlist(item)"
                      class="px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5">
                      <Icon name="lucide:shopping-bag" class="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button type="button" @click="removeFromWishlist(item.id)"
                      class="text-xs text-rose-500 hover:text-rose-700 font-medium px-2 py-1">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty Wishlist -->
            <LazyVEmptyState v-else icon="material-symbols:favorite-outline" title="Your wishlist is empty"
              description="Save items you love to keep an eye on them or buy later." action-text="Discover Styles"
              action-to="/products" action-variant="outline" action-color="dark" />
          </div>

          <!-- ── TAB 6: SECURITY & NOTIFICATIONS ─────────────────── -->
          <div v-else-if="activeTab === 'security'" class="space-y-8">
            <!-- Password Section -->
            <div class="space-y-4">
              <div>
                <h2 class="text-xl font-bold text-black dark:text-white">Security & Password</h2>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
                  Manage your credentials and sign-in protection
                </p>
              </div>

              <form @submit.prevent="updatePassword" class="space-y-4 max-w-lg">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Current
                    Password</label>
                  <input v-model="securityForm.currentPassword" type="password" required
                    class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">New
                    Password</label>
                  <input v-model="securityForm.newPassword" type="password" required
                    class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-1">Confirm New
                    Password</label>
                  <input v-model="securityForm.confirmPassword" type="password" required
                    class="w-full bg-[#F0F0F0] dark:bg-neutral-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none" />
                </div>
                <div v-if="passwordSuccess"
                  class="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                  <Icon name="lucide:check-circle" class="w-4 h-4" />
                  <span>Password updated successfully!</span>
                </div>
                <LazyVButton type="submit" size="sm" variant="solid" color="dark" shape="pill">
                  Update Password
                </LazyVButton>
              </form>
            </div>

            <div class="h-px bg-gray-100 dark:bg-neutral-800"></div>

            <!-- Notifications Section -->
            <div class="space-y-4">
              <div>
                <h3 class="text-base font-bold text-black dark:text-white">Notification Preferences</h3>
                <p class="text-xs text-gray-500 dark:text-neutral-400">Choose how and when you want to hear from us</p>
              </div>

              <div class="space-y-3">
                <label
                  class="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 dark:border-neutral-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800/40">
                  <div>
                    <span class="block text-xs font-bold text-black dark:text-white">Order Status Alerts</span>
                    <span class="text-xs text-gray-400">Receive real-time tracking updates via email</span>
                  </div>
                  <input v-model="notifications.orderUpdates" type="checkbox"
                    class="rounded text-black focus:ring-black" />
                </label>

                <label
                  class="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 dark:border-neutral-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800/40">
                  <div>
                    <span class="block text-xs font-bold text-black dark:text-white">Exclusive Offers &
                      Promotions</span>
                    <span class="text-xs text-gray-400">Get early access to flash sales and seasonal drops</span>
                  </div>
                  <input v-model="notifications.promotions" type="checkbox"
                    class="rounded text-black focus:ring-black" />
                </label>

                <label
                  class="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 dark:border-neutral-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800/40">
                  <div>
                    <span class="block text-xs font-bold text-black dark:text-white">New Arrivals Digest</span>
                    <span class="text-xs text-gray-400">Weekly curations of latest street fashion trends</span>
                  </div>
                  <input v-model="notifications.newArrivals" type="checkbox"
                    class="rounded text-black focus:ring-black" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@types/shared/VBreadcrumb'
import type { UserProfile, UserAddress, UserPaymentMethod, ProfileOrder, WishlistItem } from '@/types/profile'

const localePath = useLocalePath()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Breadcrumbs
const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Account' },
  { label: 'Profile' },
])

// Tabs
const activeTab = ref('personal')
const tabs = computed(() => [
  { id: 'personal', label: 'Personal Details', icon: 'lucide:user' },
  { id: 'orders', label: 'My Orders', icon: 'lucide:package', badge: orders.value.length },
  { id: 'addresses', label: 'Addresses', icon: 'lucide:map-pin' },
  { id: 'payment', label: 'Payment Methods', icon: 'lucide:credit-card' },
  { id: 'wishlist', label: 'Wishlist', icon: 'material-symbols:favorite-outline', badge: wishlist.value.length },
  { id: 'security', label: 'Security & Alerts', icon: 'lucide:shield-check' },
])

// User State
const user = ref<UserProfile>({
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 382-9910',
  dateOfBirth: '1995-06-15',
  gender: 'male',
  memberSince: 'Member since Nov 2024',
  tier: 'Gold Member',
})

const userForm = reactive({ ...user.value })
const saveSuccess = ref(false)

const savePersonalInfo = () => {
  Object.assign(user.value, userForm)
  saveSuccess.value = true
  setTimeout(() => {
    saveSuccess.value = false
  }, 3500)
}

// Orders State
const activeOrderFilter = ref('all')
const orderFilters = [
  { id: 'all', label: 'All' },
  { id: 'processing', label: 'Processing' },
  { id: 'shipped', label: 'In Transit' },
  { id: 'delivered', label: 'Delivered' },
]

const orders = ref<ProfileOrder[]>([
  {
    orderId: 'ORD-94821',
    orderNumber: '#ORD-94821',
    date: 'Sep 16, 2026',
    status: 'processing',
    total: 260,
    itemCount: 2,
    items: [
      { id: 1, title: 'Gradient Graphic T-shirt', image: '/img/prod-01.png', price: 145, quantity: 1, size: 'Large', color: '#06CAF5' },
      { id: 2, title: 'Skinny Fit Jeans', image: '/img/prod-02.png', price: 115, quantity: 1, size: 'Large', color: '#0000FF' },
    ],
  },
  {
    orderId: 'ORD-88231',
    orderNumber: '#ORD-88231',
    date: 'Aug 28, 2026',
    status: 'delivered',
    total: 180,
    itemCount: 1,
    items: [
      { id: 3, title: 'Checkered Shirt', image: '/img/prod-03.png', price: 180, quantity: 1, size: 'Medium', color: '#F50606' },
    ],
  },
  {
    orderId: 'ORD-77194',
    orderNumber: '#ORD-77194',
    date: 'Jul 14, 2026',
    status: 'delivered',
    total: 342,
    itemCount: 3,
    items: [
      { id: 4, title: 'Sleeve Striped T-shirt', image: '/img/prod-04.png', price: 130, quantity: 1, size: 'Large', color: '#F57906' },
      { id: 5, title: 'Vertical Striped Shirt', image: '/img/prod-07.png', price: 212, quantity: 1, size: 'X-Large', color: '#FFFFFF' },
    ],
  },
])

const filteredOrders = computed(() => {
  if (activeOrderFilter.value === 'all') return orders.value
  return orders.value.filter(o => o.status === activeOrderFilter.value)
})

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
    case 'shipped':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300'
    case 'processing':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
    case 'cancelled':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-neutral-300'
  }
}

// Addresses State
const showAddressForm = ref(false)
const addresses = ref<UserAddress[]>([
  {
    id: 'addr-1',
    label: 'Home (Default)',
    recipientName: 'Alex Morgan',
    phone: '+1 (555) 382-9910',
    street: '742 Evergreen Terrace, Apt 4B',
    city: 'Springfield',
    postalCode: '97477',
    country: 'United States',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Office',
    recipientName: 'Alex Morgan',
    phone: '+1 (555) 382-9910',
    street: '100 Silicon Way, Suite 300',
    city: 'San Francisco',
    postalCode: '94107',
    country: 'United States',
    isDefault: false,
  },
])

const newAddress = reactive({
  label: '',
  recipientName: '',
  phone: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
  isDefault: false,
})

const addAddress = () => {
  const id = `addr-${Date.now()}`
  if (newAddress.isDefault) {
    addresses.value.forEach(a => { a.isDefault = false })
  }
  addresses.value.push({
    id,
    ...newAddress,
  })
  showAddressForm.value = false
  // Reset
  newAddress.label = ''
  newAddress.recipientName = ''
  newAddress.phone = ''
  newAddress.street = ''
  newAddress.city = ''
  newAddress.postalCode = ''
  newAddress.country = ''
  newAddress.isDefault = false
}

const setDefaultAddress = (id: string) => {
  addresses.value.forEach(a => {
    a.isDefault = a.id === id
  })
}

const deleteAddress = (id: string) => {
  addresses.value = addresses.value.filter(a => a.id !== id)
}

// Payment Methods
const showCardForm = ref(false)
const paymentMethods = ref<UserPaymentMethod[]>([
  {
    id: 'pm-1',
    type: 'visa',
    cardHolder: 'ALEX MORGAN',
    last4: '4242',
    expiry: '08/28',
    isDefault: true,
  },
  {
    id: 'pm-2',
    type: 'mastercard',
    cardHolder: 'ALEX MORGAN',
    last4: '8819',
    expiry: '11/27',
    isDefault: false,
  },
])

const newCard = reactive({
  cardHolder: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
})

const addPaymentMethod = () => {
  const last4 = newCard.cardNumber.replace(/\s+/g, '').slice(-4) || '1234'
  paymentMethods.value.push({
    id: `pm-${Date.now()}`,
    type: 'visa',
    cardHolder: newCard.cardHolder.toUpperCase(),
    last4,
    expiry: newCard.expiry,
    isDefault: false,
  })
  showCardForm.value = false
  newCard.cardHolder = ''
  newCard.cardNumber = ''
  newCard.expiry = ''
  newCard.cvv = ''
}

// Wishlist State
const wishlist = computed(() => wishlistStore.items)

const addToCartFromWishlist = (item: WishlistItem) => {
  cartStore.addItem({
    id: Number(item.id),
    title: item.title,
    price: item.price,
    image: item.image,
    size: 'Large',
    color: '#000000',
    quantity: 1,
  })
}

const removeFromWishlist = (id: string | number) => {
  wishlistStore.removeItem(id)
}

// Security & Password Form
const securityForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const passwordSuccess = ref(false)

const updatePassword = () => {
  passwordSuccess.value = true
  securityForm.currentPassword = ''
  securityForm.newPassword = ''
  securityForm.confirmPassword = ''
  setTimeout(() => {
    passwordSuccess.value = false
  }, 3500)
}

// Notifications
const notifications = reactive({
  orderUpdates: true,
  promotions: true,
  newArrivals: false,
})

useHead({
  title: 'My Account — SHOP.CO',
  meta: [{ name: 'description', content: 'Profile for your purchases at SHOP.CO.' }],
})
</script>