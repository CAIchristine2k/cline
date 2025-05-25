import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { AddToCartButton } from '~/components/AddToCartButton';
import type {
  ProductItemFragment,
} from 'storefrontapi.generated';
import { defaultConfig } from '~/lib/config';

interface ProductItemExtendedFragment extends ProductItemFragment {
  description?: string;
  tags?: string[];
  variants?: {
    nodes: Array<{
      id: string;
      availableForSale: boolean;
    }>;
  };
}

interface ProductCardProps {
  product: ProductItemExtendedFragment;
  loading?: 'eager' | 'lazy';
  label?: string;
}

export function ProductCard({ product, loading, label }: ProductCardProps) {
  // Generate mock rating and reviews for display (since Shopify doesn't provide this)
  const rating = 4.8 + (Math.random() * 0.2);
  const reviews = 70 + Math.floor(Math.random() * 60);

  // Find the first available variant - for add to cart functionality
  const firstVariant = product.variants?.nodes[0];
  
  return (
    <div className="group relative rounded-sm overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-3px]">
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
        
        {/* Badge/Label if available */}
        {(label || product.tags?.some(tag => 
          tag === 'New' || tag === 'Bestseller' || tag === 'Sale'
        )) && (
          <div className="absolute top-3 right-3 bg-primary text-black text-xs font-bold py-1 px-3 rounded-sm">
            {label || product.tags?.find(tag => 
              tag === 'New' || tag === 'Bestseller' || tag === 'Sale'
            )}
          </div>
        )}
        
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/products/${product.handle}`}
            className="bg-primary hover:bg-primary/90 text-black font-bold py-2 px-4 rounded-sm transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 uppercase text-sm tracking-wider"
          >
            Quick View
          </Link>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
          {product.title}
        </h3>
        
        {/* Optional product description */}
        {product.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Optional product features from tags */}
        {product.tags && product.tags.length > 0 && !product.tags.every(tag => 
          tag === 'New' || tag === 'Bestseller' || tag === 'Sale'
        ) && (
          <ul className="space-y-2 mb-4">
            {product.tags
              .filter(tag => tag !== 'New' && tag !== 'Bestseller' && tag !== 'Sale')
              .slice(0, 2)
              .map((feature, idx) => (
                <li key={idx} className="flex items-start text-xs text-gray-500">
                  <div className="w-1 h-1 bg-primary rounded-full mr-2 mt-1.5"></div>
                  <span>{feature}</span>
                </li>
              ))
            }
          </ul>
        )}
        
        {/* Rating stars */}
        <div className="flex items-center mb-3">
          <div className="flex text-primary">
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
        
        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center">
          {product.priceRange?.minVariantPrice && (
            <Money 
              data={product.priceRange.minVariantPrice} 
              className="text-primary font-bold text-lg"
            />
          )}
          
          {firstVariant?.availableForSale ? (
            <AddToCartButton
              lines={[{
                merchandiseId: firstVariant.id,
                quantity: 1,
              }]}
              className="bg-gray-800 hover:bg-primary text-white hover:text-black rounded-sm p-2.5 transition-all duration-300 transform hover:scale-105"
              disabled={!firstVariant.availableForSale}
            >
              <ShoppingCart className="w-4 h-4" />
            </AddToCartButton>
          ) : (
            <button 
              disabled
              className="bg-gray-700 text-gray-400 rounded-sm p-2.5 cursor-not-allowed"
              aria-label="Out of stock"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}