
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ProductService } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category } from '@/lib/types';

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <header className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">The Collection</h2>
          <p className="text-muted-foreground">Explore our full range of luxury scents</p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
              <Button 
                key={cat}
                variant={filter === cat ? 'default' : 'outline'}
                onClick={() => setFilter(cat as any)}
                className="rounded-none uppercase tracking-widest text-xs h-9"
              >
                {cat}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-sm font-medium uppercase tracking-widest hidden md:inline">Sort By</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px] rounded-none border-primary/20">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group luxury-card bg-card border rounded-none overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image 
                  src={product.images[0]} 
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg">{product.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/30 px-2 py-0.5">{product.category}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-primary/10">
                  <span className="text-primary font-bold">From ${Math.min(...product.variants.map(v => v.price))}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{product.variants.length} Sizes</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
