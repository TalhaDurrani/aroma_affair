import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ProductService } from '@/lib/store';
import { Minus } from 'lucide-react';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const currentCategory = category || 'All';
  
  let products = await ProductService.getAll();

  if (currentCategory !== 'All') {
    products = products.filter(p => p.category === currentCategory);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      <Navbar />
      <div className="container mx-auto px-6 py-32 md:py-48">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Minus className="text-primary w-6 h-6" />
              <span className="text-[10px] font-bold tracking-ultra uppercase text-primary">Catalog</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-headline font-bold leading-none tracking-tighter">The <br /> Collection</h2>
          </div>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-primary/10 pb-8">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar w-full md:w-auto">
            {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
              <Link 
                key={cat}
                href={cat === 'All' ? '/shop' : `/shop?category=${cat}`}
                className={`text-[10px] font-bold uppercase tracking-ultra transition-all relative py-2 ${
                  currentCategory === cat ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
                {currentCategory === cat && <span className="absolute bottom-0 left-0 w-full h-px bg-primary" />}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group space-y-6">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted editorial-card border border-white/5">
                {product.images?.[0] && (
                  <Image 
                    src={product.images[0]} 
                    alt={product.name}
                    fill
                    className="object-cover card-image transition-transform duration-1000"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-headline font-bold text-xl group-hover:text-primary transition-colors">{product.name}</h3>
                  <span className="text-[10px] font-bold tracking-widest text-primary italic">
                    Rs. {product.variants?.length ? Math.min(...product.variants.map(v => v.price)) : 0}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-ultra text-muted-foreground/60 border-t border-primary/5 pt-2">
                  <span>{product.category}</span>
                  <span>{product.variants?.length || 0} Formats</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}