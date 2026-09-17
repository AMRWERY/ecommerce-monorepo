import type { CartItem, PlacedOrder } from '~/types/cart'

export const useCartStore = defineStore("cart", () => {
  // Drawer visibility
  const isOpen = ref(false);

  // Preloaded sample cart items matching the design
  const items = ref<CartItem[]>([
    {
      id: 1,
      title: "Gradient Graphic T-shirt",
      size: "Large",
      color: "White",
      price: 145,
      quantity: 1,
      image: "/img/prod-01.png",
    },
    {
      id: 2,
      title: "Checkered Shirt",
      size: "Medium",
      color: "Red",
      price: 180,
      quantity: 1,
      image: "/img/prod-02.png",
    },
    {
      id: 3,
      title: "Skinny Fit Jeans",
      size: "Large",
      color: "Blue",
      price: 240,
      quantity: 1,
      image: "/img/prod-03.png",
    },
  ]);

  // Promo and discounts
  const promoCode = ref("");
  const discountPercent = ref(20);
  const deliveryFee = ref(15);

  // Last placed order for the Order Summary confirmation page
  const currentOrder = ref<PlacedOrder | null>(null);

  // Getters
  const count = computed(() => {
    return items.value.reduce((acc, item) => acc + item.quantity, 0);
  });

  const subtotal = computed(() => {
    return items.value.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  });

  const discountAmount = computed(() => {
    if (subtotal.value === 0) return 0;
    return Math.round((subtotal.value * discountPercent.value) / 100);
  });

  const total = computed(() => {
    if (items.value.length === 0) return 0;
    return subtotal.value - discountAmount.value + deliveryFee.value;
  });

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

  const addItem = (item: CartItem) => {
    const existing = items.value.find(
      (i) => i.id === item.id && i.size === item.size && i.color === item.color,
    );
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      items.value.push({ ...item });
    }
  };

  const removeItem = (id: number) => {
    items.value = items.value.filter((i) => i.id !== id);
  };

  const increaseQty = (id: number) => {
    const item = items.value.find((i) => i.id === id);
    if (item) {
      item.quantity++;
    }
  };

  const decreaseQty = (id: number) => {
    const item = items.value.find((i) => i.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        removeItem(id);
      }
    }
  };

  const updateQuantity = (id: number, qty: number) => {
    const item = items.value.find((i) => i.id === id);
    if (item) {
      if (qty <= 0) {
        removeItem(id);
      } else {
        item.quantity = qty;
      }
    }
  };

  const applyPromo = (code: string): { success: boolean; message: string } => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      return { success: false, message: "Please enter a valid promo code" };
    }
    if (normalized === "SHOP20" || normalized === "SAVE20") {
      discountPercent.value = 20;
      promoCode.value = normalized;
      return { success: true, message: "20% discount applied successfully!" };
    }
    if (normalized === "SHOP30" || normalized === "SAVE30") {
      discountPercent.value = 30;
      promoCode.value = normalized;
      return { success: true, message: "30% discount applied successfully!" };
    }
    // General accepted code
    discountPercent.value = 20;
    promoCode.value = normalized;
    return { success: true, message: `Promo code "${normalized}" applied!` };
  };

  const createOrder = (orderData: PlacedOrder) => {
    currentOrder.value = orderData;
    // Keep a copy in localStorage for refresh persistence
    if (import.meta.client) {
      try {
        localStorage.setItem("shopco_last_order", JSON.stringify(orderData));
      } catch {
        // ignore quota / private mode errors
      }
    }
    // Clear cart items upon successful order placement
    items.value = [];
  };

  const clearCart = () => {
    items.value = [];
    promoCode.value = "";
  };

  // Load saved order on client if present
  if (import.meta.client) {
    try {
      const saved = localStorage.getItem("shopco_last_order");
      if (saved && !currentOrder.value) {
        currentOrder.value = JSON.parse(saved);
      }
    } catch {
      // ignore
    }
  }

  return {
    isOpen,
    items,
    promoCode,
    discountPercent,
    deliveryFee,
    currentOrder,
    count,
    subtotal,
    discountAmount,
    total,
    toggle,
    open,
    close,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    updateQuantity,
    applyPromo,
    createOrder,
    clearCart,
  };
});