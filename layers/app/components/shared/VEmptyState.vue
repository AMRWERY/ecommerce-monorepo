<template>
  <div
    :class="[
      'text-center py-12 sm:py-16 px-4 space-y-4 transition-colors',
      bordered
        ? 'border border-gray-200 dark:border-neutral-800 rounded-[20px] bg-white dark:bg-[#1A1D25]'
        : 'bg-[#F0EEED]/40 dark:bg-neutral-800/30 rounded-2xl'
    ]"
  >
    <!-- Icon Slot / Default Icon Container -->
    <slot name="icon">
      <div
        v-if="icon"
        class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#F0EEED] dark:bg-neutral-800 flex items-center justify-center text-gray-400 dark:text-neutral-500 transition-transform duration-300 hover:scale-105"
      >
        <Icon :name="icon" class="w-8 h-8 sm:w-10 sm:h-10 shrink-0" />
      </div>
    </slot>

    <!-- Content: Title & Description -->
    <div class="space-y-1.5">
      <slot name="title">
        <h3 class="font-bold text-lg sm:text-xl text-black dark:text-white tracking-tight">
          {{ title }}
        </h3>
      </slot>
      <slot name="description">
        <p
          v-if="description"
          class="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed"
        >
          {{ description }}
        </p>
      </slot>
    </div>

    <!-- Actions -->
    <div v-if="actionText || $slots.action" class="pt-2 flex items-center justify-center gap-3">
      <slot name="action">
        <LazyVButton
          v-if="actionTo"
          :to="actionTo"
          :variant="actionVariant"
          :color="actionColor"
          shape="pill"
          size="md"
          class="px-8 font-medium text-xs sm:text-sm"
        >
          {{ actionText }}
        </LazyVButton>
        <LazyVButton
          v-else-if="actionText"
          @click="$emit('action')"
          :variant="actionVariant"
          :color="actionColor"
          shape="pill"
          size="sm"
          class="px-6 font-medium text-xs sm:text-sm"
        >
          {{ actionText }}
        </LazyVButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Variant, Color } from '@/types/shared/VButton'

withDefaults(
  defineProps<{
    icon?: string
    title: string
    description?: string
    actionText?: string
    actionTo?: string
    actionVariant?: Variant
    actionColor?: Color
    bordered?: boolean
  }>(),
  {
    icon: 'lucide:package-open',
    description: '',
    actionText: '',
    actionTo: '',
    actionVariant: 'solid',
    actionColor: 'dark',
    bordered: false,
  }
)

defineEmits<{
  (e: 'action'): void
}>()
</script>
