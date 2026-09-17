<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: filter 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}

@media (prefers-reduced-motion: reduce) {

  .page-enter-active,
  .page-leave-active,
  .layout-enter-active,
  .layout-leave-active {
    transition: none;
  }

  .page-enter-from,
  .page-leave-to,
  .layout-enter-from,
  .layout-leave-to {
    opacity: 1;
    filter: none;
  }
}
</style>