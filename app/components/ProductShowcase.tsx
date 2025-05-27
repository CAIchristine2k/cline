import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { ProductCard } from '~/components/ProductCard';
import { useConfig } from '~/utils/themeContext';
import type { ProductItemFragment } from 'storefrontapi.generated';

interface ProductShowcaseProps {
  products: ProductItemFragment[];
  title?: string;
  subtitle?: string;
  loading?: 'eager' | 'lazy';
}

export function ProductShowcase({ 
  products, 
  title = "EXCLUSIVE MERCHANDISE", 
  subtitle, 
  loading = 'lazy' 
}: ProductShowcaseProps) {
  const config = useConfig();
  
  // Generate default subtitle from config if not provided
  const defaultSubtitle = `Premium quality products inspired by the legacy of ${config.influencerName}. Elevate your performance with our exclusive collection.`;
  const effectiveSubtitle = subtitle || defaultSubtitle;

  return (
    <section id="shop" className="py-24 bg-gradient-to-b from-black via-gray-900/95 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -right-20 top-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -left-40 bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Premium Collection
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="text-primary">{title.split(' ')[0]}</span> {title.split(' ').slice(1).join(' ')}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {effectiveSubtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              loading={loading}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/collections/all"
            prefetch="intent" 
            className="group inline-flex items-center justify-center bg-transparent hover:bg-primary text-primary hover:text-background border-2 border-primary font-bold py-3.5 px-10 rounded-sm transition-all duration-300 uppercase tracking-wider"
          >
            <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}