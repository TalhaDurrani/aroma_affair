
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, total, isLoaded } = useCart();

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-headline font-bold mb-12 text-center">Shopping Bag</h2>

        {cart.length === 0 ? (
          <div className="text-center py-24 space-y-6">
            <p className="text-muted-foreground text-lg">Your shopping bag is empty.</p>
            <Link href="/shop">
              <Button size="lg" className="rounded-none tracking-widest uppercase px-12">Return to Shop</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 border-b pb-8">
                  <div className="relative w-24 h-32 flex-shrink-0 bg-muted border">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-headline font-bold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest">{item.size}</p>
                      </div>
                      <p className="font-bold text-lg text-primary">${item.price * item.quantity}.00</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-none"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-12 text-center text-sm font-bold">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-none"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary/20 p-8 border h-fit space-y-6 sticky top-24">
              <h3 className="text-xl font-headline font-bold">Summary</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">Complimentary</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total}.00</span>
                </div>
              </div>
              <Link href="/checkout" className="block w-full">
                <Button className="w-full h-14 rounded-none uppercase tracking-widest font-bold text-lg">
                  Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                Secure checkout powered by Aroma Affaire Atelier
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
