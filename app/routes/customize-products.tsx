import React from 'react';
import {useLoaderData, type LoaderFunctionArgs} from 'react-router';
import {Pencil, Sparkles} from 'lucide-react';
import {CustomizableProductGrid} from '~/components/CustomizableProductGrid';
import {useConfig} from '~/utils/themeContext';

// Define loader function to fetch all products
export async function loader({request, context}: LoaderFunctionArgs) {
  // Get all products
  const {products} = await context.storefront.query(PRODUCTS_QUERY);

  return new Response(
    JSON.stringify({
      products: products.nodes,
    }),
    {
      headers: {'Content-Type': 'application/json'},
    },
  );
}

export default function CustomizeProducts() {
  const {products} = useLoaderData<typeof loader>();
  const config = useConfig();

  return (
    <div className="py-16 bg-gradient-to-b from-black via-gray-900/95 to-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Personalize Your Style
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            <span className="text-primary">CUSTOMIZE</span> YOUR PRODUCTS
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Create personalized {config.influencerName} merchandise with your
            own photos and designs. Perfect for gifts or showing your unique
            style.
          </p>
        </div>

        <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-6 shadow-md mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-black/40 p-6 rounded-lg border border-primary/10 transition-all duration-300 hover:border-primary/30">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Pencil className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Easy Design Tools
              </h3>
              <p className="text-gray-400">
                Our intuitive editor lets you add photos, text, and designs with
                simple drag-and-drop controls.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-lg border border-primary/10 transition-all duration-300 hover:border-primary/30">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Unique Results
              </h3>
              <p className="text-gray-400">
                Create one-of-a-kind {config.influencerName} merchandise that
                stands out from the crowd.
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded-lg border border-primary/10 transition-all duration-300 hover:border-primary/30">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-400">
                All customized products are printed with high-quality materials
                that look great and last.
              </p>
            </div>
          </div>
        </div>

        <CustomizableProductGrid
          products={products}
          title="CUSTOMIZABLE PRODUCTS"
          subtitle={`Add your own designs to these ${config.influencerName} products`}
          showViewAllLink={false}
          useProductCard={true}
        />
      </div>
    </div>
  );
}

// GraphQL query to fetch all products
const PRODUCTS_QUERY = `#graphql
  query AllProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 50) {
      nodes {
        id
        title
        handle
        description
        tags
        featuredImage {
          url
          altText
          width
          height
        }
        images(first: 5) {
          nodes {
            url
            altText
            width
            height
          }
        }
        media(first: 20) {
          nodes {
            id
            ... on MediaImage {
              image {
                url(transform: {maxWidth: 800, maxHeight: 800, crop: CENTER})
                altText
                width
                height
              }
            }
          }
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
        variants(first: 25) {
          nodes {
            id
            title
            availableForSale
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
            metafields(identifiers: [{namespace: "custom", key: "variant_imgs"}]) {
              key
              value
              namespace
            }
          }
        }
      }
    }
  }
`;
