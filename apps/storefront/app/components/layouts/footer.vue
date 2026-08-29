<template>
  <div>
    <footer
      class="bg-white dark:bg-[#1A1D25] border-neutral-200 dark:border-[#2A2E38] mt-auto border-t text-xs transition-colors duration-200"
    >
      <div
        class="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <!-- Brand -->
        <div class="font-extrabold tracking-widest text-sm uppercase">
          brand
        </div>

        <!-- Links -->
        <div
          class="flex items-center gap-6 text-neutral-500 dark:text-neutral-400"
        >
          <nuxt-link-locale
            to="#"
            class="link-hover-brand"
            >privacy</nuxt-link-locale
          >
          <nuxt-link-locale
            to="#"
            class="link-hover-brand"
            >terms</nuxt-link-locale
          >
          <nuxt-link-locale
            to="#"
            class="link-hover-brand"
            >contact</nuxt-link-locale
          >
        </div>

        <!-- Copyright -->
        <div class="text-neutral-400 dark:text-neutral-500">copyright</div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup></script>
