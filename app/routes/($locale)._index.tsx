import {
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router';

// Import configuration and theme system from utils (consistent directory)
import config, {defaultConfig} from '~/utils/config';
import {useTheme, useConfig, useUpdateConfig} from '~/utils/themeContext';

// Import components that match Vue template structure
import {Hero} from '~/components/Hero';
import {ProductShowcase} from '~/components/ProductShowcase';
import LimitedEdition from '~/components/LimitedEdition';
import CareerHighlights from '~/components/CareerHighlights';
import {SocialFeed} from '~/components/SocialFeed';
import {AIMediaGeneration} from '~/components/AIMediaGeneration';
import {CustomizableProductGrid} from '~/components/CustomizableProductGrid';
import Testimonials from '~/components/Testimonials';
import NewsletterSignup from '~/components/NewsletterSignup';

export const meta: MetaFunction = () => {
  return [
    {title: `${config.brandName} - ${config.influencerTitle} | Official Store`},
    {
      name: 'description',
      content: `${config.influencerBio.substring(0, 160)}...`,
    },
    {
      name: 'keywords',
      content: `${config.influencerName}, ${config.brandName}, boxing equipment, merchandise, champion gear`,
    },
    {property: 'og:title', content: `${config.brandName} - Official Store`},
    {property: 'og:description', content: config.heroSubtitle},
    {property: 'og:image', content: config.brandLogo},
    {property: 'og:type', content: 'website'},
  ];
};

// Define loader function to fetch all products
export async function loader({request, context}: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const variables = getPaginationVariables(request, {pageBy: 10});

  // Get all products with more variants
  const {products} = await context.storefront.query(PRODUCTS_QUERY, {
    variables,
  });

  // Get collections
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);

  // Get featured collection
  const featuredCollection = collections?.nodes.find(
    (collection: any) => collection.handle === 'frontpage',
  );

  return {
    products: products.nodes,
    featuredCollection,
    collections: collections.nodes,
  };
}

export default function Home() {
  const {products, featuredCollection} = useLoaderData<typeof loader>();
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const appConfig = useConfig();

  useEffect(() => {
    // Debug logging for products
    console.log('Index: Total products loaded:', products?.length || 0);

    // Log each product's variants
    products?.forEach((product: any, i: number) => {
      console.log(`Product ${i + 1}: ${product.title}`);

      // Log variants
      const variants = product.variants?.nodes || [];
      console.log('  Variants:', variants.length);
      variants.forEach((variant: any, j: number) => {
        console.log(`    Variant ${j + 1}: ${variant.title}`);
      });

      // Check for custom variants
      const hasCustomVariant = variants.some(
        (variant: any) => variant?.title?.toLowerCase() === 'custom',
      );

      if (hasCustomVariant) {
        console.log('  ✓ HAS CUSTOM VARIANT');
      } else {
        console.log('  ✗ NO CUSTOM VARIANT');
      }
    });

    // Count products with custom variants
    const customizableCount =
      products?.filter((product: any) =>
        product.variants?.nodes?.some(
          (variant: any) => variant?.title?.toLowerCase() === 'custom',
        ),
      ).length || 0;

    console.log('Products with custom variants:', customizableCount);

    // Update debug info
    setDebugLog([
      `Total products: ${products?.length || 0}`,
      `Products with custom variants: ${customizableCount}`,
    ]);
  }, [products]);

  return (
    <main>
      <Hero />

      {/* Debug info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 text-xs z-50 rounded border border-primary">
          <div className="font-bold mb-1">Debug Info:</div>
          {debugLog.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      )}

      {/* Product showcase section */}
      <ProductShowcase products={products} title="EXCLUSIVE MERCHANDISE" />

      {/* Customizable Products Section */}
      <CustomizableProductGrid
        products={products}
        title="CUSTOMIZE YOUR OWN"
        subtitle={`Create one-of-a-kind products featuring your own photos, text, and designs with ${appConfig.influencerName}.`}
      />

      {/* Limited Edition section */}
      {appConfig.showLimitedEdition && <LimitedEdition />}

      {/* Career Highlights section */}
      {appConfig.showCareerHighlights && <CareerHighlights />}

      {/* Testimonials section */}
      {appConfig.showTestimonials && <Testimonials />}

      {/* Social Feed section */}
      {appConfig.showSocialFeed && <SocialFeed />}

      {/* AI Media Generation section */}
      {appConfig.showAIMediaGeneration && <AIMediaGeneration />}

      {/* Newsletter signup section */}
      <NewsletterSignup />
    </main>
  );
}

// GraphQL query to fetch all products
const PRODUCTS_QUERY = `#graphql
  query products($first: Int, $last: Int, $startCursor: String, $endCursor: String) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        id
        title
        description
        handle
        tags
        featuredImage {
          id
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 25) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
              width
              height
            }
          }
        }
        images(first: 1) {
          nodes {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

// GraphQL query to fetch all collections
const COLLECTIONS_QUERY = `#graphql
  query collections {
    collections(first: 10) {
      nodes {
        id
        title
        handle
        description
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;
