export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface RelatedProduct {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  image: string;
}

export interface ProductDetail {
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
}

export interface CatalogProduct {
  id: number | string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  image: string;
  route: string;
  category?: string;
  dressStyle?: string;
  color?: string;
  size?: string;
}

export interface ProductFilterState {
  category?: string;
  minPrice: number;
  maxPrice: number;
  selectedColor?: string;
  selectedSize?: string;
  dressStyle?: string;
}