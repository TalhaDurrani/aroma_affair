"use client";

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { ProductService } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';
import { ShoppingBag, ChevronRight, Droplet, ShieldCheck } from 'lucide-react';
import { Product } from '@/lib/types';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState('');
  
  const { addItem } = useCart();

  useEffect(() => {
    ProductService.getById(id).then(data => {
      setProduct(data);
      if (data && data.variants && data.variants.length > 0) {
        setSelectedVariantId(data.variants[0].id);
      }
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold tracking-widest uppercase">Loading Atelier...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center font-bold">Product not found</div>;

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem(product, selectedVariant);
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedVariant.size}) has been added.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-24 mt-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-12">
          <a href="/shop" className="hover:text-primary">Shop</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-4">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden border">
              {product.images?.[0] && (
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-2 block">{product.category}</span>
              <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-6">Rs. {selectedVariant?.price || 0}</p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{product.description}</p>
            </div>

            <div className="space-y-8 mb-10">
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
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button size="lg" className="flex-1 h-14 rounded-none uppercase tracking-widest font-bold" onClick={handleAddToCart}>
                <ShoppingBag className="w-5 h-5 mr-2" /> Add to Shopping Bag
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}