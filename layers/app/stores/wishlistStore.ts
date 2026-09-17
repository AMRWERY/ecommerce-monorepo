import type { Product } from "@/types/shared/VProductCard";

export const useWishlistStore = defineStore("wishlist", () => {
  const items = ref<Product[]>([
    {
      id: 2,
      title: "Polo with Tipping Details",
      price: 180,
      rating: 4.5,
      image: "/img/prod-02.png",
      route: "/products/2",
    },
    {
      id: 5,
      title: "Checkered Casual Shirt",
      price: 180,
      rating: 4.5,
      image: "/img/prod-05.png",
      route: "/products/5",
    },
  ]);

  // Load from localStorage on client
  if (import.meta.client) {
    try {
      const saved = localStorage.getItem("shopco_wishlist");
      if (saved) {
        items.value = JSON.parse(saved);
      }
    } catch {
      // ignore JSON parse error
    }
  }

  const persist = () => {
    if (import.meta.client) {
      try {
        localStorage.setItem("shopco_wishlist", JSON.stringify(items.value));
      } catch {
        // ignore storage error
      }
    }
  };

  const count = computed(() => items.value.length);

  const hasItem = (id: number | string): boolean => {
    return items.value.some((item) => String(item.id) === String(id));
  };

  const addItem = (product: Product) => {
    if (!hasItem(product.id)) {
      items.value.unshift({ ...product });
      persist();
    }
  };

  const removeItem = (id: number | string) => {
    items.value = items.value.filter((item) => String(item.id) !== String(id));
    persist();
  };

  const toggleItem = (product: Product): boolean => {
    if (hasItem(product.id)) {
      removeItem(product.id);
      return false;
    } else {
      addItem(product);
      return true;
    }
  };

  const clearWishlist = () => {
    items.value = [];
    persist();
  };

  return {
    items,
    count,
    hasItem,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
  };
});
