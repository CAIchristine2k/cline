import React from 'react';
import {Star, ShoppingCart} from 'lucide-react';
import {Link} from 'react-router';
import {OptimizedImage} from '~/components/OptimizedImage';
import {Money} from '~/components/Money';
import type {
  ProductItemFragment,
  CollectionItemFragment,
} from '~/types/custom-fragments';
import {useVariantUrl} from '~/lib/variants';
import {useConfig} from '~/utils/themeContext';
import {AddToCartButton} from '~/components/AddToCartButton';

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
  collectionHandle,
}: {
  product: CollectionItemFragment | ProductWithTags;
  loading?: 'eager' | 'lazy';
  collectionHandle?: string;
}) {
  const config = useConfig();
  const variantUrl = useVariantUrl(product.handle);

  if (!product) return null;

  // Cast to the extended interface to access tags
  const productWithTags = product as ProductWithTags;
  const {title, handle} = product;
  const featuredImage = 'featuredImage' in product ? product.featuredImage : ('image' in product ? product.image : undefined);
  const tags = productWithTags.tags || [];

  const price = 'priceRange' in product ? product.priceRange?.minVariantPrice : undefined;
  const comparePrice =
    'priceRange' in product && product.priceRange?.maxVariantPrice &&
    product.priceRange.maxVariantPrice.amount !==
      product.priceRange.minVariantPrice.amount
      ? product.priceRange.maxVariantPrice
      : null;

  // Check if the product is on sale
  const isOnSale =
    comparePrice &&
    price &&
    parseFloat(price.amount) < parseFloat(comparePrice.amount);

  // Get the first variant id for add to cart
  const variants = productWithTags.variants?.nodes || [];
  const firstVariant = variants[0];
  const variantId = firstVariant?.id;
  const isAvailable = firstVariant?.availableForSale ?? true;

  // Generate consistent mock rating and reviews based on product ID
  // Using simple hash function to ensure same product always gets same rating/reviews
  const getConsistentNumber = (str: string, max: number) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % max;
  };

  const possibleRatings = [4.5, 5.0];
  const rating = possibleRatings[getConsistentNumber(product.id, possibleRatings.length)];
  const reviews = 70 + getConsistentNumber(product.id + '-reviews', 60);

  // Check if product is a featured product based on config
  const isFeatured = config.shopify.featuredProducts.includes(handle);

  // Get product label based on tags or sale status
  const getProductLabel = () => {
    // Ne pas afficher de badge pour le produit cadeau
    if (handle === 'brosse-plate-pour-baby-hair') {
      return null;
    }

    if (isOnSale) {
      // Show "-40%" only on vente-flash collection page, "PROMO" elsewhere
      const promoText = collectionHandle === 'vente-flash' ? '-40%' : 'PROMO';
      return {text: promoText, color: 'bg-gradient-to-r from-red-500 to-red-600'};
    }
    if (isFeatured) return {text: 'Vedette', color: 'bg-primary'};
    if (tags.includes('new'))
      return {
        text: 'Nouveau',
        color: 'bg-gradient-to-r from-green-500 to-green-600',
      };
    if (tags.includes('bestseller'))
      return {
        text: 'Best-Seller',
        color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      };
    return null;
  };

  const productLabel = getProductLabel();

  // Format the variant ID to ensure it has the proper Shopify GID prefix
  const formatVariantId = (id: string) => {
    if (!id) return '';
    if (id.startsWith('gid://shopify/ProductVariant/')) return id;

    // Extract the numeric ID if it's already in a GID format
    const numericId = id.includes('/') ? id.split('/').pop() || id : id;

    return `gid://shopify/ProductVariant/${numericId}`;
  };

  return (
    <div className="group relative">
      <Link
        to={variantUrl}
        prefetch="intent"
        className="block rounded-sm overflow-hidden bg-white/60 backdrop-blur-sm border border-primary/30 hover:border-primary transition-all duration-500 shadow-md hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-2 hover:scale-[1.02]"
      >
        <div className="relative aspect-square overflow-hidden">
          {featuredImage ? (
            <OptimizedImage
              data={featuredImage}
              priority={loading === 'eager'}
              showPlaceholder
              aspectRatio="1/1"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500">Pas d'image</span>
            </div>
          )}

          {/* Product label badge */}
          {productLabel && (
            <div className="absolute top-4 left-4">
              <div
                className={`${productLabel.color} text-black text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm shadow-lg backdrop-blur-sm border border-white/20`}
              >
                {productLabel.text}
              </div>
            </div>
          )}

          {/* Quick shop overlay */}
          <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white hover:bg-white/90 text-black text-center py-3 px-6 rounded-sm font-bold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 uppercase text-sm tracking-wider shadow-lg">
              Voir le Produit
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-black font-bold text-lg leading-tight line-clamp-2">
            {title}
          </h3>

          {/* Rating stars */}
          <div className="flex items-center gap-3">
            <div className="flex text-primary">
              {[...Array(Math.floor(rating))].map((_, i) => (
                <Star key={`full-${i}`} className="w-5 h-5 fill-current" />
              ))}
              {rating % 1 >= 0.5 && (
                <Star className="w-5 h-5 fill-current opacity-50" />
              )}
              {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                <Star
                  key={`empty-${i}`}
                  className="w-5 h-5 stroke-current fill-transparent opacity-30"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium price-no-hover">
              ({reviews})
            </span>
          </div>

          {/* Price and Cart Section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {price && (
                <div className="font-bold text-black text-xl price-no-hover bg-primary px-3 py-1.5 rounded-md">
                  <Money data={price} />
                </div>
              )}

              {isOnSale && comparePrice && (
                <div className="text-sm text-black line-through font-medium price-no-hover bg-gray-100 px-2 py-1 rounded" style={{textDecorationColor: '#FF0000'}}>
                  <Money data={comparePrice} />
                </div>
              )}
            </div>

            {/* Cart button */}
            {isAvailable && variantId && (
              <div
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                onClick={(e) => e.stopPropagation()}
              >
                <AddToCartButton
                  lines={[
                    {
                      merchandiseId: formatVariantId(variantId),
                      quantity: 1,
                    },
                  ]}
                  selectedVariant={firstVariant}
                  className="bg-primary hover:bg-primary-400 text-black rounded-sm p-3 transition-all duration-300 transform hover:scale-110 shadow-glow"
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
                <span className="text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                  En Stock
                </span>
              ) : (
                <span className="text-amber-700 font-semibold bg-amber-100 px-3 py-1 rounded-full">
                  Rupture
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
