import React from 'react';
import {useLoaderData, type LoaderFunctionArgs} from 'react-router';
import {useConfig} from '~/utils/themeContext';

// Define a basic product type for TypeScript
interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  tags?: string[];
  featuredImage?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  variants: {
    nodes: Array<{
      id: string;
      title: string;
      availableForSale: boolean;
      price?: {
        amount: string;
        currencyCode: string;
      };
      compareAtPrice?: {
        amount: string;
        currencyCode: string;
      } | null;
      selectedOptions?: Array<{
        name: string;
        value: string;
      }>;
      image?: {
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      };
    }>;
  };
}

// Define the loader response type
interface LoaderData {
  products: Product[];
}

// Define loader function to fetch all products
export async function loader({request, context}: LoaderFunctionArgs) {
  // Get all products with complete data
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

export default function ProductDebug() {
  const {products} = useLoaderData<LoaderData>();
  const config = useConfig();

  // Count products with custom tags
  const productsWithCustomTags = products.filter(
    (product) =>
      product.tags &&
      product.tags.some(
        (tag: string) =>
          tag.toLowerCase().includes('custom') ||
          tag.toLowerCase().includes('customiz'),
      ),
  );

  // Count products with custom variants
  const productsWithCustomVariants = products.filter((product) =>
    product?.variants?.nodes?.some(
      (variant) => variant?.title?.toLowerCase?.() === 'custom',
    ),
  );

  // Count products with either custom tags or variants
  const customizableProducts = products.filter((product) => {
    const hasCustomTag =
      product.tags &&
      product.tags.some(
        (tag: string) =>
          tag.toLowerCase().includes('custom') ||
          tag.toLowerCase().includes('customiz'),
      );

    const hasCustomVariant = product?.variants?.nodes?.some(
      (variant) => variant?.title?.toLowerCase?.() === 'custom',
    );

    return hasCustomTag || hasCustomVariant;
  });

  return (
    <div className="py-16 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6">
          Product Debug Information
        </h1>

        <div className="mb-8 bg-gray-900/80 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-2">Summary</h2>
          <p className="text-gray-300 mb-2">
            Total Products: {products.length}
          </p>
          <p className="text-gray-300 mb-2">
            Products with custom tags: {productsWithCustomTags.length}
          </p>
          <p className="text-gray-300 mb-2">
            Products with custom variants: {productsWithCustomVariants.length}
          </p>
          <p className="text-gray-300 mb-2">
            Total customizable products: {customizableProducts.length}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">All Products</h2>
          <div className="grid gap-4">
            {products.map((product, index) => (
              <div key={product.id} className="bg-gray-900/80 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-2">
                  {index + 1}. {product.title}
                </h3>

                {/* Tags */}
                <div className="mb-2">
                  <h4 className="text-md font-medium text-primary mb-1">
                    Tags:
                  </h4>
                  {product.tags && product.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No tags</p>
                  )}
                </div>

                {/* Variants */}
                <div>
                  <h4 className="text-md font-medium text-primary mb-1">
                    Variants:
                  </h4>
                  {product.variants.nodes.length > 0 ? (
                    <div className="space-y-2">
                      {product.variants.nodes.map((variant, i) => (
                        <div
                          key={i}
                          className="bg-gray-800 px-2 py-1 rounded text-sm text-gray-300"
                        >
                          {variant.title}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No variants</p>
                  )}
                </div>

                {/* Customizable status */}
                <div className="mt-3">
                  <h4 className="text-md font-medium text-primary mb-1">
                    Customizable Status:
                  </h4>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <span className="mr-2">By Tag:</span>
                      {productsWithCustomTags.some(
                        (p) => p.id === product.id,
                      ) ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">By Variant:</span>
                      {productsWithCustomVariants.some(
                        (p) => p.id === product.id,
                      ) ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// GraphQL query to fetch all products with detailed variant information
const PRODUCTS_QUERY = `#graphql
  query ProductsWithVariantsAndTags($country: CountryCode, $language: LanguageCode)
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
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;
