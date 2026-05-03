
"use client";

import { use } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { OrderService } from '@/lib/store';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = OrderService.getById(id);

  if (!order) return <div className="p-24 text-center">Order not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-primary animate-in zoom-in duration-500" />
          </div>
          <h2 className="text-4xl font-headline font-bold">Thank You for Your Order</h2>
          <p className="text-muted-foreground">We have received your order. An confirmation SMS has been sent to your phone.</p>
          <div className="inline-block px-6 py-2 bg-secondary/30 border border-primary/20 text-primary font-bold tracking-widest">
            ORDER ID: {order.id}
          </div>
        </div>

        <div className="bg-card border p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <Truck className="w-4 h-4" /> Shipping To
              </div>
              <p className="font-bold">{order.customerName}</p>
              <p className="text-sm text-muted-foreground">{order.address}, {order.city}</p>
              <p className="text-sm text-muted-foreground">Phone: {order.phone}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <Calendar className="w-4 h-4" /> Order Details
              </div>
              <p className="text-sm">Status: <span className="font-bold uppercase text-primary">{order.status}</span></p>
              <p className="text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-sm">Payment: <span className="font-bold">Cash on Delivery</span></p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
             <h4 className="font-headline font-bold">Items Purchased</h4>
             {order.items.map(item => (
               <div key={item.id} className="flex justify-between items-center text-sm">
                 <div className="flex flex-col">
                   <span className="font-bold">{item.name}</span>
                   <span className="text-xs text-muted-foreground uppercase">{item.variantSize} x {item.quantity}</span>
                 </div>
                 <span className="font-bold">${item.price * item.quantity}.00</span>
               </div>
             ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${order.totalAmount - (order.giftWrap ? 10 : 0)}.00</span>
            </div>
            {order.giftWrap && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Gift Wrapping</span>
                <span>$10.00</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold pt-4 text-primary">
              <span>Total Paid</span>
              <span>${order.totalAmount}.00</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center space-x-4">
          <Link href="/shop">
            <Button variant="outline" className="rounded-none px-12 uppercase tracking-widest h-12">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
