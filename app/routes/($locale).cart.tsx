import {type MetaFunction, useLoaderData} from 'react-router';
import type {CartQueryDataReturn} from '@shopify/hydrogen';
import {CartForm} from '@shopify/hydrogen';
import {
  data,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  type HeadersFunction,
} from '@shopify/remix-oxygen';
import {CartMain} from '~/components/CartMain';
import {Link} from 'react-router';
import {ArrowLeft, ShoppingBag} from 'lucide-react';
import {getConfig} from '~/lib/config';

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [{title: `${config.brandName} | Cart`}];
};

export const headers: HeadersFunction = ({actionHeaders}) => actionHeaders;

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result: CartQueryDataReturn;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesUpdate: {
      const formGiftCardCode = inputs.giftCardCode;

      // User inputted gift card code
      const giftCardCodes = (
        formGiftCardCode ? [formGiftCardCode] : []
      ) as string[];

      // Combine gift card codes already applied on cart
      giftCardCodes.push(...inputs.giftCardCodes);

      result = await cart.updateGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

export async function loader({context}: LoaderFunctionArgs) {
  const {cart} = context;
  const cartData = await cart.get();
  
  // Get configuration
  const config = getConfig();
  
  return {
    cart: cartData,
    config: {
      ...config,
      theme: config.influencerName.toLowerCase().replace(/\s+/g, '-'),
    },
  };
}

export default function Cart() {
  const {cart, config} = useLoaderData<typeof loader>();
  const isEmpty = !cart || cart.lines.nodes.length === 0;

  return (
    <div data-theme={config.theme} className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            to="/collections/all"
            className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Shopping Cart
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your <span className="text-gold-500">Championship</span> Cart
          </h1>
          {!isEmpty && (
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Review your selected items and proceed to checkout when you're ready to train like a champion.
            </p>
          )}
        </div>

        {isEmpty ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-400 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                Start building your championship collection with {config.influencerName}'s premium boxing gear and merchandise.
              </p>
            </div>
            
            <Link 
              to="/collections/all"
              className="group inline-flex items-center justify-center bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart Content */
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-sm border border-gray-800 overflow-hidden">
              <CartMain layout="page" cart={cart} config={config} />
            </div>
            
            {/* Championship Guarantee */}
            <div className="mt-8 bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 border border-gold-500/30 rounded-sm p-6">
              <h3 className="text-lg font-bold text-gold-500 mb-2">
                {config.influencerName}'s Championship Guarantee
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Every product is crafted to championship standards and backed by {config.influencerName}'s legacy of excellence. 
                Train like a champion with gear approved by a {config.influencerTitle.toLowerCase()}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
