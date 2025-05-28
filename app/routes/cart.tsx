import {type ActionFunctionArgs, type LoaderFunctionArgs} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import type {HeadersFunction} from 'react-router';
import {data} from 'react-router';
import invariant from 'tiny-invariant';

export const headers: HeadersFunction = ({actionHeaders}) => actionHeaders;

/**
 * Handle the cartOnly parameter to get the current cart data
 */
export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  // Only respond to the cartOnly parameter
  if (url.searchParams.has('cartOnly')) {
    const cart = await context.cart.get();
    return data({cart});
  }
  
  // Otherwise return nothing (this is just an API route)
  return data({cart: null});
}

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  const formData = await request.formData();
  console.log('Cart action received from /cart route:', Object.fromEntries(formData));

  const {action, inputs} = CartForm.getFormInput(formData);
  console.log('Parsed action from /cart route:', action, 'inputs:', inputs);

  if (!action) {
    console.error('No action provided in /cart route');
    throw new Error('No action provided');
  }

  let status = 200;
  let result: any;

  try {
    switch (action) {
      case CartForm.ACTIONS.LinesAdd:
        console.log('Adding lines to cart via /cart route:', inputs.lines);
        result = await cart.addLines(inputs.lines);
        console.log('Cart addLines result from /cart route:', result);
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
      case CartForm.ACTIONS.NoteUpdate: {
        result = await cart.updateNote(inputs.note);
        break;
      }
      default:
        throw new Error(`${action} cart action is not defined`);
    }
  } catch (error) {
    console.error(`Error handling cart action in /cart route: ${error}`);
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

  console.log('Final cart result from /cart route:', {
    cartId,
    hasCart: !!cartResult,
    totalQuantity: cartResult?.totalQuantity,
    errors,
    warnings
  });

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

// Export a blank component since this is just a route for API calls
export default function CartRoute() {
  return null;
} 