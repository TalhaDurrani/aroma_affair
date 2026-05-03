// src/lib/types.ts

export type Category = 'Men' | 'Women' | 'Unisex';

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  price: number;
  stock: number;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  images: string[];
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  is_active?: boolean;
  created_at?: string;
  variants: ProductVariant[];
}

export type OrderStatus = 'pending' | 'confirmed_via_call' | 'shipped' | 'delivered' | 'returned' | 'cancelled';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  name: string;
  variantSize: string;
  quantity: number;
  price_at_purchase: number;
}

export interface Order {
  id: string;
  user_id?: string | null;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  giftWrap: boolean;
  giftMessage?: string;
  subtotal: number;
  delivery_fee: number;
  discount_amount?: number;
  totalAmount: number;
  coupon_code?: string;
  payment_method: string;
  status: OrderStatus;
  created_at?: string;
  items: OrderItem[];
}