import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { AddToCartButton } from '~/components/AddToCartButton';
import type {
  ProductItemFragment,
} from 'storefrontapi.generated';
import { useConfig } from '~/utils/themeContext';

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

export function ProductCard({ product }: { product: any }) {
  const config = useConfig();

  if (!product) return null;

  const { title, handle, featuredImage } = product;
  const firstVariant = product.variants?.nodes?.[0] || {};
  const price = firstVariant.price;
  const compareAtPrice = firstVariant.compareAtPrice;

  // Check if the product is on sale
  const isOnSale = compareAtPrice && price &&
    parseFloat(price.amount) < parseFloat(compareAtPrice.amount);

  return (
    <Link
      to={`/products/${handle}`}
      prefetch="intent"
      className="group block"
    >
      <div className="relative overflow-hidden rounded-sm border border-primary/10 bg-background/30 backdrop-blur-sm transition-all duration-300 group-hover:shadow-glow">
        <div className="aspect-[4/5] overflow-hidden">
          {featuredImage ? (
            <Image
              data={featuredImage}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          ) : (
            <div className="h-full w-full bg-primary/5 flex items-center justify-center">
              <span className="text-primary-700">No image</span>
            </div>
          )}

          {/* Sale badge */}
          {isOnSale && (
            <div className="absolute top-2 right-2 bg-primary text-background text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
              Sale
            </div>
          )}

          {/* Quick shop button on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <div className="bg-primary/90 backdrop-blur-sm text-background text-center py-2 px-4 rounded-sm font-medium">
              Quick Shop
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {title}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            {price && (
              <div className="font-medium text-primary">
                <Money data={price} />
              </div>
            )}

            {isOnSale && compareAtPrice && (
              <div className="text-sm text-primary-600 line-through">
                <Money data={compareAtPrice} />
              </div>
            )}
          </div>

          <div className="mt-2 text-sm">
            <span className={`${firstVariant.availableForSale ? 'text-green-500' : 'text-red-500'}`}>
              {firstVariant.availableForSale ? 'In stock' : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}