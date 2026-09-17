export interface CartItem {
  id: number
  title: string
  size: string
  color: string
  price: number
  quantity: number
  image: string
}

export interface PlacedOrder {
  orderId: string
  orderNumber: string
  createdAt: string
  status: 'placed' | 'processing' | 'shipped' | 'delivered'
  items: CartItem[]
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  shipping: {
    address: string
    city: string
    state?: string
    postalCode: string
    country: string
  }
  delivery: {
    method: 'standard' | 'express'
    title: string
    price: number
    estimatedDays: string
  }
  payment: {
    method: 'card' | 'cod' | 'apple_pay'
    cardLast4?: string
    status: 'paid' | 'pending'
  }
  subtotal: number
  discountAmount: number
  deliveryFee: number
  total: number
}
