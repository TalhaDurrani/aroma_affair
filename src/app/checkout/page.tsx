
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

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, clearCart, isLoaded } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    giftWrap: false,
    giftMessage: '',
  });

  if (!isLoaded) return null;
  if (cart.length === 0) {
    if (typeof window !== 'undefined') router.push('/shop');
    return null;
  }

  const finalTotal = total + (formData.giftWrap ? 10 : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const order: Order = {
        id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        notes: formData.notes,
        giftWrap: formData.giftWrap,
        giftMessage: formData.giftMessage,
        totalAmount: finalTotal,
        status: 'pending',
        createdAt: new Date().toISOString(),
        items: cart.map(item => ({
          id: Math.random().toString(36).substr(2, 9),
          orderId: '', // set by service usually
          productId: item.productId,
          variantId: item.variantId,
          name: item.name,
          variantSize: item.size,
          quantity: item.quantity,
          price: item.price
        }))
      };

      OrderService.create(order);
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to place order. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
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
                  <Input id="phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="rounded-none h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-[10px] uppercase font-bold tracking-widest">Full Address</Label>
                <Input id="address" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="rounded-none h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-[10px] uppercase font-bold tracking-widest">City</Label>
                <Input id="city" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="rounded-none h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-[10px] uppercase font-bold tracking-widest">Delivery Notes (Optional)</Label>
                <Textarea id="notes" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="rounded-none" />
              </div>
            </section>

            <section className="space-y-6 p-6 bg-secondary/20 border">
              <h3 className="text-xl font-headline font-bold">Personalization</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="giftWrap" checked={formData.giftWrap} onCheckedChange={(val: boolean) => setFormData({...formData, giftWrap: val})} />
                <Label htmlFor="giftWrap" className="text-sm font-medium">Add Luxury Gift Wrapping (+$10.00)</Label>
              </div>
              {formData.giftWrap && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <Label htmlFor="giftMessage" className="text-[10px] uppercase font-bold tracking-widest">Gift Message</Label>
                  <Textarea id="giftMessage" placeholder="Type your personal message here..." value={formData.giftMessage} onChange={e => setFormData({...formData, giftMessage: e.target.value})} className="rounded-none" />
                </div>
              )}
            </section>
          </div>

          <div className="space-y-8">
            <Card className="rounded-none border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity} ({item.size})</span>
                      <span className="font-bold">${item.price * item.quantity}.00</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total}.00</span>
                  </div>
                  {formData.giftWrap && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gift Wrapping</span>
                      <span>$10.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-4 border-t">
                    <span>Total Amount</span>
                    <span className="text-primary">${finalTotal}.00</span>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest">Payment Method</h4>
                  <div className="p-4 border border-primary/50 bg-primary/5 rounded-none flex items-center justify-between">
                    <span className="font-bold">Cash on Delivery</span>
                    <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary" />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-none text-lg font-bold uppercase tracking-widest"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
