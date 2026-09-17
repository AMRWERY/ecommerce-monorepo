import type { Variant, Color } from './VButton'

export interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  actionText?: string
  actionTo?: string
  actionVariant?: Variant
  actionColor?: Color
  bordered?: boolean
}
