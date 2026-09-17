<template>
    <nav class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
        <template v-for="(item, index) in items" :key="index">
            <!-- Chevron separator -->
            <Icon v-if="index > 0" name="lucide:chevron-right" class="w-3.5 h-3.5 shrink-0 text-gray-400" />

            <!-- Current/last item -->
            <span v-if="index === items.length - 1" class="text-black dark:text-white font-medium truncate">
                {{ item.label }}
            </span>

            <!-- Link item -->
            <nuxt-link-locale v-else-if="item.to" :to="item.to"
                class="hover:text-black dark:hover:text-white transition-colors shrink-0">
                {{ item.label }}
            </nuxt-link-locale>

            <!-- Non-link intermediate item -->
            <span v-else class="text-gray-500 shrink-0">
                {{ item.label }}
            </span>
        </template>
    </nav>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/types/shared/VBreadcrumb'

defineProps<{
    items: BreadcrumbItem[]
}>()
</script>