// src/lib/store.ts
import { supabase } from './supabase';
import { Product, Order, Category } from './types';

export const ProductService = {
  // Fetch all products with their variants attached
  getAll: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*, variants:product_variants(*)');
    
    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }
    return data as unknown as Product[];
  },

  // Fetch a single product by ID
  getById: async (id: string): Promise<Product | null> => {
    const { data, error } = await supabase
      .from('products')
      .select('*, variants:product_variants(*)')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error("Error fetching product:", error);
      return null;
    }
    return data as unknown as Product;
  },

  // Fetch products filtered by category
  getByCategory: async (cat: Category): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*, variants:product_variants(*)')
      .eq('category', cat);
      
    if (error) {
      console.error("Error fetching category:", error);
      return [];
    }
    return data as unknown as Product[];
  }
};

export const OrderService = {
  // Save a new order to the database
  create: async (order: Order) => {
    // 1. Insert the main order
    const { error: orderError } = await supabase
      .from('orders')
      .insert([{
        id: order.id,
        user_id: order.user_id || null,
        customerName: order.customerName,
        email: order.email,
        phone: order.phone,
        address: order.address,
        city: order.city,
        notes: order.notes,
        giftWrap: order.giftWrap,
        giftMessage: order.giftMessage,
        subtotal: order.subtotal,
        delivery_fee: order.delivery_fee,
        discount_amount: order.discount_amount || 0,
        totalAmount: order.totalAmount,
        coupon_code: order.coupon_code || null,
        payment_method: order.payment_method,
        status: order.status
      }]);

    if (orderError) throw orderError;

    // 2. Insert the associated items for the order
    if (order.items && order.items.length > 0) {
      const itemsToInsert = order.items.map(item => ({
        orderId: order.id,
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        variantSize: item.variantSize,
        quantity: item.quantity,
        price_at_purchase: item.price_at_purchase 
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;
    }

    return order;
  },

  // Fetch all orders for the admin dashboard
  getAll: async (): Promise<Order[]> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, items:order_items(*)');
      
    if (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
    return data as unknown as Order[];
  },

  // Update order status (Admin panel)
  updateStatus: async (id: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
      
    if (error) throw error;
  }
};