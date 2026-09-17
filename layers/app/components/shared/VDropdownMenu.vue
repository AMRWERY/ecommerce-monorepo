<template>
    <div class="relative inline-block" ref="dropdownRef" @keydown.esc="close">
        <!-- Trigger slot or default trigger button -->
        <slot name="trigger" :is-open="isOpen" :toggle="toggle" :close="close" :open="open">
            <button type="button" @click="toggle" :class="[
                'flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors py-2 focus:outline-none select-none',
                triggerClass,
            ]" :aria-expanded="isOpen" :disabled="disabled">
                <span>{{ label }}</span>
                <Icon v-if="arrow" :name="isOpen ? arrowUpIcon : arrowDownIcon"
                    class="w-4 h-4 transition-transform duration-200" />
            </button>
        </slot>

        <!-- Dropdown Menu -->
        <transition enter-active-class="transition duration-150 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-100 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="isOpen" :class="[
                'absolute mt-2 bg-white dark:bg-[#1A1D25] rounded-xl shadow-lg border border-gray-100 dark:border-neutral-800 py-2 z-50',
                placementClass,
                width,
                menuClass,
            ]" role="menu">
                <slot name="header" :close="close" />

                <slot :items="items" :close="close" :is-open="isOpen">
                    <template v-for="(item, idx) in normalizedItems" :key="item.key">
                        <!-- Custom Item Slot -->
                        <slot name="item" :item="item" :close="close" :index="idx">
                            <!-- Router Link / nuxt-link-locale -->
                            <nuxt-link-locale v-if="item.to" :to="item.to" @click="handleSelect(item)" :class="[
                                'flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors',
                                item.disabled ? 'opacity-50 pointer-events-none' : '',
                                item.class,
                            ]" role="menuitem">
                                <Icon v-if="item.icon" :name="item.icon"
                                    class="w-4 h-4 shrink-0 text-gray-500 dark:text-neutral-400" />
                                <span class="flex-1 truncate">{{ item.label }}</span>
                                <span v-if="item.badge"
                                    class="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium">
                                    {{ item.badge }}
                                </span>
                            </nuxt-link-locale>

                            <!-- Plain button item -->
                            <button v-else type="button" @click="handleSelect(item)" :disabled="item.disabled" :class="[
                                'w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors text-start focus:outline-none',
                                item.disabled ? 'opacity-50 cursor-not-allowed' : '',
                                item.class,
                            ]" role="menuitem">
                                <Icon v-if="item.icon" :name="item.icon"
                                    class="w-4 h-4 shrink-0 text-gray-500 dark:text-neutral-400" />
                                <span class="flex-1 truncate">{{ item.label }}</span>
                                <span v-if="item.badge"
                                    class="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium">
                                    {{ item.badge }}
                                </span>
                            </button>
                        </slot>

                        <!-- Divider -->
                        <div v-if="item.divider" class="my-1 border-t border-gray-100 dark:border-neutral-800" />
                    </template>
                </slot>

                <slot name="footer" :close="close" />
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem, DropdownPlacement } from "~/types/shared/VDropdownMenu";

const props = withDefaults(
    defineProps<{
        items?: DropdownMenuItem[];
        label?: string;
        arrow?: boolean;
        arrowUpIcon?: string;
        arrowDownIcon?: string;
        placement?: DropdownPlacement;
        width?: string;
        triggerClass?: string;
        menuClass?: string;
        disabled?: boolean;
        closeOnSelect?: boolean;
        modelValue?: boolean;
    }>(),
    {
        items: () => [],
        label: "",
        arrow: true,
        arrowUpIcon: "material-symbols:keyboard-arrow-up-rounded",
        arrowDownIcon: "material-symbols:keyboard-arrow-down-rounded",
        placement: "start",
        width: "w-52",
        triggerClass: "",
        menuClass: "",
        disabled: false,
        closeOnSelect: true,
        modelValue: undefined,
    },
);

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "update:open", value: boolean): void;
    (e: "select", item: DropdownMenuItem): void;
    (e: "open"): void;
    (e: "close"): void;
}>();

const internalOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const isOpen = computed({
    get: () => (props.modelValue !== undefined ? props.modelValue : internalOpen.value),
    set: (val: boolean) => {
        internalOpen.value = val;
        emit("update:modelValue", val);
        emit("update:open", val);
        if (val) {
            emit("open");
        } else {
            emit("close");
        }
    },
});

const open = () => {
    if (props.disabled) return;
    isOpen.value = true;
};

const close = () => {
    isOpen.value = false;
};

const toggle = () => {
    if (props.disabled) return;
    isOpen.value = !isOpen.value;
};

// Handle click outside using VueUse
onClickOutside(dropdownRef, () => {
    if (isOpen.value) {
        close();
    }
});

const placementClass = computed(() => {
    switch (props.placement) {
        case "end":
            return "end-0";
        case "center":
            return "start-1/2 -translate-x-1/2";
        case "start":
        default:
            return "start-0";
    }
});

interface NormalizedDropdownItem extends DropdownMenuItem {
    key: string | number;
}

const normalizeTo = (to?: string | Record<string, unknown>) => {
    if (typeof to !== 'string') return to;
    const cleaned = to.replace(/^\/(en|ar)(\/.*|$)/, '$2');
    return cleaned || '/';
};

const normalizedItems = computed<NormalizedDropdownItem[]>(() => {
    return props.items.map((item, idx) => ({
        ...item,
        key: item.name ?? item.label ?? idx,
        label: item.label ?? item.name ?? "",
        to: normalizeTo(item.to ?? item.route),
    }));
});

const handleSelect = (item: NormalizedDropdownItem) => {
    if (item.disabled) return;
    if (item.onClick) {
        item.onClick();
    }
    emit("select", item);
    if (props.closeOnSelect) {
        close();
    }
};

defineExpose({
    open,
    close,
    toggle,
    isOpen,
});
</script>