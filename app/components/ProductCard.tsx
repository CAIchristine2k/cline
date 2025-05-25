import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';

interface ProductCardProps {
  product: ProductItemFragment | CollectionItemFragment | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}

export function ProductCard({ product, loading }: ProductCardProps) {
  // Generate mock rating and reviews for display (since Shopify doesn't provide this)
  const rating = 4.8 + (Math.random() * 0.2);
  const reviews = 70 + Math.floor(Math.random() * 60);
  
  return (
    <div className="group relative rounded-sm overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-gold-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-3px]">
      {/* Product image */}
      <div className="relative h-72 overflow-hidden">
        {product.featuredImage && (
          <Image
            data={product.featuredImage}
            alt={product.title}
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading={loading}
          />
        )}
        
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/products/${product.handle}`}
            className="bg-gold-500 hover:bg-gold-400 text-black font-bold py-2 px-4 rounded-sm transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 uppercase text-sm tracking-wider"
          >
            Quick View
          </Link>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-gold-400 transition-colors duration-300">
          {product.title}
        </h3>
        
        {/* Rating stars */}
        <div className="flex items-center mb-3">
          <div className="flex text-gold-500">
            {[...Array(Math.floor(rating))].map((_, i) => (
              <Star key={`full-${i}`} className="w-4 h-4 fill-current" />
            ))}
            {rating % 1 >= 0.5 && (
              <Star className="w-4 h-4 fill-current opacity-50" />
            )}
            {[...Array(5 - Math.ceil(rating))].map((_, i) => (
              <Star key={`empty-${i}`} className="w-4 h-4 stroke-current fill-transparent" />
            ))}
          </div>
          <span className="text-sm text-gray-400 ml-2">({reviews})</span>
        </div>
        
        {/* Price */}
        <div className="flex justify-between items-center">
          <Money 
            data={product.priceRange.minVariantPrice} 
            className="text-gold-500 font-bold text-lg"
          />
          <button 
            className="bg-gray-800 hover:bg-gold-500 text-white hover:text-black rounded-sm p-2.5 transition-all duration-300 transform hover:scale-105"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}