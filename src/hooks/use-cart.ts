
"use client";

import { useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/lib/types';

export interface CartItem {
  id: string; // productId + variantId
  productId: string;
  variantId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('aroma-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('aroma-cart', JSON.stringify(newCart));
  };

  const addItem = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const cartId = `${product.id}-${variant.id}`;
    const existing = cart.find(i => i.id === cartId);
    
    if (existing) {
      const newCart = cart.map(i => i.id === cartId ? { ...i, quantity: i.quantity + quantity } : i);
      saveCart(newCart);
    } else {
      const newItem: CartItem = {
        id: cartId,
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        size: variant.size,
        price: variant.price,
        quantity,
        image: product.images[0]
      };
      saveCart([...cart, newItem]);
    }
  };

  const removeItem = (cartId: string) => {
    saveCart(cart.filter(i => i.id !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    const newCart = cart.map(i => {
      if (i.id === cartId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    });
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemsCount,
    isLoaded
  };
}
