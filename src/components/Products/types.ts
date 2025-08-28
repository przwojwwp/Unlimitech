export interface PicsumPhoto {
  id: string | number;
  author?: string;
  [k: string]: unknown;
}

export type Flag = "PROMOCJA" | "BESTSELLER" | "NOWOŚĆ";

export interface Product {
  id: string | number;
  brand: string;
  title: string;
  img: string;
  alt: string;
  price: number;
  priceOld: number;
  lowest: number;
  inStock: boolean;
  flags: Flag[];
}

export const TABS = ["promotions", "new", "bestsellers"] as const;
export type Tab = (typeof TABS)[number];
