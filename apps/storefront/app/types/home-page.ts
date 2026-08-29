export interface Product {
  id: number;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  price: number;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  quoteEn: string;
  quoteAr: string;
}
