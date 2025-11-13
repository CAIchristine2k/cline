import React, {useState} from 'react';
import {Star, ShoppingCart, Eye, Heart} from 'lucide-react';
import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {Money} from '~/components/Money';
import {AddToCartButton} from '~/components/AddToCartButton';
import {WishlistButton} from '~/components/WishlistButton';
import {LoadingSpinner} from '~/components/LoadingSpinner';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useConfig} from '~/utils/themeContext';

interface VariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
  price?: any;
  compareAtPrice?: any;
}

interface ProductItemExtendedFragment extends ProductItemFragment {
  description?: string;
  tags?: string[];
  variants?: {
    nodes: Array<VariantNode>;
  };
}

interface ProductCardProps {
  product: ProductItemExtendedFragment;
  loading?: 'eager' | 'lazy';
  label?: string;
  showQuickView?: boolean;
  showWishlist?: boolean;
  customizable?: boolean;
  compact?: boolean;
}

export function ProductCard({
  product,
  loading = 'lazy',
  showQuickView = true,
  showWishlist = true,
  customizable = false,
  compact = false,
}: ProductCardProps) {
  const config = useConfig();
  const [imageLoading, setImageLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product) return null;

  const {title, handle, featuredImage, tags = []} = product;
  const variants = product.variants?.nodes || [];
  const firstVariant =
    (variants[0] as VariantNode | undefined) || ({} as VariantNode);

  const price = firstVariant?.price;
  const compareAtPrice = firstVariant?.compareAtPrice;
  const isAvailable = Boolean(firstVariant?.availableForSale);
  const variantId = firstVariant?.id;

  // Check if the product is on sale
  const isOnSale =
    compareAtPrice &&
    price &&
    parseFloat(price.amount) < parseFloat(compareAtPrice.amount);

  // Calculate savings percentage
  const savingsPercentage =
    isOnSale && compareAtPrice && price
      ? Math.round(
          (1 - parseFloat(price.amount) / parseFloat(compareAtPrice.amount)) *
            100,
        )
      : 0;

  // Generate mock rating and reviews for display (since Shopify doesn't provide this)
  const rating = 4.8 + Math.random() * 0.2;
  const reviews = 70 + Math.floor(Math.random() * 60);

  // Check if product is a featured product based on config
  const isFeatured = config.shopify.featuredProducts.includes(handle);

  // Get product label based on tags or sale status
  const getProductLabel = () => {
    if (isOnSale) return {text: 'Sale', color: 'bg-red-500'};
    if (isFeatured) return {text: 'Featured', color: 'bg-primary'};
    if (tags && tags.includes('new'))
      return {text: 'New', color: 'bg-green-500'};
    if (tags && tags.includes('bestseller'))
      return {text: 'Bestseller', color: 'bg-purple-500'};
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

  // Handle add to cart with loading state
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 2000);
  };

  // Check if this product has a "custom" variant option - safely check title exists
  const hasCustomVariant = product?.variants?.nodes?.some(
    (variant) => variant?.title?.toLowerCase?.() === 'custom',
  );

  // Get the custom variant specifically
  const customVariant = product?.variants?.nodes?.find(
    (variant) => variant?.title?.toLowerCase?.() === 'custom',
  );

  // Check if custom variant is out of stock
  const isCustomVariantOutOfStock =
    customVariant && !customVariant.availableForSale;

  // If customizable flag is true, only show products with custom variants
  if (customizable && !hasCustomVariant) {
    return null;
  }

  return (
    <div className={`group relative bg-white backdrop-blur-sm border border-primary/30 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary hover:-translate-y-1 hover:scale-[1.01] ${compact ? 'max-w-[200px] mx-auto' : 'max-w-[280px] mx-auto'}`}>
      {/* Image Container */}
      <div className={`relative overflow-hidden ${compact ? 'aspect-square' : 'h-48'}`}>
        <Link
          to={`/products/${handle}`}
          prefetch="intent"
          className="block w-full h-full"
          aria-label={`View ${title} details`}
        >
          {featuredImage ? (
            <div className="relative w-full h-full">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <LoadingSpinner size="lg" color="primary" />
                </div>
              )}
              <Image
                data={featuredImage}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                loading={loading}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
            </div>
          ) : (
            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image available</span>
            </div>
          )}
        </Link>

        {/* Product Labels */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {productLabel && (
            <div
              className={`${productLabel.color} text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20`}
            >
              {productLabel.text}
            </div>
          )}
          {savingsPercentage > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
              -{savingsPercentage}%
            </div>
          )}
          {hasCustomVariant && !isCustomVariantOutOfStock && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
              Customizable
            </div>
          )}
          {isCustomVariantOutOfStock && (
            <div className="bg-red-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
              Custom Out of Stock
            </div>
          )}
          {!isAvailable && (
            <div className="bg-gray-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
              Sold Out
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        {showWishlist && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <WishlistButton
              productId={product.id}
              productTitle={title}
              productImage={featuredImage?.url}
              productPrice={price?.amount}
              size="md"
            />
          </div>
        )}

        {/* Action buttons - visible on hover */}
        <div className="absolute bottom-4 right-4 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex gap-3">
            {showQuickView && (
              <Link
                to={`/products/${handle}`}
                className="bg-white/95 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 hover:scale-105"
                aria-label={`Quick view ${title}`}
              >
                <Eye className="w-4 h-4" />
              </Link>
            )}

            {hasCustomVariant && !isCustomVariantOutOfStock && (
              <Link
                to={`/customize-product/${handle}`}
                className="bg-blue-500/95 hover:bg-blue-500 text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm border border-blue-400/30 hover:scale-105"
                aria-label={`Customize ${title}`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  🎨
                </div>
              </Link>
            )}

            {isAvailable && variantId && (
              <div onClick={(e) => e.stopPropagation()}>
                <AddToCartButton
                  lines={[
                    {
                      merchandiseId: formatVariantId(variantId),
                      quantity: 1,
                    },
                  ]}
                  selectedVariant={firstVariant}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="bg-primary hover:bg-primary-600 text-black p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center backdrop-blur-sm border border-primary/30 hover:scale-105"
                  aria-label={`Add ${title} to cart`}
                >
                  {isAddingToCart ? (
                    <LoadingSpinner size="sm" color="white" />
                  ) : (
                    <ShoppingCart className="w-4 h-4" />
                  )}
                </AddToCartButton>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className={`space-y-4 ${compact ? 'p-4' : 'p-6'}`}>
        <Link
          to={`/products/${handle}`}
          prefetch="intent"
          className="block group"
        >
          <h3 className={`text-black font-bold leading-tight line-clamp-2 ${compact ? 'text-base' : 'text-lg'}`}>
            {title}
          </h3>
        </Link>

        {/* Rating stars */}
        <div className="flex items-center gap-3">
          <div
            className="flex text-primary"
            role="img"
            aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}
          >
            {[...Array(Math.floor(rating))].map((_, i) => (
              <Star key={`full-${i}`} className="w-4 h-4 fill-current" />
            ))}
            {rating % 1 >= 0.5 && (
              <Star className="w-4 h-4 fill-current opacity-50" />
            )}
            {[...Array(5 - Math.ceil(rating))].map((_, i) => (
              <Star
                key={`empty-${i}`}
                className="w-4 h-4 stroke-current fill-transparent opacity-30"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium price-no-hover">
            ({reviews})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {price && (
              <span className="font-bold text-black text-xl price-no-hover bg-[#ffa3ae] px-3 py-1.5 rounded-md">
                <Money data={price} />
              </span>
            )}

            {isOnSale && compareAtPrice && (
              <span className="text-sm text-gray-500 line-through font-medium price-no-hover bg-gray-100 px-2 py-1 rounded">
                <Money data={compareAtPrice} />
              </span>
            )}
          </div>

          {/* Add to Cart Icon */}
          <div className="text-right">
            {isAvailable ? (
              <AddToCartButton
                lines={[
                  {
                    merchandiseId: formatVariantId(variantId),
                    quantity: 1,
                  },
                ]}
                disabled={isAddingToCart || !isAvailable}
                onClick={handleAddToCart}
                className="!p-2 !w-auto !min-w-0 bg-primary hover:bg-primary/90 text-black rounded-full transition-all duration-300 hover:scale-110 flex items-center gap-1"
              >
                {isAddingToCart ? (
                  <span className="text-xs font-semibold">Ajouté</span>
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
              </AddToCartButton>
            ) : (
              <span className="text-red-400 text-sm font-semibold bg-red-400/10 px-2 py-1 rounded-full">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Mobile Add to Cart (visible on mobile only) */}
        {isAvailable && variantId && (
          <div className="md:hidden pt-2">
            <AddToCartButton
              lines={[
                {
                  merchandiseId: formatVariantId(variantId),
                  quantity: 1,
                },
              ]}
              selectedVariant={firstVariant}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-black py-3 px-4 rounded-lg transition-all duration-300 font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:scale-[1.01]"
            >
              {isAddingToCart ? (
                <div className="flex items-center justify-center gap-3">
                  <LoadingSpinner size="sm" color="white" />
                  Ajout en cours...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter au panier
                </div>
              )}
            </AddToCartButton>
          </div>
        )}
      </div>
    </div>
  );
}
