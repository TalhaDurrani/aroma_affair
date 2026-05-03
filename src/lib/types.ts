
export type Category = 'Men' | 'Women' | 'Unisex';

export interface ProductVariant {
  id: string;
  productId: string;
  size: string; // e.g., 30ml, 50ml, 100ml
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
  variants: ProductVariant[];
  createdAt: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  name: string;
  variantSize: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  giftWrap: boolean;
  giftMessage?: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
}
