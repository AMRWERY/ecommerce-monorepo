export interface Product {
  id: number | string;
  title: string;
  image: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
}
