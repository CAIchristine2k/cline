import {useLoaderData, Link, type MetaFunction} from 'react-router';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ArrowLeft} from 'lucide-react';
import {getConfig} from '~/utils/config';

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [{title: `${config.brandName} | Collections`}];
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
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {collections};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  // No deferred data needed for this page
  return {};
}

export default function Collections() {
  const {collections, config} = useLoaderData<typeof loader>();

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
            Collections
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">CHAMPIONSHIP</span> COLLECTIONS
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collections of premium boxing equipment and exclusive merchandise, each inspired by different aspects of {config.influencerName}'s legendary career.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="mb-16">
          <PaginatedResourceSection
            connection={collections}
            resourcesClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {({node: collection, index}) => {
              const typedCollection = collection as CollectionFragment;
              return (
                <CollectionItem
                  key={typedCollection.id}
                  collection={typedCollection}
                  index={index}
                />
              );
            }}
          </PaginatedResourceSection>
        </div>

        {/* Championship Banner */}
        <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/30 rounded-sm p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Explore All Products
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Browse our complete catalog of championship-quality boxing equipment and exclusive {config.brandName} merchandise.
          </p>
          <Link 
            to="/collections/all"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-sm transition-all duration-300 uppercase tracking-wider"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <Link
      prefetch="intent"
      to={`/collections/${collection.handle}`}
      className="group block bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-primary/50 rounded-sm overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-3px]"
    >
      <div className="relative h-64 overflow-hidden">
        {collection.image && (
          <Image
            alt={collection.image.altText || collection.title}
            aspectRatio="1/1"
            data={collection.image}
            loading={index < 3 ? 'eager' : 'lazy'}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
            {collection.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      width
      height
      altText
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
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
