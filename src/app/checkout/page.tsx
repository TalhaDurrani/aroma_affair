"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { OrderService } from '@/lib/store';
import { Order } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, clearCart, isLoaded } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', notes: '', giftWrap: false, giftMessage: '',
  });

  if (!isLoaded) return null;
  if (cart.length === 0) {
    if (typeof window !== 'undefined') router.push('/shop');
    return null;
  }

  const deliveryFee = 200; 
  const giftWrapFee = formData.giftWrap ? 500 : 0; 
  const finalTotal = total + deliveryFee + giftWrapFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderId = `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      const order: Order = {
        id: orderId,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        notes: formData.notes,
        giftWrap: formData.giftWrap,
        giftMessage: formData.giftMessage,
        subtotal: total,
        delivery_fee: deliveryFee,
        totalAmount: finalTotal,
        payment_method: 'COD',
        status: 'pending',
        items: cart.map(item => ({
          id: '', 
          orderId: orderId,
          productId: item.productId,
          variantId: item.variantId,
          name: item.name,
          variantSize: item.size,
          quantity: item.quantity,
          price_at_purchase: item.price
        }))
      };

      // ADDED AWAIT HERE!
      await OrderService.create(order);
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to place order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 mt-12">
        <h2 className="text-4xl font-headline font-bold mb-12 text-center">Checkout</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <section className="space-y-6">
              <h3 className="text-xl font-headline font-bold border-b pb-2">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] uppercase font-bold tracking-widest">Full Name</Label>
                  <Input id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-none h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[10px] uppercase font-bold tracking-widest">Phone Number</Label>
                  <Input id="phone" required placeholder="03XX-XXXXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="rounded-none h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest">Email Address</Label>
                <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="rounded-none h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-[10px] uppercase font-bold tracking-widest">Full Address</Label>
                <Input id="address" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="rounded-none h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-[10px] uppercase font-bold tracking-widest">City</Label>
                <Input id="city" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="rounded-none h-12" />
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <Card className="rounded-none border-2 border-primary/20">
              <CardHeader><CardTitle className="font-headline">Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity} ({item.size})</span>
                      <span className="font-bold">Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>Rs. {total}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery Fee</span><span>Rs. {deliveryFee}</span></div>
                  <div className="flex justify-between text-lg font-bold pt-4 border-t"><span>Total Amount</span><span className="text-primary">Rs. {finalTotal}</span></div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-none text-lg font-bold uppercase tracking-widest">
                  {isSubmitting ? 'Processing...' : 'Place Order (COD)'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}