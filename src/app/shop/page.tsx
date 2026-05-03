"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ProductService } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category } from '@/lib/types';
import { Minus } from 'lucide-react';

export default function ShopPage() {
  const allProducts = ProductService.getAll();
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = allProducts
    .filter(p => filter === 'All' || p.category === filter)
    .sort((a, b) => {
      if (sortBy === 'price-low') return Math.min(...a.variants.map(v => v.price)) - Math.min(...b.variants.map(v => v.price));
      if (sortBy === 'price-high') return Math.min(...b.variants.map(v => v.price)) - Math.min(...a.variants.map(v => v.price));
      return 0;
    });

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
          <p className="text-muted-foreground max-w-xs italic text-lg leading-relaxed">
            Curated olfactory experiences, categorized by essence and character.
          </p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-primary/10 pb-8">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar w-full md:w-auto">
            {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`text-[10px] font-bold uppercase tracking-ultra transition-all relative py-2 ${
                  filter === cat ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
                {filter === cat && <span className="absolute bottom-0 left-0 w-full h-px bg-primary" />}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[220px] rounded-none border-primary/20 bg-transparent text-[10px] font-bold uppercase tracking-widest h-10">
                <SelectValue placeholder="Sequence" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-primary/20 bg-background">
                <SelectItem value="newest" className="text-xs uppercase tracking-widest">Recent Editions</SelectItem>
                <SelectItem value="price-low" className="text-xs uppercase tracking-widest">Ascending Price</SelectItem>
                <SelectItem value="price-high" className="text-xs uppercase tracking-widest">Descending Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group space-y-6">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted editorial-card border border-white/5">
                <Image 
                  src={product.images[0]} 
                  alt={product.name}
                  fill
                  className="object-cover card-image transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-[10px] font-bold tracking-ultra text-white uppercase">Discover Edition</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-headline font-bold text-xl group-hover:text-primary transition-colors">{product.name}</h3>
                  <span className="text-[10px] font-bold tracking-widest text-primary italic">${Math.min(...product.variants.map(v => v.price))}</span>
                </div>
                <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-ultra text-muted-foreground/60 border-t border-primary/5 pt-2">
                  <span>{product.category}</span>
                  <span>{product.variants.length} Formats</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}