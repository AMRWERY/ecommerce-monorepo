<template>
    <nav class="border-t border-gray-200 dark:border-neutral-800 mt-12 pt-6 flex items-center justify-between select-none"
        aria-label="Pagination">
        <!-- Previous Button -->
        <button v-if="showPrevNext" type="button" @click="goToPage(modelValue - 1)" :disabled="modelValue <= 1"
            class="flex items-center gap-2 px-3.5 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg text-xs sm:text-sm font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none">
            <Icon name="lucide:arrow-left" class="w-4 h-4 rtl:rotate-180" />
            <span>{{ prevText }}</span>
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center gap-1">
            <template v-for="(item, index) in paginationItems" :key="index">
                <!-- Ellipsis -->
                <span v-if="item === '...'"
                    class="w-9 h-9 flex items-center justify-center text-gray-400 text-sm select-none">
                    ...
                </span>

                <!-- Page Number Button -->
                <button v-else type="button" @click="goToPage(item)" :class="[
                    'w-9 h-9 flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-colors focus:outline-none',
                    modelValue === item
                        ? 'bg-black/10 dark:bg-white/15 text-black dark:text-white font-bold'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
                ]" :aria-current="modelValue === item ? 'page' : undefined">
                    {{ item }}
                </button>
            </template>
        </div>

        <!-- Next Button -->
        <button v-if="showPrevNext" type="button" @click="goToPage(modelValue + 1)"
            :disabled="modelValue >= effectiveTotalPages"
            class="flex items-center gap-2 px-3.5 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg text-xs sm:text-sm font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none">
            <span>{{ nextText }}</span>
            <Icon name="lucide:arrow-right" class="w-4 h-4 rtl:rotate-180" />
        </button>
    </nav>
</template>

<script lang="ts" setup>
import type { PaginationItem } from '@/types/shared/VPagination'

const props = withDefaults(
    defineProps<{
        modelValue?: number
        totalPages?: number
        totalItems?: number
        perPage?: number
        siblingCount?: number
        showPrevNext?: boolean
        prevText?: string
        nextText?: string
    }>(),
    {
        modelValue: 1,
        totalPages: undefined,
        totalItems: undefined,
        perPage: 10,
        siblingCount: 1,
        showPrevNext: true,
        prevText: 'Previous',
        nextText: 'Next',
    }
)

const emit = defineEmits<{
    (e: 'update:modelValue', page: number): void
    (e: 'change', page: number): void
}>()

const effectiveTotalPages = computed(() => {
    if (props.totalPages !== undefined) return Math.max(1, props.totalPages)
    if (props.totalItems !== undefined && props.perPage) {
        return Math.max(1, Math.ceil(props.totalItems / props.perPage))
    }
    return 1
})

const paginationItems = computed<PaginationItem[]>(() => {
    const total = effectiveTotalPages.value
    const current = Math.min(Math.max(1, props.modelValue), total)
    const siblings = props.siblingCount

    // Total page slots to display: 1 (first) + siblings + current + siblings + 1 (last) + 2 (ellipses)
    const totalSlots = siblings * 2 + 5

    if (total <= totalSlots) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(current - siblings, 1)
    const rightSiblingIndex = Math.min(current + siblings, total)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < total - 1

    // Case 1: No left dots, show right dots (start range)
    if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblings
        const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
        return [...leftRange, '...', total]
    }

    // Case 2: Show left dots, no right dots (end range)
    if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblings
        const rightRange = Array.from(
            { length: rightItemCount },
            (_, i) => total - rightItemCount + i + 1
        )
        return [1, '...', ...rightRange]
    }

    // Case 3: Show both left and right dots (middle range)
    const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
    )
    return [1, '...', ...middleRange, '...', total]
})

const goToPage = (page: number) => {
    if (page < 1 || page > effectiveTotalPages.value || page === props.modelValue) return
    emit('update:modelValue', page)
    emit('change', page)
}
</script>