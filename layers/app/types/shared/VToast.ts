export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastOptions {
  id?: string
  title?: string
  message: string
  type?: ToastType
  duration?: number // ms, default 4000. 0 = no auto-dismiss
  action?: ToastAction
}

export interface ToastItem extends ToastOptions {
  id: string
  type: ToastType
  duration: number
  createdAt: number
}
