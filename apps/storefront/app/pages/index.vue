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
definePageMeta({
  alias: ['/contact'],
})

useHead({
  title: 'Contact Us — SHOP.CO',
  meta: [
    {
      name: 'description',
      content: 'Contact us at SHOP.CO for any inquiries, support requests, or feedback. We’re here to help!',
    },
  ],
})
</script>