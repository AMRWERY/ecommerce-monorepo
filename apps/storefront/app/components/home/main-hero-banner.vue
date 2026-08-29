<template>
  <div>
    <section
      class="relative w-full overflow-hidden min-h-[480px] lg:min-h-[560px] flex items-center"
    >
      <!-- Background Image with Soft Minimal Tint -->
      <img
        src="/img/interior-lifestyle-background.jpg"
        alt="Interior lifestyle background"
        class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />
      <!-- Dynamic Light/Dark Contrast Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent dark:from-[#12141A]/95 dark:via-[#12141A]/70"
      />

      <div class="relative max-w-[1400px] mx-auto px-6 md:px-12 w-full py-16">
        <div class="max-w-md md:max-w-lg space-y-4">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
          >
            hero Title
          </h1>
          <p
            class="text-[#11141B]/80 dark:text-[#F0F1F4]/80 text-sm sm:text-base leading-relaxed"
          >
            hero Subtitle
          </p>
          <div class="pt-2">
            <LazyVButton class="btn-lift">
              hero Cta
            </LazyVButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup></script>

