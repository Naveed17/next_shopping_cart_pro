import type { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
  id?: string
  className?: string
  children?: ReactNode
  style?: CSSProperties
}
export type WithProps = CommonProps;

export declare namespace TypeAttributes {
  type Size = 'lg' | 'md' | 'sm' | 'xs'
  type Shape = 'round' | 'circle' | 'none'
  type Status = 'success' | 'warning' | 'danger' | 'info'
  type FormLayout = 'horizontal' | 'vertical' | 'inline'
  type ControlSize = 'lg' | 'md' | 'sm'
  type Direction = 'ltr' | 'rtl'
}

export type StepStatus = 'complete' | 'pending' | 'in-progress' | 'error'
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vendorId: string;
  vendor: Vendor;
  stock: number;
  rating: number;
  reviews: number;
  trend?: string;
  views?: string
  sales?: string
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  description: string;
  logo: string;
  rating: number;
  products: Product[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}