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
      className={`p-4 bg-white ${layout === 'page' ? 'max-w-md ml-auto' : ''}`}
    >
      <h4 className="text-base font-bold text-black mb-4">Résumé de la commande</h4>
      <dl className="space-y-2">
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

        <div className="flex justify-between items-center pt-2 mt-2">
          <dt className="text-black font-bold text-base">Total</dt>
          <dd className="text-black font-bold text-lg">
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
      />
    </div>
  );
}

/**
 * CartCheckoutActions - Bouton de paiement
 *
 * ✅ Utilise directement cart.checkoutUrl fourni par Shopify
 * ✅ Aucune manipulation de domaine - Shopify gère automatiquement
 * ✅ Compatible dev (localhost) et production (www.clinehair.com)
 *
 * Le checkoutUrl est configuré automatiquement par Shopify selon :
 * - Les paramètres de la boutique (Settings > Checkout)
 * - Le domaine custom configuré (www.clinehair.com)
 * - L'environnement (dev/prod)
 */
function CartCheckoutActions({
  checkoutUrl,
}: {
  checkoutUrl?: string;
}) {
  const {close} = useAside();

  if (!checkoutUrl) return null;

  return (
    <div className="mt-4">
      <a
        href={checkoutUrl}
        onClick={close}
        className="block w-full bg-black hover:bg-black/80 text-white text-center py-3 px-6 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        Payer maintenant →
      </a>
      <div className="mt-2 flex items-center justify-center">
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
    <div className="mt-4 mb-4">
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className="mb-4">
        <div>
          <dt className="text-white/70 font-medium mb-2">
            Code(s) promo appliqué(s)
          </dt>
          <UpdateDiscountForm>
            <div className="flex items-center justify-between p-3 bg-black border border-primary/20 rounded-lg">
              <code className="text-sm text-primary font-mono">
                {codes?.join(', ')}
              </code>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
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
            className="block text-black font-medium text-sm"
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
