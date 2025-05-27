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
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  const config = useConfig();
  const {close} = useAside();

  // Enhanced debugging logs
  console.log('CartMain rendered with:', {
    layout,
    originalCart,
    hasLines: (originalCart?.lines?.nodes?.length || 0) > 0,
    totalQuantity: originalCart?.totalQuantity,
    checkoutUrl: originalCart?.checkoutUrl,
  });

  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  // Log optimistic cart state for debugging
  console.log('Optimistic cart state:', {
    isOptimistic: cart?.isOptimistic,
    totalQuantity: cart?.totalQuantity,
    linesCount: cart?.lines?.nodes?.length || 0,
  });

  // Cart calculations
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const cartHasItems = (cart?.totalQuantity || 0) > 0;

  // If the cart isn't loaded yet during hydration, show a loading indicator
  if (cart === undefined) {
    return (
      <div className="fixed inset-0 bg-background h-full flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-r-2 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className={`cart-container ${layout === 'page' ? 'p-6' : 'p-4'} bg-background h-full flex flex-col`}
    >
      <CartEmpty hidden={cartHasItems} layout={layout} />

      {cartHasItems && (
        <div className="flex flex-col h-full max-h-full overflow-hidden">
          {/* Cart Items Area with Fixed Height and Scroll */}
          <div
            aria-labelledby="cart-lines"
            className="cart-items-container flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
          >
            <ul className="divide-y divide-primary/10 space-y-0">
              {(cart?.lines?.nodes ?? []).map((line) => (
                <CartLineItem key={line.id} line={line} layout={layout} />
              ))}
            </ul>
          </div>
          
          {/* Cart Summary - Fixed at Bottom */}
          <div className="cart-summary-container flex-shrink-0 pt-4 border-t border-primary/10 bg-background/95 backdrop-blur-sm">
            <CartSummary cart={cart} layout={layout} />
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

  console.log('CartEmpty is rendering - should be visible now');

  return (
    <div 
      className={`flex flex-col items-center justify-center h-full py-8 px-4 text-center bg-white text-black ${
        layout === 'aside' ? 'min-h-[300px] max-h-full' : 'min-h-[400px]'
      }`}
    >
      <ShoppingBag className="w-16 h-16 text-gray-500 mb-6" />
      <h3 className="text-xl font-bold text-black mb-3">
        Your cart is empty
      </h3>
      <p className="text-gray-700 mb-8 max-w-md text-sm leading-relaxed">
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <Link
        to="/collections"
        onClick={close}
        prefetch="viewport"
        className="inline-block bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-800 transition-colors font-bold"
      >
        Browse Products →
      </Link>
    </div>
  );
}
