import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, type OptimisticCart} from '@shopify/hydrogen';
import {Money} from '~/components/Money';
import {useRef} from 'react';
import {FetcherWithComponents, Link} from 'react-router';
import {useConfig} from '~/utils/themeContext';
import {useAside} from '~/components/Aside';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
  checkoutDomain?: string;
};

export function CartSummary({cart, layout, checkoutDomain}: CartSummaryProps) {
  const config = useConfig();

  return (
    <div
      aria-labelledby="cart-summary"
      className={`p-6 ${layout === 'page' ? 'max-w-md ml-auto' : ''}`}
    >
      <h4 className="text-lg font-bold text-black mb-6">Résumé de la commande</h4>
      <dl className="space-y-4">
        <div className="flex justify-between items-center">
          <dt className="text-black/70 font-medium">Sous-total</dt>
          <dd className="font-bold text-black">
            {cart.cost?.subtotalAmount?.amount ? (
              <Money data={cart.cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>

        {cart.cost?.totalTaxAmount?.amount ? (
          <div className="flex justify-between items-center">
            <dt className="text-black/70 font-medium">Taxe (estimée)</dt>
            <dd className="font-bold text-black">
              <Money data={cart.cost.totalTaxAmount} />
            </dd>
          </div>
        ) : null}

        <div className="flex justify-between items-center pt-4 mt-4 border-t border-black/10">
          <dt className="text-black font-bold text-lg">Total</dt>
          <dd className="text-black font-bold text-xl">
            {cart.cost?.totalAmount?.amount ? (
              <Money data={cart.cost?.totalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>
      </dl>

      <CartDiscounts discountCodes={cart.discountCodes} />

      <CartCheckoutActions
        checkoutUrl={cart.checkoutUrl}
        checkoutDomain={checkoutDomain}
      />
    </div>
  );
}

function CartCheckoutActions({
  checkoutUrl,
  checkoutDomain,
}: {
  checkoutUrl?: string;
  checkoutDomain?: string;
}) {
  const config = useConfig();
  const {close} = useAside();

  if (!checkoutUrl) return null;

  // Debug the checkout URL for troubleshooting
  console.log('🔗 CartCheckoutActions - Original checkoutUrl:', checkoutUrl);

  // Parse the checkout URL to preserve query parameters
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(checkoutUrl);
    console.log('🔍 CartCheckoutActions - Parsed URL:', {
      protocol: parsedUrl.protocol,
      host: parsedUrl.host,
      pathname: parsedUrl.pathname,
      search: parsedUrl.search,
      params: Array.from(parsedUrl.searchParams.entries()),
    });
  } catch (error) {
    console.error(
      '❌ CartCheckoutActions - Error parsing checkout URL:',
      error,
    );
    // Fallback: redirect to Shopify cart which will auto-redirect to checkout
    const fallbackUrl = checkoutUrl || '#';
    return (
      <div className="mt-8">
        <a
          href={fallbackUrl}
          onClick={close}
          className="block w-full bg-primary hover:bg-primary-600 text-black text-center py-4 px-6 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary/25"
        >
          Payer maintenant →
        </a>
        <div className="mt-4 flex items-center justify-center">
          <p className="text-xs text-black/50 text-center">
            Vous serez redirigé vers le paiement sécurisé Shopify
          </p>
        </div>
      </div>
    );
  }

  // Convert cart permalink to checkout URL
  // Shopify cart URLs like /cart/c/xxx need to be converted to actual checkout
  let finalCheckoutUrl = checkoutUrl;

  // If the URL contains /cart/c/, it's a cart permalink
  // Convert it to a proper checkout by changing the path
  if (parsedUrl.pathname.includes('/cart/c/')) {
    // Replace /cart/c/ with /checkouts/c/ to get the checkout URL
    const checkoutPath = parsedUrl.pathname.replace('/cart/c/', '/checkouts/c/');
    parsedUrl.pathname = checkoutPath;

    // Add step parameter to go directly to payment
    parsedUrl.searchParams.set('step', 'payment_method');

    finalCheckoutUrl = parsedUrl.toString();
    console.log('🔄 Converted cart URL to checkout URL:', finalCheckoutUrl);
  }

  // If we're using a custom domain, ensure we construct the URL correctly
  if (checkoutDomain) {
    try {
      const customDomainUrl = new URL(`https://${checkoutDomain}`);
      customDomainUrl.pathname = parsedUrl.pathname;
      customDomainUrl.search = parsedUrl.search;
      finalCheckoutUrl = customDomainUrl.toString();
      console.log(
        '✅ CartCheckoutActions - Using custom domain checkout URL:',
        finalCheckoutUrl,
      );
    } catch (error) {
      console.error(
        '❌ CartCheckoutActions - Error creating custom domain URL:',
        error,
      );
      // Fallback to the converted checkout URL
    }
  }

  return (
    <div className="mt-8">
      <a
        href={finalCheckoutUrl}
        onClick={close}
        target="_self"
        rel="noopener"
        className="block w-full bg-black hover:bg-black/80 text-white text-center py-4 px-6 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        Payer maintenant →
      </a>
      <div className="mt-4 flex items-center justify-center">
        <p className="text-xs text-black text-center">
          Vous serez redirigé vers le paiement sécurisé Shopify
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
    <div className="mt-8 mb-6">
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className="mb-4">
        <div>
          <dt className="text-white/70 font-medium mb-2">
            Code(s) promo appliqué(s)
          </dt>
          <UpdateDiscountForm>
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <code className="text-sm text-green-400 font-mono">
                {codes?.join(', ')}
              </code>
              <button className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium">
                Retirer
              </button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="space-y-2">
          <label
            htmlFor="discountCode"
            className="block text-black dark:text-white font-medium text-sm"
          >
            Code promo
          </label>
          <div className="flex gap-2">
            <input
              id="discountCode"
              type="text"
              name="discountCode"
              placeholder="Entrez le code"
              className="flex-grow bg-white text-black placeholder-gray-400 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder-gray-400 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-black px-6 py-3 rounded-md transition-all duration-200 font-medium hover:shadow-md dark:text-black"
            >
              Appliquer
            </button>
          </div>
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
    <div className="mb-6">
      {/* Have existing gift card applied, display it with a remove option */}
      <dl hidden={!codes.length} className="mb-4">
        <div>
          <dt className="text-white/70 font-medium mb-2">
            Applied Gift Card(s)
          </dt>
          <UpdateGiftCardForm>
            <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <code className="text-sm text-primary font-mono">
                {codes?.join(', ')}
              </code>
              <button
                onSubmit={() => removeAppliedCode}
                className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
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
        <div className="space-y-2">
          <label
            htmlFor="giftCardCode"
            className="block text-white/70 font-medium text-sm"
          >
            Gift Card
          </label>
          <div className="flex gap-2">
            <input
              id="giftCardCode"
              ref={giftCardCodeInput}
              type="text"
              name="giftCardCode"
              placeholder="Enter gift card code"
              className="flex-grow bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-primary/40 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              Apply
            </button>
          </div>
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
