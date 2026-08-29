<template>
  <div>
    <section
      class="bg-[#F6F7F9] dark:bg-[#161820] py-16 transition-colors duration-200"
    >
      <div class="container-page">
        <h2
          class="text-xl md:text-2xl font-bold tracking-tight text-center mb-10"
        >
          testimonials Title
        </h2>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="tst in testimonials"
            :key="tst.id"
            class="surface-card hover-lift-card p-8 flex flex-col items-center text-center justify-between gap-6"
          >
            <!-- Avatar -->
            <img
              :src="tst.avatar"
              :alt="tst.name"
              class="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-[#3373FF]/20"
            />
            <!-- Quote -->
            <p
              class="text-[#11141B]/80 dark:text-[#F0F1F4]/80 text-sm italic leading-relaxed"
            >
              {{ isRtl ? tst.quoteAr : tst.quoteEn }}
            </p>
            <!-- Author -->
            <div class="text-xs font-semibold tracking-wider">name</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { Testimonial } from "~/types/home-page";

const { locale } = useI18n();

const isRtl = computed(() => locale.value === "ar");

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah J.",
    avatar: "/img/sarah-j.jpg",
    quoteEn:
      "“The quality is unmatched. I've completely redesigned my workspace with LUXE essentials.”",
    quoteAr:
      "“الجودة لا تضاهى على الإطلاق. لقد قمت بإعادة تصميم مساحة عملي بالكامل بفضل منتجات لوكس.”",
  },
  {
    id: 2,
    name: "Michael T.",
    avatar: "/img/michael-t.jpg",
    quoteEn:
      "“Minimalist perfection. Every product feels considered and meticulously crafted.”",
    quoteAr:
      "“مثالية مينيمالية خالصة. كل منتج تشعر أنه صُمم بعناية فائقة وحرفية لا تصدق.”",
  },
  {
    id: 3,
    name: "Elena R.",
    avatar: "/img/elena-r.jpg",
    quoteEn:
      "“Finally, a brand that understands the balance between form and function seamlessly.”",
    quoteAr:
      "“أخيراً، علامة تجارية تفهم ببراعة التوازن المثالي بين جمال المظهر وسلاسة الوظيفة.”",
  },
];
</script>