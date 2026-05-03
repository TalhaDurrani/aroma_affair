import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ProductService } from '@/lib/store';
import { ArrowRight, Star, Minus } from 'lucide-react';
import data from '@/app/lib/placeholder-images.json';

export default function HomePage() {
  const products = ProductService.getAll();
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
            data-ai-hint="luxury perfume"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-grayscale-[0.2]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="animate-fade-in-up space-y-6">
            <span className="text-primary font-bold tracking-ultra uppercase text-xs block opacity-0 animate-[fade-in_1s_ease-out_forwards_0.5s]">
              Est. 1924 • Paris
            </span>
            <h2 className="text-6xl md:text-9xl font-headline font-bold mb-8 leading-[0.85] tracking-tighter">
              SCENT <br /> 
              <span className="luxury-text-gradient italic font-normal">Memoire</span>
            </h2>
            <p className="text-sm md:text-base text-white/70 mb-12 max-w-lg mx-auto font-body uppercase tracking-widest leading-relaxed">
              An invitation to experience the invisible architecture of luxury.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/shop">
                <Button variant="outline" className="px-12 h-14 text-xs font-bold tracking-ultra uppercase border-primary text-primary hover:bg-primary hover:text-black transition-all duration-500 rounded-none">
                  Discovery
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-primary/0 to-primary"></div>
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
            <p className="text-muted-foreground text-lg italic">Objects of desire, distilled into their purest form.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4 items-start">
            {/* Big Featured Item */}
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
                  <Link href={`/product/${products[0].id}`} className="text-xs font-bold uppercase tracking-ultra hover:text-primary transition-colors">
                    Detail —
                  </Link>
                </div>
              </div>
            )}

            {/* Smaller Stacked Items */}
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
                    <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">From ${Math.min(...product.variants.map(v => v.price))}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="relative py-40 bg-secondary/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-primary/20 translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700"></div>
            <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
              <Image 
                src={data.placeholderImages.find(i => i.id === 'brand-story')?.imageUrl || ''} 
                alt="Artisan process" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] font-bold tracking-ultra uppercase text-primary">Philosophy</span>
              <h3 className="text-5xl md:text-7xl font-headline font-bold leading-none">Bespoke Heritage</h3>
              <p className="text-xl text-muted-foreground font-body leading-relaxed max-w-xl">
                We believe fragrance is a silent language. Each note is a syllable, each bottle a poem. Our atelier uses century-old techniques to harvest the soul of rare flora.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 border-t pt-12 border-primary/10">
              <div className="space-y-4">
                <h5 className="font-bold uppercase tracking-ultra text-[10px] text-primary">Ethos</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">Sustainably sourced resins and absolutes from private estates in Grasse and beyond.</p>
              </div>
              <div className="space-y-4">
                <h5 className="font-bold uppercase tracking-ultra text-[10px] text-primary">Ritual</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">Each vessel is hand-finished with artisan gold leaf and sealed by our master curator.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 border-t bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start mb-24">
            <div className="space-y-8">
              <h2 className="font-headline text-3xl font-bold luxury-text-gradient">AROMA AFFAIRE</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest leading-loose max-w-xs">
                The essence of timelessness. Join our circle for exclusive seasonal releases.
              </p>
            </div>
            <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-ultra">
              <Link href="/shop" className="hover:text-primary transition-colors">Catalog</Link>
              <Link href="/about" className="hover:text-primary transition-colors">Atelier History</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Concierge</Link>
            </div>
            <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-ultra">
              <span className="text-primary/40">Paris • London • New York</span>
              <span className="text-muted-foreground">© {new Date().getFullYear()} — Atelier Group</span>
            </div>
          </div>
          <div className="text-[12vw] font-headline font-bold text-primary/5 whitespace-nowrap leading-none select-none">
            A R O M A • A F F A I R E
          </div>
        </div>
      </footer>
    </div>
  );
}