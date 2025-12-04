import {useState, useMemo} from 'react';
import {useLoaderData, type LoaderFunctionArgs, type MetaFunction} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {ProductCard} from '~/components/ProductCard';
import {Search} from 'lucide-react';
import {getConfig} from '~/utils/config';

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [
    {title: `${config.brandName} - Tous nos produits`},
    {name: 'description', content: 'Découvrez tous nos produits'},
  ];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const variables = getPaginationVariables(request, {pageBy: 100});

  // Get all products
  const {products} = await context.storefront.query(ALL_PRODUCTS_QUERY, {
    variables,
  });

  return {
    products: products.nodes,
  };
}

export default function ProductsPage() {
  const {products} = useLoaderData<typeof loader>();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter((product: any) => {
      const title = product.title?.toLowerCase() || '';
      const description = product.description?.toLowerCase() || '';
      const tags = product.tags?.join(' ').toLowerCase() || '';

      return title.includes(query) || description.includes(query) || tags.includes(query);
    });
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen bg-white pt-[50px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-4">
            NOS PRODUITS
          </h1>
          <p className="text-center text-primary mb-6">
            Découvrez notre collection complète
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors text-black placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-center text-gray-600 mt-4">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                loading="lazy"
                compact={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aucun produit trouvé pour "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProductsPaginated($first: Int, $last: Int, $startCursor: String, $endCursor: String) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        id
        title
        handle
        description
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
        }
        compareAtPriceRange {
          minVariantPrice {
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
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
