import {
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import React from 'react';
import {Link} from 'react-router';

// Import configuration and theme system from utils (consistent directory)
import config, {defaultConfig} from '~/utils/config';
import {useTheme, useConfig, useUpdateConfig} from '~/utils/themeContext';

// Import components that match Vue template structure
import {Hero} from '~/components/Hero';
import {ProductShowcase} from '~/components/ProductShowcase';
import LimitedEdition from '~/components/LimitedEdition';
import TrustBadges from '~/components/TrustBadges';
import CareerHighlights from '~/components/CareerHighlights';
import {SocialFeed} from '~/components/SocialFeed';
import {AIMediaGeneration} from '~/components/AIMediaGeneration';
import {CustomizableProductGrid} from '~/components/CustomizableProductGrid';
import Testimonials from '~/components/Testimonials';
import NewsletterSignup from '~/components/NewsletterSignup';
import FeaturedProducts from '~/components/FeaturedProducts';
import {FeaturedProductsSection} from '~/components/FeaturedProductsSection';
import {ComparisonTable} from '~/components/ComparisonTable';
import {CategoryGrid} from '~/components/CategoryGrid';

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

  // Get best-sellers collection
  console.log('📦 Available collections:', collections?.nodes.map((c: any) => c.handle));

  // Try multiple possible handles
  let bestSellersCollection = collections?.nodes.find(
    (collection: any) => collection.handle === 'best-sellers',
  );

  if (!bestSellersCollection) {
    bestSellersCollection = collections?.nodes.find(
      (collection: any) => collection.handle === 'collections/best-sellers',
    );
  }

  console.log('🏆 Best-sellers collection found:', !!bestSellersCollection);
  console.log('🏆 Collection handle:', bestSellersCollection?.handle);

  // Get best-sellers products if collection exists
  let bestSellersProducts = [];
  if (bestSellersCollection) {
    const {collection} = await context.storefront.query(BESTSELLERS_COLLECTION_QUERY, {
      variables: {handle: bestSellersCollection.handle},
    });
    bestSellersProducts = collection?.products?.nodes || [];
    console.log('🛍️ Best-sellers products count:', bestSellersProducts.length);
  } else {
    console.warn('⚠️ Best-sellers collection not found, using fallback products');
  }

  return {
    products: products.nodes,
    featuredCollection,
    collections: collections.nodes,
    bestSellersProducts,
  };
}

export default function Home() {
  const {products, featuredCollection, bestSellersProducts} = useLoaderData<typeof loader>();
  const appConfig = useConfig();

  return (
    <main>
      <Hero />

      {/* Product showcase section - BEST SELLERS (from best-sellers collection) */}
      <ProductShowcase
        products={bestSellersProducts && bestSellersProducts.length > 0 ? bestSellersProducts : products.slice(0, 6)}
        title="EXCLUSIVE MERCHANDISE"
      />

      {/* Category Grid - 6 catégories */}
      <CategoryGrid />

      {/* Customizable Products Section - Show all customizable products */}
      <CustomizableProductGrid
        products={products}
        title="CREATE CUSTOM PRODUCTS YOUR WAY"
        subtitle={`Create one-of-a-kind products featuring your own photos, text, and designs with ${appConfig.influencerName}.`}
        maxProducts={8} // Show more customizable products
      />

      {/* Limited Edition section */}
      {appConfig.showLimitedEdition && <LimitedEdition />}

      {/* Career Highlights section - Histoire de C'Line Hair */}
      {/* <CareerHighlights /> */}

      {/* Testimonials section - Avis clients 5★ */}
      <Testimonials />

      {/* Featured Products Section - New elegant product showcase */}
      <FeaturedProductsSection products={products} />

      {/* Comparison Table - Nous VS Concurrents */}
      <ComparisonTable />

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

      {/* Trust Badges section - Garanties et réassurance */}
      <TrustBadges />
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

const BESTSELLERS_COLLECTION_QUERY = `#graphql
  query BestSellersCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: 10) {
        nodes {
          id
          title
          handle
          publishedAt
          availableForSale
          featuredImage {
            id
            url
            altText
            width
            height
          }
          variants(first: 10) {
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
            }
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
        }
      }
    }
  }
`;
