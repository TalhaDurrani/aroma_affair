// src/app/admin/page.tsx
// REMOVED "use client" - This is now a Server Component!
import { OrderService, ProductService } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingBag, DollarSign, TrendingUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default async function AdminDashboard() {
  // Added 'await' because these are now fetching from Supabase
  const orders = await OrderService.getAll();
  const products = await ProductService.getAll();
  
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalSales = orders.length;
  
  // Updated status colors to match our new COD specific statuses
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-500',
    confirmed_via_call: 'bg-blue-500/20 text-blue-500',
    shipped: 'bg-purple-500/20 text-purple-500',
    delivered: 'bg-green-500/20 text-green-500',
    returned: 'bg-orange-500/20 text-orange-500',
    cancelled: 'bg-red-500/20 text-red-500',
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="h-20 border-b flex items-center px-8 bg-card justify-between">
        <h1 className="text-2xl font-headline font-bold">Atelier Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/admin/products">
            <Badge variant="outline" className="h-8 px-4 border-primary text-primary cursor-pointer hover:bg-primary/10">Manage Products</Badge>
          </Link>
          <Link href="/">
            <Badge variant="outline" className="h-8 px-4 cursor-pointer">View Store</Badge>
          </Link>
        </div>
      </header>

      <main className="p-8 space-y-8 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-none border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-headline">Rs. {totalRevenue.toLocaleString()}</div>
              <p className="text-[10px] text-muted-foreground mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1 text-green-500" /> +12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-none border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Orders</CardTitle>
              <ShoppingBag className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-headline">{totalSales}</div>
              <p className="text-[10px] text-muted-foreground mt-1">Orders placed to date</p>
            </CardContent>
          </Card>

          <Card className="rounded-none border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Products</CardTitle>
              <Package className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-headline">{products.length}</div>
              <p className="text-[10px] text-muted-foreground mt-1">Fragrances in catalog</p>
            </CardContent>
          </Card>

          <Card className="rounded-none border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Customer Growth</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-headline">84</div>
              <p className="text-[10px] text-muted-foreground mt-1">+5 new today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="rounded-none">
            <CardHeader className="border-b">
              <CardTitle className="font-headline">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {orders.length === 0 ? (
                  <p className="p-8 text-center text-muted-foreground">No orders yet.</p>
                ) : (
                  orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 hover:bg-muted/30">
                      <div>
                        <p className="font-bold text-sm">{order.customerName}</p>
                        {/* Safe check for date since some legacy mock data might not have it formatted correctly */}
                        <p className="text-xs text-muted-foreground">{order.id} • {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${statusColors[order.status] || 'bg-gray-500/20 text-gray-500'}`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                        <p className="font-bold text-sm">Rs. {order.totalAmount}</p>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-4 bg-muted/20 border-t text-center">
                 <Link href="/admin/orders" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">View All Orders</Link>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardHeader className="border-b">
              <CardTitle className="font-headline">Inventory Status</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y">
                 {products.map(product => (
                   <div key={product.id} className="p-4 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 relative bg-muted border">
                           {product.images && product.images[0] && (
                             <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                           )}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{product.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{product.category}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="font-bold text-sm">
                          {product.variants ? product.variants.reduce((acc, v) => acc + (v.stock || 0), 0) : 0} Units
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase">
                          Across {product.variants ? product.variants.length : 0} Sizes
                        </p>
                     </div>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}