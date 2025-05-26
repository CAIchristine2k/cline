import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useRef} from 'react';
import {FetcherWithComponents} from 'react-router';
import {useConfig} from '~/utils/themeContext';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  const config = useConfig();

  return (
    <div 
      aria-labelledby="cart-summary" 
      className={`${layout === 'page' ? 'max-w-md ml-auto' : ''}`}
    >
      <h4 className="text-lg font-bold text-primary mb-4">Order Summary</h4>
      <dl className="space-y-2">
        <div className="flex justify-between">
          <dt className="text-primary-800">Subtotal</dt>
          <dd className="font-medium text-primary">
            {cart.cost?.subtotalAmount?.amount ? (
              <Money data={cart.cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>
        
        {cart.cost?.totalTaxAmount?.amount ? (
          <div className="flex justify-between">
            <dt className="text-primary-800">Tax (estimated)</dt>
            <dd className="font-medium text-primary">
              <Money data={cart.cost.totalTaxAmount} />
            </dd>
          </div>
        ) : null}
        
        <div className="flex justify-between pt-2 mt-2 border-t border-primary/10 font-bold">
          <dt className="text-primary">Total</dt>
          <dd className="text-primary">
            {cart.cost?.totalAmount?.amount ? (
              <Money data={cart.cost?.totalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>
      </dl>
      
      <CartDiscounts discountCodes={cart.discountCodes} />
      <CartGiftCard giftCardCodes={cart.appliedGiftCards} />
      <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  const config = useConfig();
  
  if (!checkoutUrl) return null;

  return (
    <div className="mt-6">
      <a 
        href={checkoutUrl} 
        target="_self"
        className="block w-full bg-primary text-background text-center py-3 px-6 rounded-sm hover:bg-primary-600 transition-colors font-bold shadow-glow"
      >
        Continue to Checkout &rarr;
      </a>
      <div className="mt-4 flex items-center justify-center">
        <p className="text-xs text-primary-700 text-center">
          Secure checkout powered by Shopify
        </p>
      </div>
    </div>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  const config = useConfig();
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div className="mt-6 mb-4">
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className="flex justify-between mb-2">
        <div>
          <dt className="text-primary-800">Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="flex items-center mt-1">
              <code className="text-sm bg-primary/10 px-2 py-1 rounded">{codes?.join(', ')}</code>
              <button className="ml-2 text-sm text-red-500 hover:underline">Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex mt-4">
          <input 
            type="text" 
            name="discountCode" 
            placeholder="Discount code" 
            className="flex-grow bg-background border border-primary/20 rounded-l-sm px-3 py-2 text-text focus:outline-none focus:border-primary/50"
          />
          <button 
            type="submit" 
            className="bg-primary-700 text-background px-4 py-2 rounded-r-sm hover:bg-primary-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) {
  const config = useConfig();
  const appliedGiftCardCodes = useRef<string[]>([]);
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const codes: string[] =
    giftCardCodes?.map(({lastCharacters}) => `***${lastCharacters}`) || [];

  function saveAppliedCode(code: string) {
    const formattedCode = code.replace(/\s/g, ''); // Remove spaces
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
    giftCardCodeInput.current!.value = '';
  }

  function removeAppliedCode() {
    appliedGiftCardCodes.current = [];
  }

  return (
    <div className="mb-4">
      {/* Have existing gift card applied, display it with a remove option */}
      <dl hidden={!codes.length} className="flex justify-between mb-2">
        <div>
          <dt className="text-primary-800">Applied Gift Card(s)</dt>
          <UpdateGiftCardForm>
            <div className="flex items-center mt-1">
              <code className="text-sm bg-primary/10 px-2 py-1 rounded">{codes?.join(', ')}</code>
              <button 
                onSubmit={() => removeAppliedCode}
                className="ml-2 text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </UpdateGiftCardForm>
        </div>
      </dl>

      {/* Show an input to apply a gift card */}
      <UpdateGiftCardForm
        giftCardCodes={appliedGiftCardCodes.current}
        saveAppliedCode={saveAppliedCode}
      >
        <div className="flex mt-4">
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
            className="flex-grow bg-background border border-primary/20 rounded-l-sm px-3 py-2 text-text focus:outline-none focus:border-primary/50"
          />
          <button 
            type="submit"
            className="bg-primary-700 text-background px-4 py-2 rounded-r-sm hover:bg-primary-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </UpdateGiftCardForm>
    </div>
  );
}

function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  children,
}: {
  giftCardCodes?: string[];
  saveAppliedCode?: (code: string) => void;
  removeAppliedCode?: () => void;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const code = fetcher.formData?.get('giftCardCode');
        if (code && saveAppliedCode) {
          saveAppliedCode(code as string);
        }
        return children;
      }}
    </CartForm>
  );
}
