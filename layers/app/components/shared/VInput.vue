<template>
  <div class="space-y-1.5">
    <label
      v-if="label && !isCheckboxLike"
      :for="inputId"
      class="block text-xs font-semibold text-neutral-600 dark:text-neutral-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ms-0.5">*</span>
    </label>

    <!-- Checkbox / Radio -->
    <label
      v-if="isCheckboxLike"
      :for="inputId"
      class="flex items-center gap-3 cursor-pointer group select-none"
      :class="{ 'opacity-50 pointer-events-none': disabled }"
    >
      <input
        :id="inputId"
        :type="type"
        :name="name"
        :value="value"
        v-model="model"
        :disabled="disabled"
        :class="[
          type === 'checkbox' ? 'rounded' : 'rounded-full',
          'w-4 h-4 text-[#3373FF] border-neutral-300 dark:border-[#2A2E38] focus:ring-0 focus:ring-offset-0',
        ]"
      />
      <span
        class="text-sm opacity-90 group-hover:opacity-100 group-hover:text-[#3373FF] transition-colors"
      >
        <slot>{{ label || placeholder }}</slot>
      </span>
    </label>

    <!-- Range -->
    <input
      v-else-if="type === 'range'"
      :id="inputId"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      v-model="model"
      class="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#3373FF]"
    />

    <!-- Textarea -->
    <textarea
      v-else-if="type === 'textarea'"
      :id="inputId"
      :placeholder="placeholder"
      :name="name"
      :rows="rows"
      :disabled="disabled"
      v-model="model"
      :class="fieldClasses"
    />

    <!-- Select -->
    <div v-else-if="type === 'select'" class="relative">
      <select
        :id="inputId"
        :name="name"
        :disabled="disabled"
        v-model="model"
        :class="[
          fieldClasses,
          'appearance-none bg-white dark:bg-[#12141A] cursor-pointer pe-10',
        ]"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <div
        class="absolute inset-y-0 end-4 flex items-center pointer-events-none text-neutral-400"
      ></div>
    </div>

    <!-- Text-like input (text, email, password, number, tel, url, search) -->
    <input
      v-else
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      v-model="model"
      :class="fieldClasses"
    />

    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-neutral-500 dark:text-neutral-400">
      {{ hint }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { InputType, Size, SelectOption } from "~/types/shared/VInput";

const props = withDefaults(
  defineProps<{
    type?: InputType;
    label?: string;
    placeholder?: string;
    name?: string;
    id?: string;
    size?: Size;
    options?: SelectOption[];
    rows?: number;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    value?: string | number;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    hint?: string;
  }>(),
  {
    type: "text",
    size: "md",
    rows: 4,
    disabled: false,
    required: false,
  },
);

const rawModel = defineModel<string | number | boolean | undefined>();

const model = computed({
  get: () => rawModel.value,
  set: (next) => {
    if (
      (props.type === "number" || props.type === "range") &&
      typeof next === "string" &&
      next !== ""
    ) {
      rawModel.value = Number(next);
      return;
    }
    rawModel.value = next;
  },
});

const uid = useId();
const inputId = computed(() => props.id ?? `v-input-${uid}`);

const isCheckboxLike = computed(
  () => props.type === "checkbox" || props.type === "radio",
);

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-3 py-2 text-xs rounded-lg",
  md: "px-4 py-3 text-sm rounded-lg",
  lg: "px-5 py-3.5 text-base rounded-xl",
};

const fieldClasses = computed(() => [
  "w-full border text-[#11141B] dark:text-[#F0F1F4] bg-white dark:bg-[#12141A] placeholder:text-neutral-400 focus:outline-none focus:ring-1 transition-all",
  SIZE_CLASSES[props.size],
  props.error
    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
    : "border-neutral-300 dark:border-[#2A2E38] focus:border-[#3373FF] focus:ring-[#3373FF]",
  props.disabled ? "opacity-50 cursor-not-allowed" : "",
]);
</script>