import {type ActionFunctionArgs, type LoaderFunctionArgs} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import type {HeadersFunction} from '@shopify/remix-oxygen';
import {data} from '@shopify/remix-oxygen';

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

  // Debug the cart context
  console.log('Cart API action: context.cart exists:', !!cart);
  if (!cart) {
    console.error('Cart API action: Cart context is missing!');
    return data({
      cart: null,
      errors: [{message: 'Cart context is missing'}],
      warnings: [],
      analytics: {
        cartId: null,
      },
    }, {status: 500});
  }

  try {
    const formData = await request.formData();
    console.log('Cart action API received formData:', Object.fromEntries(formData));
    
    const {action, inputs} = CartForm.getFormInput(formData);
    console.log('Cart action API parsed:', {action, inputs});

    if (!action) {
      throw new Error('No action provided');
    }

    let status = 200;
    let result: any;

    try {
      switch (action) {
        case CartForm.ACTIONS.LinesAdd:
          console.log('API route: Adding lines to cart:', inputs.lines);
          // Debug each line's merchandiseId format
          if (inputs.lines && inputs.lines.length > 0) {
            inputs.lines.forEach((line, index) => {
              console.log(`Line ${index} merchandiseId:`, {
                id: line.merchandiseId,
                type: typeof line.merchandiseId,
                hasGidPrefix: String(line.merchandiseId).startsWith('gid://'),
                quantity: line.quantity
              });
            });
          }
          
          result = await cart.addLines(inputs.lines);
          console.log('API route: addLines result:', result);
          break;
        case CartForm.ACTIONS.LinesUpdate:
          result = await cart.updateLines(inputs.lines);
          break;
        case CartForm.ACTIONS.LinesRemove:
          result = await cart.removeLines(inputs.lineIds);
          break;
        case CartForm.ACTIONS.DiscountCodesUpdate: {
          const formDiscountCode = inputs.discountCode;
          const discountCodes = (
            formDiscountCode ? [formDiscountCode] : []
          ) as string[];
          discountCodes.push(...inputs.discountCodes);
          result = await cart.updateDiscountCodes(discountCodes);
          break;
        }
        case CartForm.ACTIONS.GiftCardCodesUpdate: {
          const formGiftCardCode = inputs.giftCardCode;
          const giftCardCodes = (
            formGiftCardCode ? [formGiftCardCode] : []
          ) as string[];
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
    } catch (error) {
      console.error('API route: Error handling cart action:', error);
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

    console.log('API route: Final cart result:', {
      cartId,
      hasCart: !!cartResult,
      totalQuantity: cartResult?.totalQuantity,
      lines: cartResult?.lines?.nodes?.length,
      errors: errors?.map((e: any) => e.message || e.code || e),
      warnings: warnings?.map((w: any) => w.message || w.code || w)
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
  } catch (error) {
    console.error('API route: Unexpected error in cart action handler:', error);
    return data({
      cart: null,
      errors: [{message: `Unexpected error in cart action handler: ${error}`}],
      warnings: [],
      analytics: {
        cartId: null,
      },
    }, {status: 500});
  }
}

// Export a blank component since this is just a route for API calls
export default function CartRoute() {
  return null;
} 