import React from 'react';
import { Link } from 'react-router';
import { Image as ImageIcon, Pencil, Sparkles } from 'lucide-react';
import { Image as ShopifyImage, Money } from '@shopify/hydrogen';
import { useConfig } from '~/utils/themeContext';

// Internal components
function Image({ src, alt, className, sizes }: { src: string; alt?: string; className?: string; sizes?: string }) {
  if (!src) return null;
  
  return (
    <img 
      src={src} 
      alt={alt || 'Product image'} 
      className={className || 'w-full h-full object-cover'} 
      sizes={sizes}
    />
  );
}

function PriceRange({ priceRange }: { priceRange: any }) {
  if (!priceRange?.minVariantPrice) return null;
  
  const { minVariantPrice, maxVariantPrice } = priceRange;
  const minPrice = minVariantPrice.amount;
  const maxPrice = maxVariantPrice?.amount;
  
  // Different prices in the range
  if (maxPrice && parseFloat(minPrice) < parseFloat(maxPrice)) {
    return (
      <div className="flex items-center gap-1">
        <Money data={minVariantPrice} className="text-primary font-bold" />
        <span className="text-gray-400">-</span>
        <Money data={maxVariantPrice} className="text-primary font-bold" />
      </div>
    );
  }
  
  // Same price or no max price
  return <Money data={minVariantPrice} className="text-primary font-bold" />;
}

interface CustomizableProductCardProps {
  product: any;
}

export function CustomizableProductCard({ product }: CustomizableProductCardProps) {
  const config = useConfig();
  
  if (!product) return null;
  
  const { handle, title, images, priceRange } = product;
  const firstImage = images?.nodes?.[0];
  
  return (
    <div className="group relative flex flex-col bg-black/40 backdrop-blur-sm border border-primary/30 p-4 rounded-sm overflow-hidden h-full shadow-md hover:shadow-lg transition-all duration-300">
      <div className="absolute top-2 right-2 z-10 bg-primary text-black text-xs font-bold px-3 py-1 rounded-sm flex items-center">
        <Pencil className="w-3 h-3 mr-1" />
        Customize
      </div>
      
      <Link to={`/customize-product/${handle}`} className="block relative overflow-hidden rounded-sm mb-4 aspect-[4/5]">
        {firstImage ? (
          <div className="relative w-full h-full overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <Image
              src={firstImage.url}
              alt={firstImage.altText || title}
              className="w-full h-full object-cover"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center bg-primary/90 text-black px-3 py-1 rounded-sm text-sm font-medium">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  Design Your Own
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </Link>
      
      <div className="flex-grow">
        <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        
        {priceRange && (
          <div className="text-gray-300 text-sm mb-3">
            <PriceRange priceRange={priceRange} />
          </div>
        )}
        
        <p className="text-gray-400 text-sm mb-4">
          Create your own custom design
        </p>
      </div>
      
      <Link
        to={`/customize-product/${handle}`}
        className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary-600 text-black font-bold py-2 px-4 rounded-sm transition duration-300 ease-in-out"
      >
        <Pencil className="w-4 h-4 mr-2" />
        Customize Now
      </Link>
    </div>
  );
} 