import type { CartItem } from '@/types/cart'

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state?: string
  postalCode: string
  country: string
}

export type DeliveryMethod = 'standard' | 'express'

export interface DeliveryOption {
  id: DeliveryMethod
  title: string
  description: string
  price: number
  estimatedDays: string
}

export type PaymentMethod = 'card' | 'cod' | 'apple_pay'

export interface CardPaymentDetails {
  cardNumber: string
  cardHolder: string
  expiry: string
  cvv: string
}

export interface CheckoutForm {
  shipping: ShippingAddress
  deliveryMethod: DeliveryMethod
  paymentMethod: PaymentMethod
  cardDetails?: CardPaymentDetails
  saveInfo?: boolean
}

export type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered'

export interface OrderDetails {
  orderId: string
  orderNumber: string
  createdAt: string
  status: OrderStatus
  items: CartItem[]
  shipping: ShippingAddress
  deliveryOption: DeliveryOption
  paymentMethod: PaymentMethod
  subtotal: number
  discountAmount: number
  deliveryFee: number
  total: number
}
