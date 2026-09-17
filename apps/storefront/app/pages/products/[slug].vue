<template>
  <div>
    <!-- Breadcrumb Navigation -->
    <LazyVBreadcrumb :items="breadcrumbs" />

    <!-- Product Showcase Section -->
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <!-- Left: Image Gallery -->
      <lazy-product-gallery
        class="lg:col-span-6"
        :images="product.images"
        :title="product.title"
        :product-id="productId"
      />

      <!-- Right: Product Info & Actions -->
      <lazy-product-info
        class="lg:col-span-6"
        :product="product"
        :product-id="productId"
        @add-to-cart="handleAddToCart"
      />
    </section>

    <!-- Tabs Navigation & Reviews -->
    <lazy-product-tabs :reviews="reviews" />

    <!-- "YOU MIGHT ALSO LIKE" Section -->
    <lazy-related-products :products="relatedProducts" />
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@types/shared/VBreadcrumb'
import type { Product } from '@/types/shared/VProductCard'
import type { ProductDetail, Review } from '@/types/products'

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'Men', to: '/products?category=men' },
  { label: 'T-shirts', to: '/products?category=t-shirts' },
]

const route = useRoute()
const cartStore = useCartStore()
const productId = computed(() => (route.params.slug as string) || '1')

// Product Data
const product = ref<ProductDetail>({
  title: 'ONE LIFE GRAPHIC T-SHIRT',
  rating: 4.5,
  price: 260,
  originalPrice: 300,
  discountPercent: 40,
  description:
    'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
  colors: [
    { name: 'Olive Green', hex: '#4F4631' },
    { name: 'Forest Teal', hex: '#314F4A' },
    { name: 'Navy Blue', hex: '#31344F' },
  ],
  sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  images: [
    '/img/prod-09.png',
    '/img/prod-010.png',
    '/img/prod-011.png',
  ],
})

// Reviews Data
const reviews = ref<Review[]>([
  {
    id: 1,
    name: 'Samantha D.',
    rating: 5,
    comment:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As an artist myself, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: 'August 14, 2023',
  },
  {
    id: 2,
    name: 'Alex M.',
    rating: 4,
    comment:
      'The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I appreciate good aesthetics, and this shirt definitely delivers.',
    date: 'August 15, 2023',
  },
  {
    id: 3,
    name: 'Ethan R.',
    rating: 4,
    comment:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I've received several compliments already!",
    date: 'August 16, 2023',
  },
  {
    id: 4,
    name: 'Olivia P.',
    rating: 4,
    comment:
      "As a UX designer, I'm always on the lookout for unique t-shirts that reflect my passion. This one ticks all the boxes! Great fabric, stylish graphic, and fits comfortably all day long.",
    date: 'August 17, 2023',
  },
  {
    id: 5,
    name: 'Liam K.',
    rating: 4,
    comment:
      "This t-shirt is a perfect blend of comfort and style. The fabric feels soft on the skin and the fit is just right. Highly recommend for casual wear!",
    date: 'August 18, 2023',
  },
  {
    id: 6,
    name: 'Ava H.',
    rating: 5,
    comment:
      "I'm not usually one to write reviews, but this t-shirt deserves it! The quality is fantastic and it holds up well after multiple washes without fading.",
    date: 'August 19, 2023',
  },
])

// Related Products
const relatedProducts = ref<Product[]>([
  {
    id: 101,
    title: 'Polo with Contrast Trim',
    price: 212,
    originalPrice: 242,
    discountPercent: 20,
    rating: 4.0,
    image: '/img/prod-012.png',
    route: '/products/101',
  },
  {
    id: 102,
    title: 'Gradient Graphic T-shirt',
    price: 145,
    rating: 3.5,
    image: '/img/prod-013.png',
    route: '/products/102',
  },
  {
    id: 103,
    title: 'Polo with Tipping Details',
    price: 180,
    rating: 4.5,
    image: '/img/prod-014.png',
    route: '/products/103',
  },
  {
    id: 104,
    title: 'Black Striped T-shirt',
    price: 120,
    originalPrice: 150,
    discountPercent: 30,
    rating: 5.0,
    image: '/img/prod-015.png',
    route: '/products/104',
  },
])

const toast = useToast()

const handleAddToCart = (payload: { product: ProductDetail; size: string; color: string; quantity: number }): void => {
  cartStore.addItem({
    id: Number(productId.value) || 1,
    title: payload.product.title,
    price: payload.product.price,
    image: payload.product.images?.[0] || '/img/prod-09.png',
    size: payload.size,
    color: payload.color,
    quantity: payload.quantity,
  })

  toast.success(`Added ${payload.quantity}x "${payload.product.title}" (${payload.size}) to your bag!`, {
    title: 'Added to Cart',
    duration: 3500,
  })
}

useSeoPage({
  title: product.value.title,
  description: product.value.description,
  image: product.value.images?.[0],
  type: 'product',
})
</script>