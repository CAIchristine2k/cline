import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, type MetaFunction} from 'react-router';
import {Suspense} from 'react';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {Hero} from '~/components/Hero';
import {ProductShowcase} from '~/components/ProductShowcase';
import {CareerHighlights} from '~/components/CareerHighlights';
import {Testimonials} from '~/components/Testimonials';
import {SocialFeed} from '~/components/SocialFeed';
import {NewsletterSignup} from '~/components/NewsletterSignup';

export const meta: MetaFunction = () => {
  return [
    {title: 'Sugar Shane Mosley - Official Store | Boxing Legend Collection'},
    {
      name: 'description',
      content:
        'Exclusive boxing equipment and merchandise from three-division world champion Sugar Shane Mosley. Championship quality gear for champions.',
    },
    {
      name: 'keywords',
      content: 'Sugar Shane Mosley, boxing equipment, boxing gloves, merchandise, champion gear',
    },
    {property: 'og:title', content: 'Sugar Shane Mosley - Official Store'},
    {property: 'og:description', content: 'Championship quality boxing equipment from the legend himself'},
    {property: 'og:image', content: '/images/logo.png'},
    {property: 'og:type', content: 'website'},
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Hero />

      {/* Product Showcase */}
      <section id="shop" className="py-20">
        <Suspense fallback={<div className="text-center py-20">Loading products...</div>}>
          <Await resolve={data.recommendedProducts}>
            {(response) => (
              <ProductShowcase
                products={response?.products?.nodes || []}
                featuredCollection={data.featuredCollection}
              />
            )}
          </Await>
        </Suspense>
      </section>

      {/* Career Highlights */}
      <section id="career" className="py-20 bg-gray-900">
        <CareerHighlights />
      </section>

      {/* Limited Edition Section */}
      <section className="py-20 bg-gradient-to-r from-gold-900 via-gold-600 to-gold-900">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-lg bg-black/80 backdrop-blur-sm">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: 'url(/images/limited-edition-bg.jpeg)',
              }}
            />
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-24">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-gold-500 mb-6 tracking-wider">
                  LIMITED EDITION
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                  Exclusive championship collection. Only 500 pieces available worldwide.
                </p>
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="bg-gold-500 text-black px-4 py-2 rounded font-bold">
                    <span className="text-2xl">72</span>
                    <span className="text-sm block">HOURS</span>
                  </div>
                  <div className="bg-gold-500 text-black px-4 py-2 rounded font-bold">
                    <span className="text-2xl">15</span>
                    <span className="text-sm block">MINS</span>
                  </div>
                  <div className="bg-gold-500 text-black px-4 py-2 rounded font-bold">
                    <span className="text-2xl">43</span>
                    <span className="text-sm block">SECS</span>
                  </div>
                </div>
                <button className="bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 transform hover:scale-105 uppercase tracking-wider">
                  Claim Your Piece
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <Testimonials />
      </section>

      {/* Social Feed */}
      <section className="py-20 bg-gray-900">
        <SocialFeed />
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <NewsletterSignup />
      </section>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
    description
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    description
    tags
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
    featuredImage {
      id
      url
      altText
      width
      height
    }
    images(first: 5) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    variants(first: 1) {
      nodes {
        id
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        availableForSale
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
