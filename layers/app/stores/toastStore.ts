import type { ToastItem, ToastOptions, ToastType } from '../types/shared/VToast'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastItem[]>([])

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  const clear = () => {
    toasts.value = []
  }

  const show = (options: ToastOptions | string): string => {
    const parsed: ToastOptions =
      typeof options === 'string' ? { message: options } : { ...options }

    const id = parsed.id || `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const duration = parsed.duration !== undefined ? parsed.duration : 4000
    const type: ToastType = parsed.type || 'info'

    const toastItem: ToastItem = {
      ...parsed,
      id,
      type,
      duration,
      createdAt: Date.now(),
    }

    // Limit maximum concurrent toasts to 5
    if (toasts.value.length >= 5) {
      toasts.value.shift()
    }

    toasts.value.push(toastItem)

    return id
  }

  const success = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
    return show({ ...options, message, type: 'success' })
  }

  const error = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
    return show({ ...options, message, type: 'error', duration: options?.duration ?? 5000 })
  }

  const warning = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
    return show({ ...options, message, type: 'warning' })
  }

  const info = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
    return show({ ...options, message, type: 'info' })
  }

  return {
    toasts,
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear,
  }
})
