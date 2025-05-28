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
  return [{title: `${config.brandName} | All Products`}];
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
    <div data-theme={config.theme} className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            All Products
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">CHAMPIONSHIP</span> COLLECTION
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our complete collection of premium {config.industry || 'sports'} equipment and exclusive merchandise inspired by {config.influencerName}'s legendary career.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <PaginatedResourceSection
            connection={products}
            resourcesClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {({node: product, index}) => (
              <ProductItem
                key={product.id}
                product={product}
                loading={index < 8 ? 'eager' : 'lazy'}
              />
            )}
          </PaginatedResourceSection>
        </div>

        {/* Championship Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/30 rounded-sm p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Train Like a Champion
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Every product in our collection is crafted to championship standards and designed for those who refuse to settle for anything less than excellence.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-sm transition-all duration-300 uppercase tracking-wider"
          >
            Explore {config.influencerName}'s Story
          </Link>
        </div>
      </div>
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
