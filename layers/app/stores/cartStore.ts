export const useCartStore = defineStore("cart", () => {
  // State
  const isOpen = ref(false);
  const count = ref(2);

  // Actions
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const add = () => {
    count.value++;
  };

  return {
    isOpen,
    count,
    toggle,
    open,
    close,
    add,
  };
});
