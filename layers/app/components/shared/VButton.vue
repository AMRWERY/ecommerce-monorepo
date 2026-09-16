<template>
  <nuxt-link-locale v-if="to !== undefined" :to="to" :class="classes">
    <Icon v-if="loading" name="svg-spinners:180-ring" class="h-4 w-4 shrink-0 animate-spin" />
    <slot />
  </nuxt-link-locale>
  <component v-else :is="tag" :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled || loading : undefined" :aria-disabled="disabled || loading || undefined"
    :class="classes">
    <Icon v-if="loading" name="svg-spinners:180-ring" class="h-4 w-4 shrink-0 animate-spin" />
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { Variant, Color, Size, Shape } from "@/types/shared/VButton";

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
  sm: "text-xs px-3.5 py-1.5 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-base px-8 py-3.5 gap-2.5",
};

const ICON_SIZE_CLASSES: Record<Size, string> = {
  sm: "w-8 h-8 rounded-full p-1.5",
  md: "w-10 h-10 rounded-full p-2",
  lg: "w-12 h-12 rounded-full p-2.5",
};

const SHAPE_CLASSES: Record<Shape, string> = {
  default: "rounded-full",
  pill: "rounded-full",
  rounded: "rounded-xl",
  icon: "rounded-full",
  none: "",
};

const COLOR_CLASSES: Record<Variant, Record<Color, string>> = {
  solid: {
    primary:
      "bg-black text-white hover:bg-neutral-800 active:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:active:bg-neutral-300 shadow-sm",
    dark:
      "bg-black text-white hover:bg-neutral-800 active:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:active:bg-neutral-300",
    neutral:
      "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    light:
      "bg-white text-black hover:bg-neutral-100 active:bg-neutral-200 shadow-sm",
  },
  outline: {
    primary:
      "border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black",
    dark:
      "border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black",
    neutral:
      "border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-200 hover:border-gray-400 dark:hover:border-neutral-500 hover:bg-gray-50 dark:hover:bg-neutral-800",
    danger:
      "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white",
    light:
      "border border-white text-white hover:bg-white/10 active:bg-white/20",
  },
  ghost: {
    primary:
      "text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-800/80",
    dark:
      "text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-800/80",
    neutral:
      "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-800/80",
    danger:
      "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30",
    light:
      "text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20",
  },
  soft: {
    primary:
      "bg-[#F0F0F0] dark:bg-neutral-800 text-black dark:text-white hover:bg-[#E6E6E6] dark:hover:bg-neutral-700",
    dark:
      "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700",
    neutral:
      "bg-[#F0F0F0] dark:bg-[#1A1D25] text-neutral-800 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700",
    danger:
      "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40",
    light:
      "bg-white/10 text-white hover:bg-white/20",
  },
  plain: {
    primary:
      "text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white",
    dark:
      "text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white",
    neutral:
      "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white",
    danger:
      "text-red-600 hover:text-red-700",
    light:
      "text-white/80 hover:text-white",
  },
};

const classes = computed(() => [
  "inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20 select-none",
  props.shape === "icon"
    ? ICON_SIZE_CLASSES[props.size]
    : props.shape === "none"
      ? ""
      : [SIZE_CLASSES[props.size], SHAPE_CLASSES[props.shape]],
  COLOR_CLASSES[props.variant][props.color],
  props.block ? "w-full" : "",
]);
</script>