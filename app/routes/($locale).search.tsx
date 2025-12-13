import {type LoaderFunctionArgs, type ActionFunctionArgs} from 'react-router';
import {useLoaderData, type MetaFunction} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {SearchForm} from '~/components/SearchForm';
import {SearchResults} from '~/components/SearchResults';
import {
  type RegularSearchReturn,
  type PredictiveSearchReturn,
  getEmptyPredictiveSearchResult,
} from '~/lib/search';
import {Link} from 'react-router';
import {ArrowLeft, Search, TrendingUp} from 'lucide-react';
import {getConfig} from '~/utils/config';
import type {RegularSearchQuery} from 'storefrontapi.generated';

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [{title: `${config.brandName} | Search`}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'regular';
  const term = url.searchParams.get('q') || '';

  // Get configuration
  const config = getConfig();

  let result: PredictiveSearchReturn | RegularSearchReturn;
  let error: string | null = null;

  try {
    if (term) {
      const paginationVariables = getPaginationVariables(request, {
        pageBy: 10,
      });

      if (type === 'predictive') {
        const response = await context.storefront.query(
          PREDICTIVE_SEARCH_QUERY,
          {
            variables: {
              country: context.storefront.i18n.country,
              language: context.storefront.i18n.language,
              limit: 10,
              limitScope: 'ALL',
              term: term,
              types: ['COLLECTION', 'PAGE', 'ARTICLE', 'PRODUCT'],
            },
          },
        );
        result = {
          type: 'predictive' as const,
          term,
          result: {
            total: 0,
            items:
              response.predictiveSearch ||
              getEmptyPredictiveSearchResult().items,
          },
        };
      } else {
        const response = await context.storefront.query(SEARCH_QUERY, {
          variables: {
            ...paginationVariables,
            country: context.storefront.i18n.country,
            language: context.storefront.i18n.language,
            term: term,
          },
        });
        result = {
          type: 'regular' as const,
          term,
          result: {
            total: response.products?.nodes?.length || 0,
            items: response as RegularSearchQuery,
          },
        };
      }
    } else if (type === 'predictive') {
      result = {
        type: 'predictive' as const,
        term: '',
        result: getEmptyPredictiveSearchResult(),
      };
    } else {
      result = {
        type: 'regular' as const,
        term: '',
        result: {
          total: 0,
          items: {
            products: {
              nodes: [],
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: null,
                endCursor: null,
              },
            },
            pages: {nodes: []},
            articles: {nodes: []},
          },
        },
      };
    }
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    error = errorMessage;
    result =
      type === 'predictive'
        ? {
            type: 'predictive' as const,
            term,
            error: errorMessage,
            result: getEmptyPredictiveSearchResult(),
          }
        : {
            type: 'regular' as const,
            term,
            error: errorMessage,
            result: {
              total: 0,
              items: {
                products: {
                  nodes: [],
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    startCursor: null,
                    endCursor: null,
                  },
                },
                pages: {nodes: []},
                articles: {nodes: []},
              },
            },
          };
  }

  return {
    type,
    term,
    result: result.result,
    error,
    config: {
      ...config,
      theme: config.influencerName.toLowerCase().replace(/\s+/g, '-'),
    },
  };
}

/**
 * Renders the /search route
 */
