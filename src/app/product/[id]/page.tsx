
"use client";

import { useState, use } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { ProductService } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';
import { ShoppingBag, ChevronRight, Droplet, ShieldCheck } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = ProductService.getById(id);
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants[0]?.id || '');

  if (!product) return <div>Product not found</div>;

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId)!;

  const handleAddToCart = () => {
    addItem(product, selectedVariant);
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedVariant.size}) has been added.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-12">
          <a href="/shop" className="hover:text-primary">Shop</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden border">
              <Image 
                src={product.images[0]} 
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden border cursor-pointer hover:border-primary">
                  <Image src={img} alt={`${product.name} view ${idx}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-2 block">{product.category}</span>
              <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-6">${selectedVariant.price}.00</p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{product.description}</p>
            </div>

            <div className="space-y-8 mb-10">
              {/* Variant Selection */}
              <div>
                <Label className="uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">Select Size</Label>
                <RadioGroup 
                  value={selectedVariantId} 
                  onValueChange={setSelectedVariantId}
                  className="flex flex-wrap gap-4"
                >
                  {product.variants.map((v) => (
                    <div key={v.id}>
                      <RadioGroupItem value={v.id} id={v.id} className="sr-only" />
                      <Label
                        htmlFor={v.id}
                        className={`px-6 py-3 border text-sm font-bold uppercase tracking-widest cursor-pointer transition-all ${
                          selectedVariantId === v.id ? 'bg-primary text-primary-foreground border-primary' : 'hover:border-primary/50'
                        }`}
                      >
                        {v.size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Fragrance Notes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Top Notes</Label>
                  <p className="text-sm font-medium">{product.topNotes.join(', ')}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Middle Notes</Label>
                  <p className="text-sm font-medium">{product.middleNotes.join(', ')}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Base Notes</Label>
                  <p className="text-sm font-medium">{product.baseNotes.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button size="lg" className="flex-1 h-14 rounded-none uppercase tracking-widest font-bold" onClick={handleAddToCart}>
                <ShoppingBag className="w-5 h-5 mr-2" /> Add to Shopping Bag
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" /> Genuine Product
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                <Droplet className="w-4 h-4 text-primary" /> Artisan Fragrance
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
