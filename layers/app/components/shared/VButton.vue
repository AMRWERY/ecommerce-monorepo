<template>
  <nuxt-link-locale v-if="to !== undefined" :to="to" :class="classes">
    <Icon v-if="loading" name="svg-spinners:180-ring" class="h-4 w-4" />
    <slot />
  </nuxt-link-locale>
  <component
    v-else
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled || loading : undefined"
    :aria-disabled="disabled || loading || undefined"
    :class="classes"
  >
    <Icon v-if="loading" name="svg-spinners:180-ring" class="h-4 w-4" />
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { Variant, Color, Size, Shape } from "~/types/shared/VButton";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    color?: Color;
    size?: Size;
    shape?: Shape;
    tag?: string;
    to?: string | Record<string, unknown>;
    type?: "button" | "submit" | "reset";
    block?: boolean;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    variant: "solid",
    color: "primary",
    size: "md",
    shape: "default",
    tag: "button",
    type: "button",
    block: false,
    disabled: false,
    loading: false,
  },
);

const SIZE_CLASSES: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5",
  md: "text-sm px-5 py-2.5 rounded-xl gap-2",
  lg: "text-sm px-8 py-3 rounded-xl gap-2",
};

const ICON_SIZE_CLASSES: Record<Size, string> = {
  sm: "w-8 h-8 rounded-full",
  md: "w-9 h-9 rounded-full",
  lg: "w-11 h-11 rounded-full",
};

const COLOR_CLASSES: Record<Variant, Record<Color, string>> = {
  solid: {
    primary:
      "bg-[#3373FF] text-white hover:bg-[#2563EB] shadow-sm hover:shadow-md",
    dark: "bg-[#11141B] text-white hover:bg-neutral-800",
    neutral: "bg-neutral-800 text-white hover:bg-neutral-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  },
  outline: {
    primary:
      "border border-[#3373FF] text-[#3373FF] hover:bg-[#3373FF] hover:text-white",
    dark: "border border-[#11141B] text-[#11141B] dark:border-neutral-300 dark:text-[#F0F1F4] hover:bg-[#11141B] hover:text-white",
    neutral:
      "border border-neutral-200 dark:border-[#2A2E38] text-neutral-700 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-500",
    danger:
      "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
  },
  ghost: {
    primary: "text-[#3373FF] hover:bg-[#3373FF]/10",
    dark: "text-[#11141B]/80 dark:text-[#F0F1F4]/80 hover:text-[#11141B] dark:hover:text-[#F0F1F4] hover:bg-neutral-100 dark:hover:bg-neutral-800",
    neutral:
      "text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800",
    danger: "text-red-500 hover:bg-red-50",
  },
  soft: {
    primary: "bg-[#3373FF]/10 text-[#3373FF] hover:bg-[#3373FF]/20",
    dark: "bg-neutral-100 dark:bg-neutral-800 text-[#11141B] dark:text-[#F0F1F4] hover:bg-neutral-200 dark:hover:bg-neutral-700",
    neutral:
      "bg-[#F6F7F9] dark:bg-[#1A1D25] border border-neutral-200 dark:border-[#2A2E38] text-neutral-800 dark:text-neutral-100 hover:border-[#3373FF]",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  },
  plain: {
    primary: "",
    dark: "",
    neutral: "",
    danger: "",
  },
};

const classes = computed(() => [
  "inline-flex items-center justify-center font-semibold transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3373FF]",
  props.shape === "icon"
    ? ICON_SIZE_CLASSES[props.size]
    : props.shape === "none"
      ? ""
      : [
          SIZE_CLASSES[props.size],
          props.shape === "pill" ? "rounded-full" : "",
        ],
  COLOR_CLASSES[props.variant][props.color],
  props.block ? "w-full" : "",
]);
</script>