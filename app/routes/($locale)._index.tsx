import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { getPaginationVariables } from '@shopify/hydrogen';
import React from 'react';

// Import configuration and theme system from utils (consistent directory)
import { defaultConfig } from '~/utils/config';
import { useTheme, useConfig, useUpdateConfig } from '~/utils/themeContext';

// Import components that match Vue template structure
import { Hero } from '~/components/Hero';
import ProductShowcase from '~/components/ProductShowcase';
import LimitedEdition from '~/components/LimitedEdition';
import CareerHighlights from '~/components/CareerHighlights';
import SocialFeed from '~/components/SocialFeed';
import Testimonials from '~/components/Testimonials';
import NewsletterSignup from '~/components/NewsletterSignup';
import { Footer } from '~/components/Footer';

export const meta = () => {
  return [{ title: `${defaultConfig.brandName} | ${defaultConfig.influencerTitle}` }];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  // Handle pagination variables properly
  const queryVariables = 'first' in paginationVariables 
    ? { first: paginationVariables.first, after: paginationVariables.endCursor }
    : { first: 8, after: null };

  // Fetch products from Shopify for the ProductShowcase component
  let products = null;
  let featuredCollection = null;
  let collections: any[] = [];

  try {
    // Fetch featured products
    const productsResponse = await context.storefront.query(PRODUCTS_QUERY, {
      variables: { ...queryVariables, sortKey: 'BEST_SELLING' },
    });
    products = productsResponse.products?.nodes;
    
    // Fetch all collections
    const collectionsResponse = await context.storefront.query(COLLECTIONS_QUERY, {
      variables: { first: 10 },
    });
    collections = collectionsResponse.collections?.nodes || [];
    
    // Try to find featured collection by handle first
    featuredCollection = collections.find((collection: any) => 
      collection.handle === 'featured' || 
      collection.handle === 'homepage' || 
      collection.title.toLowerCase().includes('featured')
    );
    
    // If no featured collection found, use the first collection
    if (!featuredCollection && collections.length > 0) {
      featuredCollection = collections[0];
    }
  } catch (error) {
    console.error('Error fetching products or collections:', error);
  }

  return {
    products,
    featuredCollection,
    collections,
    // Return the Shopify data but do not modify the config here
    // The config will be handled by the ThemeProvider context
  };
}

export default function Homepage() {
  const { products, featuredCollection, collections } = useLoaderData<typeof loader>();
  
  // Use the centralized configuration from context
  const { config } = useTheme();
  const updateConfig = useUpdateConfig();
  
  // Update config with Shopify data if available - but maintain single source of truth
  // by using the context system
  React.useEffect(() => {
    if (collections && collections.length > 0) {
      updateConfig({ 
        shopifyCollections: collections 
      });
    }
  }, [collections, updateConfig]);

  return (
    <div data-theme={config.brandStyle} className="min-h-screen bg-black text-white overflow-x-hidden">
      <main>
        {/* Each component uses the shared config from context */}
        <Hero />
        
        {/* Pass Shopify data to components that need it */}
        <ProductShowcase 
          products={products} 
          featuredCollection={featuredCollection} 
        />
        
        {/* Conditional sections based on config */}
        {config.showLimitedEdition && <LimitedEdition />}
        
        {config.showCareerHighlights && <CareerHighlights />}
        
        {config.showTestimonials && <Testimonials />}
        
        {config.showSocialFeed && <SocialFeed />}
        
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  );
}

// Updated Shopify GraphQL query for products
const PRODUCTS_QUERY = `#graphql
  query Products($first: Int, $last: Int, $startCursor: String, $endCursor: String, $sortKey: ProductSortKeys) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor, sortKey: $sortKey) {
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
        variants(first: 1) {
          nodes {
            id
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
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;

// Shopify GraphQL query for collections
const COLLECTIONS_QUERY = `#graphql
  query Collections($first: Int, $handle: String) {
    collections(first: $first, query: $handle) {
      nodes {
        id
        title
        handle
        description
        image {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
` as const;
