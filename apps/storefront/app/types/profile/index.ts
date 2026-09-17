export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'prefer_not_to_say'
  memberSince: string
  tier: string
}

export interface UserAddress {
  id: string
  label: string
  recipientName: string
  phone: string
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface UserPaymentMethod {
  id: string
  type: 'visa' | 'mastercard' | 'apple_pay'
  cardHolder: string
  last4: string
  expiry: string
  isDefault: boolean
}

export interface ProfileOrderItem {
  id: string | number
  title: string
  image: string
  price: number
  quantity: number
  size?: string
  color?: string
}

export interface ProfileOrder {
  orderId: string
  orderNumber: string
  date: string
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled'
  total: number
  itemCount: number
  items: ProfileOrderItem[]
}

export interface WishlistItem {
  id: number | string
  title: string
  price: number
  originalPrice?: number
  discountPercent?: number
  rating: number
  image: string
  route: string
  inStock: boolean
}
