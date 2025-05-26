import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {useConfig} from '~/utils/themeContext';
import { AddToCartButton } from '~/components/AddToCartButton';

// Extended interface to handle tags
interface ProductWithTags extends ProductItemFragment {
  tags?: string[];
  variants?: {
    nodes: Array<{
      id: string;
      availableForSale: boolean;
    }>;
  };
}

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductWithTags;
  loading?: 'eager' | 'lazy';
}) {
  const config = useConfig();
  const variantUrl = useVariantUrl(product.handle);
  
  if (!product) return null;
  
  // Cast to the extended interface to access tags
  const productWithTags = product as ProductWithTags;
  const { title, handle, featuredImage } = product;
  const tags = productWithTags.tags || [];
  
  const price = product.priceRange?.minVariantPrice;
  const comparePrice = product.priceRange?.maxVariantPrice && 
    product.priceRange.maxVariantPrice.amount !== product.priceRange.minVariantPrice.amount ? 
    product.priceRange.maxVariantPrice : null;
  
  // Check if the product is on sale
  const isOnSale = comparePrice && price &&
    parseFloat(price.amount) < parseFloat(comparePrice.amount);
    
  // Get the first variant id for add to cart
  const variants = productWithTags.variants?.nodes || [];
  const firstVariant = variants[0];
  const variantId = firstVariant?.id;
  const isAvailable = firstVariant?.availableForSale ?? true;
  
  // Generate mock rating and reviews for display (since Shopify doesn't provide this)
  const rating = 4.8 + (Math.random() * 0.2);
  const reviews = 70 + Math.floor(Math.random() * 60);
  
  // Check if product is a featured product based on config
  const isFeatured = config.shopify.featuredProducts.includes(handle);
  
  // Get product label based on tags or sale status
  const getProductLabel = () => {
    if (isOnSale) return { text: "Sale", color: "bg-gradient-to-r from-red-500 to-red-600" };
    if (isFeatured) return { text: "Featured", color: "bg-primary" };
    if (tags.includes("new")) return { text: "New", color: "bg-gradient-to-r from-green-500 to-green-600" };
    if (tags.includes("bestseller")) return { text: "Bestseller", color: "bg-gradient-to-r from-purple-500 to-purple-600" };
    return null;
  };
  
  const productLabel = getProductLabel();
  
  // Format the variant ID to ensure it has the proper Shopify GID prefix
  const formatVariantId = (id: string) => {
    if (!id) return '';
    if (id.startsWith('gid://shopify/ProductVariant/')) return id;
    
    // Extract the numeric ID if it's already in a GID format
    const numericId = id.includes('/')
      ? id.split('/').pop() || id
      : id;
      
    return `gid://shopify/ProductVariant/${numericId}`;
  };
  
  return (
    <div className="group relative">
      <Link
        to={variantUrl}
        prefetch="intent"
        className="block rounded-lg overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm border border-gray-700/50 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-2 hover:scale-[1.02]"
      >
        <div className="relative h-80 overflow-hidden">
          {featuredImage ? (
            <Image
              data={featuredImage}
              alt={title}
              className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              loading={loading}
            />
          ) : (
            <div className="h-full w-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Product label badge */}
          {productLabel && (
            <div className="absolute top-4 left-4">
              <div className={`${productLabel.color} text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20`}>
                {productLabel.text}
              </div>
            </div>
          )}

          {/* Quick shop overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-primary hover:bg-primary-600 text-black text-center py-3 px-6 rounded-lg font-bold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 uppercase text-sm tracking-wider shadow-lg">
              Quick View
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
            {title}
          </h3>
          
          {/* Rating stars */}
          <div className="flex items-center gap-3">
            <div className="flex text-primary">
              {[...Array(Math.floor(rating))].map((_, i) => (
                <Star key={`full-${i}`} className="w-4 h-4 fill-current" />
              ))}
              {rating % 1 >= 0.5 && (
                <Star className="w-4 h-4 fill-current opacity-50" />
              )}
              {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4 stroke-current fill-transparent opacity-30" />
              ))}
            </div>
            <span className="text-sm text-gray-400 font-medium price-no-hover">({reviews})</span>
          </div>

          {/* Price and Cart Section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {price && (
                <div className="font-bold text-primary text-xl price-no-hover">
                  <Money data={price} />
                </div>
              )}

              {isOnSale && comparePrice && (
                <div className="text-sm text-gray-400 line-through font-medium price-no-hover">
                  <Money data={comparePrice} />
                </div>
              )}
            </div>
            
            {/* Cart button */}
            {isAvailable && variantId && (
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" onClick={(e) => e.stopPropagation()}>
                <AddToCartButton 
                  lines={[{
                    merchandiseId: formatVariantId(variantId),
                    quantity: 1
                  }]}
                  selectedVariant={firstVariant}
                  className="bg-primary hover:bg-primary-600 text-black rounded-lg p-3 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-4 h-4" />
                </AddToCartButton>
              </div>
            )}
          </div>

          {/* Availability Status */}
          <div className="flex justify-between items-center">
            <div className="text-sm">
              {isAvailable ? (
                <span className="text-green-400 font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="text-red-400 font-semibold bg-red-400/10 px-2 py-1 rounded-full">
                  Sold Out
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
