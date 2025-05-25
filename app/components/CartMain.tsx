import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';
import {useConfig} from '~/utils/themeContext';

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
  
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className={`${layout === 'page' ? 'p-6' : 'p-4'} bg-background rounded-sm`}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <div className="space-y-8">
        <div aria-labelledby="cart-lines">
          <ul className="divide-y divide-primary/10">
            {(cart?.lines?.nodes ?? []).map((line) => (
              <CartLineItem key={line.id} line={line} layout={layout} />
            ))}
          </ul>
        </div>
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
    </div>
  );
}

function CartEmpty({
  hidden = false,
  layout
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const config = useConfig();
  const {close} = useAside();
  
  return (
    <div hidden={hidden} className="text-center py-8">
      <p className="text-lg text-primary mb-6">
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <Link 
        to="/collections" 
        onClick={close} 
        prefetch="viewport"
        className="inline-block bg-primary text-background px-6 py-3 rounded-sm hover:bg-primary-600 transition-colors"
      >
        Continue shopping →
      </Link>
    </div>
  );
}
