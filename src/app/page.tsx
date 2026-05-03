
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ProductService } from '@/lib/store';
import { ArrowRight, Star } from 'lucide-react';
import data from '@/app/lib/placeholder-images.json';

export default function HomePage() {
  const featuredProducts = ProductService.getAll().slice(0, 3);
  const heroImg = data.placeholderImages.find(i => i.id === 'hero-bg')?.imageUrl || '';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image 
          src={heroImg}
          alt="Luxury Fragrance"
          fill
          className="object-cover opacity-60 scale-105 animate-pulse-slow"
          priority
          data-ai-hint="luxury perfume"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <span className="text-primary font-medium tracking-[0.3em] uppercase mb-4 block">New Collection</span>
          <h2 className="text-5xl md:text-8xl font-headline font-bold mb-8 tracking-tighter">
            Elegance Captured <br /> in a <span className="luxury-text-gradient">Bottle</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-body">
            Discover our curated collection of artisan fragrances, crafted for the discerning soul who seeks to leave a lasting impression.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="px-8 h-14 text-lg font-semibold tracking-widest uppercase">
                Explore Collection
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="px-8 h-14 text-lg font-semibold tracking-widest uppercase border-primary/50">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h3 className="text-4xl font-headline font-bold mb-4">The Atelier Selects</h3>
              <p className="text-muted-foreground max-w-lg">Hand-picked by our master perfumers, these scents represent the pinnacle of current fragrance artistry.</p>
            </div>
            <Link href="/shop" className="group flex items-center gap-2 text-primary font-bold tracking-widest uppercase">
              View All Shop <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group luxury-card bg-card rounded-none overflow-hidden border">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image 
                    src={product.images[0]} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] px-3 py-1 font-bold uppercase tracking-widest">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h4 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{product.description}</p>
                  <p className="text-primary font-bold text-lg">
                    From ${Math.min(...product.variants.map(v => v.price))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Snippet */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-auto h-[600px] overflow-hidden border">
            <Image 
              src={data.placeholderImages.find(i => i.id === 'brand-story')?.imageUrl || ''} 
              alt="Artisan process" 
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="space-y-8">
            <h3 className="text-4xl font-headline font-bold">The Art of Olfactory Excellence</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in the heart of the perfume capital, Aroma Affaire Atelier was born from a desire to return to the roots of artisan fragrance. We source our ingredients ethically and sustainably from across the globe.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <Star className="w-6 h-6 text-primary" />
                <h5 className="font-bold uppercase tracking-widest text-sm">Rare Ingredients</h5>
                <p className="text-xs text-muted-foreground">Sourced from private estates and ancient forests.</p>
              </div>
              <div className="space-y-2">
                <Star className="w-6 h-6 text-primary" />
                <h5 className="font-bold uppercase tracking-widest text-sm">Master Crafted</h5>
                <p className="text-xs text-muted-foreground">Each bottle is hand-poured and inspected.</p>
              </div>
            </div>
            <Button variant="outline" className="h-12 border-primary/40 text-primary">Read More</Button>
          </div>
        </div>
      </section>

      <footer className="mt-auto py-12 border-t bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-2xl font-bold luxury-text-gradient mb-6">AROMA AFFAIRE</h2>
          <div className="flex justify-center gap-8 mb-8 text-sm text-muted-foreground uppercase tracking-widest font-medium">
            <Link href="/shop" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/shop" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/shop" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-muted-foreground/60">© {new Date().getFullYear()} Aroma Affaire Atelier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
