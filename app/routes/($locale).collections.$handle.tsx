import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, type MetaFunction, Link} from 'react-router';
import {ChevronRight, ShoppingBag} from 'lucide-react';
import {ProductCard} from '~/components/ProductCard';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const title = data?.collection?.title || 'Collection';
  return [
    {title: `${title} | C'Line Hair`},
    {
      name: 'description',
      content: data?.collection?.description || `Découvrez notre collection ${title}`,
    },
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;

  if (!handle) {
    throw new Response('Collection handle is required', {status: 400});
  }

  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle: handle,
      first: 50,
    },
  });

  if (!collection) {
    throw new Response('Collection non trouvée', {status: 404});
  }

  return {
    collection,
  };
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();
  const products = collection.products.nodes;

  // Custom titles for specific collections
  const getCollectionTitle = (handle: string) => {
    const customTitles: Record<string, {line1: string; line2?: string; line2Color?: string}> = {
      'perruques': {
        line1: 'Nos perruques'
      },
      'naturelles-perruques': {
        line1: 'PERRUQUES NATURELLES'
      },
      'best-sellers': {
        line1: 'NOS BEST-SELLERS'
      },
      'vente-flash': {
        line1: 'VENTE FLASH',
        line2: 'Offres limitées',
        line2Color: 'text-black'
      },
      'naturelles': {
        line1: '100% naturelles'
      },
      'naturelles-bundles': {
        line1: 'BUNDLES NATURELS',
        line2: 'Cheveux authentiques',
        line2Color: 'text-black'
      },
      'bundles': {
        line1: 'NOS BUNDLES'
      },
      'naturelles-closure': {
        line1: 'CLOSURES NATURELLES'
      },
      'synthetique-perruques': {
        line1: 'PERRUQUES SEMI-NATUREL'
      },
      'synthetique-ponytail': {
        line1: 'Ponytails synthétiques'
      },
      'synthetique-bulk': {
        line1: 'Bulk synthétique'
      },
      'synthetique-closure': {
        line1: 'Closures synthétiques'
      },
      'accessoires': {
        line1: 'Nos Accessoires'
      },
      'accessoires-maintien': {
        line1: 'Accessoires de maintien'
      },
      'accessoires-coiffage': {
        line1: 'Accessoires de coiffage'
      },
      'accessoires-entretien': {
        line1: "Produits d'entretien"
      },
      'accessoires-rangement': {
        line1: 'Accessoires de rangement & transport'
      },
      'crochet-braids': {
        line1: 'Crochet Braids'
      },
    };
    return customTitles[handle] || {line1: collection.title};
  };

  const titleConfig = getCollectionTitle(collection.handle);

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec breadcrumb */}
      <div
        className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-gray-200"
        style={{
          paddingTop: '50px',
        }}
      >
        <div className="container mx-auto px-4 pt-12 pb-3 md:pb-4">
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
            <span className="text-black font-medium">{collection.title}</span>
          </nav>

          {/* Compteur de produits */}
          <div className="text-xs md:text-sm text-gray-600">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Grille complète de tous les produits */}
      {products.length > 0 && (
        <div id="all-products" className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">
            <div>{titleConfig.line1}</div>
            {titleConfig.line2 && (
              <div className={titleConfig.line2Color || 'text-black'}>
                {titleConfig.line2}
              </div>
            )}
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any, index: number) => (
              <ProductCard
                key={product.id}
                product={product}
                loading={index < 8 ? 'eager' : 'lazy'}
                compact={true}
                collectionHandle={collection.handle}
              />
            ))}
          </div>
        </div>
      )}

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
