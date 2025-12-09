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
  const variables = getPaginationVariables(request, {pageBy: 100}); // Augmenté à 100 pour inclure IRIS

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

  // Get vente-flash collection
  let venteFlashCollection = collections?.nodes.find(
    (collection: any) => collection.handle === 'vente-flash',
  );

  if (!venteFlashCollection) {
    venteFlashCollection = collections?.nodes.find(
      (collection: any) => collection.handle === 'collections/vente-flash',
    );
  }

  // Define exact products to show in Best Sellers section in specific order
  // Try multiple search terms for each product to increase chance of finding it
  const targetProductSearches = [
    ['alice', 'alice 13'],   // Alice 13×4 Lace Wig HH 100% densité 250%
    ['soleil', 'soleil wig', 'soleil 20', 'wig 20 pouces'],   // SOLEIL WIG 20 Pouces
    ['101 alina', 'alina'],  // SP 101 ALINA LACE WIG 34''COL
    ['hc cosmos', 'cosmos pony', 'hc cosmos -l pony', 'cosmos -l']     // HC COSMOS -L PONY
  ];

  // Find each product by trying multiple search terms
  const bestSellersProducts = targetProductSearches
    .map(searchTerms => {
      // Try each search term until we find a match
      for (const term of searchTerms) {
        const found = products.nodes.find((p: any) =>
          p.title.toLowerCase().includes(term.toLowerCase())
        );
        if (found) return found;
      }
      return null;
    })
    .filter(Boolean); // Remove any nulls if product not found

  // Get products from vente-flash collection
  const venteFlashProducts = venteFlashCollection?.products?.nodes || [];

  return {
    products: products.nodes,
    featuredCollection,
    collections: collections.nodes,
    bestSellersProducts,
    venteFlashProducts,
  };
}

export default function Home() {
  const {products, featuredCollection, bestSellersProducts, venteFlashProducts} = useLoaderData<typeof loader>();
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

      {/* Testimonials section */}
      <Testimonials />

      {/* Follow Us on Social Media Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-black">
            Suivez-nous sur les réseaux
          </h2>
          <div className="flex space-x-4 justify-center lg:justify-center">
            <a
              href="https://instagram.com/c_line.cheveux"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram w-8 h-8 md:w-10 md:h-10"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@c.linehair?_r=1&_t=ZN-91imcHt1ily"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors duration-300"
              aria-label="TikTok"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-music w-8 h-8 md:w-10 md:h-10"
                aria-hidden="true"
              >
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Vente Flash Section */}
      <FeaturedProductsSection products={venteFlashProducts.length > 0 ? venteFlashProducts : products} />

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
        products(first: 20) {
          nodes {
            id
            title
            handle
            description
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
