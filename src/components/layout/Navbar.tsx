
"use client";

import Link from 'next/link';
import { ShoppingBag, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

export function Navbar() {
  const { itemsCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-widest uppercase">
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/collections" className="hover:text-primary transition-colors">Collections</Link>
            <Link href="/about" className="hover:text-primary transition-colors">Our Story</Link>
          </div>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter luxury-text-gradient">
            AROMA AFFAIRE
          </h1>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="w-5 h-5" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
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
