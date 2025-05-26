import { useLoaderData, type LoaderFunctionArgs, type MetaFunction } from 'react-router';
import { getPaginationVariables, Analytics } from '@shopify/hydrogen';
import React from 'react';

// Import configuration and theme system from utils (consistent directory)
import config, { defaultConfig } from '~/utils/config';
import { useTheme, useConfig, useUpdateConfig } from '~/utils/themeContext';

// Import components that match Vue template structure
import { Hero } from '~/components/Hero';
import { ProductShowcase } from '~/components/ProductShowcase';
import LimitedEdition from '~/components/LimitedEdition';
import CareerHighlights from '~/components/CareerHighlights';
import { SocialFeed } from '~/components/SocialFeed';
import Testimonials from '~/components/Testimonials';
import NewsletterSignup from '~/components/NewsletterSignup';

export const meta: MetaFunction = () => {
  return [
    { title: `${config.brandName} - ${config.influencerTitle} | Official Store` },
    { name: 'description', content: `${config.influencerBio.substring(0, 160)}...` },
    { name: 'keywords', content: `${config.influencerName}, ${config.brandName}, boxing equipment, merchandise, champion gear` },
    { property: 'og:title', content: `${config.brandName} - Official Store` },
    { property: 'og:description', content: config.heroSubtitle },
    { property: 'og:image', content: config.brandLogo },
    { property: 'og:type', content: 'website' },
  ];
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
    
    // Debug: Log products info
    console.log('Products fetched:', products ? products.length : 0);
    if (products && products.length > 0) {
      console.log('First product:', products[0].title);
    } else {
      console.log('No products found in Shopify store');
    }
    
    // Fetch all collections
    const collectionsResponse = await context.storefront.query(FEATURED_COLLECTIONS_QUERY, {
      variables: { first: 10 },
    });
    collections = collectionsResponse.collections?.nodes || [];
    console.log('Collections fetched:', collections.length);
    
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
      // Only update if collections have changed to prevent infinite loop
      const hasShopifyCollections = config.shopifyCollections && config.shopifyCollections.length > 0;
      
      // Check if we already have these collections (by comparing first collection ID)
      const firstNewId = collections[0]?.id;
      const firstCurrentId = config.shopifyCollections?.[0]?.id;
      
      if (!hasShopifyCollections || firstNewId !== firstCurrentId) {
        updateConfig({ 
          shopifyCollections: collections 
        });
      }
    }
  }, [collections, updateConfig, config.shopifyCollections]);

  console.log('Products fetched:', products?.length || 0);
  console.log('First product:', products?.[0]?.title || 'None');
  console.log('Collections fetched:', collections?.length || 0);

  return (
    <div data-theme={config.brandStyle} className="min-h-screen bg-black text-white overflow-x-hidden">
      <main>
        {/* Each component uses the shared config from context */}
        <Hero />
        
        {/* Pass Shopify products to the ProductShowcase component */}
        {products && products.length > 0 ? (
          <ProductShowcase 
            products={products}
            title="EXCLUSIVE MERCHANDISE"
            subtitle={`Premium quality products inspired by the legacy of ${config.influencerName}.`}
          />
        ) : (
          // Fallback message when no products are available
          <section id="shop" className="py-24 bg-gradient-to-b from-black via-gray-900/95 to-black">
            <div className="container mx-auto px-4 text-center">
              <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
                Coming Soon
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-5">
                <span className="text-primary">EXCLUSIVE</span> MERCHANDISE
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
                Our collection is being crafted. Please check back soon for our premium products.
              </p>
            </div>
          </section>
        )}
        
        {/* Conditional sections based on config */}
        {config.showLimitedEdition && <LimitedEdition />}
        
        {config.showCareerHighlights && <CareerHighlights />}
        
        {config.showTestimonials && <Testimonials />}
        
        {config.showSocialFeed && <SocialFeed />}
        
        <NewsletterSignup />

        {/* Analytics tracking for homepage */}
        <Analytics.CustomView type="custom_homepage_viewed" data={{}} />
      </main>
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
const FEATURED_COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections($first: Int, $handle: String) {
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
