// src/app/page.tsx
// Notice: NO "use client" here! This is a Server Component.
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ProductService } from '@/lib/store';
import { Minus, Globe, Award, Sparkles, Quote } from 'lucide-react';
import data from '@/app/lib/placeholder-images.json';

export default async function HomePage() {
  // Fetch data directly on the server before the page loads!
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

      {/* Editorial Product Showcase */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col mb-24 max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <Minus className="w-8 h-8 text-primary" />
              <span className="text-[10px] font-bold tracking-ultra uppercase text-primary">Curated Series</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-headline font-bold mb-8 leading-tight">The Art of <br /> Olfactory Selection</h3>
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
                </Link>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{products[0].category}</span>
                    <h4 className="text-3xl font-headline font-bold">{products[0].name}</h4>
                  </div>
                </div>
              </div>
            )}
            {/* The rest of your components... */}
          </div>
        </div>
      </section>
    </div>
  );
}