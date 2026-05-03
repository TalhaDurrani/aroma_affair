"use client";

import Link from 'next/link';
import { ShoppingBag, Menu, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Navbar() {
  const { itemsCount } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-700",
      scrolled ? "glass-nav h-16" : "bg-transparent h-24"
    )}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Button variant="ghost" size="icon" className="md:hidden text-foreground">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-ultra uppercase">
            <Link href="/shop" className="hover:text-primary transition-colors">Boutique</Link>
            <Link href="/collections" className="hover:text-primary transition-colors">Editions</Link>
            <Link href="/about" className="hover:text-primary transition-colors">Heritage</Link>
          </div>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className={cn(
            "font-headline font-bold transition-all duration-700 leading-none",
            scrolled ? "text-xl tracking-tighter" : "text-2xl md:text-3xl tracking-[-0.05em]"
          )}>
            <span className="luxury-text-gradient">AROMA</span> <span className="text-foreground/80">AFFAIRE</span>
          </h1>
        </Link>

        <div className="flex items-center gap-1 md:gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex text-foreground hover:text-primary">
            <Search className="w-4 h-4" />
          </Button>
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <User className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative group text-foreground">
              <ShoppingBag className="w-4 h-4 group-hover:text-primary transition-colors" />
              {itemsCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-black text-[8px] font-bold rounded-none px-1 h-3 flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}