<template>
  <div>
    <lazy-hero-section />

    <lazy-new-arrivals />

    <lazy-top-selling />

    <lazy-dress-style-section />

    <lazy-customer-reviews-carousel />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'SHOP.CO',
  meta: [
    {
      name: 'description',
      content: 'SHOP.CO - Discover the latest trends in fashion, including new arrivals, best sellers, and exclusive collections.',
    },
  ],
})
</script>