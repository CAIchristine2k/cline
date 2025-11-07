import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, type MetaFunction} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';
import {Link} from 'react-router';
import {ArrowLeft} from 'lucide-react';
import {getConfig} from '~/utils/config';

export const meta: MetaFunction<typeof loader> = () => {
  const config = getConfig();
  return [{title: `C'Line Hair | Tous Nos Produits`}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  // Get configuration
  const config = getConfig();

  return {
    ...deferredData,
    ...criticalData,
    config: {
      ...config,
      theme: config.influencerName.toLowerCase().replace(/\s+/g, '-'),
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const [{products}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {...paginationVariables},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);
  return {products};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  return {};
}

export default function Collection() {
  const {products, config} = useLoaderData<typeof loader>();

  return (
    <div data-theme={config.theme} className="min-h-screen bg-white">
      {/* Background decorative elements */}
      <div className="absolute -right-20 top-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -left-40 bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-black hover:text-primary transition-colors duration-300 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1 bg-primary text-black text-sm font-bold tracking-wider uppercase mb-6 rounded-sm">
            Tous Nos Produits
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-black">LA COLLECTION</span><br />
            <span className="text-primary tracking-wider">C'LINE HAIR</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Découvrez notre collection complète d'extensions, perruques et lace wigs de qualité professionnelle. Chaque produit est conçu pour sublimer votre beauté naturelle avec élégance et durabilité.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <PaginatedResourceSection
            connection={products}
            resourcesClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {({node: product, index}) => {
              const typedProduct =
                product as import('storefrontapi.generated').CollectionItemFragment;

              return (
                <ProductItem
                  key={typedProduct.id}
                  product={typedProduct}
                  loading={index < 8 ? 'eager' : 'lazy'}
                />
              );
            }}
          </PaginatedResourceSection>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/30 rounded-lg p-12 text-center shadow-lg">
          <h3 className="text-3xl font-bold text-primary mb-4">
            Qualité & Élégance Garanties
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed text-lg">
            Chaque produit C'Line Hair est soigneusement sélectionné pour vous offrir le meilleur de la qualité professionnelle. Sublimez votre beauté avec confiance.
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-primary hover:bg-primary-400 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 uppercase tracking-wider shadow-glow"
          >
            Découvrir Notre Histoire
          </Link>
        </div>
      </div>

      {/* Add the CSS styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .shadow-glow {
            box-shadow: 0 4px 20px rgba(var(--color-primary-rgb), 0.25);
          }
        `,
        }}
      />
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
` as const;
