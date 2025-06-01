import {useLoaderData, type LoaderFunctionArgs} from 'react-router';
import {AddToCartButton} from '~/components/AddToCartButton';
import {CartMain} from '~/components/CartMain';
import {useCart} from '~/providers/CartProvider';
import {useState} from 'react';

export async function loader({context}: LoaderFunctionArgs) {
  // Get some test products and the current cart
  const [productsResponse, cart] = await Promise.all([
    context.storefront.query(
      `
      query ProductsTest($first: Int!) {
        products(first: $first) {
          nodes {
            id
            title
            handle
            description
            variants(first: 5) {
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
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `,
      {
        variables: {first: 5},
      },
    ),
    context.cart.get(),
  ]);

  return {
    products: productsResponse.products.nodes,
    cart,
  };
}

export default function ShopifyTest() {
  const {products, cart} = useLoaderData<typeof loader>();
  const {openCart, closeCart} = useCart();
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${result}`,
    ]);
  };

  const testAddToCart = (product: any, variant: any) => {
    addTestResult(
      `Testing add to cart for ${product.title} - ${variant.title}`,
    );
    console.log('Test add to cart:', {
      product: product.title,
      variant: variant.title,
      variantId: variant.id,
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">
          Shopify Cart Functionality Test
        </h1>

        {/* Cart Status */}
        <div className="bg-gray-900/50 border border-primary/20 rounded-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Current Cart Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
            <div>
              <span className="text-gray-400">Total Items:</span>
              <span className="ml-2 font-bold text-primary">
                {cart?.totalQuantity || 0}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Cart ID:</span>
              <span className="ml-2 font-mono text-sm">
                {cart?.id ? 'Present' : 'None'}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Lines Count:</span>
              <span className="ml-2 font-bold text-primary">
                {cart?.lines?.nodes?.length || 0}
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={openCart}
              className="bg-primary hover:bg-primary-600 text-background px-4 py-2 rounded-sm font-bold"
            >
              Open Cart Drawer
            </button>
            <button
              onClick={closeCart}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-sm font-bold"
            >
              Close Cart Drawer
            </button>
          </div>
        </div>

        {/* Test Products */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Test Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => {
              const firstVariant = product.variants.nodes[0];
              if (!firstVariant) return null;

              return (
                <div
                  key={product.id}
                  className="bg-gray-900/50 border border-primary/20 rounded-sm p-4"
                >
                  <h3 className="text-white font-bold mb-2">{product.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mb-4">
                    <span className="text-primary font-bold">
                      ${firstVariant.price.amount}{' '}
                      {firstVariant.price.currencyCode}
                    </span>
                    {firstVariant.compareAtPrice && (
                      <span className="ml-2 text-red-500 line-through text-sm">
                        ${firstVariant.compareAtPrice.amount}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <span
                      className={`text-sm px-2 py-1 rounded-sm ${
                        firstVariant.availableForSale
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {firstVariant.availableForSale ? 'In Stock' : 'Sold Out'}
                    </span>
                  </div>

                  {firstVariant.availableForSale && (
                    <AddToCartButton
                      lines={[
                        {
                          merchandiseId: firstVariant.id,
                          quantity: 1,
                        },
                      ]}
                      selectedVariant={firstVariant}
                      onClick={() => testAddToCart(product, firstVariant)}
                      className="w-full bg-primary hover:bg-primary-600 text-background py-2 px-4 rounded-sm font-bold"
                    >
                      Add to Cart
                    </AddToCartButton>
                  )}

                  {/* Variant Options */}
                  {product.variants.nodes.length > 1 && (
                    <div className="mt-4">
                      <h4 className="text-white text-sm font-bold mb-2">
                        Other Variants:
                      </h4>
                      <div className="space-y-2">
                        {product.variants.nodes
                          .slice(1, 3)
                          .map((variant: any) => (
                            <div
                              key={variant.id}
                              className="flex items-center justify-between"
                            >
                              <span className="text-gray-400 text-sm">
                                {variant.title}
                              </span>
                              {variant.availableForSale && (
                                <AddToCartButton
                                  lines={[
                                    {
                                      merchandiseId: variant.id,
                                      quantity: 1,
                                    },
                                  ]}
                                  selectedVariant={variant}
                                  onClick={() =>
                                    testAddToCart(product, variant)
                                  }
                                  className="bg-primary/80 hover:bg-primary text-background py-1 px-2 rounded-sm text-xs font-bold"
                                >
                                  Add
                                </AddToCartButton>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Cart Contents */}
        {cart && cart.lines && cart.lines.nodes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              Current Cart Contents
            </h2>
            <div className="bg-gray-900/50 border border-primary/20 rounded-sm">
              <CartMain cart={cart} layout="page" />
            </div>
          </div>
        )}

        {/* Test Results Log */}
        <div className="bg-gray-900/50 border border-primary/20 rounded-sm p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Test Results Log
          </h2>
          <div className="bg-black/50 rounded-sm p-4 max-h-64 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-400 italic">
                No test actions yet. Try adding items to cart.
              </p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-green-400 font-mono text-sm">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setTestResults([])}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-sm text-sm"
          >
            Clear Log
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-sm p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4">
            Testing Instructions
          </h2>
          <div className="text-gray-300 space-y-2">
            <p>
              1. <strong>Add to Cart:</strong> Click "Add to Cart" buttons to
              test adding items
            </p>
            <p>
              2. <strong>View Cart:</strong> Click "Open Cart Drawer" to see the
              cart sidebar
            </p>
            <p>
              3. <strong>Update Quantities:</strong> Use +/- buttons in cart to
              test quantity updates
            </p>
            <p>
              4. <strong>Remove Items:</strong> Use trash icon to test item
              removal
            </p>
            <p>
              5. <strong>Check Console:</strong> Open browser dev tools to see
              detailed logs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
