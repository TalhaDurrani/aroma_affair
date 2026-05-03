import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ProductService } from '@/lib/store';
import { ArrowRight, Minus, Quote, Globe, Award, Sparkles } from 'lucide-react';
import data from '@/app/lib/placeholder-images.json';

// NO "use client" - This is a Server Component!
export default async function HomePage() {
  // Added await!
  const products = await ProductService.getAll();
  const heroImg = data.placeholderImages.find(i => i.id === 'hero-bg')?.imageUrl || '';

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30">
      <Navbar />
      
      {/* Immersive Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={heroImg}
            alt="Luxury Fragrance"
            fill
            className="object-cover scale-110 animate-fade-in"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-grayscale-[0.2]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="animate-fade-in-up space-y-6">
            <span className="text-primary font-bold tracking-ultra uppercase text-xs block">
              Est. 1924 • Paris • Grasse
            </span>
            <h2 className="text-6xl md:text-9xl font-headline font-bold mb-8 leading-[0.85] tracking-tighter">
              SCENT <br /> 
              <span className="luxury-text-gradient italic font-normal">Memoire</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/shop">
                <Button variant="outline" className="px-12 h-14 text-xs font-bold tracking-ultra uppercase border-primary text-primary hover:bg-primary hover:text-black transition-all duration-500 rounded-none">
                  Discovery Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-primary/10 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Global Concierge</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Grasse Certified</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Hand-Finished</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Fragrance of Year '24</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Product Showcase */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col mb-24 max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <Minus className="w-8 h-8 text-primary" />
              <span className="text-[10px] font-bold tracking-ultra uppercase text-primary">Curated Series</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-headline font-bold mb-8 leading-tight">The Art of <br /> Olfactory Selection</h3>
            <p className="text-muted-foreground text-lg italic">Distilled from the world's rarest resins and absolutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4 items-start">
            {products[0] && (
              <div className="md:col-span-7 space-y-8">
                <Link href={`/product/${products[0].id}`} className="group editorial-card block aspect-[4/5] bg-muted relative">
                  <Image 
                    src={products[0].images[0]} 
                    alt={products[0].name}
                    fill
                    className="object-cover card-image transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                </Link>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{products[0].category}</span>
                    <h4 className="text-3xl font-headline font-bold">{products[0].name}</h4>
                  </div>
                </div>
              </div>
            )}

            <div className="md:col-span-5 md:pt-40 space-y-24">
              {products.slice(1, 3).map((product, idx) => (
                <div key={product.id} className={`${idx % 2 !== 0 ? 'md:pl-20' : ''} space-y-6`}>
                  <Link href={`/product/${product.id}`} className="group editorial-card block aspect-[3/4] bg-muted relative">
                    <Image 
                      src={product.images[0]} 
                      alt={product.name}
                      fill
                      className="object-cover card-image transition-transform duration-1000"
                    />
                  </Link>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{product.category}</span>
                    <h4 className="text-2xl font-headline font-bold">{product.name}</h4>
                    <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">
                      From Rs. {product.variants?.length ? Math.min(...product.variants.map(v => v.price)) : 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}