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
    if (isOnSale) return "Sale";
    if (isFeatured) return "Featured";
    if (tags.includes("new")) return "New";
    if (tags.includes("bestseller")) return "Bestseller";
    return null;
  };
  
  const productLabel = getProductLabel();
  
  return (
    <div className="group relative">
      <Link
        to={variantUrl}
        prefetch="intent"
        className="block rounded-sm overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <div className="relative h-72 overflow-hidden">
          {featuredImage ? (
            <Image
              data={featuredImage}
              alt={title}
              className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              loading={loading}
            />
          ) : (
            <div className="h-full w-full bg-primary/5 flex items-center justify-center">
              <span className="text-primary-700">No image</span>
            </div>
          )}

          {/* Product label badge */}
          {productLabel && (
            <div className="absolute top-3 right-3 bg-primary text-background text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
              {productLabel}
            </div>
          )}

          {/* Quick shop overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-primary hover:bg-primary-400 text-background text-center py-2 px-4 rounded-sm font-bold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 uppercase text-sm tracking-wider">
              Quick View
            </div>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          
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

          {/* Price */}
          <div className="flex justify-between items-center">
            {price && (
              <div className="font-bold text-primary text-lg">
                <Money data={price} />
              </div>
            )}

            {isOnSale && comparePrice && (
              <div className="text-sm text-gray-400 line-through ml-2">
                <Money data={comparePrice} />
              </div>
            )}
            
            {/* Cart button */}
            {isAvailable && variantId && (
              <div className="ml-auto" onClick={(e) => e.stopPropagation()}>
                <AddToCartButton 
                  lines={[{
                    merchandiseId: variantId.startsWith('gid://') 
                      ? variantId 
                      : `gid://shopify/ProductVariant/${variantId.replace('gid://shopify/ProductVariant/', '')}`,
                    quantity: 1
                  }]}
                  className="bg-gray-800 hover:bg-primary text-white hover:text-background rounded-sm p-2.5 transition-all duration-300 transform hover:scale-105"
                >
                  <ShoppingCart className="w-4 h-4" />
                </AddToCartButton>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
