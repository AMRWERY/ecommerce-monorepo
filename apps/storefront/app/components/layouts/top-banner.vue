<template>
    <transition enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in" enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-16 opacity-100" leave-from-class="max-h-16 opacity-100"
        leave-to-class="max-h-0 opacity-0 overflow-hidden">
        <div v-if="isVisible"
            class="bg-black text-white text-xs sm:text-sm py-2.5 px-4 relative flex items-center justify-center font-normal">
            <!-- Centered Announcement Text -->
            <p class="text-center pe-6 sm:pe-0">
                Sign up and get 20% off to your first order.&nbsp;
                <nuxt-link-locale to="/auth/sign-up"
                    class="font-semibold underline underline-offset-4 hover:text-gray-300 transition-colors">
                    Sign Up Now
                </nuxt-link-locale>
            </p>

            <!-- Dismiss Button (Right aligned) -->
            <LazyVButton variant="ghost" color="light" shape="icon" size="sm" @click="dismissBanner"
                class="absolute end-3 sm:end-6 md:end-8" aria-label="Close notification">
                <Icon name="material-symbols:close-small-rounded" class="w-4 h-4 sm:w-5 sm:h-5" />
            </LazyVButton>
        </div>
    </transition>
</template>

<script lang="ts" setup>
const isVisible = ref<boolean>(true)

const dismissBanner = (): void => {
    isVisible.value = false
}
</script>