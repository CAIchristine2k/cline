import {type LoaderFunctionArgs} from 'react-router';

const PREDICTIVE_SEARCH_QUERY = `#graphql
  query ApiPredictiveSearch($query: String!, $limit: Int!) {
    predictiveSearch(query: $query, limit: $limit, types: [PRODUCT, COLLECTION]) {
      products {
        id
        title
        handle
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        tags
      }
      collections {
        id
        title
        handle
        image {
          url
          altText
        }
      }
    }
  }
`;

interface SearchSuggestion {
  id: string;
  title: string;
  handle: string;
  type: 'product' | 'collection';
  image?: string;
  price?: string;
}

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  // Return empty results if query is too short
  if (query.trim().length < 2) {
    return new Response(
      JSON.stringify({
        success: true,
        suggestions: [],
      }),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      },
    );
  }

  try {
    // Query Shopify Storefront API
    const {predictiveSearch} = await context.storefront.query(
      PREDICTIVE_SEARCH_QUERY,
      {
        variables: {
          query: query,
          limit: 10,
        },
      },
    );

    const suggestions: SearchSuggestion[] = [];

    // Add products to suggestions
    if (predictiveSearch?.products) {
      predictiveSearch.products.forEach((product: any) => {
        suggestions.push({
          id: product.id,
          title: product.title,
          handle: product.handle,
          type: 'product',
          image: product.featuredImage?.url,
          price: product.priceRange?.minVariantPrice
            ? `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`
            : undefined,
        });
      });
    }

    // Add collections to suggestions
    if (predictiveSearch?.collections) {
      predictiveSearch.collections.forEach((collection: any) => {
        suggestions.push({
          id: collection.id,
          title: collection.title,
          handle: collection.handle,
          type: 'collection',
          image: collection.image?.url,
        });
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        suggestions,
      }),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      },
    );
  } catch (error) {
    console.error('Predictive search error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Search failed',
        suggestions: [],
      }),
      {
        status: 500,
        headers: {'Content-Type': 'application/json'},
      },
    );
  }
}
