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
import FeaturedProducts from '~/components/FeaturedProducts';

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

    // Count customizable and non-customizable products
    const customizableProducts =
      products?.filter((product: any) =>
        product.variants?.nodes?.some(
          (variant: any) => variant?.title?.toLowerCase() === 'custom',
        ),
      ) || [];

    const nonCustomizableProducts =
      products?.filter(
        (product: any) =>
          !product.variants?.nodes?.some(
            (variant: any) => variant?.title?.toLowerCase() === 'custom',
          ),
      ) || [];

    console.log('Products with custom variants:', customizableProducts.length);
    console.log(
      'Products without custom variants:',
      nonCustomizableProducts.length,
    );

    // Update debug info
    setDebugLog([
      `Total products: ${products?.length || 0}`,
      `Exclusive products: ${nonCustomizableProducts.length}`,
      `Customizable products: ${customizableProducts.length}`,
    ]);

    // Log the titles of customizable products
    console.log('Customizable product titles:');
    customizableProducts.forEach((product: any) => {
      console.log(`- ${product.title}`);
    });
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

      {/* Product showcase section - EXCLUSIVE MERCHANDISE (non-customizable products only) */}
      <ProductShowcase
        products={products.filter(
          (product: any) =>
            !product.variants?.nodes?.some(
              (variant: any) => variant?.title?.toLowerCase() === 'custom',
            ),
        )}
        title="EXCLUSIVE MERCHANDISE"
      />

      {/* Customizable Products Section - Show all customizable products */}
      <CustomizableProductGrid
        products={products}
        title="CREATE CUSTOM PRODUCTS YOUR WAY"
        subtitle={`Create one-of-a-kind products featuring your own photos, text, and designs with ${appConfig.influencerName}.`}
        maxProducts={8} // Show more customizable products
      />

      {/* Limited Edition section */}
      {appConfig.showLimitedEdition && <LimitedEdition />}

      {/* Career Highlights section */}
      {appConfig.showCareerHighlights && <CareerHighlights />}

      {/* Featured Products section (renamed from Train with the Champ) */}
      {/* {appConfig.showTrainingSection && <FeaturedProducts />} */}

      {/* Testimonials section - Commented out for initial launch */}
      {/* {appConfig.showTestimonials && <Testimonials />} */}

      {/* Social Feed section - Commented out for initial launch */}
      {/* {appConfig.showSocialFeed && <SocialFeed />} */}

      {/* AI Media Generation section */}
      {appConfig.showAIMediaGeneration && <AIMediaGeneration />}

      {/* Newsletter signup section - Commented out for initial launch */}
      {/* <NewsletterSignup /> */}
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
