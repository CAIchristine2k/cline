import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';
import {useConfig} from '~/utils/themeContext';
import {ShoppingBag} from 'lucide-react';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
  checkoutDomain?: string;
};

/**
 * The main cart component that displays the cart items and summary.
 * Modern, clean design with fixed height layout and glass morphism effects.
 */
export function CartMain({
  layout,
  cart: originalCart,
  checkoutDomain,
}: CartMainProps) {
  const config = useConfig();
  const {close} = useAside();

  // The useOptimisticCart hook applies pending actions to the cart
  const cart = useOptimisticCart(originalCart);

  // Debug the cart structure
  console.log('CartMain - Original cart:', originalCart);
  console.log('CartMain - Optimistic cart:', cart);

  if (cart?.lines?.nodes && cart.lines.nodes.length > 0) {
    console.log('CartMain - First line item structure:', cart.lines.nodes[0]);
    console.log(
      'CartMain - First line merchandise:',
      cart.lines.nodes[0]?.merchandise,
    );
    console.log(
      'CartMain - First line product:',
      cart.lines.nodes[0]?.merchandise?.product,
    );
  }

  // Cart calculations
  const cartHasItems = (cart?.totalQuantity || 0) > 0;

  // Loading state with modern spinner
  if (cart === undefined) {
    return (
      <div className="cart-container flex items-center justify-center">
        <div className="relative">
          <div className="w-8 h-8 border-2 border-primary/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <CartEmpty hidden={cartHasItems} layout={layout} />

      {cartHasItems && (
        <div className="flex flex-col h-full">
          {/* Header - Minimal padding for maximum content space */}
          <div className="flex-shrink-0 p-3 pb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Cart</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-white/70">
                  <span>{cart?.totalQuantity || 0}</span>
                  <span>
                    {(cart?.totalQuantity || 0) === 1 ? 'item' : 'items'}
                  </span>
                </div>
                {layout === 'aside' && (
                  <button
                    className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white rounded-sm hover:bg-white/10 transition-all duration-200"
                    onClick={close}
                    aria-label="Close cart"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cart Items - Maximized scrollable area */}
          <div className="cart-items-container">
            <div className="pt-4 px-2 pb-2">
              <div className="space-y-2">
                {(cart?.lines?.nodes ?? []).map((line) => (
                  <CartLineItem key={line.id} line={line} layout={layout} />
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary - Compact bottom */}
          <div className="cart-summary-container">
            <div className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
              <CartSummary
                cart={cart}
                layout={layout}
                checkoutDomain={checkoutDomain}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CartEmpty({
  hidden = false,
  layout,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const config = useConfig();
  const {close} = useAside();

  if (hidden) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-sm border flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-white/40" />
        </div>
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-sm -z-10"></div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-3">Your cart is empty</h3>
      <p className="text-white/60 mb-8 max-w-sm text-sm leading-relaxed">
        Discover amazing products and start building your collection today.
      </p>

      <Link
        to="/collections"
        onClick={close}
        prefetch="viewport"
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-black font-bold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary/25"
      >
        <ShoppingBag className="w-4 h-4" />
        Start Shopping
      </Link>
    </div>
  );
}
