
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Minus, History, Award, Droplet, Ship } from 'lucide-react';
import data from '@/app/lib/placeholder-images.json';

export default function AboutPage() {
  const heritageImg = data.placeholderImages.find(i => i.id === 'heritage-portrait')?.imageUrl || '';
  const artisanImg = data.placeholderImages.find(i => i.id === 'artisan-craft')?.imageUrl || '';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Header */}
      <header className="pt-48 pb-24 container mx-auto px-6">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Minus className="w-12 h-12 text-primary" />
            <span className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary">Our Heritage</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-headline font-bold leading-[0.9] mb-12 tracking-tighter">
            A Century of <br /> <span className="luxury-text-gradient italic font-normal">Olfactory Art</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed italic">
            "We do not simply make perfumes. We bottle moments that refused to fade into time."
          </p>
        </div>
      </header>

      {/* The Origin Story */}
      <section className="py-24 bg-secondary/10 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[3/4] overflow-hidden grayscale">
            <Image src={heritageImg} alt="Heritage" fill className="object-cover" />
            <div className="absolute top-10 left-10 bg-background/80 backdrop-blur p-8 border border-primary/20">
              <p className="text-[10px] font-bold uppercase tracking-ultra text-primary mb-2">Grasse, France</p>
              <p className="text-xl font-headline font-bold">1924</p>
            </div>
          </div>
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-5xl font-headline font-bold">The Laboratory of Dreams</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in the post-war elegance of 1920s Paris, Aroma Affaire Atelier began as a private commission house for the European elite. Our founder, Julian Vance, believed that fragrance was the most intimate form of communication—a silent declaration of character.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                While other houses moved toward industrialization and synthetic components, we retreated to the valleys of Grasse, securing private estates to ensure the purity of our harvests. For 100 years, we have remained family-owned, fiercely independent, and uncompromisingly artisanal.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-primary/20">
               <div className="space-y-4">
                  <History className="w-6 h-6 text-primary" />
                  <h4 className="font-bold uppercase tracking-widest text-xs">Unbroken Lineage</h4>
                  <p className="text-sm text-muted-foreground">Three generations of master perfumers sharing a singular, sacred notebook of formulas.</p>
               </div>
               <div className="space-y-4">
                  <Award className="w-6 h-6 text-primary" />
                  <h4 className="font-bold uppercase tracking-widest text-xs">Global Recognition</h4>
                  <p className="text-sm text-muted-foreground">Awarded the 'Entreprise du Patrimoine Vivant' for exceptional artisan skill.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-24">
             <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px] mb-4">The Process</span>
             <h2 className="text-5xl md:text-7xl font-headline font-bold">Made by Human Hands</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="space-y-8 text-center md:text-left">
               <div className="h-1 bg-primary/20 w-full mb-8">
                  <div className="h-full bg-primary w-1/3"></div>
               </div>
               <h4 className="text-3xl font-headline font-bold">I. The Sourcing</h4>
               <p className="text-muted-foreground">We wait for the exact moment of bloom. Our Jasmine Grandiflorum is picked only at 4:00 AM, when its essence is at its peak intensity.</p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden border border-primary/10">
               <Image src={artisanImg} alt="Artisan hands" fill className="object-cover" />
            </div>
            <div className="space-y-8 text-center md:text-right flex flex-col items-end">
               <div className="h-1 bg-primary/20 w-full mb-8">
                  <div className="h-full bg-primary w-full"></div>
               </div>
               <h4 className="text-3xl font-headline font-bold">III. The Finishing</h4>
               <p className="text-muted-foreground">Every vessel is hand-polished and sealed with artisan wax. No two bottles are identical, just as no two memories are the same.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Values */}
      <section className="py-32 bg-secondary/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="p-8 border border-primary/10 bg-background space-y-6 group hover:border-primary transition-colors duration-700">
               <Droplet className="w-10 h-10 text-primary" />
               <h4 className="text-xl font-headline font-bold">Infinite Concentration</h4>
               <p className="text-sm text-muted-foreground leading-relaxed">Our fragrances are 'Extrait de Parfum'—the highest concentration possible, ensuring a sillage that lasts through the day and night.</p>
            </div>
            <div className="p-8 border border-primary/10 bg-background space-y-6 group hover:border-primary transition-colors duration-700">
               <Award className="w-10 h-10 text-primary" />
               <h4 className="text-xl font-headline font-bold">Artisan Glassware</h4>
               <p className="text-sm text-muted-foreground leading-relaxed">Our bottles are crafted by master glassblowers in Murano and Venice, designed to be kept as heirloom objects.</p>
            </div>
            <div className="p-8 border border-primary/10 bg-background space-y-6 group hover:border-primary transition-colors duration-700">
               <Ship className="w-10 h-10 text-primary" />
               <h4 className="text-xl font-headline font-bold">Sustainable Luxury</h4>
               <p className="text-sm text-muted-foreground leading-relaxed">We use 100% recyclable materials and support regenerative farming in our partner floral estates.</p>
            </div>
            <div className="p-8 border border-primary/10 bg-background space-y-6 group hover:border-primary transition-colors duration-700">
               <History className="text-primary w-10 h-10" />
               <h4 className="text-xl font-headline font-bold">Bespoke Concierge</h4>
               <p className="text-sm text-muted-foreground leading-relaxed">Exclusive access to our vault of retired scents and personalized profiling with our lead curators.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 border-t bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 text-center space-y-12">
           <h2 className="font-headline text-4xl font-bold luxury-text-gradient">Ready to find your signature?</h2>
           <Link href="/shop">
              <button className="px-16 h-16 bg-primary text-black font-bold uppercase tracking-ultra text-xs hover:bg-white transition-all duration-500">
                Explore the Collection
              </button>
           </Link>
        </div>
      </footer>
    </div>
  );
}
