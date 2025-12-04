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
  const description = "Perruques naturelles 100% cheveux humains - Lace Wigs, Closures et Bundles de qualité premium. Livraison offerte dès 100€. Densité 200-250%, installation facile.";
  const title = "C'Line - Perruques qualités premium";

  return [
    {title},
    {name: 'description', content: description},
    {
      name: 'keywords',
      content: 'perruque naturelle, lace wig, cheveux humains, closure, bundles, perruque qualité, human hair, perruque lace, 13x4 lace wig, perruque densité 250%, perruque afro',
    },

    // Open Graph / Facebook
    {property: 'og:type', content: 'website'},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:image', content: 'https://www.clinehair.com/images/og-image.jpg'},
    {property: 'og:url', content: 'https://www.clinehair.com'},
    {property: 'og:site_name', content: "C'Line Hair"},
    {property: 'og:locale', content: 'fr_FR'},

    // Twitter Card
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: 'https://www.clinehair.com/images/og-image.jpg'},

    // Additional SEO tags
    {name: 'robots', content: 'index, follow'},
    {name: 'language', content: 'French'},
    {name: 'author', content: "C'Line Hair"},
    {httpEquiv: 'Content-Type', content: 'text/html; charset=utf-8'},
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
  let bestSellersCollection = collections?.nodes.find(
    (collection: any) => collection.handle === 'best-sellers',
  );

  if (!bestSellersCollection) {
    bestSellersCollection = collections?.nodes.find(
      (collection: any) => collection.handle === 'collections/best-sellers',
    );
  }

  // Get best-sellers products if collection exists
  let bestSellersProducts = [];
  if (bestSellersCollection) {
    const {collection} = await context.storefront.query(BESTSELLERS_COLLECTION_QUERY, {
      variables: {handle: bestSellersCollection.handle},
    });
    bestSellersProducts = collection?.products?.nodes || [];
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
    <main className="pt-5">
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

      {/* Testimonials section */}
      <Testimonials />

      {/* Featured Products Section */}
      <FeaturedProductsSection products={products} />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* AI Media Generation section */}
      {appConfig.showAIMediaGeneration && <AIMediaGeneration />}

      {/* Trust Badges section */}
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
