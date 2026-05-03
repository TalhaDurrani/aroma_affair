
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ProductService } from '@/lib/store';
import { ArrowRight, Minus, Quote, Globe, Award, Sparkles } from 'lucide-react';
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
            <span className="text-primary font-bold tracking-ultra uppercase text-xs block">
              Est. 1924 • Paris • Grasse
            </span>
            <h2 className="text-6xl md:text-9xl font-headline font-bold mb-8 leading-[0.85] tracking-tighter">
              SCENT <br /> 
              <span className="luxury-text-gradient italic font-normal">Memoire</span>
            </h2>
            <p className="text-sm md:text-base text-white/70 mb-12 max-w-lg mx-auto font-body uppercase tracking-widest leading-relaxed">
              Experience the silent architecture of luxury through our hundred-year heritage.
            </p>
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

      {/* Trust Bar: The Credentials */}
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
                  <Link href={`/product/${products[0].id}`} className="text-xs font-bold uppercase tracking-ultra hover:text-primary transition-colors">
                    The Profile —
                  </Link>
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
                    <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">From ${Math.min(...product.variants.map(v => v.price))}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredient Spotlight */}
      <section className="py-32 bg-secondary/5 border-y border-primary/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative aspect-[16/10] bg-muted">
               <Image 
                src={data.placeholderImages.find(i => i.id === 'ingredient-exploration')?.imageUrl || ''} 
                alt="Raw ingredients" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
               />
               <div className="absolute -bottom-10 -right-10 bg-primary p-12 hidden md:block">
                  <p className="text-black font-bold uppercase tracking-widest text-xs">Purity Above All</p>
               </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
               <span className="text-primary font-bold uppercase tracking-ultra text-[10px]">The Components</span>
               <h3 className="text-5xl font-headline font-bold">Uncompromising Sourcing</h3>
               <p className="text-muted-foreground leading-relaxed text-lg">
                 From the high-altitude lavender of Provence to the sacred sandalwood of Mysore, we source ingredients that other ateliers simply cannot access. Our process respects the season, the soil, and the soul of the plant.
               </p>
               <div className="flex gap-12 pt-8">
                  <div className="space-y-2">
                    <p className="text-primary font-bold text-3xl font-headline">0%</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Synthetics</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-primary font-bold text-3xl font-headline">100yr</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Technique</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Concierge / Service */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
           <div className="max-w-4xl mx-auto text-center space-y-12">
              <h3 className="text-5xl md:text-7xl font-headline font-bold leading-tight">Discover Your <br /> Personal Signature</h3>
              <div className="relative aspect-[21/9] w-full bg-muted mb-12">
                 <Image 
                  src={data.placeholderImages.find(i => i.id === 'concierge-service')?.imageUrl || ''} 
                  alt="Concierge Service" 
                  fill 
                  className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Link href="/concierge">
                      <Button variant="outline" className="h-16 px-12 text-white border-white hover:bg-white hover:text-black rounded-none uppercase tracking-ultra text-xs">
                        Private Consultation
                      </Button>
                    </Link>
                 </div>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">
                "Fragrance is the most intense form of memory. Our concierge service helps you architect the legacy you leave in every room you enter."
              </p>
           </div>
        </div>
      </section>

      {/* Testimonials / Press */}
      <section className="py-24 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
               <Quote className="w-8 h-8 text-primary/40" />
               <p className="font-headline text-2xl font-bold leading-snug text-foreground/80">"The Oud Imperial is not just a scent; it is a coronation. Truly the gold standard of modern perfumery."</p>
               <p className="text-[10px] uppercase tracking-ultra font-bold text-primary">— Vogue Paris</p>
            </div>
            <div className="space-y-6">
               <Quote className="w-8 h-8 text-primary/40" />
               <p className="font-headline text-2xl font-bold leading-snug text-foreground/80">"Atelier Aroma manages to capture the fleeting beauty of a Mediterranean dawn in Coastal Breeze."</p>
               <p className="text-[10px] uppercase tracking-ultra font-bold text-primary">— The New York Times</p>
            </div>
            <div className="space-y-6">
               <Quote className="w-8 h-8 text-primary/40" />
               <p className="font-headline text-2xl font-bold leading-snug text-foreground/80">"A century of expertise distilled into vessels that are themselves works of art. Exceptional."</p>
               <p className="text-[10px] uppercase tracking-ultra font-bold text-primary">— Architectural Digest</p>
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
              <Link href="/about" className="hover:text-primary transition-colors">Heritage History</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Bespoke Concierge</Link>
            </div>
            <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-ultra">
              <span className="text-primary/40">Paris • London • New York • Grasse</span>
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
