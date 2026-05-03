// src/app/admin/(dashboard)/orders/page.tsx

import { OrderService } from '@/lib/store';
import { revalidatePath } from 'next/cache';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Server Action: This function runs securely on the server when you click "Update"
async function updateStatusAction(formData: FormData) {
  'use server';
  
  const orderId = formData.get('orderId') as string;
  const status = formData.get('status') as string;
  
  await OrderService.updateStatus(orderId, status);
  
  // Tell Next.js to refresh this page so we see the updated status instantly
  revalidatePath('/admin/orders');
  revalidatePath('/admin');
}

export default async function OrdersPage() {
  const orders = await OrderService.getAll();
  
  // Sort orders so the newest ones appear at the top
  orders.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b pb-6">
          <div>
            <h1 className="text-3xl font-headline font-bold">Order Management</h1>
            <p className="text-muted-foreground mt-2 text-sm uppercase tracking-widest">Call customers to confirm COD orders</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="rounded-none tracking-widest uppercase text-xs h-10 px-6">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {orders.length === 0 ? (
            <div className="text-center py-24 bg-card border text-muted-foreground">
              No orders found in the database.
            </div>
          ) : (
            orders.map(order => (
              <Card key={order.id} className="rounded-none overflow-hidden">
                <CardHeader className="bg-secondary/20 border-b pb-4 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">{order.id}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">
                      Placed on {new Date(order.created_at || '').toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary font-headline">Rs. {order.totalAmount}</p>
                    <p className="text-xs font-bold uppercase tracking-widest mt-1">{order.payment_method}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Customer Info */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Customer Details</h4>
                    <p className="font-bold text-lg">{order.customerName}</p>
                    <p className="text-sm font-mono bg-muted p-2 w-fit">{order.phone}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                    <p className="text-sm mt-2">{order.address}, {order.city}</p>
                    
                    {order.notes && (
                      <p className="text-sm mt-4 p-3 bg-primary/10 border-l-2 border-primary italic">
                        " {order.notes} "
                      </p>
                    )}
                  </div>
                  
                  {/* Order Items */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Order Items</h4>
                    <div className="space-y-3">
                      {order.items?.map(item => (
                        <div key={item.id} className="text-sm flex justify-between border-b pb-2">
                          <span className="font-medium">{item.quantity}x {item.name}</span>
                          <span className="text-muted-foreground uppercase">{item.variantSize}</span>
                        </div>
                      ))}
                    </div>
                    
                    {order.giftWrap && (
                      <div className="mt-4 p-3 bg-secondary/50 border border-secondary text-sm">
                        <span className="font-bold uppercase tracking-widest text-[10px] block mb-1">Gift Wrap Requested</span>
                        {order.giftMessage ? `Message: "${order.giftMessage}"` : 'No message provided'}
                      </div>
                    )}
                  </div>

                  {/* Status Update Form */}
                  <div className="space-y-4 md:border-l md:pl-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Update Status</h4>
                    <form action={updateStatusAction} className="flex flex-col gap-4">
                      <input type="hidden" name="orderId" value={order.id} />
                      
                      <select 
                        name="status" 
                        defaultValue={order.status}
                        className="h-12 border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary rounded-none font-medium"
                      >
                        <option value="pending">🟡 Pending (Call Needed)</option>
                        <option value="confirmed_via_call">🔵 Confirmed via Call</option>
                        <option value="shipped">🟣 Shipped</option>
                        <option value="delivered">🟢 Delivered</option>
                        <option value="returned">🟠 Returned (RTO)</option>
                        <option value="cancelled">🔴 Cancelled</option>
                      </select>
                      
                      <Button type="submit" className="w-full h-12 rounded-none tracking-widest uppercase text-xs font-bold">
                        Save Status
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}