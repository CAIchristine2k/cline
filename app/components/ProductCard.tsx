import React, {useState} from 'react';
import {Star, ShoppingCart, Eye, Heart} from 'lucide-react';
import {Link} from 'react-router';
import {OptimizedImage} from '~/components/OptimizedImage';
import {Money} from '~/components/Money';
import {AddToCartButton} from '~/components/AddToCartButton';
import {WishlistButton} from '~/components/WishlistButton';
import {LoadingSpinner} from '~/components/LoadingSpinner';
import type {ProductItemFragment} from '~/types/custom-fragments';
import {useConfig} from '~/utils/themeContext';
import {getProductReviewMetadata} from '~/utils/productReviews';

interface VariantNode {
  id: string;
  title?: string;
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
  collectionHandle?: string;
}

export function ProductCard({
  product,
  loading = 'lazy',
  showQuickView = true,
  showWishlist = true,
  customizable = false,
  compact = false,
  collectionHandle,
}: ProductCardProps) {
  const config = useConfig();
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

  // Use featured image or fallback to first variant image
  const productImage = featuredImage || (firstVariant as any)?.image || null;

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

  // ⭐ SINGLE SOURCE OF TRUTH - Utilise l'utilitaire centralisé pour les avis
  // Garantit que le même nombre d'avis est affiché sur la card ET sur la PDP
  const {rating, count: reviews} = getProductReviewMetadata(product.id, handle);

  // Check if product is a featured product based on config
  const isFeatured = config.shopify.featuredProducts.includes(handle);

  // Get product label based on tags or sale status
  const getProductLabel = () => {
    if (isOnSale) {
      // Show dynamic discount percentage on vente-flash collection page
      if (collectionHandle === 'vente-flash' && savingsPercentage > 0) {
        return {text: `-${savingsPercentage}%`, color: 'bg-primary'};
      }
      // Don't show any promo badge on other pages
      return null;
    }
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
    <div className={`group relative bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl ${compact ? 'rounded-lg' : 'rounded-xl'} text-sm lg:text-base flex flex-col h-full`}>
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square flex-shrink-0">
        <Link
          to={`/products/${handle}`}
          prefetch="intent"
          className="block w-full h-full"
          aria-label={`Voir les détails de ${title}`}
        >
          {productImage ? (
            <OptimizedImage
              data={productImage}
              priority={loading === 'eager'}
              showPlaceholder
              aspectRatio="1/1"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
              className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500 text-xs lg:text-sm">Aucune image disponible</span>
            </div>
          )}
        </Link>

        {/* Product Labels */}
        <div className={`absolute flex flex-col gap-1 ${compact ? 'top-1.5 left-1.5 md:top-2 md:left-2' : 'top-4 left-4'}`}>
          {productLabel && (
            <div
              className={`${productLabel.color} text-black font-bold uppercase tracking-wide rounded-sm shadow-md ${compact ? 'text-sm px-3 py-1 md:text-lg md:px-4 md:py-2' : 'text-xl px-6 py-3'}`}
            >
              {productLabel.text}
            </div>
          )}
          {hasCustomVariant && !isCustomVariantOutOfStock && (
            <div className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold uppercase tracking-wider rounded-md shadow-md ${compact ? 'text-[8px] px-1.5 py-0.5 md:text-[9px] md:px-2' : 'text-xs px-3 py-1.5'}`}>
              Personnalisable
            </div>
          )}
          {isCustomVariantOutOfStock && (
            <div className={`bg-red-600/90 text-white font-bold rounded-md shadow-md flex items-center justify-center ${compact ? 'text-[8px] px-1.5 py-0.5 md:text-[9px] md:px-2' : 'text-xs px-3 py-1.5'}`}>
              Rupture
            </div>
          )}
          {!isAvailable && (
            <div className={`bg-red-600/90 text-white font-bold rounded-md shadow-md flex items-center justify-center ${compact ? 'text-[8px] px-1.5 py-0.5 md:text-[9px] md:px-2' : 'text-xs px-3 py-1.5'}`}>
              Rupture
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        {showWishlist && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <WishlistButton
              productId={product.id}
              productHandle={handle}
              productTitle={title}
              productImage={productImage?.url}
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
                prefetch="intent"
                className="bg-white/95 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 hover:scale-105"
                aria-label={`Aperçu rapide de ${title}`}
              >
                <Eye className="w-4 h-4" />
              </Link>
            )}

            {hasCustomVariant && !isCustomVariantOutOfStock && (
              <Link
                to={`/customize-product/${handle}`}
                prefetch="intent"
                className="bg-blue-500/95 hover:bg-blue-500 text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm border border-blue-400/30 hover:scale-105"
                aria-label={`Personnaliser ${title}`}
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
                  aria-label={`Ajouter ${title} au panier`}
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
      <div className={`${compact ? 'p-1.5 md:p-2' : 'p-4 lg:p-6'}`}>
        <Link
          to={`/products/${handle}`}
          prefetch="intent"
          className="block group mb-1"
        >
          <h3 className={`text-gray-900 font-semibold leading-tight group-hover:text-primary transition-colors ${compact ? 'text-[12px] md:text-[12px] min-h-[42px]' : 'text-base lg:text-lg min-h-[48px]'}`}>
            {title}
          </h3>
        </Link>

        {/* Rating stars - Compact */}
        <div className="flex items-center gap-1 mb-1">
          <div
            className="flex text-yellow-400"
            role="img"
            aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}
          >
            {[...Array(Math.floor(rating))].map((_, i) => (
              <Star key={`full-${i}`} className={`${compact ? 'w-1.5 h-1.5 md:w-2 md:h-2' : 'w-5 h-5'} fill-current`} />
            ))}
            {rating % 1 >= 0.5 && (
              <Star className={`${compact ? 'w-1.5 h-1.5 md:w-2 md:h-2' : 'w-5 h-5'} fill-current opacity-50`} />
            )}
            {[...Array(5 - Math.ceil(rating))].map((_, i) => (
              <Star
                key={`empty-${i}`}
                className={`${compact ? 'w-1.5 h-1.5 md:w-2 md:h-2' : 'w-5 h-5'} stroke-current fill-transparent opacity-30`}
              />
            ))}
          </div>
          <span className={`text-gray-500 font-medium ${compact ? 'text-[8px] md:text-[9px]' : 'text-xs'}`}>
            ({reviews})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-0.5">
            {price && (
              <span className={`font-bold text-black ${compact ? 'text-base md:text-lg' : 'text-lg lg:text-xl'}`}>
                <Money data={price} />
              </span>
            )}

            {isOnSale && compareAtPrice && (
              <span className={`text-black line-through font-medium ${compact ? 'text-xs md:text-sm' : 'text-sm lg:text-base'}`} style={{textDecorationColor: '#FF0000'}}>
                <Money data={compareAtPrice} />
              </span>
            )}
          </div>

          {/* Add to Cart Icon */}
          <div className="text-right self-end">
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
                className={`!w-auto !min-w-0 bg-primary hover:bg-primary/90 text-black rounded-full transition-all duration-300 hover:scale-110 flex items-center gap-1 ${compact ? '!px-2 !py-1 md:!px-2.5 md:!py-1' : '!px-3 !py-1.5 lg:!px-4 lg:!py-2'}`}
              >
                {isAddingToCart ? (
                  <span className={`font-semibold whitespace-nowrap ${compact ? 'text-[12px] md:text-[13px]' : 'text-[10px]'}`}>Ajouté au panier</span>
                ) : (
                  <span className={`font-semibold whitespace-nowrap ${compact ? 'text-[12px] md:text-[13px]' : 'text-[10px]'}`}>Acheter</span>
                )}
              </AddToCartButton>
            ) : (
              <span className={`text-red-400 font-semibold bg-red-400/10 rounded-full ${compact ? 'text-[9px] px-1.5 py-0.5' : 'text-xs lg:text-sm px-1.5 py-0.5 lg:px-2 lg:py-1'}`}>
                Rupture
              </span>
            )}
          </div>
        </div>

        {/* Mobile Add to Cart - Hidden in compact mode */}
        {!compact && isAvailable && variantId && (
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
              className="w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-black py-3 px-4 rounded-lg transition-all duration-300 font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] border-2 border-primary"
            >
              {isAddingToCart ? (
                <div className="flex items-center justify-center gap-3 text-xs">
                  <LoadingSpinner size="sm" color="white" />
                  Ajout en cours...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 text-xs">
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
