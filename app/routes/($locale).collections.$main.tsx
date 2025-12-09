import {redirect, type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, type MetaFunction, Link} from 'react-router';
import {ArrowLeft, Sparkles, ShoppingBag, ChevronRight} from 'lucide-react';
import {ProductCard} from '~/components/ProductCard';
import {ProductCarousel} from '~/components/ProductCarousel';
import {resolveCollectionParams, getCollectionTitle} from '~/utils/collectionConfig';

export const meta: MetaFunction<typeof loader> = ({data, params}) => {
  const title = data?.title || 'Collection';
  return [
    {title: `${title} | C'Line Hair`},
    {
      name: 'description',
      content: `Découvrez notre collection ${title} - Cheveux de qualité premium`,
    },
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {main} = params;

  if (!main) {
    throw new Response('Collection non trouvée', {status: 404});
  }

  // Résoudre les paramètres de collection (hairType, query, etc.)
  const collectionParams = resolveCollectionParams(main);

  // 🐛 DEBUG: Log pour vérifier la query générée
  console.log('🔍 [Collection Main] Params:', {
    main,
    handle: main,
    hairType: collectionParams.hairType,
    query: collectionParams.query,
  });

  // Query GraphQL pour récupérer la collection Shopify par son handle
  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle: main,
      first: 50,
    },
  });

  console.log('📦 [Collection Main] Collection found:', collection ? 'Yes' : 'No');
  console.log('📦 [Collection Main] Products found:', collection?.products?.nodes?.length || 0);

  if (!collection) {
    console.warn(`⚠️ Collection not found: ${main}`);
    throw new Response('Collection non trouvée', {status: 404});
  }

  if (!collection.products || collection.products.nodes.length === 0) {
    console.warn(`⚠️ No products in collection: ${main}`);
  }

  return {
    products: collection.products.nodes,
    title: collection.title,
    handle: collection.handle,
    hairType: collectionParams.hairType,
    main,
  };
}

export default function CollectionMain() {
  const {products, title, main} = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec breadcrumb */}
      <div
        className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-gray-200"
        style={{
          paddingTop: '50px',
        }}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-2 md:mb-3">
            <Link to="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              to="/products"
              className="hover:text-primary transition-colors"
            >
              Collections
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-black font-medium">{title}</span>
          </nav>

          {/* Compteur de produits */}
          <div className="text-xs md:text-sm text-gray-600">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Section Nos Best Sellers - Style Homepage */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-primary-light to-primary-200">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/60 text-black px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">Nos Produits Vedettes</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Collection{' '}
              <span className="text-black">{title}</span>
            </h2>

            <p className="text-lg text-black leading-relaxed">
              Découvrez notre sélection exclusive de produits {title.toLowerCase()},
              choisis avec soin pour sublimer votre beauté naturelle.
            </p>
          </div>

          {/* Carousel */}
          {products.length > 0 ? (
            <div className="mb-12">
              <ProductCarousel products={products} loading="lazy" compact={true} />
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-white/50 mb-4">
                <svg
                  className="w-24 h-24 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Aucun produit disponible
              </h3>
              <p className="text-white/80 mb-6">
                Cette collection ne contient pas encore de produits.
              </p>
            </div>
          )}

          {/* CTA Button */}
          {products.length > 0 && (
            <div className="text-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <ShoppingBag className="w-5 h-5" />
                Voir Tous Les Produits
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
      </section>

      {/* Grille complète de tous les produits */}
      <div id="all-products" className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-black mb-6">
          Tous les produits {title.toLowerCase()}
        </h3>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any, index: number) => (
              <ProductCard
                key={product.id}
                product={product}
                loading={index < 8 ? 'eager' : 'lazy'}
                compact={true}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Section de sous-catégories suggérées */}
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-black mb-6">
            Explorer par type de produit
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['perruques', 'bundles', 'closure', 'ponytail', 'bulk'].map(
              (sub) => (
                <Link
                  key={sub}
                  to={`/collections/${main}/${sub}`}
                  className="bg-white hover:bg-primary/10 border border-gray-200 hover:border-primary rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="text-3xl mb-2">
                    {sub === 'perruques' && '👱‍♀️'}
                    {sub === 'bundles' && '📦'}
                    {sub === 'closure' && '✨'}
                    {sub === 'ponytail' && '🎀'}
                    {sub === 'bulk' && '💫'}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary capitalize">
                    {sub}
                  </h3>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Query GraphQL pour récupérer une collection Shopify et ses produits
const COLLECTION_QUERY = `#graphql
  query Collection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: $first) {
        nodes {
          id
          title
          handle
          description
          productType
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
