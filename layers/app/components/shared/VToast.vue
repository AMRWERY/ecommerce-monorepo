<template>
  <Teleport to="body">
    <div
      aria-live="polite"
      class="fixed bottom-4 sm:bottom-6 end-4 sm:end-6 z-[99999] flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none px-2 sm:px-0"
    >
      <TransitionGroup
        name="toast-slide"
        tag="div"
        class="flex flex-col gap-2.5 w-full items-end"
      >
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="pointer-events-auto w-full rounded-2xl shadow-xl border p-4 bg-white/95 dark:bg-[#1A1D25]/95 backdrop-blur-md transition-all duration-300 relative overflow-hidden group hover:shadow-2xl"
          :class="[
            toast.type === 'success' && 'border-emerald-200 dark:border-emerald-800/60 shadow-emerald-500/5',
            toast.type === 'error' && 'border-rose-200 dark:border-rose-800/60 shadow-rose-500/5',
            toast.type === 'warning' && 'border-amber-200 dark:border-amber-800/60 shadow-amber-500/5',
            toast.type === 'info' && 'border-gray-200 dark:border-neutral-800 shadow-black/5',
          ]"
          role="status"
          @mouseenter="pauseToast(toast.id)"
          @mouseleave="resumeToast(toast.id)"
        >
          <div class="flex items-start gap-3">
            <!-- Icon -->
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              :class="[
                toast.type === 'success' && 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
                toast.type === 'error' && 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
                toast.type === 'warning' && 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
                toast.type === 'info' && 'bg-gray-100 dark:bg-neutral-800 text-black dark:text-white',
              ]"
            >
              <Icon
                v-if="toast.type === 'success'"
                name="lucide:check-circle-2"
                class="w-5 h-5"
              />
              <Icon
                v-else-if="toast.type === 'error'"
                name="lucide:alert-circle"
                class="w-5 h-5"
              />
              <Icon
                v-else-if="toast.type === 'warning'"
                name="lucide:alert-triangle"
                class="w-5 h-5"
              />
              <Icon
                v-else
                name="lucide:info"
                class="w-5 h-5"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0 pt-0.5">
              <h4
                v-if="toast.title"
                class="text-xs font-bold text-black dark:text-white tracking-tight leading-snug mb-0.5"
              >
                {{ toast.title }}
              </h4>
              <p class="text-xs text-gray-600 dark:text-neutral-300 leading-relaxed break-words">
                {{ toast.message }}
              </p>

              <!-- Optional Action -->
              <button
                v-if="toast.action"
                type="button"
                @click="handleAction(toast)"
                class="mt-2 text-xs font-bold underline hover:no-underline text-black dark:text-white inline-flex items-center gap-1"
              >
                {{ toast.action.label }}
              </button>
            </div>

            <!-- Dismiss Button -->
            <button
              type="button"
              @click="toastStore.remove(toast.id)"
              class="w-6 h-6 rounded-lg flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors shrink-0 -me-1 -mt-1"
              aria-label="Dismiss notification"
            >
              <Icon name="lucide:x" class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- Animated Progress Line -->
          <div
            v-if="toast.duration > 0"
            class="absolute bottom-0 inset-x-0 h-0.5 bg-gray-100 dark:bg-neutral-800 overflow-hidden"
          >
            <div
              class="h-full transition-none"
              :class="[
                toast.type === 'success' && 'bg-emerald-500',
                toast.type === 'error' && 'bg-rose-500',
                toast.type === 'warning' && 'bg-amber-500',
                toast.type === 'info' && 'bg-black dark:bg-white',
              ]"
              :style="{
                width: `${getProgress(toast.id)}%`,
              }"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { ToastItem } from '@/types/shared/VToast'

const toastStore = useToastStore()

// State to track progress and timers per toast
interface ToastTimer {
  remaining: number
  total: number
  lastTick: number
  paused: boolean
}

const timers = reactive<Record<string, ToastTimer>>({})
let animationFrameId: number | null = null

const getProgress = (id: string): number => {
  const t = timers[id]
  if (!t || t.total <= 0) return 0
  return Math.max(0, Math.min(100, (t.remaining / t.total) * 100))
}

const pauseToast = (id: string) => {
  if (timers[id]) {
    timers[id].paused = true
  }
}

const resumeToast = (id: string) => {
  if (timers[id]) {
    timers[id].paused = false
    timers[id].lastTick = performance.now()
  }
}

const handleAction = (toast: ToastItem) => {
  if (toast.action?.onClick) {
    toast.action.onClick()
  }
  toastStore.remove(toast.id)
}

// Watch toast list to init timers
watch(
  () => toastStore.toasts,
  (newList) => {
    const activeIds = new Set(newList.map((t) => t.id))

    // Clean up old timers
    for (const id in timers) {
      if (!activeIds.has(id)) {
        delete timers[id]
      }
    }

    // Add new timers
    newList.forEach((t) => {
      if (t.duration > 0 && !timers[t.id]) {
        timers[t.id] = {
          remaining: t.duration,
          total: t.duration,
          lastTick: performance.now(),
          paused: false,
        }
      }
    })
  },
  { deep: true, immediate: true }
)

// Main loop for smooth countdown
const tick = (now: number) => {
  for (const id in timers) {
    const timer = timers[id]
    if (!timer.paused) {
      const delta = now - timer.lastTick
      timer.remaining -= delta
      timer.lastTick = now

      if (timer.remaining <= 0) {
        delete timers[id]
        toastStore.remove(id)
      }
    } else {
      timer.lastTick = now
    }
  }

  if (import.meta.client) {
    animationFrameId = requestAnimationFrame(tick)
  }
}

onMounted(() => {
  if (import.meta.client) {
    animationFrameId = requestAnimationFrame(tick)
  }
})

onUnmounted(() => {
  if (animationFrameId !== null && import.meta.client) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
/* Transition Group Slide & Fade */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-slide-move {
  transition: transform 0.35s ease;
}
</style>
