import React, {useState} from 'react';
import {useLoaderData, Link, Form} from 'react-router';
import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaFunction,
} from 'react-router';
import {CartForm, Image, Money} from '@shopify/hydrogen';
import {useConfig} from '~/utils/themeContext';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {Truck, Shield, CreditCard, ArrowLeft, ExternalLink} from 'lucide-react';

interface LoaderData {
  cart: CartApiQueryFragment;
  checkoutDomain: string;
}

export const meta: MetaFunction = () => {
  // Note: Can't use useConfig here as meta functions run outside React component tree
  return [
    {title: 'Checkout - Review Your Order'},
    {
      name: 'description',
      content: 'Review your custom designs and proceed to secure payment.',
    },
    {name: 'robots', content: 'noindex, nofollow'}, // Don't index checkout pages
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const cart = await context.cart.get();

  if (!cart || !cart.totalQuantity) {
    throw new Response('Cart not found or empty', {status: 404});
  }

  return {
    cart,
    checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
  };
}

/**
 * Custom checkout page that displays custom design images properly
 * and provides a clean review experience before payment
 */
export default function Checkout() {
  const {cart, checkoutDomain} = useLoaderData<LoaderData>();
  const config = useConfig();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProceedToPayment = () => {
    setIsProcessing(true);
    // Create checkout URL on the centralized domain or use Shopify's checkout
    if (cart.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/80 backdrop-blur-sm">
      {/* Header */}
      <div className="bg-secondary/40 backdrop-blur-md border-b border-primary/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/cart"
                className="text-primary hover:text-primary-600 flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cart</span>
              </Link>
            </div>
            <h1 className="text-xl font-bold text-white">
              {config.brandName} Checkout
            </h1>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Review - Left Side */}
          <div className="order-2 lg:order-1">
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Review
              </h2>

              {/* Line Items */}
              <div className="space-y-4 mb-6">
                {cart.lines.nodes.map((line) => {
                  const {merchandise, quantity, attributes} = line;

                  // Check for custom design
                  const customDesignImage = attributes?.find(
                    (attr) => attr.key === '_design_image_url',
                  )?.value;
                  const isCustomDesign = attributes?.some(
                    (attr) =>
                      attr.key === '_custom_design' && attr.value === 'true',
                  );
                  const isValidCustomImage =
                    customDesignImage &&
                    (customDesignImage.startsWith('http') ||
                      customDesignImage.startsWith('data:'));

                  return (
                    <div
                      key={line.id}
                      className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/10 border border-white/20">
                          {isValidCustomImage ? (
                            // Show custom design image
                            <img
                              src={customDesignImage}
                              alt={`Custom ${merchandise.product.title}`}
                              className="w-full h-full object-cover"
                            />
                          ) : merchandise.image ? (
                            // Show product image
                            <Image
                              data={merchandise.image}
                              sizes="80px"
                              className="w-full h-full object-cover"
                              alt={merchandise.product.title}
                            />
                          ) : (
                            // Fallback
                            <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                              {isCustomDesign ? '🎨' : 'No Image'}
                            </div>
                          )}
                        </div>

                        {/* Custom design indicator */}
                        {isCustomDesign && (
                          <div className="mt-2 text-center">
                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-medium">
                              🎨 Custom
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-white text-lg">
                          {merchandise.product.title}
                        </h3>
                        {merchandise.title &&
                          merchandise.title !== 'Default Title' && (
                            <p className="text-white/70 text-sm">
                              {merchandise.title}
                            </p>
                          )}

                        {/* Custom design attributes - user-friendly display */}
                        {isCustomDesign && attributes && (
                          <div className="mt-2 space-y-1">
                            {attributes
                              .filter((attr) => !attr.key.startsWith('_')) // Only show non-hidden attributes
                              .map((attr) => (
                                <div
                                  key={attr.key}
                                  className="text-white/60 text-xs"
                                >
                                  <span className="font-medium">
                                    {attr.key}:
                                  </span>{' '}
                                  {attr.value}
                                </div>
                              ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <div className="text-white/70 text-sm">
                            Quantity: {quantity}
                          </div>
                          <div className="text-white font-bold">
                            <Money data={merchandise.price} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Security Features */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  Secure Checkout Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <Truck className="w-4 h-4 text-green-400" />
                    <span>Fast, reliable shipping</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span>SSL encrypted transaction</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <ExternalLink className="w-4 h-4 text-orange-400" />
                    <span>Shopify secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Payment - Right Side */}
          <div className="order-1 lg:order-2">
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              {/* Pricing Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">
                    Subtotal ({cart.totalQuantity} item
                    {cart.totalQuantity !== 1 ? 's' : ''})
                  </span>
                  <span className="text-white font-medium">
                    {cart.cost?.subtotalAmount ? (
                      <Money data={cart.cost.subtotalAmount} />
                    ) : (
                      '-'
                    )}
                  </span>
                </div>

                {cart.cost?.totalTaxAmount?.amount && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Tax (estimated)</span>
                    <span className="text-white font-medium">
                      <Money data={cart.cost.totalTaxAmount} />
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-white/70">Shipping</span>
                  <span className="text-white/70 text-sm">
                    Calculated at checkout
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-primary font-bold text-xl">
                      {cart.cost?.totalAmount ? (
                        <Money data={cart.cost.totalAmount} />
                      ) : (
                        '-'
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Custom Design Notice */}
              {cart.lines.nodes.some((line) =>
                line.attributes?.some(
                  (attr) =>
                    attr.key === '_custom_design' && attr.value === 'true',
                ),
              ) && (
                <div className="mb-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-blue-400 mt-0.5">🎨</div>
                    <div>
                      <h4 className="text-blue-300 font-semibold text-sm mb-1">
                        Custom Design Order
                      </h4>
                      <p className="text-blue-200 text-xs">
                        Your custom design will be printed exactly as shown
                        above. Production typically takes 2-3 business days.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Proceed to Payment Button */}
              <button
                onClick={handleProceedToPayment}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary/25 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                    <span>Redirecting...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Proceed to Secure Payment</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-white/50 text-xs">
                  You'll be securely redirected to Shopify's payment processor
                </p>
              </div>

              {/* Alternative Actions */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="space-y-3">
                  <Link
                    to="/cart"
                    className="block w-full text-center bg-secondary/60 hover:bg-secondary/80 text-white border border-primary/20 py-3 px-4 rounded-lg transition-colors"
                  >
                    ← Back to Cart
                  </Link>
                  <Link
                    to="/collections"
                    className="block w-full text-center text-primary hover:text-primary-600 py-2 text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
