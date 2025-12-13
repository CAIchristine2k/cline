import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';
import {useConfig} from '~/utils/themeContext';
import {ShoppingBag} from 'lucide-react';
import {PrepareDesignsForCheckout} from './PrepareDesignsForCheckout';
import {useMemo, useEffect, useRef} from 'react';

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
  const previousQuantityRef = useRef<number | null>(null);

  // Enhanced optimistic cart with safety checks
  // Use the useOptimisticCart hook for type consistency
  const optimisticCart = useOptimisticCart(originalCart);
  
  // Create a safe version that adds missing data where needed
  const cart = useMemo(() => {
    try {
      if (!optimisticCart) return optimisticCart;
      
      // Create a shallow copy to avoid mutating the optimistic cart directly
      const safeCart = {...optimisticCart};
      
      // Fix for missing variant data
      if (safeCart?.lines?.nodes) {
        safeCart.lines = {...safeCart.lines};
                 safeCart.lines.nodes = safeCart.lines.nodes.map((line: any) => {
           // Skip lines with complete merchandise data
           if (line && line.merchandise?.product) return line;
           
           // Clone the line to avoid mutations
           const fixedLine = {...line};
          
          // Try to find matching line in original cart
          if (originalCart?.lines?.nodes && line) {
            const originalLine = originalCart.lines.nodes.find(ol => ol.id === line.id);
            if (originalLine?.merchandise?.product) {
              if (!fixedLine.merchandise) fixedLine.merchandise = {...originalLine.merchandise};
              else fixedLine.merchandise = {
                ...fixedLine.merchandise,
                product: originalLine.merchandise.product
              };
            }
          }
          return fixedLine;
        });
      }
      return safeCart;
    } catch (error) {
      console.error('Error creating safe cart:', error);
      return optimisticCart || originalCart;
    }
  }, [optimisticCart, originalCart]);

  // Debug logs in development only
  if (process.env.NODE_ENV === 'development' && cart?.lines?.nodes?.length > 0) {
    const customDesignCount = cart.lines.nodes.filter(line =>
      line.attributes?.some(attr => attr.key === '_custom_design' && attr.value === 'true')
    ).length;

    if (customDesignCount > 0) {
      console.log(`🎨 CartMain - ${customDesignCount} item(s) with custom designs`);
    }
  }

  // Cart calculations
  const cartHasItems = (cart?.totalQuantity || 0) > 0;

  // Auto-close cart drawer when it becomes empty
  useEffect(() => {
    const currentQuantity = cart?.totalQuantity || 0;
    const previousQuantity = previousQuantityRef.current;

    // Detect when cart goes from having items (>0) to empty (0)
    if (previousQuantity !== null && previousQuantity > 0 && currentQuantity === 0) {
      console.log('🛒 Cart became empty - closing drawer if open');

      // Close cart drawer if open
      if (layout === 'aside') {
        setTimeout(() => {
          close();
        }, 300);
      }

      // Stay on current page - no redirect
    }

    // Update the previous quantity for next check
    previousQuantityRef.current = currentQuantity;
  }, [cart?.totalQuantity, layout, close]);

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
        <div className="flex flex-col h-full bg-white">
          {/* Header - Minimal padding for maximum content space */}
          <div className="flex-shrink-0 p-3 pb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">Panier</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-black/70">
                  <span>{cart?.totalQuantity || 0}</span>
                  <span>
                    {(cart?.totalQuantity || 0) === 1 ? 'article' : 'articles'}
                  </span>
                </div>
                {layout === 'aside' && (
                  <button
                    className="w-6 h-6 flex items-center justify-center text-black/70 hover:text-black rounded-sm hover:bg-white/10 transition-all duration-200"
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

            {/* Free Shipping Progress Bar */}
            <FreeShippingProgress cart={cart} />
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
            <div className="backdrop-blur-xl bg-primary-light">
                          {/* Prepare designs for checkout */}
            <PrepareDesignsForCheckout 
              cart={cart} 
              onComplete={() => {
                console.log('✅ Designs prepared for checkout');
              }}
              onError={(error) => {
                console.error('❌ Error preparing designs:', error);
              }}
            />
            
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

/**
 * Free Shipping Progress Bar Component
 * Shows progress towards free shipping threshold (50€)
 */
function FreeShippingProgress({cart}: {cart: CartApiQueryFragment | null | any}) {
  const FREE_SHIPPING_THRESHOLD = 50;

  // Get current cart total in euros
  const currentAmount = parseFloat(cart?.cost?.subtotalAmount?.amount || '0');
  const currencyCode = cart?.cost?.subtotalAmount?.currencyCode || 'EUR';

  // Calculate progress percentage (capped at 100%)
  const progressPercentage = Math.min((currentAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);

  // Calculate amount remaining to reach free shipping
  const amountRemaining = Math.max(FREE_SHIPPING_THRESHOLD - currentAmount, 0);

  // Determine if free shipping is unlocked
  const isFreeShippingUnlocked = currentAmount >= FREE_SHIPPING_THRESHOLD;

  // Format currency for display with € at the end (French format)
  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    // Get currency symbol (€ for EUR)
    const currencySymbol = currencyCode === 'EUR' ? '€' : currencyCode;

    return `${formatted}${currencySymbol}`;
  };

  return (
    <div className="px-3 py-3" role="region" aria-label="Progression vers la livraison gratuite">
      {/* Progress message */}
      <div className="flex items-center justify-center mb-2">
        <p className="text-xs font-medium text-black/70 text-center">
          {isFreeShippingUnlocked ? (
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <span>Livraison gratuite</span>
            </span>
          ) : (
            <span>
              Encore <span className="font-bold text-black">{formatCurrency(amountRemaining)}</span> pour obtenir la livraison gratuite 🚚
            </span>
          )}
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="relative w-full h-2 bg-black/10 rounded-xl overflow-hidden shadow-inner"
        role="progressbar"
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progression: ${progressPercentage.toFixed(0)}%`}
      >
        <div
          className="absolute top-0 left-0 h-full transition-all duration-500 ease-out rounded-xl"
          style={{
            width: `${progressPercentage}%`,
            background: isFreeShippingUnlocked
              ? 'linear-gradient(to right, #b25662, #b25662)'
              : 'linear-gradient(to right, #faa3ae, #faa3ae)',
            boxShadow: isFreeShippingUnlocked
              ? '0 8px 16px -2px rgba(178, 86, 98, 0.3)'
              : '0 4px 6px -1px rgba(250, 163, 174, 0.2)',
          }}
        />
      </div>

      {/* Threshold info */}
      <p className="text-[10px] text-black/50 mt-1.5 text-center">
        Cadeaux offert à partir de 40€ 🎁
      </p>
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

      <h3 className="text-2xl font-bold text-white mb-3">Votre panier est vide</h3>
      <p className="text-white/60 mb-8 max-w-sm text-sm leading-relaxed">
        Découvrez des produits incroyables et commencez votre collection dès aujourd'hui.
      </p>

      <Link
        to="/collections/best-sellers"
        onClick={close}
        prefetch="viewport"
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-black font-bold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary/25"
      >
        <ShoppingBag className="w-4 h-4" />
        Commencer mes achats
      </Link>
    </div>
  );
}
