import {useLoaderData} from 'react-router';
import type {LoaderFunctionArgs, ActionFunctionArgs, MetaFunction} from 'react-router';
import {CartMain} from '~/components/CartMain';
import {useConfig} from '~/utils/themeContext';
import {CartForm} from '@shopify/hydrogen';
import {HeadersFunction, data} from '@shopify/remix-oxygen';
import {Link} from 'react-router';

export const meta: MetaFunction = () => {
  const config = useConfig();
  return [{title: `Your Cart | ${config.brandName} Official Store`}];
};

export const headers: HeadersFunction = ({actionHeaders}) => actionHeaders;

/**
 * Handle all cart actions and mutations
 */
export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  const formData = await request.formData();
  console.log('======= CART ACTION DEBUG =======');
  console.log('Raw formData entries:', Object.fromEntries(formData));
  
  const {action, inputs} = CartForm.getFormInput(formData);
  console.log('Parsed action:', action, 'inputs:', inputs);

  if (!action) {
    console.error('No action provided');
    throw new Error('No action provided');
  }

  let status = 200;
  let result: any;

  try {
    switch (action) {
      case CartForm.ACTIONS.LinesAdd:
        console.log('Adding lines to cart:', inputs.lines);
        result = await cart.addLines(inputs.lines);
        console.log('Cart addLines result:', result);
        break;
      case CartForm.ACTIONS.LinesUpdate:
        console.log('Updating lines in cart:', inputs.lines);
        result = await cart.updateLines(inputs.lines);
        console.log('Cart updateLines result:', result);
        break;
      case CartForm.ACTIONS.LinesRemove:
        console.log('Removing lines from cart:', inputs.lineIds);
        result = await cart.removeLines(inputs.lineIds);
        console.log('Cart removeLines result:', result);
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
      case CartForm.ACTIONS.NoteUpdate: {
        result = await cart.updateNote(inputs.note);
        break;
      }
      default:
        throw new Error(`${action} cart action is not defined`);
    }
  } catch (error) {
    console.error(`Error handling cart action: ${error}`);
    console.error('Error details:', error);
    return data({
      cart: null,
      errors: [{message: `Error handling cart action: ${error}`}],
      warnings: [],
      analytics: {
        cartId: null,
      },
    }, {status: 500});
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;

  console.log('Final cart result:', {
    cartId,
    hasCart: !!cartResult,
    totalQuantity: cartResult?.totalQuantity,
    errors,
    warnings
  });
  console.log('======= END DEBUG =======');

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

/**
 * Get cart data for displaying on the cart page
 */
export function loader({context}: LoaderFunctionArgs) {
  return context.cart.get();
}

/**
 * Cart page component
 */
export default function Cart() {
  const config = useConfig();
  const cart = useLoaderData<typeof loader>();
  const cartEmpty = !cart?.totalQuantity;

  return (
    <div className="min-h-screen bg-background">
      {/* Add padding-top to account for fixed header */}
      <div className="cart-page-container container mx-auto px-4" style={{ paddingTop: 'calc(var(--header-height-desktop) + 2rem)', paddingBottom: '2rem' }}>
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          {cartEmpty ? 'Your Cart is Empty' : 'Your Cart'}
        </h1>
        
        {/* Main cart component - handles empty state and populated cart */}
        <CartMain cart={cart} layout="page" />
        
        {/* Continue shopping button when cart is empty */}
        {cartEmpty && (
          <div className="flex justify-center mt-10">
            <Link 
              to="/collections" 
              className="inline-block bg-primary hover:bg-primary-600 text-background px-6 py-3 rounded-sm transition-colors duration-200 font-bold"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
