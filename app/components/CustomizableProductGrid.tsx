import React from 'react';
import {Link} from 'react-router';
import {Sparkles, Pencil, ArrowRight} from 'lucide-react';
import {CustomizableProductCard} from '~/components/CustomizableProductCard';
import {ProductCard} from '~/components/ProductCard';
import {useConfig} from '~/utils/themeContext';

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price?: any;
  compareAtPrice?: any;
}

interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  tags?: string[];
  featuredImage?: any;
  images?: {
    nodes: Array<{
      url: string;
      altText?: string;
      width?: number;
      height?: number;
    }>;
  };
  media?: {
    nodes: Array<{
      id: string;
      image?: {
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      };
    }>;
  };
  priceRange: any;
  variants: {
    nodes: ProductVariant[];
  };
}

interface CustomizableProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showViewAllLink?: boolean;
  maxProducts?: number;
  useProductCard?: boolean;
}

export function CustomizableProductGrid({
  products,
  title,
  subtitle,
  showViewAllLink = true,
  maxProducts = 4,
  useProductCard = false,
}: CustomizableProductGridProps) {
  const config = useConfig();

  // Use config values for title and subtitle if not provided as props
  const displayTitle =
    title ||
    config.customizableProducts?.title ||
    'Create Custom Products Your Way';
  const displaySubtitle =
    subtitle ||
    config.customizableProducts?.subtitle ||
    'Create one-of-a-kind products featuring your own photos, text, and designs.';

  // Add detailed debug logging
  console.log('CustomizableProductGrid - All products:', products?.length || 0);
  // Log how many customizable products are available
  const customizableCount = products.filter((product) =>
    product.variants?.nodes?.some(
      (variant) => variant?.title?.toLowerCase() === 'custom',
    ),
  ).length;
  console.log(
    `CustomizableProductGrid - Found ${customizableCount} customizable products`,
  );

  products?.forEach((product, i) => {
    // Detailed logging removed for brevity
  });

  // Log all variant titles for easier debugging
  const allVariantTitles = products?.flatMap(
    (product) => product.variants?.nodes?.map((variant) => variant.title) || [],
  );
  console.log('All variant titles:', allVariantTitles);

  // IMPORTANT: Only filter products that have a "custom" variant
  const customizableProducts = products
    .filter((product) =>
      product.variants?.nodes?.some(
        (variant) => variant?.title?.toLowerCase() === 'custom',
      ),
    )
    .slice(0, maxProducts);

  // If no customizable products found, don't render anything
  if (customizableProducts.length === 0) {
    console.log('No customizable products found with "custom" variants');
    return null;
  }

  console.log(
    `Found ${customizableProducts.length} products with custom variants`,
  );

  return (
    <section className="section-spacing-y bg-gradient-to-b from-black via-gray-900/95 to-black">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            <Sparkles className="inline-block w-4 h-4 mr-2" />
            {config.customizableProducts?.badgeText || 'Personalization'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="text-primary">{displayTitle.split(' ')[0]}</span>{' '}
            {displayTitle.split(' ').slice(1, -2).join(' ')}{' '}
            {displayTitle.includes('YOUR WAY') ? (
              <>
                <span>{displayTitle.split(' ').slice(-2, -1)}</span>{' '}
                <span className="text-primary">
                  {displayTitle.split(' ').slice(-1)}
                </span>
              </>
            ) : (
              displayTitle.split(' ').slice(1).join(' ')
            )}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {displaySubtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 card-spacing">
          {customizableProducts.map((product) => (
            <div key={product.id} className="h-full">
              {useProductCard ? (
                <ProductCard product={product} />
              ) : (
                <CustomizableProductCard product={product} />
              )}
            </div>
          ))}
        </div>

        {/* View all link */}
        {showViewAllLink && customizableProducts.length >= maxProducts && (
          <div className="text-center mt-12">
            <Link
              to={
                config.customizableProducts?.viewAllLink ||
                '/customize-products'
              }
              className="inline-flex items-center group"
            >
              <span className="text-primary hover:text-primary-400 font-semibold text-lg">
                {config.customizableProducts?.viewAllText ||
                  'View All Customizable Products'}
              </span>
              <ArrowRight className="ml-2 w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