export default function SearchPage() {
  const {type, term, result, error, config} = useLoaderData<typeof loader>();
  if (type === 'predictive') return null;

  const popularSearches = [
    'Boxing Gloves',
    'Training Gear',
    'Apparel',
    'Limited Edition',
    'Championship Collection',
  ];

  return (
    <div data-theme={config.theme} className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-8 pb-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-black hover:text-gray-700 transition-colors duration-300 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchForm>
            {({inputRef}) => (
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  defaultValue={term}
                  name="q"
                  placeholder="Rechercher des produits..."
                  ref={inputRef}
                  type="search"
                  className="w-full backdrop-blur-sm rounded-lg py-4 pl-14 pr-32 text-black text-base placeholder-gray-400 focus:outline-none transition-colors duration-300"
                  style={{ backgroundColor: '#FFF0F5', border: 'none' }}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black font-bold py-2 px-6 rounded-lg transition-all duration-300 uppercase tracking-wider shadow-sm text-xs"
                  style={{ backgroundColor: '#F5A6C6' }}
                >
                  Rechercher
                </button>
              </div>
            )}
          </SearchForm>
        </div>

        {/* Popular Searches or Error */}
        {!term && !error && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-5 w-5 text-primary mr-2" />
              <span className="text-gray-600 font-medium">
                Recherches populaires
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((search, index) => (
                <Link
                  key={index}
                  to={`/search?q=${encodeURIComponent(search)}`}
                  className="px-4 py-2 bg-white hover:bg-primary/10 border-2 border-primary/30 hover:border-primary rounded-lg text-sm transition-all duration-300 text-black hover:text-primary"
                >
                  {search}
                </Link>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
              <h3 className="text-red-600 font-bold mb-2">Erreur de recherche</h3>
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {term && !error && (
          <div className="max-w-6xl mx-auto">
            {!result?.total ? (
              <div className="text-center py-16">
                <div className="mb-8">
                  <Search className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-700 mb-4">
                    Aucun résultat pour "{term}"
                  </h2>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                    Essayez avec d'autres mots-clés ou parcourez nos catégories populaires.
                  </p>
                </div>

                <Link
                  to="/products"
                  className="group inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Voir tous les produits
                </Link>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-2 text-black">
                    Résultats de recherche pour "
                    <span style={{ color: '#F5A6C6' }}>{term}</span>"
                  </h2>
                  <p className="text-gray-600">
                    {result.total} {result.total > 1 ? 'résultats trouvés' : 'résultat trouvé'}
                  </p>
                </div>

                {/* TODO: Fix type mismatch - response includes 'collections' which should only be in predictive search */}
                <SearchResults result={result as any} term={term}>
                  {({articles, pages, products, term}) => (
                    <div className="space-y-12">
                      <SearchResults.Products products={products} term={term} />
                      <SearchResults.Pages pages={pages} term={term} />
                      <SearchResults.Articles articles={articles} term={term} />
                    </div>
                  )}
                </SearchResults>
              </div>
            )}
          </div>
        )}

        <Analytics.SearchView
          data={{searchTerm: term, searchResults: result}}
        />
      </div>
    </div>
  );
}

// GraphQL fragments defined first
const SEARCH_PRODUCT_FRAGMENT = `#graphql
  fragment SearchProduct on Product {
    __typename
    handle
    id
    publishedAt
    title
    trackingParameters
    vendor
    featuredImage {
      url
      altText
      width
      height
    }
    selectedOrFirstAvailableVariant(
      selectedOptions: []
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      id
      image {
        url
        altText
        width
        height
      }
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
      product {
        handle
        title
      }
    }
  }
` as const;

const SEARCH_PAGE_FRAGMENT = `#graphql
  fragment SearchPage on Page {
     __typename
     handle
    id
    title
    trackingParameters
  }
` as const;

const SEARCH_ARTICLE_FRAGMENT = `#graphql
  fragment SearchArticle on Article {
    __typename
    handle
    id
    title
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_ARTICLE_FRAGMENT = `#graphql
  fragment PredictiveArticle on Article {
    __typename
    id
    title
    handle
    blog {
      handle
    }
    image {
      url
      altText
      width
      height
    }
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_COLLECTION_FRAGMENT = `#graphql
  fragment PredictiveCollection on Collection {
    __typename
    id
    title
    handle
    image {
      url
      altText
      width
      height
    }
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_PAGE_FRAGMENT = `#graphql
  fragment PredictivePage on Page {
    __typename
    id
    title
    handle
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_PRODUCT_FRAGMENT = `#graphql
  fragment PredictiveProduct on Product {
    __typename
    id
    title
    handle
    trackingParameters
    featuredImage {
      url
      altText
      width
      height
    }
    selectedOrFirstAvailableVariant(
      selectedOptions: []
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      id
      image {
        url
        altText
        width
        height
      }
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
      product {
        handle
        title
      }
    }
  }
` as const;

// Rest of your existing GraphQL queries remain unchanged
const SEARCH_QUERY = `#graphql
  query RegularSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $term: String!
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    articles: search(
      query: $term,
      types: [ARTICLE],
      first: $first,
    ) {
      nodes {
        ...on Article {
          ...SearchArticle
        }
      }
    }
    pages: search(
      query: $term,
      types: [PAGE],
      first: $first,
    ) {
      nodes {
        ...on Page {
          ...SearchPage
        }
      }
    }
    products: search(
      after: $endCursor,
      before: $startCursor,
      first: $first,
      last: $last,
      query: $term,
      sortKey: RELEVANCE,
      types: [PRODUCT],
      unavailableProducts: HIDE,
    ) {
      nodes {
        ...on Product {
          ...SearchProduct
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
  
  ${SEARCH_PRODUCT_FRAGMENT}
  ${SEARCH_PAGE_FRAGMENT}
  ${SEARCH_ARTICLE_FRAGMENT}
  
  #graphql
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
` as const;

const PREDICTIVE_SEARCH_QUERY = `#graphql
  query PredictiveSearch(
    $country: CountryCode
    $language: LanguageCode
    $limit: Int!
    $limitScope: PredictiveSearchLimitScope!
    $term: String!
    $types: [PredictiveSearchType!]
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(
      limit: $limit,
      limitScope: $limitScope,
      query: $term,
      types: $types,
    ) {
      articles {
        ...PredictiveArticle
      }
      collections {
        ...PredictiveCollection
      }
      pages {
        ...PredictivePage
      }
      products {
        ...PredictiveProduct
      }
      queries {
        ...PredictiveQuery
      }
    }
  }
  
  ${PREDICTIVE_SEARCH_COLLECTION_FRAGMENT}
  ${PREDICTIVE_SEARCH_PAGE_FRAGMENT}
  ${PREDICTIVE_SEARCH_ARTICLE_FRAGMENT}
  ${PREDICTIVE_SEARCH_PRODUCT_FRAGMENT}
  
  #graphql
  fragment PredictiveQuery on SearchQuerySuggestion {
    __typename
    text
    styledText
    trackingParameters
  }
` as const;
