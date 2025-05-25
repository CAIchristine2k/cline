import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, Link} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductItem} from '~/components/ProductItem';
import {CollectionHeader} from '~/components/CollectionHeader';
import {ArrowLeft} from 'lucide-react';
import {getConfig} from '~/lib/config';
import {useConfig} from '~/utils/themeContext';
import {ProductCard} from '~/components/ProductCard';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const config = getConfig();
  return [{title: `${config.brandName} | ${data?.collection.title ?? ''} Collection`}];
};

export function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  return context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
    },
  });
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();
  const config = useConfig();

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-6">Collection not found</h1>
        <p className="mb-8">The collection you're looking for does not exist.</p>
        <Link to="/collections" className="bg-primary text-background px-6 py-3 rounded-sm">
          Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        {/* Collection Hero */}
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{collection.title}</h1>
          {collection.description && (
            <p className="text-text/80 max-w-3xl mx-auto leading-relaxed">
              {collection.description}
            </p>
          )}
        </div>

        {/* Product Grid */}
        {collection.products.nodes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg mb-6">No products found in this collection.</p>
            <Link to="/collections" className="bg-primary text-background px-6 py-3 rounded-sm">
              Back to Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {collection.products.nodes.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Collection Banner */}
        <div className="mt-16 bg-primary/10 border border-primary/30 rounded-sm p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            {config.influencerName}'s Championship Collection
          </h3>
          <p className="text-text/80 mb-6 max-w-2xl mx-auto">
            Every product in this collection is designed to meet the highest standards of 
            quality and performance, approved by {config.influencerName} himself.
          </p>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
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
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(first: 24) {
        nodes {
          id
          title
          description
          handle
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
              compareAtPrice {
                amount
                currencyCode
              }
              price {
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
      }
    }
  }
` as const;
